# XFIT codebase audit

**First audit:** 2026-11-19 on `5219c33`. **Updated:** 2026-11-19 on branch `website-finish` after the final website polish.
Legend: ✅ fixed · ⏳ still open · 🧩 needs info from the owner

---

## 0. Status at a glance

### ✅ Fixed on `website-finish`

| Area | What changed | Commit |
|---|---|---|
| Security | Next.js 16.3.8 → **16.4.6** (critical advisory closed) | `277d682` |
| Phone menu | Close button visible, Escape closes, page locked, focus handled; whole menu fits one screen | `5df3ac0`, `8f998c2` |
| Phone CTA | Sticky **Join XFIT / Call** bar on phones, safe-area aware, never covers the footer | `310647c` |
| Images | 8 photos were PNGs named `.jpg` (~2.3 MB each), now real JPEGs (~205 KB each), same names | `ef4f57d` |
| Reduce Motion | Lenis off, Framer Motion movement off, menus instant, carousel jumps | `cd5df66` |
| Demo data | Dates relative to today: 1001 Active, 1002 Payment due, 1003 Expired; dashboard and scanner agree | `60d668f` |
| Hours | Made-up hours removed; site shows "Closes 8pm" + "Full hours: to be confirmed" from `company.ts` | `de81d30` |
| Domain | `xfit.co.za` removed; one setting `NEXT_PUBLIC_SITE_URL` (`src/lib/site-url.ts`) with Vercel URL fallback | `ce60483` |
| Phone width bug | Hero decorations widened the page to ~547px on phones (browser zoomed out); hero now clips sideways | `30118d1` |
| CSS bug | Global resets were unlayered and beat Tailwind classes (link colours, inline icons); moved to `@layer base` | `6106cce` |
| **Membership** section | 3 plan cards (R300 Best value / R150 / R30), payment line, WhatsApp join buttons | `86a164d` |
| **Trainers** section | 3 marked placeholders + "Private lessons available" | `3f4f5cc` |
| **About** section | Owner-editable copy in `data/about.ts` | `bc16c25` |
| **Contact** section | Address, hours, Call / WhatsApp / Directions / Instagram / Review us, tap-to-load map, WhatsApp enquiry form (stores nothing) | `e4f4214` |
| **Footer** + `/privacy` | Links to every section, contact, hours, member login, privacy, credit; plain-English POPIA notice | `9cf71c2` |
| Navigation | All sections in desktop + phone menus; every link checked; no `href="#"` | `8f998c2` |
| Dashboard | Status dot colour now matches the status | `60d668f` |
| Safari hydration | `format-detection` meta (no auto-linking of phone/dates/addresses); phone always an explicit `tel:+27679340400` link | `4d581e2` |
| Template numbering | All "01 /", "01." style numbers removed (section labels, principles, training list, photo cards, dashboard list) | `686bdf4` |
| SEO | Title "XFIT Extreme Fitness Gym \| Nkowankowa, Tzaneen", local description, Open Graph + Twitter tags, generated share image, favicon + app icons, manifest, `robots.txt`, `sitemap.xml`, canonical per page, member/admin `noindex` | `98f0dc4` |
| Structured data | schema.org `ExerciseGym` JSON-LD (name, address, phone, Instagram, map, price range, payments); hours added automatically once confirmed | `0f13dd0` |
| 404 page | "Wrong turn." page in XFIT style with Back home / Membership / Contact | `1a53dc4` |
| Lighthouse | Hero visible from first paint, deprecated `priority` replaced, Geist Mono no longer loaded, contrast + link-name fixes (Accessibility 97 → 100) | `50d9eb7` |

### ⏳ Still open: public website

