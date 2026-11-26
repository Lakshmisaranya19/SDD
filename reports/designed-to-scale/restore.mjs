import fs from 'node:fs';
const ver = await (await fetch('http://127.0.0.1:9222/json/version')).json();
const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));

// 1) page-level: switch language back to English
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0; const pending = new Map();
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const wait = ms => new Promise(r => setTimeout(r, ms));
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.result.value;
const lang = await ev("document.documentElement.lang");
if (lang !== 'en') {
  await ev("document.querySelector('.topbar .lang__btn').click()");
  await wait(400);
  await ev("[...document.querySelectorAll('#lang-menu .lang__item')].find(b=>b.textContent.trim().startsWith('EN')).click()");
  await wait(1600);
}
await ev("location.hash='#/request-lifecycle/1'");
await wait(1200);
const state = await ev("JSON.stringify({lang:document.documentElement.lang,dir:document.documentElement.dir,h1:document.querySelector('h1')?.textContent.trim(),hash:location.hash,layout:document.documentElement.dataset.layout,theme:document.documentElement.dataset.theme||null})");
ws.close();

// 2) browser-level: restore a normal desktop window size
const bws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((r, j) => { bws.onopen = r; bws.onerror = j; });
let bid = 0; const bpend = new Map();
bws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && bpend.has(m.id)) { bpend.get(m.id)(m); bpend.delete(m.id); } };
const bsend = (method, params = {}) => new Promise(res => { const i = ++bid; bpend.set(i, res); bws.send(JSON.stringify({ id: i, method, params })); });
const win = await bsend('Browser.getWindowForTarget', { targetId: page.id });
const boundsBefore = win.result?.bounds;
await bsend('Browser.setWindowBounds', { windowId: win.result.windowId, bounds: { width: 1440, height: 900, windowState: 'normal' } });
await wait(800);
const win2 = await bsend('Browser.getWindowForTarget', { targetId: page.id });
const after = await bsend('Runtime.evaluate', { expression: "JSON.stringify({iw:innerWidth,ih:innerHeight,layout:document.documentElement.dataset.layout})", returnByValue: true }).catch(() => null);
bws.close();
console.log(JSON.stringify({ state: JSON.parse(state), boundsBefore, boundsAfter: win2.result?.bounds, after: after?.result?.result?.value }, null, 1));
