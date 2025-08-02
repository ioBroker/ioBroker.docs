---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: oUHjm0l2gox7du7bio9yb01Ho+BUKdegEe8BVpEQ3Ww=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Тесты:** ![Тест и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker
Этот проект представляет собой адаптер ioBroker для чтения данных из API Zendure Solarflow Cloud.

## Пожертвовать
Если вы найдете этот адаптер полезным для себя и захотите поддержать мою работу, не стесняйтесь сделать пожертвование через Paypal. Спасибо! (это персональная ссылка для пожертвований для Nograx, не имеющая никакого отношения к проекту ioBroker!)<br />

## Функции
- Получайте все телеметрические данные с ваших устройств Solarflow, включая те, которые не отображаются в официальном приложении, например, напряжение батареи.
- Управляйте Solarflow HUB как в официальном приложении. Большинство настроек доступны.
- Управляйте пределом выхода - вы не ограничены использованием Shelly Pro EM для реализации нулевой подачи. Вы также можете разрабатывать более сложные сценарии через скрипт или блок в ioBroker.
- Остановка входа, если напряжение одной батареи падает до низкого уровня (защита батареи). Работает только при установке выходного предела через адаптер
- Управляйте несколькими Solarflow одновременно!
- Получите более точные расчеты!
- Работает со всеми устройствами Zendure SolarFlow: HUB1200, Hyper2000, HUB2000 и AIO!

## Офлайн-режим (отключение от Zendure Cloud)
В качестве новой функции вы можете отключить устройство Zendure от облака. Вы можете использовать [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) от Райнхарда Брандштеттера или мой собственный инструмент для Windows [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector), чтобы отключить устройство от облака. Также возможно перенаправлять DNS-запросы с вашего маршрутизатора с "mq.zen-iot.com" на ваш собственный сервер MQTT!

Оба инструмента подключаются к устройству Zendure через Bluetooth и просто задают внутренний URL-адрес MQTT на новый URL-адрес/IP-адрес, который вы должны предоставить. В настоящее время вы вынуждены использовать порт MQTT по умолчанию 1883 на вашем сервере. Вы также вынуждены деактивировать аутентификацию на сервере MQTT, поскольку устройство Zendure использует жестко закодированный пароль.

Если устройство Zendure взаимодействует с вашим сервером MQTT, вы можете подключить этот адаптер ioBroker к тому же экземпляру MQTT. Вам необходимо указать модель устройства и ключ устройства (который отображается в приложении Zendure Cloud Disconnector).

Вы по-прежнему можете обновлять прошивку с помощью официального приложения Zendure через Bluetooth и использовать оба инструмента Bluetooth для повторного подключения устройства к облаку!

## Примечания
1. Пожалуйста, деактивируйте/снимите флажки со всех режимов в приложении Zendure, в противном случае невозможно будет установить предел выходной мощности!

   ![Окно настроек Solarflow](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. Вы выйдете из официального приложения iOS или Android после входа с помощью адаптера ioBroker. Это нормальное поведение. В качестве обходного пути вы можете создать вторую учетную запись Zendure с другим адресом электронной почты и предоставить доступ к Solarflow HUB этой учетной записи. Затем используйте вторую учетную запись для ioBroker / адаптера Zendure Solarflow.

## Кредиты
Благодарность за это выражается https://github.com/reinhard-brandstaedter/solarflow, который очень помог со знаниями о сервере MQTT от Zendure! Спасибо!

## Changelog
### 1.14.3 (2025-06-09)

- Fix input and output limit for Solarflow 2400 AC

### 1.14.2 (2025-06-07)

- Fix control states not writable.

### 1.14.1 (2025-06-07)

- IMPORTANT: This version will use a new way to check which states should be created for the device, so maybe something is broken on state creation!
- Add support for AC2400, Solarflow 800 and Solarflow 800 Pro. All devices are untested as Zendure won't allow to share data to other users on these new devices AND I don't own any of the devices!
- Removed the "standby usage" on batteries, as it confused some people.

### 1.13.2 (2025-05-07)

- Fix AC Mode showing unknown parameter on ACE 1500

### 1.13.1 (2025-05-05)

- TEST: Set Smart CT Mode and Smart Matching Mode correctly - Feedback needed!
- Removed efficiency from calculation, as it seems Zendure already included it in charge and discharge values

### 1.13.0 (2025-04-30)

- Add possibility to deactivate automatic restart of adapter in adapter settings (recommended only on local mode!)
- Fixed missing control state "hubState"

### 1.12.7 (2025-03-24)

- Add productKey "gDa3tb" for Hyper 2000

### 1.12.6 (2025-03-21)

- Fix onMessage Debug message

### 1.12.5 (2025-03-21)

- Add Debug messages on log level debug
- Add schedule for adapter refresh on local mode
- Fix Change of Discharge limit to 0

### 1.12.4 (2025-03-19)

- Fix calculation of SOC if "local" mode is used

### 1.12.3 (2025-03-19)

- Add 2 more devices if "local" mode is used
- Fix mqtt subscription of 2. device in "local" mode

### 1.12.2 (2025-03-18)

- Fix reset of calculation values on "local" mode

### 1.12.1 (2025-03-17)

- Fix IOT subscription

### 1.12.0 (2025-03-17)

- Added possibility to use "local" mode. You have to either route dns request to your own MQTT server or use a tool to modify the Zendure device
- Some improvements on value calculation
- Some improvements on AIO 2400 device

### 1.11.0 (2025-02-11)

- Drop Standby usage to 7W and 14W if HUB connected with ACE as it is more accurate
- Added heatState and autoModel (system operation mode) state
- Added possibility to set the operation mode (autoModel)
- Fix gridPower state

### 1.10.7 (2025-01-21)

- Fix reset calculation values of ACE if connected to HUB

### 1.10.6 (2025-01-16)

- Fix start of calculation if HUB is connected with Ace

### 1.10.4 (2025-01-14)

- Fix "Grid Input Power" state if connected with Ace

### 1.10.1 (2025-01-06)

- Fix input limit when hub is bundled with ace
- Fix calculation when low voltage block is activated

### 1.10.0 (2024-12-02)

- Add setting to perform a full charge if SOC from Zendure is greater than 50% when on low voltage
- Bugfixes

### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

## License

MIT License

Copyright (c) 2025 Peter Frommert

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