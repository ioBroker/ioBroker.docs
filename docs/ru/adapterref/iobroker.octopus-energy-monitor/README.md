---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: HvqHQo9IAX7EIYOne5MAJpzfZbWG/wE2SZzV3/UCgyQ=
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

Его основная задача — выявление расхождений в выставлении счетов/измерениях между вашим интеллектуальным счетчиком (Inexogy) и вашим поставщиком энергии (Octopus Energy). Каждую ночь адаптер сравнивает оба набора данных и отмечает ежедневные расхождения, превышающие заданный математический порог.

### 🌟 Особенности

- **Полная поддержка Kraken GraphQL:** аутентификация осуществляется с помощью ваших JWT-токенов Octopus, а свойства учетной записи динамически определяются для получения точных данных о потреблении.
- **Поддержка динамических тарифов и временных слотов:** автоматически определяет ваш активный тариф Octopus (например, Intelligent Octopus Go) и конкретные временные слоты для его использования. Ручная настройка часов "Go" не требуется!
- **Автоматический расчет стоимости:** автоматически рассчитывает ежедневные, ежемесячные и годовые затраты на электроэнергию в **евро (€)** на основе ваших фактических тарифов.
- **Иерархическая история:** структурирует данные в чистом виде. `history.YYYY.MM.DD` Дерево с автоматическим агрегированием потребления и затрат за месяцы и годы.
- **Расчетные показания счетчика:** вычисляет текущие показания вашего электросчетчика, сопоставляя последние официальные показания Kraken с вашим последующим ежедневным потреблением.
- **Сравнение Inexogy (Discovergy):** Использует API Inexogy для сравнения данных о потреблении с данными вашего провайдера, помогая выявлять расхождения в выставленных счетах.
- **Анализ основных данных:** обеспечивает прозрачность информации о балансе вашего счета, данных счетчика и участвующих операторах сети (MOP/DNO).
- **Интеллектуальное управление зарядкой:** динамическое получение данных об устройствах Intelligent Octopus (электромобилях/зарядных устройствах) и переключение между режимами интеллектуальной зарядки (приостановка/возобновление) непосредственно из ioBroker.
- **Inexogy Master Data & Live Reading:** Получение серийных номеров, сведений о местоположении и текущих показаний счетчика (Bezug/Einspeisung) из Inexogy.
- **Интеллектуальное кэширование:** минимизирует нагрузку на API за счет ретроактивной синхронизации только отсутствующих точек данных (по умолчанию 30 дней).
- **§14a Расчет цены EnWG:** Дополнительный расчет тарифа для устройств контролируемого потребления (Steuerbare Verbrauchseinrichtung) с настраиваемыми временными окнами (NT/HT) и автоматическим переключением на стандартный тариф (ST).
- **Настройки расчетных периодов:** система агрегирует и отслеживает потребление энергии и затраты на основе начальной даты выбранного вами расчетного периода (например, с 18-го по 17-е число). `octopus.periods` канал, разделенный на стандартные интервалы (например, Go/Standard) со статическим `current` Папка для удобной визуализации.
- **Синхронизация истории базы данных:** нативная интеграция с адаптерами InfluxDB, SQL и History для прямой передачи и заполнения исходных 15-минутных интервалов потребления без перегрузки дерева объектов ioBroker.

---

### ⚙️ Установка

Для установки этого адаптера в вашей среде ioBroker:

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку **"Адаптеры"** .
3. Найдите **"Монитор энергии осьминога"** (или `octopus-energy-monitor`).
4. Нажмите кнопку **+** (добавить) рядом с адаптером, чтобы создать новый экземпляр.

---

### 🔧 Конфигурация

