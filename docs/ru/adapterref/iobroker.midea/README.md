---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.midea/README.md
title: ioBroker.midea
hash: rN8jfwxs85SLopsq8p9KCqOXt0t8ZLeiXzJA2gUVZQ8=
---
![Логотип](../../../en/adapterref/iobroker.midea/admin/midea.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.midea.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.midea.svg)
![Количество установок (последние)](http://iobroker.live/badges/midea-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/midea-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.midea.png?downloads=true)

# IoBroker.midea
Адаптер ioBroker для кондиционеров Midea, Dimstal и Royal Clima. Общается напрямую с вашим устройством по протоколу **LAN Midea** — поддерживаются прошивки V3 (по умолчанию), V2 и V1. Облачная учетная запись используется только для получения токенов шифрования для устройств V3 и для добавления имен устройств; устройства V1 и V2 работают без облачного хранилища.

## Как это работает
1. Отправка широковещательного UDP-пакета на порт 6445 для обнаружения всех устройств Midea в локальной сети.

В ответ на это прошивка V3 отправляет двоичный кадр 5a5a/8370, V2 — необработанный кадр 5a5a, а V1 — ответ `<?xml …>` (затем адаптер устанавливает короткий TCP-пакет с устройством для получения его идентификатора).

2. Для устройств версии V3 адаптер выполняет аутентификацию в настроенном облаке.

(По умолчанию MSmartHome; NetHome Plus, Midea Air или Ariston Clima можно выбрать в *облачном приложении*) и запрашивает пару `{token, key}` для каждого устройства, необходимую для установления соединения в локальной сети. Устройствам V1 и V2 облачный токен не требуется — для управления ими достаточно простого обнаружения.

3. С этого момента управление осуществляется по протоколу TCP/6444. В версии V3 используется транспортный протокол 8370.

(AES-256-CBC + сессия HMAC-SHA-256) с обертыванием зашифрованных AES-128-ECB тел команд. V1 и V2 отправляют те же тела команд AES-128-ECB внутри необработанных пакетов 5a5a без обертки 8370 и без ключа сессии.

Облако используется только для получения пар токен/ключ V3 и для отображения списка устройств, до которых не дошла трансляция. В облаке нет данных в режиме реального времени.

## Требования
- Node.js **20** или новее.
— Хост ioBroker должен совместно с устройством использовать широковещательный домен уровня L2 — UDP.

6445 должен достичь его. В сетях VLAN требуется широковещательный ретранслятор UDP (например,
`udpbroadcastrelay`).

- Для устройств с прошивкой V3 (большинство моделей текущей линейки AC): облачный аккаунт.

В соответствующем приложении *MSmartHome* (`com.midea.ai.overseas`, [Google Play](https://play.google.com/store/apps/details?id=com.midea.ai.overseas)) является вариантом по умолчанию. *NetHome Plus*, *Midea Air* и *Ariston Clima* также поддерживаются и могут быть выбраны в настройках *облачного приложения*. Устройства с прошивкой V1 и V2 управляются без облака и игнорируют учетные данные.

## Конфигурация
| Поле | Описание |
| ---------- | ----------------------------------------------------------------------------- |
| `user` | Адрес электронной почты вашей учетной записи MSmartHome. |
| `interval` | Интервал опроса в секундах (5–3600, по умолчанию 30). Опрос каждого устройства выполняется локально. |
| `интервал` | Интервал опроса в секундах (5–3600, по умолчанию 30). Опрос каждого устройства выполняется локально. |

## Дерево объектов
```text
midea.0
├── info.connection                 — boolean: cloud reachable
└── <deviceId>
    ├── info.*                      — id, name, host, mac, firmware, online…
    ├── capabilities.*              — flags reported by the appliance (B5)
    ├── status.*                    — current device state (read-only)
    └── control.*                   — writeable commands
```

### Элементы управления (бытовой кондиционер, 0xAC)
| Управление | Тип | Описание |
| --------------------- | ------- | ---------------------------------------------- |
| `powerOn` | логическое значение | Включить/выключить устройство |
| `temperatureSetpoint` | номер | 16–31 °C (60–87 °F) |
| `temperatureUnit` | перечисление | Цельсий/Фаренгейт |
| `fanSpeed` | число | 0–102 (102 = авто) |
| `fanSpeedName` | enum | silent / low / medium / high / full / auto |
| `swing` | перечисление | выключено / вертикальное / горизонтальное / оба |
| `ecoMode` | логическое значение | Эко-режим |
| `turboMode` | логическое значение | Турбо-режим |
| `sleepMode` | логическое значение | Режим сна |
| `purify` | логическое значение | Ионизатор / очиститель |
| `dryClean` | логическое значение | Внутренняя сушилка |
| `frostProtection` | логическое значение | обогрев для защиты от замерзания при 8 °C |
| `toggleDisplay` | кнопка | Переключить внутренний светодиодный дисплей |
| `toggleDisplay` | кнопка | Переключить внутренний светодиодный дисплей |

Дерево `status.*` отображает все данные, которые передаёт устройство (температура внутри/снаружи помещения, оси поворота, коды ошибок, состояние таймера, общее потребление `powerUsage` в кВт·ч и т. д.).
Дерево `capabilities.*` отражает ответ B5 о возможностях устройства, поэтому вы можете создавать ветви для своих скриптов в зависимости от того, что фактически поддерживает устройство.

### Элементы управления (осушитель, 0xA1)
| Управление | Тип | Описание |
| ------------------ | ------- | -------------------------------------------- |
| `powerOn` | логическое значение | Включить/выключить устройство |
| `targetHumidity` | число | целевая влажность 0–100 % |
| `fanSpeed` | номер | 0–127 (40 бесшумный, 60 низкий, 80 высокий, 102 автоматический) |
| `fanSpeedName` | enum | silent / low / medium / high / auto |
| `ionMode` | логическое значение | Режим ионизатора / аниона |
| `sleepMode` | логическое значение | Режим сна |
| `pumpSwitch` | логическое значение | Включение/выключение сливного насоса |
| `verticalSwing` | логическое значение | Вертикальное колебание |
| `tankWarningLevel` | число | Порог предупреждения о наличии воды в резервуаре (0–100 %) |
| `tankWarningLevel` | число | Порог предупреждения о низком уровне воды в резервуаре (0–100 %) |

Дерево `status.*` отображает все данные, которые передаёт устройство (температура внутри/снаружи помещения, оси поворота, коды ошибок, состояние таймера, общее потребление `powerUsage` в кВт·ч и т. д.).
Дерево `capabilities.*` отражает ответ B5 о возможностях устройства, поэтому вы можете создавать ветви для своих скриптов в зависимости от того, что фактически поддерживает устройство.

## Поддерживаемые типы устройств
Данная гарантия распространяется на все 36 типов аппаратов Midea V3, описанных в [мидеа-локальный](https://github.com/midea-lan/midea-local).

Полный контроль:

- бытовой кондиционер `0xAC`, коммерческий кондиционер `0xCC`, осушитель воздуха `0xA1`, вентилятор `0xFA`,

`0xFC` очиститель воздуха, `0xFD` увлажнитель.

- `0xCE` система подачи свежего воздуха, `0xCF` тепловой насос, `0xCD` водонагреватель с тепловым насосом,

`0xC3` контроллер теплового насоса (зоны, ГВС, бесшумный/эко/дезинфекция).

- Стиральная машина с верхней загрузкой `0xDA`, стиральная машина с фронтальной загрузкой `0xDB`, сушилка `0xDC`.
- Электрический водонагреватель `0xE2`, газовый водонагреватель `0xE3`, газовый котел `0xE6`.

`0xFB` электрический обогреватель.

- посудомоечная машина `0xE1`, микроволновая печь `0xB0`, встроенная духовка `0xBF`, вытяжка `0xB6`,

`0xB8` пылесос, `0xC2` умный туалет, `0xED` очиститель воды.

- светильник `0x13`, обогреватель для ванной `0x26`, посудомоечная машина для ванной `0x34`,

`0x40` вентилятор для ванной комнаты.

Метаданные только для чтения (в исходном коде не определено `MessageSet`):

- Холодильник `0xCA`.
- Скороварка `0xE8`, рисоварки `0xEA`/`0xEC`.
- Духовка `0xB1`, пароварка `0xB3`, комбинированная духовка-пароварка `0xB4`.
- Воздушный фильтр `0xAD` (датчик PM2.5 / VOC).

Для каждого управляемого типа поля, доступные для записи, отображаются в разделе `devices.<id>.controls.*`; значения датчиков находятся в разделе `devices.<id>.status.*`.

### Элементы управления (вентилятор, 0xFA)
| Управление | Тип | Описание |
| ------------------ | ------- | ------------------------------------------------------- |
| `powerOn` | логическое значение | Включить/выключить устройство |
| `mode` | enum | нормальный / естественный / сон / комфорт / тихий / младенец / … |
| `fanSpeed` | номер | 1–26 |
| `oscillate` | логическое значение | Включение/выключение осцилляции |
| `oscillationMode` | enum | off / oscillation / tilting / curve-w / curve-8 / both |
| `oscillationAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 |
| `tiltingAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |
| `tiltingAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |

### Элементы управления (очиститель воздуха, 0xFC)
| Управление | Тип | Описание |
| ------------------- | ------- | ------------------------------------------------- |
| `powerOn` | логическое значение | Включить/выключить устройство |
| `fanSpeedName` | enum | auto / standby / low / medium / high |
| `anion` | логическое значение | Анион / ионизатор |
| `childLock` | логическое значение | Блокировка от детей |
| `screenDisplayName` | enum | bright / dim / off |
| `detectMode` | enum | off / pm25 / methanal |
| `standby` | логическое значение | Автоматический переход в режим ожидания при чистом воздухе |
| `standby` | логическое значение | Автоматический переход в режим ожидания при чистом воздухе |

В дереве состояний значения датчиков pm25, tvoc, hcho, filter1Life и filter2Life доступны только для чтения.

### Элементы управления (увлажнитель, 0xFD)
| Управление | Тип | Описание |
| ------------------- | ------- | -------------------------------------------------------------------- |
| `powerOn` | логическое значение | Включить/выключить устройство |
| `targetHumidity` | число | целевая влажность 0–100 % |
| `fanSpeedName` | перечисление | самый низкий / низкий / средний / высокий / авто / выключено |
| `screenDisplayName` | enum | bright / dim / off |
| `disinfect` | логическое значение | Цикл дезинфекции |
| `дезинфицировать` | логическое значение | Цикл дезинфекции |

В дереве состояний значения датчиков currentHumidity, currentTemperature и tank доступны только для чтения.

## Поиск неисправностей
- **`Обнаружение локальной сети: обнаружено 0 устройств`** — ваш хост ioBroker не подключен к

Тот же широковещательный домен, что и устройство, или протокол UDP 6445 заблокирован брандмауэром.

- **Не удалось получить токен/ключ для…** — устройство находится в автономном режиме в облаке.

Учетная запись или учетные данные в конфигурации адаптера неверны.

- **`LanClient: timeout`** — AC доступен по UDP, но TCP/6444 используется

заблокировано, или к сети подключен другой клиент локальной сети (мобильное приложение).
Одновременно разрешена только одна сессия управления TCP.

Переключите адаптер в режим отладочного логирования — каждый этап протокола (вызовы в облако, обнаружение UDP, рукопожатие TCP, зашифрованные кадры) регистрируется с указанием размеров полезной нагрузки и идентификаторов устройств, поэтому диагностику реализации можно провести только по логам.

## Changelog

<!-- 
  Placeholder for next versions. Do NOT remove. 
-->
### 1.8.3 (2026-05-25)

-   Adds a NetHome Plus Fallback for ot working devices

### 1.8.1 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 ("value is illegal") by aligning
    the V3 cloud request with the msmart-ng reference: drops the
    `uid:null` and `platformId` body fields, the `Authorization` header,
    switches the `random` header to crypto-random hex and the `stamp`
    to UTC.

### 1.8.0 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 on regional accounts: the V3
    client now follows the cloud's MAS re-route, sends the missing
    auth header, and falls back from LITTLE to BIG udpId.

### 1.7.1 (2026-05-20)

-   Adds a fixture-driven test suite for the unified `_processFrame`
    hook introduced in 1.7.0. Covers all 26 device classes and replays
    two real captures (A1 dehumidifier) so future parser changes break
    loudly. No runtime behaviour change.

### 1.5.0 (2026-05-19)

-   Adds LAN support for V1- and V2-firmware appliances. They are now
    discovered alongside V3 devices and controlled directly over TCP/6444 —
    no cloud token required (V1 only needs the cloud for the device list, V2
    works fully offline).
-   Tested only against V3 hardware; V1/V2 paths are ported from the
    `midea-local` reference implementation. Reports of mis-decoded frames are
    welcome.

### 1.4.0 (2026-05-19)

-   Adds NetHome Plus, Midea Air and Ariston Clima cloud accounts (V3 firmware
    appliances). Pick the cloud variant in the new "Cloud app" setting; the
    default stays MSmartHome.
-   Object tree simplified: devices now appear directly under the instance
    (no `devices.<id>` prefix) and the controls channel is now called
    `control`.
-   On first 1.4.0 start the old object tree is cleared automatically. If you
    want to start fresh later, set `info.migrationV1` to `false` and restart
    the adapter.
-   V1-firmware appliances on the LAN are not supported — they show up in
    the cloud list but never respond to local discovery.

### 1.3.1 (2026-05-19)

-   Controls now stay automatically in sync with the device status across all
    appliance types.
-   Internal refactor — no behavior changes for end users.

### 1.3.0

-   Coverage for all 36 Midea appliance types.
-   Full control for heat pumps, washers and dryer, water heaters, gas boiler,
    electric heater, dishwashers, microwave, oven, range hood, vacuum, smart
    toilet, water purifier, bathroom light/heater/fan and fresh-air.
-   Read-only data for refrigerator, pressure/rice cookers, oven/steamer and
    air-box.

### 1.2.0

-   Full control for fan, air purifier, and humidifier.

### 1.1.0

-   Full control for dehumidifier and commercial AC.
-   Poll interval is now in seconds (default 30 s).

### 1.0.0

-   Breaking change: rewritten on the LAN-first Midea V3 protocol. The cloud is
    only used to fetch each device's token/key.
-   Adds device discovery, local status polling, full AC controls and metadata
    for other appliances.

### 0.0.7

-   Last release of the legacy implementation.

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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