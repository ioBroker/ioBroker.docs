---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: 8C9H3FXK3XRavny+kDWWy6b4UMPSCeaN5Ep0C06qXoA=
---
![Логотип](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![Количество установок](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**Тесты:** ![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## Адаптер ecoflow-mqtt для ioBroker
подключается к продуктам Ecoflow ([https://www.ecoflow.com])

## ПРЕДУПРЕЖДЕНИЕ
Этот адаптер использует неофициальную связь с устройствами.
Неправильная связь или установка неверных значений могут повлиять на функциональность устройства и привести к его отключению от сервиса.

Данный адаптер создан на основе работы:

- моя собственная оценка и исследование
- https://github.com/tolwi/hassio-ecoflow-cloud
- https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
- https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
- https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

## Учетные данные EF
На странице администратора (первая вкладка) необходимо ввести учетные данные MQQT для брокера MQQT.

- Имя пользователя - что-то вроде "app-...."
- Идентификатор пользователя - 19-значное число
- Пароль пользователя - буквенно-цифровой
- ClientID - строка, начинающаяся с "ANDROID\_...."

Есть 3 варианта:

1. С помощью скрипта https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. через веб-сайт https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. с помощью собственного алгоритма адаптера (нажатием кнопки), для этого необходимы имя пользователя и пароль ecoflow.

Настройки брокера mqqt установлены по умолчанию и обычно не требуют изменения.

!!! В случаях, когда MQTT-сервер отклоняет соединение, может быть полезно проверить вывод этого веб-сайта с помощью варианта №2; в некоторых случаях он вернет другой адрес MQTT-брокера !!!

## Настройка и конфигурация устройства
Для добавления оборудования используйте вкладку «Конфигурация устройства(ов)».

<details><summary><i>Параметризация потока мощности или STREAM</i></summary><p>

- добавить новую строку
- Установите deviceID для (Power)Stream так, как показано в приложении, например, "HW51..../BK....".
- дайте ему имя
- выберите версию

</p></details>

<details><summary><i>Параметризация электростанции</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Powerstation, как показано в приложении; строка может отличаться в зависимости от типа устройства.
- дайте ему имя
- выберите тип устройства
- Если подключен дополнительный аккумуляторный блок, проверьте номер порта, к которому он подключен.

</p></details>

<details><summary><i>Параметризация «умной» розетки</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Smart Plug, как показано в приложении, например, "HW52...".
- дайте ему имя
- установить тип на "вилка"

</p></details>

<details><summary><i>Параметризация интеллектуального счетчика</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Smartmeter (Shelly или EF) так, как он отображается в приложении. Если используется Shelly, имейте в виду, что идентификатор отличается от идентификатора самого устройства Shelly.
- дайте ему имя
- установите тип на "Shelly3EM" или "EF smartmeter"

</p></details>

<details><summary><i>Параметризация генератора</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства генератора, как показано в приложении, например, "DGEB...".
- дайте ему имя
- установить тип на "Генератор"

</p></details>

<details><summary><i>Параметризация панели «Умный дом»</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства генератора, как показано в приложении, например, "SP10...".
- дайте ему имя
- установите тип на "SHP" или "SHP2"

</p></details>

<details><summary><i>Параметризация силового блока и концентратора</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства блока питания, как показано в приложении, например, "M10...".
- дайте ему имя
- выберите тип "Power Kit BP2000" или "Power Kit BP5000".
- Если подключена вторая или третья батарея, то отметьте её как slave1 или slave2.

</p></details>

<details><summary><i>Параметризация конфигурации Power Ocean DC</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства генератора, как показано в приложении, например, "HJ31...".
- дайте ему имя
- установить тип на "Power Ocean"
- Если подключена вторая или третья батарея, то отметьте её как slave1 или slave2.

</p></details>

<details><summary><i>Параметризация волны</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Smart Plug, как показано в приложении, например, "KT21ZCH...".
- дайте ему имя
- установить тип "Wave2"

</p></details>

<details><summary><i>Параметризация ледника</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Smart Plug, как показано в приложении, например, "BX11ZCB...".
- дайте ему имя
- установить тип на "Ледник"

</p></details>

<details><summary><i>Параметризация генератора переменного тока</i></summary><p>

- добавить новую строку
- Установите идентификатор устройства Smart Plug, как показано в приложении, например, "F371ZE...".
- дайте ему имя
- установите тип на "Генератор 800 Вт"

</p></details>

Для настройки MQTT-соединения с Home Assistant используйте вкладку "Homeassistant".

<details><summary><i>Параметризация коннектора Homeassistant</i></summary><p>

- включить сервис
- установить пользовательские настройки MQTT-брокера Home Assistant
- установить параметры подключения MQTT-брокера Home Assistant
— При необходимости выберите параметры отладки

Модификация со стороны гиалуроновой кислоты:

- Адаптер использует функцию обнаружения в Home Assistant, настройка точек данных в Home Assistant не требуется.
- Дополнение MQTT ...

</p></details>

## Обновление адаптера
Обычно достаточно установить следующую версию поверх старой. В некоторых случаях (например, 1.0.0) может потребоваться удалить всё дерево объектов.
Если изменяются значения, связанные с точками данных, например, минимальное или максимальное значение диапазона, то необходимо:

- остановить адаптер
- удалены соответствующие точки данных
- запустить адаптер

После этого начинается производство новых линеек продукции.

## Функции адаптера ioBroker
- Определенные устройства подключаются к адаптеру через MQTT.
— Адаптер фильтрует входящие сообщения от устройств. Внутри сохраняются только измененные значения.
- Если приложение препятствует настройке при определенных условиях, то, как только это станет известно, проблема будет воспроизведена (например, если инвертор включен, когда уровень заряда батареи ниже минимального, вы увидите предупреждение в журнале).
— Не вся информация известна, поэтому интерпретация статуса может быть неточной, это обычно обозначается знаком вопроса в конце.

### Примечания к обновлению настроек точек данных (мин., макс., единица измерения и т. д.)
Если в новой версии адаптера изменены параметры точки данных (например, имя, единица измерения, максимальное значение), изменения не вступят в силу до тех пор, пока вы не выполните следующие действия:

- остановить экземпляр адаптера
- удалить соответствующую точку данных или всю структуру объекта экземпляра адаптера.
- запустить экземпляр адаптера

При запуске системы точки данных создаются, но не изменяются, если они уже существуют.

### Примечания к предупреждениям/ошибкам
Некоторые события в адаптере помечаются как предупреждение или ошибка, чтобы отображаться в журнале, когда уровень логирования находится в режиме информации.
Это не обязательно означает сбой или неисправность адаптера, скорее это признак нежелательного поведения. Причина может быть не в самом адаптере, но на это следует обратить внимание.

## Разъем/шлюз высокой доступности
- Функция обнаружения MQTT в Home Assistant обеспечивает элегантный способ обмена информацией.
- Функция обнаружения MQTT может быть не активирована, если брокер MQTT уже запущен в режиме высокой доступности; её необходимо включить во время перенастройки службы MQTT.
- При каждом запуске адаптера iobroker все объекты обнаружения передаются в HA (даже если они должны сохраняться в HA).
- Адаптер iobroker фильтрует входящие сообщения от устройств. Внутри системы сохраняются и передаются в Home Assistant только измененные значения.
- Если значение не было задано при обновлении данных устройства, оно будет отображаться как неизвестное в Home Assistant.
- Если устройство доступно, то его доступность отображается в списке подключенных устройств; эта информация наследуется "подустройствами" (недоступность обрабатывается аналогичным образом).

[некоторые_подсказки_для HA](./doc/en/IOB_HA/navi.md)

### Аннотации к функциональности
— Из-за синхронности обновления информации и передачи команд иногда могут наблюдаться состояния гонки. Так, если подается команда на переключение, можно наблюдать его многократное переключение туда-обратно, прежде чем оно зафиксируется в нужном положении.

## Реализованные устройства и структура с точками данных
некоторое пояснение к данным устройства

- число -> точка данных с числовым значением
- уровень -> регулируемая точка данных с числовым значением, иногда также выбираемые значения, имеющие числовое представление.
- переключатель -> регулируемая точка данных (логическое значение)
- диагностический -> логический или многосостоятельный параметр, преобразованный в текст
- строка -> точка данных только в текстовом формате
- массив -> точка данных с массивом
- При преобразовании значения в текст может использоваться непроверенный текст (обратная связь приветствуется), это обозначается знаком "?" в конце текста.

### Электростанция
[Ривер Макс](./doc/devices/rivermax.md)

[Ривер Про](./doc/devices/riverpro.md)

[Река 2 Макс](./doc/devices/river2max.md)

[Ривер 2 Про](./doc/devices/river2pro.md)

[Река 3](./doc/devices/river3.md)

[Река 3 Плюс](./doc/devices/river3plus.md)

[Дельта Мини](./doc/devices/deltamini.md)

[Дельта](./doc/devices/delta.md)

[Дельта Макс](./doc/devices/deltamax.md)

[Дельта 2](./doc/devices/delta2.md)

[Дельта 2 Макс](./doc/devices/delta2max.md)

[Дельта 3](./doc/devices/delta3.md)

[Дельта 3 Плюс](./doc/devices/delta3plus.md)

[Дельта 3 Макс Плюс](./doc/devices/delta3maxplus.md)

[Дельта Про](./doc/devices/deltapro.md)

[Дельта Про 3](./doc/devices/deltapro3.md)

[Дельта Про Ультра](./doc/devices/deltaproultra.md)

### Панель «Умный дом»
[Панель «Умный дом»](./doc/devices/panel.md)

[Панель «Умный дом» 2](./doc/devices/panel2.md)

### Комплект питания и концентратор
[Комплект питания](./doc/devices/powerkit.md)

### Power Ocean
[Power Ocean DC](./doc/devices/powerocean.md)

[Power Ocean Plus](./doc/devices/poweroceanplus.md)

[Power Ocean DC FIT](./doc/devices/poweroceanfit.md)

### Генератор
[Генератор](./doc/devices/generator.md)

Двухтопливный генератор недоступен, но может быть реализован при наличии необходимых данных.

### Powerstream & Stream
[Powerstream](./doc/devices/pstream600.md)

[Поток AC](./doc/devices/stream_ac.md)

[Stream AC PRO](./doc/devices/stream_ac_pro.md)

[Стрим Ультра](./doc/devices/stream_ultra.md)

[Потоковой инвертор](./doc/devices/stream_inverter.md)

Также реализована версия на 800 Вт, единственное отличие — максимальная мощность 800 Вт.
Приоритет питания -> 0/false = приоритетное питание от сети; -> 1/true = приоритетное питание от батареи (зарядка)

### Умные розетки
[Умная розетка](./doc/devices/plug.md)

### Устройства интеллектуального учета
[Shelly3EM](./doc/devices/shelly3em.md)

[Умный счетчик](./doc/devices/smartmeter.md)

### Кондиционер Wave
[Волна2](./doc/devices/wave2.md)

[Волна3](./doc/devices/wave3.md)

Функция Wave недоступна, но может быть реализована при наличии данных.

### Холодильник «Ледник»
[Ледник](./doc/devices/glacier.md)

[Glacier Classic 55L](./doc/devices/glacier55.md)

Генератор
[Генератор](./doc/devices/alternator.md)

### Зарядное устройство
[Рапид Про](./doc/devices/rapid.md)

### Неподдерживаемые устройства
Этот раздел создан для целей отладки. Пожалуйста, выберите устройство (Delta Pro3, Delta3, Delta3 Plus) и введите последовательный порт в добавленную строку. Предполагается, что неизвестное устройство использует протокол PROTOBUF. В журнале будут созданы сообщения [PROTOBUF unknown], содержащие необработанную шестнадцатеричную телеграмму.

## Задачи
- Проверить забытые граничные условия для команд (команда запрета или дополнительное значение)
- Проверьте команду звукового сигнала, если требуется реверсирование.
- SlaveBattery DM, умножение выходной мощности на 10 Вт
- Дополнительные команды getCmd для значений SHP

## Отказ от ответственности
Данное программное обеспечение с открытым исходным кодом никоим образом не связано с компанией Ecoflow и не поддерживается ею.
Использование программного обеспечения осуществляется на ваш собственный риск и по вашему усмотрению, и я не несу никакой ответственности за любые потенциальные убытки или проблемы, которые могут возникнуть в результате использования программного обеспечения. Важно понимать, что использование данного программного обеспечения с открытым исходным кодом не предполагает прямой поддержки или гарантий со стороны компании Ecoflow.

## Changelog

### 1.4.9 (WIP)

- (foxthefox) new datapoints Delta2max

### 1.4.8 (npm)

- (foxthefox) new device Glacier Classic 55L support
- (foxthefox) new device Delta 3 Max Plus support
- (foxthefox) new device Stream AC support
- (foxthefox) new device Rapid Pro 320W support
- (foxthefox) enhancements on wave3
- (foxthefox) corrections in river3plus for data processing
- (foxthefox) corrections in D2M for command inv.cfgAcEnabled #340
- (foxthefox) poweroceanplus set hrPwr/fromPv/romBat/fromGrid values to 0 for non transmitted datapoints in HeatingRodEnergyStreamShow
- (foxthefox) poweroceanplus pcsActPwr max 20kW, pcsXPhase_amp max 60A
- (foxthefox) corrections in BMSHeartBeatReport for river3/river3plus
- (foxthefox) powGetSysLoad for streamAC/ACPro/Ultra set to 10kW, powGetSchuko 2100W
- (foxthefox) new msg counter for received telegrams from EF-cloud (within 10s)
- (foxthefox) correction of enBeep (dataLen=2) for Delta3/+/max+/pro
- (foxthefox) correction of AC1/2/3 switching on SHP2 (issue #312)
- (foxthefox) Stream AC timetask58x exclude
- (foxthefox) correction of powerocean / powerocean+ (issue #378), new ENERGY_STREAM_DETAIL and switch for missing datapoint -> value = 0
- (foxthefox) dev dependencies cleanup

### 1.4.7 (npm)

- (foxthefox) poweroceanplus, set mpptPwr/sysGridPwr/bpPwr values to 0, when the entity is not sent within the telegram
- (foxthefox) poweroceanplus, bpTargetSoc max new set to 101%, pcsBpPower max=10kW, pcsXPhase_actPwr min=-5kW

### 1.4.6 (npm)

- (foxthefox) powerocean implementation of ParallelEnergyStreamDetail which is the update to ParallelEnergyStreamReport
- (foxthefox) powerocean implementation of EnergyStreamDetail which is the update to EnergyStreamReport

### 1.4.5 (npm)

- (foxthefox) change from object to array for messages (for telegrams with multiple messages of same type i.e. powerocean)
- (foxthefox) change of cmdId/CmdFunc structure

### 1.4.4 (npm)

- (foxthefox) new datapoints for PowerOcean (HeatingRod, ParallelEnergy)
- (foxthefox) improvements tp powerocean plus
- (foxthefox) corrections for powerocean
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

Copyright (c) 2023-2026 foxthefox <foxthefox@wysiwis.net>

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