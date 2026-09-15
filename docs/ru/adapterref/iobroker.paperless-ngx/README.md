---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.paperless-ngx/README.md
title: ioBroker.paperless-ngx
hash: xVGPbaWQnYogxZ9fGb7KYF8lxLOigORxys84f9cMmZo=
---
![Логотип](../../../en/adapterref/iobroker.paperless-ngx/admin/paperless-ngx.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.paperless-ngx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.paperless-ngx.svg)
![Количество установок](https://iobroker.live/badges/paperless-ngx-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/paperless-ngx-stable.svg)
![Тестирование и выпуск](https://github.com/BenAhrdt/ioBroker.paperless-ngx/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.paperless-ngx.png?downloads=true)

# ioBroker.paperless-ngx

- Официальный сайт Paperless-ngx: <https://docs.paperless-ngx.com/>

## адаптер paperless-ngx для ioBroker

API paperless-ngx позволяет получать информацию о запущенных экземплярах paperless-ngx. Например, вы можете прочитать теги, документы, типы документов, пользователей или корреспондентов экземпляра paperless.

Для входа в систему необходимо указать следующие данные:![альтернативный текст](../../../en/adapterref/iobroker.paperless-ngx/image.png)

Выберите цикл обновления и тип считывания данных: (без, базовый или подробный).![альтернативный текст](../../../en/adapterref/iobroker.paperless-ngx/image-1.png)

## ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ

Этот проект официально не связан с Paperless-ngx, то есть они не занимаются его поддержкой.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.2 (2026-08-05)
- (BenAhrdt) Prevent adapter startup failure when no Paperless server is configured

### 1.0.1 (2026-08-05)
- (copilot) Adapter requires node.js >= 22 now
- (BenAhrdt) Add HTTPS and reverse proxy URL support while keeping existing HTTP configurations compatible

### 1.0.0 (2026-04-03)
* (BenAhrdt) change axios to fetch

### 0.5.1 (2026-02-28)
* (BenAhrdt) update dependencies

### 0.5.0 (2025-10-19)
* (BenAhrdt) update Authentication NPM
* (BenAhrdt) update test to resolve conflicts
* (BenAhrdt) update testing 5.1.1
* (BenAhrdt) update dependencie core
* (BenAhrdt) update dependencie to node >= 20
* (BenAhrdt) update testing to 24.x

[Older changelogs can be found there](https://github.com/BenAhrdt/ioBroker.paperless-ngx/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>

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