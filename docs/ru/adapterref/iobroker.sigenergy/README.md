---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy Adapter
hash: F6Nt6sPKMmmrscCaDo0zQj9MCUOGXOTA+qjdkn8pD4g=
---
# IoBroker Sigenergy Adapter

![Версия NPM](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Адаптер для солнечных энергетических систем [Сигенерги](https://www.sigenergy.com) через Modbus TCP/RTU**

Поддерживает протокол Sigenergy Modbus версии 2.9 (выпущен 13.05.2026).

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## Функции
- 📡 **Modbus TCP** (Ethernet / WLAN / Оптоволокно / 4G) — Порт 502
- 🔗 **Modbus RTU** (последовательный интерфейс RS485)
- ⚡ **Полная поддержка регистров** — Все регистры для установок, инверторов, PSS и PID в соответствии со спецификацией V2.9
- 🔋 **Характеристики батареи** — Время до полной зарядки, оставшееся время, время работы в течение дня
- ☀️ **Статистика PV** — Показатель самопотребления, показатель автаркии
- 🔌 **Зарядное устройство переменного тока** (Sigen EVAC) — Дополнительно
- ⚡ **Зарядное устройство постоянного тока** — Дополнительно
- 🏗️ **PSS** (Power Station Switch) — Опционально, мониторинг распределительных устройств среднего/низкого напряжения и распределительных шкафов.
- 🔍 **PID** (детектирование изоляции фотоэлектрических элементов) — опционально
- 🌡️ **Предварительный подогрев ESS** — Расписание по времени суток, 30 настраиваемых временных окон (M1-HYA/HYB)
- 📈 **Расширенные регистры** — Интеллектуальные нагрузки 1–24, суммарная энергия, параметры сетевого кода
- ☀️ **SigenMicro** — Поддержка микроинверторов (автоматическое сканирование)
- 📊 **Расчетные значения** — Полученные статистические данные обновляются в каждом цикле опроса
- 🖥️ **Виджеты VIS** — Панели отображения потока энергии, состояния батареи и статистики.

---

## Поддерживаемое оборудование
| Категория | Модели |
|-----------------|--------|
| **Гибридный вариант** | SigenStor EC SP/TP, Sigen Hybrid SP/TP/TPLV, Sigen PV M1-HYA, контроллер PG |
| **PV-инв.** | Sigen PV Max SP/TP, Sigen PV M1 |
| **ЭВАК (AC)** | Sigen EVAC 7/11/22 кВт, PG EVAC |

---

## Адреса Modbus по умолчанию
| Устройство | Адрес |
|--------|---------|
| Растение (чтение/запись) | **247** |
| Трансляция растений (написать, без ответа) | **0** |
| Инвертор | **1** |
| Зарядное устройство переменного тока (EVAC) | **2** |
| PSS (переключатель электростанции) | **5** (по умолчанию, настраиваемый) |
| PID (обнаружение изоляции фотоэлектрических панелей) | **6** (по умолчанию, настраиваемое) |

---

## Типы устройств
Начиная с версии 2.4.0 каждый экземпляр адаптера обрабатывает ровно **один** тип системы Sigenergy (строгое правило «либо/или»).
Выберите тип на вкладке «Компоненты» — или используйте **Автоматическое определение с устройства** для считывания его с оборудования.
Наборы регистров управляются в соответствии с примечаниями к модели официального протокола Modbus V2.9:

| Возможность | СигенСтор | Сиген Гибрид | Sigen PV M1-HYB | Только PV (PV Max) | Только SigenMicro |
|---|---|---|---|---|---|
| Регистры ESS / батареи | всегда | опционально | опционально | — | — |
| Зарядное устройство постоянного тока | ✓ | ✓ | — | — | — |
| Код сетки (40051-40068) | ✓ | ✓ | — | — | — |
| Предварительный нагрев ESS (50000-50183) | — | — | ✓ | — | — |
| Коэффициент мощности PCC (40157/40158) | — | — | ✓ | — | — |
| Регистры оборудования (подчиненный 247) | ✓ | ✓ | ✓ | ✓ | — |
| Микроинверторы SigenMicro | опционально | опционально | опционально | опционально | ✓ |

Одна точка подключения Modbus (IP/шина) = один экземпляр. SigenStor с дополнительными микроинверторами SigenMicro относится к **одному** экземпляру — микроинверторы являются аддитивным компонентом, а не отдельным типом.
Существующие конфигурации до версии 2.4.0 переносятся автоматически (производный тип регистрируется при запуске — пожалуйста, еще раз проверьте вкладку «Компоненты»).

## Конфигурация
### Вкладка "Подключение"
- **Тип подключения**: TCP (Ethernet) или последовательный (RS485)
- **TCP Host**: IP-адрес вашего инвертора
- **TCP-порт**: 502 (по умолчанию)
- **Идентификатор Modbus для данного предприятия**: 247 (по умолчанию)
- **Идентификатор Modbus инвертора**: 1 (по умолчанию)

### Вкладка «Компоненты»
Выберите, какие устройства установлены:

- Аккумулятор / ESS
- Фотоэлектрические панели
- Зарядное устройство переменного тока (EVAC)
- Зарядное устройство постоянного тока
- PSS (Power Station Switch)
- PID (обнаружение изоляции фотоэлектрических элементов)
- Предварительный нагрев ESS (только для M1-HYA/HYB)
- SigenMicro (микроинверторы)

### Вкладка «Статистика»
Выберите, какие статистические показатели следует рассчитать:

- Время работы от батареи до полной зарядки
- Оставшееся время работы батареи
- Ежедневное время зарядки
- Время работы батареи
- Коэффициент самопотребления
- Ставка автаркии

---

## Объекты данных
### Растение (`plant.*`)
| Штат | Описание | Подразделение |
| `plant.gridActivePower` | Мощность сети (>0 импорт, <0 экспорт) | кВт |
| `plant.pvPower` | Выработка фотоэлектрической энергии | кВт |
| `plant.essPower` | Мощность батареи (<0 разряда) | кВт |
| `plant.essSoc` | Уровень заряда батареи | % |
| `plant.activePower` | Общая активная мощность установки | кВт |
| `plant.runningState` | Состояние установки (0=Режим ожидания, 1=Работает...) | - |
| `plant.runningState` | Состояние установки (0=Режим ожидания, 1=Работает...) | - |

### Инвертор (`inverter.*`)
| Штат | Описание | Подразделение |
| `inverter.pvPower` | Мощность фотоэлектрической системы на инверторе | кВт |
| `inverter.essBatterySoc` | Уровень заряда батареи | % |
| `inverter.essBatterySoh` | Состояние здоровья батареи | % |
| `inverter.essBatteryTemperature` | Температура батареи | °C |
| `inverter.phaseAVoltage` | Напряжение фазы А | В |
| `inverter.gridFrequency` | Частота сети | Гц |
| `inverter.gridFrequency` | Частота сети | Гц |

### Статистика (`statistics.*`)
| Штат | Описание | Единица измерения |
| `statistics.batteryTimeToFull` | Минут до полной зарядки батареи | мин |
| `statistics.batteryTimeRemaining` | Осталось минут работы батареи | мин |
| `statistics.selfConsumptionRate` | Коэффициент самопотребления | % |
| `statistics.autarkyRate` | Автаркия ставка | % |
| `statistics.housePower` | Расчетное потребление электроэнергии в доме | кВт |
| `statistics.housePower` | Расчетное потребление электроэнергии в доме | кВт |

---

## Аварийное переключение — защита внешних фотоэлектрических систем
### Фон
Гибридные инверторы Sigenergy включают в себя опциональный **аварийный шлюз питания**, который автоматически переключается в автономный/изолированный режим при отключении электросети. В этом режиме система Sigenergy создает собственную локальную сеть переменного тока, питаемую от аккумулятора.

Если **вторая фотоэлектрическая система** — например, балконная электростанция, микроинвертор или сетевой инвертор стороннего производителя — подключена к той же бытовой электросети, она будет продолжать подавать электроэнергию в эту изолированную местную сеть. Большинство сетевых инверторов не предназначены для такой ситуации и могут:

- перегрузка системы управления батареями Sigenergy
- вызывают нестабильность напряжения или частоты в автономной энергосистеме
- могут быть повреждены в результате необычных условий эксплуатации

Единственное безопасное решение — **немедленно отключить** внешнюю систему, когда Sigenergy переходит в автономный режим работы.

### Как адаптер обрабатывает это
Адаптер отслеживает состояние `plant.onOffGridStatus` в каждом цикле опроса.

**При сбое в сети** (`onOffGridStatus` = 1 или 2):

- Все настроенные аварийные устройства мгновенно отключаются.
- Отправляется уведомление в Telegram (необязательно)

**При возврате в сетку** (`onOffGridStatus` = 0):

— Запускается настраиваемый таймер стабильности (по умолчанию: 10 минут).
- Если электросеть останется стабильной в течение всего периода работы, устройства будут восстановлены.
— Если во время работы таймера произойдет еще один сбой в электросети, таймер отменяется, и устройства остаются выключенными.
- При успешном восстановлении отправляется уведомление в Telegram (необязательно)

### Включение функции
**Шаг 1 — Вкладка «Компоненты»** Установите флажок **Аварийный шлюз (автономное переключение)**.
Вкладка *Аварийное переключение* станет видимой.

**Шаг 2 — Вкладка «Аварийное переключение»**

#### Устройства
| Поле | Описание |
|---|---|
| **Задержка стабильного состояния (в минутах)** | Время, в течение которого сеть должна оставаться стабильной, прежде чем устройства снова включатся. Рекомендуется 10 минут. |
| **Устройство 1 — Идентификатор объекта** | Идентификатор состояния ioBroker главного коммутатора для внешней системы. Устанавливается в `false` при сбое сети; `true` после стабильного восстановления. |
| **Устройства 2–4 — Идентификатор объекта** | Дополнительные необязательные устройства. |
| **Устройства 2–4 — Направление** | *Выкл. при сбое, Вкл. после восстановления* или *Вкл. при сбое, Выкл. после восстановления*. |

#### Уведомления в Telegram (необязательно)
| Поле | Описание |
|---|---|
| **Включить уведомления в Telegram** | Активирует уведомления о сбоях и восстановлении сети. |
| **Экземпляр Telegram** | Выберите экземпляр адаптера `telegram.x` для использования. |
| **ID чата** | Необязательно: ограничить отправку определенным чатом. Оставьте поле пустым, чтобы отправить во все настроенные чаты. |

### Пример — Балконная электростанция
Реле Shelly Plus 1 подключено последовательно с кабелем питания балконной электростанции. Его идентификатор состояния в ioBroker — `shelly.0.SHPLUS1-ABC123.Relay0.Switch`.

Конфигурация:

- **Устройство 1**: `shelly.0.SHPLUS1-ABC123.Relay0.Switch`

→ Реле открывается (`false`) при сбое в сети, закрывается (`true`) после стабильного восстановления.

Теперь балконная электростанция защищена автоматически.

---

## Виджеты VIS
> **Примечание:** Все 7 виджетов предоставляются отдельным адаптером [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy). Установите его вместе с этим адаптером, чтобы использовать виджеты в VIS-2.

### Виджет потока энергии
Демонстрирует анимированный поток энергии между фотоэлектрической системой → батареей ↔ сетью → домом.

### Виджет состояния батареи
Отображает индикатор уровня заряда батареи (SOC), значок уровня заряда батареи (SOH), время до полной/пустой зарядки, текущий уровень заряда.

### Виджет обзора энергопотребления
Отображение в реальном времени всех четырех потоков мощности.

### Виджет статистики
Сегодняшние показатели автономности, самопотребления, минимального/максимального уровня заряда батареи и времени автономной работы.

### Виджет инвертора
Данные инвертора в режиме реального времени: мощность фотоэлектрической системы, частота сети, фазные напряжения, температура.

### Виджет зарядного устройства переменного тока (EVAC)
Показания состояния и уровня заряда зарядной станции Sigen EVAC.

### Виджет зарядного устройства постоянного тока
Показания состояния и уровня зарядного устройства постоянного тока.

---

## Протокол связи
- Modbus TCP: режим TCP, полнодуплексный, порт 502 (ведомый)
- Modbus RTU: полудуплексный режим, 9600 бит/с, 8N1
Минимальный интервал опроса: 1000 мс (1 секунда) согласно спецификации Sigenergy.
- Время ожидания: 1000 мс согласно спецификации Sigenergy.

---

## Документация
- 🇩🇪 [Немецкая документация](doc/de/README.md)
- 🇷🇺 [Документация на английском языке](doc/ru/README.md)
- 🇳🇱 [Нидерландская документация](doc/nl/README.md)
- 🇫🇷 [Французская документация](doc/fr/README.md)
- 🇮🇹 [Итальянская документация](doc/it/README.md)
- 🇪🇸 [Документация на испанском языке](doc/es/README.md)
- 🇵🇱 [Польская документация](doc/pl/README.md)
- 🇵🇹 [Португальская документация](doc/pt/README.md)
- 🇺🇦 [Документация украинская](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog

### 3.0.10 (2026-06-29)
- (ssbingo) chore: bump js-yaml from 4.1.1 to 4.3.0

### 3.0.9 (2026-06-29)
- (ssbingo) chore: pin CI actions to major version (@v1) instead of patch version

### 3.0.8 (2026-06-29)
- (ssbingo) fix: add missing i18n translations for SigenMicro scan UI strings (es, fr, it, nl, pl, pt, uk, zh-cn)

### 3.0.7 (2026-06-28)
- (ssbingo) chore: update dependencies (@iobroker/adapter-core 3.4.1, @types/node 22.20.0, testing-action-adapter 1.1.1, testing-action-deploy 1.5.0, http-proxy-middleware 3.0.7)

### 3.0.6 (2026-06-14)
- (ssbingo) fix: remove duplicate common.license field — licenseInformation already present

### 3.0.5 (2026-06-14)
- (ssbingo) fix: add missing license field to io-package.json common block

### 3.0.4 (2026-06-14)
- (ssbingo) fix: emergency Telegram notification now sent only once per grid-failure event (not repeated every poll); device switching limited to 3 attempts max (initial + 2 retries) while off-grid

### 3.0.3 (2026-06-13)
- (ssbingo) fix: remove non-functional welcomeText from io-package.json; add visible warning staticText in Emergency Switching config tab (yellow box, i18n in all 11 languages)

### 3.0.2 (2026-06-13)
- (ssbingo) fix: ESLint/Prettier errors in emergency switching methods — remove unused variable, fix indentation, add JSDoc @param types

### 3.0.1 (2026-06-13)
- (ssbingo) feat: add welcomeText to io-package.json — multilingual notice about emergency gateway switching feature

### 3.0.0 (2026-06-13)
- (ssbingo) feat: emergency gateway switching — automatic disconnection of external PV systems (balcony power plants, micro-inverters) on grid failure; configurable stability timer on grid return; optional Telegram notifications
- (ssbingo) docs: emergency switching documentation added in all 11 languages

### 2.5.2 (2026-06-12)
- (ssbingo) fix: URL-encode spaces in Buy Me a Coffee button src — image was not rendering on GitHub

### 2.5.1 (2026-06-12)
- (ssbingo) fix: correct instanceObject role for info.modelType from 'info.name' to 'text' (W1133/W1135 adapter-checker warnings)

### 2.5.0 (2026-06-12)

- (ssbingo) Architectural write safety: Modbus writes are rejected in the write dispatcher itself when the target register is not valid for the configured device type (models gating in onStateChange, plant guard for SigenMicro-only)
- (ssbingo) TypeScript type check fixed — new `lib/adapter-config.d.ts` with full AdapterConfig declaration, typed modbus-serial constructor, ioBroker.CommonType/SettableObject annotations; new `npm run check` script passes with 0 errors
- (ssbingo) ESLint configuration allows JSDoc `@type` tags in this checked-JavaScript project (jsdoc/check-tag-names with typed:false)

### 2.4.0 (2026-06-12)

- (ssbingo) Device type architecture: mandatory selector (SigenStor / Sigen Hybrid / Sigen PV M1-HYB / PV-only inverter / SigenMicro-only) with strict either/or register gating per protocol V2.9 model footnotes
- (ssbingo) Sigen Hybrid and PV-only inverters (Sigen PV / PV Max) officially supported
- (ssbingo) Auto-detect device type from hardware in the admin UI (registers 30500 / 31024)
- (ssbingo) Model verification on startup — warns when configuration and detected hardware mismatch (new state info.modelType)
- (ssbingo) Dynamic PV string registers: PV5-PV16 voltage/current enabled by the string count reported in register 31025
- (ssbingo) PCC power factor controls (40157/40158) gated to Sigen PV M1-HYB; ESS preheating gated to M1-HYB; DC charger and grid code gated to SigenStor/Sigen Hybrid
- (ssbingo) Automatic migration of pre-2.4.0 configurations and cleanup of channels that are invalid for the selected device type

### 2.3.4 (2026-06-12)
- (ssbingo) fix: correct protocol level detection — use proper register quantities for probes, descend from V2.9 to V2.6, distinguish transport errors from device exceptions to avoid false pre-V2.6 report

### 2.3.3 (2026-06-11)
- (ssbingo) fix: suppress repeated register read warnings after first occurrence for plant/inverter/acCharger/dcCharger/pss/pid; subsequent failures log at debug level only

### 2.3.2 (2026-06-10)
- (ssbingo) fix: show 'pre-V2.6' instead of 'unknown' when device responds but has no extended plant registers; add per-probe debug log with Modbus exception message

### 2.3.1 (2026-06-10)
- (ssbingo) feat: detect Modbus protocol level on startup by probing registers 30088/30200/30228/30286; read firmware version (30525); log result and store as info.protocolLevel state

### 2.3.0 (2026-06-10)
- (ssbingo) feat: add common.states enum maps for emsWorkMode/runningState/remoteEmsMode/dcCharger.runningState; wire PSS/PID/AC Charger write registers (FC06/FC10) with subscribe and onStateChange handlers

### 2.2.7 (2026-06-10)
- (ssbingo) fix: add missing native defaults enableSmartLoads/enableCumulativeEnergy/enableGridCode to io-package.json
- (ssbingo) fix: update register 30003 desc with V2.7 EMS modes 5 (FullFeedIn) and 9 (Custom)

### 2.2.6 (2026-06-10)
- (ssbingo) feat: V2.9 register audit — add missing register 30279 (current control command value), move DC Charger PV registers 31509/31511 to dcCharger namespace, fix ESS Preheating TOU time gain (null→1)
- (ssbingo) feat: implement control write-back for plant.control.*, plant.gridCode.*, inverter.control.*, dcCharger.control.* (FC06/FC10); read RW holding registers on startup
- (ssbingo) fix: suppress repeated ESS Preheating warn after device reports unsupported registers; downgrade control register startup read errors to debug

### 2.2.4 (2026-06-10)
- (ssbingo) fix: implement ESS Preheating TOU polling (FC03, 50000–50183, 94 registers) and write-back via onStateChange; add encodeValue to ModbusConnection

### 2.2.3 (2026-06-10)
- (ssbingo) fix: add 25 missing admin i18n keys for PSS, PID, ESS Preheating, Extended Registers across all 11 languages

### 2.2.2 (2026-06-09)
- (ssbingo) docs: update all READMEs to Modbus Protocol V2.9 — add PSS, PID, ESS Preheating, Extended Registers, SigenMicro; correct protocol version reference

### 2.2.1 (2026-06-09)
- (ssbingo) fix: correct PSS register table to 122 entries per official spec V2.9 (addresses, gains, types); fix PSS write registers to 6 WO entries; fix PID registers 33055-33060 (types, gains, 2 missing entries)

### 2.2.0 (2026-06-09)
- (ssbingo) feat: PSS (Power Station Switch) and PID (PV Insulation Detection) support; ESS Preheating TOU schedule registers; new admin options for PSS/PID slave IDs

### 2.1.1 (2026-06-09)
- (ssbingo) fix: wire feature flags (enableSmartLoads, enableCumulativeEnergy, enableGridCode) into polling and object creation; add Extended Registers admin tab

### 2.1.0 (2026-06-09)
- (ssbingo) feat: extended statistics — plant statistics (30088–30097), smart loads 1–24 (30098–30193), cumulative energy (30194–30271), adjustment feedback (30613–30619), grid code parameters (40049–40068)

### 2.0.0 (2026-06-09)
- (ssbingo) feat: Modbus Protocol V2.9 — new plant/inverter/DC charger registers, remove deprecated registers, extend enums


---

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