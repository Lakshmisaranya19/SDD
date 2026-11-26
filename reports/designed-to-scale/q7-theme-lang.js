(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const out = {};
  const rootStyle = () => {
    const cs = getComputedStyle(document.documentElement);
    return {
      theme: document.documentElement.dataset.theme || null,
      themeColor: document.querySelector('meta[name=theme-color]')?.content,
      paper: cs.getPropertyValue('--paper').trim(),
      ink: cs.getPropertyValue('--ink').trim(),
      bg: getComputedStyle(document.body).backgroundColor,
      stored: localStorage.getItem('sdt:theme'),
      aria: document.querySelector('#theme-btn')?.getAttribute('aria-label'),
    };
  };
  out.themeBefore = rootStyle();
  document.querySelector('#theme-btn').click();
  await wait(700);
  out.themeAfter = rootStyle();
  document.querySelector('#theme-btn').click();
  await wait(500);
  out.themeRestored = rootStyle();

  // language
  const langBtn = document.querySelector('.topbar .lang__btn');
  out.langMenuBefore = { expanded: langBtn.getAttribute('aria-expanded'), label: langBtn.getAttribute('aria-label'), optionCount: document.querySelectorAll('#lang-menu .lang__item').length };
  langBtn.click(); await wait(300);
  out.langMenuOpen = { expanded: document.querySelector('.topbar .lang__btn').getAttribute('aria-expanded'), visible: !document.querySelector('#lang-menu').hidden, focused: txt(document.activeElement) };
  const es = [...document.querySelectorAll('#lang-menu .lang__item')].find(b => b.textContent.trim().startsWith('ES'));
  es.click();
  await wait(1500);
  out.spanish = {
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    stored: localStorage.getItem('sdt:lang'),
    h1: txt(document.querySelector('h1')),
    nav: [...document.querySelectorAll('.topbar .nav__item')].map(txt),
    guideH2: txt(document.querySelector('#guide h2')),
    next: txt(document.querySelector('.btn-next')),
    steps: [...document.querySelectorAll('#timeline button')].slice(0, 4).map(txt),
    title: document.title,
    url: location.href,
    pending: document.documentElement.dataset.langPending || null,
  };
  return out;
})()
