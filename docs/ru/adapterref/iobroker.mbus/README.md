---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: tyTLsMMCuxELtkp/VoxbH58o6dhpl/Pep6sPfwIfx+Y=
---
![Логотип](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![Количество установок (последние)](https://iobroker.live/badges/mbus-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/mbus-stable.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.mbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mbus.svg)

# IoBroker.mbus
======================

![Тестируйте и выпускайте](https://github.com/Apollon77/ioBroker.mbus/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/mbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер для ioBroker подключается к ведущему устройству M-Bus через TCP или последовательный порт для предоставления статуса и сведений о подключенных устройствах M-Bus.

## Описание параметров
### IP-адрес шлюза/TCP-порт
IP-адрес и порт M-Bus Master/Gateway при использовании TCP.

### Последовательный порт/скорость передачи
Последовательный порт и скорость передачи M-Bus Master/Gateway.

### Интервал обновления
Интервал в секундах для обновления данных. По умолчанию (если пусто) 3600 с (1 час). Подумайте, как питаются устройства на шине M-Bus, чтобы предотвратить разрядку батарей. Если вы установите интервал равным 0, то устройство считывается только один раз при запуске адаптера, но не автоматически.

### Идентификаторы устройств
Вы можете использовать первичные (1-250) и вторичные (длиной 16 символов) идентификаторы M-Bus.

## Как читать Устройство по запросу?
В созданных состояниях для каждого устройства существует одно состояние, называемое «updateNow». Когда вы устанавливаете это значение в true (как управляющее действие с ack=false), устройство обновляется немедленно. Если интервал настроен, интервал перезапускается после получения данных.

## Сделать
* зашифрованная обработка полезной нагрузки (если кому-то нужно)

## Как сообщать о проблемах и запросах функций
Пожалуйста, используйте для этого задачи GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Режим эксперта -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не от администратора, потому что администратор обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Changelog
### 2.4.0 (2022-06-30)
* IMPORTANT: Node.js 12.x is now required at least
* (Apollon77) Several updates and optimizations

### 2.3.4 (2021-03-07)
* (Apollon77) Send a reset to the device before reading data

### 2.3.2 (2021-02-27)
* (Apollon77) Prevent crash case(Sentry IOBROKER-MBUS-H)

### 2.3.1 (2020-10-30)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MBUS-F)

### 2.3.0 (2020-08-02)
* (Apollon77) mbus library updated

### 2.2.3 (2020-07-26)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-C)

### 2.2.2 (2020-07-23)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-B)

### 2.2.1 (2020-06-30)
* (Apollon77) prevent crash (Sentry IOBROKER-MBUS-7)

### 2.2.0 (2020-04-13)
* (Apollon77) make compatible with nodejs 13+

### 2.1.6 (2020-04-12)
* (Apollon77) update dependencies

### 2.1.5 (2020-03-08)
* (Apollon77) update dependencies

### 2.1.4 (2020-02-08)
* (Apollon77) optimize adapter stop logic to prevent crashes (again)

### 2.1.3 (2020-02-05)
* (Apollon77) optimize adapter stop logic to prevent crashes
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <ingo@fischer-ka.de>

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
