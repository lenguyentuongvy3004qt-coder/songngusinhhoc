import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('const links');
if (idx !== -1) {
  console.log(layout.substring(idx - 100, idx + 500));
} else {
  // search for links =
  const m = layout.match(/links\s*=\s*\[[^\]]+\]/);
  console.log('links match:', m ? m[0] : 'not found');
}
