---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cometvisu/README.md
title: ioBroker.cometvisu
hash: 7eOMpp+VkyhNtOTEg+HmoXXZwMUKynI/2wLNAA9UADE=
---
![Логотип](../../../en/adapterref/iobroker.cometvisu/admin/cometvisu.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.cometvisu.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cometvisu.svg)
![Количество установок](https://iobroker.live/badges/cometvisu-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/cometvisu-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.cometvisu.png?downloads=true)
![Тестирование и выпуск](https://github.com/joltcoke/ioBroker.cometvisu/workflows/Test%20and%20Release/badge.svg)

# ioBroker.cometvisu

## адаптер cometvisu для ioBroker

Предоставляет визуализацию CometVisu через веб-адаптер ioBroker.

[CometVisu](https://www.cometvisu.org) — это веб-приложение для визуализации систем домашней автоматизации. Оно работает в браузере, настраивается через XML и разрабатывается в [CometVisu/CometVisu](https://github.com/CometVisu/CometVisu) . Этот адаптер предоставляет сборку CometVisu из установки ioBroker и подключает её к ioBroker в качестве бэкэнда.

## Требования

Визуализация осуществляется с помощью [iobroker.web](https://github.com/ioBroker/ioBroker.web) (версия 7.0.3 или новее), который также обеспечивает авторизацию, сессию и сокетное соединение. Этот адаптер не имеет собственного веб-сервера.

Для отображения графиков и исторических данных необходим адаптер истории ioBroker, например. `iobroker.sql` (4.1.1 или более поздняя версия).

## Настраивать

1. Установите адаптер и создайте экземпляр.
2. Выберите **версию CometVisu** . В списке представлены официальные релизы с GitHub, а также любые архивы, которые вы загрузите самостоятельно; выбранный архив будет распакован при сохранении.
3. Выберите **веб-экземпляр** , который должен его отображать.

Визуализация затем становится доступна по следующему пути: `http://<host>:<web port>/cometvisu/`.

## Как это работает

Адаптер сохраняет выбранную сборку на диске и регистрируется как расширение веб-адаптера. `common.webExtension`), который устанавливает его под `/cometvisu` Каждый релиз распаковывается в отдельную директорию, поэтому переключение на предыдущую не требует распаковки, а все, на что больше не ссылаются, удаляется при запуске.

CometVisu узнает, где можно установить связь через `X-CometVisu-Backend-*` Заголовки ответа, поэтому в самой визуализации не требуется настраивать бэкэнд. Она загружает соответствующую библиотеку сокетного клиента с того самого сервера, который её обслуживает, поэтому работают оба режима работы веб-адаптера с сокетами.

## Загрузка собственной сборки

Любой `CometVisu-*.tar.gz` Загрузить можно в настройках. Файлы для загрузки разделяются по имени, поэтому несколько файлов могут находиться рядом, и между ними можно переключаться. Повторная загрузка файла с тем же именем заменяет эту запись.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2026-09-14)

- (joltcoke) a CometVisu build is downloaded and unpacked when it is chosen in the settings, so starting the adapter no longer needs GitHub at all
- (joltcoke) setting the version outside the settings dialog no longer fetches anything: pick it there once and save, which a newly created instance now needs as well
- (joltcoke) an archive uploaded again under the same name is unpacked right away instead of only after a manual restart of the instance
- (joltcoke) the settings dialog shows how far the preparation of a build has come, and marks the selected version once it lies ready on the server
- (joltcoke) releases that were only tried out are removed when the settings dialog is closed instead of lying around until the next start
- (joltcoke) the settings dialog says when the release list is missing because GitHub rate limited the browser, and from when it will work again
- (joltcoke) the texts of the settings dialog are translated into all eleven adapter languages
- (joltcoke) the two version fields in the settings take the width they need instead of most of the panel
- (joltcoke) the settings component requires admin 8.0.11, which is the first version that can load it
- (joltcoke) updated @iobroker/json-config to 10.0.0, @iobroker/gui-components to 10.2.3 and @module-federation/vite to 1.21.3

### 0.0.6 (2026-09-12)

- (joltcoke) the settings dialog no longer makes the admin log a failed i18n request and a missing mf-manifest.json
- (joltcoke) updated @iobroker/testing to 6.2.1, which the adapter checker asks for

### 0.0.5 (2026-09-07)

- (joltcoke) the configuration manager and the editor of CometVisu now work, the adapter answers their API
- (joltcoke) editing requires a login on the web instance unless it is explicitly allowed without one
- (joltcoke) the editor completes addresses from the ioBroker states
- (joltcoke) files can be uploaded through the manager again

### 0.0.4 (2026-09-06)

- (joltcoke) the adapter now requires node.js 22 and is tested on 22 and 24
- (joltcoke) the admin page is available in all eleven languages ioBroker ships
- (joltcoke) updated express to 5, TypeScript to 6 in both packages, axios and tar to their current releases
- (joltcoke) dependabot updates are scheduled by cron, wait seven days and use the ioBroker automerge action

### 0.0.3 (2026-09-05)

- (joltcoke) "ioBroker" is no longer listed in "common.keywords", where the adapter checker rejects it

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Florian Schirmer <jolt@tuxbox.org>

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