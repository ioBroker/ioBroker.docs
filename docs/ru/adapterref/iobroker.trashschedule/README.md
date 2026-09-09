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
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/providers.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/providers.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: UIbVpNuaSXvaYfykPzTMUIQsYMoFD9j0QmB9jKB8Nho=
---
![Логотип](../../../en/admin/trashschedule.png)

# ioBroker.trashschedule

## Оглавление

- [Поставщики](/#/docs/adapterref/iobroker.trashschedule/providers.md)
- [Блокли](/#/docs/adapterref/iobroker.trashschedule/blockly.md)
- [JavaScript](/#/docs/adapterref/iobroker.trashschedule/javascript.md)
- [Часто задаваемые вопросы](https://github.com/klein0r/ioBroker.trashschedule/blob/master/docs/en/faq.md)

## Требования

1. Node.js 20.0 (или более поздняя версия)
2. js-controller 6.0.0 (или более поздняя версия)
3. Административный адаптер 6.0.0 (или более поздняя версия)
4. iCal Adapter 1.12.1 (или более поздняя версия) — _опционально_

## Конфигурация

1. Создать`trashschedule` Выберите экземпляр iCal в качестве источника. В качестве альтернативы можно выбрать поставщиков напрямую, которые интегрированы через различные онлайн-сервисы.
2. Перейдите на вкладку «Типы мусора» и добавьте столько типов, сколько у вас уже есть.
3. Задайте имя для каждого нового типа мусора и настройте соответствующие события.
4. Запустите экземпляр

**Есть вопросы?** Ознакомьтесь с разделом [часто задаваемых вопросов (FAQ).](https://github.com/klein0r/ioBroker.trashschedule/blob/master/docs/en/faq.md)

![График вывоза мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule.png)

![Типы графиков вывоза мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule_types.png)

## Предварительные условия для iCal

1. Создайте новый экземпляр [адаптера iCal.](https://github.com/iobroker-community-adapters/ioBroker.ical)
2. Настройте URL-адрес своего календаря (например, Google Календарь).
3. Установите параметр "Дни предварительного просмотра" в диапазоне, который включает каждый тип мусора как минимум дважды (например, 45 дней).
4. Если вы используете вкладку «События», убедитесь, что для каждого типа событий установлен флажок «Отображать», который также должен использоваться в вашем расписании удаления (в противном случае событие будет скрыто экземпляром iCal).

![iCal](../../../en/adapterref/iobroker.trashschedule/img/ical.png)

## Виджет VIS (версия VIS 1.x)

![Виджет VIS](../../../en/adapterref/iobroker.trashschedule/img/vis.png)

**Данный виджет не поддерживает VIS 2.x!**

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (copilot) Adapter requires node.js >= 22 now
* (@klein0r) admin 7.6.20 and js-controller 6.0.11 (or later) are required

### 5.3.0 (2026-04-22)

* (@Jailobeam) Fixed filtering of Lobbe.app address selections in the admin UI
* (@Jailobeam) Added Lobbe.app as a new data source
* (@Jailobeam) Added German labels for the Lobbe address selection

### 5.2.1 (2026-01-08)

* (@klein0r) Fixed responsive config layout on xl screens

### 5.2.0 (2025-12-22)

* (@klein0r) Responsive config layout

### 5.1.0 (2025-12-09)

* (@klein0r) Added Wolfenbüttel to providers

### 5.0.1 (2025-11-26)

* (@klein0r) Increased timeout of api calls

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

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