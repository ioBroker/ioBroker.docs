---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.innogy-smarthome/README.md
title: ioBroker.Innogy-Умный Дом
hash: 9H2ODtBBFta3Ws1pxPfBz8XS7c63PcXND8+J5UyFLJQ=
---
![Логотип](../../../en/adapterref/iobroker.innogy-smarthome/admin/innogy-smarthome.png)

![Количество установок](http://iobroker.live/badges/innogy-smarthome-stable.svg)
![Строить](https://travis-ci.org/PArns/ioBroker.innogy-smarthome.svg?branch=master)

# IoBroker.Innogy-Умный Дом
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер используется для подключения устройств Livisi SmartHome к ioBroker. Вы можете прочитать больше о Livisi [здесь](https://www.livisi.com).

### Требуется узел > 8.x
Обратите внимание: для процесса аутентификации порт 3000 (по умолчанию он может быть изменен в конфигурации) должен быть доступен на хосте. Пожалуйста, убедитесь, что ничто другое не использует его (например, Grafana). Эта версия теперь также поддерживает новую функциональность Livisi Local SmartHome! Пожалуйста, переключитесь на локальную версию, потому что Livisi Cloud будет отключен в первом квартале 2023 года!

## ТРЕБУЕТСЯ ПОМОЩЬ!
Поскольку этот проект разрабатывается в свободное время, я активно ищу помощь в поддержке и расширении этой библиотеки! Если вы готовы помочь, напишите мне!

## Changelog
### 1.2.5 (2023-01-07)
* (Apollon77) Added more states

### 1.2.4 (2023-01-05)
* (Apollon77) Added shockDetected states
* (Apollon77) Handled room enums better for an empty room

### 1.2.3 (2023-01-04)
* (Apollon77) Made activeChannel states writable to trigger Alarm
* (Apollon77) Fixed unit for chargingCurrent

### 1.2.2 (2023-01-03)
* (Apollon77) Added missing state definitions (motionDetected, operatingTimeCurrentWeek, operatingTimeLastWeek)
* (Apollon77) Prevented crash cases reported by Sentry

### 1.2.1 (2022-12-31)
* (Apollon77) Optimize Authentication server handling

### 1.2.0 (2022-12-30)
* (Apollon77) Changed storage of authentication tokens to allow multiple instances on one host (for instance 0)

### 1.1.2 (2022-12-29)
* (Apollon77) Added more missing states for several devices

### 1.1.1 (2022-12-28)
* (Apollon77) Prevented crash cases reported by Sentry
* (Apollon77) Added missing ISS2 states

### 1.1.0 (2022-12-28)
* (Apollon77) Prevented crash cases when setting values is not successful
* (Apollon77) Added more missing states
* (Apollon77) Added Sentry for Crash reporting and missing state reporting

### 1.0.0 (2022-12-24)
* IMPORTANT: This updates introduces a new object ID level as Channel, so all Object-IDs will change!
* IMPORTANT: The local SHC Password needs to be re-entered in Admin!
* (Apollon77) Added support for local connections to SHC Classic/Generation 1
* (Apollon77) Added lowBattery and isReachable states and Message support to update them
* (Apollon77) Added option to configure the port for the redirect back server for OAuth with cloud connection (default 3000)
* (Apollon77) Add more missing states
* (Apollon77) General updates and optimizations

### 0.4.7
* Changed OAuth local auth

### 0.4.6
* Added missing states

### 0.4.5
* Fixed a naming problem with newly created devices

### 0.4.3
* Added min & max for pointTemperature

### 0.4.2
* Added debug information for invalid value data
* Fixed . in device names
* Fixed crashes caused by invalid point temperatures (< 6 & > 30)

### 0.4.1
* Fixed cloud auth, if local auth is activated (blank page)
* Changed Admin design to be compatible with black & white style
* Added missing states

### 0.4.0
* Added support for new Local SmartHome (currently in Beta, requires SHC 2 & Firmware >= 8.17 - you can find more info [here](https://community.livisi.de/lsh-en/))

### 0.3.7
* Prevent js-controller 3.3 warnings

### 0.3.6
* Fixed authorization issues

### 0.3.5
* Updated authorization endpoint
* Added shutter

### 0.3.4
* Make Hue bulbs writeable (brightness)

### 0.3.3
* Fixed non switchable variables for new installations (missing native ID)

### 0.3.2
* Added more Hue properties

### 0.3.1
* Added PowerControl
* Added SHC 2.0 quota states

### 0.3.0
* Added support for SHC 2.0 (and API 1.1)

### 0.2.11
* Reverted changes from yesterday, as RW states are not correctly maintained by innogy

### 0.2.10
* Respecting RW state of Capabilities. Please don't try to write to read only states!

### 0.2.9
* Fixed a problem with timer updates updating device states too often. Please update ASAP

### 0.2.8
* Fixed a config parsing crash
* Added a lot of new device descriptors to speed up inital boot
* Increased request limit from 2 to 6 req/sec

### 0.2.7 
* Added handler for non local SHC access and 403 responses (outdated mobile access scenarios)
* Added handler for broken push connection

### 0.2.6
* Fixed an exception once the Innogy API closes the status socket connection

### 0.2.5
* Implemented throttling changes required by the Innogy API

### 0.2.4
* Fixed Travis CI build errors

### 0.2.3
* Updated underlying libs
* Changed update timer from 5 mins to 30 mins + 0-30 mins

### 0.2.2
* Fixed reauth problems
* Fixed initial auth problems
* Optimized API errors
* Optimized caching of descriptor files

### 0.2.1
* Fixed reauth problems

### 0.2.0
* Removed external OAuth2 lib
* Authorization optimization

### 0.1.22
* Fixed initial reauth problem V3

### 0.1.21
* Fixed initial reauth problem next try
* Added Netatmo Wind Sensor

### 0.1.20
* Fixed initial reauth problem

### 0.1.19
* Fixed an underlying auth problem

### 0.1.18
* Updated innogy lib
* Updated adapter category
* Updated adapter tests

### 0.1.17
* Updated innogy lib

### 0.1.16
* Fixed a lot of stuff

### 0.1.11
* Added Dimmer

### 0.1.9
* Added a better reconnect handling for internal websocket connection to the API
* Better error handling

### 0.1.8
* Added a workaround for corrupted API function which causes a problem during reconnection phase

### 0.1.7
* Added the ability to detect connection problems with auto reconnect
* Better error handling

### 0.1.6
* More Innogy API error handling with general reconnect on API error
* Added connected state (yellow state)

### 0.1.5
* Added new device discovery
* Added auto connect retry for "remote access not allowed"
* Fixed exception if device was not found
* Fixed setState for RST OperationMode

### 0.1.4
* Fixed Shutter in underlying lib
* Fixed WebSocket reconnect error in underlying lib

### 0.1.3
* Added Shutter

### 0.1.2
* Optimized reconnect handling

### 0.1.1
* Fixed storing of wrong auth data & handling of wrong auth data

### 0.1.0
* Associate rooms with correct values
* Update underlying lib to handle offline crashes for Innogy API

### 0.0.11
* Corrected roles for a lot of devices

### 0.0.10
* Corrected roles for a lot of devices
* Corrected rw states for a lot of devices

### 0.0.9
* Fixed initialization sequence in underlying lib
* Fixed bootstrap sequence in underlying lib
* Fixed token refresh in underlying lib
* Removed unneeded error messages

### 0.0.8
* Improved error output once again

### 0.0.7
* Improved error output

### 0.0.6
* Removed no longer needed log errors
* Added unload method
* Optimized session refreshing

### 0.0.5
* Fixed parsing errors

### 0.0.4
* Added Netatmo Weatherstation

### 0.0.3
* Added a lot of devices
* Updated lib to reestablish Websocket connection
* Added debug event if Websocket connection is lost

### 0.0.2
* Added "Virtual" as default location for devices which doesn't have a location

### 0.0.1
* Initial commit

## License
The MIT License (MIT)

Copyright (c) 2020-2023 Patrick Arns iobroker@patrick-arns.de

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
