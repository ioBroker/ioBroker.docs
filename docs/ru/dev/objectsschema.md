---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: dWNbEEbeLedpIZ8NrxkWHC+GHL8s1LKj9IxKpi3380I=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных. Так называемые **состояния**(`states`) и **объекты**.

Объекты представляют собой редко меняющиеся и более крупные данные, такие как метаданные устройств вашей системы, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». Ниже приведена дополнительная информация о том, какие типы объектов доступны и какие обязательные атрибуты необходимы объекту определенного типа. Такие функции, как setObject, getObject,... предоставляются вам модулем адаптера.

Состояния представляют собой часто меняющиеся данные в вашей системе, например, например. включена или выключена лампа, детектор движения обнаружил движение, температуру в вашей гостиной или нажата кнопка пульта дистанционного управления. В отличие от объектов, состояния могут использоваться для запуска действий, а состояния могут создавать исторические данные. Для работы с состояниями в модуле адаптера есть несколько функций, таких как `setState`, `getState` и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

В следующих главах описывается схема базы данных.

## Идентификаторов
ID — строка максимальной длиной 240 байт, иерархически структурированная, уровни разделены точками.

Регулярное выражение, которое оно использовало для проверки символов, которые запрещено использовать в идентификаторах, можно найти в https://github.com/ioBroker/ioBroker.js-controller/blob/master/packages/common/lib/common/tools. js#L44.

