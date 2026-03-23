# Plan 1: Brand Foundation + Coming Soon Landing Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up project infrastructure, collect brand assets, deploy a "coming soon" landing page, create social media accounts, and research Qatar legal requirements.

**Architecture:** Single-page Next.js app deployed to Hetzner VPS behind Cloudflare. Collects email/WhatsApp signups via a simple JSON file (no database needed yet). Brand assets organized in repo.

**Tech Stack:** Next.js 15, Tailwind CSS, Cloudflare DNS, Hetzner VPS, Git/GitHub

**Spec:** `docs/superpowers/specs/2026-03-23-la-maison-de-gador-design.md`

---

## File Structure

```
D:\Projects\La-Maison-de-Gador\
├── assets/
│   ├── logo/                  ← SVGs from designer (4 variants)
│   ├── fonts/                 ← Handstory, Satoshi, Arabic font files
│   ├── social-templates/      ← Designer's IG/FB/TikTok templates
│   └── illustrations/         ← Hand-drawn botanical elements
├── landing/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout with fonts + metadata
│   │   ├── page.tsx           ← Coming soon page
│   │   ├── globals.css        ← Tailwind + brand CSS variables
│   │   └── api/
│   │       └── signup/
│   │           └── route.ts   ← Signup endpoint (saves to JSON)
│   ├── components/
│   │   └── SignupForm.tsx     ← Email/WhatsApp capture form
│   ├── public/
│   │   ├── logo.svg           ← Brand icon for favicon/OG
│   │   └── og-image.png       ← Social share image
│   ├── data/
│   │   └── signups.json       ← Collected signups (gitignored)
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── package.json
│   └── tsconfig.json
├── content/
│   └── briefs/                ← Designer briefs
├── docs/
│   ├── plans/
│   ├── brand/
│   │   └── brand.md           ← Confirmed colors, fonts, usage rules
│   └── legal/
│       └── qatar-cr-research.md ← Commercial registration research
├── .gitignore
└── README.md
```

---

### Task 1: Initialize GitHub Repo + Project Structure

**Files:**
- Create: `.gitignore`, `README.md`

- [ ] **Step 1: Create .gitignore**

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Next.js
.next/
out/

# Env
.env
.env.local
.env*.local

# Data
landing/data/signups.json

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

- [ ] **Step 2: Create README.md**

```markdown
# La Maison de Gador

Premium chocolate dates — Qatar.

## Structure

- `assets/` — Brand assets (logo, fonts, templates)
- `landing/` — Coming soon landing page (Next.js)
- `website/` — Main website (Next.js + Medusa) — Phase 3
- `content/` — Content calendars, captions, designer briefs
- `docs/` — Strategy, specs, plans, brand guidelines
```

- [ ] **Step 3: Create directory structure**

```bash
cd D:/Projects/La-Maison-de-Gador
mkdir -p assets/{logo,fonts,social-templates,illustrations}
mkdir -p content/{briefs,calendar,captions}
mkdir -p docs/{brand,legal}
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore README.md assets/ content/ docs/
git commit -m "Initialize project structure"
```

---

### Task 2: Collect and Organize Brand Assets

**Files:**
- Create: `docs/brand/brand.md`
- Create: `content/briefs/001-logo-export.md`

- [ ] **Step 1: Create brand reference doc**

```markdown
# La Maison de Gador — Brand Reference

## Colors

| Name | Hex | CSS Variable | Usage |
|---|---|---|---|
| Chocolate Brown | #8B6914 | --color-brown | Primary brand |
| Cream | #F0E6D3 | --color-cream | Light backgrounds |
| Sky Blue | #3AABE0 | --color-blue | Accent |
| Burnt Orange | #E07830 | --color-orange | Accent |
| Dark Chocolate | #3C2415 | --color-dark | Text, deep contrast |
| Warm White | #FAF6F0 | --color-white | Page background |

## Typography

| Use | Font | Weight | Source |
|---|---|---|---|
| Headlines (EN) | Handstory | Regular | Designer (local file) |
| Body (EN) | Satoshi | 400, 500, 700 | fontsource.org or Google |
| Body (AR) | Cairo | 400, 600, 700 | Google Fonts |

## Logo Variants

1. `logo-primary-light.svg` — Brown on cream
2. `logo-primary-dark.svg` — Cream on brown
3. `logo-icon-light.svg` — Cocoa bean icon, brown
4. `logo-icon-dark.svg` — Cocoa bean icon, cream
5. `logo-text-only.svg` — Text mark only

## Illustration Style

Hand-drawn botanical line art: cocoa pods, chocolate bars, nuts, citrus.
Cream background. Used as decorative elements, never as primary content.
```

