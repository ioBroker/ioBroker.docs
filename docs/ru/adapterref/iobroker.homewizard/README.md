---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homewizard
BADGE-stable: https://iobroker.live/badges/homewizard-stable.svg
BADGE-Installations: https://iobroker.live/badges/homewizard-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homewizard
BADGE-Test and Release: https://github.com/krobipd/ioBroker.homewizard/actions/workflows/test-and-release.yml/badge.svg
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
hash: LG9akiTpNXtMBuIW/r6WDYON9S/ISW5Q8pDd8ijnGGI=
---
# ioBroker.homewizard — Руководство пользователя

Данные об энергопотреблении в режиме реального времени с устройств HomeWizard Energy передаются через локальный **API v2** .

## Требования

- Устройство HomeWizard, поддерживающее API v2: **счетчик P1** (HWE-P1), однофазный **счетчик кВт** ·ч (HWE-KWH1 / SDM230) или трехфазный (HWE-KWH3 / SDM630), **подключаемый аккумулятор** (HWE-BAT).
- Прошивка с локальным API версии 2 (см. [список совместимости](https://api-documentation.homewizard.com/docs/introduction) HomeWizard). Для этого ничего не нужно включать в приложении HomeWizard: переключатель "Локальный API" относится к старому API версии 1 и должен оставаться выключенным.
- Node.js >= 22, js-controller >= 7.2.2, Admin >= 8.0.11.

Розетка, водомер и дисплей энергопотребления используют только устаревший API версии 1. Они выходят за рамки проекта и не будут добавлены.

## Добавление устройства

В настройках адаптера отсутствует таблица устройств — устройства находятся в дереве объектов и добавляются нажатием кнопки на самом устройстве.

**При автоматическом обнаружении (обычный случай)**

1. Откройте вкладку « **Объекты»** и установите `homewizard.0.startPairing` к `true`.
2. В течение 60 секунд нажмите физическую кнопку на устройстве HomeWizard (счетчик кВт·ч: удерживайте ее 1–3 секунды).
3. Устройство отображается в составе экземпляра в собственной папке.

Окно остается открытым в течение всех 60 секунд, поэтому можно добавить несколько устройств одновременно.

**С фиксированным IP-адресом** — для сетей, куда не проходит mDNS (отдельная VLAN, Docker без сетевого подключения хоста):

1. Введите IP-адрес устройства в... `homewizard.0.pairingIp`.
2. Затем установите `homewizard.0.startPairing` к `true` и нажмите кнопку на устройстве.

## Что вы получите

Для каждого устройства создается папка с определенным названием. `<product type>_<serial>` В папке отображается название продукта, которое сообщает устройство (например, "P1 Meter") — API HomeWizard не предоставляет имя, которое вы присваиваете устройству в приложении. В строках логов устройство называется как `P1 Meter (hwe-p1_5c2fafaabbcc)` Таким образом, можно отличить два устройства одного типа друг от друга. Папка содержит:

| Папка                  | Содержание                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info`                 | Название и тип продукта, версия прошивки, сеть Wi-Fi и уровень сигнала, время работы, состояние подключения.                                                                                           |
| `measurement`          | Мощность, напряжение, ток, частота, суммарная потребляемая энергия по тарифам, временные метки.                                                                                                        |
| `measurement.quality`  | Провалы и скачки напряжения, счетчики отключений электроэнергии (только для P1)                                                                                                                        |
| `measurement.external` | Счетчики газа, воды и тепла, передающие данные через счетчик P1; счетчик, данные с которого не передавались в течение суток (например, после замены), удаляется.                                       |
| `system`               | Подключение к облаку, яркость светодиодного индикатора состояния (не на счетчике кВтч), устаревший API версии 1 и перезагрузка (не на подключаемом аккумуляторе), идентификация (не на счетчике кВтч). |
| `battery`              | Режим зарядки, права доступа, целевая мощность и счетчики — на измерительном приборе, с которым сопряжена батарея.                                                                                     |

`remove` Удаляет устройство, включая все его данные.

## Состояния соединения

- `<device>.info.connected` — Это верно, пока устройство отвечает адаптеру. Это включает в себя резервный опрос, а не только подключение в реальном времени.
- `info.connection` — верно, если хотя бы одно устройство ответит.
- `info.devicesTotal` /`info.devicesOnline` /`info.devicesAllOnline` — сколько устройств настроено и сколько из них отвечают. `devicesTotal` Сохраняет своё значение, когда адаптер остановлен.

Измерения обычно поступают в виде push-уведомлений примерно раз в секунду. Если соединение обрывается, адаптер вместо этого опрашивает данные по протоколу HTTPS (каждые 10 секунд, каждые 30 секунд для устройства со слабым сигналом), одновременно восстанавливая соединение в фоновом режиме, чтобы передача данных продолжалась.

## Управление подключаемым аккумулятором

Аккумулятор подключается как отдельное устройство, но элементы управления находятся на **счетчике P1 или кВт⋅ч,** с которым он работает — именно там HomeWizard предоставляет к ним доступ:

- `battery.mode` —`zero` (поддерживает нулевой уровень выбросов в доме, осуществляя зарядку или разрядку для достижения этой цели) или `predictive` HomeWizard отмечает `to_full` и `standby` в качестве наследия: использовать `charge_to_full` и `permissions` вместо.
- `battery.power_w` /`battery.target_power_w` — Положительный полюс означает зарядку, отрицательный — разрядку.
- `battery.charge_to_full` — Зарядить до 100% один раз.
- `battery.permissions` — JSON-массив, записанный в текстовом формате.

`predictive` и `charge_to_full` Требуется последняя версия прошивки батареи (API 2.3.0). Более старые версии прошивки отклоняют их, и значение не применяется.

## Когда что-то не работает

**При сопряжении устройство не обнаруживается.** mDNS часто не работает через VLAN или мосты Docker. Используйте указанный выше путь с фиксированным IP-адресом.

**Сопряжение не удается сразу после нажатия кнопки.** Адаптер аннулирует выданный ему токен и предлагает повторить попытку. На счетчике электроэнергии удерживайте кнопку в течение 1–3 секунд; короткого нажатия недостаточно.

**Устройство отображается как неподключенное.** Адаптер никогда не сдаётся: он пытается установить соединение в режиме реального времени с увеличивающимися интервалами (до 5 минут), примерно раз в час ищет изменившийся IP-адрес через mDNS и переключается на более быстрый ритм для устройств, которые он распознает как имеющие слабый сигнал. Измерительный прибор в подвальном коридоре может отсутствовать несколько часов; ничего не нужно делать, чтобы он снова заработал.

**«Недействительный токен — повторно подключите устройство для исправления».** Устройство больше не принимает токен адаптера, обычно после сброса до заводских настроек. Выполните повторное сопряжение. `startPairing` и кнопка, с `pairingIp` (если mDNS не достигает устройства) — адаптер принимает устройство, токен которого больше не работает, и существующие точки данных сохраняются.

**В логах появляются сообщения об истечении срока действия прилагаемого сертификата.** Адаптер содержит сертификат центра сертификации HomeWizard для проверки сертификатов устройств. Задолго до истечения срока его действия обновление адаптера предоставит новый сертификат.

## Конфиденциальность и безопасность

- Токены устройств хранятся в зашифрованном виде в объекте устройства, а не в конфигурации адаптера.
- Адаптер проверяет сертификат каждого устройства на соответствие его известным идентификационным данным, поэтому он не будет взаимодействовать с другим устройством, которое случайно имеет сертификат HomeWizard.
- Удаление устройства также аннулирует токен адаптера на самом устройстве.
- Каждая система и экземпляр ioBroker подключаются к устройству под своим собственным именем, поэтому тестовая и производственная системы могут использовать один и тот же измерительный прибор.
- Включение `system.api_v1_enabled` Это повторно включает старый API версии 1 на устройстве. Этот API не использует шифрование и токены — любой пользователь в сети может читать и управлять устройством. Адаптер выдает предупреждение при выполнении этой операции.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.20.0 (2026-09-24)

- Fixed: on Node.js 26 a device no longer stops updating for good after an oversized or interrupted reply from it — the adapter now gives up on that reply and carries on.
- Changed: the device folder keeps the product name the device reports; the HomeWizard API does not provide the name you give the device in the app, so renaming it there does not reach ioBroker.
- Fixed: writing the text "false" into cloud_enabled, api_v1_enabled or charge_to_full switched it on, and writing false to reboot restarted the device — values are now read strictly.
- Fixed: the battery descriptions now say that positive power means charging and that the zero mode charges or discharges to keep your home at net zero.
- Fixed: the setup notes no longer ask for the Local API switch in the app, which belongs to the old v1 API, and tell you to hold the button of a kWh Meter for 1–3 seconds.
- Fixed: another program using the network search port no longer stops the adapter; it says so and points you to pairing the device by its IP address instead.
- Fixed: a device that answers while the adapter restores its live connection no longer flips between online and offline with every attempt.
- Fixed: a device showing "token invalid" can be paired again by pressing its button, and a second device that needs a new address during a running search is found as well.
- Changed: a kWh Meter no longer shows an identify button or an LED brightness setting — the device has neither, and pressing them only ever failed.
- Fixed: one device whose stored entry is damaged no longer stops the other devices from starting — they come up and update as usual.
- New: every ioBroker system and instance pairs under its own name on the device, so a test and a production system can use the same meter side by side.
- New: a gas, water or heat meter the P1 Meter has not reported for a day is removed together with its data points, instead of keeping its last reading forever.
- Improved: when the pairing window closes, the adapter tells you how many devices were paired, or that none was found and what to try next.
- Fixed: when a different device answers at a paired device's address, the adapter now tells you that the address has probably changed.
- Fixed: the battery folder is removed completely when no battery is connected any more, including entries that had lost their folder.
- Improved: the WiFi signal strength is marked as a signal strength value, so visualisations and other adapters recognise it correctly.

### 0.19.0 (2026-09-15) — stable

- Fixed: a device that changed its IP address is found again — the reply to the adapter's own network search was discarded, leaving the device unreachable until it was paired anew.
- Fixed: removing a device now really withdraws its access on the device itself — the request was cut off before it left, so the adapter's user stayed behind on every device removed so far.
- Fixed: a device that is re-paired while the adapter is still working with the old connection keeps its new access token — that work could overwrite it and leave the device unusable.
- Improved: pairing now says once per device why it is not getting anywhere — a wrong address or a device without the local API used to fail silently until the window closed.
- Fixed: a device that does not manage batteries no longer keeps a battery folder — leftover entries from an earlier version are cleared the first time the device says it has none.
- Fixed: data points the adapter removes during a start no longer reappear empty a moment later, which left nameless leftovers in the tree that nothing ever cleaned up again.
- Improved: a setting the device refuses is corrected in the tree at once — it used to keep showing the requested value for up to a minute before the next check put it right.
- Fixed: the name of a gas, water or heat meter folder now also reaches installations whose meter has been quiet since the update, instead of only the entries below it.
- New: every device now shows a pictogram of its type in the object tree — a meter, a three-phase meter or a battery — drawn to read on the light and the dark theme alike.
- Changed: a device now carries the name it has in the HomeWizard app; renaming it there reaches the object tree, and a rename made in the tree is put back at the next check.

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