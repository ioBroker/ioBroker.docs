---
lastChanged: 24.01.2022
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/basics/roles.md
title: Скользящие точки данных
hash: VpeRGEGN/hE2uKbhNCl43FaSqZoQ69UIxWld/aRyCSU=
---
# Скользящие точки данных
Для объектов типа `state` свойству `common.role` должна быть присвоена одна из ролей, определенных в списке ниже.
Информация о роли является очень важной информацией и позволяет адаптерам визуализации и интеллектуального помощника распознавать функцию объекта, а также то, как/если они связаны с другими объектами в том же канале, устройстве или папке.

Пример. Лампа RGB может иметь следующие три (или более) объекта с разными ролями, которые принадлежат друг другу:

* `switch` - (Вкл./Выкл.)
* `level.color.rgb` с цветовым кодом лампы #RRGGBB.
* `level.brightness` со значением яркости

Различные шаблоны устройств, используемые для обнаружения с обязательными и дополнительными объектами и их ролями, можно найти в [Хранилище типовых детекторов](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## В целом
* `state` — очень общее назначение, используется, когда неизвестно, какую роль играет точка данных.
* `текст` `common.type = строка`
* `text.url` `common.type = string` val содержит URL-адрес для использования в привязке, iframe или img.
* `html` `common.type = строка`
* `json` `common.type = строка`
* `list` `common.type = массив`
* `date` `common.type = string` - анализируется строкой `new Date(ddd)`
* `date` `common.type = число` - `эпоха секунд * 1000`

## Датчик (логический, только для чтения)
`common.type=boolean, common.write=false`

* `sensor.window` - Окно открыто-`true` или закрыто-`false`
* `sensor.door` - Дверь открыта-`истина` или закрыта-`ложь`
* `sensor.alarm` — некоторые общие сигналы тревоги
* `sensor.alarm.flood` - утечка воды
* `sensor.alarm.fire` - Датчик пожара
* `sensor.alarm.secure` — дверь открыта, окно открыто или обнаружено движение, когда сигнализация включена.
* `sensor.alarm.power` - Нет питания ("напряжение = 0")
* `sensor.light` - Обратная связь от лампы о том, что она включена
* `sensor.lock` - текущее положение замка
* `sensor.motion` - датчик движения
* `sensor.rain` - Обнаружен дождь
* `sensor.noise` — обнаружен шум

## Ключи (логические, только запись)
`common.type=boolean, common.write=true, common.read=false`

* `кнопка`
* `button.long`
* `button.stop` — например, остановка рольставней,
* `button.stop.tilt`
* `button.start`
* `button.open.door`
* `button.window.open`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

## Кнопки как датчики
`common.type=boolean, common.write=false, common.read=true`

* `button` — отличие от `common.write=false`. Пожалуйста, избегайте этой роли и используйте button.press или button.long.
* `button.long`
* `button.press`

## Значения (числа, только для чтения)
`common.type=number, common.write=false`

* `ценность`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) Это важно (`CLOSED/TILTED/OPEN " ). Значения могут отличаться.
* `value.temperature` (`common.unit='°C' или '°F' или 'K'')
* `значение.влажность`
* `value.brightness` - яркость (единицы измерения: люкс, )
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - уровень заряда батареи
* `value.valve` - уровень клапана
* `value.time` — getTime() объекта Date()
* `value.interval` (common.unit='sec') — интервал в секундах (может быть 0,1 или меньше)
* ~~value.date (common.type=string) — дата в виде 2015.01.01 (без времени)~~
* ~~value.datetime (common.type=string) — дата и время в системном формате~~
* `value.gps.longitude` — координаты долготы GPS
* `value.gps.latitude` - широта GPS
* `value.gps.elevation` - высота GPS
* `value.gps` — долгота и широта вместе, например, «5,56; 43,45».
* `value.gps.accuracy` — Точность текущего измерения GPS.
* `value.gps.radius` — Радиус текущего измерения GPS
* `value.power` — фактическая мощность (единица измерения = Вт или кВт)
* `value.power.consumption` — потребление энергии (единица = Втч или кВтч)
* `value.power.reactive` - реактивная мощность (единица измерения = Вар)
* `value.direction` - (common.type=число ~~или строка~~, отображает вверх/вниз, влево/вправо, 4-позиционный переключатель, направление ветра, ...)
* `value.curtain` - текущее положение шторы
* `value.blind` - текущее положение жалюзи (`max = полностью открыто, min = полностью закрыто`)
* `value.tilt` - текущее положение наклона (`max = полностью открыто, min = полностью закрыто`)
* `value.lock` - текущая позиция замка
* `value.speed` - Скорость ветра
* `value.pressure` - (Единица измерения: мбар)
* `значение.дистанция`
* `value.distance.visibility`
* `value.severity` - определенная серьезность (можно указать условия), чем выше, тем важнее
* `value.warning` - некоторые предупреждения (можно указать состояния), чем выше, тем важнее
* `value.sun.elevation` - Положение Солнца в °
* `value.sun.azimuth` - Азимут Солнца в °
* `value.voltage` - Напряжение в вольтах, `unit=V`
* `value.current` - ток в амперах, `unit=A`
* `value.fill` - Уровень заполнения, `unit=l,ml,m3,%`
* `value.blood.sugar` - Уровень сахара в крови, `unit=ммоль,мгдл`

## Индикаторы (логические, только для чтения)
`common.type=boolean, common.write=false`

Разница между *Индикаторами* и *Датчиками* заключается в том, что индикаторы отображаются в виде небольшого значка. Датчики как реальная ценность.
Таким образом, индикатор не может находиться один в канале. Это должен быть еще один основной статус внутри канала.

* `индикатор`
* `indicator.working` — указывает, что целевая система что-то делает, например закрывает жалюзи или открывает замки.
* `indicator.reachable` — если устройство онлайн.
* `indicator.connected` — используется только для экземпляров. Используйте «indicator.reachable» для устройств.
* `indicator.maintenance` — отображает системные предупреждения/ошибки, аварийные сигналы, сервисные сообщения, низкий заряд батареи и т.п.
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` — true, если батарея разряжена
* `indicator.alarm` — то же, что и индикатор.maintenance.alarm.
* `indicator.alarm.fire` - Обнаружен пожар
* `indicator.alarm.flood` — обнаружен наводнение
* `indicator.alarm.secure` — Дверь или окно открыты.
* `indicator.alarm.health` — проблема со здоровьем.

##Уровень/уровень (цифры, чтение-запись)
С помощью **Уровней** вы можете контролировать или устанавливать числовое значение.

`common.type=number, common.write=true`

* `уровень`
* `level.co2` - качество воздуха 0-100%.
* `level.dimmer` - яркость тоже темнее
* `level.blind` - установка положения жалюзи (max = полностью открыто, min = полностью закрыто)
* `level.temperature` - установить желаемую температуру
* `level.valve` — уставка положения клапана.
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` — rgbW
* `level.color.hue` — цвет в ° `0-360; 0=красный, 120=зеленый, 240=синий, 360=красный (циклический)`
* `level.color.saturation`
* `level.color.rgb` — шестнадцатеричный цвет, например `#rrggbb`
* `level.color.luminance`
* `level.color.temperature` - цветовая температура в К° `2200 тёплый белый, 6500° холодный белый`
* `level.timer`
* `level.timer.sleep` - Таймер сна. 0 - выключено или в минутах
* ...
* `level.volume` - (`min=0, max=100`) - Громкость, но min, max могут отличаться. мин <макс
* `level.volume.group` - (`min=0, max=100`) - Громкость, для группы устройств
* `level.curtain` - Установить положение шторы
* `level.tilt` - Установка положения наклона жалюзи (макс = полностью открыто, мин = полностью закрыто)

## Переключатель (логический, чтение-запись)
Переключатель управляет логическим устройством (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `переключатель`
* `switch.lock` — блокировка («true — открыть замок, false — закрыть замок»)
* `switch.lock.door` - дверной замок
* `switch.lock.window` - Блокировка окна
* `switch.mode.boost` — запуск/остановка режима повышения температуры термостата.
* `switch.mode.party` - запуск/остановка режима вечеринки с термостатом.
* `switch.power` - Включение/выключение термостата или кондиционера.
* `переключатель.свет`
* `switch.comfort` - Комфортный режим
* `switch.enable`
* `switch.power` - Включение/выключение питания.
* `switch.mode`*
* `switch.mode.auto` - автоматический режим вкл/выкл
* `switch.mode.manual` - включение/выключение ручного режима
* `switch.mode.silent` - Беззвучный режим вкл./выкл.
* `switch.mode.moonlight` - режим лунного света вкл/выкл
* `switch.mode.color` - Цветовой режим вкл/выкл
* `switch.gate` - закрыть(false) или открыть(true) ворота

## Кондиционер или термостат
* `level.mode.fan` - `АВТО, ВЫСОКИЙ, НИЗКИЙ, СРЕДНИЙ, ТИХИЙ, ТУРБО`
* `level.mode.swing` - `АВТО, ГОРИЗОНТАЛЬНО, СТАЦИОНАРНО, ВЕРТИКАЛЬНО`
* `level.mode.airconditioner` - кондиционер: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, термостат отопления: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - термостат: `АВТО, РУЧНОЙ, ОТПУСК`,

 В дополнение к этим состояниям для отображения системы кондиционирования воздуха обычно требуются `level.temperature` и `switch.power`.

ЗАДАЧА: Подумайте об ионизации и колебаниях.

## Пылесос
* `level.mode.cleanup` — перечисление `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Требуются только «АВТО» и «НОРМАЛЬНЫЙ».
* `level.mode.work` — перечисление `AUTO, FAST, MEDIUM, SLOW, TURBO`. Необязательное условие.
* `value.water` - уровень воды 0-100%.
* `value.waste` - уровень мусорного бака 0-100%. (0% — пусто, 100% — полно)
* `indicator.maintenance.waste` — Мусорная корзина — это тупо.
* `value.state` - `ДОМ, УБОРКА, ПАУЗА` и так далее.

В дополнение к этим состояниям для подключения пылесоса обычно требуется `switch.power`. `switch.power` в данном случае работает как: `true` - очистить, `false` - вернуться домой.
Необязательные `value.battery` и

## Цель
* `switch.gate` - закрыть(false) или открыть(true) ворота (обязательно)
* `value.position` - положение ворот в процентах (100% открыто, 0% - закрыто)
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
* `media.state` - ['воспроизведение', 'стоп', 'пауза'] или [0 - пауза, 1 - воспроизведение, 2 - остановка] или [true - воспроизведение/false - пауза]
* `media.artist`
* `медиа.альбом`
* `media.title`
* `media.title.next`
* `media.cover` — URL-адрес обложки
* `media.cover.big` — большой URL-адрес обложки.
* `media.cover.small` — крошечный URL-адрес обложки.
* `media.duration.text` — например, «2:35»
* `media.duration` - (`common.type=number`) секунды
* `media.elapsed.text` — например, «1:30»
* `media.elapsed` - (`common.type=number`) секунд
* `media.broadcastDate` - (`common.type=string`) дата трансляции
* `media.mute` - (`common.type=boolean`) true означает отключение звука
* `media. Season` - (`common.type=string`) номер сезона (важно, чтобы тип действительно был "строковым", чтобы можно было указать отсутствие сезона с помощью "")
* `media.episode` - (`common.type=string`) номер эпизода (важно, чтобы тип действительно был "строковым", чтобы можно было указать отсутствие эпизода с помощью "")
* `media.mute.group` - (`common.type=boolean`) Группа устройств для отключения звука
* `media.tts` — преобразование текста в речь
* `media.bitrate` - кбит/с
* `media.genre` — Жанр песни
* `media.date` — ежегодная песня
* `media.track` — (`common.type=string`) идентификатор текущего воспроизводимого трека [0 - ~] (важно, чтобы тип действительно был `string`, чтобы можно было указать отсутствие трека с помощью "".
* `media.playid` — идентификатор трека медиаплеера.
* `media.add` - добавить текущий плейлист
* `media.clear` — очистить текущий плейлист (только запись)
* `media.playlist` — массив json, например
* `media.url` — URL-адрес для воспроизведения или текущий URL-адрес.
* `media.url.announcement` — URL-адрес для воспроизведения объявления.
* `media.jump` - Количество элементов для перехода в список воспроизведения (может быть отрицательным)
* `media.content` — тип воспроизводимого мультимедиа, например аудио/mp3.
* `media.link` — состояние текущего файла
* `media.input` - номер или строка входа (AUX, AV, TV, SAT,...)
* `level.bass` - уровень басов
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

* `media.browser` — массив Json, например «Файлы».

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
* `value.temperature` - Текущая температура
* `value.temperature.windchill` — фактическое охлаждение ветром
* `value.temperature.dewpoint` — Текущая точка росы
* `value.temperature.feelslike` — Фактическая температура «по ощущениям»
* `value.temperature.min` — Минимальная температура за последние 24 часа.
* `value.temperature.max` — Максимальная температура за последние 24 часа.
* `value.humidity` - фактическая или средняя влажность
* `value.humidity.min` — фактическая влажность
* `value.humidity.max` — фактическая влажность
* `value.speed.wind` - текущая или средняя скорость ветра
* `value.speed.max.wind` - максимальная скорость ветра за последние 24 часа.
* `value.speed.min.wind` - минимальная скорость ветра за последние 24 часа.
* `value.speed.wind.gust` - фактическая скорость порыва ветра
* `value.direction.wind` — текущее или среднее направление ветра в градусах.
* `value.direction.max.wind` - текущее направление ветра в градусах
* `value.direction.min.wind` - текущее направление ветра в градусах
* `weather.direction.wind` — текущее или среднее направление ветра в виде текста, например NNW.
* `date` - текущая дата или дата последнего прочтения информации
* `date.sunrise` — восход солнца на сегодняшний день.
* `date.sunset` - Закат на сегодня
* `dayofweek` — день недели в виде текста
* `location` — текстовое описание местоположения (например, адрес)
* `weather.icon` — URL-адрес значка текущего статуса на данный момент.
* `weather.icon.wind` — URL-адрес текущего значка ветра на данный момент.
* `weather.icon.name` — Текущее имя значка статуса.
* `weather.state` — описание текущей погоды.
* `value.precipitation` - (`тип: число, единица: мм`) Осадки в виде дождя/снег за последние 24 часа (осадки в виде снега или дождя сегодня)
* `value.precipitation.hour` — фактическое количество осадков за последний час.
* `value.precipitation.today` - Текущее количество осадков за сегодня (до 0:00)
* `value.precipitation.chance` - Фактическая вероятность осадков на сегодня.
* `value.precipitation.type` — Текущий тип осадков на сегодняшний день. («Тип: Число») Состояния: 0 — НЕТ, 1 — ДОЖДЬ, 2 — СНЕГ, 3 — ГРАД
* `value.radiation` - Фактическая солнечная радиация
* `value.uv` — фактическое значение UV.
* `value.clouds` - Облака на небе. 0% — облаков нет, 100% — много облаков.
* `value.rain` — фактическое количество дождя за последние 24 часа.
* `value.rain.hour` — фактическое количество дождя за последний час.
* `value.rain.today` - Текущее количество осадков за сегодня (до 0:00)
* `value.snow` — Фактический уровень снега за последние 24 часа.
* `value.snow.hour` — Фактический уровень снега за последний час.
* `value.snow.today` - Текущий уровень снега на сегодня (до 0:00)
* `value.snowline` — Фактическая линия снега в метрах.
* `weather.chart.url` — URL-адрес диаграммы истории погоды.
* `weather.chart.url.forecast` — URL-адрес диаграммы прогноза погоды.
* `weather.html` — HTML-объект с описанием погоды.
* `waether.title` — Очень краткое описание.
* `weather.title.short` — Очень, очень короткое описание (Одно слово)
* `weather.type` — Тип информации о погоде.
* `weather.json` — объект JSON с конкретными данными
* `value.speed.wind.forecast.0` - Прогноз скорости ветра на сегодня
* `weather.state.forecast.0` - Описание погоды на сегодня.
* `value.direction.wind.forecast.0` - Прогноз направления ветра на сегодня в градусах
* `weather.direction.wind.forecast.0` — Прогноз направления ветра на сегодня в текстовом виде.
* `value.pressure.forecast.0` - Прогноз давления на сегодня
* `value.temperature.min.forecast.0` — прогноз минимальной температуры на сегодня.
* `value.temperature.max.forecast.0` — прогноз максимальной температуры на сегодня.
* `value.precipitation.forecast.0` - (`тип: число, единица измерения: %`) Прогноз вероятности осадков на сегодня
* `value.prepitation.forecast.0` - (`тип: число, единица измерения: мм`) Прогноз уровня осадков на сегодня
* `weather.title.forecast.0` — Очень краткое описание на завтра.
* `value.precipitation.day.forecast.0` - Прогноз осадков на день
* `value.precipitation.night.forecast.0` - Прогноз осадков на ночь

* `date.forecast.1` - завтрашняя дата
* `weather.icon.forecast.1` — иконка на завтра
* `weather.state.forecast.1` — прогноз погоды на завтра.
* `value.temperature.min.forecast.1`
* `value.temperature.min.forecast.1`
* `value.prepitation.forecast.1` - (`тип: число, единица измерения: %`) Прогноз вероятности осадков на завтра
* `value.prepitation.forecast.1` - (`тип: число, единица: мм`) Прогноз уровня осадков на завтра
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## Информация
* `info.ip` - IP устройства
* `info.mac` — Mac устройства
* `info.name` — Имя устройства
* `info.address` — другой адрес (например, KNX)
* `info.serial` — серийный номер
* `info.firmware` - Версия прошивки
* `info.hardware` — версия оборудования
* `info.port` — TCP-порт
* `info.standby` — true, если устройство находится в режиме ожидания
* `info.status` — Статус устройства.
* `info.display` — информация, отображаемая на дисплее устройства
* `date.start` — строка или число
* `date.end` — строка или число

## Здоровье
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - индекс жира в организме в %
* `value.health.weight` - масса тела в кг, фунтах
* `value.health.bmi` — индекс ИМТ
* `value.health.калории` — сожженные калории
* `value.health.steps` — шаги выполнены.
* `value.health.bpm` — число ударов сердца в минуту

## Другие
* `URL`
* `url.icon` — иконка (кроме того, у каждого объекта может быть `common.icon`)
* `url.cam` — URL веб-камеры.
* `url.blank` — открыть URL в новом окне.
* `url.same` — открыть URL в этом окне.
* `url.audio` - URL аудиофайла.
* `text.phone` — номер телефона
