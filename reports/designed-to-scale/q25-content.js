(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const out = {};
  for (const spec of ['#/caching/5', '#/caching/13', '#/request-lifecycle/10']) {
    location.hash = spec; await wait(1400);
    const guide = document.querySelector('#guide');
    const counts = {};
    for (const el of guide.querySelectorAll('*')) {
      if (!el.className) continue;
      const cls = String(el.className);
      for (const c of cls.split(/\s+/)) counts[c] = (counts[c] || 0) + 1;
    }
    out[spec] = {
      callouts: [...guide.querySelectorAll('.callout')].map(c => ({ kind: c.className, text: txt(c).slice(0, 160) })),
      terms: [...guide.querySelectorAll('.term, .glossary, abbr')].map(t => txt(t)).slice(0, 10),
      tables: guide.querySelectorAll('table').length,
      takeaways: txt(guide.querySelector('.takeaways'))?.slice(0, 300),
      classes: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 25),
      heading: txt(guide.querySelector('.guide__title')),
      chapter: txt(guide.querySelector('.chapter')),
      bodySample: txt(guide.querySelector('.guide__content'))?.slice(0, 400),
    };
  }
  return out;
})()
