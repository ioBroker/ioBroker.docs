---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.public-holidays
BADGE-stable: https://iobroker.live/badges/public-holidays-stable.svg
BADGE-Installations: https://iobroker.live/badges/public-holidays-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.public-holidays
BADGE-Test and Release: https://github.com/krobipd/ioBroker.public-holidays/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# Public Holidays

Public Holidays turns the calendar into data points: whether today is a holiday, what it is called,
what is coming next and how many days away it is. Everything is calculated **offline** on your own
system — there is no account, no API key and no internet connection involved.

## How it works

The adapter runs in **schedule mode**. It calculates once when it is started or when you save the
settings, and after that once a day at midnight, triggered by the ioBroker controller. Each run
writes its results and the process ends again — it does not stay in memory between runs.

The holiday data comes from the `date-holidays` library, which is shipped with the adapter and
covers 206 countries including their states, provinces and regions.

## Setup

1. Install the adapter from the ioBroker repository (stable or latest) and create an instance.
   Installing from a GitHub URL is not supported.
2. Open the instance settings. All settings live on one guided card, worked through from top to
   bottom.
3. Save. The adapter calculates immediately and writes its data points.

### Location

Pick your country. States/provinces and regions only appear for countries that have them — for
example Germany has states, Italy has numeric province codes.

If you leave the country empty, the adapter takes the country from your **ioBroker system settings**
(System settings → Main settings → Country) and writes a line to the log saying which country it
used. If that country cannot be matched, the adapter says "No country configured" and stops.

### Holiday types

Five types can be enabled independently:

| Type       | Meaning                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
| Public     | Statutory public holidays. Enabled by default.                                       |
| Bank       | Days on which banks and public offices are closed but which are not public holidays. |
| School     | School holidays.                                                                     |
| Optional   | Days that are a holiday only for parts of the population.                            |
| Observance | Commemorative days that are not days off — e.g. Mother's Day.                        |

If two holidays fall on the same day, three rules decide which name is reported, in this order:

1. the higher-ranking type wins, in the order of the table above,
2. a holiday that genuinely belongs on that day beats one that was only moved there off a weekend,
3. and if that still ties, a fixed internal ordering decides.

All three are unambiguous, so the name stays the same across data updates. Until version 0.15.1 a
tie was settled by whichever holiday the data happened to list first, which could change silently
with a data update — in 42 countries, among them Norway, Poland, Romania, Serbia and Taiwan.

> If you switch **all** types off, the adapter reports no holidays at all — the settings card and
> the log both say so.

### Bridge days

A bridge day is a working day squeezed between a holiday and the weekend. With the option enabled
the adapter adds them as holidays in their own right, named "Bridge day" in your language:

- a holiday on **Thursday** → the **Friday** becomes a bridge day,
- a holiday on **Tuesday** → the **Monday** becomes a bridge day,
- a **Wednesday** framed by a holiday on Tuesday _and_ Thursday becomes a bridge day.

A Wednesday holiday alone creates none: reaching the weekend from there would need two days off.
A bridge day never overwrites a real holiday, and it never creates further bridge days.

### Excluded holidays

Some holidays are irrelevant for a given household — you can exclude individual entries. The list
offers exactly the holidays of your selected location and enabled types, so what you can exclude is
what the adapter would otherwise report.

An exclusion is stored by an internal id derived from the holiday's calculation rule. If a later
data update renames or removes that rule, the exclusion no longer matches anything — the adapter
then writes a warning naming the stale entry, and the settings card shows it as a removable chip
under the selection list.

Exclusions are applied **before** bridge days are worked out, so excluding a Thursday holiday also
removes the Friday bridge day that came with it.

### Detected holidays

The bottom of the card previews the holidays the adapter will detect for the current year with your
current settings — including bridge days and minus your exclusions. It is calculated the same way
the adapter calculates, so what you see is what you get.

## Data points

