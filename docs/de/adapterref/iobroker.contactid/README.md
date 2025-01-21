---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: ef7bEhZLeiDsv/qf+MW61JRKcB4Wxlzl17KVOfvq2jE=
---
![Logo](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/contactid-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/contactid-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
**Tests:** ![Testen und Freigeben](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

Das Contact ID-Protokoll wird von Alarmsystemen zur Kommunikation mit Zentralstationen verwendet.

Dieser Adapter ist ein Contact ID Server. Wenn ein Alarmereignis ausgelöst wird, sendet das Alarmsystem über IP die Contact ID-Nachricht an die Zentrale.
Sie können ioBroker mit diesem Adapter als Zentrale verwenden. Beispielsweise können Sie bei einem Alarm per Contact ID eine Telegrammnachricht senden.

Die Contact-ID-Nachricht

SSSS 18QEEEGGZZZC

- SSSS – Teilnehmer. Diese vier Ziffern identifizieren das jeweilige Alarmsystem oder den Kunden gegenüber der Zentrale. ioBroker erlaubt längere Teilnehmernamen.

- 18 - Nachrichtentyp. Grundsätzlich sollte dieses Feld immer „18“ sein.
- Q – Event-Qualifikationsspiel.
- EEE – Ereigniscode.
- GG – Gruppen-/Partitionsnummer.
- ZZZ – Zonennummer (001 - 999). Dies ist die Nummer der Zone, die den Alarm ausgelöst hat.
- C – Prüfsumme.

[Kontakt-ID-Protokoll](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Installation und Konfiguration
1. Installieren Sie den Adapter
2. Konfiguration des Adapters:

Wählen Sie die IP-Adresse und den Port zum Abhören von Contact-ID-Anfragen.
Registrieren Sie Ihren Abonnentennamen, um Ihre Einbruchalarmmeldungen zu identifizieren, und wählen Sie Ihren Einbruchalarmtyp aus.

3. Konfigurieren Sie Ihr Einbruchmeldesystem so, dass es Kontakt-ID-Nachrichten sendet

Lupusec XT1:

Einstellungen -> Kontakt-ID: rptn://subcriber@ip-address-iobroker:port Beispiel: rptn://test@192.168.20.1:50000

Lupusec XT1+/XT2/XT2+/XT3/XT4:

Einstellungen -> Kontakt-ID: ip://subcriber@ip-address-iobroker:port/CID Beispiel: ip://test@192.168.20.1:50000/CID

4. Testen des Adapters

Öffnen Sie die Eingabeaufforderung und geben Sie ein

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Jetzt können Sie eine Conntact ID-Nachricht senden. Bei Lupsec-Einbruchmeldeanlagen beginnt und endet die Nachricht mit [ und ]. Geben Sie in Ihrer Telnet-Sitzung ein:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

Jetzt können Sie die Nachricht in den ioBroker-Objekten sehen

## Changelog

### **WORK IN PROGRESS**

- (Stübi) Fixed Notification from ioBroker Check and Service Bot (Issue #46)

### 2.0.0 (2025-01-18)

- (Stübi) Redesign of Contact ID Adapter.
- (Stübi) Wokring now with nodejs 20 and 22
- (Stübi) js-controller in version 6 and 7 will be supported (Issue #19, #28)
- (Stübi) nodejs 20 and nodejs 22 will be suported (Issue #20, #36)
- (Stübi) states moved to channel subscriber
- (Stübi) add Lupusec XT4 to list of alarm systems
- (Stübi) migration to eslint 9 (Issue #39)
- (Stübi) change admin configuration (Issue #38)
- (Stübi) fixed dependency ot iobroker adapter-core (Issue #37)
- (Stübi) fixed iobroker notifications (Issue 35)

### 1.0.2 (2020.12.13)

- (Stübi) Bugfixing, ACK-invalid Format - Issue #14
- (Stübi) Bugfixing, Issue #9

## License

MIT License

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de>

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