---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: m9tlHglZw1zXdc24DjansbtlpKjHplLaw4XBW6nga4o=
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
### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

### 1.9.0 (2026-05-03)
- (copilot) Adapter requires node.js >= 22 now

### 1.8.1 (2026-04-06)

- "Reference month for annual consumption (1–12)" edited

### 1.8.0 (2026-04-05)

- Yearly Oil usage by reference month added