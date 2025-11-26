---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: 67o+aJjEudGiExjykFREHIFa7shtE8bz1qyIpNHHQq8=
---
![Logo](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Version (stabil)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.svg?data=d,s)

# IoBroker.stiebel-isg
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für STIEBEL ELTRON/Tecalor Internet Service Gateways (ISG)
Dieser Adapter liest Werte von den Webseiten der STIEBEL ELTRON/Tecalor Internet Service Gateways (ISG) und kann Befehle senden, um das Gerät zu steuern.

**HINWEIS:** Dieser Adapter wurde ausschließlich mit älteren ISG-Geräten (ISG Plus und ISG Web) getestet. Ob er mit dem aktuellen ISG Connect-Gerät kompatibel ist, muss noch ermittelt werden.

**HINWEIS:** Dieser Adapter wurde zur Wartung an iobroker-community-adapters übertragen. Zukünftig werden nur noch wichtige Fehlerbehebungen und Aktualisierungen von Abhängigkeiten veröffentlicht. Pull Requests mit Fehlerbehebungen oder Funktionserweiterungen sind jedoch jederzeit willkommen.

**Danksagung:** Dieser Adapter wäre ohne die großartige Arbeit von Michael Schuster (unltdnetworx) <https://github.com/unltdnetworx>, der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

## Versionshinweise
**Achtung:** Version 2.0.x enthält einige Änderungen, die die Kompatibilität beeinträchtigen könnten:

* node.js >= 20, js-controller >= 6.0.11 und admin >= 7.6.17 sind erforderlich

Aktualisieren Sie Ihren ioBroker mindestens auf diese Softwareversion, wenn Sie diesen Adapter verwenden möchten.

* Passwort- und Benutzernamenverschlüsselung in der Konfigurations-UI

Wenn Sie diesen Adapter von einer älteren Version aktualisieren, anstatt ihn neu zu installieren, startet er möglicherweise nicht, selbst wenn Ihr Passwort und Benutzername in der Konfiguration korrekt sind und nicht geändert wurden. Um dies zu beheben, geben Sie einfach dasselbe Passwort und denselben Benutzernamen erneut in der Konfigurationsoberfläche ein, speichern Sie die Einstellungen und schließen Sie die Oberfläche, um den Adapter neu zu starten. Dies ist selbstverständlich nur einmal nach dem ersten Start nach dem Update erforderlich.

* Der Typ und/oder der Name einiger Objekte im Objekt-Tab hat sich geändert

Wenn Sie diesen Adapter von einer älteren Version aktualisieren, anstatt ihn neu zu installieren, können Warnungen im ioBroker-Protokoll auftreten oder Objektwerte und/oder -namen werden möglicherweise nicht korrekt aktualisiert. Um dies zu verhindern, stoppen Sie den Adapter am einfachsten im Instanzen-Tab von ioBroker, löschen Sie die Objektstruktur im Objekt-Tab vollständig und starten Sie den Adapter anschließend neu. Dies ist jedoch nur einmal nach dem Update erforderlich und bei einer Neuinstallation nicht notwendig.

**ACHTUNG:** Durch das Löschen der Objektstruktur gehen alle benutzerdefinierten Einstellungen verloren, z. B. Verknüpfungen zu anderen Adaptern wie Verlauf oder Statistiken. Sie müssen diese manuell neu erstellen. Merken Sie sich daher unbedingt die Details der Einstellungen.

## Installation
1. Sie benötigen ein vollständig konfiguriertes und betriebsbereites STIEBEL ELTRON oder Tecalor Internet Service Gateway (ISG Web oder ISG Plus) im selben Netzwerk wie Ihr ioBroker-Server.
2. Installieren Sie den Adapter auf Ihrem ioBroker-Server und erstellen Sie eine Instanz.

## Konfiguration
1. Konfigurieren Sie die Instanz, indem Sie die IP-Adresse oder den Domänennamen des ISG eingeben und, falls im ISG konfiguriert, den Benutzernamen und das Passwort.
2. Die übrigen Einstellungen und die Liste der Webseiten des ISG auf der Registerkarte URLs können auf ihren Standardwerten belassen werden.
3. Sie können die Leistung verbessern und die Last auf dem ISG reduzieren, indem Sie alle Pfade aus dem URL-Tab entfernen, die in Ihrer ISG-Weboberfläche nicht vorhanden sind oder für Sie nicht relevant sind. Sie können die URLs leicht identifizieren, indem Sie die ISG SERVICEWELT-Webseite öffnen und die verschiedenen Navigations-Tabs nacheinander aufrufen. Die URL der jeweiligen Seite wird in Ihrem Browser angezeigt, z. B. ist <http://IP-von-Ihrem-ISG/?s=1,0> der Pfad zu INFO/ANLAGE.

## Rechtliche Hinweise
STIEBEL ELTRON, TECALOR, ISG und die zugehörigen Logos sind Marken oder eingetragene Marken der STIEBEL ELTRON GmbH & Co KG.

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

Die Autoren stehen in keinerlei Verbindung zu STIEBEL ELTRON GmbH & Co KG oder deren Tochtergesellschaften, Logos oder Marken und werden von diesen auch nicht unterstützt.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.2 (2025-11-23)

* (pdbjjens) **Fixed**: Adapter hangup on wrong credentials. (fixes #127)

### 2.0.1 (2025-11-12)

* (pdbjjens) **Fixed**: ioBroker warnings are avoided by clamping any values exceeding min/max to the min value before setting. (fixes #53 & #65)

### 2.0.0 (2025-10-27)

* (mcm1957) Change: Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Change: Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Fix: Dependencies have been updated
* (pdbjjens) Change: remove .npmignore
* (pdbjjens) Change: migrate adapter configuration to jsonConfig
* (pdbjjens) Change: migrate from deprecated "request" http client to native fetch API
* (pdbjjens) Fix: min/max handling

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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