| Data point                                             | Type             | Meaning                                                                        |
| ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------ |
| `today.name`                                           | string           | Name of today's holiday, empty on a normal day                                 |
| `today.isHoliday`                                      | boolean          | Whether today is a holiday                                                     |
| `yesterday.name` / `yesterday.isHoliday`               | string / boolean | Same for yesterday                                                             |
| `tomorrow.name` / `tomorrow.isHoliday`                 | string / boolean | Same for tomorrow                                                              |
| `dayAfterTomorrow.name` / `dayAfterTomorrow.isHoliday` | string / boolean | Same for the day after tomorrow                                                |
| `next.name`                                            | string           | Name of the next upcoming holiday                                              |
| `next.isHoliday`                                       | boolean          | Whether an upcoming holiday was found at all                                   |
| `next.date`                                            | string           | Its date as `YYYY-MM-DD` — machine-readable, unaffected by your display format |
| `next.daysUntil`                                       | number           | Days until that holiday                                                        |

All data points are read-only, and each one carries a short explanation in your language that you
can read in the object tree. `next` looks strictly ahead: a holiday that is today appears in
`today`, not in `next`.

The names of the channels and data points follow your ioBroker system language and are refreshed on
every run — including on installations that were updated rather than newly installed. If you rename
one of these data points by hand, the adapter will overwrite it again.

## Language

Holiday names are shown in your ioBroker system language when the holiday data provides that
language, otherwise in English. Eleven languages are supported: German, English, Spanish, French,
Italian, Dutch, Polish, Portuguese, Russian, Ukrainian and Chinese.

## Troubleshooting

**No holidays are reported at all.**
Check the log. "No country configured" means neither the adapter nor the ioBroker system settings
provide a usable country. "No holiday type is enabled" means every type checkbox is off.

**The state or region I configured seems to be ignored.**
An unknown state or region silently falls back to the broader level. The adapter detects this and
warns: "State 'XX' is unknown for YY — using country-level holidays". Pick the entry from the
dropdown rather than typing it. If a data update removed the entry you had stored, the settings
card points it out above the dropdown and leaves your configuration untouched until you pick a new
one.

**A holiday is missing or appears unexpectedly.**
Enable the matching holiday type — some days count as observances rather than public holidays, and
this can change with a data update. Also check your exclusion list.

**An exclusion stopped working after an update.**
The holiday's calculation rule was renamed in the data. The adapter warns about stale exclusions on
every run; remove the chip in the settings and pick the holiday again.

**The log shows `Connection is closed.` around midnight.**
This comes from the ioBroker controller shutting the adapter down, not from the adapter itself. It
is harmless; the run has already written its data points at that point.

## Privacy

The adapter works entirely offline: no data leaves your system. Optional error reporting via Sentry
can be switched off in the ioBroker settings — see the Sentry plugin documentation linked in the
main README.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.16.0 (2026-09-06)

- Fixed: Two holidays on one day could swap the reported name on their own with a data update. A fixed rule decides now — the name changes in 39 countries, among them Norway, Poland and Taiwan.
- Fixed: A day moved off a weekend no longer pushes aside the holiday that genuinely belongs on that date.
- New: Every data point now explains itself in the object tree, in your language.
- Fixed: Opening the settings marked them as changed when a stored state or province had vanished from the holiday data. The card points that entry out now instead.
- Fixed: A country written as a name instead of its code was rejected in the settings, although the same name worked when it came from the ioBroker system settings.
- Fixed: Refreshed holiday data — Belgian holidays now carry English names, and the entries for Albania and Andorra were corrected.
- Changed: Install the adapter from the ioBroker repository (stable or latest) — installing from GitHub is no longer supported.

### 0.15.1 (2026-09-04)

- Fixed: Installations kept whatever holiday data was already on the system, so corrections and new countries never arrived. An update now brings the current data along.

### 0.15.0 (2026-09-04)

- Fixed: With no holiday type enabled the adapter reported nothing without a word while the card still previewed a full year. Card and log now say it.
- Changed: Channel and data point names are refreshed on every run, so renames reach updated installations too — a manual rename of them is overwritten.

### 0.14.0 (2026-09-01)

- New: the next-holiday log line now shows the date in your system's date format — for example 26.10.2026 instead of 2026-10-26. The date data point itself stays machine-readable for scripts.

### 0.13.2 (2026-08-27) — stable

- Fixed: Stopping or restarting the instance while the holidays were being worked out cut that run short, which could leave half-written values and errors in the log.
- Changed: Heads-up for Austria — St. Martin's, Rupert's and Referendum Day count as observances now and disappear unless that type is enabled. Plus data fixes for Ireland, Russia and others.

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_