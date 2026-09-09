---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.govee-smart
BADGE-stable: https://iobroker.live/badges/govee-smart-stable.svg
BADGE-Installations: https://iobroker.live/badges/govee-smart-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.govee-smart
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.govee-smart/README.md
title: Гови Смарт
hash: 5pTuCmwWxM/n4+vITGa9TBUCvNe8VdiXwZicz7/k2jE=
---
# Гови Смарт

Управляет устройствами Govee Wi-Fi от ioBroker: светодиодными лентами, лампочками и панелями, термометрами, гигрометрами и мониторами качества воздуха, умными розетками, кнопками управления батареями и пультами дистанционного управления, а также бытовой техникой, такой как обогреватели, увлажнители, аромадиффузоры, чайники, льдогенераторы, вентиляторы и очистители воздуха.

Адаптер взаимодействует с вашими устройствами. **локально, когда это возможно.**&#x421;ветильник с включенным локальным API отвечает в вашей собственной сети за миллисекунды, и облако никогда не сможет перезаписать то, что устройство только что сообщило локально. Облако заполняет то, что известно только ему — названия устройств, возможности, сценарии и снимки — и берет на себя управление устройствами, у которых вообще нет локального API.

## Что вы получаете за то, что вкладываете

Все, кроме первой строки, является необязательным. Введите больше, и станет доступно больше вариантов; если ничего не вводить, локальное управление все равно будет работать.

| Что вы вводите                                      | Что может делать адаптер                                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ничего                                              | Найдите индикаторы в вашей сети и включите/выключите их: питание, яркость, цвет, цветовая температура, состояние.                                       |
| + Ключ API Govee                                    | Названия устройств, возможности, сценарии, снимки и сегменты.                                                                                           |
| + Учетная запись Govee (электронная почта и пароль) | Обновления статуса в режиме реального времени передаются из Govee, поэтому изменения, внесенные в приложение или на устройстве, отображаются мгновенно. |

Ключ API предоставляется бесплатно и дается приложением Govee Home. Вход в учетную запись осуществляется самим приложением; адаптер только прослушивает эту учетную запись и никогда не отправляет через нее команды.

**Для каждого устройства необходимо включить локальный API в приложении Govee Home.** (Настройки устройства → Управление по локальной сети). Без этого устройство управляется через облако — это работает, но занимает несколько секунд на команду и ограничено скоростью передачи данных Govee.

## Настройка

1. Установите адаптер и создайте экземпляр.
2. Откройте настройки экземпляра. **Связь** В карточке подробно описаны три вышеуказанных уровня и указано, что работает, а что нет, включая тест входа в систему, который действительно выполняет авторизацию, а не просто проверяет форму.
3. Если Govee запрашивает код подтверждения (это происходит при подключении нового клиента), карта запрашивает его у вас. Больше ничего не требуется; адаптер запоминает данные для входа после перезагрузки, поэтому дополнительные коды не отправляются.
4. Устройства отображаются в разделе `devices.<model>_<id>`Группы, созданные вами в приложении Govee, отображаются в разделе
   `groups.`.

## Сообщение о проблеме

Откройте адаптер **Эксперт** вкладка, нажмите **Диагностика**Выберите устройство и нажмите кнопку: адаптер создаст отчет, и ваш браузер сохранит его в файл. Прикрепите этот файл к задаче на GitHub — в формах для создания задач запрашивается именно этот файл.

Список устройств содержит информацию обо всех устройствах, доступных или недоступных — отчет необходим именно тогда, когда что-то работает некорректно. Информация о каждом устройстве. `diag.lastExport` В записях точки данных указывается время последнего составления отчета.

Отчет **псевдонимизированный**IP-адреса, адреса электронной почты и имена устройств заменяются стабильными маркерами, идентификаторы устройств сокращаются, а учетные данные вообще не отображаются. Одно и то же реальное значение всегда соответствует одному и тому же маркеру внутри одного файла, поэтому отчет остается понятным, даже без информации о вашем доме. Все это объясняется в заголовке файла.

Отчет позволяет добавить устройство или обнаружить ошибку без необходимости доступа к вашему оборудованию. Если в нем недостаточно информации для этого, вина лежит на отчете, а не на вас — пожалуйста, укажите это в сообщении об ошибке.

## Где прочитать больше

