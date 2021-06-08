---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: WDW3IjUe7KhQ2OQJWNA7w+d4L8Tuoh94bV8IPdkC0VM=
---
![Logo](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/baerengraben/iobroker.swiss-weather-api.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

# IoBroker.swiss-weather-api
#Beachtung!!!
**SRG hat seine API komplett neu aufgebaut. Die alte API (<= Adapterversion 0.3.2) wird NICHT mehr unterstützt. Ab Adapterversion 0.9.x wird die neue API der SRG verwendet. Deshalb muss eine neue SRG APP (zB Produkt "Freemium") erstellt werden (https://developer.srgssr.ch/apis/srf-weather). Siehe auch Readme, Kapitel "Erste Schritte" (unten). Bitte beachten Sie auch, dass die neue API auch komplett neue Objekte erstellt.**

**Die gute Nachricht ist, dass die neue API auch mehr Daten bereitstellt. ;)**

**Aktualisierungsverfahren**

Meine Empfehlung für das Update von 0.3.2 auf 0.9.x lautet also:

- Entfernen Sie den alten Adapter, bevor Sie Version 0.9.x installieren.
   - Bitte beachten Sie, dass auch die Datenobjekte entsprechend entfernt werden.
- Erstellen Sie eine neue Freemium-App auf dem srg-Entwicklerportal (https://developer.srgssr.ch/apis/srf-weather)
- neue Version 0.9.x installieren und Konfiguration mit neuem Consumerkey und Consumersecret einstellen
  - Beim Start erstellt der neue Adapter neue, andere Datenobjekte.

## Swiss-Wetter-Api-Adapter für ioBroker
Verbindet sich mit der großartigen SRF-Wetter-API (https://developer.srgssr.ch/apis/srf-weather).
Mit der SRF Weather REST API können Sie Wettervorhersagen und Berichte von mehr als 25.000 Orten in der ganzen Schweiz abrufen. Ein "Freemium"-Abonnement ermöglicht es Ihnen, 50 Anfragen/Tag zu erhalten.

#****Symbole**
Seit Version 0.1.8 bietet SRG-SSR eigene Icons. Jeder Datenpunkt liefert also eine URL zur entsprechenden Wetterlage (Farb-, Dunkel- und Lichtsymbole).

#***Bitte beachten Sie, dass dieser Adapter nur Standorte innerhalb der Schweiz unterstützt.**
### Einstieg
1. Holen Sie sich einen kostenlosen Account auf https://developer.srgssr.ch/
1. Gehen Sie zu „Meine Apps“ und erstellen Sie eine neue App. Hier können Sie ein Produkt auswählen. "Freemium" ist ihr kostenloses Produkt. Wenn Sie nur 50 Anfragen pro Tag (alle 30 Minuten) machen möchten oder/und nicht für mehr Anfragen pro Tag bezahlen möchten, ist "Freemium" die richtige Wahl. Dadurch wird nun ein spezifischer ConsumerKey und ConsumerSecret erstellt
1. Ermitteln Sie den Längengrad / Breitengrad (Dezimalgrad) des ausgewählten Standorts, für den eine Vorhersage benötigt wird. Diese Angaben sind optional, wenn Sie Ihren Standort in den ioBroker-Einstellungen (Haupteinstellungen) (über die Karte) festgelegt haben. In diesem Fall können Sie die Felder Breiten- und Längengrad leer lassen. Der Adapter übernimmt dann die Einstellungen des ioBrokers. Breiten- und Längengrad, die in der Adapterkonfiguration eingegeben wurden, überschreiben die ioBroker-Einstellungen.
1. Installieren Sie diesen Adapter auf ioBroker => Dies kann einige Minuten dauern (~7 Minuten auf einem Raspberry Pi 3)
1. Füllen Sie in der Adapterkonfiguration
   1. Name der App
   1. ConsumerKey der App
   1. Verbrauchergeheimnis der App
   1. Längengrad / Breitengrad des gewählten Schweizer Standorts, für den eine Vorhersage benötigt wird. => Bitte Dezimalgrad verwenden (zum Beispiel Zürich: 47.36667 / 8.5)
   1. Abfrageintervall in Minuten (Standardmäßig 30 Minuten - 50 Anfragen/Tag)

Die erste Abfrage erfolgt 10s nach dem Start des Adapters. Nach dem ersten Start wird die Abfrage regelmäßig entsprechend dem Konifugationsparameter (Poll Interval in Minutes) ausgeführt

### Visualisierungsbeispiel
###### Voraussetzung:
* Adapter [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Adapter [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Improt Views to Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Beispiel
![Tablette](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

## Changelog

### 0.9.3
* (baerengraben)  Function Update: Added day_name to identify weekday from "forecast.day.day0.day_name" to "forecast.day.day7.day_name". 
* (baerengraben)  Added last_run as Object on swiss-weather-api.0.info.lastrun.
* (baerengraben)  Added JsonChart Object on swiss-weather-api.0.forecast.60minutes.day(0-4).JsonChart.
* (baerengraben)  Added some Examples how to do visualisation (folder views) based on https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view 

### 0.9.2
* (baerengraben)  Function Update: The current weather information is provided as a forecast.current_hour object. Every hour this information is updated. This is done every hour by copying the corresponding values from forecast.60minutes.day0.<current_time>. So no new http request will be executed. The values are only copied from the forecast objects. This makes it easier to display the current weather in the visualization.

### 0.9.1
* (baerengraben)  Fix to reduce amount of Rest-Calls: https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/41
* (baerengraben)  Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/32 (Crashes when no Internet Connection is available)
* (baerengraben)  Partly Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/24: Handling Adapter State Info.


### 0.9.0
* (baerengraben)  Removed NodeJs 10 support and added NodeJs 16 support 
* (baerengraben)  Update to new SRF Weater API (https://developer.srgssr.ch/apis/srf-weather). Attention: Old Weather-API (Adapter Version 0.3.2 and earlier) will be decommissioned on Sept. 2021)
* (baerengraben)  Removed Icon-Support from https://erikflowers.github.io/weather-icons/ since SRF is providing their own icons.

### 0.3.2
* (baerengraben)  Fix for https://github.com/baerengraben/iobroker.swiss-weather-api/issues/13.

### 0.3.1
* (baerengraben)  Adapter-Config attributes longitude & latitude is optional now. If no longitude/latitude is set, the adpater is getting the longitude/latitude from ioBroker System-Attributes (https://github.com/baerengraben/iobroker.swiss-weather-api/issues/6).

### 0.3.0
* (baerengraben)  Change from Scheduled Adapter to Deamon Adapter(https://github.com/baerengraben/iobroker.swiss-weather-api/issues/11). The query interval is now configurable by parameter. The first query is made 10s after the adapter was started. Attention: For installing this version, please delete the older adapter version completely and install it again.

### 0.2.3
* (baerengraben) Update Dependencies

### 0.2.2
* (baerengraben) Some bug fixing
* (baerengraben) Enhancement https://github.com/baerengraben/iobroker.swiss-weather-api/issues/10

### 0.2.0
* (baerengraben) Updates in order to commit to iobroker stable

### 0.1.9
* (baerengraben) Dependency- and Vulnerabilites-Updates

### 0.1.8
* (baerengraben) Added Icons provided by SRGSSR => Thank you!! :)
* (baerengraben) Added new Object icon-url-srgssr => Contains the url-link to the srgssr Icon

### 0.1.7
**Attention**: If you have already installed a previous Version of swiss-weather-api (<= 0.1.6) please remove the adapter and install it completely new. This makes shure you get the new Unit-Names for "fff" and "ffx3" which where corrected by SRG. 
* (baerengraben) Added Icon-Codes -17 to -30 => These are not yet confirmed by srf - but I beleave these are correct.  
* (baerengraben) SRG is now providing the correct unit-names for "fff" and "ffx3". Adaptet this in the swiss-weather-adapter. **Attention**: You have to reinstall the swiss-weather-api (remove and install new Version) to make shure the Object-Name gets this Update.

### 0.1.6
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.5
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.4
* (baerengraben) Added Travis CI testing

### 0.1.3
* (baerengraben) Role-Definitions updated and added attribute 'icon-name'.

### 0.1.2
* (baerengraben) Some fixes.

### 0.1.0
* (baerengraben) Running version. Reads the complete weather forecast from https://api.srgssr.ch

### 0.0.2
* (baerengraben) first running version. Reads Current Forecast (https://api.srgssr.ch/forecasts/v1.0/weather/current)

### 0.0.1
* (baerengraben) initial release

## License
MIT License

Copyright (c) 2020 baerengraben <baerengraben@intelli.ch>

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