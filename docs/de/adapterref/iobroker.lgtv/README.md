---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: dejocYxdrQnNaaT5Ba3d50e5ftNRE+Vtvcixd3KV4rc=
---
![Logo](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lgtv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lgtv-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/lgtv-stable.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)

# IoBroker.lgtv
**Tests:** ![Test und Freigabe](https://github.com/SebastianSchultz/ioBroker.lgtv/workflows/Test%20and%20Release/badge.svg)

LG WebOS SmartTV-Adapter für ioBroker

Fernsteuerung eines LG WebOS SmartTV (Modelle ab 2013) über [ioBroker](https://www.iobroker.net).

---

## Verwendung:
Installieren Sie den Adapter über die ioBroker-Administratorschnittstelle.
Geben Sie in der Adapterkonfiguration die IP-Adresse Ihres LG WebOS TV ein.
Bei der ersten Verbindung wird auf Ihrem Fernsehbildschirm eine Kopplungsaufforderung angezeigt, in der Sie die Verbindung zulassen sollten.

### Umfrage
Einige Fernseher trennen sich beim Ausschalten vom Internet-Anschluss und melden dies nicht korrekt an den Adapter. Dann ist eine zusätzliche Abfrage erforderlich. Sie können die Zeit in den Einstellungen festlegen. Wenn der Wert leer ist, versucht der Adapter, dies automatisch zu erkennen: Beim Neustart des Adapters ist die Abfrage (alle 60 Sekunden) aktiv, bis das erste korrekte TV-Aus-Ereignis erkannt wird.

## Einige Beispiele:
`setState('lgtv.0.states.popup', 'Some text!');`

Daraufhin wird ein Popup mit dem Text „Some Text!“ angezeigt. im Fernsehen.
Sie können im Text HTML-Zeilenumbrüche (br) verwenden.

`setState('lgtv.0.states.turnOff', true);`

Ausschalten des Fernsehers.

`setState('lgtv.0.states.mute', true);`

Schalten Sie den Fernseher stumm.

`setState('lgtv.0.states.mute', false);`

Schalten Sie die Stummschaltung des Fernsehers auf.

`setState('lgtv.0.states.volumeUp', true);`

Dadurch wird die Lautstärke des Fernsehers erhöht.

`setState('lgtv.0.states.volumeDown', true);`

Verringern Sie die Lautstärke des Fernsehers.

`setState('lgtv.0.states.channelUp', true);`

Erhöhung des aktuellen TV-Senders.

`setState('lgtv.0.states.channelDown', true);`

Verringern des aktuellen TV-Kanals.

`setState('lgtv.0.states.3Dmode', true);`

Aktiviert den 3D-Modus auf dem Fernseher

`setState('lgtv.0.states.3Dmode', false);`

Deaktiviert den 3D-Modus am Fernseher.

`setState('lgtv.0.states.channel', 7);`

Umschalten des Live-TV auf Kanal Nummer 7.

`setState('lgtv.0.states.launch', 'livetv');`

Wechsel in den Live-TV-Modus.

`setState('lgtv.0.states.launch', 'smartshare');`

Öffnen Sie die SmartShare-App auf dem Fernseher.

`setState('lgtv.0.states.launch', 'tvuserguide');`

Führt die TV-Benutzerhandbuch-App auf dem Fernseher aus.

`setState('lgtv.0.states.launch', 'netflix');`

Öffnen Sie die Netflix-App auf dem Fernseher.

`setState('lgtv.0.states.launch', 'youtube');`

Öffnet die Youtube-App auf dem Fernseher.

`setState('lgtv.0.states.launch', 'prime');`

Öffnet die Amazon Prime App auf dem Fernseher.

`setState('lgtv.0.states.launch', 'amazon');`

Auf einigen Fernsehern öffnet dieser Befehl die Amazon Prime App.

`setState('lgtv.0.states.openURL', 'http://www.iobroker.net');`

Öffnet den Webbrowser auf dem Fernseher und navigiert zu www.iobroker.net.
Kann auch zum Öffnen von Bildern oder Videos (im Browser) verwendet werden.

`setState('lgtv.0.states.input', 'av1');`

Schaltet den Eingang des Fernsehers auf AV1 um.

`setState('lgtv.0.states.input', 'scart');`

Schaltet den Eingang des Fernsehers auf Scart um.

`setState('lgtv.0.states.input', 'component');`

Schaltet den Eingang des Fernsehers auf Component um.

`setState('lgtv.0.states.input', 'hdmi1');`

Schaltet den Eingang des Fernsehers auf HDMI 1 um.

`setState('lgtv.0.states.input', 'hdmi2');`

Schaltet den Eingang des Fernsehers auf HDMI 2 um.

`setState('lgtv.0.states.input', 'hdmi3');`

Schaltet den Eingang des Fernsehers auf HDMI 3 um.

`setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');`

YouTube-Video abspielen.

`setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');` `setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');`

RAW-Befehls-API zum Senden und Antworten.

`setState('lgtv.0.remote.*KEY*', true);`

Senden Sie den Fernbedienungsschlüssel an den Fernseher.

`setState('lgtv.0.states.power', true/false);`

Schalten Sie den Fernseher aus und wieder ein (Einschalten, funktioniert nur LAN, mit WOL).

`setState('lgtv.0.states.soundOutput', 'external_arc');`

Schalten Sie die Audioausgabe über ARC (HDMI) um.

---

## Zustände
Kanal

Hält den aktuellen Kanal

Volumen

Hält den aktuellen Lautstärkepegel und kann die Lautstärke ändern

An

ist wahr, wenn der Fernseher eingeschaltet ist, und falsch, wenn der Fernseher ausgeschaltet ist

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2023-10-06)

- (basti4557) Websocket configuration has been fixed [#161].

### 2.1.0 (2023-10-05)

- (basti4557) A bug that destryed the actual app state on changing from tv to app mode has been fixed.
- (basti4557) Websocket SSL states can now be sent / received again due to the websocket ssl changes.
- (basti4557) Plain websocket has been replced by SSL Websocket.

### 2.0.0 (2023-10-03)

- (mcm1957) Adapter has been moved to iobroker-community-adapters area
- (mcm1957) POSSIBLE BREAKING: Adapter has been built from current github content. As latest npm packages have been created external, theres a chance that some changes got lost.
- (jpawlowski) Travis and AppVeyor have been replced by GitHub Actions, based on ioBroker/create-adapter
- (jpawlowski) Adpter requires NodeJS 16 minimum now
- (jpawlowski) Dependencies have been updated
- (jpawlowski) Configuration item healthIntervall has been rename/correct to healthInterval

### 1.1.12 (2023-07-04)

-   (foxriver76) prepare for controller v5

### 1.1.10 (2020-08-24)

-   (SebastianSchultz) support WebOS 5 for volume change

### 1.1.9 (2020-07-14)

-   (SebastianSchultz) re-upload for fixing NPM update issue

### 1.1.8 (2020-07-08)

-   (SebastianSchultz) bugfix for "IndexOf" error

### 1.1.6 (2020-03-07)

-   (dirkhe) make healthintervall configurable

### 1.1.5 (2020-02-25)

-   (dirkhe) stable connection and subsciptions
-   (dirkhe) add Polling for TV, which not support Power Off event
-   (dirkhe) change some states role switch to button

### 1.1.4 (2020-02-07)

-   (dirkhe) changed from pull to subscribing
-   (dirkhe) add livetv to launch list

### 1.1.3 (2019-12-16)

-   (merdok) fixed connect() [Pull requests #62](https://github.com/SebastianSchultz/ioBroker.lgtv/pull/62)
-   (instalator) fixed [issues #64](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/64)
-   (instalator) change error log to debug [issues #59](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/59)

### 1.1.1 (2019-10-26)

-   (instalator) Safe keyfile to /opt/iobroker [issues #52](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/52)
-   (instalator) fix error reconect
-   (instalator) fix raw object
-   (instalator) add mac address to admin settings

### 1.1.0 (2019-10-10)

-   (instalator) adding object remote.KEY
-   (instalator) fix connect to TV
-   (instalator) add subscribe volume and mute state
-   (instalator) translate admin to RUS
-   (instalator) add Turn On, using WOL
-   (instalator) adding new different objects
-   (SebastianSchultz) changed roles "button" to "switch" for compatibility for iot- & cloud-adapter

### 1.0.8 (2019-03-15)

-   (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)

-   (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)

-   (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)

-   (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)

-   (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
-   (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)

-   (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
-   (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)

-   (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)

-   (SebastianSchultz) added channel polling
-   (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)

-   (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)

-   (SebastianSchultz) added volumeUp true|false
-   (SebastianSchultz) added volumeDown true|false
-   (SebastianSchultz) added 3Dmode true|false
-   (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
-   (SebastianSchultz) added channel <channelNumber>
-   (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)

-   (SebastianSchultz) removed reconnect function, not used
-   (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)

-   (SebastianSchultz) initial commit

---

## License

MIT License

Copyright (c) 2023 Sebastian Schultz.

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