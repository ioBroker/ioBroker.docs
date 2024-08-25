---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/stateroles.md
title: Государственные роли
hash: qdw07mqB6d7XtYGvoKV1gB2DKu5esodk5wF5knok1FE=
---
# Государственные роли
Для объектов типа `state` необходимо, чтобы для свойства `common.role` была установлена одна из ролей, определенных в списке ниже.
Информация о роли является очень важной информацией и позволяет адаптерам визуализации и Smart-Assistant определять функцию объекта, а также то, как/если они связаны с другими объектами в том же канале, устройстве или папке.

Пример: RGB-лампа может иметь следующие три (или более) объекта с разными ролями, которые принадлежат друг другу:

* `switch` - (Вкл./Выкл.)
* `level.color.rgb` с цветовым кодом лампы #RRGGBB.
* `level.brightness` со значением яркости

Различные шаблоны устройств, используемые для обнаружения обязательных и дополнительных объектов, а также их роли можно найти в [Репозиторий типовых детекторов](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Общий
* `state` — очень распространенная цель. Если вы не знаете, какую роль играет государство, используйте эту.
* `текст` `common.type = строка`
* `text.url` `common.type = string` State val содержит URL-адрес для использования в привязке, iframe или img
* `html` `common.type = строка`
* `json` `common.type = строка`
* `list` `common.type = массив`
* `date` `common.type = string` - анализируется строкой `new Date(ddd)`
* `date` `common.type = число` - `эпоха секунд * 1000`

## Датчик (логические значения, только чтение)
`common.type=boolean, common.write=false`

* `sensor.window` - окно открыто-`true` или закрыто-`false`
* `sensor.door` - дверь открыта-`true` или закрыта-`false`
* `sensor.alarm` — какой-то общий сигнал тревоги
* `sensor.alarm.flood` - утечка воды
* `sensor.alarm.fire` - датчик пожара
* `sensor.alarm.secure` — открыта дверь, открыто окно или обнаружено движение во время тревоги.
* `sensor.alarm.power` - Нет питания ("напряжение = 0")
* `sensor.light` - сигнал от лампы о том, что она включена
* `sensor.lock` - фактическое положение замка
* `sensor.motion` - датчик движения
* `sensor.rain` — обнаружен дождь
* `sensor.noise` — обнаружен шум

## Кнопки (логические значения, только для записи)
`common.type=boolean, common.write=true, common.read=false`

* `кнопка`
* `button.long`
* `button.stop` — например. ролло стоп,
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

## Кнопки как датчик
`common.type=boolean, common.write=false, common.read=true`

* `button` — отличие от `common.write=false`. Пожалуйста, избегайте этой роли и используйте button.press или button.long.
* `button.long`
* `button.press`

## Значения (числа, только для чтения)
`common.type=number, common.write=false`

* `ценность`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) Важно иметь (`CLOSED/TILTED/ ОТКРЫТО`). Значения могут отличаться.
* `value.temperature` (`common.unit='°C' или '°F' или 'K'`)
* `значение.влажность`
* `value.co2` — CO2 (единица измерения: ppm)
* `value.brightness` - уровень освещенности (единицы измерения: люкс, )
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - уровень заряда батареи
* `value.valve` - уровень клапана
* `value.time` — getTime() объекта Date()
* `value.interval` (common.unit='sec') — интервал в секундах (может быть 0,1 или меньше)
* ~~value.date (common.type=string) - Дата в формате 2015.01.01 (без времени)~~
* ~~value.datetime (common.type=string) — дата и время в системном формате~~
* `value.gps.longitude` — координаты долготы GPS
* `value.gps.latitude` — широта GPS
* `value.gps.elevation` - высота GPS
* `value.gps` — долгота и широта вместе, например «5,56; 43,45».
* `value.gps.accuracy` - точность текущего измерения GPS
* `value.gps.radius` - радиус текущего измерения GPS
* ~~`value.power.consumption` — потребление энергии (единица = Втч или кВтч)~~
* ~~`value.power.production` — производство энергии (единица = Втч или кВтч)~~
* `value.energy` — энергия (единица = Втч, кВтч или м3 для бензина)
* `value.energy.active` - активная энергия (единица = Вт, Втч, кВтч)
* `value.energy.reactive` - реактивная энергия (единица измерения=вар, кварч)
* `value.energy.consumed` — потребляемая энергия (единица = Вт, Втч, кВтч)
* `value.energy.produced` — произведенная мощность (единица = Вт, Втч или кВтч)
* `value.power` - мощность энергии (единица измерения = Вт или кВт)
* `value.power.active` - активная мощность (единица измерения=Вт, кВт)
* `value.power.reactive` - реактивная мощность (единица измерения=вар, квар)
* `value.power.consumed` — потребляемая мощность (единица измерения = Вт или кВт)
* `value.power.produced` — произведенная мощность (единица измерения = Вт или кВт)
* `value.direction` - (common.type=number ~~or string~~, указывает вверх/вниз, влево/вправо, 4-позиционные переключатели, направление ветра, ...)
* `value.curtain` - фактическое положение шторы
* `value.blind` - фактическое положение жалюзи (`max = полностью открыто, min = полностью закрыто`)
* `value.tilt` - фактическое положение наклона (`max = полностью открыто, min = полностью закрыто`)
* `value.lock` - фактическое положение замка
* `value.speed` - скорость ветра
* `value.pressure` - (единица измерения: мбар)
* `value.distance`
* `value.distance.visibility`
* `value.severity` — некоторая серьезность (можно указать состояния), чем выше, тем важнее
* `value.warning` — некоторое предупреждение (можно указать состояния), чем выше, тем важнее
* `value.sun.elevation` - высота солнца в °
* `value.sun.azimuth` — азимут Солнца в °
* `value.voltage` - Напряжение в Вольтах, `unit=V`
* `value.current` - ток в амперах, `unit=A`
* `value. Frequency` - Частота в Гц, `unit=Гц`
* `value.fill` - Уровень заполнения, `unit=l,ml,m3,%`
* `value.blood.sugar` - Уровень сахара в крови, `unit=ммоль,мгдл`

