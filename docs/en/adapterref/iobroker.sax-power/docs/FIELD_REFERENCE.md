---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# Field reference

## General rules

- Power values use watts (`W`).
- Energy values use kilowatt-hours (`kWh`).
- State of charge uses percent (`%`).
- Timestamps are stored in ISO-compatible form.
- Missing optional measurements are represented as `null`.
- Unknown values are not converted to zero.

## Device information

Typical paths:

```text
devices.<serialNumber>.info.*
```

| State | Type | Description |
|---|---:|---|
| `name` | string | Device name reported by the cloud |
| `type` | string | Device or storage type |
| `serialNumber` | string | SAX Power serial number |
| `firmware` | string | Reported firmware version |
| `dataCycle` | number | Reported data cycle, when available |
| `lastUpdate` | string/date | Last update reported for the device |

The exact available information depends on the cloud response.

## Device live values

Typical paths:

```text
devices.<serialNumber>.live.*
```

| State | Unit | Meaning |
|---|---:|---|
| `batteryChargePower` | W | Positive magnitude of current battery charging power |
| `batteryDischargePower` | W | Positive magnitude of current battery discharging power |
| `batteryPower` | W | Signed battery power |
| `batteryDirection` | text | `charging`, `discharging`, or `idle` |
| `gridImportPower` | W | Positive magnitude of grid import |
| `gridExportPower` | W | Positive magnitude of grid export |
| `gridPower` | W | Signed grid power |
| `gridDirection` | text | `import`, `export`, or `idle` |
| `gridVoltage` | V | Grid voltage |
| `pvPower` | W | PV production, when provided by the cloud |
| `soc` | % | State of charge |

### Battery power sign

- negative: charging
- positive: discharging
- zero: idle

### Grid power sign

- negative: export
- positive: import
- zero: idle

## Aggregated root live values

Paths:

```text
live.*
```

| State | Unit | Meaning |
|---|---:|---|
| `pvPower` | W | First available installation-level PV value |
| `houseConsumptionPower` | W | Calculated house consumption |
| `gridPower` | W | First available installation-level grid value |
| `gridDirection` | text | `import`, `export`, or `idle` |
| `batteryPower` | W | Sum of all available storage battery power values |
| `batteryDirection` | text | Direction derived from combined battery power |
| `soc` | % | Arithmetic mean of available storage SOC values |
| `deviceCount` | number | Number of detected storage devices |
| `lastUpdate` | date/text | Last successful live aggregation |

## House consumption calculation

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

The calculation is performed only if all three values are available.

When `pvPower` is unavailable:

- `live.pvPower` remains `null`
- `live.houseConsumptionPower` remains `null`
- the administration interface displays “Not available”

## Statistics

Period paths:

```text
summary.statistics.<period>.*
devices.<serialNumber>.statistics.<period>.*
```

Supported period names:

- `day`
- `week`
- `month`
- `year`
- `total`

Public states:

| State | Unit | Meaning |
|---|---:|---|
| `chargedEnergy` | kWh | Battery energy charged in the period |
| `dischargedEnergy` | kWh | Battery energy discharged in the period |
| `firstTimestamp` | date | First included historical value |
| `lastTimestamp` | date | Last included historical value |

The following former technical fields are not part of the public version 1.0 object model:

- `samples`
- per-period `source`
- `completeness`

## Statistics information

The adapter may expose operational information under:

```text
summary.statistics.info.*
```

This includes status information such as:

- active historical source
- last statistics update
- last history error

These states describe adapter operation and are separate from the public period values.

## Battery analysis

| State | Unit | Meaning |
|---|---:|---|
| `devices.<serial>.battery.model` | text | Configured model name or `notConfigured` |
| `devices.<serial>.battery.nominalCapacity` | kWh | Nominal capacity used by the EFC formula |
| `devices.<serial>.battery.usableCapacity` | kWh | Usable AC capacity retained for later features |
| `devices.<serial>.battery.cycles.reported` | cycles | Unmodified SAX live field `data_cycle` |
| `devices.<serial>.battery.cycles.<period>` | cycles | Locally calculated equivalent full cycles |
| `summary.battery.cycles.<period>` | cycles | Capacity-weighted combined EFC |
| `devices.<serial>.battery.health.value` | % | Median AC-side capacity estimate after five qualified discharges; otherwise `null` |
| `summary.battery.health.value` | % | Combined estimate when every configured device has a result |
| `devices.<serial>.battery.health.status` | text | `collectingData`, `insufficientData` or `available` |
| `summary.battery.health.status` | text | Combined availability status |
| `devices.<serial>.battery.health.validRuns` | count | Qualified discharge runs |
| `devices.<serial>.battery.health.requiredRuns` | count | Required qualified runs, currently 5 |
| `devices.<serial>.battery.health.rejectedRuns` | count | Short, interrupted or implausible completed runs |
| `devices.<serial>.battery.health.activeRun` | text | `active` while a charging or discharging run is being observed; otherwise `idle` |
| `devices.<serial>.battery.health.activeRunDirection` | text | `charging`, `discharging` or `idle` |
| `devices.<serial>.battery.health.activeRunSocStart` | % | SOC at the start of the active run |
| `devices.<serial>.battery.health.activeRunSocCurrent` | % | Most recently observed SOC of the active run |
| `devices.<serial>.battery.health.activeRunEnergy` | kWh | Energy integrated from battery power during the active run |
| `devices.<serial>.battery.health.activeRunStartedAt` | ISO timestamp | Start of the active run |
| `devices.<serial>.battery.health.dataCollectionStartedAt` | ISO timestamp | Start of persistent health-data collection |
| `devices.<serial>.battery.health.lastEvaluation` | ISO timestamp | Time at which the last completed run was accepted or rejected |
| `devices.<serial>.battery.health.progress` | JSON | Internal persistent tracker checkpoint; do not edit |
| `summary.battery.health.validRuns` | count | Sum of valid runs across configured devices |
| `summary.battery.health.requiredRuns` | count | Sum of required runs across configured devices |
| `summary.battery.health.rejectedRuns` | count | Sum of rejected runs across configured devices |
| `summary.battery.health.activeRun` | text | `active` when any device currently has an active run; otherwise `idle` |
| `summary.battery.health.activeRunDirection` | text | `mixed`; inspect device states for the actual direction |
| `summary.battery.health.activeRunSocStart` | % | Always `null`; SOC progress is device-specific |
| `summary.battery.health.activeRunSocCurrent` | % | Always `null`; SOC progress is device-specific |
| `summary.battery.health.activeRunEnergy` | kWh | Always `null`; energy progress is device-specific |
| `summary.battery.health.activeRunStartedAt` | ISO timestamp | Empty; start time is device-specific |
| `summary.battery.health.dataCollectionStartedAt` | ISO timestamp | Earliest collection start across configured devices |
| `summary.battery.health.lastEvaluation` | ISO timestamp | Most recent run evaluation across configured devices |

The complete formulas, model table, source distinction, multi-device aggregation and limitations are documented in [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md).