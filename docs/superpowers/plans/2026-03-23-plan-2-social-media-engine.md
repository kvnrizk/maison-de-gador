# Plan 2: Social Media Engine

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the content pipeline, create the first 30 days of social media content, launch brand presence on Instagram/Facebook/TikTok, research influencers, and scaffold the website project in the background.

**Architecture:** Content-driven plan — no major code. Uses NotebookLM for research, AI for caption generation, designer for visuals. Website scaffolding runs as secondary track.

**Tech Stack:** Meta Business Suite, Canva Free, NotebookLM, WhatsApp Business

**Spec:** `docs/superpowers/specs/2026-03-23-la-maison-de-gador-design.md` (Phase 2)
**Depends on:** Plan 1 completed (accounts created, brand assets collected)

---

## File Structure

```
content/
├── calendar/
│   └── month-01.md            ← 30-day content calendar
├── captions/
│   ├── week-01-en.md          ← English captions
│   ├── week-01-ar.md          ← Arabic captions
│   ├── week-02-en.md
│   └── week-02-ar.md
├── briefs/
│   ├── 002-social-templates.md ← Designer brief: post/story templates
│   └── 003-first-10-posts.md   ← Designer brief: first 10 post visuals
└── research/
    └── influencers.md          ← Qatar micro-influencer list
```

---

### Task 1: Create 30-Day Content Calendar

**Files:**
- Create: `content/calendar/month-01.md`

- [ ] **Step 1: Query NotebookLM for content inspiration**

Query the Social Media Playbook notebook:
"Generate a 30-day content calendar for a premium chocolate date brand launching in Qatar. Mix of Reels, carousels, feed posts, and Stories. Focus on brand reveal, product showcase, behind-the-scenes, and engagement."

- [ ] **Step 2: Write the calendar**

Create `content/calendar/month-01.md`:

```markdown
# Month 1 Content Calendar — La Maison de Gador

## Week 1: Brand Introduction

| Day | Platform | Type | Content | Pillar |
|-----|----------|------|---------|--------|
| 1 | IG+FB+TT | Reel | Brand reveal — logo animation + product teaser (15 sec) | Showcase |
| 2 | IG | Stories (5) | "Coming soon to Doha" countdown | Engagement |
| 3 | IG+FB | Carousel (5 slides) | "Meet La Maison de Gador" — brand story, philosophy, products preview | Heritage |
| 4 | IG+TT | Reel | Close-up macro: date being stuffed with pistachio cream (ASMR) | Showcase |
| 5 | IG+FB | Feed Post | Hero product shot — signature chocolate date on dark marble | Showcase |
| 6 | IG | Stories | Poll: "Pistachio or Almond? Which filling?" | Engagement |
| 7 | IG+TT | Reel | Behind the scenes — hands arranging dates in gift box | BTS |

## Week 2: Product Focus

| Day | Platform | Type | Content | Pillar |
|-----|----------|------|---------|--------|
| 8 | IG+FB | Carousel (5 slides) | "Our Collections" — showcase gift box sizes | Showcase |
| 9 | IG+TT | Reel | Chocolate drizzle over dates (satisfying food content) | Showcase |
| 10 | IG+FB | Feed Post | Single date on gold plate, dramatic lighting | Showcase |
| 11 | IG | Stories (5) | "Did you know?" — fun date facts | Heritage |
| 12 | IG+TT | Reel | Unboxing video — opening a luxury gift box | Lifestyle |
| 13 | IG+FB | Feed Post | Flat lay of all date varieties with labels | Showcase |
| 14 | IG+FB | Carousel (5 slides) | "The Art of Filling" — step-by-step stuffing process | BTS |

## Week 3: Lifestyle & Gifting

| Day | Platform | Type | Content | Pillar |
|-----|----------|------|---------|--------|
| 15 | IG+TT | Reel | Dates served with Arabic coffee in elegant majlis | Lifestyle |
| 16 | IG+FB | Feed Post | Gift box on marble table with flowers and gold accents | Lifestyle |
| 17 | IG | Stories | Customer testimonial / first order celebration | Engagement |
| 18 | IG+FB | Carousel | "Perfect Gifts For Every Occasion" — Ramadan, Eid, Corporate, Wedding | Lifestyle |
| 19 | IG+TT | Reel | Packaging process — ribbon tying, box closing, gold seal | BTS |
| 20 | IG+FB | Feed Post | Close-up date cross-section showing layers of filling | Showcase |
| 21 | IG | Stories | Q&A: "Ask us anything about our dates" | Engagement |

## Week 4: Community & Growth

| Day | Platform | Type | Content | Pillar |
|-----|----------|------|---------|--------|
| 22 | IG+TT | Reel | "A day in our kitchen" — full production montage | BTS |
| 23 | IG+FB | Feed Post | Corporate gift box mockup with branded sleeve | Showcase |
| 24 | IG+FB | Carousel | "Why Premium Dates?" — quality, sourcing, craftsmanship | Heritage |
| 25 | IG+TT | Reel | Influencer unboxing (first collab) | Lifestyle |
| 26 | IG+FB | Feed Post | Dates arranged in cocoa bean shape (brand symbol) | Showcase |
| 27 | IG | Stories | Giveaway announcement: "Win a luxury gift box" | Engagement |
| 28 | IG+TT | Reel | Customer delivery moment — joy of receiving box | Lifestyle |
| 29 | IG+FB | Feed Post | "Thank you for an amazing first month" | Engagement |
| 30 | IG+FB | Carousel | "Coming next month..." — tease new flavors/collections | Showcase |

## Caption Style Guide

- **Language:** Arabic first, English below (or separate posts)
- **Tone:** Warm, elegant, inviting. NOT salesy.
- **Structure:** Hook line → 2-3 story/info lines → CTA → hashtags
- **CTAs:** "Order via link in bio", "DM us for custom orders", "Tag someone who deserves this"
```

