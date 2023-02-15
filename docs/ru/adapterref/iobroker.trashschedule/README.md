---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.trashschedule?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.trashschedule?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.trashschedule?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.trashschedule?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.trashschedule?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/klein0r/iobroker.trashschedule/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.trashschedule?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.trashschedule.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-Installed: http://iobroker.live/badges/trashschedule-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: CzorBxuUc2X2rEutua8Hxltu7xpNJbOxGfPJCVh/PXE=
---
![Логотип](../../../en/admin/trashschedule.png)

# IoBroker.trashschedule
## Оглавление
- [Блокли](blockly.md)
- [JavaScript](javascript.md)
- [FAQ](faq.md)

## Требования
1. nodejs 14.5 (или новее)
2. js-контроллер 4.0.15 (или новее)
3. Адаптер iCal 1.12.1 (или новее)
4. Адаптер администратора 6.0.0 (или новее)

## Предварительные условия
1. Создайте новый экземпляр [ical adapter](https://github.com/iobroker-community-adapters/ioBroker.ical)
2. Настройте URL-адрес вашего календаря (например, календарь Google)
3. Установите «Дни предварительного просмотра» на диапазон, который включает каждый тип корзины как минимум дважды (например, 45 дней).
4. Если вы используете вкладку «события», обязательно установите флажок «отображать» для каждого типа события, которое также должно использоваться в вашем расписании корзины (в противном случае событие будет скрыто экземпляром ical)

![iCal](../../../en/adapterref/iobroker.trashschedule/img/ical.png)

## Конфигурация
1. Создайте экземпляр ```trashschedule``` и выберите ical экземпляр в качестве источника.
2. Перейдите на вкладку «Типы мусора» и добавьте столько типов, сколько у вас есть типов мусора.
3. Определите имя для каждого нового типа корзины и настройте соответствующие события.
4. Запустите экземпляр

**Вопросы?** Проверьте [Часто задаваемые вопросы](./faq.md)

![Расписание корзины](../../../en/adapterref/iobroker.trashschedule/img/trashschedule.png)

![Типы расписания корзины](../../../en/adapterref/iobroker.trashschedule/img/trashschedule_types.png)

## Виджет VIS (версия VIS 1.x)
![Виджет VIS](../../../en/adapterref/iobroker.trashschedule/img/vis.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.2.0 (2023-01-16)

* (klein0r) Added completed flag for types

### 2.1.1 (2023-01-11)

* (klein0r) Added Ukrainian language

### 2.1.0 (2022-12-12)

* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.0.3 (2022-06-02)

* (klein0r) Allow whitespaces in the match pattern

### 2.0.2 (2022-05-27)

* (klein0r) Fixed error handling for trash types with empty name

## License

MIT License

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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