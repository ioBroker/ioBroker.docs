---
BADGE-Number of Installations: http://iobroker.live/badges/s7-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.s7.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.s7.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.s7/README.md
title: ioBroker.S7
hash: 5jId14HKNWFtK+5CK7Zp+N/ToagYuN9T5OE2uDYkrxE=
---
# IoBroker.S7
## Подробное описание
Адаптер S7, который поставляется с ioBroker, основан на Snap7\. Snap7 будет установлен во время первой установки адаптера и обрабатывает связь TCP/IP между ПЛК S7 и ioBroker. Поэтому обязательно, чтобы S7 был оснащен интерфейсом Ethernet (интегрированным или внешним CP) для связи по TCP/IP с оборудованием, на котором работает ioBroker. В качестве предварительного условия пользователь должен знать основы связи TCP/IP и уметь настраивать ПЛК S7 с помощью программного обеспечения Step7. Но это не должно быть проблемой для тех, кто рассматривает возможность привязки S7 к ioBroker.

## Установка
Данное руководство основано на следующей конфигурации:

* S7-315 со встроенным интерфейсом Ethernet
* Raspberry Pi 2, ioBroker, работающий под управлением Debian GNU/Linux 7.8 (хрипло)
* Диапазон IP-адресов 192.168.1.xxx
* ПК работает:
* Инструмент для работы с электронными таблицами, такой как MS Excel, Apache Open Office
* Браузер Google Chrome
* Шаг 7 V5.5 SP4 HF5

**необходим дополнительный документ:  (iobroker_adapter_S7.xlsx)[iobroker_adapter_S7.xlsx]**

### Связь через блоки данных (БД)
В этом руководстве описывается связь между ioBroker и S7 PLC через блоки данных. В идеале для связи можно сгенерировать выделенные базы данных. Базы данных должны быть интегрированы в код, работающий в S7\. Преимущество такого подхода в том, что вы можете быть уверены, что не перезапишете данные случайно, например, в блоке данных экземпляра, что может привести к нежелательным или неожиданным реакциям в вашем программном обеспечении S7. Если вам приходится использовать существующие блоки данных из-за ограничений памяти или вы не можете вносить какие-либо изменения в программное обеспечение S7, убедитесь, что вы заполняете соответствующие данные только в ioBroker, чтобы избежать конфликтов.

### Генерация баз данных связи
Мы будем работать с 4 базами данных:

* DB20 – Двоичные значения, отправленные из ioBroker в S7 (цифровой ввод из представления S7)
* DB21 – Двоичные значения, отправленные в ioBroker из S7 (цифровой вывод из представления S7)
* DB22 – Реальные значения, отправленные из ioBroker в S7 (аналоговый ввод из представления S7)
* DB23 – Реальные значения, отправленные в ioBroker из S7 (аналоговый вывод из представления S7)

Базы данных будут созданы с использованием электронной таблицы, по одной таблице на блок данных.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_1.png)

#### Подготовка DB20 – Двоичные значения, отправленные из ioBroker в S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

Столбцы A–M основаны на структуре в ioBroker и должны быть заполнены пользователем на основе программного обеспечения S7. Возможно, вы захотите использовать части таблицы символов S7 (копировать – вставить). В столбце O код для S7 DB выводится из содержимого столбцов A–M.

* Столбец A: DB = Номер DB в S7 и первая часть адреса в ioBroker
* Столбец B: Байт = Байт в БД в S7 и вторая часть адреса в ioBroker
* Столбец C: Бит = Бит в базе данных в S7 и третья часть адреса в ioBroker
* Столбец D: Имя = Имя в БД в S7 и имя в ioBroker
* Столбец E: Описание = Комментарий в БД в S7 и описание в ioBroker
* Столбец F: Тип = Введите DB в S7 и введите ioBroker
* Столбец G: Длина = длина в ioBroker
* Столбец H: Единица = единица в ioBroker
* Столбец I: Роль = роль в ioBroker
* Столбец J: Комната = комната в ioBroker
* Столбец K: Опрос = точка данных будет опрашиваться циклически (истина/ложь)
* Столбец L: RW = точка данных может быть записана (истина/ложь) è «истина» в DB20, поскольку мы хотим записать данные в S7
* Столбец M: WP = точка данных будет установлена на «1» только для «времени импульса», определенного в разделе «Общие – Общие»

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_config_1.png)

