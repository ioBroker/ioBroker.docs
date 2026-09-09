---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.renacidc/README.md
title: ioBroker.renacidc
hash: UmTDup8njryRrNTtGajy6nCjnb2JUrNzvljmdd/Fsgw=
---
![Логотип](../../../en/adapterref/iobroker.renacidc/admin/renacidc.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.renacidc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.renacidc.svg)
![Количество установок](https://iobroker.live/badges/renacidc-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/renacidc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.renacidc.png?downloads=true)
![Тестирование и выпуск](https://github.com/raschy/ioBroker.renacidc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.renacidc

## адаптер renacidc для ioBroker

Считывание данных с солнечного инвертора

## Руководство пользователя

Для ввода в эксплуатацию требуются только логин и пароль, используемые для доступа к онлайн-порталу Renacpower.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ

Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Использование этих товарных знаков не подразумевает какой-либо связи с ними или их дочерними компаниями, а также одобрения с их стороны! Поэтому не направляйте запросы в эту компанию. Этот личный проект ведется в свободное время и не преследует коммерческих целей. RENAC является товарным знаком, защищенным авторским правом © 2010-2022 Китайской штаб-квартирой Renacpower, адрес: Блок C-12-1, Комплексная таможенная зона, № 1 зоны 5, ул. Датун, 20, высокотехнологичный район Сучжоу, Сучжоу. Для получения дополнительной информации о линейке продукции посетите официальный сайт: <https://www.renacpower.com/>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-06-03)
- (copilot) Adapter requires node.js >= 22 now
* (raschy) Base-url changed
* (raschy) Special API signature extended

### 0.1.4 (2024-11-08)
* (raschy) Deploy reactivated in the workflow

### 0.1.3 (2024-11-08)
* (raschy) updated to adapter-core 3.2.2
* (raschy) responsive-design customized
* (raschy) Translations revised

### 0.1.2 (2024-08-30)
* (raschy) Inverter details addet

### 0.1.1 (2024-08-28)
* (raschy) Fixing repository checker issues
* (raschy) some refaktoring

[Older changelogs can be found there](https://github.com/raschy/ioBroker.renacidc/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023-2026 raschy <raschy@gmx.de>

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