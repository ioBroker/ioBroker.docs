![Logo](admin/remko.png)

# ioBroker.remko

[![NPM version](https://img.shields.io/npm/v/iobroker.remko.svg)](https://www.npmjs.com/package/iobroker.remko)
[![Downloads](https://img.shields.io/npm/dm/iobroker.remko.svg)](https://www.npmjs.com/package/iobroker.remko)
![Number of Installations](https://iobroker.live/badges/remko-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/remko-stable.svg)

[![Donate](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)](https://paypal.me/dieterstoppel)

**Tests:** ![Test and Release](https://github.com/mrdimixx/ioBroker.remko/workflows/Test%20and%20Release/badge.svg)

## REMKO heat pump adapter for ioBroker

Reads and controls **REMKO heat pumps with Smart-Web / Smart-Control** (firmware 4.26 and newer) locally via MQTT. No cloud and no additional MQTT broker needed.

Tested with: REMKO WKF 100, Smart-Web firmware 4.28. Feedback on other models (WKF, WSP, LWM, KWT …) is very welcome – please open an issue.

Manufacturer: [REMKO GmbH & Co. KG](https://www.remko.de)

> **Disclaimer:** This project is not affiliated with, endorsed by or supported by REMKO GmbH & Co. KG. REMKO is a trademark of its respective owner. Use at your own risk.

## How it works

The Smart-Control runs its own MQTT broker (WebSocket port 9001, which is also used by the web UI, and TCP port 1883).
On startup the adapter reads everything it needs **directly from the web UI of the heat pump**:

| Source | Content |
|---|---|
| `/js/smt.min.js` | firmware version → topic (e.g. `V04P28/SMTID`), MQTT credentials |
| `/json/smt18.json` + `/json/smtmain.json` | complete register database (~2,150 registers): type, range, decimals, unit, texts, menu tree, display conditions |

No register is hard-coded – other models and firmware versions bring their own definitions.

Protocol:

- read: `CLIENT2HOST` ← `{"FORCE_RESPONSE":true,"query_list":[1082,5039,…],"CLIENT_ID":"SMT123I0000000000000000"}`
- answer: `HOST2CLIENT` → `{"values":{"1082":"01C2","5039":"01DC",…}}` (big-endian hex, scaled according to the register database)
- write: the same request with `"values":{"1082":"01E0"}`

## Configuration

| Option | Description |
|---|---|
| IP address | IP address of the Smart-Web / Smart-Control |
| Transport / port | WebSocket 9001 (default, like the web UI) or MQTT TCP 1883 |
| MQTT password / topic | leave empty – read automatically from the web UI |
| Fast query / full refresh | interval of the fast query (overview values) and of the full refresh of all registers |
| Which data points | like the web UI (user, status, overview) or additionally service / expert / commissioning |
| Writable registers | off, user menu (recommended) or all parameters (expert) |

## Objects

The adapter evaluates the **display conditions of the web UI** (e.g. "solar only if a solar system is enabled"), so only data points that exist on your installation are created. The structure follows the menu of the controller:

- `remko.0.information.<area>.<no>` – user → information (e.g. `information.domestic_hot_water.5039`)
- `remko.0.settings.<area>.<no>` – user → settings (e.g. `settings.domestic_hot_water.1082`)
- `remko.0.status.<no>` – status page
- `remko.0.overview…`, `remko.0.homescreen…` – basic display, plus values that are always read but have no menu entry of their own
- `remko.0.refrigerant_circuit.<no>` – refrigerant circuit as shown in the "heat pump" scheme of the web UI (hot gas 5146, suction gas 5612, liquid 5139, evaporator/register 5200, expansion valve 5615, 4-way valve 5136); always read in the fast cycle, independent of the menu level
- optional `service…`, `expert…`, `commissioning…`
- `remko.0.general.<no>` / `remko.0.additional.<no>` – values without menu / all other values (option "show all")

Folder ids are English: they are derived from the English menu texts of the controller (e.g. `settings`, `domestic_hot_water`, `meter_readings`). Only if the controller has no English text for a menu, the German text is used.

The register number is always the last part of the id. Names, units, min/max and enumerations (`common.states`) come from the heat pump. Names and enumeration texts are translated where the controller delivers English texts; otherwise the text is shown exactly as received from the device.

Important registers (WKF 100):

| No | Meaning |
|---|---|
| 1079 | DHW mode (0 comfort, 1 eco, 2 solar/PV only, 3 off) |
| 1082 | DHW setpoint |
| 1951 / 1088 | room climate mode |
| 1893 / 1894 | absence / party |
| 1946 | colder / warmer |
| 5693 | 1x DHW heating (button) |
| 1269 / 1270 | DHW setpoint SG-Ready state 3 / 4 |
| 1902 / 1258 | heating setpoint SG-Ready state 3 / 4 |
| 2142, 1719–1722, 1679, 2164 | PV self-consumption / influence |
| 5001 | current operating mode |
| 5032 / 5039 / 5132 / 5581 | outdoor / DHW actual / flow / return temperature |
| 5320 / 5321 | electrical / thermal power |
| 5105 / 5119 | electrical / thermal energy |
| 5359 / 5565 | PV power / PV yield (from the heat pump's meter input) |
| 5174 / 5572 | utility lock / remaining lock time |

### Write protection

- **Off**: read only
- **User menu** (default): only registers that can also be changed in the user menu of the controller. Network, password and installation registers are always locked. Actions: only "1x DHW heating" and "reset fault".
- **All parameters**: expert mode – also service/installation values and critical actions (update, restart, reset). Use with care!

Values outside the allowed range are rejected by the adapter.

## Test without installation

```
node tools/probe.js <ip-of-heat-pump>                  # read only
node tools/probe.js <ip-of-heat-pump> --write 1082=46  # write one value
```

## Donate

If you like this adapter and want to support its development, you can buy me a coffee:

[![Donate](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)](https://paypal.me/dieterstoppel)

## Credits

Protocol knowledge partly based on [Altrec/remko_mqtt-ha](https://github.com/Altrec/remko_mqtt-ha), [fuchsi585/remko_http](https://github.com/fuchsi585/remko_http) and [Christoph-87/remko-smartweb-ha](https://github.com/Christoph-87/remko-smartweb-ha).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.2 (2026-11-03)
- (mrdimixx) objects are no longer deleted while the adapter is running: values that are currently hidden by a display condition (e.g. register did not answer yet, operating mode changed) keep their object and user settings and are still updated. Only on start, really obsolete objects are removed (renamed ids, registers that cannot appear with the current settings, empty folders)
- (mrdimixx) errors while processing MQTT messages are logged instead of restarting the adapter

### 0.6.1 (2026-10-24)
- (mrdimixx) **Breaking:** folder ids below the menu of the controller are now derived from its English menu texts (e.g. `einstellungen.warmwasser` → `settings.domestic_hot_water`, `information.zaehlerstaende` → `information.meter_readings`, `uebersicht` → `overview`). Old objects are removed automatically; user settings (e.g. history, SourceAnalytix) are taken over by register number. Please adapt scripts and visualisations.
- (mrdimixx) folder names are always translation objects (German controller text as fallback if there is no English text)
- (mrdimixx) timer intervals are limited to the maximum supported by Node.js
- (mrdimixx) writable energy registers get role `level`
- (mrdimixx) unused setting `httpPort` removed

### 0.6.0 (2026-10-22)
- (mrdimixx) **Breaking:** folder ids defined by the adapter are now English: `kaeltekreis` → `refrigerant_circuit`, `uebersicht` (values without menu) → `overview`, `allgemein` → `general`, `weitere` → `additional`, `experte` → `expert`, `inbetriebnahme` → `commissioning`. Old objects are removed automatically, user settings (e.g. history) are taken over. Please adapt scripts and visualisations.
- (mrdimixx) folder names and enumeration texts (`common.states`) are translated; English names never fall back to German texts
- (mrdimixx) `tools/probe.js` output is English
- (mrdimixx) cache meta object is created with `setObjectNotExistsAsync`
- (mrdimixx) dependencies updated

### 0.5.1 (2026-10-08)
- (mrdimixx) read-only values no longer get min/max (fixes warnings like `remko.0.status.5026 has value 1082 greater than max 999`)

### 0.5.0 (2026-10-08)
- (mrdimixx) all values are re-published during the full refresh (fresh timestamp), so visualisations started later also get rarely changing settings
- (mrdimixx) new folder `kaeltekreis` with the refrigerant circuit values of the web UI scheme (hot gas, suction gas, liquid, evaporator temperature, expansion valve, 4-way valve), read in the fast cycle

### 0.4.0 (2026-09-30)
- (mrdimixx) object structure fixed (ioBroker object checker): only valid roles (`value`/`level` instead of `value.mode`/`level.mode`), writable power settings use `level`
- (mrdimixx) actions are write-only buttons (`read: false`); actions that are not allowed are no longer created
- (mrdimixx) object names in all ioBroker languages (texts from the controller, English as fallback)
- (mrdimixx) existing objects are replaced on update so outdated attributes disappear (user settings like history are kept)

### 0.3.3 (2026-09-30)
- (mrdimixx) registers containing secrets (service/expert passwords, session id, unlock code, SMT-ID) are no longer read or created; existing objects are removed automatically

### 0.3.2 (2026-09-28)
- (mrdimixx) PayPal donation link added (README, GitHub sponsor button, npm funding)

### 0.3.1 (2026-09-28)
- (mrdimixx) release via GitHub Actions (npm trusted publishing with provenance)

### 0.3.0 (2026-09-28)
- (mrdimixx) prepared for the ioBroker repository: English README, translations, tests, GitHub Actions, npm deployment
- (mrdimixx) log messages in English

### 0.2.1 (2026-09-28)
- (mrdimixx) actions (e.g. 5693 "1x DHW heating", 2126 "reset fault") as buttons; critical actions only in write mode "all"
- (mrdimixx) role of the coefficient of performance fixed

### 0.2.0 (2026-09-28)
- (mrdimixx) only registers that are also shown by the web UI (display conditions)
- (mrdimixx) objects structured by menu; old 0.1 objects are removed automatically

Older changes can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 mrdimixx <stoppeld@gmx.de>

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