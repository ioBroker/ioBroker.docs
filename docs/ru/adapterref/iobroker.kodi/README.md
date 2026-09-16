---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kodi/README.md
title: Kodi для ioBroker (JSON-RPC API)
hash: WD+B67O3x1VVe/JIfx+c6M8RQyk3bpqAUVaka8vfF44=
---
![Логотип](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.kodi.svg)
![Количество установок](http://iobroker.live/badges/kodi-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![Тесты](https://github.com/instalator/iobroker.kodi/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)
![НПМ](https://nodei.co/npm/iobroker.kodi.png?downloads=true)

# Kodi для IoBroker (JSON-RPC API)

[Инструкция на английском языке](https://github.com/instalator/ioBroker.kodi/wiki/en_EN)

Официальную документацию KODI по API JSON-RPC можно найти [здесь](http://kodi.wiki/view/JSON-RPC_API) , а полный список доступных команд (для версии протокола 6) [— здесь](http://kodi.wiki/view/JSON-RPC_API/v6) .

## Настройка KODI

Включите удалённое управление и веб-сервер.![Включить дистанционное управление.](../../../en/adapterref/iobroker.kodi/admin/remote.png)

API JSON-RPC **по умолчанию использует порт 9090.** Чтобы изменить его, необходимо внести изменения в файл [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml) .

_Примечание: файл advancedsettings.xml по умолчанию отсутствует. Его необходимо создать!_

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

## Конфигурация адаптера

В настройках адаптера укажите IP-адрес и порт для JSON-RPC API (по умолчанию 9090), а также логин/пароль для доступа к веб-серверу Kodi.

## Использование

### ShowNotif:

Важный момент: если используется заголовок сообщения, он всегда должен располагаться перед самим текстом сообщения (Предупреждение;Утечка воды). Положение других параметров не имеет решающего значения.

**Изображение:** Уровень сообщения

- 'info' - 0 (по умолчанию),
- 'предупреждение' - 1,
- 'ошибка' - 2.

**displaytime:** Время отображения сообщения в миллисекундах, минимум 1500, максимум 30000 мс.

**Пример:**

- 1;Предупреждение;Утечка воды;15000
- Предупреждение; Утечка воды; 2; 10000
- Внимание! Утечка воды!
- Утечка воды

Вы также можете отправлять сообщения из JavaScript-адаптера:

```js
sendTo("kodi.0", {
    message:  'Possible water leak', // Message text
    title:    'WARNING!!!', // Message title
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', // Icon URL
    delay: 7000 // Message display time in milliseconds (minimum 1500, maximum 30000 ms)
});
```

### SwitchPVR:

Переключение каналов IPTV через PVR по названию канала в плейлисте. **Пример:** телеканал Discovery Science можно найти по полному названию или по слову «discover».

### YouTube:

Чтобы открыть видео с YouTube, просто добавьте код видео в это состояние. Начиная с версии 0.1.5 и выше, вы можете вставить прямую ссылку на видео, а также код или полную ссылку на плейлист. Например: Чтобы открыть это [видео](https://www.youtube.com/watch?v=Bvmxr24D4TA) , вам нужно установить состояние на - Bvmxr24D4TA

### Открыть:

Укажите здесь ссылку на медиаконтент в интернете или путь к локальному медиафайлу. После ввода значения воспроизведение на плеере KODI начнётся.

### Позиция:

Текущая позиция в плейлисте. Вы также можете указать желаемую позицию в этом состоянии, и KODI немедленно переключится на воспроизведение с этой позиции.

### Искать:

Значение текущей позиции воспроизведения в процентах от 0 до 100.

### Повторить:

Функция повторного воспроизведения принимает следующие значения:

- выключено - повторное воспроизведение отключено
- Вкл. - повторить текущий трек
- все - повторить весь плейлист

### Перетасовать:

Перемешать список треков в плейлисте для случайного воспроизведения. Принимает значения.`true` и`false`

### Играть:

Начать воспроизведение (true, false)

### Скорость:

Скорость воспроизведения. Фиксированные значения (-32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32), а также «приращение» и «уменьшение».

### Каталог:

Укажите здесь путь к папке или диску. В ответ на это в это состояние будет записан список каталогов указанной папки или диска.

### Активировать окно:

Активирует окно в плеере. Поддерживается следующий список:

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### Выполнить действие:

Вы можете выполнить одно из следующих действий:

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

### Система:

- EjectOpticalDrive — Извлекает или закрывает оптический привод (если он имеется).
- Режим гибернации — включает режим гибернации.
- Перезагрузка - Перезагружает систему
- Выключение — завершает работу системы.
- Приостановить — приостанавливает работу Kodi

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.kodi/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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