---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: hNhxuqqE8fbmTaOUucEB3d5swRihcwAX07Ew3F/fnA4=
---
![Логотип](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Количество установок](http://iobroker.live/badges/chromecast-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# ioBroker.chromecast

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
4. Введите URL-адрес, например, <http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3> , в адрес устройства Chromecast.0.`<your chromecast name>` .player.url2play
5. Видеоролик должен начать воспроизводиться на вашем устройстве.

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
  - URL для воспроизведения (chromecast.0.`<your Google Home name>` .player.url2play)
    - протестировано с MP3
      - Полный список форматов [здесь](https://developers.google.com/cast/docs/media) .
    - Если URL-адрес не начинается с http, то следует считать, что это локальный файл.
      - экспорт файла через веб-сервер ioBroker
    - Он воспроизводит только первый файл из плейлистов, например, .m3u.
- Виджет Vis
  - ПРИМЕЧАНИЕ: требуется [модифицированный адаптер vis](https://github.com/angelnu/ioBroker.vis) .
- Первоначальная поддержка групп Chromecast Audio
  - Примечание: это не работает с SSDP -> отключено по умолчанию в настройках адаптера.
- Воспроизвести последний воспроизведенный поток: просто установите _параметр chromecast.0.`<your device>` .status.playing_ to _true_

## Чего не хватает?

- Добавить конечный автомат для отслеживания состояний: обнаружено -> подключено -> загрузчик игрока -> игра
- Добавить повторные попытки: иногда Google Home не отвечает на запрос.
- дополнительные испытания

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level
- (mcm1957) Dependencies have been updated
-

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

### 3.4.1 (2024-07-02)
* (foxriver76) migrated binary state to file

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.chromecast/blob/master/CHANGELOG_OLD.md)

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