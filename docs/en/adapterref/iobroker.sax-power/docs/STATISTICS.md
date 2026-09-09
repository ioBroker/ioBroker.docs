---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# Historical energy statistics

## Purpose

The adapter provides battery charging and discharging energy values for useful fixed periods.

Statistics are available:

- for every detected storage device
- as an aggregate across all detected storage devices

## Periods

```text
day
week
month
year
total
```

### Day

Values for the current calendar day.

The SAX Power cloud daily chart request is not used directly in version 1.0. Today's values are derived from the current monthly response.

### Week

Values for the current week returned by the SAX Power energy-chart endpoint.

### Month

Values for the current calendar month.

### Year

Values for the current calendar year.

The first timestamp is normalized to an ISO-compatible date such as:

```text
2026-01-01
```

### Total

All available historical battery-energy values.

The first and last timestamps reflect the historical range included by the SAX Power response.

## Public period states

Every period exposes:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

### `chargedEnergy`

Battery energy charged during the selected period, in kWh.

### `dischargedEnergy`

Battery energy discharged during the selected period, in kWh.

### `firstTimestamp`

First included historical measurement or normalized period start.

### `lastTimestamp`

Last included historical measurement.

## Aggregation

Device statistics are written below:

```text
devices.<serialNumber>.statistics.<period>
```

Combined statistics are written below:

```text
summary.statistics.<period>
```

For multiple storage devices:

- charged energy is summed
- discharged energy is summed
- the earliest valid first timestamp is used
- the latest valid last timestamp is used

Battery cycle aggregation is different from energy aggregation: cycle counts are never summed. See [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) for the capacity-weighted formula.

## Internal source

The history subsystem identifies its active source under:

```text
summary.statistics.info.source
```

For the current implementation, this is the SAX Power energy-chart endpoint.

This operational state is not repeated inside every period.

## Removed technical values

Earlier development builds exposed:

- `samples`
- period-specific `source`
- `completeness`

These values are not part of the version 1.0 public object model because they provided little practical value to users and raised avoidable questions.

Existing objects are removed automatically during object initialization.

## Update behavior

Historical statistics run independently of the live-data polling loop.

A failed history update:

- does not stop live measurements
- is recorded in the history status/error states
- is retried on the next scheduled history run

## Data limitations

The adapter can expose only the history returned by the SAX Power cloud.

Possible limitations include:

- missing historical periods
- delayed cloud updates
- incomplete first or last periods
- changes to undocumented cloud response formats

The adapter does not invent missing energy values.