import fs from 'node:fs';
const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0;
const send = (m, params = {}) => new Promise(res => {
  const i = ++id;
  const h = e => { const x = JSON.parse(e.data); if (x.id === i) { ws.removeEventListener('message', h); res(x); } };
  ws.addEventListener('message', h);
  ws.send(JSON.stringify({ id: i, method: m, params }));
});
const w = Number(process.argv[2] || 1024), h = Number(process.argv[3] || 768);
await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700, screenWidth: w, screenHeight: h });
await new Promise(r => setTimeout(r, 400));
await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
await new Promise(r => setTimeout(r, 700));
const expr = fs.readFileSync(process.argv[4], 'utf8');
const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
console.log(JSON.stringify(r.result?.result?.value ?? r, null, 1));
ws.close();
