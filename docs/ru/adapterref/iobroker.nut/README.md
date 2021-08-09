---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: Ty2TUQVoPfL4x6EuLPk3oAeQRg9BuuixVh42eCA/DEE=
---
![Логотип](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Количество установок](http://iobroker.live/badges/nut-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nut.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nut.svg)

# IoBroker.nut
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.nut/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/nut/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер для ioBroker подключается к определенному серверу NUT, чтобы предоставить статус и подробную информацию о подключенном ИБП / USV, как сообщает ioBroker, чтобы его можно было там использовать.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Описание параметров
### Host_ip
IP-адрес NUT-сервера. NUT должен работать в режиме сервера и быть доступным для компьютера, на котором работает адаптер iobroker NUT. Поэтому проверьте настройки брандмауэра, если у вас есть проблемы, и разрешите доступ. Если ИБП подключен локально, вы также можете использовать 127.0.0.1 или localhost.

### Host_port
Порт НУТ. Порт по умолчанию - <b>3493.</b>

### Ups_name
Имя ИБП, как определено в конфигурации NUT сервера NUT. </p> Подсказки:

- Если вы хотите подключиться к ИБП, подключенному к дисковой станции Synology, имя будет просто «ups».
- Если вы хотите подключиться к ИБП, подключенному к QNAP NAS, имя будет просто «qnapups».

### Update_interval
Интервал в секундах для обновления данных. По умолчанию - 300 с.

## UPS-Monitor Уведомляет
Включен небольшой сценарий оболочки linux по адресу scripts / nut-notify.sh, который можно настроить в upsmon.

Скрипту необходимы права на выполнение (chmod + x nut-notify.sh).

Его нужно добавить в /etc/nut/upsmon.conf, например:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Дополнительно настройте все соответствующие уведомления, например:

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```

Важным является добавленный флаг «EXEC».

Вот простой пример сценария nut-notify.sh:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Поиск проблемы
Если у вас возникли проблемы и адаптер не доставляет данные, вы можете использовать два сценария в каталоге "test" установки адаптера (обычно в node_modules / iobroker.nut / test относительно каталога установки iobroker), чтобы опробовать его на командная строка. Вызовите сценарии, используя "node filename.js", чтобы увидеть ожидаемые параметры. </p>

* **test_upslist.js** подключается к серверу NUT и возвращает список доступных имен ИБП.
* **test_upsvars.js** подключается к серверу NUT для определенного ИБП и возвращает список доступных переменных ИБП.

## Делать
* документы для веб-страницы

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (foxriver76) we fixed the state value type set to `battery.charge`
* (Apollon77) Add connection states

### 1.4.3 (2021-02-04)
* (Apollon77) Enhance the port check

### 1.4.2 (2021-01-23)
* (Apollon77) Check configured port before using it (Sentry IOBROKER-NUT-3)

### 1.4.1 (2021-01-21)
* (Apollon77) Optimize stop handling (Sentry IOBROKER-NUT-1)

### 1.4.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Require at least js-controller 2.0

### 1.3.0 (2020-12-27)
* (Apollon77) adjust connection close handling
* (Apollon77) add compact mode

### 1.2.0 (2020-12-26)
* (Apollon77) update dependencies
* (Apollon77) Add Sentry error reporting

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2020 Apollon77 <ingo@fischer-ka.de>

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