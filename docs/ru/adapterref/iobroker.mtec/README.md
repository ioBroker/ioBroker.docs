---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mtec/README.md
title: ioBroker.mtec
hash: 8kX9dheVcSIoWW/c48pzV5yaqUs+CWrCXfWaIPNrT2s=
---
# ioBroker.mtec

Программа считывает данные с MQTT-брокера, включая данные с M-TEC **Energy Butler** (гибридный инвертор с фотоэлектрической системой и аккумулятором) и **теплового насоса** M-TEC, создает типизированные точки данных в ioBroker и анализирует потоки энергии: потребление дома, самообеспеченность, прогноз заряда батареи, избыток энергии от фотоэлектрической системы, стоимость, экономия и суточные значения.

Адаптер только считывает данные. Он никогда ничего не записывает обратно на устройства.

Производитель: [M-TEC Systems](https://www.mtec-systems.com/en/) ( [Energy-Butler](https://www.mtec-systems.com/en/products/energy-butler/) , [тепловые насосы](https://www.mtec-systems.com/en/heat-pumps/) )

> Этот адаптер — частный проект сообщества. Он **не связан с компанией M-TEC, не одобрен ею и не поддерживается ею** . Все названия продуктов принадлежат их владельцам.

Описание на немецком языке: [docs/de/README.md](https://github.com/derDennis99/ioBroker.mtec/blob/main/docs/de/README.md)

## Источники данных

Адаптер не взаимодействует с устройствами напрямую. Он считывает их значения из MQTT-брокера в одном из двух форматов («входные профили»). Источник данных выбирается для каждого устройства отдельно:

| Профиль    | Устройства                     | Источник                                                                                                                                                                                                                           |
| ---------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `json`     | Energy Butler и тепловой насос | Одна тема на устройство с JSON-сообщением следующего содержания: `fields` и `timestamp` Его может создать любой источник, например, Node-RED или скрипт. [Описание формата](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md) . |
| `mtecmqtt` | Энергетический дворецкий       | Вывод MQTT-трафика [MTECmqtt](https://github.com/croedel/MTECmqtt) . [Подробности и сопоставление.](/#/docs/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md)                                                                     |

Например, Энергетический Дворецкий может появиться через `mtecmqtt` и тепловой насос через `json` в то же время.

Прямой доступ по протоколу Modbus (без дополнительного программного обеспечения) планируется реализовать в более поздней версии.

## Установка

Требования: Node.js 22 или новее, js-controller 6.0.11 или новее, admin 7.6.20 или новее.

Адаптер опубликован в npm и добавляется в репозиторий ioBroker. Как только он появится там, найдите "mtec" в списке адаптеров в административной панели, установите его и создайте экземпляр.

## Конфигурация

| Параметр                                              | Значение                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Energy Butler, тепловой насос                         | Источник данных для каждого устройства: `json`, `mtecmqtt` (Только для Energy Butler) или «отсутствует»                                                                                                                                                                               |
| Темы (`json`)                                        | Одна тема на устройство                                                                                                                                                                                                                                                              |
| Префикс темы, серийный номер (`mtecmqtt`)            | `MQTT_TOPIC` MTECmqtt (по умолчанию) `MTEC`); серийный номер пуст = первый увиденный                                                                                                                                                                                                 |
| Данные считаются устаревшими после                    | Лимит для `info.stale` (по умолчанию 20 с)                                                                                                                                                                                                                                            |
| Медленные группы MTECmqtt считаются устаревшими после | Ограничение значений для фазы и фотоэлектрической цепочки (по умолчанию 180 с)                                                                                                                                                                                                       |
| Брокер, порт, пользователь, пароль                    | Подключение к MQTT-брокеру необходимо только для `json` и `mtecmqtt` Пароль хранится в зашифрованном виде.                                                                                                                                                                             |
| Анализ                                                | Полезная емкость батареи, минимальное состояние заряда, цена электроэнергии из сети и тариф на подачу электроэнергии в сеть (центы за кВт·ч, 0 = не задано, значения меньше 1 считываются как денежные единицы за кВт·ч), валюта, пороговое значение для "избытка солнечной энергии" |

Настройки версии 0.4 и более ранних (один профиль ввода для обоих устройств) автоматически применяются при первом запуске, после чего экземпляр перезапускается один раз.

Если всё получится, `mtec.0.info.connection` является `true`, приведенные ниже точки данных `mtec.0.butler.*` (и `mtec.0.heatpump.*`) заполнить и `info.stale` является `false`.

## Точки данных

| Путь                             | Содержание                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `info.connection`                | `true` если все настроенные источники данных подключены                                       |
| `heatpump.<field>`               | 25 параметров теплового насоса с указанием типа и роли, коды состояния с текстовым описанием. |
| `butler.<field>`                 | 16 значений Энергетического Дворецкого                                                        |
| `butler.mtecmqtt.<group>.<name>` | Дополнительные значения из MTECmqtt (профиль) `mtecmqtt` только)                               |
| `<device>.info.connection`       | Подключение источника данных устройства (с `json` и `mtecmqtt` (брокер)                         |
| `<device>.info.lastMeasurement`  | Время последнего измерения (мс)                                                               |
| `<device>.info.stale`            | `true` если последнее измерение было выполнено раньше установленного предела                  |
| `butler.info.serial`             | Серийный номер (профиль) `mtecmqtt` только)                                                    |

- **Время измерения:** С `json` Каждое значение получает время измерения из сообщения. `ts` Таким образом, адаптеры истории сохраняют реальное время измерений.
- **Отсутствующее значение не равно 0:** значение, которое не было указано, становится `null` с качеством `0x82` (датчик не выдал никакого значения); старое значение не сохраняется.
- **Для вашей же логики:** всегда проверяйте. `info.stale` перед использованием значения для принятия решения о переключении.

## Анализ

Ниже `analysis` Адаптер производит расчеты на основе текущих значений, полученных с помощью Energy Butler:

| Точка данных                                                                               | Содержание                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `house_power_w` /`house_without_heatpump_w`                                                | Потребление электроэнергии в доме в настоящее время (солнечная энергия + импорт + разрядка − экспорт − зарядка), с тепловым насосом и без него.                               |
| `autarky_percent` /`self_consumption_percent`                                              | Самообеспечение и собственное потребление солнечной энергии уже сегодня.                                                                                                      |
| `surplus_w` /`surplus_available`                                                           | Избыток солнечной энергии (среднее значение за 5 минут) и "избыток солнечной энергии" (с гистерезисом)                                                                        |
| `battery_energy_kwh`, `battery_full_in_min`, `battery_empty_in_min`, `battery_status_text` | Уровень заряда батареи и прогноз, например: «полностью заряжена через 2 часа 15 минут (примерно 14:35)».                                                                      |
| `cost_now_per_h` /`savings_now_per_h`                                                      | Текущая стоимость электроэнергии и экономия в час (только при заданной цене)                                                                                                  |
| `grid_balance_per_h` /`grid_balance_text`                                                  | Текущий баланс энергосистемы: + выручка от продажи электроэнергии / − стоимость импорта в час, в виде числа и текста ("+0,27 €/ч")                                            |
| `today.*`                                                                                  | Суточные значения с полуночи: фотоэлектрическая энергия, импорт, экспорт, аккумуляторы, дома, тепловые насосы (электроэнергия, тепло, КПД), самообеспечение. `cost`, `savings` |

В суммах в качестве единицы измерения используется заданная валюта. Текст отображается на языке системы (немецком или английском).

Суточные значения оцениваются на основе мощности (мощность × время с момента предыдущего измерения, пропуски более 60 секунд) и сохраняются при перезапуске в тот же день. С учетом профиля `mtecmqtt` Фактические данные о ежедневном потреблении энергии, полученные с помощью приложения Energy Butler, заменяют собой приблизительные оценки.

## Проверка брокера

Для профиля `json`, `tools/mqtt-check.mjs` прослушивает несколько секунд и сравнивает поля с определениями адаптера. `--user` Он запрашивает пароль (скрытый ввод или из `MQTT_PASSWORD`):

```bash
node tools/mqtt-check.mjs --host <broker> --user <user>
```

## Разработка

```bash
npm install
npm test
```

Тесты охватывают как входные профили, так и анализ, а также весь путь через локальный MQTT-брокер (aedes). `npm run test:integration` Кроме того, адаптер запускается в реальном js-контроллере и проверяет поток данных от локального брокера. `npm run lint` проверяет стиль кода и `npm run check` типы (TypeScript в исходном коде JavaScript).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-11-15)

