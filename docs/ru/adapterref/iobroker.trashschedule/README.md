---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.trashschedule?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.trashschedule?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.trashschedule?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.trashschedule?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.trashschedule/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.trashschedule.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-Installed: http://iobroker.live/badges/trashschedule-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/providers.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/providers.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: PLjcdV3srE3+L0bk0nuYWhUKbOBP4Lbx8V3/RkWROyI=
---
![Логотип](../../../en/admin/trashschedule.png)

# IoBroker.trashschedule
## Оглавление
- [Провайдеры](providers.md)
- [Блокли](blockly.md)
- [JavaScript](javascript.md)
- [FAQ](faq.md)

## Требования
1. nodejs 18.0 (или новее)
2. js-контроллер 5.0.0 (или новее)
3. Адаптер администратора 6.0.0 (или более поздней версии)
4. Адаптер iCal 1.12.1 (или более поздней версии) — *дополнительно*

## Конфигурация
1. Создайте экземпляр «trashschedule» и выберите его в качестве источника. Альтернативно, поставщики могут быть выбраны напрямую, которые интегрируются через различные онлайн-сервисы.
2. Перейдите на вкладку «Типы мусора» и добавьте столько типов, сколько у вас есть типов мусора.
3. Определите имя для каждого нового типа мусора и настройте соответствующие события.
4. Запустите экземпляр

**Вопросы?** Проверьте [Часто задаваемые вопросы](./faq.md).

![Расписание мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule.png)

![Типы расписаний мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule_types.png)

## Предварительные условия для iCal
1. Создайте новый экземпляр [ical адаптера] (https://github.com/iobroker-community-adapters/ioBroker.ical).
2. Настройте URL-адрес вашего календаря (например, календаря Google).
3. Установите для параметра «Дни предварительного просмотра» диапазон, включающий каждый тип мусора как минимум дважды (например, 45 дней).
4. Если вы используете вкладку «События», обязательно установите флажок «Отображать» для каждого типа событий, который также следует использовать в вашем расписании мусора (в противном случае событие будет скрыто реальным экземпляром).

![iCal](../../../en/adapterref/iobroker.trashschedule/img/ical.png)

## Виджет VIS (версия VIS 1.x)
![Виджет ВИС](../../../en/adapterref/iobroker.trashschedule/img/vis.png)

**VIS 2.x не поддерживается этим виджетом!**

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.3.0 (2024-04-28)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Improved error reporting / log messages
* (klein0r) Fixed translations
* (klein0r) Added Abfall+ as Webservice

### 3.2.0 (2024-01-22)

* (klein0r) Added more providers

### 3.1.3 (2023-12-24)

* (klein0r) fixed configuration validation
* (klein0r) enhanced error logging
* (klein0r) some cities have no streets (API)

### 3.1.2 (2023-12-22)

* (klein0r) Fixed exception when cache dir doesn't exist

### 3.1.1 (2023-12-22)

* (klein0r) Fixed config validation / integration test

## License

MIT License

Copyright (c) 2024 Matthias Kleine <info@haus-automatisierung.com>

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
