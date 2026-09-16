---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: nQL6rbpeWOIG0MuiEdkCJ+hu7hQ09GTHk/UcABT+dpA=
---
![Logo](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.adguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/adguard-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/adguard-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![NPM](https://nodei.co/npm/iobroker.adguard.png?downloads=true)
![Test und Freigabe](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

# ioBroker.adguard

## AdGuard-Adapter für ioBroker

AdGuard Home ist ein netzwerkweiter DNS-Server zum Blockieren von Werbung und Trackern mit Kindersicherungsfunktionen (Blockierung von Inhalten für Erwachsene). Mit dem AdGuard-Adapter können Sie Ihre AdGuard Home-Instanz in ioBroker steuern und überwachen.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o ( <https://github.com/o0Shojo0o> ) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## Wie man Probleme und Funktionswünsche meldet

Idealerweise verwenden Sie hierfür GitHub-Issues. Die beste Methode hierfür ist, den Adapter in den Debug-Log-Modus zu versetzen (Instanzen → Expertenmodus → Spaltenprotokollierungsstufe). Laden Sie anschließend die Logdatei von der Festplatte über das ioBroker-Unterverzeichnis „log“ herunter, **nicht** über die Administrationsoberfläche, da dort Zeilen abgeschnitten werden.

## Konfiguration

1. Erstellen Sie eine neue Instanz des Adapters.
2. Geben Sie die URL/IP-Adresse vom AdGuard-Server ein.
3. Benutzername und Passwort konfigurieren
4. Einstellungen speichern
5. Viel Spaß :)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated.

### 1.1.1 (2026-02-11)
- (mcm1957) Dependencies have been updated.

### 1.1.0 (2025-09-07)
- (mcm1957) Adapter requires admin >= 7.6.17, js-controller >= 6.0.11 and node.js >= 20 now.
- (mcm1957) Dependencies have been updated.

### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.adguard/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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