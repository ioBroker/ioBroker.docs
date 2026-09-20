---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.liebherr/README.md
title: ioBroker.liebherr
hash: hVfrVDRbDJNf0K7OaTeXq8cA5AeeFKy+3F+FKORd35Q=
---
![Логотип](../../../en/adapterref/iobroker.liebherr/admin/liebherr.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.liebherr.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.liebherr.svg)
![Количество установок](https://iobroker.live/badges/liebherr-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/liebherr-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.liebherr.png?downloads=true)
![Тестирование и выпуск](https://github.com/Gaspode69/ioBroker.liebherr/workflows/Test%20and%20Release/badge.svg)

# ioBroker.liebherr

## Адаптер Liebherr для ioBroker

Этот адаптер подключает ioBroker к официальному облачному сервису [Liebherr SmartDevice HomeAPI](https://developer.liebherr.com/apis/smartdevice-homeapi) . Он обнаруживает совместимые холодильники, морозильники и другие бытовые приборы, связанные с ключом API HomeAPI, и предоставляет доступ к возможностям, заявленным для каждого прибора.

Для работы требуется доступ в Интернет и ключ API HomeAPI. Можно использовать только устройства, возвращаемые функцией SmartDevice HomeAPI. Отдельный модуль Liebherr SmartModule LocalAPI не поддерживается и не взаимозаменяем с HomeAPI.

Сервис HomeAPI в настоящее время находится в стадии бета-тестирования, поэтому доступные возможности и поля ответа могут измениться.

Liebherr и SmartDevice являются товарными знаками компании Liebherr. Данный проект не связан с компанией Liebherr и не поддерживается ею.

## Требования

- Совместимое устройство Liebherr, доступное через SmartDevice HomeAPI.
- Ключ API Liebherr SmartDevice HomeAPI
- Доступ в Интернет через хост ioBroker
- Node.js 22 или более поздняя версия
- ioBroker js-controller 7.0.4 или новее
- ioBroker Admin 7.6.20 или более поздняя версия

## Установка

Установите адаптер из стандартного списка адаптеров в административной панели ioBroker. Создайте экземпляр адаптера, если административная панель ioBroker не создает его автоматически, введите ключ API HomeAPI в конфигурацию экземпляра и сохраните его.

Не публикуйте ключи API в сообщениях на форумах, в задачах GitHub, на скриншотах или в выдержках из логов.

## Текущий статус

В настоящее время адаптер обеспечивает:

- Автоматическое обнаружение всех устройств, связанных с настроенным ключом API.
- Создание и опрос элементов управления на основе возможностей системы с интервалом по умолчанию 300 секунд.
- Обновление данных управления в режиме реального времени осуществляется через один поток SSE для каждого обнаруженного устройства.
- Текущие, целевые, минимальные и максимальные температуры для каждой указанной температурной зоны.
- Указанные единицы измерения температуры и метаданные шага изменения температуры.
- Проверена запись данных для целевых температур, ночного режима, режима вечеринки, режима SuperCool и режима SuperFrost, если сообщается о наличии соответствующей возможности.
- Безопасная обработка некорректно сформированных, неизвестных и будущих типов элементов управления без сбоя адаптера.

`TemperatureControl` и `ToggleControl` В настоящее время они сопоставлены. Переключатели управления сгруппированы в настройках устройства. `controls` канал; любая сообщенная связь с зоной сохраняется в собственных метаданных объекта. Обновления управления в реальном времени используют официальную конечную точку Server-Sent Events (SSE) для каждого устройства, в то время как периодический опрос REST остается активным в качестве резервной синхронизации для обеспечения безопасности и для обнаружения устройств.

## Получение ключа API HomeAPI

Ключ API генерируется в официальном приложении Liebherr SmartDevice.

1. Откройте приложение SmartDevice.
2. Откройте **«Настройки»** .
3. Откройте **HomeAPI** .
4. Сгенерируйте новый ключ API.
5. Скопируйте и надежно сохраните ключ.
6. Введите ключ в конфигурации адаптера ioBroker.liebherr.

Ключ API отображается только один раз. Генерация нового ключа API делает ранее сгенерированный ключ недействительным.

Для получения более подробной информации см. официальную [документацию Liebherr SmartDevice HomeAPI](https://developer.liebherr.com/apis/smartdevice-homeapi) .

## Конфигурация

- **Ключ API:** Ваш ключ API Liebherr SmartDevice HomeAPI. ioBroker хранит его как зашифрованную, защищенную собственную настройку. Адаптер никогда не записывает ключ в свой журнал.
- **Обновления в реальном времени:** Включает потоки HomeAPI SSE (включено по умолчанию). Отключите эту функцию, чтобы использовать только опрос.
- **Интервал опроса:** время между полным обнаружением REST-сервера и повторной синхронизацией управляющих устройств, в секундах. Значение по умолчанию — 300 секунд; допустимые значения находятся в диапазоне от 30 до 86400 секунд.

## Структура объекта

Устройства и возможности создаются динамически на основе ответа HomeAPI. Идентификаторы устройств кодируются в безопасные сегменты идентификаторов объектов ioBroker.

```text
liebherr.0
|-- info.connection
`-- devices
    `-- <encoded device ID>
        |-- info
        |   |-- deviceId
        |   |-- nickname
        |   |-- deviceName
        |   |-- deviceType
        |   |-- imageUrl
        |   `-- available
        |-- controls
        |   `-- <toggle control>
        `-- zone_<zoneId>
            |-- zoneId
            |-- position
            |-- temperature
            |-- targetTemperature
            |-- minTemperature
            |-- maxTemperature
            |-- unit
            |-- setTemperatureStepsEnabled (if reported)
            `-- setTemperatureSteps (if reported)
```

Для опытных пользователей: значения HomeAPI публикуются с помощью `ack: true`. Записываемые состояния принимают `ack: false` Изменения происходят только тогда, когда устройство сообщает о поддерживаемой возможности записи. Значения проверяются перед передачей и подтверждаются только при последующем считывании данных через HomeAPI; неудачные запросы не подтверждаются ложно.

## Ограничения

- Работа адаптера зависит от доступа к интернету и наличия облачного сервиса HomeAPI от Liebherr.
- Поддерживаются только устройства, доступ к которым осуществляется через SmartDevice HomeAPI.
- Поддержка LocalAPI модуля Liebherr SmartModule отсутствует.
- В настоящее время HomeAPI находится в стадии бета-тестирования и может быть изменен.
- Для обновления в реальном времени необходимо включить SSE; периодический опрос остается активным для обнаружения и повторной синхронизации.
- Сообщенные элементы управления, для которых не реализована схема записи, остаются доступными только для чтения.

## Тестирование и обратная связь

Данный адаптер находится на ранней стадии публичного тестирования. При сообщении о проблеме, пожалуйста, укажите следующее:

- Версии адаптера, Node.js, js-контроллера и административной панели.
- Модель прибора и тип устройства
- Названия элементов управления и идентификаторы зон, сообщаемые устройством.
- Удалены соответствующие фрагменты отладочных журналов, содержащие ключи API и другие конфиденциальные значения.

Пожалуйста, сообщайте о воспроизводимых проблемах в [системе отслеживания ошибок GitHub](https://github.com/Gaspode69/ioBroker.liebherr/issues) .

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.4 (2026-09-10)

* (Gaspode69) Updated the Node.js 22 TypeScript configuration dependency; TypeScript 7 remains deferred until the development toolchain supports its compiler API

### 0.0.3 (2026-08-19)

* (Gaspode69) Added realtime control updates via HomeAPI Server-Sent Events with reconnect handling and periodic REST resync
* (Gaspode69) Masked appliance serial numbers in adapter log messages

### 0.0.2 (2026-08-18)
* (Gaspode69) Prepared the first public testing release for the ioBroker latest repository
* (Gaspode69) Consolidated capability-based device discovery, polling, and validated control writes
* (Gaspode69) Updated Node.js requirements, project metadata, CI workflows, and repository compliance

### 0.0.2-alpha.1 (2026-08-18)
* (Gaspode69) Enabled automated npm publishing through GitHub trusted publishing

### 0.0.2-alpha.0 (2026-08-18)
* (Gaspode69) Added read-only SmartDevice HomeAPI device discovery and capability polling
* (Gaspode69) Added encrypted API-key and polling-interval configuration
* (Gaspode69) Added validated writes for target temperature, NightMode, PartyMode, SuperCool, and SuperFrost

## License
MIT License

Copyright (c) 2026 Gaspode69 <gaspode69@online.de>

**No support is provided via email.**

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