---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: meXu8w+49qheTRuRB43RJkogUW5HBk2XxjDAVaSQ9V4=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных. Так называемые **состояния**(`states`) и **объекты**.

Объекты представляют редко изменяющиеся и большие данные, такие как метаданные ваших системных устройств, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». См. ниже дополнительную информацию о том, какие типы объектов доступны и какие обязательные атрибуты необходимы объекту определенного типа. Такие функции, как setObject, getObject, ... предоставляются вам модулем адаптера.

Состояния представляют собой часто меняющиеся данные в вашей системе, например, например, включена или выключена лампа, зафиксировано ли движение датчиком движения, температура в вашей гостиной или нажата кнопка пульта дистанционного управления. В отличие от объектов, состояния могут использоваться для запуска действий, а состояния могут создавать данные истории. Для работы с состояниями в модуле адаптера есть несколько функций, таких как setState, getState и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

В следующих главах описывается схема базы данных.

## Идентификаторы
ID представляет собой строку максимальной длины 240 байт, иерархически структурированную, уровни разделены точками.

В идентификаторах запрещено использовать следующие символы: `._\\-/ :!#$%&()+=@^{}|~`.

ID имеет разные уровни. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - пространство имен для системных объектов
- `adapter` - пространство имен для конфигов адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - имя адаптера
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - название состояния

## Пространства имен
* `system.` - Системные объекты и состояния
* `system.host.` - процессы контроллера
* `system.config.` - Системные настройки, такие как язык по умолчанию
* `system.meta.` - Системные метаданные
* `system.user.` - Пользователи
* `system.group.` - Группы
* `system.adapter.<имя-адаптера>` - конфигурация адаптера по умолчанию
* `<имя-адаптера>.` - объекты для конкретного адаптера.
* `<имя-адаптера>.meta.` — общие метаданные, используемые всеми экземплярами этого адаптера.
* `<имя-адаптера>.<номер-экземпляра>.` — пространство имен экземпляра адаптера.
* `enum.` - перечисления
* `history.` - Исторические данные
* `скрипты` - Скрипты Script Engine
* `scripts.js.` - скрипты JavaScript Script Engine
* `scripts.py.` — скрипты движка сценариев Python (в будущем)

### Пространство имен system.config.
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### Пространство имен system.host.&lt;hostname&gt;
```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```

<a id="states"></a>

## Состояния Метод `getState` и событие `stateChange` доставляют объект со всеми атрибутами, кроме expire для метода `setState` все, кроме `val`, является необязательным, `from` устанавливается автоматически метод `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` установлены как ожидалось.
Важно отметить, что значение состояния типа массив, объект, смешанный или файл должно быть сериализовано с использованием `JSON.stringify()`.

Атрибуты объекта `getState/stateChange/setState`:

* `val` - фактическое значение - может быть любого типа, "кодируемого" в формате JSON.
* `ack` - логический флаг, указывающий, подтвердила ли целевая система значение
* `ts` - временная метка unix, указывающая последнее обновление состояния (в миллисекундах)
* `lc` - временная метка unix, указывающая последнее изменение фактического значения состояния (в миллисекундах)
* `from` - экземпляр адаптера, выполнивший `setState`
* `user` - имя пользователя, установившего значение
* `expire` — целочисленное значение, которое можно использовать для установки состояний, срок действия которых истекает через заданное количество секунд. Может использоваться только с `setValue`. По истечении срока действия оно исчезает из redisDB.
* `c` - комментарий к этому изменению состояния.
*`q` - качество. Номер со следующими состояниями:

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x20 - 00100000 - substitute initial value
  0x40 - 01000000 - substitute value from device or instance
  0x80 - 10000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

Каждое *состояние* должно быть представлено объектом типа `state`, содержащим метаданные для состояния. Увидеть ниже.

## Объекты
### Обязательные атрибуты
Следующие атрибуты должны существовать в каждом объекте:

* `_id`
* `type` - см. возможные значения ниже
* `common` - объект, содержащий определенные свойства абстракции ioBroker.
* `native` - объект, содержащий конгруэнтные свойства целевой системы

### Необязательные атрибуты
* `common.name` - имя объекта (необязательно, но строго рекомендуется к заполнению)

