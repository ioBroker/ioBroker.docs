---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: QkhH6qFpl+fwsn0v+WwUtamC4pIlVNf10o9cSpzX+cU=
---
![Logo](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![Installationen](http://iobroker.live/badges/procon-ip-installed.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
[![Test und Freigabe](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

## ProCon.IP Poolsteuerungsadapter für ioBroker
ioBroker Adapter zur Basisunterstützung der Schwimmbadsteuerung ProCon.IP. Es ist für die Integration mit Ihrer ioBroker-Hausautomation vorgesehen, z.
um eine Logik zu erstellen, die andere Geräte einbezieht oder einfach mit Ihren bevorzugten Sprachassistenten gekoppelt werden soll:

* Sie können die [_cloud_](https://github.com/ioBroker/ioBroker.cloud) oder verwenden

[_IoT_](https://github.com/ioBroker/ioBroker.iot) Adapter für Alexa (und auch Google Home, glaube ich) und

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) als Brücke zum

  Apple HomeKit per Siri zu erreichen bzw

* Verwenden Sie dazu [_javascript_](https://github.com/ioBroker/ioBroker.javascript).

  Erstellen Sie Ihre eigene benutzerdefinierte Logik.

Siehe [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki) für weitere Informationen.

### Was ist die ProCon.IP Poolsteuerung?
![Bild von pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

Die ProCon.IP Poolsteuerung ist eine preisgünstige netzwerkfähige Steuereinheit für private Schwimmbäder. Mit seinen softwaregeschalteten Relais kann es mehrere Pumpen (für den Poolfilter und verschiedene Dosieraspekte) steuern, entweder einfach geplant nach Zeitplan oder abhängig von einem Messwert/Wert von einem seiner vielen Eingangskanäle für Messungen (z. B. I/O-Durchfluss). Sensoren, Dallas 1-Wire Thermometer, Redox- und pH-Elektroden). Zumindest gibt es auch die Möglichkeit, diese Relais bei Bedarf zu schalten, was sie auch zum Ein- und Ausschalten von Lichtern (oder was auch immer Sie wollen) geeignet macht.
Nicht alle seine Funktionen sind über die API erreichbar. Tatsächlich gibt es eine dokumentierte API zum Lesen (Polling) von Werten als CSV (`/GetState.csv`). In meinen Erinnerungen gab es noch einen zum Ein- und Ausschalten der Relais mit Timer. Aber den zweiten finde ich nicht mehr. Also nicht einmal schön, aber funktional: Die ProCon.IP hat zwei native Weboberflächen, die analysiert werden können, um eine bestimmte Funktionalität (wie das Schalten der Relais) nachzukonstruieren.

Weitere Informationen finden Sie unter folgendem Link (leider nur auf Deutsch; bisher keine englische Dokumentation/Information gefunden):

* [pooldigital.de Webshop](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de-Forum](http://forum.pooldigital.de/)

**Um das klarzustellen: Ich habe nichts mit der Entwicklung, dem Verkauf, der Vermarktung oder dem Support der Poolsteuerung zu tun. Ich habe gerade eine Lösung entwickelt, um so etwas mit ioBroker zu integrieren, um das Zuhause meiner Eltern ein bisschen intelligenter zu machen.**

### Details zum Adapter
Der Adapter verwendet die `/GetState.csv` API der ProCon.IP zum Abfragen seiner Werte und eine weitere - nicht dokumentierte - API, die mit bitweisen Befehlen arbeitet, um die Relais zu schalten. Letzteres wird auch von den originalen Webinterfaces der ProCon.IP verwendet. Es könnte also zukünftige Firmware-Upgrades geben, die die Kompatibilität mit diesem Adapter bremsen oder zumindest die Funktionalität zum Schalten der Relais.

#### Kompatibilität
Der Adapter wurde vorerst in Kombination mit der ProCon.IP Firmware **Revision 1.7.0.c** getestet und weiterentwickelt.

## Fahrplan
Auf dem Plan steht nichts Besonderes. Sie können ein Problem erstellen, um neue Features/Funktionen vorzuschlagen...

## Entwicklung und Teilnahme
Kontaktieren Sie mich gerne, wenn Sie sich an der Entwicklung oder Dokumentation dieses Adapters beteiligen möchten.

Nützliche Links für den Ansatz werden sein

* die [TypeScript-Adaptervorlage] (https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Ich hatte von und angefangen

* der [Leitfaden für Adapterentwickler] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog

### Release v1.2.3
Dependency updates.

### Release v1.2.2
Dependency updates.

### Release v1.2.1
Bugfix release:
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29))

### Release v1.2.0
Minor release:
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### ~~Release v1.1.3~~
Skipped.

### ~~Release v1.1.2~~
Release skipped, because it failed in integration tests.

### Release v1.1.1
Minor release:
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### ~~Release v1.1.0~~
Release skipped.

### Release v1.0.2
Minor update (was accidentally released as patch, regarding the version number):
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 
**All point should reduce issues regarding irregular network disruptions.**

### Release v1.0.1
Hotfix release:
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### Release v1.0.0
Official release in ioBroker adapter repository:  
The most exciting change with this release is, that it's available from the
ioBroker adapter repository. Hence you can just install it, without copy/
pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### Release v0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### Release v0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### Release v0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### Release v0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### Release v0.1.1
Security update:
* Update vulnerable eslint-utils

### Release v0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature
      sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as
      `smartType` _LIGHT_ 

### Release v0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### Release v0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### Release v0.0.2
Bugfix release:
* Fix sys info state values

### Release v0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

## License
MIT License

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

Copyright (c) 2021 Yannic Labonte <yannic.labonte@gmail.com>