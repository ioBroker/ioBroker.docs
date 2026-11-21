---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.evcc/README.md
title: ioBroker.evcc
hash: 7udz7n4TzMv7UZDymeE6SlNIHn6Z+23crwx2ZA/yuyA=
---
![Логотип](../../../en/adapterref/iobroker.evcc/admin/evcc.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.evcc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.evcc.svg)
![Количество установок (последние)](https://iobroker.live/badges/evcc-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/evcc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.evcc.png?downloads=true)
![Тестирование и выпуск](https://github.com/Newan/ioBroker.evcc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.evcc

## evcc адаптер для ioBroker

[evcc](https://evcc.io) управляет зарядкой вашего электромобиля с помощью солнечной энергии. Этот адаптер подключает ioBroker к вашему evcc: он отображает все значения evcc в ioBroker (мощность, состояние зарядки, цены, транспортные средства и т. д.) и позволяет управлять зарядкой из скриптов, Blockly или вашей визуализации — например, запускать или останавливать зарядку, устанавливать целевое значение зарядки или план зарядки.

Форум: <https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc>

## Требования

- Запущенная установка evcc, к которой ioBroker может получить доступ по сети (веб-интерфейс, порт по умолчанию 7070).
- Рекомендуется использовать evcc версии 0.316 или новее; более старые версии продолжают работать.

## Начиная

1. Установите адаптер и откройте настройки экземпляра.
2. Введите IP-адрес или имя хоста evcc (без `http://`) и порт.
3. Нажмите **«Проверить соединение»** — адаптер отобразит версию EVCC, а также ваши точки нагрузки и транспортные средства.
4. Сохраните. Через несколько секунд значения появятся в объектах в разделе `evcc.0`.

## Конфигурация

| Параметр                     | Значение                                                                                                                                                                                                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Хост или IP-адрес            | адрес EVCC, например `192.168.1.10` или `evcc.local`                                                                                                                                                                                                               |
| Порт                         | порт веб-интерфейса EVCC, обычно `7070`                                                                                                                                                                                                                           |
| Интервал опроса              | Как часто считывается значение EVCC. Чем короче интервал, тем больше текущих значений, но и тем больше нагрузка. По умолчанию — 60 секунд.                                                                                                                       |
| Проверить соединение         | проверяет введенный адрес без сохранения.                                                                                                                                                                                                                        |
| Растворить объекты состояния | Выкл.: значения, относящиеся друг к другу (например, сеть, солнечные батареи, батарея), хранятся вместе в одной точке данных. Вкл.: каждое значение получает свою собственную точку данных — удобно для визуализации и диаграмм, но создает больше точек данных. |
| Прогнозы                     | Сохраняет прогнозы EVCC (солнечная энергия, цены, CO₂, температура). Необходим только для оценки этих данных в ioBroker, создает около 1800 точек данных.                                                                                                        |

## Точки данных

| Путь                           | Содержание                                                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`              | `true` пока evcc достижим                                                                                                         |
| `status`                       | значения всего участка, например `pvPower`, `homePower`, `tariffGrid`                                                             |
| `control`                      | настройки всего сайта, например, домашней батареи (`bufferSoc`, `prioritySoc`) и ценовые ограничения                             |
| `loadpoint.1`, `loadpoint.2` … | одна запись на каждую точку нагрузки (названную так же, как в evcc), с `status` (текущие значения) и `control` (настройки и кнопки) |
| `vehicle.<name>`               | Одна запись на каждое транспортное средство (название аналогично EVCC): минимальный и целевой уровень заряда, план зарядки.       |

Всё ниже `control` Значение можно изменить – адаптер отправляет новое значение в evcc.

## Управление зарядкой

| Точка данных                                    | Что это делает                                                                                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loadpoint.X.control.off` /`.now` /`.smart`     | Кнопки: остановить зарядку, зарядить сейчас на полной мощности, зарядить от солнечной энергии                                                                                              |
| `loadpoint.X.control.pvControl`                 | то же самое, что и одно значение: `0` выключенный, `1` умный, `2` Smart + постоянная зарядка. `3` Сейчас. Также отображается текущий режим.                                                    |
| `loadpoint.X.control.alwaysCharge`              | `on` В интеллектуальном режиме всегда заряжайте устройство как минимум с минимальным энергопотреблением. `once`: только до тех пор, пока транспортное средство не будет отсоединено. `off` |
| `loadpoint.X.control.limitSoc`                  | зарядить до этого уровня (%)                                                                                                                                                               |
| `loadpoint.X.control.minCurrent` /`.maxCurrent` | минимальный/максимальный зарядный ток (А)                                                                                                                                                  |
| `loadpoint.X.control.batteryBoost`              | `true` Также можно использовать домашний аккумулятор для зарядки, доведя его до нужного уровня. `batteryBoostLimit` (%). С `batteryBoostLimit` = 100, наддув отключен                        |
| `loadpoint.X.control.limitEnergy`               | Заряжайте только это количество энергии (кВт·ч) для гостевых автомобилей или автомобилей без уровня заряда. Удаляется системой evcc при отключении автомобиля от сети.                     |
| `loadpoint.X.control.priority`                  | При наличии нескольких точек подключения солнечная энергия сначала получает та, которая имеет более высокий приоритет.                                                                     |
| `loadpoint.X.control.pv` /`.min`                | Старые кнопки, всё ещё работают (умный режим без/с постоянной зарядкой)                                                                                                                    |

## Домашний аккумулятор

Если EVCC управляет вашей домашней батареей, ioBroker может установить её режим работы с помощью `control.batteryMode`:

| Ценить       | Что происходит                                |
| ------------ | --------------------------------------------- |
| `off`        | evcc управляет самой батареей (по умолчанию). |
| `normal`     | нормальная работа                             |
| `hold`       | батарея не разряжена                          |
| `charge`     | Аккумулятор заряжается от электросети.        |
| `holdcharge` | Батарея не заряжена                           |
| `discharge`  | Аккумулятор разряжается и поступает в сеть.   |

Этот режим остаётся активным до тех пор, пока вы его не установите. `off` Опять же – адаптер повторяет это в EVCC каждые 30 секунд, потому что EVCC переключается на собственное управление через минуту без нового запроса. Пока установлен режим, собственные правила EVCC для батарей (например, ограничение цены) не применяются. Если EVCC не может управлять батареей, адаптер записывает предупреждение и возвращает значение к исходному. `off`.

## План зарядки

При использовании плана зарядки автомобиль заряжается до целевого уровня к заданному времени, предпочтительно с помощью солнечной энергии или по низким ценам. Настройте это для каждой точки зарядки отдельно. `loadpoint.X.control.plan`:

| Точка данных  | Значение                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `plan.time`   | Когда необходимо достичь цели. Пусто или в прошлом: через 24 часа.                                                   |
| `plan.soc`    | Целевой уровень заряда в % (используется, когда транспортное средство приписано к точке зарядки)                     |
| `plan.energy` | Энергия для зарядки в кВт·ч (используется, когда транспортное средство не закреплено, например, гостевой автомобиль) |
| `plan.active` | `true` составляет план, `false` Удаляет его. Показывает, установлен ли план в EVCC.                                   |

Набор `time` и `soc` /`energy` сначала, затем `active = true` Аналогичные работы выполняются для каждого транспортного средства в соответствии с условиями. `vehicle.<name>.plan`.

## Примечания

- **При перезапуске evcc (например, при обновлении)** адаптер выводит одно предупреждение и устанавливает `info.connection` к `false` и автоматически переподключается. Когда evcc снова подключается, в журнале появляется информационное сообщение.
- **Изменения в evcc** (новые, удаленные или переименованные точки загрузки и транспортные средства) переносятся автоматически. Объекты точек загрузки и транспортных средств, которые больше не существуют в evcc, удаляются после запуска адаптера или перезапуска evcc.
- **Значения, которые evcc больше не отображает** (например, оставшееся время зарядки после зарядки), устанавливаются в пустое значение. `null`).
- **Скрипты из более старых версий:** начиная с evcc 0.316 `loadpoint.X.status.mode` шоу `smart` вместо `pv` /`minpv`. Использовать `loadpoint.X.control.pvControl` чтобы различать лады.
- `loadpoint.X.status.planActive` Это выражение происходит от EVCC и означает «зарядка в соответствии с текущим планом», а не «план установлен».

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-11-17)
* (Schimi1983) new: `control.batteryMode` sets the home battery mode in evcc (normal, hold, charge, holdcharge, discharge) and keeps it active, `off` returns control to evcc
* (Schimi1983) new per loadpoint: `batteryBoost`, `batteryBoostLimit`, `limitEnergy`, `priority`
* (Schimi1983) loadpoints and vehicles removed in evcc are deleted, renamed ones get their new name (checked after start and after an evcc restart)
* (Schimi1983) evcc not reachable (e.g. restart/update): one warning instead of an error on every poll, info message when the connection is restored
* (Schimi1983) values evcc does not report anymore (e.g. `fatal`, remaining charging time) are set to `null` instead of keeping the last value
* (Schimi1983) existing status objects are updated to the current roles at start, also for values evcc currently does not report
* (Schimi1983) README: getting started, data points and charging control explained for users

### 0.3.2 (2026-11-06)
* (Schimi1983) state roles according to the ioBroker state roles: writable states use `level.*` / `switch` / `button.*` / `text` instead of `value`, min/max for percent values, JSON values use role `json` (type string), strings `text`, remaining durations `value.timer`; ids and values are unchanged
* (Schimi1983) complete object tree: folders `loadpoint` / `vehicle`, a device per loadpoint and vehicle (named by its evcc title), channels `control` / `status`
* (Schimi1983) price limits under `control` use the currency configured in evcc, buttons are confirmed with ack = true
* (Schimi1983) admin: reworked config page (connection / data points sections, help texts, validation, units), new "Test connection" button
* (Schimi1983) fix: host was cut when it contained "http" anywhere (e.g. a host name), now only a leading http:// / https:// and a path are removed
* (Schimi1983) defaults for new instances: poll interval 60 s, port as number
* (Schimi1983) repository checker (#141): unit tests use node:assert instead of chai (W0063), package.json "files" instead of .npmignore (W9503), i18n short format (S5601)
* (Schimi1983) remove unused workflow file dependabot-automerge.yml.OLD (pull_request_target, #139)
* (Schimi1983) fix: polls took longer than the interval with many states (e.g. weather forecast) – values are now written in batches
* (Schimi1983) fix: no errors in the log when the adapter is stopped during a poll
* (Schimi1983) fix unit tests: chai-as-promised is no longer loaded in test setup (not a direct dependency anymore)
* (Schimi1983) charging plan per loadpoint: `control.plan.active/time/soc/energy` (soc plan of the assigned vehicle or energy plan of the loadpoint), closes #73 and #18
* (Schimi1983) repository checker (#135): remove test dependencies already provided by @iobroker/testing, CHANGELOG_OLD.md in .npmignore, consistent formatting of admin/jsonConfig.json

### 0.3.1 (2026-10-10)
* (arteck) Dependencies have been updated
* (Schimi1983) fix: `enableThreshold` / `disableThreshold` could not be set
* (Schimi1983) fix: global `control.smartCostLimit` was sent to loadpoint `undefined`
* (Schimi1983) fix: `smartCostLimit` / `batteryGridChargeLimit` = 0 now removes the limit (DELETE), negative limits are allowed
* (Schimi1983) fix: `chargeDuration` / `connectedDuration` are reported by evcc in seconds (were treated as nanoseconds)
* (Schimi1983) fix: vehicle plan (`plan.active`, `plan.planSoc`, `plan.time`) is read from and written to evcc again
* (Schimi1983) remove unused calls to removed evcc endpoints
* (Schimi1983) fix: control actions were called with the adapter as `this` instead of the evcc client
* (Schimi1983) performance: objects are created once per runtime instead of being rewritten on every poll, polls no longer overlap
* (Schimi1983) add units and roles (W, Wh, kWh, A, %, km, s, €/kWh, g/kWh, °C) for known evcc status values, indicator role for booleans

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and asSociated documentation files (the "Software"), to deal
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