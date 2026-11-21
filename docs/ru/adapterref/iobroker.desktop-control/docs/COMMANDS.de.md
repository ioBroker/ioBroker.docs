---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md
title: Befehlsreferenz
hash: Db0FEQE5MKG8QqRqKcGjIuyAubVxxq+FEUDiyHc4/gA=
---
# Befehlsreferenz

_Английская версия: [COMMANDS.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.md)_

_Automatisch erzeugt aus `WinCtl.exe --dump-protocol` (Протокол 1, версия 0.6.4). Нихт фон Хандэндерн._

Befehle werden an `{base}/{id}/cmd/<befehl>` gesendet (Полезная нагрузка: JSON-Объект или - bei Befehlen mit _Kurzform_ - ein einfacher String).

## Система

### `ping`

Lebenszeichen - ответ на Zeitstempel и версию

### `get_state`

Veröffentlicht alle State-Werte sofort neu

### `reload_config`

Config-Datei neu einlesen und neu verbinden

### `exit` _(⚠ sicherheitsrelevant)_

Beendet den Agent

### `list_commands`

Gibt die Liste aller Befehle zurück

### `check_update`

Prüft, ob es eine neuere WinCtl-Version gibt (GitHub-Releases)

### `update`

Установите новую версию WinCtl и запустите новый агент.

## Энергия и сиденье

### `lock`

Sperrt den Bildschirm (Win+L)

### `sleep`

Поддерживать

### `hibernate`

Рухезустанд

### `shutdown`

Fährt den PC herunter\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"delay": "<text>"}`.

Примеры:

```
60
{"delay":0,"force":true}
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание                      |
| -------- | ----------- | ------ | -------- | ----------------------------- |
| `delay`  | целое число |        | 10       | Verzögerung in Sekunden       |
| `force`  | логический  |        | ЛОЖЬ     | Программа Цвангсвайзе Шлиссен |

### `restart`

Startet den PC neu\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"delay": "<text>"}`.

Примеры:

```
30
{"delay":0,"force":true}
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание                      |
| -------- | ----------- | ------ | -------- | ----------------------------- |
| `delay`  | целое число |        | 10       | Verzögerung in Sekunden       |
| `force`  | логический  |        | ЛОЖЬ     | Программа Цвангсвайзе Шлиссен |

### `logoff`

Meldet den Benutzer ab

### `cancel_shutdown`

Bricht einen geplanten Останов/Нойстарт ab

### `monitor_off`

Schaltet die Monitore aus

### `monitor_on`

Weckt die Monitore auf

### `screensaver`

Startet den Bildschirmschoner (в Windows eingestellte или eine .scr-Datei)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"file": "<text>"}`.

Примеры:

```
{"file":"C:/Windows/System32/Mystify.scr"}
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание                                                     |
| -------- | ---- | ------ | -------- | ------------------------------------------------------------ |
| `file`   | нить |        | ""       | Pfad zu einer .scr-Datei (leer = der в Windows eingestellte) |

### `keep_awake` _(требуется GUI-сиденье)_

Verhindert Standby/Bildschirmschoner (bis auf Widerruf)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"state": "<text>"}`.

Примеры:

```
{"state":true,"display":false}
```

| Параметр  | Тип        | Пфлихт | Стандарт | Описание                 |
| --------- | ---------- | ------ | -------- | ------------------------ |
| `state`   | логический |        | истинный | ан/аус                   |
| `display` | логический |        | истинный | auch Bildschirm anlassen |

## Программа и фенстер

### `run` _(⚠ sicherheitsrelevant)_

Запустите программу (псевдоним aus der Config или - wenn erlaubt - beliebiger Pfad) с параметрами\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"path": "<text>"}`.

Примеры:

```
notepad
{"path":"kodi","args":"--fullscreen","window":"maximized"}
```

