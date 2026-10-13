from PIL import Image, ImageStat
import os
o = os.path.join("public", "treatments.orig", "hydro_jelly_mask.jpg")
g0 = Image.open(o).convert("L")
w, h = g0.size
print("size", w, h)
# Scan columns: where does the bright figure start/end at mid height?
y = h // 2
row = [g0.getpixel((x, y)) for x in range(w)]
left_edge = next(i for i, v in enumerate(row) if v > 140)
right_edge = next(i for i, v in enumerate(reversed(row)) if v > 140)
print("figure spans x:", left_edge, "to", w - 1 - right_edge)
print("bg left of figure:", round(sum(row[:left_edge]) / max(1, left_edge), 1))
print("outside right:", round(sum(row[w-right_edge:]) / max(1, right_edge), 1))
# Scan rows at center x
x = w // 2
col = [g0.getpixel((x, yy)) for yy in range(h)]
top_edge = next(i for i, v in enumerate(col) if v > 140)
print("figure starts y:", top_edge)




