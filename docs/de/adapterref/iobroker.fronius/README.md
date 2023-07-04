---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: aRknBDFFiexqqTkvancXw+4YiCs8a9Estg5pBvJkDVk=
---
![Logo](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)
![Downloads](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fronius.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fronius-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fronius-installed.svg)

# IoBroker.fronius
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## Ein Fronius Wechselrichteradapter für ioBroker
Hierbei handelt es sich um einen ioBroker-Adapter für Ihren Fronius PV-Wechselrichter mit Fronius Datalogger Web ab Version 2.0.4-1, Fronius Datamanager ab Version 3.0.3-1 und Symo Gen24.

## Installation
Für die Installation ist kein spezielles Setup erforderlich. Installieren Sie einfach den Adapter und starten Sie die Instanz. Gehen Sie dann zur Adapterkonfiguration. Geben Sie im Konfigurationsabschnitt die IP-Adresse oder URL für Ihren Wechselrichter ein. Dann müssen Sie auf die Schaltfläche „IP prüfen“ klicken. Dies ist erforderlich, um eine Überprüfung und das Auslesen der Systemkonfiguration auszulösen. Diese Systemkonfiguration wird benötigt, um später die API-Aufrufe zu steuern.

Hinweis zum Upgrade von V1 auf V2 des Adapters. Bitte beachten Sie [DatastructureMapping_V1.3-V2.0.pdf](doc/DatastructureMapping_V1.3-V2.0.pdf). Es wird empfohlen, das obige Dokument sorgfältig zu prüfen und die nicht mehr verfügbaren oder verschobenen Zustände manuell zu löschen.

## Zusätzliche Parameter anfordern
Wenn Sie einen zusätzlichen Parameter oder API-Aufruf wünschen, geben Sie bitte in einem Ticket den von Ihnen ausgeführten Aufruf sowie eine Datei mit der JSON-Antwort auf diesen Aufruf an, damit dieser dem System und auch der Testumgebung hinzugefügt werden kann. Bitte geben Sie in jedem Fall die Systeminformationen aus diesem Aufruf http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System an, damit die Systemeinrichtung klar ist.

## Probleme melden
Wenn Sie ein Problem feststellen, melden Sie es bitte unter [Github](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) mit den folgenden Informationen

- Adapterversion installiert
- Detailliertes Protokoll (Protokollebene Debug oder Silly) des aktuellen Verhaltens
- Detaillierte Beschreibung des Problems
- Gegebenenfalls die Systeminformationen von http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System (Anpassung der IP-Adresse erforderlich)

## Ausgeführte API-Aufrufe
Die folgende Anfrage wird an die API gesendet. Die verfügbaren Datenpunkte hängen jedoch stark vom jeweiligen Gerät am Bus ab. Sollte daher ein Datenpunkt fehlen, prüfen Sie bitte zunächst, ob die API diese Informationen liefert. Die IP-Adresse und der DeviceId-Parameter müssen an Ihr eigenes Setup angepasst werden.

### Allgemeine Systeminformationen
- http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System

### Wechselrichterdaten
- http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData
- http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC_String_ 1&Channel=Voltage_DC_String_2

### Ohmpilot-Daten
- http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=System

### Speicherdaten
- http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0

### Smartmeter-Daten
- http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0

### Sensorkartendaten
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData

### String-Daten
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total

### Powerflow-Daten (Wechselrichter/Standort)
- http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi

### Site-Daten
- http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.2 (2023-06-28)
-   (nkleber78) Instability issues fixed. (#306, #313)
-   (nkleber78) Set values for parameters delivered as 'null' from API to 0. (#315)

### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

### 2.0.0 (2023-06-04)

-   (nkleber78) Several errors resulting in missing data have been fixed. (#152, #242, #175)
-   (nkleber78) Several errors due to missing objects have been solved. (#206, #129, #76)
-   (nkleber78) The usage of the ping utility has been removed. (#169)
-   (nkleber78) Reading of mpp values has been added. (#78)
-   (nkleber78) 'Request' module has been replaced by 'axios'.
-   (nkleber78) Fixed changes related to GEN24 API update for latest FW incl. object creation for storage objects
-   (nkleber78) Fixed issue #97, Added some new predefined objects
-   (nkleber78) Added Inverter Temperature readout (#86)
-   (mcm1957) Dependencies and toolset have been updated.

### 1.1.3 (2021-03-15)

-   (nkleber78) Split main.js into multiple files for better maintenance
-   (nkleber78) Prevent creating info objects which are not supported by the inverters
-   (schweigel) Added archive request values
-   (schweigel) Added archive polling intervall
-   (schweigel) Added devicetype string

### 1.1.1 (2020-11-30)

-   (schweigel) Added missing units
-   (schweigel) Added inverterinfo

### 1.1.0 (2020-11-24)

-   (nkleber78) Implementation change for support of SYMO GEN24
-   (nkleber78) Fix issue with adapters connected state

### 1.0.5 (2019-01-18)

-   (ldittmar) compact mode compatibility added
-   (ldittmar) add chinese support

### 1.0.4

-   (ldittmar) Fix assignment to constant variable error

### 1.0.3

-   (ldittmar) Ready for Admin 3

### 1.0.2

-   (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

### 1.0.1

-   (tobintax) Added more values from Smartmeter
-   (tobintax) Added more Powerflow Values
-   (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

### 1.0.0

-   (ldittmar) Fixed little errors

### 0.0.5

-   (ldittmar) Read storage data and error/status codes

### 0.0.4

-   (ldittmar) Read more data

### 0.0.3

-   (ldittmar) Improved installation routine

### 0.0.2

-   (ldittmar) First data is read

### 0.0.1

-   (ldittmar) initial commit

## License

The MIT License (MIT)

Copyright (c) 2023 ldittmar <iobroker@lmdsoft.de>

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