| Параметр  | Тип         | Пфлихт | Стандарт | Описание                                                 |
| --------- | ----------- | ------ | -------- | -------------------------------------------------------- |
| `path`    | нить        | джа    |          | Псевдоним (zB 'блокнот') или Pfad zur .exe               |
| `args`    | нить        |        |          | Параметр в виде строки или списка                        |
| `workdir` | нить        |        |          | Arbeitsverzeichnis                                       |
| `hidden`  | логический  |        |          | Ohne Fenster starten                                     |
| `window`  | нить        |        |          | Состояние окна (нормальное / минимальное / максимальное) |
| `admin`   | логический  |        |          | Альс Администратор (UAC-Abfrage am PC!)                  |
| `wait`    | логический  |        |          | Auf Ende Warten und Exit-Code zurückgeben                |
| `timeout` | целое число |        | 60       | Wartezeit in Sekunden bei wait                           |

### `open`

URL-адрес отключения сети, дата или порядок использования стандартного приложения (Dateien/Ordner nur mit AllowAnyRun)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"target": "<text>"}`.

Примеры:

```
https://www.iobroker.net
ms-settings:display
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание                              |
| -------- | ---- | ------ | -------- | ------------------------------------- |
| `target` | нить | джа    |          | URL (immer erlaubt), sonst Alias/Pfad |

### `kill` _(⚠ sicherheitsrelevant)_

Выполните процедуру для имени или PID\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"name": "<text>"}`.

Примеры:

```
notepad
{"pid":1234}
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание                 |
| -------- | ----------- | ------ | -------- | ------------------------ |
| `name`   | нить        |        |          | Prozessname, zB 'chrome' |
| `pid`    | целое число |        |          | Идентификатор процесса   |

### `list_processes`

Listet laufende Prozesse (макс. 300)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"filter": "<text>"}`.

Примеры:

```
chrome
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание     |
| -------- | ---- | ------ | -------- | ------------ |
| `filter` | нить |        |          | Namensfilter |

### `list_windows`

Listet sichtbare Fenster mit Titel

### `focus_window`

Bringt ein Fenster (Titel enthält ...) в ден Vordergrund\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"title": "<text>"}`.

Примеры:

```
Kodi
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание               |
| -------- | ---- | ------ | -------- | ---------------------- |
| `title`  | нить | джа    |          | Teil des Fenstertitels |

### `close_window`

Schließt ein Fenster sauber (Titel enthält ...)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"title": "<text>"}`.

Примеры:

```
Editor
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание               |
| -------- | ---- | ------ | -------- | ---------------------- |
| `title`  | нить | джа    |          | Teil des Fenstertitels |

### `minimize_all`

Alle Fenster minimieren (Настольный компьютер) bzw. Видерхерстеллен

Примеры:

```
{"undo":true}
```

| Параметр | Тип        | Пфлихт | Стандарт | Описание                          |
| -------- | ---------- | ------ | -------- | --------------------------------- |
| `undo`   | логический |        | ЛОЖЬ     | Wiederherstellen statt minimieren |

### `empty_recycle_bin`

Leert den Papierkorb

### `shell` _(⚠ sicherheitsrelevant)_

Führt einen Shell-Befehl aus und Lifert die Ausgabe (Nur mit AllowShell=true)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"command": "<text>"}`.

Примеры:

```
Get-Date
{"command":"ipconfig","shell":"cmd"}
```

| Параметр  | Тип         | Пфлихт | Стандарт     | Описание                         |
| --------- | ----------- | ------ | ------------ | -------------------------------- |
| `command` | нить        | джа    |              | Befehl / Skript                  |
| `shell`   | нить        |        | "powershell" | Интерпретатор (PowerShell / CMD) |
| `timeout` | целое число |        | 30           | Секунден                         |

## Аудио

### `volume`

Setzt die Master-Lautstärke (0-100)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"level": "<text>"}`.

Примеры:

```
30
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание |
| -------- | ----------- | ------ | -------- | -------- |
| `level`  | целое число | джа    |          | 0 - 100  |

### `volume_change`

Lautstärke relativ ändern\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"delta": "<text>"}`.

