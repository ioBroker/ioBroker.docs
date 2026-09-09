---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: PvD0mgZYEU67pzVytvnSwRPRyWxo7Fm36YKVE5s9ZRc=
---
![Logo](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)
![Downloads](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fronius.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fronius-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fronius-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)

# ioBroker.fronius

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Ein Fronius Wechselrichteradapter für ioBroker

Dies ist ein ioBroker-Adapter für Ihren Fronius PV-Wechselrichter mit Fronius Datalogger Web ab Version 2.0.4-1, Fronius Datamanager ab Version 3.0.3-1 und Symo Gen24.

## Installation

Für die Installation ist keine spezielle Einrichtung erforderlich. Installieren Sie einfach den Adapter und starten Sie die Instanz. Gehen Sie anschließend zur Adapterkonfiguration. Geben Sie im Konfigurationsbereich die IP-Adresse oder URL Ihres Wechselrichters ein. Klicken Sie dann auf die Schaltfläche „IP prüfen“. Dies ist erforderlich, um eine Überprüfung und das Auslesen der Systemkonfiguration auszulösen. Diese Systemkonfiguration wird später zur Steuerung der API-Aufrufe benötigt.

Hinweis zum Upgrade des Adapters von Version 1 auf Version 2: Bitte beachten Sie die [Datei DatastructureMapping\_V1.3-V2.0.pdf](https://github.com/iobroker-community-adapters/ioBroker.fronius/blob/master/doc/DatastructureMapping_V1.3-V2.0.pdf) . Es wird empfohlen, das Dokument sorgfältig zu prüfen und nicht mehr verfügbare oder verschobene Zustände manuell zu löschen.

## Zusätzliche Parameter anfordern

Falls Sie einen zusätzlichen Parameter oder API-Aufruf benötigen, geben Sie bitte in einem Ticket den ausgeführten Aufruf sowie eine Datei mit der JSON-Antwort an, damit diese dem System und der Testumgebung hinzugefügt werden kann. Bitte stellen Sie in jedem Fall die Systeminformationen des Aufrufs <http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System> bereit, um die Systemkonfiguration eindeutig zu machen.

## Probleme melden

Sollten Sie ein Problem feststellen, melden Sie es bitte auf [GitHub](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) mit den folgenden Informationen.

- Adapterversion installiert
- Detailliertes Protokoll (Protokollierungsstufe: Debug oder Silly) des aktuellen Verhaltens
- Detaillierte Beschreibung des Problems
- Falls hilfreich, können Sie die Systeminformationen von [http://192.168.0.1/solar\_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System abrufen](http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System) (eine Anpassung der IP-Adresse ist erforderlich).

## Ausgeführte API-Aufrufe

Die folgenden Anfragen werden an die API gesendet. Die verfügbaren Datenpunkte hängen jedoch stark vom jeweiligen Gerät im Bus ab. Sollte ein Datenpunkt fehlen, prüfen Sie bitte zunächst, ob die API diese Information liefert. Die IP-Adresse und der Parameter „DeviceId“ müssen an Ihre Konfiguration angepasst werden.

### Allgemeine Systeminformationen

- <http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System>

### Wechselrichterdaten

- <http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData>
- <http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC_String_1&Channel=Voltage_DC_String_2>

### Ohmpilot-Daten

- <http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=System>

### Speicherdaten

- <http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0>

### Smartmeter-Daten

- <http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0>

### Sensorkartendaten

- <http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData>
- <http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData>

### Zeichenkettendaten

- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total>

### Leistungsflussdaten (Wechselrichter/Standort)

- <http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi>

### Website-Daten

- <http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.2.0 (2026-03-07)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2024-07-24)
* (nkleber78) Better handling of empty objects [#374]
* (mcm1957) Some issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-04-29)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-06-28)
-   (nkleber78) Instability issues fixed. (#306, #313)
-   (nkleber78) Set values for parameters delivered as 'null' from API to 0. (#315)

### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.fronius/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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