---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nut2/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2
hash: xYY+80IZaKrJlUbDx3jQP3LX+iqzct2eiJz9d07DMeI=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2

![npm версия](https://img.shields.io/npm/v/iobroker.nut2)
![стабильный](https://iobroker.live/badges/nut2-stable.svg)
![Установки](https://iobroker.live/badges/nut2-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.nut2)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Осуществляет мониторинг источников бесперебойного питания через [Инструменты для работы с сетевыми ИБП (NUT)](https://networkupstools.org/). Все устройства ИБП, подключенные к серверу NUT, автоматически обнаруживаются и опрашиваются.

---

## Функции
- Автоматическое обнаружение всех ИБП на сервере NUT с помощью команды `LIST UPS`.
- Динамическое создание состояния из `LIST VAR` — все, что отображается в отчетах UPS в качестве состояний ioBroker.
- Правильные типы данных: числовые значения в виде чисел (а не строк) с указанием единиц измерения (В, Гц, А, Ач, %, Вт, ВА, с, °C).
- Флаги `ups.status` анализируются как отдельные логические значения (online, onBattery, lowBattery, charging, ...) плюс вычисленный уровень серьезности (0–4)
- Мгновенные команды (INSTCMD) через состояния кнопок — управление звуковым сигналом, управление нагрузкой, самотестирование
- Записываемые переменные (SET VAR) — изменение настроек ИБП непосредственно из ioBroker
- Постоянное TCP-соединение с автоматическим переподключением и экспоненциальной задержкой.
- Селектор сетевого интерфейса для серверов с несколькими сетевыми интерфейсами
- Кнопка проверки соединения в административном интерфейсе

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **Администратор ioBroker >= 7.8.23**
- Работающий [сервер NUT](https://networkupstools.org/) (upsd) как минимум с одним настроенным источником бесперебойного питания (ИБП).

---

## Конфигурация
### Связь
| Параметр | Описание | По умолчанию |
| --------------------- | ---------------------------------------------------------------------- | ------- |
| **Хост сервера NUT** | Имя хоста или IP-адрес сервера NUT | — |
| **Порт** | Порт сервера NUT | `3493` |
| **Интервал опроса (с)** | Как часто запрашивать сервер NUT (2–300) | `15` |
| **Интервал опроса (с)** | Как часто запрашивать сервер NUT (2–300) | `15` |
| **Имя пользователя** | Имя пользователя NUT (необязательно — необходимо для команд и переменных с возможностью записи) | — |
| **Пароль** | Пароль NUT | — |
| **Использовать TLS (STARTTLS)** | Шифровать соединение через STARTTLS | выключено |
| **Требуется действительный сертификат** | Отклонять самоподписанные/недействительные сертификаты (отображается только при включенном TLS) | выкл |

Используйте кнопку **Проверить соединение**, чтобы убедиться в доступности сервера и увидеть обнаруженные устройства ИБП.

**О TLS:** Включение STARTTLS шифрует соединение, поэтому ваше имя пользователя и пароль NUT больше не передаются по сети в открытом виде. При настройках по умолчанию это защищает от пассивного прослушивания, но **не** от активной атаки типа «человек посередине», поскольку большинство серверов NUT используют самоподписанный сертификат, который невозможно проверить. Для полной защиты настройте сертификат, который клиент может проверить на сервере NUT, и включите параметр **Требовать действительный сертификат**. Сервер NUT должен быть собран с поддержкой TLS (`upsd` с `CERTFILE`/`CERTPATH`); в противном случае проверка соединения выдаст ошибку TLS.

### Передовой
| Параметр | Описание | По умолчанию |
| ----------------------- | --------------------------------------------------- | ------- |
| **Тайм-аут команды (с)** | Тайм-аут для отдельных команд протокола NUT (1–30) | `5` |
| **Включить команды** | Разрешить отправку мгновенных команд (INSTCMD) на ИБП | выкл |
| **Включить SET VAR** | Разрешить изменение переменных ИБП, доступных для записи | выключено |

Для использования обеих команд требуется пользователь NUT с соответствующими правами доступа, настроенными на сервере NUT.

---

## Государственное дерево
Штаты организованы по домену NUT. Точный набор штатов зависит от того, что сообщает ваш водитель UPS.

```
nut2.0.
├── info.connection                    — Connection to NUT server (bool)
└── {ups_name}/                        — Device (e.g. "ups0")
    ├── info/
    │   └── reachable                  — UPS responds / data is fresh (bool)
    ├── battery/
    │   ├── battery.charge             — Battery level (%, number)
    │   ├── battery.charge-low         — Low battery threshold (%)
    │   ├── battery.runtime            — Remaining runtime (s)
    │   ├── battery.type               — Battery chemistry (string)
    │   └── ...
    ├── device/
    │   ├── device.mfr                 — Manufacturer (string)
    │   ├── device.model               — Model name (string)
    │   ├── device.serial              — Serial number (string)
    │   └── ...
    ├── driver/
    │   ├── driver.name                — NUT driver name
    │   ├── driver.version             — Driver version
    │   └── ...
    ├── input/
    │   ├── input.voltage              — Input voltage (V, number)
    │   ├── input.frequency            — Input frequency (Hz, number)
    │   └── ...
    ├── output/
    │   ├── output.voltage             — Output voltage (V, number)
    │   ├── output.frequency           — Output frequency (Hz, number)
    │   └── ...
    ├── ups/
    │   ├── ups.load                   — UPS load (%, number)
    │   ├── ups.power                  — Apparent power (VA, number)
    │   ├── ups.realpower              — Real power (W, number)
    │   ├── ups.status                 — Raw status string (e.g. "OL CHRG")
    │   └── ...
    ├── status/                        — Parsed status flags
    │   ├── raw                        — Original status string
    │   ├── display                    — Human-readable status (e.g. "Online, Charging")
    │   ├── severity                   — 0=OK, 1=Info, 2=Warning, 3=Critical, 4=Emergency
    │   ├── online                     — On line power (bool)
    │   ├── onBattery                  — Running on battery (bool)
    │   ├── lowBattery                 — Battery is low (bool)
    │   ├── charging                   — Battery is charging (bool)
    │   ├── discharging                — Battery is discharging (bool)
    │   ├── replaceBattery             — Battery needs replacement (bool)
    │   ├── overloaded                 — UPS is overloaded (bool)
    │   ├── forcedShutdown             — Forced shutdown in progress (bool)
    │   ├── alarm                      — Alarm active (bool)
    │   ├── ecoMode                    — ECO / high efficiency mode (bool)
    │   ├── testing                    — Self-test in progress (bool)
    │   ├── overheat                   — UPS overheated (bool)
    │   └── ...                        — (19 flags total)
    └── commands/                      — Instant commands (if enabled)
        ├── beeper-enable              — Button: enable beeper
        ├── beeper-disable             — Button: disable beeper
        ├── test-battery-start         — Button: start battery test
        └── ...                        — (from LIST CMD)
```

> **Идентификаторы состояний:** первая точка в имени переменной NUT является разделителем каналов; все последующие точки становятся тире. Таким образом, `battery.charge.low` хранится как `battery.charge-low`, а мгновенная команда `test.battery.start` становится `commands.test-battery-start`.

### Уровни серьезности статуса
| Уровень | Значение | Типичные флаги |
| ----- | --------- | --------------------------- |
| 0 | ОК | OL, OL CHRG, OL HB |
| 1 | Информация | TRIM, BOOST, CAL |
| 2 | Предупреждение | OB (без LB), RB, BYPASS |
| 3 | Критическое состояние | Акушерство + Кровь |
| 4 | Аварийный | FSD |

---

## Поиск неисправностей
### Соединение не удалось
— Убедитесь, что сервер NUT доступен с хоста ioBroker: `nc -zv <host> 3493`
— Проверьте правила брандмауэра для TCP-порта 3493.
— Воспользуйтесь кнопкой «Проверить соединение» в административном интерфейсе.

### Команды не работают
— Убедитесь, что вкладка «Дополнительно» отмечена галочкой пункт «Включить команды».
- Необходимо настроить имя пользователя и пароль NUT с правами доступа `instcmds`.
— Проверьте конфигурацию `upsd.users` на сервере NUT.

### Переменные, доступные для записи, не работают
— Убедитесь, что на вкладке «Дополнительно» установлен флажок **Включить SET VAR**.
— Пользователю NUT необходимы права доступа `actions = SET` на сервере NUT.

### Штаты не обновляются
— Проверьте `info.connection` — если `false`, TCP-соединение разорвано.
— Проверьте журнал ioBroker на наличие кодов ошибок NUT (например, `DATA-STALE` означает, что драйвер ИБП потерял связь).
— Убедитесь, что интервал опроса соответствует вашей конфигурации.

---

## Благодарности
Поддержка NUT в ioBroker восходит к [Аполлон77](https://github.com/Apollon77) — его адаптер `iobroker.nut` добавил протокол Network UPS Tools на платформу в 2016 году и поддерживал его до 2025 года. Этот адаптер является независимой переработкой и не использует общий код с предыдущим.

---

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.nut2/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2026-08-12)

- Improved: more UPS values now carry their dedicated ioBroker role — mains frequency, status severity and humidity — so charts, visualisations and automatic device detection recognise them correctly.
- Fixed: a driver flag reporting an unusual value is now kept as a text state instead of being misread as a number, so its type no longer changes between updates.

### 0.6.0 (2026-08-11)

- UPS readings now carry their correct data type instead of plain text, so numeric values, yes/no fields and status values can be charted, compared and used directly in scripts.
- Security fix: the NUT username and password no longer appear in the ioBroker log, where they could previously show up in plain text while commands were exchanged.
- A UPS whose name contains a space, dot or other special character now appears correctly in the object tree instead of a broken or missing device entry.

### 0.5.3 (2026-07-26)

- The version history shown in the adapter manager now lists only versions that actually exist for this adapter.

### 0.5.2 (2026-07-26)

- The poll interval can now go down to 2 seconds — below that the NUT driver itself has no new readings to give.

### 0.5.1 (2026-07-13)

- Writable yes/no UPS settings (e.g. automatic restart after power returns) can now actually be changed from ioBroker — previously toggling them was silently rejected by the NUT server.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_