Примеры:

```
-10
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание      |
| -------- | ----------- | ------ | -------- | ------------- |
| `delta`  | целое число |        | 5        | zB 5 oder -10 |

### `mute`

Stummschalten / aufheben / umschalten\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"state": "<text>"}`.

Примеры:

```
toggle
```

| Параметр | Тип  | Пфлихт | Стандарт      | Описание                     |
| -------- | ---- | ------ | ------------- | ---------------------------- |
| `state`  | нить |        | "переключать" | true / false / переключатель |

### `media`

Sendet eine Medientaste\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"key": "<text>"}`.

Примеры:

```
playpause
next
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание                                                                                                                                  |
| -------- | ---- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `key`    | нить | джа    |          | Medientaste (воспроизведение/пауза / следующий / предыдущий / остановка / увеличение громкости / уменьшение громкости / отключение звука) |

### `speak`

Преобразование текста в речь (Windows-Stimme)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Das Essen ist fertig
{"text":"Achtung","voice":"Hedda","rate":2,"volume":80}
```

| Параметр    | Тип         | Пфлихт | Стандарт | Описание                           |
| ----------- | ----------- | ------ | -------- | ---------------------------------- |
| `text`      | нить        | джа    |          | Zu sprechender Text                |
| `voice`     | нить        |        |          | Teil des Stimmennamens, zB 'Hedda' |
| `rate`      | целое число |        | 0        | -10 (лангсам) до 10 (шнель)        |
| `volume`    | целое число |        | 100      | 0-100                              |
| `wait`      | логический  |        |          | Warten bis fertig gesprochen       |
| `interrupt` | логический  |        | истинный | Laufende Ausgabe abbrechen         |

### `list_voices`

Список установок TTS-Stimmen

### `play_sound`

Spielt eine Audiodatei (mp3/wav/wma, URL-адрес или URL-адрес)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"source": "<text>"}`.

Примеры:

```
http://192.168.1.5/gong.mp3
{"source":"C:\\Sounds\\klingel.wav","wait":true}
```

| Параметр | Тип        | Пфлихт | Стандарт | Описание            |
| -------- | ---------- | ------ | -------- | ------------------- |
| `source` | нить       | джа    |          | Pfad или URL        |
| `wait`   | логический |        | ЛОЖЬ     | Warten bis zum Ende |

### `stop_sound`

Stoppt play\_sound / speak

### `beep`

Эйнфахер Пиптон

Примеры:

```
{"freq":1200,"ms":500}
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание   |
| -------- | ----------- | ------ | -------- | ---------- |
| `freq`   | целое число |        | 800      | Гц         |
| `ms`     | целое число |        | 300      | Дауэр в мс |

## Anzege

### `show_image` _(требуется GUI-сиденье)_

Zeigt ein Bild als Popup, Vollbild или Ecken-Einblendung (Pfad, URL или Base64)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"source": "<text>"}`.

Примеры:

```
http://kamera/snapshot.jpg
{"source":"http://kamera/snapshot.jpg","mode":"corner","position":"top-right","size":30,"seconds":10,"caption":"Haustür","slot":"klingel"}
{"source":"https://picsum.photos/1920/1080","mode":"fullscreen","seconds":15}
```