### Древовидная структура
Древовидная структура собирается автоматически по именам. Например. ```system.adapter.0.admin``` является родителем для `system.adapter.0.admin.uptime`. Используйте это соглашение об именах с точкой ".", как разделитель уровней.

### Типы объектов
* `state` - родитель должен быть типа канала, устройства, экземпляра или хоста
* `channel` - объект для группировки одного или нескольких состояний. Родителем должно быть устройство.
* `device` - объект для группировки одного или нескольких каналов или состояния. Не должен иметь родителя, кроме пространства имен экземпляра адаптера.
* `enum` - объекты, содержащие массив в common.members, указывающий на состояния, каналы, устройства или файлы. перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` — хост, на котором запущен процесс контроллера
* `adapter` - конфиг адаптера по умолчанию. наличие также указывает на то, что адаптер успешно установлен. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родитель должен быть адаптером типа
* `meta` - редко меняющаяся метаинформация, которая нужна адаптеру или его экземплярам
* `config` - конфигурации
* `script` - скрипты
* `user` - пользователи
* `группа` - группы
* `chart` - графики
* `папка` - куча устройств или может быть что-то еще.

#### Атрибуты для определенных типов объектов
##### Состояние
Атрибуты:

* `common.type` (необязательный - (по умолчанию смешанный==любой тип) (возможные значения: число, строка, логическое значение, массив, объект, смешанный, файл). В качестве исключения объекты с типом `meta` могут иметь `common .type=meta.user` или `meta.folder`. Важно отметить, что массив, объект, смешанный и файл должны быть сериализованы с использованием `JSON.stringify()`.
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательный) - интервал увеличения/уменьшения. Например. 0,5 для термостата
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательный - если установлен common.def, это значение используется как флаг подтверждения, js-controller 2.0.0+)
* `common.desc` (необязательно, строка или объект) — описание, объект для многоязычного описания
* `common.read` (логическое значение, обязательное) — true, если состояние доступно для чтения
* `common.write` (логическое значение, обязательное) — true, если состояние доступно для записи
* `common.role` (строка, обязательная) — роль состояния (используется в пользовательских интерфейсах для указания, какой виджет выбрать, см. ниже)
* `common.states` (необязательный) атрибут типа number с объектом возможных состояний `{'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'}` или (поддерживается начиная с admin5) массив состояний, например `['Start', 'Flight', 'Land']`
* `common.workingID` (строка, необязательный) - если у этого состояния есть вспомогательное состояние WORKING. Здесь должно быть написано полное имя или только последняя часть, если первые части совпадают с фактическими. Используется для `HM.LEVEL` и обычно имеет значение `WORKING`
* `common.custom` (необязательный) - структура с пользовательскими настройками для конкретных адаптеров. Например, `{"influxdb.0": {"enabled": true, "alias": "name"}}`. Атрибут `enabled` обязателен, и если он не соответствует действительности, весь атрибут будет удален.

##### Атрибут `common.history`
Die Verlaufsfunktion benötigt den Verlaufsadapter oder einen anderen Speicheradapter vom Typ Verlauf

длина FIFO уменьшается до минимума при достижении максимума. установите значение null или оставьте неопределенным, чтобы использовать значения по умолчанию

список транспортов см. в README адаптера истории.

* `common.history` (необязательно)
* `common.history.<HISTORY-INSTANCE>.changesOnly` (необязательный, логический, если true, регистрируются только изменения значений)
* `common.history.<HISTORY-INSTANCE>.enabled` (логическое значение)

##### Состояние `common.role`
* `common.role` (указывает, как это состояние должно быть представлено в пользовательских интерфейсах)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
предложение: объект канала common.role должен/может подразумевать набор обязательных и/или необязательных дочерних объектов состояния

возможные значения:

* `info` - Курс валюты или акций, цены на топливо, вставка почтового ящика и тому подобное
* `календарь` -
* `прогноз` - прогноз погоды

* `media - общий медиаканал
* `media.music` - медиаплеер, например, SONOS, YAMAHA и т.п.
* `media.tv` - ТВ
* `media.tts` - преобразование текста в речь

* `thermo` - Мониторинг или контроль температуры, влажности и т.д.
* `термо.тепло`
* `термо.прохладный`

* `blind` - управление жалюзи

