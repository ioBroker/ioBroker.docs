---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/stateroles.md
title: Государственные роли
hash: RIoaLUKHMF+3b7Pjv2VrwWbHfSu0ld2jZl6DjjgW7kU=
---
# Государственные роли
Для объектов типа «State» необходимо, чтобы их свойству common.role была присвоена одна из ролей, указанных в списке ниже. Информация о ролях является очень важной информацией и позволяет адаптерам Visualization- и Smart-Assistant определять функцию объекта, а также то, как / если они связаны с другими объектами в том же канале, устройстве или папке.

Пример: Лампа RGB может иметь следующие три объекта (или более) с разными ролями, которые принадлежат друг другу:

* переключатель (Вкл. / Выкл.)
* level.color.rgb с цветовым кодом лампы #RRGGBB
* level.brightness со значением яркости

Различные шаблоны устройств, используемые для обнаружения с обязательными и дополнительными объектами и их ролями, можно найти в [Репозиторий детекторов типов](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Общий
* `состояние` - очень распространенная цель. Если вы не знаете, какую роль играет государство, используйте эту.
* `текст`` common.type = string`
* `text.url`` common.type = string` state val содержит URL-адрес для использования в привязке, iframe или img
* `html`` common.type = string`
* `json`` common.type = string`
* `список`` common.type = array`
* `date`` common.type = string` - анализируется строкой `new Date (ddd)`
* `date`` common.type = number` - эпоха в секундах * 1000

## Датчик (логические, только для чтения)
`common.type=boolean, common.write=false`

* `sensor.window` - окно открыто-` истинно` или закрыто-`ложно`
* `sensor.door` - дверь открыта-` истинно` или закрыта-`ложно`
* `sensor.alarm` - какая-то обычная тревога
* `sensor.alarm.flood` - утечка воды
* `sensor.alarm.fire` - датчик пожара
* «sensor.alarm.secure» - дверь открыта, открыто окно или обнаружено движение при тревоге.
* `sensor.alarm.power` - Нет питания (напряжение = 0)
* `sensor.light` - обратная связь от лампы, что она горит
* `sensor.lock` - фактическое положение замка
* `sensor.motion` - датчик движения
* `sensor.rain` - обнаружен дождь
* `sensor.noise` - обнаружен шум

## Кнопки (логические, только для записи)
`common.type=boolean, common.write=true, common.read=false`

* `button`
* `button.long`
* `button.stop` - например, ролло-стоп,
* `button.stop.tilt`
* `button.start`
* `button.open.door`
* `button.open.window`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
*`button.mode.`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

## Кнопки как сенсор
`common.type=boolean, common.write=false, common.read=true`

* `button` - разница, что` common.write = false`. Избегайте этой роли и используйте button.press или button.long.
* `button.long`
* `button.press`

## Значения (числа, только для чтения)
`common.type=number, common.write=false`

* `значение`
* `value.window` (common.states = {" 0 ":" CLOSED "," 1 ":" TILTED "," 2 ":" OPEN "}) Важно иметь (CLOSED / TILTED / OPEN). Значения могут отличаться.
* `значение.температура` (common.unit = '°C', '°F' или 'K')
* `value.humidity`
* `value.brightness` - уровень яркости (единица: люкс,)
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - уровень заряда батареи
* `value.valve` - уровень клапана
* `value.time` - getTime () объекта Date ()
* `value.interval` (common.unit = 'sec') - Интервал в секундах (может быть 0,1 или меньше)
* ~~ value.date (common.type = string) - Дата в форме 2015.01.01 (без времени) ~~
* ~~ value.datetime (common.type = string) - Дата и время в системном формате ~~
* `value.gps.longitude` - координаты долготы gps
* `value.gps.latitude` - широта GPS
* `value.gps.elevation` - высота по GPS
* `value.gps` - долгота и широта вместе, например '5.56; 43.45'
* `value.power` - фактическая мощность (единица измерения = Вт или кВт)
* `value.power.consuming` - потребление энергии (единица измерения = Втч или кВтч)
* `value.direction` - (common.type = number ~~ или строка ~~, указывает вверх / вниз, влево / вправо, 4-позиционные переключатели, направление ветра, ...)
* `value.curtain` - фактическое положение занавеса
* `value.blind` - фактическое положение жалюзи (max = полностью открыто, min = полностью закрыто)
* `value.tilt` - фактическое положение наклона (max = полностью открыто, min = полностью закрыто)
* `value.lock` - фактическое положение замка
* `value.speed` - скорость ветра
* `value.pressure` - (единица измерения: мбар)
* `value.distance`
* `value.distance.visibility`
* `value.severity` - некоторая степень серьезности (можно указать состояния), чем выше, тем важнее
* `value.warning` - некоторое предупреждение (можно указать состояния), чем выше, тем важнее
* `value.sun.elevation` - высота солнца в °
* `value.sun.azimuth` - азимут солнца в °
* `value.voltage` - Напряжение в вольтах, единица = В
* `value.current` - ток в амперах, единица = A
* `value.fill` - Уровень заполнения, единица = л, мл, м3,%
* `value.blood.sugar` - значение сахара в крови, единица = ммоль, мгдл

## Индикаторы (логические, только для чтения)
`common.type=boolean, common.write=false`

Отличие *индикаторов* от *датчиков* заключается в том, что индикаторы отображаются в виде небольшого значка. Датчики как реальная ценность.
Так что индикатор может быть не один в канале. Это должно быть какое-то другое главное состояние внутри канала.

* `индикатор`
* `indicator.working` - указывает, что целевые системы что-то выполняют, например, жалюзи или открывание замка.
* `indicator.reachable` - если устройство в сети
* `indicator.connected` - используется только для экземпляров. Используйте indicator.reachable для устройств
* `indicator.main maintenance` - указывает системные предупреждения / ошибки, сигналы тревоги, служебные сообщения, разряд батареи и тому подобное.
* `indicator.main maintenance.lowbat`
* `indicator.main maintenance.unreach`
* `indicator.main maintenance.alarm`
* `indicator.lowbat` - истина при низком заряде батареи
* `indicator.alarm` - то же, что и indicator.main maintenance.alarm
* `indicator.alarm.fire` - обнаружен пожар
* `indicator.alarm.flood` - обнаружено наводнение
* `indicator.alarm.secure` - дверь или окно открыто
* `indicator.alarm.health` - проблема со здоровьем

## Уровни (числа, чтение-запись)
С помощью **уровней** вы можете контролировать или устанавливать какое-либо числовое значение.

`common.type=number, common.write=true`

* `уровень`
* `level.co2` - качество изображения 0-100%
* `level.dimmer` - яркость тоже тусклее
* `level.blind` - установить положение жалюзи (max = полностью открыто, min = полностью закрыто)
* `level.temperature` - установить желаемую температуру
* `level.valve` - уставка положения клапана
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - цвет в ° 0-360; 0 = красный, 120 = зеленый, 240 = синий, 360 = красный (циклический)
* `level.color.saturation`
* `level.color.rgb` - шестнадцатеричный цвет вроде '#rrggbb'
* `level.color.luminance`
* `level.color.temperature` - цветовая температура в K ° 2200 теплый-белый, 6500 ° холодный белый
* `level.timer`
* `level.timer.sleep` - таймер сна. 0 - выкл или через минуты
* ...
* `level.volume` - (min = 0, max = 100) - громкость звука, но min, max могут отличаться. мин <макс
* `level.volume.group` - (min = 0, max = 100) - громкость звука, для группы устройств
* `level.curtain` - установить положение шторки
* `level.tilt` - установить положение наклона жалюзи (max = полностью открыты, min = полностью закрыты)

## Переключатели (логические, чтение-запись)
Переключатель управляет логическим устройством (true = ON, false = OFF)

`common.type=boolean, common.write=true`

* `переключатель`
* `switch.lock` - блокировка (true - открыть блокировку, false - закрыть блокировку)
* `switch.lock.door` - дверной замок
* `switch.lock.window` - блокировка окна
* `switch.mode.boost` - запуск / остановка повышенного режима термостата
* `switch.mode.party` - запуск / остановка режима вечеринки термостата
* `switch.power` - включение / выключение термостата или кондиционера
* `switch.light`
* `switch.comfort` - комфортный режим
* `switch.enable`
* `switch.power` - включение / выключение питания
*`switch.mode.`*
* `switch.mode.auto` - включение / выключение автоматического режима
* `switch.mode.manual` - включение / выключение ручного режима
* `switch.mode.silent` - включение / выключение беззвучного режима
* `switch.mode.moonlight` - включение / выключение режима лунного света
* `switch.mode.color` - включение / выключение цветового режима
* `switch.gate '- закрывает (false) или открывает (true) ворота

## Кондиционер или термостат
* `level.mode.fan` -` АВТО, ВЫСОКИЙ, НИЗКИЙ, СРЕДНИЙ, ТИХОЙ, ТУРБО`
* `level.mode.swing` -` АВТО, ГОРИЗОНТАЛЬНО, СТАЦИОНАРНЫЙ, ВЕРТИКАЛЬНЫЙ`
* `level.mode.airconditioner` - кондиционер:` AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, термостат отопления: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - термостат:` AUTO, MANUAL, VACATION`,

 В дополнение к этим состояниям обычно требуются `level.temperature` и `switch.power`, необходимые для отображения кондиционера.

TODO: подумайте об ионизации и колебаниях.

## Пылесос
* `level.mode.cleanup` - Перечисление` AUTO, ECO, EXPRESS, NORMAL, QUIET`. Требуются только «АВТО» и «НОРМАЛЬНЫЙ».
* `level.mode.work` - Перечисление` AUTO, FAST, MEDIUM, SLOW, TURBO`. Необязательное состояние.
* `value.water` - уровень воды 0-100%.
* `value.waste` - уровень мусора 0-100%. (0% - пусто, 100% - полно)
* `indicator.main maintenance.waste` - мусорное ведро дурацкое.
* `value.state` -` HOME, CLEANING, PAUSE` и так далее.

В дополнение к этим состояниям обычно требуются `switch.power`, необходимые для отображения пылесоса. `switch.power` в этом случае работает как: `true` - очистить, `false` - вернуться домой.
Необязательно `value.battery` и

## Ворота
* `switch.gate` - закрывает (false) или открывает (true) ворота (обязательно)
* `value.position` - положение ворот в процентах (100% открыто, 0% - закрыто)
* `value.gate` - то же, что` value.position`
* `button.stop` - остановить движение ворот

## СМИ
Специальные роли для медиаплееров

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
* `media.seek` - (common.type = number)%
* `media.mode.shuffle` - (common.type = number) 0 - нет, 1 - все, 2 - один
* `media.mode.repeat` - (common.type = boolean)
* `media.state` - ['play', 'stop', 'pause'] или [0 - пауза, 1 - воспроизведение, 2 - стоп] или [true - воспроизведение / false - пауза]
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover` - URL обложки
* `media.cover.big` - большая ссылка на обложку
* `media.cover.small` - крошечный URL обложки
* `media.duration.text` - например," 2:35 "
* `media.duration` - (common.type = number) секунд
* `media.elapsed.text` - например," 1:30 "
* `media.elapsed` - (common.type = number) секунды
* `media.broadcastDate` - (common.type = string) Дата трансляции
* `media.mute` - (common.type = boolean) true отключен
* `media.season` - (common.type = string) номер сезона (важно, что тип действительно" строка ", чтобы можно было указать отсутствие сезона с помощью" ")
* `media.episode` - (common.type = string) номер эпизода (важно, что тип действительно" строка ", чтобы можно было указать отсутствие эпизода с помощью" ")
* `media.mute.group` - (common.type = boolean) отключение звука группы устройств
* `media.tts` - преобразование текста в речь
* `media.bitrate` - кбит / с
* `media.genre` - жанровая песня
* `media.date` - песня года
* `media.track` - (common.type = string) идентификатор текущей воспроизводимой дорожки [0 - ~] (важно, что тип действительно" строка ", чтобы можно было указать отсутствие дорожки знаком" ")
* `media.playid` - идентификатор трека медиаплеера
* `media.add` - добавить текущий плейлист
* `media.clear` - очистить текущий плейлист (только для записи)
* `media.playlist` - массив json вроде
* `media.url` - url для воспроизведения или текущий url
* `media.url.announcement` - URL для воспроизведения объявления
* `media.jump` - количество элементов для перехода в плейлист (может быть отрицательным)
* `media.content` - Тип воспроизводимого мультимедиа, например аудио / mp3.
* `media.link` - Состояние с текущим файлом
* `media.input` - номер или строка входа (AUX, AV, TV, SAT, ...)
* `level.bass` - Уровень низких частот
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

* `media.browser` - массив json типа" файлы "

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
* `value.temperature` - Фактическая температура
* `value.temperature.windchill` - Фактическое охлаждение ветром
* `value.temperature.dewpoint` - Фактическая точка росы
* `value.temperature.feelslike` - Фактическая температура" ощущается как "
* `value.temperature.min` - Минимальная температура за последние 24 часа
* `value.temperature.max` - максимальная температура за последние 24 часа
* `value.humidity` - фактическая или средняя влажность
* `value.humidity.min` - фактическая влажность
* `value.humidity.max` - фактическая влажность
* `value.speed.wind` - фактическая или средняя скорость ветра
* `value.speed.max.wind` - максимальная скорость ветра за последние 24 часа
* `value.speed.min.wind` - минимальная скорость ветра за последние 24 часа
* `value.speed.wind.gust` - фактическая скорость порыва ветра
* `value.direction.wind` - фактическое или среднее направление ветра в градусах
* `value.direction.max.wind` - фактическое направление ветра в градусах
* `value.direction.min.wind` - фактическое направление ветра в градусах
* `weather.direction.wind` - фактическое или среднее направление ветра в виде текста, например NNW
* `date` - актуальная дата или дата последнего чтения информации
* `date.sunrise` - восход солнца на сегодня
* `date.sunset` - Закат на сегодня
* `dayofweek` - день недели в виде текста
* `location` - текстовое описание местоположения (например, адрес)
* `weather.icon` - актуальный URL иконки состояния на данный момент
* `weather.icon.wind` - актуальный URL иконки ветра на данный момент
* `weather.icon.name` - Текущее название иконки состояния на данный момент
* `weather.state` - Актуальное описание погоды
* `value.precipitation` - (тип: число, единица измерения: мм) количество осадков за последние 24 часа дождь / снег (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.hour` - Фактический уровень осадков за последний час
* `value.precipitation.today` - Фактический уровень осадков на сегодня (до 0:00)
* `value.precipitation.chance` - Фактическая вероятность осадков на сегодня
* `value.precipitation.type` - актуальный тип осадков на сегодня. (тип: `number`) Состояния: 0 - НЕТ, 1 - ДОЖДЬ, 2 - СНЕГ, 3 - ГРАД
* `value.radiation` - Фактический уровень солнечной радиации
* `value.uv` - Фактический уровень УФ
* `value.clouds` - Облака на небе. 0% - облаков нет, 100% - облаков много.
* `value.rain` - Фактический уровень дождя за последние 24 часа
* `value.rain.hour` - Фактический уровень дождя за последний час
* `value.rain.today` - Фактический уровень дождя на сегодня (до 0:00)
* `value.snow` - Фактический уровень снега за последние 24 часа
* `value.snow.hour` - Фактический уровень снега за последний час
* `value.snow.today` - Актуальный уровень снега на сегодня (до 0:00)
* `value.snowline` - Фактическая линия снега в метрах
* `weather.chart.url` - URL-адрес диаграммы для истории погоды
* `weather.chart.url.forecast` - URL-адрес диаграммы для прогноза погоды
* `weather.html` - HTML-объект с описанием погоды
* `weather.title` - Очень краткое описание
* `weather.title.short` - очень, очень краткое описание (одно слово)
* `weather.type` - Тип информации о погоде
* `weather.json` - объект JSON с конкретными данными
* `value.speed.wind.forecast.0` - прогноз скорости ветра на сегодня
* `weather.state.forecast.0` - Описание погоды на сегодня
* `value.direction.wind.forecast.0` - прогноз направления ветра на сегодня в градусах
* `weather.direction.wind.forecast.0` - прогноз направления ветра на сегодня в виде текста
* `value.pressure.forecast.0` - прогноз давления на сегодня
* `value.temperature.min.forecast.0` - Мин. прогноз температуры на сегодня
* `value.temperature.max.forecast.0` - Прогноз максимальной температуры на сегодня
* `value.precipitation.forecast.0` - (type: number, unit:%) Прогноз вероятности осадков на сегодня
* `value.precipitation.forecast.0` - (тип: число, единица: мм) Прогноз уровня осадков на сегодня
* `weather.title.forecast.0` - Очень краткое описание на завтра
* `value.precipitation.day.forecast.0` - Прогноз осадков на дневное время
* `value.precipitation.night.forecast.0` - Прогноз осадков на ночь

* `date.forecast.1` - завтрашняя дата
* `weather.icon.forecast.1` - значок завтра
* `weather.state.forecast.1` - состояние погоды на завтра
* `значение.температура.мин.прогноз.1`
* `значение.температура.макс.прогноз.1`
* `value.precipitation.forecast.1` - (type: number, unit:%) Прогноз вероятности осадков на завтра
* `value.precipitation.forecast.1` - (тип: число, единица: мм) Прогноз уровня осадков на завтра
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## Информация
* `info.ip` - ip устройства
* `info.mac` - mac устройства
* `info.name` - имя устройства
* `info.address` - какой-либо другой адрес (например, KNX)
* `info.port` - порт tcp
* `info.standby` - true, если устройство в режиме ожидания
* `info.status` - статус устройства
* `info.display` - информация, отображаемая на дисплее устройства
* `date.start` - строка или число
* `date.end` - строка или число

## Здоровье
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - индекс жировой прослойки в%
* `value.health.weight` - масса тела в кг, фунтах
* `value.health.bmi` - индекс bmi
* `value.health.calories` - сожженные калории
* `value.health.steps` - шаги сделаны
* `value.health.bpm` - сердцебиение в минуту

## Другое
* `url`
* `url.icon` - иконка (дополнительно у каждого объекта может быть common.icon)
* `url.cam` - url веб-камеры
* `url.blank` - открыть URL в новом окне
* `url.same` - открыть URL в этом окне
* `url.audio` - URL аудиофайла
* `text.phone` - номер телефона

* `adapter.messagebox` (common.type = object, common.write = true), используемый для отправки сообщений на электронную почту, pushover и другие адаптеры
* `adapter.wakeup` (common.type = boolean, common.write = true) пробуждает адаптер из приостановленного режима