- No more "DB closed" errors in the log when the settings of 0.4 are taken over: the instance now only restarts and starts working after the restart

### 0.5.0 (2026-11-15)

- Data source per device (`butlerSource`, `heatpumpSource`, also "not present"), the MQTT broker is only needed for MQTT sources. Existing settings are taken over automatically.
- New data points `butler.info.connection` and `heatpump.info.connection`; `info.connection` is `true` if all configured data sources are connected
- Profile `json`: new fields are only created if their name consists of a-z, 0-9 and _ (starting with a letter, not `info` or `mtecmqtt`); other names are ignored with a warning, so a message can no longer create IDs with dots or overwrite `<device>.info.*`
- Profile `mtecmqtt`: IDs below `butler.mtecmqtt` are always lowercase
- Link to the manufacturer in the README
- (dev) Type checking of the sources (`npm run check`, also in CI), VS Code schema settings, automerge for Dependabot updates, older changelog entries moved to CHANGELOG_OLD.md

### 0.4.2 (2026-10-18)

- Data point and channel names in all ioBroker languages

### 0.4.1 (2026-10-18)

- Timers use the adapter API (setInterval/setTimeout of the adapter)
- German description moved to docs/de/README.md
- Author contact added

### 0.4.0 (2026-10-17)

- (breaking) Money data points renamed: `analysis.cost_now_eur_h` → `cost_now_per_h`, `savings_now_eur_h` → `savings_now_per_h`, `grid_balance_eur_h` → `grid_balance_per_h`, `today.cost_eur` → `today.cost`, `today.savings_eur` → `today.savings`. Today's values are taken over, the old objects are deleted.
- New input profile `mtecmqtt`: Energy Butler via the MQTT output of MTECmqtt, including further values and real daily energy counters
- Input profile selection in the admin interface
- English as base language: log messages, data point names (English and German), admin interface with translations; texts follow the system language
- Public description of the `json` format
- (breaking) Requires Node.js 22, js-controller 6.0.11 and admin 7.6.20 or newer
- Admin interface and adapter description in all ioBroker languages
- New adapter icon

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 derDennis99 <mc@nucs.eu>

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