---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: JHPwGaT91ji+0fxuhPS25CONJln74BWFSiV0DKVrAIU=
---
# IoBroker.solectrus-influxdb

![Версия NPM](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)
![Количество установок](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/solectrus-influxdb-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
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
- **Внутренние датчики** -- Отображают и отслеживают состояния без записи их в InfluxDB.
- **Надежная буферизация** — Постоянный буфер записи (до 100 тыс. точек) сохраняется даже при сбоях InfluxDB и перезапусках адаптера.
- **Формулировочный механизм Data-SOLECTRUS** (опционально) -- Вычисление производных значений из нескольких входных данных с использованием формул, зеркального отображения источников или конечных автоматов на основе правил.
- **Режим конечного автомата** — Генерация строковых/логических состояний на основе условий правил (первый совпавший — победа), идеально подходит для меток состояния и режимов работы.
- **Конструктор формул** — Визуальный редактор с возможностью перетаскивания блоков, предварительным просмотром в реальном времени, всплывающими подсказками для операторов и примерами шаблонов.
- **Группировка папок** -- Организуйте показания датчиков и вычисленные значения в папки для лучшего обзора.
- **Встроенное резервное копирование** — Создавайте, загружайте, восстанавливайте, скачивайте и удаляйте локальные резервные копии конфигурации экземпляра, датчиков и элементов Data-SOLECTRUS прямо на вкладке **Резервное копирование**, без необходимости использования дополнительных адаптеров.

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
- **ioBroker.admin >= 8.0.0** - **требуется начиная с версии 2.0.0**, пользовательский интерфейс администратора больше не работает в Admin 6/7 (см. список изменений)
- Node.js >= 22
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-08-03)
* (patricknitsch) **BREAKING CHANGE:** Requires ioBroker.admin 8 (currently Alpha) or newer. Admin 8 introduced a new "GUI API generation" for custom jsonConfig components (React 19 / MUI 9, `@iobroker/gui-components`) with no backward compatibility, so the Sensors, Data Values and Backup tabs no longer load on Admin 6/7. Do **not** update to this version unless ioBroker.admin has already been updated to version 8.
* (patricknitsch) Rebuild the admin UI (sensors editor, Data-SOLECTRUS items editor, backup panel) as a proper Vite + Module Federation build (`src-admin/`) targeting `@iobroker/gui-components`, replacing the hand-written vanilla-JS Module Federation containers
* (patricknitsch) Log a clear error and set `info.lastError` at startup if the installed ioBroker.admin is below version 8, so an incompatible setup is immediately visible instead of a silent/confusing failure in the config dialog
* (patricknitsch) Cleanup i18n
* (copilot) Fix timeout for Backup Manager

### 1.12.0 (2026-07-08)
* (patricknitsch) Final Release

### 1.12.0-beta.1 (2026-07-08)
* (patricknitsch) Fix `npm run check` (tsc type-checking of the JSDoc-typed JS codebase) so it passes cleanly again
* (patricknitsch) Improve JSDoc type coverage across `dsProxy.js`, `jsonpath.js`, `stateMachine.js` and `helpers.js`
* (patricknitsch) Resolve all remaining ESLint JSDoc warnings (`npm run lint` is now warning-free)

### 1.12.0-beta.0 (2026-07-05)
* (patricknitsch) Update Dependencies
* (patricknitsch) Add built-in **Backup** tab: create/upload/restore/download/delete local backups of the instance config, sensors and Data-SOLECTRUS items, with a configurable storage location (InfluxDB token is excluded and must be re-entered after a restore)
* (patricknitsch) Add **Enable iFrame dashboard** checkbox: gates both the iFrame config tab and the Dashboard tab in the sensor overview (tab.html); reuse **Enable notifications** as the single switch that both activates notifications and reveals the Notifications tab

### 1.11.0 (2026-06-23)
* (copilot) Remove legacy Forecast Lib
* (copilot) Migrate old config to new(now no Datapoints will be generated)
* (copilot) Fix some small possible issues
* (copilot) Update Docs

**Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

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