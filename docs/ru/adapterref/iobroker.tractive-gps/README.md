---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: 4uj6KfEOqKYXoYZcri3HeySvkq0C4u6UmhrWQuNmORw=
---
![Логотип](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub фиксирует с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/tractive-gps-stable.svg)
![Количество установок](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml)

##адаптер tractive-gps для ioBroker
### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения со стороны них или связанных с ними аффилированных лиц! Этот личный проект реализуется в развлекательных целях и не преследует никаких деловых целей. **[тяговый](https://tractive.com/de/)** является товарным знаком **Tractive GmbH**.

### Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.**\ Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см.
[Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с версии js-controller 3.0.

### Кредиты
Этот адаптер был бы невозможен без огромной работы @xXBJXx (https://github.com/xXBJXx), который создал этот адаптер и, надеюсь, будет поддерживать его снова в ближайшем будущем.

### Описание
Этот адаптер позволяет вам подключиться к службе Tractive GPS и определить местоположение ваших домашних животных.\ Адаптер создает устройство для каждого домашнего животного и статус для каждого местоположения.\ Адаптер также создает статус уровня заряда батареи трекера и многое другое. статусы, предоставляемые API.

### Предварительные условия
Чтобы использовать этот адаптер, у вас должна быть учетная запись Tractive и трекер для вашего питомца (см. [тяговый](https://tractive.com/de/)) (**Внимание:** Ежемесячная/годовая плата за использование услуги Tractive)

### Монтаж
Адаптер устанавливается через диспетчер адаптеров ioBroker.\ **Внимание:** Для адаптера требуется как минимум Node.js >= 16, js-controller 3.3.22 и admin >=6! После установки вам необходимо войти в свою учетную запись Tractive и установить интервал опроса.\ Затем адаптер получит токен из API Tractive и сохранит его в конфигурации. Этот токен имеет срок действия, который будет автоматически продлен по истечении срока действия.

### Конфигурация
В конфигурации адаптера есть два варианта настройки:

* **Авторизоваться**.
  1. здесь вы можете войти под своей учетной записью Tractive.\
  2. установите интервал опроса.\
  3. вручную перевыпустить токен.\

  ![экземпляры-tractive-gps-login.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-login.png)

* **Все устройства** — здесь отображается список всех устройств, обнаруженных адаптером. Вы можете изменить имя устройства в списке.

затем оно также будет отображаться в объектах.\ ![экземпляры-tractive-gps-allDevices-table.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png), чтобы изменить имя, щелкните значок карандаша и введите новое имя.
![экземпляры-tractive-gps-allDevices-modal.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### Вкладка
Во вкладке отображаются все найденные устройства с картой и некоторой информацией об устройстве.\ ![tab-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ftab-tractive-gps.png) Изображение также можно заменить на собственное изображение животного.\ Для этого создается PNG-файл с названием трекера. (например, ZSDLINVD.png) необходимо поместить в папку **iobroker-data/files/tractive-gps**.
Или вы можете использовать вкладку **файлы**, чтобы загрузить файл. (см. изображение ниже)\ **Рекомендуемый размер изображения — 1920x1080 пикселей.**\ ![файлы-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ffiles-tractive-gps.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2023-11-05)
* (Scrounger) Bugfix: objects will be created only if necessary
* (Scrounger) Bugfix for excessive number of warnings has been added
* (Scrounger) Distance calculation between ioBroker and tracker has been added

### 1.0.0 (2023-11-04)
* (mcm1957) Adapter has been moved into iobroker-community-adapters organisation
* (mcm1957) Dependencies have been updated

### 0.1.2 (2023-02-24)
* (xXBJXx) Dependencies updated
* (xXBJXx) UI updated

### 0.1.1 (2023-02-05)
* (xXBJXx) Dependencies updated

### 0.1.0 (2023-02-05)
* (xXBJXx) first release

## License
MIT License

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
