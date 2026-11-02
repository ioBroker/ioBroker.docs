---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Technical notes (internals)

This document collects the technical details that used to be in the [README](/#/adapters/time-tracker): the HTTP surface,
sessions and security, live events, the offline queue of the app and the database. The README is enough to use the
adapter; this is how it looks inside.

## HTTP surface

- `/api` is the only API prefix — the web app owns every other path (client side routing).
- Errors arrive as `application/problem+json` (RFC 9457) with a stable `code`; the app translates the codes.
- Downloads are real files (`content-disposition: attachment`), not JSON: `/api/reports/pdf` and `/api/reports/xls`.
- `/api/stream` is the WebSocket for live events. It accepts the session cookie, so the browser needs no token in the
  URL; an employee sees only their own events.
- If `www/` is missing, the adapter keeps running and serves only the API — a log line says which case applies.
- The adapter announces its way into its own interface as `common.localLinks` (`%protocol%://%ip%:%port%/`): the admin
  shows a symbol for it in the instance line and on the overview. **The admin** fills in the placeholders — `%ip%` from
  `bind` (with `0.0.0.0` the address the browser used to reach the admin), `%port%` from the instance port; a reverse
  proxy rule for `time-tracker.0` replaces the link with its own path.

## Sessions, CSRF and rate limits

The sessions of the web app travel in an `httpOnly` cookie (`SameSite=Lax`, `Secure` behind HTTPS), so that a script
smuggled into the page cannot read them. The app itself keeps only the CSRF token and the user in `localStorage`; the
session token never leaves the cookie. State-changing requests additionally need the header `x-csrf-token`, which
`GET /api/auth/me` hands out for the own session (so a browser finds it again after a reload). Integration clients keep
using the header `x-session-token` from the login answer — that way needs no CSRF token, because a foreign page cannot
set a header of its own.

The rate limits and the audit trail work with the client address. With a proxy in front, it is read from
`x-forwarded-for` only when **Trust the reverse proxy** is on, and the **rightmost** entry counts
(`x-forwarded-for: client, proxy`), because the left part comes from the client.

## Offline queue

Without a connection, the web app puts punches into a local queue (`pending`) and sends them at the next contact; what
cannot be assigned unambiguously ends up as a conflict in the view _Sync_ and is decided by the administration. As long
as a punch is `pending` or `conflict`, it counts in no calculation: the pairing (`src/lib/domain/punch.ts`) leaves it
out.

## Database

SQLite through `better-sqlite3`, in WAL mode, in the data directory of the adapter. Schema changes exist only as
versioned migrations in `src/lib/db/migrations.ts` (`schema_migrations`); migrations are append-only, every change is a
new number. What is published are aggregates and control commands — the company figures (`company.*`), the monthly and
yearly values per employee, the newest event (`events.*`) and the actions: rules in `trigger_rules`, whose states the
adapter subscribes to (on a change of the value or, per rule, on every write; with a cooldown), the automatic rules in
`automation_rules`/`automation_runs` (clock in, clock out, notification, break reminder — within the chosen weekdays, at
most once per employee and day or ISO week) and `sendTo` messages (`punch`, `present`, `status`, `report`, `backup`).
The punches themselves stay in the database.

## Breaks

The break of a day comes from `src/lib/domain/breaks.ts`: punched breaks are the gaps between the punch pairs, the break
scale deducts fixed minutes per block (first to last punch), and the mode `pause_mode` decides which one applies
(`auto` = punched, otherwise the scale). Of the paid part (`work_profiles.pause_paid_minutes`), at most the break itself
is credited. Both values end up per day in `day_aggregates` and thus in the monthly statement.