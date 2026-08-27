---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-wallconnector3/README.md
title: <img src="/admin/tesla-wallconnector3.png" width="36" align="top" alt="">ioBroker.tesla-wallconnector3
hash: vYcX+OXlSII1B7kz7vqyAwzQQS7f728sTOBFoBkZGMk=
---
#<img src="/admin/tesla-wallconnector3.png" width="36" align="top" alt=""> ioBroker.tesla-wallconnector3
## Адаптер Tesla Wall Connector Gen 3 для ioBroker
Считывает данные в реальном времени с устройства Tesla Wall Connector Gen 3 в локальной сети. Все точки данных доступны только для чтения (API устройства Wallbox не поддерживает запись).

## Конфигурация
### Настройки
![Основные настройки](../../../de/adapterref/iobroker.tesla-wallconnector3/media/mainSettings.png "Основные настройки")

| Поле | Описание |
|:-----|:-------------|
| Настенный адаптер Tesla третьего поколения | IP-адрес или имя хоста настенного адаптера (например, `192.168.1.50` или `wallbox.local`). Введите только сам адрес — без схемы (`http://`), без порта, без пути, без учетных данных и без IPv6 в квадратных скобках. Пустое поле или `0.0.0.0` будет рассматриваться как не сконфигурированное и не позволит выполнить запрос. |
| Интервал опроса | Как часто адаптер считывает данные с настенного блока, в секундах. По умолчанию: 10. Диапазон: 1 - 3600. |
| Время ожидания запроса | Максимальное время ожидания ответа от устройства, в миллисекундах. По умолчанию: 5000. Диапазон: 1000 - 10000. |
| Количество повторных попыток | Сколько раз будет предпринята попытка запроса после неудачной попытки. Значение указывает количество повторных попыток после первой неудачной попытки. 0 = нет повторных попыток, 999 = неограниченное количество. По умолчанию: 10. |
| Коэффициент повторения опроса | Увеличивает интервал между повторениями. n-я попытка происходит через интервал, умноженный на коэффициент, умноженный на n секунд. Пример со значениями по умолчанию: 1-е повторение через 20 с, 2-е через 40 с. Сбрасывается после успешного получения данных. Значение по умолчанию: 2. Диапазон: 1–10. |
| Расчет мощности в режиме расщепленной фазы | Включить для установок с расщепленной фазой в Северной Америке. Использует значение grid_v x vehicle_current_a вместо суммы V x A по фазам. По умолчанию: отключено (расчет для трехфазной системы). |

После сохранения адаптер перезапускается и немедленно начинает отправлять запросы.

## Точки данных
Все точки данных доступны только для чтения. Адаптер запрашивает API Wallbox и создает точку данных для каждого возвращенного значения.

### Информация
| Точка данных | Тип | Описание |
|:-----------|:---:|:-------------|
| info.connection | логическое значение | `true` если адаптер может связаться с настенным блоком и получает корректные ответы. |

### Жизненно важные показатели
Оперативные данные в режиме реального времени, обновляемые при каждом запросе.

