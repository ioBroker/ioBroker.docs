---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: BEgsPai97BCvQFpkiD7k9SDFtpUfg09RVg/+sPZN3X4=
---
![Логотип](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Количество установок](https://iobroker.live/badges/chromecast-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.chromecast.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# ioBroker.chromecast

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер Google Home для ioBroker

Этот плагин позволяет обнаруживать видео- и/или аудиоустройства Google Home. Для каждого обнаруженного устройства Home создаётся устройство ioBroker. Это устройство отображает статус устройства и позволяет отправлять ему новый URL-адрес для трансляции.

Развивайте следующие проекты:

- [ioBroker](http://www.iobroker.net)
- [node-castv2-client](https://github.com/thibauts/node-castv2-client) как клиентская библиотека Home.

## Инструкции

1. Установите этот адаптер в ioBroker.
2. (Необязательно) Если вы планируете транслировать локальные файлы или если ваши устройства Chromecast находятся в другой подсети, вам необходимо настроить адаптер.
   - Для потоковой передачи локальных файлов вам потребуется экземпляр веб-сервера ioBroker.
   - Вам необходимо вручную добавить информацию (имя, IP-адрес, порт, тип объявления) для каждого устройства, расположенного в другой подсети, отличной от вашей подсети ioBroker. Если вы хотите, чтобы имена соответствовали именам автоматически найденных устройств, используйте MAC-адрес в качестве имени. Вы можете задать любое имя. Убедитесь, что каждое имя уникально! Во избежание проблем имена должны содержать только заглавные буквы AZ, строчные буквы az, цифры 0-9, - (минус) и \_ (подчеркивание).
3. Проверьте журнал: вы должны увидеть записи об обнаруженных устройствах.
4. Введите URL-адрес, например, <http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3> , в адрес устройства Chromecast.0. `<your chromecast name>`.player.url2play
5. Видеоролик должен начать воспроизводиться на вашем устройстве.

### Устройство не найдено?

Устройства обнаруживаются с помощью mDNS (многоадресный DNS: UDP-порт 5353, группа 224.0.0.251). Адаптер управляет ими через TCP-порт 8009.

- Разрешите входящий UDP-порт 5353 в брандмауэре хоста ioBroker (например, `sudo ufw allow 5353/udp`).
- Docker: запустите контейнер в сетевом режиме. `host` (или macvlan); многоадресная рассылка не проходит через сеть моста по умолчанию.
- mDNS не проходит через маршрутизаторы: устройства в другой подсети или VLAN обнаруживаются только с помощью mDNS-рефлектора на маршрутизаторе. В противном случае добавьте их вручную на вкладке «Устройства» в настройках.

### Обнаружены нежелательные устройства?

Устройства сторонних производителей со встроенной функцией Google Cast (например, колонки Denon/Marantz HEOS, AV-ресиверы или смарт-телевизоры) объявляют о себе через mDNS так же, как и устройства Google Home/Chromecast, и поэтому обнаруживаются автоматически.

- Чтобы предотвратить подключение адаптера к нежелательному устройству, установите его состояние. `chromecast.0.<device>.enabled` к `false`.
- Список игнорирования для обнаружения в настоящее время недоступен.

## Функции

- обнаружение устройств с многоадресным DNS
  - При желании можно добавить дополнительные устройства, настроенные вручную, в панели администратора, на вкладке «Устройства».
- создать объекты ioBroker для каждого найденного устройства
- статус, плеер, медиа и каналы метаданных
- управление устройством Google Home с помощью адаптера
  - установить громкость
  - включить/выключить звук
  - прекратить трансляцию
  - пауза
  - URL для воспроизведения (chromecast.0. `<your Google Home name>`.player.url2play)
    - протестировано с MP3
      - Полный список форматов [здесь](https://developers.google.com/cast/docs/media) .
    - Если URL-адрес не начинается с http, то следует считать, что это локальный файл.
      - Экспорт файла через веб-сервер ioBroker: он копируется в файловое хранилище (`chromecast.0/<device id>/exportedMedia.mp3`) и продолжил игру оттуда.
    - Он воспроизводит только первый файл из плейлистов, например, .m3u.
- Виджет "Трансляция проигрывателя" для [ioBroker.devices](https://github.com/ioBroker/ioBroker.devices) : воспроизведение с устройства (обложка, название, исполнитель или приложение) с помощью кнопок "Воспроизведение", "Пауза" и "Стоп"; выберите экземпляр и устройство в его настройках.
- Веб-компонент `<iob-chromecast-player>` Для vis-2, устройств, Aura и администратора: что воспроизводит, воспроизведение/пауза, остановка, предыдущий/следующий, громкость и отключение звука; выберите устройство (`chromecast.0.<device>`) в его настройках
- Виджет Vis
  - ПРИМЕЧАНИЕ: требуется [модифицированный адаптер vis](https://github.com/angelnu/ioBroker.vis) .
- Первоначальная поддержка групп Chromecast Audio
  - Примечание: это не работает с SSDP -> отключено по умолчанию в настройках адаптера.
- Воспроизвести последний воспроизведенный поток: просто установите _параметр chromecast.0. `<your device>`.status.playing_ to _true_

## Сообщения для скриптов и агентов искусственного интеллекта.

`sendTo('chromecast.0', 'help', {})` ответы `{ help, commands }`: описание состояний устройства, воспроизводящего URL-адрес или объявление, управляющего проигрывателем и отображающего воспроизводимый контент, для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов. `commands` перечисляет все сообщения, на которые отвечает экземпляр. `write: true` для тех, кто что-то меняет (ни один этого не делает: кроме `help` их всего несколько. `chromecast:getDevices`, которая отображает список устройств для настроек виджета устройств, и `getWebServerIps` и `checkWebInstance` (который используется в диалоговом окне настроек).

## Чего не хватает?

- Добавить конечный автомат для отслеживания состояний: обнаружено -> подключено -> загрузчик игрока -> игра
- Добавить повторные попытки: иногда Google Home не отвечает на запрос.
- дополнительные испытания

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
- (meistermopper) README: document how to disable unwanted Cast devices (e.g. HEOS) [#377]
- (GermanBluefox) `npm run build` builds the complete adapter now: TypeScript, the devices widget and the web component (#573)
- (GermanBluefox) Used adapter timers in the cast classes and added dependabot entries for src-devices/src-webcomponents [#569]

### 4.3.0 (2026-11-20)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (raintonr) Move castv2-player 'info' logging to 'debug' [#550]
- (bluefox) Added the message "help": a description of the states for AI agents (e.g. pi-agent), and common.supportedMessages.help
- (bluefox) The adapter was refactored to TypeScript and the settings dialog to JsonConfig
- (bluefox) Fixed: the adapter crashed when the connection closed after a YouTube video, and the ack of `url2play` for YouTube went to `undefined.player.url2play`
- (bluefox) Fixed: a disabled device can be enabled again, the acks of `enabled`, `status.playing` and `playlist.jump` are written to the device, and a device no longer reacts to the states of another device whose name starts with its name
- (bluefox) Fixed: `vis-2` is restarted after an update of the adapter (`restartAdapters` said `VIS-2`)
- (bluefox) Fixed: warning "Default value has to be stringified" for `playlist.list`; existing objects are corrected [#333]
- (bluefox) Fixed: endless status requests (hundreds of log lines per second, high CPU load) while an app plays that reports no playlist, e.g. Android TV apps [#241]; "not enabled" is logged only once per disabled device; no more "Cannot get status" after the start for devices that play nothing
- (bluefox) Fixed: local files can be played again ("is not an object of type meta", and the URL pointed to a folder that the web server does not know) [#323]
- (bluefox) README: what mDNS discovery needs (firewall, Docker, subnets) [#164]
- (bluefox) The library castv2-player (archived) is now part of the adapter, in TypeScript
- (bluefox) Fixed: "Error disconnecting - TypeError: Cannot read properties of null (reading 'socket')" when a device closes the connection [#474, #204, #377]; the player is detached only once
- (bluefox) Fixed: a disabled device connected again when its address changed; the adapter could crash when the address of a device changed
- (bluefox) Fixed: an M3U playlist with lines the parser does not understand (e.g. HLS `.m3u8`) crashed the adapter; HLS is now played as one stream
- (bluefox) Fixed: a radio stream in a playlist was downloaded until the adapter stopped; a redirect to a relative URL failed
- (bluefox) Fixed: every played URL left a listener behind (MaxListenersExceededWarning after 10 URLs, more memory and CPU)
- (bluefox) Fixed: `player.mute` was emptied on every volume change; a command that could not reconnect within 10 seconds logged the error `undefined`
- (bluefox) Fixed: writing `player.shuffleMode` switches shuffle on and off (it only logged "update not supported"), and `player.shuffleMode` shows the shuffle of the device
- (bluefox) Fixed: `player.state` was always 1 (play); it is 0 while paused and 2 while idle
- (bluefox) mime-types 3: without a content type from the server, `.aac` is played as `audio/aac` and `.wav` as `audio/wav`; `.mts`, `.m2ts` and `.m4b` are known now
- (bluefox) Fixed: titles of M3U playlists: `#EXTINF:-1,Radio Bob` showed "-1,Radio Bob"; attributes (`tvg-logo=…`) and lines like `#EXTVLCOPT` ended up in the title, and "Artist - Song - Remastered" was split at the last dash
- (bluefox) Fixed: an entry of a playlist without file extension (e.g. the URL of a radio station) showed its URL instead of the title of the playlist; without an artist in the playlist the artist is "--" (was "unknown")
- (bluefox) Fixed: the queue of a playlist keeps the order of the file (entries without file extension came last, in the order their servers answered)
- (bluefox) Added the widget "Cast player" for ioBroker.devices (what plays, play, pause, stop) and the web component `<iob-chromecast-player>` for vis-2, devices, Aura and admin

### 4.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level
- (mcm1957) Dependencies have been updated

### 4.1.1 (2026-02-16)
- (mcm1957) Linting has been updated to @iobroker/eslint-config

### 4.1.0 (2026-02-16)
- (mcm1957) Adapetr requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 4.0.0 (2024-10-09)
* (neopholus) Release 3.4.0 added support for devices located in adifferent subnet. This introduced a problem due to changing some state-ids reported at issue #274. This problem has been fixed. This might be considered a breaking change for some people. 
* (mcm1957) Testing for node.js 22.x has been added.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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