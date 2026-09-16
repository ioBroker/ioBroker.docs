---
chapters: {"pages":{"en/adapterref/iobroker.yeelight-2/README.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README.md"},"en/adapterref/iobroker.yeelight-2/README_de.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: ZGFYYcYBNVeQTdfclqw4SFECJCqDbFxj6Iys6qtdQL8=
---
![Логотип](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Количество установок](http://iobroker.live/badges/yeelight-2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

# ioBroker.yeelight-2

[Deutsche Beschreibung hier](/#/docs/adapterref/iobroker.yeelight-2/README_de.md)

Этот адаптер управляет устройствами Yeelight по локальной сети.

## Установка

Для управления всеми светильниками Yeelight необходимо включить функцию "Управление по локальной сети" в настройках приложения Yeelight.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Конфигурация

Вы можете добавлять устройства вручную или находить устройства в сети. Порт по умолчанию — 55443. При желании вы можете изменить имя, IP-адрес, порт и смарт-имя.

### умное имя

Если вы введете смарт-имя, устройство будет добавлено в iobroker.cloud и сможет управляться с помощью Alexa.

### Найти устройство

С помощью этой кнопки вы можете выполнить сканирование сети на наличие устройств. Если что-то будет найдено, устройства будут добавлены в таблицу. Сканирование сети занимает около 20 секунд. Если устройства не найдены, значит, функция "Управление локальной сетью" не включена или устройства находятся в другой сети.

### Устройство отсутствует в списке

Если вашего устройства нет в списке, например, YLTD003, используйте в этом случае другую лампу с аналогичными характеристиками (настольную лампу, цветную лампу или что-то еще).

## set\_scene

Применение: Этот метод используется для непосредственной установки интеллектуального светодиода в заданное состояние. Если устройство выключено, оно сначала включается, а затем применяется указанная команда.

Параметры: 3 \~ 4.

"class" может быть "color", "hsv", "ct", "cf", "auto\_dealy\_off".

- "Цвет" означает изменение цвета и яркости интеллектуального светодиода на заданный.
- "hsv" означает изменение цвета и яркости интеллектуального светодиода на заданные значения.
- "ct" означает изменение значения яркости и яркости интеллектуального светодиода на заданное значение ct.
- "cf" означает запуск цветового потока указанным способом.
- Параметр "auto\_delay\_off" включает интеллектуальный светодиод на заданную яркость и запускает таймер сна, который выключает свет через заданное количество минут.

"val1", "val2", "val3" являются специфичными для класса.

Пример запроса:

- `["color", 65280, 70]`
- `["hsv", 300, 70, 100]`
- `["ct", 5400, 100]`
- `["cf",0,0,"500,1,255,100,1000,1,16776960,70"]`
- `["auto_delay_off", 50, 5]`

ПРИМЕЧАНИЕ: Принимается как во включенном, так и в выключенном состоянии.

Для приведенных выше примеров:

- Первый способ — установить цвет на "652280" и яркость на 70%.
- Второй вариант — установить цвет на оттенок: 300, насыщенность: 70 и максимальную яркость.
- Третий способ — установить цветовую температуру 5400K и яркость на 100%.
- Четвертый способ — запустить бесконечный цветовой поток на основе двух кортежей потоков.
- Пятый способ — включить свет на 50% яркости, а затем выключить его через 5 минут.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.5.2 (2025-02-28)

-   (Black-Thunder) Incompatibilities with the dependency "joy" have been fixed and "joy" has been updated.

### 1.5.1 (2025-02-26)

-   (mcm1957) Update of joi has been reverted due to incompatibilities.

### 1.5.0 (2025-02-26)

-   (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now
-   (Black-Thunder) Online status for each device has been added (visible in admin object tree).
-   (Black-Thunder) Support for compact mode has been added.
-   (Black-Thunder) Code has been partially refeactored.
-   (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-29)

-   (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
-   (mcm1957) Dependencies have been updated

### 1.3.1 (2024-02-15)

-   (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
-   (Black-Thunder) Crashes at startup of adapter have been fixed. [#271, #227 and #222]
-   (mcm1957) Testing has been changed to support node 18 and 20
-   (mcm1957) Dependencies have been updated
-   (Apollon77) make sure reconnects work correctly

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2024 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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