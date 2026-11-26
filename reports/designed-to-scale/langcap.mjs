import fs from 'node:fs';
const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0;
const pending = new Map();
const reqs = [];
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Network.requestWillBeSent') reqs.push(m.params.request.url.replace('https://designed-to-scale.vercel.app', ''));
};
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const wait = ms => new Promise(r => setTimeout(r, ms));
await send('Network.enable', {});
await send('Runtime.enable', {});
await send('Runtime.evaluate', { expression: "location.hash='#/caching/3'" });
await wait(1500);
reqs.length = 0;
// open language menu, pick Arabic
await send('Runtime.evaluate', { expression: "document.querySelector('.topbar .lang__btn').click()" });
await wait(400);
await send('Runtime.evaluate', { expression: "[...document.querySelectorAll('#lang-menu .lang__item')].find(b=>b.textContent.trim().startsWith('AR')).click()" });
await wait(2500);
const r = await send('Runtime.evaluate', {
  expression: `(() => {
    const txt = e => (e?.textContent || '').trim().replace(/\\s+/g, ' ');
    return JSON.stringify({
      dir: document.documentElement.dir, lang: document.documentElement.lang, stored: localStorage.getItem('sdt:lang'),
      h1: txt(document.querySelector('h1')), guideH2: txt(document.querySelector('#guide h2')),
      nav: [...document.querySelectorAll('.topbar .nav__item')].map(txt),
      railX: Math.round(document.querySelector('.rail').getBoundingClientRect().x),
      sidebarX: Math.round(document.querySelector('#sidebar').getBoundingClientRect().x),
      next: txt(document.querySelector('.btn-next')), back: txt(document.querySelector('.btn-ghost')),
      title: document.title,
    });
  })()`,
  returnByValue: true
});
// RTL arrow behaviour
await send('Runtime.evaluate', { expression: "location.hash='#/caching/1'" });
await wait(1000);
await send('Runtime.evaluate', { expression: "document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}))" });
await wait(800);
const rtlKey = await send('Runtime.evaluate', { expression: "JSON.stringify({hash:location.hash})", returnByValue: true });
// restore English
await send('Runtime.evaluate', { expression: "document.querySelector('.topbar .lang__btn').click()" });
await wait(400);
await send('Runtime.evaluate', { expression: "[...document.querySelectorAll('#lang-menu .lang__item')].find(b=>b.textContent.trim().startsWith('EN')).click()" });
await wait(1800);
const restored = await send('Runtime.evaluate', { expression: "JSON.stringify({dir:document.documentElement.dir,lang:document.documentElement.lang,h1:document.querySelector('h1').textContent.trim(),stored:localStorage.getItem('sdt:lang')})", returnByValue: true });
fs.writeFileSync('q19-lang.json', JSON.stringify({
  arabic: JSON.parse(r.result.result.value), rtlKey: JSON.parse(rtlKey.result.result.value),
  restored: JSON.parse(restored.result.result.value), requests: reqs
}, null, 1));
console.log(JSON.stringify({ arabic: JSON.parse(r.result.result.value), rtlKey: JSON.parse(rtlKey.result.result.value), restored: JSON.parse(restored.result.result.value), requests: reqs }, null, 1));
ws.close();
