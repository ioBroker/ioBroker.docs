---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: Zoocwnyr9uh94HXm6oj7ls5BjA0YkIMN3hO++ucFueI=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# ioBroker.zendure-solarflow

**Тесты:** ![Тестирование и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker

Этот проект представляет собой адаптер ioBroker для чтения данных из облачного API Zendure Solarflow.

## Пожертвовать

Если этот адаптер окажется для вас полезным и вы захотите поддержать мою работу, пожалуйста, сделайте пожертвование через PayPal. Спасибо! (Это личная ссылка для пожертвований Nograx, не имеющая отношения к проекту ioBroker!)<br />

## Функции

- Получайте все телеметрические данные с ваших устройств Solarflow, включая те, которые не отображаются в официальном приложении, например, напряжение батареи.
- Управляйте устройствами Solarflow так же, как и в официальном приложении. Большинство настроек доступны.
- Контролируйте пределы выходного и входного сигнала — вы не ограничены использованием Shelly Pro EM для достижения нулевого уровня входного сигнала. Вы также можете проектировать более сложные сценарии с помощью скриптов или Blockly в ioBroker.
- При низком напряжении одной из батарей (защита батареи) подача сигнала прекращается. Работает только при установке ограничения выходного напряжения через адаптер.
- Управляйте несколькими устройствами Solarflow одновременно!
- Получите более точные расчеты!
- Совместимо со всеми устройствами Zendure SolarFlow!
- **Интеграция zenSDK**Расширенные возможности связи для совместимых устройств посредством локального HTTP-соединения.
- **Пересылка сообщений MQTT в облако**Устройство полностью контролируется локально, и данные передаются в Zendure MQTT. Вы не потеряете контроль, даже если интернет-соединение прервется или серверы Zendure будут недоступны.

## Поддерживаемые устройства

В настоящее время все устройства Zendure Solarflow поддерживаются через облако.

## Режимы

- **Ключ аутентификации Cloud Key** Официальный метод, поддерживаемый Zendure. Получите ключ Cloud Key из официального приложения. По умолчанию используется zenSDK (устройство должно находиться в той же сети, что и экземпляр ioBroker). **Это рекомендуемый способ управления «новыми» (совместимыми с zenSDK) устройствами, поскольку он официально рекомендован самой компанией Zendure.** — Это обеспечивает полный локальный контроль, при этом данные по-прежнему передаются в облако. Вы можете отключить облачный режим. Для старых устройств с MQTT, настроенным на локальный сервер, теперь возможна передача данных в облако без каких-либо недостатков!

- **Локальный MQTT** Также возможен локальный режим. В настоящее время для новых устройств Solarflow нет известного способа установить MQTT-сервер непосредственно на устройстве, поэтому для них необходимо использовать DNS-ретранслятор.

### Обнаружение мДНС

При включении zenSDK адаптер также кратковременно после запуска просматривает локальную сеть через mDNS/Bonjour, чтобы обнаружить устройства Zendure, объявляющие себя как `Zendure-<model>-<serialNumber>`Это используется для:

- **Укажите или исправьте IP-адреса.**&#x415;сли устройство, известное из списка облачных устройств, не имеет IP-адреса, или IP-адрес в списке облачных устройств больше не совпадает с адресом, который устройство фактически объявляет в сети, это исправляется автоматически.
- **Автоматическое создание аксессуаров, доступных только в zenSDK.**&#x423;стройства серии Mix и оба интеллектуальных счетчика (см. ниже) не имеют известного облачного ключа продукта и вообще не могут быть созданы из списка облачных устройств. Вместо этого адаптер создает их непосредственно из объявления mDNS, используя их серийный номер в качестве внутреннего ключа устройства.

Устройства всегда сопоставляются по полному серийному номеру (полученному из имени службы mDNS), а не по IP-адресу или сокращенному суффиксу, поскольку некоторые серийные номера Zendure отличаются только несколькими первыми символами.

Эту функцию можно отключить с помощью параметра "Добавить устройства, найденные с помощью обнаружения mDNS".

### Устройства, совместимые с zenSDK ✅

> **Рекомендовано Zendure:** Для всех перечисленных ниже «новых» устройств использование zenSDK (через режим аутентификации с помощью облачного ключа, описанный выше) — это официально рекомендуемый компанией Zendure способ управления устройствами. Он обеспечивает полный локальный контроль по протоколу HTTP, сохраняя при этом облачное соединение для удобства — нет необходимости отключать эти устройства от облака.

Эти устройства поддерживают расширенные функции автоматизации zenSDK с полным набором возможностей. **местный** контроль над HTTP:

- **Solarflow 1600 AC Plus** - Полная поддержка zenSDK
- **Solarflow 2400 AC** - Полная поддержка zenSDK
- **Solarflow 2400 AC Plus** - Полная поддержка zenSDK
- **Solarflow 2400 Pro** - Полная поддержка zenSDK
- **Солнечная вода 800** - Полная поддержка zenSDK
- **Solarflow 800 Plus** - Полная поддержка zenSDK
- **Solarflow 800 Pro** - Полная поддержка zenSDK
- **Solarflow 3000 Mix AC+** - Полная поддержка zenSDK (ключ продукта для облачных сервисов пока неизвестен, добавлен через [обнаружение mDNS](#mdns-discovery) только)
- **Solarflow 4000 Mix AC+** - Полная поддержка zenSDK (ключ продукта для облачных сервисов пока неизвестен, добавлен через [обнаружение mDNS](#mdns-discovery) только)
- **Solarflow 4000 Mix Pro** - Полная поддержка zenSDK (ключ продукта для облачных сервисов пока неизвестен, добавлен через [обнаружение mDNS](#mdns-discovery) только)

### Аксессуары для умных счетчиков 📊

Это аксессуары zenSDK только для чтения, без состояний управления и без аккумуляторных батарей — они только передают данные измерений в реальном времени. Как и серия Mix, они не имеют известного облачного ключа продукта и добавляются через [обнаружение mDNS](#mdns-discovery) только:

- **Умный счетчик 3CT** - Отображает полную мощность на фазу (A/B/C) и общую мощность, измеренную с помощью трех трансформаторов тока.
- **Умный счетчик D0** - Передает данные измерений в реальном времени, считываемые с электросчетчика через его оптический интерфейс IEC 62056-21.

### Устаревшие устройства 🔄

Поддержка этих устройств осуществляется посредством **местный** Режим MQTT (Zendure Cloud Disconnector):

- **HUB 1200** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **HUB 2000** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **Гипер 2000** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **AIO 2400** - Поддержка локального режима, возможность пересылки сообщений в облако.
- **ACE 1500** - Поддержка локального режима, возможность пересылки сообщений в облако.

### Преимущества локального режима 🏠

«Устаревшие» устройства можно полностью отключить от Zendure Cloud, сохранив при этом всю их функциональность:

- **Конфиденциальность**Данные на серверы Zendure не отправлялись.
- **Надежность**: Прямая локальная связь по протоколу MQTT
- **Скорость**Более быстрое время отклика без задержек в облаке.
- **Гибкость**: Может передавать сообщения в облако при необходимости.
- **Контроль**Полная локальная автоматизация без зависимости от интернета.
- **Обновления**Вы по-прежнему можете обновлять прошивку с помощью официального приложения Zendure через Bluetooth.

## Автономный режим (отключение от Zendure Cloud)

В качестве новой функции вы можете отключить устройство Zendure от облака. Вы можете использовать либо... [Менеджер Bluetooth Solarflow](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) от Райнхарда Брандштеттера или из моей собственной программы для Windows. [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) Чтобы отключить устройство от облака, также можно перенаправлять DNS-запросы с вашего маршрутизатора с "mq.zen-iot.com" на ваш собственный MQTT-сервер!

**Примечание:** Solarflow Bluetooth Manager и Zendure Cloud Disconnector работают только для **Устаревшие устройства**. Для **zenSDK** Для таких устройств необходимо использовать перенаправление DNS, поскольку они не предоставляют доступ к настройкам MQTT-сервера через Bluetooth.

Оба инструмента подключаются к устройству Zendure через Bluetooth и просто устанавливают внутренний URL-адрес MQTT на новый URL/IP-адрес, который вам необходимо указать. В настоящее время вы вынуждены использовать порт MQTT по умолчанию 1883 (или 8883 с SSL) на вашем сервере. Вам также необходимо отключить аутентификацию на сервере MQTT, поскольку устройство Zendure использует жестко закодированный пароль.

Вы можете использовать это в сочетании с ключом облачной аутентификации или в полном локальном режиме.

## Важный

Если вы планируете управлять зарядкой и подачей питания вашего устройства с помощью скрипта/Blockly, я рекомендую использовать параметр управления '**setDeviceAutomationInOutLimit**', поскольку это позволяет управлять устройством без записи во флэш-память устройства. Вы можете использовать отрицательные значения для запуска зарядки от сети.

## Примечания

Этот адаптер будет использовать код авторизации облака для аутентификации на официальных серверах MQTT, который вы можете сгенерировать в приложении Zendure!

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 5.3.0 (2026-09-02)

- Add folder "settings" for zenSDK devices. Here you can turn device polling on/off and control the polling interval for individual devices.
- Round hyperTmp to nearest int.
- Adjust checkVoltage function to take account of the 24V architecture of the new Mix series.
- Start mDNS discovery start after fetching deviceList from Zendure cloud.
- Fix lower case bug in comparing product keys for new mDNS device creation

### 5.2.1 (2026-08-30)

- BREAKING: `setDeviceAutomationInOutLimit` on Hyper 2000 uses simulated HEMS now and requires `hemsState = 1` and `autoModel = 0` to control the device (automatically set by the adapter). Please check your control parameters (e.g. inverseMaxPower) after updating if you use setDeviceAutomationInOutLimit.
- Add support for Solarflow 3000/4000 Mix AC+ and 4000 Mix Pro via mDNS auto-discovery
- Add support for Smart Meter 3CT and Smart Meter D0 (read-only zenSDK accessories, with proper power state names/units and no control or packData states)
- Correct a device's IP via mDNS if it no longer matches the (stale or wrong) IP from the cloud device list
- Process zenSDK measurements reported directly on the response instead of nested under "properties" (affects Smart Meter 3CT/D0)
- Enable "mDNS discovery" by default, including for existing instances that never had this setting saved - you must disable this option in settings if not desired


### 5.1.0 (2026-08-20)

- Fix batCur Reading
- Add control state for inverseMaxPower and gridOffMode (Control AC outlet on 'Plus' Devices)

### 5.0.4 (2026-08-19)

- Fix flickering Save button in Settings.
- Add function to detect zenSDK devices with mDNS and fill missing IP-address if found.

### 5.0.3 (2026-08-18)

- Fix `wifiState` not being created/updated correctly for devices using local zenSDK polling (Solarflow 2400 AC/AC Plus/Pro, 1600 AC Plus), as their local status payload does not report a `wifiState` property

For older changes see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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