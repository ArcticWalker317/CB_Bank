---
title: Marketplace Feed Redesign
type: feat
status: completed
date: 2026-03-13
---

# feat: Marketplace Feed Redesign

## Overview

Replace the current 2×2 type-grid → drill-down-list two-screen marketplace with a single unified feed of all open marketplace items, topped by a horizontal filter chip bar. The result is faster to scan, easier to act on, and more visually interesting.

## Problem Statement

The current marketplace has four pain points the user identified:

1. **Hard to scan** — items are siloed by type behind a grid tap; you can't see everything at once
2. **Feels plain** — the 2×2 landing screen adds a navigation step without adding value
3. **Actions buried** — claim/buy buttons are one drill-down away
4. **No filtering or sorting** — once inside a type list, no further control

## Proposed Solution

A single-screen marketplace with:

- **Unified feed** — all open items from all four types rendered in one scrollable list, ordered by recency (newest first)
- **Filter chip bar** — horizontal scrollable pill row pinned below the page header: `Yours · Bets · Bounties · Quests · Offerings` (plus an implicit "All" default state)
- **Richer item cards** — type badge, color-coded accent, clearer CTA placement
- **FAB stays** — the gold `+` create button remains, now always visible

The two-screen home/list architecture (`#mkt-home` / `#mkt-list`) is collapsed into one screen. The `#mkt-home` grid and `#mkt-list` split is removed in favor of a single `#mkt-feed` view.

## Technical Approach

### HTML Changes (`index.html`)

Replace the current `#tab-marketplace` inner structure:

**Remove:**
- `#mkt-home` and its `.mkt-scroll-area` / `.mkt-grid` / `.fab-wrap`
- `#mkt-list` and its `.btn-back` / `#list-title` / `.mkt-items` / `.fab-float`

**Add:**
```html
<div id="tab-marketplace" class="tab-pane hidden">
  <div class="page-header">
    <span class="header-title">Marketplace</span>
    <!-- right side: member balance pill (same as other tabs) -->
  </div>

  <!-- Filter chip bar -->
  <div class="mkt-filter-bar" id="mktFilterBar">
    <button class="mkt-chip active" data-filter="all">All</button>
    <button class="mkt-chip" data-filter="yours">Yours</button>
    <button class="mkt-chip" data-filter="bet">🎲 Bets</button>
    <button class="mkt-chip" data-filter="bounty">🎯 Bounties</button>
    <button class="mkt-chip" data-filter="quest">⚡ Quests</button>
    <button class="mkt-chip" data-filter="offering">🎁 Offerings</button>
  </div>

  <!-- Unified feed -->
  <div class="mkt-feed" id="mktFeed">
    <!-- JS-populated -->
  </div>

  <!-- FAB -->
  <div class="fab-wrap">
    <button class="fab" id="btnCreate">+</button>
  </div>
</div>
```

### JS Changes (`app.js`)

#### State

Add `mktFilter: 'all'` to the `state` object (line ~144):
```js
state = { tab: 'feed', mktFilter: 'all' }
```

Remove `mktView` and `mktType` from state (no longer needed).

#### New `renderMarketFeed()` function

Replaces both `renderMarketGrid()` and `renderMarketItems()`.

Logic:
1. Collect all items across all four types into a flat array, tagging each with its `type`
2. Apply `state.mktFilter`:
   - `'all'` → show everything
   - `'yours'` → items where `item.postedBy === ME` or `item.by === ME` or `item.from === ME` or `item.to === ME`
   - any type string (`'bet'`, `'bounty'`, etc.) → filter to that type only
3. Sort by `item.time` descending (newest first) — use the existing `item.time` timestamp strings already on all items
4. Render each item as a `.mkt-feed-card` with a type badge, color accent, amount, participants, and CTA
5. Show `.empty-state` if nothing passes the filter

```js
function renderMarketFeed() {
  // 1. Flatten all marketplace items with type tag
  const all = [];
  Object.keys(TYPE_META).forEach(type => {
    (appData.marketplace[type] || []).forEach(item => {
      all.push({ ...item, _type: type });
    });
  });

  // 2. Filter
  let items = all;
  if (state.mktFilter === 'yours') {
    items = all.filter(item =>
      [item.postedBy, item.by, item.from, item.to].includes(ME)
    );
  } else if (state.mktFilter !== 'all') {
    items = all.filter(item => item._type === state.mktFilter);
  }

  // 3. Sort newest first
  items.sort((a, b) => (b.time || '').localeCompare(a.time || ''));

  // 4. Render
  const feed = document.getElementById('mktFeed');
  if (!items.length) {
    feed.innerHTML = `<div class="empty-state">Nothing here yet</div>`;
    return;
  }
  feed.innerHTML = items.map(item => buildFeedCard(item, item._type)).join('');

  // 5. Attach event listeners (same pattern as current renderMarketItems)
  // ... buy-btn, admin-action-btn listeners
}
```

#### `buildFeedCard(item, type)` helper

Returns an HTML string for one feed card. Reuses the existing per-type rendering logic from `renderMarketItems()` (lines 538–599) but adds:
- A `.type-badge` chip in the card header (using existing `.badge-{type}` CSS from feed cards)
- The type's color accent class (`.type-{type}`) on the card for the top border bar

