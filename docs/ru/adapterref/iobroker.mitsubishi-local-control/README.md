---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mitsubishi-local-control/README.md
title: ioBroker.mitsubishi-local-control
hash: 1qJ6gtA+lRsSdjDDmnBQ2zHVIxtheukE5AKkYM1VSJo=
---
![Логотип](../../../en/adapterref/iobroker.mitsubishi-local-control/admin/mitsubishi-local-control.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mitsubishi-local-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mitsubishi-local-control.svg)
![Количество установок](https://iobroker.live/badges/mitsubishi-local-control-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mitsubishi-local-control-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mitsubishi-local-control.png?downloads=true)
![Известные уязвимости](https://snyk.io/test/github/Black-Thunder/ioBroker.mitsubishi-local-control/badge.svg)

# IoBroker.mitsubishi-local-control
## Адаптер mitsubishi-local-control для ioBroker
Адаптер **mitsubishi-local-control** позволяет интегрировать системы кондиционирования воздуха Mitsubishi Electric в **ioBroker** с помощью **прямого локального соединения**.

## Функции
- Прямое локальное управление через интерфейс Wi-Fi Mitsubishi.
- Без облачных сервисов, без внешних зависимостей
- Чтение и запись состояний устройства
- Периодический опрос состояния устройства
- Поддержка нескольких устройств
- Автоматическая синхронизация состояния устройства

## Документация:
- [Описание на английском языке](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/en/mitsubishi-local-control.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/de/mitsubishi-local-control.md)

## Обсуждение:
- [Форум ioBroker](https://forum.iobroker.net/topic/83267)

## Благодарности
Особая благодарность и признание [ниобос](https://github.com/pymitsubishi/pymitsubishi) за обратное проектирование API!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.0.5 (2026-01-13)

- (Black-Thunder) Creation of adapter objects was fixed

### 1.0.4 (2026-01-11)

- (Black-Thunder) Dependencies were updated

### 1.0.3 (2025-12-29)

- (Black-Thunder) Cleaned up some code

### 1.0.2 (2025-12-25)

- (Black-Thunder) Implemented command coalescing and mapped AUTO mode correctly

### 1.0.1 (2025-12-21)

- (Black-Thunder) Refactored energy and power state properties

### 1.0.0 (2025-12-18)

- (Black-Thunder) initial release

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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