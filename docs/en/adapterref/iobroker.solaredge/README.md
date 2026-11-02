![Logo](admin/solaredge.png)
# ioBroker.solaredge

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
![Current version in stable repository](https://iobroker.live/badges/solaredge-stable.svg)
![Number of Installations](https://iobroker.live/badges/solaredge-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml)

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Solaredge Adapter for ioBroker 

Get data from the SolarEdge monitoring portal via the SolarEdge Monitoring API v2.
The adapter reads current power and day/month/year/lifetime energy, optionally the current power flow
(SolarEdge documents power flow for paid tiers only; with OAuth2 Site Access it currently also works on the free tier,
but this may change).

You can also enable modbus on your solaredge device if it's a newer one and read the data directly.

### Setup

The Monitoring API v1 (api key from the monitoring portal) is shut down by SolarEdge on 2026-11-01.
v1 api keys do not work with v2.

**Site id:** with OAuth2 the site id is taken from the redirect URL (`site_id=...`) automatically. With an API key, log in at https://monitoring.solaredge.com, the site id is the "ID" shown for your site, e.g., 12345.

**Site Access (OAuth2, homeowners):**
1. Create an account at the [SolarEdge developer portal](https://developer.solaredge.com/) and create a
   Site Access application with scope `SITE_DATA`.
   As redirect URI enter the value shown in the instance settings (default `https://localhost/`).
   The redirect target does not need to exist. Tip: use the address of your ioBroker admin
   (e.g. `http://192.168.1.10:8081/`), then the browser opens admin after granting access
   instead of an error page. The redirect URI in the app and in the instance settings must be identical.
2. Enter client id and client secret of the application in the instance settings and save.
3. Copy the authorization link shown in the instance settings, open it in your browser, log in and grant access.
4. The browser is redirected to the redirect URI (the page may fail to load). Copy the complete URL from the
   address bar into the field "Authorization code or redirect URL" and save. Authorization codes expire quickly,
   the instance runs right after saving and requests the tokens.

The tokens are stored encrypted in `solaredge.X.info.auth` and are refreshed automatically.
If the authorization expires or is revoked (refresh tokens expire after 30 days without use),
repeat steps 3 and 4.

**Fleet Access (API key, installers):** select access type "Fleet Access" and enter the App API key.

**Credits:** each API call consumes 1 credit of your SolarEdge developer account
(free tier: 2000 credits/month, shared by all apps of the account). The adapter is built to stay well below that:
- Default schedule every 30 minutes. Instances with the old default (every 15 minutes) are changed once on update.
- 1 call per run: today's energy in quarter hours, which gives today's energy and the current power
  (average of the last complete quarter hour).
- 2 calls per day for month, year and lifetime energy until midnight; today's energy is added to them.
- No calls at night (option "No API calls at night", uses the location from the system settings):
  from 30 minutes before sunrise until 1 hour after sunset.

That's about 1200 calls/month in summer (Germany) and fewer in winter. A schedule of every 15 minutes needs
about 2300 calls/month in summer, more than the free tier allows. "Read current power flow" adds 1 call per run (about 2400 calls/month in summer with every 30 minutes),
so with power flow on the free tier use a schedule of every hour.

## Credits

This adapter would not have been possible without the great work of @92lleo (https://github.com/92lleo), who wrote the code for the initial versions and released it to ioborker-community-adapters.

<!--
	### **WORK IN PROGRESS**
-->
## Changelog
### 2.0.0 (2026-10-16)
- (mcm1957) BREAKING: Adapter has been migrated to SolarEdge Monitoring API v2. A new API key must be generated at https://developer.solaredge.com/ — v1 keys are not valid in v2.
- (mcm1957) BREAKING: The `currentPowerFlow` feature now requires a Business Pro or Enterprise tier subscription at SolarEdge.
- (Garfonso) OAuth2 Site Access (client id/secret of your own SolarEdge app) has been added, Fleet Access API key is optional. See README for setup.
- (Garfonso) Time ranges are now sent in local time and API units are converted correctly.
- (Garfonso) Power flow reads the v2 response; new states for battery power, charge level and grid/battery status. Power flow currently also works on the free tier with OAuth2 Site Access.
- (Garfonso) API calls reduced to about 1 per run and 2 per day, no calls at night. Default schedule is every 30 minutes now, existing instances with every 15 minutes are changed once.
- (Garfonso) Instance settings are responsive for all screen sizes. The OAuth2 setup steps are shown next to the related fields.
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 1.4.1 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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