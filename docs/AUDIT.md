# XFIT codebase audit

**Date:** 2026-11-19 · **Branch:** `website-finish` (same commit as `main`: `5219c33`) · **No app code was changed for this audit.**

---

## 1. Checks

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Pass, no errors |
| `npm run lint` | ✅ Pass, no warnings |
| `npm run build` | ✅ Pass. All 5 routes are built as static pages: `/`, `/_not-found`, `/admin/scan`, `/member/dashboard`, `/member/login` |

---

## 2. Routes

| Route | File | What it does |
|---|---|---|
| `/` | `src/app/page.tsx` | Public home page: Header, Hero, GymExperience, TrainingApproach, WorkoutOptions, then **three empty placeholder sections** (`#membership`, `#about`, `#contact`) |
| `/member/login` | `src/app/member/login/page.tsx` | Login screen with **two tabs, Member and Admin**. Member goes to `/member/dashboard`; Admin goes to `/admin/scan`. Shows the demo credentials on screen. |
| `/member/dashboard` | `src/app/member/dashboard/page.tsx` | Member's status, next payment date, visit stats, a QR "gym card" and recent check-ins. Sends you back to login if no member is "logged in". |
| `/admin/scan` | `src/app/admin/scan/page.tsx` | Reception scanner. Uses the phone/laptop camera (`@zxing/browser`) to read the member QR, or a manual member-number lookup, plus three test buttons. Shows Access approved / Payment due / Inactive / Invalid. |
| `/_not-found` | Next.js default | Default 404 page, not branded |

There is **no** `/admin/login`, no footer, no sitemap/robots file, no branded 404 and no Open Graph image.

### How admin login really connects to `/admin/scan`

1. On `/member/login`, click the **Admin** tab and enter `ADMIN-001` / `9090`.
2. `demoAdminLogin()` (`src/lib/admin-demo.ts:12`) compares this to a hard-coded admin. If it matches, it writes `xfit-demo-admin-session = "admin-001"` into the browser's **localStorage** and the page redirects to `/admin/scan`.
3. `/admin/scan` reads that localStorage value in the browser (`getCurrentDemoAdmin()`). If it's missing, it redirects to `/member/login` (`src/app/admin/scan/page.tsx:124`).
4. Logout removes the key.

This is **not real security.** Anyone can type that value into the browser's developer tools, and all member records, PINs included, are shipped inside the page's JavaScript. That's fine for a demo but must never be used with real data. The member session works the same way, with the key `xfit-demo-member-session`.

---

## 3. Components and data

### Public website

| File | What it does | Status |
|---|---|---|
| `components/layout/Header.tsx` | Transparent header over the hero; desktop nav with hover "mega menus" (Gym, Training, Membership) showing image cards; "Members" link; red **Join XFIT** button; full-screen mobile menu | Built. Has bugs (see §5, §6) |
| `components/sections/Hero.tsx` | Red/black hero, animated "EXTREME FITNESS STARTS HERE /" headline, athlete cut-out image, "Join XFIT" text link, hours strip, "Explore" scroll link | Built |
| `components/sections/GymExperience.tsx` (`#gym`) | "Built for real work" heading and 3 image cards (The Gym / The People / The Energy); swipeable on mobile, grid on desktop. Data: `data/gym.ts` | Built |
| `components/sections/TrainingApproach.tsx` (`#training`) | Light section: "Show up. Put in the work. Leave stronger." and 3 principles. Data: `data/training.ts` | Built |
| `components/sections/WorkoutOptions.tsx` (`#workouts`) | "Train your way" horizontal carousel of 5 workout cards with arrows and a progress bar. Data: `data/workouts.ts` | Built. Spacing issue (§5) |
| `components/providers/SmoothScrollProvider.tsx` | Lenis smooth scrolling for the whole site, including the portals | Built. Ignores reduced motion |
| `components/ui/Container.tsx` | Max-width 1440px wrapper with side padding | Used everywhere |
| `components/ui/Button.tsx` | Rounded button/link, with variants | **Not used anywhere** |
| `data/company.ts` | Name, phone, address, hours, Instagram, Google Maps link | **Not used anywhere.** Hours in it are guesses |
| `data/navigation.ts` | Nav links | **Not used.** Header has its own copy (`desktopLinks`) |