Идентификатор имеет разные уровни. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - пространство имен для системных объектов
- `adapter` — пространство имен для конфигов адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` — имя адаптера
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - название состояния

## Пространства имен
* `system.` - Системные объекты и состояния
* `system.host.` — процессы контроллера
* `system.config.` — Системные настройки, например язык по умолчанию.
* `system.meta.` - Метаданные системы
* `system.user.` - Пользователи
* `system.group.` — Группы
* `system.adapter.<имя-адаптера>` — конфигурация адаптера по умолчанию
* `<имя-адаптера>.` — объекты для конкретного адаптера.
* `<имя-адаптера>.meta.` — общие метаданные, используемые всеми экземплярами этого адаптера.
* `<имя-адаптера>.<номер-экземпляра>.` — пространство имен экземпляра адаптера.
* `enum.` - Перечисления
* `history.` - Данные истории
* `scripts.` - Скрипты скриптового движка
* `scripts.js.` — скрипты JavaScript Script Engine
* `scripts.py.` — скрипты Python Script Engine (в будущем)

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

## Сообщает, что метод `getState` и событие `stateChange` доставляют объект со всеми атрибутами, кроме срока действия, для метода `setState` все, кроме `val`, является необязательным, `from` устанавливается автоматически метод `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` устанавливаются как ожидалось.
Важно отметить, что значение состояния типа `array`, `object`, `mixed` или `file` должно быть сериализовано с использованием `JSON.stringify()`.

Атрибуты объекта `getState/stateChange/setState`:

* `val` — фактическое значение — может быть любого типа, «кодируемого» JSON.
* `ack` — логический флаг, указывающий, подтвердила ли целевая система значение.
* `ts` — временная метка UNIX, указывающая последнее обновление состояния (в миллисекундах)
* `lc` — временная метка UNIX, указывающая последнее изменение фактического значения состояния (в миллисекундах).
* `from` — экземпляр адаптера, выполнивший `setState`
* `user` - имя пользователя, установившего значение
* `expire` — целочисленное значение, которое можно использовать для установки состояний, срок действия которых истекает через заданное количество секунд. Может использоваться только с `setValue`. По истечении срока действия значения оно исчезает из redisDB.
* `c` — комментарий к этому изменению состояния.
* `q` — качество. Количество следующих государств:

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

Каждое *состояние* должно быть представлено объектом типа `state`, содержащим метаданные для состояния. См. ниже.

## Объекты
### Обязательные атрибуты
В каждом объекте должны присутствовать следующие атрибуты:

* `_id`
* `type` — возможные значения см. ниже
* `common` — объект, содержащий специфические свойства абстракции ioBroker.
* `native` — объект, содержащий соответствующие свойства целевой системы.

### Необязательные атрибуты
* `common.name` - имя объекта (необязательно, но строго рекомендуется заполнять)

### Древовидная структура
Древовидная структура собирается автоматически по именам. Например. ```system.adapter.0.admin``` является родительским для `system.adapter.0.admin.uptime`. Используйте это соглашение об именах с точкой «.» в качестве разделителя уровней.

### Типы объектов
* `state` — родительский элемент должен иметь тип канала, устройства, экземпляра или хоста.
* `channel` — объект для группировки одного или нескольких состояний. Родителем должно быть устройство.
* `device` — объект для группировки одного или нескольких каналов или состояния. Не должно иметь родительского элемента, кроме пространства имен экземпляра адаптера.
* `enum` — объекты, содержащие массив в `common.members`, указывающий на состояния, каналы, устройства или файлы. перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` — хост, на котором запущен процесс контроллера
* `adapter` — конфигурация адаптера по умолчанию. Наличие также указывает на то, что адаптер успешно установлен. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` — экземпляр адаптера. Родительский элемент должен иметь тип адаптера
* `meta` — редко меняющаяся метаинформация, которая нужна адаптеру или его экземплярам
* `config` — конфигурации
* `script` - скрипты
* `user` - пользователи
* `group` - группы
* `chart` — графики
* `папка` - куча устройств или может быть что-то еще.
* `schedule` - расписание, напр. событие календаря
* `design` — объект дизайна, используемый для `getObjectView`

#### Атрибуты для определенных типов объектов
##### Состояние
Атрибуты:

* `common.type` (необязательно - (по умолчанию `mixed`==любой тип) (возможные значения: `array`, `boolean`, `file`, `json`, `mixed`, `multistate`, `number `, `object`, `string`). В качестве исключения объекты с типом `meta` могут иметь `common.type=meta.user` или `meta.folder`. Важно отметить, что массив, объект, смешанный и файл должен быть сериализован с использованием `JSON.stringify()`.
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательно) - увеличить/уменьшить интервал. Например, 0,5 для термостата.
* `common.unit` (необязательно)
* `common.def` (необязательно – значение по умолчанию)
* `common.defAck` (необязательно - если `common.def` установлен, это значение используется как флаг подтверждения, `js-controller` 2.0.0+)
* `common.desc` (необязательно, строка или объект) — описание, объект для многоязычного описания
* `common.read` (логическое значение, обязательное) — true, если состояние доступно для чтения
* `common.write` (логическое значение, обязательное) — true, если состояние доступно для записи
* `common.role` (строка, обязательная) — роль состояния (используется в пользовательских интерфейсах для указания, какой виджет выбрать, см. ниже)
* `common.states` (необязательно) — предоставить дополнительный контекст для разрешенных значений для состояний с типами данных строка и число:
  * для номеров **без** предоставлено common.min/common.max: содержит список разрешенных числовых значений и их (отображаемую) метку в виде объекта в виде `{0: 'OFF', 1: 'ON', ' -1': 'что угодно'}`. Разрешены только эти значения
  * для номеров **с** предоставленным `common.min` **и/или** common.max: разрешенный диапазон номеров определяется мин/максом, этот атрибут содержит список «специальных» числовых значений и их ( отображается) пометить как объект, например `{0: 'ВЫКЛ', 254: 'ВКЛ', 255: 'МИГАНИЕ'}` (мин=0, макс=255). Разрешено указывать только min **или** max, тогда отсутствующий предел принимается как +/-Бесконечность (+/-Бесконечность не включена)
  * для строк содержит список разрешенных значений и их (отображаемую) метку в виде объекта, например `{'value': 'valueName', 'value2': 'valueName2'}`. Разрешены только эти значения
  * для строк содержит список разрешенных значений в виде массива типа `['Start', 'Flight', 'Land']` (что по сути то же самое, что `{'Start': 'Start', 'Flight': ' Полет», «Земля»: «Земля»}`). Разрешены только эти значения
  * Эти значения в настоящее время (начиная с js-контроллера 4.0) не проверяются и не проверяются js-контроллером и доступны только для пользовательских интерфейсов и визуализаций.
* `common.workingID` (строка, необязательно) - если это состояние имеет вспомогательное состояние РАБОТАЕТ. Здесь должно быть написано полное имя или только последняя часть, если первые части совпадают с фактическими. Используется для HM.LEVEL и обычно имеет значение WORKING.
* `common.custom` (необязательно) — структура с пользовательскими настройками для конкретных адаптеров. Например `{"influxdb.0": {"enabled": true, "alias": "name"}}`. Атрибут `enabled` является обязательным, и если он неверен, весь атрибут будет удален.

##### Состояние `common.role`
* `common.role` (указывает, как это состояние должно быть представлено в пользовательских интерфейсах)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
предложение: объекты-каналы `common.role` должны/могут подразумевать набор обязательных и/или необязательных дочерних объектов состояния.

возможные значения:

* `info` — курс валюты или акций, цены на топливо, вставка почтового ящика и тому подобное.
* `календарь` -
* `прогноз` - прогноз погоды

* `media - общий медиа-канал
* `media.music` — медиаплеер, типа SONOS, YAMAHA и т.п.
* `media.tv` — ТВ
* `media.tts` — преобразование текста в речь

* `thermo` - Мониторинг или контроль температуры, влажности и т. д.
* `термо.тепло`
* `термо.охлад`

* `blind` - Управление жалюзи на окне.

* `свет`
* `light.dimmer` - Диммер света
* `light.switch` - Выключатель света.
* `light.color` - Управление освещением с возможностью изменения цвета
* `light.color.rgb` — Установить цвет в RGB.
* `light.color.rgbw` — Установить цвет в RGBW.
* `light.color.hsl` - Установить цвет в оттенках/насыщенности/яркости (цветовой оттенок света - LivingColors...)
* `light.color.hslct` — установка цвета в оттенках/насыщенности/яркости или цветовой температуре (расширенный цветовой оттенок оттенка)
* `light.color.ct` — цветовая температура K

* `switch` — какой-то общий переключатель.

* `сенсор` - например. оконный или дверной контакт, датчик протечки воды, датчик пожара
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, заблокировать
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true(тревога), false (нет тревоги)
* `sensor.fire` - true(тревога), false(нет тревоги)
* `sensor.CO2` - true(тревога), false (нет тревоги)

*

* `alarm` - какая-то тревога

* `телефон` — фриц-бокс, спидпорт и т.п.

* `button` — как настенный выключатель или пульт от телевизора, где каждая кнопка имеет состояние, например .play, .stop, .pause.
* `remote` — телевизор или другие пульты, состояние которых представляет собой строку с нажатыми значениями, например «ВОСПРОИЗВЕДЕНИЕ», «СТОП», «ПАУЗА».

* `meta` - Информация об устройстве
* `meta.version` — версия устройства
* `meta.config` — конфигурация с устройства
* ...

#### Описания каналов
~~Имена атрибутов могут свободно определяться адаптером, за исключением тех, которые написаны **жирным** шрифтом.~~

«W» — common.write=true

«М» - Обязательно

##### Дополнительные состояния для каждого канала/устройства
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
| **Имя** | **common.role** | **М** | **В** | **общий.тип** | **Описание** |
| ------------- |:--------------------------|:-----:|:-----:|-----------------|-------------------------------------|
| состояние | переключатель | Х | Х | логическое | |
| описание | текст.описание | | | | |
| ммм | индикатор.обслуживание.ммм | | | | ммм = lowbat или недоступность или что-то еще |

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
| **Имя** | **common.role** | **М** | **В** | **общий.тип** | **Описание** |
| `ringing_number` | `text.phone_number` | | | `string` | |
| `ringing` | `indicator` | | | `boolean` | |
| `звон` | `индикатор` | | | `логическое` | |

...

#### Устройство
#### Перечисление
* `common.members` — (необязательный) массив идентификаторов членов перечисления.

#### Мета
ИДЕНТИФИКАТОР

* `*&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.meta.&lt;мета-имя&gt;*`
* `*&lt;имя-адаптера&gt;.meta.&lt;мета-имя&gt;*`
* `system.*meta.&lt;мета-имя&gt;*`

#### Адаптер
Идентификатор: `system.adapter.<adapter.name>`

*Примечание:* все флаги являются необязательными, за исключением специальных, отмеченных как **обязательные**.

* `common.adminColumns` — Пользовательские атрибуты, которые должны отображаться в админке в браузере объектов. Например: `[{"name": {"en": "KNX-адрес"}, "path": "native.address", "width": 100, "align": "left"}, {"name": «DPT», «путь»: «native.dpt», «width»: 100, «align»: «right», «type»: «number», «edit»: true, «objTypes»: [»state» , "канал"]}]`. `type` — это тип атрибута (например, строка, число, логическое значение) и необходим только в том случае, если редактирование включено. `objTypes` — это список типов объектов, которые могут иметь такой атрибут. Используется только в режиме редактирования.
* `common.adminTab.fa-icon` — (устарело) Имя значка Font-Awesome для TAB.
* `common.adminTab.icon` — (необязательно) ссылка на значок или значок в кодировке Base64 для TAB. Может быть SVG
* `common.adminTab.ignoreConfigUpdate` - не обновлять TAB конфигурации, если конфигурация изменилась (чтобы включить настройки конфигурации в TAB)
* `common.adminTab.link` — ссылка на iframe в TAB. Вы можете использовать замену параметров следующим образом: `http://%ip%:%port%`. IP будет заменен IP-адресом хоста. Порт будет извлечен из native.port.
* `common.adminTab.name` — имя TAB в админке
* `common.adminTab.singleton` — [true/false], если в адаптере есть TAB для администратора. Будет показана только одна TAB для всех экземпляров.
* `common.adminUI.config` — [none/json/materialize/html] тип пользовательского интерфейса конфигурации. Если он не определен, адаптер будет отображаться в формате html. (`jsonConfig.json` или `jsonConfig.json5` от `json`, `index_m.html` от `materialize`, `index.html` от `html` ожидаются в папке `admin`)
* `common.adminUI.custom` — [none/json] тип пользовательского интерфейса пользовательской конфигурации. Если не определено, пользовательский интерфейс отображаться не будет. Использовать jsonCustom.json или jsonCustom.json5 можно только в папке admin.
* `common.adminUI.tab` — [none/html] тип пользовательского интерфейса TAB. `tab.html` или `tab_m.html` расширяются в папке `admin`, если они определены как `html`.
* `common.allowInit` - [true/false] позволяет "запланированному" адаптеру вызываться "не в расписании", если настройки изменены или адаптер запущен. Или разрешите запуск адаптера по расписанию один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` — значения для `common.mode`, если возможно более одного режима.
* `common.blockly` — [true/false], если адаптер имеет собственные блоки для блочного режима. (требуется `admin/blockly.js`)
* `common.compact` — сообщает контроллеру, что этот адаптер при желании можно запустить в том же процессе.
* `common.config.height` — высота по умолчанию для диалогового окна конфигурации (устарело — действует только для admin2)
* `common.config.minHeight` — минимальная высота диалога конфигурации (устарело — действует только для admin2)
* `common.config.minWidth` — минимальная ширина диалога конфигурации (устарело — действует только для admin2)
* `common.config.width` — ширина по умолчанию для диалогового окна конфигурации (устарело — действует только для admin2)
* `common.connectionType` — Тип соединения с устройством: `local/cloud`. См. также `common.dataSource`.
* `common.dataFolder` — папка относительно iobroker-data, в которой адаптер хранит данные. Эта папка будет скопирована и восстановлена автоматически. Вы можете использовать в нем переменную `%INSTANCE%`.
* `common.dataSource` — Как данные будут получены с устройства: `poll/push/assumption`. Это важно вместе с `connectionType`.
* `common.dependentities` — массив типа `[{"js-controller": ">=2.0.0"}]`, который описывает, какие модули ioBroker необходимы для этого адаптера на том же хосте.
* `common.disableDataReporting` — не сообщать об ошибках через `sentry` для этого экземпляра.
* `common.docs` — структура типа `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md" ]}`, который описывает документацию, если ее нет в `README.md`
* `common.enabled` — **обязательное** значение [true/false] должно быть ложным, поэтому новые экземпляры по умолчанию отключены.
* `common.engineTypes` — устарел. Используйте движок в package.json
* `common.eraseOnUpload` — удалить все предыдущие данные в каталоге перед загрузкой
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.extIcon` — ссылка на внешний значок неустановленных адаптеров. Обычно на GitHub.
* `common.getHistory` — [true/false], если адаптер поддерживает сообщение getHistory.
* `common.globalDependities` — массив типа `[{"admin": ">=2.0.0"}]`, который описывает, какие модули ioBroker необходимы для этого адаптера на одном из хостов.
* `common.icon` — имя локальной иконки (должно находиться в подкаталоге «admin»)
* `common.ignoreVersion` — не показывать значок обновления для этого адаптера для этой конкретной версии.
* `common.installedVersion` — не используйте, будет устанавливаться только внутри.
* `common.jsonConfig` — этот адаптер поддерживает admin5 и предоставляет admin/jsonConfig.json с описанием макета диалогового окна конфигурации.
* `common.jsonCustom` — этот адаптер поддерживает admin5 и предоставляет admin/jsonCustom.json с описанием макета пользовательских настроек.
* `common.keywords` — аналогично ключевым словам в package.json, но может быть определен на многих языках. Просто массив.
* `common.localLink` — устарел. Используйте common.localLinks.
* `common.localLinks` — ссылка на веб-сервис данного адаптера. Например, http://localhost:5984/_utils для получения футона от администратора.
* `common.logTransporter` - если этот адаптер получает логи от других хостов и адаптеров (например, чтобы их где-то хранить)
* `common.loglevel` — отладка, информация, предупреждение или ошибка
* `common.main` — **Устарело** Используйте main в package.json.
* `common.materializeTab` - если адаптер поддерживает > admin3 для вкладки (стиль материализации)
* `common.materialize` - если адаптер поддерживает > admin3 (стиль материализации)
* `common.messagebox` — true, если поддерживается окно сообщения. Следовательно, адаптер может получать сообщения sendTo (используемые для электронной почты, pushover и т. д.).
* `common.messages` — Условные сообщения при обновлении. Подробности см. в разделе [Условные сообщения](#conditional-messages).
* `common.mode` - **обязательные** возможные значения см. ниже.
* `common.name` — **обязательное** имя адаптера без «ioBroker».
* `common.noConfig` - [true/false] не показывать, например, диалог конфигурации
* `common.noIntro` — никогда не показывать экземпляры этого адаптера на экране «Введение/обзор» в администраторе (например, значки, виджеты).
* `common.noRepository` - [true/false], если адаптер поставляется с первоначальной установкой или имеет собственный репозиторий.
* `common.nogit` — если true, установка напрямую с GitHub невозможна.
* `common.nondeletable` — [true/false] этот адаптер нельзя удалить или обновить. Он будет обновляться вместе с контроллером.
* `common.npmLibs` — устарело. Используйте «зависимости» package.json.
* `common.onlyWWW` — [true/false] сказать контроллеру, что у этого адаптера есть только html-файлы и нет main.js, как у рикши.
* `common.osDependologies.darwin` - массив пакетов OSX, необходимых для этого адаптера.
* `common.osDependologies.linux` — массив пакетов debian/centos, необходимых для этого адаптера (конечно, только ОС с apt, apt-get, yum в качестве менеджеров пакетов)
* `common.osDependologies.win32` — не используется, поскольку в Win32 нет менеджера пакетов.
* `common.os` — строка или массив поддерживаемых операционных систем, например. `["Linux", "Дарвин"]`
* `common.platform` — **обязательные** возможные значения: Javascript/Node.js, новые
* `common.preserveSettings` — строка (или массив) с именами общих для экземпляра атрибутов, которые не будут удалены. Например. "история", поэтому с помощью `setState("system.adapter.mqtt.0", {..})` поле `common.history` не будет удалено, даже если новый объект не имеет этого поля. Чтобы удалить атрибут, это должно быть явно сделано с помощью `common: {history: null}`.
* `common.pugins.sentry` — структура с данными конфигурации для плагина `sentry`
* `common.readme` — URL-адрес файла ReadMe.
* `common.restartAdapters` — массив с именами адаптеров, которые необходимо перезапустить после установки этого адаптера, например. ["вид"]
* `common.restartSchedule` - расписание CRON для перезапуска адаптеров `daemon` в режиме
* `common.schedule` - расписание CRON, если адаптер работает в режиме `schedule`.
* `common.serviceStates` — [true/false или путь], если адаптер может доставлять дополнительные состояния. Если да, будет вызван путь `adapter/lib/states.js`, который предоставит следующую функцию параметров (объекты, состояния, экземпляр, конфигурация, обратный вызов). Функция должна доставить массив точек со значениями типа `function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}`
* `common.singletonHost` - адаптер можно установить только один раз на один хост
* `common.singleton` - адаптер можно установить только один раз во всей системе.
* `common.statusStates` - Структура для индикации статуса в админке в виде `"statusStates": {"onlineId": "0.connected", "errorId": "hm-rpc.0.AB203424.0.error"}` . Вместо «onlineId» можно использовать «offlineId». Если идентификатор очень короткий (менее 2 точек), идентификатор будет рассматриваться как относительный к текущему объекту.
* `common.stopBeforeUpdate` — [true/false], если адаптер необходимо остановить перед обновлением
* `common.stopTimeout` - таймаут в мс для ожидания выключения адаптера. По умолчанию 500 мс.
* `common.stoppedWhenWebExtension` — если экземпляр имеет режим `daemon`, но работает как веб-расширение (`native.webInstance !== ''`), контроллер не запустит этот экземпляр, если `common.stoppedWhenWebExtension` имеет значение true.
* `common.subscribable` — для включения обновлений переменные этого адаптера должны быть подписаны с помощью sendTo.
* `common.subscribe` — имя переменной, на которую подписывается автоматически
* `common.supportCustoms` — [true/false], если адаптер поддерживает настройки для каждого состояния. В админке должен быть файл custom.html. Пример можно найти в `ioBroker.history`.
* `common.supportStopInstance`- [true/false], если адаптер поддерживает сигнал stopInstance (требуется **messagebox**). Сигнал будет отправлен до остановки на адаптер. (используется, если возникли проблемы с SIGTERM)
* `common.tier` — запуск экземпляра. Допустимые значения: 1, 2, 3. 1 — первый, 3 — последний.
* `common.titleLang` - **обязательное** более длинное имя адаптера на всех поддерживаемых языках, например `{en: 'Adapter', de: 'adapter', ru: 'Драйвер'}`
* `common.title` — (устарело) более длинное имя адаптера, отображаемое в администраторе.
* `common.type` — Тип адаптера. См. [Типы](adapterpublish.md).
* `common.unchanged` - (система), пожалуйста, не используйте этот флаг. Это флаг, информирующий систему о том, что диалоговое окно конфигурации должно быть показано в администраторе.
* `common.unsafePerm` — [true/false], если пакет должен быть установлен с параметром `npm --unsafe-perm`
* `common.version` - **обязательная** доступная версия
* `common.visWidgets` — описывает `vis2 реагирующие виджеты`. Например, `{"i18n": "comComponent", "vis2NAMEWidgets": { "name": "vis2NAMEWidgets", "url": "vis-2-widgets-NAME/customWidgets.js", "comComponents": [ "NAMEwidgetName" ]} }`
* `common.wakeup` — адаптер будет запущен, если какое-то значение будет записано в `system.adapter.NAME.x.wakeup`. Обычно адаптер должен остановиться после обработки события.
* `common.webByVersion` - показывать версию как префикс в веб-адаптере (обычно - `ip:port/material`, webByVersion - `ip:port/1.2.3/material`)
* `common.webExtendable` - [true/false], если веб-сервер в этом адаптере может быть расширен с помощью плагинов/расширений, таких как прокси, simple-api
* `common.webExtension` — относительное имя файла для подключения веб-расширения. Например. в `simple-api` `lib/simpleapi.js` относительно корневого каталога адаптера. Кроме того, необходимо указать, где это расширение будет включено, в `native.webInstance`. Пусто означает, что он должен работать как собственный веб-сервис. «*» означает, что каждый веб-сервер должен включать его.
* `common.webPreSettings` — список параметров, которые должны быть включены в info.js адаптером веб-сервера. (Пример материала)
* `common.webservers` — массив экземпляров веб-сервера, которые должны обслуживать контент из папки www адаптера.
* `common.welcomeScreen.order` — список дел
* `common.welcomeScreenPro` — то же, что `common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.welcomeScreen` - массив страниц, которые должны отображаться на "веб"-странице index.html. `["vis/edit.html", "vis/index.html"]` или `[{"link": "vis/edit.html", "name": "Vis editor", "img": "vis /img/edit.png", "color": "blue"}, "vis/index.html"]`
* `common.wwwDontUpload` - Не загружать в базу каталог www. Используется только для администратора. Вы можете просто назвать свой каталог как-нибудь по-другому и все в порядке.
* `protectedNative` — массив атрибутов конфигурации, которые будут доступны только собственному адаптеру, например. `["пароль"]`
* `encryptedNative` — массив атрибутов конфигурации, который будет автоматически шифроваться при сохранении на странице конфигурации администратора и автоматически расшифровываться во время выполнения адаптера, например `["пароль", "токен"]`
* `native` — предопределённые атрибуты, которые доступны в `index_m.html` и во время выполнения через `adapter.config.<attribute>`, например. `{"порт": 1234, "пароль": "секрет"}`

#### Условные сообщения
Если вы хотите, чтобы при обновлении с какой-то конкретной версии до новой конкретной версии сообщение должно было отображаться, вы можете определить `common.messages`.

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

* `common.host` - (обязательный) хост, на котором должен быть запущен адаптер - объект `system.host.&lt;host&gt;` должен существовать
* `common.enabled` - (обязательно)
* `common.mode` - (обязательные) возможные значения см. ниже

##### Адаптер/экземпляр common.mode
* `none` - этот адаптер не запускает процесс
* `daemon` - всегда запущенный процесс (будет перезапущен при выходе из процесса)
* `subscribe` - запускается, когда состояние `system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.alive` меняется на `true`. Уничтожается, когда `.alive` меняется на `false` и устанавливает для `.alive` значение `false` при выходе из процесса (не будет **не** перезапускаться при выходе из процесса)
* `schedule` - запускается по расписанию, найденному в `system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.schedule` - реагирует на изменения `.schedule` путем перепланирования с новым состоянием
* `once` — этот адаптер будет запускаться каждый раз при изменении объекта `system.adapter.yyy.x`. После завершения он не будет перезапущен.
* `extension` - этот адаптер не будет запускаться `js-контроллером`, но будет запущен веб-экземпляром. Веб-экземпляр может быть определен в `native.webInstance` как '*' (если в каждой сети) или как `web.x` для конкретного веб-экземпляра. (Примеры: `камеры, прокси`). Кроме того, в common.webExtension должен быть указан путь к файлу плагина.

#### Хозяин
Идентификатор: `system.host.<host>`

* `common.name` - т.е. `system.host.banana`
* `common.process`
* `общая.версия`
* `common.platform`
* `common.cmd`
* `common.hostname` - например. `банан`
* `common.address` — массив строк IP-адресов.

#### Конфиг
#### Скрипт
* `common.platform` - (обязательные) возможные значения `Javascript/Node.js` (подробнее)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) источник скрипта
* `common.engine` — (необязательно) экземпляр *script engine*, который должен запускать этот скрипт (например, «javascript.0») — если опущенный механизм выбирается автоматически

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательный) MD5-хеш пароля

#### Группа
* `common.name` - (обязательное) имя группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов.
* `common.desc` - (необязательно) описание назначения группы