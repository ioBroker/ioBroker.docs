---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: CYDbmFIkHsg8o4GoRx1JVxUXyU05/uSXPlSA97SfWNU=
---
![Логотип](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![Количество установок](https://iobroker.live/badges/tractive-gps-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tractive-gps-stable.svg)

# IoBroker.tractive-gps
**Тесты:** ![Тестируйте и выпускайте](https://github.com/xXBJXx/ioBroker.tractive-gps/workflows/Test%20and%20Release/badge.svg)

## Tractive-gps адаптер для ioBroker
### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо аффилированности или одобрения ими или связанными с ними аффилированными лицами! Этот личный проект осуществляется в развлекательных целях и не имеет коммерческих целей. **[Тяговый](https://tractive.com/de/)** является товарным знаком **Tractive GmbH**.

### Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.**\ Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см.
[Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

### Описание
Этот адаптер позволяет подключаться к службе Tractive GPS и получать информацию о местоположении ваших питомцев.\ Адаптер создает устройство для каждого питомца и статус для каждого местоположения.\ Адаптер также создает статус уровня заряда батареи трекера и многое другое. статусы, предоставляемые API.

### Предпосылки
Чтобы использовать этот адаптер, у вас должна быть учетная запись Tractive и трекер для вашего питомца (см. [Тяговый](https://tractive.com/de/)) (**Внимание:** Ежемесячная/ежегодная плата за использование сервиса Tractive)

### Монтаж
Адаптер устанавливается через диспетчер адаптеров ioBroker.\ **Внимание:** Для адаптера требуется как минимум Node.js >= 16 и js-controller 3.3.22 и admin >=6! После установки вам необходимо войти в свою учетную запись Tractive и установить интервал опроса. Затем адаптер извлечет токен из Tractive API и сохранит его в конфигурации. Этот токен имеет срок действия, который будет автоматически обновляться автоматически по истечении срока его действия.

### Конфигурация
В конфигурации адаптера есть два варианта настройки:

* **Авторизоваться**.
  1. здесь вы можете войти в свою учетную запись Tactive.\
  2. установить интервал опроса.\
  3. вручную перевыпустить токен.\

  ![экземпляры-tractive-gps-login.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-login.png)

* **Все устройства** — здесь отображается список всех устройств, найденных адаптером. Вы можете изменить имя устройства в списке.

это также будет отображаться в объектах.\ ![экземпляры-tractive-gps-allDevices-table.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png) Чтобы изменить имя, щелкните значок карандаша и введите новое имя.
![экземпляры-tractive-gps-allDevices-modal.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### Вкладка
Во вкладке отображаются все найденные устройства с картой и некоторой информацией об устройстве.\ ![вкладка-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ftab-tractive-gps.png) Изображение также можно заменить на собственное изображение животного.\ Для этого файл PNG с названием трекера (например, ZSDLINVD.png) необходимо поместить в папку **iobroker-data/files/tractive-gps**.
Или вы можете использовать вкладку **файлы** для загрузки файла. (см. изображение ниже)\ **Рекомендуемый размер изображения 1920x1080 пикселей.**\ ![файлы-тяговые-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ffiles-tractive-gps.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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