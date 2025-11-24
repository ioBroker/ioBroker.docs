---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: xR1QPMrQ+Bv56YAF9MwrCN66MyG1x3f06l2sY8PyQP0=
---
![Logo](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Gesamte Downloads](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Anforderungen an die Node-Version](https://img.shields.io/node/v/iobroker.eusec)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/eusec-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/eusec-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![NPM](https://nodei.co/npm/iobroker.eusec.png?downloads=true)

# IoBroker.euSec
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

Dies ist eine [ioBroker](https://www.iobroker.net)-Adapter, der den [eufy-security-client] verwendet](https://github.com/bropat/eufy-security-client) Bibliothek zur Kommunikation mit Eufy-Geräten.

Dieses Projekt steht in keiner Verbindung zu Anker und Eufy (Eufy Security). Es handelt sich um ein persönliches Projekt, das in der Freizeit betreut wird.

## Beschreibung
Dieser Adapter ermöglicht die Steuerung von [Eufy Sicherheitsgeräte](https://us.eufylife.com/collections/security) durch Verbindung mit den Eufy-Cloud-Servern und lokalen/Remote-Stationen.

Sie müssen Ihre Cloud-Anmeldedaten angeben. Der Adapter verbindet sich mit Ihrem Cloud-Konto und ruft alle Gerätedaten per HTTPS ab. Nun wird auch eine lokale oder Remote-P2P-Verbindung zu den Eufy-Stationen/Geräten unterstützt. Eine Verbindung zur Eufy Cloud ist jedoch immer Voraussetzung.

Eine Adapterinstanz zeigt alle Geräte eines Eufy Cloud-Kontos an und ermöglicht deren Steuerung.

## Dokumentation
Siehe die Dokumentation [Hier](https://iobroker-community-adapters.github.io/ioBroker.eusec/).

## Bekannte funktionierende Geräte
Informationen zu unterstützten Geräten finden Sie unter [Hier](https://github.com/bropat/eufy-security-client#known-working-devices).

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von Patrick Broetto (brobat) <https://github.com/bropat>, der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

## WICHTIGE Informationen zum Upgrade auf Node.js 22
Adapter 2.0.3 und neuer unterstützen Node.js 22. Ältere Node.js-Versionen erforderten eine spezielle Konfiguration, die mit Node.js 22 nicht mehr erforderlich ist. Gehen Sie daher beim Upgrade von einer Node.js-Version unter 22.x.x auf Node.js 22 wie folgt vor:

- Falls Sie node.js < 22 und adapter < 2.0.0 installiert haben, aktualisieren Sie bitte zuerst node.js und installieren Sie anschließend adapter 2.0.3.
Wenn Sie einen Adapter ab Version 2.0.0 mit einer Node-Version vor 22 installiert haben, müssen Sie den Adapter neu installieren. Eine detaillierte Beschreibung (auf Deutsch) finden Sie in unserem Forum (https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2025-10-26)
- (mcm1957) Remove fix for CVE-2023-46809 for node.js 22 and newer

### 2.0.0 (2025-10-26)

- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.3 (2024-09-28)

* (bropat) Updated version of the package eufy-security-client (3.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (3.1.1)

### 1.3.2 (2024-09-10)

* (bropat) Fixed issue #440

### 1.3.1 (2024-09-08)

* (bropat) Fixed issue #436
* (bropat) Fixed issue #439

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 bropat <patrick.broetto@gmail.com>

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