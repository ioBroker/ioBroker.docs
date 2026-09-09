---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: a2S7fsrVfySxdMD2KdJdhpF2dSqnOs4c9OFGM4NaDk4=
---
![Логотип](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![Количество установок (последние)](http://iobroker.live/badges/tinker-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/tinker-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.tinker

---

Адаптер Tinker Board Monitor — это модифицированная версия адаптера Raspberry PI Monitor и адаптера OrangePi Monitor для ioBroker.

## Поддержка разработки адаптеров

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Важная информация

Протестированное оборудование: материнская плата Asus Tinker Board

## После выбора становятся доступны следующие объекты:

### Процессор

- частота процессора
- загрузка1
- загрузка5
- загрузка15

### Память

- доступная память
- свободная память
- memory\_total

### Сеть (eth0)

- net\_received
- net\_send

### SD-карта

- sdcard\_root\_total
- sdcard\_root\_used

### Менять

- swap\_total
- swap\_used

### Температура

- soc\_temp

### Время безотказной работы

- время безотказной работы

### Беспроводная сеть

- wifi\_received
- wifi\_send

---

## Конфигурация

На странице настроек вы можете выбрать следующие модули:

- Процессор
- Память
- Сеть
- SD-карта
- Менять
- Температура
- Время безотказной работы
- Беспроводная сеть

---

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.4.0 (2026-08-20)
* (simatec) Dependencies updated
* (copilot) Adapter requires node.js >= 22 now
* (simatec) Source Code Cleaned Up

### 1.3.12 (2026-02-22)
* (simatec) Fix License
* (simatec) Dependencies updated

### 1.3.11 (2025-11-18)
* (simatec) Fix Test & Release

### 1.3.9 (2025-08-31)
* (simatec) Dependencies updated

### 1.3.8 (2025-06-29)
* (simatec) Dependencies updated
* (simatec) Ready for NodeJS 24.x

[Older changelogs can be found there](https://github.com/simatec/ioBroker.tinker/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.