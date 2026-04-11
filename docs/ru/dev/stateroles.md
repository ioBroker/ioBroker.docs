---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/stateroles.md
title: Государственные роли
hash: 3Qz3vEfztTOu2Yz2dy9AydYSHZKs/lyh1rXLtFz+cAU=
---
# Государственные роли
Для объектов типа `state` свойство `common.role` должно быть установлено на одну из ролей, определенных в списке ниже.
Информация о роли очень важна и позволяет адаптерам визуализации и интеллектуального помощника определять функцию объекта, а также то, как/если он связан с другими объектами в том же канале, устройстве или папке.

## Типы ролей в штате
Существуют следующие типы ролей в государстве:

### Действующие состояния
Рабочие состояния используются для управления нормальной функциональностью устройства. RGB-лампа может содержать следующие три (или более) объекта с различными ролями, которые относятся друг к другу:

* `переключатель` (Вкл/Выкл)
* `level.color.rgb` с цветовым кодом #RRGGBB лампы
* `level.brightness` со значением яркости

Также режим уборки или режим уборки комнаты роботизированным пылесосом является одним из таких рабочих состояний. Эти состояния описываются с использованием приведенного ниже определения без каких-либо изменений.

Пожалуйста, используйте максимально подробное имя роли, содержащее максимально полную информацию (например, для цветовой температуры лучше использовать `level.color.temperature` вместо `level`, а для управления питанием устройства лучше использовать `switch.power`, чем `switch`).
Кроме того, при использовании подробных имен ролей (более одного уровня) важно не использовать одну и ту же роль дважды в канале устройства.

