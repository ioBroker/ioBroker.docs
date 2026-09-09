---
chapters: {"pages":{"en/adapterref/iobroker.enigma2/README.md":{"title":{"en":"ioBroker enigma2"},"content":"en/adapterref/iobroker.enigma2/README.md"},"en/adapterref/iobroker.enigma2/admin/Blockly_Import.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.enigma2/admin/Blockly_Import.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enigma2/README.md
title: ioBroker enigma2
hash: ODJlCHKuO/pGoTJbVYUDgBSql9/5F7Wzzjx/BVgZWx8=
---
![Logo](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![NPM](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

---

# ioBroker enigma2

- Adapter für ioBroker zum Abrufen von Informationen von einem Enigma2-Empfänger und zum Senden von Befehlen
- (Der Adapter läuft nur auf einem Host! Bei einer Client-Installation gibt es derzeit noch Probleme.)

---

### Funktionen

- BOX\_IP
- NETZWERK
- KANALSERVICEREFERENZ
- KANALSERVICEREFERENZNAME
- KANAL
- VERANSTALTUNGSBESCHREIBUNG
- VERANSTALTUNGSDAUER
- EVENTDURATION\_MIN
- VERBLEIBENDE EREIGNISSE
- VERBLEIBENDE\_MINUTEN
- EREIGNISFORTSCHRITT PROZENT
- EREIGNIS\_ZEIT\_START
- EVENT\_TIME\_END
- EREIGNIS\_ZEIT\_VERGANGEN
- HDD\_CAPACITY
- HDD\_FREE
- NACHRICHTENANTWORT
- MODELL
- STUMMSCHALTET
- PROGRAMM
- PROGRAMM\_INFO
- PROGRAMM\_AFTER
- PROGRAMM\_AFTER\_INFO
- STEHEN ZU
- VOLUMEN
- WEB\_IF\_VERSION
- isRecording
- Timer ist eingestellt
- FILMLISTE (nur openwebif)
- TIMER\_LIST
- CHANNEL\_PICON (Picon-Pfad - nur openwebif)

---

### hauptsächlich

- enigma2-CONNECTION

---

### Befehl

- Befehl.KANAL\_AB
- Befehl.KANAL\_AUF
- Befehl.AB
- Befehl.UP
- Befehl.EPG
- Befehl.EXIT
- Befehl.LINKS
- Befehlsmenü
- Befehl.Stummschalten
- Befehl.OK
- Befehl.PAUSE
- Befehl.SPIELEN
- Befehl.RADIO
- Befehl.REC
- Befehl.FERNBEDIENUNG
- Befehl.RECHTS
- Befehl.SET\_VOLUME
- Befehl.STANDBY\_TOGGLE
- Befehl.STOP
- command.TV
- Befehl.UP
- Befehl.LAUTSTÄRKE\_ABNEIGEN
- Befehl.VOLUME\_UP
- command.ZAP = sendet eine ungültige Dienstreferenz

---

### Hauptkommando

- main\_command.DEEP\_STANDBY = Deepstandby
- main\_command.REBOOT = Neustart
- main\_command.RESTART\_GUI = Enigma2 (GUI) neu starten
- main\_command.STANDBY = Standby
- main\_command.WAKEUP\_FROM\_STANDBY = Aufwachen aus dem Standby-Modus

---

### Nachricht

- Message.Text = Text der Nachricht (Eingabe -> Senden)
- Message.Type = Zahl von 0 bis 3 (0 = Ja/Nein; 1 = Info; 2 = Nachricht; 3 = Achtung)
- Message.Timeout = Timeout der Nachricht in Sekunden. Kann leer sein oder die Anzahl der Sekunden angeben, nach denen die Nachricht verschwinden soll.

---

### Alexa-Befehl

- Alexa\_Command.Mute = Alexa-Befehl
- Alexa\_Command.Standby = Alexa-Befehl

---

### senden an

#### in Blockly

- Nachricht = Text der Nachricht
- msgType = Zahl von 0 bis 3 (0 = Ja/Nein; 1 = Info; 2 = Nachricht; 3 = Achtung)
- timeout = Zeitüberschreitung der Nachricht in Sekunden. Kann leer sein oder die Anzahl der Sekunden angeben, nach denen die Nachricht verschwinden soll.

![Bildtext](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### oder

![Bildtext](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)

[Blockly-Import <](/#/docs/adapterref/iobroker.enigma2/admin/Blockly_Import.md)

#### in JavaScript

```js
sendTo('enigma2.0', 'send', {
    message: 'Test Messaget', /* Text of Message */
    timeout: 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
    msgType: 1,                /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.3.0 (2026-03-05)
- (mcm1957) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated.

### 2.2.3 (2024-12-22)
* (mcm1957) Adapter has been moigrated to @iobroker/eslint-config. [#266]

### 2.2.2 (2024-12-22)
* (mcm1957) States 'message.*' are writeable again now. [#273]
* (mcm1957) Dependencies have been updated.

### 2.2.1 (2024-11-13)
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
* (mcm1957) Message states have been added. [#229]
* (simatec) Adapter changed to meet Responsive Design rules.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.enigma2/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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