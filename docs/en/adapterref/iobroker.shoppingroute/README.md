---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
---
# ShoppingRoute for ioBroker

<p align="center">
  <img src="admin/shoppingroute.png" alt="ShoppingRoute" width="160">
</p>

<p align="center">
  <strong>Smart Alexa shopping lists — sorted by store, product group and your real walking route.</strong>
</p>

<p align="center">
  <img src="http://iobroker.live/badges/shoppingroute-installed.svg" alt="ioBroker installations">
  <img src="http://iobroker.live/badges/shoppingroute-stable.svg" alt="ioBroker stable installations">
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/v/iobroker.shoppingroute.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/dm/iobroker.shoppingroute.svg" alt="npm downloads"></a>
  <a href="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml"><img src="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml/badge.svg" alt="Test and Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

> **Current version: 0.5.1**
> ShoppingRoute is available in the ioBroker **latest** repository.

## What ShoppingRoute does

ShoppingRoute turns an ordinary Alexa shopping list into a practical shopping assistant. **All stores can share one Alexa list, or you can deliberately split them across several lists.** Its key feature is configurable **market routing**: for every store, you define your own walking order through the sections. ShoppingRoute then arranges the list to match the way you actually move through the shop — reducing backtracking and searching for **faster, more efficient shopping**.

Instead of keeping items only in the order Alexa received them, the adapter can assign them to stores, product groups and a configurable walking route inside each store. It uses visible two-digit prefixes such as `20> Bananas` and optional market headings such as `40> ═════ ALDI ═════`.

That means a list can automatically become something like:

```text
10> Apples
20> Bananas
30> Bread
40> ═════ ALDI ═════
50> Milk
60> Cheese
70> Coffee
```

Managed Alexa lists must be set to **A–Z** in the Alexa app. ShoppingRoute then controls the effective order through its prefixes.

ShoppingRoute reuses the local authentication of the ioBroker **Alexa2** adapter for direct item updates, deletions and batch creation. Alexa2 list states remain the external change trigger.

