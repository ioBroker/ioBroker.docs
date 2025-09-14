---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shrdzm/README.md
title: ioBroker.shrdzm
hash: l+9nKDVCDAgPwp6Es7/uxGbZ1qDsHJ+bzgJNB4u824k=
---
![Логотип](../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

![Лицензия GitHub](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm)
![Загрузки](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/mcm4iob/ioBroker.shrdzm)
![Активность коммитов GitHub](https://img.shields.io/github/commit-activity/m/mcm4iob/ioBroker.shrdzm)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/mcm4iob/ioBroker.shrdzm/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/mcm4iob/ioBroker.shrdzm)
![Проблемы с GitHub](https://img.shields.io/github/issues/mcm4iob/ioBroker.shrdzm)
![версия НПМ](http://img.shields.io/npm/v/iobroker.shrdzm.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/shrdzm-stable.svg)
![Количество установок](https://iobroker.live/badges/shrdzm-installed.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.shrdzm
**Общая информация:**<br> [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/shrdzm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br></br> **Версия:**</br></br> **Тесты:**</br> [![Тестирование и выпуск](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/github-code-scanning/codeql)<br> **Пожертвование:**</br>

**************************************************************************************************************

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее и как отключить отправку сообщений об ошибках см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется, начиная с js-controller 3.0.
**************************************************************************************************************

## Shrdzm Адаптер для ioBroker
Этот адаптер интегрирует интерфейс интеллектуальных счётчиков SHRDZM, доступный от *SHRDZM IT Services e.U.*, в ioBroker. Описание интерфейса доступно в [здесь](https://cms.shrdzm.com/produkt/smartmeter-modul/).

Обратите внимание, что этот адаптер никак не связан с упомянутой выше компанией и никаких коммерческих отношений между ними не существует.

## Документация
Подробная документация доступна на нескольких языках:

- **Английский**: [doc/en/DOCUMENTATION_en.md](doc/en/DOCUMENTATION_en.md)
- **Deutsch**: [doc/de/DOCUMENTATION_de.md](doc/de/DOCUMENTATION_de.md)

**************************************************************************************************************

## Отказ от ответственности
**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками своих соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями или их одобрения! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.**

**************************************************************************************************************

## Конфигурация
Установите и настройте интерфейс SHRZDM, как описано в документации производителя. Этот адаптер подключается к интерфейсу по протоколу UDP (IPv4). Для начала работы необходимо выполнить следующие действия:

- установить адаптер iobroker обычным способом
- откройте интерфейс ioBroker adminUI для настройки адаптера
- выберите свободный порт в adminUI, по умолчанию установлен порт 9000, но можно использовать любой свободный порт.

- открыть интерфейс конфигурации SHRZDM (с помощью веб-браузера)

![альтернативный текст](../../../en/adapterref/iobroker.shrdzm/doc/shrzdm-cloud.pgn)

- выберите конфигурацию облака
- введите IP-адрес (только IPv4) вашего хоста ioBroker и номер порта, выбранный в поле «Сервер»
- активировать «UDP send»
- сохранить настройки облака

Устройство SHRDZM должно начать отправлять данные немедленно с интервалом, настроенным на странице «Настройки».

## Операция
Адаптер создаст состояния для всех данных OBO, полученных от всех устройств. Если у вас установлено несколько устройств SHRZDM и вы хотите ограничить число принимаемых устройств, вы можете указать список разрешённых устройств в настройках адаптера. Если ни одно устройство не настроено, данные будут приниматься от всех отправителей.

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
#### Обновления происходят слишком часто
Обновление данных в режиме реального времени выполняется при получении новых данных от устройства SHRDZM. Чтобы уменьшить объём отправляемых устройством данных, измените параметр интервала на странице настроек устройства.

**************************************************************************************************************

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK_IN_PROGRESS**

### 1.0.0 (2025-08-14)
* (mcm1957) Adapter requires node.js 20.x, js-controller 7.0.7 and admin 7.6.17 now.
* (mcm1957) Dependencies have been updated.

### 0.2.0 (2025-04-06)
* (mcm1957) Online indicator has been added to objectview.
* (mcm1957) Translations have been updated.
* (mcm1957) Descriptions have been added to all states and at adminUI.
* (mcm1957) Raw data received from devices can be stored for analyses now.
* (mcm1957) Adapter can handle multiple networks now. 
* (mcm1957) Dependencies have been updated.

### 0.1.1 (2025-03-17)
* (mcm1957) translations have been reviewed and fixed

### 0.1.0 (2025-03-15)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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