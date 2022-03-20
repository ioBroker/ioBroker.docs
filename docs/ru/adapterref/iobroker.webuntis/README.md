---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webuntis/README.md
title: ioBroker.webuntis
hash: AgyukjTnGAHgQS/dJsCttzzXlatFgIhuxx5J2VRYqSo=
---
![Логотип](../../../en/adapterref/iobroker.webuntis/admin/webuntis.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Количество установок](https://iobroker.live/badges/webuntis-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/webuntis-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![НПМ](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## Адаптер webuntis для ioBroker
Адаптер для получения данных из WebUntis

Адаптер Dieser не содержит данных в Webuntis.
Für eine deutsche Anleitung ![Hier нажмите](../../../en/adapterref/iobroker.webuntis/readme/readme.de.md)

## Начиная
После установки адаптера в iobroker автоматически открывается окно конфигурации.

Теперь перейдите на https://webuntis.com и введите название школы в поле поиска.

![вебунтис_старт](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

теперь вам нужно получить строки с интернет-адреса школьного сайта из webuntis:

- базовый URL
- школьная тайна

см. пример под предыдущим снимком экрана: https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login

- hepta.webuntis.com => школьная база-URL
- hbs-F%C3%BCrth => школьная тайна

**Если в school-secret стоит __+__ , то вы должны заменить этот символ пробелом**

теперь перейдите в окно конфигурации в iobroker

![webuntis_config](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

после вставки вашего имени пользователя (дочернего или родительского) и пароля для этой учетной записи вы можете использовать school-secret и school-basr-Url в конфигурации.

Сохраните и в этот момент вы станете уроками на следующий день.

пожалуйста, не стесняйтесь, чтобы сделать предложение для рекомендуемых версий.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.1 (2022-01-30)
* Bug fixes in timetable

### 0.3.0 (2022-01-29)
* Add Inbox peview data

### 0.2.0 (2022-01-27)
* Add anonymous login

### 0.1.0 (2022-01-25)
* Add nextDay
* Add code element

### 0.0.1 (2022-01-25)
* (Newan) initial release

## License
MIT License

Copyright (c) 2022 Newan <info@newan.de>

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