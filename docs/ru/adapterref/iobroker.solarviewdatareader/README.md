---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: HI5W07PzblI4ItyKbiWr53/3B4gRI7ZUqZMw4IrJcnc=
---
![Логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Количество установок (последние)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Тестирование и выпуск](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

# ioBroker.solarviewdatareader

## Адаптер solarviewdatareader для ioBroker

Адаптер считывает данные с регистратора данных Solarview. Дополнительную информацию о Solarview можно найти здесь: <https://www.solarview.info/solarlogger.aspx>

## Конфигурация

### IP-адрес, порт

Для получения данных с регистратора данных необходимо ввести IP-адрес и порт вашего TCP-сервера SolarView. Стандартный порт — 15000. См. документацию SolarView по адресу <https://www.solarview.info/solarlogger.aspx> .

### преобразователь D0

Если к регистратору данных Solarview подключен преобразователь D0, вы можете включить эту опцию. По всем вопросам обращайтесь к документации Solarview.

### Сумма показаний счетчика собственного потребления и от 1 до 4

Если у вас установлен счетчик S0, вы можете включить эту опцию. Вы можете подключить до 4 счетчиков собственного потребления, и сумма показаний всех счетчиков будет суммироваться. По всем вопросам обращайтесь к документации Solarview.

### Инвертор 1–4

Каждый инвертор можно включить отдельно. По всем вопросам обращайтесь к документации Solarview.

### Интервал, начало интервала, конец интервала

Здесь вы можете настроить временной диапазон и интервал. Временной диапазон для 24 часов — с 00:00 до 23:59, а не с 00:00 до 00:00.

### Установить системную переменную CCU, Системная переменная

Это особая функция для Homematic CCU. В CCU можно определить системную переменную. В этой системной переменной сохраняется фактическое значение PAC. Необходимо указать состояние ioBroker для этой системной переменной -> **например, "hm-rega.0.12345"**

### Созданные состояния

#### pvig, pvi1..4, d0supply, d0consumption

суточная = суточная выработка (кВт·ч) месячная = месячная выработка (кВт·ч) годовая = годовая выработка (кВт·ч) общая = общая выработка (кВт·ч) ток = мощность генератора в Вт UDC, UDCB, UDCC, UDCD = напряжение генератора в вольтах на MPP-Tracker IDC, IDCB, IDCC, IDCD = ток генератора в амперах на MPP-Tracker UL1, IL1 = напряжение сети, фаза 1 сети UL2, IL2 = напряжение сети, фаза 2 сети UL3, IL3 = напряжение сети, фаза 3 сети TKK = температурный инвертор

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) dependencies updated
* (afuerhoff) issues detected by repository checker fixed [#289]

### 1.2.5 (2026-05-16)
* (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#246](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/246)
* (afuerhoff) license information updated

### 1.2.4 (2025-10-24)
* (afuerhoff) dependencies updated
* (afuerhoff) npm security changes
* (afuerhoff) repository checker warnings fixed

### 1.2.3 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker issues fixed
* (afuerhoff) typescript error fixed

### 1.2.2 (2025-05-30)
* (afuerhoff) dependencies updated
* (afuerhoff) testing updated [#217](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/217)
* (afuerhoff) @iobroker-bot warning fixed [#209](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/209)

### 1.2.1 (2025-02-26)
* (afuerhoff) dependencies updated

[Older changelogs can be found there](https://github.com/afuerhoff/ioBroker.solarviewdatareader/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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