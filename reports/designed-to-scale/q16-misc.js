(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const out = {};
  const state = () => ({ hash: location.hash, h1: txt(document.querySelector('h1')), title: document.title, step: txt(document.querySelector('#timeline li.is-current')), done: localStorage.getItem('sdt:done'), progress: txt(document.querySelector('#progress .progress__head')) });

  location.hash = '#/sharding/1'; await wait(900);
  out.start = state();

  // invalid lesson id
  location.hash = '#/does-not-exist/5'; await wait(900);
  out.invalidLesson = state();

  // out-of-range step
  location.hash = '#/sharding/999'; await wait(1200);
  out.stepClamp = state();

  // malformed hash
  location.hash = '#/sharding'; await wait(800);
  out.malformed = state();

  // keyboard
  location.hash = '#/sharding/1'; await wait(900);
  const key = (k, extra = {}) => window.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...extra }));
  key('ArrowRight'); await wait(700);
  out.keyRight = state();
  key('ArrowLeft'); await wait(700);
  out.keyLeft = state();
  const labelBefore = txt(document.querySelector('#pause'));
  key(' '); await wait(400);
  out.space = { labelBefore, labelAfter: txt(document.querySelector('#pause')), cls: document.querySelector('#pause')?.className };
  key(' '); await wait(300);

  // progress card expand
  const phead = document.querySelector('#progress .progress__head');
  out.progressBefore = { expanded: phead?.getAttribute('aria-expanded'), cls: document.querySelector('#progress')?.className, height: Math.round(document.querySelector('#progress')?.getBoundingClientRect().height) };
  phead?.click(); await wait(600);
  out.progressAfter = { expanded: document.querySelector('#progress .progress__head')?.getAttribute('aria-expanded'), cls: document.querySelector('#progress')?.className, height: Math.round(document.querySelector('#progress')?.getBoundingClientRect().height), text: txt(document.querySelector('#progress')).slice(0, 300), actions: [...document.querySelectorAll('#progress button')].map(b => txt(b)).slice(0, 20) };
  document.querySelector('#progress .progress__head')?.click(); await wait(400);

  // search: open + type + Enter selects first result
  document.querySelector('#search-open').click(); await wait(400);
  const input = document.querySelector('.sx__input');
  input.value = 'replication'; input.dispatchEvent(new Event('input', { bubbles: true }));
  await wait(1000);
  out.searchBeforeEnter = { sel: txt(document.querySelector('.sx__item.is-sel'))?.slice(0, 100), count: document.querySelectorAll('.sx__item').length, groups: [...document.querySelectorAll('.sx__group')].map(txt) };
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  await wait(1200);
  out.searchAfterEnter = state();
  out.searchClosed = !document.querySelector('.sx__dialog')?.parentElement?.classList.contains('is-open');

  return out;
})()
