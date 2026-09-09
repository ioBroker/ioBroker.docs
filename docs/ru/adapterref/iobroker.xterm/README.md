---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: 0uuabNMYkIc1bZGSRLdEUxqWU4GqkDMo793/0LOQttM=
---
![Логотип](../../../en/adapterref/iobroker.xterm/admin/xterm.svg)

![Количество установок](http://iobroker.live/badges/xterm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# ioBroker.xterm

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## адаптер xterm для ioBroker

Этот адаптер позволяет выполнять команды оболочки на хосте ioBroker. Он заменяет собой`ioBroker.terminal` адаптер.

Терминальный сервер открывает интерфейс командной строки. Используйте его только в административных целях.

Основано на пакетах xterm.js и node-pty.

Если аутентификация включена, войти в систему сможет только пользователь ioBroker с правами "admin".

## Использование

Адаптер запускает cmd.exe (Windows) или bash (Linux) через настоящий псевдотерминал (node-pty). В Linux bash работает под управлением`iobroker` пользователь — вы можете переключиться на другого пользователя с более высокими привилегиями через`su USER` .

### Постоянные терминалы

Оболочки работают в сетевом адаптере, а не в браузере. Если соединение обрывается или страница перезагружается, терминалы продолжают работу и восстанавливаются вместе со своим содержимым — длительно выполняющиеся команды не прерываются.

Терминал считается завершенным, если он явно закрыт или если браузер не возвращается в течение заданного **времени ожидания сессии** (по умолчанию 5 минут);`0` (немедленно завершает работу оболочки при отключении браузера).

## Клавиатурные сочетания

| Быстрый доступ                 | Действие                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Ctrl+Shift+V**               | Открыть диалоговое окно вставки (полезно при HTTP-соединениях, где API буфера обмена недоступен). |
| **Ctrl+Shift+F**               | Поиск в терминале, прокрутка назад                                                                |
| **Щелчок правой кнопкой мыши** | Вставить из буфера обмена (HTTPS) или открыть диалоговое окно вставки (HTTP)                      |
| Выделите текст                 | Автоматическое копирование в буфер обмена (в стиле PuTTY)                                         |

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.1 (2026-08-07)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@GermanBluefox) Dropped support of Node.js 20
* (@GermanBluefox) Added SVG icon
* (@GermanBluefox) The terminals now run on the server: they survive a reload or a lost connection and are restored with their content
* (@GermanBluefox) Added the setting for the session timeout
* (@GermanBluefox) Fixed the HTTPS mode: the adapter did not start the web server at all if `secure` was enabled
* (@GermanBluefox) Fixed the shown client IP addresses in `info.connection`
* (@GermanBluefox) Errors of the web socket connection do not terminate the adapter anymore
* (@GermanBluefox) A shell that cannot be started is not restarted endlessly anymore
* (@GermanBluefox) All shells are terminated now if the adapter stops
* (@GermanBluefox) Fixed the double connections of the GUI after a connection timeout

### 3.1.0 (2026-06-04)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under a specified user on Linux
* (bluefox) Implemented paste on right mouse click
* (bluefox) Implemented authentication for the terminal

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

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.xterm/blob/master/CHANGELOG_OLD.md)

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