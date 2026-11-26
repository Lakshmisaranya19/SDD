(() => {
  const txt = e => (e?.textContent || '').trim().replace(/\s+/g, ' ');
  const q = s => document.querySelector(s);
  return {
    speak: q('.speak') ? { html: q('.speak').outerHTML.slice(0, 500), display: getComputedStyle(q('.speak')).display } : null,
    speakBtn: q('#speak') ? { aria: q('#speak').getAttribute('aria-label'), title: q('#speak').title, pressed: q('#speak').getAttribute('aria-pressed') } : null,
    voiceMenu: q('.voice-menu') ? { hidden: q('.voice-menu').hidden, items: [...q('.voice-menu').querySelectorAll('.voice-menu__item')].map(txt) } : null,
    speechSynthesis: 'speechSynthesis' in window,
    voices: 'speechSynthesis' in window ? speechSynthesis.getVoices().length : null,
    localStorage: { ...localStorage },
    tools: [...document.querySelectorAll('.stage .tool')].map(b => ({ text: txt(b), title: b.title, aria: b.getAttribute('aria-label'), cls: b.className })),
    legend: q('.legend') ? txt(q('.legend')) : null,
    chips: [...document.querySelectorAll('.chip')].map(c => ({ k: c.dataset.k, level: c.dataset.level, label: txt(c.querySelector('.chip__label')), value: txt(c.querySelector('.chip__value')) })),
    scene: (() => { const s = q('.stage-svg'); return s ? { viewBox: s.getAttribute('viewBox'), texts: [...s.querySelectorAll('text')].map(txt).slice(0, 30) } : null; })(),
  };
})()