### Do these sections exist?

| Section | Exists? |
|---|---|
| **Trainers** | ❌ No. No component, no data, no images. |
| **Membership / pricing** | ❌ Only an empty dark block (`<section id="membership">`, `page.tsx:20`). No prices anywhere in the code. Every "Join XFIT" button points here. |
| **About** | ❌ Only an empty white block (`page.tsx:26`). |
| **Contact** | ❌ Only an empty dark block (`page.tsx:32`). The phone, address, Instagram and map link exist in `company.ts` but aren't shown anywhere on the site. |

### Member/admin demo

| File | What it does |
|---|---|
| `data/demo-members.ts` | 3 sample members (with PINs) and lookup helpers |
| `lib/member-demo.ts` | Member login/logout via localStorage; builds and reads the QR text (`{"type":"xfit-member-access","version":1,"memberId":"…"}`) |
| `lib/admin-demo.ts` | Hard-coded admin login/logout via localStorage |

### Unused files and packages

- `public/images/hero/hero-athlete-option-2.png` (1.4 MB) is not used.
- `.site-section` CSS class in `globals.css` is not used.
- npm packages installed but never imported: `gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`. They don't slow the site (unused code isn't shipped) but they slow installs and add audit noise.
- `README.md` is still the Create Next App template. `src/app/favicon.ico` appears to be the default Next.js icon.

---

## 4. Complete / partial / demo-only

| Complete | Partial | Demo-only |
|---|---|---|
| Hero | Header (mobile menu close bug, keyboard issues) | Member login |
| Gym Experience section | Workout carousel (end spacing) | Member dashboard and QR card |
| Training Approach section | SEO metadata (no OG image, sitemap or robots; `metadataBase` is `xfit.co.za`, domain ownership not confirmed) | Admin login (tab on member login page) |
| Workout cards (content) | Opening hours shown on site (made up, not confirmed) | Admin scanner `/admin/scan` |
| | | All member data, sessions, check-ins |
| **Missing:** Membership/pricing, About, Contact, Trainers, Footer, branded 404 | | |

---

## 5. Demo credentials that actually work

Login is at `/member/login`. Member numbers aren't case-sensitive.

| Role | Number | PIN | What you'll see |
|---|---|---|---|
| Member | `XFIT-1001` | `2468` | Mpho Nkuna. Dashboard says **Active**, but see the bug below |
| Member | `XFIT-1002` | `1357` | Karabo Malatji, payment due |
| Member | `XFIT-1003` | `8642` | Lerato Hlungwani, inactive |
| Admin | `ADMIN-001` | `9090` | Opens `/admin/scan` |

⚠️ **Demo bug:** XFIT-1001's payment date is `2026-10-28`, which has now passed. The scanner checks the date, so it now shows **"Payment due"** for the "Active" member, including the "Active" test button. Meanwhile the dashboard still says "Active" with a green "Valid" dot. **No demo member currently scans as approved.** Fix: move the sample dates forward, or calculate them relative to today.

---

## 6. Bugs

### 6.1 Functional workout image on Vercel
- **In the code it is already fixed.** Commit `5219c33` renamed `Functional.jpg` to `functional.jpg` and deleted a stray `image copy.png`. Git, the file on disk and `data/workouts.ts:20` now all say `functional.jpg` (lowercase). The latest production deploy (GitHub deployment record, 2026-10-03) is that commit.
- I couldn't load the Vercel URL to confirm, because it's behind Vercel login protection.
- **If it's still broken on Vercel:** check that the deployment you're viewing was built from `5219c33` or later, then redeploy. Note this repo has `core.ignorecase=true`, so future case-only renames must use `git mv`.

### 6.2 All image paths vs real files
All 18 image references match the real files exactly, case included:

| Used in | Path | File exists (exact case)? |
|---|---|---|
| Hero, Login | `/images/hero/hero-athlete.png` | ✅ |
| gym.ts, Header (×3 each) | `/images/gym/gym-01.jpg`, `gym-02.jpg`, `gym-03.jpg` | ✅ |
| workouts.ts | `strength.jpg`, `cardio.jpg`, `functional.jpg`, `conditioning.jpg`, `free-weights.jpg` | ✅ |

