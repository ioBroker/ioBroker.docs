---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: DZuP+0B2Q62XEToyzjxTwo5xmgbDp4XOf6iQq/eTGvA=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Тесты:** ![Тестирование и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker
Этот проект представляет собой адаптер ioBroker для чтения данных из API Zendure Solarflow Cloud.

## Пожертвовать
Если вы найдете этот адаптер полезным и захотите поддержать мою работу, не стесняйтесь сделать пожертвование через PayPal. Спасибо! (Это персональная ссылка для пожертвований Nograx, не имеющая никакого отношения к проекту ioBroker!)<br />

## Функции
- Получайте все телеметрические данные с ваших устройств Solarflow, включая те, которые не отображаются в официальном приложении, например, напряжение батареи.
- Управляйте Solarflow HUB так же, как в официальном приложении. Большинство настроек доступны.
- Управляйте ограничением выходного сигнала — вы не ограничены использованием Shelly Pro EM для реализации нулевой подачи. Вы также можете разрабатывать более сложные сценарии с помощью скрипта или блочно в ioBroker.
- Отключение питания при падении напряжения на одной из батарей (защита батареи). Работает только при установке ограничения выходного напряжения через адаптер.
- Управляйте несколькими Solarflow одновременно!
- Получите более точные расчеты!
- Работает со всеми устройствами Zendure SolarFlow: HUB1200, Hyper2000, HUB2000 и AIO!

## Автономный режим (отключение от Zendure Cloud)
Новая функция позволяет отключить устройство Zendure от облака. Для этого можно использовать [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) от Райнхарда Брандштеттера или мой собственный инструмент для Windows [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector). Также можно перенаправлять DNS-запросы с mq.zen-iot.com на ваш MQTT-сервер с помощью маршрутизатора!

Оба инструмента подключаются к устройству Zendure через Bluetooth и просто задают внутренний URL-адрес MQTT на новый URL/IP-адрес, который вы должны предоставить. В настоящее время вы вынуждены использовать порт MQTT по умолчанию 1883 на вашем сервере. Вам также придётся отключить аутентификацию на сервере MQTT, поскольку устройство Zendure использует жёстко заданный пароль.

Если устройство Zendure взаимодействует с вашим MQTT-сервером, вы можете подключить этот адаптер ioBroker к тому же экземпляру MQTT. Необходимо указать модель устройства и ключ устройства (который отображается в приложении Zendure Cloud Disconnector).

Вы по-прежнему можете обновлять прошивку с помощью официального приложения Zendure через Bluetooth и использовать оба инструмента Bluetooth для повторного подключения устройства к облаку!

## Важный
Если вы планируете управлять зарядкой и питанием устройства с помощью скрипта/блока, рекомендую использовать параметр управления **setDeviceAutomationInOutLimit**, так как он управляет устройством без записи данных во флеш-память. Также рекомендуется установить состояние управления **smartMode** в значение true, если у вас HUB 1200/2000 с ACE 1500, так как это также заставит устройство записывать изменения acMode в оперативную память, а не во флеш-память.

### Hyper 2000, SF 2400 AC или SF 800 (про)
На таких устройствах, как Hyper 2000, SF 2400 AC или SF 800 (pro), вы можете использовать отрицательные значения для запуска зарядки от сети. SF 2400 AC или SF 800 (pro) в настоящее время **не протестированы**!

### HUB 1200 / HUB 2000 / ACE 1500 Combo
В сочетании HUB 1200 / HUB 2000 / ACE 1500 необходимо использовать **setDeviceAutomationInOutLimit** для подачи питания и вручную переключать acMode и **setInputLimit**, если требуется зарядка от сети. В этом случае настоятельно рекомендуется установить **smartMode** в значение true!

## Примечания
После входа через адаптер ioBroker вы будете выходить из официального приложения для iOS или Android. Это нормальное явление. В качестве обходного решения вы можете создать вторую учётную запись Zendure с другим адресом электронной почты и предоставить ей доступ к Solarflow HUB. Затем используйте вторую учётную запись для ioBroker/адаптера Zendure Solarflow. Эта функция не работает на новых устройствах, таких как SF 2400 AC или SF 800 (Pro).

## Кредиты
Спасибо https://github.com/reinhard-brandstaedter/solarflow за большую помощь с изучением MQTT-сервера от Zendure! Спасибо!

## Changelog
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