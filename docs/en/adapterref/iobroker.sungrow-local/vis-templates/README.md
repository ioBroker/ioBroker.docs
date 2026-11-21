---
chapters: {"pages":{"en/adapterref/iobroker.sungrow-local/README.md":{"title":{"en":"ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/README.md"},"en/adapterref/iobroker.sungrow-local/README_de.md":{"title":{"en":"ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.sungrow-local/README_de.md"},"en/adapterref/iobroker.sungrow-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/vis-templates/README.md"}}}
---
# vis templates for ioBroker.sungrow-local

Ready-made views for **vis 1** (`iobroker.vis` 1.x). They use only data points of
`sungrow-local.0`, so they work on any installation of this adapter: no scripts and
no other adapters needed. Dark design, 1280 × 800 px. Labels are in German.

| File | Content |
|---|---|
| `view_Sungrow_Fluss.json` | Start page: animated energy flow (PV top, grid left, battery right, house bottom, inverter in the middle). Lines move in flow direction, line width follows the power. |
| `view_Sungrow_Akku.json` | Battery: state of charge, power, voltage/current, SoH, temperature, cycles, today's energy, limits (display only) |
| `view_Sungrow_WR.json` | Inverter & grid: MPPT strings, phases (voltage, current, meter, backup), frequency, power factor |
| `view_Sungrow_Diagnose.json` | Adapter diagnostics: connection, reconnects, per-group round time/response time/timeouts/errors/skipped, write statistics, last errors |
| `widget_Akku-Symbol_blau.json` | Battery symbol as a single widget, blue (as used in the views) |
| `widget_Akku-Symbol_gruen.json` | Battery symbol as a single widget, black frame / green fill for light backgrounds |

## Import

1. Open the vis editor (`http://<iobroker>:8082/vis/edit.html`).
2. For each view: in the editor tab **Views** click **Import view**, paste the content of
   `view_<Name>.json` and enter the name **exactly** as in the file name
   (`Sungrow_Fluss`, `Sungrow_Akku`, `Sungrow_WR`, `Sungrow_Diagnose`).
   The navigation buttons link to these names (`#Sungrow_Akku` …).
3. Battery symbol only: open any view, in the tab **Widgets** click **Import widgets**, paste the
   content of `widget_Akku-Symbol_<colour>.json`.
4. Save. Open `…/vis/index.html#Sungrow_Fluss`.

Different instance? Replace `sungrow-local.0.` with e.g. `sungrow-local.1.` in the
files before importing.

## Calculated values

All calculations are vis bindings (`{a:id;b:id;formula}`) inside the HTML widgets.

- **Battery power with direction:** register 43022 `Battery_power` has no sign.
  The direction comes from the sign of 43021 `Battery_current`
  (**positive = discharging, negative = charging** – verified on the reference installation: positive current,
  falling state of charge; corrected in 0.4.0, earlier templates showed the direction inverted).
  Battery (+ discharge) = `43021 > 0 ? +43022 : (43021 < 0 ? −43022 : 0)`. The battery view shows the current
  with the sign inverted (+ = charging) to match its legend.
- **House consumption** = `max(0, 43034 Total_active_power_output + 35601 power_total-EnergyMeter)`
  (AC output of the inverter + grid; 35601: positive = import, negative = export). It contains no inverter losses
  and does not depend on the battery sign. A generator the inverter does not measure (e.g. a small wind turbine)
  makes it too small; the share bar ("supplied from") still uses PV + battery + grid. 43008 `Load_power` is not used because it reads 0 on several devices.
- **Battery state:** |battery power| < 20 W → idle (no animation), otherwise
  charging/discharging. The light band in the battery moves up when charging
  (3.5 s) and down/left when discharging (5 s). `prefers-reduced-motion` is respected.
- **Remaining time** (discharging) = stored energy ÷ discharge power;
  **full in** (charging) = (capacity − stored) ÷ charge power.
  Stored energy = 43023 SoC × 43039 capacity / 100.
- **Grid line:** orange = import (flows to the inverter), green = export.
  Lines below 10 W (battery: 20 W) are grey and not animated.

## Notes

- Animations are CSS keyframes inside an HTML widget. vis 1 treats every
  `{…}` on one line as a binding. In the CSS, `{` and `}` are therefore never on
  the same line. Keep it that way if you edit the CSS.
- Efficiency on the battery page uses the BMS counters 40746/40748
  (`inputRegisters.2`). Without a BMS block it shows "–".
- The views only display values. They contain no controls that write to the inverter.