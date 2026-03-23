# Plan 4: E-Commerce Integration (Dibsy + Checkout + Legal)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Dibsy payments into Medusa.js, build cart and checkout flow, add order tracking, and create all required legal/policy pages.

**Architecture:** Custom Dibsy payment provider plugin for Medusa.js v2. Cart state managed client-side via Medusa's cart API. Checkout flow: cart → shipping info → Dibsy payment → confirmation. Webhooks for async payment confirmation.

**Tech Stack:** Medusa.js 2.x Payment Module Provider, Dibsy API v2 (api.dibsy.one), Next.js (checkout pages), Zoho Mail (order emails)

**Spec:** `docs/superpowers/specs/2026-03-23-la-maison-de-gador-design.md` (Phase 4)
**Depends on:** Plan 3 (website + Medusa running)

**Reference:** NotebookLM Tech notebook has Dibsy API docs and Medusa payment provider guide.

---

## File Structure

```
medusa/
├── src/
│   ├── modules/
│   │   └── dibsy/
│   │       ├── service.ts         ← DibsyPaymentProvider (extends AbstractPaymentProvider)
│   │       └── index.ts           ← Module definition export
│   └── api/
│       └── webhooks/
│           └── dibsy/
│               └── route.ts       ← Webhook handler for Dibsy callbacks
├── medusa-config.ts               ← Register Dibsy provider

website/
├── app/
│   ├── [locale]/
│   │   ├── cart/page.tsx           ← Cart page
│   │   ├── checkout/page.tsx       ← Checkout flow
│   │   ├── order/[id]/page.tsx     ← Order status
│   │   ├── terms/page.tsx          ← Terms & Conditions
│   │   ├── privacy/page.tsx        ← Privacy Policy
│   │   ├── shipping/page.tsx       ← Shipping Policy
│   │   └── returns/page.tsx        ← Returns Policy
│   └── api/
│       └── notify/
│           └── route.ts            ← WhatsApp/email notification trigger
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartProvider.tsx        ← Cart context with Medusa cart API
│   └── checkout/
│       ├── ShippingForm.tsx
│       ├── PaymentStep.tsx
│       └── OrderConfirmation.tsx
└── lib/
    └── dibsy/
        └── client.ts               ← Dibsy client-side helpers (if needed)
```

---

### Task 1: Build Dibsy Payment Provider for Medusa

**Files:**
- Create: `medusa/src/modules/dibsy/service.ts`
- Create: `medusa/src/modules/dibsy/index.ts`
- Modify: `medusa/medusa-config.ts`

- [ ] **Step 1: Create payment provider service**

Create `medusa/src/modules/dibsy/service.ts`:

