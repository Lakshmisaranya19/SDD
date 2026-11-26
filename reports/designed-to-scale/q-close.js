(() => {
  if (document.documentElement.classList.contains('is-drawer')) document.querySelector('#drawer-close').click();
  return { htmlClass: document.documentElement.className, layout: document.documentElement.dataset.layout };
})()
