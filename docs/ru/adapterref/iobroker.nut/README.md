---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: Rs0JbdWF5loJAmUA8FMqmFye6Ixfe56QaesmGChCUvg=
---
![Логотип](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Количество установок](http://iobroker.live/badges/nut-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nut.svg)
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.nut/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/nut/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nut.svg)

# ioBroker.nut

Этот адаптер для ioBroker подключается к определенному серверу NUT, чтобы предоставлять информацию о состоянии и характеристиках подключенного ИБП/USV в соответствии с данными ioBroker, что позволяет использовать его на этом сервере.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Описание параметров

### хост\_ип

IP-адрес сервера NUT. NUT должен работать в серверном режиме и быть доступен с компьютера, на котором работает адаптер iobroker NUT. Поэтому, если у вас возникли проблемы, проверьте настройки брандмауэра и разрешите доступ. Если ИБП подключен локально, вы также можете использовать 127.0.0.1 или localhost.

### хост\_порт

Порт NUT. Порт по умолчанию:<b> 3493</b>

### ups\_name

Название источника бесперебойного питания (ИБП), определенное в конфигурации NUT-сервера.</p> Подсказки:

- Если вы хотите подключиться к источнику бесперебойного питания (ИБП), соединенному с Synology DiskStation, используйте простое название "ups".
- Если вы хотите подключиться к ИБП, соединенному с NAS-сервером QNAP, имя будет просто "qnapups".

### интервал обновления

Интервал в секундах для обновления данных. Значение по умолчанию — 300 секунд.

## UPS-Monitor уведомляет

В комплект входит небольшой скрипт для Linux, расположенный по адресу scripts/nut-notify.sh, который можно настроить в upsmon.

Для выполнения скрипта необходимы права на запуск (chmod +x nut-notify.sh).

Его следует добавить в файл /etc/nut/upsmon.conf следующим образом:

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

Важным моментом является добавленный флаг "EXEC".

Простой пример скрипта nut-notify.sh:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Поиск неисправностей

Если у вас возникли проблемы и адаптер не передает данные, вы можете использовать два скрипта из каталога "test" установки адаптера (обычно это node\_modules/iobroker.nut/test относительно каталога установки iobroker), чтобы попробовать запустить его из командной строки. Вызовите скрипты, используя "node filename.js", чтобы увидеть ожидаемые параметры.</p>

- **test\_upslist.js** : Подключается к серверу NUT и возвращает список доступных имен ИБП.
- **test\_upsvars.js** : Подключается к серверу NUT для заданного источника бесперебойного питания (ИБП) и возвращает список доступных переменных ИБП.

## Все

- документация для веб-страницы

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.7.0 (2025-10-02)
* IMPORTANT: js-controller 6.0 is now needed at least
* (Apollon77) Dependencies updated

### 1.6.0 (2022-12-09)
* IMPORTANT: js-controller 3.0 is now needed at least
* (Apollon77) Delay adapter initialization when USV is not reachable on adapter start

### 1.5.1 (2022-02-19)
* (simatec) jsonConfig added
* (simatec) test and release updated

### 1.5.0 (2021-05-08)
* (Apollon77) Add connection states
* (Apollon77) Optimize for js-controller 3.3
* (foxriver76) we fixed the state value type set to `battery.charge`

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

Copyright (c) 2016-2025 Apollon77 <ingo@fischer-ka.de>

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