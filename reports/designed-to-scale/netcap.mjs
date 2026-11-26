import fs from 'node:fs';
const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0;
const pending = new Map();
const requests = [];
const responses = new Map();
const consoleMsgs = [];
const exceptions = [];
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Network.requestWillBeSent') {
    requests.push({
      id: m.params.requestId, url: m.params.request.url, method: m.params.request.method,
      type: m.params.type, initiator: m.params.initiator?.type, ts: m.params.timestamp,
      headers: Object.fromEntries(Object.entries(m.params.request.headers || {}).filter(([k]) => /^(accept|content-type|sec-fetch-mode|sec-fetch-dest|referer|origin)$/i.test(k)))
    });
  }
  if (m.method === 'Network.responseReceived') responses.set(m.params.requestId, m.params.response);
  if (m.method === 'Network.loadingFinished') {
    const r = requests.find(x => x.id === m.params.requestId);
    if (r) r.encodedBytes = m.params.encodedDataLength;
  }
  if (m.method === 'Runtime.consoleAPICalled') consoleMsgs.push({ type: m.params.type, text: m.params.args.map(a => a.value ?? a.description).join(' ').slice(0, 300) });
  if (m.method === 'Runtime.exceptionThrown') exceptions.push((m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text || '').slice(0, 300));
};
const send = (method, params = {}) => new Promise(res => {
  const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params }));
});
await send('Network.enable', {});
await send('Runtime.enable', {});
await send('Page.enable', {});
await send('Page.reload', { ignoreCache: false });
await new Promise(r => setTimeout(r, 9000));
const rows = requests.map(r => {
  const resp = responses.get(r.id);
  return {
    url: r.url.replace('https://designed-to-scale.vercel.app', ''),
    method: r.method, type: r.type, initiator: r.initiator,
    status: resp?.status, mime: resp?.mimeType, bytes: r.encodedBytes,
    cache: resp?.fromDiskCache ? 'disk' : resp?.fromMemoryCache ? 'memory' : null,
    headers: r.headers,
  };
});
const info = await send('Runtime.evaluate', {
  expression: "JSON.stringify({url:location.href,title:document.title,iw:innerWidth,ih:innerHeight,layout:document.documentElement.dataset.layout,theme:document.documentElement.dataset.theme||null,lang:document.documentElement.lang,last:localStorage.getItem('sdt:last'),perfNav:performance.getEntriesByType('navigation').map(n=>({type:n.type,ttfb:Math.round(n.responseStart),dom:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),transfer:n.transferSize}))})",
  returnByValue: true
});
fs.writeFileSync('q18-network.json', JSON.stringify({ info: JSON.parse(info.result.result.value), rows, consoleMsgs, exceptions }, null, 1));
console.log('requests', rows.length, 'console', consoleMsgs.length, 'exceptions', exceptions.length);
ws.close();
