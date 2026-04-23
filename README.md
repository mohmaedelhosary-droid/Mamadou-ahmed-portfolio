# Mohamed Ahmed — Cinematic Portfolio

Premium scroll-storytelling portfolio built with **Next.js + Tailwind + GSAP ScrollTrigger**.

## Tech
- Next.js (App Router)
- React
- Tailwind CSS
- GSAP + ScrollTrigger

## Sections
1. Hero
2. About Me (blur-to-clear reveal)
3. Services
4. Featured Project
5. Before/After Image transformation (scroll reveal + ambient background shift)
6. Before/After Video transformation (scroll reveal)
7. Color Grading Showcase
8. Editing Techniques
9. Selected Work / Motion Highlights
10. Contact

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
data/
  content.ts          # Easy-to-edit content
hooks/
  useGsap.ts          # GSAP + ScrollTrigger helper
public/assets/
  images/             # Put local image assets here
  videos/             # Put local video assets here
```

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Updating Assets
Update video/image paths in `app/page.tsx`:
- `/assets/videos/hero-city.mp4`
- `/assets/videos/featured-bedroom.mp4`
- `/assets/videos/gas-before.mp4`
- `/assets/videos/gas-after.mp4`

Replace with your own optimized media for production.
