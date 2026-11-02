# ioBroker Zeekr Adapter

<p align="center">
  <img src="admin/zeekr.svg" alt="Zeekr logo" width="160" height="160" />
</p>

This repository contains an ioBroker adapter for [Zeekr electric vehicles](https://www.zeekr.com). It follows the standard ioBroker adapter structure and exposes vehicle state data as datapoints.

## Features

- Standard ioBroker adapter layout with a configuration UI
- Zeekr username/password plus the Zeekr-specific secrets required by the upstream zeekr_ev_api client are configurable in the ioBroker admin interface
- Optional automatic secret extraction from a `zeekr_secrets.json` file or directly from the Zeekr APKs on the ioBroker host
- Vehicle discovery and status polling via a Python bridge that uses the Zeekr API client
- Datapoints for vehicle identity, battery level, range, odometer, charging state, lock state, climate state, and raw payloads
- Health and alert states such as `info.health`, `info.alertCount`, and `info.lastSuccessfulUpdate`
- Automatic bootstrap of a local Python runtime and Zeekr dependency on first use

## Requirements

- Node.js 22+ (matches `engines` in `package.json`)
- Python 3

No manual Python package installation is required. The adapter creates a local virtual environment on first run and installs the Zeekr dependency automatically.

On Debian/Ubuntu hosts and containers the venv bootstrap is self-sufficient: the venv is created without system pip and pip is bootstrapped from the vendored `lib/get-pip.py` — no downloads, no OS packages. Only if the `venv` Python module itself is missing you need the OS package and an instance restart (the adapter `.venv` directory is rebuilt automatically):

```bash
apt-get update && apt-get install -y python3-venv
```

## Development

Run the test suite locally:

```bash
npm test
```

## Installation

Install the adapter from the ioBroker repositories: open the Admin UI, go to Adapters, search for `Zeekr` and install it. Afterwards create a new instance and configure it (see below).

If the adapter misbehaves after an update, run `iobroker fix` on the host.

## Configure the instance

Open the ioBroker Admin UI, create a new instance of the `Zeekr` adapter, and configure:

- username: your Zeekr account email or login name
- password: your Zeekr account password
- countryCode: ISO country code used by the upstream Zeekr API client (defaults to `AU`)
- hmacAccessKey: HMAC access key required by the upstream client
- hmacSecretKey: HMAC secret key required by the upstream client
- passwordPublicKey: password encryption public key required by the upstream client
- prodSecret: production secret required by the upstream client
- vinKey: VIN encryption key required by the upstream client
- vinIv: VIN encryption IV required by the upstream client
- polling interval: refresh interval in seconds
- vehicle filter: optional substring filter for one or more vehicles; it only decides which vehicles are exposed as datapoints
- pythonBinary: optional override for the Python executable used by the adapter bridge and secret extractor
- autoExtractSecrets: if enabled, the adapter will try to extract missing secrets from the APKs or from a `zeekr_secrets.json` file when the adapter starts
- apkBasePath/apkArm64Path: optional paths to the Zeekr APK files for automated extraction
- secretsJsonPath: optional path to a `zeekr_secrets.json` created by the extractor
- extractRegion: region used by the upstream extractor (`EM`, `SEA`, `EU`, `CN`)
- debug: enable verbose bridge logging

## Automatic secret extraction

The adapter can automate the extraction flow from the upstream `zeekr_key_extractor` tool. For this to work, you need either:

- the full Zeekr base APK and the matching ARM64 split APK on the ioBroker host, or
- a pre-generated `zeekr_secrets.json` file.

The extractor script is bundled with the adapter at a pinned, reviewed upstream commit (`lib/extractor/`, MIT) — nothing is cloned or downloaded at runtime.

### How to obtain the APKs from a phone or emulator

Mandatory preparation on your own device — the adapter cannot do this for you:

1. On the Android phone or emulator, install the Zeekr app from the Play Store.
2. On your PC, install `adb` (Android platform tools) and enable USB debugging on the device, then verify the connection:
   - `adb devices` (your device must be listed)
3. Find the exact package paths (use `com.zeekr.overseas` for EU accounts, `com.zeekr.global` otherwise):
   - `adb shell pm path com.zeekr.overseas`
4. Pull exactly these two files (the `arm64_v8a` split is mandatory — `xxhdpi` or language splits do **not** work):
   - `adb pull /data/app/<...>/base.apk base.apk`
   - `adb pull /data/app/<...>/split_config.arm64_v8a.apk arm64.apk`
5. Upload the two files from your PC: in the adapter settings (Access tab) click “Upload APKs from this PC” and select `base.apk` plus the ARM64 split APK. Extraction starts automatically; afterwards restart the instance so polling starts with the new secrets. (Alternatively, put the files anywhere the `iobroker` user can read and enter the paths in `apkBasePath`/`apkArm64Path`.)
6. Set `extractRegion` to the region that matches your Zeekr account (`EU` for `com.zeekr.overseas`, otherwise `EM`, `SEA`, or `CN`).
7. Verify with the `testConnection` message (or check `info.connection`): on success you are done. On missing keys, see below.

### App 3.1.0 and newer (KiwiVM)

On app 3.1.0 and newer, static extraction is severely limited: the HMAC keys cannot be recovered statically (KiwiVM obfuscation, upstream issue #14), and VIN key/IV plus `prod_secret` are runtime-only (iWall). If extraction reports missing keys, provide an **older APK pair** (e.g. overseas 3.0.x) via the upload page or `apkOldBasePath`/`apkOldArm64Path` — missing secrets are filled from it automatically (verify with `testConnection`, keys can differ between versions). Whatever remains must come from a Frida dump:

### Runtime keys via Frida (step by step, one-time job)

> **Not needed for app 2.x:** overseas 2.x APKs (e.g. 2.9.9) still contain all keys statically — upload the pair and you are done, no Frida, no root, no second device. The steps below are only for app 3.1.0+ where static extraction cannot recover everything.

`prod_secret`, `vin_key` and `vin_iv` only exist decrypted inside the running app (iWall/`libiwallca.so`), so no static tool can read them. You dump them once from a rooted device; afterwards the rooted device is never needed again. Based on [mescon/zeekr-7x-home-assistant](https://github.com/mescon/zeekr-7x-home-assistant) (QUICKSTART + EMULATOR guides).

**You need:** a rooted arm64 Android (cheap second-hand phone with Magisk, or a rooted emulator — see below), a PC with Python + `adb`, and a second Zeekr account with the car shared to it (create/share it in your normal app; never use your daily account for extraction).

1. **Emulator (if no spare phone):** Android Studio → Device Manager → Pixel phone → **arm64-v8a**, API 33/34, **Google APIs** image (has Play Services and is rootable; the **Google Play** image cannot be rooted). Launch it once. Root with [rootAVD](https://github.com/newbit1/rootAVD): `git clone https://github.com/newbit1/rootAVD && cd rootAVD && ./rootAVD.sh ListAllAVDs`, then `./rootAVD.sh <that/ramdisk.img path>`. Confirm root in the Magisk app (`adb root` alone is not enough). On Intel/AMD PCs use an x86_64 image instead — if the app crashes at login (arm translation vs. white-box crypto), fall back to a physical arm phone.
2. **Frida 16.x (not 17 — v17 removed the Java bridge):** on the PC `pip install "frida-tools==16.7.19"`. Download `frida-server-16.7.19-android-<arch>.xz` from [frida releases](https://github.com/frida/frida/releases) (arch matches the **device**: arm64, or x86_64 for an Intel emulator), unpack and push it:
   - `adb push frida-server-16.7.19-android-<arch> /data/local/tmp/frida-server`
   - `adb shell "su -c 'chmod 755 /data/local/tmp/frida-server && /data/local/tmp/frida-server &'"`
   - verify with `frida-ps -U` (must list processes).
   - **App 3.1.0 note:** it detects a running Frida server and refuses to start. Hide it: rename the binary to something neutral (not `frida-server`), listen on a custom port (`/data/local/tmp/<name> -l 127.0.0.1:<port>` and point the tools at it), and put the Zeekr app on the Magisk deny list (Shamiko). If it still refuses, use `frida-gadget` (`objection patchapk`) instead of a server — there is then no server process to detect.
3. **Install the Zeekr app** (`com.zeekr.overseas`, current **v3.0.x** from [APKPure](https://apkpure.com/zeekr/com.zeekr.overseas) — the `.xapk` is a zip: unzip, then `adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk`). Open it and **log in with the second account** — the values only exist after the first signed request, merely opening the app is not enough.
4. **Dump the keys:**
   - `git clone https://github.com/mescon/zeekr-7x-home-assistant && cd zeekr-7x-home-assistant/tools`
   - `bash check.sh` (confirms frida + device + running app; the app shows up as **`ZEEKR`**)
   - `python3 extract_runtime_keys.py` — prints `prod_secret`, `vin_key`, `vin_iv`.
   - If it reports the getter failed (newer build moved the classes): `jadx` the base APK, open `xn/a.java`, copy the three base64 strings of fields `c` (`prod_secret`), `a` (`vin_key`), `l` (`vin_iv`) into the `PROD`/`VKEY`/`VIV` placeholders in `tools/dump.js`, and re-run.
5. **Into the adapter:** paste the three values into the Keys tab (`prodSecret`, `vinKey`, `vinIv`) — or save `{"prod_secret": "...", "vin_key": "...", "vin_iv": "..."}` as JSON and set `runtimeSecretsJsonPath`. Verify with `testConnection`.
6. **Cleanup:** uninstall the app from the extraction device (otherwise two sessions fight over the second account) and stop/remove `frida-server`.

### Alternative: use a secrets JSON file

If you already have a `zeekr_secrets.json` from the extractor, you can skip the APK step completely and provide its absolute path in `secretsJsonPath`.

This removes the need to copy the six secrets manually into the admin page once the APKs or the JSON file are available on the host.

### Secrets backup and restore

Protected config values (`password`, HMAC keys, prod secret, VIN keys) are never shown in Admin — ioBroker hides them on purpose. Presence is visible without values:

- states `zeekr.0.info.secretsPresent.*` (`true`/`false` per secret group),
- the `Credentials:` line in the adapter log at startup.

To secure the secrets outside ioBroker (migration, reinstall, safekeeping):

1. Open the APK page (`Upload APKs from this PC`), section 4: **Export secrets backup**.
2. The backup downloads directly to your PC as `zeekr-secrets-backup.json` and is additionally stored on the host (default: `secrets-backup.json` in the instance data folder, e.g. `/opt/iobroker/iobroker-data/zeekr.0/`, configurable via `secretsBackupPath`). **The file is PLAINTEXT** — store it safely and delete it from the host when no longer needed.
3. **Import secrets backup** reads the backup back: pick the file on your PC (no host access needed) or leave the picker empty to use the host file (e.g. after an instance move). Restart the instance afterwards.

Uploaded APKs live in the same instance data folder (`apks/` subdirectory) and survive adapter updates and restarts (they used to sit in the container temp dir — if yours are missing after this change, upload once more).

The backup file is never committed (see `.gitignore`) and is never uploaded anywhere by the adapter.

The adapter additionally auto-saves the backup file on every start (whenever secrets are present) and refills gaps from it: reinstalling the adapter rewrites the instance object and drops adapter-stored secrets (visible as `from: system.host.iobroker.cli` with empty values) — the next start restores them automatically. Only empty fields are ever refilled; to clear secrets permanently, delete the backup file too.

## Configuration

The adapter exposes the following configuration fields:

- `username`
- `password`
- `countryCode`
- `hmacAccessKey`
- `hmacSecretKey`
- `passwordPublicKey`
- `prodSecret`
- `vinKey`
- `vinIv`
- `pollingInterval`
- `vehicleFilter`
- `vehicleModel` (optional, shown as `details.model` — the API exposes no model name)
- `abrpEnabled`, `abrpApiKey`, `abrpUserTokens` (see “ABRP upload” below)
- `mockMode` (boolean, connection test without a real account)
- `alertWebhook` (optional, error alerts)
- `pythonBinary` (optional)
- `autoExtractSecrets` (boolean)
- `apkBasePath` / `apkArm64Path` (optional)
- `secretsJsonPath` (optional)
- `secretsBackupPath` (optional, empty = `secrets-backup.json` in the instance data folder)
- `extractRegion`
- `debug` (boolean)

### Shared account trade-off

Using a second (shared) account for the adapter avoids 079021 session fights with the app — recommended. But the server restricts some endpoints to the owner account: OTA update checks fail on shared keys (openzeekr #23 pattern), and the journey log likely does too (`trips.count` stays 0 while the app shows drives). If trips stay empty, that is the probable cause, not a mapping bug.

## Datapoints

The adapter creates a vehicle channel for each discovered vehicle with the following subchannels:

- `status`: battery, range, odometer, charging power, speed, plug state, charging state, lock state, climate state, charge limit, tire pressures, GPS, 12V battery, central locking, doors/trunk open states, consumption, engine/maintenance states, and timestamps
- `control`: command payload, service ID, send button, typed buttons (lock, climate, charge, windows, sunshade, lights), writable charge limit, climate temp/duration, charge/travel plan inputs, last command, and last result
- `trips`: trip count, last trip distance/start/end/duration/average speed/consumption, recent trip list (logbook, last 5 without coordinates), and fetch status (`trips.fetchJson`: ok/total/payload keys — empty when the server sends nothing, e.g. on shared accounts, see above)
- `raw`: raw payloads from the bridge
- `details`: additional metadata; `details.model` shows the configured vehicle model (Advanced tab) because the API exposes no model name

Polling is adaptive: charging or driving vehicles are polled every 60s (min 30s), idle ones at the configured interval. Unexpected charging stops and newly opened doors trigger the alert webhook (rate-limited).

## Energy, costs and smart charging

Each vehicle has an `energy` channel:

- `sessionKwh`/`sessionCost`/`sessionTariff`/`sessionLossKwh`: last finished charging session. Charger-side energy covers battery gain **plus losses** (`charger = max(integrated power, gain / efficiency)`).
- `monthKwh`/`monthCost`/`monthLossKwh`: running month totals (survive restarts, reset each month).
- `standbyMonthKwh`/`standbyMonthCost`: vampire drain while parked, priced at the default tariff.
- `lastSession`: full detail as JSON.

Tariffs in the `tariffsJson` config decide the price per session by **location and time**, e.g. home night rate vs. public charger:

```json
[{"name":"home-night","lat":52.52,"lon":13.405,"radiusM":200,"pricePerKwh":0.25,"from":"22:00","to":"06:00"}]
```

Entries without location match everywhere; entries without `from`/`to` match any time. Without a match the default price applies. Set `batteryCapacityKwh` (default 100) and `chargingEfficiencyPct` (default 88) for correct loss math.

`isHome` reflects the configured home zone. With `smartChargeEnabled` and a departure time, the adapter starts/pauses charging via `RCS` so the car charges in the cheapest matching window before departure (`smartCharge.state` shows `charge`/`wait`/`idle`).

## ABRP upload

The adapter can push the battery SoC (plus position, speed and range when known) to [A Better Routeplanner](https://abetterrouteplanner.com) after every poll, using the Iternio telemetry endpoint `https://api.iternio.com/1/tlm/send`.

### Setup step by step

1. ABRP app: create one user token per car (Settings → live data → Generic). Copy the token.
2. Browser: open `abetterrouteplanner.com/resources/api` → “Manage your telemetry API keys” → create a free telemetry key. Copy the key.
3. ioBroker Admin → Instances → `zeekr.0` → ABRP tab:
   - Enable “Enable ABRP upload”.
   - “ABRP API key”: paste the telemetry key from step 2.
   - “User token from ABRP app”: paste exactly the token from step 1 — nothing else, no VIN (the adapter knows its vehicles). Only with several cars use a per-VIN map instead: `{"VIN": "token", ...}`.
   - Save. Both keys land in `protectedNative` (never in states or logs).
4. Wait for the next poll (at most one polling interval) or trigger an immediate upload with a `sendAbrpTelemetry` message to `zeekr.0`.
5. Verify: `info.abrpLastSend` shows timestamp, VIN and SoC; `info.abrpLastResult` shows the server answer (`{"status":"ok",...}` — a `missing: ...` hint only lists optional fields and is normal); `info.abrpLastError` must stay empty.

### Troubleshooting

- No `abrpLast*` states appear at all: upload disabled, API key empty, or the tokens field is not valid JSON / has no entry for this VIN — the adapter then skips silently (debug log only).
- Server error or HTTP 401: API key or user token wrong — recreate both and re-paste them.
- ABRP shows stale data: telemetry older than a few minutes counts as stale; while driving the adapter polls every 60 s automatically.
- Privacy: while enabled, SoC, position and speed go to the ABRP cloud on every poll.

Sent payload details: `utc`, `soc`, `power` (negative while charging), `speed`, `lat`/`lon`, `is_charging`, `is_parked`, `odometer`, `est_battery_range`, `capacity`. Diagnosis via `info.abrpLastSend`, `info.abrpLastResult`, `info.abrpLastError`; a `sendAbrpTelemetry` message triggers an immediate upload.

## History recommendation

Log these states in InfluxDB/SQL for charts and long-term statistics: `status.batteryLevel`, `status.rangeKm`, `status.odometerKm`, `status.chargePower`, `energy.monthKwh`, `energy.monthCost`, `trips.count`.

The adapter also exposes root states under `info` for connection status, health, errors, logs, and the last successful update.

## Commands

The adapter accepts a lightweight `sendCommand` message with:

- `vin`: target vehicle VIN
- `command`: remote-control command (for example `start` or `stop`, depending on the target action)
- `serviceId`: Zeekr service identifier (for example `RCS` for charge control or other remote-control services)
- `setting`: payload object forwarded to the Zeekr API

The command is routed through the Python bridge and forwarded to the underlying `zeekr_ev_api` client.

Writable control states react to direct writes: set a button state (for example `vehicles.<id>.control.lock`) to `true` with `ack: false` from the admin UI, Vis, Blockly (`setState`) or scripts, and the adapter executes the command and resets the button. Direct state writes and `sendTo(instance, 'stateChange', { id, value })` messages share the same handler.

### Experimental commands (borconi/openzeekr research)

Additional buttons marked `(experimental)` come from Smali research in [borconi/openzeekr](https://github.com/borconi/openzeekr) and are **unverified**: trunk/frunk, charge lid, defrost, sunroof, sentry mode, remote engine start/stop, wake, battery preheat, seat/steering-wheel heat, fridge, cabin vent. They only add new actions; proven defaults are unchanged.

Confirmed since the last update (openzeekr moved to the same values, conflicts resolved):

- windows/sunshade: `RWS` + lowercase targets (`window`, `ventilate`, `sunshade`, `sunroof`) — our values were correct
- trunk unlock: `start`/`RDU`/`target=trunk` (upstream #162, live-tested on 7X — our `stop` corrected)
- climate/comfort: unified `ZAF` service (`AC`, `DF`, `SH.11`, `SW`) — our values were correct
- flash/honk: lowercase `rhl` key — our values were correct

Known caveats:

- powered tailgate open/close (`RDU_2`/`RDL_2`) need the ecarx telematics transport (`PUT /remote-control/vehicle/telematics/{vin}`), which the `zeekr_ev_api` client does not speak — expect no effect via this adapter. Plain trunk unlock (`RDU`) uses the standard transport.
- sentry mode needs the lowercase `rsm` key (uppercase is ignored by the car).
- glovebox/visitor/locker commands need a physical PIN (`0000` placeholder) and are intentionally **not** exposed as one-click buttons.
- charge current (`control.chargeCurrent`, 6–32 A via `RCS`/`rcs.ac.current`) is experimental.

### Live A/B checklist (for the real car)

For each open pair, try the listed variant and report whether the car executes it (check `control.lastResult` plus the car itself):

1. Trunk unlock: `start`/`RDU`/`target=trunk`
2. Frunk: `start`/`RDU`/`target=hood`
3. Battery preheat: `start`/`ZAN`
4. Charge current 16 A: `start`/`RCS`/`rcs.ac.current=16`

## Release and Maintenance

- The repository includes GitHub Actions for CI and release creation.
- Releases are automated with `release-please`; publishing a release triggers the asset build workflow.
- The release workflow builds a tar archive and attaches it to the GitHub release automatically.
- npm publishing needs no local token: pushing a version tag (`vX.Y.Z`) runs the Test-and-Release deploy job, which publishes to npm via trusted publishing. Never `npm publish` manually, never commit tokens.
- `common.news` keeps at most 7 entries (repository bot truncates, E1032): on release, drop the oldest entries — full history stays in the changelog below.
- A scheduled upstream sync workflow checks the reference repository for new commits and opens a tracking issue when changes are detected.

## Roadmap

- [x] extended datapoints (VTM/tire pressure/GPS/12V, charge limit, charge/travel plans, recent trips)
- [x] typed controls (lock/unlock, climate start/stop, charge start/stop via RCS, charge/travel plan)
- [x] live validation without account (mock mode + `testConnection` message)
- [ ] live validation against a real account (verify command defaults per model)
- [ ] more datapoints as needed

## Live validation with a real car (checklist)

1. Turn off mock mode, enter account + keys, check the `testConnection` message (`ok: true`).
2. Verify readings: battery, range, doors/trunk (test open/close), GPS, charge limit.
3. Toggle each button once and check `control.lastResult`: lock/unlock, climate start/stop, charge start/stop, windows, sunshade, lights/horn.
4. Set the charge limit to e.g. 80 and cross-check `status.chargingLimit`.
5. Report results as an issue (model, app version, region) so defaults can be refined.

### Object dump for repository review

The repochecker object-structure check accepts only a plain JSON **object** at root: `{ "<id>": { "_id": "<id>", ... }, ... }` — every value must carry `_id` identical to its key (an array or missing `_id` fails with E3001/E3002). Redact before attaching: VIN (upper- and lowercase device IDs), account email (`username`), home coordinates (`homeLat`/`homeLon`) and all `protectedNative` secret values (password, HMAC, prodSecret, VIN key/IV, ABRP keys) — structure only, never values.

## Disclaimer

Unofficial community project. Not affiliated with Zeekr or Geely.

- Personal and educational use only, at your own risk.
- The adapter talks to undocumented Zeekr APIs and derives keys from the official Android app (see `wysie/zeekr_key_extractor`). Reverse engineering and API use may violate Zeekr's terms and local law; check before use.
- Never commit APKs, `zeekr_secrets.json`, credentials, or tokens. Secrets belong in ioBroker `protectedNative`, never in git, logs, or states (enforced by CI secret scan).
- No APKs or keys are shipped in this repository.

## Credits

- [Fryyyyy](https://github.com/Fryyyyy) for the [Zeekr EV API](https://github.com/Fryyyyy/zeekr_ev_api) and the [Zeekr Home Assistant integration](https://github.com/Fryyyyy/zeekr_homeassistant)
- [wysie](https://github.com/wysie) for the [Zeekr key extractor](https://github.com/wysie/zeekr_key_extractor)

## Changelog

### 0.1.75

- Re-release of 0.1.74 (npm trusted-publishing retry): all admin translations completed, polling loop cleaned to a pure `setTimeout` chain (dead `setInterval` aliases removed), APK upload page backup check fixed (script syntax error)

### 0.1.74

- Review follow-up: all admin translations completed (no English duplicates left), polling loop documented and cleaned to a pure `setTimeout` chain (dead `setInterval` aliases removed), APK upload page backup check fixed (script syntax error)

### 0.1.73

- Review follow-up: no runtime code downloads (vendored `lib/get-pip.py`, pinned extractor script in `lib/extractor/` with MIT license, staged into the instance dir without git)

### 0.1.72

- Review fixes: raw layer never creates states with children (type flips are cleaned up), avg consumption uses non-deprecated `value.power`

### 0.1.71

- Self-sufficient venv bootstrap: venv is created without system pip, pip comes via official get-pip.py — no OS packages needed (only the `venv` module itself, if missing)

### 0.1.70

- Journey fetch status (`trips.fetchJson`: ok/total/keys, no sensitive values) to diagnose empty trip logs

### 0.1.69

- Trips: journey payload shapes (`list`/`data`/`trips`) mapped to count, recent trips and last-trip distance/start/end/duration/speed/consumption (no coordinates); `details.model` shows the configured vehicle model (API exposes none)

Older entries moved to CHANGELOG_OLD.md.

See [GitHub releases](https://github.com/solderer-de/ioBroker.zeekr/releases) for the full history. Releases are created automatically with release-please.

## License

Copyright (c) 2026 solderer-de <npm@schoebel-online.net>

MIT — see [LICENSE](https://github.com/solderer-de/ioBroker.zeekr/blob/main/LICENSE). This is an unofficial community project, not affiliated with Zeekr or Geely.