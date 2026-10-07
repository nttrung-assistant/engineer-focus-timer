# Focus — a quiet pomodoro timer

A small, polished focus timer served entirely by a single Cloudflare Worker.
One page, zero external assets, zero tracking. [Live demo →](https://engineer-focus-timer.nttrung-assistant.workers.dev)

## What it does

- **Pomodoro cycle** — Focus → short break ×4 → long break, with session dots
  showing your progress through the round.
- **Dark & light themes** — follows your system preference, remembers your
  choice, `T` toggles.
- **Timestamp-based timing** — no drift when the tab is throttled or backgrounded.
- **Gentle chime** — a two-note WebAudio chime on phase change (mutable, no audio files).
- **Adjustable session lengths** — persisted in `localStorage`.
- **Keyboard shortcuts** — `Space` start/pause, `R` reset, `T` theme.
- Responsive, respects `prefers-reduced-motion`, sets a live clock in the tab title.

## Stack

- Cloudflare Worker (`src/index.js`) — serves the app at `/`, a health check at
  `/healthz`, JSON 404s for everything else.
- `src/page.js` — the entire UI as one inline HTML string: no build step, no
  bundler, no external requests.
- Tests: Node's built-in test runner (`node --test`) exercising the Worker's
  `fetch` handler directly.

## Run it

```sh
npm install
npm test          # run the tests
npm run dev       # local dev server at http://localhost:8787
npm run deploy    # deploy with wrangler
```

## Project layout

```
src/index.js         Worker entry: routing, headers
src/page.js          The whole app as one HTML string
test/worker.test.js  Fetch-handler tests (node --test)
wrangler.toml        Worker config (name, entry point)
```

## License

MIT — do whatever you like, at your own pace.
