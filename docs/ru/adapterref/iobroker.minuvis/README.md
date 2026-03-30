---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: sjBsvncchkYo53C+9AmXwEPSY2IK3cgv7ZYsuNZJx1U=
---
![Логотип](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Количество установок (последние)](http://iobroker.live/badges/minuvis-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Статус сборки](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## Адаптер minuvis для ioBroker
Визуализация для всех устройств

## Инструкции
- установите адаптер как обычно
- создать экземпляр minuvis (возможен только 1 вариант)
- включить экземпляр socket.io в экземпляре веб-сервера

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- открыть экземпляр Minuvis

![экземпляр minuvis](https://minukodu.de/githubimg/minuvis_instance.jpg)

- Подключитесь к веб-порту socket.io или к собственному экземпляру socket.io.

![соединять](https://minukodu.de/githubimg/minuvis_connect.jpg)

- добавить новую страницу

![добавить страницу](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- добавить виджет

![добавить виджет](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- изменить состояние

![выберите штат](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- Предварительный просмотр вашего нового приложения

![предварительный просмотр](https://minukodu.de/githubimg/minuvis_preview.jpg)

Для получения дополнительной информации посетите https://minukodu.de/en или посмотрите видео на YouTube https://youtu.be/dtHUBOEc4js

# ВАЖНЫЙ !!!!
Обратите внимание: если вы обновляете программу с версии < 1.3.0, пожалуйста, учтите следующее:

* Сначала обновите до версии 1.4 и сохраните конфигурационные файлы в новом месте.

########################################################################
* **КРИТИЧЕСКИ ВАЖНЫЕ ИЗМЕНЕНИЯ** во второй версии см.: https://minukodu.de/en/news/minuvis-20-iobroker-available
* Инструкции по обновлению с v1 на v2 см.: https://minukodu.de/en/news/update-minuvis-v1-v2

* Если вы хотите сохранить версию 1, используйте этот образ Docker: https://hub.docker.com/r/sepp68/minuvis-image

########################################################################

## Changelog
### 2.7.1 (2026-02-22)
* updated README
* updated app and builder to V2.7.1

### 2.7.0 (2026-02-15)
* fixing issues detected by repository checker
* updated app and builder to V2.7.0

### 2.6.6 (2026-02-11)
* updated app and builder to V2.6.6

### 2.6.5 (2026-01-26)
* updated app and builder to V2.6.5

### 2.6.4 (2026-01-19)
* updated app and builder to V2.6.4

### 2.6.3 (2026-01-18)
* updated app and builder to V2.6.3

### 2.6.2 (2026-01-06)
* updated app and builder to V2.6.2

### 2.3.4 (2024-02-09)
* updated app and builder to V2.3.4

### 2.3.3 (2023-04-04)
* updated app and builder to V2.3.3

### 2.3.2 (2023-03-18)
* remove bug in io-package.json file

### 2.3.1 (2023-03-17)
* updated app to V2.3.1

### 2.3.0 (2022-01-30)
* updated app and builder to V2.3.0

### 2.2.1 (2021-11-03)
* updated app to V2.2.1

### 2.2.0 (2021-09-19)
* updated app and builder to V2.2.0

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

## License
MIT License

Copyright (c) 2026 svallant <svallant@gmx.eu>

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