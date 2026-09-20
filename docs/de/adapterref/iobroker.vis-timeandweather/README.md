---
chapters: {"pages":{"en/adapterref/iobroker.vis-timeandweather/README.md":{"title":{"en":"ioBroker.vis-timeandweather"},"content":"en/adapterref/iobroker.vis-timeandweather/README.md"},"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md":{"title":{"en":"Time and weather widgets for vis-2"},"content":"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-timeandweather/README.md
title: ioBroker.vis-timeandweather
hash: omSXiMtDOl9FYZEUOKoqePPPfHHoHyUumJ52mS2Htg0=
---
![Logo](../../../en/adapterref/iobroker.vis-timeandweather/admin/timeandweather.svg)

![Anzahl der Installationen](http://iobroker.live/badges/vis-timeandweather-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-timeandweather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-timeandweather.svg)
![NPM](https://nodei.co/npm/iobroker.vis-timeandweather.png?downloads=true)

# ioBroker.vis-timeandweather

`timeandweather` - Zeit- und Wetter-Widgets für [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) und [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)

![Beispiel](../../../en/adapterref/iobroker.vis-timeandweather/img/widgets.png)

## Widgets

| Widget                   | Beschreibung                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| SimpleClock              | Die Uhrzeit als Text, mit oder ohne Sekunden, optional mit einem blinkenden Doppelpunkt                                |
| SimpleDate               | Datum als Text, Wochentag und Monat als Wort, im Kurz- oder amerikanischen Format                                      |
| CoolClock                | Analoge Canvas-Uhr mit 21 Designs, optional mit Digitalanzeige                                                         |
| FlipClock                | Klappuhr mit 24- oder 12-Stunden-Anzeige                                                                               |
| Wetterbenutzerdefinierte | Aktuelles Wetter und eine Vorhersage für bis zu sechs Tage, gespeist von den Zuständen eines beliebigen Wetteradapters |
| SVG-Uhr                  | Analoge SVG-Uhr mit konfigurierbaren Farben und Schriftart                                                             |
| Segmentuhr               | 7-, 14- oder 16-Segment-Anzeige für die Uhrzeit, einen festen Text oder den Wert eines Zustands                        |

## vis und vis-2

Der Adapter liefert jedes Widget zweimal aus:

- **vis (vis-1)** verwendet das EJS/jQuery-Widget-Set in `widgets/timeandweather.html` Die
- **vis-2** verwendet das React-Widget-Set in `widgets/vis-2-widgets-timeandweather/`, gebaut aus `src-widgets/` Die

Beide deklarieren die gleichen Widget-IDs (`tplTwSimpleClock`, `tplTwCoolClock`, ...) und dieselben Attributnamen, und vis-2 bevorzugt ein React-Widget gegenüber einem EJS-Widget. Daher funktioniert ein mit vis erstelltes Projekt auch nach dem Wechsel zu vis-2 weiterhin – die Widgets werden einfach mit der React-Implementierung gerendert, ohne jQuery und ohne die unten aufgeführten Bibliotheken zu laden.

Die React-Widgets benötigen vis-2 Version 2.12.8 oder neuer. Bei älteren vis-2-Versionen werden die EJS-Widgets verwendet.

Die Widgets `HtcWeather` Und `YahooWeather` Die Funktionen von vis-1 sind deaktiviert, da der Wetterdienst von Yahoo! eingestellt wurde. `WeatherCustom` stattdessen mit den Zuständen eines Wetteradapters.

## Dokumentation

Alle Widgets mit ihren Einstellungen und Screenshots: [Englisch](/#/docs/adapterref/iobroker.vis-timeandweather/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-timeandweather/blob/master/docs/de/README.md)

## Verwendete Pakete (nur vis-1, vis-2 verwendet eigenen Code)

- **CoolClock** <http://randomibis.com/coolclock/> von Simon Baird (MIT) <https://github.com/simonbaird/CoolClock/> – das vis-2-Widget verwendet dessen Zeichencode und Skins.
- **jDigiClock** <http://www.radoslavdimov.com/jquery-plugins/jquery-plugin-digiclock/> von Radoslav Dimov (MIT & GPL) – nur vis-1
- **zWeatherFeed** <http://www.zazar.net/developers/jquery/zweatherfeed/> Zazar Ltd (MIT) – vis-1; das vis-2-Widget behält seine Auszeichnung und Übersetzungen bei
- **Segmentanzeige** <http://www.3quarks.com/en/SegmentDisplay> (CC-3.0) – das vis-2-Widget verwendet dessen Zeichencode.
- **FlipClock** <http://flipclockjs.com/> (MIT) <https://github.com/objectivehtml/FlipClock> - vis-1; das vis-2-Widget behält sein Markup und seine Stile bei

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Made widgets to be compatible with vis2
* (bluefox) All widgets were ported to vis-2 as React widgets, without jQuery and without the vis-1 libraries
* (bluefox) The widgets print the names of week days and months in all languages of vis-2, not only in en/de/ru
* (bluefox) Weather: known weather conditions are translated into all languages of vis-2; a text that is not known is shown as it is instead of being replaced by a similar condition (e.g., "Rain" was shown as "Mixed rain and snow" and an empty text as "Tornado")
* (bluefox) Weather: values that are not set do not leave empty lines like "High: ° Low: °" any more
* (bluefox) Weather: the group names of the forecast days in the editor were one day off
* (bluefox) SimpleDate: English ordinal numbers are correct for the 21st, 22nd, 23rd and 31st and with a leading zero
* (bluefox) Svg Clock: several clocks on one view no longer share the tick colors of the first one
* (bluefox) Added documentation for every vis-2 widget with screenshots (English and German)
* (bluefox) The adapter icon is an SVG now
* (bluefox) Updated packages and GitHub actions

### 1.2.2 (2022-07-05)
* (bluefox) Refactoring of build process done

### 1.2.1 (2022-07-05)
* (HeadCrash78) Fixed the icon display in custom weather forecast
* (bluefox) Refactoring of build process done

### 1.1.7 (2017-01-05)
* (bluefox) add update interval for weather

### 1.1.6 (2016-07-13)
* (bluefox) support of vis APP

### 1.1.4 (2016-06-28)
* (jens-maus) improved german translation of weather terms

### 1.1.3 (2016-06-23)
* (bluefox) enable widgets for https too

### 1.1.2 (2016-06-02)
* (bluefox) add weather custom widget

### 1.1.1 (2016-05-31)
* (bluefox) fix the slide in htc weather

### 1.1.0 (2016-04-16)
* (bluefox) add city name to display

### 0.1.0 (2016-02-10)
* (bluefox) fix typo with Dienstag=>Februar

### 0.0.1 (2015-10-04)
* (bluefox) initial checkin

## License
The MIT License (MIT)

Copyright (c) 2013-2026 bluefox <dogafox@gmail.com>