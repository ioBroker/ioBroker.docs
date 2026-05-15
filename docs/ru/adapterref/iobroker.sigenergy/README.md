---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy Adapter
hash: T33yFfhPpFE1SZDVmbMc42UIXeEGY6UuQvHlqA7YqvA=
---
# IoBroker Sigenergy Adapter

![Версия NPM](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Адаптер для солнечных энергетических систем Sigenergy через Modbus TCP/RTU**

Поддерживает протокол Sigenergy Modbus версии 2.5 (выпущен 19.02.2025).

---

## Функции
- 📡 **Modbus TCP** (Ethernet / WLAN / Оптоволокно / 4G) — Порт 502
- 🔗 **Modbus RTU** (последовательный интерфейс RS485)
- ⚡ **Полная поддержка регистров** — Все регистры для электростанций и инверторов соответствуют спецификации V2.5
- 🔋 **Характеристики батареи** — Время до полной зарядки, оставшееся время, время работы в течение дня
- ☀️ **Статистика PV** — Показатель самопотребления, показатель автаркии
- 🔌 **Зарядное устройство переменного тока** (Sigen EVAC) — Дополнительно
- ⚡ **Зарядное устройство постоянного тока** — Дополнительно
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

---

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
| Штат | Описание | Единица измерения |
| `plant.gridActivePower` | Мощность сети (>0 импорт, <0 экспорт) | кВт |
| `plant.pvPower` | Выработка фотоэлектрической энергии | кВт |
| `plant.essPower` | Мощность батареи (<0 разряда) | кВт |
| `plant.essSoc` | Уровень заряда батареи | % |
| `plant.activePower` | Общая активная мощность установки | кВт |
| `plant.runningState` | Состояние установки (0=Режим ожидания, 1=Работает...) | - |
| `plant.runningState` | Состояние установки (0=Режим ожидания, 1=Работает...) | - |

### Инвертор (`inverter.*`)
| Штат | Описание | Единица измерения |
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

### 1.9.9 (2026-05-14)
- (ssbingo) chore: dependency bumps via Dependabot: protobufjs, @protobufjs/utf8, fast-uri
- (ssbingo) chore: requires Node.js >= 22 now

### 1.9.8 (2026-04-22)
- (ssbingo) fix: deduplicated connection/poll error logs to prevent log flooding and improve Sentry-readiness
- (ssbingo) fix: shutdown guards and extendForeignObject prevent race conditions on unload and with admin UI
- (ssbingo) fix: closed socket leak on Modbus timeout; testConnection pauses polling; removed empty control channels

### 1.9.7 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.6 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.5 (2026-04-08)
- (ssbingo) fix: removed unused common.schedule from io-package.json

### 1.9.4 (2026-04-08)
- (ssbingo) fix: Changelog / adding CHANGELOG_OLD.md

### 1.9.3 (2026-04-08)
- (ssbingo) fix remove admin/index.html

### 1.9.2 (2026-04-08)
- (ssbingo) fixes

### 1.9.1 (2026-04-08)
- (ssbingo) Fixed admin UI: removed legacy index.html/index_m.html/words.js; fixed jsonData type in jsonConfig sendTo buttons

### 1.9.0 (2026-03-26)
- (ssbingo) Test abgeschlossen

### 1.8.23 (2026-03-26)
- (ssbingo) Fixed copyright year to 2026 in LICENSE and README; technical corrections: CI/CD workflow, linting, tests

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