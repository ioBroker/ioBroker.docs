---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.brightsky/README.md
title: ioBroker.brightsky
hash: NA9qxVeYgOL98VT9tUOzLZLi5ioqx6JqOZFRZGs4wc8=
---
![Логотип](../../../en/adapterref/iobroker.brightsky/admin/brightsky.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.brightsky.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.brightsky.svg)
![Количество установок](https://iobroker.live/badges/brightsky-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/brightsky-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)

# IoBroker.brightsky
**Тесты:** ![Тестирование и выпуск](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

# Адаптер brightsky для ioBroker
## Что такое API Bright Sky:
Bright Sky API — это бесплатный общедоступный API, предоставляющий метеорологические данные от Немецкой метеорологической службы (DWD). Он был разработан для упрощения доступа к этим данным, поскольку исходные данные DWD часто представлены в форматах, трудно поддающихся интерпретации. Bright Sky преобразует эти данные в удобный формат JSON и предоставляет к ним доступ через API.

Вот более подробное объяснение:

**Цель:** API Bright Sky призван сделать метеорологические данные Немецкой метеорологической службы (DWD) легкодоступными для разработчиков и других заинтересованных сторон.

**Источник данных:** Данные поступают из DWD и включают в себя наблюдения за погодой со станций и прогнозы погоды, такие как модели MOSMIX.

**Формат:** API Bright Sky предоставляет данные в формате JSON, что облегчает интеграцию в приложения и веб-сайты.

**Доступ:** API является общедоступным и может использоваться без ключа API, что снижает порог входа.

**Открытый исходный код:** Проект имеет открытый исходный код, то есть исходный код находится в открытом доступе и может быть дополнительно разработан сообществом.

**Преимущества:** API Bright Sky предлагает простой способ доступа к данным о погоде, которые в противном случае было бы сложно обрабатывать, и является бесплатным, что делает его привлекательным вариантом для многих проектов.

---

## Какие данные можно использовать по сравнению с другими адаптерами?
Текущие данные о погоде циклически обновляются службой погоды Германии (DWD) два раза в час. Учитываются данные с ближайшей метеостанции DWD (Немецкая метеорологическая служба). Если данные о погоде недоступны, они автоматически заполняются с использованием данных второй, третьей и т.д. метеостанции в качестве резервной. Резервные данные для соответствующих метеостанций можно найти в адаптере.

Помимо высокого качества данных, особый интерес представляют данные по солнцу и солнечной энергии:

<img width="1200" height="444" alt="изображение" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />

Так как значения из точки данных `brightsky.0.current.solar_60`, например, приведены в кВт·ч/м² и уже выражены как энергия за 1 час, значение `multiplied by 1000` также может быть выражено в Вт/м².

Пример глобальной радиации (Вт/м²) <img width="1200" height="224" alt="изображение" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />

---

## Адаптер:
### Установка:
В отличие от многих других адаптеров, учетная запись не требуется.

Геокоординаты местоположения можно импортировать либо напрямую из браузера, либо из ioBroker. <img width="108" height="59" alt="изображение" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />

<img width="1096" height="803" alt="изображение" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />

### Структура объекта:
Предоставляются следующие данные: <img width="183" height="156" alt="изображение" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />

* current - текущая погода (см. также: https://brightsky.dev/docs/#/operations/getCurrentWeather )
* ежедневно - текущий прогноз погоды на ближайшие 8 дней (создается адаптером и не является частью API)
* почасовой - текущий прогноз погоды на следующие определенные n часов (см. также: https://brightsky.dev/docs/#/operations/getWeather )
* радар — прогноз осадков на ближайшие 2 часа с 5-минутными интервалами, значения в мм за 5 минут. Включает максимальные значения по ячейкам сетки и кумулятивные суммы по всем областям сетки (см. также: https://brightsky.dev/docs/#/operations/getRadar )

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.5 (2025-10-04)
- (ticaki) Added leading zero to 5-minute radar datapoint folders for correct sorting in UI

### 0.6.3 (2025-10-04)
- (ticaki) Added Beaufort wind force scale datapoints (wind_force and wind_force_desc) based on wind_speed_10
- (ticaki) Fixed radar precipitation unit conversion - API values are in 0.01mm per 5 minutes, now correctly converted to mm
- (ticaki) Added cumulative precipitation states (next_Xmin_sum) showing maximum precipitation sum across all grid areas
- (ticaki) Added descriptions to max_precipitation_forecast states indicating "mm per 5 minutes"

### 0.6.2 (2025-10-02)
- (ticaki) Flag set to activate language

### 0.6.1 (2025-10-02)
- (ticaki) Added optional createRadarData configuration to make detailed radar.data folder optional fixes [#45](https://github.com/ticaki/ioBroker.brightsky/issues/45)
- (ticaki) Added weekday name datapoints (short and long) to daily weather data fixes [#41](https://github.com/ticaki/ioBroker.brightsky/issues/41)

### 0.6.0 (2025-09-30)
- (ticaki) Added weather radar feature with 2-hour precipitation forecast
- (ticaki) Radar data shows precipitation in mm with average, min, max, and median values
- (ticaki) Configurable radar polling interval (5+ minutes, auto-rotates data every 5 min)
- (ticaki) Added max precipitation forecast states for next 5, 10, 15, 30, 45, 60, 90 minutes

### 0.5.2 (2025-09-28)
- (ticaki) New data point wind_gust_speed_max for role value.speed.max.wind
- (ticaki) role checked

### 0.5.1 (2025-09-27)
- (ticaki) more robust fetch usage

### 0.5.0 (2025-09-26)
- (ticaki) Icons provided by icebear added fixes #31

### 0.4.0 (2025-09-24)
- (ticaki) Code migration from axios to node:fetch

### 0.3.5 (2025-09-20)
- (ticaki) Corrected roles for visualisation (lovelance) fixes #28

### 0.3.4 (2025-09-19)
- (ticaki) fixed too low limit for currently updates

### 0.3.3 (2025-09-19)
- (ticaki) update current at sunrise and sunset (unless custom interval is too large)
- (ticaki) added inverter limiting

### 0.3.2 (2025-09-17)
- (ticaki) Solar estimation calculation revised

### 0.3.1 (2025-09-15)
- (ticaki) Fixed data evaluation crash when no panels are defined  
- (ticaki) state name fixed

### 0.3.0 (2025-09-15)
- (ticaki) Added experimental datapoint for solar energy estimation (daily and hourly)  
- (ticaki) Wind bearing text is now translated into ioBroker system language  
- (ticaki) Added new datapoint for MDI icons support  
- (ticaki) Add day and night objects in addition to daily objects fixes [#11](https://github.com/ticaki/ioBroker.brightsky/issues/11)
- (ticaki) Enhanced day and night support with dedicated day/night icons

### 0.2.4 (2025-08-28)
* (ticaki) Create all folders

### 0.2.3 (2025-08-27)
* (ticaki) wind bearing text added
* (ticaki) update deps

### 0.2.2 (2025-08-22)
* (ticaki) Sunrise and sunset times added to the daily overview.

### 0.2.1 (2025-08-20)
* (ticaki) Startup log entry fixed.

### 0.2.0 (2025-08-20)
* (ticaki) DWD station ID added
* (ticaki) WMO station ID added
* (ticaki) Deactivation of data options added

### 0.1.1 (2025-08-19)
* (ticaki) Reduce required Nodej's version to 20

### 0.1.0 (2025-08-19)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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