---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pegelalarm/README.md
title: ioBroker.pegelalarm
hash: lh7ryTYAwsoPCu2btnWIobQJah/PjOGwzqUPfNmYxrI=
---
![Логотип](../../../en/adapterref/iobroker.pegelalarm/admin/pegelalarm.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)
![Количество установок (последние)](http://iobroker.live/badges/pegelalarm-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/pegelalarm-stable.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.pegelalarm/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.pegelalarm?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.pegelalarm

## Адаптер Pegelalarm для ioBroker

Предоставляет данные из Pegelalarm-API (v1.0).

Документацию по API 1.1 можно найти здесь: <https://github.com/SOBOS-GmbH/pegelalarm_public_pas_doc/wiki/Download-current-water-data>

---

### Что такое Sentry.io и какая информация передается на серверы этой компании?

Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает другая ошибка в коде, это сообщение об ошибке, которое также отображается в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

---

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.5.0 (2026-08-19)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Fix setTimeout

### 1.4.0 (2026-04-22)
* (simatec) dependencies updated
* (simatec) Request Fix
* (simatec) Timeout Fix
* (simatec) Source code rewritten,
* (simatec) Source code improved
* (simatec) Station names fixed
* (simatec) Header added

### 1.3.13 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 1.3.12 (2025-11-23)
* (simatec) dependencies updated

### 1.3.11 (2025-11-02)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](https://github.com/simatec/ioBroker.pegelalarm/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020 - 2026 simatec

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