---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: 4OePWk7/C7Efli5jytPaWhasTCdJuILxZpyKT1Jicr0=
---
![Logo](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Anzahl der Installationen](https://iobroker.live/badges/gsmsms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Testen und Freigeben](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## GSMSMs-Adapter für ioBroker
Senden und Empfangen von SMS mit GSM-Hardware.

## Hardware
Jede GSM-Hardware (Shield, Surfstick etc.) wird an einen seriellen Port Ihres ioBroker-Gerätes angeschlossen.
GSM-Module/Sticks benötigen viel Strom. Bitte sorgen Sie für eine ausreichende Stromversorgung.

Bei manchen Geräten muss der richtige Modus für die serielle Kommunikation eingestellt werden (siehe „usb_modeswitch“).

## Einstellungen
### Port- und Verbindungseinstellungen
#### Pfad zum seriellen Port – erforderlich.
zB `/dev/ttyUSB0` oder `/dev/serial/by-id/xxxxxxxxxxx` (by-id ist stabiler, ttyUSBx kann sich bei einem Neustart ändern)

Einige Geräte verfügen über mehrere USB-Anschlüsse, daher müssen Sie möglicherweise einige ausprobieren. Höchstwahrscheinlich funktioniert der „erste“ Anschluss, liefert aber möglicherweise keine „Benachrichtigungen über eingehende Nachrichten“. Dann können Sie den anderen ausprobieren und eine SMS senden und sehen, ob sie einige Sekunden später empfangen wird (bei einem Huawei ist dies beispielsweise der dritte Anschluss).

#### Ihre SIM-PIN
Wenn Ihre SIM-Karte durch eine PIN geschützt ist, geben Sie die PIN ein und sie wird zum Entsperren der SIM-Karte bei der Initialisierung verwendet (leer, bedeutet „keine PIN auf der SIM-Karte vorhanden“).

<!--

#### Verbindungsmodus
##### Immer geöffnet
Öffnet eine Modemverbindung, sobald der Adapter gestartet wird. Eingehende und ausgehende SMS werden sofort zugestellt. SMS, die bei ausgeschaltetem Adapter eingehen, werden vom nächsten Adapter-Start zugestellt (je nach Kapazität Ihrer SIM).

##### Abrufintervall
Ausgehende SMS werden sofort versendet. Eingehende SMS werden periodisch im angegebenen Intervall abgerufen. Eine Modemverbindung wird nur zum Senden und Abrufen von SMS geöffnet.

##### Nur senden
Der Adapter dient nur zum Versenden von SMS. Alle eingehenden SMS werden ignoriert (ggf. auf der SIM gespeichert, aber nicht vom Adapter abgerufen).
-->

### GSM-Einstellungen
Damit der SIM-Speicher nicht erschöpft wird, werden alle SMS nach der Zustellung/dem Lesen von der SIM-Karte gelöscht. Verwenden Sie beispielsweise den „Verlauf“-Adapter zum Speichern Ihrer Nachrichten oder eine andere praktische Lösung.

| Name | Typ | Standard | Beschreibung |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeige eingehender SMS | Boolean | True | Ermöglicht dem Modem, zu melden, dass eine neue SMS-Nachricht empfangen wurde. |
| Verkettung aktivieren | Boolesch | True | Verkettete Nachrichten als eine empfangen. |
| Benutzerdefinierter Iinit-Befehl | Zeichenfolge | | Wenn Ihr Gerät einen benutzerdefinierten Initialisierungsbefehl benötigt, kann dieser bereitgestellt werden und wird nach der PIN-Prüfung verwendet. Einige Geräte benötigen beispielsweise „AT+CPMS="SM","SM","SM"", um den richtigen Speichersatz zu erhalten. Der Befehl soll `'OK'` zurückgeben (leer, bedeutet „kein benutzerdefinierter Befehl für Initialisierung“). Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts. |
| CNMI wenn Modem geöffnet/geschlossen ist | Zeichenfolge | „2,1,0,2,0“ / „2,0,2,2,1“ | Definiert, ob Nachrichten auf der SIM-Karte gespeichert oder sofort zugestellt werden. Bitte beachten Sie die Spezifikationen Ihres GSM-Geräts. |

<!--| Anzeige eingehender Anrufe | boolean | false | Beim Empfangen von Anrufen das Ereignis `'onNewIncomingCall'` erhalten. |-->

### SerialPort-Einstellungen
Bitte beachten Sie die Spezifikationen Ihres GMS-Geräts (Google wird in den meisten Fällen helfen)

| Name | Typ | Standard | Beschreibung |
| -------- | ------- | ------- | ------------------------------------------------------- |
| BaudRate | Zahl | 19200 | Die Baudrate des Ports. |
| DatenBits | Zahl | 8 | Muss einer der folgenden Werte sein: 8, 7, 6 oder 5. |
| StopBits | Zahl | 1 | Muss eines der folgenden sein: 1 oder 2. |
| Parität | Zeichenfolge | „keine“ | Muss eines der folgenden sein: ,keine‘, ,gerade‘, ,Markierung‘, ,ungerade‘, ,Leerzeichen‘. |
| rtscts | boolean | false | Flusssteuerungseinstellung |
| xon | boolean | false | Flusssteuerungseinstellung |
| xoff | boolean | false | Flusssteuerungseinstellung |
| xany | boolean | false | Flusssteuerungseinstellungen |

### Weitere Einstellungen und Empfehlungen
#### Zu spezifizieren als Adapter - Objekte (`admin.x`)
- Ihr Name (Standard ist „ownNumber“), die maximale Länge beträgt 16 Zeichen.
- Ihre Telefonnummer.
- SMS-Betriebsmodus („PDU“ oder „SMS“, „PDU“ ist Standard und empfohlen).

Alle Eingaben müssen mit ack=false erfolgen!

#### Posteingang/Postausgang – Verlauf
Durch die Aktivierung des History-Adapters für das `inbox.messageRaw` - Objekt und das `sendSMS.messageRaw` - Objekt erhalten Sie einen kompletten Ein- und Ausgang Ihres SMS-Verkehrs.

<!--

#### SMS - Fehler
Wenn Fehler zurückgegeben werden und der Fehler vom Gerät herrührt (der Austausch mit dem Gerät also technisch erfolgreich war), dann sollte in der Fehlermeldung ein Fehlercode aufgeführt werden, z. B. „+CMS ERROR: 500“. Die Fehlermeldung wird im Protokoll auf der Warnebene angezeigt und im Objekt `info.error` gespeichert.
Eine (unvollständige) Liste möglicher Fehlercodes und ihrer Bedeutungen finden Sie z. B. unter <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Funktionalitäten
### SMS empfangen
Eingehende SMS werden in die `inbox.*` - Objekte geschrieben. `inbox.messageRaw` kann als Auslöser für weitere Aktionen verwendet werden (z.B. Weiterleitung eingehender SMS per E-Mail-Adapter).

### SMS senden
Um eine SMS zu senden, füllen Sie `sendSMS.recipient, sendSMS.message` und optional `sendSMS.alert` aus und drücken Sie die `sendSMS.send` - Schaltfläche. Oder setzen Sie das `sendSMS.messageRaw` - Objekt mit einem String in der folgenden Form und ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Dieser Adapter bietet auch einen Kommunikationsblock für Blockly und SendTo-Funktionen für andere Skripte (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});).

