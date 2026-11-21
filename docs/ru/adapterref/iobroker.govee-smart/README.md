---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.govee-smart
BADGE-stable: https://iobroker.live/badges/govee-smart-stable.svg
BADGE-Installations: https://iobroker.live/badges/govee-smart-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.govee-smart
BADGE-Test and Release: https://github.com/krobipd/ioBroker.govee-smart/actions/workflows/test-and-release.yml/badge.svg
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
hash: eZm9TFGTywvo/0Qv3McCWXb4JbyEIMZB233XaiSGrtM=
---
# Гови Смарт

Управляет устройствами Govee Wi-Fi от ioBroker: светодиодными лентами, лампочками и панелями, термометрами, гигрометрами и мониторами качества воздуха, умными розетками, кнопками управления батареями и пультами дистанционного управления, а также бытовой техникой, такой как обогреватели, увлажнители, аромадиффузоры, чайники, льдогенераторы, вентиляторы и очистители воздуха.

Адаптер взаимодействует с вашими устройствами **локально, когда это возможно** . Светильник с включенным локальным API отвечает в вашей собственной сети за миллисекунды, и облако никогда не сможет перезаписать то, что устройство только что сообщило локально. Облако заполняет информацию, известную только ему — имена устройств, их возможности, сценарии и снимки — и берет на себя управление устройствами, у которых вообще нет локального API.

## Что вы получаете за то, что вкладываете

Все параметры являются необязательными: если ничего не вводить, индикаторы в вашей сети будут найдены и включены локально; бесплатный ключ API Govee добавляет имена, возможности, сцены, снимки и сегменты; ваша учетная запись Govee добавляет статус в реальном времени — подробное описание каждого шага приведено на странице вики « [Настройка»](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup) .

**Для каждого устройства необходимо включить локальный API в приложении Govee Home** (настройки устройства → Управление по локальной сети). Без него управление устройством будет осуществляться через облако — это работает, но занимает несколько секунд на команду и ограничено скоростью запросов со стороны Govee.

## Настройка

1. Установите адаптер и создайте экземпляр.
2. Откройте настройки экземпляра. Карточка **«Подключение»** проведет вас по трем указанным выше уровням и покажет, что работает, а что нет, включая проверку входа в систему, которая действительно выполняет авторизацию, а не просто заполняет форму.
3. Если Govee запрашивает код подтверждения (это происходит при подключении нового клиента), карта запрашивает его у вас. Больше ничего не требуется; адаптер запоминает данные для входа после перезагрузки, поэтому дополнительные коды не отправляются.
4. Устройства отображаются в разделе `devices.<model>-<id>` — модель и последние четыре символа собственного идентификатора устройства, например. `devices.h61be-525f` Если два устройства одной модели заканчиваются на одинаковые четыре символа, то второму присваивается его полный идентификатор. Созданные вами группы в приложении Govee отображаются в разделе `groups.`.

## Обновление с версии 2.x

В версии 3.0.0 каждому устройству присваивается новый идентификатор объекта один раз: `devices.h61be_525f` становится `devices.h61be-525f`, с дефисом, как и в других адаптерах устройств этого разработчика. Перенос происходит автоматически при первом запуске: значения, настройки записи, комнаты, функции и псевдонимы переносятся, а история записей продолжается в старой последовательности. Скрипты и визуализации, использующие старые идентификаторы, необходимо обновить.

## Сообщение о проблеме

Откройте вкладку **«Эксперт»** адаптера, нажмите **«Диагностика»** , выберите устройство и нажмите кнопку: адаптер создаст отчет, и ваш браузер сохранит его в файл. Прикрепите этот файл к задаче на GitHub — в форме поддержки устройства запрашивается именно этот файл.

Список устройств отображает все устройства, доступные или нет — отчет нужен именно тогда, когда что-то работает некорректно. Отчет не содержит никаких данных.

Отчет **псевдонимизирован** : IP-адреса, адреса электронной почты, имена устройств, ваши собственные имена снимков и идентификаторы оборудования, а также данные, полученные с помощью DIY-проектов, заменены стабильными маркерами, а учетные данные вообще не отображаются. Одно и то же реальное значение всегда соответствует одному и тому же маркеру внутри одного файла, поэтому отчет остается понятным, даже не содержа никакой информации о вашем доме.

