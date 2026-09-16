---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meater/README.md
title: ioBroker.meater
hash: 0QY2CYMGDCchaoxExOHPm2dTsUJt0NIzyfz3F8LshT0=
---
![Logo](../../../en/adapterref/iobroker.meater/admin/meater.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.meater.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meater.svg)
![Anzahl der Installationen](https://iobroker.live/badges/meater-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/meater-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meater.png?downloads=true)
![Test und Freigabe](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

# ioBroker.meater

## Meater-Adapter für ioBroker

Dieser Adapter ermöglicht die Integration Ihres MEATER Wireless-Fleischthermometers in ioBroker.

Es ruft die Daten von Ihrer Sonde über die MEATER Cloud-API ab. Sie können 2 Intervalle konfigurieren:

1. Aktualisierungsintervall, wenn alle Sonden im Leerlauf sind (nicht kochen)
2. Aktualisierungsintervall, wenn mindestens eine Kochsitzung gestartet wurde

## Voraussetzungen

Sie müssen ein MEATER-Cloud-Konto einrichten (verwenden Sie dazu die Smartphone-App) und MEATER Link aktivieren.

## Konfiguration

- `Username for MEATER cloud` Ihre registrierte E-Mail-Adresse
- `Password for MEATER cloud` : das Passwort, das Sie für den Cloud-Zugriff verwendet haben
- `Language` Einige (nicht alle!) Werte werden übersetzt, z. B. die Bezeichnung von Fleischsorten.
- `Update interval idle` Zeit in Sekunden, wie oft Daten aus der Cloud abgerufen werden sollen
- `Update interval cook` : Zeitangabe in Sekunden, die angibt, wie oft Daten aus der Cloud abgerufen werden sollen, wenn eine Kochsensation aktiv ist.
- `Temperature unit` Wird verwendet, um Einheiten in ioBroker-Zuständen zu erstellen. Stellen Sie hier dieselbe Einheit ein, die Sie in der App verwenden. Wenn die Einheit nach der Zustandserstellung geändert wird, löschen Sie alle Prüfzustände und starten Sie den Adapter neu.
- `Clear old values` Die MEATER Cloud-API sendet nur Werte für aktive Sonden/laufende Kochvorgänge. Nach Beendigung eines Vorgangs werden keine Temperatur- und Statusaktualisierungen mehr empfangen. Aktivieren Sie dieses Kontrollkästchen, um alte, nicht aktualisierte Werte zu löschen und Missverständnisse zu vermeiden.

## Verwenden Sie den Adapter

Nach der Einrichtung des Adapters meldet er sich automatisch in der MEATER-Cloud an und ruft seine Daten ab.

Wenn keine Messwerte angezeigt werden, starten Sie den Kochvorgang und warten Sie einen Moment. Möglicherweise müssen Sie die Sonde erwärmen, um Messwerte zu erhalten (heißes Wasser eignet sich gut zum Testen).

## HAFTUNGSAUSSCHLUSS

MEATER® ist eine Marke von Apption Labs™ Limited. Dieser Adapter nutzt die [öffentliche API.](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2026-01-02)

-   Fixed issues of Adapter checker
-   updated depencies and devDepencies

### 1.1.1 (2024-07-08)

-   Fixed some messages of Adapter checker
-   Updated depencies
-   Detailed error message

### 1.1.0 (2024-04-25)

-   Tried to fix restart loop at the end of cooking
-   Dropped node v16 support

### 1.0.2 (2023-09-08)

-   Updated depencies
-   Dropped node v14 support

### 1.0.0 (2023-05-12)

-   First stable release

## License

MIT License

Copyright (c) 2024-2026 Standarduser

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