---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/README.md
title: ioBroker IoT-адаптер
hash: jqVgNsg6zSRWJpClkvvC5pVcFxSEHky+KfuzAGvskaM=
---
![Количество установок](http://iobroker.live/badges/iot-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# IoBroker IoT-адаптер
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер предназначен ТОЛЬКО для связи с Amazon Alexa, Google Home и Nightscout.
Он не предназначен для удалённого доступа к вашему экземпляру ioBroker. Для этого используйте адаптер ioBroker.cloud.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Начиная
### Для чего нужен этот адаптер?
Этот адаптер подключает ваши устройства ioBroker к голосовым помощникам, таким как Amazon Alexa и Google Home. Он автоматически создает виртуальные устройства умного дома, которыми можно управлять с помощью голосовых команд.

### Основные понятия
**Перечисления** — это способ организации ваших устройств в ioBroker. Существует два типа:

- **Комнаты**: помещения, такие как "Гостиная", "Спальня", "Кухня"
- **Функции**: Типы устройств, такие как «Освещение», «Обогрев», «Жалюзи»

**Умные имена** — это имена, которые голосовые помощники (Alexa, Google Home) используют для идентификации ваших устройств. Адаптер автоматически генерирует эти имена, комбинируя информацию о комнате и ее функциях (например, «Свет в гостиной»).

### Как это работает:
1. Вы организуете состояния ioBroker в **комнаты** и **функции** с помощью перечислений.
2. Адаптер автоматически обнаруживает устройства и создает интеллектуальные имена, такие как «Освещение в гостиной» или «Обогрев спальни».
3. Эти виртуальные устройства становятся доступны в Alexa или Google Home.
4. Вы можете управлять ими с помощью голосовых команд, например: «Алекса, включи свет в гостиной».

### Предварительные условия
Для использования IoT-адаптера необходимо сначала зарегистрироваться в облаке ioBroker [https://iobroker.pro](https://iobroker.pro).

Примечание: Датчик влажности не может отображаться отдельно от датчика температуры, поскольку Alexa и Google Home не поддерживают такие устройства.

[Ссылка на настройки типов API Google.](https://developers.google.com/actions/smarthome/guides/)

![Введение](../../../en/adapterref/iobroker.iot/img/intro.png)

## Настройки
### Язык
Этот параметр определяет язык, используемый для автоматически генерируемых имен устройств.

- **"по умолчанию"**: Интеллектуальные имена будут использовать исходные имена из ваших перечислений ioBroker (комнат и функций) без преобразования.
- **Конкретный язык** (например, английский, немецкий): Все известные названия помещений и функций будут переведены на выбранный язык.

**Пример:**

— Если ваше устройство называется «Wohnzimmer» (по-немецки «Гостиная») и вы выберете английский язык, то в Alexa/Google Home оно будет называться «Living Room Light».
— Если вы выберете «по умолчанию», останется «Светлая комната».

Это полезно в демонстрационных целях или когда вам нужно быстро переключаться между языками.

### Сначала указывайте имена функций
Этот параметр изменяет порядок слов в автоматически генерируемых названиях устройств.

По умолчанию адаптер формирует имена устройств, комбинируя **название комнаты** и **название функции**.

- **Если не отмечено (по умолчанию)**: Комната в первую очередь → "Диммер для гостиной"
- **Если отмечено**: Функция отображается первой → "Регулировка яркости в гостиной"

**Зачем это менять?** Некоторым людям кажется более естественным сказать «Алекса, включи диммер в гостиной» вместо «Алекса, включи диммер в гостиной». Выберите то, что звучит лучше на вашем языке.

### Объединение слов с
Этот параметр добавляет связующее слово между названиями помещений и функций в автоматически генерируемых именах устройств.

**Пример:**

- **Без** этой настройки: «Регулировка яркости в гостиной» или «Регулировка яркости в гостиной»
- **С** союзом «в»: «Диммер в гостиной» или «Гостиная с диммером»

**Важно:** Использовать эту функцию, как правило, **не рекомендуется**, потому что:

- Голосовым помощникам приходится распознавать лишнее слово, что может привести к недоразумениям.
— Более простые названия лучше работают с голосовыми командами.

Оставьте это поле пустым, если у вас нет веской причины добавлять связующие слова.

### Уровень выключения для переключателей
Некоторые группы состоят из смешанных устройств: диммеров и выключателей. Их можно управлять командами «ВКЛ» и «ВЫКЛ», а также процентами.
Если команда `Set to 30%` и `OFF level is 30%`, то выключатели будут включены. При команде «Установить на 25%» все выключатели будут выключены.

Кроме того, если команда "ВЫКЛ", адаптер запомнит текущий уровень диммера, если фактическое значение превышает или равно "30%".
Позже, когда поступит новая команда "ВКЛ", адаптер переключит диммер не на 100%, а на уровень, сохраненный в памяти.

Пример:

Предположим, что уровень _ВЫКЛ_ составляет 30%.
— Виртуальное устройство «Свет» имеет два физических устройства: _выключатель_ и _диммер_.
- Команда: "установить яркость света на 40%". Адаптер запомнит это значение для диммера, установит его в режим "диммер" и включит выключатель.
- Команда: "выключить свет". Адаптер установит диммер на 0% и выключит выключатель.
- Команда: "включить свет". _диммер_ => 40%, _выключатель_ => ВКЛ.
- Команда: "установить яркость света на 20%". _диммер_ => 20%, _выключатель_ => ВЫКЛ. Значение диммера не будет сохранено, так как оно ниже уровня _ВЫКЛ_.
- Команда: "включить свет". _диммер_ => 40%, _выключатель_ => ВКЛ.

### От ON
Вы можете выбрать режим работы команды «ВКЛ», которая будет применяться к числовому состоянию. Можно выбрать конкретное значение или использовать последнее ненулевое значение.

### Написать ответ
Для каждой команды будет генерироваться текстовый ответ. Здесь вы можете указать идентификатор объекта, куда должен быть записан этот текст. Например, _sayit.0.tts.text_.

### Цвета
Для работы канала необходимо 3-5 штатов со следующими ролями:

- `level.color.saturation` - необходим для определения канала.
- `level.color.hue`,
- `level.dimmer`,
- `switch` - необязательный,
- `level.color.temperature` (необязательно)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Замок
Для возможности блокировки блокировок состояние должно иметь роль `switch.lock` и `native.LOCK_VALUE`, определяющую состояние блокировки.
Если вам требуется отдельное значение для управления блокировкой, вы можете использовать `native.CONTROL VALUE`.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Как генерируются имена устройств
Адаптер автоматически создает виртуальные устройства умного дома, объединяя информацию из ваших настроек ioBroker.

### Понимание перечислений
Перечисления — это встроенный в ioBroker способ организации устройств:

- **Перечисление комнат**: содержит информацию о расположении помещений (гостиная, ванная комната, спальня, кухня и т. д.)
- **Перечисление функций**: Содержит типы устройств (освещение, жалюзи, отопление и т. д.)

### Требования к автоматическому обнаружению
Для того чтобы состояние (устройство) автоматически включалось в систему управления умным домом, оно должно соответствовать следующим условиям:

1. **Должно быть в перечислении функций** (например, "Light", "Heating", "Blinds")
2. **Необходимо иметь правильную роль**: `state`, `switch` или `level.*` (например, `level.dimmer`)
- Если весь канал включен в перечисление функций, то для отдельных состояний не требуются определенные роли.
3. **Должен быть доступен для записи**: `common.write` должен быть `true`.
4. **Особые требования:**
- Для диммеров параметр `common.type` должен быть равен `number`.
Для отопления параметр `common.unit` должен быть равен `°C`, `°F` или `°K`, а параметр `common.type` — `number`.

### Как создаются имена
Адаптер объединяет информацию о помещении и его функциях для создания осмысленных названий:

**Пример:**

— В гостиной есть выключатель света.
- В перечислении указаны «Свет» (функция) и «Гостиная» (комната).
— Сгенерированное имя будет: **"Светильник в гостиной"**

**Несколько устройств одного типа:** Все светильники в гостиной объединены в одно виртуальное устройство «Свет в гостиной». Когда вы говорите «Алекса, включи свет в гостиной», все светильники в этой комнате включаются.

**Устройство без комнаты:** Если состояние присутствует только в перечислении функций (например, "Свет"), но не относится ни к одной комнате, будет использоваться исходное имя состояния.

### Пользовательские имена с помощью smartName
Вы можете отключить автоматическое присвоение имен:

— Установите `common.smartName` на желаемое имя → Устройство будет использовать именно это имя.
- Установите `common.smartName` в значение `false` → Устройство будет исключено из системы управления умным домом.

### Ручная настройка
Диалоговое окно настроек позволяет вручную указать, какие штаты включены и как они сгруппированы: ![Конфигурация](../../../en/adapterref/iobroker.iot/img/configuration.png)

**Переименование:**

- **Группы, состоящие из одного штата**: Могут быть переименованы (использует smartName штата)
- **Группы, состоящие из нескольких состояний**: Необходимо переименовать, изменив имена перечислений.

### Создание пользовательских групп
Чтобы создать собственные группы устройств:

- Используйте адаптер "сцены".
- Создайте "скрипт" в адаптере JavaScript.

### Заменяет
Вы можете указать строки, которые будут автоматически заменены в именах устройств. Например, если вы установите параметр замены на: `.STATE,.LEVEL`, то все `.STATE` и `.LEVEL` будут удалены из имен. Будьте внимательны к пробелам.

Если вы установите параметр `.STATE, .LEVEL`, то будут заменены `.STATE` и `.LEVEL`, а не `.LEVEL`.

## Вспомогательные состояния
- `smart.lastObjectID`: Это состояние будет установлено, если с помощью навыка Home (Alexa, Google Home) управлялось только одно устройство.
- `smart.lastFunction`: Имя функции (если существует), для которой была выполнена последняя команда.
- `smart.lastRoom`: Название комнаты (если существует), для которой была выполнена последняя команда.
- `smart.lastCommand`: Последняя выполненная команда. Команда может быть: `true(ON)`, `false(OFF)`, `number(%)`, `-X(decrease at x)`, `+X(increase at X)`
- `smart.lastResponse`: Текстовый ответ на команду. Его можно отправить в какой-либо движок преобразования текста в речь (`sayit`).

## Переключить режим
Alexa v3 поддерживает режим переключения.
Это означает, что если вы скажете «Alexa, включи свет», а свет уже включен, он будет выключен.

## IFTTT
[инструкции](doc/ifttt.md)

## Google Home
Если в журнале вы видите следующее сообщение об ошибке: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.

В таком случае вам необходимо заново сгенерировать URL-ключ:

![Ключ URL](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Услуги
Существует возможность отправлять сообщения в облачный адаптер.
Если вы вызовете `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` и значение в качестве полезной нагрузки.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

или

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Если в настройках в поле «Белый список для сервисов» указать имя `custom_test` и вызвать сервис с именем "custom_test", то состояние **cloud.0.services.custom_test** будет установлено в значение _myString_.

Вы можете добавить символ "\*" в белый список, и все сервисы будут доступны.

Здесь вы найдете инструкции по его использованию с [задачник](doc/tasker.md).

Использование сервиса IFTTT разрешено только при наличии установленного ключа IFTTT.

Зарезервированные имена: `ifttt`, `text2command`, `simpleApi`, `swagger`. Их следует использовать без префикса `custom_`.

Вы также можете запросить действительный URL-адрес сервиса с помощью сообщения:

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
Вы можете добавить `text2command` в белый список, а также отправить POST-запрос на `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` для записи данных в переменную _text2command.X.text_.

Вы также можете использовать метод GET `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` можно определить в настройках с помощью параметра "Использовать экземпляр text2command".

## Пользовательский навык
Ответы на запросы, требующие использования пользовательского навыка, могут обрабатываться двумя способами:

- `text2command`
- `javascript`

### `text2command`
Если в диалоговом окне конфигурации определен экземпляр `text2command`, то вопрос будет отправлен именно этому экземпляру.

Необходимо настроить параметр `text2command` таким образом, чтобы ожидаемая фраза была проанализирована, и был выдан ответ.

### `Javascript`
Существует возможность обработать вопрос непосредственно с помощью скрипта. Она активирована по умолчанию, если не выбран ни один экземпляр `text2command`.

Если определен экземпляр `text2command`, то этот экземпляр должен предоставить ответ, а ответ от _script_ будет проигнорирован.

Адаптер предоставит подробную информацию в двух состояниях с разным уровнем детализации.

— `smart.lastCommand` содержит полученный текст, включая информацию о типе запроса (намерении). Пример: `askDevice Status Rasenmäher`
— `smart.lastCommandObj` содержит строку JSON, которую можно преобразовать в объект, содержащий следующую информацию.
— Объект `words` содержит полученные слова в виде массива.
— Параметр `intent` содержит тип запроса. В настоящее время возможны следующие значения:
- Навык v1: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
- v2 Навык: `queryIntent`, когда получен полный текст, `controlDevice` в качестве резервного варианта, когда получен только частичный текст.
— `deviceId` содержит идентификатор устройства, на которое был отправлен запрос, предоставленный Amazon; если идентификатор не указан, будет пустой строкой.
— `deviceRoom` содержит сопоставленный идентификатор комнаты, который можно настроить в административном интерфейсе IoT для собираемых идентификаторов устройств.
— `sessionId` содержит идентификатор сессии навыка; он должен совпадать, если было произнесено несколько команд; предоставляется Amazon; если не указан, будет пустой строкой.
— `userId` содержит идентификатор пользователя от владельца устройства (или, возможно, позже, пользователя, взаимодействовавшего с навыком), предоставленный Amazon; если он не указан, будет пустой строкой.
— `userName` содержит сопоставленное имя пользователя, которое можно настроить в административном интерфейсе IoT для собранных идентификаторов пользователей.

Более подробную информацию о том, как распознаются слова и какие типы запросов различает пользовательский навык Alexa, можно найти по ссылке: https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

**Результат возвращается через состояние smart.lastResponse**

Ответ необходимо отправить в течение 200 мс в состоянии `smart.lastResponse` и может представлять собой простую текстовую строку или JSON-объект.
Если это текстовая строка, то этот текст будет отправлен в ответ на действие навыка.
Если текст представляет собой JSON-объект, то можно использовать следующие ключи:

— `responseText` должен содержать текст, который необходимо вернуть в Amazon.
— `shouldEndSession` — это логическое значение, определяющее, будет ли сессия закрыта после произнесения ответа или останется открытой для приема другого голосового ввода.
— Параметр `sessionId` должен содержать идентификатор сессии, для которой предназначен ответ. В идеале, его следует указывать, чтобы разрешить одновременные сессии. Если он не указан, предполагается первая сессия, ожидающая ответа.

**Результат возвращается в экземпляр IoT через сообщение.**

Экземпляр IoT также принимает сообщение с именем "alexaCustomResponse", содержащее ключ "response" и объект, который может содержать ключи `responseText`, `shouldEndSession` и `sessionId`, как описано выше.
От экземпляра IoT на это сообщение ответа не будет!

**Пример сценария, использующего текст**

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

- `alexa` - взаимодействие с Amazon Alexa или пользовательским навыком Amazon.
- `ghome` - взаимодействие с Google Actions через Google Home
- `alisa` - работа с Яндексом Алиса
- `ifttt` - работает как IFTTT (на самом деле не обязательно, но только для целей тестирования)

## Яндекс Алиса
[инструкции](doc/alisa.md)

## Отправка сообщений в приложение
Начиная с версии 1.15.x, вы можете отправлять сообщения в приложение `ioBroker Visu` ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) и [iOS]](https://apps.apple.com/de/app/iobroker-visu/id1673095774)).
Для этого необходимо написать следующие состояния:

```js
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state (this also allows to use payload -> `actions`, `devices` and `openUrl` property)
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

## Todo
- Умные названия должны иметь более высокий приоритет в группах.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Added copy of credentials from cloud instance

### 5.0.11 (2025-12-16)
- (@GermanBluefox) Added percentual control
- (@GermanBluefox) Correcting creation for complex groups

### 5.0.8 (2025-11-28)
- (@GermanBluefox) Showed last controller ID in `smart.lastObjectID`
- (@GermanBluefox) Showed subscription valid period in `info.validTill` and GUI
- (@Copilot) Implemented increasing reconnect interval
- (@GermanBluefox) Added automatically conversion of type TV (alexaV3) to button (alexaV3)
- (@GermanBluefox) Optimized the update of devices in GUI
- (@GermanBluefox) Implemented slider with custom min/max values

### 5.0.7 (2025-11-03)
- (@GermanBluefox) Added possibility to group devices by type in GUI
- (@GermanBluefox) Allowed to select any type in Alexe V3
- (@GermanBluefox) Remove disabled states from auto-detection

### 5.0.6 (2025-11-01)
- (@GermanBluefox) Added logs to detect the issues with detection
- (@GermanBluefox) Added possibility to use the 0/1 state as socket
- (@GermanBluefox) Added dialog to bulk manage the smart names of one device

### 5.0.5 (2025-10-31)
- (@GermanBluefox) Changed behavior of HUE lamps

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