![Logo](admin/unifi-network.png)

# ioBroker.unifi-network

[![NPM version](https://img.shields.io/npm/v/iobroker.unifi-network.svg)](https://www.npmjs.com/package/iobroker.unifi-network)
[![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-network.svg)](https://www.npmjs.com/package/iobroker.unifi-network)
![Number of Installations](https://iobroker.live/badges/unifi-network-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/unifi-network-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.unifi-network.png?downloads=true)](https://nodei.co/npm/iobroker.unifi-network/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.unifi-network/workflows/Test%20and%20Release/badge.svg) ![Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen)

## unifi-network adapter for ioBroker

Unifi Network uses the websocket interface to receive real-time information from the unifi-network application

## Important

1. The adapter is developed exclusively on the basis of the UniFi OS. Compatibility with a self-hosted network controller should be given, but cannot be guaranteed.

2. **This adapter can be very resource intensive!**<br>This depends on your environment, i.e. how many unifi-devices and clients are in your network. This can be influenced somewhat via the realtime api `debounce time [s]` parameter in the adapter settings. Real-time events are not affected by this setting, only the "cyclical" real time update of devices, clients, etc.

3. **Not all states are directly available after the adapter has started**<br>States are only created and updated when the data is sent by the network controller, this can take some time until the data is sent for the first time

## Configuration

### Local user (UniFi OS)

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti SSO Cloud Users will not work. It is recommended you use the Administrator or a user with full read/write access to get the most out of the integration, but it is not required.

1. Login to your Local Portal on your UniFi OS device, and click on Users.\
   **Note**: This **must** be done from the UniFi OS by accessing it directly by IP address (e.g. 192.168.1.1), not via unifi.ui.com or within the UniFi Network app.

2. Go to **Admins & Users** from the left hand side menu and select the Admins tab or go to [IP address]/admins/ (e.g. 192.168.1.1/admins/).

3. Click on **+** in the top right corner and select **Add Admin**.

4. Select **Restrict to local access only** and enter a new username and password.

5. Select **Hotspot Operator** and **Site Admin** for the Network role.\
   **Note** This is not absolutely necessary, if the permissions are not sufficient, you will be informed via log message

![image info](./doc/config_local_user.png)

## Messages for scripts and AI agents

`sendTo('unifi-network.0', 'help', {})` answers `{ help, commands }`: a description of all messages (`clientList`, `deviceList`, `wlanList`, `lanList`, `firewallGroupList`, ...) and of the states to control the network, written for AI agents (e.g. ioBroker.pi-agent) and script authors. `commands` lists every message with `write: true` if it changes something.

## Development

Tests against a real controller and recorded fixtures:

1. Create a git-ignored `.env` in the project root:

    ```env
    UNIFI_HOST=192.168.1.1
    UNIFI_USER=your-local-user
    UNIFI_PASSWORD=your-password
    # optional
    UNIFI_PORT=443
    UNIFI_SITE=default
    ```

    - `UNIFI_HOST`, `UNIFI_USER`, `UNIFI_PASSWORD`: required
    - `UNIFI_PORT`: HTTPS port, default `443`
    - `UNIFI_SITE`: site name, default `default`

2. Record the API responses (read-only, one file per endpoint):

    ```bash
    npm run record:api
    ```

    - `-- --dry-run`: only shows which files would be written or deleted
    - `-- --no-anonymize`: stores the raw data without anonymization

3. Record the real-time events (interactive):

    ```bash
    npm run record:events
    ```

    - `-- --only=<ids>`: only the listed scenarios, comma-separated (ids in `tools/eventScenarios.ts`)
    - `-- --missing`: only scenarios without a fixture, existing files are kept
    - `-- --destructive`: also scenarios that delete data on the controller
    - `-- --dry-run`: only shows which files would be written
    - `-- --no-anonymize`: stores the raw data without anonymization

4. Record unknown events (interactive, `q` + Enter saves, Ctrl+C aborts):

    ```bash
    npm run record:events:unknown
    ```

    - `-- --dry-run`: only shows which files would be written
    - `-- --no-anonymize`: stores the raw data without anonymization

5. Run the tests:

    ```bash
    npm run test:ts        # offline, uses recorded fixtures
    npm run test:live      # against the controller
    npm run test:all       # all of the above
    npm run test:coverage  # runs test:all with coverage report (src/) in coverage/index.html
    ```

Fixtures are stored in `test/fixtures/local/` and are git-ignored, as they contain controller data. The live tests need the controller credentials in the git-ignored `.env` file. The coverage report is written to `coverage/` (git-ignored).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-11-20)

- (Scrounger) bug fixes found by adapter checker
- (Scrounger) bug fixes
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 1.6.0 (2026-11-17)

- (Scrounger) enable / disable ports added #150
- (Scrounger) momment replaced with day.js
- (Scrounger) dependencies updated #116
- (Scrounger) revert bug fix for expired token #124
- (Scrounger) channel / device name undefined bug fix #116
- (Scrounger) vpn client handling optimized
- (Scrounger) event messages improved #122 #115

### 1.5.0 (2026-06-23)

- (Scrounger) vpn event handler for network >= 10.3.x added #89
- (Scrounger) event messages improved #109, #91
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) dependencies updated
- (ioBrokerTranslator) spanish language added #98
- (Scrounger) bug fix for expired token since v10.4.57 #108
- (copilot) Adapter requires node.js >= 22 now

### 1.4.0 (2026-04-08)

- (Scrounger) bug fix for speed test event spamming since v.10.2.105
- (Scrounger) event messages improved #68 #54
- (Scrounger) dependencies updated
- (Scrounger) support for Unifi OS on custom port added (e.g. UniFi OS Server) #65
- (Scrounger) bug fix: vpn is wrongly shown as lan
- (Scrounger) system informations added #63
- (Scrounger) port states up, rx/tx error and rx/tx dropped added
- (Scrounger) event messages improved #64
- (Scrounger) read controller version added #59
- (Scrounger) option to set debug level for client connection events added #61
- (Scrounger) property version for devices added
- (Scrounger) satisfaction object create condition removed to prevent create and deletion of object
- (Scrounger) event messages for dream machines compatibility < v10.x added #72
- (Scrounger) weblate translation added
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases #56

### 1.3.1 (2025-12-01)

- (Scrounger) null bug fix #48
- (Scrounger) dependencies updated
- (Scrounger) event messages improved #46
- (Scrounger) bug fixes

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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