---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.govee-smart/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart
hash: P1yZhgHD3Ggmr2ToRk/hGEO7+sLe5VUrB5vEDNYwqOc=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart

![npm версия](https://img.shields.io/npm/v/iobroker.govee-smart)
![стабильный](https://iobroker.live/badges/govee-smart-stable.svg)
![Установки](https://iobroker.live/badges/govee-smart-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.govee-smart)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Управляйте всеми устройствами Wi-Fi ([Гови](https://www.govee.com/)) из ioBroker — освещением, датчиками и бытовой техникой. Устройства, работающие только по Bluetooth, не поддерживаются.

Адаптер использует все доступные каналы Govee (LAN, Cloud REST, AWS IoT MQTT, OpenAPI MQTT, App API) и выбирает тот, который обеспечивает наиболее быстрый ответ для каждого устройства. Подробности в **[Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

---

## Документация
Полная пользовательская документация находится в **[Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

| Тема | Английский | Немецкий |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Целевая страница | [Главная страница](https://github.com/krobipd/ioBroker.govee-smart/wiki/Home) | [Стартовая страница]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Startseite) |
| Поддерживаемые модели, значения статуса, добавляйте свои | [Устройства](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) | [Герэте](https://github.com/krobipd/ioBroker.govee-smart/wiki/Geraete) |
| Каждая точка данных, куда она попадает, что она делает | [[Дерево состояний](https://github.com/krobipd/ioBroker.govee-smart/wiki/State-Tree) | [Точки данных]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Datenpunkte) |
| Термометры, обогреватели, чайники и т. д. — дерево состояний, обновления, устранение неполадок | [[Датчики и бытовая техника](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensors-and-Appliances) | [Датчики и бытовая техника]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensoren-und-Appliances) |
| Освещение — подсчет сегментов, мастер, нарезка полос, пакетные команды | [Сегменты](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segments) | [Сегменты](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segmente) |
| Освещение — библиотека сцен, ползунок скорости, облачные и локальные снимки | [[Сцены и снимки](https://github.com/krobipd/ioBroker.govee-smart/wiki/Scenes-and-Snapshots) | [Сцены и снимки]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Szenen-und-Snapshots) |
| Светофоры — групповое веерное распространение, пересечение возможностей | [Группы](https://github.com/krobipd/ioBroker.govee-smart/wiki/Groups) | [Группы]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Gruppen) |
| Именование папок, запуск, диагностика, устранение неполадок | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Верхальтен](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |
| Именование папок, запуск, диагностика, устранение неполадок | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |

---

## Функции
- **Ориентация на возможности** — состояния генерируются на основе данных, предоставляемых API Govee для каждого устройства. Нет необходимости жестко задавать артикулы, нет необходимости вручную поддерживать список устройств, от которого можно отстать.
- **LAN-first для освещения** — Обнаружение многоадресных UDP-запросов, команды менее чем за 50 мс, обновления статуса через AWS IoT MQTT
- **Облако + MQTT-передача данных для датчиков и устройств** — показания через API приложения, события через брокер MQTT OpenAPI.
- **Задание цвета и яркости для каждого сегмента** для светодиодных лент с соответствующими возможностями, включая пакетные команды и интерактивный мастер определения сегментов для обрезки лент.
— **Сцены, сценарии, созданные пользователем, музыкальный режим, переключение градиента** — активируются локально через BLE-over-LAN, где это возможно, в противном случае используется облачное хранилище.
— **Облачные и локальные снимки** — Снимки приложения Govee и снимки со стороны ioBroker рядом.
- **Группы** — интеграция групп Govee с ioBroker с возможностью пересечения функций между участниками.
- **Кнопка экспорта диагностических данных для каждого устройства** — вывод JSON-данных в один клик для отчетов об ошибках.
- **Работает без учетных данных** — По умолчанию работает только в локальной сети, каждый уровень учетных данных открывает дополнительные возможности.
- **Ограниченное использование облачных сервисов** — ежедневные и поминутные лимиты соответствуют квоте Govee.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- ioBroker Admin >= 7.8.23
- Учетная запись Govee и как минимум одно устройство Govee WiFi. Для управления по локальной сети требуется светильник с включенным режимом LAN в приложении Govee Home — см. список поддерживаемых устройств Govee для работы по локальной сети на сайте [https://app-h5.govee.com/user-manual/wlan-guide].

---

## Начиная
Адаптер работает только по локальной сети без каких-либо учетных данных. Добавление ключа API открывает доступ к сценариям, сегментам и управлению устройствами. Добавление вашего адреса электронной почты и пароля Govee добавляет показания датчиков (температура/влажность через API приложения), отправку статуса в реальном времени и полный групповой контроль. См. раздел [Страница настроек](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup) для получения информации об уровнях учетных данных, способах получения ключа API и сетевых требованиях.

---

## Поддержка устройств
Статус тестирования каждого устройства отображается в разделе `diag.tier`. В разделе [Страница устройств](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) перечислены все поддерживаемые модели и значение их статуса.

---

## Поиск неисправностей
Распространенные проблемы (устройства не обнаружены, пустой список сцен, не меняющиеся цвета сегментов, ограниченное количество команд для групп, задержка обновления статуса) описаны на странице Wiki [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior)/[Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten).

Для всего остального установите значение **`diag.export`** в `true` на соответствующем устройстве, скопируйте JSON из `diag.result` и откройте [Проблема на GitHub](https://github.com/krobipd/ioBroker.govee-smart/issues).

---

## Благодарности
Реализация протокола аутентификации MQTT и BLE-over-LAN (ptReal) в этом адаптере основана на исследованиях [govee2mqtt](https://github.com/wez/govee2mqtt), проведенных Уэзом Фурлонгом. Их обратное проектирование протокола MQTT Govee AWS IoT и недокументированных API-интерфейсов оказалось бесценным.

---

## Поддерживать
- [Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki) — пользовательская документация (EN / DE)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.govee-smart/issues) — сообщения об ошибках, запросы на добавление новых функций
- [Форум ioBroker](https://forum.iobroker.net/) — общие вопросы

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.19.0 (2026-07-04)

- Device log lines now consistently name devices as "name (model)" — cache maintenance, command errors and wizard messages included, no more bare model/address labels
- The credentials entry disappears from the object tree — login tokens stay saved in encrypted form, just no longer visible as an object

### 2.18.2 (2026-07-03)

- Internal refactoring. No user-facing changes.

### 2.18.1 (2026-07-03)

- Added several new Govee devices to the catalog — 4 more lamps and 3 sensors (including a CO2 monitor). They start as experimental; enable them in the adapter settings to try them.

### 2.18.0 (2026-07-03)

- Devices you removed from your Govee account (and not reachable on your local network) now disappear from the adapter after a safety delay, instead of lingering forever — deleted groups too.
- Restored colour control in groups that contain a cloud-only member — `control.color_rgb` and `control.color_temperature` had gone missing from those groups.
- The persisted MQTT credentials are no longer a visible datapoint (`info.mqttCredentials` is gone) — they moved to an internal, non-loggable store, still encrypted.
- `info.appVersionDrift` is gone — the adapter now keeps its Govee-app version current on its own, so it keeps working when Govee updates their app (no adapter update needed).

### 2.17.0 (2026-07-01)

- **Breaking:** colour datapoints renamed to snake_case — e.g. `control.colorRgb` → `control.color_rgb`, and the colour-temperature one likewise (devices + groups). Update your scripts.
- Security: the Govee Cloud API key can no longer leak into the ioBroker log — it was written in plaintext on the cloud-events connection and is now masked.
- Security: the diagnostics export (the JSON you paste into a GitHub issue) no longer contains device or gateway secrets — a gateway's secret key and push topic are now masked.
- Security: a spoofed LAN discovery reply can no longer redirect a device's commands to another IP — the device address is taken from the real network source, not the packet.
- Robustness: the Admin "Test login" button is now rate-limited, so repeated clicks can no longer trigger a burst of Govee logins that could get your account temporarily locked.
- Security: a hostile or misbehaving device on your network can no longer flood the adapter with fake device announcements and slow it down — new devices are now bounded.
- Fixed: a device you delete from your Govee account is now removed from the adapter on the next cloud refresh (e.g. after a restart), instead of lingering as a phantom device for up to two weeks.
- New: a "Manually sync devices" button (`info.manual_sync_devices`) — set it to true to sync the device list with your Govee account on demand (add new, drop deleted) without a restart.
- Fixed: multi-colour DIY scenes activated over the local network now load correctly — longer scenes could previously be corrupted and silently fail to apply.
- Fixed: after you remove a device and add it again, its info states (name, model, …) are recreated correctly instead of leaving "has no existing object" warnings until the next restart.
- Fixed: if a Govee push/cloud-events connection connects but can't subscribe (a rare server hiccup), the adapter no longer reconnects every few seconds — the retry now backs off normally.
- Fixed: the admin "Test login" button now waits for the real MQTT connection before reporting — valid Govee account credentials no longer show a false "MQTT not up, restart the adapter" message.
- Fixed: on lamps whose music modes start at zero, the first mode was unreachable and "off" was missing — the music-mode selector is fixed. **Breaking:** its numbers shift by one, adjust scripts.
- Fixed: cloud snapshots whose value is a plain number are no longer dropped from the snapshot dropdown, and an entry with an empty value no longer shows up as a phantom option.
- Fixed: clearing the preset-scene selector no longer fires a spurious empty scene command.
- Fixed: DIY scenes you create in the Govee app now show up in the DIY dropdown after a reload, instead of only on the very first load.
- Fixed: a malformed `segments.command` (e.g. `;` instead of `:`) now logs a clear warning with the expected syntax instead of being silently ignored.
- Fixed: a command to a group with no reachable members (or where every member fails) is no longer reported as successful — it warns and leaves the state un-acknowledged, like a single device.
- Fixed: setting music sensitivity or auto-color on a LAN-controlled light no longer silently appears to succeed — the adapter now makes clear only the music mode applies locally.
- Fixed: an out-of-range segment range in `segments.command` (e.g. `0-2000000000`) is now clamped to the protocol limit instead of briefly freezing the adapter while it expands the range.
- Fixed: the segment-detection wizard now leaves your light off after it finishes or is cancelled if it was off before — it no longer leaves a light on that you had switched off.
- Fixed: the segment-detection wizard now restores your strip's original per-segment gradient on finish/abort instead of flattening it to a single colour — a uniformly-coloured strip is unaffected.
- Fixed: starting the segment-detection wizard twice in quick succession can no longer open two overlapping sessions.
- Fixed: the Govee account email field no longer shows a "valid email" error when you leave it empty — LAN-only and API-key-only setups no longer see a false validation error.
- Fixed: per-segment colour and brightness now show a default value instead of reading as null in visualizations before the first change.
- Fixed: sensor readings (temperature/humidity/battery/CO₂) now default to 0 instead of null in visualizations before the first reading arrives.
- Fixed: device groups no longer expose a meaningless "verified" trust-tier datapoint (the trust tier only applies to real devices, not groups).
- Fixed: cleaner shutdown/restart — the adapter no longer opens a cloud connection or reports a stray error after it has been told to stop.
- Fixed: a broken rate-limit reply from Govee no longer causes rapid repeated retries — the adapter now waits at least 5 seconds before trying again.
- Fixed: under heavy cloud load a fresh control command (power/brightness) is no longer dropped in favour of queued scene activations.
- Fixed: a LAN light no longer loses its power and colour controls after a cloud data refresh.
- Added: device catalog entries for the H5109 Pool Thermometer and H1630 Lantern Floor Lamp (user-reported) — they are now recognised instead of logging a "not supported" warning.
- Fixed: a sensor sending fresh readings now shows `info.online = true` even when Govee's cloud wrongly reports it offline (e.g. gateway thermometers) — online is derived from data freshness.
- Fixed: temperature-only sensors no longer keep a phantom humidity datapoint stuck at 0 — a device with no humidity sensor drops it, while a real thermo-hygrometer keeps its humidity.
- Fixed: a rejected Govee API key is now always reported as "API key rejected — check Govee API key" and stops the retry loop, instead of a generic error and retrying a bad key forever.

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