* Столбец N: намеренно оставлен пустым
* Столбец O: содержимое БД = содержимое, которое будет скопировано в Шаг 7 для генерации БД, формула: ```=CONCATENATE(D2;":";F2;":=";"false;";"//";E2)```

#### Подготовка DB21 – Двоичные значения, отправленные в ioBroker из S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец L: RW – «false» в DB21, так как мы хотим прочитать данные из S7

#### Подготовка DB22 – Реальные значения, отправленные из ioBroker в S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_4.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец B: Байт = начальный байт реального значения (0, 4, 8, …)
* Столбец C: Бит = оставлен пустым
* Столбец L: RW – «true» в DB22, так как мы хотим записать данные в S7
* Столбец O: Формула: ```=СЦЕПИТЬ_ _(D2;":";F2;":=";"0.000000e+000;";"//";E2)```

#### Подготовка DB23 – Реальные значения, отправленные в ioBroker из S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_5.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец B: Байт = начальный байт реального значения (0, 4, 8, …)
* Столбец C: Бит = оставлен пустым
* Столбец L: RW è «false» в DB23, так как мы хотим прочитать данные из S7
* Столбец O: Формула: ```=СЦЕПИТЬ_ _(D2;":";F2;":=";"0.000000e+000;";"//";E2)```

#### Создание источников БД на шаге 7
Теперь мы сгенерируем базы данных в Step7, используя код в столбце O нашей электронной таблицы. Вставьте исходный код STL в вашу программу Step7, щелкнув правой кнопкой мыши на «Источники». [ ![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_1.png)

Переименуйте новый источник в «DB20».
Вставьте следующий код в пустой источник:

```
DATA_BLOCK DB 20
    TITLE =
    VERSION : 0.1
    STRUCT
    END_STRUCT ;
    BEGIN
END_DATA_BLOCK
```

Исходный код должен выглядеть так:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_2.png)

Скопируйте исходный файл «DB20» 3 раза и назовите копии DB21, DB22, DB23, а также измените строку один в каждом исходном файле на:

* ```БЛОК_ДАННЫХ БД 21```
* ```БЛОК_ДАННЫХ БД 22```
* ```БЛОК_ДАННЫХ БД 23```

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_3.png)

Теперь перейдите в электронную таблицу, таблицу DB20, и скопируйте код из столбца O (без заголовка):

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_4.png)

Вставьте ячейки в источнике под названием «DB20» в Шаге 7 между «STRUCT» и «END_STRUCT;»:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_5.png)

Запустите компилятор, и результат должен быть 0 Ошибок, 0 Предупреждений. DB20 теперь сгенерирован, и вы найдете новый блок в разделе «Блоки» в вашей программе S7.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_6.png)

Блок выглядит так:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_7.png)

Адрес должен соответствовать адресу в электронной таблице, просто выполните проверку на корректность, сравнив комбинацию байта и бита:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_8.png)

Повторите эти действия для DB21, DB22, DB23 и убедитесь, что вы выбрали столбец O из правильной таблицы и вставили его в правильный источник (таблицу DB21 в источник DB21 и т. д.). Поскольку DB22 и 23 будут иметь дело с РЕАЛЬНЫМИ значениями, ниже вы можете увидеть, как будут выглядеть блоки.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_9.png)

Также здесь адрес должен соответствовать электронной таблице (байт):

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_10.png)

Теперь у нас есть 4 базы данных, необходимые для коммуникации:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_11.png)

Вы должны дать им символическое имя соответственно, что поможет сохранить ясность. Не забудьте подключить их к логике S7 и загрузить измененный код.

### Заполнение баз данных в ioBroker
Теперь, когда четыре базы данных являются частью кода, работающего в S7, мы сообщим ioBroker, как взаимодействовать с S7.

