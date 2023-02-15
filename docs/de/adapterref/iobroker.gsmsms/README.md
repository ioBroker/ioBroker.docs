---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: 7ihVBMqefOhG28Jdw/tb6ZwTYI/GSFbQMnFT3cR6ouE=
---
![Logo](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Anzahl der Installationen](https://iobroker.live/badges/gsmsms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Testen und freigeben](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## Gsmsms-Adapter für ioBroker
Senden und empfangen Sie SMS mit GSM-Hardware.

##Hardware
Beliebige GSM-Hardware (z.B. Shield, Surfstick), die mit einem seriellen Port Ihres ioBroker - Geräts verbunden ist.
GSM-Module/Sticks brauchen viel Strom. Bitte sorgen Sie für eine ausreichende Stromversorgung.

Einige Geräte müssen für die serielle Kommunikation auf den richtigen Modus eingestellt werden (siehe 'usb_modeswitch').

## Einstellungen
### Port- und Verbindungseinstellungen
#### Pfad zur seriellen Schnittstelle – erforderlich.
z.B. `/dev/ttyUSB0` oder `/dev/serial/by-id/xxxxxxxxxxx` (by-id ist stabiler, ttyUSBx kann sich bei einem Neustart ändern)

Einige Geräte verfügen über mehrere USB-Anschlüsse, daher kann es sein, dass Sie es ausprobieren müssen. Höchstwahrscheinlich funktioniert der "erste" Port, liefert aber möglicherweise keine "Benachrichtigungen über eingehende Nachrichten", dann können Sie den anderen versuchen und eine SMS senden und sehen, ob sie einige Sekunden später empfangen wird (auf einem Huawai ist dies der dritte Port zum Beispiel).

#### Ihre SIM-PIN
Wenn Ihre SIM-Karte durch eine PIN geschützt ist, geben Sie die PIN ein und sie wird verwendet, um die SIM-Karte während der Initialisierung zu entsperren (leer bedeutet „keine PIN auf der SIM-Karte vorhanden“).

<!--

#### Verbindungsmodus
##### Immer offen
Öffnet eine Modemverbindung, sobald der Adapter gestartet wird. Ein- und ausgehende SMS werden sofort zugestellt. SMS, die während des Ausfalls des Adapters eingehen, werden vom nächsten Adapter zugestellt - Start (je nach Kapazität Ihrer SIM-Karte).

##### Abrufintervall
Ausgehende SMS werden sofort versendet. Eingehende SMS werden periodisch nach dem angegebenen Intervall abgerufen. Eine Modemverbindung wird nur zum Senden und Abrufen von SMS geöffnet.

##### Nur senden
Der Adapter wird nur zum Versenden von SMS verwendet. Alle eingehenden SMS werden ignoriert (möglicherweise auf der SIM-Karte gespeichert, aber nicht auf dem Adapter abgerufen).
-->

### GSM-Einstellungen
Damit der SIM-Speicher nicht ausgeht, werden alle SMS nach Zustellung/Lesen von der SIM gelöscht. Verwenden Sie z. den 'history' - Adapter zum Speichern Ihrer Nachrichten oder jede andere praktische Lösung.

| Name | Geben Sie | ein Standard | Beschreibung |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeige eingehender SMS | boolesch | wahr | Ermöglicht dem Modem zu benachrichtigen, dass eine neue SMS-Nachricht empfangen wurde. |
| Verkettung aktivieren | boolesch | wahr | Empfangen Sie verkettete Nachrichten als eine. |
| Benutzerdefinierter Initialisierungsbefehl | Zeichenfolge | | Wenn Ihr Gerät einen benutzerdefinierten Initialisierungsbefehl benötigt, kann dieser bereitgestellt werden und wird nach der PIN-Prüfung verwendet. d.h. einige Geräte benötigen 'AT+CPMS="SM","SM","SM"' um den richtigen Speichersatz zu bekommen. Es wird erwartet, dass der Befehl `'OK'` zurückgibt (leer, bedeutet "kein benutzerdefinierter Befehl für init"). Bitte beziehen Sie sich auf die Spezifikationen Ihres GSM-Geräts. |
| CNMI wenn Modem offen/geschlossen | Zeichenfolge | '2,1,0,2,0' / '2,0,2,2,1' | Legt fest, ob Nachrichten auf der SIM-Karte gespeichert oder sofort zugestellt werden. Bitte beziehen Sie sich auf die Spezifikationen Ihres GSM-Geräts. |

<!--| Anzeige eingehender Anrufe | boolesch | falsch | Beim Empfang von Anrufen das Ereignis `'onNewIncomingCall'` empfangen. |-->

### SerialPort-Einstellungen
Bitte beziehen Sie sich auf die Spezifikationen Ihres GMS-Geräts (Google hilft in den meisten Fällen)

| Name | Geben Sie | ein Standard | Beschreibung |
| -------- | ------- | ------- | ------------------------------------------------------- |
| Baudrate | Nummer | 19200 | Die Baudrate des Ports. |
| DatenBits | Nummer | 8 | Muss einer der folgenden Werte sein: 8, 7, 6 oder 5. |
| stopBits | Nummer | 1 | Muss einer der folgenden Werte sein: 1 oder 2. |
| Parität | Zeichenfolge | "Keine"  | Muss einer der folgenden sein: 'none', 'even', 'mark', 'odd', 'space'. |
| rtscts | boolesch | falsch | Flusssteuerungseinstellung |
| Xon | boolesch | falsch | Flusssteuerungseinstellung |
| xoff | boolesch | falsch | Flusssteuerungseinstellung |
| Xany | boolesch | falsch | Flusssteuerungseinstellungen |

### Andere Einstellungen und Empfehlungen
#### Als Adapter anzugeben - Objekte (`admin.x`)
- Ihr Name (Standard ist `ownNumber`), maximale Länge ist 16 Zeichen.
-   deine Telefonnummer.
- SMS-Betriebsmodus (`PDU` oder `SMS`, `PDU` ist Standard und wird empfohlen).

Alle Eingaben müssen mit ack=false erfolgen!

#### Posteingang/Postausgang - Verlauf
Durch Aktivierung des History-Adapters für das `inbox.messageRaw` - Objekt und das `sendSMS.messageRaw` - Objekt erhalten Sie einen kompletten Ein- und Ausgang Ihres SMS-Verkehrs.

<!--

#### SMS - Fehler
Wenn Fehler zurückgegeben werden und der Fehler vom Gerät ausgeht (der Austausch mit dem Gerät also technisch erfolgreich war), dann sollte in der Fehlermeldung ein Fehlercode aufgeführt sein, z. "+CMS-FEHLER: 500". Die Fehlermeldung wird im Log auf 'warn' - Ebene angezeigt und im Objekt `info.error` gespeichert.
Eine (unvollständige) Liste möglicher Fehlercodes und deren Bedeutung finden Sie z. unter <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Funktionalitäten
### SMS empfangen
Eingehende SMS werden in die `inbox.*` - Objekte geschrieben. `inbox.messageRaw` kann als Auslöser für weitere Operationen verwendet werden (z. B. eingehende SMS per E-Mail-Adapter weiterleiten).

### SMS senden
Um eine SMS zu versenden, füllen Sie `sendSMS.recipient, sendSMS.message` und optional `sendSMS.alert` aus und drücken Sie die `sendSMS.send` - Taste. Oder setze das `sendSMS.messageRaw` - Objekt mit einem String in folgender Form und ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Dieser Adapter bietet auch einen Kommunikationsblock für Blockly- und sendTo-Funktionalitäten für andere Skripte (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'} );).

### AT+-Befehle ausführen
! Bitte stellen Sie sicher, dass Sie wissen, was Sie tun, wenn Sie AT+-Befehle festlegen, es ist Ihre SIM-Karte / Ihr Gerät.

AT+-Befehle werden bei Einstellung `admin.atCommandSLR` im Format `AT+XXXXy` gesendet.
Senden Sie einen beliebigen Befehl, aber beachten Sie, dass Sie nur die letzte Zeile der Antwort sehen.

## Serialport-gsm
Dieser Adapter basiert auf dem [SerialPort-GSM-Plugin](https://github.com/zabsalahid/serialport-gsm) zur Kommunikation mit GSM-Modems, hauptsächlich für SMS.

## Entwicklerhandbuch
Dieser Abschnitt ist für den Entwickler bestimmt. Es kann später gelöscht werden

### Einstieg
Sie haben es fast geschafft, nur noch wenige Schritte:

1. Gehen Sie zu [main.js](main.js) und beginnen Sie mit der Programmierung!

### Empfohlene Vorgehensweise
Wir haben einige [empfohlene Vorgehensweise](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) zur Entwicklung und Codierung von ioBroker im Allgemeinen gesammelt. Wenn Sie neu bei ioBroker oder Node.js sind, sollten Sie sie sich ansehen. Wenn du schon Erfahrung hast, solltest du sie dir auch ansehen - vielleicht lernst du etwas Neues :)

### Skripte in `package.json`
Mehrere npm-Skripte sind für Ihre Bequemlichkeit vordefiniert. Sie können sie mit `npm run <scriptname>` ausführen.

| Skriptname | Beschreibung |
\|-------------\|-------------\|
\| `test:js` | Führt die Tests aus, die Sie in `*.test.js`-Dateien definiert haben. |
\| `test:package` | Stellt sicher, dass Ihre `package.json` und `io-package.json` gültig sind. |
\| `test:unit` | Testet den Start des Adapters mit Einheitentests (schnell, erfordert aber möglicherweise Modul-Mocks, um zu funktionieren). |
\| `test:integration` | Testet den Adapterstart mit einer tatsächlichen Instanz von ioBroker. |
\| `test` | Führt einen minimalen Testlauf für Paketdateien und Ihre Tests durch. |
\| `check` | Führt eine Typprüfung Ihres Codes durch (ohne etwas zu kompilieren). |
\| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und potenzielle Fehler zu überprüfen. |
\| `release` | Erstellt eine neue Version, siehe [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) für weitere Details. |

### Schreibtests
Wenn es richtig gemacht wird, ist das Testen von Code von unschätzbarem Wert, da es Ihnen das Vertrauen gibt, Ihren Code zu ändern, während Sie genau wissen, ob und wann etwas kaputt geht. Eine gute Lektüre zum Thema testgetriebene Entwicklung ist <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>.
Das Schreiben von Tests vor dem Code mag zunächst seltsam erscheinen, hat aber ganz klare Vorteile.

Die Vorlage bietet Ihnen grundlegende Tests für die Start- und Paketdateien des Adapters.
Es wird empfohlen, dass Sie dem Mix Ihre eigenen Tests hinzufügen.

### Veröffentlichen des Adapters
Mithilfe von GitHub-Aktionen können Sie automatische Freigaben auf npm aktivieren, wenn Sie ein neues Git-Tag pushen, das der Form `v<major>.<minor>.<patch>` entspricht. Wir **raten dringend** dazu. Die notwendigen Schritte sind in `.github/workflows/test-and-release.yml` beschrieben.

Da Sie das Freigabeskript installiert haben, können Sie eine neue Freigabe einfach erstellen, indem Sie Folgendes aufrufen:

```bash
npm run release
```

Weitere Befehlszeilenoptionen für das Freigabeskript werden in der [Dokumentation zum Freigabeskript](<https://github.com/AlCalzone/release-script#command-line> ) erläutert.

Um Ihren Adapter in ioBroker freizugeben, lesen Sie bitte die Dokumentation von [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Testen Sie den Adapter manuell mit dev-server
Da Sie `dev-server` eingerichtet haben, können Sie damit Ihren Adapter ausführen, testen und debuggen.

Sie können `dev-server` starten, indem Sie aus Ihrem Entwicklerverzeichnis aufrufen:

```bash
dev-server watch
```

Die ioBroker.admin-Schnittstelle ist dann unter <http://localhost:8081/> verfügbar

Weitere Einzelheiten finden Sie in den [`dev-server`-Dokumentation](https://github.com/ioBroker/dev-server#command-line).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
### 0.0.4
-   (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

### 0.0.3
-   (forelleblau) dependencies updated, bugs fixed

### 0.0.2
-   (forelleblau) first published version

### 0.0.1
-   (forelleblau) initial release

## License

MIT License

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