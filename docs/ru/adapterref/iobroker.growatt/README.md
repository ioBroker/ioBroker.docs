---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.growatt/README.md
title: без заголовка
hash: 0sU0Bw8iqzjCWsTpAtijZLZv3PQpobwnBhs8WUcNgW4=
---
![Логотип](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Количество установок (последние)](https://iobroker.live/badges/growatt-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/growatt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
Этот адаптер работает через облачные серверы Growatt. Существует также [Гротт проект](https://github.com/johanmeijer/grott), который перехватывает данные из сообщения.

---

### Growatt адаптер для ioBroker
Адаптер ioBroker Growatt для связи с сервером Growatt Shine.
Я не аффилирован.
Обычно данные отправляются из регистратора данных в облако каждые 5 минут.
Вы можете изменить его, см. ниже.

Не все типы растений реализованы.

В настоящее время можно только читать данные, запись или изменение параметров невозможно.

---

## Административная страница адаптера
### Основные настройки
#### Пользователь и пароль
Пожалуйста, введите имя и пароль, которые вы также используете в приложении Shine или на веб-портале.

#### Вход с общим ключом
На веб-сайте Growatt в разделе «Энергия, управление заводом, рабочие инструменты» вы можете отправить себе ключ по электронной почте.

#### Чтение данных установки
Эта запись данных содержит сохраненные основные данные

#### Читать последние данные истории
Считывает последнюю запись данных из истории регистратора данных.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Чтение данных состояния
Эти данные доступны не для всех заводов (кроме INV/MAX/TLX). Этот набор данных содержит оперативные данные.
Эта функция поддерживает минутные интервалы для регистратора данных.

#### Читать общие данные
Эта запись данных содержит агрегированные данные.

#### Чтение данных устройства
Эта запись данных содержит некоторые данные с устройства. Некоторые данные также доступны в других категориях.

#### Читать погоду
Этот набор данных содержит прогноз погоды.

#### Запись настроек инвертора
Если это активировано, некоторые настройки могут быть отредактированы для некоторых инверторов.

Объекты создаются под элементом серийного номера инвертора для настроек. Канал создается для каждой настройки.

Под объектами находятся «чтение», «запись», «msg» и значения узла. Под значениями находятся параметры.

Если значения параметров могут быть прочитаны, они записываются с ACK=true. «read» устанавливается в true при успешном чтении с помощью ack. Если чтение не удается, для «Чтение» устанавливается значение false ack=true. Запись в «Read» из «true» без ACK запускает операцию чтения. Если устанавливается новое подключение к облаку, настройки также считываются.

Для записи настроек необходимо сначала задать параметры. Затем для параметра «запись» устанавливается значение true с ack=false.
Если данные были успешно записаны, «запись» устанавливается на «истина» ack=true, если инвертор сообщил об ошибке, «запись» устанавливается на «false» ack=true. Кроме того, в статус «msg» записывается ответное сообщение инвертора.

Если запись прошла успешно, чтение запускается автоматически.

Инвертор может изменять только одну настройку за раз, и путь передачи лежит от ioBroker через облако к адаптеру WLAN, а затем к инвертору. Настройки обрабатываются одна за другой через очередь. Слишком короткое время сеанса может привести к проблемам.

Написание настроек было разработано в меру наших знаний. Однако автор не несет ответственности за ошибки, содержащиеся в программном обеспечении, или за ущерб, возникший в результате его использования.

#### Время ожидания в секундах
Тайм-аут по умолчанию для HTTP-запросов. Значение по умолчанию 60 секунд, как и в веб-браузерах.

#### Время ожидания процесса в секундах
Этот тайм-аут отслеживает сбор данных с сервера Growatt. Если сервер не обрабатывает все данные в течение этого времени, сообщается об ошибке, сеанс завершается и запускается новый таймер цикла. Значение по умолчанию — 600 секунд.
Если значение равно 0, эта функция проверки не выполняется.

#### Сохранить веб-сессию
Адаптер входит в систему только один раз, а не при каждом запросе данных с сервера Growatt. По умолчанию он включен.

#### Время сеанса в минутах
Здесь вы можете установить, когда адаптер выходит из сервера и снова входит в систему. 0 означает никогда не выходить из системы. Значение по умолчанию: 0=бесконечность.

#### Время цикла в секундах
Интервал, с которым данные запрашиваются с сервера. Время, необходимое для запроса данных, затем вычитается из следующего. Если запрос длится дольше, чем время ожидания, адаптер спит только 100 мс. Значение по умолчанию — 30 секунд.

#### Время цикла ошибки в секундах
Если при запросе значений на сервере Growatt возникает ошибка, вместо времени цикла используется это время. Значение по умолчанию — 120 секунд.

#### Сервер Гроватт
Здесь можно ввести другой URL-адрес, например, для использования домена США. Но он должен начинаться с «https://». По умолчанию пусто, поэтому используется https://server.growatt.com.

### Управление объектами
Здесь вы можете определить, что должно происходить с каждым значением (объектом), принимаемым инвертором.
Есть много значений, которые не принадлежат вашему инвертору. Их можно удалить здесь.
Так как нет события, с помощью которого можно было бы перезагрузить список объектов при сохранении. Кнопка обновления должна использоваться при нажатии кнопки сохранения.

#### Нормальный
Объект остается, значение обновляется.

#### Удалить
Объект удаляется, а значение, загруженное инвертором, отбрасывается.
После обновления отображаются только идентификатор и действие, поскольку объект больше не существует. При обычном выборе объект будет создан снова после сохранения.

#### Нет обновлений
Объект остается, значения с инвертора отбрасываются.

### Управление регистраторами
Экземпляр должен быть запущен и зарегистрирован на сервере. Затем можно вызвать настройки регистратора данных с помощью кнопки обновления на этой вкладке.
Данные не запрашиваются автоматически, запрос можно сделать только через кнопку.
Поля, отображаемые для регистратора данных, не могут быть изменены. Речь идет только о полученных данных.
Кнопки отображаются для каждого регистратора. Настройки можно редактировать с помощью кнопки.
_При использовании GROTT необходимо разрешить изменение настроек в INI._ Пожалуйста, не используйте настройки, если появилось значение, которого вы не ожидали.
Внимание, это основано на реинжиниринге. Я не несу ответственности за повреждение устройства.

#### Интервал кнопки
Текущий интервал в минутах считывается из регистратора данных, и появляется форма ввода, в которой можно настроить значение.
Если вы получите успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### IP сервера кнопок
Здесь можно настроить сервер для передачи данных на регистратор. При использовании Grott или US здесь можно указать локальный или американский IP-адрес.
Если вы получите успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Порт сервера кнопок
Здесь можно установить порт на сервере для передачи данных на регистратор.
Если вы получите успешный ответ, регистратор данных следует перезапустить, чтобы активировать настройки.

#### Кнопка проверки прошивки
Будет задан вопрос о том, обновлена ли прошивка регистратора данных.
Обновление должно быть сделано на странице growatt.

#### Кнопка перезагрузки регистратора данных
Каждый ботинок хорош.
Настройки приняты.

---

## Внутренний метод интервала данных ускорения
Взгляните на Управление регистраторами и интервалом кнопок.

## Метод внешнего приложения с интервалом данных ускорения
- Откройте приложение ShinePhone.
- Нажмите на вложение ниже
- Вверху справа +, затем список регистраторов данных
- Нажмите на существующий регистратор данных
- Настроить регистратор данных
- Режим беспроводной точки доступа
- Переведите стик в режим AP
- Подключиться к точке доступа Wi-Fi, PW 123456789 ? <- проверить еще раз
- Продолжать
- Передовой
- Настройки времени
- Интервал до 1
- Введите пароль growattYYYYMMDD (например, growatt20220209)
- Разблокировать
- Нажмите и примените изменения
- Выйти из режима точки доступа

## Интервал данных ускорения внешний старый метод
В режиме хотспота изменить интервал можно только на старой прошивке.
Growatt удалил сайт из прошивки.
Поэтому и описание было удалено.

** Графики на стороне гроватта не изменились. Там можно увидеть только изменение данных из регистратора данных.**

-\*-

## Changelog

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

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values ​​are empty

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

Copyright (c) 2020 - 2023 PLCHome

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