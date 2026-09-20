---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/info/PulseMeterModes.md
title: Tibber Pulse - поддерживаемые режимы измерения
hash: t952l5QwHkfvA2KVdqK5eCjDd5IAAoWXm7s/o6Ei1IM=
---
# Tibber Pulse — поддерживаемые режимы измерения

Справочные примечания по анализу телеграмм локальной системы Pulse.[`src/lib/tibberLocal.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.ts) .

Когда адаптер локально опрашивает Tibber Bridge (`/metrics.json`), мост сообщает числовое значение `meter_mode` в своем `node_status` Этот блок сообщает мосту (и адаптеру), как подключенный счетчик кодирует свою телеграмму. Адаптер считывает ее в `this.meterMode` и направляет необработанные данные в формате HEX соответствующему парсеру.

Существуют два принципиально разных способа кодирования телеграмм:

- **Двоичный SML** (Smart Message Language, IEC 62056-5-3) — двоичная структура, начинающаяся с управляющей последовательности. `1b1b1b1b`. Разобрано с помощью `extractAndParseSMLMessages()`.
- **Простой текст OBIS** (IEC 62056-21, ASCII "режим D") — удобочитаемые строки, например: `1-0:1.8.0*255(007459.78471652*kWh)`. Разобрано с помощью `extractAndParseAsciiMessages()`.

## Режим → сопоставление парсера

| `meter_mode` | Кодирование            | Парсер                                                                               | Примеры счетчиков                                   |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| **1**        | Простой текст OBIS     | `extractAndParseAsciiMessages()`                                                     | ZPA GH305                                           |
| **2**        | _не наблюдалось_       | переходит к парсеру SML + предупреждение                                             | —                                                   |
| **3**        | Бинарный SML           | `extractAndParseSMLMessages()`                                                       | ISKRA ISK00 7034, EasyMeter Q3AA2064, EMH eHZB, EFR |
| **4**        | Простой текст OBIS (¹) | `extractAndParseAsciiMessages()`                                                     | eBZ DD3                                             |
| **5**        | Простой текст OBIS     | `extractAndParseAsciiMessages()`                                                     | eBZ (EBZ5DD32R06…)                                  |
| _другой_     | _неизвестный_          | переходит к парсеру SML +`Potential problems with Pulse meter mode X` предупреждение | —                                                   |

¹ Некоторые счетчики сообщают `meter_mode=4` но фактически отправляют **двоичный SML** (наблюдается на измерителях ЭМГ, выпуск [№ 912](https://github.com/hombach/ioBroker.tibberlink/issues/912) ). Поэтому режимы 4 и 5 включают в себя защитную проверку: если полезная нагрузка начинается с `1b1b1b1b` Парсер SML используется независимо от указанного режима.

## История

- Добавлена поддержка режима 5 для счетчиков eBZ, отправляющих обычный текст OBIS ( [#931](https://github.com/hombach/ioBroker.tibberlink/issues/931) ). До исправления режим 5 передавался парсеру SML, который не может читать телеграммы в открытом текстовом формате, поэтому все состояния импульсов зависали на своем последнем значении.
- Добавлена защита бинарного SML-режима 4 для счетчиков EMH ( [#912](https://github.com/hombach/ioBroker.tibberlink/issues/912) ).

## Примечания по добавлению нового режима

1. Извлеките необработанный текст телеграммы из строки отладочного лога. `got HEX data from local pulse: <hex>`.
2. Чтобы определить кодировку, выполните декодирование (например, вставьте текст на <https://tasmota-sml-parser.dicp.net> для SML или преобразуйте его в ASCII с помощью шестнадцатеричного декодирования для текста OBIS).
3. Добавьте номер режима к `switch (this.meterMode)` в `tibberLocal.ts` (SML →`extractAndParseSMLMessages`, текст OBIS →`extractAndParseAsciiMessages`) и в список разрешенных `[1, 3, 4, 5]` Это отключает предупреждение "Возможные проблемы".
4. Добавить тест регрессии[`src/lib/tibberLocal.test.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.test.ts) Используя настоящий телеграмму, обновите таблицу выше.