| Параметр        | Тип         | Пфлихт | Стандарт                | Описание                                                                                                                                     |
| --------------- | ----------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`        | нить        | джа    |                         | Pfad, http(s)-URL данные заказа:-URI                                                                                                         |
| `base64`        | нить        |        |                         | Альтернатива: Base64-Daten                                                                                                                   |
| `fit`           | нить        |        | "содержать"             | Скалиерунг (содержать/растягивать/центрировать)                                                                                              |
| `mode`          | нить        |        | "неожиданно возникнуть" | popup = Fenster in der Mitte, полноэкранный режим = Vollbild, угол = Ecke (zB Türklingel-Kamera) (всплывающее окно/полноэкранный режим/угол) |
| `seconds`       | число       |        |                         | Автоматическое закрытие на X секунд (0 = нажатие на кнопку/закрытие всплывающих окон)                                                        |
| `monitor`       | целое число |        | -1                      | Индекс монитора (0 = erster, -1 = Hauptmonitor)                                                                                              |
| `position`      | нить        |        | "внизу справа"          | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right)                              |
| `size`          | число       |        |                         | Брейт в % от Bildschirms (5 - 100, Seitenverhältnis bleibt; просмотр = автоматически: Ecke 28 %, Popup макс. 70 %)                           |
| `margin`        | целое число |        | 16                      | Abstand zum Bildschirmrand в пикселе (режим = угол)                                                                                          |
| `border`        | целое число |        | 2                       | Рахменбрайт в пикселях (0 = Кейн Рахмен)                                                                                                     |
| `border_color`  | нить        |        | "#282828"               | Rahmenfarbe, zB #ff0000                                                                                                                      |
| `caption_size`  | число       |        | 11                      | Schriftgröße der Beschriftung                                                                                                                |
| `caption_color` | нить        |        | "#ffffff"               | Farbe der Beschriftung                                                                                                                       |
| `caption`       | нить        |        |                         | Beschriftung unter dem Inhalt                                                                                                                |
| `slot`          | нить        |        |                         | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                                                      |
| `click_close`   | логический  |        |                         | Klick schließt das Popup                                                                                                                     |
| `opacity`       | число       |        |                         | Deckkraft 0.1 - 1                                                                                                                            |
| `activate`      | логический  |        | ЛОЖЬ                    | Fokus übernehmen (Стандарт: nein, stört nicht beim Arbeiten)                                                                                 |
| `bg`            | нить        |        |                         | Hintergrundfarbe, zB #000000                                                                                                                 |

### `show_video` _(требуется GUI-сиденье)_

Просмотр видео с (дата или URL-адрес; с Edge mp4/H.264, WebM, Ogg, а также с кодеками Windows и HEVC)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"source": "<text>"}`.

Примеры:

```
http://server/video.mp4
{"source":"http://server/video.mp4","mode":"corner","position":"bottom-left","size":25,"muted":true,"loop":true}
{"source":"C:\\Videos\\intro.mp4","mode":"fullscreen","close_when_done":true}
```

