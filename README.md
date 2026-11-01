# AURUM — A Stay Refined, After Dark

A single-page, production-quality reservation experience for **AURUM** — a
boutique hotel of composed nights, curated rooms and suites, honest nightly
rates, and a concierge on watch through the night.

Guests can explore rooms and suites, review nightly rates, and reserve a stay
with a transparent total — no hidden fees, no resort charges.

The hero is a faithful reuse of the AURUM hero landing page: the same authored
WebGL scene, the same entrance reveals, scroll choreography and typography —
re-hosted in a React + Vite app.

## Concept

* "A stay refined, after dark."
* A boutique hotel for travelers who measure a city by the quality of their rest.
* Curated rooms, honest nightly rates, and a concierge on watch through the night.
* Hospitality composed from arrival to departure.

## How the AURUM hero is reused

Instead of re-implementing the WebGL scene, the app assembles a **`srcDoc`**
document at runtime from the original authored source (`src/assets/aurum/aurum.html`):

1. The external `<script src="secret-pathways-assets/three.min.js">` is replaced
   with an inline `<script data-threeui-three-runtime>` containing the raw Three.js
   runtime (`?raw` import of `src/assets/aurum/three.min.js`), so the scene runs
   inside the sandboxed `srcDoc` iframe without any file access.
2. A small capture-phase click bridge is injected before `</body>` so the hero
   preview CTA (`.peek`) forwards activation to the parent window:
   `postMessage({ liquidMetalButton: { type: 'activate', source: 'explore' } })`.
3. The `<section class="hero" id="hero">…</section>` block is swapped for
   `HERO_MARKUP` (`src/lib/heroMarkup.ts`), the AURUM-adapted hero markup.

The iframe (`src/components/LivingWorldHero.tsx`) renders the assembled document with
`sandbox="allow-scripts allow-same-origin"` and the full authored behaviour — WebGL
scene, entrance reveals, scroll choreography — is preserved. `prefers-reduced-motion`
is honoured by the original code untouched.

## Reservation flow (React)

* The hero preview CTA (`.peek`) posts an activation with `source: "explore"` → the
  parent window opens the reservation modal.
* The reservation modal (`src/components/BookingModal.tsx`) covers check-in,
  check-out, guests, room type and room count, and computes a transparent total
  (nightly rate × nights × rooms, no hidden fees).

## Tech

* Vite 6 + React 19 + TypeScript (strict)
* Three.js runtime inlined via `?raw`
* Onest font + live WebGL assets under `public/secret-pathways-assets/`

## Develop

```bash
npm install
npm run dev     # dev server
npm run build   # tsc -b && vite build
npm run preview # serve the production build
```

## Structure

```
src/
  assets/aurum/            AURUM source HTML + Three.js runtime (raw imports)
  lib/aurum.ts             Assembles the srcDoc from the AURUM source
  lib/heroMarkup.ts        AURUM hero markup (generated from the AURUM source)
  components/LivingWorldHero.tsx  Iframe hosting the assembled hero + postMessage bridge
  components/BookingModal.tsx     Reservation flow + transparent total
public/
  secret-pathways-assets/  Fonts (inlined), Three.js, WebGL plates
```