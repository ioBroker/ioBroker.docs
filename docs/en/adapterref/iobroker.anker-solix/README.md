# ioBroker.anker-solix

[![NPM version](https://img.shields.io/npm/v/iobroker.anker-solix.svg)](https://www.npmjs.com/package/iobroker.anker-solix)

ioBroker adapter for **Anker Solix** power systems (Solarbank, Smart Meter, PPS, EV charger, and more). It is based on the Home Assistant integration [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) and uses the same unofficial **solixapi** Python library.

> **Supported operating systems**
>
> | OS | Status |
> |----|--------|
> | **Linux** | Primary production target — **CI-tested** (Docker, NAS, Raspberry Pi, …) |
> | **Windows** | **Supported and tested** on ioBroker for Windows (Python 3.12+) |
> | **macOS** | **Not supported** — automatic Python/venv installation was not verified |
>
> npm / `package.json` catalog install: **`linux`** and **`win32`** only. Details: [Supported platforms](#supported-platforms).

A small **Python bridge** (persistent daemon, like HA) polls the Anker cloud and optional MQTT, then exposes values as ioBroker states. Optional entity groups (since v0.9.0) mirror HA’s scope: only **Core** is on by default to limit API load.

## Table of contents

1. [Disclaimer & usage terms](#disclaimer--usage-terms)
2. [Supported platforms](#supported-platforms)
3. [How this adapter works in ioBroker](#how-this-adapter-works-in-iobroker)
4. [Requirements & installation](#requirements--installation)
5. [Configuration](#configuration)
6. [Anker account & login cache](#anker-account--login-cache)
7. [Limitations](#limitations)
8. [Supported devices](#supported-devices)
9. [State structure & entity groups](#state-structure--entity-groups)
10. [MQTT](#mqtt-managed-devices)
11. [Special device notes](#special-device-notes)
12. [Troubleshooting login / poll](#troubleshooting-login--poll)
13. [Services](#services)
14. [Credits & further reading](#credits--further-reading)
15. [Changelog](#changelog)
16. [Publishing](#publishing-npm--iobroker-catalog)

---

## Disclaimer & usage terms

This adapter is **not** affiliated with Anker. Trademarks and product names belong to their respective owners.

The adapter uses an **unofficial** Python library to talk to the Anker Power **cloud API** (same as the mobile app). That API can change or break at any time. Improper settings may affect devices; the user accepts these risks when enabling the instance (**Account** tab). Future adapter updates may extend monitoring or controls.

---

## Supported platforms

| Platform | Status | Notes |
|----------|--------|-------|
| **Linux** (Debian, Ubuntu, Docker, Proxmox, NAS, RPi) | **Primary / CI-tested** | Recommended for production; Python 3.12+ venv (`python3-venv`, `python3-pip`) |
| **Windows** (ioBroker for Windows) | **Supported & tested** | Verified on a real ioBroker Windows host; installer tries `py -3.13`, `py -3.12`, then Program Files paths; set **pythonPath** in admin if needed; installs **`tzdata`** for `Europe/Berlin` |
| **macOS** | **Not supported** | Same Unix code path as Linux in theory, but automatic Python/venv bootstrap was **not tested** — no npm catalog support (`package.json` has no `darwin`) |

**Linux** remains the main target for ioBroker deployments. **Windows** is fully supported in code and verified manually; GitHub Actions runs adapter tests on **`ubuntu-latest`** and **`windows-latest`**. **macOS** is excluded from support claims until Python installation is tested.

---

## How this adapter works in ioBroker

| Layer | Role |
|-------|------|
| **Node.js adapter** | Instance config, scheduling, ioBroker states, control queue |
| **Python bridge** (`python/bridge.py`) | Long-lived session: API + optional MQTT (HA-style) |
| **solixapi** | Cloud login, sites/devices, energy stats, MQTT map |
| **authcache** | `iobroker-data/<instance>/authcache/<email>.json` — reused after successful API login |

Poll interval should be **60–180 s** (same recommendation as HA). Site list is updated every cycle; device/site details and energy data run on a slower interval (`deviceDetailMultiplier`, default every 10th poll).

> **Important:** The cloud API is **mandatory**. MQTT alone is not enough for full system data. This adapter does **not** replace local BLE or Modbus integrations — see [Additional resources](#credits--further-reading).

---

## Requirements & installation

- ioBroker **js-controller >= 6**, **admin >= 7.6**
- **Node.js >= 22**
- **Python 3.12+** on the ioBroker host:
  - **Linux:** `python3-venv` + `python3-pip` (Debian/Ubuntu) — primary production target
  - **Windows:** Python 3.12+ from python.org or `py -3.12`; adapter installer handles venv and **`tzdata`**
  - **macOS:** **not supported** (automatic Python install not verified)

Python dependencies install into the adapter folder (`python/.venv` or `python/site-packages`). Since v0.2.0: automatic on start (**Options** → `autoInstallPython`) or button **Install Python dependencies**.

Install via ioBroker (recommended):

```bash
iobroker install anker-solix
```

After changing the adapter files locally, upload the instance:

```bash
iobroker upload anker-solix
```

**Multihost:** use `--host "PC(SmartHome)"` with quotes if the name contains special characters.

Remove legacy symlink if present: `rm -f /opt/iobroker/node_modules/iobroker.AnkerSolix`

Manual Python setup (if needed):

```bash
cd node_modules/iobroker.anker-solix
python3 -m venv python/.venv && python/.venv/bin/pip install -r python/requirements.txt
```

### Home Assistant (ioBroker add-on)

The official **ioBroker** app on Home Assistant OS often has `python3` but **no `pip`** and **no `python3-venv`**. Install or update the adapter via the ioBroker catalog / npm (`iobroker install anker-solix`). From **0.10.72** onward the installer detects this profile and tries:

1. virtualenv in `python/.venv` (or `--without-pip` + pip inside venv)  
2. `get-pip.py` with `--break-system-packages` when system Python is PEP 668  
3. `pip install --target python/site-packages` as fallback  

In the instance admin: **Options** → **Install Python dependencies**, or restart the instance with **autoInstallPython** enabled.

If logs still show `No module named pip`, open the ioBroker/SSH terminal on the host and run:

```bash
cd /data/iobroker/node_modules/iobroker.anker-solix
node tools/install-python.js
iobroker restart anker-solix.0
```

Copy **`authcache/<email>.json`** from a working Anker setup (e.g. ha-anker-solix) into `iobroker-data/anker-solix.0/authcache/` to avoid captcha on first login.

---

## Configuration

1. Create instance: `iobroker add anker-solix`
2. **Account:** Anker e-mail, password, country code (e.g. `DE`) — **save after entering password**
3. **Account:** accept unofficial API usage (checkbox at bottom of tab)
4. **Options:** poll interval 60–180 s, **MQTT** if needed, `deviceDetailMultiplier` (HA default: 10)
5. **Devices:** **Load devices**, optional site ID / device SN filter
6. **Objects** (v0.9.0+): enable optional groups; only **Core** on by default → **restart adapter** after changes

Do **not** use **Clear Anker login cache** unless you need a deliberate re-login (wrong account, corrupted file). Clearing forces a new cloud login and often triggers captcha on server hosts — see [Troubleshooting](#troubleshooting-login--poll).

---

## Anker account & login cache

After the **first successful API login**, the adapter stores tokens in:

`iobroker-data/anker-solix.0/authcache/<your-email>.json`

(Filename must match the e-mail in **Account** exactly.)

Since Anker app **3.10** (mid-2025), one account can often be used on **multiple clients in parallel** (app + ioBroker + HA). Older docs about “only one token” are less critical today, but a **failed re-login** from ioBroker still cannot refresh the file if Anker returns captcha.

**Shared / member accounts:** A family-shared account may see fewer API details than the owner account (same as HA).

More account notes: [HA INFO.md – accounts](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md).

---

## Limitations

- **Unofficial API** — no documentation; endpoints can change anytime.
- **EU vs COM cloud** — wrong **country** in config → login works but **no systems/devices**. Do not switch countries after pairing devices.
- **Stale cloud data** if device Wi‑Fi is offline; use cloud/MQTT connection indicators when enabled.
- **MQTT** updates depend on device publish cycle; some values only with **real-time trigger** (high traffic if 24/7).
- **Standalone devices** (PPS, charger, cooler not in a power system) have **little or no API energy data** — MQTT may be required ([HA limitations](https://github.com/thomluther/ha-anker-solix#limitations)).
- **Dynamic tariff** beyond Nordpool: forecast/price entities may be wrong or read-only.
- **Captcha (100032)** on direct API login from VPS/VPN/datacenter — see [Troubleshooting](#troubleshooting-login--poll). Copy `authcache` from HA or another working setup if ioBroker cannot log in once.

To help add devices: export anonymized data via HA [export systems](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#export-systems-action) or [anker-solix-api export_system.py](https://github.com/thomluther/anker-solix-api#export_systempy).

---

## Supported devices

Same device coverage as [ha-anker-solix](https://github.com/thomluther/ha-anker-solix#supported-sensors-and-devices) (via solixapi). In ioBroker, data appears under state IDs by device type (`solarbank`, `smartmeter`, `combiner_box`, `system`, …).

| Device type | Examples / notes |
|-------------|------------------|
| **system / site** | Power system from the Anker app (= API “site”) |
| **solarbank** | E1600 (Gen1), SB2 Pro/Plus/AC, SB3 E2700 — API + MQTT |
| **combiner_box** | Power Dock (multisystem) — merged controls in ioBroker when applicable |
| **smartmeter** | Anker 3-phase, US meter, Shelly 3EM / 3EM Pro |
| **inverter** | MI80 standalone (virtual site in API) |
| **smartplug** | Smart Plug 2500 W |
| **pps** / **solarbank_pps** | Portable power stations — mostly MQTT |
| **ev_charger** | V1 Smart EV Charger — mostly MQTT |
| **vehicle** | Virtual EVs for charger accounts — read-oriented in ioBroker |
| **powerpanel** / **hes** | US Power Panel, X1 HES — limited API, heavy stats polling |
| **charger** | Prime / charging stations — MQTT |
| **home_backup** | E10, AX170 — very limited API |

Device hierarchy (how HA structures entities): [discussion #239](https://github.com/thomluther/ha-anker-solix/discussions/239).

---

## State structure & entity groups

Typical paths (instance `anker-solix.0`):

- `anker-solix.0.solarbank.<deviceId>.sensors.*` — power, SOC, etc.
- `anker-solix.0.solarbank.<deviceId>.control.*` — writable controls where supported
- `anker-solix.0.<device>.<id>.statistics.*` — daily kWh (enable **Objects** → energy statistics)
- `…statistics.week.*` / `statistics.month.*` / `statistics.year.*` — calendar week, month, year totals in kWh (separate entity groups; polled on detail refresh, not every cycle)
- **Combiner site:** statistics only under `combiner_box.<id>.statistics.*` (not duplicated on `system.*` or each `solarbank.*`). **Without combiner:** per `solarbank.*` (and `smartmeter.*` for grid metrics). API queries remain **once per site**.
- `anker-solix.0.smartmeter.<deviceId>.sensors.*`
- `anker-solix.0.services.*` — export, schedule, refresh (button states)
- `anker-solix.0.info.connection`, `anker-solix.0.info.pythonReady`

**Entity groups** (Admin → **Objects**): map to HA feature sets — power flows, diagnostics, PPS, EV charger, HES, site price, account info, etc. Disabled groups are excluded from API polls to reduce load.

---

## MQTT managed devices

Enable **MQTT** in **Options** when you need live data or controls that the cloud API does not provide (many PPS/EV/charger functions).

- Extra sensors/controls come from MQTT maps in solixapi (community-decoded per model).
- **Real-time trigger** and **status request** behave like HA buttons — automating them 24/7 increases traffic and keeps devices awake ([HA MQTT section](https://github.com/thomluther/ha-anker-solix#mqtt-managed-devices)).
- **Hybrid controls** (station SOC reserve, AC limits, grid export on multisystem) need MQTT + API like HA.
- Devices in **MQTT local mode** (e.g. E10 behind Power Dock) are proxied via the hub device — see [HA INFO – MQTT local mode](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#devices-in-mqtt-local-mode).

Decoding new models: [MQTT guidelines](https://github.com/thomluther/anker-solix-api/discussions/222), tool `mqtt_monitor.py` in [anker-solix-api](https://github.com/thomluther/anker-solix-api).

---

## Special device notes

Condensed from the [HA integration README](https://github.com/thomluther/ha-anker-solix); behavior is the same via solixapi.

### Standalone inverters (MI80)

Not a full app “power system”, but cloud tracks yields. API creates a **virtual site**. Inverter Wi‑Fi state in API is often wrong; cloud connection state is more reliable. **Do not** change inverter limits permanently (hardware write cycles).

### Solarbank 1 (E1600)

Cloud updates ~every **60 s** while producing/discharging; ~hourly in standby. **Schedule bug:** a single all-day API slot can set export to **0 W** — use ≥2 slots in the app if using output preset. Daily discharge statistic since mid-2024 includes bypassed PV (also wrong in app). MQTT monitoring/control from HA v3.4+/3.5+.

### Solarbank 2 + smart meters

Cloud interval often **~5 minutes**; control changes may take up to **~6 minutes** to appear in sensors. Shared accounts historically had unavailable entities (Anker-side fix). Some **output limit** API paths still unknown.

### Solarbank 2 AC

Time-of-use plans via controls where supported; cloud updates can stall after heavy app use ([HA #211](https://github.com/thomluther/ha-anker-solix/issues/211)).

### Combined SB2 + cascaded SB1

Totals/statistics in Anker cloud reflect **SB2 only**; SB1 is partly a “black box”. Enforced minimal schedule on SB1 when SB2 is manual — some ioBroker/HA controls show **unavailable** intentionally. For correct charge/discharge energy, sum **per-device** battery power, not only system NET power ([HA details](https://github.com/thomluther/ha-anker-solix#combined-solarbank-2-systems-containing-cascaded-solarbank-1-devices)).

### Solarbank 3

Smart mode, dynamic price, time-slot modes — often **toggle only** via API (configure in app first). Dynamic price VAT/fees may be **cache-only** customizations. Nordpool forecast most reliable.

### Multisystem with Power Dock

Up to 4 SB3 units; shared station settings (usage mode, SOC reserve, grid export). Controls consolidated on **combiner / Power Dock** in integration logic. Cloud data can lag in early deployments. Multisystem **AC output limit** may not be changeable via API.

### Station controls

SOC reserve, PV/AC limits, grid export often need **API + MQTT** (hybrid). Third-party PV / EV-enable switches are usually one-time app setup — not exposed for automation.

### PPS / Solarbank PPS (F3000 + US meter)

Automation-style home backup in US; control mainly via MQTT.

### EV charger (V1)

Most metrics/controls via MQTT; member accounts supported. Operational modes map to HA-style state machine — in ioBroker, check available control options before scripts. Session history statistics not implemented (use state history).

### Vehicles

Virtual devices per account EV; no creation via adapter — discovered on refresh.

### Power Panel & HES (X1)

Limited API power; workaround uses **~5 min averages** from energy stats (**~80 MB/day** extra traffic per system if enabled). Disable heavy categories in **Objects** if needed. X1: consider local **Modbus** ([Anker spec](https://support.ankersolix.com/de/s/download-preview?urlname=Anker-SOLIX-X1-Series-Modbus-Protocol)) — not part of this adapter.

### Home Backup (E10, AX170)

Almost **no** cloud API for system energy; E10 often **MQTT local mode** via dock.

### Other / standalone devices

Only in a **power system** for full API; otherwise MQTT + community decoding required.

---

## Troubleshooting login / poll

### No `authcache/<email>.json`

The file is created only after a **successful** API login. If every login returns captcha, copy a working file from [ha-anker-solix](https://github.com/thomluther/ha-anker-solix) (`custom_components/anker_solix/solixapi/authcache/`) into `iobroker-data/anker-solix.0/authcache/`, same filename as in **Account**.

### `(100032) Captcha id empty`

Anker blocks some **server/VPN** API logins. The library cannot solve captcha.

1. Confirm app login on same LAN; correct **country**; no VPN on ioBroker host.
2. **Do not** clear login cache to “fix” captcha.
3. Copy `authcache` from HA or re-login when cloud allows.
4. Wait 15–30 min after many failed attempts.
5. Use adapter **≥ 0.9.3** so a valid cache is not discarded on restart.

Log shows exact cache path from **0.9.4+**.

### Rate limits (26161 / 429)

Increase poll interval; reduce enabled **Objects** groups; adapter retries and may fall back to one-shot bridge briefly.

---

## Services

States under `anker-solix.0.services.*` (set to `true` to trigger):

- `get_schedule`, `clear_schedule`, `export_systems`, `get_system_info`, `refresh_devices`

Uses `selectedDeviceId` / `selectedSiteId` from config. See Admin **Objects** tab (services hint).

---

## Credits & further reading

| Resource | Content |
|----------|---------|
| [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) | Full README, **INFO.md** (config, MQTT, export, tariffs) |
| [thomluther/anker-solix-api](https://github.com/thomluther/anker-solix-api) | Python API, export, mqtt_monitor |
| [HA discussions](https://github.com/thomluther/ha-anker-solix/discussions) | Energy dashboard, zero export, efficiency |
| [SolixBLE](https://github.com/flip-dots/SolixBLE) | Local BLE (not cloud) |
| [ha-anker-solix-official](https://github.com/anker-charging/ha-anker-solix-official) | Official Modbus (local devices) |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | PV forecast (optional input for curtailment avoidance) |

German guides/videos linked from the [HA README](https://github.com/thomluther/ha-anker-solix#additional-resources) apply conceptually to data and limits; wiring is via ioBroker states instead of HA entities.

---

## Curtailment avoidance (optional)

Tab **Abregelungsvermeidung** / **Curtailment avoidance**: requires the [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) adapter. (Previously based on [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) / solarprognose.de — switched because **solarprognose.de is shutting down** and that data source is no longer viable.) Set the **plant path** (e.g. `pvforecast.0.plants.pv`); power values are read from `{path}.power.hoursToday.*`. **Forecast resolution** (60 / 30 / 15 minutes, default **60**) must match the interval configured in pvforecast. **Controls only:** **manual** mode + **`ac_output_limit`** (AC output / export). **Does not** change station base settings (grid export cap, `allow_grid_export`, home load preset, AC charge limit). **Before:** `ac_output_limit` = live PV. **Active:** `missing_charge_wh`, `max_charge_w` = `missing_charge_wh` ÷ `remaining_hours`, `export_w` = `live_pv_w` − `max_charge_w`, `ac_output_limit` = `export_w`. **After:** restore selected mode. States: `curtailment.live_pv_w`, `missing_charge_wh`, `max_charge_w`, `export_w`, `remaining_hours`.

**Admin:** checkbox *Combiner box present* — without combiner: device ID + solarbank type + battery Wh; with combiner: combiner ID + up to **4** solarbank slots (each slot can be *none*). **Combiner:** total AC limit = **sum** of per-unit limits (SB2 **1000** W, SB3 Pro **1200** W, SB4 Pro **2500** W). **Standalone:** always **800** W.

---

## Changelog

### 0.10.86

- **Solarbank 1 (E1600):** writable `preset_charge_priority` (0–100 %) and `preset_discharge_priority` (switch) via `set_home_load` — not applicable to SB2/SB3

### 0.10.85

- **Admin:** curtailment hint/path labels use new i18n keys so Admin no longer keeps stale solarprognose.de text after the pvforecast switch

### 0.10.84

- **Curtailment:** switch forecast source from solarprognose.de / [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) to [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) because **solarprognose.de is shutting down**. Plant path (`…power.hoursToday`); resolution option 60/30/15 min (default 60). (0.10.82/0.10.83 were not published: CI lint / unpublished news entries.)

### 0.10.83

- **Fix:** CI lint for curtailment/pvforecast (`prettier`, `require-await`, redundant type unions) — not published (see 0.10.84)

### 0.10.82

- **Curtailment:** switch to pvforecast (solarprognose.de shutting down) — not published (CI lint failure; see 0.10.84)

### 0.10.81

- **Repository review (mcm1957):** restore standard `test-and-release` workflow — adapter tests on every push/tag (Linux + Windows matrix), deploy only after all jobs succeed (no `always()` / no skipped-tests workaround); declare **`linux` + `win32`** in `package.json`; README: Windows supported & tested, **macOS not supported**

### 0.10.80

- **Object dump fix:** persist `periodScheduleOffsetSec` via `extendForeignObjectAsync` on `system.adapter.<instance>` (avoids invalid `anker-solix.0.system.adapter.*` object without `type`/`common`, E3004/E3007)

### 0.10.79

- **Repository re-review:** per-instance period energy schedule jitter; sensor-kind state name migration; remove unused `curtailmentModeBefore`; document Linux + **tested Windows** support

### 0.10.78

- **Adapter-check:** use `adapter.setTimeout` instead of plain `setTimeout` (E5005)

### 0.10.77

- **Repository review:** English-only log messages; English default state names and list labels (common.name/common.states)

### 0.10.76

- **Object structure:** list controls use role `state` (`max_total_ac_output`, EV charger mode lists; E1008/E1009)

### 0.10.75

- **Object structure (PR review):** folder → device → channel hierarchy before states (E3009); valid ioBroker roles/types (E1008/E1009/E1011)
- **Dev:** `@alcalzone/release-script` 5.2.1 (E0036)

### 0.10.74

- **TypeScript 6** (W0083); `tsconfig.json` adds mocha types for `tsc --noEmit`
- **CI:** `testing-action-adapter` and `testing-action-deploy` use `@v1` (S3043/S3044); `testing-action-check` stays `@v2.0.0` (no floating `@v2` tag)
- **Tests:** `npm pack` must exclude `CHANGELOG_OLD.md` (S9508)

### 0.10.73

- **README:** removed discouraged GitHub-URL installation section (adapter-check **E6013**)
- **Tests:** `test/io-package-policy.js` guards against GitHub URL install text in README

### 0.10.72

- **Repository checker:** admin i18n synced for all languages (W5604/W5605); `package.json` `os` aligned with Linux CI (E3027)
- **Tests:** `test/i18n-policy.js` and E3027 check in `test/io-package-policy.js`

### 0.10.71

- **Python install:** detects host profile (Linux server, **Home Assistant** ioBroker add-on, **Windows**, container)
- **HA:** venv-first, `get-pip.py` with `--break-system-packages` / `PIP_BREAK_SYSTEM_PACKAGES` for PEP 668
- **Windows:** tries `py -3.13`, `py -3.12`, Program Files paths; parses `--version` (no broken shell `-c` check); adds **`tzdata`** for `Europe/Berlin`
- **Bridge:** uses resolved Python spawn spec (`py -3.12` args) consistently in daemon and one-shot mode
- Deps check: `aiohttp` + `ZoneInfo("Europe/Berlin")` before skipping install

### 0.10.70

- **Repository / CI:** `common.news` capped at 7 npm-published versions; workflow concurrency per ioBroker.example; admin header `size` ≤ 5; automated checks in `test/io-package-policy.js`; `CHANGELOG_OLD.md` excluded from npm package

### 0.10.69

- **Curtailment:** after midnight (Europe/Berlin) phase `inactive` until solarprognose forecast signature changes; then safe `modeAfter` release (no export while waiting)

### 0.10.68

- **Admin:** Python install button at bottom of **Options** tab

### 0.10.67

- **Admin:** removed **Devices** tab and cloud device reload; device filter on **Objects**; **Login cache** tab rightmost

### 0.10.66

- **Admin:** device list and login-cache status via `useNative` responses

### 0.10.65

- **Login cache** tab: backup/restore; auto-backup after first login

### 0.10.64

- **Curtailment admin:** hint text; combiner vs standalone field toggle fix

### 0.10.63

- **Fix** `bat_discharge_power`; admin: terms under **Account**, **Objects** tab, curtailment UI (combiner / solarprognose link)

### 0.10.31

- **Week/month/year statistics:** fetched once per day after **23:00 / 23:15 / 23:30** (Europe/Berlin) on the next detail poll, not every detail refresh

### 0.10.30

- **Week/month statistics:** fetched like Home Assistant (`energy_daily`, `device_sn` empty for site totals); avoids `energy_analysis` 10003 with combiner SN; year still via `energy_analysis`

### 0.10.29

- **Curtailment:** instance setting *Minimum live PV (W)* (`curtailmentMinPvW`, default 50); fix ESLint/Prettier CI failure on 0.10.28

### 0.10.28

- **Curtailment:** manual mode and `ac_output_limit` only when live PV ≥ 50 W — no midnight feed-in from forecast (fixes 4800 W at `livePv=0`)

### 0.10.27

- Period `energy_analysis`: per-call retry on 10003, partial metrics if only some calls fail; uses combiner/solarbank SN; success log only when kWh values exist

### 0.10.26

- **Week/month period stats:** fetched on first detail refresh when only period groups are enabled (not after ~30 min); week interval = every detail refresh (was every 3rd); log line `Period statistics updated (week)`

### 0.10.25

- **Fix:** `curtailment.soc_percent` state object is created on start (was missing since 0.10.16)

### 0.10.24

- **Fix:** `NameError: needs_daily_energy_poll` / missing `PERIOD_YEAR` imports in **0.10.23** (incomplete release)

### 0.10.23

- **Fix:** missing `_update_energy_periods` crashed the bridge daemon (`AttributeError`) → one-shot fallback and extra 429 load
- **Year/month/week only:** skips daily `poll_device_energy` (no “today” entity group); period `energy_analysis` only every Nth detail refresh (year ≈ 8×)
- On 429: no one-shot fallback; period stats back off 30 min; parallel polls skipped

### 0.10.22

- Energy statistics (daily + week/month/year) only on **combiner_box** when a combiner exists; no duplicate states under `system.*` or each `solarbank.*`

### 0.10.21

- **Fix:** `IoBrokerAnkerApiClient` stored no `config` → daemon crashed (`AttributeError`), one-shot bridge fallback, extra API load and **429** rate limits
- Week/month/year `energy_analysis` calls are **rotated** (one period per detail refresh) instead of all three at once

### 0.10.20

- Period energy statistics (week / month / year) use subfolders: `statistics.week.*`, `statistics.month.*`, `statistics.year.*` (instead of flat `week_*` under `statistics.*`)
- Release **0.10.19** tag had no npm deploy (CI lint); install **0.10.20** or newer

### 0.10.18

- Entity groups **Weekly / monthly / yearly energy statistics** (`enableEnergyStatisticsWeek|Month|Year`): kWh totals for current calendar week, month, and year via Anker `energy_analysis` API

### 0.10.17

- **Fix:** Stale `build/` still ran old curtailment code that set **grid export limit** (`grid_export_limit`) to up to **4800 W** on adapter start (App: *Netzeinspeisungs-Leistungsgrenze* → *Anpassen*). Rebuilt `build/` from current TypeScript; tests verify compiled curtailment never touches feed-in controls

### 0.10.16

- Combiner sensor **`total_state_of_charge`**: cloud total or capacity-weighted average of all site solarbanks (poll + ioBroker state)
- Curtailment uses total SOC for `missing_charge_wh`, `max_charge_w`, and `soc_percent`

### 0.10.15

- Curtailment: **`ac_output_limit` via API only** (no MQTT) to avoid station side effects
- Fix SOC handling when combiner had no SOC (`max_charge_w` wrong); ensure `missing_charge_wh` state exists on upgrade

### 0.10.14

- Curtailment: **only** manual mode + **`ac_output_limit`** (no `grid_export_limit`, `allow_grid_export`, home load preset, AC charge limit)
- New state `curtailment.missing_charge_wh`; active phase: export = live PV − calculated max charge

### 0.10.12

- Curtailment combiner: export via **`ac_output_limit`** (`max_load`); home load preset 0 W (superseded by 0.10.14+)

### 0.10.11

- Curtailment: prefer **`system.{siteId}.sensors.total_pv_power`** for live PV

### 0.10.10

- Curtailment combiner: export via `set_output_power` (later replaced); 4800 W cap; more PV sensors for `live_pv_w`

### 0.10.9

- Curtailment active phase: AC output = full PV (intermediate behaviour; refined in 0.10.14+)

### 0.10.8

- Curtailment: **before** = instant export = live PV; **active** = slow battery charge + export surplus

### 0.10.7

- Curtailment: export limit follows live PV; updates when generation sensors change

### 0.10.6

- Curtailment: manual mode, no charge, export limit from hourly forecast (also before curtailment window)

### 0.10.5

- Curtailment: read [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) forecast (kW → W, path `11h.power`)

### 0.10.4

- Curtailment Admin: combiner checkbox, device ID + solarbank type (standalone) or 4 slots with “none” (combiner); no usage-mode change before curtailment window

### 0.10.3

- CI: curtailment unit tests use Mocha/Chai (fixes adapter-check lint)

### 0.10.2

- Curtailment AC limits: standalone 800 W; combiner per unit SB2 1000, SB3 1200, SB4 2500 W

### 0.10.1

- Curtailment: Combiner limit = sum of per-unit profiles (max 4 mixed solarbanks)

### 0.10.0

- Optional **curtailment avoidance** via solarprognose forecast (Admin tab, `curtailment.*` states)

### 0.9.9

- `package.json` keyword `ioBroker`; entity group headers with schema `size` property

### 0.9.8

- Admin UI: all option/entity fields with lg/xl breakpoints; CI release fix

### 0.9.7

- Adapter-check: npm news sync, admin responsive layout, README copyright, npm package excludes Python cache

### 0.9.6

- Adapter-check compliance: Node 22+, admin UI sizes, compact-mode Python install, dependabot

### 0.9.5

- Admin warning before **Clear Anker login cache**; log after clear

### 0.9.4

- Log exact `authcache` path when login cache file is missing

### 0.9.3

- **Fix:** Valid `authcache` no longer treated as failed login after restart (captcha 100032)

### 0.9.2

- Keep `authcache` on re-auth; reload token on 401 before forced login

### 0.9.1

- Captcha error 100032 mapping and README troubleshooting

### 0.9.0

- Configurable **entity groups** (HA-style); API scope follows enabled groups

### 0.8.1

- Fix Python bridge `ApiCategories.device_parm` crash

### 0.8.0

- Daily energy statistics under `statistics.*`

### 0.7.0

- Usage mode `preset_usage_mode`, AC fast charge switch

### 0.6.0

- Persistent bridge daemon, HA-aligned poll, multisystem controls, rate-limit fixes (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.6.1–0.6.5)

### 0.5.0

- Python auto-install, device selection, staggered polling, repository rename (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.2.0–0.4.2)

Older release notes: [CHANGELOG_OLD.md](CHANGELOG_OLD.md) and git history.

---

## Publishing (npm & ioBroker catalog)

**npm:** Release via git tag (`v*`) and CI deploy after [adapter check](https://adaptercheck.iobroker.in/) is green. Publishing uses **npm trusted publishing** (OIDC from GitHub Actions — no long-lived npm token). Classic automation tokens are deprecated by npm from **January 2027**; this adapter is already on trusted publishing. Register in [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) once the package is on npm.

**Before each release** (enforced by `npm run test:package` → `test/io-package-policy.js`):

1. Bump `version` in `package.json` and `io-package.json` (must match).
2. Add a `### x.y.z` section to this README changelog (E6006).
3. Add **one** new `common.news` entry for that version; keep **at most 7** news keys — only versions already on npm (except the version you are about to publish). Move removed text to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).
4. Admin `jsonConfig.json`: header `size` must be **≤ 5** (use `5` for smallest heading).
5. Do not add root files to npm `files` unless needed (`CHANGELOG_OLD.md` stays out of the package).
6. `package.json` `os` must match the OS matrix in `test-and-release.yml` (E3027). Keep admin `i18n/*.json` in sync with `en.json` (W5604/W5605).

---

## License

Copyright (c) 2026 MatthiasUlrich1 info@my-smart-home-support.de

MIT — see [LICENSE](LICENSE)
