---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: TPNkoPJbFt8lV9kE+BfPQOWeFFstAX3EGddb70PpyK0=
---
![Логотип](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Количество установок](https://iobroker.live/badges/cul-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.cul.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cul.svg)

# ioBroker.cul

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер ioBroker для управления FS20, Max!, HMS и другими устройствами через [CUL](http://busware.de/tiki-index.php?page=CUL) / [cullw](http://culfw.de) . Зависит от <https://github.com/hobbyquaker/cul>

## Поддерживаемые устройства

- _EM_ - EM1000WZ, EMWZ
- _FS20_ , включая ESA1000/2000
- _HMS_ - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- _МОРИЦ_ - МАКС!
- _WS_ - KS300TH, S300TH, WS2000/WS7000

## Как сделать

### Отправьте команду устройству FS20, например, с помощью JavaScript.

`sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});`

### Отправьте необработанную команду (например, на устройство InterTechno) с помощью JavaScript.

`sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});`

Эти команды используют библиотеку CUL данного адаптера для отправки команд устройству. Основано на JavaScript/Node.js. `Busware CUL USB / culfw` адаптер

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-10-13)
* (@GermanBluefox) The adapter reports the serial port it has open to js-controller 8, which keeps a per-host registry of the occupied resources (`system.host.<name>.usedResources`). A second instance configured for the same stick is visible as a conflict, and the log names the other instance before the port is opened. In CUNO mode nothing is reported: the configured port belongs to that device on the network, so it is no longer listed as occupied on this host either. An older js-controller is unaffected

### 3.0.2 (2026-09-02)
* (@GermanBluefox) Removed a prepare script

### 3.0.1 (2026-08-25)
* (@GermanBluefox) The serial port can be entered manually now, so a symlink below `/dev/serial/by-id` can be used (#150)
* (@GermanBluefox) The port list offers the `/dev/serial/by-id` symlinks in addition to the `/dev/ttyUSBx` devices on Linux. They are not hidden behind the experimental option any more and do not replace the device paths any more

### 3.0.0 (2026-08-25)
* (bluefox) BREAKING: The adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.0.0 now
* (bluefox) The adapter was rewritten in TypeScript. The sources are in `src/`, the published code in `build/`
* (bluefox) Updated the `cul` package to 1.0.0. It uses serialport 13, so no build tools are required for the installation any more
* (bluefox) BREAKING: `cul` 1.0.0 renamed some datapoints: `battery` is now `batteryLow`/`batteryState`, `window`/`isopen` is now `open`, `valveposition` is now `valvePosition`. The old states are not written any more and can be deleted
* (bluefox) Fixed the swapped `Mode` and `Type` labels in the configuration dialog
* (bluefox) Fixed the port list in experimental mode: the `/dev/serial/by-id` entries were built from an undefined value
* (bluefox) The HTML configuration dialog and the gulpfile were removed
* (bluefox) The debug driver, that replayed `lib/rawData.txt` when the environment variable `DEBUG` was set, was removed

### 2.2.0 (2023-04-17)
* (jpk) Select port by ID instead of name as an option
* (bluefox) Updated GUI for admin 6

## License

Copyright (c) 2014-2026 hobbyquaker

[Licensed under GPLv2](https://github.com/ioBroker/ioBroker.cul/blob/master/LICENSE)