- [ ] **Step 3: Commit**

```bash
git add content/calendar/month-01.md
git commit -m "Add 30-day content calendar"
```

---

### Task 2: Write Bilingual Captions (First 2 Weeks)

**Files:**
- Create: `content/captions/week-01-en.md`, `content/captions/week-01-ar.md`
- Create: `content/captions/week-02-en.md`, `content/captions/week-02-ar.md`

- [ ] **Step 1: Generate English captions with AI**

Use Claude to write captions for days 1-14 following the calendar and caption style guide. Each caption should include:
- Hook line
- 2-3 body lines
- CTA
- 15-20 hashtags (mix of brand + category + Arabic)

- [ ] **Step 2: Generate Arabic captions**

Use Claude to translate and culturally adapt each caption to Arabic. Arabic captions should feel natural, not translated. Use Gulf Arabic expressions where appropriate.

- [ ] **Step 3: Write caption files**

Create `content/captions/week-01-en.md` with format:

```markdown
# Week 1 Captions — English

## Day 1: Brand Reveal Reel

The Art of Adoration begins. ✨

La Maison de Gador — premium chocolate dates, handcrafted in Doha.

Every date tells a story. Every box is a gift of love.

Coming soon. 🍫

#LaMaisonDeGador #TheArtOfAdoration #PremiumDates #ChocolateDates #DohaFood #QatarFood #LuxuryDates #StuffedDates #GulfLuxury #QatarLuxury #تمور_فاخرة #شوكولا #الدوحة #قطر #فن_التذوق

---

## Day 3: Meet the Brand Carousel

[Slide 1] La Maison de Gador

[Slide 2] Born from a passion for craft...
...
```

Repeat for week-01-ar.md, week-02-en.md, week-02-ar.md.

- [ ] **Step 4: Commit**

```bash
git add content/captions/
git commit -m "Add bilingual captions for first 2 weeks"
```

---

### Task 3: Brief Designer for Social Media Assets