```typescript
import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import type {
  CreatePaymentProviderSession,
  PaymentProviderError,
  PaymentProviderSessionResponse,
  PaymentSessionStatus,
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/framework/types";

type DibsyOptions = {
  api_key: string;
  api_url: string;
  webhook_secret: string;
};

export default class DibsyPaymentProvider extends AbstractPaymentProvider<DibsyOptions> {
  static identifier = "dibsy";

  private apiKey: string;
  private apiUrl: string;

  constructor(container: Record<string, unknown>, options: DibsyOptions) {
    super(container, options);
    this.apiKey = options.api_key;
    this.apiUrl = options.api_url || "https://api.dibsy.one/v2";
  }

  private async dibsyRequest(endpoint: string, method: string, body?: unknown) {
    const res = await fetch(`${this.apiUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Dibsy API error: ${res.status} ${error}`);
    }
    return res.json();
  }

  async initiatePayment(
    input: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context } = input;

    try {
      const payment = await this.dibsyRequest("/payments", "POST", {
        amount: amount / 100, // Medusa stores amounts in cents
        currency: currency_code.toUpperCase(),
        description: `Order from La Maison de Gador`,
        redirectUrl: `${context?.return_url || ""}/order/confirmation`,
        webhookUrl: `${context?.webhook_url || ""}/webhooks/dibsy`,
      });

      return {
        data: {
          id: payment.id,
          checkout_url: payment.checkoutUrl,
          status: payment.status,
        },
      };
    } catch (error) {
      return { error: (error as Error).message, code: "DIBSY_INIT_ERROR" };
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<
    PaymentProviderError | { status: PaymentSessionStatus; data: Record<string, unknown> }
  > {
    try {
      const payment = await this.dibsyRequest(
        `/payments/${paymentSessionData.id}`,
        "GET"
      );

      const status: PaymentSessionStatus =
        payment.status === "paid" ? "authorized" : "pending";

      return { status, data: { ...paymentSessionData, ...payment } };
    } catch (error) {
      return { error: (error as Error).message, code: "DIBSY_AUTH_ERROR" };
    }
  }

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | Record<string, unknown>> {
    // Dibsy auto-captures on payment completion
    return { ...paymentSessionData, captured: true };
  }

  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<PaymentProviderError | Record<string, unknown>> {
    try {
      const refund = await this.dibsyRequest(
        `/payments/${paymentSessionData.id}/refunds`,
        "POST",
        { amount: refundAmount / 100 }
      );
      return { ...paymentSessionData, refund };
    } catch (error) {
      return { error: (error as Error).message, code: "DIBSY_REFUND_ERROR" };
    }
  }

  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | Record<string, unknown>> {
    return paymentSessionData; // Dibsy doesn't have explicit cancel
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | Record<string, unknown>> {
    return paymentSessionData;
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    try {
      const payment = await this.dibsyRequest(
        `/payments/${paymentSessionData.id}`,
        "GET"
      );
      if (payment.status === "paid") return "authorized";
      if (payment.status === "expired" || payment.status === "canceled")
        return "canceled";
      return "pending";
    } catch {
      return "error";
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload
  ): Promise<WebhookActionResult> {
    const { data } = payload;
    const body = data.body as { id: string; status: string };

    if (body.status === "paid") {
      return {
        action: "authorized",
        data: { session_id: body.id, amount: 0 },
      };
    }

    return { action: "not_supported" };
  }
}
```

- [ ] **Step 2: Create module definition**

Create `medusa/src/modules/dibsy/index.ts`:

```typescript
import DibsyPaymentProvider from "./service";
import { ModuleProvider, Modules } from "@medusajs/framework/utils";

export default ModuleProvider(Modules.PAYMENT, {
  services: [DibsyPaymentProvider],
});
```

- [ ] **Step 3: Register in medusa-config.ts**

Add to the `modules` section of `medusa-config.ts`:

```typescript
{
  resolve: "@medusajs/medusa/payment",
  options: {
    providers: [
      {
        resolve: "./src/modules/dibsy",
        id: "dibsy",
        options: {
          api_key: process.env.DIBSY_API_KEY,
          api_url: "https://api.dibsy.one/v2",
          webhook_secret: process.env.DIBSY_WEBHOOK_SECRET,
        },
      },
    ],
  },
},
```

- [ ] **Step 4: Test payment provider**

1. Register for Dibsy sandbox account
2. Set `DIBSY_API_KEY` in `.env`
3. Start Medusa, enable Dibsy in admin under Payment Providers
4. Create a test payment via admin

- [ ] **Step 5: Commit**

```bash
git commit -am "Add Dibsy payment provider plugin for Medusa"
```

---

### Task 2: Build Cart Page

**Files:**
- Create: `website/components/cart/CartProvider.tsx`
- Create: `website/components/cart/CartItem.tsx`
- Create: `website/components/cart/CartSummary.tsx`
- Create: `website/app/[locale]/cart/page.tsx`

- [ ] **Step 1: Build CartProvider context**

Uses Medusa's cart API to manage cart state. Key operations:
- Create cart on first add
- Add/remove/update line items
- Store cart ID in localStorage

- [ ] **Step 2: Build CartItem component**

Displays: product image, name, quantity selector, price, remove button.

- [ ] **Step 3: Build CartSummary component**

Shows subtotal, shipping estimate, total. "Proceed to Checkout" button.

- [ ] **Step 4: Build Cart page**

Displays cart items, summary, and CTA. Empty cart state with "Continue Shopping" link.

- [ ] **Step 5: Add cart icon to Header** with item count badge.

- [ ] **Step 6: Commit**

```bash
git commit -am "Add cart page with Medusa cart API integration"
```

---

### Task 3: Build Checkout Flow

**Files:**
- Create: `website/components/checkout/ShippingForm.tsx`
- Create: `website/components/checkout/PaymentStep.tsx`
- Create: `website/components/checkout/OrderConfirmation.tsx`
- Create: `website/app/[locale]/checkout/page.tsx`

- [ ] **Step 1: Build ShippingForm**

Fields: full name, phone, email, address, city, area. Qatar-specific — no postal codes needed. Saves to Medusa cart shipping address.

- [ ] **Step 2: Build PaymentStep**

Calls Medusa to initiate Dibsy payment session. Redirects customer to Dibsy's hosted checkout page. Dibsy handles card entry securely.

- [ ] **Step 3: Build OrderConfirmation**

After Dibsy redirects back, show order confirmation with:
- Order number
- Items ordered
- Delivery address
- Estimated delivery

- [ ] **Step 4: Build checkout page** — Multi-step: Shipping → Payment → Confirmation.

- [ ] **Step 5: Test full checkout flow**

1. Add item to cart
2. Go to checkout
3. Enter shipping info
4. Pay via Dibsy sandbox
5. See confirmation

- [ ] **Step 6: Commit**

```bash
git commit -am "Add checkout flow with shipping, Dibsy payment, and confirmation"
```

---

### Task 4: Order Notifications (Email + WhatsApp)

**Files:**
- Create: `website/app/api/notify/route.ts`

- [ ] **Step 1: Set up Zoho SMTP**

Use Zoho Mail's SMTP for sending order confirmation emails.
- Host: smtp.zoho.com
- Port: 465 (SSL)
- Create noreply@lamaisondegador.com

- [ ] **Step 2: Build notification endpoint**

Triggered by Medusa webhook on order completion. Sends:
- Email to customer (order confirmation)
- WhatsApp message to business owner (new order alert)

WhatsApp notification uses the WhatsApp Business API or a simple wa.me link logged to admin dashboard.

- [ ] **Step 3: Test notifications**

Place a test order and verify both email and WhatsApp notification arrive.

- [ ] **Step 4: Commit**

```bash
git commit -am "Add order email and WhatsApp notifications"
```

---

### Task 5: Order Status Page

**Files:**
- Create: `website/app/[locale]/order/[id]/page.tsx`

- [ ] **Step 1: Build order status page**

Fetches order from Medusa by ID. Shows:
- Order number and date
- Items with quantities and prices
- Shipping address
- Payment status (paid/pending)
- Fulfillment status (processing/shipped/delivered)

- [ ] **Step 2: Commit**

```bash
git commit -am "Add customer order status page"
```

---

### Task 6: Populate Product Catalog in Medusa

- [ ] **Step 1: Access Medusa Admin dashboard**

Go to http://localhost:9000/app (or production URL).
Login with admin credentials created during setup.

- [ ] **Step 2: Create product categories**

In Medusa Admin → Product Categories:
- Signature Collection
- Gift Boxes
- Corporate Gifts
- Seasonal (Ramadan, Eid)

- [ ] **Step 3: Add products**

For each product, add:
- Title (EN) — Medusa handles one language; Arabic translations in storefront
- Description
- Images (from designer)
- Variants (size: small/medium/large box)
- Prices in QAR
- Inventory quantity
- Tags: "ramadan", "corporate", "wedding", etc.

- [ ] **Step 4: Add collections**

Group products into collections matching the Gifts page categories.

- [ ] **Step 5: Create a publishable API key**

Medusa Admin → Settings → Publishable API Keys.
Copy key to `.env` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

- [ ] **Step 6: Verify products appear on storefront**

Visit /en/shop — products should load from Medusa.

- [ ] **Step 7: Commit env update**

```bash
git commit -am "Document Medusa publishable API key setup"
```

---

### Task 7: Legal Pages

**Files:**
- Create: `website/app/[locale]/terms/page.tsx`
- Create: `website/app/[locale]/privacy/page.tsx`
- Create: `website/app/[locale]/shipping/page.tsx`
- Create: `website/app/[locale]/returns/page.tsx`

- [ ] **Step 1: Write Terms & Conditions**

Use AI to draft Qatar-appropriate T&C covering:
- Company info (La Maison de Gador, Qatar CR number)
- Product descriptions and pricing (QAR)
- Order process and acceptance
- Payment terms (Dibsy)
- Intellectual property
- Limitation of liability
- Governing law (Qatar)

- [ ] **Step 2: Write Privacy Policy**

Covering Qatar Data Privacy Law (Law No. 13 of 2016):
- Data collected (name, email, phone, address)
- How data is used (order processing, communication)
- Data storage and security
- Third-party sharing (Dibsy for payments)
- User rights (access, correction, deletion)
- Contact info for data inquiries

- [ ] **Step 3: Write Shipping Policy**

- Delivery zones: Doha and surrounding areas initially
- Delivery timeframe: 1-3 business days
- Shipping cost structure (free above certain amount, flat rate below)
- Order tracking process
- Handling of perishable items

- [ ] **Step 4: Write Returns Policy**

- Perishable food: no returns once delivered (unless damaged/defective)
- Damaged items: photo required within 24 hours, full replacement or refund
- Cancellation: possible before order is shipped
- Refund timeline: 5-7 business days via original payment method

- [ ] **Step 5: Build page templates**

All 4 pages follow same pattern — bilingual static content pages. Add translations for both EN and AR.

- [ ] **Step 6: Add footer links** to all legal pages.

- [ ] **Step 7: Commit**

```bash
git commit -am "Add Terms, Privacy, Shipping, and Returns policy pages"
```

---

### Task 7: SEO

**Files:**
- Modify: all page files (add metadata exports)
- Create: `website/app/sitemap.ts`
- Create: `website/app/robots.ts`

- [ ] **Step 1: Add metadata to every page**

Each page exports a `generateMetadata` function with:
- Title
- Description
- Open Graph image
- Locale alternates (en ↔ ar)

- [ ] **Step 2: Create sitemap.ts**

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lamaisondegador.com";
  const locales = ["en", "ar"];
  const pages = ["/", "/about", "/shop", "/gifts", "/custom", "/corporate", "/contact"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page === "/" ? "" : page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "/" ? 1 : 0.8,
    }))
  );
}
```

- [ ] **Step 3: Create robots.ts**

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lamaisondegador.com/sitemap.xml",
  };
}
```

- [ ] **Step 4: Commit**

```bash
git commit -am "Add SEO metadata, sitemap, and robots.txt"
```

---

## Plan 4 Completion Criteria

- [ ] Dibsy payment provider plugin working in Medusa
- [ ] Cart page with add/remove/update items
- [ ] Checkout flow: shipping → Dibsy payment → confirmation
- [ ] Order confirmation email sent via Zoho SMTP
- [ ] WhatsApp notification to business owner on new order
- [ ] Customer order status page
- [ ] Terms & Conditions page (bilingual)
- [ ] Privacy Policy page (Qatar Law compliant, bilingual)
- [ ] Shipping Policy page (bilingual)
- [ ] Returns Policy page (bilingual)
- [ ] Footer links to all legal pages
- [ ] SEO metadata on all pages + sitemap + robots.txt
- [ ] Full checkout tested end-to-end with Dibsy sandbox
