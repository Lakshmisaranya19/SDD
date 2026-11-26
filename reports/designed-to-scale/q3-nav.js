(async () => {
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const click = async label => {
    const b = [...document.querySelectorAll('.topbar .nav__item')].find(x => x.textContent.trim() === label);
    b.click();
    await new Promise(r => setTimeout(r, 800));
    return routeSnapshot();
  };
  const routeSnapshot = () => ({
    hash: location.hash,
    path: location.pathname + location.search,
    title: document.title,
    navActive: [...document.querySelectorAll('.topbar .nav__item.is-active')].map(txt),
    h1: [...document.querySelectorAll('h1')].map(txt),
    h2: [...document.querySelectorAll('h2')].map(txt).slice(0, 30),
    sheetChildren: [...(document.querySelector('.sheet')?.children || [])].map(e => ({ tag: e.tagName, cls: e.className, id: e.id })),
    mainText: txt(document.querySelector('main'))?.slice(0, 700),
    buttons: [...document.querySelectorAll('main button')].map(b => ({ text: txt(b).slice(0, 40), aria: b.getAttribute('aria-label'), cls: b.className })).slice(0, 25),
  });
  return {
    practice: await click('Practice'),
    designLab: await click('Design Lab'),
    cheatsheets: await click('Cheatsheets'),
    learn: await click('Learn'),
  };
})()
