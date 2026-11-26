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
const wait = ms => new Promise(r => setTimeout(r, ms));
const finish = async () => send('Runtime.evaluate', { expression: "document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} })" });
const shot = async file => {
  await finish();
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(file, Buffer.from(r.result.data, 'base64'));
};

const scenario = process.argv[2];
if (scenario === 'drawer') {
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 });
  await wait(400);
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await wait(600);
  await send('Runtime.evaluate', { expression: "document.querySelector('#menu-btn').click()" });
  await wait(600);
  await shot('shots/mobile-drawer.png');
} else if (scenario === 'search') {
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });
  await wait(400);
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await wait(600);
  await send('Runtime.evaluate', { expression: "(async()=>{document.querySelector('#search-open').click();await new Promise(r=>setTimeout(r,300));const i=document.querySelector('.sx__input');i.value='cache';i.dispatchEvent(new Event('input',{bubbles:true}));})()", awaitPromise: true });
  await wait(1200);
  await shot('shots/search.png');
  await send('Runtime.evaluate', { expression: "document.querySelector('.sx__esc').click()" });
} else if (scenario === 'dark') {
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });
  await wait(400);
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await wait(600);
  await send('Runtime.evaluate', { expression: "if(document.documentElement.dataset.theme!=='dark')document.querySelector('#theme-btn').click()" });
  await wait(800);
  await shot('shots/desktop-dark.png');
  await send('Runtime.evaluate', { expression: "if(document.documentElement.dataset.theme==='dark')document.querySelector('#theme-btn').click()" });
}
console.log('done', scenario);
ws.close();
