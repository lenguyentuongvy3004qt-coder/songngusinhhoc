import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('✨ NGỮ CẢNH SINH HỌC 10');
if (idx !== -1) {
  console.log(page.substring(idx, idx + 8000));
}
