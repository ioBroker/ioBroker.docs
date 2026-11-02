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

Hausgeräte von Bosch, Siemens, NEFF und Gaggenau über die offizielle Home-Connect-Cloud-API steuern und überwachen — Geschirrspüler, Waschmaschinen, Trockner, Backöfen, Kochfelder, Dunstabzugshauben, Kühl- und Gefriergeräte, Kaffeevollautomaten, Saugroboter und mehr.

Jeder Wert kommt in einer Form an, mit der sich direkt arbeiten lässt: Ein/Aus als Boolean, eine feste Auswahl als lesbarer Name, ein Messwert als Zahl mit Einheit und Grenzen. Änderungen treffen live über einen einzigen Ereignisstrom ein, und Programme lassen sich aus ioBroker heraus wählen, einstellen und starten.

## Voraussetzungen

- Node.js >= 22
- js-controller >= 7.2.5
- Admin >= 8.2.0
- Ein kostenloses Home-Connect-Entwicklerkonto für Client ID und Client Secret

## Zugangsdaten bei Home Connect anlegen

Drei Dinge gehören zusammen: das normale Home-Connect-Konto (das der Home-Connect-App, in dem die Geräte gekoppelt sind), ein damit verlinktes Entwicklerkonto und eine darin registrierte Anwendung. Die Einstellungsseite zeigt dieselben Schritte als Checkliste, mit Knöpfen zum Anlegen des Entwicklerkontos, zum Registrieren der Anwendung und zu den eigenen Anwendungen.

