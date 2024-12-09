---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.controme/README.md
title: ioBroker.controme
hash: su6wsdirQYbXW/MbQUqjSe1Bz2Tgm5e/AxHIq7hnC/o=
---
![Логотип](../../../en/adapterref/iobroker.controme/admin/controme.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.controme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.controme.svg)
![Количество установок (последнее)](http://iobroker.live/badges/controme-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/controme-stable.svg)
![Статус зависимости](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![Известные уязвимости](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.controme.png?downloads=true)

# IoBroker.controme
**Тесты:** ![Тест и выпуск](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для мини-сервера Controme
Подключитесь к локальному серверу Controme mini, используя официальный API.

Controme — это система управления отоплением, с помощью которой вы можете управлять подогревом пола, системой центрального отопления, радиаторами или другими формами климат-контроля. В основе Controme Smart-Heat-System лежит мини-сервер Controme, локальная система на базе Raspberry Pi. Для получения дополнительной информации о Controme Smart-Heat-System см. [Веб-сайт Controme](https://www.controme.com/).

Адаптер периодически считывает температуру в помещении с мини-сервера, а также позволяет устанавливать заданные температуры на сервере из ioBroker. Для использования этого адаптера вам необходимо, чтобы Controme активировал API. Адаптер не предназначен для замены пользовательского интерфейса Controme, но должен использовать базовые данные и функциональность для интеграции Controme с другими устройствами и службами Smart Home.

Адаптер предоставляет следующие данные для каждой комнаты, определенной в пользовательском интерфейсе Controme:

| Объект | Тип | Описание | чтение/запись |
| --- | --- | --- | --- |
| roomID | device | Каждая комната представлена своим идентификатором комнаты Controme и именем комнаты в качестве имени устройства. | |
| roomID.actualTemperature | state | Фактическая температура в комнате, с ролью level.temperature. Это состояние доступно только для чтения. Если датчик температуры в комнате для конкретной комнаты не определен, фактическая температура, возвращаемая сервером Controme mini, равна нулю. | read |
| roomID.humidity | state | Влажность в комнате, с ролью level.humidity. Это состояние только для чтения. Если датчик для комнаты не обнаруживает влажность, это состояние равно нулю. | read |
| roomID.setpointTemperature | state | Целевая / заданная температура помещения, с ролью value.temperature. | чтение/запись |
| roomID.setpointTemperaturePerm | state | Постоянная целевая / заданная температура помещения, имеющая роль value.temperature. | чтение/запись |
| roomID.temperatureOffset | state | Смещение температуры помещения, на которое показания датчика отличаются от фактической температуры помещения. Значение смещения температуры можно задать вручную в пользовательском интерфейсе Controme, а также оно рассчитывается различными модулями Controme. | read |
| roomID.mode | state | Описывает режим работы помещения, например, «обогрев». | read |
| roomID.is_temporary_mode | state | Указывает на то, что действуют временные изменения setPointTemperature. | read |
| roomID.temporary_mode_end | state | Когда для комнаты активен временный режим, это состояние указывает, когда временное состояние заканчивается. Если временное состояние не активно, это состояние равно нулю. | read |
| roomID.temporary_mode_remaining | state | Когда для комнаты активен временный режим, это состояние указывает оставшиеся секунды, в течение которых временное состояние активно. Если временное состояние не активно, это состояние равно нулю. Изменения этого состояния будут отражаться обратно в Controme и изменять оставшееся время для временного режима с заданной температурой, определенной в состоянии setpointTemperate. | чтение/запись |
| roomID.offsets | channel | Смещения добавляются или вычитаются из заданной температуры в помещении. Этот канал группирует все смещения, которые относятся к соответствующему помещению. | |
| roomID.offsets.[OFFSET-GROUP] | канал | Каждый источник смещения представлен выделенным каналом в канале смещений комнаты, к которой принадлежит смещение. | |
| roomID.offsets.[OFFSET-GROUP].[OFFSET] | state | Индивидуальное состояние смещения представляет различные корректировки, выполненные мини-сервером Controme. | read |
| roomID.offsets.api | channel | Эта группа смещений является особенной, поскольку ее состояния могут быть записаны и могут использоваться для управления фактическим смещением комнаты. | |
| roomID.offsets.api.api | state | Это состояние смещения создается адаптером по умолчанию. Вы можете использовать его для управления фактическими смещениями комнат. Значения смещения сбрасываются сервером каждые 10 минут. | чтение/запись |
| roomID.sensors | channel | Датчики предоставляют фактические измерения, связанные с комнатой. Этот канал группирует все датчики, назначенные соответствующей комнате. | |
| roomID.sensors.[SENSOR-ID] | device | Каждый датчик представлен устройством в канале датчиков комнаты, к которой он назначен. | |
| roomID.sensors.[SENSOR-ID].isRoomTemperatureSensor | state | Это логическое состояние указывает, используется ли датчик в качестве датчика комнатной температуры. Для каждой комнаты только один датчик может использоваться в качестве датчика комнатной температуры. | read |
| roomID.sensors.[SENSOR-ID].actualTemperature | state | Это состояние представляет фактическую температуру, измеренную датчиком. Состояние — чтение/запись, но только датчики 1Wire или виртуальные датчики будут принимать предоставленные значения. В случае записи значения в реальный датчик, значение будет перезаписано при следующем считывании. | чтение/запись |
| roomID.outputs | channel | Выходы обычно управляют клапанами, которые управляют отоплением помещения. Этот канал группирует все выходы, назначенные соответствующему помещению. | |
| roomID.outputs.[OUTPUT-ID] | state | Каждый выход представлен состоянием в выходном канале комнаты, к которой он принадлежит. Номер идентификатора выхода представляет собой номер выхода на шлюзе. | read |
| gatewayMAC | device | Каждый шлюз представлен своим MAC-адресом и именем шлюза в качестве имени устройства. | |
| gatewayMAC.gatewayType | state | Тип шлюза. В настоящее время существует четыре шлюза controme: floor gateway smart, floor gateway pro, universal gateway mini, universal gateway pro. | читать |
| gatewayMAC.isUniversal | state | Указывает, является ли шлюз одним из универсальных шлюзов. Данные с универсальных шлюзов необходимо опрашивать другим способом. |
| gatewayMAC.outputs | канал | Выходы обычно управляют клапанами, которые управляют отоплением помещения для напольных шлюзов или устройств в отопительном помещении (насосы, клапаны). Этот канал группирует все выходы соответствующего шлюза. | читать |
| gatewayMAC.outputs.[OUTPUT-ID] | state | Каждый выход представлен состоянием в выходном канале шлюза, которому он назначен. Номер идентификатора выхода представляет собой номер выхода на шлюзе, установленный в конфигурации. | read |

[API-документация](https://support.controme.com/api/) можно найти на веб-сайте Controme.

Для запуска адаптера необходимо указать следующие данные на странице настроек администратора для экземпляра адаптера:

| Поле данных | Тип | Описание |
| --- | --- | --- |
| url | text | URL-адрес мини-сервера Controme. Может быть как IP-адресом, так и именем. |
| ID дома | номер | ID установки Controme. Это должно быть 1 или 2 в соответствии с документацией API. |
| интервал | число | Интервал в секундах, в течение которого данные опрашиваются с сервера. Это значение должно быть между 15 секундами и 3600 секундами. Слишком низкие значения не имеют смысла, поскольку Controme обновляет значения датчика только каждые 3-5 минут. |
| forceReInit | флажок | Если этот флажок установлен, Controme очищает структуру объектов в базе данных ioBroker и перезагружает комнаты с сервера. Эта настройка требуется только при изменении структуры комнат на сервере Controme. |
| warnOnNull | флажок | Если этот флажок установлен, адаптер записывает предупреждения в журнал, когда датчик возвращает значение NULL. Возврат значений NULL является ожидаемым поведением для оконных датчиков, но будет указывать на проблему с подключением для датчиков температуры. API не позволяет различать |
| имя пользователя | текст | Имя пользователя для доступа к API Controme. Обычно это имя пользователя основного пользователя Controme. |
| пароль | пароль | Пароль пользователя для доступа к Controme API. Этот пароль зашифрован. |
| шлюзы | таблица | Все шлюзы, данные которых адаптер должен опрашивать, должны быть настроены с тремя значениями: |
| gateways.gatewayMAC | string | MAC-адрес отдельного шлюза. |
| gateways.type | string | Тип соответствующего шлюза. Может быть Floor Gateway Smart/Pro, Universal Gateway Mini или Universal Gateway Pro. |
| gateways.name | string | Имя соответствующего шлюза. |
| gatewayOutputs | таблица | Все выходы всех шлюзов, данные которых адаптер должен опрашивать, должны быть настроены с тремя значениями: |
| gatewayOutputs.gatewayMAC | string | MAC-адрес отдельного шлюза. Он должен соответствовать одному из значений gatewayMAC, настроенных в таблице шлюзов. Обратите внимание, что в настоящее время адаптер не проверяет, совпадают ли MAC-адреса шлюза с настроенными в таблице шлюзов. Поэтому обратите внимание, что MAC-адреса шлюза должны совпадать в обеих таблицах. |
| gatewayOutputs.outputID | number | Выходной идентификатор соответствующего шлюза, который должен быть опрошен. Для мини-шлюзов этот номер должен быть от 1 до 8, для других шлюзов он может быть от 1 до 15. |
| gatewayOutputs.outputName | string | Имя соответствующего выхода шлюза. |

## В Дос
1. (в процессе) Опубликовать адаптер :)
2. Добавьте проверку данных в поля конфигурации
3. (сделано) Расширить поля данных, получаемые с сервера Controme mini (например, влажность)
4. (готово) Добавить данные датчиков для каждого датчика и комнаты
5. (готово, ожидается тестирование) Реализовать временный режим (временные изменения желаемой температуры в помещении) рядом с заданной температурой
6. (готово) Добавить возможность установки значения для виртуальных датчиков.

## Знать ошибки
1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2024 MadErstam <erstam@gmx.de>