---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: TiUtnzJzELCOGAXqqFXrfik/XazhXhSGrZ6ufl+vO2M=
---
![Logo](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Bekannte Schwachstellen](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Installiert](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# Weatherflow UDP

## Versionen

## weatherflow\_udp-Adapter für ioBroker

Weatherflow UDP-Empfängeradapter zum Empfangen und Verarbeiten [von UDP-Nachrichten](https://weatherflow.github.io/Tempest/api/udp/v171/) von [Weatherflow](https://github.com/woessmich/ioBroker.weatherflow_udp/blob/master/www.weatherflow.com) Smart-Wetterstationen wie [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/) . Der Adapter sollte auch ältere Stationen wie „Air“ und „Sky“ verarbeiten können (dies ist jedoch ungetestet). Unterstützung für neue Hardware ab 2026 ist enthalten (zusätzliche, undokumentierte Nachrichtenfelder). Der Standardport, auf dem der Adapter lauscht, ist 50222, kann aber in den Einstellungen geändert werden.

## Einstellungen

Der Adapter bietet nur die nötigsten Konfigurationsmöglichkeiten. Der Empfangsport kann geändert werden, was aber meines Wissens nicht nötig sein sollte, da der vom Wetterstations-Hub verwendete Port nicht geändert werden kann.

Die Stationshöhe in Metern über dem Meeresspiegel wird verwendet, um den reduzierten Luftdruck aus dem von der Station angegebenen lokalen Luftdruck zu berechnen. Verwenden Sie einfach dieselbe Höhe, die Sie in der App eingegeben haben. Je nach verwendeter Formel können geringfügige Abweichungen zum reduzierten Luftdruck in der App auftreten. Der Adapter verwendet die Formel des Deutschen Wetterdienstes (DWD) ( <http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER> ; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen) ).

Wenn das Debug-Kontrollkästchen aktiviert ist, erzeugt der Adapter viele Ausgaben in der Protokolldatei. Sollte nur zu Debugging-Zwecken verwendet werden.

## Daten und Zustände von weatherflow

Der Adapter stellt alle Parameter bereit, die über das UDP-Protokoll gesendet werden. Die Zustände sind in einer Baumstruktur unterhalb der Hub- und Stations-ID angeordnet.<b> Vorsicht</b> Beim Senden von Daten zur Langzeitarchivierung an Datenbanken sollten Aliase für die Zustände verwendet werden, um den Verlust der Datenreihen bei einem Geräteaustausch zu vermeiden. Es gibt einige Unterschiede zur Tempest-App, da diese die bereits verarbeiteten Daten von den Weatherflow-Servern bezieht. Bei ausreichender Akkuleistung werden die Daten für „device\_status“ und „obs\_st“ minütlich aktualisiert, „rapid\_wind“ alle 3 Sekunden. „evt\_precip“ und „evt\_strike“ werden nur bei ihrem Auftreten aktualisiert (und erstellt). „hub\_status“ wird alle 10 Sekunden aktualisiert. Werte der Station und die vom Adapter berechneten Werte (siehe unten) werden nur bei Empfang oder zur Berechnung erstellt. Daher kann es bis zu 24 Stunden dauern, bis alle Daten angezeigt werden, außer Regenbeginn und Blitzeinschlag, deren Anzeige Tage, Wochen oder sogar Monate dauern kann.

## Der Adapter berechnete Zustände

Zusätzlich zu den vom System bereitgestellten Daten berechnet der Adapter einige weitere Daten, die alle den Namenszusatz „adapter calculated“ tragen:

- Winddurchschnitt, Böen und Windflaute in [Beaufort](https://en.wikipedia.org/wiki/Beaufort_scale)
- Taupunkt berechnet aus Temperatur und Luftfeuchtigkeit
- Die gefühlte Temperatur wird aus Temperatur, Luftfeuchtigkeit und durchschnittlichem Wind berechnet. Je nach Temperatur und Wind bzw. Temperatur oder Luftfeuchtigkeit wird entweder nur die Lufttemperatur angezeigt oder [der Windchill-](https://en.wikipedia.org/wiki/Wind_chill) Index bzw. [der Hitzeindex](https://en.wikipedia.org/wiki/Heat_index) berechnet.
- Niederschlagsmenge und -dauer sowie [Sonnenscheindauer](https://en.wikipedia.org/wiki/Sunshine_duration) (≥ 120 W/m²) werden für die aktuelle und die vergangene Stunde sowie für heute und gestern angegeben. Die Verwendung der Daten der vergangenen Stunde und von gestern ermöglicht die einfache Speicherung von Wertänderungen in einer Datenbank.
- Die Niederschlagsintensität wird nach folgender Skala angegeben: kein Niederschlag (0): 0 mm/Stunde; sehr leichter Niederschlag (1): > 0, < 0,25 mm/Stunde; leichter Niederschlag (2): ≥ 0,25, < 1,0 mm/Stunde; mäßiger Niederschlag (3): ≥ 1,0, < 4,0 mm/Stunde; starker Niederschlag (4): ≥ 4,0, < 16,0 mm/Stunde; sehr starker Niederschlag (5): ≥ 16,0, < 50 mm/Stunde; extremer Niederschlag (6): > 50,0 mm/Stunde
- Regen wird in precip\_evt auch als boolescher Zustand (wahr, falsch) angezeigt. Er wird auf wahr gesetzt, wenn ein Niederschlagsereignis empfangen wird und der Niederschlagswert >0 ist. Nach 3 Minuten wird er zurückgesetzt, wenn es nicht mehr regnet.
- Die Sonneneinstrahlung wird auch als boolescher Zustand angezeigt: wahr, wenn ≥ 120 W/m², und falsch, wenn < 120 W/m².
- Die Windrichtung wird in Himmelsrichtungen (NSWE) angegeben und aus der Windrichtung in Grad berechnet. Der Adapter bietet außerdem eine Auswahl nützlicher Minimal- und Maximalwerte für die Parameter von heute und gestern.
- sensor\_status als Text, um im Falle eines Fehlers leicht erkennen zu können, welcher Sensor oder welche Sensoren ausgefallen sind.
- Aus den sensor\_status-Bits wird der Energiemodus extrahiert (experimentell).

## Blitzdistanz

Das Protokoll sendet eine Blitzentfernung von 0, wenn kein Blitz detektiert wurde. Werte von 0 werden auf 999 geändert, um den Eindruck zu vermeiden, dass Blitze direkt über dem Beobachter einschlagen.

## Changelog

### 0.1.6
(womi) maintenance; Adapter requires node.js >= 22 now
### 0.1.5
(womi) maintenance;
### 0.1.4
(womi) updated to reflect latest requirements on dependencies, node.js, js-controller etc.
### 0.1.3 
(Scrounger) calculation of absolute humidity added
### 0.1.2
(womi) Update js-controller >3.0.0; checked compatibility with js-controller 4.0 
### 0.1.1
(womi) Fixed "invalid date" in timestamps 
### 0.1.0
(womi) Compatibility with Admin 5; Stable version

[Older changelogs can be found there](https://github.com/woessmich/ioBroker.weatherflow_udp/blob/master/CHANGELOG_OLD.md)

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

Copyright (c) 2026 womi <woessmich@gmail.com>