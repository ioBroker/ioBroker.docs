---
title: Справочник по адаптерам
lastChanged: 09.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: /LFgrdnFTn7e8n33qcFGYQJRExpOQdLWjYXPTSDl9Ig=
---
# Справочник по адаптерам
Справочник по программному интерфейсу адаптера: класс из `@iobroker/adapter-core`, его свойства, события и вызовы, с помощью которых он читает и записывает объекты и состояния.

На этой странице предполагается, что фреймворк уже существует. Точка входа находится в разделе [обзор](/docs/dev/adapterdev.md), файл `io-package.json` - в разделе [io-package.json](/docs/dev/iopackage.md), а структура самих объектов - в разделе [основная концепция](/docs/dev/objectsschema.md).

## Объекты и состояния
Адаптер - это отдельный процесс. Он никогда не взаимодействует напрямую с базой данных, а всегда через этот интерфейс; местоположение данных - в файлах `jsonl` или в Redis - не имеет значения для кода.

Существует два типа данных:

* **Объекты** описывают, что представляет собой точка данных: имя, тип, единица измерения, роль,

Права доступа на чтение и запись. Они редко меняются.

* **Состояния** - это соответствующие значения вместе с временными метками.

Флаг подтверждения и происхождение. Они постоянно меняются.

Каждому состоянию соответствует связанный с ним объект. Обратное неверно: объекты также описывают хосты, адаптеры, экземпляры, категории, пользователей и организацию, разделяющую устройства и каналы.

Каждый идентификатор состоит из частей, разделённых символами `.`. Объекты экземпляра всегда начинаются с `<adaptername>.<instanz>`:

```
hm-rpc.0.IEQ1234567              device
hm-rpc.0.IEQ1234567.0            channel
hm-rpc.0.IEQ1234567.0.STATE      state
```

Идентификатор состояния начинается с идентификатора его канала, а идентификатор канала начинается с идентификатора устройства. Если адаптер имеет простую конструкцию, устройства и каналы можно опустить.

Для каждого экземпляра контроллер JavaScript создает следующие объекты: `alive`, `connected`, `uptime` и три состояния памяти в `system.adapter.<name>.<instanz>`.

Они опускаются в режимах работы `none` и `once`.

## Базовая структура
Адаптер включает в себя общую основу через `@iobroker/adapter-core` и наследует свой собственный класс от `utils.Adapter`:

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

Таким образом, все вызовы доступны как методы самого класса: `this.setState(...)`, `this.getStateAsync(...)`, `this.log.info(...)`.

Имя в вызове `super` должно точно совпадать с именем каталога и полем `common.name` в `io-package.json`.

В адаптерах, выпущенных до 2019 года, вместо этого используются `require('./lib/utils')` и `utils.adapter('name')`, а обработчики выступают в качестве опций. Этот подход больше не поддерживается; файл `lib/utils.js` больше не следует включать в новый пакет.

## Свойства класса адаптера
| Собственность | Содержание |
|---|---|
| `this.name` | Название адаптера, например, B. `meinadapter` |
| `this.namespace` | `<name>.<instanz>`, префикс всех пользовательских идентификаторов |
| `this.config` | часть `native` конфигурации экземпляра, т.е. значения из диалогового окна конфигурации |
| `this.common` | часть `common` конфигурации экземпляра |
| `this.host` | Хост, на котором запущен экземпляр |
| `this.adapterDir` | Каталог установленного адаптера |
| `this.ioPack` / `this.pack` | Содержание `io-package.json` или `package.json` |
| `this.log` | Логгер, см. ниже |
| `this.connected` | Подключение к базе данных |
| `this.constants` | Константы js-контроллера, например, `STATE_QUALITY` |
| `this.constants` | Константы контроллера JavaScript, например, `STATE_QUALITY` |

Два свойства доступны в конструкторе только по запросу: `systemConfig: true` заполняет `this.systemConfig` содержимым `iobroker-data/iobroker.json`, `useFormatDate: true` заполняет `this.dateFormat`, `this.language`, `this.isFloatComma`, `this.longitude` и `this.latitude` из `system.config`.

`this.config` содержит в точности то, что находится в `native` в `io-package.json`, дополненное пользовательским вводом. Все остальное считывается с помощью `getForeignObjectAsync`.

## Ведение журнала
```js
this.log.silly('sehr ausführlich');
this.log.debug('Details für die Fehlersuche');
this.log.info('normale Meldung');
this.log.warn('Warnung');
this.log.error('Fehler');
```

Начало координат и время добавляются автоматически контроллером js. `console.log` отображается только в том случае, если адаптер был запущен вручную в консоли.

Требуемый уровень детализации для ведения журнала указан в [Рекомендации](/docs/dev/bestpractices.md).

