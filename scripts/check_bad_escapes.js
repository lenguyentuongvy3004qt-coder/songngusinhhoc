import fs from 'fs';

const code = fs.readFileSync('src/components/common/BioIllustration.jsx', 'utf-8');

// Check for any backslash followed by non-escapable characters in strings
const regex = /\\(.)/g;
let m;
let bad = [];
while ((m = regex.exec(code)) !== null) {
  const char = m[1];
  if (!['n', 'r', 't', 'b', 'f', 'v', '0', "'", '"', '\\', '/', 'u', 'x', 'd', 's', 'w', 'b', 'i'].includes(char)) {
    bad.push({ index: m.index, snippet: code.substring(m.index - 10, m.index + 15) });
  }
}

console.log('Bad escape count:', bad.length);
console.log('Bad escapes sample:', bad.slice(0, 10));
