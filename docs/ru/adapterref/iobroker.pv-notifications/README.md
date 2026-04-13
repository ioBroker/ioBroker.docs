---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pv-notifications/README.md
title: ioBroker PV Notifications Adapter
hash: cDB3mf0IE3nfderpAMyyLp+pkGlkcYC2VLbhKGwcQG4=
---
# Адаптер уведомлений ioBroker PV
![Логотип](../../../en/adapterref/iobroker.pv-notifications/admin/pv-notifications.png)

Отправляет уведомления в Telegram о состоянии батареи фотоэлектрической системы (полный заряд, разряд, промежуточный уровень).

## Функции
- 🔋 **Уведомление о полном заряде батареи** при 100% заряде
- ⚠️ **Уведомление о разрядке батареи** при 0%
- 📊 **Промежуточные уровни** (20%, 40%, 60%, 80%) с указанием уровня заряда в % и кВт·ч
- 🌙 **Ночной режим** (время настраивается, по умолчанию: 23:00-06:00)
- 🤫 **Тихий режим** (настраиваемое время, по умолчанию: 12:00-15:00)
- 📈 **Ежедневная статистика** в настраиваемое время (по умолчанию: 22:00)
- 📅 **Еженедельная статистика** по настраиваемому дню недели
- 📆 **Ежемесячная статистика** (опционально) за настраиваемый день
- 🌤️ Интеграция с **прогнозом погоды** (требуется адаптер openweathermap)
- ⚡ **Рекомендации** для высокого уровня производства / высокого потребления
- 📊 **Статистические данные** из адаптера sourceanalytix

## Зависимости
Для полноценной работы необходимы следующие адаптеры:

| Адаптер | Описание | Требуется |
|---------|-------------|----------|
| **Telegram** | Отправляет уведомления | ✅ Да |
| **sourceanalytix** | Статистические данные (потребление, подача электроэнергии в сеть, мощность сети) | ✅ Да |
| **daswetter** или **openweathermap** | Прогноз погоды для рекомендаций | ❌ (необязательно) |

## Конфигурация
### Telegram
| Настройки | Описание |
|---------|-------------|
| Экземпляр Telegram | Например, `telegram.0` |
| Пользователи Telegram | Список имен или идентификаторов, разделенных запятыми, например, `User1, User2` или `-123456789` |

**Примечание:** Вы можете добавлять пользователей Telegram как по **имени пользователя** (без символа @), так и по **ID Telegram** (для групп/каналов — отрицательное значение).

### Точки данных
| Настройка | Описание | Пример |
|---------|-------------|---------|
| Уровень заряда батареи | Значение уровня заряда в % | `modbus.0.holdingRegisters.40083_Batterie_SOC` |
| Общий объем производства | Производство сегодня в кВт·ч | `javascript.0.Solar.Sungrow.Gesamtproduktion` |
| Подача электроэнергии в сеть | Подача электроэнергии в сеть сегодня в кВтч | `sourceanalytix.0...Einspeisung...` |
| Потребление | Потребление сегодня в кВтч | `sourceanalytix.0...Hausverbrauch...` |
| Электроэнергия из сети | Электроэнергия из сети сегодня в кВтч | `sourceanalytix.0...Netzbezug...` |
| Производство за этот месяц | Ежемесячное производство (кВт·ч) | `sourceanalytix.0...Produktion.currentMonth` |
| Потребление за этот месяц | Ежемесячное потребление (кВт·ч) | `sourceanalytix.0...Verbrauch.currentMonth` |
| Подача электроэнергии в сеть в этом месяце | Ежемесячная подача электроэнергии в сеть (кВт·ч) | `sourceanalytix.0...Einspeisung.currentMonth` |
| Электроэнергия из сети за этот месяц | Ежемесячная электроэнергия из сети (кВт·ч) | `sourceanalytix.0...Netzbezug.currentMonth` |
| Производство на этой неделе | Еженедельное производство (кВт·ч) | `sourceanalytix.0...Produktion.currentWeek` |
| Потребление за эту неделю | Еженедельное потребление (кВт·ч) | `sourceanalytix.0...Verbrauch.currentWeek` |
| Подача электроэнергии на этой неделе | Еженедельная подача электроэнергии (кВт·ч) | `sourceanalytix.0...Einspeisung.currentWeek` |
| Электроэнергия из сети на этой неделе | Еженедельная электроэнергия из сети (кВт·ч) | `sourceanalytix.0...Netzbezug.currentWeek` |
| Электроэнергия из сети на этой неделе | Еженедельная электроэнергия из сети (кВт·ч) | `sourceanalytix.0...Netzbezug.currentWeek` |

