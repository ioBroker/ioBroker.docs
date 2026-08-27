---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: 8QA3uSUcwt1tMocORl/MHsGWw3rsaX8QAGTM4T485Cw=
---
![Логотип](../../../en/adapterref/iobroker.leapmotor/admin/leapmotor.png)

![Версия](https://img.shields.io/badge/version-0.6.0-blue.svg)
![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# IoBroker.leapmotor
Неофициальная интеграция электромобилей [Леапмотор](https://www.leapmotor.com/) для ioBroker. Протестировано на T03.

## ⚠️ Важно: Используйте второй аккаунт
**Не используйте свой основной аккаунт Leapmotor!**

Адаптер поддерживает постоянную сессию с облаком Leapmotor. Если одна и та же учетная запись используется одновременно в приложении Leapmotor, обе сессии будут конфликтовать и приведут к выходу из системы друг друга.

**Рекомендуемая конфигурация:**

1. Создайте вторую учетную запись Leapmotor (например, с дополнительным адресом электронной почты).
2. В приложении Leapmotor перейдите по следующему пути:

**Личный кабинет → Мой автомобиль → [Название автомобиля] → Участники общего доступа → Добавить участника общего доступа**

3. Введите адрес электронной почты второй учетной записи и предоставьте все права.
4. Используйте вторые учетные данные в конфигурации адаптера.

Таким образом, ваш основной аккаунт всегда будет авторизован в приложении.

---

## Функции
— Административная панель на основе React с вкладками «Панель управления», «Потребление», «Поездки», «Точки данных» и «Диагностика».
- Опрос состояния транспортного средства каждые 1–60 минут (настраивается)
- Уровень заряда батареи, запас хода, температура, давление в шинах, GPS, двери, окна
- Пульт дистанционного управления: климат-контроль (обогрев/охлаждение/вентиляция), блокировка/разблокировка дверей, окна, солнцезащитная шторка, багажник, поиск.
- Планирование климатических отключений (регулярное, по дням недели) и ограничение/планирование зарядки.
- Функции комфорта, поддерживаемые автомобилем: режим охраны, подогрев/вентиляция сидений, подогрев рулевого колеса, ограничение скорости, подогрев зеркал.
- Отслеживание поездок с ежедневным подсчетом пройденного расстояния и историей отдельных поездок.
- Расчет стоимости зарядки на основе настраиваемой цены на электроэнергию.
- Количество сообщений и непрочитанных сообщений в автомобиле
- Система поддержки функций, специфичных для конкретной модели автомобиля (неподдерживаемые функции автоматически скрываются).
- Статистика потребления с еженедельной историей
- Динамическая приборная панель автомобиля (композитный HTML-виджет для VIS)
- Автоматическое обновление токена
- Кэш изображений (загружается один раз, хранится локально)

## Испытанные автомобили
- Leapmotor T03 ✅ (полностью протестирован)
- Leapmotor B10 / C10 / C16 – должен работать, наличие функции комфорта пока не подтверждено.

## Установка
Установка через административный интерфейс ioBroker.

## Конфигурация
| Настройки | Описание |
|---------|-------------|
| Электронная почта | Адрес электронной почты учетной записи Leapmotor (рекомендуется использовать отдельную вторую учетную запись) |
| Пароль | Пароль от аккаунта Leapmotor |
| PIN-код автомобиля | 4-значный PIN-код автомобиля – необходим для всех дистанционных команд |
| Интервал опроса | Интервал обновления статуса в минутах (по умолчанию: 5) |

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
leapmotor.0.config.*                      → Electricity price / battery capacity used for cost estimation
```

Полный набор доступных точек данных, включая все состояния команд, допускающие запись, лучше всего просматривать непосредственно в дереве объектов ioBroker или на вкладке **Точки данных** в административном интерфейсе адаптера — там отображается каждая точка данных с ее текущим значением и кратким описанием.

### Панель администратора
Адаптер поставляется со своей собственной вкладкой администратора на основе React (щелкните значок адаптера в списке экземпляров) с пятью подвкладками: **Панель управления** (текущий статус и удаленное управление), **Потребление** (еженедельное потребление энергии и оценка стоимости), **Поездки** (ежедневный пробег и отдельные обнаруженные поездки), **Точки данных** (полный браузер точек данных) и **Диагностика**.

### Анимированное изображение транспортного средства для VIS
`leapmotor.0.<VIN>.pictures.composite_html` теперь содержит простое, встраиваемое анимированное изображение автомобиля (прозрачный фон, без кнопок или элементов приборной панели — оно перемещено во вкладку администрирования). Добавьте **базовый виджет (неэкранированный)** в VIS или встройте его через `<iframe>` и установите идентификатор объекта следующим образом:

```
leapmotor.0.<VIN>.pictures.composite_html
```

### Доступные команды (выбор)
Простые кнопки включения/выключения в разделе `cmd.*` (роль `button`, для срабатывания установите значение `true`):

| Команда | Описание | Требуется PIN-код |
|---------|-------------|:------------:|
| cmd.ac_heat | Начать нагрев | ✅ |
| cmd.ac_cool | Начать охлаждение | ✅ |
| cmd.ac_vent | Запустить вентиляцию | ✅ |
| cmd.ac_off | Остановить климат | ✅ |
| cmd.defrost | Размораживание лобового стекла | ✅ |
| cmd.windows_open | Открыть окна | – |
| cmd.windows_close | Закрыть окна | – |
| cmd.find | Найти транспортное средство (гудок/фары) | – |
| cmd.battery_preheat | Предварительный нагрев батареи включен | ✅ |
| cmd.battery_preheat_off | Предварительный нагрев батареи отключен | ✅ |
| cmd.lock | Блокировка транспортного средства | ✅ |
| cmd.unlock | Разблокировать транспортное средство | ✅ |
| cmd.trunk_open | Открыть транк | ✅ |
| cmd.trunk_close | Закрыть транк | ✅ |
| cmd.refresh | Запустить немедленное обновление статуса | – |

Команды, основанные на значениях:

| Команда | Описание |
|---------|-------------|
| cmd.ac_temp | Целевая температура, 16–30 °C |
| cmd.ac_fan_speed | Скорость вентилятора, 1–7 |
| cmd.ac_position | Положение воздуха: все / вверх / вниз / перед / назад |
| cmd.windows_set | Положение окна, 0–100 % |
| cmd.sunshade_set / sunshade_open / sunshade_close | Положение солнцезащитного козырька (T03), 0–10 |
| cmd.charge_limit_set | Ограничение заряда, 50–100 % |
| cmd.charge_schedule_enable / start / end / apply | График зарядки |
| cmd.climate_schedule_enable / mode / time / days / apply / cancel | Повторяющееся расписание климатических мероприятий |
| cmd.speed_limit_set | Ограничение скорости, если поддерживается транспортным средством |

Команды управления комфортом (создаются/отображаются только в том случае, если данная модель автомобиля поддерживает эту функцию):

| Команда | Описание |
|---------|-------------|
| cmd.sentry_mode_on / off | Режим охраны |
| cmd.seat_heat_driver / copilot | Подогрев сидений |
| cmd.seat_ventilation_driver / copilot | Вентиляция сидений |
| cmd.steering_wheel_heat_on / off | Подогрев рулевого колеса |
| cmd.mirror_heat_on / off | Подогрев зеркала |
| cmd.hotspot_on / off | Точка доступа Wi-Fi (не влияет на T03) |

Какие именно команды комфорта будут отображаться, зависит от обнаруженной модели автомобиля — см. `admin-tab/src/vehicleCapabilities.js` в репозитории для получения текущей матрицы возможностей для каждой модели.

## Changelog

### **WORK IN PROGRESS**
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

Older changes can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88)