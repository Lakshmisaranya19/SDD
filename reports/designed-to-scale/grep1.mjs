import fs from 'node:fs';
const s = fs.readFileSync('app.js', 'utf8');
let i = s.indexOf('wheel",e=>');
console.log(s.slice(i - 260, i + 620));
console.log('---CREDIT---');
let j = s.indexOf('class="credit"');
console.log(s.slice(j - 260, j + 320));
