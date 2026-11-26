(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  location.hash = '#/batch-stream/1'; await wait(1500);
  const el = s => document.querySelector(s);
  const tl = el('.timeline__steps');
  const chips = el('.stage .chips') || el('.chips');
  const out = {
    hash: location.hash,
    steps: document.querySelectorAll('#timeline li').length,
    timeline: tl ? { clientW: tl.clientWidth, scrollW: tl.scrollWidth, overflowX: getComputedStyle(tl).overflowX, scrollable: tl.scrollWidth > tl.clientWidth } : null,
    chips: chips ? { clientW: chips.clientWidth, scrollW: chips.scrollWidth, overflowX: getComputedStyle(chips).overflowX, scrollable: chips.scrollWidth > chips.clientWidth, count: chips.children.length } : null,
    stage: (() => { const s = el('.stage'); const r = s.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })(),
    svg: (() => { const s = el('.stage-svg'); return s ? { w: Math.round(s.getBoundingClientRect().width), h: Math.round(s.getBoundingClientRect().height), vb: s.getAttribute('viewBox') } : null; })(),
    pager: (() => { const p = el('.pager') || el('.lesson__nav') || el('.btn-next')?.parentElement; return p ? { cls: p.className, position: getComputedStyle(p).position, rect: (() => { const r = p.getBoundingClientRect(); return { y: Math.round(r.y), h: Math.round(r.h) }; })() } : null; })(),
    pageScroll: { scrollH: document.documentElement.scrollHeight, clientH: document.documentElement.clientHeight },
  };
  return out;
})()
