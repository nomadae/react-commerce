# Persistence Options for Site Configuration

## Context

This document evaluates options for persistently storing the **UI/site configuration**
(color, typography, carousel images, logo, content) so it can be edited by an admin and
applied to the storefront.

### Relevant facts about this project

- **React Router app** with both a **server runtime** and a **client runtime**. This matters:
  config can be persisted **server-side** (shared by all users, pre-rendered in SSR) or
  **client-side** (per-browser).
- Runs on **mock data** — there is no real database or wired backend yet
  (`app/api/client.ts` points at a placeholder `https://api.example.com`).
- Auth uses **sessionStorage** (mock mode) and **Google OIDC**.
- The mock auth service **already seeds an `admin@techstore.com` / `admin123` user**, so
  admin gating already has a starting point.

### The core framing question

> **Do you want the customization to be *global* (same for every visitor — site branding)
> or *per-user / per-device* (each visitor's own preferences)?**

- **Site-level branding** (logo, colors, carousel, footer text) must be **server/shared**
  persistence. **Cookies and localStorage are the wrong source of truth** for this — they
  are per-browser.
- **Per-user personalization** (a specific user's theme prefs) is where localStorage/cookies
  make sense.

---

## Option-by-Option Comparison

### 1. Cookies

Store the config (or a config ID/version) in an HTTP cookie, read on server or client.

**Advantages**
- Available on both **server and client** (sent with every request) — good for SSR.
- No extra storage layer needed; trivial to implement.
- Can persist a "config version" or small per-device overrides.

**Disadvantages**
- **~4KB limit** per cookie — too small for logo/carousel URLs and rich content. Realistically
  only fits a version hash or small values.
- Sent with **every HTTP request**, wasting bandwidth.
- **Per-browser, not shared across users** — wrong for global branding.
- **Security**: vulnerable to XSS theft; must mark `HttpOnly` (which then can't be read in JS)
  and `Secure`; expiry/logout management.

**Best for:** Persisting a **config version/reference**, per-device preferences, A/B bucket
assignment — not the source of truth for site branding.

---

### 2. Browser Storage — `localStorage` / `sessionStorage`

Store the config object (or a reference) in the browser between sessions (localStorage) or per
tab (sessionStorage). The project already uses `sessionStorage` for mock auth.

**Advantages**
- Very simple, zero backend.
- Larger limit than cookies (~5–10MB) — fits config JSON easily.
- Client-side, instant reads with no network round-trip.
- Great for **draft/preview** while editing a theme.

**Disadvantages**
- **Per-browser/per-device only** — not global; the admin cannot push to all visitors.
- **Client-side only** — cannot be read server-side for SSR/first paint; causes a flash of the
  default theme before hydration.
- Lost on clearing browser data; no shared source of truth.
- **No access control** — any user can read/modify their own storage.

**Best for:** Client-side **preview/draft**, per-user personalization, or local caching of
config fetched from the server.

---

### 3. Database Table (e.g., SQLite / PostgreSQL / MySQL — a `site_config` table)

A dedicated table (or key-value store) holding the config as columns
(`site_name`, `font`, `colors JSON`, `hero_slides JSON`, `content JSON`) or a single JSON blob row.

**Advantages**
- **Single global source of truth** — one config for all visitors. ✅ Best fit for branding.
- **Access control** — server-side enforcement of admin-only writes.
- **Strong integrity**: versioning (`version`, `updated_at`), audit trail, transactions,
  backup/recovery.
- **SSR-friendly** — a server loader fetches and injects config into the initial HTML
  (no theme flash).
- Scales with a Redis cache in front; multi-instance safe.

**Disadvantages**
- Requires a **database to be provisioned** — currently none exists, adding setup/infra
  (trivial with SQLite to start).
- Slightly more code: schema + repository/service layer + loader.
- Schema changes needed when adding fields (or use a JSON blob column to avoid migrations).
- Somewhat overkill for a tiny, rarely-changing config.

**Best for:** **The recommended production-grade choice** for global site branding/config.

---

### 4. JSON File (config-as-code, on server filesystem or repo)

Store config in `site.config.json` (or YAML), loaded by the server; admin writes update the file.

**Advantages**
- Dead simple — no database, no schema.
- **Versionable in Git** — diffs, review, rollback, audit.
- Fast, predictable, SSR and static-generation friendly.
- Great as a **default/seed** config and for env-specific overrides.

**Disadvantages**
- **Concurrency/race conditions** — simultaneous admin writes can clobber each other.
- **Multi-instance / containerized prod** — file writes not shared across instances; needs a
  mounted volume or rebuild pipeline.
- No access control beyond filesystem permissions; server process needs write access
  (problematic in read-only/ephemeral environments).
- Not queryable; limited audit/history without extra tooling.

**Best for:** Small projects, **MVP**, config-as-code workflows, **default/seed** overlaying a
database. Excellent starting point given the project is mock-based.

---

### 5. Redis / in-memory key-value store

Store config under a key (e.g., `site:config`) in Redis; server reads on request, admin writes.

**Advantages**
- **Extremely fast** reads (sub-ms) — great for high-traffic reads and "live preview".
- Good for **caching** a DB/file config and avoiding repeated DB hits.
- TTL support for versioned configs.

**Disadvantages**
- **In-memory / ephemeral** — data is lost on restart unless a DB/file backs it. Not a durable
  source of truth on its own; it's a cache.
- Adds another infrastructure component.
- No built-in access control or query semantics.

**Best for:** A **caching layer** on top of a database/file — not the primary store.

---

### 6. Headless CMS (Strapi, Sanity, Contentful, WordPress-style)

Dedicated content-management system storing and serving config/content via an API.

**Advantages**
- **Built-in admin UI** — the CMS handles forms, image upload, roles, versioning, publishing.
- **Media handling** — logo/carousel upload, storage, CDN included.
- Roles/permissions, workflows, draft/publish, audit history out of the box.
- Non-technical staff can edit content.

**Disadvantages**
- **Heaviest integration** — external dependency, hosting cost, API/connector work.
- CMS UI is **generic**; may still require customization to match brand/UX.
- Overkill for a handful of colors/text fields; adds a third-party contract/dependency.

**Best for:** Larger projects needing rich content editing and multiple editors — likely
overkill here.

---

### 7. Environment Variables / Build-time Static Config

`NODE_ENV`, `VITE_*` env vars, or build-time constants injected at deploy time.

**Advantages**
- Simple, versionable, deploy-specific (separate themes per environment).
- No runtime storage cost; default config location.

**Disadvantages**
- **Not editable at runtime** by an admin — requires a redeploy to change. Only suitable for
  defaults, not dynamic admin customization.

**Best for:** **Default/fallback config** and environment-specific overrides — not dynamic editing.

---

## Summary Matrix

| Option | Global (all users) | Runtime editable by admin | SSR-friendly | Durability | Setup effort | Best for |
|---|---|---|---|---|---|---|
| **Cookies** | ❌ | Partial | ✅ | Depends | Trivial | Version ref, per-device prefs |
| **localStorage / sessionStorage** | ❌ | ✅ (local only) | ❌ | Per-device | Trivial | Preview/draft, personal prefs |
| **Database table** | ✅ | ✅ | ✅ | ✅ Excellent | Medium | **Production global config** |
| **JSON file** | ✅ | ✅ | ✅ | ✅ (with volume) | Low | **MVP / config-as-code** |
| **Redis** | ✅ | ✅ | ✅ | ❌ ephemeral | Medium | Caching layer |
| **Headless CMS** | ✅ | ✅ (built-in UI) | ✅ | ✅ Excellent | High | Rich content editing, multi-editor |
| **Env vars** | ✅ | ❌ | ✅ | ✅ | Low | Defaults/overrides only |

---

## Recommendation for this project

Given the current state (mock data, no DB, existing `admin@techstore.com` seed, React Router
with server loaders), a **layered strategy** starting simple and hardening over time is best:

### Phase 1 (MVP) — JSON file / config-as-code + localStorage preview
- Keep a `site.config.json` as the **default/seed** config.
- Use browser storage for **live draft preview** while the admin edits (config doesn't commit
  until saved, and previews feel instant).
- Matches the project's mock-first philosophy; **requires zero infrastructure**.

### Phase 2 (Production) — Database table + Redis cache
- Add a `site_config` table (structured columns for colors/content/hero slides, plus `version`
  and `updated_at`).
- Server loader fetches and injects config during SSR — **no theme flash** for visitors.
- Optionally cache the row in **Redis** with a short TTL / version bump on save.
- Since no DB exists yet, prefer **SQLite** for low overhead first, then Postgres when deployed
  as a real service.

### What to avoid as the source of truth
- **Cookies & localStorage** for *global* branding (they are per-device) — use them only for
  preview or per-device concerns.
- **Redis alone** (ephemeral; not durable).

---

> **Status:** Analysis documented. Decision on the layered approach is recommended before
> implementation.
