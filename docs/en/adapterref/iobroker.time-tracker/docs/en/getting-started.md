---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Getting started and first-start test

This guide walks once through the installation up to the first punch. It is short on purpose and says at every step how
to tell that the step worked. The complete acceptance test is in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## 1. Requirements

- an ioBroker instance with js-controller (the CI checks against the real controller), Node ≥ 22
- a free TCP port (default `8092`)
- for the **installable PWA** and the service worker: HTTPS — either the adapter itself (setting **Use HTTPS**, step 3)
  or a reverse proxy (nginx/caddy), see the README, section “HTTPS and reverse proxy”. For a plain functional test,
  `http://<host>:8092` is enough
- optional: a tablet or phone for the kiosk terminal, an NFC tag for T14/T15

## 2. Install

The adapter is on **npm** — the normal way is the installation from the ioBroker admin or from npm. **The instance
`time-tracker.0` is created automatically.**

- **Admin:** tab _Adapters_ → search for _time-tracker_; as long as the adapter is not in the list, use the symbol
  **“Install from custom URL”**, tab **npm**, and enter the package name `iobroker.time-tracker`.
- **Command line:** `iobroker install iobroker.time-tracker` (creates the instance as well — to create it separately:
  `iobroker add time-tracker`).

**Check:** the log says `web interface found at …/www`, `API listening on http://127.0.0.1:8092/api` and
`API routes: …`; the state `time-tracker.0.info.connection` is `true`.

> **For developers only:** the repository does **not** contain `build/` and `www/` (the web app is pre-built), so a clone
> cannot be started by ioBroker as it is (`cannot find start file!`). Build once and use the **dev server** of the project:
>
> ```bash
> npm ci
> npm run install:pwa    # dependencies of the web app
> npm run build:pwa      # web app → www/
> npm run build          # adapter → build/
> npm run dev-server     # local ioBroker with the adapter
> ```

## 3. Configure the instance

In the instance settings (tabs _General_, _Security_, _Migration and backup_):

1. Set **Session secret** and **Badge link secret (HMAC)** (both are stored encrypted; without the HMAC secret signed
   badge links are switched off). If the **Session secret** stays empty, the adapter generates one at the first start
   and stores it as the file `session-secret` next to the database — so sessions and CSRF tokens survive a restart. An
   entry in the field always wins and allows a deliberate rotation.
2. Check port and bind address (`127.0.0.1` = local only, `0.0.0.0` = LAN — deliberate opt-in). The link in the instance
   line (step 4) follows exactly these two values.
3. Check time zone (`Europe/Berlin`), default language and holiday country.
4. Set the **start password of the first administrator** — or leave it empty: then a random password is written to the
   log **once** (`info.lastError` stays empty if nothing went wrong). The value also counts when you enter it **after**
   the first start: as long as the first administrator has not changed the start password yet — the app demands the
   change at the first login — the adapter sets the configured password at **every** start and says so in the log
   (`… exists already and still has its start password - it was set from the instance settings now`). If the password was
   changed already, the setting has **no effect** and the adapter **warns**: `the configured start password is not
   used` — then clear the field (the administrator changes the password in the own profile of the app) or restore a
   backup that still carries the start password. Every start reports exactly one of these cases — a silent instance does
   not exist any more.
5. Optional: **Enable kiosk terminal** and the retention of the backups.
6. HTTPS without a proxy: switch **Use HTTPS** on and choose certificate and key from the certificate collection of
   ioBroker (**Admin → Settings → Certificates**). If the certificate is missing, the app stays off — there is **no**
   silent fallback to HTTP; the cause is in the log.
7. Behind a proxy: switch **Trust the reverse proxy** on (otherwise `X-Forwarded-*` is ignored).

## 4. First login

Open the web app (`http://<host>:8092/`) — more convenient: click the symbol in the line `time-tracker.0` of the admin
list **Instances** (“Open the time tracking app”); it leads to the same address, assembled from host and port of the
instance settings. Then sign in with the admin login and the start password. The server demands a **password change**
at once — the PWA shows a screen of its own for it. After that:

1. **Administration → Users**: create employees (login, name, password, role) and give each one a **badge PIN** (4–8
   digits) if they are to punch with a PIN at the kiosk. With **Photo** you store a picture of the employee
   (PNG/JPEG/WEBP/GIF up to 256 KB). It appears on the tiles of the presence screen and at the kiosk; without a picture
   the interface shows the placeholder. In the **work profile** of an employee, **Working time on the presence card**
   releases the working time of today on their tile (`1:23`, without a punch `0:00`). The card is visible to everybody
   even **before** the PIN is entered, so the administration decides that per employee — the default is **off**.
2. **Administration → Terminals**: create a terminal (PIN required on), **copy the device token** and open the displayed
   address `…/terminal?token=…` on the tablet — that was the kiosk step of T4. Without **PIN required** the device
   punches without a PIN: scanning a badge or selecting the name is enough. A wrong PIN is still refused.
3. **Administration → Settings**: set `report_font_path` to a Unicode `.ttf`/`.otf` if statements are to be printed in
   **ru**, **uk** or **zh-cn** (otherwise the export refuses with `report_font_missing`).
