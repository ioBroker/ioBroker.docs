---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: wSpVZQB+3/cD5hFo2c3K4ekt/nhTeXBrGJsezPKae0Q=
---
![Логотип](../../../en/adapterref/iobroker.leapmotor/admin/leapmotor.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.leapmotor.svg)
![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# ioBroker.leapmotor

Неофициальная интеграция электромобиля [Leapmotor](https://www.leapmotor.com/) с ioBroker. Протестировано на T03.

## ⚠️ Важно: используйте второй аккаунт

**Не используйте свой основной аккаунт Leapmotor!**

Адаптер поддерживает постоянную сессию с облаком Leapmotor. Если одна и та же учетная запись используется одновременно в приложении Leapmotor, обе сессии будут конфликтовать и приведут к выходу из системы друг друга.

**Рекомендуемая конфигурация:**

1. Создайте вторую учетную запись Leapmotor (например, с дополнительным адресом электронной почты).
2. В приложении Leapmotor перейдите по следующему пути: **Личный кабинет → Мой автомобиль → \[Название автомобиля] → Участники общего доступа → Добавить участника общего доступа**
3. Введите адрес электронной почты второй учетной записи и предоставьте все права.
4. Используйте вторые учетные данные в конфигурации адаптера.

Таким образом, ваш основной аккаунт всегда будет авторизован в приложении.

---

## Функции

- Административная панель на основе React с вкладками «Панель управления», «Потребление», «Поездки», «Точки данных» и «Диагностика».
- Опрос состояния транспортного средства каждые 1–60 минут (настраивается).
- Уровень заряда батареи, запас хода, температура, давление в шинах, GPS, двери, окна
- Пульт дистанционного управления: климат-контроль (обогрев/охлаждение/вентиляция), блокировка/разблокировка дверей, стеклоподъемники, солнцезащитная шторка, багажник, поиск.
- Планирование климатических отключений (регулярное, по дням недели) и лимит/планирование зарядки.
- Функции комфорта, поддерживаемые автомобилем: режим охраны, подогрев/вентиляция сидений, подогрев рулевого колеса, ограничение скорости, подогрев зеркал.
- Отслеживание поездок с ежедневным подсчетом пройденного расстояния и историей каждой поездки, запись маршрута по GPS (по желанию), объединение/отмена поездок, учет набора высоты, минимальная/максимальная температура наружного воздуха и оценка восстановления после каждой поездки.
- Экспорт данных о поездке в форматы CSV и PDF (таблица + сводка) за выбранный диапазон дат.
- Настраиваемое сохранение истории поездок/маршрутов GPS (дней, 0 = навсегда, с жестким ограничением по времени).
- Система подготовки к поездке: автоматический климат-контроль (обогрев/охлаждение/вентиляция) при включении зажигания, основанный на пороговых значениях температуры наружного воздуха, с защитой от ложных срабатываний за счет состояния блокировки и автоматического запуска команды.
- Подготовка к работе: тот же основной механизм подготовки к климатическим условиям, запускаемый по точке данных, а не по фронту зажигания (для автоматизации графиков смен/календаря).
- Автоматизация солнцезащитной шторки/люка в обоих режимах: подготовка к движению/работа, с отдельными положениями для обогрева/охлаждения/вентиляции и правилом «открывать в темное время суток» (за исключением случаев обогрева для защиты от холода).
- Температура наружного воздуха по данным Open-Meteo (не собственный датчик автомобиля — отсутствует на некоторых моделях, например, B10, и вводит в заблуждение при парковке в гараже), 30-минутный кэш с резервным значением для последнего известного значения при ошибках API.
- Оценка состояния батареи (SoH) на основе официальных данных об энергопотреблении из облачного хранилища за каждую поездку в зависимости от уровня заряда батареи (SoC), медианное значение за последние 30 поездок.
- Стоимость домашней/общественной зарядки разделена в зависимости от расстояния по GPS до настраиваемого местоположения дома (поиск адреса через Nominatim + карта с перетаскиваемым маркером/радиусом), с отдельными ценами на электроэнергию — для домашней зарядки можно использовать динамические данные о ценах (например, Tibber), для общественной зарядки всегда используется фиксированная цена, устанавливаемая вручную.
- Расчет стоимости зарядки на основе настраиваемой цены на электроэнергию.
- Количество сообщений от транспортных средств и число непрочитанных сообщений
- Система поддержки функций, специфичных для конкретной модели автомобиля (неподдерживаемые функции автоматически скрываются).
- Статистика потребления с еженедельной историей
- Динамическая приборная панель автомобиля (композитный HTML-виджет для VIS)
- Автоматическое обновление токена
- Кэш изображений (загружается один раз, хранится локально)
- Уведомления (независимо от адаптера) `sendTo` (включая telegrammenu2 (степень серьезности/область) и электронную почту): поездка завершена, зарядка завершена, обновление OTA, предупреждение об открытом окне, сработал режим подготовки к поездке/работе — с кнопкой тестового уведомления на вкладке «Настройки»

## Испытанные автомобили

- Leapmotor T03 ✅ (полностью протестирован, включая все команды дистанционного управления)
- Leapmotor B10 — отображение состояния/данных тщательно проверено реальным владельцем (батарея, запас хода, пробег, скорость, зажигание, все двери, все окна, давление в шинах, люк, GPS, план зарядки, лимит зарядки, направление вентиляционных отверстий кондиционера); дистанционные команды (блокировка, климат-контроль и т. д.) не подтверждаются отдельно с помощью кнопок адаптера, но ожидается, что они будут работать (та же подсистема управления, что и у T03).
- Leapmotor C10 / C16 — должен работать, пока не проверено.

## Установка

Установка через административный интерфейс ioBroker.

## Конфигурация

| Параметр           | Описание                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Электронная почта  | Адрес электронной почты учетной записи Leapmotor (рекомендуется использовать отдельную вторую учетную запись). |
| Пароль             | пароль учетной записи Leapmotor                                                                                |
| ПИН-код автомобиля | 4-значный PIN-код автомобиля — необходим для всех дистанционных команд.                                        |
| Язык облачного API | Это влияет только на текстовый контент в облачном API Leapmotor (например, названия дней расписания).          |

Все остальные параметры (интервалы опроса, запись маршрута GPS, уведомления, цены на электроэнергию, местоположение дома, подготовка к поездке/работе, хранение данных) перенесены из конфигурации самого экземпляра в **вкладку «Настройки»** в административной панели Leapmotor.

## Точки данных

```
leapmotor.0.<VIN>.status.*                → Vehicle status (read-only)
leapmotor.0.<VIN>.consumption.*           → Consumption & statistics (read-only)
leapmotor.0.<VIN>.trips.*                 → Daily kilometers and trip history (read-only)
leapmotor.0.<VIN>.charging.*              → Current charging session cost/kWh (read-only)
leapmotor.0.<VIN>.pictures.*              → Vehicle images, including an animated composite image (read-only)
leapmotor.0.<VIN>.cmd.*                   → Commands (writable)
leapmotor.0.<VIN>.info.*                  → Static vehicle info (read-only)
leapmotor.0.messages.*                    → Vehicle messages from the Leapmotor app (read-only)
leapmotor.0.config.*                      → Electricity price / battery capacity, Prepare-to-Drive/Work,
                                             home location & radius, notification targets, and
                                             trip/route history retention settings
leapmotor.0.<VIN>.battery.soh_percent     → Estimated battery health (State of Health, read-only)
```

Полный набор доступных точек данных, включая все состояния команд, допускающие запись, лучше всего просматривать непосредственно в дереве объектов ioBroker или на вкладке **«Точки данных»** в административном интерфейсе адаптера — там отображается каждая точка данных с ее текущим значением и кратким описанием.

### Панель администратора

Адаптер поставляется со своей собственной вкладкой администратора на основе React (щелкните значок адаптера в списке экземпляров) с пятью подвкладками: **Панель управления** (текущий статус и удаленное управление), **Потребление** (еженедельное потребление энергии и оценка стоимости), **Поездки** (ежедневное количество километров и отдельные обнаруженные поездки), **Точки данных** (полный браузер точек данных) и **Диагностика** .

### Анимированное изображение транспортного средства для VIS

`leapmotor.0.<VIN>.pictures.composite_html` Теперь содержит простое, встраиваемое анимированное изображение автомобиля (прозрачный фон, без кнопок или элементов приборной панели — оно перемещено во вкладку администрирования). Добавьте **базовый виджет (неэкранированный)** в VIS или встройте его через `<iframe>` и установите идентификатор объекта следующим образом:

```
leapmotor.0.<VIN>.pictures.composite_html
```

### Доступные команды (выбор)

Простые кнопки включения/выключения расположены снизу. `cmd.*` (роль `button`, установлен на `true` для запуска):

| Командование                     | Описание                                                                                                                                                               | Требуется ПИН-код | Работает над                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cmd.ac\_heat                     | Начать нагрев                                                                                                                                                          |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.ac\_cool                     | Начать охлаждение                                                                                                                                                      |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.ac\_vent                     | Начать вентиляцию                                                                                                                                                      |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.ac\_off                      | Остановить изменение климата                                                                                                                                           |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.defrost                      | Обогрев лобового стекла                                                                                                                                                |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.windows\_open                | Открытые окна                                                                                                                                                          |         –         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.windows\_close               | Закрыть окна                                                                                                                                                           |         –         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.find                         | Найти транспортное средство (гудок/фары)                                                                                                                               |         –         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.battery\_preheat             | Предварительный нагрев батареи включен.                                                                                                                                |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.battery\_preheat\_off        | Предварительный нагрев батареи отключен                                                                                                                                |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.lock                         | Заблокировать транспортное средство                                                                                                                                    |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.unlock                       | Разблокировать транспортное средство                                                                                                                                   |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.trunk\_open                  | Открытый багажник                                                                                                                                                      |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.trunk\_close                 | Закрыть багажник                                                                                                                                                       |         ✅         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.refresh                      | Запустить немедленное обновление статуса                                                                                                                               |         –         | Все модели (подтверждено T03)                                                                                                                                       |
| cmd.charge\_start / charge\_stop | Запуск/остановка зарядки напрямую (а не только по расписанию)                                                                                                          |         ✅         | Не тестировалось — та же подсистема зарядки, что и у cmd.charge\_limit\_set (подтверждено), поэтому ожидается на всех моделях.                                      |
| cmd.unlock\_charger              | Разблокируйте разъем для зарядки дистанционно.                                                                                                                         |         ✅         | Не тестировалось — одинаковая подсистема зарядки, ожидается на всех моделях.                                                                                        |
| cmd.healthy\_charging\_on / off  | Переключить режим зарядки для контроля состояния батареи.                                                                                                              |         ✅         | Не тестировалось — одинаковая подсистема зарядки, ожидается на всех моделях.                                                                                        |
| cmd.fuel\_heating\_on / off      | Включение/выключение подогревателя топлива                                                                                                                             |         ✅         | Не тестировалось — **только для комплектаций с REEV/увеличением запаса хода** (например, C10 EREV); не применимо для T03 (BEV).                                     |
| cmd.destination\_send            | Отправьте указанные ниже адрес/координаты во встроенную навигационную систему автомобиля.                                                                              |         –         | Не тестировалось — ожидается на моделях с навигацией (C10/B10/B11); неясно, принимает ли встроенная навигация T03 вообще пункты назначения, передаваемые из облака. |
| cmd.prepare\_to\_work            | Запустите внешнюю программу подготовки к работе (например, с помощью скрипта графика смен/календаря).                                                                  |         –         | Все модели (используют те же команды климат-контроля, что и режим подготовки к поездке)                                                                             |
| cmd.trips\_merge                 | Объедините поездку с непосредственно предшествующей (запишите время начала поездки в миллисекундах) — для реальной поездки, разделенной ложным обнаружением остановки. |         –         | Все модели                                                                                                                                                          |
| cmd.trips\_merge\_undo           | Отменить последнее слияние поездок (один слот, потерянный при перезапуске адаптера).                                                                                   |         –         | Все модели                                                                                                                                                          |

Команды, основанные на значениях:

| Командование                                                              | Описание                                                                                                                         | Работает над                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cmd.ac\_temp                                                              | Целевая температура: 16–30 °C                                                                                                    | Все модели (подтверждено T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cmd.ac\_fan\_speed                                                        | Скорость вращения вентилятора, 1–7                                                                                               | Все модели (подтверждено T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cmd.ac\_position                                                          | Положение пневмоподвески: все / вверх / вниз / передняя / задняя                                                                 | Все модели (подтверждено T03). На B10 корректность сообщаемого автомобилем направления была независимо подтверждена в ходе испытаний, проведенных реальным владельцем до и после (2026-09) — отправка этой конкретной команды не проверялась отдельно на B10.                                                                                                                                                                                                          |
| cmd.windows\_set                                                          | Положение окна, 0–100 %                                                                                                          | Все модели (подтверждено T03; масштаб автоматически корректируется для каждой модели, см. список изменений в разделе «В разработке»)                                                                                                                                                                                                                                                                                                                                   |
| cmd.sunshade\_set / sunshade\_open / sunshade\_close                      | Положение солнцезащитного козырька, 0–10                                                                                         | Подтверждено, что работает на T03, но только после того, как автомобиль был выведен из режима ожидания путем **физического открытия двери** — блокировка/разблокировка/зажигание/климат/дистанционное открытие багажника сами по себе не активируют необходимую подсистему (подтверждено в двух отдельных тестовых сессиях, 23.09.2026). Дистанционного обходного пути не существует. У B10 вместо этого установлен электрический люк (подтверждено, что он работает). |
| cmd.charge\_limit\_set                                                    | Ограничение заряда: 50–100 %.                                                                                                    | Все модели (подтверждено T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cmd.charge\_schedule\_enable / start / end / apply                        | график зарядки                                                                                                                   | Все модели (подтверждено T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cmd.climate\_schedule\_enable / mode / time / days / apply / cancel       | Повторяющийся климатический график                                                                                               | Все модели (подтверждено T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cmd.speed\_limit\_set                                                     | Ограничение скорости, если оно поддерживается транспортным средством.                                                            | Подтверждено, **что отсутствует** на модели T03; неизвестно, будет ли она на других моделях.                                                                                                                                                                                                                                                                                                                                                                           |
| cmd.destination\_address / destination\_latitude / destination\_longitude | Адрес назначения для отправки через cmd.destination\_send (укажите адрес или координаты широты/долготы, затем запустите команду) | Аналогично cmd.destination\_send выше — не тестировалось, ожидается на моделях с навигацией.                                                                                                                                                                                                                                                                                                                                                                           |

Команды управления комфортом (создаются/отображаются только в том случае, если данная модель автомобиля поддерживает эту функцию):

| Командование                            | Описание                | Работает над                                                                                                                                                                                                         |
| --------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cmd.sentry\_mode\_on / off              | Режим охраны            | Подтверждено, **что отсутствует** на модели T03; неизвестно, будет ли она на других моделях.                                                                                                                         |
| cmd.seat\_heat\_driver / copilot        | Подогрев сидений        | Не проверено — возможно на B10, B11/C10 (зависит от комплектации: по крайней мере, в одном из технических описаний C10 подогрев сидений не был включен в стандартную комплектацию). Подтверждено, что **не** на T03. |
| cmd.seat\_ventilation\_driver / copilot | Вентиляция сиденья      | Аналогично подогреву сидений.                                                                                                                                                                                        |
| cmd.steering\_wheel\_heat\_on / off     | обогрев рулевого колеса | Аналогично подогреву сидений. Подтверждено, что на T03 такого **нет** .                                                                                                                                              |
| cmd.mirror\_heat\_on / off              | обогрев зеркал          | Непроверено — возможно на B10, B11/C10, B05. Подтверждено, что на этом T03 **вообще не предоставляется через API/приложение** .                                                                                      |
| cmd.hotspot\_on / off                   | Точка доступа Wi-Fi     | Подтверждено, **что отсутствует** на моделях T03 и B10; неизвестно, встречается ли она на других моделях.                                                                                                            |

`sunroof` /`sunshade` Обрабатываются одинаково — см. `admin-tab/src/vehicleCapabilities.js` подтвержденная разница между B10 и T03.

Какие именно команды комфорта будут отображаться, зависит от обнаруженной модели автомобиля — см. `admin-tab/src/vehicleCapabilities.js` в репозитории находится текущая матрица возможностей для каждой модели.

## Changelog

### **WORK IN PROGRESS**
- New: optional comfort extras for Prepare-to-Drive/Work, opt-in and off by default since not every model/trim has them (confirmed absent on T03; unconfirmed on B10/C10/B05/C16):
  - Driver seat heat (level 1-3) when heating (cold)
  - Steering wheel heat when heating (cold)
  - Windshield defrost (`cmd.defrost` - the working "max defrost" command, not the ineffective `cmd.defrost_level`) below its own separate, independently configurable temperature threshold (icing risk, distinct from the general heat/cool/vent split)
- Fix: sunshade cold-protection close now has its own separate, stricter threshold (default 5°C) instead of triggering for the entire "heat" range - confirmed in practice that the general heat threshold alone closed the roof at 14°C, which doesn't need insulating against. Still applies day or night once genuinely cold enough (heat loss through the glass roof is real at night too)
- New: official, cloud-metered charging session history cross-check (Diagnostics tab) - synced once daily against the manufacturer's own device-metered log (community-documented endpoint), classified home/public by GPS the same way as live tracking. Comparison only for now; live-tracked totals still drive the cost figures shown elsewhere

### 0.7.2 (2026-09-24)
- New: notification for new vehicle inbox messages (service reminders, recalls, etc.), separate from the existing software-update notification
- Fix: outdoor temperature (used for trip min/max temp and Prepare-to-Drive/Work) now falls back to Open-Meteo not just when the vehicle doesn't report a value at all, but also when its reported value has stopped updating (confirmed on T03: the cloud keeps serving the same reading once parked long enough) - same 30min staleness threshold as the existing data-age indicator, cached for 10min so this never polls Open-Meteo more than necessary
- Fix: the Cloud API Language field's help text (and its translations, which didn't exist in any language) referenced settings under wording that predated their move to the Settings tab
- Note: 0.7.1 was pushed to GitHub but never tagged/published to npm - its changes are included here in 0.7.2 instead

### 0.7.0 (2026-09-24)
- New: trip merge undo (`cmd.trips_merge_undo`, one slot, lost on adapter restart)
- Fix: merging a trip's GPS route now works correctly - previously the merged route was deleted right after being written, due to an off-by-one in the route-key handling during merge
- New: elevation gain per trip (via Open-Meteo, no API key)
- New: min/max outdoor temperature per trip
- New: regen estimate per trip (voltage x current integration), now correctly excluded from charging sessions
- New: CSV export for a chosen date range
- New: PDF trip-log export (table + summary row, chosen date range)
- New: configurable trip and GPS-route history retention, independently, in days (0 = forever, with a hard count-based safety cap)
- New: Prepare-to-Drive - auto heat/cool/vent on ignition-on based on outdoor-temperature thresholds, with a lock-state check and a guard against self-triggered commands causing false positives
- New: Prepare-to-Work - same climate-prep core, triggered via `cmd.prepare_to_work` instead of an ignition edge, for shift-schedule/calendar automation
- New: sunshade automation for both Prepare-to-Drive/Work, with separate position for heat/cool/vent and an "open when dark" rule (kept closed when heating for cold protection)
- New: outdoor temperature now sourced from Open-Meteo instead of the vehicle's own sensor (missing entirely on some models, e.g. B10, and misleading when parked in a garage) - 30-minute cache, falls back to the last known value on API errors
- New: estimated battery health (SoH), derived from official per-trip cloud energy vs. SoC used (median of the last 30 trips, deliberately not derived from the adapter's own charging-cost estimate to avoid a circular "always ~100%" result)
- New: home/public charging cost split by GPS distance to a configurable home location (address search via Nominatim, map with draggable marker and radius circle); home charging can use a dynamic price datapoint (e.g. Tibber/aWATTar), public charging always uses a separate fixed manual price
- New: notifications (trip done, charge done, OTA update, window-left-open warning, Prepare-to-Drive/Work triggered) via `sendTo`, with telegrammenu2 severity levels/area support and a dedicated email payload; test-notification button in the Settings tab
- Fix: Prepare-to-Drive missed real drive starts after a long idle period, because the vehicle auto-relocks itself while driving - now also gates on movement (speed/gear), not lock state alone
- Fix: Prepare-to-Drive could misfire from a transient ignition-on reading caused by any remote command (its own or an external script's) waking the vehicle - now ignores an ignition edge within 2 minutes of any command sent
- Fix: `bcmKeyPositionOn1` staying on during charging previously kept a trip open and counted charging current as regen - now correctly separated
- Fix: Leaflet's default marker showed as a broken "?" under Vite (bundler doesn't serve `leaflet/dist/images/*.png` automatically) - now explicitly imported and overridden
- Fix: several `{condition && <JSX>}` renders showing a literal "0" instead of nothing, when `condition` was the number `0` rather than `false`
- Improved: Datapoints tab moved to the end of the tab order
- Improved: full i18n coverage across all 11 languages - fixed several previously silent gaps (category group headings, tab names, "Parked")
- Fix: battery color threshold corrected (turns yellow at 20%, was incorrectly 50%)
- Fix: vehicles west of Greenwich (UK, Ireland, Portugal, parts of Spain/France) showed their GPS position mirrored into the wrong hemisphere; latitude/longitude now use the signed signal values instead of the absolute-value-only fields (community-confirmed via leapmotor-ha)
- Fix: window open/close/set-to-percent commands now scale to each model's native range - B05/B10/C10 expect a 0-10 scale, not 0-100 like T03; commands sent to those models previously moved the window far less than requested
- Fix: the "charging" status could get stuck showing active from a stale/phantom cloud flag while the car was actually being driven or just powered on and ready; it's now cross-checked against gear position, speed and ignition before being reported
- Fix: on T03, the binary window-open flags could remain at 0 even with the window actually open; open/closed status on this model now falls back to the live position percentage
- Fix: steering-wheel heating and seat heating/ventilation commands used a payload format the cloud silently ignored; both now send the numeric level/position format confirmed correct against two independent community reverse-engineering projects - not live-tested here, as this T03 doesn't have this hardware
- Known limitation: mirror heating is not controllable via the API on this T03 - confirmed non-functional even via the official Leapmotor app, so likely not exposed to the API/app for this vehicle at all. Payload sent matches the community-verified format; left in for other models/regions where it may work.
- Chore: cross-checked the tire-pressure signal ID mapping (front-left/front-right/rear-left/rear-right) against leapmotor-ha's independently corrected mapping - confirmed correct, no code change
- New: added B11 handling - not a separate model, it's Leapmotor's internal platform code for the C10 itself (confirmed via ADAC vehicle database); some cloud responses surface this code as carType instead of "C10", now mapped to the same endpoint and window scale.
- New (untested, community feedback welcome): start/stop charging, unlock charging connector, healthy-charging-mode toggle, fuel-heater toggle (REEV/range-extender models only), and sending a navigation destination (address or coordinates) to the vehicle. Payloads verified against two independent community reverse-engineering projects, not against real hardware - none of this is testable on this T03 (no REEV fuel heater; the other commands need a vehicle where charging/nav can safely be tried). Please open a GitHub issue with your model and result if you test any of these.
- Fix: trip tracking lives entirely in memory and gets wiped on every adapter restart, but trips.current_trip_active kept whatever value it last had - if a trip was active when the adapter restarted (or crashed), it stayed stuck showing "in progress" forever, since nothing afterward re-evaluated it without a matching in-memory entry. Now cleared at startup if left over from before the restart (the original trip's exact end time/mileage can't be recovered at that point).
- Improved: every remote command now logs a "Command: ..." line before sending and a "successful"/"failed" line after, at debug level - previously several commands (ac_temp/fan/position, speed limit, seat heat/ventilation, destination send, charge limit, refresh, defrost cycle) sent silently on success, making it impossible to tell from the log whether anything actually happened without also checking the raw status. Commands that only stage a value for a later command (ac_temp, climate/charge schedule fields, defrost level) now log that explicitly instead, so they're not mistaken for a command that was actually sent to the vehicle.
- Fix: cmd.charge_limit_set never synced with the vehicle's actual charge limit unless changed through this adapter's own control - if you changed it via the official app instead (e.g. to 100%), the internal control stayed frozen at its creation-time default of 80. cmd.charge_schedule_apply would then silently send that stale 80 back to the vehicle, overwriting your real setting. Now synced from the vehicle's actual reported limit on every poll, and charge_schedule_apply falls back to the vehicle's current schedule value instead of a hardcoded 80 if the control was never touched.
- Improved: trip detection now closes a trip immediately once the vehicle is locked and the ignition is explicitly off, instead of always waiting the full 10-minute grace period. The 10-minute grace period still applies for ambiguous cases (e.g. ignition status not reported, or car left unlocked with ignition off). Also added a second, independent fast-path signal: a completed lock → unlock → lock cycle since the trip started (the car auto-locks while driving, so getting out requires unlocking, then it's locked again afterward) is treated as equally definitive proof the trip is over, even on models where ignition status isn't reliably reported.
- Fix: a token expiry hitting exactly during cmd.refresh (or the delayed status fetch after certain commands) crashed the whole adapter process with an unhandled promise rejection, instead of re-logging in like the regular polling cycle already does. Both paths now catch the error and retry after a fresh login, same as the poller.
- Confirmed via a real B10 owner (extensive status field testing, 2026-07): battery/range/mileage/speed/ignition/doors/windows/tire pressure/sunroof/GPS/charge plan/charge limit status all report correctly; the hotspot status field doesn't exist on B10, same as T03. Also confirmed the vehicle's reported AC vent direction is decoded correctly (2026-09 dumps). Battery preheat was attempted but inconclusive (vehicle declined to activate in warm weather) - still untested.

### 0.6.8 (2026-09-19)
- Fix: the 0.6.7 re-login fix correctly detected an expired session token, but retried login using the same device identity every time - which the cloud started rejecting after the first failure, leaving the adapter stuck until a manual restart. A fresh device identity is now generated on every login attempt.
- Fix: remote pre-conditioning (heating/cooling the car before getting in, which turns the ignition on without the car moving) no longer gets misdetected as the start of a trip
- Fix: a completed trip's recorded end time now uses the vehicle's own reported timestamp instead of when our next poll happened to notice the stop, giving more accurate trip duration and a better match for the cloud's energy-breakdown time window
- Chore: added diagnostic logging of raw login/energy-breakdown responses to aid future troubleshooting

### 0.6.7 (2026-09-18)
- Fix: the automatic re-login on an expired session token was case-sensitive and never triggered for the cloud's "TOKEN_NOT_AVAILABLE" error, causing all polling to silently fail until a manual adapter restart
- Fix: a trip now only ends once the ignition is actually off (not just when speed reaches 0), and only after a 10-minute confirmation grace period - a brief stop at a light or curb no longer splits one drive into several
- Fix: the trip energy-breakdown retry queue now survives adapter restarts instead of leaving trips stuck showing "not yet available" forever; trips whose data never arrives are now clearly marked unavailable after the retry budget is exhausted
- Chore: raw status/energy-breakdown debug logging improvements to aid future diagnosis

### 0.6.6 (2026-09-17)
- Fix: B05 vehicles now use the shared C10 status endpoint (community-confirmed via leapmotor-ha), resolving the HTTP 404 status error (#38)
- Fix: right-side door overlays now render correctly behind the vehicle body/hood for proper depth ordering
- Chore: added ESLint config, tsconfig.json, VSCode JSON schema hints, converted i18n files to short format, bumped several dependencies, added Node.js 26 to the test matrix

### 0.6.5 (2026-09-02)
- New: on adapter start, the raw (pre-parsing) status response is logged once per vehicle at debug level, to help diagnose unsupported or under-tested vehicle models (e.g. B05)
- New: status request errors now also include the requested URL and the server's response body (if any)

### 0.6.4 (2026-09-02)
- Chore: migrated Admin Tab to adapter-react-v5 8.x and MUI v6 (React stays on 18, no breaking change for users)
- Fix: corrected Grid layout usage after the MUI v6 update, which had caused overlapping text on the Diagnostics tab
- Fix: unified card spacing/padding across all Admin Tab pages for a consistent look
- Fix: pinned react-dom to 18.3.1 to avoid a dependency resolution conflict
- Chore: minor CI workflow fix

### 0.6.3 (2026-09-01)
- Fix: preserve the existing charge schedule (enabled state, recurrence, start/end time) when changing the charge limit, instead of resetting it every time
- Fix: corrected door z-order and window-closed overlay logic on both vehicle sides
- Fix: clarified that the "Language" setting only affects Leapmotor cloud API text, not the Admin Tab UI (renamed to "Cloud API Language")
- Chore: bumped axios to 1.19.0
- Adapter is now available in the ioBroker stable repository
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.2 (2026-07-08)
- Fix: B10 model now correctly uses the c10 cloud status endpoint (community-confirmed), resolving empty status/trips/charging datapoints
- Fix: enabled full i18n for jsonConfig.json now that admin/i18n translation files cover all keys

### 0.6.1 (2026-07-03)
- Fix: repository checker findings - node: prefix for built-in modules, removed raw setTimeout fallback, included admin-tab i18n source in npm package, trimmed news list to 7 entries

### 0.6.0 (2026-07-03)
- Refactor: moved to standard plain-JS repository layout (main.js at repository root, supporting modules under lib/ instead of build/)
- Fix: removed dead/duplicate code, added VIN sanitization for object IDs, subscribed and acknowledged config.* states
- Fix: enforced upper bound on polling interval in code, switched picture cache from package-directory file to adapter's own file storage
- Fix: translated remaining German backend strings to English, enabled compact mode support, adapter-managed timers used throughout

### 0.5.8 (2026-07-02)
- Fix: repository checker compliance - added missing intermediate object structure (charging/consumption/pictures/trips channels), corrected invalid state roles, added real integration test

### 0.5.7 (2026-06-29)
- Fix: avoid npm transparency log conflict from a previous failed publish attempt (no functional changes vs. 0.5.5)

Older changes can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88) <henrik.schoenhofen@icloud.com>

See [LICENSE](https://github.com/backfisch88/ioBroker.leapmotor/blob/main/LICENSE) for the full license text.