## События
| Событие | Запущено |
|---|---|
| `ready` | при загрузке конфигурации. **Только здесь** может быть выполнена инициализация. |
| `objectChange(id, obj)` | Подписанный объект изменился. `obj` становится `null` после удаления. |
| `fileChange(id, fileName, size)` | Подписанный файл изменился |
| `message(obj)` | Получено сообщение, см. [Новости](/docs/dev/messagebox.md) |
| `unload(callback)` | Экземпляр завершается. Таймер закрывается, соединения разрываются, затем `callback()` |
| `install` | только один раз во время установки (начинается с `--install`) |
| `log(message)` | Сообщения журнала от всех экземпляров, только с `logTransporter` |
| `log(message)` | Записывать сообщения из всех экземпляров только с помощью `logTransporter` |

## Подписка на штаты
События отображаются только для подписанных шаблонов:

```js
this.subscribeStates('*');                       // alles der eigenen Instanz
this.subscribeStates('memory*');                 // nur passende eigene Zustände
this.subscribeForeignStates('yr.*.forecast.*');  // Zustände anderer Instanzen
```

Также имеются `subscribeObjects`, `subscribeForeignObjects`, `subscribeForeignFiles` и по одному `unsubscribe…`.

Подписка не предоставляет начального значения, она только изменяется. Начальное значение можно найти в `onReady`.

## Штаты чтения
```js
const state = await this.getStateAsync('myState');
this.log.info(`${state.val}, bestätigt: ${state.ack}, Zeit: ${state.ts}`);

const fremd = await this.getForeignStateAsync('hm-rpc.0.IEQ123.1.STATE');
```

`getStatesAsync('muster*')` возвращает несколько записей одновременно, `getForeignStatesAsync` возвращает одну и ту же запись при переходе между экземплярами. Заполнители отображаются только во множественном числе.

## Запись состояний
Флаг `ack` различает команды и обратную связь, и это различие лежит в основе всей системы:

* `ack: false` - это **команда**. Она поступает от пользователя, от VIS, от

Сценарий, и это означает: сделайте это.

* `ack: true` - это **ответ**. Он поступает от устройства или сервиса и

Смысл: вот как обстоят дела сейчас.

```js
await this.setState('myState', { val: 21.5, ack: true });  // Rückmeldung
await this.setState('myState', 21.5, true);                // dasselbe, kurz
await this.setForeignState('hm-rpc.0.kitchen.light', true); // Befehl an andere
```

Без функции обратного вызова `setState` возвращает промис; старая форма `setStateAsync` устарела. `setStateChanged` записывает данные только в том случае, если значение действительно изменилось.

Процесс, на примере лампы: VIS записывает `{val: true, ack: false}`.

Адаптер подписался на свои собственные состояния, распознает команду в отсутствующем `ack` и переключает устройство. Устройство отправляет ответ, и адаптер записывает `{val: true, ack: true}`. Он больше не выполняет это второе изменение.

Собственный обработчик `stateChange` пользователя также видит свои собственные операции записи. Без проверки `state.ack` возникнет бесконечный цикл.

## Создание государства
| Поле | Значение |
|---|---|
| `val` | значение |
| `ts` | Временная метка в миллисекундах с 1970 года |
| `lc` | Временная метка последнего изменения *значения*. Сохраняется, если то же значение будет записано снова. |
| `from` | Экземпляр, который выполнил запись, например, `system.adapter.web.0` |
| `q` | Качество, см. `this.constants.STATE_QUALITY` |
| `expire` | необязательно, секунд до тех пор, пока значение не снизится до `null` |
| `user` | необязательно, пользователь, от имени которого было выполнено написание |
| `user` | необязательно, пользователь, от имени которого было написано сообщение |

Сам js-контроллер использует `expire` вместо `alive`: если экземпляр не отвечает в течение 30 секунд, он считается остановленным.

## Чтение и запись объектов
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

* Функция `setObject` выполняет полную запись и перезаписывает ранее существовавшие данные.
* Функция `setObjectNotExists` создает объект только в том случае, если ничего подобного еще не существует.

Это нормальная ситуация при запуске, поскольку внесенные пользователем изменения сохраняются.

* Функция `extendObject` считывает, объединяет и записывает данные обратно. Путь для

Последующие исправления.

* Все формы без `Foreign` добавляют `this.namespace` к самому идентификатору.

Для целых деревьев существуют `getAdapterObjectsAsync`, `getForeignObjectsAsync`, `getDevicesAsync`, `getChannelsOfAsync` и `getStatesOfAsync`.

!> Вызовы `createDevice`, `createChannel`, `createState` и связанные с ними вызовы `delete…` прекращаются. Они заменяются вызовами `extendObject` и `delObject` с полным идентификатором.

