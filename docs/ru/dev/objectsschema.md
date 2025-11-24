---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: oOWjcIwxoEZMeT171Acl2qKPo6M5YiunUkx1Z6o+dk8=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных: так называемые **состояния**(`states`) и **объекты**.

Объекты представляют собой редко изменяющиеся и большие данные, такие как метаданные системных устройств, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». Ниже приведена дополнительная информация о доступных типах объектов и обязательных атрибутах, необходимых объекту определённого типа. Такие функции, как setObject, getObject и т. д., предоставляются модулем адаптера.

Состояния представляют собой часто меняющиеся данные в вашей системе, например, горит ли лампа, зафиксировал ли датчик движения какое-либо движение, измеряется ли температура в гостиной или нажата ли кнопка пульта дистанционного управления. В отличие от объектов, состояния могут использоваться для запуска действий и создавать историю событий. Для работы с состояниями в модуле адаптера предусмотрено несколько функций, таких как `setState`, `getState` и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

В следующих главах описывается схема базы данных.

## Идентификаторы
Идентификатор — это строка длиной не более 240 байт, иерархически структурированная, уровни разделены точками.

Регулярное выражение, используемое для проверки символов, запрещенных к использованию в идентификаторах, можно найти [здесь](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e2dc20d89672ab505a495384c62869987/packages/common/src/lib/common/tools.ts#L137).

Идентификатор имеет несколько уровней. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - это пространство имен для системных объектов
- `adapter` - пространство имен для конфигураций адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - это имя адаптера
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - имя состояния

## Пространства имен
* `system.` - Системные объекты и состояния
* `system.host.` - Процессы контроллера
* `system.config.` — системные настройки, такие как язык по умолчанию
* `system.meta.` - Системные метаданные
* `system.user.` - Пользователи
* `system.group.` - Группы
* `system.adapter.<имя-адаптера>` - конфигурация адаптера по умолчанию
* `<имя-адаптера>.` - объекты для конкретного адаптера.
* `<имя-адаптера>.meta.` - общие метаданные, используемые всеми экземплярами этого адаптера
* `<имя-адаптера>.<номер-экземпляра>.` — пространство имен экземпляров адаптеров
* `enum.` - Перечисления
* `history.` - Данные истории
* `scripts.` - Скрипты движка скриптов
* `scripts.js.` - скрипты движка скриптов javascript
* `scripts.py.` - скрипты движка скриптов Python (будущие)

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

## Метод `getState` и событие `stateChange` доставляют объект со всеми атрибутами, за исключением истечения срока действия для метода `setState`; все, кроме `val`, является необязательным, `from` устанавливается автоматически методом `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` устанавливаются, как и ожидалось
Важно отметить, что значение состояния типа `array`, `object`, `mixed` или `file` должно быть сериализовано с использованием `JSON.stringify()`.

Атрибуты объекта `getState/stateChange/setState`:

* `val` — фактическое значение — может быть любого типа, «кодируемого» в формате JSON
* `ack` — логический флаг, указывающий, подтвердила ли целевая система значение
* `ts` — метка времени UNIX, указывающая последнее обновление состояния (в миллисекундах)
* `lc` — метка времени UNIX, указывающая последнее изменение фактического значения состояния (в миллисекундах)
* `from` - экземпляр адаптера, выполнивший `setState`
* `user` - имя пользователя, установившего значение
* `expire` — целочисленное значение, которое можно использовать для установки состояний, срок действия которых истекает через заданное количество секунд. Может использоваться только с `setValue`. После истечения срока действия значение удаляется из RedisDB.
* `c` - комментарий к данному изменению состояния.
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
* `common` - объект, содержащий специфические для ioBroker свойства абстракции
* `native` - объект, содержащий конгруэнтные свойства целевой системы

### Необязательные атрибуты
* `common.name` - имя объекта (необязательно, но настоятельно рекомендуется заполнять)

### Древовидная структура
Древовидная структура формируется автоматически по именам. Например, ```system.adapter.0.admin``` является родительским для `system.adapter.0.admin.uptime`. Используйте это соглашение об именах с точкой «.» в качестве разделителя уровней.

### Типы объектов
* `state` - родительский элемент должен иметь тип канал, устройство, экземпляр или хост
* `channel` — объект для группировки одного или нескольких состояний. Родительский элемент должен быть устройством.
* `device` — объект для группировки одного или нескольких каналов или состояний. Не должен иметь родительского объекта, кроме пространства имён экземпляра адаптера.
* `enum` — объекты, содержащие массив в `common.members`, который указывает на состояния, каналы, устройства или файлы. Перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` - хост, на котором запущен процесс контроллера
* `adapter` — конфигурация адаптера по умолчанию. Наличие также указывает на то, что адаптер успешно установлен. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родительский элемент должен иметь тип адаптер.
* `meta` - редко изменяющаяся метаинформация, которая нужна адаптеру или его экземплярам
* `config` - конфигурации
* `script` - скрипты
* `пользователь` - пользователи
* `group` - группы
* `chart` - диаграммы
* `folder` - группа устройств или может быть что-то ещё.
* `schedule` - расписание, например, событие календаря
* `design` - объект дизайна, используемый для `getObjectView`

#### Атрибуты для определенных типов объектов
##### Состояние
Атрибуты:

* `common.type` (необязательно - (по умолчанию `mixed`==любой тип) (возможные значения: `array`, `boolean`, `file`, `json`, `mixed`, `multistate`, `number`, `object`, `string`). В качестве исключения объекты с типом `meta` могут иметь `common.type=meta.user` или `meta.folder`. Важно отметить, что array, object, mixed и file должны быть сериализованы с помощью `JSON.stringify()`.
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательно) — интервал увеличения/уменьшения. Например, 0,5 для термостата.
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательно — если установлено `common.def`, это значение используется как флаг подтверждения, `js-controller` 2.0.0+)
* `common.desc` (необязательно, строка или объект) - описание, объект для многоязычного описания
* `common.read` (логическое значение, обязательное) — true, если состояние доступно для чтения
* `common.write` (логическое значение, обязательное) — true, если состояние доступно для записи
* `common.role` (строка, обязательная) — роль состояния (используется в пользовательских интерфейсах для указания, какой виджет выбрать, см. ниже)
* `common.states` (необязательно) — предоставляет больше контекста о допустимых значениях для состояний с типами данных string и number:
* для чисел, **не** указанных в common.min/common.max: содержит список допустимых числовых значений и их (отображаемые) метки в виде объекта в формате `{0: 'ВЫКЛ', 1: 'ВКЛ', '-1': 'любое'}`. Разрешены только эти значения.
* для чисел, для которых **указаны** `common.min` **и/или** common.max: допустимый диапазон чисел определяется min/max. Этот атрибут содержит список «специальных» числовых значений и их (отображаемые) метки в виде объекта, например, `{0: 'ВЫКЛ', 254: 'ВКЛ', 255: 'МИГАЕТ'}` (min=0, max=255). Разрешается указывать только min **или** max, при этом недостающее ограничение принимается равным +/-бесконечности (+/-бесконечность не учитывается).
* для строк содержит список допустимых значений и их (отображаемую) метку в виде объекта, например `{'value': 'valueName', 'value2': 'valueName2'}`. Допустимы только эти значения.
* для строк содержит список допустимых значений в виде массива типа `['Start', 'Flight', 'Land']` (что фактически то же самое, что `{'Start': 'Start', 'Flight': 'Flight', 'Land': 'Land'}`). Разрешены только эти значения.
* В настоящее время (начиная с версии js-controller 4.0) эти значения не проверяются и не валидируются js-controller и предназначены только для пользовательских интерфейсов и визуализаций.
* `common.workingID` (строка, необязательно) — если у этого состояния есть вспомогательное состояние WORKING. Здесь должно быть указано полное имя или только последняя часть, если первые части совпадают с фактическими. Используется для `HM.LEVEL` и обычно имеет значение `WORKING`.
* `common.custom` (необязательно) — структура с пользовательскими настройками для конкретных адаптеров. Например, `{"influxdb.0": {"enabled": true, "alias": "name"}}`. Атрибут `enabled` обязателен, и если он не равен true, весь атрибут будет удалён.

##### Состояние `common.role`
* `common.role` (указывает, как это состояние должно быть представлено в пользовательских интерфейсах)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
предложение: объекты канала `common.role` должны/могут подразумевать набор обязательных и/или необязательных объектов-детей состояния

возможные значения:

* `info` - Курсы валют или акций, цены на топливо, вставка почтового ящика и тому подобное
* `календарь` -
* `прогноз` - прогноз погоды

* `медиа - общий медиаканал
* `media.music` - медиаплеер, такой как SONOS, YAMAHA и т. д.
* `media.tv` - ТВ
* `media.tts` - преобразование текста в речь

* `thermo` - мониторинг или управление температурой, влажностью и т. д.
* `термо.тепло`
* `thermo.cool`

* `blind` - Управление жалюзи на окнах

* `свет`
* `light.dimmer` - Регулятор яркости света
* `light.switch` - Выключатель света.
* `light.color` - Управление светом с возможностью изменения цвета
* `light.color.rgb` - Установить цвет в RGB
* `light.color.rgbw` - Установить цвет в RGBW
* `light.color.hsl` - Установить цвет в Оттенке/Насыщенности/Яркости (Оттенок, цвет, свет - LivingColors...)
* `light.color.hslct` - Установка цвета в оттенках/насыщенности/яркости или цветовой температуре (расширенный цветовой оттенок)
* `light.color.ct` - цветовая температура К

* `switch` - некий общий переключатель

* `датчик` - например, оконный или дверной контакт, датчик протечки воды, пожарный датчик
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, запереть
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true(тревога), false (нет тревоги)
* `sensor.fire` - true(тревога), false (нет тревоги)
* `sensor.CO2` - true(тревога), false (нет тревоги)

*

* `alarm` - какая-то тревога

* `phone` - fritz!box, speedport и т. д.

* `кнопка` - как настенный выключатель или пульт дистанционного управления телевизором, где каждая кнопка представляет собой состояние, например .воспроизведение, .стоп, .пауза
* `remote` - пульты дистанционного управления телевизором или другими пультами, состояние которых представляет собой строку с нажатыми значениями, например, «PLAY», «STOP», «PAUSE»

* `meta` - Информация об устройстве
* `meta.version` - версия устройства
* `meta.config` - конфигурация с устройства
* ...

#### Описания каналов
~~Имена атрибутов могут быть свободно определены адаптером, за исключением тех, которые написаны **жирным** шрифтом.~~

"W" - общий.write=true

«М» — обязательно

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
| **Имя** | **Общая.роль** | **M** | **W** | **Общий.тип** | **Описание** |
|-------------|:--------------------------|:-----:|:-----:|-----------------|-------------------------------------|
| состояние | переключатель | X | X | логическое значение | |
| описание | текст.описание | | | | |
| mmm | indicator.maintenance.mmm | | | | mmm = lowbat или unreach или что-то в этом роде |

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
| **Имя** | **Общая.роль** | **M** | **W** | **Общий.тип** | **Описание** |
| `ringing_number` | `text.phone_number` | | | `string` | |
| `ringing` | `indicator` | | | `boolean` | |
| `звон` | `индикатор` | | | `логическое значение` | |

...

#### Устройство
#### Перечисление
* `common.members` - (необязательно) массив идентификаторов членов перечисления

#### Мета
ИДЕНТИФИКАТОР

* `*&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.meta.&lt;имя-мета&gt;*`
* `*&lt;имя-адаптера&gt;.meta.&lt;имя-мета&gt;*`
* `system.*meta.&lt;meta-name&gt;*`

#### Адаптер
ID: `system.adapter.<adapter.name>`

*Примечание:* все флаги являются необязательными, за исключением специальных, отмеченных как **обязательные**.

* `common.adminColumns` — настраиваемые атрибуты, которые должны отображаться в панели администратора в обозревателе объектов. Например: `[{"name": {"en": "KNX address"}, "path": "native.address", "width": 100, "align": "left"}, {"name": "DPT", "path": "native.dpt", "width": 100, "align": "right", "type": "number", "edit": true, "objTypes": ["state", "channel"]}]`. `type` — это тип атрибута (например, строка, число, логическое значение) и требуется только при включенном редактировании. `objTypes` — это список типов объектов, которые могут иметь такой атрибут. Используется также только в режиме редактирования.
* `common.adminTab.fa-icon` - (устарело) Название значка Font-Awesome для TAB.
* `common.adminTab.icon` — (необязательно) ссылка на значок или значок в кодировке Base64 для TAB. Может быть в формате SVG.
* `common.adminTab.ignoreConfigUpdate` - не обновлять TAB конфигурации, если конфигурация изменилась (для включения параметров конфигурации в TAB)
* `common.adminTab.link` — ссылка для iframe во вкладке. Можно использовать замену параметров следующим образом: `http://%ip%:%port%`. IP-адрес будет заменён на IP-адрес хоста. `port` будет извлечён из `native.port`.
* `common.adminTab.name` - имя вкладки в админке
* `common.adminTab.singleton` — [true/false], если у адаптера есть вкладка для администратора. Будет отображаться только одна вкладка для всех экземпляров.
* `common.adminUI.config` — тип пользовательского интерфейса конфигурации [none/json/materialize/html]. Если не определено, адаптер будет отображаться как HTML. (`jsonConfig.json` или `jsonConfig.json5` от `json`, `index_m.html` от `materialize`, `index.html` от `html` должны находиться в папке `admin`)
* `common.adminUI.custom` — [none/json] тип пользовательского интерфейса конфигурации. Если не определено, пользовательский интерфейс отображаться не будет. Можно использовать только `jsonCustom.json` или `jsonCustom.json5` в папке `admin`.
* `common.adminUI.tab` - [none/html] тип пользовательского интерфейса TAB. `tab.html` или `tab_m.html` расширяются в папке `admin`, если определены как `html`.
* `common.allowInit` - [true/false] разрешает запуск «запланированного» адаптера «вне расписания» при изменении настроек или запуске адаптера. Или разрешает запуск запланированного адаптера один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` - значения для `common.modes`, если возможно более одного режима
* `common.blockly` - [true/false], если адаптер имеет пользовательские блоки для blockly. (требуется `admin/blockly.js`)
* `common.compact` - сообщает контроллеру, что этот адаптер может быть запущен в том же процессе, если это необходимо
* `common.config.height` - высота по умолчанию для диалогового окна конфигурации (устарело - действует только для admin2)
* `common.config.minHeight` - минимальная высота для диалогового окна конфигурации (устарело - действует только для admin2)
* `common.config.minWidth` - минимальная ширина диалогового окна конфигурации (устарело - действует только для admin2)
* `common.config.width` - ширина по умолчанию для диалогового окна конфигурации (устарело - действует только для admin2)
* `common.connectionType` — тип подключения к устройству: `local/cloud`. См. также `common.dataSource`.
* `common.dataFolder` — папка, связанная с iobroker-data, в которой адаптер хранит данные. Эта папка будет автоматически резервироваться и восстанавливаться. В ней можно использовать переменную `%INSTANCE%`.
* `common.dataSource` — Способ получения данных с устройства: `poll/push/assumption`. Важно вместе с `connectionType`.
* `common.dependencies` - Массив типа `[{"js-controller": ">=2.0.0"}]`, который описывает, какие модули ioBroker требуются для этого адаптера на том же хосте.
* `common.disableDataReporting` - Не сообщать об ошибках через `sentry` для этого экземпляра
* `common.docs` - структура типа `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md"]}`, описывающая документацию, если ее нет в `README.md`
* `common.enabled` - **обязательно** [true/false] значение должно быть false, чтобы новые экземпляры были отключены по умолчанию
* `common.engineTypes` — устарело. Используйте engine в package.json.
* `common.eraseOnUpload` - удалить все предыдущие данные в каталоге перед загрузкой
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.extIcon` — ссылка на внешний значок для неустановленных адаптеров. Обычно находится на GitHub.
* `common.getHistory` - [true/false], если адаптер поддерживает сообщение getHistory
* `common.globalDependencies` - Массив типа `[{"admin": ">=2.0.0"}]`, который описывает, какие модули ioBroker требуются для этого адаптера на одном из хостов.
* `common.icon` - имя локальной иконки (должна находиться в подкаталоге "admin")
* `common.ignoreVersion` — не показывать значок обновления для этого адаптера для этой конкретной версии
* `common.installedVersion` - Не используйте, будет установлено только для внутреннего использования.
* `common.jsonConfig` — этот адаптер поддерживает admin5 и предоставляет admin/jsonConfig.json с описанием макета диалогового окна конфигурации.
* `common.jsonCustom` — этот адаптер поддерживает admin5 и предоставляет admin/jsonCustom.json с описанием макета пользовательских настроек.
* `common.keywords` — Аналогично ключевым словам в package.json, но может быть определено на многих языках. Просто массив.
* `common.localLink` — устарело. Используйте `common.localLinks`.
* `common.localLinks` - ссылка на веб-сервис этого адаптера. Например, на http://localhost:5984/_utils для футона от администратора.
* `common.logTransporter` - если этот адаптер получает журналы с других хостов и адаптеров (например, чтобы где-то их хранить)
* `common.loglevel` - отладка, информация, предупреждение или ошибка
* `common.main` - **Устарело** Используйте main в package.json.
* `common.materializeTab` - если адаптер поддерживает > admin3 для вкладки (стиль materialize)
* `common.materialize` - если адаптер поддерживает > admin3 (стиль materialize)
* `common.messagebox` — true, если поддерживается окно сообщения. Таким образом, адаптер может принимать сообщения sendTo (используемые для электронной почты, pushover-сообщений и т.д.).
* `common.messages` — Условные сообщения при обновлении. Подробности см. в разделе [Условные сообщения](#conditional-messages).
* `common.mode` - **обязательно** возможные значения см. ниже
* `common.name` - **обязательное** имя адаптера без «ioBroker».
* `common.noConfig` - [true/false] не показывать диалоговое окно конфигурации, например
* `common.noIntro` - никогда не показывать экземпляры этого адаптера на экране «Введение/Обзор» в панели администратора (например, значки, виджеты)
* `common.noRepository` - [true/false] если адаптер поставляется с первоначальной установкой или имеет собственный репозиторий
* `common.nogit` — если true, то установка напрямую из GitHub невозможна
* `common.nondeletable` — [true/false] этот адаптер нельзя удалить или обновить. Он будет обновлен вместе с контроллером.
* `common.npmLibs` — устарело. Используйте package.json `dependencies`.
* `common.onlyWWW` - [true/false] сообщает контроллеру, что у адаптера есть только файлы HTML и нет main.js, как у rickshaw
* `common.osDependencies.darwin` - массив пакетов OSX, необходимых для этого адаптера
* `common.osDependencies.linux` - массив пакетов debian/centos, требуемых для этого адаптера (конечно, только ОС с apt, apt-get, yum в качестве менеджеров пакетов)
* `common.osDependencies.win32` - не используется, т.к. в win32 нет менеджера пакетов
* `common.os` - строка или массив поддерживаемых операционных систем, например `["linux", "darwin"]`
* `common.platform` - **обязательно** возможные значения: Javascript/Node.js, скоро появятся новые
* `common.preserveSettings` — строка (или массив) с именами общих атрибутов экземпляра, которые не будут удалены. Например, "history", поэтому при выполнении `setState("system.adapter.mqtt.0", {..})` поле `common.history` не будет удалено, даже если у нового объекта нет этого поля. Чтобы удалить атрибут, это необходимо явно сделать с помощью `common: {history: null}`.
* `common.pugins.sentry` - структура с конфигурационными данными для плагина `sentry`
* `common.readme` - URL файла ReadMe
* `common.restartAdapters` - массив с именами адаптеров, которые необходимо перезапустить после установки данного адаптера, например, ["vis"]
* `common.restartSchedule` - расписание CRON для перезапуска адаптеров режима `daemon`
* `common.schedule` - расписание CRON, если адаптер работает в режиме `schedule`.
* `common.serviceStates` - [true/false или path], если адаптер может предоставлять дополнительные состояния. Если да, будет вызван путь `adapter/lib/states.js`, который передаёт следующие параметры: function (objects, states, instance, config, callback). Функция должна возвращать массив точек со значениями вида `function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}`
* `common.singletonHost` - адаптер может быть установлен только один раз на одном хосте
* `common.singleton` - адаптер может быть установлен только один раз во всей системе
* `common.smartName` - Относится к адаптеру IoT для хранения настроек Alexa и компании.
* `common.statusStates` — структура для отображения статуса в админке в виде `"statusStates": {"onlineId": "0.connected", "errorId": "hm-rpc.0.AB203424.0.error"}`. Вместо `onlineId` можно использовать `offlineId`. Если идентификатор очень короткий (менее двух точек), он будет считаться относительным к текущему объекту.
* `common.stopBeforeUpdate` - [true/false], если адаптер должен быть остановлен перед обновлением
* `common.stopTimeout` - тайм-аут в мс до выключения адаптера. По умолчанию 500 мс.
* `common.stoppedWhenWebExtension` - если экземпляр имеет режим `daemon`, но работает как веб-расширение (`native.webInstance !== ''`), контроллер не запустит этот экземпляр, если `common.stoppedWhenWebExtension` равно true.
* `common.subscribeable` — переменные этого адаптера должны быть подписаны с помощью sendTo для включения обновлений
* `common.subscribe` - имя переменной, на которую автоматически подписываются
* `common.supportCustoms` — [true/false], если адаптер поддерживает настройки для каждого штата. В панели администратора должен быть файл custom.html. Пример можно найти в `ioBroker.history`
* `common.supportStopInstance`- [true/false], если адаптер поддерживает сигнал stopInstance (**messagebox** обязателен). Сигнал будет отправлен перед остановкой адаптера. (используется, если возникли проблемы с SIGTERM)
* `common.tier` - начальный порядок экземпляра. Допустимые значения: 1, 2, 3. 1 - первый, 3 - последний.
* `common.titleLang` - **обязательное** более длинное имя адаптера на всех поддерживаемых языках, например `{en: 'Adapter', de: 'adapter', ru: 'Драйвер'}`
* `common.title` - (устарело) более длинное имя адаптера для отображения в админке
* `common.type` — Тип адаптера. См. [Типы](adapterpublish.md)
* `common.unchanged` — (система) не используйте этот флаг. Он информирует систему о необходимости отображения диалогового окна настройки в панели администратора.
* `common.unsafePerm` - [true/false], если пакет должен быть установлен с параметром `npm --unsafe-perm`
* `common.version` - **обязательная** доступная версия
* `common.visWidgets` — описывает `виджеты React vis2`. Например: `{"i18n": "component", "vis2NAMEWidgets": { "name": "vis2NAMEWidgets", "url": "vis-2-widgets-NAME/customWidgets.js", "components": [ "NAMEwidgetName"]} }`
* `common.wakeup` — Адаптер будет запущен, если в `system.adapter.NAME.x.wakeup` записано определённое значение. Обычно адаптер должен останавливаться после обработки события.
* `common.webByVersion` - показывать версию как префикс в веб-адаптере (обычно - `ip:port/material`, webByVersion - `ip:port/1.2.3/material`)
* `common.webExtendable` - [true/false] если веб-сервер в этом адаптере может быть расширен с помощью плагинов/расширений, таких как proxy, simple-api
* `common.webExtension` — относительное имя файла для подключения веб-расширения. Например, в `simple-api` `lib/simpleapi.js` относительно корневого каталога адаптера. Кроме того, `native.webInstance` требуется для указания места подключения этого расширения. Пустое значение означает, что расширение должно запускаться как отдельная веб-служба. «*» означает, что каждый веб-сервер должен его включить.
* `common.webPreSettings` - список параметров, которые должны быть включены в info.js адаптером webServer. (Пример материала)
* `common.webservers` - массив экземпляров веб-серверов, которые должны обслуживать контент из www-папки адаптера
* `common.welcomeScreen.order` - список дел
* `common.welcomeScreenPro` - То же, что и `common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.welcomeScreen` - массив страниц, которые должны отображаться на странице index.html "web". `["vis/edit.html", "vis/index.html"]` или `[{"link": "vis/edit.html", "name": "Vis editor", "img": "vis/img/edit.png", "color": "blue"}, "vis/index.html"]`
* `common.wwwDontUpload` — не загружать каталог www в базу данных. Используется только для администратора. Вы можете просто назвать свой каталог как-нибудь иначе, и всё будет ОК.
* `protectedNative` - массив атрибутов конфигурации, которые будут доступны только собственному адаптеру, например, `["password"]`
* `encryptedNative` — массив атрибутов конфигурации, которые будут автоматически шифроваться при сохранении через страницу конфигурации администратора и автоматически расшифровываться во время работы адаптера, например, `["password", "token"]`
* `native` - предопределенные атрибуты, которые доступны в `index_m.html` и во время выполнения через `adapter.config.<attribute>`, например, `{"port": 1234, "password": "secret"}`

#### Условные сообщения (`common.messages`)

#### Условные сообщения (`common.messages`)
Вы можете определить **условные сообщения**, которые будут отображаться пользователю при обновлении адаптера.
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
Правила — это строки внутри массива `rules`. Примеры:

* **Проверка версий**

* `"oldVersion<=1.0.44"` – старая версия меньше или равна 1.0.44
* `"newVersion>=1.0.45"` – новая версия больше или равна 1.0.45

*(операторы: `<`, `>`, `<=`, `>=`, `==`, `!=`)*

* **Установленное состояние**

* `"installed"` – true, если адаптер уже установлен
* `"not-installed"` или `"!"` – true, если адаптер не был установлен

* **Другие адаптеры**

* `"vis-2>=1.0.0"` – true, если установлен адаптер `vis-2` с версией ≥ 1.0.0
* `"vis"` – true, если установлен адаптер `vis`
* `"!vis-2"` – true, если адаптер `vis-2` не установлен

##### Ссылка на правило
| Пример правила | Значение |
|------------------------|-----------------------------------------------------------|
| `oldVersion<=1.0.44` | Текущая установленная версия ≤ 1.0.44 |
| `newVersion>=1.0.45` | Устанавливаемая версия ≥ 1.0.45 |
| `newVersion==2.0.0` | Устанавливаемая версия — ровно 2.0.0 |
| `installed` | Истина, если адаптер уже установлен (любой версии) |
| `not-installed` или `!` | Истина, если адаптер не был установлен ранее |
| `vis-2>=1.0.0` | Истина, если адаптер `vis-2` установлен с версией ≥ 1.0.0 |
| `vis` | Истина, если установлен адаптер `vis` (любой версии) |
| `!vis-2` | Истина, если адаптер `vis-2` **не** установлен |
| `!vis-2` | Истина, если адаптер `vis-2` **не** установлен |

###### Поддерживаемые операторы
* `==` – равно
* `!=` – не равно
* `<` – меньше чем
* `<=` – меньше или равно
* `>` – больше чем
* `>=` – больше или равно

###### Операнд
* `"и"` → все правила должны быть истинными
* `"или"` → хотя бы одно правило должно быть истинным

##### Примеры
###### Пример 1: Показывать сообщение только при обновлении с версии ≤1.0.44 до ≥1.0.45
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

###### Пример 2: Показывать сообщение, если адаптер установлен впервые
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

###### Пример 3: Показать сообщение, если требуется другой адаптер
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
Чтобы протестировать сообщения и их правила, например, в среде «dev-сервера», необходимо выполнить следующие шаги:

- Определите номер будущей версии, под которой должно отображаться сообщение. Этот номер версии будет выбран позднее в процессе выпуска.
- Добавьте объект `common.messages` в файл `io-packages.json` согласно описанию.
- При необходимости включите ранее указанный номер версии в объект `common.messages`.
– Добавьте запись журнала изменений в объект `common.news`, используя указанный номер версии. Эта информация журнала изменений позже будет отображаться в диалоговом окне обновления вместе с информацией из объекта `common.messages`.
- Включите экспертный режим в iobroker тестовой среды.
- В представлении объектов откройте следующую точку данных: `system.repositories`.
- Из соображений безопасности, а также из-за большого размера объекта рекомендуется скопировать его содержимое и редактировать в редакторе JSON (например, VS Code или Notepad++).
- В редакторе найдите существующий объект адаптера.
- В найденном объекте измените следующую информацию:
- `version` -> с номером версии, указанным выше
- `news` -> добавить запись в журнал изменений для указанного номера версии
- `messages` -> вставить подготовленный объект сообщения из `io-packages.json`.
- Чтобы избежать проблем, результат следует проверить в JSON-валидаторе.
- Затем скопируйте результат обратно в объект «system.repositories» и сохраните его.
- Откройте или перезагрузите вкладку адаптера в интерфейсе администратора.
- Обновленная версия теперь должна отображаться как доступная для обновления адаптера.
- После нажатия кнопки обновления адаптера информация из объекта сообщения должна через короткое время отобразиться в диалоговом окне.
- Поскольку эта версия пока недоступна в npm, нажатие кнопки обновления приведет к ошибке, и диалоговое окно должно быть закрыто.

#### Пример
ID: `system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;`

* `common.host` — (обязательно) хост, на котором должен быть запущен адаптер — объект `system.host.&lt;host&gt;` должен существовать
* `common.enabled` - (обязательно)
* `common.mode` - (обязательно) возможные значения см. ниже

##### Адаптер/экземпляр общий.режим
* `none` - этот адаптер не запускает процесс
* `daemon` - всегда запущенный процесс (будет перезапущен, если процесс завершится)
* `subscribe` — запускается, когда состояние `system.adapter.&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.alive` меняется на `true`. Завершается, когда `.alive` меняется на `false`, и устанавливает `.alive` в `false` при завершении процесса (не будет перезапущен после завершения процесса).
* `schedule` - запускается по расписанию, найденному в `system.adapter.&lt;имя-адаптера&gt;.&lt;номер-экземпляра&gt;.schedule` - реагирует на изменения `.schedule` перепланированием с новым состоянием
* `once` — этот адаптер будет запускаться каждый раз при изменении объекта `system.adapter.yyy.x`. После завершения работы он не будет перезапущен.
* `extension` — этот адаптер не будет запускаться `js-controller`, а будет запускаться веб-экземпляром. Веб-экземпляр может быть определён в `native.webInstance` как `*` (для каждого веб-экземпляра) или как `web.x` для конкретного веб-экземпляра. (Примеры: `cameras, proxy`). Кроме того, в `common.webExtension` необходимо указать путь к файлу плагина.

#### Хозяин
ID: `system.host.<host>`

* `common.name` - например, `system.host.banana`
* `общий.процесс`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - например, `banana`
* `common.address` - массив строк IP-адресов

#### Конфигурация
#### Скрипт
* `common.platform` - (обязательно) возможные значения `Javascript/Node.js` (будут добавлены дополнительные)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) исходный код скрипта
* `common.engine` - (необязательно) экземпляр *script engine*, который должен запустить этот скрипт (например, 'javascript.0') - если пропущен движок, он выбирается автоматически

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательно) MD5-хеш пароля

#### Группа
* `common.name` - (обязательно) имя группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов
* `common.desc` - (необязательно) описание назначения группы