4. **Administration → Corrections**: look at the punches of an employee and straighten them — choose employee and
   month, then change a time (pencil symbol), delete a punch (wastebasket) or **add** missing ones (“Add punch or day”:
   date, in, out; leave “out” empty if only one punch is missing). The **reason** at the top of the tab goes to the audit
   log, and added punches carry the origin “added by the administration” — so every correction stays traceable.

## 5. First punches and checks

- Punch in the web app (in/out), open the month view, download the report as XLS and PDF.
- Load sample (T17) against the running instance:

  ```bash
  npm run load-smoke -- --login <user> --password '<password>' --count 5
  ```

  Expected: `OK: kein Fehler, alle Stempel vorhanden, Antwortzeiten im Sekundenbereich.` (code 0; the script prints in
  German).

- Check the first-start path automatically (sign-in, forced password change, employee with badge PIN, punching, day and
  month evaluation, XLS and PDF report, backup):

  ```bash
  npm run first-run -- --login admin --password '<start password>'
  ```

  Expected: `Ergebnis: <all>/<all> Schritte erfüllt` and `OK: Erststart-Strecke ohne Fehler.` (code 0). The script
  creates the employee `pruefung` with punches and a PIN — delete it in the administration afterwards for clean data.
  What it leaves out on purpose (because it needs a setting) it says at the end itself: the kiosk terminal and the badge
  link are checked by hand in the test plan.

- **Control presence from ioBroker:** every employee has the writable state `time-tracker.0.users.<id>.present` (role
  `switch`). `true` punches in (paid working time runs), `false` punches out — meant for a fingerprint reader, an RFID
  bridge, a dashboard or a script. Writing is idempotent (a second `true` creates no second punch) and appears as a
  normal punch with the note `state.present`. `users.<id>.hasOpenEntry` stays the pure display.
- **Commands from ioBroker (script, Blockly, dashboard):** below `time-tracker.0.commands.*` there are six writable
  states — they control the adapter without the web interface. What you write is in the adapter log afterwards (and in
  the audit log as _System_):

  ```js
  setState("time-tracker.0.commands.punchUserId", 3); // target employee (0 = the only one)
  setState("time-tracker.0.commands.punch", true); // punch in or out
  setState("time-tracker.0.commands.quickPunch", true); // with quick rounding
  setState("time-tracker.0.commands.recalc", "2026-08"); // month, or "2026" for the year
  setState("time-tracker.0.commands.closeMonth", "2026-08"); // the month closing needs YYYY-MM
  setState("time-tracker.0.commands.backup", true); // write a backup now
  ```

  **The two punch buttons react to `true` only** (any other value is ignored), and the adapter sets them back to
  `false` at once — so **never** write `false` to punch out: `punch` takes the right direction automatically.

  **Which employee?** The punch commands take the employee in `commands.punchUserId` (the adapter mirrors the current
  choice there, `0` = “the only employee”). If there are several employees and no choice, the command refuses and says
  so in the log. You see the employee id in the instance under `users.<id>` (the number behind `users.`).

  Without a target employee it also works **per employee**: `time-tracker.0.users.<id>.present` (see above) or a message
  through `sendTo("time-tracker.0", "punch", { user: "anna" }, answer => …)`.

  Errors (wrong period, unknown or deactivated employee) appear as a **warning in the log** — the instance keeps running.

- **Duplicate protection (important for readers):** two punches within **30 seconds** count as a double scan — the
  second one is not counted. A fingerprint or RFID reader that triggers several times is harmless that way; for
  “punch out again at once” the distance has to be larger than 30 seconds. This applies to all ways (web app, kiosk,
  badge, ioBroker object).
- Offline sample: disconnect the Wi-Fi, punch, reconnect — the punch is delivered later (view _Sync_).
- Administration → **Backups**: press “create now”; the state `time-tracker.0.info.lastBackup` jumps.
- Optional, recommended: copy the backups to another computer. In the instance settings, tab _Migration and backup_,
  section _External backup_: switch **Copy backups to an external server (SFTP)** on, enter server, user, password and
  directory, press **Test connection** (it shows the fingerprint to enter) and save. After the next backup
  `time-tracker.0.info.lastRemoteBackup` names the copy on the server and `info.remoteBackupError` is empty.
- Play through backup and restore once: stop the instance, copy the backup file **outside** the adapter directory, start
  the instance.

## 6. No data import

The adapter reads **no** data of another time tracking system. Employees, punches and absences are created in the
interface:

- **Employees:** Administration → Users (login, name, password, role, optional photo, badge PIN)
- **Past times:** Administration → **Corrections** — punches can be changed, deleted and added there, also whole past
  days (date, in, out). The **reason** (field above the list or in the dialog) goes to the audit log of the adapter; the
  symbol next to every punch shows its **history** (who, when, why) at any time.

## 7. When something is stuck

| Symptom                                  | First place to look                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| Web app not reachable                    | log `API listening on …`, state `info.connection`                                  |
| PWA cannot be installed                  | HTTPS needed (own certificate or reverse proxy), check the service worker scope in the log |
| Report missing/empty in `ru`/`uk`/`zh-cn` | set `report_font_path` (Administration → Settings)                                 |
| Kiosk accepts no PIN                     | state `info.lastError`, account lock after 5 failed attempts (15 minutes)          |
| Everything unclear                       | run `npm run test:ts`, `npm run test:package`, `npm run test:integration` locally  |

The acceptance criteria and the protocol sheet are in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (T1–T29); deviations and decisions
in [`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md).