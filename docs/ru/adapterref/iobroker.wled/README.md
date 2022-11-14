---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: E3OIGsPjegbE2pMLuI1ubD3CpiZCu/EKcoyg+2WlpSI=
---
![Логотип](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.wled.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Количество установок](https://iobroker.live/badges/wled-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/wled-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![НПМ](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
**Тесты:** ![Тестируйте и выпускайте](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств.** Подробнее см. ниже!

## Wled адаптер для ioBroker
Быстрая и многофункциональная реализация веб-сервера ESP8266/ESP32 для управления светодиодами NeoPixel (WS2812B, WS2811, SK6812, APA102) или наборами микросхем на основе SPI, такими как WS2801!

[WLED — проект Github](https://github.com/Aircoookie/WLED) от @Aircoookie

## Инструкции
Адаптер автоматически пытается найти устройства WLED в вашей сети, используя сервисы Bonjour.
Известные проблемы: Сети с разделением VLAN в основном не маршрутизируют широковещательный трафик, что означает, что автоопределение не будет выполнено.

Не волнуйтесь, в этом случае вы можете добавить устройство вручную по IP-адресу.

1) Убедитесь, что ваше устройство WLED работает и доступно по сети 2) Установите адаптер 3) Настройте интервалы для опроса данных и циклов автоматического обнаружения 4 - A) Запустите адаптер, устройства должны быть обнаружены автоматически 4 - B) Если A не работает , используйте кнопку «Добавить устройство» и укажите IP-адрес устройства. 5) Адаптер будет немедленно отправлять изменения и опрашивать данные каждые x секунд (настраивается)

## Поддержите меня
Если вам нравится моя работа, не стесняйтесь сделать личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.6.7 (2022-06-08) - Bugfix [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)
* (DutchmanNL) Bugfix: Cannot read property 'initialized' of undefined handleStates solved [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)

### 0.6.6 (2022-06-08) - Log messages and error reporting improved
* (DutchmanNL) Log messages and error reporting improved
* (DutchmanNL) Don't send missing attribute definitions to Sentry

### 0.6.5 (2022-06-04) - Correct indication of connection state
* (DutchmanNL) Dependency updates
* (DutchmanNL) Bugfix: Correct indication of connection state #307
* (DutchmanNL) Improve error messages & sentry reporting

### 0.6.3 (2021-09-08) - HotFixes
* (DutchmanNL) Missing dropdown for ID of effects added
* (DutchmanNL) HotFix: Missing axios dependency added

### 0.6.1 (2021-09-08)
* (DutchmanNL) Missing state definitions WLED FW 0.13.0-b12 added.

## License
MIT License

Copyright (c) 2022 DutchmanNL <rdrozda86@gmail.com>

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