---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: ovIWsqe+7cg6RvK5q11NvOCWd2v5FE2kaHeqq0SaH2E=
---
# Основная концепция
В ioBroker существуют два принципиально разных типа данных: так называемые **состояния** (`states`) и **объекты**.

Объекты представляют собой редко изменяющиеся и большие объемы данных, такие как метаданные системных устройств, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». Ниже приведена дополнительная информация о доступных типах объектов и обязательных атрибутах, необходимых для объекта определенного типа. Функции, такие как setObject, getObject и т. д., предоставляются вам модулем адаптера.

Состояния представляют собой часто изменяющиеся данные в вашей системе, например, включена или выключена лампа, зафиксировано ли движение датчиком движения, температура в вашей гостиной или нажата ли кнопка пульта дистанционного управления. В отличие от объектов, состояния могут использоваться для запуска действий и создания истории данных. Для работы с состояниями в адаптерном модуле имеется несколько функций, таких как `setState`, `getState` и так далее.

Для каждого состояния должен существовать соответствующий объект с `type=state`.

В следующих главах описывается схема базы данных.

## Идентификаторы
Идентификатор представляет собой строку максимальной длиной 240 байт, имеющую иерархическую структуру, уровни которой разделены точками.

Регулярное выражение, используемое для проверки символов, запрещенных к использованию в идентификаторах, можно найти по адресу [здесь](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e2dc20d89672ab505a495384c62869987/packages/common/src/lib/common/tools.ts#L137).

Идентификатор имеет несколько уровней. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - это пространство имен для системных объектов.
- `adapter` - пространство имен для конфигураций адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - это название адаптера.
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - название штата

## Пространства имен
* `system.` - Объекты и состояния системы
* `system.host.` - Процессы контроллера
* `system.config` - Системные настройки, например, язык по умолчанию.
* `system.meta.` - Метаданные системы
* `system.user.` - Пользователи
* `system.group.` - Группы
* `system.adapter.<adapter-name>` - конфигурация адаптера по умолчанию
* `<имя-адаптера>.` - объекты для конкретного адаптера.
* `<adapter-name>.meta.` - общие метаданные, используемые всеми экземплярами этого адаптера.
* `<имя-адаптера>.<номер-экземпляра>.` - Пространство имен экземпляра адаптера
* `enum.` - Перечисления
* `история` - Исторические данные
* `scripts.` - Скрипты движка скриптов
* `scripts.js` - JavaScript Script Engine Scripts
* `scripts.py` - Скриптовый движок Python (в будущем)

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

### Пространство имен system.host.<hostname>
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

## В состояниях `getState` метод и `stateChange` событие предоставляют объект со всеми атрибутами, кроме expire. Для `setState` метод содержит все атрибуты, кроме `val`, которые являются необязательными, а `from` устанавливается автоматически методом `setState`. `ack` по умолчанию имеет значение false, а `ts` и `lc` устанавливаются, как и ожидалось.
Важно отметить, что значение состояния типа `array`, `object`, `mixed` или `file` должно сериализоваться с использованием `JSON.stringify()`.

Атрибуты объекта `getState/stateChange/setState`:

* `val` - фактическое значение - может быть любого типа, допускающего кодирование в формате JSON.
* `ack` - логический флаг, указывающий, подтвердила ли целевая система полученное значение.
* `ts` - метка времени UNIX, указывающая на последнее обновление состояния (в миллисекундах)
* `lc` - метка времени UNIX, указывающая на последнее изменение фактического значения состояния (в миллисекундах)
* `from` - экземпляр адаптера, выполнивший `setState`.
* `user` - имя пользователя, задавшего значение.
* `expire` - целочисленное значение, которое можно использовать для установки состояний, истекающих через заданное количество секунд. Может использоваться только с `setValue`. После истечения срока действия значение исчезает из RedisDB.
* `c` - комментарий к изменению этого состояния.
* `q` - качество. Количество следующих состояний:

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

Каждое *состояние* должно быть представлено объектом типа `state`, содержащим метаданные для этого состояния. См. ниже.

## Объекты
### Обязательные атрибуты
Следующие атрибуты должны присутствовать в каждом объекте:

* `_id`
* `type` - возможные значения см. ниже
* `common` - объект, содержащий специфические для ioBroker свойства абстракции.
* `native` - объект, содержащий свойства, соответствующие целевой системе.

### Дополнительные атрибуты
* `common.name` - имя объекта (необязательно, но настоятельно рекомендуется его указать)

### Древовидная структура
Древовидная структура формируется автоматически по именам. Например, ```system.adapter.0.admin``` является родительским элементом для `system.adapter.0.admin.uptime`. Используйте это соглашение об именовании с точкой "." в качестве разделителя уровней.

### Типы объектов
* `state` - родительский объект должен быть типа канал, устройство, экземпляр или хост.
* `channel` - объект для группировки одного или нескольких состояний. Родительским элементом должно быть устройство.
* `device` - объект для группировки одного или нескольких каналов или состояний. Не должен иметь родительского объекта, кроме пространства имен экземпляра адаптера.
* `enum` - объекты, содержащие массив в `common.members`, указывающий на состояния, каналы, устройства или файлы. Перечисления могут иметь родительское перечисление (возможна древовидная структура).
* `host` - хост, на котором запущен процесс контроллера.
* `adapter` - конфигурация адаптера по умолчанию. Наличие также указывает на успешную установку адаптера. (Предложение: следует добавить атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родительский объект должен быть типа адаптер.
* `meta` - редко изменяющаяся метаинформация, необходимая адаптеру или его экземплярам.
* `config` - конфигурации
* `script` - скрипты
* `user` - пользователи
* `group` - группы
* `chart` - диаграммы
* `folder` - набор устройств или, возможно, что-то другое.
* `расписание` - расписание, например, событие в календаре.
* `design` - объект дизайна, используемый для `getObjectView`.

#### Атрибуты для конкретных типов объектов
##### Состояние
Атрибуты:

* `common.type` (необязательно - (по умолчанию `mixed` == любой тип) (возможные значения: `array`, `boolean`, `file`, `json`, `mixed`, `multistate`, `number`, `object`, `string`). В качестве исключения объекты с типом `meta` могут иметь `common.type=meta.user` или `meta.folder`. Важно отметить, что массивы, объекты, смешанные типы и файлы должны сериализоваться с помощью `JSON.stringify()`.
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательно) - интервал увеличения/уменьшения. Например, 0,5 для термостата.
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательно - если задано значение `common.def`, оно используется в качестве флага подтверждения, `js-controller` 2.0.0+)
* `common.desc` (необязательно, строка или объект) - описание, объект для многоязычного описания
* `common.read` (логическое значение, обязательное) - true, если состояние доступно для чтения
* `common.write` (логическое значение, обязательное) - true, если состояние доступно для записи
* `common.role` (строка, обязательный параметр) - роль состояния (используется в пользовательских интерфейсах для указания того, какой виджет выбрать, см. ниже)
* `common.states` (необязательно) - предоставляет дополнительную информацию о допустимых значениях для штатов с типами данных string и number:
* Для чисел **без** указанных параметров common.min/common.max: содержит список допустимых числовых значений и их (отображаемую) метку в виде объекта в формате `{0: 'OFF', 1: 'ON', '-1': 'whatever'}`. Допускаются только эти значения.
* Для чисел, для которых указаны `common.min` и/или `common.max`: допустимый диапазон чисел определяется атрибутами min/max. Этот атрибут содержит список «специальных» числовых значений и их (отображаемую) метку в виде объекта, например, `{0: 'OFF', 254: 'ON', 255: 'BLINK'}` (min=0, max=255). Допускается указание только min или max, при этом отсутствующий предел принимается равным +/- бесконечности (+/- бесконечность не включается).
* Для строк содержит список допустимых значений и их (отображаемую) метку в виде объекта, например, `{'value': 'valueName', 'value2': 'valueName2'}`. Допускаются только эти значения.
* ~~для строк содержит список допустимых значений в виде массива, например, `['Start', 'Flight', 'Land']` (что фактически эквивалентно `{'Start': 'Start', 'Flight': 'Flight', 'Land': 'Land'}`). Допускаются только эти значения~~ (**устарело**)
* В настоящее время (начиная с js-controller 4.0) эти значения не проверяются и не подтверждаются самим js-controller и используются только для пользовательских интерфейсов и визуализаций.
* `common.workingID` (строка, необязательно) - если для этого состояния есть вспомогательное состояние WORKING. Здесь необходимо указать полное имя или только последнюю часть, если первые части совпадают с фактическими. Используется для `HM.LEVEL` и обычно имеет значение `WORKING`.
* `common.custom` (необязательно) - структура с пользовательскими настройками для конкретных адаптеров. Например, `{"influxdb.0": {"enabled": true, "alias": "name"}}`. Атрибут `enabled` обязателен, и если он не равен true, весь атрибут будет удален.

##### Штат `common.role`
* `common.role` (указывает, как это состояние должно отображаться в пользовательском интерфейсе)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
Предложение: объекты канала `common.role` должны/могут подразумевать набор обязательных и/или необязательных объектов дочерних состояний.

Возможные значения:

* `info` - Курс валюты или акций, цены на топливо, адрес почтового ящика и тому подобное.
* `календарь` -
* `прогноз` - прогноз погоды

* `медиа - общий медиаканал
* `media.music` - медиаплеер, например, SONOS, YAMAHA и т.д.
* `media.tv` - ТВ
* `media.tts` - преобразование текста в речь

* `термо` - Мониторинг или контроль температуры, влажности и т. д.
* `thermo.heat`
* `thermo.cool`

* `blind` - Управление оконными жалюзи

* `свет`
* `light.dimmer` - Диммер освещения
* `light.switch` - Выключатель света.
* `light.color` - Управление освещением с возможностью изменения цвета.
* `light.color.rgb` - Установка цвета в формате RGB
* `light.color.rgbw` - Установка цвета в формате RGBW
* `light.color.hsl` - Установка цвета в параметрах Оттенок/Насыщенность/Яркость (Оттенок цвета свет - LivingColors...)
* `light.color.hslct` - Установка цвета в параметрах Оттенок/Насыщенность/Яркость или Цветовая температура (расширенный цветовой режим Hue)
* `light.color.ct` - цветовая температура в К

* `switch` - Некий универсальный переключатель

* `датчик` - Например, датчик открытия окна или двери, датчик протечки воды, датчик пожара
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, заблокировать
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true (сигнал тревоги), false (сигнал тревоги отсутствует)
* `sensor.fire` - true (сигнал тревоги), false (сигнал тревоги отсутствует)
* `sensor.CO2` - true (сигнал тревоги), false (сигнал тревоги отсутствует)

*

* `сигнал тревоги` - какой-то сигнал тревоги

* `phone` - fritz!box, speedport и так далее

* `кнопка` - как настенный выключатель или пульт от телевизора, где каждая кнопка представляет собой состояние, например, .play, .stop, .pause.
* `remote` - пульт дистанционного управления для телевизора или другого устройства, состояние которого представляет собой строку с нажатыми значениями, например, "PLAY", "STOP", "PAUSE".

* `meta` - Информация об устройстве
* `meta.version` - версия устройства
* `meta.config` - конфигурация с устройства
* ...

#### Описание каналов
Названия атрибутов могут быть заданы адаптером произвольно, за исключением тех, которые написаны жирным шрифтом.

"W" - common.write=true

«М» - Обязательно

##### Дополнительные состояния для каждого канала/устройства
```json5
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
       "role":  "indicator.working",     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

```json5
// state-direction (optional). The state can have the following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction",            // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

```json5
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
       "role":  "indicator.maintenance", // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
```

```json5
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
       "role":  "indicator.maintenance.unreach", // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### `light.switch` - Описание атрибутов
| **Имя** | **Общая роль** | **М** | **Ж** | **Общий тип** | **Описание** |
|-------------|:--------------------------|:-----:|:-----:|-----------------|-------------------------------------|
| состояние | переключатель | X | X | логическое значение | |
| описание | текстовое описание | | | | |
| ммм | indicator.maintenance.mmm | | | | mmm = низкий уровень заряда батареи, недостижимый или что-то подобное |

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
| **Имя** | **Общая роль** | **М** | **Ж** | **Общий тип** | **Описание** |
| `ringing_number` | `text.phone_number` | | | `string` | |
| `ringing` | `indicator` | | | `boolean` | |
| `звон` | `индикатор` | | | `логическое значение` | |

...

#### Устройство
#### Перечисление
* `common.members` - (необязательный) массив идентификаторов участников перечисления

#### Мета
ИДЕНТИФИКАТОР

* `*&lt;adapter-name&gt;.&lt;instance-number&gt;.meta.&lt;meta-name&gt;*`
* `*&lt;adapter-name&gt;.meta.&lt;meta-name&gt;*`
* `system.*meta.&lt;meta-name&g;*`

#### Адаптер
ID: `system.adapter.<adapter.name>`

*Примечание:* все флаги являются необязательными, за исключением тех, которые специально помечены как **обязательные**.

* `common.adminColumns` - пользовательские атрибуты, которые должны отображаться в административной панели в обозревателе объектов. Например: `[{"name": {"en": "KNX address"}, "path": "native.address", "width": 100, "align": "left"}, {"name": "DPT", "path": "native.dpt", "width": 100, "align": "right", "type": "number", "edit": true, "objTypes": ["state", "channel"]}]`. `type` - это тип атрибута (например, строка, число, логическое значение) и требуется только в том случае, если включен режим редактирования. `objTypes` - это список типов объектов, которые могут иметь такой атрибут. Используется только в режиме редактирования.
* `common.adminTab.fa-icon` - (устаревшее) имя иконки Font-Awesome для вкладки.
* `common.adminTab.icon` - (необязательно) ссылка на иконку или иконку вкладки, закодированную в base64. Может быть в формате SVG.
* `common.adminTab.ignoreConfigUpdate` - не обновлять вкладку конфигурации, если конфигурация изменилась (чтобы включить настройку параметров на вкладке).
* `common.adminTab.link` - ссылка для iframe на вкладке. Вы можете использовать замену параметров следующим образом: `http://%ip%:%port%`. IP-адрес будет заменен IP-адресом хоста. `port` будет извлечен из `native.port`.
* `common.adminTab.name` - имя вкладки в административной панели
* `common.adminTab.singleton` - [true/false] если адаптер имеет вкладку для администрирования. Будет отображаться только одна вкладка для всех экземпляров.
* `common.adminUI.config` - [none/json/materialize/html] тип пользовательского интерфейса конфигурации. Если не определено, адаптер будет отображаться в формате HTML. (В папке `admin` ожидаются файлы `jsonConfig.json` или `jsonConfig.json5` от `json`, `index_m.html` от `materialize`, `index.html` от `html`)
* `common.adminUI.custom` - [none/json] тип пользовательского интерфейса конфигурации. Если не определено, пользовательский интерфейс отображаться не будет. Использовать можно только `jsonCustom.json` или `jsonCustom.json5` из папки `admin`.
* `common.adminUI.tab` - тип [none/html] интерфейса вкладок. Файлы `tab.html` или `tab_m.html` расширяются в папке `admin`, если они определены как `html`.
* `common.allowInit` - [true/false] разрешить вызов «запланированного» адаптера «не по расписанию», если настройки изменились или адаптер был запущен. Или разрешить запуск запланированного адаптера один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` - значения для `common.mode`, если возможно более одного режима.
* `common.blockly` - [true/false] если адаптер содержит пользовательские блоки для Blockly. (требуется файл `admin/blockly.js`)
* `common.compact` - сообщает контроллеру, что этот адаптер при желании можно запустить в том же процессе.
* `common.config.height` - высота по умолчанию для диалогового окна конфигурации (устарело - действительно только для admin2)
* `common.config.minHeight` - минимальная высота для диалогового окна конфигурации (устарело - действительно только для admin2)
* `common.config.minWidth` - минимальная ширина для диалога конфигурации (устарело - действительно только для admin2)
* `common.config.width` - ширина по умолчанию для диалога конфигурации (устарело - действительно только для admin2)
* `common.connectionType` - Тип подключения к устройству: `local/cloud`. См. также `common.dataSource`.
* `common.dataFolder` - папка относительно iobroker-data, где адаптер хранит данные. Эта папка будет автоматически резервироваться и восстанавливаться. Вы можете использовать в ней переменную `%INSTANCE%`.
* `common.dataSource` - Способ получения данных с устройства: `poll/push/assumption`. Важно использовать его вместе с `connectionType`.
* `common.dependencies` - массив типа `[{"js-controller": ">=2.0.0"}]`, описывающий, какие модули ioBroker необходимы для этого адаптера на том же хосте.
* `common.disableDataReporting` - Не сообщать об ошибках через `sentry` для этого экземпляра
* `common.docs` - структура, подобная `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md"]}`, описывающая документацию, если она отсутствует в `README.md`.
* `common.enabled` - **обязательно** Значение [true/false] должно быть false, чтобы новые экземпляры отключались по умолчанию.
* `common.engineTypes` - устарело. Используйте engine в package.json.
* `common.eraseOnUpload` - удаляет все предыдущие данные в каталоге перед загрузкой.
* `common.expert` - отображать этот объект только в экспертном режиме в административной панели.
* `common.extIcon` - ссылка на внешний значок для неустановленных адаптеров. Обычно находится на GitHub.
* `common.getHistory` - [true/false] если адаптер поддерживает сообщение getHistory
* `common.globalDependencies` - массив типа `[{"admin": ">=2.0.0"}]`, описывающий, какие модули ioBroker необходимы для этого адаптера на одном из хостов.
* `common.icon` - имя локального значка (должен находиться в подкаталоге "admin")
* `common.ignoreVersion` - Не отображать значок обновления для этого адаптера для данной конкретной версии
* `common.installedVersion` - не используйте это значение, оно будет установлено только внутри системы.
* `common.jsonConfig` - Этот адаптер поддерживает admin5 и предоставляет файл admin/jsonConfig.json с описанием структуры диалогового окна конфигурации.
* `common.jsonCustom` - Этот адаптер поддерживает admin5 и предоставляет файл admin/jsonCustom.json с описанием структуры пользовательских настроек.
* `common.keywords` - Аналогично ключевым словам в package.json, но может быть определено на многих языках. Просто массив.
* `common.localLink` - устарело. Используйте `common.localLinks`.
* `common.localLinks` - ссылка на веб-сервис этого адаптера. Например, на http://localhost:5984/_utils для футона из административной панели.
* `common.logTransporter` - если этот адаптер получает журналы от других хостов и адаптеров (например, для их хранения где-либо)
* `common.loglevel` - debug, info, warn или error
* `common.main` - **Устарело** Используйте main в package.json.
* `common.materializeTab` - если адаптер поддерживает > admin3 для вкладки (стиль materialize)
* `common.materialize` - если адаптер поддерживает > admin3 (стиль materialize)
* `common.messagebox` - true, если поддерживается окно сообщений. Таким образом, адаптер может получать сообщения sendTo (используется для электронной почты, pushover и т. д.).
* `common.messages` - Условные сообщения при обновлении. Подробнее см. [Условные сообщения](#conditional-messages).
* `common.mode` - **обязательно**, возможные значения см. ниже
* `common.name` - **обязательно** имя адаптера без "ioBroker".
* `common.noConfig` - [true/false] не показывать диалоговое окно конфигурации для экземпляра
* `common.noIntro` - никогда не отображать экземпляры этого адаптера на экране «Введение/Обзор» в админке (например, значки, виджеты).
* `common.noRepository` - [true/false] если адаптер поставляется с первоначальной установкой или имеет собственный репозиторий
* `common.nogit` - если true, установка непосредственно из GitHub невозможна.
* `common.nondeletable` - [true/false] Этот адаптер нельзя удалить или обновить. Он будет обновлен вместе с контроллером.
* `common.npmLibs` - устарело. Используйте `dependencies` в файле package.json.
* `common.onlyWWW` - [true/false] сообщает контроллеру, что адаптер содержит только HTML-файлы и не имеет файла main.js, как, например, rickshaw.
* `common.osDependencies.darwin` - массив пакетов OSX, необходимых для этого адаптера.
* `common.osDependencies.linux` - массив пакетов Debian/CentOS, необходимых для этого адаптера (разумеется, только для ОС с менеджерами пакетов apt, apt-get, yum).
* `common.osDependencies.win32` - не используется, поскольку в win32 отсутствует менеджер пакетов.
* `common.os` - строка или массив поддерживаемых операционных систем, например, `["linux", "darwin"]`
* `common.platform` - **обязательно** Возможные значения: Javascript/Node.js, список будет пополняться
* `common.preserveSettings` - строка (или массив) с именами атрибутов, общих для данного экземпляра, которые не будут удалены. Например, "history", поэтому с помощью `setState("system.adapter.mqtt.0", {..})` поле `common.history` не будет удалено, даже если у нового объекта нет этого поля. Чтобы удалить атрибут, это необходимо сделать явно с помощью `common: {history: null}`.
* `common.pugins.sentry` - структура с данными конфигурации для плагина `sentry`.
* `common.readme` - URL файла ReadMe
* `common.restartAdapters` - массив с именами адаптеров, которые необходимо перезапустить после установки данного адаптера, например, ["vis"].
* `common.restartSchedule` - расписание CRON для перезапуска адаптеров `демона` в режиме реального времени
* `common.schedule` - расписание CRON, если адаптер работает в режиме `schedule`.
* `common.serviceStates` - [true/false или путь], если адаптер может передавать дополнительные состояния. Если да, будет вызван путь `adapter/lib/states.js`, который передаст следующие параметры функции (объекты, состояния, экземпляр, конфигурация, обратный вызов). Функция должна передавать массив точек со значениями, например: `function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}`
* `common.singletonHost` - адаптер можно установить только один раз на одном хосте.
* `common.singleton` - адаптер можно установить только один раз во всей системе.
* `common.smartName` - относится к IoT-адаптеру для хранения настроек Alexa и других устройств.
* `common.statusStates` - структура для индикации статуса в административной панели в форме `"statusStates": {"onlineId": "0.connected", "errorId": "hm-rpc.0.AB203424.0.error"}`. Вместо `onlineId` можно использовать `offlineId`. Если ID очень короткий (менее двух точек), то он будет рассматриваться как относительный к текущему объекту.
* `common.stopBeforeUpdate` - [true/false] если адаптер необходимо остановить перед обновлением
* `common.stopTimeout` - время ожидания в миллисекундах до выключения адаптера. Значение по умолчанию: 500 мс.
* `common.stoppedWhenWebExtension` - Если экземпляр имеет режим `daemon`, но работает как веб-расширение (`native.webInstance !== ''`), контроллер не запустит этот экземпляр, если `common.stoppedWhenWebExtension` имеет значение true.
* `common.subscribable` - переменные этого адаптера должны быть подписаны с помощью sendTo для включения обновлений.
* `common.subscribe` - имя переменной, на которую осуществляется автоматическая подписка.
* `common.supportCustoms` - [true/false] указывает, поддерживает ли адаптер настройки для каждого штата. Необходимо наличие файла custom.html в административной панели. Пример можно найти в `ioBroker.history`.
* `common.supportStopInstance` - [true/false] если адаптер поддерживает сигнал stopInstance (**messagebox** обязателен). Сигнал будет отправлен адаптеру перед остановкой. (используется, если возникли проблемы с SIGTERM)
* `common.tier` - порядок запуска экземпляров. Допустимые значения: 1, 2, 3. 1 - первый, 3 - последний.
* `common.titleLang` - **обязательно** более длинное имя адаптера на всех поддерживаемых языках, например `{en: 'Adapter', de: 'adapter', ru: 'Драйвер'}`
* `common.title` - (устаревшее) более длинное имя адаптера для отображения в админке
* `common.type` - Тип адаптера. См. [Типы](adapterpublish.md)
* `common.unchanged` - (система) пожалуйста, не используйте этот флаг. Это флаг, сообщающий системе, что диалоговое окно конфигурации должно отображаться в административной панели.
* `common.unsafePerm` - [true/false] если пакет необходимо установить с параметром `npm --unsafe-perm`
* `common.version` - **обязательно** доступная версия
* `common.visWidgets` - описывает `vis2 react widgets`. Например, `{"i18n": "component", "vis2NAMEWidgets": { "name": "vis2NAMEWidgets", "url": "vis-2-widgets-NAME/customWidgets.js", "components": [ "NAMEwidgetName"]} }`
* `common.wakeup` - Адаптер будет запущен, если в `system.adapter.NAME.x.wakeup` будет записано какое-либо значение. Обычно адаптер должен остановиться после обработки события.
* `common.webByVersion` - отображает версию в качестве префикса в веб-адаптере (обычно - `ip:port/material`, webByVersion - `ip:port/1.2.3/material`)
* `common.webExtendable` - [true/false] если веб-сервер в этом адаптере может быть расширен с помощью плагинов/расширений, таких как proxy, simple-api
* `common.webExtension` - относительное имя файла для подключения веб-расширения. Например, в `simple-api` `lib/simpleapi.js` относительно корневого каталога адаптера. Кроме того, необходимо указать `native.webInstance`, где будет включено это расширение. Пустое значение означает, что оно должно работать как отдельный веб-сервис. "*" означает, что каждый веб-сервер должен его включать.
* `common.webPreSettings` - список параметров, которые должны быть включены в файл info.js адаптером веб-сервера. (Пример материала)
* `common.webservers` - массив экземпляров веб-сервера, которые должны предоставлять контент из папки www адаптера.
* `common.welcomeScreen.order` - todo
* `common.welcomeScreenPro` - Аналогично `common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.welcomeScreen` - массив страниц, которые должны отображаться на веб-странице index.html. `["vis/edit.html", "vis/index.html"]` или `[{"link": "vis/edit.html", "name": "Vis editor", "img": "vis/img/edit.png", "color": "blue"}, "vis/index.html"]`
* `common.wwwDontUpload` - Не загружать в базу данных каталог www. Используется только для администратора. Вы можете просто назвать свой каталог как-нибудь иначе, и всё будет в порядке.
* `protectedNative` - массив атрибутов конфигурации, доступ к которым будет иметь только собственный адаптер, например, `["password"]`
* `encryptedNative` - массив атрибутов конфигурации, которые будут автоматически зашифрованы при сохранении через страницу конфигурации администратора и автоматически расшифрованы во время работы адаптера, например, `["password", "token"]`
* `native` - предопределенные атрибуты, доступные в `index_m.html` и во время выполнения через `adapter.config.<attribute>`, например, `{"port": 1234, "password": "secret"}`

#### Условные сообщения (`common.messages`)

#### Условные сообщения (`common.messages`)
Вы можете определить **условные сообщения**, которые отображаются пользователю при обновлении адаптера.
Эти сообщения могут зависеть от старой версии, новой версии или даже от наличия других адаптеров.

##### Структура
```jsonc
"messages": {
  "condition": {
    "operand": "and", // "and" = all rules must be true, "or" = at least one must be true
    "rules": [
      "oldVersion<=1.0.44",   // condition using the old version
      "newVersion>=1.0.45"    // condition using the new version
    ]
  },
  "title": {
    "en": "Important notice"
  },
  "text": {
    "en": "Main text shown to the user"
  },
  "link": "https://iobroker.net/www/pricing", // optional
  "buttons": ["agree", "cancel", "ok"],       // optional. If missing, the message only appears in the changelog
  "linkText": {
    "en": "More info"                         // optional text for the link
  },
  "level": "warn" // one of: "info", "warn", "error"
}
```

##### Поддерживаемые правила
Правила представляют собой строки внутри массива `rules`. Примеры:

* **Проверка версий**

* `"oldVersion<=1.0.44"` - старая версия меньше или равна 1.0.44
* `"newVersion>=1.0.45"` - новая версия больше или равна 1.0.45

*(операторы: `<`, `>`, `<=`, `>=`, `==`, `!=`)*

* **Установленное состояние**

* `"installed"` - true, если адаптер уже был установлен
* `"not-installed"` или `"!"` - true, если адаптер не был установлен

* **Другие адаптеры**

* `"vis-2>=1.0.0"` - true, если адаптер `vis-2` установлен с версией ≥ 1.0.0
* `"vis"` - true, если установлен адаптер `vis`.
* `"!vis-2"` - true, если адаптер `vis-2` не установлен

##### Справочник правил
| Пример правила | Значение |
|------------------------|-----------------------------------------------------------|
| `oldVersion<=1.0.44` | Текущая установленная версия ≤ 1.0.44 |
| `newVersion>=1.0.45` | Устанавливаемая версия ≥ 1.0.45 |
| `newVersion==2.0.0` | Устанавливаемая версия - ровно 2.0.0 |
| `installed` | True, если адаптер уже установлен (любой версии) |
| `not-installed` или `!` | True, если адаптер не был установлен ранее |
| `vis-2>=1.0.0` | True, если адаптер `vis-2` установлен с версией ≥ 1.0.0 |
| `vis` | True, если установлен адаптер `vis` (любой версии) |
| `!vis-2` | True, если адаптер `vis-2` **не** установлен |
| `!vis-2` | True, если адаптер `vis-2` **не** установлен |

###### Поддерживаемые операторы
* `==` - равен
* `!=` - не равно
* `<` - меньше
* `<=` - меньше или равно
* `>` - больше чем
* `>=` - больше или равно

###### Операнд
* «и» → все правила должны быть верны
* «или» → должно выполняться хотя бы одно правило

##### Примеры
###### Пример 1: Отображать сообщение только при обновлении с версии ≤1.0.44 до ≥1.0.45
```json
{
    "messages": {
        "condition": {
            "operand": "and",
            "rules": [
                "oldVersion<=1.0.44",
                "newVersion>=1.0.45"
            ]
        },
        "title": { "en": "Important update" },
        "text": { "en": "Please read before continuing." },
        "level": "warn"
    }
}
```

###### Пример 2: Отобразить сообщение, если адаптер только что установлен.
```json
{
    "messages": {
        "condition": {
            "operand": "or",
            "rules": ["not-installed"]
        },
        "title": { "en": "Welcome!" },
        "text": { "en": "Thanks for installing this adapter." },
        "level": "info"
    }
}
```

###### Пример 3: Отобразить сообщение, если требуется другой адаптер
```json
{
    "messages": {
        "condition": {
            "operand": "and",
            "rules": ["vis-2>=1.0.0"]
        },
        "title": { "en": "Dependency notice" },
        "text": { "en": "This adapter requires vis-2 version 1.0.0 or higher." },
        "link": "https://example.com/setup-guide",
        "linkText": { "en": "Setup guide" },
        "level": "error"
    }
}
```

##### Тестирование и отладка
Для проверки сообщений и правил их обработки, например, в среде «сервера разработки», необходимо выполнить следующие шаги:

- Укажите будущий номер версии, под которым должно отображаться сообщение. Этот номер версии будет выбран позже в процессе выпуска.
- Добавьте объект `common.messages` в файл `io-packages.json` в соответствии с описанием.
- При необходимости укажите ранее определенный номер версии в объекте `common.messages`.
- Добавьте запись о внесенных изменениях в объект `common.news`, используя указанный номер версии. Эта информация о внесенных изменениях будет впоследствии отображаться в диалоговом окне обновления вместе с информацией из объекта `common.messages`.
- Включите экспертный режим в iobroker тестовой среды.
- В представлении объекта откройте следующую точку данных: `system.repositories`.
- В целях безопасности, а также из-за большого размера объекта, рекомендуется скопировать его содержимое и отредактировать его в редакторе JSON (например, VS Code или Notepad++).
- В редакторе найдите существующий объект адаптера.
- В найденном объекте измените следующую информацию:
- `версия` -> с номером версии, указанным выше
- `news` -> добавить запись в журнал изменений для указанного номера версии
- `messages` -> вставить подготовленный объект сообщения из `io-packages.json`.
- Во избежание проблем результат следует проверить в валидаторе JSON.
- Затем скопируйте результат обратно в объект "system.repositories" и сохраните его.
- Откройте или обновите вкладку «Адаптер» в административном интерфейсе.
- Обновленная версия теперь должна отображаться как доступная для обновления адаптера.
- После нажатия кнопки обновления адаптера информация из объекта сообщения должна отобразиться в диалоговом окне через короткое время.
- Поскольку эта версия ещё недоступна в npm, нажатие кнопки обновления приведёт к ошибке, и диалоговое окно следует закрыть.

#### Пример
ID: `system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;`

* `common.host` - (обязательно) хост, на котором должен быть запущен адаптер - объект `system.host.<host>` должен существовать
* `common.enabled` - (обязательно)
* `common.mode` - (обязательно) возможные значения см. ниже

##### Адаптер/экземпляр common.mode
* `none` - этот адаптер не запускает процесс
* `daemon` - постоянно запущенный процесс (будет перезапущен, если процесс завершится)
* `subscribe` - запускается, когда состояние `system.adapter.<adapter-name>.<instance-number>.alive` изменяется на `true`. Завершается, когда `.alive` изменяется на `false`, и устанавливает `.alive` в `false`, если процесс завершается (**не** перезапускается при завершении процесса).
* `schedule` - запускается расписанием, найденным в `system.adapter.<adapter-name>.<instance-number>.schedule` - реагирует на изменения `.schedule`, перепланируя выполнение с новым состоянием.
* `once` - этот адаптер будет запускаться каждый раз при изменении объекта `system.adapter.yyy.x`. После завершения работы он не будет перезапускаться.
* `extension` - этот адаптер будет запускаться не `js-controller`, а экземпляром веб-приложения. Экземпляр веб-приложения может быть определен в `native.webInstance` как '*' (если он присутствует во всех веб-приложениях) или как `web.x` для конкретного экземпляра веб-приложения. (Примеры: `cameras, proxy`). Кроме того, в `common.webExtension` необходимо указать путь к файлу плагина.

#### Хозяин
ID: `system.host.<host>`

* `common.name` - например, `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - например, `banana`
* `common.address` - массив строк IP-адресов

#### Конфигурация
#### Скрипт
* `common.platform` - (обязательно) возможные значения `Javascript/Node.js` (будут добавлены другие)
* `common.enabled` - (обязательно) указывает, активирован скрипт или нет
* `common.source` - (обязательно) исходный код скрипта
* `common.engine` - (необязательно) экземпляр *движка скриптов*, который должен запускать этот скрипт (например, 'javascript.0') - если он опущен, движок выбирается автоматически.

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательно) MD5-хеш пароля

#### Группа
* `common.name` - (обязательно) название группы
* `common.members` - (обязательный) массив идентификаторов объектов пользователей
* `common.desc` - (необязательно) описание назначения группы