* `свет`
* `light.dimmer` - диммер света
* `light.switch` - Выключатель света.
* `light.color` - Управление освещением с возможностью смены цвета
* `light.color.rgb` - Установить цвет в RGB
* `light.color.rgbw` - Установить цвет в RGBW
* `light.color.hsl` - Установить цвет в Hue/Saturation/Luminance (Hue color light - LivingColors...)
* `light.color.hslct` - Установить цвет в оттенках/насыщенности/яркости или цветовой температуре (расширенный цветовой оттенок света)
* `light.color.ct` - цветовая температура K

* `switch` - какой-то универсальный переключатель

* `датчик` - напр. оконный или дверной контакт, датчик протечки воды, датчик пожара
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, запереть
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true (тревога), false (нет тревоги)
* `sensor.fire` - true (тревога), false (нет тревоги)
* `sensor.CO2` - true (тревога), false (нет тревоги)

*

* `alarm` - какая-то тревога

* `телефон` - fritz box, speedport и т.д.

* «кнопка» — как настенный выключатель или пульт от телевизора, где каждая кнопка — это состояние, например .play, .stop, .pause.
* `remote` - телевизор или другие пульты, состояние которых представляет собой строку с нажатыми значениями, например. «ВОСПРОИЗВЕДЕНИЕ», «СТОП», «ПАУЗА»

* `meta` - Информация об устройстве
* `meta.version` - версия устройства
* `meta.config` - конфигурация с устройства
* ...

#### Описания каналов
~~Имена атрибутов могут быть произвольно определены адаптером, за исключением тех, которые написаны **жирным** шрифтом.~~

"W" - common.write=true

"М" - обязательно

##### Необязательные состояния для каждого канала/устройства
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### `light.switch` - Описание атрибутов
| **Имя** | **общая.роль** | **М** | **В** | **общий.тип** | **Описание** | ------------- |:---------------------------|:-----:| :-----:|-----------------|---

| состояние | переключатель | Х | Х | логический |
| описание | текст.описание | | | |
| ммм | индикатор.обслуживание.ммм | | | | mmm = lowbat или unreach или что-то в этом роде |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `light.dimmer` - Описание атрибутов
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `blind` - Описание атрибутов
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

##### `phone` - Описание атрибутов
| **Имя** | **общая.роль** | **М** | **В** | **общий.тип** | **Описание** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `звон` | `индикатор` | | | `логическое` |

...

#### Устройство
#### Перечисление
* `common.members` - (необязательный) массив идентификаторов членов перечисления

#### Мета
Я БЫ

* `*&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.meta.&lt;имя-мета&gt;*`
* `*&lt;имя-адаптера&gt;.meta.&lt;имя-мета&gt;*`
* `system.*meta.&lt;мета-имя&gt;*`

#### Адаптер
Идентификатор: `system.adapter.<adapter.name>`

*Примечание:* все флаги являются необязательными, кроме специальных, помеченных как **обязательные**.

