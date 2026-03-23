# Plan 5: Testing, Polish & Launch

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** QA the entire website across browsers/devices/languages, optimize performance, set up VPS backups, run pre-launch social campaign, and execute coordinated launch day.

**Architecture:** Testing checklist-driven approach. Lighthouse for performance. Manual cross-browser + mobile testing. VPS automated snapshots via Hetzner API. Social media launch coordinated across IG/FB/TikTok.

**Tech Stack:** Lighthouse CLI, Hetzner Snapshots, GitHub Actions CI, Meta Business Suite

**Spec:** `docs/superpowers/specs/2026-03-23-la-maison-de-gador-design.md` (Phases 5-6)
**Depends on:** Plans 3 + 4 (website fully built with e-commerce)

---

### Task 1: GitHub Actions CI Pipeline

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: website

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website/package-lock.json

      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
```

- [ ] **Step 2: Fix any lint or type errors**

```bash
cd website && npm run lint && npx tsc --noEmit
```

Fix all reported issues.

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "Add GitHub Actions CI for lint and type-check"
```

---

### Task 2: Cross-Browser Testing

- [ ] **Step 1: Create testing checklist**

Test every page in these browsers:
- Chrome (latest, desktop)
- Safari (latest, desktop)
- Firefox (latest, desktop)
- Samsung Internet (mobile)

For each page, verify:
- [ ] Layout renders correctly
- [ ] Fonts load (Handstory for headlines, Satoshi for body)
- [ ] Colors match brand palette
- [ ] Images display
- [ ] Links work
- [ ] Forms submit
- [ ] No console errors

Pages to test:
- [ ] Home (EN + AR)
- [ ] About (EN + AR)
- [ ] Shop (EN + AR)
- [ ] Product Detail (EN + AR)
- [ ] Gifts (EN + AR)
- [ ] Custom Orders (EN + AR)
- [ ] Corporate (EN + AR)
- [ ] Contact (EN + AR)
- [ ] Cart (EN + AR)
- [ ] Checkout (EN + AR)
- [ ] Terms / Privacy / Shipping / Returns (EN + AR)

- [ ] **Step 2: Fix any issues found**

- [ ] **Step 3: Commit fixes**

```bash
git commit -am "Fix cross-browser issues"
```

---

### Task 3: Mobile Testing

- [ ] **Step 1: Test on real devices or emulators**

Test at these widths:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 412px (Pixel 7)
- 768px (iPad)

For each, verify:
- [ ] Mobile nav (hamburger menu) works
- [ ] No horizontal scrolling
- [ ] Touch targets large enough (min 44x44px)
- [ ] Forms usable on mobile keyboard
- [ ] Cart and checkout flow works on mobile
- [ ] WhatsApp button doesn't overlap content
- [ ] Images aren't cut off

- [ ] **Step 2: Fix responsive issues**

- [ ] **Step 3: Commit**

```bash
git commit -am "Fix mobile responsive issues"
```

---

### Task 4: RTL/Arabic Full Review

- [ ] **Step 1: Switch to Arabic and review every page**

For each page in /ar:
- [ ] Text direction is right-to-left
- [ ] Arabic font (Cairo) is loading
- [ ] Navigation items in correct order
- [ ] WhatsApp button on correct side (bottom-left in RTL)
- [ ] Form labels and inputs aligned correctly
- [ ] No mixed LTR/RTL text issues
- [ ] Numbers display correctly
- [ ] Currency (QAR) displays correctly
- [ ] No CSS overflow from Arabic text (Arabic text can be longer)

- [ ] **Step 2: Fix RTL issues**

Common fixes:
- Use logical CSS properties (`start`/`end` instead of `left`/`right`)
- Check `gap` and `padding` symmetry
- Verify icon directions (arrows should flip)

- [ ] **Step 3: Commit**

```bash
git commit -am "Fix RTL layout issues for Arabic"
```

---

### Task 5: Lighthouse Performance Audit

- [ ] **Step 1: Run Lighthouse on key pages**

```bash
npx lighthouse https://lamaisondegador.com/en --output=json --output-path=./lighthouse-home.json
npx lighthouse https://lamaisondegador.com/en/shop --output=json --output-path=./lighthouse-shop.json
npx lighthouse https://lamaisondegador.com/ar --output=json --output-path=./lighthouse-home-ar.json
```

Target scores: Performance >90, Accessibility >90, Best Practices >90, SEO >90

- [ ] **Step 2: Fix performance issues**

Common fixes:
- Optimize images (use Next.js Image component with width/height)
- Lazy load below-fold images
- Minimize JavaScript bundle (check for large dependencies)
- Ensure fonts have `display: swap`
- Add proper cache headers via Cloudflare
- Preconnect to Medusa backend

- [ ] **Step 3: Fix accessibility issues**

Common fixes:
- Add alt text to all images
- Ensure color contrast ratios meet WCAG AA (4.5:1 for text)
- Add `aria-label` to icon buttons
- Ensure keyboard navigation works (tab through all interactive elements)
- Add focus visible styles

- [ ] **Step 4: Re-run Lighthouse and verify all scores >90**

- [ ] **Step 5: Commit**

```bash
git commit -am "Performance and accessibility optimizations"
```

---

### Task 6: Full Checkout End-to-End Test

- [ ] **Step 1: Test complete flow with Dibsy sandbox**

1. Browse shop as guest
2. Add 2 different items to cart
3. Go to cart, adjust quantities
4. Proceed to checkout
5. Enter shipping info (Qatar address)
6. Select Dibsy payment
7. Complete payment on Dibsy sandbox
8. Verify redirect back to confirmation page
9. Verify order confirmation email received
10. Verify WhatsApp notification sent to business
11. Check Medusa admin — order visible with correct details
12. Repeat in Arabic (full RTL flow)

