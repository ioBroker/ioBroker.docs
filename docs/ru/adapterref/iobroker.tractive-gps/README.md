---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: UK0rDDy+fjpro8mYDetaov7yQYXMGOmdZb5XkbGVoO8=
---
![Логотип](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![версия НПМ](http://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tractive-gps-stable.svg)
![Количество установок](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>

**Версия:**

**Тесты:**

[![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml)

## Адаптер tractive-gps для ioBroker
### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия продуктов и компаний или логотипы являются товарными знаками Trademarks™ или Registered® товарными знаками их соответствующих владельцев.
Их использование не подразумевает какой-либо аффилированности или одобрения ими или связанными с ними аффилированными лицами! Этот личный проект осуществляется на развлекательной основе и не имеет коммерческих целей.
**[Тяговый](https://tractive.com/de/)** является товарным знаком **Tractive GmbH**.

### Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см.
[Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

### Кредиты
Этот адаптер был бы невозможен без замечательной работы @xXBJXx (https://github.com/xXBJXx), который его создал.

### Описание
Этот адаптер позволяет вам подключаться к сервису Tractive GPS и получать местоположение ваших питомцев.
Адаптер создает устройство для каждого питомца и статус для каждого местоположения.
Адаптер также создает статус для уровня заряда батареи трекера и многие другие статусы, предоставляемые API.

### Предпосылки
Для использования этого адаптера у вас должна быть учетная запись Tractive и трекер для вашего питомца (см. [Тяговый](https://tractive.com/de/)) (**Внимание:** ежемесячная/ежегодная плата за использование сервиса Tractive)

### Установка
Адаптер устанавливается через менеджер адаптеров ioBroker.
После установки вам необходимо войти в систему с помощью своей учетной записи Tractive и задать интервал опроса.
Затем адаптер извлечет токен из API Tractive и сохранит его в конфигурации.
У этого токена есть срок действия, который будет автоматически продлен по истечении срока действия.

### Конфигурация
В конфигурации адаптера есть два варианта настройки:

* **Авторизоваться**.
1. здесь вы можете войти в систему, используя свою учетную запись Tractive.
2. установить интервал опроса.
3. вручную перевыпустить токен.

  ![экземпляры-tractive-gps-login.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-login.png)

* **Все устройства** - Здесь отображается список всех устройств, найденных адаптером. Вы можете изменить имя устройства в списке.

это также будет отображаться в объектах.
![экземпляры-tractive-gps-allDevices-table.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png) чтобы изменить имя, нажмите на значок карандаша и введите новое имя.
![экземпляры-тяговой-gps-allDevices-модальный.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### Вкладка
На вкладке отображаются все найденные устройства с картой и некоторой информацией об устройстве.
![tab-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ftab-tractive-gps.png) Изображение также можно заменить на собственное изображение животного.
Для этого необходимо поместить PNG-файл с названием трекера (например, ZSDLINVD.png) в папку **iobroker-data/files/tractive-gps**.
Или вы можете использовать вкладку **files** для загрузки файла. (см. изображение ниже) **Рекомендуемый размер изображения — 1920x1080 пикселей.** ![файлы-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ffiles-tractive-gps.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2024-08-20)
* (bluefox) Fixing encryption of the access token

### 2.0.0 (2024-08-18)
* (bluefox) BREAKING CHANGE: You must enter your credentials again
* (bluefox) Old code has been removed and GUI has been rewritten
* (bluefox) Dependencies have been updated

### 1.2.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-05)
* (Scrounger) Bugfix: objects will be created only if necessary
* (Scrounger) Bugfix for excessive number of warnings has been added
* (Scrounger) Distance calculation between ioBroker and tracker has been added

### 1.0.0 (2023-11-04)
* (mcm1957) Adapter has been moved into iobroker-community-adapters organisation
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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