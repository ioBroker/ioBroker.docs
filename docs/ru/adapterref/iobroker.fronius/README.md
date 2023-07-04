---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: aRknBDFFiexqqTkvancXw+4YiCs8a9Estg5pBvJkDVk=
---
![Логотип](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
![Активность фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![Коммиты GitHub с момента последней версии (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
![версия NPM](http://img.shields.io/npm/v/iobroker.fronius.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/fronius-stable.svg)
![Количество установок](https://iobroker.live/badges/fronius-installed.svg)

# IoBroker.fronius
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml) [![CodeQL] (https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.
-->
## Адаптер инвертора Fronius для ioBroker
Это адаптер ioBroker для инвертора Fronius PV с Fronius Datalogger Web начиная с версии 2.0.4-1, Fronius Datamanager начиная с версии 3.0.3-1 и Symo Gen24.

## Монтаж
Для установки не требуется специальной настройки. Просто установите адаптер и запустите экземпляр. Затем перейдите к настройке адаптера. В разделе конфигурации введите IP-адрес или URL-адрес вашего инвертора. Затем нужно нажать кнопку «проверить IP». Это необходимо для запуска проверки и чтения конфигурации системы. Эта конфигурация системы необходима для последующего управления вызовами API.

Примечание для обновления с V1 до V2 адаптера. См. [DatastructureMapping_V1.3-V2.0.pdf](doc/DatastructureMapping_V1.3-V2.0.pdf). Рекомендуется внимательно проверить вышеуказанный документ и вручную удалить статусы, которые больше не доступны или перемещены.

## Запросить дополнительные параметры
Если вы хотите иметь дополнительный параметр или вызов API, укажите в заявке вызов, который вы выполнили, файл с ответом JSON на этот вызов, чтобы его можно было добавить в Систему, а также в тестовую среду. В любом случае предоставьте системную информацию из этого вызова http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System, чтобы настройка системы была понятна.

## Сообщить о проблемах
Если вы обнаружите какую-либо проблему, сообщите о ней в [Гитхаб](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) со следующей информацией.

- Версия адаптера установлена
- Подробный журнал (уровень журнала Debug или Silly) текущего поведения
- Подробное описание проблемы
- Если полезна системная информация из http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System (необходима настройка IP-адреса)

## Выполненные вызовы API
Следующий запрос отправляется в API. Но доступные точки данных сильно зависят от конкретного устройства на шине. Поэтому, если точка данных отсутствует, сначала проверьте, предоставляет ли API эту информацию. IP-адрес и параметр DeviceId должны быть настроены в соответствии с вашими настройками.

### Общая информация о системе
- http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=Система

### Данные инвертора
- http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData
- http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC _String_1&Channel=Напряжение_DC_String_2

### Данные омпилота
- http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=Система

### Хранение данных
- http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0

### Данные смартметра
- http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0

### Данные сенсорной карты
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData

### Строковые данные
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total

### Данные Powerflow (инвертор/объект)
- http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi

### Данные сайта
- http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.2 (2023-06-28)
-   (nkleber78) Instability issues fixed. (#306, #313)
-   (nkleber78) Set values for parameters delivered as 'null' from API to 0. (#315)

### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

### 2.0.0 (2023-06-04)

-   (nkleber78) Several errors resulting in missing data have been fixed. (#152, #242, #175)
-   (nkleber78) Several errors due to missing objects have been solved. (#206, #129, #76)
-   (nkleber78) The usage of the ping utility has been removed. (#169)
-   (nkleber78) Reading of mpp values has been added. (#78)
-   (nkleber78) 'Request' module has been replaced by 'axios'.
-   (nkleber78) Fixed changes related to GEN24 API update for latest FW incl. object creation for storage objects
-   (nkleber78) Fixed issue #97, Added some new predefined objects
-   (nkleber78) Added Inverter Temperature readout (#86)
-   (mcm1957) Dependencies and toolset have been updated.

### 1.1.3 (2021-03-15)

-   (nkleber78) Split main.js into multiple files for better maintenance
-   (nkleber78) Prevent creating info objects which are not supported by the inverters
-   (schweigel) Added archive request values
-   (schweigel) Added archive polling intervall
-   (schweigel) Added devicetype string

### 1.1.1 (2020-11-30)

-   (schweigel) Added missing units
-   (schweigel) Added inverterinfo

### 1.1.0 (2020-11-24)

-   (nkleber78) Implementation change for support of SYMO GEN24
-   (nkleber78) Fix issue with adapters connected state

### 1.0.5 (2019-01-18)

-   (ldittmar) compact mode compatibility added
-   (ldittmar) add chinese support

### 1.0.4

-   (ldittmar) Fix assignment to constant variable error

### 1.0.3

-   (ldittmar) Ready for Admin 3

### 1.0.2

-   (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

### 1.0.1

-   (tobintax) Added more values from Smartmeter
-   (tobintax) Added more Powerflow Values
-   (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

### 1.0.0

-   (ldittmar) Fixed little errors

### 0.0.5

-   (ldittmar) Read storage data and error/status codes

### 0.0.4

-   (ldittmar) Read more data

### 0.0.3

-   (ldittmar) Improved installation routine

### 0.0.2

-   (ldittmar) First data is read

### 0.0.1

-   (ldittmar) initial commit

## License

The MIT License (MIT)

Copyright (c) 2023 ldittmar <iobroker@lmdsoft.de>

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