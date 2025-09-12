---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.lametric/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.lametric.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/lametric-stable.svg
BADGE-Installed: http://iobroker.live/badges/lametric-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: VRXQzZdgLRuQuhOEZ3wVEjTv+AhxQe8wVAcFarW07VE=
---
![Логотип](../../../en/admin/lametric.png)

# IoBroker.lametric
## Оглавление
- [Приложения](apps.md)
- [Блочный](blockly.md)
- [Мои данные DIY](my-data-diy.md)
- [Уведомления](notifications.md)

## Требования
- nodejs 20 (или более поздняя версия)
- js-controller 6.0.0 (или более поздняя версия)
- Административный адаптер 7.4.10 (или более поздний)
- _LaMetric Time_ с прошивкой _3.2.4_ (или более поздней)
- прошивка _2.3.9_ (или более поздняя) на старых моделях (выпущенных до 2022 года)

[Журнал изменений прошивки](https://firmware.lametric.com) [Журнал изменений прошивки Time2](https://firmware.lametric.com/?product=time2)

## Конфигурация
1. Добавьте LaMetric Time в свою локальную сеть.
- Приложение LaMetric Time (2017–2021) - [iOS](https://apps.apple.com/de/app/lametric-time/id987445829), [Google Play Store](https://play.google.com/store/apps/details?id=com.smartatoms.lametric)
- Приложение LaMetric (с 2022 г.) - [iOS](https://apps.apple.com/de/app/lametric/id1502981694), [Google Play Store](https://play.google.com/store/apps/details?id=com.lametric.platform)
2. Скопируйте API-ключ устройства из приложения (только для моделей 2022 года и новее). Для более старых моделей используйте следующий сайт:

Вы можете получить API-ключ вашего устройства [здесь](https://developer.lametric.com/user/devices).

![API-ключ](../../../en/adapterref/iobroker.lametric/img/api-key.png)

## Функции
- Установка яркости дисплея (процент, автоматический режим/ручной режим)
- Установить громкость звука (в процентах)
- Настроить заставку (включить/выключить, по времени, в темноте)
- Активировать/деактивировать Bluetooth и изменить имя Bluetooth
- Переключение между приложениями (следующее, предыдущее, переход к определенному приложению)
- Отправлять уведомления блочно (с настраиваемым приоритетом, звуком, значками, текстом, ...)
- Управление специальными приложениями, такими как «часы», «радио», «секундомер» или «погода»
- Используйте приложение LaMetric _My Data (DIY)_ для отображения постоянной информации

Возможности ограничены [официальные функции API](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 4.2.0 (2025-08-15)

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.2.4)

### 4.1.0 (2025-07-09)

* (@klein0r) Allow icons with placeholders in config (improved validation)
* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.2.3)

### 4.0.0 (2025-04-08)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.1.4)

### 3.4.1 (2024-10-29)

* (@klein0r) Limit frame duration to 10 seconds (limited by LaMetric)

### 3.4.0 (2024-09-06)

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.1.2)
* (@klein0r) Added support for notification manager
* (@klein0r) Added validator for icon inputs
* (@klein0r) Fixed some missing translations

## License

The MIT License (MIT)

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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