- [ ] **Step 2: Create first designer brief**

```markdown
## Brief: Logo SVG Export

**Date:** [today]
**Priority:** High
**Needed by:** End of week 1

### What I Need
All logo variants exported as clean SVG files, optimized for web.

### Specs
- Format: SVG (vector, not rasterized)
- Each variant in its own file
- Artboard: tight crop, no extra padding
- Colors: use exact hex values from brand.md
- Ensure text is converted to outlines/paths

### Variants Needed
1. Full logo (La Maison de GADOR Chocolatier) — on light bg
2. Full logo — on dark bg
3. Icon only (cocoa bean symbol) — on light bg
4. Icon only — on dark bg
5. Text only (La Maison de GADOR) — on light bg

### How It Will Be Used
Website header, favicon, social media profile pictures, OG image
```

- [ ] **Step 3: Send brief to designer and collect font files**

Manual steps:
1. Send `content/briefs/001-logo-export.md` to designer
2. Download Satoshi font from fontsource.org → `assets/fonts/`
3. Get Handstory font files from designer → `assets/fonts/`
4. Download Cairo font from Google Fonts → `assets/fonts/`

- [ ] **Step 4: Commit brand docs**

```bash
git add docs/brand/brand.md content/briefs/001-logo-export.md
git commit -m "Add brand reference and first designer brief"
```

---

### Task 3: Register Domain on Cloudflare

- [ ] **Step 1: Check domain availability**

Manual: Go to Cloudflare Registrar, search `lamaisondegador.com`
Alternatives if taken: `lamaisondegador.qa`, `gadorchocolatier.com`

- [ ] **Step 2: Register domain**

Manual: Purchase via Cloudflare Registrar (~$12/year)

- [ ] **Step 3: Verify DNS is active**

```bash
dig lamaisondegador.com +short
```

Expected: Cloudflare nameservers assigned

- [ ] **Step 4: Document domain in brand.md**

Add to `docs/brand/brand.md`:
```markdown
## Domain
- Primary: lamaisondegador.com
- Registrar: Cloudflare
- DNS: Cloudflare (free plan)
```

---

### Task 4: Build Coming Soon Landing Page