* `common.adminColumns` - Пользовательские атрибуты, которые должны отображаться в админке в браузере объектов. Например: `[{"name": {"en": "KNX-адрес"}, "path": "native.address", "width": 100, "align": "left"}, {"name": "DPT", "path": "native.dpt", "width": 100, "align": "right", "type": "number", "edit": true, "objTypes": ["state" , "канал"]}]`. `type` — это тип атрибута (например, строка, число, логическое значение) и требуется только в том случае, если разрешено редактирование. objTypes — это список типов объектов, которые могут иметь такой атрибут. Используется только в режиме редактирования тоже.
* `common.adminTab.fa-icon` - (устарело) имя значка Font-Awesome для TAB.
* `common.adminTab.ignoreConfigUpdate` - не обновлять TAB конфигурации, если конфигурация изменилась (чтобы включить настройку параметров во TAB)
* `common.adminTab.link` - ссылка для iframe в TAB. Вы можете использовать замену параметров следующим образом: `http://%ip%:%port%`. IP будет заменен на IP хоста. «Порт» будет извлечен из «native.port».
* `common.adminTab.name` - имя TAB в админке
* `common.adminTab.singleton` - [true/false], если у адаптера есть TAB для администратора. Будет показана только одна TAB для всех экземпляров.
* `common.allowInit` - [true/false] разрешить вызов "запланированного" адаптера "не по расписанию", если настройки изменены или адаптер запущен. Или разрешить запуск адаптера по расписанию один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` - значения для `common.mode`, если возможно более одного режима
* `common.blockly` - [true/false], если у адаптера есть пользовательские блоки для blockly. (требуется `admin/blockly.js`)
* `common.connectionType` - Тип соединения с устройством: `локальное/облачное`. См. также `common.dataSource`.
* `common.compact` - сообщает контроллеру, что этот адаптер при желании можно запустить в том же процессе
* `common.config.height` - высота по умолчанию для диалога конфигурации (устарела - действует только для admin2)
* `common.config.minHeight` - минимальная высота диалога конфигурации (устарела - действует только для admin2)
* `common.config.minWidth` - минимальная ширина диалога конфигурации (устарела - действует только для admin2)
* `common.config.width` - ширина по умолчанию для диалога конфигурации (устарело - допустимо только для admin2)
* `common.dataFolder` - папка относительно iobroker-data, в которой адаптер хранит данные. Эта папка будет скопирована и восстановлена автоматически. Вы можете использовать в нем переменную `%INSTANCE%`.
* `common.dataSource` - Как данные будут получены с устройства: `опрос/push/предположение`. Это важно вместе с `connectionType`.
* `common.disableDataReporting` — не сообщать об ошибках через `сентри` для этого экземпляра
* `common.dependencies` — массив вида `[{"js-controller": ">=2.0.0"}]`, описывающий, какие модули ioBroker требуются для этого адаптера на том же хосте.
* `common.docs` - структура типа `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md" ]}`, который описывает документацию, если ее нет в `README.md`
* `common.enabled` - **обязательное** значение [true/false] должно быть ложным, чтобы новые экземпляры были отключены по умолчанию.
* `common.engineTypes` - устарело. Использовать движок в package.json
* `common.eraseOnUpload` - стереть все предыдущие данные в каталоге перед загрузкой
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.extIcon` - ссылка на внешнюю иконку для неустановленных адаптеров. Обычно на гитхабе.
* `common.getHistory` - [true/false], если адаптер поддерживает сообщение getHistory
* `common.globalDependencies` — массив вида `[{"admin": ">=2.0.0"}]`, описывающий, какие модули ioBroker требуются для этого адаптера на одном из хостов.
* `common.icon` - имя локальной иконки (должна находиться в поддиректории "admin")
* `common.installedVersion` - не используйте его, будет установлено только внутри
* `common.ignoreVersion` — не показывать значок обновления для этого адаптера для этой конкретной версии.
* `common.jsonConfig` — этот адаптер поддерживает admin5 и предоставляет admin/jsonConfig.json с описанием макета диалогового окна конфигурации.
* `common.jsonCustom` — этот адаптер поддерживает admin5 и предоставляет admin/jsonCustom.json с описанием макета пользовательских настроек.
* `common.keywords` — аналогично ключевым словам в package.json, но может быть определено на многих языках. Просто массив.
* `common.localLinks` - ссылка на веб-сервис данного адаптера. Например. на http://localhost:5984/_utils для футона от администратора
* `common.localLink` - устарело. Используйте `common.localLinks`.
* `common.loglevel` - отладка, информация, предупреждение или ошибка
* `common.logTransporter` - если этот адаптер получает журналы от других хостов и адаптеров (например, чтобы хранить их где-то)
* `common.main` — **Устарело** Использовать main в package.json.
* `common.materializeTab` - если адаптер поддерживает> admin3 для вкладки (стиль материализации)
* `common.materialize` - если адаптер поддерживает> admin3 (стиль материализации)
* `common.messagebox` - true, если окно сообщения поддерживается. Следовательно, адаптер может получать сообщения sendTo (используемые для электронной почты, pushover и т. д.).
* `common.messages` — условные сообщения при обновлении. Подробнее см. в разделе [Условные сообщения](#conditional-messages).
* `common.mode` - **обязательные** возможные значения см. ниже
* `common.name` - **обязательное** имя адаптера без "ioBroker".
* `common.noConfig` - [true/false] например, не показывать диалог конфигурации
* `common.noIntro` - никогда не показывать экземпляры этого адаптера на экране Intro/Overview в админке (например, значки, виджеты)
* `common.noRepository` - [true/false], если адаптер поставляется с начальной установкой или имеет собственный репозиторий
* `common.nogit` - если true, установка напрямую с github невозможна.
* `common.nondeletable` — [true/false] этот адаптер нельзя удалить или обновить. Он будет обновляться вместе с контроллером.
* `common.npmLibs` - устарело. Используйте package.json `зависимости`.
* `common.onlyWWW` - [true/false] сказать контроллеру, что адаптер имеет только файлы html и не имеет main.js, как rickshaw
* `common.osDependencies.darwin` - массив пакетов OSX, необходимых для данного адаптера
* `common.osDependencies.linux` - массив пакетов debian/centos, необходимых для этого адаптера (разумеется, только ОС с менеджерами пакетов apt, apt-get, yum)
* `common.osDependencies.win32` — не используется, так как в win32 нет менеджера пакетов
* `common.os` - строка или массив поддерживаемых операционных систем, например `["линукс", "дарвин"]`
* `common.platform` — **обязательные** возможные значения: Javascript/Node.js, больше будет
* `common.pugins.sentry` - структура с конфигурационными данными для плагина `sentry`
* `common.preserveSettings` - строка (или массив) с именами общих атрибутов экземпляра, которые не будут удалены. Например. "история", поэтому по setState('system.adapter.mqtt.0", {..}) поле common.history не будет удалено, даже если в новом объекте нет этого поля. Для удаления атрибута его нужно явно указать сделано с помощью `common: {история: null}`.
* `common.readme` - URL-адрес файла ReadMe
* `common.restartAdapters` - массив с именами адаптеров, которые необходимо перезапустить после установки этого адаптера, например ["вид"]
* `common.restartSchedule` - расписание CRON для перезапуска адаптеров режима `daemon`
* `common.schedule` - расписание CRON, если адаптер работает в режиме `schedule`.
* `common.serviceStates` — [true/false или путь], если адаптер может предоставлять дополнительные состояния. Если да, то будет вызываться путь `adapter/lib/states.js`, который дает следующие параметры функции (объекты, состояния, экземпляр, конфигурация, обратный вызов). Функция должна предоставить массив точек со значениями типа `function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}`
* `common.singletonHost` - адаптер можно установить только один раз на один хост
* `common.singleton` - адаптер можно установить только один раз на всю систему
* `common.stopBeforeUpdate` — [true/false], если адаптер необходимо остановить перед обновлением
* `common.stopTimeout` - время ожидания в мс, пока адаптер не выключится. По умолчанию 500 мс.
* `common.subscribable` - переменные этого адаптера должны быть подписаны с помощью sendTo для включения обновлений
* `common.subscribe` - имя переменной, которая подписывается автоматически
* `common.supportCustoms` - [true/false], если адаптер поддерживает настройки для каждого состояния. В админке должен быть файл custom.html. Пример можно найти в ioBroker.history
* `common.supportStopInstance`- [true/false], если адаптер поддерживает сигнал stopInstance (требуется **messagebox**). Сигнал будет отправлен перед остановкой на адаптер. (используется, если возникли проблемы с SIGTERM)
* `common.titleLang` - **обязательное** более длинное имя адаптера на всех поддерживаемых языках, например {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.title` - (устарело) более длинное имя адаптера для отображения в админке
* `common.type` - Тип адаптера. См. [Типы] (adapterpublish.md)
* `common.unchanged` - (система), пожалуйста, не используйте этот флаг. Это флаг для информирования системы о том, что диалоговое окно конфигурации должно быть показано в админке.
* `common.unsafePerm` — [true/false], если пакет должен быть установлен с параметром `npm --unsafe-perm`
* `common.version` - **обязательная** доступная версия
* `common.wakeup` - Адаптер будет запущен, если какое-либо значение будет записано в `system.adapter.NAME.x.wakeup`. Обычно адаптер должен остановиться после обработки события.
* `common.webByVersion` - показать версию как префикс в веб-адаптере (обычно - ip:port/material, webByVersion - ip:port/1.2.3/material)
* `common.webExtendable` - [true/false], если веб-сервер в этом адаптере можно расширить с помощью плагинов/расширений, таких как proxy, simple-api
* `common.webExtension` - относительное имя файла для подключения веб-расширения. Например. в `simple-api` `lib/simpleapi.js` относительно корневого каталога адаптера. Кроме того, в `native.webInstance` необходимо указать, куда будет включено это расширение. Пустой означает, что он должен работать как собственный веб-сервис. «*» означает, что каждый веб-сервер должен включать его.
* `common.webPreSettings` - список параметров, которые должны быть включены в info.js адаптером веб-сервера. (Пример материала)
* `common.webservers` - массив экземпляров веб-сервера, которые должны обслуживать контент из папки www адаптера.
* `common.welcomeScreen` - массив страниц, которые должны отображаться на "веб-странице" index.html. `["vis/edit.html", "vis/index.html"]` или `[{"ссылка": "vis/edit.html", "name": "редактор Vis", "img": "vis /img/edit.png", "color": "синий"}, "vis/index.html"]`
* `common.welcomeScreen.order` — задача
* `common.welcomeScreenPro` — то же, что и `common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.wwwDontUpload` - Не загружать в базу данных каталог www. Используется только для администратора. Вы можете просто назвать свой каталог как-то иначе и ОК.
* `protectedNative` - массив атрибутов конфигурации, которые будут доступны только собственному адаптеру, например `["пароль"]`
* `encryptedNative` - массив атрибутов конфигурации, которые будут автоматически зашифрованы при сохранении на странице конфигурации администратора и автоматически расшифрованы во время работы адаптера, например. `["пароль", "токен"]`
* `native` — предопределенные атрибуты, которые доступны в `index_m.html` и во время выполнения через `adapter.config.<attribute>`, например `{"порт": 1234, "пароль": "секрет"}`

