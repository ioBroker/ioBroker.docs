---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: jPtaNA6EKvWyOxy9jK/GU68ShGaL+wPxaDC8dtKxgl8=
---
![Logo](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![Anzahl der Installationen](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![NPM-Version](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

# ioBroker.epson\_ecotank\_et\_2750

## EPSON EcoTank ET-2750-Adapter für ioBroker

Dieser Adapter liest den Tankfüllstand und weitere Informationen vom [EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750) aus und speichert sie in ioBroker.

[Der EPSON EcoTank ET-4750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) wird ebenfalls unterstützt (getestet von [Homoran](https://forum.iobroker.net/user/homoran) ).\
&#x20;[Der EPSON EcoTank ET-3750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) wird ebenfalls unterstützt (getestet von [christofkac](https://github.com/christofkac) ).\
&#x20;[Der EPSON EcoTank ET-2721](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) wird ebenfalls unterstützt (getestet von [mikepiko](https://github.com/mikepiko) ).\
&#x20;[EPSON WORKFORCE WF-3620DWF](https://www.epson.de/products/printers/inkjet-printers/for-home/workforce-wf-3620dwf) wird ebenfalls unterstützt (getestet von [HReimann](https://github.com/HReimann) ).

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o ( <https://github.com/o0Shojo0o> ) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## Wie man Probleme und Funktionswünsche meldet

Idealerweise verwenden Sie hierfür GitHub-Issues. Die beste Methode hierfür ist, den Adapter in den Debug-Log-Modus zu versetzen (Instanzen → Expertenmodus → Spaltenprotokollierungsstufe). Laden Sie anschließend die Logdatei von der Festplatte über das ioBroker-Unterverzeichnis „log“ herunter, **nicht** über die Administrationsoberfläche, da dort Zeilen abgeschnitten werden.

## Konfiguration

1. Erstellen Sie eine neue Instanz des Adapters.
2. Geben Sie die URL/IP-Adresse und den Port des EPSON EcoTank ET-2750 ein.
3. Konfigurieren Sie die Synchronisierungszeit (Standard: 10 Minuten).
4. Einstellungen speichern

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-03-06)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) **CI/CD**: Migrated to ESLint 9 with @iobroker/eslint-config

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.epson_ecotank_et_2750/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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


\*Dank an pix und rr0v1 für die Vorlage