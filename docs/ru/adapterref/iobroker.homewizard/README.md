---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homewizard
BADGE-stable: https://iobroker.live/badges/homewizard-stable.svg
BADGE-Installations: https://iobroker.live/badges/homewizard-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homewizard
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homewizard/README.md
title: ioBroker.homewizard - Руководство пользователя
hash: nhasg0YUnqWJt1Ao+WcgZPLniMhHo00OtXuzLYo7icA=
---
# ioBroker.homewizard — Руководство пользователя

Данные об энергопотреблении в режиме реального времени с устройств HomeWizard Energy передаются по локальной сети. **API v2**.

## Требования

- Устройство HomeWizard, поддерживающее API v2: **Измеритель P1** (HWE-P1), **счетчик кВтч** Однофазный (HWE-KWH1 / SDM230) или трехфазный (HWE-KWH3 / SDM630), **Аккумулятор с возможностью подключения к сети** (HWE-BAT).
- Прошивка достаточно новая для локального API версии 2, и локальный API включен в приложении HomeWizard.
- Node.js >= 22, js-controller >= 7.2.2, Admin >= 8.0.11.

Розетка, водомер и дисплей энергопотребления используют только устаревший API версии 1. Они выходят за рамки проекта и не будут добавлены.

## Добавление устройства

В настройках адаптера отсутствует таблица устройств — устройства находятся в дереве объектов и добавляются нажатием кнопки на самом устройстве.

**При автоматическом обнаружении (обычный случай)**

1. Откройте **Объекты** вкладка и установить `homewizard.0.startPairing` к `true`.
2. В течение 60 секунд нажмите физическую кнопку на устройстве HomeWizard.
3. Устройство отображается в составе экземпляра в собственной папке.

Окно остается открытым в течение всех 60 секунд, поэтому можно добавить несколько устройств одновременно.

**С фиксированным IP-адресом** — для сетей, где mDNS не работает (отдельная VLAN, Docker без сетевого подключения хоста):

1. Введите IP-адрес устройства в... `homewizard.0.pairingIp`.
2. Затем установите `homewizard.0.startPairing` к `true` и нажмите кнопку на устройстве.

## Что вы получите

Для каждого устройства создается папка с определенным названием. `<product type>_<serial>` содержащий:

| Папка                  | Содержание                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `info`                 | Название и тип продукта, версия прошивки, сеть Wi-Fi и уровень сигнала, время работы, состояние подключения.                    |
| `measurement`          | Мощность, напряжение, ток, частота, суммарная потребляемая энергия по тарифам, временные метки.                                 |
| `measurement.quality`  | Провалы и скачки напряжения, счетчики отключений электроэнергии (только для P1)                                                 |
| `measurement.external` | Счетчики газа, воды и тепла, передающие данные через счетчик P1.                                                                |
| `system`               | Подключение к облаку, яркость светодиодного индикатора состояния, устаревший API версии 1, кнопки перезагрузки и идентификации. |
| `battery`              | Режим зарядки, права доступа, целевая мощность и счетчики — на измерительном приборе, с которым сопряжена батарея.              |

`remove` Удаляет устройство, включая все его данные.

## Состояния соединения

- `<device>.info.connected` — Это верно, пока устройство отвечает адаптеру. Это включает в себя резервный опрос, а не только подключение в реальном времени.
- `info.connection` — верно, если хотя бы одно устройство ответит.
- `info.devicesTotal` / `info.devicesOnline` / `info.devicesAllOnline` — сколько устройств настроено и сколько из них отвечают. `devicesTotal` Сохраняет своё значение, когда адаптер остановлен.

Измерения обычно поступают в виде push-уведомлений примерно раз в секунду. Если соединение обрывается, адаптер вместо этого опрашивает данные по протоколу HTTPS (каждые 10 секунд, каждые 30 секунд для устройства со слабым сигналом), одновременно восстанавливая соединение в фоновом режиме, чтобы передача данных продолжалась.

## Управление подключаемым аккумулятором

Аккумулятор подключен как отдельное устройство, но элементы управления расположены на нём. **Счетчик P1 или кВт·ч** С чем это работает — именно здесь HomeWizard их и выявляет:

- `battery.mode` — `zero`, `to_full`, `standby` или `predictive`.
- `battery.charge_to_full` — Зарядить до 100% один раз.
- `battery.permissions` — JSON-массив, записанный в текстовом формате.

`predictive` и `charge_to_full` Требуется последняя версия прошивки батареи (API 2.3.0). Более старые версии прошивки отклоняют их, и значение не применяется.

## Когда что-то не работает

**При сопряжении устройство не обнаруживается.** mDNS часто не работает через VLAN или мосты Docker. Используйте указанный выше путь с фиксированным IP-адресом.

