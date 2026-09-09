---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pv-notifications/README.md
title: ioBroker PV Notifications Adapter
hash: Zxkd51aXJw5pHEzv6vjGzcD00gJ64rryrb523LHNg2Y=
---
# ioBroker PV Notifications Adapter

![Логотип](../../../en/adapterref/iobroker.pv-notifications/admin/pv-notifications.png)

Отправляет уведомления в Telegram о состоянии батареи фотоэлектрической системы (полный заряд, разряд, промежуточный уровень).

## Функции

- 🔋 **Уведомление о полном заряде батареи** при достижении 100% заряда
- ⚠️ **Уведомление о разрядке батареи** при достижении 0% заряда
- 📊 **Промежуточные уровни** (20%, 40%, 60%, 80%) с указанием уровня заряда в % и кВт·ч.
- 🌙 **Ночной режим** (время можно настроить, по умолчанию: 23:00-06:00)
- 🤫 **Тихий режим** (время настраивается, по умолчанию: 12:00-15:00)
- 📈 **Ежедневная статистика** в настраиваемое время (по умолчанию: 22:00)
- 📅 **Еженедельная статистика** по настраиваемому дню недели
- 📆 **Ежемесячная статистика** (опционально) за настраиваемый день
- 🌤️ Интеграция **с прогнозом погоды** (требуется адаптер OpenWeatherMap)
- ⚡ **Рекомендации** для предприятий с высоким уровнем производства/высоким уровнем потребления
- 📊 **Статистические данные** из адаптера sourceanalytix

## Зависимости

Для полноценной работы необходимы следующие адаптеры:

| Адаптер                             | Описание                                                                         | Необходимый     |
| ----------------------------------- | -------------------------------------------------------------------------------- | --------------- |
| **телеграмма**                      | Отправляет уведомления                                                           | ✅ Да            |
| **sourceanalytix**                  | Статистические данные (потребление, подача электроэнергии в сеть, мощность сети) | ✅ Да            |
| **daswette** или **openweathermap** | Прогноз погоды для рекомендаций                                                  | ❌ Необязательно |

## Конфигурация

### Телеграмма

| Параметр              | Описание                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Экземпляр Telegram    | Например`telegram.0`                                                                           |
| Пользователи Telegram | Список имен или идентификаторов, разделенных запятыми, например:`User1, User2` или`-123456789` |

**Примечание:** Вы можете добавлять пользователей Telegram как по **имени пользователя** (без символа @), так и по **идентификатору Telegram** (для групп/каналов — отрицательно).

### Точки данных

| Параметр                              | Описание                                              | Пример                                         |
| ------------------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| Уровень заряда батареи                | Значение SOC в %                                      | `modbus.0.holdingRegisters.40083_Batterie_SOC` |
| PV Power                              | Текущая мощность в Вт                                 | `javascript.0.Solar.Sungrow.Leistung`          |
| Совокупный объем производства         | Сегодняшний объем производства в кВтч                 | `javascript.0.Solar.Sungrow.Gesamtproduktion`  |
| Подача                                | Подача электроэнергии в сеть сегодня в кВтч           | `sourceanalytix.0...Einspeisung...`            |
| Потребление                           | Потребление сегодня в кВтч                            | `sourceanalytix.0...Hausverbrauch...`          |
| Электроэнергия из сети                | Электроэнергия из сети сегодня в кВтч                 | `sourceanalytix.0...Netzbezug...`              |
| Производство в этом месяце            | Ежемесячное производство (кВт·ч)                      | `sourceanalytix.0...Produktion.currentMonth`   |
| Потребление в этом месяце             | Ежемесячное потребление (кВт·ч)                       | `sourceanalytix.0...Verbrauch.currentMonth`    |
| Кормите животных в этом месяце        | Ежемесячная выработка электроэнергии (кВт·ч)          | `sourceanalytix.0...Einspeisung.currentMonth`  |
| Электроэнергия из сети в этом месяце  | Ежемесячная выработка электроэнергии из сети (кВт·ч)  | `sourceanalytix.0...Netzbezug.currentMonth`    |
| Производство на этой неделе           | Еженедельное производство (кВт·ч)                     | `sourceanalytix.0...Produktion.currentWeek`    |
| Потребление на этой неделе            | Еженедельное потребление (кВт·ч)                      | `sourceanalytix.0...Verbrauch.currentWeek`     |
| Кормите скот на этой неделе           | Еженедельная подача электроэнергии в сеть (кВт·ч)     | `sourceanalytix.0...Einspeisung.currentWeek`   |
| Электроэнергия из сети на этой неделе | Еженедельная выработка электроэнергии из сети (кВт·ч) | `sourceanalytix.0...Netzbezug.currentWeek`     |

### Погода (по желанию)

