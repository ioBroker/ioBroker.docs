---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: pStvbquMEGwMuxEmQzOyowIP4eNECtJUsXFGkpvHiAA=
---
![Логотип](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wled.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wled-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wled-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.wled/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.wled/workflows/Test%20and%20Release/badge.svg)

** Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. ** Подробнее см. Ниже!

## Wled адаптер для ioBroker
Быстрая и многофункциональная реализация веб-сервера ESP8266 / ESP32 для управления светодиодами NeoPixel (WS2812B, WS2811, SK6812, APA102), а также наборами микросхем на основе SPI, такими как WS2801!

[WLED - проект Github](https://github.com/Aircoookie/WLED), автор: @Aircoookie

## Инструкции
Адаптер автоматически пытается найти устройства WLED в вашей сети с помощью служб Bonjour.
Известные проблемы: сети с разделением VLAN в большинстве случаев не маршрутизируют широковещательный трафик, что означает, что автоматическое обнаружение не будет выполнено.

Не волнуйтесь, в этом случае вы можете добавить устройство вручную по IP-адресу.

1) Убедитесь, что ваше устройство WLED работает и доступно по сети 2) Установите адаптер 3) Настройте интервалы времени для опроса данных и циклов автоопределения 4 - A) Запустите адаптер, устройства должны обнаруживаться автоматически 4 - B) Если A выходит из строя , используйте кнопку «Добавить устройство» и укажите IP-адрес устройства. 5) Адаптер немедленно отправит изменения и опрашивает данные каждые x секунд (настраивается)

## Поддержите меня
Если вам нравятся мои работы, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш идентификатор установки (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.6.3 (2021-09-08) - HotFixes
* (DutchmanNL) Missing dropdown for ID of effects added
* (DutchmanNL) HotFix: Missing axios dependency added

### 0.6.1 (2021-09-08)
* (DutchmanNL) Missing state definitions WLED FW 0.13.0-b12 added.

### 0.6.0 (2021-08-31) - Support Websocket connections
* (DutchmanNL) System load reduced
* (DutchmanNL) All warnings related to JS-Controller 3.x checks solved
* (DutchmanNL) Ensure legacy support of WLED FW < 0.12 (fallback to http-API instead of websocket)
* (DutchmanNL) Communication by websocket implemented, this feature allows live data updates (instead of interval polling). Requires WLED firmware >= 12

### 0.5.9 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) added min & max for brightness value to support iOT adapter

### 0.5.8 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) Bugfix Live override datapoint created as read-only #252
* (DutchmanNL) excluded value "PIR" from data write due to current formatting

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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