- [ ] **Step 2: Test edge cases**

- [ ] Empty cart → checkout should redirect to shop
- [ ] Invalid email in shipping form → validation error
- [ ] Payment canceled on Dibsy → return to checkout with error message
- [ ] Remove all items during checkout → handle gracefully

- [ ] **Step 3: Fix any issues**

- [ ] **Step 4: Commit**

```bash
git commit -am "Fix checkout edge cases"
```

---

### Task 7: VPS Backup Strategy

- [ ] **Step 1: Enable Hetzner automated snapshots**

Manual: In Hetzner Cloud console:
1. Go to server → Snapshots
2. Enable automated backups (~20% of server cost, ~$1-2/mo)
3. Backups run daily, retained for 7 days

- [ ] **Step 2: Add database backup script**

Create `scripts/backup-db.sh`:

```bash
#!/bin/bash
set -e
BACKUP_DIR="/var/backups/gador"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker exec gador-postgres pg_dump -U medusa medusa_db > "$BACKUP_DIR/db_$DATE.sql"

# Keep last 7 days
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete

echo "Backup complete: db_$DATE.sql"
```

- [ ] **Step 3: Set up cron for daily DB backup**

```bash
chmod +x /var/www/gador/scripts/backup-db.sh
crontab -e
# Add: 0 3 * * * /var/www/gador/scripts/backup-db.sh >> /var/log/gador-backup.log 2>&1
```

- [ ] **Step 4: Test backup and restore**

```bash
# Backup
./scripts/backup-db.sh

# Restore (test)
docker exec -i gador-postgres psql -U medusa medusa_db < /var/backups/gador/db_LATEST.sql
```

- [ ] **Step 5: Commit**

```bash
git add scripts/backup-db.sh
git commit -m "Add database backup script with 7-day retention"
```

---

### Task 8: Pre-Launch Social Media Campaign

- [ ] **Step 1: Create teaser content (1 week before launch)**

Prepare 7 days of teaser content:

| Day | Content |
|-----|---------|
| -7 | Story: blurred product shot, "Something big is coming" |
| -6 | Reel: 5-second close-up of chocolate drizzle, no branding |
| -5 | Story: countdown "5 days" with website URL |
| -4 | Feed post: brand icon zoomed in, "Can you guess what's inside?" |
| -3 | Story: countdown "3 days", WhatsApp signup CTA |
| -2 | Reel: hands wrapping a gift box, reveal at the end |
| -1 | Story: "Tomorrow. lamaisondegador.com" |

- [ ] **Step 2: Schedule all teaser posts** in Meta Business Suite

- [ ] **Step 3: Post TikTok content manually** (no free scheduler)

- [ ] **Step 4: Send WhatsApp broadcast** to landing page signups:
"La Maison de Gador launches tomorrow! Be the first to order: lamaisondegador.com"

---

### Task 9: Launch Day Execution

- [ ] **Step 1: Final deployment check**

```bash
# Deploy latest code
./scripts/deploy.sh

# Verify all services running
ssh root@VPS_IP "docker-compose ps"

# Check SSL
curl -I https://lamaisondegador.com

# Test checkout one more time
```

- [ ] **Step 2: Post launch content (coordinated timing)**

At 7 PM Qatar time (peak engagement):

1. **Instagram**: Reel (brand reveal + "We're live!") + Carousel (5 slides: brand story + products + how to order)
2. **Facebook**: Same content auto-shared via Meta Business Suite
3. **TikTok**: 15-second brand reveal Reel (upload manually)
4. **Instagram Stories**: 5+ stories throughout the day (unboxing, first order, team celebration)

- [ ] **Step 3: Influencer posts go live**

Coordinate with 5-10 micro-influencers to post their unboxing/reviews at staggered times throughout launch day.

- [ ] **Step 4: Boost launch post**

In Meta Business Suite:
- Boost the main launch Reel/post
- Budget: $20-50 for launch day
- Targeting: Doha + Al Wakrah, ages 25-45, interests: food, dining, premium lifestyle, gifting

- [ ] **Step 5: Send WhatsApp broadcast to all signups**

"We're LIVE! 🎉 La Maison de Gador is now open. Order your premium chocolate dates: lamaisondegador.com"

- [ ] **Step 6: Monitor and engage**

For the first 48 hours:
- Reply to every comment within 1 hour
- Reply to every DM within 30 minutes
- Repost customer photos/unboxing to Stories
- Monitor orders in Medusa admin
- Fix any issues immediately

- [ ] **Step 7: Day 1 retrospective**

Document:
- Number of signups converted to orders
- Social media engagement metrics
- Any bugs or issues encountered
- Customer feedback
- Revenue

---

## Plan 5 Completion Criteria

- [ ] CI pipeline running on push (lint + type-check)
- [ ] Cross-browser testing passed (Chrome, Safari, Firefox, Samsung Internet)
- [ ] Mobile testing passed (375px to 768px)
- [ ] RTL/Arabic review passed on all pages
- [ ] Lighthouse scores >90 on all key pages
- [ ] Full checkout tested end-to-end with Dibsy sandbox
- [ ] VPS automated snapshots enabled
- [ ] Database backup script running daily
- [ ] Pre-launch teaser campaign completed (7 days)
- [ ] Launch day content posted on all platforms
- [ ] Influencer posts live
- [ ] Launch post boosted ($20-50)
- [ ] WhatsApp broadcast sent
- [ ] First orders processed successfully
