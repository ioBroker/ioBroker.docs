---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: ZZVI8XoypnXhTS3yL4ulyeNm2NPX0KMD6tAnWpk7JcI=
---
![Логотип](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![Количество установок](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**Тесты:** ![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## Адаптер ecoflow-mqtt для ioBroker
подключается к продуктам Ecoflow ([https://www.ecoflow.com])

## ПРЕДУПРЕЖДЕНИЕ
Этот адаптер использует неофициальный способ связи с устройствами.
Неправильное взаимодействие или установка неверных значений могут повлиять на функциональность устройства и привести к отключению от сервиса.

Адаптер основан на работе:

- моя собственная оценка и исследование
- https://github.com/tolwi/hassio-ecoflow-cloud
- https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
- https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
- https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

## Установка
Адаптер находится в стабильном репозитории, поэтому вы можете установить его, выполнив поиск.
Если доступны обновления, установите их.

Если доступна совершенно новая версия, может потребоваться выполнить пользовательскую установку из npm/github.
В этом случае для доступа к значку «octacat» необходимо включить экспертный режим.
![еще некоторые подробности](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## Учетные данные EF
На странице администрирования (первая вкладка) необходимо вставить учетные данные mqqt для брокера mqqt.

- Имя пользователя - что-то вроде «app-....»
- UserID - 19-значный номер
- Пароль пользователя - буквенно-цифровой
- ClientID - строка, начинающаяся с «ANDROID\_....»

Есть 3 возможности:

1. с помощью скрипта https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. через сайт https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. по собственному алгоритму адаптера (нажатие кнопки), для этого необходимы имя пользователя и пароль ecoflow.

Настройки брокера mqqt используются по умолчанию и обычно не требуют изменений.

!!! В случаях, когда mqtt-сервер отказывает в соединении, может быть полезно проверить вывод этого веб-сайта с помощью опции №2, в некоторых случаях он вернет другой адрес mqtt-брокера !!!

## Настройка и конфигурирование устройства
Для добавления оборудования используйте вкладку «Конфигурация устройств».

<details><summary><i>Параметризация Powerstream или STREAM</i></summary><p>

- добавить новую строку
- задайте deviceID (Power)Stream, как показано в приложении, например «HW51..../BK....»
- дайте ему имя
- выберите версию

</p></подробности>

<details><summary><i>Параметризация электростанции</i></summary><p>

- добавить новую строку
- задайте deviceID Powerstation, как показано в приложении, строка зависит от типа устройства
- дайте ему имя
- выберите тип устройства
- если подключен дополнительный аккумулятор, проверьте номер порта, к которому он подключен

</p></подробности>

<details><summary><i>Параметризация умной розетки</i></summary><p>

- добавить новую строку
- задайте идентификатор устройства Smart Plug, как показано в приложении, например «HW52....»
- дайте ему имя
- установите тип на «plug»

</p></подробности>

<details><summary><i>Параметризация смарт-счетчика</i></summary><p>

- добавить новую строку
- установите идентификатор устройства Smartmeter (Shelly или EF), как показано в приложении. Если это Shelly, учтите, что идентификатор отличается от идентификатора самого устройства Shelly.
- дайте ему имя
- установите тип на «Shelly3EM» или «EF smartmeter»

</p></подробности>

<details><summary><i>Параметризация генератора</i></summary><p>

- добавить новую строку
- задайте deviceID генератора, как показано в приложении, например «DGEB....»
- дайте ему имя
- установите тип "Генератор"

</p></подробности>

<details><summary><i>Параметризация панели умного дома</i></summary><p>

- добавить новую строку
- задайте deviceID генератора, как показано в приложении, например «SP10....»
- дайте ему имя
- установите тип на «SHP» или «SHP2»

</p></подробности>

<details><summary><i>Параметризация комплекта питания и концентратора</i></summary><p>

- добавить новую строку
- задайте deviceID комплекта питания, как показано в приложении, например «M10....»
- дайте ему имя
- установите тип на «Power Kit BP2000» или «Power Kit BP5000»
- если подключен второй или третий аккумулятор, то отметьте его как slave1 или slave2

</p></подробности>

<details><summary><i>Параметризация подгонки Power Ocean DC</i></summary><p>

- добавить новую строку
- задайте deviceID генератора, как показано в приложении, например «HJ31....»
- дайте ему имя
- установите тип "Power Ocean"
- если подключен второй или третий аккумулятор, то отметьте его как slave1 или slave2

</p></подробности>

<details><summary><i>Параметризация волны</i></summary><p>

- добавить новую строку
- задайте идентификатор устройства Smart Plug, как показано в приложении, например, «KT21ZCH...»
- дайте ему имя
- установите тип на «Wave2»

</p></подробности>

<details><summary><i>Параметризация ледника</i></summary><p>

- добавить новую строку
- задайте идентификатор устройства Smart Plug, как показано в приложении, например «BX11ZCB...»
- дайте ему имя
- установите тип "Ледник"

</p></подробности>

<details><summary><i>Параметризация генератора</i></summary><p>

- добавить новую строку
- задайте идентификатор устройства Smart Plug, как показано в приложении, например «F371ZE...»
- дайте ему имя
- установите тип «Генератор 800 Вт»

</p></подробности>

Используйте вкладку «Homeassistant» для настройки MQTT-подключения к HA.

<details><summary><i>Параметризация коннектора Homeassistant</i></summary><p>

- включить услугу
- установить пользовательские настройки MQTT-брокера HA
- задайте параметры подключения MQTT-брокера HA
- при необходимости выберите настройки отладки

Модификация на стороне HA:

- Адаптер использует функцию обнаружения в HA, настройка точек данных в HA не требуется.
- Дополнение MQTT ...

</p></подробности>

## Обновление адаптера
Обычно достаточно установить следующую версию поверх старой. В некоторых случаях (например, 1.0.0) может потребоваться удалить всё дерево объектов.
Если изменяются значения, связанные с точками данных, например, минимальное или максимальное значение диапазона, необходимо:

- остановить адаптер
- удалил соответствующие точки данных
- запустить адаптер

После этого новые диапазоны будут приняты.

## Функции адаптера ioBroker
- определенные устройства подключаются к адаптеру через mqtt
- адаптер фильтрует входящие сообщения устройств. Внутри сохраняются только измененные значения.
- если приложение предотвращает регулировку при определенных условиях, когда это известно, оно воспроизводится (например, предотвращается включение инвертора при уровне заряда батареи ниже минимального, вы можете увидеть предупреждение в журнале)
- не все известно, поэтому интерпретация информации о статусе может быть неточной, в основном это отмечено конечным символом «?»

### Замечания по обновлению настройки точек данных (мин., макс., единица измерения, ....)
Если в новой версии адаптера изменены настройки точки данных (например, имя, единица измерения, максимальное значение), то изменения не вступят в силу, пока вы:

- остановить экземпляр адаптера
- удалить соответствующую точку данных или всю структуру объекта экземпляра адаптера
- запустить экземпляр адаптера

Во время запуска точки данных создаются, но не изменяются, если они существуют.

### Примечания к предупреждениям/ошибкам
Некоторые события в адаптере помечаются как предупреждения или ошибки, чтобы отображаться в журнале, когда уровень журнала находится в информационном режиме.
Это не обязательно является сбоем или признаком неработающего адаптера, а скорее признаком непредвиденного поведения. Причина может быть не в самом адаптере, но предупреждение установлено.

## HA-коннектор/шлюз
- функция обнаружения MQTT в HA обеспечивает элегантный способ обмена информацией
- функция обнаружения MQTT может не активироваться, если брокер MQTT уже запущен в HA; ее необходимо включить во время перенастройки службы MQTT
- при каждом запуске адаптера iobroker все объекты обнаружения передаются в HA (даже если они должны сохраняться в HA)
- адаптер iobroker фильтрует входящие сообщения устройств. Только измененные значения сохраняются внутри и передаются в HA.
- если значение не установлено при обновлении данных устройства, оно будет отображаться как неизвестное в HA
- если устройство доступно, то доступность будет отображена в подключении устройства, это наследуется «подустройствами» (недоступность обрабатывается таким же образом)

[некоторые_подсказки_для HA](./doc/en/IOB_HA/navi.md)

### Аннотации к функционалу
- Из-за асинхронности обновления информации и передачи команд иногда могут наблюдаться состояния гонки. Например, по команде на переключение можно наблюдать его переключение туда-сюда, прежде чем оно остановится.

## Реализованные устройства и структуры с точками данных
некоторые пояснения к данным устройства

- число -> точка данных с числовым значением
- уровень -> регулируемая точка данных с числовым значением, иногда также выборки, имеющие числовое представление
- переключатель -> регулируемая точка данных логическое значение
- диагностика -> булевские или многосостоянные точки данных, преобразованные в текст
- строка -> точка данных только как текст
- массив -> точка данных с массивом
- преобразование значения в текст может использовать непроверенный текст (отзывы приветствуются), это обозначается знаком «?» в конце текста

### Электростанция
[Ривер Макс](./doc/devices/rivermax.md)

[Ривер Про](./doc/devices/riverpro.md)

[Дельта Мини](./doc/devices/deltamini.md)

[Дельта](./doc/devices/delta.md)

[Дельта Макс](./doc/devices/deltamax.md)

[Дельта Про](./doc/devices/deltapro.md)

[Ривер 2 Макс](./doc/devices/river2max.md)

[Ривер 2 Про](./doc/devices/river2pro.md)

[Река 3](./doc/devices/river3.md)

[Река 3 Плюс](./doc/devices/river3plus.md)

[Дельта 2](./doc/devices/delta2.md)

[Дельта 2 Макс](./doc/devices/delta2max.md)

[Дельта 3 Плюс](./doc/devices/delta3plus.md)

[Дельта Про 3](./doc/devices/deltapro3.md)

[Дельта Про Ультра](./doc/devices/deltaproultra.md)

### Панель умного дома
[Панель умного дома](./doc/devices/panel.md)

[Панель Умного Дома 2](./doc/devices/panel2.md)

### Комплект питания и концентратор
[Комплект питания](./doc/devices/powerkit.md)

### Сила Океана
[Power Ocean DC](./doc/devices/powerocean.md)

[Power Ocean Plus](./doc/devices/poweroceanplus.md)

[Power Ocean DC FIT](./doc/devices/poweroceanfit.md)

### Генератор
[Генератор](./doc/devices/generator.md)

Двухтопливный генератор отсутствует, может быть реализован при наличии данных.

### Powerstream и поток
[Powerstream](./doc/devices/pstream600.md)

[Стрим AC PRO](./doc/devices/stream_ac_pro.md)

[Стрим Ультра](./doc/devices/stream_ultra.md)

[Инвертор потока](./doc/devices/stream_inverter.md)

Также реализована версия мощностью 800 Вт, единственное отличие — максимальная мощность 800 Вт.
Приоритет питания -> 0/false = приоритет питания от сети; -> 1/true = приоритет питания от аккумулятора (зарядка)

### Умные розетки
[Умная розетка](./doc/devices/plug.md)

### Устройства Smartmeter
[Shelly3EM](./doc/devices/shelly3em.md)

[Умный счетчик](./doc/devices/smartmeter.md)

### Кондиционер Wave
[Волна2](./doc/devices/wave2.md)

[Волна3](./doc/devices/wave3.md)

Wave недоступен, может быть реализован при наличии данных.

### Холодильник-ледник
[Ледник](./doc/devices/glacier.md)

### Генератор
[Генератор](./doc/devices/alternator.md)

### Неподдерживаемые устройства
Этот раздел создан для отладки. Выберите устройство (delta pro3, delta3, delta3 plus) и введите серийный номер в добавленную строку. Предполагается, что неизвестное устройство использует Protobuf. Оно создает сообщения [PROTOBUF unknown] в журнале, содержащие необработанную шестнадцатеричную телеграмму.

## Задача
- проверка забытых граничных условий для команд (запрет cmd или дополнительное значение)
- проверьте звуковой сигнал, если требуется движение задним ходом
- SlaveBattery DM, умножение выходной мощности на 10
- больше getCmd для значений SHP

## Отказ от ответственности
Это программное обеспечение с открытым исходным кодом никоим образом не связано с компанией Ecoflow и не одобрено ею.
Вы используете программное обеспечение на свой страх и риск, и я не несу ответственности за любой потенциальный ущерб или проблемы, которые могут возникнуть в результате использования программного обеспечения. Важно помнить, что использование этого программного обеспечения с открытым исходным кодом осуществляется без прямой поддержки или гарантий со стороны компании Ecoflow.

## Changelog

### 1.4.5 (WIP)

- (foxthefox) new datapoints Delta2max

### 1.4.4 (npm)

- (foxthefox) new datapoints for PowerOcean and HeatingRod
- (foxthefox) change from object to array for messages (for telegrams with multiple messages of same type i.e. powerocean)
- (foxthefox) testing JSON->buffer

### 1.4.3 (npm)

- (foxthefox) new cmd Stream to adjust output power via load task (dayResidentLoadList)
- (foxthefox) correction energyBackupand cmd for River3(Plus)
- (foxthefox) new device Stream Inverter supported
- (foxthefox) first improvements for power ocean plus (i.e. 6 batteries)
- (foxthefox) SHP time task enable switch and load level adjustment

### 1.4.2 (npm)

- (foxthefox) completion commands for River3(Plus)
- (foxthefox) correction of bool in proto of River3(Plus)

### 1.4.1 (npm)

- (foxthefox) Correction of multiplication, some float values may be incorrect now
- (foxthefox) new commands for STREAM and River3
- (foxthefox) River3 llcbusvol correction
- (foxthefox) Stream max settings for power,
- (foxthefox) separate handler for unknown devices

### 1.4.0 (npm)

- (foxthefox) new support of EF Smartmeter
- (foxthefox) new support of River3 (without cmds)
- (foxthefox) new support of Stream Series
- (foxthefox) new support of Power Ocean Plus
- (foxthefox) new Statistics for Gen3 powerstattions
- (foxthefox) new battery data for Gen3 powerstattions
- (foxthefox) new support of Power Ocean DC FIT
- (foxthefox) new support of Wave3 (without cmds!)
- (foxthefox) support of 3 extra batteries DeltaProUltra
- (foxthefox) new datapoints for stream series
- (foxthefox) new datapoints for river2max/pro in pd section
- (foxthefox) correction of river2max command chgWatts
- (foxthefox) corrections at history.. values for powerstream (not kWh, it is W)
- (foxthefox) issue #264, correction, additional bat Delta 2 has different data names than D2M
- (foxthefox) improved recognition of HA broker status and better initializing of data
- (foxthefox) telegram counter now in each device/info
- (foxthefox) major refactoring for the "JSON-devices"
- (foxthefox) min nodejs version >=20
- (foxthefox) debug button for latestQuotas, dbug button for unknown protobuf msg
- (foxthefox) iobroker/eslint-config

### 1.3.2 (npm)

- (foxthefox) improvement on HA cmds with numbers
- (foxthefox) correction on startVoltage for alternator, new cablelength

### 1.3.1 (npm)

- (foxthefox) new cmd for Delta3Plus and corrections to ranges
- (foxthefox) correction to cmd DPU,D3P,D3+,R3+ to appear correctly in HA (must be number to be adjustable)
- (foxthefox) improvement on HA cmds to devices with protobuf
- (foxthefox) delta2 settings improvement (unit, device_class)

### 1.3.0 (npm)

- (foxthefox) correction for PStream energy
- (foxthefox) new Delta Pro 3 implementation
- (foxthefox) new Delta 3 Plus implementation
- (foxthefox) new River 3 Plus implementation
- (foxthefox, radeonorama) enhancements alternator
- (foxthefox) major refactoring
- (foxthefox) new items to PowerOcean and HeatingRod

### 1.2.2 (npm)

- (foxthefox) some documentation for HA users
- (foxthefox) corrections in SHP2 protobuf definition
- (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
- (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting,
- (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)

- (foxthefox) corrections for pstream objects, some changed from string to number
- (foxthefox) new SHP time task config values

### 1.2.0 (npm)

- (foxthefox) new values powerocean
- (foxthefox) new values powerstream
- (foxthefox) new values plug
- (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)

- (foxthefox) enhancements to alternator values
- (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)

- (bh1cqx) handle HA restart #PR193
- (foxthefox) initial state population of BPInfo2/3 to HA
- (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)

- (foxthefox) changed code structure
- (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)

- (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
- (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
- (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
- (foxthefox) #173 DPU added additional battery selection
- (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
- (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
- (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)

- (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
- (foxthefox) update of Readme (adapter now in stable)
- (foxthefox) changes for responsive design #160

### 1.0.4 (npm)

- (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
- (foxthefox) correction for powerkit telegram reception #99
- (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)

- (foxthefox) watth16/17/18 upper range 10kWh
- (foxthefox) 'Backup reserve' option added for D2M #137
- (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)

- (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)

- (foxthefox) correction to level commands (not recognized when appendix level.xxx)
- (foxthefox) "this." for timer functions
- (foxthefox) corrected some debug functions
- (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING

- (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
- (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
- (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected,

### 0.0.42 (npm)

- (foxthefox) correction SHP command
- (foxthefox) new data point power ocean, range min corrections
- (foxthefox) shelly3em model definition
- (foxthefox) IOB checker corrections

### 0.0.41 (npm)

- (foxthefox) correction in Compare function

### 0.0.40 (npm)

- (foxthefox) IOB checker corrections

### 0.0.39 (npm)

- (foxthefox) update devDeps
- (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)

- (foxthefox) additional datapoints for power ocean
- (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)

- (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)

- (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
- (foxthefox) correction for transfer of values derived from protobuf to HA
- (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)

- (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)

- (foxthefox) first implementation for power ocean kit
- (foxthefox) first implementation for smart home panel 2
- (foxthefox) new values watth16/17/18 for powerstream
- (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
- (foxthefox) fixed updates to info.reconnects
- (foxthefox) fixed #90 cfgAcEnabled on river2max
- (foxthefox) logging enhancements

### 0.0.33 (npm)

- (foxthefox) added Power Kit
- (foxthefox) added new object ratedPower as command for powerstream

### 0.0.32 (npm)

- (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)

- (foxthefox) optimization EF MQTT reconnect
- (foxthefox) initial update slave battery to HA
- (foxthefox) online status from latestQuotas
- (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
- (foxthefox) correction for deltapro at xt60ChgType
- (foxthefox) correction for river2max commands

### 0.0.30 (npm)

- (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
- (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
- (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)

- (foxthefox) new objects for wave2
- (foxthefox) device emulation
- (foxthefox) mppt max value corrections

### 0.0.28 (npm)

- (foxthefox) fix value normalization (DP,wave2,glacier)
- (foxthefox) set actions initially to false to avoid null
- (foxthefox) fix latestQuotas for glacier/wave2
- (foxthefox) enhance logging

### 0.0.27 (npm)

- (foxthefox) fixed issues with additional battery and homeassistant transfer
- (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
- (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)

- (foxthefox) bmasMaster.amp max = 50
- (foxthefox) corrections SHP

### 0.0.25 (npm)

- (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)

- (foxthefox) SHP incomming data processing

### 0.0.23 (npm)

- (foxthefox) correction to latestQuotas (shift from info to action)
- (foxthefox) X_Unknown_15 range max 1000
- (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)

- (foxthefox) Homeassistant Connector/Gateway
- (foxthefox) added Generator (indication only, no knowledge on commands)
- (foxthefox) added Delta Pro Ultra
- (foxthefox) added Smart Home Panel
- (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
- (foxthefox) uptime no max boundary
- (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
- (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
- (foxthefox) info for offline/online status with EF cloud
- (foxthefox) correction for protobuf cmds (dataLen)
- (foxthefox) some strings are now diagnostic
- (foxthefox) X_unknown_15/17/34 are now numbers
- (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
- (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
- (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn

### 0.0.21 (npm)

- (foxthefox) more debug on connection
- (foxthefox) new datapoints for wave2
- (foxthefox) deleted max on duration values
- (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
- (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
- (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)

- (foxthefox) first additional integration tests
- (foxthefox) corrections in data model
- (foxthefox) new datapoints for glacier
- (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)

- (foxthefox) better error handling of incomplete messages from pstream
- (foxthefox) added indication of time tasks
- (foxthefox) cleanup pstream/plugs creation (both are protobuf)
- (foxthefox) further refactoring of code -> devices must be again defined !
- (foxthefox) differentiation between actual energy values and historical
- (foxthefox) getAllTaskCfg for powerstations in structure info
- (foxthefox) initial lastQuotas after adapter start for powerstream and plug
- (foxthefox) interpreted unknown values have now clear names
- (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
- (foxthefox) new data points for deltamax
- (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)

- (foxthefox) correction of wrong version number io io-package.json

### 0.0.17

- (foxthefox) added ems objects for River2Pro
- (foxthefox) more logging to pstream decode
- (foxthefox) spelling correction for latestQuotas

### 0.0.16

- (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15

- (foxthefox) new implementation of Wave 2 Air conditioner
- (foxthefox) new implementation of Glacier refrigerator
- (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
- (foxthefox) some shifting from string to diagnostics
- (foxthefox) some updates to max values
- (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy
- (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14

- (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
- (foxthefox) new feature get "lastQuotas"
- (foxthefox) recfactoring of protobuf encoding
- (foxthefox) watth5=daily energy plug, watth6=on time plug
- (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13

- (foxthefox) correction for changing of factors for pstations
- (foxthefox) watth5 for plugs
- (foxthefox) more logging pstream/plug
- (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12

- (foxthefox) new command brightness for plugs
- (foxthefox) correction of factors for plugs
- (foxthefox) powerstream bpType with value as texts
- (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
- (foxthefox) naming of watth1...8 (except 5)

### 0.0.11

- (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10

- (foxthefox) unknown pstream message debug possibility
- (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
- (foxthefox) new function -> smart plugs

### 0.0.9

- (foxthefox) final version of credential creation, at least 6.12.3 for admin required
- (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
- (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
- (foxthefox) processing multiple messages in one datagram

### 0.0.8

- (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
- (foxthefox) handling additional battery for Delta2Max
- (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) inv.acChgRatedPower -> max 4000W
- (foxthefox) inv.FastChgWatts -> max 2400W
- (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7

- (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6

- (foxthefox) device doc
- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5

- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
- (foxthefox) energy values (yield per day) for powerstream

### 0.0.4

- (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3

- (foxthefox) requirement for admin 6.12.2 -> 6.12.0
- (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
- (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
- (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2

- (foxthefox) pv2DcChgCurrent as level in delta2max
- (foxthefox) \*pv2DcChgCurrent with range 4-8 and step 2
- (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)

- (foxthefox) initial release

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