---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weathersense/README.md
title: ioBroker.weathersense
hash: KidM5Ba4LU29tLpPps9GkMP8pYa1nrPOuLUfmYmcTjY=
---
![Logo](../../../en/adapterref/iobroker.weathersense/admin/weathersense.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weathersense.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weathersense.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weathersense-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/weathersense-stable.svg)
![NPM](https://nodei.co/npm/iobroker.weathersense.png?downloads=true)

# IoBroker.weathersense
**Tests:** ![Test und Freigabe](https://github.com/ltspicer/ioBroker.weathersense/workflows/Test%20and%20Release/badge.svg)

## WeatherSense-Adapter für ioBroker
WeatherSense ist eine Cloud-Plattform für Wetterstationen. Dieser Adapter liest Daten vom WeatherSense-Server.

Siehe: https://play.google.com/store/apps/details?id=com.emax.weahter&hl=de_CH

Einige WLAN-Wetterstationen nutzen die WeatherSense Cloud.

Zum Beispiel diese WLAN-Wetterstationen von Ideoon (Pearl):

![Screenshot](https://github.com/ltspicer/WeatherSense/blob/main/wetterstation.png)

![Screenshot](https://github.com/ltspicer/WeatherSense/blob/main/casativo_ideoon_weatherstation.png)

## Verwenden:
Geben Sie einfach Ihre Anmeldedaten für Ihr WeatherSense-Konto ein (E-Mail-Adresse und Passwort).
Die Wetterstationsdaten werden im WeatherSense-Datenpunkt gespeichert.
Die Daten können auch per MQTT übertragen werden.

## Umgang mit mehreren Wetterstationen (Unterstützung mehrerer Instanzen)
Der ursprüngliche WeatherSense-Cloud-Server hat eine Software-Beschränkung/einen Software-Fehler: Wenn Sie zwei oder mehr identische Wetterstationen im selben Smartphone-Konto registrieren, werden diese überschrieben und verschwinden aus Ihrer Geräteliste.

Um Daten von mehreren Stationen gleichzeitig und konfliktfrei zu lesen, können Sie die native Multi-Instanz-Architektur von ioBroker nutzen.

### Schritt-für-Schritt-Einrichtung:
1. **Separate Cloud-Konten erstellen:** Registrieren Sie für **jede** Ihrer Wetterstationen ein eigenes, kostenloses Konto in der WeatherSense-Mobil-App (z. B. *E-Mail A* für Station 1 und *E-Mail B* für Station 2).
2. **Verknüpfen Sie eine Station pro Konto:** Verknüpfen Sie Ihre erste Station ausschließlich mit Konto A und Ihre zweite Station ausschließlich mit Konto B.
3. **Mehrere Instanzen in ioBroker hinzufügen:**
* Gehen Sie in ioBroker auf die Registerkarte `Instances` und fügen Sie eine zweite Instanz des WeatherSense-Adapters hinzu (dadurch werden `weathersense.0` und `weathersense.1` erstellt).
4. **Instanzen konfigurieren:**
* Öffnen Sie die Konfiguration für **`weathersense.0`** und geben Sie die Anmeldedaten für **Konto A** ein. Stellen Sie die `Sensor-ID` auf `1` ein.
* Öffnen Sie die Konfiguration für **`weathersense.1`** und geben Sie die Anmeldedaten für **Konto B** ein. Stellen Sie die `Sensor-ID` auf `2` ein.

### Vorteile dieser Konfiguration:
* **Keine Datenkonflikte:** ioBroker startet zwei völlig getrennte Prozesse.
* **Getrennte Objekte:** Ihre Datenpunkte sind übersichtlich in `weathersense.0.*` und `weathersense.1.*` getrennt.
* **Sauberes MQTT-Routing:** Wenn Sie die integrierte MQTT-Funktion verwenden, werden Ihre Themen sauber durch die Sensor-ID getrennt (z. B. `weathersense/1/...` und `weathersense/2/...`), wodurch verhindert wird, dass Daten auf Ihrem Broker überschrieben werden.

## Changelog
### 5.2.2 (2026-07-09)

- Typo corrected

### 5.2.1 (2026-07-09)

- Typo corrected

### 5.2.0 (2026-07-09)

- Invert PowerStatus flag added

### 5.1.1 (2026-07-05)

- Bugfix: Unit windDirection km/h → °

### 5.1.0 (2026-07-04)

- Now filenames of JSON files beginning with weathersense.{sensor_id}...

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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