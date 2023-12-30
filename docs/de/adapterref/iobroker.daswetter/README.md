---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter.
hash: SclekECAZk7zWde1J3Zn2lWDshugfnkuFsE+i/5n5xg=
---
![Logo](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![Anzahl der Installationen](http://iobroker.live/badges/daswetter-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daswetter.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.daswetter?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.daswetter?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.daswetter?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)

# IoBroker.DasWetter.
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.daswetter/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest Wettervorhersagedaten von DasWetter.com.

Sie benötigen ein Konto auf DasWetter.com. Registrieren Sie sich unter https://www.daswetter.com/api/#/login. Das Konto ist unter bestimmten Voraussetzungen kostenlos.

In Ihrem Konto finden Sie drei URLs für vier verschiedene Datenmodelle:

* Vorhersage für die nächsten 7 Tage und allgemeine Informationen zum Tag: Höchst- und Tiefsttemperatur, Wind (Symbol und Beschreibung), Tagessymbol und Wetterbedingungen
* detaillierte Informationen für 5 Tage und alle 3 Stunden: Die allgemeinen Tagesinformationen lauten wie folgt: Spitzenwerte, Tiefstwerte, Wind, Böen, Niederschlag, relative Luftfeuchtigkeit,

Luftdruck auf Meereshöhe, Schneegrenze, Sonnenaufgang und Sonnenuntergang, mondbezogene Daten, Ortszeit

* Vorschau mit detaillierten Daten stündlich (nur für die ersten 2 Tage, dann alle 3 Stunden)
* Vorhersage für 5 Tage und alle 3 Stunden (im JSON-Format)

Alle vier Modelle sind implementiert und es sollte mindestens eines verwendet werden.
In den Einstellungen muss eine URL wie http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx verwendet werden. Kopieren Sie einfach die vollständige URL aus Ihrem Konto.

## Hinweise
###-Symbole, die in vis verwendet werden
* Greifen Sie auf Symbole wie „http://ip:8082/adapter/daswetter/icons/tiempo-weather/galeria1/1.png“ zu.
* In Galerie6 liegen die Originalsymbole im SVG-Format vor. Die Vis-App hat möglicherweise Probleme bei der Visualisierung. Es stehen also konvertierte PNGs zur Verfügung. Verwenden Sie einfach die Option „PNG verwenden“
* In Galerie5 liegen die Originalsymbole im SVG- und PNG-Format vor. Daneben sind auch farbige und weiße Versionen erhältlich

### „aktuell“ in NextHours_Day1:
* DasWetter.com liefert keine echten aktuellen Wetterwerte
* Aber manchmal ist es hilfreich, die Vorhersage der aktuellen Stunde zur Verfügung zu haben
* Deshalb haben wir „aktuell“ hinzugefügt, was lediglich eine Kopie der zugehörigen prognostizierten Stundenwerte ist
* Bitte stellen Sie sicher, dass Sie den Adapter mindestens einmal pro Stunde anrufen, um sicherzustellen, dass „aktuell“ ordnungsgemäß aktualisiert wird
* siehe auch Github-Feature-Anfrage [issue24](https://github.com/rg-engineering/ioBroker.daswetter/issues/24)

### Pfad 4
* Momentan sendet DasWetter.com Daten, die von den eigenen Angaben abweichen.

Jetzt haben wir eine „automatische Reparatur“ implementiert, die die Struktur in eine dokumentierte Form ändert.

## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github](https://github.com/rg-engineering/ioBroker.daswetter/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.12 (2023-12-24)
* (René) see issue #217: additional log added to understand root cause, please copy&past log output into github issue

### 3.1.11 (2023-11-18)
* (René) update dependencies

### 3.1.10 (2023-07-30)
* (René) update dependencies

### 3.1.8 (2023-04-07)
* (René) update dependencies

### 3.1.7 (2023-01-31)
* (René) update dependencies

### 3.1.6 (2022-12-23)
* (René) see issue #153: package Axios downgraded

### 3.1.5 (2022-12-04)
* (René) update dependencies

### 3.1.4 (2022-08-19)
* (René) update dependencies
* (dipts) Added missing / corrected inappropriate icons for galeria 1

### 3.1.3 (2022-05-05)
* (René) see issue #139: bug fix moon icon

### 3.1.2 (2022-03-20)
* (René) see issue #130: bug fix json data

### 3.1.1 (2022-03-19)
* (René) bug fix UV index

### 3.1.0 (2022-03-19)
* (René) replace bent by axios
* (René) dependencies updated
* (René) see issue #128: add UV index

### 3.0.9 (2021-11-09)
* (René) dependencies updated
* (René) see issue #114: "connectionType" and "dataSource" fixed

### 3.0.8 (2021-09-22)
* (DutchmanNL) Warn messages for channels solved
* (DutchmanNL) Optimize log message at adapter termination
* (DutchmanNL) Ensure adapter will always handle data at start

### 3.0.7 (2021-05-03)
* (René) issue #91: remove warnings with js-controller 3.3.

### 3.0.5 (2021-03-21)
* (René) dependencies updated

### 3.0.4 (2020-10-16)
* (René) see issue #76: parse rain values as float instead integer

### 3.0.3 (2020-09-19)
* (René) see issue #66: parse numbers added

### 3.0.1 (2020-05-01)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"
* (René) "xml2js" replaced by "xml2json"
* (René) manual from DasWetter updated in folder \docs
* (René) see issue #39: create copy of data in hourly data path for next 1, 2, 3 or 6 hours (as an option)
* (René) copy for current can be disabled now

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory

### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License

MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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