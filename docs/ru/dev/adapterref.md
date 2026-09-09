---
title: Справочник по адаптерам
lastChanged: 09.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: /LFgrdnFTn7e8n33qcFGYQJRExpOQdLWjYXPTSDl9Ig=
---
# Справочник по адаптерам

Справочник по программному интерфейсу адаптера: класс из
`@iobroker/adapter-core`его свойства, его события, а также вызовы, которые он использует для чтения и записи объектов и состояний.

На этой странице предполагается, что готовая структура уже создана. Точка входа находится по адресу \[ссылка/местоположение]. [обзор](/docs/dev/adapterdev.md)файл `io-package.json`
под [io-package.json](/docs/dev/iopackage.md)структура самих объектов в рамках [основная концепция](/docs/dev/objectsschema.md).

## Объекты и состояния

Адаптер — это отдельный процесс. Он никогда не взаимодействует напрямую с базой данных, а всегда через этот интерфейс; независимо от того, находятся ли данные в базе данных. `jsonl`Расположение файлов в Redis или в других местах не имеет значения для кода.

Существует два типа данных:

- **объекты** Опишите, что представляет собой точка данных: имя, тип, единица измерения, роль, права на чтение и запись. Они редко меняются.
- **Условия** (Состояния) — это соответствующие значения, а также метка времени, флаг подтверждения и источник. Они постоянно меняются.

Каждому состоянию соответствует связанный с ним объект. Обратное неверно: объекты также описывают хосты, адаптеры, экземпляры, категории, пользователей и организацию, разделяющую устройства и каналы.

Каждый идентификатор состоит из `.` отдельные части. Объекты экземпляра всегда начинаются с `<adaptername>.<instanz>`:

```
hm-rpc.0.IEQ1234567              device
hm-rpc.0.IEQ1234567.0            channel
hm-rpc.0.IEQ1234567.0.STATE      state
```

Идентификатор состояния начинается с идентификатора его канала, а идентификатор канала начинается с идентификатора устройства. Если адаптер имеет простую конструкцию, устройства и каналы можно опустить.

Для каждого экземпляра js-контроллер определяет `alive`, `connected`, `uptime` и три состояния памяти в рамках `system.adapter.<name>.<instanz>` сам по себе. Что касается режимов работы. `none` и `once` Они опущены.

## базовая структура

Адаптер соединяет общую основу через `@iobroker/adapter-core` и возглавляет свой собственный класс `utils.Adapter` прочь:

```js
'use strict';

const utils = require('@iobroker/adapter-core');

class MeinAdapter extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'meinadapter' });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        await this.setState('info.connection', false, true);
        this.subscribeStates('*');
        // this.config.<feld> enthält die Konfiguration der Instanz
    }

    onStateChange(id, state) {
        if (!state || state.ack) {
            return; // nur Befehle interessieren
        }
        this.log.debug(`Befehl für ${id}: ${state.val}`);
    }

    onUnload(callback) {
        try {
            this.clearInterval(this.pollTimer);
            callback();
        } catch {
            callback();
        }
    }
}

if (require.main !== module) {
    module.exports = options => new MeinAdapter(options);
} else {
    new MeinAdapter();
}
```

Таким образом, все вызовы доступны как методы самого класса:
`this.setState(...)`, `this.getStateAsync(...)`, `this.log.info(...)`.

Имя в `super`Вызов должен точно соответствовать имени каталога и полю.
`common.name` в `io-package.json` эквивалентны.

Вместо этого отображаются адаптеры, выпущенные до 2019 года. `require('./lib/utils')` и
`utils.adapter('name')` с обработчиками в качестве опций. Этот путь больше не поддерживается; файл `lib/utils.js` Оно больше не должно быть в новой упаковке.

## характеристики класса адаптеров