#### Условные сообщения
Если вы хотите, чтобы при обновлении с какой-то конкретной версии на новую конкретную версию отображалось сообщение, вы можете определить `common.messages`.

Пример:

```
"messages": {
    "condition": {
        "operand": "and", // "and" or "or"
        "rules": [
            "oldVersion<=1.0.44", // currently only oldVersion and newVersion are supported
            "newVersion>=1.0.45"  // possible comparators: <, >, >=, <=, !=, ==
        ]
    },
    "title": {
        "en": "Important notice",
    },
    "text": {
        "en": "Main text",
    },
    "link": "https://iobroker.net/www/pricing",
    "buttons": ["agree", "cancel", "ok], // optional. If no buttons defined the info will be shown only in the change log dialog
    "linkText" {
         "en": "More info",
    },
    "level": "warn" // info, warn, error
}
```

#### Пример
Идентификатор: `system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;`

* `common.host` - (обязательный) хост, на котором должен запускаться адаптер - должен существовать объект `system.host.&lt;host&gt;`
* `common.enabled` - (обязательно)
* `common.mode` - (обязательный) возможные значения см. ниже

##### Адаптер/экземпляр common.mode
* `none` - этот адаптер не запускает процесс
* `daemon` - всегда работающий процесс (будет перезапущен, если процесс завершится)
* `subscribe` - запускается, когда состояние `system.adapter.&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.alive` меняется на `true`. Уничтожается, когда `.alive` изменяется на `false` и устанавливает `.alive` в `false`, если процесс завершается (не будет перезапущен при завершении процесса)
* `schedule` - запускается по расписанию, найденному в `system.adapter.&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.schedule` - реагирует на изменения `.schedule` путем перепланирования с новым состоянием
* `once` - этот адаптер будет запускаться каждый раз при изменении объекта `system.adapter.yyy.x`. Он не будет перезапущен после завершения.
* `extension` - этот адаптер будет запускаться не `js-контроллером`, а веб-экземпляром. Веб-экземпляр может быть определен в `native.webInstance` как '*' (если в каждом веб-сайте) или как `web.x` для конкретного веб-экземпляра. (Примеры: `камеры, прокси`). Кроме того, в `common.webExtension` должен быть указан путь к файлу плагина.

#### Хозяин
Идентификатор: `system.host.<host>`

* `common.name` - напр. `система.хост.банан`
* `общий.процесс`
* `общая.версия`
* `общая.платформа`
* `common.cmd`
* `common.hostname` - напр. `банан`
* `common.address` - массив строк IP-адресов

#### Конфиг
#### Скрипт
* `common.platform` - (обязательно) возможные значения `Javascript/Node.js` (больше будет)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) источник скрипта
* `common.engine` - (необязательный) экземпляр *скриптового движка*, который должен запускать этот скрипт (например, 'javascript.0') - если автоматически выбран опущенный движок

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательно) MD5 Hash пароля

#### Группа
* `common.name` - (обязательно) название группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов
* `common.desc` - (не обязательно) описание назначения группы