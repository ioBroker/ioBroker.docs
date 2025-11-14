---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kodi/README.md
title: Kodi für ioBroker (JSON-RPC-API)
hash: ZUy0c9iz7AxVkXOTVvExriEdabj/qUiYSFRR7DnLiS0=
---
![Logo](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kodi.svg)
![Anzahl der Installationen](http://iobroker.live/badges/kodi-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.kodi.png?downloads=true)

# Kodi für ioBroker (JSON-RPC-API)
[![Tests](https://github.com/instalator/iobroker.kodi/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.kodi/actions/)

[Englische Bedienungsanleitung](https://github.com/instalator/ioBroker.kodi/wiki/en_EN)

Die offizielle KODI-Dokumentation zur JSON-RPC-API finden Sie unter [hier](http://kodi.wiki/view/JSON-RPC_API) und die vollständige Liste der verfügbaren Befehle (für Protokollversion 6) [hier](http://kodi.wiki/view/JSON-RPC_API/v6).

## KODI-Konfiguration
Fernsteuerung und Webserver aktivieren.

![Fernsteuerung aktivieren.](../../../en/adapterref/iobroker.kodi/admin/remote.png)

Die JSON-RPC-API verwendet **standardmäßig Port 9090**. Um dies zu ändern, müssen Sie Änderungen an der Datei [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml) vornehmen.

Hinweis: Die Datei advancedsettings.xml existiert standardmäßig nicht. Sie müssen sie zuerst erstellen!

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

## Adapterkonfiguration
In den Adaptereinstellungen geben Sie die IP-Adresse und den Port für die JSON-RPC-API (Standard 9090) sowie Benutzername und Passwort für den Zugriff auf den Kodi-Webserver an.

## Verwendung
### ShowNotif:
Wichtig: Falls eine Meldungsüberschrift verwendet wird, muss diese immer vor dem eigentlichen Meldungstext stehen (Warnung;Wasserleck). Die Position der übrigen Parameter ist nicht kritisch.

**Bild:** Nachrichtenebene

* 'info' - 0 (Standardwert),
* 'Warnung' - 1,
* 'Fehler' - 2.

**Anzeigedauer:** Anzeigedauer der Nachricht in Millisekunden, Minimum 1500, Maximum 30000 ms.

**Beispiel:**

* 1;Warnung;Wasserleck;15000
* Warnung;Wasserleck;2;10000
* Warnung; Wasserleck
* Wasserleck

Sie können auch Nachrichten über einen JavaScript-Adapter senden:

```js
sendTo("kodi.0", {
    message:  'Possible water leak', // Message text
    title:    'WARNING!!!', // Message title
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', // Icon URL
    delay: 7000 // Message display time in milliseconds (minimum 1500, maximum 30000 ms)
});
```

### SwitchPVR:
Wechseln Sie PVR-IPTV-Kanäle anhand des Kanalnamens in der Wiedergabeliste.

**Beispiel:** Der Fernsehkanal „Discovery Science“ kann über den vollständigen Namen oder über „discover“ gefunden werden.

### YouTube:
Um ein YouTube-Video zu öffnen, schreiben Sie einfach den Videocode in diesen Status. Ab Version 0.1.5 können Sie einen direkten Link zum Video sowie den Code oder den vollständigen Link zu einer Playlist einfügen.

Beispiel: Um dieses Video [Video](https://www.youtube.com/watch?v=Bvmxr24D4TA) zu öffnen, müssen Sie den Status auf -Bvmxr24D4TA setzen.

### Offen:
Geben Sie hier den Link zu Medieninhalten im Internet oder den Pfad zu einer lokalen Mediendatei ein.
Nachdem Sie den Wert eingegeben haben, startet die Wiedergabe im Kodi-Player.

### Position:
Aktuelle Position in der Wiedergabeliste. Sie können hier auch die gewünschte Position angeben, und KODI wechselt sofort zu dieser Position.

### Suchen:
Aktueller Wiedergabepositionswert als Prozentsatz von 0 bis 100.

### Wiederholen:
Die Wiedergabe kann wiederholt werden und akzeptiert folgende Werte:

* Aus – Wiederholungswiedergabe deaktiviert
* an - Aktuellen Titel wiederholen
* alle - gesamte Wiedergabeliste wiederholen

### Mischen:
Die Titel in der Playlist werden für die zufällige Wiedergabe gemischt.
Akzeptiert die Werte `true` und `false`

### Spielen:
Wiedergabe starten (wahr, falsch)

### Geschwindigkeit:
Wiedergabegeschwindigkeit. Feste Werte (-32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32) sowie „inkrementieren“ und „verringern“.

### Verzeichnis:
Geben Sie hier den Pfad zu einem Ordner oder Laufwerk an. Daraufhin wird eine Liste der Verzeichnisse des angegebenen Ordners oder Laufwerks in diesem Fenster gespeichert.

### ActivateWindow:
Aktiviert ein Fenster im Player. Unterstützt die folgende Liste:

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### ExecuteAction:
Sie können eine der folgenden Aktionen ausführen:

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

### System:
- Optisches Laufwerk auswerfen - Wirft das optische Laufwerk aus oder schließt es (falls vorhanden)
- Ruhezustand - Aktiviert den Ruhezustand
- Neustart - Startet das System neu.
- Herunterfahren - Schaltet das System aus.
- Anhalten - Kodi wird angehalten

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.1.0 (2024-04-18)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 3.0.0 (2023-09-08)
* (agross) Fixed seeking on Kodi >= 19
* (bluefox) Supported only node.js versions >= 16

### 2.0.9 (2022-12-08)
* (Apollon77) Prevent crash if received data from Kodi are not valid UTF-8
* (Apollon77) Optimize Adapter unload

### 2.0.8
* Important: js-controller >= 2.0.0 is required at least
* (Apollon77) Update kode-ws dependency
* (Apollon77) Prevent some js-controller 3.3. errors

### 2.0.7
* (instalator) fixed error subscribeNotification Player.OnResume [issues 49](https://github.com/instalator/ioBroker.kodi/issues/49)
* (instalator) added user ratings [issues 57](https://github.com/instalator/ioBroker.kodi/issues/57)
* (instalator) fix error [issues 58](https://github.com/instalator/ioBroker.kodi/issues/58)
* (instalator) fixed error widgets

#### 2.0.5
* (instalator) changed css classes
* (instalator) fixed error

#### 2.0.4
* (instalator) fixed thumbnails widget
* (instalator) fixed info.tagline

#### 2.0.2
* (instalator) changed title in io-package.json
* (instalator) changed seek
* (instalator) fixed widgets
* (instalator) fixed for thumbnails

#### 2.0.1 (2020-04-13)
* (instalator) fixed error if not used PVR

#### 2.0.0 (2020-04-12)
* (instalator) support admin3
* (instalator) support compact mode
* (instalator) refactoring
* (instalator) fixed different error
* (instalator) added english manual
* (instalator) big change code

#### 1.0.0 (2017-11-13)
* (instalator) up to stable

#### 0.2.4 (2017-10-16)
* (instalator) fix error

#### 0.2.3 (2017-08-15)
* (instalator) fix error switchPVR
* (instalator) Added description "System" to readme

#### 0.2.2 (2017-08-14)
* (instalator) added object - System (EjectOpticalDrive, Hibernate, Reboot, Shutdown, Suspend)
* (instalator) fix playlist widget

#### 0.2.0 (2017-01-07)
* (instalator) added object - state
* (instalator) change repeat to bool


#### 0.1.9 (2017-01-05)
* (instalator) change for vis-players

#### 0.1.8 (2016-12-25)
* (instalator) change open youtube playlist

#### 0.1.6 (2016-12-23)
* (instalator) added Tests
* (instalator) added open youtube playlist and open youtube link

#### 0.1.4 (2016-07-05)
* (instalator) fix error for Open
* (instalator) fix method number

#### 0.1.3
* (bluefox) fix error milti instance

#### 0.1.2 (2016-07-05)
* (instalator) change pvr switch - add stop
* (instalator) change dependencies
* (instalator) fix change play/stop state

#### 0.1.1 (2016-05-30)
* (instalator) change admin setting
* (instalator) Fix error 'playerid' of undefined

#### 0.1.0 (2016-05-22)
* (instalator) beta

#### 0.0.6 (2016-05-08)
* (bluefox) fixed crash when the driver turned on the KODI
* (bluefox) make adapter disabled by default, because no IP set
* (instalator) Thumbnail widget
* (instalator) added GetDirectory, GetVideoLibrary
* (instalator) added Scan & Clean Library

#### 0.0.5 (2016-05-04)
* (instalator) change creating object
* (instalator) added info.connection state

#### 0.0.4 (2016-05-03)
* (instalator) fix error
* (instalator) added VIS widgets

#### 0.0.3 (2016-05-01)
* (instalator) fix error
* (instalator) added send message from JS

#### 0.0.2 (2016-04-24)
* (instalator) remote player
* (instalator) ShowNotification
* (instalator) info playing
* (instalator) GetPVRChannel

#### 0.0.1
* (instalator) initial (17.04.2016)

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2023 ioBroker Community and instalator <vvvalt@mail.ru>

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