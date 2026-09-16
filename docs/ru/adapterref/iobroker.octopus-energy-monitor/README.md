---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: 3nlMLFe30ktazIo/uo67+AvxMV4TLGxv7F9O03yH50s=
---
![Логотип](../../../en/adapterref/iobroker.octopus-energy-monitor/admin/octopus-energy-monitor.svg?v=3)

![Версия NPM](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)
![Количество установок](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)
![Тестирование и выпуск](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

# ioBroker.octopus-energy-monitor

## ioBroker.octopus-energy-monitor

Адаптер **Octopus Energy Monitor** периодически получает ежедневные данные о потреблении электроэнергии от **[Octopus Energy](https://octopus.energy) (API Kraken)** и **[Inexogy](https://www.inexogy.com) (API Discovergy/Statistics)** , автоматически сохраняя их в дереве объектов ioBroker.

Его основная задача — выявление расхождений в выставлении счетов/измерениях между вашим интеллектуальным счетчиком (Inexogy) и вашим поставщиком энергии (Octopus Energy). Каждую ночь адаптер сравнивает оба набора данных и математически отмечает ежедневные расхождения, превышающие настраиваемый пороговый уровень.

### 🌟 Особенности

- **Полная поддержка Kraken GraphQL:** аутентификация осуществляется с помощью ваших JWT-токенов Octopus, а свойства учетной записи динамически определяются для получения точных данных о потреблении.
- **Поддержка динамических тарифов и временных слотов:** автоматически определяет ваш активный тариф Octopus (например, Intelligent Octopus Go) и конкретные временные слоты для его использования. Ручная настройка часов "Go" не требуется!
- **Автоматический расчет стоимости:** автоматически рассчитывает ежедневные, ежемесячные и годовые затраты на электроэнергию в **евро (€)** на основе ваших фактических тарифов.
- **Иерархическая история:** структурирует данные в чистом виде.`history.YYYY.MM.DD` Дерево с автоматическим агрегированием потребления и затрат за месяцы и годы.
- **Расчетные показания счетчика:** вычисляет текущие показания вашего электросчетчика, сопоставляя последние официальные показания Kraken с вашим последующим ежедневным потреблением.
- **Сравнение Inexogy (Discovergy):** Использует API Inexogy для сравнения данных о потреблении с данными вашего провайдера, помогая выявлять расхождения в выставленных счетах.
- **Анализ основных данных:** обеспечивает прозрачность информации о балансе вашего счета, данных счетчика и участвующих операторах сети (MOP/DNO).
- **Интеллектуальное управление зарядкой:** динамическое получение данных об устройствах Intelligent Octopus (электромобилях/зарядных устройствах) и переключение между режимами интеллектуальной зарядки (приостановка/возобновление) непосредственно из ioBroker.
- **Inexogy Master Data & Live Reading:** Получение серийных номеров, сведений о местоположении и текущих показаний счетчика (Bezug/Einspeisung) из Inexogy.
- **Интеллектуальное кэширование:** минимизирует нагрузку на API за счет ретроактивной синхронизации только отсутствующих точек данных (по умолчанию 30 дней).
- **§14a Расчет цены EnWG:** Дополнительный расчет тарифа для устройств контролируемого потребления (Steuerbare Verbrauchseinrichtung) с настраиваемыми временными окнами (NT/HT) и автоматическим переключением на стандартный тариф (ST).
- **Настройки расчетных периодов:** система агрегирует и отслеживает потребление энергии и затраты на основе начального дня вашего расчетного периода (например, с 18-го по 17-е число).`octopus.periods` канал, разделенный на стандартные интервалы (например, Go/Standard) со статическим`current` Папка для удобной визуализации.
- **Синхронизация истории базы данных:** нативная интеграция с адаптерами InfluxDB, SQL и History для прямой передачи и заполнения исходных 15-минутных интервалов потребления без перегрузки дерева объектов ioBroker.

---

### ⚙️ Установка

Для установки этого адаптера в вашей среде ioBroker:

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку **"Адаптеры"** .
3. Найдите **"Монитор энергии осьминога"** (или`octopus-energy-monitor` ).
4. Нажмите кнопку **+** (добавить) рядом с адаптером, чтобы создать новый экземпляр.

---

### 🔧 Конфигурация

1. **Энергия Осьминога (Кракен):**
   - Введите стандартные учетные данные для входа в Octopus (адрес электронной почты и пароль).
   - Введите номер вашего счета (обычно начинается с`A-` ).
   - **День начала расчетного периода:** День месяца, с которого начинается ваш расчетный цикл (по умолчанию —`1` (для обычного календарного месяца). Если ваш цикл длится с 18-го числа одного месяца по 17-е число следующего, выберите`18` для создания папок расчетного периода в`octopus.periods.<startDate>` и статика`octopus.periods.current` псевдоним, включая метрики разделения слотов.

2. **Инексология:**
   - Введите свой адрес электронной почты и пароль от портала Inexogy. Адаптер автоматически обрабатывает базовую аутентификацию и преобразует её в запросы к API Discovergy.

3. **Общие настройки:**
   - **Порог расхождения:** определяет, сколько`kWh` Для запуска процесса необходимо наличие различий между Octopus и Inexogy.`hasDiscrepancy: true` флаг штата. По умолчанию -`0.1 kWh` .

4. **§14a Настройки EnWG (необязательно):**
   - **Включить расчет EnWG в соответствии с § 14a:** При активации рассчитывает ежедневные цены на электроэнергию с учетом сниженных тарифов на электроэнергию для устройств управляемого потребления.
   - **Дата начала действия (ГГГГ-ММ-ДД):** определяет, когда должен начаться расчет EnWG. Изменение этой даты (или платы за пользование сетью/временных интервалов) запускает автоматический ретроспективный перерасчет всех исторических данных.
   - **Плата за подключение к электросети:** Введите местные тарифы на подключение к электросети (NT, HT и ST). Используйте флажок, чтобы указать, являются ли введенные значения брутто (включая 19% НДС) или нетто.
   - **Настраиваемые временные интервалы:** укажите локальное время NT (низкий тариф) и HT (высокий тариф) в течение месяца. Время, не указанное в интервале, автоматически переключается на ST (стандартный тариф). Временные интервалы не должны перекрываться в течение одного месяца.

5. **Синхронизация базы данных истории (необязательно):**
   - **Включите синхронизацию базы данных:** выберите целевой адаптер истории ioBroker (например, InfluxDB). Адаптер автоматически зарегистрирует 15-минутные состояния и будет ретроспективно передавать необработанные данные за интервал в выбранную базу данных.

После настройки адаптер позаботится обо всем остальном! Он периодически синхронизирует данные за последние 30 дней в соответствии с настроенным интервалом обновления. Данные отображаются в разделе...`octopus-energy-monitor.0.history.YYYY.MM.DD` путь.

## Changelog
### **WORK IN PROGRESS**
* (tipp88) Fixed consumption data for previous days not updating automatically when initially retrieved with 0 kWh (Issue #31).

### 1.0.0 (2026-08-27)
* (tipp88) Fixed the three missing history database synchronization translations reported in issue #18.

### 0.7.0 (2026-07-13)
* (tipp88) Implemented native historical database synchronization to automatically push 15-minute intervals directly to InfluxDB, SQL, or History instances.
* (tipp88) Massively optimized Inexogy retroactive API polling by switching to the Discovergy `readings` endpoint, fetching 96 data points in a single request.
* (tipp88) Fixed strict ioBroker JSON schema compliance bugs in `admin/jsonConfig.json` regarding dropdown instance filtering.
* (tipp88) Fixed calculated meter reading (`octopus.info.meterReading`) state missing `kWh` unit
* (tipp88) Fixed permissions in Dependabot auto-merge workflow (`issues: write`)

### 0.6.8 (2026-07-06)
* (tipp88) Fixed `rate.name` from external API being used unsanitized in ioBroker object IDs.
* (tipp88) Fixed `setSmartChargeStatus()` sending the sanitized device ID to Octopus API instead of original ID.
* (tipp88) Optimized database interval sync by consolidating all object scans into a single pre-fetch.

### 0.6.7 (2026-07-01)
* (tipp88) Fixed missing UI translations for the `updateInterval` minimum warning.
* (tipp88) Fixed missing external object ID sanitization (ioBroker repo compliance).
* (tipp88) Enforced a 15-minute minimum for `updateInterval` to prevent excessive cloud polling.
* (tipp88) Refactored `fetchInexogy` and optimized object scanning overhead during history aggregation.
* (tipp88) Capped `syncDays` retroactive data fetching to `retentionDays` to avoid fetching data that would immediately be deleted.

### 0.6.6 (2026-06-29)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

[Older changelogs can be found there](https://github.com/tipp88/ioBroker.octopus-energy-monitor/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 tipp88

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