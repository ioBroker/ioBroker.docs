---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: VhS3pTYYrpO3rIsPG7f3yUT7appDZmkozDHtisOm57U=
---
![Логотип](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![Количество установок](https://iobroker.live/badges/solarmanpv-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/solarmanpv-stable.svg)
![Статус зависимости](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![НПМ](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**Тесты:** ![Тест и выпуск](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## Адаптер solarmanpv для ioBroker
Считывание данных с балконной электростанции

### Начиная
Этот адаптер используется для отображения данных балконной электростанции, которая предоставляется инвертором "Bosswerk MI600" в ioBroker. Этот инвертор совместим с другими инверторами семейства Deye.

Я предполагаю, что пока что за заводом следит приложение «Solarman». Этот адаптер получает данные из этого облака.

Сначала вам нужно обратиться в службу поддержки Solarman <service@solarmanpv.com> за необходимыми учетными данными (app_id и app_secret).
Все еще может быть запрос типа: «Мне нужно спросить, какую платформу вы используете? Какова ваша роль? Вы физическое лицо, поставщик O&M, производитель или дистрибьютор? Можете ли вы дать мне свой адрес электронной почты для API?». В моем случае затем пришел другой запрос: «Почему вы подаете заявку на API?». Я вежливо ответил и на этот вопрос, и на следующий день мне были отправлены необходимые данные.

На странице администратора 4 поля должны соответствовать описанию.
Этот адаптер создан как «запланированный» адаптер.
Поскольку данные в облаке обновляются только каждые 6 минут, это не требует более частого запуска адаптера.

Начиная с версии 0.3.0, в отличие от предыдущих версий, стал возможен черный список. Это означает, что "все" значения, предоставленные API, считываются, и пользователь может отфильтровать ненужные значения с помощью черного списка. Соответствующие точки данных могут быть удалены, что делает количество объектов более понятным.

С 16.04.2023 Solarman перешел на новую платформу - версию 0.4.0. Дальнейшие адаптации API, насколько они существуют, не производились.

В версиях 0.5.2 – 0.6.x были внесены только правки разработчика.

В версии 0.7.0 node-js был повышен до рекомендуемой версии 20.x, а js-controller >6 стал обязательным условием. Email и app-secret зашифрованы. Поэтому оба значения необходимо ввести заново после обновления!

В версии 0.7.1 были внесены лишь незначительные изменения в представление экземпляра.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.1 (2025-04-25)
* (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)
* (raschy) NodeJS >= 20.x and js-controller >= 6 is required
* (raschy) email and appsecret is now encrypted, please re-enter!

### 0.6.4 (2025-02-06)
* (raschy) Developer system to nodejs 22.x updated

### 0.6.3 (2025-01-02)
* (raschy) Design edited
* (raschy) Migration from ESLint 8.x to 9.x

### 0.6.2 (2024-11-08)
* (raschy) responsive-design customized
* (raschy) updated to adapter-core 3.2.2

### 0.6.1 (2024-08-15)
* (raschy)  renewed version without changes
* (raschy) 	Dependencies require minor releases

### 0.6.0 (2024-08-15)
* (raschy) 	Dependencies require minor releases

### 0.5.3 (2024-08-14)
* (raschy) 	Warning in schema corrected

### 0.5.2 (2024-08-10)
* (raschy) 	updated dependencies
* (raschy)  NodeJS >= 18.x and js-controller >= 5 is required

### 0.5.1 (2023-09-04)
* (raschy) Expanded number of modules

### 0.5.0 (2023-06-16)
* (raschy) Set selected values to zero

### 0.4.3 (2023-06-12)
* (raschy) Blacklist also deletes data points
* (raschy) Fixed error with multiple inverters

### 0.4.2 (2023-05-31)
* (raschy) Module selection activated

### 0.4.1 (2023-05-27)
* (raschy) Do not display devices that are not required

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

### 0.0.1 (2022-06-16)
* (raschy) initial release

## License
MIT License

Copyright (c) 2022-2025 raschy <raschy@gmx.de>

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