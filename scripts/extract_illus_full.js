import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

const idx = page.indexOf('function BioIllustration');
if (idx !== -1) {
  // Let's print until the next function
  const nextFunc = page.indexOf('function ', idx + 20);
  console.log('BioIllustration length:', nextFunc - idx);
  fs.writeFileSync('scripts/bio_illustration.js', page.substring(idx, nextFunc));
  console.log('Written scripts/bio_illustration.js');
}
