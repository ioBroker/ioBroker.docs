---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: QCPPsp5PMI7rB5nvJLnERX/8HOpbjGMKGO2+2y9ruaw=
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
## Weatherflow_udp-Adapter für ioBroker
Weatherflow UDP-Empfängeradapter zum Empfangen und Parsen von [UDP-Nachrichten](https://weatherflow.github.io/Tempest/api/udp/v171/) von [Weatherflow](www.weatherflow.com) intelligenten Wetterstationen wie [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Der Adapter sollte auch ältere Sender wie „Air“ und „Sky“ verarbeiten können (dies ist jedoch ungetestet). Unterstützung für neue Hardware ab 2026 (zusätzliche, undokumentierte Nachrichtenfelder). Der Standardport des Adapters ist 50222, kann aber in den Einstellungen geändert werden.

## Einstellungen
Der Adapter bietet nur die nötigsten Konfigurationsmöglichkeiten. Der Empfangsport kann geändert werden, was aber meines Wissens nicht nötig sein sollte, da der vom Wetterstations-Hub verwendete Port nicht geändert werden kann.

Die Stationshöhe in Metern über dem Meeresspiegel dient zur Berechnung des reduzierten Luftdrucks aus dem von der Station angegebenen lokalen Luftdruck. Verwenden Sie einfach dieselbe Höhe wie in der App. Je nach verwendeter Formel können geringfügige Abweichungen zum reduzierten Luftdruck in der App auftreten. Der Adapter verwendet die Formel des Deutschen Wetterdienstes (DWD) (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Wenn das Debug-Kontrollkästchen aktiviert ist, erzeugt der Adapter viele Ausgaben in der Protokolldatei. Sollte nur zu Debugging-Zwecken verwendet werden.

## Daten und Zustände von weatherflow
Der Adapter stellt alle Parameter bereit, die über das UDP-Protokoll gesendet werden. Die Statuswerte sind in einer Baumstruktur unterhalb der Hub- und Stations-ID angeordnet. <b>Achtung</b> : Bei der Übertragung von Daten zur Langzeitarchivierung in Datenbanken sollten Aliase für die Statuswerte verwendet werden, um Datenreihenverlust bei einem Geräteaustausch zu vermeiden. Es gibt einige Unterschiede zur Tempest-App, da diese die bereits verarbeiteten Daten von den Weatherflow-Servern bezieht. Bei ausreichender Akkuleistung werden die Daten für „device_status“ und „obs_st“ minütlich aktualisiert, „rapid_wind“ alle 3 Sekunden. „evt_precip“ und „evt_strike“ werden nur bei ihrem Auftreten aktualisiert (und erstellt). „hub_status“ wird alle 10 Sekunden aktualisiert. Werte der Station und vom Adapter berechnete Werte (siehe unten) werden nur bei Empfang oder zur Berechnung erstellt. Daher kann es bis zu 24 Stunden dauern, bis alle Daten angezeigt werden, außer Regenbeginn und Blitzeinschlag, deren Anzeige Tage, Wochen oder Monate dauern kann.

## Vom Adapter berechnete Zustände
Zusätzlich zu den vom System bereitgestellten Daten berechnet der Adapter einige weitere Daten, die alle den Namenszusatz „adapter calculated“ tragen:

- Windmittelwert, Böen und Windstille in der Beaufort-Skala (https://en.wikipedia.org/wiki/Beaufort_scale)
- Taupunkt berechnet aus Temperatur und Luftfeuchtigkeit
Die gefühlte Temperatur wird aus Temperatur, Luftfeuchtigkeit und durchschnittlichem Wind berechnet. Je nach Temperatur und Wind bzw. Temperatur oder Luftfeuchtigkeit wird entweder nur die Lufttemperatur angezeigt oder der Windchill-Wert bzw. der Hitzeindex berechnet.
Niederschlagsmenge und -dauer sowie Sonnenscheindauer (≥ 120 W/m²) werden für die aktuelle und die vergangene Stunde sowie für heute und gestern angegeben. Die Verwendung der Daten der Vorstunde und von gestern ermöglicht die einfache Speicherung von Änderungen der Werte in einer Datenbank.
Die Niederschlagsintensität wird nach folgender Skala angegeben: kein Niederschlag (0): 0 mm/Stunde; sehr leichter Niederschlag (1): > 0, < 0,25 mm/Stunde; leichter Niederschlag (2): ≥ 0,25, < 1,0 mm/Stunde; mäßiger Niederschlag (3): ≥ 1,0, < 4,0 mm/Stunde; starker Niederschlag (4): ≥ 4,0, < 16,0 mm/Stunde; sehr starker Niederschlag (5): ≥ 16,0, < 50 mm/Stunde; extremer Niederschlag (6): > 50,0 mm/Stunde
Der Regenzustand wird in precip_evt auch als boolescher Wert (wahr, falsch) angezeigt. Er wird auf wahr gesetzt, wenn ein Niederschlagsereignis empfangen wird und der Niederschlagswert > 0 ist. Nach 3 Minuten wird er zurückgesetzt, falls es nicht mehr regnet.
Die Sonnenscheindauer wird auch als boolescher Wert angezeigt: „wahr“, wenn ≥ 120 W/m², und „falsch“, wenn < 120 W/m².
- Windrichtung in Kardinalbuchstaben (NSWE), berechnet aus der Windrichtung in Grad.

Darüber hinaus bietet der Adapter eine Auswahl nützlicher Minimal- und Maximalwerte für Parameter für heute und gestern.

- sensor_status als Text, um im Fehlerfall leicht erkennen zu können, welcher Sensor oder welche Sensoren ausgefallen sind.
- Aus den sensor_status-Bits wird der Energiemodus extrahiert (experimentell).

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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