| Параметр                 | Описание                   | Пример (daswetter)                        | Пример (openweathermap)            |
| ------------------------ | -------------------------- | ----------------------------------------- | ---------------------------------- |
| Погода сегодня           | Описание погоды на сегодня | `daswetter.0.Day0.forecast.currentSymbol` | `openweathermap.0.forecast.0.text` |
| Температура сегодня (°C) | Температура сегодня        | `daswetter.0.Day0.forecast.maxTemp`       | `openweathermap.0.forecast.0.temp` |
| Погода завтра            | Описание погоды на завтра  | `daswetter.0.Day1.forecast.currentSymbol` | `openweathermap.0.forecast.1.text` |
| Температура завтра (°C)  | Температура завтра         | `daswetter.0.Day1.forecast.maxTemp`       | `openweathermap.0.forecast.1.temp` |

**Примечание:** Поля`Weather Today` и`Weather Tomorrow` В качестве альтернативы можно использовать, если адаптер погоды поддерживает другие форматы. Для наилучшей совместимости мы рекомендуем использовать`Weather Text` поля.

### Батарея

| Параметр                          | Описание                                          | По умолчанию |
| --------------------------------- | ------------------------------------------------- | ------------ |
| Емкость аккумулятора              | Емкость в Вт·ч                                    | `21000`      |
| Порог заполнен                    | SOC означает «полный»                             | `100`        |
| Порог ПУСТОЙ                      | SOC означает «пусто».                             | `0`          |
| Сбросить до полного значения ниже | Сбросьте настройки, если уровень заряда батареи < | `95`         |
| Сбросить пустое значение выше     | Сбросьте настройки, если уровень заряда батареи > | `5`          |

### Промежуточные уровни

| Параметр                                             | Описание                           | По умолчанию  |
| ---------------------------------------------------- | ---------------------------------- | ------------- |
| Промежуточные уровни                                 | Уровни SOC, разделенные запятыми   | `20,40,60,80` |
| Мин. Интервал ПОЛНЫЙ                                 | Минуты между уведомлениями         | `10`          |
| Мин. Интервал ПУСТО                                  | Минуты между уведомлениями         | `5`           |
| Мин. Интервал Промежуточный                          | Минуты между уведомлениями         | `30`          |
| Включить ночной режим                                | Флажок для ночного режима          | `true`        |
| Ночной режим запущен                                 | Время начала (формат: ЧЧ:ММ)       | `23:00`       |
| Конец ночного режима                                 | Время окончания (формат: ЧЧ:ММ)    | `06:00`       |
| Отключите ночной режим, если заряд батареи равен 0%. | Всегда уведомляйте при 0%          | `true`        |
| Включить тихий режим                                 | Флажок для включения тихого режима | `false`       |
| Запуск тихого режима                                 | Время начала (формат: ЧЧ:ММ)       | `12:00`       |
| Завершение тихого режима                             | Время окончания (формат: ЧЧ:ММ)    | `15:00`       |

### Статистика

| Параметр                          | Описание                                    | По умолчанию            |
| --------------------------------- | ------------------------------------------- | ----------------------- |
| Время ежедневной статистики       | Формат HH:MM                                | `22:00`                 |
| Еженедельная статистика по будням | 0 = Пн, 1 = Вт, ..., 6 = Вс                 | `0` (Понедельник)       |
| Еженедельная статистика Time      | Формат HH:MM                                | `10:00`                 |
| Включить ежемесячную статистику   | Флажок для просмотра ежемесячной статистики | `false`                 |
| День месяца                       | 1-31                                        | `1` (1-го числа месяца) |
| Ежемесячная статистика по времени | Формат HH:MM                                | `09:00`                 |

## Примеры

### Заряд батареи полный (100%)

```
11:45 - 🔋 *Battery FULL* (100%)

⚡ Current Production: 5356 W
🏠 Current Consumption: 1200 W
☀️ Production Today: 12.5 kWh
🔌 Feed-in Today: 8.2 kWh
🌤️ Tomorrow: ☀️ Sunny

🚗 Now ideal for: Electric car, washing machine, dishwasher!
```

### Промежуточный (60%)

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

Адаптер создает следующие состояния в рамках`pv-notifications.0` :

### Текущая статистика

| Состояние                     | Тип   | Описание                                     |
| ----------------------------- | ----- | -------------------------------------------- |
| `statistics.fullCyclesToday`  | число | Полные циклы сегодня                         |
| `statistics.emptyCyclesToday` | число | Сегодня пустые циклы                         |
| `statistics.maxSOCToday`      | число | Максимальный уровень SOC сегодня             |
| `statistics.minSOCToday`      | число | Министерство социального обеспечения сегодня |
| `statistics.fullCyclesWeek`   | число | Полные циклы на этой неделе                  |
| `statistics.emptyCyclesWeek`  | число | На этой неделе пустые циклы                  |
| `statistics.currentSOC`       | число | Текущий уровень заряда батареи (SOC)         |
| `statistics.currentEnergyKWh` | число | Текущая энергия в кВт·ч                      |

### Сохраненные данные за прошлый месяц (для ежемесячной статистики)

