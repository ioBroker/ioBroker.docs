---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/README.md
title: ioBroker IoT-адаптер
hash: F92Msc6FfpHuPuDUbKZC8Zcr4aXRGIWCYknHnzguwq0=
---
![Логотип](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Количество установок](http://iobroker.live/badges/iot-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.iot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iot.svg)

# IoT-адаптер ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер предназначен ТОЛЬКО для связи с Amazon Alexa, Google Home и Nightscout.
Он не предназначен для удаленного доступа к вашему экземпляру ioBroker. Для этого используйте адаптер ioBroker.cloud.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Настройки
Чтобы использовать адаптер iot, вам необходимо сначала зарегистрироваться в облаке ioBroker [https://iobroker.pro](https://iobroker.pro).

[Ссылка на настройки типа Google API](https://developers.google.com/actions/smarthome/guides/)

![вступление](../../../en/adapterref/iobroker.iot/img/intro.png)

### Язык
Если вы выберете язык «по умолчанию», интеллектуальные имена устройств и перечислений не будут переведены. Если указан какой-либо язык, все известные имена будут переведены на этот язык.
Это сделано для быстрого переключения между многими языками в демонстрационных целях.

### Сначала помещайте функцию в имена
Измените порядок функций и ролей в автоматически создаваемых именах:

- если ложно: «Функция помещения», напр. «Диммер для гостиной»
- если верно: «Функциональная комната», например. «Темная гостиная»

### Объедините слова с помощью
Вы можете определить слово, которое будет стоять между функцией и комнатой. Например. «в» и из «Диммер в гостиной» будет «Диммер в гостиной».

Но делать это не рекомендуется, поскольку механизм распознавания должен проанализировать еще одно слово, а это может привести к недопониманию.

### Уровень ВЫКЛ для переключателей
Некоторые группы состоят из смешанных устройств: диммеров и выключателей. Управлять ими допускается командами «ВКЛ» и «ВЫКЛ» и процентами.
Если команда — `Set to 30%` и `OFF level is 30%`, то переключатели будут включены. По команде «Установить на 25%» все переключатели будут выключены.

Кроме того, если команда «ВЫКЛ», адаптер запомнит текущий уровень диммера, если фактическое значение превышает или равно «30%».
Позже, когда придет новая команда «ВКЛ», адаптер переключит диммер не на 100%, а на уровень в памяти.

Пример:

- Предположим, что *уровень ВЫКЛ* составляет 30%.
- Виртуальное устройство «Свет» имеет два физических устройства: *выключатель* и *диммер*.
- Команда: «Установить свет на 40%». Адаптер запомнит это значение для *диммера*, установит его как «диммер» и включит *переключатель*.
- Команда: «Выключи свет». Адаптер установит *диммер* на 0% и выключит *выключатель*.
- Команда: «Включи свет». *диммер* => 40%, *переключатель* => ВКЛ.
- Команда: «Установить свет на 20%». *диммер* => 20%, *переключатель* => ВЫКЛ. Значение диммера не будет запомнено, поскольку оно находится ниже *уровня ВЫКЛ*.
- Команда: «Включи свет». *диммер* => 40%, *переключатель* => ВКЛ.

### От ВКЛ.
Вы можете выбрать поведение команды включения для состояния номера. Можно выбрать конкретное значение или будет использовано последнее ненулевое значение.

### Напишите ответ
На каждую команду будет генерироваться текстовый ответ. Здесь вы можете определить идентификатор объекта, куда должен быть записан этот текст. Например. *sayit.0.tts.text*.

### Цвета
Каналу необходимо 3-5 состояний со следующими ролями:

- `level.color.saturation` - необходим для обнаружения канала,
- `level.color.hue`,
- `level.dimmer`,
- `переключатель` - необязательно,
- `level.color.temperature` (необязательно)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Замок
Чтобы иметь возможность блокировать блокировки, состояние должно иметь роль «switch.lock» и «native.LOCK_VALUE» для определения состояния блокировки.
Если вам нужно отдельное значение для управления блокировкой, вы можете использовать «native.CONTROL VALUE».

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Как будут генерироваться имена
Адаптер пытается создать виртуальные устройства для управления умным домом (например, Amazon Alexa или Google Home).

Для этого есть два важных перечисления: помещения и функции.

Комнаты такие: гостиная, ванная, спальня.
Функции такие: свет, жалюзи, обогрев.

Чтобы получить состояние в автоматически сгенерированном списке, должны быть выполнены следующие условия:

- состояние должно находиться в каком-то перечислении «функций».
- состояние должно иметь роль («state», «switch» или «level.*», например level.dimmer), если оно не включено напрямую в «функции».

Может быть, канал есть в "функциях", а самого состояния нет.

- состояние должно быть доступно для записи: `common.write` = true
- диммер состояния должен иметь «common.type» в качестве «номера».
- состояние отопления должно иметь `common.unit` как '°C', '°F' или '°K' и `common.type` как `number`

Если состояние указано только в «функциях», а не в какой-либо «комнате», будет использоваться имя состояния.

Имена состояний будут генерироваться на основе функции и комнаты. Например. все *освещение* в *гостиной* будет собрано в виртуальном устройстве *освещение гостиной*.
Пользователь не может изменить это имя, поскольку оно генерируется автоматически.
Но если имя перечисления изменится, это имя тоже будет изменено. (например, функция «свет» изменена на «освещение», поэтому *свет в гостиной* будет изменен на *освещение в гостиной*)

Все правила будут игнорироваться, если состояние имеет common.smartName. В этом случае будет использоваться только смарт-имя.

если `common.smartName` равен `false`, состояние или перечисление не будут включены в создание списка.

Диалоговое окно конфигурации позволяет удобно удалять и добавлять отдельные состояния в виртуальные группы или как одно устройство.
![Конфигурация](../../../en/adapterref/iobroker.iot/img/configuration.png)

Если в группе только одно состояние, его можно переименовать, для этого будет использоваться smartName состояния.
Если группа имеет более одного состояния, группу необходимо переименовать с помощью имен перечисления.

Для создания собственных групп пользователь может установить адаптер «сцены» или создать «скрипт» в адаптере Javascript.

### Заменяет
В именах устройств можно указать строки, которые будут автоматически заменяться. Например, если вы установите замену на: `.STATE,.LEVEL`, все `.STATE` и `.LEVEL` будут удалены из имен. Будьте осторожны с пробелами.
Если вы установите `.STATE, .LEVEL`, то будут заменены `.STATE` и `.LEVEL`, а не `.LEVEL`.

## Вспомогательные состояния
- `smart.lastObjectID`: это состояние будет установлено, если только одно устройство управлялось домашним навыком (Alexa, Google Home).
- `smart.lastFunction`: имя функции (если существует), для которой была выполнена последняя команда.
- `smart.lastRoom`: имя комнаты (если существует), для которой была выполнена последняя команда.
- `smart.lastCommand`: последняя выполненная команда. Команда может быть: `true(ON)`, `false(OFF)`, `number(%)`, `-X(уменьшить в x)`, `+X(увеличить в X)`
- `smart.lastResponse`: текстовый ответ на команду. Его можно отправить в какой-нибудь движок text2speech («sayit»).

## Переключение режима
Alexa v3 поддерживает режим переключения.
Это означает, что если вы скажете «Алекса, включи свет», а свет уже включен, он выключится.

## ИФТТТ
[инструкции](doc/ifttt.md)

## Главная страница Google
Если вы видите в журнале следующее сообщение об ошибке: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.
Поэтому вам необходимо заново сгенерировать URL-ключ:

![URL-ключ](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Услуги
Есть возможность отправлять сообщения на облачный адаптер.
Если вы вызываете `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` и значение в качестве полезной нагрузки.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

или

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Если в настройках задать в поле «Белый список для сервисов» имя `custom_test`, а в качестве имени сервиса вызвать «custom_test», то будет установлено состояние **cloud.0.services.custom_test** в *myString*.

Вы можете написать «*» в белом списке и все услуги будут разрешены.

Здесь вы можете найти инструкции по использованию с [надсмотрщик](doc/tasker.md).

Служба IFTTT разрешена только в том случае, если установлен ключ IFTTT.

Зарезервированные имена: `ifttt`, `text2command`, `simpleApi`, `swagger`. Их необходимо использовать без префикса `custom_`.

Вы также можете запросить в сообщении действительный URL-адрес услуги:

```
sendTo('iot.0', 'getServiceEndpoint', {serviceName: 'custom_myService'}, result =>
  console.log(JSON.stringify(result)));
  // Output: {"result":
  //  {"url": "https://service.iobroker.in/v1/iotService?key=xxx&user=uuu&service=custom_myService",
  //   "stateID":"iot.0.services.myService",
  //   "warning":"Service name is not in white list"
  //  }}
```

### `text2command`
Вы можете записать `text2command` в белый список, вы можете отправить POST-запрос к `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` для записи данных в переменную *text2command.X.text*.

Вы также можете использовать метод GET `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` можно определить в настройках с помощью опции «Использовать экземпляр text2command».

## Пользовательский навык
Ответы на пользовательские навыки можно обрабатывать двумя способами:

- `текст2команда`
- `джаваскрипт`

### `text2command`
если экземпляр `text2command` определен в диалоговом окне конфигурации, вопрос будет отправлен в экземпляр.

`text2command` должен быть настроен так, чтобы ожидаемая фраза анализировалась и возвращался ответ.

### `Javascript`
Есть возможность обработки вопроса напрямую скриптом. Он активируется по умолчанию, если не выбран экземпляр `text2command`.

Если определен экземпляр `text2command`, этот экземпляр должен предоставить ответ, а ответ из *script* будет игнорироваться.

Адаптер предоставит подробную информацию в двух состояниях с разным уровнем детализации.

* `smart.lastCommand` содержит полученный текст, включая информацию о типе запроса (намерении). Пример: `askDevice Status Rasenmäher`
* `smart.lastCommandObj` содержит строку JSON, которую можно преобразовать в объект, содержащий следующую информацию
  * `words` содержит полученные слова в массиве
  * `intent` содержит тип запроса. Возможные значения на данный момент:
    * Навык v1: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
    * Навык v2: `queryIntent`, когда весь указанный текст был захвачен, `controlDevice` для возврата только к частичному тексту.
  * `deviceId` содержит идентификатор устройства, идентифицирующий устройство, на которое был отправлен запрос, доставленный Amazon; если он не указан, будет пустой строкой.
  * `deviceRoom` содержит сопоставленный идентификатор комнаты, который вы можете настроить в пользовательском интерфейсе администратора iot для собранных идентификаторов устройств.
  * `sessionId` содержит идентификатор сеанса сеанса Skill, должен быть одинаковым, если было произнесено несколько команд, доставленных Amazon, будет пустой строкой, если не указан
  * `userId` содержит идентификатор пользователя от владельца устройства (или, возможно, позже пользователя, который взаимодействовал с навыком), предоставленный Amazon. Если он не указан, будет пустой строкой.
  * `userName` содержит сопоставленное имя пользователя, которое вы можете настроить в пользовательском интерфейсе администратора iot для собранных идентификаторов пользователей.

 Более подробную информацию о том, как распознаются слова и какие типы запросов различает специальный навык Alexa, можно найти на странице https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

**Возврат результата через состояние smart.lastResponse**

Ответ должен быть отправлен в течение 200 мс в состоянии `smart.lastResponse` и может представлять собой простую текстовую строку или объект JSON.
Если это текстовая строка, то этот текст будет отправлен как ответ на навык.
Если текст представляет собой объект JSON, то можно использовать следующие ключи:

* `responseText` должен содержать текст для возврата на Amazon.
* `shouldEndSession` — это логическое значение, которое определяет, закрывается ли сеанс после произнесения ответа или остается открытым для принятия другого голосового ввода.
* `sessionId` должен содержать идентификатор сеанса, для которого предназначен ответ. В идеале предоставьте его, чтобы разрешить одновременные сеансы. Если не указано, предполагается первый сеанс, который ожидает ответа.

**Возврат результата через сообщение в экземпляр iot**

Экземпляр iot также принимает сообщение с именем «alexaCustomResponse», содержащее ключ «ответ» с объектом, который может содержать ключи `responseText`, `shouldEndSession` и `sessionId`, как описано выше.
От экземпляра iot на сообщение ответа не будет!

**Пример скрипта, использующего текст**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Пример скрипта, использующего объекты JSON**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true,
        'sessionId': request.sessionId
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

### Частное облако
Если вы используете личный навык/действие/навык для связи с `Alexa/Google Home/Алиса`, то у вас есть возможность использовать экземпляр IoT для обработки запросов от него.

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

- `alexa` — действие с помощью Amazon Alexa или Amazon Custom Skill.
- `ghome` — действие с помощью Google Actions через Google Home.
- `alisa` - работа с Яндексом Алиса
- `iftt` - действует как IFTTT (на самом деле не требуется, но в целях тестирования)

##Яндекс Алиса
[инструкции](doc/alisa.md)

## Отправлять сообщения в приложение
Начиная с версии 1.15.x вы можете отправлять сообщения в приложение `ioBroker.visu` (Android и iOS).
Для этого вам нужно написать следующие состояния:

```
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state
// only is message is mandatory. All other are optional
setState('iot.0.app.message', JSON.stringify({
  message: 'Message text',
  title: 'ioBroker',
  expire: 60,
  priority: 'normal'
})); // important, that ack=false (default)
```

## Делать
- Умные имена должны иметь более высокий приоритет в группах.
- Устройства должны быть сгруппированы по смарт-имени.

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 3.1.0 (2024-02-05)
* (bluefox) Updated packages
* (bluefox) Disabled the state change report for alexa v3

### 3.0.0 (2023-10-24)
* (bluefox) Updated packages
* (bluefox) The minimal supported node.js version is 16

### 2.0.11 (2023-06-20)
* (bluefox) Added support for the state toggling (alexa 3)
* (bluefox) Done small improvements for alexa 3

### 2.0.9 (2023-06-15)
* (bluefox) Working on support for amazon alexa v3

### 2.0.2 (2023-06-05)
* (bluefox) Added support for amazon alexa v3
* (bluefox) Removed support for sugar blood indication

### 1.14.6 (2023-05-12)
* (bluefox) Corrected translations

### 1.14.5 (2023-03-01)
* (bluefox) Corrected names of enums in GUI

### 1.14.3 (2023-01-10)
* (kirovilya) Fixed processing for lights with CT and RGB in Alisa

### 1.14.2 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.14.1 (2022-12-22)
* (bluefox) Downgraded the axios version to 0.27.2

### 1.14.0 (2022-12-13)
* (bluefox) Added netatmo support

### 1.13.0 (2022-12-08)
* (Apollon77) Added support vor Custom Skill v2

### 1.12.5 (2022-11-09)
* (bluefox) Small changes on configuration GUI

### 1.12.4 (2022-11-03)
* (bluefox) Added ukrainian language
* (bluefox) Corrected blockly for unknown languages

### 1.12.2 (2022-10-01)
* (Apollon77) Fixed crash case

### 1.12.1 (2022-09-27)
* (bluefox) Corrected error in GUI with empty password

### 1.12.0 (2022-09-27)
* (Apollon77) Do not control saturation with a percentage request via alexa
* (bluefox) Migrated GUI to v5

### 1.11.9 (2022-07-22)
* (Apollon77) Fix temperature controlling for thermostats via alexa

### 1.11.8 (2022-06-24)
* (Apollon77) Update dependencies to allow better automatic rebuild

### 1.11.7 (2022-06-13)
* (bluefox) Tried to correct URL key creation for Google home

### 1.11.5 (2022-06-03)
* (kirovilya) Alisa: update for binary-sensor "motion" and "contact"

### 1.11.4 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 1.11.3 (2022-03-23)
* (bluefox) Added the generation of URL key for services

### 1.11.2 (2022-03-20)
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3P)

### 1.11.1 (2022-03-18)
* (Apollon77) Optimize logging when many devices are used

### 1.11.0 (2022-03-17)
* (Apollon77) Also support "stored" when a rgb state is turned on/off
* (Apollon77) Fixed control percent value to respect min/max correctly
* (bluefox) Support for response messages longer than 128k (zip)

### 1.10.0 (2022-03-09)
* (Apollon77) Respect min/max when calculating the value for byOn with % values

### 1.9.7 (2022-02-20)
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3C)

### 1.9.6 (2022-02-19)
* (Apollon77) Make sure to not remember the off value when using stored values for on
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3A)

### 1.9.5 (2022-02-08)
* (bluefox) Fixed Google home error with color control

### 1.9.4 (2022-02-08)
* (bluefox) Fixed error with the certificates fetching

### 1.9.3 (2022-02-03)
* (bluefox) Removed deprecated package `request`
* (bluefox) Refactoring and better error handling

### 1.9.2 (2022-01-26)
* (bluefox) Added experimental support for remote access

### 1.8.25 (2021-11-18)
* (bluefox) Corrected the enabling of the category

### 1.8.24 (2021-09-19)
* (bluefox) Respect the min/max limits by controlling

### 1.8.23 (2021-09-18)
* (bluefox) Fixed the response for the heating control

### 1.8.22 (2021-05-16)
* (bluefox) Make it admin4 compatible

### 1.8.21 (2021-05-16)
* (bluefox) Fixed the encryption of the password. Warning: if you see the message in the log, that password is invalid, please enter the password in configuration dialog one more time and save.

### 1.8.20 (2021-05-16)
* (foxriver76) we now write data received from custom services with the acknowledge flag

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
* (bluefox) Corrected the "Google home" error

### 1.8.6 (2020-12-13)
* (bluefox) Try to fix google home error

### 1.8.5 (2020-11-23)
* (bluefox) Corrected the configuration table for Google home

### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for Google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for Google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for Google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The Google home table was rewritten

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
* (bluefox) Do not try to load the "sharp" if the blood sugar not enabled

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
* fixed iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fixed iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

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

Copyright (c) 2018-2024 bluefox <dogafox@gmail.com>

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