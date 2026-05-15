---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: BT6fq8xLzzR6Bd5pWDJ1gjLaIyPhg+Q15p/ibrt8wCo=
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
- **Ключ для аутентификации в облаке** Официальный метод, поддерживаемый Zendure. Получите ключ Cloud Key из официального приложения. По умолчанию используется zenSDK (устройство должно находиться в той же сети, что и экземпляр ioBroker). Вы можете отключить использование только облачного режима. Для старых устройств с MQTT, настроенным на локальный сервер, теперь возможна передача данных в облако без каких-либо недостатков!

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
Если вы планируете управлять зарядкой и подачей электроэнергии к вашему устройству с помощью скрипта/blockly, я рекомендую использовать параметр управления '**setDeviceAutomationInOutLimit**', поскольку он управляет устройством без записи во флэш-память устройства. Вы можете использовать отрицательные значения для запуска зарядки от сети.

## Примечания
Этот адаптер будет использовать код авторизации облака для аутентификации на официальных серверах MQTT, который вы можете сгенерировать в приложении Zendure!

<!-- Заполнитель для следующей версии (в начале строки):

## **РАБОТА В ПРОЦЕССЕ** -->

## Changelog

### **WORK IN PROGRESS**

- (copilot) Adapter requires node.js >= 22 now

### 4.0.4 (2026-04-14)

- Update dependencies

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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