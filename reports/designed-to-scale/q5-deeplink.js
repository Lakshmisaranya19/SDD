(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const doneSnap = () => ({
    hash: location.hash,
    done: localStorage.getItem('sdt:done'),
    progress: txt(document.querySelector('#progress .progress__head')),
    marks: [...document.querySelectorAll('#course li.lesson')].filter(li => li.classList.contains('is-done') || li.querySelector('.lesson__markbox.is-done')).map(li => li.dataset.lesson),
    nextLabel: txt(document.querySelector('.btn-next')),
    backDisabled: document.querySelector('.btn-ghost')?.disabled,
  });
  const out = {};
  // jump straight to last step of this lesson via hash
  location.hash = '#/request-lifecycle/10';
  await wait(900);
  out.atLastStep = doneSnap();

  // press Next at last step (if enabled)
  const nb = document.querySelector('.btn-next');
  out.nextAtLast = { text: txt(nb), disabled: nb?.disabled, href: nb?.getAttribute('href') };
  nb?.click(); await wait(900);
  out.afterNextAtLast = doneSnap();

  // timeline current markers
  out.timeline = [...document.querySelectorAll('#timeline button, #timeline li')].slice(0, 14).map(b => ({ tag: b.tagName, text: txt(b).slice(0, 28), cls: b.className, current: b.getAttribute('aria-current'), sel: b.getAttribute('aria-selected') }));

  // deep link to a different lesson, mid-step
  location.hash = '#/load-balancing/3';
  await wait(1200);
  out.deepLinkLesson = {
    hash: location.hash, title: document.title,
    module: txt(document.querySelector('#head .crumb, #head')),
    h1: txt(document.querySelector('h1')),
    step: txt(document.querySelector('#guide h2')),
    steps: [...document.querySelectorAll('#timeline button')].map(txt),
  };
  return out;
})()
