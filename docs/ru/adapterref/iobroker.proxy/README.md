---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: UTpkl3VurYY2nwv7WNVQlk5UkRFhLRNI6n5HQjN73a8=
---
![Логотип](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Количество установок](https://iobroker.live/badges/proxy-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.proxy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.proxy/actions/workflows/test-and-release.yml/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# ioBroker.proxy

## Использование

Позволяет получать доступ к заданным URL-адресам или локальным файлам через один веб-сервер.

Настроенные маршруты доступны по адресу: `http://ip:8082/proxy.0/context/...` Порт, протокол и `proxy.0` варьируется в зависимости от настроек.

## Конфигурация

- Использовать в качестве расширения веб-адаптера: экземпляр веб-сайта, который расширяет этот прокси.
- Путь маршрута: путь к прокси-серверу. Если он... `/proxy.0` Маршруты доступны по адресу: `http://webIP:8082/proxy.0/...` Пустой означает `proxy.<instance>/` Установите его на `/` установить маршруты непосредственно под корнем веб-сервера, например, в контексте. `.well-known/acme-challenge/` затем доступно по адресу `http://webIP:8082/.well-known/acme-challenge/...`
- Используйте простой прокси (без сокетов): применяется очень простой, но надежный метод. Он не подходит для веб-сокетов или POST-запросов. Используйте его, если у вас возникли проблемы с веб-экземпляром или со связью через socket.io.
- Тайм-аут ошибки (мс): минимальный интервал между повторными попытками, если запрошенный ресурс был недоступен или вернул ошибку.
- Максимальное количество параллельных запросов: значение по умолчанию для всех путей, сколько запросов может выполняться одновременно (не используется простым прокси).

## Пример настроек

| Контекст       | URL                              | Описание                                                                             |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| администратор/ | <http://localhost:8081>          | доступ к странице администратора                                                     |
| маршрутизатор/ | <http://192.168.1.1>             | доступ к локальному маршрутизатору                                                   |
| камера/        | <http://user:pass@192.168.1.123> | доступ к веб-камере (например, вызов <http://ip:8082/proxy.0/cam/web/snapshot.jpg> ) |
| директор/      | /tmp/                            | доступ к локальному каталогу "/tmp/"                                                 |
| директор/      | тмп/                             | доступ к локальному каталогу "/opt/iobroker/node\_modules/tmp"                       |
| файл.jpg       | /tmp/picture.jpg                 | доступ к локальному файлу "/tmp/picture.jpg"                                         |

Относительные пути к локальным файлам и каталогам являются относительными по отношению к... `node_modules` каталог ioBroker (например) `/opt/iobroker/node_modules`).

Каждое правило может иметь свой собственный тайм-аут и максимальное количество параллельных запросов. Если они пусты, используются тайм-аут ошибки и максимальное количество параллельных запросов из основных настроек.

**Не ко всем устройствам можно получить доступ через прокси.**

Некоторые устройства предпочитают располагаться в корневом каталоге. `http://ip/` и не может работать при `http://ip/proxy.0/context/`.

Подробнее о контексте можно прочитать [здесь](https://www.npmjs.com/package/http-proxy-middleware#context-matching) .

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 2.0.1 (2026-11-02)
- (bluefox) **Breaking change:** Node.js >= 22.19 and admin >= 7.6.20 are required now
- (bluefox) The adapter was refactored to TypeScript and JsonConfig; `request` was replaced by `axios` and `mime` by `mime-types`
- (bluefox) Fixed: files outside of a configured local directory could be read via ".." in the path
- (bluefox) Fixed: the timeout check was not stopped when web unloaded the extension
- (bluefox) Documented how to install the routes directly below the root of the web server (route path `/`) (#133)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (ipod86) Credentials are masked in all log lines (`user:pass@` and query parameters like `password`, `user`, `token`, `apikey`); the proxy options are logged at debug level only (#276)

### 1.3.2 (2022-10-01)
* (Apollon77) Allow to also proxy files directly

### 1.3.1 (2022-06-02)
* (Apollon77) Revert the automatic WS upgrade call added in 1.3.0 because produced sometimes issues with websocket connections

### 1.3.0 (2022-05-30)
* (Apollon77) Allow to configure the maximum parallel requests by route and/or globally. Default is 10 as of now too
* (Apollon77) Try to prevent crashes by socket errors

### 1.2.2 (2021-03-07)
* (Apollon77) Fallback to "application/octet-stream" when mime type for a file could not be determined
* (Apollon77) Cut filenames when looking them up in the filesystem if "?" or "#" are included

## License
The MIT License (MIT)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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