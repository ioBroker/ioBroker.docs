---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shrdzm/README.md
title: ioBroker.shrdzm
hash: E8CVANcq4KIUE18wXRqlxtXZp9tRdHWHrGhcVDJAK5E=
---
![Логотип](../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.shrdzm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)
![Количество установок (последнее)](http://iobroker.live/badges/shrdzm-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/shrdzm-stable.svg)
![Лицензия](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.shrdzm
![Тест и выпуск](https://github.com/mcm4iob/ioBroker.shrdzm/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.
**************************************************************************************************************

## Shrdzm адаптер для ioBroker
Этот адаптер интегрирует интерфейс смарт-счетчика SHRDZM, доступный от *SHRDZM IT Services e.U.*, в ioBroker. Описание интерфейса доступно [здесь](https://cms.shrdzm.com/produkt/smartmeter-modul/).

Обратите внимание, что этот адаптер никак не связан с вышеупомянутой компанией и никаких коммерческих отношений между ними не существует.

**************************************************************************************************************

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками их соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения ими или любыми связанными дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей.**

**************************************************************************************************************

## Конфигурация
Установите и настройте интерфейс SHRZDM, как описано в документации производителя. Этот адаптер подключается к интерфейсу с помощью соединения udp (IPv4). Для начала работы необходимо выполнить следующие шаги:

- установите адаптер iobroker обычным способом
- откройте интерфейс ioBroker adminUI для настройки адаптера
- выберите свободный порт в adminUI, по умолчанию установлен порт 9000, но можно использовать любой свободный порт.

- открыть интерфейс конфигурации SHRZDM (с помощью веб-браузера)

![альтернативный текст](../../../en/adapterref/iobroker.shrdzm/doc/shrzdm-cloud.pgn)

- выберите конфигурацию облака
- введите IP-адрес (только IPv4) вашего хоста ioBroker и номер порта, выбранный в поле «Сервер»
- активировать «UDP-отправку»
- сохранить настройки облака

Устройство SHRDZM должно начать отправлять данные немедленно с интервалом, настроенным на странице «Настройки».

## Операция
Адаптер создаст состояния для всех данных obos, полученных от всех устройств. Если у вас установлено несколько устройств SHRZDM и вы хотите ограничить принимаемые устройства, вы можете ввести список разрешенных устройств в конфигурацию адаптера. Если ни одно устройство не настроено, будут приниматься данные от всех отправителей.

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
#### Обновления происходят слишком часто
Обновления данных в реальном времени выполняются всякий раз, когда от устройства SHRDZM поступают новые данные. Чтобы уменьшить объем данных, отправляемых устройством, отрегулируйте параметр интервала на странице «настроек» устройства.

**************************************************************************************************************

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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