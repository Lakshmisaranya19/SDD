(() => {
  const q = s => [...document.querySelectorAll(s)];
  return {
    title: document.title,
    url: location.href,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    theme: document.documentElement.dataset.theme || null,
    layout: document.documentElement.dataset.layout,
    startLang: document.documentElement.dataset.startLang,
    bodyClass: document.body.className,
    storage: Object.fromEntries(Object.entries(localStorage)),
    headings: q('h1,h2,h3').slice(0, 60).map(e => ({ tag: e.tagName, cls: e.className, text: e.textContent.trim().slice(0, 120) })),
    links: q('a[href]').map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 80), cls: a.className })),
    buttons: q('button').map(b => ({ text: b.textContent.trim().slice(0, 60), aria: b.getAttribute('aria-label'), cls: b.className, disabled: b.disabled, pressed: b.getAttribute('aria-pressed'), expanded: b.getAttribute('aria-expanded') })),
    landmarks: q('[role],header,nav,main,aside,footer,section').slice(0, 80).map(e => ({ tag: e.tagName, role: e.getAttribute('role'), id: e.id, cls: e.className, label: e.getAttribute('aria-label') })),
    forms: q('form').map(f => ({ id: f.id, cls: f.className, controls: [...f.elements].map(x => ({ tag: x.tagName, type: x.type, name: x.name, placeholder: x.placeholder, value: x.value })) })),
    appHtmlLength: document.getElementById('app')?.innerHTML.length,
  };
})()
