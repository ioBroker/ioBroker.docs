---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hoymiles
hash: wbXYszzn/9E8KsEImOoPrxPK+ITlhq/pekorPXjOwlk=
---
![Логотип](../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

![Количество установок](https://iobroker.live/badges/hoymiles-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/hoymiles-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.hoymiles.svg)
![Тестирование и выпуск](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)
![Лицензия](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# ioBroker.hoymiles

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.**

**ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ.** Используйте на свой страх и риск. Авторы не несут ответственности за любой ущерб, причиненный вашему инвертору, DTU или любому другому оборудованию. Этот адаптер взаимодействует напрямую с вашим оборудованием — неправильное использование команд (ограничение мощности, перезагрузка, включение/выключение) может повлиять на вашу солнечную установку.

Данный адаптер никоим образом не связан с компанией Hoymiles Power Electronics Inc., не одобрен ею и не имеет к ней никакого отношения.

## Описание

Адаптер ioBroker для микроинверторов [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** и **HMS-xxx-xWB** со встроенным модулем DTU (DTUBI) WiFi/Bluetooth — локально или через облако S-Miles — а также, через облако, для гибридных инверторов **HAT** с батареей.

Два режима подключения (настраиваемые независимо друг от друга):

- **Локальный режим:** Прямая связь TCP/Protobuf через порт 10081 — без облака и шлюза.
- **Облачные сервисы:** API Hoymiles S-Miles Cloud — расчет ежемесячной/годовой экономии энергии и выбросов CO2, расчет дохода.

## Документация

- 🇺🇸 [Документация на английском языке](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md)
- 🇩🇪 [Немецкая документация](https://github.com/Eistee82/ioBroker.hoymiles/blob/main/docs/de/README.md)

## Функции

- Три пути подключения: локальный TCP/Protobuf, локальный Bluetooth (BLE) через Bluetooth-прокси ESPHome и/или API облака S-Miles.
- Локальный BLE для серии WB (например, HMS-800-2WB, без локального TCP-порта): автоматическое обнаружение шлюза (mDNS), автоматический выбор шлюза с наилучшим сигналом и импорт обнаруженных инверторов одним щелчком мыши.
- Постоянное TCP-соединение с протобуф-сигналом (автоматическое подтверждение активности в режиме ожидания каждые 20 секунд)
- Настраиваемый интервал передачи данных (0 = максимально быстрый, \~1 с за цикл)
- Облачная ретрансляция: пересылает данные инвертора в облако Hoymiles от имени DTU, благодаря чему локальное соединение больше не блокирует загрузку данных в облако.
- Автоматическое определение времени опроса облака на основе конфигурации sendTime в DTU.
- Порядковые номера в структуре протокола (0-60000, соответствующие исходному приложению)
- Поддержка шифрования AES-128-CBC для новых версий прошивки DTU (вывод ключа SHA-256 из encRand)
- Данные в реальном времени: мощность, напряжение, ток, частота, энергия, температура
- Мониторинг отдельных панелей (PV0/PV1) — локальный и облачный.
- Облачные данные по каждому инвертору: мощность, напряжение, частота, температура (API диаграмм Protobuf)
- Совокупные показатели потребления энергии: суточные, месячные, годовые, общие (кВт·ч)
- Расчет дохода на основе цены на электроэнергию (облачные сервисы)
- Отслеживание экономии выбросов CO2 (облачное приложение)
- Команды: ограничение мощности (2-100%), включение/выключение/перезагрузка инвертора, перезагрузка DTU, ограничение коэффициента мощности, ограничение реактивной мощности, проверка предупреждений, проверка неисправности заземления, блокировка/разблокировка инвертора.
- Мониторинг сигналов тревоги и предупреждений (223 кода, локализованы на все 11 языков)
- Качество состояния (`q`): помечает данные как устаревшие при отключении, заменяет резервный вариант в облаке, автоматически сбрасывается при повторном подключении
- 5-минутный тайм-аут бездействия с автоматическим переподключением
- Модуль обнаружения сети для ioBroker.discovery
- TypeScript, ESLint, Prettier, GitHub CI/CD
- Полный i18n: en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn

## Конфигурация

Откройте конфигурацию адаптера в административном интерфейсе ioBroker.

### Локальное соединение (TCP)

| Параметр                                         | По умолчанию | Описание                                                                                                                                                             |
| ------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Включить локальный**                           | на           | Включить прямое соединение TCP/Protobuf                                                                                                                              |
| **устройства DTU**                               | (пустой)     | Таблица IP-адресов/имен хостов DTU. Добавьте по одной строке для каждого DTU.                                                                                        |
| **Интервал запроса данных**                      | 5с           | Секунды между запросами данных (0-300). Установите 0 для максимально быстрой обработки (без задержки между запросами).                                               |
| **Коэффициент опроса конфигурации/сигнализации** | 6            | Конфигурационные данные и сигналы тревоги запрашиваются каждые N циклов передачи данных.                                                                             |
| **Мертвая зона ограничения мощности**            | 1 %          | Незначительные изменения ограничения мощности не отправляются на устройство. Каждая операция записи стирает два сектора флэш-памяти внутри инвертора. 0 = выключено. |
| **Минимальный интервал ограничения мощности**    | 60 с         | Кратчайший промежуток между двумя операциями записи ограничения мощности. Защищает флэш-память инвертора. 0 = выключено.                                             |
| **Облачная ретрансляция**                        | на           | Пересылка данных в режиме реального времени в облако Hoymiles от имени DTU. Предотвращает блокировку загрузки данных в облако локальным соединением.                 |

### Подключение к облаку (S-Miles)

| Параметр                      | По умолчанию | Описание                                                               |
| ----------------------------- | ------------ | ---------------------------------------------------------------------- |
| **Включить облако**           | выключенный  | Включить облачный API Hoymiles S-Miles                                 |
| **Электронная почта S-Miles** | —            | Адрес электронной почты вашей учетной записи S-Miles                   |
| **Пароль S-Miles**            | —            | Пароль от вашей учетной записи S-Miles (хранится в зашифрованном виде) |

Все инверторы в вашей облачной учетной записи обнаруживаются автоматически. Ручная настройка серийного номера не требуется.

### BLE-шлюз (ESPHome)

Для инверторов **серии WB** (например, HMS-800-2WB), которые подключаются только по Bluetooth, вы можете добавить в свою сеть небольшой и недорогой Bluetooth-мост (например [, ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) ), и адаптер будет подключаться к вашему инвертору через него — без использования облака.

Откройте вкладку **BLE** , включите **параметр «Включить шлюз BLE»** и сохраните изменения. Затем нажмите **«Добавить обнаруженные инверторы»** , введите **PIN-код** каждого инвертора, поставьте галочку **«Активный»** и сохраните. Пошаговое руководство см. в [документации](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome) .

Настройки сгруппированы по вкладкам **«Локальный / Облачный / BLE»** ; можно включить любую комбинацию одновременно.

## Поддерживаемые инверторы

Этот адаптер предназначен для **микроинверторов Hoymiles HMS со встроенным модулем DTU (DTUBI) Wi-Fi (или Wi-Fi + Bluetooth)** .

**Локальное соединение (TCP)** = прямое TCP/Protobuf-соединение на порту 10081 (модели WiFi). **Локальное соединение (BLE)** = локальное соединение Bluetooth через [Bluetooth-прокси ESPHome](https://esphome.io/projects/?type=bluetooth) (серия WB). **Облачное соединение** = API S-Miles Cloud — автоматическое обнаружение, данные в реальном времени (быстрый пакетный канал \~1,5–3 с), агрегированные данные об энергопотреблении, профиль сети, включение/выключение инвертора + перезагрузка, перезагрузка DTU.

| Модель        | Строки | Локальный (TCP) | Локальный (BLE)² | Облако | Статус                                                                       |
| ------------- | :----: | :-------------: | :--------------: | :----: | ---------------------------------------------------------------------------- |
| HMS-300W-1T   |    1   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-350W-1T   |    1   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-400W-1T   |    1   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-450W-1T   |    1   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-500W-1T   |    1   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-600W-2T   |    2   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-700W-2T   |    2   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-800W-2T   |    2   |        ✅        |         —        |    ✅   | **Протестировано** (локально + в облаке)                                     |
| HMS-900W-2T   |    2   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-1000W-2T  |    2   |        ✅        |         —        |    ✅   | **Протестировано** (локально)                                                |
| HMS-1600DW-4T |    4   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-1800DW-4T |    4   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-2000DW-4T |    4   |        ✅        |         —        |    ✅   | Непроверенный                                                                |
| HMS-600-2WB   |    2   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-700-2WB   |    2   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-800-2WB   |    2   |        ❌¹       |         ✅        |    ✅   | **Протестировано** (облако; в процессе тестирования использовался BLE-шлюз). |
| HMS-900-2WB   |    2   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-1000-2WB  |    2   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-1600-4WB  |    4   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-1800-4WB  |    4   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |
| HMS-2000-4WB  |    4   |        ❌¹       |         ✅        |    ✅   | Непроверенный                                                                |

¹ **Серия WB** (продающаяся как **"HiFlow Pro"** ) не имеет локального TCP-порта — её единственный локальный канал — Bluetooth LE. Доступ к ней можно получить либо **локально через Bluetooth** (см. столбец _"Локальный (BLE)"_ ), либо через **облако** . Все модели WB используют одну и ту же платформу; пока протестирована только модель HMS-800-2WB.

² Для работы **локального режима (BLE)** требуется [Bluetooth-прокси ESPHome](https://esphome.io/projects/?type=bluetooth) (недорогой ESP32) в вашей сети; адаптер затем считывает данные с инвертора и управляет им локально по Bluetooth, без использования облака. Модели с Wi-Fi (T) в этом не нуждаются — они используют локальный TCP-путь. См. раздел _«BLE-шлюз (ESPHome)»_ в [документации](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome) .

**Работа только в облаке:** любой поддерживаемый инвертор в вашей учетной записи S-Miles также работает без локального подключения — адаптер автоматически обнаруживает его и предоставляет данные о мощности в реальном времени (пакет пиковой нагрузки), сводные данные об энергопотреблении, профиль сети, а также команды включения/выключения инвертора + перезагрузки и перезагрузки DTU через облако. Для остальных команд (ограничение мощности, блокировка, предупреждения об очистке и т. д.) требуется локальное TCP-соединение.

> **Важно:** Этот адаптер работает **только** с моделями HMS, имеющими **встроенный Wi-Fi** . Он **НЕ** работает со следующими моделями:
>
> - HMS-1600/1800/2000-4T **без** "DW" (эти устройства используют радиочастоты ниже 1 ГГц и требуют внешнего блока DTU).
> - Серия HM (без Wi-Fi, только радиочастотная связь)
> - Серия MI (без Wi-Fi, только радиочастотная связь)
> - HMS/HMT с внешними модулями DTU-Pro или DTU-WLite
> - Трехфазные модели HMT

## Несколько инверторов

Этот адаптер поддерживает одновременное подключение нескольких инверторов:

- **Локально:** Добавьте несколько IP-адресов DTU в таблицу устройств.
- **Облачное хранилище:** Все инверторы и станции в вашей учетной записи обнаруживаются автоматически.

Каждый DTU создает узел устройства, используя свой серийный номер в качестве идентификатора (например, `hoymiles.0.4143A01CEDE4.*` Облачные станции создают агрегированные узлы устройств (например, `hoymiles.0.station-12345.*`).

## Changelog
### 0.5.0 (2026-09-25)

- (@Eistee82) **DTUs with firmware V01.01.01 work locally again.** That firmware encrypts the local connection and moves the DTU's cloud link to TLS on port 10083; the adapter now speaks both. DTUs with older firmware are unaffected
- (@Eistee82) **Hybrid inverters with a battery (HAT series, e.g. HAT-6.0HV-EUG1) can be read through the cloud** — experimental, needs an installer-type S-Miles account. Everything about the battery is in one place below the inverter (`<dtuSerial>.battery.*`); the plant gets its live power flow, its energy balance for today, month, year and lifetime including the self-sufficiency rate (the figures of the app's "Production & Consumption" tab), income and cost, its measuring points (grid meter, loads, PV meter, generator), day curves, the cloud's alarm list and the relay settings. Read-only; power on/off and reboot are sent in the form such a device expects. Many thanks to BastiBerlin for providing access to a real system for development and testing
- (@Eistee82) **WB-series inverters (e.g. HMS-800-2WB) can be used locally over Bluetooth** through a cheap ESP32 running an ESPHome Bluetooth Proxy, found automatically. A Shelly or ecotracker meter can be connected to such an inverter, either to read it out or so the inverter itself keeps the grid feed-in at zero. Nightly reconnect attempts no longer flood the log
- (@Eistee82) **Your inverters and plants appear on the Config Manager tab** with live values, controls and a settings dialog, and the adapter settings are split into Local, Cloud and Bluetooth tabs with links to the S-Miles portal and the Bluetooth-proxy instructions. In the adapter list it now appears as "Hoymiles Inverters"
- (@Eistee82) **More accurate readings, less wear:** the inverter's full daily power curve (`history.powerJson`) is read locally, the plant total keeps up with the individual inverters, energy counters no longer jump backwards after a restart, `inverter.activePowerLimit` no longer shows 0 % while producing, and the DTU's network, meter, zero-export and lock settings become states. Power-limit writes are rate-limited because every write wears the inverter's flash memory, and a single setting no longer overwrites the rest of the configuration
- (@Eistee82) **Renamed and removed states:** the WiFi signal is a 0–100 quality, not dBm, and is now called `dtu.signalQuality` / `config.wifiSignalQuality` (was "rssi"). `inverter.modulationIndexSignal`, `dtu.searchResult` and `pvN.errorCode` never held usable data and disappear from existing installations by themselves

### 0.4.1 (2026-07-18)
- (@Eistee82) Packaging: removed the npm `prepare` install script — installs from GitHub now use the committed `build/` output directly, so no dev dependencies are downloaded onto the target system; npm releases are still built freshly via `prepublishOnly`
- (@Eistee82) CI/test reliability: added a global Mocha timeout and switched the test TLS certificates to fast EC keys, so the adapter-tests no longer time out on loaded CI runners

### 0.4.0 (2026-07-17)
- (@Eistee82) Cloud-only support for WB inverters ("HiFlow Pro", e.g. HMS-800-2WB): read power and energy over the S-Miles cloud and switch the inverter on/off, reboot it or reboot the DTU — no local connection needed
- (@Eistee82) Faster live values: new realtime channel updates power every few seconds instead of every ~80 s, like the app's live view
- (@Eistee82) More local data: inverter grid profile, a persistent power limit, per-string error codes and complete alarm lists
- (@Eistee82) More reliable and readable: alarm texts in your ioBroker language, fixed offline/online detection, S-Miles Home account support, and better data quality handling
- (@Eistee82) Maintenance and security: dependency and GitHub Actions updates that close known security advisories, admin translations migrated to the current i18n file format, and connection timers are now managed by ioBroker so they are reliably cleaned up on stop/restart

### 0.3.5 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (@Eistee82) Stop retry loop on permanent cloud auth errors to prevent Hoymiles account lockout
- (@Eistee82) Add `info.cloudLastError` state and raise an ioBroker alert notification with reset instructions on permanent cloud auth errors
- (@Eistee82) Bump axios to 1.15.0 and protobufjs to 8.0.1
- (@Eistee82) Add S-Miles Home account support (Argon2id login + `/pvmc/.../*_c` data API)
- (@Eistee82) Decide cloud profile (installer / home) via a post-login probe against `/pvm/.../select_by_page` instead of `pre-insp.v` — Hoymiles unified all accounts onto Argon2id in 2026
- (@Eistee82) Drop the dead v0 auth fallback
- (@Eistee82) Skip cloud-station states for fields the home-profile API doesn't provide (no empty placeholders for `latitude`/`longitude`/firmware version strings)
- (@Eistee82) Add a "Test cloud login" diagnostic button to the admin UI with per-phase results (`region_c`, `pre-insp`, `login`, `probe`) for forum bug reports
- (@Eistee82) Bump `protobufjs` to 8.2.0 to address seven security advisories (4 high, 3 medium — code injection, prototype pollution, DoS variants) affecting 8.0.0–8.0.1
- (dependabot) Bump dev-only transitive `follow-redirects` to 1.16.0 (security: leaked auth headers on cross-domain redirects) and `deepl-node` to 1.27.0 (drops the unused `uuid` dependency)

### 0.3.4 (2026-04-08)
- (@Eistee82) Fix disabled property type in jsonConfig table items (string, not boolean)
- (@Eistee82) Add local repochecker script (`npm run test:repo`)

Older entries: see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Eistee82 (t.me/AMEistee)

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