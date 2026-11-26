(() => {
  const sb = document.querySelector('#sidebar');
  return {
    iw: innerWidth, ih: innerHeight,
    htmlClass: document.documentElement.className,
    layout: document.documentElement.dataset.layout,
    attr: document.documentElement.getAttribute('data-layout'),
    matches1200: matchMedia('(max-width: 1200px)').matches,
    sel: sb.matches(':root:not([data-layout=desktop]) .sidebar'),
    transform: getComputedStyle(sb).transform,
    left: getComputedStyle(sb).left,
    vis: getComputedStyle(sb).visibility,
    inline: sb.getAttribute('style'),
    rect: Math.round(sb.getBoundingClientRect().x),
    sheets: [...document.querySelectorAll('.sheet')].length,
    sidebars: [...document.querySelectorAll('#sidebar')].length,
    cssRules: (() => { try { return [...document.styleSheets].flatMap(s => { try { return [...s.cssRules].filter(r => /sidebar/.test(r.cssText)).map(r => r.cssText.slice(0, 160)); } catch { return []; } }); } catch { return []; } })(),
  };
})()
