---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hydrop/README.md
title: ioBroker.hydrop
hash: KiZ+pJiCc4/gNliFL7jiRSCcqZPtEWSuNQqpGJo78Yo=
---
![Логотип](../../../en/adapterref/iobroker.hydrop/admin/hydrop_Readme_Logo.png)

![Количество установок](http://iobroker.live/badges/hydrop-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.hydrop.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hydrop.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.hydrop/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.hydrop?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)
![НПМ](https://nodei.co/npm/iobroker.hydrop.png?downloads=true)

# IoBroker.hydrop
![Тестирование и выпуск](https://github.com/simatec/ioBroker.hydrop/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу `Sentry.io` для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. Подробнее см. ниже!

*****

## Поддержка разработки адаптера
**Если вам нравится `ioBroker.hydrop`, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

*****

### Что такое Sentry.io и какие данные передаются на серверы этой компании?
Sentry.io — это сервис, позволяющий разработчикам получать обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.

При сбое адаптера или возникновении другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то также указывается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, например, адреса электронной почты, имени и т.п.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей столкнулись с такой ошибкой. Всё это помогает мне создавать адаптеры без ошибок, которые практически никогда не дают сбоев.

*****

## Адаптер Hydrop для ioBroker
Этот адаптер позволяет легко интегрировать ваш гидрометр в ioBroker, позволяя отслеживать расход воды в вашем умном доме. Чтобы узнать больше о гидрометре и системах Hydrop, посетите их веб-сайт: https://hydrop-systems.com

Для интеграции вашего гидрометра в ioBroker вам понадобится следующее:

* Учетная запись в приложении hydrop (доступно для [Android](https://play.google.com/store/apps/details?id=com.hydropsystems.monitoring&pcampaignid=web_share) и [iOS](https://apps.apple.com/de/app/hydrop/id6740268955))
* Имя, которое вы дали своему гидрометру в приложении
* Ваш персональный API-ключ для REST API hydrop

Вы можете сгенерировать ключ API в приложении Hydrop. Перейдите к разделу `Settings`, разверните раздел `Account` и нажмите на `API key`. Ключ API будет показан только один раз. Сохраните его в надёжном месте.

Подготовив всю информацию, можно приступать к работе. Введите данные на странице настроек вашего экземпляра адаптера Hydrop и нажмите `Save`. Соответствующие объекты будут автоматически созданы в дереве объектов.
Данные запрашиваются в ioBroker каждые 5 минут.

*****

### Как работает гидропнометр?
Гидрометр — это интеллектуальное дополнение к вашему счётчику воды. Используя передовые технологии машинного зрения на основе искусственного интеллекта, он отслеживает каждое изменение показаний счётчика и создаёт подробный временной ряд высокого разрешения для вашего потребления воды. Контролируя расход, вы можете выявлять отклонения и находить небольшие утечки. Конечно, вы также можете получать оповещения, если расход превышает определённый максимум. С ioBroker возможности практически безграничны.

Если вы хотите проверить совместимость гидрометра с вашим типом счетчика воды, воспользуйтесь этим инструментом: https://shop.hydrop-systems.com/zaehlercheck/

*****

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
* (simatec) Fix dependabot
* (simatec) Update dependencies

### 0.1.3 (2025-11-05)
* (Goriatch) Minified Adapter Logo
* (Goriatch) Localization, description and branding updates
* (simatec) Update dependencies

### 0.1.2 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.1 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.0 (2025-10-31)
* (simatec) Fix daily Consumption
* (simatec) Update dependencies

### 0.0.5 (2025-10-26)
* (simatec) Fix daily Consumption
* (simatec) get current states added
* (simatec) Fix output

### 0.0.4 (2025-10-23)
* (simatec) many small fixes

### 0.0.3 (2025-10-21)
* (simatec) Trusted Publisher added
* (simatec) Source code improved
* (simatec) Readme added

### 0.0.2 (2025-10-19)
* (simatec) initial release

*****

## License
MIT License

Copyright (c) 2025 simatec

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