| Точка данных | Тип | Описание |
|:-----------|:---:|:-------------|
| evse_state | number | Состояние заряда (см. таблицу ниже) |
| vehicle_connected | логическое значение | Подключено ли транспортное средство |
| vehicle_current_a | number | Ток, потребляемый транспортным средством (А) |
| session_energy_wh | number | Энергия, выработанная в текущей сессии (Вт·ч) |
| power_w | number | Мощность зарядки (Вт), рассчитываемая адаптером. Трехфазный режим: Сумма В x А на фазу. Двухфазный режим: grid_v x vehicle_current_a. |
| session_s | number | Продолжительность текущей сессии загрузки (с) |
| contactor_closed | логическое значение | Замкнуто ли зарядное реле |
| grid_v | number | Напряжение сети (В) |
| grid_hz | number | Частота сети (Гц) |
| voltageA_v, voltageB_v, voltageC_v | number | Напряжение на фазу (В) |
| currentA_a, currentB_a, currentC_a, currentN_a | число | Ток на фазу (А) |
| pcba_temp_c, mcu_temp_c, handle_temp_c | число | Значения температуры (°C) |
| напряжение_катушки_реле | число | Напряжение катушки реле (В) |
| relay_k1_v | номер | Напряжение реле K1 (В) |
| relay_k2_v | номер | Напряжение реле K2 (В) |
| prox_v | число | Напряжение пилотного датчика приближения (В) |
| pilot_high_v | number | Высокое напряжение управления пилотным сигналом (В) |
| pilot_low_v | number | Низкое напряжение пилотного сигнала управления (В) |
| input_thermopile_uv | number | Значение датчика термопары |
| config_status | number | Статус конфигурации |
| время работы_с | число | Время работы Wallbox (с) |
| current_alerts | string (JSON) | Активные оповещения в виде массива JSON (например, `"[]"`). Числовые дочерние данные (`.0`, `.1`, ...) сохраняются по соображениям совместимости и автоматически удаляются при уменьшении размера массива. |
| evse_not_ready_reasons | строка (JSON) | Причины неготовности в виде массива JSON. Дочерние точки данных, как в current_alerts. |

**Коды штатов для зарядных станций для электромобилей:**

| Код | Значение |
|:----:|:----------|
| 0 | Настенный блок запускается |
| 1 | Простой |
| 2 | Автомобиль подключен, но не готов к зарядке |
| 4 | Автомобиль подключен и готов к зарядке |
| 6 | Транспортное средство подключено, идет рукопожатие |
| 8 | Загрузка завершена или прервана |
| 9 | Готов к зарядке, ожидание автомобиля |
| 10 | Зарядка с пониженной мощностью (< 3 фаз по 16 ампер каждая) |
| 11 | Зарядка на полной мощности (3 фазы, по 16 А каждая) |

*Состояния 3, 5, 7 и 12 не задокументированы. Если вы знаете их значение, приветствуются запросы на добавление изменений!*

### Продолжительность жизни
Накопительная статистика по сроку службы настенного блока. Запросы выполняются не чаще, чем каждые 60 секунд.

| Точка данных | Тип | Описание |
|:-----------|:---:|:-------------|
| энергия_вч | число | Общее количество выработанной энергии (Вт·ч) |
| charge_starts | number | Количество запусков зарядки |
| Время зарядки (с) | Число | Общее время зарядки (с) |
| время работы_с | число | Общее время работы (с) |
| циклы_контактора | число | Количество циклов переключения реле |
| connector_cycles | number | Количество циклов установки/извлечения |
| alert_count | number | Общее количество оповещений |

### Версия
Идентификация прошивки и оборудования. Запрос выполняется при запуске, после повторного подключения и не чаще одного раза в час.

| Точка данных | Тип | Описание |
|:-----------|:---:|:-------------|
| firmware_version | string | Версия прошивки |
| серийный номер | строка | Серийный номер |
| номер_детали | строка | номер_детали |

В зависимости от версии микропрограммы могут присутствовать дополнительные данные, такие как `git_branch`, `web_service` и контрольные суммы CRC IEEE 1547.

### Wifi_status
Данные о подключении к Wi-Fi. Запросы выполняются не чаще, чем каждые 60 секунд.

| Точка данных | Тип | Описание |
|:-----------|:---:|:-------------|
| wifi_connected | логическое значение | Подключено ли настенное устройство к сети Wi-Fi |
| интернет | логическое значение | Есть ли у настенной приставки доступ в интернет? |
| wifi_ssid | string | Подключенный SSID |
| wifi_infra_ip | строка | IP-адрес в беспроводной сети |
| wifi_mac | строка | MAC-адрес |
| wifi_signal_strength | число | Уровень сигнала (безразмерное значение качества, чем выше значение, тем лучше) |
| wifi_rssi | число | значение RSSI (дБм) |
| wifi_snr | число | Соотношение сигнал/шум (дБ) |