## Индикаторы (логические, только для чтения)
`common.type=boolean, common.write=false`

Отличие *Индикаторов* от *Датчиков* заключается в том, что индикаторы отображаются в виде маленьких значков. Датчики как реальная ценность.
Так что индикатор может быть не один в канале. Это должно быть какое-то другое основное состояние внутри канала.

* `индикатор`
* `indicator.working` — указывает, что целевая система что-то выполняет, например, открывает жалюзи или замок.
* `indicator.reachable` — если устройство онлайн.
* `indicator.connected` — используется только для экземпляров. Используйте «indicator.reachable» для устройств.
* `indicator.maintenance` — указывает на системные предупреждения/ошибки, аварийные сигналы, сервисные сообщения, разряд батареи и тому подобное.
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` — true, если батарея разряжена
* `indicator.alarm` — то же, что и Indicator.maintenance.alarm.
* `indicator.alarm.fire` — обнаружен пожар
* `indicator.alarm.flood` — обнаружен флуд
* `indicator.alarm.secure` - открыта дверь или окно
* `indicator.alarm.health` — проблемы со здоровьем

## Уровни (числа, чтение-запись)
С помощью **levels** вы можете контролировать или устанавливать числовые значения.

`common.type=number, common.write=true`

* `уровень`
* `level.humidity` — влажность как заданное значение, т.е. для увлажнителей/климат-контроля
* `level.battery` — целевое напряжение/ёмкость батареи, т.е. для загрузки
* `level.battery.min` - минимальное напряжение/ёмкость батареи
* `level.battery.max` - максимальное напряжение/ёмкость батареи
* `level.valve` - значение открытия клапанов
* `уровень.давление` -
* `level.pressure.min` - минимально допустимое значение давления воздуха или масла.
* `level.pressure.max` - максимально допустимое значение давления воздуха или масла.
* `level.voltage` - целевое напряжение для генераторов
* `level.voltage.min` - минимальное напряжение для генераторов
* `level.voltage.max` - максимальное напряжение для генераторов
* `level.current` — целевой ток, например, для зарядки аккумуляторных устройств.
* `level.current.min` - минимальный ток, например, для зарядки аккумуляторных устройств.
* `level.current.max` — максимальный ток, например, для зарядки аккумуляторных устройств.
* `level. Frequency` - целевая частота для генераторов
* `level. Frequency.min` — минимальная частота для генераторов или сигналов тревоги электросети.
* `level. Frequency.max` — максимальная частота для генераторов или для сигнализации электросети.
* `level.fill` — заданное значение для любого состояния уровня заполнения контейнера.
* `level.min` - минимальный разрешенный уровень
* `level.max` - максимально допустимый уровень
* `level.default` - уровень по умолчанию
* `level.dimmer` - яркость тоже тусклее
* `level.blind` - установка положения жалюзи (max = полностью открыто, min = полностью закрыто)
* `level.temperature` - установить желаемую температуру
* `level.valve` - уставка положения клапана
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` — rgbW
* `level.color.hue` — цвет в °`0-360; 0=красный, 120=зеленый, 240=синий, 360=красный (циклический)`
* `level.color.saturation`
* `level.color.rgb` — шестнадцатеричный цвет, например `#rrggbb` (`common.type=string`)
* `level.color.rgbw` — шестнадцатеричный цвет, например `#rrggbbww` (`common.type=string`)
* `level.color.cie` - цвет объекта в форме `[x, y]` (`common.type=string)
* `level.color.luminance`
* `level.color.temperature` - цветовая температура в К° `2200 тёплого белого, 6500° холодного белого`
* `level.timer`
* `level.timer.sleep` — таймер сна. 0 - выключено или в минутах
* ...
* `level.volume` - (`min=0, max=100`) - громкость звука, но min, max может отличаться. мин <макс
* `level.volume.group` - (`min=0, max=100`) - громкость звука, для группы устройств
* `level.curtain` - установить положение шторы
* `level.tilt` - установка положения наклона жалюзи (max = полностью открыто, min = полностью закрыто)
* `level.speed` — скорость, например. вентилятор, вентилятор, ..

## Переключатели (логические значения, чтение-запись)
Переключатель управляет логическим устройством (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `переключатель`
* `switch.lock` — блокировка («true — открыть замок, false — закрыть замок»)
* `switch.lock.door` - дверной замок
* `switch.lock.window` - блокировка окна
* `switch.mode.boost` - запуск/остановка режима повышения температуры термостата.
* `switch.mode.party` - запуск/остановка режима вечеринки термостата.
* `switch.power` - включение/выключение питания, термостата или кондиционера.
* `переключатель.свет`
* `switch.comfort` - комфортный режим
* `switch.enable`
* `switch.mode.`*
* `switch.mode.auto` - автоматический режим вкл/выкл
* `switch.mode.manual` - включение/выключение ручного режима
* `switch.mode.silent` - беззвучный режим вкл/выкл
* `switch.mode.moonlight` - включение/выключение режима лунного света
* `switch.mode.color` - цветовой режим вкл/выкл
* `switch.gate` — закрывает(false) или открывает(true) ворота

## Кондиционер или термостат
* `level.mode.fan` - `АВТО, ВЫСОКИЙ, НИЗКИЙ, СРЕДНИЙ, ТИХИЙ, ТУРБО`
* `level.mode.swing` - `АВТО, ГОРИЗОНТАЛЬНО, СТАЦИОНАРНО, ВЕРТИКАЛЬНО`
* `level.mode.airconditioner` - кондиционер: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, термостат нагрева: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - термостат: `АВТО, РУЧНОЙ, ОТПУСК`,

 В дополнение к этим состояниям обычно для отображения кондиционера требуются `level.temperature` и `switch.power`.

TODO: Подумайте об ионизации и колебаниях.

## Пылесос
* `level.mode.cleanup` — перечисление `АВТО, ЭКО, ЭКСПРЕСС, НОРМАЛЬНЫЙ, ТИХИЙ`. Требуются только «АВТО» и «НОРМАЛЬНЫЙ».
* `level.mode.work` — перечисление `AUTO, FAST, MEDIUM, SLOW, TURBO`. Необязательное состояние.
* `value.water` - уровень воды 0-100%.
* `value.waste` - уровень мусорного бака 0-100%. (0% — пусто, 100% — полно)
* `indicator.maintenance.waste` - Мусорная корзина дура.
* `value.state` - `ДОМ, УБОРКА, ПАУЗА` и так далее.

Кроме того, для этих состояний обычно требуется `switch.power`, чтобы сопоставить пылесос. `switch.power` в данном случае работает как: `true` - очистить, `false` - вернуться домой.
Дополнительно `value.battery` и

## Ворота
* `switch.gate` - закрывает(false) или открывает(true) ворота (обязательно)
* `value.position` - положение ворот в процентах (100% открыты, 0% - закрыты)
* `value.gate` — то же, что `value.position`
* `button.stop` - остановить движение ворот

## СМИ
Особые роли для медиаплееров

* `button.stop`
* `button.play`
* `button.next`
* `button.prev`
* `кнопка.пауза`
* `переключатель.пауза`
* `button.forward`
* `button.reverse`
* `button.fastforward`
* `button.fastreverse`
* `button.volume.up`
* `button.volume.down`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 – нет, 1 – все, 2 – один
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - `['play','stop','pause']` или `[0 - пауза, 1 - воспроизведение, 2 - остановка]` или `[true - воспроизведение/false - пауза]`
* `media.artist`
* `медиа.альбом`
* `media.title`
* `media.title.next`
* `media.cover` — URL-адрес обложки
* `media.cover.big` — URL большой обложки
* `media.cover.small` — крошечный URL-адрес обложки
* `media.duration.text` — например, «2:35»
* `media.duration` - (`common.type=number`) секунды
* `media.elapsed.text` — например, «1:30»
* `media.elapsed` - (`common.type=number`) секунд
* `media.broadcastDate` - (`common.type=string`) Дата трансляции
* `media.mute` - (`common.type=boolean`) true отключен звук
* `media. Season` - (`common.type=string`) номер сезона (важно, чтобы тип действительно был "строковым", чтобы можно было указать отсутствие сезона с помощью "")
* `media.episode` - (`common.type=string`) номер эпизода (важно, чтобы тип действительно был «строковым», чтобы можно было указать отсутствие эпизода с помощью «»)
* `media.mute.group` - (`common.type=boolean`) отключение звука группы устройств
* `media.tts` — преобразование текста в речь
* `media.bitrate` - кбит/с
* `media.genre` — жанр песни
* `media.date` — песня года
* `media.track` - (`common.type=string`) идентификатор текущего воспроизводимого трека `[0 - ~]` (важно, чтобы тип действительно был `string`, чтобы можно было указать отсутствие трека с помощью "")
* `media.playid` - идентификатор трека медиаплеера
* `media.add` — добавить текущий плейлист
* `media.clear` — очистить текущий плейлист (только запись)
* `media.playlist` — массив json, например
* `media.url` — URL-адрес для воспроизведения или текущий URL-адрес
* `media.url.announcement` — URL для воспроизведения объявления.
* `media.jump` - Количество элементов в плейлисте для перехода (может быть отрицательным)
* `media.content` — тип воспроизводимого мультимедиа, например аудио/mp3.
* `media.link` — состояние текущего файла
* `media.input` — номер или строка входа (AUX, AV, TV, SAT, ...)
* `level.bass` - Уровень баса
* `level.treble` - Уровень высоких частот
* `switch.power.zone` - зона мощности

```
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

* `media.browser` — массив json типа «файлы»

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
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

## Погода
* `value.temperature` — Фактическая температура
* `value.temperature.windchill` — фактическое охлаждение ветром
* `value.temperature.dewpoint` — Фактическая точка росы
* `value.temperature.feelslike` — Фактическая температура «по ощущениям»
* `value.temperature.min` — минимальная температура за последние 24 часа.
* `value.temperature.max` — Максимальная температура за последние 24 часа.
* `value.humidity` — фактическая или средняя влажность
* `value.humidity.min` — фактическая влажность
* `value.humidity.max` - фактическая влажность
* `value.speed.wind` - фактическая или средняя скорость ветра
* `value.speed.max.wind` - максимальная скорость ветра за последние 24 часа.
* `value.speed.min.wind` - минимальная скорость ветра за последние 24 часа.
* `value.speed.wind.gust` - фактическая скорость порыва ветра
* `value.direction.wind` — фактическое или среднее направление ветра в градусах.
* `value.direction.max.wind` - фактическое направление ветра в градусах
* `value.direction.min.wind` - фактическое направление ветра в градусах.
* `weather.direction.wind` — фактическое или среднее направление ветра в виде текста, например: Северо-северо-запад
* `date` — фактическая дата или дата последнего прочтения информации
* `date.sunrise` — восход солнца на сегодняшний день.
* `date.sunset` - Закат на сегодня
* `dayofweek` — день недели в виде текста
* `location` — текстовое описание местоположения (например, адрес)
* `weather.icon` — URL-адрес значка фактического состояния на данный момент.
* `weather.icon.wind` — актуальный URL-адрес значка ветра на данный момент.
* `weather.icon.name` — фактическое имя значка состояния на данный момент.
* `weather.state` — фактическое описание погоды.
* `value.precipitation` - (`type: number, unit: mm`) осадки за последние 24 часа в виде дождя/снега (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.hour` - Фактический уровень осадков за последний час
* `value.precipitation.today` - Фактический уровень осадков на сегодня (до 0:00)
* `value.precipitation.chance` — фактическая вероятность осадков на сегодня.
* `value.precipitation.type` — Фактический тип осадков на сегодня. (`тип: число`) Состояния: 0 - НЕТ, 1 - ДОЖДЬ, 2 - СНЕГ, 3 - ГРАД
* `value.radiation` - Фактический уровень солнечной радиации
* `value.uv` — Фактический уровень UV
* `value.clouds` - Облака на небе. 0% — облаков нет, 100% — много облаков.
* `value.rain` — Фактический уровень дождя за последние 24 часа.
* `value.rain.hour` — Фактический уровень дождя за последний час.
* `value.rain.today` - Фактический уровень дождя на сегодня (до 0:00)
* `value.snow` — Фактический уровень снега за последние 24 часа.
* `value.snow.hour` — Фактический уровень снега за последний час.
* `value.snow.today` - Фактический уровень снега на сегодня (до 0:00)
* `value.snowline` — Фактическая линия снега в метрах.
* `weather.chart.url` — URL-адрес диаграммы с историей погоды.
* `weather.chart.url.forecast` — URL-адрес диаграммы с прогнозом погоды.
* `weather.html` — HTML-объект с описанием погоды.
* `weather.title` — очень краткое описание.
* `weather.title.short` — Очень, очень короткое описание (Одно слово)
* `weather.type` — Тип информации о погоде.
* `weather.json` — объект JSON с конкретными данными
* `value.speed.wind.forecast.0` - прогноз скорости ветра на сегодня
* `weather.state.forecast.0` - Описание погоды на сегодня.
* `value.direction.wind.forecast.0` - прогноз направления ветра на сегодня в градусах
* `weather.direction.wind.forecast.0` — прогноз направления ветра на сегодня в виде текста
* `value.pressure.forecast.0` - прогноз давления на сегодня
* `value.temperature.min.forecast.0` — прогноз минимальной температуры на сегодня.
* `value.temperature.max.forecast.0` — прогноз максимальной температуры на сегодня.
* `value.precipitation.forecast.0` - (`тип: число, единица измерения: %`) Прогноз вероятности осадков на сегодня
* `value.precipitation.forecast.0` - (`тип: число, единица измерения: мм`) Прогноз уровня осадков на сегодня
* `weather.title.forecast.0` — Очень краткое описание на завтра.
* `value.precipitation.day.forecast.0` - Прогноз осадков на дневное время
* `value.precipitation.night.forecast.0` - Прогноз осадков на ночное время

* `date.forecast.1` - завтрашняя дата
* `weather.icon.forecast.1` — иконка завтрашнего дня
* `weather.state.forecast.1` — погода на завтра
* `value.temperature.min.forecast.1`
* `value.temperature.max.forecast.1`
* `value.precipitation.forecast.1` - (`тип: число, единица измерения: %`) Прогноз вероятности осадков на завтра
* `value.precipitation.forecast.1` - (`тип: число, единица: мм`) Прогноз уровня осадков на завтра
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## Информация
* `info.ip` - ip устройства
* `info.mac` - Mac устройства
* `info.name` - имя устройства
* `info.address` — какой-то другой адрес (например KNX)
* `info.serial` — серийный номер
* `info.firmware` - версия прошивки
* `info.hardware` — версия оборудования
* `info.port` — TCP-порт
* `info.standby` — true, если устройство находится в режиме ожидания.
* `info.status` - статус устройства
* `info.display` — информация, отображаемая на дисплее устройства
* `date.start` — строка или число
* `date.end` — строка или число

## Здоровье
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - индекс жира в организме в %
* `value.health.weight` - масса тела в кг, фунтах
* `value.health.bmi` — индекс ИМТ
* `value.health.калории` — сожженные калории
* `value.health.steps` — выполненные шаги
* `value.health.bpm` — число ударов сердца в минуту

## Другие
* `URL`
* `url.icon` - иконка (дополнительно каждый объект может иметь `common.icon`)
* `url.cam` - URL веб-камеры
* `url.blank` - открыть URL в новом окне
* `url.same` - открыть URL в этом окне
* `url.audio` — URL-адрес аудиофайла.
* `text.phone` — номер телефона
* `time.span` - разница во времени в мс (common.type=number), т.е. время с момента последнего обновления, длительность операции, время до следующей попытки,...
* `time.interval` - значение интервала в мс (common.type=number), т.е. некоторый интервал опроса
* `time.timeout` - значение таймаута в мс (common.type=number), т.е. таймауты для запросов на связь
* `chart` — массив JSON с данными диаграммы, например `[{ts: 1678575600000, val: 1}, {ts: 1678579200000, val: 2}]`

* `adapter.messagebox` (`common.type=object, common.write=true`), используемый для отправки сообщений на электронную почту, pushover и другие адаптеры.
* `adapter.wakeup` (`common.type=boolean, common.write=true`) выводит адаптер из приостановленного режима
