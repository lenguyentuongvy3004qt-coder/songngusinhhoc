import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('Kho học liệu số Việt');
if (idx !== -1) {
  console.log(page.substring(idx - 100, idx + 8000));
}
