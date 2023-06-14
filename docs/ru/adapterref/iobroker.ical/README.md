---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ical/README.md
title: ioBroker.ical
hash: n+aSV0Lm+AD52tM6N/ad25Fz91tkPXGsOgGDB5JOcxw=
---
![Логотип](../../../en/adapterref/iobroker.ical/ical.png)

# IoBroker.ical ioBroker.ical — это адаптер для платформы автоматизации ioBroker, ориентированный на файлы iCalendar, которые широко используются для хранения и обмена данными календаря. Это позволяет пользователям читать и анализировать файлы iCalendar локально или с указанного URL-адреса.
С помощью ioBroker.ical вы можете выполнять различные действия на основе событий календаря, например запускать устройства умного дома, отправлять уведомления или выполнять определенные сценарии или процедуры. Например, вы можете создать правила автоматизации, которые включают свет перед началом определенного события или отправляют напоминание о предстоящей встрече.

Отчеты Sentry, начиная с js-controller 3.0, означают, что этот адаптер может использовать библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Дополнительные сведения и инструкции по отключению отчетов об ошибках см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry).

## Использование
ioBroker.ical читает файлы календаря в формате `.ics` и записывает события в предопределенный интервал времени в переменную ioBroker. В качестве альтернативы возможно использование локального файла .ics с использованием абсолютного пути к файлу вместо URL-адреса. Их можно отобразить в VIS с помощью `basic html - String (unescaped)`.

Создаются две переменные:

1. `iCalReadTrigger`
1. `iCalEvents`

Переменная `iCalReadTrigger` запускает процесс чтения.
Переменная iCalReadTrigger запускает процесс чтения. Последовательно календари будут считывать из настроек, где пользователи могут размещать несколько URL-адресов, и результат суммируется.
В качестве альтернативы пользователи могут также указать URL-адрес для команды чтения, например. временно читать другой календарь.

Чтобы прочитать URL-адреса по умолчанию, строка `read` должна быть записана в переменную `iCalReadTrigger`.

Строка `read https: // ...` должна быть записана в переменную iCalReadTrigger для чтения из URL-адресов по умолчанию.

Результат возвращает адаптер iCal в переменной `iCalEvents`.

При записи `check` в ` iCalReadTrigger` проверка событий инициирует считывание данных без повторного считывания данных.

В качестве альтернативы адаптер может автоматически запрашивать календари с заданным интервалом (только с `default URL`).
Для этого установите интервал опроса (в минутах) в настройках с помощью переменной runEveryMinutes.

## Параметры файла конфигурации
- `предварительный просмотр`: 7 # означает, что встречи будут отображаться на 7 дней вперед
- `runEveryMinutes`: 30 # означает, что адаптер автоматически пересматривает календарь каждые 30 минут. Если 0, он не будет считываться автоматически.
- `colorize`: true # Сегодняшние и текущие встречи будут окрашены в красный цвет, а завтрашние встречи - в оранжевый. Этот параметр переопределяет параметр EveryCalOneColor.
- `debug`: false # если правда, расширенный вывод записывается в журнал CCU.IO
- `defColor`:`white` # устанавливает цвет по умолчанию для записей календаря
- `fulltime`: ` ` # определяет, какая строка заменит 00:00 для встреч на весь день. Для пробелов (между кавычками) время будет опущено для встреч на весь день.
- `replaceDates`: true # Если true, то текущая дата заменяется строкой todayString (например, сегодня). Встречи на завтра через строку Завтра Строка
- `everyCalOneColor`: false # Если true, несколько календарей будут иметь каждый календарь, окрашенный в цвет, который необходимо указать. Это не будет работать с набором параметров раскраски!
- `Календарь1`:
- "calURL": "http://11111.ics", URL календаря
- "calColor": "белый" цвет календаря, если установлена опция "everyCalOneColor".

Пользователи могут ввести любое количество календарей. Стандартный файл конфигурации содержит два календаря.

- `События`:
- `название`: "каникулы":
- `enabled`: true # определяет, будет ли событие редактироваться
- `Set ID`: можно ввести дополнительное состояние, которое обновляется, когда событие активно
- «Вкл / Выкл»: можно записать альтернативное значение для состояния, сохраненного в «Установить идентификатор».
- `display`: false # определяет, отображается ли событие также в iCalEvents или только оценивается
- `Set Ack`: false # Подтверждение "выключено" управляет состоянием, т.е. что-то переключать. #true Подтверждение «on» обновляет значение.

При установке события (в данном примере «отпуск») календари ищут строку «отпуск».
Если встреча с ключевым словом «отпуск» есть в календаре, то состояние с именем праздник автоматически устанавливается в значение Истина. Если встреча завершена, состояние сбрасывается на false.
Статус будет создаваться для каждого дня периода предварительного просмотра. Опасность! Он будет искать подстроку, т.е. запись в календаре «отпуск» признается так же, как и запись «отпуск родителей». Это необходимо учитывать при настройке событий.

- Объяснение состояний под ical.0.events.0:
  - Событие в пути ical.0.events.0.later устанавливается в true, если оно все еще происходит сегодня, но еще не началось.
  - Событие в path ical.0.events.0.now устанавливается равным true, если оно активно в данный момент.
  - Событие в пути ical.0.events.0.today устанавливается в true, если событие активно сегодня.
  - Примечание: события предыдущих дней не отображаются

