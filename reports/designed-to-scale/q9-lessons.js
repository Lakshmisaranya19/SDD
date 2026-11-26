(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const ids = [...document.querySelectorAll('#course li.lesson')].map(li => li.dataset.lesson);
  const results = [];
  for (const id of ids) {
    const prev = document.querySelector('h1')?.textContent;
    location.hash = `#/${id}/1`;
    let tries = 0;
    while (tries++ < 40) {
      await wait(100);
      const h = document.querySelector('h1')?.textContent;
      if (h && h !== prev) break;
      if (location.hash === `#/${id}/1` && h && h !== prev) break;
    }
    await wait(150);
    const head = txt(document.querySelector('#head'));
    const meta = [...document.querySelectorAll('#head .meta span, #head .lesson-meta span, #head .badge')].map(txt);
    const steps = [...document.querySelectorAll('#timeline li')].map(li => txt(li).replace(/^\d+\s*/, ''));
    results.push({
      id,
      h1: txt(document.querySelector('h1')),
      head: head.slice(0, 300),
      meta,
      stepCount: steps.length,
      steps,
      chips: [...document.querySelectorAll('.chip')].map(c => ({ k: c.dataset.k, label: txt(c.querySelector('.chip__label')), value: txt(c.querySelector('.chip__value')) })),
      guideH2: txt(document.querySelector('#guide h2')),
    });
  }
  return results;
})()
