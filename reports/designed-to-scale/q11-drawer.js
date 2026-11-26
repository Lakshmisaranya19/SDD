(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const sb = document.querySelector('#sidebar');
  const cs = getComputedStyle(sb);
  const info = () => ({
    htmlClass: document.documentElement.className,
    menuExpanded: document.querySelector('#menu-btn').getAttribute('aria-expanded'),
    sidebarClass: sb.className,
    transform: cs.transform, left: cs.left, visibility: cs.visibility, opacity: cs.opacity,
    rect: (() => { const r = sb.getBoundingClientRect(); return { x: Math.round(r.x), w: Math.round(r.width) }; })(),
    backdrop: (() => { const b = document.querySelector('#drawer-backdrop'); const r = b?.getBoundingClientRect(); return b ? { display: getComputedStyle(b).display, opacity: getComputedStyle(b).opacity, w: Math.round(r.width) } : null; })(),
    focus: document.activeElement?.id || document.activeElement?.className || document.activeElement?.tagName,
    navVisible: getComputedStyle(document.querySelector('.topbar .nav')).display,
  });
  const out = { closed: info() };
  document.querySelector('#menu-btn').click();
  await wait(500);
  out.open = info();
  out.openAside = { ariaLabel: sb.getAttribute('aria-label'), progress: txt(sb.querySelector('#progress')), lessonCount: sb.querySelectorAll('li.lesson').length };
  document.querySelector('#drawer-close').click();
  await wait(500);
  out.afterClose = info();
  // click a lesson link inside the drawer (open first) to verify navigation + auto-close
  document.querySelector('#menu-btn').click(); await wait(450);
  const link = [...sb.querySelectorAll('a')].find(a => /sharding/.test(a.getAttribute('href') || ''));
  const beforeHash = location.hash;
  link.click(); await wait(900);
  out.lessonNav = { beforeHash, afterHash: location.hash, drawerClosed: !document.documentElement.classList.contains('is-drawer'), h1: txt(document.querySelector('h1')) };
  return out;
})()
