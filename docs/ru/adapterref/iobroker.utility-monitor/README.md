---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.utility-monitor/README.md
title: ioBroker.utility-monitor
hash: REJ2ZAflTmFNCzNuSzzawcSh94c7VvZk2riZ/aai/cg=
---
![Логотип](../../../en/adapterref/iobroker.utility-monitor/admin/utility-monitor.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.utility-monitor.svg)
![Релиз на GitHub](https://img.shields.io/github/v/release/fischi87/ioBroker.utility-monitor)
![Лицензия GitHub](https://img.shields.io/github/license/fischi87/ioBroker.utility-monitor)
![Тестирование и выпуск](https://github.com/fischi87/ioBroker.utility-monitor/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# ioBroker.utility-monitor

> 🇩🇪 **Deutsche Fassung:** [README\_de.md](README_de.md)

## Адаптер Utility Monitor для ioBroker

Контролируйте потребление газа, воды и электроэнергии с помощью автоматического расчета затрат, отслеживания авансовых платежей и подробной статистики.

### ✨ Основные характеристики

- 📊 **Мониторинг потребления** газа, воды, электроэнергии и **солнечной энергии/энергии, вырабатываемой солнечными батареями.**
- 🎯 **Поддержка нескольких счетчиков** — несколько счетчиков одного типа (например, основной счетчик + счетчик для мастерской)
- 💰 **Автоматический расчет стоимости** с указанием цены за единицу и базовой платы
- ☀️ **Фотоэлектрические системы и подача электроэнергии в сеть** — отслеживайте подачу электроэнергии в сеть и ее компенсацию.
- 💳 **Мониторинг авансовых платежей** — мгновенно отслеживайте поступление дополнительных платежей или зачислений.
- 🔄 **Гибкие датчики** — работают с уже имеющимися у вас датчиками (Shelly, Tasmota, Homematic и др.)
- ⚡ **Тарифы в часы пик и вне часов пик** - полная поддержка дневных и ночных тарифов.
- 🔄 **Специальные предложения на газ** - автоматический перевод из м³ в кВт·ч
- 🕛 **Автоматическое обнуление** — ежедневно, еженедельно, ежемесячно и ежегодно (в годовщину заключения договора)
- 🔔 **Умные уведомления** — отдельные напоминания об окончании расчетного периода (снятие показаний счетчика) и об изменении договора (проверка тарифа), каждое со своим временем подготовки.
- 📈 **Еженедельная оценка** — отслеживайте потребление еженедельно.
- 📥 **Импорт CSV-файлов** - импорт исторических показаний счетчиков методом перетаскивания.
- ⌨️ **Поддержка запятых** — административный интерфейс принимает запятые. `12,50` а также `12.50` для десятичных дробей

---

## 💝 Поддержка

Вам нравится этот адаптер? Можете смело угостить меня кофе! ☕

---

## 🚀 Быстрый старт

### 1. Установка

1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте экземпляр
3. Откройте конфигурацию

### 2. Базовая конфигурация (пример: газ)

1. ✅ **Включить мониторинг газа**
2. 🔍 **Выберите датчик** - датчик вашего газового счетчика (в м³)
3. 📝 **Показания счетчика на момент заключения договора** - например, 10250 м³ (необходимы для корректного расчета годового объема)
4. 📅 **Начало действия договора** - например, 01.01.2026 (необходимо для ежегодного пересмотра и расчета авансового платежа)
5. 🔧 **Смещение** _(опционально)_ - на случай, если индикатор вашего оборудования не начинается с нуля.
6. 🔥 **Теплотворная способность и Z-число** — берутся из вашего счета за газ (например, 11,5 и 0,95)
7. 💶 **Введите цены** :
   - Цена за единицу: 0,1835 €/кВт·ч
   - Базовая плата: 15,03 €/месяц
   - Годовая плата: 60,00 €/год (например, арендная плата за счетчик)
8. 💳 **Авансовый платеж** - ежемесячная предоплата (например, 150 €)

**Готово!** Теперь адаптер автоматически рассчитывает все расходы. 🎉

---

## ⚠️ В версии 1.4.6 произошли существенные изменения, нарушающие обратную совместимость.

**ВАЖНО:** Версия 1.4.6 вносит фундаментальные изменения в структуру состояния.

### Что изменилось?

**До (до версии 1.4.5):**

```
gas.consumption.daily
gas.costs.monthly
wasser.consumption.daily
```

**Теперь (начиная с версии 1.4.6):**

```
gas.main.consumption.daily          ← main meter named "main"
gas.main.costs.monthly
wasser.main.consumption.daily
```

### 🔧 Требуется миграция

1. **Откройте настройки** : создайте новые поля «Название основного счетчика» для газа/воды/электричества/солнечных батарей.

2. **Введите название** : по умолчанию — «главный» (рекомендуется) или ваше собственное название, например, «квартира» или «дом».

3. **Корректировка скриптов** : необходимо обновить каждое упоминание состояния.

   ```javascript
   // Old:
   getState('utility-monitor.0.gas.consumption.daily');

   // New:
   getState('utility-monitor.0.gas.main.consumption.daily');
   ```

4. **Обновите визуализации** : настройте VIS, Grafana и т.д. в соответствии с новыми путями.

### 💡 Почему произошли эти изменения?

- **Единообразие** : все счетчики (основной и дополнительные) теперь используют единую структуру.
- **Гибкость** : основной счетчик может быть назван по своему усмотрению (например, «первый этаж», «итоговая сумма»).
- **Ясность** : больше нет логики, учитывающей особые случаи, в коде.
- **Мультиметр** : улучшенная поддержка нескольких мультиметров одного типа.
- **Импорт CSV** : простой способ добавления исторических данных с помощью перетаскивания в административном интерфейсе.
- **Структурированная статистика (версия 1.6.0)** : четкое разделение потребления, затрат и временных меток.

---

## ⚠️ В версии 1.6.0 произошли существенные изменения, нарушающие обратную совместимость.

**ВАЖНО:** В версии 1.6.0 изменена структура объекта статистики.

### Что изменилось?

**До (до версии 1.5.1):**

```
gas.main.statistics.lastDay
gas.main.statistics.lastMonth
gas.main.statistics.lastDayStart
```

**Теперь (начиная с версии 1.6.0):**

```
gas.main.statistics.consumption.lastDay      ← consumption values
gas.main.statistics.cost.lastDay             ← cost values (NEW!)
gas.main.statistics.timestamps.lastDayStart   ← timestamps of the resets
```

### 🔧 Требуется миграция

1. **Настройка скриптов/визуальных файлов** : если вы обращаетесь к состояниям статистики напрямую, пути необходимо обновить.
2. **Статистика затрат** : теперь вы можете получать обзоры затрат за прошедший период (день/неделя/месяц).

---

## 📥 Импорт CSV-файлов

Вкладка «Импорт» позволяет удобно загружать исторические показания счетчиков.

### Поддерживаемые форматы

- **Типовой CSV-файл** : дата (ДД.ММ.ГГГГ), показания счетчика.
- **Приложение EhB+** : прямой импорт из приложения EhB+

### Как это работает

1. Перейдите на вкладку **«Импорт»** .
2. Выберите **тип счетчика** (газ/вода/электричество) и **тип счетчика** .
3. Перетащите CSV-файл в область загрузки.
4. Нажмите **«Импорт данных»** .

---

## 📊 Объяснение по штатам

Для каждого включенного типа коммунальных услуг (газ/вода/электроэнергия/солнечные батареи) создаются следующие папки:

**Важно:** начиная с версии 1.4.6 все пути содержат название счетчика (например, `gas.main.*` вместо `gas.*`).

### 🗂️ **потребление**

| Состояние       | Описание                                                       | Пример           |
| --------------- | -------------------------------------------------------------- | ---------------- |
| `daily`         | Потребление **за сегодня** (с 00:00)                           | 12,02 кВт·ч      |
| `dailyVolume`   | Потребление сегодня в м³                                       | 1,092 м³         |
| `weekly`        | Потребление **на этой неделе** (с понедельника)                | 84,12 кВт·ч      |
| `weeklyVolume`  | Еженедельное потребление в м³                                  | 7,65 м³          |
| `monthly`       | Потребление **в этом месяце** (с 1-го числа)                   | 117,77 кВт·ч     |
| `monthlyVolume` | Ежемесячное потребление в м³                                   | 10,69 м³         |
| `yearly`        | Потребление **с момента заключения договора** (расчетный год)  | 730,01 кВт·ч     |
| `yearlyVolume`  | Годовое потребление в м³                                       | 66,82 м³         |
| `dailyHT`       | Суточное потребление по **пиковому тарифу** (HT)               | 8,40 кВт·ч       |
| `dailyNT`       | Ежедневное потребление по **тарифу вне пиковой нагрузки** (NT) | 3,62 кВт·ч       |
| `weeklyHT`      | Еженедельное потребление по пиковому тарифу                    | 58,15 кВт·ч      |
| `weeklyNT`      | Еженедельное потребление по тарифу вне пиковой нагрузки        | 25,62 кВт·ч      |
| `monthlyHT`     | Ежемесячное потребление по пиковому тарифу                     | 82,15 кВт·ч      |
| `monthlyNT`     | Ежемесячное потребление по тарифу вне пиковой нагрузки         | 35,62 кВт·ч      |
| `yearlyHT`      | Годовое потребление при пиковом тарифе                         | 511,00 кВт·ч     |
| `yearlyNT`      | Годовое потребление по тарифу вне пиковой нагрузки             | 219,01 кВт·ч     |
| `lastUpdate`    | Последнее обновление                                           | 06.01.2026 14:11 |

**💡 Совет:** `yearly` рассчитывается автоматически как `(current meter reading - offset) - initial reading`.

**📅 Важно:** Ежегодный пересмотр тарифов происходит в **день начала действия контракта** (например, 12 мая), а НЕ 1 января.

---

### 💰 **затраты**

| Состояние     | Что это такое?                                                        | Расчет                                            | Пример                                   |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `daily`       | **Сегодняшние** расходы                                               | суточная цена × цена за единицу                   | 2.27 €                                   |
| `monthly`     | Расходы **в этом месяце**                                             | месячная цена × цена за единицу                   | 21.61 €                                  |
| `yearly`      | **Потребительские расходы** с момента начала действия контракта       | годовая × цена за единицу                         | 137.61 €                                 |
| `totalYearly` | **Совокупные затраты за год** (потребление + все постоянные затраты)  | годовая стоимость + базовая плата + годовая плата | 212.64 €                                 |
| `basicCharge` | **Накопленная базовая плата**                                         | базовая плата × месяцы                            | 15.03 €                                  |
| `annualFee`   | **Годовая плата** (фиксированная сумма в год)                         | годовая плата (из конфигурации)                   | 60.00 €                                  |
| `paidTotal`   | **Оплата** производится авансом.                                      | авансовый платеж × месяцев                        | 150.00 €                                 |
| `balance`     | **🎯 Главная ценность!**<br> Дополнительный платеж (+) или кредит (-) | totalYearly - paidTotal                           | **+62,64 €**<br> → дополнительная оплата |

#### 🔍 **Баланс** в деталях

- **Положительный результат (+50 €)** → ❌ **Дополнительная оплата** : вам придется оплатить в конце года
- **Отрицательный баланс (-24 €)** → ✅ **Возврат средств** : вы получите деньги обратно
- **Ноль (0 €)** → ⚖️ **Сбалансировано** : потребление = авансовый платеж

**Пример:**

```
Consumption costs:  137.61 € (yearly)
Base fee:          + 15.03 € (basicCharge - 1 month × 15.03 €)
Annual fee:        + 60.00 € (annualFee - fixed value)
────────────────────────────
Total costs:        212.64 € (totalYearly)

Paid (advance):     150.00 € (paidTotal - 1 month × 150 €)
────────────────────────────
Balance:            +62.64 € → additional payment
```

---

### ℹ️ **информация**

| Состояние            | Описание                                  | Пример           |
| -------------------- | ----------------------------------------- | ---------------- |
| `currentPrice`       | Текущая цена за единицу                   | 0,1885 €/кВт·ч   |
| `meterReading`       | Показания счетчика в кВт·ч                | 112711,26 кВт·ч  |
| `meterReadingVolume` | Показания счетчика в м³ (только для газа) | 10305,03 м³      |
| `monthlyInstallment` | Настроен ежемесячный авансовый платеж     | 150 €            |
| `lastSync`           | Последнее обновление датчика              | 06.01.2026 14:11 |
| `sensorActive`       | Датчик подключен?                         | ✅ правда         |

---

### 📈 **статистика**

Начиная с версии 1.6.1, статистика разделена на три подканала.

#### 📊 **потребление** (история потребления)

| Состояние        | Описание                          |
| ---------------- | --------------------------------- |
| `lastDay`        | Потребление **вчера**             |
| `lastWeek`       | Потребление **на прошлой неделе** |
| `lastMonth`      | Потребление **в прошлом месяце**  |
| `lastYear`       | Потребление **в прошлом году**    |
| `averageDaily`   | Среднесуточное потребление        |
| `averageMonthly` | Среднемесячное потребление        |

#### 💰 **Стоимость** (история затрат)

| Состояние        | Описание                      |
| ---------------- | ----------------------------- |
| `lastDay`        | Расходы **вчера**             |
| `lastWeek`       | Расходы **на прошлой неделе** |
| `lastMonth`      | Расходы **за прошлый месяц**  |
| `lastYear`       | Расходы **в прошлом году**    |
| `averageDaily`   | Средние суточные расходы      |
| `averageMonthly` | Средние ежемесячные расходы   |

#### 📅 **метки времени** (сбросить метки времени)

| Состояние        | Описание                                               |
| ---------------- | ------------------------------------------------------ |
| `lastDayStart`   | Последнее ежедневное обновление (23:59)                |
| `lastWeekStart`  | Последнее еженедельное обновление (воскресенье, 23:59) |
| `lastMonthStart` | Последний ежемесячный сброс (последний день месяца)    |
| `lastYearStart`  | Начало действия контракта / начало года                |

---

### 📅 **выставление счетов**

| Состояние           | Описание                                                       | Пример      |
| ------------------- | -------------------------------------------------------------- | ----------- |
| `endReading`        | Окончательные показания счетчика (ввод вручную)                | 10316,82 м³ |
| `closePeriod`       | Закрыть период сейчас (кнопка)                                 | истина/ложь |
| `periodEnd`         | Расчетный период заканчивается в                               | 01.01.2027  |
| `daysRemaining`     | Дней до конца расчетного периода                               | 359 дней    |
| `newInitialReading` | Новое начальное значение (скопируйте его в файл конфигурации!) | 10316,82 м³ |

**💡 План работы на конец года:**

1. Считайте показания физического счетчика (например, 10316,82 м³)
2. Введите значение в `endReading`
3. Набор `closePeriod` к `true`
4. ✅ Адаптер автоматически архивирует все данные в указанном месте. `history.{YEAR}.*`
5. ⚠️ **Важно:** обновите конфигурацию, используя новые данные. `initialReading` (видеть `newInitialReading`)

---

### 📊 **История** (история за год)

| Состояние                   | Описание                                           | Пример       |
| --------------------------- | -------------------------------------------------- | ------------ |
| `history.2024.yearly`       | Годовое потребление в 2024 году                    | 730,01 кВт·ч |
| `history.2024.yearlyVolume` | Годовое потребление в 2024 году в м³ (газ/вода)    | 66,82 м³     |
| `history.2024.totalYearly`  | Общие затраты 2024 года                            | 162.64 €     |
| `history.2024.balance`      | Остаток на 2024 год (дополнительный платеж/кредит) | +12.64 €     |

**💡 Автоматическое архивирование:**

- Создается при закрытии расчетного периода.
- Содержит все соответствующие годовые сводки, включая данные за пиковый и непиковый периоды.
- Позволяет проводить сравнения показателей за разные годы.

---

### 🔧 **Регулировка** (ручная коррекция)

Устраните дрейф датчика с помощью ручной регулировки.

| Состояние | Описание                                              | Пример       |
| --------- | ----------------------------------------------------- | ------------ |
| `value`   | Поправочное значение (разница с показаниями счетчика) | +4,2 м³      |
| `note`    | Примечание/причина корректировки (необязательно)      | «Отключение» |
| `applied` | Отметка времени последнего приложения                 | 17035...     |

**💡 Рабочий процесс:**

1. Считайте показания физического счетчика: **10350 м³**
2. На адаптере указано: **10346 м³**
3. Введите разницу в `adjustment.value`: **+4**
4. ✅ Все расчеты корректируются автоматически.
5. **Благодаря интеграции пикового и непикового** тарифов корректировки автоматически применяются к пиковому тарифу (HT) при использовании двух тарифов.

---

## ⚙️ Специальные функции

### ⚡ Газ: м³ → кВт·ч (преобразование)

Потребление газа **измеряется в м³** , но **оплачивается в кВт·ч** .

**Формула:** `kWh = m³ × calorific value × Z number`

💡 **Совет:** Теплотворную способность и Z-число указаны в вашем счете за газ.

### 🔄 Автоматический сброс

Адаптер автоматически сбрасывает счетчики:

| Момент времени          | Что происходит | Пример                          |
| ----------------------- | -------------- | ------------------------------- |
| **23:59** каждый день   | `daily` → 0    | Начинается новый день           |
| **Воскресенье, 23:59**  | `weekly` → 0   | Начинается новая неделя         |
| **Конец месяца 23:59**  | `monthly` → 0  | Начинается новый месяц          |
| **годовщина контракта** | `yearly` → 0   | Начинается новый расчетный год. |

---

## Changelog

### 1.7.2 (2026-08-30)

- **FIX:** 🐛 **CSV import did nothing on Admin 8 (no backend call)** - the `sendTo` button used `useNative`, which delivered an empty message, so `handleImportCSV` returned before doing anything (no log, just a delayed "OK"). The button now sends the utility type and meter name via `jsonData`, and the CSV content is read from the saved config (`importCsvContent`) - avoiding multi-line escaping issues. Flow: paste CSV → **Save** → **Start import**; a success/error message is now shown.

### 1.7.1 (2026-08-30)

- **FIX:** 🐛 **CSV import button did nothing on Admin 8** - the import panel used invalid jsonConfig properties (`showProcessMessage`, `minRows`), which made the whole import tab schema-invalid, so clicking "Start import" had no effect and produced no log output. Removed the invalid properties so the import works again.

### 1.7.0 (2026-08-29)

- **FIX:** 🧩 **CSV import works on Admin 8 again (#48, #10)** - the import used a custom Module-Federation UI component that targeted "GUI API generation 1", which Admin 8 (generation 2) refuses to load. It has been replaced with **native jsonConfig controls** (utility type, meter name, CSV text field, import button), so the import works on **Admin 7 and Admin 8** without any custom component. Paste the CSV, press **Save**, then **Start import**.
- **CHORE:** 🧹 **Removed the obsolete custom frontend** (`admin/src-admin`, `admin/custom`) and the related Dependabot config for it. The CSV backend (`importManager`) is unchanged.

### 1.6.8 (2026-08-19)

- **FIX:** 🌐 **Language-aware user messages** - all user-facing text (test message, billing/contract reminders, the monthly report and the config popups) is now localized. **English is the default**, German is used automatically when the ioBroker system language is German. This follows the repository requirement that user output must be English or multilingual with English as default.

### 1.6.7 (2026-08-14)

- **FIX:** 🌐 **Multilingual object names** - object and state names are now provided as `{ en, de }` objects, so German users keep the German labels while the repository checker and other locales get an English name.
- **FIX:** 🇬🇧 **English log messages** - all log and error messages are now in English, as required for adapters in the ioBroker repository. User notifications (Telegram etc.) stay in German.
- **FIX:** 🔘 ** `billing.closePeriod` button** - the button state now uses `read: false` as required for the `button` role. Existing installations are migrated automatically on startup.
- **CHORE:** 🧹 **Cleanup** - removed a redundant `*.adjustment.note` subscription that was never handled, removed the dead legacy `closeBillingPeriod` code path (which still used the non-catalogue `value.money` role), removed the unused `createUtilityStateStructure` and an orphaned translation key.

### 1.6.6 (2026-08-07)

- **FIX:** 🛠️ **Object structure corrected** - the states now pass the ioBroker object checker: the utility-type level (gas/water/electricity/pv) is created as its own object, the monetary states use the accepted role `value` instead of the non-catalogue roles `value.money`/`value.price`, and writable inputs (`billing.endReading`, `adjustment.value`) use the writable role `level`. Existing installations are migrated automatically on startup.
- **FIX:** 🛠️ **Timers are now registered with the adapter** - `setInterval` and `setTimeout` bypassed the adapter's timer management and were not cleaned up by the js-controller on unload. They now use `this.setInterval()` and `adapter.setTimeout()`.
- **DOCS:** 🌐 **English documentation** - the README is now in English, the German version moved to `README_de.md`. All configuration texts are available in English.
- **CHORE:** ⬆️ **Node 22 as the minimum version** - `engines.node` raised from `>= 20` to `>= 22`, matching the current js-controller.
- **CHORE:** 🔧 **CI and Dependabot** - applied the workflow requirements of the ioBroker checker (node versions, job dependencies, automerge action, cooldown for dependency updates).
- **CHORE:** 🧹 **Removed the unused `debounce` helper.**

### 1.6.5 (2026-08-06)

- **BREAKING:** ⚠️ ** `info.monthlyInstallment` is now a number (#11)** - the advance payment used to be stored as formatted text (`"25.00 €"`), which made it unusable for history, charts and scripts. It is now a numeric state with the unit `€`. Existing installations are converted automatically on startup. **Scripts that parsed the text have to be adjusted.**
- **FIX:** 🛠️ **Info page** - the link to the GitHub repository still pointed at the former name `ioBroker.nebenkosten-monitor` and was dead.
- **FIX:** 🛠️ **Description of `daysRemaining` ** - the state was described as "days until the end of the contract" although it counts down to the end of the billing period. That wording had caused misunderstandings.
- **DOCS:** 🧹 **Info page cleaned up** - removed the hard-coded version number (admin shows it anyway) and the outdated "NEW in 1.4.6" markers.
- **CHORE:** ⬆️ **Release tooling updated** - `@alcalzone/release-script` and its plugins raised to 5.x.

### 1.6.4 (2026-08-04)

- **FIX:** 🛠️ **Wrong billing period (#9)** - `daysRemaining` and `periodEnd` were only calculated when the adapter started and stayed frozen afterwards. The countdown is now refreshed continuously and rolls over into the new period at the contract anniversary.
- **FIX:** 🛠️ **Day-accurate calculation** - the remaining period no longer varies with the time of day or the daylight saving change.
- **FIX:** 🛠️ **Leap years** - a contract starting on 29 February no longer slips into March in non-leap years.
- **FIX:** 🛠️ **Monthly report was sent twice** - the marker check worked in UTC instead of local time, so the report arrived once at 00:00 and again at 02:00 (summer time). Only one report per day is sent now.
- **FIX:** 🛠️ **Formatting of the monthly report** - a literal `\n` appeared in the text instead of a line break.

### 1.6.3 (2026-02-04)

- **FIX:** 🛠️ **Daily and monthly start value reset to 0**

### 1.6.2 (2026-01-28)

- **FIX:** 🛠️ **Monthly reset logic for the last day of the month**

### 1.6.1 (2026-01-28)

- **NEW:** 📊 **Extended yearly statistics** - introduced `lastYear` states in the statistics:
    - `statistics.consumption.lastYear`: total consumption of the previous year
    - `statistics.cost.lastYear`: total costs of the previous year
    - support for peak/off-peak and gas volume in the previous-year view
- **NEW:** 🔄 **Automatic archiving** - previous-year values are written to the statistics automatically during the yearly reset
- **FIX:** 🛠️ **Syntax & units** - corrected inconsistent units (water/m³ in particular) and linter errors
- **DOCS:** 🌐 **Translations** - news entries translated into all supported languages

### 1.6.0 (2026-01-28)

- **NEW:** 📊 **Structured statistics** - introduced sub-channels for a better overview:
    - `statistics.consumption`: all historical consumption values
    - `statistics.cost`: all historical cost values (day/week/month)
    - `statistics.timestamps`: all reset timestamps in one place
- **NEW:** 💰 **Cost statistics** - track your costs for yesterday, last week and last month as well
- **REFACTORING:** 🏗️ **Modular state management**:
    - `stateManager.js` was split into dedicated modules (`lib/state/`)
    - improved maintainability and testability
- **CLEANUP:** 🧹 **Housekeeping** - outdated statistics states are removed automatically on the first start

Older versions can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 fischi87 <axel.fischer@hotmail.com>

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