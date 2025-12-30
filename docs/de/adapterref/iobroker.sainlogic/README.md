---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: ui5LKeSUWb8382OPMMp/VDeTS/H8fFlzezR8V3MHz0s=
---
![Logo](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/sainlogic-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sainlogic-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic Adapter für ioBroker
Lesen Sie Daten von einer sainlogic-basierten Wetterstation.

## Unterstützte Geräte
Im Prinzip meldet die Firmware jedes Gerät, das mit der Sainlogic-Hardware arbeitet, als „EasyWeather Vx.x.x)“.

Bekannte funktionierende Geräte:

1. ELV WS980Wifi
1. Eurochron EFWS2900 (nur Hörermodus)
1. Froggit WH400SE
1. Froggit DP1500 (nur Ecowitt-Protokoll)
1. Sainlogic WS3500 (nur Listener-Modus)
1. WH51 Feuchtigkeitssensor
1. Ecowitt GW1000
1. Froggit WH3000SE (nur im Listener-Modus)

## Verwendung
Der Adapter unterstützt zwei Modi zur Anzeige der Daten Ihrer Wetterstation.

Im Listener-Modus unterstützt der Adapter zusätzliche Sensoren Ihrer Wetterstation. Aktuell werden Temperatur und Luftfeuchtigkeit unterstützt. Falls Sie weitere Sensoren verwenden, erstellen Sie bitte ein GitHub-Issue und posten Sie Ihre Datenzeichenfolge. Dies hilft mir, die Funktionalität zu erweitern.

### Zuhörermodus:
Mit den neuesten Firmware-Versionen unterstützt die Wetterstation das Senden von Daten an einen benutzerdefinierten Server. Der Adapter fungiert dabei als solcher Server. Die Einrichtung erfordert zwei Schritte:

#### Wetterstation konfigurieren
Verwenden Sie die App „WS View“ auf Ihrem Mobilgerät, um die Wetterstation zu konfigurieren. Nehmen Sie die folgenden Einstellungen für benutzerdefinierte Servereinstellungen vor:

- Server: IP-Adresse/Hostname Ihres IOBroker-Servers
- Pfad: beliebig, merken Sie ihn sich einfach für die Adapterkonfiguration

Hinweis: Bei einigen Stationen hat sich das Hinzufügen eines Fragezeichens am Ende des Pfades bewährt. Andere funktionieren auch ohne. Am besten probieren Sie beides aus.

- Port: Beliebige Zahl zwischen 1024 und 65000 (Standardwert ist 45000), muss eindeutig und auf Ihrem IOBroker-System frei sein.
- Stationskennung: nicht verwendet

Hinweis: Bei einigen Stationen muss weiterhin ein Wert angegeben werden.

Stationsschlüssel: nicht verwendet

Hinweis: Bei einigen Stationen muss weiterhin ein Wert angegeben werden.

- Protokolltyp: WeatherUnderground
- Upload-Intervall: alles, was von Ihrer Wetterstation unterstützt wird.

#### Listener konfigurieren
Wählen Sie in der Instanzkonfiguration den Tab „Listener“ und stellen Sie Folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP-Adresse Ihres IOBrokers, mit der sich die Wetterstation verbinden soll (Standardwert ist 0.0.0.0, um alle IP-Adressen zuzulassen). Dies ist hauptsächlich relevant, wenn Sie mehrere Netzwerke verwenden; andernfalls ist der Standardwert ausreichend.
- Port: Geben Sie denselben Port wie in der WS View-App ein.
- Pfad: Geben Sie denselben Pfad wie in der WS View-App ein.
- Weiterleitungs-URL: Wenn Sie die empfangenen Daten an einen anderen Empfänger weiterleiten möchten, können Sie eine zusätzliche Adresse angeben. Beispielsweise können Sie Daten im WU-Format empfangen und diese dennoch an WeatherUnderground weiterleiten.

Hinweis: Die Weiterleitungs-URL muss mit einem abschließenden Fragezeichen (?) enden. Beispiel: https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

Speichern.
Der Listener startet und wartet auf eingehende Verbindungen. Entsprechend Ihrem Intervall sollte im Protokoll die Meldung „Listener erhielt Aktualisierung: ...“ mit den Daten erscheinen.

### Planungsmodus:
Wenn Ihre Wetterstation das Abrufen von Daten unterstützt, können Sie den Scheduler entsprechend konfigurieren. Das verwendete Protokoll basiert auf [WS980-Dokumentation](https://github.com/RrPt/WS980).

#### Konfigurieren Sie den Scheduler
Wählen Sie in der Instanzkonfiguration die Registerkarte „Scheduler“ und stellen Sie Folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP-Adresse Ihrer Wetterstation. Stellen Sie sicher, dass die IP-Adresse fest ist und sich nicht ändert.
- Port: Geben Sie den Port ein, zu dem die Verbindung hergestellt werden soll (Standard ist 45000)
- Intervall: Geben Sie ein Intervall in Sekunden ein (ich empfehle mindestens 10 Sekunden, um das System oder das Netzwerk nicht zu überlasten).

Speichern.

Der Scheduler startet und verbindet sich nach dem ersten Intervall mit der Wetterstation. Im Protokoll sollte eine Meldung wie „Scheduler ruft neue Daten ab“ erscheinen. Im Debug-Modus des Protokolls werden auch die empfangenen Datenstrings angezeigt.

## Stationsspezifische Informationen
### Froggit DP1500
Anscheinend sendet diese Station keine Daten, wenn WeatherUnderground als Protokoll ausgewählt ist. Mit Ecowitt funktioniert sie einwandfrei.

### Eurochron EFWS290
Die Station reagiert nicht auf Befehle des Programmplaners, daher wird nur der Zuhörermodus unterstützt.

### Sainlogic WS3500
Die Station reagiert nicht auf Befehle des Programmplaners, daher wird nur der Zuhörermodus unterstützt.

## Credits
Ein Dankeschön geht an: lemuba, StrathCole, Glasfaser, Latzi: für das unermüdliche Testen meiner Bugs :) Lisa für ihre [Code zur Umrechnung von Windgraden in einer Kurszeile](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2025-12-29)

Changed max values for distance sensore (#262)

### 1.1.0 (2025-12-24)

Added deploy job for release script
Changed to Admin UI to jsonConfig

### 1.0.17 (2025-12-23)

Updates for releasescript changelog logic

### 1.0.16

Typo in io-package.json

## License

MIT License

Copyright (c) 2025 Fogg <foggch@gmail.com>

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