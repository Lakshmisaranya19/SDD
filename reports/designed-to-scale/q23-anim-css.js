(() => {
  const rules = [];
  const walk = list => { for (const r of list) { if (r.selectorText && /is-fresh|guide__content|is-in|timeline__step|stage-svg|toast|sx__dialog|is-full|cards-inline/.test(r.selectorText)) rules.push({ sel: r.selectorText, css: r.style.cssText.slice(0, 260) }); if (r.cssRules) walk(r.cssRules); } };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  const gc = document.querySelector('.guide__content');
  const st = document.querySelector('.stage-svg');
  return {
    rules: rules.slice(0, 40),
    guideContent: gc ? { transition: getComputedStyle(gc).transition, animation: getComputedStyle(gc).animation, transform: getComputedStyle(gc).transform } : null,
    stageSvg: st ? { transition: getComputedStyle(st).transition, animation: getComputedStyle(st).animation } : null,
    keyframes: (() => { const out = []; const walk2 = list => { for (const r of list) { if (r.type === CSSRule.KEYFRAMES_RULE) out.push(r.name); if (r.cssRules) walk2(r.cssRules); } }; for (const s of document.styleSheets) { try { walk2(s.cssRules); } catch (e) {} } return out; })(),
  };
})()
