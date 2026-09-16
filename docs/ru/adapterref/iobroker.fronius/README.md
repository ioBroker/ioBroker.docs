---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: PvD0mgZYEU67pzVytvnSwRPRyWxo7Fm36YKVE5s9ZRc=
---
![Логотип](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fronius.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/fronius-stable.svg)
![Количество установок](https://iobroker.live/badges/fronius-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)

# ioBroker.fronius

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Инверторный адаптер Fronius для ioBroker

Это адаптер ioBroker для вашего фотоэлектрического инвертора Fronius с программным обеспечением Fronius Datalogger Web, начиная с версии 2.0.4-1, Fronius Datamanager, начиная с версии 3.0.3-1, и Symo Gen24.

## Установка

Для установки не требуется никакой специальной настройки. Просто установите адаптер и запустите экземпляр. Затем перейдите к настройке адаптера. В разделе конфигурации введите IP-адрес или URL-адрес вашего инвертора. Затем нажмите кнопку «Проверить IP». Это необходимо для запуска проверки и чтения конфигурации системы. Эта конфигурация системы необходима для управления вызовами API в дальнейшем.

Примечание по обновлению адаптера с версии V1 до V2. См. документ [DatastructureMapping\_V1.3-V2.0.pdf](https://github.com/iobroker-community-adapters/ioBroker.fronius/blob/master/doc/DatastructureMapping_V1.3-V2.0.pdf) . Рекомендуется внимательно изучить указанный документ и вручную удалить состояния «недоступно» или «перемещено».

## Запросить дополнительные параметры

Если вам нужен дополнительный параметр или вызов API, пожалуйста, укажите в заявке описание выполненного вызова, файл с JSON-ответом на этот вызов, чтобы его можно было добавить в систему, а также в тестовую среду. В любом случае, пожалуйста, предоставьте информацию о системе из этого вызова [: http://192.168.0.1/solar\_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System](http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System) , чтобы настройка системы была понятной.

## Сообщить о проблемах

Если вы обнаружите какие-либо проблемы, пожалуйста, сообщите о них на [GitHub](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) , указав следующую информацию.

- Установлена версия адаптера.
- Подробный журнал (уровень логирования Debug или Silly) текущего поведения.
- Подробное описание проблемы
- Если это необходимо, информацию о системе можно получить по адресу <http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System> (требуется корректировка IP-адреса).

## Выполненные вызовы API

В API отправляются следующие запросы. Однако доступные данные сильно зависят от конкретного устройства в шине. Поэтому, если какая-либо точка данных отсутствует, сначала проверьте, предоставляет ли API эту информацию. IP-адрес и параметр DeviceId необходимо скорректировать в соответствии с вашей конфигурацией.

### Общая информация о системе

- <http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System>

### Данные инвертора

- <http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData>
- <http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData>
- <http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC_String_1&Channel=Voltage_DC_String_2>

### Данные Ohmpilot

- <http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=System>

### Хранение данных

- <http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0>

### Данные интеллектуального счетчика

- <http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0>

### Данные сенсорной карты

- <http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData>
- <http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData>

### строковые данные

- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year>
- <http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total>

### Данные о потоке мощности (инвертор/объект)

- <http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi>

### Данные сайта

- <http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.2.0 (2026-03-07)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2024-07-24)
* (nkleber78) Better handling of empty objects [#374]
* (mcm1957) Some issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-04-29)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-06-28)
-   (nkleber78) Instability issues fixed. (#306, #313)
-   (nkleber78) Set values for parameters delivered as 'null' from API to 0. (#315)

### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.fronius/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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