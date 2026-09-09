---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md
title: Справочная информация по полю
hash: IE/tkFj4hvW6pybM2x4JgivwLSxu9+v1yoPjcVMhs6c=
---
# Справочная информация по полю

## Общие правила

- Значения мощности измеряются в ваттах (`W` ).
- Энергетическая ценность измеряется в киловатт-часах (`kWh` ).
- Уровень заряда измеряется в процентах (`%` ).
- Временные метки хранятся в формате, совместимом со стандартом ISO.
- Отсутствующие необязательные измерения отображаются следующим образом:`null` .
- Неизвестные значения не преобразуются в ноль.

## Информация об устройстве

Типичные маршруты:

```text
devices.<serialNumber>.info.*
```

| Состояние      |         Тип | Описание                                               |
| -------------- | ----------: | ------------------------------------------------------ |
| `name`         |        нить | Название устройства, предоставленное облаком.          |
| `type`         |        нить | Тип устройства или хранилища                           |
| `serialNumber` |        нить | Серийный номер SAX Power                               |
| `firmware`     |        нить | Сообщенная версия прошивки                             |
| `dataCycle`    |       число | Указанный цикл обработки данных, если таковой имеется. |
| `lastUpdate`   | строка/дата | Последнее обновление устройства было зафиксировано.    |

Точный объем доступной информации зависит от ответа облачного сервиса.

## Значения в реальном времени устройства

Типичные маршруты:

```text
devices.<serialNumber>.live.*
```

| Состояние               | Единица | Значение                                                                    |
| ----------------------- | ------: | --------------------------------------------------------------------------- |
| `batteryChargePower`    |       В | Положительная величина текущей мощности зарядки батареи                     |
| `batteryDischargePower` |       В | Положительная величина текущей мощности разряда батареи                     |
| `batteryPower`          |       В | Подписанное питание батареи                                                 |
| `batteryDirection`      |   текст | `charging` ,`discharging` , или `idle`                                      |
| `gridImportPower`       |       В | Положительная величина импорта в сеть                                       |
| `gridExportPower`       |       В | Положительная величина экспорта из сети                                     |
| `gridPower`             |       В | Подписанная мощность сети                                                   |
| `gridDirection`         |   текст | `import` ,`export` , или `idle`                                             |
| `gridVoltage`           |       В | Напряжение сети                                                             |
| `pvPower`               |       В | Производство фотоэлектрической энергии, обеспечиваемое облачными сервисами. |
| `soc`                   |       % | Обвинение                                                                   |

### Индикатор заряда батареи

- отрицательный: зарядка
- положительный: разряд
- ноль: холостой ход

### Знак электросети

- отрицательный: экспорт
- положительный: импорт
- ноль: холостой ход

## Сводные значения корневых переменных в реальном времени

Пути:

```text
live.*
```

| Состояние               |    Единица | Значение                                                                 |
| ----------------------- | ---------: | ------------------------------------------------------------------------ |
| `pvPower`               |          В | Первое доступное значение фотоэлектрической мощности на уровне установки |
| `houseConsumptionPower` |          В | Расчетное потребление электроэнергии в доме                              |
| `gridPower`             |          В | Первое доступное значение удельной мощности сети на уровне установки     |
| `gridDirection`         |      текст | `import` ,`export` , или `idle`                                          |
| `batteryPower`          |          В | Сумма значений мощности всех доступных аккумуляторных батарей            |
| `batteryDirection`      |      текст | Направление определяется суммарной мощностью батареи.                    |
| `soc`                   |          % | Среднее арифметическое значений доступного объема памяти (SOC).          |
| `deviceCount`           |      число | Количество обнаруженных устройств хранения данных                        |
| `lastUpdate`            | дата/текст | Последняя успешная агрегация в реальном времени                          |

## Расчет потребления электроэнергии в доме

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

Расчет выполняется только в том случае, если доступны все три значения.

Когда`pvPower` недоступно:

- `live.pvPower` останки`null`
- `live.houseConsumptionPower` останки`null`
- В административном интерфейсе отображается сообщение «Недоступно».

## Статистика

Периодические траектории:

```text
summary.statistics.<period>.*
devices.<serialNumber>.statistics.<period>.*
```

Поддерживаемые названия периодов:

- `day`
- `week`
- `month`
- `year`
- `total`

Общедоступные состояния:

| Состояние          | Единица | Значение                                   |
| ------------------ | ------: | ------------------------------------------ |
| `chargedEnergy`    |    кВтч | Заряженная энергия батареи за этот период  |
| `dischargedEnergy` |    кВтч | Разряженная энергия батареи за этот период |
| `firstTimestamp`   |    дата | Впервые включена историческая ценность.    |
| `lastTimestamp`    |    дата | Последняя включенная историческая ценность |

Следующие ранее существовавшие технические области не входят в состав общедоступной объектной модели версии 1.0:

- `samples`
- за период `source`
- `completeness`

## Статистическая информация

Адаптер может отображать рабочую информацию в следующем формате:

```text
summary.statistics.info.*
```

Это включает в себя такую информацию о состоянии, как:

- активный исторический источник
- последнее обновление статистики
- последняя ошибка истории

