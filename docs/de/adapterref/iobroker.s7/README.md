---
BADGE-Number of Installations: http://iobroker.live/badges/s7-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.s7.svg
BADGE-Test and Release: https://github.com/ioBroker/iobroker.s7/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/s7/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.s7.svg
---
Der Siemens S7 Adapter basiert auf Snap7, wobei Snap7 bei der Erstinstallation des
S7 Adapters mitinstalliert wird und die eigentliche S7-Kommunikation zwischen ioBroker und der S7 über TCP/IP organisiert.

Es ist also notwendig, dass die S7 über eine Ethernet-Schnittstelle verfügt
(in der CPU integriert oder als separater CP) und über TCP/IP mit der Hardware kommunizieren kann, auf der ioBroker läuft.

Es wird vorausgesetzt, dass der Anwender über die notwendigen Kenntnisse zur TCP/IP-Kommunikation verfügt
und in der Lage ist, die S7 mittels Step7 entsprechend zu konfigurieren und zu programmieren.
Der geübte Umgang mit PC und verschiedenen Betriebssystem ist ebenfalls Voraussetzung.
Diese Anforderungen stellen sicherlich keine Herausforderung für jemanden dar,
der die Kommunikation zwischen ioBroker und einer S7 in Erwägung zieht.

### Installation
Unter Linux braucht man `make` Umgebung um die binaries zu bauen. Das kann man mit folgendem Kommando installieren:

```
sudo apt-get update
sudo apt-get install build-essential
```

Unter windows braucht man Visual Studio 2013 (Community Edition ist genug) oder später. Auch Python 2.7 (nicht 3.x) muss installiert werden.

## Zeitverschiebung
Sie können für S7TIME 4 Zeitversatzmodi verwenden:
- Lokal: der Zeitwert wird nicht geändert
- UTC: Ortszeit-Offset wird zur empfangenen Zeit hinzugefügt. Z.B. für Deutschland: -60 Minuten im Winter und -120 Minuten im Sommer.
- Offset setzen (Sommer/Winter verwenden): Der angegebene Offset in Minuten wird von der empfangenen Zeit abgezogen und im Sommer zusätzlich 60 Minuten.
- Offset einstellen (kein Sommer/Winter): Nur der angegebene Offset in Minuten wird von der empfangenen Zeit abgezogen. Egal ob im Winter oder im Sommer.

## S5TIME
S5 dekodiert wie hier beschrieben: http://www.plccenter.cn/Siemens_Step7/Format_des_Datentyps_S5TIME_Zeitdauer.htm

## Changelog
### 3.0.2 (2026-09-24)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Because of snap7 no Node 26 support

### 3.0.0 (2026-08-04)
* IMPORTANT: js-controller 5+ is required to install this version!
* IMPORTANT: Migrated to TypeScript and Vite for GUI

### 1.5.0 (2025-08-25)
* (Apollon77) Dependency updates
* (bluefox) GUI was moved to vite

### 1.4.4 (2025-08-16)
* (Apollon77) Ensures that the adapter works with node.js 22.x and 24.x
* (bluefox) Updated GUI packages

### 1.4.3 (2024-02-17)
* (Bettman66) Fix REAL number parsing error

## License
The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>,

Copyright (c) 2014-2016 smiling_Jack <steffen.schorling@googlemail.com>

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