![Logo](admin/weatherflow-tempest-api.png)

# ioBroker.weatherflow-tempest-api

[![NPM version](https://img.shields.io/npm/v/iobroker.weatherflow-tempest-api.svg)](https://www.npmjs.com/package/iobroker.weatherflow-tempest-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow-tempest-api.svg)](https://www.npmjs.com/package/iobroker.weatherflow-tempest-api)
![Number of Installations](https://iobroker.live/badges/weatherflow-tempest-api-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/weatherflow-tempest-api-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.weatherflow-tempest-api.png?downloads=true)](https://nodei.co/npm/iobroker.weatherflow-tempest-api/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.weatherflow-tempest-api/workflows/Test%20and%20Release/badge.svg) ![Coverage](https://img.shields.io/badge/coverage-99%25-brightgreen)

## weatherflow-tempest-api adapter for ioBroker

Get data for your [Tempest Weather Station](https://tempest.earth/tempest-home-weather-system/) from the [WeatherFlow Tempest API](https://weatherflow.github.io/Tempest/api/)

### Integrated endpoints

| endpoint     | Type | Success |
| ------------ | :--: | :-----: |
| observations | Rest |   tbd   |
| stattions    | Rest |   tbd   |
| forecast     | Rest |   ✔    |

## Development

Tests against the real WeatherFlow API and recorded fixtures:

1. Create a git-ignored `.env` in the project root:

    ```env
	WFT_STATION_ID=your-station-id
    WFT_ACCESS_TOKEN=your-access-token    
    ```

    - `WFT_ACCESS_TOKEN`: required, access token of your WeatherFlow account
    - `WFT_STATION_ID`: required, ID of your Tempest station

2. Record the API responses (read-only, writes `api/better_forecast.json`):

    ```bash
    npm run record:api
    ```

    - `-- --dry-run`: only shows which files would be written
    - `-- --no-anonymize`: stores the raw data without anonymization (local debugging only, never commit)

3. Run the tests:

    ```bash
    npm run test:ts        # offline, uses recorded fixtures
    npm run test:package   # validates the package files
    npm run test:live      # against the WeatherFlow API
    npm run test:all       # test:ts, test:package and test:live
    npm run test:coverage  # runs test:ts with coverage report in coverage/ and updates the coverage badge
    ```

4. Run the checks:

    ```bash
    npm run check          # TypeScript type check (adapter and tools)
    npm run lint           # ESLint
    ```

Fixtures are stored in `test/fixtures/local/api/` and are git-ignored, as they contain station data. The live tests need the credentials in the git-ignored `.env` file. The coverage report is written to `coverage/` (git-ignored).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-11-24)

- (Scrounger) momment replaced with day.js
- (Scrounger) bug fixes found by adapter checker
- (Scrounger) bug fixes
- (Scrounger) dependencies updated
- (iobroker-bot) Adapter requires node.js >= 22 now.

### 1.1.4 (2026-03-17)

- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases

### 1.1.3 (2025-10-19)

- (Scrounger) dependencies updated

### 1.1.2 (2025-10-08)

- (Scrounger) weather specific roles added #21
- (Scrounger) auto translation bug fix
- (Scrounger) dependencies updated

### 1.1.1 (2025-09-30)

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