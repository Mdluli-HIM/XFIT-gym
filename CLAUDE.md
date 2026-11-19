@AGENTS.md

# XFIT – Extreme Fitness Gym

Website and member system for **XFIT-Extreme Fitness Gym**, Nkowankowa, Limpopo.
This is an EXISTING Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 project.
**Continue it, never rebuild it.** Read `docs/AUDIT.md` for the current state and the fix list.

## What the project is

1. **Public marketing website**: `/` (home page built from sections in `src/components/sections/`).
2. **Member and admin demo**:
   - `/member/login`: member login, plus an "Admin" tab for staff
   - `/member/dashboard`: member stats and a digital QR gym card
   - `/admin/scan`: reception scanner that reads the member QR and shows valid / payment due / inactive

   This part is **front-end only**: sample members in `src/data/demo-members.ts`, "sessions" in the browser's
   localStorage (`src/lib/member-demo.ts`, `src/lib/admin-demo.ts`). It is not secure and must never hold
   real member data. The real backend will later run on a **xneelo cloud server in South Africa**.

## Real gym details (source of truth)

- Name: XFIT-Extreme Fitness Gym
- Address: B, 2946 Tambo St, Nkowankowa, 0870 (Limpopo)
- Phone: 067 934 0400 (+27 67 934 0400)
- Hours: closes 8pm. **Opening hours per day are still to be confirmed.** Don't invent hours or show
  unconfirmed ones as fact. The site shows "Closes 8pm" + "Full hours: to be confirmed" from the single
  `hours` entry in `src/data/company.ts`.
- Instagram: @xfitextremefitness
- Memberships: Monthly **R300**, Weekly **R150**, Day pass **R30**
- Payments: cash, Yoco card, EFT

Keep these in `src/data/company.ts` and read them from there. Don't hard-code them in components.

## Site URL / domain

We do **not** own `xfit.co.za`; never use it. The site address comes from one setting,
`src/lib/site-url.ts`: the `NEXT_PUBLIC_SITE_URL` environment variable (set it in Vercel once the real
domain exists), falling back to Vercel's own URL, then `http://localhost:3000`.

## Rules

- Keep the red-and-black XFIT identity, the hero, the big uppercase type, and the existing components,
  data files and images.
- Reuse components (`src/components/ui/`, `src/components/sections/`) instead of duplicating them.
  Content belongs in `src/data/`.
- Keep the public website and the member/admin portals separate in the code
  (public: `src/components/sections`, `src/components/layout`; portals: `src/app/member`, `src/app/admin`,
  `src/lib/*-demo.ts`).
- Respect `prefers-reduced-motion` for CSS animations, Framer Motion and Lenis smooth scrolling.
- This Next.js version has breaking changes. Check `node_modules/next/dist/docs/` before using an API
  (for example, `next/image` `priority` is deprecated in favour of `preload`).

## Git rules

- **Never commit to `main`.** Work on branches (current: `website-finish`).
- Vercel preview deployments are used to check work.
- Merge to `main` only with Marcus's OK.
- Commit after each logical step with a clear message.
- Before every commit, all three must pass:
  ```bash
  npx tsc --noEmit
  npm run lint
  npm run build
  ```

## Image paths are case-sensitive

Vercel runs on Linux, where `Functional.jpg` and `functional.jpg` are different files. macOS is not
case-sensitive, so a mismatch works locally and breaks in production. Always match file names exactly,
and use lowercase-kebab-case for new files. This repo has `core.ignorecase=true`, so to rename only the
case of a file use `git mv old New` (or a two-step rename); a normal rename won't be recorded.

## Working style

- Explain results in plain English for a non-developer.
- No before/after screenshots unless asked.
- Ask first before anything that costs money, touches real member data, or can't be undone.
- Never ask for passwords or API keys in chat.