### AT+-Befehle ausführen
! Bitte achten Sie darauf, was Sie tun, wenn Sie AT+-Befehle festlegen, es geht um Ihre SIM-Karte/Ihr Gerät.

AT+-Befehle werden durch die Einstellung `admin.atCommandSLR` im Format `AT+XXXXy` gesendet.
Senden Sie einen beliebigen Befehl, aber beachten Sie, dass Sie nur die letzte Zeile der Antwort sehen.

## Serieller Port-GSM
Dieser Adapter basiert auf dem [SerialPort-GSM-Plugin](https://github.com/zabsalahid/serialport-gsm) für die Kommunikation mit GSM-Modems, hauptsächlich für SMS.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @forelleblau (https://github.com/forelleblau) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## Entwicklerhandbuch
Dieser Abschnitt ist für den Entwickler bestimmt. Er kann später gelöscht werden

### Erste Schritte
Sie sind fast fertig, es fehlen nur noch wenige Schritte:

1. Gehen Sie zu [main.js](main.js) und beginnen Sie mit dem Programmieren!

### Bewährte Vorgehensweisen
Wir haben einige [bewährte Methoden](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) zur ioBroker-Entwicklung und zum Programmieren im Allgemeinen zusammengestellt. Wenn Sie neu bei ioBroker oder Node.js sind, sollten Sie sich diese ansehen. Wenn Sie bereits Erfahrung haben, sollten Sie sich diese ebenfalls ansehen – vielleicht lernen Sie etwas Neues :)

