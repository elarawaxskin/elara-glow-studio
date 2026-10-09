// Generates public/og-image.png (1200x630): Silence bg + Perch ring + E + Perch footer bar.
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

const W = 1200, H = 630;
const rgba = Buffer.alloc(W * H * 4);
const cx = W / 2, cy = H / 2 - 40;
const r = 150, stroke = 14;
// E glyph (block serif-ish)
const t = 34, w = 130, h = 190;
const x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2);
const y0 = Math.round(cy - h / 2), y1 = Math.round(cy + h / 2), ym = Math.round(cy - t / 2);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let rgb = SILENCE;
    // bottom Perch bar
    if (y >= H - 110) rgb = PERCH;
    else {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      if (Math.abs(d - r) <= stroke / 2) rgb = PERCH;
      const inE =
        (x >= x0 && x < x0 + t && y >= y0 && y <= y1) ||
        (y >= y0 && y < y0 + t && x >= x0 && x <= x1) ||
        (y >= ym && y < ym + t && x >= x0 && x <= x1) ||
        (y >= y1 - t && y <= y1 && x >= x0 && x <= x1);
      if (inE) rgb = PERCH;
    }
    const i = (y * W + x) * 4;
    rgba[i] = rgb[0]; rgba[i + 1] = rgb[1]; rgba[i + 2] = rgb[2]; rgba[i + 3] = 255;
  }
}
writeFileSync('public/og-image.png', encodePng(W, H, rgba));
console.log('wrote public/og-image.png 1200x630');
