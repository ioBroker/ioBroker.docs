---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: vEBrkfqHrqBSbeIUwbEUTd8tq02mqKlDEBKtSa2iXyc=
---
![Логотип](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Количество установок](https://iobroker.live/badges/e3oncan-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/e3oncan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Тесты:** ![Тест и выпуск](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## Адаптер e3oncan для ioBroker
# Основная концепция
Устройства Viessmann серии E3 (One Base) выполняют большой обмен данными по шине CAN.

Этот адаптер может прослушивать эту связь и извлекать много полезной информации. Счетчики энергии E380CA и E3100CB также поддерживаются. Этот режим работы называется **Collect**.

Параллельно поддерживается **чтение и запись точек данных**. Информация, недоступная через прослушивание, может быть активно запрошена. Записывая точки данных, можно изменять уставки, расписания и т. д. Можно даже добавлять новые расписания, например, для циркуляционного насоса бытовой горячей воды. Этот режим работы называется **UDSonCAN**. Протокол UDSonCAN (**U**universal **D**iagnostic **S**services based **on CAN** bus) также используется другим оборудованием, например, известным шлюзом WAGO.

Запись данных инициируется сохранением соответствующего состояния с неотмеченным `Acknowledged` (ack=false) - да, все так просто! Точка данных будет снова считана с устройства и сохранена в состоянии через 2,5 секунды после записи. Если состояние не подтверждено, пожалуйста, посмотрите логи.

Запись ограничена набором точек данных с использованием **белого списка**. Список хранится в разделе информации каждого устройства, например, в `e3oncan.0.vitocal.info.udsDidsWritable`. Вы можете добавить больше точек данных, отредактировав это состояние. Убедитесь, что **не** проверяете `Acknowledged` при сохранении состояния.
Некоторые точки данных нельзя изменить, даже если они находятся в белом списке. Затем устройство возвращает код «отрицательного ответа». В таком случае адаптер повторяет процесс записи с другой службой. Это работает только на внутренней шине CAN. Однако этот подход также может потерпеть неудачу. В общем, процессы записи всегда следует проверять.

Во время первого запуска экземпляра адаптера будет выполнено сканирование устройств, предоставляющее список всех доступных устройств E3 для диалогового окна конфигурации (счетчики энергии не перечислены).
Сканирование точек данных каждого устройства E3 должно быть выполнено во время первой настройки, подробности см. ниже.

Какие режимы работы (Collect и/или UDSonCAN) могут быть использованы, зависит от **топологии вашего устройства**. Дополнительная информация доступна [здесь](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34).

Возможные **варианты использования** см. в этом [обсуждение](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) (в разработке).

Важные части этого адаптера основаны на проекте [open3e](https://github.com/open3e).

Также доступна реализация подхода чистого прослушивания (только сбор) на основе Python с использованием сообщений MQTT, см. [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Начиная
**Предварительные условия:**

* У вас есть адаптер шины CAN (USB to), подключенный к внешней или внутренней шине CAN устройства Viessmann E3.
* В настоящее время поддерживаются только системы на базе Linux.
* Адаптер CAN включен и виден в системе, например, как «can0» (используйте ifconfig для проверки).
* Более подробную информацию см. в [проекте open3e](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry)
* **Убедитесь, что во время первоначальной настройки не запущен никакой другой клиент UDSonCAN (например, open3e)!** Это может привести к ошибкам связи в обоих приложениях.

Все услуги, предоставляемые этим адаптером, основаны на списке устройств вашей конкретной настройки Viessmann E3. Поэтому для первой настройки вам необходимо выполнить следующие шаги:

**Конфигурация**

* После завершения установки адаптера откроется диалоговое окно конфигурации для настройки до двух адаптеров шины CAN (вкладка «АДАПТЕР CAN»).
* Измените имя CAN-адаптера и установите флажок «Подключиться к адаптеру» хотя бы для одного CAN-адаптера.
* Когда закончите, нажмите кнопку "СОХРАНИТЬ", чтобы применить изменения. Этот шаг **обязателен**. Экземпляр перезапустится и подключится к адаптеру CAN.
* Перейдите на вкладку «СПИСОК УСТРОЙСТВ UDS» и выполните сканирование доступных на шине устройств, нажав кнопку сканирования. **Это займет несколько секунд.** Вы можете наблюдать за действиями во второй вкладке браузера, просматривая информацию о регистрации адаптера.
* Вы можете изменить наименование устройств во 2-м столбце. Эти наименования будут использоваться для хранения всех собранных данных в дереве объектов ioBoker. Снова нажмите кнопку "СОХРАНИТЬ", когда внесете изменения.
* Экземпляр перезапустится снова, и через несколько секунд вы будете готовы выполнить сканирование доступных точек данных. Перейдите на вкладку «СПИСОК ТОЧЕК ДАННЫХ», нажмите кнопку «Начать сканирование ...» и подтвердите, нажав «ОК». **Пожалуйста, будьте терпеливы** - это может занять **до 5 минут**. Вы можете наблюдать за ходом выполнения во второй вкладке браузера, просматривая информацию о регистрации адаптера.

Этот шаг не является обязательным, но настоятельно рекомендуется. Если вы хотите записать в точки данных, вам нужно сначала выполнить сканирование точек данных.

* После успешного завершения сканирования точек данных точки данных становятся доступны в дереве объектов для каждого устройства. Вы можете просмотреть точки данных в конфигурации, выбрав устройство и нажав кнопку «Обновить список точек данных». Нажмите символ фильтра и введите шаблон поиска для фильтрации имени и/или кодека. Это только для вашей информации. Пожалуйста, отключите фильтрацию перед выбором другого устройства, чтобы избежать сообщений об ошибках.
* Последний шаг — настройка расписаний запроса данных на вкладке «НАЗНАЧЕНИЯ ДЛЯ АДАПТЕРА UDS CAN».
* Для **счетчиков энергии** (если они доступны в вашей настройке) вы можете просто активировать или нет. Обратите внимание на значение «Мин. время обновления (с)». Обновления отдельных точек данных выполняются не быстрее заданного значения (по умолчанию 5 секунд). При выборе нуля все полученные данные будут сохранены. Поскольку счетчики энергии отправляют данные очень быстро (более 20 значений в секунду), рекомендуется не использовать здесь ноль. Это создаст высокую нагрузку на систему ioBroker.
* Если вы подключили устройства E3 через шину CAN, например Vitocal и VX3, вы можете собирать данные, которыми обмениваются эти устройства в реальном времени, прослушивая их. Нажмите "+", чтобы добавить строку, отметьте флажок "активный", выберите устройство и отредактируйте "Мин. время обновления (с)". Здесь можно использовать 0, однако я рекомендую придерживаться 5.
* Наконец, вы можете добавить расписания для запроса данных по протоколу UDSonCAN. Снова нажмите кнопку "+" и отредактируйте настройки. У вас может быть несколько расписаний на каждом устройстве. Таким образом вы можете запрашивать некоторые точки данных чаще, чем другие. Значение по умолчанию 0 для "Расписания (s)" означает, что эти точки данных будут запрошены только один раз во время запуска экземпляра.

Для справки можно использовать информацию о точках данных на вкладке «СПИСОК ТОЧЕК ДАННЫХ» (может помочь открытие второй вкладки).

* Если вы настроили CAN-адаптер, подключенный ко **второй CAN-шине**, то будет видна вкладка "НАЗНАЧЕНИЯ ВТОРОМУ CAN-АДАПТЕРУ". Настройте устройства для сбора там.
* Вот и все. Нажмите кнопку «СОХРАНИТЬ И ЗАКРЫТЬ» и проверьте собранные данные в дереве объектов.

# Данные и единицы измерения E380
Поддерживается до двух счетчиков электроэнергии E380. Идентификаторы точек данных зависят от CAN-адреса устройства:

CAN-address=97: точки данных с четными идентификаторами

CAN-address=98: точки данных с нечетными идентификаторами

| ID | Данные | Единица |
| ------|:--- |------|
| 592 593 | Активная мощность L1, L2, L3, общая | Вт |
| 594,595 | Реактивная мощность L1, L2, L3, общая | вар |
| 596,597 | Абсолютный ток, L1, L2, L3, cosPhi | A, - |
| 598,599 | Напряжение, L1, L2, L3, Частота | В, Гц |
| 600 601 | Накопленный импорт, экспорт | кВтч |
| 602,603 | Общая активная мощность, Общая реактивная мощность | Вт, вар |
| 604 605 | Накопленный импорт | кВтч |

# Данные и единицы измерения E3100CB
| ID | Данные | Единица |
| ------|:--- |------|
| 1385_01 | Накопленный импорт | кВтч |
| 1385_02 | Накопленный экспорт | кВтч |
| 1385_03 | Состояние: -1 => подача \| +1 => поставка | |
| 1385_04 | Активная мощность всего | Вт |
| 1385_08 | Активная мощность L1 | Вт |
| 1385_12 | Активная мощность L2 | Вт |
| 1385_16 | Активная мощность L3 | Вт |
| 1385_05 | Реактивная мощность общая | вар |
| 1385_09 | Реактивная мощность L1 | вар |
| 1385_13 | Реактивная мощность L2 | вар |
| 1385_17 | Реактивная мощность L3 | вар |
| 1385_06 | Ток, абсолютный L1 | A |
| 1385_10 | Ток, абсолютный L2 | A |
| 1385_14 | Ток, Абсолютный L3 | A |
| 1385_07 | Напряжение, L1 | В |
| 1385_11 | Напряжение, L2 | В |
| 1385_15 | Напряжение, L3 | В |

# Советы и ограничения
## Зачем использовать сбор данных (режим Collect) и UDSonCAN параллельно?
* Когда вы подключили устройства E3, вы можете воспользоваться обменом данными ([подробнее](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)). Просто слушая, вы будете получать доступные данные в реальном времени прямо при изменении. Таким образом, вы можете получать быстро меняющиеся данные (например, значения потока энергии) и медленно меняющиеся данные (например, температуры) непосредственно при каждом изменении. Вы всегда в курсе этих значений.
* Другие данные, которые не доступны или редко доступны через сбор, можно добавить через UDSonCAN ReadByDid. Обычно для данных уставок это лучший подход.
* Поэтому, с моей точки зрения, наилучшим подходом является сочетание обоих методов.

## Ограничение сбора данных
* В настоящее время протокол связи известен только для Vitocal (прослушиватель на CAN id 0x693 на внутреннем CAN), Vitocharge VX3 и Vitoair (оба прослушивателя на CAN id 0x451 на внешнем и внутреннем CAN).

## Чем отличается от проекта open3e?
* Очевидно, что главное отличие — это прямая интеграция с ioBroker. Конфигурация может быть выполнена через диалоги, данные напрямую перечислены в деревьях объектов.
* В дополнение к open3e поддерживается сбор данных в реальном времени посредством прослушивания.
* Запись данных стала намного проще. Просто измените данные в соответствующем состоянии и нажмите кнопку Сохранить.
* Обмен данными через MQTT не обязателен. Однако он, конечно, доступен через конфигурацию состояний данных.

## Можно ли использовать open3e параллельно?
Да, это возможно при определенных условиях:

* Если вы используете только сбор данных, вы можете использовать open3e без ограничений.
* Если вы используете UDSonCAN здесь, важно не делать этого для тех же устройств, что и open3e. Если вы это сделаете, у вас будут спорадические ошибки связи.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете щедрость, подумайте о том, чтобы угостить меня пивом. Ура! :beers:

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

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

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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