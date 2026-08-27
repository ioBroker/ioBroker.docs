---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-statistics
hash: U5uV2yyyJwGlb2da9/J8Xe4Io2R0+bAaoL5zRRPiWlI=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-statistics
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg) **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Coronavirus Live-Statistik-Adapter für ioBroker
Adapter zur Anzeige globaler Coronavirus-Informationen und aktueller Berichte

Es ist keine Konfiguration erforderlich, nach der Installation wird es:

- Weltweite Informationen empfangen und in "global_totals" schreiben
- Erstellen Sie für jedes Land einen Ordner mit allen relevanten Informationen zu COVID-19.
Aktualisieren Sie die Informationen alle 15 Minuten.

Folgende Informationen stehen zur Verfügung:

| Datenpunkt | Details |
|--|--|
| aktiv | Anzahl der aktuell Infizierten |
| Fälle | Anzahl der insgesamt bekannten Fälle |
| Fälle pro Million Einwohner | Anzahl der insgesamt bekannten Fälle pro Million Einwohner |
| kritisch | Ausmaß der kritischen Situation (Krankenhausaufenthalt) |
| Todesfälle | Anzahl der aktuell registrierten Todesfälle |
| Todesfälle pro Million Einwohner | Anzahl der aktuell registrierten Todesfälle pro Million Einwohner |
| Flagge | Länderflagge, Link zum GitHub-Repository |
| genesen | Anzahl der insgesamt bekannten Genesungsfälle |
| heutigeFälle | Neue Fälle von heute |
| Todesfälle heute | Anzahl der heute verstorbenen Personen |
| Test | Gesamtzahl der weltweit durchgeführten COVID-19-Tests |
| Tests pro eine Million Landkreise | Gesamtzahl der weltweit durchgeführten COVID-19-Tests pro eine Million Einwohner |

Bitte beachten Sie, dass dieser Adapter so viele aktuelle Informationen wie möglich verwendet, es jedoch je nach Länderbericht zu einer Verzögerung von mehreren Stunden kommen kann.

```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```

Allgemeine Quelle: https://coronavirus-19-api.herokuapp.com

## Erweiterte Einstellungen
| Option | Beschreibung |
|--|--|
| Alle Länder | Daten für alle Länder weltweit abrufen (Standard: false) |
| Kontinente | Gesamtbeträge nach Kontinent in separaten Bundesstaaten gruppieren (Standard: false) |
| Nicht verwendete Bundesstaaten löschen | Daten löschen, wenn Länder abgewählt werden (Standard: false) |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) Update axios to 1.x

### 0.9.0 (2023-11-16) - Remove unsupported APIs
* (DutchmanNL) Remove specific data regarding germany as APIs are not available anymore
* (DutchmanNL) Data source dedicated for https://coronavirus-19-api.herokuapp.com, we are unable to support more APIs due to changes, complexity and available development capacity. But please feel free to provide PR's!

### 0.8.8-0 (2021-11-19)
* (jlssmt) added hospital index for germany and federal states of germany

### 0.8.7 (2021-11-17)
* (DutchmanNL) Bugfix: Added missing definitions
* (jlssmt) Error handling for missing state attribute definitions Optimized

### 0.8.6 (2021-11-15)
* (Simatec) Design Fix for Admin >=5.1.28 Dark/Blue Theme

### 0.8.5 (2021-10-29)
* (jlssmt) Error handling for bundesländer api implemented

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023 DrozmotiX Holding B.V. <OSS@DrozmotiX.eu>

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