#### Установка экземпляра адаптера S7
Адаптеры – аппаратные средства – Адаптер Siemens S7 – +

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_1.png)

Несколько экземпляров возможны, если вы хотите, чтобы ваш ioBroker подключался к нескольким процессорам S7. Включите новый экземпляр адаптера:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_2.png)

Название адаптера (стандарт: Siemens S7 Adapter) также может быть изменено на этом этапе. Использование IP-адреса как части названия было бы одной из идей. Откройте конфигурацию адаптера

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_3.png)

и приступаем к настройке адаптера S7:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_4.png)

* Вкладка «Общие»
* Подключение ПЛК
* IP-адрес ПЛК IP-адрес ПЛК, определенный в конфигурации оборудования Step7

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_5.png)

* S7 LOGO! Если вы используете LOGO, а не S7 PLC
* PLC Rack Номер стойки ЦП, указанный в конфигурации оборудования Step7 (R0/S2)
* Слот ПЛК Номер слота ЦП, указанный в конфигурации оборудования Step7 (R0/S2)

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_6.png)

* Общий
* Округлить вещественное число до: Количество цифр, до которых будет округлено вещественное число после разделителя, например: 2 -> 12,12 3 -> 12,123 … 9 -> 12,123456789
* Задержка опроса: цикл обновления связи в миллисекундах
    * Время повторного подключения: <span style="line-height: 1.5;">Длительность в миллисекундах, после которой будет предпринята попытка повторного подключения после потери соединения с S7.</span>
    * Длительность импульса: <span style="line-height: 1.5;">время в миллисекундах для «1» для точек данных, настроенных как WP = true</span>
* Импорт файла символов:
* Функция загрузки символов для импорта символов Step7 из файла ASCII – здесь не используется.
* Импорт файла БД:
* Добавить функцию БД для импорта баз данных Step7 из файла ASCII – здесь не используется

#### Настройте ioBroker для связи
Пропускаем вкладки «Входы», «Выходы» и «Маркеры» и переходим сразу к «БД»:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_7.png)

Здесь вы можете найти структуру электронной таблицы. Мы снова готовы к массовому проектированию. Нажмите кнопку «Импорт из CSV» [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_8.png)

и вы получаете пустое поле. Теперь снова перейдите к таблице, таблице DB20, и скопируйте столбец A через M (без заголовков). [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_9.png)

Вставьте ячейки в пустое поле импорта в ioBroker и подтвердите нажатием «Экспорт» (который должен называться «Импорт»). [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_10.png)

Первая база данных готова и готова к передаче:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_11.png)

Повторите для DB21, DB22, DB23\. Каждый раз, когда вы нажимаете «Импорт из CSV», вы получаете пустое поле, но содержимое будет добавлено в список. Вы должны закончить в кратчайшие сроки, независимо от того, сколько точек данных вы хотите заполнить. Если вы хотите использовать функции, которые есть в ioBroker, заполнив Длина, Единица, Роль, Комната, вы можете сделать это в электронной таблице, чтобы воспользоваться преимуществами массового проектирования. Если вы решите сделать это позже или только для нескольких точек данных, вы также можете сделать это непосредственно в ioBroker в разделе «БД» с интегрированными опциями редактирования. Не забудьте сохранить! 12 [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_12.png)

#### Тест на коммуникацию
Перейдите на вкладку «Объекты» в ioBroker и найдите экземпляр S7 (например, s7.0, а не system.adapter.S7.0). Если вы что-то упустили: F5 (обновление веб-страницы) — это король! Здесь вы найдете две группы:

* Базы данных с 4 настроенными нами базами данных:
* ДБ20
* DB21
* DB22
* DB23
* Информация с информацией о подключении:
* Соединение: «истина», если S7 можно найти в сети
* pdu: размер PDU, с которым Snap7 подключается к S7 (обычно 240 для S7-300, 480 для S7-400)
* poll_time: время в миллисекундах, необходимое Snap7 для связи — должно быть меньше задержки опроса, настроенной в разделе «Общие» — «Общие» в конфигурации экземпляра адаптера.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_13.png)

