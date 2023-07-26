---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: IufM3tIMikJYx7enM7YMVTmo8P/MOZdVP9yIgUo2CAw=
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

## Системы отопления Bosch / Buderus с интерфейсом km200 / IP-inside и/или ems-esp
Адаптер поддерживает интерфейс с системами отопления от Bosch Group с использованием шины EMS или EMS+.
(Buderus/Junkers/Netfit и т.д.).

## Он может взаимодействовать с системой отопления с использованием вызовов Web-API в направлении:
* км200, км200 грн, км100, км50, HMC300 или IP-внутри (от Bosch Group)

* Интерфейс ems-esp (https://github.com/emsesp/EMS-ESP32) с последней версией dev (см. ниже) и чипом ESP32.

  Старые шлюзы ESP8266 с API V2 БОЛЬШЕ НЕ ПОДДЕРЖИВАЮТСЯ!!

Адаптер ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами системы отопления.
Его можно использовать либо для исходных шлюзов Bosch-group, либо для ems-esp, либо для обоих параллельно.
Все измененные состояния из собственных скриптов или обозревателя объектов должны быть установлены без подтверждения = false !!!

Адаптер протестирован для шлюза ems-esp с последними версиями прошивки ESP32 >= v3.5.1.

## Важные настройки в EMS-ESP:
* Параметры форматирования для логического формата должны быть 1/0, а для значения/числа формата Enum.
* Должен быть включен параметр «Включить команды записи API» в ems-esp.
* Должна быть установлена авторизация Bypass Access Token для вызовов API или должен быть введен токен.

При установке флажка либо используется структура устройства типа km200 для полей данных ems-esp, либо сохраняется исходное представление устройства EMS-ESP: котел, термостат, смеситель и т. д. При параллельном использовании шлюза km200 рекомендуется использовать данные km200. состав. Тогда все сущности/состояния находятся в одном и том же месте в структуре объектов ioBroker.

## Опрос
Этот адаптер считывает значения after start из ems-esp и km200 с помощью HTTP-запросов get и может подписываться на изменения состояния и отправлять соответствующие http-команды (post) обратно либо на оборудование ems-esp, либо на шлюз km200.

* Опрос чтения EMS-ESP является параметром (стандартно 60 секунд) и не может быть установлен ниже 15 секунд.
* Опрос KM200 также является параметром (стандартно 300 секунд), и минимальное значение, которое можно установить, составляет 90 секунд.
* Записи km200 (статистика энергопотребления и температуры) обновляются каждый час

## Км200
Вызовы веб-API к/от шлюза km200 зашифрованы. Для шифрования/дешифрования необходимы два пароля:

* пароль шлюза на этикетке шлюза в виде: xxxx-xxxx-xxxx-xxxx (с учетом регистра)
* личный пароль, установленный с помощью приложения Buderus **MyDevice** (не используйте myBuderus / EasyCom или аналогичные облачные приложения!)

Поля, которые будут использоваться для шлюза bosch, также можно определить путем опроса структуры km200 (*) или соответствующего CSV-файла в параметрах экземпляра адаптера.
Для запуска 1-го адаптера рекомендуется использовать «*» для выбора всех полей данных km200.
Затем адаптер создает файл km200.csv в каталоге ../iobroker-data/ems-esp/{instance}.

Этот файл можно использовать для следующего запуска экземпляра адаптера.
Ненужные строки (поля) можно удалить, чтобы уменьшить количество считываемых полей km200. (Сделайте копию и переименуйте файл)

## Km200 записей (статистика энергии и температуры)
Большинство современных систем отопления имеют шлюз ip-inside и поддерживают статистику энергопотребления:

* запись статистики энергопотребления и температуры
* Для этих систем и там, где эти данные записи доступны, соответствующая статистика опрашивается и сохраняется в состояниях.

Доступны ежечасные, дневные и ежемесячные статистические данные, которые хранятся в виде массива данных в состояниях, а если выбран экземпляр базы данных, то также в состояниях, заполненных записями базы данных. (имена состояний начинаются с «_»)

* Должен быть установлен флажок записи и должен быть определен экземпляр базы данных (mySQL или InfluxDB). Адаптер истории SQL или InfluxDB должен быть установлен и активен, чтобы использовать эту опцию.
* исходные данные записи, считанные вызовами веб-API, хранятся в структуре состояния km200.
* Статистика БД, отображаемая в виде графиков или графана, пока доступна только для баз данных mySQL и InfluxDB.
* Для InfluxDB V1 политика хранения должна быть установлена как минимум на 170 недель. (изменить глобальную политику хранения на iobroker длительностью 170 Вт;)
* Для InfluxDB V2 глобальная политика хранения устанавливается адаптером influxdb — пожалуйста, установите в адаптере influxdb время хранения на «без автоматического удаления»!

Затем этот адаптер создает соответствующие состояния записи, включает статистику sql и записывает исторические записи базы данных с помощью команд sql и обновляет записи. Частота обновления каждый час.

ВАЖНО: ПОЖАЛУЙСТА, НЕ БУДЬТЕ РАЗДРАЖАНЫ, ЕСЛИ ЗНАЧЕНИЯ СООТВЕТСТВУЮЩИХ СОСТОЯНИЙ ПОКАЗЫВАЮТ ЗНАЧЕНИЯ NULL().
В НЕКОТОРЫХ СЛУЧАЯХ ЗНАЧЕНИЯ НЕ ОТОБРАЖАЮТСЯ ПРАВИЛЬНО В БРАУЗЕРЕ ОБЪЕКТОВ АДМИНИСТРИРОВАНИЯ - ПОЖАЛУЙСТА, ИСПОЛЬЗУЙТЕ ДЛЯ ОТОБРАЖЕНИЯ FLOT ИЛИ GRAFANA !!!

## Записей km200 - объяснение
Некоторые значения полей установлены как «записываемые». Затем эти поля будут иметь «записи».
В зависимости от типа отопительной системы эти записи сохраняются в папке Records/... или EnergyMonitoring/...

Для зарегистрированных состояний каждую минуту в шлюзе km200 собирается образец.
Часовое значение должно иметь 60 отсчетов, ежедневное 24*60=1440 отсчетов, месячное 1440 x #days.
Каждый период времени должен быть прочитан в адаптере тремя API-вызовами:

* Почасовые значения: сегодня, вчера, позавчера
* Ежедневные значения: фактический месяц, последние месяцы, месяц -2
* Ежемесячные значения: фактический год, прошлый год, год -2

В прочитанном поле данных с помощью веб-API сумма выборочных значений хранится в y-значении, а не в с-значении.
(см. исходные значения в json-данных в полях km200....)

Поскольку иногда выборки отсутствуют, значения энергии можно интерполировать. Интерполяция настраивается (вкл/выкл).
За некоторые месяцы (> 12 месяцев назад) некоторые данные могут отсутствовать. (Ошибки Bosch в коде?)

Для фактического месячного потребления энергии адаптер рассчитывает сумму дневных значений и использует эту сумму для получения более точных данных.

## Статистика
Можно включить статистику котла, показывающую:

* Время обработки цикла опроса для чтения шлюза ems-esp и/или km200 и обработки состояния
* Количество пусков котла и ГВС в час / 24 часа
* Загрузка котла в час (0-100%).
* Для расчета статистики необходим активный экземпляр базы данных (см. выше).

## КПД котла
КПД котла можно рассчитать, если параметры заполнены. (Только для газовых и жидкотопливных котлов)

* КПД котла можно рассчитать на основе средней температуры котла: (температура котла + температура обратки) / 2.
* Когда температура возврата недоступна в km200/ems-esp, расчет эффективности не имеет смысла - пожалуйста, отключите, чтобы избежать ошибок
* Посмотрите техническое описание вашего котла, чтобы соответствующим образом скорректировать таблицу КПД.
* В некоторых системах отопления эта функция выдает ошибки - выключите !!!
* изменена логика с выпуском >= v1.30.0

## Изменения в структуре состояний
Всякий раз, когда новая прошивка EMS-ESP добавляет новые поля данных и/или изменяет имена полей данных, они обрабатываются во время работы адаптера. Тем не менее устаревшие поля данных не удаляются адаптером автоматически.
Существует возможность перестроить структуру состояний, удалив состояния при перезапуске адаптера (состояния с записями в истории / БД сохраняются)

## Регулирование потребности в тепле
Пояснение к расчету потребности в тепле и конфигурации. Доступно только на немецком языке: https://github.com/tp1de/ioBroker.ems-esp/wiki

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2023-07-25)
* error corrections for km200 read

