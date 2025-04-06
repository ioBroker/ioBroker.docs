---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.refoss/README.md
title: ioBroker.refoss
hash: /S2YN18I7T+TALTNErqkZo7V6ebGG/sR9F+bakWj+KQ=
---
![Logo](../../../en/adapterref/iobroker.refoss/admin/refoss.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.refoss.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/Refoss/ioBroker.refoss?logo=github&style=flat-square)
![Anzahl der Installationen](https://iobroker.live/badges/refoss-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.refoss.svg)

# IoBroker.refoss
Integrieren Sie Refoss-Geräte in ioBroker.
Weitere und detaillierte Informationen zum Gerät finden Sie hier: [Refoss](https://www.amazon.de/dp/B0D3PY4RVZ)

## Voraussetzungen
- Das Gerät muss zunächst mit dem lokalen Netzwerk verbunden werden. Es gibt zwei Möglichkeiten, Geräte mit dem lokalen Netzwerk zu verbinden:
- Verwenden Sie die Refoss-App (laden Sie die Refoss-App bei Google Play herunter und installieren Sie sie), um Geräte mit dem lokalen Netzwerk zu verbinden.
- Verwenden der Webseite zum Verbinden von Geräten mit dem lokalen Netzwerk.
- Der Computer/das Mobiltelefon ist mit dem werkseitigen WLAN des Geräts verbunden.
- Rufen Sie im Browser die Adresse 10.10.10.1 auf und wählen Sie dann das für die Gerätekonfiguration benötigte lokale WLAN aus.
- Die Integration belegt den Port: 9989.

## Unterstützte Gerätemodelle
| Modell | Version |
| --------------------------------- | --------- |
| Refoss Smart Energy Monitor, EM06 | >= v2.3.8 |

## Changelog

### 0.1.10 (2025-03-05)

- (zhaochuanling) revise the feedback content

### 0.1.7 (2025-02-07)

- (zhaochuanling) revise the feedback content

### 0.1.5 (2024-12-24)

- (zhaochuanling) fix detected errors

### 0.1.3 (2024-12-12)

- (zhaochuanling) first review

### 0.0.1 (2024-11-28)

- (zhaochuanling) first release

## License

MIT License

Copyright (c) 2025 zhaochuanling zhaochuanling8@gmail.com,
Bluefox dogafox@gmail.com and 
Refoss support@refoss.net

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