**Service / manufacturer reference:** ShoppingRoute works with Amazon Alexa shopping lists. Amazon documents Alexa lists as a customer feature of the Alexa ecosystem; customers can access Alexa shopping and to-do lists through the Alexa app, Amazon app and Amazon retail site. See the [official Amazon Alexa developer documentation](https://www.developer.amazon.com/en-US/docs/alexa/ask-overviews/deprecated-features.html#list-skills-and-alexa-shopping-and-to-do-lists).

## Documentation

Choose your language:

- 🇬🇧 **English:** [User guide](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md)
- 🇩🇪 **Deutsch:** [Bedienungsanleitung](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) · [Ausführliche README](/#/docs/adapterref/iobroker.shoppingroute/README_DE.md)

Community and support:

- 🧪 [ioBroker tester forum – ShoppingRoute](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4)
- 🐞 [GitHub issues](https://github.com/RaviniZib/ioBroker.shoppingroute/issues)

Adapter settings and the backup utility include all 11 standard ioBroker Admin languages. Shopping-list feedback is available in German and English.

## What's new in 0.5.1

This release fixes the saving and moving problems reported with the new management page and makes shopping from a phone more comfortable:

- **Create usable Alexa lists:** a new list is created and confirmed in Alexa before ShoppingRoute uses it. An invalid new binding is rejected before it can affect healthy lists.
- **Add items while shopping:** add an item directly on the Shopping list page, including to an empty list.
- **Move to the end and back:** dedicated end-drop areas, touch drag handles, corrected insertion positions and empty return markets make moves easier. Use “Show other markets as drop targets” to reveal additional destinations.
- **Understand longer updates:** a visible message explains the pending Alexa update immediately. The adapter reports the final result separately, so a longer operation is not mistaken for an immediate failure.
- **Keep catalogue changes:** deletions, ordering changes and selections on the management page save automatically. Typed edits wait for the **Save** button; **Add** submits a new entry. Saved data survives reopening the page.
- **Avoid interrupted saves:** local catalogue saves no longer make unnecessary Amazon checks, and learned catalogue data no longer causes an instance restart. Rapid edits are queued, and unsuccessful saves retain your changes for retry.
- **Move an item back after an Alexa rebuild:** changed Amazon item IDs can be resolved by an unambiguous item name. Duplicate names are never guessed.

Open **ShoppingRoute** in the ioBroker sidebar on your phone. Use the `⋮⋮` handle to drag, or use the arrow buttons and market selector. After updating, fully reload the management page once to load the new interface. Alexa list writes still use the configured rate limits, Dry Run and verification safeguards.

## Main features

- dedicated **ShoppingRoute management page** in the ioBroker sidebar for shopping list, products, markets, product groups, routes, lists and review items
- catalogue changes are persisted at runtime and do not require an adapter restart
- create confirmed Alexa lists and add shopping items directly from the phone
- automatic saving of structural changes, with explicit Save for typed edits
- market names are always stored in **UPPERCASE**, regardless of how they are entered, with all references normalized consistently
- defensive protection against accidental catalogue resets during Admin/update flows

### Store and route based sorting

- configurable stores and store aliases
- individual walking route for every store
- product groups with independent sort order
- preferred and available markets per product
- global, per-list and temporary priority markets
- optional market headings such as `═════ ALDI ═════`
- optional cross-market consolidation using a minimum-item threshold
- explicit market requests are never moved to another store

### Smart product handling

- product catalogue with aliases
- duplicate-resistant learning
- review queue for unknown products
- automatic, review and off learning modes
- category and alias suggestions
- quantity parsing for digits, number words, packs, half-kilo expressions and `6x` forms
- manual per-item market and position overrides

### Alexa-safe list updates

- incremental `00>`–`99>` prefix sorting
- gap-preserving inserts to avoid unnecessary rewrites
- suffix-only rebuilds when a numeric gap is exhausted
- direct Amazon responses used to confirm operations
- final direct list read for verification
- exclusive transaction handling to prevent overlapping writes
- recovery journal for interrupted operations
- API Safe Mode with configurable write-rate limiting
- bounded Alexa callbacks and polling with backoff

### Admin and diagnostics

- interactive current shopping-list view
- drag & drop plus touch-friendly controls
- sorting preview before writes
- local-only shopping statistics
- configuration backup and restore
- shareable market-route profiles
- privacy-safe diagnostic and feedback report
- Alexa2/alexa-remote2 direct-session diagnostics
- Dry Run safety mode

## Requirements

- ioBroker with **Admin 8 or newer**
- **js-controller 7.1.0 or newer**
- a working ioBroker **Alexa2** adapter instance
- the Alexa shopping list managed by ShoppingRoute must be sorted **A–Z** in the Alexa app

## How it works

1. Alexa2 reports a shopping-list change to ioBroker.
2. ShoppingRoute reads the affected list and normalizes the item names.
3. Products are matched against aliases, product groups and market assignments.
4. The adapter builds the best market and route plan.
5. Only the required list changes are written back to Amazon.
6. The final remote list is read again and verified.

The browser-based Admin interface never receives Alexa or Amazon credentials.

## Privacy and safety

ShoppingRoute does not require its own Amazon login. It reuses the locally stored Alexa2 session and does not log authentication secrets.

Statistics are stored locally. The feedback report is designed to be privacy-safe, and Dry Run can be used to inspect planned changes without modifying the shopping list.

## Installation

Install ShoppingRoute from the ioBroker **Adapters** page while using the **latest** repository.

After installation:

1. create an instance of ShoppingRoute,
2. select/configure the Alexa shopping list,
3. define markets and product groups,
4. configure the walking route for each store,
5. set the managed Alexa list to **A–Z**,
6. start with **Dry Run** if you want to inspect the result before enabling writes.

For all configuration details, see the [English user guide](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md) or the [German user guide](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md).

## Feedback and support

ShoppingRoute is still young, so real-world feedback is especially valuable.

Please use the [ioBroker tester thread](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4) for general testing feedback and the [GitHub issue tracker](https://github.com/RaviniZib/ioBroker.shoppingroute/issues) for reproducible bugs or feature requests.

## Changelog

### 0.5.1 (2026-10-07)
- Create new lists in Alexa and verify them before saving their bindings; add shopping items directly, including to empty lists.
- Show immediate, readable progress for Alexa moves, retain optimistic positions while waiting, and track long operations without the previous UI timeout failure.
- Fix end-drop targets, row insertion positions, touch dragging and empty return markets in the shopping list; restore drag ordering for markets, product groups and walking routes.
- Save deletions, ordering and selections immediately on the management page; preserve typed drafts until Save and queue rapid structural changes without a retry loop.
- Keep local saves independent of unnecessary Amazon list checks; persist learned catalogues in runtime data instead of restarting the instance through native-object writes.
- Safely resolve uniquely named items after Amazon replaces their IDs, retaining rejection for ambiguous duplicate names and all write safeguards.
- Provide German and English shopping feedback, a language-aware help button and updated user guides and READMEs.

### 0.5.0 (2026-10-05)
- Add a dedicated ShoppingRoute management page in the ioBroker sidebar with a fixed header and direct management of shopping list, products, markets, product groups, routes, lists and review queue.
- Persist large catalogue data outside normal instance configuration so catalogue edits no longer require an adapter restart.
- Add defensive recovery and regression coverage for the destructive Admin/default reset reported in issue #59, including a successful real-instance reproduction test.
- Normalize every market name to UPPERCASE on create, rename, load and save, and update market references consistently.
- Refine the management UI with a stable sticky header, logo and shaded/zebra list blocks.

### 0.4.4 (2026-09-25)
- (RaviniZib) Use `No Market` for new fallback-market defaults, add all 11 admin languages to the backup utility, and remove six unused translation keys. Existing market names, routes and product data remain unchanged.

### 0.4.3 (2026-09-25)
- (RaviniZib) Route Alexa callback timeouts through ioBroker-managed timers so stalled callbacks stay bounded without plain Node.js `setTimeout()` calls in adapter source.
- (RaviniZib) Keep `common.news` within the seven entries supported by the repository builder.

### 0.4.2 (2026-09-17)
- (RaviniZib) Bound direct Alexa callbacks to 30 seconds so missing callbacks cannot block startup or sorting.
- (RaviniZib) Poll Amazon lists directly with error backoff when Alexa2 events are missing; keep polling scheduled while sorting is busy or disabled.
- (RaviniZib) Retry delayed final verification and preserve concurrent additions for a follow-up sort. Recover completed transactions without discarding additional items; retain safety stops for incomplete writes.
- (RaviniZib) Refresh the checked-in build and add recovery and polling regression tests.

### 0.4.1 (2026-09-12)

- Validates shopping-list responses before rendering or replacing the current view. Incomplete responses show an error and a Reload button instead of crashing on `.map()`.

- Adds a Delete button for each shopping item. Deletes the selected Amazon ID and empty market headers through the exclusive, journaled transaction with direct final verification. Dry Run and the safety stop block deletion.

- Prevents duplicate shopping items from overlapping drag/drop events and concurrent direct writes. Reserves UI/backend operations synchronously and keeps move errors visible after refresh.

- Corrects checker #16 metadata: removes unpublished 0.3.8 from `common.news`, adds the existing npm maintainer email to author/copyright fields, links the MIT license and declares testing ^6.2.1. Local checker: no errors; repository admission remains pending in PR #6434.

- Updates the catalogue and removes accepted review rows in one Admin draft change, avoiding stale accepted rows after saving. Discarding restores the original draft. The reported errors were confirmed fixed by the user.
- Replaces the review queue’s native multi-select with independently clickable market checkboxes and a visible selection summary. Included in 0.4.1; not in the published 0.4.0.

### 0.4.0 (2026-09-12)

**Correction to the original acceptance claim:** The complete review workflow was not fixed. Accepted rows could remain visible in the Admin draft, and market selection still used a native multi-select. The original “end-to-end test” description was incorrect: tests covered editor/helper functions and serialization, not full Admin interaction.

- Persists startup cleanup of previously accepted review rows even without accepting another product.
- Normalizes legacy product-market strings to arrays at startup and preserves market arrays in acceptance functions.
- The additional local UI correction is listed under “0.4.1”; it is not part of the published 0.4.0 package.

### 0.3.9 (2026-09-11)

- Replaces incomplete 0.3.8 snapshots that may have been installed directly from GitHub with an unambiguous newer version.
- Includes the final product-market normalization, review cleanup, single-column shopping-list view, structural header filtering, and orphaned-header removal verified in PR #37.
- No user configuration migration is required; legacy comma/semicolon market values are normalized automatically.

### 0.3.8 (2026-09-11)

- “Available markets” is stored consistently as a multi-select array; legacy comma/semicolon strings remain readable and are migrated to arrays at startup.
- Accepted review entries are removed after saving once the product catalogue has been updated.
- The current shopping list is presented as a clear single-column sequence of market sections.
- Structurally formatted market headings are filtered even when their label is unknown or misspelled (for example `═════ DROGERIEMART ═════`).
- Market headings without associated active items are deleted from the Alexa shopping list during the next sorting run.
- Fixed the review queue so accepting an item updates the article catalogue and visible status immediately in the same Admin draft.
- Legacy market headings such as `— LIDL —` are recognized as headings and can no longer enter the shopping items or review queue.
- Nested internal sort prefixes are stripped recursively from parsing and the Admin shopping-list display.
- Simplified the current shopping-list view by hiding empty market columns while retaining drag, arrow and market-selector controls.
- Updated current ioBroker CI/checker compatibility: testing-action-check v2, Node.js 26 matrix coverage, current @iobroker/testing and bounded common.news history.

### 0.3.7 (2026-09-11)

- Added an interactive current shopping-list view to Admin with drag-and-drop plus touch-friendly arrow/market controls.
- Manual item positions and market moves are persisted locally and take precedence over automatic sorting while that active list item exists.
- Alexa writes are performed by the adapter; the browser receives no Alexa/Amazon credentials, and failed moves reload the confirmed list state.
- Improved responsive Admin layouts for xs/sm screens and added the repository Responsive Design tab width recommendation.
- Review entries now retain an idempotent “Accepted” status after a normal Save instead of falling back to “Pending”.

### 0.3.6 (2026-09-04)

- Cleaned up avoidable repository-checker warnings.
- Made the JSON Config i18n mode explicit and moved all existing translations into the standard language-file structure.
- Removed obsolete prepublish protection and archived older changelog entries.
- No sorting or runtime behavior was changed.

### 0.3.5 (2026-08-17)

- Completed the remaining repository re-review cleanup with an English statistics fallback.
- Aligned release deployment with the regular tested `npm run build` path.
- Removed the obsolete `stable:build` / source-map cleanup path and updated its regression protection.
- No sorting behavior or adapter functionality was changed.

### 0.3.4 (2026-08-14)

- Added Admin 8 compatibility for all custom Admin components and set the minimum Admin version to 8.0.0.
- Improved logging with an optional sort-summary message and made market headings clearer (`═════ MARKET ═════`).
- Fixed the review queue’s “Accept all” action and now process foreign Alexa2 states only when their values are acknowledged.
- Removed obsolete timing/API configuration options and the internal npm version check.
- Removed code obfuscation and obsolete package-preparation paths.
- Completed repository-review compatibility cleanup, including English runtime log/state texts and bounded `maxWritesPerMinute` handling.

### 0.3.3 (2026-08-13)

- New direct `00>`–`99>` prefix sorting for Alexa lists configured to A–Z.
- Added very fast incremental insertion into free numeric gaps; only the affected suffix is rebuilt when a gap is exhausted.
- Direct Amazon responses confirm each operation, followed by one final direct verification of the complete list result.
- Managed Alexa lists must be set to **A–Z** in the Alexa app.

### 0.3.2 (2026-08-11)

- Replaced the former buffered/marker/`updatedDateTime` sorter with one direct `00>`–`99>` prefix architecture for Alexa A–Z lists.
- Added midpoint insertion into existing numeric gaps; if a gap is exhausted, only the smallest necessary suffix is deleted serially and recreated with one batch request.
- Reuses Alexa2 credentials locally without logging secrets or writing Alexa2 item states. Direct Amazon responses confirm each operation and one final direct list read verifies the complete apply.
- Added a simple exclusive `IDLE`/`COLLECTING`/`APPLYING` lifecycle: one new item waits at most five seconds, while a second new item starts the collected run immediately.
- Replaced the old marker transaction with a compact persistent direct-apply journal and a safety stop for incomplete or ambiguous remote results.

### 0.3.1 (2026-08-10)

- Fixed a restart loop in Review learning: repeated identical observations no longer rewrite `reviewItems` solely to refresh `lastSeen`.

### 0.3.0 (2026-08-10)

- Added optional market headings (now formatted as `═════ MARKET ═════`).
- A heading stays active until the last real item for that market is completed and is then deleted completely instead of remaining among completed items.
- Added configurable minimum-items-per-market consolidation for flexible articles.
- Explicit market phrases always remain assigned to the requested market.
- Header management uses Alexa2 states (`#New`, `#delete`) and does not create a second Amazon session; normal shopping items are never automatically deleted or completed.

Older releases: CHANGELOG_OLD.md.

## License

Licensed under the MIT License. See [LICENSE](https://github.com/RaviniZib/ioBroker.shoppingroute/blob/main/LICENSE) for the complete terms.

Copyright (c) 2026 RaviniZib <zib@ravini.org>