---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ical/README.md
title: iCal-адаптер ioBroker
hash: +mnwgLPvuDjTlPP0gTLncrtpZFm7vI691ok3L9AJzos=
---
![Логотип](../../../en/adapterref/iobroker.ical/ical.png)

# Адаптер ioBroker iCal Этот адаптер позволяет читать файлы .ics с определенного URL-адреса и анализировать их (Google Calendar или iCal).
В качестве альтернативы можно использовать локальный файл `.ics` (используйте абсолютный путь к файлу вместо URL)
## Применение
На основе адаптера iCal для (CCU.IO) [https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] от vader722.

### Адаптер iCal
Адаптер iCal для ioBroker читает файлы календаря в формате `.ics` по указанному URL и записывает события, находящиеся в заданном временном интервале, в переменную ioBroker. В качестве альтернативы можно использовать локальный файл .ics (используйте абсолютный путь к файлу вместо URL).
Их можно показать в VIS с помощью виджета `basic html - String (unescaped)`.

Создаются две переменные:

- `iCalReadTrigger`
- `iCalEvents`

Переменная `iCalReadTrigger` используется для запуска процесса считывания.
В настройках можно заложить несколько URL, с которых читается календарь.
Затем календари последовательно считываются, и результат суммируется.
В качестве альтернативы команде чтения также может быть присвоен URL-адрес, например. временно читать другой календарь.

Чтобы прочитать URL-адреса по умолчанию, строку `read` необходимо записать в переменную `iCalReadTrigger`.

Для чтения с любого URL строка `read https: // ...` должна быть записана в переменную `iCalReadTrigger`.

Результат возвращает адаптер iCal в переменной `iCalEvents`.

При записи `check` в ` iCalReadTrigger` проверка событий запускается для считанных данных без повторного считывания данных.

В качестве альтернативы адаптер также может автоматически запрашивать календари с заданным интервалом (только с `defaultURL`).
Для этого установите интервал опроса (в минутах) в настройках с помощью переменной runEveryMinutes.

Значение опций в конфигурационном файле:

- `предварительный просмотр`: 7 # означает, что встречи отображаются на 7 дней вперед
- `runEveryMinutes`: 30 # означает, что адаптер автоматически перелистывает календарь каждые 30 минут. Если 0 не читается автоматически
- `colorize`: true # Сегодняшние встречи и встречи, которые в настоящее время выполняются, будут окрашены в красный цвет, завтрашние встречи будут оранжевыми, эта опция переопределяет опцию EveryCalOneColor
- `debug`: false # если true, расширенный вывод записывается в журнал CCU.IO
- `defColor`:`white` # устанавливает цвет по умолчанию для записей календаря
- `fulltime`: ` ` # определяет, какой строкой заменяется время 00:00 для назначений на весь день. Для пробелов (между кавычками) время не указывается для встреч на весь день.
- `replaceDates`: true # Если true, то текущая дата заменяется строкой todayString (например, Today). Встречи на завтра через строку ЗавтраСтрока
- `everyCalOneColor`: false # Если true, несколько календарей будут иметь каждый календарь, окрашенный в цвет, который необходимо указать. Если установлена опция раскрашивания, это не сработает!
- `Календарь1`:
- "calURL": "http://11111.ics", URL календаря
- "calColor": "белый" цвет календаря, если установлена опция "everyCalOneColor".

Можно ввести любое количество календарей. Стандартный файл конфигурации содержит 2 календаря.

- `События`:
- `название`: "каникулы":
- `enabled`: true # определяет, будет ли событие редактироваться
- `Set ID`: здесь можно ввести дополнительное состояние, которое обновляется, когда событие активно
- `Вкл/Выкл`: Здесь альтернативное значение может быть записано в состояние, хранящееся в 'Set ID'.
- `display`: false # определяет, отображается ли событие также в iCalEvents или только оценивается
- `Set Ack`: false # Подтверждение "выключено" управляет состоянием, т.е. что-то переключать. #true Подтверждение «включено» обновляет значение

При установке события (в данном примере «отпуск») в календарях выполняется поиск строки «отпуск».
Если встреча с ключевым словом «отпуск» находится в календаре, то автоматически устанавливается состояние с именем праздника, установленным в значение «Истина». Если встреча завершена, состояние сбрасывается на false.
Статус создается для каждого дня периода предварительного просмотра. Опасность! Ищется подстрока, т.е. запись в календаре «отпуск» признается так же, как и запись «отпуск родителей». Это необходимо учитывать при настройке событий.

- Объяснение состояний под ical.0.events.0
  - Событие в пути ical.0.events.0.later устанавливается равным true, если оно все еще происходит сегодня, но еще не началось.
  - Событие в пути ical.0.events.0.now устанавливается равным true, если оно активно в данный момент.
  - Событие в пути ical.0.events.0.today устанавливается равным true, если событие активно сегодня.
  - Примечание: события предыдущих дней не отображаются

