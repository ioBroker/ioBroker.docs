---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/README.md
title: Адаптер IoT ioBroker
hash: 40UtDx2VA3JtWsZYrhVi+dAqzkP5Zq02jj7UFnUNjtU=
---
![Количество установок](http://iobroker.live/badges/iot-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.iot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# Адаптер IoT ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер предназначен ТОЛЬКО для взаимодействия с Amazon Alexa, Google Home и Nightscout.
Он не предназначен для удалённого доступа к вашему экземпляру ioBroker. Для этого используйте адаптер ioBroker.cloud.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Настройки
Чтобы использовать адаптер IoT, необходимо сначала зарегистрироваться в облаке ioBroker [https://iobroker.pro](https://iobroker.pro).

[Ссылка на настройки типа API Google](https://developers.google.com/actions/smarthome/guides/)

![Вступление](../../../en/adapterref/iobroker.iot/img/intro.png)

### Язык
Если выбран язык «по умолчанию», смарт-имена устройств и перечислений не будут переведены. Если указан какой-либо язык, все известные имена будут переведены на этот язык.
Это сделано для быстрого переключения между языками в демонстрационных целях.

### Поместите функцию в имена на первое место
Измените порядок функций и ролей в самогенерируемых именах:

- если ложно: «Функция комнаты», например, «Регулятор яркости в гостиной»
- если да: «Функциональное помещение», например, «Диммерная гостиная»

### Объединить слова с
Вы можете определить слово, которое будет помещено между функциями и комнатами. Например, вместо «в» вместо «Диммер в гостиной» будет «Диммер в гостиной».

Но делать этого не рекомендуется, поскольку распознавателю придется проанализировать еще одно слово, а это может привести к недопониманию.

### Уровень ВЫКЛ для переключателей
Некоторые группы состоят из смешанных устройств: диммеров и выключателей. Разрешено управлять ими командами «ВКЛ» и «ВЫКЛ», а также процентами.
Если задана команда `Set to 30%` и `OFF level is 30%`, выключатели будут включены. По команде «Установить на 25%» все выключатели будут выключены.

Кроме того, если команда «ВЫКЛ», адаптер запомнит текущий уровень диммера, если фактическое значение больше или равно «30%».
В дальнейшем, при поступлении команды «ВКЛ», адаптер переключит диммер не на 100%, а на уровень, сохраненный в памяти.

Пример:

- Предположим, что _уровень ВЫКЛ_ составляет 30%.
- Виртуальное устройство «Свет» имеет два физических устройства: _выключатель_ и _диммер_.
- Команда: «Установить яркость света на 40%». Адаптер запомнит это значение для _диммера_, установит его для «диммера» и включит _выключатель_.
- Команда: «выключить свет». Адаптер установит _диммер_ на 0% и выключит _выключатель_.
- Команда: «включить свет». _диммер_ => 40%, _выключатель_ => ВКЛ.
- Команда: «Установить яркость света на 20%». _диммер_ => 20%, _переключатель_ => ВЫКЛ. Значение диммера не будет сохранено, так как оно ниже уровня ВЫКЛ.
- Команда: «включить свет». _диммер_ => 40%, _выключатель_ => ВКЛ.

### От ON
Вы можете выбрать поведение команды «ВКЛ» для состояния числа. Можно выбрать конкретное значение или использовать последнее ненулевое значение.

### Написать ответ
Для каждой команды будет сгенерирован текстовый ответ. Здесь можно указать идентификатор объекта, куда будет записан этот текст. Например, _sayit.0.tts.text_.

### Цвета
Каналу необходимо 3-5 штатов со следующими ролями:

- `level.color.saturation` - требуется для определения канала,
- `уровень.цвет.оттенок`,
- `level.dimmer`,
- `switch` - необязательно,
- `level.color.temperature` (необязательно)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Замок
Чтобы иметь возможность заблокировать замки, состояние должно иметь роль `switch.lock` и `native.LOCK_VALUE` для определения состояния блокировки.
Если вам требуется отдельное значение для управления замком, вы можете использовать `native.CONTROL VALUE`.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Как будут генерироваться имена
Адаптер пытается создать виртуальные устройства для управления умным домом (например, Amazon Alexa или Google Home).

Для этого есть два важных перечисления: комнаты и функции.

Комнаты: гостиная, ванная комната, спальня.
Функции: освещение, жалюзи, отопление.

Для попадания штата в автоматически сгенерированный список должны быть выполнены следующие условия:

- состояние должно быть в некотором перечислении `function`.
- состояние должно иметь роль (`state`, `switch` или `level.\*`, например, `level.dimmer`), если оно напрямую не включено в «functions».

Может быть, что канал находится в `functions`, но само состояние отсутствует.

- состояние должно быть доступно для записи: `common.write` = true
- диммер состояния должен иметь `common.type` в качестве `number'
- состояние нагрева должно иметь `common.unit` как `°C`, `°F` или `°K` и `common.type` как `number`

Если состояние присутствует только в «функциях» и не присутствует ни в одной «комнате», будет использоваться имя состояния.

Имена состояний будут сформированы на основе имени функции и имени комнаты. Например, все _светильники_ в _гостиной_ будут собраны в виртуальном устройстве _светильник_ в гостиной.
Пользователь не может изменить это имя, поскольку оно генерируется автоматически.
Однако при изменении имени перечисления оно также изменится. (Например, функция "свет" изменится на "светильники", поэтому _светильник_ в гостиной изменится на _светильники_ в гостиной.)

Если у состояния есть common.smartName, все правила будут проигнорированы. В этом случае будет использоваться только смарт-имя.

если `common.smartName` равно `false`, то состояние или перечисление не будут включены в генерацию списка.

Диалоговое окно конфигурации позволяет удобно удалять и добавлять отдельные состояния в виртуальные группы или как отдельные устройства.
![Конфигурация](../../../en/adapterref/iobroker.iot/img/configuration.png)

Если в группе только одно состояние, её можно переименовать, так как для этого будет использоваться smartName состояния.
Если в группе несколько состояний, переименовать группу необходимо, используя имена перечисления.

Для создания собственных групп пользователь может установить адаптер «сцены» или создать «скрипт» в адаптере JavaScript.

### Заменяет
Вы можете указать строки, которые будут автоматически заменяться в именах устройств. Например, если задать replaces: `.STATE,.LEVEL`, то из имён будут удалены все `.STATE` и `.LEVEL`. Будьте осторожны с пробелами.
Если задать `.STATE, .LEVEL`, то будут заменяться `.STATE` и `.LEVEL`, а не `.LEVEL`.

## Вспомогательные состояния
- `smart.lastObjectID`: это состояние будет установлено, если только одно устройство управлялось домашним навыком (Alexa, Google Home).
- `smart.lastFunction`: Имя функции (если существует), для которой была выполнена последняя команда.
- `smart.lastRoom`: Имя комнаты (если существует), для которой была выполнена последняя команда.
- `smart.lastCommand`: Последняя выполненная команда. Возможные значения: `true(ВКЛ)`, `false(ВЫКЛ)`, `number(%)`, `-X(уменьшение на x)`, `+X(увеличение на X)`
- `smart.lastResponse`: Текстовый ответ на команду. Может быть отправлен в какой-либо движок `text2speech` (`sayit`).

## Переключить режим
Alexa v3 поддерживает режим переключения.
Это означает, что если вы скажете «Алекса, включи свет», а свет уже включён, он выключится.

## IFTTT
[инструкции](doc/ifttt.md)

## Google Home
Если вы видите в журнале следующее сообщение об ошибке: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.
Вам необходимо сгенерировать URL-ключ заново:

![URL-адрес](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Услуги
Есть возможность отправлять сообщения в облачный адаптер.
Если вы вызовете `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` и значение в качестве полезной нагрузки.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

или

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Если в настройках поля «Белый список для сервисов» указать имя `custom_test` и вызвать с именем сервиса «custom_test», то состояние **cloud.0.services.custom_test** будет установлено в _myString_.

Вы можете написать «\*» в белом списке и все сервисы будут разрешены.

Здесь вы можете найти инструкции по использованию с [таскер](doc/tasker.md).

Услуга IFTTT разрешена только в том случае, если установлен ключ IFTTT.

Зарезервированные имена: `ifttt`, `text2command`, `simpleApi`, `swagger`. Их необходимо использовать без префикса `custom_`.

Вы также можете запросить действительный URL-адрес сервиса посредством сообщения:

```js
sendTo('iot.0', 'getServiceEndpoint', { serviceName: 'custom_myService' }, result =>
    console.log(JSON.stringify(result)),
);
// Output: {"result":
//  {"url": "https://service.iobroker.in/v1/iotService?key=xxx&user=uuu&service=custom_myService",
//   "stateID":"iot.0.services.myService",
//   "warning":"Service name is not in white list"
//  }}
```

### `text2command`
Вы можете записать `text2command` в белый список, вы можете отправить POST-запрос на `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` для записи данных в переменную _text2command.X.text_.

Вы также можете использовать метод GET `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` можно определить в настройках с помощью параметра «Использовать экземпляр text2command».

## Пользовательский навык
Ответы по пользовательскому навыку можно обрабатывать двумя способами:

- `text2command`
- `javascript`

### `text2command`
если в диалоговом окне конфигурации определен экземпляр `text2command`, то вопрос будет отправлен экземпляру.

`text2command` необходимо настроить так, чтобы ожидаемая фраза была проанализирована и ответ был возвращен.

### `Javascript`
Существует возможность обработки вопроса напрямую с помощью скрипта. Он активируется по умолчанию, если не выбран ни один экземпляр `text2command`.

Если определен экземпляр `text2command`, то этот экземпляр должен предоставить ответ, а ответ из _script_ будет проигнорирован.

Адаптер предоставит информацию в двух состояниях с разным уровнем детализации.

- `smart.lastCommand` содержит полученный текст, включая информацию о типе запроса (намерении). Пример: `askDevice Status Rasenmäher`
- `smart.lastCommandObj` содержит строку JSON, которую можно преобразовать в объект, содержащий следующую информацию
- `words` содержат полученные слова в массиве
- `intent` содержит тип запроса. Возможные значения на данный момент:
- v1 Навык: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
- v2 Навык: `queryIntent` при захвате всего указанного текста, `controlDevice` для отката только с частичным текстом
- `deviceId` содержит deviceId, идентифицирующий устройство, на которое был отправлен запрос, предоставленный Amazon, будет пустой строкой, если не указан
- `deviceRoom` содержит сопоставленный идентификатор комнаты, который можно настроить в пользовательском интерфейсе администратора IoT для собранных deviceIds.
- `sessionId` содержит sessionId сеанса навыка, должен быть одинаковым, если было произнесено несколько команд, предоставляется Amazon, будет пустой строкой, если не указано
- `userId` содержит идентификатор пользователя от владельца устройства (или, возможно, позже, пользователя, который взаимодействовал с навыком), предоставленный Amazon, будет пустой строкой, если не указан
- `userName` содержит сопоставленное имя пользователя, которое можно настроить в пользовательском интерфейсе администратора IoT для собранных идентификаторов пользователей.

Более подробную информацию о том, как распознаются слова и какие типы запросов различает Alexa Custom Skill, можно найти по ссылке https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

**Возврат результата через состояние smart.lastResponse**

Ответ должен быть отправлен в течение 200 мс в состоянии `smart.lastResponse` и может представлять собой простую текстовую строку или JSON-объект.
Если это текстовая строка, то этот текст будет отправлен в качестве ответа навыку.
Если текст представляет собой JSON-объект, можно использовать следующие ключи:

- `responseText` должен содержать текст для возврата на Amazon
- `shouldEndSession` — логическое значение, которое управляет тем, закрывается ли сеанс после произнесения ответа или остается открытым для приема другого голосового ввода.
- `sessionId` должен содержать идентификатор сеанса, для которого предназначен ответ. В идеале его следует указать, чтобы разрешить одновременные сеансы. Если он не указан, предполагается первый сеанс, ожидающий ответа.

**Вернуть результат через сообщение экземпляру IoT**

Экземпляр iot также принимает сообщение с именем «alexaCustomResponse», содержащее ключ «response» с объектом, который может содержать ключи `responseText`, `shouldEndSession` и `sessionId`, как описано выше.
Экземпляр iot не ответит на это сообщение!

**Пример сценария, использующего тексты**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Пример скрипта, использующего объекты JSON**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        responseText: 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        shouldEndSession: true,
        sessionId: request.sessionId,
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

### Частное облако
Если вы используете приватный навык/действие/навык для связи с `Alexa/Google Home/Алиса`, то у вас есть возможность использовать экземпляр IoT для обработки запросов от него.

Например, для `yandex alice`:

```js
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', { type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE }, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Поддерживаются следующие типы:

- `alexa` - действует с помощью Amazon Alexa или Amazon Custom Skill
- `ghome` - работа с Google Actions через Google Home
- `alisa` - работа с Яндексом Алиса
- `ifttt` - действует как IFTTT (на самом деле не обязательно, но для целей тестирования)

## Yandex Алиса
[инструкции](doc/alisa.md)

## Отправка сообщений в приложение
Начиная с версии 1.15.x вы можете отправлять сообщения в приложение `ioBroker Visu` ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) и [iOS](https://apps.apple.com/de/app/iobroker-visu/id1673095774)).
Для этого необходимо записать следующие состояния:

```js
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state (this also allows to use payload -> `actions`, `devices` and `link` property)
// only message is mandatory. All other are optional
// Note that, if you are using `actions`or `devices`, the app needs to handle the notification in the background before showing it
// in some scenarios, e.g. low power or spamming to many notifications the OS may decide to not show the notification at all
setState('iot.0.app.message', JSON.stringify({
  message: 'Message text',
  title: 'ioBroker',
  expire: 60,
  priority: 'normal',
  payload: {
      devices: JSON.stringify(['iPhone von Maelle', 'iPhone von Max']), // devices to send the message to, if not given send to all - requires Visu App 1.4.0
      openUrl: 'https://www.iobroker.net', // opens a link when clicking on the notification
      actions: JSON.stringify([ // actions to respond to the notification - requires Visu App 1.4.0
          { buttonTitle: 'Yes', identifier: 'home:yes' }, // The app will display the button title and on clicking the identifier will be set to the state `iot.0.app.devices.<deviceName>.actionResponse`
          { buttonTitle: 'No', identifier: 'home:no' }
      ])
  }
})); // important, that ack=false (default)
```

## Задача
- Умные имена должны иметь более высокий приоритет, чем группы
- Устройства должны быть сгруппированы по интеллектуальному имени.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 4.2.0 (2025-10-21)
- (@GermanBluefox) Added debug information
- (@GermanBluefox) Better handling of HUE devices
- (@GermanBluefox) Updated type detector

### 4.1.11 (2025-10-20)
- (@GermanBluefox) Added humidity sensor
- (@GermanBluefox) Added unreach indicator
- (@GermanBluefox) Corrected deletion of automatically detected devices

### 4.1.10 (2025-10-19)
- (@GermanBluefox) Fixed detection of blinds
- (@GermanBluefox) Fixed detection of sliders

### 4.1.7 (2025-10-19)
- (@GermanBluefox) Better handling of dimmer in alexa v3

### 4.1.5 (2025-10-18)
- (@GermanBluefox) Better handling of color temperatures

## License

The MIT License (MIT)

Copyright (c) 2018-2025 bluefox <dogafox@gmail.com>

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