---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.nut2
BADGE-stable: https://iobroker.live/badges/nut2-stable.svg
BADGE-Installations: https://iobroker.live/badges/nut2-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.nut2
BADGE-Test and Release: https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.nut2/README.md":{"title":{"en":"ioBroker.nut2 — Setting it up"},"content":"en/adapterref/iobroker.nut2/README.md"},"en/adapterref/iobroker.nut2/datapoints.md":{"title":{"en":"Data points"},"content":"en/adapterref/iobroker.nut2/datapoints.md"},"en/adapterref/iobroker.nut2/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.nut2/faq.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nut2/README.md
title: ioBroker.nut2 - Настройка
hash: QIrC7SxUyMi+bYle+YpJ2cGb7K1anMTKsMvNnWOG2k4=
---
# ioBroker.nut2 — Настройка

Этот адаптер считывает данные с источников бесперебойного питания через **сервер NUT** (Network UPS Tools). Он никогда не взаимодействует с ИБП напрямую: сервер NUT управляет USB- или сетевым подключением к оборудованию, а адаптер является одним из его клиентов. Именно поэтому каждая настройка начинается на том компьютере, к которому подключен ИБП.

В файле README приведена краткая версия. На этой странице описан полный процесс установки.

## 1. Убедитесь, что сервер NUT запущен.

Вам нужна машина со `upsd` Работает и как минимум один ИБП настроен — хост под управлением Linux, сетевое хранилище (NAS) (Synology, QNAP и UGREEN поставляются с NUT) или Raspberry Pi с ИБП, подключенным через USB.

Проверьте это на этом аппарате:

```bash
upsc -l                 # lists the UPS names, e.g. "ups0"
upsc ups0               # shows all values of that UPS
```

Если `upsc -l` Ничего не печатается, проблема на стороне гайки, и адаптер не поможет — сначала исправьте драйвер. `/etc/nut/ups.conf`, затем `upsdrvctl start`).

## 2. Дайте адаптеру достичь сервера.

`upsd` Он прослушивает только локальный хост, пока вы не укажете иное. `/etc/nut/upsd.conf`:

```
LISTEN 0.0.0.0 3493
```

Перезапуск `upsd` впоследствии. Порт `3493/TCP` Между вашим хостом ioBroker и сервером NUT должно быть открыто соединение.

Многие NAS-системы работают в режиме "UPS-сервера", который имеет собственный список разрешенных адресов в веб-интерфейсе — IP-адрес хоста ioBroker должен быть в этом списке.

## 3. Создайте пользователя (необязательно, но рекомендуется).

Для чтения значений не требуется регистрация пользователя. Пользователь нужен только для двух вещей: переключения ИБП (мгновенные команды) и записи переменных. Добавьте это в `/etc/nut/upsd.users`:

```
[iobroker]
    password = choose-something-long
    upsmon secondary
    actions = SET
    instcmds = ALL
```

Две линии с разными задачами:

- `upsmon secondary` Именно эта строка делает возможным **вход в систему** . Адаптер использует вход в систему при каждом (повторном) подключении, при коротком дополнительном соединении, исключительно для того, чтобы сообщить вам, работают ли учетные данные. Без этой строки вход в систему будет отклонен — см. FAQ, это не ошибка.
- `actions` и `instcmds` определить, что пользователь может фактически **сделать** . `upsd` Проверяет их по команде, независимо от авторизации.

Перезапуск `upsd` после редактирования файла.

## 4. Добавьте экземпляр в ioBroker.

Установите адаптер, создайте экземпляр и заполните вкладку **«Подключение»** :

| Параметр                  | Что вставить                                                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| хост сервера NUT          | Имя хоста или IP-адрес машины, на которой запущен компьютер. `upsd`                                                                 |
| Порт                      | `3493` если только вы это не изменили                                                                                              |
| Сетевой интерфейс         | Оставьте значение «все», если только ваш хост ioBroker не имеет нескольких сетей, и только одна из них подключается к серверу NUT. |
| Интервал опроса           | `15` секунды — это хороший вариант по умолчанию (см. ниже).                                                                        |
| Имя пользователя / Пароль | Пользователь из шага 3, или оставьте поле пустым для мониторинга только для чтения.                                                |

Нажмите **«Проверить соединение»** . В ответе будет указано, что именно было проверено: зашифровано ли соединение, сколько ИБП предоставляет сервер и — если вы вводили учетные данные — был ли принят вход в систему.

