---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
---
<img src="https://raw.githubusercontent.com/sadam6752-tech/ioBroker.fingerprint/main/admin/fingerprint.png" width="120" alt="FingerprintDoorbell logo" />

# ioBroker.fingerprint

![Stable](https://iobroker.live/badges/fingerprint-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.fingerprint.svg)](https://www.npmjs.com/package/iobroker.fingerprint)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fingerprint.svg)](https://www.npmjs.com/package/iobroker.fingerprint)
[![License](https://img.shields.io/github/license/sadam6752-tech/ioBroker.fingerprint.svg)](LICENSE)

[![NPM](https://nodei.co/npm/iobroker.fingerprint.png?downloads=true)](https://nodei.co/npm/iobroker.fingerprint/)

[![Test and Release](https://github.com/sadam6752-tech/ioBroker.fingerprint/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/sadam6752-tech/ioBroker.fingerprint/actions/workflows/test-and-release.yml)
![Number of Installations](https://iobroker.live/badges/fingerprint-installed.svg)

Integrates the ESP32-based [FingerprintDoorbell](https://github.com/sadam6752-tech/FingerprintDoorbell)
into ioBroker over plain HTTP — **no MQTT and no simple-api adapter required**.

The adapter runs a small HTTP webhook receiver. The doorbell calls it directly on
a fingerprint match or an unknown-finger ring. The adapter also polls the device
to report its online/offline status and can reboot it or toggle the touch ring.

## Firmware requirement

This adapter talks to the **FingerprintDoorbell** firmware running on your ESP32.

- **Recommended: firmware v0.9.4 or newer** — everything below works, including
  enroll from the adapter, LED-ring control, WiFi signal and reliable
  multi-finger backup/restore.
- **firmware v0.9.3** — reliable backup/restore of all fingers (full 1536-byte
  templates).
- **firmware v0.9.1** — enables *server mode* (the adapter provisions the device
  automatically, no manual URLs) plus `control.ignoreTouchRing` and the fingerprint list.
- **firmware v0.9** also works in a basic mode (paste the match/ring URLs manually).

Feature-by-firmware overview:

| Feature | Firmware |
| --- | --- |
| Match / Ring / Status / Reboot | v0.9 |
| Server mode, ignore touch ring, fingerprint list | v0.9.1 |
| Backup / Restore (all fingers) | v0.9.3 |
| Enroll from adapter, LED ring, WiFi RSSI | v0.9.4 |

Get the firmware here:

- **Easiest — flash from your browser (fresh ESP32):**
  [Web Flasher](https://sadam6752-tech.github.io/FingerprintDoorbell/) — connect the ESP32
  via USB and click *Install* (Chrome/Edge/Opera or Firefox 151+).
- **Update later via OTA:** open `http://<device-ip>/update` → *Firmware* → upload
  `firmware.bin` from the [Releases](https://github.com/sadam6752-tech/FingerprintDoorbell/releases).
- **Manual download:** the latest ZIP from the
  [Releases](https://github.com/sadam6752-tech/FingerprintDoorbell/releases)
  (contains `firmware.bin`, `spiffs.bin` and flash instructions).

Check the running version at `http://<device-ip>/api/status` (field `version`).

## How it works

```
FingerprintDoorbell (ESP32)                 ioBroker.fingerprint
─────────────────────────                   ────────────────────
match  ──► HTTP GET /match?id=..  ─────────►  webhook receiver ──► lastMatch.*
ring   ──► HTTP GET /ring          ─────────►  webhook receiver ──► ring.*
                                    ◄───────  poll GET /debug   ──► info.connection
reboot                              ◄───────  GET /reboot        ◄── control.reboot
touch ring                          ◄───────  GET /set-touch-ring ◄── control.ignoreTouchRing
```

## Setup

1. Install and add an instance of the adapter.
2. In the instance settings, configure:
   - **Device IP Address** / **Device Port** — the doorbell's IP and WebUI port (default 80)
   - **Admin User / Admin Password** — if HTTP Basic Auth is enabled on the device
   - **Webhook Bind IP / Webhook Port** — where the adapter listens (default `0.0.0.0:8095`)
3. In the **FingerprintDoorbell WebUI → Settings**, set the HTTP action URLs to point
   to this adapter (copy the ready-made URLs from the instance settings — they already
   include the webhook token; replace `<iobroker-ip>` with the ioBroker host IP):

   ```
   HTTP Match URL: http://<iobroker-ip>:8095/match?id={id}&name={name}&confidence={confidence}&token=<token>
   HTTP Ring URL:  http://<iobroker-ip>:8095/ring?token=<token>
   ```

## Disclaimer

This adapter is an independent, community-made integration. It is **not** affiliated with,
endorsed by or supported by the authors of the FingerprintDoorbell firmware, the sensor
manufacturers or ioBroker GmbH. The software is provided **"as is", without warranty of any
kind** (see the MIT [LICENSE](https://github.com/sadam6752-tech/ioBroker.fingerprint/blob/main/LICENSE)); you use it at your own risk.

- **Not a certified security product.** Consumer fingerprint sensors (e.g. R503) can produce
  false accepts and false rejects and can be spoofed. Do **not** rely on this adapter as the
  only protection for doors, locks, alarm systems or anything that guards people or property,
  and always keep a mechanical or otherwise independent way in and out.
- **Not for safety-critical use.** Network, Wi-Fi, power or software failures can delay or
  drop events. Never use it where a failure could endanger life or health (e.g. fire exits).
- **Your network, your responsibility.** The device WebUI and the webhook use plain HTTP
  (Basic Auth and a shared token are sent unencrypted). Use them only in a trusted LAN/VLAN,
  never expose the webhook port or the device to the internet, and keep the token secret.
- **Biometric data / privacy (GDPR).** Fingerprint templates, names, timestamps and access
  logs are personal data. You are the controller: obtain the consent of the people enrolled,
  protect the backup files (they contain the raw templates, unencrypted — in the storage folder
  `fingerprint.0.storage`, readable for every admin user and possibly through a `web` instance,
  and on an external SFTP server, see *Backup*)
  and observe the laws that apply to you (e.g. GDPR/BDSG, works-council rules for employees).
- **Actions run unattended.** Fingerprint rules write to any ioBroker object you choose
  (lights, locks, alarms, scripts). Test your rules carefully before you depend on them.
- The authors are not liable for damage, loss of data, unauthorised access, burglary or any
  other consequence arising from the use or misuse of this software.

A German version is available in [DISCLAIMER.de.md](/#/docs/adapterref/iobroker.fingerprint/DISCLAIMER.de.md).

## Security

Communication is authenticated in both directions:

- **Adapter → device** (status poll, reboot, touch ring): HTTP Basic Auth using the
  configured Admin User / Admin Password.
- **Device → adapter** (match/ring webhooks): a shared **webhook token**. The token is
  auto-generated on first start and shown in the instance settings. Requests without a
  valid token (via `token` query parameter or `X-Auth-Token` header) are rejected with
  HTTP 401. Optionally, enable *"Accept webhooks only from the device IP"* to also reject
  requests from any other host.

With firmware < v0.9.1 the token must be pasted manually into the device URLs. From
v0.9.1 (server mode), the adapter provisions the URLs and token automatically.

`adminPassword` and `webhookToken` are stored **encrypted** in the instance configuration
(`encryptedNative`) and are **protected** (`protectedNative`), so other adapters cannot read
them. Values stored as plain text by version 0.7.12 or older are encrypted automatically on the
first start of 0.7.13: the log shows `… is now stored encrypted (one-time migration)` and the
instance restarts once — this is expected and not a crash.

## Fingerprint Actions (no scripting)

The **Fingerprint Actions** tab lets you trigger ioBroker objects directly from a
fingerprint — no JavaScript needed:

1. Click **Load fingerprints from device** to fill the table with the enrolled fingers
   (id + name). Existing rows are kept (merge).
2. For each row choose a **Target object**, an **Action** (`Set value` or `Toggle`),
   a **Value** and an optional **Min confidence** (leave empty to ignore).
3. The **Value** is freely typed and coerced to the target object's type:
   - boolean target: `true`, `1`, `on`, `yes`, `ja`, `да` → true; anything else → false
   - number target: parsed as a number (`,` accepted as decimal separator)
   - string target: used as-is
4. **Ring action** sets a chosen object when an unknown finger rings (e.g. play a chime).

### Smart rules (v0.5.0)

- **Debounce (s)** — ignore repeated triggers of the same finger within N seconds.
- **Conditions** checkbox — enforce time-based access windows for that finger. Define the
  windows on the **Conditions** tab: enter one or more finger IDs (comma-separated, e.g.
  `1,2,4`), tick the weekdays and set a `From`/`To` time (`HH:MM`). Multiple rows for the same finger are OR-combined; time ranges may cross
  midnight (e.g. `22:00`–`06:00`). If Conditions is on but no row matches, the action is skipped.
- **Alarm** checkbox (panic finger) — in addition to the normal action, sets the object
  configured under **Alarm target**. Example: a special finger opens the door as usual and
  also triggers an alarm state.
- **Snapshot** checkbox — in addition to the normal action, sets the object configured under
  **Snapshot target**. Example: trigger a script that captures an ESP32-CAM snapshot and sends it.

## Manage Fingers (v0.6.0)

The **Manage Fingers** tab lets you administer fingers without opening the device WebUI:

- **Rename** — enter a finger ID and a new name, then click *Rename*.
- **Enroll a new finger** — see below.

Backup and restore are on the **Backup** tab (see *Backup*).

Save the instance settings first so the device connection is available.

## Backup (v0.8.0, storage folder and restore v0.8.1)

Everything about backups is on the **Backup** tab of the instance settings: **Create backup**,
**Backup to restore** + **Restore the selected backup**, the automatic backup, the copy to an
external server and the restore from that server.

> **Note:** reliable backup/restore of *all* fingers needs firmware **v0.9.4**
> (full 1536-byte templates). Backups made with older firmware are incomplete —
> re-create them after updating.

### Storage folder

Every backup (by hand, automatic, fetched from the server, safety copy) is a file in the ioBroker
file storage, folder `fingerprint.0.storage/backups/`:

| File | Made by | Deleted automatically |
| --- | --- | --- |
| `fingerprint-backup-<time>.json` | *Create backup* | never |
| `fingerprint-auto-<time>.json` | automatic backup | the oldest beyond *Automatic backups to keep* (default 7, 0 = keep all) |
| `fingerprint-prerestore-<time>.json` | safety copy of the sensor right before a restore | never |

- In the admin, tab **Files**, open `fingerprint.0.storage` → `backups` to **download** a backup
  or to **upload** one (e.g. a copy from your NAS); uploaded files must keep the name pattern above.
- The mount point is of type `meta.user`, so ioBroker backups (BackItUp: include this instance and
  its files) take the folder along.
- The backup file of version 0.8.0 and older (`<iobroker-data>/fingerprint.0/fingerprints-backup.json`)
  is moved into the folder once as `fingerprint-backup-<time of the file>.json`; the old file is
  renamed to `fingerprints-backup.json.migrated`.
- Like everything in the file storage, the backups are readable for every admin user and, when a
  `web` instance serves the file storage without login, possibly in the browser. They contain the
  raw fingerprint templates (biometric data): protect your admin and web instances accordingly.

### Restore

Tab **Backup** → **Backup to restore**: choose a backup (newest first; reopen the settings to
refresh the list) → **Restore the selected backup** → confirm. The adapter checks the file
(valid JSON, finger ids 1–200, no duplicates, templates present), saves the current content of the
sensor as `fingerprint-prerestore-<time>.json` and then writes the backup to the sensor. If the
current content cannot be read from the device, the restore is aborted.

### Restore after a new installation of ioBroker

1. Install the adapter and enter the device settings (IP, admin user/password). Save.
2. Bring a backup back — one of:
   - **from an ioBroker/BackItUp backup**: after restoring it, the storage folder is back;
   - **upload**: admin → **Files** → `fingerprint.0.storage` → `backups` → upload the file;
   - **from the SFTP server**: tab **Backup** → enter the SFTP settings, switch the copy on,
     save → **Backup on the server** → choose → **Fetch from the server and restore**.
     The file is fetched into the storage folder and restored in one step.
3. For the first two ways: tab **Backup** → **Backup to restore** → **Restore the selected backup**.

### Automatic backup

The **Backup** tab of the instance settings can create the fingerprint backup automatically,
**daily** or **weekly** — it is **off** by default. Every automatic backup is a new file in the
storage folder; the device has to be reachable.

- The interval counts from the last backup (by hand or automatic), also after a restart of the
  adapter. A backup that is overdue runs five minutes after the start.
- A device that returns **no** fingerprints creates no backup (the automatic backup is skipped
  and logged).
- If the device is unreachable, the next attempt follows after one hour. A running enrollment
  postpones the backup by ten minutes.
- The time of the last backup is shown in `info.lastBackup`.

### Copy to an external server (SFTP)

A backup that lies on the same machine as ioBroker does not survive the loss of that machine.
The **Backup** tab can copy **every backup** (automatic and by hand) to another computer, for
example a NAS, over **SFTP**. The adapter opens the SSH connection itself: no mount, no `sudo`,
no shell command.

1. On the server, create a user that may only write into the target directory (not an
   administrator) and switch SFTP on (on a Synology: *Control Panel → File Services → FTP →
   Enable SFTP service*).
2. In the **Backup** tab, switch the copy on and enter host, user, password and the directory
   (it is created when it is missing). The password is stored encrypted and never written to
   the log.
3. Press *Test connection*: the adapter logs in, creates the directory, writes and deletes a
   small test file, and shows the **fingerprint** of the server. Enter that fingerprint in the
   settings to trust only this server — a different server is then refused before the password
   is sent. Without a fingerprint the copy works too, but the server is not verified (the log
   warns at every copy, with the fingerprint).

How it behaves:

- The local backup is made first. If the copy fails, the backup stays, the error is logged and
  shown in `info.remoteBackupError`; the last successful copy is in `info.lastRemoteBackup`.
  A failed copy is **not retried**: the next backup is copied again.
- File names: `fingerprint-backup-<time>.json` (by hand) and `fingerprint-auto-<time>.json`
  (automatic), time in UTC.
- A copy appears under its final name only when it is complete (uploaded as `.part`, size
  checked, renamed). The whole copy is limited to ten minutes. Leftovers of interrupted uploads
  of this adapter are removed by the next good copy.
- *Copies to keep on the server* deletes the oldest **automatic** copies beyond that number
  (0 = keep all). Backups made by hand and every other file in the directory are never deleted.
- Only password login is supported. The file is **not encrypted** on the server — the transfer
  is. It contains the raw fingerprint templates (biometric data): keep it on a volume only you
  can read.

## Enroll a new finger (v0.7.0, firmware ≥ v0.9.4)

You can enroll a new fingerprint directly from ioBroker — no need to open the
device WebUI:

- **Admin UI:** *Manage Fingers* tab → *Enroll a new finger* → enter a free ID
  (1–200) and a name → **Start enrollment**.
- **States:** write `control.enrollId` and `control.enrollName`, then set
  `control.enrollStart` = `true`.

Enrollment runs on the device and needs the user to place the finger on the
sensor **5 times**. Progress is reported live in the `enroll` channel:

| State | Type | Description |
| --- | --- | --- |
| `enroll.active` | boolean | `true` while an enrollment is running |
| `enroll.step` | number | Current scan step (0–5) |
| `enroll.status` | string | `idle` / `scanning` / `success` / `error` |
| `enroll.message` | string | Last human-readable status line |

On success the fingerprint list is refreshed automatically.

## LED ring control (v0.7.0, firmware ≥ v0.9.4)

Control the sensor's RGB ring from ioBroker:

- `control.ledMode` — `0` off, `1` on, `2` breathing, `3` flashing
- `control.ledColor` — `1` red, `2` blue, `3` purple, `4` green, `5` yellow, `6` cyan, `7` white

Writing either state applies the ring immediately.

## States

| State | Type | Description |
|-------|------|-------------|
| `info.connection` | boolean | Device reachable (via `/api/status` or `/debug` poll) |
| `info.uptime` | number | Device uptime in seconds |
| `info.freeHeap` | number | Free heap in bytes |
| `info.firmwareVersion` | string | Device firmware version |
| `info.serverMode` | boolean | Device sends events directly to this adapter |
| `info.wifiRssi` | number | WiFi signal strength in dBm (firmware ≥ v0.9.4) |
| `info.lastBackup` | number | Time of the last fingerprint backup (by hand or automatic) |
| `info.lastRemoteBackup` | string | Path of the last copy on the external SFTP server |
| `info.remoteBackupError` | string | Error of the last copy to the external server (empty = fine) |
| `fingerprints.<id>.name` | string | Name of the enrolled finger with that ID |
| `fingerprints.<id>.lastSeen` | number | Timestamp the finger was last matched |
| `fingerprints.<id>.count` | number | How often the finger was matched |
| `lastAccess.text` | string | Readable last access entry (granted/denied) |
| `lastAccess.granted` | boolean | Whether the last access was granted |
| `lastAccess.timestamp` | number | Timestamp of the last access |
| `stats.totalMatches` | number | Total fingerprint matches |
| `stats.totalRings` | number | Total doorbell rings (unknown finger) |
| `stats.lastPerson` | string | Name of the last recognized person |
| `lastMatch.id` | number | ID of the last matched finger (1–200) |
| `lastMatch.name` | string | Name of the last matched finger |
| `lastMatch.confidence` | number | Match confidence |
| `lastMatch.timestamp` | number | Timestamp of the last match |
| `lastMatch.matched` | boolean | Set to true on each match event |
| `ring.ringing` | boolean | True for a few seconds on a doorbell ring |
| `ring.timestamp` | number | Timestamp of the last ring |
| `control.reboot` | boolean (button) | Reboot the device |
| `control.ignoreTouchRing` | boolean (switch) | Ignore the touch ring (firmware ≥ v0.9.1) |
| `control.enrollId` | number | Slot id (1–200) for the next enrollment (firmware ≥ v0.9.4) |
| `control.enrollName` | string | Name for the next enrollment (firmware ≥ v0.9.4) |
| `control.enrollStart` | boolean (button) | Start enrollment (firmware ≥ v0.9.4) |
| `control.ledMode` | number | LED ring mode 0–3 (firmware ≥ v0.9.4) |
| `control.ledColor` | number | LED ring color 1–7 (firmware ≥ v0.9.4) |
| `enroll.active` | boolean | Enrollment running (firmware ≥ v0.9.4) |
| `enroll.step` | number | Current enrollment scan step 0–5 |
| `enroll.status` | string | `idle` / `scanning` / `success` / `error` |
| `enroll.message` | string | Last enrollment status line |

## Firmware note

- **Match / Ring / Status / Reboot** work with FingerprintDoorbell **v0.9** as-is.
- **`control.ignoreTouchRing`**, server mode and the fingerprint list require **v0.9.1**.
- **Backup / Restore** of all fingers requires **v0.9.3** (full 1536-byte templates).
- **Enroll from adapter, LED ring, `info.wifiRssi`** require **v0.9.4**.

## Changelog

### 0.8.2

- Admin UI: *Create backup* and *Restore* moved from *Manage Fingers* to the **Backup** tab, so everything about backups is on one page

### 0.8.1

- New **storage folder** `fingerprint.0.storage/backups/` (`meta.user`): every backup is a file there — download and upload it in the admin tab *Files*; ioBroker/BackItUp backups take it along. The backup file of 0.8.0 is moved there once
- New: **restore a chosen backup** (list newest first, confirmation). Before every restore the current content of the sensor is saved as a safety copy (`fingerprint-prerestore-…`); the file is checked first (JSON, ids 1–200, no duplicates, templates)
- New: **restore from the external SFTP server** — list the backups on the server, fetch one into the storage folder and restore it (for a new installation of ioBroker)
- New setting *Automatic backups to keep* (default 7); backups made by hand and safety copies are never deleted
- Tests: storage, restore, safety copy and SFTP restore against a real js-controller, a simulated device and an SFTP server inside the test

### 0.8.0

- New **Backup** tab: automatic fingerprint backup (off, daily, weekly; off by default). The interval counts from the last backup, also after a restart; an empty device never replaces an existing backup
- New: every backup (by hand and automatic) can be copied to an external server over **SFTP** (e.g. a NAS) — upload as `.part` with size check and rename, optional host key fingerprint, test button, cleanup of old automatic copies. The password is stored encrypted (`encryptedNative`)
- New states `info.lastBackup`, `info.lastRemoteBackup`, `info.remoteBackupError`
- Admin buttons wait until the adapter has finished its start
- New dependency `ssh2`; tests against an SFTP server inside the test and an integration test with a simulated device

### 0.7.13

- Security: `adminPassword` and `webhookToken` are stored encrypted (`encryptedNative`), resolving repository checker warning W1074
- Values stored as plain text by older versions are encrypted automatically on the first start (`lib/secrets.js`). The log shows `… is now stored encrypted (one-time migration)` and the instance restarts once; nothing has to be entered again
- A newly generated webhook token is stored encrypted
- Tests: unit tests against the encryption of js-controller 7.2.2 and integration tests with a real js-controller

### 0.7.12

- Security: the webhook token no longer appears in error messages; the backup file is only readable by its owner (`0600`); match events with invalid finger IDs are ignored; device-supplied names are sanitized (control characters, length); rejected webhook requests are logged rate-limited; removed the unused `getWebhookInfo` message command
- Stability: the webhook start is retried every 30 s if the port is busy
- Admin UI: quotes and backslashes in the rename/enroll name fields are rejected (they broke the request)

### 0.7.11

- Fix: `lastMatch.matched` is reset after 3 s, so every match is a state change for scripts
- Fix: `info.connection` is correct when status polling is disabled (one initial poll is always done)
- Fix: match/ring counters no longer lose concurrent events
- Faster adapter stop (idle webhook connections are closed)
- README: added badges

### 0.7.10

- Polling interval is range-checked (5–600 s) even if the config is edited outside the UI
- Removed unused translation keys; translated the `localLinks` name into all languages

### 0.7.9

- New: link to the device WebUI in the instance list of Admin (`localLinks`)

### 0.7.8

- README is English-only (German disclaimer moved to `DISCLAIMER.de.md`), added the 0.7.7 changelog entry, updated `@iobroker/testing` to 6.3.x

### 0.7.7

- Security/stability: errors in the async webhook handlers can no longer crash the adapter; objects are only created for valid finger IDs (1–200); constant-time token comparison; webhook timeouts; name length and device response size limits; LED values are range-checked; fixed an unhandled rejection after a failed backup request
- Added a disclaimer to the README
- Updated `@iobroker/testing` to 6.3.x

### 0.7.6

- **HOTFIX for v0.7.5**: declaring `adminPassword` / `webhookToken` as `encryptedNative`
  made the js-controller transform previously stored plain text values into unusable data
  before the adapter started, so the device login (HTTP Basic auth) and the server-mode
  provisioning failed. `encryptedNative` was removed again — the values are only declared as
  `protectedNative` now, so stored values keep working
- Unusable values are detected automatically: the webhook token is regenerated and the log
  asks to enter the admin password again (this also covers settings that were saved while
  v0.7.5 was active)
- New `lib/secrets.js` with unit tests for the secret repair logic

### 0.7.5

- Repository checker fixes: moved `protectedNative` / `encryptedNative` to the **root** of
  `io-package.json` (inside `common` they were ignored and the schema reported error E1105),
  reduced `common.news` to 7 entries, added the complete MIT license text including the
  copyright line to the README, completed the `.vscode` JSON schema settings, bumped
  `@iobroker/testing` to 6.2.x

### 0.7.4

- Repository review fixes: corrected state roles (`control.enrollId`/`ledColor`
  use `level`, `ring.ringing` uses `sensor`), marked `adminPassword` /
  `webhookToken` as protected & encrypted native, added Node.js 26 to CI,
  bumped `@iobroker/testing` to 6.x, added `.vscode` JSON schema settings

### 0.7.3

- Automated npm publishing via npm Trusted Publishing (OIDC) with provenance;
  removed the npm token from the deploy workflow

### 0.7.2

- Repository compliance for the ioBroker adapter repo: responsive size attributes
  in the admin UI, license copyright line, Ukrainian translations, a deploy
  workflow job, and internal cleanups (no functional change)

### 0.7.1

- The *Enroll a new finger* section (Manage Fingers) now also shows the
  *Available fingers* reference dropdown, so you can pick a free slot ID

### 0.7.0

- **Enroll from the adapter** (firmware ≥ v0.9.4): start enrollment from the *Manage Fingers*
  tab or via `control.enrollStart`; live progress in the `enroll` channel
  (`active` / `step` / `status` / `message`)
- **LED ring control** (firmware ≥ v0.9.4): `control.ledMode` + `control.ledColor`
- **WiFi signal**: new `info.wifiRssi` state (firmware ≥ v0.9.4)
- **Conditions**: added an *Available fingers* reference dropdown (id → name) so you know
  which IDs to enter

### 0.6.1

- Fix invalid jsonConfig: remove unsupported `attr` from the Manage Fingers rename fields (settings page failed to load)

### 0.6.0

- **Manage Fingers** tab: rename a finger, and backup / restore all fingerprints
  (stored in a file on the ioBroker host that survives adapter updates)
- **Snapshot** action: per-rule checkbox + a *Snapshot target* object — set in addition
  to the normal action, e.g. to trigger a script that captures an ESP32-CAM snapshot

### 0.5.1

- Conditions: the Finger field accepts several IDs comma-separated (e.g. `1,2,4`); added a hint/tooltip

Older entries: see CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 sadam6752-tech sadam6752@gmail.com

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