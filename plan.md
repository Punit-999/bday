# Charu’s Birthday Garden — Implementation Plan

## Product direction

A premium, mobile-first birthday garden for a mother named Charu. The experience is intentionally low-maintenance: the only human-edited inputs are `config/site.js`, `content/letter.md`, `public/photos/`, and `public/audio/`. Photo and audio manifests are generated automatically before development/build, while all celebration copy is prepared in code from reusable content seeds.

## Design direction

- **Design movement:** soft luxury editorial / digital keepsake, with the intimacy of a handwritten letter and the polish of a boutique fashion landing page.
- **Core principles:** emotional pacing, quiet opulence, generous breathing room, and touch-friendly delight.
- **Color philosophy:** cream is the calm canvas; peach and blush carry warmth; lavender adds dreaminess; gold is reserved for meaningful accents and “chapter” moments.
- **Layout paradigm:** a vertically narrated garden rather than a dashboard. Each chapter uses a different spatial rhythm: cinematic entrance, memory-room gallery, collectible reason cards, interactive flower bed, letter reveal, cake moment, and a spacious finale.
- **Signature elements:** translucent glass cards, floating flower/sparkle/heart motifs, and soft gold micro-labels that make the scroll feel like chapters in a keepsake book.
- **Interaction philosophy:** every interaction should feel like opening something precious—tap to enter, tap a bloom to hear its message, tap the gift to reveal the letter, tap the cake to send the wish.
- **Animation:** restrained, slow, and tactile: gentle drift, hover lift, fade-up on scroll, crossfaded slideshow, animated waveform, candle flicker, confetti and CSS fireworks. Reduced-motion users receive a simplified experience through the system preference media query.
- **Typography system:** Playfair Display for emotional display copy and letter-like moments; DM Sans for navigation, labels, controls, and readable body copy.
- **Brand essence:** a private digital birthday keepsake for the woman who makes every place feel like home — warm, elegant, personal.
- **Personality:** tender, luminous, celebratory.
- **Brand voice:** specific, intimate, and grateful. Example lines: “Every little moment, held close.” / “You are allowed to be celebrated.”
- **Wordmark / mark:** a small four-point sparkle seal beside a lowercase garden wordmark, used as the recurring “made with love” signature.
- **Signature brand color:** plum `#5b3f5a`, softened with blush and gold so it feels ownable without becoming heavy.

## Implementation architecture

- `src/App.jsx`: single-page composition, content generators, section components, interactive state, and media/letter loading.
- `src/styles.css`: responsive design system, glassmorphism cards, responsive layout, accessible focus styling, reduced-motion fallback, and CSS-only cake/fireworks/heart effects.
- `config/site.js`: only small configuration values the user may change.
- `content/letter.md`: only editable long-form personal content.
- `public/photos/` and `public/audio/`: drop-in folders for user media.
- `scripts/generate-assets.mjs`: scans the two folders and writes browser-readable JSON manifests before `dev` and `build`.
- `public/manus-routes.json`: declares the single page route for the managed website.
- `README.md`: minimal-maintenance content guide and Vercel/Netlify deployment instructions.

## Dependencies and serving

Vite serves the React app on the managed project’s port 3000. Framer Motion handles component transitions and scroll reveals; `canvas-confetti` handles the wish celebration; Lucide provides accessible iconography. No backend, database, login, or external API is needed for this private static keepsake.
