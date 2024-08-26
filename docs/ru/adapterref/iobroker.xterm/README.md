---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: Yd+XjBxXX/gFGwzCrttfIJrU0k9so6ikCV9JwSCDE1M=
---
![Логотип](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![Количество установок](http://iobroker.live/badges/xterm-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# IoBroker.xterm
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер xterm для ioBroker
Этот адаптер позволяет выполнять команды оболочки на хосте ioBroker. Он заменяет адаптер `ioBroker.terminal`.

Терминальный сервер для открытия интерфейса командной строки.
Пожалуйста, используйте его только для целей администрирования.

На основе пакетов xterm.js и node-pty.

Если аутентификация включена, только пользователь ioBroker с правами администратора может войти в систему.

## Применение
Адаптер поддерживает 2 режима:

- Запускает cmd.exe (Windows) или Bash (Linux). В Linux bash работает под пользователем iobroker, и, возможно, вам следует переключиться на другого пользователя с большими привилегиями (через su USER).
- Или имитировать оболочку с помощью node.js (Вы можете активировать эту опцию, если первая опция не работает)

Примечание. Некоторые команды терминала с интерактивностью не работают. Например. `nano` и некоторые другие.

## СДЕЛАТЬ
- Моделирование: Ctrl + R (История)
- Моделирование: больше страниц кодирования. Если вы найдете кодовую страницу, подходящую для вашей системы, создайте вопрос. Возможные страницы кодирования можно найти [здесь](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).
- Поддержка более одного сеанса (вкладки)

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 1.1.0 (2022-10-08)
* (Apollon77) Update xterm library
* (Apollon77) Prepare for future js-controller versions

### 1.0.0 (2022-08-29)
* (bluefox) Check only port of the interface and not of all interfaces

### 0.3.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework info.connection status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2022 ioBroker <dogafox@gmail.com>

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