### Погода (необязательно)
| Настройки | Описание | Пример (daswetter) | Пример (openweathermap) |
|---------|-------------|---------------------|-------------------------|
| Погода сегодня | Описание погоды сегодня | `daswetter.0.Day0.forecast.currentSymbol` | `openweathermap.0.forecast.0.text` |
| Погода завтра | Описание погоды на завтра | `daswetter.0.Day1.forecast.currentSymbol` | `openweathermap.0.forecast.1.text` |
| Температура завтра (°C) | Температура завтра | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |
| Температура завтра (°C) | Температура завтра | `daswetter.0.Day1.forecast.maxTemp` | `openweathermap.0.forecast.1.temp` |

**Примечание:** Поля `Weather Today` и `Weather Tomorrow` можно использовать в качестве альтернативы, если адаптер погоды предоставляет другие форматы. Для наилучшей совместимости мы рекомендуем использовать поля `Weather Text`.

### Батарея
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Емкость батареи | Емкость в Вт·ч | `21000` |
| Порог ПУСТОТА | SOC для "пустота" | `0` |
| Сбросьте FULL ниже | Сбросьте, если SOC < | `95` |
| Сбросить пустое значение выше | Сбросить, если SOC > | `5` |
| Сбросить пустое значение выше | Сбросить, если SOC > | `5` |

### Средний уровень
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Промежуточные уровни | Уровни SOC, разделенные запятыми | `20,40,60,80` |
| Мин. Интервал ПУСТО | Минуты между уведомлениями | `5` |
| Мин. промежуточный интервал | Минуты между уведомлениями | `30` |
| Включить ночной режим | Флажок для ночного режима | `true` |
| Запуск ночного режима | Время начала (формат: ЧЧ:ММ) | `23:00` |
| Завершение ночного режима | Время окончания (формат: ЧЧ:ММ) | `06:00` |
| Игнорировать ночной режим при 0% заряда батареи | Всегда уведомлять при 0% | `true` |
| Включить тихий режим | Флажок для тихого режима | `false` |
| Начало тихого режима | Время начала (формат: ЧЧ:ММ) | `12:00` |
| Завершение тихого режима | Время окончания (формат: ЧЧ:ММ) | `15:00` |
| Завершение тихого режима | Время окончания (формат: ЧЧ:ММ) | `15:00` |

### Статистика
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Ежедневная статистика | Время | Формат ЧЧ:ММ | `22:00` |
| Еженедельная статистика | Формат ЧЧ:ММ | `10:00` |
| Включить ежемесячную статистику | Флажок для ежемесячной статистики | `false` |
| День месяца | 1-31 | `1` (1-е число месяца) |
| Ежемесячная статистика по времени | Формат ЧЧ:ММ | `09:00` |
| Ежемесячная статистика | Формат ЧЧ:ММ | `09:00` |

## Примеры
### Батарея полностью заряжена (100%)
```
11:45 - 🔋 *Battery FULL* (100%)

⚡ Current Production: 5356 W
🏠 Current Consumption: 1200 W
☀️ Production Today: 12.5 kWh
🔌 Feed-in Today: 8.2 kWh
🌤️ Tomorrow: ☀️ Sunny

🚗 Now ideal for: Electric car, washing machine, dishwasher!
```

### Средний уровень (60%)
```
11:51 - 🔋 Battery at 60% (12.6 kWh) ⬆️
⚡ Production: 5356 W
```

### Ежедневная статистика (22:00)
```
22:00 - 📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 12.5 kWh
🏠 Own Consumption: 8.2 kWh (65.6%)
🔌 Feed-in: 4.3 kWh
⚡ Grid Power: 2.1 kWh
```

