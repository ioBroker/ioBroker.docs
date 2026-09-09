---
chapters: {"pages":{"en/adapterref/iobroker.shrdzm/README.md":{"title":{"en":"ioBroker.shrdzm"},"content":"en/adapterref/iobroker.shrdzm/README.md"},"en/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md":{"title":{"en":"SHRDZM Adapter Documentation"},"content":"en/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shrdzm/README.md
title: ioBroker.shrdzm
hash: iRWCqOWvS2jbUtjPgJM4btr3XrbJGmNELnLc+GkFVRY=
---
![Логотип](../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

![Лицензия GitHub](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm)
![Загрузки](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/mcm4iob/ioBroker.shrdzm)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/shrdzm/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/mcm4iob/ioBroker.shrdzm)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/mcm4iob/ioBroker.shrdzm/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/mcm4iob/ioBroker.shrdzm)
![Проблемы на GitHub](https://img.shields.io/github/issues/mcm4iob/ioBroker.shrdzm)
![Версия NPM](http://img.shields.io/npm/v/iobroker.shrdzm.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/shrdzm-stable.svg)
![Количество установок](https://iobroker.live/badges/shrdzm-installed.svg)
![Тестирование и выпуск](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/github-code-scanning/codeql/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.shrdzm

**Общая информация:**<br></br> **Версия:**</br></br> **Тесты:**</br><br> **Пожертвование:**</br>

---

## Часовой

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

---

## Адаптер shrdzm для ioBroker

Этот адаптер интегрирует интерфейс интеллектуального счетчика SHRDZM, предоставляемый компанией _SHRDZM IT Services eU,_ в систему ioBroker. Описание интерфейса доступно [здесь](https://cms.shrdzm.com/produkt/smartmeter-modul/) .

Обратите внимание, что данный адаптер никоим образом не связан с упомянутой выше компанией и не имеет с ней никаких коммерческих отношений.

## Документация

Подробная документация доступна на нескольких языках:

- **Английский** : [doc/en/DOCUMENTATION\_en.md](/#/docs/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md)
- **Немецкий** : [doc/de/DOCUMENTATION\_de.md](https://github.com/mcm4iob/ioBroker.shrdzm/blob/main/doc/de/DOCUMENTATION_de.md)

---

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.**

---

## Конфигурация

Установите и настройте интерфейс SHRZDM в соответствии с инструкциями производителя. Этот адаптер подключается к интерфейсу по протоколу UDP (IPv4). Для начала работы необходимо выполнить следующие шаги:

- Установите адаптер iobroker обычным способом.

- Откройте интерфейс администратора ioBroker, чтобы настроить адаптер.

- Выберите свободный порт в административном интерфейсе; по умолчанию установлен порт 9000, но можно использовать любой свободный порт.

- Откройте интерфейс конфигурации SHRZDM (используя веб-браузер).![альтернативный текст](../../../en/adapterref/iobroker.shrdzm/doc/shrzdm-cloud.pgn)

- выберите конфигурацию облака

- Введите IP-адрес (только IPv4) вашего хоста ioBroker и номер порта, выбранный вами, в поле «Сервер».

- активировать 'UDP send'

- сохранить настройки облака

Устройство SHRDZM должно начать отправлять данные немедленно с интервалом, заданным на странице «Настройки».

## Операция

Адаптер создаст состояния для всех данных obos, полученных от всех устройств. Если у вас установлено несколько устройств SHRZDM и вы хотите ограничить количество принимаемых устройств, вы можете ввести список разрешенных устройств в конфигурацию адаптера. Если устройства не настроены, будут приниматься данные от всех отправителей.

## Часто задаваемые вопросы

#### Обновления происходят слишком часто.

Обновление данных в режиме реального времени происходит всякий раз, когда устройство SHRDZM получает новые данные. Чтобы уменьшить объем данных, отправляемых устройством, отрегулируйте параметр интервала на странице «Настройки» устройства.

---

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

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