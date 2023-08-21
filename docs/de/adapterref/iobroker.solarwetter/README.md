---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: iFiZKXxoTa8ilR4AJyMW3YZS4yNkcUfjQV+4FuxNpG8=
---
![Logo](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarwetter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![NPM](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
## Beschreibung / Beschreibung
:de: Dieser Adapter liefert den prognostizierten Solarstrom-Tagesertrag für eine bestimmte Region. Die Daten kommen von [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage.

:uk: Dieser Adapter liefert eine Prognose der täglichen Solarstrommenge für eine bestimmte Region vom Anbieter [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Übersetzen!!!!

##Einstellungen / Configuration
### Benutzer / Passwort
Seit 2022/03 ist die Authentifizierung beim Anbieter nicht mehr nötig.

Seit 2022/03 ist keine Authentifizierung mehr erforderlich.

### Standort / Location
Örtlichkeit durch Auswahl des Postleitzahlenbereichs bestimmt die Gesamtleistung der eigenen Solaranlage zur Berechnung der Energieerzeugung

Wählen Sie Ihre Region aus, indem Sie sie aus der Liste der Postleitzahlen auswählen.
Geben Sie die Leistung Ihrer Solaranlage ein, um den Energieertrag zu berechnen.

### Solaranlage / Solar plant
Hier kann die Gesamtleistung der eigenen Solaranlage zur Rechnung der voraussichtlich erzeugten Energiemenge eingegeben werden (auch Dezimalzahlen möglich).

Geben Sie die Gesamtleistung Ihrer Solaranlage ein, um die Tagesprognose für die Energieproduktion zu berechnen (Dezimaltrennzeichen möglich)

### 4-Tage-Prognose / 4-Tages-Vorhersage
Wählen Sie hier eine Stadt. Der Adapter erzeugt einen Link zu einem Chart mit der 4-Tage-Prognose (Datenpunkt `solarwetter.0.forecast.chart.__url__` ).

Wählen Sie eine Stadt aus, damit der Adapter eine Verbindung zu einem 4-Tages-Vorhersagediagramm (Datenpunkt `solarwetter.0.forecast.chart.__url__` ) erstellt.

![Alt-Text](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "Screenshot-Einstellungen")

## Aktivierung / Zeitplan
Der Adapter startet einmal täglich.

Der Adapter startet einmal täglich.

## Datenpunkte / Datapoints
`solarwetter.0.forecast.__clearSky__` (*Wert*)

`solarwetter.0.forecast.__realSky_min__` (*Wert*)

`solarwetter.0.forecast.__realSky_max__` (*Wert*)

`solarwetter.0.forecast.__Datum__` (*Zeichenfolge, kein Zeitstempel*)

`solarwetter.0.forecast.__Region__` (*Wert*)

`solarwetter.0.forecast.home.__clearSky__` (*Wert*)

`solarwetter.0.forecast.home.__realSky_min__` (*Wert*)

`solarwetter.0.forecast.home.__realSky_max__` (*Wert*)

`solarwetter.0.forecast.home.__Leistung__` (*Wert*)

`solarwetter.0.forecast.chart.__city__` (*Wert*)

`solarwetter.0.forecast.chart.__url__` (*Wert*)

<!-- ### **ARBEIT IN ARBEIT** -->

### 1.1.5 (15.08.2023)
* (Motuditli) Angepasst an Website-Änderungen – Entfernung der Authentifizierung
* (bluefox) Kompaktmodus und JSON-Konfiguration hinzugefügt

### 1.0.0 (15.10.2017)
* (pix) Ende der Beta, Node.js 4 oder höher erforderlich

### 0.3.0 (28.05.2017)
* (pix) Melden Sie sich mit Website-Passwort und Benutzernamen an

### 0.2.0 (05.01.2017)
* (pix) Travis CI-Tests hinzugefügt

### 0.1.2 (21.06.2016)
* (pix) Stadtauswahl korrigiert

### 0.1.1 (20.06.2016)
* (pix) 4-Tages-Prognosediagramm

### 0.1.0 (12.06.2016)
* (Bilder) auf npm veröffentlichen

### 0.0.6 (09.06.2016)
* (pix) Adapter.stop() behoben

### 0.0.5 (14.05.2016)
* (pix) Einstellungen zeigen jetzt den korrekten Standort an, wenn dieser bereits definiert ist

### 0.0.4 (13.05.2016)
* (pix) Darstellung des Einstellungsfensters

### 0.0.3 (13.05.2016)
* (pix) Berechnet die Leistung der eigenen Solaranlage

### 0.0.2 (13.05.2016)
* (Pixel) PLZ-Gebiet wählbar

### 0.0.1 (12.05.2016)
* (Bilder) erste Veröffentlichung

## Machen
* Übersetzung von Datenpunkten
* Russische Übersetzung eines Einstellungsfensters

## License

The MIT License (MIT)

Copyright (c) 2020-2023 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: