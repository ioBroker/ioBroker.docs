---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.energypriceforecast/README.md
title: ioBroker.energypriceforecast
hash: Sczh/9VEn8KFTH5v/wF+Y7HjRQoUsjh6z6hDRMmAO0k=
---
![Логотип](../../../en/adapterref/iobroker.energypriceforecast/admin/energypriceforecast.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.energypriceforecast.svg)
![Тестирование и выпуск](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/workflows/Test%20and%20Release/badge.svg)

# ioBroker.energypriceforecast

## Адаптер прогноза цен на энергоносители для ЕС для ioBroker

Прогноз цен на электроэнергию и выбросов CO2 для 37 европейских зон торгов от [energypriceforecast.eu](https://energypriceforecast.eu/) .

Цены на следующий день публикуются только на следующий день. Этот адаптер продолжает серию с прогнозом до 120 часов, поэтому автоматизация может уже сегодня решить, заряжать ли автомобиль сегодня вечером или подождать завтрашнего более дешевого времени. Для каждого рынка он также сообщает об интенсивности выбросов CO2 в сети.

Что вы получаете:

- текущая цена и интенсивность выбросов CO2
- самый дешевый и экологичный временной промежуток выбранной вами продолжительности (например, 3 часа работы посудомоечной машины), с флажком, который `true` пока окно работает
- суммарный балл, который оценивает текущий час по сравнению с предстоящими 24 часами.
- Весь ряд цен в 15-минутных интервалах в формате JSON для построения графиков и реализации вашей собственной логики.
- Насколько точным оказался прогноз за последние 30 дней, чтобы вы могли решить, насколько ему можно доверять.

Все вычисления происходят на сервере. Адаптер опрашивает, сопоставляет и записывает состояния.

### Рынки

AT, BE, BG, CH, CZ, DE, DK1, DK2, ES, FI, FR, GB, GR, HR, HU, семь итальянских зон (NORD, CNOR, CSUD, SUD, CALA, SICI, SARD), NL, NO1–NO5, PL, PT, RO, SE1–SE4, SI, SK.

В Хорватии (HR) пока нет опубликованных данных о ценах на следующий день, поэтому цены там всегда являются прогнозами, как и в Словакии. На новых рынках поля «CO2» и «качество прогноза» остаются пустыми до тех пор, пока API их не предоставит; пустое поле не означает ноль.

Цены указаны в рыночной валюте за кВт⋅ч, как это отображается в API (EUR, DKK, NOK, SEK, GBP и т. д.). По умолчанию это оптовые цены; информацию о фактической цене см. в разделе [«Цена для домохозяйства](#household-price) ».

### Великобритания (GB, бета)

Выберите ГБ в настройках экземпляра. В состояниях цен используется `GBP/kWh`: 0,10 означает 10 пенсов/кВтч, а не 0,10 пенсов/кВтч. GB — это почасовые оптовые данные, а не точный получасовой тариф Agile. Выпуск за четверть часа повторяет почасовую цену и не добавляет измеренные получасовые данные. Оценка цен домохозяйств в GB отсутствует. В собственных тарифных формулах используются надбавки в GBP/кВтч. Качество остается недоступным до тех пор, пока не будет собрано достаточно данных; пустое состояние качества не является нулевой ошибкой.

## Конфигурация

| Параметр                 | Значение                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| Рынок                    | Торговая зона. Германия и Люксембург используют одну торговую зону.                                     |
| Горизонт прогнозирования | 24, 48, 72 или 120 часов. Доступ для публики открыт до 48 часов.                                        |
| Длина окна               | Наиболее экономичное и экологичное окно должно охватывать от 1 до 24 часов.                             |
| Интервал обновления      | 15–120 минут, по умолчанию 30. Цены меняются не чаще, чем каждые 15 минут.                              |
| Цены указаны             | Оптовая цена, оценка стоимости для домохозяйства или собственный тариф — см. ниже.                      |
| Почтовый индекс          | Для составления сметы в Германии (обязательно) и Нидерландах (необязательно).                           |
| Фактор, надбавка         | По собственному тарифу.                                                                                 |
| ключ API                 | Необязательно. Требуется только для горизонта наблюдения более 48 часов. Хранится в зашифрованном виде. |

## Домашние цены

Обменная цена — это лишь часть суммы в чеке. Три параметра определяют, что отображается в состоянии цены:

| Параметр                      | Что содержат ценовые штаты                                                                                                                                                                                   | Рынки                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| Оптовая цена                  | Цена на следующий день и ее прогноз без каких-либо сборов или налогов.                                                                                                                                       | все                           |
| Оценка стоимости домохозяйств | Оптовая цена + наценка поставщика + плата за подключение к сети + сборы, затем НДС. В Германии плата за подключение к сети взимается оператором сети, которого можно определить по вашему почтовому индексу. | DE, AT, NL, ДК1, ДК2, NO1–NO5 |
| Собственный тариф             | Оптовая цена × коэффициент + надбавка, с вашими собственными расчетами.                                                                                                                                      | все                           |

Для расчета собственного тарифа возьмите свой договор: коэффициент обычно равен 1 + НДС (1,19 в Германии), это надбавка ко всему, что ваш поставщик взимает за кВтч сверх обменной цены, включая НДС, плату за сеть, сборы и маржу. Пример для немецкого динамического тарифа с надбавкой 20 центов/кВтч: коэффициент `1.19` надбавка `0.20`.

В любом случае, самый дешевый временной интервал остается неизменным, поскольку наценка на каждый час одинакова; меняются только суммы. Фиксированные ежемесячные платежи никогда не включаются, а качество прогноза всегда остается на оптовой основе. Настройка, которая не работает (например, немецкая оценка без почтового индекса), возвращается к оптовой цене и указывает это в журнале.

## Штаты

| Состояние                                                                                                  | Значение                                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `price.current`                                                                                            | Цена текущего слота                                                                                           |
| `price.currentSource`                                                                                      | `day_ahead` (опубликовано) или `forecast`                                                                      |
| `price.bestWindow.start` /`.end`                                                                           | Самый дешевый период на горизонте (ISO 8601, UTC)                                                             |
| `price.bestWindow.average`                                                                                 | Средняя цена в этом временном окне                                                                            |
| `price.bestWindow.active`                                                                                  | `true` пока работает самое дешевое окно                                                                       |
| `price.bestWindow.remainingMinutes`                                                                        | Осталось минут до окончания выполнения, иначе... `0`                                                          |
| `price.bestWindow.status`                                                                                  | `upcoming`, `active` или `passed`                                                                              |
| `co2.current`, `co2.bestWindow.*`                                                                          | То же самое относится и к интенсивности выбросов CO2 (гCO2/кВт·ч).                                            |
| `combined.scoreNow`                                                                                        | Доля ближайших 24 часов, которые будут хуже по ценам и выбросам CO2, чем сейчас; 100 = сейчас — лучшее время. |
| `combined.bestWindow.start` /`.end`                                                                        | Лучший компромисс между дешевизной и чистотой.                                                                |
| `forecast.json`                                                                                            | Серия цен как `[{start, end, value, source}]` в 15-минутных интервалах                                         |
| `forecast.lastDayAheadSlot`                                                                                | Место, где заканчиваются опубликованные цены и начинается прогноз.                                            |
| `forecast.end`                                                                                             | Конец сериала                                                                                                 |
| `quality.windowExactHitDays` /`.windowEvaluatedDays`                                                       | Дни за последние 30, в которые, согласно прогнозу, был найден самый дешевый период для прогноза погоды.       |
| `quality.windowWithinOneHourDays`                                                                          | В те дни, когда отклонение составляло не более одного часа,                                                   |
| `quality.windowMeanExtraCost`                                                                              | Сколько в среднем стоило следовать прогнозу погоды по сравнению с самым дешевым вариантом.                    |
| `quality.hourlyMeanAbsError`, `quality.hourlyCorrelation`                                                  | Точность почасовой оценки в течение 30 дней                                                                   |
| `retail.basis`                                                                                             | `base`, `estimate` или `formula` - что содержат ценовые положения                                               |
| `retail.gridArea`, `retail.gridFee`, `retail.supplierMarkup`, `retail.leviesAndTaxes`, `retail.vatPercent` | На основе чего строится расчет (ct/kWh, øre/kWh в Дании и Норвегии); только с учетом расчета.                 |
| `retail.factor`, `retail.surcharge`                                                                        | Ваш собственный тариф; только с вашим собственным тарифом.                                                    |
| `info.connection`                                                                                          | Последнее обновление прошло успешно.                                                                          |
| `info.apiKeyState`                                                                                         | `missing` для всеобщего доступа, `valid` с ключом, иначе почему ключ был отклонен?                             |

Прогнозируемые значения на целый час повторяются на протяжении четырех четвертей, без интерполяции: модель прогнозирует часы, и создание промежуточных значений изменило бы то, что видит автоматизированная система.

## Пример: запустите посудомоечную машину в самый дешевый временной интервал.

```js
on({ id: 'energypriceforecast.0.price.bestWindow.active', val: true }, () => {
    setState('shelly.0.dishwasher.Relay0.Switch', true);
});
```

## Обратная связь

Адаптер находится на стадии тестирования. Отзывы собираются в [официальной ветке обсуждения для тестировщиков ioBroker](https://forum.iobroker.net/topic/85729/test-adapter-energypriceforecast.eu-v0.1.x) (на немецком языке); об ошибках лучше всего сообщать через [GitHub Issue](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/issues) .

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.4 (2026-11-20)

- Hungary (HU), Slovenia (SI) and Croatia (HR) as new markets

### 0.1.3 (2026-10-31)

- Great Britain (GB, beta): hourly wholesale prices in GBP/kWh, own tariff with surcharges in GBP/kWh
- README in English only
- Updated test tooling (`@iobroker/testing` 6.3)

### 0.1.2 (2026-10-05)

- State and channel names in all eleven admin languages
- The retail component states only exist for the price basis in use; switching the basis removes the others
- `remainingMinutes` is 0 outside a window and `active` is `false` when there is no window, instead of empty values

Older releases are documented in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 BackupBaTTerY <StrompreisVorhersage@proton.me>

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