Поля, которыми должен обладать объект, и существующие роли перечислены в разделах [основная концепция](/docs/dev/objectsschema.md) и [Государственные роли](/docs/dev/stateroles.md).

## Виды объектов
Для повторяющихся запросов адаптер может хранить собственное представление в `io-package.json` и запрашивать его с помощью `getObjectView`:

```js
const doc = await this.getObjectViewAsync('hm-rpc', 'listDevices', {
    startkey: `hm-rpc.${this.instance}.`,
    endkey: `hm-rpc.${this.instance}.\u9999`
});
doc.rows.forEach(row => this.log.info(`${row.id}`));
```

Представления требуются редко. Для большинства адаптеров достаточно `getForeignObjectsAsync` с шаблоном.

## Info.connection
Адаптер, поддерживающий соединение с устройством или службой, создает и поддерживает состояние `info.connection`. Затем администратор отображает на плитке экземпляра информацию о том, активно ли соединение.

```js
await this.setState('info.connection', true, true);
```

Проще всего создать состояние в `instanceObjects` `io-package.json`, тогда оно будет создаваться автоматически с каждым новым экземпляром.

## Таймер и выход
Всегда создавайте таймеры через класс-адаптер. В этом случае они будут очищены по завершении таймера и не будут отображаться как открытые дескрипторы.

```js
this.pollTimer = this.setInterval(() => this.poll(), 60_000);
this.retry = this.setTimeout(() => this.connect(), 5_000);
await this.delay(500);
```

Это включает в себя `clearInterval` и `clearTimeout` одного и того же класса. Обработчик `unload` выполняет очистку, а затем вызывает `callback()`. Без этого контроллер JavaScript внезапно завершает работу экземпляра после периода ожидания.

`this.terminate('Grund')` завершает работу экземпляра в упорядоченном режиме, `this.restart()` перезапускает его.

## Больше просмотров
**Сообщения**: `sendTo`, `sendToHost`, `sendToUI`; см. [Новости](/docs/dev/messagebox.md).

**Уведомления**: `registerNotification`; см. [Уведомления](/docs/dev/notifications.md).

**Файлы**: `readFileAsync`, `writeFileAsync`, `readDirAsync`, `mkdirAsync`, `unlinkAsync`, `renameAsync`, `fileExistsAsync`, `chmodFileAsync`, `chownFileAsync`; см. [Хранилище файлов](/docs/dev/filestorage.md).

**Конфигурация и секреты**: `updateConfig`, `getEncryptedConfig`, `encrypt`, `decrypt`, `getCertificatesAsync`, `getSuitableLicenses`; см. [Безопасность](/docs/dev/adaptersecurity.md).

**Пользователи и права**: `checkPasswordAsync`, `setPasswordAsync`, `checkGroupAsync`, `calculatePermissionsAsync`, `getUserID`.

**История**: `getHistoryAsync` считывает значения из настроенного адаптера истории (History, SQL, InfluxDB).

**Категории**: `getEnumAsync`, `getEnumsAsync`, `addStateToEnumAsync`, `deleteStateFromEnumAsync`.

**Система**: `getPortAsync` ищет свободный порт, `supportsFeature` запрашивает возможности запущенного js-контроллера, `getPluginInstance` и `getPluginConfig` обращаются к плагинам, таким как Sentry, `formatDate` и `formatValue` форматируют данные в соответствии с системными настройками.

Практически для каждого вызова с колбэком существует форма с суффиксом `Async`, которая возвращает промис. Для вызовов записи в объекты и состояния ситуация обратная: базовая форма без колбэка уже возвращает промис, а форма `Async` устарела.

## Стартовые флаги
Контроллер JavaScript запускает адаптер как отдельный процесс и передает ему номер экземпляра и уровень протокола. `adapter-core` обрабатывает это. Три дополнительных флага полезно установить вручную:

* `--install`: запускает адаптер даже без настройки.

Процесс установки.

* `--force`: запускает его, даже если экземпляр отключен.
* `--logs`: дополнительно выводит сообщения журнала в консоль.

## Дополнительная информация
* [Обзор](/docs/dev/adapterdev.md): путь от пустой папки к адаптеру
* [io-package.json](/docs/dev/iopackage.md): Режим работы, зависимости,

Значения конфигурации, `instanceObjects`

* [Основная концепция](/docs/dev/objectsschema.md): полная схема объектов
* [JSON-Config](/docs/dev/adapterjsonconfig.md): Диалог настройки
* [dev-server](/docs/dev/devserver.md) и

[Отладка](/docs/dev/adapterdebug.md): попробуйте и найдите ошибку

* [Рекомендации](/docs/dev/bestpractices.md): что делает адаптер хорошим
* [Опубликовать](/docs/dev/adapterpublish.md): путь к репозиторию