# La Maison de Gador — Full Project Design Spec

## Project Overview

**Brand:** La Maison de Gador — Chocolatier
**Market:** Premium chocolate dates, Qatar
**Positioning:** French luxury meets Gulf heritage
**Tagline:** "The Art of Adoration" / "فن التذوق"

A complete digital presence for a premium chocolate date brand targeting the Qatar market. The project encompasses website, e-commerce, social media (Instagram, Facebook, TikTok), branding, and launch strategy.

### Context

- Product is still in development — digital presence comes first
- No hard deadline — quality over speed
- Ultra-lean budget (~$10/month)
- Kevin manages everything (all roles) with AI assistance
- External designer delivers visual assets on demand (logo, packaging, social templates)
- Designer created the brand guideline (9-page PDF) which is the visual source of truth

---

## 1. Agile Structure & Roles

### Roles as Hats

| Traditional Role | Who | Responsibility |
|---|---|---|
| Project Manager | Kevin + AI | Sprint planning, priorities, timeline, tracking |
| Business Analyst | Kevin + AI | Requirements, user stories, acceptance criteria |
| Brand Director | Kevin | Directs all brand decisions, briefs the designer |
| Designer | External designer | Logo SVGs, packaging, social templates, visual assets |
| Frontend Dev | Kevin + AI | Next.js, Tailwind, bilingual UI, responsive design |
| Backend Dev | Kevin + AI | Medusa.js, Dibsy integration, API, deployment |
| QA/Tester | Kevin + AI | Cross-browser, mobile, RTL, checkout flow testing |
| Social Media Manager | Kevin + AI/NotebookLM | Content creation, scheduling, community management |
| Marketing Strategist | Kevin + AI/NotebookLM | Launch plan, influencer outreach, ad strategy |

### Sprint Mechanics

- **Sprint length:** 2 weeks
- **Sprint planning:** Start of each sprint — define scope, primary/secondary focus
- **Daily standup:** Quick self-check — what did I do, what's today, blockers?
- **Sprint review:** End of sprint — demo what's done, screenshot progress
- **Backlog:** GitHub Issues on the La-Maison-de-Gador repo, labeled by workstream (`brand`, `website`, `social`, `marketing`, `devops`)
- **Board:** GitHub Projects kanban — Backlog → In Progress → Review → Done

### AI Assistance Map

| Task Type | AI Tool |
|---|---|
| Market research, competitor analysis | NotebookLM (deep research) |
| Content ideas, captions, hashtags | NotebookLM + Claude |
| Designer briefs | Claude (structured briefs with specs) |
| Code (website, e-commerce) | Claude Code |
| Testing checklists | Claude |
| Social media calendar | Claude + NotebookLM |
| Arabic translations / RTL | Claude |
| SEO, meta tags, OG images | Claude Code |

---

## 2. Tech Stack & Architecture

### Website Stack (Ultra-Lean)

| Layer | Choice | Cost | Rationale |
|---|---|---|---|
| Framework | Next.js 15 (App Router) | Free | SSG/SSR, image optimization, bilingual routing |
| Styling | Tailwind CSS | Free | Fast, matches designer's system, RTL via logical properties |
| E-commerce | Medusa.js 2.x | Free | Open-source, headless, API-first, custom storefront |
| Server | Hetzner VPS (CX22) | ~$5-9/mo | Everything on one box — Next.js + Medusa + Postgres + Redis |
| Database | PostgreSQL (on VPS) | Free | Medusa's default, same Hetzner box |
| Cache | Redis (on VPS) | Free | Medusa sessions/cache, same box |
| Payments | Dibsy | 2.5% + 1 QAR/txn | Qatar-native, QCB compliant, no monthly fee |
| CDN | Cloudflare (free) | Free | DNS, SSL, caching, DDoS protection |
| Email | Zoho Mail (free, 5 users) | Free | Professional @lamaisondegador.com |
| Domain | Cloudflare Registrar | ~$12/yr | At-cost pricing |
| Analytics | Umami (self-hosted on VPS) | Free | Privacy-friendly, no cookie banner |
| Images | Next.js Image + Cloudflare | Free | Auto-optimization, WebP/AVIF |

**Total: ~$9/month + $12/year domain**

### Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                  Cloudflare CDN                  │
│            (DNS, SSL, caching, WAF)              │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Hetzner VPS (CX22)                  │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐              │
│  │  Next.js     │  │  Medusa.js   │              │
│  │  (Port 3000) │──│  (Port 9000) │              │
│  │  SSR/SSG     │  │  Admin API   │              │
│  │  Storefront  │  │  Store API   │              │
│  └─────────────┘  └──────┬───────┘              │
│                          │                       │
│  ┌─────────────┐  ┌──────▼───────┐              │
│  │  Redis       │  │  PostgreSQL  │              │
│  │  (Sessions)  │  │  (Products,  │              │
│  └─────────────┘  │   Orders)    │              │
│                    └──────────────┘              │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐              │
│  │  Nginx       │  │  Umami       │              │
│  │  (Reverse    │  │  (Analytics) │              │
│  │   Proxy)     │  └──────────────┘              │
│  └─────────────┘                                 │
└──────────────────────────────────────────────────┘
                       │
              ┌────────┴────────┐
              │     Dibsy       │
              │  (Payments API) │
              └─────────────────┘
```

### Bilingual Strategy (Arabic/English)

```
app/
├── [locale]/           ← ar / en
│   ├── layout.tsx      ← Sets dir="rtl" for Arabic
│   ├── page.tsx        ← Home
│   ├── about/
│   ├── shop/
│   │   └── [slug]/
│   ├── gifts/
│   ├── custom/
│   └── contact/
├── components/
│   ├── ui/             ← Reusable (buttons, cards)
│   └── sections/       ← Page sections (hero, featured)
├── lib/
│   ├── i18n/           ← next-intl config + dictionaries
│   ├── medusa/         ← Medusa client + hooks
│   └── dibsy/          ← Payment integration
└── messages/
    ├── ar.json         ← Arabic translations
    └── en.json         ← English translations
