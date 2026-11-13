---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ocpp.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ocpp.svg
BADGE-Number of Installations: https://iobroker.live/badges/ocpp-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/ocpp-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ocpp.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg
---
![Logo](../../admin/ocpp.png)
# ioBroker.ocpp

[![NPM version](https://img.shields.io/npm/v/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
![Number of Installations](https://iobroker.live/badges/ocpp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ocpp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ocpp.png?downloads=true)](https://nodei.co/npm/iobroker.ocpp/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg)

## Disclaimer
The developers of this module are in no way endorsed by or affiliated with Open Charge Alliance,
or any associated subsidiaries, logos or trademarks.

## OCPP adapter for ioBroker
Adapter to connect and control OCPP 1.6-J compatible wallboxes and EV charging stations via a local WebSocket server.

## Documentation
- 🇺🇸 [Documentation](/#/adapters/ocpp)
- 🇩🇪 [Dokumentation](https://github.com/iobroker-community-adapters/ioBroker.ocpp/blob/main/docs/de/README.md)

## Configuration
- **Server port:** TCP port the OCPP WebSocket server listens on (default: `9220`). Configure your wallbox to connect to `ws://<iobroker-ip>:9220/<ChargePointId>`.
- **Remove leading slash (`/`) from Charge Point IDs (`stripLeadingSlash`):** Enable for new installations or Node-RED compatibility so device objects are created as `ocpp.0.EVB-P123456` instead of `ocpp.0./EVB-P123456` (or `ocpp.0.http://192_168_178_80:9220/EVB-P123456` for wallboxes sending an absolute URL during the WebSocket handshake). Leave disabled to preserve existing object IDs.
- **Authentication:** Optional HTTP Basic Authentication (`username` and `password`) required during the WebSocket handshake.

## Smart Charging & PV Surplus Charging
- **Requirements & Wallbox Compatibility:**
  - Dynamic charge limiting via `chargeLimit` requires the wallbox to support the optional OCPP 1.6 **SmartCharging** feature profile (supported by most modern wallboxes like EVBox, ABL, Alfen, Easee, Heidelberg, Mennekes, Webasto, etc.).
  - The adapter inspects the wallbox's `SupportedFeatureProfiles` on connection. If `SmartCharging` is not supported by the wallbox firmware, `chargeLimit` states are automatically omitted to prevent confusion. (For such wallboxes, charge limits can often still be configured via hardware/vendor keys under `configuration.<key>`, e.g. `evb_MaximumStationCurrent` on EVBox).
- **Dynamic Control During Active Charging:**
  - Changing `chargeLimit` while a vehicle is actively charging sends an OCPP `SetChargingProfile` with `chargingProfilePurpose: 'TxProfile'` targeted directly at the active `transactionId`.
  - The wallbox modulates the PWM duty cycle on the Type 2 Control Pilot (CP) pin in real time (e.g. 10% for 6 A, ~26.7% for 16 A) without opening contactors or interrupting the session.
  - The vehicle's onboard charger (OBC) ramps its charging current up or down within 1–5 seconds according to IEC 61851.
- **Clearing Limits (`null`):**
  - Setting `chargeLimit` to `null` (or `0`) sends `ClearChargingProfile` to the charge point to remove any active limits.
- **Vendor Configuration Alternative (`configuration.evb_MaximumStationCurrent` on EVBox):**
  - While `chargeLimit` is the universal, cross-vendor OCPP standard, smart wallboxes often provide vendor-specific configuration keys such as `configuration.evb_MaximumStationCurrent` (EVBox Elvi/BusinessLine).
  - **Why this key is often preferred for EVBox stations:**
    1. **Non-volatile Persistence:** Values are written to the station's internal non-volatile memory (EEPROM/Flash). Even after power cuts, wallbox reboots, or server restarts, the station safely retains the configured maximum current limit.
    2. **Finer Resolution (Deci-Amperes):** Many wallboxes process this value in deci-Amperes (dA): e.g. `65` (6.5 A), `72` (7.2 A), or `80` (8.0 A). This allows ultra-smooth solar surplus tracking in fine ~100–200 W increments rather than coarse 1 A (~690 W 3-phase) steps.
    3. **Seamless Dynamic Adjustment:** Changing this key responds with `Accepted` immediately; the station updates its PWM signal within 1–3 seconds in real time without requiring a reboot or interrupting an active charge.
- **Recommended Unit (`chargeLimitType`):**
  - It is strongly recommended to keep `chargeLimitType` set to `A` (Amperes).
  > **Note on IEC 61851 Minimum Current:** According to EV charging standards (IEC 61851), standard AC charging requires a minimum current of **6 A**.
  >
  > - 1-phase minimum: ~1,380 W (230 V x 6 A)
  > - 3-phase minimum: ~4,140 W (3 x 230 V x 6 A)
  >
  > If `chargeLimitType` is set to `W` with values below these limits (e.g. 1000 W), the resulting current drops below 6 A, which may cause wallboxes to reject the profile or abort charging.

## Credits
This adapter would not have been possible without the great work of @foxriver76 (https://github.com/foxriver76), who developed former releases of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-11-09)
* (meistermopper) fix repochecker findings: nogit, info.connection role, and unused deps (#117)
* (meistermopper) align workflow concurrency and timer wrappers with repochecker (#121)
* (meistermopper) fix TxProfile schedule kind and add ClearChargingProfile on null chargeLimit

### 1.0.0-alpha.4 (2026-11-09)
* (meistermopper) migrate to ESLint 9 and @iobroker/eslint-config (#33)
* (meistermopper) replace legacy `@ampeco/ocpp-eliftech` with native TypeScript OCPP 1.6J server
* (meistermopper) fix SmartCharging removal when `GetConfigurationMaxKeys` truncates response (#65)
* (meistermopper) use `TxProfile` for `RemoteStartTransaction` and track `transactionId` (#24, #65)
* (meistermopper) prevent zombie sockets on reconnect (#20) and serialize outgoing OCPP commands
* (meistermopper) support `DiagnosticsStatusNotification` and `FirmwareStatusNotification` (#32)
* (meistermopper) add `stripLeadingSlash` option and responsive `jsonConfig` with i18n (#30, #60)

### 1.0.0-alpha.3 (2026-11-08)
- (mcm1957) Adapter has been migrated to iobroker-communities organisation
- (copilot) Adapter requires js-controller >= 7.2.5 now
- (copilot) Adapter requires admin >= 8.3.5 now
- (copilot) Adapter requires Node.js >= 22.19.0 now
- (mcm1957) Dependencies have been updated

### 0.12.5 (2023-02-09)
* (foxriver76) revert changes of 0.12.4

### 0.12.3 (2023-02-07)
* (foxriver76) allow deactivating `numberPhases` by setting `null

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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