Мы настроили DB21 и DB23 как базы данных, отправляющие информацию в ioBroker, т. е. если вы откроете базы данных в разделе «Объекты», вы должны увидеть уже поступающие значения, учитывая, что базы данных снабжаются данными из кода S7.

## Мониторинг и эксплуатация в vis
Запустите ioBroker.vis из вкладки «Instances». Рекомендую установить vis-hqwidgets. Начнем с переключателя:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_14.png)

Перетащите виджет переключателя на свое представление, подключите его к идентификатору объекта переключателя в DB20, и все готово. Если вы сейчас задействуете переключатель, вы увидите, что точка данных в разделе «Объекты» – «s7.x» – «DBs» – «DB20» будет переключаться, а S7 будет включать и выключать все, что подключено к базе данных. Если вы будете следить за базой данных в Step7 в режиме онлайн, вы увидите, что точка данных в базе данных изменится с «0» на «1» и т. д. Двоичный статус работает точно так же: перетащите виджет на свое представление и подключите к нему соответствующую точку данных из DB21. И то же самое снова для реальных значений:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_15.png)

Важно: Пользователь отвечает за подключение правильных точек данных к виджетам. Вы можете подключить реальное значение к двоичному статусу (например, лампочка), так что лампочка будет показывать «включено», как только реальное значение будет >1.0. Вот и все, ребята, довольно просто и понятно, да?

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Updated GUI packages

### 1.4.3 (2024-02-17)
* (Bettman66) Fix REAL number parsing error

### 1.4.2 (2023-12-04)
* IMPORTANT: Node.js 16+ is required to run this version!
* (Apollon77) Update dependencies to make adapter work with Node.js 20+

### 1.3.15 (2022-12-23)
* (bluefox) Updated GUI packages
* (bluefox) Added ukrainian translation

### 1.3.14 (2022-09-27)
* (bluefox) Updated GUI packages

### 1.3.13 (2022-08-02)
* (bluefox) Added preparations for ioBroker cloud
* (bluefox) Migrate GUI tu muiV5

### 1.3.12 (2022-04-03)
* (jogibear9988) Removed duplicated code
* (jogibear9988) Implemented S5TIME support (must be tested on a real device)

### 1.3.11 (2022-02-13)
* (bluefox) Updated releaser

### 1.3.10 (2021-11-13)
* (Apollon77) Better handle invalid entries with empty Address

### 1.3.9 (2021-11-09)
* (Apollon77) make sure strings work correctly
* (Apollon77) Fix several crash cases (IOBROKER-S7-17, IOBROKER-S7-19, IOBROKER-S7-1C, IOBROKER-S7-18)

### 1.3.7 (2021-11-08)
* (bluefox) Corrected type of "write" attribute

### 1.3.6 (2021-07-31)
* (bluefox) Corrected import of last line

### 1.3.5 (2021-07-07)
* (bluefox) Change edit mode behaviour

### 1.3.3 (2021-06-28)
* (bluefox) Corrected the error in GUI

### 1.3.2 (2021-06-23)
* (Apollon77) Add adapter tier for js-controller 3.3

### 1.3.1 (2021-06-23)
* (bluefox) Corrected the type of states

### 1.3.0 (2021-06-17)
* (bluefox) New configuration page on react

### 1.2.5 (2021-04-17)
* (Apollon77) Fix pot crash case (Sentry IOBROKER-S7-16)

### 1.2.4 (2021-02-22)
* (Apollon77) Make sure data are of correct type (Sentry IOBROKER-S7-K)

### 1.2.3 (2021-02-17)
* (Apollon77) null values will no longer be tried to send but give error message (Sentry IOBROKER-S7-8)
* (Apollon77) Prevent some more crash cases (IOBROKER-S7-1, IOBROKER-S7-9, IOBROKER-S7-E, IOBROKER-S7-F, IOBROKER-S7-G)

### 1.2.2 (2021-01-26)
* (Apollon77) Prevent warnings in js-controller 3.2

### 1.2.1 (2021-01-25)
* (Apollon77) fix `info.connection` state