| Параметр          | Тип         | Пфлихт | Стандарт                | Описание                                                                                                                                     |
| ----------------- | ----------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`          | нить        | джа    |                         | Pfad или URL                                                                                                                                 |
| `loop`            | логический  |        | ЛОЖЬ                    | Эндлосшляйфе                                                                                                                                 |
| `muted`           | логический  |        | ЛОЖЬ                    | Оне Тон                                                                                                                                      |
| `volume`          | число       |        | 1                       | 0 - 1                                                                                                                                        |
| `controls`        | логический  |        | ЛОЖЬ                    | Bedienelemente anzeigen                                                                                                                      |
| `close_when_done` | логический  |        | истинный                | Nach Ende schließen                                                                                                                          |
| `engine`          | нить        |        | "авто"                  | Player: auto = Edge (WebView2), sonst IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                                              |
| `mode`            | нить        |        | "неожиданно возникнуть" | popup = Fenster in der Mitte, полноэкранный режим = Vollbild, угол = Ecke (zB Türklingel-Kamera) (всплывающее окно/полноэкранный режим/угол) |
| `seconds`         | число       |        |                         | Автоматическое закрытие на X секунд (0 = нажатие на кнопку/закрытие всплывающих окон)                                                        |
| `monitor`         | целое число |        | -1                      | Индекс монитора (0 = erster, -1 = Hauptmonitor)                                                                                              |
| `position`        | нить        |        | "внизу справа"          | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right)                              |
| `size`            | число       |        |                         | Брейт в % от Bildschirms (5 - 100, Seitenverhältnis bleibt; просмотр = автоматически: Ecke 28 %, Popup макс. 70 %)                           |
| `margin`          | целое число |        | 16                      | Abstand zum Bildschirmrand в пикселе (режим = угол)                                                                                          |
| `border`          | целое число |        | 2                       | Рахменбрайт в пикселях (0 = Кейн Рахмен)                                                                                                     |
| `border_color`    | нить        |        | "#282828"               | Rahmenfarbe, zB #ff0000                                                                                                                      |
| `caption_size`    | число       |        | 11                      | Schriftgröße der Beschriftung                                                                                                                |
| `caption_color`   | нить        |        | "#ffffff"               | Farbe der Beschriftung                                                                                                                       |
| `caption`         | нить        |        |                         | Beschriftung unter dem Inhalt                                                                                                                |
| `slot`            | нить        |        |                         | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                                                      |
| `click_close`     | логический  |        |                         | Klick schließt das Popup                                                                                                                     |
| `opacity`         | число       |        |                         | Deckkraft 0.1 - 1                                                                                                                            |
| `activate`        | логический  |        | ЛОЖЬ                    | Fokus übernehmen (Стандарт: nein, stört nicht beim Arbeiten)                                                                                 |
| `bg`              | нить        |        |                         | Hintergrundfarbe, zB #000000                                                                                                                 |

### `show_web` _(требуется GUI-сиденье)_

Zeigt eine Webseite (zB vis, Lovelace, Kamera-Stream) с Edge/Chromium в вашем Fenster или в Kiosk-Vollbild, а также лучше в Wechsel (Diashow)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"url": "<text>"}`.

Примеры:

```
http://192.168.1.5:8082/vis/
{"url":"http://192.168.1.5:8082/vis/","mode":"fullscreen"}
{"urls":["http://192.168.1.5:8082/vis/","http://kamera/snapshot.jpg"],"interval":20,"mode":"fullscreen"}
{"url":"http://kamera/stream","mode":"corner","size":35,"seconds":30,"slot":"kamera"}
```

| Параметр        | Тип         | Пфлихт | Стандарт                | Описание                                                                                                                                     |
| --------------- | ----------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`           | нить        |        |                         | Адрес (или URL-адреса для вашего диа-шоу)                                                                                                    |
| `urls`          | множество   |        |                         | Диа-шоу: Mehrere Adressen, wechseln nach 'interval' Sekunden                                                                                 |
| `interval`      | число       |        | 30                      | Diashow: Sekunden je Seite                                                                                                                   |
| `zoom`          | число       |        | 1                       | Масштабирование, например, 1,25 = 125 % (только Edge)                                                                                        |
| `engine`        | нить        |        | "авто"                  | Браузер: auto = Edge (WebView2), sonst IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                                             |
| `mode`          | нить        |        | "неожиданно возникнуть" | popup = Fenster in der Mitte, полноэкранный режим = Vollbild, угол = Ecke (zB Türklingel-Kamera) (всплывающее окно/полноэкранный режим/угол) |
| `seconds`       | число       |        |                         | Автоматическое закрытие на X секунд (0 = нажатие на кнопку/закрытие всплывающих окон)                                                        |
| `monitor`       | целое число |        | -1                      | Индекс монитора (0 = erster, -1 = Hauptmonitor)                                                                                              |
| `position`      | нить        |        | "внизу справа"          | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right)                              |
| `size`          | число       |        |                         | Брейт в % от Bildschirms (5 - 100, Seitenverhältnis bleibt; просмотр = автоматически: Ecke 28 %, Popup макс. 70 %)                           |
| `margin`        | целое число |        | 16                      | Abstand zum Bildschirmrand в пикселе (режим = угол)                                                                                          |
| `border`        | целое число |        | 2                       | Рахменбрайт в пикселях (0 = Кейн Рахмен)                                                                                                     |
| `border_color`  | нить        |        | "#282828"               | Rahmenfarbe, zB #ff0000                                                                                                                      |
| `caption_size`  | число       |        | 11                      | Schriftgröße der Beschriftung                                                                                                                |
| `caption_color` | нить        |        | "#ffffff"               | Farbe der Beschriftung                                                                                                                       |
| `caption`       | нить        |        |                         | Beschriftung unter dem Inhalt                                                                                                                |
| `slot`          | нить        |        |                         | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                                                      |
| `click_close`   | логический  |        |                         | Klick schließt das Popup                                                                                                                     |
| `opacity`       | число       |        |                         | Deckkraft 0.1 - 1                                                                                                                            |
| `activate`      | логический  |        | ЛОЖЬ                    | Fokus übernehmen (Стандарт: nein, stört nicht beim Arbeiten)                                                                                 |
| `bg`            | нить        |        |                         | Hintergrundfarbe, zB #000000                                                                                                                 |

### `show_text` _(требуется GUI-сиденье)_

Текст Blendet как Overlay ein (klickdurchlässig)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Waschmaschine fertig
{"text":"Alarm!","size":60,"color":"#ffffff","bg":"#c00000","position":"center","seconds":10}
```

