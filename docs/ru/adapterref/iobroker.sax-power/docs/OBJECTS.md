---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/OBJECTS.md
title: Структура объекта ioBroker
hash: AbIfc6m+QMVoPBZtOHoyJ8+7sCcuP6zKPSxwTR01fdc=
---
# Структура объекта ioBroker

## Прогресс в улучшении состояния батареи

Каждый`devices.<serialNumber>.battery.health` канал раскрывает предполагаемые`value` , доступность`status` ,`validRuns` ,`requiredRuns` ,`rejectedRuns` Текущее направление работы/SOC/энергия/временные метки, начало сбора данных и последняя оценка.`progress` Состояние в формате JSON является постоянной внутренней контрольной точкой.`summary.battery.health` Объединяет видимые счетчики и результаты по всем настроенным устройствам.

## Корневая структура

```text
sax-power.0
├── info
├── live
├── devices
│   └── <serialNumber>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
│           ├── day
│           ├── week
│           ├── month
│           ├── year
│           └── total
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

`summary` Содержит только значения, характерные для всей системы.`devices.<serialNumber>` Всегда содержит значения одного физического запоминающего устройства.

## `info`

Информация о работе адаптера хранится ниже:

```text
info.*
```

Стандартное состояние соединения ioBroker остается основным индикатором того, подключен ли адаптер.

Дополнительная информация, предоставляемая во время выполнения, может включать:

- последнее обновление
- последняя ошибка
- диагностический статус

## Корень`live`

Корневой канал Live содержит агрегированные значения установки:

```text
live
├── pvPower
├── houseConsumptionPower
├── gridPower
├── gridDirection
├── batteryPower
├── batteryDirection
├── soc
├── deviceCount
└── lastUpdate
```

Эти значения предназначены для:

- панель управления адаптером
- ВИС
- скрипты
- Grafana или другие адаптеры для истории просмотров/визуализации

## `devices`

Каждое обнаруженное устройство хранения данных SAX Power обозначается своим серийным номером:

```text
devices.<serialNumber>
```

### Информация об устройстве

```text
devices.<serialNumber>.info
```

К типичным штатам относятся:

- `name`
- `type`
- `serialNumber`
- `firmware`
- `dataCycle`
- `lastUpdate`

### Значения в реальном времени устройства

```text
devices.<serialNumber>.live
```

Штаты:

- `batteryChargePower`
- `batteryDischargePower`
- `batteryPower`
- `batteryDirection`
- `gridImportPower`
- `gridExportPower`
- `gridPower`
- `gridDirection`
- `gridVoltage`
- `pvPower`
- `soc`

Дополнительные облачные поля остаются`null` когда недоступно.

## анализ батареи устройства

```text
devices.<serialNumber>.battery
├── model
├── nominalCapacity
├── usableCapacity
├── cycles
│   ├── reported
│   ├── day
│   ├── week
│   ├── month
│   ├── year
│   └── total
├── health
│   ├── value
│   ├── status
│   ├── validRuns
│   ├── requiredRuns
│   ├── rejectedRuns
│   ├── activeRun
│   ├── activeRunDirection
│   ├── activeRunSocStart
│   ├── activeRunSocCurrent
│   ├── activeRunEnergy
│   ├── activeRunStartedAt
│   ├── dataCollectionStartedAt
│   ├── lastEvaluation
│   └── progress
└── info.lastUpdate
```

`cycles.reported` это SAX`data_cycle` значение. Рассчитываются значения за период.`health.value` останки`null` до тех пор, пока не будет выполнено пять квалифицированных циклов сброса.`progress` Это постоянная внутренняя JSON-точка контроля; все остальные состояния здоровья являются общедоступными наблюдениями только для чтения.`activeRun*` описывает наблюдаемый в данный момент результат, в то время как`validRuns` ,`requiredRuns` и`rejectedRuns` Отобразить ход оценки. Точную формулу, метод интегрирования, правила проверки и семантику состояния см. в файле [BATTERY.md.](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md)

## Анализ комбинированной батареи

```text
summary.battery
├── deviceCount
├── nominalCapacity
├── usableCapacity
├── cycles.<day|week|month|year|total>
├── health.value
├── health.status
├── health.validRuns
├── health.requiredRuns
├── health.rejectedRuns
├── health.activeRun
├── health.activeRunDirection
├── health.activeRunSocStart
├── health.activeRunSocCurrent
├── health.activeRunEnergy
├── health.activeRunStartedAt
├── health.dataCollectionStartedAt
├── health.lastEvaluation
└── info.lastUpdate
```

Суммарное количество циклов рассчитывается с учетом емкости и не является суммой количества циклов устройства. Сводные счетчики состояния суммируются по всем устройствам. Подробная информация об активных циклах намеренно отсутствует или`mixed` , поскольку ход выполнения необходимо проверять для каждого устройства отдельно. Внутренний`progress` Состояние существует только на уровне отдельных устройств. Формулы и правила доступности см. в файле [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .

## Статистика устройства

```text
devices.<serialNumber>.statistics.<period>
```

Периоды:

- `day`
- `week`
- `month`
- `year`
- `total`

Каждый период включает в себя:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

## Сводная статистика

```text
summary.statistics.<period>
```

В дереве сводной статистики используется та же структура периодов и состояний, что и для каждого устройства. Значения энергии суммируются по всем обнаруженным устройствам хранения данных.

## Статистическая информация о времени выполнения

```text
summary.statistics.info
```

Этот канал содержит оперативные метаданные для подсистемы истории, такие как текущий источник, последнее обновление и последняя ошибка.

## Удалены технические состояния

В публичной структуре периода версии 1.0 не отображаются следующие технические состояния:

```text
samples
source
completeness
```

Существующие объекты из более старых тестовых сборок автоматически удаляются при инициализации адаптером объектов периода.

## Записываемые состояния

В версии 1.0 не создаются общедоступные записываемые состояния управления SAX Power или Modbus.