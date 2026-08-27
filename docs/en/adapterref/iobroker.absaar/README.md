# ioBroker.absaar

ioBroker adapter for Absaar EMS inverters. The adapter reads inverter and station data from the Absaar EMS cloud API used by the Absaar EMS app.

Product and manufacturer information is available on the [official AdvanSol Power website](https://www.advansol-power.com/).

The adapter does not contain private credentials, private host names, or user-specific data. Credentials are stored in protected and encrypted ioBroker native configuration fields.

## Features

- Cloud polling via `https://mini-ems.com:8081`
- Login with Absaar EMS app credentials
- Automatic token handling and re-authentication
- Configurable polling interval
- Station states for daily, monthly and total energy generation
- Additional station values such as current power and income/environment counters
- Collector states such as input power, online status, collector name and last online time
- Inverter states for AC, PV, temperature, battery and load values
- Optional raw JSON states for troubleshooting
- JSON based admin configuration

## Requirements

- ioBroker js-controller `>= 6.0.11`
- ioBroker Admin `>= 7.8.23`
- Node.js `>= 22`
- An Absaar EMS account with at least one inverter or station configured in the Absaar EMS app
- Network access from the ioBroker host to `mini-ems.com:8081`

## Configuration

Open the adapter instance configuration in ioBroker Admin.

| Setting | Description |
| --- | --- |
| Adapter active | Enables or disables polling. |
| Absaar username | Username used in the Absaar EMS app. Depending on the account this may be an email address or a username. |
| Absaar password | Password used in the Absaar EMS app. Stored as encrypted and protected native config by ioBroker. |
| Poll interval seconds | Polling interval in seconds, from `30` to `86400`. Default is `120`. Keep this value conservative to avoid cloud rate limits. |
| API base URL | Default: `https://mini-ems.com:8081`. Usually this should not be changed. |
| Store raw data as JSON | Writes the full fetched JSON into states for troubleshooting. Disabled by default. |

## States

The adapter creates states below this structure:

```text
absaar.0.info.*
absaar.0.stations.<stationId>.*
absaar.0.stations.<stationId>.inverters.<inverterId>.*
```

### Info states

| State | Type | Description |
| --- | --- | --- |
| `info.connection` | boolean | `true` if the last poll succeeded. |
| `info.lastUpdate` | string | ISO timestamp of the last successful update. |
| `info.lastError` | string | Last error message. Empty after a successful poll. |

### Station states

| State | Unit | Description |
| --- | --- | --- |
| `dailyPowerGeneration` | kWh | Daily generated energy reported by the Absaar API. |
| `monthlyElectricityGeneration` | kWh | Monthly generated energy reported by the Absaar API. |
| `totalPowerGeneration` | kWh | Total generated energy reported by the Absaar API. |
| `currentPower` | W | Current station power reported by the Absaar API. |
| `incomeOfTheDay` |  | Daily income counter reported by the API. |
| `currentMonthsIncome` |  | Monthly income counter reported by the API. |
| `cumulativeIncome` |  | Cumulative income counter reported by the API. |
| `saveStandardCoal` |  | Environmental counter reported by the API. |
| `emissionReductionCO2` |  | CO2 reduction counter reported by the API. |
| `protectTrees` |  | Tree protection counter reported by the API. |
| `inverterTotal` |  | Number of assigned inverters. |
| `inOnCount` |  | Number of online inverters. |

### Collector states

Collector states are created below `stations.<stationId>.inverters.<inverterId>`. They are created even if the separate inverter data endpoint returns no rows.

| State | Unit | Description |
| --- | --- | --- |
| `collectorId` |  | Collector ID. |
| `collectorName` |  | Collector name. |
| `inverterId` |  | Inverter ID. |
| `inverterName` |  | Inverter name. |
| `communicationStatus` |  | Communication status reported by the API. |
| `onlineStatus` |  | Online status reported by the API. |
| `networkStatus` |  | Numeric network status. |
| `inPower` | W | Input or current power reported in the collector list. |
| `ipAddress` |  | Cloud-side IP address reported by the API. |
| `onlineTime` |  | Last online timestamp. |
| `exhibitionTime` |  | Last data timestamp shown by the API. |
| `collectorType` |  | Collector type. |
| `equipmentType` |  | Equipment type. |
| `modelReplace` |  | Model identifier. |

### Inverter states

| State | Unit | Description |
| --- | --- | --- |
| `acPower` | W | AC output power. |
| `acVoltage` | V | AC voltage. |
| `acFrequency` | Hz | AC frequency. |
| `acElectric` | A | AC current. |
| `pv1Power` | W | PV input 1 power. |
| `pv2Power` | W | PV input 2 power. |
| `pv1Voltage` | V | PV input 1 voltage. |
| `pv2Voltage` | V | PV input 2 voltage. |
| `pv1Electric` | A | PV input 1 current. |
| `pv2Electric` | A | PV input 2 current. |
| `inPower` | W | Input power reported by the API. |
| `temperature` | degC | Inverter temperature. |
| `batteryVoltage` | V | Battery voltage, if reported by the device. |
| `batteryCurrent` | A | Battery current, if reported by the device. |
| `batteryPower` | W | Battery power, if reported by the device. |
| `loadPower` | W | Load power, if reported by the device. |
| `controllerTemperature` | degC | Controller temperature, if reported by the device. |

Not every Absaar device reports every field. Missing values are left unchanged until the API reports a valid numeric value.

## Troubleshooting

1. Check `absaar.0.info.connection`.
2. Check `absaar.0.info.lastError`.
3. Verify that the same credentials work in the Absaar EMS app.
4. Keep the poll interval at 120 seconds or higher while testing.
5. Enable raw JSON only temporarily, because it can create large states depending on the API response.

## Changelog

### 0.1.13 (2026-07-14)

- Added complete adapter description translations and a manufacturer link.
- Enforced a safe polling interval range of 30 seconds to 24 hours.
- Enabled TLS certificate verification for cloud API requests.
- Improved state roles and avoided redundant object creation during polling.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.12

- Added the release script configuration required by the repository checker.

### 0.1.11

- Added ioBroker development tooling used by common adapter maintenance workflows.
- Switched admin translations to the short i18n file format.

### 0.1.10

- Switched the CI workflow to the standard ioBroker testing actions.
- Added package and integration test scripts expected by the ioBroker checker.

### 0.1.9

- Added trusted publishing workflow configuration for signed npm releases.
- Added repository housekeeping updates requested by the ioBroker checker.

Older entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 TheBam
