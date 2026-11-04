---
chapters: {"pages":{"en/adapterref/iobroker.go-e-charger/README.md":{"title":{"en":"ioBroker.go-eCharger"},"content":"en/adapterref/iobroker.go-e-charger/README.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md":{"title":{"en":"Migrating from the go-e adapter (ioBroker.go-e) to go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md":{"title":{"en":"Umstieg vom go-e-Adapter (ioBroker.go-e) auf go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md"}}}
---
# Migrating from the go-e adapter (ioBroker.go-e) to go-e-charger

[Deutsche Version](/#/docs/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md)

This guide helps users of the adapter [ioBroker.go-e](https://github.com/MK-2001/ioBroker.go-e) (instance `go-e.0`) to switch to **ioBroker.go-e-charger** (instance `go-e-charger.0`). Both adapters talk to the charger via its local HTTP API, but they use different object structures and configuration concepts, so a migration means re-pointing scripts, visualisations and history settings.

## Why switch?

- **Several chargers in one instance**, with a shared PV surplus in wallbox-list order and an optional total current budget (fuse protection).
- **ChargeManager**: PV surplus charging with home-battery modes (disabled / minimum SoC / battery priority), SoC hysteresis and SoC age check.
- **Automatic 1-/3-phase switching** (gen 3+) and `Settings.PhaseMode` (0 = auto, 1, 3) at runtime.
- **Read-only mode** per charger, `info.chargeState` explaining why a charger is (not) charging, offline detection.
- Charges started from the go-e app, the button or RFID are not aborted when both adapter modes are off.
- Uses HTTP API v1 and v2, tested with firmware V033 up to V60.6, actively maintained.

The go-e adapter offers some features that go-e-charger does not have (yet) – see [Not (yet) supported](#not-yet-supported) before you switch.

## Datapoint mapping

`X` is the wallbox number in go-e-charger (`Wallbox_0` for the first entry of the wallbox list). Values marked "read-only" in go-e-charger are controlled via the `Settings` states instead.

| go-e (`go-e.0.`)                                              | go-e-charger (`go-e-charger.0.`)                                                                                   | Notes                                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `info.connection`                                             | `Wallbox_X.info.connection`                                                                                        |                                                                                                            |
| `car`                                                         | `Wallbox_X.info.carState`                                                                                          | same values (1 = ready, 2 = charging, 3 = waiting for car, 4 = finished); text in `info.carStateString`    |
| `allow_charging` (writable)                                   | `Wallbox_X.Power.ChargingAllowed` (boolean, read-only)                                                             | control via `Settings.ChargeNOW` / `Settings.ChargeManager`                                                |
| `ampere` (writable)                                           | `Wallbox_X.Power.ChargeCurrent` (read-only)                                                                        | ChargeNOW current: `Settings.ChargeCurrent`                                                                |
| `amperePV` (writable)                                         | `Wallbox_X.Power.ChargeCurrentVolatile` (read-only)                                                                | set automatically by ChargeManager                                                                         |
| `solarLoadOnly`                                               | `Wallbox_X.Settings.ChargeManager`                                                                                 | PV surplus charging on/off                                                                                 |
| `energy.power` (kW)                                           | `Wallbox_X.Power.Charge` (**W**)                                                                                   | unit changed                                                                                               |
| `energy.phase1..3.voltage`                                    | `Wallbox_X.Power.VoltageL1..L3`                                                                                    |                                                                                                            |
| `energy.phase1..3.ampere`                                     | `Wallbox_X.Power.MeasuredMaxPhaseCurrent`                                                                          | only the maximum of the three phases ([#922](https://github.com/hombach/ioBroker.go-e-charger/issues/922)) |
| `phases` (raw `pha`), `energy.phaseN.pre/postContactorActive` | `Wallbox_X.Power.GridPhases`, `Wallbox_X.Power.EnabledPhases`                                                      | number of phases instead of bit flags                                                                      |
| `phaseSwitchModeEnabled`, `phaseSwitchMode`                   | wallbox option "automatic 1-/3-phase switching", `Wallbox_X.Settings.PhaseMode`, `Wallbox_X.Settings.Charge3Phase` | `PhaseMode`: 0 = auto, 1 = one phase, 3 = three phases                                                     |
| `energy.total`                                                | `Wallbox_X.statistics.chargedEnergy` (kWh)                                                                         | sum of all chargers: `statisticsGlobal.chargedEnergy`                                                      |
| `reboot_counter`, `reboot_timer`                              | `Wallbox_X.statistics.rebootCounter`, `Wallbox_X.statistics.rebootTimer` (h)                                       |                                                                                                            |
| `firmware_version`                                            | `Wallbox_X.info.firmwareVersion`                                                                                   | hardware generation: `info.hardwareVersion`                                                                |
| `max_ampere` (`ama`), `cable_ampere_code` (`cbl`)             | `Wallbox_X.info.hardwareMaxChargeCurrent`                                                                          | combined effective hardware limit; minimum: `info.hardwareMinChargeCurrent`                                |
| `access_state` (writable)                                     | `Wallbox_X.info.accessControlState` (read-only)                                                                    |                                                                                                            |
| `unlocked_by`                                                 | `Wallbox_X.info.unlockedByRFIDNo`, `Wallbox_X.info.unlockedByRFIDName`                                             |                                                                                                            |
| `rfid.badges.N.id` / `.name` / `.consumption`                 | `Wallbox_X.statistics.RFIDN.cardId` / `.cardName` / `.chargedEnergy`                                               | N = 1 … 10, channels only for configured cards                                                             |
| –                                                             | `Wallbox_X.info.chargeState`, `Wallbox_X.info.ipAddress`, `Wallbox_X.Power.GridFrequency`                          | new in go-e-charger                                                                                        |
| –                                                             | `Settings.Setpoint_HomeBatSoC`                                                                                     | minimum home-battery SoC for surplus charging                                                              |

Datapoints of the go-e adapter not listed here (temperatures, error code, per-phase power, power factor, WiFi, MQTT, load-management, schedule, LED and button settings, …) have no equivalent yet – see below.

## Configuration mapping

| go-e setting                                                             | go-e-charger setting                                                                                                        | Notes                                                                                                                                                  |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Server name / IP (`serverName`)                                          | Wallbox list → IP address (`ipAddress`), optional charger name                                                              | one entry per charger                                                                                                                                  |
| Update interval [s] (`serverInterval`)                                   | Poll cycle time [ms] (`cycleTime`)                                                                                          | default 10 s, minimum 3 s                                                                                                                              |
| `ampUpdateInterval`                                                      | –                                                                                                                           | the current changes by at most 1 A per cycle                                                                                                           |
| API version (`apiVersion`), `selectedAttributes`                         | –                                                                                                                           | v1 is always used, v2 additionally for gen 3+ features; fixed set of keys                                                                              |
| Max. ampere (`maxAmp`)                                                   | Maximum charging current (`maxChargeCurrent`), per-wallbox `maxAmp` / `minAmp`                                              | plus optional total budget `maxAmpTotal`                                                                                                               |
| Solar power object (`solarPowerForeignObjectID`) + Negate / Ack          | Solar power object (`stateHomeSolarPower`)                                                                                  | **must be the positive PV generation**; a signed grid value is not supported yet ([#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919)) |
| House consumption object (`houseConsumptionForeignObjectID`)             | Home power consumption object (`stateHomePowerConsumption`) + "charger consumption is included" (`subtractSelfConsumption`) | positive W                                                                                                                                             |
| House battery object (`houseBatteryForeignObjectID`, battery power in W) | Home battery SoC object (`stateHomeBatSoc`, %) + Home battery mode (`batteryMode`)                                          | different concept: SoC-based instead of battery power                                                                                                  |
| Buffer to solar (`bufferToSolar`)                                        | Grid reserve power (`chargeManagerReservePower`)                                                                            |                                                                                                                                                        |
| Load with 6 A at least (`loadWith6AAtLeast`)                             | –                                                                                                                           | [#920](https://github.com/hombach/ioBroker.go-e-charger/issues/920)                                                                                    |
| Car SoC object (`carBatterySoCForeignObjectID`)                          | –                                                                                                                           |                                                                                                                                                        |
| `phaseSwitchWatts`, `timeToWait`, `defaultPSM`                           | wallbox option "automatic 1-/3-phase switching", `Settings.PhaseMode`                                                       | thresholds and delay are fixed ([#925](https://github.com/hombach/ioBroker.go-e-charger/issues/925))                                                   |
| Calculation method "go-e hardware" (`calcMethod`)                        | –                                                                                                                           | go-e-charger always calculates in ioBroker                                                                                                             |
| `writeTemperatureArray`                                                  | –                                                                                                                           | [#922](https://github.com/hombach/ioBroker.go-e-charger/issues/922)                                                                                    |

## FAQ

**Which HTTP API do I have to enable in the go-e app?**
For hardware generation 3 and 4 enable "HTTP API v1" (required). For phase switching, grid frequency and the hardware minimum current also enable "HTTP API v2". Older chargers (gen 2) provide API v1 without this setting.

**Which go-e app mode should I use (Eco vs. Basic)?**
go-e-charger controls the charger itself (charge release and volatile current). Charger-side functions that also start, stop or limit charging – PV surplus (Eco mode with the charger's own PV logic), electricity-price based charging or charging timers – can work against ChargeManager. When ChargeManager is used, keep these charger functions switched off and use the basic/standard charging mode; ChargeNOW and ChargeManager then decide about charging.

**Which sign do the PV and consumption values need?**
Both are positive values in W: PV generation ≥ 0, household consumption ≥ 0. A value in kW must be converted to W. A single grid import/export value cannot be used directly yet ([#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919)); until then create an alias or a script state with the required values. If your go-e adapter configuration used "Negate", the source object most likely has the wrong sign for go-e-charger.

**Can I run both adapters in parallel?**
Yes, for reading. Enable **read-only mode** for the charger in go-e-charger while you compare values: it then reads data but sends no control commands. Do not let both adapters control the same charger at the same time (go-e PV control / writes to `allow_charging` or `amperePV` and go-e-charger ChargeManager / ChargeNOW) – they would overwrite each other. When you are satisfied, stop the go-e instance (or its PV control), disable read-only mode and enable `Settings.ChargeManager`.

**Do I lose my history?**
History data is stored per object ID. Enable history for the new datapoints; existing data stays stored under the `go-e.0` IDs.

**What about the flash/EEPROM of the charger?**
go-e-charger writes the charging current via the volatile key `amx` (only firmware 033 uses `amp`) and drops commands whose value the charger already reports.

## Not (yet) supported

The following functions of the go-e adapter are not available in go-e-charger. Ideas are tracked as issues – feedback and pull requests are welcome:

- grid meter input with signed import/export value, Negate and Ack-only options – [#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919)
- Min+PV mode (always at least 6 A, plus surplus) – [#920](https://github.com/hombach/ioBroker.go-e-charger/issues/920)
- energy of the current session and energy limit in kWh – [#921](https://github.com/hombach/ioBroker.go-e-charger/issues/921)
- additional datapoints (temperatures, error code, per-phase current/power, power factor, WiFi, serial number, `modelStatus`, …) – [#922](https://github.com/hombach/ioBroker.go-e-charger/issues/922)
- timer: charge for X minutes / stop at a given time – [#923](https://github.com/hombach/ioBroker.go-e-charger/issues/923)
- script interface in watts (`energy.max_watts`, `adjustAmpLevelInWatts`) – [#924](https://github.com/hombach/ioBroker.go-e-charger/issues/924)
- configurable phase-switch thresholds, buffer and delay – [#925](https://github.com/hombach/ioBroker.go-e-charger/issues/925)
- writing device settings (cable lock, access control, LED, button current levels) – [#926](https://github.com/hombach/ioBroker.go-e-charger/issues/926)
- stop at a car SoC, the charger's own PV calculation (`ids`), MQTT/cloud/load-management information and the electricity exchange (aWATTar) values