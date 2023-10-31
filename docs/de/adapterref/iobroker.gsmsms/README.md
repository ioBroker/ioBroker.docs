---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: dunlSMGPp9mJWEwiLsW+jZKUNdPBGcuyXoTQ6r32bAY=
---
![Logo](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Anzahl der Installationen](https://iobroker.live/badges/gsmsms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gsmsms-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Test und Freigabe](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## GSMSMS-Adapter für ioBroker
Senden und empfangen Sie SMS mit GSM-Hardware.

## Hardware
Jegliche GSM-Hardware (z. B. Shield, Surfstick), die an einen seriellen Port Ihres ioBroker-Geräts angeschlossen ist.
GSM-Module/Sticks benötigen viel Strom. Bitte achten Sie auf eine ausreichende Stromversorgung.

Einige Geräte müssen für die serielle Kommunikation auf den richtigen Modus eingestellt werden (siehe „usb_modeswitch“).

## Einstellungen
### Port- und Verbindungseinstellung
#### Pfad zum seriellen Port – erforderlich.
z.B. `/dev/ttyUSB0` oder `/dev/serial/by-id/xxxxxxxxxxx` (by-id ist stabiler, ttyUSBx kann sich bei einem Neustart ändern)

Einige Geräte verfügen über mehrere USB-Anschlüsse, daher kann es sein, dass Sie es ausprobieren müssen. Höchstwahrscheinlich funktioniert der „erste“ Anschluss, liefert aber möglicherweise keine „Benachrichtigungen über eingehende Nachrichten“. Dann können Sie den anderen ausprobieren und eine SMS einsenden und sehen, ob sie einige Sekunden später empfangen wird (auf einem Huawai ist dies der dritte Anschluss). zum Beispiel).

#### Ihre SIM-PIN
Wenn Ihre SIM-Karte durch eine PIN geschützt ist, geben Sie die PIN ein und sie wird zum Entsperren der SIM-Karte während der Initialisierung verwendet (leer bedeutet „keine PIN auf der SIM-Karte vorhanden“).

<!--

#### Verbindungsmodus
##### Immer offen
Öffnet eine Modemverbindung, sobald der Adapter gestartet wird. Eingehende und ausgehende SMS werden sofort zugestellt. SMS, die während des Ausfalls des Adapters eingehen, werden vom nächsten Adapter zugestellt – beim Start (je nach Kapazität Ihrer SIM-Karte).

##### Abrufintervall
Ausgehende SMS werden sofort versendet. Eingehende SMS werden periodisch im angegebenen Intervall abgerufen. Eine Modemverbindung wird nur zum Senden und Empfangen von SMS geöffnet.

##### Nur senden
Der Adapter dient ausschließlich zum Versenden von SMS. Alle eingehenden SMS werden ignoriert (möglicherweise auf der SIM-Karte gespeichert, aber nicht auf den Adapter abgerufen).
->

### GSM-Einstellungen
Um den SIM-Speicher nicht zu erschöpfen, werden alle SMS nach der Zustellung/Lesung von der SIM-Karte gelöscht. Verwenden Sie z.B. der „Verlauf“-Adapter zum Speichern Ihrer Nachrichten oder jede andere praktische Lösung.

| Name | Geben Sie | ein Standard | Beschreibung |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeige eingehender SMS | boolescher Wert | wahr | Ermöglicht dem Modem, den Empfang einer neuen SMS-Nachricht zu benachrichtigen. |
| Verkettung aktivieren | boolescher Wert | wahr | Empfangen Sie verkettete Nachrichten als eine. |
| Benutzerdefinierter Iinit-Befehl | Zeichenfolge | | Wenn Ihr Gerät einen benutzerdefinierten Initialisierungsbefehl benötigt, kann dieser bereitgestellt werden und wird nach der PIN-Prüfung verwendet. d. h. einige Geräte benötigen „AT+CPMS="SM", „SM“, „SM““, um den richtigen Speichersatz zu erhalten. Es wird erwartet, dass der Befehl `'OK'` zurückgibt (leer, bedeutet „kein benutzerdefinierter Befehl für init“). Bitte beachten Sie die technischen Daten Ihres GSM-Geräts. |
| CNMI, wenn Modem offen/geschlossen ist | Zeichenfolge | '2,1,0,2,0' / '2,0,2,2,1' | Legt fest, ob Nachrichten auf der SIM-Karte gespeichert oder sofort zugestellt werden. Bitte beachten Sie die technischen Daten Ihres GSM-Geräts. |

