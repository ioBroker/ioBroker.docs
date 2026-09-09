---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: 67AQu/EYqp/i98++GIaelTrcgFWmRUrmvH88/cr7twA=
---
![Логотип](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Количество установок](http://iobroker.live/badges/schoolfree-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.schoolfree

Этот адаптер использует сервис Sentry.io для автоматического сообщения мне, как разработчику, об исключениях, ошибках в коде и новых схемах устройств. Подробнее см. ниже!

## Адаптер schoolfree для ioBroker

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

### описание:

Schoolfree — это адаптер для установок iobroker. С помощью адаптера можно оценивать и передавать данные о школьных каникулах в виде отдельных точек данных. Эти точки данных, в свою очередь, могут быть обработаны для других функций, таких как управление отоплением, жалюзи и датчиками присутствия.

В настоящее время подписка на период школьных каникул осуществляется через API сайта <https://www.mehr-schulferien.de>

В настоящее время в Германии поддерживаются школьные каникулы и выходные дни.

Для дальнейшей обработки с помощью Schoolfree доступны следующие данные:

- info.current.end: Дата окончания текущих праздников
- info.current.name: название текущих школьных каникул
- info.current.start: Дата начала текущего отпуска
- info.next.end: Дата окончания следующих каникул
- info.next.name: название следующих школьных каникул
- info.next.start: Дата начала следующего отпуска
- info.today: Переключатель для отображения текущего статуса сегодня (true/false)
- info.tomorrow: переключатель для отображения текущего статуса завтра (true/false)

### Что такое Sentry.io и какая информация передается на серверы этой компании?

Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает другая ошибка в коде, это сообщение об ошибке, которое также отображается в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

---

## Changelog
<!--### __WORK IN PROGRESS__-->
### 2.1.0 (2026-08-18)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated

### 2.0.0 (2026-04-06)
* (simatec) Breaking Changes - API Update to v2.1
* (simatec) Update locations
* (simatec) Fix Test & Release

### 1.1.14 (2026-03-29)
* (simatec) Readme updated
* (simatec) Fix License
* (simatec) dependencies updated

### 1.1.13 (2025-11-18)
* (simatec) dependencies updated
* (simatec) update npm publish

### 1.1.12 (2025-08-31)
* (simatec) small fix
* (simatec) dependencies updated

[Older changelogs can be found there](https://github.com/simatec/ioBroker.schoolfree/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019 - 2026 simatec

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