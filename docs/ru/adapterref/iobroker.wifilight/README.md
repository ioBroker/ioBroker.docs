---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: 7c2nJoRfY/j3XWOssHmvFNnG3HeclP8bAs9OJXfF87Q=
---
![Логотип](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![Количество установок](http://iobroker.live/badges/wifilight-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wifilight.svg)

# IoBroker.wifilight
![Тест и выпуск](https://github.com/iobroker-community-adapters/iobroker.wifilight/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/wifilight/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Описание
Адаптер ioBroker для WiFi Light

## Информация
Поддерживает LW12, LD382 и LD382A.
Добавлена поддержка Mi-Light/LimitlessLED RGBW.

## Первоначальное создание
Этот адаптер изначально был создан @soef на https://github.com/soef/ioBroker.wifilight, но больше не поддерживается, поэтому мы переместили его в iobroker-community, чтобы можно было исправить ошибки. Спасибо @soef за его работу.

### Как использовать команду state:
+ Возможные идентификаторы: ``red, r, green, g, blue, b, bri, sat, transition, on, off`` + Строка может быть JSON с скобками или без них.
+ Вы также можете назначить значение с помощью = + Диапазон цветов: `0..255` + Диапазон bri: `0..100`

Некоторые примеры:

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

Чтобы изменить цвет, вам не обязательно использовать все три значения.
Например, `red = 0`, синий и зеленый останутся неизменными.

### R, g, b, w Штаты:
+ Значения 0..255 + \#rrggbb[ww]

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.2 (2024-08-12)
* (mcm1957) files section has been fixed

### 1.3.1 (2024-08-12)
* (p-kehling) Added ignorance of acknowledgement messages for on/off commands
* (bluefox) refactoring

### 1.2.2 (2024-04-15)
* (mcm1957) Fix js-controller dependency

### 1.2.1 (2024-04-13)
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.4 (2022-06-17)
* (Apollon77) Prevent a crash case reported by sentry

### 1.1.3 (2022-04-27)
* (Apollon77) Prevent a crash case reported by sentry

### 1.1.2 (2022-04-19)
* (Apollon77) Prevent crashes when states are controlled with null as value

### 1.1.1 (2022-04-17)
* (Apollon77) Prevent error logs with js-controller 3+
* (Apollon77) Added sentry for error reporting

### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2022 ioBroker Community Developers, 2019-2020 soef <soef@gmx.net>, 

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