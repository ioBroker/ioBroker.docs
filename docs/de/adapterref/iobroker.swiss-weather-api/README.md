---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: tridX01kDnAnV9k/t6trvSQuEjopO3QGQYe9MP+WB34=
---
![Logo](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

# IoBroker.swiss-weather-api
**Update-Prozedur Version 1.0.1 auf 1.0.x**

- Aktualisieren Sie einfach in ioBroker. Keine besonderen zusätzlichen Schritte erforderlich

**Update-Prozedur Version 1.0.0 auf 1.0.1**

- Mit Version 1.0.1 behebe ich das Problem https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/57
- Basierend auf [dieser](https://forum.iobroker.net/topic/46975/vis-widgethintergrund-farbe-durch-objektdatenpunkt-steuern) Diskussion sind Doppelpunkte in IDs nicht erlaubt. Ich habe daher die Doppelpunkte, die für die Stunden verwendet wurden, ersatzlos entfernt und auch die Sekunden weggelassen. z.B. alt 01:00:00 => neu 0100)

Diese Änderung macht es erforderlich, IDs neu zu generieren. Um also Version 1.0.1 zu installieren, muss die derzeit laufende Adapterinstanz vollständig entfernt und durch eine neue Instanz ersetzt werden.

- Da sich mit Version 1.0.1 die IDs geändert haben, mussten auch die Visu-Ansichten angepasst werden. Sie können die aktualisierten Ansichten [hier](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views) abrufen und in die ioBroker-Visu importieren.

## Schweizer-Wetter-API-Adapter für ioBroker
Verbindet sich mit der großartigen SRF-Wetter-API (https://developer.srgssr.ch/apis/srf-weather).
Die SRF Weather REST API ermöglicht es Ihnen, Wettervorhersagen und -berichte von mehr als 25.000 Standorten in der ganzen Schweiz zu erhalten. Mit einem "Freemium"-Abonnement erhalten Sie 50 Anfragen/Tag.

##**Symbole**
Seit Version 0.1.8 stellt SRG-SSR eigene Icons zur Verfügung. Jeder Datenpunkt liefert also eine URL zur entsprechenden Wettersituation (Farb-, Dunkel- und Hell-Icons).

##**Bitte beachten Sie, dass dieser Adapter nur Standorte innerhalb der Schweiz unterstützt.**
### Einstieg
1. Holen Sie sich ein kostenloses Konto auf https://developer.srgssr.ch/
1. Gehen Sie zu „Meine Apps“ und erstellen Sie eine neue App. Hier können Sie ein Produkt auswählen. "Freemium" ist ihr kostenloses Produkt. Wenn Sie nur eine Vorhersage für einen Standort wünschen und nur 50 Anfragen pro Tag (alle 30 Minuten) erhalten oder/und nicht für mehr Anfragen pro Tag bezahlen möchten, ist „Freemium“ genau das Richtige für Sie. Dadurch werden nun ein bestimmter ConsumerKey und ein ConsumerSecret erstellt
1. Ermitteln Sie den Längengrad/Breitengrad (Dezimalgrad) des ausgewählten Standorts, für den eine Vorhersage erforderlich ist. Diese Angabe ist optional, wenn Sie Ihren Standort in den ioBroker-Einstellungen (Haupteinstellungen) (über die Karte) festgelegt haben. In diesem Fall können Sie die Breiten- und Längenfelder leer lassen. Der Adapter übernimmt dann die Einstellungen des ioBrokers. In der Adapterkonfiguration eingegebene Breiten- und Längengrade überschreiben die ioBroker-Einstellungen.
1. Installieren Sie diesen Adapter auf ioBroker => Dies kann einige Minuten dauern (~7min auf einem Raspberry Pi 3)
1. Füllen Sie die Adapterkonfiguration aus
   1. Name der App
   1. ConsumerKey der App
   1. Verbrauchergeheimnis der App
   1. Längengrad / Breitengrad des ausgewählten Schweizer Standorts, für den eine Vorhersage benötigt wird. => Bitte Dezimalgrad verwenden (z.B. Zürich: 47.36667 / 8.5)
   1. Abfrageintervall in Minuten (standardmäßig 30 Minuten – 50 Anfragen/Tag)

Die erste Abfrage erfolgt 10s nachdem der Adapter gestartet wurde. Nach dem ersten Start wird die Abfrage entsprechend dem Konfigurationsparameter (Poll Interval in Minutes) regelmäßig ausgeführt.
Die Objekte in „forecast.current_hour“ werden 30 Sekunden nach dem ersten Start erstellt und stündlich aktualisiert, indem die entsprechenden Werte aus „forecast.60minutes“ kopiert werden.

### Visualisierungsbeispiel
###### Voraussetzung:
* Adapter [Materialdesign-Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Adapter [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Ansichten in Vis importieren](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Beispiel
![Tablette](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

## Changelog

### 1.0.5
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/81
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/76 
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/75

### 1.0.4
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/85
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/82

### 1.0.3
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/67
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/66
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/52

### 1.0.2
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/51
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/53

### 1.0.1
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/57
This change makes it necessary to regenerate IDs. So, to install version 1.0.1, the currently running adapter instance must be completely removed and replaced with a new instance.

### 1.0.0
* (baerengraben) Bugfix https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/64  

### 0.9.9
* (baerengraben) Workaround for SRG Certificate Problem: https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/63  

### 0.9.8
* (jobe451)  Bugfix: JsonChart is missing 15h and 16h as x-labels

### 0.9.7
* (baerengraben)  Bugfix - RC2 for stable release.

### 0.9.6
* (baerengraben)  Bugfix - RC for stable release.

### 0.9.5
* (baerengraben)  Some small improvements

### 0.9.4
* (baerengraben)  Bugfix: https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/47 

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

Copyright (c) 2022 baerengraben <baerengraben@intelli.ch>