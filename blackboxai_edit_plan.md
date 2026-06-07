# Edit plan: Home hero sliding images + existing section animations

## Information gathered
- `frontend/index.html` hero section is `#hero` and currently has only text + CTA.
- `frontend/styles/hero.css` sets `#hero` background using a single image: `hero4.png`.
- `frontend/scripts/hero.js` rotates only hero **text** (`#hero h1`). No hero image carousel exists.
- Scroll animations for existing sections/cards already exist via:
  - `frontend/scripts/animations.js` (`initializeScrollAnimations()` with IntersectionObserver)
  - `frontend/styles/animations.css` (`.animate-on-scroll` rules)

## Plan
1. **Hero image slider (no new sections)**
   - Edit `frontend/index.html`: add a small container inside `#hero` for the slider layers.
   - Edit `frontend/styles/hero.css`: style slider container (absolute positioning), add fade transition.
   - Edit `frontend/scripts/hero.js`: implement auto-rotating background image slider (fade between images) using existing assets (e.g. `hero4.png`, `banner.png`, `b4.jpg`, `b7.jpg`, `b10.jpg`, `b17.jpg`, `b18.jpg`). Keep text rotation as-is.

2. **Ensure existing section scroll animations keep working after dynamic product rendering**
   - If needed, make `frontend/scripts/animations.js` re-observe/refresh after products render (products are injected after DOMContentLoaded).
   - Prefer minimal change: confirm `initializeScrollAnimations()` is called post-render (it already is in `home-init.js` and `product-cards-home.js`).

## Dependent files to edit
- `frontend/index.html`
- `frontend/styles/hero.css`
- `frontend/scripts/hero.js`
- (only if required) `frontend/scripts/animations.js`

## Followup steps
- Open `frontend/index.html` in browser and verify:
  - Hero images crossfade smoothly.
  - Hero text rotation continues.
  - Scroll-triggered animations trigger for the existing home sections.
- Check console for errors.

