---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: KIHNdM8FMczv17rFWpZdDZLTqFOky2QAamKqcdMWbZ0=
---
![Логотип](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![Количество установок](http://iobroker.live/badges/xterm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# IoBroker.xterm
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Адаптер xterm для ioBroker
Этот адаптер позволяет выполнять команды оболочки на хосте ioBroker. Он заменяет адаптер `ioBroker.terminal`.

Терминальный сервер для открытия интерфейса командной строки.
Пожалуйста, используйте его только в административных целях.

Основано на пакетах xterm.js и node-pty.

Если аутентификация включена, войти в систему сможет только пользователь ioBroker с правами "admin".

## Использование
Адаптер запускает cmd.exe (Windows) или bash (Linux) через настоящий псевдотерминал (node-pty).
В Linux bash работает под пользователем `iobroker` — вы можете переключиться на другого пользователя с большими привилегиями через `su USER`.

## Сочетания клавиш
| Ярлык | Действие |
|------------------|-------------------------------------------------------------------------------------|
| **Ctrl+Shift+V** | Открыть диалог вставки (полезно при HTTP-соединениях, где API буфера обмена недоступен) |
| **Ctrl+Shift+F** | Поиск в прокрутке терминала |
| **Щелчок правой кнопкой мыши** | Вставить из буфера обмена (HTTPS) или открыть диалоговое окно вставки (HTTP) |
| Выделить текст | Автоматически копируется в буфер обмена (в стиле PuTTY) |

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 3.0.2 (2026-04-13)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under specified user on Linux

### 3.0.0 (2026-04-12)
* (bluefox) Migrated the adapter to Typescript
* (bluefox) Added multiple terminal sessions

### 2.0.1 (2023-09-18)
* (bluefox) xterm library updated
* (bluefox) Move Lets encrypt settings to acme adapter
* (bluefox) Minimal supported node.js version is 16

### 1.1.0 (2022-10-08)
* (Apollon77) Updated the xterm library
* (Apollon77) Prepared for future js-controller versions

### 1.0.0 (2022-08-29)
* (bluefox) Check only port of the interface and not of all interfaces

### 0.3.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to the simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework `info.connection` status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to the simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed the type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2026 ioBroker <dogafox@gmail.com>

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