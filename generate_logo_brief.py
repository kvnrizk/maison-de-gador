"""
La Maison de Gador — Logo Design Brief PDF
For the graphic designer friend
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, Color
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
import os

# Brand colors
GOLD = HexColor("#C5A34E")
GOLD_LIGHT = HexColor("#D4B96A")
GOLD_DARK = HexColor("#A8893D")
TEAL = HexColor("#2AABB3")
CREAM = HexColor("#F5F0E8")
BLACK = HexColor("#1A1A1A")
WARM_WHITE = HexColor("#FAFAF7")
LIGHT_GRAY = HexColor("#E8E4DC")
MID_GRAY = HexColor("#B0A89C")

W, H = A4
OUTPUT = "D:/Projects/La-Maison-de-Gador/deliverables/Logo-Design-Brief.pdf"
OLD_LOGO = "D:/Projects/La-Maison-de-Gador/assets/logos/old-logo.jpeg"
NEW_LOGO = "D:/Projects/La-Maison-de-Gador/assets/logos/new-attempt.jpeg"


def rounded_rect(c, x, y, w, h, r=8, fill=None, stroke=None, sw=0.5):
    c.saveState()
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(sw)
    p = c.beginPath()
    p.roundRect(x, y, w, h, r)
    c.drawPath(p, fill=1 if fill else 0, stroke=1 if stroke else 0)
    c.restoreState()


def gold_line(c, y, x1=40, x2=None):
    if x2 is None: x2 = W - 40
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(x1, y, x2, y)
    c.restoreState()


def section_title(c, text, y):
    gold_line(c, y + 5)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(40, y - 18, text)
    c.restoreState()
    return y - 35


def bullet(c, x, y, text, bold_part="", font_size=9):
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", font_size)
    c.drawString(x, y, "•")
    if bold_part:
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", font_size)
        c.drawString(x + 12, y, bold_part)
        bw = c.stringWidth(bold_part, "Helvetica-Bold", font_size)
        c.setFont("Helvetica", font_size)
        c.drawString(x + 12 + bw, y, "  " + text)
    else:
        c.setFillColor(BLACK)
        c.setFont("Helvetica", font_size)
        c.drawString(x + 12, y, text)
    c.restoreState()
    return y - 16


def page_num(c, num, total):
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 20, f"{num} / {total}")
    c.restoreState()


# ─── PAGE 1: COVER ─────────────────────────────────────────
def page1_cover(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Border
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.rect(25, 25, W - 50, H - 50, fill=0, stroke=1)
    c.setLineWidth(0.5)
    c.rect(30, 30, W - 60, H - 60, fill=0, stroke=1)
    c.restoreState()

    # Title
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, H - 100, "LOGO DESIGN BRIEF")
    c.restoreState()

    c.saveState()
    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 34)
    c.drawCentredString(W / 2, H - 160, "La Maison de Gador")
    c.restoreState()

    c.saveState()
    c.setStrokeColor(TEAL)
    c.setLineWidth(2)
    c.line(W / 2 - 80, H - 178, W / 2 + 80, H - 178)
    c.restoreState()

    c.saveState()
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 13)
    c.drawCentredString(W / 2, H - 200, "Premium Chocolate Dates — Qatar")
    c.restoreState()

    # Two logos side by side
    logo_y = H - 500
    logo_size = 170

    # Old logo
    if os.path.exists(OLD_LOGO):
        c.drawImage(OLD_LOGO, W / 2 - logo_size - 30, logo_y, logo_size, logo_size,
                     preserveAspectRatio=True)
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(W / 2 - logo_size / 2 - 30, logo_y - 15, "Current Logo (old)")
    c.restoreState()

    # New attempt
    if os.path.exists(NEW_LOGO):
        c.drawImage(NEW_LOGO, W / 2 + 30, logo_y, logo_size, logo_size,
                     preserveAspectRatio=True, mask='auto')
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(W / 2 + 30 + logo_size / 2, logo_y - 15, "New Direction (refine this)")
    c.restoreState()

    # Arrow
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.setFillColor(GOLD)
    ax = W / 2
    ay = logo_y + logo_size / 2
    c.line(ax - 15, ay, ax + 10, ay)
    # arrowhead
    c.line(ax + 10, ay, ax + 4, ay + 5)
    c.line(ax + 10, ay, ax + 4, ay - 5)
    c.restoreState()

    # Bottom
    c.saveState()
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, 70, "Prepared by Kevin  |  March 2026")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(W / 2, 55, "Reference images included — see pages 4-5")
    c.restoreState()


# ─── PAGE 2: BRAND OVERVIEW + PHOENIX DIRECTION ───────────
def page2_brand(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = H - 50
    y = section_title(c, "Brand Overview", y)

    items = [
        ("Brand Name:", "La Maison de Gador (with accent: GADoR)"),
        ("Tagline (EN):", '"The Art of Adoration"'),
        ("Tagline (AR):", '"The Art of Tasting"'),
        ("Industry:", "Premium/luxury stuffed dates and chocolate dates"),
        ("Market:", "Qatar (Gulf region)"),
        ("Competitors:", "Bateel, Qinwan, Forrey & Galland"),
    ]
    for bold, text in items:
        y = bullet(c, 50, y, text, bold)

    y -= 15
    y = section_title(c, "The Phoenix Symbol", y)

    # Highlight box
    rounded_rect(c, 40, y - 55, W - 80, 55, r=8, fill=GOLD)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 13)
    c.drawCentredString(W / 2, y - 20, "Keep the phoenix. It's a strong differentiator.")
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, y - 38, "No competitor in the dates market uses a phoenix symbol.")
    c.restoreState()

    y -= 75

    # Phoenix direction
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y, "Phoenix Direction:")
    c.restoreState()
    y -= 18

    directions = [
        ("Style:", "Elegant, refined, geometric — NOT overly illustrated or cartoon-like"),
        ("Pose:", "Wings spread upward (like the golden version on cover)"),
        ("Details:", "Simplified feather lines, clean silhouette. Recognizable at 32x32px (favicon)"),
        ("Accents:", "Small teal/turquoise flame details on the crest and tail tips"),
    ]
    for bold, text in directions:
        y = bullet(c, 60, y, text, bold)

    y -= 15

    # What NOT to do - red zone
    rounded_rect(c, 40, y - 80, W - 80, 80, r=8, fill=HexColor("#2A1A1A"))
    c.saveState()
    c.setFillColor(HexColor("#E84C4C"))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 18, "What NOT to do:")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 9)
    c.drawString(55, y - 35, "•  No hyper-detailed illustration (the old teal phoenix is too complex)")
    c.drawString(55, y - 50, "•  No thick outlines")
    c.drawString(55, y - 65, "•  No 3D effects or gradients in the primary version")
    c.restoreState()

    y -= 105
    y = section_title(c, "Color Palette", y)

    colors = [
        (GOLD, "Deep Gold", "#C5A34E", "Primary — phoenix, accents, foil stamping"),
        (TEAL, "Teal", "#2AABB3", "Secondary — flame accents, tagline"),
        (BLACK, "Rich Black", "#1A1A1A", "Typography, dark backgrounds"),
        (CREAM, "Cream/Ivory", "#F5F0E8", "Light backgrounds"),
        (WARM_WHITE, "Warm White", "#FAFAF7", "Clean backgrounds"),
    ]

    swatch_size = 50
    gap = (W - 80 - 5 * swatch_size) / 4
    for i, (color, name, hex_val, usage) in enumerate(colors):
        sx = 40 + i * (swatch_size + gap)
        rounded_rect(c, sx, y - swatch_size, swatch_size, swatch_size, r=6, fill=color,
                     stroke=MID_GRAY, sw=0.5)
        c.saveState()
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(sx + swatch_size / 2, y - swatch_size - 12, name)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        c.drawCentredString(sx + swatch_size / 2, y - swatch_size - 22, hex_val)
        c.setFont("Helvetica", 6)
        # Wrap usage text
        words = usage.split(" ")
        line1 = " ".join(words[:3])
        line2 = " ".join(words[3:]) if len(words) > 3 else ""
        c.drawCentredString(sx + swatch_size / 2, y - swatch_size - 32, line1)
        if line2:
            c.drawCentredString(sx + swatch_size / 2, y - swatch_size - 41, line2)
        c.restoreState()


# ─── PAGE 3: TYPOGRAPHY + LOGO VERSIONS ────────────────────
def page3_typography(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = H - 50
    y = section_title(c, "Typography Direction", y)

    # Brand name typography
    rounded_rect(c, 40, y - 70, W - 80, 70, r=8, fill=CREAM)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(55, y - 15, 'Brand Name: "La Maison de Gador"')
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(55, y - 30, "Style: Elegant serif font with slight contrast (thin/thick strokes)")
    c.drawString(55, y - 44, "Reference: Playfair Display, Cormorant Garamond, Didot, Bodoni")
    c.drawString(55, y - 58, 'Case: Title case — "La Maison de GADoR" (keep accent on the o)')
    c.restoreState()

    y -= 85

    rounded_rect(c, 40, y - 50, (W - 90) / 2, 50, r=8, fill=CREAM)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(55, y - 15, 'Tagline: "The Art of Adoration"')
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(55, y - 30, "Light sans-serif or italicized serif")
    c.drawString(55, y - 44, "Smaller, understated below brand name")
    c.restoreState()

    rx = 40 + (W - 90) / 2 + 10
    rounded_rect(c, rx, y - 50, (W - 90) / 2, 50, r=8, fill=CREAM)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(rx + 15, y - 15, "Arabic Text")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(rx + 15, y - 30, "Modern Naskh or Kufi-inspired")
    c.drawString(rx + 15, y - 44, "Ref: Cairo, Tajawal, or custom")
    c.restoreState()

    y -= 75
    y = section_title(c, "Logo Versions Needed (6 total)", y)

    versions = [
        ("1", "Primary Horizontal", "Phoenix left + text right\n+ tagline below"),
        ("2", "Primary Stacked", "Phoenix on top\ntext below\ntagline at bottom"),
        ("3", "Icon Only", "Phoenix standalone\nMust work at 32x32px\n(favicon, avatar)"),
        ("4", "Text Only (Wordmark)", '"La Maison de Gador"\nin brand font, no phoenix'),
        ("5", "Arabic Version", "Same layouts with\nArabic brand name\nPhoenix stays same"),
        ("6", "Monochrome Versions", "All-gold on black\nAll-black on white\nAll-white on dark"),
    ]

    card_w = (W - 100) / 3
    card_h = 95

    for i, (num, title, desc) in enumerate(versions):
        row = i // 3
        col = i % 3
        cx = 40 + col * (card_w + 10)
        cy = y - row * (card_h + 12)

        rounded_rect(c, cx, cy - card_h, card_w, card_h, r=8, fill=BLACK)

        # Number circle
        c.saveState()
        c.setFillColor(GOLD)
        c.circle(cx + 18, cy - 18, 11, fill=1, stroke=0)
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(cx + 18, cy - 22, num)
        c.restoreState()

        # Title
        c.saveState()
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(cx + 35, cy - 20, title)
        c.restoreState()

        # Desc
        c.saveState()
        c.setFillColor(CREAM)
        c.setFont("Helvetica", 8)
        lines = desc.split("\n")
        for j, line in enumerate(lines):
            c.drawString(cx + 15, cy - 40 - j * 12, line)
        c.restoreState()

    y -= 2 * (card_h + 12) + 20
    y = section_title(c, "File Formats Needed", y)

    formats = [
        ("SVG", "Vector, scalable — essential", GOLD),
        ("PNG", "Transparent bg, 1000/500/200/100px", TEAL),
        ("PDF", "Vector, for print", GOLD_DARK),
        ("Source", "Illustrator .ai or Figma file", BLACK),
    ]

    fmt_w = (W - 110) / 4
    for i, (name, desc, color) in enumerate(formats):
        fx = 40 + i * (fmt_w + 10)
        rounded_rect(c, fx, y - 55, fmt_w, 55, r=8, fill=color)
        c.saveState()
        text_col = BLACK if color in (GOLD, GOLD_LIGHT, TEAL) else white
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(fx + fmt_w / 2, y - 20, name)
        c.setFillColor(white if color == BLACK else BLACK)
        c.setFont("Helvetica", 7)
        words = desc.split(", ")
        for j, w in enumerate(words):
            c.drawCentredString(fx + fmt_w / 2, y - 35 - j * 10, w.strip())
        c.restoreState()


# ─── PAGE 4: STYLE REFERENCES + SUMMARY ───────────────────
def page4_references(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = H - 50
    y = section_title(c, "Style References (Luxury Gulf Brands)", y)

    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 10)
    c.drawString(50, y, "Look at these brands for aesthetic inspiration:")
    c.restoreState()
    y -= 20

    refs = [
        ("Bateel", "Clean, modern, gold-accented luxury branding\n40 boutiques worldwide, LVMH-backed", GOLD),
        ("Nakheel Alya", "Arabesque patterns meet modern minimalism\nISO22000, HACCP certified", TEAL),
        ("Forrey & Galland", "French luxury heritage, gold and floral\nParis 1912, Dubai Mall location", GOLD_DARK),
        ("Qinwan", "Refined, bespoke, understated elegance\n10 boutiques in Qatar + Harrods London", BLACK),
    ]

    ref_w = (W - 100) / 2
    ref_h = 75

    for i, (name, desc, color) in enumerate(refs):
        row = i // 2
        col = i % 2
        rx = 40 + col * (ref_w + 20)
        ry = y - row * (ref_h + 10)

        rounded_rect(c, rx, ry - ref_h, ref_w, ref_h, r=8, fill=color)

        c.saveState()
        text_col = BLACK if color in (GOLD, GOLD_LIGHT, TEAL) else white
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(rx + 15, ry - 22, name)
        c.setFont("Helvetica", 8)
        lines = desc.split("\n")
        for j, line in enumerate(lines):
            c.drawString(rx + 15, ry - 40 - j * 12, line)
        c.restoreState()

    y -= 2 * (ref_h + 10) + 15

    # Key message
    rounded_rect(c, 40, y - 45, W - 80, 45, r=8, fill=CREAM, stroke=GOLD, sw=1.5)
    c.saveState()
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, y - 18, "The logo should feel like it belongs on a luxury gift box")
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, y - 34, "sitting right next to these brands.")
    c.restoreState()

    y -= 70
    y = section_title(c, "Summary for Designer", y)

    # Summary table
    rows = [
        ("Phoenix", "Keep it. Simplify to clean geometric/elegant style"),
        ("Colors", "Gold (#C5A34E) + Teal (#2AABB3) accents"),
        ("Font", "Elegant serif (Playfair Display / Didot style)"),
        ("Feel", "Luxury patisserie meets Gulf heritage"),
        ("Versions", "6 logo versions (see page 3)"),
        ("Files", "SVG + PNG + PDF + source files"),
    ]

    row_h = 28
    table_w = W - 80
    label_w = 90

    for i, (label, value) in enumerate(rows):
        ry = y - i * row_h
        bg = CREAM if i % 2 == 0 else white
        rounded_rect(c, 40, ry - row_h, table_w, row_h, r=0, fill=bg)

        c.saveState()
        c.setFillColor(GOLD_DARK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(50, ry - row_h + 9, label)
        c.setFillColor(BLACK)
        c.setFont("Helvetica", 10)
        c.drawString(50 + label_w, ry - row_h + 9, value)
        c.restoreState()

    y -= len(rows) * row_h + 25

    # Final note
    rounded_rect(c, 40, y - 60, W - 80, 60, r=10, fill=GOLD)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(W / 2, y - 20, "The golden phoenix version is 80% there!")
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, y - 38, "It just needs professional refinement and proper typography.")
    c.drawCentredString(W / 2, y - 52, "Thank you — this should make the job straightforward.")
    c.restoreState()


# ─── GENERATE ──────────────────────────────────────────────
def main():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    pdf = canvas.Canvas(OUTPUT, pagesize=A4)
    pdf.setTitle("La Maison de Gador — Logo Design Brief")
    pdf.setAuthor("Kevin Rizk")

    total = 4

    page1_cover(pdf)
    page_num(pdf, 1, total)
    pdf.showPage()

    page2_brand(pdf)
    page_num(pdf, 2, total)
    pdf.showPage()

    page3_typography(pdf)
    page_num(pdf, 3, total)
    pdf.showPage()

    page4_references(pdf)
    page_num(pdf, 4, total)
    pdf.showPage()

    pdf.save()
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    main()