Эти состояния описывают работу адаптера и не связаны с общедоступными значениями периода времени.

## Анализ батареи

| Состояние                                                 |           Единица | Значение                                                                                                                         |
| --------------------------------------------------------- | ----------------: | -------------------------------------------------------------------------------------------------------------------------------- |
| `devices.<serial>.battery.model`                          |             текст | Название сконфигурированной модели или `notConfigured`                                                                           |
| `devices.<serial>.battery.nominalCapacity`                |              кВтч | Номинальная емкость, используемая в формуле EFC.                                                                                 |
| `devices.<serial>.battery.usableCapacity`                 |              кВтч | Доступная мощность переменного тока сохраняется для последующих функций.                                                         |
| `devices.<serial>.battery.cycles.reported`                |             циклы | Неизмененное поле SAX в реальном времени `data_cycle`                                                                            |
| `devices.<serial>.battery.cycles.<period>`                |             циклы | Локально рассчитанные эквивалентные полные циклы                                                                                 |
| `summary.battery.cycles.<period>`                         |             циклы | Взвешенный по емкости комбинированный EFC                                                                                        |
| `devices.<serial>.battery.health.value`                   |                 % | Медианная оценка пропускной способности системы кондиционирования после пяти корректных отключений; в противном случае... `null` |
| `summary.battery.health.value`                            |                 % | Совокупная оценка, полученная при наличии результата на каждом настроенном устройстве.                                           |
| `devices.<serial>.battery.health.status`                  |             текст | `collectingData` ,`insufficientData` или `available`                                                                             |
| `summary.battery.health.status`                           |             текст | Совокупный статус доступности                                                                                                    |
| `devices.<serial>.battery.health.validRuns`               |           считать | Квалифицированные разрядные работы                                                                                               |
| `devices.<serial>.battery.health.requiredRuns`            |           считать | Требуется квалифицированное количество заездов, в настоящее время 5.                                                             |
| `devices.<serial>.battery.health.rejectedRuns`            |           считать | Короткие, прерванные или неправдоподобно завершенные запуски                                                                     |
| `devices.<serial>.battery.health.activeRun`               |             текст | `active` во время наблюдения за процессом зарядки или разрядки; в противном случае `idle`                                        |
| `devices.<serial>.battery.health.activeRunDirection`      |             текст | `charging`,`discharging` или `idle`                                                                                              |
| `devices.<serial>.battery.health.activeRunSocStart`       |                 % | Уровень заряда батареи (SOC) в начале активного запуска                                                                          |
| `devices.<serial>.battery.health.activeRunSocCurrent`     |                 % | Последние данные о состоянии органического углерода (SOC) за текущий период.                                                     |
| `devices.<serial>.battery.health.activeRunEnergy`         |              кВтч | Энергия, заимствованная из заряда батареи во время активного бега.                                                               |
| `devices.<serial>.battery.health.activeRunStartedAt`      | метка времени ISO | Начало активного запуска                                                                                                         |
| `devices.<serial>.battery.health.dataCollectionStartedAt` | метка времени ISO | Начало непрерывного сбора данных о состоянии здоровья.                                                                           |
| `devices.<serial>.battery.health.lastEvaluation`          | метка времени ISO | Время, когда последний завершенный запуск был принят или отклонен.                                                               |
| `devices.<serial>.battery.health.progress`                |              JSON | Внутренняя постоянная контрольная точка отслеживания; не редактировать.                                                          |
| `summary.battery.health.validRuns`                        |           считать | Сумма допустимых запусков на всех настроенных устройствах                                                                        |
| `summary.battery.health.requiredRuns`                     |           считать | Сумма необходимых запусков на всех настроенных устройствах                                                                       |
| `summary.battery.health.rejectedRuns`                     |           считать | Сумма отклоненных запусков по всем настроенным устройствам                                                                       |
| `summary.battery.health.activeRun`                        |             текст | `active` если на каком-либо устройстве в данный момент запущена активная программа; в противном случае — нет. `idle`             |
| `summary.battery.health.activeRunDirection`               |             текст | `mixed` ; проверить состояние устройства для определения фактического направления                                                |
| `summary.battery.health.activeRunSocStart`                |                 % | Всегда`null` ; Прогресс в разработке SOC зависит от конкретного устройства.                                                      |
| `summary.battery.health.activeRunSocCurrent`              |                 % | Всегда`null` ; Прогресс в разработке SOC зависит от конкретного устройства.                                                      |
| `summary.battery.health.activeRunEnergy`                  |              кВтч | Всегда`null` ; прогресс в области энергетики зависит от конкретного устройства.                                                  |
| `summary.battery.health.activeRunStartedAt`               | метка времени ISO | Пусто; время начала зависит от устройства.                                                                                       |
| `summary.battery.health.dataCollectionStartedAt`          | метка времени ISO | Начало сбора данных на самых ранних настроенных устройствах                                                                      |
| `summary.battery.health.lastEvaluation`                   | метка времени ISO | Результаты последнего запуска на всех настроенных устройствах.                                                                   |

Полные формулы, таблица моделей, разграничение источников, агрегация данных между несколькими устройствами и ограничения описаны в [файле BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .