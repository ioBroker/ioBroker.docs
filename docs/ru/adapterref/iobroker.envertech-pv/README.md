---
chapters: {"pages":{"en/adapterref/iobroker.envertech-pv/README.md":{"title":{"en":"ioBroker.envertech-pv"},"content":"en/adapterref/iobroker.envertech-pv/README.md"},"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md":{"title":{"en":"Envertech-PV Adapter Information"},"content":"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: xd5v5kZ1c8YC1CszAMlF5/wsyGTUuJlBzefSs3+qwNA=
---
![Логотип](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.envertech-pv)
![Загрузки](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.envertech-pv)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.envertech-pv)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.envertech-pv/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.envertech-pv)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.envertech-pv)
![Версия NPM](http://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/envertech-pv-stable.svg)
![Количество установок](https://iobroker.live/badges/envertech-pv-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.envertech-pv

**Общая информация:**<br></br> **Версия:**</br></br> **Тесты:**</br><br> **Пожертвование:**</br>

---

## Часовой

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

---

## Адаптер envertech-pv для ioBroker

Адаптер ioBroker.envertech-pv позволяет легко получать доступ к данным [облачного сервиса envertech](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/www.envertecportal.com) и собирать их. Регулярно опрашивая веб-сервис, этот адаптер гарантирует оперативное получение и хранение всей ценной информации в легкодоступном виде.

---

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Использование этих товарных знаков не подразумевает какой-либо связи с ними или их дочерними компаниями, а также одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.** **Envertech® является зарегистрированным товарным знаком компании Zhejiang Envertech Corporation Limited.**

---

## Документация

[Документация **на английском языке**](/#/docs/adapterref/iobroker.envertech-pv/docs/en/envertech.md)\
&#x20;[**немецкая** документация](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/docs/de/envertech.md)

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @adcrafter27 ( <https://github.com/adcrafter27> ), который проанализировал и задокументировал REST API, используемый для доступа к облачному сервису envertech.

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

В идеале, пожалуйста, используйте для этого GitHub Issues, а наилучший способ — установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем получите файл лога с диска через подкаталог ioBroker 'log', **а не** через Admin, что позволит сократить строки. Если вы предпочитаете не создавать GitHub Issues, напишите мне по электронной почте ( <mcm57@gmx.at> ). Пожалуйста, укажите ссылку на соответствующий **GitHub Issues** , предоставьте соответствующее **описание** и добавьте **временные метки лога** там, где это необходимо.

---

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.1 (2026-02-14)
-   (mcm1957) Dependencies have been updated.

### 1.5.0 (2025-08-16)
-   (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.6.17 now.
-   (mcm1957) Dependencies have been updated.

### 1.4.0 (2024-11-14)
-   (mcm1957) Adapter has been changes to meet Responsive Design Rules.
-   (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
-   (mcm1957) Dependencies have been updated.

### 1.3.2 (2024-03-28)
-   (mcm1957) Adapter supports multiple pages returned from Envertech now. This will allow more than 20 inverters per station.
-   (mcm1957) Adapter requires js-controller >= 5 now.
-   (mcm1957) Dependencies have been updated.

### 1.2.0 (2024-03-21)
-   (mcm1957) New states GridPower and LoadPower have been added [#147].
-   (mcm1957) Processing of strIncome has been fixed [#46].
-   (mcm1957) Incorrect description has been corrected [#50].
-   (mcm1957) State roles have been checked and adapter [#75].
-   (mcm1957) Dependencies have been updated.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2025 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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