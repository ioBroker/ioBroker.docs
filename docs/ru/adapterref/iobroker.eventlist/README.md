---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: if8JP8cQ+85HAv1tSDadJePE9guYw/SREWFxAsnKjE8=
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

Список можно отображать в административной панели, на веб-сайте, в визуализации, сохранять в формате PDF, использовать в материалах (пока не реализовано).

Кроме того, вы можете отправлять информацию о мероприятиях через Telegram или WhatsApp.

![Список](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Настройки состояния

Состояние обычно добавляется в список в настройках экземпляра, где доступен весь набор параметров: текст, цвета, значки, мессенджеры и постоянные сообщения.

Наиболее важные из них находятся также в пользовательских настройках самого объекта, на вкладке за значком шестеренки в списке объектов: текст события «только изменяется», а для логического состояния — текст и цвет значений TRUE и FALSE. Это тот же набор, что и в старом диалоговом окне адаптера, и он записывается в то же место. `common.custom.<eventlist.X>` Таким образом, оба способа можно комбинировать.

## Режим тревоги

События могли генерироваться только в режиме тревоги. Режим тревоги можно было регулировать с помощью переменной. `eventlist.X.alarm`.

Кроме того, сообщения в мессенджеры можно было отправлять только при включенном режиме будильника.

Пример использования:

- Например, дверной датчик может отправлять сообщения только в том случае, если никого нет дома. В противном случае в список событий будут включены только события, связанные с открытием двери.

## Сообщения

Помимо списка событий, в котором регистрируются произошедшие события, адаптер хранит список _текущих_ событий: сообщение приходит, когда условие становится истинным, оно удаляется, когда условие становится ложным, и удаляется из списка только после подтверждения. Это обычное поведение диспетчерской, и одного списка событий недостаточно.

Не путайте это с описанным выше режимом тревоги. Режим тревоги — это переключатель постановки на охрану, сообщение означает неисправность.

### Уровни и классы сигнализации

Четыре уровня `fatal`, `alarm`, `warning` и `info` Они существуют всегда, и каждый из них содержит три подуровня. `high`, `normal` и `low` Эта сетка представляет собой двенадцать встроенных **классов тревожных сигналов** , обозначенных следующим образом: `fatal.high` до `info.low`.

В основе этого лежат цифры из стандарта OPC UA (часть 9, «Сигналы тревоги и условия»): уровень серьезности от 1 до 1000, а также правило спецификации, согласно которому уровень тревоги превышает 400. Таким образом, диапазоны следующие:

| уровень   | тяжесть    | подтверждено по умолчанию                | стенды                                       |
| --------- | ---------- | ---------------------------------------- | -------------------------------------------- |
| `fatal`   | 801 – 1000 | Его нельзя выключить, он всегда включен. | да                                           |
| `alarm`   | 601 – 800  | да                                       | да                                           |
| `warning` | 401 – 600  | нет                                      | да                                           |
| `info`    | 1 – 400    | нет                                      | Нет, это всего лишь запись в списке событий. |

Каждый уровень разделен на три подуровня, разделенных на три части. `alarm high` Например, это 731–800.

В административной панели вкладка «Классы **оповещений»** отображает всю сетку в виде дерева и позволяет растению добавлять под ней свои собственные классы: имя, цвет, значок, уровень серьезности в пределах полосы его подуровня, необходимость подтверждения и наличие или отсутствие оповещения. Классы экземпляра хранятся в `native.alarmClasses`; записывается только то, что отличается от встроенного класса, поэтому в неизмененной установке список остается пустым.

```json
{
    "id": "boiler_pressure",
    "name": "Boiler pressure",
    "level": "alarm",
    "subLevel": "high",
    "severity": 770,
    "standing": true,
    "requiresAck": true,
    "color": "#B3122B",
    "icon": ""
}
```

Класс, который не существует, записывает в список событий только свои входящие сообщения: ничего для подтверждения, ничего, что оставалось бы в списке сообщений. Вот что делает `info` Классы делают это по умолчанию, и это та же линия, которую проводит спецификация OPC UA на уровне серьезности 400.

### Четыре состояния сообщения

| код | активный | признан | в списке |
| --- | -------- | ------- | -------- |
| К   | да       | нет     | да       |
| КК  | да       | да      | да       |
| КГ  | нет      | нет     | да       |
| KGQ | нет      | да      | нет      |

Сообщение, которое было отправлено и получено повторно до подтверждения, не создает вторую запись, а вместо этого учитывается его повторение. Таким образом, неактивный контакт не может переполнить список.

### Сообщения из штата

Настройки сообщений располагаются рядом с другими настройками состояния. `common.custom.<eventlist.X>.message`:

```json
{
    "alarmClass": "alarm.normal",
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

`alarmClass` — это идентификатор одного из указанных выше классов. `condition` либо сравнение с `operator` и `limit` для чисел или `value` Это поднимает вопрос о логических значениях и текстовых данных. В тексте используются шаблоны. `%s`, `%u`, `%n`, `%l` и `%c` может использоваться последний вариант в качестве названия класса.

### Несколько границ одного штата

Число редко имеет один предел. Вместо этого `alarmClass` и `condition` В одном штате может быть целая лестница таких штатов, и в настройках штата в административной панели это отображается в виде небольшой таблицы:

```json
{
    "text": "%n: %s%u",
    "limits": [
        { "alarmClass": "warning.normal", "operator": ">", "limit": 200 },
        {
            "alarmClass": "fatal.normal",
            "operator": ">",
            "limit": 300,
            "hysteresis": 20,
            "text": "%n dangerously high: %s%u",
            "requiresAck": true,
            "priority": 90
        },
        { "alarmClass": "warning.normal", "operator": "<", "limit": 50 }
    ]
}
```

Государство выдает **одно** сообщение, а не по одному на каждый предел, и его класс определяется значением: побеждает тот предел, достижение которого сопряжено с наибольшей степенью опасности. Таким образом, давление 250 служит предупреждением и становится смертельным при 320, без второго пункта в списке.

Каждое ограничение может повлечь за собой свои собственные. `text`, `requiresAck` и `priority`; без них учитываются государственные нормы, а без них – то, что говорит класс, – поэтому предупреждение о лестнице проходит мимо, и ее роковая опасность должна быть подтверждена, ничего не устанавливая.

Изменение уровня — это новое событие: оно записывается в список событий, считается повторением и должно быть подтверждено снова — подтверждение предупреждения не должно распространяться на следующее за ним фатальное событие. Обратно обязанность также следует за новым уровнем, поэтому сообщение, возвращающее к предупреждению, перестает запрашивать его. Гистерезис предела сохраняет свою чувствительность: с `> 300` При гистерезисе 20 сообщение остается критическим, пока значение не опустится ниже 280.

Для состояний с перечислением каждое отдельное значение может содержать `alarmClass` Вместо этого. Тогда каждое значение представляет собой отдельное сообщение, и сохраняется только значение текущего значения. Текст, группа и задержки являются общими для всех них.

### Тишина в списке

Для удобства чтения списка доступны четыре параметра, все они необязательны:

| параметр         |                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delay`          | Условие должно выполняться в течение указанного количества миллисекунд до получения сообщения.                                                                                                      |
| `delayGone`      | То же самое относится и к движению. Неисправность, которая останавливает движение на мгновение, не устраняется.                                                                                     |
| `hysteresis`     | Только для чисел: сообщение, которое остается в силе, исчезает только тогда, когда значение снова превышает этот предел на столько-то. Против значения, которое колеблется на грани своего предела. |
| хлопающая защита | Эта настройка применяется ко всему экземпляру, по умолчанию — более десяти переходов за пять минут.                                                                                                 |

Сообщение о том, что лопасти остаются в списке, помечается символом `flapping` и не вносит никаких дальнейших записей в список событий, пока не успокоится. Записываются только начало и конец беспокойства, поэтому неявный контакт стоит две строки, а не двести.

Состояние, за которым следят только ради сообщений, вообще не нуждается в сохранении своей истории в списке событий. Настройка `Only the message in the event list` (`messagesOnly`) записывает только время поступления и выбытия сообщения, поэтому температура, считываемая каждые десять секунд, выдает одну строку при превышении лимита и одну при возвращении, вместо одной строки за каждое считывание.

### Группы

`group` Это свободное имя. Сообщения одной группы отмечаются вместе, а первое сообщение помечается значком. `first` В списке обычно фигурирует вина, а остальное — её следствие.

```js
// acknowledge the whole group
setState('eventlist.0.messages.ack', 'boiler');
```

### Сообщения из скрипта

Не каждая ошибка зависит от одного сигнала. Скрипт может самостоятельно генерировать и удалять сообщение, выбирая тот сигнал, который ему больше нравится. `id` сохраняет свою целостность на протяжении всего жизненного цикла:

```js
sendTo('eventlist.0', 'message', {
    id:         'heating.flow',
    alarmClass: 'alarm.normal',
    text:       'Flow too cold although the pump runs',
});

// the same message goes again
sendTo('eventlist.0', 'message', { id: 'heating.flow', state: 'gone' });
```

Вместо `alarmClass` В сценарии может быть указано имя `level` или принести `severity` от 1 до 1000, как это бывает в чужеродных системах. Степень серьезности находится в диапазоне своего уровня: от 801. `fatal` с 601 `alarm`, от 401 `warning`, всё ниже `info`.

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

### Журнал тревог

Список сообщений показывает текущее состояние дел, список событий — то, что произошло в определенный момент. Журнал — это третий вид отображения: одна запись на каждый **цикл оповещения** , от момента его появления до закрытия.

Цикл начинается, когда срабатывает сигнал тревоги, и от него ничего не осталось. Он накапливает все, что с ним происходит — повторения, повышение уровня опасности до более серьезного, подтверждение, уход — и замыкается, когда сигнал тревоги стихает **и** кто-то его подтверждает. Сигнал тревоги, который срабатывает после этого, запускает **новый** цикл: два события — это два события на предприятии, а не одно.

```json
{
    "id": "my.0.boiler#1780736137474",
    "messageId": "my.0.boiler",
    "stateId": "my.0.boiler",
    "alarmName": "Boiler pressure",
    "level": "fatal",
    "severity": 900,
    "text": "Boiler pressure too high",
    "state": "CLOSED",
    "activatedAt": 1780736137474,
    "acknowledgedAt": 1780736142000,
    "ackUser": "admin",
    "clearedAt": 1780736401000,
    "closedAt": 1780736401000,
    "count": 3
}
```

государство `messages.journal` хранит циклы, начиная с самых старых; количество сохраняемых циклов задается в настройках экземпляра. `Alarm cycles in the journal` (0 отключает журнал). Незавершенный цикл никогда не отбрасывается, независимо от того, насколько заполнен журнал.

Скрипт может запросить его часть:

```js
sendTo('eventlist.0', 'journal', { level: 'fatal', openOnly: false, limit: 50 }, result =>
    console.log(result),
);
```

`from`, `to`, `level`, `stateId`, `openOnly` и `limit` Все фильтры отфильтрованы, и ответ отсортирован по дате добавления (сначала самые новые).

#### Ежемесячный архив

Государство хранит только последние циклы. Чтобы история на этом не заканчивалась, замкнутый цикл также записывается в файл с данными за соответствующий месяц. `journal/2026-09.jsonl` В файловой памяти адаптера — один цикл на строку. Коммутатор `Archive the journal monthly` В настройках экземпляра эта функция включена, и она включена по умолчанию.

Запись файлов происходит через несколько секунд после завершения цикла и еще раз при остановке адаптера, поэтому перезапуск ничего не теряет. Если файл записывается повторно — например, после перезапуска — каждый цикл сохраняется только один раз: файл считывается, объединяется и записывается обратно.

К ним обращается запрос с `archive`:

```js
sendTo('eventlist.0', 'journal', { archive: true, from: Date.now() - 90 * 86400000 }, result =>
    console.log(`${result.length} alarm cycles in the last three months`),
);
```

Без `from` Каждый месяц, который там есть, читается, с `from` и `to` Только месяцы, охватывающие весь ареал. То, что еще открыто, находится в пределах одного штата, поэтому оба периода всегда объединяются, и цикл не повторяется.

#### Экспорт в формате CSV

Тот же самый запрос отвечает так же, как и таблица, открываемая в электронной таблице:

```js
sendTo('eventlist.0', 'journalCsv', { archive: true, level: 'fatal' }, result =>
    console.log(result.csv),
);
```

Ответ `{ csv, fileName, count }` В столбцах указаны моменты времени цикла: пришло, подтверждено, ушло, закрыто, а также уровень, класс, состояние, сообщение, значение, единица измерения, пользователь, количество, источник и группа, разделенные точками с запятой и на языке установки. `ids` Экспортирует именно циклы этого списка, что и передают кнопки в графическом интерфейсе: они экспортируют то, что отображается в таблице, с ее фильтром и поиском.

На вкладке «Журнал» есть переключатель **«С архивными месяцами»** и кнопка для сохранения CSV-файла.

### Таблица в админке

В настройках экземпляра есть вкладка **«Сообщения»** , содержащая все данные: уровень, общее состояние. `K` /`KQ` /`KG` Задается информация о том, как долго сообщение находилось в сети, его текст, значение, частота появления, группа и идентификатор состояния. Первое сообщение группы и сообщение, находящееся в состоянии "внезапного появления", помечаются, то, что в данный момент подавлено, указывается над таблицей, и оттуда можно подтвердить получение отдельных сообщений или всех сразу. Порядок соответствует порядку в диспетчерской: уровень, затем приоритет, затем время.

### Рог

`messages.horn` Это верно, пока сохраняется неподтвержденное сообщение настраиваемого уровня или более серьезного уровня, по умолчанию. `error` Включено. Оно предназначено для сирены, лампы или цвета плитки и замолкает при подтверждении, а не при ремонте. Сообщения, на которые никто не обязан отвечать, никогда не звучат.

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

Список мероприятий можно отобразить в разделе `http://<IP>:8082/eventlist/index.html` (для экземпляров > 0: `http://<IP>:8082/eventlist/index.html?X` где X — номер экземпляра)

### Виджет Vis

Два виджета для vis-2:

- В **разделе «События»** отображается список событий с указанием столбцов, текста и ширины виджета vis-1.
- В **разделе «Тревоги и события»** отображаются текущие тревоги и список событий, расположенные один над другим. Его атрибуты `Show` решает, будут ли отображаться только сигналы тревоги или только события. `Height of the alarms in %` как разделено пространство. Сигналы тревоги можно фильтровать по уровню, события по идентификатору состояния, а также с помощью `Acknowledge with a click` Нажатие на кнопку будильника подтверждает его срабатывание. Группа `Journal` размещает циклы оповещений под ними; `With the archived months` позволяет им обратиться к ежемесячным файлам и `Allow the CSV export` Отображается кнопка, позволяющая сохранить отображаемый контент.

### Диспетчер устройств

Два виджета для диспетчера устройств:

- **Последнее событие** : плитка с самым новым событием. Щелчок по ней открывает весь список в диалоговом окне. Плитка может содержать только события одного состояния, поэтому каждое устройство может иметь свою собственную плитку.
- **Сигналы тревоги** : плитка с самым неблагоприятным сигналом тревоги — его класс, текст и значение, цвет уровня, а также количество других сигналов тревоги. Щелчок открывает большое окно с сигналами тревоги и событиями; настройки определяют, что там отображается и подтверждается ли щелчок. `Show` =`Journal` В диалоговом окне отображаются циклы будильника, при необходимости выполняется доступ к архивированным месяцам, и отображаемые данные экспортируются в CSV-файл.

### генерация PDF

Существует возможность сгенерировать PDF-документ со всеми событиями.

В заголовке документа можно указать дату создания, если в него поместить соответствующий шаблон: `Event list on {{YYYY MM DD}}` Точное описание формата времени можно найти здесь: <https://momentjs.com/docs/#/displaying/format/>

Создание PDF-файла может быть запущено путем написания запроса. `true` в `eventlist.0.triggerPDF`.

Доступ к PDF-файлу можно получить по следующему адресу:

- веб: `http://<IP>:8082/eventlist/eventlist/report.pdf` (для экземпляров > 0: `http://<IP>:8082/eventlist/eventlist/report-X.pdf` где X — номер экземпляра)
- администратор: `http://<IP>:8081/files/eventlist/report.pdf` (для экземпляров > 0: `http://<IP>:8081/files/eventlist/report-X.pdf` где X — номер экземпляра)

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

Пользователь может запросить отформатированный JSON-список для определенного ID. Разумеется, для этого ID необходимо включить соответствующую функцию. `eventlist` до.

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

- %s - значение (`State changed to %s` =>`State changed to 5`),
- %u - единица (`State changed to %s%u` =>`State changed to 5%`),
- %n - имя (`%n changed state to %s` =>`Device A changed state to 5`),
- %t - время (`State changed state on %t` =>`State changed state on Sep Fr, 16:32:00`),
- %r - относительное время (`State changed state %r` =>`State changed state 5 seconds ago`),
- %d - длительность (`State was in previous state for %d` =>`State was in previous state for 5s`),
- %g - разница значений, то есть новое значение минус предыдущее. Только для состояний типа `number` (`State was changed on %g%` =>`State was changed on 1%`),
- %o - предыдущее значение (`State changed value from %o to %s` =>`State changed value from 4 to 5`)

## Использование нескольких экземпляров в веб-среде

Например, вы можете отобразить конкретный список для примера 2, например: `http://IP:8082/eventlist/index.html?2`.

Сгенерированный отчет будет сохранен для экземпляра 0 в `eventlist/report.pdf` но, например, 1 в `eventlist/report-1.pdf`.

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
* (@GermanBluefox) Added several limits per state: `> 200` a warning, `> 300` a fatal. One message whose level follows the value, every limit with its own text, acknowledgement duty and priority
* (@GermanBluefox) The messages can be set in the custom tab of the objects as well, not only in the instance settings
* (@GermanBluefox) Added `Only the message in the event list`: a state that is watched for its message writes only the coming and the going of it, not every value it takes
* (@GermanBluefox) Durations are written with a space and with proper unit words in all languages (`15 Sek.` instead of `15Sekunde`)
* (@GermanBluefox) Fixed: a message that does not have to be acknowledged is no longer shown as `not acknowledged`, it says `came` or `gone`
* (@GermanBluefox) The values in the GUI follow the setting `Comma as decimal separator` of ioBroker
* (@GermanBluefox) Added the alarm classes: four levels with three sub-levels each, the severity of OPC UA (1 to 1000), and own classes with name, colour, icon, acknowledgement duty and severity. The selection of a class is a tree
* (@GermanBluefox) The level `error` is called `alarm` now, as OPC UA and PCS 7 call it
* (@GermanBluefox) A class below the alarm line of OPC UA (severity 400) does not stand: it writes only its coming into the event list. That is what the `info` classes do
* (@GermanBluefox) The ID of an own alarm class can be changed, and every state that uses it is changed with it. Two classes cannot carry the same name any more
* (@GermanBluefox) The event list shows the coming, the going and the acknowledgement as `K`, `G` and `Q` in a column of their own, and the name of the state with its ID below it
* (@GermanBluefox) The alarm view follows the SCADA concept: unacknowledged alarms sort before acknowledged ones of the same severity, the table shows the acknowledgement time, the going time and the priority, and a counter strip says how many are unacknowledged, active and how many events there are
* (@GermanBluefox) Added the states `messages.active` (alarms whose condition is true right now) and `eventCount`
* (@GermanBluefox) Fixed: the times in the admin were written in English (`Sep 7th`) although the admin speaks another language - the locale of moment was registered on a copy of it that nobody used
* (@GermanBluefox) The alarm journal and the table of the standing messages show the name of the state with its ID under it, the way the event list does
* (@GermanBluefox) A relative time like `a few seconds ago` says the exact time in its tooltip - in the event list, in both vis-2 widgets and in the widgets of the device manager
* (@GermanBluefox) The tab view divides its height between the three sections and carries a line to drag between every two of them, so the alarm journal gets its own space
* (@GermanBluefox) The journal is archived in one file per month (`journal/2026-09.jsonl`), so the history does not end at the length of the state. `sendTo('eventlist.0', 'journal', { archive: true, from, to })` reads them, `journalCsv` answers with a CSV table, and the journal tab, the vis-2 widget and the device manager widget can show the archived months and save what they show
* (@GermanBluefox) Added the alarm journal: one entry per alarm cycle with the times of its coming, its acknowledgement, its going and its closing, in the state `messages.journal`, as a tab and as a section of the tab view, in the vis-2 widget and in the device manager widget. A new occurrence starts a new cycle, and `sendTo('eventlist.0', 'journal', { level, stateId, from, to, openOnly, limit })` asks for it
* (@GermanBluefox) Fixed: a line of the event list lost its state and its `K`/`G` until the adapter wrote the list again, depending on which of the two states arrived first
* (@GermanBluefox) The tab shows the event list and the standing messages one above the other, both can be folded away and the line between them can be dragged
* (@GermanBluefox) The table of the messages shows the value the state has now next to the value that raised the message, if they are not the same
* (@GermanBluefox) Added the vis-2 widget `Alarms and events`: the standing alarms and the event list in one widget, and the attributes decide what is shown and how much of each
* (@GermanBluefox) Added the device manager widget `Alarms`: the tile shows the worst standing alarm, the click opens the alarms and the events
* (@GermanBluefox) Fixed: a message kept standing after its limits were changed. The messages of a state are looked at again as soon as its settings change, and not only at its next value
* (@GermanBluefox) The value column of the event list and of the message table shows the unit of the state
* (@GermanBluefox) Added a closeable info box that explains how a standing message works, and tooltips for `Only changes` and `Only in alarm state`
* (@GermanBluefox) Translated the whole GUI into all eleven languages, the words of the messages included
* (@GermanBluefox) Fixed: a click into the first rows of the event list opened the dialog of a toolbar button instead of selecting the row. The text of the button had a line box of 336 pixels and hung invisibly over the table
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