### Skripte in `package.json`
Zu Ihrer Bequemlichkeit sind mehrere npm-Skripte vordefiniert. Sie können sie mit `npm run <scriptname>` ausführen.

| Skriptname | Beschreibung |
\|-------------\|-------------\|
\| `test:js` | Führt die Tests aus, die Sie in den `*.test.js`-Dateien definiert haben. |
\| `test:package` | Stellt sicher, dass Ihre `package.json` und `io-package.json` gültig sind. |
\| `test:unit` | Testet den Adapterstart mit Unittests (schnell, erfordert aber möglicherweise Modul-Mockups). |
\| `test:integration` | Testet den Adapterstart mit einer tatsächlichen Instanz von ioBroker. |
\| `test` | Führt einen minimalen Testlauf für Paketdateien und Ihre Tests durch. |
\| `check` | Führt eine Typprüfung Ihres Codes durch (ohne etwas zu kompilieren). |
\| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und mögliche Bugs zu prüfen. |
\| `release` | Erstellt eine neue Version, weitere Einzelheiten finden Sie unter [`@alcalzone/Release-Skript`](https://github.com/AlCalzone/release-script#usage). |

### Tests schreiben
Wenn es richtig gemacht wird, ist das Testen von Code von unschätzbarem Wert, denn es gibt Ihnen die Sicherheit, Ihren Code zu ändern, während Sie genau wissen, ob und wann etwas kaputt geht. Eine gute Lektüre zum Thema testgetriebene Entwicklung ist <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>.
Obwohl das Schreiben von Tests vor dem Code zunächst seltsam erscheinen mag, hat es ganz klare Vorteile.

Die Vorlage bietet Ihnen grundlegende Tests für den Adapterstart und die Paketdateien.
Es wird empfohlen, dass Sie Ihre eigenen Tests hinzufügen.

### Veröffentlichen des Adapters
Mit GitHub Actions können Sie automatische Releases auf npm aktivieren, wenn Sie einen neuen Git-Tag pushen, der der Form `v<major>.<minor>.<patch>` entspricht. Wir **empfehlen** Ihnen, dies zu tun. Die erforderlichen Schritte sind in `.github/workflows/test-and-release.yml` beschrieben.

Da Sie das Release-Skript installiert haben, können Sie ein neues Release erstellen, indem Sie einfach Folgendes aufrufen:

```bash
npm run release
```

Zusätzliche Befehlszeilenoptionen für das Release-Skript werden in der [Release-Skript-Dokumentation](<https://github.com/AlCalzone/release-script#command-line> ) erläutert.

Um Ihren Adapter in ioBroker freizugeben, lesen Sie bitte die Dokumentation von [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Testen Sie den Adapter manuell mit dem Dev-Server
Da Sie `dev-server` eingerichtet haben, können Sie es zum Ausführen, Testen und Debuggen Ihres Adapters verwenden.

Sie können `dev-server` starten, indem Sie aus Ihrem Entwicklungsverzeichnis aufrufen:

```bash
dev-server watch
```

Die ioBroker.admin-Schnittstelle ist dann unter <http://localhost:8081/> verfügbar.

Weitere Einzelheiten finden Sie unter [`dev-server`-Dokumentation](https://github.com/ioBroker/dev-server#command-line).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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

<!--