### 1.2.0 (2021-01-25)
* (Apollon77) Prevent error case (Sentry IOBROKER-S7-4)
* (Apollon77) js-controller 2.0 is now required at minimum

### 1.1.10 (2021-01-24)
* (smiling_Jack) Bugfix in the Admin

### 1.1.9 (2020-08-02)
* (Apollon77) Fix object access issue
* (Apollon77) update node-snap7 library

### 1.1.8 (2020-05-05)
* (Steff42) Make sure objects ids/names are strings

### 1.1.6 (2019.12.27)
* (Apollon77) reconnection handling on timeouts optimized

### 1.1.4 (2018.07.10)
* (Apollon77) Support for nodejs 10 on Windows

### 1.1.3 (2018.01.19)
* (bluefox) The time offset was added

### 1.1.1 (2018.01.05)
* (Apollon77) Fix LOGO! support

### 1.1.0 (2018.01.03)
* (bluefox) Fix strings
* (bluefox) fix names if they have more than one space

### 1.0.6 (2017.12.18)
* (bluefox) Decode error codes

### 1.0.5 (2017.12.17)
* (bluefox) Error by the DB import is fixed

### 1.0.4 (2017.11.30)
* (bluefox) Fix read of DB (range error)

### 1.0.2 (2017.10.30)
* (Apollon77) Enhance object data to allow writing if available
* (bluefox) Add export from Graphpic

### 1.0.1 (2017.10.24)
* (bluefox) Detect DB and db in addresses

### 1.0.0 (2017.09.25)
* (bluefox) Activate save button if something was deleted

### 0.3.2 (2017.09.20)
* (bluefox) Fix DB bit offset bug if starting not from 0

### 0.3.0 (2017.07.12)
* (Apollon77) Upgrade node-snap7 library to current version

### 0.2.6 (2017.05.19)
* (Apollon77) Fix history handling

### 0.2.5 (2016.12.09)
* (bluefox) Fix button text: Import

### 0.2.4 (2015.10.29)
* (bluefox) add comment about python
* (bluefox) implement string read and write
* (bluefox) implement auto-increment of addresses.
* (bluefox) fix length
* (bluefox) implement export import from/to CSV
* (bluefox) fix small errors in config
* (bluefox) implement import/export for inputs and outputs too.
* (bluefox) add translation

### 0.2.3 (2015.09.24)
* (bluefox) added support of Logo!

### 0.2.2 (2015.09.11)
* (bluefox) add S7time
* (bluefox) support rooms and roles
* (bluefox) it works
* (bluefox) update packets

### 0.2.1 (2015.09.09)
* (bluefox) fix creation of objects

### 0.2.0 (2015.08.15)
* (bluefox) improve performance and enable DB2 3.9 addresses.

### 0.1.8 (2015.08.10)
* (smiling_Jack) Bugfix send info states
* (smiling_Jack) Remove unneeded console.log

### 0.1.7 (2015.08.06)
* (smiling_Jack) Bugfix send to SPS
* (smiling_Jack) Bugfix reconnect on connection lost

### 0.1.6 (2015.07.31)
* (smiling_Jack) Bugfix typo (Adress, Merkers)

### 0.1.5 (2015.07.29)
* (smiling_Jack) Bugfix translation Admin

### 0.1.4 (2015.07.28)
* (smiling_Jack) Add S5Time as Type
* (smiling_Jack) Bugfix History
* (smiling_Jack) Bugfix (fast value change)

### 0.1.3 (2015.06.04)
* (bluefox) translate admin
* (bluefox) remove jshint warnings
* (bluefox) add `info.connected` and rename `info.connection` to `info.state`

### 0.1.2
* Bugfix startup
* Bugfix add states

### 0.1.1
* change import options

### 0.1.0
* redesign Admin UI
* add write as Pulse
* Bugfix delete unused objects

### 0.0.8
* Bugfix start file
* Bugfix DB import
* Working on Admin style
* Add Units

### 0.0.6
* Bugfix start file

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>,

Copyright (c) 2014-2016 smiling_Jack <steffen.schorling@googlemail.com>

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