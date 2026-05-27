---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: Ft6MNdsDi/S4yAN52SJfevQ7eH1DOariBM1/5zxBbBk=
---
# IoBroker.solectrus-influxdb

![Версия NPM](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)
![Количество установок](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/solectrus-influxdb-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![ИнфлюксД](https://img.shields.io/badge/InfluxDB-2.x-orange)
![Лицензия](https://img.shields.io/badge/License-MIT-lightgrey)

**Тесты:** ![Тестирование и выпуск](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

## 🌞 Адаптер SOLECTRUS InfluxDB для ioBroker
---

## Обзор
Адаптер SOLECTRUS InfluxDB сохраняет выбранные состояния ioBroker в базу данных InfluxDB 2.x и, при необходимости, вычисляет производные значения с помощью встроенного механизма формул.

Он предназначен для систем мониторинга энергопотребления, таких как фотоэлектрические установки, системы хранения энергии на основе аккумуляторов, тепловые насосы, настенные распределительные коробки, системы мониторинга импорта/экспорта электроэнергии из сети, а также для специализированных датчиков.

### Функции
- **Сопоставление датчиков** -- Сопоставление любого состояния ioBroker с измерением/полем InfluxDB с настраиваемым типом данных (int, float, bool, string)
- **Надежная буферизация** — Постоянный буфер записи (до 100 тыс. точек) сохраняется даже при сбоях InfluxDB и перезапусках адаптера.
- **Формулировочный механизм Data-SOLECTRUS** (опционально) -- Вычисление производных значений из нескольких входных данных с использованием формул, зеркального отображения источников или конечных автоматов на основе правил.
- **Режим конечного автомата** — Генерация строковых/логических состояний на основе условий правил (первый совпавший — победа), идеально подходит для меток состояния и режимов работы.
- **Конструктор формул** — Визуальный редактор с возможностью перетаскивания блоков, предварительным просмотром в реальном времени, всплывающими подсказками для операторов и примерами шаблонов.
- **Группировка папок** -- Организуйте вычисленные значения в папки для лучшего обзора.

### Быстрый старт
1. Установите адаптер через административный интерфейс ioBroker.
2. Настройте подключение к InfluxDB (URL, организация, сегмент, токен) на вкладке **InfluxDB**.
3. Сопоставьте состояния вашего ioBroker на вкладке **Датчики**.
4. (Необязательно) Установите флажок **Data-SOLECTRUS**, чтобы разблокировать механизм формул с вкладками **Значения данных** и **Время выполнения данных**.
5. Сохраните и запустите адаптер.

---

## Документация
[🇺🇸 Документация](./docs/en/README.md)

[🇩🇪 Документация](./docs/de/README.md)

---

### Требования
- ioBroker >= последняя стабильная версия
- Node.js >= 20
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.8.6 (2026-05-25)
* (copilot) Fixes for Repo Checker

### 1.8.5 (2026-05-23)
* (copilot) Add Icons in Notification

### 1.8.4 (2026-05-23)
* (patricknitsch) Fix missing unit in Formula-Engine

### 1.8.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 1.8.2 (2026-05-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Fix sensor duplicate: stale draft cache caused wrong sensor data to appear in the detail panel after duplicating or deleting a sensor
* (copilot) Update Dependencies

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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