**Hidden problem:** every `.jpg` file is actually a **PNG** inside (checked with `file`). They work because Next.js detects the real type, but they're about 10× bigger than they need to be (see §8).

**Content problem:** the Header's "Training" mega menu cards (Strength / Cardio / Functional) show the **gym** photos, not the workout photos (`Header.tsx:63-75`).

### 6.3 Placeholder and broken links
- No `href="#"` links exist.
- **Every "Join XFIT" button** (header `Header.tsx:355`, mobile menu `:697`, hero `Hero.tsx:209`) and the Membership mega menu go to `#membership`, which is an **empty section**. Same for `#about` and `#contact`, including "Visit XFIT" and "Talk to us" in the mega menu.
- No phone (`tel:`), WhatsApp, Instagram or Google Maps links are shown anywhere, even though the data exists in `company.ts`.

### 6.4 GSAP "target null not found"
**Not in this repo.** GSAP is installed but never imported, so that warning can't come from this code. If you see it in the browser, it's coming from somewhere else (another project or an old deploy). The package can be removed.

### 6.5 Workout carousel last-card spacing
`WorkoutOptions.tsx:125-144`: the scrolling row relies on `px-5 / md:px-8 / xl:px-[…]` padding for its edges, with `snap-x snap-mandatory` and `snap-start` cards.
- Some browsers (notably Safari/iOS) drop the **right-hand padding** of a scrolling flex row, so the last card ends flush against the screen edge with no gap.
- There's no `scroll-padding`, so after you scroll, cards snap to the very left edge instead of lining up with the 20px page gutter. The first card has a gutter and the rest don't.
- **Fix (small):** add matching `scroll-px-*` to the track, plus a trailing spacer (e.g. an empty `shrink-0` element as wide as the padding) after the last card. The same pattern in `GymExperience.tsx:89` needs the same fix.

### 6.6 Other bugs found
1. **Mobile menu close button is hidden** (`Header.tsx:152` and `:611`). The header has `z-50`, so its X button (`z-[70]`) can't rise above the full-screen menu (`z-[60]`), which covers it. Once the menu is open, the only way out is tapping a link. There's no Escape key either. *(Strongly indicated by the code; confirm on a phone.)*
2. **Admin camera keeps running** after you log out or leave `/admin/scan`. There's no cleanup that stops the camera when the page closes (`admin/scan/page.tsx:166`).
3. **Dashboard "Valid" dot is always green**, even when the text says "Check membership" (`member/dashboard/page.tsx:346`).
4. **Opening hours are made up.** "Mon–Fri 06:00–20:00, Sat 07:00–14:00" is hard-coded in `Hero.tsx:235` and `Header.tsx:664`, and Sunday "Closed" is in `company.ts`. Only "closes 8pm" is confirmed.
5. `next/image` `priority` is deprecated in Next 16 (`Hero.tsx:114`, `member/login/page.tsx:95`). Use `preload` (or `loading="eager"`).
6. Member/admin pages aren't marked `noindex`, so Google may index the login and dashboard.

---

## 7. Mobile

| Area | Finding |
|---|---|
| **Navigation / menu** | The hamburger opens a nice full-screen menu, but the **X close button is covered** (§6.6.1). There's no focus trap and no Escape key. The hours shown in the menu are unconfirmed. |
| **Hero image bleed** | On purpose, the hero has `overflow-visible` and the athlete is pushed below the hero (`bottom-[-4%]` to `-12%`) and off the right edge (`right-[-18%]` on phones). The page doesn't scroll sideways because `body { overflow-x: clip }`. Side effects: (a) the next section needs a huge top padding (`pt-44` = 176px) to make room, which leaves a big empty gap on phones; (b) the athlete layer (`z-[20]`) is **above** the hero text (`z-10`), so on narrow phones it can sit over the headline, paragraph and the "Explore" link. *(Visual check needed.)* |
| **Image cropping** | Workout photos are landscape (1448×1086) but the cards are tall and narrow (82vw × 440px), so `object-cover` cuts off about half of each photo's width, always from the centre. Set an `object-position` per image, or use portrait crops. `gym-02.jpg` (landscape) has the same problem in its tall card. |
| **Carousel** | Swiping works (native scroll, `snap-x`). End spacing problem (§6.5). The arrows are 48px (good tap size). The "Swipe →" hint is 8px text. |
| **Text sizes** | Many labels are **8–10px**: hero eyebrow, hours strip, card numbers, "Swipe", desktop nav links (9px), login field labels (9px). That's too small to read comfortably on a phone. Body copy is 11–13px (workout card descriptions 11px). Headlines are big and good. |
| **Call-to-action visibility** | On phones the red **Join XFIT** button is hidden from the header (`lg:flex` only). It only appears inside the hamburger menu. The only CTA you can see in the hero is a small underlined 10px "Join XFIT" text link, and it leads to an empty section. There's no call or WhatsApp button. **The main CTA is weak on mobile.** |

