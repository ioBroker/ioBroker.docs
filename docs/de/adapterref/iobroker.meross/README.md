---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: C8mfqCpHbJp+lHIzqw+XNTb9He6Zko83hjyeUHzB+NI=
---
![Logo](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/meross-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.meross.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meross.svg)

#ioBroker.meross
![Testen und freigeben](https://github.com/Apollon77/iobroker.meross/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/meross/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung
Dieser Adapter ermöglicht die Steuerung von Meross-Geräten durch Verbindung mit den Meross-Cloud-Servern.

Sie müssen Ihre Cloud-Anmeldedaten angeben. Der Adapter verbindet sich mit Ihrem Cloud-Konto und abonniert alle Gerätedaten über MQTT. Aus diesem Grund müssen die Geräte mit ihrer Cloud verbunden sein. Derzeit ist keine Möglichkeit bekannt, die Geräte lokal zu steuern.

Eine Adapterinstanz zeigt alle Geräte eines Meross Cloud-Kontos und ermöglicht deren Steuerung.

## Bekannte Arbeitsgeräte
Alle Geräte sollten nach meinem derzeitigen Kenntnisstand funktionieren. Aber bitte überprüfen Sie die Protokolle oder melden Sie alle Funktionen oder neuen Gerätetypen, die keine Zustände erstellen (neue Gerätetypen müssen von mir manuell hinzugefügt werden, daher ist ein Problem wichtig).

Gemeldete Arbeiten sind mindestens:

* mss425e
* mss310
* MSS620 EU/UK
* MTS100, MTS100v3, MTS150, MTS200
* MRS100
* ... und mehr, die noch nicht aufgelistet sind :-) Sagen Sie mir einfach, wenn ein Gerät funktioniert, das nicht über ein GitHub-Problem aufgelistet ist.

## So melden Sie Probleme und Funktionsanfragen
Bitte verwenden Sie dafür GitHub-Probleme.

Am besten setzen Sie den Adapter in den Debug-Log-Modus (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Dann holen Sie sich bitte die Logdatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht vom Admin, da der Admin die Zeilen abschneidet). Wenn Sie es nicht in der GitHub-Ausgabe bereitstellen möchten, können Sie es mir auch per E-Mail (iobroker@fischer-ka.de) zusenden. Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Changelog
### __WORK IN PROGRESS__
* (Apollon77) Optimize Meross Communication to first try to communicate with the device locally before sending data to MQTT - enabled by default, you can disable it in settings!
* (Apollon77) Optimize Meross Communication by using only one MQTT connection instead of one per device when cloud is used
* (Apollon77) Add new state "disabled" to ignore connection error of a device; reconnections are still tried, but no error are logged if not successful
* (Apollon77) Add support for Online status reports from MTS100 hub devices
* (Apollon77) Automatically logout from meross cloud on adapter end; next start will do a new Login
* (Apollon77) Automatically delete old devices if no longer existing (when js-controller >=2.2)
* (Apollon77) Optimize MTS200 handling

### 1.8.0 (2022-01-05)
* (Apollon77) Add support for MTS200 Wifi Thermostat

### 1.7.1 (2021-11-13)
* (Apollon77) Allow to enter passwords with more than 15 characters

### 1.7.0 (2021-11-13)
* (Apollon77) Add support for MTS150 Thermostats
* (Apollon77) Add support for MRS100 RollerShutter devices

### 1.6.3 (2021-06-04)
* (Apollon77) Update translations

### 1.6.2 (2021-05-07)
* (Apollon77) optimize for js-controller 3.3

### 1.6.1 (2021-04-23)
* (Apollon77) prevent crash case (Sentry IOBROKER-MEROSS-Z)

### 1.6.0 (2021-04-18)
* (Apollon77) add MOD100 Diffuser Spray device

### 1.5.1 (2020-12-05)
* (Apollon77) generate an unique uuid for each connection, fixes the "Server not available"

### 1.5.0 (2020-06-25)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-MEROSS-G, IOBROKER-MEROSS-F)
* (Apollon77) Add warning about poll interval and cloud deactivation and reset poll interval to 30s for now

### 1.4.1 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.4.0 (2020-06-12)
* (Apollon77) Fix Admin
* (Apollon77) Remove the automatic cutting of passwords to 15 characters, but log info message

### 1.3.13 (2020.04.12)
* (Apollon77) add auto decryption handling with js-controller 3.0
* (Apollon77) update meross library to prevent some crash cases

### 1.3.12 (2020.03.08)
* (Apollon77) update dependencies

### 1.3.11 (2020.02.05)
* (Apollon77) optimize error handling
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 1.3.9 (2019.12.18)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.8 (2019.12.07)
* (Apollon77) update dependencies

### 1.3.7 (2019.12.01)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.6 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.5 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.4 (2019.11.26)
* (Apollon77) Add Temperature/Humidity support for MTS100

### 1.3.1 (2019.11.25)
* (Apollon77) Add names to hub sub devices

### 1.3.0 (2019.11.25)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0 (Air Purifyer)
* (Apollon77) Add support for Hub and Thermostates
* (Apollon77) Allow to control DND mode (LED) - be aware then if controlled via meross app it my get out of sync!
* (Apollon77) Integrate sentry.io for automated error/exception reporting
* (Apollon77) Add support for mts100v3
* (Apollon77) add Compact mode
* (Apollon77) add control option for (rgb) lights

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <iobroker@fischer-ka.de>

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