#### Filter chip wiring

In `renderMarketFeed()` or a dedicated `bindFilterChips()` called once on init:
```js
document.getElementById('mktFilterBar').addEventListener('click', e => {
  const chip = e.target.closest('.mkt-chip');
  if (!chip) return;
  state.mktFilter = chip.dataset.filter;
  document.querySelectorAll('.mkt-chip').forEach(c => c.classList.toggle('active', c === chip));
  renderMarketFeed();
});
```

#### Remove `showMarketList()` and back-button logic

- Delete `showMarketList()` (lines 514–521) — no longer needed
- Remove back button listener in `switchTab()` / init block (line ~1263–1267)
- Update `renderAll()` to call `renderMarketFeed()` instead of `renderMarketGrid()`

### CSS Changes (`styles.css`)

**Add `.mkt-filter-bar`** — sticky below header, horizontal scroll, no scrollbar:
```css
.mkt-filter-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  overflow-x: auto;
  scrollbar-width: none;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: var(--header-h);
  z-index: 10;
}
.mkt-filter-bar::-webkit-scrollbar { display: none; }
```

**Add `.mkt-chip`** — pill filter button, using `.period-btn` as precedent:
```css
.mkt-chip {
  flex-shrink: 0;
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 5px 13px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gray1);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.mkt-chip.active {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold-txt);
}
```

**Add `.mkt-feed`** — replaces `.mkt-items`, now full-height scroll container:
```css
.mkt-feed {
  flex: 1;
  overflow-y: auto;
  padding: 12px 14px calc(var(--nav-h) + var(--safe-b) + 80px);
}
```

**Add `.mkt-feed-card`** — similar to `.mkt-item-card` but with type-accent top bar:
```css
.mkt-feed-card {
  background: var(--s1);
  border-radius: var(--r-md);
  padding: 14px 15px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}
.mkt-feed-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}
/* reuse existing type color vars */
.mkt-feed-card.type-bounty::before { background: var(--red); }
.mkt-feed-card.type-quest::before  { background: var(--green); }
.mkt-feed-card.type-bet::before    { background: var(--purple); }
.mkt-feed-card.type-offering::before { background: var(--blue); }
```

**Remove** `.mkt-grid`, `.mkt-type-card`, `.mkt-type-icon`, `.mkt-type-name`, `.mkt-type-desc`, `.mkt-count` — these were for the 2×2 grid home screen only.

**Remove** `.mkt-items` (replaced by `.mkt-feed`).

## System-Wide Impact

- **`renderAll()`** — replace `renderMarketGrid()` call with `renderMarketFeed()`
- **`switchTab()`** — remove the `state.mktView = 'home'` reset logic; filter state can persist across tab switches (desirable UX) or reset to `'all'` — reset is safer
- **Create flow** — `btnCreate` FAB currently opens a type-selector modal (`openCreateModal()`); this remains unchanged since the FAB is preserved
- **Back button** — the `#btnBack` element and its listener (`line ~1263`) can be fully removed
- **Admin resolve modal** — completely unchanged; triggered the same way from `.admin-action-btn`
- **Buy offering** — unchanged; `handleBuyOffering()` called from `.buy-btn` click

## Acceptance Criteria

- [ ] Marketplace tab shows a single unified scrollable feed of all open items on load
- [ ] Filter chips: All / Yours / Bets / Bounties / Quests / Offerings work correctly
- [ ] "Yours" filter shows items where the logged-in member is poster, seller, or participant
- [ ] Active chip is visually distinct (gold tint, gold border)
- [ ] Each card displays: type badge, item title, amount, participant(s), and CTA button
- [ ] Type accent color bar appears on each card matching the type (red/green/purple/blue)
- [ ] Empty state shown when a filter returns no items
- [ ] FAB `+` button triggers the existing create modal (no change to create flow)
- [ ] Admin action buttons (Award / Resolve / Remove) still work correctly
- [ ] Buy button on offerings still works correctly
- [ ] `renderAll()` correctly re-renders the feed (e.g., after a transaction)
- [ ] The old 2×2 grid home screen and back-button drill-down are fully removed
- [ ] No scroll jank — filter bar is sticky, feed scrolls independently

## Files to Change

| File | Changes |
|------|---------|
| `index.html` | Replace `#mkt-home` + `#mkt-list` blocks with `#mktFilterBar` + `#mktFeed` |
| `app.js` | Remove `renderMarketGrid`, `showMarketList`, `renderMarketItems`; add `renderMarketFeed`, `buildFeedCard`; update `renderAll`, `switchTab`, state |
| `styles.css` | Remove grid styles; add `.mkt-filter-bar`, `.mkt-chip`, `.mkt-feed`, `.mkt-feed-card` |

## Sources

- Existing filter pattern precedent: `styles.css:943` — `.period-picker` / `.period-btn`
- Type metadata: `app.js:137` — `TYPE_META` object
- Current render functions: `app.js:495` (`renderMarketGrid`), `app.js:523` (`renderMarketItems`)
- HTML structure: `index.html:40–70`
- State object: `app.js:144`
- Back button listener: `app.js:1263`