*Адаптер динамически создает точки данных для всех значений, возвращаемых API. В зависимости от версии прошивки, ваше настенное устройство может предоставлять дополнительные точки данных, не указанные здесь.*

## Поведение запроса
Адаптер распределяет запросы во времени, чтобы избежать перегрузки встроенного веб-сервера настенного блока:

| Конечная точка | Частота |
|:---------|:-----------|
| жизненно важные показатели | При каждом интервале запроса |
| За всё время жизни | Максимум каждые 60 секунд |
| wifi_status | Максимум каждые 60 секунд |
| версия | При запуске, после переподключения и не чаще одного раза в час |

Запросы отправляются последовательно. Если один из конечных пунктов выходит из строя, остальные обрабатываются в обычном режиме. Неисправные конечные пункты повторно запрашиваются в следующем запланированном цикле.

Перед анализом ответов адаптер автоматически исправляет известные ошибки JSON-файлов прошивки Tesla (пустые значения `nan`, отсутствие закрывающей скобки).

## Отказ от ответственности
**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает принадлежности к ним или их дочерним компаниям, а также одобрения с их стороны! Этот личный проект создан в свободное время и не преследует никаких коммерческих целей.**

**Настройки по умолчанию должны быть безопасны для нормальной работы.** Слишком короткий интервал опроса может перегрузить встроенный веб-сервер Wall Connector. Если настенное устройство перестает отвечать, увеличьте интервал или остановите адаптер.

**Без гарантии и без ответственности.** Этот адаптер — любительский проект, распространяемый под лицензией MIT. Он считывает данные с настенного разъема Tesla через локальный, недокументированный API. Автор не несет ответственности за любые последствия его использования и не может гарантировать, повлияет ли его использование на ваши гарантийные или сервисные соглашения с Tesla или вашим установщиком. Если это для вас неприемлемо, пожалуйста, не используйте этот адаптер.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Added North American split-phase power calculation mode (splitPhase setting)
- Added Tesla firmware JSON defect recovery (bare nan, Infinity, -Infinity, missing closing brace)
- Added host validation: rejects URLs, paths, credentials, and ports; empty or 0.0.0.0 treated as unconfigured
- Added 2 MiB response size limit
- Fixed state type stability: null values no longer cause type oscillation, including after adapter restart
- Fixed stale array state cleanup: current_alerts and evse_not_ready_reasons publish canonical JSON and clean up obsolete child states
- Fixed complete data refresh after connection loss: all endpoints polled immediately on reconnect
- Fixed retry off-by-one: configured retries value now means actual retry attempts after initial failure
- Fixed unload race condition: prevented post-unload state changes when poll requests are in flight
- Fixed numeric string coercion: Infinity and NaN values no longer silently converted to numbers
- Fixed timeout configuration help text to show correct maximum (10000 ms)
- Corrected wifi signal strength/RSSI metadata
- Separated persistence errors from communication errors: database write failures no longer trigger connection retry
- Reduced API load: version polled hourly, lifetime and wifi_status every 60s, sequential requests
- Enabled TypeScript type checking in CI
- Expanded and corrected documentation

### 1.2.0 (2026-07-20)
- (copilot) Adapter requires node.js >= 22 now
- Added IEEE 1547 CRC state attributes
- Fixed adapter checker warnings (jsonConfig, pollingTimeout)
- Replaced plain setTimeout with adapter-managed timers
- Added calculated charging power state (vitals.power_w)
- Added specific ioBroker roles for all states
- Simplified state attribute definitions
- Fixed startup recovery: adapter now retries if wallbox is unreachable at start
- Capped retry delay at 1 hour
- Fixed state attribute typos and placeholder names
- Updated documentation

### 1.1.0 (2026-03-30)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- Added state attributes (and moved notifications to debug from info)
- Code optimization
- Migration to i18n

### 1.0.6 (NoBl)
* Maintenance update (dependencies, ...)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 Norbert Bluemle <github@bluemle.org>

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