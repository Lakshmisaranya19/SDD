(() => {
  const rules = [];
  const walk = (list, media) => {
    for (const r of list) {
      if (r.selectorText && /sidebar/.test(r.selectorText)) rules.push({ media: media || null, sel: r.selectorText, css: r.style.cssText.slice(0, 300), transform: r.style.transform, vis: r.style.visibility });
      if (r.cssRules) walk(r.cssRules, media || r.conditionText || r.cssText.slice(0, 40));
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules, null); } catch (e) {} }
  return { count: document.styleSheets.length, rules };
})()
