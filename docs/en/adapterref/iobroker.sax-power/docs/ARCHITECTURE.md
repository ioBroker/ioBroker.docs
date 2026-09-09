---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# Architecture

## Overview

The adapter is divided into a cloud client, parsers, state engines, runtime scheduling, and a React-based administration interface.

```text
SAX Power Cloud
      │
      ▼
SaxPowerApiClient
      │
      ├── live data
      └── energy chart history
      │
      ▼
Parsers
      │
      ├── SaxPowerParser
      └── SaxPowerHistoryParser
      │
      ▼
State engines
      │
      ├── StateEngine
      └── StatisticsStateEngine
      │
      ▼
ioBroker object database
      │
      ▼
React administration interface
```

## Runtime flow

1. The adapter validates its configuration.
2. It authenticates against the SAX Power cloud.
3. It discovers all storage devices assigned to the account.
4. It requests current live data at the configured polling interval.
5. It normalizes cloud values into a stable internal device model.
6. It writes device-specific states.
7. It writes aggregated root live states.
8. It updates historical statistics on the dedicated history schedule.
9. The administration interface reads ioBroker states through the existing ioBroker admin socket.

## Cloud polling

The minimum supported interval is 60 seconds.

The administration dashboard refreshes its displayed ioBroker states more frequently, but this does **not** cause additional cloud requests. The cloud polling schedule and the UI refresh schedule are independent.

## Device-specific state model

Each detected storage device is represented below:

```text
devices.<serialNumber>
```

The device tree contains:

- static and slowly changing information
- current live measurements
- historical statistics

## Aggregated live model

The adapter writes combined live values below:

```text
live
```

Aggregation rules:

- Battery power: sum of all available battery power values
- State of charge: arithmetic mean of all available storage SOC values
- PV power: first available installation-level value
- Grid power: first available installation-level value
- House consumption: calculated only when PV, grid, and battery power are all available

PV and grid values are treated as installation-level measurements because the SAX Power cloud may return the same value for multiple storage devices. They are therefore not summed.

## Power sign convention

The normalized model uses:

### Grid power

- positive: grid import
- negative: grid export
- zero: idle

### Battery power

- positive: battery discharge
- negative: battery charge
- zero: idle

House consumption is calculated as:

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

The result is limited to a minimum of zero. If one required input is unavailable, the calculated value is stored as `null`.

## Historical statistics

The statistics parser normalizes energy-chart responses into five periods:

- day
- week
- month
- year
- total

Statistics are written:

- below every device
- below the adapter root as an aggregate across all devices

## Administration interface

The adapter uses a custom React administration interface based on the ioBroker React adapter framework and Material UI.

The interface:

- follows the ioBroker light or dark theme
- has no separate theme switch
- is responsive
- supports scrolling on smaller screens
- reads runtime values from ioBroker states
- never communicates directly with the SAX Power cloud

## Error handling

The adapter separates:

- configuration errors
- authentication errors
- live polling errors
- history polling errors
- parsing errors

Sensitive information such as passwords and bearer tokens must never be written to logs.

## Version 1.0 boundaries

Version 1.0 is read-only with respect to SAX Power and Modbus.

The following are not part of the runtime architecture yet:

- writable control states
- charging control logic
- Modbus write operations
- configurable automation dependencies