Подробная информация доступна в вики на английском и немецком языках:

- **Настраивать** — три уровня, локальный API, коды подтверждения, что делать, если канал недоступен
- **Поведение** — Какой канал за что отвечает, как определяется доступность, что происходит, когда облачное хранилище не работает.
- **Дерево штата** — каждая точка данных, что её записывает и что вы можете записать сами.
- **Сцены и снимки** — сцены, сцены, созданные своими руками, снимки из облака и локально сохраненные снимки
- **Сегменты** — управление сегментами, мастер обнаружения, полосы для обрезки и списки сегментов, заполняемые вручную.
- **Группы** — как здесь ведут себя группы в приложении Govee
- **Датчики и приборы** — Чтения, мероприятия и что означают ограничения облачных сервисов
- **Устройства** — все поддерживаемые модели, сгенерированные из собственного каталога адаптера.

→ <https://github.com/krobipd/ioBroker.govee-smart/wiki>

## Устройство отсутствует в списке?

Отправьте диагностический отчет, и модель будет добавлена. Для этого и существует отчет — каталог пополняется на основе отчетов пользователей, и нет необходимости менять владельцев оборудования.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.32.1 (2026-09-07)

- Fixed: Your devices and their recorded history no longer disappear from the object tree when the Govee cloud cannot be reached at startup

### 2.32.0 (2026-09-07)

- Fixed: In an account without a single light, every device stopped being switchable after a restart — appliances, plugs and sensors had no state and no reachability until you pressed sync devices
- Fixed: A device could stay green for up to 30 minutes after Govee had reported it offline; an arriving reading no longer overrides an explicit offline report
- Fixed: With only an API key configured, devices fell offline 30 minutes after the start although they were still controllable — the proof now renews itself without account credentials
- Fixed: Scene and snapshot commands that fell back to the cloud and failed there were still confirmed as carried out; a command that did not arrive now stays unconfirmed
- Fixed: A manually chosen segment list could only ever lengthen the learned strip and never shorten it again — the wizard's own measurement was overwritten by it
- Fixed: Under load the adapter stopped counting appliance commands against their daily limit, so a heater or humidifier could burn through its Govee quota and stop responding
- Fixed: On a device model the adapter does not know yet, the tier datapoint told the user to press a button that 2.31.0 had already removed from the admin page
- Fixed: Without account credentials, a group from the Govee app grew an empty entry in the object tree on every restart; it now appears only once its members are actually known
- New: Datapoints carry an explanation in all 11 languages wherever the name alone does not say enough — 99 of them instead of 26
- Changed: The adapter can no longer be installed directly from GitHub — install it from the ioBroker repository or from npm, as with every other adapter

### 2.31.1 (2026-09-04)

- Fixed: When the adapter met a device model it does not know yet, its log asked the user to press a button that 2.31.0 had removed — it now points at the Expert tab, where the report is actually made

### 2.31.0 (2026-09-03)

- Fixed: On instances upgraded from 2.27.0 or newer, every admin card was dead — diagnostics, segment wizard and connection test alike; affected installations repair themselves on the next start
- Fixed: A card that could not reach the adapter reported "no devices yet" instead of the real error
- Changed: Segment detection and diagnostics now share one **Expert** tab with a button each
- Changed: The per-device `diag.export` button is gone; the Expert tab builds the report and hands you the file in one press
- Changed: `diag.lastExport` now records WHEN the last report was taken, instead of naming the file
- Improved: Both cards say "Loading devices …" while they search, and explain the wait if it takes long
- Fixed: The diagnostics report still described the reachability rule as it was before 2.30.0

### 2.30.0 (2026-09-03)

- Fixed: Devices without a local API were shown as unreachable although they switched and reported normally; they now show as reachable for as long as they are
- Fixed: Sensors and buttons behind a Govee gateway were shown as unreachable although their readings kept arriving; their gateway now decides whether they are reachable
- Fixed: Appliances stayed marked as reachable for up to two minutes after they had actually gone offline
- Improved: A device that is unplugged and put away is reported as unreachable within half an hour, instead of staying green until the adapter is restarted
- New: 37 additional device models are recognised, including smart plugs, a button remote, an air quality monitor and an aroma diffuser
- New: Battery buttons and remotes are supported as their own device kind, with battery level and reachability

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