| Параметр        | Тип         | Пфлихт | Стандарт   | Описание                                                        |
| --------------- | ----------- | ------ | ---------- | --------------------------------------------------------------- |
| `text`          | нить        | джа    |            | Текст                                                           |
| `seconds`       | число       |        | 5          | Anzeigedauer                                                    |
| `size`          | число       |        | 40         | Schriftgröße                                                    |
| `color`         | нить        |        | "#ffffff"  | Текстовый цвет                                                  |
| `bg`            | нить        |        | "#202020"  | Фон                                                             |
| `opacity`       | число       |        | 0.9        | Деккрафт                                                        |
| `position`      | нить        |        | "нижний"   | Lage (верх / центр / низ)                                       |
| `monitor`       | целое число |        | -1         | Монитор-индекс                                                  |
| `bold`          | логический  |        | истинный   | Фетт                                                            |
| `font`          | нить        |        | "Segoe UI" | Шрифтарт                                                        |
| `click_through` | логический  |        | истинный   | Mausklicks gehen durch                                          |
| `slot`          | нить        |        |            | Ersetzt Overlay с блестящим слотом                              |
| `max_width`     | число       |        | 80         | Максимальная длина в процентах от Bildschirms (текст bricht um) |
| `padding`       | целое число |        | 24         | Inneabstand in Pixel                                            |
| `margin`        | целое число |        |            | Abstand zum Rand в пикселях (вверху: 40, внизу: 60)             |

### `ask` _(требуется GUI-сиденье)_

Zeigt einen Dialog mit Buttons/Eingabefeld und Lifert die Antwort im result zurück\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Licht ausschalten?
{"text":"Kinomodus starten?","buttons":["Ja","Nein"],"timeout":30}
{"text":"Wie warm soll es werden?","input":true,"default":"21","buttons":["OK","Abbrechen"]}
```

| Параметр    | Тип         | Пфлихт | Стандарт    | Описание                                     |
| ----------- | ----------- | ------ | ----------- | -------------------------------------------- |
| `text`      | нить        | джа    |             | Фрагменттекст                                |
| `title`     | нить        |        |             | Тител                                        |
| `buttons`   | множество   |        | \["ХОРОШО"] | Beschriftungen, zB \["Ja","Nein"]            |
| `input`     | логический  |        | ЛОЖЬ        | Показать текстовое поле                      |
| `default`   | нить        |        |             | Vorgabe im Eingabefeld                       |
| `password`  | логический  |        | ЛОЖЬ        | Eingabe verdecken                            |
| `timeout`   | целое число |        | 0           | Sekunden bis autotisch geschlossen (0 = нет) |
| `width`     | целое число |        | 460         | Breite des Dialogs in Pixel                  |
| `font_size` | число       |        | 10          | Schriftgröße                                 |
| `monitor`   | целое число |        | -1          | Индекс монитора (-1 = Главный монитор)       |

### `notify` _(требуется GUI-сиденье)_

Zeigt eine Windows-Benachrichtigung\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Paket ist angekommen
{"text":"Fenster offen","title":"Heizung","icon":"warning","seconds":10}
```

