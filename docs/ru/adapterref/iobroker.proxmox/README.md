---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.proxmox?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.proxmox?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.proxmox?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.proxmox?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.proxmox?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.proxmox/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.proxmox.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/proxmox-stable.svg
BADGE-Installed: https://iobroker.live/badges/proxmox-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.proxmox/README.md
title: ioBroker.proxmox
hash: A1abdyJWhEEKo0SkhcCFaQ4YWG/FL4j6lYpXO/9vY/I=
---
![Логотип](../../../en/admin/proxmox.png)

# ioBroker.proxmox

## Anforderungen

- Node.js 22.19 (или более поздняя версия)
- js-controller 6.0.11 (или более поздняя версия)
- Административный адаптер 7.7.22 (или более поздняя версия)

## виджет vis-2

Набор виджетов "Proxmox" содержит виджет для одной виртуальной машины или контейнера. Выберите машину из списка. Виджет отображает состояние, время работы, загрузку ЦП и ОЗУ, а также имеет кнопки для запуска и остановки машины.

- **Отображение времени безотказной работы:** время безотказной работы отображается во время работы оборудования.
- **Отображение значка:** цвет значка показывает состояние. Используйте **«Значок»** , чтобы выбрать собственный значок, или **«Изображение»** , чтобы выбрать собственный графический файл. Изображение имеет приоритет над значком и сохраняет свои собственные цвета.
- **Показать элементы управления:** без этой опции виджет отображает только состояние. Используйте её, если к проекту vis имеют доступ лица, которым запрещено останавливать машины. Подтверждение не обеспечивает защиту доступа.
- **Кнопка «Стоп»:** по умолчанию она корректно выключает устройство. Для команды «Немедленное выключение» используется команда Proxmox. `stop` что может привести к потере несохраненных данных.
- После выполнения команды состояние обновляется при следующем опросе, примерно через 10 секунд. До этого момента виджет отображает «В процессе».

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.0 (2026-11-08)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (bluefox) The adapter was refactored to TypeScript. It can only be installed from npm now, not from GitHub
- (bluefox) Fixed the cleanup button in the configuration dialog, it never got an answer from the adapter
- (bluefox) Repaired the translations of the configuration dialog, which were broken since 2.5.0
- (bluefox) VMs and containers with the same name no longer share their states and buttons: all of them get the object ID `<name>_<vmid>`. Other object IDs do not change (#702)
- (bluefox) Buttons no longer execute their command twice when the states are stored in Redis (#703)
- (bluefox) With several individual nodes, the instances no longer delete each other's objects, which caused a restart loop and missing data. If a node does not answer during the start, old objects are kept until the next start (#697, #622, #612)
- (bluefox) The first poll runs right after the start instead of after the configured interval, so the instance turns green sooner (#678)
- (bluefox) Individual hosts with the same node name, or with VMs and storages of the same name, no longer share their objects: all of them get `_<host>` added to the object ID, for example `node_pve_192-168-1-10`. A button now always reaches the host it belongs to. Other object IDs do not change
- (bluefox) Added the device manager: nodes, VMs and containers with status, CPU and RAM, and start, shutdown, reboot and stop with a confirmation
- (bluefox) Added a vis-2 widget that shows the state of a VM or container and can start and stop it. An option hides the controls
- (bluefox) The device manager cards show an icon per type, the status in color, the uptime, the load with warning colors and a details dialog
- (bluefox) The widget selects the machine from a list and shows the uptime and load bars. An own icon or image can be selected
- (bluefox) Added the state `uptime_text` to nodes, VMs and containers, for example `3 d 4 h`

### 2.6.3 (2026-07-31)
* (arteck) fix next node reconnect
* (arteck) add state info.node for actual node ip

### 2.6.2 (2026-07-15)
* (arteck) restructure ceph health message

### 2.6.1 (2026-05-21)
* (arteck) fix reconnect

### 2.6.0 (2026-05-13)
* (arteck) fix high i/o
* (copilot) Adapter requires node.js >= 22 now

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 MeisterTR <meistertr.smarthome@gmail.com>

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