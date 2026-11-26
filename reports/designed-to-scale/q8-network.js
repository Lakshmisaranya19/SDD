(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const perf = () => performance.getEntriesByType('resource').map(e => ({
    name: e.name.replace(location.origin, ''),
    initiator: e.initiatorType,
    bytes: e.transferSize,
    dur: Math.round(e.duration),
  }));
  const before = perf();
  // switch back to English
  const langBtn = document.querySelector('.topbar .lang__btn');
  langBtn.click(); await wait(250);
  const en = [...document.querySelectorAll('#lang-menu .lang__item')].find(b => b.textContent.trim().startsWith('EN'));
  en.click(); await wait(1500);
  const after = perf();
  const sw = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistrations().then(r => r.map(x => ({ scope: x.scope, state: x.active?.state }))) : 'unsupported';
  let manifest = null;
  try { manifest = await (await fetch('/site.webmanifest')).json(); } catch (e) { manifest = { error: String(e) }; }
  let fonts = [];
  try { document.fonts.forEach(f => fonts.push({ family: f.family, status: f.status })); } catch (e) {}
  return {
    langRestored: { h1: document.querySelector('h1')?.textContent.trim(), stored: localStorage.getItem('sdt:lang') },
    newResources: after.filter(a => !before.some(b => b.name === a.name)),
    allResources: after,
    serviceWorker: sw,
    manifest,
    fonts,
    caches: 'caches' in window ? await caches.keys() : 'unsupported',
    storageEstimate: navigator.storage?.estimate ? await navigator.storage.estimate() : null,
    localStorageAll: { ...localStorage },
  };
})()
