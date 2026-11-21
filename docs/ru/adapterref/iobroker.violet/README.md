---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.violet/README.md
title: ioBroker.violet
hash: QPj75L0bFNZ9AcyEW1W8nwTXSPr0RKDU6JcH62271Pc=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.violet.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.violet.svg)
![Количество установок](https://iobroker.live/badges/violet-installed.svg)
![Тестирование и выпуск](https://github.com/AlPi-BRV/ioBroker.violet/actions/workflows/test-and-release.yml/badge.svg)
![Лицензия](https://img.shields.io/github/license/AlPi-BRV/ioBroker.violet)

<img src="admin/violet.png" alt="Violet" width="96" align="right">

# IoBroker.violet
Адаптер для контроллера бассейна **Violet** от PoolDigital (включая модуль дозирования и удлинители реле).

🇩🇪 **[Deutsche Anleitung](https://github.com/AlPi-BRV/ioBroker.violet/blob/main/docs/de/README.md)**

> [!ПРЕДУПРЕЖДЕНИЕ] > **Обновление с версии 0.7.x или старше до 0.8.0: все идентификаторы точек данных изменились** (с немецкого на английский, например, `wasser.chlor` → `water.chlorine`, `pumpe.schalten` → `pump.switch`). Адаптер автоматически перемещает ваши существующие точки данных (значения и настройки истории сохраняются), но **представления VIS, скрипты, Blockly и другие адаптеры, использующие эти точки данных, должны быть изменены** - в большинстве проектов VIS это затрагивает почти каждый виджет. Пожалуйста, прочтите [Обновите до версии 0.8.0](#upgrade-to-080-english-ids) **перед** обновлением и сделайте резервную копию (например, экспортируйте свой проект VIS).

## Функции
- Циклически считывает все значения элемента Violet (`http://<IP>/getReadings?ALL`) и сопоставляет их с фиксированной структурой.

(`wasser`, `temperatur`, `pumpe`, `dosierung`, `relais`, `heizung`, `solar`, `rueckspuelung`, `analog`, …)

- **Анкета в настройках**: в качестве точек данных создаются только те области, которые вы фактически используете.
- Собственные имена для датчиков температуры, реле, аналоговых входов и сцен DMX - с отображением значений в реальном времени в конфигурации или возможностью присвоения имен из Violet одним щелчком мыши.
- **Включение / Выключение / Автоматический режим** (главный переключатель "Разрешить переключение" по умолчанию отключен)
- **Настройки отображения бассейна** (вкладка «Дисплей»): оптимальные диапазоны pH, окислительно-восстановительного потенциала и хлора (значения отображаются красным цветом), назначение строк с температурой и большой экран.
- **Виртуальные реле**: до 8 точек данных ioBroker (истина/ложь) других устройств, переключаемых в режиме отображения реле на экране пула.
- **Температура воды в трубопроводе насоса**: необязательное значение, зафиксированное при выключенном насосе (`temperatures.sensor1_pool`, отмечено * на дисплее)
- **Объем циркулирующей воды за сутки** в м³, рассчитанный на основе времени работы устройства Violet и производительности насоса.
- **Фиолетовые сообщения** (предупреждения, сигналы тревоги, напоминания) в виде точки данных `messages.active` и в виде уведомления на дисплее пула.
- **Дисплей для бассейна** в стиле классического дисплея ProCon.IP, работающий напрямую от адаптера.
- Названия точек данных, конфигурация и отображение пула на немецком и английском языках; конфигурация на 11 языках.

## Принципы
- Адаптер **считывает данные и переключает параметры** - он **никогда не настраивает** Violet (нет заданных значений, калибровки, дозировки, расписаний).
- **Дозировка** (хлора, pH, флокулянта, электролиза) доступна только для чтения.
- **Обложка** доступна только для чтения (нет документированной команды переключения).

## Переключение
При включении опции "Разрешить переключение" каждая выбранная функция получает точку данных `switch`:

| Ценность | Эффект |
|---|---|
| `ON` | руководство включено |
| `AUTO` | вернуться в автоматический режим Violet |
| `АВТО` | вернуться в автоматический режим Violet |

- Переключаемые режимы: фильтрующий насос, обогрев, солнечная энергия, освещение, ЭКО, дозаправка, обратная промывка, ополаскивание, избыток солнечной энергии (только ВКЛ/ВЫКЛ), реле EXT1/EXT2, сценарии DMX
- `pump.speed_setpoint` (1 = ECO, 2 = Normal, 3 = Boost) - используется при включении, применяется немедленно, пока насос работает в ручном режиме.
- "Длительность ручного включения/выключения" в минутах, 0 = постоянно.
- Переключатель точек данных всегда отражает фактический режим работы Violet.
- Команда: `GET /setFunctionManually?FUNCTION,ACTION,DURATION,VALUE` - каждая команда и ошибка регистрируются в журнале.

### Коды состояния
| Код | Значение |
|---|---|
| 0 | Авто - выключено |
| 1 | Автоматическое включение |
| 2 | Автоматическое отключение, блокируется правилом управления (например, отопление при выключенном насосе) |
| 3 | Автоматическое включение, принудительное в соответствии с правилом чрезвычайной ситуации |
| 4 | Ручное управление |
| 5 | Отключено по чрезвычайному правилу |
| 6 | Выкл. вручную |

Источник: описание интерфейса PoolDigital (getReadings, редакция 14.07.2024).

## Объем циркулирующей воды
На вкладке «Насос» вы вводите производительность насоса в м³/ч - на уровень скорости для насосов с регулируемой скоростью.
Если абсорбер или нагреватель уменьшают расход, введите там меньшее значение (пусто = то же, что и при работе только одного устройства; если работают оба, применяется меньшее значение).

- Точка данных `pump.circulated_today` (м³), отображаемая на экране бассейна после времени работы: `06h 07m (25.9 м³)`
- Основа: время выполнения для каждого уровня, подсчитанное самим Violet - перезапуск ioBroker не искажает значение.
- Снижение мощности за счет абсорбера/нагревателя учитывается адаптером при каждом опросе; сброс происходит в полночь.
- Точка данных `pump.flow_rate` (м³/ч): текущий расход рабочего уровня, рассчитанный на основе введенных значений (с учетом абсорбера/нагревателя), 0 = насос выключен - отображается на дисплее бассейна в строке насоса под временем работы.
- В этом случае приоритет отдается реальному датчику расхода в м³/ч (например, импульсному входу 2), если он выдает значение выше 0.
- Только расчет - в «Фиолетовый» ничего не записывается.

## Теплоотдача (абсорбер / нагрев)
На вкладке «Насос» (раздел «Тепловая мощность») адаптер может рассчитать, сколько тепла поступает в бассейн от поглотителя и нагревателя:

Мощность (кВт) = (обратная вода − датчик температуры воды 1) × расход работающего насоса × 1,163 - расход определяется по указанным выше значениям расхода (с абсорбером/нагревом: меньшее значение)
- Датчики: датчик обратной подачи абсорбера (в модели Violet обычно датчик 4) и опционально датчик обратной подачи тепла.
- Расположение датчика обратного потока тепла: «только за нагревателем» или «за абсорбером и нагревателем (последовательно)». При последовательном соединении и одновременной работе обоих устройств: нагрев = общий поток − абсорбер
- Точки данных `solar.power` / `heater.power` (кВт) и `solar.energy_today` / `heater.energy_today` (кВт·ч, обнуляются в полночь); в отображении бассейна в строке ниже времени работы: `4,2 кВт · 11,6 кВт·ч`
- Отрицательные значения (охлаждение абсорбера) отображаются как 0. Для получения долгосрочной статистики используйте, например, адаптер sourceanalytics.
- «Тип отопления» (теплообменник (масло/газ), тепловой насос, электрический) задает название на дисплее бассейна.

### Коэффициент полезного действия теплового насоса
При выборе типа отопления "Тепловой насос" можно выбрать любую точку данных ioBroker с указанием потребляемой мощности (например, Shelly, единица измерения Вт или кВт).

- `heater.electrical_power` (кВт) и `heater.electricity_today` (кВт·ч, включая режим ожидания)
- `heater.cop` = тепловая мощность ÷ потребляемая мощность, только во время работы отопления (от 0,1 кВт), в противном случае пусто.
- `heater.cop_today` = тепловая энергия сегодня ÷ электроэнергия сегодня (от 0,05 кВт·ч)
- На дисплее бассейна после отвода тепловой энергии отображается текущий КПД во время работы, в противном случае - КПД за сегодняшний день.
- Тепловая мощность рассчитывается на основе введенной скорости подачи - коэффициент полезного действия (COP) является приблизительной оценкой, а не калибровочным измерением.

## Перенимаем эстафету у Вайолет
На вкладке «Подключение» адаптер может считывать параметры по умолчанию из Violet: названия датчиков температуры, реле, аналоговых/импульсных входов и сцен DMX, производительность насоса и установленные функции (дозирование, расширения реле, обогрев, солнечная энергия).

- Функция «Заполнить пустые поля» добавляет только недостающие данные; функция «Заменить все» также перезаписывает собственные имена и тарифы доставки.
- Функции только включаются, никогда не выключаются; стандартные названия Violet («EXT1-Relais 3», «Szene 9», «---») пропускаются.
- Значения отображаются только в форме - они применяются после нажатия кнопки "Сохранить".
- Необходимо сохранить имя пользователя и пароль от системы Violet.
- При первом запуске нового экземпляра это происходит автоматически (только для пустых полей).
- В Violet ничего не записывается; вычисляются только перечисленные значения, ответ Violet не сохраняется.

## Электролитическая ячейка
Для электролиза прибор Violet использует те же поля, что и для жидкого хлора, но с другим значением (информация от PoolDigital): суточное количество - это произведенный хлор в **г**, содержимое «канистры» - это **оставшееся время работы ячейки**, замена канистры - это **замена ячейки**.

- Точки данных в разделе `dosing.electrolysis`: `produced_today` (г), `cell_remaining_hours` (ч), `cell_change` (дата)
- Необязательно (вкладка «Функции», видимая при электролизе): введите время жизни ячейки в часах - то же значение, что и в фиолетовом поле. Затем добавляются значения `cell_wear` (%) и `cell_warning` (из порогового значения предупреждения).
- Смена элемента подтверждается в Violet так же, как и смена контейнера - в Violet ничего не записывается.
- Пожалуйста, сообщите, если ваши значения отличаются - в бассейне автора используется жидкий хлор.

## Фиолетовые сообщения
Адаптер считывает сообщения устройства Violet раз в минуту через `GET /getNotifications?ALL` (для более старых версий прошивки используется резервный вариант: изменение `last_error_id`).

| Точка данных | Значение |
|---|---|
| `messages.active` | `true` если появилось новое, еще не подтвержденное сообщение - идеально подходит для значка сигнала в вашей визуализации |
| `messages.text`, `.time`, `.type` | последнее сообщение |
| `messages.list` | последние 20 сообщений в формате JSON |
| `messages.acknowledge` | кнопка: подтвердить в ioBroker |
| `messages.acknowledge` | button: acknowledge in ioBroker |

Подтверждение влияет только на ioBroker - сообщения, которые должны быть подтверждены непосредственно на Violet, по-прежнему должны быть подтверждены там.
В окне пула новое сообщение отображается в виде мигающей желтой точки в нижнем колонтитуле; щелчок открывает Violet в новом окне и подтверждает сообщение в ioBroker.

## Отображение бассейна
Обслуживается самим адаптером (встроенный веб-сервер, другие адаптеры не требуются): `http://<ioBroker-IP>:8099/` (порт и шрифт в конфигурации, вкладка «Подключение»).

- Автоматическая сборка: отображаются только существующие функции, подключенные датчики и настроенные реле.
- Ряд насосов с уровнями скорости (активный уровень выделен зеленым цветом) и индикатором PV (только если избыток PV используется и активен).
- Световой ряд с DMX-сценами (если используются)
- Кнопка «Реле» в заголовке: отображает переключатели расширений реле вместо температур.
- Переключения происходят только при включенной опции "Разрешить переключение"; интерфейс принимает только освобожденные точки данных переключения (дозирование никогда не происходит).
- Интерфейс: `GET /api/data` (значения), `GET /api/set?id=…&value=…` (переключение), `GET /api/ack` (подтверждающие сообщения)
- **Используйте только в домашней сети** - не предоставляйте доступ к интернету (вход в систему невозможен).
- Предварительный просмотр без адаптера: открыть `www/index.html` локально с параметром `?demo=1` (параметры: `&lang=en`, `&font=arial`, `&msg=1`, `&ohne=heizung,solar,pv,dmx,relais`)

## Установка
Установите адаптер в административной панели ioBroker в разделе **Адаптеры**.

После обновления перезапустите экземпляр.

## Обновление до версии 0.8.0 (английские идентификаторы)
До версии 0.7.x точки данных имели немецкие идентификаторы. Начиная с версии 0.8.0 все идентификаторы - английские. Адаптер автоматически перемещает существующие точки данных при первом запуске после обновления (настройки значений и истории сохраняются, старые данные истории остаются под старым идентификатором). Скрипты, представления VIS и другие адаптеры, использующие эти точки данных, необходимо изменить один раз.

| до версии 0.7.x | начиная с версии 0.8.0 |
|---|---|
| `wasser.*` | `water.*` (`chlor` → `chlorine`, `eingefroren` → `frozen`) |
| `pumpe.*` | `pump.*` (`stufe` → `level`, `drehzahl_soll` → `speed_setpoint`, `umwaelzung_heute` → `circulated_today`) |
| `dosierung.chlor`, `.elektrolyse`, `.flockung` | `dosing.chlorine`, `.electrolysis`, `.flocculant` |
| `heizung.*`, `nachspeisung.*`, `rueckspuelung.*` | `heater.*`, `refill.*`, `backwash.*` |
| `licht.*`, `abdeckung.*`, `dmx.szeneN` | `light.*`, `cover.*`, `dmx.sceneN` |
| `relais.extX_Y` | `relays.extX_Y` |
| `meldungen.*` | `messages.*` (`aktiv` → `active`, `quittieren` → `acknowledge`) |
| `eingaenge.eingangN`, `analog.impulsN` | `inputs.inputN`, `analog.pulseN` |
| `diagnose.*` | `diagnostics.*` |
| `….schalten` | `….switch` |
| `….aktiv`, `….laufzeit_heute`, `….letzter_start`, `….letztes_ende` | `….active`, `….runtime_today`, `….last_on`, `….last_off` |
| `….tagesmenge`, `….kanister_rest`, `….reichweite`, `….sperren` | `….dosed_today`, `….canister_remaining`, `….range`, `….locks` |
| `….tagesmenge`, `….kanister_rest`, `….reichweite`, `….sperren` | `….dosed_today`, `….canister_remaining`, `….range`, `….locks` |

Полный список находится в [lib/idmap.js](https://github.com/AlPi-BRV/ioBroker.violet/blob/main/lib/idmap.js).

**Советы по переходу**

- Перед обновлением: экспортируйте свой проект VIS (редактор VIS: экспорт проекта; или резервная копия BackItUp) и сделайте резервную копию скриптов - тогда ничего не будет потеряно.
- В экспортированном файле VIS вы можете заменить идентификаторы, используя приведенную выше таблицу (найдите `violet.0.`), а затем импортировать его снова. Сначала замените более длинные идентификаторы (например, `dosierung.chlor.tagesmenge` перед `dosierung.chlor`).
- В журнале экземпляра указано, сколько точек данных было перемещено. Скрипты со старыми идентификаторами отображают только предупреждения типа «состояние… не найдено» - найдите `violet.0.` в адаптере скриптов.
- Если вы пока ничего не хотите менять: оставайтесь на версии 0.7.x, пока у вас не будет времени для перехода.

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
**Почему я не могу изменить дозировку?** - Преднамеренно: неправильная дозировка может быть опасна для купающихся. Дозировка контролируется только устройством Violet.

**Почему так мало точек данных?** - Создаются только области, отмеченные на вкладке «Функции». Полные исходные данные всегда доступны в `info.rawJson`.

**На экране пула отображается "Нет данных".** - Убедитесь, что экземпляр запущен и включена опция "Предоставлять отображение пула"; проверьте `http://<ioBroker-IP>:8099/api/data` в браузере.

## Торговые марки
Фиолетовый цвет и логотип Violet являются товарными знаками **PoolDigital GmbH & Co. KG**, Kapellenstraße 10a, 86441 Zusmarshausen, Германия - [www.pooldigital.de](https://www.pooldigital.de).
Используется с любезного разрешения PoolDigital. Этот адаптер является независимым проектом сообщества и не является официальным продуктом PoolDigital.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.0 (2026-11-07)
- **Breaking change – English object IDs** (requested by the ioBroker review): all data points now have English IDs, e.g. `wasser.chlor` → `water.chlorine`, `pumpe.schalten` → `pump.switch`, `meldungen.quittieren` → `messages.acknowledge`. Existing data points are moved automatically on the first start: last value and history settings (`common.custom`) are taken over, the old objects are deleted. Older history data stays stored under the old IDs. **Please adapt your scripts and visualizations** – see [Upgrade to 0.8.0](#upgrade-to-080-english-ids)
- States of other adapters (heat pump power, virtual relays) are only taken over when acknowledged (`ack = true`)
- New data point `pump.flow_rate` (m³/h): calculated flow rate of the running pump level from the configured delivery rates (absorber/heating considered)
- Pool display: the line "Flow rate" in the pump row now shows the calculated value; a flow sensor input that only delivers 0 (no sensor connected) is no longer shown
- npm keyword `dosing` instead of `dosierung`

### 0.7.1 (2026-10-22)
- Data point names in all 11 ioBroker languages (requested by the repository check); own names from the configuration stay unchanged
- Data points `schalten`: role changed from `level.mode` (not in the ioBroker role catalogue) to `text` – values `ON` / `OFF` / `AUTO` are unchanged
- Obsolete data point `info.cellState` (from 0.6.10) is removed; names of existing data points are updated on start, also for sensors that currently deliver no value
- Pool display: relay rows that go beyond the temperature and water value rows are shown side by side (3 per row) in a full-width row – no empty cells, the display no longer grows in height (preview: `?demo=1&alle=1`)

### 0.7.0 (2026-10-14)
- Take over from the Violet: names of temperature sensors, relays, analog/pulse inputs and DMX scenes, delivery rates of the pump and installed functions (tab "Connection", buttons "Fill empty fields" / "Replace all"; needs user name and password of the Violet). On the very first start of a new instance this happens automatically. Read only – nothing is written to the Violet, and only the needed values are evaluated
- Own names for DMX scenes (tab "Relays"), used for data points and in the pool display
- Pool display: a flow sensor in m³/h (e.g. pulse input 2) is shown in the pump row below the runtime instead of among the water values
- Heat pump: COP (now and today) and electricity of today from a power data point of your choice (e.g. Shelly); configuration in the tab "Pump" when the type of heating is "Heat pump"
- Pool display: heat output, heat energy and COP in a second line below the runtime (the row no longer shifts)
- Fix: the Violet reports the pump speeds with the normal status codes – a pump switched on manually (code 4) was treated as stopped: no flow for water volume and heat output, water values frozen

### 0.6.11 (2026-10-12)
- Electrolysis: chlorine produced today (g), remaining cell hours and last cell change are now taken directly from the Violet (the canister fields have this meaning for electrolysis – information from PoolDigital); the own operating hours counter, cell output, start value and button "cell replaced" are removed
- Wear in % and warning remain optional (cell lifetime in the configuration)

### 0.6.10 (2026-10-12)
- New: heat output of absorber and heating (kW) and heat energy of today (kWh), calculated from return temperatures and the configured pump flow; return sensor behind heating only or behind absorber and heating in series
- New: electrolysis cell – operating hours counter, remaining hours, wear in %, warning threshold, chlorine produced today (g), button "cell replaced"; canister values are no longer created for electrolysis
- New: type of heating (heat exchanger, heat pump, electric) as name in the pool display
- Fix: status 2 (auto, off by rule) no longer counts as running for the water volume reduction

### 0.6.9 (2026-10-11)
- Maintenance according to the ioBroker repository checker: admin >= 7.6.20, tests with Node.js 22/24/26, translation files in short format (admin/i18n/<lang>.json), dependabot settings

### 0.6.8 (2026-10-11)
- Fix: water values (and pool temperature) stayed frozen for about 2 hours after the pump started – the Violet writes `PUMP_LAST_ON` in local time; the runtime is now calculated against the Violet clock

### 0.6.7 (2026-10-11)
- Code formatted to the ioBroker standard (ESLint/Prettier), no functional changes
- Automatic tests on GitHub (test-and-release workflow), release script prepared

### 0.6.6 (2026-10-11)
- Repository checker: Node.js 22 required, dependencies updated (adapter-core 3.4.3, admin 7.6.17), installation notes adjusted, admin layout on small screens

### 0.6.5 (2026-10-11)
- Repository checker: old news entries removed from io-package.json (max. 7), obsolete `common.main` removed

### 0.6.4 (2026-10-11)
- Pool display: relay view keeps the size of the display (up to 3 relays per cell), lamps aligned
- Configuration: "Virtual relays (other ioBroker devices)"

### 0.6.3 (2026-10-11)
- Pool display: smaller "blocked" text so the switches no longer shift; smaller * in the large display

### 0.6.2 (2026-10-11)
- Water values (pH, redox, chlorine) frozen while the pump is off (option, data point `wasser.eingefroren`), no red marking without flow
- Pool display reloads itself after an adapter update

### 0.6.1 (2026-10-11)
- Status codes corrected according to the official interface description of PoolDigital: 2 = auto, blocked by rule (was shown as manual on), 5 = off by emergency rule

### 0.6.0 (2026-10-11)
- New tab "Display": optimal ranges (values outside in red), temperature rows and large display freely assignable
- Virtual relays (other devices, ON/OFF only) in the relay view of the pool display
- Water temperature (sensor 1) frozen while the pump is off – for sensors in the pump piping
- Electrodes selectable individually (pH, redox, chlorine); chlorine or electrolysis
- Flocculant (dosed today) shown in the pool display
- Author contact updated

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 Alexander Pietz <alex@1-5worlds.de>

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