<!--| Anzeige eingehender Anrufe | boolescher Wert | falsch | Empfangen Sie das Ereignis `'onNewIncomingCall'` beim Empfang von Anrufen. |-->

### SerialPort-Einstellungen
Bitte beachten Sie die technischen Daten Ihres GMS-Geräts (Google hilft in den meisten Fällen weiter)

| Name | Geben Sie | ein Standard | Beschreibung |
| -------- | ------- | ------- | ------------------------------------------------------- |
| Baudrate | Nummer | 19200 | Die Baudrate des Ports. |
| DatenBits | Nummer | 8 | Muss einer von 8, 7, 6 oder 5 sein. |
| stopBits | Nummer | 1 | Muss einer von 1 oder 2 sein. |
| Parität | Zeichenfolge | "Keine"  | Muss einer der folgenden Werte sein: „none“, „even“, „mark“, „odd“, „space“. |
| rtscts | boolescher Wert | falsch | Flusskontrolleinstellung |
| xon | boolescher Wert | falsch | Flusskontrolleinstellung |
| xoff | boolescher Wert | falsch | Flusskontrolleinstellung |
| xany | boolescher Wert | falsch | Flusskontrolleinstellungen |

### Weitere Einstellungen und Empfehlungen
#### Als Adapter anzugeben - Objekte (`admin.x`)
- Ihr Name (Standard ist „ownNumber“), maximale Länge beträgt 16 Zeichen.
-   deine Telefonnummer.
- SMS-Betriebsmodus („PDU“ oder „SMS“, „PDU“ ist Standard und wird empfohlen).

Alle Eingaben müssen mit ack=false erfolgen!

#### Posteingang/Postausgang – Verlauf
Durch die Aktivierung des History-Adapters für das `inbox.messageRaw` - Objekt und das `sendSMS.messageRaw` - Objekt erhalten Sie einen vollständigen In- und Outbox Ihres SMS-Verkehrs.

<!--

#### SMS - Fehler
Wenn Fehler zurückgegeben werden und der Fehler vom Gerät stammt (der Austausch mit dem Gerät war also technisch erfolgreich), dann sollte in der Fehlermeldung ein Fehlercode aufgeführt sein, z. B. „+CMS-FEHLER: 500“. Die Fehlermeldung wird im Protokoll auf der Ebene „warn“ angezeigt und im Objekt `info.error` gespeichert.
Eine (unvollständige) Liste möglicher Fehlercodes und deren Bedeutung finden Sie z.B. unter <https://www.activexperts.com/sms-component/gsm-error-codes/>.
->

## Funktionalitäten
### SMS empfangen
Eingehende SMS werden in die `inbox.*` - Objekte geschrieben. `inbox.messageRaw` kann als Auslöser für weitere Vorgänge verwendet werden (z. B. eingehende SMS per E-Mail-Adapter weiterleiten).

