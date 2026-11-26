(() => {
  const sb = document.querySelector('#sidebar');
  const cs = getComputedStyle(sb);
  return {
    htmlClass: document.documentElement.className,
    dataLayout: document.documentElement.getAttribute('data-layout'),
    animations: sb.getAnimations().map(a => ({ state: a.playState, currentTime: a.currentTime, effect: a.effect?.getKeyframes?.().slice(-1)[0] })),
    transform: cs.transform,
    translate: cs.translate,
    visibility: cs.visibility,
    display: cs.display,
    position: cs.position,
    insetInlineStart: cs.insetInlineStart,
    width: cs.width,
    computedMatches: sb.matches(':root:not([data-layout=desktop]) .sidebar'),
    rootNotDesktop: document.documentElement.matches(':root:not([data-layout=desktop])'),
  };
})()
