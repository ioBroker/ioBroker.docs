---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.brightsky/README.md
title: ioBroker.brightsky
hash: BkRkTk4HUX4ubKUhGtTQc4ARD9fxGV4PF5JqOiztYic=
---
![Логотип](../../../en/adapterref/iobroker.brightsky/admin/brightsky.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.brightsky.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.brightsky.svg)
![Количество установок](https://iobroker.live/badges/brightsky-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/brightsky-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

# ioBroker.brightsky

## Адаптер Brightsky для ioBroker

## Что такое API Bright Sky:

API Bright Sky — это бесплатный общедоступный API, предоставляющий метеорологические данные от Немецкой метеорологической службы (DWD). Он был разработан для упрощения доступа к этим данным, поскольку исходные данные DWD часто имеют сложные для интерпретации форматы. Bright Sky преобразует эти данные в удобный формат JSON и делает их доступными через API.

Вот более подробное объяснение:

**Цель:** API Bright Sky призван сделать метеорологические данные Немецкой метеорологической службы (DWD) легкодоступными для разработчиков и других заинтересованных сторон.

**Источник данных:** Данные получены от DWD и включают метеорологические наблюдения со станций, а также прогнозы погоды, такие как модели MOSMIX.

**Формат:** API Bright Sky предоставляет данные в формате JSON, что упрощает интеграцию в приложения и веб-сайты.

**Доступ:** API является общедоступным и может использоваться без ключа API, что снижает порог входа.

**Открытый исходный код:** Проект является проектом с открытым исходным кодом, что означает, что исходный код находится в открытом доступе и может быть доработан сообществом.

**Преимущества:** API Bright Sky предлагает простой способ доступа к данным о погоде, которые в противном случае было бы сложно обрабатывать, и является бесплатным, что делает его привлекательным вариантом для многих проектов.

---

## Какие данные можно использовать по сравнению с другими адаптерами?

Текущие данные о погоде обновляются циклически дважды в час системой DWD. Учитываются данные о погоде с ближайшей метеостанции DWD (Немецкая метеорологическая служба). Если данные о погоде недоступны, они автоматически заполняются с использованием второй, третьей и т. д. метеостанции в качестве резервной. Резервные данные для соответствующих метеостанций можно найти в адаптере.

Помимо высокого качества данных, особый интерес представляют данные о солнечной энергии и солнечном излучении:

<img width="1200" height="444" alt="image" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />  

Поскольку значения из точки данных`brightsky.0.current.solar_60` Например, значения указаны в кВт·ч/м² и уже выражены как энергия на 1 час, то есть значение`multiplied by 1000` Также может быть выражено в Вт/м².

Пример глобального излучения (Вт/м²)<img width="1200" height="224" alt="image" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />

---

## Адаптер:

### Установка:

В отличие от многих других адаптеров, регистрация не требуется.

Геокоординаты местоположения можно импортировать либо непосредственно из браузера, либо из ioBroker.<img width="108" height="59" alt="image" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />

<img width="1096" height="803" alt="image" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />  

### Структура объекта:

Предоставлены следующие данные:<img width="183" height="156" alt="image" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />

- Текущая погода — текущее состояние погоды (см. также: <https://brightsky.dev/docs/#/operations/getCurrentWeather> )
- ежедневно - текущий прогноз погоды на следующее настраиваемое количество дней (см.`forecastDays` (конфигурация, по умолчанию 7 дней)
  - `daily.XX.hourly` - необязательные вложенные почасовые данные в рамках соответствующего дня (управляется`hourlyForecastDays` ; присутствует только в течение первых N дней; 0 = отключено)
  - `daily.XX.day` /`daily.XX.night` - сводные данные за день (сутки/ночи)
- почасовой — список почасовых прогнозов на следующие N часов (см.`hours` конфигурация; независимо от вложенных`daily.XX.hourly` функция; см. также: <https://brightsky.dev/docs/#/operations/getWeather> )
- Радар — прогноз осадков на следующие 2 часа с интервалом в 5 минут, в мм за 5 минут. Включает максимальные значения по всем ячейкам сетки и кумулятивные суммы по всем областям сетки (см. также: <https://brightsky.dev/docs/#/operations/getRadar> )

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.1 (2026-08-10)
- (ticaki) Fixed: radar `max_precipitation_forecast.*_sum` cumulative values were inflated because precipitation was summed across whole grid columns and scaled with `radarDistance`; the cumulative forecast now accumulates each grid cell over time and reports the maximum single location
- (ticaki) Changed: radar precipitation forecasts now report `null` instead of `-1` when no radar data is available
- (ticaki) Fixed: temporary API failures are retried automatically, so short Bright Sky outages no longer leave the data stale
- (ticaki) Changed: temporary API problems (e.g. `500 Internal Server Error`) are logged as warnings instead of errors with a stack trace
- (ticaki) Changed: more precise sunrise/sunset times and solar yield estimate (suncalc 2.x)
- (ticaki) Fixed: days without sunrise or sunset (polar day/night) are handled correctly

### 1.2.0 (2026-06-02)
- (ticaki) Added `conditionUI` (translated condition text) to `current` and `hourly.NN`, matching the existing `daily.NN.conditionUI` [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Added a config option to choose the language for weather texts independent of the ioBroker system language [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Requires Node.js >= 22 now; repository checker fixes (i18n, docs, tooling)
- (ticaki) Fixed: `daily.NN.day` aggregations stayed null/zero when `position` was not a valid `latitude,longitude`; the adapter now logs a clear error instead of producing empty data

### 1.1.0 (2026-03-23)
- (ticaki) Fixed: DWD station ID was incorrectly logged as WMO station ID fixes [#91](https://github.com/ticaki/ioBroker.brightsky/issues/91)
- (cavernerg) Added nested hourly forecast data under `daily.XX.hourly.YY` (0 = disabled)
- (cavernerg) Added configurable number of forecast days (`forecastDays`, default 7)
- (cavernerg) Admin UI restructured into labeled sections (Location, Forecast, Current Weather, Radar)

### 1.0.1 (2026-02-20)
- (ticaki) sunrise and sunset fixed

### 1.0.0 (2026-01-10)
- (ticaki) fixed: states/timezone/translation
- (ticaki) Customisable update interval for Daily (expert)
- (ticaki) BREAKING: remove forHomoran states