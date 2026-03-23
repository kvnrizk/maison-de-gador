"""
La Maison de Gador — Design Presentation PDF
Visual wireframes & social media mockups for uncle Zouzou
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, Color
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm, cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Brand colors
GOLD = HexColor("#C5A34E")
GOLD_LIGHT = HexColor("#D4B96A")
GOLD_DARK = HexColor("#A8893D")
TEAL = HexColor("#2AABB3")
TEAL_LIGHT = HexColor("#3CBFC7")
CREAM = HexColor("#F5F0E8")
BLACK = HexColor("#1A1A1A")
WARM_WHITE = HexColor("#FAFAF7")
LIGHT_GRAY = HexColor("#E8E4DC")
MID_GRAY = HexColor("#B0A89C")
DARK_CREAM = HexColor("#E8E0D0")

W, H = A4  # 595.27 x 841.89

OUTPUT = "D:/Projects/La-Maison-de-Gador/deliverables/Design-Presentation-Zouzou.pdf"
LOGO_PATH = "D:/Projects/La-Maison-de-Gador/assets/logos/new-attempt.jpeg"


def draw_rounded_rect(c, x, y, w, h, r=8, fill=None, stroke=None, stroke_width=0.5):
    """Draw a rounded rectangle."""
    c.saveState()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(stroke_width)
    p = c.beginPath()
    p.roundRect(x, y, w, h, r)
    if fill and stroke:
        c.drawPath(p, fill=1, stroke=1)
    elif fill:
        c.drawPath(p, fill=1, stroke=0)
    elif stroke:
        c.drawPath(p, fill=0, stroke=1)
    c.restoreState()


def draw_placeholder_image(c, x, y, w, h, label="", color=DARK_CREAM):
    """Draw a placeholder rectangle representing an image."""
    draw_rounded_rect(c, x, y, w, h, r=4, fill=color)
    # Diagonal cross lines
    c.saveState()
    c.setStrokeColor(MID_GRAY)
    c.setLineWidth(0.3)
    c.line(x, y, x + w, y + h)
    c.line(x + w, y, x, y + h)
    c.restoreState()
    if label:
        c.saveState()
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        c.drawCentredString(x + w / 2, y + h / 2 - 3, label)
        c.restoreState()


def draw_text_lines(c, x, y, w, count=3, spacing=6, color=LIGHT_GRAY, thickness=2):
    """Draw placeholder text lines."""
    c.saveState()
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    for i in range(count):
        line_w = w * (0.9 if i < count - 1 else 0.6)
        c.line(x, y - i * spacing, x + line_w, y - i * spacing)
    c.restoreState()


def draw_button(c, x, y, w, h, label, fill=GOLD, text_color=white):
    """Draw a button shape."""
    draw_rounded_rect(c, x, y, w, h, r=h / 2, fill=fill)
    c.saveState()
    c.setFillColor(text_color)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(x + w / 2, y + h / 2 - 3, label)
    c.restoreState()


def draw_page_number(c, page_num, total):
    """Draw page number at bottom."""
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 20, f"{page_num} / {total}")
    c.restoreState()


def draw_section_title(c, title, subtitle="", y_start=H - 60):
    """Draw section title bar."""
    # Gold accent line
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(3)
    c.line(40, y_start, W - 40, y_start)
    c.restoreState()
    # Title
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(40, y_start - 30, title)
    if subtitle:
        c.setFillColor(TEAL)
        c.setFont("Helvetica", 11)
        c.drawString(40, y_start - 48, subtitle)
    c.restoreState()
    return y_start - 65


# ─── PAGE 1: COVER ─────────────────────────────────────────────
def page_cover(c):
    # Full black background
    c.setFillColor(BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Gold decorative border
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    margin = 30
    c.rect(margin, margin, W - 2 * margin, H - 2 * margin, fill=0, stroke=1)
    # Inner border
    c.setLineWidth(0.5)
    c.rect(margin + 5, margin + 5, W - 2 * margin - 10, H - 2 * margin - 10, fill=0, stroke=1)
    c.restoreState()

    # Phoenix logo
    logo_size = 180
    logo_x = (W - logo_size) / 2
    logo_y = H - 340
    if os.path.exists(LOGO_PATH):
        c.drawImage(LOGO_PATH, logo_x, logo_y, logo_size, logo_size, preserveAspectRatio=True, mask='auto')

    # Brand name
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(W / 2, logo_y - 30, "La Maison de Gador")
    c.restoreState()

    # Accent line
    c.saveState()
    c.setStrokeColor(TEAL)
    c.setLineWidth(2)
    c.line(W / 2 - 80, logo_y - 50, W / 2 + 80, logo_y - 50)
    c.restoreState()

    # Tagline
    c.saveState()
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 16)
    c.drawCentredString(W / 2, logo_y - 75, "The Art of Adoration")
    c.restoreState()

    # Subtitle
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 13)
    c.drawCentredString(W / 2, logo_y - 140, "Design Vision")
    c.setFont("Helvetica", 11)
    c.drawCentredString(W / 2, logo_y - 160, "Website & Social Media — A Preview of Your Brand")
    c.restoreState()

    # Bottom: For Zouzou
    c.saveState()
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, 60, "Prepared for Uncle Zouzou  |  March 2026  |  Qatar")
    c.restoreState()


# ─── PAGE 2: BRAND IDENTITY ────────────────────────────────────
def page_brand_identity(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Brand Identity", "The essence of La Maison de Gador")

    # ── Brand Positioning (top, most important) ──
    pos_h = 110
    draw_rounded_rect(c, 40, y - pos_h, W - 80, pos_h, r=10, fill=BLACK)

    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(W / 2, y - 28, '"French Luxury Meets Gulf Heritage"')

    c.setFillColor(CREAM)
    c.setFont("Helvetica", 10)
    points = [
        "Handcrafted chocolate dates — every piece is a work of art",
        "The Phoenix — a symbol of rebirth, elegance, and transformation",
        "A bilingual maison — Arabic and English, bridging two worlds",
        "Refined yet warm — luxury you want to share, not just admire",
    ]
    for i, pt in enumerate(points):
        c.drawCentredString(W / 2, y - 50 - i * 16, pt)
    c.restoreState()

    y -= pos_h + 20

    # ── Color Palette ──
    c.saveState()
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y, "COLOUR PALETTE")
    c.restoreState()

    colors = [
        (GOLD, "Deep Gold", "#C5A34E", "Logo & accents"),
        (TEAL, "Teal", "#2AABB3", "Flame & highlights"),
        (CREAM, "Ivory", "#F5F0E8", "Backgrounds"),
        (BLACK, "Rich Black", "#1A1A1A", "Typography"),
        (WARM_WHITE, "Warm White", "#FAFAF7", "Clean space"),
    ]

    swatch_y = y - 18
    swatch_size = 50
    gap = (W - 80 - 5 * swatch_size) / 4

    for i, (color, name, hex_val, usage) in enumerate(colors):
        sx = 40 + i * (swatch_size + gap)
        draw_rounded_rect(c, sx, swatch_y - swatch_size, swatch_size, swatch_size, r=6, fill=color,
                          stroke=MID_GRAY, stroke_width=0.5)
        c.saveState()
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(sx + swatch_size / 2, swatch_y - swatch_size - 12, name)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        c.drawCentredString(sx + swatch_size / 2, swatch_y - swatch_size - 22, hex_val)
        c.setFont("Helvetica", 6)
        c.drawCentredString(sx + swatch_size / 2, swatch_y - swatch_size - 32, usage)
        c.restoreState()

    y = swatch_y - swatch_size - 50

    # ── Typography ──
    c.saveState()
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y, "TYPOGRAPHY")
    c.restoreState()

    ty = y - 15
    draw_rounded_rect(c, 40, ty - 70, W - 80, 70, r=6, fill=CREAM)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(55, ty - 18, "La Maison de Gador")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica-Oblique", 8)
    c.drawString(55, ty - 32, "Elegant serif — Playfair Display / Cormorant Garamond / Didot")
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 12)
    c.drawString(55, ty - 50, "Clean, refined body text for descriptions and details")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica-Oblique", 8)
    c.drawString(55, ty - 64, "Modern sans-serif — Montserrat / Lato")
    c.restoreState()

    y = ty - 90

    # ── Packaging Tiers ──
    c.saveState()
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y, "PACKAGING COLLECTIONS")
    c.restoreState()

    tiers = [
        ("Classique", "Rigid matte box\nGold foil phoenix stamp\nMagnetic closure", CREAM),
        ("Prestige", "Drawer-style presentation\nSoft-touch finish\nSatin ribbon & tissue", GOLD_LIGHT),
        ("Royale", "Lacquered wood case\nGold metal accents\nPersonalized engraving", GOLD),
        ("Corporate", "Branded outer sleeve\nCompany logo integration\nVolume customization", TEAL),
    ]

    pk_y = y - 15
    tier_w = (W - 80 - 30) / 4
    tier_h = 90
    for i, (name, desc, color) in enumerate(tiers):
        tx = 40 + i * (tier_w + 10)
        draw_rounded_rect(c, tx, pk_y - tier_h, tier_w, tier_h, r=6, fill=color,
                          stroke=GOLD_DARK, stroke_width=0.5)
        c.saveState()
        text_col = BLACK if color in (CREAM, GOLD_LIGHT, WARM_WHITE) else white
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(tx + tier_w / 2, pk_y - 15, name)
        c.setFont("Helvetica", 7)
        lines = desc.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(tx + tier_w / 2, pk_y - 32 - j * 11, line)
        c.restoreState()


# ─── PAGE 3: WEBSITE — HOMEPAGE WIREFRAME ──────────────────────
def page_homepage(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Website — Homepage", "The first impression of your digital boutique")

    # Phone frame
    phone_w = 260
    phone_h = 520
    phone_x = (W - phone_w) / 2
    phone_y = y - phone_h - 10

    # Phone outline
    draw_rounded_rect(c, phone_x, phone_y, phone_w, phone_h, r=20, fill=white,
                      stroke=BLACK, stroke_width=2)

    # Status bar area
    c.saveState()
    c.setFillColor(BLACK)
    c.rect(phone_x + 10, phone_y + phone_h - 25, phone_w - 20, 20, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica", 7)
    c.drawCentredString(phone_x + phone_w / 2, phone_y + phone_h - 20, "9:41")
    c.restoreState()

    inner_x = phone_x + 15
    inner_w = phone_w - 30
    top = phone_y + phone_h - 35

    # Nav bar
    c.saveState()
    c.setFillColor(BLACK)
    c.rect(inner_x, top - 30, inner_w, 30, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(phone_x + phone_w / 2, top - 18, "La Maison de Gador")
    # Menu icon
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    for i in range(3):
        bx = inner_x + inner_w - 25
        c.line(bx, top - 11 - i * 5, bx + 15, top - 11 - i * 5)
    # Language toggle
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 7)
    c.drawString(inner_x + 5, top - 20, "AR | EN")
    c.restoreState()

    # Hero image area
    hero_y = top - 165
    hero_h = 130
    draw_rounded_rect(c, inner_x, hero_y, inner_w, hero_h, r=0, fill=HexColor("#2A2520"))
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(phone_x + phone_w / 2, hero_y + hero_h / 2 + 20, "The Art of Adoration")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 8)
    c.drawCentredString(phone_x + phone_w / 2, hero_y + hero_h / 2 + 3, "Premium Chocolate Dates")
    c.drawCentredString(phone_x + phone_w / 2, hero_y + hero_h / 2 - 10, "Handcrafted in Qatar")
    c.restoreState()
    draw_button(c, phone_x + phone_w / 2 - 45, hero_y + 15, 90, 22, "SHOP NOW", GOLD)

    # Featured collections (3 boxes)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(phone_x + phone_w / 2, hero_y - 15, "Featured Collections")
    c.restoreState()

    col_y = hero_y - 95
    col_w = (inner_w - 16) / 3
    col_h = 60
    labels = ["Ramadan\nCollection", "Gift\nBoxes", "Corporate\nGifts"]
    for i in range(3):
        cx = inner_x + i * (col_w + 8)
        draw_rounded_rect(c, cx, col_y, col_w, col_h, r=4, fill=DARK_CREAM)
        c.saveState()
        c.setFillColor(GOLD_DARK)
        c.setFont("Helvetica", 6)
        lines = labels[i].split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(cx + col_w / 2, col_y + col_h / 2 + 2 - j * 9, line)
        c.restoreState()

    # Our Story section
    story_y = col_y - 50
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(phone_x + phone_w / 2, story_y + 10, "Our Story")
    c.restoreState()
    draw_text_lines(c, inner_x + 20, story_y - 5, inner_w - 40, count=3, spacing=7)

    # WhatsApp floating button
    wa_x = phone_x + phone_w - 50
    wa_y = phone_y + 25
    draw_rounded_rect(c, wa_x, wa_y, 30, 30, r=15, fill=HexColor("#25D366"))
    c.saveState()
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(wa_x + 15, wa_y + 10, "W")
    c.restoreState()

    # Annotations on the sides
    annotations = [
        (phone_x - 10, top - 15, "Navigation bar\nwith language toggle", "right"),
        (phone_x + phone_w + 10, hero_y + hero_h / 2, "Hero image with\nyour best product photo", "left"),
        (phone_x - 10, col_y + col_h / 2, "3 featured\ncollections", "right"),
        (phone_x + phone_w + 10, wa_y + 15, "WhatsApp button\n(always visible)", "left"),
    ]
    c.saveState()
    for ax, ay, text, side in annotations:
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        lines = text.split("\n")
        for i, line in enumerate(lines):
            if side == "right":
                c.drawRightString(ax, ay - i * 9, line)
            else:
                c.drawString(ax, ay - i * 9, line)
        # Arrow line
        c.setStrokeColor(TEAL)
        c.setLineWidth(0.5)
        if side == "right":
            c.line(ax + 3, ay - 3, phone_x - 2, ay - 3)
        else:
            c.line(ax - 3, ay - 3, phone_x + phone_w + 2, ay - 3)
    c.restoreState()


# ─── PAGE 4: WEBSITE — SHOP PAGE ──────────────────────────────
def page_shop(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Website — Boutique", "An elegant browsing experience for your collections")

    # Browser frame
    bw = W - 80
    bh = 480
    bx = 40
    by = y - bh - 10

    # Browser chrome
    draw_rounded_rect(c, bx, by, bw, bh, r=8, fill=white, stroke=MID_GRAY, stroke_width=1)
    c.saveState()
    c.setFillColor(LIGHT_GRAY)
    c.rect(bx, by + bh - 25, bw, 25, fill=1, stroke=0)
    # Browser dots
    for i, col in enumerate([HexColor("#FF5F57"), HexColor("#FFBD2E"), HexColor("#28C840")]):
        c.setFillColor(col)
        c.circle(bx + 15 + i * 14, by + bh - 12.5, 4, fill=1, stroke=0)
    # URL bar
    draw_rounded_rect(c, bx + 60, by + bh - 21, bw - 120, 15, r=4, fill=white)
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 7)
    c.drawCentredString(bx + bw / 2, by + bh - 17, "lamaisondegador.com/shop")
    c.restoreState()

    inner_x = bx + 15
    inner_w = bw - 30
    top = by + bh - 40

    # Header
    c.saveState()
    c.setFillColor(BLACK)
    c.rect(inner_x, top - 25, inner_w, 25, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(bx + bw / 2, top - 16, "La Maison de Gador")
    c.restoreState()

    # Page title
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(bx + bw / 2, top - 50, "Our Collections")
    c.restoreState()

    # Filter tabs
    filters = ["All", "Ramadan", "Gift Boxes", "Corporate", "Wedding"]
    tab_y = top - 70
    tab_start = inner_x + 20
    c.saveState()
    for i, f in enumerate(filters):
        tw = len(f) * 6 + 16
        if i == 0:
            draw_rounded_rect(c, tab_start, tab_y - 5, tw, 18, r=9, fill=GOLD)
            c.setFillColor(white)
        else:
            draw_rounded_rect(c, tab_start, tab_y - 5, tw, 18, r=9, fill=CREAM, stroke=MID_GRAY, stroke_width=0.5)
            c.setFillColor(BLACK)
        c.setFont("Helvetica", 7)
        c.drawCentredString(tab_start + tw / 2, tab_y, f)
        tab_start += tw + 8
    c.restoreState()

    # Product grid (2 rows x 3 cols)
    grid_y = tab_y - 35
    card_w = (inner_w - 40) / 3
    card_h = 140

    products = [
        "Signature\nChocolate Dates", "Pistachio\nCream Dates", "Royal\nAssortment",
        "Ramadan\nSpecial Box", "Wedding\nFavors (x50)", "Corporate\nGift Set"
    ]
    prices = ["45 QAR", "55 QAR", "120 QAR", "85 QAR", "250 QAR", "180 QAR"]

    for row in range(2):
        for col in range(3):
            idx = row * 3 + col
            cx = inner_x + 10 + col * (card_w + 10)
            cy = grid_y - row * (card_h + 15)

            # Card
            draw_rounded_rect(c, cx, cy - card_h, card_w, card_h, r=6, fill=white,
                              stroke=LIGHT_GRAY, stroke_width=0.5)
            # Image area
            draw_rounded_rect(c, cx + 5, cy - 75, card_w - 10, 65, r=4, fill=DARK_CREAM)
            c.saveState()
            c.setFillColor(GOLD_DARK)
            c.setFont("Helvetica", 6)
            lines = products[idx].split("\n")
            for j, line in enumerate(lines):
                c.drawCentredString(cx + card_w / 2, cy - 40 - j * 9, line)
            c.restoreState()

            # Price
            c.saveState()
            c.setFillColor(GOLD)
            c.setFont("Helvetica-Bold", 9)
            c.drawCentredString(cx + card_w / 2, cy - card_h + 28, prices[idx])
            c.restoreState()

            # Add to cart
            draw_button(c, cx + 8, cy - card_h + 6, card_w - 16, 16, "Add to Cart", GOLD)

    # Side note
    note_y = by + 30
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(bx + bw / 2, note_y,
                        "Guests browse by occasion, discover collections, and order seamlessly")
    c.drawCentredString(bx + bw / 2, note_y - 12,
                        "Each creation is presented with elegant photography and effortless purchasing")
    c.restoreState()


# ─── PAGE 5: WEBSITE — PRODUCT PAGE ───────────────────────────
def page_product(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Website — Product Detail", "Each creation presented with the attention it deserves")

    # Split layout: left = image, right = details
    content_y = y - 10
    left_x = 40
    left_w = (W - 100) * 0.5
    right_x = left_x + left_w + 20
    right_w = (W - 100) * 0.5

    # Left side: main product image
    img_h = 260
    draw_rounded_rect(c, left_x, content_y - img_h, left_w, img_h, r=8, fill=HexColor("#2A2520"))
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(left_x + left_w / 2, content_y - img_h / 2 + 10, "Product Photo")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 9)
    c.drawCentredString(left_x + left_w / 2, content_y - img_h / 2 - 10, "Dark background, warm lighting")
    c.drawCentredString(left_x + left_w / 2, content_y - img_h / 2 - 24, "Close-up showing chocolate & filling")
    c.restoreState()

    # Thumbnail strip
    thumb_y = content_y - img_h - 15
    thumb_w = (left_w - 12) / 4
    thumb_h = 45
    for i in range(4):
        tx = left_x + i * (thumb_w + 4)
        fill = GOLD_LIGHT if i == 0 else DARK_CREAM
        draw_rounded_rect(c, tx, thumb_y - thumb_h, thumb_w, thumb_h, r=3, fill=fill,
                          stroke=GOLD if i == 0 else LIGHT_GRAY, stroke_width=1 if i == 0 else 0.5)
        c.saveState()
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 5)
        labels = ["Front", "Inside", "Box", "Detail"]
        c.drawCentredString(tx + thumb_w / 2, thumb_y - thumb_h / 2 - 2, labels[i])
        c.restoreState()

    # Right side: product details
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(right_x, content_y - 20, "Royal Pistachio")
    c.drawString(right_x, content_y - 44, "Cream Dates")
    c.restoreState()

    c.saveState()
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 10)
    c.drawString(right_x, content_y - 62, "Gift Collection")
    c.restoreState()

    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(right_x, content_y - 95, "120 QAR")
    c.restoreState()

    # Description lines
    desc_y = content_y - 120
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    descs = [
        "Premium Medjool dates filled with",
        "house-made pistachio cream, wrapped",
        "in Belgian dark chocolate.",
        "",
        "Box of 12 pieces",
        "Handcrafted  |  Halal certified",
    ]
    for i, d in enumerate(descs):
        c.drawString(right_x, desc_y - i * 14, d)
    c.restoreState()

    # Perfect for tags
    tag_y = desc_y - 100
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(right_x, tag_y, "Perfect for:")
    c.restoreState()

    tags = ["Ramadan", "Corporate Gift", "Wedding", "Birthday"]
    tag_x = right_x
    for t in tags:
        tw = len(t) * 5.5 + 14
        draw_rounded_rect(c, tag_x, tag_y - 22, tw, 16, r=8, fill=CREAM, stroke=GOLD, stroke_width=0.5)
        c.saveState()
        c.setFillColor(GOLD_DARK)
        c.setFont("Helvetica", 7)
        c.drawCentredString(tag_x + tw / 2, tag_y - 17, t)
        c.restoreState()
        tag_x += tw + 6

    # Buttons
    btn_y = tag_y - 55
    draw_button(c, right_x, btn_y, right_w - 10, 30, "ADD TO CART", GOLD)
    draw_button(c, right_x, btn_y - 38, right_w - 10, 30, "ORDER VIA WHATSAPP", HexColor("#25D366"))

    # Bottom section: "You might also like"
    also_y = btn_y - 90
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(W / 2, also_y, "You Might Also Like")
    c.restoreState()

    also_y -= 25
    rec_w = (W - 110) / 4
    rec_h = 80
    recs = ["Almond Delight", "Kunafa Dates", "Signature Mix", "Dark Chocolate"]
    for i in range(4):
        rx = 40 + i * (rec_w + 10)
        draw_rounded_rect(c, rx, also_y - rec_h, rec_w, rec_h, r=6, fill=DARK_CREAM)
        c.saveState()
        c.setFillColor(GOLD_DARK)
        c.setFont("Helvetica", 7)
        c.drawCentredString(rx + rec_w / 2, also_y - rec_h / 2 - 2, recs[i])
        c.restoreState()


# ─── PAGE 6: WEBSITE — GIFT BOXES ─────────────────────────────
def page_gift_boxes(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Website — Coffrets Cadeaux", "Curated gift collections for every occasion")

    # Occasion cards in 2x2 grid
    card_w = (W - 100) / 2
    card_h = 200
    occasions = [
        ("Ramadan Collection", "Special boxes for the holy month.\nFamilies gift these to relatives\nand neighbors.",
         "15+ varieties available", HexColor("#2A2520")),
        ("Eid Celebration", "Festive packaging with gold ribbon.\nPerfect for Eid al-Fitr\nand Eid al-Adha.",
         "Custom message cards", HexColor("#1A2A2A")),
        ("Wedding Favors", "Elegant mini boxes for guests.\nPersonalized with names and date.\nMinimum 50 pieces.",
         "Starting from 8 QAR/piece", HexColor("#2A201A")),
        ("Corporate Gifts", "Branded boxes with your company\nlogo on a custom sleeve.\nBulk order discounts.",
         "From 25 pieces", HexColor("#1A1A2A")),
    ]

    for i, (title, desc, detail, bg) in enumerate(occasions):
        row = i // 2
        col = i % 2
        cx = 40 + col * (card_w + 20)
        cy = y - row * (card_h + 15)

        # Card with dark background
        draw_rounded_rect(c, cx, cy - card_h, card_w, card_h, r=10, fill=bg)

        # Gold accent line at top
        c.saveState()
        c.setStrokeColor(GOLD)
        c.setLineWidth(2)
        c.line(cx + 15, cy - 10, cx + card_w - 15, cy - 10)
        c.restoreState()

        # Title
        c.saveState()
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 15)
        c.drawString(cx + 20, cy - 35, title)
        c.restoreState()

        # Description
        c.saveState()
        c.setFillColor(CREAM)
        c.setFont("Helvetica", 9)
        lines = desc.split("\n")
        for j, line in enumerate(lines):
            c.drawString(cx + 20, cy - 55 - j * 14, line)
        c.restoreState()

        # Detail tag
        c.saveState()
        c.setFillColor(TEAL)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(cx + 20, cy - card_h + 45, detail)
        c.restoreState()

        # CTA button
        draw_button(c, cx + 20, cy - card_h + 15, card_w - 40, 22, "View Collection", GOLD)

    # Bottom: custom orders banner
    banner_y = y - 2 * (card_h + 15) - 30
    draw_rounded_rect(c, 40, banner_y - 70, W - 80, 70, r=10, fill=BLACK)
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(W / 2, banner_y - 22, "Bespoke Creations")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, banner_y - 40, "We craft custom collections for any occasion — reach us via WhatsApp")
    c.restoreState()
    draw_button(c, W / 2 - 60, banner_y - 62, 120, 20, "Contact Us", TEAL)


# ─── PAGE 7: SOCIAL MEDIA — INSTAGRAM FEED ────────────────────
def page_instagram_feed(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Social Media — Instagram", "Your digital storefront on the world's visual platform")

    # Phone frame
    phone_w = 280
    phone_h = 520
    phone_x = (W - phone_w) / 2
    phone_y = y - phone_h - 5

    draw_rounded_rect(c, phone_x, phone_y, phone_w, phone_h, r=22, fill=white,
                      stroke=BLACK, stroke_width=2)

    inner_x = phone_x + 12
    inner_w = phone_w - 24
    top = phone_y + phone_h - 15

    # Instagram header
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(inner_x + 5, top - 15, "lamaisondegador")
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 7)
    c.drawString(inner_x + 130, top - 13, "Follow")
    c.restoreState()

    # Profile section
    prof_y = top - 35
    # Avatar circle
    c.saveState()
    c.setFillColor(GOLD)
    c.circle(inner_x + 28, prof_y - 15, 22, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(inner_x + 28, prof_y - 20, "G")
    c.restoreState()

    # Stats
    stats = [("127", "Posts"), ("2.4K", "Followers"), ("189", "Following")]
    for i, (num, label) in enumerate(stats):
        sx = inner_x + 80 + i * 55
        c.saveState()
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 11)
        c.drawCentredString(sx, prof_y - 8, num)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        c.drawCentredString(sx, prof_y - 20, label)
        c.restoreState()

    # Bio
    bio_y = prof_y - 45
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(inner_x + 5, bio_y, "La Maison de Gador")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 7)
    c.drawString(inner_x + 5, bio_y - 11, "The Art of Adoration | Premium Dates")
    c.drawString(inner_x + 5, bio_y - 22, "Doha, Qatar | Handcrafted with love")
    c.setFillColor(TEAL)
    c.drawString(inner_x + 5, bio_y - 33, "lamaisondegador.com")
    c.restoreState()

    # Story highlights
    hl_y = bio_y - 55
    highlights = ["Ramadan", "Gifts", "Process", "Reviews", "Menu"]
    hl_size = 32
    for i, hl in enumerate(highlights):
        hx = inner_x + 8 + i * (hl_size + 14)
        c.saveState()
        c.setStrokeColor(GOLD)
        c.setLineWidth(1.5)
        c.circle(hx + hl_size / 2, hl_y, hl_size / 2, fill=0, stroke=1)
        c.setFillColor(CREAM)
        c.circle(hx + hl_size / 2, hl_y, hl_size / 2 - 2, fill=1, stroke=0)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 5)
        c.drawCentredString(hx + hl_size / 2, hl_y - hl_size / 2 - 8, hl)
        c.restoreState()

    # Grid of posts (3x3)
    grid_y = hl_y - 28
    cell_size = (inner_w - 6) / 3
    post_colors = [
        HexColor("#2A2520"), DARK_CREAM, HexColor("#1A2A2A"),
        GOLD_LIGHT, HexColor("#2A201A"), DARK_CREAM,
        HexColor("#1A1A2A"), DARK_CREAM, HexColor("#2A2520"),
    ]
    post_labels = [
        "Product", "Lifestyle", "Process",
        "Gift Box", "Close-up", "Flat Lay",
        "Corporate", "Unboxing", "Arrangement",
    ]

    for row in range(3):
        for col in range(3):
            idx = row * 3 + col
            px = inner_x + col * (cell_size + 2)
            py = grid_y - row * (cell_size + 2)
            c.saveState()
            c.setFillColor(post_colors[idx])
            c.rect(px, py - cell_size, cell_size, cell_size, fill=1, stroke=0)
            text_col = GOLD if post_colors[idx] in (HexColor("#2A2520"), HexColor("#1A2A2A"),
                                                     HexColor("#2A201A"), HexColor("#1A1A2A")) else GOLD_DARK
            c.setFillColor(text_col)
            c.setFont("Helvetica", 6)
            c.drawCentredString(px + cell_size / 2, py - cell_size / 2 - 2, post_labels[idx])
            c.restoreState()

    # Annotations
    c.saveState()
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 7)
    annot_x = phone_x + phone_w + 15
    notes = [
        (top - 15, "Brand name as\nusername"),
        (prof_y - 15, "Phoenix logo\nas profile picture"),
        (bio_y - 15, "Bio with tagline\n+ website link"),
        (hl_y, "Story highlights\nfor key categories"),
        (grid_y - cell_size, "Mix of content:\ndark product shots\n+ bright lifestyle"),
    ]
    for ny, text in notes:
        lines = text.split("\n")
        for i, line in enumerate(lines):
            c.drawString(annot_x, ny - i * 9, line)
        c.setStrokeColor(TEAL)
        c.setLineWidth(0.4)
        c.line(phone_x + phone_w + 2, ny - 3, annot_x - 3, ny - 3)
    c.restoreState()


# ─── PAGE 8: SOCIAL MEDIA — STORIES & POSTS ───────────────────
def page_stories_posts(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Social Media — Content", "The visual language of La Maison de Gador")

    # ── STORIES ROW ──
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Instagram Stories")
    c.restoreState()

    story_w = 95
    story_h = 165
    story_y = y - story_h - 15
    stories = [
        ("Coming Soon\nto Doha", "Teaser", HexColor("#2A2520"), GOLD),
        ("POLL\nPistachio or\nAlmond?", "Engagement", HexColor("#1A2A2A"), TEAL),
        ("Behind the\nScenes", "Process", HexColor("#2A201A"), CREAM),
        ("New\nCollection\nAvailable!", "Announcement", BLACK, GOLD),
        ("Swipe Up\nto Order", "Sales", GOLD_DARK, white),
    ]

    for i, (text, label, bg, text_col) in enumerate(stories):
        sx = 40 + i * (story_w + 9)
        draw_rounded_rect(c, sx, story_y, story_w, story_h, r=10, fill=bg)

        # Story progress bar at top
        c.saveState()
        c.setStrokeColor(Color(1, 1, 1, alpha=0.4))
        c.setLineWidth(1.5)
        c.line(sx + 8, story_y + story_h - 8, sx + story_w - 8, story_y + story_h - 8)
        c.restoreState()

        # Content
        c.saveState()
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 10)
        lines = text.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(sx + story_w / 2, story_y + story_h / 2 + 10 - j * 14, line)
        c.restoreState()

        # Label below
        c.saveState()
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        c.drawCentredString(sx + story_w / 2, story_y - 10, label)
        c.restoreState()

    # ── POSTS ROW ──
    post_section_y = story_y - 40
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, post_section_y, "Instagram Posts")
    c.restoreState()

    post_w = (W - 100) / 3
    post_h = 240
    post_y = post_section_y - post_h - 15

    posts = [
        {
            "type": "Product Shot",
            "bg": HexColor("#2A2520"),
            "title": "Signature Collection",
            "desc": "Dark background\nClose-up photography\nGold accents",
            "caption": '"Discover the art of\nperfection in every bite"',
        },
        {
            "type": "Carousel Post",
            "bg": CREAM,
            "title": "Our Process",
            "desc": "Step-by-step slides:\n1. Select dates\n2. Prepare filling\n3. Hand-coat\n4. Package",
            "caption": '"From hand-picked dates\nto your table"',
        },
        {
            "type": "Lifestyle Reel",
            "bg": HexColor("#1A2A2A"),
            "title": "Gifting Moment",
            "desc": "Video content:\nElegant unboxing\nArabic coffee setting\nWarm lighting",
            "caption": '"The perfect gift for\nsomeone you adore"',
        },
    ]

    for i, post in enumerate(posts):
        px = 40 + i * (post_w + 10)

        # Post card
        draw_rounded_rect(c, px, post_y, post_w, post_h, r=8, fill=white,
                          stroke=LIGHT_GRAY, stroke_width=0.5)

        # Image area (top 55%)
        img_h = post_h * 0.5
        draw_rounded_rect(c, px + 5, post_y + post_h - img_h - 5, post_w - 10, img_h, r=6, fill=post["bg"])

        c.saveState()
        text_col = GOLD if post["bg"] != CREAM else GOLD_DARK
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(px + post_w / 2, post_y + post_h - img_h / 2 + 5, post["title"])
        c.setFont("Helvetica", 7)
        desc_col = CREAM if post["bg"] != CREAM else BLACK
        c.setFillColor(desc_col)
        lines = post["desc"].split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(px + post_w / 2, post_y + post_h - img_h / 2 - 10 - j * 10, line)
        c.restoreState()

        # Caption area
        cap_y = post_y + post_h - img_h - 15
        c.saveState()
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(px + 10, cap_y, "lamaisondegador")
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7)
        cap_lines = post["caption"].split("\n")
        for j, line in enumerate(cap_lines):
            c.drawString(px + 10, cap_y - 12 - j * 10, line)
        c.restoreState()

        # Type label
        c.saveState()
        c.setFillColor(TEAL)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(px + post_w / 2, post_y + 8, post["type"])
        c.restoreState()


# ─── PAGE 9: CONTENT CALENDAR OVERVIEW ─────────────────────────
def page_content_calendar(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Content Strategy", "A refined editorial calendar for your brand")

    # Content pillars as visual pie-like blocks
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(40, y, "What We Post")
    c.restoreState()

    pillars = [
        ("35%", "Product\nPhotos", GOLD, "Beautiful shots of\nyour dates & boxes"),
        ("20%", "Behind the\nScenes", TEAL, "Making process,\npackaging, kitchen"),
        ("20%", "Lifestyle\n& Gifting", HexColor("#2A2520"), "Elegant settings,\ngift-giving moments"),
        ("15%", "Culture &\nHeritage", HexColor("#1A2A2A"), "Traditions, Arabic\ncalligraphy, stories"),
        ("10%", "Engagement\n& Fun", GOLD_DARK, "Polls, giveaways,\ncustomer features"),
    ]

    pil_y = y - 20
    pil_w = (W - 80 - 40) / 5
    pil_h = 120

    for i, (pct, name, bg, desc) in enumerate(pillars):
        px = 40 + i * (pil_w + 10)
        draw_rounded_rect(c, px, pil_y - pil_h, pil_w, pil_h, r=8, fill=bg)

        c.saveState()
        text_col = white if bg not in (GOLD, GOLD_LIGHT, GOLD_DARK, CREAM) else BLACK
        if bg == GOLD_DARK:
            text_col = white
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 18)
        c.drawCentredString(px + pil_w / 2, pil_y - 25, pct)
        c.setFont("Helvetica-Bold", 8)
        lines = name.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(px + pil_w / 2, pil_y - 42 - j * 11, line)
        c.setFont("Helvetica", 6)
        c.setFillColor(Color(1, 1, 1, alpha=0.7) if text_col == white else MID_GRAY)
        dlines = desc.split("\n")
        for j, line in enumerate(dlines):
            c.drawCentredString(px + pil_w / 2, pil_y - pil_h + 30 - j * 9, line)
        c.restoreState()

    # Posting schedule
    sched_y = pil_y - pil_h - 30
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(40, sched_y, "How Often We Post")
    c.restoreState()

    schedule = [
        ("Feed Posts", "4-5x per week", GOLD),
        ("Reels (Videos)", "3x per week", TEAL),
        ("Stories", "Every day (5-7)", HexColor("#25D366")),
        ("Carousels", "1-2x per week", GOLD_DARK),
    ]

    bar_y = sched_y - 25
    bar_h = 30
    max_w = W - 200

    for i, (name, freq, color) in enumerate(schedule):
        by_pos = bar_y - i * (bar_h + 10)
        widths = [max_w * 0.7, max_w * 0.5, max_w * 1.0, max_w * 0.3]

        c.saveState()
        c.setFillColor(BLACK)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(40, by_pos + bar_h / 2 - 3, name)
        c.restoreState()

        draw_rounded_rect(c, 150, by_pos, widths[i], bar_h, r=bar_h / 2, fill=color)

        c.saveState()
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(150 + widths[i] / 2, by_pos + bar_h / 2 - 4, freq)
        c.restoreState()

    # Seasonal focus
    season_y = bar_y - 4 * (bar_h + 10) - 30
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(40, season_y, "Key Seasons (Extra Content)")
    c.restoreState()

    seasons = [
        ("Ramadan", "#1 season — extra posts,\nspecial collection, corporate orders", GOLD),
        ("Eid al-Fitr\n& Eid al-Adha", "Major gifting occasions\nfamily & friends", TEAL),
        ("National Day\n(Dec 18)", "Themed packaging\npatriotic content", HexColor("#8B1A4A")),
        ("Weddings &\nCorporate", "Year-round, always\navailable for bulk orders", BLACK),
    ]

    season_w = (W - 110) / 4
    season_h = 90
    season_card_y = season_y - 20

    for i, (name, desc, color) in enumerate(seasons):
        sx = 40 + i * (season_w + 10)
        draw_rounded_rect(c, sx, season_card_y - season_h, season_w, season_h, r=8, fill=color)

        c.saveState()
        c.setFillColor(white if color != GOLD else BLACK)
        c.setFont("Helvetica-Bold", 10)
        nlines = name.split("\n")
        for j, line in enumerate(nlines):
            c.drawCentredString(sx + season_w / 2, season_card_y - 18 - j * 13, line)
        c.setFillColor(Color(1, 1, 1, alpha=0.8) if color != GOLD else MID_GRAY)
        c.setFont("Helvetica", 7)
        dlines = desc.split("\n")
        for j, line in enumerate(dlines):
            c.drawCentredString(sx + season_w / 2, season_card_y - season_h + 30 - j * 10, line)
        c.restoreState()


# ─── PAGE 10: WHAT TO CHOOSE ──────────────────────────────────
def page_choices(c):
    c.setFillColor(WARM_WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = draw_section_title(c, "Your Vision", "Select the direction that speaks to you")

    # Choice 1: Website Style
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "1. Website Background Style")
    c.restoreState()

    opt_y = y - 20
    opt_w = (W - 100) / 2
    opt_h = 130

    # Option A: Dark
    draw_rounded_rect(c, 40, opt_y - opt_h, opt_w, opt_h, r=10, fill=HexColor("#1A1A1A"),
                      stroke=GOLD, stroke_width=2)
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(40 + opt_w / 2, opt_y - 30, "Option A: Dark & Luxurious")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 10)
    c.drawCentredString(40 + opt_w / 2, opt_y - 50, "Black background, gold accents")
    c.drawCentredString(40 + opt_w / 2, opt_y - 65, "Like Bateel & Qinwan")
    c.drawCentredString(40 + opt_w / 2, opt_y - 80, "Products pop against dark")
    c.restoreState()

    # Option B: Light
    draw_rounded_rect(c, 40 + opt_w + 20, opt_y - opt_h, opt_w, opt_h, r=10, fill=CREAM,
                      stroke=GOLD, stroke_width=2)
    c.saveState()
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(40 + opt_w + 20 + opt_w / 2, opt_y - 30, "Option B: Light & Elegant")
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 10)
    c.drawCentredString(40 + opt_w + 20 + opt_w / 2, opt_y - 50, "Cream background, warm tones")
    c.drawCentredString(40 + opt_w + 20 + opt_w / 2, opt_y - 65, "Clean, airy, modern feel")
    c.drawCentredString(40 + opt_w + 20 + opt_w / 2, opt_y - 80, "Feels like a French patisserie")
    c.restoreState()

    # Choice 2: Photography Style
    ch2_y = opt_y - opt_h - 35
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, ch2_y, "2. Photography Style")
    c.restoreState()

    ph_y = ch2_y - 20
    ph_w = (W - 120) / 3
    ph_h = 100

    photo_styles = [
        ("Dark & Dramatic", "Dark marble, moody lighting\nGold props, shadows", HexColor("#2A2520")),
        ("Bright & Clean", "White marble, natural light\nMinimal, modern", CREAM),
        ("Warm & Cozy", "Wooden surfaces, warm light\nArabic coffee, roses", HexColor("#3A2A1A")),
    ]

    for i, (name, desc, bg) in enumerate(photo_styles):
        px = 40 + i * (ph_w + 20)
        draw_rounded_rect(c, px, ph_y - ph_h, ph_w, ph_h, r=8, fill=bg,
                          stroke=GOLD, stroke_width=1)
        c.saveState()
        text_col = GOLD if bg != CREAM else GOLD_DARK
        c.setFillColor(text_col)
        c.setFont("Helvetica-Bold", 11)
        c.drawCentredString(px + ph_w / 2, ph_y - 25, name)
        desc_col = CREAM if bg != CREAM else BLACK
        c.setFillColor(desc_col)
        c.setFont("Helvetica", 8)
        lines = desc.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(px + ph_w / 2, ph_y - 45 - j * 12, line)
        c.restoreState()

    # Choice 3: Instagram Vibe
    ch3_y = ph_y - ph_h - 35
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, ch3_y, "3. Instagram Feed Vibe")
    c.restoreState()

    ig_y = ch3_y - 20
    ig_w = (W - 100) / 2
    ig_h = 100

    # Consistent dark
    draw_rounded_rect(c, 40, ig_y - ig_h, ig_w, ig_h, r=8, fill=BLACK, stroke=GOLD, stroke_width=1)
    # Mini grid dark
    mini = 25
    for row in range(2):
        for col in range(3):
            mx = 55 + col * (mini + 3)
            my = ig_y - 20 - row * (mini + 3)
            c.saveState()
            c.setFillColor(HexColor("#2A2520") if (row + col) % 2 == 0 else HexColor("#1A2A2A"))
            c.rect(mx, my - mini, mini, mini, fill=1, stroke=0)
            c.restoreState()
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(55 + 3 * (mini + 3) + 10, ig_y - 30, "All Dark")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 8)
    c.drawString(55 + 3 * (mini + 3) + 10, ig_y - 45, "Consistent luxury")
    c.drawString(55 + 3 * (mini + 3) + 10, ig_y - 58, "feel throughout")
    c.restoreState()

    # Mixed
    draw_rounded_rect(c, 40 + ig_w + 20, ig_y - ig_h, ig_w, ig_h, r=8, fill=BLACK,
                      stroke=GOLD, stroke_width=1)
    mix_colors = [HexColor("#2A2520"), DARK_CREAM, HexColor("#1A2A2A"),
                  GOLD_LIGHT, HexColor("#2A201A"), DARK_CREAM]
    for row in range(2):
        for col in range(3):
            mx = 55 + ig_w + 20 + col * (mini + 3)
            my = ig_y - 20 - row * (mini + 3)
            c.saveState()
            c.setFillColor(mix_colors[row * 3 + col])
            c.rect(mx, my - mini, mini, mini, fill=1, stroke=0)
            c.restoreState()
    c.saveState()
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(55 + ig_w + 20 + 3 * (mini + 3) + 10, ig_y - 30, "Mixed")
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 8)
    c.drawString(55 + ig_w + 20 + 3 * (mini + 3) + 10, ig_y - 45, "Dark + light variety")
    c.drawString(55 + ig_w + 20 + 3 * (mini + 3) + 10, ig_y - 58, "More dynamic")
    c.restoreState()

    # Bottom CTA
    cta_y = ig_y - ig_h - 40
    draw_rounded_rect(c, 60, cta_y - 50, W - 120, 50, r=10, fill=GOLD)
    c.saveState()
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(W / 2, cta_y - 18, "Share Your Preferences via WhatsApp")
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, cta_y - 35, "Simply indicate A or B for each choice — we bring your vision to life")
    c.restoreState()


# ─── GENERATE PDF ──────────────────────────────────────────────
def main():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

    c_pdf = canvas.Canvas(OUTPUT, pagesize=A4)
    c_pdf.setTitle("La Maison de Gador — Design Presentation")
    c_pdf.setAuthor("Kevin Rizk")
    c_pdf.setSubject("Website & Social Media Design Presentation for Uncle Zouzou")

    total_pages = 9

    # Page 1: Cover
    page_cover(c_pdf)
    draw_page_number(c_pdf, 1, total_pages)
    c_pdf.showPage()

    # Page 2: Brand Identity
    page_brand_identity(c_pdf)
    draw_page_number(c_pdf, 2, total_pages)
    c_pdf.showPage()

    # Page 3: Homepage
    page_homepage(c_pdf)
    draw_page_number(c_pdf, 3, total_pages)
    c_pdf.showPage()

    # Page 4: Shop
    page_shop(c_pdf)
    draw_page_number(c_pdf, 4, total_pages)
    c_pdf.showPage()

    # Page 5: Product Page
    page_product(c_pdf)
    draw_page_number(c_pdf, 5, total_pages)
    c_pdf.showPage()

    # Page 6: Gift Boxes
    page_gift_boxes(c_pdf)
    draw_page_number(c_pdf, 6, total_pages)
    c_pdf.showPage()

    # Page 7: Instagram Feed
    page_instagram_feed(c_pdf)
    draw_page_number(c_pdf, 7, total_pages)
    c_pdf.showPage()

    # Page 8: Stories & Posts
    page_stories_posts(c_pdf)
    draw_page_number(c_pdf, 8, total_pages)
    c_pdf.showPage()

    # Page 9: Choices
    page_choices(c_pdf)
    draw_page_number(c_pdf, 9, total_pages)
    c_pdf.showPage()

    c_pdf.save()
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    main()
