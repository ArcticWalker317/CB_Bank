# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

ᴄʙ Bank is a vanilla HTML/CSS/JS single-page app — no framework, no build step, no package manager. Open `index.html` directly in a browser to run it.

## Running the app

Open `index.html` in a browser. No build or install step needed.

For local development with real data, create a `config.js` file (gitignored) that sets credentials:

```js
window.CB_CONFIG = {
  GIST_ID: 'your-gist-id-here',
  GITHUB_TOKEN: 'ghp_...',
};
```

Without `config.js`, the app uses `DEFAULT_DATA` from `app.js` and persists changes to `localStorage` only.

## Architecture

Three files make up the entire app:

- **`index.html`** — Static shell. Three tab panes (`#tab-feed`, `#tab-marketplace`, `#tab-profile`), a bottom nav, a shared modal bottom sheet (`#modal-overlay`), and a toast. The login screen (`#screen-login`) sits above the app as a fixed overlay.
- **`styles.css`** — iPhone-first dark theme. All design tokens are CSS custom properties on `:root`. Max width 430px on desktop (simulates an iPhone frame).
- **`app.js`** — All application logic. No external dependencies.

### Data layer

All state lives in a single mutable `appData` object that mirrors the GitHub Gist JSON (`cbbank-data.json`). Shape:

```
appData.members[]         — member id, name, initials, balance, color
appData.feed[]            — transaction history (from/to member ids, amount, type, desc)
appData.marketplace{}     — keyed by type: bounty[], quest[], bet[], offering[]
appData.balanceHistory{}  — keyed by member id, array of 7 daily balance snapshots
```

On load: fetch from Gist → fall back to `localStorage` cache → fall back to `DEFAULT_DATA`.
On any write: `saveToGist()` persists to `localStorage` immediately, then PATCHes the Gist API.

### Auth

Cookie-based (`cbbank_me`). The login screen shows all members as tap targets — no password. `ME` holds the logged-in member id (integer). `ADMIN_ID = 0` is a special non-member admin role.

### Rendering

`renderAll()` re-renders all four views from `appData`. Individual render functions: `renderMembersStrip()`, `renderFeed()`, `renderMarketGrid()`, `renderProfile()`. All HTML is built via template literal strings and set via `innerHTML`.

### Modals

All action flows (Send ᴄʙ, create marketplace items, admin actions) use a single shared bottom sheet. Content is injected into `#modal-content` by dedicated modal-builder functions.

### Marketplace types

Four types with distinct data shapes and UI:
- **bounty** — task posted by one member, any member can claim; admin awards
- **quest** — time-limited challenge with deadline; admin awards to winner
- **bet** — two named members, one adjudicator; admin resolves (picks winner)
- **offering** — service for sale; non-owner members can buy directly
