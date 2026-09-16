---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gree-hvac/README.md
title: iobroker.gree-hvac
hash: 7pMQEVnxYSIVU/o0jQUH/0IJVyuLaz1iBs0xGKFp5gg=
---
![Логотип](../../../en/adapterref/iobroker.gree-hvac/admin/air-conditioner.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)
![Количество установок](https://iobroker.live/badges/template-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/gree-hvac-stable.svg)
![Тестирование и выпуск](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg)

# iobroker.gree-hvac

Адаптер для кондиционеров Gree и C\&H

## Поддерживаемые устройства

Должна поддерживаться поддержка всех устройств, которыми можно управлять через приложение EWPE Smart, включая:

- Серия «Зеленый ум»
- Cooper\&Hunter: Supreme, Vip Inverter, ICY II, Arctic, Alpha, Alpha NG, Veritas, серия Veritas NG
- Серия EcoAir X
- ПроКлима

**Обратите внимание, что новые кондиционеры, а возможно, и старые, не будут работать без доступа в интернет. Они просто перестанут реагировать на запросы адаптера.**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Благодарности

- [tomikaa87](https://github.com/tomikaa87) за обратное проектирование протокола Gree
- [stas-demydiuk](https://github.com/stas-demydiuk) для кода DeviceManager
- Сизенко Александр для Digital-7 fonts
- \[con1nuity] для добавления шифрования AES-GCM

## Changelog
### 4.0.0 (2026-08-28)
 - Migrated the admin tab from jQuery/Materialize to React (MUI 6 / @iobroker/adapter-react-v5)
 - The admin tab is now translated into all 11 adapter languages
 - Errors reported by the adapter are shown in the tab instead of only in the browser console
 - The admin tab now detects the running adapter instance instead of always using instance 0
 - The admin tab now follows the light/dark theme of the admin UI

### 3.0.3 (2026-06-01)
 - Fixed adapter runtime dependencies and updated CI workflow

### 3.0.2 (2026-05-28)
 - Filtered network-related errors from Sentry reporting

### 3.0.1 (2026-05-28)
 - Fixed i18n translation files

### 3.0.0 (2026-05-25)
 - Migrated adapter source code to TypeScript
 - Updated build pipeline to use `build-adapter ts` (esbuild + tsc)
 - Updated CI/CD workflow to run on all branches with explicit build steps

### 2.0.9 (2026-05-21)
 - Adapter requires node.js >= 22 now
 - Fixed connection status indicator incorrectly showing connected when no devices are bound
 - Fixed fan speed cycling button skipping the maximum speed level
 - Fixed memory leak: UDP event listener not removed on request timeout
 - Fixed maintain-room-temperature (StHt) state never being polled from the device
 - Fixed potential null reference errors when reading adapter states
 - Closed UDP sockets on adapter shutdown

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Serhiy Krasovskyy xhunter74@gmail.com

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