| Параметр  | Тип         | Пфлихт | Стандарт     | Описание                                                    |
| --------- | ----------- | ------ | ------------ | ----------------------------------------------------------- |
| `text`    | нить        | джа    |              | Текст                                                       |
| `title`   | нить        |        | "WinCtl"     | Тител                                                       |
| `icon`    | нить        |        | "информация" | Символ (информация / предупреждение / ошибка / отсутствует) |
| `seconds` | целое число |        | 5            | Дауэр                                                       |

### `close_popups` _(требуется GUI-сиденье)_

Изменение всех всплывающих окон/наложений/диалоговых сообщений WinCtl

### `screenshot` _(требуется GUI-сиденье)_

Сделайте снимок экрана и проверьте изображение (JPEG/PNG-Rohdaten) на<base> /<id> /скриншот

Примеры:

```
{"monitor":0,"scale":1,"format":"png"}
```

| Параметр  | Тип         | Пфлихт | Стандарт | Описание                              |
| --------- | ----------- | ------ | -------- | ------------------------------------- |
| `monitor` | целое число |        | -1       | -1 = все мониторы, 0 = старые ...     |
| `scale`   | число       |        | 0.5      | Verkleinerung 0.05 - 1                |
| `quality` | целое число |        | 70       | Качество JPEG                         |
| `format`  | нить        |        | "jpeg"   | Формат изображения (jpeg / png)       |
| `inline`  | логический  |        | ЛОЖЬ     | Base64 zusätzlich im result mitsenden |

### `set_wallpaper`

Setzt das Desktop-Hintergrundbild (Открыть или URL-адрес)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"source": "<text>"}`.

Примеры:

```
https://picsum.photos/1920/1080
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание     |
| -------- | ---- | ------ | -------- | ------------ |
| `source` | нить | джа    |          | Pfad или URL |

### `brightness`

Setzt die Helligkeit (внутренние дисплеи для ноутбуков, 0–100)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"level": "<text>"}`.

Примеры:

```
60
```

| Параметр | Тип         | Пфлихт | Стандарт | Описание |
| -------- | ----------- | ------ | -------- | -------- |
| `level`  | целое число | джа    |          | 0 - 100  |

## Эйнгабе

### `start_menu`

Оффнет bzw. schließt das Startmenü (Windows-Taste)

### `send_keys` _(требуется GUI-сиденье)_

Sendet Tastendrücke (SendKeys-Синтаксис: ^=Strg, %=Alt, +=Umschalt, {ENTER}, {F5} ...)\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"keys": "<text>"}`.

Примеры:

