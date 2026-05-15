---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hoymiles
hash: bzPkVlLsQxO7KBYl6EGif5/PSYkFchixsbRQIHxr6EQ=
---
![Логотип](../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

![Количество установок](https://iobroker.live/badges/hoymiles-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/hoymiles-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.hoymiles.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)
![Лицензия](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.hoymiles
[![Тестирование и выпуск](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml)

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## Отказ от ответственности
**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.**

**ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ.** Используйте на свой страх и риск. Авторы не несут ответственности за любой ущерб, причиненный вашему инвертору, DTU или любому другому оборудованию. Этот адаптер взаимодействует напрямую с вашим оборудованием — неправильное использование команд (ограничение мощности, перезагрузка, включение/выключение) может повлиять на вашу солнечную установку.

Данный адаптер никоим образом не связан с компанией Hoymiles Power Electronics Inc., не одобрен ею и не имеет к ней никакого отношения.

## Описание
Адаптер ioBroker для микроинверторов [**Хоймайлс**](https://www.hoymiles.com/) **HMS-xxxW-xT** со встроенным модулем WiFi DTU (DTUBI).

Два режима подключения (настраиваемые независимо друг от друга):

- **Локальное подключение:** Прямая связь TCP/Protobuf через порт 10081 — облако и шлюз не требуются.
- **Облако:** API Hoymiles S-Miles Cloud — расчет ежемесячной/годовой экономии энергии и выбросов CO2, расчет дохода

## Документация
- 🇺🇸 [Документация на английском языке](docs/en/README.md)
- 🇩🇪 [Немецкая документация](docs/de/README.md)

## Функции
- Двойной режим: локальный TCP/Protobuf и/или API облака S-Miles
- Постоянное TCP-соединение с протобуф-сигналом (автоматическое подтверждение активности в режиме ожидания каждые 20 секунд)
- Настраиваемый интервал передачи данных (0 = максимально быстрый, ~1 с за цикл)
- Cloud Relay: пересылает данные инвертора в облако Hoymiles от имени DTU, благодаря чему локальное соединение больше не блокирует загрузку данных в облако.
- Автоматическое определение времени опроса облака на основе конфигурации sendTime в DTU.
- Порядковые номера в структуре протокола (0-60000, соответствующие исходному приложению)
- Поддержка шифрования AES-128-CBC для новых версий прошивки DTU (вывод ключа SHA-256 из encRand)
- Данные в реальном времени: мощность, напряжение, ток, частота, энергия, температура
- Мониторинг каждой панели (PV0/PV1) — локальный и облачный
— Облачные данные по каждому инвертору: мощность, напряжение, частота, температура (API диаграмм Protobuf)
- Совокупные показатели потребления энергии: суточные, месячные, годовые, общие (кВт·ч)
- Расчет дохода на основе цены на электроэнергию (облачные сервисы)
- Отслеживание сокращения выбросов CO2 (облачное приложение)
- Команды: ограничение мощности (2-100%), включение/выключение/перезагрузка инвертора, перезагрузка DTU, ограничение коэффициента мощности, ограничение реактивной мощности, проверка предупреждений, проверка неисправности заземления, блокировка/разблокировка инвертора
- Мониторинг сигналов тревоги и предупреждений (109 кодов DE/EN)
- Качество состояния (`q`): помечает данные как устаревшие при отключении, заменяет резервный вариант в облаке, автоматически сбрасывается при повторном подключении.
- 5-минутный тайм-аут бездействия с автоматическим переподключением
- Модуль обнаружения сети для ioBroker.discovery
- TypeScript, ESLint, Prettier, GitHub CI/CD
- Полный i18n: en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn

## Конфигурация
Откройте конфигурацию адаптера в административном интерфейсе ioBroker.

### Локальное соединение (TCP)
| Настройки | По умолчанию | Описание |
|---------|---------|-------------|
| **Включить локальное соединение** | включено | Включить прямое TCP/Protobuf соединение |
| **Устройства DTU** | (пусто) | Таблица IP-адресов/имен хостов DTU. Добавьте по одной строке для каждого DTU. |
| **Интервал запроса данных** | 5 с | Секунды между запросами данных (0-300). Установите 0 для максимально быстрой обработки (без задержки между запросами). |
| **Коэффициент опроса конфигурации/сигналов тревоги** | 6 | Конфигурация и сигналы тревоги запрашиваются каждые N циклов данных. |
| **Cloud Relay** | включено | Пересылка данных в режиме реального времени в облако Hoymiles от имени DTU. Предотвращает блокировку загрузки данных в облако локальным соединением. |

### Подключение к облаку (S-Miles)
| Настройки | По умолчанию | Описание |
|---------|---------|-------------|
| **Включить облако** | выкл | Включить облачный API Hoymiles S-Miles |
| **Электронная почта S-Miles** | — | Адрес электронной почты вашей учетной записи S-Miles |
| **Пароль S-Miles** | — | Ваш пароль от учетной записи S-Miles (хранится в зашифрованном виде) |

Все инверторы в вашей облачной учетной записи обнаруживаются автоматически. Ручная настройка серийного номера не требуется.

Оба соединения могут быть включены одновременно. Локальные данные имеют приоритет — облачные данные заполняют данные, когда DTU находится в автономном режиме (например, ночью).

## Поддерживаемые инверторы
Этот адаптер предназначен для **микроинверторов Hoymiles HMS со встроенным модулем WiFi DTU** (DTUBI):

**1 струна (1T):**

| Модель | Статус |
|-------|--------|
| HMS-300W-1T | Непроверенный |
| HMS-350W-1T | Непроверенный |
| HMS-400W-1T | Непроверенный |
| HMS-450W-1T | Непроверенный |
| HMS-500W-1T | Не тестировалось |

**2 струны (2T):**

| Модель | Статус |
|-------|--------|
| HMS-600W-2T | Непроверенный |
| HMS-700W-2T | Непроверенный |
| HMS-800W-2T | **Протестировано** (локально + в облаке) |
| HMS-900W-2T | Непроверенный |
| HMS-1000W-2T | **Протестировано** (в регионе) |

**4 струны (4T) — единственный вариант DW:**

| Модель | Статус |
|-------|--------|
| HMS-1600DW-4T | Непроверенный |
| HMS-1800DW-4T | Непроверенный |
| HMS-2000DW-4T | Непроверенный |

> **Важно:** Этот адаптер **работает только** с моделями HMS, имеющими **встроенный Wi-Fi**. Он **НЕ** работает со следующими моделями: > - HMS-1600/1800/2000-4T **без** "DW" (они используют радиочастотный диапазон ниже 1G и требуют внешнего DTU) > - серия HM (без Wi-Fi, только радиочастотный) > - серия MI (без Wi-Fi, только радиочастотный) > - HMS/HMT с внешними модулями DTU-Pro или DTU-WLite > - трехфазные модели HMT

## Несколько инверторов
Этот адаптер поддерживает одновременное подключение нескольких инверторов:

- **Локально:** Добавьте несколько IP-адресов DTU в таблицу устройств.
- **Облако:** Все инверторы и станции в вашей учетной записи обнаруживаются автоматически.

Каждый DTU создает узел устройства, используя свой серийный номер в качестве идентификатора (например, `hoymiles.0.4143A01CEDE4.*`).
Облачные станции создают агрегированные узлы устройств (например, `hoymiles.0.station-12345.*`).

## Changelog
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

### 0.3.3 (2026-04-08)
- (@Eistee82) Fix jsonConfig schema warnings: button color, remove unsupported table properties

### 0.3.2 (2026-04-03)
- (@Eistee82) Fix remaining responsive layout issues for repochecker (staticText, header, divider)

### 0.3.1 (2026-04-03)
- (@Eistee82) Fix admin UI responsive layout (add missing size attributes for repochecker)
- (@Eistee82) Fix news translations in io-package.json for repochecker E2004

## License

MIT License

Copyright (c) 2026 Eistee82

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