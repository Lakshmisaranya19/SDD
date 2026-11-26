(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  location.hash = '#/caching/5'; await wait(1600);
  const samples = [];
  for (let i = 0; i < 6; i++) {
    samples.push({
      t: i * 500,
      reading: [...document.querySelectorAll('.guide__content .is-reading')].map(e => txt(e).slice(0, 90)),
      guidePaused: document.querySelector('#guide').classList.contains('is-paused'),
      pauseBtn: txt(document.querySelector('#pause')),
    });
    await wait(500);
  }
  document.querySelector('#pause').click(); await wait(400);
  const paused = {
    guidePaused: document.querySelector('#guide').classList.contains('is-paused'),
    pauseBtn: txt(document.querySelector('#pause')),
    readingOpacity: document.querySelector('.guide__content .is-reading') ? getComputedStyle(document.querySelector('.guide__content .is-reading')).backgroundColor : null,
  };
  document.querySelector('#pause').click(); await wait(300);
  return { samples, paused, after: { guidePaused: document.querySelector('#guide').classList.contains('is-paused'), pauseBtn: txt(document.querySelector('#pause')) } };
})()
