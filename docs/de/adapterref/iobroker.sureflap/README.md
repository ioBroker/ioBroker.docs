---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sureflap/README.md
title: ioBroker.surflap
hash: KwU43CHiHy3A05RRzUVb2PSjKfzS52o9uZau067+Ah8=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/sureflap-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sureflap-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![Travis-CI](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.surflap
## Adapter für SureFlap® Katzen- und Haustierklappen von Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

## Aufbau
Fügen Sie auf der Adapterkonfigurationsseite einen Benutzernamen und ein Passwort von Ihrem Sure Petcare®-Konto hinzu.

## Beschreibung
Der Adapter informiert über die Einstellungen und den Status Ihrer Katzenklappe oder Ihres Futterautomaten.

Es zeigt auch den Standort Ihrer Haustiere an.

### Änderbare Werte
Die folgenden Zustände können geändert werden und werden auf Ihrem Gerät wirksam bzw. werden in Ihrer Sure Petcare®-App angezeigt.

| Zustand | Beschreibung | zulässige Werte |
|-------|-------------|----------------|
| haushaltsname.hub_name.control.led_mode | stellt die Helligkeit der Hub-LEDs ein | **0** - aus<br> **1** - hoch<br> **4** - gedimmt |
| house_name.hub_name.flap_name.control.curfew | aktiviert oder deaktiviert die konfigurierte Ausgangssperre<br> (Ausgangssperre muss per App konfiguriert werden) | **wahr** oder **falsch** |
| house_name.hub_name.flap_name.control.lockmode | setzt den Lockmode | **0** - geöffnet<br> **1** - einschließen<br> **2** - Aussperren<br> **3** - geschlossen (ein- und aussperren) |
| house_name.hub_name.flap_name.assigned_pets.pet_name.control.type | legt den Haustiertyp für das zugewiesene Haustier und die Klappe fest | **2** - Haustier im Freien<br> **3** - Haustier im Haus |
| house_name.hub_name.feeder_name.control.close_delay | stellt die Schließverzögerung des Zufuhrdeckels ein | **0** - schnell<br> **4** - normal<br> **20** - langsam |
| haushaltsname.haustiere.haustiername.inside | legt fest, ob Ihr Haustier drinnen ist | **wahr** oder **falsch** |

### Struktur
Der Adapter erstellt die folgende hierarchische Struktur:

Adapter<br> ├ haushaltsname<br> │ ├ hub_name<br> │ │ ├ online<br> │ │ ├ Kontrolle<br> │ │ │ └ led_mode<br> │ │ ├ feeder_name<br> │ │ │ ├ Batterie<br> │ │ │ ├ Batterie_Prozentsatz<br> │ │ │ ├ online<br> │ │ │ ├ Kontrolle<br> │ │ │ └ close_delay<br> │ │ │ └ zugewiesene_Haustiere<br> │ │ │ └ pet_name<br> │ │ └ Klappenname<br> │ │ ├ Batterie<br> │ │ ├ Batterie_Prozentsatz<br> │ │ ├ curfew_active<br> │ │ ├ online<br> │ │ ├ Kontrolle<br> │ │ │ ├ Ausgangssperre<br> │ │ │ └ Sperrmodus<br> │ │ ├ Ausgangssperre<br> │ │ │ └ 0..i<br> │ │ │ ├ aktiviert<br> │ │ │ ├ lock_time<br> │ │ │ └unlock_time<br> │ │ ├ last_curfew<br> │ │ │ └ 0..i<br> │ │ │ ├ aktiviert<br> │ │ │ ├ lock_time<br> │ │ │ └ unlock_time<br> │ │ └ zugewiesene_Haustiere<br> │ │ └ pet_name<br> │ │ └ Kontrolle<br> │ │ └ Typ<br> │ ├ Geschichte<br> │ └ 0..24<br> │ │ └ ...<br> │ └ Haustiere<br> │ └ pet_name<br> │ ├ Name<br> │ ├ innen<br> │ └ seit<br> info<br> ├ all_devices_online<br> ├ Verbindung<br> └ letztes_update<br>

## Anmerkungen
SureFlap® und Sure Petcare® sind eingetragene Marken von [SureFlap Ltd.](https://www.surepetcare.com/)

Das Bild der Katzenklappe, des Hubs und der Smartphone-App wird von [Sure Petcare®](https://www.surepetcare.com/en-us/press) kostenlos zur Verfügung gestellt.

## Changelog

### 1.0.7 (2021-11-02)
* (Sickboy78) added history
* (Sickboy78) added last update time

### 1.0.6 (2021-09-12)
* (Sickboy78) added feeder support (closing delay of lid)
* (Sickboy78) added led control for hub
* (Sickboy78) added assigned pets for flap and feeder devices
* (Sickboy78) added pet type control (indoor or outdoor) for assigned pets for flap devices
* (Apollon77) update CI testing

### 1.0.5 (2021-04-25)
* (Sickboy78) fixed bug in case pets didn't have a position (e.g. no flaps, only feeder in use)

### 1.0.4 (2021-03-07)
* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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