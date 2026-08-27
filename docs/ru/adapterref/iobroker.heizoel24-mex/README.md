---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: CzYN8HTeTVyfkIUXiwxe5VPHqfyFg25XnDuFVq5bpiE=
---
![Логотип](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![Количество установок](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**Тесты:** ![Тестирование и выпуск](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Адаптер heizoel24-mex для ioBroker
MEX — это устройство для измерения уровня мазута. Этот адаптер считывает данные MEX с сервера Heizoel24.

См.: https://www.heizoel24.de/mex

## Использовать:
Просто введите данные для входа в свою учетную запись Heizoel24 (адрес электронной почты и пароль).<br> Данные MEX хранятся в точке данных heizoel24-mex.<br> По умолчанию адаптер запускается каждые 3 часа. Этого вполне достаточно, поскольку MEX отправляет данные только один раз в день.<br> Данные CalculatedRemaining/JsonForEcharts (рассчитанное оставшееся количество) и OilUsage/JsonForEcharts можно использовать напрямую с eCharts.<br> Адаптер может передавать данные через протокол MQTT.<br> Оригинальное приложение всегда рассчитывает годовое использование по состоянию на 31 декабря.<br> Это нецелесообразно, поскольку это происходит в разгар отопительного сезона.<br> Этот адаптер может рассчитывать годовое потребление на основе данных за конкретный месяц.<br>

## Changelog
### 1.10.1 (2026-06-12)

- allowScripts esbuild and protobufjs

### 1.10.0 (2026-05-29)

- More translations added

### 1.9.3 (2026-05-29)

- Translation issues resolved

### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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