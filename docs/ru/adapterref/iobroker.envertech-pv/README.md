---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: xG56N3m6+kR6XQ+Q1LSIUu0M2pWfv1Ff71XnwNdqliI=
---
![Логотип](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/envertech-pv-stable.svg)
![Количество установок](https://iobroker.live/badges/envertech-pv-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![НПМ](https://nodei.co/npm/iobroker.envertech-pv.png?downloads=true)

# IoBroker.envertech-pv
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

<!-- **Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.
-->

## IoBroker.envertech-pv
Адаптер ioBroker.envertech-pv позволяет легко получать доступ и собирать данные из [облачный сервис Энвертех](www.envertecportal.com). Регулярно опрашивая веб-службу, этот адаптер гарантирует, что вся ценная информация будет быстро извлечена и сохранена в легкодоступных состояниях.

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения ими или любыми связанными с ними дочерними компаниями! Этот личный проект поддерживается в свободное время и не преследует коммерческих целей.** **Envertech® является зарегистрированным товарным знаком Zhejiang Envertech Corporation Limited**

## Документация
[**Английская** документация](docs/en/envertech.md) [**Немецкий** документация](docs/de/envertech.md)

## Кредиты
Этот адаптер был бы невозможен без отличной работы @adcrafter27 (https://github.com/adcrafter27), который проанализировал и задокументировал REST API, используемый для доступа к облачному сервису envertech.

## Как сообщать о проблемах и запросах функций
В идеале, пожалуйста, используйте для этого вопросы GitHub, при этом лучший способ достигается путем установки адаптера в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем извлеките файл журнала с диска через подкаталог «log» ioBroker, ** не ** из Admin, что приведет к сокращению строк. Если вы предпочитаете не предоставлять его в выпуске GitHub, напишите мне (mcm57@gmx.at). Пожалуйста, сошлитесь на соответствующую **проблему GitHub**, предоставьте соответствующий **описательный комментарий** и добавьте **отметки времени журнала**, где это уместно.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2023-03-31)

-   (mcm1957) changed: Handling of statuscode '2' has been added (#44).
-   (mcm1957) changed: Unload code has been fixed.
-   (mcm1957) changed: Some translations have been updated.
-   (mcm1957) changed: Dependencies have been updated.

### 1.0.1 (2023-03-23)

-   (mcm1957) NEW: Support to retrieve station-id by username and password has been added.
-   (mcm1957) NEW: Support to check multiple stations within one instance has been added.
-   (mcm1957) changed: Units and roles for states have been reconfigured.
-   (mcm1957) changed: State structure has been changed to support multiple stations (and for future local access).
-   (mcm1957) changed: Userinterface has been migrated to jsonConfig (admin5).
-   (mcm1957) changed: The adapter is running as daemon.
-   (mcm1957) changed: The communication has been changed from deprecated "request" to "axios" package.
-   (mcm1957) changed: The adapter has been moved to iobroker-community-adapters organisation.

### 0.0.8

-   (adcrafter27) add setting for more log output

### 0.0.7

-   (adcrafter27) add more functions

### 0.0.6

-   (adcrafter27) code fix

### 0.0.5

-   (adcrafter27) release

### 0.0.3

-   (adcrafter27) Update new functions

### 0.0.2

-   (adcrafter27) First test release

### 0.0.1

-   (adcrafter27) initial release

## License

MIT License

Copyright (c) 2023 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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