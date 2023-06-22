---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: WKinYaFEFw1eXdHpi7raxiioJyEMKwflJSrV2PZmEtY=
---
![Logo](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wamo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wamo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wamo-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![NPM](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

# IoBroker.wamo
**Tests:** ![Test und Freigabe](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

# WAMO-Adapter für ioBroker
Dieser Adapter fügt Ihrer ioBroker-Installation die Überwachung des Auslaufschutzes „wamo“ hinzu.

Der Adapter wird an Ihr Leckageschutzgerät **SYR SafeTech Connect 2422** oder **POLYGONVATRO** angeschlossen, um Daten vom Gerät auszulesen, statistische Daten wie den Wasserverbrauchsverlauf zu erstellen und das Gerät zu steuern.
Und seit dem **SafeFlor Connect Release* können Sie auch solche Geräte zum Adapter hinzufügen und Daten von diesen Geräten auslesen.

Weitere Details zum Gerät **SYR SaveTech Connect 2422** finden Sie in den [SYR SaveTech Connect 2422 Detailseite](https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect). Weitere Details zum **SafeFloor Connect**-Gerät finden Sie auch auf der zugehörigen [SYR afeFloor Connect-Detailseite](https://www.syr.de/de/Produkte/699373BB-C8BE-4992-9CFA-2CB15A5A6166/SafeFloor-Connect#FocusContent).

Das POLYGONVATRO-Gerät ist unter der Haube ein SYR SaveTech Connect 2422-Gerät, jedoch ohne Druck-, Temperatur- und Leitfähigkeitssensor. Die POLYGONVATRO-Einheit ist derzeit nicht verfügbar.

## WICHTIG
Im `SafeFloor Connect release` wurde unter anderem eine neue Funktionalität für SafeFlore Connect-Geräte implementiert. Derzeit können Sie bis zu 4 Geräte hinzufügen.
Um diesen Sensor mit der aktuellen SafeFloor Sensor-Firmware (Version 2.21) auszulesen, lesen Sie bitte den Abschnitt **Haftungsausschluss/Warnung** unten sehr sorgfältig durch.

Für wichtige Informationen zu älteren Versionen lesen Sie bitte das entsprechende Kapitel in `Importent release related information` in den [Wiki](https://github.com/smarthausleben/ioBroker.wamo/wiki/Importent-release-related-information).

### Haftungsausschluss/Warnung
Die Datenauslesefunktionalität **SafeFloor Connect** ist noch nicht wirklich sinnvoll in der Geräte-Firmware implementiert. Derzeit gehen die Bodensensoren nach dem Aufwachen sofort in den Schlafmodus und senden ihre Informationen an die SYR-Cloud. Daher gibt es in diesem Zeitraum noch keine Möglichkeit, das Gerät zu fangen. Um diese Sensoren mit diesem ioBroker-Adapter auszulesen, müssen Sie die Option „Online bleiben“ in der Registerkarte „SAFEFLOOR UNITS“ der Adaptereinstellungen aktivieren und das Gerät durch einmaliges Drücken der Taste im Inneren des Geräts aufwecken. Dies bedeutet jedoch, dass das Gerät nicht mehr in den Ruhemodus wechselt und der Akku des Geräts daher sehr schnell entladen wird. Die derzeit einzig praktikable Lösung ist die Verwendung eines Batterieadapters. Diese Adapter können Sie ganz einfach bei Amazon beziehen. Den Link zu dem von mir verwendeten Adapter finden Sie im entsprechenden Hardware-Bereich [Projekt](https://smarthausleben.de/wasserwaechter/) auf meiner Website.

## Unterstützen Sie dieses Projekt
Wenn Sie diesen Adapter nützlich finden und dieses Projekt unterstützen möchten, freuen wir uns über Ihre Freundlichkeit. Du kannst mich ganz einfach unterstützen [Hier.](https://www.paypal.com/paypalme/smarthausleben) Danke 😊

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**

* ======================================================================== (max broad of READMR.md page )
-->

### **WORK IN PROGRESS**
* (smarthausleben) FIX: Profile parameter PV1 ... PV8 maximum value set to 9000 **_(Issue #24)_** `State objects PV1 ... PV8 need to be deleted first in order to be create correctly during adapter start`
* ========================================================================
* (smarthausleben) ADD: [SafeFloor Device] New **SafeFloor Units** Tab in adapter settings to manage up to 4 **_SafeFloor Connect_** devices
* (smarthausleben) ADD: New option **_"Hide all trigger info logging messages"_** in Tab **_"Advanced Options"_** to `hide all info logging messages at trigger events`
* (smarthausleben) ADD: New option **_"Allow SERVICE and FACTORY state changes"_** in Tab **_"Advanced Options"_** to enable/disable changes of objects protected by the manufacturer
* (smarthausleben) ADD: State `CLRALA` - **_DeviceControl State_** to clear current alarm and reopen main valve
* (smarthausleben) ADD: State `BFT` - **_Button filter threshold_**
* (smarthausleben) ADD: State `BPT` - **_Button proximity threshold_**
* (smarthausleben) ADD: State `CNF` - **_Conductivity factor_**
* (smarthausleben) ADD: State `CNL` - **_Conductivity limit_**
* (smarthausleben) ADD: State `DBD` - **_MLT pressure drop_**
* (smarthausleben) ADD: State `DBT` - **_MLT pressure drop time_**
* (smarthausleben) ADD: State `DCM` - **_MLT test time close_**
* (smarthausleben) ADD: State `DOM` - **_MLT test time open_**
* (smarthausleben) ADD: State `DPL` - **_MLT pulses_**
* (smarthausleben) ADD: State `DST` - **_MLT test time NOPULS_**
* (smarthausleben) ADD: State `DTC` - **_MLT verification cycles_**
* (smarthausleben) ADD: State `DTT` - **_Micro-Leakage-Test start time_**
* (smarthausleben) ADD: State `HTD` - **_Disable HTTPS connection (only MQTT)_**
* (smarthausleben) ADD: State `MQT` - **_MQTT connection type_**
* (smarthausleben) ADD: State `MRT` - **_Maintenance (Husty) server connection_**
* (smarthausleben) ADD: State `MSC` - **_MQTT reconnect time_**
* (smarthausleben) ADD: State `DSV` - **_Micro-Leakage-Test state_**
* (smarthausleben) ADD: State `FSL` - **_Paired Floorsensors list_**
* (smarthausleben) ADD: State `ALH` - **_Alarm history file_**
* (smarthausleben) ADD: State `STH` - **_Statistics history file_**
* (smarthausleben) ADD: State `PAH` - **_Parameters history file_**
* (smarthausleben) ADD: State `WFL` - **_WiFi scan_**
* (smarthausleben) ADD: State `BUZ` - **_Buzzer parameters_**
* (smarthausleben) ADD: State `ALM` - **_Alarm memory_**
* (smarthausleben) ADD: State `TTM` - **_Turbine no pulse max. time_**
* (smarthausleben) ADD: State `TYP` - **_Safe-Tec type_**
* (smarthausleben) ADD: State `WNS` - **_WiFi AP disabled_**
* (smarthausleben) ADD: State `HWV` - **_Hardware version_**
* (smarthausleben) ADD: State `DKI` - **_Safe-Tec device kind ID_**
* (smarthausleben) ADD: State `FSA` - **_Add (Pair) Floorsensor_**
* (smarthausleben) ADD: State `WFK` - **_WiFi key_** After entering the WiFi key into the WFK state the key will be send to device and afterwards state value will be cleared imediatly
* (smarthausleben) ADD: Device Control State `UPG` set to true initiates **_Firmware upgrase_** (only if new firmware is available)
* (smarthausleben) ADD: Device Control State `DEX` set to 1 initiates **_MLT (Micro Leake Test)_**
* (smarthausleben) ADD: Warn message in log if a new firmware for SafeTech Connect device is available
* (smarthausleben) REM: Removed **_testing loop_** functionality
* ========================================================================
* = The following objects need to be deleted first in order to get the new functionality
* = Since objects will be checked and created only during startup of the adapter follow this procedure
* = (stop wamo adapter -> delete state object -> start wamo -> object will be created)
* ========================================================================
* (smarthausleben) CHG: State `ALD` - **_Alarm duration (signaling time)_** can now be changed by user
* (smarthausleben) CHG: State `CLP` - **_Cluster Profile can_** now be changed by user
* (smarthausleben) CHG: State `SLO` - **_Self learning offset_** can now be changed by user
* (smarthausleben) CHG: State `SLP` - **_Self learning phase_** can now be changed by user
* (smarthausleben) CHG: State `SMF` - **_Self learning minimum flow_** can now be changed by user
* (smarthausleben) CHG: State `SOF` - **_Self learning offset flow_** can now be changed by user
* (smarthausleben) CHG: State `TMZ` - **_Time zone_** can now be changed by user
* (smarthausleben) CHG: State `WFC` - **_WiFi connect (SSID)_** can now be changed by user
* (smarthausleben) CHG: State `71` - **_Leakage protection deactivated_** - State moved from **_Settings_** to **_Device-Control_** (please delete Object **_71_** in object _Settings_ folder )
* (smarthausleben) CHG: State `71` - **_Leakage protection deactivated_** - is now changable (warn message appears in log if Leakage protection is deaktivated) 
* ========================================================================

### 0.3.0 (2023-04-04) - ***Jam Protection*** release
* (smarthausleben) ADD: [Main valve jam protection] New State JPR for Jam protection running 
* (smarthausleben) ADD: [Main valve jam protection] New State JPA for Jam protection aktivated
* (smarthausleben) ADD: [Main valve jam protection] New State JPT for Jam protection timing (CRON)
* (smarthausleben) ADD: [Main valve jam protection] New **Task Tab** in adapter settings to manage a scheduled regular movement of the main valve in order to prevent a stuck valve
* (smarthausleben) FIX: [interfaceBusy] flag was not reset after AXIOS interface handler error **_(Issue #21)_**
* (smarthausleben) ADD: [WatchDog] function for interfaceBusy flag. Flag will be reset after defined amount of requests **_(Issue #21)_**

### 0.2.13 (2022-10-12)
* (smarthausleben) add: new property "createOnStartup" in DeviceParameter
* (smarthausleben) add: new property "saveRawData" in DeviceParameter
* (smarthausleben) change: creating all state objects during startup to avoid calling "setObjectNotExistsAsync" later on
* (smarthausleben) add: Profile parameter raw states
* (smarthausleben) change: default value for "factor_german_water_hardnes" changed to 0.0296041666666667
* (smarthausleben) FIX update german water hardnes factor object (GHARDFACTOR) during startup 

### 0.2.12 (2022-09-20)
* (smarthausleben) Release 0.2.12

### 0.2.11 (2022-09-19)
* (smarthausleben) Release 0.2.11

### 0.2.10 (2022-09-19)
* (smarthausleben) state types changed UNI, PSD, CSD, TSD, T2
* (smarthausleben) states changable UNI, PSD, CSD, TSD, T2
* (smarthausleben) added DeviceControls RST (restart device)
* (smarthausleben) new channel DeviceControl
* (smarthausleben) added unit for GHARDNESS (°dH)
* (smarthausleben) new state GHARDFACTOR (calculation factor German water hardnes)

## License
The MIT License (MIT)

Copyright (c) 2022-2023 smarthausleben <info@smarthausleben.de>