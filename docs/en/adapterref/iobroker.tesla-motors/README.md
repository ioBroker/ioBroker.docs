![Logo](admin/tesla-motors.png)

# ioBroker.tesla-motors

[![NPM version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
![Number of Installations (latest)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/tesla-motors-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.tesla-motors)

[![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)](https://nodei.co/npm/iobroker.tesla-motors/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Tesla adapter for ioBroker

All Tesla vehicles and Powerwalls from the Tesla App are displayed and updated via the official **Tesla Fleet API**.

Vehicle commands (lock, unlock, climate, charging, etc.) are supported for all models including post-2021 vehicles that require **end-to-end command signing** (Vehicle Command Protocol).

### Requirements

- Tesla account with vehicles or energy products
- Node.js >= 20
- A registered Tesla Fleet API application (Client ID + Client Secret) from [developer.tesla.com](https://developer.tesla.com)
- A Fleet Key domain (for virtual key installation on the vehicle)

### Setup (Step by Step)

The adapter admin UI guides you through 4 steps:

#### Step 1: Generate Key Pair

1. Click **Generate Key Pair** in the adapter settings to create an EC key pair (prime256v1)
2. Click **Copy Public Key** and go to [fleetkey.net](https://fleetkey.net) - create an account and get your subdomain (e.g. `abc123.fleetkey.net`)
3. Upload the Public Key to your FleetKey.net account. Tesla will download the key from there during registration.

#### Step 2: Tesla Developer App

1. Create a Fleet API Application at [developer.tesla.com](https://developer.tesla.com/request)
2. Set **Origin** to your full FleetKey subdomain (e.g. `https://abc123.fleetkey.net`)
3. Set **Redirect URL** to `https://auth.tesla.com/void/callback`
4. Copy **Client ID** and **Client Secret** from the created app and enter them below together with your FleetKey domain (e.g. `abc123.fleetkey.net`)

#### Step 3: Authentication (OAuth2)

1. Click **Generate Auth Link** - a new browser tab opens with the Tesla login page
2. Log in with your Tesla account and authorize the app
3. After login you will see "Page Not Found" - this is expected! Copy the complete URL from the browser address bar
4. Paste the URL into the code URL field and click **Save and close**

**Warning:** Never share this URL with anyone! It grants access to your Tesla account.

#### Step 4: Install Virtual Key

The Virtual Key is required to send commands to your vehicle (lock/unlock, climate, charging, etc.). Without it, you can only read vehicle data. You can do this step after the adapter is running.

1. Open the Virtual Key URL shown in the adapter settings on your phone (or scan the QR code)
2. The Tesla App will ask you to confirm adding a "third-party key"
3. Go to your vehicle and hold your key card to the center console to confirm the installation

### Remote Commands

Remote commands are available under `tesla-motors.0.<VIN>.remote`.

Supported commands include:

- **Lock/Unlock**: `door_lock`, `door_unlock`
- **Climate**: `auto_conditioning_start`, `auto_conditioning_stop`, `set_temps`, `set_preconditioning_max`, `remote_seat_heater_request`, `remote_steering_wheel_heater_request`
- **Charging**: `charge_start`, `charge_stop`, `set_charge_limit`, `set_charging_amps`, `charge_port_door_open`, `charge_port_door_close`, `set_scheduled_charging`
- **Trunk**: `actuate_trunk` (front/rear)
- **Windows**: `window_control` (vent/close)
- **Security**: `set_sentry_mode`, `remote_start_drive`
- **Media**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **Other**: `flash_lights`, `honk_horn`, `trigger_homelink`, `schedule_software_update`

### Field Description

- df: driver front
- dr: driver rear
- pf: passenger front
- pr: passenger rear
- ft: front trunk
- rt: rear trunk

### Technical Details

- **Fleet API**: Regional endpoints (EU/NA/CN) with automatic region detection from JWT token
- **Command Signing**: ECDSA P-256 + HMAC-SHA256 via protobuf (Vehicle Command Protocol)
- **Two Domains**: DOMAIN_INFOTAINMENT (climate, charging, media) and DOMAIN_VEHICLE_SECURITY (lock, unlock, trunk)
- **Session Management**: ECDH handshake per domain, epoch + counter based, stored in ioBroker state
- **Token Refresh**: Automatic refresh before expiry

### Questions and Discussions

<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### 2.0.0 (2026-04-12)

- (TA2k) Migrate to Tesla Fleet API with OAuth2
- (TA2k) Add Vehicle Command Protocol signing (ECDSA P-256) for post-2021 vehicles
- (TA2k) Add admin UI for Fleet API setup (key generation, credentials, virtual key)
- (TA2k) Add regional endpoint detection (EU/NA/CN) from JWT token
- (TA2k) Store session in ioBroker state to avoid restart loops
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.0 (2025-12-28)

- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now.
- (TA2k) powerwall backup history has been fixed
- (TA2k) Dependencies have been updated.

### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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
