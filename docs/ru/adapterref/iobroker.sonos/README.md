---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonos/README.md
title: ioBroker.sonos
hash: SGZuGqRJeW7c5U8Vgtso6l5ZQUBvFkhvPdWzJ1vl4+E=
---
![Логотип](../../../en/adapterref/iobroker.sonos/admin/sonos.png)

![Количество установок](http://iobroker.live/badges/sonos-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.sonos.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonos.svg)

# IoBroker.sonos
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonos/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sonos/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Управляйте и контролируйте устройства SONOS с помощью ioBroker.

## Обработка групп
* Состояния для работы с группами SONOS:
   * **`координатор`**: установите/получите координатор, то есть устройство SONOS, которое является ведущим и координирует группу. Для этого требуется, чтобы IP-адрес (имя канала) устройства SONOS был координатором, но с подчеркиванием `_` вместо точки `.`, поэтому используйте, например, `192_168_0_100` для IP-адреса `192.168.0.100`. Если устройство не принадлежит ни к одной группе, то значение равно собственному имени канала (IP).
   * **`group_volume`**: объем группы.
   * **`group_muted`**: статус отключения звука группы.
   * **`add_to_group`**: добавьте определенное устройство SONOS к устройству SONOS, под которым находится это состояние. Используйте IP-адрес с подчеркиванием (см. выше).
   * **`remove_from_group`**: удалить определенное устройство SONOS из устройства SONOS, под которым находится это состояние. Используйте IP-адрес с подчеркиванием (см. выше).

*) Эти состояния будут обновлены, если в приложении SONOS будут внесены изменения.

