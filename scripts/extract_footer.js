import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('site-footer');
if (idx !== -1) {
  console.log(layout.substring(idx - 100, idx + 2500));
} else {
  console.log('site-footer not found');
}
