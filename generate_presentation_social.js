const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Kevin Rizk";
pres.title = "La Maison de Gador — Social Media Plan";

// Brand Colors (no # prefix)
const C = {
  teal:    "1B4D4D",
  tealMid: "2A6B6B",
  tealLight:"3A8080",
  gold:    "C9A84E",
  goldLight:"D4B96A",
  cream:   "F5F0E8",
  dark:    "0F2E2E",
  burg:    "6B1022",
  white:   "FFFFFF",
  gray:    "94A3B8",
  lightGray:"E2E8F0",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.18 });

// ─────────────────────────────────────────────────
// SLIDE 1 — COVER
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Left gold accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.gold } });

  // Bottom teal band
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.6, w: 10, h: 1.025, fill: { color: C.teal } });

  // Decorative gold circles (abstract phoenix/brand motif)
  s.addShape(pres.shapes.OVAL, { x: 7.2, y: -0.8, w: 3.5, h: 3.5, fill: { color: C.teal, transparency: 60 }, line: { color: C.teal, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: 7.8, y: 0.2, w: 2.2, h: 2.2, fill: { color: C.gold, transparency: 75 }, line: { color: C.gold, width: 0 } });

  // Brand label
  s.addText("LA MAISON DE GADOR", {
    x: 0.4, y: 1.1, w: 7, h: 0.5,
    fontSize: 11, fontFace: "Georgia", color: C.gold,
    bold: false, charSpacing: 6, margin: 0
  });

  // Main title
  s.addText("خطة التواصل الاجتماعي", {
    x: 0.4, y: 1.65, w: 7.5, h: 0.7,
    fontSize: 22, fontFace: "Georgia", color: C.goldLight,
    bold: false, italic: true, margin: 0
  });

  s.addText("Social Media Plan", {
    x: 0.4, y: 2.45, w: 7.5, h: 0.9,
    fontSize: 42, fontFace: "Georgia", color: C.white,
    bold: true, margin: 0
  });

  s.addText("Step-by-step strategy to launch La Maison de Gador online\nand build our audience before the grand opening.", {
    x: 0.4, y: 3.42, w: 7.5, h: 0.85,
    fontSize: 14, fontFace: "Calibri", color: C.cream,
    margin: 0
  });

  // Bottom bar content
  s.addText("Prepared by Kevin Rizk  ·  March 2026  ·  Doha, Qatar", {
    x: 0.3, y: 4.7, w: 9.4, h: 0.5,
    fontSize: 11, fontFace: "Calibri", color: C.goldLight,
    margin: 0, align: "center"
  });
}

