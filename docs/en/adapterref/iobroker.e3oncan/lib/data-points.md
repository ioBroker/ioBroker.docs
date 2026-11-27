---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"},"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md":{"title":{"en":"Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)"},"content":"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md"}}}
---
![Logo](admin/e3oncan_small.png)
# ioBroker.e3oncan

## Handling of Data Points

### Table of contents

- [What is a data point?](#what-is-a-data-point)
- [Generic and variant data points](#generic-and-variant-data-points)
- [Metadata](#metadata)
- [Data formats for temperature, date and time](#data-formats-for-temperature-date-and-time)
- [Writability of data points](#writability-of-data-points)
- [What happens on adapter start and after updates](#what-happens-on-adapter-start-and-after-updates)
- [Running a data point scan](#running-a-data-point-scan)
- [Topology and plant profile](#topology-and-plant-profile)
- [User-defined data point structures in udsDidsSpecific](#user-defined-data-point-structures-in-udsdidsspecific)
- [Changelog of data point definitions](#changelog-of-data-point-definitions)

---

### What is a data point?

On E3 series devices, all information is organised into data points. Each data point has:

- a numeric ID (e.g. `256`)
- a name (e.g. `BusIdentification`)
- a length in bytes
- an internal structure described by a codec

Reading and writing always transfers raw bytes over the CAN bus. The codec translates between those bytes and human-readable values. If the structure of a data point is not yet known, the `RawCodec` is used, which passes through the unmodified byte stream.

The database of known data points is maintained in the [open3e](https://github.com/open3e) project. This adapter and the [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) project share the same database, derived from open3e. Updates are incorporated periodically. Users are welcome to contribute via the open3e discussion forum, issues, or pull requests.

---

### Generic and variant data points

Some data points have different lengths and structures on different devices. To handle this, data points are organised into two categories:

- **Generic data points** – a single definition that fits most devices.
- **Variant data points** – alternative definitions for devices where the generic definition does not apply.

The adapter automatically selects the correct variant for each device during the data point scan.

An overview of all known data points including their variants is available in the [open3e project](https://github.com/open3e/open3e/blob/develop/src/open3e/Open3Edatapoints.md).

---

### Metadata

Starting with open3e version 0.6.1 and adapter version 0.11.0, many data points carry additional metadata:

| Metadata field | Description |
|---|---|
| Description | Short human-readable explanation of the data point |
| Physical unit | e.g. °C, kWh, W (where applicable) |
| Notes / link | Further information or reference |
| Access | Whether the data point is read-only or read-and-write |

Metadata is added to data point objects during the data point scan. For data points that are newly created on adapter start (e.g. after a structural change in a definition), metadata is applied automatically. For all other existing data points, metadata is only updated by running a new data point scan.

---

### Data formats for temperature, date and time

Data point `382` contains the device's data format configuration, including:

- **Physical format:** Metric (°C) or Imperial (°F)
- **Date format:** DayMonthYear, MonthDayYear, YearMonthDay
- **Time format:** TwentyFourHours or TwelveHours

The default configuration is: `Metric / DayMonthYear / TwentyFourHours`.

Starting with adapter version 0.11.0, this information is read during the device scan and stored per device. The stored configuration is then applied as follows:

- **During a data point scan:** temperature unit labels are set to °C (Metric) or °F (Imperial). No conversion of the numerical values is performed.
- **When reading and writing:** date and time values are interpreted according to the stored format. For example, in MonthDayYear format a date is expected and stored as month-day-year rather than day-month-year.

> **Note:** Processing of non-default date/time formats is experimental. Please verify results carefully if your device is not configured with the default.

If data point `382` is not present for a device, the configuration of the master device (CAN address `0x680`) is used as a fallback. If no configuration is available at all, the adapter behaves the same as versions prior to 0.11.0.

---

### Writability of data points

A data point is treated as writable if either of the following is true:

- Its ID is included in the whitelist `e3oncan.0.<DEVICE>.info.udsDidsWritable`.
- It is marked as read-and-write in its metadata (available from adapter version 0.11.0 onwards).

Both conditions are evaluated; the whitelist continues to work as before.

---

### What happens on adapter start and after updates

Each time the adapter starts, the versions of existing data point definitions are compared against the versions bundled with the current adapter. If newer definitions are available (e.g. after an adapter update), the affected data points are updated automatically. This process is logged in detail.

**What to expect during an update:**

- If the structure of a data point changes, the entire `tree` sub-object for that data point is deleted and recreated with the new structure. This is necessary for the adapter to function correctly, but has side effects:
  - **Archived data** for elements of the affected `tree` sub-object may be lost.
  - **References** to those elements in scripts, visualisations, or other adapters may need to be updated.
- If a device-specific data point was modified by the user, a backup of the original structure is created before the update is applied.

> **Recommendation if you work on ioBroker beta repository:** Before starting the adapter for the first time after an update, back up all objects of the adapter instance (e.g. `e3oncan.0`) or at least the objects of individual devices.

---

### Running a data point scan

A data point scan discovers all available data points on each device and creates or updates the corresponding objects in ioBroker.

**What a scan does:**

- Discovers all available data points on each configured device.
- Adds or updates metadata (description, unit, access information) for each existing data point — for details see save option below.
- Sets temperature unit labels based on the device format configuration (data point `382`).
- Optionally writes the values read during the scan to the object tree (see below).

**Option: Save all data point values during scan**

The scan dialog offers a checkbox **Save all data point values to object tree during scan**:

- **Checked (default):** All values read during the scan are written to the object tree. Missing data point objects are created.
- **Unchecked:** Values and metadata are written for *existing* data point objects. Data point objects that do not yet exist are *not* created. Use this option to refresh metadata without extending the object tree — for example after a migration from an older adapter version.

**When to run a scan:**

- During initial setup (strongly recommended, required for writing).
- After an adapter update that introduces new data point definitions.
- After a software update of Viessmann devices.

> **Recommendation:** Perform a device scan first (go to the **List of UDS Devices** tab, press **Start scan …**).

**How to start a scan:**

Open the adapter configuration dialog, go to the **List of Data Points** tab, press **Start scan …** and confirm with **OK**. The scan runs in the background and may take up to 5 minutes. Progress and result are shown in the scan status line below the button; more details are in the adapter log.

---

### Topology and plant profile

While scanning, the adapter collects the data it needs to describe the bus and the plant. At the end of a scan it writes three states in the `info` channel:

| State | Content |
|---|---|
| `info.topology` | Bus topology as JSON: the UDS-accessible devices (from data point `256` BusIdentification) and all devices listed in the topology matrices (data points `954` and `1286`–`1289`), including devices that are not UDS-accessible, e.g. on the internal CAN bus or the ServiceBus |
| `info.plantProfile` | Plant profile as JSON: heat generator, role of each control unit, refrigerant circuit or boiler, sensors, domestic hot water, buffer, electric heater, energy storage system, heating circuits and the actuators and sensors listed in data point `1238` |
| `info.topologyHtml` | Both as HTML. It is shown by the **Topology** button on the datapoints page |

**How the plant profile is derived:**

- **Role of the control units** from data point `256`: e.g. `HPMUMASTER` is the indoor unit of a heat pump, `HMUMASTER` of a boiler, the outdoor unit is the device that reports the compressor (data point `2346`), `EHCU` is the electric heater and `EMCU` the energy storage system. Gateways, room control and HMI get no role, because they answer for every data point of the database.
- **What the scan did not find is not there:** a device answers data points of parts it does not have with a negative response.
- **What answers is not necessarily fitted:** unused sensor terminals answer with `SensorStatus` `not_available`, fitted ones with `no_error`. Further data points tell the configuration, e.g. `933`–`936` (type of heating circuit), `1415`–`1418` (operation state) and `2574` (power of the electric heater).

The values are a snapshot taken during the scan. They are collected whether or not the option *Save all data point values to object tree during scan* is set. A scan limited to selected data points cannot tell which parts are missing, so it keeps the previous profile. The detection rules follow the plant view of [open3e-esp32](https://github.com/boonkerz/open3e-esp32) by boonkerz.

---

### User-defined data point structures in udsDidsSpecific

The state `e3oncan.0.<DEVICE>.info.udsDidsSpecific` stores the device-specific data point definitions that differ from the generic definitions in `didsE3.json`. This includes:

- **Variant data points** — definitions automatically selected during a data point scan because the device returned a length that matches an entry in `didsE3var.json`.
- **User-defined structures** — definitions created or modified manually by the user.

Each entry in `udsDidsSpecific` is a JSON object keyed by the numeric data point ID. The adapter tracks the origin of each entry via the `source` field:

| `source` value | Meaning |
|---|---|
| absent | User-created definition, or automatically placed before version tracking was introduced (adapter < 0.11.0) |
| `"didsE3var_YYYYMMDD"` | Automatically set by the adapter; version of `didsE3var.json` at the time of the last update |

**Behaviour during adapter start and data point scan:**

- Entries with `source: "didsE3var_..."` are updated to the latest version from `didsE3var.json` if the structure has changed.
- Entries without a `source` field that use `RawCodec` (automatically placed by old scans) are also updated.
- A backup of overridden entries is stored in the `Backup` sub-section of `udsDidsSpecific`.

**Protecting a user-defined structure from being overridden (adapter ≥ 1.0.3):**

If you have manually defined or verified the structure of a variant data point and want to prevent the adapter from overriding it, add a `"protected": true` field to the entry in `udsDidsSpecific`. You can optionally add a `"reason"` field with a free-text description; this text is included in the adapter log whenever the protection is applied.

Example entry for DID 2086:

```json
"2086": {
  "codec": "O3EComplexType",
  "len": 68,
  "id": "ZigBeeOneDeviceCurrentValues",
  "protected": true,
  "reason": "Custom ZigBee TRV structure verified for my device",
  "args": { ... },
  "source": "didsE3var_20260527"
}
```

The adapter will log `Variant datapoint ... is protected by user. Update skipped. Reason: "..."` and leave the definition unchanged, both on adapter start and during a data point scan.

> **Note:** Protection applies only to **variant** data points (those present in `didsE3var.json`). Definitions for common data points (from `didsE3.json`) are stored in `udsDidsCommon` and are not affected by this mechanism.

---

## Changelog of Data Point Definitions

### v1.4.0 (2026-11-25)

**Common data points (didsE3.json, v20261124)**

* **DID 1238 `AvailableActorSensorComponents`**: decoded (previously raw) as a list of the actuators and sensors fitted to the device, given by their data point numbers, e.g. 381 (central heating pump), 1842 (diverter valve), 491 (circulation pump). Decoding found by boonkerz in open3e-esp32.
* Added new **DID 3737 `AllengraSensorOutdoorUnit`**: flow rate in the heating water circuit, measured at the outdoor unit. Some devices return 0 on DID 1043 `AllengraSensor` and provide the flow rate here instead; the description of DID 1043 says so now.
* Decoded previously raw **DID 2808 `InverterInternalPowerModuleTemperature`** (temperature sensor with actual, minimum, maximum, average and sensor status) and **DID 3119 `RefrigerantCircuitFourWayValveStatistical`** (`Count` and `Duration` in s), from findings on a Vitocal 200-A.
* **Units:** the pressure sensors **318 `WaterPressureSensor`, 322 `CompressorInletPressureSensor` and 325 `CompressorOutletPressureSensor`** now show `bar` instead of `hPa`; the values were always in bar. The temperature sensors **3015, 3017, 3018 and 3019** gained the unit `°C`, **2626 `MaximumPowerElectricalHeater`** and **3384 `ElectricalActivePowerConsumptionLimitationDefaultValue`** the unit `W`, the field `Actual` of **381 `CentralHeatingPump`** the unit `%`.
* **Writability:** the heating curves of mixer circuits 1 to 4 (**880–883 `Mixer…CircuitCentralHeatingCurve`**) changed from read-only to read-write; a Vitocal 250-A accepts writing them. The new flags take effect with the next data point scan.

**Enumerations (enums.js, v20261116)**

* New device `DCIOU` (73) in the list of device types.

### v1.3.0 (2026-11-17)
* Added **new devices** to enum values
* **ZigBee devices**: decoded `Hardware-Version` (previously raw, in **40 `ZigBee*DeviceProperty` DIDs**) and device `ConnectionState` (previously raw, in **80 `ZigBee*DeviceCurrentValues` definitions**, both 57- and 68-byte variants) with new enum `ZigBeeConnectionStates`, refer to PR #402
* **`OpStates`**: corrected per issue #145 — the previous decoding (sourced from an older viGuide app version) was field-confirmed wrong; new values cross-checked against two independent reports (Philip-Wiege's systematic testing on a Vitocal 250-A, wangnick's observation of value 255 on unused heating circuits) and against the current viGuide app's data
* **`Errors`**: extended from 1098 to 1351 entries based on the current viGuide app's error catalogue; corrected two entries that were misplaced at positions 1095/1096 (`WallboxGeneralError`/`EebusConfigurationIncorrect`), which are now at their actual positions 65533/65534 together with the two special values (`ViewedErrorList`/`ErrorHasBeenConfirmed`) that had been shown there before
* Added missing enum values found by comparing against the current viGuide app: **`GasTypes`** (+1: `BioGas`), **`BusTypes`** (+2: `PWM`, `IP`), **`RemoteControls`** (+5), **`DigitalInputConfigurations`** (+6), **`PowerStates`** (+1)
* **DID 1718 `ElectricalEnergySystemConfiguration`**: decoded both previously raw bytes as `InverterType` and `SystemType`, with new enums `ElectricalEnergySystemInverterTypes` and `EnergyManagementControlUnitTypes`, based on the current viGuide app's structure mapping
* Added new **DID 3369 `ElectricalActivePowerConsumptionLimitationSettings`** (§14a EnWG load-limitation mode selector, new enum `FourteenAConfigurationModes`) and **DID 3370 `ElectricalActivePowerConsumptionLimitationSettingsConfiguration`** (raw 4-byte support-flags bitmask for the five modes of DID 3369), found in the current viGuide app
* **Vitoair FS 300 (VCU)**: added 6-byte variants for **DIDs 1006/1007 `TargetQuickMode`/`CurrentQuickMode`** and **DID 2605 `QuickModeRuntime`**, refer to PR #398
* **Vitoair FS 300 (VCU)**: decoded previously raw **DIDs 2489 `FrostProtectionStatus`, 2493 `VentilationBypassPosition`, 2608 `FilterSettings`, 2759 `EnergyRecoveredCrossHeatExchanger`, 2946 `EnergyConsumptionElectricalPreHeater`**, and added new **DIDs 2846 `VentilationBypassDynamicVentilationLevel`, 3206 `FilterPercentageBlocked`**, refer to PR #399

### v1.2.0 (2026-10-15)

**Common data points (didsE3.json, v20261014)**

* Add decoding for **DID 1593 `BufferHysteresis`**
* **Units on sub-fields:** The sub-fields of 250 composite data points now carry their units, e.g. the temperature sensors show `°C` where the unit was previously empty. 13 further data points gained a unit, e.g. `MainPowerSupplyValue` (`V`).
* **Structured decoding:** 171 data points that were decoded as raw bytes now have a structure: 147 as lists (`O3EList`), 23 as composite structures (`O3EComplexType`), e.g. `DaylightSavingTimeActive` (912), and 1 as a byte value (`O3EByteVal`). Their object tree changes and is rebuilt at the next adapter start.
* **Writability:** 18 data points changed from read-only to read-write, among them `DaylightSavingTimeActive` (912), `DomesticHotWaterHysteresis` (1085), `CentralHeatingPumpPerformance` (1432), `IntervalStrategyProperties` (1606), `WaterPressureConfiguration` (1721) and the room-eco and frost-protection settings of the four mixer circuits (2426–2429, 2855–2858). One data point, `TargetDemandHeatProducer` (2353), changed from read-write to read-only. The new flags take effect with the next data point scan.
* **Corrections:** The scale of `OutsideTemperatureDampingFactor` (919) is corrected from 10 to 1, and `GatewayRemoteSignalStrength` (900) gained a description.

**Variant data points (didsE3var.json, v20260727)**

* Two variants added: `DomesticHotWaterSetpointMetaData` (504, length 10) and `LegionellaProtectionTargetTemperatureSetpoint` (874, length 2).

**Enumerations (enums.js, v20260727)**

* New enumeration `RoomSetpoints` (2 Reduced, 3 Normal, 4 Comfort).

### v1.1.1 (2026-07-06)
**Common data points (didsE3.json, v20260705)**

* **ZigBee current-values DIDs 2086–2143 and 2262** (57-byte): Restructured around a new `ViCareDevice` O3ESwitch discriminator that selects the decoded fields by device type. For details see below (v1.1.0).

### v1.1.0 (2026-07-05)

**Variant data points (didsE3var.json, v20260630)**

* **ZigBee current-values DIDs 2086–2143 and 2262** (68-byte variant): Restructured around a new `ViCareDevice` O3ESwitch discriminator that selects the decoded fields by device type:
  - type 0 — empty slot (raw)
  - type 1 — climate sensor: `ActualTemperature` (°C), `Humidity` (%)
  - type 2 — TRV: `ActualTemperature` (°C), `ValveOpening` (%), `DeviceDisplayTurned`, `DeviceChildLockActive`, `DeviceTemperatureSetpoint` (°C)
  - type 3 — floor thermostat / Verteiler: `FlowTemperature` (°C, int16 LE), `OperatingMode`
  - type 4/5 — actuator NC/NO: `Demand` (%), `ValveState`
  - `SignalLevel` (%) and `BatteryRssi` (dBm, signed) added to all types
* **Room property DIDs 1884–1943** (85-byte variant): Added linked ZigBee device index fields; `ChildLockActive` description updated; `WindowDetection` enum corrected.
* **DID 1603** (PointOfCommonCouplingPower): minor description update.

**Common data points (didsE3.json, v20260701)**

* **3 new DIDs** using `O3EFloat32`:
  - 2990 `ElectricalEnergySystemBatteryCapacityDelta`
  - 2991 `ElectricalEnergySystemBatteryCapacity`
  - 2992 `ElectricalEnergySystemStateOfChargeUseable`
* **Unit fixes**: DID 279 and 281 field `Actual`: unit corrected to °C (was empty); DID 321 field `Average`: unit corrected to °C (was hPa); DID 322 field `Average`: unit corrected to hPa (was °C).
* `decimals` field added to all numeric sub-fields for consistency with the updated codec definition (value `0` — no change to decoded values).

### v1.0.3 (2026-05-31)
* **ZigBee DIDs 2084–2319 structured**: ZigBeeDeviceProperty (incl. ArticleNumber), ZigBeeDeviceCurrentValues in 57-byte (gas heater) and 68-byte (heat pump) variants with WorkingMode, Setpoint, Display, ChildLock fields
* **Room DIDs 1884–1943 structured**: RoomProperty (name, type, temperature control, window detection) and RoomCurrentValues (temperature, humidity min/max) in 84/85-byte variants
* **New ViGuide-derived DID structures**: fuel cell metrics (1349–1362), energy coverage matrices (1354–1373), demand coverage (1383), battery/inverter subscription DIDs (257–266, 2214 ff.)
* **Enums updated**: `ViCareDeviceTypes` (TRV, sensor, repeater, UFH actuator), `CurrentWorkingModeLevels` (Cooling=100)
* Codec convention: `Unknown*` fields now consistently use `RawCodec`

### v0.11.0 (2026-04-14)

Updated structure of the following data points:
268, 269, 271, 274, 279, 282, 284, 285, 286, 287, 288, 289, 290, 291, 318, 320, 321, 324, 531, 1659, 1684, 1768, 1769, 1770, 1771, 1772, 2084, 2085, 2087, 2088, 2090, 2091, 2093, 2094, 2096, 2097, 2099, 2100, 2102, 2103, 2105, 2106, 2108, 2109, 2111, 2112, 2114, 2115, 2117, 2118, 2120, 2121, 2123, 2124, 2126, 2127, 2129, 2130, 2132, 2133, 2135, 2136, 2138, 2139, 2141, 2142, 2240, 2260, 2261, 2263, 2264, 2266, 2267, 2269, 2270, 2272, 2273, 2275, 2276, 2278, 2279, 2281, 2282, 2284, 2285, 2287, 2288, 2290, 2291, 2293, 2294, 2296, 2297, 2299, 2300, 2302, 2303, 2305, 2306, 2308, 2309, 2311, 2312, 2314, 2315, 2317, 2318, 2320, 2333, 2334, 2351, 2352, 2593, 2735, 2806, 3014, 3015, 3016, 3017, 3018, 3032, 3034, 3035, 3036

**Notes:**
- For all sensor data points the last entry `Unknown` was renamed to `SensorStatus`. This is the reason for the large number of changed data points.
- For the frequently used data points 531, 2351, 2532 and 2735 the numerical value has been moved to a sub-state `ID`:
  - `0531_DomesticHotWaterOperationState.ID`
  - `2351_HeatPumpCompressor.PowerState.ID`
  - `2352_AdditionalElectricHeater.PowerState.ID`
  - `2735_FourThreeWayValveValveCurrentPosition.ID`