**Files:**
- Create: `landing/package.json`, `landing/next.config.ts`, `landing/tailwind.config.ts`, `landing/tsconfig.json`
- Create: `landing/app/layout.tsx`, `landing/app/page.tsx`, `landing/app/globals.css`
- Create: `landing/app/api/signup/route.ts`
- Create: `landing/components/SignupForm.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd D:/Projects/La-Maison-de-Gador
npx create-next-app@latest landing --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

- [ ] **Step 2: Set up Tailwind with brand colors**

Replace `landing/tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#8B6914",
          cream: "#F0E6D3",
          blue: "#3AABE0",
          orange: "#E07830",
          dark: "#3C2415",
          white: "#FAF6F0",
        },
      },
      fontFamily: {
        handstory: ["var(--font-handstory)"],
        satoshi: ["var(--font-satoshi)"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Set up globals.css**

Replace `landing/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-brown: #8B6914;
  --color-cream: #F0E6D3;
  --color-blue: #3AABE0;
  --color-orange: #E07830;
  --color-dark: #3C2415;
  --color-white: #FAF6F0;
}

body {
  background-color: var(--color-white);
  color: var(--color-dark);
}
```

- [ ] **Step 4: Set up root layout with fonts and metadata**

Replace `landing/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const handstory = localFont({
  src: "../public/fonts/Handstory.woff2",
  variable: "--font-handstory",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Maison de Gador — Coming Soon",
  description:
    "Premium chocolate dates, handcrafted in Qatar. The Art of Adoration.",
  openGraph: {
    title: "La Maison de Gador — Coming Soon",
    description: "Premium chocolate dates, handcrafted in Qatar.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${handstory.variable} font-satoshi antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Build the SignupForm component**

Create `landing/components/SignupForm.tsx`:

```tsx
"use client";

import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-lg text-brand-brown font-medium">
          Thank you! We&apos;ll notify you when we launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 px-4 py-3 rounded-lg border border-brand-cream bg-white text-brand-dark placeholder:text-brand-brown/50 focus:outline-none focus:ring-2 focus:ring-brand-brown"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-brand-brown text-brand-cream rounded-lg font-medium hover:bg-brand-dark transition-colors"
      >
        Notify Me
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
```

- [ ] **Step 6: Build the signup API route**

Create `landing/app/api/signup/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "signups.json");

async function getSignups(): Promise<{ email: string; date: string }[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const signups = await getSignups();

  if (signups.some((s) => s.email === email)) {
    return NextResponse.json({ message: "Already registered" });
  }

  signups.push({ email, date: new Date().toISOString() });

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(signups, null, 2));

  return NextResponse.json({ message: "Signed up" });
}
```

- [ ] **Step 7: Build the coming soon page**

Replace `landing/app/page.tsx`:

```tsx
import SignupForm from "@/components/SignupForm";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-brand-white">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo.svg"
          alt="La Maison de Gador"
          className="h-24 w-auto"
        />
      </div>

      {/* Headline */}
      <h1 className="font-handstory text-4xl sm:text-5xl md:text-6xl text-brand-brown text-center mb-4">
        Something Beautiful is Coming
      </h1>

      <p className="text-lg text-brand-dark/70 text-center max-w-lg mb-8">
        Premium chocolate dates, handcrafted with love in Doha.
        <br />
        Be the first to taste.
      </p>

      {/* Signup Form */}
      <SignupForm />

      {/* WhatsApp Link */}
      <a
        href="https://wa.me/974XXXXXXXX?text=I%20want%20to%20know%20more%20about%20La%20Maison%20de%20Gador"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-brand-brown hover:text-brand-dark underline underline-offset-4 transition-colors"
      >
        Or reach us on WhatsApp
      </a>

      {/* Social Links */}
      <div className="mt-12 flex gap-6 text-brand-brown/60">
        <a href="https://instagram.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown transition-colors">
          Instagram
        </a>
        <a href="https://facebook.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown transition-colors">
          Facebook
        </a>
        <a href="https://tiktok.com/@lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown transition-colors">
          TikTok
        </a>
      </div>

      {/* Footer */}
      <p className="mt-16 text-sm text-brand-brown/40">
        © {new Date().getFullYear()} La Maison de Gador. The Art of Adoration.
      </p>
    </main>
  );
}
```

- [ ] **Step 8: Run locally and verify**

```bash
cd D:/Projects/La-Maison-de-Gador/landing
npm run dev
```

Open http://localhost:3000 — verify:
- Logo displays
- Headline in Handstory font
- Body text in Satoshi
- Form accepts email, shows thank you
- WhatsApp link works
- Social links work

- [ ] **Step 9: Commit landing page**

```bash
cd D:/Projects/La-Maison-de-Gador
git add landing/ .gitignore
git commit -m "Add coming soon landing page with signup capture"
```

---

### Task 5: Deploy Landing Page to Hetzner VPS

- [ ] **Step 1: Provision Hetzner VPS**

Manual: Go to Hetzner Cloud console
- Create CX22 server (2 vCPU, 4GB RAM, 40GB SSD)
- Location: Helsinki or Falkenstein (closest to Qatar with good latency)
- OS: Ubuntu 24.04
- Add SSH key
- Note the IP address

- [ ] **Step 2: Initial server setup**

```bash
ssh root@YOUR_VPS_IP
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

- [ ] **Step 3: Configure Cloudflare DNS**

Manual: In Cloudflare dashboard, add A record:
- Type: A
- Name: @ (root domain)
- Content: YOUR_VPS_IP
- Proxy: Proxied (orange cloud)
- Add CNAME for www → lamaisondegador.com

- [ ] **Step 4: Deploy landing page**

```bash
ssh root@YOUR_VPS_IP
mkdir -p /var/www/gador
cd /var/www/gador
git clone https://github.com/YOUR_USER/La-Maison-de-Gador.git .
cd landing
npm install
npm run build
pm2 start npm --name "gador-landing" -- start
pm2 save
pm2 startup
```

- [ ] **Step 5: Configure Nginx**

Create `/etc/nginx/sites-available/gador`:

