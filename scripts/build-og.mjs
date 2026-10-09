// OG image FROM public/logo.png onto Silence bg. Usage: node scripts/build-og.mjs
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { decodePng } from './pngx.mjs';

const crcT = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length, 0); const tb = Buffer.from(ty, 'ascii'); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0); return Buffer.concat([l, tb, d, cr]); };
const enc = (w, h, rgba) => { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); } const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6; return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ih), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]); };
const px = (s, x, y) => { x = Math.max(0, Math.min(s.w - 1, x)); y = Math.max(0, Math.min(s.h - 1, y)); const i = (y * s.w + x) * 4; return [s.px[i], s.px[i+1], s.px[i+2], s.px[i+3]]; };
const samp = (s, fx, fy) => { const x0 = Math.floor(fx), y0 = Math.floor(fy), dx = fx - x0, dy = fy - y0; const a = px(s,x0,y0), b = px(s,x0+1,y0), c = px(s,x0,y0+1), d = px(s,x0+1,y0+1); return [0,1,2,3].map(k => Math.round(a[k]*(1-dx)*(1-dy)+b[k]*dx*(1-dy)+c[k]*(1-dx)*dy+d[k]*dx*dy)); };

const SIL = [247, 237, 229];
const logo = decodePng('public/logo.png');
const W = 1200, H = 630;
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) { rgba[i*4] = SIL[0]; rgba[i*4+1] = SIL[1]; rgba[i*4+2] = SIL[2]; rgba[i*4+3] = 255; }
const s = Math.min(760 / logo.w, 500 / logo.h);
const dw = Math.round(logo.w * s), dh = Math.round(logo.h * s);
const ox = Math.round((W - dw) / 2), oy = Math.round((H - dh) / 2);
for (let y = 0; y < dh; y++) for (let x = 0; x < dw; x++) {
  const r = samp(logo, x / s, y / s);
  if (r[3] < 8) continue;
  const i = ((oy + y) * W + ox + x) * 4, al = r[3] / 255;
  rgba[i] = Math.round(r[0]*al+rgba[i]*(1-al)); rgba[i+1] = Math.round(r[1]*al+rgba[i+1]*(1-al)); rgba[i+2] = Math.round(r[2]*al+rgba[i+2]*(1-al));
}
writeFileSync('public/og-image.png', enc(W, H, rgba));
console.log('wrote public/og-image.png from logo.png', dw + 'x' + dh);
