---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homewizard/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard
hash: Q2t+0YiBYUr835clE8viz19RW8bpanXF/ZD4mSYj9zo=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard

![npm версия](https://img.shields.io/npm/v/iobroker.homewizard)
![стабильный](https://iobroker.live/badges/homewizard-stable.svg)
![Установки](https://iobroker.live/badges/homewizard-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.homewizard)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Мониторинг энергопотребления в реальном времени для устройств [Домашний Волшебник](https://www.homewizard.com) Energy с использованием API v2.

---

## Функции
- **HomeWizard API v2** — HTTPS + WebSocket, аутентификация с использованием токена bearer.
- **Сопряжение mDNS** — обнаружение `_homewizard._tcp`, нажмите кнопку устройства для сопряжения.
- **WebSocket push** — измерения поступают примерно раз в секунду, изменения в системе и заряде батареи передаются в режиме реального времени; REST-опрос берет на себя управление, пока WebSocket переподключается.
- **Управление подключаемым аккумулятором** — режим зарядки/разрядки (включая прогнозирование на основе прогноза и однократную зарядку до полной емкости) и разрешение на подключение к сети через сопряженный счетчик P1/кВт·ч.
- **Адаптивное переподключение** — устройства со слабым Wi-Fi переключаются на более быстрый интервал переподключения и продолжают опрос REST, чтобы обеспечить непрерывный поток данных.
- **Зашифрованные токены устройства** — хранятся для каждого объекта устройства, перезагрузка адаптера при сопряжении или удалении не требуется.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **Администратор ioBroker >= 7.8.23**
- **Устройство HomeWizard с поддержкой API v2** (прошивка 4.x+ с включенным локальным API)

---

## Поддерживаемые устройства
| Устройство | Тип продукта |
| ----------------- | ------------------------------ |
| Измеритель P1 | HWE-P1 |
| Однофазный счетчик кВт·ч | HWE-KWH1 (также продается как SDM230) |
| Трехфазный счетчик кВт·ч | HWE-KWH3 (также продается под названием SDM630) |
| Аккумулятор с возможностью подключения к сети | HWE-BAT |

Аккумуляторная батарея подключается отдельно и отображается как самостоятельное устройство. Для управления режимом зарядки/разрядки и правами доступа к сети необходимо записывать данные в точки `battery.*` счетчика P1 или кВт·ч — именно там HomeWizard предоставляет доступ к командам управления батареей. Для режима `predictive` и переключателя `charge_to_full` требуется последняя версия прошивки устройства (API батареи 2.3.0+); более старые версии прошивки их отклоняют, и значение просто не применяется.

---

## Конфигурация
### Предварительные условия
На вашем устройстве HomeWizard необходимо включить **локальный API**:

1. Откройте приложение **HomeWizard** на своем телефоне.
2. Перейдите в **Настройки** > **Счетчики** > выберите ваше устройство > **Локальный API** > **Включить**

### Добавление устройства (автоматически через mDNS)
1. Перейдите на вкладку **Объекты** в административной панели ioBroker.
2. Установите значение `homewizard.0.startPairing` равным `true`.
3. **Нажмите физическую кнопку** на вашем устройстве HomeWizard в течение 60 секунд.
4. Устройство обнаруживается автоматически и отображается в папке `homewizard.0`.

### Добавление устройства (IP-адрес вручную)
Если mDNS недоступен (например, из-за другой VLAN, Docker или блокировки многоадресной рассылки брандмауэром):

1. Установите значение параметра `homewizard.0.pairingIp` равным IP-адресу вашего устройства.
2. Установите значение `homewizard.0.startPairing` равным `true`.
3. **Нажмите физическую кнопку** на устройстве в течение 60 секунд.

### Управление устройствами
Все сопряженные устройства перечислены на вкладке **Объекты** в разделе `homewizard.0`. Каждое устройство имеет свою собственную папку (например, `hwe-p1_5c2fafaabbcc`) с данными измерений, системными настройками и информацией об устройстве.

- **Удаление устройства:** Установите для его точки данных `remove` значение `true` — устройство и все точки данных будут удалены немедленно.
- **Изменение IP-адреса:** Обнаруживается автоматически — после 3 неудачных попыток переподключения mDNS ищет новый IP-адрес. Если он не найден, устройство помечается как находящееся в автономном режиме.

---

## Государственное дерево
```
homewizard.0.
├── info.connection              — Overall connection status (bool)
├── startPairing                 — Activate pairing mode (button)
├── pairingIp                    — Device IP for manual pairing (string)
└── {productType}_{serial}/      — e.g. hwe-p1_5c2fafaabbcc
    ├── info/
    │   ├── productName          — Device name (string)
    │   ├── productType          — Product type (string)
    │   ├── firmware             — Firmware version (string)
    │   ├── connected            — WebSocket connection status (bool)
    │   ├── wifi_ssid            — WiFi network name / SSID (string)
    │   ├── wifi_rssi_db         — WiFi signal strength (number, dBm)
    │   └── uptime_s             — Device uptime (number, s)
    ├── measurement/             — Measurement data
    │   ├── power_w              — Total power (number, W)
    │   ├── power_l1_w .. l3_w   — Power per phase (number, W)
    │   ├── voltage_v            — Voltage single-phase (number, V)
    │   ├── voltage_l1_v .. l3_v — Voltage per phase (number, V)
    │   ├── current_a            — Current single-phase (number, A)
    │   ├── current_l1_a .. l3_a — Current per phase (number, A)
    │   ├── frequency_hz         — Grid frequency (number, Hz)
    │   ├── energy_import_kwh    — Total import (number, kWh)
    │   ├── energy_import_t1..t4_kwh — Import per tariff (number, kWh)
    │   ├── energy_export_kwh    — Total export (number, kWh)
    │   ├── energy_export_t1..t4_kwh — Export per tariff (number, kWh)
    │   ├── tariff               — Active tariff (number)
    │   ├── state_of_charge_pct  — Battery charge level (number, %)
    │   ├── cycles               — Battery charge cycles (number)
    │   ├── average_power_15m_w  — 15-min average power (number, W, Belgium)
    │   ├── monthly_power_peak_w — Monthly power peak (number, W, Belgium)
    │   ├── monthly_power_peak_timestamp — Monthly peak timestamp (string)
    │   ├── meter_model          — Meter model identifier (string)
    │   ├── timestamp            — Measurement timestamp (string)
    │   ├── quality/             — Power quality counters
    │   │   ├── voltage_sag_l1..l3_count
    │   │   ├── voltage_swell_l1..l3_count
    │   │   ├── power_fail_count
    │   │   └── long_power_fail_count
    │   └── external/            — External meters (gas, water, heat)
    │       └── {type}_{id}/
    │           ├── value        — Meter reading (number)
    │           ├── unit         — Unit (string)
    │           └── timestamp    — Last update (string)
    ├── battery/                 — Battery control (if batteries connected)
    │   ├── mode                 — zero / to_full / standby / predictive (string, R/W)
    │   ├── charge_to_full       — One-shot charge to 100% (bool, R/W)
    │   ├── permissions          — JSON array (string, R/W)
    │   ├── battery_count        — Connected batteries (number)
    │   ├── power_w              — Battery power (number, W)
    │   ├── target_power_w       — Target power (number, W)
    │   ├── max_consumption_w    — Max consumption (number, W)
    │   └── max_production_w     — Max production (number, W)
    ├── remove                   — Remove device (button)
    └── system/                  — System settings
        ├── cloud_enabled        — Cloud communication (bool; R/W on meters, read-only on the Plug-In Battery)
        ├── status_led_brightness_pct — LED brightness 0-100 (number, R/W)
        ├── api_v1_enabled       — Toggle the device's deprecated v1 API (bool, R/W — leave off)
        ├── reboot               — Reboot device (button)
        └── identify             — Blink LED (button)
```

Состояния создаются динамически на основе данных, предоставляемых устройством. Не все устройства имеют все состояния. Счетчики кВт·ч дополнительно предоставляют информацию о состоянии кажущегося/реактивного тока, кажущейся/реактивной мощности и коэффициента мощности.

---

## Поиск неисправностей
### Устройство не обнаружено во время сопряжения
— Убедитесь, что устройство находится в той же сети/VLAN, что и сервер ioBroker.
— Убедитесь, что **локальный API** включен в приложении HomeWizard (Настройки > Счетчики > ваше устройство > Локальный API).
— Убедитесь, что ваш маршрутизатор/брандмауэр не блокирует многоадресный/mDNS-трафик.

### WebSocket постоянно отключается
— Проверьте `info.wifi_rssi_db` — уровень выше -75 дБм считается комфортным, уровень ниже -85 дБм объясняет частые обрывы связи.
— Для устройств со слабым Wi-Fi адаптер переключается на более короткий интервал переподключения (60 секунд вместо 5 минут) и продолжает опрос REST в фоновом режиме, чтобы вы не теряли данные.
— Функция проверки связи на уровне WebSocket с помощью пинг-понга (~30 с пинг, 10 с окном пинга) обнаруживает полумертвые соединения, когда TCP-поток буферизуется, но устройство перестало отвечать. Такие соединения автоматически разрываются и переподключаются — вы больше не получаете устаревший статус «подключено», пока значения измерений перестают обновляться.
- Изменения IP-адреса отслеживаются через mDNS — ручная перенастройка не требуется.

### Токен недействителен после сброса до заводских настроек
- Установите для параметра `remove` точки данных устройства значение `true`, затем выполните повторное сопряжение.

---

## Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.14.0 (2026-07-07)

- A brief WiFi dropout no longer makes the adapter wrongly treat a device as having a permanently unstable connection after a single outage
- Power-quality values (voltage sag/swell and power-fail counts) now sit in a named "quality" sub-folder under measurement instead of loose
- The Plug-In Battery's cloud-connection state is now a read-only indicator instead of a switch that could never be toggled
- Corrected state roles (grid frequency, reactive power) and 0–100 bounds (LED brightness, charge level); existing devices pick these up automatically on the next start and keep any names you changed
- Security: after an update, an older device is verified by its serial from the very first connection — its access token no longer briefly crosses a not-fully-verified connection
- Security: device and network-discovery names are cleaned before they reach the log, and pairing now cross-checks the device's serial against its certificate

### 0.13.0 (2026-06-24)

- Security: the adapter now checks each device's certificate, so it only ever talks to your real device
- Pairing a device by manual IP no longer leaves repeated pairing attempts and throwaway tokens behind on the device
- The manual pairing IP field now rejects addresses that are not on your home network
- Fixed a rare crash while a device was connecting or disconnecting
- Meter identifier and protocol version are now available as states

### 0.12.2 (2026-06-11) — stable

- Reboot and identify buttons reset themselves after the action, so they stay clickable in the admin UI
- Re-pairing a removed device no longer inherits the old device's log cooldown — its first connection warning shows up immediately again

### 0.12.1 (2026-06-09)

- Internal refactoring. No user-facing changes.

### 0.12.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

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

---

_Developed with assistance from Claude.ai_