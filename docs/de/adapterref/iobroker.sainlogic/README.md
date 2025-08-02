---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: e4+rrm8uaFo9jxAnnikRymtzrB1vJicFveWkpv7f5Zo=
---
![Logo](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/sainlogic-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/sainlogic-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic-Adapter für ioBroker
Lesen Sie Daten von einer auf Sainlogic basierenden Wetterstation

## Unterstützte Geräte
Grundsätzlich meldet die Firmware jedes Geräts, das mit der Sainlogic-Hardware funktioniert, normalerweise „EasyWeather Vx.x.x)“.

Bekannte funktionierende Geräte:

1. ELV WS980Wifi
1. Eurochron EFWS2900 (nur Listener-Modus)
1. Froggit WH400SE
1. Froggit DP1500 (nur Ecowitt-Protokoll)
1. Sainlogic WS3500 (nur Listener-Modus)
1. WH51 Feuchtigkeitssensor
1. Ecowitt GW1000
1. Froggit WH3000SE (nur Listener-Modus)

## Verwendung
Der Adapter unterstützt zwei Modi zum Anzeigen der Daten Ihrer Wetterstation.

Im Listener-Modus unterstützt der Adapter zusätzliche Sensoren, sofern diese von Ihrer Wetterstation bereitgestellt werden. Derzeit werden Temperatur und Luftfeuchtigkeit unterstützt. Wenn Sie einen weiteren Sensor haben, erstellen Sie bitte ein GitHub-Problem und veröffentlichen Sie Ihren Datenstring, da mir dies hilft, die Funktionalität zu erweitern.

### Listener-Modus:
Mit den neuesten Firmware-Versionen unterstützt die Wetterstation das Senden von Daten an einen benutzerdefinierten Server. Der Adapter fungiert als solcher Server. Die Einrichtung erfolgt in zwei Schritten:

#### Wetterstation konfigurieren
Verwenden Sie die App „WS View“ auf Ihrem Mobilgerät, um die Wetterstation zu konfigurieren. Konfigurieren Sie die folgenden Einstellungen für benutzerdefinierte Servereinstellungen:

- Server: IP/Hostname Ihres IOBroker-Servers
- Pfad: beliebig, merken Sie ihn sich einfach für die Adapterkonfiguration

*Hinweis:* Bei manchen Stationen hat es sich bewährt, am Ende des Pfades ein Fragezeichen hinzuzufügen. Bei anderen funktioniert es ohne. Am besten ist, beides auszuprobieren.

- Port: eine beliebige Nummer zwischen 1024 und 65000 (Standard ist 45000), muss eindeutig und frei auf Ihrem IOBroker-System sein
- Stations-ID: nicht verwendet

*Hinweis:* Bei manchen Stationen muss noch ein beliebiger Wert festgelegt werden

- Stationsschlüssel: nicht verwendet

*Hinweis:* Bei manchen Stationen muss noch ein beliebiger Wert festgelegt werden

Protokolltyp: WeatherUnderground
- Upload-Intervall: alles, was von Ihrer Wetterstation unterstützt wird

#### Konfigurieren Sie den Listener
Wählen Sie in der Instanzkonfiguration die Registerkarte „Listener“ und stellen Sie Folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP Ihres IOBrokers, mit der sich die Wetterstation verbinden kann (Standard ist 0.0.0.0, um alle IPs zuzulassen). Dies ist vor allem dann relevant, wenn Sie mehrere Netzwerke haben, andernfalls reicht die Standardeinstellung aus.
- Port: Geben Sie den gleichen Port ein wie in der WS View App
- Pfad: Geben Sie den gleichen Pfad wie in der WS View App ein
- Weiterleitungs-URL: Wenn Sie die empfangenen Daten an einen anderen Verbraucher weiterleiten möchten, können Sie eine zusätzliche Adresse angeben. Beispielsweise können Sie Daten im WU-Format empfangen und diese dennoch an WeatherUnderground weiterleiten.

*Hinweis*: Die Weiterleitungs-URL muss mit einem Fragezeichen (?) enden. Beispiel: https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

Speichern.
Der Listener wird gestartet und wartet auf eingehende Verbindungen. Basierend auf Ihrem Intervall sollten Sie im Protokoll eine Meldung „Listener hat Update erhalten: ...“ mit den Daten sehen.

### Scheduler-Modus:
Wenn Ihre Wetterstation das Abrufen von Daten unterstützt, können Sie den Zeitplaner entsprechend konfigurieren. Das verwendete Protokoll basiert auf [WS980-Dokumentation](https://github.com/RrPt/WS980).

#### Konfigurieren Sie den Scheduler
Wählen Sie in der Instanzkonfiguration den Reiter ‚Scheduler‘ und stellen Sie folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP Ihrer Wetterstation. Achten Sie darauf, dass die IP fest ist und sich nicht ändert
- Port: Geben Sie den Port ein, mit dem die Verbindung hergestellt werden soll (Standard ist 45000).
- Intervall: Geben Sie ein Intervall in Sekunden ein (ich würde mindestens 10 Sekunden empfehlen, um das System oder Netzwerk nicht zu überlasten)

Speichern.

Der Planer startet und verbindet sich nach der ersten Intervallzeit mit der Wetterstation. Im Protokoll sollte eine Meldung wie „Planer sucht nach neuen Daten“ angezeigt werden. Wenn Sie den Protokollmodus auf Debuggen einstellen, werden auch die empfangenen Datenstrings angezeigt.

## Stationsspezifische Infos
### Froggit DP1500
Es scheint, dass diese Station keine Daten sendet, wenn WeatherUnderground als Protokoll ausgewählt ist. Mit Ecowitt funktioniert es einwandfrei.

### Eurochron EFWS290
Die Station antwortet nicht auf Scheduler-Befehle, daher wird nur der Listener-Modus unterstützt.

### Sainlogic WS3500
Die Station antwortet nicht auf Scheduler-Befehle, daher wird nur der Listener-Modus unterstützt.

## Credits
Dank geht an: lemuba, StrathCole, Glasfaser, Latzi: für das unermüdliche Testen meiner Bugs :) Lisa für ihr [Code zum Übersetzen von Windgraden in einer Überschrift](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.11.5 ECOWITT forwarding fixed

#### 0.11.4 Fix yearlyrain max value and mapping for CO2 sensors

#### 0.10.5 Bugfix for state initialization, removed log messages for forwarding

#### 0.10.4 Bugfix for lightning count, new battery states for additional sensors

#### 0.10.3 Bugfixes

#### 0.10.2 Bugfixes

#### 0.10.0 Added new sensors for Lightning, Piezo elements, DP250 and minor fixes

#### 0.8.2 Updated UVRaw to maxvalue 4000

#### 0.8.1 Bugfix for timestamp and listener

#### 0.8.0 Added time stamps for daily min and max values

#### 0.7.3 Dependency updates and Travis testing updates

#### 0.7.2 Dependency updates for security vulnerabilities 

#### 0.7.1 Fix Soilbatt mapping

#### 0.7.0 Support for Soil Moisture devices like attached to DP1500

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2024 Fogg <foggch@gmail.com>

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