---

## 8. Performance

- **`public/` is about 26 MB**, all images:
  - 8 photos at **2.2–2.5 MB each**: PNGs renamed `.jpg`, 1086–1449px wide
  - 2 hero PNGs at **1.4–1.5 MB** (one unused)
- `next/image` resizes them and converts them to WebP/AVIF on Vercel, so visitors get smaller files. But the first load of each size is slow, every resize counts toward Vercel's image-optimisation allowance, and the Git repo carries the weight.
- **Fix:** convert the photos to real JPEG/WebP at about 1600px and quality 80 (≈150–300 KB each). Convert the hero cut-out to WebP with transparency (≈150–250 KB). Delete `hero-athlete-option-2.png`.
- The mega menu hover loads 3 gym images (lazy-loaded, fine). The hero image is preloaded (correct).
- Unused heavy packages: three.js, react-three, GSAP (§3). They don't ship to visitors, so no runtime cost.
- Lenis runs an animation loop on every page, including the portals.

## 9. Accessibility

| Area | Finding |
|---|---|
| **Alt text** | Good on gym and workout cards. Hero/login athlete has `alt=""` (decorative, fine). Mega menu card images have `alt=""` but their links have visible text (fine). The decorative "X" and "FIT" are `aria-hidden` ✅. The hero `<h1>` has an `aria-label` ✅. |
| **Contrast** | Lots of low-contrast small text. White at 30–45% opacity on near-black (≈ 2.5–3.5:1), e.g. `text-white/35`, `/40`, `/45`. Black at 35–45% on cream in the Training section. Combined with 8–10px sizes, this **fails WCAG AA** (needs 4.5:1). The red labels are OK. |
| **Keyboard focus** | There are no custom focus styles; the browser default outline is the only indicator. Login and scanner inputs use `outline-none` with only a border colour change. The desktop mega menu opens on focus but doesn't close on Escape or blur. The mobile menu has no focus trap or Escape and its close button is covered. The Member/Admin toggle buttons have no `aria-pressed`. |
| **Reduced motion** | Partly done. CSS animations (Join button pulse, scanner line) and CSS transitions respect it (`globals.css:116`, `:261`, `:288`). **Not respected:** all Framer Motion animations (hero reveal, scroll-in sections, mega menu, mobile menu) and Lenis smooth scrolling. Fix: wrap the app in `<MotionConfig reducedMotion="user">` and skip Lenis when reduced motion is on. |
| **No-JS** | Sections that animate in start at `opacity: 0`, so without JavaScript that content stays invisible. |

---

## 10. `npm audit` (9 vulnerabilities: 1 critical, 1 high, 7 moderate). Not fixed.

| Package | Severity | Used by | Safe to fix? |
|---|---|---|---|
| **`next` 16.3.8** | **Critical** | The site itself | **Yes, recommended.** Five advisories: RCE in Image Optimization with SVG files, DoS via Server Actions, and three `use cache` issues. This site uses no SVG images, Server Actions or `use cache`, so real-world risk today is low, but it should still be patched. The fix is `16.4.6`, a **minor** upgrade in the same major version. `next` is pinned exactly (`"16.3.8"`), so `package.json` must be edited: set `next` **and** `eslint-config-next` to `16.4.6`, run `npm install`, then tsc, lint and build. Low risk of breakage. |
| `zod` 4.6.5 | High | Only the lint tooling (`eslint-plugin-react-hooks`) | **Yes, safe.** `npm audit fix`. Never runs on the website. |
| `minimatch`, `typescript-eslint`, `@typescript-eslint/*` (7) | Moderate | Only the lint tooling | **Yes, safe.** `npm audit fix` (no `--force`). Dev-only. |

