---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enigma2/README.md
title: ioBroker enigma2
hash: fdyOycvPFspaROEIv+ZQbVNsc4JE0rZ4YKX5UIsZP80=
---
![Logo](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![NPM](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker enigma2
- Adapter für ioBroker zum Abrufen von Informationen von einem Enigma2-Empfänger und Senden von Befehlen
- (Adapter läuft nur auf einem Host! Bei einer Client-Installation gibt es aktuell noch Probleme.)

- (DE) Adapter für ioBroker um Informationen von einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)(Adapter läuft nur auf einem Host! bei einer Client-Installation gib's aktuell noch probleme.)

----

### Funktionen
- BOX_IP
- NETZWERK
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- KANAL
- VERANSTALTUNGSBESCHREIBUNG
- VERANSTALTUNGSDAUER
- EVENTDURATION_MIN
- VERBLEIBENDE VERANSTALTUNG
- EVENTREMAINING_MIN
- EVENT_PROGRESS_PERCENT
- EVENT_TIME_START
- EVENT_TIME_END
- EVENT_TIME_PASSED
HDD_CAPACITY (Festplattenkapazität)
HDD_FREI
- MESSAGE_ANSWER
- MODELL
- STUMM
- PROGRAMM
- PROGRAMM_INFO
- PROGRAMM_AFTER
- PROGRAMM_AFTER_INFO
- STEHEN ZU
- VOLUMEN
- WEB_IF_VERSION
- istAufzeichnung
- Timer_ist_gesetzt
- MOVIE_LIST (nur openwebif)
- TIMER_LIST
- CHANNEL_PICON (Picon-Pfad – nur openwebif)

----

### Hauptsächlich
- enigma2-VERBINDUNG

----

### Befehl
- Befehl.CHANNEL_DOWN
- Befehl.CHANNEL_UP
- Befehl.AB
- Befehl.UP
- Befehl.EPG
- Befehl.EXIT
- Befehl.LINKS
- Befehl.MENU
- Befehl.MUTE_TOGGLE
- Befehl.OK
- Befehl.PAUSE
- Befehl.PLAY
- Befehl.RADIO
- Befehl.REC
- Befehl.FERNBEDIENUNG
- Befehl.RECHTS
- Befehl.SET_VOLUME
- Befehl.STANDBY_TOGGLE
- Befehl.STOP
- Befehl.TV
- Befehl.UP
- Befehl.LAUTSTÄRKER
- Befehl.LAUTSTÄRKER
- command.ZAP = sende eine ungültige Servicereferenz

----

### Hauptbefehl
- main_command.DEEP_STANDBY = Deepstandby
- main_command.REBOOT = Neustart
- main_command.RESTART_GUI = Enigma2 neu starten (GUI)
- main_command.STANDBY = Standby
- main_command.WAKEUP_FROM_STANDBY = Aufwachen aus dem Standby

----

### Nachricht
- Message.Text = Text der Nachricht (Eingabe -> Senden)
- Message.Type = Zahl von 0 bis 3 (0=Ja/Nein; 1=Info; 2=Nachricht; 3=Achtung)
- Message.Timeout = Timeout der Nachricht in Sek. Kann leer sein oder die Anzahl der Sekunden angeben, nach denen die Nachricht verschwinden soll.

----

### Alexa_Befehl
- Alexa_Command.Mute = Alexa-Befehl
- Alexa_Command.Standby = Alexa-Befehl

----

### Senden an
#### In Blockly
- message = Text der Nachricht
- msgType = Zahl von 0 bis 3 (0= Ja/Nein ; 1= Info ; 2=Nachricht ; 3=Achtung)
- Timeout = Timeout der Nachricht in Sek. Kann leer sein oder die Anzahl der Sekunden angeben, nach denen die Nachricht verschwinden soll.

![Bild Text](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### Oder ![Bild Text](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> zum Blockly Import <](admin/Blockly_Import.md)

#### In JavaScript
```js
sendTo('enigma2.0', 'send', {
    message: 'Test Nachricht', /* Text of Message */
    timeout: 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
    msgType: 1,                /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 2.1.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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