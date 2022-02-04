---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: rIRMCKYKYkYUqBkMJA/yB4E9eFI7GjeGnBgpyZIgOVA=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последние)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ems-esp-stable.svg)
![Статус зависимости](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тестируйте и выпускайте](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Ems-esp и адаптер km200/IP-inside
Адаптер поддерживает интерфейс с системами отопления Bosch Group с использованием шины EMS или EMS+.
(Buderus/Junkers/Netfit и т.д.).

Он может взаимодействовать с системой отопления с использованием вызовов Web-API в направлении:

* км200, км200 грн, км100, км50 или ИП-внутри (от Bosch Group)
* Интерфейс ems-esp (https://github.com/emsesp/EMS-ESP32) с последней версией dev (см. ниже) и чипом ESP32. Старые шлюзы ESP8266 также частично поддерживаются.

Адаптер ems-esp может считывать и записывать данные в шину ems, управляющую всеми компонентами системы отопления.
Его можно использовать либо для исходных шлюзов Bosch-group, либо для ems-esp, либо для обоих параллельно.

Адаптер протестирован для шлюза ems-esp с последними версиями прошивки ESP32 >= v3.3.0.
Старые системы с ESP 8266 официально больше не поддерживаются, но могут работать.

ВАЖНЫЕ НАСТРОЙКИ в EMS-ESP:

* API V2: настройки MQTT должны быть в логическом формате 1/0!
* API V3: параметры форматирования для логического формата должны быть 1/0, а для номера формата перечисления
* Должен быть включен параметр «Включить команды записи API» в ems-esp.
* Должна быть установлена авторизация Bypass Access Token для вызовов API или должен быть введен токен.

При установке флажка либо используется структура устройства типа km200 для полей данных ems-esp, либо сохраняется исходный вид устройства EMS-ESP: котел, термостат, смеситель и т. д. При параллельном использовании шлюза km200 рекомендуется использовать данные km200. структура. Тогда все объекты/состояния находятся в одном и том же месте в структуре объектов ioBroker.

В отличие от адаптера km200, используемые поля могут быть определены в соответствующем csv-файле в параметрах экземпляра адаптера. Для запуска 1-го адаптера рекомендуется использовать «*», поэтому выберите все поля данных km200. Затем адаптер создает файл km200.csv в каталоге ../iobroker-data/ems-esp/{instance}. Этот файл можно использовать для следующего запуска экземпляра адаптера. Ненужные строки (поля) можно удалить, чтобы уменьшить количество считываемых полей km200. (Сделать копию)

Этот адаптер считывает значения after start из ems-esp и km200 с помощью HTTP-запросов на получение и способен подписываться на изменения состояния и отправлять соответствующие команды http (post) обратно либо на оборудование ems-esp, либо на шлюз km200.

* Опрос чтения EMS-ESP является параметром (стандартно 60 секунд) и не может быть установлен ниже 15 секунд.
* Опрос KM200 также является параметром (стандартно 300 секунд), и минимальное значение, которое можно установить, составляет 90 секунд.

Большинство современных систем отопления имеют шлюз ip-inside и поддерживают статистику энергопотребления:

* запись общего потребления электроэнергии и горячей воды (ГВС)
* Для этих систем и там, где эти данные доступны, можно прочитать статистику энергопотребления по общему потреблению и потреблению горячей воды (по часам / дням / месяцам).
* Должен быть установлен флажок записи и должен быть определен экземпляр базы данных (mySQL или InfluxDB).

Адаптер истории SQL или InfluxDB должен быть установлен и активен, чтобы использовать эту опцию.

* Пока протестировано только для баз данных mySQL и InfluxDB.
* Для InfluxDB < V2 политика хранения должна быть установлена как минимум на 170 недель.
* (изменить глобальную политику хранения на iobroker длительностью 170 Вт;)

Затем этот адаптер создает соответствующие состояния записи, включает статистику sql и записывает исторические записи базы данных с помощью команд sql и обновляет записи. Частота обновления каждый час. Затем значения можно отобразить с помощью инструментов построения диаграмм, например. адаптер Flot Charts или Grafana.

Можно включить статистику котла, показывающую:

* Время обработки цикла опроса для чтения шлюза ems-esp и/или km200 и обработки состояния
* Количество пусков котла и ГВС в час / 24 часа
* Загрузка котла в час (0-100%).

КПД котла можно рассчитать, если параметры заполнены.

* КПД котла можно рассчитать на основе средней температуры котла: (температура котла + температура обратки) / 2.
* Поскольку температура обратки больше недоступна в км200, температура обратки рассчитывается с температурой котла -10 °C, когда нет доступного ems-esp.
* Посмотрите техническое описание вашего котла, чтобы соответствующим образом скорректировать таблицу КПД.
* Для расчета статистики необходим экземпляр базы данных (см. выше).

Всякий раз, когда новая прошивка EMS-ESP добавляет новые поля данных и/или изменяет имена полей данных, они обрабатываются во время работы адаптера. Тем не менее устаревшие поля данных не удаляются адаптером автоматически.
Существует возможность перестроить структуру состояний, удалив состояния при перезапуске адаптера (состояния с записями в истории / БД сохраняются)

# Iobroker.ems-esp"

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.11 (2022-02-01)
* support for KM200 HRV (ventilation)
* corrections on recordings for 1st day of month

### 1.0.10 (2022-01-28)
* Further adjustments for ems firmware 3.4 and error corrections 1.0.9

### 1.0.9 (2022-01-27)
* New code to avoid mysql duplicate key errors
* Further adjustments for ems firmware 3.4

### 1.0.8 (2022-01-24)
* Adjustments for ems-esp firmware 3.4 part 2

### 1.0.7 (2022-01-24)
* Adjustments for ems-esp firmware 3.4

### 1.0.6 (2022-01-21) 
* Adjustments for non-UTF-8 json data from ems-esp
* Recalculate km200 recordings based on actual no of samples vs. theroretical max. samples

### 1.0.5
* first stable version for ioBroker repository

### 1.0.4
* Prepare for ioBroker repository

### 1.0.3
* Corrections within statistics module

### 1.0.2
* Corrections on km200 energy consumptions

### 1.0.1 
* prepare for compact-mode, re-write code

### 0.9.8 and 0.9.9
* Supporting Dallas Sensors on ems-esp gateway

### 0.9.7
* Fixes for IP-adresses

### 0.9.6
* Corrections for writing switchpoints and array-data back to km200

### 0.9.5
* Corrections for different enum-formats in API V3 (text and numbers)

### 0.9.4
* Support for old ESP8266 EMS-ESP gateways and API V2 and new ESP32 with API V3

### 0.9.3
* Polling time for EMS-ESP and KM200 is now a parameter

### 0.9.2
* Adjust for enum formats

### 0.9.1
* Adjust for different boolean formats

### 0.9.0
* Rework Adapter for some statistics and prepare for heating control (under development)

### 0.8.0
* REST API V3 and js-controller v3.3.x and support of influxdb for recordings

## License
MIT License

Copyright (c) 2022 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."