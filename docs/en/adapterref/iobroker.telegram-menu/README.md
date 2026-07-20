![Logo](admin/telegram-menu.png)

# ioBroker.telegram-menu

[![NPM version](https://img.shields.io/npm/v/iobroker.telegram-menu.svg)](https://www.npmjs.com/package/iobroker.telegram-menu)
[![Downloads](https://img.shields.io/npm/dm/iobroker.telegram-menu.svg)](https://www.npmjs.com/package/iobroker.telegram-menu)
![Number of Installations](https://iobroker.live/badges/telegram-menu-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/telegram-menu-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.telegram-menu.png?downloads=true)](https://nodei.co/npm/iobroker.telegram-menu/)

![Test and Release](https://github.com/MiRo1310/ioBroker.telegram-menu/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and instructions on disabling error reporting, please refer to the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Use of Sentry reporting starts with js-controller 3.0.

## ioBroker telegram-menu adapter

Easily create Telegram Menus

You can create different groups with separate menus, and then assign users to them.

**If you like it, please consider a donation:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Documentation

[🇺🇸 Documentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.2.3 (2026-07-08)

- FIX: #575 Submenu cannot set 0 as value

### 4.2.2 (2026-06-12)

- FIX: #560 Fix error when using setState with confirm=true sends double return text

### 4.2.1 (2026-06-06)

- FIX: #556 Disable send menu after adapter restart
- FIX: #555 Prevent double sending of state IDs when confirm=true
- CHORE: Update dependencies

### 4.2.0 (2026-05-09)

- FIX: Errors reported by sentry
- (copilot) Adapter requires node.js >= 22 now

### 4.1.1 (2026-04-19)

- FEAT: Add Unit tests
- FIX: SetDynamicValue does not send return text

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 MiRo1310 <michael.roling@gmx.de>

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
