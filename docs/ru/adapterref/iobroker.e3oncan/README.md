---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: yOPURHjALTS8LFxCvZ7F6bRoIinPS2T2dFhTsl/Yrn0=
---
![Логотип](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Количество установок](https://iobroker.live/badges/e3oncan-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/e3oncan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Тесты:** ![Тестирование и выпуск](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## Адаптер e3oncan для ioBroker
# Основная концепция
Устройства серии Viessmann E3 (One Base) выполняют большой обмен данными по шине CAN.

Этот адаптер может прослушивать эту связь и извлекать много полезной информации. Также поддерживаются счетчики электроэнергии E380CA и E3100CB. Этот режим работы называется **Сбор**.

Параллельно поддерживается **чтение и запись точек данных**. Информацию, недоступную при прослушивании, можно активно запрашивать. Записывая точки данных, можно изменять заданные значения, расписания и т. д. Можно даже добавлять новые расписания, например. для циркуляционного насоса ГВС. Этот режим работы называется **UDSonCAN**. Протокол UDsonCAN (**U**универсальные **диагностические **сервисы **на базе **шины CAN**) также используется другим оборудованием, например через известный шлюз WAGO.

Запись данных инициируется сохранением соответствующего состояния с непроверенным `Acknowledged` (ack=false) — да, это так просто! Точка данных будет снова прочитана с устройства и сохранена в состоянии через 2,5 секунды после записи. Если состояние не подтверждено, просмотрите журналы.

Запись ограничивается набором точек данных с использованием **белого списка**. Список хранится в информационном разделе каждого устройства, например. в `e3oncan.0.vitocal.info.udsDidsWritable`. Вы можете добавить больше точек данных, отредактировав это состояние. Обязательно **не** проверяйте `Acknowledged` при сохранении состояния.

При первом запуске экземпляра адаптера будет выполнено сканирование устройств, предоставляющее список всех доступных устройств E3 для диалогового окна конфигурации (счетчики энергии не указаны).
Сканирование точек данных каждого устройства E3 должно выполняться во время первой настройки, подробности см. ниже.

Какие режимы работы (Collect и/или UDSonCAN) можно использовать, зависит от **топологии вашего устройства**. Дополнительную информацию можно получить [здесь](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34).

Возможные **сценарии использования** см. в [обсуждение](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) (в стадии разработки).

Важные части этого адаптера основаны на проекте [open3e](https://github.com/open3e).

Также доступна реализация подхода чистого прослушивания (только сбор) на основе Python с использованием обмена сообщениями MQTT, см. [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Начиная
**Предварительные условия:**

* У вас есть адаптер (USB-к) CAN-шины, подключенный к внешней CAN-шине устройства Viessmann E3.
* В настоящее время поддерживаются только системы на базе Linux.
* CAN-адаптер поднят и виден в системе, например. как «can0» (для проверки используйте ifconfig).
* Дополнительную информацию см. в проекте open3e.
* **Убедитесь, что во время первоначальной настройки не запущен ни один другой клиент UDsonCAN (например, Open3Eclient.py)!** Это может привести к ошибкам связи в обоих приложениях.

Все услуги, предоставляемые этим адаптером, основаны на списке устройств вашей конкретной установки Viessmann E3. Поэтому для первой настройки вам необходимо выполнить следующие шаги:

**Конфигурация**

* После завершения установки адаптера появится диалоговое окно конфигурации для настройки до двух адаптеров CAN-шины (вкладка «CAN ADAPTER»)
* Отредактируйте имя адаптера и установите флажок «Подключиться к адаптеру» хотя бы для внешнего адаптера.
* Когда вы закончите, нажмите кнопку «СОХРАНИТЬ», чтобы применить изменения. Этот шаг является **обязательным**. Экземпляр перезагрузится и подключится к адаптеру CAN.
* Перейдите на вкладку «СПИСОК УСТРОЙСТВ UDS» и выполните сканирование доступных на шине устройств, нажав кнопку сканирования. **Это займет несколько секунд.** Вы можете наблюдать за действиями на второй вкладке браузера, просматривая информацию о журнале адаптера.
* Вы можете изменить название устройств во 2-м столбце. Эти имена будут использоваться для хранения всех собранных данных в дереве объектов ioBoker. После внесения изменений снова нажмите кнопку «СОХРАНИТЬ».
* Экземпляр снова перезапустится, и через несколько секунд вы будете готовы к сканированию доступных точек данных. Перейдите на вкладку «СПИСОК ТОЧЕК ДАННЫХ», нажмите кнопку «Начать сканирование...» и подтвердите нажатием «ОК». **Проявите терпение** – это может занять **до 5 минут**. Вы можете наблюдать за ходом выполнения на второй вкладке браузера, просматривая информацию о журнале адаптера.

Этот шаг не является обязательным, но настоятельно рекомендуется. Если вы хотите записать данные в точки данных, вам необходимо сначала выполнить сканирование точек данных.

* После успешного завершения сканирования точек данных точки данных станут доступны в дереве объектов для каждого устройства. Вы можете просмотреть точки данных в конфигурации, выбрав устройство и нажав кнопку «Обновить список точек данных». Нажмите символ фильтра и введите шаблон поиска, чтобы отфильтровать имя и/или кодек. Это только для вашей информации. Пожалуйста, отключите фильтрацию перед выбором другого устройства, чтобы избежать сообщений об ошибках.
* Последний шаг — настройка расписаний сбора данных на вкладке «НАЗНАЧЕНИЕ ВНЕШНЕМУ CAN-АДАПТЕРУ».
* Для **счетчиков энергии** (если они доступны в вашей настройке) вы можете просто активировать или нет. Обратите внимание на значение «Мин. время обновления (с)». Обновления отдельных точек данных выполняются не быстрее, чем заданное значение (по умолчанию — 5 секунд). При выборе нуля все полученные данные будут сохранены. Поскольку счетчики электроэнергии отправляют данные очень быстро (более 20 значений в секунду), рекомендуется не использовать здесь ноль. Это создаст большую нагрузку на систему ioBroker.
* Если вы подключили устройства E3 через шину CAN, например. Vitocal и VX3, вы можете собирать данные, которыми обмениваются эти устройства, в режиме реального времени, прослушивая их. Нажмите «+», чтобы добавить строку, установите флажок «активно», выберите устройство и отредактируйте «Мин. время обновления (с)». Здесь возможно использовать 0, однако я рекомендую придерживаться 5.
* Наконец, вы можете добавить расписания запроса данных по протоколу UDsonCAN. Снова нажмите кнопку «+» и отредактируйте настройки. На каждом устройстве может быть несколько расписаний. Благодаря этому вы можете запрашивать одни точки данных чаще, чем другие. Значение по умолчанию 0 для «Расписания (ов)» означает, что эти точки данных будут запрошены только один раз во время запуска экземпляра.

Вы можете использовать информацию о точках данных на вкладке «СПИСОК ТОЧЕК ДАННЫХ» для справки (может помочь открытие второй вкладки).

* Если вы настроили CAN-адаптер, подключенный к **внутренней CAN-шине**, будет видна вкладка «НАЗНАЧЕНИЕ ВНУТРЕННЕМУ CAN-АДАПТЕРУ». Пожалуйста, настройте устройства для сбора там. UDsonCAN не поддерживается на внутренней шине CAN устройствами E3.
* Вот и все. Нажмите кнопку «СОХРАНИТЬ И ЗАКРЫТЬ» и проверьте собранные данные в дереве объектов.

# Данные и единицы измерения E380
Поддерживается до двух счетчиков энергии E380. Идентификаторы точек данных зависят от CAN-адреса устройства:

CAN-адрес=97: точки данных с четными идентификаторами

CAN-адрес=98: точки данных с нечетными идентификаторами

| удостоверение личности | Данные| Единица |
| ------|:--- |------|
| 592 593 | Активная мощность L1, L2, L3, общая |  Вт |
| 594 595 | Реактивная мощность L1, L2, L3, общая | вар |
| 596 597 | Абсолютный ток, L1, L2, L3, cosPhi | А, - |
| 598 599 | Напряжение, L1, L2, L3, Частота | В, Гц |
| 600 601 | Совокупный импорт, экспорт | кВтч |
| 602 603 | Суммарная активная мощность, Суммарная реактивная мощность | Вт, вар |
| 604 605 | Совокупный импорт | кВтч |

# Данные и единицы измерения E3100CB
| удостоверение личности | Данные| Единица |
| ------|:--- |------|
| 1385_01 | Совокупный импорт | кВтч |
| 1385_02 | Совокупный экспорт | кВтч |
| 1385_03 | Состояние: -1 => подача \| +1 => предложение | |
| 1385_04 | Активная мощность общая |  Вт |
| 1385_08 | Активная мощность L1 |  Вт |
| 1385_12 | Активная мощность L2 |  Вт |
| 1385_16 | Активная мощность L3 |  Вт |
| 1385_05 | Реактивная мощность общая | вар |
| 1385_09 | Реактивная мощность L1 | вар |
| 1385_13 | Реактивная мощность L2 | вар |
| 1385_17 | Реактивная мощность L3 | вар |
| 1385_06 | Текущий, абсолютный L1 | А |
| 1385_10 | Текущий, абсолютный L2 | А |
| 1385_14 | Текущий, Абсолютный L3 | А |
| 1385_07 | Напряжение, L1 | В |
| 1385_11 | Напряжение, L2 | В |
| 1385_15 | Напряжение, L3 | В |

# Советы и ограничения
## Зачем использовать сбор данных (режим Collect) и UDsonCAN параллельно?
* Подключив устройства E3, вы можете воспользоваться обмениваемыми данными ([подробнее](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)). Просто прослушав, вы получите доступные данные в режиме реального времени сразу при изменении. Таким образом, вы можете получать быстро меняющиеся данные (например, значения потока энергии) и медленно меняющиеся данные (например, температуру) непосредственно при каждом изменении. Вы всегда в курсе этих ценностей.
* Другие данные, которые недоступны или редко доступны при сборе, вы можете добавить через UDSONCAN ReadByDid. Обычно для данных заданных значений это лучший подход.
* Поэтому, с моей точки зрения, лучшим подходом является сочетание обоих методов.

## Ограничение сбора данных
* В настоящее время протокол связи известен только для Vitocal (прослушиватель CAN id 0x693 во внутреннем CAN), Vitocharge VX3 и Vitoair (оба прослушивателя CAN id 0x451 во внешнем CAN).

## Чем проект open3e отличается?
* Очевидно, что основным отличием является прямая интеграция с ioBroker. Конфигурация может выполняться через диалоговые окна, получение данных напрямую отображается в деревьях объектов.
* Помимо open3e поддерживается сбор данных в режиме реального времени посредством прослушивания.
* Запись данных намного проще. Просто измените данные в соответствующем состоянии и нажмите кнопку «Сохранить».
* Обмен данными через MQTT не обязателен. Однако это, конечно, доступно через настройку состояний данных.

## Можно ли использовать open3e параллельно?
Да, это возможно при определенных условиях:

* Если вы используете здесь только сбор данных, вы можете использовать open3e без ограничений.
* Если вы здесь используете UDSONCAN, важно не делать этого для тех же устройств, что и open3e. Если вы это сделаете, у вас будут возникать спорадические ошибки связи.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024 MyHomeMyData <juergen.bonfert@gmail.com>

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