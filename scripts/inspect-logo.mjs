import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

function decodePng(path) {
  const b = readFileSync(path);
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
  const colorType = b[25];
  let pos = 8; const idat = [];
  while (pos < b.length) {
    const len = b.readUInt32BE(pos);
    const type = b.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat.push(b.subarray(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = w * channels;
  const out = Buffer.alloc(w * h * channels);
  let p = 0;
  const a = Buffer.alloc(stride), prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[p++];
    for (let i = 0; i < stride; i++) {
      const v = raw[p++];
      const left = i >= channels ? a[i - channels] : 0;
      const up = prev[i];
      const upLeft = i >= channels ? prev[i - channels] : 0;
      let r;
      if (f === 0) r = v;
      else if (f === 1) r = (v + left) & 255;
      else if (f === 2) r = (v + up) & 255;
      else if (f === 3) r = (v + ((left + up) >> 1)) & 255;
      else { const pa = Math.abs(up - upLeft), pb = Math.abs(left - upLeft), pc = Math.abs(left + up - 2 * upLeft); r = (v + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 255; }
      a[i] = r;
    }
    a.copy(out, y * stride);
    a.copy(prev);
  }
  return { w, h, channels, px: out };
}

const L = decodePng('public/logo.png');
// alpha bounding box
let minX = L.w, maxX = -1, minY = L.h, maxY = -1;
for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
  if (L.px[(y * L.w + x) * 4 + 3] > 10) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}
console.log('logo bbox', minX, minY, maxX, maxY, 'w=' + (maxX - minX + 1), 'h=' + (maxY - minY + 1));
// row alpha profile (find gaps between mark / wordmark / subline)
const rows = [];
for (let y = 0; y < L.h; y += 4) {
  let n = 0;
  for (let x = 0; x < L.w; x++) if (L.px[(y * L.w + x) * 4 + 3] > 10) n++;
  rows.push(y + ':' + n);
}
console.log(rows.join(' '));
