---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: tbzhovE99VAe0YBGCC4RDRMWndICk5XHIPZ+2DlEIco=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Тестирование и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# ioBroker.zendure-solarflow

## Адаптер Zendure Solarflow для ioBroker

Адаптер ioBroker для чтения и управления устройствами Zendure Solarflow через API Zendure Cloud, а также локально через zenSDK (HTTP) или MQTT для устаревших устройств.

## Пожертвовать

Если вам пригодился адаптер и вы хотите поддержать мою работу, пожалуйста, сделайте пожертвование через PayPal. Спасибо! (личная ссылка для пожертвований Nograx, не имеющая отношения к проекту ioBroker)

## Функции

- Полная телеметрия с ваших устройств Solarflow, включая значения, не отображаемые в официальном приложении (например, напряжение батареи).
- Управляйте устройствами так же, как и официальным приложением — большинство настроек доступны.
- Установите ограничения на вход/выход для сценариев с нулевым входным напряжением без Shelly Pro EM или создавайте более сложные автоматизации с помощью скриптов/Blockly.
- Защита батареи: отключение подачи питания при низком напряжении батареи (требуется установка ограничения выходного напряжения через адаптер).
- Управляйте несколькими устройствами Solarflow одновременно с более точными расчетами.
- Совместимо со всеми устройствами Zendure Solarflow.
- **zenSDK** : локальное управление HTTP для совместимых устройств, при этом данные продолжают передаваться в облако Zendure, что позволяет сохранять полный контроль даже при отключении интернета/серверов Zendure.

## Режимы

- **Аутентификация с помощью Cloud Key** (рекомендуется): официальный метод Zendure. Получите Cloud Key из приложения. По умолчанию для совместимых устройств в той же сети, что и ioBroker, используется zenSDK, что обеспечивает полный локальный контроль при одновременной передаче данных в облако. Также возможна аутентификация только через облако. Устаревшие устройства, уже подключенные к локальному MQTT-серверу, также могут передавать данные в облако без каких-либо недостатков.
- **Локальный режим** : только локальный режим. Направьте адаптер на локальный MQTT-сервер для устаревших устройств (см. ниже); устройства zenSDK обнаруживаются через mDNS.

### Обнаружение мДНС

При включении zenSDK адаптер при запуске сети на короткое время просматривает сеть через mDNS/Bonjour в поисках устройств, объявляющих себя как `Zendure-<model>-<serialNumber>` Эта функция заполняет или исправляет IP-адреса известных облачных устройств и автоматически создает аксессуары (серии Mix, интеллектуальные счетчики), у которых отсутствует облачный productKey и которые невозможно создать иным способом. Сопоставление устройств производится по полному серийному номеру, а не по IP-адресу или сокращенному суффиксу. Отключить можно с помощью параметра «Добавить устройства, найденные с помощью обнаружения mDNS».

## Поддерживаемые устройства

### Устройства, совместимые с zenSDK ✅ (полное локальное управление через HTTP)

> **Zendure рекомендует** использовать режим аутентификации Cloud Key, описанный выше — он обеспечивает полный локальный контроль, сохраняя при этом подключение к облаку для удобства. Нет необходимости отключать эти устройства от облака.

- Solarflow 1600 AC Plus, 2400 AC, 2400 AC Plus, 2400 Pro, 800, 800 Plus, 800 Pro
- Solarflow 3000 Mix AC+, 4000 Mix AC+, 4000 Mix Pro _(ключ продукта для облачного сервиса пока отсутствует — добавлен только через [обнаружение mDNS](#mdns-discovery) )_

### Аксессуары для умных счетчиков 📊 (только для чтения, только для zenSDK/mDNS)

- **Интеллектуальный счетчик 3CT** — полная мощность на фазу (A/B/C) и общая мощность, передаваемая через трансформаторы тока.
- **«Умный» счетчик D0** — отображение показаний счетчика коммунальных услуг в режиме реального времени через оптический интерфейс IEC 62056-21.

### Устаревшие устройства 🔄 (локальный режим MQTT через Zendure Cloud Disconnector)

- HUB 1200, HUB 2000, Hyper 2000, AIO 2400, ACE 1500 — все они поддерживают локальный режим и могут передавать данные в облако.

**Преимущества локального режима:** данные не отправляются на серверы Zendure (рекомендуется отправлять их через ретранслятор), прямая/более быстрая связь по протоколу MQTT, полная автоматизация в автономном режиме, а также возможность повторного включения облачного ретранслятора в любое время. Обновления прошивки через официальное приложение/Bluetooth по-прежнему работают.

## Автономный режим (отключение от Zendure Cloud) для устаревших устройств

⚠️ **Предупреждение о гарантии:** Изменение MQTT-сервера непосредственно на устройстве (с помощью инструментов Bluetooth или перенаправления DNS) официально не поддерживается и **аннулирует гарантию на ваше устройство** . Действуйте на свой страх и риск.

Чтобы отключить устаревшее устройство от облака, используйте [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) от Райнхарда Брандштеттера или мой [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) — оба инструмента устанавливают MQTT-адрес устройства через Bluetooth. В качестве альтернативы, перенаправьте DNS-запросы для "mq.zen-iot.com" на ваш собственный MQTT-сервер через маршрутизатор.

**Примечание:** эти инструменты Bluetooth работают только с **устаревшими устройствами** . Для устройств **zenSDK** используйте официальный автономный метод Zendure.

Оба инструмента принудительно используют порт MQTT по умолчанию (1883 или 8883 с SSL) и требуют отключения аутентификации на вашем сервере, поскольку устройство использует жестко закодированный пароль. Вы можете использовать это в сочетании с ключом облачной аутентификации или в полностью локальном режиме.

## Важный

Для управления зарядкой/подачей электроэнергии через скрипт или Blockly используйте...** `setDeviceAutomationInOutLimit` ** Параметр управления — управляет устройством без записи во флэш-память. Отрицательные значения запускают зарядку от сети.

## Примечания

Этот адаптер выполняет аутентификацию на официальных серверах MQTT с помощью кода авторизации облака, который можно сгенерировать в приложении Zendure.

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

For older changes see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Peter Frommert <peter.frommert@outlook.com>

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