Настроив CSS в VIS, можно установить стили сегодняшней (стандартный красный) и завтрашней даты (стандартный оранжевый):

- `iCalWarn` - новая запись календаря сегодня
- `iCalPreWarn` - начало записи линейного календаря завтра
- `iCalNormal` - конец строки с сегодняшнего дня
- `iCalNormal2` - завтрашний конец строки

### Календарь
#### Календарь Apple iCloud
Календари Apple iCloud можно просматривать, если они ранее были опубликованы. Лучше всего создать свой собственный календарь для Homematic, так как календарь будет доступен всем.
Для этого щелкните правой кнопкой мыши календарь в приложении «Календарь» и выберите «Поделиться настройками». Теперь отметьте «Общий календарь» и скопируйте отображаемый URL-адрес. ВАЖНО: адрес начинается с webcal://p0X-cale .....
`webcal` необходимо заменить на ` http`. Затем введите этот URL-адрес либо в настройках по адресу defaultURL, либо укажите его в `read URL`, например. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Календарь Google
Чтобы включить Календарь Google, вы должны перейти к настройке календаря Календаря Google (щелкните мышью по «стрелке вниз» рядом с календарем). URL-адрес календаря можно найти, нажав на символ `ICAL` рядом с полем «Частный адрес». Затем введите этот URL-адрес либо в настройках по адресу defaultURL, либо укажите его в `read URL`, например. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### Календарь OwnCloud
Чтобы включить подготовленный календарь OwnCloud, вы должны утвердить этот календарь в представлении календаря в OwnCloud в качестве календаря Hardcourt и поделиться ссылкой. Этот URL-адрес (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) необходимо добавить в адаптер ioBroker.ical с именем пользователя и паролем.

#### Календарь NextCloud
Чтобы включить календарь NextCloud, необходимо скопировать ссылку для скачивания одного нужного календаря пользователя в представление календаря в NextCloud.
Для этого войдите в NextCloud как пользователь и перейдите в «Календарь». В левой колонке кликните по нужному календарю кружочком с тремя точками.
В появившемся меню наведите указатель мыши на «Загрузить» и щелкните правой кнопкой мыши, чтобы скопировать ссылку.
Пример: https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export (важно, чтобы ссылка содержала "?export").

Введите этот URL-адрес в адаптер ioBroker.ical с именем пользователя и паролем. Это необходимо сделать индивидуально для всех желаемых календарей всех пользователей.

#### Baikal облегченный сервер CalDAV+CardDAV
Сервер Baikal предлагает плагин «ics-export», который позволяет экспортировать календарь в виде одного файла ICal. Этот подключаемый модуль экспорта выбирается с помощью URL-адреса и обеспечивает бесшовную интеграцию с этим адаптером ioBroker. Добавьте фильтр экспорта к URL вашего календаря (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). Если у вас возникли проблемы с аутентификацией, измените `WebDAV authentication type` с `DIGEST` на `BASIC` в настройках администратора веб-интерфейса сервера Baikal.

### CSS
В сгенерированный HTML включены два вида классов css, чтобы обеспечить свободу дизайна.

#### Классы CSS с временной привязкой
* _iCalNormal_/_iCalNormal2_: событие началось до сегодняшнего дня (и все еще продолжается) или позже, чем через 3 дня, цвет по умолчанию без CSS и без цвета календаря — это настроенный цвет адаптера.
* _iCalWarn_/_iCalWarn2_: Событие начинается сегодня, цвет по умолчанию без CSS и без цвета календаря — «красный».
* _iCalPreWarn_/_iCalPreWarn2_: Событие начинается завтра, цвет по умолчанию без CSS и без цвета календаря — «оранжевый».
* _iCalPrePreWarn_/_iCalPrePreWarn2_: Событие начинается послезавтра, цвет по умолчанию без CSS и без цвета календаря — «желтый».

Первый класс CSS (например, iCalNormal) используется для части даты и времени HTML, а второй класс CSS (например, iCalNormal2) используется для имени события.

Пример CSS для этих классов CSS для немного другого форматирования вывода (например, дата/время слева + полужирный шрифт и имя события справа...):

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Классы CSS на основе календаря
Каждый диапазон также имеет класс CSS, назначенный на основе имени календаря, в котором находится событие. Для этого используется «имя календаря», определенное в конфигурации адаптера (пробелы заменены символами подчеркивания).

* _iCal-<имя календаря>_: этот класс используется для части даты и времени HTML
* _iCal->calendername2>_: Этот класс используется для имени события.

Чтобы установить эти классы CSS, вам также необходимо использовать класс CSS, основанный на времени, например. _.icalNormal2.iCal-<имя календаря>2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Пример сгенерированного html
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Фильтр
В параметрах экземпляра можно поддерживать фильтр для каждого календаря. Это должен быть список, разделенный точкой с запятой. Если вы включите параметр `Filter as regular expression`, фильтр интерпретируется как регулярное выражение. При обновлении календаря исключаются все события, соответствующие описанию, местоположению или сводке.

