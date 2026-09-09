---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hydrop/README.md
title: ioBroker.hydrop
hash: uu6VZKSG/PDNLaNHtkAx8YH6i0GMY1aV7klXY+n1gjc=
---
![Логотип](../../../en/adapterref/iobroker.hydrop/admin/hydrop_Readme_Logo.png)

![Количество установок](http://iobroker.live/badges/hydrop-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hydrop.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hydrop.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.hydrop/badge.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.hydrop/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.hydrop?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)
![НПМ](https://nodei.co/npm/iobroker.hydrop.png?downloads=true)

# ioBroker.hydrop

Этот адаптер использует данную услугу.`Sentry.io` Для автоматического сообщения мне, как разработчику, об исключениях, ошибках в коде и новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптеров

**Если вам нравится`ioBroker.hydrop` Пожалуйста, рассмотрите возможность сделать пожертвование:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

### Что такое Sentry.io и какая информация передается на серверы этой компании?

Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает другая ошибка в коде, это сообщение об ошибке, которое также отображается в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

---

## Адаптер Hydrop для ioBroker

Этот адаптер позволяет легко интегрировать ваш гидрометр в ioBroker, перенося данные о потреблении воды в вашу систему «умного дома». Чтобы узнать больше о гидрометре и гидросистемах, посетите их веб-сайт: <https://hydrop-systems.com>

Для интеграции вашего гидрометра в ioBroker вам потребуется следующее:

- Учетная запись в приложении для гидропоники (доступно для [Android](https://play.google.com/store/apps/details?id=com.hydropsystems.monitoring\&pcampaignid=web_share) и [iOS](https://apps.apple.com/de/app/hydrop/id6740268955) ).
- Название, которое вы дали своему гидрометру в приложении.
- Ваш персональный API-ключ для REST API гидропоники

Вы можете сгенерировать ключ API в приложении для гидропоники. Перейдите по ссылке:`Settings` , расширить`Account` раздел и нажмите`API key` Ключ API будет отображен только один раз, пожалуйста, сохраните его в безопасном месте.

Как только у вас будет вся необходимая информация, вы можете приступить к работе. Введите данные на странице настроек вашего адаптера для гидронасоса и нажмите кнопку.`Save` Соответствующие объекты будут автоматически созданы в дереве объектов. Запрос данных в ioBroker выполняется каждые 5 минут.

---

### Как работает ареометр?

Гидрометр — это интеллектуальное дополнение к вашему водомеру. Используя передовые технологии компьютерного зрения на основе искусственного интеллекта, он отслеживает каждое изменение показаний счетчика и, таким образом, создает подробный, высокоточный временной ряд вашего потребления воды. Отслеживая скорость потока, вы можете выявлять аномалии и находить небольшие утечки. Конечно, вы также можете получать оповещения, если скорость потока превысит определенный максимум. С ioBroker возможности практически безграничны.

Если вы хотите проверить совместимость гидрометра с вашим типом водомера, воспользуйтесь этим инструментом: <https://shop.hydrop-systems.com/zaehlercheck/>

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
(simatec) Update dependencies

### 0.2.0 (2026-08-21)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) Update dependencies
* (simatec) small Bugfixes

### 0.1.5 (2026-03-29)
* (simatec) Fix License
* (simatec) Update dependencies
* (simatec) Update automerge
* (simatec) Update io-package

### 0.1.4 (2025-11-23)
* (simatec) Fix dependabot
* (simatec) Update dependencies

### 0.1.3 (2025-11-05)
* (Goriatch) Minified Adapter Logo
* (Goriatch) Localization, description and branding updates
* (simatec) Update dependencies

### 0.1.2 (2025-11-02)
* (simatec) Fix for Beta Release

[Older changelogs can be found there](https://github.com/simatec/ioBroker.hydrop/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 simatec

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