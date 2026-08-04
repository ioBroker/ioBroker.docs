---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: +aJKE9pPuMhjqjVldd28gNg+XCFGxx5L6Uun+iIIH6w=
---
![Логотип](../../../en/adapterref/iobroker.octopus-energy-monitor/admin/octopus-energy-monitor.svg?v=3)

![Версия NPM](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)
![Количество установок](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)

# IoBroker.octopus-energy-monitor
**Тесты:** ![Тестирование и выпуск](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

## IoBroker.octopus-energy-monitor
Адаптер **Octopus Energy Monitor** периодически получает ежедневные данные о потреблении электроэнергии из **[Octopus Energy](https://octopus.energy) (Kraken API)** и **[Inexogy]](https://www.inexogy.com) (Discovergy/Statistics API)** и автоматически сохраняет их в дереве объектов ioBroker.

Его основная задача — выявление расхождений в выставлении счетов/измерениях между вашим интеллектуальным счетчиком (Inexogy) и вашим поставщиком энергии (Octopus Energy). Каждую ночь адаптер сравнивает оба набора данных и отмечает ежедневные расхождения, превышающие заданный математический порог.

### 🌟 Особенности
* **Полная поддержка Kraken GraphQL:** Аутентификация осуществляется с помощью ваших JWT-токенов Octopus, и динамически определяются свойства учетной записи для получения точных данных о потреблении.
* **Поддержка динамических тарифов и слотов:** Автоматически определяет ваш активный тариф Octopus (например, Intelligent Octopus Go) и конкретные временные интервалы его использования. Ручная настройка часов "Go" не требуется!
* **Автоматический расчет стоимости:** Автоматически рассчитывает ежедневные, ежемесячные и годовые затраты на электроэнергию в **евро (€)** на основе ваших фактических тарифов.
* **Иерархическая история:** Структурирует данные в виде аккуратного дерева `history.YYYY.MM.DD` с автоматическим агрегированием потребления и затрат за месяцы и годы.
* **Расчетные показания счетчика:** Рассчитывает текущие показания вашего электросчетчика, объединяя последние официальные показания Kraken с вашим последующим ежедневным потреблением.
* **Сравнение Inexogy (Discovergy):** Использует API Inexogy для сравнения данных о потреблении с данными вашего поставщика, помогая выявлять расхождения в выставлении счетов.
* **Информация о состоянии основных данных:** Обеспечивает прозрачность информации о балансе вашего счета, данных счетчика и участвующих операторах сети (MOP/DNO).
* **Управление интеллектуальной зарядкой:** Динамическое получение данных об устройствах Intelligent Octopus (электромобилях/зарядных устройствах) и переключение между режимами интеллектуальной зарядки (приостановка/возобновление) непосредственно из ioBroker.
* **Основные данные Inexogy и показания в реальном времени:** Получение серийных номеров, сведений о местоположении и текущих показаний счетчика (Bezug/Einspeisung) из Inexogy.
* **Интеллектуальное кэширование:** Минимизирует нагрузку на API за счет ретроактивной синхронизации только отсутствующих точек данных (по умолчанию 30 дней).
* **§14a Расчет цены EnWG:** Дополнительный расчет тарифа для устройств с регулируемым потреблением (Steuerbare Verbrauchseinrichtung) с настраиваемыми временными окнами (NT/HT) и автоматическим переключением на стандартный тариф (ST).
* **Пользовательские расчетные периоды:** Система агрегирует и отслеживает потребление энергии и затраты на основе дня начала вашего пользовательского расчетного периода (например, с 18-го по 17-е число) в канале `octopus.periods`, с разбивкой по стандартным тарифным интервалам (например, Go/Standard) и статической папкой `current` для удобной визуализации.
* **Синхронизация истории базы данных:** Встроенная интеграция с адаптерами InfluxDB, SQL и History для прямой передачи и заполнения исходных 15-минутных интервалов потребления без перегрузки дерева объектов ioBroker.

---

### ⚙️ Установка
Для установки этого адаптера в вашей среде ioBroker:

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку «Адаптеры».
3. Найдите в поиске **"Octopus Energy Monitor"** (или `octopus-energy-monitor").
4. Нажмите кнопку **+** (добавить) рядом с адаптером, чтобы создать новый экземпляр.

---

### 🔧 Конфигурация
1. **Энергия Осьминога (Кракен):**
— Введите стандартные учетные данные для входа в Octopus (адрес электронной почты и пароль).
— Введите номер своего счета (обычно начинается с «А-»).
- **День начала расчетного периода:** День месяца, с которого начинается ваш расчетный цикл (по умолчанию — `1` для обычного календарного месяца). Если ваш цикл длится с 18-го числа одного месяца по 17-е число следующего, выберите `18`, чтобы создать папки расчетных периодов в `octopus.periods.<startDate>` и статический псевдоним `octopus.periods.current`, включая метрики разделения слотов.

2. **Инексология:**
— Введите свой адрес электронной почты и пароль от портала Inexogy. Адаптер автоматически обрабатывает базовую аутентификацию и преобразует её в запросы к API Discovergy.

3. **Общие настройки:**
- **Порог расхождения:** Определяет, какое количество кВт·ч должно быть разницей между Octopus и Inexogy, чтобы активировался флаг состояния `hasDiscrepancy: true`. Значение по умолчанию — `0,1 кВт·ч`.

4. **§14a Настройки EnWG (необязательно):**
- **Включить расчет EnWG в соответствии с § 14a:** Если активировано, рассчитывает ежедневные цены на электроэнергию с учетом сниженных тарифов на электроэнергию для устройств управляемого потребления.
- **Дата начала действия (ГГГГ-ММ-ДД):** Определяет, когда должен начаться расчет EnWG. Изменение этой даты (или платы за пользование сетью/временных интервалов) запускает автоматический ретроспективный перерасчет всех исторических данных.
- **Плата за подключение к сети:** Введите местные тарифы на подключение к сети (NT, HT и ST). Используйте флажок, чтобы указать, являются ли введенные значения брутто (включая 19% НДС) или нетто.
- **Настраиваемые временные интервалы:** Укажите локальное время NT (низкий тариф) и HT (высокий тариф) в месяц. Время, не указанное в интервале, автоматически переключается на ST (стандартный тариф). Временные интервалы не должны перекрываться в течение одного месяца.
6. **Синхронизация базы данных истории (необязательно):**
- **Включить синхронизацию базы данных:** Выберите целевой адаптер истории ioBroker (например, InfluxDB). Адаптер автоматически зарегистрирует 15-минутные состояния и будет ретроспективно передавать необработанные данные за интервал в выбранную базу данных.

После настройки адаптер позаботится обо всем остальном! Он периодически синхронизирует данные за последние 30 дней в соответствии с настроенным интервалом обновления. Данные отображаются по пути `octopus-energy-monitor.0.history.YYYY.MM.DD`.

## Changelog
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

### 0.6.5 (2026-06-29)
* (tipp88) Fixed ioBroker repository PR compliance issues (added API timeouts, refactored timer logic, removed dead config, implemented data retention, and updated translation keys).
* (tipp88) Upgraded `@iobroker/types` devDependency to 7.2.2.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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