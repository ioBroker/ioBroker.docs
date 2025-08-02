---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bshb/README.md
title: ioBroker.bshb
hash: 8IKmNuXo59oNe9nemuVXgkMHZ9maJhIPgzQVh6uKSg0=
---
![Логотип](../../../en/adapterref/iobroker.bshb/admin/bshb-logo.jpg)

![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.bshb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bshb.svg)
![Количество установок (последнее)](http://iobroker.live/badges/bshb-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/bshb-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/holomekc/ioBroker.bshb/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.bshb.png)

# IoBroker.bshb
[![Основная](https://github.com/holomekc/iobroker.bshb/actions/workflows/test.yml/badge.svg)](https://github.com/holomekc/iobroker.bshb/actions/workflows/test.yml)

## Адаптер bosch-smart-home-bridge для ioBroker
Этот адаптер позволяет взаимодействовать с устройствами Bosch Smart Home.

[Контроллер умного дома Bosch](https://www.bosch-smarthome.com/de/de/produkte/smart-system-solutions/smart-home-controller)

Для этого используется библиотека [bosch-smart-home-bridge](https://github.com/holomekc/bosch-smart-home-bridge), которая использует информацию из официального [Локальный REST API контроллера умного дома Bosch](https://github.com/BoschSmartHome/bosch-shc-api-docs).

Обсуждение адаптера BSHB на форуме ioBroker: https://forum.iobroker.net/topic/25370/test-adapter-bshb-bosch-smart-home-v0-0-x/

Примеры: https://github.com/holomekc/ioBroker.bshb/wiki/Examples

Работа в процессе. Обратная связь приветствуется.

Если вы хотите поддержать работу, я буду признателен за небольшое пожертвование. Это на 100% добровольно и не обязательно для использования адаптера. Ссылку вы найдете вверху.

## Changelog

### 0.4.0

* (holomekc) Minor bug fixes
* (holomekc) Support for backups.
* (holomekc) If you want to use the backup feature make sure that the systempassword is set in the adapter config.
  Furthermore, in the Bosch app set the client permissions to „Operate and manage“. „More“ ➤ „Mobile Devices“ ➤ „OSS
  ioBroker.bshb“

### 0.3.0

* (holomekc) Support for user automations

### 0.2.8

* (holomekc) Improve stability and update dependencies

### 0.2.7

* (holomekc) Update dependencies and fix rate limiting

### 0.2.6

* (holomekc) Support for user defined states

### 0.2.5

* (holomekc) Support for user defined states

### 0.2.4

* (holomekc) Update the adapter to the latest requirements

### 0.2.3

* (holomekc) Update to api version 3.2
* (holomekc) Add support for climate schedules with two options to activate them
* (holomekc) Update intrusion detection so that more information is shown
* (holomekc) Update intrusion detection and climate schedule switches stay active now
* (holomekc) Support for rooms. Configuration to ignore server certificates. Allow ttesting controller 2 and can prevent
  issues in case certificates expire. Less secure though.

### 0.2.1

* (holomekc) Support for additional services

### 0.1.20

* (holomekc) Fixed problems with openDoorsAndWindows

### 0.1.19

* (holomekc) problems with initial setup fixed

### 0.1.18

* (holomekc) rateLimit added so that not too many request are executed against controller

### 0.1.17

* (holomekc) add yale values for door lock
* (holomekc) update states on startup

### 0.1.16

* (holomekc) when scenarioTriggered received the adapter will shortly update the scenario state to true and after 1s
  back to false. This allows to directly listen to triggered scenarios even when not triggered from iobroker.
  Behavior if triggered from iobroker:
    - state: true, ack: false
    - state: true, ack: true
    - state: false, ack: true

  Behavior if triggered from somewhere else:
    - state: true, ack: true
    - state: false, ack: true
* (holomekc) all updates received from controller are send to a new iobroker state "updates". This provides more
  flexibility and allow more complex logics. Each update is handled one by one even when a list of multiple update from
  controller received.

### 0.1.15

* (holomekc) Restore cache also possible without controller connection to internet. Device services endpoint fails in
  this case. These failures during detection are ignored now with a warning that e.g. detection of new devices is not
  possible in this case. Nevertheless, controlling Bosch devices will still work.
* (holomekc) Fix tests and add "simple" integration test
* (holomekc) Update structure of project
* (holomekc) Code formatting

### 0.1.14

* (holomekc) RoomControlMode types added.
* (holomekc) Update for js-controller 3.x.x. This serializes objects and arrays. Please check your logics.

### 0.1.13

* (holomekc) update to api-version 2.1
* (holomekc) add intrusionDetectionControl folder which contains trigger for alarm system

### 0.1.12

* (holomekc) states and units
* (holomekc) update license and copyright
* (holomekc) fix typo in connectionType

### 0.1.11

* (holomekc) update dependencies
* (holomekc) changes due to new ioBroker lib
* (holomekc) add connection indicator
* (holomekc) increase delay for timeout for longpolling to 2s
* (holomekc) low not set as lowbat role in ioBroker anymore

### 0.1.10

* (holomekc) Add .npmignore to cleanup installation files

### 0.1.9

* (holomekc) Error in scenario handling fixed

### 0.1.8

* (holomekc) Minor improvements

### 0.1.7

* (holomekc) Improved error handling

### 0.1.6

* (holomekc) Added open doors and windows feature

### 0.1.5

* (holomekc) functions and rooms are only added for new channels
* (holomekc) increase timeout for requests which expect to contain more data

### 0.1.4

* (holomekc) issue fixed in loading configuration
* (holomekc) minor restructuring

### 0.1.3

* (holomekc) restructure of handling device detection and updates iobroker <-> bshc via BshbHandler
* (holomekc) added handler for devices, scenarios and messages
* (holomekc) messages and scenarios are updated when adapter is running

### 0.1.2

* (holomekc) Adapter core library updated

### 0.1.1

* (holomekc) update to new bridge version
* (holomekc) allows adapter to reconnect in case bshc is restarting
* (holomekc) remove not needed configuration
* (holomekc) faults added to all service (channels)
* (holomekc) faults are always a list: [] = no faults, \[{source: {rootDeviceId: string, deviceServiceId: string,
  deviceId: string}, type: string, category: INFO | WARNING | ERROR}, ...\] = faults

### 0.1.0

* (holomekc) certificate and private key are handled in ioBroker and can be content or file reference
* (holomekc) update to newer bridge version

### 0.0.14

* (holomekc) optimizations and cleanup

### 0.0.13

* (holomekc) added more definitions
* (holomekc) optimizations and cleanup

### 0.0.12

* (holomekc) scenario support. Scenarios are listed as group 'scenarios' and can only be triggered
* (holomekc) added definitions for Twinguard

### 0.0.11

* (holomekc) rooms and functions added for known channels
* (holomekc) trim whitespaces from configuration values

### 0.0.10

* (holomekc) try to improve configuration description in application itself
* (holomekc) change id so that it is valid regarding Bosch T&C
* (holomekc) update to newest bosch-smart-home-bridge version for same reason

### 0.0.9

* (holomekc) update travis.yml due to jscontroller requires node dependency >=8.0

### 0.0.8

* (holomekc) fix client name is: ioBroker.bshb

### 0.0.7

* (holomekc) make sure that bosch-smart-home-bridge version >= 0.0.4

### 0.0.6

* (holomekc) Just io-package.json changes
* (holomekc) cleanup

### 0.0.5

* (holomekc) Just do the steps adapter-check is telling me
* (holomekc) Therefore, build files are part of git repo. So install via Github should be possible now

### 0.0.4

* (holomekc) Long polling added to reduce load
* (holomekc) Set of state values is possible now
* (holomekc) Code cleanup

### < 0.0.4

* (holomekc) certificate generation added
* (holomekc) first attempts to creat ioBroker objects, states, etc.

## License

The MIT License (MIT)

Copyright (c) 2024 Christopher Holomek <holomekc.github@gmail.com>