```
^c
%{F4}
{ENTER}
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание                      |
| -------- | ---- | ------ | -------- | ----------------------------- |
| `keys`   | нить | джа    |          | zB ^c oder %{F4} oder {ENTER} |

### `type_text` _(требуется GUI-сиденье)_

Тип текста в активном Fenster\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Hallo Welt
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание |
| -------- | ---- | ------ | -------- | -------- |
| `text`   | нить | джа    |          | Текст    |

### `mouse`

Bewegt/klickt die Maus

Примеры:

```
{"x":100,"y":200,"click":"single"}
{"wheel":-3}
```

| Параметр   | Тип         | Пфлихт | Стандарт | Описание                             |
| ---------- | ----------- | ------ | -------- | ------------------------------------ |
| `x`        | целое число |        |          | X-координата                         |
| `y`        | целое число |        |          | Y-координата                         |
| `relative` | логический  |        | ЛОЖЬ     | Относительная актуальная позиция     |
| `click`    | нить        |        | "никто"  | Klickart (нет / одинарный / двойной) |
| `button`   | нить        |        | "левый"  | Вкус (левый / правый / средний)      |
| `wheel`    | целое число |        |          | Scrollrad-Schritte (+хох/- бегун)    |

### `clipboard_set` _(требуется GUI-сиденье)_

Setzt den Text der Zwischenablage\
&#x20;Курцформа: Полезная нагрузка `<text>` entspricht `{"text": "<text>"}`.

Примеры:

```
Text für die Zwischenablage
```

| Параметр | Тип  | Пфлихт | Стандарт | Описание |
| -------- | ---- | ------ | -------- | -------- |
| `text`   | нить | джа    |          | Текст    |

### `clipboard_get` _(требуется GUI-сиденье)_

Liest den Text der Zwischenablage

## Штаты

| Тема (`{base}/{id}/state/…`)  | Тип        | Einheit        | Ролле           | Описание                                                                  |
| ------------------------------ | ---------- | -------------- | --------------- | ------------------------------------------------------------------------- |
| `locked`                       | логический |                | `indicator`     | Bildschirm gesperrt                                                       |
| `user_present`                 | логический |                | `indicator`     | Бенуцер актив (nicht gesperrt und Eingabe Internalhalb der Idle-Schwelle) |
| `idle`                         | число      | с              | `value`         | Sekunden seit der letzten Maus-/Tastatureingabe                           |
| `active_window`                | нить       |                | `text`          | Titel des aktiven Fensters                                                |
| `active_process`               | нить       |                | `text`          | Prozess des aktiven Fensters                                              |
| `volume`                       | число      | %              | `level.volume`  | Master-Lautstärke                                                         |
| `muted`                        | логический |                | `media.mute`    | Stummgeschaltet                                                           |
| `cpu`                          | число      | %              | `value`         | CPU-Auslastung                                                            |
| `ram`                          | число      | %              | `value`         | RAM-Auslastung                                                            |
| `ram_free_gb`                  | число      | Великобритания | `value`         | Freier Arbeitsspeicher                                                    |
| `uptime_min`                   | число      | мин            | `value`         | Laufzeit seit Windows-Start                                               |
| `battery`                      | число      | %              | `value.battery` | Аккустанд (нур Герэте мит Акку)                                           |
| `charging`                     | логический |                | `indicator`     | Netzteil angeschlossen (nur Geräte mit Akku)                              |
| `monitors`                     | число      |                | `value`         | Анзаль Монитор                                                            |
| `ip`                           | нить       |                | `text`          | Локальный IPv4-адрес                                                      |
| `user`                         | нить       |                | `text`          | Angemeldeter Benutzer                                                     |
| `keep_awake`                   | логический |                | `indicator`     | keep\_awake ktiv                                                          |
| `webcam_in_use`                | логический |                | `indicator`     | Kamera wird gerade benutzt (zB Videokonferenz)                            |
| `webcam_app`                   | нить       |                | `text`          | Программа(e), die die Kamera benutzen                                     |
| `mic_in_use`                   | логический |                | `indicator`     | Mikrofon wird gerade benutzt                                              |
| `mic_app`                      | нить       |                | `text`          | Программа(e) для использования микрофона                                  |
| `web_url`                      | нить       |                | `text.url`      | Seite, die show\_web gerade anzeigt (leer = keine)                        |
| `update_available`             | логический |                | `indicator`     | Новая версия WinCtl-версии (при запуске и в течение 12 часов)             |
| `latest_version`               | нить       |                | `text`          | Новая версия WinCtl на GitHub                                             |
| `disk/<laufwerk>_free_gb`      | число      | Великобритания | `value`         | Freier Platz je Festplatte (динамичный)                                   |
| `disk/<laufwerk>_used_percent` | число      | %              | `value`         | Belegung je Festplatte (динамичный)                                       |
| `proc/<name>`                  | логический |                | `indicator`     | Запуск процесса (например, Config 'WatchProcesses', динамический)         |