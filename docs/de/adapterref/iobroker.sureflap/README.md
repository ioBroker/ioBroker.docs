---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: rSqt+4ME/KdGYXT7BTGsggsZ6MB8OeKxyqAwxVq0y3I=
---
![Stabile Version](http://iobroker.live/badges/sureflap-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/sureflap-installed.svg)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
![Testen und Freigeben](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)

## Adapter für Smart-Pet-Geräte von Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p> <p align="center"> <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" /> <img src="/admin/Sure_Petcare_Felaqua_Connect.png" /> </p>

## Konfiguration
Fügen Sie auf der Adapterkonfigurationsseite Benutzernamen und Passwort von Ihrem Sure Petcare®-Konto hinzu.

Auch die Grenzwerte für Batterie voll und leer können hier bei Verwendung von Akkus angepasst werden. Dies wirkt sich auf die Batterieprozentwerte aus.

## Beschreibung
Der Adapter liefert Informationen über die Einstellungen und den Status Ihrer Tierklappe, Katzenklappe, Ihres Futter- oder Wasserautomaten.

Außerdem wird der Standort Ihrer Haustiere sowie deren Futter- und Wasseraufnahme (mit Futter- und/oder Wasserspender) angezeigt.

Damit können Sie den Sperrmodus und die Ausgangssperre Ihrer Klappe steuern und den Standort Ihrer Haustiere festlegen.

Der Adapter erfordert Node 18 oder neuer.

### Veränderbare Werte
Die folgenden Zustände können geändert werden und werden auf Ihrem Gerät wirksam bzw. werden in Ihrer Sure Petcare®-App angezeigt.

| Status | Beschreibung | zulässige Werte |
|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Haushaltsname.Hubname.control.led_mode | legt die Helligkeit der Hub-LEDs fest | **0** - aus<br> **1** - hoch<br> **4** - abgeblendet |
| household_name.hub_name.flap_name.control.curfew_enabled | aktiviert oder deaktiviert die konfigurierte Ausgangssperre | **true** oder **false** |
| Haushaltsname.Hubname.Klappenname.Control.current_Curfew | legt die aktuelle Ausgangssperre fest,<br> unterstützt 1 (Haustierklappe) oder bis zu 4 (Katzenklappe) Sperrzeiten | **[{&quot;enabled&quot;:true\|false, &quot;lock_time&quot;:&quot;xx:xx&quot;, &quot;unlock_time&quot;:&quot;xx:xx&quot;}, ...]** |
| Haushaltsname.Hubname.Klappenname.control.lockmode | setzt den Sperrmodus | **0** - öffnen<br> **1** - einsperren<br> **2** - Aussperren<br> **3** - geschlossen (Ein- und Aussperren) |
| Haushaltsname.Hubname.Klappenname.Zugeordnete Haustiere.Haustiername.Kontrolltyp | Legt den Haustiertyp für das zugewiesene Haustier und die Klappe fest | **2** - Haustier im Freien<br> **3** - Haustier |
| Haushaltsname.Hubname.Feedername.Control.close_delay | Legt die Schließverzögerung des Feederdeckels fest | **0** - schnell<br> **4** - normal<br> **20** - langsam |
| household_name.pets.pet_name.inside | legt fest, ob Ihr Haustier drinnen ist | **true** oder **false** |

### Struktur
Der Adapter erstellt die folgende hierarchische Struktur:

Adapter<br> ├ Haushaltsname<br> │ ├ Hub-Name<br> │ │ ├ online<br> │ │ ├ Seriennummer<br> │ │ ├ Signal<br> │ │ │ ├ Gerät_RSSI<br> │ │ │ └ hub_rssi<br> │ │ ├ Version<br> │ │ │ ├ Firmware<br> │ │ │ └ Hardware<br> │ │ ├ Kontrolle<br> │ │ │ └ LED-Modus<br> │ │ ├ felaqua_name<br> │ │ │ ├ Batterie<br> │ │ │ ├ Batterieprozentsatz<br> │ │ │ ├ online<br> │ │ │ ├ Seriennummer<br> │ │ │ ├ Signal<br> │ │ │ │ ├ Gerät_RSSI<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ Version<br> │ │ │ │ ├ Firmware<br> │ │ │ │ └ Hardware<br> │ │ │ ├ zugewiesene_Haustiere<br> │ │ │ │ └ Haustiername<br> │ │ │ └ Wasser<br> │ │ │ ├ Prozent_Füllung<br> │ │ │ ├ zuletzt ausgefüllt am<br> │ │ │ └ Gewicht<br> │ │ ├ Feedername<br> │ │ │ ├ Batterie<br> │ │ │ ├ Batterieprozentsatz<br> │ │ │ ├ online<br> │ │ │ ├ Seriennummer<br> │ │ │ ├ Signal<br> │ │ │ │ ├ Gerät_RSSI<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ Version<br> │ │ │ │ ├ Firmware<br> │ │ │ │ └ Hardware<br> │ │ │ ├ zugewiesene_Haustiere<br> │ │ │ │ └ Haustiername<br> │ │ │ ├ Schüsseln<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ Prozent_Füllung<br> │ │ │ │ ├ Nahrungsmittelart<br> │ │ │ │ ├ zuletzt ausgefüllt am<br> │ │ │ │ ├ Letztes_Nullsetzen_am<br> │ │ │ │ ├ Ziel<br> │ │ │ │ └ Gewicht<br> │ │ │ └ Kontrolle<br> │ │ │ └ Verzögerung schließen<br> │ │ └ Klappenname<br> │ │ ├ Batterie<br> │ │ ├ Batterieprozentsatz<br> │ │ ├ Ausgangssperre aktiv<br> │ │ ├ letzte_aktivierte_Ausgangssperre<br> │ │ ├ online<br> │ │ ├ Seriennummer<br> │ │ ├ Kontrolle<br> │ │ │ ├ Ausgangssperre aktiviert<br> │ │ │ ├ aktuelle_Ausgangssperre<br> │ │ │ └ Sperrmodus<br> │ │ ├ Signal<br> │ │ │ ├ Gerät_RSSI<br> │ │ │ └ hub_rssi<br> │ │ ├ Version<br> │ │ │ ├ Firmware<br> │ │ │ └ Hardware<br> │ │ └ zugewiesene_Haustiere<br> │ │ └ Haustiername<br> │ │ └ Kontrolle<br> │ │ └ Typ<br> │ ├ Geschichte<br> │ │ └ json<br> │ │ └ 0..24<br> │ └ Haustiere<br> │ └ Haustiername<br> │ ├ innen<br> │ ├ Name (Bezeichnung)<br> │ ├ seit<br> │ ├ Essen<br> │ │ ├ zuletzt gegessen<br> │ │ ├ aufgewendete Zeit<br> │ │ ├ mal gegessen<br> │ │ └ trocken..nass<br> │ │ └ Gewicht<br> │ ├ Bewegung<br> │ │ ├ letzte_Richtung<br> │ │ ├ letzte_Klappe<br> │ │ ├ letzte_Klappen-ID<br> │ │ ├ letzte_Zeit<br> │ │ ├ Zeit_draußen_ verbracht<br> │ │ └ mal_draußen<br> │ └ Wasser<br> │ ├ letztes Mal betrunken<br> │ ├ aufgewendete Zeit<br> │ ├ mal betrunken<br> │ └ Gewicht<br> └ Infos<br> ├ alle_Geräte_online<br> ├ Verbindung<br> ├ letztes_Update<br> └ Version<br>

## Hinweise
SureFlap®, Sure Petcare® und Felaqua® sind eingetragene Marken von [SureFlap Ltd.](https://www.surepetcare.com/)

Die Bilder der SureFlap®-Geräte werden von [Sure Petcare®](https://www.surepetcare.com/en-us/press) zur freien Verwendung bereitgestellt.

## Changelog

### 2.2.1 (2024-08-11)

* (Sickboy78) added new data to feeder
* (Sickboy78) added new data to water dispenser
* (Sickboy78) dependency updates

### 2.2.0 (2024-07-25)

* (Sickboy78) added new json curfew
* (Sickboy78) added new json history
* (Sickboy78) fix lock mode is undefined
* (Sickboy78) code cleanup and refactoring
* (Sickboy78) dependency updates

### 2.1.2 (2024-06-02)

* (Sickboy78) dependency updates

### 2.1.1 (2024-02-25)

* (Sickboy78) bugfix for outside times not beeing shown

### 2.1.0 (2024-02-20)

* (Scrounger) option to enable history data
* (Sickboy78) added number of history entries to configuration

### 2.0.2 (2024-02-17)

* (Sickboy78) added flap id to last movement
* (Sickboy78) fixed a bug where hub was recognized as obsolete device because of same name as a device
* (Sickboy78) fixed a bug where setting lockmode or curfew was not working because of flap having same name as the hub

### 2.0.1 (2024-01-24)

* (Sickboy78) added last movement for pets
* (Sickboy78) added time spent outside today for pets
* (Sickboy78) dependency updates

### 1.2.3 (2023-12-29)

* (Sickboy78) added api host to config and set default to new api
* (Sickboy78) improved removing of obsolete objects

### 1.2.2 (2023-10-17)

* (Sickboy78) added signal strength and hardware and firmware version of devices

### 1.2.1 (2023-10-03)

* (Sickboy78) fixed get_history_since call failing because of API changes
* (Sickboy78) added workaround for removed parent object because of API changes
* (Sickboy78) removed wrongly created objects because of API changes

### 1.2.0 (2023-08-19)

* (Sickboy78) repetitive errors are now logged as debug to avoid spamming the error log
* (Sickboy78) increased timeout for surepet API from 60 to 120 seconds
* (Sickboy78) added removal of deleted or renamed pets
* (Sickboy78) security updates

### 1.1.9 (2023-07-21)

* (Sickboy78) fixed undefined serial number
* (Sickboy78) dependency updates

### 1.1.8 (2023-06-01)

* (Sickboy78) adjustments for Surepet API changes

### 1.1.7 (2023-03-13)

* (Sickboy78) fixed false login error in case pet had no photo

### 1.1.6 (2023-01-07)

* (Sickboy78) added battery voltage configuration
* (Sickboy78) added translation for adapter settings
* (Sickboy78) security updates

### 1.1.5 (2022-09-10)

* (Sickboy78) added display of serial numbers

### 1.1.4 (2022-09-07)

* (Sickboy78) added Felaqua support
* (Sickboy78) improved battery and battery percentage indicator (reduced outliers)

### 1.1.3 (2022-03-28)

* (Sickboy78) code improvements
* (Sickboy78) improved error handling if no pet has been assigned yet

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

Copyright (c) 2024 Sickboy78 <asmoday_666@gmx.de>