**Files:**
- Create: `content/briefs/002-social-templates.md`
- Create: `content/briefs/003-first-10-posts.md`

- [ ] **Step 1: Create social template brief**

```markdown
## Brief: Social Media Templates

**Date:** [today]
**Priority:** High
**Needed by:** End of sprint 2

### What I Need
Reusable templates for Instagram/Facebook/TikTok in Canva or Figma.

### Templates Needed
1. **IG Feed Post** (1080x1080) — product showcase on dark bg
2. **IG Feed Post** (1080x1080) — quote/text on cream bg
3. **IG Carousel Slide** (1080x1080) — info slide with headline + body
4. **IG Story** (1080x1920) — announcement/poll template
5. **IG Story** (1080x1920) — product highlight template
6. **FB Cover** (820x312) — brand cover image
7. **TikTok thumbnail** (1080x1920) — video cover template

### Specs
- Use brand colors: brown #8B6914, cream #F0E6D3, accents as needed
- Font: Handstory for headlines, Satoshi for body
- Include botanical illustration elements from brand guideline
- Leave placeholder areas for product photos
- Include brand watermark/logo in corner

### Deliverable Format
Canva shared templates (editable) OR Figma file with components
```

- [ ] **Step 2: Create first 10 posts brief**

```markdown
## Brief: First 10 Post Visuals

**Date:** [today]
**Priority:** High
**Needed by:** 1 week before first post date

### What I Need
10 ready-to-post images for the first 2 weeks of content.

### Post List

1. Day 1 — Brand reveal still frame (for Reel thumbnail)
2. Day 3 — 5 carousel slides "Meet La Maison de Gador"
3. Day 5 — Hero product shot on dark marble
4. Day 8 — 5 carousel slides "Our Collections"
5. Day 10 — Single date on gold plate
6. Day 13 — Flat lay of date varieties
7. Day 14 — 5 carousel slides "The Art of Filling"
8. Day 16 — Gift box styled shot
9. Day 20 — Date cross-section close-up
10. Day 23 — Corporate gift box mockup

### Notes
- If real product photos not available yet, use styled mockups
- Follow photography style guide: dark bg, warm lighting, macro shots
- All images at 1080x1080 (IG feed) + 1080x1350 (portrait alt)
```

- [ ] **Step 3: Send briefs to designer**

- [ ] **Step 4: Commit**

```bash
git add content/briefs/
git commit -m "Add designer briefs for social templates and first posts"
```

---

### Task 4: Set Up Meta Business Suite + Scheduling

- [ ] **Step 1: Link accounts in Meta Business Suite**

Manual:
1. Go to business.facebook.com
2. Add the Facebook page
3. Connect Instagram account
4. Verify both are linked

- [ ] **Step 2: Schedule first week of posts**

Using Meta Business Suite Content Planner:
1. Upload Day 1 Reel (when designer delivers)
2. Upload Day 3 Carousel
3. Upload Day 5 Feed Post
4. Set posting times: 7-8 PM Qatar time (peak engagement for Gulf food content)
5. Add captions from `content/captions/week-01-en.md`

- [ ] **Step 3: Verify scheduling**

Check Meta Business Suite → Content → Scheduled to confirm all posts queued.

---

### Task 5: Research Qatar Micro-Influencers

**Files:**
- Create: `content/research/influencers.md`

- [ ] **Step 1: Query NotebookLM**

Query Social Media Playbook notebook:
"List the top 20 food and lifestyle micro-influencers in Qatar/Doha with 1K-50K followers on Instagram. Include handle, follower count, content type, and engagement rate if available."

- [ ] **Step 2: Manual Instagram research**

Search Instagram for:
- #DohaFood, #QatarFood, #QatarFoodie
- #DohaLife, #QatarLifestyle
- Accounts that follow Qinwan, Bateel
- Look for accounts with 1K-50K followers, food/lifestyle content, high engagement

- [ ] **Step 3: Create influencer list**

