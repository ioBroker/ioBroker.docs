---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: c3DmJYPWQwerYAa0WbrhSn3L8lZgLwvu7/CVALoa6nI=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Тесты:** ![Тестирование и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker
Этот проект представляет собой адаптер ioBroker для чтения данных из облачного API Zendure Solarflow.

## Пожертвовать
Если этот адаптер окажется для вас полезным и вы захотите поддержать мою работу, пожалуйста, сделайте пожертвование через PayPal. Спасибо! (Это личная ссылка для пожертвований Nograx, не имеющая отношения к проекту ioBroker!)<br />

## Функции
— Получайте все телеметрические данные с ваших устройств Solarflow, включая те, которые не отображаются в официальном приложении, например, напряжение батареи.
— Управляйте устройствами Solarflow так же, как и в официальном приложении. Большинство настроек доступны.
— Контролируйте ограничения на входе и выходе — вы не ограничены использованием Shelly Pro EM для реализации нулевой подачи сигнала. Вы также можете проектировать более сложные сценарии с помощью скриптов или Blockly в ioBroker.
- Отключение входного сигнала при низком напряжении одной из батарей (защита батареи). Работает только при установке ограничения выходного напряжения через адаптер.
— Управляйте несколькими устройствами Solarflow одновременно!
— Получите более точные расчеты!
- Работает со всеми устройствами Zendure SolarFlow!
- **Интеграция с zenSDK**: Расширенные возможности связи для совместимых устройств через локальный HTTP-интерфейс.
- **Передача сообщений MQTT в облако**: Устройство полностью контролируется локально, и данные передаются в Zendure MQTT. Вы не потеряете контроль, если интернет-соединение прервется или серверы Zendure будут недоступны.

## Поддерживаемые устройства
В настоящее время все устройства Zendure Solarflow поддерживаются через облако.

## Режимы
- **Ключ аутентификации Cloud Key** Официальный метод, поддерживаемый Zendure. Получите ключ Cloud Key из официального приложения. По умолчанию используется zenSDK (устройство должно находиться в той же сети, что и экземпляр ioBroker). Вы можете отключить использование только облачного режима. Для старых устройств с MQTT, настроенным на локальный сервер, теперь возможна передача данных в облако без каких-либо недостатков!

- **Локальный MQTT** Также возможен локальный режим. В настоящее время для новых устройств Solarflow нет известного способа установить MQTT-сервер непосредственно на устройстве, поэтому для них необходимо использовать DNS-ретранслятор.

### Устройства, совместимые с zenSDK ✅
Эти устройства поддерживают расширенные функции автоматизации zenSDK с полным **локальным** управлением по протоколу HTTP:

- **Solarflow 1600 AC Plus** - Полная поддержка zenSDK
- **Solarflow 2400 AC** - Полная поддержка zenSDK
- **Solarflow 2400 AC Plus** - Полная поддержка zenSDK
- **Solarflow 2400 Pro** - Полная поддержка zenSDK
- **Solarflow 800** - Полная поддержка zenSDK
- **Solarflow 800 Plus** - Полная поддержка zenSDK
- **Solarflow 800 Pro** - Полная поддержка zenSDK

### Устаревшие устройства 🔄
Поддержка этих устройств осуществляется в **локальном** режиме MQTT (Zendure Cloud Disconnector):

- **HUB 1200** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **HUB 2000** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **Hyper 2000** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **AIO 2400** - Поддержка локального режима, возможность передачи сообщений в облако.
- **ACE 1500** - Поддержка локального режима, возможность передачи сообщений в облако.

### Преимущества локального режима 🏠
«Устаревшие» устройства можно полностью отключить от Zendure Cloud, сохранив при этом всю их функциональность:

- **Конфиденциальность**: Данные не передаются на серверы Zendure.
- **Надежность**: Прямая локальная связь по протоколу MQTT.
- **Скорость**: Более быстрое время отклика без задержек, связанных с облачными сервисами.
- **Гибкость**: Возможность передачи сообщений в облако при необходимости.
- **Управление**: Полная локальная автоматизация без зависимости от интернета.
- **Обновления**: Вы по-прежнему можете обновлять прошивку с помощью официального приложения Zendure через Bluetooth.

## Автономный режим (отключение от Zendure Cloud)
В качестве новой функции вы можете отключить устройство Zendure от облака. Для этого можно использовать [Solarflow Bluetooth Manager от Райнхарда Брандштеттера (https://github.com/reinhard-brandstaedter/solarflow-bt-manager) или мой собственный инструмент для Windows [Zendure Cloud Disconnector].](https://github.com/nograx/zendure-cloud-disconnector). Также можно перенаправлять DNS-запросы с вашего маршрутизатора с "mq.zen-iot.com" на ваш собственный MQTT-сервер!

Оба инструмента подключаются к устройству Zendure через Bluetooth и просто устанавливают внутренний URL-адрес MQTT на новый URL/IP-адрес, который вам необходимо указать. В настоящее время вы вынуждены использовать порт MQTT по умолчанию 1883 на вашем сервере. Вам также необходимо отключить аутентификацию на сервере MQTT, поскольку устройство Zendure использует жестко закодированный пароль.

Вы можете использовать это в сочетании с ключом облачной аутентификации или в полном локальном режиме.

## Важный
Если вы планируете управлять зарядкой и подачей электроэнергии к вашему устройству с помощью скрипта/blockly, я рекомендую использовать параметр управления '**setDeviceAutomationInOutLimit**', поскольку он управляет устройством без записи в флэш-память устройства. Вы можете использовать отрицательные значения для запуска зарядки от сети.

## Примечания
Этот адаптер будет использовать код авторизации облака для аутентификации на официальных серверах MQTT, который вы можете сгенерировать в приложении Zendure!

## Changelog
### 4.0.3 (2026-03-31)

- Fix missing ip address field in settings for local mode
- Add retry loop for zenSDK requests (retry 3 times if connection failed)
- Update battery detection

### 4.0.2 (2026-03-24)

- Re-add new SF devices to local mode settings
- Add product key '64174u' for Solarflow 1600 AC+

### 4.0.1 (2026-03-20)

- Fix missing smartMode state for Solarflow AC 2400 and Solarflow 800

### 4.0.0 (2026-03-17)

- Add support for zenSDK! All devices can now communicate in the local network (with full cloud support for backup and maintenance)
- Add possibility to relay local MQTT messages to Zendure cloud!
- Save device list from Zendure Cloud as a local backup if cloud is unavailable
- Major refactor and improvements
- Fix 'packPower' not correctly set (resetting to 0 every new data package)

### 3.6.0 (2026-03-06)

- Fix packInputPower & outputPackPower on new Solarflow devices
- Fix device constructor in local mode
- Fix setDeviceAutomationInOutLimit for Solarflow 1600 AC+
- Read more data from Zendure WebService
- Set ACK flag correctly for hemsEP function
- Refactor some files

### 3.5.4 (2026-03-05)

- Add device key '65174u' for Solarflow 1600 AC+

### 3.5.3 (2026-03-01)

- Fix setDeviceAutomationInOutLimit on certain HEMS devices like 2400 AC(+)

### 3.5.2 (2026-02-28)

- Add productKey '5fG27j' for Solarflow 2400 AC+

### 3.5.1 (2026-02-19)

- Try to update state only if state exist for this device
- Improved error handling

### 3.5.0 (2026-02-18)

- Add productKey '2Qe7C9' for Solarflow 2400 Pro
- Add event handler (log message) for MQTT disconnect

### 3.4.0 (2026-02-16)

- Add productKey '8n77V3' for Solarflow 800 Plus
- Remove passMode, pass and buzzerSwitch from Hyper 2000

### 3.3.2 (2026-02-02)

- Fix another 'has no existing object' message bug on pvPower3 + 4
- Fix Battery identification of AB2000X and calculation of 'energyWhMax'
- Fix Battery identification of AB3000 and calculation of 'energyWhMax'

### 3.3.1 (2026-01-30)

- Fix calculation issue

### 3.3.0 (2026-01-30)

- Fix 'has no existing object' messages on pvPower3 + 4
- Fix AC input limit of SF 800 Pro

### 3.2.2 (2025-12-21)

- Fix reset of calculation states if PV3+4 (SF 800 Pro)

### 3.2.1 (2025-12-17)

- Fix setDeviceAutomation charging mode

### 3.2.0 (2025-12-17)

- Fix inputLimit on certain devices
- Fix calculation of PV3 & 4 again (hopefully now 100%)
- Add some more specific debug messages
- Remove misleading error message on adapter start
- Replace restart on checkStatesJob with a debug message (I think Zendure cloud is stable now)
- Update adapter to adapter-react-v5 (MUI v5)
- Fix commandbar in settings

### 3.1.1 (2025-12-01)

- Fix Uppercase 'a4ss5p' in helpers.ts

### 3.1.0 (2025-12-01)

- Fix setInputLimit (always use positive value!)
- Add calculation states for PV3 & PV4 (used by SF 800 Pro)

### 3.0.8 (2025-10-22)

- Fix missing smartMode state for SF 800 Pro

### 3.0.7 (2025-10-20)

- Fix creation of SF 800 Pro device

### 3.0.5 (2025-10-20)

- Add some more log information on device creation

### 3.0.4 (2025-10-09)

- Fix inputLimit issue
- Fix Wifi status not updating when packData changes

### 3.0.3 (2025-10-07)

- Optimize setting of wifiMode in local mode
- Optimize Debug option

### 3.0.2 (2025-10-06)

- Ignore 'wifiState' for last update value

### 3.0.1 (2025-10-02)

- Update 'lastUpdate' when a battery value changes
- Add deviceKey 'R3mn8U' for Solarflow 800 Pro

### 3.0.0 (2025-09-30)

- Breaking Change: Change authentication to "authentication cloud key". You can generate a key in the official zendure app
- Removed fallback server
- Add deviceKey 'a4ss5P' for Solarflow 800
- Refactor a lot of code

### 2.0.4 (2025-09-12)

- Fix creation of control states on new Hyper 2000 v3
- Updates dependencies

### 2.0.3 (2025-09-09)

- Added 'B3Dxda' as new Hyper 2000 productKey
- Removed parameter 'upTime' and 'pullTime' from 'setDeviceAutomationInOutLimit'
- TEST: Use 'setDeviceAutomationInOutLimit' to let HUB1200/HUB2000 charge with connected ACE 1500

### 2.0.1 (2025-07-22)

- Small fix MQTT service

### 2.0.0 (2025-07-21)

- Breaking Change: Add control parameter 'setDeviceAutomationInOutLimit' which emulates Zendure's Smart Matching mode. I recommend using this device automation instead of 'setInputLimit'/'setOutputLimit' from now on, as there were concerns that setting limits/modes would be stored in the flash memory. You can use negative values for charging and positive for feed in. On HUB 1200/2000 with ACE 1500 you can use "smartMode" to prevent switching AC mode trigger writing to the flash memory. Check you the readme for more details or participate in the ioBroker forum.

### 1.15.4 (2025-07-17)

- Add smart mode control parameter for more devices

### 1.15.3 (2025-07-17)

- Match case sensitive product key for SF 2400 AC and SF 800 in settings if local mode is used
- Add sensor and control of "SmartMode"

### 1.15.2 (2025-07-14)

- Fix missing SF 800 & 2400 AC in local mode settings

### 1.15.1 (2025-07-11)

- Fix missing Solar Input 3 & 4 on Solarflow 800 Pro
- Fix 'packPower' state did not set to 0 if no input/output

### 1.15.0 (2025-06-27)

- Add 'packPower' state, which shows combined power from (packInputPower and outputPackPower). Discharging will be shown with a negative value.
- Add 'hyperTmp' to Solarflow 800 devices in hope this will show the temperature of the Solarflow 800 (can not test it due to lack of test device).

## License

MIT License

Copyright (c) 2026 Peter Frommert

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