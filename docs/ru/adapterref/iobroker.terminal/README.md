---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.terminal/README.md
title: ioBroker.terminal
hash: ZZUCE3j4xkxwIK4+7HyosDUwF5C6LifjWIpPll8AKU0=
---
![Логотип](../../../en/adapterref/iobroker.terminal/admin/terminal.png)

![Количество установок](http://iobroker.live/badges/terminal-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.terminal.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.terminal/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/terminal/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.terminal.svg)

# ioBroker.terminal

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Основано на [веб-терминале](https://github.com/rabchev/web-terminal) от Рабчева.

Терминальный сервер открывает интерфейс командной строки. Используйте его только в административных целях.

![Скриншот](../../../en/adapterref/iobroker.terminal/img/screen1.png)

## Changelog
### 1.0.0 (2022-10-08)
* (bluefox) Check only port of the interface and not of all interfaces
* (Apollon77) Fix some crash cases reported by Sentry
* (Apollon77) Prepare for future js-controller versions

### 0.2.6 (2022-05-12)
* (Apollon77) Fix crash cases as reported by Sentry

### 0.2.5 (2022-04-25)
* (Apollon77/GottZ) Optimize process kill behaviour when using CTRL-C

### 0.2.4 (2022-04-23)
* (Apollon77) Fix pot crash cases reported by Sentry

### 0.2.3 (2022-04-19)
* (Apollon77) Prevent crash when initializing web server with invalid configuration

### 0.2.2 (2022-04-07)
* (Apollon77) Fix initialization of ports

### 0.2.1 (2022-03-13)
* (Apollon77) Fix pot crash cases reported by Sentry (IOBROKER-TERMINAL-1)

### 0.2.0 (2022-03-12)
* (Apollon77) add info-connection state
* (Apollon77) General update and optimizations

### 0.1.2
* (bluefox) show connection state

### 0.1.1
* (bluefox) add command ll

### 0.1.0
* (bluefox) add css style selector

### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox

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