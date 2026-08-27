---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fakeroku/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku
hash: PNfvfuq6BoUvvHXVSfMMQoSibS9YWdZxtbTOVyu0lIs=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku

![npm версия](https://img.shields.io/npm/v/iobroker.fakeroku)
![стабильный](https://iobroker.live/badges/fakeroku-stable.svg)
![Установки](https://iobroker.live/badges/fakeroku-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.fakeroku)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

Эмулирует одно или несколько устройств Roku в вашей локальной сети, позволяя пультам дистанционного управления ECP/SSDP — Logitech Harmony Hub или Sofabaton X1/X2 — запускать события в ioBroker. Это аналог адаптера Logitech Harmony в качестве **входного** элемента: кнопка на пульте становится точкой данных в ioBroker.

В отличие от классического поддельного Roku, эта сборка поддерживает все панели управления Roku, включая `/query/device-info`, с **актуальной** версией Roku, поэтому она работает не только с классическим хабом Harmony.

> **Официальное мобильное приложение Roku не поддерживается.** Оно управляет устройствами Roku через собственный, недокументированный канал WebSocket ECP-2 от Roku, который данный эмулятор не поддерживает. Используйте хаб Harmony или Sofabaton — они поддерживают классический ECP, который обслуживает этот адаптер.

## Функции
- Эмулирует одно или несколько устройств Roku в локальной сети — протокол управления Roku (ECP) по HTTP плюс обнаружение SSDP на порту 1900.
- Полноценная панель управления Roku, включая `/query/device-info`, с актуальной версией Roku, превосходящая возможности классического хаба Harmony.
- Чистая модель данных для каждого устройства: точка данных `command` плюс фиксированные состояния `keys.<Key>`, все создается заранее.
- Несколько эмулированных устройств Roku из одного экземпляра; обнаружение привязано к выбранному сетевому интерфейсу; обработка команд ограничена локальной сетью.

## Требования
- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

## Установка
Установите адаптер из административной панели ioBroker.

## Конфигурация
- **Сетевой интерфейс** — сетевая карта, к которой подключаются и которую рекламируют эмулируемые устройства Roku.

Включить. Оставьте параметр «все интерфейсы» включенным, и адаптер будет работать сразу после установки — он автоматически определит маршрутизируемый IP-адрес. Выберите конкретный адрес только на хосте с несколькими сетевыми картами.

- **Эмулированные устройства Roku** — управляются как карты: **+ Добавить** открывает диалоговое окно с

**Имя**, **порт ECP** (`8060` — реальный порт Roku; предварительно выбран свободный порт, и диалоговое окно отклоняет уже используемые имя или порт) и **тип**. Вы можете эмулировать несколько устройств Roku из одного экземпляра — каждому нужен свой собственный порт.

- **Тип** — *Плеер* (по умолчанию) отображает 16 стандартных клавиш навигации и воспроизведения;

*TV* дополнительно отображает клавиши регулировки громкости, включения/выключения, переключения каналов и выбора входа. Выбирайте *TV* только в том случае, если хотите использовать эти дополнительные клавиши в качестве триггеров ioBroker.

Чтобы добавить эмулированное устройство Roku в хаб Harmony, добавьте устройство «Roku» в приложение Harmony и укажите в качестве адреса хост ioBroker.

## Объекты
Для каждого эмулируемого Roku (`fakeroku.0.<name>`):

| Точка данных | Тип | Значение |
|---|---|---|
| `.command` | строка, только для чтения | Последняя команда в виде обычного текста (`Home`, `Lit_a`, `launch:12`, `search:news`). Одна точка данных для всего — никакого разброса объектов по символам. |
| `.keys.<Key>` | логическое значение, только для чтения | Для каждой клавиши пульта дистанционного управления, отображаемой типом устройства, доступно одно состояние — *Плеер* имеет 16 клавиш навигации/воспроизведения, *ТВ* добавляет клавиши громкости*, питания, каналов*, входов HDMI/AV — все они создаются заранее. Нажатие клавиши на мгновение активирует состояние `true`; нажатие/отпускание клавиши удерживает его. |
| `.keys.<Key>` | логическое значение, только для чтения | Для каждой клавиши пульта дистанционного управления, отображаемой типом устройства, доступно одно состояние — *Плеер* имеет 16 клавиш навигации/воспроизведения, *ТВ* добавляет клавиши громкости*, питания, каналов*, входов HDMI/AV — все они создаются заранее. Нажатие клавиши на мгновение переводит его в состояние `true`; нажатие/отпускание клавиши удерживает его. |

Свободный ввод с клавиатуры (`Lit_x`) и запуск приложений отображаются только в `.command` — для них не создаются отдельные объекты.

Примечание: пульт Roku отправляет **одну и ту же** команду `Play` для воспроизведения и паузы, поэтому > воспроизведение и пауза здесь неразличимы — это ограничение протокола, а не адаптера.

## Использование
В скрипте или правиле Blockly реагируйте на нажатие клавиши — например, когда `fakeroku.0.<name>.keys.Play` становится `true`, или отслеживайте `.command` в ожидании появления текста последней кнопки.

## История
У fakeroku долгая история на ioBroker, и эта версия продолжает её — для существующих пользователей это просто новая версия того же адаптера:

- **[Pmant](https://github.com/Pmant)** создал fakeroku в 2017 году и разработал оригинальную версию.

Эмуляция Roku: обнаружение SSDP, интерфейс ECP и поддержка нескольких устройств.

- **[Apollon77](https://github.com/Apollon77)** поддерживал актуальность инструментов тестирования и сборки.

в последующие годы.

- **[Адаптеры сообщества ioBroker](https://github.com/iobroker-community-adapters)**

Команда разработчиков — в частности, [mcm1957](https://github.com/mcm1957) и [foxriver76](https://github.com/foxriver76) — поддерживала и модернизировала адаптер с 2023 по 2026 год, выпустив версии до 0.5.1.

- Начиная с версии **0.6.0**, [krobi](https://github.com/krobipd) переписал адаптер из

Разработано с нуля на TypeScript и добавлена полная поверхность ECP, включая `device-info`.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-08-05)
- (krobipd) First stable release — version 1.0.0 marks the complete rewrite as the mature, supported version of the adapter.
- (krobipd) Upgrading from an older version now shows a one-time notice that the button data points changed from text to real boolean values, so scripts and visualizations can be checked.

### 0.6.0 (2026-08-05)
- (krobipd) Complete rewrite. The adapter now answers the full Roku control surface — including device-info with a current Roku version — so Logitech Harmony and Sofabaton remotes pair and work reliably.
- (krobipd) Works out of the box: it detects the network address to advertise on its own, no manual interface picking.
- (krobipd) Manage multiple emulated Rokus from the admin UI, each as a Player or a TV.
- (krobipd) Cleaner object tree — one datapoint per remote button with the correct types, plus a last-command datapoint; leftover objects from older versions are removed on start.

### 0.5.1 (2026-08-05)
- (mcm1957) Adapter requires Node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 0.5.0 (2026-07-30)
- Complete rewrite with the full Roku control surface, including `device-info` with a current Roku version — the part modern remotes check at pairing, beyond what a classic Harmony hub needs
- New clean data model: a `command` datapoint plus fixed `keys.<Key>` states, all created up front instead of appearing only after the first keypress
- Discovery binds to the chosen network interface, command handling is restricted to the local network

### 0.4.0 (2026-03-07)
- Adapter requires node.js >= 20, admin >= 7.7.22, js-controller >= 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

_Developed with assistance from Claude.ai_