---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ph803w/README.md
title: ioBroker.ph803w
hash: 8wZbHpuiBtQyAgZqIYG/VC/asesHfdIonX8K+2YJby0=
---
![Логотип](../../../en/adapterref/iobroker.ph803w/admin/ph803w.png)

![Количество установок](http://iobroker.live/badges/ph803w-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ph803w.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ph803w.svg)

# IoBroker.ph803w
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.ph803w/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/ph803w/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер ph803w для ioBroker
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Запросить значения PH и Redox с устройств PH803-W в вашей сети.

## Конфигурация
Адаптер не требует настройки. Он автоматически обнаружит устройства PH803W через пакеты UDP в вашей сети. Это означает, что сервер ioBroekr и устройство должны находиться в одной сети.
Обнаружение выполняется при запуске адаптера, что означает, что для обнаружения новых устройств, добавленных во время работы адаптера, может потребоваться перезапуск адаптера.

## Делать
* улучшение тестирования: проверки состояния и setState's
* при необходимости можно указать локальный сетевой интерфейс для прослушивания пакетов UDP
* при необходимости разрешить добавление собственных устройств по IP, если обнаружение не работает
* при необходимости добавьте состояние для отправки другого пакета обнаружения во время работы адаптера, чтобы разрешить обнаружение новых устройств без перезапуска адаптера

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого проблемы GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог "log" в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Changelog

### 0.1.5 (2021-06-09)
* (Apollon77) Optimize edge cases on device connection and try reconnect and make sure connection status is correct
* (Apollon77) Better handle pingpong related reconnects

### 0.1.4 (2021-06-09)
* (Apollon77) Remove unit from PH again after feedback

### 0.1.3 (2021-06-09)
* (Apollon77) Add title property

### 0.1.2 (2021-06-09)
* (Apollon77) Add unit for PH value

### 0.1.1 (2021-06-09)
* (Apollon77) Initial commit

## License
MIT License

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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