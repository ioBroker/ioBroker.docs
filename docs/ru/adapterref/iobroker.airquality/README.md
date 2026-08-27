---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.airquality/README.md
title: ioBroker.airquality
hash: VESbSZ3qZ3zRFZAZWez5WMXmfqrmNJI2S98y6dEosT8=
---
![Логотип](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.airquality.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![Количество установок](https://iobroker.live/badges/airquality-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/airquality-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.airquality
**Тесты:** ![Тестирование и выпуск](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## Адаптер качества воздуха для ioBroker
Получение данных от немецкого банка UBA.

### Начиная
В этом адаптере в конфигурации необходимо указать как минимум одну экологическую станцию, с которой будут собираться измеренные значения. Названия станций можно выбрать на веб-сайте Федерального агентства по охране окружающей среды по адресу https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten (затем нажмите «Ближайшая станция»), используя отображаемую карту.
Названия станций всегда начинаются с «DE», за которым следует федеральная земля «BW» и трехзначный порядковый номер. Этот идентификатор, например, «DEBW052», необходимо ввести на странице конфигурации адаптера (подтвердите нажатием Enter). Здесь также можно добавить дополнительные станции.

В настоящее время API данных о качестве воздуха доступен в версии 4 (v4). Предыдущая версия (v3) будет продолжать параллельно использоваться в настоящее время. Основное различие между версиями заключается в переходе к использованию, как правило, почасовых данных для индекса качества воздуха (AQI) и новой классификации категорий индекса.

Если координаты указаны в основной конфигурации ioBroker, адаптер при первом запуске пытается самостоятельно найти ближайшую станцию.

## Намекать
Иногда случается, что измеренные значения не удается получить. Чаще всего это происходит в начале часа, поскольку данные, предположительно, сжимаются и обрабатываются внутри устройства. Но даже ночью (около полуночи) получить данные зачастую невозможно. В этом случае в журнал записывается предупреждение «Данные не получены». Это не дефект адаптера, а проблема, связанная с системой.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Пожалуйста, убедитесь, что вы учитываете авторские права и товарные знаки при использовании названий или логотипов компаний, и добавьте отказ от ответственности в файл README.
Вы можете посмотреть примеры в других адаптерах или задать вопрос в сообществе разработчиков. Использование названия или логотипа компании без разрешения может повлечь за собой юридические проблемы.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (raschy) change to version 4
- (raschy) some dependency updates

### 0.1.7 (2025-08-22)

- (raschy) Station names visible again

### 0.1.6 (2025-08-22)

- (raschy) Removal of an unused state
- (raschy) improved error messages
- (raschy) improved retrieval logic

### 0.1.5 (2025-05-03)

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 raschy <raschy@gmx.de>

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