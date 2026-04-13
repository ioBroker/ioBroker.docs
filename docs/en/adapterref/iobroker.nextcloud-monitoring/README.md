![Logo](admin/nextcloud_monitoring.png)
# ioBroker.nextcloud-monitoring

[![NPM version](https://img.shields.io/npm/v/iobroker.nextcloud-monitoring.svg)](https://www.npmjs.com/package/iobroker.nextcloud-monitoring)
![Current version in stable repository](https://iobroker.live/badges/nextcloud-monitoring-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nextcloud-monitoring.svg)](https://www.npmjs.com/package/iobroker.nextcloud-monitoring)
![Number of Installations](https://iobroker.live/badges/nextcloud-monitoring-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.nextcloud-monitoring.png?downloads=true)](https://www.npmjs.com/package/iobroker.nextcloud-monitoring)

**Tests:**  ![Test and Release](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and instructions on disabling error reporting, please refer to the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Use of Sentry reporting starts with js-controller 3.0.

I use my own Sentry server based on Glitchtip.

# nextcloud-monitoring adapter for ioBroker

---
## ⚠️ Important Note: Naming Convention Change (v1.1.2+)

> **ATTENTION:** Due to official ioBroker naming guidelines, this adapter has been renamed from `nextcloud_monitoring` (underscore) to **`nextcloud-monitoring`** (dash).

**What does this mean for you?**
* **No automatic updates:** If you are using version 1.1.1 or older, you will no longer receive updates through the old package name.
* **Reinstallation required:** Please uninstall the old version (`nextcloud_monitoring`) and install the new version (`nextcloud-monitoring`) via the ioBroker repository or GitHub.
* **Settings:** You will need to re-enter your instance configuration once in the new version.

We apologize for the inconvenience, but this change was necessary to comply with official ioBroker repository standards.
---

## Description
### First: If you are looking for a widget specifically for this adapter, then create it using [VIS2-widget-nextcloud-monitoring](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring)
This adapter allows for detailed monitoring of your Nextcloud instance via the official OCS API (`serverinfo`). It provides numerous system data, user statistics, shares, as well as performance values from PHP (OPcache/FPM) and the database directly in ioBroker.

## Features
* **System Status:** CPU load, RAM usage, free disk space, and Nextcloud version.
* **User Statistics:** Number of active users (5 min, 1 hr, 24 hr), total number of files, and storage usage.
* **Shares:** Monitoring of link shares, Talk rooms, and federated shares.
* **Server Health:** PHP version, memory limit, OPcache hit rate, and detailed FPM process statistics.
* **Widget:** A special widget specifically for Nextcloud monitoring is available [HERE](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring).

---

## Installation & Configuration

### 1. Connection Settings
* **Domain:** Enter your Nextcloud domain without `https://` (e.g., `cloud.yourdomain.com`).
* **Token:** The OCS API token of your Nextcloud (see section "How-To: Token").
* **Update Interval:** Time in minutes between API requests (Default: 10 min, Minimum: 5 min).
* **Multible Server:** You can now add multible Server e.g.: my_server_1, and next server e.g.: other_server_2

### 2. Data Options
* **Skip Apps:** Disables the detailed list of installed apps to reduce API load.
* **Skip Update Check:** Disables checking for new Nextcloud versions.

---

# How-To: Create & Set Token

Accessing the `serverinfo` API requires a valid API token. This token must be stored directly in the Nextcloud configuration.

### Generate the Token (Linux / Windows)
To enable access, you must generate a token (a random string) and register it in your Nextcloud instance using the `occ` tool.

**Command to generate the token:**
* **Linux (Terminal):** 

`openssl rand -hex 32`
* **Windows (PowerShell):** 

`$bytes = New-Object Byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()`

* Alternatively, you can use online tools such as 

[it-tools.tech/token-generator](https://it-tools.tech/token-generator).*

# Set Token in Nextcloud
**Example for Linux (Standard path) in Terminal:**
```bash
sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```
**Example for Linux (Directly in your Nextcloud folder) in Terminal:**
```bash
sudo -u www-data php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```
**If you use your Nextcloud in a webspace or other Provider, mostly you don't need sudo, simply do:**
 ```bash
 #Directly in your Nextcloudfolder
php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN

# Or with path
php /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

Command for Windows (PowerShell/CMD): Navigate to your Nextcloud directory and execute:

`php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN`

Monitored Data Points (Excerpt)

| Path | Description | Data Type |
| :--- | :--- | :--- |
| `system.version` | Installed Nextcloud version | string |
| `system.cpuload_1` | CPU load of the last minute | number |
| `system.freespace` | Free disk space | string |
| `storage.num_users` | Total number of users | number |
| `server.php.opcache_hit_rate` | Efficiency of the PHP cache | string |
| `fpm.active_processes` | Active PHP-FPM processes | number |
| `activeUsers.last5min` | Users active in the last 5 minutes | number |

# Troubleshooting (FAQ)

### Invalid Domain: Enter the domain without a protocol.

    Correct: mycloud.com or mycloud.com/folder

    Incorrect: https://mycloud.com or http://mycloud.com/folder

### API delivers no data:

Ensure that the "Server Info" app (standard app) is enabled in your Nextcloud under "Apps". Without this app, the adapter cannot retrieve any data.

### Token Error:

Verify if the token was correctly saved in Nextcloud using:

* In Linux: 

`sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

* Or if you are directly in folder, use:

`sudo -u www-data php occ config:app:get serverinfo token`

* If you use your Nextcloud in a webspace or other Provider, mostly you don't need sudo:

`php occ config:app:get serverinfo token` or `php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

### Maintenance Mode:

If your Nextcloud is in maintenance mode, the adapter will not be able to fetch data and will log an info. This is normal behavior as the API is disabled during maintenance.

## Changelog
### 2.0.6 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.0.5 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.0.4 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15
* (mcm1957) fix: update opcache hit rate state type from string to number

### 2.0.3 (2026-03-18)
* (mcm1957) fix: reevaluate state roles
* (mcm1957) fix: creation of intermediate objects missing

### 2.0.2 (2026-03-05)
* (H5N1v2) fix: language used for stateIds and names
* (H5N1v2) fix: creation of intermediate objects missing
* (H5N1v2) chore: update dependencies to latest versions
* (H5N1v2) added axios in dependencies

### 2.0.1 (2026-02-05)
* (H5N1v2) fix: Optimize state creation by caching existing states
* (H5N1v2) fix: Set Connection header to 'close' in API request

### 2.0.0 (2026-01-16)
* (H5N1v2) Added Multi-Server Support: You can now manage and monitor multiple Nextcloud instances within a single adapter instance using a dynamic table configuration.
* (H5N1v2) Refactored State Structure: Reorganized the object tree to provide a cleaner and more logical hierarchy for all monitored data.
* (H5N1v2) Expanded Data Points: Added several new monitoring points including detailed PHP Opcache, APCu stats, and FPM process information.
* (H5N1v2) Enhanced Localization: Updated and added comprehensive translations for 11 languages (DE, EN, IT, FR, ES, NL, RU, UK, ZH-CN, PL, PT).
* (H5N1v2) Improved Admin UI: Integrated a dynamic table-based management system with helpful tooltips and descriptions for better user experience.

### 1.1.3 (2026-01-14)
* (H5N1v2) repair tsconfig and cleanup release config

### 1.1.2 (2026-01-14)
* (H5N1v2) Change name from nextcloud_monitoring to nextcloud-monitoring
* (H5N1v2) Improved handling of Nextcloud maintenance mode (logged as info instead of error)

### 1.1.1 (2026-01-13)
* (H5N1v2) fixed: repository URLs and naming conventions
* (H5N1v2) added: encrypted and protected native support for tokens

### 1.1.0

* (H5N1v2) Initial release.
* (H5N1v2) Multi-language support for object names (DE/EN/IT/ES/RU etc.).
* (H5N1v2) Support for OCS API Token.
* (H5N1v2) Integrated dynamic update interval.

---

## Support & Feedback

If you encounter any **bugs**, have **feature requests**, or want to suggest **improvements**, please feel free to open an **Issue** on GitHub. This helps to track the progress and helps other users with similar problems.

[👉 Open a new Issue here](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/issues)

---

## License
MIT License

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>

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