```markdown
# Qatar Micro-Influencer Target List

## Tier 1: Food-Focused (Priority)

| Handle | Followers | Type | Engagement | Notes |
|--------|-----------|------|------------|-------|
| @example1 | 15K | Food reviews | High | Posts in Arabic, Doha-based |
| ... | ... | ... | ... | ... |

## Tier 2: Lifestyle/Luxury

| Handle | Followers | Type | Engagement | Notes |
|--------|-----------|------|------------|-------|
| ... | ... | ... | ... | ... |

## Outreach Template

Subject: Collaboration with La Maison de Gador

Hi [Name]! 👋

We're La Maison de Gador — a new premium chocolate date brand launching in Doha.

We love your content and think your audience would appreciate our artisanal chocolate dates.

Would you be interested in receiving a complimentary gift box in exchange for an honest review/post?

Looking forward to connecting!
— La Maison de Gador
```

- [ ] **Step 4: Commit**

```bash
git add content/research/influencers.md
git commit -m "Add influencer research and outreach template"
```

---

### Task 6: Post First Content — Brand Reveal

- [ ] **Step 1: Prepare assets**

Ensure designer has delivered:
- Brand reveal image/video for Reel
- Profile-ready logo icon
- First post visuals

- [ ] **Step 2: Post brand reveal**

Post Day 1 content simultaneously on:
1. Instagram (Reel)
2. Facebook (shared from IG via Meta Business Suite)
3. TikTok (upload manually)

Caption from `content/captions/week-01-en.md` Day 1

- [ ] **Step 3: Post "Coming Soon" stories**

Instagram Stories (Day 2):
- 5 teaser stories with countdown
- Use Story template from designer

- [ ] **Step 4: Monitor and engage**

For the first 24 hours:
- Reply to every comment within 2 hours
- Follow back relevant accounts
- Like/comment on posts from target influencers
- Share any reposts to Stories

---

### Task 7: Scaffold Website Project (Secondary Track)

**Files:**
- Create: `website/` Next.js project
- Create: `medusa/` Medusa project
- Create: `docker/docker-compose.yml`

This is the secondary track — just scaffolding, not building pages yet.

- [ ] **Step 1: Initialize Next.js storefront**

```bash
cd D:/Projects/La-Maison-de-Gador
npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

- [ ] **Step 2: Install Medusa.js**

```bash
npx create-medusa-app@latest medusa --skip-db --skip-client
```

This creates the `medusa/` directory. Plan 3 will configure it fully with Docker.

- [ ] **Step 3: Create Docker Compose file**

Create `docker/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: medusa
      POSTGRES_PASSWORD: medusa_password
      POSTGRES_DB: medusa_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  medusa:
    build:
      context: ../medusa
      dockerfile: Dockerfile
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgres://medusa:medusa_password@postgres:5432/medusa_db
      REDIS_URL: redis://redis:6379
    ports:
      - "9000:9000"

  storefront:
    build:
      context: ../website
      dockerfile: Dockerfile
    depends_on:
      - medusa
    environment:
      MEDUSA_BACKEND_URL: http://medusa:9000
    ports:
      - "3000:3000"

  nginx:
    image: nginx:alpine
    depends_on:
      - storefront
      - medusa
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf

volumes:
  postgres_data:
```

- [ ] **Step 4: Commit scaffolding**

```bash
git add website/ medusa/ docker/
git commit -m "Scaffold website, medusa backend, and docker compose"
```

---

## Plan 2 Completion Criteria

- [ ] 30-day content calendar written and committed
- [ ] Bilingual captions for first 2 weeks (EN + AR)
- [ ] Designer briefs sent for social templates and first 10 posts
- [ ] Meta Business Suite configured and first week scheduled
- [ ] 20 micro-influencers researched with outreach template
- [ ] First post live on IG/FB/TikTok (brand reveal)
- [ ] WhatsApp Business active and responding
- [ ] Website + Medusa + Docker scaffolded (not built yet)
