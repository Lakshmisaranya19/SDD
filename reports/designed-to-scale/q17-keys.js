(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const key = (k, extra = {}) => document.body.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...extra }));
  const out = {};
  location.hash = '#/sharding/1'; await wait(900);
  key('ArrowRight'); await wait(800);
  out.right = { hash: location.hash, step: txt(document.querySelector('#timeline li.is-current')) };
  key('ArrowRight'); await wait(800);
  out.right2 = { hash: location.hash, step: txt(document.querySelector('#timeline li.is-current')) };
  key('ArrowLeft'); await wait(800);
  out.left = { hash: location.hash, step: txt(document.querySelector('#timeline li.is-current')) };
  out.pauseBefore = { text: txt(document.querySelector('#pause')), title: document.querySelector('#pause')?.title };
  key(' '); await wait(400);
  out.pauseAfter = { text: txt(document.querySelector('#pause')), title: document.querySelector('#pause')?.title, cls: document.querySelector('#pause')?.className };
  key(' '); await wait(300);
  out.pauseRestored = txt(document.querySelector('#pause'));
  // fit key: check transform/zoom of scene svg wrapper before/after zooming via wheel is hard; record presence
  const svg = document.querySelector('.stage svg');
  out.svg = svg ? { w: Math.round(svg.getBoundingClientRect().width), h: Math.round(svg.getBoundingClientRect().height), viewBox: svg.getAttribute('viewBox'), aria: svg.getAttribute('aria-label'), role: svg.getAttribute('role'), title: svg.querySelector('title')?.textContent } : null;
  // progress popover
  document.querySelector('#progress .progress__head').click();
  await wait(300);
  document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} });
  await wait(300);
  const pc = document.querySelector('#progress');
  out.progressOpen = {
    cls: pc.className, expanded: pc.querySelector('.progress__head')?.getAttribute('aria-expanded'),
    rect: (() => { const r = pc.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y) }; })(),
    details: [...pc.querySelectorAll('.progress__row, .progress__mod, li')].map(x => txt(x)).slice(0, 12),
    html: pc.innerHTML.length,
  };
  return out;
})()