| Состояние                         | Тип   | Описание                                              |
| --------------------------------- | ----- | ----------------------------------------------------- |
| `statistics.lastMonthProduction`  | число | Производство за прошлый месяц (кВтч)                  |
| `statistics.lastMonthConsumption` | число | Потребление за прошлый месяц (кВтч)                   |
| `statistics.lastMonthFeedIn`      | число | Подача электроэнергии в сеть в прошлом месяце (кВт·ч) |
| `statistics.lastMonthGridPower`   | число | Объем электроэнергии из сети за прошлый месяц (кВт·ч) |
| `statistics.lastMonthFullCycles`  | число | Полные циклы в прошлом месяце                         |
| `statistics.lastMonthEmptyCycles` | число | Пустые циклы в прошлом месяце                         |

### Сохраненные данные за прошлую неделю (для еженедельной статистики)

| Состояние                        | Тип   | Описание                                                 |
| -------------------------------- | ----- | -------------------------------------------------------- |
| `statistics.lastWeekProduction`  | число | Производство за прошлую неделю (кВтч)                    |
| `statistics.lastWeekConsumption` | число | Потребление за прошлую неделю (кВтч)                     |
| `statistics.lastWeekFeedIn`      | число | Подача электроэнергии в сеть за последнюю неделю (кВт·ч) |
| `statistics.lastWeekGridPower`   | число | Электроэнергия из сети за прошлую неделю (кВт·ч)         |
| `statistics.lastWeekFullCycles`  | число | Полные циклы на прошлой неделе                           |
| `statistics.lastWeekEmptyCycles` | число | Пустые циклы на прошлой неделе                           |

## Примечание к ежемесячной и еженедельной статистике.

**Важно:** адаптер автоматически сохраняет данные за прошлый месяц и прошлую неделю в США.

### Ежемесячная статистика

- Ежемесячная статистика отправляется в **указанный день** (по умолчанию: 1-го числа месяца).
- Адаптер **автоматически сохраняет** текущие ежемесячные данные перед сбросом статистики.
- В статистике используются **сохраненные данные** из`statistics.lastMonth*` штаты
- **Настройка:** Убедитесь, что ежемесячная статистика отправляется **после последнего дня месяца** (например, 1-го числа в 09:00).

### Еженедельная статистика

- Еженедельная статистика отправляется в **указанный день недели** (по умолчанию: понедельник).
- Адаптер **автоматически сохраняет** данные за текущую неделю перед сбросом статистики.
- В статистике используются **сохраненные данные** из`statistics.lastWeek*` штаты
- **Настройка:** Установить день недели (0=пн, 1=вт, ..., 6=вс)

## Пример конфигурации (openweathermap)

### Настройка точек данных о погоде

Если вы используете адаптер **openweathermap** , настройте следующие поля:

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

### Пример вывода с данными о погоде.

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

## Ночной режим и тихий режим

### Ночной режим (настраиваемый)

В период с **23:00 до 06:00** (настраивается) следующие уведомления отключаются:

- ❌ Батарея полностью заряжена (100%)
- ❌ Средний уровень (20%, 40%, 60%, 80%)

**Всегда** отправляется следующее уведомление:

- ✅ Батарея разряжена (0%) – если включена опция "Игнорировать ночной режим при 0% заряда батареи".

### Тихий режим (настраиваемый)

В период с **12:00 до 15:00** (настраивается) **все** уведомления отключаются:

- ❌ Батарея полностью заряжена (100%)
- ❌ Батарея разряжена (0%)
- ❌ Средний уровень (20%, 40%, 60%, 80%)

**Примечание:** Тихий режим отключает все уведомления, включая уведомления о 0% заряда батареи. Используйте его в тех случаях, когда вы не хотите, чтобы вас беспокоили (например, во время сна, на совещаниях).

## Автор

Alex1808 через LLM: Qwen

<sadam6752@gmail.com>

## Документация на других языках

- [🇬🇧 Английский](/#/adapters/pv-notifications)
- [🇩🇪 Deutsch](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/doc/de/README.md)
- [🇷🇺 Русский](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/doc/ru/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.29
* (FIX) Corrupted UTF-8 separator lines in the monthly stats message (showed as question marks in Telegram)
* (FIX) Corrupted Russian translations for "Current charge level" and "Own consumption"
* (FIX) Weather today in daily stats now shows the temperature as "(currently: X°C)" instead of implying a daily value

### 1.2.28
* (FIX) Migrate i18n to short format ({lang}.json); trim news to 7 entries

### 1.2.27
* (FIX) CI: update package-lock.json to include all eslint peer dependencies

### 1.2.26 (2026-08-01)
* (FIX) W5604: add missing i18n keys for sunset stats in 8 languages (es, fr, it, nl, pl, pt, uk, zh-cn)
* (FIX) W6019: move old changelog entries to CHANGELOG_OLD.md
* (FIX) W6021: move License section to end of README
* (FIX) W6030: add 1.2.25 changelog entry to README

### 1.2.25 (2026-08-01)
* (FIX) Update @iobroker/adapter-core to 3.4.3
* (FIX) Remove old news entry 1.2.18 (max 7 entries allowed)

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

> For older changelog entries see [CHANGELOG_OLD.md](https://github.com/sadam6752-tech/ioBroker.pv-notifications/blob/main/CHANGELOG_OLD.md)

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