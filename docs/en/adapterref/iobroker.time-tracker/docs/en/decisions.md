---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Decisions and deviations

This document records decisions that deviate from the original scope, so that they stay traceable later. Like the other
documents under `docs/` it also exists in German ([`../de/entscheidungen.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/entscheidungen.md), the original
text); the `README.md` is English (a requirement of the adapter checker).

## D1 — No import of the old data of the predecessor system (16.09.2026)

**Decision:** The adapter does **not** read the existing data of the predecessor system. There is no importer, no trial
run and no import reports.

**What was removed with commit `184414c`** (65 files, 41 lines added, 3861 removed):

| Part                                  | Scope                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parser (`src/lib/legacy/parsers.ts`)  | `Data/users.txt`, `Data/group.txt`, `<login>/userdaten.txt` (18 index-based lines), `<login>/absenz.txt`, `Timetable/<year>` (12 lines of target/balance in hours), `Timetable/<year>.<month>` (punch times), `Timetable/A<year>` (absences), `Timetable/auszahlungen`, `Timetable/total.txt`, `include/Settings/pausen.txt`, `include/Settings/settings.txt` |
| Detection (`scan.ts`)                 | recognise an installation by its directory layout (internal specification 2.9.10, step 1)                                                                                                                                                                                                                                              |
| Import (`import.ts`)                  | mapping and normalisation, trial run and real run, idempotency, duplicates, report                                                                                                                                                                                                                                                      |
| Interface                             | admin tab, adapter command (`sendTo`), REST routes, `native` fields (directory, trial run, repeat)                                                                                                                                                                                                                                      |
| Test data                             | `fixtures/smalltime/**` and `tools/make-legacy-fixture.mjs`                                                                                                                                                                                                                                                                             |
| Provenance                            | `docs/provenance.md`, `tools/cleanroom-check.ps1` (see D3)                                                                                                                                                                                                                                                                              |

**Consequences**

- The migrations clean up the intermediate states: `users.legacy_sha1`, `work_profiles.legacy_source` and
  `rfid_tags.legacy_code` together with the index `idx_rfid_legacy` are removed if they exist
  (`src/lib/db/migrations.ts`).
- **No user is affected:** the removal ran on 16.09.2026 at 08:18, the first publication `0.0.4` appeared on npm at
  16:32 — **no** published version contained the importer.
- `time_entries.source` and `EntrySource` still know the value `import`; it is just no longer created.
- The acceptance point “old data can be imported with a dry run” of the internal specification is therefore
  **deliberately open**; the acceptance run in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) now checks only the behaviour of the adapter
  itself.

**Reasoning:** An importer would have had to fix the meaning of every single column of the existing data; without a real
copy of the data of the reference installation this mapping would only be guessed — and the rules in
[`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md), section 1, forbid deriving it from foreign program code or its interface. It
was not needed: the adapter starts with empty master data, the administration creates users, work profiles and absences
itself. The removal took out 65 files and 3861 lines; the earlier state stays reachable through the history (`184414c`).

**If the import is to come back:** The complete state is in the Git history (`git show 184414c^:src/lib/legacy/import.ts`).
What would be needed: test data under `fixtures/smalltime/**` (from a real installation, **not** derived from foreign
program code), the four database columns through a new migration, admin tab, adapter command and REST routes.

## D2 — `common.compact: false`

The adapter binds its own HTTP port and keeps an SQLite file in WAL mode open for its whole run time, so it runs as a
process of its own on purpose. The reasoning, the handling of the note `W5049` and the resulting rule “no
`process.env`/`process.exit` in the source code” are in [`adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md).

## D3 — Provenance record outside the repository (16.09.2026)

Until 16.09.2026 `docs/provenance.md` (source and date of the reference system, procedure for the record) and
`tools/cleanroom-check.ps1` (text comparison against the reference installation) were in the repository. Both were
removed with commit `184414c`, because with the importer (D1) the only part dropped out that touched formats and
identifiers of the predecessor system.

**What stays:** The section [“Provenance”](/#/adapters/time-tracker#provenance) of the `README.md` names the origin, and the clean
room rules are binding in [`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md) (section 1). The record itself is kept **outside**
this repository.

**If the automatic comparison is to come back:** The script is in the history
(`git show 184414c^:tools/cleanroom-check.ps1`); it expects the reference installation as a path parameter
(`-LegacyPath`) and reports hits as a list.

## D4 — Backups from the browser: upload through the raw body, limit per route (17.09.2026)

The administration could download a backup and restore a **listed** one. **Deleting** and **restoring a downloaded file**
were missing — both need the same decision at the transport: the API reads every body against a **router-wide** limit
(2 MiB), and a route could not set a limit of its own so far. A backup is bigger than that limit.

**Decision:** `RouteDefinition` gets an optional `maxBodyBytes`. Only `POST /backup/restore` sets it (64 MiB), all other
routes stay at 2 MiB — the tests hold both (a large body against another route still ends in `413 payload_too_large`).
The web server reads with the same bound (`MAX_BACKUP_UPLOAD_BYTES`), because the transport rejects a body before a route
sees it at all. _(Changed in D18: the transport now asks the router for the limit of the route and grants the raised
limit only to a signed-in caller who may restore.)_

The upload arrives as a **raw body** (`application/octet-stream`), not as Base64 in JSON: the browser sends the chosen
file directly (`body: file`), the server keeps it for this content type as **bytes** instead of text. Decoding as UTF-8
would destroy binary data; there is a test with a byte sequence that is not valid UTF-8 (size **and** SHA-256 have to
arrive). Name and reason travel as query parameters; the name is only a label for display and log and is cleaned to
`[A-Za-z0-9._-]` before saving.

**Safety net:** The new file replaces the waiting one only **after** it was checked — it is written as `<…>.part` first,
verified and then renamed. A refused file therefore leaves an already queued restore untouched, and a half-written file
can never become the database at the next start.

**Delete:** `DELETE /api/backup/:name` deletes only files that are in the list (a name from outside never reaches the file
system), writes `backup.remove` to the audit and asks in the interface. The automatic rotation stays untouched and keeps
running in the background.

## D5 — Break from the punch or from the break scale (17.09.2026)

The time statement has a column “Break”, and the calculation was `balance = sum(pairs) − scale − target`. Two things about
that were misleading or wrong:

1. **The column did not show the actual break.** Whoever punches in/out/… creates pairs; the time between two pairs is
   the break. It was missing from the sum of the pairs (the “gross”) — but the column “Break” was filled from the break
   scale alone. Result: whoever punched half an hour saw `Break 0:00`.
2. **A punched break was deducted twice** as soon as a scale rule applied in addition: the gap was missing in the gross
   already, and the rule deducted once more (07:00/13:30/14:00/17:00 gave 9:00 instead of 9:30).

**Decision:** The calculation now starts from the **presence** (first punch to the last finished punch) and deducts
exactly one break:

| Mode (`pause_mode`) | Column “Break”                                              | Working time      |
| ------------------- | ----------------------------------------------------------- | ----------------- |
| `auto` (default)    | punched break, otherwise the scale                          | presence − break  |
| `punched`           | only the punched break (`0:00` if nothing was punched)      | presence − break  |
| `staffel`           | only the scale rules                                        | presence − break  |

The scale stays what it is meant for: the flat break for days on which nobody punches. A day with an **open** punch has no
final break yet — the scale applies there.

**Paid break:** New field `work_profiles.pause_paid_minutes` (migration 13) with a number field in the work profile of
each employee: **this many minutes of the break per day are paid** (`0` = not at all). A value of `1440` pays a break of
any length; a company that pays only a quarter of an hour enters `15`. The paid minutes are added to the working time, the
rest of the break stays a deduction — the column “Break” still shows the **whole** break, so that the statement stays
comprehensible. (At first this was a yes/no switch; migration 13 converts it: “paid” becomes `1440`.)

**Side note:** There was no way to maintain the break scale at first — the table `pause_rules` had no writer left (the data
import was dropped with D1), so the rules were empty in a fresh installation and “break” was always `0:00` there. Since the
last round there is `GET`/`PUT /api/pause-rules` (right `settings.edit`) and an editor in the tab **Settings**: rules with
“from minutes / to minutes / break minutes” and a switch per rule; the call replaces the whole table, missing rules are
removed.

**Proof:** The time statement shows the column **“of which paid”** (`day_aggregates.paid_break_min`, migration 14) next to
“Break”, with a sum — so the PDF and the Excel file show which part of the break was paid.

## D6 — Only the administration changes times, the employee notes the day (24.09.2026)

Whoever can change a time can invent working time. Up to here an `employee` could change and add **own** punches within
the edit window (`edit_window_days`, default 7 days); in the month view the pencil opened exactly this dialog. Two things
about that were wrong:

1. **The month dialog was not tied to the employee.** `DayCorrectionsDialog` asked for the punches **without** `userId`
   (`api.entries(date, date)`), so the server used the own account — and `createEntry` wrote with
   `userId: session.user.id`. In the month of an employee (`/month?userId=…`) the administration therefore showed and
   changed its **own** punches; “Add punch” created a punch in the own account.
2. **The time is not the business of the employee.** A forgotten punch is a **message**, not a correction: the employee
   knows that they forgot it, the administration books it.

**Decision:** Times belong to the administration, the employee **notes**.

| Role                                      | Pencil in the month                         | Content of the dialog                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`, `manager` (`time.edit_other`)    | own month and month of an employee          | punches of the day: add, change time, delete (`time.delete`), **reason** for the log — tied to the employee whose month is open                            |
| `employee`                                | own month only                              | **note for the day** (“forgot to punch in/out”), nothing else                                                                                              |

On the server behind it: `POST /api/entries` (manual entry) and every setting of `tsUtc` in `PATCH /api/entries/:id` demand
`time.edit_other`; an own punch can only be **commented** (`note`) now. `DELETE` stays `time.delete`. Punching continues
through `time.punch` (`/punch`, `/punch/quick`, the offline queue `/entries/sync`).

**The note** needs a place of its own, because exactly the day **without** a punch is the case it is meant for: table
`day_notes` (migration 25, one entry per employee and day) with `GET`/`PUT /api/day-notes` (own days with `time.edit_own`,
other days with `time.edit_other`; an empty text deletes) and `POST /api/day-notes/handled` — the administration ticks the
note off as **done**, it stays visible. The month marks a day with a note (symbol next to the balance): open = yellow, done
= grey.

**The administrator account does not punch:** It is created by the installation and belongs to nobody, it administers the
employees. The role `admin` therefore loses `time.punch` (seed and migration 26); whoever works as well gets the right back
through the role `employee` (permissions are the union of the roles). The `manager` keeps punching and correcting. The start
page explains to the account without the punch right what it is for.

**Effect on the edit window:** A check was left over that nobody could reach any more: `requireInsideEditWindow` would have
refused own punches outside `edit_window_days` — but after this decision only whoever has `time.edit_other` may change own
times, and for them the check exited early. It is therefore removed (together with the problem `edit_window_closed`). The
setting stays and works in exactly one place: on the **offline queue** — a punched entry that arrives older than
`edit_window_days` is stored as a conflict `too_old` and counts only when the administration accepts it.
`GET /entries/conflicts` takes `?userId=` for that, so that the administration sees the queue of an employee.

**Proof:** `src/lib/db/repositories/dayNotes.test.ts`, the permissions in `src/lib/web/routes/corrections.test.ts` (employee: 403 for
times, 200 for the own note), `too_old` in `src/lib/services/sync.test.ts` and the flow in `test/e2e/day-notes.spec.ts`
(note of the employee, correction and “done” of the administration).

## D7 — There always stays an active administrator (24.09.2026)

An administrator can take the administration away from themselves. Two ways led there: **deactivating** the own account
(a special rule already helped against that — `PATCH /users/:id` and `DELETE /users/:id` refuse it, because the running
session would end at once) and **removing the role `admin`** through the roles dialog. The second way was unprotected: whoever
is the last active administrator and takes the role away can manage nothing afterwards — employees, roles, terminals,
settings and backups depend on this role alone. One would get back only through a restart of the instance with a **free**
`adminLogin` (`ensureAdministrator` creates an administrator only if there is no **active** one, and fails with
`LoginExistsError` if the configured login is taken).

**Decision:** A change that would leave the installation without an active administrator is refused — problem
`last_administrator`, status 409. The rule checks **both** fields together (`isActive` and `roleKeys`), because a request
can set both, and counts only **active** accounts: a deactivated administrator helps nobody.

| Situation                                                              | Result                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------ |
| the last active administrator is deactivated                           | 409 `last_administrator`                         |
| the last active administrator loses the role / `roleKeys: []`          | 409 `last_administrator`                         |
| another active administrator stays                                     | 200, the change goes through                     |
| deactivate the own account                                             | 400 `ValidationError` (rule of its own, unchanged) |

`DELETE /users/:id` deactivates accounts as well, but demands `user.deactivate` — only the role `admin` carries that, so the
caller is an active administrator themselves and the target is never the last one. The rule is therefore only in the
`PATCH`; a comment at that place records this.

**The interface warns before:** The switch of the **own** account explains in a dialog why the own account cannot be
deactivated, instead of sending a request that would be refused. For the last active administrator the roles dialog says
that the role cannot be withdrawn and disables “Save” as long as the tick is missing; for any other own account it only warns
that all administration rights disappear at once. The message of the server appears as `error.last_administrator` in all
eleven languages.

**Proof:** `src/lib/web/routes/users.test.ts` (“keeps the last active administrator in place”: second administrator, refusal for the
last one, success as soon as another one carries the role), `test/e2e/users.spec.ts` (warning at the own account, disabled
saving, unchanged state).

## D8 — The calendar goes to ioBroker as a feed and as a state (24.09.2026)

The personal ICS link from 0.5.0 (`POST /calendar/token` → `GET /calendar.ics?token=…`) is meant for employees: it shows
**one** person and is entered into a calendar app. For ioBroker both were missing: a view of the **whole company** and a way
that needs no network, token and copying.

**Decision:** The calendar of the company is offered in three ways, all without a session:

| Way  | How                                                                                           | For whom                                                                                                                                      |
| ---- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| File | `<iobroker-data>/files/time-tracker.<n>/calendar.ics`, rewritten at every change and every 5 minutes | the `ical` adapter as a **local file** — no URL, no token, no network — and a browser through the file server of a `web` instance            |
| URL  | `GET /api/calendar.ics?token=<instance token>` (the instance token is checked first)          | a calendar app or a script that gives the link to `ical.0.iCalReadTrigger`                                                                    |
| Data | `calendar.absences` (JSON) and `calendar.updatedAt`                                           | scripts, Blockly, VIS                                                                                                                         |

The file deliberately lies in `files/` instead of the instance folder next to it: only the adapter can read that one,
whereas a `web` instance delivers `files/` as a download (`http://<host>:8081/files/time-tracker.0/calendar.ics`). The
**link** has to lie below the prefix `/api` — without it a browser gets the web interface with its sign-in instead of the
calendar (`companyFeedUrl` in `src/lib/services/calendar.ts` records that, the routine is tested).

_(Addendum 25.09.2026: the file server route turned out not to be viable — see **D11**. Addendum 27.09.2026: since 0.7.11 the
file is created through the file API of the adapter; since 0.7.12 it hangs on a **mount point** for that and lies under
`files/time-tracker.<n>/storage/calendar.ics` — why the instance namespace itself cannot be the mount point is in **D11**.
Whether the file server delivers it afterwards is checked by **T28** — the case passed on 27.09.2026 with 0.7.12: the log is
free of errors, the folder is in the file manager, the download delivers a file free of errors and the file server hands it
out under the mount point (`http://<host>:8081/files/time-tracker.0/storage/calendar.ics`). Only the path without `storage`
stays without a file.)_

The instance token does **not** appear by itself: `commands.rotateCalendarToken` (a Boolean state like `commands.backup`)
creates it and replaces it at every further call — an old link is dead at once. That is intended: the link opens the
absences of **all** employees, so only whoever asks for it gets it. `calendar.feedUrl` stays empty until that has happened.

The ICS construction (`absenceEvents`, `calendarDocument`) moves into a service (`src/lib/services/calendar.ts`) that the
route **and** the adapter use — two versions of the same format would be the next error. The company calendar puts the name
of the employee first (`Anna Muster: Vacation (F)`), so that a day stays readable in the company calendar; the `UID` stays
`absence-<id>@time-tracker`, so that a calendar app **updates** an event instead of doubling it.

**Proof:** `src/lib/services/calendar.test.ts` (DTEND exclusive, escaping, JSON view), `src/lib/web/routes/absences.test.ts` (company
feed through the instance token, personal link stays personal, old token dead), `src/lib/adapter/states.test.ts` (states and
command) and the acceptance **T21** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D9 — The sources of the web app are called `src-www/` (24.09.2026)

The repository checker reads the sources of the repository and checks imported packages against the root `package.json`
(`W5042`). It skips only the folders of a **fixed** list (`excludedSourceDirs` in `lib/M5000_Code.js`): `/admin`,
`/build`, `/docs`, `/test`, `/tools`, `/www`, `/widgets`, `/src-admin`, `/src-www`, `/src-vis`, `/src-widgets` and more.
`src-pwa/` was **not** on it, which is why the PR for the LATEST repository reported five `W5042` (react, MUI, i18next,
`@tanstack/react-query`, `react-i18next`) and demanded a decision before the review: only `dependencies` count — `@types/*`
and `@iobroker/types` are the only exception that may lie in `devDependencies`.

**Decision:** The sources of the web app lie in **`src-www/`** (before `src-pwa/`). The folder is on the list of the
checker, fits by name to the delivery from `www/`, and the app dependencies stay in `src-www/package.json`: they do not
belong in the installation of an adapter, because nothing is loaded from the sources at run time — `npm run build:pwa` puts
the finished bundle into `www/`. The other way (taking react, MUI and i18next into the root `package.json`) would have
supplied every ioBroker installation with a second front-end stack and would have been wrong in substance. In terms of
function the conversion changes nothing: the adapter still delivers `www/`, all scripts and workflows only point to the new
path.

**Proof:** `npm run check`, `npm run lint`, `npm run build`, `npm run build:pwa`, `npm run test:ts`, `npm run test:package`,
`npm run check:adapter`, `npm run check:i18n` and `npm run version:check` are green; the acceptance is **T22** in
[`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D10 — An automatic rule may have a validity window (24.09.2026)

A rule used to run until somebody switched it off. For a permanent rule that is right — for a holiday cover, a seasonal
worker or a project period it is not: there the rule is to begin and end by itself, without anybody having to remember.

**Decision:** Every rule carries two optional date fields `active_from` and `active_until` (migration 27). Both are **plain
dates** (`YYYY-MM-DD`), deliberately without a time of day: the rule time itself is already in the rule as a minute of the
local day, and a window with a time of day would have raised the question of the time zone (the rule applies *per employee*
locally). What is compared is therefore the **local calendar date of the employee** (`local.date` in
`runAutomationRules`) — exactly the day that the weekdays and the marker in `automation_runs` work with. Nothing has to be
converted: “valid until 15.10.” means for every employee the 15th of October at their place, and a change of day at midnight
does not fall apart.

Both ends are **inclusive**; an empty field is the open side — “valid from empty” = from now on, “valid until empty” =
unlimited. A selection value “from now on” could not have been stored: it would have had to be converted into a fixed date
when saving and would then have looked like a deliberately set limit. The interface still writes the meaning down: the fields
carry “Empty = from now on” and “Empty = unlimited”, and the rule list shows “valid from …”, “valid until …” or
“valid … – …” for a limited rule.

The window is checked in `evaluateAutomation` (pure function, right after the weekday check) — so the decision and its
reason are in the debug log and can be tested without the adapter. An expired window is **not** an error; saving stays
allowed, otherwise old rules could no longer be changed. The window does **not** reset the marker in `automation_runs`: a
rule still fires at most once per period (day or ISO week), and if the rule time of the first day lies before “valid from”,
that day is skipped and not made up for.

**Proof:** `src/lib/adapter/automation.test.ts` (day before, exactly “from”, exactly “until”, day after, both ends empty),
`src/lib/db/repositories/automations.test.ts` (save and read, “omit keeps”, “empty clears”, 30.02. is refused, “until before
from” is refused), `src/lib/web/routes/settings.test.ts` (the dates travel with the rule, 400 for an invalid date) and the acceptance
**T23** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md). The list below the table has since been **dropped** (it was limited to five
entries last): `GET /automation-rules/runs` delivers one row **per rule** (the newest, through `latestRuns`) and the rule row
writes it in a line of its own — see **D12** in this document and **T25** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D12 — The rule overview shows the last run per rule (26.09.2026)

**Occasion:** The list “Last runs” below the rule table was a log without a relation to the rules: it showed the five newest
rows of all rules, and a rule that had not run for a week no longer appeared in it.

**Decision:** The list is removed. `GET /automation-rules/runs` delivers **one row per rule** instead of the newest rows (the
newest run; `latestRuns()` in the repository uses the SQLite rule that with exactly one aggregate (`MAX`) the other columns
come from the matching row) and the rule row names it in a line of its own (`Last run: … · employee`, otherwise
`never run`). In addition, next to “Save rules” stands the hint that the table is saved **as a whole** — until then a change is
only on its way in the form.

**By the way:** A rule that runs on **all seven** days wrote the same thing twice into its line (“once a day” from the weekdays
and from the repetition). The weekday statement now stays empty when it is no restriction — just like the validity, which
also appears only when it is set.

**Proof:** `src/lib/db/repositories/automations.test.ts` (“reports one run per rule — the newest”),
`src/lib/web/routes/settings.test.ts` (the answer carries one row per rule) and **T25** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D13 — A cancellation is requested, not booked silently (26.09.2026)

**Occasion:** An approved absence could neither be changed nor taken away by the employee; only the administration could
delete it, and the app had no way for that. Cases such as “the vacation is moved to another week after all” stayed manual
work.

**Decision:** Deleting an approved absence stays a decision of the administration. The employee **requests** the
cancellation (`POST /absences/:id/cancellation`, reason optional in `cancel_note`); the absence **keeps counting** meanwhile,
because `isApproved` depends on `approval` alone. The administration answers with the existing `DELETE /absences/:id` — that
is the “yes”, and the deletion carries `cancelRequested: true` in the audit detail — or with
`POST /absences/:id/cancellation/decline` (the “no”, reason in the audit). The employee withdraws an **open** request
themselves (`DELETE /absences/:id/cancellation`); they may delete their row anyway. If an employee changes an approved
absence, the former way continues: it goes back to `requested`, and a waiting cancellation lapses with the old decision
(`setApproval` clears it).

Two reasons for this model: `approval` carries a `CHECK` from migration 21, another state (`cancelled`) would have forced a
rebuild of the table under SQLite rules — the columns `cancel_requested_at` and `cancel_note` (migration 28) are enough and
leave `isApproved` unchanged. And a cancellation that disappears without an answer could no longer be told apart from a data
error in the audit.

**Proof:** `src/lib/db/repositories/absences.test.ts` (the request keeps counting, withdrawing and declining write the audit
actions `absence.cancel_request`/`_withdraw`/`_decline`, only approved absences can be cancelled, the decision clears a
waiting cancellation), `src/lib/web/routes/absences.test.ts` (request, permissions, withdrawing, declining, 400 for an absence that is
not approved yet) and the acceptance **T26** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D11 — The file server is no way to the calendar (25.09.2026)

When re-checking T21 it turned out that the download through a `web` instance promised in D8 and in the README does **not**
work: `http://<host>:8081/files/time-tracker.0/calendar.ics` does not deliver the file, and the obvious way without an
instance number (`…/files/time-tracker/calendar.ics`) delivers an **empty ZIP archive** (22 bytes, `PK\x05\x06`). The
request therefore lands in the public web area and not in the instance folder; that is no calendar.

**Decision:** The file way is **no longer** offered as a download. `calendar.feedFile` stays what it is — the **absolute
path** of the written file, which the `ical` adapter reads as a local file (checked in the test, fine). For browsers,
calendar apps and scripts `calendar.feedUrl` is the way: the link of the adapter with the instance token, which delivers
the same, complete file. The README, the test plan and the row of the state table say so now (the latter names `feedFile`
explicitly a *path*).

Two points stay open and were deliberately not done with it:

- **Writing:** The file is rewritten with `writeFileSync` at every change and every five minutes — first empty, then write.
  A reader that reads at exactly that moment can catch half a file. An atomic write would be robust (first
  `calendar.ics.tmp`, then `rename`); no acute problem, because the `ical` adapter reads at intervals of minutes.
- **Visibility:** Everything below `<iobroker-data>/files/…` is reachable through a `web` instance **without a sign-in**.
  The company calendar thus lies in a public folder, although the API way demands a token. Whoever does not want that can
  move the file back into the instance folder (`<iobroker-data>/time-tracker.<n>/`) — the `ical` adapter reads it from
  there just the same.

**Proof:** **T24** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (the link delivers the complete ICS file, the `ical` adapter reads
`calendar.feedFile`, README and documentation no longer name a file server link) and the changed section *Calendar for
ioBroker* in the README.

**Addendum (26.09.2026, 0.7.10):** One point stayed standing back then — the **name of the state**. `calendar.feedFile` was
called “Calendar file (.ics)” and thereby still suggested a file to download, although the value is the **path** for the
`ical` adapter (with `(.ics)` the file type stays in the label). It is called “Path of the calendar file (.ics)” in all
eleven languages now; `ensureObject` in `states.ts` merges `common` at every start, which is why the correction also reaches
existing instances and not only new ones. `calendar.feedUrl` stays “Company subscription link” and `calendar.absences` /
`calendar.updatedAt` are unchanged. **Proof:** the check of the name in `src/lib/adapter/states.test.ts` (German and
English) and the row of the state table in the README.

**Addendum (27.09.2026, 0.7.11):** The reason for the empty ZIP was the **way the file was written**. It was created with
`fs.mkdirSync`/`fs.writeFileSync` — that is, **next to** the file API of the adapter. Only what is created through the file
API is known to the file manager (the call creates the folder as well); a folder that `fs` creates stays a foreign folder
for it. The file therefore moves to the file API: `publishCalendar` writes with
`writeFileAsync(<namespace>, "calendar.ics", …)`, the new building block `src/lib/adapter/calendarFile.ts` records the
way, and `onReady` makes sure through a hint file (`INFO.txt`) that the folder exists already **before** the first
calendar — a fresh instance would otherwise have had an empty folder until the first absence. The absolute path for
`calendar.feedFile` stays the same; the `ical` adapter still reads the local file.

Whether the file server link (`…/files/time-tracker.0/calendar.ics`) really delivers the file with that is **not yet**
confirmed: **T28** checks that on the real installation. Until then the link stays out of the README and the documentation,
and `calendar.feedUrl` is the way for browsers, calendar apps and scripts. The second open point — the **atomic write** —
stays open: `writeFileAsync` also writes first empty and then full.

**Proof:** `src/lib/adapter/calendarFile.test.ts` (the hint file is created exactly once, the calendar lands unchanged as
`calendar.ics`) and the two places in `src/main.ts` (`onReady`, `publishCalendar`).

**Addendum (27.09.2026, 0.7.12):** The way of 0.7.11 was **aimed wrongly**, and the acceptance revealed it. The log of the
real installation said:

```
error Cannot write file INFO.txt: time-tracker.0 is not an object of type "meta"
warn  the folder 'files/time-tracker.0' could not be prepared: time-tracker.0 is not an object of type "meta"
error Cannot write file calendar.ics: time-tracker.0 is not an object of type "meta"
```

`writeFileAsync(<namespace>, …)` is refused by the object database. The ioBroker documentation *Save files* in the developer
handbook says why: files **always** hang on an object of type `meta` — the **mount point** — and writing happens **below**
it (`writeFileAsync(mountPoint, "file", …)`). The instance namespace is no mount point; it belongs to the instance object
`system.adapter.time-tracker.0`. The check `validateMetaObject` in `objectsInRedisClient` throws not only for an object of a
wrong type but also when there is no object at all — a folder created by hand in the file manager would have occupied the
name just the same.

**Decision:** The file now hangs on `<namespace>.storage` (`type: "meta"`, `common.type: "meta.folder"`), the path is
`files/time-tracker.<n>/storage/calendar.ics`. The name is `storage` and not `calendar`, because `calendar` in the object
tree is already the channel of the calendar states (`calendar.feedUrl` and its siblings), and an object cannot be channel
and mount point at once. `meta.folder` instead of `meta.user`: the adapter rewrites the file at every start and every
change, so it does **not** belong in the backup of the data. The mount point is created at the start (idempotent through
`setObjectNotExists`, like the rest of the object tree) — deliberately **not** through `instanceObjects` in
`io-package.json`, because its single-language name would have opened a second place for the same eleven texts. The hint
file `INFO.txt` is dropped: no longer the file keeps the folder open but the object itself. And the calendar is now
published in a `try` block of its own (`the calendar could not be written: …`) — in 0.7.11 it ran along in the state block,
which is why a file error stood in the log as `states could not be published` and hid the real cause.

**Proof:** `src/lib/adapter/calendarFile.test.ts` (the file hangs on a mount point and **never** on the namespace itself, the
object is created exactly once as `meta.folder` with eleven languages, the absolute path ends in
`files/time-tracker.0/storage/calendar.ics`), `src/lib/adapter/states.test.ts` (every object name in eleven languages) and
the two places in `src/main.ts` (`onReady`, `publishCalendar`).

**Proof in the installation (27.09.2026, T28):** With 0.7.12 the log is free of errors, the file manager shows the folder
`time-tracker.0` → `storage` with the `calendar.ics` in it, and the download delivers a file that is correct in content —
the case has passed. The **file server** delivers the file now as well: the direct link
`http://<host>:8081/files/time-tracker.0/storage/calendar.ics` (that is, **below** the mount point) was checked, the
downloaded file was free of errors. The old path without `storage` (`…/files/time-tracker/calendar.ics`) stays out — an
empty ZIP still arrives there. That also explains why the link disappeared from the documentation and from T21 in
0.7.7/0.7.8: it was not the file server that was the wrong way, the path was.

## D14 — The holiday tab enters with the date field of the browser (26.09.2026)

**Occasion:** When re-checking the holiday tab in 0.7.8, “Add holiday” stayed **greyed out**. The date field was a text
field, and the button became active only when the value looked exactly like `YYYY-MM-DD` — a typed `24.12.2026`, a missing
`0` or an empty name were not enough, and the format stood only as a bracket in the label. A second error came up while
writing the browser test: a day entered **without a region** landed in the region `DE`. The list (`GET /holidays` without
`region`) showed only `DE` up to then, but the evaluation calculates with the **holiday country of the instance**
(`holidayRegion()` in the aggregation service) — a Swiss or Austrian instance would therefore have neither seen nor counted
its own, manually entered holiday.

**Decision:**

1. The date comes from the field of the browser (`type="date"`), like everywhere else in the app. The label is only “Date”
   now (11 languages); the format hint is gone, because with a date field the browser gives the format.
2. A holiday **without a region** belongs to the country of the instance: `POST /holidays` fills in `holiday_country` from
   the settings instead of leaving the region open.
3. `listByYear(year)` **without** a region delivers all regions of the year — the tab shows the region in every row, so it
   must not restrict to a single one (after a change of the holiday country the old days stay visible and deletable that
   way). With a region it filters as before; the evaluation calls with its region anyway, `isHoliday` and `dateSet` are
   unchanged.
4. After creating, the tab follows to the “year” of the entered day. The list shows **one** year, a day for the next one
   would have been stored and out of sight at once.

**By the way:** The window “Change absence” could not be closed with “Cancel”. It stays open as long as a new absence is
entered **or** an existing one is changed, and the button cleared only the first state. It now clears both (`closeForm`).

**Proof:** `test/e2e/holidays.spec.ts` (new file: the button is active only with a date **and** a name, the field is a date
field, the row carries its region, it can be removed, a day of the next year follows the year), the extended check in
`src/lib/web/routes/settings.test.ts` (a day without a region carries the country of the instance),
`src/lib/db/repositories/holidays.test.ts` (“lists every region of a year when no region is asked for”), the change bridge
in `test/e2e/absences-admin.spec.ts` and **T27** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D15 — The start password also counts after the first start (01.10.2026)

**Occasion:** The instance setting “Start password of the first administrator” had an effect only when the account was
**created**. Whoever filled the field only after the first start — that is, after the run in which the account had been
created with the generated password — experienced exactly what the error report described: **no password in the log** (the
account existed already, so none was generated) and **no login** with their own value (the adapter had never seen it). The
old version of `ensureAdministrator` left at once when an administrator existed — without a log line, so without any hint
that the setting had no effect.

**Decision:** As long as the first administrator has **not changed the start password yet** (they carry `must_change_pw = 1`,
the app demands the change at the first login), the adapter takes over the configured password at **every** start. The
target is the account with the configured login, otherwise the **oldest** administrator. After the change the setting has no
effect — a forgotten field must **never** reset a password that the administrator set in the app. Every start reports
exactly one of six results: `created` (with a generated or configured password), `start_password_reset`,
`start_password_unchanged`, `password_changed`, `existing`, `failed`. The case “changed already” is a **warning**, because
the setting is visibly without effect then — exactly this silence was the error.

**Consequences**

- The decision lies testable in `src/lib/services/firstAdministrator.ts`; `src/main.ts` only reports the result (`switch`
  over the six cases). `src/lib/services/firstAdministrator.test.ts` covers it: creating with a configured and with a
  generated password (including the policy), taking over with an unchanged start password, an unchanged password without an
  audit entry, a changed password (hash stays), an existing administrator without a configured password and a login that is
  taken (`failed`).
- A **taken** login stays an error; the emergency exit from D7 (restart with a free `adminLogin`) applies unchanged,
  because it only works if there is no **active** administrator.
- Taking over writes an audit entry (`user.update`, `passwordChanged`, reason “start password from the instance
  settings”) — so it is traceable.
- `README.md` (“First start”), [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) (step 3.4) and [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (test
  data and the log example of the dev server) name the four log lines.

## D16 — The instance line leads into the app (`common.localLinks`) (01.10.2026)

**Occasion:** Whoever looks for the app in the admin finds only the **instance** there: the symbol of a row in the list
**Instances** opens the settings, not the interface. Host and port are in the instance settings (default 8092) and had to be
typed so far — on the phone the most frequent hurdle at the start. Adapters with an interface of their own, on the other
hand, have long announced `common.localLinks` to the admin; the admin renders a symbol from it in the instance row (and on
the overview) that leads straight there.

**Decision:** The adapter announces `common.localLinks._default` with `%protocol%://%ip%:%port%/` — **no** fixed address but
the placeholders of the admin: it assembles `%protocol%`/`%ip%` from the bind address and `%port%` from the instance port.
That keeps the link right after a change of port. The entry carries a name in **eleven** languages and `order: 5` (the name
appears literally in the interface, so no fixed language). Deliberately **without** its own `icon`/`color`: the admin then
shows its default symbol for an adapter interface — an image file that would have to be delivered in the npm package would be
an additional source of errors without added value. `intro` stays unset (default `true`), so the link also stands on the
overview page.

**Consequences**

- The link follows the **bind address**: with `127.0.0.1` (default) it leads to the ioBroker machine itself, with `0.0.0.0`
  to the address that the browser used to reach the admin. Whoever punches in the LAN has set `0.0.0.0` — then the same link
  works from phone and PC. With a reverse proxy in front, a proxy rule for `time-tracker.0` replaces the link with its path
  (the admin does that itself).
- `/` is the sign-in as long as there is no session: the link opens exactly the sign-in page, not the settings.
- `README.md` (installation step 2), [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) (steps 3 and 4) and
  [`technical.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/technical.md) (HTTP surface) name the link.
- `tools/check-i18n.ps1` checks the language keys of `common.titleLang`, `common.desc`, `common.news` — **and now also**
  `common.localLinks.<key>.name`: the name is shown literally, a missing key would otherwise be noticed only in operation. All
  other checks stay untouched (the adapter checker has known `localLinks` for a long time).

**Proof:** the entry `_default` in `io-package.json`, the message of `npm run check:i18n` and the instance row in the admin
that carries the symbol “Open the time tracking app”.

## D17 — HTTPS in the adapter itself, with the certificates of ioBroker (01.10.2026)

**Occasion:** The app on the phone needs HTTPS (service worker, installation). So far there was only the way through a
reverse proxy (`trustProxy`). The `web` adapter of ioBroker can **not** help here: it does not forward a foreign port but
only delivers adapters that hook into it as a web extension — the time tracking has a server of its own
(`http.createServer`). Operation: a local installation without access from the internet.

**Decision:** The server can speak HTTPS itself (`https.createServer`). New instance settings: `secure` (switch) and the
**names** `certPublic`, `certPrivate`, `certChained` from the certificate collection of ioBroker (`getCertificatesAsync`, in
the form as type `certificate`). There is no certificate management of its own and no file paths. The key is called `secure`
on purpose: the admin derives the placeholder `%protocol%` of the link in the instance list (`common.localLinks`) from it, so
the link becomes `https://…` without further ado. A pure change of transport: routes, permissions, CSRF and limits are
untouched.

**Consequences**

- The session cookie carries `Secure` without a proxy header being needed (`secureTransport` in the router). `trustProxy`
  stays unchanged for operation behind a proxy.
- The calendar link (`calendar.feedUrl`) and the badge link follow the scheme (`https`).
- **No silent fallback to HTTP:** If the certificate is missing or cannot be read, the web server does not start, and the log
  names the reason — like with a port that is taken. A fallback would let a sign-in through unencrypted, which is exactly what
  the operator wanted to exclude with the switch.
- A self-signed certificate (`defaultPublic`/`defaultPrivate`) is enough for the browser with a one-time warning; for the
  **installation of the app on the phone** the phone has to trust the certificate (install the certificate there or take a
  certificate of a real authority). On the computer with `localhost`, HTTP is a secure origin even without HTTPS.
- A change of certificate takes effect after a restart of the instance.

**Proof:** `src/lib/web/server.tls.test.ts` (a real HTTPS connection with a test certificate, `Secure` cookie, refusal of a
client without trust, broken certificate), router and calendar test; acceptance on a real instance: test case T29 in
[`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D18 — A rule may fire on every write, and a value map names the employee (07.10.2026)

**Occasion:** The review of the adapter against the adapter `ioBroker.fingerprint` (points A1/A2 of the internal code
review): A rule fired only when the **value** of the state changed. The fingerprint adapter writes the same name at every
match (`lastMatch.name`) and leaves `lastMatch.matched` at `true` — whoever scanned alone in the morning and in the evening
was **not** punched out in the evening. And `lastMatch.id` is the **slot number** of the finger (1–200), not an employee id;
the mode “Value is the employee” read numbers first as an employee id, though.

**Decision:** (1) A new rule property `fireOnRepeat` (“fire on every write”): default **on** for mode `user`, **off** for a
fixed value; migration 29 switches it on for existing rules of mode `user`. The cooldown and the protection against double
punches (30 seconds) stay unchanged and catch a chatty device. (2) A new rule property `valueMap` (value → employee, JSON in
`value_map`). If a rule has a map, only a value from it fires anything; everything else does not — not even when the number
happens to be an employee id. Without a map the old behaviour stays (id, login or shown name).

**Deliberately not done:** The resolution “number = employee id” stays without a map, so that scripts that write an id keep
running; the form and the README name the trap.

**Related (B1/B2 of the same review):** The transport reads the body with the limit of the **route** and only after the
check of the session, if the route carries a higher limit (restoring a backup); a body that announces more than the limit is
refused without being read. Input that anybody can send without signing in has length limits; login name and user agent are
stored shortened; the audit rows of failed and locked logins are deleted after 90 days (all others stay).

**Proof:** `src/lib/adapter/triggers.test.ts`, `src/lib/db/repositories/triggers.test.ts`,
`src/lib/web/server.test.ts`, `src/lib/services/auth.test.ts`, browser test `test/e2e/triggers.spec.ts`.

### Addendum D18 (07.10.2026): A3, B3, B4, B5, C1 of the same review

- **B3 — Origin of the live stream:** A browser handshake with a cookie is refused (403 `origin_not_allowed`) if the `Origin`
  is not the `Host` of the request (behind a trusted proxy `x-forwarded-host` counts as well). A token in the URL and clients
  without an `Origin` (integrations) are not affected. Reason: `SameSite=Lax` separates pages of different *sites*, not
  services of the same host on another port.
- **B4 — Security headers of the web app:** `Content-Security-Policy` (own scripts, no inline script,
  `frame-ancestors 'none'`, inline styles allowed because the component library writes them at run time),
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; with its own TLS additionally
  `Strict-Transport-Security` (180 days, without `includeSubDomains`). Behind a proxy the proxy sends the HSTS header.
- **B5 — Login lock:** counted is per **name and address** (limit as before) and per name over **all** addresses (five
  times as many). Whoever types the name of the administrator locks only their own address; whoever guesses from many
  addresses locks the account. An unknown name is calculated against a decoy hash of the same cost, so that the time of the
  answer does not give it away. **Not changed:** `scryptSync` blocks the process for about 50 ms per attempt; the limit per
  address (20 attempts per minute) keeps that small.
- **A3 — Feedback to the device:** The adapter does not talk to the reader; every punch of a rule stands at once in
  `events.*` (`lastUser`, `lastDirection`, `lastSource`). The README describes that with an example script and names what
  stands in the log for a scan without a punch.
- **C1 — README example:** `fingerprint.0.lastMatch` does not exist; the README names `lastMatch.name`, `lastMatch.id` (with
  a value map) and the reason why `lastMatch.matched` does not fit.

## D19 — The documentation is English, the German originals live in `docs/de/` (09.10.2026)

**Occasion:** The review of the repository (PR #6702 of `ioBroker.repositories`) asks for the documentation in English,
with further languages welcome: the developer documents under `docs/` had been German only.

**Decision:** Every document of `docs/` exists in English in `docs/en/`; the German originals moved to `docs/de/` (they
stay as they are, with the protocol of the acceptance as it was kept). `CONTRIBUTING.md` in the root is English, its German
original is `docs/de/CONTRIBUTING.md`. The README stays English and names both folders in its table of documentation.
Tools and tests that name a document point to the English file.

## D20 — Everything a user sees is English or follows a language setting (11.10.2026)

**Occasion:** The second review of PR #6702 (checklist V3.5) found four things: German texts that were still in the code,
and four admin texts identical to English.

**Decision:**

1. **The seeded absence types are English** (`Vacation`, `Sickness`, `Accident`, `Military service`, `Internal`,
   `Further training`, `External`). They are stored in the database and can be renamed in the administration; an existing
   installation keeps the names it has (the seed never overwrites).
2. **The calendar name** (`X-WR-CALNAME`) follows a language: the personal calendar the language of the employee (`locale` of
   the account), the company calendar and the written file the language of the instance (`default_language`). The names exist
   in all eleven languages (`src/lib/services/calendar.ts`), English is the fallback. The absence type names inside the
   events come from the database, so they are as the administration named them.
3. **The default language of a fresh instance is English** (`native.defaultLanguage`, setting `default_language`). An
   existing instance keeps what it has configured.
4. **`index.html` and the manifest are English** (`lang="en"`, title, description, app name); as soon as the app knows its
   language, the tab title and the `lang` attribute follow it (`src-www/src/i18n/index.ts`).
5. **A new account speaks the language of the instance.** The account that the administration creates gets the setting
   `default_language` as its `locale` (before, the database default `de-DE` applied, so a new administrator saw German
   everywhere: UI, reports, calendar names); the first administrator gets `native.defaultLanguage`, and without any
   language an account is English. Existing accounts keep their language.
6. **No translated text equals the English wording**, also not where the word is valid in the language (`Terminal`,
   `Menu`, `PDF`, `Date`, …): the review checklist V3.5 reports every such value as untranslated. The web app, the report
   labels, the object names and the admin texts were rewritten accordingly, and `src/lib/translations.test.ts` fails when a
   language has a text that equals the English one (the allow list of `tools/check-i18n.ps1` is empty).
7. `Port` (de, fr, pl) and `General` (es) in `admin/i18n/` are translated, although they are valid words in those
   languages: the checker compares values with the English text.

**Proof:** `src/lib/services/calendar.test.ts` (names in all eleven languages, fallback, `zh`), the calendar feed tests in
`src/lib/web/routes/absences.test.ts` (feeds), `src/lib/web/routes/users.test.ts` (language of a new account), `src/lib/db/repositories/absences.test.ts` (seeded names),
`src/lib/services/firstAdministrator.test.ts` (language of the first administrator), `test/e2e/absence-types.spec.ts`.
Looked at without a finding: log lines, state names and roles (11 languages), report labels (11 languages, in the language
of the employee), public holiday names (English with a key), all texts of the web app (only through `i18next`).

## D21 — Every backup is copied to an external server over SFTP (13.10.2026)

**Occasion:** A backup next to the database is lost with the host. The tab _Migration and backup_ of the instance settings
had no way to get a copy off the machine. The sister adapter `e-invoices` solved this the day before; the same design is
used here.

**Decision:**

1. **SFTP with `ssh2`** (pure JavaScript, no system tool, no mount, no `sudo`). The file is uploaded as `<name>.part`, its
   size is compared and only then renamed, so a half file never looks like a backup (`src/lib/services/remoteBackup.ts`,
   the real connection in `sftpSsh2.ts`).
2. **One hook for every way to a backup.** `BackupDeps.onCreated` runs after each backup (app, `commands.backup`, `sendTo`,
   daily schedule); a failing hook never turns a good local backup into an error. The adapter copies from there.
3. **The host key can be pinned** (`SHA256:…`): a different fingerprint is refused before the password is sent. Empty means
   not verified; the log and the test button show the fingerprint to enter.
4. **Deleting on the server is narrow.** Only files named `time-tracker-<time>.sqlite` (the oldest beyond _Copies to keep_,
   `0` = all) and `….sqlite.part` leftovers are deleted. Other names (also `time-tracker-prerestore-…`) are never touched.
5. **A failed copy is visible and harmless**: it is logged, written to the audit log (`backup.remote_copy`,
   `backup.remote_copy_failed`) and shown in `info.remoteBackupError`; `info.lastRemoteBackup` holds the last good file. The
   copies run one after the other and have a time limit.
6. **The password is `encryptedNative` and `protectedNative`.** The connection test uses the values of the unsaved form and
   falls back to the saved password only for the same server, user and port, so the button cannot be used to send the saved
   password to another server.

**Proof:** `src/lib/services/remoteBackup.test.ts` (copy, size check, retention, leftovers, time limit, settings of the
test), `src/lib/services/sftpSsh2.test.ts` (against a real SFTP server in the process, fingerprint), the hook test in
`src/lib/services/backup.test.ts`.

## D22 — Request bodies are checked with zod (18.10.2026)

**Occasion:** Every route read its body with small hand-written readers (`requireString`, `optionalNumber`, …) and
checked the rest by hand. That worked, but a route did not show at one glance what it accepts, and it stopped at the
first invalid field.

**Decision:**

1. **zod 4** checks the body of every route at the boundary. A route declares its body as an object of field rules
   (`bodySchema({ login: requiredText(128), … })` in `src/lib/web/routes/validate.ts`) and reads the typed values with
   `parseBody`.
2. **The messages stay as they were.** Every rule words its message like the reader it replaced (`login is required`,
   `direction must be in, out or auto (got x)`, …), so the web app and clients see no change. A test pins the wording.
3. **Every invalid field is reported** in `errors[]` (RFC 9457); the message of the problem is the one of the first field.
4. **What a missing field means stays explicit:** an optional field becomes `null`, a field of a change that is not sent
   stays `undefined` (`keepMissing`, the record keeps its value), a number in a text is still taken where it was before
   (`employeeRef`, `year`). zod refuses a missing key for some kinds of schema; every rule is tested with a missing field.
5. **Checks that need the database stay in the route** (does the employee exist, may the caller do it). Two places keep
   their own reading on purpose: `PUT /settings` is a free key/value store with a rule per key, and the terminal session
   is taken from the body or the query.
6. zod is pinned to a version that is older than the Dependabot cooldown (7 days) when it is added.

**Proof:** `src/lib/web/routes/validate.test.ts` (messages, all invalid fields, missing fields, nested paths) and the
API tests in `src/lib/web/routes/*.test.ts`, which run unchanged.