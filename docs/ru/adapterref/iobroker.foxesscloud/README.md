---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.foxesscloud/README.md
title: Адаптер ioBroker для FoxESS Cloud
hash: j3tAwn9sZsaTptBNbAboNgwf1PDEDs9is5loNQ1Gvcw=
---
![Логотип](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Количество установок](https://iobroker.live/badges/foxesscloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/foxesscloud-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для FoxESS Cloud
---

## Что делает этот адаптер
Получает данные из API FoxESS Cloud для солнечных инверторов (например, используемых в системах Enpal) и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг производства солнечной энергии
- Отслеживание уровня заряда батареи (SoC)
- Анализ потребления электроэнергии из сети и выработки электроэнергии, подаваемой в сеть.
- Автоматизация на основе выработки электроэнергии
- Визуализация потоков энергии на панелях мониторинга ioBroker.

## Функции
### Значения мощности
- **`pvPower`**: Текущая выработка электроэнергии солнечными батареями (кВт)
- **`pv1Power` … `pv24Power`**: Мощность отдельных солнечных панелей (кВт) — автоматически создаются только те панели, которые подключены к устройству.
- **`generationPower`**: Общая мощность генерации/выходная мощность (кВт)
- **`нагрузка`**: Текущая нагрузка/потребляемая мощность (кВт)
- **`gridConsumption`**: Мощность, импортируемая из сети (кВт)
- **`feedinPower`**: Электроэнергия, экспортируемая в сеть (кВт)

### Батарея
- **`soc`**: Уровень заряда батареи (%)
- **`batCharge`**: Мощность зарядки аккумулятора (кВт)
- **`batDischarge`**: Мощность разряда батареи (кВт)
- **`batTemperature`**: Температура батареи (°C) — создается автоматически, когда устройство сообщает значение.

### Температура и состояние
- **`invTemperature`**: Внутренняя температура инвертора (°C) — создается автоматически, когда устройство сообщает значение; предупреждение в журнале появляется при ≥ 65 °C и ≥ 80 °C.
- **`runningState`**: Текущее состояние работы инвертора (строка)

### Состояние подключения
- **`info.connection`**: Состояние соединения

### Отчетность по энергопотреблению (необязательно)
При включении на вкладке *Отчетность* адаптер вычисляет итоговые суммы за период на основе кумулятивных значений за весь период, возвращаемых API:

- **`report.day.*`**: Сегодняшняя выработка электроэнергии, потребление электроэнергии из сети и электроэнергии (кВт·ч)
- **`report.week.*`**: Итоги этой недели (кВтч)
- **`report.month.*`**: Итоговые показатели за этот месяц (кВтч)
- **`report.year.*`**: Итоговые показатели за этот год (кВтч)

### Статистика потребления солнечной энергии в формате JSON (необязательно)
При включении на вкладке *Статистика* адаптер отслеживает накопленную энергию фотоэлектрических систем и публикует таблицы в формате JSON для использования на панелях мониторинга VIS — см. [Статистика потребления электроэнергии от фотоэлектрических систем в формате JSON для панелей мониторинга VIS](#pv-power-json-statistics-for-vis-dashboards) ниже.

### Ограничение скорости запросов к API (Открытый API)
[Открытый API FoxESS](https://www.foxesscloud.com/public/i18n/en/OpenApiDocument.html) разрешает **1440 вызовов в день на один API-ключ** (а не на один экземпляр адаптера). Использование в **приложении** или **веб-портале** FoxESS не учитывается в этой квоте Open API.

| Настройка | Количество вызовов API в день (24 ч) |
|-------|--------------------------|
| 1 случай с интервалом 60 с | 1440 (полная квота) |
| 2 случая по 60 с (один и тот же ключ API) | ~2880 → лимит часто превышается примерно через 12 ч |
| 1 случай с интервалом 120 с | 720 |

При рекомендуемом интервале в **60 секунд** один экземпляр использует всю суточную квоту (1440 минут = 24 часа).

**Важно:** Все клиенты Open API, использующие один и тот же ключ API, используют одну квоту — например, несколько экземпляров ioBroker, интеграции с Home Assistant или скрипты. Превышение лимита может привести к периодическим ошибкам API (например, `40400`, `40402`). Проверьте оставшиеся вызовы на портале FoxESS в разделе **Профиль → Управление API**.

Для подключения дополнительных инверторов создайте один экземпляр адаптера на каждое устройство (один серийный номер на каждый экземпляр) и спланируйте интервал опроса соответствующим образом, или используйте отдельные ключи API, если это позволяет ваша учетная запись.

## Точки данных
Адаптер создает следующие точки данных:

### Энергия в реальном времени (создается постоянно)
- `foxesscloud.0.pvPower` - Мощность фотоэлектрических панелей (кВт)
- `foxesscloud.0.generationPower` - Мощность/выход генерации (кВт)
- `foxesscloud.0.soc` - Уровень заряда батареи (%)
- `foxesscloud.0.load` - Мощность нагрузки (кВт)
- `foxesscloud.0.gridConsumption` - Потребление/импорт электроэнергии из сети (кВт)
- `foxesscloud.0.feedinPower` - Мощность, поступающая в сеть/экспорт (кВт)
- `foxesscloud.0.batCharge` - Мощность зарядки аккумулятора (кВт)
- `foxesscloud.0.batDischarge` - Мощность разряда батареи (кВт)
- `foxesscloud.0.runningState` - Состояние работы инвертора
- `foxesscloud.0.info.connection` - Состояние подключения

### Динамический (создается отложенно при первом ненулевом значении)
- `foxesscloud.0.pv1Power` … `foxesscloud.0.pv24Power` - Мощность фотоэлектрической цепочки 1–24 (кВт)
- `foxesscloud.0.invTemperature` - Внутренняя температура инвертора (°C)
- `foxesscloud.0.batTemperature` - Температура батареи (°C)

### Отчеты об энергопотреблении (если включены на вкладке *Отчеты*)
- `foxesscloud.0.report.day.generation` - Выработка электроэнергии фотоэлектрическими системами сегодня (кВт·ч)
- `foxesscloud.0.report.day.feedin` - Сегодняшняя выработка электроэнергии, поступающей в сеть (кВт·ч)
- `foxesscloud.0.report.day.gridConsumption` - Потребление электроэнергии из сети за сегодня (кВтч)
- `foxesscloud.0.report.week.generation` - Выработка электроэнергии фотоэлектрическими системами на этой неделе (кВтч)
- `foxesscloud.0.report.week.feedin` - Поступления энергии из возобновляемых источников на этой неделе (кВт·ч)
- `foxesscloud.0.report.week.gridConsumption` - Потребление электроэнергии в сети за эту неделю (кВтч)
- `foxesscloud.0.report.month.generation` - Выработка электроэнергии фотоэлектрическими системами за этот месяц (кВт·ч)
- `foxesscloud.0.report.month.feedin` - Количество выработанной энергии в этом месяце (кВт·ч)
- `foxesscloud.0.report.month.gridConsumption` - Потребление электроэнергии из сети за этот месяц (кВтч)
- `foxesscloud.0.report.year.generation` - Выработка электроэнергии фотоэлектрическими системами в этом году (кВт·ч)
- `foxesscloud.0.report.year.feedin` - Поступления энергии, выработанной в сети в этом году (кВт·ч)
- `foxesscloud.0.report.year.gridConsumption` - Потребление электроэнергии в сети за этот год (кВтч)

### Статистика потребления электроэнергии от солнечных батарей в формате JSON (если включена на вкладке *Статистика*)
- `foxesscloud.0.pvPowerJSON.daily` - Ежедневная статистика потребления энергии (формат JSON) - текущая неделя с понедельника по воскресенье
- `foxesscloud.0.pvPowerJSON.weekly` - Еженедельная статистика потребления энергии (в формате JSON) - за все недели текущего месяца
- `foxesscloud.0.pvPowerJSON.monthly` - Ежемесячная статистика потребления энергии (в формате JSON) - за все 12 месяцев текущего года

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройте вкладку **Общие**:
- **API-токен**: Ваш API-ключ с портала FoxESS Cloud.
- **Серийный номер (SN)**: Серийный номер вашего инвертора.
- **Интервал обновления**: Интервал обновления данных в секундах (по умолчанию: 60, минимум: 60)
4. При желании можно настроить вкладку **Статистика**:
- **Включить генерацию JSON-данных для солнечных электростанций**: Активировать генерацию JSON-таблиц для виджетов VIS.
- **Ежедневная статистика**: Формирование ежедневных данных об энергопотреблении за текущую неделю (понедельник-воскресенье).
- **Еженедельная статистика**: Формирование еженедельных данных об энергопотреблении за все недели текущего месяца.
- **Ежемесячная статистика**: Формирование ежемесячных данных об энергопотреблении за все 12 месяцев текущего года.
- **Цена за кВт·ч**: Необязательно — введите вашу цену за кВт·ч для расчета стоимости в таблицах JSON.
- **Начальное значение за сутки / неделю / месяц**: Дополнительные начальные значения кВт·ч для периодов работы, если адаптер включен после начала производства.
5. При желании можно настроить вкладку **Отчетность**:
- **Включить отчетность по энергопотреблению**: Активировать периодическую отчетность по энергопотреблению (день / неделя / месяц / год)
6. Сохраните и запустите экземпляр.

### Как получить учетные данные API
1. Войдите в [FoxESS Cloud](https://www.foxesscloud.com)
2. Перейдите в свой профиль/настройки.
3. Сгенерируйте ключ API (токен).
4. Найдите серийный номер вашего инвертора в списке устройств.

## Статистика потребления электроэнергии от фотоэлектрических систем в формате JSON для панелей мониторинга VIS
При включении в конфигурации адаптер генерирует таблицы JSON со статистикой энергопотребления, которые можно отображать в ioBroker VIS с помощью виджетов, таких как **inventwo JSON Widget**.

### Формат JSON
JSON-таблицы содержат данные об энергии со следующей структурой:

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **дата**: Название дня недели (локализованное), номер недели (KW XX) или название месяца.
- **Значение**: Выработанная энергия в кВт·ч (3 знака после запятой)
- **Цена**: Стоимость в евро (только если указана цена за кВтч, с двумя знаками после запятой)

### Сбор данных
- **Ежедневно**: Отображает текущую календарную неделю с понедельника по воскресенье и обновляет текущий день в режиме реального времени.
- **Еженедельно**: Накапливает данные за неделю (с понедельника по воскресенье), показывает все недели текущего месяца, включая текущую неделю.
- **Ежемесячно**: Накапливает данные за месяц (с 1-го по последний день), отображает все 12 месяцев текущего года и включает текущий месяц.

Если адаптер включен во время работы производственного процесса, вы можете настроить дополнительные начальные значения для текущего дня, текущей недели и текущего месяца. Эти значения добавляются один раз в начале соответствующего периода работы.

Язык обозначений дат (названия дня/недели/месяца) автоматически адаптируется к системному языку вашего ioBroker:

- **Немецкий** (de): Монтаг, Динстаг, январь, февраль и т. д.
- **English** (en): Monday, Tuesday, Januar, Februar, etc.

### Использование с VIS
1. Включите генерацию JSON-данных о мощности фотоэлектрических систем в конфигурации адаптера.
2. Добавьте виджет JSON на панель мониторинга VIS.
3. Привяжите виджет к одному из следующих состояний:
- `foxesscloud.0.pvPowerJSON.daily` для ежедневной статистики
- `foxesscloud.0.pvPowerJSON.weekly` для еженедельной статистики
- `foxesscloud.0.pvPowerJSON.monthly` для ежемесячной статистики
4. Настройте виджет для отображения данных об энергопотреблении/ценах в табличном формате.

## Отчеты об энергетике
Когда в вкладке **Отчетность** активирована опция *Включить отчетность по энергопотреблению*, адаптер вычисляет итоговые значения за период (день/неделя/месяц/год) на основе кумулятивных значений за весь период, возвращаемых API FoxESS Cloud. Дополнительные вызовы API не требуются — значения добавляются к обычному запросу в режиме реального времени.

### Как это работает
При каждом опросе адаптер считывает из API три значения времени жизни:

- «генерация» — общее количество энергии, выработанной с момента установки (кВт·ч)
- «подача энергии в сеть» — общее количество энергии, поступившей в сеть с момента установки (кВт·ч)
- `gridConsumption` — общее количество энергии, потребленной из сети с момента установки (кВт·ч)

В начале каждого периода (новый день / новая ISO-неделя / новый календарный месяц / новый год) текущие значения за весь срок службы сохраняются в качестве базового уровня. Сообщаемое значение состояния всегда равно `current lifetime value − baseline`.

Базовые значения сохраняются в `report._baselines`, поэтому они сохраняются после перезапуска адаптера.

### Отчеты по штатам
| Штат | Описание |
|-------|-------------|
| `foxesscloud.0.report.day.generation` | Выработка фотоэлектрической энергии сегодня (кВт·ч) |
| `foxesscloud.0.report.day.gridConsumption` | Энергия, потребленная из сети сегодня (кВт·ч) |
| `foxesscloud.0.report.week.generation` | Выработка фотоэлектрической энергии за эту стандартную неделю (кВт·ч) |
| `foxesscloud.0.report.week.feedin` | Подача электроэнергии в сеть на этой ISO-неделе (кВт·ч) |
| `foxesscloud.0.report.week.gridConsumption` | Потребление электроэнергии из сети за эту ISO-неделю (кВт·ч) |
| `foxesscloud.0.report.month.generation` | Выработка фотоэлектрической энергии в этом месяце (кВт·ч) |
| `foxesscloud.0.report.month.feedin` | Подача электроэнергии в сеть в этом месяце (кВт·ч) |
| `foxesscloud.0.report.month.gridConsumption` | Потребление электроэнергии из сети в этом месяце (кВт·ч) |
| `foxesscloud.0.report.year.generation` | Выработка фотоэлектрической энергии в этом году (кВт·ч) |
| `foxesscloud.0.report.year.feedin` | Подача электроэнергии в сеть в этом году (кВт·ч) |
| `foxesscloud.0.report.year.gridConsumption` | Потребление электроэнергии из сети в этом году (кВт·ч) |
| `foxesscloud.0.report.year.gridConsumption` | Потребление электроэнергии из сети в этом году (кВтч) |

## Конфиденциальность и обработка данных
- Этот адаптер считывает данные только из **FoxESS Cloud API**, используя ваш персональный API-токен.
— Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.6.4 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 0.6.3 (2026-06-05)
- (skvarel) Fixed repository checker error E0036

### 0.6.2 (2026-06-02)
- (skvarel) Documented Open API rate limit (per API key, multiple instances) in README and admin General tab
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules

### 0.6.1 (2026-05-29)
- (skvarel) Revised config and i18n

### 0.6.0 (2026-05-27)
- (StephanBeutel) Added support for up to 24 PV strings with dynamic state creation on first occurrence
- (StephanBeutel) Added report states for daily, weekly, monthly, and yearly energy totals derived from lifetime API values
- (StephanBeutel) Fixed null value handling for inverter and battery temperature states
- (StephanBeutel) Extracted reusable makeApiRequest() method for cleaner API communication
- (StephanBeutel) Centralized all state name translations into a single STATE_NAMES constant
- (skvarel) Fixed report states not updating during current period (values were only written at period rollover)
- (skvarel) Made energy reporting configurable via a new Reporting tab in the admin UI

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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