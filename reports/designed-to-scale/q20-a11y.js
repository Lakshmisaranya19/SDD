(() => {
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const attr = el => Object.fromEntries([...el.attributes].map(a => [a.name, a.value]));
  const stage = document.querySelector('.stage');
  const svgs = [...stage.querySelectorAll('svg')];
  const diagram = svgs.find(s => s.getAttribute('role') === 'img') || svgs[0];
  return {
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({ tag: h.tagName, text: txt(h), cls: h.className })),
    live: [...document.querySelectorAll('[aria-live]')].map(e => ({ tag: e.tagName, cls: e.className, live: e.getAttribute('aria-live'), role: e.getAttribute('role') })),
    dialog: (() => { const d = document.querySelector('.sx__dialog'); const p = d?.parentElement; return { attrs: d ? attr(d) : null, parentCls: p?.className, parentAttrs: p ? attr(p) : null }; })(),
    diagram: diagram ? {
      attrs: attr(diagram), childCount: diagram.querySelectorAll('*').length,
      labels: [...diagram.querySelectorAll('[aria-label]')].slice(0, 15).map(e => ({ tag: e.tagName, label: e.getAttribute('aria-label') })),
      texts: [...diagram.querySelectorAll('text')].map(t => txt(t)).slice(0, 40),
    } : null,
    timeline: (() => { const t = document.querySelector('#timeline'); return { attrs: attr(t), listRole: t.querySelector('ol,ul') ? attr(t.querySelector('ol,ul')) : null, btnAttrs: [...t.querySelectorAll('button')].slice(0, 2).map(attr) }; })(),
    guide: (() => { const g = document.querySelector('#guide'); return { attrs: attr(g), contentAttrs: g.querySelector('.guide__content') ? attr(g.querySelector('.guide__content')) : null }; })(),
    skipLinks: [...document.querySelectorAll('a[href^="#"]')].map(a => ({ text: txt(a), href: a.getAttribute('href'), cls: a.className })).slice(0, 6),
    tabbables: [...document.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(e => e.offsetParent !== null).length,
    meta: [...document.querySelectorAll('meta[name],meta[property]')].map(m => ({ k: m.getAttribute('name') || m.getAttribute('property'), v: m.getAttribute('content')?.slice(0, 80) })),
    canonical: document.querySelector('link[rel=canonical]')?.href,
  };
})()
