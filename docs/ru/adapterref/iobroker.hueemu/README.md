---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hueemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu
hash: PNYFNKNFdn+kQybZ0zLalPuIAizKMhqWXSWjxVNtmT8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu

![npm версия](https://img.shields.io/npm/v/iobroker.hueemu)
![стабильный](https://iobroker.live/badges/hueemu-stable.svg)
![Установки](https://iobroker.live/badges/hueemu-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

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
- **Помощник по устройствам** — сканирует ioBroker на наличие доступных для сопоставления источников света и добавляет их автоматически, или добавляет и редактирует каждый источник света вручную.
- **Типы освещения** — Включение/выключение, Регулировка яркости, Цветовая температура, RGB
- **Шкала значений для каждого устройства** — выберите способ хранения яркости и насыщенности в исходном состоянии.
- **Постоянный TLS-сертификат** — клиенты доверяют мосту только один раз, при перезапусках идентификатор остается тем же.
- **Локализованные названия штатов** — метки администратора соответствуют системному языку ioBroker.
- **Автоматическая миграция** — устаревшие настройки `createLight` преобразуются в конфигурацию администратора при первом запуске.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **Администратор ioBroker >= 7.8.23**

---

## Порты
| Порт | Протокол | Назначение | Настраиваемый |
| ---- | --------- | ---------------------------- | ----------------------------------- |
| 8080 | TCP/HTTP | API Hue Bridge | Да — клиенты получают уведомления через SSDP |
| 1900 | UDP | Обнаружение SSDP/UPnP | Нет — исправлено стандартом UPnP |
| — | TCP/HTTPS | Дополнительный TLS (если настроен) | Да |

---

## Конфигурация
### Сетевые настройки
| Параметр | Описание | По умолчанию |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| **Хост** | Сетевой интерфейс для привязки. Выберите `0.0.0.0`, чтобы прослушивать все интерфейсы (остается доступным при изменении IP-адреса) | 0.0.0.0 |
| **Объявленный IP-адрес** | Доступный IP-адрес, объявляемый клиентам для обнаружения. Оставьте поле пустым для автоматического определения основного интерфейса | авто |
| **HTTP-порт** | Порт для API Hue | 8080 |
| **HTTPS-порт** | Требуется только в том случае, если клиент настаивает на TLS; в противном случае оставьте пустым | — |
| **MAC-адрес** | MAC-адрес моста (сгенерирован автоматически, если пуст) | — |

### Добавление устройств
Откройте вкладку **Конфигурация устройства**. Есть два способа добавить светильники:

**Вручную** — нажмите **Добавить источник света**, введите имя, выберите тип источника света и сопоставьте состояния ioBroker с обозревателем объектов.

**Автоматически** — нажмите **Поиск источников света**. Адаптер сканирует ваши объекты на наличие элементов, похожих на источники света (включенные/выключенные, диммеры, устройства с регулировкой цветовой температуры и цветные светильники), и добавляет те, которые может сопоставить. Все обнаруженные, но не сопоставленные элементы (например, устройства с RGB-каналами) отображаются в отчете, поэтому вы можете добавить их вручную.

Каждый индикатор отображается в виде карточки — используйте **Редактировать**, чтобы изменить его назначение, или **Удалить**, чтобы удалить его.

### Поддерживаемые типы освещения
| Тип | Состояния | Модель оттенка |
| --------------------- | ------------------------------------- | --------- |
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
### 1.11.0 (2026-07-09)

- The devices tab can now scan ioBroker for dimmer, colour-temperature and colour lights and add the mappable ones. Manual add still works.

### 1.10.0 (2026-07-09)

- Fixed the adapter looking like it was running but ignoring all light changes when UDP port 1900 was already in use (common on Windows); it now recovers cleanly and stays reachable
- A light's on/off source state holding text such as "off", "no" or "disabled" is now correctly read as off instead of on
- Closed a brief moment during startup where requests could still be challenged for a password even though authentication was turned off in the configuration
- Upgrading from the old light setup no longer leaves stray leftover entries behind in the object tree
- Colour coordinates written as a spaced list such as "0.3, 0.4" are now parsed correctly instead of falling back to white
- The port fields in the settings now warn you if the chosen port is already in use by another adapter instance
- Hue and colour-temperature source states can now be given a scale: hue in degrees (0–360) and colour temperature in Kelvin are converted correctly, alongside the native Hue units

### 1.9.0 (2026-06-21) — stable

- You can now listen on all network interfaces (`0.0.0.0`) and set a separate advertised IP, so discovery keeps working even if the bridge's IP address changes
- Color lights mapped with only hue or only saturation now report the correct colour instead of falling back to a default white
- Fixed already-paired clients being wrongly rejected until a restart after a transient error while loading clients at startup
- A configured source state that no longer exists now produces a one-time warning in the log instead of a silently dead light

### 1.8.1 (2026-06-12) — stable

- Number values read from light states are now parsed strictly: text with extra characters after the number falls back to the default instead of being half-parsed
- Faster bridge config responses for clients that poll every second (such as Echo devices) by reusing the timestamp formatter instead of rebuilding it on every request

### 1.8.0 (2026-06-09)

- Color lights mapped via hue and saturation (without an XY state) now report the correct color mode, so apps that honor it show the actual color instead of a default white.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

_Developed with assistance from Claude.ai_