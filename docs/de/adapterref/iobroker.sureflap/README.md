---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: GDlWBe+K/gW1jDuXCwhr5IS3zmwm4/5e8M9zQsoxL0U=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/sureflap-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sureflap-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![Travis-CI](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
## Adapter für Smart Pet Devices von Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

## Aufbau
Fügen Sie den Benutzernamen und das Passwort Ihres Sure Petcare®-Kontos auf der Adapterkonfigurationsseite hinzu.

## Beschreibung
Der Adapter gibt Auskunft über die Einstellungen und den Status Ihrer Haustierklappe, Katzenklappe oder Ihres Futterautomaten.

Es zeigt auch den Aufenthaltsort Ihrer Haustiere und deren Futteraufnahme (mit Futternapf).

Damit können Sie den Sperrmodus und die Ausgangssperre Ihrer Klappe steuern und den Standort Ihrer Haustiere festlegen.

### Veränderbare Werte
Die folgenden Zustände können geändert werden und werden auf Ihrem Gerät wirksam bzw. in Ihrer Sure Petcare®-App wiedergegeben.

| Zustand | Beschreibung | zulässige Werte |
|-------|-------------|----------------|
| haushaltsname.hub_name.control.led_mode | stellt die Helligkeit der Hub-LEDs ein | **0** - aus<br> **1** - hoch<br> **4** - gedimmt |
| Haushaltsname.Hub_Name.Klappenname.Kontrolle.Ausgangssperre | aktiviert oder deaktiviert die konfigurierte Ausgangssperre<br> (Ausgangssperre muss per App konfiguriert werden) | **wahr** oder **falsch** |
| Haushaltsname.Hub_Name.Klappenname.Steuerung.Sperrmodus | setzt den Sperrmodus | **0** - offen<br> **1** - einsperren<br> **2** - sperren<br> **3** - geschlossen (ein- und aussperren) |
| Haushaltsname.Hub_Name.Klappenname.Zugewiesene_Haustiere.Haustiername.Steuerung.Typ | setzt den Haustiertyp für das zugewiesene Haustier und die Klappe | **2** - Haustier im Freien<br> **3** - Haustier |
| haushaltsname.hub_name.feeder_name.control.close_delay | legt die Schließverzögerung des Speiserdeckels fest | **0** - schnell<br> **4** - normal<br> **20** - langsam |
| haushaltsname.haustiere.haustiername.innen | legt fest, ob sich Ihr Haustier darin befindet | **wahr** oder **falsch** |

### Struktur
Der Adapter erstellt die folgende hierarchische Struktur:

Adapter<br> ├ Haushaltsname<br> │ ├ hub_name<br> │ │ ├ online<br> │ │ ├ kontrollieren<br> │ │ │ └ led_mode<br> │ │ ├ feeder_name<br> │ │ │ ├ Batterie<br> │ │ │ ├ Batterie_Prozentsatz<br> │ │ │ ├ online<br> │ │ │ ├ zugewiesene_Haustiere<br> │ │ │ │ └ pet_name<br> │ │ │ ├ Schalen<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ Lebensmitteltyp<br> │ │ │ │ ├ Ziel<br> │ │ │ │ └ Gewicht<br> │ │ │ └ kontrollieren<br> │ │ │ └ Schließverzögerung<br> │ │ └ Klappenname<br> │ │ ├ Batterie<br> │ │ ├ Batterieprozentsatz<br> │ │ ├ Sperrstunde_aktiv<br> │ │ ├ online<br> │ │ ├ kontrollieren<br> │ │ │ ├ Ausgangssperre<br> │ │ │ └ Sperrmodus<br> │ │ ├ Ausgangssperre<br> │ │ │ └ 0..i<br> │ │ │ ├ aktiviert<br> │ │ │ ├ lock_time<br> │ │ │ └unlock_time<br> │ │ ├ last_curfew<br> │ │ │ └ 0..i<br> │ │ │ ├ aktiviert<br> │ │ │ ├ lock_time<br> │ │ │ └ unlock_time<br> │ │ └ zugewiesene_haustiere<br> │ │ └ pet_name<br> │ │ └ kontrollieren<br> │ │ └ eingeben<br> │ ├ Geschichte<br> │ │ └ 0..24<br> │ │ └ ...<br> │ └ Haustiere<br> │ └ pet_name<br> │ ├ innen<br> │ ├ Namen<br> │ ├ seit<br> │ └ Essen<br> │ ├ zuletzt_gegessen<br> │ ├ aufgewendete Zeit<br> │ ├ mal_gegessen<br> │ └ trocken..nass<br> │ └ Gewicht<br> └ Infos<br> ├ alle_Geräte_online<br> ├ Verbindung<br> └ letzte_aktualisierung<br>

## Anmerkungen
SureFlap® und Sure Petcare® sind eingetragene Warenzeichen von [SureFlap Ltd.](https://www.surepetcare.com/)

Das Bild der Katzenklappe, des Hubs und der Smartphone-App wird von [Sicher Petcare®](https://www.surepetcare.com/en-us/press) kostenlos zur Verfügung gestellt.

## Changelog

### 1.1.2 (2022-03-06)
* (Sickboy78) improved error and timeout handling
* (Sickboy78) optimized subscribed states

### 1.1.1 (2022-02-20)
* (Sickboy78) removed pet type control from pet flap (is a cat flap exclusive feature)
* (Sickboy78) fixed wrong default value for info.last_update
* (Sickboy78) testing updates for js-controller 4
* (Sickboy78) security updates

### 1.1.0 (2022-01-17)
* (Sickboy78) bugfix and security updates

### 1.0.9 (2022-01-05)
* (Sickboy78) removed old encrypt/decrypt from index_m
* (Sickboy78) added adapter unloaded guard in case unload happens during data requests

### 1.0.8 (2021-11-22)
* (Sickboy78) added food type, target weight and remaining food in feeder
* (Sickboy78) added todays pet food consumption, times eaten and time spent

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

Copyright (c) 2022 Sickboy78 <asmoday_666@gmx.de>

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