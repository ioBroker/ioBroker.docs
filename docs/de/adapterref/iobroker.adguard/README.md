---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: LjuS7ZNH3yS1ivp9ZY52sadIaODeAdRlkmzLJwwRkeU=
---
![Logo](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.adguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/adguard-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/adguard-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![NPM](https://nodei.co/npm/iobroker.adguard.png?downloads=true)

# IoBroker.adguard
**Tests:** ![Testen und Freigeben](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

## AdGuard-Adapter für ioBroker
AdGuard Home ist ein netzwerkweiter DNS-Server, der Werbung und Tracker blockiert und über die Möglichkeit zur Kindersicherung (Blockierung von Inhalten für Erwachsene) verfügt. Mit dem AdGuard-Adapter können Sie Ihre AdGuard Home-Instanz in ioBroker steuern und überwachen.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o (https://github.com/o0Shojo0o) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## So melden Sie Probleme und Funktionsanfragen
Verwenden Sie hierfür idealerweise GitHub-Probleme. Die beste Methode erreichen Sie, indem Sie den Adapter in den Debug-Protokollmodus versetzen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über Admin, da dies Zeilen abschneiden würde.

## Konfiguration
1. Erstellen Sie eine neue Instanz des Adapters
2. Füllen Sie die URL/IP vom AdGuard-Server aus
3. Benutzername und Passwort konfigurieren
4. Speichern Sie die Einstellungen
5. Viel Spaß :)

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

### 0.0.8 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig

### 0.0.7 (2021-08-01)

-   (o0Shojo0o) better unload handling

### 0.0.6 (2021-08-01)

-   (o0Shojo0o) more resource-efficient handling of the States
-   (o0Shojo0o) better unload handling

## License

MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <info@bastelbunker.de>

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