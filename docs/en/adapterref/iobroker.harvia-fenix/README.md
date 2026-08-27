<p align="center">
  <img src="admin/harvia.png" alt="Logo" width="100" />
</p>

# ioBroker.harvia-fenix

**[Hier geht es zur deutschen Version der Dokumentation.](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/README_de.md)**

[![Downloads](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)](https://www.npmjs.com/package/iobroker.harvia-fenix)
[![node](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)](https://www.npmjs.com/package/iobroker.harvia-fenix)
[![License](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)](https://github.com/meistermopper/ioBroker.harvia-fenix/issues)
![Number of Installations](https://iobroker.live/badges/harvia-fenix-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/harvia-fenix-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)](https://nodei.co/npm/iobroker.harvia-fenix/)
![Test and Release](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

### An ioBroker adapter to integrate and control your **Harvia Fenix** sauna control unit via the MyHarvia cloud infrastructure.

For more information about Harvia and their sauna control units, please visit the [official Harvia website](https://www.harvia.com).

---

## ⚠️ CRITICAL SAFETY WARNING & DISCLAIMER
**Remote operation of a sauna heater is subject to strict safety regulations!** According to the European safety standard **EN 60335-2-53** in conjunction with **EN 60335-1**, fire protection measures are mandatory for remote control setups. The sauna cabin must be equipped with an approved door sensor or a safety switch-off system. This ensures that the heater cannot be started remotely or via a timer if a flammable object (e.g., a towel) has been left on or near the heater.

* **No Liability:** The developer of this adapter assumes absolutely no responsibility, warranty, or liability for any damages, fires, injuries, or legal issues resulting from the use or misconfiguration of this software. You operate this integration entirely at your own risk.
* **Trademarks:** Harvia and MyHarvia 2 are registered trademarks of Harvia Group. This adapter is an independent, community-driven open-source project and is neither officially endorsed, sponsored, nor supported by Harvia.

---

## Installation
The adapter is available in the official ioBroker repository. You can install it directly via the ioBroker Admin web interface.

### Via ioBroker Admin
1. Open your ioBroker web interface in a browser (e.g. `192.168.1.33:8081`).
2. Click on the **Adapters** tab.
3. Type "harvia-fenix" in the filter.
4. Click on the three dots and then on the "+" symbol of the **Harvia Fenix** adapter to add an instance.

---

## Setup
Additional to the adapter installation you must configure the adapter instance with your MyHarvia account details.

### Prerequisites
1. **Node.js >= 22**
2. A registered account within the official **MyHarvia 2** smartphone application.
3. Your valid login credentials:
   - **Email Address**
   - **Password**

*Note: We recommend setting up a separate account for ioBroker in the Harvia 2 app and using those login credentials in the instance.*

### ioBroker Configuration
1. Open your ioBroker interface in a browser (e.g. `192.168.1.33:8081`).
2. Navigate to Tab **Instances** and click the settings icon of your `harvia-fenix.0` instance.
3. Enter your **Email Address** and **Password** of your MyHarvia account.
4. If you leave the **Device ID** field empty, the adapter will automatically search for devices linked to your account upon startup. It will use the first device it finds as the active unit.
5. Adjust optional parameters: **Poll Interval** (seconds), **Minimum/Maximum Target Temperature Limits** (°C), and **Maximum Heating Duration** (minutes).
6. Click on **Save & Close**.

### Device Configuration & Multi-Device Support

#### Automatic Discovery
If you leave the **Device ID** field in the adapter settings empty, the adapter will automatically search for devices linked to your account upon startup. It will use the first device it finds as the active unit. The detected ID will be printed to the ioBroker log.

#### Manual Device ID
For most users with a single sauna, automatic discovery is sufficient. However, it is recommended to copy the detected ID from the log and paste it into the configuration to ensure a stable connection to the specific hardware.

#### Multiple Saunas
If your MyHarvia account manages multiple control units (e.g. one at home and one in a vacation cottage):
1. Create a separate instance of the adapter for each sauna (e.g. `harvia-fenix.0` and `harvia-fenix.1`).
2. Manually enter the specific **Device ID** for each unit in its respective instance configuration.
This allows you to monitor and control both saunas independently with their own set of datapoints.

### Shared / Guest Accounts & The Partner ID

#### 🟢 Default Scenario (Primary Account / Sauna Owner)
If you configure the adapter using the primary MyHarvia account (the account that initially registered the sauna in the mobile app):
* Leave both **Device ID** and **Partner ID** **empty** in the configuration.
* The adapter will automatically discover and connect to your sauna on startup.

#### 🟡 Shared / Guest Account Scenario (e.g. Dedicated ioBroker Account)
If the sauna was shared from the owner's account to a secondary guest account via the MyHarvia 2 app, Harvia's automatic discovery endpoint returns an empty device list (`{"devices":[]}`) for guest tokens.

In this scenario, you **must manually specify** both the **Device ID** and the **Owner's Partner ID** in the adapter settings:

**The 60-Second Method to Obtain Both IDs:**
1. In the adapter configuration, temporarily enter the login credentials of the **Primary/Owner Account** and click **Save**.
2. Open the ioBroker log. The adapter connects immediately and prints lines containing both IDs:
   * `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ This is your **Device ID**.
   * `Using partner ID from user token: ORG/prod:0:6656` ➡️ This is your **Partner ID** (typically `ORG/prod:0:6656` or `ORG/prod:0:6656:0`).
3. Copy both values.
4. Re-open the configuration, switch back to your **Guest Account** credentials, paste the copied **Device ID** and **Partner ID** into their respective optional fields, and click **Save & Close**.

The guest account can now control the shared sauna directly and reliably!

---

## Compatibility Note
* **Supported:** **Harvia Fenix** control units managed via the **MyHarvia 2** mobile application.
* **NOT Supported:** **Harvia Xenio** series (e.g. Xenio WiFi / CX001WIFI). The Xenio series relies on a legacy hardware ecosystem and uses the older *"MyHarvia for Xenio"* app, which is fundamentally incompatible with the API utilized by this adapter.

---

## Usage
The adapter maps your sauna's cloud states into structured ioBroker datapoints under `harvia-fenix.0.*`.

### Available Datapoints
| Datapoint | Type | Role | Access | Description |
|---|---|---|---|---|
| `info.connection` | boolean | `indicator` | Read-only | Connection state of the adapter to the MyHarvia Cloud. |
| `info.minTemp` | number | `value.temperature` | Read-only | Minimum target temperature limit (`40 °C`). |
| `info.maxTemp` | number | `value.temperature` | Read-only | Maximum target temperature limit (`110 °C`). |
| `info.avgHeatingRate` | number | `value` | Read-only | Learned historical average heating rate in °C per minute (`°C/min`). |
| `info.heatingAnomaly` | boolean | `indicator` | Read-only | Turns `true` if live heating performance drops significantly below historical average. |
| `estimatedHeatingTimeRemaining` | number | `value.interval` | Read-only | Estimated remaining heating time in minutes until target temperature is reached (`min`). |
| `online` | boolean | `indicator.reachable` | Read-only | Connection state of the control unit to the cloud. |
| `doorSafety` | boolean | `indicator.safety` | Read-only | Safety loop status (e.g., `true` if the door is secure / safe to run). |
| `remoteControl` | boolean | `indicator` | Read-only | Remote start readiness status. If `false`, starting the heater remotely (via the adapter) is blocked. |
| `errorMsg` | string | `text` | Read-only | Current error messages or status text from the heater. |
| `heatOn` | boolean | `switch.power` | Read/Write | Main toggle to switch the sauna heater ON (`true`) or OFF (`false`). |
| `heaterPower` | number | `value.power` | Read-only | *Note:* This object is provisioned by the MyHarvia API structure but is currently delivered as `0 kW` (unpopulated). It appears to be reserved for future hardware or app updates. |
| `lightOn` | boolean | `switch.light` | Read/Write | Toggle to switch the integrated sauna lighting ON or OFF. |
| `maxDuration` | number | `level.timer` | Read/Write | Maximum allowed heating duration for the sauna session in minutes (`min`). |
| `panelTemp` | number | `value.temperature` | Read-only | The temperature reading measured at the physical control panel unit. |
| `targetTemp` | number | `level.temperature` | Read/Write | Target temperature setpoint for the sauna cabin (e.g., `90 °C`). |
| `temp` | number | `value.temperature` | Read-only | The current ambient temperature inside the sauna cabin (e.g., `17 °C`). |
| `readyNotified10Min` | boolean | `indicator` | Read-only | Turns `true` when the sauna is approximately 10 minutes away from reaching the target temperature (13°C below target). |
| `targetReachedNotified` | boolean | `indicator` | Read-only | Turns `true` when the sauna has successfully reached the configured target temperature. |
| `totalBathingHours` | number | `value.number` | Read-only | Total historical cumulative hours the sauna has been actively used (`h`). |
| `totalOperatingHours` | number | `value.hours` | Read-only | Total system operational running hours (`h`). |
| `totalSessions` | number | `value.count` | Read-only | Counter for the total number of individual sauna heating sessions executed. |

---

## Intelligent Features & Automations

### 1. Adaptive Heating Prognosis & Anomaly Detection
* **Learned Heating Duration (`estimatedHeatingTimeRemaining` & `info.avgHeatingRate`):**  
  The adapter learns the heating rate of your cabin (°C per minute). During an active session, it blends historical performance with live temperature progression to calculate an accurate remaining heating time.
* **Anomaly Detection (`info.heatingAnomaly`):**  
  If the live heating rate drops below 50% of the historical average after at least 10 minutes of active heating (e.g., sauna door ajar or heater element failure), `info.heatingAnomaly` turns `true` and logs a warning.

### 2. Notifications (Push Triggers)
The adapter automatically calculates the heating progress and provides indicator datapoints specifically designed for triggering push notifications (e.g. via Telegram, Pushover, or Alexa):

```javascript
// Trigger for the 10-minute pre-warning
on({ id: 'harvia-fenix.0.readyNotified10Min', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `🧖 The sauna will reach its target temperature (${targetTemp}°C) in about 10 minutes.` });
});

// Trigger when the sauna is fully ready
on({ id: 'harvia-fenix.0.targetReachedNotified', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `♨️ The sauna has reached the target temperature of ${targetTemp}°C and is ready!` });
});

// Trigger on heating anomaly (e.g. door open)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    sendTo('telegram.0', 'send', { text: '⚠️ Warning: Sauna is heating unusually slowly! Please check door and heater.' });
});
```

*Note: These states will automatically reset to `false` when the heater is turned off or when a new heating session starts.*

---

## Troubleshooting

### Common API Errors & Status Messages in `errorMsg`

* **`Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.`**
  - **Cause:** The European safety standard requires that remote starting can only be activated if the safety loop/door sensor is closed and remote start has been physically armed at the sauna panel.
  - **Solution:** Close the sauna door and press the **Remote Start / Fernstart** button on your physical Harvia control panel. The remote icon on the screen must be active. Once done, you can control the sauna via the adapter.
* **`Cloud lock: Device busy, command discarded.` (Logged as debug)**
  - **Cause:** Harvia's API rate-limits commands if they are sent in rapid succession (e.g. rapid clicking in the UI) to protect the hardware.
  - **Solution:** Wait a few seconds between commands. The adapter automatically discards commands that are sent too quickly to prevent API blocking.

---

## To-Do
* [ ] Await official permission from Harvia to use their original logo
* [ ] Program automatic cold beverage reminder timed for the post-sauna cooldown 🍺❄️
* [ ] Design AI-powered robotic towel-waving assistant for the ultimate Aufguss 🧖‍♂️🪣

---

## Changelog
### **WORK IN PROGRESS**
* (meistermopper) Update @alcalzone/release-script-plugin-license to 5.2.2

### 0.4.0 (2026-08-13)
* (meistermopper) Add adaptive heating duration prognosis and anomaly detection
* (meistermopper) Add dev script shortcut for dev-server watch in package.json
* (meistermopper) Clarify Partner ID and guest account setup instructions
* (meistermopper) Document adaptive heating prognosis and anomaly detection
* (meistermopper) Add strict privacy and anonymization rule to AGENTS.md
* (meistermopper) Clean up To-Do list and add fun future wishlist items

### 0.3.2 (2026-08-11)
* (meistermopper) Use absolute GitHub URLs for language switching links in README files
* (meistermopper) Remove latest repository and translation badges from README files
* (meistermopper) Mark stable repository addition as completed in To-Do list
* (meistermopper) Remove direct npm installation instructions from README files
* (dependabot) Bump axios from 1.18.1 to 1.19.0
* (meistermopper) Center adapter logo in README files
* (meistermopper) Add Weblate translation status badge to README files
* (meistermopper) Add npm run translate step to release-before-commit script
* (meistermopper) Replace static latest badge with dynamic iobroker.live badge

### 0.3.1 (2026-08-04)
* (meistermopper) Update GitHub Actions in auto-translate workflow to v7
* (meistermopper) Add Git commit and push authorization rule to AGENTS.md
* (meistermopper) Add auto-translate workflow for automatic i18n translations
* (meistermopper) Add missing CHANGELOG_OLD link to README files
* (meistermopper) Fix untranslated news entries for 0.2.8 in io-package.json
* (meistermopper) Add common.news translation rule to AGENTS.md
* (meistermopper) Remove redundant npm badge and move Test and Release badge after NPM banner

### 0.3.0 (2026-07-29)
* (meistermopper) Add configurable min/max temperature limits and maxDuration in Admin UI

### 0.2.8 (2026-07-26)
* (meistermopper) Note latest repository availability in README installation section
* (meistermopper) Fix doorSafety role to sensor.door for repochecker compliance
* (meistermopper) Add missing CHANGELOG_OLD link to README.md (repochecker S6022)
* (meistermopper) Fix changelog rotation in README_de.md to enforce 5 entries limit

[Older changelog entries](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>
