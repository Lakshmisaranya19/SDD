import fs from 'node:fs';
const j = JSON.parse(fs.readFileSync('q9.out.json', 'utf8').replace(/^\uFEFF/, ''));
const rows = j.map(l => {
  const min = (l.head.match(/(\d+) min/) || [])[1] || '';
  const lvl = (l.head.match(/(Beginner|Intermediate|Advanced)/) || [])[1] || '';
  const mod = (l.head.match(/^([^/]+?)\s*\//) || [])[1] || '';
  return { id: l.id, title: l.h1, mod, min, lvl, steps: l.stepCount, stepNames: l.steps.join(' → ') };
});
let md = '| # | Lesson | ID | Module | Min | Level | Steps |\n|---|---|---|---|---|---|---|\n';
rows.forEach((r, i) => {
  md += `| ${i + 1} | ${r.title} | \`${r.id}\` | ${r.mod} | ${r.min} | ${r.lvl} | ${r.steps} |\n`;
});
fs.writeFileSync('appendix-lessons.md', md);
fs.writeFileSync('lessons-raw.json', JSON.stringify(rows, null, 1));
console.log('rows', rows.length, 'total steps', rows.reduce((n, r) => n + r.steps, 0));
console.log('durations', [...new Set(rows.map(r => r.min))].join(','));
console.log('levels', [...new Set(rows.map(r => r.lvl))].join(','));
console.log('modules', [...new Set(rows.map(r => r.mod))].join(' | '));
