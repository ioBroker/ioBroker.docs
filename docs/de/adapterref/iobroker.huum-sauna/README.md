---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.huum-sauna/README.md
title: ioBroker.huum-Sauna
hash: ZtfvKGj2AxLNomQzQSstTax5oxI7QRdMv6XxaRy7S7Q=
---
![Logo](../../../en/adapterref/iobroker.huum-sauna/admin/huum-sauna.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.huum-sauna.svg)
![Anzahl der Installationen](https://iobroker.live/badges/huum-sauna-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.huum-sauna)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/huum-sauna-installed.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/chris-1965/ioBroker.huum-sauna/badge.svg)
![NPM](https://nodei.co/npm/iobroker.huum-sauna.png?downloads=true)

# IoBroker.huum-Sauna
Dieser Adapter integriert das Saunasteuergerät HUUM in iobroker.
Die Spezifikation von HUUM Devive für die Saunasteuerung finden Sie [hier](https://huum.de/)

## Parameter
- 1 + 2 Benutzeranmeldeinformationen für die HUUM-Webseite "https://api.huum.eu/action/home/"
- 3 Aktualisieren .. Aktualisieren, um HUUM-Daten vom Gerät zu laden
- 4 Lichtpfad.. Optionaler Lichtpfad (Zustand) zum Schalten von externem Licht. Wenn die leere HUUM-Wechselmethode verwendet wird
- 5 AstroLight .. Wenn eingestellt, wird das Licht bei Sonnenuntergang automatisch eingeschaltet (für Außensaunen).

## Anwendungsbeispiel
![Grafik](https://user-images.githubusercontent.com/56934142/150417838-425261da-a6c7-47b3-bf1b-2af6035ffd59.png)

## [Änderungsprotokoll](CHANGELOG.md)

## License
MIT License

"Copyright (c) 2022 Chris <besterquester@live.at>"
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