---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.lametric?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.lametric/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.lametric?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.lametric.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/lametric-stable.svg
BADGE-Installed: http://iobroker.live/badges/lametric-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: uyz42x61PglmuTylkSlysAGtoxIRhGGsKoGJj5hiFjo=
---
![Логотип](../../../en/admin/lametric.png)

# IoBroker.lametric
## Оглавление
- [Приложения](apps.md)
- [Блокли](blockly.md)
- [Мои данные DIY](my-data-diy.md)
- [Уведомления](notifications.md)

## Требования
- nodejs 14.5 (или новее)
- js-контроллер 4.0.15 (или новее)
- Адаптер администратора 6.0.0 (или новее)
- _LaMetric Time_ с прошивкой _2.3.6_ (_3.0.16_ на модели 2022 г.) (или более поздней версии)

[Журнал изменений прошивки](https://firmware.lametric.com) [Журнал изменений прошивки Time2](https://firmware.lametric.com/?product=time2)

## Конфигурация
Вы можете получить ключ API вашего устройства [здесь](https://developer.lametric.com/user/devices).

![API-ключ](../../../en/adapterref/iobroker.lametric/img/api-key.png)

## Функции
- Установите яркость дисплея (в процентах, автоматический режим/ручной режим)
- Установить громкость звука (в процентах)
- Настройка заставки (включить/отключить, по времени, в темноте)
- Активировать/деактивировать Bluetooth и изменить имя Bluetooth
- Переключение между приложениями (следующее, предыдущее, переход к конкретному приложению)
- Отправка уведомлений блочно (с настраиваемым приоритетом, звуком, значками, текстом и т. д.)
- Управляйте специальными приложениями, такими как «часы», «радио», «секундомер» или «погода».
- Используйте приложение _My Data (DIY)_ LaMetric для отображения постоянной информации.

Возможности ограничены [официальные функции API](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Added push option for My Data DIY
* (klein0r) Added option to force app reload
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.6 (3.0.16)

### 2.4.2 (2023-09-08)

* (klein0r) Updated LaMetric firmware version recommendation to 2.3.6

### 2.4.1 (2023-06-10)

* (klein0r) Blockly bugfix

### 2.4.0 (2023-05-10)

* (klein0r) Allow to change device mode via state (manual, auto, kiosk, schedule)
* (klein0r) Added state for available firmware update
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.5

### 2.3.2 (2023-02-21)

* (klein0r) Optimized setState logic

### 2.3.1 (2023-02-21)

* (klein0r) Update My Data DIY when object changes data type

## License

The MIT License (MIT)

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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