// Alager Site — generates favicon variants, PWA icons and the OG image
// from the ALAGER sunburst mark. Run: node scripts/generate-icons.js
const sharp = require("sharp");

const GREEN = "#0a3d2e";
const GREEN_DEEP = "#07301f";
const SAGE = "#d4e3c4";
const GOLD = "#c8a85a";
const CREAM = "#f5f2ea";

// The sunburst mark, centered on (20,20) in a 40x40 space.
const mark = (scale = 1, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <circle cx="20" cy="20" r="15" stroke="${SAGE}" stroke-width="1.5" fill="none"/>
    <path d="M20 7 L20 20 L29 14 Z" fill="${SAGE}"/>
    <path d="M20 20 L9 25 L20 32 Z" fill="${SAGE}" opacity="0.85"/>
    <path d="M20 20 L31 25 L20 32 Z" fill="${GOLD}"/>
    <circle cx="20" cy="20" r="1.5" fill="${CREAM}"/>
  </g>`;

async function main() {
  // favicon (rounded square) — also written to src/app/icon.svg
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="${GREEN}"/>${mark()}</svg>`;

  for (const size of [192, 512]) {
    await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toFile(`public/icon-${size}.png`);
    console.log(`icon-${size}.png OK`);
  }

  // maskable (full-bleed, mark padded into the ~66% safe zone)
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="${GREEN}"/>${mark(0.66, 6.8, 6.8)}</svg>`;
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile("public/maskable-icon-512.png");
  console.log("maskable-icon-512.png OK");

  // Open Graph image (1200x630)
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${GREEN_DEEP}"/>
        <stop offset="1" stop-color="${GREEN}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <g transform="translate(960,60) scale(3.6)" opacity="0.5">
      <circle cx="20" cy="20" r="19" stroke="${GOLD}" stroke-width="1" fill="none"/>
      <path d="M20 6 L20 20 L30 14 Z" fill="${GOLD}" opacity="0.55"/>
      <path d="M20 20 L8 26 L20 34 Z" fill="${GOLD}" opacity="0.35"/>
      <path d="M20 20 L32 26 L20 34 Z" fill="${SAGE}" opacity="0.6"/>
    </g>
    <text x="80" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-weight="600" fill="${CREAM}" letter-spacing="6">ALAGER</text>
    <text x="82" y="350" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${GOLD}">Associação Latino-Americana de Energia Renovável</text>
    <rect x="82" y="395" width="120" height="4" fill="${GOLD}"/>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).png().toFile("src/app/opengraph-image.png");
  console.log("opengraph-image.png OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
