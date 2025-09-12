---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hoymiles-ms/README.md
title: ioBroker.hoymiles-ms
hash: BPRyqwDODN2tHAKClSYQAInymu/9hXiS5ctU+20iSyU=
---
![Логотип](../../../en/adapterref/iobroker.hoymiles-ms/admin/hoymiles-ms.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg)
![Количество установок (последнее)](http://iobroker.live/badges/hoymiles-ms-installed.svg)
![Количество установок (стабильное)](http://iobroker.live/badges/hoymiles-ms-stable.svg)
![Лицензия](https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.hoymiles-ms
![Тестирование и выпуск](https://github.com/mcm4iob/ioBroker.hoymiles-ms/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее и как отключить отправку сообщений об ошибках см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется, начиная с js-controller 3.0.
**************************************************************************************************************

## Hoymiles-ms адаптер для ioBroker
Этот адаптер интегрирует системы хранения данных **HOYMILES** **M**icro**S** (в настоящее время только Hoymiles SM-A2) в ioBroker. Описание устройства доступно здесь: [здесь](https://www.hoymiles.com/de/products/micro-storage).

Обратите внимание, что этот адаптер никак не связан с упомянутой выше компанией и никаких коммерческих отношений между ними не существует.

**************************************************************************************************************

## Отказ от ответственности
**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками своих соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями или их одобрения! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.**

**************************************************************************************************************

## Документация
Подробные инструкции по настройке, руководство по конфигурированию и полную справочную документацию:

- **[Документация на английском языке](doc/en/DOCUMENTATION_en.md)**
- **[Немецкая документация](doc/de/DOCUMENTATION_de.md)**

## Конфигурация
### Конфигурация адаптера
Адаптер можно настроить как выделенный сервер MQTT или как клиент MQTT (Примечание: режим cleint пока не реализован).

Для работы в качестве сервера MQTT необходимо настроить следующие параметры:

- сеть mqtt

Укажите сеть для прослушивания. Обычно достаточно прослушивания всех сетей (0.0.0.0).

- порт mqtt

Укажите используемый (tcp)порт. Стандартно порт MQTT (1883) может быть занят адаптером ioBroker.mqtt, а порт 1882 используется адаптером ioBroker.shelly по умолчанию. Этот адаптер по умолчанию использует порт 1881. Но вы можете использовать любой свободный порт.

### Конфигурация Hoymiles MS-A2
Чтобы настроить устройство Hoymiles MS-A2, откройте приложение S-Miles Home. Выберите страницу конфигурации (с помощью значка шестеренки в правом верхнем углу) и прокрутите вниз до пункта «MQTT-Service». Включите MQTT Service и введите

- Адрес сервера

IP-адрес системы ioBroker (при использовании режима сервера mqtt) или адрес вашего брокера mqtt

- Порт

Номер порта, настроенный вашим брокером mqtt

- При желании можно задать префикс клиента (по умолчанию «MSA»)

Этот адаптер в настоящее время не поддерживает аутентификацию. Поэтому её необходимо отключить.

## Операция
После запуска адаптер прослушивает пакеты MQTT, получаемые от устройства Hoymiles. Адаптер не производит никаких опросов — все действия инициируются устройством Hoymiles. Обратите внимание, что настроенные данные отправляются только один раз после установления соединения, а данные в режиме реального времени отправляются каждую секунду. Системная статистика обычно обновляется каждые пять минут. Обратите внимание, что эти интервалы не настраиваются адаптером — они определяются API Hoymiles.

**************************************************************************************************************

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
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