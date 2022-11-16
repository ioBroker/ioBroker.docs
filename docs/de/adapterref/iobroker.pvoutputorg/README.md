---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: UNpMZ4dxO4O2ed9w5D8Dt+lCV+KvCWrvcLEo2dqbtiY=
---
![Logo](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![Anzahl der Installationen](http://iobroker.live/badges/pvoutputorg-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![NPM](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)

# IoBroker.pvoutputorg
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Der Adapter verbindet sich mit [PvOutput.org](https://pvoutput.org). System-ID und API-Schlüssel werden verwendet, um die Verbindung herzustellen. Beide müssen auf der Admin-Seite konfiguriert werden.
Aktuell werden die System-, Status- und Statistikdaten aller konfigurierten Systeme ausgelesen und in Datenpunkten angezeigt.
Die erzeugte Energie kann dauerhaft auf PvOutput.org hochgeladen werden.

Detaillierte Informationen finden Sie unter [pvoutput.org-Hilfe](https://pvoutput.org/help/overview.html)

Wenn Sie pvoutput.org mit einer Spende unterstützen, werden Ihnen zusätzliche Funktionen zur Verfügung gestellt. Momentan werden diese hier im Adapter noch nicht unterstützt.

# Download
Der Adapter lädt drei Arten von Daten herunter

* Systemdaten
* Statusdaten
* Statistische Daten

Zum Herunterladen von Daten führt der Adapter einen einstellbaren Cron-Job aus. Die Download-Frequenz kann auf der Admin-Seite mit "Intervall zum Lesen von Daten [min]" angepasst werden.
Der typische Wert für die Downloadhäufigkeit beträgt 15 Minuten, aber nicht mehr als 59 Minuten.

## Systemdaten
Der Adapter ruft Systemstatusinformationen und Live-Ausgangsdaten ab.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#id25)

## Statusdaten
Statusdaten (oder Live-Daten) umfassen alle möglichen Systemdaten, die für Ihr System verfügbar sind.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#id16)

## Statistische Daten
Der Adapter ruft Systemstatistikinformationen ab.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#id21)

# Hochladen
Der Datenupload ist nur eine Option. Wenn Sie Daten mit einer anderen Anwendung wie sbfspot hochladen, deaktivieren Sie den Upload hier im Adapter.

## Live-Daten hochladen
Zum Hochladen von Live-Daten / Statusdaten führt der Adapter einen einstellbaren Cron-Job aus. Die Upload-Frequenz kann auf der Admin-Seite mit "Intervall zum Schreiben von Daten [min]" angepasst werden.
Der typische Wert für die Upload-Frequenz beträgt 5 bis 15 Minuten, aber nicht mehr als 59 Minuten.

Der Adapter stellt viele Datenpunkte im "Upload"-Ordner für jedes System bereit. Es dürfen nur Strom- oder Energiedatenpunkte verwendet werden. Alle anderen sind optional.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#add-status-service)

### Leistungs- und Energieberechnung
Leistungs- und Energiewerte können voneinander abgeleitet werden. Wenn ein System nur Leistungswerte sendet, werden die entsprechenden Energiewerte automatisch berechnet.
Wenn nur Energiewerte gesendet werden, berechnet PVOutput die durchschnittliche Leistung.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Kumulierte Energie – Kumulatives Flag in der Systemkonfiguration
Die folgenden Werte gelten für das Cumulative Flag.
1 = Energieerzeugungs- und Energieverbrauchswerte sind Lebensdauerenergiewerte. Verbrauchs- und Erzeugungsenergie werden zu Tagesbeginn auf 0 zurückgesetzt.
2 - Nur die Energieerzeugung ist ein lebenslanger Energiewert.
3 - Nur der Energieverbrauch ist ein lebenslanger Energiewert.

Standard: 1

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Nettodaten - NetDataFlag in der Systemkonfiguration
Wenn der Parameter auf 1 gesetzt ist, zeigt dies an, dass die übergebenen Leistungswerte Netto-Export/-Import und nicht Brutto-Erzeugung/-Verbrauch sind.
Diese Option wird für Geräte verwendet, die keine Bruttoverbrauchsdaten melden können. Die bereitgestellten Import-/Exportdaten werden mit bestehenden Erzeugungsdaten zusammengeführt, um den Verbrauch abzuleiten.

Standard: deaktiviert

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#net-data)

## Tagesenddaten hochladen
Am Ende des Tages wird ein separater Upload-Befehl ausgeführt. Es können viele verschiedene Daten hochgeladen werden. Diese Daten stehen als Datapoint im Upload-Ordner jedes Systems zur Verfügung. Alle von ihnen sind optional.

mehr zu [API-Dokumentation](https://pvoutput.org/help/api_specification.html#add-output-service)

## Bekannte Probleme
* Bitte erstellen Sie Probleme unter [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

### 1.8.5 (2022-10-01)
* (René) bug fix wrong date

### 1.8.4 (2022-08-21)
* (René) bug fix WeatherConditions
* (René) bug fix EoD upload

### 1.8.0 (2022-08-20)
* (René) WeatherConditions can be used directly from DasWetter adapter 

### 1.7.0 (2022-07-17)
* (René) WeatherConditions for upload end of the day (EoD) data added
* (René) write-Interval selectable out of 5, 10 or 15 minutes according PVOutput.org-specification

### 1.6.1 (2022-07-06)
* (René) bug fix date string in write status and end of day data

### 1.6.0 (2022-07-01)
* (René) change back from cron to interval
* (René) end of day data are written 1 hour after sunset
* (René) read and write data only when daylight as an option 

### 1.5.0 (2022-04-21)
* (René) datapoint added to show when data uploaded to pvoutput.org

### 1.4.0 (2022-06-01)
* (René) changed to post requests

### 1.3.0 (2022-05-26)
* (René) Upload live data and end-of-day
* (René) better error handling when receiving errors from server
* (René) CumulativeFlag and NetDataFlag added for upload service

### 1.2.0 (2022-05-21)
* (René) IsActive per system added

### 1.1.0 (2022-05-20)
* (René) write data to PvOutput.org added
* (René) change to cron

### 1.0.0 (2022-04-29)
* (René) first official release

### 0.0.1 (2022-04-24)
* (René) initial release

## License
MIT License

Copyright (c) 2022 rg-engineering <info@rg-engineering.eu>

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