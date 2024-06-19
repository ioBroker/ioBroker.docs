![Logo](admin/enigma2.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.enigma2.svg)](https://www.npmjs.com/package/iobroker.enigma2) [![Downloads](https://img.shields.io/npm/dm/iobroker.enigma2.svg)](https://www.npmjs.com/package/iobroker.enigma2) [![NPM](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)](https://nodei.co/npm/iobroker.enigma2/)

----
# ioBroker enigma2
- Adapter for ioBroker to retrieve information from an enigma2 receiver and send commands
- (Adapter only runs on one host! with a client installation there's currently still problems.)

- (DE) Adapter für ioBroker um Informationen von einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)(Adapter läuft nur auf einem Host! bei einer Client Installation gib's aktuell noch probleme.)

## Forum
[![ioBroker](https://forum.iobroker.net/assets/uploads/system/site-logo.png)](https://forum.iobroker.net/topic/25112/enigma2-adapter-ab-v1-2-3)

----
### Funktionen
- BOX_IP
- NETWORK
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- CHANNEL
- EVENTDESCRIPTION
- EVENTDURATION
- EVENTDURATION_MIN
- EVENTREMAINING
- EVENTREMAINING_MIN
- EVENT_PROGRESS_PERCENT
- EVENT_TIME_START
- EVENT_TIME_END
- EVENT_TIME_PASSED
- HDD_CAPACITY
- HDD_FREE
- MESSAGE_ANSWER
- MODEL
- MUTED
- PROGRAMM
- PROGRAMM_INFO
- PROGRAMM_AFTER
- PROGRAMM_AFTER_INFO
- STANDBY
- VOLUME
- WEB_IF_VERSION
- isRecording
- Timer_is_set
- MOVIE_LIST (only openwebif)
- TIMER_LIST
- CHANNEL_PICON (Picon path - only openwebif)

----
### main
- enigma2-CONNECTION

----
### Command
- command.CHANNEL_DOWN
- command.CHANNEL_UP
- command.DOWN
- command.UP
- command.EPG
- command.EXIT
- command.LEFT
- command.MENU
- command.MUTE_TOGGLE
- command.OK
- command.PAUSE
- command.PLAY
- command.RADIO
- command.REC
- command.REMOTE-CONTROL
- command.RIGHT
- command.SET_VOLUME
- command.STANDBY_TOGGLE
- command.STOP
- command.TV
- command.UP
- command.VOLUME_DOWN
- command.VOLUME_UP
- command.ZAP = send an invalid servicereference

----
### Main Command
- main_command.DEEP_STANDBY         = Deepstandby
- main_command.REBOOT               = Reboot
- main_command.RESTART_GUI          = Restart Enigma2 (GUI)
- main_command.STANDBY              = Standby
- main_command.WAKEUP_FROM_STANDBY  = Wakeup form Standby

----
### Message
 - Message.Text           = Text of Message (Enter -> Send)
 - Message.Type           = Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention)
 - Message.Timeout        = timeout of Message in sec. Can be empty or the Number of seconds the Message should disappear after.

----
### Alexa_Command
 - Alexa_Command.Mute     = Alexa Command
 - Alexa_Command.Standby  = Alexa Command
 
----
### sendTo 

#### in Blockly
 - message   = Text of Message
 - msgType   = Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention)
 - timeout   = timeout of Message in sec. Can be empty or the Number of seconds the Message should disappear after.
 
![Bild Text](admin/enigma2_message2.png)
### oder
![Bild Text](admin/enigma2_message.png)

[> zum Blockly Import <](admin/Blockly_Import.md)

#### in JavaScript

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
### 2.1.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

### 2.1.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.5 (2023-09-18)
* (mcm1957) A problem causing missing descriptions for timer entryies and warnings has been fixed. #119 
* (mcm1957) Dependencies have been updated.

### 2.0.3 (2023-09-06)
* (TDCroPower) fixed the problem that no objects are updated

### 2.0.2 (2023-08-17)
* (Lucky-ESA) Bugfixes: [#61](https://github.com/Matten-Matten/ioBroker.enigma2/issues/61)
* (Lucky-ESA) Bugfixes: undefined e2eventlist
* (bluefox) Added json config
* (mcm1957) Adapter now requires node 16

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