Отчет позволяет добавить устройство или обнаружить ошибку без необходимости доступа к вашему оборудованию. Если в нем недостаточно информации для этого, вина лежит на отчете, а не на вас — пожалуйста, укажите это в сообщении об ошибке.

## Где прочитать больше

Подробная информация доступна в вики на английском и немецком языках:

- **Настройка** — три уровня, локальный API, коды подтверждения, что делать, если канал остается недоступным.
- **Поведение** — какой канал что обрабатывает, как определяется доступность, что происходит при отключении облачных сервисов.
- **Дерево состояний** — каждая точка данных, что её записывает и что вы можете записать сами.
- **Сцены и снимки** — сцены, самостоятельно созданные сцены, снимки из облака и локально сохраненные снимки.
- **Сегменты** — управление сегментами, мастер обнаружения, полосы для вырезания и списки сегментов, заполняемые вручную.
- **Группы** — как работают группы в приложении Govee (см. здесь).
- **Датчики и приборы** — показания, события и что означают ограничения облачных сервисов.
- **Устройства** — все поддерживаемые модели, сгенерированные из собственного каталога адаптера.

→ <https://github.com/krobipd/ioBroker.govee-smart/wiki>

## Устройство отсутствует в списке?

Отправьте диагностический отчет, и модель будет добавлена. Для этого и существует отчет — каталог пополняется на основе отчетов пользователей, и нет необходимости менять владельцев оборудования.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Fixed: the diagnostics report contains the object tree again
- Fixed: older lights such as the H6110 switch again when controlled over the Govee account
- Fixed: the colour temperature no longer keeps its old value while the light shows a colour, and the colour no longer shows Govee's placeholder in colour-temperature mode
- New: a colour temperature set in the Govee app as a white colour also shows as colour temperature
- Fixed: local snapshots and the segment wizard restore a colour as a colour and a colour temperature as a colour temperature
- Fixed: a device renamed in the Govee app also shows its new name after a restart
- Fixed: a device's IP address is no longer emptied when the adapter starts before it finds the device on the network again
- Fixed: after a rate-limit answer from Govee, no further call goes to that server until the wait Govee asks for has passed
- Improved: the adapter settings page loads about 8 MB less and opens faster
- Fixed: a light whose scene list Govee refused with too many requests at the start gets its scenes in the same run
- Fixed: the refresh button of a light is confirmed only when Govee sent its scene list
- Changed: catalog corrections now apply without the experimental switch
- New: an untested device says so in the log and asks for a diagnostics report
- Changed: the colour and brightness of each segment carry the segment's number in their name
- New: each Govee app group shows in info.online whether all its members are reachable
- Fixed: the brightness of a light and of its segments uses the range Govee reports for that light, for example 1 to 100
- Changed: scene, snapshot, music and mode lists are now text datapoints
- Changed: each device shows its test status in info.tier; the separate diag folder is gone
- Changed: a verification code stays in the settings after use; the adapter no longer clears the field and restarts itself
- Changed: Govee's Cloud limits are kept as sliding windows per endpoint and device, and every limit counts on across a restart
- Changed: needs js-controller 7.2.5 and Admin 8.3.5

### 3.2.1 (2026-10-15)

- Fixed: the H1771 table lamp no longer offers a DreamView switch that Govee refuses for this model

### 3.2.0 (2026-10-15)

- New: lights without a local connection switch through your Govee account, faster than through the Cloud
- Changed: a command shows as confirmed only when it really reached the device
- Changed: a group command shows as confirmed only when every light of the group took it
- New: a diagnostics report for each device in the Expert tab, with your personal data replaced by placeholders
- Changed: the datapoint diag.lastExport is removed from every device
- Improved: a device that does not answer no longer holds up the others
- Fixed: a device reached only through the Cloud shows offline while the Cloud is not connected
- Fixed: a heater's target temperature is shown and set in °C, also on models that work in °F
- Fixed: the refresh button of a light is confirmed only when Govee answered
- Changed: an untested model asks for a diagnostics report and never claims that it works
- New: seven models added as untested: Smart Gateway 1s (H5044, R5044), Wi-Fi Gateway (H5151), Smart Light (H610E, H610F), Outdoor String Lights 2 (H7030), Smart Fan (H7108)
- Improved: an outage of a Govee service is shown as a status instead of a stream of warnings
- Fixed: the network address chosen in the settings now applies to every connection to Govee

