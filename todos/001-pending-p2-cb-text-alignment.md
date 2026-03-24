---
status: pending
priority: p2
issue_id: "001"
tags: [css, typography, ui]
dependencies: []
---

# Systematic fix for ᴄʙ text alignment and rendering consistency

## Problem Statement

The `ᴄʙ` symbol (Unicode small caps: ᴄ U+1D04, ʙ U+0299) sits at a different visual baseline than surrounding Latin text across all contexts — header logo, feed amounts, buttons, member strips, modal titles. The fix needs to be systematic: one definition, applied everywhere.

Screenshots show:
- "ᴄʙ Bank" logo: ᴄʙ vertically misaligned with "Bank"
- "Send ᴄʙ" button: ᴄʙ sits too high or low relative to "Send"
- "35 ᴄʙ" in member strip: ᴄʙ floats off the number baseline

## Findings

- `styles.css:305` — `.cb-mark` only sets `color` and `font-weight`. No `vertical-align`, no `line-height`, no `font-size` normalization.
- `styles.css:135` — `.login-logo .cb-mark` adds `font-style: italic` but still no vertical fix.
- `app.js:422` — `formatCB()` wraps amounts in a `<span class="cb-mark">` **plus** inline overrides: `font-size:10px; letter-spacing:-0.5px; margin-left:1px; vertical-align:1px`. This is the only place vertical-align is addressed, and it's inline.
- `index.html:33` — `Send ᴄʙ` in the header button uses **bare ᴄʙ text** (no span), so `.cb-mark` styles don't apply.
- `app.js:433` — `sendBtn.textContent = 'Send ᴄʙ'` — sets as textContent, no span possible this way.
- `app.js:450` — `${m.balance} ᴄʙ` in member strip: bare ᴄʙ, no span.
- Multiple other bare `ᴄʙ` occurrences in toast messages and labels (app.js:634, 973, 1103, 1109, 1122) where styling doesn't matter but inconsistency is a risk.

**Root cause:** No single source of truth for how ᴄʙ renders. The `.cb-mark` class is incomplete (missing vertical-align), inline overrides partially compensate, and many sites use bare ᴄʙ with no class at all.

## Proposed Solutions

### Option 1: Fix `.cb-mark` CSS + audit all render sites

**Approach:** Add `vertical-align`, `font-size`, and `line-height` to `.cb-mark` so any span using it aligns correctly. Then audit every render site and wrap bare `ᴄʙ` in `<span class="cb-mark">ᴄʙ</span>` where it's visible in the UI. Remove inline style overrides from `formatCB()`.

**Pros:**
- Single CSS rule controls everything
- Inline overrides removed — less scattered logic
- Consistent across all contexts

**Cons:**
- Requires touching multiple files and many render sites
- Need to verify each context visually (logo vs small inline vs button)

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: CSS-only fix with `vertical-align` baseline tweak only

**Approach:** Just add `vertical-align: baseline` (or a small em offset) to `.cb-mark` and leave everything else as-is.

**Pros:**
- Minimal change

**Cons:**
- Doesn't fix bare `ᴄʙ` sites that have no class
- Doesn't remove the conflicting inline styles in `formatCB()`
- Partial fix that leaves inconsistency

**Effort:** 15 min

**Risk:** Low, but incomplete

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `styles.css:135` — `.login-logo .cb-mark`
- `styles.css:305` — `.cb-mark` base rule
- `app.js:422` — `formatCB()` inline style overrides
- `app.js:433` — `sendBtn.textContent` (bare ᴄʙ in header button)
- `app.js:450` — member strip balance (bare ᴄʙ)
- `app.js:815` — profile balance label (already uses span)
- `app.js:932`, `1077`, `1090`, `1146` — modal titles and submit button (already use span)
- `index.html:33` — header Send button (bare ᴄʙ)

**Contexts to test visually:**
- Login logo ("ᴄʙ Bank" large)
- App header ("ᴄʙ Bank" + "Send ᴄʙ" button)
- Feed amounts ("35 ᴄʙ", "+10 ᴄʙ")
- Member strip balances
- Modal titles and submit buttons
- Profile balance label

## Acceptance Criteria

- [ ] `.cb-mark` CSS fully defines vertical alignment — no inline overrides needed
- [ ] `formatCB()` uses only `.cb-mark` class, no inline style attributes
- [ ] All visible UI uses of ᴄʙ are wrapped in `<span class="cb-mark">` (or styled container)
- [ ] ᴄʙ visually sits on the same baseline as adjacent text in all contexts
- [ ] Login logo, header, feed, buttons, modals all look consistent

## Work Log

### 2026-03-13 - Initial Discovery

**By:** Claude Code

**Actions:**
- Audited all `ᴄʙ` and `.cb-mark` occurrences across index.html, app.js, styles.css
- Identified two rendering paths: styled span vs bare Unicode text
- Found inline style overrides in `formatCB()` as partial workaround
- Documented all affected render sites

**Learnings:**
- Unicode small caps sit above the normal baseline in most system fonts
- The `vertical-align` property on an inline span is the right lever; `line-height` alone won't help
- Some sites use `textContent` assignment which can't hold HTML spans — those may need a different approach (e.g., button innerHTML instead of textContent)
