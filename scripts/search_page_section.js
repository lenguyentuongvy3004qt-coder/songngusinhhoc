import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('section-header-block');
if (idx !== -1) {
  console.log(page.substring(idx - 100, idx + 1500));
}
