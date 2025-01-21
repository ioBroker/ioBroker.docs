---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.airquality/README.md
title: ioBroker.качество воздуха
hash: jikrEMuqCpJ/5qloEaSpyaN0sv//2SOzIVI//ESvCo0=
---
![Логотип](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.airquality.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![Количество установок](https://iobroker.live/badges/airquality-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/airquality-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.качество воздуха
**Тесты:** ![Тест и выпуск](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## Адаптер качества воздуха для ioBroker
Получить данные из немецкого UBA

### Начиная
В этом адаптере в конфигурации необходимо ввести как минимум одну станцию наблюдения за окружающей средой, с которой будут собираться измеренные значения. Названия станций можно выбрать на веб-сайте Федерального агентства по охране окружающей среды по адресу https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten (затем нажмите «Ближайшая станция»), используя отображаемую карту.
Станции всегда начинаются с «DE», за которыми следует федеральная земля «BW» и трехзначный серийный номер. Этот идентификатор, например «DEBW052», затем необходимо ввести на странице конфигурации адаптера (подтвердите, нажав Enter). Здесь также можно добавить дополнительные станции.

Если координаты сохраняются в основной конфигурации ioBroker, адаптер пытается самостоятельно найти ближайшую станцию при первом запуске.

## Намекать
Иногда случается, что измеренные значения не могут быть получены. Это часто происходит в начале часа, поскольку данные, предположительно, сжимаются и обрабатываются внутри. Но даже ночью (около полуночи) часто невозможно получить данные. Затем в качестве предупреждения записывается запись в журнале «Данные не получены». Это не дефект адаптера, а системный дефект.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Пожалуйста, убедитесь, что вы учитываете авторские права и товарные знаки, когда используете названия или логотипы компании, и добавьте отказ от ответственности в свой README.
Вы можете проверить другие адаптеры для примеров или спросить в сообществе разработчиков. Использование названия или логотипа компании без разрешения может вызвать у вас юридические проблемы.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (raschy) Supplementary data points i18n
- (raschy) Data point type corrected 
- (raschy) @iobroker/adapter-core 3.2.3 is recommended 

### 0.1.4 (2024-12-16)

- (raschy) Instructions for use in GUI added

### 0.1.3 (2024-12-12)

- (raschy) inclusive deploy

### 0.1.2 (2024-12-12)

- (raschy) Ready for latest and tests

### 0.1.1 (2024-12-11)

- (raschy) Migration to ESLint 9 and @iobroker/eslint-config

### 0.1.0 (2024-12-03)

- (raschy) CO data retrieval added
- (raschy) Conversion as scheduled adapter

### 0.0.4 (2024-10-31)

- (raschy) Readme text expanded
- (raschy) Issue 1 [E254] and [W040] corrected

### 0.0.3 (2024-10-28)

- (raschy) Auto detection for location activated

### 0.0.2 (2024-10-28)

- (raschy) initial release

## License

MIT License

Copyright (c) 2024-2025 raschy <raschy@gmx.de>

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
SOFTWARE.# ioBroker.airquality