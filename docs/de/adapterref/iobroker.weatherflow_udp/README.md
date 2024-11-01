---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow_udp/README.md
title: Wetterfluss UDP
hash: hGAfz3t2ag9lo6Hj4I4jq+P26RipTF5tObr5GWVrJwM=
---
![Logo](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Bekannte Schwachstellen](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Eingerichtet](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# Wetterflow UDP
## Versionen
## Weatherflow_udp-Adapter für ioBroker
Weatherflow UDP-Empfängeradapter zum Empfangen und Parsen von [UDP-Nachrichten](https://weatherflow.github.io/Tempest/api/udp/v143/) von [Weatherflow](www.weatherflow.com) intelligenten Wetterstationen wie [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Der Adapter sollte auch ältere Sender wie „Air“ und „Sky“ parsen können (das ist aber ungetestet).
Der Standardport, auf dem der Adapter lauscht, ist 50222, kann aber im Setup geändert werden.

## Einstellungen
Der Adapter bietet einen minimalen Satz von Einrichtungsoptionen.
Der Abhörport kann geändert werden, was jedoch nicht erforderlich sein sollte, da der Port, an den der Wetterstations-Hub sendet, meines Wissens nicht geändert werden kann.

Die Stationshöhe in Metern über dem Meeresspiegel wird verwendet, um den reduzierten Druck aus dem lokalen Druck zu berechnen, der von der Station angegeben wird. Verwenden Sie einfach die gleiche Höhe, die in der App eingegeben wurde. Je nach verwendeter Formel kann es zu kleinen Abweichungen im Vergleich zum reduzierten Druck in der App kommen. Der Adapter verwendet die Formel des Deutschen Wetterdienstes (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Wenn das Debug-Kontrollkästchen aktiviert ist, erstellt der Adapter eine Menge Ausgabe in der Protokolldatei. Sollte nur zum Debuggen verwendet werden.

## Daten und Zustände von weatherflow
Der Adapter stellt alle Parameter bereit, die über das UDP-Protokoll gesendet werden. Die Zustände befinden sich in einem Baum unter der Hub- und Stations-ID. <b>Achtung</b> : Beim Senden von Daten an Datenbanken zur Langzeitarchivierung sollten Aliase für die Zustände verwendet werden, damit die Serie nicht verloren geht, wenn eine Einheit ausgetauscht werden muss. Es gibt einige Unterschiede zu dem, was die Tempest-App bereitstellt, da die App die bereits verarbeiteten Daten von Weatherflow-Servern zurückbekommt. Bei ausreichender Batterieleistung werden die Daten „device_status“ und „obs_st“ jede Minute aktualisiert, „rapid_wind“ wird alle 3 Sekunden aktualisiert. „evt_precip“ und „evt_strike“ werden nur aktualisiert (und erstellt), wenn sie auftreten. „hub_status“ wird alle 10 Sekunden aktualisiert. Von der Station und dem Adapter berechnete Werte (siehe unten) werden nur erstellt, wenn sie empfangen werden oder zur Berechnung anstehen. Das bedeutet, dass es bis zu 24 Stunden dauern kann, bis alles angezeigt wird, außer Regenbeginn und Blitzeinschlagsereignisse, die Tage, Wochen oder Monate brauchen können, um zu erscheinen ;-)

## Vom Adapter berechnete Zustände
Zusätzlich zu den vom System bereitgestellten Daten berechnet der Adapter einige zusätzliche Daten, die alle den Namenszusatz „vom Adapter berechnet“ haben:

- Winddurchschnitt, Böen und Flaute in [Beaufort](https://en.wikipedia.org/wiki/Beaufort_Skala)
- Taupunkt berechnet aus Temperatur und Luftfeuchtigkeit
- gefühlte Temperatur, berechnet aus Temperatur, Luftfeuchtigkeit und durchschnittlichem Wind. Abhängig von Temperatur und Wind bzw. Temperatur oder Luftfeuchtigkeit wird entweder nur die Lufttemperatur angezeigt oder der [Windchill](https://en.wikipedia.org/wiki/Wind_chill) bzw. der [Hitzeindex](https://en.wikipedia.org/wiki/Hitzeindex) berechnet.
- Niederschlagsmenge und -dauer sowie [Sonnenscheindauer](https://en.wikipedia.org/wiki/Sonnenscheindauer) (>= 120 W/m2) werden für die aktuelle und vergangene Stunde sowie für heute und gestern angegeben. Die Verwendung der vorherigen Stunde und des gestrigen Tages ermöglicht die einfache Speicherung von Daten bei Änderungen der Werte in einer Datenbank.
- Die Niederschlagsintensität wird gemäß dieser Skala angegeben: keine (0): 0 mm/Stunde; sehr leicht (1): > 0, < 0,25 mm/Stunde; leicht (2): ≥ 0,25, < 1,0 mm/Stunde; mäßig (3): ≥ 1,0, < 4,0 mm/Stunde; stark (4): ≥ 4,0, < 16,0 mm/Stunde; sehr stark (5): ≥ 16,0, < 50 mm/Stunde; extrem (6): > 50,0 mm/Stunde
- Regen wird auch als boolescher Status (true, false) in precip_evt angezeigt. Es wird auf true gesetzt, wenn ein Niederschlagsereignis empfangen wird und der Niederschlagswert >0 ist. Nach 3 Minuten wird es zurückgesetzt, wenn es nicht mehr regnet
- Sonnenschein wird auch als Boolescher Zustand angezeigt: wahr, wenn >= 120 W/m2 und falsch, wenn weniger
- Windrichtung in Kardinalbuchstaben (NSWE), berechnet aus der Windrichtung in Grad.

Darüber hinaus bietet der Adapter eine Auswahl nützlicher Minimal- und Maximalwerte von Parametern für heute und gestern.

- sensor_status als Text, um in diesem Fall leicht zu erkennen, welcher/welche Sensor(en) ausgefallen ist/sind.
- Aus den Sensorstatus-Bits wird der Energiemodus extrahiert (experimentell)

## Blitzweite
Das Protokoll sendet eine Blitzentfernung von 0, wenn kein Blitz erkannt wurde. Werte von 0 werden auf 999 geändert, um den Eindruck zu vermeiden, dass der Blitz direkt über uns einschlägt.

## Changelog

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

Copyright (c) 2024 womi <woessmich@gmail.com>