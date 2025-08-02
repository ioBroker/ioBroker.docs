---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sia/README.md
title: ioBroker.sia
hash: GBpo+kdEerXIJ2oh5kHZ8uQNkP7cK6v6P0FKe4PAjX0=
---
![Logo](../../../en/adapterref/iobroker.sia/admin/sia.png)

![Travis CI Build-Status](https://travis-ci.org/schmupu/ioBroker.sia.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.sia?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/sia-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sia.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sia.svg)
![NPM](https://nodei.co/npm/iobroker.sia.png?downloads=true)

# IoBroker.sia
==================

Erfordert node.js 20.0 oder höher und Admin v5!

Das Protokoll SIA DC-09 wird von Alarmsystemen zur Kommunikation mit den Zentralen per SIA-DCS, *SIA-DCS, ADM-CID und *ADM-CID verwendet.

Dieser Adapter ist ein SIA-Server. Bei einem Alarm sendet das Alarmsystem die SIA-Nachricht über IP (TCP oder UDP) an die Zentrale.
Folgende ID-Token werden unterstützt:

- SIA-DCS (SIA DCS),
- \*SIA DCS (SIA DCS verschlüsselt),
- ADM-CID (Ademco-Kontakt-ID),
- \*ADM-CID (Ademco Contact ID verschlüsselt)

Bei Verwendung von *SIA DCS (SIA DCS verschlüsselt) oder *ADM-CID (Ademco Contact ID verschlüsselt) müssen Sie die AES-Verschlüsselung aktivieren und ein AES-Passwort im HEX-Format eingeben. Das AES-Passwort muss für AES-128 = 32 HEX-Zeichen, für AES-192 = 48 HEX-Zeichen und für AES-256 = 64 HEX-Zeichen lang sein.
Ein Beispielpasswort für AES-128 wäre: 3A1F6B8C9D4E7F20123456789ABCDEF0.

Mit diesem Adapter können Sie den ioBroker als Zentrale nutzen. So können Sie beispielsweise bei einem SIA-Alarm eine Telegrammnachricht über den ioBroker versenden.

[SIA DC-09-Protokoll](https://www.yumpu.com/en/document/view/47594214/dc-09-preparing-for-ansi-public-review-security-industry-)

## Installation und Konfiguration
1. Installieren Sie den Adapter
2. Konfiguration des Adapters:

Wählen Sie die IP-Adresse und den Port für die Überwachung von SIA-Anfragen.
![sia_adapter1](../../../en/adapterref/iobroker.sia/admin/sia_adapter1.png)

Registrieren Sie die Kontonummer. Bei Verwendung von AES müssen Sie ein Passwort (Schlüssel) eingeben. Der Schlüssel sollte 16, 24 oder 32 Zeichen (Byte) lang sein.
Ist die Checkbox „AES-Passwort im Hex-Format“ aktiviert, muss die Passwortlänge 32, 48 oder 64 Zeichen (Byte) betragen.
Im Feld „ACK-Timeout“ legen Sie fest, wie alt die Nachricht in Sekunden sein darf. Bei 0 Sekunden erfolgt keine Timeout-Validierung.
Mit der Checkbox „Verbindungsschließung durch SIA-Server“ können Sie festlegen, ob das Alarmsystem die Verbindung nach Erhalt der ACK-Nachricht schließen soll.
Ist die Checkbox „Verbindungsschließung durch SIA-Server“ deaktiviert, wartet der SIA-Server (ioBroker) 30 Sekunden, bis die Verbindung durch das Alarmsystem geschlossen wird.
Nach diesen 30 Sekunden schließt der SIA-Server (ioBroker) die Verbindung.

    ![sia_adapter2](../../../en/adapterref/iobroker.sia/admin/sia_adapter2.png)

3. Konfigurieren Sie Ihr Einbruchmeldesystem für den Versand von SIA-Nachrichten

    ![sia_lupusec1](../../../en/adapterref/iobroker.sia/admin/sia_lupusec1.png)

    - Lupusec XT1+/XT2/XT2+/XT3/XT4 (SIA-DCS):

Einstellungen -> Kontakt-ID: ip:/subcriber@ip-address-iobroker:port/SIA Beispiel: ip://A111F@192.168.20.55:55001/SIA

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (\*SIA-DCS) verschlüsselt:

Einstellungen -> Kontakt-ID: ip://subcriber@ip-address-iobroker:port/SIA/KEY/(128,196 oder 256 Bit Schlüssel in HEX) Beispiel: ip://A222F@192.168.20.55:55001/SIA/KEY/3A1F6B8C9D4E7F20123456789ABCDEF0

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (ADM-CID):

Einstellungen -> Kontakt-ID: ip://subcriber@ip-address-iobroker:port/SIA Beispiel: ip://A333F@192.168.20.55:55001/CID_SIA

- Lupusec XT1+/XT2/XT2+/XT3/XT4 (\*ADM-CID) verschlüsselt:

Einstellungen -> Kontakt-ID: ip://subcriber@ip-address-iobroker:port/CID_SIA/KEY/(128,196 oder 256 Bit Schlüssel in HEX) Beispiel: ip://A444F@192.168.20.55:55001/SIA/KEY/3A1F6B8C9D4E7F20123456789ABCDEF0

- Andere Alarmsysteme:

Der Adapter funktioniert mit allen Alarmsystemen, die SIA-DCS, *SIA-DCS, ADM-CID oder *ADM-CID unterstützen

4. SIA-Objekte / Zustände

Wenn Sie SIA-Nachrichten empfangen, sehen Sie diese im Statusbaum unter den Kanalkonten

    ![sia_adapter3](../../../en/adapterref/iobroker.sia/admin/sia_adapter3.png)

Sie sehen für jedes Konto folgendes Objekt:

| Objekt | Beschreibung |
    | ------------- | ------------------------------------------------------- |
| Kontonummer | Kontonummer (3-16 ASCII-Zeichen, "0"-"9", "A"-"F") |
| crc | CRC-Prüfsumme |
    | extdata | Erweiterte Daten (ACII-Daten) |
| id | ID-Token (Beispiel SIA-DCS) |
| lpref | Kontopräfix |
| msgdata | Nachrichtendaten und werden immer in ASCII dargestellt |
| rpref | Empfängernummer |
| Sequenz | Sequenznummer |
| ts | Zeitstempel (nur in verschlüsselten Nachrichten enthalten) |

Interessant ist das Objekt: msgdata (Nachrichtendaten). Hier sehen Sie das ausgelöste Ereignis der Alarmanlage. Wie das Ereignis zu interpretieren ist, müssen Sie Ihren Alarmanlagenhersteller fragen.

Ein Beispiel für Javascript in ioBroker, um ein Ereignis abzurufen:

```
// example message: A444F|1401 02 001
on({ id: 'sia.0.accounts.A444F.msgdata'/*A444F - Message Data*/ },  (obj) => {
    if(obj.state.ack === true) {
        const id = getState('sia.0.accounts.A444F.id'/*A444F - ID Token*/).val;
        if(id === 'ADM-CID' || id === '*ADM-CID') {
            const cid = parseMessage(obj.state.val);
            console.log(`Contact ID Message ${JSON.stringify(cid)}`);
            console.log(`Event: ${cid.event} for accountnumber ${cid.accountNumber}`);
        }
    }
});
```

    Ausgabe:

```
Contact ID Message {"accountNumber":"A444F","qualifier":"1","event":"401","area":"02","zone":"001"}
Event: 401 for accountnumber A444F
```

Ereignis 401 bedeutet „Fernaktivierung/-deaktivierung, wenn das System per SMS-Nachricht oder Webzugriff aktiviert oder deaktiviert wird“

5. Fehler / Probleme

Wenn Sie Probleme bei der Verarbeitung von SIA-Nachrichten haben oder einen Fehler gefunden haben, erstellen Sie bitte ein Problem. Das Problem sollte folgende Informationen enthalten:

1. Hersteller und Typ der Alarmanlage
2. Die SIA-Nachricht als Datei. Sie können eine Datei erstellen, wenn Sie dies in der Instanzkonfiguration aktivieren.
3. Wenn Sie eine Verschlüsselung (AES) verwenden, benötige ich den Schlüssel zum Entschlüsseln der Nachricht zum Testen.
4. Die Debug-Ausgabe von ioBroker bei der Verarbeitung der Nachricht
5. Detaillierte Beschreibung des Fehlers

Nachdem Sie die Punkte 2 und 3 abgeschlossen haben, ändern Sie bitte den AES-Schlüssel.
Sie können die gespeicherte SIA-Nachricht mit dem folgenden Befehl testen:

```
# cat fileanme_of_sia_message | nc ip_address_of_iobroker sia_port
cat /tmp/sia/sia_msg_20250201_202457309.txt | nc localhost 55001
```

## Changelog

### **WORK IN PROGRESS**

- (Stübi) Fixing @iobroker/adapter-dev 1.0.1 specified. 1.3.0 is required as minimum, 1.3.0 is recommended (Issue #48)
- (Stübi) Fixing dependency (Issue #49)

### 2.0.4 (2025-02-06)

- (Stübi) Fixed Issue Required SIA fields Missing (Issue #19)
- (Stübi) Fixed an error by reading the length of the message
- (Stübi) Fixed Issue Socket not kept connected (Issue #20)
- (Stübi) the crc and length will be shown as HEX ASCII (4 characters) in the object crc and len
- (Stübi) timestamp will be shown in format hh:mm:ss,MM-DD-YYYY (GMT time) in the object ts

### 2.0.3 (2025-02-01)

- (Stübi) add error envent if connction close
- (Stübi) add the proctocol ADM-CID and \*ADM-CID (Ademco Contact ID)
- (Stübi) add translations
- (Stübi) fix bugs by receiving messages by udp
- (Stübi) adjust readme

### 2.0.2 (2025-01-30)

- (Stübi) add: checking accountnumber for exact syntax
- (Stübi) add: checking admin interface aes entries

### 2.0.1 (2025-01-29)

- (Stübi) Redesign of Contact ID Adapter.
- (Stübi) Wokring now with nodejs 20 and 22
- (Stübi) js-controller in version 6 and 7 will be supported
- (Stübi) Ability to save SIA messages.

### 2.0.0 (2025-01-29)

- (Stübi) Major Release

### 1.0.4 (2019-11-17)

- (Stübi) Bugfixing, changing the time calculation for ACK and NACK messages
- (Stübi) Small improvements to the SIA protocol
- (Stübi) Changed bug in encrypting. Delete appending 8 \* 0x10
- (Stübi) Support of UDP. Same port listening as TCP
- (Stübi) Saving password encrypted.
- (Stübi) ACK and NAC calculation extended.
- (Stübi) CRC can be send in 0xABCD (2 Byte) or ABCD (4 Byte, ASCII) format. Automatic recognizing
- (Stübi) AES Password can be in AES-128-CBC, AES-192-CBC or AES-256-CBC
- (Stübi) AES Password can be saved in byte or hex (length 16, 24 or 32 byte) format or hex (length 32, 48 or 64 hex) format
- (Stübi) Timeout for ACK (0 = disable, 1 - n sec)
- (Stübi) Set ioBroker States of message on ACK not on NACK
- (Stübi) Support js-controller compact mode
- (Stübi) Update Adapter Core File
- (Stübi) Bugfxing (NAK) and AES support
- (Stübi) Translations
- (Stübi) Requires nodejs 6.0 or higher
- (Stübi) Cleanup
- (Stübi) SIA regex optimized
- (Stübi) bug fixing
- (Stübi) first implementation

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten <thorsten@stueben.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.