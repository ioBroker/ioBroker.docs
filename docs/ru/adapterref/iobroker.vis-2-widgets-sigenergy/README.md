---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-sigenergy/README.md
title: ioBroker.vis-2-widgets-sigenergy
hash: zWTx5E4wtU0ZupTB7b3mrRktLhzSHIrS3u9B3POe6+g=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/admin/vis-2-widgets-sigenergy.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-2-widgets-sigenergy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-sigenergy.svg)
![Количество установок](https://iobroker.live/badges/vis-2-widgets-sigenergy-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-2-widgets-sigenergy-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-sigenergy.png?downloads=true)

# IoBroker.vis-2-widgets-sigenergy
**Тесты:** ![Тестирование и выпуск](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/workflows/Test%20and%20Release/badge.svg)

## Адаптер vis-2-widgets-sigenergy для ioBroker
Набор виджетов VIS-2 для адаптера накопителя энергии Sigenergy (`ioBroker.sigenergy`).
Содержит 8 виджетов для визуализации и управления потоком энергии, состоянием батареи, мощностью в реальном времени, ежедневной статистикой, зарядным устройством переменного тока, зарядным устройством постоянного тока, инвертором и обзором микроинвертора SigenMicro.

## Требования
- ioBroker с установленным и настроенным адаптером `sigenergy`
- Адаптер ioBroker VIS-2 (≥ 2.0.0)

## Виджеты
### Диаграмма потока энергии
Отображает текущий поток энергии между солнечными панелями, аккумулятором, сетью и домом в виде анимированной SVG-диаграммы.
Анимированные стрелки визуализируют активные соединения в реальном времени.

**Идентификаторы OID:** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![Диаграмма потока энергии](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-energiefluss.png)

#### Направления потока
| Точка данных | Значение > 0 | Значение < 0 |
|---|---|---|
| `essPower` | Зарядка батареи → стрелка от центра к батарее | Разрядка батареи → стрелка от батареи к центру |
| `pvPower` | Фотоэлектрический элемент, производящий → стрелка от фотоэлектрического элемента к центру | — |
| `housePower` | Дом потребляет → стрелка от центра к дому | — |
| `housePower` | Потребляющая мощность дома → стрелка от центра к дому | — |

### Состояние батареи и прогнозы
Отображает уровень заряда батареи (SOC), состояние здоровья батареи (SOH), мощность зарядки, а также прогнозы времени до полной зарядки, оставшегося времени работы, собственного потребления и скорости автономной работы.

**OID:** `essSoc`, `essSoh`, `essPower`, `batteryTimeToFull`, `batteryTimeRemaining`, `selfConsumptionRate`, `autarkyRate`

![Состояние батареи и прогнозы](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-batterie.png)

### Мощность в реальном времени
Компактный список всех текущих значений мощности с цветовой кодировкой направлений.

**Идентификаторы OID:** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![Энергоснабжение в реальном времени](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-leistung.png)

### Статистика энергетики
Ежедневный обзор с указанием скорости автономной работы, собственного потребления, истории уровня заряда батареи, энергии заряда/разряда и зоны покрытия батареи.

**OID:** `autarkyRate`, `selfConsumptionRate`, `dayMaxSoc`, `dayMinSoc`, `essDailyChargeEnergy`, `essDailyDischargeEnergy`, `batteryCoverageToday`, `batteryDailyChargeTime`

![Статистика энергетики](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-statistiken.png)

### Зарядное устройство переменного тока (Sigen EVAC)
Мониторинг и управление зарядным устройством переменного тока Sigenergy (EVAC). Отображает мощность зарядки, состояние системы, номинальную мощность, номинальный ток и общее потребление энергии. Сигналы тревоги подсвечиваются цветом. Ток зарядки можно установить непосредственно с помощью ползунка (6–32 А).

**OID:** `acCharger.systemState`, `acCharger.chargingPower`, `acCharger.totalEnergyConsumed`, `acCharger.ratedPower`, `acCharger.ratedCurrent`, `acCharger.alarm1/2/3`, `acCharger.control.startStop`, `acCharger.control.outputCurrent`

![Зарядное устройство переменного тока](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-ac-charger.png)

### Зарядное устройство постоянного тока
Мониторинг и управление зарядным устройством постоянного тока Sigenergy. Отображает выходную мощность, уровень заряда батареи автомобиля с индикатором выполнения, напряжение аккумуляторной батареи автомобиля, зарядный ток, а также энергию и продолжительность текущей зарядки.

**OID:** `dcCharger.outputPower`, `dcCharger.vehicleSoc`, `dcCharger.vehicleBatteryVoltage`, `dcCharger.chargingCurrent`, `dcCharger.currentChargingCapacity`, `dcCharger.currentChargingDuration`, `dcCharger.control.startStop`

![Зарядное устройство постоянного тока](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-dc-charger.png)

### Инвертор
Комплексный мониторинг и управление инвертором с навигацией по вкладкам. Отображает рабочее состояние, данные о питании, температуру батареи, фазные напряжения, все 5 регистров аварийных сигналов и информацию об устройстве (модель, серийный номер, микропрограмма).

| Вкладка | Содержание |
|---|---|
| **Мощность** | Активная мощность, мощность фотоэлектрических панелей, мощность заряда/разряда батареи, ползунок распределения мощности (от -100 % до +100 %) |
| **Аккумулятор** | Уровень заряда и состояния батареи (в виде полосок), средняя температура/напряжение элементов, максимальная/минимальная температура |
| **Сеть** | Фазовые напряжения L1/L2/L3, частота сети, коэффициент мощности, внутренняя температура PCS |
| **Сигналы тревоги** | 5 регистров сигналов тревоги (2 блока, ESS, шлюз, зарядное устройство постоянного тока) с шестнадцатеричным кодом и цветовой маркировкой |
| **Информация** | Тип модели, серийный номер, версия прошивки, переключатель Remote-EMS |

![Инвертор](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-inverter.png)

**OID:** `inverter.activePower`, `inverter.pvPower`, `inverter.essChargeDischargePower`, `inverter.runningState`, `inverter.essBatterySoc/Soh`, `inverter.essAvgCellTemperature/Voltage`, `inverter.phaseA/B/CVoltage`, `inverter.gridFrequency`, `inverter.pcsInternalTemp`, `inverter.alarm1–5`, `inverter.firmwareVersion`, `inverter.modelType`, `inverter.serialNumber`, `inverter.control.startStop`, `inverter.control.remoteEmsDispatchEnable`, `inverter.control.activePowerPercent`

### Солнечная энергия
Отображение до 3 солнечных батарей с текущими значениями мощности и анимированными стрелками, указывающими направление потока к гибридному инвертору. Цвет стрелок динамически меняется в зависимости от уровня мощности (оранжевый <1 кВт, желтый <2 кВт, зеленый >2 кВт).

#### Настройки виджета
| Параметр | Тип | Значение по умолчанию | Описание |
|---|---|---|---|
| oid_pv1 … oid_pv3 | OID | sigenergy.0.plant.pv1Power … pv3Power | OID для солнечных энергосетей |
| oid_pvtotal | OID | sigenergy.0.plant.pvPower | Общий OID мощности фотоэлектрических систем |
| sig_title | text | PV Power | Widget title |
| sig_name1 … sig_name3 | текст | Строка 1 … Строка 3 | Настраиваемые имена для каждой строки |
| sig_darkmode | checkbox | true | Темный / Светлый режим |

![PV Power](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/PV-PowerOverview.png)

**Идентификаторы OID:** `plant.pv1Power`, `plant.pv2Power`, `plant.pv3Power`, `plant.pvPower`

### Обзор SigenMicro
Общий и подробный вид всех микроинверторов SigenMicro, подключенных по протоколу Modbus. На вкладке 1 все устройства отображаются в виде анимированного сегмента сети (топология шины Ethernet с вертикальными линиями). На каждой дополнительной вкладке отображаются все 15 регистров соответствующего устройства в порядке возрастания.

| Вкладка | Содержание |
|---|---|
| **Обзор** | Все устройства представлены в виде анимированной топологии шины, сводные данные (общая мощность, суточная производительность, производительность за весь срок службы, количество подключенных устройств) |
| **Устройство 01–20** | Изображение устройства в верхнем левом углу (со смещением 10 пикселей), значок модели/серийного номера/прошивки/состояния, все 15 регистров (01–15) со значением, номером устройства и путем к OID |

#### Анимация сегмента сети
Горизонтальная линия магистрали и вертикальные линии показывают анимированные пунктирные линии, которые перемещаются вдоль кабелей, когда устройство активно (работает). Неактивные устройства (в режиме ожидания/неисправности) отображают только темную базовую линию без анимации.

#### Динамическая компоновка
| Устройства | Строки | Размер изображения |
|---|---|---|
| 1–5 | 1 строка | 80 × 90 пикселей |
| 6–10 | 1 строка | 52 × 60 пикселей |
| 11–15 | 2 строки | 46 × 52 px |
| 16–20 | 2 строки | 40 × 46 пикселей |

#### Настройки виджета
| Параметр | Тип | Значение по умолчанию | Описание |
|---|---|---|---|
| micro_count | число (1–20) | 3 | Количество микроинверторов для отображения |
| sig_title | text | Микроинвертор SigenMicro | Заголовок виджета |
| sig_darkmode | checkbox | true | Темный / Светлый режим |
| oid_micro1 … oid_micro20 | OID | — | Якорный OID для каждого устройства (например, sigenergy.0.sigenmicro.11.outputPower) |

![SigenMicro Übersicht — Übersichts-Tab](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_01.png)

![SigenMicro Übersicht — Вкладка «Детали»](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_02.png)

**OID (для каждого устройства, префикс sigenergy.0.sigenmicro.<slaveId>):** modelType, serialNumber, firmwareVersion, runningState, outputPower, gridFrequency, temperature, mppt1Voltage, mppt1Current, mppt1Power, mppt2Voltage, mppt2Current, mppt2Power, dailyYield, totalYield

### Уровень заряда аккумулятора (EV SOC)
В качестве центрального визуального элемента отображается настраиваемое изображение автомобиля (например, Fiat 500e). В правом верхнем углу расположен цветовой значок с изображением молнии, текущим уровнем заряда в процентах и надписью «LADESTAND». Внизу отображается индикатор выполнения, показывающий текущий уровень заряда батареи. При активации режима зарядки значок мигает зеленым светом.

#### Цветовая логика
| Уровень заряда | Цвет |
|---|---|
| ≤ 15 % | Красный (#f87171) |
| ≤ 35 % | Желтый (#fbbf24) |
| > 35 % | Зеленый (#4ade80) |

#### Настройки виджета
| Параметр | Тип | Значение по умолчанию | Описание |
|---|---|---|---|
| oid_ev_soc | OID | — | Состояние заряда 0–100 |
| oid_charging | OID | — | Состояние зарядки (необязательно) — зеленое свечение при активации |
| сиг_титул | текст | Фарцойг-Ладестанд | Название автомобиля показано под изображением |
| sig_car_image | image | — | Изображение автомобиля из файлового браузера ioBroker (например, /vis-2/img/) |
| sig_darkmode | checkbox | true | Темный / Светлый режим |

![Виджет Fahrzeug-Ladestand](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-autoLadestand.png)

**Идентификаторы OID:** `oid_ev_soc`, `oid_charging`

## Появление
Все виджеты поддерживают **светлый и темный режимы**, переключаемые через настройку виджета `Dark mode`.

## Документация
- 🇬🇧 [English](README.md) — этот файл
- 🇩🇪 [Deutsch](doc/de/README.md)
- 🇷🇺 [Русский](doc/ru/README.md)
- 🇳🇱 [Nederlands](doc/nl/README.md)
- 🇫🇷 [Французский](doc/fr/README.md)
- 🇮🇹 [Итальянский](doc/it/README.md)
- 🇪🇸 [Испанский](doc/es/README.md)
- 🇵🇱 [Polski](doc/pl/README.md)
- 🇵🇹 [Португальский](doc/pt/README.md)

## Changelog
### 1.8.2 (2026-06-28)
* (ssbingo) Updated CI actions: actions/checkout to v7.0.0, ioBroker/testing-action-deploy to v1.5.0

### 1.8.1 (2026-06-08)
* (ssbingo) Fixed JSON syntax error in io-package.json; added widget screenshot to documentation

### 1.8.0 (2026-06-08)
* (ssbingo) New widget: "Fahrzeug-Ladestand" — shows a configurable EV image with animated SOC bar, color-coded charge level (red/yellow/green), and optional blinking charging badge

### 1.7.9 (2026-05-27)
* (ssbingo) Removed obsolete .eslintrc.json and .prettierignore

### 1.7.8 (2026-05-27)
* (ssbingo) Added ESLint linting, updated CI to Node.js 24; adapter requires node.js >= 22

### 1.7.7 (2026-04-20)
* (ssbingo) Text no longer distorts under non-uniform scaling — letters keep their proportions while containers continue to fill the widget area

### 1.7.6 (2026-04-20)
* (ssbingo) Scaling is now non-uniform: width and height react independently to container changes, keeping both axes individually adjustable

### 1.7.5 (2026-04-20)
* (ssbingo) Widget scaling now also reacts to height changes — content scales proportionally on both axes and is centered within the widget

### 1.7.4 (2026-04-20)
* (ssbingo) All 9 widgets now scale their content responsively with the widget size (fonts, padding, SVG, images)

### 1.7.3 (2026-04-20)
* (ssbingo) All 9 widgets now share a unified background based on the PV-Power widget design

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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