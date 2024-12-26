---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: IX8wwEGhFukRuRh2V5wWig9ootgfbrqj/qqw9DojjmE=
---
![Логотип](../../../en/adapterref/iobroker.knx/admin/knx.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.knx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knx.svg)
![НПМ](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Содержание
* [Описание](#description)
* [Требования](#требования)
* [Особенности](#особенности)
* [Установка](#установка)
* [Конфигурация адаптера](#adapter-configuration)
* [Установить лицензию](#install-the-license)
* [Интерфейс конфигурации](#configuration-interface)
* [Объекты](#объекты)
* [Использование](#использование)
* [Типы точек данных (DPT)](#data-point-types-dpt)
* [Как работает импорт](#how-the-import-works)
* [Избегание проблем](#избегание-проблем)
* [GA-Tool](#ga-tool)
* [Прямая ссылка на состояние не-KNX с состоянием KNX наоборот](#прямая-ссылка-не-knx-состояние-на-knx-иначе-обратно)
* [Планируемые функции](#planned-features)
* [Журнал изменений](#журнал изменений)

## Описание
ru: Этот адаптер позволяет импортировать файлы `knxproj` из ETS. Он генерирует трансляцию между адресами KNX-group и ioBroker и размещает устройства в комнатах (особенно для MobileUI).

ру: [Установка и базовая настройка адаптера](docs/ru/README.md)

Подключается к стандартным шлюзам KNX/LAN.

**Внимание: с переходом на KNX-Adapter Version 2.x лицензирование изменилось. Вы можете получить новую лицензию от [https://iobroker.net](https://iobroker.net/)**

**Вам также следует обновить iobroker js-controller и admin до последней версии.**

Перед началом: Каждый DPT com.Objects должен быть установлен в вашем проекте ETS. Каждое устройство должно быть отсортировано в вашей структуре объекта.

## Требования
* Версия узла >= 14.15.4
* Версия администратора >= 5.2.0
* js-контроллер версии >=3.3.20

Без этого требования адаптер не может быть установлен или будет работать некорректно.

## Функции
* импорт файла `knxproj`
* создание структуры объекта, подобной ETS
* поиск и объединение каналов действия и каналов состояния (эвристика)
* обновление всех состояний при запуске
* не требуется облако или интернет
* отправка READ на шину KNX во время записи в объект состояния
* редактирование и изменение объектов GA с помощью GA-Tools
* редактировать и изменять отношения между государством и актом с помощью GA-Tools
* НОВОЕ: разрешить прямую ссылку не-KNX State (наоборот)
* НОВОЕ: ответы адаптера на GroupValueRead для объекта, подключенного по прямой ссылке
* НОВОЕ: импорт защищенных паролем файлов проекта (спасибо aKzenT)

###Установка
Этот адаптер можно установить только с помощью npm. Установка через GitHub **не** работает.

##Конфигурация адаптера
После установки этого адаптера откройте конфигурацию адаптера.

###Установить лицензию
Первый шаг — применить лицензию. Если вы не установили лицензию, то применяются 500 точек данных.

* (1) показывает ваш системный идентификатор, он вам нужен для получения лицензии
* (2) нажмите здесь, чтобы применить вашу лицензию

![knxV2-первый-старт-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Если вы уже создали новую лицензию в разделе [https://iobroker.net](https://iobroker.net/), то вы можете вставить ее в (2) ИЛИ вы можете приобрести ее напрямую в Интернете, нажав на (1)

![knxV2-2-1-Установить-Лицензия-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Если вы нажали (1), введите логин вашей учетной записи iobroker.net.

![knxV2-2-2-Установить-Лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Если ваши данные верны, вы увидите все ваши лицензии, которые вы получили. Выберите ту, которую хотите использовать.

![knxV2-2-3-Установить-Лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Если все прошло успешно, сохраните.

![knxV2-2-4-Установить-Лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Вот и все. Нажмите на кнопку сохранения внизу этой страницы.

### Интерфейс конфигурации
![knxV2-2-5-Установить-Лицензия-онлайн-примененный-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. IP-адрес шлюза KNX: IPv4 шлюза KNX-LAN.
2. Порт шлюза KNX: по умолчанию — порт 3671.
3. физический адрес: Физический адрес экземпляра iobroker knx. **Важно: это не физический адрес шлюза LAN!** и не может заканчиваться на 0
4. Пакетов KNX в секунду: это ограничивает скорость пакетов. Если KNX Lan Gateway слишком часто переподключается или временно недоступен, уменьшите эту скорость.
5. локальный IP-адрес iobroker: выберите IP-адрес/интерфейс, к которому будет привязан адаптер.
6. loglevel: обычно это уровень «Информация», для отладки увеличьте уровень.
7. импортировать только новые точки данных: это включено по умолчанию. В случае отключения будут сгенерированы новые GA И существующие GA будут пересозданы.
8. кнопка загрузки файла: перетаскивание доступно здесь или при нажатии на диалог выбора файла. Здесь вы можете загрузить ваш экспорт ETS в формате `knxproj`.

После успешного импорта в диалоговом окне отобразится количество импортированных объектов. Теперь нажмите «сохранить и закрыть», и адаптер должен запуститься.
При запуске адаптер считывает все групповые адреса с флагом чтения и флагом записи. Это может занять некоторое время и привести к высокой нагрузке на шину KNX. Но значения в вашем vis обновляются после запуска.
Загрузка файла, защищенного паролем, пока недоступна.

9. Host-ID: это специальный идентификатор хоста iobroker. Этот идентификатор необходим для генерации и проверки лицензии.
10. GA-Tools: набор инструментов для быстро меняющихся GA

### Объекты
Вот под knx.0 дерево групповых адресов, как в вашем проекте ETS. Для изменения свойств используйте GA-Tool.

### Использование
Если адаптер запустится успешно, ваши точки данных будут доступны для любых ваших действий.

### Типы точек данных (DPT)
Все DPT согласно "System Specifications, Interworking, Datapointtypes" от KNX Association доступны. Это означает, что есть два типа информации, которую вы можете получить: 1) Значение или Строка 2) разделенные запятыми значения или массив значений (на данный момент я не знаю, как лучше обработать)

Например, DPT5.001 кодируется как беззнаковое целое число с 8 битами. Это дает одно значение. DPT3.007 (управление яркостью) кодируется как 1 бит (логическое значение) + 3 бита (беззнаковое целое число). Это приводит, например, к значению типа «0,5», где «0» означает «уменьшение», а «5» означает количество интервалов.

### Как работает импорт
1. чтение всех ссылок на объекты связи (COR):

объединение идентификатора groupadressreference с DPT соответствующего COR (если существует).

2. генерация структуры группового адреса (GAS):

генерация GAS на основе идентификаторов GAR и настройка DPT (если это еще не сделано)

3. нахождение государства акт адресует:

в ets-exports нет информации об адресах состояний и актов. Адаптер анализирует все GA "status" или "state". Если есть 2 GA со сходством более 90%, то один адрес будет актором, а другой - штатом. Также есть проверка на схожесть DPT. Вот почему нелегко найти пару, если именование GA не согласовано.

4. Проверка флага в конфигурации устройства:

флаги обрабатываются следующим образом:

| KNX | KNX | KNX | ioBroker | ioBroker | |
    |-------|-------|----------|----------|----------|----------------------------------------------------------|
| Читать | Записать | Передавать | Читать | Записать | Объяснение |
| - | - | - | - | - | значение будет обновлено GroupValueRead |
| x | - | - | x | x | отправка любого значения в этом состоянии вызовет GroupValueRead |
| - | x | - | - | x | записать значение в KNX с помощью GroupValueWrite |
| - | - | x | x | - | значение состояния будет обновлено GroupValueResponse |
| x | - | x | x | x | отправка любого значения в этом состоянии вызовет GroupValueRead |

6. Создание одноранговых узлов точек данных (DPP):

DPP будет создан, если GA, GAR и DPT действительны. Это DPP, с которыми работает адаптер.
Если DPT отсутствует в GA, так как его не удалось найти, то DPP не будет создан. Это можно сделать с помощью GA-Tool.

7. При запуске адаптера:

Все GA, отмеченные флагом "Read", проверяются при запуске. Это может повлиять на более высокий трафик шины. В конце все состояния обновлены.

### Избегание проблем
* чистое программирование ETS и что еще важнее чистое программирование ETS и самое важное чистое программирование ETS
* Назначьте DPT!!
* единая маркировка названий GA (например, «EG Wohnen Decke Licht schalten» и «EG Wohnen Decke Licht schalten status»)
* Избегание специальных символов ",./;&%$§[]" (могут вызвать проблемы с генерацией газа)
* Проверьте, доступен ли KNX/LAN GW. Если нет, адаптер постоянно пытается подключиться.
* Правильно выберите физический адрес (важно при использовании линейных соединителей). !!! ВНИМАНИЕ: введенный здесь физический адрес НЕ является адресом шлюза локальной сети и не должен заканчиваться на 0 !!!
* Порт интерфейса LAN обычно 3671.
* В связи с возможностью запроса статуса необходимо отметить следующее: необходимо гарантировать, что ioBroker генерирует не более 40 запросов в секунду, поскольку они могут быть сгенерированы физически

больше не может передаваться на шлюз адаптером.

## GA-инструмент
GA-Tool позволяет легко изменять свойства GA.

![knxV2-3-6-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. показывает дерево GA и выбранный GA
2. в разделе свойств имя выбранного ГА
3. установить флаги iobroker
4. установить GA DPT
5. признанный акт GA
6. признанный государственный ГА

![knxV2-3-2-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. показать связь между государством и актом
2. если связь существует, то ее можно удалить

Если связи не существует, можно создать новую, нажав (2) для выбранного GA (1).
В диалоговом окне (3) можно выбрать одноранговую связь

![knxV2-3-5-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Если нужно изменить свойства большего количества GA, используйте multiselect. Эта функция работает только для GA без связи.

![knxV2-3-4-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. выбранные ГА
2. свойства для изменения
3. нет возможности внесения изменений

### Прямая связь не-KNX состояния с KNX наоборот
Начиная с версии адаптера 2.0.6 можно напрямую связать состояние ioBroker, не являющееся KNX, с GA. Это можно использовать для применения времени, даты, любых состояний или информации к KNX. (небольшая подсказка: вы можете напрямую связать любой из своих компонентов IOT с GA в KNX (например, связать кнопку Homematic с KNX GA или связать датчик кнопки KNX с вашим плеером Sonos)). Состояния можно считывать с помощью GroupValueRead, и если состояние изменится, оно автоматически обновится на KNX. Кроме того, если вы измените на KNX, это обновит связанное устройство iot, не являющееся KNX.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. выберите GA для подключения
2. показать выбранную GA
3. этот GA должен иметь атрибут **write**
4. выберите допустимый тип точки данных (если они не совпадают, это не сработает)
5. не допускается наличие связи между актом и государством
6. кнопка выбора объекта, не являющегося объектом KNX, для связи с ним

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. выберите не-KNX объект, который вы хотите связать
2. Нажмите «ОК», если вы закончили.

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

Теперь KNX-GA **(1)** напрямую связан с не-KNX iobroker **(2)**. С **(3)** вы можете удалить эту связь.

## Планируемые функции
* esf-импорт
* Инструмент мониторинга шины GA-Mon

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->
## Исключения и ошибки
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Разработчик не может получить никакой дополнительной специальной информации о системе/конфигурации/пользователе/среде. В случае, если лицензия не найдена, также сообщается версия адаптера и идентификатор хоста.

## Большое спасибо за поддержку и помощь
* голубая лисица
* foxriver76

## Changelog
### 2.0.30 (22.12.2024)
* fixed GUI errors, starting redesign GA-Tools

### 2.0.29 (11.12.2024)
* updated the adapter import schema for ETS 6.3.0
* nodejs >= 20 is required 

### 2.0.28
* Update license related data and fix package version

### 2.0.27 (02.05.2024)
* updated the adapter import schema for ETS 6.2.2
* fixed UTF-8 error

### 2.0.26 (28.03.2024)
* updated the adapter import schema for ETS 6.2.1
* nodejs >= 18 is required

### 2.0.25 (03.03.2024)
* updated the adapter import schema for ETS 6.2.0
* small bug-fixes

### 2.0.24 (24.11.2023)
* updated the adapter import schema for ETS 6.1.1

### 2.0.23 (11.10.2023)
* corrected wrong GW Port after adapter upgrade
* allow self-defined values for min and max
* some small other fixes

### 2.0.22 (04.07.2023)
* added import specification, solved problems in GaTools
    
### 2.0.21 (17.06.2023)
* fixed license handling

### 2.0.20 (16.06.2023)
* fixed license handling with js-controller Version > 5

### 2.0.19 (29.05.2023)
* added ETS V6.1.0 import
* required node version >= 16.13.1

### 2.0.18 (08.04.2023)
* fixed send-delay
* small changes

### 2.0.17 (14.10.2022)
* added ETSv6.0.6 import
* major changes in Adapter Config UI
* fixed change of port settings for LAN-GW

### 2.0.16 (04.09.2022)
* added ETSv6.0.5 import

### 2.0.15 (02.06.2022)
* fixed import error with extrem large KNX catalogue files
* fixed unrecognized connection breaks

### 2.0.14 (08.04.2022)
* added ETSv6.0.4 (override 6.0.3)
* small bugfixes

### 2.0.13 (12.03.2022)
* added ETSv5.7.7 import
* fixed "unknown value" bug
* some other small fixes

### 2.0.12 (25.02.2022)
* fixed handling of undefined DP
* updated the data point types
* fix warning with incompatible DPT in future
* the biggest issue of all: I get shocked because of the war in Ukraine. My thoughts are with the people of Ukraine, I am infinitely sorry for what is happening to them and their country. It is an inhuman shame.
* can't fix it, but I appeal to everyone: Be neighbors and not enemies. Respect the other and do not fight yourselves.

### 2.0.11
* fixed password handling for projects from upgraded ETS

### 2.0.10
* import of ETS6.0.2 projects **ETS6.0.1 not possible**
* bugfixes

### 2.0.9
* import password protected project files
* bug fixes

### 2.0.8
* fixed bug with unackn write
* fixed bug in linkedState

### 2.0.7
* fixed bug with unable to write on KNX

### 2.0.6
* fixed problem on ETSv6 import
* many small bugfixes
* implemented GA-Tools directLink feature

### 2.0.5

* fixed problem on ETSv4 import
* corrected some messages
* corrected DPT14.x min and max range

### 2.0.4

* fixed DPT9.xxx calculation
* implemented date-and-time DPT19.00x
* fixed confusing "no license error"
* small bugfixes

### 2.0.3 (2021-12-04)

* fixed counting 1st Datapoint
* automaticly remove old V1 license", preventing confusion after upgrade from V1 to V2

### 2.0.1

* fixed problem with license acceptance

### 2.0.0 (2021-11-15) **Major release**

* Breaking change! => new license is neccessary V1 Licenses will not work => V1 business Licenses can changed to V2
* complete refactoring of knx-admin
* added Tool for handling GA in knx-admin
* fixed many bugs (in knx-stack, on importing ETS Projects, reconnect and timeouts)
* added new datapoint types
* added import till ETS V6
* changed license management

### 1.0.46 (2021-03-23)

* New admin GUI

### 1.0.45 (2021_03_22)

* import of ETS v5.7.5 projects

### 1.0.44 (2021_01_22)

* fixed act and state handling
* added some new datapoint types
* fix facility and room recognition and device allocation

### 1.0.42 (2020_09_03)

* Fixed problem with missing index_m.html

### 1.0.41

* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40

* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39

* fixed import error

### 1.0.38

* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)

* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)

* some bugs fixed

### 1.0.35 (2019-09-15)

* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)

* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)

* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)

* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31

* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog
* fixed bug in deviceTree generation

### 1.0.30

* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20

* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

### 1.0.19

* reverted to true/false handling for DPT1.x

### 1.0.18

* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)

* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)

* change ChID on reconnect
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)

* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)

* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)

* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)

* closing local port in case of undefined connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)

* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)

* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)

* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)

* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)

* fixed empty objects, related to DPT1 (error message \[object Object\] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)

* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)

* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)

* fixed certificate error

### 1.0.0 (2018-02-25)

* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knx project upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)

* some small bug-fixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)

* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)

* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)

* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)

* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)

* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)

* (chefkoch009) added necessary dependencies

### 0.7.1 (2016-11-19)

* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)

* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)

* (chefkoch009) redesign

### 0.5.0

*  (vegetto) include vis widget

#### 0.4.0

* (bluefox) fix errors with grunt

#### 0.2.0

* (bluefox) initial release

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2024 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)