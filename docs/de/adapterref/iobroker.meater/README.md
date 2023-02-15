---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meater/README.md
title: ioBroker.meater
hash: 4ywg8L04c0K1aEpLqGWc3YiAkBJeMg0owCIxMMyhVMM=
---
![Logo](../../../en/adapterref/iobroker.meater/admin/meater.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.meater.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meater.svg)
![Anzahl der Installationen](https://iobroker.live/badges/meater-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/meater-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meater.png?downloads=true)

# IoBroker.meater
**Tests:** ![Testen und freigeben](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

## Meater-Adapter für ioBroker
Dieser Adapter bringt Ihr MEATER Wireless Fleischthermometer in ioBroker.

Es ruft die Daten von Ihrer Sonde über die MEATER Cloud API ab. Sie können 2 Intervalle konfigurieren:

1. Aktualisierungsintervall, wenn alle Sonden im Leerlauf sind (nicht kochen)
2. Aktualisierungsintervall, wenn mindestens 1 Garvorgang gestartet wird

## Voraussetzungen
Sie müssen ein MEATER Cloud-Konto einrichten (über die Smartphone-App) und MEATER Link aktivieren.

## Aufbau
- „Benutzername für MEATER Cloud“: Ihre registrierte E-Mail-Adresse
- „Passwort für MEATER Cloud“: das Passwort, das Sie für den Cloud-Zugriff verwendet haben
- `Sprache`: Einige (nicht alle!) Werte werden übersetzt, z.B. der Name des Fleisches
- `Aktualisierungsintervall im Leerlauf`: Zeit in Sekunden, wie oft Daten aus der Cloud geholt werden sollen
- `Aktualisierungsintervall Koch`: Zeit in Sekunden, wie oft Daten aus der Cloud abgerufen werden sollen, wenn eine Kochfunktion aktiv ist
- „Temperatureinheit“: Wird verwendet, um Einheiten in ioBroker-Zuständen zu erstellen. Stellen Sie hier dieselbe Einheit ein, die Sie in der App verwenden. Wenn die Einheit nach dem Erstellen von Zuständen geändert wird, löschen Sie alle Sondenzustände und starten Sie den Adapter neu
- „Clear old values“: Die MEATER-Cloud-API sendet nur Werte für aktive Sonden/laufende Kochsitzungen. Wenn eine Sitzung beendet ist, erhalten Sie keine Temperatur- und Statusaktualisierungen. Aktivieren Sie dieses Kontrollkästchen, um alte Werte zu löschen, die nicht aktualisiert wurden, um Missverständnisse zu vermeiden.

## Verwenden Sie den Adapter
Nach der Einrichtung des Adapters meldet er sich automatisch bei der MEATER Cloud an und ruft seine Daten ab.

Wenn Sie keine Sonde und/oder Werte sehen, starten Sie einen Kochvorgang und warten Sie einen Moment. Möglicherweise müssen Sie die Sonde erwärmen, um Werte zu erhalten (heißes Wasser funktioniert zum Testen gut).

## HAFTUNGSAUSSCHLUSS
MEATER® ist eine Marke von Apption Labs™ Limited.
Dieser Adapter verwendet die [öffentliche API](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2023-01-14)

-   (Standarduser): improved: error handling if websever sent no response

### 0.2.0 (2022-12-15)

-   (Standarduser) added: State for manually trigger an update
-   (Standarduser) improved: description of errors
-   (Standarduser) fixed: Adapter stopped working if got an error from MEATER Cloud server (not API)

### 0.1.2 (2022-12-05)

-   (Standarduser) Improved error handling for fetch

### 0.1.0 (2022-12-04)

-   (Standarduser) Save password encrypted => please reenter password in adapter config
-   (Standarduser) Some minor improvements

### 0.1.0-alpha.0 (2022-11-21)

-   (Standarduser) First test release

## License

MIT License

Copyright (c) 2023 Standarduser

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