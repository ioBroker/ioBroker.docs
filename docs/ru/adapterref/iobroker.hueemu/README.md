---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hueemu/README.md
title: ioBroker.hueemu
hash: 1lFEu0gzNuBtT0wR4PYm+iopAZ5XS46ADYOC7Gx6Y+E=
---
# IoBroker.hueemu

![npm версия](https://img.shields.io/npm/v/iobroker.hueemu)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)
![Установки](https://iobroker.live/badges/hueemu-installed.svg)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://raw.githubusercontent.com/krobipd/ioBroker.hueemu/main/admin/hue-emu-logo.png" width="100" />

Эмулирует мост [Philips Hue](https://www.philips-hue.com) (v2, BSB002), благодаря чему устройства ioBroker отображаются как светильники Hue для клиентов, поддерживающих только API Hue.

---

## Когда использовать этот адаптер
**Используйте его, если хотите управлять состояниями ioBroker со старого устройства или приложения, которое поддерживает только API Hue.** Примеры: Logitech Harmony Hub, контроллер умного дома Bosch, устаревшая прошивка Echo, сенсорные панели, встроенные в стену, заброшенные приложения для панелей управления, старые системы управления с плагином Hue.

### Современные Alexa, Google Home или Apple Home — используйте вместо них адаптер Matter.
Современные голосовые помощники напрямую поддерживают Matter. Используйте [адаптер ioBroker Matter](https://github.com/ioBroker/ioBroker.matter) — это подходящий инструмент. Этот адаптер предназначен только для клиентов, у которых нет опции Matter.

---

## Функции
- **Hue API v1** — Модель моста BSB002 (Hue Bridge v2)
- **Обнаружение UPnP/SSDP** — Автоматическое обнаружение любым клиентом, совместимым с Hue.
- **Прямое сопоставление состояний** — Указывает на любое состояние ioBroker, без использования скриптов-мостов.
- **Типы освещения** — Включение/выключение, Регулировка яркости, Цветовая температура, RGB
- **Шкала значений для каждого устройства** — выберите способ хранения яркости и насыщенности в исходном состоянии.
- **Постоянный TLS-сертификат** — клиенты доверяют мосту только один раз, при перезапусках идентификатор остается тем же.
- **Локализованные названия штатов** — метки администратора соответствуют системному языку ioBroker.
- **Автоматическая миграция** — устаревшие настройки `createLight` преобразуются в конфигурацию администратора при первом запуске.

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **Администратор ioBroker >= 7.8.23**

---

## Порты
| Порт | Протокол | Назначение | Настраиваемый |
|------|----------|---------|--------------|
| 8080 | TCP/HTTP | API Hue Bridge | Да — клиенты получают уведомления через SSDP |
| 1900 | UDP | Обнаружение SSDP/UPnP | Нет — исправлено стандартом UPnP |
| — | TCP/HTTPS | Дополнительный TLS (если настроен) | Да |

---

## Конфигурация
### Сетевые настройки
| Параметр | Описание | По умолчанию |
|--------|-------------|---------|
| **Хост** | IP-адрес моста (должен быть реальным сетевым IP-адресом) | — |
| **HTTP-порт** | Порт для API Hue | 8080 |
| **HTTPS-порт** | Требуется только в том случае, если клиент настаивает на TLS; в противном случае оставьте пустым | — |
| **MAC-адрес** | MAC-адрес моста (сгенерирован автоматически, если пуст) | — |

### Добавление устройств
1. Откройте вкладку **Конфигурация устройства**.
2. Нажмите кнопку «+».
3. Введите **название** (например, «Светильник в гостиной»).
4. Выберите **тип освещения**.
5. Отобразите **штаты** на карте с помощью обозревателя объектов (`...`)

### Поддерживаемые типы освещения
| Тип | Состояния | Модель оттенка |
|------|--------|-----------|
| **Вкл/Выкл** | `on` | LWB007 |
| **Цветовая температура** | `on`, `bri`, `ct` | LTW001 |
| **Цветной свет** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **Цветовой свет** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |

### Сопряжение
Перед подключением любого клиента необходимо активировать сопряжение:

1. ioBroker Objects → `hueemu.0` → установить **`startPairing`** в значение `true`
2. Начните поиск/сопряжение устройства в клиентском приложении в течение **50 секунд**.
3. После успешного сопряжения в разделе `hueemu.0.clients.*` появится новая запись.

### Подключение к Alexa (старые модели Echo без Matter)
> Если у вас установлена актуальная версия Echo, используйте вместо неё [адаптер материи](https://github.com/ioBroker/ioBroker.matter).

> **Совет:** Если Alexa не может найти мост, попробуйте изменить HTTP-порт на **80** в настройках адаптера — некоторые версии прошивки Alexa обнаруживают мосты только на порту 80.

1. Активируйте сопряжение (см. выше)
2. Приложение Alexa → Устройства → `+` → Philips Hue
3. Мост обнаруживается автоматически.

### Подключение к Logitech Harmony Hub
1. Активируйте сопряжение (см. выше)
2. В программе настройки Harmony: Добавить устройство → Освещение → Philips Hue → найдите bridge
3. Подтвердите сопряжение в течение 50 секунд.

---

## Государственное дерево
```
hueemu.0.
├── startPairing         — Enable pairing mode for 50 seconds (button)
├── disableAuth          — Disable authentication (switch)
└── clients/             — Paired client devices
    └── {username}       — Client API key (created during pairing)
```

---

## Поиск неисправностей
### Обновление с версии 0.x / устаревшего режима createLight
Если вы использовали старый JSON-формат `createLight` для определения состояния освещения, ваши устройства будут **автоматически перенесены** при первом запуске. Адаптер считывает существующие объекты устройств, преобразует их в новый формат административной конфигурации и перезапускается один раз. Никаких ручных действий не требуется — ваши существующие скрипты и автоматизации продолжают работать как раньше.

**Дополнительное улучшение:** В старой системе в качестве промежуточных звеньев использовались внутренние состояния адаптера, что требовало отдельных скриптов для управления самими устройствами. Теперь вы можете открыть настройки адаптера и изменить сопоставление состояний, чтобы оно указывало **напрямую** на состояния ваших устройств (например, `hm-rpc.0.dimmer.LEVEL` вместо `hueemu.0.1.state.bri`).

### Мост не найден
— Убедитесь, что порт UPnP (1900) не заблокирован брандмауэром.
— IP-адрес **хоста** должен быть фактическим сетевым IP-адресом, а не `0.0.0.0`.
— Проверьте правила брандмауэра на хосте ioBroker.

### Клиент не обнаруживает устройств / сопряжение не удается
— Установите значение `startPairing` равным `true` в разделе «Объекты ioBroker» → `hueemu.0` **перед** запуском поиска устройства в вашем клиенте — у вас есть 50 секунд.
— Убедитесь, что настроено хотя бы одно устройство.
— Проверьте журналы адаптера на наличие ошибок.

### Изменения состояния не работают
- Проверьте идентификаторы состояний в конфигурации устройства.
— В административной панели выберите соответствующую шкалу яркости/насыщенности для каждого устройства: Авто, Проценты (0..100), Нормализованная (0..1) или Hue-Raw (1..254). Для параметра `level.dimmer`, хранящего значения от 0 до 100, необходимо выбрать Проценты.
- Диапазон значений `ct` составляет 153–500 (Миредс)

---

## Благодарности
**Автор оригинала:** Кристофер Холомек ([@holomekc](https://github.com/holomekc))

**Модернизация:** krobi

---

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.hueemu/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.5 (2026-05-13)
- Debug log now traces previously silent paths: TLS certificate validity on reuse, every Hue API error response, SSDP discovery answers and device-binding scale decisions. Default log unchanged.

### 1.4.4 (2026-05-10)
- Brightness and saturation now have an explicit scale option per device, so values stored as 0..100 are no longer misread as full brightness. Existing setups keep working on the default.

### 1.4.3 (2026-05-10)
- TLS certificate is now stored and reused across restarts — clients only need to trust it once, and the adapter starts noticeably faster.
- Paired clients appear in Hue tools that read the bridge whitelist.
- HTTP API stays reachable even when SSDP port 1900 is already used by another adapter — the log explains how to add the bridge by IP.
- "Disable Auth" now reliably keeps its value across adapter restarts.
- Pairing window has a safety cap so a noisy network can't flood the bridge with new clients.

### 1.4.2 (2026-05-09)
- Adapter log messages are now English only, in line with the ioBroker community standard. Localized state names are unchanged.

### 1.4.1 (2026-05-07)
- Internal hardening. No user-facing changes.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2020-2024 Christopher Holomek <holomekc.github@gmail.com>  
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

*Developed with assistance from Claude.ai*