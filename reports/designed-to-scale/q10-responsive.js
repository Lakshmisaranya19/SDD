(() => {
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), display: getComputedStyle(el).display, visible: r.width > 0 && r.height > 0 }; };
  return {
    vw: innerWidth, vh: innerHeight,
    layout: document.documentElement.dataset.layout,
    htmlClass: document.documentElement.className,
    bodyClass: document.body.className,
    topbar: box(document.querySelector('.topbar')),
    brand: box(document.querySelector('.brand')),
    nav: box(document.querySelector('.nav')),
    menuBtn: box(document.querySelector('.menu-btn')),
    searchBtn: box(document.querySelector('.search')),
    lang: box(document.querySelector('.lang')),
    credit: box(document.querySelector('.credit')),
    sidebar: box(document.querySelector('#sidebar')),
    sheet: box(document.querySelector('.sheet')),
    sheetGrid: getComputedStyle(document.querySelector('.sheet')).gridTemplateColumns,
    sheetChildren: [...document.querySelector('.sheet').children].map(e => ({ cls: e.className, id: e.id, ...box(e) })),
    head: box(document.querySelector('#head')),
    stage: box(document.querySelector('.stage')),
    timeline: box(document.querySelector('#timeline')),
    rail: box(document.querySelector('.rail')),
    guide: box(document.querySelector('#guide')),
    goals: box(document.querySelector('#goals')),
    progressCard: box(document.querySelector('#progress')),
    drawerOpen: document.documentElement.classList.contains('is-drawer'),
    topbarOverflow: document.querySelector('.topbar').scrollWidth - document.querySelector('.topbar').clientWidth,
    bodyOverflowX: document.documentElement.scrollWidth - innerWidth,
  };
})()