Схема поиска такова:

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Черный список: если вы хотите исключить все события определенного местоположения, используйте `LOCATION:MyLocation` или простой `MyLocation` или 2 местоположения `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Белый список: если вы хотите включить события только для определенного местоположения, используйте регулярное выражение, например `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/`, или для двух местоположений `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.12.1 (2022-03-22)
* (Apollon77) Adjust colorize of dates to also show dates started in the past with todays color

### 1.12.0 (2022-03-21)
* (Apollon77/Scrounger) Add option to choose the ack flag set when updating foreign objects on events
* (HSE83) use a color field from the calendar entry as color for display
* (Apollon77) When no Arrow for already running events is shown and dates are not replaced with words display the start date in the list and not the end date
* (Apollon77) When not replacing date with words and entry ends at 0:0:0 show the day before as end
* (Apollon77) Fix issues when no end date is provided in the calendar entry (start and end are the same)
* (Apollon77) Correctly calculate length of multi day events
* (Apollon77) Respect DST changes in some calculations to prevent strange effects
* (Apollon77) Parse ics Files with different line endings again

### 1.11.6 (2021-12-17)
* (jens-maus) fixed incorrect recurrence event processing

### 1.11.5 (2021-11-09)
* (jens-maus) updated node-ical to latest 0.14.1
* (jens-maus) fix another issue where an already ended event is still listed

### 1.11.4 (2021-09-02)
* (Apollon77) fix cases where already ended entries where still listed
* (Apollon77) fix reported sentry crash cases (IOBROKER-ICAL-S, IOBROKER-ICAL-N)

### 1.11.3 (2021-08-04)
* (jens-maus) fixed timezone related handling

### 1.11.2 (2021-08-01)
* (Apollon77) Change one logline to debug

### 1.11.1 (2021-07-30)
* (Apollon77) Adjust date length for full day events to the full day

### 1.11.0 (2021-07-30)
* (Apollon77) Locally cache remote calendars to be used in case of request errors

### 1.10.4 (2021-07-30)
* (Apollon77) Make sure daysPast is correctly initialized if not provided
* (Apollon77) When no calendar could be read then no events are updated/cleanup
* (Apollon77) Respect HTTP statuscode from server response too to detect errors

### 1.10.3 (2021-07-30)
* (Apollon77/Feuersturm) Fix other timezone issues
* (Apollon77) Fix setting external States when events are active
* (Apollon77) Also list recurring entries from the past
* (Apollon77) Fix the event states for the days in future

### 1.10.2 (2021-07-25)
* (Apollon77/Feuersturm) Fix wrong times and dates introduced in 1.7.5.
* (Feuersturm) Allow Setting daysPast to be decreased to zero with button again

### 1.10.1 (2021-07-22)
* (Apollon77) Make sure all Event objects are created before values are written

### 1.10.0 (2021-07-16)
* IMPORTANT: data.table is now a stringified array!! Consider when using this value!
* (Apollon77) Optimize for js-controller 3.3
* (BasGo) added analysis for events marked as private in Google Calendar
* (jens-maus) updated dependencies

### 1.9.3 (2021-04-01)
* (Apollon77) Better handling of some ical cases

### 1.9.2 (2021-03-07)
* (Apollon77) Prevent crash case when summary is not provided (Sentry IOBROKER-ICAL-K)

### 1.9.1 (2021-01-30)
* (Apollon77) try to make sure all code is executed before adapter is ended

### 1.9.0 (2021-01-12)
* (christofkac) Added option to ignore case when events are searched in calendars
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-F)

### 1.8.5 (2021-01-01)
* (Apollon77) update ical library to prevent problems with RRULE parsing

### 1.8.4 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-D)

### 1.8.3 (2020-12-24)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-C)
* (Apollon77) Upgrade node-ical

### 1.8.2 (2020-11-29)
* (klein0r) Several fixes and optimizations

### 1.8.1 (2020-11-20)
* (klein0r) Fixed past event calculation in html view

### 1.8.0 (2020-11-14)
* (klein0r) Moved html options to separate tab
* (klein0r) Added option to hide "arrow" on for running events
* (klein0r) Added feature to include past events (in days)

### 1.7.5 (2020-11-08)
* (Apollon77) Only handle events with a start date (Sentry IOBROKER-ICAL-1, IOBROKER-ICAL-2, IOBROKER-ICAL-4)
* (jens-maus) Update dependencies, fix some more issues

### 1.7.4 (2020-08-26)
* (Apollon77) Fix multiple parsing

### 1.7.3 (2020-08-26)
* (foxriver76) we pin a specific dependency version, because "rrule" package broken
* (foxriver76) added eslint

### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2022, bluefox <dogafox@gmail.com>

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