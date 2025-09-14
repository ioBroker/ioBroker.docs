---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.brightsky/README.md
title: ioBroker.brightsky
hash: BDgJzNcxSrgPopj9xztOpvbO3YCm5DsCEGQRTVDNnWI=
---
![Logo](../../../en/adapterref/iobroker.brightsky/admin/brightsky.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.brightsky.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.brightsky.svg)
![Anzahl der Installationen](https://iobroker.live/badges/brightsky-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/brightsky-stable.svg)
![NPM](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)

# IoBroker.brightsky
**Tests:** ![Testen und Freigeben](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

# Brightsky-Adapter für ioBroker
## Was ist die Bright Sky API:
Die Bright Sky API ist eine kostenlose, öffentliche API, die Wetterdaten des Deutschen Wetterdienstes (DWD) bereitstellt. Sie wurde entwickelt, um den Zugriff auf diese Daten zu vereinfachen, da die ursprünglichen DWD-Daten oft in schwer interpretierbaren Formaten vorliegen. Bright Sky konvertiert diese Daten in ein benutzerfreundliches JSON-Format und macht sie über eine API zugänglich.

Hier ist eine ausführlichere Erklärung:

**Ziel:** Die Bright Sky API zielt darauf ab, Wetterdaten des Deutschen Wetterdienstes (DWD) für Entwickler und andere Interessierte leicht zugänglich zu machen.

**Datenquelle:** Die Daten stammen vom DWD und beinhalten Wetterbeobachtungen von Stationen und Wettervorhersagen, wie beispielsweise die MOSMIX-Modelle.

**Format:** Die Bright Sky API stellt die Daten im JSON-Format bereit, was die Integration in Anwendungen und Websites erleichtert.

**Zugriff:** Die API ist öffentlich und kann ohne API-Schlüssel verwendet werden, wodurch die Einstiegshürde niedrig bleibt.

**Open Source:** Das Projekt ist Open Source, d. h. der Quellcode ist öffentlich verfügbar und kann von der Community weiterentwickelt werden.

**Vorteile:** Die Bright Sky API bietet einen einfachen Weg, auf Wetterdaten zuzugreifen, die sonst schwer zu handhaben wären, und ist kostenlos, was sie für viele Projekte zu einer attraktiven Option macht.

---

## Welche Daten können im Vergleich zu anderen Adaptern verwendet werden?
Die aktuellen Wetterdaten werden zyklisch zweimal pro Stunde vom DWD aktualisiert. Dabei werden die Wetterdaten der nächstgelegenen DWD-Wetterstation berücksichtigt. Sollten keine Wetterwerte verfügbar sein, werden diese automatisch mit der zweit-, dritt- usw. entferntesten Wetterstation als Fallback ergänzt. Die Fallback-Daten zu den entsprechenden Wetterdaten finden Sie im Adapter.

Neben der hohen Datenqualität sind insbesondere die Solar- und Sonnendaten interessant:

<img width="1200" height="444" alt="Bild" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />

Da die Werte beispielsweise vom Datenpunkt `brightsky.0.current.solar_60` in kWh/m² angegeben werden und bereits als Energie pro 1h ausgedrückt werden, kann der Wert `multiplied by 1000` auch in W/m² ausgedrückt werden.

Beispiel für Globalstrahlung (W/m²) <img width="1200" height="224" alt="Bild" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />

---

## Adapter:
### Installation:
Im Gegensatz zu vielen anderen Adaptern ist kein Konto erforderlich.

Die Geokoordinaten für die Position können entweder direkt aus dem Browser oder aus ioBroker importiert werden. sind <img width="108" height="59" alt="Bild" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />

<img width="1096" height="803" alt="Bild" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />

### Die Objektstruktur:
Die Daten werden wie folgt bereitgestellt: <img width="183" height="156" alt="Bild" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />

* aktuell – das aktuelle Wetter (siehe auch: https://brightsky.dev/docs/#/operations/getCurrentWeather )
* täglich - die aktuelle Wettervorhersage für die nächsten 8 Tage (wird vom Adapter erstellt und ist nicht Teil der API)
* stündlich – die aktuelle Wettervorhersage für die nächsten definierten n Stunden (siehe auch: https://brightsky.dev/docs/#/operations/getWeather )

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2025-08-28)
* (ticaki) Create all folders

### 0.2.3 (2025-08-27)
* (ticaki) wind bearing text added
* (ticaki) update deps

### 0.2.2 (2025-08-22)
* (ticaki) Sunrise and sunset times added to the daily overview.

### 0.2.1 (2025-08-20)
* (ticaki) Startup log entry fixed.

### 0.2.0 (2025-08-20)
* (ticaki) DWD station ID added
* (ticaki) WMO station ID added
* (ticaki) Deactivation of data options added

### 0.1.1 (2025-08-19)
* (ticaki) Reduce required Nodej's version to 20

### 0.1.0 (2025-08-19)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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