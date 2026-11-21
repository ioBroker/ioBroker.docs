---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meteonomiqs/README.md
title: ioBroker.meteonomiqs
hash: +MspArVqcrGGytPar66V+P6X2ukIe2XTZ9GtFYqUMVc=
---
![Логотип](../../../en/adapterref/iobroker.meteonomiqs/admin/meteonomiqs.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.meteonomiqs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meteonomiqs.svg)
![Количество установок](https://iobroker.live/badges/meteonomiqs-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/meteonomiqs-stable.svg)
![Лицензия](https://img.shields.io/github/license/Schimi1983/ioBroker.meteonomiqs)
![Тестирование и выпуск](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.meteonomiqs.png?downloads=true)
![Спонсоры GitHub](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)

# ioBroker.meteonomiqs

**Deutsche Anleitung:** [docs/de/README.md](https://github.com/Schimi1983/ioBroker.meteonomiqs/blob/main/docs/de/README.md)

Прогноз погоды от **wetter.com** в вашем ioBroker: до 14 дней, почасово, с предупреждениями о погоде, восходом и закатом солнца. Вам понадобится только бесплатный ключ от wetter.com (Meteonomiqs).

---

## Быстрый старт

1. Получите бесплатный API-ключ от [Meteonomiqs](https://www.meteonomiqs.com/de/wetter-api/) .
2. Убедитесь, что ваше местоположение указано в ioBroker в разделе _Настройки → Система → Местоположение_ .
3. Установите адаптер в административной панели (вкладка _«Адаптеры_ », найдите «meteonomiqs»).
4. Откройте настройки экземпляра, вставьте ключ в **поле «Ключ API»** и нажмите _«Сохранить и закрыть»_ .

Готово. Адаптер сразу же получает прогноз, а затем три раза в день. Значения вы найдете в разделе... `meteonomiqs.0` на вкладке _«Объекты»_ . Изменять какие-либо другие настройки не требуется.

---

## Что вы получите

- **Ежедневный прогноз** на срок до 14 дней: температура, осадки, ветер, облачность, продолжительность солнечного сияния и многое другое.
- **Утро, день, вечер и ночь** каждого дня
- **Почасовые значения** на ближайшие дни
- **Текущий час** находится в отдельной папке. `current` Обновляется каждый час.
- **Предупреждения о погоде** в текстовом формате с указанием уровня опасности от 0 до 4.
- **Солнце и луна** : восход, закат, продолжительность дня, фазы луны.
- **Иконки погоды** с сайта wetter.com, готовые для визуализации.

---

## Используя значения

Наиболее важные данные:

| Что вы хотите                                               | Точка данных                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| Температура прямо сейчас                                    | `meteonomiqs.0.current.temp`                                 |
| Текущая погода (текст и иконка)                             | `current.weather_text`, `current.weather_icon`               |
| Сегодняшние минимумы и максимумы                            | `day_0.temp_min`, `day_0.temp_max`                           |
| Завтра будет дождь?                                         | `day_1.prec_probability` (в %), `day_1.prec_sum` (в мм)       |
| сила ветра                                                  | `current.wind_bft` (Бофорт 0–12), `current.wind_gusts` (км/ч) |
| Есть ли предупреждение о неблагоприятных погодных условиях? | `day_0.warn_active` (верно/неверно), `day_0.warn_text`        |
| Восход и закат солнца сегодня                               | `current.sunrise`, `current.sunset`                          |

`day_0` сегодня, `day_1` завтра, `day_2` послезавтра и так далее.

Несколько идей для скриптов или Blockly:

- **Защитите навес:** уберите его, когда... `current.wind_bft` достигает 6 или более.
- **Пропустите полив:** не поливайте сад, когда `day_0.prec_probability` выше 70.
- **Предупредите семью:** отправьте сообщение, когда `day_0.warn_active` становится истинным, при `day_0.warn_text` в качестве сообщения.

Для виджетов в VIS, Jarvis или Material весь прогноз представлен в одной точке данных: `forecast_json` (дней) и `hourly_json` (часы сегодняшнего дня).

Все значения являются **прогнозом** , а не измерением.

---

## Настройки

Настройки по умолчанию соответствуют бесплатному тарифному плану. Вам нужно ввести только ключ API. Все остальное необязательно.

### Вкладка «Общие»

| Параметр                                     | Что это делает                                                                                                              |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ключ API                                     | Ваш ключ от Meteonomiqs. **Обязательно.**                                                                                   |
| Используйте местоположение системы ioBroker. | По умолчанию включено. Отключите эту функцию, если хотите увидеть погоду для другого места, затем введите широту и долготу. |
| Язык текстов о погоде                        | Язык текста, например, "частично облачно". Пустой адрес означает язык вашего ioBroker.                                      |
| Прогнозируемые дни                           | От 1 до 14 (по умолчанию 7). Увеличение количества дней не влечет дополнительных затрат на звонки.                          |

### Вкладка "Расписание"

Когда адаптер получает прогноз погоды. По умолчанию: **01:10, 11:40 и 18:40** . Каждая строка требует одного вызова в день.

**Приоритет** указывает на важность запроса. 1 — самый важный. Если количество запросов за месяц окажется недостаточным, первым будет обработан запрос на строку с наибольшим номером. При стандартных настройках и бесплатном тарифе в обычный месяц этого не происходит.

### Вкладка «Ежемесячный лимит»

Бесплатный тарифный план позволяет **совершать 100 звонков в месяц** . Адаптер автоматически распределяет их по месяцу. Меняйте номер только в том случае, если у вас другой тарифный план.

### Вкладка «Данные»

Выберите, какие значения будут созданы. Включение дополнительных параметров **не потребует дополнительных вызовов** , только увеличит количество точек данных. Все параметры включены по умолчанию.

| Параметр                                                          | Что это делает                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Дневные разделы                                                   | Утро, день, вечер и ночь в течение дня                                                |
| Почасовые значения                                                | Одно значение в час, по умолчанию в течение 2 дней. На Raspberry Pi достаточно 1 дня. |
| Текущий час                                                       | Папка `current` с указанием текущих значений за час. Требуются почасовые значения.     |
| Прогноз в формате JSON                                            | `forecast_json` и `hourly_json` для виджетов                                           |
| Предупреждения о погоде, Солнце и луна, Давление/точка росы, Снег | Дополнительные точки данных, отключите то, что вам не нужно.                          |

### Экспертные настройки

Некоторые редко используемые настройки появляются только при включении **экспертного режима** в административной панели: минимальный интервал между двумя запросами (по умолчанию 5 часов), время ожидания ответа (20 секунд), повторные попытки после ошибки (1) и зарезервированные вызовы (5). Обычно они вам не нужны.

---

## Вопросы и проблемы

**Значения не изменяются после перезапуска.** Так и задумано. После каждого запуска адаптер сразу же выполняет одну выборку данных. Если следующая запланированная выборка данных должна состояться менее чем через 5 часов, она пропускается, чтобы сэкономить вызовы. Об этом сообщается в журнале, например: `Fetch "11:40" skipped …`.

** `info.status` Отображается сообщение "нет ключа API".** Введите ключ на вкладке _"Общие"_ и сохраните.

** `info.status` Отображается сообщение «Неверный ключ».** Ключ был отклонен. Проверьте его в своем аккаунте Meteonomiqs, введите его снова и сохраните.

** `info.status` Отображается сообщение «Местоположение отсутствует».** Укажите свое местоположение в разделе _«Настройки» → «Система» → «Местоположение»_ или отключите _опцию «Использовать местоположение системы ioBroker»_ и введите координаты.

**В журнале указано «Режим экономии» или «Аварийный режим».** Количество звонков в этом месяце ограничено, поэтому менее важные заказы приостановлены. С 1-го числа следующего месяца все вернется в норму.

** `info.requests_month` Это отличается от данных в моем аккаунте Meteonomiqs.** Адаптер считает звонки самостоятельно. В вашем аккаунте Meteonomiqs всегда все правильно.

**Папка `current` Остается пустым.** Требуются почасовые значения. Включите _почасовые значения_ на вкладке _«Данные»_ .

**Административная панель работает медленно.** Почасовые значения создают много точек данных. Сократите их до одного дня или отключите на вкладке _«Данные»_ .

Другие вопросы: [форум ioBroker](https://forum.iobroker.net/topic/85314) или [раздел "Проблемы" на GitHub](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) .

---

## Поддерживать

Адаптер бесплатен и останется бесплатным. Если он вам полезен и вы хотите выразить благодарность, вы можете поддержать разработку:

Сообщения об ошибках и предложения в разделе ["Проблемы"](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) также очень помогают.

---

<details>
<summary><b>For advanced users</b></summary>

### Все точки данных

```
meteonomiqs.0
├── info                      connection, status, last_sync, requests_month, requests_left,
│                             force_update (button: fetch now), reset_counter (button)
├── current                   the hour in progress (copied from day_N.hourly.HH every hour)
├── day_0 … day_N             daily values, warn_*, wind_bft, …
│   ├── astro                 sun and moon
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

- `day_N.spaces.night` Это ночь _после_ того дня.
- API отображает сильный ветер на значке (`d_w_60.svg`) независимо от официальных предупреждений; `wind_significant` показывает, когда это имеет место.
- `day_0` Обладает официальными функциями прогнозирования и распознается детектором типов ioBroker как прогноз погоды. Добавьте его в комнату или функцию на вкладке _«Перечисления»_ , чтобы использовать его в Material, IoT или устройствах.
- `info.force_update` Получает данные немедленно, игнорируя минимальный разрыв и приоритеты; применяется только месячный лимит.

### Как работает месячный лимит

Три запроса в день приводят к 93 вызовам за 31 день в месяце. Запрос с приоритетом N выполняется только до тех пор, пока оставшиеся вызовы по-прежнему охватывают N вызовов в день до конца месяца. Когда ситуация становится напряженной, сначала останавливается вечерний запрос, затем дневной; приоритет 1 переключается на выполнение через день вместо остановки.

| Отправная точка             | Использованные звонки | 01:10 | 11:40 | 18:40 |
| --------------------------- | --------------------- | ----- | ----- | ----- |
| Обычный месяц               | 93 / 100              | 31    | 31    | 31    |
| 20 звонков уже использованы | 98 / 100              | 31    | 31    | 16    |
| 40 звонков уже использованы | 99 / 100              | 31    | 28    | 0     |
| 70 звонков уже использованы | 100 / 100             | 30    | 0     | 0     |

Счетчик представляет собой приблизительную оценку, хранящуюся в адаптере; API не сообщает об оставшихся вызовах. Он снова обнуляется при создании нового экземпляра.

### Расписание

Каждая установка сдвигает время получения данных на несколько минут (до 15, определяемых по идентификатору установки), чтобы не все установки обращались к API в одну и ту же минуту. Используемое время записывается в журнал при запуске. Минимальный промежуток должен быть меньше самого короткого промежутка между двумя запросами; адаптер проверяет это при запуске.

### Разработка

```bash
npm install
npm run build
npm run lint
npm test
```

</details>

---

Данные о погоде © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com) . Этот адаптер не связан с wetter.com.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.11 (2026-10-30)

- State roles follow the ioBroker role catalogue more closely. The day values carry the official forecast roles (`value.temperature.max.forecast.0` for today, `.forecast.1` for tomorrow, …), so the ioBroker type detector recognises `day_0` as a weather forecast (Material, iot, devices). In `current` the felt temperature is now recognised as well
- Corrected roles: sunrise/sunset as "HH:MM" are `text` (a `date` role needs a full date; the `_iso` states keep `date.sunrise`/`date.sunset`), felt temperature `value.temperature.windchill`, weekday `dayofweek`, snow line `value.snowline`, fresh snow and snow amount `value.snow`, warning level `value.severity`, location `location`, JSON states `weather.json`. The short wind direction is `text`, so it no longer competes with the long one
- Value ranges (`min`/`max`) for percentages, wind force (0–12), wind direction (0–360°) and warning level (0–4)
- Existing installations take over the new roles automatically on the next start. Values and history are kept

### 0.2.10 (2026-10-29)
- Easier to set up for beginners: the settings page starts with a short "Getting started" box, the help texts are written in plain words, and rarely needed options (minimum gap, waiting time, retries, reserve) only show in expert mode. The tab "API budget" is now called "Monthly limit". Nothing changes for an existing installation
- README and German guide rewritten in plain words, with examples for everyday use; technical details moved to a collapsed section
- Support links (GitHub Sponsors, PayPal) in the README, in `package.json` (`npm fund`) and as an optional section at the bottom of the *General* tab. Nothing changes for an installation

### 0.2.9 (2026-10-15)

- A fetch skipped because of the cooldown ("Minimum hours between updates") is now logged at info level, e.g. `Fetch "11:40" skipped: last fetch 3.0 h ago, minimum gap is 5 h`. The typical case is the first scheduled fetch after an adapter update or a host restart, because both trigger a startup fetch. Until now such a skip only showed as an `info.last_sync` that did not move
- One info line per fetch instead of two: `Forecast updated (11:40): 14 days.` The line announcing the request moved to debug
- README reworked for beginners: quick start, every setting with its default per admin tab, a troubleshooting table. New German guide in `docs/de/README.md`

### 0.2.8 (2026-09-30)

- New state `wind_bft` in the day, day-section and hourly values, and with that in `current`: the wind force on the Beaufort scale (0-12), derived from the average wind speed. Handy for scripts that react to wind strength without converting km/h themselves, e.g. retracting an awning from force 6
- Objects deleted in the object browser while the adapter is running are created again on the next fetch. Until now they only came back after a restart of the instance, and every write in between was logged as "has no existing object"

### 0.2.7 (2026-09-06)

- Raised the required `@iobroker/adapter-core` to `^3.4.3` (`[W0034]`) and the release-script license plugin to `^5.2.2` (`[S0064]`). Both caret ranges already resolved to those versions; only the declared minimums lagged behind, so nothing changes at runtime

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <github@world-mg.de>

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