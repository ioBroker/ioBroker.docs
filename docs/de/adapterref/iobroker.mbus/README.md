---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: QQFiJmoaIGU2t+NUjRTc9VvB+ApGY2YbfRJxGb0LVtQ=
---
![Logo](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/mbus-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/mbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.mbus.svg)
![Test und Freigabe](https://github.com/Apollon77/ioBroker.mbus/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/mbus/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mbus.svg)

# ioBroker.mbus

\======================

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter für ioBroker stellt über TCP oder seriell eine Verbindung zu einem M-Bus-Master her, um den Status und die Details der angeschlossenen M-Bus-Geräte anzuzeigen.

## Beschreibung der Parameter

### Gateway-IP / TCP-Port

IP-Adresse und Port des M-Bus Masters/Gateways bei Verwendung von TCP.

### Serielle Schnittstelle / Baudrate

Serielle Schnittstelle und Baudrate des M-Bus Masters/Gateways.

### Aktualisierungsintervall

Aktualisierungsintervall der Daten in Sekunden. Standardwert (falls leer): 3600 Sekunden (1 Stunde). Achten Sie auf die Stromversorgung der Geräte am M-Bus, um eine zu schnelle Batterieentladung zu vermeiden. Bei einem Intervall von 0 werden die Daten des Geräts nur einmal beim Einschalten des Adapters ausgelesen, danach jedoch nicht mehr automatisch.

### Geräte-IDs

Sie können primäre (1-250) und sekundäre (16 Zeichen lange) M-Bus-IDs verwenden.

## Wie liest man das Gerät auf Anfrage aus?

In den für jedes Gerät erstellten Zuständen existiert ein Zustand namens „updateNow“. Wenn Sie diesen auf „true“ setzen (als Steuerungsaktion mit ack=false), wird das Gerät sofort aktualisiert. Wenn ein Intervall konfiguriert ist, startet dieses nach dem Empfang der Daten neu.

## Todo

- Verarbeitung verschlüsselter Nutzdaten (falls von jemandem benötigt)

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie hierfür die GitHub-Issues.

Am besten stellen Sie den Adapter auf Debug-Log-Modus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierung). Laden Sie anschließend die Logdatei von Ihrer Festplatte herunter (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Falls Sie die Datei nicht in einem GitHub-Issue bereitstellen möchten, können Sie sie mir auch per E-Mail senden ( <iobroker@fischer-ka.de> ). Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Issue hinzu und beschreiben Sie, welche Einträge in der Logdatei zu welchem Zeitpunkt angezeigt werden.

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Makes adapter compatible with Node.js 24

### 2.7.0 (2024-04-05)
* (Apollon77) Adds IPv6 support for TCP connections
* (Apollon77) Fixed baudrate 1200 for Windows (2400 was used before)

### 2.6.1 (2023-11-25)
* IMPORTANT: Node.js 16.x is now required at least
* (Apollon77) Upgrade dependencies

### 2.5.0 (2023-08-11)
* IMPORTANT: Node.js 14.x is now required at least
* (Apollon77) Update dependencies to also support Node.js 20

### 2.4.0 (2022-06-30)
* IMPORTANT: Node.js 12.x is now required at least
* (Apollon77) Several updates and optimizations

### 2.3.4 (2021-03-07)
* (Apollon77) Send a reset to the device before reading data

### 2.3.2 (2021-02-27)
* (Apollon77) Prevent crash case(Sentry IOBROKER-MBUS-H)

### 2.3.1 (2020-10-30)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MBUS-F)

### 2.3.0 (2020-08-02)
* (Apollon77) mbus library updated

### 2.2.3 (2020-07-26)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-C)

### 2.2.2 (2020-07-23)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-B)

### 2.2.1 (2020-06-30)
* (Apollon77) prevent crash (Sentry IOBROKER-MBUS-7)

### 2.2.0 (2020-04-13)
* (Apollon77) make compatible with nodejs 13+

### 2.1.6 (2020-04-12)
* (Apollon77) update dependencies

### 2.1.5 (2020-03-08)
* (Apollon77) update dependencies

### 2.1.4 (2020-02-08)
* (Apollon77) optimize adapter stop logic to prevent crashes (again)

### 2.1.3 (2020-02-05)
* (Apollon77) optimize adapter stop logic to prevent crashes
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2025 Apollon77 <ingo@fischer-ka.de>

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