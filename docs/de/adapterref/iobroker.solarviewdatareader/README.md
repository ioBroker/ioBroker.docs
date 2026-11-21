---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: lCaDZJwB+9mUhMR6b2ZBuS/7TKRIWwTIGNIB9R5XeH8=
---
![Logo](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Test und Freigabe](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

# ioBroker.solarviewdatareader

## ioBroker SolarView Datenleser

Dieser Adapter liest Messdaten von einem SolarView-Datenlogger über dessen TCP-Schnittstelle aus. Informationen zu SolarView und kompatibler Hardware finden Sie auf der [SolarView-Website](https://www.solarview.info/solarlogger.aspx) .

Der Adapter verwendet eine unverschlüsselte TCP-Verbindung. SSL/TLS und Zertifikatsprüfung werden nicht unterstützt.

## Anforderungen

- Node.js 22 oder neuer
- ioBroker js-controller 6.0.11 oder neuer
- ioBroker Admin 7.6.20 oder neuer

## Konfiguration

### Verbindung

Geben Sie die IP-Adresse oder den Hostnamen des SolarView-Datenloggers und seinen TCP-Port ein. Der Standardport ist `15000` Die

### Abfrageintervall und Zeitfenster

Legen Sie fest, wie oft der Adapter Daten anfordert (10 bis 3600 Sekunden). Das Zeitfenster steuert die Abfrage von PV- und Wechselrichterdaten, einschließlich der D0-Versorgungsdaten, wenn der D0-Wechselrichter aktiviert ist. Eigenverbrauchsdaten und D0-Verbrauchsdaten werden auch außerhalb dieses Zeitfensters weiterhin abgefragt.

Für ein ganztägiges Zeitfenster verwenden Sie `00:00` Zu `23:59` Die

### Geräte

Aktivieren Sie auf der Registerkarte **„Geräte und CCU“** nur die in SolarView konfigurierten Geräte:

- **D0-Konverter** : erstellt `d0supply` Und `d0consumption` Daten.
- **Eigenverbrauchszähler** : Aktivieren Sie den Gesamtzähler und/oder die Zähler 1 bis 4.
- **Wechselrichter** : Wechselrichter 1 bis 4 einzeln aktivieren.

### Homematic CCU-Systemvariable

Aktivieren Sie **die Systemvariable CCU,** um die aktuelle PV-Leistung in eine Homematic-CCU-Systemvariable zu schreiben. Geben Sie dazu die zugehörige ioBroker-Status-ID ein, zum Beispiel: `hm-rega.0.12345` Die

## Staaten

Der Adapter erzeugt einen `pvig` Kanal für die gesamten PV-Daten. Je nach Konfiguration wird außerdem ein Kanal erstellt. `pvi1` Zu `pvi4`, `d0supply`, `d0consumption`, Und `scm0` Zu `scm4` Kanäle.

PV- und Wechselrichterkanäle bieten:

| Zustand   | Beschreibung         | Einheit |
| --------- | -------------------- | ------- |
| `current` | Aktuelle PV-Leistung | W       |
| `daily`   | Tagesertrag          | kWh     |
| `monthly` | Monatlicher Ertrag   | kWh     |
| `yearly`  | Jahresertrag         | kWh     |
| `total`   | Gesamtertrag         | kWh     |

Aktivierte Wechselrichterkanäle liefern außerdem Gleichspannung und Gleichstrom pro MPP-Tracker: `udc` /`idc`, `udcb` /`idcb`, `udcc` /`idcc`, Und `udcd` /`idcd` (V/A). Je nach SolarView-Protokollversion können auch Netzspannung und -strom pro Phase angegeben werden (`ul1` /`il1` Zu `ul3` /`il3`, V/A) und Wechselrichtertemperatur (`tkk`, °C).

Der `info` Der Kanal enthält den Verbindungsstatus (`info.connection`) und der Zeitstempel der letzten erfolgreichen Aktualisierung (`info.lastUpdate`).

## Changelog
### 1.3.0 (2026-10-26)
* (afuerhoff) legacy polling intervals are migrated from minutes to seconds
* (afuerhoff) socket error handling and connection status reporting improved
* (afuerhoff) configuration organized into tabs with improved validation and help texts
* (afuerhoff) configuration translations updated

### 1.2.6 (2026-09-13)
* (afuerhoff) dependencies updated
* (afuerhoff) issues detected by repository checker fixed [#289], [#305]

### 1.2.5 (2026-05-16)
* (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#246](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/246)
* (afuerhoff) license information updated

### 1.2.4 (2025-10-24)
* (afuerhoff) dependencies updated
* (afuerhoff) npm security changes
* (afuerhoff) repository checker warnings fixed

### 1.2.3 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker issues fixed
* (afuerhoff) typescript error fixed

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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