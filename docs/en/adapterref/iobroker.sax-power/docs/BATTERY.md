---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# Battery models, equivalent full cycles and health

## Scope and terminology

All currently supported SAX Power systems are AC-coupled battery storage systems. The adapter therefore treats the energy values returned by the SAX Power energy-chart API as AC-side values.

The adapter deliberately separates:

- the cycle counter reported by SAX Power (`data_cycle`)
- equivalent full cycles calculated transparently from cloud history
- an explicitly estimated battery-health value calculated by the adapter

These values are not interchangeable.

## Supported models and capacities

| Configuration ID | Model | Nominal capacity | Usable capacity |
|---|---|---:|---:|
| `home-5.8` | SAX Power Home 5.8 kWh | 5.76 kWh | 5.20 kWh |
| `home-plus-7.7` | SAX Power Home Plus 7.7 kWh | 7.68 kWh | 7.00 kWh |

The nominal capacity is used for the cycle calculation because comparison with the SAX-reported counter indicates that SAX uses nominal capacity as well. The usable capacity is the reference capacity for the health estimate and remains available for later energy-management features.

The dashboard API currently does not provide a reliable model identifier. The adapter automatically discovers the storage systems associated with the SAX Power account and uses their serial numbers only as internal stable identifiers. Users cannot add or rename devices in the administration interface; they only assign a model to each detected storage system. Without an assignment, the adapter leaves capacity-dependent calculated values unavailable instead of guessing.

The status page shows the reported counter, calculated day/month/year/total values and the health availability for every detected storage system. When multiple systems exist, it additionally shows the capacity-weighted combined cycle values. The week value remains available as an ioBroker object but is intentionally omitted from the compact administration overview.

## Reported cycle count

The live-data field `data_cycle` is exposed as:

```text
devices.<serialNumber>.battery.cycles.reported
```

It is the unmodified counter reported by SAX Power. It may be rounded and may use internal rules that are not documented publicly.

## Calculated equivalent full cycles

For each device and period, the adapter calculates:

\[
EFC = \frac{E_{charge} + E_{discharge}}{2 \times C_{nominal}}
\]

Where:

- \(E_{charge}\) is charged AC energy in kWh for the period
- \(E_{discharge}\) is discharged AC energy in kWh for the period
- \(C_{nominal}\) is the configured nominal battery capacity in kWh

The result is rounded to three decimal places. Periods are `day`, `week`, `month`, `year`, and `total`.

Example for a Home 5.8 system:

```text
(2711.74 kWh + 2433.62 kWh) / (2 × 5.76 kWh) = 446.646 cycles
```

The calculated total describes only the history supplied by the SAX Power cloud. It can differ slightly from `cycles.reported` because of rounding, unavailable history, AC conversion losses, or internal SAX rules.

## Multiple storage systems

Cycle values are never added. The combined installation value is calculated from combined throughput and combined nominal capacity:

\[
EFC_{system} =
\frac{\sum_i (E_{charge,i} + E_{discharge,i})}
{2 \times \sum_i C_{nominal,i}}
\]

This is a capacity-weighted equivalent full-cycle value for the complete installed storage system. All detected devices must have a configured model; otherwise the combined capacity-dependent result remains unavailable.

## Battery health

The investigated SAX Power dashboard traffic contains no direct state-of-health value. The adapter therefore derives an explicitly estimated value from qualified live discharge runs. Until enough runs exist it writes `null` and exposes collection progress through `validRuns`, `requiredRuns`, `rejectedRuns` and the `activeRun*` states.

The value is called **estimated battery health**, not BMS SoH. Each qualified run uses:

\[
Health_{estimated} =
\frac{E_{discharged,observed}}{C_{usable,reference} \times \frac{SOC_{start} - SOC_{end}}{100}} \times 100\%
\]

The observed discharged energy is integrated from the absolute battery power reported by the SAX cloud and the elapsed time between consecutive samples:

\[
E_{discharged,observed} = \sum_i \frac{|P_i| \times \Delta t_i}{3{,}600{,}000}
\]

with power in watts, elapsed time in milliseconds and the result in kWh. The reference energy is the configured model's usable capacity multiplied by the observed SOC span.

The first sample starts a run but contributes no energy because no preceding interval exists. Every later sample attributes its reported absolute power to the elapsed interval since the previous sample (rectangular integration). Consequently, accuracy depends on the cloud sampling interval and on the accuracy of the reported SOC and power values.

A run is evaluated whenever the direction changes, usable sampling stops or battery power falls below 100 W. It is valid only when all of the following conditions hold:

- the run direction is discharging;
- the SOC span from start to end is at least 40 percentage points;
- every integrated interval is positive and no longer than 15 minutes;
- SOC remains in the range 0–100%;
- SOC does not rise by more than two percentage points between consecutive samples during discharge;
- integrated energy is greater than zero;
- the resulting estimate is finite and between 50% and 120%.

Charging runs are tracked for live progress but rejected for capacity estimation because AC charging losses would bias the result. Short, interrupted, reversed, implausible and charging runs increment `rejectedRuns` when evaluated.

After five valid discharge runs the adapter publishes the median of the latest five estimates. The median makes the result less sensitive to a single unusually high or low qualified run. Individual accepted estimates are stored internally with two decimals; the published median is rounded to one decimal and limited to 0–110%. A run estimate outside 50–120% is rejected before median calculation. Up to 20 recent accepted estimates are retained so later valid runs continue to refresh the published five-run window.

The complete tracker checkpoint is persisted in `devices.<serial>.battery.health.progress`. This includes counters, accepted estimates, collection and evaluation timestamps, plus any active run. Collection therefore continues after an adapter restart. The state is internal (`role: json`) and should not be edited manually.

Health status semantics:

- `collectingData`: no run has been evaluated yet;
- `insufficientData`: at least one valid or rejected run exists, but fewer than five valid runs are available;
- `available`: five valid runs exist and an estimate is published.

For multiple storage systems, `summary.battery.health.value` is available only when every configured device has an estimate. It is the arithmetic mean of the individual device estimates, rounded to one decimal. Until then the summary status is `collectingData`; `insufficientData` is exposed per device. Summary run counters are sums across devices; active-run detail remains device-specific.

## Data sources and limitations

- Live counter: SAX Power dashboard live-data response, field `data_cycle`
- Period energy: SAX Power energy-chart history, fields documented in [FIELD_REFERENCE.md](/#/docs/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md)
- Model capacities: explicit adapter model table and per-serial-number assignment
- Calculated cycles: local deterministic calculation; not written back to SAX Power
- Health: local AC-side estimate after five qualified discharge runs; never a SAX/BMS SoH value

The estimate is not a laboratory capacity measurement. In particular, AC conversion losses, auxiliary consumption, SOC quantisation, cloud sampling cadence, temperature and operating conditions can influence it. It is intended as a transparent long-term indicator, not as proof of a warranty claim.

The SAX Power dashboard API is undocumented and may change. The adapter retains the raw device response under diagnostics to support future verification.