| Характерный                 | Содержание                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `this.name`                 | Название адаптера, например: `meinadapter`                                                     |
| `this.instance`             | Номер этого экземпляра                                                                         |
| `this.namespace`            | `<name>.<instanz>`, префикс всех собственных идентификаторов                                   |
| `this.config`               | тот `native` Часть конфигурации экземпляра, то есть значения из диалогового окна конфигурации. |
| `this.common`               | тот `common` Часть конфигурации экземпляра                                                     |
| `this.host`                 | Хост, на котором запущен экземпляр                                                             |
| `this.adapterDir`           | Каталог установленного адаптера                                                                |
| `this.ioPack` / `this.pack` | Содержание `io-package.json` или `package.json`                                                |
| `this.log`                  | Лесоруб, см. ниже.                                                                             |
| `this.connected`            | Подключение к базе данных                                                                      |
| `this.constants`            | Константы js-контроллера, например: `STATE_QUALITY`                                            |

Два свойства доступны в конструкторе только по запросу:
`systemConfig: true` заполняет `this.systemConfig` с содержанием
`iobroker-data/iobroker.json`, `useFormatDate: true` заполняет `this.dateFormat`,
`this.language`, `this.isFloatComma`, `this.longitude` и `this.latitude` из
`system.config`.

?> `this.config` Содержит именно то, что подразумевается под словом "содержит". `native` в `io-package.json`
Система является полной и дополняется пользовательским вводом. Все остальное обрабатывается автоматически.
`getForeignObjectAsync` читать.

## Ведение журнала

```js
this.log.silly('sehr ausführlich');
this.log.debug('Details für die Fehlersuche');
this.log.info('normale Meldung');
this.log.warn('Warnung');
this.log.error('Fehler');
```

Начальная точка и время добавляются автоматически контроллером JavaScript. `console.log` Эта информация отображается только в том случае, если адаптер был запущен вручную в консоли.

Ниже указан необходимый уровень детализации для ведения журнала.
[Рекомендации](/docs/dev/bestpractices.md).

## события

| Событие                          | Запускается                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `ready`                          | когда конфигурация загружена. **Только здесь** может быть инициализирован            |
| `stateChange(id, state)`         | Состояние подписки изменилось. `state` является `null`если он был удален             |
| `objectChange(id, obj)`          | Изменился статус подписанного элемента. `obj` является `null`если он был удален      |
| `fileChange(id, fileName, size)` | Изменился файл, на который была оформлена подписка.                                  |
| `message(obj)`                   | Сообщение получено, см. [Новости](/docs/dev/messagebox.md)                           |
| `unload(callback)`               | Экземпляр будет завершен. Закройте таймеры, разорвите соединения, затем `callback()` |
| `install`                        | одноразовая установка (начните с `--install`)                                        |
| `log(message)`                   | Сообщения в журнале только от всех экземпляров, содержащие `logTransporter`          |

## Подписаться на штаты

События отображаются только для подписанных шаблонов:

```js
this.subscribeStates('*');                       // alles der eigenen Instanz
this.subscribeStates('memory*');                 // nur passende eigene Zustände
this.subscribeForeignStates('yr.*.forecast.*');  // Zustände anderer Instanzen
```

Также есть `subscribeObjects`, `subscribeForeignObjects`,
`subscribeForeignFiles` и каждый из `unsubscribe…`.

Подписка не предоставляет начального значения, она только изменяется. Начальное значение можно прочитать в `onReady` Когда-то и сам.

## Читать штаты

```js
const state = await this.getStateAsync('myState');
this.log.info(`${state.val}, bestätigt: ${state.ack}, Zeit: ${state.ts}`);

const fremd = await this.getForeignStateAsync('hm-rpc.0.IEQ123.1.STATE');
```

`getStatesAsync('muster*')` доставляет несколько одновременно
`getForeignStatesAsync` То же самое относится и к границам экземпляров. Заполнители существуют только для форм множественного числа.

## записывать состояния

Флаг `ack` Система различает команды и обратную связь, и это различие лежит в основе всей системы:

- `ack: false` является **команда**Это исходит от пользователя, от VIS, от скрипта и означает: сделайте это.
- `ack: true` является **Ответить на сообщение**Это сообщение поступает от устройства или сервиса и означает: вот как обстоят дела на данный момент.

