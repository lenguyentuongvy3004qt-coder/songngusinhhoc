import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('site-header');
if (idx !== -1) {
  // Let's print 1500 chars before and 6000 chars after
  console.log(layout.substring(idx - 1500, idx + 8000));
}