Затем сохраните. Адаптер подключается, обнаруживает все ИБП на сервере и создает состояния.

### С какой скоростью должен осуществляться опрос?

Скорость обновления данных драйвером NUT ничего не даст. `/etc/nut/ups.conf` У драйвера есть две настройки: `pollinterval` (Как часто обновляется статус, по умолчанию 2 секунды) и `pollfreq` (полный набор значений, по умолчанию 30 секунд для драйверов USB). Опрос каждые 15 секунд — разумный компромиссный вариант; именно поэтому настройка начинается с 2 секунд — более быстрый вариант будет только повторно считывать значения, которые не изменились.

Если вы хотите получать уведомления о сбое электропитания _мгновенно,_ а не при следующем опросе, не уменьшайте интервал — используйте триггер событий, описанный в разделе часто задаваемых вопросов.

## 5. Шифрование соединения (необязательно)

Без TLS имя пользователя и пароль передаются по сети в открытом виде. Если это имеет значение для вашей конфигурации, `upsd` может быть собран с поддержкой TLS и предлагает **STARTTLS** :

1. Настройка `CERTFILE` (или `CERTPATH`) в `upsd.conf` на сервере.
2. Установите флажок **«Использовать TLS (STARTTLS)»** в настройках адаптера.

По умолчанию адаптер не проверяет сертификат — он шифрует трафик, защищая его от пассивного прослушивания, но не может обнаружить атаку типа «человек посередине», поскольку почти каждый сервер NUT использует самоподписанный сертификат.

Для реальной защиты установите флажок **«Требовать действительный сертификат»** и укажите в **файле сертификата центра сертификации путь** к PEM-файлу на хосте ioBroker, по которому можно проверить сертификат — либо к вашему собственному центру сертификации, либо к самоподписанному сертификату сервера. Файл будет прочитан только при включенной строгой проверке; путь, оставшийся от предыдущей попытки, не причинит вреда.

Если сервер NUT был собран без TLS, проверка соединения сообщит об этом, вместо того чтобы незаметно переключаться на обычный текст.

## 6. Переключение ИБП через ioBroker (необязательно)

Два переключателя на вкладке **«Дополнительно»** открывают направление записи, и оба намеренно выключены:

- Функция **«Включить мгновенные команды»** создает состояние кнопки для каждой мгновенной команды, предлагаемой ИБП (звуковой сигнал, самодиагностика, отключение нагрузки и т. д.). `commands` Канал отображается только после включения этой функции **и** настройки учетных данных. `upsd` Проверяет права доступа к командам у указанного пользователя. Текстовые данные указывают на это. `commands.execute` выполняет команду, которая принимает значение, например: `load.off.delay 120`.
- **Включение возможности записи переменных** делает переменные ИБП, которые сервер сообщает как доступные для записи, доступными для записи и в ioBroker.

Обеим сторонам необходимы соответствующие права. `upsd.users` (шаг 3). Обращайтесь с командами загрузки с осторожностью: `load.off` Отключает питание всех устройств, подключенных к ИБП.

## Куда отправиться дальше?

