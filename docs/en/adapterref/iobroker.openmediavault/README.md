![Logo](admin/openmediavault.png)

# ioBroker.openmediavault

[![NPM version](https://img.shields.io/npm/v/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
![Number of Installations](https://iobroker.live/badges/openmediavault-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openmediavault-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)](https://nodei.co/npm/iobroker.openmediavault/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg) ![Coverage](https://img.shields.io/badge/coverage-97%25-brightgreen)

## OpenMediaVault adapter for ioBroker

This adapter allows to read informations from your OpenMediaVault using the rpc interface.

## Configuration

You need the url of your OpenMediavault server and the password of your admin account.<br>
**Note**: using admin account is neccessary because rpc interface is only avaiable for admin

## Known issues

The adapter prevents hard disks from going into standby mode during cyclic polling and wakes them up from standby mode when queried.<br>
The reason is that this is inherent in the design of the rpc api.<br>
[see Details](https://github.com/openmediavault/openmediavault/issues/2063)

To prevent this, the data can also be updated using a cron job.<br>
For example, you can schedule the adapter query for a time when the hard disks are not in standby mode anyway, such as during backup time.

## Development

Tests against a real OpenMediaVault server and recorded fixtures:

1. Create a git-ignored `.env` in the project root:

    ```env
    OMV_URL=https://omv.local
    OMV_USER=admin
    OMV_PASSWORD=your-password
    # optional
    OMV_IGNORE_SSL_CERTIFICATE=true
    OMV_CONNECTION_TIMEOUT=10000
    ```

    - `OMV_URL`, `OMV_USER`, `OMV_PASSWORD`: required
    - `OMV_IGNORE_SSL_CERTIFICATE`: optional, `true` skips the certificate check
    - `OMV_CONNECTION_TIMEOUT`: optional, in milliseconds

2. Record the API responses (read-only, writes `test/fixtures/local/<version>/api/`):

    ```bash
    npm run record:api
    ```

    - `-- --dry-run`: only shows which files would be written
    - `-- --no-anonymize`: stores the raw data without anonymization

3. Run the tests:

    ```bash
    npm run test:ts        # offline, uses recorded fixtures
    npm run test:package   # validates the package files
    npm run test:live      # against the server
    npm run test:all       # all of the above
    npm run test:coverage  # test:ts with coverage report (src/) in coverage/
    ```

Fixtures are stored in `test/fixtures/local/<version>/` and are git-ignored, as they contain server data. By default, the recorded values are anonymized (MAC, IP and UUID addresses, names, secrets, URL hosts). A leak check prevents writing a fixture if identifiers remain. The live tests need the credentials in the git-ignored `.env` file.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.6.0 (2026-11-26)
- (Scrounger) bug fixes
- (Scrounger) dependencies updated
- (Scrounger) momment replaced with day.js

### 1.5.0 (2026-07-13)
- (Scrounger) dependencies updated
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) authentication bug fix for >= v.8.5.x #63
- (copilot) Adapter requires node.js >= 22 now
- (ioBrokerTranslator) spanish language added #57

### 1.4.4 (2026-03-17)

- (Scrounger) dependencies updated

### 1.4.3 (2026-03-09)

- (Scrounger) translation updates
- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases

### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

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