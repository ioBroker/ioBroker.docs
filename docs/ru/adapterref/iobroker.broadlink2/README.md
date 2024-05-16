---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.broadlink2/README.md
title: ![Логотип](./admin/broadlink2.png) Управляет устройствами, совместимыми с BroadLink.
hash: js1mQXxVwhLC6LCXSeKhIWLU1flXYjnv+LvKdEEGFbc=
---
# ![Логотип](../../../en/adapterref/iobroker.broadlink2/admin/broadlink2.png) Управляет устройствами, совместимыми с BroadLink.

![НПМ-версия](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![установлен](http://iobroker.live/badges/broadlink2-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Deutsche Anleitung переведено Google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

## Адаптер для различных WLan-устройств, совместимых с Broadlink (RM++,SP++,A1, Floureon, S1C, LB1)
Это адаптер ioBroker для нескольких коммутаторов Broadlink, таких как RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus и некоторых OEM-продуктов от них.
ТАКЖЕ поддерживаются такие пульты дистанционного управления, как RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 и RM2 Pro Plus BL. Несколько контроллеров будут генерировать свои собственные записи, и их необходимо обучать отдельно.
Он сканирует сеть в поисках совместимых устройств и устанавливает их (в настоящее время только коммутаторы типа SP?).

Если вы изучили штаты для RM*, а затем переименовали их имена, идентификатор штата также изменится на новое имя!

Вы также можете создавать свои собственные новые команды в LearnedStates, если вы используете «код» + свой код в качестве значения (с «CODE_» перед кодом или, что еще лучше (поскольку он останется, если вы переименуете состояние), добавьте поле «код» ' в родной с помощью карандаша admin.object и поместите туда шестнадцатеричный код (без 'CODE_'!).

Адаптер имеет фиксированные состояния для отправки кодов с RM-устройств или их изучения. Также он может отправлять отдельные сцены (действия на нескольких устройствах).

Если устройства, настроенные на определенный IP-адрес, не будут найдены снова, они будут помечены как «недоступные»! Если они снова подключены, их можно будет использовать в обычном режиме.

Если устройство не отвечает в течение 5 минут подряд, оно считается недоступным. Устройства ***notReachable*** будут выдавать предупреждающее сообщение в журнале каждые x сканирований. После нескольких сканирований адаптер снова попытается найти их по тому же MAC-адресу.

Пожалуйста, удалите старые устройства из admin.objects на случай, если вы удалите их навсегда или переименуете в маршрутизаторе!

Адаптер пытается найти устройство сначала по имени, а затем по mac-адресу. Если имя изменится, например, из-за изменения IP-адреса, а Mac-адрес останется прежним, устройство продолжит использовать старое имя. Если устройство меняется на новое устройство с новым Mac, вы можете использовать переименование устройства в конфигурации, чтобы вместо этого использовать старое имя устройства.

### Примечание по опросу
* Устройства SP1 не могут быть опрошены.
* Если вы используете только устройства RM, время опроса можно установить на 2 минуты (120 секунд), но не следует устанавливать более высокое значение, поскольку в противном случае они могут не быть повторно авторизованы.
* Если вы используете переключатели, которые можно переключать вручную, то молдинг должен составлять 30 с-1 минута, чтобы изменения отражались в течение минуты.

## Конфигурация
* Введите префикс сетевого адреса в конфигурации, который следует удалить при создании имен устройств.
* Введите количество секунд между опросами. При каждом опросе всем устройствам SP*, за исключением SP1, задается вопрос о состоянии коммутатора. Эту функцию можно отключить, установив задержку опроса на 0. На некоторых устройствах RM с функцией считывания температуры температура также будет обновляться.
* Теперь вы можете добавить IP-адреса обнаруживаемых/включаемых устройств, которые также находятся в другой сети, чем сеть адаптера. В этом случае вам необходимо убедиться, что компьютер, на котором работает адаптер, знает по внутренним или внешним таблицам маршрутизации, как подключиться к этой другой сети.
* Опцию «использовать IP-интерфейс» можно настроить на использование указанного адреса интерфейса. Это может помочь, если у вас есть LAN и WLAN в системе, на которой работает iobroker, и вы хотите сканировать не на первом интерфейсе, а только на WLAN, это может помочь. также, если локальный интерфейс отличается от внешнего в некоторых средах докера или виртуальной машины. Вам необходимо ввести IPv4-адрес интерфейса, который будет использоваться в качестве исходного адреса, иначе адаптер будет использовать 0.0.0.0 и прослушивать только все локальные интерфейсы.

## Как узнать коды на RM
* В объектах ioBroker вы можете найти «broadlink2.[devicename].Learn или LearnRF для устройств типа «+».
* Для устройств RM(x)+ (Plus) вы также получаете специальную кнопку обучения RS-развертке (_LearnRF), которая может изучать больше устройств, чем на обычной частоте 433 МГц.
* Установите для этого объекта значение true. (вы можете нажать кнопку в представлении объекта)
* Теперь нажмите какую-нибудь кнопку на пульте дистанционного управления в течение 30 секунд. в обычном режиме нажимайте их кратковременно с некоторым перерывом, пока не заучитесь.
* При обучении RF-развертке вам необходимо сначала долго нажать кнопку примерно на 10-20 секунд, затем отпустить ее и подождать 2-3 секунды, прежде чем снова нажать ее на очень короткое время.
* Внутри объекта «broadlink.[n].[devicename].LearnedState» теперь должен появиться новый объект с именем «>>> Rename Learned @ YYYYMMDDTHHmmSS»
* Вы можете нажать кнопку в представлении объекта, чтобы отправить код.
* Чтобы переименовать элемент, нажмите на имя (начиная с `_Rename_learned_`) и измените имя. Он не должен содержать `,`, `.` или `;`, а также некоторые другие символы, они будут заменены на '_';

Также можно использовать коды из [РМ-Мост](http://rm-bridge.fun2code.de/).
Просто создайте объект (состояние, кнопка типа) со значением, к которому вы добавляете «CODE_», или со встроенной записью `code` без какого-либо «CODE_».

## Примечание о новых устройствах RM4/LB1
* Несколько новых устройств Broadlink поддерживают новый протокол Broadlink-Cloud, который автоматически выбирается при использовании новых приложений Broadlink для подключения устройства к сети Wi-Fi. Этот новый протокол Broadlink несовместим с адаптером Broadlink2, и вы не можете использовать устройства, использующие этот новый протокол.
* Чтобы избежать этой проблемы, подключите устройство к сети с помощью старых приложений Broadlink, таких как «e умный дом» или «e-control», и убедитесь, что ваш телефон находится в той же сети Wi-Fi 2,4 ГГц, к которой вы хотите его подключить!
* Эти новые устройства также требуют повторной аутентификации каждые 5–10 минут, что адаптер делает автоматически.

## Используйте сцены
* Сцены могут содержать идентификаторы или имена, а также числа, разделенные `,`. Обычно идентификаторы выполняются/отправляются с разницей во времени в 100 мс, но если вам нужна более длительная пауза, вы можете написать число, которое отражает миллисекунды ожидания. Например, `SP:dose=1, 1000, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` включит беспроводную розетку с именем "SP:dose", а затем подождет одну секунду (фактически 1,1 секунды). ), Включите стерео и еще через секунду телевизор. Вы также можете переключать устройства других адаптеров, например, `hm-rpc.0.MEQ1435726.1.STATE=true` включит это устройство Homematic! Состояния Boolsche можно переключать с помощью '=1/=on/=true/=ein', если вы оставите его без `=`, тогда будет использоваться true. Чтобы выключить устройство, вы завершаете его с помощью '=0/=false/=aus/=off', который необходим для выключения!

## Использовать состояния
* Вы также можете создавать состояния для своих устройств, которые объединяют команды включения и выключения в одно состояние, которое можно переключать, как и любое другое устройство.
* Вам необходимо перечислить команды для включения и выключения состояния в отдельных столбцах, их может быть несколько, чтобы государство знало, когда ваше устройство включается/выключается любой из них.
* Если вы установите состояние «вкл.» или «выкл.», будет отправлена первая команда включения/выключения.
* Если присутствуют только команды on, коммутатор отправит соответствующую команду с числовым значением-1, что означает, что он отправит первую команду, если получит `0`, вторую, если получит `1`. Таким образом, вы можете моделировать несколько состояний внутри одного состояния.
* Если вы используете только «+» в качестве команды выключения, вам необходимо указать 10 команд включения, разделенных знаком «», что соответствует цифрам «0–9» на пульте дистанционного управления. Затем вы можете отправить sstate число, например «123» (максимум 9999), и оно отправит «1», «2» и «3» с задержкой в 1/3 секунды между ними! Таким образом, вы, например, установили канал на телевизоре на «33», просто написав «TVchannel=33», если имя состояния — TVchannel.
* Если вы используете `-number` в качестве команды отключения, например `-17`, вы можете сохранить число в состоянии, в котором 17 будет вычтено, и будет отправлен (x-17)-й элемент во включенном состоянии. Таким образом, вы можете установить разные фиксированные температуры для устройств, которые имеют разные коды для каждой температуры.

## Используйте отправку сообщений адаптеру
Адаптер также понимает команды sendTo.

* `debug`: `sendTo('broadlink2.0','debug','on')` (также 0,1,on,off,ein,aus,true,false) включит режим отладки.
* `get`: `sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` может запрашивать данные с устройства типа `{ val: 29.9, ack: true, ts: 1505839335870, q: 0, от: 'system.adapter.broadlink2.0', lc: 1505839335870 }` zurück
* `switch`: может включать и выключать плагин: `sendTo('broadlink2.0','switch','SP:your device id=on')`
* `switch_on`/`switch_off`: sendTo('broadlink2.0','switch_on','SP:id вашего устройства')`
* `send`: `sendTo('broadlink2.0','send','RM:yourdev._Learn')` начнет обучение, а `sendTo('broadlink2.0','send','RM:yourdev.L .yourid')` отправит код.
* `send_scene`: `sendTo('broadlink2.0','send_scene','scene xxx ')` würde den als message angegebenen Text als Szene ausführen
* `send_code`: `sendTo('broadlink2.0','send_code','RM:ваш пульт.CODE_xxxxx')` от CODE_xxxx от R:отправлено ваше имя.

## Термостаты Floureon или Beok313
* Большинство данных можно установить, время можно установить, записав что-нибудь в `_setTime`, и в этом случае время устройства будет установлено на системное время ioBroker. Это будет сделано автоматически также при запуске адаптера.

## Настроить дополнительные новые устройства
* Вы можете добавлять новые устройства, использующие тот же протокол, указав для них идентификатор устройства (в шестнадцатеричном или десятичном формате) и класс устройства (указанный там (класс = A1,MP1,RM,RMP,S1C,SP1,SP2,SP3P, T1). Таким образом, вы можете добавить новый пульт, который адаптер находит только как неизвестное устройство с шестнадцатеричным идентификатором 0x1234, в список RM, указав 0x01234=RMP.

## Переименование устройств
* Устройства обычно получают имя своего сетевого хоста или комбинацию типа устройства, идентификатора и MAC-адреса в качестве имени с первыми двумя буквами типа с «:» впереди. Вы можете переименовать такое устройство с помощью «T1:BroadLink-OEM-T1-fa-83-7c=Beok313». В этом случае исходное имя не будет использоваться, а будет использовано новое имя «Beok313».

## Режим отладки
* Если вы добавите `!` в конце списка добавленных новых устройств (даже если он пуст), вы можете перевести адаптер в режим отладки, в котором он будет регистрировать много дополнительной информации, даже если для него не установлено значение '! информация» в администраторе.

## Известные вопросы
* Если вы изучаете один и тот же сигнал несколько раз, код может каждый раз отличаться. Это невозможно изменить.
* Иногда не находит устройства, если они не отвечают на поиск. Выполните повторное сканирование или перезапустите адаптер, чтобы перезапустить новый экземпляр.

## Монтаж
с администратором ioBroker, npm установите iobroker.broadlink2 или с <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0-alpha.2 (2024-05-15)
* (mattreim) Adapter migrated to jsonConfig
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-05)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.5

* beta to try to make 0x5f36 working

### 2.1.4

* bug corrections for RM4 temperatures & Humidity

### 2.1.2

* bug corrections for States and Scenes
* Names are now taken from DNS end which mean you may rename devices in router and set their fixed IP address there

### 2.1.0

* Added RM4 protocol for newest RM4 and RM3-Minis 
* Added LB1 Wifi bulb device support
* Added finding of devices if name or ip changes according to mac address
* Added support of devices in other netword with IP address
* Changed learning and device communication for all RM devices
* Re-write of 70% nof the code for new js-controllers and nodejs versions.

### 2.0.3

* changed to new myAdapter to support js-controller 2.0 and 3.0

### 2.0.1

* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Support compact mode
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed

### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.