---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/README.md
title: IoT-адаптер ioBroker
hash: LTaVi0x0KvCzZYYoc99tWZACJeGmuMSi7a5o+cljcqQ=
---
![Логотип](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Количество установок](http://iobroker.live/badges/iot-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iot.svg)

# IoBroker IoT-адаптер
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер предназначен ТОЛЬКО для связи с Amazon Alexa, Google Home и Nightscout.
Это не для удаленного доступа к вашему экземпляру ioBroker. Для этого воспользуйтесь адаптером ioBroker.cloud.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Настройки
Чтобы использовать облачный адаптер, вам необходимо сначала зарегистрироваться в облаке ioBroker [https://iobroker.pro](https://iobroker.pro).

[Ссылка на настройки типа Google API](https://developers.google.com/actions/smarthome/guides/)

![вступление](../../../en/adapterref/iobroker.iot/img/intro.png)

### Пределы
У всего есть пределы, поэтому у Amazon Alexa тоже есть свои ограничения. Alexa может поддерживать до 300 устройств.

Google Cloud и Алиса должны быть очищены

### Язык
Если вы выберете язык "по умолчанию", умные имена устройств и перечислений переводиться не будут. Если указан какой-либо язык, все известные имена будут переведены на этот язык.
Это сделано для быстрого переключения между многими языками в демонстрационных целях.

### Сначала поместите функцию в имена
Измените порядок функций и ролей в самогенерируемых именах:

- если false: "Функция помещения", например «Диммер для гостиной»
- если true: "Функциональная комната", например «Диммерная гостиная»

### Соедините слова с
Вы можете определить слово, которое будет помещено между функцией и комнатой. Например. «В» и «Диммер в гостиной» будет «Диммер в гостиной».

Но делать это не рекомендуется, потому что движок распознавания должен проанализировать еще одно слово, и это может привести к недоразумениям.

### Уровень ВЫКЛ для переключателей
Некоторые группы состоят из смешанных устройств: диммеров и переключателей. Допускается управлять ими командами «ВКЛ» и «ВЫКЛ» и процентами.
Если команда - `Set to 30%` и `OFF level is 30%`, переключатели будут включены. По команде «Установить на 25%» все переключатели будут выключены.

Кроме того, если команда «ВЫКЛ», адаптер запомнит текущий уровень диммера, если фактическое значение больше или равно «30%».
Позже, когда придет новая команда «ВКЛ», адаптер переключит диммер не на 100%, а на уровень в памяти.

Пример:

- Предположим, что *уровень выключения* равен 30%.
- Виртуальное устройство «Свет» имеет два физических устройства: *переключатель* и *диммер*
- Команда: «установить свет на 40%». Адаптер запомнит это значение для *диммера* установит его на «диммер» и включит *переключатель*
- Команда: «выключить свет». Адаптер установит *диммер* на 0% и выключит *переключатель*
- Команда: «включить свет». *диммер* => 40%, *переключатель* => ВКЛ.
- Команда: «установить свет на 20%». *диммер* => 20%, *переключатель* => ВЫКЛ. Значение диммера не запоминается, потому что оно ниже *OFF level*
- Команда: «включить свет». *диммер* => 40%, *переключатель* => ВКЛ.

### От ON
Вы можете выбрать поведение команды ON для состояния номера. Можно выбрать конкретное значение или использовать последнее ненулевое значение.

### Написать ответ на
На каждую команду будет сгенерирован текстовый ответ. Здесь вы можете определить идентификатор объекта, куда должен быть записан этот текст. Например. *sayit.0.tts.text*

### Цвета
Только сейчас только английский alexa поддерживает управление цветом.
Канал должен иметь 4 состояния со следующими ролями:

- level.color.saturation (требуется для обнаружения канала),
- level.color.hue,
- диммер уровня,
- переключатель (по желанию)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Замок
Чтобы иметь возможность блокировать блокировки, состояние должно иметь роль «switch.lock» и иметь «native.LOCK_VALUE» для определения состояния блокировки. Если вам нужно отдельное значение для управления блокировкой, вы можете использовать "native.CONTROL VALUE".

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Как будут генерироваться имена
Адаптер пытается создать виртуальные устройства для управления умным домом (например, Amazon Alexa или Google Home).

Для этого есть два важных перечисления: комнаты и функции.

Комнаты такие: гостиная, ванная, спальня.
Функции такие: свет, жалюзи, обогрев.

Чтобы состояние появилось в автоматически сгенерированном списке, должны быть выполнены следующие условия:

- состояние должно быть в каком-то "функциональном" перечислении.
- состояние должно иметь роль («состояние», «переключатель» или «уровень. *», например, level.dimmer), если оно не включено напрямую в «функции».

Может быть, канал находится в «функциях», а само состояние нет.

- состояние должно быть доступно для записи: `common.write` = true
- у государственного диммера должно быть значение common.type как number
- государственное отопление должно иметь «common.unit» как «°C», «°F» или «° K» и «common.type» как «number».

Если состояние находится только в «функциях», а не в какой-либо «комнате», будет использоваться имя состояния.

Имена состояний будут генерироваться из функции и помещения. Например. все *огни* в *гостиной* будут собраны в виртуальном устройстве *свет в гостиной* Пользователь не может изменить это имя, потому что оно генерируется автоматически.
Но если имя перечисления изменится, это имя тоже изменится. (например, функция «свет» изменена на «свет», поэтому *свет в гостиной* будет изменен на *свет в гостиной*

Все правила будут проигнорированы, если в состоянии указано common.smartName. В этом случае будет использоваться только умное имя.

если *common.smartName* равно **false** состояние или перечисление не будут включены в генерацию списка.

Диалог конфигурации позволяет удобно удалять и добавлять отдельные состояния в виртуальные группы или как одно устройство.
![Конфигурация](../../../en/adapterref/iobroker.iot/img/configuration.png)

Если группа имеет только одно состояние, ее можно переименовать, так как для этого будет использоваться smartName состояния.
Если у группы более одного состояния, группа должна быть переименована через имена перечисления.

Для создания собственных групп пользователь может установить адаптер «сцены» или создать «скрипт» в адаптере Javascript.

### Заменяет
Вы можете указать строки, которые могут автоматически заменяться в именах устройств. Например. если вы установите заменяет на: `.STATE,.LEVEL`, все ".STATE" и ".LEVEL" будут удалены из имен. Будьте осторожны с пробелами.
Если вы установите `.STATE, .LEVEL`, то вместо «.LEVEL» будут заменены «.STATE» и «.LEVEL».

## Состояния помощника
- **smart.lastObjectID** это состояние будет установлено, если только одно устройство контролировалось домашним навыком (alexa, google home).
- **smart.lastFunction** имя функции (если существует), для которой была выполнена последняя команда.
- **smart.lastRoom** имя комнаты (если существует), для которой была выполнена последняя команда.
- **smart.lastCommand** последняя выполненная команда. Команда может быть: истина (ВКЛ), ложь (ВЫКЛ), число (%), -X (уменьшение на x), + X (увеличение на X)
- **smart.lastResponse** текстовый ответ на команду. Его можно отправить на какой-нибудь движок text2speech (sayit).

## IFTTT
[инструкции](doc/ifttt.md)

## Главная страница Google
Если вы видите в журнале следующее сообщение об ошибке: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.
Таким образом, вы должны сгенерировать URL-ключ заново:

![URL-адрес](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Услуги
Есть возможность отправлять сообщения в облачный адаптер.
Если вы вызываете `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` и значение в качестве полезной нагрузки.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

или

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Если в настройках указать в поле «Белый список для сервисов» имя *custom_test* а вызов с «custom_test» в качестве имени сервиса, то состояние **cloud.0.services.custom_test** будет установлено в *myString*

Вы можете написать «*» в белом списке, и все услуги будут разрешены.

Здесь вы можете найти инструкции, как использовать его с [исполнитель](doc/tasker.md).

Услуга IFTTT разрешена, только если установлен ключ IFTTT.

Зарезервированные имена: `ifttt`, `text2command`, `simpleApi`, `swagger`. Они должны использоваться без префикса `custom_`.

### `text2command`
Вы можете написать «text2command» в белом списке, вы можете отправить запрос POST на `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` для записи данных в переменную *text2command.X.text*

Вы также можете использовать метод GET `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` можно определить в настройках с помощью опции «Использовать экземпляр text2command».

## Пользовательский навык
Ответы на индивидуальный навык можно обработать двумя способами:

- `text2command`
- `javascript`

### `text2command`
если экземпляр `text2command` определен в диалоговом окне конфигурации, то вопрос будет отправлен экземпляру.

`text2command` должен быть настроен так, чтобы ожидаемая фраза была проанализирована, и ответ был возвращен.

### `Javascript`
Есть возможность обработать вопрос напрямую скриптом. Он активируется по умолчанию, если не выбран экземпляр *text2command*

Если определен экземпляр `text2command`, этот экземпляр должен предоставить ответ, а ответ от *script* будет проигнорирован.

Адаптер предоставит детали в двух состояниях с разным уровнем детализации.

* **smart.lastCommand** содержит полученный текст, включая информацию о типе запроса (намерении). Пример: "askDevice Status Rasenmäher"
* ** smart.lastCommandObj *** содержит строку JSON, которая может быть преобразована в объект, содержащий следующую информацию
 * **words** содержит полученные слова в массиве
 * **intent** содержит тип запроса. Возможные значения в настоящее время: askDevice, controlDevice, actionStart, actionEnd, askWhen, askWhere, askWho.
 * **deviceId** содержит deviceId, идентифицирующий устройство, на которое был отправлен запрос, доставленный Amazon, будет пустой строкой, если не указан
 * **sessionId** содержит sessionId сеанса Skill, должен быть таким же, если было произнесено несколько команд, доставленных Amazon, будет пустой строкой, если не указан
 * **userId** содержит идентификатор пользователя от владельца устройства (или, возможно, позже пользователя, который взаимодействовал с навыком), доставленный Amazon, будет пустой строкой, если не указан

 Более подробную информацию о том, как обнаруживаются слова и какие типы запросов различает Alexa Custom Skill, см. На https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

** Вернуть результат через состояние smart.lastResponse **

Ответ должен быть отправлен в течение 200 мс в состоянии «smart.lastResponse» и может быть простой текстовой строкой или объектом JSON.
Если это текстовая строка, то этот текст будет отправлен в качестве ответа на навык.
если текст является объектом JSON, можно использовать следующие ключи:

* **responseText** должен содержать текст для возврата в Amazon
* **shouldEndSession** является логическим значением и определяет, будет ли сеанс закрыт после произнесения ответа или останется открытым для приема другого голосового ввода.

** Вернуть результат через сообщение в экземпляр iot **

Экземпляр iot также принимает сообщение с именем «alexaCustomResponse», содержащее ключ «response» с объектом, который может содержать ключи **responseText** и **shouldEndSession** как описано выше.
От экземпляра iot ответа на сообщение не будет!

** Пример скрипта, использующего тексты **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

** Пример сценария, использующего объекты JSON **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```

### Частное облако
Если вы используете частный навык / действие / навык для связи с `Alexa/Google Home/Алиса`, значит, у вас есть возможность использовать экземпляр IoT для обработки запросов от него.

Например. для `yandex alice`:

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Поддерживаются следующие типы:

- `alexa` - действие с Amazon Alexa или Amazon Custom Skill
- `ghome` - работа с Google Actions через Google Home
- `alisa` - выступая с Яндекс Алиса
- `ifttt` - действует как IFTTT (на самом деле не требуется, но для целей тестирования)

## Яндекс Алиса
[инструкции](doc/alisa.md)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 1.8.23 (2021-09-18)
* (bluefox) Fixed the response for the heating control

### 1.8.22 (2021-05-16)
* (bluefox) Make it admin4 compatible

### 1.8.21 (2021-05-16)
* (bluefox) Fixed the encryption of the password. Warning: if you see the message in the log, that password is invalid, please enter the password in configuration dialog one more time and save.

### 1.8.20 (2021-05-16)
* (foxriver76) we now write data received from custom services with acknowledge flag

### 1.8.19 (2021-05-14)
* (bluefox) Only added one debug output

### 1.8.16 (2021-03-13)
* (bluefox) fixed the blind functionality in alisa

### 1.8.15 (2021-03-12)
* (bluefox) implemented the sensor functionality in alisa

### 1.8.14 (2021-03-12)
* (bluefox) allowed the control of the blinds in alisa

### 1.8.13 (2021-02-04)
* (Apollon77) add missing object smart.lastObjectID

### 1.8.12 (2021-02-02)
* (bluefox) Fixed the dimmer issue with alisa.

### 1.8.11 (2021-01-20)
* (Morluktom) Alexa - Corrected the request for percentage values

### 1.8.10 (2021-01-20)
* (bluefox) Added the reconnection strategy if DNS address cannot be resolved

### 1.8.9 (2020-12-27)
* (bluefox) Updated configuration GUI to the latest state

### 1.8.8 (2020-12-14)
* (bluefox) Corrected the "google home" error

### 1.8.6 (2020-12-13)
* (bluefox) Try to fix google home error

### 1.8.5 (2020-11-23)
* (bluefox) Corrected the configuration table for google home

### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The google home table was rewritten

### 1.7.15 (2020-11-05)
* (Morluktom) Corrected the request for temperature

### 1.7.14 (2020-11-05)
* (bluefox) Updated the select ID dialog.

### 1.7.12 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 1.7.9 (2020-09-17)
* (bluefox) Updated GUI for config.

### 1.7.7 (2020-09-02)
* (bluefox) Added information about changed linking process.

### 1.7.6 (2020-08-25)
* (bluefox) Some colors were changed in the dark mode.

### 1.7.5 (2020-08-21)
* (Apollon77) Crash prevented (Sentry IOBROKER-IOT-W)
* (bluefox) Values for modes will be converted to number in Alisa

### 1.7.3 (2020-08-16)
* (bluefox) Added vacuum cleaner to Alisa

### 1.7.1 (2020-08-16)
* (bluefox) Added blinds, lock and thermostat to Alisa

### 1.6.4 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-IOT-V)

### 1.6.3 (2020-08-04)
* (bluefox) Added french letters to allowed symbols

### 1.6.1 (2020-07-10)
* (bluefox) Used new SelectID Dialog in GUI

### 1.5.3 (2020-05-28)
* (bluefox) Small change for nightscout

### 1.5.2 (2020-05-21)
* (bluefox) Changed requirements for password
* (bluefox) Do not try load the "sharp" if blood sugar not enabled

### 1.4.18 (2020-05-11)
* (Apollon77) Make sure that invalid configured states or values without a timestamp do not crash adapter (Sentry IOBROKER-IOT-8)
* (Apollon77) Make sure publishes after the disconnect to not break adapter (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
* (bluefox) Better error output is implemented

### 1.4.14 (2020-05-01)
* (bluefox) Fixed the problem if admin is not on 8081 port

### 1.4.12 (2020-04-30)
* (Apollon77) error case handled where system.config objects does not exist (Sentry IOBROKER-IOT-5)

### 1.4.11 (2020-04-26)
* (bluefox) fixed IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
* (bluefox) Fixed crashes reported by sentry

### 1.4.7 (2020-04-23)
* fix iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fix iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

### 1.4.6 (2020-04-18)
* (Apollon77) Add the Sentry error reporting to `React Frontend`

### 1.4.4 (2020-04-14)
* (Apollon77) remove js-controller 3.0 warnings and replace `adapter.objects` access
* (Apollon77) add linux dependencies for canvas library
* (Apollon77) add sentry configuration

### 1.4.2 (2020-04-08)
* (TA2k) Fix updateState for Google Home

### 1.4.1 (2020-04-04)
* (bluefox) The blood glucose request supported now

### 1.3.4 (2020-02-26)
* (TA2k) Fixed deconz issues in Google Home

### 1.3.3 (2020-02-12)
* (Apollon77) fix alisa error with invalid smartName attributes

### 1.3.2 (2020-02-10)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 1.3.1 (2020-02-09)
* (Apollon77) Dependency updates
* (Apollon77) Make compatible with Admin > 4.0 because of updated socket.io

### 1.2.1 (2020-01-18)
* (bluefox) Fixed problem if the port of admin is not 8081

### 1.2.0 (2020-01-04)
* (TA2k) Google Home handling and visualization improved.

### 1.1.10 (2020-01-03)
* (bluefox) Now is allowed to select the temperature values as alexa states
* (bluefox) Allowed the setting type immediately after insertion of new state

### 1.1.9 (2019-11-27)
* (bluefox) Fixed: sometimes the configuration could not be loaded

### 1.1.8 (2019-09-12)
* (bluefox) Optimization of google home communication was done

### 1.1.7 (2019-09-11)
* (bluefox) The sending rate to google home is limited now

### 1.1.6 (2019-09-11)
* (TA2k) Room fix for Google Home and LinkedDevices

### 1.1.4 (2019-09-10)
* (bluefox) decreased keepalive value to fix issue with disconnect

### 1.1.3 (2019-09-09)
* (TA2k) Google Home problem fixed with LinkedDevices

### 1.1.0 (2019-09-06)
* (bluefox) Added support of aliases

### 1.0.8 (2019-09-03)
* (TA2k) Improved support for Google Home
* (TA2k) Added auto detection for RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider
* (TA2k) Added support for manually adding states as devices
* (TA2k) Fix update state after Sync
* (TA2k) Added typical Google Home devices and traits/actions
* (TA2k) Fix only process update message when Alexa is checked in the options

### 1.0.4 (2019-08-01)
* (bluefox) Fixed password encoding. Please enter password anew!

### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected".

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enablement and disable of Amazon Alexa and of Google Home from configuration.

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2021 bluefox <dogafox@gmail.com>

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