---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: zdBuHyh7oPomLQxc/HTGcC5V7o02xoWkXphF/hw2E+A=
---
![Логотип](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![Количество установок](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**Тесты:** ![Тест и выпуск](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## Адаптер ecoflow-mqtt для ioBroker
подключается к продуктам Ecoflow ([https://www.ecoflow.com])

## ПРЕДУПРЕЖДЕНИЕ
Этот адаптер использует неофициальную связь с устройствами.
Неправильная связь или установка неверных значений может повлиять на функциональность устройства и привести к исключению из сервиса.

Адаптер основан на работе:

* моя собственная оценка и исследование
* https://github.com/tolwi/hassio-ecoflow-cloud
* https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
* https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
* https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

## Установка
Адаптер находится в стабильном репозитории, поэтому вы можете установить его, выполнив поиск.
Если доступны обновления, вам следует их установить.

Если доступна очень новая версия, может потребоваться выполнить пользовательскую установку из npm/github.
В таком случае необходимо включить режим эксперта, чтобы получить доступ к значку «octacat».
![еще немного подробностей](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## Учетные данные EF
На странице администрирования (первая вкладка) необходимо вставить учетные данные mqqt для брокера mqqt.

* Имя пользователя — что-то вроде «app-....»
* UserID — 19-значный номер.
* Пароль пользователя - буквенно-цифровой
* ClientID — строка, начинающаяся с «ANDROID_....»

Есть 3 возможности:

1. через скрипт https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. через сайт https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. по собственному алгоритму адаптера (нажатие кнопки), для этого необходимы имя пользователя и пароль ecoflow.

Настройки брокера mqqt используются по умолчанию и обычно не требуют изменений.

!!! В случаях, когда mqtt-сервер отказывает в подключении, может быть полезно проверить вывод этого веб-сайта с помощью опции №2, в некоторых случаях он вернет другой адрес mqtt-брокера !!!

## Настройка и конфигурирование устройства
Для добавления оборудования используйте вкладку «Конфигурация устройств».

<details><summary><i>Параметризация Powerstream</i></summary><p>

* добавить новую строку
* установите deviceID Powerstream, как показано в приложении, например «HW51....»
* дайте ему имя
* выберите версию (600 Вт или 800 Вт)

</p></подробности>

<details><summary><i>Параметризация электростанции</i></summary><p>

* добавить новую строку
* установите deviceID Powerstation, как показано в приложении, строка зависит от типа устройства
* дайте ему имя
* выберите тип устройства
* если подключен дополнительный аккумулятор, проверьте номер порта, к которому он подключен

</p></подробности>

<details><summary><i>Параметризация умной розетки</i></summary><p>

* добавить новую строку
* установите идентификатор устройства Smart Plug, как показано в приложении, например «HW52....»
* дайте ему имя
* установите тип на "plug"

</p></подробности>

<details><summary><i>Параметризация Шелли</i></summary><p>

* добавить новую строку
* установите идентификатор устройства Shelly, как показано в приложении. Обратите внимание, что идентификатор отличается от самого устройства Shelly.
* дайте ему имя
* установите тип на "Shelly3EM"

</p></подробности>

<details><summary><i>Параметризация генератора</i></summary><p>

* добавить новую строку
* установите deviceID генератора, как показано в приложении, например «DGEB....»
* дайте ему имя
* установите тип "Генератор"

</p></подробности>

<details><summary><i>Параметризация панели «Умный дом»</i></summary><p>

* добавить новую строку
* установите deviceID генератора, как показано в приложении, например «SP10....»
* дайте ему имя
* установите тип на "SHP" или "SHP2"

</p></подробности>

<details><summary><i>Параметризация комплекта питания и концентратора</i></summary><p>

* добавить новую строку
* установите deviceID комплекта питания, как показано в приложении, например «M10....»
* дайте ему имя
* установите тип на «Power Kit BP2000» или «Power Kit BP5000»
* если подключен второй или третий аккумулятор, то отметьте его как slave1 или slave2

</p></подробности>

<details><summary><i>Параметризация подгонки Power Ocean DC</i></summary><p>

* добавить новую строку
* установите deviceID генератора, как показано в приложении, например «HJ31....»
* дайте ему имя
* установите тип "Power Ocean"
* если подключен второй или третий аккумулятор, то отметьте его как slave1 или slave2

</p></подробности>

<details><summary><i>Параметризация волны</i></summary><p>

* добавить новую строку
* установите идентификатор устройства Smart Plug, как показано в приложении, например, «KT21ZCH...»
* дайте ему имя
* установите тип на "Wave2"

</p></подробности>

<details><summary><i>Параметризация ледника</i></summary><p>

* добавить новую строку
* установите идентификатор устройства Smart Plug, как показано в приложении, например, «BX11ZCB...»
* дайте ему имя
* установите тип "Ледник"

</p></подробности>

<details><summary><i>Параметризация генератора</i></summary><p>

* добавить новую строку
* установите идентификатор устройства Smart Plug, как показано в приложении, например, «F371ZE...»
* дайте ему имя
* установите тип "Генератор 800 Вт"

</p></подробности>

Используйте вкладку «Homeassistant» для настройки MQTT-подключения к HA

<details><summary><i>Параметризация соединителя Homeassistant</i></summary><p>

* включить услугу
* установка пользовательских настроек MQTT Broker HA
* установите параметр подключения MQTT Broker HA
* выберите настройки отладки, если необходимо

Модификация на стороне HA:

* Адаптер использует функцию обнаружения в HA, настройка точек данных в HA не требуется.
* Дополнение MQTT ...

</p></подробности>

## Обновление адаптера
Обычно достаточно установить следующую версию поверх старой. В некоторых случаях (например, 1.0.0) может потребоваться стереть все дерево объектов.
Если изменяются значения, связанные с точками данных, например, мин или макс диапазона, вам необходимо:

- остановить адаптер
- удалил соответствующие точки данных
- запустить адаптер

После этого новые диапазоны будут приняты.

## Функции адаптера ioBroker
* указанные устройства подключаются к адаптеру через mqtt
* адаптер фильтрует входящие сообщения устройств. Только измененные значения сохраняются внутри
* если приложение предотвращает регулировку при определенных условиях, когда это становится известно, оно воспроизводится (например, предотвращается включение инвертора при заряде батареи ниже минимального уровня, вы можете увидеть предупреждение в журнале)
* не все известно, поэтому интерпретация информации о статусе может быть неточной, это в основном отмечено конечным знаком «?»

### Замечания по обновлению настройки точек данных (мин, макс, единица измерения, ....)
Если в новой версии адаптера изменены настройки точки данных (например, имя, единица измерения, максимальное значение), то изменения не вступят в силу, пока вы:

- остановить экземпляр адаптера
- удалить соответствующую точку данных или всю структуру объекта экземпляра адаптера
- запустить экземпляр адаптера

Во время запуска точки данных создаются, но не изменяются, если они существуют.

### Примечания к предупреждениям/ошибкам
Некоторые события в адаптере помечены как предупреждение или ошибка, чтобы появиться в журнале, когда уровень журнала находится в информационном режиме. Это не обязательно сбой или индикатор неработающего адаптера, это скорее признак непредвиденного поведения. Причина может быть не в самом адаптере, но внимание установлено.

## HA-коннектор/шлюз
* Функция обнаружения MQTT в HA обеспечивает элегантный способ обмена информацией
* Функция обнаружения MQTT не может быть активирована, если брокер MQTT уже запущен в HA, ее необходимо включить во время перенастройки службы MQTT
* при каждом запуске адаптера iobroker все объекты обнаружения передаются в HA (даже если они должны сохраняться в HA)
* Адаптер iobroker фильтрует входящие сообщения устройств. Только измененные значения сохраняются внутри и передаются в HA.
* если значение не установлено при обновлении данных устройства, оно будет отображаться как неизвестное в HA
* если устройство доступно, то доступность будет отображена в подключении устройства, это наследуется «подустройствами» (недоступность обрабатывается таким же образом)

[некоторые_подсказки_для HA](./doc/en/IOB_HA/navi.md)

### Аннотации к функционалу
* Из-за асинхронности обновления информации и передачи команд иногда могут быть видны состояния гонки. Так что переключатель получает команду и его переключение вперед и назад, прежде чем он останется, можно наблюдать.
* перезапуск HA может быть неправильно распознан в iobroker, поэтому требуется ручной перезапуск адаптера (WIP)

## Реализованные устройства и структуры с точками данных
некоторые пояснения к данным устройства

* число -> точка данных с числовым значением
* уровень -> регулируемая точка данных с числовым значением, иногда также выборки, имеющие числовое представление
* переключатель -> регулируемая точка данных логическое значение
* диагностика -> булевы или многосостоянные точки данных, преобразованные в текст
* строка -> точка данных только в виде текста
* массив -> точка данных с массивом
* преобразование значения в текст может использовать непроверенный текст (отзывы приветствуются), это обозначается знаком «?» в конце текста

### Электростанция
[Ривер Макс](./doc/devices/rivermax.md)

[Ривер Про](./doc/devices/riverpro.md)

[Дельта Мини](./doc/devices/deltamini.md)

[Дельта](./doc/devices/delta.md)

[Дельта Макс](./doc/devices/deltamax.md)

[Дельта Про](./doc/devices/deltapro.md)

[Ривер 2 Макс](./doc/devices/river2max.md)

[Ривер 2 Про](./doc/devices/river2pro.md)

[Дельта 2](./doc/devices/delta2.md)

[Дельта 2 Макс](./doc/devices/delta2max.md)

[Дельта Про Ультра](./doc/devices/deltaproultra.md)

[Дельта Про 3](./doc/devices/deltapro3.md)

### Панель Умного Дома
[Панель Умного Дома](./doc/devices/panel.md)

[Панель Умного Дома 2](./doc/devices/panel2.md)

### Комплект питания и концентратор
[Комплект питания](./doc/devices/powerkit.md)

### Сила Океана
[Океан силы](./doc/devices/powerocean.md)

### Генератор
[Генератор](./doc/devices/generator.md)

Двухтопливный генератор недоступен, может быть реализован при наличии данных.

### Поверстрим
[Powerstream](./doc/devices/pstream600.md)

Также реализована версия на 800 Вт, и единственное отличие — максимальная мощность 800 Вт.
приоритет питания -> 0/false = приоритетное питание от сети; -> 1/true = приоритетное питание от аккумулятора (зарядка)

### Умные розетки
[Умная розетка](./doc/devices/plug.md)

### Устройства Шелли
[Shelly3EM](./doc/devices/shelly3em.md)

### Кондиционер Wave 2
[Волна2](./doc/devices/wave2.md)

Wave недоступен, может быть реализован при наличии данных.

### Ледниковый холодильник
[Ледник](./doc/devices/glacier.md)

### Генератор
[Генератор переменного тока](./doc/devices/alternator.md)

### Неподдерживаемые устройства
Этот раздел создан для отладки. Выберите устройство (delta pro3, delta3, delta3 plus) и введите серийный номер в добавленную строку. Предполагается, что неизвестное устройство использует protobuf. Оно создает сообщения [PROTOBUF unknown] в журнале, они содержат необработанную шестнадцатеричную телеграмму.

## Задача
* проверка забытых граничных условий для команд (запрет cmd или дополнительное значение)
* проверьте команду звукового сигнала, если требуется задний ход
* SlaveBattery DM, outWatts умножение на 10
* больше getCmds для значений SHP

## Отказ от ответственности
Это программное обеспечение с открытым исходным кодом никоим образом не связано и не одобрено компанией Ecoflow.
Использование программного обеспечения осуществляется на ваш собственный риск и усмотрение, и я не несу ответственности за любые потенциальные убытки или проблемы, которые могут возникнуть в результате использования программного обеспечения. Важно знать, что использование этого программного обеспечения с открытым исходным кодом осуществляется без прямой поддержки или гарантий со стороны компании Ecoflow.

## Changelog

### 1.3.0 (npm)
* (foxthefox) correction for PStream energy
* (foxthefox) new DeltaPro 3 implementation
* (foxthefox, radeonorama) enhancements alternator
* (foxthefox) major refactoring
* (foxthefox) new items to PowerOcean and HeatingRod


### 1.2.2 (npm)
* (foxthefox) some documentation for HA users
* (foxthefox) corrections in SHP2 protobuf definition
* (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
* (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting, 
* (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)
* (foxthefox) corrections for pstream objects, some changed from string to number
* (foxthefox) new SHP time task config values

### 1.2.0 (npm)
* (foxthefox) new values powerocean
* (foxthefox) new values powerstream
* (foxthefox) new values plug
* (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)
* (foxthefox) enhancements to alternator values
* (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)
* (bh1cqx) handle HA restart #PR193
* (foxthefox) initial state population of BPInfo2/3 to HA
* (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)
* (foxthefox) changed code structure
* (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)
* (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
* (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
* (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
* (foxthefox) #173 DPU added additional battery selection
* (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
* (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
* (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)
* (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
* (foxthefox) update of Readme (adapter now in stable)
* (foxthefox) changes for responsive design #160

### 1.0.4 (npm)
* (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
* (foxthefox) correction for powerkit telegram reception #99
* (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)
* (foxthefox) watth16/17/18 upper range 10kWh
* (foxthefox) 'Backup reserve' option added for D2M #137
* (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)
* (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)
* (foxthefox) correction to level commands (not recognized when appendix level.xxx)
* (foxthefox) "this." for timer functions
* (foxthefox) corrected some debug functions
* (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING
* (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
* (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
* (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected, 


### 0.0.42 (npm)
* (foxthefox) correction SHP command
* (foxthefox) new data point power ocean, range min corrections
* (foxthefox) shelly3em model definition
* (foxthefox) IOB checker corrections

### 0.0.41 (npm)
* (foxthefox) correction in Compare function

### 0.0.40 (npm)
* (foxthefox) IOB checker corrections

### 0.0.39 (npm)
* (foxthefox) update devDeps
* (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)
* (foxthefox) additional datapoints for power ocean
* (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)
* (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)
* (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
* (foxthefox) correction for transfer of values derived from protobuf to HA
* (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)
* (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)
* (foxthefox) first implementation for power ocean kit
* (foxthefox) first implementation for smart home panel 2
* (foxthefox) new values watth16/17/18 for powerstream
* (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
* (foxthefox) fixed updates to info.reconnects
* (foxthefox) fixed #90 cfgAcEnabled on river2max
* (foxthefox) logging enhancements

### 0.0.33 (npm)
* (foxthefox) added Power Kit
* (foxthefox) added new object ratedPower as command for powerstream 

### 0.0.32 (npm)
* (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)
* (foxthefox) optimization EF MQTT reconnect
* (foxthefox) initial update slave battery to HA
* (foxthefox) online status from latestQuotas
* (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
* (foxthefox) correction for deltapro at xt60ChgType
* (foxthefox) correction for river2max commands

### 0.0.30 (npm)
* (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
* (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
* (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)
* (foxthefox) new objects for wave2
* (foxthefox) device emulation
* (foxthefox) mppt max value corrections

### 0.0.28 (npm)
* (foxthefox) fix value normalization (DP,wave2,glacier)
* (foxthefox) set actions initially to false to avoid null
* (foxthefox) fix latestQuotas for glacier/wave2
* (foxthefox) enhance logging

### 0.0.27 (npm)
* (foxthefox) fixed issues with additional battery and homeassistant transfer
* (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
* (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)
* (foxthefox) bmasMaster.amp max = 50
* (foxthefox) corrections SHP

### 0.0.25 (npm)
* (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)
* (foxthefox) SHP incomming data processing

### 0.0.23 (npm)
* (foxthefox) correction to latestQuotas (shift from info to action)
* (foxthefox) X_Unknown_15 range max 1000
* (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)
* (foxthefox) Homeassistant Connector/Gateway
* (foxthefox) added Generator (indication only, no knowledge on commands)
* (foxthefox) added Delta Pro Ultra
* (foxthefox) added Smart Home Panel
* (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
* (foxthefox) uptime no max boundary
* (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
* (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
* (foxthefox) info for offline/online status with EF cloud
* (foxthefox) correction for protobuf cmds (dataLen)
* (foxthefox) some strings are now diagnostic
* (foxthefox) X_unknown_15/17/34 are now numbers
* (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
* (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
* (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn


### 0.0.21 (npm)
* (foxthefox) more debug on connection
* (foxthefox) new datapoints for wave2
* (foxthefox) deleted max on duration values
* (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
* (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
* (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)
* (foxthefox) first additional integration tests
* (foxthefox) corrections in data model
* (foxthefox) new datapoints for glacier
* (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)
* (foxthefox) better error handling of incomplete messages from pstream
* (foxthefox) added indication of time tasks
* (foxthefox) cleanup pstream/plugs creation (both are protobuf)
* (foxthefox) further refactoring of code -> devices must be again defined !
* (foxthefox) differentiation between actual energy values and historical
* (foxthefox) getAllTaskCfg for powerstations in structure info
* (foxthefox) initial lastQuotas after adapter start for powerstream and plug
* (foxthefox) interpreted unknown values have now clear names
* (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
* (foxthefox) new data points for deltamax
* (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)
* (foxthefox) correction of wrong version number io io-package.json

### 0.0.17
* (foxthefox) added ems objects for River2Pro
* (foxthefox) more logging to pstream decode
* (foxthefox) spelling correction for latestQuotas 

### 0.0.16
* (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15
* (foxthefox) new implementation of Wave 2 Air conditioner
* (foxthefox) new implementation of Glacier refrigerator
* (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
* (foxthefox) some shifting from string to diagnostics
* (foxthefox) some updates to max values
* (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy 
* (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14
* (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
* (foxthefox) new feature get "lastQuotas"
* (foxthefox) recfactoring of protobuf encoding
* (foxthefox) watth5=daily energy plug, watth6=on time plug
* (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13
* (foxthefox) correction for changing of factors for pstations
* (foxthefox) watth5 for plugs
* (foxthefox) more logging pstream/plug
* (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12
* (foxthefox) new command brightness for plugs
* (foxthefox) correction of factors for plugs
* (foxthefox) powerstream bpType with value as texts
* (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
* (foxthefox) naming of watth1...8 (except 5)

### 0.0.11
* (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10
* (foxthefox) unknown pstream message debug possibility
* (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
* (foxthefox) new function -> smart plugs

### 0.0.9
* (foxthefox) final version of credential creation, at least 6.12.3 for admin required
* (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
* (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
* (foxthefox) processing multiple messages in one datagram 

### 0.0.8
* (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
* (foxthefox) handling additional battery for Delta2Max
* (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) inv.acChgRatedPower -> max 4000W
* (foxthefox) inv.FastChgWatts -> max 2400W
* (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7
* (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6
* (foxthefox) device doc
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
* (foxthefox) energy values (yield per day) for powerstream

### 0.0.4
* (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3
* (foxthefox) requirement for admin 6.12.2 -> 6.12.0
* (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
* (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
* (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2
* (foxthefox) pv2DcChgCurrent as level in delta2max
* (foxthefox) *pv2DcChgCurrent with range 4-8 and step 2
* (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)
* (foxthefox) initial release

## License
MIT License

Copyright (c) 2023-2025 foxthefox <foxthefox@wysiwis.net>

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