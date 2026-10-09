// Favicons FROM logo.png circle mark onto Silence bg. Usage: node scripts/build-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { decodePng } from './pngx.mjs';

const crcT = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length, 0); const tb = Buffer.from(ty, 'ascii'); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0); return Buffer.concat([l, tb, d, cr]); };
const enc = (w, h, rgba) => { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); } const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6; return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ih), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]); };
const pxRaw = (s, x, y) => { const i = (y * s.w + x) * 4; return [s.px[i], s.px[i+1], s.px[i+2], s.px[i+3]]; };
// Out-of-bounds = transparent (never clamp: clamping smears edge pixels into streaks).
const px = (s, x, y) => (x < 0 || y < 0 || x >= s.w || y >= s.h) ? [0, 0, 0, 0] : pxRaw(s, x, y);
const samp = (s, fx, fy) => { const x0 = Math.floor(fx), y0 = Math.floor(fy), dx = fx - x0, dy = fy - y0; const a = px(s,x0,y0), b = px(s,x0+1,y0), c = px(s,x0,y0+1), d = px(s,x0+1,y0+1); return [0,1,2,3].map(k => Math.round(a[k]*(1-dx)*(1-dy)+b[k]*dx*(1-dy)+c[k]*(1-dx)*dy+d[k]*dx*dy)); };

const SIL = [247, 237, 229];
const logo = decodePng('public/logo.png');
// logo.png layout: circular mark (top), "elara" wordmark (middle), "GLOW STUDIO" (bottom).
// Row profile shows mark ends ~y=122, wordmark starts ~y=136: split at the gap.
let split = 122;
{
  let best = -1;
  for (let y = 100; y <= 140; y++) {
    let n = 0;
    for (let x = 0; x < logo.w; x++) if (logo.px[(y * logo.w + x) * 4 + 3] > 10) n++;
    if (best === -1 || n < best) { best = n; split = y; }
  }
}
let mx0 = logo.w, mx1 = -1, my0 = logo.h, my1 = -1;
for (let y = 0; y <= split; y++) for (let x = 0; x < logo.w; x++) {
  if (logo.px[(y * logo.w + x) * 4 + 3] > 10) { if (x < mx0) mx0 = x; if (x > mx1) mx1 = x; if (y < my0) my0 = y; if (y > my1) my1 = y; }
}
// Shave margins: keep only rows/cols that actually belong to the ring.
// The 'e' ascender starts at y~136 in the left third — cut 2px above the gap row's min coverage.
const colCount = (x) => { let n = 0; for (let y = my0; y <= my1; y++) if (logo.px[(y * logo.w + x) * 4 + 3] > 10) n++; return n; };
while (mx0 <= mx1 && colCount(mx0) <= 2) mx0++;
while (mx1 >= mx0 && colCount(mx1) <= 2) mx1--;
const rowCount = (y) => { let n = 0; for (let x = mx0; x <= mx1; x++) if (logo.px[(y * logo.w + x) * 4 + 3] > 10) n++; return n; };
while (my0 <= my1 && rowCount(my0) <= 2) my0++;
// bottom: the mark's ring closes ~6px above the detected split (below that is wordmark bleed)
while (my1 > my0 && rowCount(my1) <= 4) my1--;
my1 = Math.min(my1, split - 4);
console.log('tight mark bbox', mx0, my0, mx1, my1);
const side = Math.max(mx1 - mx0 + 1, my1 - my0 + 1);
// Small pad only: the icon builder already adds ~10% margin, and a big
// crop square dips into the "elara" wordmark below the ring.
const pad = 6;
const cs = side + pad * 2;
// Center horizontally, but pin the top so the crop never reaches the wordmark.
const cxm = (mx0 + mx1 + 1) / 2;
const sx = Math.round(Math.max(0, Math.min(logo.w - cs, cxm - cs / 2)));
const sy = Math.round(Math.max(0, Math.min(logo.h - cs, my0 - pad)));
console.log('mark crop', sx, sy, cs);

const icon = (size) => {
  const rgba = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i++) { rgba[i*4] = SIL[0]; rgba[i*4+1] = SIL[1]; rgba[i*4+2] = SIL[2]; rgba[i*4+3] = 255; }
  const d = size * 0.8, o = (size - d) / 2, k = d / cs;
  for (let y = 0; y < Math.ceil(d); y++) for (let x = 0; x < Math.ceil(d); x++) {
    const r = samp(logo, sx + x / k, sy + y / k);
    if (r[3] < 8) continue;
    const dx = Math.round(o + x), dy = Math.round(o + y);
    if (dx < 0 || dy < 0 || dx >= size || dy >= size) continue;
    const i = (dy * size + dx) * 4, al = r[3] / 255;
    rgba[i] = Math.round(r[0]*al+rgba[i]*(1-al)); rgba[i+1] = Math.round(r[1]*al+rgba[i+1]*(1-al)); rgba[i+2] = Math.round(r[2]*al+rgba[i+2]*(1-al));
  }
  return rgba;
};
for (const [o, s] of [['public/favicon-16x16.png',16],['public/favicon-32x32.png',32],['public/favicon-48x48.png',48],['dist/apple-touch-icon.png',180],['dist/android-chrome-192x192.png',192],['dist/android-chrome-512x512.png',512]]) {
  writeFileSync(o, enc(s, s, icon(s))); console.log('wrote', o);
}
const ent = [16, 32, 48].map((s) => readFileSync(`public/favicon-${s}x${s}.png`));
const hd = Buffer.alloc(6); hd.writeUInt16LE(0,0); hd.writeUInt16LE(1,2); hd.writeUInt16LE(ent.length,4);
let off = 6 + 16 * ent.length; const parts = [];
ent.forEach((p, i) => { const dd = Buffer.alloc(16); dd[0] = [16,32,48][i]; dd[1] = dd[0]; dd.writeUInt16LE(1,4); dd.writeUInt16LE(32,6); dd.writeUInt32LE(p.length,8); dd.writeUInt32LE(off,12); off += p.length; parts.push(dd); });
writeFileSync('public/favicon.ico', Buffer.concat([hd, ...parts, ...ent]));
console.log('wrote public/favicon.ico from logo mark');
