(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  if (document.documentElement.classList.contains('is-drawer')) {
    document.querySelector('#drawer-close').click();
    await wait(700);
  }
  const sb = document.querySelector('#sidebar');
  const cs = getComputedStyle(sb);
  return {
    iw: innerWidth, layout: document.documentElement.dataset.layout, htmlClass: document.documentElement.className,
    sel: sb.matches(':root:not([data-layout=desktop]) .sidebar'),
    transform: cs.transform, visibility: cs.visibility, opacity: cs.opacity, transition: cs.transition,
    rect: (() => { const r = sb.getBoundingClientRect(); return { x: Math.round(r.x), w: Math.round(r.width) }; })(),
    backdrop: getComputedStyle(document.querySelector('#drawer-backdrop')).opacity,
  };
})()
