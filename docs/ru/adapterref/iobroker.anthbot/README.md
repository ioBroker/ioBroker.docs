---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anthbot/README.md
title: ioBroker.anthbot
hash: SwYpZPcC840gzUPpAXKSivOI+frOEwdSz3T6u8ukaig=
---
![Логотип](../../../en/adapterref/iobroker.anthbot/admin/anthbot.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.anthbot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anthbot.svg)
![Количество установок](https://iobroker.live/badges/anthbot-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/anthbot-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.anthbot.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.anthbot/workflows/Test%20and%20Release/badge.svg)

# ioBroker.anthbot

## Адаптер Anthbot для ioBroker

Подключайтесь к устройствам [Anthbot](https://anthbot.com/) , таким как их роботы-газонокосилки.

Протестировано на моделях M9 и Genie, но могут работать и на других сериях. Не стесняйтесь создавать запросы на исправление ошибок или предложения по улучшению функционала.

После установки перейдите на страницу настроек экземпляра, чтобы добавить учетные данные для доступа к облаку Anthbot. Адаптер будет отслеживать и контролировать все подключенные устройства, обнаруженные в учетной записи. Здесь есть несколько других параметров конфигурации, но значения по умолчанию должны хорошо работать.

Адаптер может попытаться улучшить планирование задач в приложении Anthbot. По умолчанию ничего не произойдет, но эту функцию можно включить, задав состояния планирования в соответствующем разделе. `map.custom_areas...` после включения адаптера (см. ниже).

### Глобальный мониторинг

В устройстве `status` папка:

Уровень заряда батареи отображается в `elec` состояние.

Просмотрите состояние устройства в `mode` состояние (зарядка, кошение, ожидание и т. д.).

В окне отображается последнее сообщение о состоянии и его уровень серьезности (событие, ошибка и т. д.). `last_code`, `last_code_text` и `last_code_type` штаты. Для пользователей, желающих узнать больше об истории, `code_list` В состоянии хранится JSON-массив с большим количеством сообщений.

Остальные штаты в этой папке должны быть понятны сами собой.

В устройстве `iob_schedule` папка:

Всё понятно, но имейте в виду, что это статус планирования адаптера, _а не_ расписания, определенные в приложении Anthbot.

### Глобальные команды

Под `command` папка:

`stop_all_tasks` Это эквивалентно нажатию кнопки «Стоп» в приложении Anthbot.

`charge_start` Это соответствует значку «Пополнить баланс» в приложении Anthbot.

`mow_start` Это соответствует началу работы в режиме «Полные карты».

`custom_area_mow_start` Это соответствует режиму пользовательских областей (также известному как «зоны»). Для его работы необходимо, чтобы в файле уже был задан действительный список идентификаторов областей. `area_list` Состояние. Идентификаторы областей не совпадают с названиями, отображаемыми приложением Anthbot. Действительные идентификаторы областей можно найти в качестве идентификаторов каналов в разделе `map.custom_areas...` папка. Для каждого региона существует идентификатор канала, подробности о регионах см. ниже.

То есть, чтобы начать косить одну или несколько зон:

- Установите `area_list` Преобразовать состояние в массив идентификаторов. Например: `[102, 117]`
- Запустить `custom_area_mow_start` состояние.

Адаптер попытается определить, когда ведется покос травы в определенной зоне, и сделает соответствующую пометку. `map.custom_areas...` Отслеживание времени начала и окончания работ позволяет понять, как часто производится обрезка участков.

`ridable_mow_start` Это соответствует режиму кошения краев. Как и в случае с `custom_area_mow_start` установить `area_list` с действительным списком идентификаторов зон, пригодных для катания (также известных как края). Действительные идентификаторы зон, пригодных для катания, можно найти в `map.ridable_areas.raw` состояние.

### Мониторинг и управление пользовательскими зонами (или зонами).

Под каждым `map.custom_areas...` канал:

#### Мониторинг

`last_start`, `last_finish`, `estimated_elapsed_time` &`estimated_elec` Эти параметры предназначены для облегчения планирования. Они устанавливаются при выполнении работ по покосу, включающих начало и конец соответствующей заданной зоны.

Обратите внимание, что `estimated_elapsed_time` &`estimated_elec` Расчет возможен только при завершении задачи, включающей одну заданную область. Если начинается задача, включающая несколько областей, всем им будет присвоено одинаковое время начала и окончания, и оценка затраченного времени производиться не будет.

#### Команды

`custom_area_mow_start` Эту кнопку можно использовать в качестве быстрого способа запуска скашивания только этого участка.

`mow_head_random` Включенный переключатель случайным образом изменяет значение. `mow_head` (или, другими словами, угол скашивания) для этой области. Он определяется случайным образом каждый раз при включении этого переключателя и каждый раз, когда задача по скашиванию в этой области успешно завершена.

`mow_head_alts` представляет собой массив альтернативных `mow_head` Углы, которые будут переключаться каждый раз после успешного завершения работы по покосу травы на этом участке. Когда список будет составлен, если текущий `mow_head` Если для этой области нет в списке, будет установлена первая запись. Чтобы отключить эту функцию, задайте пустой массив (`[]` или пустая строка.

Обратите внимание, что `mow_head_random` имеет приоритет над `mow_head_alts`.

#### Планирование

`schedule_enabled` Эта функция используется для активации покоса данной области, инициированного ioBroker. Хотя она _должна_ работать совместно с расписанием Anthbot, возможно, лучше удалить или отключить все расписания Anthbot перед использованием этой функции.

Обратите внимание, что для включения плановой покоса участка необходимо выполнить следующие действия:

- `schedule_enabled` необходимо включить
- `schedule_days_since_last` &`schedule_priority` оба параметра должны быть установлены с использованием действительных чисел.
- территория должна иметь действующее разрешение. `last_finish` состояние

Для достижения последней цели лучше всего вручную запустить или запланировать «Зональное кошение» в приложении Anthbot и позволить этой задаче завершиться, пока работает этот адаптер.

`schedule_days_since_last` Используется для определения времени, когда необходимо косить каждый участок. Количество дней, которое нужно выждать между покосами. Ноль означает, что косить нужно каждый день.

`schedule_priority` Этот принцип применяется, когда необходимо скосить несколько участков: сначала обрабатывается участок с наименьшим приоритетом (должен быть 1 или больше). Если необходимо скосить два участка с одинаковым приоритетом, порядок не определен.

### Редактирование карт и областей (также известных как зоны).

С `area_set` Можно редактировать одну или несколько областей. Получите JSON-представление нужной записи из... `map.custom_areas.raw_list` Измените его по мере необходимости и сохраните. `area_set` Состояние в виде массива JSON.

Обратите внимание, что при использовании `area_set` Нет необходимости указывать все параметры, будут изменены только те, которые указаны. Например: `[{"mow_head":10,"id":117}]` Угол скашивания на участке 117 будет изменен на 10 градусов, а остальные параметры оставлены без изменений.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-09-23)

- (raintonr) Sanitise configured intervals at startup (#63)

### 0.2.0 (2026-08-04)

- (raintonr) Few general code clean-ups
- (raintonr) Some constants are now configurable
- (raintonr) Schedule 'impossible to mow in a day' custom areas when several days overdue

### 0.1.2 (2026-07-16)

- (raintonr) Added device WiFi & 4G status

### 0.1.1 (2026-07-05)

- (raintonr) Clean up sanitized (sic) IDs in favour of warning & ignoring
- (raintonr) Clean up redacted logging of API traffic
- (raintonr) Clean up polling timer & add status.last_poll

### 0.1.0 (2026-07-03)

- (mcm1957) BREAKING: object ids are now sanitized. This might result in changed object-ids.
- (mcm1957) Translations have been corrected.
- (mcm1957) Loggings has been adapted to avoid logging secrets.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 Robin Rainton <robin@rainton.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.