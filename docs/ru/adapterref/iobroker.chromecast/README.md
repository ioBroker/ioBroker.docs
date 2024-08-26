---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: Gy4OlsyXmVeAn2b1RDd6DJ7zM/aavhqL990dY2gwuoU=
---
![Логотип](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Количество установок](http://iobroker.live/badges/chromecast-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# IoBroker.chromecast
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Адаптер Google Home для ioBroker
Этот плагин позволяет обнаруживать видео и/или аудио устройства Google Home. Для каждого обнаруженного домашнего устройства создается устройство ioBroker. Это устройство отображает состояние устройства и позволяет отправить ему новый URL-адрес для трансляции.

Создавать на базе следующих проектов:

  * [ioBroker](http://www.iobroker.net)
  * [node-castv2-client](https://github.com/thibauts/node-castv2-client) в качестве домашней клиентской библиотеки.

## Присоединяйтесь к серверу Discord, чтобы обсудить все об интеграции ioBroker!
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Инструкции
1. Установите этот адаптер в ioBroker.
2. (необязательно) Если вы планируете транслировать локальные файлы или ваши устройства Chromecast расположены в другой подсети, вам необходимо настроить адаптер.
   * вам необходим экземпляр веб-сервера ioBroker для потоковой передачи локальных файлов
   * вам необходимо вручную добавить информацию (имя, IP, порт, тип объявления) для каждого устройства, находящегося в другой подсети, чем ваш сервер ioBroker. Если вы хотите, чтобы имена соответствовали именам автоматически найденных устройств, используйте в качестве имени MAC-адрес. Вы можете определить любое имя, какое захотите. Убедитесь, что каждое имя уникально! Во избежание проблем имена должны содержать только символы верхнего регистра от A до Z, символы нижнего регистра от a до z, цифры 0–9, - (минус) и _ (подчеркивание).
3. Проверьте свой журнал: вы должны увидеть журналы об обнаруженных устройствах.
4. Напишите URL-адрес, например [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar .net/ps-dieneue_rock/livestream_hi.mp3) в chromecast.0.`<ваше имя Chromecast>`.player.url2play
5. URL-адрес должен начать воспроизводиться на вашем устройстве.

## Функции
* обнаруживать устройства с multicast-dns
  * при желании добавить дополнительные устройства, настроенные вручную, в панели администратора, вкладка «Устройства»
* создавать объекты ioBroker для каждого найденного устройства
* статус, проигрыватель, каналы мультимедиа и метаданных
* управлять устройством Google Home через адаптер
  * установка громкости
  * отключить/включить звук
  *прекратить вещание
  * Пауза
  * URL-адрес воспроизведения (chromecast.0.`<ваше имя Google Home>`.player.url2play)
    * протестировано с MP3
      * Полный список форматов [здесь](https://developers.google.com/cast/docs/media).
    * если URL-адрес не начинается с http, предположим, что это локальный файл
      * экспортировать файл через веб-сервер ioBroker
    * воспроизводится только первый файл из файлов списков воспроизведения, таких как .m3u
* Визит виджет
  * ПРИМЕЧАНИЕ. Требуется [исправленный адаптер vis] (https://github.com/angelnu/ioBroker.vis).
* Первоначальная поддержка аудиогрупп Chromecast.
  * Примечание: это не работает с SSDP -> отключить по умолчанию в настройках адаптера.
* Воспроизведите последний воспроизведенный поток: просто установите для _chromecast.0.`<ваше устройство>`.status.playing_ значение _true_.

## Чего не хватает?
* добавить конечный автомат для отслеживания состояний: обнаружен -> подключен -> загрузчик проигрывателя -> воспроизведение
* добавить повторы: иногда Google Home не отвечает на запрос.
* больше испытаний

## Changelog
<!--
    ### **WORK IN PROGRESS**
    - (neopholus) Breaking change: Bugfix for ([#154](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/154)) and ([#160](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/160)): manually configured devices in admin pannel (devices tab) are created correctly again (broke with 3.0.3) using the name defined in the admin panel, tab "devices".
-->
### 3.4.0 (2024-04-13)
* (neopholus) Support for devices located in different subnets has been added. [#154, #160]
* (mcm1957) Dependencies have been updated

### 3.3.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.2.0 (2024-01-22)
- (mcm1957) changed: Testing has been updated to use node.js 16/18/20
- (mcm1957) changed: Dependencies have been updated
* (raintonr) YouTube videos are allowed now ([#75](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/75))
* (raintonr) AppId has been added to status ([#151](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/151))
* (raintonr) Storing of webserver settings has been corrected if web instance listens on only one address ([#145](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/145))

### 3.1.0 (2022-11-12)
* (bluefox) Refactoring done
* (bluefox) Removed dependency with nettools
* (bluefox) Added support of web port other than 8082

### 3.0.3 (2022-08-26)
* (jey cee) Breaking change: Object IDs are now mac addresses instead names
* (Bjoern3003) set album name as song if provided in icy-nlicame
* (Apollon77/aortmannm) Make compatible with Node.js 16+
* (Apollon77) Add Sentry for crash reporting

### 2.3.1 (2019-10-23)
* (angelnu) Tested compact mode works in Linux and Windows

### 2.2.3 (2019-03-19)
* news

### 2.2.2 (2019-02-01)
* Fix missing reference when mDNS update is received

### 2.2.1 (2019-01-29)
* Remove mandatory dependency on vis adapter

### 2.2.0 (2019-01-15)
* Option to configure device URLs manually (when devices are in a different subnetwork)

### 2.1.5 (2019-01-14)
* Reconnect on mDNS updates

### 2.0.2 (2019-01-06)
* (angelnu) compact mode support

### 2.0.0 (2018-07-22)
* (bluefox) refactoring and add new states for material

### 1.4.3 (2018-04-03)
* Added enabled flag so some adapters can be ignored

### 1.4.2 (2018-01-30)
* Always use volume parameter for announcements

### 1.4.1 (2018-01-06)
* Fix for languages in io-package

### 1.4.0 (2017.11.26)
* (angelnu) Support for additional languages
* (angelnu) Support for version 3 of the Admin adapter

### 1.3.4 (2017.11.26)
* (angelnu) Update to latest cast2-player - wait for announcement

### 1.3.4 (2017.11.25)
* (angelnu) Rename to Google Home

### 1.3.3 (2017.11.24)
* (bluefox) bump a version

### 1.3.2
* (Vegetto) recognize uncompleted playlist status and trigger a new getStatus

### 1.3.1
* (Vegetto) Fix updateStates to accept null values
* (Vegetto) Add playlist currentItemdId

### 1.3.0
* (Vegetto) Create playlist channel with raw playlist and repeat modes
* (Vegetto) Moved jump and repeatMode from player to plalist channel

### 1.2.2
* (Vegetto) Forgot to step up version.

### 1.2.2
* (Vegetto) Update to player 1.1.3 - support relative paths in playlists

### 1.2.1
* (Vegetto) Update to player 1.1.2 - reconnect on url2play

### 1.2.0
* (Vegetto) Mayor rework
  * Chromecast player and scanner splitted into a separated module
  * **Support for playlists**
  * Improved MIME detection - **OGG files work now**
  * Support for **announcements** - playlist resume after completing announcement
  * Support to **jump** between playlist entries

### 1.1.3
* (Vegetto) bugfix - media title was not kept to url when streamTitle not present

### 1.1.2
* (Vegetto) Update npm dependencies in package.json to latest versions

### 1.1.1
* (Vegetto) bugfix - not playing when another chromecast playing same url
* (Vegetto) added additional logs

### 1.1.0
* (Vegetto) **Added support for playlist m3u, asx and pls files - play first entry**

### 1.0.9
* (Vegetto) Do not use this in callbacks. Replaced with _that_
* (Vegetto) Fix contentId not being updated. This was breaking the _play last stream_ feature

### 1.0.8
* (Vegetto) Do not try to stop if not playing

### 1.0.7
* (Vegetto) Show MultizoneLeader as playing
* (Vegetto) Set pause state to false when modified and device is not playing

### 1.0.6
* (Vegetto) Fix widget crashing when devId is not set

### 1.0.2
* (Vegetto) Fix deprecation warning - use dns-txt instead of mdns-txt

### 1.0.1
* (Vegetto) Fix exception

### 1.0.0
* (Vegetto) **Try to play last played URL when setting playing state to true**
* (Vegetto) Fix jshint and jscs findings

### 0.2.1
* (Vegetto) Update readme
* (Vegetto) Integrated into iobroker: listed there

### 0.2.0
* (Vegetto) Add vis widget (Alpha)
* (Vegetto) Performance improvements

### 0.1.4
* (Vegetto) Stability fixes - error handling, race-condition fixes, etc
* (Vegetto) Clean getMediaInfo handler when disconnecting player
* (Vegetto) Added support to retrieve ICY metadata from https sources
* (Vegetto) Moved code for querying media info to a separate class
* (Vegetto) **Support dynamic IP/port changes (audio groups)**

### 0.1.3
* (Vegetto) Added re-connection with retries. Will try for up 42 hours.
* (Vegetto) Support for triggering a reconnection by writing to <device>.status.connected
* (Vegetto) Fixed race condition when playing local file
* (Vegetto) **Added support for playing local files**
* (Bluefox) Russian translations
* (Vegetto) Update stale metadata when not present in player status
* (Vegetto) **Initial support for audio groups**
* (Vegetto) **Retrieve media type and title from URLs that support ICY**
* (Vegetto) Added displayName, isActiveInput and isStandBy status

### 0.1.2
* (Vegetto) Merge base

### 0.1.1
* (Vegetto) Fix package syntax
* (Vegetto) Fix package dependencies

### 0.1.0
* (Vegetto) Initial release

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2015-2022 Vegetto <iobroker@angelnu.com>

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
