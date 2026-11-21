---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: ohFwfLftqLWdBaZcoyeWiFGb/DqV2snCxGgu+Vbb4C4=
---
![Логотип](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![Количество установок](https://iobroker.live/badges/weatherunderground-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.weatherunderground/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/weatherunderground/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)

# ioBroker.weatherunderground

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

## Sentry

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Функциональность

Текущие измерения метеостанции, прогнозы погоды на 36 часов и шесть прогнозов на сутки от [Weather Underground](https://www.wunderground.com/) , а также, по желанию, региональные данные о погоде и качестве воздуха от Weather Company.

По умолчанию данные извлекаются один раз в час. Измените расписание экземпляра, чтобы настроить частоту.

## Требования

Для текущей версии для разработчиков требуется Node.js **22+** , js-controller **6.0.11+** и Admin **8.2.0+** .

## Конфигурация

PWS расшифровывается как **Personal Weather Station (персональная метеостанция)** , это частная метеостанция. Измерения станции описывают наблюдаемую погоду; прогнозы описывают ожидаемую погоду.

### коммутаторы данных

| Ключ                   | По умолчанию | Данные и идентификаторы штатов                                                                                                                                                                                                                                                                                   |
| ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `current`              | `true`       | На станции проводились измерения температуры, влажности, ветра, давления, осадков, УФ-излучения, солнечной радиации и осуществлялся контроль качества. `forecast.current.*`.                                                                                                                                     |
| `regionalCurrent`      | `false`      | **Дополнительные данные о погоде и качестве воздуха** от Weather Company: описание погоды, значок, видимость и качество воздуха в окрестностях. Требуется `current: true`, действительные координаты станции и ключ веб-сайта. Используется `forecast.current.*` и в сумме составляет три запроса за один запуск. |
| `forecast_hourly`      | `true`       | До 36 почасовых заявок в рамках `forecastHourly.0h` –`forecastHourly.35h` плюс сводные данные.                                                                                                                                                                                                                    |
| `forecast_periods`     | `true`       | Шесть календарных дат ниже `forecast.0d` –`forecast.5d` Начиная с сегодняшнего дня.                                                                                                                                                                                                                               |
| `forecast_periods_txt` | `true`       | До 12 последовательных периодов смены дня и ночи для текста и значков. `forecastPeriod.0p` –`forecastPeriod.11p` Делится ежедневным ответом с `forecast_periods`.                                                                                                                                                 |

### Расположение и отображение

| Ключ                   | Значение                                                                                                                                                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country`              | Двухбуквенный код страны для поиска местоположения; значение по умолчанию. `DE`.                                                                                                                                                                                                         |
| `language`             | Язык текстовых сообщений о погоде: `DL` Немецкий, `EN` Английский, `RU` Русский или `NL` Голландский язык. Не зависит от языка административного интерфейса.                                                                                                                                 |
| `location`             | Название местоположения, код аэропорта или координаты. Пустое поле для начального местоположения заполняется координатами системы ioBroker, если таковые имеются.                                                                                                                        |
| `station`              | Необязательный идентификатор предпочтительной станции. Если поле пустое, поставщик выбирает станцию для данного местоположения. Поле отображается, когда `current` включено.                                                                                                              |
| `nonMetric`            | `false` для метрических значений; `true` для имперских единиц измерения, таких как °F и мили. При инициализации пустого местоположения диалоговое окно также отображает единицу измерения системной температуры. Концентрации загрязняющих веществ в воздухе всегда указываются в мкг/м³. |
| `iconSet`              | Скрытая настройка совместимости. A–K используют одни и те же SVG-иконки версии 4, если не указан пользовательский URL-адрес.                                                                                                                                                             |
| `custom_icon_base_url` | Необязательный базовый URL-адрес для файлов числовых значков. Непустой URL-адрес позволяет использовать пользовательские значки; оставьте поле пустым для стандартных значков.                                                                                                           |
| `custom_icon_format`   | Пользовательское расширение: GIF, PNG, SVG или JPG; по умолчанию используется GIF, если оно отсутствует.                                                                                                                                                                                 |

Скрытые настройки сохраняют свои значения. Диалоговое окно объединяет пункты «Страна/Язык» и «Местоположение/Станция».

### API-ключи

`apiKey` Это необязательный ключ владельца PWS, зашифрованный при хранении и защищенный от обычного доступа внешних адаптеров. Существующие ключи переносятся автоматически; см. раздел [«Обновление ключей API»](#api-key-upgrades) .

Адаптер также считывает ключ, используемый на сайте Weather Underground:

- При проведении наблюдений на станции используется ключ владельца, когда станция и `current` настроены; в противном случае используется ключ веб-сайта.
- В ежедневных прогнозах используются координаты станции с ключом владельца, если он доступен, или с ключом веб-сайта в противном случае. Без координат станции используется извлеченный URL/ключ веб-сайта.
- Почасовые прогнозы и региональные продукты используют ключ веб-сайта, даже если настроен ключ владельца.

Доступность ключей и продуктов контролируется поставщиком.

Без указанного идентификатора станции адаптер использует идентификаторы станции и местоположения с веб-сайта для указанного местоположения для формирования URL-адресов продуктов. Если необходимые URL-адреса продуктов недоступны, он пропускает запросы данных и регистрирует одну ошибку за каждый запланированный запуск. Проверьте указанное местоположение или выберите идентификатор станции PWS.

## Источники данных и запросы

Прямые конечные точки продукта используют `https://api.weather.com`:

| Конечная точка                 | Запрос был сделан, когда                                                                   | Предоставляет                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/v2/pws/observations/current` | Каждый цикл приобретений, включая случаи, когда `current` выключено                         | Для составления прогнозов необходимы данные наблюдений и координаты станции. `current` контролирует публикацию результатов измерений. |
| `/v3/wx/forecast/daily/5day`   | `forecast_periods` или `forecast_periods_txt` включено                                      | Шесть календарных дат и соответствующие им периоды дня и ночи.                                                                       |
| `/v3/wx/forecast/hourly/2day`  | `forecast_hourly` включено                                                                 | Данные почасовые; адаптер публикует первые 36 записей.                                                                               |
| `/v3/wx/observations/current`  | `current` и `regionalCurrent` включены, имеют действительные координаты и ключ к веб-сайту. | Региональное описание погоды, значок и видимость.                                                                                    |
| `/v3/location/point`           | Те же региональные требования                                                              | А `placeId` координаты станции, используемые в запросе на анализ качества воздуха.                                                    |
| `/v3/wx/globalAirQuality`      | Разрешение местоположения вернуло действительный результат. `placeId`                       | Индекс качества воздуха EPA, рекомендации и подробная информация о шести загрязняющих веществах.                                     |

Если прямой путь к станции/координатам недоступен, адаптер использует URL-адреса поставщика, полученные со страницы Weather Underground. Региональные продукты используют координаты из ответа станции и могут представлять другой источник и время наблюдения, отличающиеся от измерений станции.

### Сокращение количества запросов

- Держать `regionalCurrent` Отключить, чтобы избежать всех трех региональных запросов.
- Повернуть `forecast_hourly` Отключить, чтобы избежать почасовой оплаты.
- Поверните **оба** `forecast_periods` и `forecast_periods_txt` Отключено, чтобы избежать ежедневного общего запроса.
- Поворот `current` Функция off останавливает обновление состояния станции и предотвращает региональные запросы, но запрос станции для получения прогнозируемых координат всё равно выполняется.

Успешный прямой запуск с включенными прогнозами использует три запроса данных: станционные, ежедневные и почасовые. Региональные данные добавляют еще три запроса; ошибка определения местоположения препятствует последующему запросу данных о качестве воздуха. Обнаружение веб-сайта/ключа, повторные попытки и восстановление могут привести к дополнительным HTTP-запросам.

## Ссылка на штат

| Штаты                                                                      | Значение                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forecast.current.*`                                                       | Текущие наблюдения, несмотря на исторические обстоятельства. `forecast` Префикс. Температура, влажность, ветер и осадки поступают со станции. `qualityControl` это его основной код контроля качества.                                           |
| `forecast.current.weather`, `.iconURL`, `.visibility`                      | Дополнительно можно указать региональное описание погоды, URL-адрес значка с числовым кодом и видимость.                                                                                                                                       |
| `forecast.current.airQualityIndex`                                         | Дополнительный числовой индекс EPA, не имеющий физических единиц измерения. Категория, основной загрязнитель, источник и общие/информационные рекомендации для чувствительных групп населения указываются отдельно.                            |
| `forecast.current.airQuality.CO`, `.NO2`, `.O3`, `.PM10`, `.PM2_5`, `.SO2` | Каждый загрязняющий вещество имеет `amount` в мкг/м³, это EPA. `index` и `category` Это региональные данные, а не результаты измерений на станциях.                                                                                               |
| `forecastHourly.0h` –`forecastHourly.35h`                                  | Почасовые значения, включая `windGust`, `dewPoint`, `windChill`, `stateShort` и `precipitationType` (например `rain` или `snow`). `0h` означает **«Следующий почасовой прогноз»** , первая запись в API; проверьте `.time` для его временной метки. |
| `forecast.0d` –`forecast.5d`                                               | Ежедневные значения, включая полное описание. `.state` краткое описание `.stateShort`, `sunrise`, `sunset`, `moonrise`, `moonset` и `moonPhase` Время суток (солнечная/лунная фаза) сохраняет смещение UTC, установленное поставщиком услуг.      |

Ежедневные короткие тексты, повествования и значки используют то же дневное время или оставшийся период ночи. Далее следуют описания. `language` Региональные описания не заменяют измерения на станциях, а прогнозы не заменяют текущие наблюдения. Существующие идентификаторы и пользовательские названия объектов сохраняются.

### Отсутствуют данные и отключены некоторые параметры.

- Отсутствует или `null` УФ-излучение и солнечное излучение станции производят `0`.
- Отсутствующие или некорректные региональные значения приводят к `null` Региональные поля также свободны для `null` при обработке данных станционных наблюдений с помощью `regionalCurrent` Отключено. Дополнительные региональные сбои не приводят к отмене измерений или прогнозов станции.
- Без обрабатываемых данных наблюдений на станции существующие значения могут оставаться неизменными.
- Отключенные переключатели сохраняют свои объекты и ранее сохраненные значения; они не удаляют исторические данные. Региональная очистка осуществляется в соответствии с вышеуказанным правилом.

## Иконки

Текущий API возвращает числовые коды. Сохраненные встроенные настройки A–K используют одни и те же значки SVG версии 4, например, [32.svg](https://www.wunderground.com/static/i/c/v4/32.svg) . Избыточный селектор скрыт. Введите пользовательский базовый URL-адрес, чтобы использовать собственные значки, или снимите его, чтобы использовать стандартные значки.

Пользовательские поля URL и формата всегда доступны для редактирования, независимо от сохраненных данных. `iconSet` значение. Существующие непустые пользовательские URL-адреса имеют приоритет над настройками A–K. Например, базовый URL-адрес. `https://example.com/weather-icons/` и код разрешения формата PNG `32` к `https://example.com/weather-icons/32.png` Хост должен предоставить файлы для каждого кода, возвращаемого поставщиком; предварительные коды `0`, `12`, `26` и `32` Это лишь примеры.

Устаревшие именованные значки, такие как `clear.gif` и `nt_clear.gif` Не соответствуют числовым кодам. Адаптер не преобразует коды в эти имена файлов; старые каталоги A–K непригодны в качестве пользовательских базовых файлов для текущего API.

## Обновление API-ключей

В более ранних версиях ключ хранился в открытом виде. `apikey` Теперь адаптер использует зашифрованный/защищенный протокол. `apiKey` При первом запуске или сохранении настроек старое значение переносится и `apikey` Очищено; запросы погоды ожидают завершения миграции при запуске. Существующий непустой `apiKey` Значения сохраняются. Если оба поля содержат разные непустые ключи, ни один из них не удаляется автоматически; сбои миграции останавливают запросы и записывают в журнал сообщение без значений ключей.

До первого запуска/сохранения устаревшее поле сохраняет свое старое поведение хранения и доступа к данным в открытом текстовом виде. Отключенные экземпляры переносятся только при запуске или сохранении. После обновления адаптера следует повторно открыть настройки, а не сохранять старое диалоговое окно.

Перед обновлением сделайте резервную копию ioBroker. Чтобы вернуться к версии, которая поддерживает только чтение, выполните откат. `apikey` Также необходимо восстановить соответствующую резервную копию конфигурации. Ключи, зашифрованные вручную из модифицированных/невыпущенных версий, требуют наличия исходных метаданных шифрования и не могут быть надежно идентифицированы после перезаписи этих метаданных.

## Сборка для разработки

Для сборки исходного кода требуется Node.js **версии 22.12+** в пределах поддерживаемого диапазона сред выполнения; Vite имеет более высокий минимальный уровень, чем среда выполнения адаптера. CI проверяет/собирает на Node.js версии 24 и тестирует на 22/24/26.

```sh
npm ci
npm run build
npm test
npm pack
```

Административные ресурсы находятся в `admin/src/` Сгенерировано `admin/custom/` Файлы игнорируются Git и не должны быть добавлены в репозиторий. Сборка выполняется до тестирования, упаковки или загрузки; обычные `npm pack` Автоматическая сборка не выполняется. Опубликованный npm-пакет содержит ресурсы пользовательского интерфейса, и `prepublishOnly` Пересобирает их для публикации. Для установки из исходного кода/Git установите собранный архив через ioBroker; для несобранной копии пользовательский интерфейс конфигурации не генерируется.

## Changelog

### **WORK IN PROGRESS**
- (reloxx13) Remove the disabled legacy API, dashboard key extraction and obsolete parser
- (copilot) Adapter requires node.js >= 22.19.0 now
- (reloxx13) Fix location-based website URL discovery and avoid cascading errors when required URLs are unavailable (#509)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.1 (2026-10-26)
- (reloxx13) Use the controller-managed startup delay instead of a custom wait function

### 4.0.0 (2026-10-26)
- (reloxx13) Use adapter-managed timers and termination while preserving cancellation during shutdown
- (mcm1957) Adapter requires Node.js >= 22, Admin >= 8.2.0 and js-controller >= 6.0.11 now
- (reloxx13) Read the website API key from the current Weather Underground page configuration (#509)
- (reloxx13) Request daily forecasts using station coordinates and the website key when no owner key is configured (#509)
- (reloxx13) Add opt-in regional weather descriptions, icons, visibility and detailed EPA air quality without replacing station measurements (#220, #388)
- (reloxx13) Add hourly gust, dew point, wind chill, weather text and precipitation type; daily sun/moon events and PWS quality status
- (reloxx13) Add short daily descriptions while preserving full narratives and consistent day/night selection (#388)
- (reloxx13) Match maximum-wind direction to the highest wind speed and preserve its numeric type
- (reloxx13) Show zero UV index and solar radiation when station fields are missing or null
- (reloxx13) Fix numeric icon URLs and previews; select custom icons by URL and correct existing icon URL object types without replacing user metadata (#216)
- (reloxx13) Rename the first hourly forecast to "Next hourly forecast" while preserving its 0h ID and custom names
- (reloxx13) Correct weather state roles without changing IDs, types, units or user metadata (#328)
- (reloxx13) End failed initialization reliably and cancel startup delays and provider requests during shutdown (#224)
- (reloxx13) Automatically migrate API keys to encrypted and protected storage
- (reloxx13) Replace the legacy settings dialog with JSON Config; clarify translated labels, help texts and field grouping
- (reloxx13) Document configuration switches, data sources, endpoints, request savings, API keys and source builds; correct the default refresh interval to once per hour (#501)
- (reloxx13) Fix hourly forecast requests, station coordinates and metric/non-metric provider paths (#497)
- (reloxx13) Skip the unused PWS dashboard request (#498)
- (reloxx13) Populate hourly weather codes, including zero (#499)
- (reloxx13) Use calendar-day minimum and maximum forecast temperatures (#500)
- (reloxx13) Limit the npm package to runtime and configuration assets and enable shared ESLint checks in CI

### 3.7.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.6.0 (2023-09-09)
* (mcm1957) Icon urls at admin ui have been adapted to weatherunderground website changes (#158)
* (mcm1957) Forecast periods have been extended

### 3.5.0 (2023-09-08)
* (mcm1957) Adapter now requires node 16 or newer
* (mcm1957) Dependencies have been updated
* (waldmensch1) Cloudcover states have been added (PR #178)
* (mcm1957) Date format has been fixed to avoid incorrect display with newer admin versions (#191)
* (mcm1957) Forecast urls have been adapted to weatherunderground website changes (#158)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 dschaedl <daniel.schaedler@gmail.com>, iobroker-community-adapters

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