// ─────────────────────────────────────────────────
// SLIDE 2 — AGENDA / WHAT WE'LL COVER
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("What We Will Cover Today", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const steps = [
    ["01", "The Opportunity",       "Why Qatar, why now, and why premium dates is the right market."],
    ["02", "Our Brand Position",     "French luxury meets Gulf heritage — what makes us different."],
    ["03", "Platform Strategy",      "Instagram first. Which platforms, why, and how we'll use them."],
    ["04", "Content Plan",           "What we'll post, how often, and what it will look like."],
    ["05", "30-Day Launch Calendar", "Week-by-week content plan for the first month."],
    ["06", "Budget & Next Steps",    "What it costs, what we need, and what happens next."],
  ];

  steps.forEach((step, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const x = col === 0 ? 0.3 : 5.2;
    const y = 1.1 + row * 1.4;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.2, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h: 1.2, fill: { color: C.teal } });

    s.addText(step[0], { x, y, w: 0.55, h: 1.2, fontSize: 16, fontFace: "Georgia", color: C.gold, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(step[1], { x: x + 0.65, y: y + 0.08, w: 3.85, h: 0.4, fontSize: 13, fontFace: "Georgia", color: C.dark, bold: true, margin: 0 });
    s.addText(step[2], { x: x + 0.65, y: y + 0.48, w: 3.85, h: 0.65, fontSize: 10.5, fontFace: "Calibri", color: C.teal, margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 3 — THE MARKET OPPORTUNITY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.teal } });
  s.addText("The Market Opportunity", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  // 3 big stats
  const stats = [
    ["8%",      "Annual growth",      "Qatar premium\ndates & gifting market"],
    ["60%+",    "of Qatari households", "buy premium dates\nfor gifting occasions"],
    ["$12.8B",  "GCC luxury market",  "Personal luxury goods\n(+6% year over year)"],
  ];

  stats.forEach((st, i) => {
    const x = 0.3 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 3.0, h: 2.0, fill: { color: C.teal }, shadow: makeShadow() });
    s.addText(st[0], { x, y: 1.15, w: 3.0, h: 0.85, fontSize: 42, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
    s.addText(st[1], { x, y: 1.95, w: 3.0, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.goldLight, align: "center", bold: true, margin: 0 });
    s.addText(st[2], { x, y: 2.32, w: 3.0, h: 0.7, fontSize: 10.5, fontFace: "Calibri", color: C.cream, align: "center", margin: 0 });
  });

  // Trends
  s.addText("Key Trends Driving Demand", {
    x: 0.3, y: 3.3, w: 9, h: 0.4, fontSize: 14, fontFace: "Georgia", color: C.goldLight, bold: true, margin: 0
  });

  const trends = [
    "Dubai Chocolate Dates went viral on TikTok — stuffed dates are now mainstream luxury",
    "Health-conscious luxury: 57% of Gulf households buy organic/premium dates",
    "Gift box culture: dates are now a luxury gifting product, not just food",
    "Arabic-first social content drives higher engagement than English-only",
  ];

  trends.forEach((t, i) => {
    s.addShape(pres.shapes.OVAL, { x: 0.3, y: 3.82 + i * 0.38, w: 0.14, h: 0.14, fill: { color: C.gold } });
    s.addText(t, { x: 0.55, y: 3.78 + i * 0.38, w: 9.1, h: 0.32, fontSize: 11, fontFace: "Calibri", color: C.cream, margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 4 — OUR POSITIONING
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("Our Unique Position", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  // Big positioning statement
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.05, w: 9.4, h: 1.2, fill: { color: C.teal }, shadow: makeShadow() });
  s.addText('"French Luxury Meets Gulf Heritage"', {
    x: 0.3, y: 1.05, w: 9.4, h: 0.7, fontSize: 26, fontFace: "Georgia",
    color: C.gold, bold: true, italic: true, align: "center", valign: "bottom", margin: 0
  });
  s.addText("The only premium chocolate dates brand in Qatar with this identity.", {
    x: 0.3, y: 1.72, w: 9.4, h: 0.45, fontSize: 13, fontFace: "Calibri",
    color: C.cream, align: "center", margin: 0
  });

  // 4 differentiators
  const diff = [
    ["The Phoenix",        "No competitor uses a phoenix. Symbolizes rebirth, transformation, and luxury."],
    ["La Maison Name",     "French naming on an Arab product — bridges two worlds elegantly."],
    ["Chocolate Focus",    "We OWN the chocolate-dates niche in Qatar. Nobody else has claimed it."],
    ["Artisan Story",      "Small-batch, handcrafted — intimacy that large brands like Bateel can't offer."],
  ];

  diff.forEach((d, i) => {
    const x = i < 2 ? 0.3 : 5.15;
    const y = i % 2 === 0 ? 2.5 : 3.55;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.95, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.95, fill: { color: C.gold } });
    s.addText(d[0], { x: x + 0.15, y: y + 0.06, w: 4.2, h: 0.32, fontSize: 13, fontFace: "Georgia", color: C.teal, bold: true, margin: 0 });
    s.addText(d[1], { x: x + 0.15, y: y + 0.38, w: 4.2, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.dark, margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 5 — PLATFORM STRATEGY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.teal } });
  s.addText("Platform Strategy", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const platforms = [
    {
      name: "Instagram",
      label: "PRIMARY",
      labelColor: C.gold,
      desc: "Our main channel. Beautiful photos, Reels, Stories, and Shopping. This is where our audience lives.",
      freq: ["4–5 posts/week", "3 Reels/week", "Daily Stories"],
      color: C.tealMid,
      x: 0.3
    },
    {
      name: "Facebook",
      label: "SECONDARY",
      labelColor: C.goldLight,
      desc: "Same content as Instagram, cross-posted automatically via Meta Business Suite. Zero extra work.",
      freq: ["Auto cross-post", "Older audience", "Corporate reach"],
      color: "2A4060",
      x: 3.6
    },
    {
      name: "WhatsApp",
      label: "SALES CHANNEL",
      labelColor: C.goldLight,
      desc: "Direct orders and customer service. Qatar runs on WhatsApp. Our floating button on the website links directly here.",
      freq: ["Order inquiries", "Custom requests", "VIP updates"],
      color: "1A3A2A",
      x: 6.9
    },
  ];

  platforms.forEach((p) => {
    s.addShape(pres.shapes.RECTANGLE, { x: p.x, y: 1.05, w: 3.0, h: 4.0, fill: { color: p.color }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: p.x, y: 1.05, w: 3.0, h: 0.07, fill: { color: p.labelColor } });

    s.addText(p.label, { x: p.x, y: 1.12, w: 3.0, h: 0.35, fontSize: 9, fontFace: "Calibri", color: p.labelColor, bold: true, align: "center", charSpacing: 3, margin: 0 });
    s.addText(p.name, { x: p.x, y: 1.42, w: 3.0, h: 0.55, fontSize: 24, fontFace: "Georgia", color: C.white, bold: true, align: "center", margin: 0 });
    s.addText(p.desc, { x: p.x + 0.15, y: 2.05, w: 2.7, h: 1.3, fontSize: 11, fontFace: "Calibri", color: C.cream, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: p.x + 0.15, y: 3.42, w: 2.7, h: 0.03, fill: { color: p.labelColor, transparency: 50 } });

    p.freq.forEach((f, fi) => {
      s.addShape(pres.shapes.OVAL, { x: p.x + 0.18, y: 3.55 + fi * 0.38, w: 0.1, h: 0.1, fill: { color: p.labelColor } });
      s.addText(f, { x: p.x + 0.35, y: 3.5 + fi * 0.38, w: 2.5, h: 0.33, fontSize: 11, fontFace: "Calibri", color: C.cream, margin: 0 });
    });
  });

  // TikTok note
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 5.1, w: 9.4, h: 0.38, fill: { color: C.gold, transparency: 85 } });
  s.addText("TikTok — Future expansion once we have product videos. The Dubai chocolate dates trend started on TikTok.", {
    x: 0.45, y: 5.13, w: 9, h: 0.32, fontSize: 10.5, fontFace: "Calibri", color: C.goldLight, margin: 0
  });
}

// ─────────────────────────────────────────────────
// SLIDE 6 — CONTENT PILLARS
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("What We Will Post — Content Pillars", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const pillars = [
    { pct: "35%", name: "Product Showcase",  desc: "Beautiful shots of dates, fillings, and luxury boxes. This is our storefront.", color: C.teal },
    { pct: "20%", name: "Behind the Scenes", desc: "Stuffing dates, drizzling chocolate, packaging. Shows craftsmanship & builds trust.", color: C.burg },
    { pct: "20%", name: "Lifestyle & Gifting", desc: "Dates in elegant Gulf settings, gift-giving moments, Arabic coffee tables.", color: "1A6B4A" },
    { pct: "15%", name: "Culture & Heritage", desc: "Arabic calligraphy, Gulf traditions, the meaning of dates in Arab culture.", color: "4A3060" },
    { pct: "10%", name: "Engagement",         desc: "Polls, questions, giveaways, customer features. Keeps followers active.", color: "5A3020" },
  ];

  pillars.forEach((p, i) => {
    const x = (i % 3) * 3.2 + 0.25;
    const y = i < 3 ? 1.1 : 2.9;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 1.6, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 0.55, fill: { color: p.color } });
    s.addText(p.pct, { x, y: y + 0.02, w: 1.1, h: 0.52, fontSize: 26, fontFace: "Georgia", color: C.gold, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(p.name, { x: x + 1.1, y: y + 0.05, w: 1.85, h: 0.48, fontSize: 11.5, fontFace: "Georgia", color: C.cream, bold: true, valign: "middle", margin: 0 });
    s.addText(p.desc, { x: x + 0.1, y: y + 0.6, w: 2.8, h: 0.92, fontSize: 10.5, fontFace: "Calibri", color: C.dark, margin: 0 });
  });

  // Posting frequency bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 4.65, w: 9.5, h: 0.78, fill: { color: C.teal }, shadow: makeShadow() });
  s.addText("Posting Frequency:", { x: 0.4, y: 4.7, w: 1.8, h: 0.65, fontSize: 11, fontFace: "Georgia", color: C.gold, bold: true, valign: "middle", margin: 0 });

  const freq = ["4–5 posts/week  ·  Feed", "3 Reels/week", "5–7 Stories/day", "1–2 Carousels/week"];
  freq.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 2.1 + i * 1.95, y: 4.82, w: 1.75, h: 0.38, fill: { color: C.dark }, shadow: makeShadow() });
    s.addText(f, { x: 2.1 + i * 1.95, y: 4.82, w: 1.75, h: 0.38, fontSize: 9.5, fontFace: "Calibri", color: C.cream, align: "center", valign: "middle", margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 7 — INSTAGRAM WIREFRAMES (How Posts Will Look)
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.teal } });
  s.addText("How Our Posts Will Look on Instagram", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  // Phone frame helper
  const addPhoneFrame = (x, y, w, h) => {
    // Phone body
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.12, y: y - 0.7, w: w + 0.24, h: h + 1.5, fill: { color: "1A1A2E" }, rectRadius: 0.15, shadow: makeShadow() });
    // Screen
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "0A0A0A" } });
  };

  // ── POST 1: Product Shot ──
  const p1x = 0.3, p1y = 1.0, p1w = 2.6, p1h = 3.0;
  addPhoneFrame(p1x, p1y, p1w, p1h);

  // Header (profile)
  s.addShape(pres.shapes.RECTANGLE, { x: p1x, y: p1y, w: p1w, h: 0.35, fill: { color: "111111" } });
  s.addShape(pres.shapes.OVAL, { x: p1x + 0.06, y: p1y + 0.04, w: 0.26, h: 0.26, fill: { color: C.gold } });
  s.addText("lamaisondegador", { x: p1x + 0.35, y: p1y + 0.07, w: 1.6, h: 0.22, fontSize: 7.5, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  s.addText("Follow", { x: p1x + 2.1, y: p1y + 0.08, w: 0.44, h: 0.2, fontSize: 7, fontFace: "Calibri", color: C.gold, bold: true, margin: 0 });

  // Post image area (dark with gold circle suggestion of date)
  s.addShape(pres.shapes.RECTANGLE, { x: p1x, y: p1y + 0.35, w: p1w, h: p1w, fill: { color: "0D1F1F" } });
  s.addShape(pres.shapes.OVAL, { x: p1x + 0.7, y: p1y + 0.7, w: 1.2, h: 1.2, fill: { color: C.teal, transparency: 30 } });
  s.addShape(pres.shapes.OVAL, { x: p1x + 0.9, y: p1y + 0.9, w: 0.8, h: 0.8, fill: { color: C.gold, transparency: 20 } });
  s.addText("📸 Product\nPhoto Here", { x: p1x, y: p1y + 0.9, w: p1w, h: 0.7, fontSize: 9, fontFace: "Calibri", color: C.cream, align: "center", margin: 0 });

  // Like/comment icons (text)
  s.addShape(pres.shapes.RECTANGLE, { x: p1x, y: p1y + 2.95, w: p1w, h: 0.6, fill: { color: "111111" } });
  s.addText("♡  ✉  ↗  🔖", { x: p1x + 0.05, y: p1y + 3.0, w: 2.0, h: 0.22, fontSize: 9, fontFace: "Calibri", color: C.white, margin: 0 });
  s.addText("lamaisondegador  تمر الشوكولا\nالفاخرة من قلب الدوحة...\n#لامايزون_دي_غادور", {
    x: p1x + 0.05, y: p1y + 3.2, w: 2.5, h: 0.5, fontSize: 6.5, fontFace: "Calibri", color: C.cream, margin: 0
  });

  s.addText("Feed Post", { x: p1x, y: p1y + 4.07, w: p1w, h: 0.3, fontSize: 9, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
  s.addText("Product Shot", { x: p1x, y: p1y + 4.33, w: p1w, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.gray, align: "center", margin: 0 });

  // ── POST 2: REEL ──
  const p2x = 3.7, p2y = 1.0, p2w = 2.6, p2h = 3.0;
  addPhoneFrame(p2x, p2y, p2w, p2h);

  // Reel vertical video style
  s.addShape(pres.shapes.RECTANGLE, { x: p2x, y: p2y, w: p2w, h: p2h, fill: { color: "080808" } });
  s.addShape(pres.shapes.RECTANGLE, { x: p2x, y: p2y + 0.6, w: p2w, h: 1.6, fill: { color: C.teal, transparency: 60 } });
  s.addText("▶", { x: p2x, y: p2y + 1.0, w: p2w, h: 0.7, fontSize: 28, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

  // Reel UI elements
  s.addShape(pres.shapes.OVAL, { x: p2x + 2.2, y: p2y + 1.6, w: 0.28, h: 0.28, fill: { color: C.gold } });
  s.addText("lamaisondegador", { x: p2x + 0.08, y: p2y + 2.4, w: 1.8, h: 0.2, fontSize: 7, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  s.addText("صنع تمر الشوكولا 🍫\n#تمور_فاخرة #الدوحة", { x: p2x + 0.08, y: p2y + 2.6, w: 2.1, h: 0.35, fontSize: 6.5, fontFace: "Calibri", color: C.cream, margin: 0 });
  s.addText("♡ 1.2K\n✉ 48\n⤴ 220", { x: p2x + 2.25, y: p2y + 1.95, w: 0.35, h: 0.85, fontSize: 6, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

  // Reel progress bar
  s.addShape(pres.shapes.RECTANGLE, { x: p2x, y: p2y + 2.97, w: p2w, h: 0.04, fill: { color: "333333" } });
  s.addShape(pres.shapes.RECTANGLE, { x: p2x, y: p2y + 2.97, w: p2w * 0.4, h: 0.04, fill: { color: C.gold } });

  s.addText("Reel", { x: p2x, y: p2y + 4.07, w: p2w, h: 0.3, fontSize: 9, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
  s.addText("Behind the Scenes", { x: p2x, y: p2y + 4.33, w: p2w, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.gray, align: "center", margin: 0 });

  // ── POST 3: STORY ──
  const p3x = 7.1, p3y = 1.0, p3w = 2.6, p3h = 3.0;
  addPhoneFrame(p3x, p3y, p3w, p3h);

  s.addShape(pres.shapes.RECTANGLE, { x: p3x, y: p3y, w: p3w, h: p3h, fill: { color: C.dark } });
  // Story gradient sim
  s.addShape(pres.shapes.RECTANGLE, { x: p3x, y: p3y, w: p3w, h: 0.08, fill: { color: C.gold } });
  s.addShape(pres.shapes.RECTANGLE, { x: p3x + 0.55, y: p3y, w: p3w - 0.55, h: 0.08, fill: { color: C.cream, transparency: 60 } });

  // Story header
  s.addShape(pres.shapes.OVAL, { x: p3x + 0.1, y: p3y + 0.12, w: 0.3, h: 0.3, fill: { color: C.gold } });
  s.addText("lamaisondegador  ·  now", { x: p3x + 0.44, y: p3y + 0.17, w: 1.8, h: 0.2, fontSize: 6.5, fontFace: "Calibri", color: C.white, margin: 0 });

  // Story poll
  s.addShape(pres.shapes.RECTANGLE, { x: p3x + 0.2, y: p3y + 0.55, w: p3w - 0.4, h: 1.15, fill: { color: C.teal, transparency: 20 } });
  s.addText("Which filling\ndo you prefer? 🍫", { x: p3x + 0.2, y: p3y + 0.6, w: p3w - 0.4, h: 0.55, fontSize: 11, fontFace: "Georgia", color: C.white, bold: true, align: "center", margin: 0 });

  // Poll options
  s.addShape(pres.shapes.RECTANGLE, { x: p3x + 0.25, y: p3y + 1.22, w: 2.05, h: 0.28, fill: { color: C.gold, transparency: 20 } });
  s.addText("Pistachio 🟢", { x: p3x + 0.25, y: p3y + 1.22, w: 2.05, h: 0.28, fontSize: 8.5, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: p3x + 0.25, y: p3y + 1.54, w: 2.05, h: 0.28, fill: { color: C.teal } });
  s.addText("Almond 🟤", { x: p3x + 0.25, y: p3y + 1.54, w: 2.05, h: 0.28, fontSize: 8.5, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });

  // Story swipe up
  s.addText("لامايزون دي غادور 🌟\nSwipe up to order", { x: p3x + 0.1, y: p3y + 2.2, w: p3w - 0.2, h: 0.4, fontSize: 8, fontFace: "Calibri", color: C.cream, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: p3x + 0.5, y: p3y + 2.65, w: 1.6, h: 0.25, fill: { color: C.gold } });
  s.addText("Order on WhatsApp", { x: p3x + 0.5, y: p3y + 2.65, w: 1.6, h: 0.25, fontSize: 7.5, fontFace: "Calibri", color: C.dark, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addText("Story", { x: p3x, y: p3y + 4.07, w: p3w, h: 0.3, fontSize: 9, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
  s.addText("Daily Engagement Poll", { x: p3x, y: p3y + 4.33, w: p3w, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.gray, align: "center", margin: 0 });
}

// ─────────────────────────────────────────────────
// SLIDE 8 — 30-DAY CONTENT CALENDAR
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("30-Day Launch Content Calendar", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const weeks = [
    {
      week: "Week 1",
      theme: "Brand Introduction",
      color: C.teal,
      items: ["Day 1 — Reel: Brand reveal + logo animation (15 sec)", "Day 2 — Stories: 'Coming soon to Doha' countdown", "Day 3 — Carousel: Meet La Maison de Gador (5 slides)", "Day 4 — Reel: Date being stuffed — ASMR style close-up", "Day 5 — Feed: Hero product shot on dark marble"]
    },
    {
      week: "Week 2",
      theme: "Product Focus",
      color: C.burg,
      items: ["Day 8 — Carousel: Our Collections — all gift box sizes", "Day 9 — Reel: Chocolate drizzle over dates", "Day 10 — Feed: Single date, dramatic lighting", "Day 12 — Reel: Unboxing a luxury gift box", "Day 14 — Carousel: The Art of Filling — step-by-step"]
    },
    {
      week: "Week 3",
      theme: "Lifestyle & Gifting",
      color: "1A5A3A",
      items: ["Day 15 — Reel: Dates with Arabic coffee in majlis setting", "Day 16 — Feed: Gift box on marble with gold accents", "Day 17 — Story: First customer testimonial", "Day 18 — Carousel: Perfect for Every Occasion", "Day 20 — Feed: Cross-section of date showing filling layers"]
    },
    {
      week: "Week 4",
      theme: "Community & Growth",
      color: "3A2060",
      items: ["Day 22 — Reel: A day in our kitchen montage", "Day 23 — Feed: Corporate gift box with branded sleeve", "Day 25 — Reel: Influencer unboxing (first collab)", "Day 27 — Story: Giveaway — Win a luxury gift box", "Day 30 — Carousel: 'Coming next month...' — new flavors"]
    },
  ];

  weeks.forEach((w, i) => {
    const x = i < 2 ? 0.25 : 5.15;
    const y = i % 2 === 0 ? 1.0 : 3.2;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 2.0, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.5, fill: { color: w.color } });
    s.addText(w.week, { x, y, w: 1.1, h: 0.5, fontSize: 13, fontFace: "Georgia", color: C.gold, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(w.theme, { x: x + 1.1, y, w: 3.5, h: 0.5, fontSize: 12, fontFace: "Georgia", color: C.cream, bold: true, valign: "middle", margin: 0 });

    w.items.forEach((item, ii) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.6 + ii * 0.29, w: 0.08, h: 0.08, fill: { color: w.color } });
      s.addText(item, { x: x + 0.26, y: y + 0.56 + ii * 0.29, w: 4.2, h: 0.26, fontSize: 9.5, fontFace: "Calibri", color: C.dark, margin: 0 });
    });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 9 — LAUNCH STRATEGY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.teal } });
  s.addText("Launch Strategy", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const phases = [
    {
      phase: "Phase 1",
      title: "Pre-Launch\n2 Weeks Before",
      color: C.tealMid,
      steps: ["Create Instagram + Facebook business pages", "Post 5–7 teaser images — never the full product yet", "Story countdown: '7 days... 6 days...'", "Collect WhatsApp signups: 'Be the first to taste'", "Send teaser boxes to 10 micro-influencers"]
    },
    {
      phase: "Phase 2",
      title: "Launch Day\nDay 1",
      color: C.burg,
      steps: ["Full brand reveal Reel + Carousel", "Influencer posts all go live at the same time", "Instagram Stories: behind the scenes of launch day", "WhatsApp broadcast to pre-launch list", "Boost the reveal post ($20–50 that day)"]
    },
    {
      phase: "Phase 3",
      title: "First Campaign\nWeeks 3–6",
      color: "1A5A3A",
      steps: ["'The Art of Gifting' — position dates as THE premium gift", "Content series: 'Perfect for Ramadan / Corporate / Weddings'", "2–3 influencer unboxing videos per week", "Activate Instagram Shopping — link products directly", "Build corporate gifting pipeline via WhatsApp outreach"]
    },
  ];

  phases.forEach((p, i) => {
    const x = 0.25 + i * 3.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 3.0, h: 4.35, fill: { color: p.color, transparency: 20 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 3.0, h: 0.08, fill: { color: C.gold } });

    s.addText(p.phase, { x, y: 1.08, w: 3.0, h: 0.32, fontSize: 10, fontFace: "Calibri", color: C.gold, bold: true, align: "center", charSpacing: 2, margin: 0 });
    s.addText(p.title, { x, y: 1.38, w: 3.0, h: 0.62, fontSize: 14, fontFace: "Georgia", color: C.white, bold: true, align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.05, w: 2.7, h: 0.03, fill: { color: C.gold, transparency: 70 } });

    p.steps.forEach((step, si) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: 2.18 + si * 0.44, w: 0.1, h: 0.1, fill: { color: C.gold } });
      s.addText(step, { x: x + 0.32, y: 2.12 + si * 0.44, w: 2.55, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.cream, margin: 0 });
    });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 10 — WHAT WE NEED FROM YOU
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("What We Need to Get Started", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const needs = [
    {
      num: "1",
      title: "Product Photos",
      desc: "Even phone photos work to start. Dark background, good light, close-up of the dates. We can use your kitchen counter and a dark tray. Professional shoot can come later.",
      urgent: true
    },
    {
      num: "2",
      title: "SVG Logo File",
      desc: "The clean vector logo from the designer (transparent background, no square). Needed for the website header, social media, and packaging.",
      urgent: true
    },
    {
      num: "3",
      title: "Instagram Account Access",
      desc: "Create @lamaisondegador on Instagram (and Facebook). We manage the content together — you approve everything before it goes live via our WhatsApp group.",
      urgent: true
    },
    {
      num: "4",
      title: "WhatsApp Business",
      desc: "Set up WhatsApp Business on +974 3331 4007 with the brand profile, logo, and auto-reply messages. This is our primary sales channel.",
      urgent: false
    },
    {
      num: "5",
      title: "Domain Registration",
      desc: "Register lamaisondegador.com (or .qa) via Cloudflare. ~$12/year. Then connect it to our website on Vercel.",
      urgent: false
    },
    {
      num: "6",
      title: "Approval Workflow",
      desc: "Each week, Kevin prepares the content (posts + captions in EN/AR). You approve via WhatsApp. Kevin schedules via Meta Business Suite. Simple.",
      urgent: false
    },
  ];

  needs.forEach((n, i) => {
    const x = i < 3 ? 0.25 : 5.1;
    const y = 1.05 + (i % 3) * 1.5;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.35, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h: 1.35, fill: { color: n.urgent ? C.teal : C.tealMid } });
    s.addText(n.num, { x, y, w: 0.55, h: 1.35, fontSize: 22, fontFace: "Georgia", color: C.gold, bold: true, align: "center", valign: "middle", margin: 0 });

    if (n.urgent) {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 3.8, y: y + 0.06, w: 0.6, h: 0.22, fill: { color: C.gold } });
      s.addText("NOW", { x: x + 3.8, y: y + 0.06, w: 0.6, h: 0.22, fontSize: 8, fontFace: "Calibri", color: C.dark, bold: true, align: "center", valign: "middle", margin: 0 });
    }

    s.addText(n.title, { x: x + 0.65, y: y + 0.1, w: 3.6, h: 0.3, fontSize: 12.5, fontFace: "Georgia", color: C.teal, bold: true, margin: 0 });
    s.addText(n.desc, { x: x + 0.65, y: y + 0.42, w: 3.7, h: 0.85, fontSize: 9.5, fontFace: "Calibri", color: C.dark, margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 11 — BUDGET
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.teal } });
  s.addText("Budget — What It Costs", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  // Big monthly total
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.0, w: 2.8, h: 2.0, fill: { color: C.teal }, shadow: makeShadow() });
  s.addText("~$10", { x: 0.25, y: 1.1, w: 2.8, h: 0.9, fontSize: 50, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
  s.addText("/month\nFixed costs", { x: 0.25, y: 1.95, w: 2.8, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.cream, align: "center", margin: 0 });

  // Monthly fixed costs table
  const fixed = [
    ["Website hosting (Vercel)", "Free"],
    ["Domain (.com — Cloudflare)", "~$1/mo"],
    ["Meta Business Suite", "$0"],
    ["Canva (design tool)", "$0"],
    ["Zoho Email (5 users)", "$0"],
    ["WhatsApp Business", "$0"],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 3.25, y: 1.0, w: 6.5, h: 0.38, fill: { color: C.tealMid } });
  s.addText("Fixed Costs", { x: 3.3, y: 1.0, w: 3.5, h: 0.38, fontSize: 11, fontFace: "Georgia", color: C.gold, bold: true, valign: "middle", margin: 0 });
  s.addText("Monthly", { x: 6.75, y: 1.0, w: 1.0, h: 0.38, fontSize: 10, fontFace: "Calibri", color: C.cream, bold: true, valign: "middle", align: "right", margin: 0 });

  fixed.forEach((row, i) => {
    const rowBg = i % 2 === 0 ? "1A3535" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 3.25, y: 1.38 + i * 0.3, w: 6.5, h: 0.3, fill: { color: rowBg } });
    s.addText(row[0], { x: 3.4, y: 1.38 + i * 0.3, w: 5.0, h: 0.3, fontSize: 10.5, fontFace: "Calibri", color: C.cream, valign: "middle", margin: 0 });
    s.addText(row[1], { x: 8.3, y: 1.38 + i * 0.3, w: 1.3, h: 0.3, fontSize: 10.5, fontFace: "Calibri", color: C.gold, bold: true, valign: "middle", align: "right", margin: 0 });
  });

  // Variable costs
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 3.18, w: 9.5, h: 0.38, fill: { color: C.tealMid } });
  s.addText("Variable Costs (Growth Budget — Optional at Start)", { x: 0.35, y: 3.18, w: 8.0, h: 0.38, fontSize: 11, fontFace: "Georgia", color: C.gold, bold: true, valign: "middle", margin: 0 });

  const variable = [
    ["Ad boosting on Instagram/Facebook", "$150–300/mo", "Start small with best organic posts"],
    ["Influencer gifting (product boxes)", "$50–200/mo",  "Give free boxes in exchange for posts"],
    ["Product photography (first shoot)", "$200–500",     "One-time cost — or DIY with phone"],
  ];

  variable.forEach((row, i) => {
    const rowBg = i % 2 === 0 ? "1A3535" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 3.56 + i * 0.5, w: 9.5, h: 0.5, fill: { color: rowBg } });
    s.addText(row[0], { x: 0.4, y: 3.56 + i * 0.5, w: 4.5, h: 0.5, fontSize: 10.5, fontFace: "Calibri", color: C.cream, valign: "middle", margin: 0 });
    s.addText(row[1], { x: 4.9, y: 3.56 + i * 0.5, w: 1.5, h: 0.5, fontSize: 10.5, fontFace: "Calibri", color: C.gold, bold: true, valign: "middle", margin: 0 });
    s.addText(row[2], { x: 6.4, y: 3.56 + i * 0.5, w: 3.2, h: 0.5, fontSize: 9.5, fontFace: "Calibri", color: C.gray, valign: "middle", italic: true, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 5.07, w: 9.5, h: 0.38, fill: { color: C.gold, transparency: 85 } });
  s.addText("Website, design, and social tools are 100% free. The only real cost to start is the ad budget — and even that is optional in week 1.", {
    x: 0.4, y: 5.1, w: 9.1, h: 0.32, fontSize: 10.5, fontFace: "Calibri", color: C.goldLight, italic: true, margin: 0
  });
}

// ─────────────────────────────────────────────────
// SLIDE 12 — NEXT STEPS
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.dark } });
  s.addText("Next Steps — What Happens Now", {
    x: 0.4, y: 0.05, w: 9, h: 0.8, fontSize: 22, fontFace: "Georgia",
    color: C.gold, bold: true, valign: "middle", margin: 0
  });

  const steps = [
    { num: "1", when: "This Week",   icon: "📱", title: "Create Social Accounts",       desc: "Set up @lamaisondegador on Instagram and Facebook. We'll optimize the profile together.", who: "Uncle" },
    { num: "2", when: "This Week",   icon: "📸", title: "First Product Photos",          desc: "Take 10–15 photos of the dates at home. Dark surface, good phone camera, natural light. Send to Kevin.", who: "Uncle" },
    { num: "3", when: "This Week",   icon: "🌐", title: "Register the Domain",           desc: "lamaisondegador.com via Cloudflare (~$12/year). Kevin will connect it to the website.", who: "Both" },
    { num: "4", when: "Week 2",      icon: "🎨", title: "Get SVG Logo from Designer",    desc: "Contact the designer and request the clean transparent PNG/SVG version of the new phoenix logo.", who: "Uncle" },
    { num: "5", when: "Week 2",      icon: "📅", title: "First Content Batch",           desc: "Kevin prepares Week 1 posts (7 pieces of content). Uncle approves via WhatsApp. Schedule and launch.", who: "Kevin" },
    { num: "6", when: "Week 3",      icon: "🚀", title: "Official Launch",               desc: "Brand reveal day. Full launch strategy kicks in. Influencer outreach begins. First orders arrive.", who: "Both" },
  ];

  steps.forEach((st, i) => {
    const x = i < 3 ? 0.25 : 5.1;
    const y = 1.05 + (i % 3) * 1.48;

    const whoColor = st.who === "Uncle" ? C.burg : st.who === "Kevin" ? C.teal : C.tealMid;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.32, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.32, fill: { color: C.gold } });

    s.addText(st.icon + "  " + st.title, { x: x + 0.14, y: y + 0.07, w: 3.3, h: 0.32, fontSize: 12, fontFace: "Georgia", color: C.teal, bold: true, margin: 0 });

    // When badge
    s.addShape(pres.shapes.RECTANGLE, { x: x + 3.5, y: y + 0.07, w: 0.88, h: 0.22, fill: { color: C.cream } });
    s.addText(st.when, { x: x + 3.5, y: y + 0.07, w: 0.88, h: 0.22, fontSize: 8, fontFace: "Calibri", color: C.teal, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText(st.desc, { x: x + 0.14, y: y + 0.42, w: 4.15, h: 0.7, fontSize: 10, fontFace: "Calibri", color: C.dark, margin: 0 });

    // Who badge
    s.addShape(pres.shapes.RECTANGLE, { x: x + 3.65, y: y + 1.04, w: 0.75, h: 0.22, fill: { color: whoColor } });
    s.addText(st.who, { x: x + 3.65, y: y + 1.04, w: 0.75, h: 0.22, fontSize: 8, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  });
}

// ─────────────────────────────────────────────────
// SLIDE 13 — CLOSING
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });

  // Decorative circles
  s.addShape(pres.shapes.OVAL, { x: -0.8, y: 1.5, w: 3.5, h: 3.5, fill: { color: C.teal, transparency: 70 }, line: { color: C.teal, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: 7.8, y: 2.5, w: 3.0, h: 3.0, fill: { color: C.gold, transparency: 80 }, line: { color: C.gold, width: 0 } });

  s.addText("LA MAISON DE GADOR", {
    x: 0.5, y: 1.1, w: 9, h: 0.45, fontSize: 11, fontFace: "Georgia", color: C.gold,
    align: "center", charSpacing: 8, margin: 0
  });

  s.addText("فن التذوق", {
    x: 0.5, y: 1.55, w: 9, h: 0.55, fontSize: 22, fontFace: "Georgia",
    color: C.goldLight, align: "center", italic: true, margin: 0
  });

  s.addText("The Art of Adoration", {
    x: 0.5, y: 2.1, w: 9, h: 0.5, fontSize: 18, fontFace: "Georgia",
    color: C.cream, align: "center", italic: true, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 2.75, w: 3.0, h: 0.03, fill: { color: C.gold, transparency: 50 } });

  s.addText("Together, we will build something beautiful for Doha.", {
    x: 0.5, y: 2.9, w: 9, h: 0.45, fontSize: 14, fontFace: "Calibri",
    color: C.cream, align: "center", margin: 0
  });

  s.addText("Any questions? Contact Kevin on WhatsApp anytime.", {
    x: 0.5, y: 3.42, w: 9, h: 0.35, fontSize: 11.5, fontFace: "Calibri",
    color: C.gray, align: "center", margin: 0
  });

  // WhatsApp button
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.9, w: 3.0, h: 0.5, fill: { color: C.gold }, shadow: makeShadow() });
  s.addText("+974 3331 4007 (Uncle Zouzou)", {
    x: 3.5, y: 3.9, w: 3.0, h: 0.5, fontSize: 11, fontFace: "Calibri",
    color: C.dark, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addText("Prepared by Kevin Rizk  ·  March 2026", {
    x: 0.5, y: 5.0, w: 9, h: 0.32, fontSize: 10, fontFace: "Calibri",
    color: C.gray, align: "center", margin: 0
  });
}

// ─────────────────────────────────────────────────
// WRITE FILE
// ─────────────────────────────────────────────────
const outPath = "deliverables/La-Maison-de-Gador-Social-Media-Plan.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✓ Presentation saved to:", outPath);
}).catch((err) => {
  console.error("Error:", err);
});
