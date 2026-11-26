(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const snap = label => ({
    label,
    hash: location.hash,
    historyLen: history.length,
    title: document.title,
    stepLabel: txt(document.querySelector('#timeline .tl__now, #timeline [aria-current]')),
    timelineCurrent: [...document.querySelectorAll('#timeline button')].map(b => ({ t: txt(b).slice(0, 30), current: b.getAttribute('aria-current'), cls: b.className })),
    guideH2: txt(document.querySelector('#guide h2')),
    guideText: txt(document.querySelector('#guide .guide__content'))?.slice(0, 220),
    goals: [...document.querySelectorAll('#goals li')].map(txt),
    backDisabled: document.querySelector('.btn-ghost')?.disabled,
    nextLabel: txt(document.querySelector('.btn-next')),
    docScroll: document.querySelector('.guide__content')?.scrollTop,
    last: localStorage.getItem('sdt:last'),
    recent: localStorage.getItem('sdt:recent'),
    progressText: txt(document.querySelector('#progress')),
  });

  const out = { initial: snap('initial') };

  const next = () => { document.querySelector('.btn-next').click(); };
  const back = () => { document.querySelector('.btn-ghost').click(); };

  next(); await wait(700);
  out.afterNext1 = snap('after Next →');
  next(); await wait(700);
  out.afterNext2 = snap('after Next →→');

  // jump to step 8 via timeline
  const stepBtns = [...document.querySelectorAll('#timeline button')];
  stepBtns[7]?.click(); await wait(700);
  out.afterTimeline8 = snap('after timeline step 8');

  // back button
  back(); await wait(700);
  out.afterBack = snap('after Back');

  // browser history back
  history.back(); await wait(800);
  out.afterHistoryBack = snap('after history.back()');

  // replay + pause tools
  const tools = [...document.querySelectorAll('.stage .tool')];
  const replay = tools.find(b => txt(b) === 'Replay');
  const pause = tools.find(b => txt(b) === 'Pause');
  out.tools = tools.map(b => ({ text: txt(b), aria: b.getAttribute('aria-label'), title: b.title, pressed: b.getAttribute('aria-pressed'), cls: b.className }));
  replay?.click(); await wait(400);
  out.afterReplay = { pauseLabel: txt([...document.querySelectorAll('.stage .tool')].find(b => ['Pause','Play'].includes(txt(b)))) };
  [...document.querySelectorAll('.stage .tool')].find(b => txt(b) === 'Pause')?.click(); await wait(400);
  out.afterPause = { toolLabels: [...document.querySelectorAll('.stage .tool')].map(txt) };

  // fullscreen
  document.querySelector('.tool--expand')?.click(); await wait(500);
  out.afterExpand = { stageClass: document.querySelector('.stage')?.className, htmlClass: document.documentElement.className, aria: document.querySelector('.tool--expand')?.getAttribute('aria-label') };
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await wait(500);
  out.afterEscape = { stageClass: document.querySelector('.stage')?.className, htmlClass: document.documentElement.className };

  // toast for Practice
  const practice = [...document.querySelectorAll('.topbar .nav__item')].find(b => b.dataset.nav === 'Practice');
  practice.click(); await wait(300);
  out.toast = { cls: document.querySelector('.toast')?.className, text: txt(document.querySelector('.toast')), role: document.querySelector('.toast')?.getAttribute('role') };

  return out;
})()
