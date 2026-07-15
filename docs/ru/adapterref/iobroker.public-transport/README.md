---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.public-transport/README.md
title: ioBroker.public-transport
hash: EPGpmjmHPR4TbPgKXKpoUiIBVov/b3Vyu5afcVO463w=
---
![Логотип](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![Количество установок](https://iobroker.live/badges/public-transport-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/public-transport-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.public-transport
**Тесты:** ![Тестирование и выпуск](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## Адаптер для общественного транспорта для ioBroker
Адаптер для общественного транспорта обеспечивает бесшовную интеграцию информации о расписании общественного транспорта в режиме реального времени в вашу систему умного дома ioBroker. С помощью этого адаптера вы можете получать время отправления с остановок различных транспортных операторов в Германии, Австрии и других странах и использовать его для автоматизации.

[🇬🇧 Документация на английском языке](https://github.com/tt-tom17/ioBroker.public-transport/wiki/en-Home) [🇩🇪 Немецкая документация](https://github.com/tt-tom17/ioBroker.public-transport/wiki)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-05-25)
* (tt-tom17) add Motis service support
* (tt-tom17) add nsPanelTimetable class for 'NSPanel-Lovelace-UI Next Level' integration
* (tt-tom17) connections widget: fix walking detail info display
* (tt-tom17) connections widget: add link styling for modal remarks

### 0.5.0 (2026-05-17)
* (tt-tom17) added productName to states
* (tt-tom17) connections widget: show remarks icons (warning/hint/status) per leg in journey detail popup
* (tt-tom17) connections widget: show remarks icons in main table (new Info column)
* (tt-tom17) connections widget: highlight delayed journeys/legs with red left border

### 0.4.0 (2026-05-06)
* (tt-tom17) fix select Products
* (tt-tom17) add Profil VBN (Bremen/Niedersachsen)

### 0.3.0 (2026-05-02)
* (tt-tom17) fix issues for latest Repo
* (tt-tom17) fix deaktivieren von Verbindungen
* (tt-tom17) Adapter requires node.js >= 22 now

### 0.2.2 (2026-04-25)
* (tt-tom17) fix countEntries for journeys

### 0.2.1 (2026-04-24)
* (tt-tom17) fix Vendo forbidden -> change dbnav to db

### 0.2.0 (2026-04-21)  
* (tt-tom17) Widget departures: add popup for hints and warnings

### 0.1.1 (2026-04-19)   
* (tt-tom17) fix App.tsx
* (tt-tom17) Fix [Bug]: Abfahrten-JSON bleibt leer oder alle gleich [#28](https://github.com/tt-tom17/ioBroker.public-transport/issues/28)

### 0.1.0 (2026-04-01)  
* (tt-tom17) begin beta-test

### 0.0.6 (2026-03-12)
* (tt-tom17) Widget for Journey
* (tt-tom17) Refactor admin UI: convert class components to functional components
* (tt-tom17) Add confirmation dialog for station and journey deletion
* (tt-tom17) Auto-save and delete ioBroker object tree on station/journey removal
* (tt-tom17) Upgrade admin dependencies

### 0.0.5 (2026-03-03)  
* (tt-tom17) Upgrade dependency

### 0.0.4 (2026-02-16)
* (tt-tom17)   optimization react pages

### 0.0.1-preAlpha.0 (2025-12-01)
* (tt-tom17) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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