```js
await this.setState('myState', { val: 21.5, ack: true });  // Rückmeldung
await this.setState('myState', 21.5, true);                // dasselbe, kurz
await this.setForeignState('hm-rpc.0.kitchen.light', true); // Befehl an andere
```

Без обратного вызова, он выполняет заказ. `setState` обещание; старая форма `setStateAsync` Мероприятие отменено. `setStateChanged` Запись производится только в том случае, если значение действительно изменилось.

Процесс на примере лампы: пишет VIS. `{val: true, ack: false}`Адаптер зарегистрирован в собственных состояниях, распознавая их по отсутствующим параметрам. `ack`
Он отправляет команду и включает устройство. Устройство отвечает, адаптер записывает `{val: true, ack: true}`Он не повторяет это второе изменение.

!> Собственный `stateChange`Обработчик также видит собственные операции записи. Без запроса на `state.ack` Это создаёт бесконечный цикл.

## Создание государства

| Поле     | Значение                                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `val`    | значение                                                                                                               |
| `ack`    | `false` = команда `true` = Обратная связь                                                                              |
| `ts`     | Временные метки в миллисекундах с 1970 года                                                                            |
| `lc`     | Отметка времени последнего _Ценит&#x44C;_&#x418;зменение. Остается неизменным, если то же значение записывается снова. |
| `from`   | Экземпляр, который выполнил запись, например. `system.adapter.web.0`                                                   |
| `q`      | Качество, смотрите `this.constants.STATE_QUALITY`                                                                      |
| `expire` | необязательный параметр, количество секунд до достижения значения `null` водопады                                      |
| `user`   | необязательный параметр: пользователь, от имени которого было выполнено написание текста.                              |

`expire` Сам контроллер JavaScript использует это для `alive`Если экземпляр не отвечает в течение 30 секунд, он считается остановленным.

## Чтение и письмо предметов

```js
const obj = await this.getObjectAsync('myState');
const fremd = await this.getForeignObjectAsync('system.adapter.web.0');

await this.setObjectNotExistsAsync('temperatur', {
    type: 'state',
    common: {
        name: 'Temperatur',
        type: 'number',
        role: 'value.temperature',
        unit: '°C',
        read: true,
        write: false
    },
    native: {}
});

await this.extendObject('temperatur', { common: { unit: 'K' } });
await this.delObject('temperatur');
```

- `setObject` Производится полная запись, при этом перезаписывается уже имевшаяся запись.
- `setObjectNotExists` Новая папка создается только в том случае, если в ней еще ничего нет. Это нормальная ситуация при запуске, поскольку изменения, внесенные пользователем, сохраняются.
- `extendObject` Она считывает, компилирует и записывает данные обратно. Это способ внесения последующих исправлений.
- Все формы без `Foreign` добавить к самому идентификатору `this.namespace`.

Для целых деревьев есть `getAdapterObjectsAsync`, `getForeignObjectsAsync`,
`getDevicesAsync`, `getChannelsOfAsync` и `getStatesOfAsync`.

!> `createDevice`, `createChannel`, `createState` и связанные с
`delete…`Призывы к действию прекращены. Вместо них будут выпущены... `extendObject` и
`delObject` с полным идентификатором.

Поля, которыми должен обладать объект, и доступные роли описаны ниже.
[основная концепция](/docs/dev/objectsschema.md) и
[Государственные роли](/docs/dev/stateroles.md).

## Виды объектов

Для повторяющихся запросов адаптер может создать отдельное представление.
`io-package.json` внести депозит и использовать их `getObjectView` запрос:

```js
const doc = await this.getObjectViewAsync('hm-rpc', 'listDevices', {
    startkey: `hm-rpc.${this.instance}.`,
    endkey: `hm-rpc.${this.instance}.\u9999`
});
doc.rows.forEach(row => this.log.info(`${row.id}`));
```

Дополнительные параметры редко требуются. Для большинства адаптеров этого достаточно.
`getForeignObjectsAsync` с узором.

## info.connection

Адаптер, поддерживающий соединение с устройством или службой, определяет состояние. `info.connection` и поддерживает его. Затем администратор отображает на плитке экземпляра информацию о том, установлено ли соединение.

