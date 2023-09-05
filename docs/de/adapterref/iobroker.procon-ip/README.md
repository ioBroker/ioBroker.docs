---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: cFE7QW+P73RivHSP1YgUCTMqgjSZJjtuSlUAJXe+cEE=
---
![Logo](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

![Anzahl der Installationen](http://iobroker.live/badges/procon-ip-installed.svg)
![Aktuelle stabile Version](http://iobroker.live/badges/procon-ip-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![Kauf mir einen Kaffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?style=flat)

# IoBroker.procon-ip
[![Test und Freigabe](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

ioBroker-Adapter zur Basisunterstützung der Schwimmbadsteuerung ProCon.IP. Es ist für die Integration in Ihre ioBroker-Hausautomation gedacht, z.
um eine Logik zu erstellen, die andere Geräte einbezieht, oder einfach um sie mit Ihren bevorzugten Sprachassistenten zu koppeln:

* Sie können die [_cloud_](https://github.com/ioBroker/ioBroker.cloud) oder verwenden

[_IoT_](https://github.com/ioBroker/ioBroker.iot) Adapter für Alexa (und auch Google Home, glaube ich) und

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) als Brücke zum

  Apple HomeKit ist per Siri oder erreichbar

* Verwenden Sie dazu das [_javascript_](https://github.com/ioBroker/ioBroker.javascript).

  Erstellen Sie Ihre eigene benutzerdefinierte Logik.

Weitere Informationen finden Sie in den [Wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

## Was ist der ProCon.IP Poolcontroller?
![Bild von pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

Die ProCon.IP Poolsteuerung ist eine preisgünstige, netzwerkfähige Steuereinheit für Heimschwimmbäder. Mit seinen per Software geschalteten Relais kann es mehrere Pumpen (für den Poolfilter und verschiedene Dosierungsaspekte) steuern, entweder einfach nach Zeitplan geplant oder abhängig von einem Messwert/Wert von einem seiner vielen Eingangskanäle für Messungen (z. B. E/A-Durchfluss). Sensoren, Dallas 1-Wire-Thermometer, Redox- und pH-Elektroden). Zumindest gibt es auch die Möglichkeit, diese Relais bei Bedarf zu schalten, wodurch sie auch zum Ein-/Ausschalten von Lichtern (oder allem anderen, was Sie wollen) verwendet werden können.
Nicht alle Funktionen sind über die API erreichbar. Tatsächlich gibt es eine dokumentierte API zum Lesen (Abfragen) von Werten als CSV (`/GetState.csv`). In meiner Erinnerung gab es noch ein weiteres Gerät zum Ein-/Ausschalten und Einschalten der Relais mit Zeitschaltuhr. Aber den zweiten kann ich nicht mehr finden. Also nicht einmal hübsch, aber funktional: Der ProCon.IP verfügt über zwei native Webschnittstellen, die analysiert werden können, um eine bestimmte Funktionalität (z. B. das Schalten der Relais) nachzuentwickeln.

Weitere Informationen finden Sie unter folgendem Link (leider nur auf Deutsch; ich habe bisher keine englische Dokumentation/Informationen gefunden):

* [pooldigital.de Webshop](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de-Forum](http://forum.pooldigital.de/)

**Nur um es klarzustellen: Ich habe nichts mit der Entwicklung, dem Verkauf, dem Marketing oder dem Support der Poolsteuerung zu tun. Ich habe gerade eine Lösung entwickelt, um diese mit ioBroker zu integrieren und das Zuhause meiner Eltern ein bisschen intelligenter zu machen.**

## Details zum Adapter
Der Adapter nutzt die `/GetState.csv` API des ProCon.IP zum Abfragen seiner Werte und eine weitere – nicht dokumentierte – API, die mit bitweisen Befehlen zum Schalten der Relais arbeitet. Die zweite wird auch von den Original-Weboberflächen des ProCon.IP verwendet. Daher könnte es zukünftige Firmware-Upgrades geben, die die Kompatibilität mit diesem Adapter beeinträchtigen oder zumindest die Funktionalität zum Schalten der Relais beeinträchtigen.

### Kompatibilität
Derzeit wurde der Adapter in Kombination mit der ProCon.IP-Firmware **Revision 1.7.6.a** getestet und entwickelt.

## Roadmap
Der Plan enthält nichts Besonderes. Sie können ein Problem erstellen, um neue Features/Funktionen vorzuschlagen ...

## Entwicklung und Beteiligung
Kontaktieren Sie mich gerne, wenn Sie an der Entwicklung oder Dokumentation dieses Adapters mitwirken möchten.

Nützliche Links für den Ansatz werden sein

* die [TypeScript-Adaptervorlage](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Ich hatte von und angefangen

* der [Leitfaden für Adapterentwickler](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Spende
Fühlen Sie sich frei. Aber wenn du das Gefühl hast, wirklich herablassend zu sein, könntest du... 😃 [<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Kauf mir einen Kaffee" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### **WORK IN PROGRESS**
* Add newline before descriptive text in adapter config.

### 1.5.1 (2023-09-05)
* Re-translate adapter config.
* Cleanup adapter code.
* Update dependencies.

### 1.5.0 (2023-08-31)
* Breaking backward compatibility: For older installations, this update may
  require an adapter reconfiguration.
* Require `js-controller >=3.0.0`: Remove support for obsolete credential 
  encryption mechanisms (in favor to ioBroker's native encryption mechanism).
* Require `iobroker.admin >=5.0.0`: Replace old-fashioned materialize admin 
  interface with a newer JSON defined one. 

### 1.4.0 (2023-08-21)
* Add generic relay timers
  (relays must be set to 'auto' for the timer to function).
* Update dependencies.

### 1.3.3 (2023-07-13)
* Update dependencies.

### 1.3.2 (2023-07-10)
* Update dependencies.
* Adapter Icon change.

### 1.3.1 (2023-06-12)
* re-add read-only restrictions on `onOff` states of dosage control relays.
* Add writable numeric `dosage` states to trigger timer-based manual dosage.

### 1.3.0 (2023-06-11)
* Remove restrictions on dosage control relays: enable manual switching.
* Add additional boolean states for dosage control information:
  `info.system.chlorineDosageEnabled`, `info.system.phPlusDosageEnabled`, 
  `info.system.phMinusDosageEnabled`, `info.system.electrolysis` (formerly 
  only available as combined bit-state/integer value 
  `info.system.dosageControl` as delivered by the GetState.csv).
* Update dependencies.

### 1.2.3 (2023-04-29)
* Update dependencies.

### 1.2.2 (2023-01-08)
* Update dependencies.

### 1.2.1 (2022-03-28)
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29)).

### 1.2.0 (2022-03-07)
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### 1.1.1 (2021-09-05)
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies.

### 1.0.2 (2020-09-05)
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 

### 1.0.1 (2020-08-16)
* Fix Object State updates.
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### 1.0.0 (2020-08-15)
* Official release in ioBroker adapter repository:  
  The most exciting change with this release is, that it's available from the
  ioBroker adapter repository. Hence you can just install it, without copy/
  pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248)).
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### 0.4.1 (2020-05-29)
* Fix write actions to the appropriate states of external relays.  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0 (2020-05-10)
* Add encryption for configuration settings stored in ioBroker's internal db.
* Improve http request/connection error handling.
* Reduce logging output.
* Remove the unused admin tab.

### 0.3.1 (2020-05-04)
* Update dependencies including some reported as vulnerable.
* Add connection status indication for iobroker's instance tab.
* Add form validation for the configuration settings.

### 0.2.0 (2020-02-09)
* Update npm dependencies.
* Group admin settings input fields in rows.

### 0.1.1 (2019-09-12)
* Update vulnerable eslint-utils.

### 0.1.0 (2019-07-21)
* Fix object attributes regarding the cloud adapter.
* Pre-defined `smartName` attributes for active relays and temperature
  sensors.
* Recognize relays with 'light', 'licht' or 'leucht' in its name as
  `smartType` _LIGHT_.

### 0.0.4 (2019-07-17)
* Update `lodash` (pinning version `4.17.14`).
* Update other indirect and direct dependencies.

### 0.0.3 (2019-07-16)
* Fix missing `value` states.
* Reduce logging output.

### 0.0.2 (2019-07-09)
* Fix sys info state values.

### 0.0.1 (2019-07-09)
* All information from `GetState.csv` as readonly states.
* Writable states for all relays to toggle auto/manual.
* Writable states for relays not configured for dosage control to toggle on/off.

## License
The MIT License (MIT)

Copyright (c) 2019-2023 ylabonte <yannic.labonte@gmail.com>