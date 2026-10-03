# Charu’s Birthday Garden

A polished, mobile-first digital birthday keepsake for Charu. It is intentionally designed so you can make the experience personal by editing only a few places; the sections, animations, 100 reasons, flower messages, audio cards, cake celebration, and finale are already generated for you.

## What you need to update

| Update | Where | What to do |
| --- | --- | --- |
| Mother’s name | `config/site.js` | Change `motherName: 'Charu'`. You can also change the short birthday label and final message if you want. |
| Personal letter | `content/letter.md` | Replace the sample Markdown letter. Keep the file name the same. Basic headings, bold text, italics, and paragraphs are supported. |
| Photos | `public/photos/` | Drop in `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, or `.svg` files. Filenames become captions automatically. Remove the three included SVG placeholders when you are ready. |
| Music / voice messages | `public/audio/` | Drop in `.mp3`, `.wav`, `.m4a`, `.ogg`, or `.webm` files. Filenames become titles automatically. The first audio file is used when the cake wish is made, unless `musicFile` is set in `config/site.js`. |

That is it. Do **not** edit `src/`, `scripts/`, `public/generated/`, or the Vite/Tailwind files unless you want to change the design or functionality.

## Run locally

Requirements: Node.js 18+ and pnpm 10+.

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite. The `dev` script scans `public/photos/` and `public/audio/` before starting, so new files appear automatically after a restart.

To create a production build:

```bash
pnpm build
pnpm preview
```

## Adding photos

1. Copy your photos into `public/photos/`.
2. Use memorable filenames such as `summer-break.jpg`, `her-famous-smile.webp`, or `family-dinner.png`.
3. Restart `pnpm dev` (or run `node scripts/generate-assets.mjs`) so the gallery manifest refreshes.
4. The site automatically creates the mosaic gallery, slideshow, captions, and lightbox.

The browser does not need a database or upload service. The photos remain ordinary files in the website folder.

## Adding music and voice messages

1. Copy audio files into `public/audio/`.
2. Keep the file names readable; they are turned into display titles automatically.
3. Restart the dev server or run the manifest script.
4. Use the Voices of Love section to play/pause any track.
5. When the visitor taps **Make a wish**, the first discovered audio file plays as a celebratory soundtrack. To pick a specific file, set for example:

```js
musicFile: '/audio/happy-birthday.mp3',
```

The file must exist in `public/audio/`.

## Editing the personal letter

Open `content/letter.md` and replace the example text. You can use:

- `# Heading` for a large letter heading
- `## Heading` for a smaller heading
- `**bold text**`
- `*italic text*`
- blank lines between paragraphs

Keep the file path and name unchanged so the gift reveal can load it automatically.

## Deploy on Vercel

1. Push this folder to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite. If it asks, use:
   - **Build command:** `pnpm build`
   - **Output directory:** `dist`
   - **Install command:** `pnpm install`
4. Deploy. The app is static, so no environment variables are required.
5. For future updates, edit only the four personal input areas listed above, commit, and push.

## Deploy on Netlify

### Netlify UI

1. Push this folder to a Git provider.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Use:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
4. Deploy the site.

### Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

When prompted for the publish directory, use `dist`.

## Accessibility and performance

- The site uses semantic sections, labels, visible focus states, buttons with accessible names, alt text, and `prefers-reduced-motion` support.
- There is no runtime API or backend, which keeps hosting simple and fast.
- For a faster first load, resize very large photos before adding them. WebP is a good default.
- Browser audio playback may require a user gesture; the cake button is intentionally a user gesture so the birthday music can start there.

## The one-minute personalization checklist

1. Change `motherName` in `config/site.js` if needed.
2. Replace `content/letter.md` with your letter.
3. Remove the placeholder SVGs from `public/photos/` and add your photos.
4. Add an optional birthday song or voice notes to `public/audio/`.
5. Run `pnpm build` and deploy `dist/`.

Everything else is automatic.
