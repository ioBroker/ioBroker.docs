---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: oPC+1dN42Zn+sTz+k/q6Hbe4ylEhR9pHJuuK4MjJ+1M=
---
![Логотип](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Количество установок](http://iobroker.live/badges/daikin-cloud-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![Тестируйте и выпускайте](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер daikin-cloud для ioBroker
Управляйте устройствами Daikin, которые подключены только к облаку Daikin / приложению Onecta. Адаптер подключается к Daikin-Cloud и запрашивает оттуда данные.

**Этот адаптер можно установить со следующими версиями Node.js:**

* 12.19.0+
* 14.15.0+
* 16.13.0+
* Node.js 18 в настоящее время НЕ поддерживается, поскольку используемая библиотека OAuth не поддерживает его!

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения ими или какими-либо связанными с ними дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.** **Daikin является торговой маркой DAIKIN INDUSTRIES, LTD.**

## Совместимость
Этот адаптер должен быть совместим с устройствами с адаптерами Daikin WLAN **BRP069C4x**, которыми можно управлять через приложение Daikin Onecta. Локальное подключение к этим устройствам невозможно!

Примечание. Для устройств со старыми адаптерами WLAN, такими как **BRP069A4x**, которые могут использоваться только приложением Daikin Controller, используйте адаптер [Дайкин](https://github.com/Apollon77/ioBroker.daikin).

## Функциональность
Новые устройства Daikin, продаваемые с 2020 года, содержат более новый адаптер Wi-Fi (например, BRP069C4x), который подключается только к облаку Daikin и больше недоступен локально. Этими устройствами можно управлять только с помощью приложения Daikin Onecta.

Этот адаптер позволяет первоначально (надеюсь, один раз) получить токены с помощью прокси-сервера для входа в облако Daikin. После этого эти токены можно использовать и обновлять для взаимодействия с устройствами.

После подключения к учетной записи Daikin Cloud адаптер автоматически создаст новое устройство для каждого устройства, подключенного к Daikin Cloud. Отображаются все доступные данные и несколько состояний позволяют управлять устройством.
**Обратите внимание, что скорость выполнения команды в облаке Daikin не является сверхвысокой, а это означает, что до фактического выполнения команды или обновления состояний может пройти до 3 минут!**

### Войти через E-mail/пароль
Если вы хотите предоставить учетные данные Daikin Cloud, адаптер может попытаться автоматически войти в облако. Электронная почта и пароль хранятся в конфигурации в зашифрованном виде.

Может случиться так, что этот процесс не сработает, потому что веб-сайт Daikin требует от вас разгадать капчу. В этом случае вы можете использовать следующий трюк:

* Запустите прокси через Adapter-Configuration в Admin
* Нажмите на QR-код во всплывающем окне прокси.
* Вам **не** нужно импортировать сертификат!
* Просто нажмите ссылку «Войти в облако Daikin для получения токенов» в конце страницы с инструкциями, войдите туда один раз и решите капчу.
* Закройте окно браузера и перезапустите адаптер

### Вход через прокси
**Дополнительную информацию о прогрессе прокси-сервера для конечных пользователей, поскольку вам нужно доверять сертификатам и вносить их в белый список, можно найти в [ПРОКСИ.мд](PROXY.md)!** Информация: этот проект не захватывает имя пользователя или пароль, только создал токены после того, как вы вошли в систему. Это также означает, что если Daikin сбросит токены или срок их действия истечет, вам нужно будет повторить этот процесс!

## Отказ от ответственности
**Daikin является товарным знаком DAIKIN INDUSTRIES, LTD. Я никоим образом не одобрен и не связан с DAIKIN INDUSTRIES, LTD. или какими-либо связанными дочерними компаниями, логотипами или товарными знаками. Этот личный проект поддерживается в свободное время.**

## Changelog
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

Copyright (c) 2022 Apollon77 <iobroker@fischer-ka.de>

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