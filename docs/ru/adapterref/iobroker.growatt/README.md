---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.growatt/README.md
title: без заголовка
hash: yeK+7qjG/tFGYwYR2fP9xAxycdFZPprsP44FK5e2mZ8=
---
![Логотип](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Количество установок (последних)](https://iobroker.live/badges/growatt-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/growatt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Этот адаптер работает через облачные серверы Growatt. Существует также [Проект Гротт](https://github.com/johanmeijer/grott), который перехватывает данные при передаче.

---

### Адаптер Groatt для ioBroker
Адаптер ioBroker Growatt для связи с сервером Growatt Shine.
Я не связан.
Обычно данные отправляются из регистратора данных в облако каждые 5 минут.
Вы можете изменить его, см. ниже.

Не все типы установок реализованы.

В настоящее время можно только читать данные, запись параметров или изменение параметров невозможны.

---

## Страница администратора адаптера
### Основные настройки
#### Пользователь и пароль
Пожалуйста, введите имя и пароль, которые вы также используете в приложении Shine или на веб-портале.

#### Вход с общим ключом
На веб-сайте Growatt в разделе «Энергетика», «Управление установками», «Инструменты эксплуатации» вы можете отправить себе ключ по электронной почте.

#### Чтение данных установки
Эта запись данных содержит сохраненные основные данные.

#### Чтение последних данных истории
Считывает последнюю запись данных из истории регистратора данных.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Чтение данных о состоянии
Эти данные доступны не для всех установок (кроме INV/MAX/TLX). Этот набор данных содержит живые данные.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Чтение общих данных
Эта запись данных содержит данные агрегирования.

#### Чтение данных устройства
Эта запись данных содержит некоторые данные с устройства. Некоторые данные также доступны в других категориях.

#### Читать погоду
Этот набор данных содержит прогноз погоды.

#### Чтение записей журнала неисправностей
Считывает записи в журнале неисправностей текущего года и создает для этого объекты с сообщениями. Читается только первая страница с самыми актуальными отчетами.

#### Запись настроек инвертора
Если эта опция активирована, некоторые настройки можно редактировать для некоторых инверторов.

Объекты для настроек создаются под элементом серийного номера инвертора. Для каждой настройки создается канал.

Ниже объектов расположены «чтение», «запись», «сообщение» и значения узлов. Под значениями указаны параметры.

Если значения параметров можно прочитать, они записываются с ACK=true. «read» устанавливается в значение true при успешном чтении с подтверждением. Если чтение не удалось, для параметра «Чтение» устанавливается значение false ack=true. Запись в «Read» из «true» без ACK запускает операцию чтения. Если устанавливается новое подключение к облаку, настройки также считываются.

Чтобы записать настройки, сначала необходимо задать параметры. Затем для параметра write устанавливается значение true с помощью ack=false.
Если данные были записаны успешно, для параметра «write» устанавливается значение «истина» ack=true, если инвертор сообщил об ошибке, для параметра «write» устанавливается значение «false» ack=true. Кроме того, обратное сообщение инвертора записывается в статус «msg».

Если запись прошла успешно, автоматически запускается чтение.

Инвертор может изменять только одну настройку за раз, и путь передачи данных — от ioBroker через облако к адаптеру WLAN, а затем к инвертору. Настройки обрабатываются одна за другой через очередь. Слишком короткое время сеанса может привести к проблемам.

Написание настроек было разработано в меру наших знаний. Однако автор не несет ответственности за ошибки, содержащиеся в программном обеспечении, или за ущерб, возникший в результате использования программного обеспечения.

#### Выберите его, если ваша страница Growatt является черной страницей C&I.
Выберите его, если ваша страница Growatt является страницей C&I Plant с indexbC или plantDo в пути веб-интерфейса Growatt.

Черные страницы C&I (коммерческие и промышленные) имеют другой путь к объектам, но, похоже, он работает, если этот флажок установлен. Он изменил индекс на indexbC в веб-пути.

#### Тайм-аут в секундах
Тайм-аут по умолчанию для HTTP-запросов. Значение по умолчанию 60 секунд, как и в веб-браузерах.

#### Тайм-аут процесса в секундах
Этот тайм-аут отслеживает сбор данных с сервера Growatt. Если сервер не обработает все данные за это время, сообщается об ошибке, сеанс завершается и запускается новый таймер цикла. Значение по умолчанию — 600 секунд.
Если значение равно 0, эта функция проверки не выполняется.

#### Продолжать веб-сессию
Адаптер входит в систему только один раз, а не при каждом запросе данных с сервера Growatt. По умолчанию он включен.

#### Время сеанса в минутах
Здесь вы можете установить время выхода адаптера с сервера и повторного входа в систему. 0 означает никогда не выходить из системы. Значение по умолчанию: 0 = бесконечность.

#### Время цикла в секундах
Интервал, с которым данные запрашиваются с сервера. Время, необходимое для запроса данных, затем вычитается из следующего запроса. Если запрос длится дольше, чем время ожидания, адаптер переходит в режим сна всего 100 мс. Значение по умолчанию — 30 секунд.

#### Время цикла ошибки в секундах
Если при запросе значений на сервере Growatt возникает ошибка, это время используется вместо времени цикла. Значение по умолчанию — 120 секунд.

#### Сервер Гроватт
Здесь можно ввести другой URL-адрес, например, для использования домена США. Но оно должно начинаться с «https://». По умолчанию оно пустое, поэтому используется https://server.growatt.com.

### Управление объектами
Здесь вы можете определить, что должно произойти с каждым значением (объектом), полученным инвертором.
Существует множество значений, которые не принадлежат вашему инвертору. Их можно удалить здесь.
Так как нет события, с помощью которого список объектов можно было бы перезагрузить при сохранении. Кнопку обновления необходимо использовать при нажатии кнопки сохранения.

#### Нормальный
Объект остается, значение обновляется.

#### Удалить
Объект удаляется, и значение, загруженное преобразователем, сбрасывается.
После обновления отображаются только идентификатор и действие, поскольку объект больше не существует. Если вы выберете обычный вариант, после сохранения объект будет создан заново.

#### Нет обновлений
Объект остается, значения преобразователя сбрасываются.

### Управление регистраторами
Экземпляр должен быть запущен и зарегистрирован на сервере. Затем настройки регистратора данных можно вызвать через кнопку обновления на этой вкладке.
Данные не запрашиваются автоматически, запрос можно сделать только через кнопку.
Поля, отображаемые для регистратора данных, не могут быть изменены. Речь идет только о полученных данных.
Кнопки отображаются для каждого регистратора. Настройки можно редактировать с помощью кнопки.
_При использовании GROTT необходимо разрешить изменение настроек в INI._ Не используйте настройки, если появляется значение, которого вы не ожидали.
Внимание, это основано на реинжиниринге. Я не несу ответственности за повреждение устройства.

#### Интервал кнопки
Текущий интервал в минутах считывается из регистратора данных и появляется форма ввода, в которой значение можно отрегулировать.
Если вы получили успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### IP-адрес сервера кнопки
Здесь можно настроить сервер для передачи данных на регистратор. При использовании Grott или США здесь можно указать локальный или американский IP-адрес.
Если вы получите успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Кнопка порта сервера
Здесь можно настроить порт на сервере для передачи данных на регистратор.
Если вы получите успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Кнопка проверки прошивки
Будет задан вопрос, обновлена ли прошивка регистратора данных.
Обновление необходимо выполнить на странице Groatt.

#### Кнопка перезапуска регистратора данных
Каждый ботинок хорош.
Настройки приняты.

---

## SendTo для скриптов
Отправить команду экземпляру можно через sendTo. Затем адаптер отвечает.
Реализованы следующие команды.
Возвращаемое значение возвращается в зависимости от передачи параметра. Если параметры передаются в виде строки JSON, возвращается JSON. Если параметры передаются как объект, возвращается объект.

### Получить историю
Эта команда выводит историю. Его можно использовать, например, для дополнения данных в базе данных.
Независимо от временного диапазона, Гроватт всегда возвращает 80 записей. Если интервал установлен на 1 минуту, а необходимо более 80 минут, команду необходимо выполнить несколько раз и все больше и больше увеличивать старт с 0.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| тип | Строка | Тип инвертора можно найти в объекте «growatt.-instance-.-nr-.devices.-sn-.growattType». |
| зп | Строка | Серийный номер инвертора можно найти в пути к объекту "growatt. - экземпляр - . - номер - .devices. - sn - ". |
| дата начала | Дата | Атарт |
| дата окончания | Дата | Конец может быть более тяжелым, чем начало |
| начать | Целое число | 0 — стартовая страница для вызова, на которой сначала отображаются самые последние данные |

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

### GetDatalogger
Он дает вам информацию о регистраторах данных.
Эта функция не имеет параметров. Необходимо передать либо "{}", либо {}.
Возврат представляет собой массив объектов.

| Параметр | Тип | Описание |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
Он считывает интервал и возвращает его. возвращаемое значение — OBJ. Интервал указан в сообщениях.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |

### SetDataLoggerIntervalRegister
Записывает интервал, с которым регистратор отправляет данные.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |
| ценность | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

### GetDataLoggerIpRegister
Он считывает IP-адрес, на который регистратор отправляет данные, и возвращает их. Возвращаемое значение — OBJ. IP указан в сообщении.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |

### SetDataLoggerIp
Он записывает IP, на который регистратор отправляет данные. Это полезно для проекта Гротта. Возвращаемое значение — это объект, который сообщает, что произошло.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |
| ценность | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

### GetDataLoggerPortRegister
Он считывает порт, на который регистратор отправляет данные, и возвращает их. Возвращаемое значение — OBJ. IP указан в сообщении.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |

### SetDataLoggerPort
Он записывает порт, на который регистратор отправляет данные. Это полезно для проекта Гротта. Возвращаемое значение — это объект, который сообщает, что произошло.

| Параметр | Тип | Описание |
| --------- | ------- | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |
| ценность | целое число | Новое значение в минутах |

Объект возвращается с сообщением.

###checkLoggerПрошивка
Вызывает проверку прошивки из логгера. Если обновление необходимо, вы можете увидеть это в ответе.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |

### Перезапуск регистратора данных
Вызывает горячий запуск регистратора данных.

| Параметр | Тип | Описание |
| --------- | ------ | ------------------------------------------------------------- |
| зп | строка | Серийный номер регистратора возвращается методом getDatalogger. |

---

## Внутренний метод ускорения интервала данных
Посмотрите Управление регистраторами и интервалом кнопок.

## Метод внешнего приложения для ускорения интервала передачи данных
- Откройте приложение ShinePhone.
- Нажмите на вложение ниже
- Вверху справа +, затем список регистраторов данных
- Нажмите на существующий регистратор данных.
- Настройка регистратора данных
- Режим беспроводной точки доступа
- Переведите флешку в режим AP
- Подключитесь к точке доступа Wi-Fi, PW 123456789? <- проверьте еще раз
- Продолжать
- Передовой
- Настройки времени
- Интервал до 1
- Введите пароль GroattГГГГММДД (например, Growatt20220209).
- Разблокировать
- Нажмите и примените изменения.
- Выйти из режима точки доступа

## Ускорение интервала передачи данных, внешний старый метод
В режиме хотспота изменить интервал можно только на старой прошивке.
Гроватт удалил сайт из прошивки.
Поэтому описание также было удалено.

**В диаграммах роста нет изменений. Там вы можете увидеть только изменение данных с регистратора данных.**

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (PLCHome) Configure this adapter to use the release script.

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