1. **Энергия Осьминога (Кракен):**
   - Введите стандартные учетные данные для входа в Octopus (адрес электронной почты и пароль).
   - Введите номер вашего счета (обычно начинается с `A-`).
   - **День начала расчетного периода:** День месяца, с которого начинается ваш расчетный цикл (по умолчанию —`1` (для обычного календарного месяца). Если ваш цикл длится с 18-го числа одного месяца по 17-е число следующего, выберите `18` для создания папок расчетного периода в `octopus.periods.<startDate>` и статика `octopus.periods.current` псевдоним, включая метрики разделения слотов.

2. **Инексология:**
   - Введите свой адрес электронной почты и пароль от портала Inexogy. Адаптер автоматически обрабатывает базовую аутентификацию и преобразует её в запросы к API Discovergy.

3. **Общие настройки:**
   - **Порог расхождения:** определяет, сколько `kWh` Для запуска процесса необходимо наличие различий между Octopus и Inexogy. `hasDiscrepancy: true` флаг штата. По умолчанию -`0.1 kWh`.

4. **§14a Настройки EnWG (необязательно):**
   - **Включить расчет EnWG в соответствии с § 14a:** При активации рассчитывает ежедневные цены на электроэнергию с учетом сниженных тарифов на электроэнергию для устройств управляемого потребления.
   - **Дата начала действия (ГГГГ-ММ-ДД):** определяет, когда должен начаться расчет EnWG. Изменение этой даты (или платы за пользование сетью/временных интервалов) запускает автоматический ретроспективный перерасчет всех исторических данных.
   - **Плата за подключение к электросети:** Введите местные тарифы на подключение к электросети (NT, HT и ST). Используйте флажок, чтобы указать, являются ли введенные значения брутто (включая 19% НДС) или нетто.
   - **Настраиваемые временные интервалы:** укажите локальное время NT (низкий тариф) и HT (высокий тариф) в течение месяца. Время, не указанное в интервале, автоматически переключается на ST (стандартный тариф). Временные интервалы не должны перекрываться в течение одного месяца.

5. **Синхронизация базы данных истории (необязательно):**
   - **Включите синхронизацию базы данных:** выберите целевой адаптер истории ioBroker (например, InfluxDB). Адаптер автоматически зарегистрирует 15-минутные состояния и будет ретроспективно передавать необработанные данные за интервал в выбранную базу данных.

После настройки адаптер позаботится обо всем остальном! Он периодически синхронизирует данные за последние 30 дней в соответствии с настроенным интервалом обновления. Данные отображаются в разделе... `octopus-energy-monitor.0.history.YYYY.MM.DD` путь.

### Исторические цены

Для новых дней используются согласованные и датированные валовые цены, применимые к каждому интервалу. Отсутствие или неоднозначность цен не исключает потребление: затраты становятся `null`, с `totalCostAvailable=false` и ежедневно `costStatus=missing_historical_price` Динамические тарифы, определяемые на основе прогнозов или названий продуктов, остаются без указания цены до тех пор, пока не будут подтверждены фактические цены за исторический период; прогнозы и текущие цены не используются в качестве замены.

Сумма ежемесячных абонентских платежей рассчитывается пропорционально количеству календарных дней с учетом продолжительности каждого месяца и соответствующего периода действия договора/цены. `totalCostWithStandingChargeAvailable` Указывает, доступна ли указанная сумма. Это приблизительная оценка, а не счет-фактура поставщика.

Существующие положительные дни остаются в кэше. Включите функцию **«Пересчитывать старые дни с историческими ценами»** , чтобы исправить их один раз в пределах настроенного диапазона синхронизации/хранения, только когда будут доступны полные исторические данные о ценах потребления и абонентской плате. Маркеры версий для каждого источника возобновляют незавершенную работу после превышения лимитов API или перезапуска. Существующие интервалы базы данных повторно не экспортируются. Неисправленные записи JSON содержат `costStatus=legacy_unverified`; их предыдущие значения сохраняются. Отключение этой опции предотвращает дальнейшие корректировки устаревших данных.

### Диагностика синхронизации

`info.sync` разоблачает `running`, `currentDay` (последний день обработки) и расчетное значение `nextRun` метка времени. `info.api.octopus` и `info.api.inexogy` Отображается метка времени последнего успешного ответа, очищенный код ошибки и статус ограничения скорости/периода ожидания. Периоды ожидания Octopus учитывают параметр «Повторить попытку»; автоматическая политика повторных попыток Inexogy не применяется. Эти данные описывают ответы API, а не гарантированные полные дни.

Недавно полученные данные о днях интервала показывают `quality` Ниже каждого источника данных за день указаны: ожидаемое/полученное количество различных четвертей часа, отсутствующие интервалы, дубликаты, конфликты, недопустимые интервалы и `complete` В дни перехода на летнее время в Берлине ожидается 92 или 100 интервалов вместо 96. Ответы, содержащие только ежедневные данные, не проходят оценку качества интервалов. Отсутствие интервалов носит исключительно диагностический характер: из-за этого флага данные за положительные кэшированные дни не загружаются повторно. Повторная загрузка данных за дни с нулевым потреблением продолжается.

### Автоматические сборы за подключение к электросети в соответствии с §14a

Включайте **автоматическое начисление платы за электроэнергию модулем Octopus 3** только параллельно с существующим расчетом согласно §14a. Для этого требуются учетные данные Octopus, учетная запись и код оператора сети из выбранного места установки счетчика. При работе только с Inexogy по-прежнему используются ручные настройки. Сохраняйте действительные ручные настройки платы и временных интервалов: они остаются резервными и никогда не перезаписываются.

Адаптер запрашивает данные у немецкого производителя оригинального оборудования (OE). `variableGridFees` Для каждой необходимой даты берлинского календаря. Используются только ответы Модуля 3 с полным, однозначным расписанием на четверть часа, соответствующим оператором, явной действительностью метки времени и уникальной базовой ценой стандартного тарифа. Суммы API обрабатываются как **нетто центы/кВтч** , в соответствии с интеграцией Home Assistant в Германии; автоматическая корректировка валовой стоимости осуществляется с использованием НДС исторического соглашения. Поддерживаются ночные окна и дни перехода на летнее время. Неподдерживаемые расписания или неудачные запросы возвращаются к ручным настройкам с предупреждением.

Кэш в оперативной памяти ограничен учетной записью, оператором и датой (24 часа для действительных ответов, 15 минут для резервных результатов; максимум 400 записей). В бэкэнде имеется собственная система диагностики повторных попыток/периода ожидания. `info.api.gridFees` Ежедневная запись исходных объектов `gridFeeSource` (`api`, `manual`, `manual_fallback`), `gridFeeFallbackReason` и примененное `gridFeeSchedule` Эти поля описывают расчеты на текущий день, а не действующие тарифы.

Изменение настроек §14a приводит к пересчету дней в пределах заданного диапазона синхронизации/хранения. Маркеры конфигурации для каждого источника возобновляют незавершенные перерасчеты после перезапусков или превышения лимитов API без повторного экспорта кэшированных интервалов базы данных. Положительные дни, рассчитанные с помощью ручного резервного варианта, остаются в кэше; последующее восстановление API само по себе не запускает повторную загрузку данных о потреблении. Автоматические сборы покрываются с помощью имитационных тестов API, но все же требуют проверки на реальном счете модуля 3 и выставления счета перед выпуском. Расчетные затраты остаются приблизительными.

Актуальную информацию о тарифах на подключение к сети можно посмотреть по адресу: `info.api.gridFees`: `rawResponse` содержит API `module` и `gridFees` поля перед проверкой, `responseDate` Это запрошенный берлинский день. `httpStatus` — это возвращаемый статус (0, если ответа нет), и `responseTimestamp` датирует попытку диагностики. `rejectionReason` Различает отсутствующие данные/модуль, модуль, отличный от Модуля 3, пустые суммы сборов, недействительные записи, ошибки валидности, пробелы и наложения; индексы записей начинаются с нуля. Пустая причина означает, что проверка прошла успешно. Попадания в кэш не обновляют эти поля, и дополнительные запросы для диагностики не запускаются. В случае неудачных попыток ответ преобразуется в формат JSON. `null` Заголовки аутентификации, токены и данные учетной записи не включены. Эти диагностические данные сообщают то, что говорит API, а не являются независимым подтверждением регистрации модуля.

## Changelog
### 1.2.1 (2026-11-16)
* (tipp88) Use adapter-managed timers for API retry and pagination delays while preserving cancellation on unload.
* (tipp88) Add missing responsive layout sizes for historical repricing and automatic grid-fee checkboxes.
* (tipp88) Update @iobroker/testing from 6.3.1 to 6.3.2.

### 1.2.0 (2026-11-09)
* (tipp88) Expose raw Module 3 response fields, request date, HTTP status and precise grid-fee rejection reasons.
* (tipp88) Add opt-in, date-specific Module 3 grid fees with validated schedules, scoped caching and manual fallback.
* (tipp88) Record applied grid-fee sources and resume interrupted EnWG recalculations per source without duplicate interval exports.
* (tipp88) Expose sync/API diagnostics and DST-aware daily interval completeness without refetching positive cached days.
* (tipp88) Add bounded API retries, Retry-After cooldowns, expiry-aware JWT refresh and cancellable requests.
* (tipp88) Paginate bounded, meter-scoped Octopus measurements with duplicate and cursor checks.
* (tipp88) Resolve historical consumption prices and monthly standing charges by agreement and gross-price validity.
* (tipp88) Preserve consumption when historical prices are missing; expose unavailable costs as null with availability indicators.
* (tipp88) Add opt-in, versioned historical repricing within sync/retention limits without repeated interval exports.
* (tipp88) Use Europe/Berlin calendar-day boundaries and tariff times, including 23/25-hour daylight-saving days.
* (tipp88) Exclude out-of-day intervals while retaining the final Inexogy interval ending at midnight.
* (tipp88) Updated axios from 1.20.0 to 1.21.0.
* (tipp88) Updated development dependencies: @iobroker/testing 6.1.0 → 6.3.1, @iobroker/types 7.2.2 → 7.2.5, and @types/node 22.20.1 → 22.20.5.
* (tipp88) Handle all Octopus tariff windows for consumption and cost calculations, including Inexogy comparisons.
* (tipp88) Reject unmatched tariff intervals instead of assigning them to the first tariff.
* (tipp88) Recalculate affected multi-window tariff days once within the sync/retention range, resuming after API limits without re-exporting cached intervals.
* (tipp88) Compare only finite, positive daily consumption values while continuing to refetch zero-consumption days.
* (tipp88) Log discrepancies only when a day's stored comparison changes to a discrepancy.
* (tipp88) Mark unavailable comparisons explicitly and clear outdated daily and tariff-slot differences.

### 1.1.0 (2026-09-24)
* (tipp88) Added standalone Inexogy and Octopus operation with independent data retrieval and history export.
* (tipp88) Restricted comparisons to days with data from both providers.
* (tipp88) Added Inexogy monthly, yearly and current billing-period consumption totals.
* (tipp88) Fixed current billing-period aggregation on the first synchronization by prioritizing recent history.
* (tipp88) Added diagnostics for Octopus usage API HTTP and GraphQL errors.
* (tipp88) Stopped repeated Octopus requests within a synchronization after an API rate-limit response.
* (tipp88) Added EnWG NT, ST and HT consumption and cost totals to Octopus billing periods.

### 1.0.1 (2026-09-14)
* (tipp88) Fixed consumption data for previous days not updating automatically when initially retrieved with 0 kWh (Issue #31).
* (tipp88) Upgraded axios dependency to 1.20.0.
* (tipp88) Upgraded `@iobroker/testing` devDependency to 6.1.0.

### 1.0.0 (2026-08-27)
* (tipp88) Fixed the three missing history database synchronization translations reported in issue #18.

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