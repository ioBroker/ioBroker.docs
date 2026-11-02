---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homeconnect
BADGE-stable: https://iobroker.live/badges/homeconnect-stable.svg
BADGE-Installations: https://iobroker.live/badges/homeconnect-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homeconnect
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
---
# ioBroker.homeconnect

Control and monitor Bosch, Siemens, NEFF and Gaggenau home appliances through the official Home Connect cloud API — dishwashers, washers, dryers, ovens, hobs, hoods, fridges, freezers, coffee makers, cleaning robots and more.

Every value arrives in a form you can use directly: on/off as a boolean, a fixed choice as a readable name, a measurement as a number with its unit and limits. Updates arrive live through a single event stream, and programs can be selected, configured and started from ioBroker.

## Requirements

- Node.js >= 22
- js-controller >= 7.2.5
- Admin >= 8.2.0
- A free Home Connect developer account, for a Client ID and a Client Secret

## Getting your Home Connect credentials

Three things belong together: your normal Home Connect account (the one of the Home Connect app, where your appliances are paired), a developer account linked to it, and an application registered in the developer account. The settings page shows the same steps as a checklist, with buttons for creating the developer account, registering the application and opening your applications.

1. Create a free developer account at [developer.home-connect.com](https://developer.home-connect.com/user/register). As **Default Home Connect Account for Testing** enter the e-mail address of your Home Connect app account — exactly as in the app, in **lower case**. This links the two accounts; without it the sign-in is refused.
2. [Register an application](https://developer.home-connect.com/applications/add): any **Application ID**, **OAuth Flow** `Device Flow` (the adapter runs on a server without a browser; the flow cannot be changed later), **Success Redirect** empty, **One Time Token Mode** off.
3. **Wait 15 to 60 minutes** — a new or edited application only becomes active at Home Connect after that.
4. Copy the **Client ID** (64 characters) and the **Client Secret** into the adapter settings and save.

## Signing in

After saving the credentials the adapter requests a sign-in link. The settings panel shows it together with the **code** to confirm. Open the link, sign in with your Home Connect account and approve the access — the adapter picks the approval up on its own within a few seconds and stores the login encrypted. The notification only points you to the settings: the code changes every five minutes, and the panel always shows the current one.

While the link waits, it renews itself every five minutes. If nobody confirms one for an hour, the adapter stops asking Home Connect for new links; **Request a new sign-in link** in the panel starts again, and so does a restart. **Reset sign-in** forgets the login and starts a new sign-in — for example to switch to another Home Connect account. The **Test connection** button asks Home Connect directly: it reports how many appliances your account lists and how many of them are connected right now, and whether live updates are running.

You sign in once. The adapter refreshes its access by itself; a new sign-in is only needed when the access is revoked in your Home Connect account, when Home Connect refuses the application (disabled, deleted, new secret), or when the ioBroker data moved to another system — the stored login cannot be read there, and the log says so.

When Home Connect refuses the sign-in, the panel shows what it answered and what to do; `auth.lastError` keeps the answer (see Troubleshooting).

## The object tree

Each appliance gets one folder. Its name is the appliance's **model and the last four characters of its own Home Connect number** (for example `sx87tx02ce-5775`) — unchangeable, and different for two appliances of the same model, which neither the app name nor the E-number from the type plate is. The appliance name from the app stays visible as the folder's display name and follows it live. Should two appliances of one model end in the same four characters, the second one gets its whole number.

Below each appliance — which channels an appliance gets depends on its type; fridges, freezers and wine coolers have no programs:

| Channel      | What is in it                                                                                                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`       | `reachable` — whether the appliance is connected to Home Connect right now (the green/grey dot on the folder); `firmware` — the firmware version of a washer, dryer or washer-dryer; Home Connect has no query for it, so it appears once the appliance sends its versions by itself and then stays |
| `status`     | Read-only appliance state: operation state, `programRunning`, remote and local control, interior light, faults, battery                                                                                                                                                                             |
| `run`        | The program under way: remaining, elapsed and total time, progress, phase, energy and water forecasts, recommendations — empty while no program runs                                                                                                                                                |
| `settings`   | Writable settings: power state, child lock, interior light, fridge temperatures                                                                                                                                                                                                                     |
| `doors`      | Every door of the appliance as a boolean: `door` (the appliance door), `doorLocked`, and on refrigeration appliances each compartment (`freezer`, `refrigerator` …)                                                                                                                                 |
| `events`     | Every event of this appliance type as a boolean: program finished, salt nearly empty, rinse aid empty, filter saturated, door alarm …                                                                                                                                                               |
| `counters`   | Running totals: runs, running time, energy, water, detergent, softener, beverages                                                                                                                                                                                                                   |
| `programs`   | `selectedProgram`, `activeProgram`, and the `start` / `stop` buttons                                                                                                                                                                                                                                |
| `options`    | The options you choose for a program: temperature, spin speed, intensive zone, delayed start …                                                                                                                                                                                                      |
| `commands`   | Momentary buttons the appliance offers, e.g. acknowledging an event                                                                                                                                                                                                                                 |
| `history`    | The runs, one channel each: `latest`, `previous`, `thirdLatest` … with program and duration; `latest` also carries start, end, how it ended, and water, energy, detergent and softener where the appliance reports them                                                                             |
| `statistics` | Per program: runs started, runs completed, running time                                                                                                                                                                                                                                             |

At instance level, `info.devicesTotal`, `info.devicesOnline` and `info.devicesAllOnline` summarise the account, `info.connection` is green when the adapter is signed in **and** live updates are running, and `auth.lastError` holds Home Connect's answer to a refused sign-in (empty while signed in, `Unknown` while nothing was asked yet).

Where the data points come from:

- **Status, settings, programs, options and commands** are what the appliance itself reports to Home Connect — the adapter creates exactly those. `options` holds only what you choose for a program; values the appliance reports while a program runs (remaining time, progress, forecasts, process phase) are under `run`.
- **Events** are the exception. Home Connect has no way to ask which events an appliance can send — an event only arrives at the moment it happens. So the adapter creates every known event of the appliance type in advance, from its own catalogue: you can build a script on "salt empty" today instead of waiting months for the salt to run out. An appliance may therefore have event data points it never uses; an event the catalogue does not know is added the first time the appliance sends it.

Two properties are worth knowing:

- **Every data point exists from the first read of the connected appliance on** — the events of the appliance type even from the first start, and the options of _all_ its programs, not only of the one currently selected.
- **No data point ever disappears.** A switched-off appliance reports far less to the cloud, but that never means it lost a capability. Only an appliance you remove from your Home Connect account loses its folder. (Exception: a statistics channel named `program<number>` moves to the program's name once the adapter has learned it or its program table names the number; recordings, aliases, rooms and functions move along.)

## Operating appliances

- **A setting:** write the value into the data point under `settings`. `"true"`, `1` and `true` all work — the adapter converts to the data point's type before sending.
- **Start a program:** pick it in `programs.selectedProgram`, set the options you want under `options`, then set `programs.start` to `true`. The adapter sends the selected options with the start; if the appliance refuses that combination, it retries once with the program's defaults.
- **Stop a program:** set `programs.stop` to `true`.
- **A command:** set the button under `commands` to `true`; it falls back to `false` by itself.

A written value counts as done (`ack`) once the appliance reports it back. If the appliance refuses it, the data point returns to the appliance's real value.

Home Connect only accepts remote operation when the appliance allows it — most machines need **Remote Start** enabled on the appliance itself, and many refuse a change while a program is running. `status.remoteControlActive` and `status.remoteControlStartAllowed` tell you what the appliance currently permits.

## Data point names and descriptions

The adapter's own names come first: it names the events, the common status values and settings, the program options and its own structure in eleven languages. Where it has no name of its own, it uses the localized name Home Connect sends in your ioBroker system language, and as a last resort a readable name derived from the id. The description explains what a data point means, never repeats the manufacturer's key, and stays empty where the adapter has nothing to explain.

Names and descriptions belong to the adapter: an update brings existing installations along, so a tree from an older version does not keep old labels. If you want your own naming, use aliases or your own data points under `0_userdata`.

## Updating from 1.x

Version 2.0 replaces the raw data tree of the community releases up to 1.6.x with a readable one per appliance. Example: `homeconnect.0.012345678901234567.status.BSH_Common_Status_DoorState` becomes `homeconnect.0.kg49nsbbf-4567.status.doorOpen` — the device folder is named by the model and the last four characters of the appliance's own number.

The update takes care of the tree itself: your login and Client ID are kept, and rooms, functions and aliases move to the datapoint that takes the old one's place as soon as the appliance has been read once. A recording setting moves along only on a tree that also carries a room, function or alias, and only where exactly one new datapoint of the same value type replaces the old one. Where the type changed (a door text became yes/no) or one old datapoint became several (operation state → operation state + program running), the new datapoint starts without a recording — enable it again there. The log counts the room/function entries and aliases carried and the datapoints with a room or alias that had no counterpart.

What you have to do:

1. Make a backup before the update. Going back to 1.x is not supported — the old tree is removed once it has been handed over, and 1.x cannot read the login 2.0 stores encrypted.
2. Adjust your scripts and visualizations to the new IDs. The table lists, for the last part of every old ID, the datapoint that replaces it (below the new device folder). Rows marked (decoded) are new datapoints read from the old raw value; rooms, functions, aliases and recordings of the old raw datapoint are not carried to them.

| Old ID, last part (1.x)                                                        | New datapoint (2.0)                                                    |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `BSH_Common_Command_AcknowledgeEvent`                                          | `commands.acknowledgeEvent`                                            |
| `BSH_Common_Command_DeactivateWiFi`                                            | — (appliance-internal, no longer created)                              |
| `BSH_Common_Command_OpenDoor`                                                  | `commands.openDoor`                                                    |
| `BSH_Common_Command_PartlyOpenDoor`                                            | `commands.partlyOpenDoor`                                              |
| `BSH_Common_Command_PauseProgram`                                              | `commands.pauseProgram`                                                |
| `BSH_Common_Command_ResumeProgram`                                             | `commands.resumeProgram`                                               |
| `BSH_Common_Command_StopProgram`                                               | `programs.stop`                                                        |
| `BSH_Common_Event_AlarmClockElapsed`                                           | `events.alarmClockElapsed`                                             |
| `BSH_Common_Event_AquaStopOccured`                                             | `events.aquaStopOccured`                                               |
| `BSH_Common_Event_Favorite_001_ExternalTrigger`                                | `events.favorite001ExternalTrigger`                                    |
| `BSH_Common_Event_Favorite_002_ExternalTrigger`                                | `events.favorite002ExternalTrigger`                                    |
| `BSH_Common_Event_LowWaterPressure`                                            | `events.lowWaterPressure`                                              |
| `BSH_Common_Event_ProgramAborted`                                              | `events.programAborted`                                                |
| `BSH_Common_Event_ProgramFinished`                                             | `events.programFinished`                                               |
| `BSH_Common_Option_BaseProgram`                                                | `programs.baseProgram`                                                 |
| `BSH_Common_Option_CurrentStepRemainingTime`                                   | `run.currentStepRemainingTime`                                         |
| `BSH_Common_Option_Duration`                                                   | `options.duration`                                                     |
| `BSH_Common_Option_ElapsedProgramTime`                                         | `run.elapsedProgramTime`                                               |
| `BSH_Common_Option_ElapsedProgramTime_AutoCounting`                            | `run.elapsedProgramTimeAutoCounting`                                   |
| `BSH_Common_Option_EnergyForecast`                                             | `run.energyForecast`                                                   |
| `BSH_Common_Option_EstimatedTotalProgramTime`                                  | `run.estimatedTotalProgramTime`                                        |
| `BSH_Common_Option_FinishInRelative`                                           | `options.finishInRelative`                                             |
| `BSH_Common_Option_ProgramName`                                                | `programs.programName`                                                 |
| `BSH_Common_Option_ProgramProgress`                                            | `run.programProgress`                                                  |
| `BSH_Common_Option_RemainingProgramTime`                                       | `run.remainingProgramTime`                                             |
| `BSH_Common_Option_RemainingProgramTime_AutoCounting`                          | `run.remainingProgramTimeAutoCounting`                                 |
| `BSH_Common_Option_RemainingProgramTimeEstimationState`                        | `run.remainingProgramTimeEstimationState`                              |
| `BSH_Common_Option_RemainingProgramTimeIsEstimated`                            | `run.remainingProgramTimeIsEstimated`                                  |
| `BSH_Common_Option_SmartEnergyService_SmartStartEnabled`                       | `status.smartEnergyServiceSmartStartEnabled`                           |
| `BSH_Common_Option_StartInRelative`                                            | `options.startInRelative`                                              |
| `BSH_Common_Option_WaterForecast`                                              | `run.waterForecast`                                                    |
| `BSH_Common_Root_ActiveProgram`                                                | `programs.activeProgram`                                               |
| `BSH_Common_Root_SelectedProgram`                                              | `programs.selectedProgram`                                             |
| `BSH_Common_Setting_AlarmClock`                                                | `settings.alarmClock`                                                  |
| `BSH_Common_Setting_AllowBackendConnection`                                    | — (appliance-internal, no longer created)                              |
| `BSH_Common_Setting_AmbientLightBrightness`                                    | `settings.ambientLightBrightness`                                      |
| `BSH_Common_Setting_AmbientLightColor`                                         | `settings.ambientLightColor`                                           |
| `BSH_Common_Setting_AmbientLightCustomColor`                                   | `settings.ambientLightCustomColor`                                     |
| `BSH_Common_Setting_AmbientLightEnabled`                                       | `settings.ambientLightEnabled`                                         |
| `BSH_Common_Setting_ChildLock`                                                 | `settings.childLock`                                                   |
| `BSH_Common_Setting_LiquidVolumeUnit`                                          | `settings.liquidVolumeUnit`                                            |
| `BSH_Common_Setting_PowerState`                                                | `settings.powerState`                                                  |
| `BSH_Common_Setting_TemperatureUnit`                                           | `settings.temperatureUnit`                                             |
| `BSH_Common_Status_BackendConnected`                                           | — (appliance-internal, no longer created)                              |
| `BSH_Common_Status_BatteryChargingState`                                       | `status.batteryChargingState`                                          |
| `BSH_Common_Status_BatteryLevel`                                               | `status.batteryLevel`                                                  |
| `BSH_Common_Status_ChargingConnection`                                         | `status.chargingConnection`                                            |
| `BSH_Common_Status_DoorState`                                                  | `doors.door` (+ `doors.doorLocked` on appliances with a lockable door) |
| `BSH_Common_Status_ErrorCodesList`                                             | `status.errorCodes`, `status.faultActive` (decoded)                    |
| `BSH_Common_Status_InteriorIlluminationActive`                                 | `status.interiorIlluminationActive`                                    |
| `BSH_Common_Status_LocalControlActive`                                         | `status.localControlActive`                                            |
| `BSH_Common_Status_OperationState`                                             | `status.operationState`, `status.programRunning`                       |
| `BSH_Common_Status_Program_All_Count_Completed`                                | `counters.programAllCountCompleted`                                    |
| `BSH_Common_Status_Program_All_Count_Started`                                  | `counters.programAllCountStarted`                                      |
| `BSH_Common_Status_Program_All_Energy_Consumed`                                | `counters.programAllEnergyConsumed`                                    |
| `BSH_Common_Status_Program_All_Time_Effective`                                 | `counters.programAllTimeEffective`                                     |
| `BSH_Common_Status_Program_All_Water_Consumed`                                 | `counters.programAllWaterConsumed`                                     |
| `BSH_Common_Status_ProgramSessionSummary_Latest`                               | `history.latest.*` (decoded)                                           |
| `BSH_Common_Status_RemoteControlActive`                                        | `status.remoteControlActive`                                           |
| `BSH_Common_Status_RemoteControlStartAllowed`                                  | `status.remoteControlStartAllowed`                                     |
| `BSH_Common_Status_RemoteControlStartAllowedSince`                             | `status.remoteControlStartAllowedSince`                                |
| `BSH_Common_Status_SoftwareUpdateTransactionID`                                | — (appliance-internal, no longer created)                              |
| `BSH_Common_Status_Video_CameraState`                                          | `status.videoCameraState`                                              |
| `ConsumerProducts_CleaningRobot_Event_DockingStationNotFound`                  | `events.dockingStationNotFound`                                        |
| `ConsumerProducts_CleaningRobot_Event_DustBin_NotInstalled`                    | `events.dustBinNotInstalled`                                           |
| `ConsumerProducts_CleaningRobot_Event_EmptyDustBoxAndCleanFilter`              | `events.emptyDustBoxAndCleanFilter`                                    |
| `ConsumerProducts_CleaningRobot_Event_Robot_Lifted`                            | `events.robotLifted`                                                   |
| `ConsumerProducts_CleaningRobot_Event_RobotIsStuck`                            | `events.robotIsStuck`                                                  |
| `ConsumerProducts_CleaningRobot_Option_CarpetBoostEnabled`                     | `options.carpetBoostEnabled`                                           |
| `ConsumerProducts_CleaningRobot_Option_CleaningMode`                           | `options.cleaningMode`                                                 |
| `ConsumerProducts_CleaningRobot_Option_CleaningPasses`                         | `options.cleaningPasses`                                               |
| `ConsumerProducts_CleaningRobot_Option_CleaningSpeed`                          | `options.cleaningSpeed`                                                |
| `ConsumerProducts_CleaningRobot_Option_MopExtensionEnabled`                    | `options.mopExtensionEnabled`                                          |
| `ConsumerProducts_CleaningRobot_Option_ProcessPhase`                           | `run.processPhase`                                                     |
| `ConsumerProducts_CleaningRobot_Option_ReferenceMapId`                         | `options.referenceMapId`                                               |
| `ConsumerProducts_CleaningRobot_Option_SuctionPower`                           | `options.suctionPower`                                                 |
| `ConsumerProducts_CleaningRobot_Option_WaterFlowRate`                          | `options.waterFlowRate`                                                |
| `ConsumerProducts_CleaningRobot_Setting_CurrentMap`                            | `settings.currentMap`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap1`                            | `settings.nameOfMap1`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap2`                            | `settings.nameOfMap2`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap3`                            | `settings.nameOfMap3`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap4`                            | `settings.nameOfMap4`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap5`                            | `settings.nameOfMap5`                                                  |
| `ConsumerProducts_CleaningRobot_Status_DustBoxInserted`                        | `status.dustBoxInserted`                                               |
| `ConsumerProducts_CleaningRobot_Status_LastSelectedMap`                        | `status.lastSelectedMap`                                               |
| `ConsumerProducts_CleaningRobot_Status_Lifted`                                 | `status.lifted`                                                        |
| `ConsumerProducts_CleaningRobot_Status_Lost`                                   | `status.lost`                                                          |
| `ConsumerProducts_CleaningRobot_Status_ProcessPhase`                           | `run.processPhase`                                                     |
| `ConsumerProducts_CoffeeMaker_Event_BeanContainerEmpty`                        | `events.beanContainerEmpty`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn10Cups`                        | `events.calcNCleanIn10Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn15Cups`                        | `events.calcNCleanIn15Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn20Cups`                        | `events.calcNCleanIn20Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn5Cups`                         | `events.calcNCleanIn5Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn10Cups`                         | `events.descalingIn10Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn15Cups`                         | `events.descalingIn15Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn20Cups`                         | `events.descalingIn20Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn5Cups`                          | `events.descalingIn5Cups`                                              |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCalcNCleanBlockage`                  | `events.deviceCalcNCleanBlockage`                                      |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCalcNCleanOverdue`                   | `events.deviceCalcNCleanOverdue`                                       |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCleaningOverdue`                     | `events.deviceCleaningOverdue`                                         |
| `ConsumerProducts_CoffeeMaker_Event_DeviceDescalingBlockage`                   | `events.deviceDescalingBlockage`                                       |
| `ConsumerProducts_CoffeeMaker_Event_DeviceDescalingOverdue`                    | `events.deviceDescalingOverdue`                                        |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeCalcNCleaned`                | `events.deviceShouldBeCalcNCleaned`                                    |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeCleaned`                     | `events.deviceShouldBeCleaned`                                         |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeDescaled`                    | `events.deviceShouldBeDescaled`                                        |
| `ConsumerProducts_CoffeeMaker_Event_DripTrayFull`                              | `events.dripTrayFull`                                                  |
| `ConsumerProducts_CoffeeMaker_Event_KeepMilkTankCool`                          | `events.keepMilkTankCool`                                              |
| `ConsumerProducts_CoffeeMaker_Event_WaterTankEmpty`                            | `events.waterTankEmpty`                                                |
| `ConsumerProducts_CoffeeMaker_Option_AromaSelect`                              | `options.aromaSelect`                                                  |
| `ConsumerProducts_CoffeeMaker_Option_BeanAmount`                               | `options.beanAmount`                                                   |
| `ConsumerProducts_CoffeeMaker_Option_BeanContainerSelection`                   | `options.beanContainerSelection`                                       |
| `ConsumerProducts_CoffeeMaker_Option_BeverageSize`                             | `options.beverageSize`                                                 |
| `ConsumerProducts_CoffeeMaker_Option_BeveragesRemaining`                       | `status.beveragesRemaining`                                            |
| `ConsumerProducts_CoffeeMaker_Option_Coarsness`                                | `options.coarsness`                                                    |
| `ConsumerProducts_CoffeeMaker_Option_Coarsness_Recommendation`                 | `run.coarsnessRecommendation`                                          |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeMilkRatio`                          | `options.coffeeMilkRatio`                                              |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeStrength`                           | `options.coffeeStrength`                                               |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeStrength_Recommendation`            | `run.coffeeStrengthRecommendation`                                     |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeTemperature`                        | `options.coffeeTemperature`                                            |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeTemperature_Recommendation`         | `run.coffeeTemperatureRecommendation`                                  |
| `ConsumerProducts_CoffeeMaker_Option_FillQuantity`                             | `options.fillQuantity`                                                 |
| `ConsumerProducts_CoffeeMaker_Option_FillQuantity_Recommendation`              | `run.fillQuantityRecommendation`                                       |
| `ConsumerProducts_CoffeeMaker_Option_FlowRate`                                 | `options.flowRate`                                                     |
| `ConsumerProducts_CoffeeMaker_Option_FlowRate_Recommendation`                  | `run.flowRateRecommendation`                                           |
| `ConsumerProducts_CoffeeMaker_Option_HotWaterTemperature`                      | `options.hotWaterTemperature`                                          |
| `ConsumerProducts_CoffeeMaker_Option_MultipleBeverages`                        | `options.multipleBeverages`                                            |
| `ConsumerProducts_CoffeeMaker_Option_Shot_Count`                               | `options.shotCount`                                                    |
| `ConsumerProducts_CoffeeMaker_Setting_CupWarmer`                               | `settings.cupWarmer`                                                   |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterCoffee`                    | `counters.beverageCounterCoffee`                                       |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterCoffeeAndMilk`             | `counters.beverageCounterCoffeeAndMilk`                                |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterFrothyMilk`                | `counters.beverageCounterFrothyMilk`                                   |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotMilk`                   | `counters.beverageCounterHotMilk`                                      |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotWater`                  | `counters.beverageCounterHotWater`                                     |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotWaterCups`              | `counters.beverageCounterHotWaterCups`                                 |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterMilk`                      | `counters.beverageCounterMilk`                                         |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterPowderCoffee`              | `counters.beverageCounterPowderCoffee`                                 |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterRistrettoEspresso`         | `counters.beverageCounterRistrettoEspresso`                            |
| `Cooking_Common_Event_Hood_GreaseFilterMaxSaturationNearlyReached`             | `events.hoodGreaseFilterMaxSaturationNearlyReached`                    |
| `Cooking_Common_Event_Hood_GreaseFilterMaxSaturationReached`                   | `events.hoodGreaseFilterMaxSaturationReached`                          |
| `Cooking_Common_Option_Hood_Boost`                                             | `options.hoodBoost`                                                    |
| `Cooking_Common_Option_Hood_IntensiveLevel`                                    | `options.hoodIntensiveLevel`                                           |
| `Cooking_Common_Option_Hood_VentingLevel`                                      | `options.hoodVentingLevel`                                             |
| `Cooking_Common_Setting_Lighting`                                              | `settings.lighting`                                                    |
| `Cooking_Common_Setting_LightingBrightness`                                    | `settings.lightingBrightness`                                          |
| `Cooking_Hob_Setting_Ventilation`                                              | `settings.ventilation`                                                 |
| `Cooking_Hood_Setting_ColorTemperature`                                        | `settings.colorTemperature`                                            |
| `Cooking_Hood_Setting_ColorTemperaturePercent`                                 | `settings.colorTemperaturePercent`                                     |
| `Cooking_Oven_Event_PreheatFinished`                                           | `events.preheatFinished`                                               |
| `Cooking_Oven_Event_RegularPreheatFinished`                                    | `events.regularPreheatFinished`                                        |
| `Cooking_Oven_Option_AirExchange`                                              | `options.airExchange`                                                  |
| `Cooking_Oven_Option_CavitySelector`                                           | `options.cavitySelector`                                               |
| `Cooking_Oven_Option_FastPreHeat`                                              | `options.fastPreHeat`                                                  |
| `Cooking_Oven_Option_HeatupProgress`                                           | `run.heatupProgress`                                                   |
| `Cooking_Oven_Option_Level`                                                    | `options.level`                                                        |
| `Cooking_Oven_Option_MeatProbeTemperatureV2`                                   | `options.meatProbeTemperatureV2`                                       |
| `Cooking_Oven_Option_MicrowavePower`                                           | `options.microwavePower`                                               |
| `Cooking_Oven_Option_PyrolysisLevel`                                           | `options.pyrolysisLevel`                                               |
| `Cooking_Oven_Option_SetpointTemperature`                                      | `options.setpointTemperature`                                          |
| `Cooking_Oven_Option_SteamAssistLevel`                                         | `options.steamAssistLevel`                                             |
| `Cooking_Oven_Option_SteamBoost`                                               | `options.steamBoost`                                                   |
| `Cooking_Oven_Option_WarmingLevel`                                             | `options.warmingLevel`                                                 |
| `Cooking_Oven_Setting_SabbathMode`                                             | `settings.sabbathMode`                                                 |
| `Cooking_Oven_Status_CurrentCavityTemperature`                                 | `status.currentCavityTemperature`                                      |
| `Dishcare_Dishwasher_Event_MachineCareAndFilterCleaningReminder`               | `events.machineCareAndFilterCleaningReminder`                          |
| `Dishcare_Dishwasher_Event_MachineCareAndLowMaintenanceFilterCleaningReminder` | `events.machineCareAndLowMaintenanceFilterCleaningReminder`            |
| `Dishcare_Dishwasher_Event_MachineCareReminder`                                | `events.machineCareReminder`                                           |
| `Dishcare_Dishwasher_Event_ProgramBlockedSaltLack`                             | `events.programBlockedSaltLack`                                        |
| `Dishcare_Dishwasher_Event_RinseAidLack`                                       | `events.rinseAidLack`                                                  |
| `Dishcare_Dishwasher_Event_RinseAidNearlyEmpty`                                | `events.rinseAidNearlyEmpty`                                           |
| `Dishcare_Dishwasher_Event_SaltLack`                                           | `events.saltLack`                                                      |
| `Dishcare_Dishwasher_Event_SaltNearlyEmpty`                                    | `events.saltNearlyEmpty`                                               |
| `Dishcare_Dishwasher_Event_SmartFilterCleaningReminder`                        | `events.smartFilterCleaningReminder`                                   |
| `Dishcare_Dishwasher_Option_BrillianceDry`                                     | `options.brillianceDry`                                                |
| `Dishcare_Dishwasher_Option_DelicateBasket`                                    | `options.delicateBasket`                                               |
| `Dishcare_Dishwasher_Option_EcoDry`                                            | `options.ecoDry`                                                       |
| `Dishcare_Dishwasher_Option_EnergySafe`                                        | `options.energySafe`                                                   |
| `Dishcare_Dishwasher_Option_ExtraDry`                                          | `options.extraDry`                                                     |
| `Dishcare_Dishwasher_Option_ExtraRinse`                                        | `options.extraRinse`                                                   |
| `Dishcare_Dishwasher_Option_FixedZone`                                         | `options.fixedZone`                                                    |
| `Dishcare_Dishwasher_Option_FlexSpray_BackLeft`                                | `options.flexSprayBackLeft`                                            |
| `Dishcare_Dishwasher_Option_FlexSpray_BackRight`                               | `options.flexSprayBackRight`                                           |
| `Dishcare_Dishwasher_Option_FlexSpray_FrontLeft`                               | `options.flexSprayFrontLeft`                                           |
| `Dishcare_Dishwasher_Option_FlexSpray_FrontRight`                              | `options.flexSprayFrontRight`                                          |
| `Dishcare_Dishwasher_Option_FlexSpray_Type`                                    | `options.flexSprayType`                                                |
| `Dishcare_Dishwasher_Option_HalfLoad`                                          | `options.halfLoad`                                                     |
| `Dishcare_Dishwasher_Option_HolidayMode`                                       | `options.holidayMode`                                                  |
| `Dishcare_Dishwasher_Option_HygienePlus`                                       | `options.hygienePlus`                                                  |
| `Dishcare_Dishwasher_Option_IntensivZone`                                      | `options.intensivZone`                                                 |
| `Dishcare_Dishwasher_Option_LearningDishwasher_CleaningLevel`                  | `options.learningDishwasherCleaningLevel`                              |
| `Dishcare_Dishwasher_Option_LearningDishwasher_DryingLevel`                    | `options.learningDishwasherDryingLevel`                                |
| `Dishcare_Dishwasher_Option_LearningDishwasher_DurationLevel`                  | `options.learningDishwasherDurationLevel`                              |
| `Dishcare_Dishwasher_Option_Pretreatment`                                      | `options.pretreatment`                                                 |
| `Dishcare_Dishwasher_Option_SanitationUC`                                      | `options.sanitationUC`                                                 |
| `Dishcare_Dishwasher_Option_SilenceOnDemand`                                   | `options.silenceOnDemand`                                              |
| `Dishcare_Dishwasher_Option_StorageFunction`                                   | `options.storageFunction`                                              |
| `Dishcare_Dishwasher_Option_Turbo`                                             | `options.turbo`                                                        |
| `Dishcare_Dishwasher_Option_VarioSpeed`                                        | `options.varioSpeed`                                                   |
| `Dishcare_Dishwasher_Option_VarioSpeedPlus`                                    | `options.varioSpeedPlus`                                               |
| `Dishcare_Dishwasher_Option_ZeoliteDry`                                        | `options.zeoliteDry`                                                   |
| `Dishcare_Dishwasher_Setting_TimeLight`                                        | `settings.timeLight`                                                   |
| `Dishcare_Dishwasher_Status_EcoDryActive`                                      | `run.ecoDryActive`                                                     |
| `Dishcare_Dishwasher_Status_ProgramPhase`                                      | `run.programPhase`                                                     |
| `LaundryCare_Common_Event_DelayedShutdown`                                     | `events.delayedShutdown`                                               |
| `LaundryCare_Common_Event_DelayedShutdownCanceled`                             | `events.delayedShutdownCanceled`                                       |
| `LaundryCare_Common_Event_DoorNotLockable`                                     | `events.doorNotLockable`                                               |
| `LaundryCare_Common_Event_DoorNotUnlockable`                                   | `events.doorNotUnlockable`                                             |
| `LaundryCare_Common_Event_DoorOpen`                                            | `events.doorOpen`                                                      |
| `LaundryCare_Common_Event_FatalErrorOccured`                                   | `events.fatalErrorOccured`                                             |
| `LaundryCare_Common_Event_FoamDetection`                                       | `events.foamDetection`                                                 |
| `LaundryCare_Common_Event_SupplyPower_BlackedOut`                              | `events.supplyPowerBlackedOut`                                         |
| `LaundryCare_Common_Event_SupplyPower_SupplyVoltageTooLow`                     | `events.supplyPowerSupplyVoltageTooLow`                                |
| `LaundryCare_Common_Option_LoadRecommendation`                                 | `run.loadRecommendation`                                               |
| `LaundryCare_Common_Option_LowTemperatureHygiene`                              | `options.lowTemperatureHygiene`                                        |
| `LaundryCare_Common_Option_ProcessPhase`                                       | `run.processPhase`                                                     |
| `LaundryCare_Common_Option_SilentMode`                                         | `options.silentMode`                                                   |
| `LaundryCare_Common_Option_SpeedPerfect`                                       | `options.speedPerfect`                                                 |
| `LaundryCare_Common_Option_VarioPerfect`                                       | `options.varioPerfect`                                                 |
| `LaundryCare_Common_Setting_Brightness`                                        | `settings.brightness`                                                  |
| `LaundryCare_Common_Setting_EndSignalVolume`                                   | `settings.endSignalVolume`                                             |
| `LaundryCare_Common_Setting_KeySignalVolume`                                   | `settings.keySignalVolume`                                             |
| `LaundryCare_Common_Status_Program_Details_Program01`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program02`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program06`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program08`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program09`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program10`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program11`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_Details_Program20`                          | `statistics.<program>.*` (decoded)                                     |
| `LaundryCare_Common_Status_Program_History_EffectiveTime`                      | `history.latest.*`, `history.previous.*`, … (decoded)                  |
| `LaundryCare_Common_Status_Program_History_Uid`                                | `history.latest.*`, `history.previous.*`, … (decoded)                  |
| `LaundryCare_Common_Status_Version_Smm_DomainFw`                               | `info.firmware` (the version number only)                              |
| `LaundryCare_Common_Status_Version_Smm_HcFw`                                   | — (appliance-internal, no longer created)                              |
| `LaundryCare_Dryer_Event_DryingProcessFinished`                                | `events.dryingProcessFinished`                                         |
| `LaundryCare_Dryer_Option_ConnectedDry_OriginalProgramTime`                    | `run.connectedDryOriginalProgramTime`                                  |
| `LaundryCare_Dryer_Option_DryingTarget`                                        | `options.dryingTarget`                                                 |
| `LaundryCare_Dryer_Option_DryingTargetAdjustment`                              | `options.dryingTargetAdjustment`                                       |
| `LaundryCare_Dryer_Option_Gentle`                                              | `options.gentle`                                                       |
| `LaundryCare_Dryer_Option_HalfLoad`                                            | `options.halfLoad`                                                     |
| `LaundryCare_Dryer_Option_ProcessPhase`                                        | `run.processPhase`                                                     |
| `LaundryCare_Dryer_Option_Refresher`                                           | `options.refresher`                                                    |
| `LaundryCare_Dryer_Option_WrinkleGuard`                                        | `options.wrinkleGuard`                                                 |
| `LaundryCare_Washer_Event_Circulation_Pump_ErrorLockedRotor`                   | `events.circulationPumpErrorLockedRotor`                               |
| `LaundryCare_Washer_Event_Circulation_Pump_ErrorMaxTorque`                     | `events.circulationPumpErrorMaxTorque`                                 |
| `LaundryCare_Washer_Event_IDos1FillLevelPoor`                                  | `events.iDos1FillLevelPoor`                                            |
| `LaundryCare_Washer_Event_IDos2FillLevelPoor`                                  | `events.iDos2FillLevelPoor`                                            |
| `LaundryCare_Washer_Event_IDosUnitDefect`                                      | `events.iDosUnitDefect`                                                |
| `LaundryCare_Washer_Event_PumpError`                                           | `events.pumpError`                                                     |
| `LaundryCare_Washer_Event_Spin_SpinAbort`                                      | `events.spinSpinAbort`                                                 |
| `LaundryCare_Washer_Event_WaterSupply_WarmWaterAbsent`                         | `events.waterSupplyWarmWaterAbsent`                                    |
| `LaundryCare_Washer_Option_EISA`                                               | `options.eISA`                                                         |
| `LaundryCare_Washer_Option_IDos1_Active`                                       | `options.iDos1Active`                                                  |
| `LaundryCare_Washer_Option_IDos1Active`                                        | `options.iDos1Active`                                                  |
| `LaundryCare_Washer_Option_IDos1DosingLevel`                                   | `options.iDos1DosingLevel`                                             |
| `LaundryCare_Washer_Option_IDos2_Active`                                       | `options.iDos2Active`                                                  |
| `LaundryCare_Washer_Option_IDos2Active`                                        | `options.iDos2Active`                                                  |
| `LaundryCare_Washer_Option_IDos2DosingLevel`                                   | `options.iDos2DosingLevel`                                             |
| `LaundryCare_Washer_Option_IntensivePlus`                                      | `options.intensivePlus`                                                |
| `LaundryCare_Washer_Option_LessIroning`                                        | `options.lessIroning`                                                  |
| `LaundryCare_Washer_Option_MiniLoad`                                           | `options.miniLoad`                                                     |
| `LaundryCare_Washer_Option_MultipleSoak`                                       | `options.multipleSoak`                                                 |
| `LaundryCare_Washer_Option_Prewash`                                            | `options.prewash`                                                      |
| `LaundryCare_Washer_Option_ProcessPhase`                                       | `run.processPhase`                                                     |
| `LaundryCare_Washer_Option_RinseHold`                                          | `options.rinseHold`                                                    |
| `LaundryCare_Washer_Option_RinsePlus`                                          | `options.rinsePlus`                                                    |
| `LaundryCare_Washer_Option_RinsePlus1`                                         | `options.rinsePlus1`                                                   |
| `LaundryCare_Washer_Option_SilentWash`                                         | `options.silentWash`                                                   |
| `LaundryCare_Washer_Option_Soak`                                               | `options.soak`                                                         |
| `LaundryCare_Washer_Option_SpeedPerfect`                                       | `options.speedPerfect`                                                 |
| `LaundryCare_Washer_Option_SpinSpeed`                                          | `options.spinSpeed`                                                    |
| `LaundryCare_Washer_Option_Stains`                                             | `options.stains`                                                       |
| `LaundryCare_Washer_Option_Temperature`                                        | `options.temperature`                                                  |
| `LaundryCare_Washer_Option_WaterAndRinsePlus1`                                 | `options.waterAndRinsePlus1`                                           |
| `LaundryCare_Washer_Option_WaterPlus`                                          | `options.waterPlus`                                                    |
| `LaundryCare_Washer_Setting_EnableDrumCleanReminder`                           | `settings.enableDrumCleanReminder`                                     |
| `LaundryCare_Washer_Setting_IDos1BaseLevel`                                    | `settings.iDos1BaseLevel`                                              |
| `LaundryCare_Washer_Setting_IDos1_ContentName`                                 | `settings.iDos1ContentName`                                            |
| `LaundryCare_Washer_Setting_IDos2BaseLevel`                                    | `settings.iDos2BaseLevel`                                              |
| `LaundryCare_Washer_Setting_IDos2Content`                                      | `settings.iDos2Content`                                                |
| `LaundryCare_Washer_Setting_IDos2_ContentName`                                 | `settings.iDos2ContentName`                                            |
| `LaundryCare_Washer_Status_Detergent_All_Consumed`                             | `counters.detergentAllConsumed`                                        |
| `LaundryCare_Washer_Status_Softener_All_Consumed`                              | `counters.softenerAllConsumed`                                         |
| `LaundryCare_WasherDryer_Option_DryingTarget`                                  | `options.dryingTarget`                                                 |
| `LaundryCare_WasherDryer_Option_LowTemperatureHygiene`                         | `options.lowTemperatureHygiene`                                        |
| `LaundryCare_WasherDryer_Option_ProgramMode`                                   | `options.programMode`                                                  |
| `LaundryCare_WasherDryer_Option_WrinkleGuardBoost`                             | `options.wrinkleGuardBoost`                                            |
| `Refrigeration_Common_Setting_BottleCooler_SetpointTemperature`                | `settings.bottleCoolerSetpointTemperature`                             |
| `Refrigeration_Common_Setting_ChillerCommon_SetpointTemperature`               | `settings.chillerCommonSetpointTemperature`                            |
| `Refrigeration_Common_Setting_ChillerLeft_SetpointTemperature`                 | `settings.chillerLeftSetpointTemperature`                              |
| `Refrigeration_Common_Setting_ChillerRight_SetpointTemperature`                | `settings.chillerRightSetpointTemperature`                             |
| `Refrigeration_Common_Setting_Dispenser_Enabled`                               | `settings.dispenserEnabled`                                            |
| `Refrigeration_Common_Setting_Door_AssistantForceFreezer`                      | `settings.doorAssistantForceFreezer`                                   |
| `Refrigeration_Common_Setting_Door_AssistantForceFridge`                       | `settings.doorAssistantForceFridge`                                    |
| `Refrigeration_Common_Setting_Door_AssistantFreezer`                           | `settings.doorAssistantFreezer`                                        |
| `Refrigeration_Common_Setting_Door_AssistantFridge`                            | `settings.doorAssistantFridge`                                         |
| `Refrigeration_Common_Setting_Door_AssistantTimeoutFreezer`                    | `settings.doorAssistantTimeoutFreezer`                                 |
| `Refrigeration_Common_Setting_Door_AssistantTimeoutFridge`                     | `settings.doorAssistantTimeoutFridge`                                  |
| `Refrigeration_Common_Setting_Door_AssistantTriggerFreezer`                    | `settings.doorAssistantTriggerFreezer`                                 |
| `Refrigeration_Common_Setting_Door_AssistantTriggerFridge`                     | `settings.doorAssistantTriggerFridge`                                  |
| `Refrigeration_Common_Setting_EcoMode`                                         | `settings.ecoMode`                                                     |
| `Refrigeration_Common_Setting_FreshMode`                                       | `settings.freshMode`                                                   |
| `Refrigeration_Common_Setting_Light_External_Brightness`                       | `settings.lightExternalBrightness`                                     |
| `Refrigeration_Common_Setting_Light_External_Power`                            | `settings.lightExternalPower`                                          |
| `Refrigeration_Common_Setting_Light_Internal_Brightness`                       | `settings.lightInternalBrightness`                                     |
| `Refrigeration_Common_Setting_Light_Internal_EnableTheaterMode`                | `settings.lightInternalEnableTheaterMode`                              |
| `Refrigeration_Common_Setting_Light_Internal_Power`                            | `settings.lightInternalPower`                                          |
| `Refrigeration_Common_Setting_SabbathMode`                                     | `settings.sabbathMode`                                                 |
| `Refrigeration_Common_Setting_VacationMode`                                    | `settings.vacationMode`                                                |
| `Refrigeration_Common_Setting_WineCompartment_SetpointTemperature`             | `settings.wineCompartmentSetpointTemperature`                          |
| `Refrigeration_Common_Setting_WineCompartment2_SetpointTemperature`            | `settings.wineCompartment2SetpointTemperature`                         |
| `Refrigeration_Common_Setting_WineCompartment3_SetpointTemperature`            | `settings.wineCompartment3SetpointTemperature`                         |
| `Refrigeration_Common_Status_Door_BottleCooler`                                | `doors.bottleCooler`                                                   |
| `Refrigeration_Common_Status_Door_Chiller`                                     | `doors.chiller`                                                        |
| `Refrigeration_Common_Status_Door_ChillerCommon`                               | `doors.chillerCommon`                                                  |
| `Refrigeration_Common_Status_Door_ChillerLeft`                                 | `doors.chillerLeft`                                                    |
| `Refrigeration_Common_Status_Door_ChillerRight`                                | `doors.chillerRight`                                                   |
| `Refrigeration_Common_Status_Door_FlexCompartment`                             | `doors.flexCompartment`                                                |
| `Refrigeration_Common_Status_Door_Freezer`                                     | `doors.freezer`                                                        |
| `Refrigeration_Common_Status_Door_Refrigerator`                                | `doors.refrigerator`                                                   |
| `Refrigeration_Common_Status_Door_Refrigerator2`                               | `doors.refrigerator2`                                                  |
| `Refrigeration_Common_Status_Door_Refrigerator3`                               | `doors.refrigerator3`                                                  |
| `Refrigeration_Common_Status_Door_WineCompartment`                             | `doors.wineCompartment`                                                |
| `Refrigeration_FridgeFreezer_Event_DoorAlarmFreezer`                           | `events.doorAlarmFreezer`                                              |
| `Refrigeration_FridgeFreezer_Event_DoorAlarmRefrigerator`                      | `events.doorAlarmRefrigerator`                                         |
| `Refrigeration_FridgeFreezer_Event_TemperatureAlarmFreezer`                    | `events.temperatureAlarmFreezer`                                       |
| `Refrigeration_FridgeFreezer_Setting_SetpointTemperatureFreezer`               | `settings.setpointTemperatureFreezer`                                  |
| `Refrigeration_FridgeFreezer_Setting_SetpointTemperatureRefrigerator`          | `settings.setpointTemperatureRefrigerator`                             |
| `Refrigeration_FridgeFreezer_Setting_SuperModeFreezer`                         | `settings.superModeFreezer`                                            |
| `Refrigeration_FridgeFreezer_Setting_SuperModeRefrigerator`                    | `settings.superModeRefrigerator`                                       |
| `general.brand`                                                                | — (no longer created)                                                  |
| `general.connected`                                                            | `info.reachable`                                                       |
| `general.enumber`                                                              | — (no longer created)                                                  |
| `general.haId`                                                                 | — (no longer created)                                                  |
| `general.name`                                                                 | — (no longer created)                                                  |
| `general.type`                                                                 | — (no longer created)                                                  |
| `general.vib`                                                                  | — (no longer created)                                                  |
| `own_request.request_json`                                                     | — (no longer created)                                                  |
| `own_request.response`                                                         | — (no longer created)                                                  |
| `rateLimit.*`, `rateTokenLimit.*` (below `homeconnect.0`)                      | — (removed)                                                            |

## Updating from 1.7 – 1.23

The device folders were named after the app name (up to 1.12) or the E-number from the type plate (1.13 – 1.23, `sx87tx02ce-60`), which names the model only. With this version every folder moves once to the model and the appliance's own number (`sx87tx02ce-5775`). Values, recording settings, rooms, functions and aliases move along, and recorded history continues in its old series. Scripts and visualizations that use the old IDs must be updated.

The running program, the doors and the totals have their own channels now: `status.remainingProgramTime` → `run.remainingProgramTime` (likewise elapsed time, progress, phase, forecasts and recommendations), `status.doorOpen` → `doors.door`, `status.doorLocked` → `doors.doorLocked`, `status.programAllCountCompleted` → `counters.programAllCountCompleted` (likewise every total). An event or compartment door of a 2.0 test build that was a channel of its own (`events.programFinished.active`, `doors.freezer.open`) becomes a plain datapoint again (`events.programFinished`, `doors.freezer`). The last run is part of the history: `lastRun.start` → `history.latest.start` (likewise end, how it ended and the consumption); where the history already had the program and the duration, those stay and the two from `lastRun` go. Values, recordings, aliases, rooms and functions move along.

## Rate limits

Home Connect grants 1000 requests per day per application and account, at most 50 per minute, and blocks for ten minutes after ten failed requests in a row. The adapter is built around that: it uses one persistent event stream instead of polling, remembers program definitions permanently, sends at most 50 requests per minute (so the first start after an update or with a new appliance reads for a few minutes), puts your commands before waiting reads, and pauses on its own after a rate-limit answer — the log names the limit and how long Home Connect blocks. There is nothing to configure — but a second application of your own using the same credentials shares the same budget.

## Troubleshooting

| Symptom                                                                                      | Cause and remedy                                                                                                                                                            |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` stays red                                                                  | Not signed in, or the event stream is down. Use **Test connection** in the settings — it names the reason.                                                                  |
| No appliances appear                                                                         | The developer account must be linked to your Home Connect app account (its profile's default testing account = the app's e-mail address), and the sign-in must be approved. |
| Sign-in link does not work                                                                   | Codes expire after a few minutes. The adapter requests a new one automatically; the settings panel shows it on its own.                                                     |
| No sign-in link any more                                                                     | Nobody confirmed a link for an hour, so the adapter stopped asking. Use **Request a new sign-in link** in the settings.                                                     |
| `unauthorized_client: Invalid client id`                                                     | The Client ID is unknown — copy it again from your application (64 characters).                                                                                             |
| `unauthorized_client: request rejected by client authorization authority (developer portal)` | The application is not active yet — wait 15 to 60 minutes after registering or editing it, check that its status is Enabled, then request a new sign-in link.               |
| `unauthorized_client: client not authorized for this oauth flow (grant_type)`                | The application uses another OAuth flow — register a new one with Device Flow.                                                                                              |
| `invalid_client`                                                                             | The Client Secret was rejected — check it.                                                                                                                                  |
| `access_denied`                                                                              | The account was refused — check it in the Home Connect app (SingleKey ID, accepted terms of use) and that it is the one entered in the developer portal.                    |
| In China                                                                                     | Home Connect in China (`api.home-connect.cn`) is not supported.                                                                                                             |
| An appliance stays grey                                                                      | It is switched off or has no network. Its data points stay and keep their last values.                                                                                      |
| A write does nothing                                                                         | The appliance permits no remote operation right now (`status.remoteControlActive`), or the program option does not belong to the selected program.                          |
| Log says "SDK.Error.NoProgramActive"                                                         | That is the normal answer of an idle appliance, not an error — it is logged at debug level.                                                                                 |

## Diagnostics report

When an appliance does not do what it should, open the instance settings, tab **Expert**, pick the appliance and download its diagnostics report. It holds what Home Connect answered for this appliance (also a fresh read of its status, settings and programs while it is connected), the events of the live stream, the appliance's datapoints with their values and the adapter's recent log lines. Attach the file to an issue with the form **Report a device** — the card links to it.

The report is made only when you ask for it, stays in memory until the download and writes nothing. Serial numbers, the names you gave your appliances and your sign-in data stand in it as placeholders.

## Support

Questions, bug reports and ideas: [github.com/iobroker-community-adapters/ioBroker.homeconnect](https://github.com/iobroker-community-adapters/ioBroker.homeconnect).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line): 
    ### **WORK IN PROGRESS**
-->

### 2.0.0-alpha.0 (2026-10-21)

- (krobipd) Changed: complete rewrite with a new object tree and new datapoint IDs — breaking for existing scripts and visualizations
- (krobipd) Changed: readable values with units and labels in the user's language
- (krobipd) New: program history and the consumption of the last run as readable datapoints
- (krobipd) Changed: the adapter requires js-controller 7.2.5 and Admin 8.2.0 or newer now
- (krobipd) New: sign-in panel in the instance settings with a connection test and a reset of the login
- (krobipd) Improved: an update from 1.x keeps rooms, functions, aliases and the Home Connect sign-in
- (krobipd) Fixed: the object database no longer grows with every value change (#387), and the start stays within the Home Connect request limits (#327, #58)
- (krobipd) New: diagnostics report on the Expert tab, with a 'Report a device' issue form for it

### 1.6.1 (2026-05-12)

- (TA2k) Login/Refresh flow improved

### 1.6.0 (2026-05-11)

- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (Lucky-ESA) Fixed adapter crash if URI is empty
- (Lucky-ESA) Save remaining time in active folder
- (Lucky-ESA) Device monitoring starts only after the adapter has started (this may take up to 2 minutes)

### 1.5.2 (2025-12-14)

- (Lucky-ESA) Rate limit of 50 requests per minute intercepted at adapter startup
- (Lucky-ESA) Added custom request

### 1.5.1 (2025-09-20)

- (Lucky-ESA) Fixed: Name of the objects are deleted

## License

The MIT License (MIT)

Copyright (c) 2019-2026 TA2k <tombox2020@gmail.com>  
Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.