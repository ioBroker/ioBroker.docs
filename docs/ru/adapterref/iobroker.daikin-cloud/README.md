---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: cSKtpMuG2tBxU9KOMdGSFWUyWjlyg0ikhHEA6FvDiO0=
---
![Логотип](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Количество установок](http://iobroker.live/badges/daikin-cloud-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Адаптер daikin-cloud для ioBroker
Управляйте устройствами Daikin, которые подключены только к Daikin Cloud/приложению Onecta. Адаптер подключается к Daikin-Cloud и запрашивает оттуда данные.

## Отказ от ответственности
**Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения с их стороны или любых связанных с ними дочерних компаний! Этот личный проект поддерживается в свободное время и не преследует никаких коммерческих целей.** **Daikin является торговой маркой DAIKIN INDUSTRIES, LTD.**

## Совместимость
Этот адаптер должен быть совместим с устройствами с адаптерами WLAN Daikin **BRP069C4x**, которыми можно управлять через приложение Daikin Onecta. Локальное подключение к этим устройствам невозможно!

Примечание. Для устройств с более старыми адаптерами WLAN, такими как **BRP069A4x**, которые можно использовать только с помощью приложения Daikin Controller, вместо этого используйте адаптер [Дайкин](https://github.com/Apollon77/ioBroker.daikin).

## Функциональность
Новые устройства Daikin, продаваемые с 2020 года, содержат новый адаптер Wi-Fi (например, BRP069C4x), который подключается только к облаку Daikin и больше недоступен локально. Этими устройствами можно управлять только с помощью приложения Daikin Onecta.

Этот адаптер позволяет первоначально (надеюсь, один раз) получить токены с помощью прокси-сервера для входа в облако Daikin. После этого эти токены можно использовать и обновлять для взаимодействия с устройствами.

После подключения к учетной записи Daikin Cloud адаптер автоматически создаст новое устройство для каждого устройства, подключенного к Daikin Cloud. Отображаются все доступные данные и несколько состояний позволяют управлять устройством.
**Обратите внимание, что скорость выполнения команд в облаке Daikin не очень высокая. Это означает, что может пройти до 3 минут, прежде чем команда действительно будет выполнена или состояния обновятся!**

### Вход через адрес электронной почты/пароль
Если вы хотите предоставить учетные данные Daikin Cloud Credentials, адаптер может попытаться автоматически войти в облако. Электронная почта и пароль хранятся в конфигурации в зашифрованном виде.

Может случиться так, что этот процесс не сработает, потому что веб-сайт Daikin требует от вас ввести код проверки. В этой банке вы можете использовать следующий трюк:

* Запустите прокси через настройку адаптера в администраторе.
* Нажмите на QR-код во всплывающем окне прокси.
* Вам **не** нужно импортировать сертификат!
* Просто нажмите ссылку «Войти в Daikin Cloud, чтобы получить токены» в конце страницы инструкций, войдите туда один раз и решите капчу.
* Закройте окно браузера и перезапустите адаптер.

### Вход через прокси
**Дополнительную информацию о ходе работы прокси-сервера для конечных пользователей (поскольку вам необходимо доверять и вносить в белый список сертификаты и тому подобное) можно найти в [ПРОКСИ.md](PROXY.md)!** Информация: Этот проект не захватывает ни имя пользователя, ни пароль, а только создали токены после того, как вы вошли в систему. Это также означает, что если Daikin сбросит токены или срок их действия истечет, вам придется повторить этот процесс снова!

## Отказ от ответственности
**Daikin является торговой маркой компании DAIKIN INDUSTRIES, LTD. Я никоим образом не одобрен и не связан с DAIKIN INDUSTRIES, LTD. или какими-либо связанными с ней дочерними компаниями, логотипами или товарными знаками. Этот персональный проект поддерживается в свободное время.**

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Make electrical data available as states (arrays for now)
* (Apollon77) Restore last data updated timestamp
* (Apollon77) Make sure cloudConnection always contains a boolean
* (Apollon77) Refresh token also when error is "Refresh Token has expired"

### 0.3.0 (2023-08-23)
* (Apollon77) Make compatible with Node.js 18+ too
* (Apollon77) Adjust name fallback

### 0.2.3 (2022-09-12)
* (Apollon77) Clear the tokenset when email or password is changed in config

### 0.2.2 (2022-08-13)
* (Apollon77) Add naming support for devices using old WLAN adapters but updated for Onecta

### 0.2.1 (2022-07-03)
* (Apollon77) Fix the device info and count for connected devices in Admin UI

### 0.2.0 (2022-06-30)
* (Apollon77) Add name lookup for Altherma devices
* (Apollon77) Send data to Sentry on unknown device types

### 0.1.4 (2022-06-28)
* (Apollon77) Adjust logging on Login to be more clear

### 0.1.3 (2022-06-03)
* (Apollon77/Garfonso) Optimizations and fixes

### 0.1.2 (2022-05-27)
* (Apollon77) Prevent crash reported by Sentry

### 0.1.1 (2022-05-23)
* (Apollon77) Add Sentry for crash reporting

### 0.1.0 (2022-05-23)
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2022-2023 Apollon77 <iobroker@fischer-ka.de>

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