### Ежемесячная статистика (1-го числа месяца в 09:00)
```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles This Month: 28
📉 Empty Cycles This Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 345.2 kWh
🏠 Own Consumption: 287.5 kWh (83.3%)
🔌 Feed-in: 57.7 kWh
⚡ Grid Power: 23.4 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## Штаты
Адаптер создает следующие состояния в разделе `pv-notifications.0`:

### Текущая статистика
| Штат | Тип | Описание |
|-------|------|-------------|
| `statistics.fullCyclesToday` | номер | Полные циклы сегодня |
| `statistics.maxSOCToday` | число | Максимальный уровень заряда батареи сегодня |
| `statistics.minSOCToday` | номер | Минимальный уровень SOC сегодня |
| `statistics.fullCyclesWeek` | номер | Полные циклы на этой неделе |
| `statistics.emptyCyclesWeek` | номер | Пустые циклы на этой неделе |
| `statistics.currentSOC` | номер | Текущий уровень заряда батареи |
| `statistics.currentEnergyKWh` | число | Текущая энергия в кВт·ч |
| `statistics.currentEnergyKWh` | число | Текущая энергия в кВт·ч |

### Сохранены данные за прошлый месяц (для ежемесячной статистики)
| Штат | Тип | Описание |
|-------|------|-------------|
| `statistics.lastMonthProduction` | число | Производство в прошлом месяце (кВтч) |
| `statistics.lastMonthFeedIn` | число | Подача электроэнергии в сеть в прошлом месяце (кВт·ч) |
| `statistics.lastMonthGridPower` | число | Мощность сети за прошлый месяц (кВт·ч) |
| `statistics.lastMonthFullCycles` | число | Полные циклы за последний месяц |
| `statistics.lastMonthEmptyCycles` | число | Количество пустых циклов за последний месяц |
| `statistics.lastMonthEmptyCycles` | число | Количество пустых циклов за последний месяц |

### Сохраненные данные за прошлую неделю (для еженедельной статистики)
| Штат | Тип | Описание |
|-------|------|-------------|
| `statistics.lastWeekProduction` | число | Производство за прошлую неделю (кВт·ч) |
| `statistics.lastWeekFeedIn` | число | Подача электроэнергии за последнюю неделю (кВт·ч) |
| `statistics.lastWeekGridPower` | число | Мощность сети за прошлую неделю (кВт·ч) |
| `statistics.lastWeekFullCycles` | число | Полные циклы за последнюю неделю |
| `statistics.lastWeekEmptyCycles` | число | Количество пустых циклов за последнюю неделю |
| `statistics.lastWeekEmptyCycles` | число | Количество пустых циклов за последнюю неделю |

## Примечание к ежемесячной и еженедельной статистике
**Важно:** Адаптер автоматически сохраняет данные за прошлый месяц и прошлую неделю в США.

### Ежемесячная статистика
- Ежемесячная статистика отправляется в **указанный день** (по умолчанию: 1-го числа месяца).
- Адаптер **автоматически сохраняет** текущие ежемесячные данные перед сбросом статистики.
- Статистика использует **сохраненные данные** из состояний `statistics.lastMonth*`.
- **Настройки:** Убедитесь, что ежемесячная статистика отправляется **после последнего дня месяца** (например, 1-го числа в 09:00).

### Еженедельная статистика
- Еженедельная статистика отправляется в **установленный день недели** (по умолчанию: понедельник).
- Адаптер **автоматически сохраняет** текущие еженедельные данные перед сбросом статистики.
- В статистике используются **сохраненные данные** из состояний `statistics.lastWeek*`.
- **Настройки:** Укажите день недели (0=Пн, 1=Вт, ..., 6=Вс)

## Пример конфигурации (openweathermap)
### Настройка точек данных о погоде
Если вы используете адаптер **openweathermap**, настройте следующие поля:

```
Weather Today:          openweathermap.0.forecast.0.text
Temperature Today:      openweathermap.0.forecast.0.temp
Weather Tomorrow:       openweathermap.0.forecast.1.text
Temperature Tomorrow:   openweathermap.0.forecast.1.temp
```

### Альтернатива: адаптер Daswetter
```
Weather Today:          daswetter.0.Day0.forecast.currentSymbol
Temperature Today:      daswetter.0.Day0.forecast.maxTemp
Weather Tomorrow:       daswetter.0.Day1.forecast.currentSymbol
Temperature Tomorrow:   daswetter.0.Day1.forecast.maxTemp
```

### Пример вывода с погодой
**Ежедневная статистика:**

```
📊 *Daily Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Current Charge Level: 85%
⚡ Current Energy: 17.9 kWh (21.0 kWh Total)
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 45.2 kWh
🏠 Own Consumption: 32.1 kWh (71%)
🔌 Feed-in: 13 kWh
⚡ Grid Power: 2 kWh
━━━━━━━━━━━━━━━━━━━━━━
🌤️ *Weather Tomorrow:* ☀️ Sunny 22.5°C
☀️ Good PV production expected!
```

**Еженедельная статистика:**

```
📊 *Weekly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Week: 5
📉 Empty Cycles Last Week: 3
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 312.5 kWh
🏠 Own Consumption: 224.8 kWh (72%)
🔌 Feed-in: 87.7 kWh
⚡ Grid Power: 45.3 kWh
━━━━━━━━━━━━━━━━━━━━━━
💡 A healthy cycle per day is normal.
🔋 Check battery settings if many cycles.
```

### Ежемесячная статистика (1-го числа месяца в 09:00)
```
09:00 - 📊 *Monthly Statistics PV System*
━━━━━━━━━━━━━━━━━━━━━━
🔋 Full Cycles Last Month: 28
📉 Empty Cycles Last Month: 15
━━━━━━━━━━━━━━━━━━━━━━
☀️ Production: 1245.7 kWh
🏠 Own Consumption: 897.3 kWh (72%)
🔌 Feed-in: 348.4 kWh
⚡ Grid Power: 185.2 kWh
━━━━━━━━━━━━━━━━━━━━━━
```

## Ночной режим и Тихий режим
### Ночной режим (настраиваемый)
В период с **23:00 до 06:00** (настраивается) следующие уведомления отключаются:

- ❌ Батарея полностью заряжена (100%)
- ❌ Средний уровень (20%, 40%, 60%, 80%)

Следующее уведомление отправляется **всегда**:

- ✅ Батарея разряжена (0%) – если включена опция "Игнорировать ночной режим при 0% заряда батареи".

### Тихий режим (настраиваемый)
В период с **12:00 до 15:00** (настраивается) **все** уведомления отключаются:

- ❌ Батарея полностью заряжена (100%)
- ❌ Батарея разряжена (0%)
- ❌ Средний уровень (20%, 40%, 60%, 80%)

**Примечание:** Тихий режим отключает все уведомления, включая уведомления о 0% заряда батареи. Используйте его в тех случаях, когда вы не хотите, чтобы вас беспокоили (например, во время сна, на совещаниях).

## Автор
Alex1808 через LLM: Qwen

sadam6752@gmail.com

## Документация на других языках
- [🇬🇧 Английский](README.md)
- [🇩🇪 Deutsch](doc/de/README.md)
- [🇷🇺 Русский](doc/ru/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.24 (2026-03-17)
* (FIX) Added missing uk translations to news entries, fixed prettier formatting in main.js

### 1.2.23 (2026-03-17)
* (FIX) Statistics section layout: daily time, sunset checkbox and sunset object aligned on one row

### 1.2.22 (2026-03-17)
* (ADD) Sunset-based daily statistics: optional checkbox to send daily stats at sunset time from a configurable object instead of fixed time

### 1.2.21 (2026-03-17)
* (FIX) Use extendObject instead of setObjectNotExists for states with unit/role to update existing instances

### 1.2.20 (2026-03-17)
* (FIX) Remove unused admin files, reduce info logs to debug, English state names with units, channel objects for statistics/info, button read:false, this.setInterval, translate fallback to English

### 1.2.19 (2026-03-16)
* (FIX) Added v1.2.18 entry to news section in io-package.json

### 1.2.18 (2026-03-16)
* (FIX) Missing await in onBatterySOCChange, null-check in buildTestMessage, safe intermediateSteps parsing, remove dead code

### 1.2.17 (2026-03-15)
* (FIX) Removed old versions from common.news to comply with W1032 (maximum 7 versions)

### 1.2.16 (2026-03-14)
* (FIX) Removed empty line in battery full message for improved formatting

### 1.2.15 (2026-03-08)
* (ADD) Added separator lines to battery full/empty and intermediate messages for improved readability

### 1.2.14 (2026-03-06)
* (FIX) Fixed intermediate message formatting: Removed extra line break before weather data (weather today appears directly below separator)

### 1.2.13 (2026-03-03)
* (ADD) Added current production (W) to test message, daily statistics and intermediate messages with improved layout
* (FIX) README.md Changelog updated for repository checker (E6006 fix)

### 1.2.11 (2026-03-02)

* (FIX) Daily statistics: Self-consumption cannot be negative (Math.max(0, totalProd - feedIn))
* (FIX) Daily statistics: Added weather today to message (in addition to weather tomorrow)
* (FIX) Weather error logging improved (warn instead of debug for better visibility)

### 1.2.10 (2026-03-02)

* (FIX) Fixed duplicate news entry in io-package.json (E1036/E2005 fix)
* (FIX) Added full translations for common.news (pt, nl, fr, it, es, pl, uk, zh-cn)
* (FIX) Reduced news entries to 7 versions (W1032 fix)

### 1.2.7 (2026-03-02)

* (FIX) Fixed io-package.json JSON syntax error (invalid duplicate news section removed)

### 1.2.6 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsDay, monthlyStatsTime, weatherEnabled, weatherInIntermediate, weatherInDailyStats, highProduction, highConsumption fields (E5507 fix)

### 1.2.5 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for monthlyStatsEnabled, minIntervalIntermediate, statsDayTime, statsWeekDay, statsWeekTime fields (E5507 fix)

* (FIX) Added LICENSE file (E190 fix)
* (FIX) Copyright formatting: Added two trailing spaces to copyright lines in README.md, doc/de/README.md, doc/ru/README.md (W6009/W6011/W7004 fix)

### 1.2.3 (2026-03-02)

* (FIX) Added size attributes (xs, xl) for minIntervalFull, minIntervalEmpty, intermediateSteps, quietModeStart, quietModeEnd fields (E5507 fix)

### 1.2.2 (2026-03-02)

* (FIX) Weekly statistics: Now uses weeklyProduction/weeklyConsumption/weeklyFeedIn/weeklyGridPower fields instead of daily values

### 1.2.1 (2026-03-01)

* (FIX) Added size attributes (xs, xl) for night mode and quiet mode fields in admin UI (E5507 fix)

### 1.2.0 (2026-03-01)

* (ADD) common.news section added to io-package.json for repository checker (E136 fix)

### 1.1.1 (2026-03-01)

* (FIX) Intermediate messages: Flag reset condition changed from `> 2` to `>= 2` for proper 2% tolerance

### 1.0.93 (2026-02-27)

* (FIX) size attributes (xs, xl) added for number fields in jsonConfig.json (E5507)
* (FIX) VSCode schema definitions updated for io-package.json and jsonConfig.json (W4040, W4042)

### 1.0.92 (2026-02-27)

* (ADD) VSCode settings added with JSON schema definitions (S4036)

### 1.0.91 (2026-02-27)

* (FIX) Old news removed from io-package.json (E2004, W1032)
* (FIX) size attributes (xs, xl) added for all objectId fields in jsonConfig.json (E5507)
* (FIX) .commitinfo added to .gitignore (S9006)

### 1.0.90 (2026-02-27)

* (FIX) JSDoc parameter descriptions added for all functions

### 1.0.89 (2026-02-27)

* (FIX) createState replaced with setObjectNotExists (W5034)
* (FIX) size attributes (xs, xl) added to jsonConfig.json (E5507)
* (FIX) Dependencies updated (@iobroker/adapter-core ^3.3.2, @alcalzone/release-script ^5.1.1)
* (FIX) admin dependency updated to >=7.6.20 (W1056)
* (FIX) Translations added for titleLang, desc, news (W1027, W1034, W1054)

### 1.0.85 (2026-02-26)
* (FIX) Deprecated common.main removed from io-package.json (W1084)

### 1.0.84 (2026-02-26)
* (FIX) Node.js version updated to >=18
* (FIX) Dependencies updated (@iobroker/adapter-core to 3.2.3, @iobroker/testing to 5.2.2)
* (FIX) io-package.json schema fixed (licenseInformation added, deprecated fields removed)
* (FIX) setInterval with clearInterval added for proper cleanup
* (FIX) js-controller dependency updated to >=6.0.11
* (FIX) admin dependency updated to >=7.6.17

### 1.0.83 (2026-02-26)
* (FIX) createState deprecated fixed (setObjectNotExists)
* (FIX) All log messages translated to English
* (FIX) README.md translated (EN + doc/de/ + doc/ru/ structure)
* (FIX) Node.js 24 added to test matrix
* (FIX) Manual installation guide removed

### 1.0.82 (2026-02-25)
* (FIX) Copilot infrastructure and AI assistant guidelines added

### 1.0.81 (2026-02-25)
* (FIX) create-adapter infrastructure added (GitHub Actions, Dependabot, ESLint, Tests)

### 1.0.80 (2026-02-25)
* (FIX) Unified intermediate notifications format (all levels show charging/discharging status)

## License

MIT License

Copyright (c) 2025-2026 Alex1808 via LLM: Qwen sadam6752@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.