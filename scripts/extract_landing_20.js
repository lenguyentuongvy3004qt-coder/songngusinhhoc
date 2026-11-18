import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('bio-cta-panel');
if (idx !== -1) {
  console.log(page.substring(idx, idx + 4000));
}