**Сопряжение не удается сразу после нажатия кнопки.** Адаптер аннулирует выданный ему токен и предлагает повторить попытку. Убедитесь, что локальный API включен в приложении HomeWizard.

**Устройство отображается как неподключенное.** Адаптер никогда не сдаётся: он пытается установить соединение в режиме реального времени с увеличивающимися интервалами (до 5 минут), примерно раз в час ищет изменившийся IP-адрес через mDNS и переключается на более быстрый ритм для устройств, которые он распознаёт как имеющие слабый сигнал. Измерительный прибор в подвальном коридоре может отсутствовать несколько часов; ничего не нужно делать, чтобы он вернулся.

**«Недействительный токен — повторно выполните сопряжение устройства для исправления».** Устройство перестает принимать токен адаптера, обычно после сброса до заводских настроек. Повторное сопряжение сохранит существующие данные.

**Сообщения в логах о том, что срок действия входящего в комплект сертификата истек.** Адаптер содержит сертификат центра сертификации HomeWizard для проверки сертификатов устройств. Задолго до истечения срока его действия обновление адаптера предоставит новый сертификат.

## Конфиденциальность и безопасность

- Токены устройств хранятся в зашифрованном виде в объекте устройства, а не в конфигурации адаптера.
- Адаптер проверяет сертификат каждого устройства на соответствие его известным идентификационным данным, поэтому он не будет взаимодействовать с другим устройством, которое случайно имеет сертификат HomeWizard.
- Удаление устройства также аннулирует токен адаптера на самом устройстве.
- Включение `system.api_v1_enabled` Это повторно включает старый API версии 1 на устройстве. Этот API не использует шифрование и токены — любой пользователь в сети может читать и управлять устройством. Адаптер выдает предупреждение при выполнении этой операции.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.2 (2026-09-06)

- Fixed: a device the adapter could not read the stored token for can be removed again — its `remove` data point did nothing at all, and the device stayed in the tree for good.
- Fixed: renaming a device in the HomeWizard app now updates its `info.productName` data point; until now the new name showed up nowhere until the adapter was restarted.
- Fixed: the firmware version keeps up with a device that updates itself, instead of showing the version from the last adapter start.
- Fixed: a button falls back to "not pressed" even when the device cannot be reached, so it stays clickable instead of staying stuck.
- Changed: a device entry that is damaged or unreadable is now reported in the log instead of disappearing without a word.

### 0.18.1 (2026-09-04)

- Fixed: corrected data point names now also reach devices that are currently offline — until now they waited for the device to answer again, which for a meter with a weak signal could mean never.
- Changed: the object tree no longer holds the `info.legacyMigrated` data point, which never carried any information about your devices or their readings.

### 0.18.0 (2026-09-04)

- Fixed: a device that keeps answering while its push connection is down is no longer shown as not connected — the status describes the device now, not one connection type.
- Fixed: WiFi signal strength and uptime keep updating for such a device instead of freezing at the values from before the drop.
- Fixed: corrected names and descriptions now reach installations that already exist — until now they only ever arrived on fresh ones.
- Fixed: sending a message to the adapter works again — a leftover setting from an earlier version blocked every message silently, with nothing about it in the log.
- Fixed: a device with no usable IP address is reported at start-up and searched for, instead of staying quietly dead until the next restart.
- Fixed: the reboot and identify buttons reset themselves even when the command fails, so they no longer stay pressed in Admin.
- Fixed: the battery data points are removed once the meter reports that no battery is connected any more, instead of showing its last values forever.
- New: the data points under `info` explain what they mean in all eleven languages, and a user guide is now part of the documentation portal.
- Changed: for security, an address announced over the network is only accepted when it belongs to a private range, so pairing can no longer be directed at a host outside your own network.

### 0.17.0 (2026-09-02)

- Fixed: the connection status is now reset on every stop, even when the adapter is stopped right after it started — before, such a stop could leave it showing as connected.
- Fixed: a device that repeats the same error after reconnecting is warned about again, instead of staying silent for the rest of the adapter's run.
- Fixed: switching cloud access, the legacy v1 API or charge-to-full from a script now confirms the actual on or off value, not the raw text that was written.
- Fixed: two rare cases where a log line could show undefined or an object instead of the error now show the real text, and a malformed device error keeps a readable code.
- Fixed: an external gas or water meter whose reported type contains unusual characters now gets a clean name in the object tree instead of a broken one.
- Changed: ioBroker Admin 8.0.11 or newer is now required — the same minimum version that the current ioBroker stable repository ships with.

### 0.16.0 (2026-08-27) — stable

- Fixed: stopping the adapter no longer leaves every device showing as connected — the device markers and the connection status are now reset before the adapter goes down.
- Fixed: after a crash, a power cut or a restart, a device that was reachable before no longer stays green until it reconnects — every device starts out as not connected.
- New: three data points show at a glance how many devices are set up, how many are answering right now, and whether all of them are.

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