Различные шаблоны устройств, используемые для обнаружения с обязательными и необязательными объектами и их ролями, можно найти в [Репозиторий детектора типов](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

### Состояния конфигурации/настроек
Штаты, которые настраивают дополнительные «нерабочие» параметры устройств, также могут использовать приведенные ниже базовые определения ролей, чтобы предоставить больше контекста о типе и использовании предоставленного значения, **но добавьте ".setting." в качестве второго уровня имени роли**. Например:

* Параметр `level.setting.color.temperature` со значением от 0 до 100% можно использовать для установки "Цветовой температуры при запуске" лампочки.
* Параметр `switch.setting` (Вкл./Выкл.) можно использовать для определения параметра, который можно включить или выключить (например, функция блокировки от детей).

Пользовательские интерфейсы могут использовать эти специальные роли для определения настроек устройства и отображения их в диалоговом окне «Настройки» для устройства, либо игнорировать их.

Обратите внимание: эти типы ролей были определены в июне 2025 года, поэтому многие (более старые) адаптеры могут их не использовать. В будущем этот тип состояния можно/нужно использовать, когда это уместно.

### Общие состояния
Если не удается найти подходящую роль или сценарий использования не является специфическим, вы можете воспользоваться описанными ниже **общими** ролями.

## Категории ролей в штате
### Общий
* `state` — очень распространенное значение. Если вы не знаете, какую роль играет государство, используйте это значение.
* `текст` `common.type = string`
* `text.url` `common.type = string` Значение состояния содержит URL-адрес для использования в якоре, iframe или img
* `html` `common.type = string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - может быть разобран с помощью `new Date(ddd)` string
* `date` `common.type = number` - `epoch seconds * 1000`

### Датчик (логические значения, только для чтения)
`common.type=boolean, common.write=false`

* `sensor` — общее состояние датчика, представляющее статус: active — `true` или inactive — `false`.
* `sensor.contact` - общий контакт: открыт - `true` или закрыт - `false`
* `sensor.window` - окно открыто - `true` или закрыто - `false`
* `sensor.door` - дверь открыта - `true` или закрыта - `false`
* `sensor.alarm` - распространенный сигнал тревоги
* `sensor.alarm.flood` - утечка воды
* `sensor.alarm.fire` - датчик пожара
* `sensor.alarm.secure` - если дверь открыта, окно открыто или обнаружено движение во время срабатывания сигнализации, сигнализация включена.
* `sensor.alarm.power` - Нет питания (`voltage = 0`)
* `sensor.light` - сигнал от лампы о том, что она включена.
* `sensor.lock` - фактическое положение замка: разблокирован - `true` или заблокирован - `false`
* `sensor.motion` - датчик движения
* `sensor.rain` - обнаружен дождь
* `sensor.noise` - обнаружен шум
* `sensor.switch` - состояние переключателя: включено - `true` или выключено - `false`

### Кнопки (логические значения, только для записи)
`common.type=boolean, common.write=true, common.read=false`

Кнопки обычно не имеют значения и используются только для отправки события (TRUE) при нажатии, поэтому атрибут read-flag должен быть FALSE.
Пользовательские интерфейсы не должны считывать значение этого состояния и не должны ожидать его сброса в "FALSE" после выполнения действия или чего-либо подобного.
События кнопок, запускающие onChange в адаптере, должны подтверждаться с помощью ACK = TRUE, чтобы показать, что событие было распознано и обработано.

* `кнопка`
* `button.long`
* `button.stop` - например, rollo stop,
* `button.stop.tilt`
* `button.start`
* `button.resume`
* `button.open.door`
* `button.open.window`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode.`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

### Кнопки как датчик
`common.type=boolean, common.write=false, common.read=true`

* `button` — разница в том, что `common.write=false`. Пожалуйста, избегайте этой роли и используйте `button.press` или `button.long`.
* `button.long`
* `button.press`

### Значения (числа, только для чтения)
`common.type=number, common.write=false`

* `значение`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) Важно иметь (`CLOSED/TILTED/OPEN`). Значения могут отличаться.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'`)
* `value.humidity`
* `value.co2` - CO2 (единица измерения: ppm)
* `value.brightness` - уровень яркости (единица измерения: люкс)
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - уровень заряда батареи
* `value.valve` - уровень клапана
* `value.time` - метод getTime() для объекта Date()
* `value.timer` - длительность в секундах (эквивалентно `level.timer`)
* `value.interval` (common.unit='sec') - Интервал в секундах (может быть 0,1 или меньше)
* ~~value.date (common.type=string) - Дата в формате 2015.01.01 (без времени)~~
* ~~value.datetime (common.type=string) - Дата и время в системном формате~~
* `value.gps.longitude` - координаты долготы GPS
* `value.gps.latitude` - широта GPS
* `value.gps.elevation` - высота по GPS
* `value.gps` - долгота и широта вместе, например, '5.56;43.45'
* `value.gps.accuracy` - точность текущего измерения GPS
* `value.gps.radius` - радиус текущего измерения GPS
* ~~`value.power.consumption` - потребление энергии (единица измерения = Вт·ч или кВт·ч)~~
* ~~`value.power.production` - производство энергии (единица измерения = Вт·ч или кВт·ч)~~
* `value.energy` - энергия (единица измерения: Вт·ч, кВт·ч или м³ для бензина)
* `value.energy.active` - активная энергия (единица измерения: Вт·с, Вт·ч, кВт·ч)
* `value.energy.reactive` - реактивная энергия (единица измерения = вар, кВ·ч)
* `value.energy.consumed` - потребленная энергия (единица измерения: Вт·с, Вт·ч, кВт·ч)
* `value.energy.produced` - произведенная мощность (единица измерения: Вт·с, Вт·ч или кВт·ч)
* `value.power` - энергетическая мощность (единица измерения = Вт или кВт)
* `value.power.active` - активная мощность (единица измерения = Вт, кВт)
* `value.power.reactive` - реактивная мощность (единица измерения: вар, кВар)
* `value.power.consumed` - потребляемая мощность (единица измерения = Вт или кВт)
* `value.power.produced` - произведенная мощность (единица измерения = Вт или кВт)
* `value.direction` - (common.type=number, указывает вверх/вниз, влево/вправо, 4-позиционные переключатели, направление ветра, ... 0 - ничего, 1 - вверх/открытие, 2 - вниз/закрытие, 3 - не определено)
* `value.curtain` - фактическое положение шторы
* `value.blind` - фактическое положение жалюзи (`max = полностью открыто, min = полностью закрыто`)
* `value.tilt` - фактическое положение наклона (`max = полностью открыто, min = полностью закрыто`)
* `value.lock` - фактическое положение замка
* `value.speed` - скорость ветра
* `value.pressure` - (единица измерения: мбар)
* `value.distance`
* `value.distance.visibility`
* `value.severity` — уровень серьезности (можно указать состояния), чем выше значение, тем важнее.
* `value.warning` — предупреждение (можно указать состояние), чем выше значение, тем важнее предупреждение.
* `value.sun.elevation` - высота солнца над горизонтом в °
* `value.sun.azimuth` - азимут солнца в °
* `value.voltage` - Напряжение в вольтах, `unit=V`
* `value.current` - сила тока в амперах, `unit=A`
* `value.frequency` - Частота в Гц, `unit=Hz`
* `value.fill` - Уровень заполнения, `unit=l,ml,m3,%`
* `value.blood.sugar` - Значение уровня сахара в крови, `unit=mmol,mgdl`

