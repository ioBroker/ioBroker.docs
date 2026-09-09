---
chapters: {"pages":{"en/adapterref/iobroker.tagesschau/README.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README.md"},"en/adapterref/iobroker.tagesschau/README-GER.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README-GER.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tagesschau/README.md
title: ioBroker.tagesschau
hash: antdA9C2zyfFAJ+2wR2zuGpUpmiyL6zBWKLUfQA9qkE=
---
![Логотип](../../../en/adapterref/iobroker.tagesschau/admin/tagesschau.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tagesschau.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)
![Количество установок](https://iobroker.live/badges/tagesschau-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tagesschau-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tagesschau

## адаптер tagesschau для ioBroker

[Deutsche Anleitung (актюллер)](/#/docs/adapterref/iobroker.tagesschau/README-GER.md)

Получает ссылки на новости и видео с сайта Tagesschau.

Контент доступен только на немецком языке.

Установка - задайте необходимые параметры в административной панели - готово.

**Согласно API Tagesschau, 60 запросов в час — это нормально. Каждая тема и каждое видео — это один запрос. 30 минут на обновление всегда вписываются в график. Непонятно, как именно они это рассчитывают.**

Пожалуйста, обрати внимание:

1. Если не выбраны параметры «Включить сообщения» или «Включить видеосообщения», работа адаптера приостанавливается.
2. Если выбран параметр «Активировать сообщения», адаптер будет работать только в том случае, если в конфигурации выбраны 1 тема и 1 федеральный штат.
3. Ключевые слова извлекаются из сообщений и становятся доступны только после первого запуска. Со временем их будет становиться всё больше! Это относится только к сообщениям.

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Использование этих товарных знаков не подразумевает какой-либо связи с ними или их дочерними компаниями, а также одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.** **Tagesschau является товарным знаком ARD-aktuell.** <https://www.tagesschau.de/impressum>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.6.0 (2025-09-18)
- (ticaki) Breaking News are now also retrieved from the Tagesschau homepage API and polled every 5 minutes

### 0.5.0 (2025-01-27)
* (ticaki) States added for browsing.
* (ticaki) Another attempt to constantly sort the videos in the same way.
* (ticaki) Control states reorganised.
* (ticaki) Placeholder images for no news now work

### 0.4.3 (2025-01-25)
* (ticaki) remove some helper code to do translations

### 0.4.2 (2025-01-25)
* (ticaki) make the code fit for latest

### 0.4.1 (2025-01-17)
* (ticaki) videos always in the same order.

### 0.4.0 (2025-01-07)
* (ticaki) Command data point for defining the first news to be displayed
* (ticaki) Reduce object updates
* (ticaki) Total number of news as a data point
* (ticaki) We not in hurry, write object updates slowly.
* (ticaki) Info log messages are a bit more fun. (error and warn messages are not funny at all)

### 0.3.2 (2025-01-05)
* (ticaki) added length to videos
* (ticaki) System load reduced at startup

### 0.3.1 (2025-01-05)
* (ticaki) Back to stable admin

### 0.3.0 (2025-01-05)
* (ticaki) States are only updated when changes are made.
* (ticaki) Last update Data point added with timestamp of the last successful data access
* (ticaki) Emptying of data points improved
* (ticaki) Placeholder images inserted for no news.
* (ticaki) User-defined keywords with `*`
* (ticaki) Requires admin version 7.4.9 or higher

### 0.2.3 (2025-01-05)
* (ticaki) Fixed: Adapter deletes own states

### 0.2.1 (2025-01-05)
* (ticaki) fixed refresh interval & add axios timeouts

### 0.2.0 (2025-01-05)
* (ticaki) remove tracking from videos
* (ticaki) beautiful state name

### 0.1.4 (2025-01-04)
* (ticaki) Fixed: More as 1 region bug

### 0.1.3 (2025-01-04)
* (ticaki) Reduced size of the icon

### 0.1.2 (2025-01-04)
* (ticaki) Added: Breaking news is excluded from filtering and copied to a separate folder. 
* (ticaki) Changed: Taglist is now sorted.

### 0.1.1 (2025-01-04)
* (ticaki) fixed: The empty configuration after the first installation leaves crashed adapters

### 0.1.0 (2025-01-04)
* (ticaki) initial release

[Older changelogs can be found there](https://github.com/ticaki/ioBroker.tagesschau/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 ticaki <github@renopoint.de>

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