import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('function BioIllustration');
if (idx !== -1) {
  const illusCode = page.substring(idx, idx + 15000);
  const tests = illusCode.match(/if\s*\(([^)]+)\)\s*\{/g);
  console.log('Organelles handled in BioIllustration:');
  console.log(tests);
}
