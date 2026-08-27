---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-tibberlink/README.md
title: ioBroker.vis-2-widgets-tibberlink
hash: X6Db+uWN+Bz9V0ZoKn1m9nOnxIoH2alS7CFXEzJb6iI=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/admin/vis-2-widgets-tibberlink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)
![Количество установок](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-tibberlink.png?downloads=true)

# IoBroker.vis-2-widgets-tibberlink
**Тесты:** ![Тестирование и выпуск](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер vis-2-widgets-tibberlink для ioBroker
Виджеты VIS-2 для визуализации данных о динамических тарифах на электроэнергию Tibber: текущая цена, самый дешевый временной интервал и ежемесячная стоимость.

Более подробная информация о Tibber и его динамических тарифах: <https://tibber.com/>

## Предварительные условия
Этот адаптер виджетов **не** получает никаких данных из самого Tibber. Он считывает состояния, созданные адаптером данных [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Перед использованием этих виджетов установите и настройте `tibberlink`:

1. Установите `iobroker.tibberlink` и введите свой токен API Tibber (полученный по адресу <https://developer.tibber.com/settings/accesstoken>).
2. В настройках Tibberlink включите параметр **"Получение исторических данных о потреблении"** и установите количество ежедневных наборов данных не менее 31 (требуется для виджета 3).
3. Виджеты цен (виджеты 1 и 2) работают автоматически после запуска tibberlink — каналы калькулятора не требуются.

Ваш **идентификатор домашней страницы** — это UUID, видимый в дереве объектов ioBroker в разделе `tibberlink.0.Homes.<UUID>`, например, `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Виджеты
### Виджет 1 — Текущая цена Tibber
![Текущая цена Тиббера](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Strompreis.png)

Отображает текущую цену на электроэнергию крупным шрифтом, цветовой код уровня (ОЧЕНЬ ДЕШЕВО … ОЧЕНЬ ДОРОГО), время действия и, при необходимости, подробную разбивку стоимости.

| Вариант | По умолчанию | Описание |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Общая цена в €/кВтч |
| `oid_tax` | `…CurrentPrice.tax` | Налоги/доплаты в €/кВтч |
| `oid_level` | `…CurrentPrice.level` | Строка уровня цены |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-метка времени текущего часа |
| `show_breakdown` | `true` | Отображение плиток энергии и налогов |
| `currency` | `ct/kWh` | Надпись на единицу товара отображается после цены |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |

---

### Виджет 2 — Самый дешевый временной интервал
![Самый дешевый временной промежуток](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Cheapest-Window.png)

Использует алгоритм скользящего окна для поиска самого дешевого последовательного N-часового блока в сегодняшних (и, при необходимости, завтрашних) данных о ценах. Отображает время начала и окончания, среднюю цену и цветовую гистограмму. Длительность интервала (15 мин / 60 мин) определяется автоматически.

| Вариант | По умолчанию | Описание |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-массив сегодняшних ценовых интервалов |
| `amount_hours` | `3` | Размер окна в часах |
| `future_only` | `true` | Игнорировать слоты, которые уже закончились |
| `show_tomorrow` | `true` | Включить цены на завтра |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |

---

### Виджет 3 — Потребление энергии в реальном времени
Отображает потребление электроэнергии в режиме реального времени крупным шрифтом, а также минимальные, средние и максимальные значения, суммарное суточное потребление и стоимость. Требуется устройство **Tibber Pulse**, подключенное к вашему счетчику.

| Вариант | По умолчанию | Описание |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Текущая мощность в Вт |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Среднее время сессии в Вт |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Максимальное количество сеансов в Вт |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Суточное потребление в кВт·ч |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Ежедневная стоимость в € |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |

---

### Виджет 4 — Ежемесячная стоимость электроэнергии
![Ежемесячная стоимость электроэнергии](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Monatskosten.png)

Агрегирует данные о потреблении tibberlink `jsonDaily` за текущий календарный месяц. Отображает общую стоимость, общее потребление, среднюю цену, прогноз на конец месяца и индикатор выполнения, показывающий, насколько продвинулся месяц. Требуется включить **получение исторических данных о потреблении** в tibberlink с ежедневным количеством наборов данных не менее 31.

| Вариант | По умолчанию | Описание |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-массив записей о ежедневном потреблении |
| `show_base_fee` | `false` | Добавить фиксированную ежемесячную базовую плату к итоговой сумме |
| `base_fee_per_month` | `0` | Базовая плата в евро (используется, когда включен `show_base_fee`) |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |
| `tib_darkmode` | `true` | Темная (по умолчанию) или светлая тема |

## Документация
- 🇬🇧 Английский — этот файл
- 🇩🇪 [Deutsch](docs/de/README.md)
- 🇷🇺 [Русский](docs/ru/README.md)
- 🇳🇱 [Nederlands](docs/nl/README.md)
- 🇫🇷 [Французский](docs/fr/README.md)
- 🇮🇹 [Итальянский](docs/it/README.md)
- 🇪🇸 [Испанский](docs/es/README.md)
- 🇵🇱 [Польский](docs/pl/README.md)
- 🇵🇹 [Португальский](docs/pt/README.md)
- 🇺🇦 [Українська](docs/uk/README.md)
- 🇨🇳 [简体中文](docs/zh-cn/README.md)

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.4.5 (2026-04-29)
* (ssbingo) Fix common.news to remove unpublished versions; fix Dependabot config for src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Fix widget build output directory so vis-2 can load customWidgets.js from the correct path

### 0.4.3 (2026-04-29)
* (ssbingo) Add widget screenshots to documentation

### 0.4.2 (2026-04-29)
* (ssbingo) Fix widget file path so vis-2 can load customWidgets.js correctly

### 0.4.1 (2026-04-29)
* (ssbingo) Fix live view widget positioning; fix monthly cost widget showing previous month instead of current month

### 0.4.0 (2026-04-28)
* (ssbingo) Migrate all widgets to React/Module Federation (proper install/uninstall lifecycle, no more widgets.html patching)

### 0.3.3 (2026-04-26)
* (ssbingo) Update documentation

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: replace price chart with TibberCheapestWindow (cheapest N-hour sliding window with sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: rename oid_price→oid_total, add oid_startsAt, show_breakdown and currency options

### 0.3.0 (2026-04-24)
* (ssbingo) New widget: monthly electricity cost with consumption, avg. price and projection

Older changelog entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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