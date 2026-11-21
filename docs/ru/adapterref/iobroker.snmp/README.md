---
chapters: {"pages":{"en/adapterref/iobroker.snmp/README.md":{"title":{"en":"ioBroker.snmp"},"content":"en/adapterref/iobroker.snmp/README.md"},"en/adapterref/iobroker.snmp/docs/en/snmp.md":{"title":{"en":"SNMP adapter information"},"content":"en/adapterref/iobroker.snmp/docs/en/snmp.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: TduicMJP/kbophE7Zp9kTjY/IAmhgfrKzupxZkuqYGM=
---
![Логотип](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.snmp)
![Загрузки](https://img.shields.io/npm/dm/iobroker.snmp.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.snmp)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.snmp)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.snmp/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.snmp)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.snmp)
![Версия NPM](https://img.shields.io/npm/v/iobroker.snmp.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/snmp-stable.svg)
![Количество установок](https://iobroker.live/badges/snmp-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml/badge.svg)

# ioBroker.snmp

</br>
**Version:** </br>
</br>
**Tests:** </br>

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

## Sentry

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Информация

Этот адаптер можно использовать для получения информации от таких устройств, как принтеры, сетевые устройства и т. д., с помощью протокола SNMP.

## Конфигурация адаптера

Адаптер запрашивает указанные OID, которые группируются в группы OID, которые, в свою очередь, назначаются устройствам. Данные конфигурации вводятся на нескольких вкладках. Адаптер поддерживает соединения IPv4 и IPv6.

Подробную информацию см. в документации, указанной ниже.

## Документация

[английская документация](/#/docs/adapterref/iobroker.snmp/docs/en/snmp.md)<br> [немецкая документация](https://github.com/iobroker-community-adapters/ioBroker.snmp/blob/master/docs/de/snmp.md)<br> [русская документация](https://github.com/iobroker-community-adapters/ioBroker.snmp/blob/master/docs/ru/snmp.md)

## Changelog

<!--
   ### **WORK IN PROGRESS**
-->
### 4.0.1 (2026-10-22)
- (@GermanBluefox) The UDP port of the trap receiver is reported to js-controller 8 as occupied (`registerUsedResource`), and a warning is logged before the start if another instance has registered it already

### 4.0.0 (2026-09-30)
- (bluefox) New tab "Traps": the adapter can listen for snmp traps and informs of v1, v2c and v3. A received trap is written into "<device>.trap.oid", ".name", ".json" and ".count" - the counter is the state to subscribe to - and into "info.trap.*" for the last trap of any sender. The sender address decides which device a trap belongs to, and the oid of a v1 trap is derived from its pdu the way RFC 3584 describes it, so v1 and v2c traps can be compared (#22)
- (bluefox) OID groups can be exchanged as templates: a group is written into a JSON file with "save as template" and a file like that is imported into a group again, adding to it or replacing it. Delivered are templates for the system group, the first port of a switch, a computer, a printer and a UPS (#202)
- (bluefox) Fixed: rows which the setup wizard, the MIB browser or a template added stayed invisible in the table until the dialog was opened again
- (bluefox) New option "trace all snmp requests and answers": every request and every answer is written into the log as JSON, marked with "[trace]" and the device it belongs to - for a support case, and it covers the polls, the writes and the requests of the MIB browser (#241)
- (bluefox) The option "do not close session on error" is documented, and the option table uses the labels of the dialog, so that every option can be found under the name it has there (#288)
- (bluefox) A device using SNMP v3 whose authorization id is empty or refers to nothing is skipped with a warning instead of asking without a user name - such a request is answered with "Unknown User Name", which named neither the device nor the missing authorization set (#409). The ids of device and authorization set are compared without leading and trailing blanks now
- (bluefox) The states use the roles of the ioBroker role list: a number is `value` resp. `level` when it is writeable, a boolean `indicator` resp. `switch`, a text `text`, and the type states no longer use the role `type.encoding`, which does not exist. The error flag of a device is `indicator.error` instead of `indicator.reachable` (#524)
- (bluefox) New value format "hex dump": binary data of an OctetString, Opaque or Counter64 is stored as "76 01 04 00 27 10", the way a MIB browser shows it, and a writeable OID takes that notation back (#623)
- (bluefox) New tab "MIB": MIB files can be uploaded and browsed, and a device can be read live - the browser fills the OID group of the selected device, one OID at a time or all shown at once
- (bluefox) An incomplete configuration no longer disables the instance: a device without OIDs is skipped with a warning, so that a new device can be set up with the MIB browser while the adapter is running
- (bluefox) The screenshots of the documentation have been renewed and show the current dialog, including the MIB tab
- (bluefox) The options of the config dialog use the width of the dialog again - on a wide screen their labels were squeezed into a narrow column
- (bluefox) The documentation has been brought up to date: the format of an OID and the state type it produces, the objects and states the adapter creates with their roles and quality codes, writing back to a device, the three options which were missing, and the MIB tab plus the setup wizard in the russian documentation
- (bluefox) A folder of the MIB browser can be taken over as a whole: It's plus button adds every value below it to the OID group, read in one walk
- (bluefox) The MIB browser has one source now: it reads the device live, level by level, and names what comes back with the uploaded MIB files - the separate, offline tree of a MIB file is gone, the module list jumps to the beginning of a MIB instead
- (bluefox) Fixed: with SNMP v1 the end of a subtree is reported as the error NoSuchName, which made every level of a v1 device fail
- (bluefox) Fixed: the live view skipped every second row of a table - the rows carry their value at the oid of the row itself, so the jump behind a row has to start below it, not at the next row
- (bluefox) An OID taken over from a MIB file now addresses a value: a scalar is stored as "<OID>.0" (the ".0" stays out of the object id), a column of a table is marked, because it needs the index of a row - which the live read of the device delivers
- (bluefox) New setup wizard on the "Devices" tab: it asks for the device, lets you upload its MIB files and pick the values to read - including a live read of the device before it has ever been saved
- (bluefox) The devices are configured first: the tab "Devices" comes before "OID sets", the device table is no longer hidden until an OID group exists, and an empty OID table no longer blocks the save button
- (bluefox) New option "use MIB names": the OID field then also accepts symbolic names like IF-MIB::ifDescr.1 and the object ids are built from the MIB symbol. Attention: switching this option changes the object ids of existing OIDs
- (bluefox) The adapter has been refactored to TypeScript, the sources now live in `src/` and are compiled to `build/`
- (bluefox) The admin translations have been moved from `admin/i18n/<lang>/translations.json` to `admin/i18n/<lang>.json`, `admin/words.js` has been removed
- (bluefox) The npm `install` script has been removed - the configuration migration runs at adapter startup as before
- (bluefox) The adapter can no longer be installed directly from GitHub (`common.nogit`), please install it from npm
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 3.4.0 (2026-02-16)
- (mcm1957) Dependencies have been updated

### 3.3.0 (2025-08-17)
* (mcm1957) Adapter requires node.js 20, js-controller >= 6.0.11, and admin >= 7.6.17 now.
* (mcm1957) Dependencies have been updated

### 3.2.0 (2024-03-29)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2017-2023 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers 

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