### Индикаторы (логические, только для чтения)
`common.type=boolean, common.write=false`

Разница между *индикаторами* и *датчиками* заключается в том, что индикаторы отображаются в виде маленьких значков, а датчики — в виде реальных значений.
Таким образом, индикатор может быть не единственным в канале. Он должен представлять собой какое-либо другое основное состояние внутри канала.

* `индикатор`
* `indicator.working` — указывает, что целевая система выполняет какое-либо действие, например, открывает жалюзи или замок.
* `indicator.reachable` - Если устройство находится в сети
* `indicator.connected` — используется только для экземпляров. Для устройств используйте `indicator.reachable`.
* `indicator.direction` - `true` - вверх/открыть, `false` - вниз/закрыть. Используйте более подходящий `value.direction`.
* `indicator.error` - true, если существует какая-либо ошибка
* `indicator.maintenance` — отображает системные предупреждения/ошибки, сигналы тревоги, сервисные сообщения, информацию о разряженной батарее и тому подобное.
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` - true, если заряд батареи низкий
* `indicator.alarm` - то же самое, что indicator.maintenance.alarm
* `indicator.alarm.fire` - обнаружен пожар
* `indicator.alarm.flood` - обнаружено наводнение
* `indicator.alarm.secure` - дверь или окно открыты
* `indicator.alarm.health` - проблема со здоровьем

### Уровни (числовые, чтение-запись)
С помощью **уровней** вы можете контролировать или устанавливать определенное числовое значение.

`common.type=number, common.write=true`

* `уровень`
* `level.humidity` — заданное значение влажности, например, для увлажнителей/систем климат-контроля.
* `level.battery` - целевое напряжение/емкость батареи, т.е. для зарядки
* `level.battery.min` - минимальное напряжение/емкость батареи
* `level.battery.max` - максимальное напряжение/емкость батареи
* `level.valve` - значение открытия клапанов
* `level.pressure` -
* `level.pressure.min` - минимально допустимое значение давления воздуха или масла
* `level.pressure.max` - максимально допустимое значение давления воздуха или масла
* `level.voltage` - целевое напряжение для генераторов
* `level.voltage.min` - минимальное напряжение для генераторов
* `level.voltage.max` - максимальное напряжение для генераторов
* `level.current` - целевой ток, например, для зарядки аккумуляторных устройств.
* `level.current.min` — минимальный ток, например, для устройств с зарядкой батареи.
* `level.current.max` — максимальный ток, например, для устройств с зарядкой батареи.
* `level.frequency` - целевая частота для генераторов
* `level.frequency.min` — минимальная частота для генераторов или для сигнализации в электросети.
* `level.frequency.max` — максимальная частота для генераторов или для сигнализации в электросети.
* `level.fill` - заданное значение для любого уровня заполнения контейнера
* `level.brightness` - уровень яркости (единица измерения: люкс)
* `level.min` - минимально допустимый уровень
* `level.max` - максимально допустимый уровень
* `level.default` - уровень по умолчанию
* `level.dimmer` - яркость также уменьшается.
* `level.blind` - установить положение жалюзи (макс. = полностью открыты, мин. = полностью закрыты)
* `level.temperature` - установить желаемую температуру
* `level.valve` - заданное значение положения клапана
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - цвет в ° `0-360; 0=красный, 120=зеленый, 240=синий, 360=красный (циклический)`
* `level.color.saturation`
* `level.color.rgb` - шестнадцатеричный код цвета, например `#rrggbb` (`common.type=string`)
* `level.color.rgbw` - шестнадцатеричный код цвета, например `#rrggbbww` (`common.type=string`)
* `level.color.cie` - цвет cie в формате `[x, y]` (`common.type=string`)
* `level.color.luminance`
* `level.color.temperature` - цветовая температура в К° `2200 теплый белый, 6500° холодный белый`
* `level.effect` — эффект, обычно для освещения. Список возможных эффектов должен содержаться в `common.states` (`common.type=string`).
* `level.timer`
* `level.timer.sleep` — таймер сна. 0 — выключено или в минутах
* ...
* `level.volume` - (`min=0, max=100`) - громкость звука, но min и max могут отличаться. min < max
* `level.volume.group` - (`min=0, max=100`) - громкость звука для группы устройств
* `level.curtain` - установить положение шторы
* `level.tilt` - устанавливает положение наклона жалюзи (макс. = полностью открыто, мин. = полностью закрыто)
* `level.speed` - скорость, например, вентилятора, воздуходувки и т. д.

