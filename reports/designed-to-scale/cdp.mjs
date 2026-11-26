// Read-only CDP helper for the design-to-scale investigation.
// Usage: node cdp.mjs eval <expression-file>
//        node cdp.mjs shot <outfile.png>
//        node cdp.mjs viewport <width> <height>
import fs from 'node:fs';

const page = (await (await fetch('http://127.0.0.1:9222/json')).json())
  .find(t => t.type === 'page' && t.url.startsWith('https://designed-to-scale.vercel.app'));
if (!page) throw new Error('target page not found');

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0;
const pending = new Map();
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise(res => {
  const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params }));
});

const [, , cmd, ...rest] = process.argv;
let out;
if (cmd === 'eval') {
  const expr = fs.readFileSync(rest[0], 'utf8');
  const r = await send('Runtime.evaluate', {
    expression: expr, awaitPromise: true, returnByValue: true
  });
  out = r.result?.exceptionDetails
    ? { error: r.result.exceptionDetails.text, detail: r.result.exceptionDetails.exception?.description }
    : (r.result?.result?.value ?? r);
} else if (cmd === 'shot') {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(rest[0], Buffer.from(r.result.data, 'base64'));
  out = { saved: rest[0] };
} else if (cmd === 'shotr') {
  const w = Number(rest[0]), h = Number(rest[1]);
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: w < 700,
    screenWidth: w, screenHeight: h
  });
  await new Promise(r => setTimeout(r, 500));
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await new Promise(r => setTimeout(r, 500));
  await send('Runtime.evaluate', { expression: "document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} })" });
  await new Promise(r => setTimeout(r, 300));
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(rest[2], Buffer.from(r.result.data, 'base64'));
  out = { saved: rest[2], viewport: [w, h] };
} else if (cmd === 'responsive') {
  const w = Number(rest[0]), h = Number(rest[1]), script = fs.readFileSync(rest[2], 'utf8');
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: w < 700,
    screenWidth: w, screenHeight: h
  });
  await new Promise(r => setTimeout(r, 500));
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await new Promise(r => setTimeout(r, 700));
  await send('Runtime.evaluate', { expression: "document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} })" });
  await new Promise(r => setTimeout(r, 200));
  const r = await send('Runtime.evaluate', { expression: script, awaitPromise: true, returnByValue: true });
  out = r.result?.exceptionDetails ? { error: r.result.exceptionDetails.text } : r.result?.result?.value;
} else if (cmd === 'viewport') {
  const w = Number(rest[0]), h = Number(rest[1]);
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: w < 700,
    screenWidth: w, screenHeight: h
  });
  await new Promise(r => setTimeout(r, 400));
  await send('Runtime.evaluate', { expression: "window.dispatchEvent(new Event('resize'))" });
  await new Promise(r => setTimeout(r, 700));
  out = { viewport: [w, h] };
} else {
  out = { usage: 'eval <file> | shot <file> | viewport <w> <h> | responsive <w> <h> <script>' };
}
console.log(JSON.stringify(out, null, 1));
ws.close();
