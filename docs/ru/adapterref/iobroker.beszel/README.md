---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.beszel
BADGE-stable: https://iobroker.live/badges/beszel-stable.svg
BADGE-Installations: https://iobroker.live/badges/beszel-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.beszel
BADGE-Test and Release: https://github.com/krobipd/ioBroker.beszel/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.beszel/README.md
title: ioBroker.beszel - Пользовательская документация
hash: JvnX5b/pc5wz/fSLabJHtGruK4AkVG3i24IAre2NHEE=
---
# IoBroker.beszel - Пользовательская документация
Этот адаптер зеркалирует [Безель](https://beszel.dev) Hub в ioBroker. Beszel - это легковесный монитор серверов: небольшие агенты запускаются на машинах, за которыми вы хотите следить, и отправляют отчеты в центральный хаб; адаптер считывает данные из этого хаба через свой REST API и записывает данные об одном устройстве для каждой отслеживаемой системы.

Все данные доступны только для чтения. Адаптер никогда не записывает данные в концентратор и не создает точек данных, доступных для записи.

- [Переключение точек данных и метрик](/#/docs/adapterref/iobroker.beszel/datapoints.md)
- [Вопросы и устранение неполадок](/#/docs/adapterref/iobroker.beszel/faq.md)

## Перед началом
Для работы вам потребуется запущенный Beszel Hub с подключенным как минимум одним агентом и учетной записью для этого Hub.
Адаптер аутентифицируется как обычный пользователь Beszel - с использованием того же адреса электронной почты и пароля, что и для веб-интерфейса Beszel; Beszel не принимает там имя пользователя. Административная учетная запись не требуется, но многофакторная аутентификация для этого пользователя должна быть отключена: адаптер не сможет ответить на одноразовый код.

Пользователь видит только те системы, к которым он привязан: те, которые он добавил сам, те, к которым его добавил администратор Hub (панель администратора PocketBase в `/_/`, коллекция `systems`, поле `users`), или все системы, если Hub работает с `SHARE_ALL_SYSTEMS=true`. Пользователь, которому ничего не привязано, входит в систему без проблем и видит пустой список - это подтверждает проверка соединения.

## Настройка
1. **Установите и создайте экземпляр.** В ioBroker установите `beszel` и откройте настройки экземпляра.
2. **Введите URL-адрес хаба** в поле _URL-адрес хаба Beszel_ - тот же адрес, по которому вы открываете веб-сайт Beszel.

Интерфейс, например, с `http://192.168.1.100:8090`. IPv6-адрес указывается в скобках: `http://[fd00::1]:8090`. Работают как `http`, так и `https`; HTTPS-хаб требует сертификата, которому доверяет хост ioBroker. Хаб за обратным прокси сохраняет свой путь (`https://example.org/beszel`). Пробелы и косая черта в конце удаляются; URL-адрес, содержащий `?`, `#` или имя пользователя и пароль, отклоняется.

3. **Введите адрес электронной почты и пароль** вашей учетной записи Beszel.
4. **Нажмите _Проверить соединение_.** Программа выполнит реальный вход в систему Hub и сообщит количество подключений.

системы, которые может видеть ваш пользователь, - или фактическую ошибку, если что-то не так: отказ в авторизации, недоступный хост, опечатка в URL-адресе.

5. **Выберите метрики** на вкладке _Метрики_ (см. [Точки данных и переключатели метрик](/#/docs/adapterref/iobroker.beszel/datapoints.md)).

Настройки по умолчанию включают время безотказной работы, процессор, среднюю загрузку, память, дисковое пространство, пропускную способность диска, сеть и температуру. Все остальные параметры отключены, пока вы их не включите.

6. **Сохранить.** Экземпляр запускается, один раз считывает данные из Hub и создает дерево объектов.

## Интервал опроса и время ожидания
Параметр _Poll Interval_ принимает значения от 10 до 300 секунд и по умолчанию равен 60. Агенты Beszel записывают одно измерение в минуту, поэтому значение меньше 60 секунд приводит к дополнительным запросам без более свежих данных.
Значение, введенное вне этого диапазона - например, скриптом, напрямую записывающим конфигурацию, - будет ограничено, а не принято.

Параметр _Request timeout_ (от 5 до 120 секунд, по умолчанию 15) определяет, сколько времени может занять один запрос. Увеличьте его при медленном соединении или в хабе с большим количеством контейнеров.

## Что создает адаптер
```
beszel.0.
├── info.connection      is the Hub reachable
├── info.systemsTotal    systems registered on the Hub
├── info.systemsOnline   of those, how many report "up"
├── info.systemsAllUp    true while all of them do
└── systems.<name>.      one device per monitored system
```

Имя устройства - это системное имя от концентратора, записанное строчными буквами, при этом все, что не является буквой или цифрой, заменяется на `_`. Две системы, имена которых сводятся к одному и тому же идентификатору, получают короткий хеш-суффикс, чтобы предотвратить перезапись друг друга, и адаптер выдает предупреждение в этом случае. Имя без латинских букв или цифр (кириллица, китайская и т. д.) становится `sys_` плюс короткий хеш системного идентификатора концентратора, поэтому оно остается неизменным после перезагрузки.

Переименование системы на хабе перемещает её к новому идентификатору устройства: адаптер записывает в журнал `System renamed on the Hub: systems.a → systems.b`, и старая структура данных удаляется - включая историю и другие настройки, которые вы внесли в её параметры. Удаление системы регистрируется аналогичным образом.

## Как ведет себя адаптер при отсутствии чего-либо
- **Система выходит из строя или приостанавливается.** Значение `info.online` становится false, а `info.status` показывает следующее.

«Это говорит Hub. Измеренные значения остаются на последнем показании, а не обнуляются - адаптер сообщает то, что ему известно, и ничего нового ему не известно».

- **Центр становится недоступным.** `info.connection` становится false, все системы переходят в состояние "Недоступно".

`info.online: false` и `info.status: unknown`, и счетчики флота падают до нуля. То же самое происходит, когда вы останавливаете экземпляр, поэтому ничто не продолжает показывать, что находится в сети, пока никто не читает.

- **Хаб отвечает пустым списком.** Ничего не удалено. PocketBase отвечает на запрос входа в систему, но не отвечает.

Если список запросов (измененный пароль, удаленный пользователь, восстановленная база данных Hub) больше не принимается, а выдается ошибка, адаптер сначала выполняет повторный вход в систему и запрашивает подтверждение еще раз. Если список остается пустым, дерево остается в исходном виде, и в журнале один раз указывается, что пользователь не видит систем.

- **Вход в систему отклонен.** В журнале указано, почему - неверный адрес электронной почты или пароль, многофакторная аутентификация.

Аутентификация или ввод пароля отключены на хабе. После трех неудачных попыток адаптер повторяет попытку с увеличивающимися интервалами, максимум каждые 15 минут, вместо того, чтобы отправлять пароль при каждом запросе.

- **Исчезает датчик, вентилятор, графический процессор, файловая система, контейнер или любой другой член группы.**

Данные удаляются, если они отсутствуют в двух последовательных опросах - одна небольшая ошибка ничего не исправляет.

- **Длина списка превышает возможности адаптера.** Адаптер считывает максимум 50 страниц на один список (1000).

(записей для каждого из списков систем, контейнеров, блоков и устройств). На хабе, достаточно большом, чтобы превысить этот размер, список отсечения сообщается один раз и оставляет дерево как есть, вместо того чтобы удалять системы в его конце.

## Обновление
Обновление повторно применяет имена и описания к уже имеющимся у вас точкам данных, поэтому исправленные формулировки и новые переводы будут применяться к существующим установкам, а не только к новым. В результате точка данных, которую вы переименовали самостоятельно в административной панели, получит обратно имя адаптера при следующем запуске.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.19.0 (2026-09-25)

- New: network monitors (Beszel 0.20.0) as an opt-in metric — response time, hourly average/fastest/slowest and loss for every ping, TCP, HTTP and DNS monitor set up on the Hub
- New: containers show whether an image update is available (Beszel 0.20.0)
- New: btrfs filesystems appear next to the ZFS pools (Beszel 0.20.0), with their own name, the pool type and a flag for raw physical sizes
- New: the connection test tells how many systems your user can see, and says so when it is none
- Fixed: after a password change, a deleted user or a restored Hub database the adapter kept every system green without new values for up to a day — it now logs in again right away
- Fixed: a refused login says why — wrong e-mail or password, multi-factor authentication, or password login switched off on the Hub — and the adapter stops retrying every poll
- Fixed: a paused or never-connected system no longer shows uptime 0 or empty system details; its last values stay
- Fixed: on current Hubs, swap, ZFS cache, GPU memory and GPU package power appeared on hosts that do not have them — they are removed
- Fixed: drives without a temperature or capacity reading showed 0; they now get no such datapoint
- Fixed: a storage pool that was removed came back with the next detail refresh and stayed until the next restart
- Fixed: a system whose name has no Latin letters or digits (e.g. Cyrillic or Chinese) got no object tree; it now gets a stable fallback id
- Fixed: two containers or group members whose names turn into the same id could swap their datapoints after a restart, and a container's id suffix changed with every re-create
- Fixed: a member of a group (sensor, container, unit, …) that was missing from a single poll was deleted at once; it now has to be missing twice
- Fixed: spaces and a trailing slash around the Hub URL are removed; a URL with `?`, `#` or a user name and password in it is rejected with a clear message, also in the connection test
- Fixed: on a very large Hub, the systems at the end of a long list lost their datapoints — a cut-off list now leaves the tree as it is and is reported once
- Fixed: a request that trickled in slowly could run far past the configured timeout
- Changed: a Hub URL that does not lead to the Beszel API (e.g. a missing reverse-proxy path) is named as such in the log and in the connection test
- Changed: a renamed or removed system on the Hub is reported in the log
- Changed: the login field is called E-mail — Beszel does not accept a username
- Changed: the SMART verdict also knows WARNING and UNKNOWN, the pool health UNKNOWN and the vdev state MISSING
- Changed: help texts, descriptions and translations corrected; drive model, serial number, firmware and host name carry more specific roles

### 0.18.0 (2026-09-15) — stable

- New: every system carries a pictogram of its operating system in the object tree — the same icons the Beszel web UI uses, readable in the light and the dark theme
- Fixed: network upload/download were always empty against a Beszel Hub 0.19.0 or newer; they carry values again, and older Hubs keep working
- Fixed: disk read/write, network upload/download and swap used show 0 while idle instead of an empty value
- Fixed: containers and systemd units of a system that is down or paused were deleted after a few minutes — they now keep their last values like every other datapoint
- Fixed: the last SMART device, ZFS pool detail or systemd unit of a system was never removed once it disappeared on the Hub
- Fixed: hardware and OS details are refreshed when a system reconnects — a new kernel shows after the reboot, not after the next adapter restart
- Fixed: a system that was still pending gets its hardware and OS details on its first contact
- Fixed: a Hub that is slow at adapter start no longer blanks the hardware/OS datapoints of all systems for one poll
- Fixed: renaming a system on the Hub in a way that keeps its object id (e.g. only the case) now reaches the object tree
- Fixed: a system added later with the same name as an existing one no longer takes over the existing system's object tree; the newcomer gets the suffix
- Fixed: a container, dataset or unit whose name equals a group name (e.g. `gpu`, `network`, `containers`) kept being renamed while its system was down
- Fixed: stopping the adapter in the middle of a poll no longer leaves late value changes behind
- Fixed: after the Hub briefly reported an empty system list, the offline markers written on errors and on shutdown reached no system
- Changed: temperature, battery, swap and ZFS ARC datapoints exist only on hosts that report that hardware; existing empty ones are removed
- Changed: uptime, load average and agent version appear only once a system has connected; existing empty ones are removed
- Changed: the ZFS error counters and the SMART power-cycle counter no longer show an empty unit in the object tree
- Changed: the four "Peak values" options are gone — a Hub never delivers peak values in the minute records the adapter reads, so they never produced a datapoint
- Changed: the messages of the connection test follow the system language, and the test runs with the configured request timeout
- Changed: SMART and dataset text columns the Hub does not carry read as empty (null) instead of an empty string
- Changed: the warning about a plain-http Hub URL is gone — http on the local network is how Beszel is normally deployed
- Changed: `info.uptime_text` is gone — it was `info.uptime` a second time as text; existing installations lose it on the first start

### 0.17.1 (2026-09-07)

- Improved: sixteen datapoints now carry an explanation in the object tree — online state, OS name, load average, container and service CPU, ZFS scrub errors and drive power cycles
- Fixed: the datapoint carrying the distribution name was labelled "OS Version" — it now reads "OS Name" in all eleven languages, matching what it actually shows

### 0.17.0 (2026-09-06)

- New: SMART data per drive as an opt-in metric — the drive's own overall verdict plus temperature, capacity, power-on hours and power cycles
- New: ZFS pool details as an opt-in metric — scrub status, per-vdev error counters and the datasets of each pool
- New: systemd service details as an opt-in metric — state, sub-state, CPU and memory for every unit the agent reports
- Improved: the two slow detail sources are read every 15 minutes instead of every poll, so switching them on costs your Hub almost nothing

### 0.16.0 (2026-09-06)

- Fixed: switching a metric group off now really empties it — a system that was offline at the time kept the empty channel and got it back after every restart
- Fixed: a stumble while starting no longer leaves the adapter alive but silent — it keeps going and updates your values as usual
- Changed: the status words of a system, of a ZFS pool and of a container are shown in your ioBroker language instead of English
- Changed: a container's health is now a proper status datapoint with its list of possible values, like the system status next to it
- Improved: starting up puts far less load on the ioBroker database, which shows most with many systems or many metrics switched off
- Changed: user documentation now covers the ZFS pools, the root disk name and the read/write totals

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