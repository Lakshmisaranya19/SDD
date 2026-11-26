(() => {
  const txt = e => (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);
  const mods = [...document.querySelectorAll('#course .mod')].map(m => ({
    module: txt(m.querySelector('.mod__head')),
    count: txt(m.querySelector('.mod__count')),
    open: m.classList.contains('is-open'),
    lessons: [...m.querySelectorAll('li.lesson')].map(li => ({
      id: li.dataset.lesson,
      title: txt(li.querySelector('.lesson__title')),
      soon: li.classList.contains('is-soon'),
      done: li.classList.contains('is-done'),
      href: li.querySelector('a')?.getAttribute('href') || null,
    })),
    extras: [...m.querySelectorAll('a')].filter(a => !a.closest('li.lesson')).map(a => ({ href: a.getAttribute('href'), text: txt(a), cls: a.className })),
  }));
  const nav = [...document.querySelectorAll('.nav__item')].map(b => ({ text: txt(b), cls: b.className, dataset: { ...b.dataset } }));
  return {
    mods,
    lessonTotal: mods.reduce((n, m) => n + m.lessons.length, 0),
    nav,
    topbar: [...document.querySelector('.topbar').children].map(e => ({ tag: e.tagName, cls: e.className, id: e.id })),
    layoutSections: [...document.querySelector('.sheet').children].map(e => ({ tag: e.tagName, cls: e.className, id: e.id })),
    sheetClasses: document.querySelector('.sheet').className,
    route: { hash: location.hash, path: location.pathname, search: location.search },
  };
})()
