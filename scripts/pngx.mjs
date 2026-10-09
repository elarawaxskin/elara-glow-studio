// Shared PNG decode/encode helpers (no deps). Writes globalThis.pngx = {decodePng, encodePng, sampleBilinear}.
import { readFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';

export function decodePng(path) {
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