## Использование его с адаптером SayIt
Для использования [Sayit адаптер](https://github.com/ioBroker/ioBroker.sayit) с этим адаптером SONOS убедитесь, что [веб-адаптер](https://github.com/ioBroker/ioBroker.web) также создается и запускается экземпляр. Веб-адаптер необходим для того, чтобы адаптер SONOS мог читать сгенерированный файл MP3 из адаптера Sayit.

### Внимание: проблемы со стабильностью в сочетании с адаптером SayIt.
Обратите внимание: этот адаптер SONOS имеет проблемы со стабильностью при использовании преобразования текста в речь с адаптером SayIt. Наблюдаемые симптомы:

1. Произвольное изменение громкости на 0 или 100 %.
2. Нет ответа после случайного количества последовательностей текста в речь.

Обходной путь преобразования текста в речь — использовать [HTTP-API SONOS](https://github.com/jishi/node-sonos-http-api).

## Избранное и очередь в VIS
Используйте состояния `favorites_list_html` и `queue_html` для отображения списков воспроизведения и текущей очереди с помощью базового html-виджета в VIS. При нажатии на строку плейлист или трек будет воспроизведен немедленно.
Отформатируйте таблицу, используя следующие классы CSS:

### Избранное
* `sonosFavoriteTable`: любимая таблица с отверстиями
* `sonosFavoriteRow`: строки с избранной информацией
* `sonosFavoriteNumber`: количество избранных
* `sonosFavoriteCover`: обложка любимого альбома (захват изображения с помощью `.sonosFavoriteCover img`)
* `sonosFavoriteTitle`: Имя избранного

### Очередь
* `.sonosQueueTable`: таблица отверстий
* `.sonosQueueRow`: строки, содержащие информацию о треке.
* `.currentTrack`: добавляется в строку, содержащую текущий воспроизводимый трек.
* `.sonosQueueTrackNumber`: Номер или дорожка.
* `.sonosQueueTrackCover`: обложка альбома трека (захват изображения с помощью `.sonosQueueTrackCover img`)
* `.sonosQueueTrackArtist`: Имя исполнителя.
* `.sonosQueueTrackAlbum`: Название альбома (используйте `display:none`, если не нужно)
* `.sonosQueueTrackTitle`: Название заголовка.

Для длинных списков добавьте `overflow:auto;` или `overflow-y:auto;` к базовому html-виджету.
Обратите внимание: выделение текущего избранного не поддерживается.

### Пример CSS
```
.sonosFavoriteTable {
    color: #bbb;
    font-size: 12px;
}
.sonosFavoriteRow {
    cursor: pointer;
}
.sonosFavoriteNumber {}
.sonosFavoriteCover img {
    width: 30px;
    height: 30px;
}
.sonosFavoriteTitle {}

.sonosQueueTable {
    color: #bbb;
    font-size: 12px;
}
.sonosQueueRow {
    display: table-row;
    cursor: pointer;
}
.sonosQueueRow.currentTrack {
    color: #fff;
    font-weight: bold;
}
.sonosQueueTrackNumber {}
.sonosQueueTrackCover img {
    width: 30px;
    height: 30px;
    display: table-column;
}
.sonosQueueTrackArtist {
    display: table-row;
}
.sonosQueueTrackAlbum {
    display: none;
}
.sonosQueueTrackTitle {
    display: table-row;
}
```

## Делать
* Перепишите с помощью https://github.com/svrooij/node-sonos-ts.

## Конфигурация
- Веб-сервер - [необязательно] Если веб-сервер включен или нет
- Обновление прошедшего времени (мс) - Интервал в мс, как часто обновлять истекший таймер при воспроизведении заголовка. (по умолчанию 2000 г.)

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 3.0.0 (2023-10-09)
* (udondan) Added support for the playing Sonos playlists (added new state `playlist_set`)
* (bluefox) The minimal node.js version is 16

### 2.3.3 (2023-09-21)
* (foxriver76) fixed cover url

### 2.3.2 (2023-09-20)
* (foxriver76) store the cover file in files instead of binary states

### 2.3.1 (2023-03-22)
* (Apollon77) Prepare for future js-controller versions

### 2.3.0 (2023-01-11)
* (Standarduser & Jey-Cee) Added new states `favorites_list_html` and `queue_html with covers`
* (Standarduser) Changed default album art if no cover was found
* (bluefox) Configuration migrated to JSON-Config

### 2.2.3 (2022-07-04)
* (Rello) Added track number state

### 2.2.2 (2022-06-12)
* (Apollon77) Prevent js-controller warnings

### 2.2.1 (2022-06-12)
* (Apollon77) fix group volume state

### 2.2.0 (2022-06-08)
* (Apollon77) Remove logic that adjusted the group volume after one member volume was set
* (Apollon77) Make sure to not set state values for devices that are not configured
* (Apollon77) Try to catch network errors

### 2.1.7 (2021-12-20)
* (bluefox) Corrected error with "SONOS not found"

### 2.1.4 (2021-12-17)
* (bluefox) Catch possible errors by the start and unload

### 2.1.1 (2020-11-08)
* (Apollon77) Prevent crash case (Sentry IOBROKER-JS-CONTROLLER-S7, #78)

### 2.1.0 (2020-05-31)
* (bluefox) TTS Refactoring

### 2.0.2 (2020-05-25)
* (bluefox) Refactoring

### 2.0.1 (2019-11-04)
* (klein0r) create sonos cache directory

### 2.0.0 (2019-08-13)
* (bluefox) no web server any more
* (bluefox) update all used npm packages

### 1.8.0 (2019-01-04)
* (bluefox) Support js-controller compact mode

### 1.7.7 (2018-08-06)
* (bluefox) Fixed error with node.js 6

### 1.7.5 (2018-08-06)
* (bluefox) Trying to correct fade-out

### 1.7.4 (2018-07-23)
* (bluefox) The group volume has a valid role now
* (bluefox) Important changes: state cover.png renamed to "cover_png"
* (bluefox) added shuffle, repeat and crossfade modes. To enable it you must delete device from list and add it again
* (bluefox) better icon
* (bluefox) fix fade out option

### 1.7.1 (2018-07-17)
* (bluefox) Ready for npm6

### 1.7.0 (2018-07-16)
* (bluefox) Added the support of Admin3

### 1.6.2 (2017-08-16)
* (soef) no duration/elapsed update on radio

### 1.6.0 (2017-04-09)
* (justr1) Enhance group Handling

### 1.5.0 (2017-02-23)
* (bluefox) use new configuration dialog

### 1.4.4 (2017-01-29)
* (soef) removeFromGroup extended

### 1.4.3 (2017-01-08)
* (bluefox) Allow to use the sonos web via with proxy

### 1.4.2 (2016-12-29)
* (bluefox) add states for vis control and change some roles

### 1.3.1 (2016-12-27)
* (bluefox) Fix TTS if fade was 0

### 1.3.0 (2016-12-13)
* (bluefox) Fix api changes of SONOS module

### 1.2.1 (2016-12-10)
* (bluefox) add web adapter as dependency

### 1.2.0 (2016-10-25)
* (bluefox) tts was rewritten because of new sonos-discovery interface

### 1.1.0 (2016-10-20)
* (bluefox) update sonos npm packets
* (bluefox) configurable fadeIn and fadeOut

### 1.0.0 (2016-10-16)
* (bluefox) fix fade out

### 0.2.2 (2016-09-30)
* (bluefox) fix types of states

### 0.2.1 (2016-09-25)
* (soef) fixed restore of radio after sayIt

### 0.2.0 (2016-07-28)
* (soef) fixed restore of radio after sayIt
* (bluefox) fix log outputs
* (bluefox) update libraries and use fix versions of it

### 0.1.10 (2016-05-26)
* (bluefox) check type of "state"

### 0.1.9 (2016-05-20)
* (bluefox) change default port to 8080

### 0.1.8 (2016-02-22)
* (hagen) - Better handling of radio stations (show -> album, streamInfo -> artist)
* (hagen) New state 'current_type' to tell if a track or radio is playing
* (hagen) (Hopefully) fixed the unreliable cover art update

### 0.1.7 (2015-09-14)
* (bluefox) fix favorites set

### 0.1.6 (2015-02-25)
* (bluefox) implement tts if radio is playing

### 0.1.5 (2015-02-13)
* (bluefox) set volume by TTS

### 0.1.4 (2015-01-04)
* (bluefox) catch errors if states deleted

### 0.1.3 (2015-01-02)
* (bluefox) enable npm install

### 0.1.2 (2014-12-12)
* (bluefox) redirect logging messages to ioBroker

### 0.1.1 (2014-12-04)
* (bluefox) translate grid in config dialog

### 0.1.0 (2014-12-04)
* (bluefox) use sonos-web-controller module as tarball from git

### 0.0.5 (2014-11-24)
* (bluefox) support of new naming concept

### 0.0.4 (2014-11-22)
* (bluefox) support of text to speech

### 0.0.3 (2014-11-01)
* (bluefox) support of text to speech and cover image

### 0.0.2 (2014-11-01)
* (bluefox) improve configuration edit

## License

The MIT License (MIT)

Copyright (c) 2014-2023, bluefox <dogafox@gmail.com>

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