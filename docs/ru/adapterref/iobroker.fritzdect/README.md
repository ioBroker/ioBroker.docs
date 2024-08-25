---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fritzdect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fritzdect.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/fritzdect-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/fritzdect-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/foxthefox/ioBroker.fritzdect/badge.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fritzdect/README.md
title: Инструкция по установке
hash: lwwdDTRwowRvfKRVnTjca+VueSpo7Z2PQgz7nn97AoY=
---
![логотип](../../../de/admin/fritzdect_logo.png)

# Инструкция по установке
## Настройки FritzBox
это должен быть пользователь, имеющий доступ к Fritzbox и Smarthome

# Пароль
могут быть проблемы:

- Пароль длиннее 32 символов
- Использование специальных символов
- Использование расширенного ASCII

Если есть проблемы, то, возможно, сначала возьмите более короткий и простой PW, чтобы в основном проверить механизм входа в адаптер адаптера, а затем последовательно расширяйте его.

## Настройки адаптера
* Введите IP-адрес, которому предшествует "http://".
* Интервал опроса может быть выбран произвольно (настройка по умолчанию 5 минут = 300 секунд). Это необходимо для отслеживания работы вне ioBroker, поскольку FritzBox не обеспечивает автоматических обновлений.

## Запуск адаптера
с запуском адаптера делается следующее:

* FW Fritzbox запрашивается и записывается в журнал (некоторые Fritzbox не отвечают, что приводит к ошибке).
* точки данных (объекты) создаются для устройств
* созданы точки данных (объекты) для групп
* объекты снабжены данными

Следующие объекты записываются только один раз при запуске:

* я бы
* прошивка
* производитель
* наименование товара
* masterdviceid
* члены

## Функция термостата
Термостат может работать в автоматическом режиме (контроль температуры) и контролировать заданную температуру.
Целевой температурой может быть комфортная температура, пониженная температура или выбранная вами температура.

Кроме того, клапан может быть полностью закрыт, что соответствует состоянию ВЫКЛ.
Другое направление также может быть предварительно выбрано с помощью ON и будет соответствовать режиму BOOST или сауне (не забудьте снова отрегулировать его ;-) ).

Эти в настоящее время 3 режима работы могут быть предварительно выбраны с помощью 0, 1 или 2 в режиме точки данных.
При предварительном выборе 0-AUTO выбирается последняя целевая температура.

### Температура со смещением
Можно скорректировать измеренную температуру в FritzBox, указав измеренную температуру, и есть смещение. Это смещение учитывается для точки данных .temp. Здесь вы получаете измерение внутренней температуры.
Фактическая температура (actualtemp), используемая внутри контроллера радиатора, также изменяется на смещение. Это означает, что HKR внутренне регулирует исправленное значение.
Таким образом, Atualtemp и targettemp сопоставимы для целевого/фактического прогресса.

##Исправление проблем
Желательно посмотреть лог, если информация не содержательная или ее слишком мало, предварительно выбрать режим отладки через экспертную настройку экземпляра.

## Changelog
### 2.3.0
* option to set for logging only when a difference to the old value is detected
* fritzdect-aha-nodejs as dependency

### 2.2.6
* new objects for thermostat adaptiveHeatingRunning, adaptiveHeatingActive

### 2.2.5
* several improvements for error handling
* handling of invalid xml-answer for check user rights

### 2.2.4
* correction: number format from admin page for times and tsoll

### 2.2.3 (npm)
* buttons setmodeon/off/auto have now initial value false, and when triggered with true get false again (for next trigger)
* buttons blindsclose/stop/open have now initial value false, and when triggered with true get false again (for next trigger)
* boostactivetime and windowopenactivetime can now be set to a default value in the adapter config
* new default temperature target in admin config (used if tsoll is not available e.g. object tree deleted and thermostat off/on)
* corrections for handling the initial value for tsoll/lasttarget when thermostat is off/on

### 2.2.2 (npm)
* license update
* corrected doc/de

### 2.2.1
* correction of "My colors" FB is not answering with valid xml
* added test script (fritz.js) for login check in doc/de