```

### Brand System

**Fonts (from brand guideline):**
- Handstory — Headlines/display (script font)
- Satoshi — Body text (clean sans-serif)
- Cairo or Tajawal — Arabic body (pairs well with Satoshi)
- Loaded via `next/font/local` for Handstory, Google Fonts for Satoshi + Arabic

**Color Palette (from brand guideline):**

| Color | Hex | Usage |
|---|---|---|
| Chocolate Brown | #8B6914 | Primary brand color |
| Cream/Beige | #F0E6D3 | Light backgrounds |
| Sky Blue | #3AABE0 | Accent |
| Burnt Orange | #E07830 | Accent |
| Dark Chocolate | #3C2415 | Deep contrast, text |
| Warm White | #FAF6F0 | Page background |

**CSS Variables:**
```css
:root {
  --color-brown:       #8B6914;
  --color-cream:       #F0E6D3;
  --color-blue:        #3AABE0;
  --color-orange:      #E07830;
  --color-dark:        #3C2415;
  --color-white:       #FAF6F0;
}
```

**Logo Variants:**
1. Primary — Phoenix/cocoa bean icon + "La Maison de GADOR Chocolatier" (light on dark, dark on light)
2. Icon only — Stylized cocoa bean with diamond center (for avatars, stamps, favicon)
3. Text only — "La Maison de GADOR" in brand font
4. Arabic version — Same layout with Arabic brand name

**Illustration Style:** Hand-drawn botanical engravings (cocoa pods, chocolate bars, nuts, citrus)

### Social Media Tools (All Free)

| Need | Tool |
|---|---|
| Post scheduling | Meta Business Suite (IG + FB) |
| TikTok posting | Manual (no free scheduler) |
| Content calendar | GitHub Issues + labels |
| Design templates | Designer provides + Canva Free for fills |
| Captions/hashtags | Claude + NotebookLM |
| Analytics | Native platform analytics (free) |
| WhatsApp | WhatsApp Business App (free) |

---

## 3. Phase Breakdown

### Methodology: Sequential Phases with Overlap

Each phase has a PRIMARY focus and a SECONDARY track. Primary finishes before moving on, secondary keeps ticking.

### Phase 1 — Brand Foundation (Sprint 1, Weeks 1-2)

**Primary:** Lock down all brand assets with the designer
**Secondary:** Set up social media accounts

| # | Task | Owner | Done When |
|---|---|---|---|
| 1.1 | Brief designer: export logo as SVG (all 4 variants) | Kevin → Designer | SVG files in `assets/logo/` |
| 1.2 | Brief designer: social media templates (profile pic, cover, post, story) | Kevin → Designer | Templates delivered |
| 1.3 | Collect fonts: Handstory files, download Satoshi, pick Arabic font | Kevin | Font files in `assets/fonts/` |
| 1.4 | Finalize color palette — extract exact hex values from designer's files | Kevin + Designer | `brand.md` confirmed |
| 1.5 | Create Instagram business account @lamaisondegador | Kevin | Account live |
| 1.6 | Create Facebook business page | Kevin | Page live, linked to IG |
| 1.7 | Create TikTok account | Kevin | Account live |
| 1.8 | Register domain (lamaisondegador.com) | Kevin | Domain on Cloudflare |
| 1.9 | Set up GitHub repo with project structure | Kevin + AI | Repo initialized |

**Deliverable:** All brand assets collected, all social accounts live with "coming soon" content, domain secured.

### Phase 2 — Social Media Engine (Sprints 2-3, Weeks 3-6)

**Primary:** Build content pipeline, first posts live
**Secondary:** Scaffold website skeleton

| # | Task | Owner | Done When |
|---|---|---|---|
| 2.1 | Create 30-day content calendar | Kevin + AI | Calendar in repo |
| 2.2 | Brief designer: first 10 post visuals | Kevin → Designer | Images delivered |
| 2.3 | Write bilingual captions for first 2 weeks (AR + EN) | Kevin + AI | Captions done |
| 2.4 | Research 20 Qatar food/lifestyle micro-influencers | Kevin + AI/NotebookLM | Spreadsheet ready |
| 2.5 | Set up Meta Business Suite for scheduling | Kevin | First week scheduled |
| 2.6 | Post first content — brand reveal | Kevin | Live on IG/FB/TikTok |
| 2.7 | Set up WhatsApp Business | Kevin | WhatsApp ready |
| 2.8 | Scaffold Next.js + Tailwind project | Kevin + AI | Skeleton on VPS |
| 2.9 | Set up Medusa.js backend on VPS | Kevin + AI | Admin panel accessible |

**Deliverable:** Social media posting 3-5x/week, website skeleton deployed.

### Phase 3 — Website Build (Sprints 4-6, Weeks 7-12)

**Primary:** Full website development
**Secondary:** Social media on autopilot (scheduled posts)

| # | Task | Owner | Done When |
|---|---|---|---|
| 3.1 | Homepage — hero, featured products, story teaser, IG embed | Kevin + AI | Page live |
| 3.2 | About / Notre Histoire — brand story, craftsmanship | Kevin + AI | Page live |
| 3.3 | Shop / Boutique — product catalog grid with filters | Kevin + AI | Connected to Medusa |
| 3.4 | Product detail page — images, ingredients, tags | Kevin + AI | Template working |
| 3.5 | Gift boxes / Coffrets Cadeaux — curated collections | Kevin + AI | Page live |
| 3.6 | Custom Orders / Sur Mesure — form + WhatsApp link | Kevin + AI | Form submits |
| 3.7 | Corporate Gifts — B2B, bulk inquiry form | Kevin + AI | Page live |
| 3.8 | Contact page — WhatsApp, phone, email, location | Kevin + AI | Page live |
| 3.9 | Bilingual system (next-intl) — full AR/EN with RTL | Kevin + AI | Both languages work |
| 3.10 | Responsive design — mobile-first, all breakpoints | Kevin + AI | Passes mobile audit |
| 3.11 | Brief designer: hero images, lifestyle photos, mockups | Kevin → Designer | Images delivered |
| 3.12 | Schedule 4 weeks of social posts | Kevin + AI | Posts queued |

**Deliverable:** Full website live (without payments), all pages bilingual, mobile-ready.

### Phase 4 — E-Commerce & Integration (Sprints 7-8, Weeks 13-16)

**Primary:** Payments, checkout, product catalog
**Secondary:** Ramp social media, start influencer outreach

| # | Task | Owner | Done When |
|---|---|---|---|
| 4.1 | Register with Dibsy (business account) | Kevin | Account approved |
| 4.2 | Integrate Dibsy payment API | Kevin + AI | Test payment works |
| 4.3 | Build checkout flow (cart → shipping → payment → confirmation) | Kevin + AI | End-to-end working |
| 4.4 | Add real products to Medusa catalog | Kevin | Products in shop |
| 4.5 | Order confirmation email (Zoho) | Kevin + AI | Emails sending |
| 4.6 | WhatsApp order notification | Kevin + AI | Notifications working |
| 4.7 | Floating WhatsApp button on all pages | Kevin + AI | Button visible |
| 4.8 | SEO — meta tags, OG images, sitemap, robots.txt | Kevin + AI | Passes SEO audit |
| 4.9 | Send first influencer outreach DMs (10-15) | Kevin | DMs sent |
| 4.10 | Brief designer: packaging mockups for social content | Kevin → Designer | Mockups delivered |

**Deliverable:** Full e-commerce working, payments live, influencer pipeline started.

### Phase 5 — Testing & Polish (Sprint 9, Weeks 17-18)

| # | Task | Owner | Done When |
|---|---|---|---|
| 5.1 | Cross-browser testing (Chrome, Safari, Firefox, Samsung Internet) | Kevin + AI | All pass |
| 5.2 | Mobile testing (iOS Safari, Android Chrome) | Kevin | All pass |
| 5.3 | RTL/Arabic full review — every page | Kevin | No layout breaks |
| 5.4 | Performance audit (Lighthouse, target >90) | Kevin + AI | Scores >90 |
| 5.5 | Full checkout test with Dibsy sandbox | Kevin | Order completes |
| 5.6 | Accessibility basics (alt text, contrast, keyboard nav) | Kevin + AI | Passes basic a11y |
| 5.7 | Pre-launch teaser campaign on social | Kevin | Posts live |
| 5.8 | Backup strategy for VPS (automated snapshots) | Kevin + AI | Backups running |

**Deliverable:** Everything tested, polished, launch-ready.

### Phase 6 — Launch (Sprint 10, Week 19)

| # | Task | Owner | Done When |
|---|---|---|---|
| 6.1 | Coordinated launch day announcement | Kevin | Announced |
| 6.2 | Influencer posts go live (coordinated) | Kevin + Influencers | Posts visible |
| 6.3 | IG/FB/TikTok launch content (Reel + Carousel) | Kevin | Posted |
| 6.4 | WhatsApp broadcast to pre-launch signups | Kevin | Sent |
| 6.5 | Boost launch post ($20-50) | Kevin | Ad running |
| 6.6 | Monitor orders, fix issues | Kevin | First orders processed |

**Deliverable:** Brand launched, first orders coming in.

### Timeline Summary

```
Week  1-2   ░░ Phase 1: Brand Foundation
Week  3-6   ░░░░ Phase 2: Social Media Engine
Week  7-12  ░░░░░░ Phase 3: Website Build
Week 13-16  ░░░░ Phase 4: E-Commerce
Week 17-18  ░░ Phase 5: Testing
Week 19     ░ Phase 6: Launch
```

~19 weeks / ~5 months at comfortable pace. Compressible or stretchable.

---

## 4. NotebookLM Research Strategy

### Notebooks

| Notebook | Sources | Purpose |
|---|---|---|
| Gador — Brand & Market | Brand guideline PDF, strategy doc, competitor websites (Qinwan, Bateel, Forrey & Galland), Qatar luxury market articles | Market intelligence, competitor tracking, content inspiration |
| Gador — Social Media Playbook | Top food brand IG accounts, TikTok food trends, Gulf influencer landscape, Ramadan marketing guides | Caption ideas, hashtag research, content strategy |
| Gador — Tech & E-Commerce | Medusa.js docs, Dibsy API docs, next-intl docs, Hetzner deployment guides | Quick reference during development |

### Usage Pattern

- Before each sprint → query relevant notebook for latest insights
- Content creation → generate caption ideas based on brand voice
- Designer briefs → query brand notebook for consistency checks
- Competitor moves → add new sources, re-query
- Designer support → research visual trends, packaging inspiration, share with designer

---

## 5. Designer Collaboration Workflow

### Flow

```
Kevin                          Designer                    Repo
  │                               │                         │
  ├── Creates brief (markdown) ──►│                         │
  │   with specs, references,     │                         │
  │   dimensions, format          │                         │
  │                               │                         │
  │◄── Delivers assets ───────────┤                         │
  │    (SVG, PNG, Figma link)     │                         │
  │                               │                         │
  ├── Reviews, requests tweaks ──►│                         │
  │                               │                         │
  │◄── Final assets ──────────────┤                         │
  │                                                         │
  ├── Commits to repo ─────────────────────────────────────►│
  │   assets/logo/                                          │
  │   assets/fonts/                                         │
  │   assets/social-templates/                              │
  │   assets/photography/                                   │
