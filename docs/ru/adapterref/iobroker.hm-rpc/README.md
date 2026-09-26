---
chapters: {"pages":{"en/adapterref/iobroker.hm-rpc/README.md":{"title":{"en":"ioBroker HomeMatic RPC Adapter"},"content":"en/adapterref/iobroker.hm-rpc/README.md"},"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hm-rpc/README.md
title: ioBroker HomeMatic RPC Adapter
hash: qbx82r748fNIMD7JogRm5wOGF0bf3QP3TStxV/dPmpA=
---
![Логотип](../../../en/adapterref/iobroker.hm-rpc/admin/homematic.png)

![Статус сборки](https://github.com/ioBroker/ioBroker.hm-rpc/workflows/Test%20and%20Release/badge.svg)
![Количество установок](http://iobroker.live/badges/hm-rpc-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hm-rpc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hm-rpc.svg)
![НПМ](https://nodei.co/npm/iobroker.hm-rpc.png?downloads=true)

# ioBroker HomeMatic RPC Adapter

Этот адаптер соединяет процессы интерфейса HomeMatic (сервисы BidCos, Homegear и CUxD) с ioBroker. Для обмена данными используется XML-RPC или BIN-RPC.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Он также сообщает о новых схемах устройств. Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [документацию по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry) и главу [«Что такое Sentry.io»](#what-is-sentryio) .

## Что такое Homematic?

> Homematic — это система «умного дома» от eQ-3. Она позволяет осуществлять комплексное управление множеством различных функций в доме или квартире. Эти функции могут комбинироваться как в простых, так и в сложных сценариях.

> Ассортимент продукции включает устройства для управления освещением, рольставнями и отоплением, детекторы опасности, датчики безопасности и устройства для измерения погодных условий. Радиосвязь упрощает подключение устройств к существующим зданиям. В новых зданиях можно использовать компоненты проводной шины.

Источник: [Домашняя страница производителя eQ-3](https://www.eq-3.de/produkte/homematic.html)

## Компоненты Homematic в ioBroker

Для управления компонентами Homematic с помощью ioBroker требуется два адаптера:

### 1. Homematic ReGaHss

Этот адаптер подключается к логическому слою Homematic "ReGaHSS" ( **Residential** **Gateway** ). Он синхронизирует названия устройств, системные переменные, комнаты, функции и программы между Homematic и ioBroker.

### 2. Homematic RPC

RPC расшифровывается как **Remote** **Procedure Call (** удалённая процедура **)** . Это технология для обмена данными между процессами. Данный адаптер подключается к коммуникационным модулям центрального блока Homematic (CCU, CCU2, CCU3 и более новых моделей). Поддерживаются следующие модули:

- `rfd` для радиоустройств,
- `HMIP-rfd` для IP-устройств Homematic,
- `hs485d` для проводных устройств,
- `CUxD` для внешних компонентов, таких как EnOcean или FS20 (CUxD — это дополнительное программное обеспечение для CCU),
- `Homegear` в качестве замены отделения интенсивной терапии.

На этой диаграмме показана структура и интерфейсы связи:

![Структура установки Homematic](../../../en/adapterref/iobroker.hm-rpc/img/homematic-structure.png)

Источник: [wikimatic.de](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Как работает адаптер

Один экземпляр адаптера отвечает ровно за один коммуникационный модуль (`rfd`, `hs485d` и так далее). Если вы хотите использовать несколько модулей одновременно, необходимо создать отдельный экземпляр для каждого модуля.

Адаптер взаимодействует с модулем либо через BIN-RPC, либо через XML-RPC. Для связи используется интерфейс событий, поэтому важны правильные адреса. CCU автоматически отправляет события на адаптер, и циклический опрос не требуется.

Кроме того, адаптер проверяет соединение с блоком управления через фиксированные интервалы времени.

Если вы подключаете новые устройства к блоку управления CCU, необходимо включить опцию «Синхронизировать объекты (однократно)» и перезапустить адаптер. Только после этого информация о новых устройствах Homematic будет передана на адаптер.

## Конфигурация

### Основные настройки

#### Адрес HomeMatic

IP-адрес CCU или хоста, на котором работает сервис BidCos.

#### Порт HomeMatic

Порт зависит от выбранного коммуникационного модуля. Адаптер автоматически выбирает порт, как только вы выбираете демона. Изменяйте порт только в том случае, если ваши порты отличаются от стандартных.

По умолчанию используются следующие порты:

| Демон                  | Модуль связи                  | Стандартный порт         | порт HTTPS        |
| ---------------------- | ----------------------------- | ------------------------ | ----------------- |
| HomeMatic IP           | HMIP-rfd                      | 2010                     | 42010             |
| рфд                    | радиоустройства               | 2001                     | 42001             |
| Виртуальные устройства | виртуальные устройства        | 9292                     | 49292             |
| hs485d                 | hs485d (проводные устройства) | 2000                     | 42000             |
| CUxD                   | CUxD                          | 8701                     | не поддерживается |
| Homegear               | Homegear                      | как настроено в Homegear | не поддерживается |

Порты HTTPS работают только с протоколом XML-RPC.

#### Адрес адаптера

IP-адрес хоста, на котором работает адаптер. CCU использует этот адрес для подключения к адаптеру, поэтому CCU должен иметь возможность связаться с этим адресом. Записи "0.0.0.0 Listen on all IPs" и "127.0.0.1" предназначены только для особых случаев, поскольку CCU не может связаться с ioBroker по этим адресам.

#### Порт адаптера

Порт, на котором адаптер ожидает подключения CCU. Оставьте значение "0", чтобы ioBroker автоматически выбирал свободный порт. Изменяйте это значение только в особых случаях.

#### Демон

CCU поддерживает различные типы устройств (радио, проводные, Homematic IP, CUxD). Для каждого типа необходимо создать отдельный экземпляр адаптера.

#### Протокол

Для обмена данными доступны два протокола: XML-RPC и BIN-RPC. BIN-RPC быстрее, но некоторые устройства его не поддерживают или поддерживают некорректно. В этом случае выберите протокол XML-RPC.

**Примечание:** CUxD работает только с BIN-RPC. Homematic IP и виртуальные устройства работают только с XML-RPC. Для этих демонов адаптер автоматически использует правильный протокол.

#### Синхронизация объектов (один раз)

При первом запуске экземпляр считывает _все_ устройства из CCU. Если вы позже измените конфигурацию (переименуете устройства, добавите или удалите устройства), включите эту опцию, чтобы снова синхронизировать конфигурацию в ioBroker.

Экземпляр немедленно перезапускается, снова считывает все устройства и отключает эту опцию.

### Дополнительные настройки

#### Адрес обратного вызова адаптера

Иногда ioBroker работает за маршрутизатором. В этом случае входящий и исходящий адреса различаются. Введите здесь IP-адрес маршрутизатора. Маршрутизатор перенаправляет трафик в ioBroker по номеру порта.

Если ioBroker работает в контейнере Docker, введите здесь IP-адрес хоста Docker. Также необходимо перенаправить порт адаптера (см. "Порт адаптера") в контейнер. Для этого можно выбрать любой свободный порт, например, 12001 или 12010.

#### Проверьте интервал обмена данными (в секундах)

Адаптер отправляет ping-запрос в CCU с заданным интервалом.

#### Интервал переподключения (в секундах)

Адаптер ожидает это время, прежде чем предпринять следующую попытку подключения.

#### Не удаляйте устройства.

По умолчанию адаптер удаляет устройство из дерева объектов, если не находит его в CCU при запуске адаптера или если CCU сообщает об удалении устройства во время работы адаптера. Включите эту опцию, чтобы сохранить такие устройства, например, если вы удалили устройство из CCU только временно.

Эта опция также позволяет избежать проблемы на стороне CCU: устройства Homematic IP иногда некорректно передаются в ioBroker, и CCU сообщает о них как об удаленных, например, во время обновления прошивки, хотя они по-прежнему существуют. Без этой опции их объекты удаляются и создаются заново только после перезапуска адаптера. По этой причине опция автоматически включается, как только вы выбираете Homematic IP в качестве демона.

При включении этой опции можно вручную удалить объекты устройства, которое вы ранее удалили из CCU, в дереве объектов.

#### Используйте https

Если эта опция включена, адаптер использует HTTPS вместо HTTP. Это работает только с протоколом XML-RPC.

#### Имя пользователя и пароль

Если включена опция «Использовать HTTPS», введите здесь имя пользователя и пароль пользователя CCU. Введите эти учетные данные также, если API CCU требует аутентификации; адаптер отправляет их с помощью XML-RPC с HTTPS и без него. BIN-RPC не поддерживает аутентификацию.

### Диспетчер устройств

Вкладка «Диспетчер устройств» отображает все устройства данного экземпляра. Вы можете переименовать устройство, управлять им напрямую, а также прочитать установленную и доступную версии прошивки устройства.

## Экземпляры

![Экземпляры адаптера](../../../en/adapterref/iobroker.hm-rpc/img/instances.png)

Установленные экземпляры адаптера перечислены в разделе _«Экземпляры_ » ioBroker. Цветной кружок слева показывает, включен ли экземпляр и подключен ли он к CCU.

Если навести указатель мыши на символ, отобразится подробная информация.

## Объекты адаптера

В разделе « _Объекты»_ отображаются все значения и вся информация, которую CCU отправляет адаптеру. Значения представлены в виде древовидной структуры.

Какие объекты и какие значения отображаются, зависит от устройств (функций и каналов) и от внутренней структуры блока управления.

Центральный блок использует идентификатор. `BidCoS-RF` Все виртуальные кнопки перечислены под этим идентификатором. Устройства создаются по их серийному номеру, а группам присваивается имя. `INT000000x`.

### Канал 0 (для всех устройств)

Этот канал создаётся для каждого устройства. Он содержит следующие функциональные данные:

| Точка данных                                                             | Значение                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| AES\_Key                                                                 | Шифрование включено или отключено                             |
| Конфигурация (ожидающие подтверждения / ожидающие подтверждения тревоги) | Ожидающая конфигурация                                        |
| Служебный велосипед / Сигнализация для служебного велосипеда             | Время передачи данных устройств Homematic                     |
| RSSI (Устройство / Партнер)                                              | Уровень сигнала между устройством и центральным блоком.       |
| Низкий уровень летучей мыши / Сигнализация низкого уровня летучей мыши   | Низкий заряд батареи                                          |
| Залипание кнопки "Недоступно" / сигнализация о недоступности             | Системное сообщение об ошибке связи (ошибка произошла ранее). |
| Сигнализация о недостижении                                              | Системное сообщение об ошибке связи (текущее состояние)       |

### Каналы с 1 по 6

Эти каналы содержат измеренные значения, управляющие данные и данные о состоянии. Отображаемые данные зависят от функции устройства. В следующей таблице приведены некоторые примеры:

| Функция                          | Канал | Возможные значения                                                                       |
| -------------------------------- | ----- | ---------------------------------------------------------------------------------------- |
| Датчики                          | 1     | Температура, влажность, уровень заполнения, открытое или закрытое состояние и так далее. |
| Термостаты отопления             | 4     | Режим работы, заданная температура, фактическая температура, положение клапана и т.д.    |
| Исполнительные механизмы         | 1     | Уровень (роллетные ставни, диммер), направление движения (роллетные ставни) и так далее. |
| Приборы с измерительной функцией | 3     | Статус                                                                                   |
|                                  | 6     | Счетчик потребления, напряжение, мощность и так далее.                                   |

## Пользовательские команды

Вы можете отправлять на адаптер пользовательские команды, например, для чтения и управления главной зоной устройства. Главная зона позволяет настраивать недельные программы отопления и многое другое.

Для этой цели отправьте сообщение адаптеру. Сообщение содержит метод в качестве первого параметра, за которым следует объект. Этот объект должен содержать `ID` целевого устройства. В качестве опции он может содержать `paramType`, которая выбирает, например, область MASTER. Отправьте дополнительные параметры в `params` объект.

**Примеры:**

Запишите все значения из области MASTER устройства в лог:

```javascript
sendTo('hm-rpc.0', 'getParamset', {ID: 'OEQ1861203', paramType: 'MASTER'}, res => {
    log(JSON.stringify(res));
});
```

Присвойте атрибуту области MASTER определенное значение:

```javascript
sendTo('hm-rpc.0', 'putParamset', {ID: 'OEQ1861203', paramType: 'MASTER', params: {'ENDTIME_FRIDAY_1': 700}}, res => {
    log(JSON.stringify(res));
});
```

Список всех устройств:

```javascript
sendTo('hm-rpc.0', 'listDevices', {}, res => {
    log(JSON.stringify(res));
});
```

Задайте значение, как это делает адаптер. `stateChange`:

```javascript
sendTo('hm-rpc.1', 'setValue', {ID: '000453D77B9EDF:1', paramType: 'SET_POINT_TEMPERATURE', params: 15}, res => {
    log(JSON.stringify(res));
});
```

Прочитайте `paramsetDescription` канала устройства:

```javascript
sendTo('hm-rpc.1', 'getParamsetDescription', {ID: '000453D77B9EDF:1', paramType: 'VALUES'}, res => {
    log(JSON.stringify(res));
});
```

Считывание информации о прошивке устройства. В этом примере состояние прошивки записывается в журнал:

```javascript
sendTo('hm-rpc.1', 'getDeviceDescription', {ID: '0000S8179E3DBE', paramType: 'FIRMWARE'}, res => {
    if (!res.error) {
        log(`FW status: ${res.result.FIRMWARE_UPDATE_STATE}`)
    } else {
        log(res.error)
    }
});
```

## Дополнительная информация

Если вы используете выключатели или пульты дистанционного управления HomeMatic, блок управления CCU подтверждает состояние кнопок только в том случае, если на нем запущена «фиктивная» программа. Эта программа должна использовать состояние соответствующего выключателя или пульта дистанционного управления. Без такой программы ioBroker не получает состояния кнопок.

Для нескольких кнопок можно использовать одну фиктивную программу. Добавьте все состояния кнопок в условие if и объедините их с оператором «или» или с оператором «и». Условие then программы может оставаться пустым. После этого состояние в ioBroker обновляется при каждом нажатии кнопки.

## Что такое Sentry.io?

Sentry.io — это сервис для разработчиков. Он предоставляет обзор ошибок в их приложениях. Именно это и реализовано в данном адаптере.

Если адаптер зависает или возникает другая ошибка в коде, сообщение об ошибке отправляется в Sentry. Это же сообщение отображается и в журнале ioBroker. Если вы разрешили ioBroker GmbH собирать диагностические данные, ваш идентификатор установки также отправляется. Этот идентификатор установки является уникальным **и не содержит** никакой дополнительной информации о вас, например, вашего адреса электронной почты или имени. Он позволяет Sentry группировать ошибки и показывать, сколько пользователей затронуто ошибкой. Все это помогает разработчику создавать адаптеры, которые не содержат ошибок и практически никогда не зависают.

## Разработка

Для обновления всех образов устройств выполните следующую команду:

```bash
npm run update-images
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.1.2 (2026-09-22)
* (bluefox) Philips Hue and Osram Lightify lamps of the CCU lighting gateway: the color temperature `WHITE` is handled in kelvin (2000 - 6500 K), also if the CCU declares it as percent (#694)
* (bluefox) `HUE` and `SATURATION` are sent together in one `putParamset`, HMIP devices like HmIP-RGBW rejected a single value with `MISSING_NON_OPTIONAL_PARAMETER` (#1108)
* (bluefox) Values which the CCU delivers as text for a number are converted (the name of an ENUM to its index, e.g. `STATE_NOT_AVAILABLE` of a `VALVE_STATE`), invalid values become `null` instead of a wrong type (#1342, #1358)
* (bluefox) Events of deleted devices do not warn about missing objects until the next start of the adapter anymore (#1419)

### 4.1.1 (2026-09-22)
* (bluefox) `CONTROL_MODE` and `SET_POINT_MODE` of HmIP thermostats show the mode names (auto, manual, party)
* (bluefox) `SET_TEMPERATURE` of BidCos heating groups accepts 4.5 (OFF) and 30.5 (ON)
* (bluefox) CUxD always uses BIN-RPC, Homematic IP and Virtual Devices always use XML-RPC
* (bluefox) Username and password are sent with XML-RPC also without HTTPS
* (bluefox) Better error message if the CCU answers with an HTML page instead of XML-RPC
* (bluefox) Read-only datapoints do not get the writable roles `level.*` and `switch.*` anymore
* (bluefox) HmIP shutters and blinds: the control channels get `level.blind`/`level.tilt`, the status channel `value.blind`/`value.tilt`; `LEVEL` and `VALVE_STATE` of HmIP thermostats got better roles
* (bluefox) The option "Don't delete devices" also ignores devices that the CCU reports as deleted while the adapter is running (e.g. HmIP during firmware updates)

### 4.1.0 (2026-09-22)
* (krobipd) The device icons were invisible in the object browser: its ID cell sets `width: initial` on every element of an inlined SVG, which collapses the icon's `rect` to 0px. The size is now carried as an inline style as well.
* (bluefox) Updated `binrpc` to 4.x and `homematic-xmlrpc` to 2.x (no dependency on a GitHub tarball anymore)
* (bluefox) If the RPC server cannot listen (e.g. the configured IP address is not available), the error is logged and the adapter restarts after 30 seconds instead of crashing
* (bluefox) On stop, the RPC server and client are closed properly, also for XML-RPC and if the CCU is not reachable
* (bluefox) Updated packages
* (bluefox) Fixed writing of the lines and icons of HM-Dis-EP-WM55: an invalid tone interval (`0xE-1`) was sent if no interval was set
* (bluefox) The device manager does not crash anymore on devices without `native` and does not report the same control twice
* (bluefox) Added icon for HmIP-RFUSB
* (bluefox) PONG events and requests without method are logged only in debug mode
* (bluefox) Replaced the deprecated `deleteDevice` and `deleteChannel` calls
* (bluefox) Fixed issues reported by the repository checker (responsive design of the settings, lint and type check in CI)

### 4.0.0 (2026-08-15)
* (bluefox) Device icons are now delivered as theme-adaptive SVGs and stay visible on the dark admin theme
* (krobipd) Generated the device icon set and the device type map from the OCCU device database
* (krobipd) The device icon is re-applied on start to devices that were created before their type had an icon
* (bluefox) Removed support of Node.js 20

### 3.0.2 (2026-05-07)
* (bluefox) Updated packages
* (bluefox) Migrated to TypeScript 6
* (bluefox) Corrected device manager

### Older changelog
[here](/#/docs/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
Copyright (c) 2014 hobbyquaker <hq@ccu.io>

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