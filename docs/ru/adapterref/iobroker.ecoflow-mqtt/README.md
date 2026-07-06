---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: D1rKWu0HbkvRqAaFrit3qOdi8ETGYEIcONe6kFpQ7LY=
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
— Не вся информация известна, поэтому интерпретация статуса может быть неточной, это обычно обозначается символом "?" в конце.

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
— Из-за синхронности обновления информации и передачи команд иногда могут наблюдаться состояния гонки. Так, например, после подачи команды на переключение можно наблюдать его многократное переключение туда-обратно, прежде чем оно зафиксируется в нужном положении.

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

[Дельта 3 Классик](./doc/devices/delta3classic.md)

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
[Rapid Pro 320W](./doc/devices/rapidpro320.md)

### Неподдерживаемые устройства
Этот раздел создан для целей отладки. Пожалуйста, выберите устройство (Delta Pro3, Delta3, Delta3 Plus) и введите последовательный порт в добавленную строку. Предполагается, что неизвестное устройство использует протокол PROTOBUF. В логе будут созданы сообщения [PROTOBUF unknown], содержащие необработанную шестнадцатеричную телеграмму.

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

[older changes](./CHANGELOG.md)

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