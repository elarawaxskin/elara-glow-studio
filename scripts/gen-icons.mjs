// Generates Elara favicon PNG set (no deps): Silence bg + Perch ring + E monogram.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const SILENCE = [247, 237, 229];
const PERCH = [54, 61, 50];

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

function drawIcon(size, { ring = true } = {}) {
  const rgba = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size / 2;
  const r = size * 0.36;
  const stroke = Math.max(1.5, size * 0.045);
  // E glyph metrics
  const t = Math.max(2, Math.round(size * 0.075));
  const w = size * 0.27, h = size * 0.4;
  const x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2);
  const y0 = Math.round(cy - h / 2), y1 = Math.round(cy + h / 2), ym = Math.round(cy - t / 2);
  const inE = (x, y) =>
    (x >= x0 && x < x0 + t && y >= y0 && y <= y1) ||
    (y >= y0 && y < y0 + t && x >= x0 && x <= x1) ||
    (y >= ym && y < ym + t && x >= x0 && x <= x1) ||
    (y >= y1 - t && y <= y1 && x >= x0 && x <= x1);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rgb = SILENCE;
      if (ring) {
        const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
        if (Math.abs(d - r) <= stroke / 2) rgb = PERCH;
      }
      if (inE(x, y)) rgb = PERCH;
      const i = (y * size + x) * 4;
      rgba[i] = rgb[0]; rgba[i + 1] = rgb[1]; rgba[i + 2] = rgb[2]; rgba[i + 3] = 255;
    }
  }
  return rgba;
}

const targets = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/favicon-48x48.png', 48],
  ['public/apple-touch-icon.png', 180],
  ['public/android-chrome-192x192.png', 192],
  ['public/android-chrome-512x512.png', 512],
];

for (const [out, size] of targets) {
  writeFileSync(out, encodePng(size, size, drawIcon(size)));
  console.log('wrote', out, size + 'x' + size);
}

// favicon.ico = ICO container with PNG-compressed entries (16/32/48)
import { readFileSync } from 'node:fs';
const entries = [16, 32, 48].map((s) => readFileSync(`public/favicon-${s}x${s}.png`));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = 6 + 16 * entries.length;
const dirParts = [];
entries.forEach((png, i) => {
  const s = [16, 32, 48][i];
  const d = Buffer.alloc(16);
  d[0] = s >= 256 ? 0 : s; d[1] = d[0]; d[2] = 0; d[3] = 0;
  d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6);
  d.writeUInt32LE(png.length, 8); d.writeUInt32LE(offset, 12);
  offset += png.length;
  dirParts.push(d);
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...dirParts, ...entries]));
console.log('wrote public/favicon.ico');