Настроив CSS в VIS, можно установить стили сегодняшней (стандартный красный) и завтрашней даты (стандартный оранжевый):

- `iCalWarn` - запись новой строки календаря сегодня
- `iCalPreWarn` - начало записи линейного календаря завтра
- `iCalNormal` - конец строки с сегодняшнего дня
- `iCalNormal2` - завтрашний конец строки

### Календари
#### Календарь Apple iCloud
Календари Apple iCloud доступны для просмотра, если они ранее были опубликованы. Лучше всего создать свой собственный календарь для Homematic, так как календарь будет доступен всем.
Для этого щелкните правой кнопкой мыши календарь в приложении «Календарь» и выберите «Поделиться настройками». Теперь отметьте «Общий календарь» и скопируйте отображаемый URL-адрес. ВАЖНО: URL начинается с webcal://p0X-cale.....
` http` должен заменить `webcal`. Затем введите этот URL-адрес либо в настройках по адресу defaultURL, либо укажите его в `read URL`, например. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Календарь Google
Чтобы включить Календарь Google, перейдите к настройке календаря Календаря Google (щелкните мышью «стрелку вниз» рядом с календарем). Найдите URL-адрес календаря, нажав символ `ICAL` рядом с полем «Частный адрес». Затем введите этот URL-адрес либо в настройках по адресу defaultURL, либо укажите его в `read URL`, например. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### Календарь OwnCloud
Чтобы включить подготовленный календарь OwnCloud, вы должны утвердить этот календарь в представлении календаря в OwnCloud в качестве календаря Hardcourt и поделиться ссылкой. Добавьте URL-адрес (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) в адаптер ioBroker.ical с именем пользователя и паролем.

#### Календарь NextCloud
Чтобы включить календарь NextCloud, скопируйте ссылку для скачивания нужного календаря пользователя в представлении календаря в NextCloud.
Для этого войдите в NextCloud как пользователь и перейдите в «Календарь». В левой колонке кликните по нужному календарю кружочком с тремя точками.
В появившемся меню наведите указатель мыши на «Скачать» и щелкните правой кнопкой мыши, чтобы скопировать ссылку.
Пример: https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export (ссылка должна содержать "?export").

Введите этот URL-адрес в адаптер ioBroker.ical с именем пользователя и паролем, обязательными для всех отдельных желаемых календарей всех пользователей.

#### Baikal облегченный сервер CalDAV+CardDAV
Сервер Baikal предлагает плагин «ics-export», который позволяет экспортировать календарь в виде одного файла ICal. Этот подключаемый модуль экспорта выбирается с помощью URL-адреса и обеспечивает бесшовную интеграцию с этим адаптером ioBroker. Добавьте фильтр экспорта к URL вашего календаря (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). Если у вас возникли проблемы с аутентификацией, измените `WebDAV authentication type` с `DIGEST` на `BASIC` в настройках администратора веб-интерфейса сервера Baikal.

### CSS
Сгенерированный HTML включает в себя два вида классов CSS, обеспечивающих свободу дизайна.

#### Классы CSS с временной привязкой
* _iCalNormal_/_iCalNormal2_: событие началось до сегодняшнего дня (и все еще продолжается) или позже, чем через 3 дня, цвет по умолчанию без CSS и без цвета календаря — это настроенный цвет адаптера.
* _iCalWarn_/_iCalWarn2_: Событие начинается сегодня, цвет по умолчанию без CSS и без цвета календаря — «красный».
* _iCalPreWarn_/_iCalPreWarn2_: Событие начинается завтра, цвет по умолчанию без CSS и цвет календаря "оранжевый"
* _iCalPrePreWarn_/_iCalPrePreWarn2_: Событие начинается послезавтра, цвет по умолчанию без CSS и без цвета календаря — «желтый».

Использует первый класс CSS (например, iCalNormal) для части даты и времени HTML, а второй класс CSS (например, iCalNormal2) используется для имени события.

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
Каждый диапазон также имеет класс CSS, назначенный на основе имени календаря. Событие находится в «имени календаря», определенном для этого в конфигурации адаптера (подчеркивание заменяет пробелы).

* _iCal-<имя календаря>_: Часть даты и времени HTML использует этот класс.
* _iCal->calendername2>_: имя события использует этот класс.

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
В параметрах экземпляра можно поддерживать фильтр для каждого календаря, который должен быть списком, разделенным точкой с запятой. Включение параметра `Filter as regular expression` будет интерпретировать фильтр как регулярное выражение. При обновлении календаря будут исключены все события, соответствующие описанию, местоположению или сводке.

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

### **WORK IN PROGRESS**
* (klein0r) Use color picker in adapter settings
* (klein0r) Dropped Admin 4 UI
* (klein0r) Added Ukrainian language

### 1.13.2 (2022-08-29)
* (Apollon77) fix strange log messages by downgrading RRule again

### 1.13.1 (2022-06-27)
* (klein0r) Changed request library

### 1.13.0 (2022-06-17)
* (klein0r) Added Admin 5 UI
* (klein0r) Translated all object names

### 1.12.2 (2022-06-03)
* (Apollon77) Fix displaying rest-time of event in one case

### 1.12.1 (2022-03-22)
* (Apollon77) Adjust colorize of dates to also show dates started in the past with today's color

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