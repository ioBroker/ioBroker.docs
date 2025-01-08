---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ical/README.md
title: ioBroker.ical
hash: XMJ+FeNh7dJ1gBzgxlvrjtPSYfofVGsJS2n/10J4n+E=
---
![Логотип](../../../en/adapterref/iobroker.ical/ical.png)

# IoBroker.ical ioBroker.ical — это адаптер для платформы автоматизации ioBroker, ориентированный на файлы iCalendar, широко используемые для хранения и обмена данными календаря. Он позволяет пользователям читать и анализировать файлы iCalendar локально или с указанного URL.
С помощью ioBroker.ical вы можете выполнять различные действия на основе событий календаря, например, запускать устройства умного дома, отправлять уведомления или выполнять определенные сценарии или процедуры. Например, вы можете создать правила автоматизации, которые включают свет, когда должно начаться определенное событие, или отправлять напоминания о предстоящей встрече.

Отчеты Sentry, начиная с js-controller 3.0, означают, что этот адаптер может использовать библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. Для получения более подробной информации и того, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry).

## Использование
ioBroker.ical считывает файлы календаря в формате `.ics` и записывает события в предопределенный временной интервал в переменную ioBroker. В качестве альтернативы возможно использование локального файла .ics с использованием абсолютного пути к файлу вместо URL. Они могут отображаться в VIS с помощью `basic html - String (unescaped)`.

Создаются две переменные:

1. `iCalReadTrigger`
1. `iCalEvents`

Переменная `iCalReadTrigger` запускает процесс чтения.
Переменная iCalReadTrigger запускает процесс чтения. Последовательно Calendars будет считывать данные из настроек, где пользователи могут внести несколько URL-адресов, а результат суммируется.
В качестве альтернативы пользователи также могут дать команде чтения URL-адрес, например, временно прочитать другой календарь.

Чтобы прочитать URL-адреса по умолчанию, строку `read` необходимо записать в переменную `iCalReadTrigger`

Строка `read https: // ...` должна быть записана в переменную iCalReadTrigger для чтения из URL-адресов по умолчанию.

Результат возвращает адаптер iCal в переменной `iCalEvents`.

При записи `check` в ` iCalReadTrigger` проверка событий инициирует чтение данных без повторного чтения данных.

В качестве альтернативы адаптер может автоматически опрашивать календари в определяемом интервале (только с `default URL`).
Для этого установите интервал опроса (в минутах) в настройках с помощью переменной runEveryMinutes.

## Параметры файла конфигурации
- `preview`: 7 # означает, что встречи будут отображаться на 7 дней вперед
- `runEveryMinutes`: 30 # означает, что адаптер автоматически пересматривает календарь каждые 30 минут. Если 0, он не будет считывать автоматически.
- `colorize`: true # Сегодняшние встречи и встречи, которые в данный момент выполняются, будут окрашены в красный цвет, а завтрашние встречи — в оранжевый. Эта опция переопределяет опцию everyCalOneColor
- `debug`: false # если true, расширенный вывод записывается в журнал ioBroker
- `defColor`:` white` # устанавливает цвет по умолчанию для записей календаря
- `fulltime`: ` ` # определяет, какая строка заменит 00:00 для назначений на весь день. При наличии пробелов (между кавычками) время будет опущено для назначений на весь день.
- `replaceDates`: true # Если true, то сегодняшняя дата заменяется строкой todayString (например, today). Завтрашние встречи через строку tomorrowString
- `everyCalOneColor`: false # Если true, то каждый календарь в нескольких календарях будет окрашен в указанный цвет. Это не будет работать с установленной опцией раскрашивания!
- `Календарь1`:
    - "calURL": "http://11111.ics", URL календаря
    - "calColor": "белый" цвет календаря, если установлена опция "everyCalOneColor".

  Пользователи могут ввести любое количество календарей. Стандартный файл конфигурации содержит два календаря.

