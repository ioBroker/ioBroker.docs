---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: lL0J43bP1VwhfQkBecOWPLNIsDwQCpMx6Ga1o+PjvFU=
---
![Логотип](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Количество установок](http://iobroker.live/badges/chromecast-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# IoBroker.chromecast
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Адаптер Google Home для ioBroker
Этот плагин позволяет обнаруживать видео- и/или аудиоустройства Google Home. Для каждого обнаруженного устройства Home создаётся устройство ioBroker. Это устройство отображает статус устройства и позволяет отправить ему новый URL-адрес для трансляции.

Разработать на основе следующих проектов:

* [ioBroker](http://www.iobroker.net)
* [node-castv2-client](https://github.com/thibauts/node-castv2-client) в качестве домашней клиентской библиотеки.

## Инструкции
1. Установите этот адаптер в ioBroker
2. (необязательно) Если вы планируете транслировать локальные файлы или ваши устройства Chromecast находятся в другой подсети, вам необходимо настроить адаптер.
* для потоковой передачи локальных файлов вам необходим экземпляр веб-сервера ioBroker
* Вам необходимо вручную добавить информацию (имя, IP-адрес, порт, тип рекламы) для каждого устройства, находящегося в подсети, отличной от подсети вашего сервера ioBroker. Если вы хотите, чтобы имена соответствовали именам автоматически найденных устройств, используйте MAC-адрес в качестве имени. Вы можете задать любое имя. Убедитесь, что каждое имя уникально! Во избежание проблем имена должны содержать только заглавные буквы A–Z, строчные буквы a–z, цифры 0–9, символ «-» (минус) и символ «_» (подчёркивание).
3. Проверьте журнал: вы должны увидеть журналы об обнаруженных устройствах.
4. Запишите URL-адрес, например [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3), в chromecast.0.`<имя вашего chromecast>`.player.url2play
5. URL-адрес должен начать воспроизводиться на вашем устройстве.

## Функции
* обнаружение устройств с multicast-dns
* по желанию можно добавить дополнительные устройства, настроенные вручную в панели администратора, вкладка «Устройства»
* создать объекты ioBroker для каждого найденного устройства
* каналы статуса, проигрывателя, медиа и метаданных
* управление устройством Google Home с помощью адаптера
* установить громкость
* отключить/включить звук
* остановить трансляцию
* пауза
* URL-адрес воспроизведения (chromecast.0.`<имя вашего Google Home>`.player.url2play)
* протестировано с MP3
* Полный список форматов [здесь](https://developers.google.com/cast/docs/media).
* если URL не начинается с http, то предполагается, что это локальный файл
* экспорт файла через веб-сервер ioBroker
* воспроизводит только первый файл из файлов плейлиста, таких как .m3u
* Виджет Vis
* ПРИМЕЧАНИЕ: требуется [пропатченный адаптер vis](https://github.com/angelnu/ioBroker.vis).
* Первоначальная поддержка аудиогрупп Chromecast
* Примечание: это не работает с SSDP -> отключено по умолчанию в настройках адаптера
* Повторите воспроизведение последнего воспроизведенного потока: просто установите _chromecast.0.`<ваше устройство>`.status.playing_ на _true_

## Чего не хватает?
* добавить конечный автомат для отслеживания состояний: обнаружен -> подключен -> загрузчик проигрывателя -> воспроизведение
* добавить повторные попытки: иногда Google Home не отвечает на запрос
* больше тестирования

## Changelog
### 4.0.0 (2024-10-09)
* (neopholus) Release 3.4.0 added support for devices located in adifferent subnet. This introduced a problem due to changing some state-ids reported at issue #274. This problem has been fixed. This might be considered a breaking change for some people. 
* (mcm1957) Testing for node.js 22.x has been added.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

### 3.4.1 (2024-07-02)
* (foxriver76) migrated binary state to file

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