### 3.1.1 (2026-10-01)

- Fixed: a cloud command that fails because the Govee server name cannot be resolved is sent again within 10 seconds instead of being lost after one try
- Fixed: after a failed command the light's real state is read back right away, so its datapoint no longer stays on the wrong value — also without a Govee account
- Fixed: calls that never reached Govee (DNS or connection errors) no longer use up the daily budget, so an appliance is not blocked for the rest of the day
- Fixed: a group command that only some of its lights took now names the lights that did not switch and why, so a dark light no longer goes unnoticed
- Improved: connection errors in the log are written in plain words, e.g. that the Govee server name could not be resolved and the DNS is the likely cause

### 3.1.0 (2026-10-01)

- Fixed: a rejected background token refresh of the Govee account now counts toward the login protection and asks to check email/password instead of retrying silently
- Fixed: "Test login" in the connection card counts toward the account's login limit (3 per hour) and says when the next test is possible
- Fixed: segment colours and brightness are confirmed only after the command went out — a refused Cloud command no longer leaves them acked
- Fixed: stopping the adapter while it is still starting really stops it — it no longer goes on to search the network or log in to your Govee account afterwards
- Fixed: a light found on the network before the saved data loads keeps its scene speed and remembered libraries after a restart
- Fixed: a group offers only the colour temperatures every member supports, so no member is sent a value outside its range
- Fixed: when Govee no longer accepts the account session, scene, music and DIY libraries, snapshots and groups ask for a fresh login instead of reading as empty
- Fixed: a Cloud rate limit or rejected API key is reported once, with the real waiting time — no longer three times or with a wrong retry hint
- Fixed: moving a 2.x device tree to its new id no longer loses recordings or room assignments when the move fails or is interrupted
- Fixed: a light whose scene library has not loaded yet keeps its `scenes.scene_speed` datapoint, value and recording — a start without saved data deleted and re-created it
- Improved: a restart leaves the object tree untouched when nothing changed, so scripts and history that watch object changes no longer see needless updates
- Fixed: a mode or level dropdown only takes a value the device declares — a fan speed no longer shows `50`, an air purifier's level no longer `0` in Auto mode
- Fixed: the manual device sync after a failed start shows the Cloud connected and stops the pending retry; a device it adds gets its first values without a log warning
- Fixed: a Govee e-mail or password of spaces only counts as not entered — at start, in the sensor hint and in the connection card's test
- Fixed: the refresh button of a light keeps its scene list across restarts and corrects a wrong segment count; devices that are not lights no longer use up Cloud calls
- Fixed: a temperature reading carries °C whichever way it arrives — a model that declares Fahrenheit no longer flips the unit to °F (the value is always °C)
- Fixed: a segment colour above 255 is sent as 255 — it wrapped to 0 before; a segment brightness is rounded like the light's brightness
- Improved: a lamp that is unplugged or unreachable on your network leaves one warning in the log instead of a new warning for every command you send to it
- Fixed: a group that is switched off or set to a colour clears its scene and music dropdowns the same way a single light already does
- Fixed: a heater that declares no temperature unit shows none instead of an invented °F; a command delivered after the device came back shows the value that was sent
- Fixed: an untested model without catalog corrections no longer warns to turn on the experimental switch — it works as it is; the log only asks for a diagnostics report
- Fixed: the settings describe the experimental switch for what it does — it turns on the catalog corrections of untested models; every device appears without it
- Improved: after you press the device sync or the refresh button, the log tells you what it found, for example which new devices were added to the object tree
- Fixed: the connection card words every answer in the admin's language — a full login window shows the time on your own clock, and a repeated login test no longer claims a code was just requested
- Fixed: the music mode read from Govee's state answer showed the mode at that position instead of the reported one; a mode the device never declared is no longer written
- Fixed: the segment detection wizard no longer counts a dark segment at the end when the measurement runs all the way to the longest strip Govee supports
- Improved: appliance modes and levels and the device type show readable names in your ioBroker language; scripts may still write the names Govee uses, such as Auto

### 3.0.1 (2026-09-27)

- Improved: the note the Admin shows before an update to 3.x is short now: the warning, one example old → new and a link to the details

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