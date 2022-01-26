---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: yxgr2MEMcXFzQZVMqmC5+baOM6kYCy8UA0/+Jotrft4=
---
![Logo](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)

# Weatherflow-UDP
**Tests:**

## Weatherflow_udp-Adapter für ioBroker
Weatherflow UDP-Empfänger Adapter zum Empfangen und Parsen [UDP-Nachrichten](https://weatherflow.github.io/Tempest/api/udp/v143/) von [Weatherflow](www.weatherflow.com) intelligenten Wetterstationen wie [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Der Adapter sollte auch ältere Sender wie "Air" und "Sky" parsen können (dies ist jedoch ungetestet).
Der Standardport, auf dem der Adapter lauscht, ist 50222, kann aber im Setup geändert werden.

## Einstellungen
Der Adapter bietet ein Minimum an Setup-Optionen.
Der Abhörport kann geändert werden, was nicht erforderlich sein sollte, da der Port, den der Wetterstations-Hub sendet, meines Wissens nicht geändert werden kann.

Die Stationshöhe in Metern über dem Meeresspiegel wird verwendet, um den reduzierten Druck aus dem lokalen Druck zu berechnen, wie er von der Station bereitgestellt wird. Verwenden Sie einfach die gleiche Höhe wie in der App eingegeben. Je nach verwendeter Formel kann es zu kleinen Unterschieden zum reduzierten Druck in der App kommen. Der Adapter verwendet die Formel des Deutschen Wetterdienstes DWD (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Wenn das Kontrollkästchen Debug aktiviert ist, erstellt der Adapter viel Ausgabe in der Protokolldatei. Sollte nur zum Debuggen verwendet werden.

##Daten und Zustände von Weatherflow
Der Adapter stellt alle Parameter bereit, die über das UDP-Protokoll gesendet werden. Zustände befinden sich in einer Baumstruktur unter der Hub- und Stations-ID. <b>Achtung</b> : Beim Senden von Daten an Datenbanken zur Langzeitarchivierung sollten Aliase für die Zustände verwendet werden, um die Serie nicht zu verlieren, wenn eine Einheit ersetzt werden muss. Es gibt einige Unterschiede zu dem, was die Tempest-App bietet, da die App die bereits verarbeiteten Daten von den Weatherflow-Servern zurückholt. Bei ausreichender Batterieleistung, &quot;device_status&quot;- und &quot;obs_st&quot;-Daten und wird jede Minute aktualisiert, &quot;rapid_wind&quot; wird alle 3 Sekunden aktualisiert. &quot;evt_precip&quot; und &quot;evt_strike&quot; werden nur aktualisiert (und erstellt), wenn sie passieren. &quot;hub_status&quot; wird alle 10 Sekunden aktualisiert. Von der Station und dem Adapter berechnete Werte (siehe unten) werden erst bei Empfang oder zur Berechnung erstellt. Das bedeutet, dass es bis zu 24 Stunden dauern kann, um alles zu sehen, außer Regenbeginn und Blitzschlagereignissen, die Tage, Wochen, Monate dauern können ;-)

## Adapter berechnete Zustände
Zusätzlich zu den vom System bereitgestellten Daten berechnet der Adapter einige zusätzliche Daten, die alle als Namenszusatz „Adapter berechnet“ haben:

- Winddurchschnitt, Böen und Flaute in [beaufort](https://en.wikipedia.org/wiki/Beaufort_scale)
- Taupunkt berechnet aus Temperatur und Luftfeuchtigkeit
- fühlt sich an wie eine Temperatur, die aus Temperatur, Luftfeuchtigkeit und durchschnittlichem Wind berechnet wird. Je nach Temperatur und Wind bzw. Temperatur oder Luftfeuchtigkeit wird entweder nur die Lufttemperatur angezeigt oder [wind chill](https://en.wikipedia.org/wiki/Wind_chill) oder [heat index](https://en.wikipedia. org/wiki/Heat_index) berechnet.
- Niederschlagsmenge und -dauer sowie [Sonnenscheindauer](https://en.wikipedia.org/wiki/Sonnenscheindauer) (>= 120 W/m2) werden für die aktuelle und vergangene Stunde sowie für heute und gestern bereitgestellt. Die Verwendung von Vorherige Stunde und Gestern ermöglicht das einfache Speichern von Daten zu Änderungen der Werte in einer Datenbank.
- Die Niederschlagsintensität wird nach dieser Skala angegeben: keine(0): 0 mm / Stunde; sehr leicht(1): > 0, < 0,25 mm / Stunde; Licht (2): ≥ 0,25, < 1,0 mm / Stunde; moderat(3): ≥ 1,0, < 4,0 mm / Stunde; schwer(4): ≥ 4,0, < 16,0 mm / Stunde; sehr schwer(5): ≥ 16,0, < 50 mm/Stunde; Extrem(6): > 50,0 mm / Stunde
- Raining wird in precip_evt auch als boolescher Zustand (true, false) angezeigt. Es wird auf true gesetzt, wenn ein Niederschlagsereignis empfangen wird und wenn der Niederschlagswert >0 ist. Nach 3 Minuten wird es zurückgesetzt, wenn es nicht mehr regnet
- Sonnenschein wird auch als boolescher Zustand angezeigt true wenn >= 120 W/m2 und false wenn kleiner
- Windrichtung in Kardinalbuchstaben (NSWE) berechnet aus Windrichtung in Grad.

Außerdem bietet der Adapter eine Auswahl nützlicher Minimal- und Maximalwerte von Parametern für heute und gestern.

- sensor_status als Text, um in diesem Fall leicht zu erkennen, welche Sensoren ausgefallen sind.
- Aus sensor_status-Bits wird der Leistungsmodus extrahiert (experimentell)

## Blitzentfernung
Das Protokoll sendet eine Blitzdistanz von 0, wenn kein Blitz erkannt wurde. Werte von 0 werden auf 999 geändert, um den Eindruck zu vermeiden, dass Blitzeinschläge direkt über dem Kopf erfolgen.

## Changelog
### 0.1.1
(womi) Fixed "invalid date" in timestamps 
### 0.1.0
(womi) Compatibility with Admin 5; Stable version

## License
MIT License

Copyright (c) 2021 womi <woessmich@gmail.com>

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