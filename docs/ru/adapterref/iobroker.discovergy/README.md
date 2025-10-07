---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: JrTgb6QHbY0ilsnijYvzoCe9QUeb4wCl0Zi3TKn78kc=
---
![альтернативный текст](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![альтернативный текст](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Количество установок](http://iobroker.live/badges/discovergy-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Это адаптер ioBroker для вашего счётчика электроэнергии Discovery Power.
Он использует API Discovergy для считывания данных с ваших счётчиков и синхронизации их текущих значений с ioBroker.

https://api.discovergy.com/docs/

Не стесняйтесь добавлять описание желаемой вами функциональности или проблем, которые вы видите, чтобы я мог их рассмотреть!

Примечание: У меня нет всех возможных устройств, и демо-аккаунт не предоставляет все существующие значения, которые могут предоставить устройства.
Если вы получили следующую ошибку:

Информация, полученная от Discovery, которая пока не является частью этого адаптера. «Отправить эту информацию разработчику: xxxxx

Пожалуйста, перейдите к своему лог-файлу и скачайте его, создайте issue здесь на GitHub с предоставленными значениями.
Не копируйте и не вставляйте данные из веб-интерфейса администратора, здесь отсутствует необходимая мне информация!

Вы можете протестировать этот адаптер, используя демонстрационные учетные данные discoverygy (или свои собственные :-)): имя пользователя = demo@inexogy.com пароль = demo

## Поддержи меня
Если вам понравилась моя работа, не стесняйтесь сделать личное пожертвование (это персональная ссылка для пожертвований для DutchmanNL, не имеющая никакого отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Участники
* АльКальцоне
* зоернерт

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **ENHANCED**: Updated GitHub Copilot instructions to latest template version 0.4.0 with comprehensive testing framework patterns and enhanced development guidelines. Fixes #287
* (DutchmanNL) **FIXED**: Repository checker issues - deprecated methods replaced and VSCode configuration improved
* (DutchmanNL) **ENHANCED**: VSCode IntelliSense support for io-package.json and package.json validation
* (DutchmanNL) **NEW**: Added comprehensive API testing with demo credentials to ensure adapter reliability
* (DutchmanNL) **FIXED**: Critical bug where adapter would always show "credentials missing" even with valid credentials - now properly validates user login
* (DutchmanNL) **ENHANCED**: Demo testing now includes proper password encryption matching ioBroker admin interface behavior
* (DutchmanNL) **TESTING**: New `npm run test:integration-demo` command validates full API connectivity with working demo credentials (`demo@inexogy.com` / `demo`)
* (DutchmanNL) **CI/CD**: Automated testing ensures adapter connects properly to Discovergy/Inexogy API and initializes meters successfully

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
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

## License
MIT License

Copyright (c) 2025 DutchmanNL

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