### 2.0.2 (2023-07-24)
* re-add parameters for room / function
* change statistics update intervall for number of starts to every 5 minutes

### 2.0.1 (2023-07-24)
* without parameters for enum attributes
* Error correction on v2.0.0 for ems-esp datanames and structure

### 2.0.0 (2023-07-23)
* DO NOT USE - DOES NOT WORK correctly !!
* support for ems-esp version 3.6
* message about ems-esp adapter version to use for old gateway v2 users
* rework statistics to avoid slowing down admin adapter
* some minor improvements

### 1.34.0 (2023-07-21)
* avoid warnings on statistics processing for new installations without historic data yet
* allow statistics for polling-time for both gateways without active database
* allow old "dallas" prefix instead of "temperaturesensors"

### 1.33.0 (2023-07-20)
* Rework adapter instance config: Split EMS-ESP and KM200 config pages
* parameters stay the same

### 1.32.0 (2023-07-19)
* ems-esp v3.6 adjustments for dallas/temperaturesensors (not tested yet)
* update dependencies 
* improve processing off errors on statistics
* Small adjustments on parameter screen

### 1.31.0 (2023-07-08)
* correction on JSON errors for ems-esp gateway entities (heatpump)

### 1.30.0 (2023-04-12)
* update efficience calculation to support external sensor for return temperature
* when 3 state fields are empty then standard fields are used.
* when state field(s) are filled, than this state(s) are used - e.g. own sensor for return temp
* coorect error processing when no ems-esp devices found

