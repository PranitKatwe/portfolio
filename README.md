# Pranit Katwe — Portfolio

Personal portfolio site built with a matte black terminal aesthetic.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion v11 |
| Scroll triggers | react-intersection-observer |
| Font | JetBrains Mono |
| Canvas effects | Browser Canvas 2D API |

## Design

- Background: `#0A0A0A` — matte black
- Primary text: `#E8E8E8`
- Accent: `#38BDF8` sky blue — used sparingly for `$` prompts, active nav, cursor
- Font: JetBrains Mono everywhere
- Max content width: 800px
- No gradients, no glow, no percentage bars

## Sections

1. **Photo** — terminal scanline load + cursor-local binary spotlight on hover
2. **Hero** — boot sequence + 6-line typewriter effect
3. **About** — sequential terminal reveal (kv table + fun facts)
4. **Education** — log format
5. **Experience** — log format with bullet points
6. **Skills** — animated ASCII tree view
7. **Projects** — expandable directory listing
8. **Contact** — sequential reveal

## Dev

```bash
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # ESLint
npx tsc --noEmit  # type check
```
