import fs from 'fs';

const code = fs.readFileSync('scripts/bio_illustration.js', 'utf-8');

const regex = /if\s*\(([^)]+)\)\s*\{/g;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log(m[1].trim());
}
