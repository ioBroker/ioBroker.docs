---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: 9ybGLS8FLg/JAIpnt3fcmyEcSxL47ASj9n1b91qt3uE=
---
![Logo](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![Installationen](http://iobroker.live/badges/procon-ip-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
[![Test und Release](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

## ProCon.IP Poolsteuerungsadapter für ioBroker
ioBroker Adapter zur Basisunterstützung der Schwimmbadsteuerung ProCon.IP. Es ist für die Integration in Ihre ioBroker-Hausautomation vorgesehen, z.
um eine Logik zu erstellen, die andere Geräte einbezieht oder einfach mit Ihrem/Ihren bevorzugten Sprachassistenten gekoppelt zu werden:

* Sie können die [_cloud_](https://github.com/ioBroker/ioBroker.cloud) verwenden oder

[_IoT_](https://github.com/ioBroker/ioBroker.iot) Adapter für Alexa (und auch Google Home, glaube ich) und

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) als Brücke zum

  Apple HomeKit für Siri erreichbar oder

* Verwenden Sie das [_javascript_](https://github.com/ioBroker/ioBroker.javascript), um

  Erstellen Sie Ihre eigene benutzerdefinierte Logik.

Weitere Informationen finden Sie unter [Wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

### Was ist die Poolsteuerung von ProCon.IP?
![Bild von pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

Die Poolsteuerung ProCon.IP ist eine Low-Budget-Netzwerksteuerung für private Schwimmbäder. Mit seinen softwaregeschalteten Relais kann er mehrere Pumpen (für den Poolfilter und unterschiedliche Dosierungsaspekte) entweder einfach nach Zeitplan geplant oder abhängig von einem Messwert/Wert von einem seiner vielen Eingangskanäle für Messungen (z Sensoren, Dallas 1-Wire-Termometer, Redox- und pH-Elektroden). Zumindest gibt es auch die Möglichkeit, diese Relais bei Bedarf zu schalten, wodurch sie auch zum Ein- und Ausschalten von Lichtern (oder anderen gewünschten) geeignet sind.
Nicht alle Funktionen sind über die API erreichbar. Tatsächlich gibt es eine dokumentierte API zum Lesen (Abrufen) von Werten als CSV (`/GetState.csv`). In meinen Erinnerungen gab es noch einen zum Ein- und Ausschalten der Relais mit Timer. Aber den zweiten finde ich nicht mehr. Also nicht einmal schön, aber funktional: Die ProCon.IP verfügt über zwei native Webinterfaces, die analysiert werden können, um eine bestimmte Funktionalität (wie das Schalten der Relais) irgendwie nachzukonstruieren.

Weitere Informationen finden Sie unter folgendem Link (leider nur auf Deutsch; bisher keine englische Dokumentation/Informationen gefunden):

* [pooldigital.de Webshop](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de-Forum](http://forum.pooldigital.de/)

**Nur um es klar zu sagen: Ich habe nichts mit der Entwicklung, dem Vertrieb, der Vermarktung oder dem Support der Poolsteuerung zu tun. Ich habe gerade eine Lösung entwickelt, um diese in ioBroker zu integrieren, um das Zuhause meiner Eltern ein bisschen intelligenter zu machen.**

###Details zum Adapter
Der Adapter verwendet die `/GetState.csv` API der ProCon.IP um seine Werte abzufragen und eine weitere - nicht dokumentierte - API, die mit bitweisen Befehlen zum Schalten der Relais arbeitet. Das zweite wird auch von den originalen Webinterfaces der ProCon.IP verwendet. Es kann also zu zukünftigen Firmware-Upgrades kommen, die Bremsenkompatibilität mit diesem Adapter oder zumindest die Funktionalität zum Schalten der Relais geben.

#### Kompatibilität
Der Adapter wurde vorerst in Kombination mit der ProCon.IP Firmware **revision 1.7.0.c** getestet und entwickelt.

##Fahrplan
### 1.x.x
Auf dem Plan steht nichts besonderes. Sie können ein Problem erstellen, um neue Funktionen/Funktionen vorzuschlagen...

**Was ist mit den Punkten passiert, die auf der Roadmap standen, aber nicht mit der Version 1.0.0 implementiert wurden?** Nun, die Dokumentation wurde bereits verbessert.
Die Sache mit der Registerkartenansicht scheint mir ziemlich interessant zu sein. Wenn Sie eine solche Funktion schätzen würden, lassen Sie es mich einfach wissen...
Das Fehlen von automatisierten Tests bezüglich der Funktionalität des Controllers ist ziemlich unangenehm, aber der Fokus liegt jetzt klar darauf, stabil zu werden und das Schreiben von guten und nützlichen Tests für den gesamten vorhandenen Code kostet viel Zeit (in Bezug auf den Einsatz bezüglich der Komplexität und Zielgruppe dieses Softwareprojekts) und könnte in einem weiteren Refactoring enden. Es wird also etwas für die Zukunft sein, aber für die Version 1.0.0 nicht mehr relevant.

## Entwicklung und Beteiligung
Kontaktieren Sie mich gerne, wenn Sie an der Entwicklung oder Dokumentation dieses Adapters mitwirken möchten.

Nützliche Links für den Ansatz werden sein

* die [TypeScript-Adaptervorlage](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Ich hatte angefangen von und

* der [Leitfaden für Adapterentwickler](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog

### 1.1.0
Minor release:
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### 1.0.2
Minor update (was accidentally released as patch, regarding the version number):
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 
**All point should reduce issues regarding irregular network disruptions.**

### 1.0.1
Hotfix release:
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### 1.0.0
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

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature
      sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as
      `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
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