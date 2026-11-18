import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('mobile-menu-drawer');
if (idx !== -1) {
  console.log(layout.substring(idx - 100, idx + 4000));
}
