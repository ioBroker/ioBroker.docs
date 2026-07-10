---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.shelly?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.shelly?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.shelly?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.shelly?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.shelly?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.shelly/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.shelly.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/shelly-stable.svg
BADGE-Installed: http://iobroker.live/badges/shelly-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: 6KI7+6aaDkefhAXx3k31J5XYjqmMrsWkAMV0OljbWPc=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/README.md)

## Оглавление
- [Менеджер устройств](devicemanager.md)
- [Протокол MQTT](protocol-mqtt.md)
- [Протокол CoAP/CoIoT](protocol-coap.md)
- [Устройства BLE](ble-devices.md)
- [Ограниченный доступ](restricted-login.md)
- [Изменения состояния](state-changes.md)
- [Отладка](debug.md)
- [FAQ](faq.md)

## Требования
1. Node.js 22 (или более новая версия)
2. js-controller 6.0.11 (или более новая версия)
3. Административный адаптер 7.8.20 (или более новая версия)

## Поколения устройств
Для получения дополнительной информации см. [*Поддерживаемые устройства*](../../README.md#supported-devices).

- **Первое поколение**: устройства ESP8266, [CoAP/CoIoT](protocol-coap.md) или [MQTT](protocol-mqtt.md)
- **Поколение 2+**: устройства ESP32, [MQTT](protocol-mqtt.md)

## В целом
Адаптер может взаимодействовать с устройствами через MQTT (рекомендуется) или CoAP/CoIoT.

- Режим по умолчанию адаптера — MQTT (подробнее см. в [документации](protocol-mqtt.md))
- CoAP/CoIoT совместим только с устройствами первого поколения!
— **Для интеграции устройств Gen2 необходимо настроить MQTT!**

Есть вопросы? Сначала проверьте [Часто задаваемые вопросы](faq.md)!

![iobroker_general](../../../de/adapterref/iobroker.shelly/img/iobroker_general.png)

## Функции
— Адаптер интегрирован в диспетчер устройств ioBroker. Дополнительную информацию можно найти в [документации диспетчера устройств](devicemanager.md).

## Ограничения
- Адаптер Shelly не поддерживает интеграцию устройств Shelly с использованием NAT (например, многих VPN-сервисов и расширителя диапазона Shelly).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@klein0r) Added hold (128) and nothing (0) to BLE states for buttons

### 11.0.0 (2026-07-03)
- (@klein0r) Updated ble script (v1.3) for Shelly firmware > 2.0
- (@GermanBluefox) Added firmware update available indicator for devices supporting this feature.
- (@copilot) Added Shelly Dimmer 0/1-10V PM Gen4 (shelly0110dimg4).
- (@copilot) Added HiluX DS8 by Shelly (hiluxds8)
- (@copilot) Added Shelly EM Gen4 (shellyemg4)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.8.23 now.
- (@GermanBluefox) Device manager has been added providing info and control of devices and provisioning.
- (@mcm1957) IMPORTANT: Please read the changelog at README.md listing more information.

### 11.0.0 additional information 
- (@mcm1957) Added Shelly Presence Gen 4
- (@mcm1957) Added Shelly Cury
- (@GermanBluefox) Added support for Device manager: info and control of devices and provisioning
- (@GermanBluefox) Added detection of new devices in the background
- (@mcm1957) Some missing states added at an illuminance component
- (@mcm1957) DISABLE all PLUG_UI functionality due to unrecoverable HW faults.
- (@mcm1957) Dependencies have been updated

### 10.6.1 (2026-02-23)
- (HGlab01) OnUnload handling has been improved. [#1279]
- (@mcm1957) shellypill: missing input 202 has been added, nonexisting analog input has been removed.

### 10.6.0 (2026-02-08)
* (@mcm1957) The-Pill-By-Shelly (shellypill) has been added. [#1232]
* (@mcm1957) Shelly EM mini Gen 4 (shellyemminimg4) and Plug M Gen 3 (shellyplugmg3) have been added. [#1327,#1332]
* (@mcm1957) Shelly BLU H&T Display ZB support for light attribute has been added. [#1230]
* (@mcm1957) Support for favorites for Gen 2+ devices with cover support has been added. [#1001]
* (@mcm1957) Power metering support has been added to RGB and RGBW components. [#1339]
* (@mcm1957) FrankEver Smart Watervalve (watervalve) has been added. [#1341]
* (@mcm1957) LinkedGo ST1820 (st1820) has been added. [#1257]
* (@mcm1957) Dependencies have been updated

### 10.5.2 (2025-12-28)
* (@mcm1957) Monophase profile support has been fixed for shellypro3em and shellypro3em400.


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2025 Thorsten Stueben <thorsten@stueben.de>,
                        Apollon77 <iobroker@fischer-ka.de> and
                        Matthias Kleine <info@haus-automatisierung.com>

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