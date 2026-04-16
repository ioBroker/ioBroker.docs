---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hueemu/README.md
title: ioBroker.hueemu
hash: xRmGafv1z08eAddFLKqkMZ4Uo7UHJqH8fT/d0atoxvE=
---
# IoBroker.hueemu

![npm версия](https://img.shields.io/npm/v/iobroker.hueemu)
![Узел](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)
![Установки](https://iobroker.live/badges/hueemu-installed.svg)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://raw.githubusercontent.com/krobipd/ioBroker.hueemu/main/admin/hue-emu-logo.png" width="100" />

Эмулирует мост [Philips Hue](https://www.philips-hue.com) (v2, BSB002), позволяя управлять устройствами ioBroker через Alexa, Google Home и другие совместимые с Hue системы умного дома.

---

## Функции
- **Эмуляция Hue Bridge** — Полная совместимость с Hue API v1
- **Обнаружение UPnP/SSDP** — Автоматическое обнаружение системами умного дома
- **Современный административный интерфейс** — JSON-Config для простой настройки устройств
- **Гибкие типы устройств** — Включение/выключение, регулировка яркости, цветовая температура, RGB-подсветка

---

## Требования
- **Node.js >= 20**
- **ioBroker js-controller >= 7.0.0**
- **Администратор ioBroker >= 7.6.20**

---

## Порты
| Порт | Протокол | Назначение | Настраиваемый |
|------|----------|---------|--------------|
| 8080 | TCP/HTTP | API Hue Bridge | Да — клиенты получают уведомления через SSDP |
| 1900 | UDP | Обнаружение SSDP/UPnP | Нет — исправлено (все клиенты UPnP, включая Harmony, Alexa, Google Home, сканируют именно этот порт) |
| — | TCP/HTTPS | Дополнительный TLS (если настроен) | Да |

---

## Конфигурация
### Сетевые настройки
| Параметр | Описание | По умолчанию |
|--------|-------------|---------|
| **Хост** | IP-адрес моста (должен быть реальным сетевым IP-адресом) | — |
| **HTTP-порт** | Порт для API Hue | 8080 |
| **Порт HTTPS** | Дополнительный порт HTTPS | — |
| **MAC-адрес** | MAC-адрес моста (сгенерирован автоматически, если пуст) | — |

### Добавление устройств
1. Откройте вкладку **Конфигурация устройства**.
2. Нажмите кнопку «+».
3. Введите **название** (например, «Светильник в гостиной»).
4. Выберите **тип освещения**.
5. Отображение **штатов** на карте через браузер объектов (`...`)

### Поддерживаемые типы освещения
| Тип | Состояния | Модель оттенка |
|------|--------|-----------|
| **Вкл/Выкл** | `on` | LWB007 |
| **Цветовая температура** | `on`, `bri`, `ct` | LTW001 |
| **Цветной свет** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **Цветовой свет** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |

### Сопряжение
Прежде чем любое устройство (Alexa, Google Home, Harmony Hub и т. д.) сможет подключиться, необходимо активировать сопряжение:

1. ioBroker Objects → `hueemu.0` → установить **`startPairing`** в значение `true`
2. Начните поиск/сопряжение устройства в клиентском приложении в течение **50 секунд**.
3. После успешного сопряжения в разделе `hueemu.0.clients.*` появится новая запись.

### Подключение к Alexa
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
└── clients/             — Paired client devices (Alexa, Google Home, Harmony Hub, etc.)
    └── {username}       — Client API key (created during pairing)
```

---

## Поиск неисправностей
### Обновление с версии 0.x / устаревшего режима createLight
Если вы использовали старый JSON-формат `createLight` для определения состояния освещения, ваши устройства будут **автоматически перенесены** при первом запуске. Адаптер считывает существующие объекты устройств, преобразует их в новый формат административной конфигурации и перезапускается один раз. Никаких ручных действий не требуется — ваши существующие скрипты и автоматизации продолжают работать как раньше.

**Дополнительное улучшение:** В старой системе в качестве промежуточных звеньев использовались внутренние состояния адаптера, что требовало отдельных скриптов для управления самими устройствами. Теперь вы можете открыть настройки адаптера и изменить сопоставление состояний, чтобы оно указывало **напрямую** на состояния ваших устройств (например, `hm-rpc.0.dimmer.LEVEL` вместо `hueemu.0.1.state.bri`). Это полностью исключает необходимость в скриптах-мостах.

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
- Проверьте диапазоны значений: `bri` 0–100 или 0–1, `ct` 153–500 (Mireds)

---

## Благодарности
**Автор оригинала:** Кристофер Холомек ([@holomekc](https://github.com/holomekc))

**Модернизация (2026 г.):** кроби

---

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.hueemu/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

### 1.2.3 (2026-04-11)
- Extract shared `sanitizeId` utility module (DRY)
- Add Hue API value range constants for readability
- Add pairing timeout constant
- Improve callback error handling in UserService
- Replace `as any` with type-safe casts in DeviceBindingService
- Enforce `no-floating-promises` as error
- Split monolithic test file into focused modules (146 tests)
- Fix duplicate io-package.json news entry

### 1.2.2 (2026-04-11)
- Remove redundant `actions/checkout@v6` from CI workflow (ioBroker testing actions handle checkout internally)
- Fix `readme` URL in io-package.json (master → main)

### 1.2.1 (2026-04-08)
- Restore standard integration tests (create-adapter compatible)
- Add FORBIDDEN_CHARS sanitization for all external object IDs
- Remove CHANGELOG.md (changelog in README + CHANGELOG_OLD.md)
- Remove dead code, clean up empty JSDoc stubs

### 1.2.0 (2026-04-06)
- Rename `user` folder to `clients` — clearer naming for paired endpoints (Alexa, Harmony, etc.)
- Automatic migration of existing paired clients on startup

### 1.1.4 (2026-04-05)
- Clean up obsolete `info.connection` state, remove empty parent folders after state cleanup

### 1.1.3 (2026-04-05)
- Remove unused `info.connection` state (no external connection to track)

### 1.1.2 (2026-04-05)
- Compact startup log, move detail logs to debug level

Older entries have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

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