### 2.2.0 (npm)
* refactoring of API to FB, single instance with relogin after experied session
* refactoring main.js
* using http.request instead of deprecated @root/request
* log the user permissions
* remove fasthack for OFF/ON, upper range tchange, absenk, komfort = 32
* limitation of boost/windowopen activation to 24h
* correction of "present" (issue #224) 

### 2.1.16
* temperature range in sockets 0..32°C -> -20..50°C
* fast hack for OFF/ON feedback via temperature 253/254*0,5 -> upper range tchange, absenk, komfort = 128
* fast mod for fwversion for HAN-FUN
* present message correction

### 2.1.15 (npm)
* correction in timestamp as date/string
* several version bumps

### 2.1.14
* operationmode and hkrmode tracking also after commands
* extended datapoints for blinds from Rollotron
* presence=0 was detected but not written to the datapoint, now corrected (skipping the updated is not affected)

### 2.1.13
* correction at group of switches (switchtype not recognized -> simpleonoff)
* functionbitmask 32768 moved to role: switches

### 2.1.12 (npm)
* new values for DECT500
* back to full unit testing

### 2.1.11 (npm)
* template for fritzfon

### 2.1.10
* comfort/night is AUTO but reintroduced as operationmode

### 2.1.9
* info to user after start of adapter

### 2.1.8
* simpleonoff plug as device/group/template (telekom)

### 2.1.7 (npm)
* boostactivetime/windowactivetime only value

### 2.1.6
* pbkdf2 hash correction in calculation

### 2.1.5
* pbkdf2 hash correction in output to fritzbox

### 2.1.4
* removed the dependency to vis

### 2.1.3
* presence=0 continue

### 2.1.2
* withoit info.connection

### 2.1.1
* error handling in msgbox

### 2.1.0
* more refactoring => adapter based on class, gitCI instead of travisCI
* new thromastat buttons (setmodeauto, setmodeon,setmodeoff)

### 2.0.0 Breaking Changes in datapoints and structures (npm)
* refactoring of the code
* new fritzapi to either used md5 or pbkf2 decryption, needed for fritzbox FW >7.24
* **usage of AHA API returned values as datapoint identifier**
* **grouping of buttons under the DECT440**
* DECT500 groups
* accepting blocktime from fritzbox
* announcing new detected datapoints delivered by fritzbox
* option strictSSL (experimental)


### 1.1.4 (npm)
* blinds control
* update testing

### 1.1.3 (npm)
* setcolor cmd correction
* only valid color temperatures for white

### 1.1.2
* merge boost and boost active
* merge windowopen and windowopenactive
* DECT440 test

### 1.1.1 (npm)
* getColorDefaults in Admin, prepared but format of xml can no

### 1.1.0
* new features of AVM API 1.33
    * setblind
	* sethkrboost
	* setwindowopen
	* txbusy, windowopenactiveendtime,  boostactiveendtime, boostactive
* fade duration
* DECT440
* DECT500

### 1.0.1 (npm)
* bugfixes in fritz API calls
* error code 303 (but unknown what it means)
* (Black-Thunder) targetTemp=null
* (PascalBru) datapoint nextchange in hkr 

### 1.0.0 Breaking Change for non-native API objects
* merge of fritzapi into repo directly including added DECT500 commands
* **no longer support of non-native API calls (scraping of website)**
    * GuestWLAN
    * BatteryCharge
    * OS version
* correction of timestamp to date conversion for DECT400

### 0.3.2 (npm)
* new states in heater group, operationList and operationMode

### 0.3.1 (npm)
* (scrounger) new states in COMET, operationList and operationMode

### 0.3.0 (npm)
* new DECT500 supported (without commands)

### 0.2.5 (npm)
* fixed testing
* correction for indication of actualtemp in heater groups
* connection type and datasource added in io-package.json
* correction pf switch and alert state (boolean in update routine)

### 0.2.4 (npm)
* (Scrounger) correction of type mismatch (string boolean)

### 0.2.3 (npm)
* skip updating values, when device not present

### 0.2.2 (npm)
* added FritzDECT400 incl. testing
* removed offset in temp value
* new datapoint offset
* added template for switches
* added template testing

### 0.2.1 (npm)
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5 (npm)
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4 (npm)
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3 (npm)
* windowopenactiv added to thermostat

### 0.1.2  (npm)
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1 (npm)
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0 (npm)
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14 (npm)
* correction of temp offset influence

### 0.0.13 (npm)
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12 (npm)
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11 (npm)
* added state OFF/ON for thermostat

### 0.0.10 (npm)
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9 (npm)
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8 (npm)
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7 (npm)
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6 (npm)
* correction targettemp in DECT200 section

### 0.0.5 (npm)
* setTemp on COMET
* GuestWlan corrected

### 0.0.4 (npm)
* cyclic status polling

### 0.0.3 (npm)
* user now configurable

### 0.0.2 (npm)
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 - 2022 foxthefox <foxthefox@wysiwis.net>
