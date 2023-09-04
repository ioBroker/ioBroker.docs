---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: 08DpwOoVWwsSq0OicV4KNdP1ZymY3oIxILltcZt36vY=
---
![Logo](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![GitHub-Probleme](https://img.shields.io/github/issues/baerengraben/ioBroker.swiss-weather-api?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/baerengraben/ioBroker.swiss-weather-api/test-and-release.yml?branch=master&logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)

# IoBroker.swiss-weather-api
# Swiss-Weather-API-Adapter für ioBroker
Verbindet sich mit der großartigen SRF-Wetter-API – Version 2 (https://developer.srgssr.ch/api-catalog/srf-weather/srf-weather-description).
Mit der SRF Weather REST API können Sie Wettervorhersagen und -berichte von mehr als 25.000 Standorten in der ganzen Schweiz abrufen. Mit einem „Freemium“-Abonnement erhalten Sie 25 Anfragen/Tag.

## **Bitte beachten Sie:**
1. Dieser Adapter unterstützt nur Standorte innerhalb der Schweiz.
1. SRF Weather API V1 wird bis Adapter-Version 1.0.6 unterstützt. SRF Weather API V2 wird ab Version 2.0.0 unterstützt

## **Update-Vorgang Version 1.x.x auf 2.0.x**
- Entfernen Sie den Adapter (löschen Sie alle Adapter-Objekte in ioBroker!)
- Adapter komplett neu installieren => Neue Objekte werden generiert
- Da SRF die Pfadnamen geändert hat, müssen Sie Ihr Visu aktualisieren. Einfach [die Ansichten erneut importieren](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views).

## Erste Schritte
1. Holen Sie sich einen kostenlosen Account auf https://developer.srgssr.ch/
1. Gehen Sie zu „Apps“ und fügen Sie eine neue App hinzu. Hier können Sie ein API-Produkt auswählen. „SRF-MeteoProductFreemium“ ist ihr kostenloses Produkt. Wenn Sie nur eine Vorhersage für einen Standort wünschen und nur 25 Anfragen pro Tag (alle 60 Minuten) erhalten oder/und nicht für mehr Anfragen pro Tag bezahlen möchten, ist „SRF-MeteoProductFreemium“ genau das Richtige für Sie. Dadurch werden nun ein spezifischer ConsumerKey und ein ConsumerSecret erstellt
1. Finden Sie den Längen-/Breitengrad (Dezimalgrad) des ausgewählten Standorts heraus, für den eine Vorhersage erforderlich ist. Diese Angaben sind optional, wenn Sie Ihren Standort in den ioBroker-Einstellungen (Haupteinstellungen) (über die Karte) festgelegt haben. In diesem Fall können Sie die Felder für Breitengrad und Längengrad leer lassen. Der Adapter nutzt dann die Einstellungen des ioBrokers. Die in der Adapterkonfiguration eingegebenen Breiten- und Längengrade überschreiben die ioBroker-Einstellungen.
1. Installieren Sie diesen Adapter auf ioBroker => Dies kann mehrere Minuten dauern (~7 Minuten auf einem Raspberry Pi 3)
1. Füllen Sie das Feld „Adapterkonfiguration“ aus
   1. Name der App
   1. ConsumerKey der App
   1. ConsumerSecret der App
   1. Längen-/Breitengrad des ausgewählten Schweizer Standorts, für den eine Wettervorhersage benötigt wird. => Bitte verwenden Sie Dezimalgrade (zum Beispiel Zürich: 47.36667 / 8.5)
   1. Abfrageintervall in Minuten (standardmäßig 60 Minuten – 25 Anfragen/Tag)

Die erste Abfrage erfolgt 10s nach dem Start des Adapters. Nach dem ersten Start wird die Abfrage entsprechend dem Konfigurationsparameter (Poll Interval in Minutes) regelmäßig ausgeführt.
Die Objekte in Forecast.current_hour werden 30 Sekunden nach dem ersten Start erstellt und stündlich aktualisiert, indem die entsprechenden Werte aus Forecast.hours kopiert werden.

### Visualisierungsbeispiel
###### Voraussetzung:
* Adapter [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Adapter [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Ansichten nach Vis importieren](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Beispiel
Einfaches Beispiel: ![Tablette](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

Erweitertes Beispiel: ![Tablette](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim2.gif)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/102
* (baerengraben) Using ioBroker "formatDate" to format date_time attribut to "TT.MM.JJJJ SS:mm:ss"

### 2.0.4-alpha.0 (2023-08-03)
* (baerengraben) Adding four new hour-based Views 
* (baerengraben) JSON-Chart is now starting with 00:00 instead of 01:00 
* (baerengraben) SRF sometimes delivers more and sometimes less daily data. This can lead to old data in certain objects. To prevent this, I delete the entire object tree with each new call to rebuild it.

### 2.0.3 (2023-08-01)
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/94

### 2.0.2 (2023-07-31)
* (baerengraben) Just another freaking release-script test

### 2.0.1 (2023-07-31)
* (baerengraben) Just a release-script test

### 2.0.0 (2023-07-31) - Release for SRF Weather API Version 2!
* (baerengraben) Update SRF API version 1 to version 2 https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/94. With this Update new attributes are available: symbol24_code, DEWPOINT_C, RELHUM_PERCENT, FRESHSNOW_CM, PRESSURE_HPA, SUN_MIN, IRRADIANCE_WM2 and TTTFEEL_C

## License
MIT License

Copyright (c) 2023 baerengraben <baerengraben@intelli.ch>

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