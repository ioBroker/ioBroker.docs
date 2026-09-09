---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-sigenergy/README.md
title: ioBroker.vis-2-widgets-sigenergy
hash: iEclBFGoujDNRywwVAnkQZRNIjXqvCxeu6S9uWvRdsA=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/admin/vis-2-widgets-sigenergy.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-2-widgets-sigenergy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-sigenergy.svg)
![Количество установок](https://iobroker.live/badges/vis-2-widgets-sigenergy-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-2-widgets-sigenergy-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-sigenergy.png?downloads=true)

# ioBroker.vis-2-widgets-sigenergy

**Тесты:**![Тестирование и выпуск](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/workflows/Test%20and%20Release/badge.svg)

## vis-2-widgets-sigenergy адаптер для ioBroker

Набор виджетов VIS-2 для адаптера накопителя энергии Sigenergy (`ioBroker.sigenergy` Содержит 8 виджетов для визуализации и управления потоком энергии, состоянием батареи, мощностью в реальном времени, ежедневной статистикой, зарядным устройством переменного тока, зарядным устройством постоянного тока, инвертором и обзором микроинвертора SigenMicro.

## Требования

- ioBroker с`sigenergy` адаптер установлен и настроен
- Адаптер ioBroker VIS-2 (≥ 2.0.0)

## Виджеты

### Диаграмма потока энергии

Отображает текущий поток энергии между солнечными панелями, аккумулятором, сетью и домом в виде анимированной SVG-диаграммы. Анимированные стрелки визуализируют активные соединения в реальном времени.

**OID:**`pvPower` ,`essPower` ,`gridActivePower` ,`housePower` , `essSoc`

![Диаграмма потока энергии](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-energiefluss.png)

#### Направления потока

| Точка данных      | Значение > 0                                                                           | Значение < 0                                               |
| ----------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `essPower`        | Зарядка аккумулятора → стрелка от центра к аккумулятору                                | Разрядка батареи → стрелка от батареи к центру             |
| `gridActivePower` | Потребление электроэнергии из сети → стрелка от сети к центру                          | Подача электроэнергии по сетке → стрелка от центра к сетке |
| `pvPower`         | Фотоэлектрический элемент производит → стрелка от фотоэлектрического элемента к центру | —                                                          |
| `housePower`      | Потребление дома → стрелка от центра к дому                                            | —                                                          |

### Состояние батареи и прогнозы

Отображает уровень заряда батареи (SOC), состояние здоровья батареи (SOH), мощность зарядки, а также прогнозы времени до полной зарядки, оставшегося времени работы, собственного потребления и скорости автономной работы.

**OID:**`essSoc` ,`essSoh` ,`essPower` ,`batteryTimeToFull` ,`batteryTimeRemaining` ,`selfConsumptionRate` , `autarkyRate`

![Состояние батареи и прогнозы](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-batterie.png)

### Энергоснабжение в реальном времени

Компактный список всех текущих значений мощности с цветовой кодировкой направлений.

**OID:**`pvPower` ,`essPower` ,`gridActivePower` ,`housePower` , `essSoc`

![Энергоснабжение в реальном времени](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-leistung.png)

### Статистика энергетики

Ежедневный обзор с указанием скорости автономной работы, собственного потребления, истории уровня заряда батареи, энергии заряда/разряда и зоны покрытия батареи.

**OID:**`autarkyRate` ,`selfConsumptionRate` ,`dayMaxSoc` ,`dayMinSoc` ,`essDailyChargeEnergy` ,`essDailyDischargeEnergy` ,`batteryCoverageToday` , `batteryDailyChargeTime`

![Статистика энергетики](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-statistiken.png)

### Зарядное устройство переменного тока (Sigen EVAC)

Мониторинг и управление зарядным устройством переменного тока Sigenergy (EVAC). Отображает мощность зарядки, состояние системы, номинальную мощность, номинальный ток и общее потребление энергии. Сигналы тревоги выделяются цветом. Индикатор состояния отображает упрощенное состояние зарядки в соответствии с IEC 61851-1 (Инициализация, Свободно, Подключено, Зарядка, Ошибка); при наведении курсора отображается подробное описание текущего состояния. Ток зарядки можно установить непосредственно с помощью ползунка (от 6 А до номинального тока зарядного устройства); верхний предел можно дополнительно ограничить с помощью настроек виджета.`sig_maxCurrent` Во время зарядки кнопка «Старт» заблокирована, а кнопка «Стоп» выделена.

**OID:**`acCharger.systemState` ,`acCharger.chargingPower` ,`acCharger.totalEnergyConsumed` ,`acCharger.ratedPower` ,`acCharger.ratedCurrent` ,`acCharger.alarm1/2/3` ,`acCharger.control.startStop` , `acCharger.control.outputCurrent`

![Зарядное устройство переменного тока](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-ac-charger.png)

### Зарядное устройство постоянного тока

Мониторинг и управление зарядным устройством постоянного тока Sigenergy. Отображает выходную мощность, уровень заряда батареи автомобиля с индикатором выполнения, напряжение батареи автомобиля, зарядный ток, а также энергию и продолжительность текущей зарядки. Индикатор состояния показывает рабочее состояние зарядной станции.`dcCharger.runningState` (статус: свободен, подключен/подготавливается, запланирован, заряжается, разряжается, завершен, предупреждение, неисправность/недоступен); при наведении курсора отображается подробное объяснение. Во время зарядки или разрядки кнопка «Старт» заблокирована, а кнопка «Стоп» выделена. Если OID состояния не задан, он определяется на основе OID выходной мощности; без значения состояния значок возвращается к выходной мощности, и всплывающая подсказка объясняет причину в зависимости от версии протокола, обнаруженной адаптером.

**OID:**`dcCharger.runningState` ,`dcCharger.outputPower` ,`dcCharger.vehicleSoc` ,`dcCharger.vehicleBatteryVoltage` ,`dcCharger.chargingCurrent` ,`dcCharger.currentChargingCapacity` ,`dcCharger.currentChargingDuration` ,`dcCharger.control.startStop` ,`info.protocolVersion` (`oid_protocol` )

![Зарядное устройство постоянного тока](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-dc-charger.png)

### Инвертор

Комплексный мониторинг и управление инвертором с навигацией по вкладкам. Отображает рабочее состояние, данные о питании, температуру батареи, фазные напряжения, все 5 регистров аварийных сигналов и информацию об устройстве (модель, серийный номер, микропрограмма).

| Вкладка          | Содержание                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Власть**       | Активная мощность, мощность фотоэлектрических панелей, мощность заряда/разряда батареи, ползунок распределения мощности (от -100 % до +100 %). |
| **Батарея**      | SOC и SOH с указанием значений в виде полос, средняя температура/напряжение ячейки, максимальная/минимальная температура.                      |
| **Сетка**        | Фазовые напряжения L1/L2/L3, частота сети, коэффициент мощности, внутренняя температура PCS.                                                   |
| **Сигнализация** | 5 регистров аварийных сигналов (PCS ×2, ESS, шлюз, зарядное устройство постоянного тока) с шестнадцатеричным кодом и цветовой маркировкой.     |
| **Информация**   | Тип модели, серийный номер, версия прошивки, переключатель Remote-EMS.                                                                         |

![Инвертор](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-inverter.png)

**OID:**`inverter.activePower` ,`inverter.pvPower` ,`inverter.essChargeDischargePower` ,`inverter.runningState` ,`inverter.essBatterySoc/Soh` ,`inverter.essAvgCellTemperature/Voltage` ,`inverter.phaseA/B/CVoltage` ,`inverter.gridFrequency` ,`inverter.pcsInternalTemp` ,`inverter.alarm1–5` ,`inverter.firmwareVersion` ,`inverter.modelType` ,`inverter.serialNumber` ,`inverter.control.startStop` ,`inverter.control.remoteEmsDispatchEnable` ,`inverter.control.activePowerPercent`

### PV Power

Отображение до 3 солнечных батарей с текущими значениями мощности и анимированными стрелками, указывающими направление потока к гибридному инвертору. Цвет стрелок динамически меняется в зависимости от уровня мощности (оранжевый <1 кВт, желтый <2 кВт, зеленый >2 кВт).

#### Настройки виджета

| Параметр                | Тип    | По умолчанию                          | Описание                                                             |
| ----------------------- | ------ | ------------------------------------- | -------------------------------------------------------------------- |
| oid\_pv1 … oid\_pv3     | ОИД    | sigenergy.0.plant.pv1Power … pv3Power | Идентификаторы OID для управления питанием фотоэлектрической цепочки |
| oid\_pvtotal            | ОИД    | sigenergy.0.plant.pvPower             | Общая мощность фотоэлектрических систем OID                          |
| sig\_title              | текст  | PV Power                              | Заголовок виджета                                                    |
| sig\_name1 … sig\_name3 | текст  | Строка 1 … Строка 3                   | Настраиваемые имена для каждой строки                                |
| sig\_darkmode           | флажок | истинный                              | Темный/Светлый режим                                                 |

![PV Power](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/PV-PowerOverview.png)

**OID:**`plant.pv1Power` ,`plant.pv2Power` ,`plant.pv3Power` ,`plant.pvPower`

### Обзор SigenMicro

Общий и подробный вид всех микроинверторов SigenMicro, подключенных по протоколу Modbus. На вкладке 1 все устройства отображаются в виде анимированного сегмента сети (топология шины Ethernet с вертикальными линиями). На каждой дополнительной вкладке отображаются все 15 регистров соответствующего устройства в порядке возрастания.

| Вкладка              | Содержание                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Обзор**            | Все устройства представлены в виде анимированной топологии шины, сводные данные (общая мощность, суточная выработка, выработка за весь срок службы, количество подключенных устройств).             |
| **Устройство 01–20** | Изображение устройства в верхнем левом углу (со смещением 10 пикселей), значок модели/серийного номера/прошивки/состояния, все 15 регистров (01–15) со значением, номером устройства и путем к OID. |

#### Анимация сегмента сети

Горизонтальная линия магистрали и вертикальные линии показывают анимированные пунктирные линии, которые перемещаются вдоль кабелей, когда устройство активно (работает). Неактивные устройства (в режиме ожидания/неисправности) отображают только темную базовую линию без анимации.

#### Динамическая компоновка

| Устройства | Ряды   | размер изображения |
| ---------- | ------ | ------------------ |
| 1–5        | 1 ряд  | 80 × 90 пикселей   |
| 6–10       | 1 ряд  | 52 × 60 пикселей   |
| 11–15      | 2 ряда | 46 × 52 пикселей   |
| 16–20      | 2 ряда | 40 × 46 пикселей   |

#### Настройки виджета

| Параметр                   | Тип          | По умолчанию             | Описание                                                                                |
| -------------------------- | ------------ | ------------------------ | --------------------------------------------------------------------------------------- |
| микро\_счет                | число (1–20) | 3                        | Количество микроинверторов для отображения                                              |
| sig\_title                 | текст        | Микроинвертор SigenMicro | Заголовок виджета                                                                       |
| sig\_darkmode              | флажок       | истинный                 | Темный/Светлый режим                                                                    |
| oid\_micro1 … oid\_micro20 | ОИД          | —                        | Привязывайте OID к каждому устройству (например, sigenergy.0.sigenmicro.11.outputPower) |

![SigenMicro Übersicht — Übersichts-Tab](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_01.png)

![SigenMicro Übersicht — Вкладка «Детали»](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_02.png)

**Идентификаторы устройств (для каждого устройства, префикс sigenergy.0.sigenmicro.<slaveId> ):** modelType, serialNumber, firmwareVersion, runningState, outputPower, gridFrequency, temperature, mppt1Voltage, mppt1Current, mppt1Power, mppt2Voltage, mppt2Current, mppt2Power, dailyYield, totalYield

### Уровень заряда аккумулятора (EV SOC)

В качестве центрального визуального элемента отображается настраиваемое изображение автомобиля (например, Fiat 500e). В правом верхнем углу расположен цветовой значок с изображением молнии, текущим уровнем заряда в процентах и надписью «LADESTAND». Внизу отображается индикатор выполнения, показывающий текущий уровень заряда батареи. При активации режима зарядки значок мигает зеленым светом.

#### Цветовая логика

| Уровень заряда | Цвет              |
| -------------- | ----------------- |
| ≤ 15 %         | Красный (#f87171) |
| ≤ 35 %         | Желтый (#fbbf24)  |
| > 35 %         | Зеленый (#4ade80) |

#### Настройки виджета

| Параметр        | Тип         | По умолчанию       | Описание                                                                      |
| --------------- | ----------- | ------------------ | ----------------------------------------------------------------------------- |
| oid\_ev\_soc    | ОИД         | —                  | Уровень заряда 0–100                                                          |
| oid\_charging   | ОИД         | —                  | Состояние зарядки (опционально) — зеленое свечение при активации.             |
| sig\_title      | текст       | Fahrzeug-Ladestand | Название транспортного средства указано под изображением.                     |
| sig\_car\_image | изображение | —                  | Изображение автомобиля из файлового браузера ioBroker (например, /vis-2/img/) |
| sig\_darkmode   | флажок      | истинный           | Темный/Светлый режим                                                          |

![Виджет Fahrzeug-Ladestand](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-autoLadestand.png)

**OID:**`oid_ev_soc` ,`oid_charging`

## Появление

Все виджеты поддерживают **светлый и темный режимы** , переключаемые в настройках виджета.`Dark mode` .

## Документация

- 🇬🇧 [Английский](README.md) — этот файл
- 🇩🇪 [Deutsch](doc/de/README.md)
- 🇷🇺 [Русский](doc/ru/README.md)
- 🇳🇱 [Nederlands](doc/nl/README.md)
- 🇫🇷 [Français](doc/fr/README.md)
- 🇮🇹 [Italiano](doc/it/README.md)
- 🇪🇸 [Español](doc/es/README.md)
- 🇵🇱 [Polski](doc/pl/README.md)
- 🇵🇹 [Português](doc/pt/README.md)

## Changelog
### 1.8.10 (2026-09-07)
* (ssbingo) Removed the `admin` entry from `globalDependencies`: a widget set has no admin UI, so no admin version needs to be required (repository checker S1091)

### 1.8.9 (2026-09-07)
* (ssbingo) DC charger: a station that marks its running state register as not valid no longer shows up as a red "Unbekannt" badge. The Sigenergy protocol signals "register not valid" by setting all bits, and a SigenStor EC **with** a DC charger answers that way for register 31513 while its neighbouring registers (rated power, PV yield, meters) read normally. The badge is now derived from the output power in that case and the tooltip states that this is neither an adapter nor a configuration problem
* (ssbingo) DC charger: the raw sentinel 65535 is recognised as well, so the badge is also correct on adapter versions before 3.3.1, which pass the value through instead of reporting no value
* (ssbingo) DC charger: new OID setting `oid_protocol` (default `sigenergy.0.info.protocolVersion`). The protocol version was previously derived from the instance prefix only, and such an OID is never subscribed by VIS, so `vis.states` stayed empty and the tooltip claimed "Protokollversion noch nicht erkannt" even though the adapter had detected V2.9 at startup. Declared as a regular `/id` attribute it is subscribed like every other OID
* (ssbingo) DC charger: when the protocol version cannot be read, the tooltip no longer asserts that none was detected — it says the version is not readable here and points at the new setting
* (ssbingo) DC charger: reworded the tooltip shown when the adapter reports no state although the device announces protocol V2.8 or newer — it no longer claims an adapter update is needed, since the station itself may be marking the register as not valid

### 1.8.8 (2026-09-07)
* (ssbingo) DC charger: if the state OID is not set, it is derived from the output power OID (…dcCharger.outputPower → …dcCharger.runningState), so widgets placed before 1.8.7 show the operating state without editing them
* (ssbingo) DC charger: when no operating state is available, the tooltip explains why depending on the protocol version detected by the adapter (`info.protocolVersion` / `info.protocolLevel`): register 31513 requires Sigenergy protocol V2.8; with V2.8 or newer it points to the adapter log or an adapter update; negative output power is shown as discharging

### 1.8.7 (2026-09-07)
* (ssbingo) DC charger: new state OID `dcCharger.runningState` (default) – the state badge now shows the operating state of the charging station (free, connected/preparing, scheduled, charging, discharging, ended, warning, fault/unavailable) with a detailed explanation as tooltip; without the OID the badge is derived from the output power as before
* (ssbingo) DC charger: while charging or discharging is active, the Start button is locked and the Stop button is highlighted; negative output power (discharging) is shown in purple

### 1.8.6 (2026-09-07)
* (ssbingo) AC charger: the tooltip on the state badge is now rendered as a separate popup with a fixed font size and opaque background, so it is readable regardless of widget size and is no longer overlapped by widget content
* (ssbingo) AC charger: while charging is active, the Start button is locked and the Stop button is highlighted
* (ssbingo) Widget set now reports the correct version in the browser console

### 1.8.5 (2026-09-07)
* (ssbingo) AC charger: the charging current slider is now limited to the charger's rated current; new widget setting `sig_maxCurrent` for a manual upper limit (prevents Modbus errors when setting more than the rated current)
* (ssbingo) AC charger: system state now covers all IEC 61851-1 states (0–7: initialising, free, connected, charging, error); hovering over the state badge shows a detailed explanation

### 1.8.4 (2026-09-04)
* (ssbingo) Lowered minimum admin requirement to >=7.8.23 (admin 8 is no longer required)
* (ssbingo) CI: locked ioBroker/testing-action-deploy to major version v1; fixed Dependabot auto-merge workflow
* (ssbingo) Updated dependencies: @tsconfig/node22 22.0.6, @alcalzone/release-script-plugin-license 5.2.2

### 1.8.3 (2026-08-05)
* (ssbingo) Declared minimum requirements: js-controller >=6.0.11, admin >=8.0.0, Node.js >=22
* (ssbingo) Updated dependencies: actions/checkout 7.0.1, ioBroker/testing-action-deploy 1.5.2, @iobroker/testing 5.3.0

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