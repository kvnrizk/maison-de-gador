// Generate La Maison de Gador — Brand Discovery Brief (.docx)
// Combines Part A (uncle questionnaire) + Part B (market research)
// Run: node docs/generate_moodboard_brief.js

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageBreak, LevelFormat,
} = require("docx");

// Brand palette
const TEAL = "1B4D4D";
const GOLD = "C9A84E";
const BURGUNDY = "6B1022";
const CREAM = "F5F0E8";
const DARK = "0F2E2E";
const WHITE = "FFFFFF";
const WARM_GRAY = "5C564F";

const MD_PART_A = fs.readFileSync(path.join(__dirname, "moodboard-brief-part-a-uncle-questionnaire.md"), "utf8");
const MD_PART_B = fs.readFileSync(path.join(__dirname, "moodboard-brief-part-b-market-research.md"), "utf8");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: opts.font || "Calibri",
    size: opts.size || 22,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || DARK,
  });
}

function heading(text, level = HeadingLevel.HEADING_1, color = TEAL) {
  const sizeMap = {
    [HeadingLevel.HEADING_1]: 40,
    [HeadingLevel.HEADING_2]: 32,
    [HeadingLevel.HEADING_3]: 26,
    [HeadingLevel.HEADING_4]: 22,
  };
  return new Paragraph({
    heading: level,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({
      text,
      font: "Georgia",
      size: sizeMap[level] || 28,
      bold: true,
      color,
    })],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80, line: 320 },
    alignment: opts.align || AlignmentType.LEFT,
    children: text instanceof Array ? text : [run(text, opts)],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { before: 40, after: 40, line: 300 },
    children: parseInline(text),
  });
}

function parseInline(line) {
  // Parse **bold**, *italic*, inline — keep simple
  const runs = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) runs.push(run(line.slice(last, m.index)));
    const t = m[0];
    if (t.startsWith("**")) runs.push(run(t.slice(2, -2), { bold: true }));
    else if (t.startsWith("*")) runs.push(run(t.slice(1, -1), { italics: true }));
    else if (t.startsWith("`")) runs.push(run(t.slice(1, -1), { font: "Consolas", size: 20 }));
    last = m.index + t.length;
  }
  if (last < line.length) runs.push(run(line.slice(last)));
  return runs.length ? runs : [run(line)];
}

function divider() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      bottom: { color: GOLD, style: BorderStyle.SINGLE, size: 6, space: 1 },
    },
    children: [new TextRun({ text: "" })],
  });
}

function tableCell(text, opts = {}) {
  return new TableCell({
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "D6D0C4" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "D6D0C4" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "D6D0C4" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "D6D0C4" },
    },
    shading: opts.header ? { fill: TEAL, type: ShadingType.CLEAR } : { fill: WHITE, type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: String(text),
        font: "Calibri",
        size: 20,
        bold: !!opts.header,
        color: opts.header ? WHITE : DARK,
      })],
    })],
  });
}

// -----------------------------------------------------------------------------
// Markdown → docx line-by-line (minimal)
// -----------------------------------------------------------------------------

function mdToBlocks(md) {
  const lines = md.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip Part A/B title headers — we generate our own
    if (/^# /.test(line) && i < 3) { i++; continue; }

    // Blank line
    if (/^\s*$/.test(line)) { i++; continue; }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      blocks.push(divider());
      i++;
      continue;
    }

    // Heading levels
    if (/^####\s+/.test(line)) {
      blocks.push(heading(line.replace(/^####\s+/, ""), HeadingLevel.HEADING_4, WARM_GRAY));
      i++; continue;
    }
    if (/^###\s+/.test(line)) {
      blocks.push(heading(line.replace(/^###\s+/, ""), HeadingLevel.HEADING_3, BURGUNDY));
      i++; continue;
    }
    if (/^##\s+/.test(line)) {
      blocks.push(heading(line.replace(/^##\s+/, ""), HeadingLevel.HEADING_2, TEAL));
      i++; continue;
    }
    if (/^#\s+/.test(line)) {
      blocks.push(heading(line.replace(/^#\s+/, ""), HeadingLevel.HEADING_1, TEAL));
      i++; continue;
    }

    // Table (header line followed by --- separator)
    if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|[\s:\-|]+\|\s*$/.test(lines[i + 1])) {
      const headerCells = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      const tbl = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({ children: headerCells.map((c) => tableCell(c, { header: true, align: AlignmentType.CENTER })) }),
          ...rows.map((r) => new TableRow({ children: r.map((c, idx) => tableCell(c, { align: idx === 0 ? AlignmentType.LEFT : AlignmentType.LEFT })) })),
        ],
      });
      blocks.push(tbl);
      blocks.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "" })] }));
      continue;
    }

    // Nested bullet with 4+ space indent
    if (/^\s{2,}[-*]\s+/.test(line)) {
      const content = line.replace(/^\s+[-*]\s+/, "");
      blocks.push(bullet(content, 1));
      i++; continue;
    }

    // Top-level bullet
    if (/^[-*]\s+/.test(line)) {
      const content = line.replace(/^[-*]\s+/, "");
      blocks.push(bullet(content, 0));
      i++; continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line)) {
      const content = line.replace(/^\d+\.\s+/, "");
      blocks.push(new Paragraph({
        numbering: { reference: "numbered-list", level: 0 },
        spacing: { before: 40, after: 40, line: 300 },
        children: parseInline(content),
      }));
      i++; continue;
    }

    // Italic block (single-line leading/trailing *)
    if (/^\*[^*].*\*\s*$/.test(line)) {
      blocks.push(para(line.replace(/^\*|\*$/g, ""), { italics: true, color: WARM_GRAY }));
      i++; continue;
    }

    // Plain paragraph
    blocks.push(new Paragraph({
      spacing: { before: 80, after: 80, line: 320 },
      children: parseInline(line),
    }));
    i++;
  }
  return blocks;
}

// -----------------------------------------------------------------------------
// Cover
// -----------------------------------------------------------------------------

function cover() {
  return [
    new Paragraph({ spacing: { before: 1800 }, children: [new TextRun({ text: "" })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text: "LA MAISON DE GADOR",
        font: "Georgia", size: 56, bold: true, color: TEAL,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 100 },
      children: [new TextRun({
        text: "The Art of Adoration",
        font: "Georgia", size: 28, italics: true, color: GOLD,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600 },
      border: { top: { color: GOLD, style: BorderStyle.SINGLE, size: 6, space: 12 } },
      children: [new TextRun({ text: "" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
      children: [new TextRun({
        text: "Brand Discovery Brief",
        font: "Georgia", size: 40, color: DARK,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120 },
      children: [new TextRun({
        text: "Questions for the Founder  ·  Market Research  ·  Moodboard Foundation",
        font: "Calibri", size: 22, color: WARM_GRAY, italics: true,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1800 },
      children: [new TextRun({
        text: "Prepared by Kevin Rizk  ·  April 2026",
        font: "Calibri", size: 20, color: WARM_GRAY,
      })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// -----------------------------------------------------------------------------
// Introduction
// -----------------------------------------------------------------------------

function intro() {
  return [
    heading("Introduction", HeadingLevel.HEADING_1, TEAL),
    para("Before building the visual moodboard for La Maison de Gador, we need to align on three things:"),
    bullet("Who we are selling to — the target clientele."),
    bullet("What we are selling — the product, in enough depth to feel it and translate it visually."),
    bullet("Where we stand — the regional and international competitive landscape."),
    para(""),
    para("This document is split into two parts. Part A is a questionnaire for you to answer — only you can answer these. Part B is the market research, synthesised from 68 sources covering the GCC premium chocolate-dates market, international luxury chocolate references, clientele archetypes for Qatar 2026, and current visual direction for the category."),
    para(""),
    para("Once I have your answers to Part A, combined with Part B, I can start the moodboard with confidence that it reflects your vision and not a generic luxury aesthetic."),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// -----------------------------------------------------------------------------
// Compose
// -----------------------------------------------------------------------------

const children = [
  ...cover(),
  ...intro(),
  heading("Part A — Questions for the Founder", HeadingLevel.HEADING_1, TEAL),
  para("Please answer in writing (voice note transcribed is fine). The more concrete and personal the answers, the stronger the brand will be.", { italics: true, color: WARM_GRAY }),
  ...mdToBlocks(MD_PART_A),
  new Paragraph({ children: [new PageBreak()] }),
  heading("Part B — Market Research", HeadingLevel.HEADING_1, TEAL),
  para("Synthesised from 68 sources via NotebookLM deep research, April 2026.", { italics: true, color: WARM_GRAY }),
  ...mdToBlocks(MD_PART_B),
];

const doc = new Document({
  creator: "Kevin Rizk",
  title: "La Maison de Gador — Brand Discovery Brief",
  description: "Questions for founder + market research, foundation for moodboard.",
  numbering: {
    config: [{
      reference: "numbered-list",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL,
        text: "%1.", alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22, color: DARK } },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1000, right: 1100, bottom: 1000, left: 1100 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  const out = path.join(__dirname, "La_Maison_de_Gador_Brand_Discovery_Brief.docx");
  fs.writeFileSync(out, buffer);
  console.log(`Generated: ${out}`);
  console.log(`Size: ${(buffer.length / 1024).toFixed(1)} KB`);
});