1. Auf [developer.home-connect.com](https://developer.home-connect.com/user/register) ein kostenloses Entwicklerkonto anlegen. Als **Default Home Connect Account for Testing** die E-Mail-Adresse des Home-Connect-App-Kontos eintragen — genau wie in der App, in **Kleinbuchstaben**. Das verlinkt die beiden Konten; ohne das wird die Anmeldung abgelehnt.
2. [Eine Anwendung registrieren](https://developer.home-connect.com/applications/add): **Application ID** beliebig, **OAuth Flow** `Device Flow` (der Adapter läuft auf einem Server ohne Browser; das Verfahren lässt sich später nicht ändern), **Success Redirect** leer, **One Time Token Mode** aus.
3. **15 bis 60 Minuten warten** — eine neue oder geänderte Anwendung ist erst danach bei Home Connect aktiv.
4. **Client ID** (64 Zeichen) und **Client Secret** in die Adapter-Einstellungen übernehmen und speichern.

## Anmelden

Nach dem Speichern der Zugangsdaten fordert der Adapter einen Anmelde-Link an. Das Einstellungs-Panel zeigt ihn zusammen mit dem **Code**, der zu bestätigen ist. Link öffnen, mit dem Home-Connect-Konto anmelden, Zugriff bestätigen — der Adapter merkt die Freigabe innerhalb weniger Sekunden von selbst und speichert die Anmeldung verschlüsselt. Die Benachrichtigung verweist nur auf die Einstellungen: der Code wechselt alle fünf Minuten, das Panel zeigt immer den aktuellen.

Solange der Link wartet, erneuert er sich alle fünf Minuten. Bestätigt eine Stunde lang niemand, fragt der Adapter Home Connect nicht mehr nach neuen Links; **Neuen Anmelde-Link anfordern** im Panel startet neu, ein Neustart der Instanz ebenso. **Anmeldung zurücksetzen** vergisst die Anmeldung und startet eine neue — etwa um zu einem anderen Home-Connect-Konto zu wechseln. Die Schaltfläche **Verbindung testen** fragt Home Connect wirklich: sie meldet, wie viele Geräte das Konto führt und wie viele davon gerade verbunden sind, und ob die Live-Updates laufen.

Angemeldet wird einmal. Der Adapter erneuert seinen Zugang selbst; eine neue Anmeldung ist nur nötig, wenn der Zugriff im Home-Connect-Konto widerrufen wurde, wenn Home Connect die Anwendung ablehnt (deaktiviert, gelöscht, neues Secret) oder wenn die ioBroker-Daten auf ein anderes System umgezogen sind — dort ist die gespeicherte Anmeldung nicht lesbar, und das Log sagt das.

Lehnt Home Connect die Anmeldung ab, zeigt das Panel die Antwort und was zu tun ist; `auth.lastError` hält die Antwort fest (siehe Fehlersuche).

## Der Objektbaum

Jedes Gerät bekommt einen Ordner. Sein Name ist das **Modell und die letzten vier Zeichen der eigenen Home-Connect-Nummer** des Geräts (zum Beispiel `sx87tx02ce-5775`) — unveränderlich und bei zwei Geräten desselben Modells verschieden, was weder der Gerätename aus der App noch die E-Nummer vom Typenschild ist. Der App-Name bleibt als Anzeigename des Ordners sichtbar und folgt der App live. Enden zwei Geräte eines Modells auf dieselben vier Zeichen, bekommt das zweite seine ganze Nummer.

Unter jedem Gerät — welche Kanäle ein Gerät bekommt, hängt von seinem Typ ab; Kühl-, Gefrier- und Weinkühlgeräte haben keine Programme:

| Kanal        | Was darin liegt                                                                                                                                                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`       | `reachable` — ob das Gerät gerade mit Home Connect verbunden ist (der grün/graue Punkt am Ordner); `firmware` — der Firmware-Stand einer Waschmaschine, eines Trockners oder Waschtrockners; Home Connect kennt keine Abfrage dafür, er erscheint, sobald das Gerät seine Versionen von sich aus schickt, und bleibt dann stehen |
| `status`     | Nur-Lese-Zustand des Geräts: Betriebszustand, `programRunning`, Fern- und Vor-Ort-Bedienung, Innenlicht, Störungen, Akku                                                                                                                                                                                                         |
| `run`        | Das laufende Programm: Rest-, Lauf- und Gesamtzeit, Fortschritt, Phase, Energie- und Wasserprognose, Empfehlungen — leer, solange kein Programm läuft                                                                                                                                                                            |
| `settings`   | Schreibbare Einstellungen: Betriebszustand, Kindersicherung, Innenbeleuchtung, Kühltemperaturen                                                                                                                                                                                                                                  |
| `doors`      | Jede Tür des Geräts als Boolean: `door` (die Gerätetür), `doorLocked` und bei Kühlgeräten jedes Fach (`freezer`, `refrigerator` …)                                                                                                                                                                                               |
| `events`     | Jedes Ereignis dieses Gerätetyps als Boolean: Programm beendet, Salz fast leer, Klarspüler leer, Filter gesättigt, Türalarm …                                                                                                                                                                                                    |
| `counters`   | Gesamtzähler: Läufe, Laufzeit, Energie, Wasser, Waschmittel, Weichspüler, Getränke                                                                                                                                                                                                                                               |
| `programs`   | `selectedProgram`, `activeProgram` sowie die Schaltflächen `start` und `stop`                                                                                                                                                                                                                                                    |
| `options`    | Die Optionen, die man für ein Programm wählt: Temperatur, Schleuderdrehzahl, Intensivzone, Startverzögerung …                                                                                                                                                                                                                    |
| `commands`   | Momentschalter, die das Gerät anbietet, etwa das Quittieren eines Ereignisses                                                                                                                                                                                                                                                    |
| `history`    | Die Läufe, je ein Kanal: `latest`, `previous`, `thirdLatest` … mit Programm und Dauer; `latest` trägt dazu Start, Ende, wie er endete, sowie Wasser, Energie, Waschmittel und Weichspüler, wo das Gerät sie meldet                                                                                                               |
| `statistics` | Je Programm: gestartete und abgeschlossene Läufe, Laufzeit                                                                                                                                                                                                                                                                       |

Auf Instanzebene fassen `info.devicesTotal`, `info.devicesOnline` und `info.devicesAllOnline` das Konto zusammen; `info.connection` ist grün, wenn der Adapter angemeldet ist **und** die Live-Updates laufen, und `auth.lastError` hält die Antwort von Home Connect auf eine abgelehnte Anmeldung fest (leer, solange die Anmeldung steht; `Unknown`, solange noch nichts gefragt wurde).

Woher die Datenpunkte kommen:

- **Status, Einstellungen, Programme, Optionen und Befehle** meldet das Gerät selbst an Home Connect — genau diese legt der Adapter an. Unter `options` steht nur, was man für ein Programm wählt; Werte, die das Gerät während eines Programms meldet (Restzeit, Fortschritt, Prognosen, Programmphase), stehen unter `run`.
- **Ereignisse** sind die Ausnahme. Home Connect kann nicht beantworten, welche Ereignisse ein Gerät schicken kann — ein Ereignis kommt erst in dem Moment, in dem es eintritt. Deshalb legt der Adapter alle bekannten Ereignisse des Gerätetyps vorab aus seinem eigenen Katalog an: ein Skript auf „Salz leer“ lässt sich heute bauen, statt Monate zu warten, bis das Salz einmal ausgeht. Ein Gerät kann deshalb Ereignis-Datenpunkte haben, die es nie nutzt; ein Ereignis, das der Katalog nicht kennt, kommt dazu, sobald das Gerät es zum ersten Mal schickt.

Zwei Eigenschaften sind wichtig zu wissen:

- **Jeder Datenpunkt existiert ab dem ersten Lesen des verbundenen Geräts** — die Ereignisse des Gerätetyps schon ab dem ersten Start, und die Optionen _aller_ Programme, nicht nur die des gerade gewählten.
- **Kein Datenpunkt verschwindet je.** Ein ausgeschaltetes Gerät meldet der Cloud sehr viel weniger, aber das heißt nie, dass es eine Fähigkeit verloren hätte. Nur ein aus dem Home-Connect-Konto entferntes Gerät verliert seinen Ordner. (Ausnahme: ein Statistik-Kanal `program<Nummer>` zieht auf den Programmnamen um, sobald der Adapter ihn gelernt hat oder seine Programmtabelle die Nummer kennt; Aufzeichnungen, Aliase, Räume und Funktionen ziehen mit.)

## Geräte bedienen

- **Eine Einstellung:** den Wert in den Datenpunkt unter `settings` schreiben. `"true"`, `1` und `true` funktionieren gleichermaßen — der Adapter wandelt vor dem Senden in den Typ des Datenpunkts.
- **Ein Programm starten:** in `programs.selectedProgram` wählen, die gewünschten Optionen unter `options` setzen, dann `programs.start` auf `true`. Der Adapter schickt die gewählten Optionen mit dem Start; verweigert das Gerät diese Kombination, wiederholt er einmal mit den Vorgaben des Programms.
- **Ein Programm stoppen:** `programs.stop` auf `true` setzen.
- **Einen Befehl auslösen:** die Schaltfläche unter `commands` auf `true` setzen; sie fällt von selbst auf `false` zurück.

Ein geschriebener Wert gilt als erledigt (`ack`), sobald das Gerät ihn zurückmeldet. Lehnt das Gerät ihn ab, springt der Datenpunkt auf den echten Wert des Geräts zurück.

Home Connect lässt eine Fernbedienung nur zu, wenn das Gerät es erlaubt — die meisten Maschinen brauchen dafür **Fernstart** am Gerät selbst, und viele verweigern eine Änderung, während ein Programm läuft. `status.remoteControlActive` und `status.remoteControlStartAllowed` sagen, was das Gerät gerade zulässt.

## Namen und Beschreibungen der Datenpunkte

Die eigenen Namen des Adapters gehen vor: Er benennt die Ereignisse, die üblichen Status-Werte und Einstellungen, die Programm-Optionen und seine eigene Struktur in elf Sprachen. Wo er keinen eigenen Namen hat, nimmt er den lokalisierten Namen, den Home Connect in der ioBroker-Systemsprache schickt, und zuletzt einen aus der Kennung abgeleiteten lesbaren Namen. Die Beschreibung erklärt, was ein Datenpunkt bedeutet, wiederholt nie den Herstellerbezeichner und bleibt leer, wo es nichts zu erklären gibt.

Namen und Beschreibungen gehören dem Adapter: ein Update zieht bestehende Anlagen mit, ein Baum aus einer älteren Fassung behält also keine alten Bezeichnungen. Wer eigene Benennungen will, nutzt Aliase oder eigene Datenpunkte unter `0_userdata`.

## Umstieg von 1.x

Version 2.0 ersetzt den Roh-Datenbaum der Community-Versionen bis 1.6.x durch einen lesbaren je Gerät. Beispiel: aus `homeconnect.0.012345678901234567.status.BSH_Common_Status_DoorState` wird `homeconnect.0.kg49nsbbf-4567.status.doorOpen` — der Geräte-Ordner heißt nach dem Modell und den letzten vier Stellen der eigenen Nummer des Geräts.

Den Baum stellt das Update selbst um: Anmeldung und Client ID bleiben, und Räume, Funktionen und Aliase ziehen zu dem Datenpunkt um, der den alten ersetzt, sobald das Gerät einmal gelesen ist. Eine Aufzeichnungs-Einstellung zieht nur an einem Baum mit, an dem auch ein Raum, eine Funktion oder ein Alias hängt, und nur dort, wo genau ein neuer Datenpunkt gleichen Werttyps den alten ersetzt. Wo sich der Typ geändert hat (ein Tür-Text wurde Ja/Nein) oder aus einem alten Datenpunkt mehrere wurden (Betriebszustand → Betriebszustand + Programm läuft), startet der neue Datenpunkt ohne Aufzeichnung — dort neu einschalten. Das Log zählt die mitgezogenen Raum-/Funktionseinträge und Aliase sowie die Datenpunkte mit Raum oder Alias, die kein Gegenstück hatten.

Was du tun musst:

1. Vor dem Update ein Backup machen. Zurück auf 1.x geht nicht — der alte Baum wird entfernt, sobald er übergeben ist, und 1.x kann die Anmeldung nicht lesen, die 2.0 verschlüsselt speichert.
2. Skripte und Visualisierungen auf die neuen IDs umstellen. Die Tabelle nennt zum letzten Teil jeder alten ID den Datenpunkt, der sie ersetzt (unter dem neuen Geräte-Ordner). Zeilen mit (entschlüsselt) sind neue Datenpunkte aus dem alten Rohwert; Räume, Funktionen, Aliase und Aufzeichnungen des alten Roh-Datenpunkts ziehen nicht mit.

| Alte ID, letzter Teil (1.x)                                                    | Neuer Datenpunkt (2.0)                                                 |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `BSH_Common_Command_AcknowledgeEvent`                                          | `commands.acknowledgeEvent`                                            |
| `BSH_Common_Command_DeactivateWiFi`                                            | — (geräteintern, wird nicht mehr angelegt)                             |
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
| `BSH_Common_Setting_AllowBackendConnection`                                    | — (geräteintern, wird nicht mehr angelegt)                             |
| `BSH_Common_Setting_AmbientLightBrightness`                                    | `settings.ambientLightBrightness`                                      |
| `BSH_Common_Setting_AmbientLightColor`                                         | `settings.ambientLightColor`                                           |
| `BSH_Common_Setting_AmbientLightCustomColor`                                   | `settings.ambientLightCustomColor`                                     |
| `BSH_Common_Setting_AmbientLightEnabled`                                       | `settings.ambientLightEnabled`                                         |
| `BSH_Common_Setting_ChildLock`                                                 | `settings.childLock`                                                   |
| `BSH_Common_Setting_LiquidVolumeUnit`                                          | `settings.liquidVolumeUnit`                                            |
| `BSH_Common_Setting_PowerState`                                                | `settings.powerState`                                                  |
| `BSH_Common_Setting_TemperatureUnit`                                           | `settings.temperatureUnit`                                             |
| `BSH_Common_Status_BackendConnected`                                           | — (geräteintern, wird nicht mehr angelegt)                             |
| `BSH_Common_Status_BatteryChargingState`                                       | `status.batteryChargingState`                                          |
| `BSH_Common_Status_BatteryLevel`                                               | `status.batteryLevel`                                                  |
| `BSH_Common_Status_ChargingConnection`                                         | `status.chargingConnection`                                            |
| `BSH_Common_Status_DoorState`                                                  | `doors.door` (+ `doors.doorLocked` bei Geräten mit verriegelbarer Tür) |
| `BSH_Common_Status_ErrorCodesList`                                             | `status.errorCodes`, `status.faultActive` (entschlüsselt)              |
| `BSH_Common_Status_InteriorIlluminationActive`                                 | `status.interiorIlluminationActive`                                    |
| `BSH_Common_Status_LocalControlActive`                                         | `status.localControlActive`                                            |
| `BSH_Common_Status_OperationState`                                             | `status.operationState`, `status.programRunning`                       |
| `BSH_Common_Status_Program_All_Count_Completed`                                | `counters.programAllCountCompleted`                                    |
| `BSH_Common_Status_Program_All_Count_Started`                                  | `counters.programAllCountStarted`                                      |
| `BSH_Common_Status_Program_All_Energy_Consumed`                                | `counters.programAllEnergyConsumed`                                    |
| `BSH_Common_Status_Program_All_Time_Effective`                                 | `counters.programAllTimeEffective`                                     |
| `BSH_Common_Status_Program_All_Water_Consumed`                                 | `counters.programAllWaterConsumed`                                     |
| `BSH_Common_Status_ProgramSessionSummary_Latest`                               | `history.latest.*` (entschlüsselt)                                     |
| `BSH_Common_Status_RemoteControlActive`                                        | `status.remoteControlActive`                                           |
| `BSH_Common_Status_RemoteControlStartAllowed`                                  | `status.remoteControlStartAllowed`                                     |
| `BSH_Common_Status_RemoteControlStartAllowedSince`                             | `status.remoteControlStartAllowedSince`                                |
| `BSH_Common_Status_SoftwareUpdateTransactionID`                                | — (geräteintern, wird nicht mehr angelegt)                             |
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
| `LaundryCare_Common_Status_Program_Details_Program01`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program02`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program06`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program08`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program09`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program10`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program11`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_Details_Program20`                          | `statistics.<Programm>.*` (entschlüsselt)                              |
| `LaundryCare_Common_Status_Program_History_EffectiveTime`                      | `history.latest.*`, `history.previous.*`, … (entschlüsselt)            |
| `LaundryCare_Common_Status_Program_History_Uid`                                | `history.latest.*`, `history.previous.*`, … (entschlüsselt)            |
| `LaundryCare_Common_Status_Version_Smm_DomainFw`                               | `info.firmware` (nur die Versionsnummer)                               |
| `LaundryCare_Common_Status_Version_Smm_HcFw`                                   | — (geräteintern, wird nicht mehr angelegt)                             |
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
| `general.brand`                                                                | — (wird nicht mehr angelegt)                                           |
| `general.connected`                                                            | `info.reachable`                                                       |
| `general.enumber`                                                              | — (wird nicht mehr angelegt)                                           |
| `general.haId`                                                                 | — (wird nicht mehr angelegt)                                           |
| `general.name`                                                                 | — (wird nicht mehr angelegt)                                           |
| `general.type`                                                                 | — (wird nicht mehr angelegt)                                           |
| `general.vib`                                                                  | — (wird nicht mehr angelegt)                                           |
| `own_request.request_json`                                                     | — (wird nicht mehr angelegt)                                           |
| `own_request.response`                                                         | — (wird nicht mehr angelegt)                                           |
| `rateLimit.*`, `rateTokenLimit.*` (unter `homeconnect.0`)                      | — (entfernt)                                                           |

## Umstieg von 1.7 – 1.23

Die Geräte-Ordner hießen nach dem App-Namen (bis 1.12) oder nach der E-Nummer vom Typenschild (1.13 – 1.23, `sx87tx02ce-60`), und die benennt nur das Modell. Mit dieser Version zieht jeder Ordner einmal auf Modell und eigene Nummer des Geräts um (`sx87tx02ce-5775`). Werte, Aufzeichnungs-Einstellungen, Räume, Funktionen und Aliase ziehen mit, aufgezeichnete Verläufe laufen in ihrer bisherigen Reihe weiter. Skripte und Visualisierungen mit den alten IDs müssen angepasst werden.

Das laufende Programm, die Türen und die Gesamtzähler haben jetzt eigene Kanäle: `status.remainingProgramTime` → `run.remainingProgramTime` (ebenso Laufzeit, Fortschritt, Phase, Prognosen und Empfehlungen), `status.doorOpen` → `doors.door`, `status.doorLocked` → `doors.doorLocked`, `status.programAllCountCompleted` → `counters.programAllCountCompleted` (ebenso jeder Gesamtzähler). Ein Ereignis oder eine Fachtür, die in einem 2.0-Testbau ein eigener Kanal war (`events.programFinished.active`, `doors.freezer.open`), wird wieder ein einfacher Datenpunkt (`events.programFinished`, `doors.freezer`). Der letzte Lauf gehört zum Verlauf: `lastRun.start` → `history.latest.start` (ebenso Ende, wie er endete und der Verbrauch); wo der Verlauf Programm und Dauer schon hatte, bleiben diese, die zwei aus `lastRun` entfallen. Werte, Aufzeichnungen, Aliase, Räume und Funktionen ziehen mit.

## Anfragegrenzen

Home Connect gewährt 1000 Anfragen pro Tag je Anwendung und Konto, höchstens 50 pro Minute, und sperrt für zehn Minuten nach zehn fehlgeschlagenen Anfragen in Folge. Der Adapter ist darauf gebaut: ein dauerhafter Ereignisstrom statt Abfragen im Takt, dauerhaft gemerkte Programmdefinitionen, höchstens 50 Anfragen pro Minute (der erste Start nach einem Update oder mit einem neuen Gerät liest deshalb einige Minuten), deine Befehle vor wartenden Leseanfragen, und eine selbsttätige Pause nach einer Grenz-Antwort — das Log nennt die Grenze und wie lange Home Connect sperrt. Einzustellen ist nichts — aber eine zweite eigene Anwendung mit denselben Zugangsdaten teilt sich dasselbe Kontingent.

## Fehlersuche

| Symptom                                                                                      | Ursache und Abhilfe                                                                                                                                                            |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection` bleibt rot                                                                 | Nicht angemeldet, oder der Ereignisstrom liegt. **Verbindung testen** in den Einstellungen nennt den Grund.                                                                    |
| Es erscheinen keine Geräte                                                                   | Das Entwicklerkonto muss mit dem App-Konto verlinkt sein (im Profil: Standard-Testkonto = E-Mail-Adresse der App), und die Anmeldung muss bestätigt sein.                      |
| Der Anmelde-Link funktioniert nicht                                                          | Codes laufen nach wenigen Minuten ab. Der Adapter fordert selbsttätig einen neuen an; das Einstellungs-Panel zeigt ihn von selbst.                                             |
| Es gibt keinen Anmelde-Link mehr                                                             | Eine Stunde lang hat niemand bestätigt, deshalb fragt der Adapter nicht mehr nach. **Neuen Anmelde-Link anfordern** in den Einstellungen.                                      |
| `unauthorized_client: Invalid client id`                                                     | Die Client ID ist unbekannt — noch einmal aus der Anwendung kopieren (64 Zeichen).                                                                                             |
| `unauthorized_client: request rejected by client authorization authority (developer portal)` | Die Anwendung ist noch nicht aktiv — nach dem Registrieren oder Ändern 15 bis 60 Minuten warten, prüfen, dass ihr Status Enabled ist, dann einen neuen Anmelde-Link anfordern. |
| `unauthorized_client: client not authorized for this oauth flow (grant_type)`                | Die Anwendung nutzt ein anderes OAuth-Verfahren — eine neue mit Device Flow registrieren.                                                                                      |
| `invalid_client`                                                                             | Das Client Secret wurde abgelehnt — prüfen.                                                                                                                                    |
| `access_denied`                                                                              | Das Konto wurde abgelehnt — in der Home-Connect-App prüfen (SingleKey ID, akzeptierte Nutzungsbedingungen) und ob es das im Entwicklerportal eingetragene Konto ist.           |
| In China                                                                                     | Home Connect in China (`api.home-connect.cn`) wird nicht unterstützt.                                                                                                          |
| Ein Gerät bleibt grau                                                                        | Es ist ausgeschaltet oder ohne Netz. Seine Datenpunkte bleiben mit ihren letzten Werten stehen.                                                                                |
| Ein Schreibvorgang bewirkt nichts                                                            | Das Gerät lässt gerade keine Fernbedienung zu (`status.remoteControlActive`), oder die Option gehört nicht zum gewählten Programm.                                             |
| Im Log steht „SDK.Error.NoProgramActive"                                                     | Das ist die normale Antwort eines untätigen Geräts, kein Fehler — sie wird auf Debug-Stufe protokolliert.                                                                      |

## Diagnosebericht

Tut ein Gerät nicht, was es soll: Instanz-Einstellungen öffnen, Reiter **Experte**, Gerät wählen und den Diagnosebericht herunterladen. Er enthält, was Home Connect für dieses Gerät geantwortet hat (bei einem verbundenen Gerät auch frisch gelesen: Status, Einstellungen und Programme), die Ereignisse des Live-Stroms, die Datenpunkte des Geräts mit ihren Werten und die letzten Logzeilen des Adapters. Die Datei an ein Issue mit dem Formular **Gerät melden** anhängen — die Karte verlinkt es.

Der Bericht entsteht nur auf Anforderung, bleibt bis zum Herunterladen im Speicher und schreibt nichts. Seriennummern, die Namen deiner Geräte und deine Anmeldedaten stehen darin nur als Platzhalter.

## Unterstützung

Fragen, Fehlerberichte und Ideen: [github.com/iobroker-community-adapters/ioBroker.homeconnect](https://github.com/iobroker-community-adapters/ioBroker.homeconnect).

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