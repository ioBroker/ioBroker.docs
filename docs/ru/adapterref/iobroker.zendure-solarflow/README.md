---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-солнечный поток
hash: QcuyOrQ5FKmuYBqRjKELMk3WJ99VoW6xB2dgaBAKpzU=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker.zendure-solarflow
**Тесты:** ![Тестирование и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker
Этот проект представляет собой адаптер ioBroker для чтения данных из Zendure Solarflow Cloud API. Он использует официальный API, предоставленный Zendure.
Подробнее об API можно прочитать здесь: https://github.com/Zendure/developer-device-data-report.

Примечания:

1. Вам необходимо использовать глобальный сервер Zendure!

2. Ограничением вывода можно управлять с помощью состояния, созданного в подпапке productId/deviceKey/control. Пожалуйста, деактивируйте/снимите флажки со всех режимов в приложении Zendure, иначе установить ограничение вывода невозможно!

   ![Окно настроек Solarflow](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

3. После входа в систему с помощью адаптера ioBroker вы выйдете из официального приложения iOS или Android. Это нормальное поведение. В качестве обходного пути вы можете создать вторую учетную запись Zendure с другим адресом электронной почты и предоставить этой учетной записи доступ к вашему Solarflow HUB. Затем используйте вторую учетную запись для ioBroker/адаптера Zendure Solarflow.

## Кредиты
Благодарность передается по адресу https://github.com/reinhard-brandstaedter/solarflow, который очень помог мне получить знания о сервере MQTT от Zendure! Спасибо!

## Пожертвовать
Если вы считаете адаптер полезным для себя и хотите поддержать мою работу, сделайте пожертвование через Paypal. Спасибо! (это персональная ссылка для пожертвований для Nograx, не имеющая отношения к проекту ioBroker!)<br />

## Changelog
### 1.1.4 (2024-02-28)

- Fix timeout issues

### 1.1.0 (2024-02-27)

- Switched solar input 1 und 2 to adjust the behavior like the offical app
- Added Calculations folder, remaining charge and discharge time is now available as formatted time
- Added a note in the settings that this adapter only works with the global server

### 1.0.7 (2024-01-16)

- Add control for charge and discharge limit
- Update Readme Screenshot

### 1.0.6 (2024-01-16)

- Update Readme

### 1.0.5 (2024-01-15)

- Added state for both Solarflow PV inputs

### 1.0.4 (2023-12-16)

- Added Timeout for axios

### 1.0.3 (2023-12-12)

- Password is now encrypted. NOTE: You have to re-enter the password after adapter update!

### 1.0.2 (2023-12-12)

- Adapter improvements suggested by iobroker team
- Fixed battery pack temperature (data is in kelvin, so now converting to celcius)

### 1.0.1 (2023-11-03)

- Fix translations
- Use 'extendObjectAsync' instead of 'setObjectNotExistsAsync'
- First official release version

### 0.1.0-alpha.2 (2023-10-27)

- Don't stop the adapter when no login information is provided!

### 0.1.0-alpha.1 (2023-10-27)

- Fix Typescript typos

### 0.1.0-alpha.0 (2023-10-26)

- Get battery information
- Reset states if no new data comes in (e.g. when Hub goes offline). Currently the last value still persist when Hub goes offline, so you may have 'pseudo' data in your states.

### 0.0.2 (2023-10-25)

- Initital Release, retrieving Hub data, telemetry and setting the output limit works!

### 0.0.1 (2023-10-24)

- First test

## License

MIT License

Copyright (c) 2024 Peter Frommert

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