- [Точки данных](/#/docs/adapterref/iobroker.nut2/datapoints.md) — что создает адаптер и что означает каждая его часть.
- [Часто задаваемые вопросы](/#/docs/adapterref/iobroker.nut2/faq.md) , включая мгновенные обновления событий через `upsmon`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.17.0 (2026-09-25)

- New: a UPS command that needs a value, such as a delay, can be sent through the new `commands.execute` data point, written the way upscmd takes it
- New: when the NUT server tracks commands, the log says whether the driver really carried out a command or a new setting, not only that it was sent
- New: every device shows a pictogram for its NUT device type in the object tree — UPS, PDU, solar charge controller, power supply or transfer switch
- Fixed: the connection to the NUT server no longer drops during long poll intervals — the adapter keeps it alive while it is idle
- Fixed: apparent power, real power and percentages carry the right unit and role, and writable temperatures, voltages and currents are settable levels
- Fixed: text values such as test results, contact states or ups.conf settings stay text instead of turning into numbers or being discarded
- Fixed: a word or an empty value in a measurement, such as LoadTooLow, leaves the data point empty instead of keeping an old number, without a warning
- Fixed: renamed data points keep the rooms and functions you assigned them to, and a unit or explanation that no longer applies is removed
- Fixed: a UPS that is missing from the NUT server for a moment keeps its data points and history; it is removed only after three polls without it
- Fixed: the status severity stays empty when the status names no power source, instead of claiming OK for a UPS that is off or still starting
- Fixed: command buttons follow the driver's command list — buttons of commands it no longer offers disappear, and a UPS without commands gets none
- Fixed: values containing #, quotes or backslashes are read correctly; writing a value with # is refused with an explanation, as NUT drivers cannot report it back
- Fixed: a TLS certificate problem stops the retries with one clear message, and a UPS reporting several value ranges shows the full range
- Improved: names and explanations for every variable and command of the NUT 2.8.5 catalog in all eleven languages, including outlets, groups and sensors
- Improved: the warning sign marks exactly the commands that can cut power or stop the driver; switching something on is never marked
- Changed: the upsmon connection is documented as a small helper script, which keeps working with the NUT releases after 2.8.5

### 0.16.0 (2026-09-15) — stable

- Fixed: every adapter start silently removed the status severity, the device type, every dropdown and every bounded value from the rooms and functions the user had assigned them to
- Fixed: when a dropdown list or a value range really shrinks, the data point keeps its value, its recording settings and its room and function assignments
- Fixed: a data point that is renamed by an update keeps its room and function assignments, exactly as it already kept its recording settings
- Fixed: a UPS without a `desc` in ups.conf lost its manufacturer + model name on the first reconnect and was called by its config name until the next restart
- Fixed: after a fatal TLS error on a reconnect the adapter kept polling a connection that no longer existed and promised a retry that never came
- Fixed: stopping the instance while the NUT server was unreachable could leave two error lines in the log
- Improved: dropdown lists and value ranges are no longer rewritten on every start and every reconnect when nothing changed — less load on the object database and on every adapter listening to it
- Improved: the adapter reads its object tree once per discovery instead of once per data point — a lighter start on large installations
- Improved: a value written to a data point the UPS reports as read-only is ignored quietly instead of producing an error
- Improved: a UPS reported without a description by a non-standard NUT server no longer goes missing

### 0.15.1 (2026-09-07)

- New: ten more data points explain themselves — the battery date, the UPS's own clock, the three driver versions, the UPS identifier, the UPS type and the USB vendor and product IDs
- Fixed: the battery maintenance date is the date of the NEXT change or service, not of the last one — its name said the opposite in all eleven languages
- Improved: setting up the upsmon trigger is one line in upsmon.conf instead of a shell script, and points at the rest-api adapter; the older simple-api path stays documented

### 0.15.0 (2026-09-07)

- Fixed: a data point no longer holds a value of the wrong kind — a reading that stops matching the data point's type is discarded with one warning instead of being written into it
- Fixed: a NUT server that is switched off or restarting no longer makes the instance look broken — the adapter names the server it cannot reach and keeps retrying
- Fixed: value limits taken from the UPS disappear again when the UPS stops reporting them, instead of standing forever and causing warnings about every value outside them
- Fixed: credentials containing a space are now refused with an explanation instead of a bare protocol error nobody can act on
- Fixed: enabling instant commands now says why no command buttons appear when the UPS does not answer the command list
- Fixed: a UPS variable without a dot in its name is now writable, and can no longer take over one of the adapter's own channels
- Fixed: over a third of the data points carried an English label in every language — 157 more variable names are now translated into all eleven
- Fixed: the phases of a three-phase UPS, the sensors of a multi-sensor probe and the individual outlets no longer all share one name — each keeps the marker that says which one it is
- Fixed: the outlet buttons of a PDU are now named and explained like every other command instead of showing their raw NUT name
- New: explanations for the battery voltage, battery temperature, battery health and input current, which stood without one next to explained siblings

### 0.14.0 (2026-09-04)

- Fixed: a certificate file left over in the settings no longer stops the adapter — it is only read while strict certificate checking is actually switched on
- Fixed: value lists of writable data points stay in your language instead of falling back to the raw NUT wording after the first poll
- Fixed: the connection test no longer reports an error when only the credentials are refused — it says so and confirms that reading works, matching what the adapter does
- Fixed: the connection test now answers in your language when something goes wrong, not only when it succeeds
- Fixed: a UPS that disappears from the NUT server and comes back gets its manufacturer and model name again instead of keeping the bare UPS name
- Fixed: renamed data points of the adapter itself now reach existing installations instead of only new ones
- Fixed: enabling instant commands without credentials no longer fails silently — the adapter now explains why no command buttons are created
- New: detailed user documentation in English and German is now part of the repository and shown in the ioBroker documentation portal

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

_Developed with assistance from Claude.ai_