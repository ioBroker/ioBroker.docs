---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: ReLEKv245cIhYjwxe85LVmSsgtje35VZtkOmKfxTUGI=
---
![Логотип](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![Количество установок](http://iobroker.live/badges/eventlist-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.eventlist/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/eventlist/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eventlist.svg)

# ioBroker.eventlist

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер Event-List для ioBroker

Позволяет определить состояния, которые должны быть зарегистрированы в списке событий.

Список можно отображать в админке, на веб-сайте, в визуализации, сохранять в формате PDF, использовать в материалах (пока не реализовано).

Кроме того, вы можете отправлять информацию о мероприятиях через Telegram или WhatsApp.

![Список](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Настройки состояния

Состояние обычно добавляется в список в настройках экземпляра, где доступен весь набор параметров: текст, цвета, значки, мессенджеры и постоянные сообщения.

Наиболее важные из них находятся также в пользовательских настройках самого объекта, на вкладке за значком шестеренки в списке объектов: текст события «только изменяется», а для логического состояния — текст и цвет значений TRUE и FALSE. Это тот же набор, что и в старом диалоговом окне адаптера, и он записывается в то же место.`common.custom.<eventlist.X>` Таким образом, оба способа можно комбинировать.

## Режим тревоги

События могли генерироваться только в режиме тревоги. Режим тревоги можно было регулировать с помощью переменной.`eventlist.X.alarm` .

Кроме того, сообщения в мессенджеры можно было отправлять только при включенном режиме будильника.

Пример использования:

- Например, дверной датчик может отправлять сообщения только в том случае, если никого нет дома. В противном случае в список событий будут включены только события, связанные с открытием двери.

## Сообщения

Помимо списка событий, в котором регистрируются произошедшие события, адаптер хранит список _текущих_ событий: сообщение приходит, когда условие становится истинным, оно удаляется, когда условие становится ложным, и удаляется из списка только после подтверждения. Это обычное поведение диспетчерской, и одного списка событий недостаточно.

Не путайте это с описанным выше режимом тревоги. Режим тревоги — это переключатель постановки на охрану, сообщение означает неисправность.

### Уровни

`fatal` ,`error` ,`warning` и`info` Два наиболее серьезных предупреждения должны быть подтверждены по умолчанию, два других — нет; любое сообщение может это переопределить.

### Четыре состояния сообщения

| код | активный | признан | в списке |
| --- | -------- | ------- | -------- |
| К   | да       | нет     | да       |
| КК  | да       | да      | да       |
| КГ  | нет      | нет     | да       |
| KGQ | нет      | да      | нет      |

Сообщение, которое было отправлено и получено повторно до подтверждения, не создает вторую запись, а вместо этого учитывается его повторение. Таким образом, неактивный контакт не может переполнить список.

### Сообщения из штата

Настройки сообщений располагаются рядом с другими настройками состояния.`common.custom.<eventlist.X>.message` :

```json
{
    "level": "error",
    "text": "%n too hot: %s%u",
    "condition": { "operator": ">", "limit": 90 },
    "requiresAck": true,
    "priority": 50,
    "hysteresis": 5,
    "delay": 3000,
    "delayGone": 60000,
    "group": "boiler"
}
```

`condition` либо сравнение с`operator` и`limit` для чисел или`value` Это поднимает вопрос о логических значениях и текстовых данных. В тексте используются шаблоны.`%s` ,`%u` ,`%n` и`%l` может быть использован.

Для состояний с перечислением каждое отдельное значение может содержать`level` Вместо этого. Тогда каждое значение представляет собой отдельное сообщение, и сохраняется только значение текущего значения. Текст, группа и задержки являются общими для всех них.

### Тишина в списке

Для удобства чтения списка доступны четыре параметра, все они необязательны:

| параметр         |                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delay`          | Условие должно выполняться в течение указанного количества миллисекунд до получения сообщения.                                                                                                      |
| `delayGone`      | То же самое относится и к движению. Неисправность, которая останавливает движение на мгновение, не устраняется.                                                                                     |
| `hysteresis`     | Только для чисел: сообщение, которое остается в силе, исчезает только тогда, когда значение снова превышает этот предел на столько-то. Против значения, которое колеблется на грани своего предела. |
| хлопающая защита | Эта настройка применяется ко всему экземпляру, по умолчанию — более десяти переходов за пять минут.                                                                                                 |

Сообщение о том, что лопасти остаются в списке, помечается символом`flapping` и не вносит никаких дальнейших записей в список событий, пока не успокоится. Записываются только начало и конец беспокойства, поэтому неявный контакт стоит две строки, а не двести.

### Группы

`group` Это свободное имя. Сообщения одной группы отмечаются вместе, а первое сообщение помечается значком.`first` В списке обычно фигурирует вина, а остальное — её следствие.

```js
// acknowledge the whole group
setState('eventlist.0.messages.ack', 'boiler');
```

### Сообщения из скрипта

Не каждая ошибка зависит от одного сигнала. Скрипт может самостоятельно генерировать и удалять сообщение, выбирая тот сигнал, который ему больше нравится.`id` сохраняет свою целостность на протяжении всего жизненного цикла:

```js
sendTo('eventlist.0', 'message', {
    id:    'heating.flow',
    level: 'error',
    text:  'Flow too cold although the pump runs',
});

// the same message goes again
sendTo('eventlist.0', 'message', { id: 'heating.flow', state: 'gone' });
```

Сообщение из чужой системы может вызвать`severity` Вместо уровня, как в OPC UA, значения отображаются от 1 до 1000. Здесь же уровень соответствует значению выше 800.`fatal` выше 500`error` выше 200`warning` , остальные`info` .

### Подтверждение

```js
// one message, a group, or "*" for everything that can be acknowledged
setState('eventlist.0.messages.ack', 'heating.flow');

// with the name of the user, and with the number of acknowledged messages as an answer
sendTo('eventlist.0', 'ack', { id: '*', user: 'ben' }, result => console.log(result.acknowledged));

// read the standing messages
sendTo('eventlist.0', 'messages', null, result => console.log(JSON.stringify(result)));
```

### Во время технического обслуживания

Пока кто-то занимается отоплением, все остальные отправляют отчеты. Сообщение или целая группа сообщений могут быть временно удалены из списка:

```js
// half an hour of quiet for the group "boiler"
setState('eventlist.0.messages.suppress', 'boiler:30');

// the same with the message API, and "*" suppresses everything
sendTo('eventlist.0', 'suppress', { target: 'boiler', minutes: 30 });

// let it back in
setState('eventlist.0.messages.suppress', 'boiler:0');
```

Без указания продолжительности используется значение из настроек экземпляра, по умолчанию — час, а подавление длится максимум месяц. Это имеет значение: сообщение, подавленное навсегда, — это ошибка, о которой никто больше не знает. Подавленное сообщение продолжает работать внутри системы, оно просто вычеркивается из списка, из счетчиков и из списка событий; начало и конец подавления записываются в список событий, поэтому пробел в истории имеет свою причину.

### Таблица в админке

В настройках экземпляра есть вкладка **«Сообщения»** , содержащая все данные: уровень, общее состояние.`K` /`KQ` /`KG` Задается информация о том, как долго сообщение находилось в сети, его текст, значение, частота появления, группа и идентификатор состояния. Первое сообщение группы и сообщение, находящееся в состоянии "внезапного появления", помечаются, то, что в данный момент подавлено, указывается над таблицей, и оттуда можно подтвердить получение отдельных сообщений или всех сразу. Порядок соответствует порядку в диспетчерской: уровень, затем приоритет, затем время.

### Рог

`messages.horn` Это верно, пока сохраняется неподтвержденное сообщение настраиваемого уровня или более высокого уровня, по умолчанию.`error` Включено. Оно предназначено для сирены, лампы или цвета плитки и замолкает при подтверждении, а не при ремонте. Сообщения, на которые никто не обязан отвечать, никогда не звучат.

### Штаты

| состояние                          |                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `messages.list`                    | Постоянные сообщения, отсортированные и готовые к показу                        |
| `messages.raw`                     | Те же самые сообщения с их внутренним состоянием сохраняются после перезапуска. |
| `messages.count`                   | сколько сообщений осталось                                                      |
| `messages.countFatal` …`countInfo` | одинаковый для каждого уровня                                                   |
| `messages.unacknowledged`          | Сколько из них никто не упомянул?                                               |
| `messages.highest`                 | Самый строгий уровень для стояния, пустой, если ничего не стоит                 |
| `messages.horn`                    | неподтвержденное сообщение от настроенного уровня на стендах                    |
| `messages.ack`                     | Напишите здесь, чтобы подтвердить получение сообщения, группы или `*`           |
| `messages.suppress`                | напишите здесь, чтобы подавить, как `target:minutes`                            |
| `messages.suppressed`              | Что сейчас скрывается и до какого момента                                       |

При каждом переходе в список событий также записывается обычная запись с указанием уровня, идентификатора сообщения и произошедшего. Таким образом, история остается полной, и все существующие представления, PDF-файл и мессенджеры продолжают работать.

После перезапуска условия перепроверяются. Сообщение, условие которого больше не выполняется, в этот момент отправляется и остается в списке без подтверждения, поскольку иначе никто никогда не узнал бы о возникшей ошибке. Сообщения из скрипта не могут быть перепроверены, только скрипт знает их состояние, поэтому они остаются в том же состоянии, что и раньше. Задержки, выполняющиеся после перезапуска, не сохраняются, они запускаются заново; подавления сохраняются, они продолжают выполняться до своего завершения.

## Возможные презентации

### В разделе «Администрирование» на вкладке

Вы можете включить список событий в качестве вкладки в административной панели.

### Веб

Список мероприятий можно отобразить в разделе`http://<IP>:8082/eventlist/index.html` (для экземпляров > 0:`http://<IP>:8082/eventlist/index.html?X` где X — номер экземпляра)

### Виджет Vis

Список событий можно отобразить в виде виджета vis.

### Диспетчер устройств

Диспетчер устройств отображает плитку с последним событием. Щелчок по ней открывает весь список в диалоговом окне. Плитку можно ограничить событиями одного состояния, поэтому каждое устройство может иметь свою собственную плитку.

### генерация PDF

Существует возможность сгенерировать PDF-документ со всеми событиями.

В заголовке документа можно указать дату создания, если в него поместить соответствующий шаблон:`Event list on {{YYYY MM DD}}` Точное описание формата времени можно найти здесь: <https://momentjs.com/docs/#/displaying/format/>

Создание PDF-файла может быть запущено путем написания запроса.`true` в`eventlist.0.triggerPDF` .

Доступ к PDF-файлу можно получить по следующему адресу:

- веб:`http://<IP>:8082/eventlist/eventlist/report.pdf` (для случаев > 0:`http://<IP>:8082/eventlist/eventlist/report-X.pdf` где X — номер экземпляра)
- администратор:`http://<IP>:8081/files/eventlist/report.pdf` (для случаев > 0:`http://<IP>:8081/files/eventlist/report-X.pdf` где X — номер экземпляра)

**Иконки не удалось отобразить в формате PDF.**

## Поле для сообщений

Пользователи могут добавлять пользовательские события в список с помощью JavaScript:

```js
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text', 
    id: 'ID.that.linked.with.this.event',  // optional 
    ts: new Date('2020-09-25T16:11:00'),    // optional. Default is Date.now()
    val: 5,                                // optional 
    duration: 5,                           // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', JSON.stringify({event: 'My custom text %s', val: 5}));
```

Пользователь может запросить отформатированный JSON-список для определенного ID. Разумеется, для этого ID должен быть активирован.`eventlist` до.

```js
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1', 
    //
});

// or 
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

Пользователи могут удалять некоторые или все события из списка событий.

```js
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

## Узоры

В текстах событий и в текстах состояний можно использовать следующие шаблоны:

- %s - значение (`State changed to %s` =>`State changed to 5` ),
- %u - единица (`State changed to %s%u` =>`State changed to 5%` ),
- %n - имя (`%n changed state to %s` =>`Device A changed state to 5` ),
- %t - время (`State changed state on %t` =>`State changed state on Sep Fr, 16:32:00` ),
- %r - относительное время (`State changed state %r` =>`State changed state 5 seconds ago` ),
- %d - длительность (`State was in previous state for %d` =>`State was in previous state for 5s` ),
- %g - разница значений, то есть новое значение минус предыдущее. Только для состояний типа`number` (`State was changed on %g%` =>`State was changed on 1%` ),
- %o - предыдущее значение (`State changed value from %o to %s` =>`State changed value from 4 to 5` )

## Использование нескольких экземпляров в веб-среде

Например, вы можете отобразить конкретный список для примера 2, например:`http://IP:8082/eventlist/index.html?2` .

Сгенерированный отчет будет сохранен для экземпляра 0 в`eventlist/report.pdf` но, например, 1 в`eventlist/report-1.pdf` .

## Все

- Измените исходный текст в PDF-файле на соответствующий язык.
- Множество предопределенных значков (минимум 100)
- Отправка сообщений в syslog (возможно, Splunk) <https://www.npmjs.com/package/splunk-logging>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Added devices widget
* (@GermanBluefox) Added messages with levels, coming and going, and acknowledgement
* (@GermanBluefox) Added delays, hysteresis, groups, flapping protection, suppression and horn for the messages
* (@GermanBluefox) Added the tab with the standing messages and the acknowledgement in the admin
* (@GermanBluefox) Brought the settings of a state back into the custom tab of the objects, as a JSON config component
* (@GermanBluefox) Fixed the alarm mode, that was switched off by every restart

### 3.0.0 (2026-09-04)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) A Minimum node.js version is 22
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added blockly und vis-2 widgets (only for vis-2 >= 2.20.0)

### 2.1.0 (2025-05-20)
* (maeb3) Correction for handover of a message to pushover
* (bluefox) The packages were updated
* (bluefox) GUI migrated to vite

### 2.0.1 (2024-02-11)
* (bluefox) Translated the duration

### 2.0.0 (2023-10-12)
* (bluefox) Caught errors by subscribe
* (bluefox) Minimum node.js version is 16

### 1.2.4 (2023-05-17)
* (bluefox) Just the packages were updated

### 1.2.3 (2023-03-16)
* (bluefox) Corrected the edit of the event sources
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.2.2 (2022-12-27)
* (bluefox) Corrected web page loading in web adapter

### 1.2.1 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.2.0 (2022-11-12)
* (bluefox) Fixed error with edit of the state settings
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.1.1 (2022-10-12)
* (bluefox) Fixed icons of devices
* (bluefox) Migrated GUI to `mui5`
* (bluefox) Allowed the editing of list name
* (Hirsch-DE) corrected events without a unit

### 1.0.1 (2022-06-22)
* (bluefox) Added preparations for ioBroker cloud

### 1.0.0 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 0.5.5 (2022-04-23)
* (Apollon77) Fix a crash issue
* (Apollon77) Add Sentry also for the Node.js part

### 0.5.4 (2022-02-14)
* (bluefox) Corrected the image paths

### 0.5.3 (2022-02-13)
* (bluefox) Corrected the error with "changes only" option
* (bluefox) Added possibility to use icons with custom events

### 0.4.4 (2021-06-24)
* (bluefox) Corrected the warning for js-controller 3.x

### 0.4.3 (2021-04-19)
* (bluefox) Added the support for Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to the previous state
* (bluefox) Support for multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector

### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2026 ioBroker <dogafox@gmail.com>

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