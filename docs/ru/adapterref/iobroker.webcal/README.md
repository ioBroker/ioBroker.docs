---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webcal/README.md
title: ioBroker.webcal
hash: x7IdZjWzNXOuXgsbADUbQ831huXVNg0dCPb5APqoAIM=
---
![Логотип](../../../en/adapterref/iobroker.webcal/admin/webcal.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.webcal.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webcal.svg)
![Количество установок](https://iobroker.live/badges/webcal-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/webcal-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.webcal.png?downloads=true)

# IoBroker.webcal
**Тесты:** ![Тест и выпуск](https://github.com/dirkhe/ioBroker.webcal/workflows/Test%20and%20Release/badge.svg)

## Адаптер webcal для ioBroker
с этим адаптером ioBroker вы можете

- извлечение событий из WEBDAV, CALDAV, CARDDAV или Google Calendar.
- добавлять новые элементы календаря на основе событий

### Календарные счета
**Nextcloud** использует базовую аутентификацию и следующий URL (его можно получить по общей ссылке)

`https://<domain>/<optional basePath>/remote.php/dav/calendars/<username>/<optional displaName>`

**Google** см. [с использованием API Google](doc/google.md)

- Используйте следующие настройки в ioBroker
- имя = внутреннее имя, если оно совпадает с именем google-calendar, оно будет использовано
- Метод аутентификации = google
- Секрет = Секрет клиента
- токен обновления = который вы получаете сверху
- идентификатор клиента = ваш идентификатор клиента

**Загрузить iCal** вы можете загрузить календарь ical для календаря, который не поддерживает dav. Но это только для чтения, значит, элементы календаря не могут быть добавлены

### Точки данных
**добавить новое событие**

Вы можете добавить новую запись календаря на основе события. Используйте следующий синтаксис:

`relDays[@calendar] | date|datetime[ - date|datetime][@calendar]`

relDays - количество дней от сегодняшнего дня или дата/дата-время как анализируемая дата или дата-время @calendar - необязательное имя календаря, по умолчанию - первый определенный календарь

также возможно через скрипт:

```
sendTo("webcal.0", "addEvents", {
    calendar: "smarthome",
    events: [
      {
        summary: "test2",
        description: "test add Event",
        location: "ort",
        color: "red",
        organizer: "ich",
        start: "12.1.25 23:00"
      }
      {
        summary: "failed test",
		    description: "long description",
        start: "9.8"
      }
    ]
  },function(events){
    /* callback function
	   object events will be repeat from input,
	   with additional status or error field,
	   also startDate and endDate are provided as Object data
	*/
	log(events);
  })
```

Вывод из журнала будет следующим:

```
[
  {
    "summary": "test",
    "start": "9.8.23 23:00",
    "end": "10.08.2023 14:00",
    "startDate": {
      "year": 2023,
      "month": 8,
      "day": 9,
      "hour": 23,
      "minute": 0,
      "second": 0,
      "isDate": false
    },
    "endDate": {
      "year": 2023,
      "month": 8,
      "day": 10,
      "hour": 14,
      "minute": 0,
      "second": 0,
      "isDate": false
    },
    "status": "successfully added"
  },
  {
    "summary": "failed test",
    "description": "long description",
    "start": "9.8",
    "startDate": {
      "year": 0,
      "month": 1,
      "day": 2,
      "hour": 0,
      "minute": 0,
      "second": 0,
      "isDate": false
    },
    "error": "start: invalid date"
  }
]
```

если `calendar` не указан, будет использоваться defaultCalender

в `event` поле `end` и `description` является необязательным

**удалить событие** можно с помощью скрипта:

```
sendTo("webcal.0", "deleteEvents", {
    calendar: "smarthome",
    events: [
      {
        id: "e3fcbf3b-651c-470f-b307-9d20be5902eb"
      },
      {
        id: "failed test"
      }
    ]
  },function(events){
    /* callback function
	   object events will be repeat from input,
	   with additional status or error field,
	*/
	log(events);
  })
```

Вывод из журнала будет следующим:

```
[
  {
    "id": "e3fcbf3b-651c-470f-b307-9d20be5902eb
    "status": "successfully deleted"
  },
  {
    "id": "failed test",
    "error": "not found"
  }
]
```

### Визуализация
если вы хотите использовать скрипт iobroker [vis-material-design](https://github.com/Scrounger/ioBroker.vis-materialdesign#calendar), вы можете использовать [этот](doc/vis-material-design.js)

### Известные ошибки
нарушение (исключение) ряда событий будет проигнорировано

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ В этом проекте используются следующие компоненты:
- [tsDav](https://github.com/natelindev/tsdav)
- [ical](https://github.com/kewisch/ical.js)
- [dayJS](https://github.com/iamkun/dayjs)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
  * ()
-->
### 1.4.0 (2025-01-12)
* (dirkhe) add color,location and organizer for craeting Event
* (dirkhe) add fix for invalid apple calender data

### 1.3.13 (2025-01-03)
* (dirkhe) use internally node20

### 1.3.12 (2025-01-03)
* (dirkhe) fixing pagacke with missing admin folder

### 1.3.11 (2025-01-02)
  * (dirkhe) update dependecies

### 1.3.10 (2024-10-09)
* (dirkhe) update dependecies
* (dirkhe) fix calendar test functionality

### 1.3.8 (2024-07-02)
  * (dirkhe) update dependecies
  * (dirkhe) allow download calendar without passwort
  * (dirkhe) fix missing monthly/yearly recurring

### 1.3.7 (2024-05-20)
  * (dirkhe) improve logging
  * (dirkhe) fix passort was not stored

### 1.3.6 (2024-05-18)
  * (dirkhe) fix bug in repeated events

### 1.3.5 (2024-05-05)
* (dirkhe) increase dependecy adapter-core
* (dirkhe) fix json config
* (dirkhe) update dependecies

### 1.3.3 (2024-04-07)	
* (dirkhe) fix config validation
* (dirkhe) update dependecies
* (dirkhe) update year for copyright #56
* (dirkhe) increase to node 18 for CI Pipeline

### 1.3.2 (2024-02-23)
* (dirkhe) update dependecies
* (dirkhe) linting

### 1.3.0 (2023-10-31)	
* (dirkhe) add choose calendar for events
* (dirkhe) add example script for vis-material-designmaterial
* (dirkhe) add event id to JSON data
* (dirkhe) add event delete function
* (dirkhe) fix endtime
* (dirkhe) fix missing upate of iQontrol States

### 1.2.0 (2023-08-15)	
* (dirkhe) add description for sendTo-addEvent
* (dirkhe) fix calculating events
* (dirkhe) add log which google calendar is used 
* (dirkhe) add datefilter for readonly 
* (dirkhe) add readonly client for ical

### 1.1.0 (2023-08-09)
* (dirkhe) add addEvent-command to sendTo
* (dirkhe) fix date parsing, if day only one digit
* (dirkhe) update dependecies

### 1.0.7 (2023-08-06)	
* (dirkhe) change event state type from group to folder

### 1.0.6 (2023-08-06)	
* (dirkhe) add pictured Google API documentation
* (dirkhe) fix property of button
* (dirkhe) add housekeeping for setInterval/setTimeout
* (dirkhe) check updateinterval for minimum of 10 minutes

### 1.0.5 (2023-04-26)	
* (dirkhe) set update addEvent-states to 00:10
* (dirkhe) fix timeframe for JSON data
* (dirkhe) fix layout for config

### 1.0.4 (2023-04-08)
* (dirkhe) fix environment setup

### 1.0.2 (2023-04-07)
* (dirkhe) publish to npm

### 1.0.0 (2023-04-07)
* (dirkhe) rework i18n

### 0.4.0 (2023-03-05)
* (dirkhe) add Event default Calendar
* (dirkhe) add iQontrol options for addEvent

### 0.3.0 (2023-02-22)
* (dirkhe) add Calendar Inactive
* (dirkhe) fix calc for jsonEvent and next
* (dirkhe) add dateText to jsonEvent

#### 0.2.0 (2023-02-21)
* (dirkhe) add next event and json data
* (dirkhe) add Iqontrol format to addEvent DP

### 0.1.0 (2023-02-16)
* (dirkhe) initial release
* (dirkhe) fix not shown times with daysPast 
* (dirkhe) complete rework and implement Google

## License
MIT License

Copyright (c) 2025 dirkhe 

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