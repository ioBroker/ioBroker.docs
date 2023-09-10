---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kodi/README.md
title: Kodi für ioBroker (JSON-RPC-API)
hash: qAlRZtML3qdXIoe7sRiqtDoHz6EMGa0+6KEfbAqyHPE=
---
![Logo](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kodi.svg)
![Anzahl der Installationen](http://iobroker.live/badges/kodi-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.kodi.png?downloads=true)

# Kodi für ioBroker (JSON-RPC API)
[![Tests](https://github.com/instalator/iobroker.kodi/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.kodi/actions/)

[Englisches Handbuch](https://github.com/instalator/ioBroker.kodi/wiki/en_EN)

Sie können eine offizielle Dokumentation von KODI über die API JSON-RCP [Tut](http://kodi.wiki/view/JSON-RPC_API) und polnischer Quelltext des Befehls (ab Protokollversion 6) [Tut](http://kodi.wiki/view/JSON-RPC_API/v6) lesen.

## KODI-Konfiguration
Включение удаленного управления и веб-сервера.
![Fernbedienungsfreigabe.](../../../en/adapterref/iobroker.kodi/admin/remote.png)

Die JSON-RPC-API wird **über Port 9090** bereitgestellt, damit diese Personen keine Einträge in der Datei [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml) vornehmen können.

_Hinweis: Die Datei advancedsettings.xml wird nicht aktualisiert. Вы должны сначала создать его!_

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

## Конфигурация драйвера
Der installierte Adapter bietet eine IP-Adresse und einen Port für die JSON-RPC-API (ab Version 9090) sowie ein Login/Paar für die Bereitstellung auf dem Web-Server Kodi.

## Использование
### ShowNotif:
Один важный момент, если используется заголовок сообщения, то он должен всегда находится перед самим текстом сообщения (Внимание;Протечка воды), расположение остальных параметров не критично.

**Bild:** Уровень сообщения

  * 'info' - 0 (Standard),
  * 'Warnung' - 1,
  * 'Fehler' - 2.

**Anzeigezeit:** Anzeigedauer in Millionen, minimal 1500 bis 30000 Minuten.

**Пример:**

 * 1;Внимание;Протечка воды;15000
 * Внимание;Протечка воды;2;10000
 * Внимание;Протечка воды
 * Протечка воды

Mit dieser Funktion können Sie den Javascript-Downloader aufrufen:

```js
sendTo("kodi.0", {
    message:  'Возможно протечка воды ', //Текст сообщения
    title:    'ВНИМАНИЕ!!!', //Заголовок сообщения
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', //Ссылка на иконку
    delay: 7000 //Время отображения сообщения миллисекундах (минимум 1500 макс 30000 мс)
});
```

### SwitchPVR:
Sperren von PVR-IPTV-Kanälen bei der Suche nach Kanälen auf der Website.
**Beispiel:** Der Fernsehsender „Discovery Science“ ist auf die Suche nach mehr Informationen zum Thema „Entdecken“ ausgerichtet.

### Youtube:
Um das Video auf der YouTube-Seite zu sehen, müssen Sie den Videocode im aktuellen Status herunterladen. Ab der Version 0.1.5 können Sie die Software auf Video, zusätzlich zum Code oder auf der Wiedergabesoftware herunterladen.
Beispiel: Um diese [видео](https://www.youtube.com/watch?v=Bvmxr24D4TA) zu öffnen, muss der Status geändert werden - Bvmxr24D4TA

### Offen:
Es wird eine Liste mit Medikamenteninhalten in Internet-Websites erstellt, die in die lokale Mediendatenbank aufgenommen wurden.
Nach der Download-Nachricht erfolgt die Weitergabe an den KODI-Benutzer.

### Position:
Текущая позиция в плейлисте, так же в этот статус можно записать необходимую позицую и KODI тут же перейдет к воспроизведению этой позиции.

### Suchen:
Die folgenden Ergebnisse werden in Prozenten von 0 bis 100 angezeigt.

### Wiederholen:
Повтор воспроизведения, принимает следующие значения:

* aus - Повтор воспроизведения отключен
* on - повтор воспроизведения текущего трека
* all - повтор всего плейлиста

### Mischen:
Detaillierte Beschreibung des Weges auf der Playlist zur sicheren Weitergabe.
Bedeutet: wahr und falsch

### Spielen:
Start der Anzeige (wahr, falsch)

### Geschwindigkeit:
Скорость воспроизведения. Reduzierte Werte (-32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32) sowie 'Inkrement' und 'Dekrement'

### Verzeichnis:
Сюда записывается путь до папки или диска, в ответ в этот статус записывается список каталогов указанной папки или диска.

### ActivateWindow:
Активизирует в проигрывателе окно. Поддерживает следующий список:

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### ExecuteAction:
Можно выполнить одно из следующих действий:

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

### System:
 - EjectOpticalDrive - Erfasst oder schließt optische Disks (wird nicht angezeigt)
 - Ruhezustand – Ausschalten des Schlafmodus
 - Neustart - Systemwiederherstellung
 - Herunterfahren - System wird ausgeschaltet
 - Suspend – unterstützt Kodi

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
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