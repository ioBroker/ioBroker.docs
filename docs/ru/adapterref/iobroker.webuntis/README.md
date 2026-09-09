---
chapters: {"pages":{"en/adapterref/iobroker.webuntis/README.md":{"title":{"en":"ioBroker.webuntis"},"content":"en/adapterref/iobroker.webuntis/README.md"},"en/adapterref/iobroker.webuntis/readme/readme.de.md":{"title":{"en":"ioBroker.webuntis"},"content":"en/adapterref/iobroker.webuntis/readme/readme.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webuntis/README.md
title: ioBroker.webuntis
hash: qxvPWfv2VEFybSB2TBq1nuQUVMvFRurR8gkoxQi5QaE=
---
![Логотип](../../../en/adapterref/iobroker.webuntis/admin/webuntis.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Количество установок](https://iobroker.live/badges/webuntis-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/webuntis-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![НПМ](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)
![Тестирование и выпуск](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

# ioBroker.webuntis

## Адаптер Webuntis для ioBroker

Адаптер для получения данных из WebUntis

Dieser Adaptor bezieht Daten aus Webuntis. Für eine deutsche Anleitung [hier klicken](/#/docs/adapterref/iobroker.webuntis/readme/readme.de.md)

## Пожертвование

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Начиная

После установки адаптера в iobroker автоматически открывается окно конфигурации.

Теперь перейдите на [сайт https://webuntis.com](https://webuntis.com) и введите название школы в поле поиска.

![webuntis\_start](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Теперь вам нужны строки с интернет-адреса веб-сайта школы из Webuntis:

- базовый URL
- школьная тайна

См. пример ниже предыдущего скриншота: [здесь](https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login)

- hepta.webuntis.com => базовый URL школы
- hbs-F%C3%BCrth => школьный секрет

**Если в слове school-secret стоит знак **+** , то этот символ необходимо заменить пробелом.**

Теперь перейдите в окно настроек в iobroker.

![webuntis\_config](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

После ввода имени пользователя (дочернего или родительского) и пароля для этой учетной записи, вы можете добавить в конфигурацию секретный ключ школы и URL-адрес школы.

Сохраните свои данные, и в этот момент вы сами станете уроками на следующий день.

Пожалуйста, не стесняйтесь предлагать рекомендуемые версии.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.4 (2022-05-08)
* change log-level for error messages

### 0.3.3 (2022-04-03)
* Add errorhandling for timetable

### 0.3.2 (2022-03-02)
* Add errorhandling for inbox & mesage center

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