### Переключатели (логические значения, чтение/запись)
Switch управляет логическим устройством (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock` - блокировка (`true - открыть блокировку, false - закрыть блокировку`)
* `switch.lock.door` - дверной замок
* `switch.lock.window` - блокировка окна
* `switch.mode.boost` - запуск/остановка режима повышения мощности термостата
* `switch.mode.party` - запуск/остановка режима вечеринки термостата
* `switch.power` - включение/выключение питания, термостата или кондиционера
* `switch.light`
* `switch.comfort` - комфортный режим
* `switch.enable`
* `switch.mode.`*
* `switch.mode.auto` - включение/выключение автоматического режима
* `switch.mode.manual` - включение/выключение ручного режима
* `switch.mode.silent` - включение/выключение бесшумного режима
* `switch.mode.moonlight` - включение/выключение режима лунного света
* `switch.mode.color` - включение/выключение цветового режима
* `switch.gate` - закрывает (false) или открывает (true) ворота.

### Кондиционер или термостат
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - кондиционер: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, термостат отопления: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - термостат: `AUTO, MANUAL, VACATION`,
* `value.mode.airconditioner` - текущее состояние устройства: `IDLE`, `HEAT`, `COOL` (0,1,2 в Apple Home)

В дополнение к этим состояниям обычно требуются разделы `level.temperature` и `switch.power` для составления карты кондиционера.

TODO: Подумайте об ионизации и колебаниях.

### Пылесос
* `level.mode.cleanup` — перечисление значений `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Требуются только значения `AUTO` и `NORMAL`.
* `level.mode.work` — Перечисление значений `AUTO, FAST, MEDIUM, SLOW, TURBO`. Необязательное состояние.
* `value.water` - уровень воды от 0 до 100%.
* `value.waste` - Уровень заполнения мусорного ведра от 0 до 100%. (0% - пусто, 100% - заполнено)
* `indicator.maintenance.waste` - Мусорное ведро — это глупость.
* `value.state` - `HOME, CLEANING, PAUSE` и так далее.

Кроме того, к этим состояниям обычно требуется `switch.power` для составления карты пылесоса. `switch.power` в этом случае работает следующим образом: `true` - уборка, `false` - возвращение домой.
В качестве опции могут использоваться `value.battery` и

### Ворота
* `switch.gate` - закрывает (false) или открывает (true) ворота (обязательно)
* `value.position` - положение ворот в процентах (100% открыто, 0% - закрыто)
* `value.gate` - то же самое, что и `value.position`
* `button.stop` - остановить движение ворот

### Медиа
Особые роли для участников медиа-рынка

* `button.stop`
* `button.play`
* `button.next`
* `button.prev`
* `button.pause`
* `switch.pause`
* `button.forward`
* `button.reverse`
* `button.fastforward`
* `button.fastreverse`
* `button.volume.up`
* `button.volume.down`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - нет, 1 - все, 2 - один
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - `['play','stop','pause']` или `[0 - пауза, 1 - воспроизведение, 2 - остановка]` или `[true - воспроизведение/false - пауза]`
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover` - URL обложки
* `media.cover.big` - URL большой обложки
* `media.cover.small` - крошечный URL обложки
* `media.duration.text` - например, "2:35"
* `media.duration` - (`common.type=number`) секунд
* `media.elapsed.text` - например, "1:30"
* `media.elapsed` - (`common.type=number`) секунд
* `media.broadcastDate` - (`common.type=string`) Дата трансляции
* `media.mute` - (`common.type=boolean`) true означает отключение звука
* `media.season` - (`common.type=string`) номер сезона (важно, чтобы тип был "string", чтобы можно было указать отсутствие сезона с помощью "")
* `media.episode` - (`common.type=string`) номер эпизода (важно, чтобы тип действительно был "string", чтобы можно было указать отсутствие эпизода с помощью "")
* `media.mute.group` - (`common.type=boolean`) отключение звука для группы устройств
* `media.tts` - преобразование текста в речь
* `media.bitrate` - кбит/с
* `media.genre` - жанр песни
* `media.date` - год песни
* `media.track` - (`common.type=string`) идентификатор текущего воспроизводимого трека `[0 - ~]` (важно, чтобы тип был действительно `string`, чтобы можно было указать отсутствие трека с помощью "")
* `media.playid` - идентификатор трека медиаплеера
* `media.add` - добавить текущий плейлист
* `media.clear` - очистить текущий плейлист (только для записи)
* `media.playlist` - массив в формате JSON
* `media.url` - URL для воспроизведения или текущий URL
* `media.url.announcement` — URL для воспроизведения объявления
* `media.jump` — Количество элементов для перехода в плейлисте (может быть отрицательным)
* `media.content` - Тип воспроизводимого медиафайла, например, аудио/mp3
* `media.link` - Состояние с текущим файлом
* `media.input` - число или строка входного сигнала (AUX, AV, TV, SAT, ...)
* `level.bass` - Уровень баса
* `level.treble` - Уровень высоких частот
* `switch.power.zone` - зона питания

```json
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* `media.browser` - массив JSON, похожий на "файлы"

```json5
[
    {
        "fanart": "",
        "file": "", // smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", // directory
        "label": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

### Погода
* `date` — фактическая дата или дата последнего прочтения информации.
* `date.forecast.1` - дата завтра
* `date.sunrise` - Восход солнца на сегодня
* `date.sunset` - Закат на сегодня
* `dayofweek` - день недели в текстовом формате
* `location` — текстовое описание местоположения (например, адрес)
* `value.clouds` - Облака на небе. 0% - нет облаков, 100% - много облаков.
* `value.direction.max.wind` - фактическое направление ветра в градусах
* `value.direction.min.wind` - фактическое направление ветра в градусах
* `value.direction.wind` - фактическое или среднее направление ветра в градусах
* `value.direction.wind.forecast.0` - прогноз направления ветра на сегодня в градусах
* `value.direction.wind.forecast.1` - прогноз направления ветра на завтра в градусах
* `value.humidity` - фактическая или средняя влажность
* `value.humidity.max` - фактическая влажность
* `value.humidity.min` - фактическая влажность
* `value.precipitation` - (`type: number, unit: mm`) осадки в виде дождя/снега за последние 24 часа (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.chance` - Фактическая вероятность осадков на сегодня
* `value.precipitation.day.forecast.0` - Прогноз осадков на дневное время
* `value.precipitation.forecast.0` - (`type: number, unit: %`) Прогноз вероятности осадков на сегодня
* `value.precipitation.forecast.0` - (`type: number, unit: mm`) Прогноз уровня осадков на сегодня
* `value.precipitation.forecast.1` - (`type: number, unit: %`) Прогноз вероятности осадков на завтра
* `value.precipitation.forecast.1` - (`type: number, unit: mm`) Прогноз уровня осадков на завтра
* `value.precipitation.hour` - Фактический уровень осадков за последний час
* `value.precipitation.night.forecast.0` - Прогноз осадков на ночное время
* `value.precipitation.today` - Фактический уровень осадков за сегодня (до 0:00)
* `value.precipitation.type` - Фактический тип осадков на сегодня. (`type: number`) Штаты: 0 - НЕТ, 1 - ДОЖДЬ, 2 - СНЕГ, 3 - ГРАД
* `value.pressure.forecast.0` - прогноз давления на сегодня
* `value.pressure.forecast.1`
* `value.radiation` - Фактический уровень солнечной радиации
* `value.rain` - Фактический уровень осадков за последние 24 часа
* `value.rain.hour` - Фактический уровень осадков за последний час
* `value.rain.today` - Фактический уровень осадков за сегодня (до 0:00)
* `value.snow` - Фактический уровень снега за последние 24 часа
* `value.snow.hour` - Фактический уровень снега за последний час
* `value.snow.today` - Фактический уровень снега за сегодня (до 0:00)
* `value.snowline` - Фактическая высота снеговой линии в метрах
* `value.speed.max.wind` - максимальная скорость ветра за последние 24 часа
* `value.speed.min.wind` - минимальная скорость ветра за последние 24 часа
* `value.speed.wind` - фактическая или средняя скорость ветра
* `value.speed.wind.forecast.0` - прогноз скорости ветра на сегодня
* `value.speed.wind.forecast.1` - прогноз скорости ветра на завтра
* `value.speed.wind.gust` - фактическая скорость порывов ветра
* `value.temperature` - Фактическая температура
* `value.temperature.dewpoint` - Фактическая точка росы
* `value.temperature.feelslike` - Фактическая температура, которую "ощущают"
* `value.temperature.max` - Максимальная температура за последние 24 часа
* `value.temperature.max.forecast.0` - Максимальная прогнозируемая температура на сегодня
* `value.temperature.max.forecast.1` - Максимальная прогнозируемая температура на завтра
* `value.temperature.min` - Минимальная температура за последние 24 часа
* `value.temperature.min.forecast.0` - Минимальная прогнозируемая температура на сегодня
* `value.temperature.min.forecast.1` - Минимальная прогнозируемая температура на завтра
* `value.temperature.windchill` - Фактическое значение ветрового охлаждения
* `value.uv` - Фактический уровень UV-координат
* `weather.chart.url` - URL-адрес графика с историей погоды
* `weather.chart.url.forecast` - URL-адрес графика прогноза погоды
* `weather.direction.wind` — фактическое или среднее направление ветра в текстовом виде, например, NNW
* `weather.direction.wind.forecast.0` - прогноз направления ветра на сегодня в текстовом формате
* `weather.html` - HTML-объект с описанием погоды
* `weather.icon` — Фактический URL-адрес значка состояния на данный момент
* `weather.icon.forecast.1` - иконка завтрашнего дня
* `weather.icon.name` - Фактическое название значка состояния на данный момент
* `weather.icon.wind` — Фактический URL-адрес значка ветра на данный момент
* `weather.json` - JSON-объект с конкретными данными
* `weather.state` - Фактическое описание погоды
* `weather.state.forecast.0` - Описание погоды на сегодня
* `weather.state.forecast.1` - погода на завтра
* `weather.title` - Очень краткое описание
* `weather.title.forecast.0` - Очень краткое описание на завтра
* `weather.title.short` - Очень, очень краткое описание (одно слово)
* `weather.type` - Тип информации о погоде

### Информация
* `info.ip` - IP-адрес устройства
* `info.mac` - MAC-адрес устройства
* `info.name` - имя устройства
* `info.address` - другой адрес (например, KNX)
* `info.serial` - серийный номер
* `info.firmware` - версия прошивки
* `info.hardware` - версия оборудования
* `info.port` - TCP-порт
* `info.standby` - true, если устройство находится в режиме ожидания
* `info.status` - статус устройства
* `info.display` - информация, отображаемая на экране устройства
* `info.model` - модель устройства
* `date.start` - строка или число
* `date.end` - строка или число

### Здоровье
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - индекс жировой массы тела в %.
* `value.health.weight` - масса тела в кг, фунтах
* `value.health.bmi` - индекс ИМТ
* `value.health.calories` - сожженные калории
* `value.health.steps` - выполнено шагов
* `value.health.bpm` - частота сердечных сокращений в минуту

Другие
* `url`
* `url.icon` — иконка (дополнительно каждый объект может иметь `common.icon`)
* `url.cam` - URL веб-камеры
* `url.blank` - открыть URL в новом окне
* `url.same` - открыть URL в этом окне
* `url.audio` - URL аудиофайла
* `text.phone` - номер телефона
* `time.span` — разница во времени в миллисекундах (common.type=number), т. е. время с момента последнего обновления, продолжительность операции, время до следующей попытки и т. д.
* `time.interval` - значение интервала в миллисекундах (common.type=number), т.е. некоторый интервал опроса.
* `time.timeout` — значение таймаута в миллисекундах (common.type=number), т.е. время ожидания для запросов связи.
* `chart` — массив JSON с данными для диаграммы, например: `[{ts: 1678575600000, val: 1}, {ts: 1678579200000, val: 2}]`

* `adapter.messagebox` (`common.type=object, common.write=true`) используется для отправки сообщений в email, pushover и другие адаптеры.
* `adapter.wakeup` (`common.type=boolean, common.write=true`) пробуждает адаптер из приостановленного режима