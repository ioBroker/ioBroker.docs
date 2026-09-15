#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bildvorlagen fuer die ioBroker-Kanaele, im Stil der Website.

Dunkler Grund, ein Lichtschein in Markenblau, die Kennzeile mit den zwei
Schraegstrichen, die Ueberschrift in Audiowide, die Wortmarke unten rechts.
Drei Formate: Facebook und Forum (1200x630), Instagram-Beitrag (1080x1350),
Instagram-Story (1080x1920).

Aufruf:

    python3 social_templates.py \
        --format fb \
        --label "monatsrueckblick" \
        --title "72 neue Adapter im August" \
        --sub "Alles zum Nachlesen im Blog" \
        --out ../images/social/2026_09_monatsrueckblick.webp

Optional:

    --image logo.png        ein Bild rechts (Facebook) bzw. unter dem Text (Instagram)
    --claim                 den Claim unter die Wortmarke setzen
    --png                   zusaetzlich als PNG ablegen

Alle Schriftgroessen und Abstaende stehen in FORMATS und richten sich nach dem
Design-Kit der Website (Audiowide fuer Ueberschriften, Roboto fuer Text).
"""

import argparse
import os
import re
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ------------------------------------------------------------------ Farben des Kits
CANVAS = (8, 11, 28)          # #080B1C  Seitengrund
GLOW = (29, 144, 202)         # #1D90CA  Markenblau
ACCENT = (29, 144, 202)       # Kennzeile, Schraegstriche
INK = (255, 255, 255)         # Ueberschrift
INK_SOFT = (159, 184, 206)    # Unterzeile
HAIRLINE = (32, 63, 97)       # Klammern

HERE = os.path.dirname(os.path.abspath(__file__))
# Die Schriften liegen im Frontend, damit sie nur einmal im Verzeichnisbaum stehen.
# Mit IOB_FONT_DIR laesst sich ein anderer Ordner angeben.
PUBLIC = os.path.normpath(os.path.join(HERE, '..', '..', 'engine-2', 'front-end', 'public'))
FONT_DIR = os.environ.get('IOB_FONT_DIR', PUBLIC if os.path.isdir(PUBLIC) else HERE)
AUDIOWIDE = os.path.join(FONT_DIR, 'Audiowide-Regular.ttf')
ROBOTO = os.path.join(FONT_DIR, 'Roboto-Regular.ttf')
WORDMARK = os.path.join(HERE, 'iobroker-wortmarke-hell.png')

# ------------------------------------------------------------------ Formate
# Werte in Bildpunkten des Endformats; gezeichnet wird doppelt so gross.
FORMATS = {
    'fb': dict(size=(1200, 630), pad=72, label=22, title=58, sub=26,
               title_width=17, mark=250, image_box=(700, 150, 1130, 500)),
    'ig': dict(size=(1080, 1350), pad=80, label=24, title=66, sub=30,
               title_width=15, mark=260, image_box=(80, 760, 1000, 1180)),
    'story': dict(size=(1080, 1920), pad=90, label=26, title=72, sub=32,
                  title_width=14, mark=280, image_box=(90, 1050, 990, 1650)),
}

SCALE = 2


def font(path, size):
    return ImageFont.truetype(path, int(size * SCALE))


def wrap(text, width):
    """Umbruch nach Zeichenzahl, Woerter bleiben ganz."""
    words = text.split()
    lines, line = [], ''
    for word in words:
        probe = f'{line} {word}'.strip()
        if len(probe) <= width or not line:
            line = probe
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def glow(size):
    """
    Der Lichtschein wie im ersten Block der Startseite: rechts aussen, weich.

    Gerechnet statt gezeichnet - uebereinandergelegte Ellipsen geben auf so grossen
    Flaechen sichtbare Ringe.
    """
    w, h = size
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w * 1.02, h * 0.28
    rx, ry = max(w, h) * 0.62, max(w, h) * 0.50
    dist = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
    strength = np.clip(1.0 - dist, 0.0, 1.0) ** 2.2 * 0.34
    base = np.array(CANVAS, dtype=float)
    tint = np.array(GLOW, dtype=float)
    out = base[None, None, :] + (tint - base)[None, None, :] * strength[:, :, None]
    return Image.fromarray(out.astype('uint8'), 'RGB')


def brackets(d, spec, w, h):
    """
    Die Klammer des Kits, nur oben links und unten links.

    Unten rechts steht die Wortmarke; eine Klammer an derselben Ecke laeuft ihr in
    die Buchstaben.
    """
    pad = spec['pad'] * SCALE
    arm = int(pad * 0.55)
    lw = max(2, int(2 * SCALE))
    d.line([(pad, pad + arm), (pad, pad), (pad + arm, pad)], fill=HAIRLINE, width=lw)
    d.line([(pad, h - pad - arm), (pad, h - pad), (pad + arm, h - pad)], fill=HAIRLINE, width=lw)


def build(fmt, label, title, sub, image_path, claim, url, out):
    spec = FORMATS[fmt]
    w, h = spec['size'][0] * SCALE, spec['size'][1] * SCALE
    pad = spec['pad'] * SCALE

    img = glow((w, h))
    d = ImageDraw.Draw(img)
    brackets(d, spec, w, h)

    # Der Text beginnt nicht auf der Klammer, sondern ein Stueck rechts davon.
    # Sonst klebt die erste Zeile am senkrechten Arm.
    x = pad + int(pad * 0.5)

    f_label = font(AUDIOWIDE, spec['label'])
    f_title = font(AUDIOWIDE, spec['title'])
    f_sub = font(ROBOTO, spec['sub'])

    title_lines = wrap(title, spec['title_width'])
    sub_lines = wrap(sub, int(spec['title_width'] * 2.4)) if sub else []

    line_h = int(spec['title'] * SCALE * 1.22)
    sub_h = int(spec['sub'] * SCALE * 1.45)
    label_h = int(spec['label'] * SCALE * 2.6) if label else 0
    block = label_h + len(title_lines) * line_h
    if sub_lines:
        block += int(spec['sub'] * SCALE * 0.6) + len(sub_lines) * sub_h

    # Das Hochformat haengt den Text sonst oben in die Ecke und laesst die halbe
    # Flaeche leer: ohne Bild steht der Block dort in der oberen Haelfte, mit Bild
    # bleibt er oben und laesst dem Bild seinen Platz.
    if fmt == 'fb' or image_path:
        y = pad + int(spec['label'] * SCALE * 1.2)
    else:
        y = int(h * 0.44 - block / 2)

    if label:
        d.text((x, y), '// ' + label.upper(), font=f_label, fill=ACCENT)
        y += label_h

    for line in title_lines:
        d.text((x, y), line, font=f_title, fill=INK)
        y += line_h

    if sub_lines:
        y += int(spec['sub'] * SCALE * 0.6)
        for line in sub_lines:
            d.text((x, y), line, font=f_sub, fill=INK_SOFT)
            y += sub_h

    if image_path:
        box = [v * SCALE for v in spec['image_box']]
        extra = Image.open(image_path).convert('RGBA')
        bw, bh = box[2] - box[0], box[3] - box[1]
        ratio = min(bw / extra.width, bh / extra.height)
        extra = extra.resize((int(extra.width * ratio), int(extra.height * ratio)), Image.LANCZOS)
        img.paste(extra, (box[0] + (bw - extra.width) // 2,
                          box[1] + (bh - extra.height) // 2), extra)

    # Die Adresse unten links, gegenueber der Wortmarke: sie gibt der unteren Kante
    # ein zweites Ende und sagt, wohin der Beitrag fuehrt.
    if url:
        f_url = font(ROBOTO, spec['sub'] * 0.9)
        box = d.textbbox((0, 0), url, font=f_url)
        arm = int(pad * 0.55)
        d.text((x, h - pad - arm - (box[3] - box[1]) - int(14 * SCALE)), url, font=f_url, fill=INK_SOFT)

    if os.path.exists(WORDMARK):
        mark = Image.open(WORDMARK).convert('RGBA')
        mw = spec['mark'] * SCALE
        mark = mark.resize((mw, int(mark.height * mw / mark.width)), Image.LANCZOS)
        if not claim:
            mark = mark.crop((0, 0, mark.width, int(mark.height * 0.74)))
        img.paste(mark, (w - pad - mark.width, h - pad - mark.height), mark)

    img = img.resize(spec['size'], Image.LANCZOS)
    os.makedirs(os.path.dirname(os.path.abspath(out)) or '.', exist_ok=True)
    img.save(out, 'WEBP', quality=92, method=6)
    print(out, img.size, os.path.getsize(out), 'Bytes')
    return out


def main():
    p = argparse.ArgumentParser(description='Bildvorlagen fuer die ioBroker-Kanaele')
    p.add_argument('--format', choices=FORMATS.keys(), default='fb')
    p.add_argument('--label', default='')
    p.add_argument('--title', required=True)
    p.add_argument('--sub', default='')
    p.add_argument('--image', default='')
    p.add_argument('--claim', action='store_true')
    p.add_argument('--url', default='iobroker.net', help="Adresse unten links, '' laesst sie weg")
    p.add_argument('--png', action='store_true')
    p.add_argument('--out', required=True)
    a = p.parse_args()
    out = build(a.format, a.label, a.title, a.sub, a.image, a.claim, a.url, a.out)
    if a.png:
        Image.open(out).save(re.sub(r'\.webp$', '.png', out))


if __name__ == '__main__':
    main()
