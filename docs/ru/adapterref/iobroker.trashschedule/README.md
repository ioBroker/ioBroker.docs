---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.trashschedule.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule.svg
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-installed: http://iobroker.live/badges/trashschedule-installed.svg
BADGE-Dependency Status: https://img.shields.io/david/klein0r/iobroker.trashschedule.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.trashschedule.png?downloads=true
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: CnAFhJIui1zlqyEIhTDf57q/5DZ+2ylYFtN81KaKW+A=
---
![Логотип](../../../en/adapterref/iobroker.trashschedule/../../admin/trashschedule.png)

# IoBroker.trashschedule
## Предварительные условия
1. Создайте новый экземпляр **ical адаптера**.
2. Настройте URL-адрес вашего календаря (например, календарь Google)
3. Установите «Дни предварительного просмотра» на диапазон, который включает каждый тип корзины как минимум дважды (например, 45 дней).
4. Если вы используете вкладку «события», обязательно установите флажок «отображать» для каждого типа события, которое также должно использоваться в вашем расписании корзины (в противном случае событие будет скрыто экземпляром ical)

![классический](../../../en/adapterref/iobroker.trashschedule/./img/ical.png)

## Конфигурация
1. Создайте экземпляр ```trashschedule``` и выберите ical экземпляр в качестве источника.
2. Перейдите на вкладку «Типы мусора» и добавьте столько типов, сколько у вас есть типов мусора.
3. Определите имя для каждого нового типа корзины и настройте соответствующие события.
4. Запустите экземпляр

**Вопросы?** Проверьте [Вопросы-Ответы](./faq.md)

![расписание мусора](../../../en/adapterref/iobroker.trashschedule/./img/trashschedule.png)

![мусорное расписание_типы](../../../en/adapterref/iobroker.trashschedule/./img/trashschedule_types.png)

## Виджет VIS
![Виджет VIS](../../../en/adapterref/iobroker.trashschedule/./img/vis.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.4 (2022-03-14)

* (klein0r) Updated dependencies

### 1.4.3 (2022-02-21)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 1.4.2 (2022-02-07)

* (klein0r) Added check for ical configuration

### 1.4.1 (2021-12-23)

* (klein0r) Updated dependencies

### 1.4.0 (2021-12-10)

* (klein0r) Allow to hide "not found" warnings for single trash types (like christmas tree pickup)
* (klein0r) Added limit option for VIS widget
* (klein0r) Added option for VIS widget to hide the name

## License

MIT License

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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