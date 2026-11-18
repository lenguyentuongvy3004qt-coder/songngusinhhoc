import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

// Find where site-header is used
const idx = layout.indexOf('site-header');
if (idx !== -1) {
  console.log('=== SITE-HEADER CONTEXT ===');
  console.log(layout.substring(idx - 500, idx + 4000));
} else {
  console.log('site-header not found');
}
