---
chapters: {"pages":{"en/adapterref/iobroker.go-e-charger/README.md":{"title":{"en":"ioBroker.go-eCharger"},"content":"en/adapterref/iobroker.go-e-charger/README.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md":{"title":{"en":"Migrating from the go-e adapter (ioBroker.go-e) to go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md":{"title":{"en":"Umstieg vom go-e-Adapter (ioBroker.go-e) auf go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md"}}}
---
![Logo](admin/go-eCharger.png)

# ioBroker.go-eCharger

[![NPM version](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)](https://www.npmjs.com/package/iobroker.go-e-charger)
[![Downloads](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.go-e-charger)
![node-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-go-e-charger)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.go-e-charger)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/go-e-charger-stable.svg)
![Installed](https://iobroker.live/badges/go-e-charger-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)](https://nodei.co/npm/iobroker.go-e-charger/)

## Sentry

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## ioBroker adapter for go-e Charger EV wallboxes

This adapter integrates one or more go-e Charger wallboxes into your ioBroker home automation. It cyclically polls each wallbox via its local HTTP API, provides all relevant data as ioBroker states, and lets you control charging directly from your smart home.

For more information about the go-e Charger hardware, visit the manufacturer's website: [go-e GmbH](https://go-e.com).

### Features

- supports multiple go-e Chargers within a single adapter instance
- monitoring of car state, charging power, charging current, grid phases, and energy statistics
- **ChargeNOW** – start charging immediately at a configurable current
- **ChargeManager** – automatic PV surplus charging: the charging current is continuously adjusted to the available solar power, taking house consumption and the state of charge of your home battery into account. Charging of your EV can be delayed until the home battery has reached a configurable minimum state of charge.

    > **Note:** When ChargeManager is enabled on several chargers at the same time, the available surplus is split between them in the order of the wallbox list – see [Several wallboxes on one PV surplus](#several-wallboxes-on-one-pv-surplus).

- switching between 1-phase and 3-phase charging (hardware generation 3 and newer)
- energy statistics per RFID card (card name, ID, and charged energy)
- read-only mode per wallbox – monitor a charger purely, without sending **any** control commands to it (no charge release, no charging current, no phase switching), e.g. when charging is controlled elsewhere or access is managed via RFID tags

Tested with firmware V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2, V60.4, V60.5, V60.6 and with up to 3 chargers operated in parallel.

### Requirements

- For hardware generation 3 and 4 (e.g. HOME+, HOMEfix, Gemini) you have to enable "HTTP API v1" in your go-e app.
- For phase switching you additionally have to enable "HTTP API v2" in your go-e app (hardware generation 3 and newer).
- Chargers without HTTP API v1 (e.g. go-e Charger CORE / PRO with firmware 60.x) are detected automatically and read and controlled over "HTTP API v2" only, which has to be enabled in the go-e app. On these chargers the adapter gives and withdraws the charge release with the force state (`frc` on / off) and sets the charging current with `amp`. Password protection (authentication) of the local HTTP API is not supported yet; how the charger behaves with it (`hsa`) is not documented by go-e and unverified (a go-e CORE with firmware 60.4 answers local reads with `hsa` enabled, and its app offers no password setting).
- A charger that requires RFID/app authorization ignores the charge release (force state) until it is authorized - the adapter logs this once. For chargers used over HTTP API v2 only, the option "Start transaction without RFID on API-v2-only chargers (trx=0)" in the charger settings starts a transaction without card before each release while a vehicle is plugged in. It is off by default, because it bypasses the RFID/app access protection of the charger.

## Configuration

Add one entry per go-e Charger to the wallbox list and enter its IP address. Optionally assign a name to each charger.

Enable **read-only mode** for a charger if the adapter should only read its data and never write to it. In read-only mode the adapter sends no control commands at all – neither the charge release, nor the charging current, nor phase switching. The ChargeNOW and ChargeManager states can still be toggled, but they have no effect on a read-only charger. Use this mode when the charging of that wallbox is controlled by another system or managed locally via RFID tags.

The poll cycle time defines how often the adapter reads data from the chargers and adjusts the charging current (minimum 3 seconds, default 10 seconds).

#### Per-wallbox current limits

Each wallbox can optionally be given its own **minimum** and **maximum charging current** [A]. These apply to **both** ChargeManager (PV surplus) and ChargeNOW, for example to throttle a single charger or to balance the load between several boxes on a shared supply.

- A value of `0` means "not set": the minimum falls back to the technical minimum of 6 A, and the maximum falls back to the **maximum charging current per wallbox** from the standard settings.
- A per-box maximum can only lower a charger below that default, never raise it above.
- If the configured minimum ends up higher than the maximum, the minimum is clamped down to the maximum and a warning is logged.

The adapter also reads the current caps reported by each charger – the absolute maximum current, the cable current limit and (via API v2) the minimum charging current – and folds them into the effective limits, so a charger is never driven beyond what its hardware or the plugged cable allows. The detected caps are published as `Wallbox_X.info.hardwareMaxChargeCurrent` and `Wallbox_X.info.hardwareMinChargeCurrent` to help you choose sensible per-box values.

### PV surplus charging with ChargeManager

ChargeManager calculates the charging current from numeric ioBroker states supplied by an energy-management, inverter, meter, or user-created data source. It does not depend on a particular vendor, but the selected states must represent the quantities described below.

The ChargeManager configuration page is organized in three blocks that follow the flow of the calculation. Options sit directly next to the object they belong to, fields that do not apply to the current selection are hidden, and every value field shows its unit:

| Block               | Settings                                                                                                                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Surplus input**   | **Surplus source**; for _PV generation and house consumption_: solar power and home power consumption objects, each with its Negate option, and _Charger consumption is included_; for _Grid meter_: grid power object with Negate, Ack-only and maximum age [s] |
| **Home battery**    | **Home battery mode**; unless _Disabled_: SoC object, SoC hysteresis [%] and maximum SoC age [s]; in _Battery priority_ also the maximum battery bonus [W]                                                                                                       |
| **Surplus control** | Grid reserve power [W] and minimum ChargeManager current [A]                                                                                                                                                                                                     |

Select the **Surplus source** in the first block and configure the object IDs of the following states:

- _PV generation and house consumption_ (default): currently available solar power [W] and current home power consumption [W]
- _Grid meter (signed import/export)_: current grid power [W], see [Grid meter input](#grid-meter-input) below
- current state of charge of your home battery [%] (only required in the battery-aware modes, see _Home battery mode_ below)

#### Input requirements

| Input                        | Expected value                 | Unit | Sign                 |
| ---------------------------- | ------------------------------ | ---- | -------------------- |
| Solar power                  | Total current PV generation    | W    | Positive generation  |
| Home power consumption       | Total current household demand | W    | Positive consumption |
| Home battery state of charge | Current battery charge level   | %    | 0 to 100             |

All configured states must contain numeric values. Power values in kW must be converted to W before they are selected. If a source reports PV generation or household consumption with the opposite sign, enable **Negate solar power** or **Negate home power consumption** next to the object (default off). If only a single grid import/export value is available, use the grid meter input instead of the two values above.

If no home battery is installed, set the **Home battery mode** to _Disabled_ (see below). No battery state of charge has to be configured, and ChargeManager charges purely from the available PV surplus. The former helper-state workaround (a constant state set to `Settings.Setpoint_HomeBatSoC`) is no longer needed.

#### Wallbox consumption in the home-consumption value

Enable **Charger consumption is included in the home power consumption value** when the selected home-consumption state rises by approximately the charging power after charging starts. ChargeManager then adds the measured wallbox power back before calculating the available surplus. This prevents the controller from treating its own charging load as additional household demand.

Leave the option disabled when the selected state already excludes wallbox consumption.

#### Grid meter input

Many installations only provide one signed value at the grid connection point (smart meter, Shelly 3EM, inverter `P_Grid`, …). Set **Surplus source** to _Grid meter (signed import/export)_ and select this state as **grid power** [W]:

| Grid power | Meaning                        |
| ---------- | ------------------------------ |
| positive   | import (drawing from the grid) |
| negative   | export (feeding into the grid) |

This is the same convention as the go-e API v2 (`pGrid < 0` = feeding the grid). The PV generation and home power consumption objects are then not used, even if they are still filled in.

- **Negate grid power** – inverts the sign for sources that report export as positive and import as negative (e.g. a Fronius `P_Grid` that was used with "Negate" in the old go-e adapter).
- **Only use acknowledged values (ack=true)** – ignores updates written with `ack=false` (e.g. commands from scripts); the last acknowledged value stays in use.
- **Maximum grid power age** [s] (default 0 = off) – surplus charging stops when the grid power has not been updated within this time, so a dead meter cannot keep the car charging from the grid.

The grid value always contains the power of the wallboxes, so ChargeManager always adds the measured wallbox power back (the option _Charger consumption is included_ is not used in this mode). A missing, non-numeric or too old grid value stops surplus charging, just like an invalid PV or consumption value. The adapter subscribes to the grid power state and uses its latest accepted value in every cycle.

#### Calculation

ChargeManager uses the following calculation once per poll cycle:

```text
available power =
    solar power
  - home power consumption
  + wallbox power, if it is included in home power consumption
  - grid reserve
  + battery bonus (Battery priority mode only)

grid meter input:
available power =
  - grid power (import positive, export negative)
  + wallbox power
  - grid reserve
  + battery bonus (Battery priority mode only)

target current = floor(available power / 230 V / active phases)
```

Six settings on the ChargeManager configuration page tune this calculation:

- **Home battery mode** (default _Battery priority_) – how the home battery is taken into account:
    - _Disabled_ – no home battery is used. No SoC state has to be configured, and no battery power is ever assigned to the car.
    - _Minimum SOC_ – EV charging is blocked below `Settings.Setpoint_HomeBatSoC`, but the battery never contributes power to the car.
    - _Battery priority_ – as above, plus the battery bonus described below.
- **Battery SoC hysteresis** [%] (default 0) – how far the SoC may fall below the minimum before a _running_ controller stops. It keeps a battery hovering around its minimum from toggling the charge release every cycle; starting still requires the full minimum SoC.
- **Maximum battery SoC age** [s] (default 0 = off) – surplus control stops when the SoC state has not been updated within this time, so a dead helper state cannot silently keep the car charging.
- **Grid reserve power** [W] (default 100) – power kept free on the grid connection instead of being assigned to the car. Increase it to keep more safety headroom; set it to `0` to hand the full surplus to the car.
- **Maximum battery bonus** [W] (default 2000) – how much extra power, on top of the pure solar surplus, may be drawn while the home battery is above its minimum state of charge. The bonus is `0` when the battery is exactly at the minimum SoC and grows linearly to this maximum as the battery approaches 100 %, so a fuller battery lets the car charge faster. Set it to `0` to charge purely from the measured solar surplus without ever discharging the home battery into the car.
- **Minimum ChargeManager current** [A] (default 6) – the surplus charging current below which the charger is switched off after a short delay. This applies to PV surplus charging only.

The **maximum charging current per wallbox** [A] (default 16, up to 32) is configured on the **standard settings page**, not here: it is the upper limit and default for each individual wallbox rather than a ChargeManager tuning value. It caps the current the adapter will ever assign to **a single** wallbox, in **both** ChargeManager (PV surplus) **and** ChargeNOW. A tighter limit can be set per box in the wallbox list; the summed current of all wallboxes is limited separately by the **maximum total charging current**.

> **⚠️ Do not set the maximum charging current per wallbox higher than your go-e Charger hardware and the circuit feeding that wallbox support.** go-e Charger models are rated for different maximum currents (e.g. 16 A or 32 A), and the actual limit also depends on your cable, plug and wiring. Setting a value above the hardware or circuit rating can trip protection devices or damage equipment. When in doubt, keep the default of 16 A.

In the battery-aware modes, EV charging is disabled below `Settings.Setpoint_HomeBatSoC` so that the home battery has priority. Charging starts once the internal target reaches 10 A (or the minimum current if it is set higher); a running charge then follows the target down to the minimum current. The calculated current is limited to the configured maximum, and the internal current target changes by at most 1 A per poll cycle to reduce sudden changes.

#### Several wallboxes on one PV surplus

The surplus is a single shared resource, so it is split between the wallboxes rather than offered to each of them in full. The wallboxes are served in the **order of the wallbox list**, which is therefore also their priority: the first entry takes as much surplus as it can use, and the following entries only see what is left. Reorder the list to change which car is charged first.

A wallbox only reserves surplus while a vehicle is connected to it. An empty wallbox is skipped, so it cannot hold back surplus that another wallbox could use right now.

The per-wallbox current limits described above still apply to each box individually, which lets you cap a single charger even when it is first in the list.

#### Enabling ChargeManager

After the adapter has started, use the writable states below. Replace instance `0` and wallbox number `0` where necessary.

| State                                             | Purpose                                                         |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `go-e-charger.0.Settings.Setpoint_HomeBatSoC`     | Minimum home-battery SoC before surplus charging is allowed     |
| `go-e-charger.0.Wallbox_0.Settings.ChargeManager` | Enables or disables PV surplus control                          |
| `go-e-charger.0.Wallbox_0.Settings.ChargeNOW`     | Forces charging; switches ChargeManager off                     |
| `go-e-charger.0.Wallbox_0.Settings.ChargeCurrent` | Current used by ChargeNOW                                       |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase`  | Selects one-phase or three-phase charging on supported hardware |
| `go-e-charger.0.Wallbox_0.Settings.PhaseMode`     | `1` / `3` fixes the phase count, `0` switches automatically     |

For surplus charging, set `ChargeManager` to `true`. ChargeNOW charges at the configured `ChargeCurrent` without considering the available surplus. The two modes are exclusive: switching one on switches the other off.

ChargeNOW ends by itself and switches off when the vehicle is unplugged, or, with **withdraw release when the vehicle stops charging** enabled for the wallbox, when the vehicle draws no power for 5 minutes. Switching ChargeNOW on before plugging in is fine: it waits for the vehicle without waking the charger.

#### One-phase and three-phase charging

On hardware generation 3 and newer, `Charge3Phase` selects the phase mode:

- `false`: one-phase charging
- `true`: three-phase charging

The go-e app also offers the charger's own automatic phase switching (`psm` 0, shown as "auto"). The adapter deliberately overrides it with a fixed one- or three-phase mode (`psm` 1/2) as soon as ChargeNOW or the ChargeManager controls the charger, because the charger's own switching causes trouble with several chargers on rotated phases. The override is logged once. While a charger is set to automatic phase switching, `Power.EnabledPhases` shows the phases it charges on (0 while idle).

Because the current implementation starts charging when its internal target exceeds 9 A, the effective starting point is 10 A. This requires approximately 2.3 kW in one-phase mode or 6.9 kW in three-phase mode after the reserve and battery adjustments. One-phase mode therefore provides a wider operating range for smaller PV systems or variable weather.

##### Automatic phase switching

Enable **automatic 1-/3-phase switching** per wallbox (gen 3+ only, off by default) to let ChargeManager pick the phase mode from the available surplus:

- It switches **up to three phases** once the surplus exceeds both the one-phase maximum and 1.25 times the three-phase minimum (5175 W with 6-16 A), so three-phase charging starts with headroom above its own floor instead of right on it.
- It switches **down to one phase** once the surplus drops below the three-phase minimum (4140 W at 6 A) but still carries one-phase charging at the minimum (1380 W at 6 A). Below that, one phase would not charge either, so the charge stops instead of switching.
- More surplus must hold for 1 minute before switching up, less surplus for 3 minutes before switching down. A three-phase charge that would otherwise be stopped for too little surplus switches down at once. No switch follows before the charger's own minimum time between two switches (`mptwt`, 10 minutes by default) has passed: every switch costs the charger a pause, and some firmware versions hang in that pause. A switch written while no charge runs (the vehicle waits for the release, has finished or is not plugged in) interrupts nothing, so it does not start this wait.
- The phase count is only written to the charger while the charge release is active (force state "on"). While the charger is held off, the phase count for the next start is only planned: it follows the surplus at once without a dwell, uses the start current (10 A) instead of the minimum, sizes the charging current right away and is written right after the next charge release. The same applies to a fixed phase mode and to ChargeNOW.
- A charger set to its own automatic phase switching (`psm` 0) is taken over from the phases it charges on; while it does not charge, the start phase is picked from the surplus right away.

The option makes automatic switching available; `Settings.PhaseMode` selects it at runtime without restarting the adapter:

- `0`: automatic switching (only accepted while the option is enabled and on gen 3+ hardware; the default then), starts from the phase count the charger is using
- `1`: fixed one-phase charging, sets `Charge3Phase` to `false`
- `3`: fixed three-phase charging, sets `Charge3Phase` to `true`

In automatic mode the ChargeManager picks the phase count without changing `Charge3Phase`, which keeps applying to ChargeNOW. Writing `Charge3Phase` directly does not end automatic mode. Because a switch briefly interrupts charging and not every vehicle handles it gracefully, the option is off by default.

#### Operating modes

| ChargeNOW | ChargeManager | Result                                     |
| --------- | ------------- | ------------------------------------------ |
| `false`   | `false`       | The adapter does not charge                |
| `false`   | `true`        | Charging follows the calculated PV surplus |
| `true`    | `false`       | Forced charging at `ChargeCurrent`         |

With both modes off, the adapter withdraws only a charge release it gave itself. A charge started from the go-e app, the button on the charger or the charger's own default is left alone.

In read-only mode, these states can still be changed but no resulting control command is sent to the charger.

#### Verification and troubleshooting

Before relying on automatic charging, verify the selected input states in the ioBroker object view:

1. Solar power is close to zero at night and follows current generation during the day.
2. Home power consumption remains positive and reacts plausibly when household loads are switched on.
3. Battery state of charge remains between 0 and 100.
4. All power values are expressed in W rather than kW.
5. The wallbox-consumption option matches whether charging power is included in the selected home-consumption value.
6. `Wallbox_0.info.connection` is `true`.
7. `Wallbox_0.Power.Charge`, `Wallbox_0.Power.GridPhases`, and, on supported hardware, `Wallbox_0.Power.EnabledPhases` contain plausible values.

Charging may take several poll cycles to start because the internal target increases by only 1 A per cycle. With the default 10-second cycle and an initial target of 0 A, reaching the default 10 A starting point can take approximately 100 seconds.

When ChargeManager runs several wallboxes at once, the PV surplus is shared between them in wallbox-list order, so the first entry has priority and later ones only receive the remaining surplus (see [PV surplus charging with ChargeManager](#pv-surplus-charging-with-chargemanager) above).

#### Total current budget (fuse protection)

To protect a shared fuse or supply line feeding several wallboxes, set the **maximum total charging current** [A] on the standard settings page. It is an installation-wide budget: the summed charging current of **all** wallboxes never exceeds it, in **both** ChargeManager and ChargeNOW. Unlike the PV surplus (which is measured in watts), the fuse is protected in **amperes**, because a feed rated for e.g. 20 A carries 20 A regardless of whether a wallbox charges one- or three-phase.

The budget is allocated in priority order: ChargeNOW wallboxes first, then ChargeManager wallboxes in wallbox-list order. A wallbox that no longer fits is throttled to the remaining current, or switched off when even its minimum would not fit. While the budget is active, a wallbox without a connected vehicle is kept off and reserves nothing (a vehicle counts as connected in the go-e car states charging, waiting for the car and charge finished), so several idle wallboxes plugged in at the same time can never exceed the fuse before the next cycle re-plans, and an idle wallbox never starves one that is already charging.

A value of `0` disables the budget (an active budget needs at least 6 A; new instances start with 16 A); the adapter then does not enforce a combined limit, so make sure the sum of the per-wallbox maximum currents stays within your installation's capacity.

While the budget is active, the adapter also **follows the actually measured charging current**: if a wallbox draws noticeably less than it is allowed (e.g. a vehicle with a lower onboard-charger limit, a car tapering near full, or temperature derating), its unused current is reclaimed after a few cycles and handed to the next wallbox in priority order. The wallbox keeps a small headroom above its real draw and is offered one ampere more each cycle as long as it uses what it gets, so it can grow back to its limit. To stay safe, a wallbox is only ever throttled _down_ to reclaim capacity — its command is never left high while the freed amperes are given away — so the summed current can never exceed the fuse even if a vehicle suddenly ramps back up.

> This is a conservative per-phase-agnostic model: every ampere counts against one budget regardless of which phase it lands on. It never exceeds the fuse rating, but with loads spread across phases it may leave some capacity unused.

## Migrating from the go-e adapter

Coming from the adapter [ioBroker.go-e](https://github.com/MK-2001/ioBroker.go-e)? The migration guide maps datapoints and settings, answers common questions (go-e app mode, HTTP API v1/v2, sign of the input values, running both adapters in parallel with read-only mode) and lists what is not supported yet:

- [Migration guide (English)](/#/docs/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md)
- [Umstiegsanleitung (Deutsch)](/#/docs/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md)

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a>
If you enjoyed this project – or are just feeling generous – consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.12.2 (2026-11-26)

- (typhosj) a charge release the adapter no longer requests is no longer counted as ignored: after the vehicle was unplugged, the charger reports the release as withdrawn by itself, the adapter wrote nothing and kept waiting for its last release - five minutes later the log said the release was ignored 30 times, and a later start at car state 4 could send the release only every 6 cycles from the first attempt on
- (typhosj) ChargeManager: a phase switch written while no charge runs - together with the charge release, while the vehicle waits, has finished or is not plugged in - no longer holds back the next switch for the charger's minimum time between two switches; a start switched to one phase at the release used to wait ten minutes before it could go up to three phases
- (hombach) ChargeManager: documented that on firmware 60.6 a start phase switch does not count towards the charger's minimum time between two switches (`mptwt`), and added a regression test that a switch written before the car draws current does not block the next one

### 1.12.1 (2026-11-26)

- (hombach) added support for firmware V60.4

### 1.12.0 (2026-11-23)

- (typhosj) ChargeManager: the automatic 1-/3-phase switching now keeps a real gap between switching up and switching back down - for a 16 A wallbox both thresholds used to be the same value
- (typhosj) ChargeManager: the automatic phase switching no longer switches down to one phase when the surplus would not be enough for one-phase charging either, waits 1 minute before switching up and 3 minutes before switching down, and never switches again before the charger's own minimum time between two switches has passed - every switch costs the charger a pause, and on some firmware versions it hangs in that pause
- (typhosj) ChargeManager: a three-phase charge whose surplus no longer carries three phases but still carries one now switches down to one phase instead of being stopped - the shutdown delay ran out before the 3-minute down dwell, so the charge stopped and restarted on one phase instead
- (typhosj) the phase count is no longer switched while the charger is held off - neither by the automatic switching, nor by a fixed phase mode, nor by ChargeNOW. The new phase count is planned at once without the switching dwell, sizes the charging current right away and is written right after the next charge release. A switch without a release is never needed, starts the charger's minimum time between two switches, which can then block the switch the start needs, and left the go-e hanging in "min pause duration" for hours on some firmware versions. The info log reports a phase switch when it is written to the charger, the plan only at debug level
- (typhosj) ChargeManager: before a charge starts, the automatic phase switching now plans with the start current (10 A) instead of the minimum current - a surplus between the three-phase minimum and the three-phase start (5520 to 6900 W with 8-16 A) kept the charger on three phases, where it never started, although one phase could have charged at full current
- (typhosj) ChargeManager: a charger set to its own automatic phase switching (`psm` 0) now starts the automatic phase switching from the phases it charges on, or - while it does not charge - picks the start phase from the surplus right away; it used to be switched to one phase first, and the charger's minimum time between two switches then kept a sunny start on one phase for ten minutes
- (hombach) fixed ChargeNOW and ChargeManager never starting with the total current budget (`maxAmpTotal`) active when the charger reported car state 4 (charge finished / paused): the budget took only car states 2 and 3 as a connected vehicle, withdrew the release and logged "waiting for vehicle", and without a release the charger stays at car state 4; car state 4 now counts as a connected vehicle, as everywhere else in the adapter
- (hombach) the maximum total charging current across all wallboxes accepts 0 (budget disabled) again in the admin page, as its label and help say; values 1-5 A are refused; it is placed next to the maximum charging current per wallbox
- (hombach) clarified the labels and help texts of the maximum charging current per wallbox (`maxChargeCurrent`): it is the upper limit and default for each individual wallbox, not the installation fuse; a tighter per-box limit is set in the wallbox list, and the summed current is limited by the maximum total charging current

### 1.11.0 (2026-11-22)

- (hombach) added grid meter input for ChargeManager: one signed grid power value (import positive, export negative) instead of PV generation and house consumption, with Negate, Ack-only and maximum age options (#919)
- (hombach) added Negate options for the solar power and home power consumption objects (#919)
- (hombach) reorganized the ChargeManager configuration page into the logical blocks surplus input, home battery and surplus control: options are placed next to the object they belong to, settings that do not apply to the selected surplus source or home battery mode are hidden, and all value fields show their unit (#919)
- (hombach) added support for chargers without HTTP API v1 (e.g. go-e Charger CORE / PRO, firmware 60.x): they are detected automatically and read and controlled over HTTP API v2 only; HTTP error answers (e.g. 404 for a disabled API, 401/403 for probable password protection) are now logged with a hint instead of asking to verify the IP address; a charger waiting for RFID/app authorization is logged once, and the new charger option "Start transaction without RFID on API-v2-only chargers (trx=0)" (off by default) can authorize it; rejections of API v2 writes are logged with the charger's reason; car states "Initializing" and "Unknown" are no longer shown as "Error"; these chargers are no longer asked for `ast`, `cbl` and `cards` (the go-e CORE 60.4 has none of them, and unknown keys are ignored); the cause of an HTTP 400 on a go-e CORE 60.4 is unknown, and as a safety net a charger that refuses the filtered status with HTTP 400 is read without filter; every HTTP request to a charger is logged at debug level with URL, HTTP status, duration and response length (#939)
- (HombahombachchC) a charger set to its own automatic phase switching (`psm` 0) is still switched to the fixed phase mode of the adapter on purpose - this is now logged once; `Power.EnabledPhases` shows the phases in use instead of 0 while the charger is set to automatic phase switching
- (hombach) moved the Sentry notice near the top of README.md to satisfy the repository checker (#938)
- (hombach) updated iobroker/testing
- (hombach) updated dependencies

### 1.10.2 (2026-11-01)

- (hombach) added a migration guide from the go-e adapter (ioBroker.go-e) in English and German
- (hombach) fixed the RFID card energy (statistics.RFID<n>.chargedEnergy) on gen 3+ chargers freezing at the value read at adapter start: it is now read from the API V2 card keys in Wh precision, with an API V1 fallback refreshed every cycle (#889)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach <go-e-charger@homba.ch>

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