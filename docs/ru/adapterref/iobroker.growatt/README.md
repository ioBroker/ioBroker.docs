---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.growatt/README.md
title: нет названия
hash: w/wZnVe/W6/Uotei+a1qmXod98bfZVQ1gLVMVUEz6QE=
---
![Логотип](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Количество установок (последнее)](https://iobroker.live/badges/growatt-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/growatt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер работает через облачные серверы Growatt. Также есть [проект Гротта](https://github.com/johanmeijer/grott), который перехватывает данные из коммуникации.

---

### Адаптер growatt для ioBroker
ioBroker Growatt Adapter для связи с Growatt Shine Server.
Я не аффилирован.
Обычно данные отправляются из регистратора данных в облако каждые 5 минут.
Вы можете изменить это, см. ниже.

Не все типы установок реализованы.

В настоящее время возможно только чтение данных, запись или изменение параметров невозможны.

### Могу ли я выпить кофе?
Конечно, если вам понравилась моя работа, отправьте ее через Paypal на адрес PLChome _at_ fontanestr _dot_ de

---

## Страница администрирования адаптера
### Основные настройки
#### Пользователь и пароль
Введите имя и пароль, которые вы также используете в приложении Shine или на веб-портале.

#### Войти с общим ключом
На сайте Growatt в разделе «Энергия», «Управление предприятием», «Операционные инструменты» вы можете отправить себе ключ по электронной почте.

#### Чтение данных завода
Эта запись данных содержит сохраненные основные данные.

#### Прочитать последние данные истории
Считывает последнюю запись данных из истории регистратора данных.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Чтение данных о состоянии
Эти данные доступны не для всех установок (не INV/MAX/TLX). Этот набор данных содержит данные в реальном времени.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Прочитать все данные
Эта запись данных содержит агрегированные данные.

#### Чтение данных устройства
Эта запись данных содержит некоторые данные с устройства. Некоторые данные также доступны в других категориях.

#### Читать прогноз погоды
Этот набор данных содержит прогноз погоды.

#### Чтение записей журнала неисправностей
Читает записи в журнале неисправностей текущего года и создает объекты с сообщениями для этого. Читается только первая страница с самыми последними отчетами.

#### Запись настроек инвертора
Если эта функция активирована, некоторые настройки можно редактировать для некоторых инверторов.

Объекты создаются под элементом серийного номера инвертора для настроек. Для каждой настройки создается канал.

Ниже объектов находятся "read", "write", "msg" и значения узлов. Ниже значений находятся параметры.

Если значения параметров могут быть прочитаны, они записываются с ACK=true. "read" устанавливается в true при успешном чтении с ack. Если чтение не удается, "Read" устанавливается в false ack=true. Запись в "Read" из "true" без ACK запускает операцию чтения. Если установлено новое соединение с облаком, настройки также считываются.

Чтобы записать настройки, сначала необходимо задать параметры. Затем "write" устанавливается в значение true с ack=false.
Если данные были записаны успешно, "write" устанавливается в значение "true" ack=true, если инвертор сообщил об ошибке, "write" устанавливается в значение "false" ack=true. Кроме того, ответное сообщение инвертора записывается в статус "msg".

Если запись прошла успешно, автоматически запускается чтение.

Инвертор может изменять только одну настройку за раз, а путь передачи идет от ioBroker через облако к адаптеру WLAN, а затем к инвертору. Настройки обрабатываются одна за другой по очереди. Слишком короткое время сеанса может привести к проблемам.

Написание настроек было разработано в меру наших знаний. Однако автор не несет ответственности за ошибки, содержащиеся в программном обеспечении, или за ущерб, возникший в результате его использования.

#### Выберите его, если ваша страница Growatt представляет собой черную страницу C&I
Выберите его, если ваша страница Growatt является страницей C&I Plant с indexbC или plantDo в пути веб-интерфейса Growatt.

Черные страницы C&I (коммерческие и промышленные) имеют другой путь к объектам, но он, кажется, работает, если этот флажок включен. Он изменил индекс на indexbC в веб-пути.

#### Время ожидания в секундах
Таймаут по умолчанию для HTTP-запросов. Значение по умолчанию 60 секунд, как и в веб-браузерах

#### Время ожидания процесса в секундах
Этот тайм-аут отслеживает сбор данных с сервера Growatt. Если сервер не обработает все данные за это время, выдается сообщение об ошибке, сеанс завершается и запускается новый таймер цикла. Значение по умолчанию — 600 секунд.
Если значение равно 0, эта функция проверки не выполняется.

#### Сохранить веб-сессию
Адаптер входит в систему только один раз, а не при каждом запросе данных с сервера Growatt. По умолчанию он включен.

#### Время сеанса в минутах
Здесь вы можете установить, когда адаптер выходит из сервера и входит снова. 0 означает никогда не выходить из сервера. Значение по умолчанию 0=бесконечность.

#### Время цикла в секундах
Интервал, с которым данные запрашиваются с сервера. Время, необходимое для запроса данных, затем вычитается из следующего. Если запрос длится дольше времени ожидания, адаптер спит только 100 мс. Значение по умолчанию — 30 секунд.

#### Время цикла ошибки в секундах
Если при запросе значений на сервере Growatt возникает ошибка, это время используется вместо времени цикла. Значение по умолчанию — 120 секунд.

#### Сервер Growatt
Здесь можно ввести другой URL, например, для использования домена США. Но он должен начинаться с "https://". По умолчанию он пустой, поэтому используется https://server.growatt.com.

### Управление объектами
Здесь вы можете определить, что должно произойти с каждым значением (объектом), которое подхватывается инвертором.
Есть много значений, которые не принадлежат вашему инвертору. Их можно удалить здесь.
Поскольку нет события, с помощью которого список объектов может быть перезагружен при сохранении. Кнопка обновления должна использоваться при нажатии сохранения.

#### Нормальный
Объект остается, значение обновляется.

#### Удалить
Объект удаляется, а значение, загруженное инвертором, отбрасывается.
После обновления отображаются только идентификатор и действие, поскольку объект больше не существует. Если выбрать обычный вариант, объект будет создан снова после сохранения.

#### Нет обновлений
Объект остается, значения с инвертора отбрасываются.

### Управление регистраторами
Экземпляр должен быть запущен и авторизован на сервере. Затем настройки регистратора данных можно вызвать с помощью кнопки обновления на этой вкладке.
Данные не запрашиваются автоматически, запрос можно сделать только с помощью кнопки.
Поля, отображаемые для регистратора данных, не могут быть изменены. Речь идет только о полученных данных.
Кнопки отображаются для каждого регистратора. Настройки можно редактировать с помощью кнопки.
_При использовании GROTT изменение настроек в INI должно быть включено._ Пожалуйста, не используйте настройки, если появляется значение, которого вы не ожидали.
Внимание, это основано на реинжиниринге. Я не несу ответственности за повреждение устройства.

#### Интервал кнопки
Текущий интервал в минутах считывается из регистратора данных, и появляется форма ввода, в которой можно изменить значение.
Если вы получили успешный ответ, следует перезапустить регистратор данных, чтобы активировать настройки.

#### IP-адрес сервера кнопки
Сервер для передачи данных на регистраторе можно задать здесь. При использовании Grott или US здесь можно указать локальный или американский IP.
Если вы получили успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Порт сервера кнопок
Порт на сервере для передачи данных на регистратор можно задать здесь.
Если вы получили успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Кнопка проверки прошивки
Будет задан вопрос, обновлена ли прошивка регистратора данных.
Обновление необходимо выполнить на странице growatt.

#### Кнопка перезапуска регистратора данных
Каждая загрузка хороша.
Настройки приняты.

---

## SendTo для скриптов
Можно отправить команду экземпляру через sendTo. Затем адаптер отвечает.
Реализованы следующие команды.
Возвращаемое значение возвращается в зависимости от передачи параметра. Если параметры передаются как строка JSON, возвращается JSON. Если параметры передаются как объект, возвращается объект.

### ПолучитьИсторию
Эта команда выводит историю. Ее можно использовать, например, для дополнения данных в базе данных.
Независимо от временного диапазона Growatt всегда возвращает 80 записей. Если интервал установлен на 1 минуту и требуется более 80 минут, команду необходимо выполнить несколько раз, а начало с 0 необходимо увеличивать все больше и больше.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| тип | Строка | Тип инвертора можно найти в объекте "growatt. - instance - . - nr - .devices. - sn - .growattType". |
| sn | Строка | Серийный номер инвертора можно найти в пути объекта "growatt. - instance - . - nr - .devices. - sn - ". |
| startDate | Дата | The art |
| endDate | Дата | Конец должен быть больше начала |
| start | Integer | 0 — начальная страница для вызова с самыми последними данными в начале |

Пример вызова:

```
  sendTo('growatt.0','getHistory',{"type":"<your inverter type>","sn":"<your inverter serial>","startDate":new Date((new Date()).getTime()- 60*60*1000),"endDate":new Date() , "start":0},(res)=>{console.log(res)})
```

Пример кода:

```
const sn = " your sn "; //your inverter sn
const inType = " your typ "; // the invertertyp
const hist = 'growatt.0. your nr .devices. your sn .historyLast.'; // the Path to history
const storeField =['accChargePower','etoGridToday']; //the fields to store
const history = "influx.0" //your History sql.0 or influx.0 or history.0 ...
const min = 10 // größer 10 min auffüllen....

on({id: hist+'calendar', change: "ne"},(obj)=>{
    if ((obj.state.val - obj.oldState.val) > min*60000) {
        console.log(obj.state.val - obj.oldState.val);
        function fillup(res) {
            res.forEach((r)=>{
                const ti = (new Date(r.calendar)).getTime();
                if (ti > obj.oldState.val && ti < obj.state.val) {
                    function store(n) {
                        sendTo(history, 'storeState', {
                            id: hist+n,
                            state: {ts: ti, val: r[n], ack: true}
                        }, result => {console.log(`added ${hist+n} ${new Date(ti)} ${r[n]}`)});
                    }
                    storeField.forEach((f) => {store(f)});
                }
            })
        }
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":0},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":1},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":2},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":3},fillup)
    }
});
```

### ПолучитьDatalogger
Она предоставляет вам информацию о регистраторах данных.
У этой функции нет параметров. Необходимо передать либо "{}", либо {}.
Возвращаемое значение — массив объектов.

| Параметр | Тип | Описание |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
Он считывает интервал и возвращает его. Возвращаемое значение — OBJ. Интервал находится в msg.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |

### SetDataLoggerIntervalRegister
Записывает интервал, с которым регистратор отправляет данные.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |
| значение | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

### GetDataLoggerIpRegister
Он считывает IP, на который регистратор отправляет данные, и возвращает их. Возвращаемое значение — OBJ. IP находится в msg.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |

### SetDataLoggerIp
Он записывает IP, на который логгер отправляет данные. Это полезно для проекта Grott. Возвращаемое значение — объект, который говорит, что произошло.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |
| значение | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

### GetDataLoggerPortRegister
Он считывает порт, на который регистратор отправляет данные, и возвращает их. Возвращаемое значение — OBJ. IP-адрес находится в msg.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |

### SetDataLoggerPort
Он записывает порт, на который логгер отправляет данные. Это полезно для проекта Grott. Возвращаемое значение — объект, который говорит, что произошло.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |
| значение | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

### CheckLoggerFirmware
Вызывает проверку прошивки из логгера. Если необходимо обновление, вы можете увидеть это в ответе.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |

### Перезапустить Datalogger
Вызывает теплый запуск регистратора данных.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Серийный номер регистратора возвращается getDatalogger. |

---

## Внутренний метод ускорения интервала данных
Ознакомьтесь с разделом «Управление регистраторами» и «Интервал кнопок».

## Ускорение интервала данных внешнего метода приложения
- Откройте приложение ShinePhone.
- Нажмите на вложение ниже
- Вверху справа +, затем список регистраторов данных
- Щелкните по существующему регистратору данных.
- Настроить регистратор данных
- Режим беспроводной точки доступа
- Переведите джойстик в режим AP.
- Подключитесь к точке доступа Wi-Fi, пароль 123456789 ? <- проверьте еще раз
- Продолжать
- Передовой
- Установка времени
- Интервал до 1
- Введите пароль growattYYYYMMDD (например, growatt20220209)
- Разблокировать
- Нажмите и примените изменения.
- Выйти из режима точки доступа

## Ускорение интервала данных внешнего старого метода
В режиме точки доступа можно менять интервал только на старой прошивке.
Growatt удалил сайт из прошивки.
Поэтому описание также было удалено.

**Никаких изменений в графиках на стороне growatt. Там вы можете увидеть только изменение данных из даталоггера.**

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 3.3.1 (2024-10-26)

- (PLCHome) Added ac charge for TLXH. Thanx to olli0815!
- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.3.0 (2024-10-25)

- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.2.5 (2024-08-13)

- (PLCHome) Solved the problem that no inverter list but result 2 was returned in NOAH.
- (PLCHome) Added NOAH.

### 3.2.4 (2024-07-03)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) no connection can be established password must now be transferred as MD5 hash.
- (PLCHome) cookie issue

### 3.2.3 (27.01.2024)

- (PLCHome) In Multiple Backflow the objects in Total Data and Status Data were swapped. Please delete the objects below Total Data and Status Data and restart the adapter after the update.

### 3.2.2 (27.01.2024)

- (PLCHome) Catching of the fault log messages is now possible (Thanx to ZioCain for the code)
- (PLCHome) Setting active power for MAX inverter (Thanx to sefina for testing)

### 3.2.1 (08.09.2023)

- (PLCHome) Additionally query the status information via the Plant List.

### 3.2.0 (01.09.2023)

- (PLCHome) Added inverter typ singleBackflow and multipleBackflow

### 3.1.2 (16.08.2023)

- (PLCHome) sendTo now also possible with objects as message data
- (PLCHome) Added message getHistory

### 3.1.1 (03.07.2023)

- (PLCHome) Added support for Growatt page when Plant is a C&I Plant page with indexbC or plantDo in Path of the Growatt web interface. Thanks to Denn281

### 3.0.4 (03.07.2023)

- (PLCHome) No retrieval of the other parameters value possible after parameter error
- (PLCHome) Grid first and Battery first setting on MIX may not work

### 3.0.3 (27.06.2023)

- (PLCHome) setting for tlx/tlxh time improved

### 3.0.2 (08.06.2023)

- (PLCHome) Write inverter settings, it can be activated via the config

  - mix
    - Time
    - Grid first
    - Battery first
    - Inverter On/Off
    - LoadFirst
    - Failsafe
    - PV active power rate
    - Backflow setting
      - Backflow setting power
    - EPSOn
  - tlx/tlxh
    - Time
    - PV active power rate

### 2.1.1 (17.04.2023)

- (PLCHome) Calendar structure was not always changed to timestamp
- (PLCHome) Improvement in the internal handling of objects without considering their case.

### 2.1.0 (14.04.2023)

- (PLCHome) Status data now also from TLX/TLXH
- (PLCHome) TLX Hybrid is now working
- (PLCHome) If there are different inverters, these are now shown

### 2.0.0 (06.10.2022)

- (PLCHome) Data logger settings can be called up and changed.
- (PLCHome) The server url can be changed.

### 1.2.1 (21.09.2022)

- (PLCHome) Added an offset to numeric values. My inverter reset te total quantity by itself. Now the total quantity can be corrected.

### 1.1.19 (30.08.2022)

- (PLCHome) HTML Header

### 1.1.17 (10.08.2022)

- (PLCHome) JSON Loopkiller

### 1.1.16 (10.08.2022)

- (PLCHome) https rejectUnauthorized false

### 1.1.15 (28.04.2022)

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values are empty

### 1.1.14 (26.04.2022)

- (PLCHome) Restart loop when exception

### 1.1.13 (08.04.2022)

- (PLCHome) total data and history data missing for type inv

### 1.1.12 (06.04.2022)

- (PLCHome) api maintance

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2024 PLCHome

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