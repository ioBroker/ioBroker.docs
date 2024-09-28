---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-home
hash: uRi77+bePrsWGCD5xccnBWjbelxfrurWjfa1VJBWsxM=
---
![Логотип](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![Количество установок](http://iobroker.live/badges/remeha-home-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.remeha-home
![Тест и выпуск](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу `Sentry.io` для автоматического сообщения мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптера
**Если вам нравится ioBroker.remeha-home, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Адаптер Remeha Home для ioBroker
---

## Описание
Адаптер ioBroker.remeha-home позволяет интегрировать и контролировать системы отопления Remeha через [Платформа Remeha Home](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app). Адаптер постоянно подключается к API Remeha Home и извлекает текущие данные, чтобы сделать их доступными в системе ioBroker. Это позволяет оптимально контролировать и управлять системой отопления.

## Функции
* Извлечение данных: Постоянное извлечение данных об отоплении, таких как температура в помещении, температура наружного воздуха, состояние отопления и т. д.
* Режим управления зоной: включение и выключение зон отопления (например, для разных комнат или этажей).
* Установка целевой температуры: установка желаемой температуры в помещении для разных зон.
* Переключение режима камина: активация режима камина для регулировки нагрева внешних источников тепла, таких как камин.

## Конфигурация адаптера
Настройка адаптера очень проста.
Требуется только имя пользователя (адрес электронной почты) и пароль учетной записи Remeha Home.

Их необходимо ввести в конфигурацию адаптера.

--- <!-- ### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.2.3 (2024-09-26)
* (simatec) Fix jsonConfig
* (simatec) Fix for Admin 7.1.5

### 0.2.2 (2024-09-19)
* (simatec) small State Fix

### 0.2.1 (2024-09-18)
* (simatec) States Fix
* (simatec) Readme Fix
* (simatec) Test & Release Fix

### 0.2.0 (2024-09-16)
* (simatec) Translation Fix
* (simatec) Code cleaning
* (simatec) Ready for Betatest

### 0.1.3 (2024-09-12)
* (simatec) Fix Zonemode
* (simatec) Translation added

### 0.1.2 (2024-09-11)
* (simatec) Fix Zonemode

### 0.1.1 (2024-09-10)
* (simatec) Fix Release Script

### 0.1.0 (2024-09-10)
* (simatec) First Beta

### 0.0.1 (2024-09-09)
* (simatec) First Commit
---

## License

MIT License

Copyright (c) 2024 simatec

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