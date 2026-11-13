---
chapters: {"pages":{"en/adapterref/iobroker.bluelink/README.md":{"title":{"en":"ioBroker.bluelink"},"content":"en/adapterref/iobroker.bluelink/README.md"},"en/adapterref/iobroker.bluelink/README_de.md":{"title":{"en":"ioBroker.bluelink (Deutsche Dokumentation)"},"content":"en/adapterref/iobroker.bluelink/README_de.md"}}}
---
![Logo](admin/bluelink.png)
# ioBroker.bluelink

[![NPM version](https://img.shields.io/npm/v/iobroker.bluelink.svg)](https://www.npmjs.com/package/iobroker.bluelink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bluelink.svg)](https://www.npmjs.com/package/iobroker.bluelink)
![Number of Installations (latest)](https://iobroker.live/badges/bluelink-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/bluelink-stable.svg)
![Test and Release](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)](https://nodei.co/npm/iobroker.bluelink/)

**[Deutsche Dokumentation (README_de.md)](/#/docs/adapterref/iobroker.bluelink/README_de.md)**

---

## Overview

**ioBroker.bluelink** connects **Hyundai (Bluelink)** and **Kia (Kia Connect / UVO)** vehicles to ioBroker. It supports electric vehicles (EV), plug-in hybrids / hybrids (PHEV/HEV), and combustion engine vehicles (ICE), including modern ccNC generation models (e.g., Kia EV3, EV6, EV9, Hyundai IONIQ 5, IONIQ 6, Kona).

### Key Features
- **100% Automated Headless Login (EU OneApp / CCI):** Direct login using your account email and password — **no manual token generation, no external scripts, no browser interaction, no QR code, and no Captcha required**.
- **Comprehensive Telemetry:** State of Charge (HV battery & 12V auxiliary battery), State of Health (SoH), charging status, estimated range (DTE), odometer, door/window/trunk/hood status, climate state, tire pressure warnings, and driving history.
- **Full Remote Control:** Lock/unlock doors, start/stop climate control (including temperature, defrost, and heating), start/stop charging, and set AC/DC charge limits.
- **Location & Reverse Geocoding:** GPS coordinates (`lat`, `lon`, `speed`), Google Maps link, and optional street address resolution via OpenStreetMap.
- **12V Battery Protection:** Polls the cloud cache by default without waking up the vehicle, combined with configurable 12V battery threshold monitoring.

---

## Authentication & Initial Setup (EU Hyundai & Kia)

### 1. Setup in the Adapter Configuration
You **do not** need to generate or enter any token manually:

1. Select your **Brand** (`Kia` or `Hyundai`), **Motor** type (`EV`, `PHEV/MHEV`, or `Diesel/Benzin`), and **App Language**.
2. Enter your **Username** (account email address), **Password**, and your 4-digit **PIN** (used for remote vehicle commands).
3. Save and close the instance configuration.

Upon starting, the adapter automatically performs the headless **OneApp / Connected Car Infrastructure (CCI)** authentication and manages the encrypted session tokens internally.

> **Important:** Do **not** run external token generator scripts (such as `bluelink_refresh_token`). Those scripts rely on the deprecated legacy OAuth flow, which is blocked by Hyundai/Kia's firewall (`HTTP 403 Forbidden`) and can temporarily block or rate-limit your home IP address.

### 2. How the Automated Authentication Works
Since Hyundai and Kia permanently disabled the legacy European OAuth login endpoint, the adapter uses its own integrated **OneApp / CCI Token Manager** (`lib/tokenManager.js`):

1. **Session Initialization:** Initializes a native mobile session on `idpconnect-eu.kia.com` / `idpconnect-eu.hyundai.com` using the OneApp client ID without following external web-browser redirects (which prevents browser Captcha / QR-code prompts).
2. **RSA Password Encryption:** Fetches the server's current RSA public key (`/auth/api/v1/accounts/certs`) and encrypts your password locally using RSA-PKCS1v1.5.
3. **Headless Sign-In:** Submits the encrypted credentials to `/auth/account/signin` and receives the OAuth authorization code directly via HTTP 302.
4. **Signed CCI Token Retrieval:** Exchanges the authorization code for a OneApp CCI token set (`/auth/v1/token`), signed with the required HMAC-SHA256 `X-Fingerprint`.
5. **CCS Token Exchange:** Exchanges the CCI token via `/auth/v1/token-exchange?serviceType=CCS` for a CCS Bearer token used by the vehicle telematics and remote control APIs.
6. **Automatic Renewal:** On subsequent adapter restarts or when the token approaches expiration, the adapter refreshes the session silently via `/auth/v2/token-refresh` and only falls back to a full password login if the refresh token has expired.

### 3. Troubleshooting Login Issues
- **Pending Terms of Service / Account Consent:** If the log reports `Account consent or verification is required`, open the official **Kia App** or **Hyundai Bluelink App** on your smartphone, log in once, and accept any updated Terms of Service or privacy notices. Afterward, restart the ioBroker adapter.
- **Temporary IP Block (`HTTP 403 Forbidden`) or Slow Login:** Repeated failed login attempts (especially from outdated adapter versions or external scripts like `bluelink_refresh_token`) can cause the manufacturer's firewall (WAF) to temporarily throttle or block your internet connection's public IP address. Stop any external scripts, wait 30–60 minutes (or reconnect your router to obtain a new public IP), and let the adapter log in on its own.
- **Manual Token Re-Fetch:** You can trigger a fresh token retrieval at any time during runtime by setting the state `bluelink.0.info.fetchToken` to `true`.

---

## Configuration Options

| Setting | Description |
|---|---|
| **Brand** | Vehicle manufacturer (`Kia` or `Hyundai`). |
| **Motor** | Drivetrain type: `EV` (battery electric), `PHEV/MHEV` (hybrid), or `Diesel/Benzin` (combustion). |
| **max km Range** | Maximum electric range in km (displayed and used for PHEV only). |
| **App Lang** | Language used for API responses (`DE`, `EN`, `NL`, `IT`, `ES`, `PL`). |
| **Username** | Email address of your Kia Connect or Hyundai Bluelink account. |
| **Password** | Account password (stored encrypted by ioBroker). |
| **Pin** | 4-digit security PIN configured in the mobile app (stored encrypted). |
| **Receive Daily drive History** | Fetches daily driving and energy consumption history (EV only, requires ~3 API requests per day). |
| **Stop refresh if 12V battery is under...** | Protects the 12V auxiliary battery against deep discharge. |
| **Request max 400** | Number of daily status polling requests distributed across 24 hours (e.g. `100` = every ~14.4 minutes). Maximum is `400` to stay within manufacturer rate limits. |
| **errorCounter** | Number of consecutive errors tolerated before logging an error and pausing until the next cycle. |
| **Resolve the address from coordinates** | Uses OpenStreetMap (Nominatim) to resolve GPS coordinates into a human-readable street address (`vehicleLocation.position_text`). |

---

## States & Remote Controls

### Adapter & Authentication Status (`info.*`)
| State | Role / Type | Description |
|---|---|---|
| `info.connection` | `indicator.connected` (`boolean`) | `true` when logged in and connected to the cloud API. |
| `info.tokenType` | `text` (`string`) | Active authentication mode (`cci` for EU OneApp/CCI flow, `legacy` for legacy tokens). |
| `info.tokenExpiry` | `text` (`string`) | ISO-8601 timestamp indicating when the current CCS access token expires. |
| `info.lastTokenRefresh` | `value.time` (`number`) | Unix timestamp (ms) of the last successful login or token refresh. |
| `info.fetchToken` | `button` (`boolean`) | Set to `true` (`ack: false`) to manually trigger an immediate token renewal. |

### Vehicle Remote Controls (`<VIN>.control.*`)
| State | Type / Role | Description |
|---|---|---|
| `control.lock` | `boolean` (`button`) | Locks the vehicle doors. |
| `control.unlock` | `boolean` (`button`) | Unlocks the vehicle doors. |
| `control.charge` | `boolean` (`button`) | Starts vehicle charging. |
| `control.charge_stop` | `boolean` (`button`) | Stops vehicle charging. |
| `control.charge_limit_slow` | `number` (`indicator`) | Target SoC limit (`50`–`100` %) for AC slow charging. |
| `control.charge_limit_fast` | `number` (`indicator`) | Target SoC limit (`50`–`100` %) for DC fast charging. |
| `control.clima.start` | `boolean` (`button`) | Starts pre-conditioning (climate control) using the parameters under `control.clima.set.*`. |
| `control.clima.stop` | `boolean` (`button`) | Stops pre-conditioning (climate control). |
| `control.clima.set.airTemp` | `number` (`indicator`) | Target cabin temperature in °C (default: `18`). |
| `control.clima.set.defrost` | `boolean` (`state`) | Enables front windshield defrost during pre-conditioning. |
| `control.clima.set.heating` | `number` (`state`) | Enables steering wheel / rear window heating (`1` = on, `0` = off). |
| `control.force_refresh_from_server` | `boolean` (`button`) | Fetches the latest cached status from the Hyundai/Kia cloud server (**does not wake up the car**). |
| `control.force_refresh_from_car` | `boolean` (`button`) | Wakes up the vehicle via mobile network to query live status and GPS (**uses 12V battery**). |
| `control.force_location` | `boolean` (`button`) | Requests a live GPS position update directly from the vehicle. |
| `control.force_update` | `boolean` (`state`) | Controls periodic polling behavior: `false` (default) = server cache only; `true` = wake up car on every poll (**not recommended**). |
| `control.batteryControlState12V` | `number` (`state`) | Minimum 12V battery SoC threshold in % (default: `65`). Below this value, active vehicle wake-ups are blocked unless the car is driving or charging. |

### Vehicle Telemetry (`<VIN>.*`)
- **`<VIN>.vehicleStatus.battery.*`:**
  - `soc`: High-voltage battery State of Charge in `%`.
  - `soh`: High-voltage battery State of Health in `%`.
  - `charge`: `true` if the vehicle is currently charging.
  - `plugin`: Charger connection state (`0` = unplugged, `1` = DC fast, `2` = portable/ICCB, `3` = AC wallbox/station).
  - `minutes_to_charged`: Remaining charging time in minutes.
  - `soc-12V`: 12V auxiliary battery State of Charge in `%`.
- **`<VIN>.vehicleStatus.*`:**
  - `dte` / `evModeRange` / `gasModeRange`: Estimated remaining driving range in `km`.
  - `doorLock`, `trunkOpen`, `hoodOpen`, `doorOpen.*`: Lock and open/close states for all doors, trunk, and hood.
  - `airCtrlOn`, `airTemp`, `steerWheelHeat`, `sideBackWindowHeat`: Current climate and heating states.
- **`<VIN>.vehicleLocation.*`:**
  - `lat`, `lon`, `speed`: Current GPS coordinates and speed.
  - `position_url`: Direct Google Maps link to the vehicle's location.
  - `position_text`: Resolved street address (if OpenStreetMap resolution is enabled).
- **`<VIN>.odometer.value`:** Total mileage in `km`.
- **`<VIN>.driveHistory.*`:** Daily and cumulative energy consumption, recuperation, and distance statistics (EV).

---

## Community & Links
- [ioBroker Forum Discussion](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)
- [GitHub Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Changelog
### 3.1.37 (2026-11-06)
* (meistermopper) Fall back to in-memory full CCI login when runtime CCI token refresh fails (`HTTP 401 code 9030 jwt-expired / Token expired`)
* (meistermopper) Remove obsolete manual Refresh Token / Fallback section from Admin UI and documentation since OneApp/CCI authentication is fully automatic
* (meistermopper) Add comprehensive English and German documentation for automated OneApp/CCI authentication, configuration options, and data points
* (meistermopper) Modernize Admin UI and i18n translations across all 11 supported languages
* (meistermopper) Fix shutdown race condition when saving rotated CCI tokens during adapter startup

### 3.1.36 (2026-11-01)
* (meistermopper) Fix EU login: enforce OneApp/CCI flow for European vehicles when username/password are provided
* (meistermopper) Integrate evcc-compatible Node TLS, cookie jar scoping, and IDP redirect hop handling
* (meistermopper) Add random device ID fallback if legacy device registration fails (hyundai_kia_connect_api #1342)
* (meistermopper) Add support for importing evcc token bundles into the refresh token field

### 3.1.35 (2026-10-15)
* (arteck) Fix EU Hyundai/Kia login

### 3.1.34 (2026-09-17)
* (arteck) fix location request

### 3.1.33 (2026-08-22)
* (ipod86) Fix EU Hyundai/Kia login

## Donation
[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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