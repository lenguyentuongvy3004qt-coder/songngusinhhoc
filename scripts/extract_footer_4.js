import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('footer-links-group');
if (idx !== -1) {
  console.log(layout.substring(idx, idx + 3500));
}