```nginx
server {
    listen 80;
    server_name lamaisondegador.com www.lamaisondegador.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/gador /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

- [ ] **Step 6: Verify deployment**

Open https://lamaisondegador.com
- Page loads with SSL (via Cloudflare)
- Signup form works
- Check `landing/data/signups.json` on server has the test entry

- [ ] **Step 7: Create deploy script**

Create `scripts/deploy-landing.sh`:

```bash
#!/bin/bash
set -e
echo "Deploying landing page..."
ssh root@YOUR_VPS_IP "cd /var/www/gador && git pull && cd landing && npm install && npm run build && pm2 restart gador-landing"
echo "Done!"
```

```bash
chmod +x scripts/deploy-landing.sh
git add scripts/deploy-landing.sh
git commit -m "Add landing page deploy script"
```

---

### Task 6: Set Up Social Media Accounts

- [ ] **Step 1: Create Instagram Business Account**

Manual steps:
1. Create @lamaisondegador on Instagram
2. Switch to Business account (Settings → Account → Switch to Professional)
3. Category: Food & Beverage
4. Set profile photo: brand icon (logo-icon-dark on cream background, 320x320)
5. Bio: "La Maison de Gador | Chocolatier 🍫\nPremium chocolate dates, Doha\nThe Art of Adoration ✨\n🔗 lamaisondegador.com"
6. Link: https://lamaisondegador.com

- [ ] **Step 2: Create Facebook Business Page**

Manual steps:
1. Create page "La Maison de Gador"
2. Category: Chocolate Shop
3. Profile photo: same brand icon
4. Cover photo: logo-primary-dark (1200x630)
5. About: same bio text
6. Link Instagram account via Meta Business Suite

- [ ] **Step 3: Create TikTok Account**

Manual steps:
1. Create @lamaisondegador on TikTok
2. Switch to Business account
3. Profile photo: brand icon
4. Bio: "Premium chocolate dates | Doha 🇶🇦 | The Art of Adoration"

- [ ] **Step 4: Set up WhatsApp Business**

Manual steps:
1. Install WhatsApp Business app on phone
2. Register with the business phone number
3. Business name: La Maison de Gador
4. Category: Food & Grocery
5. Add profile photo, address, hours
6. Create Quick Replies for common questions

- [ ] **Step 5: Document all accounts**

Add to `docs/brand/brand.md`:

```markdown
## Social Accounts

| Platform | Handle | URL |
|---|---|---|
| Instagram | @lamaisondegador | https://instagram.com/lamaisondegador |
| Facebook | La Maison de Gador | https://facebook.com/lamaisondegador |
| TikTok | @lamaisondegador | https://tiktok.com/@lamaisondegador |
| WhatsApp | +974 XXXX XXXX | wa.me/974XXXXXXXX |
| Website | lamaisondegador.com | https://lamaisondegador.com |
```

- [ ] **Step 6: Commit**

```bash
git add docs/brand/brand.md
git commit -m "Document social media accounts and brand reference"
```

---

### Task 7: Set Up Zoho Mail

- [ ] **Step 1: Register Zoho Mail free account**

Go to https://www.zoho.com/mail/zohomail-pricing.html — select Forever Free plan (5 users).

- [ ] **Step 2: Add custom domain**

Follow Zoho's domain verification for lamaisondegador.com:
1. Add TXT record to Cloudflare DNS for verification
2. Add MX records for Zoho mail delivery
3. Verify domain

- [ ] **Step 3: Create email addresses**

- hello@lamaisondegador.com (main contact)
- orders@lamaisondegador.com (order notifications)
- noreply@lamaisondegador.com (transactional emails)

- [ ] **Step 4: Test email sending and receiving**

Send test email from hello@lamaisondegador.com to personal email. Verify delivery.

---

### Task 8: Research Qatar Commercial Registration

- [ ] **Step 1: Document CR requirements**

Create `docs/legal/qatar-cr-research.md` with findings from NotebookLM research:

```markdown
# Qatar Commercial Registration — Research

## Summary

E-commerce food businesses in Qatar require:
1. Commercial Registration (CR) from Ministry of Commerce
2. Trade License from Baladiya (requires physical premises)
3. MOPH Food Establishment Registration (Wathiq system)
4. Food Handlers Certificates for all staff
5. Tax Identification Number (TIN)

## Key Costs (QAR)

| Item | Cost |
|---|---|
| Name registration | 2,000 (AR) / 4,000 (EN) |
| Articles of Association | 1,500 |
| Commercial Registry | 500-10,000 |
| Chamber of Commerce | 560-5,510 |
| Trade License | 10,020 |
| Company Seal | 150 |

## Important Notes

- 100% foreign ownership allowed (Law No. 1 of 2019)
- Physical premises required even for e-commerce (kitchen/warehouse)
- HACCP certificate needed for MOPH registration
- GCC 2025-2026: biodegradable packaging required (PFAS-free)
- Timeline: 1-8 weeks for trade license alone

## Action Items

- [ ] Confirm uncle has/can get physical premises in Qatar
- [ ] Decide on company structure (sole proprietorship vs LLC)
- [ ] Start name registration process
- [ ] Research HACCP certification options
```

- [ ] **Step 2: Commit**

```bash
git add docs/legal/qatar-cr-research.md
git commit -m "Add Qatar commercial registration research"
```

---

## Plan 1 Completion Criteria

- [ ] GitHub repo initialized with full directory structure
- [ ] Brand reference doc with confirmed colors, fonts, logo specs
- [ ] First designer brief sent
- [ ] Domain registered on Cloudflare
- [ ] Coming soon landing page live at lamaisondegador.com
- [ ] Email signup form working and collecting signups
- [ ] Instagram, Facebook, TikTok, WhatsApp accounts created
- [ ] Qatar CR requirements researched and documented
