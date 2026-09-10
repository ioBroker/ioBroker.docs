---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"Luxtronik 2 Controller\\n\\nAdapter to control Luxtronik 2.x heat pumps."},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
---
<img src="admin/luxtronik2-controller.png" alt="Projekt Logo" width="20%">

# ioBroker.luxtronik2-controller

[![NPM version](https://img.shields.io/npm/v/iobroker.luxtronik2-controller.svg)](https://www.npmjs.com/package/iobroker.luxtronik2-controller)
[![Downloads](https://img.shields.io/npm/dm/iobroker.luxtronik2-controller.svg)](https://www.npmjs.com/package/iobroker.luxtronik2-controller)

[![NPM](https://nodei.co/npm/iobroker.luxtronik2-controller.png?downloads=true)](https://nodei.co/npm/iobroker.luxtronik2-controller/)

**Tests:** ![Test and Release](https://github.com/TbsJah/ioBroker.luxtronik2-controller/workflows/Test%20and%20Release/badge.svg)

## luxtronik2-controller adapter for ioBroker

This ioBroker adapter enables the local control and monitoring of heat pumps with [Luxtronik 2.x controllers](https://www.alpha-innotec.com/en/products/accessories/control/luxtronik) (e.g., Alpha Innotec, Novelan). The adapter is written entirely in TypeScript.

## Acknowledgements & History

This project builds upon the preliminary work of existing open-source projects. Special thanks go to:

[Bouni](https://github.com/bouni/luxtronik-2) Whose pioneering work and code developments form the essential foundation for communication with Luxtronik controllers.

[Coolchip:](https://github.com/coolchip/luxtronik2) For the fundamental reverse engineering of the Luxtronik network protocol.

[UncleSamSwiss:](https://github.com/UncleSamSwiss/ioBroker.luxtronik2) For the original ioBroker adapter.

Innovations in this version: The luxtronik2-controller natively integrates TCP communication (Port 8888 / 8889) and does not rely on external libraries. Additionally, controlling macros, a logic for compressor protection, and automated datapoint management were implemented.

## Features

- Native TCP communication: Direct connection to the heat pump without additional overhead.

- Compressor protection (Cycle optimization): Combining heating and domestic hot water cycles to reduce compressor starts.

- Integrated actions (Macros): Predefined control logics for forced heating, hot water requests, and the circulation pump (ZIP) incl. automatic fallback to default values.

- Custom datapoints: Measured values (Index 3004) and parameters (Index 3003) can be added via the adapter configuration. Unix timestamps are formatted automatically.

- Automatic object management: Deselected or deleted datapoints and empty folder structures are automatically removed from ioBroker upon an adapter restart.

- Notification system: Heat pump error codes can be sent directly to Telegram or the ioBroker notification system.

- Motion detector coupling: Option for demand-driven activation of the circulation pump via existing ioBroker motion sensors.

## ⚠️ Warning

Some settings provided by this integration can affect the performance of your heat pump. Misconfigurations can cause the controller to enter a fault state, which requires a manual on-site reset.

This project aims to protect your heat pump by restricting the configuration options to safe values. However, no guarantees can be made. Please be careful, consult your Luxtronik manual, and do not change any settings that you do not fully understand.

## 🔧 Compatibility

The integration allows you to monitor and control heat pumps with a Luxtronik2 controller. It works locally without internet access.
It was and is being tested with an LWD50A (LD5) from Alpha Innotec.

## ⚠️ Disclaimer / Haftungsausschluss ⚠️

Dieses Projekt steht in keinerlei Verbindung zu Alpha Innotec, Novelan, ait-deutschland GmbH oder anderen Herstellern. Es handelt sich um ein privates Open-Source-Projekt, das in der Freizeit entwickelt und gepflegt wird. Die Nutzung des Adapters geschieht auf eigene Gefahr.

_This project is not affiliated with Alpha Innotec, Novelan, ait-deutschland GmbH, or any other company. It is a personal project that is maintained in spare time. Use at your own risk._

## Reporting Bugs & Contributing

Bug reports, compatibility notes for specific firmware versions, or feature requests can be submitted via the issue tracker in the [GitHub-Repository](https://github.com/TbsJah/ioBroker.luxtronik2-controller/issues).

## Information

[Info Deutsch](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md)

[Info English](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md)

<img src="documentation/Bilder/Haupteinstellung.png" alt="Haupteinstellung" width="100%">
<img src="documentation/Bilder/Objekte.png" alt="Objekte" width="100%">
<img src="documentation/Bilder/Datenpunkte.png" alt="Datenpunkte" width="100%">
<img src="documentation/Bilder/Benachrichtigung.png" alt="Benachrichtigung" width="100%">
<img src="documentation/Bilder/EigeneWerte.png" alt="EigeneWerte" width="100%">
<img src="documentation/Bilder/Fehlermeldung.png" alt="Fehlermeldung" width="100%">
<img src="documentation/Bilder/Bewegungssensoren.png" alt="Bewegungssensoren" width="100%">

## Changelog

// ### **WORK IN PROGRESS**
### 0.7.3 (2026-09-07)

**Bugfixes**
-(Fixed) Timer Table Register Conflict: Resolved conflicting Luxtronik register IDs for Domestic Hot Water (DHW) Monday–Sunday schedules (WW_MoSo_Start1 to End5). These were previously mapped to registers 507–516 (colliding with Circulation timer registers) and have now been corrected to registers 406–415.

-(Fixed) Time-String Conversion on State Change: Fixed a parsing bug where manual updates to time strings (HH:MM / HH:MM:SS) on states marked with isDurationFormat or time-related roles were passed directly as strings instead of converting to seconds since midnight, preventing user-entered schedule values from persisting in the controller.

### 0.7.2 (2026-09-07)

**Bugfixes**

- (Fixed) Unintended Configuration Overwrites: Fixed a critical architectural flaw where the adapter blindly forced default values (e.g., hot water target temperature, heating curve) to the heat pump on every startup. The adapter is now 100% passive (read-only) upon installation until features are explicitly enabled.

- (Fixed) Strict Opt-In Logic: All internal condition checks for background automations (cycle optimization, ZIP optimization, idle resets) were refactored to strict opt-in logic (=== true), preventing unintended actions when settings have never been saved.

- (Fixed) Live Toggle for Cycle Optimization: Fixed an issue where the ioBroker switch Actions.Regelung_Aktiv was ignored during runtime. The optimization loop now evaluates this switch dynamically, allowing users to toggle the feature live via their dashboard.

- (Fixed) Hardware ZIP Timer Disable: Fixed a bug where a mismatched configuration key (zip_hardware_timer_disable instead of zip_lWP_aktiv) prevented the adapter from correctly disabling the hardware circulation pump timer for flash memory protection.

- (Fixed) "Heating after hot water" Reset: Restored missing logic that properly resets the "Heating after water" status back to false at the end of a cycle, preventing the system from getting stuck in this mode.

**Features & Change**

- (Changed) Forced DHW Safety Limit: Reduced the internal safety limit for temporary hot water target adjustments during forced DHW runs from 75°C to 70°C to better protect the system's high-pressure switch.

### 0.7.1 (2026-09-07)

**Bugfixes**

- (Fixed) Status Display: Fixed a logical evaluation bug where the operating state "Heating" (Code 0) was incorrectly overwritten and displayed as "No demand" (Code 5). Thanks to @michiproep for reporting!

- (Fixed) Temperature Values: Fixed a related issue where temperature readings of exactly 0 °C (e.g., average temperature, return target temperature, cooling release) were incorrectly replaced by internal fallback values (e.g., 1.5 °C).

### 0.7.0 (2026-09-04)

**Features & Changes**

- **(Changed) Cycle Optimization & Forced Hot Water**: To force a hot water cycle, the adapter now temporarily increases the hot water target temperature instead of modifying the hysteresis. This crucial safety improvement allows users to manually revert changes directly on the heat pump display without needing an installer password.
- **(Changed) Disable default**: Disabled reset to default values in idle mode by default on initial start
- **(Removed) Hysteresis Protection**: Removed all dynamic manipulations of the hot water hysteresis (e.g., during idle or active DHW cycles) to ensure installer-level settings remain untouched.
- **(UI/Docs)**: Added detailed explanations and trigger rules for "Intelligent Cycle Optimization" and "Heating after hot water" directly to the admin configuration page.

**Bugfixes**

- Fixed adapter checker warning [W0066] by downgrading `@types/node` dependency to v22

### 0.6.6 (2026-08-31)

- review / fix findings reported by claude based checker.
- Extended minimum limit for `temperature_outdoor_min` from -20°C to -25°C
- Lowered minimum allowed value for `heating_curve_parallel_offset` (base point) from 20°C to 15°C
- Disabled dynamic cycle optimization / regulation by default on initial start

## License

MIT License

Copyright (c) 2026 TbsJah <github.tbsjah@googlemail.com>

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