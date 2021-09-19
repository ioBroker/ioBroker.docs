---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: yUz3ldjCTS+rHznLQDtBRUNUoyt13EdVQGBZ5/F0/2I=
---
![Логотип](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xterm.svg)
![Количество установок (последнее)](http://iobroker.live/badges/xterm-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/xterm-stable.svg)
![Статус зависимости](https://img.shields.io/david/bluefox <dogafox@gmail.com>/iobroker.xterm.svg)
![Известные уязвимости](https://snyk.io/test/github/bluefox <dogafox@gmail.com>/ioBroker.xterm/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.xterm.png?downloads=true)

# IoBroker.xterm
## Адаптер xterm для ioBroker
Этот адаптер позволяет выполнять команды оболочки на хосте ioBroker. Он заменяет адаптер `ioBroker.terminal`.

Терминальный сервер, чтобы открыть интерфейс командной строки.
Пожалуйста, используйте его только в административных целях.

На основе пакетов xterm.js и node-pty.

Если аутентификация включена, только пользователь ioBroker «admin» может войти в систему.

## Использование
Адаптер поддерживает 2 режима:

- Запускает cmd.exe (windows) или bash (linux). В Linux bash запускается под пользователем `iobroker`, и, возможно, вам следует переключиться на другого пользователя с большими привилегиями (через` su USER`).
- Или смоделировать оболочку с помощью node.js (вы можете активировать эту опцию, если первая опция не работает)

Примечание. Некоторые интерактивные команды терминала не работают. Например. `nano` и некоторые другие.

## ДЕЛАТЬ
- Моделирование: Ctrl + R (История)
- Моделирование: больше страниц кодирования. Если вы найдете кодовую страницу, подходящую для вашей системы, создайте проблему. Возможные страницы кодирования можно найти [здесь] (https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).
- Поддержка более одного сеанса (вкладки)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
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

Copyright (c) 2021 ioBroker <dogafox@gmail.com>

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