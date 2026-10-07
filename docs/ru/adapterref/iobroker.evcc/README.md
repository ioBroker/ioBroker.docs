---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.evcc/README.md
title: ioBroker.evcc
hash: E4kx+OqH3dq0I2dJq8IWxjrTJGxQYP/X9ePHv6k+ixA=
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

Управление EVCC через REST API

Форум: <https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc>

## Режим зарядки (evcc >= 0,316,0)

evcc 0.316.0 переименовал режим `pv` к `smart` и заменил `minpv` с отдельной настройкой `alwaysCharge` ( [evcc PR #32490](https://github.com/evcc-io/evcc/pull/32490) ). Адаптер автоматически определяет версию evcc и продолжает работать со старыми версиями.

| Состояние                                   | Ценности                                                            | Примечание                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `loadpoint.X.control.off` /`.now` /`.smart` | кнопка                                                              | установить режим                                                                  |
| `loadpoint.X.control.alwaysCharge`          | `off`, `on`, `once`                                                 | evcc >= 0.316.0 только, `once` Сбрасывается при отключении транспортного средства. |
| `loadpoint.X.control.pvControl`             | `0` выключенный, `1` умный, `2` Smart + постоянная зарядка. `3` сейчас | теперь также отражает текущий режим EVCC.                                         |
| `loadpoint.X.control.pv` /`.min`            | кнопка                                                              | устарело, привязано к функциям smart + alwaysCharge off / on                      |

**Проблема возникает при работе скриптов/визуализаций:** с версией evcc >= 0.316.0. `loadpoint.X.status.mode` отчеты `smart` вместо `pv` /`minpv`. Использовать `loadpoint.X.status.alwaysCharge` или `loadpoint.X.control.pvControl` чтобы отличить прежний режим min+pv.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (arteck) Dependencies have been updated

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

### 0.2.9 (2026-07-15)
* (arteck) add grid request

### 0.2.8 (2026-03-09)
* (arteck) reduce read request, static dp read only once

### 0.2.7 (2026-03-09)
* (arteck) delete big arrays feedin, grid, planner
* (arteck) refactor tests

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