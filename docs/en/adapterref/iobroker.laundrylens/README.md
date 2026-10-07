![Logo](admin/icon.png)

# ioBroker.laundrylens

[![NPM version](https://img.shields.io/npm/v/iobroker.laundrylens.svg)](https://www.npmjs.com/package/iobroker.laundrylens)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Self-learning ioBroker adapter for automatic detection of washing machine and dryer cycles via smart plug power measurement. Recognizes running programs, estimates remaining time and sends Telegram notifications – fully local, no cloud.

> **Alpha release.** Tested on Siemens iQ washing machine and dryer. Other brands and models may require tuning. Feedback welcome.

---

## How it works

LaundryLens records the power consumption curve of each cycle and compares it against stored program profiles using segment-weighted correlation and a DTW-lite algorithm. Confidence is accumulated over multiple matching rounds before a program is accepted, which prevents single outliers from triggering a wrong match. Remaining time is estimated dynamically based on both elapsed time and the current energy rate – not just a fixed average.

The adapter is self-learning: there are no pre-built profiles. Every program is trained on your specific device. Recognition improves with each completed cycle.

---

## Features

- Cycle detection via state machine (OFF → STARTING → RUNNING ↔ PAUSED → ENDING)
- Self-learning program matching (segment-weighted correlation + DTW tiebreak)
- Score accumulation over multiple rounds with device-specific confidence thresholds
- Override lock: manually selected programs are not overwritten by background matching
- Adaptive remaining time estimation combining time-based and energy-rate signals
- Admin UI with expandable cycle list, inline power graph (canvas), phase legend, trim and split per touch/drag
  - This is why the adapter ships a custom admin tab (`admin/tab_m.html`) rather than relying on jsonConfig or the standard Device Manager component: neither supports rendering an interactive per-cycle power curve, editing phase boundaries by touch/drag, or splitting/trimming a recorded trace - all of which are core to how LaundryLens is used day to day (reviewing what a cycle actually did, correcting mismatches, building new program profiles from a trace).
- Telegram notifications with configurable update thresholds, placeholders (`{progress}`, `{prevTime}`, `{state:objectId}` for any ioBroker data point) and conditional text blocks
- Also supports Pushover, Signal, WhatsApp, Matrix, notify-my-android, Prowl, and email (via [ioBroker.email](https://github.com/iobroker-community-adapters/ioBroker.email)) as notification targets
- Multiple devices: one instance per device (washing machine, dryer, …)
- Localized, ready-to-display text data points (`phaseText`, `stateText`, `programText`) alongside the language-neutral internal ones, for dropping straight into a VIS dashboard

---

## Requirements

- ioBroker with js-controller ≥ 6.0.11
- Node.js ≥ 22
- A smart plug or power meter adapter providing a watt data point per device (e.g. [Shelly EM](https://www.shelly.com/en/products/shop/shelly-em))

---

## Installation

Install **LaundryLens** via the ioBroker Admin adapter list (tab "Adapters"), then create a separate adapter instance for each device and select the watt data point in the instance configuration.

---

## Configuration

Each instance has the following settings:

| Setting | Description |
|---|---|
| Device name | Display name for this device |
| Device type | `washing_machine` or `dryer` (affects phase detection logic) |
| Power sensor (W) | ioBroker data point providing watt values |
| Power threshold (W) | Minimum wattage to consider the device as running |
| Off delay (min) | Time to wait after power drops before ending the cycle |
| Start energy gate (Wh) | Minimum energy consumed before matching starts (filters short spikes) |
| Duration tolerance | Allowed deviation from learned average duration (0.05–0.5) |
| Matching interval (min) | How often matching runs during a cycle |
| Match confirmations | Number of consecutive rounds a match must hold before being accepted |
| Auto-confirm threshold (%) | Confidence at which a match is confirmed automatically |
| Instant-confirm threshold (%) | Confidence at which a match is accepted immediately (2 rounds in a row) |
| Program detection threshold (%) | Minimum confidence for a candidate to be considered at all |
| Notify on probable match | Send a notification even before a match is officially confirmed |
| Ignore anti-crease | Ignore anti-crease phases at the end of dryer cycles |

The defaults are tuned for Siemens iQ appliances. Detection threshold is a trade-off: lower means faster notifications but higher risk of wrong matches. Some experimentation is expected.

---

## Data points per device

| Data point | Type | Description |
|---|---|---|
| `state` | string | off / starting / running / paused / ending (language-neutral internal key, meant for automations) |
| `stateText` | string | Same as `state`, but as ready-to-display, localized text (e.g. "Running ⚙️" / "Läuft ⚙️") - see [`displayLanguage`](#configuration) |
| `running` | boolean | Simple on/off indicator |
| `program` | string | Detected program name |
| `programText` | string | Same as `program`, but with the `detecting...` placeholder localized (a confirmed program is your own saved name, passed through unchanged) |
| `confidence` | number | Match confidence in % |
| `timeRemaining` | number | Estimated remaining time in seconds |
| `totalDuration` | number | Estimated total cycle duration in seconds |
| `cycleProgress` | number | Cycle progress 0–100 % |
| `phase` | string | Current cycle phase (language-neutral internal key, e.g. `washing`, `dryer_drying`) |
| `phaseText` | string | Same as `phase`, but as ready-to-display, localized text with an emoji (e.g. "🫧 Washing" / "🫧 Wäscht") |
| `lastCycleProgram` | string | Program of the last completed cycle |
| `lastCycleDuration` | number | Duration of the last cycle in minutes |
| `lastCycleEnergy` | number | Energy consumed in the last cycle in Wh |
| `availablePrograms` | string (JSON) | Array of all saved program names, e.g. for external dropdowns |

`phase`/`state`/`program` are meant for automations/scripts and use fixed, language-neutral values that never change with your ioBroker language - use the matching `*Text` data point instead if you want to show status directly in a VIS dashboard without building your own translation table. The language for `phaseText`/`stateText`/`programText` defaults to the ioBroker system language, and can be overridden per device with the "Display language" setting.

---

## Using data points in notification messages

Besides the built-in placeholders (`{device}`, `{program}`, `{duration}`, `{energy}`, `{startTime}`, `{endTime}`, `{progress}`, `{prevTime}`), a notification message template can include the current value of **any** ioBroker data point with:

```
{state:objectId}
```

For example, to include the current outside temperature and electricity price in a "done" message:

```
🧺 {device} done!
⏱️ Total runtime: {duration} min
🌡️ Outside: {state:0_userdata.0.outsideTemp}°C
💶 Price: {state:0_userdata.0.electricityPrice} ct/kWh
```

This also works inside the conditional `[...]` blocks: `[🌡️ Outside: {state:0_userdata.0.outsideTemp}°C]` disappears from the message entirely if that data point is empty or doesn't exist, exactly like it would for an empty built-in placeholder. A missing or unreadable object ID never breaks the rest of the message - it just resolves to nothing.

---

## Getting started tips

- Let the device run at least 3–5 cycles per program before expecting reliable detection.
- Start with fewer programs. The fewer profiles you have, the higher the match accuracy.
- Use the **Cycles tab** in the admin UI to review past cycles, trim noise from the start/end of a recorded trace, or split a trace that captured two programs.
- Use the **Export** function before any update to back up your learned profiles and cycle history.

---

## Changelog

### **WORK IN PROGRESS**

### 0.4.40 (2026-10-07)
- Fix: reported live (notification history showing a predicted finish time creeping from 12:30 to 14:06 over the course of a single wash cycle, while `cycleProgress` stayed roughly accurate - over an hour off by the end) - the predicted finish time could drift later and later with every update. Root cause: whenever the recent power trace's variance exceeds a threshold (e.g. a washer motor cycling on/off during agitation), the remaining-time estimate gets "locked" to the last trusted value, to avoid jumpy/unstable predictions from noisy readings. The locked value was a frozen millisecond *duration* though, which never shrank while locked - so the countdown effectively stopped entirely for as long as the noisy condition persisted, while real wall-clock time kept passing, making `now + remaining` (the predicted finish time) creep later and later
- Fixed by decrementing the locked value by the real elapsed time since it was last touched, instead of freezing it as a constant - it now keeps counting down correctly even while locked, while still avoiding jumpy re-estimates from noisy readings (the original intent)
- Covered by a new regression test extending `tests/test_time_estimate.js`

### 0.4.39 (2026-10-06)
- Fix: reported live - `elapsedTime` stayed frozen (often at a stale value left over from a previous cycle) for the entire "detecting..." period of a new cycle, only starting to update once a program was actually confirmed (observed: stuck at 11342 while only ~15 minutes into a new washer cycle; for a dryer, jumped from frozen to 1096 the moment the program was recognized). Root cause: `elapsedTime` is just `Date.now()` minus the cycle's start time, with no real dependency on program detection - but the `onTimeUpdate` callback that wrote it (via `_onTime()`) returned early, skipping the write entirely, whenever `WashDataManager._updateTimeEstimate()` reported no program/bestCandidate yet
- Fixed by extracting the computation into a shared `_updateElapsedTime()` helper, now called unconditionally at the top of `onTimeUpdate` - before its "no program detected" early return - as well as from `_onTime()`'s normal path, so it updates from the moment a cycle starts running regardless of detection status
- Covered by a new regression test (`tests/test_elapsed_time_before_detection.js`)

### 0.4.38 (2026-10-04)
- New: the Lernkontrolle (learning review/feedback) flow can now be driven from a VIS dashboard, not just the admin tab - previously only reachable via sendTo commands, invisible to VIS, which can only read/write data points
- New read-only data points: `pendingFeedbackCount`, `pendingFeedback` (JSON array of all unconfirmed cycles, oldest first), and `feedbackCycleId`/`feedbackProgram`/`feedbackDuration`/`feedbackEnergy`/`feedbackConfidence` (convenience fields for the oldest pending cycle, so a simple VIS text widget doesn't need to parse JSON)
- New writable actions, each acting on the oldest pending cycle: `feedbackConfirm` (button - same as the admin tab's "Correct – confirm"), `feedbackCorrectProgram` (dropdown of program names, kept in sync the same way `programOverride`'s own dropdown is - writing a name corrects and confirms, same as the admin tab's "Wrong program" flow), `feedbackDelete` (button - discards the cycle without confirming it)
- Covered by a new test file (`tests/test_vis_feedback_actions.js`, 17 cases) plus an extension to `test_english_only.js`'s existing state/migration-coverage invariant check (the ten new state ids are brand new, so correctly added to the "nothing to migrate" allow-list rather than the migrations object)

### 0.4.37 (2026-10-03)
- Fix: three test files added in recent releases (`test_show_probable_program.js`, `test_cycle_finish_exception_guard.js`, `test_cycle_boundary_reset.js`) called the bare global `setTimeout()`/`setInterval()` directly in their fake-adapter mocks - the same mistake made and fixed before in other test files, missed again when writing these new ones. Brought in line with the native-timer-alias pattern used everywhere else in this suite (review checker E5004/E5005)
- Fix: `@iobroker/testing` devDependency bumped to `^6.3.0` (current; was `^6.2.2`)

### 0.4.36 (2026-10-03)
- Fix: follow-up to 0.4.34's `needsFeedback` fix, reported live - deleting a cycle (e.g. an unconfirmed one someone just discards without confirming/correcting it first) could also leave `needsFeedback` stuck on `true` forever, since only `confirmCycle`/`correctCycle` had been covered. `clearAllData` and `importConfig` had the same gap (both can also replace `cycleHistory`/profiles wholesale). All three now also re-sync `needsFeedback`; `clearAllData`/`importConfig` additionally re-sync `availablePrograms`
- Covered by 3 new test cases extending `tests/test_programs_and_feedback_sync.js`

### 0.4.35 (2026-10-03)
- Fix: reported live - `phaseText` could get stuck showing an earlier phase (e.g. "Aufheizen"/heating) while `phase` had correctly moved on (e.g. to "dryer_drying"). Root cause: `phase` was already written on every `_onTime()` tick (which fires frequently throughout a running cycle), but `phaseText` (the human-readable, localized, emoji-carrying label) was only ever written in `_onManagerState()` - which only runs on actual state transitions (off/starting/running/paused/ending), not on every phase change within a single long "running" period. Both data points now update together on every tick
- Covered by a new regression test (`tests/test_phase_text_tick_update.js`)

### 0.4.34 (2026-10-02)
- Fix: reported live with screenshots - `availablePrograms` could show `[]` for a device that clearly had saved programs visible in the admin tab's own "Programme" list, while a second device correctly showed all of its programs. Root cause: the data point (and `programOverride`'s dropdown states) was only ever written from five specific admin-tab actions (create/delete/rename a program, "clear all data") - never at startup, and never after a program got auto-learned from a confirmed cycle. A device whose programs were all auto-learned, with none of those five actions performed since the last restart, kept showing an empty list indefinitely even though `profileStore` had loaded the real programs from disk
- Fix: `needsFeedback` stayed `false` even with a cycle visibly pending confirmation in the admin tab's "Lernkontrolle" tab (complete with its own "1" badge). Root cause: the data point was declared in `io-package.json` but never actually written anywhere - the admin tab computes its own pending-cycle count entirely client-side (`updateFeedbackBadge()` in `tab_m.html`, counting cycles with `!confirmed`), so the data point itself never reflected it
- Both are now re-synced (a) unconditionally at the end of every device's startup, (b) after every finished cycle, and (c) - for `needsFeedback` - after a cycle is confirmed or corrected via the admin tab, mirroring the admin tab's own counting logic exactly

### 0.4.33 (2026-10-02)
- Fix: reported live with logs + a screenshot - a brand new cycle could show a leftover best-candidate guess from the *previous*, already-finished cycle for several minutes (e.g. "~30 Speed (76%)" right at the start of a new washing-machine cycle, matching exactly what the previous cycle had matched), before that new cycle's own matching had run even once. Root cause: `_onDetectorState()`'s `STARTING` case reset about a dozen per-cycle fields but not `_bestCandidate`, the field driving both the admin tab's live preview and, at the next confirmed transition, the persisted `program`/`programText`/`confidence` data points. The `STARTING` transition is now the single, authoritative reset point for every per-cycle field (also added the phase-tracking fields as defensive redundancy) - a new cycle can no longer show anything left over from the one before it
- Fix: `cycleProgress` stayed stuck at its last value (often 100%) after a cycle finished, instead of resetting to 0. The reset call reused `_onTime()`, which has a guard that only writes `cycleProgress` when `progressPct > 0` (meant to ignore a brief non-match mid-cycle) - the deliberate reset-to-0 call was silently swallowed by that same guard. `_onTime()` now takes a `forceWrite` parameter that the reset call uses to bypass the guard
- Fix: an uncaught exception during cycle-finish post-processing (notably the post-hoc phase analysis that only washing machines/dishwashers run, more complex than the dryer's live phase tracking) could silently skip the `onStateChange` callback that keeps the `state`/`stateText`/`running`/`program`/`phase` data points in sync - the same class of bug as 0.4.31's dryer-specific case, but for any device type and any exception source. Now guarded with try/catch so a failure in post-processing can never block the state-sync callback
- New option **"Show probable program before confirmation"**: off by default (unchanged behavior - `program`/`programText` show `"detecting..."` until a match is actually confirmed). When enabled, a live best-candidate guess reaching at least 40% confidence is shown immediately, prefixed with `"≈"` (e.g. `"≈ 30 Speed"`), updated continuously as confidence changes - not just the admin tab's own preview anymore, but the actual data points too
- New option **"Text data points without emoji"**: off by default. When enabled, `phaseText`/`stateText` omit their emoji (e.g. `"Washing"` instead of `"🫧 Washing"`) - useful for dashboards, text-to-speech, or anywhere emoji don't render usefully
- All four issues found via a live report (screenshots + debug logs) and fixed with full regression test coverage, including reverting each fix and confirming its test fails first

### 0.4.32 (2026-09-27)
- Fix: follow-up to 0.4.31 - a restart alone did not clear an *already*-stale `state` data point (e.g. stuck on "Running"), even with 0.4.31 installed. `onReady()` only re-wrote the `state`/`stateText`/`running`/`program`/`phase` data points when a restore branch fired (sensor currently drawing power, or a saved cycle needs resuming/finishing) - with neither true (the common case: an idle device whose last cycle already finished cleanly), nothing touched them at all, so a stale leftover value would survive any number of restarts
- Fixed by unconditionally re-syncing these data points with the manager's actual resolved state (`manager.currentState`/`manager.getStatus()`) at the end of every device's startup, regardless of which restore branch fired or didn't. Covered by a new source-inspection regression test (`tests/test_startup_state_sync.js`); also re-ran the full js-controller integration test since this touches `onReady()`
- If you're still seeing a stuck status after installing 0.4.31: this release should finally clear it on the next restart

### 0.4.31 (2026-09-27)
- Fix: reported live - the admin tab showed the dryer as off while the `state` data point still read "Running". Root cause: the dryer's anti-crease "power drop" quick-finish path (`WashDataManager.processPowerReading()` - force-ends a cycle 45s after a sudden power drop, to react faster than waiting for the full off-delay) set the in-memory state to `off` directly and called the internal `_onCycleFinished()`, but - unlike the normal `_onDetectorState()` OFF transition - never invoked the `onStateChange` callback afterwards. That callback is what `main.js`'s `_onManagerState()` uses to write the `state`/`stateText`/`running`/`program`/`programText`/`phase`/`phaseText` data points, so they stayed frozen on their last value from before the drop even though the live status the admin tab reads (`WashDataManager._buildStatus()` via `getStatus`) was already correct. `lastCycle`/`lastCycleProgram`/etc. were unaffected (a separate callback), which is why cycle history looked fine while only the live status data points were stuck
- Fixed by firing `onStateChange` after the quick-finish, exactly as the normal end-of-cycle transition already does. Covered by a new regression test (`tests/test_dryer_drop_finish_state_callback.js`)
- If you're seeing the stuck-state symptom right now: restarting the adapter clears it immediately without waiting for the next cycle to start

### 0.4.30 (2026-09-27)
- Fix: removed the `sinon` devDependency again - it's already provided transitively via `@iobroker/testing`, so listing it directly was flagged as redundant by the review checker (E0063)
- Fix: `tests/test_elapsed_time_unit.js`'s fake-adapter object (added in 0.4.29) made the same bare-global-timer mistake `test_restart_resume_low_power.js` had in 0.4.28 - reworked to use this suite's established native-setTimeout/setInterval alias pattern (E5004/E5005)
- 0.4.29 was tagged and pushed but never reached npm before this follow-up was needed, so its `io-package.json` news entry has been folded into this one rather than left dangling (the review checker's E2004 flags any news entry for a version npm doesn't have)
- Found via the second ioBroker.repositories manual review pass (PR #6459) on 0.4.29

### 0.4.29 (2026-09-27)
- Fix: `elapsedTime` declares role `value.interval`, which requires its value in seconds - but it was computed and stored in minutes everywhere: the state definition's `unit`, the one-time migration for existing installs, `main.js`'s periodic update, and the live snapshot the admin tab reads via `getStatus`/`WashDataManager._buildStatus()`. All four now consistently use seconds, matching `timeRemaining`/`totalDuration`. Covered by a new regression test (`tests/test_elapsed_time_unit.js`)
- Fix: added `sinon` as an explicit devDependency - several existing tests already `require("sinon")` directly, but it was missing from `package.json` (a phantom dependency the repository checker had flagged back when this adapter was first submitted)
- Both found via the ioBroker.repositories manual review pass on 0.4.27/0.4.28 (PR #6459); the `elapsedTime` unit mismatch had previously been marked "ignore for now" by the reviewer before being flagged again in a later pass

### 0.4.28 (2026-09-27)
- Fix: `@iobroker/testing` devDependency bumped to `^6.2.2` (the review checker's required minimum; was `^6.1.0`)
- Fix: the GitHub noreply author email (`backfisch88@users.noreply.github.com`), rejected by the repository review checker, replaced with a real contact address in `package.json`, `io-package.json` and the `README.md`/`LICENSE` copyright lines
- Fix: `tests/test_restart_resume_low_power.js`'s fake-adapter object called the bare global `setTimeout`/`setInterval` directly, which the review checker's plain-timer-usage check flags; reworked to use the same native-timer-alias pattern already used by every other test file in this suite. The mock's job is unchanged - it still just forwards to the real timer under the `adapter.setTimeout`/`adapter.setInterval` name
- Found via the first ioBroker.repositories manual review pass (PR #6459) on 0.4.27

### 0.4.27 (2026-09-25)
- Fix: the notification-target dropdown in the admin tab showed a hardcoded German placeholder ("Alle (broadcast)") for every notification adapter except Telegram/email, regardless of the configured system language - for Telegram this got overwritten a moment later once the user list loaded, but for Pushover/Signal/WhatsApp/Matrix/notify-my-android/Prowl it was never replaced. Now uses the existing translation everywhere
- Fix: a Telegram user's display name (settable by anyone who messages the configured bot) was written into the admin tab's dropdown options via unescaped string concatenation - a stored-XSS-style risk in the admin UI. Now HTML-escaped before insertion
- Found via a repository-quality review of the admin tab; both are covered by new regression tests

### 0.4.26 (2026-09-25)
- Fix: a program correctly detected early in a cycle (confirmed via score accumulation, which can land as low as 60% confidence) could later revert to "detecting..." near the end if it was never boosted by locking - the protection against this (locking a confirmed program so a later run of unmatched readings can't wipe it) used to only activate if some individual reading also happened to reach 75% confidence on its own. Now it activates immediately on every confirmation, regardless of the confirming confidence. Confirmed against a real log: a wash cycle's program was correctly detected at 68.4% at 07:31, then a ~90-minute stretch of "no match" readings (bestCandidate still consistently the same program, just below the 55% match threshold) would have reverted it before this fix. A high-confidence, persistent override to a genuinely different program remains possible and unaffected

### 0.4.25 (2026-09-23)
- New: full per-phase duration learning model for remaining-time estimation. Each program now learns not just its overall duration, but how long each individual phase (heating, washing, spinning, dryer_drying, cooling, ...) typically takes, and in what order. Once at least 3 confirmed cycles have data for the current phase, remaining time is estimated as "time left in the current phase, plus the typical duration of every phase that historically follows it" - far more accurate near the end of a cycle than a single whole-cycle average, especially for a phase (like a dryer's main drying phase) whose position relative to total cycle length varies a lot between runs. Automatically falls back to the 0.4.24 time/energy blend until enough phase data exists

### 0.4.24 (2026-09-23)
- Improved remaining-time/progress accuracy, especially for the dryer: each program now also learns its historical duration variance (`durationCV`) - a dryer's drying time depends heavily on load size/dampness, so it naturally varies far more than a fixed-temperature wash. The remaining-time estimate now leans more on the live energy-consumption pace for programs known to vary a lot, and more on the historical time average for consistent ones
- Fix: the reported progress percentage is now derived from the same blended remaining-time estimate instead of a separate pure elapsed-time ratio, so "Fortschritt" and the predicted finish time can no longer disagree with each other
- Added a remaining-time cap for the dryer's short "cooling" phase, matching the washer's existing "spinning" cap

### 0.4.23 (2026-09-16)
- Fix: a cycle interrupted by an ioBroker restart while the device's power had already returned to idle was silently orphaned - the on-startup restore logic only handled the case where power was still high at restart, so the manager just reinitialized to "off" without ever properly finishing the interrupted cycle, leaving it stuck showing "running" with stale pre-restart values forever. Combined with the `offDelayMin` fix in 0.4.22, this should resolve "cycle never ends" reports after a mid/post-cycle adapter restart

### 0.4.22 (2026-09-16)
- Fix: the per-device "Off delay" setting (`offDelayMin`) was silently ignored - `CycleDetector`'s config merge never translated it into the field the detector actually uses (`offDelay`, in seconds), so every device always used a hardcoded 5-minute default regardless of what was configured. Found via a real trace where a cycle stayed stuck as "running" long after power had genuinely dropped to ~0W. Note: this alone doesn't fully explain very long stalls (well over an hour) - if a cycle still gets stuck after this fix, please share the adapter log from around that time

### 0.4.21 (2026-09-08)
- Fix: translated all remaining German user-visible strings in the admin tab (toasts, table headers, confirm dialogs - about 35 instances, more than initially found by review) into the existing i18n system
- Fix: a cycle's `matchedProfile` could be stored server-side as literal German text ("Anti-Knitter") for anti-crease-tagged cycles, showing up untranslated in the `lastCycleProgram` data point and cycle history regardless of system language - now stored as a language-neutral marker and translated at display time
- Fix: two remaining hardcoded German date/time locales in the admin tab now use the configured language like everywhere else
- Fix: added the full MIT license text to README.md (previously only the header/copyright line)
- Extended the English-only regression test to also cover the admin tab, closing the gap that let these issues go unnoticed for several releases

### 0.4.20 (2026-09-08)
- Fix: added Node.js 26 to the CI test matrix (`unit-tests` and `adapter-tests`)
- Fix: updated the `@iobroker/testing` devDependency to 6.1.0 - checked both 6.0.0's and 6.1.0's breaking changes against this adapter (no `prepare` script, no `encryptedNative` properties, no `changeAdapterConfig()` usage in the integration test - none apply); full test suite, `test:package`, and `test:integration` all still pass

### 0.4.19 (2026-09-05)
- Fix: use `node:`-prefixed built-in module imports (`node:fs`, `node:path`) consistently everywhere (`lib/displayLabels.js`, `test/integration.js`, `test/package.js`), not just in `main.js`
- Fix: updated `@iobroker/adapter-core` to the currently required minimum version (3.4.3)
- Fix: three incomplete Dutch/Polish/Ukrainian changelog translations for 0.4.12 that were noticeably shorter than the English original

### 0.4.18 (2026-09-02)
- Fix: the dryer anti-crease lock period (learned duration + a fixed 10-minute buffer) could expire while the dryer was still genuinely doing its anti-crease tumbling - real anti-crease duration varies cycle to cycle, so a fixed length occasionally ran out mid-tumble, letting the tail end trigger a false new-cycle detection. The lock now extends when a genuine tumble spike occurs near its expiry, capped at 90 minutes total from the beep

### 0.4.17 (2026-08-31)
- New: `phaseText`, `stateText`, `programText` data points - localized, ready-to-display versions of the existing language-neutral `phase`/`state`/`program`, useful for a VIS dashboard without building your own translation table
- New: "Display language" setting per device (defaults to the ioBroker system language)
- Internal: the phase-translation table (previously only in the admin tab, for the cycle graph legend) is now one shared file (`admin/phaseLabels.json`) used by both the admin UI and the new server-side data points, instead of two separately maintained copies
- Translated remaining German code comments to English (not a review/checker requirement - developer-only comments in German are explicitly permitted - done on request)
- Reorganized the README changelog: the current 0.4.x series stays here in full, the pre-0.4.0 beta history (0.2.2–0.3.0) moved entirely to CHANGELOG_OLD.md (previously one version, 0.2.5, existed with near-duplicate text in both places)

### 0.4.16 (2026-08-31)
- New: notification templates support a `{state:objectId}` placeholder that resolves any ioBroker data point's current value at send time (e.g. outside temperature, electricity price), in addition to the existing built-in placeholders. Works inside conditional `[...]` blocks too - a block hides itself if the referenced data point is empty
- Fix: a leftover German word ("Fertig") in the notification subject line

### 0.4.15 (2026-08-31)
- Fix: notification-language cache was module-level state (compact-mode leak risk between instances sharing a process) - moved to an instance field, same fix class already applied to ProfileStore's MIN_CONFIDENCE
- Fix: two devices accidentally sharing the same power sensor now log a warning instead of one silently losing updates
- Fix: `durationTolerance`/`matchIntervalMin`/`matchPersist`/`offDelayMin` normalization used a bare `||` default (same falsy-zero bug class fixed for other fields in 0.2.3) - aligned to the strict check
- Removed unused dead code (`msgBlockTimer`, never assigned anywhere)

### 0.4.14 (2026-08-30)
- Replaced the low-resolution 128x128 adapter icon with a new, sharper 256x256 version

### 0.4.13 (2026-08-27)
- Fix: the `running` state's name was still German ("Läuft") on existing installations, even though the code has said "Running" for a long time - it was missing from the state-name migration list added in 0.4.12 (found via a fresh object dump). Extended `tests/test_english_only.js` to check that every state id is covered by the migration, catching this kind of gap automatically going forward

### 0.4.12 (2026-08-26)
- Fix: all log messages and state names are now in English (found via the ioBroker.repositories manual review - PR #6459) - several were still German, including `forceFinish`/`programOverride`/`lastMessage` and others
- Fix: the `forceFinish` button state now correctly has `read: false`, matching the ioBroker role specification for `role: "button"`
- Fix: existing installations are automatically migrated to the corrected English state names on next start (`setObjectNotExistsAsync` never updates an already-existing object, so a one-time migration step was needed)
- Fix: running multiple devices on one adapter instance via native config's `devices` array was effectively impossible - the single configured device and the array were treated as mutually exclusive rather than combined. A dedicated admin UI for adding devices this way is still being worked on separately; for now, entries can be added by editing the instance's native config directly
- Docs: corrected the Requirements section (Node.js ≥ 22, js-controller ≥ 6.0.11 - it previously listed older, no-longer-enforced minimums), documented why the adapter ships a custom admin tab, and linked the recommended Shelly EM hardware

### 0.4.11 (2026-08-26)
- Fix: audited every remaining admin UI setting for the same class of bug fixed in 0.4.10 (a field silently never reaching the code that uses it) and found one more - "Notify also for probable program" (`notifyOnProbable`) was read via the device-config lookup but never included in what that lookup actually returns, so the checkbox had no effect
- Extended `tests/test_manager_config_wiring.js` to also check fields read directly off the device-config lookup (not just fields passed into `WashDataManager`), so this class of bug should be caught automatically going forward

### 0.4.10 (2026-08-26)
- Fix: found the actual root cause of the anti-crease false-restart bug (0.4.9 only clarified the checkbox wording) - `main.js` built the config object passed into `WashDataManager` field-by-field, and `ignoreAntiKnitter` was missing from that list entirely, so the lock-out protection could never activate regardless of the checkbox or a saved reference pattern
- Fix: found and fixed two more settings silently broken by the exact same kind of omission, which likewise never took effect no matter what was configured: "Program detection threshold (%)" (`matchThreshold`) and "Instant adoption from confidence (%)" (`instantConfirmThreshold`)
- Added a regression test (`tests/test_manager_config_wiring.js`) that checks every setting `WashDataManager` reads is actually passed through from `main.js`, to catch this class of bug in the future

### 0.4.9 (2026-08-24)
- Fix: on dryers, anti-crease tumbling after the beep could be mistaken for the start of a new cycle even when a reference pattern had been recorded, because the lock-out protection was tied to the "Ignore saved anti-crease pattern" checkbox rather than to whether a pattern actually exists - clarified the checkbox's label/help text (was easy to read backwards) and added a hint after saving a pattern if that checkbox still needs to be switched off

### 0.4.8 (2026-08-16)
- No functional changes. Migrated `admin/i18n` to the short-format file structure (`i18n/<lang>.json` instead of `i18n/<lang>/translations.json`) via `npm run translate convert` - repository checker suggestion S5601

### 0.4.7 (2026-08-16)
- Fix: on devices going through the generic phase-history branch (currently dryers), recorded phase timestamps could show wildly wrong values (often large negative numbers, e.g. from days-old previous cycles) because the internal phase-history buffer was never cleared between cycles - found via a production object-structure dump during the "add to latest" review
- Fix: repository checker finding - invalid state role `"value.percent"` on `cycleProgress` (not a valid ioBroker role), corrected to `"value"`

### 0.4.6 (2026-08-16)
- No functional changes. Switched npm publishing to Trusted Publishing (OIDC) so releases are signed with provenance (repository checker E2008)

### 0.4.5 (2026-08-08)
- Fix: a finished cycle could stay stuck showing "running" indefinitely if the power sensor stopped reporting after settling at a flat value (many sensors, incl. Shelly, only report on change) - the state machine is now re-evaluated periodically (heartbeat) so it can still finish on schedule
- Fix: repository checker findings from issue #39 (real `test:package` validation instead of a no-op stub, corrected `adminUI.tab`/`materializeTab` config, responsive `jsonConfig.json` layout, various CI/tooling fixes)
- (copilot) Adapter requires node.js >= 22 now
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.4.1 (2026-07-30)
- Fix: `ReferenceError: _suggestedApplied is not defined` crashing the admin tab in some browsers/modes
- Fix: some Admin instances (especially the newer React-based rendering) showed a 404 "File tab.html not found" instead of loading the admin tab correctly - caused by an earlier cleanup that removed the `materializeTab` flag, which actually controls which filename (`tab.html` vs. `tab_m.html`) Admin resolves the custom tab to

### 0.4.0 (2026-07-30)
- New: full multilingual support - admin UI, notifications, and program phase names now translate automatically into 11 languages (en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn) based on the ioBroker system language
- New: all code comments translated to English, full compliance with the official `@iobroker/eslint-config` (formatting + JSDoc)
- Fix: the "All devices" status column and default notification templates weren't going through translation
- Infrastructure: CI no longer needs a committed `package-lock.json`; real integration test added; git history cleaned up
- Note: cycles recorded before this update show phases as an uncolored/unrecognized segment in the graph legend (the old German phase names no longer match the new internal phase keys) - purely cosmetic, only affects historical data

Older changelog entries (pre-0.4.0 beta history) can be found in CHANGELOG_OLD.md.

---

## Contributing

Issues and pull requests are welcome: [Issues](https://github.com/backfisch88/ioBroker.laundrylens/issues)

---

## License

MIT License

Copyright (c) 2026 backfisch88 <henrik.schoenhofen@icloud.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.