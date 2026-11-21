---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solinteg/README.md
title: ioBroker.solinteg
hash: fTwpLOF+Trn4oDu/ks6Ggx7bnWgwS8bcrKGh/svYG4E=
---
![Логотип](../../../en/adapterref/iobroker.solinteg/admin/solinteg.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.solinteg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solinteg.svg)
![Тестирование и выпуск](https://github.com/bueste/ioBroker.solinteg/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.solinteg

Считывает данные с фотоэлектрических панелей, сети/счетчика и аккумуляторов с **гибридных инверторов Solinteg** с любым подключенным аккумулятором по **локальному протоколу Modbus TCP** . Не требует облачного аккаунта и доступа в интернет.

## Отказ от ответственности

Solinteg, Dyness, Wattsonic и M-TEC являются товарными знаками соответствующих владельцев. Это независимый адаптер, поддерживаемый сообществом, не разработанный, не одобренный и не поддерживаемый ни одной из этих компаний. Логотип Solinteg, представленный выше, используется с разрешения.

## Оглавление

- [Зачем нужен этот адаптер?](#why-this-adapter)
- [Совместимость](#compatibility)
- [Зарегистрируйте источник и ограничения (пожалуйста, ознакомьтесь).](#register-source-and-limitations-please-read)
- [Установка](#installation)
- [Конфигурация](#configuration)
- [Структура объекта/состояния](#objectstate-structure)
- [Доступ к записи EMS (управление инвертором/аккумулятором)](#ems-write-access-controlling-the-inverterbattery)
- [Опросы и эффективное чтение](#polling-and-efficient-reads)
- [Устранение неполадок / Часто задаваемые вопросы](#troubleshooting--faq)
- [Безопасность и конфиденциальность](#security--privacy)
- [Разработка](#development)
- [Список изменений](#changelog)
- [Лицензия](#license)

## Зачем нужен этот адаптер?

Информация о производителе и устройстве: [Solinteg](https://www.solinteg.com) (гибридные инверторы и системы хранения энергии на основе аккумуляторов).

В ioBroker отсутствует универсальная поддержка "Solinteg". Solinteg WR использует протокол Modbus TCP с открытой документацией, поэтому в принципе его можно было бы считать с помощью универсального протокола. `ioBroker.modbus` Адаптер и список регистров, вводимых вручную, — но это означает повторный ввод более 50 регистров вручную в административном интерфейсе, без контроля на уровне кода над масштабированием, типами данных или структурой объектов. Этот адаптер вместо этого взаимодействует напрямую с Modbus TCP (через `modbus-serial`), аналогично тому, как [ioBroker.zeptrion](https://github.com/bueste/ioBroker.zeptrion) , [ioBroker.goodwe-sems](https://github.com/bueste/ioBroker.goodwe-sems) и [ioBroker.husqvarna-automower-connect](https://github.com/bueste/ioBroker.husqvarna-automower-connect) взаимодействуют напрямую со своими соответствующими API устройств/облаков, обеспечивая полный контроль над отображением регистров, масштабированием и результирующим деревом объектов, а также возможность активного управления инвертором/аккумулятором (доступ к записи EMS, по умолчанию отключен).

## Совместимость

Этот адаптер предназначен для **семейства регистров Modbus INTEG-M** от Solinteg, используемых совместно:

- Гибридные инверторы серии Solinteg MHT (разработаны и протестированы на основе **MHT-25\~50K-100** , трехфазные, 25-50 кВт)
- Переименованные устройства одного и того же семейства оборудования/регистров: инверторы **Wattsonic** и **M-TEC Energy Butler** (согласно приведенной ниже эталонной реализации — не подтверждено автором данного адаптера).

Поддержка батарей является универсальной: адаптер считывает любые данные о батарее, которые сам инвертор передает по Modbus (SOC/SOH/напряжение/ток/мощность, минимальное/максимальное напряжение ячейки), независимо от марки батареи — он не взаимодействует с батареей напрямую. Протестировано/разработано на батарее **Dyness STACK100** (51,2 кВт·ч, подключенной к инвертору через CAN/RS485), но любая батарея, поддерживаемая инвертором, должна работать аналогичным образом.

Если ваше устройство использует то же семейство регистров, но не указано здесь, пожалуйста, создайте заявку или запрос на слияние — цель состоит в том, чтобы охватить всю экосистему Solinteg/INTEG-M, а не только одну конкретную комбинацию инвертора и батареи.

## Зарегистрируйте источник и ограничения (пожалуйста, ознакомьтесь).

Зарегистрируйте адреса в[`lib/registers.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/registers.js) Данные взяты из официальной документации протокола Solinteg Modbus TCP и проверены на соответствие стандартам.[`wills106/homeassistant-solax-modbus`](https://github.com/wills106/homeassistant-solax-modbus) (`custom_components/solax_modbus/plugin_solinteg.py`), в котором задокументировано идентичное семейство регистров INTEG-M, также используемое компаниями Wattsonic и M-TEC Energy Butler в рамках ребрендинга.

**Проверка проведена 05.10.2026 на реальном MHT-25\~50K-100 (ID блока 255, батарея Dyness STACK100):** каждый регистр карты отвечает, порядок 32-битных слов (старшее слово первым) и все масштабы подтверждаются правдоподобными значениями (например, мощность переменного тока -3601 Вт против мощности батареи -3600 Вт). Регистры фотоэлектрической системы пока не удалось проверить в реальных условиях (на тот момент фотоэлектрические панели не были подключены). Регистры управления EMS (`50xxx` /`52xxx` Блок считывается корректно, но его влияние при записи не проверялось — тщательно проверьте это, прежде чем включать [доступ на запись в EMS](#ems-write-access-controlling-the-inverterbattery) .

Подробная информация о состоянии отдельных ячеек батареи Dyness, помимо минимального/максимального напряжения (16 отдельных напряжений ячеек на модуль), **недоступна** по протоколу Modbus на инверторе — там отображаются только минимальное/максимальное напряжение ячеек и их идентификаторы. Для получения полной информации по каждой ячейке требуется отдельный API/MQTT-интерфейс Dyness Cloud. `ems.dyness.com` Центр разработчиков), который данный адаптер не реализует.

## Установка

После того, как этот адаптер появится в официальном репозитории адаптеров ioBroker, установите его обычным способом: **Администрирование -> Адаптеры -> найдите "solinteg" -> установить** .

До тех пор администратор ioBroker может добавить его вручную на хосте ioBroker:

```
iobroker url iobroker.solinteg
```

## Конфигурация

| Вкладка        | Параметр                        | Описание                                                                                                                              |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Связь          | Хост / IP-адрес                 | IP-адрес или имя хоста инвертора (или шлюза Modbus TCP/RTU)                                                                           |
| Связь          | Порт                            | Порт Modbus TCP, обычно 502.                                                                                                          |
| Связь          | Идентификатор подразделения     | Идентификатор устройства Modbus, по умолчанию 255 (инверторы Solinteg MHT по протоколу Modbus TCP); принимаются значения от 0 до 255. |
| Связь          | Истекло время ожидания запроса  | Время ожидания каждого запроса Modbus, в секундах                                                                                     |
| Опрос          | Быстрый интервал опроса         | Как часто считываются значения мощности/потоков (солнечные батареи, сеть, батарея) (по умолчанию 5 секунд)                            |
| Опрос          | Медленный интервал опроса       | Как часто считываются показания счетчиков энергии и диагностических данных (по умолчанию 30 секунд)                                   |
| Управление EMS | Включить доступ на запись в EMS | По умолчанию отключено — см. [доступ на запись в EMS.](#ems-write-access-controlling-the-inverterbattery)                             |

## Структура объекта/состояния

```
solinteg.0.info.connection                 Inverter reachable (bool)
solinteg.0.info.lastSuccess                Timestamp of the last successful poll
solinteg.0.info.lastError                  Last error message

solinteg.0.info.serialNumber / .firmwareVersion (text, e.g. V10.6.4.4-3.10.13.0)
solinteg.0.diag.inverterStatus / .faultFlags1-3 / .operationFlags / .armFaultFlags1-2
solinteg.0.diag.radiatorTemperature / .temperatureR-T

solinteg.0.pv.string1-4.voltage / .current / .power
solinteg.0.pv.totalPower

solinteg.0.grid.acPower / .frequency
solinteg.0.grid.voltageL1-3 / .currentL1-3

solinteg.0.meter.power / .powerL1-3
solinteg.0.meter.gridImportTotal / .gridExportTotal / .gridImportToday / .gridExportToday
solinteg.0.grid.backupPower

solinteg.0.battery.voltage / .current / .power / .soc / .soh / .temperature
solinteg.0.battery.minCellVoltage / .maxCellVoltage (+ their cell IDs)
solinteg.0.battery.chargeLimit / .dischargeLimit
solinteg.0.battery.chargeToday / .chargeTotal / .dischargeToday / .dischargeTotal
solinteg.0.battery.manufacturer / .ratedCapacity

solinteg.0.energy.pvGenerationToday / .pvGenerationTotal
solinteg.0.energy.acGenerationToday / .acGenerationTotal
solinteg.0.energy.houseConsumptionToday / .houseConsumptionTotal

solinteg.0.ems.*                           EMS control registers, see below
```

Состояния потока мощности всех фотоэлектрических систем/сети/счетчиков/аккумуляторов опрашиваются с быстрым интервалом; счетчики энергии, диагностические данные и регистры системы управления энергопотреблением опрашиваются с медленным интервалом.

## Доступ к записи EMS (управление инвертором/аккумулятором)

Он `ems.*` Состояния (режим работы, целевая мощность заряда/разряда, ограничения импорта/экспорта, ограничения защиты SOC батареи и т. д.) всегда **считываются** , поэтому вы можете видеть текущую конфигурацию EMS инвертора независимо от этой настройки. **Запись** в них по умолчанию отключена: любая попытка записи регистрируется и игнорируется до тех пор, пока в конфигурации экземпляра не будет включена опция «Включить доступ к записи в EMS».

Включайте эту функцию только в том случае, если вы действительно хотите управлять инвертором/аккумулятором (например, планировать мощность зарядки/разрядки, экспортировать энергию в сеть). Неправильное значение регистра или масштабирование могут привести к переходу инвертора в непредусмотренный режим работы — см. [раздел «Источник регистра и ограничения»](#register-source-and-limitations-please-read) .

## Опросы и эффективное чтение

[`lib/blocks.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/blocks.js) объединяет смежные (или почти смежные, с небольшими промежутками) регистры в небольшое количество `readHoldingRegisters()` Вызовов можно производить по мере необходимости за цикл опроса, вместо одного запроса Modbus на каждый регистр. Регистры быстрой и медленной групп блокируются независимо и опрашиваются с собственным интервалом.

## Устранение неполадок / Часто задаваемые вопросы

** `info.connection` пребывание `false` / обновление состояний не выполняется.** Проверьте идентификатор хоста/порта/устройства в конфигурации экземпляра и убедитесь, что ничто (брандмауэр, разделение VLAN) не блокирует TCP-порт 502 между хостом ioBroker и инвертором. Проверьте `info.lastError` для просмотра фактического сообщения об ошибке и журнала адаптера (Экземпляр -> Экспертный режим -> Уровень логирования) `debug`) для устранения основной ошибки Modbus.

**Как узнать IP-адрес моего инвертора?** Проверьте список клиентов вашего маршрутизатора/DHCP-сервера на наличие IP-адреса инвертора (часто он отображается по префиксу MAC-адреса производителя или имени хоста, связанному с Solinteg), или проверьте собственное приложение для настройки дисплея/Wi-Fi инвертора, если оно есть.

**Значения выглядят совершенно неправильно (огромные числа, отрицательные там, где ожидались положительные и т. д.).** Скорее всего, это `u32` /`s32` Несоответствие порядка байтов или масштабирования для этого конкретного регистра — см. [Исходный код регистра и ограничения](#register-source-and-limitations-please-read) . Пожалуйста, создайте проблему на GitHub, указав исходное значение. `info.rawResponse` Отладка в стиле отладки (включите логирование отладки) или сравнение фактического и ожидаемого значений, чтобы можно было скорректировать карту регистров.

**Можно ли использовать это с инверторами Wattsonic или M-TEC Energy Butler?** Теоретически да, согласно [совместимости](#compatibility) — они используют одно и то же семейство регистров INTEG-M. Это не было независимо подтверждено автором адаптера при работе с этим оборудованием; отзывы (положительные или отрицательные) через проблему на GitHub приветствуются.

**Ничего не происходит, когда я пишу кому-либо. `ems.*` Состояние.** Доступ на запись в EMS по умолчанию отключен — см. [раздел «Доступ на запись в EMS»](#ems-write-access-controlling-the-inverterbattery) . Проверьте журнал на наличие предупреждения, подтверждающего, что запись была проигнорирована.

## Безопасность и конфиденциальность

- Адаптер осуществляет передачу данных по протоколу Modbus TCP между устройствами в вашей локальной сети — без облачной учетной записи, без внешнего API, без необходимости хранения учетных данных.
- Функция записи EMS (единственная функция, которая может изменить поведение инвертора) по умолчанию отключена и должна быть явно включена.
- Перед отправкой записываемые значения проверяются на соответствие указанным в документации минимальным и максимальным значениям каждого регистра.

## Разработка

```
npm install
npm run lint
npm test          # unit tests (lib/registers.js, lib/modbusClient.js, lib/blocks.js) + package consistency check
```

Дополнительно рекомендуется перед каждым релизом:

```
npx @iobroker/repochecker@latest .
```

Приветствуются запросы на добавление изменений (pull requests), особенно для проверки/исправления адресов регистров на реальном оборудовании или для улучшения переводов (в настоящее время переводы на английский и немецкий языки завершены; для остальных 9 языков английский текст используется в качестве заполнителя).

## Более ранние изменения

Изменения в версиях 0.1.3 и более ранних см. в файле CHANGELOG\_OLD.md.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.10 (2026-11-02)

- Fix: the writable `ems.*` states were never subscribed, so every write to them was ignored. The adapter now subscribes to `ems.*` on start.
- Polling: each cycle is scheduled with `setTimeout` after the previous one has finished (was `setInterval`), so cycles cannot overlap or pile up when the inverter answers slowly. Reconnects after repeated errors now really wait for the backoff time.
- German label of the Unit ID field.

### 0.1.9 (2026-10-05)

- Type checking: `npm run check` (tsc with JSDoc types, `tsconfig.json`, `adapter-config.d.ts`) now runs in CI; the register map, the Modbus client and the adapter class are typed.
- Fix: a value that is neither a number nor a boolean written to a writable state is rejected with a warning (it would have been written to the register as 0).
- Older changelog entries moved to `CHANGELOG_OLD.md`.

### 0.1.8 (2026-10-05)

- Fix: the object tree now contains a channel object for every path segment (`pv.string1` to `pv.string4` were missing, reported by the ioBroker object structure check, E3009).

### 0.1.7 (2026-10-05)

- README: link to the manufacturer website (requirement of the ioBroker repository).

### 0.1.6 (2026-10-05)

- Preparation for the ioBroker repository: translations of the admin texts and of the metadata (title, description, news) in all languages, square 512x512 icon, `common.tier`, updated dependencies (`@iobroker/testing` 6, release-script 5, adapter-core 3.4.3), prettier configuration, Dependabot configuration.

### 0.1.5 (2026-10-05)

- Fix: a register that currently holds its "no value" marker (the off-grid command register reads 0xFFFF when no command is pending) now clears its state instead of keeping a stale value (`ems.offGridSwitch` kept showing `true`).

### 0.1.4 (2026-10-05)

- Fix: states created by an earlier version keep their old `common.min`/`common.max`, which still caused a warning at every start for values the inverter reports outside the write range. The adapter now removes these limits from existing states at startup.

## License

MIT License

Copyright (c) 2026 Stefan Bühler <iobroker@mailcarrier.ch>

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