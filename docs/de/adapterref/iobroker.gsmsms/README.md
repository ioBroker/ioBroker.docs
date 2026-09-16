---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: 7n0k9l6hbnksg6m3Md2eqLxfElKRHa+vYGqtnBG6OHc=
---
![Logo](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Anzahl der Installationen](https://iobroker.live/badges/gsmsms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Test und Freigabe](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# ioBroker.gsmsms

## GSMS-Adapter für ioBroker

SMS senden und empfangen mit GSM-Hardware.

## Hardware

Jegliche GSM-Hardware (Shield, Surfstick usw.), die an einen seriellen Port Ihres ioBroker-Geräts angeschlossen ist. GSM-Module/Sticks benötigen viel Strom. Bitte stellen Sie eine ausreichende Stromversorgung sicher.

Bei einigen Geräten muss der richtige Modus für die serielle Kommunikation eingestellt werden (siehe 'usb\_modeswitch').

## Einstellungen

### Port- und Verbindungseinstellungen

#### Pfad zur seriellen Schnittstelle - erforderlich.

z.B`/dev/ttyUSB0` oder`/dev/serial/by-id/xxxxxxxxxxx` (by-id ist stabiler, ttyUSBx kann sich bei einem Neustart ändern)

Manche Geräte verfügen über mehrere USB-Anschlüsse, daher müssen Sie diese möglicherweise ausprobieren. Der erste Anschluss funktioniert höchstwahrscheinlich, zeigt aber unter Umständen keine Benachrichtigungen über eingehende Nachrichten an. Versuchen Sie es dann mit einem anderen Anschluss und senden Sie eine SMS. Prüfen Sie, ob diese einige Sekunden später ankommt (bei Huawei ist dies beispielsweise der dritte Anschluss).

#### Ihre SIM-PIN

Wenn Ihre SIM-Karte durch eine PIN geschützt ist, geben Sie die PIN an. Diese wird während der Initialisierung zum Entsperren der SIM-Karte verwendet (leer bedeutet: „Es ist keine PIN auf der SIM-Karte vorhanden“).

<!--
#### Connection mode

##### Always open

Opens a modem connection as soon as the adapter is started. Incoming and outgoing SMS are delivered instantly. SMS arrived while the adapter is down will be delivered by the next adapter - startup (according to capacity of your SIM).

##### Retrieval interval

Outgoing SMS are sent instantly. Incoming SMS are retrieved periodically according to the specified interval. A modem connection is opened only for sending and retrieving SMS.

##### Send only

The adapter is only used to send SMS. All incoming SMS are ignored (possibly saved to SIM but not retrieved to the adapter).
-->

### GSM-Einstellungen

Um Speicherplatz auf der SIM-Karte zu sparen, werden alle SMS nach Zustellung/Lesen von der SIM-Karte gelöscht. Nutzen Sie beispielsweise den „Verlauf“-Adapter oder eine andere geeignete Lösung, um Ihre Nachrichten zu speichern.

| Name                                    | Typ             | Standard                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | --------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeige für eingehende SMS              | boolescher Wert | WAHR                      | Ermöglicht es dem Modem, über den Empfang einer neuen SMS zu informieren.                                                                                                                                                                                                                                                                                                                                                                    |
| Verkettung aktivieren                   | boolescher Wert | WAHR                      | Zusammengefasste Nachrichten werden als eine einzige Nachricht empfangen.                                                                                                                                                                                                                                                                                                                                                                    |
| Benutzerdefinierter Iinit-Befehl        | Zeichenkette    |                           | Falls Ihr Gerät einen benutzerdefinierten Initialisierungsbefehl benötigt, kann dieser angegeben werden und wird nach der PIN-Prüfung verwendet. Beispielsweise benötigen manche Geräte „AT+CPMS="SM","SM","SM"“, um den richtigen Speichersatz zu erhalten. Der Befehl sollte einen bestimmten Wert zurückgeben.`'OK'` (Leer bedeutet „kein benutzerdefinierter Befehl für init“). Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts. |
| CNMI bei geöffnetem/geschlossenem Modem | Zeichenkette    | '2,1,0,2,0' / '2,0,2,2,1' | Legt fest, ob Nachrichten auf der SIM-Karte gespeichert oder sofort zugestellt werden. Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts.                                                                                                                                                                                                                                                                                              |

<!--| Incoming call indication    | boolean | false                     | Receive `'onNewIncomingCall'` event when receiving calls.                                                                                                                 |-->                                                       

### SerialPort-Einstellungen

Bitte konsultieren Sie die Spezifikationen Ihres GMS-Geräts (Google hilft in den meisten Fällen weiter).

| Name      | Typ             | Standard | Beschreibung                                                           |
| --------- | --------------- | -------- | ---------------------------------------------------------------------- |
| Baudrate  | Nummer          | 19200    | Die Baudrate des Ports.                                                |
| Datenbits | Nummer          | 8        | Muss eine der folgenden Zahlen sein: 8, 7, 6 oder 5.                   |
| Stoppbits | Nummer          | 1        | Muss eine der folgenden sein: 1 oder 2.                                |
| Parität   | Zeichenkette    | "keiner" | Muss eines der folgenden sein: 'none', 'even', 'mark', 'odd', 'space'. |
| rtscts    | boolescher Wert | FALSCH   | Durchflussregelungseinstellung                                         |
| xon       | boolescher Wert | FALSCH   | Durchflussregelungseinstellung                                         |
| xoff      | boolescher Wert | FALSCH   | Durchflussregelungseinstellung                                         |
| xany      | boolescher Wert | FALSCH   | Durchflusssteuerungseinstellungen                                      |

### Weitere Einstellungen und Empfehlungen

#### Als Adapterobjekte anzugeben (`admin.x` )

- Ihr Name (Standardwert ist`ownNumber` Die maximale Länge beträgt 16 Zeichen.
- Ihre Telefonnummer.
- SMS-Betriebsmodus (`PDU` oder`SMS` ,`PDU` (ist die Standardeinstellung und empfohlen).

Alle Eingaben müssen mit ack=false erfolgen!

#### Posteingang/Postausgang – Verlauf

Durch Aktivieren des Verlaufsadapters für den`inbox.messageRaw` - Objekt und das`sendSMS.messageRaw` - Sie erhalten einen vollständigen Überblick über den Posteingang und Postausgang Ihres SMS-Verkehrs.

<!--
#### SMS - errors

When errors are returned and the error originated from the device (so the exchange with the device was technically successful), then in the error message, an error code should be listed, e.g. "+CMS ERROR: 500". The error message is displayed in the log on 'warn' - level and stored in the `info.error` object.
An (incomplete) list of possible error codes and their meanings can be found e.g. at <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Funktionalitäten

### SMS empfangen

Eingehende SMS werden geschrieben an`inbox.*` - Objekte.`inbox.messageRaw` kann als Auslöser für weitere Operationen verwendet werden (z. B. Weiterleitung eingehender SMS über den E-Mail-Adapter).

### SMS senden

Um eine SMS zu senden, füllen Sie bitte das Formular aus.`sendSMS.recipient, sendSMS.message` und optional`sendSMS.alert` und schieben`sendSMS.send` - Schaltfläche. Oder stellen Sie die`sendSMS.messageRaw` - Objekt mit einer Zeichenkette in folgender Form und ack=false:`{"recipient": "Number", "message":"Yourtext", "alert":"false"}` Die

Dieser Adapter bietet außerdem einen Kommunikationsblock für Blockly und SendTo-Funktionalitäten für andere Skripte (sendTo(" _gsmsms.InstanceNo_ ", "send", {text: ' _yourText_ ',recipient: ' _phonenumber_ ', alert: ' _false/true_ '});).

### AT+-Befehle ausführen

Bitte achten Sie darauf, was Sie beim Einstellen von AT+-Befehlen tun, da es sich um Ihre SIM-Karte bzw. Ihr Gerät handelt.

AT+-Befehle werden durch Einstellen gesendet`admin.atCommandSLR` im Format`AT+XXXXy` Sie können einen beliebigen Befehl senden, aber beachten Sie, dass Sie nur die letzte Zeile der Antwort sehen werden.

## Serialport-gsm

Dieser Adapter basiert auf dem [SerialPort-GSM-Plugin](https://github.com/zabsalahid/serialport-gsm) zur Kommunikation mit GSM-Modems, vorwiegend für SMS.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @forelleblau ( <https://github.com/forelleblau> ), der frühere Versionen dieses Adapters entwickelt hat, nicht möglich gewesen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.1.0 (2026-03-08)
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been update

### 1.0.0 (2024-11-23)
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization
- (mcm1957) Some issues reported by adapter checker have been fixed.
- (mcm1957) Dependencies have been update

### 0.0.6
- (forelleblau) jsonConfig.json, notifications-manager

### 0.0.5
- (forelleblau) bug fixed (adapter set "undefined" into state values)

### 0.0.4
- (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.gsmsms/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022-2023 forelleblau <mailto:marceladam@gmx.ch>

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