| # | Item | Size |
|---|---|---|
| 1 | 🧩 Real content from the owner (see §1) | content |
| 2 | Readability in the **older** sections (hero, header, workout cards): still some 8–9px labels. Lighthouse contrast now passes (100), but bigger labels would read better on phones. | small |
| 3 | Keyboard: desktop mega menu doesn't close on Escape/blur; older components have no custom `focus-visible` styles | small |
| 4 | Carousel end spacing / snapping (WorkoutOptions + GymExperience): add `scroll-padding` and a trailing spacer | small |
| 5 | Image cropping: per-image `object-position` on workout/gym cards; the Training mega menu shows gym photos, not workout photos | small |
| 6 | Hero on phones: big empty gap above the Gym section (`pt-44`) | small |
| 7 | Hero PNG cut-outs are still ~1.5 MB (transparency): convert to WebP; delete unused `hero-athlete-option-2.png` | small |
| 8 | SEO follow-ups: set `NEXT_PUBLIC_SITE_URL` in Vercel once a domain exists (canonical, sitemap, share image and structured data all follow it); add the real opening hours (they then appear in Google's structured data automatically); claim/verify the Google Business listing and submit the sitemap in Google Search Console | small |
| 9 | Performance: Lighthouse's *simulated* mobile score on localhost is 86–91 (it over-penalises the page's JavaScript when everything is local); with real throttling it's 95. Run PageSpeed Insights on the production URL after merging. Further gains would need less JavaScript (e.g. fewer Framer Motion client sections). | medium |
| 10 | `npm audit fix` for the remaining dev-tool advisories (1 high, 7 moderate; lint tooling only, safe, no `--force`) | small |
| 11 | Clean-up: unused packages (`gsap`, `@gsap/react`, `three`, `@react-three/*`, `@types/three`); README is the Create Next App template | small |
| 12 | Without JavaScript, animated sections start invisible (`opacity: 0`) | small |
| 13 | `@zxing/library` (scanner) says it needs Node ≥ 24; local Node is 22 (works, but warns). Check Vercel's Node version setting. | small |

### ⏳ Still open: member / admin (after the website)

| # | Item | Size |
|---|---|---|
| 1 | Stop the camera when leaving `/admin/scan` or logging out | small |
| 2 | Separate (or clearly label) the staff login; route group so portals don't load the marketing site's smooth scrolling | small |
| 3 | Accessibility: `aria-pressed` on the Member/Admin toggle, visible input focus, live region for scan results | small |
| 4 | Real backend on xneelo (SA): database, real authentication, signed/expiring QR codes, check-in log, payments (cash/Yoco/EFT), POPIA-compliant member data. **Needs Marcus's OK** (costs money, real data) | large |
| 5 | Admin tools: member list, add/renew, record payment, attendance reports | large |

---

## 1. 🧩 Placeholders that need real info from the owner

| What | Where to change it | Shown on the site as |
|---|---|---|
| Full opening hours (per day) | `src/data/company.ts` → `hours` | "Closes 8pm" + "Full hours: to be confirmed" |
| WhatsApp number (same as phone 067 934 0400?) | `src/data/company.ts` → `whatsapp.number` (marked `toConfirm`) | All WhatsApp buttons and the enquiry form use 27679340400 |
| Trainer names, specialties, photos (3 cards) | `src/data/trainers.ts` (+ photos in `public/images/trainers/`) | "Trainer name: coming soon", silhouette, "Photo coming soon" |
| Plan descriptions (prices are confirmed) | `src/data/memberships.ts` | e.g. "Train all month. The best way to build a routine." |
| About copy (approve or edit) | `src/data/about.ts` | "Become your best self" section |
| Google listing link (temporary share link) | `src/data/company.ts` → `google.listing` | "Review us on Google" |
| Map / directions pin (check it lands on the gym) | `src/data/company.ts` → `maps.query` | Directions button, "Show map" |
| Privacy notice (owner to review; update before the real member system) | `src/app/privacy/page.tsx` (`lastUpdated`) | `/privacy` |
| Real domain | Vercel env var `NEXT_PUBLIC_SITE_URL` | Site metadata (currently the Vercel URL) |
| Workout photos are cartoon hamster images, not XFIT photos | `public/images/workouts/` (keep exact file names) | "Train your way" carousel |

---

## 2. Checks

| Check | Result (latest commit) |
|---|---|
| `npx tsc --noEmit` | ✅ Pass |
| `npm run lint` | ✅ Pass |
| `npm run build` | ✅ Pass. Routes: `/`, `/_not-found`, `/admin/scan`, `/member/dashboard`, `/member/login`, `/privacy` |
| Phone check (iPhone 13 size, Safari + Chrome engines, Reduce Motion on and off) | ✅ No sideways scroll, no console errors, smooth scroll off with Reduce Motion |
| Link check (`/`, `/privacy`, `/member/login`, all mega menus) | ✅ Every link resolves: section exists / page returns 200 / `tel:` / `https:` |
| Enquiry form | ✅ Opens WhatsApp with the message filled in; nothing written to storage |
| Map | ✅ No requests to Google until "Show map" is tapped |
| Lighthouse (mobile, home page, 3 runs each) | See table below |

