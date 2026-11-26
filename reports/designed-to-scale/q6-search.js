(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const out = {};
  const dlg = document.querySelector('.sx__dialog');
  const input = document.querySelector('.sx__input');

  document.querySelector('#search-open').click();
  await wait(350);
  out.open = {
    open: dlg.classList.contains('is-open'), hidden: dlg.hidden,
    active: document.activeElement === input,
    label: txt(document.querySelector('.sx__group')),
    groups: [...document.querySelectorAll('.sx__group')].map(txt),
    resultCount: document.querySelectorAll('.sx__item').length,
    footer: txt(document.querySelector('.sx__foot, .sx__count, .sx__status')),
    dialogClass: dlg.className,
  };

  input.value = 'cache'; input.dispatchEvent(new Event('input', { bubbles: true }));
  await wait(900);
  out.queryCache = {
    groups: [...document.querySelectorAll('.sx__group')].map(txt),
    items: [...document.querySelectorAll('.sx__item')].slice(0, 12).map(i => ({ cls: i.className, text: txt(i).slice(0, 90), id: i.id, sel: i.getAttribute('aria-selected') })),
    count: document.querySelectorAll('.sx__item').length,
    meta: txt(document.querySelector('.sx__meta, .sx__count')),
    empty: !!document.querySelector('.sx__empty'),
    hints: [...document.querySelectorAll('.sx__hint, .sx__kbd')].map(txt),
  };

  input.value = 'zzzznotfound'; input.dispatchEvent(new Event('input', { bubbles: true }));
  await wait(700);
  out.queryEmpty = {
    empty: txt(document.querySelector('.sx__empty')),
    count: document.querySelectorAll('.sx__item').length,
  };

  document.querySelector('.sx__esc')?.click(); await wait(350);
  out.closed = { open: dlg.classList.contains('is-open'), hidden: dlg.hidden };

  // keyboard shortcut path: Ctrl+K opens
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
  await wait(350);
  out.ctrlK = { open: document.querySelector('.sx__dialog')?.classList.contains('is-open'), active: document.activeElement === document.querySelector('.sx__input') };
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await wait(300);
  out.escClosed = { open: document.querySelector('.sx__dialog')?.classList.contains('is-open') };
  return out;
})()
