---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: DJUocHZJ6dK/9ez/ELJZEYxWdAE6Ooed4DI/EEFo72A=
---
![Logo](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![Anzahl der Installationen](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![NPM-Version](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![NPM](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

# IoBroker.epson_ecotank_et_2750
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## EPSON EcoTank ET-2750-Adapter für ioBroker
Dieser Adapter liest den Tankfüllstand und andere Informationen von [EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750) und speichert sie im ioBroker.

[EPSON EcoTank ET-4750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) wird ebenfalls unterstützt (getestet von [Homoran](https://forum.iobroker.net/user/homoran)) [EPSON EcoTank ET-3750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) wird ebenfalls unterstützt (getestet von [christofkac](https://github.com/christofkac)) [EPSON EcoTank ET-2721](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) wird ebenfalls unterstützt (getestet von [mikepiko](https://github.com/mikepiko)) [EPSON WORKFORCE WF-3620DWF](https://www.epson.de/products/printers/inkjet-printers/for-home/workforce-wf-3620dwf) wird ebenfalls unterstützt (getestet von [HReimann](https://github.com/HReimann))

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o (https://github.com/o0Shojo0o) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## So melden Sie Probleme und Funktionsanfragen
Verwenden Sie hierfür idealerweise GitHub-Probleme. Die beste Methode erreichen Sie, indem Sie den Adapter in den Debug-Protokollmodus versetzen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über Admin, da dies Zeilen abschneiden würde.

## Konfiguration
1. Erstellen Sie eine neue Instanz des Adapters
2. Geben Sie die URL/IP und den Port des EPSON EcoTank ET-2750 ein
3. Konfigurieren Sie die Synchronisierungszeit (Standard: 10 Minuten)
4. Speichern Sie die Einstellungen

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.12 (2022-06-09)

-   (o0Shojo0o) fix ETIMEDOUT error

### 0.0.11 (2021-08-24)

-   (o0Shojo0o) fix name for Workforce 3620
-   (o0Shojo0o) fix firmware for Workforce 3620

### 0.0.10 (2021-08-19)

-   (o0Shojo0o) fix translation

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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

_Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140)._ :+1:

\*Dank an pix und rr0v1 für die Vorlage