- `События`:
  - `имя`:" отпуск ":
  - `enabled`: true # определяет, будет ли событие отредактировано
  - `Установить идентификатор`: можно ввести дополнительное состояние, которое обновляется, когда событие активно
  - `Вкл. / Выкл.`: можно записать альтернативное значение для состояния, сохраненного в `Установить идентификатор'
  - `display`: false # определяет, будет ли событие также отображаться в iCalEvents или только оцениваться
  - `Set Ack`: false # Ack "off" управляет состоянием, например, для переключения чего-либо. #true Ack "on" обновляет значение.

При установке события (в этом примере "отпуск") календари ищут строку "отпуск".
Если встреча с ключевым словом "отпуск" есть в календаре, то состояние с именем праздник автоматически устанавливается на True. Если встреча закончилась, состояние сбрасывается на false.
Статус будет создан для каждого дня периода предварительного просмотра. Опасность! Он будет искать подстроку, т. е. запись в календаре "отпуск" распознается, а также запись "отпуск родители". Это необходимо учитывать при установке событий.

- Объяснение состояний в ical.0.events.0:
- Событие в пути ical.0.events.0.later устанавливается в значение true, если оно все еще происходит сегодня, но еще не началось.
- Событие в пути ical.0.events.0.now устанавливается в значение true, если оно в данный момент активно.
- Событие в пути ical.0.events.0.today устанавливается в значение true, если событие активно сегодня.
- Примечание: события прошлых дней не отображаются.

Настраивая CSS в VIS, можно задать стили сегодняшней (стандартный красный) и завтрашней даты (стандартный оранжевый):

- `iCalWarn` - Новая строка записи календаря на сегодня
- `iCalPreWarn` - начало строки календарной записи завтра
- `iCalNormal` - конец строки с сегодняшнего дня
- `iCalNormal2` - завтрашний конец очереди

### Календари
#### Календарь Apple iCloud
Календари Apple iCloud можно просматривать, если они ранее были общедоступными. Лучше всего создать собственный календарь для Homematic, так как календарь будет доступен всем.
Для этого щелкните правой кнопкой мыши по календарю в приложении «Календарь» и выберите «Настройки общего доступа». Теперь отметьте «Общий календарь» и скопируйте отображаемый URL-адрес. ВАЖНО: URL-адрес начинается с webcal: // p0X-cale .....
` http` должен заменить `webcal`. Затем введите этот URL-адрес либо в настройках в defaultURL, либо укажите его в `read URL`, например, `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google Календарь
Чтобы включить Google Calendar, перейдите в настройки календаря Google Calendar (щелкните мышью по «стрелке вниз» рядом с календарем). Найдите URL-адрес календаря, нажав на символ `ICAL` рядом с полем «Частный адрес». Затем введите этот URL-адрес либо в настройках в defaultURL, либо укажите его в `read URL`, например, `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### Календарь OwnCloud
Чтобы включить календарь Hardcooked OwnCloud, вам необходимо одобрить этот календарь в представлении календаря в OwnCloud как календарь Hardcourt и поделиться ссылкой. Добавьте URL (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) в адаптере ioBroker.ical с именем пользователя и паролем.

#### Календарь NextCloud
Чтобы включить календарь NextCloud, скопируйте ссылку на загрузку нужного пользовательского календаря в календаре NextCloud.
Для этого войдите в NextCloud как пользователь и перейдите в «Календарь». В левом столбце щелкните нужный календарь рядом с кружком с тремя точками.
В появившемся меню наведите указатель мыши на «Загрузить» и щелкните правой кнопкой мыши, чтобы скопировать ссылку.
Пример: https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export (ссылка должна содержать «?export»).

Введите этот URL-адрес в адаптер ioBroker.ical с именем пользователя и паролем, обязательным для всех индивидуальных желаемых календарей всех пользователей.

#### Байкал легкий CalDAV+CardDAV сервер
Сервер Baikal предлагает плагин "ics-export", который позволяет экспортировать календарь как один файл ICal. Этот плагин экспорта выбирается с помощью URL и обеспечивает бесшовную интеграцию с этим адаптером ioBroker. Пожалуйста, добавьте фильтр экспорта к URL вашего календаря (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). Если у вас возникли проблемы с аутентификацией, пожалуйста, измените `WebDAV authentication type` с `DIGEST` на `BASIC` в настройках администратора WebUI сервера Baikal.

### CSS
Сгенерированный HTML-код включает два вида классов CSS, что обеспечивает свободу дизайна.

#### Классы CSS, основанные на времени
* _iCalNormal_/_iCalNormal2_: Событие началось до сегодняшнего дня (и все еще продолжается) или позже, например, через 3 дня, цвет по умолчанию без CSS и без цвета календаря — настроенный цвет адаптера
* _iCalWarn_/_iCalWarn2_: Событие начинается сегодня, цвет по умолчанию без CSS и без календаря - `red`
* _iCalPreWarn_/_iCalPreWarn2_: Событие начнется завтра, цвет по умолчанию без CSS и цвет календаря - `оранжевый`
* _iCalPrePreWarn_/_iCalPrePreWarn2_: Событие начнется послезавтра, цвет по умолчанию без CSS и без календаря - `желтый`

Использует первый класс CSS (например, iCalNormal) для части HTML, содержащей дату и время, а второй класс CSS (например, iCalNormal2) используется для имени события.

Пример CSS для этих CSS-классов для немного иного форматирования вывода (например, дата/время слева+жирный и имя события справа ...):

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
Каждый промежуток также имеет класс CSS, назначенный на основе имени календаря. Событие находится в "имя календаря", определенном в конфигурации адаптера для этого (подчеркивания заменяют пробелы).

* _iCal-<calendername>_: Часть HTML, содержащая дату и время, использует этот класс.
* _iCal->calendername2>_: Имя события использует этот класс.

Чтобы задать эти классы CSS, вам также необходимо использовать класс CSS, основанный на времени, например, _.icalNormal2.iCal-<calendername>2_:

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
В параметрах экземпляра можно поддерживать фильтр для каждого календаря, который должен быть списком, разделенным точкой с запятой. Включение параметра `Filter as regular expression` будет интерпретировать фильтр как регулярное выражение. Обновление календаря исключит все события, соответствующие описанию, местоположению или сводке.

Шаблон поиска:

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Черный список: если вы хотите исключить все события определенного местоположения, используйте `LOCATION:MyLocation` или просто `MyLocation` или 2 местоположения `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Белый список: если вы хотите включить события только определенного местоположения, используйте регулярное выражение, например `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` или для 2 местоположений `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.16.1 (2024-11-01)
* (jens-maus) fix issue with handling rrule timezones incorrect with latest node-ical (#708).
* (jens-maus) update node-ical to latest 0.20.1
* (jens-maus) save cached files to os tmpdir instead.

### 1.16.0 (2024-10-29)
* (cvoelkel76) add checkbox to allow to exactly match a calender event.
* (jens-maus) update node-ical to latest 0.20.0
* (klein0r) Breaking change: Removed trigger state (subscribe is deprecated in js-controller 6.x)
* (simatec) Responsive design added

### 1.15.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.14.3 (2024-02-28)
* (jens-maus) update node-ical to latest 0.18.0

### 1.14.2 (2024-01-29)
* (jens-maus) update node-ical to latest 0.17.2

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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