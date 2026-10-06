/**
 * Generates raster brand assets from the vector logo mark.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Source:  public/images/logo-mark.svg  (vector recreation of the company mark)
 * Outputs:
 *   public/favicon.svg, public/favicon.png (256)
 *   public/icons/favicon-32.png, apple-touch-icon.png (180), icon-192.png, icon-512.png
 *   public/images/logo-mark.png (1024, transparent)
 *   public/images/logo-mark-2048.png (2048, transparent — for print/partners)
 *   public/images/og-default.jpg (1200×630 social-sharing image)
 */
import sharp from 'sharp';
import fs from 'node:fs';

const SVG = fs.readFileSync('public/images/logo-mark.svg');
const NAVY = '#002d48';

const mark = (size) => sharp(SVG, { density: 300 }).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png();

// Icon on a white tile with breathing room (for touch / PWA icons).
async function tile(size, pad) {
  const inner = await sharp(SVG, { density: 300 }).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: inner, left: pad, top: pad }])
    .png();
}

fs.mkdirSync('public/icons', { recursive: true });
fs.copyFileSync('public/images/logo-mark.svg', 'public/favicon.svg');
await mark(256).toFile('public/favicon.png');
await mark(32).toFile('public/icons/favicon-32.png');
await (await tile(180, 18)).toFile('public/icons/apple-touch-icon.png');
await (await tile(192, 20)).toFile('public/icons/icon-192.png');
await (await tile(512, 52)).toFile('public/icons/icon-512.png');
await mark(1024).toFile('public/images/logo-mark.png');
await mark(2048).toFile('public/images/logo-mark-2048.png');

// Social-sharing image: hero photo, navy overlay, logo tile + wordmark.
const hero = await sharp('src/assets/photos/hero-port.jpg').resize(1200, 630, { fit: 'cover' }).toBuffer();
const overlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${NAVY}" stop-opacity=".95"/><stop offset="1" stop-color="${NAVY}" stop-opacity=".55"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="230" y="290" font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="700" fill="#fff">Quality Shipping Services</text>
    <text x="230" y="345" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#7fd3ec" letter-spacing="2">FREIGHT FORWARDING &amp; LOGISTICS — INDIA</text>
    <text x="230" y="410" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="rgba(255,255,255,.8)">Ocean Freight · Air Freight · Import &amp; Export Logistics · Project Cargo</text>
  </svg>`,
);
const logoTile = await (await tile(150, 16)).toBuffer();
const rounded = Buffer.from(`<svg width="150" height="150"><rect width="150" height="150" rx="18" ry="18" fill="#fff"/></svg>`);
const logoRounded = await sharp(logoTile).composite([{ input: rounded, blend: 'dest-in' }]).png().toBuffer();
await sharp(hero)
  .composite([{ input: overlay }, { input: logoRounded, left: 60, top: 240 }])
  .jpeg({ quality: 86 })
  .toFile('public/images/og-default.jpg');

console.log('Brand assets generated.');
