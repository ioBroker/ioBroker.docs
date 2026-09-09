---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.controme/README.md
title: ioBroker.controme
hash: Kl/bgmgRYmT6Id3fx1sljMnwMwBeQWOP70hm9v7xiCA=
---
![Логотип](../../../en/adapterref/iobroker.controme/admin/controme.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.controme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.controme.svg)
![Количество установок (последние)](http://iobroker.live/badges/controme-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/controme-stable.svg)
![Статус зависимости](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![Известные уязвимости](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.controme.png?downloads=true)
![Тестирование и выпуск](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

# ioBroker.controme

## Адаптер ioBroker для мини-сервера Controme

Подключитесь к локальному серверу Controme mini, используя официальный API.

Controme — это система управления отоплением, с помощью которой вы можете контролировать систему подогрева пола, центральное отопление, радиаторы или другие системы климат-контроля. В основе интеллектуальной системы отопления Controme лежит мини-сервер Controme, локальная система на базе Raspberry Pi. Для получения дополнительной информации об интеллектуальной системе отопления Controme посетите [веб-сайт Controme](https://www.controme.com/) .

Адаптер периодически считывает температуру в помещении с мини-сервера, а также позволяет устанавливать заданные значения температуры на сервере через ioBroker. Для использования этого адаптера необходимо, чтобы Controme активировал API. Адаптер не предназначен для замены пользовательского интерфейса Controme, но предоставляет базовые данные и функциональность для интеграции Controme с другими устройствами и сервисами умного дома.

Адаптер предоставляет следующие данные для каждой комнаты, определенной в пользовательском интерфейсе Controme:

| Объект                                              | Тип        | Описание                                                                                                                                                                                                                                                                                                                                                                                                             | чтение/запись |
| --------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| идентификатор комнаты                               | устройство | Каждая комната представлена своим идентификатором Controme и названием комнаты в качестве имени устройства.                                                                                                                                                                                                                                                                                                          |               |
| roomID.actualTemperature                            | состояние  | Фактическая температура в помещении, имеющая значение level.temperature. Это состояние доступно только для чтения. Если для конкретного помещения не определен датчик температуры, фактическая температура, возвращаемая мини-сервером Controme, будет равна null.                                                                                                                                                   | читать        |
| roomID.humidity                                     | состояние  | Влажность в помещении, с параметром level.humidity. Это состояние доступно только для чтения. Если датчик влажности в помещении не обнаруживает влажность, это состояние имеет значение null.                                                                                                                                                                                                                        | читать        |
| roomID.setpointTemperature                          | состояние  | Целевая/заданная температура в помещении, с ролью значения параметра value.temperature.                                                                                                                                                                                                                                                                                                                              | чтение/запись |
| roomID.setpointTemperaturePerm                      | состояние  | Постоянная целевая/заданная температура в помещении, с ролью значения.температуры.                                                                                                                                                                                                                                                                                                                                   | чтение/запись |
| roomID.temperatureOffset                            | состояние  | Смещение температуры помещения, на которое показания датчика отличаются от фактической температуры в помещении. Значение смещения температуры можно установить вручную в пользовательском интерфейсе Controme, а также оно рассчитывается различными модулями Controme.                                                                                                                                              | читать        |
| roomID.mode                                         | состояние  | Описывает режим работы помещения, например, «отопление».                                                                                                                                                                                                                                                                                                                                                             | читать        |
| roomID.is\_temporary\_mode                          | состояние  | Указывает на то, что в данный момент действуют временные изменения параметра setPointTemperature.                                                                                                                                                                                                                                                                                                                    | читать        |
| roomID.temporary\_mode\_end                         | состояние  | Когда для комнаты активен временный режим, это состояние указывает, когда этот временный режим заканчивается. Если временный режим не активен, это состояние имеет значение null.                                                                                                                                                                                                                                    | читать        |
| roomID.temporary\_mode\_remaining                   | состояние  | Когда для комнаты активен временный режим, это состояние указывает оставшееся количество секунд, в течение которых этот временный режим активен. Если временный режим не активен, это состояние имеет значение null. Изменения этого состояния будут отражаться в Controme и изменят оставшееся время действия временного режима в соответствии с заданной температурой, определенной в состоянии setpointTemperate. | чтение/запись |
| roomID.offsets                                      | канал      | Из заданной комнатной температуры добавляются или вычитаются смещения. Этот канал группирует все смещения, относящиеся к соответствующему помещению.                                                                                                                                                                                                                                                                 |               |
| roomID.offsets.\[OFFSET-GROUP]                      | канал      | Каждый источник смещения представлен выделенным каналом в рамках канала смещений той комнаты, к которой относится это смещение.                                                                                                                                                                                                                                                                                      |               |
| roomID.offsets.\[OFFSET-GROUP].\[OFFSET]            | состояние  | Отдельные значения смещения отражают различные корректировки, внесенные мини-сервером Controme.                                                                                                                                                                                                                                                                                                                      | читать        |
| roomID.offsets.api                                  | канал      | Эта группа смещений является особенной, поскольку в её состояния можно записывать данные и использовать их для управления фактическим смещением помещения.                                                                                                                                                                                                                                                           |               |
| roomID.offsets.api.api                              | состояние  | Это состояние смещения создается адаптером по умолчанию. Вы можете использовать его для управления фактическими смещениями в комнатах. Значения смещения сбрасываются сервером каждые 10 минут.                                                                                                                                                                                                                      | чтение/запись |
| roomID.sensors                                      | канал      | Датчики предоставляют фактические измерения, относящиеся к помещению. Этот канал объединяет все датчики, назначенные соответствующему помещению.                                                                                                                                                                                                                                                                     |               |
| roomID.sensors.\[SENSOR-ID]                         | устройство | Каждый датчик представлен устройством в канале датчиков того помещения, к которому он привязан.                                                                                                                                                                                                                                                                                                                      |               |
| roomID.sensors.\[SENSOR-ID].isRoomTemperatureSensor | состояние  | Это логическое значение указывает, используется ли датчик в качестве датчика комнатной температуры. Для каждой комнаты в качестве датчика комнатной температуры может использоваться только один датчик.                                                                                                                                                                                                             | читать        |
| roomID.sensors.\[SENSOR-ID].actualTemperature       | состояние  | Это состояние отражает фактическую температуру, измеренную датчиком. Состояние доступно для чтения/записи, но предоставленные значения будут приниматься только датчиками 1Wire или виртуальными датчиками. В случае записи значения в реальный датчик, оно будет перезаписано при следующем считывании.                                                                                                             | чтение/запись |
| roomID.outputs                                      | канал      | Выходы обычно управляют клапанами, регулирующими отопление помещения. Этот канал объединяет все выходы, назначенные соответствующему помещению.                                                                                                                                                                                                                                                                      |               |
| roomID.outputs.\[OUTPUT-ID]                         | состояние  | Каждый выход представлен состоянием в выходном канале комнаты, к которой он принадлежит. Идентификационный номер выхода обозначает номер выхода на шлюзе.                                                                                                                                                                                                                                                            | читать        |
| gatewayMAC                                          | устройство | Каждый шлюз представлен своим MAC-адресом, а имя шлюза — именем устройства.                                                                                                                                                                                                                                                                                                                                          |               |
| gatewayMAC.gatewayType                              | состояние  | Тип шлюза. В настоящее время существует четыре типа шлюзов Controme: Floor Gateway Smart, Floor Gateway Pro, Universal Gateway Mini, Universal Gateway Pro.                                                                                                                                                                                                                                                          | читать        |
| gatewayMAC.isUniversal                              | состояние  | Указывает, является ли шлюз одним из универсальных шлюзов. Данные от универсальных шлюзов необходимо получать другим способом.                                                                                                                                                                                                                                                                                       |               |
| gatewayMAC.outputs                                  | канал      | Выходы обычно управляют клапанами, регулирующими отопление помещения, для напольных шлюзов или устройств в отопительном помещении (насосы, клапаны). Этот канал объединяет все выходы соответствующего шлюза.                                                                                                                                                                                                        | читать        |
| gatewayMAC.outputs.\[OUTPUT-ID]                     | состояние  | Каждый выход представлен состоянием в выходном канале шлюза, к которому он назначен. Идентификационный номер выхода представляет собой номер выхода на шлюзе, заданный в конфигурации.                                                                                                                                                                                                                               | читать        |

[Документацию по API](https://support.controme.com/api/) можно найти на веб-сайте Controme.

Для запуска адаптера необходимо указать следующие данные на странице настроек администратора для экземпляра адаптера:

| Поле данных               | Тип    | Описание                                                                                                                                                                                                                                                                                                              |
| ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                       | текст  | URL-адрес мини-сервера Controme. Может быть либо IP-адресом, либо именем.                                                                                                                                                                                                                                             |
| идентификатор дома        | число  | Идентификатор установки Controme. Согласно документации API, он должен быть либо 1, либо 2.                                                                                                                                                                                                                           |
| интервал                  | число  | Интервал в секундах, с которым данные опрашиваются с сервера. Это значение должно быть в пределах от 15 до 3600 секунд. Слишком низкие значения не имеют смысла, поскольку Controme обновляет показания датчика только каждые 3-5 минут.                                                                              |
| forceReInit               | флажок | Если этот флажок установлен, Controme очищает структуру объектов в базе данных ioBroker и перезагружает комнаты с сервера. Эта настройка требуется только в том случае, если структура комнат на сервере Controme изменяется.                                                                                         |
| warnOnNull                | флажок | Если этот флажок установлен, адаптер будет записывать предупреждения в лог, когда датчик возвращает значение NULL. Возвращение значений NULL является ожидаемым поведением для оконных датчиков, но может указывать на проблему с подключением для датчиков температуры. API не позволяет различить эти ситуации.     |
| имя пользователя          | текст  | Имя пользователя, используемое для доступа к API Controme. Обычно это имя пользователя основного пользователя Controme.                                                                                                                                                                                               |
| пароль                    | пароль | Пароль пользователя, с помощью которого осуществляется доступ к API Controme. Этот пароль зашифрован.                                                                                                                                                                                                                 |
| шлюзы                     | стол   | Все шлюзы, для которых адаптер должен запрашивать данные, должны быть настроены с тремя значениями:                                                                                                                                                                                                                   |
| gateways.gatewayMAC       | нить   | MAC-адрес отдельного шлюза.                                                                                                                                                                                                                                                                                           |
| шлюзы.тип                 | нить   | Тип соответствующего шлюза. Может быть Floor Gateway Smart/Pro, Universal Gateway Mini или Universal Gateway Pro.                                                                                                                                                                                                     |
| gateways.name             | нить   | Название соответствующего шлюза.                                                                                                                                                                                                                                                                                      |
| gatewayOutputs            | стол   | Все выходы всех шлюзов, для которых адаптер должен запрашивать данные, должны быть настроены с тремя значениями:                                                                                                                                                                                                      |
| gatewayOutputs.gatewayMAC | нить   | MAC-адрес отдельного шлюза. Он должен совпадать с одним из значений gatewayMAC, заданных в таблице шлюзов. Обратите внимание, что в настоящее время адаптер не проверяет, совпадают ли MAC-адреса шлюзов с адресами, заданными в таблице шлюзов. Поэтому убедитесь, что MAC-адреса шлюзов совпадают в обеих таблицах. |
| gatewayOutputs.outputID   | число  | Идентификатор выходного сигнала соответствующего шлюза, который необходимо опрашивать. Для мини-шлюзов это число должно быть от 1 до 8, для других шлюзов — от 1 до 15.                                                                                                                                               |
| gatewayOutputs.outputName | нить   | Название соответствующего выхода шлюза.                                                                                                                                                                                                                                                                               |

## Что нужно сделать

1. (в процессе) Тестирование, тестирование, тестирование
2. После тщательного тестирования адаптер будет выпущен в стабильном режиме.

## Известные ошибки

1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.7 (2025-02-22)
* (MadErstam) Made adapter safe to handle different versions of API
* (MadErstam) Switched from got to axios for future compatibility

### 0.5.6 (2025-02-21)
* (MadErstam) Bugfixing regarding invalid API responses or invalid sensor values

### 0.5.5 (2025-02-20)
* (MadErstam) Bugfixing regarding async and promise

### 0.5.4 (2025-02-15)
* (MadErstam) Made sensor names safe
* (MadErstam) Bugfixing in getOutputs

### 0.5.3 (2024-11-27)
* (MadErstam) Various smaller bugfixes and improvements

### 0.5.2 (2024-11-25)
* (MadErstam) Make object IDs for offsets safe

### 0.5.1 (2024-11-06)
* (MadErstam) Minor bugfixing

### 0.5.0 (2024-11-05)
* (MadErstam) Added handling of temporary mode
* (MadErstam) Conducted code refactoring to improve readability and maintainability
* (MadErstam) Again moved admin translations to make it compatible with automatic translations

### 0.4.7 (2024-11-04)
* (MadErstam) Moved admin translations to separate files

### 0.4.6 (2024-11-04)
* (MadErstam) Added translations of admin form to Ukrainian

### 0.4.5 (2024-11-03)
* (MadErstam) Fixed remaining warnings of automated adapter checker

### 0.4.4 (2024-11-03)
* (MadErstam) Cleaned up warnings of automated adapter checker

### 0.4.3 (2024-11-03)
* (MadErstam) Cleaned up errors of automated adapter checker

### 0.4.2 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.1 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.0 (2024-10-31)
* (MadErstam) Extended api calls to include humidity and temporary mode states
* (MadErstam) Changed dependencies

### 0.3.4-alpha.2 (2022-06-01)
* (MadErstam) Added validation of setTargetTemp, setSetpointTemp, setActualTemp, setOffsetTemp values
* (MadErstam) Changed dependencies
* (MadErstam) Cleaning up

### 0.3.4-alpha.1 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.4-alpha.0 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.3 (2022-04-25)
* (MadErstam) Updated dependencies

### 0.3.2 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.1 (2022-04-25)
* (MadErstam) Cleaning up adapter, bugfixing, extended readme

### 0.3.0
* (MadErstam) Extended API polling (outputs, gateways)

### 0.2.4
* (MadErstam) Bugfixing

### 0.2.3
* (MadErstam) Bugfixing

### 0.2.2
* (MadErstam) Bugfixing in offset handling

### 0.2.1
* (MadErstam) Improved offset handling

### 0.2.0
* (MadErstam) Added sensors and offsets

### 0.1.2
* (MadErstam) Preparations for adapter package release

### 0.1.1
* (MadErstam) Minor bug fixes

### 0.1.0
* (MadErstam) initial release

## License
Copyright (c) 2025 MadErstam <erstam@gmx.de>

MIT License

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