---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md
title: Входной профиль `mtecmqtt`
hash: JkdAfxiQ6zpI0u7w4t1tOnGNN0nKs32zXcLkK2kKS88=
---
# Профиль ввода `mtecmqtt`
Адаптер считывает данные из Energy Butler из выходных данных MQTT проекта [MTECmqtt](https://github.com/croedel/MTECmqtt), отдельного проекта с открытым исходным кодом, который считывает данные из Energy Butler через Modbus и публикует значения в MQTT-брокер. Адаптер только считывает эти сообщения MQTT; он не содержит кода MTECmqtt. Формат был проверен на соответствие MTECmqtt 2.1.0.

Тепловой насос не является частью MTECmqtt. Вы все еще можете считывать его данные одновременно с помощью [профиль `json`](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md).

## Настраивать
1. Запустите MTECmqtt и разрешите ему публиковать данные на ваш брокер.
2. В настройках экземпляра выберите **MTECmqtt** в качестве источника данных для Energy Butler и укажите того же брокера.
3. **Префикс темы:** значение `MQTT_TOPIC` в конфигурации MTECmqtt (по умолчанию `MTEC`).
4. **Серийный номер:** необязателен. Если поле пустое, адаптер использует первый найденный серийный номер и отображает его в `butler.info.serial`. При использовании нескольких устройств Energy Butler используйте один экземпляр на каждое устройство и введите серийный номер в каждый из них.

Адаптер подписывается на `<prefix>/<serial or +>/#` с QoS 0. Темы обнаружения Home Assistant (`homeassistant/…`) не считываются.

## Что отправляет MTECmqtt
- Одна тема на значение: `<префикс>/<серийный номер>/<группа>/<имя>`, полезная нагрузка в виде обычного текста (`"38.400"`, `"-628"`, `"0"`), без времени измерения.
- Примерно каждые 10 секунд MTECmqtt считывает и публикует группу `now-base`. Остальные группы `now-*` (`now-grid`, `now-inverter`, `now-backup`, `now-battery`, `now-pv`) читаются по очереди, по одной за цикл, поэтому каждая из них появляется примерно каждые 50 секунд. Группа `day` появляется примерно каждые 5 минут, `total` - примерно каждые 5 минут, `config` - примерно каждый час.

## Как адаптер обрабатывает это
- **Одна запись за цикл:** Значения поступают по одному. Адаптер собирает их до тех пор, пока в темах не будет 2 секунды или пока значение не повторится (начнется следующий цикл), и обрабатывает их как одну запись.
- **Время:** MTECmqtt не отправляет время измерения, поэтому в качестве `ts` используется время получения первого значения цикла. Дубликаты или буферизованные старые сообщения таким образом обнаружить невозможно; при QoS 0 их нет.
- **Отсутствующие значения = null, для каждой группы:** Группа, входящая в запись, устанавливает для своих отсутствующих или нечисловых полей значение `null` (качество `0x82`). Группы, не входящие в запись, сохраняют свои значения: строковые значения фазы и PV не становятся `null` между их обработками.
- **Устаревшие данные:** `butler.info.stale` и `butler.info.lastMeasurement` следуют за `now-base` с обычным ограничением (по умолчанию 20 с). Значения фазы (`now-grid`) и строковые значения PV (`now-pv`) имеют собственное, более длительное ограничение (по умолчанию 180 с); без новых значений в течение этого времени они устанавливаются в значение `null`.

## Составление карты
| Точка данных `butler.…` | MTECmqtt | Примечание |
| `battery_soc_percent` | `now-base/battery_soc` | % |
| `battery_power_signed_w` | `now-base/battery` | + разрядка, − зарядка ¹ |
| `battery_charge_power_w` / `battery_discharge_power_w` | получено из `battery` | |
| `battery_charge_discharge_status_code` | `now-base/battery_mode` | 0 разрядов, 1 зарядка |
| `grid_total_power_signed_w` | `now-base/grid_power` | + экспорт, − импорт ¹ |
| `grid_import_power_w` / `grid_export_power_w` | получено из `grid_power` | |
| `grid_phase_a/b/c_power_signed_w` | `now-grid/grid_a`, `grid_b`, `grid_c` | примерно каждые 50 с |
| `pv_total_power_w` | `now-base/pv` | |
| `pv1_power_w` / `pv2_power_w` | `now-pv/pv_1`, `pv_2` | примерно каждые 50 с |
| `inverter_ac_power_signed_w` | `now-base/inverter` | |
| `inverter_operating_status_code` | `now-base/inverter_status` | одинаковые коды |
| `inverter_operating_status_code` | `now-base/inverter_status` | одинаковые коды |

¹ Приведенные обозначения взяты из документации и формул MTECmqtt. Их еще необходимо подтвердить реальными данными - отзывы на форуме или в виде сообщения на GitHub приветствуются.

**Все остальные значения** (напряжение, ток, частота, температура, состояние батареи (SOH), значения резервного питания, режим работы, счетчики энергии, серийный номер, версия прошивки и т. д.) сохраняются как `butler.mtecmqtt.<group>.<name>`, например, `butler.mtecmqtt.now_base.battery_voltage` или `butler.mtecmqtt.total.pv_total`. Группа и имя становятся строчными, символы, кроме букв, цифр и `_`, становятся `_`. Числа становятся числовыми значениями, все остальное - текстом. Единицы измерения добавляются там, где это понятно из именованных правил MTECmqtt (В, А, Гц, °C, Вт, кВт·ч, %).

## Суточные значения с счетчиков энергии
MTECmqtt отправляет реальные ежедневные счетчики энергии в группе `day`. Они заменяют оценку, полученную в результате анализа:

| `analysis.today.…` | MTECmqtt |
| `pv_kwh` | `day/pv_day` |
| `grid_import_kwh` | `day/grid_purchase_day` |
| `grid_export_kwh` | `day/grid_feed_day` |
| `battery_charge_kwh` | `day/battery_charge_day` |
| `battery_discharge_kwh` | `day/battery_discharge_day` |
| `разряд_батареи_кВтч` | `день/день_разряда_батареи` |

Для всех пяти счетчиков значения `house_kwh`, `cost`, `savings` и `autarky_percent` также пересчитываются на их основе. Между двумя считываниями счетчиков (примерно 5 минут) оценка продолжается с последнего считывания.

Сразу после полуночи MTECmqtt может еще несколько минут отправлять данные за вчерашний день. Поэтому в течение первых 30 минут суток адаптер принимает на себя только те счетчики, которые были явно сброшены; после перезапуска в течение этого времени он ждет до 00:30 и использует расчетное значение до этого момента.

## Отличия от собственных значений MTECmqtt
MTECmqtt рассчитывает текущее потребление электроэнергии в доме как `inverter − grid_power`. Адаптер использует фотоэлектрические панели, сеть и аккумулятор (`pv + import + discharging − export − charging`). Оба варианта могут немного отличаться, например, из-за потерь в инверторе. Для расчета суточных значений используется одна и та же формула.