# MONTS — Luxury Ready-to-Wear Shopify Storefront React Clone

A production-ready React 19 + Vite storefront application faithfully cloning the **MONTS** Shopify preview site (`https://s7dhu5es17g0ay1o-77758005541.shopifypreview.com`).

Built with **Feature-Based Modular Architecture**, a **Repository + Adapter Pattern**, **TanStack Query**, **Zustand**, and **Tailwind CSS v3**, the application is fully decoupled from data sources. Switching from local mock JSON to the live Shopify Storefront GraphQL API requires **only changing environment variables**.

---

## 🌟 Key Features

- **Pipeline Theme Visual Fidelity**: Recreates the clean luxury aesthetic of MONTS (earth/monochrome palette, sleek typography, interactive cart drawer, quick view modal, countdown promotional banners, shop-the-look hotspot grids, and value proposition bars).
- **Feature-Based Architecture**: Modular code organization grouped by business domain (`features/auth`, `features/products`, `features/collections`, `features/cart`, `features/search`, `features/account`).
- **Repository + Adapter Pattern**: UI components never touch raw APIs or mock data directly. Data flows: `UI` → `Hooks` → `Repository` → `Provider Adapter` → `Mapper` → `Internal Domain Model`.
- **Mock Authentication System**: Complete auth system backed by local storage and pre-seeded user accounts:
  - **Admin**: `admin@example.com` / `admin123`
  - **Customer**: `customer@example.com` / `customer123`
- **State Management**:
  - **Auth & Theme**: React Context
  - **Transient Client & UI State**: Zustand (`uiStore`, `cartStore`, `wishlistStore`, `searchStore`)
  - **Server & Cache State**: TanStack Query (`useProducts`, `useCollections`, `useProduct`)
- **Error Boundaries & Pluggable Logger**: Graceful fallback UI with retry CTA. Logger supports console logging in dev and Sentry in production.
- **Data Loading Pattern**: Consistent `Loading` → `Error` → `Empty` → `Success` pattern across all data-driven pages.
- **Route Classification**: Public, Guest, Protected, and Error routes (`401`, `403`, `404`, `500`, `503`, `offline`).
- **Accessibility & SEO**: Semantic HTML5 tags, screen-reader friendly markup, keyboard navigation, unique page titles and meta descriptions via `react-helmet-async`, `robots.txt`, and `sitemap.xml`.

---

## 📁 Project Structure

```text
c:\Users\djabh\Desktop\Monts\
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── config/              # Global config (navigation, footer, brand, env, seo)
│   ├── features/            # Feature-based business modules
│   │   ├── auth/            # Auth provider, hooks, login/register pages
│   │   ├── products/        # Product cards, grid, PDP, quick view, repository
│   │   ├── collections/     # Collection cards, grid, PLP, repository
│   │   ├── cart/            # Cart drawer, cart page, cart store (Zustand)
│   │   ├── search/          # Search modal, instant predictions, search store
│   │   └── account/         # User profile & order history page
│   ├── shared/              # Reusable UI primitives, layouts, providers, stores
│   │   ├── components/      # Button, Input, Modal, Drawer, Toast, Header, Footer
│   │   ├── layouts/         # RootLayout
│   │   ├── providers/       # AppProviders
│   │   └── store/           # uiStore, wishlistStore
│   ├── services/            # Adapter & Mapper layer
│   │   ├── adapters/        # Mock & Shopify API providers
│   │   └── mappers/         # Shopify GraphQL -> Internal Domain Model mappers
│   ├── mock/                # Seed JSON datasets & latency simulator
│   ├── types/               # Raw Shopify GraphQL types
│   ├── App.tsx              # Router setup & code-splitting
│   └── main.tsx             # Entry point
├── .env.example
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Quick Start & Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Run Type Check & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

4. **Run Unit Tests**:
   ```bash
   npx vitest run
   ```

---

## 🔌 Switching to Shopify Storefront API

To switch from the local mock provider to live Shopify Storefront GraphQL API:

1. Open `.env`:
   ```env
   VITE_API_PROVIDER=shopify
   VITE_SHOPIFY_DOMAIN=your-shop-name.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
   ```

2. That's it! **Zero UI or hook code changes required.** The `productRepository` and `collectionRepository` automatically instantiate `shopifyProductProvider` and `shopifyCollectionProvider`, and the `mappers` convert Storefront GraphQL responses into internal models.
