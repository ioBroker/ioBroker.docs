---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: xGaWyT+LnzOIpkTZva4OhcexR20xwo43b95y0yh++QY=
---
![Логотип](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![Количество установок](https://iobroker.live/badges/solarmanpv-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/solarmanpv-stable.svg)
![Статус зависимости](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![НПМ](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**Тесты:** ![Тестируйте и выпускайте](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## Адаптер solarmanpv для ioBroker
Чтение данных с балконной электростанции

### Начиная
Этот адаптер используется для отображения данных балконной электростанции, которую обеспечивает инвертор «Bosswerk MI600» в ioBroker. Этот инвертор совместим с другими инверторами семейства Deye.

Я предполагаю, что до сих пор завод контролируется приложением «Solarman».
Этот адаптер получает данные из этого облака.

Сначала вам нужно обратиться в службу поддержки Solarman <service@solarmanpv.com> для получения необходимых учетных данных (app_id и app_secret).
По-прежнему может быть запрос типа: «Мне нужно спросить, какую платформу вы используете? Какова ваша роль? ". В моем случае потом пришел еще один запрос: «Почему вы подаете заявку на API?». Я вежливо ответил и на этот вопрос, и на следующий день мне прислали необходимые данные.

На странице администратора 4 поля должны соответствовать описанию.
Этот адаптер создается как "запланированный" адаптер.
Так как данные в облаке обновляются примерно каждые 6 минут, это не заставляет чаще запускать адаптер.

Начиная с версии 0.3.0, в отличие от предыдущих версий, возможен черный список. Это означает, что «все» значения, предоставляемые API, считываются, и пользователь может отфильтровать ненужные значения через черный список. Соответствующие точки данных можно удалить, что делает количество объектов более четким.

С 16.04.2023 г. Solarman перешел на новую платформу. Дальнейшие адаптации API, насколько они существуют, не производились.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.0 (2023-04-16)
* (raschy) Solarman has switched to a new platform

### 0.3.2 (2023-03-28)
* (raschy) Error 'DB-closed' fixed

### 0.3.1 (2023-02-19)
* (raschy) Inverter-Filter deactivated

### 0.3.0 (2023-02-17)
* (raschy) Blacklist added

### 0.2.2 (2023-02-08)
* (raschy) Release for github/npm

### 0.2.1 (2023-02-08)
* (raschy) Timeout extended, type error fixed during setup, some data added from BMS

### 0.2.0 (2022-11-07)
* (raschy) Adding the battery data from hybrid inverters

### 0.1.5 (2022-10-17)
* (raschy) Added support for hybrid inverters and 4 MPPTs

### 0.1.4 (2022-09-17)
* (raschy) Corrections after first review

### 0.1.3 (2022-08-19)
* (raschy) Adapter termination code changed

### 0.1.2 (2022-07-30)
* (raschy) Added device status, structure reduced

### 0.1.1 (2022-07-27)
* (raschy) Clean up the code and start delay

### 0.1.0 (2022-07-26)
* (raschy) Also for multiple inverter per station

### 0.0.14 (2022-07-13)
* (raschy) Extension for multiple plants

### 0.0.13 (2022-07-11)
* (raschy) Clean up the debug values

### 0.0.13-alpha.0 (2022-07-10)
* (raschy) ApiClient swapped to separate file

### 0.0.12 (2022-07-04)
* (raschy) test and release workflow for npm activated

### 0.0.11 (2022-07-03)
* (raschy) Create to release

### 0.0.10 (2022-07-03)
* (raschy) User warnings addet

### 0.0.9 (2022-06-20)
* (raschy) Errorhandling addet

### 0.0.8 (2022-06-19)
* (raschy) Try after clearing folder

### 0.0.7 (2022-06-19)
* (raschy) Try first release

### 0.0.6 (2022-06-19)
* (raschy) Crypto version corrected

### 0.0.5 (2022-06-19)
* (raschy) Crypto version changed

### 0.0.4 (2022-06-19)

* (raschy) Dependecies addet

### 0.0.3 (2022-06-19)

* (raschy) ReadMe changed

### 0.0.2 (2022-06-19)

* (raschy) changed to jsonConfig

### 0.0.1 (2022-06-16

* (raschy) initial release

## License
MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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