### 1.29.0 (2023-03-08)
* update dependencies

### 1.28.0 (2023-03-08)
* update dependencies

### 1.27.0 (2023-03-08)
* update dependencies

### 1.26.0 (2023-02-27)
* error corrections due to changes since v1.21

### 1.25.0 (2023-02-26)
* set acknowledge to true when re-reading changed values from ems-esp

### 1.24.0 (2023-02-26)
* error corrections for version 1.22 and 1.23

### 1.23.0 (2023-02-26)
* correct ww states from v1.22

### 1.22.0 (2023-02-17)
* support multiple mixer devices

### 1.21.0 (2023-01-02)
* am200 from ems-esp adjustments to changed structure

### 1.20.0 (2022-12-29)
* am200 from ems-esp - redefine to heatSources/hsa for km200 structure mode

### 1.19.0 (2022-12-29)
* am200 - alternative heatsource adjustments

### 1.18.0 (2022-12-24)
* Statistics
* alternative heat souces (am200)

### 1.17.1 (2022-12-04)
* correct actualweight statistics within heatdemand function

### 1.17.0 (2022-12-02)
* add actual weight per thermostat in heatdemand object structure
* add heatdemand difference values

### 1.16.2 (2022-11-21)
* adjustments for ems-esp sensors v3.5

### 1.16.1 (2022-11-20)
* error correction sensors

### 1.16.0 (2022-11-20)
* ems-esp V2 NOT SUPPORTED ANYMORE !!!!
* pepare for enum as values and not just index
* new parameters for "Room" and "Function" for adapter states
* adjust for latest ems-esp dev version 3.5 
* units of measument for ems-esp sensors
* support name changes within ems-esp for sensors

### 1.15.0 (2022-06-06)
* adjustments for ems-esp RC310 holiday modes

### 1.14.0 (2022-05-18)
* split parameters for dallas & analog sensors
* improve warning messages if sensors are missing

### 1.13.0 (2022-05-17)
* add visibility attributes within ems-esp states
* error processing dallas / analog sensors of ems-esp

### 1.12.1 (2022-05-16)
* corrections for heatdemand function
* enable expert view
* vis views for syslog analysis in expert views

### 1.12.0 (2022-05-15)
* add analog sensors for ems-esp gateway, remove ems-esp settings

### 1.11.2 (2022-04-27)
* code optimization and error processing for ems-esp gateway

### 1.11.1 (2022-04-25)
* error corrections on invalid heatdemand states

### 1.11.0 (2022-04-24)
* corrections on hourly recordings for temperature
* make interpolation (missing of c-counts) in energy recordings configurable (on/off)
* error corrections on heatdemand with empty data

### 1.10.0 (2022-04-23)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit 
* error corrections on efficiency calculation - make fields used configurable
* some other error corrections

### 1.9.0 (2022-04-18)
* beta test new version (github only)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit

### 1.4.0 (2022-03-16)
* recordings new logic and now working without database instance as well

### 1.3.3 (2022-02-26)
* avoid null values in recordings

### 1.3.2 (2022-02-25)
* correction for recordings without reference object
* corrections for mySQL recordings

### 1.3.1 (2022-02-24)
* correction on temperature recordings (months and days)

### 1.3.0 (2022-02-23)
* new logic and state-structure for km200 recordings
* recordings stored in states [array of values] and within database
* please adjust adapter configuration
* support of Buderus heatpump with Logamatic HMC300 IP-Inside

### 1.2.1 (2022-02-18)
* adjust for js-controller v4 - part 2
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.2.0 (2022-02-18)
* Adjust for js-controller v4 - part 1
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.1.1 (2022-02-11)
* Improve tests on km200 ip-address and passwords

### 1.1.0 (2022-02-07)
* last tested version for old ems-esp ESP8266 with API V2.
* support for KM200 HRV (ventilation)
* corrections for km200 recordings and statistics module
* prepare for ems-esp firmware 3.4

## License
MIT License

Copyright (c) 2023 Thomas Petrick <tp1degit@gmail.com>

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