### SMS senden
Um eine SMS zu senden, geben Sie `sendSMS.recipient, sendSMS.message` und optional `sendSMS.alert` ein und drücken Sie die `sendSMS.send` - Taste. Oder setzen Sie das `sendSMS.messageRaw` - Objekt mit einer Zeichenfolge in der folgenden Form und ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Dieser Adapter stellt auch einen Kommunikationsblock für Blockly- und SendTo-Funktionen für andere Skripte bereit (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', warning: '_false/true_'} );).

### AT+-Befehle ausführen
! Bitte stellen Sie sicher, dass Sie wissen, was Sie tun, wenn Sie AT+-Befehle festlegen. Es handelt sich um Ihre SIM-Karte/Ihr Gerät.

AT+Befehle werden mit der Einstellung `admin.atCommandSLR` im Format `AT+XXXXy` gesendet.
Senden Sie einen beliebigen Befehl, beachten Sie jedoch, dass Sie nur die letzte Zeile der Antwort sehen.

## Serialport-gsm
Dieser Adapter basiert auf den [SerialPort-GSM-Plugin](https://github.com/zabsalahid/serialport-gsm) zur Kommunikation mit GSM-Modems, hauptsächlich für SMS.

## Entwicklerhandbuch
Dieser Abschnitt richtet sich an den Entwickler. Es kann später gelöscht werden

### Erste Schritte
Sie sind fast fertig, es sind nur noch ein paar Schritte übrig:

1. Gehen Sie zu [main.js](main.js) und beginnen Sie mit dem Programmieren!

### Empfohlene Vorgehensweise
Wir haben einige [empfohlene Vorgehensweise](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) zur ioBroker-Entwicklung und Codierung im Allgemeinen zusammengestellt. Wenn Sie neu bei ioBroker oder Node.js sind, sollten Sie sie ausprobieren. Wenn Sie bereits erfahren sind, sollten Sie auch einen Blick darauf werfen – vielleicht lernen Sie etwas Neues :)

### Skripte in `package.json`
Zu Ihrer Bequemlichkeit sind mehrere NPM-Skripte vordefiniert. Sie können sie mit `npm run <scriptname>` ausführen.

| Skriptname | Beschreibung |
\|-------------\|-------------\|
\| `test:js` | Führt die Tests aus, die Sie in den `*.test.js`-Dateien definiert haben. |
\| `test:package` | Stellt sicher, dass Ihre `package.json` und `io-package.json` gültig sind. |
\| `test:unit` | Testet den Adapterstart mit Unit-Tests (schnell, erfordert aber möglicherweise Modul-Mocks, um zu funktionieren). |
\| `test:integration` | Testet den Adapterstart mit einer tatsächlichen Instanz von ioBroker. |
\| `test` | Führt einen minimalen Testlauf für Paketdateien und Ihre Tests durch. |
\| `check` | Führt eine Typprüfung Ihres Codes durch (ohne etwas zu kompilieren). |
\| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und potenzielle Fehler zu überprüfen. |
\| `release` | Erstellt eine neue Version, siehe [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) für weitere Details. |

### Tests schreiben
Wenn es richtig gemacht wird, ist das Testen von Code von unschätzbarem Wert, denn es gibt Ihnen die Sicherheit, Ihren Code zu ändern und gleichzeitig genau zu wissen, ob und wann etwas kaputt geht. Eine gute Lektüre zum Thema testgetriebene Entwicklung ist <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>.
Obwohl das Schreiben von Tests vor dem Code auf den ersten Blick seltsam erscheinen mag, hat es ganz klare Vorteile.

Die Vorlage bietet Ihnen grundlegende Tests für die Adapter-Start- und Paketdateien.
Es wird empfohlen, dem Mix eigene Tests hinzuzufügen.

### Veröffentlichen des Adapters
Mithilfe von GitHub-Aktionen können Sie automatische Veröffentlichungen auf npm aktivieren, wenn Sie ein neues Git-Tag pushen, das der Form `v<major>.<minor>.<patch>` entspricht. Wir empfehlen Ihnen dringend, dies zu tun. Die notwendigen Schritte sind in `.github/workflows/test-and-release.yml` beschrieben.

Da Sie das Release-Skript installiert haben, können Sie ein neues Release erstellen, indem Sie einfach Folgendes aufrufen:

```bash
npm run release
```

Zusätzliche Befehlszeilenoptionen für das Release-Skript werden in der [Release-Script-Dokumentation](<https://github.com/AlCalzone/release-script#command-line> ) erläutert.

Um Ihren Adapter in ioBroker freizugeben, lesen Sie bitte die Dokumentation von [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Testen Sie den Adapter manuell mit Dev-Server
Da Sie `dev-server` eingerichtet haben, können Sie damit Ihren Adapter ausführen, testen und debuggen.

Sie können `dev-server` starten, indem Sie von Ihrem Entwicklerverzeichnis aus aufrufen:

```bash
dev-server watch
```

Die ioBroker.admin-Schnittstelle ist dann unter <http://localhost:8081/> verfügbar

Weitere Einzelheiten finden Sie in den [Dokumentation zum „Dev-Server“.](https://github.com/ioBroker/dev-server#command-line).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

### 0.0.5

-   (forelleblau) bug fixed (adapter set "undefined" into state values)

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