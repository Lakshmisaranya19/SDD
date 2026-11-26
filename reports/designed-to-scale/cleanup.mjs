import fs from 'node:fs';
const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0; const pending = new Map();
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const wait = ms => new Promise(r => setTimeout(r, ms));
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.result.value;

await send('Page.navigate', { url: 'https://designed-to-scale.vercel.app/' });
await wait(3000);
await ev(`(() => {
  localStorage.clear();
  localStorage.setItem('sdt:last', JSON.stringify({ lessonId: 'request-lifecycle', step: 0 }));
  localStorage.setItem('sdt:recent', JSON.stringify([{ lessonId: 'request-lifecycle', step: 0 }]));
  return true;
})()`);
await send('Page.reload', {});
await wait(3000);
const final = await ev(`JSON.stringify({
  url: location.href, title: document.title, h1: document.querySelector('h1')?.textContent.trim(),
  lang: document.documentElement.lang, theme: document.documentElement.dataset.theme || null,
  layout: document.documentElement.dataset.layout, progress: document.querySelector('#progress .progress__head')?.textContent.trim().replace(/\\s+/g,' '),
  storage: Object.fromEntries(Object.entries(localStorage))
})`);
console.log(final);
ws.close();
