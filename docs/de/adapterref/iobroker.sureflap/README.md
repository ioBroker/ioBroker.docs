---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: 9d04pkfbCIH58wtvJOMhYfqmtr2sCbcDD4pbmXvp+Eg=
---
![Stabile Version](http://iobroker.live/badges/sureflap-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/sureflap-installed.svg)
![Test und Freigabe](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center">
  <img src="admin/sureflap.png" />
</p>

# ioBroker.sureflap

## Adapter für smarte Haustiergeräte von Sure Petcare®

<p align="center">
  <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" />
</p>
<p align="center">
  <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" />
  <img src="/admin/Sure_Petcare_Felaqua_Connect.png" />
</p>

## Konfiguration

Erforderlich: Fügen Sie auf der Adapterkonfigurationsseite Ihren Benutzernamen und Ihr Passwort von Ihrem Sure Petcare®-Konto hinzu.

Optional: JSON-Ereignisverlauf aktivieren oder deaktivieren und Anzahl der Einträge konfigurieren. Optional: Schwellenwerte für vollen und leeren Akku bei Verwendung von Akkus festlegen. Dies wirkt sich auf die Akkuprozentanzeige aus.

## Beschreibung

Der Adapter liefert Informationen über die Einstellungen und den Status Ihrer Haustierklappe, Katzenklappe, Ihres Futterautomaten oder Wasserspenders.

Es zeigt außerdem den Aufenthaltsort Ihrer Haustiere sowie deren Futter- und Wasseraufnahme (mit Futterautomat und/oder Wasserspender).

Es ermöglicht Ihnen, den Verriegelungsmodus und die Ausgangssperre Ihrer Haustürklappe zu steuern und den Aufenthaltsort Ihrer Haustiere festzulegen.

Der Adapter erfordert Node 20 oder neuer.

### Veränderbare Werte

Die folgenden Zustände können geändert werden und werden auf Ihrem Gerät bzw. in Ihrer Sure Petcare® App angezeigt.

| Zustand                                                               | Beschreibung                                                                                                             | zulässige Werte                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| HAUSHALTSNAME.HUBNAME.Steuerung.LED-Modus                             | Stellt die Helligkeit der Hub-LEDs ein.                                                                                  | **0** - aus<br> **1** - hoch<br> **4** - gedimmt                                                      |
| HAUSHALTSNAME.HUBNAME.GERÄTENAME.control.pets.HAUSTIERNAME.assigned   | ordnet das Haustier dem Gerät zu bzw. hebt die Zuordnung auf.                                                            | **wahr** oder **falsch**                                                                              |
| HAUSHALTSNAME.HUBNAME.FEUTENAME.control.close\_delay                  | Stellt die Schließverzögerung des Futterdeckels ein                                                                      | **0** - schnell<br> **4** - normal<br> **20** - langsam                                               |
| HAUSHALTSNAME.HUBNAME.FLAP\_NAME.control.curfew\_enabled              | Aktiviert oder deaktiviert die konfigurierte Ausgangssperre.                                                             | **wahr** oder **falsch**                                                                              |
| HAUSHALTSNAME.HUBNAME.FLAP\_NAME.control.current\_curfew              | setzt die aktuelle Ausgangssperre,<br> Unterstützt 1 (Haustierklappe) oder bis zu 4 (Katzenklappe) Ausgangssperrenzeiten | **\[{"enabled":true\|false, "lock\_time":"xx:xx", "unlock\_time":"xx:xx"}, ...]**                     |
| HAUSHALTSNAME.NUMMERNNAME.KLAPPENNAME.Steuerung.Sperrmodus            | legt den Sperrmodus fest                                                                                                 | **0** - offen<br> **1** - Verriegeln<br> **2** - Sperre<br> **3** - geschlossen (ein- und ausriegeln) |
| HAUSHALTSNAME.HUBNAME.FLÜGELNAME.Steuerung.Haustiere.HAUSTIERNAME.Typ | Legt den Haustiertyp für das zugewiesene Haustier und die Klappe fest.                                                   | **2** - Haustier im Freien<br> **3** - Haustier für die Wohnungshaltung                               |
| HAUSHALTSNAME.Haustiere.HAUSTIERNAME.innen                            | Legt fest, ob sich Ihr Haustier im Inneren befindet                                                                      | **wahr** oder **falsch**                                                                              |

### Struktur

Der Adapter erzeugt die folgende hierarchische Struktur:

Adapter<br> ├ HAUSHALTSNAME<br> │ ├ HUB\_NAME<br> │ │ ├ online<br> │ │ ├ Seriennummer<br> │ │ ├ Signal<br> │ │ │ ├ device\_rssi<br> │ │ │ └ hub\_rssi<br> │ │ ├ Version<br> │ │ │ ├ Firmware<br> │ │ │ └ Hardware<br> │ │ ├ Steuerung<br> │ │ │ └ LED-Modus<br> │ │ ├ FELAQUA\_NAME<br> │ │ │ ├ Batterie<br> │ │ │ ├ Akkustand in Prozent<br> │ │ │ ├ online<br> │ │ │ ├ Seriennummer<br> │ │ │ ├ Signal<br> │ │ │ │ ├ device\_rssi<br> │ │ │ │ └ hub\_rssi<br> │ │ │ ├ Version<br> │ │ │ │ ├ Firmware<br> │ │ │ │ └ Hardware<br> │ │ │ ├ Wasser<br> │ │ │ │ ├ fill\_percent<br> │ │ │ │ ├ last\_filled\_at<br> │ │ │ │ └ Gewicht<br> │ │ │ └ Steuerung<br> │ │ │ └ Haustiere<br> │ │ │ └ HAUSTIERNAME<br> │ │ │ └ zugewiesen<br> │ │ ├ FEEDER\_NAME<br> │ │ │ ├ Batterie<br> │ │ │ ├ Akkustand in Prozent<br> │ │ │ ├ online<br> │ │ │ ├ Seriennummer<br> │ │ │ ├ Signal<br> │ │ │ │ ├ device\_rssi<br> │ │ │ │ └ hub\_rssi<br> │ │ │ ├ Version<br> │ │ │ │ ├ Firmware<br> │ │ │ │ └ Hardware<br> │ │ │ ├ Schüsseln<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ fill\_percent<br> │ │ │ │ ├ food\_type<br> │ │ │ │ ├ last\_filled\_at<br> │ │ │ │ ├ Last\_zeroed\_at<br> │ │ │ │ ├ Ziel<br> │ │ │ │ └ Gewicht<br> │ │ │ └ Steuerung<br> │ │ │ ├ Haustiere<br> │ │ │ │ └ HAUSTIERNAME<br> │ │ │ │ └ zugewiesen<br> │ │ │ └ close\_delay<br> │ │ └ FLAP\_NAME<br> │ │ ├ Batterie<br> │ │ ├ Akkustand in Prozent<br> │ │ ├ curfew\_active<br> │ │ ├ last\_enabled\_curfew<br> │ │ ├ online<br> │ │ ├ Seriennummer<br> │ │ ├ Steuerung<br> │ │ │ ├ Haustiere<br> │ │ │ │ └ HAUSTIERNAME<br> │ │ │ │ ├ zugewiesen<br> │ │ │ │ └ Typ<br> │ │ │ ├ Ausgangssperre\_aktiviert<br> │ │ │ ├ aktuelle\_Ausgangssperre<br> │ │ │ └ Sperrmodus<br> │ │ ├ Signal<br> │ │ │ ├ device\_rssi<br> │ │ │ └ hub\_rssi<br> │ │ └ Version<br> │ │ ├ Firmware<br> │ │ └ Hardware<br> │ ├ Geschichte<br> │ │ └ json<br> │ │ └ 0..24<br> │ └ Haustiere<br> │ └ HAUSTIERNAME<br> │ ├ innen<br> │ ├ Name<br> │ ├ seit<br> │ ├ Essen<br> │ │ ├ letztes\_Essen<br> │ │ ├ Zeitaufwand<br> │ │ ├ times\_eaten<br> │ │ └ trocken..nass<br> │ │ └ Gewicht<br> │ ├ Bewegung<br> │ │ ├ letzte\_Richtung<br> │ │ ├ last\_flap<br> │ │ ├ last\_flap\_id<br> │ │ ├ letzte\_Zeit<br> │ │ ├ time\_spent\_outside\_<br> │ │ └ times\_outside<br> │ └ Wasser<br> │ ├ letztes\_mal\_betrunken<br> │ ├ Zeitaufwand<br> │ ├ times\_drunk<br> │ └ Gewicht<br> └ Info<br> ├ all\_devices\_online<br> ├ Verbindung<br> ├ letzte Aktualisierung<br> ├ Offline-Geräte<br> └ Version<br>

## Anmerkungen

SureFlap®, Sure Petcare® und Felaqua® sind eingetragene Warenzeichen der [SureFlap Ltd.](https://www.surepetcare.com/)

Die Bilder der SureFlap®-Geräte werden von [Sure Petcare®](https://www.surepetcare.com/en-us/press) kostenlos zur Verfügung gestellt.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (Sickboy78) reduce log messages

### 3.4.3 (2026-08-29)

* (Sickboy78) dependency updates
* (copilot) Adapter requires node.js >= 22 now
* (Sickboy78) code refactoring
* (Sickboy78) added unit tests

### 3.4.2 (2026-01-09)

* (Sickboy78) dependency updates
* (Sickboy78) add AlCalzone's Release Script

### 3.4.1 (2025-10-22)

* (Sickboy78) dependency updates
* (Sickboy78) migration to npm trusted publishing

### 3.4.0 (2025-08-11)

* (Sickboy78) removed deprecated util.promisify

### 3.3.0 (2025-07-13)

* (Sickboy78) added translations for unknown pet setting

[Older changelogs can be found there](https://github.com/Sickboy78/ioBroker.sureflap/blob/master/CHANGELOG_OLD.md)

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

Copyright (c) 2025-2026 Sickboy78 <asmoday_666@gmx.de>