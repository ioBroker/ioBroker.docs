---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# ioBroker object structure

## Battery-health progress

Each `devices.<serialNumber>.battery.health` channel exposes the estimated `value`, availability `status`, `validRuns`, `requiredRuns`, `rejectedRuns`, current-run direction/SOC/energy/timestamps, collection start and last evaluation. The `progress` JSON state is the persistent internal checkpoint. `summary.battery.health` aggregates the visible counters and result across configured devices.

## Root structure

```text
sax-power.0
├── info
├── live
├── devices
│   └── <serialNumber>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
│           ├── day
│           ├── week
│           ├── month
│           ├── year
│           └── total
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

`summary` contains only installation-wide values. `devices.<serialNumber>` always contains the values of one physical storage device.

## `info`

Adapter runtime information is stored below:

```text
info.*
```

The standard ioBroker connection state remains the primary indication of whether the adapter is connected.

Additional runtime information may include:

- last update
- last error
- diagnostic status

## Root `live`

The root live channel contains aggregated installation values:

```text
live
├── pvPower
├── houseConsumptionPower
├── gridPower
├── gridDirection
├── batteryPower
├── batteryDirection
├── soc
├── deviceCount
└── lastUpdate
```

These values are intended for:

- the adapter administration dashboard
- VIS
- scripts
- Grafana or other history/visualization adapters

## `devices`

Every discovered SAX Power storage device is represented by its serial number:

```text
devices.<serialNumber>
```

### Device information

```text
devices.<serialNumber>.info
```

Typical states include:

- `name`
- `type`
- `serialNumber`
- `firmware`
- `dataCycle`
- `lastUpdate`

### Device live values

```text
devices.<serialNumber>.live
```

States:

- `batteryChargePower`
- `batteryDischargePower`
- `batteryPower`
- `batteryDirection`
- `gridImportPower`
- `gridExportPower`
- `gridPower`
- `gridDirection`
- `gridVoltage`
- `pvPower`
- `soc`

Optional cloud fields remain `null` when unavailable.

## Device battery analysis

```text
devices.<serialNumber>.battery
├── model
├── nominalCapacity
├── usableCapacity
├── cycles
│   ├── reported
│   ├── day
│   ├── week
│   ├── month
│   ├── year
│   └── total
├── health
│   ├── value
│   ├── status
│   ├── validRuns
│   ├── requiredRuns
│   ├── rejectedRuns
│   ├── activeRun
│   ├── activeRunDirection
│   ├── activeRunSocStart
│   ├── activeRunSocCurrent
│   ├── activeRunEnergy
│   ├── activeRunStartedAt
│   ├── dataCollectionStartedAt
│   ├── lastEvaluation
│   └── progress
└── info.lastUpdate
```

`cycles.reported` is the SAX `data_cycle` value. Period values are calculated. `health.value` remains `null` until five qualified discharge runs exist. `progress` is the persistent internal JSON checkpoint; all other health states are public, read-only observations. `activeRun*` describes the currently observed run, while `validRuns`, `requiredRuns` and `rejectedRuns` make the evaluation progress visible. See [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) for the exact formula, integration method, validation rules and status semantics.

## Combined battery analysis

```text
summary.battery
├── deviceCount
├── nominalCapacity
├── usableCapacity
├── cycles.<day|week|month|year|total>
├── health.value
├── health.status
├── health.validRuns
├── health.requiredRuns
├── health.rejectedRuns
├── health.activeRun
├── health.activeRunDirection
├── health.activeRunSocStart
├── health.activeRunSocCurrent
├── health.activeRunEnergy
├── health.activeRunStartedAt
├── health.dataCollectionStartedAt
├── health.lastEvaluation
└── info.lastUpdate
```

Combined cycles are capacity-weighted and are not the sum of device cycle counts. Summary health counters are summed across devices. Active-run detail is intentionally empty or `mixed`, because progress must be inspected per device. The internal `progress` state exists only below individual devices. See [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) for formulas and availability rules.

## Device statistics

```text
devices.<serialNumber>.statistics.<period>
```

Periods:

- `day`
- `week`
- `month`
- `year`
- `total`

Each period contains:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

## Aggregated statistics

```text
summary.statistics.<period>
```

The summary statistics tree uses the same period and state structure as each device. Energy values are summed across all detected storage devices.

## Statistics runtime information

```text
summary.statistics.info
```

This channel contains operational metadata for the history subsystem, such as the current source, last update, and last error.

## Removed technical states

The following technical states are not exposed in the version 1.0 public period structure:

```text
samples
source
completeness
```

Existing objects from older development builds are removed automatically when the adapter initializes the period objects.

## Writable states

Version 1.0 does not create public writable SAX Power or Modbus control states.