| Lighthouse category | Before | After (simulated throttling) | After (real throttling) |
|---|---|---|---|
| Performance | 79–86 | 86–91 | 95 |
| Accessibility | 97 | **100** | |
| Best Practices | 100 | 100 | |
| SEO | 100 | 100 | |

---

## 3. Routes and structure (current)

| Route | What it does |
|---|---|
| `/` | Header → Hero → Gym (`#gym`) → Training (`#training`) → Workouts (`#workouts`) → **Trainers** (`#trainers`) → **Membership** (`#membership`) → **About** (`#about`) → **Contact** (`#contact`) → **Footer** → phone action bar |
| `/privacy` | Plain-English privacy notice (website + member demo) |
| any unknown URL | Custom 404 "Wrong turn." page (real 404 status, noindex) |
| `/opengraph-image`, `/twitter-image` | Generated share image (1200×630) |
| `/icon/32`, `/icon/48`, `/icon/192`, `/icon/512`, `/apple-icon` | Generated XFIT icons |
| `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` | Generated from `src/app/*.ts`, using `NEXT_PUBLIC_SITE_URL` |
| `/member/login` | Member and Admin tabs (demo) |
| `/member/dashboard` | Member stats + QR gym card (demo) |
| `/admin/scan` | Reception QR scanner (demo) |

### Where things live

| Kind | Files |
|---|---|
| Gym facts (single source) | `src/data/company.ts` (address, phone, WhatsApp, hours, payments, Instagram, Google listing, maps), `memberships.ts`, `trainers.ts`, `about.ts`, `gym.ts`, `training.ts`, `workouts.ts`, `seo.ts` (titles/descriptions) |
| SEO | `src/app/layout.tsx` (metadata), `opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`, `components/seo/LocalBusinessJsonLd.tsx`, `lib/brand-image.tsx` |
| Links | `src/data/navigation.ts` (header, phone menu, footer) |
| Helpers | `src/lib/whatsapp.ts` (wa.me links), `src/lib/site-url.ts` (site address) |
| Shared UI | `ui/Container`, `ui/Button` (square XFIT buttons), `ui/SectionHeader` |
| Layout | `layout/Header`, `layout/Footer`, `layout/MobileActionBar` |
| Providers | `providers/SmoothScrollProvider` (Lenis, off with Reduce Motion), `providers/MotionProvider` (Framer `reducedMotion="user"`) |
| Demo (separate from the website) | `src/app/member/*`, `src/app/admin/*`, `src/lib/member-demo.ts`, `src/lib/admin-demo.ts`, `src/data/demo-members.ts` |

### How admin login reaches `/admin/scan` (unchanged)
The Admin tab on `/member/login` (`ADMIN-001` / `9090`) writes `xfit-demo-admin-session` to the browser's localStorage, and `/admin/scan` checks it in the browser. This is **not security**; all demo data (PINs included) ships in the page's JavaScript. Demo only.

### Demo credentials

| Role | Number | PIN | Scanner result |
|---|---|---|---|
| Member | `XFIT-1001` | `2468` | Access approved (due in 12 days) |
| Member | `XFIT-1002` | `1357` | Payment due (5 days overdue) |
| Member | `XFIT-1003` | `8642` | Membership expired (45 days ago) |
| Admin | `ADMIN-001` | `9090` | Opens `/admin/scan` |

---

## 4. Original findings: resolution notes

- **Functional workout image on Vercel:** already fixed in `5219c33` (lowercase file name). Paths and file names all match exactly. `core.ignorecase=true` in this repo, so use `git mv` for case-only renames.
- **GSAP "target null not found":** not possible in this repo; GSAP is never imported.
- **Placeholder links:** ✅ none left. Every "Join XFIT" now lands on the real Membership section.
- **npm audit:** ✅ critical `next` advisory fixed. ⏳ Remaining: `zod` (high) and `minimatch` / `typescript-eslint` (moderate) are dev-only lint tooling; `npm audit fix` (no `--force`) is safe.
- **Image sizes:** ✅ photos ~2.3 MB → ~205 KB each (18.8 MB → 1.65 MB total). ⏳ Hero PNGs unchanged.