```

### Brief Template

```markdown
## Brief: [Asset Name]
**Date:** YYYY-MM-DD
**Priority:** High / Medium / Low
**Needed by:** [Sprint date]

### What I Need
[Description of the deliverable]

### Specs
- Dimensions: [e.g., 1080x1080 for IG post]
- Format: [SVG / PNG @2x / Figma]
- Color: Must use brand palette (brown #8B6914, cream #F0E6D3, etc.)
- Font: Handstory for headlines, Satoshi for body

### References
[Screenshots, competitor examples, mood images]

### How It Will Be Used
[Website hero? Instagram post? Packaging?]
```

---

## 6. Repo Structure

```
D:\Projects\La-Maison-de-Gador\
├── assets/
│   ├── logo/              ← SVGs from designer
│   ├── fonts/             ← Handstory, Satoshi, Arabic font
│   ├── social-templates/  ← IG/FB/TikTok templates
│   ├── photography/       ← Product/lifestyle photos
│   └── illustrations/     ← Hand-drawn botanical elements
├── website/
│   ├── app/               ← Next.js App Router
│   ├── components/
│   ├── lib/
│   ├── messages/          ← ar.json, en.json
│   ├── public/
│   └── package.json
├── medusa/
│   ├── src/               ← Medusa.js backend
│   └── package.json
├── content/
│   ├── calendar/          ← Monthly content calendars
│   ├── captions/          ← Pre-written captions (AR + EN)
│   └── briefs/            ← Designer briefs
├── docs/
│   ├── plans/             ← Strategy doc, sprint plans
│   ├── brand/             ← Brand guideline PDF, color specs
│   └── superpowers/specs/ ← Design specs
├── scripts/
│   └── deploy.sh          ← VPS deployment script
└── README.md
```

---

## 7. Website Pages

### Pages

| Page | Route (EN) | Route (AR) | Key Sections |
|---|---|---|---|
| Home | `/en` | `/ar` | Hero, featured products, story teaser, IG embed, WhatsApp CTA |
| About | `/en/about` | `/ar/about` | Brand story, cocoa bean symbol meaning, craftsmanship, photo gallery |
| Shop | `/en/shop` | `/ar/shop` | Product catalog grid, filters (type, price, occasion) |
| Product Detail | `/en/shop/[slug]` | `/ar/shop/[slug]` | Images, ingredients, "perfect for" tags, add to cart, WhatsApp order |
| Gift Boxes | `/en/gifts` | `/ar/gifts` | Curated collections: Ramadan, Eid, Wedding, Corporate |
| Custom Orders | `/en/custom` | `/ar/custom` | Request form, corporate branding options, WhatsApp link |
| Corporate | `/en/corporate` | `/ar/corporate` | B2B page, bulk inquiry form, custom branding mockups |
| Contact | `/en/contact` | `/ar/contact` | WhatsApp, phone, email, location, Instagram link |
| Cart | `/en/cart` | `/ar/cart` | Cart items, quantity, subtotal |
| Checkout | `/en/checkout` | `/ar/checkout` | Shipping → Payment (Dibsy) → Confirmation |

### Design Direction

- Dark/warm backgrounds for product sections (makes gold packaging pop)
- Cream/warm white for text-heavy sections
- Handstory (script) for hero headlines, Satoshi for body
- Hand-drawn botanical illustrations as decorative elements
- Mobile-first, generous white space, gold/brown accents
- Floating WhatsApp button on every page
- Language toggle (AR/EN) in header

---

## 8. Social Media Strategy Summary

### Platforms

| Platform | Handle | Role |
|---|---|---|
| Instagram | @lamaisondegador | Primary — visual luxury, Reels, Stories, Shopping |
| Facebook | La Maison de Gador | Secondary — cross-posted via Meta Business Suite |
| TikTok | @lamaisondegador | Growth — short-form food content |
| WhatsApp | Business number | Direct sales and customer service |

### Content Pillars

1. Product Showcase (35%) — dates, boxes, fillings
2. Behind the Scenes (20%) — production, stuffing, packaging
3. Lifestyle/Gifting (20%) — elegant settings, gift moments
4. Culture/Heritage (15%) — calligraphy, Gulf traditions, date farming
5. Engagement (10%) — polls, questions, giveaways

### Posting Frequency

| Type | Frequency |
|---|---|
| Feed posts | 4-5x/week |
| Reels | 3x/week |
| Stories | Daily (5-7) |
| Carousels | 1-2x/week |

### Hashtag Strategy

**Brand:** #LaMaisonDeGador #TheArtOfAdoration #فن_التذوق
**Category:** #PremiumDates #LuxuryDates #StuffedDates #ChocolateDates #QatarFood #DohaFood
**Arabic:** #تمور_فاخرة #تمور_محشية #هدايا_رمضان

---

## 9. Budget Summary

### Monthly Fixed

| Item | Cost |
|---|---|
| Hetzner VPS (CX22) | ~$9/mo |
| Domain (.com) | ~$1/mo ($12/yr) |
| Dibsy (per transaction) | 2.5% + 1 QAR |
| Everything else | $0 |
| **Total fixed** | **~$10/month** |

### Monthly Variable

| Item | Cost |
|---|---|
| Ad budget (boosting) | $150-300/mo (when ready) |
| Influencer gifting | $50-200/mo (product cost) |
| **Total variable** | **~$200-500/mo** |

---

*Design approved by Kevin on 2026-03-23. Ready for implementation planning.*
