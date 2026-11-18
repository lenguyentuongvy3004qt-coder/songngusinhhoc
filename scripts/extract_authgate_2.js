import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('bio-loading-title');
if (idx !== -1) {
  console.log(layout.substring(idx, idx + 4500));
}
