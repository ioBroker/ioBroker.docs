---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-statistics
hash: bqsRHDuZ444Xh+//B61Oo5nYkZU2MtYV0jDI//VW7OM=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-statistics
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

## Coronavirus Live Statistics-Adapter für ioBroker
Adapter zur Anzeige globaler Coronavirus-Informationen und aktueller Berichte

Es ist keine Konfiguration erforderlich. Nach der Installation wird Folgendes angezeigt:

- Globale Informationen weltweit empfangen und in „global_totals“ schreiben
- Erstellen Sie für jedes Land einen Ordner mit allen relevanten Informationen zu COVID-19
- Aktualisieren Sie die Informationen alle 15 Minuten

Folgende Informationen stehen zur Verfügung:

| Datenpunkt | Einzelheiten |
|--|--|
| aktiv | Anzahl aktuell infizierter Personen |
| Fälle | Anzahl der insgesamt bekannten Fälle |
| FällePerEineMillion | Anzahl der insgesamt bekannten Fälle pro Million Einwohner |
| kritisch | Ausmaß der kritischen Situation (Krankenhauseinweisung) |
| Todesfälle | Anzahl der aktuell registrierten Todesfälle |
| TodesfällePerOneMillion | Anzahl der aktuell registrierten Todesfälle pro Million Einwohner |
| Flagge | Landesflagge, Link zum Github-Standort |
| wiederhergestellt | Anzahl der insgesamt bekannten wiederhergestellten Fälle |
| todayCases | Neue Fälle bis heute |
| todayDeaths | Anzahl der heute völlig bekannten Personen ist gestorben |
| testen | Gesamtzahl der weltweit durchgeführten COVID-19-Tests |
| Tests pro eine Million Landkreise | Gesamtzahl der weltweit durchgeführten COVID-19-Tests pro einer Million |

Bitte beachten Sie, dass dieser Adapter so viele aktuelle Informationen wie möglich verwendet. Abhängig vom Bericht des Landes kann es jedoch zu einer Verzögerung von mehreren Stunden kommen.

```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```

Allgemeine Quelle: https://coronavirus-19-api.herokuapp.com

## Erweiterte Einstellungen
| Option | Beschreibung |
|--|--|
| Alle Länder | Daten für alle Länder weltweit abrufen (Standard: false) |
| Kontinente | Gesamtbeträge nach einem Kontinent in einem separaten Bundesstaat gruppieren (Standard: false) |
| Unbenutzte Zustände löschen | Daten löschen, wenn Länder abgewählt sind (Standard: false) |

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) 
-->
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