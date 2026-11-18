import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('function LandingPage');
if (idx !== -1) {
  console.log(page.substring(idx, idx + 8000));
} else {
  const m = page.match(/LandingPage[\s\S]{0,1000}/);
  console.log(m ? m[0] : 'not found');
}
