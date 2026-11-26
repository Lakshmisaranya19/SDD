(() => {
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const head = document.querySelector('#head');
  return {
    html: head.innerHTML.slice(0, 2200),
    children: [...head.querySelectorAll('*')].map(e => ({ tag: e.tagName, cls: String(e.className), text: e.children.length === 0 ? txt(e) : undefined })).slice(0, 40),
  };
})()
