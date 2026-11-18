import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');

const idx = layout.indexOf('Luyện tập 5 chế độ');
if (idx !== -1) {
  console.log(layout.substring(idx, idx + 3500));
}
