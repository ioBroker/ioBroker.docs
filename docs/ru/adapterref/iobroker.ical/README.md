---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ical/README.md
title: ioBroker iCal адаптер
hash: FsFdx4mujGjM+JFl+QirZJLQ4tF66bqOWrBT3dg8V2w=
---
![Логотип](../../../en/adapterref/iobroker.ical/ical.png)

# ioBroker Адаптер iCal Этот адаптер позволяет читать файлы .ics с определенного URL-адреса и анализировать его (Календарь Google или iCal).
В качестве альтернативы можно использовать локальный файл `.ics` (используйте абсолютный путь к файлу вместо URL-адреса)
## Использование
На основе адаптера iCal для (CCU.IO) [https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] от vader722

### Адаптер iCal
Адаптер iCal для ioBroker считывает файлы календаря в формате `.ics` с указанного URL-адреса и записывает события, расположенные в заранее заданном временном интервале, в переменную ioBroker. В качестве альтернативы можно использовать локальный файл .ics (используйте абсолютный путь к файлу вместо URL-адреса).
Их можно отобразить в VIS с помощью виджета `basic html - String (unescaped)`.

Создаются две переменные:

- `iCalReadTrigger`
- `iCalEvents`

Переменная `iCalReadTrigger` используется для запуска процесса чтения.
В настройках можно занести несколько URL-адресов, с которых читается календарь.
Затем последовательно читаются календари и суммируется результат.
В качестве альтернативы команде чтения также может быть присвоен URL-адрес, например временно читаю другой календарь.

Для чтения URL-адресов по умолчанию строка `read` должна быть записана в переменную `iCalReadTrigger`.

Для чтения с любого URL-адреса строка `read https: // ...` должна быть записана в переменную `iCalReadTrigger`.

Результат возвращает адаптер iCal в переменной `iCalEvents`.

При записи `check` в ` iCalReadTrigger` проверка событий запускается для считанных данных без повторного чтения данных.

В качестве альтернативы адаптер также может автоматически запрашивать календари с заданным интервалом (только с `defaultURL`).
Для этого задайте в настройках интервал опроса (в минутах) переменной runEveryMinutes.

Значение параметров в файле конфигурации:

- `preview`: 7 # означает, что встречи отображаются за 7 дней до начала
- `runEveryMinutes`: 30 # означает, что адаптер автоматически перематывает календарь каждые 30 минут. Если 0 не читается автоматически
- `colorize`: true # Сегодняшние встречи будут окрашены в красный цвет, завтрашние встречи будут оранжевыми, эта опция отменяет опцию everyCalOneColor
- `debug`: false # если true, расширенный вывод записывается в журнал CCU.IO
- `defColor`:` white` # устанавливает цвет по умолчанию для записей календаря
- `fulltime`:` # определяет, какой строкой заменяется время 00:00 для встреч на весь день. Для пробелов (между кавычками) время не указывается для встреч на целый день.
- `replaceDates`: true # Если true, сегодняшняя дата заменяется строкой todayString (например, Today). Завтрашние встречи через строку завтраString
- `everyCalOneColor`: false # Если true, в нескольких календарях каждый календарь будет окрашен в определенный цвет. Если установлена опция раскраски, это не сработает!
- `Calendar1`:
- "calURL": "http://11111.ics", URL календаря
- «calColor»: «белый» цвет календаря, если установлена опция «everyCalOneColor».

Можно ввести любое количество календарей. Стандартный файл конфигурации содержит 2 календаря.

- `События`:
- `name`:" отпуск ":
- `enabled`: true # определяет, будет ли событие редактироваться
- `display`: false # определяет, отображается ли событие также в iCalEvents или только оценивается

При установке события (в этом примере «отпуск») в календарях выполняется поиск строки «отпуск».
Если в календаре есть встреча с ключевым словом «отпуск», то автоматически для состояния с именем праздника устанавливается значение «Истина». Если встреча окончена, состояние сбрасывается на false.
Статус создается для каждого дня периода предварительного просмотра. Опасность! Ищется подстрока, т.е. признается запись в календаре «отпуск», как и запись «отпуск родителей». Это необходимо учитывать при настройке событий.

Регулируя CSS в VIS, можно установить стили сегодняшней (стандартный красный) и завтрашнего дня (стандартный оранжевый):

- `iCalWarn` - Новая строка календаря сегодня
- `iCalPreWarn` - начало записи календаря завтра
- `iCalNormal` - конец строки с сегодняшнего дня
- `iCalNormal2` - завтрашний конец строки

### Календарь
#### Календарь Apple iCloud
Календари Apple iCloud можно просматривать, если им ранее предоставили общий доступ. Лучше всего создать свой собственный календарь для Homematic, так как календарь будет доступен всем.
Для этого щелкните правой кнопкой мыши календарь в приложении «Календарь» и выберите «Поделиться настройками». Теперь проверьте «Общедоступный календарь» и скопируйте отображаемый URL. ВАЖНО: URL-адрес начинается с webcal: // p0X-cale .....
`webcal` следует заменить на` http`. Затем введите этот URL-адрес либо в настройках на defaultURL, либо укажите его в `read URL`, например. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google Календарь
Чтобы включить Календарь Google, вы должны перейти к настройке календаря Google Calendar (щелкните мышью по «стрелке вниз» рядом с календарем). URL-адрес календаря можно найти, щелкнув символ `ICAL` рядом с полем «Частный адрес». Затем введите этот URL-адрес либо в настройках на defaultURL, либо укажите его в `read URL`, например. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### Календарь OwnCloud
Чтобы включить готовый календарь OwnCloud, вы должны утвердить этот календарь в представлении календаря в OwnCloud в качестве жесткого календаря и указать ссылку.

#### Календарь NextCloud
Чтобы включить календарь NextCloud, ссылку для загрузки единственного желаемого календаря пользователя необходимо скопировать в представление календаря в NextCloud.
Для этого войдите в NextCloud как пользователь и перейдите в «Календарь». В левом столбце кликните по кружку с тремя точками на нужный календарь.
В появившемся меню наведите указатель мыши на «Загрузить» и щелкните правой кнопкой мыши, чтобы скопировать ссылку.
Пример: https://192.168.1.234/remote.php/dav/calendars/MYCALENDAR/personal/?export (важно, чтобы ссылка содержала «? Экспорт»).

Введите этот URL-адрес в адаптер ioBroker.ical с именем пользователя и паролем. Это нужно делать индивидуально для всех желаемых календарей всех пользователей.

#### Байкальский облегченный сервер CalDAV + CardDAV
Сервер Baikal предлагает плагин «ics-export», который позволяет экспортировать календарь как один файл ICal. Этот плагин экспорта выбирается с помощью URL-адреса и обеспечивает бесшовную интеграцию с этим адаптером ioBroker. Добавьте фильтр экспорта к URL-адресу вашего календаря (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). Если у вас возникли проблемы с аутентификацией, измените `WebDAV authentication type` с `DIGEST` на `BASIC` в настройках администратора веб-интерфейса сервера Baikal.

### CSS
В сгенерированный HTML включены два типа классов css, чтобы обеспечить свободу дизайна.

#### Классы CSS с временной привязкой
* _iCalNormal _ / _ iCalNormal2_: Событие началось до сегодняшнего дня (и все еще продолжается) или позже, как через 3 дня, цвет по умолчанию без CSS и без цвета календаря - это настроенный цвет адаптера.
* _iCalWarn _ / _ iCalWarn2_: Событие начинается сегодня, цвет по умолчанию без CSS и без календарного цвета - красный.
* _iCalPreWarn _ / _ iCalPreWarn2_: Событие начнется завтра, цвет по умолчанию без CSS и без календарного цвета - `оранжевый`
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_: Событие начинается послезавтра, цвет по умолчанию без CSS и без календарного цвета - желтый.

Первый класс CSS (например, iCalNormal) используется для части даты и времени HTML, а второй класс CSS (например, iCalNormal2) используется для имени события.

Пример CSS для этих классов CSS для немного другого форматирования вывода (например, дата / время слева + полужирный шрифт и имя события справа ...):

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
Каждому диапазону также назначается класс CSS на основе имени календаря, в котором находится событие. Для этого используется «имя календаря», определенное в конфигурации адаптера (пробелы заменены символами подчеркивания).

* _iCal- <calendername> _: этот класс используется для части даты и времени HTML.
* _iCal-> calendername2> _: этот класс используется для имени события

Чтобы установить эти классы CSS, вам также необходимо использовать класс CSS с временной привязкой, например _.icalNormal2.iCal- <calendername> 2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Пример сгенерированного HTML
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Фильтр
В опциях экземпляра можно поддерживать фильтр по календарю. Это должен быть список, разделенный точкой с запятой. Если вы включите опцию `Filter as regular expression`, фильтр интерпретируется как регулярное выражение. Во время обновления календаря исключаются все события, соответствующие описанию, местоположению или сводке.

Схема поиска:

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Черный список: если вы хотите исключить все события определенного местоположения, используйте `LOCATION:MyLocation` или простой `MyLocation` или 2 местоположения `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Белый список: если вы хотите включить события только в определенном месте, используйте регулярное выражение, например `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` или для 2 местоположений `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`.

## Changelog
<!--
### 1.11.3 (2021-08-04)
-->

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
* (JensMaus) Update dependencies, fix some more issues

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

Copyright (c) 2014-2021, bluefox <dogafox@gmail.com>

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