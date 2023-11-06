---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: 1Nr1cgwlVRa80FxerZJGSIxk11/GXMQFME3TV9m0Z0U=
---
![альтернативный текст](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![альтернативный текст](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Количество установок](http://iobroker.live/badges/discovergy-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Это адаптер ioBroker для вашего измерителя мощности Discovery.
Он использует API Discovergy для считывания данных ваших счетчиков и синхронизации их текущих значений с ioBroker.

https://api.discovergy.com/docs/

Пожалуйста, не стесняйтесь добавлять проблемы, связанные с желаемыми функциями или проблемами, которые вы видите, чтобы я мог взглянуть на них!

Примечание: у меня нет всех возможных устройств, а также демо-счет не предоставляет все существующие значения, которые могут предоставить устройства.
Если вы получили следующую ошибку:

Информация, полученная от Discovery, которая еще не является частью этого адаптера" "Отправьте эту информацию разработчику: xxxxx

Пожалуйста, перейдите в свой файл журнала и загрузите его, создайте проблему здесь, на github, с указанными значениями.
Не копируйте и вставляйте из веб-интерфейса администратора, здесь отсутствует информация, которая мне нужна!

Вы можете протестировать этот адаптер, используя демо-учетные данные Discovery (или свои собственные :-)): username = demo@discovergy.com pass = demo

## Поддержите меня
Если вам понравилась моя работа, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Авторы
* АльКальцоне
* зорнерт

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

### 0.5.11 (2023-10-27) - Bugfixes
* (DutchmanNL) Error handling improved in cases data processing fails
* (DutchmanNL) Fixes #214 #215 #200 #219 #220 #224 #229 #235 #236 #237 #238 #506 #507

### 0.5.8 (2021-08-17)
* (DutchmanNL) Minor dependency & configuration updates, stable release candidate

### 0.5.7 (2021-03-19)
* (DutchmanNL) Change why of password encryption, you my need to re-enter your credentials !
* (DutchmanNL) Bugfix : State "system.this.discovergy.0.alive" has no existing object, this might lead to an error in future versions

## License
MIT License

Copyright (c) 2023 DutchmanNL

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