```js
await this.setState('info.connection', true, true);
```

Состояние проще всего описать следующим образом: `instanceObjects` тот `io-package.json`
Если он создан, то он создается автоматически при каждом новом экземпляре.

## Таймер и выход

Всегда создавайте таймеры через класс-адаптер. В этом случае они будут очищены по завершении таймера и не будут отображаться как открытые дескрипторы.

```js
this.pollTimer = this.setInterval(() => this.poll(), 60_000);
this.retry = this.setTimeout(() => this.connect(), 5_000);
await this.delay(500);
```

Это включает в себя `clearInterval` и `clearTimeout` одного класса. В
`unload`-Работника убирают, а затем `callback()` Вызывается. Без этого js-контроллер внезапно завершает работу экземпляра после периода ожидания.

`this.terminate('Grund')` Рассмотрение дела завершилось в установленном порядке. `this.restart()`
Она перезапускает процесс.

## Больше просмотров

**Новости**: `sendTo`, `sendToHost`, `sendToUI`; видеть
[Новости](/docs/dev/messagebox.md).

**Уведомления**: `registerNotification`; видеть
[Уведомления](/docs/dev/notifications.md).

**файлы**: `readFileAsync`, `writeFileAsync`, `readDirAsync`, `mkdirAsync`,
`unlinkAsync`, `renameAsync`, `fileExistsAsync`, `chmodFileAsync`,
`chownFileAsync`; видеть [Хранилище файлов](/docs/dev/filestorage.md).

**Конфигурация и секреты**: `updateConfig`, `getEncryptedConfig`,
`encrypt`, `decrypt`, `getCertificatesAsync`, `getSuitableLicenses`; видеть
[Безопасность](/docs/dev/adaptersecurity.md).

**Пользователи и права**: `checkPasswordAsync`, `setPasswordAsync`,
`checkGroupAsync`, `calculatePermissionsAsync`, `getUserID`.

**Курс**: `getHistoryAsync` Считывает значения из настроенного адаптера истории (History, SQL, InfluxDB).

**Категории**: `getEnumAsync`, `getEnumsAsync`, `addStateToEnumAsync`,
`deleteStateFromEnumAsync`.

**система**: `getPortAsync` ищу свободный порт `supportsFeature` запрашивает возможности запущенного js-контроллера, `getPluginInstance` и
`getPluginConfig` Плагины, такие как Sentry, обеспечивают доступ к необходимым ресурсам. `formatDate` и `formatValue`
Отформатируйте в соответствии с системными настройками.

Практически для каждого звонка с обратным звонком используется форма с добавлением следующего текста: `Async`, который возвращает промис. Для вызовов записи в объекты и состояния все наоборот: там базовая форма без колбэка уже возвращает промис, и `Async`-Форма прекращена.

## Стартовые флаги

Контроллер JavaScript запускает адаптер как отдельный процесс и передает ему номер экземпляра и уровень протокола. Он обрабатывает эти данные. `adapter-core`Три дополнительных флага полезны при ручной установке:

- `--install`: запускает адаптер даже без предварительной настройки для процесса установки.
- `--force`Это также происходит при деактивации экземпляра.
- `--logs`Кроме того, эта функция выводит сообщения журнала в консоль.

## Дополнительная информация

- [обзор](/docs/dev/adapterdev.md): путь от пустой папки к адаптеру
- [io-package.json](/docs/dev/iopackage.md)Режим работы, зависимости, значения конфигурации, `instanceObjects`
- [основная концепция](/docs/dev/objectsschema.md): полная схема объектов
- [Конфигурация JSON](/docs/dev/adapterjsonconfig.md)Диалог настроек
- [dev-сервер](/docs/dev/devserver.md) и
  [Отладка](/docs/dev/adapterdebug.md)Попробуйте и поищите ошибки.
- [Рекомендации](/docs/dev/bestpractices.md)Что делает адаптер хорошим?
- [Публиковать](/docs/dev/adapterpublish.md): путь к репозиторию