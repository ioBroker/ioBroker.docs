---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: oed1wpV8HlHSa4npvyOtPHQdOpAzYTYEUpNrhSZn27E=
---
![Логотип milight-smart-light](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![стабильный](http://iobroker.live/badges/milight-smart-light-stable.svg)
![установлены](http://iobroker.live/badges/milight-smart-light-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
![Тестирование и выпуск](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

Этот адаптер для ioBroker управляет светодиодными лампами и светодиодными лентами Milight и основан на модуле узла от mwittig.

mwittig / [node-milight-обещание](https://github.com/mwittig/node-milight-promise)

С адаптером вы можете использовать как **v6 Bridge** так и **Legacy Bridge**

** Мост v6: **

- мост (только iBox1)
- белый
- RGB (ш)
- полноцветный
- fullColor8Zone

** Устаревший мост: **

- белый
- RGB (ш)

**Описание**

Подробное описание можно найти в [здесь](https://steiger04.github.io/milight-smart-light-doku/).

### Версии
- **Node.js** используйте версию 14.x или выше.
- **iobroker.admin** используйте версию 5.1.25 или выше.

## Changelog
### 1.2.2 (2021-10-17)
- (steiger04) Compatibility check and testing for Node.js 16 and some CSS adjustments
### 1.2.1 (2021-05-18)
- (steiger04) Compatibility with socketio v3.1.4 
### 1.2.0 (2021-01-16)
- (steiger04) compact mode added
### 1.0.5 (2021-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2
### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License
The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>