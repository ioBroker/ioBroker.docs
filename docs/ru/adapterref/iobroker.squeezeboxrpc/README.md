---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.squeezeboxrpc/README.md
title: Адаптер ioBroker Logitech Squeezebox через протокол JSON/RPC
hash: ApQx3ISC5vhk8iOmN++3gMfLBg2a4pNQLkFTGh1r4eI=
---
![Логотип](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Количество установок](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# Адаптер ioBroker Logitech Squeezebox через протокол JSON/RPC
**Тесты:** ![Тест и выпуск](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

Это альтернативный адаптер, который использует протокол JSON/RPC для получения данных и отправки команд на Logitech Media Server ([СУО](https://de.wikipedia.org/wiki/Logitech_Media_Server)) для управления подключенными устройствами, такими как

- нативный [squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- Raspberry Pi с дополнительным аудиомодулем и небольшими прошивками на базе Linux

как [picoreplayer](https://picoreplayer.org/) или [max2play](https://www.max2play.com).

- с плагинами chromecast, airplay или UPnP/DLNA-устройствами

LMS-сервер может управлять/предоставлять очень большие музыкальные коллекции на жестких дисках или NAS, подключаться к различным потоковым провайдерам, таким как Spotify, Deezer, Soundcloud, shoutcast, tunein, napster, pandora, tidal и многим другим.

Зачем нужен еще один адаптер Squeezebox?

Существующий адаптер использует telnet для доступа к LMS. Telnet имеет некоторые недостатки.
Фактический основной веб-интерфейс LMS также использует rpc/json-протокол для получения всей необходимой информации или отправки команд на сервер/плееры.

## Функции
- большинство данных, которые предоставляет LMS-Service, доступны в адаптере
- подробная информация о статусе игрока, названии песни, исполнителе,

альбом, обложка, плейлист

- множество функций управления для воспроизведения, паузы, остановки, перемотки вперед, назад, повтора,

Перемешивание, воспроизведение избранного, переход к времени (абсолютному и относительному), переход к индексу плейлиста (абсолютному и относительному), кнопки включения/выключения питания и предустановки

- все избранное и все подуровни с сервера
- включено множество виджетов для компонента iobroker-vis для создания собственных

управление пользовательскими интерфейсами (выбор проигрывателя, выбор избранного, управление синхронизированными группами, кнопки для воспроизведения/паузы, перемотки вперед, назад, выбора режима повтора и режима случайного воспроизведения)

Документация по vis-виджетам доступна внутри vis или [Виджет-Документация/немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html)

## Установка
- Установить пакет
- Создать экземпляр
- Настройте экземпляр с IP-адресом медиасервера Logitech.

и порт (обычно 9000)

- запустить/перезапустить экземпляр

## Обновлять
- после изменений в коде виджета и обновления адаптера, iobroker

следует загрузить веб-файлы на внутренний веб-сервер. Пользователь сообщил, что иногда это не происходило или происходило с задержкой. Вы можете вызвать это действие с помощью следующей команды

iobroker загрузить squeezeboxpc

## Предоставленные состояния
### Сервер
| состояние | Описание |
| ---------------- | ----------------------------- |
| LastScan | временная метка последнего сканирования музыки |
| PlayerCount | Количество известных игроков |
| PlayerCountOther | Количество известных других игроков |
| PlayerCountSN | Количество известных игроков SN |
| TotalAlbums | Количество всех известных альбомов |
| TotalArtists | Количество всех известных художников |
| TotalDuration | Суммарное время воспроизведения всех песен |
| TotalGenres | Количество всех известных жанров |
| TotalSongs | Количество всех известных песен |
| SyncGroups | Существующие Syncgroups |
| Версия | Версия LMS |
| mac | MAC-ID сервера |
| uuid | uuid экземпляра LMS |

дополнительная определенная кнопка для обновления избранного

| кнопка | Описание |
| ------------ | --------------------------------- |
| getFavorites | запросить все избранное с сервера |

### Избранное
Для каждого избранного Все атрибуты доступны только для чтения

| состояние | Описание |
| -------- | ------------------------------------------ |
| Имя | Имя фаворита |
| hasitems | указывает, является ли это каталогом |
| id | id избранного |
| изображение | изображение/значок для избранного, если доступно |
| isaudio | isaudio |
| тип | Примеры типов: ссылка, текст, аудио, плейлист |
| url | url трека |

Доступны все подуровни (подкаталоги) избранного.

### Игроки
для каждого игрока Режим показывает, можно ли изменить значение. Предпринятое действие описано в атрибуте

| состояние | режим | Описание |
| -------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| Сигналы тревоги | R/- | Все зарегистрированные сигналы тревоги для этого игрока в формате JSON |
| Альбом | R/- | Название текущего альбома |
| Художник | R/- | Имя художника |
| ArtworkUrl | R/- | URL-адрес для Artwork |
| Битрейт | R/- | Битрейт трека |
| Подключено | R/- | состояние соединения игрока (0/1) |
| Продолжительность | R/- | Продолжительность трека |
| Жанр | R/- | жанр трека |
| IP | R/- | IP игрока |
| Режим | R/- | воспроизведение / пауза / стоп |
| Имя игрока | R/- | Имя игрока |
| PlayerID | R/- | ID игрока |
| Плейлист | R/- | Фактический плейлист в формате JSON |
| PlaylistCurrentIndex | R/W | перейти к абсолютной позиции, указав<br> trackindex или относительный с + или - в конце<br> начало. Пример 10,-3,+2 |
| PlaylistRepeat | R/W | Повтор песни(1)/плейлиста(2)/не повторять(0) |
| PlaylistShuffle | R/W | перемешать плейлист(1)/перемешать альбом(2)/не перемешивать(0) |
| Питание | Чтение/запись | получить/установить состояние питания проигрывателя выкл(0)/вкл(1) |
| RadioName | R/- | Название радиостанции |
| Оценить | R/- | Рейтинг песни |
| Удалённый | R/- | Если удалённый поток (1) |
| SyncMaster | R/- | ID/MAC Syncmaster |
| SyncSlaves | R/- | ID/Mac игроков в Syncgroup |
| Время | R/- | прошедшее время песни |
| Название | R/- | название песни |
| Тип | R/- | тип носителя (например, MP3 Radio) |
| Url | R/- | URL трека / потока |
| Громкость | Чтение/запись | получить/установить громкость плеера (0-100) |
| состояние | Чтение/запись | получить/установить состояние воспроизведения: пауза(0),воспроизведение(1),стоп(2) |

Список воспроизведения предоставляет фактические следующие атрибуты, если они доступны в LMS.
Некоторые атрибуты зависят от типа песен (поток/файл/...) Все атрибуты доступны только для чтения

| атрибут | Описание |
| ---------- | --------------------------------- |
| Альбом | Название текущего альбома |
| Художник | Имя художника |
| ArtworkUrl | URL-адрес произведения искусства |
| Битрейт | Битрейт трека |
| Продолжительность | Продолжительность трека |
| RadioName | Название радиостанции |
| Оценить | Рейтинг песни |
| название | название песни |
| Тип | тип носителя (например, MP3 Radio) |
| url | URL-адрес трека/потока |
| индекс | индекс песни в плейлисте |
| id | id песни |

дополнительные определенные кнопки:

| кнопка | Описание |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| btnВперед | Следующая песня |
| btnRewind | Предыдущая песня |
| btnPreset\_\* | Кнопки 1-6 для определения в плеере или на сервере |
| cmdGeneral | общее поле команд для отправки команд игроку. каждое поле должно быть заключено в кавычки. параметры должны быть разделены запятыми. Пример: "play","1" |
| cmdPlayFavorite | для воспроизведения избранного установите идентификатор избранного |
| cmdPlayUrl | для воспроизведения URL-адреса´example "<http://50.7.77.114:8101/>;" |
| cmdGoTime | перейти к абсолютной позиции, указав количество секунд, или перейти к относительной позиции, указав + или - в начале секунд. Пример 100,-50,+50 |

Для получения более подробной информации посетите документацию CLI:

<https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

## То, что нужно сделать
- больше тестирования/исправления
- уменьшить зависимости от других пакетов (squeezenode)
- больше настроек для опционального включения/выключения функций для улучшения памяти и производительности
- добавить виджет плейлиста
- добавить виджет просмотра для просмотра в LMS-меню
- добавить виджет круглой ручки, управляемой игроком
- остановить воспроизведение при повторном нажатии кнопки избранного.
- cmdGeneral для сервера.
- ~~добавлено telnet-соединение для получения push-событий с сервера для оптимизации опроса~~
- ~~реализовать состояние команды для размещения индивидуальных команд пользователя (через json) для сервера и игрока~~
- ~~реализация дополнительных функций управления (выбор позиции плейлиста для воспроизведения, ffwd, frew, переход к временной позиции в песне, повтор песни, случайная песня)~~
- ~~добавить плейлист в playerdata как массив json~~
- ~~добавлять обложку (логотип станции/обложка плейлиста) для избранного~~
- ~~реализовать больше уровней (подкаталогов) избранного~~
- ~~автоматическое обнаружение сервера Logitech Media~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.3.15 (2024-08-09)

-   due to a adapter checker issue i have to remove the release 1.3.13 from npm.
    but changes from 1.3.13 are included in 1.3.14

### 1.3.14 (2024-08-05)

-   fix formatting

### 1.3.13 (2024-08-05)

-   revert the fix for artist handling due to negative effect of spotify

### 1.3.12 (2024-08-05)

-   improve cmdGoto handling by kairauer, close PR #74
-   fix issues from adapter checker
-   integrate squeezenode lib

### 1.3.11 (2024-08-05)

-   update adapter structure and switch to jsonconfig

### 1.3.10

-   getalbumartist as artist if setting of TPE2/TPE3 in LMS are changed"

### 1.3.9

-   fix error with deleting favorites
-   fix wrong type for datapoint

### 1.3.8

-   fix forward button widget

### 1.3.7

-   fix object creation of states in player modul

### 1.3.6

-   fix object creation of states

### 1.3.5

-   fix object creation for favorites

### 1.3.4

-   fix object creation for favorites / \* center widgets in sidebar

### 1.3.3

-   repair imageproxy for image datapoints of favorites

### 1.3.2

-   fix for Alarm contains only enabled Alarms

### 1.3.1

-   fix problem with git dependency url

### 1.3.0

-   fix problem wit setting own icon in player widget / \* add infos about alarms to a player datapoint

### 1.2.1

-   fix small issue in last version

### 1.2.0

-   improve handling of imageproxy artwork

### 1.1.0

-   make request of favorites configurable

### 1.0.1

-   change setstate/createobject logic
-   fix role and type for Mode-state
-   update tests
-   update dependency versions
-   improve io-package.json

### 1.0.0

-   prepare for stable repository

### 0.8.32

-   the adapter function iobroker.deleteChannel didnt works as expected. it didnt delete the whole subtree of states. now i implement my own delete function

### 0.8.31

-   change behaviour of deleting favorites

### 0.8.30

-   change from the issue of the adapter checker

### 0.8.29

-   optimize handling of player state power and connected

### 0.8.28

-   add advanced signaling function with telnet and fix some more authorization issues with LMS

### 0.8.27

-   initialization for the new calctype property if empty in volumebar

### 0.8.26

-   more improvement and fixing at volumebar / remove playlist widget from master. not ready yet

### 0.8.25

-   fixing css-settings on volumebar

### 0.8.24

-   volumebar didnt get events between the segments, change clickevent and calculation

### 0.8.23

-   adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12

### 0.8.22

-   due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn.\_socket)

### 0.8.21

-   add command für playing urls

### 0.8.20

-   remove node v6 test setting

### 0.8.19

-   shorten news history

### 0.8.18 (2019-06-27)

-   last minute changes.

### 0.8.17 (2019-06-26)

-   add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.

### 0.8.16 (2019-06-24)

-   resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself

### 0.8.15 (2019-06-19)

-   minor issue with not ready states

### 0.8.14 (2019-06-19)

-   add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic

### 0.8.13 (2019-06-16)

-   rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc

### 0.8.12 (2019-06-16)

-   sync version with npm

### 0.8.11 (2019-06-15)

-   try to integrate the widgets into the main adapter

### 0.8.10 (2019-05-15)

-   another try to fix the EADDRINUSE error of the server discovery

### 0.8.9 (2019-05-15)

-   try to fix the EADDRINUSE error of the server discovery

### 0.8.8 (2019-05-14)

-   make discover configurable

### 0.8.7 (2019-05-11)

-   more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)

### 0.8.6 (2019-05-10)

-   move some configuration options into seperate tabs

### 0.8.5 (2019-05-08)

-   change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint

### 0.8.4

-   move some files to lib directory

### 0.8.3

-   close port for discovery on unload

### 0.8.2

-   sync version with npm

### 0.8.1

-   set compact mode flag

### 0.8.0

-   implementation of compact mode, change version to represent a realistic feature completness

### 0.0.9

-   debug options are now configurable

### 0.0.8

-   More playlist attributes + remove trailing and leading spaces from source

### 0.0.7

-   Add the playlist to each player as json

### 0.0.6

-   More config options

### 0.0.5

-   All levels/subdirectories of favorites are now available in iobroker

### 0.0.4

-   added the cmdPlayFavorite for each player

### 0.0.3

-   repair the no-data symbols for buttons in vis

### 0.0.2

-   added autodiscovery

### 0.0.1

-   initial release

## License

MIT License

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

Copyright (c) 2019-2024 oweitman