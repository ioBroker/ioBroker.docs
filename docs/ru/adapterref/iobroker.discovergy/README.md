---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: roGuB5x3KGimTK00m/5ItkGhDBupE5vGzTG4diF/2kw=
---
![альтернативный текст](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![альтернативный текст](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Количество установок](http://iobroker.live/badges/discovergy-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Это адаптер ioBroker для вашего измерителя мощности Discovergy.
Он использует API Discovergy для чтения данных с ваших измерителей и синхронизации их текущих значений с ioBroker.

https://api.discovergy.com/docs/

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Пожалуйста, не стесняйтесь добавлять сообщения о проблемах или неполадках, которые вы обнаружили, чтобы я мог их рассмотреть!

Примечание: У меня нет всех возможных устройств, а также демонстрационный аккаунт не предоставляет всех существующих значений, которые могут предоставлять устройства.
Если вы получили следующую ошибку:

Информация, полученная от Discovergy, которая еще не является частью этого адаптера. "Отправить эту информацию разработчику: xxxxx"

Пожалуйста, откройте и скачайте свой лог-файл, создайте здесь проблему на GitHub, указав предоставленные значения.
Не копируйте и не вставляйте текст из веб-интерфейса администратора, здесь отсутствует необходимая мне информация!

Вы можете протестировать этот адаптер, используя демонстрационные учетные данные Discovery (или свои собственные :-)): имя пользователя = demo@inexogy.com пароль = demo

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь сделать личное пожертвование (это личная ссылка для пожертвований DutchmanNL, не имеющая отношения к проекту ioBroker!). [![[Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Участники
* АльКальцоне
* zoernert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) **FIXED**: Removed non-existent version 0.6.1 from changelog to comply with ioBroker repository checker requirements (E2004)
* (DutchmanNL) **ENHANCED**: Cleaned up common.news entries in io-package.json to maintain only published versions

### 0.7.0 (2026-02-15)
* (DutchmanNL) release fixes and improvements in 0.7.0, resolved #316 #313

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL

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