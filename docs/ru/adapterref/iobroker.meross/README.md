---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: DwnhRiQ86diHMEuGidaw65VZ+1L8kmoYbYP7aZSGch8=
---
![Логотип](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![Количество установок](http://iobroker.live/badges/meross-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.meross.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meross.svg)

# IoBroker.meross
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.meross/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/meross/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Отказ от ответственности
**Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения с их стороны или любых связанных с ними дочерних компаний! Этот личный проект поддерживается в свободное время и не преследует никакой коммерческой цели.** **MEROSS является торговой маркой Chengdu Meross Technology Co., Ltd.**

## Описание
Этот адаптер позволяет управлять устройствами Meross путем подключения к облачным серверам Meross.

Вам необходимо предоставить свои учетные данные для входа в облако. Адаптер подключается к вашей облачной учетной записи и подписывается на все данные устройства через MQTT. Из-за этого устройства необходимо подключить к своему облаку. В настоящее время неизвестен способ локального управления устройствами.

Один экземпляр адаптера покажет все устройства из одной учетной записи Meross Cloud и позволит управлять ими.

Если в учетную запись Meross Cloud добавляются новые устройства, необходимо перезапустить адаптер Meross, чтобы соответствующим образом обновить дерево данных iobroker адаптеров.

## Примечание при использовании MFA
Адаптер позволяет ввести в настройках текущий код MFA. Имейте в виду, что код действителен только 30 секунд, поэтому введите и сохраните быстро :-)

Адаптер пытается запомнить токен, но через некоторое время этот токен заканчивается! Таким образом, при использовании MFA это означает, что при перезапуске адаптера новый вход в систему невозможен, поскольку токен недействителен, как и код MFA! В этом случае адаптер останется в автономном режиме до тех пор, пока вы не введете новый код MFA.

## Известные рабочие устройства
Судя по моим текущим знаниям, все устройства должны работать. Но, пожалуйста, проверьте журналы или сообщите о любых функциях или новых типах устройств, которые не создают состояния (мне необходимо добавлять новые типы устройств вручную, поэтому проблема важна).

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого выпуски GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не из администратора, потому что администратор обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub, А также опишите, что я вижу в журнале и в какое время.

## Changelog
### 1.17.0 (2023-12-30)
* (Apollon77) Adjust Signin API and add support for MFA
* (Apollon77) Store login token and try to reuse it for reconnections, but also do not log out anymore
* (Apollon77) Add support for DoorWindow Sensor MS200HK

### 1.16.1 (2023-11-27)
* (Apollon77) Fixes initial Temperature/Humidity/Voltage values of MS100 sensors

### 1.16.0 (2023-11-25)
* IMPORTANT: Node.js 16.x or higher is required
* (Apollon77) Prevented crash case reported by Sentry

### 1.15.1 (2023-05-15)
* (Apollon77) Fix an issue when committing devices delayed

### 1.15.0 (2023-01-03)
* (Apollon77) Add support for MAP100 air purifier
* (Apollon77) Add Energy Consumption states

### 1.14.0 (2022-08-12)
* (Apollon77) Add Smoke Sensor

### 1.13.0 (2022-07-12)
* (Apollon77) Add new option to prevent the Cloud communication fallback when the device is not available locally for data queries (enabled by default).

### 1.12.2 (2022-06-27)
* (Apollon7) prevent crash case reported by Sentry

### 1.12.1 (2022-06-27)
* (Apollon7) prevent crash case reported by Sentry

### 1.12.0 (2022-06-24)
* (Apollon77) Add new state to allow controlling whether to connect locally first or not for each device (but global setting takes precedence if set there to never use local connection!)
* (Apollon77) Detect reconnection issues to Meross Cloud and try to handle them better

### 1.11.0 (2022-06-02)
* (Apollon77) Add online status configuration to show online status in Admin UI
* (Apollon77) Optimize device initialization to make sure it finishes also whe not all devices are initialized successfully

### 1.10.5 (2022-04-14)
* (Apollon77) Adjust to recent API changes from Meross services

### 1.10.4 (2022-03-15)
* (Apollon77) Add battery value for ms100 devices in hub if supported

### 1.10.3 (2022-03-11)
* (Apollon77) Fix switch state for thermostats

### 1.10.2 (2022-02-19)
* (Apollon77) Correctly set the garageDoorWorking flag after starting a control action

### 1.10.1 (2022-01-26)
* (Apollon77) Fix pot. crash case

### 1.10.0 (2022-01-20)
* (Apollon77) Optimize Meross Communication to first try to communicate with the device locally before sending data to MQTT - enabled by default, you can disable it in settings!
* (Apollon77) Optimize Meross Communication by using only one MQTT connection instead of one per device when cloud is used
* (Apollon77) Add new state "disabled" to ignore connection error of a device; reconnections are still tried, but no error are logged if not successful
* (Apollon77) Add support for Online status reports from MTS100 hub devices
* (Apollon77) Automatically logout from meross cloud on adapter end; next start will do a new Login
* (Apollon77) Automatically delete old devices if no longer existing (when js-controller >=2.2)
* (Apollon77) Optimize MTS200 handling

### 1.8.0 (2022-01-05)
* (Apollon77) Add support for MTS200 Wifi Thermostat

### 1.7.1 (2021-11-13)
* (Apollon77) Allow to enter passwords with more than 15 characters

### 1.7.0 (2021-11-13)
* (Apollon77) Add support for MTS150 Thermostats
* (Apollon77) Add support for MRS100 RollerShutter devices

### 1.6.3 (2021-06-04)
* (Apollon77) Update translations

### 1.6.2 (2021-05-07)
* (Apollon77) optimize for js-controller 3.3

### 1.6.1 (2021-04-23)
* (Apollon77) prevent crash case (Sentry IOBROKER-MEROSS-Z)

### 1.6.0 (2021-04-18)
* (Apollon77) add MOD100 Diffuser Spray device

### 1.5.1 (2020-12-05)
* (Apollon77) generate an unique uuid for each connection, fixes the "Server not available"

### 1.5.0 (2020-06-25)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-MEROSS-G, IOBROKER-MEROSS-F)
* (Apollon77) Add warning about poll interval and cloud deactivation and reset poll interval to 30s for now

### 1.4.1 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.4.0 (2020-06-12)
* (Apollon77) Fix Admin
* (Apollon77) Remove the automatic cutting of passwords to 15 characters, but log info message

### 1.3.13 (2020.04.12)
* (Apollon77) add auto decryption handling with js-controller 3.0
* (Apollon77) update meross library to prevent some crash cases

### 1.3.12 (2020.03.08)
* (Apollon77) update dependencies

### 1.3.11 (2020.02.05)
* (Apollon77) optimize error handling
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 1.3.9 (2019.12.18)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.8 (2019.12.07)
* (Apollon77) update dependencies

### 1.3.7 (2019.12.01)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.6 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.5 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.4 (2019.11.26)
* (Apollon77) Add Temperature/Humidity support for MTS100

### 1.3.1 (2019.11.25)
* (Apollon77) Add names to hub sub devices

### 1.3.0 (2019.11.25)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0 (Air Purifyer)
* (Apollon77) Add support for Hub and Thermostates
* (Apollon77) Allow to control DND mode (LED) - be aware then if controlled via meross app it my get out of sync!
* (Apollon77) Integrate sentry.io for automated error/exception reporting
* (Apollon77) Add support for mts100v3
* (Apollon77) add Compact mode
* (Apollon77) add control option for (rgb) lights

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2023 Apollon77 <iobroker@fischer-ka.de>

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
