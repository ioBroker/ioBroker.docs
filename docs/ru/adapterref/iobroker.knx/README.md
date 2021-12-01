---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: 9YD2baUOD11omshItH+K8W0nq3ICkd7bsl2WFmlpq/M=
---
![Логотип](../../../en/adapterref/iobroker.knx/admin/knx.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.knx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knx.svg)
![НПМ](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Содержание
* [Описание] (# описание)
* [Возможности] (# функций)
* [Конфигурация адаптера] (# конфигурация адаптера)
    * [Установить лицензию] (# install-the-license)
    * [Интерфейс конфигурации] (# конфигурационный интерфейс)
    * [Объекты] (# объектов)
    * [Использование] (# использование)
    * [Типы точек данных (DPT)] (# data-point-types-dpt)
    * [Как работает импорт] (# how-the-import-works)
    * [Избегание проблем] (# избегание проблем)
* [GA-Tool] (# ga-tool)
* [Планируемые функции] (# запланированных функций)
* [Список изменений] (# список изменений)

## Описание
ru: Этот адаптер позволяет импортировать файлы knxproj из ETS. Он генерирует преобразование между адресами группы KNX и ioBroker и помещает устройства в комнаты (особенно для MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Он подключается к стандартным шлюзам KNX / LAN.

** Внимание: с переходом на KNX-Adapter Version 2.x лицензирование было изменено. Вы можете получить новую лицензию в [https://iobroker.net](https://iobroker.net/) **

** Вам также следует обновить iobroker js-controller AND admin до последней версии. **

Перед началом: Каждый DPT com.Objects должен быть установлен в вашем проекте ETS. Каждое устройство должно быть рассортировано по структуре вашего объекта.

## Функции:
* импорт файла `knxproj`
* создание ETS-подобной объектной структуры
* поиск и объединение act-channel и state-channel (эвристика)
* обновление всех состояний при запуске
* отправка READ в KNX-Bus при записи на объект-состояние
* редактировать и изменять объекты GA с помощью GA-Tools
* редактировать и изменять отношения состояние-действие с помощью GA-Tools

## Конфигурация адаптера
После установки этого адаптера откройте конфигурацию адаптера.

### Установить лицензию
Первый шаг - применить лицензию. Если вы не установили лицензию, применяется 500 точек данных.

* (1) показывает ваш системный идентификатор, он нужен вам для получения лицензии
* (2) нажмите здесь, чтобы применить вашу лицензию

![knxV2-first-start-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Если вы уже создали новую лицензию в соответствии с [https://iobroker.net](https://iobroker.net/), вы можете вставить ее в (2), ИЛИ вы можете получить ее непосредственно в Интернете, нажав на (1)

![knxV2-2-1-Установить-Лицензия-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Если вы нажали (1), введите логин вашей учетной записи iobroker.net.

![knxV2-2-2-установка-лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Если ваши данные верны, вы увидите все полученные вами лицензии. Выберите тот, который хотите использовать.

![knxV2-2-3-установка-лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Если это удалось, сохраните его.

![knxV2-2-4-Установить-Лицензия-онлайн-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Это все. Нажмите кнопку сохранения внизу этой страницы.

### Интерфейс конфигурации
![knxV2-2-5-установка-лицензия-онлайн-приложение-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. IP-адрес шлюза KNX: IPv4 шлюза KNX-LAN.
2. Порт KNX-Gateway: по умолчанию порт 3671.
3. Физический адрес: Физический адрес экземпляра iobroker knx **важно: это не физ. адрес шлюза LAN!** и не может заканчиваться на 0
4. Пакетов KNX в секунду: это ограничивает скорость пакетов. Если шлюз KNX Lan повторно подключается ко многим или временно недоступен, уменьшите эту скорость.
5. local iobroker IP: выберите IP / интерфейс, к которому будет привязан адаптер.
6. loglevel: обычно это уровень «Информация», для отладки увеличьте уровень.
7. импортировать только новые точки данных: по умолчанию это включено. В случае отключения будут сгенерированы новые ГА И существующие ГА будут созданы заново.
8. Кнопка загрузки файла: здесь можно перетащить и перетащить файл, либо щелкнув по диалоговому окну выбора файла. Здесь вы можете загрузить свой экспорт ETS в формате `knxproj`.

После успешного импорта в диалоговом окне отображается количество импортированных объектов. Теперь нажмите «сохранить и закрыть», и адаптер должен запуститься.
При запуске адаптер считывает все групповые адреса с флагами чтения и записи. Это может занять некоторое время и привести к большой нагрузке на вашу шину KNX. Но значения в вашем vis обновляются после запуска.
Загрузка файла, защищенного паролем, пока недоступна.

9. Host-ID: это специальный идентификатор хоста iobroker. Этот идентификатор необходим для создания и проверки лицензии.
10. GA-Tools: набор инструментов для быстрого изменения GA.

### Объекты
Вот под knx.0 дерево групповых адресов, как в вашем проекте ETS. Для изменения свойств используйте GA-Tool.

### Использование
Если адаптер запускается успешно, ваши точки данных будут доступны для всего, что вы хотите делать.

### Типы точек данных (DPT)
Доступны все DPT в соответствии с «Системными спецификациями, взаимодействием, типами данных» от KNX Association. Это означает, что есть 2 типа информации, которую вы можете получить: 1) значение или строку 2) значения, разделенные запятыми, или массив значений (на данный момент я не знаю, как лучше обрабатывать)

Например, DPT5.001 кодируется как 8-битное целое число без знака. Это дает единственное значение. DPT3.007 (Control Dimming) кодируется как 1 бит (логическое значение) + 3 бит (беззнаковое целое число).
Это приводит, например, к в таком значении, как «0,5», где «0» означает «уменьшение», а «5» означает количество интервалов.

### Как работает импорт
1. чтение всех ссылок на объекты связи (COR):

    объединение идентификатора группового адреса с DPT соответствующего COR (если существует).

2. генерация групповой адресной структуры (GAS):

    создание GAS на основе идентификаторов GAR и установка DPT (если еще не сделано)

3. Находящийся в государстве акт адреса:

в ets-exports нет информации о состоянии и адресах действий. Адаптер анализирует все ГА "статус" или "состояние". Если есть 2 GA со сходством более 90%, то один адрес будет действовать, а другой - штатом. Также есть проверка, похожи ли DPT. Вот почему непросто найти однорангового узла, если именование GA несовместимо.

4. Отметьте проверку в конфигурации устройства:

   флаги обрабатываются следующим образом:

    | KNX | | | iobroker | | |
    |-------|-----------|------------|----------|----------|-------------------------------------------------|
    | Читать | Написать | Передача | Читать | Написать | Объяснение |
    | - | - | - | - | - | значение будет обновлено GroupValueRead |
    | х | - | - | х | х | отправка любого значения в этом состоянии вызывает GroupValueRead |
    | - | х | - | - | х | записать значение в KNX с помощью GroupValueWrite |
    | - | - | х | х | - | значение состояния будет обновлено GroupValueResponse |
    | х | - | х | х | х | отправка любого значения в этом состоянии вызывает GroupValueRead |

6. Создание одноранговых точек данных (DPP):

DPP будет создан, если действительны GA, GAR и DPT. Это DPP, с которым работает адаптер.
Если DPT отсутствует в GA, потому что он не может быть найден, DPP не будет создан. Это можно сделать с помощью GA-Tool.

7. при запуске адаптера:

все ГА, отмеченные флажком «Чтение», проверяются при запуске. Это может повлиять на более высокий автобусный трафик. В конце концов, все состояния обновлены.

### Избежание проблем
* чистое программирование ETS и, что более важно, чистое программирование ETS и, самое главное, чистое программирование ETS
* Назначьте DPT !!
* единообразная маркировка названий GA (например, «EG Wohnen Decke Licht schalten» и «EG Wohnen Decke Licht schalten status»)
* Избегание специальных символов ",. /; &% $ § []" (может вызвать проблемы с генерацией газа)
* Проверьте, доступен ли KNX / LAN GW. Если это не так, адаптер пытается подключиться постоянно.
* Правильно выберите физический адрес (важно при использовании линейных соединителей). !!! ВНИМАНИЕ: введенный здесь физический адрес НЕ является адресом шлюза LAN и не должен заканчиваться на 0 !!!
* Порт интерфейса LAN обычно 3671
* Из-за возможности запроса статуса следует отметить одну вещь: необходимо убедиться, что ioBroker генерирует не более 40 запросов в секунду, потому что они могут быть сгенерированы физически.

  адаптер больше не может передавать на шлюз.

## GA-Tool
GA-Tool позволяет легко изменять свойства GA.

![knxV2-3-6-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. показывает дерево GA и выбранный GA
2. в разделе свойств название выбранного GA
3. установить флаги iobroker
4. установить GA DPT
5. Признанный акт GA
6. признанная государственная ГА

![knxV2-3-2-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. показать отношение государство-действие
2. если отношение существует, то оно может быть удалено

Если отношения не существует, можно создать новое, щелкнув (2) для выбранного GA (1).
В диалоговом окне (3) может быть выбран партнер

![knxV2-3-5-GATools-мод](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Если есть другие GA для изменения свойств, используйте множественный выбор. Эта функция работает только для GA.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. выбранные GA
2. свойства для изменения
3. изменение невозможно

## Планируемые функции
* esf-import
* Инструмент мониторинга шины GA-Mon

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
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
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

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
To use this adapter in ioBroker you need to accept the source code license of the adapter. The source code of this adapter is available under the CC-NC-BY license.

Additionally you need a license to use the adapter. The license editions are available on https://iobroker.net/www/pricing


## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2021 K.Ringmann <info@punktnetzwerk.net>

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