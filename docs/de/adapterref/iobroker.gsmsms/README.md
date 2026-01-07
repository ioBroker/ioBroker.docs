---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: ykSSjcimEZZQZ7armAhD/4UGD7kCyj1GonMOufBqzs0=
---
![Logo](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Anzahl der Installationen](https://iobroker.live/badges/gsmsms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Test und Freigabe](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## Gsmsms-Adapter für ioBroker
SMS senden und empfangen mit GSM-Hardware.

## Hardware
Jegliche GSM-Hardware (Shield, Surfstick usw.), die an einen seriellen Port Ihres ioBroker-Geräts angeschlossen ist.
GSM-Module/Sticks benötigen viel Strom. Bitte stellen Sie eine ausreichende Stromversorgung sicher.

Bei einigen Geräten muss der richtige Modus für die serielle Kommunikation eingestellt werden (siehe 'usb_modeswitch').

## Einstellungen
### Port- und Verbindungseinstellungen
#### Pfad zur seriellen Schnittstelle - erforderlich.
z.B. `/dev/ttyUSB0` oder `/dev/serial/by-id/xxxxxxxxxxx` (die Verwendung von IDs ist stabiler, ttyUSBx kann sich nach einem Neustart ändern)

Manche Geräte verfügen über mehrere USB-Anschlüsse, daher müssen Sie diese möglicherweise ausprobieren. Der erste Anschluss funktioniert höchstwahrscheinlich, zeigt aber unter Umständen keine Benachrichtigungen über eingehende Nachrichten an. Versuchen Sie es dann mit einem anderen Anschluss und senden Sie eine SMS. Prüfen Sie, ob diese einige Sekunden später ankommt (bei Huawei ist dies beispielsweise der dritte Anschluss).

#### Ihre SIM-PIN
Wenn Ihre SIM-Karte durch eine PIN geschützt ist, geben Sie die PIN an. Diese wird während der Initialisierung zum Entsperren der SIM-Karte verwendet (leer bedeutet: „Es ist keine PIN auf der SIM-Karte vorhanden“).

<!--

#### Verbindungsmodus
##### Immer geöffnet
Stellt beim Einschalten des Adapters automatisch eine Modemverbindung her. Eingehende und ausgehende SMS werden sofort zugestellt. SMS, die während der Inaktivität des Adapters eingehen, werden vom nächsten Einschalten des Adapters zugestellt (abhängig von der Kapazität Ihrer SIM-Karte).

##### Abrufintervall
Ausgehende SMS werden sofort versendet. Eingehende SMS werden periodisch gemäß dem festgelegten Intervall abgerufen. Eine Modemverbindung wird ausschließlich zum Senden und Empfangen von SMS geöffnet.

##### Nur senden
Der Adapter dient ausschließlich zum Versenden von SMS. Alle eingehenden SMS werden ignoriert (möglicherweise auf der SIM-Karte gespeichert, aber nicht an den Adapter übertragen).

-->

### GSM-Einstellungen
Um Speicherplatz auf der SIM-Karte zu sparen, werden alle SMS nach Zustellung/Lesen von der SIM-Karte gelöscht. Nutzen Sie beispielsweise den „Verlauf“-Adapter oder eine andere geeignete Lösung, um Ihre Nachrichten zu speichern.

| Name | Typ | Standard | Beschreibung |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeige eingehender SMS | Boolescher Wert | wahr | Aktiviert die Benachrichtigung des Modems über den Empfang einer neuen SMS. |
| Verkettung aktivieren | Boolescher Wert | wahr | Verkettete Nachrichten als eine Nachricht empfangen. |
| Benutzerdefinierter Initialisierungsbefehl | Zeichenkette | | Falls Ihr Gerät einen benutzerdefinierten Initialisierungsbefehl benötigt, kann dieser angegeben werden und wird nach der PIN-Prüfung verwendet. Beispielsweise benötigen einige Geräte 'AT+CPMS="SM","SM","SM"', um den richtigen Speichersatz zu erhalten. Der Befehl sollte `'OK'` zurückgeben (leer, bedeutet „kein benutzerdefinierter Befehl für die Initialisierung“). Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts. |
| CNMI bei geöffnetem/geschlossenem Modem | Zeichenkette | '2,1,0,2,0' / '2,0,2,2,1' | Legt fest, ob Nachrichten auf der SIM-Karte gespeichert oder sofort zugestellt werden. Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts. |

<!--| Anzeige eingehender Anrufe | boolean | false | Empfange das Ereignis `'onNewIncomingCall'` beim Empfang von Anrufen. |-->

### SerialPort-Einstellungen
Bitte konsultieren Sie die Spezifikationen Ihres GMS-Geräts (Google hilft in den meisten Fällen weiter).

| Name | Typ | Standard | Beschreibung |
| -------- | ------- | ------- | ------------------------------------------------------- |
| Baudrate | Zahl | 19200 | Die Baudrate des Ports. |
| dataBits | number | 8 | Muss eine der folgenden Zahlen sein: 8, 7, 6 oder 5. |
| stopBits | Zahl | 1 | Muss entweder 1 oder 2 sein. |
| Parität | Zeichenkette | "keine" | Muss einer der folgenden Werte sein: 'keine', 'gerade', 'Marke', 'ungerade', 'Leerzeichen'. |
| rtscts | boolesch | falsch | Ablaufsteuerungseinstellung |
| xon | boolesch | falsch | Ablaufsteuerungseinstellung |
| xoff | boolesch | falsch | Flusssteuerungseinstellung |
| xany | boolean | false | Ablaufsteuerungseinstellungen |

### Weitere Einstellungen und Empfehlungen
#### Als Adapterobjekte anzugeben (`admin.x`)
- Ihr Name (Standardwert ist `ownNumber`), maximale Länge 16 Zeichen.
- Ihre Telefonnummer.
- SMS-Betriebsmodus (`PDU` oder `SMS`, `PDU` ist Standard und wird empfohlen).

Alle Eingaben müssen mit ack=false erfolgen!

#### Posteingang/Postausgang – Verlauf
Durch die Aktivierung des History-Adapters für das `inbox.messageRaw` - Objekt und das `sendSMS.messageRaw` - Objekt erhalten Sie einen vollständigen Posteingang und Postausgang Ihres SMS-Verkehrs.

<!--

#### SMS - Fehler
Wenn Fehler zurückgegeben werden und der Fehler vom Gerät stammt (der Datenaustausch mit dem Gerät war also technisch erfolgreich), sollte in der Fehlermeldung ein Fehlercode aufgeführt werden, z. B. „+CMS-FEHLER: 500“. Die Fehlermeldung wird im Protokoll auf Warnstufe angezeigt und im Objekt `info.error` gespeichert.

Eine (unvollständige) Liste möglicher Fehlercodes und ihrer Bedeutungen finden Sie beispielsweise unter <https://www.activexperts.com/sms-component/gsm-error-codes/>.

-->

## Funktionalitäten
### SMS empfangen
Eingehende SMS werden in die Objekte `inbox.*` geschrieben. `inbox.messageRaw` kann als Auslöser für weitere Operationen verwendet werden (z. B. Weiterleitung eingehender SMS über den E-Mail-Adapter).

### SMS senden
Um eine SMS zu senden, geben Sie `sendSMS.recipient, sendSMS.message` und optional `sendSMS.alert` ein und drücken Sie die Schaltfläche `sendSMS.send`. Alternativ können Sie das Objekt `sendSMS.messageRaw` mit einer Zeichenkette im folgenden Format und ack=false festlegen: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Dieser Adapter bietet außerdem einen Kommunikationsblock für Blockly und sendTo-Funktionalitäten für andere Skripte (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});).

### AT+-Befehle ausführen
Bitte achten Sie darauf, was Sie beim Einstellen von AT+-Befehlen tun, da es sich um Ihre SIM-Karte bzw. Ihr Gerät handelt.

AT+-Befehle werden gesendet, indem `admin.atCommandSLR` im Format `AT+XXXXy` gesetzt wird.
Sie können beliebige Befehle senden, beachten Sie jedoch, dass nur die letzte Zeile der Antwort angezeigt wird.

## Serialport-gsm
Dieser Adapter basiert auf dem [SerialPort-GSM-Plugin](https://github.com/zabsalahid/serialport-gsm) zur Kommunikation mit GSM-Modems, vorwiegend für SMS.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @forelleblau (https://github.com/forelleblau), der frühere Versionen dieses Adapters entwickelt hat, nicht möglich gewesen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

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

### 0.0.3
- (forelleblau) dependencies updated, bugs fixed

### 0.0.2
- (forelleblau) first published version

### 0.0.1
- (forelleblau) initial release

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