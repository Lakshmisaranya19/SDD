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

// 1) search focus trap
await send('Page.navigate', { url: 'https://designed-to-scale.vercel.app/#/caching/5' });
await wait(2500);
await ev("document.querySelector('#search-open').click()");
await wait(500);
const focusSeq = [];
for (let i = 0; i < 6; i++) {
  await ev("document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}))");
  await wait(150);
  focusSeq.push(await ev("(()=>{const a=document.activeElement;return (a.tagName+'.'+(a.className||'')+' '+(a.getAttribute('aria-label')||'')+' '+(a.textContent||'').trim().slice(0,20)).slice(0,80)})()"));
}
const trap = await ev("(()=>{const d=document.querySelector('.sx__dialog');return JSON.stringify({inside: d.contains(document.activeElement), active: document.activeElement.tagName, cls: document.activeElement.className})})()");
await ev("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))");
await wait(300);

// 2) ?lang=ja
await send('Page.navigate', { url: 'https://designed-to-scale.vercel.app/?lang=ja' });
await wait(3000);
const ja = await ev("JSON.stringify({lang:document.documentElement.lang,stored:localStorage.getItem('sdt:lang'),h1:document.querySelector('h1')?.textContent.trim(),title:document.title,nav:[...document.querySelectorAll('.topbar .nav__item')].map(b=>b.textContent.trim())})");
// restore canonical root
await send('Page.navigate', { url: 'https://designed-to-scale.vercel.app/#/caching/5' });
await wait(2500);
const back = await ev("JSON.stringify({lang:document.documentElement.lang,dir:document.documentElement.dir,stored:localStorage.getItem('sdt:lang'),h1:document.querySelector('h1')?.textContent.trim(),hash:location.hash})");
const out = { focusSeq, trap: JSON.parse(trap), ja: JSON.parse(ja), restored: JSON.parse(back) };
fs.writeFileSync('q27-final.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
ws.close();
