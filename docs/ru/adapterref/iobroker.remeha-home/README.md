---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-home
hash: HZe7K5t32/vkjAjPjgWJr5OtUp6Vl/JCZ1SM7NcYL7U=
---
![Логотип](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![Количество установок](http://iobroker.live/badges/remeha-home-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.remeha-home

Этот адаптер использует данную услугу.`Sentry.io` Для автоматического сообщения мне, как разработчику, об исключениях, ошибках в коде и новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптеров

**Если вам нравится ioBroker.remeha-home, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Адаптер Remeha Home для ioBroker

---

## Описание

Адаптер ioBroker.remeha-home обеспечивает интеграцию и управление системами отопления Remeha через [платформу Remeha Home](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app) . Адаптер постоянно подключается к API Remeha Home и получает текущие данные, делая их доступными в системе ioBroker. Это позволяет оптимально контролировать и управлять системой отопления.

## Функции

- Извлечение данных: Непрерывное извлечение данных об отоплении, таких как температура в помещении, температура наружного воздуха, состояние отопления и многое другое.
- Режим управления зонами: включение и выключение зон отопления (например, для разных комнат или этажей).
- Установка целевой температуры: настройка желаемой комнатной температуры для разных зон.
- Переключение режима камина: Активация режима камина для регулировки обогрева при наличии внешних источников тепла, таких как камин.

## Конфигурация адаптера

Настройка адаптера очень проста. Требуются только имя пользователя (адрес электронной почты) и пароль от учетной записи Remeha Home.

Эти данные необходимо ввести в конфигурацию адаптера.

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### 1.1.0 (2026-08-19)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 1.0.10 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated
* (simatec) Fix automerge

### 1.0.9 (2025-11-22)
* (simatec) dependencies updated
* (simatec) Fix Test & Release

### 1.0.8 (2025-08-31)
* (simatec) Dependencies updated

### 1.0.7 (2025-06-25)
* (simatec) Dependencies updated
* (simatec) Ready for NodeJS 24.x

[Older changelogs can be found there](https://github.com/simatec/ioBroker.remeha-home/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 simatec

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