**Don't** run `npm audit fix --force`. Do the `next` bump by hand as described, so the two Next packages stay in step.

---

## 11. Prioritised fix list: finish the PUBLIC WEBSITE first

| # | Fix | Size |
|---|---|---|
| 1 | **Confirm the real opening hours** with the gym, put them in `company.ts`, and make the Hero and Header read from there instead of hard-coding them | small |
| 2 | **Build the Membership / Pricing section** (`#membership`): Monthly R300, Weekly R150, Day pass R30; payment by cash, Yoco card, EFT; clear "Join" / "Call us" actions. Every Join button already points here. | medium |
| 3 | **Build the Contact section** (`#contact`): address, tap-to-call 067 934 0400, Instagram, "Get directions" (Google Maps link already in `company.ts`), hours | medium |
| 4 | **Fix the mobile menu close button** (z-index), and add Escape-to-close plus focus handling | small |
| 5 | **Build the About section** (`#about`), using existing images and copy style | medium |
| 6 | **Add a footer**: logo, address, phone, hours, Instagram, quick links, member login | medium |
| 7 | **Stronger mobile CTA**: a visible Join/Call button on phones (in the header bar or hero, e.g. a sticky bottom bar), red-and-black style | small |
| 8 | **Compress and convert images** (real JPEG/WebP, ~200 KB each) and delete the unused hero option. Keep the same file names, or update the paths exactly (case!). | small |
| 9 | **Patch Next.js** to 16.4.6 (+ `eslint-config-next`) and run `npm audit fix` for the dev tools | small |
| 10 | **Reduced motion**: `MotionConfig reducedMotion="user"`; turn off Lenis when reduced motion is on | small |
| 11 | **Fix carousel end spacing and snapping** (WorkoutOptions + GymExperience) | small |
| 12 | **Readability**: raise 8–9px labels to at least 11–12px, raise low-opacity text to pass contrast, add visible `focus-visible` styles | medium |
| 13 | **Hero on phones**: check the athlete doesn't cover the headline/CTA, and reduce the big gap above the Gym section | small |
| 14 | **Image cropping**: per-image `object-position` for workout/gym cards. Use the workout photos in the Training mega menu | small |
| 15 | **Decide on a Trainers section**: needs real names/photos from the gym first | medium (content-dependent) |
| 16 | **SEO basics**: confirm the domain (`metadataBase` says `xfit.co.za`), add an OG image, `sitemap.ts`, `robots.ts`, local business structured data (address/phone/hours), XFIT favicon, branded 404 | medium |
| 17 | **Clean-up**: use or remove `Button.tsx` and `navigation.ts`; remove unused packages (gsap, three, react-three); replace the template README | small |

## 12. Member / admin fix list (after the website)

| # | Fix | Size |
|---|---|---|
| 1 | Fix demo dates so XFIT-1001 scans "Access approved" again (dates relative to today) | small |
| 2 | Stop the camera when leaving `/admin/scan` or logging out | small |
| 3 | Dashboard: status dot colour should match the status; "Active" should also check the due date, the same as the scanner | small |
| 4 | Mark `/member/*` and `/admin/*` as `noindex` | small |
| 5 | Separate the admin login from the member login page (or label it clearly as staff-only), and use a route group so portals don't load the marketing site's smooth scrolling | small |
| 6 | Accessibility: `aria-pressed` on the Member/Admin toggle, visible focus on inputs, live region for scan results | small |
| 7 | **Real backend on xneelo (SA)**: database, real staff/member authentication (server-side sessions, hashed PINs/passwords), signed or expiring QR codes (today's QR just contains the member ID and can be copied), check-in logging, payment status updates (cash/Yoco/EFT), POPIA-compliant handling of member data. *Needs your OK before anything that costs money or uses real member data.* | large |
| 8 | Admin tools beyond scanning: member list, add/renew member, record payment, attendance reports | large |
