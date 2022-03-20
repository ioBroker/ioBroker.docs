---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.growatt/README.md
title: ioBroker.growatt
hash: u+0xUXjhtPJ4FIijx/74CtuRVDVmd0xZ+gjJI8w/9jo=
---
![Логотип](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Количество установок (последние)](http://iobroker.live/badges/growatt-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/growatt-stable.svg)
![Статус зависимости](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![НПМ](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

# IoBroker.growatt
## Адаптер growatt для ioBroker
Адаптер ioBroker Growatt для связи с сервером Growatt Shine.
Я не аффилирован.
Обычно данные отправляются из регистратора данных в облако каждые 5 минут.
Вы можете изменить его, см. ниже.

Не все типы растений реализованы.

В настоящее время можно только читать данные, запись или изменение параметров невозможно.

----------------------------------------------------------------------------------------------------------------------

# Административная страница адаптера
## Основные настройки
### Пользователь и пароль
Пожалуйста, введите имя и пароль, которые вы также используете в приложении Shine или на веб-портале.

### Войти с общим ключом
На веб-сайте Growatt в разделе «Энергия, управление заводом, рабочие инструменты» вы можете отправить себе ключ по электронной почте.

### Чтение данных установки
Эта запись данных содержит сохраненные основные данные

### Читать последние данные истории
Считывает последнюю запись данных из истории регистратора данных.
Эта функция поддерживает минутные интервалы для регистратора данных.

### Чтение данных о состоянии
Эти данные доступны не для всех заводов (кроме INV/MAX/TLX). Этот набор данных содержит оперативные данные.
Эта функция поддерживает минутные интервалы для регистратора данных.

### Читать общие данные
Эта запись данных содержит агрегированные данные.

### Чтение данных устройства
Эта запись данных содержит некоторые данные с устройства. Некоторые данные также доступны в других категориях.

### Читать погоду
Этот набор данных содержит прогноз погоды.

### Время ожидания в секундах
Тайм-аут по умолчанию для HTTP-запросов. Значение по умолчанию 60 секунд, как и в веб-браузерах.

### Время ожидания процесса в секундах
Этот тайм-аут отслеживает сбор данных с сервера Growatt. Если сервер не обрабатывает все данные в течение этого времени, сообщается об ошибке, сеанс завершается и запускается новый таймер цикла. Значение по умолчанию — 600 секунд.
Если значение равно 0, эта функция проверки не выполняется.

### Сохранить веб-сессию
Адаптер входит в систему только один раз, а не при каждом запросе данных с сервера Growatt. По умолчанию он включен.

### Время сеанса в минутах
Здесь вы можете установить, когда адаптер выходит из сервера и снова входит в систему. 0 означает никогда не выходить из системы. Значение по умолчанию: 0=бесконечность.

### Время цикла в секундах
Интервал, с которым данные запрашиваются с сервера. Время, необходимое для запроса данных, затем вычитается из следующего. Если запрос длится дольше, чем время ожидания, адаптер спит только 100 мс. Значение по умолчанию — 30 секунд.

### Время цикла ошибки в секундах
Если при запросе значений на сервере Growatt возникает ошибка, вместо времени цикла используется это время. Значение по умолчанию — 120 секунд.

## Управление объектами
Здесь вы можете определить, что должно происходить с каждым значением (объектом), принимаемым инвертором.
Есть много значений, которые не принадлежат вашему инвертору. Их можно удалить здесь.
Так как нет события, с помощью которого можно было бы перезагрузить список объектов при сохранении. Кнопка обновления должна использоваться при нажатии кнопки сохранения.

### Обычный
Объект остается, значение обновляется.

### Удалить
Объект удаляется, а значение, загруженное инвертором, отбрасывается.
После обновления отображаются только идентификатор и действие, поскольку объект больше не существует. При обычном выборе объект будет создан снова после сохранения.

### Нет обновлений
Объект остается, значения с инвертора отбрасываются.

----------------------------------------------------------------------------------------------------------------------

# Ускорение интервала данных новый метод
* Откройте приложение ShinePhone
* Нажмите на вложение ниже
* Вверху справа +, затем список регистраторов данных
* Нажмите на существующий регистратор данных
* Настройка регистратора данных
* Режим беспроводной точки доступа
* Переведите флешку в режим AP
* Подключиться к точке доступа Wi-Fi, PW 123456789 ? <- проверить еще раз
* Продолжать
* Передовой
* Настройки времени
* Интервал до 1
* Введите пароль growattГГГГММДД (например, growatt20220209)
* Разблокировать
* Нажмите и примените изменения
* Выйти из режима точки доступа

----------------------------------------------------------------------------------------------------------------------

# Ускорение интервала данных старый метод
## Вы можете установить интервал регистрации от 5 минут до 1 минуты
Снимите резиновую заглушку кнопки KEY с ShineWiFi-S и коротко нажмите кнопку внутри. Загорится синий светодиод. Используйте свой телефон или компьютер для подключения к беспроводной сети, излучаемой модулем ShineWiFi-S. Имя сети/SSID — это серийный номер модуля ShineWiFi-S.

## Страница авторизации
После успешного подключения откройте веб-браузер на телефоне или компьютере и введите в адресной строке 192.168.10.100. Имя пользователя admin, пароль по умолчанию 12345678.
![Страница авторизации](../../../en/adapterref/iobroker.growatt/docs/login.png)

## Расширенные настройки
Измените время интервала данных на 1 минуту ![Расширенные настройки](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

## Перезагрузка системы
Перезапустите модуль ShineWiFi-S на этой странице, нажмите «Немедленный перезапуск», чтобы активировать новые настройки, которые вы только что сделали, и выйдите из внутреннего веб-сервера вашего модуля ShineWiFi.
![Перезапуск системы](../../../en/adapterref/iobroker.growatt/docs/restart.png)

** Графики на стороне гроватта не изменились. Там можно увидеть только изменение данных из регистратора данных.**

-*-

## Changelog
### 1.1.8 (16.03.2022)
* (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)
* (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)
* (PLCHome) Read me

### 1.1.2 (12.02.2022)
* (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
* (PLCHome) Server request improved and additionally secured against dying
* (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
* (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
* (PLCHome) Improved error handling
* (PLCHome) Improved debugging
* (PLCHome) Update the includes

### 1.1.1 (27.05.2021)
* (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)
* (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)
* (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)
* (PLCHome) Read me
* (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)
* (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)
* (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
* (PLCHome) Objects of unselected data areas are now deleted.
* (PLCHome) You can choose objects to be ignored or deleted.
* (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
* (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)
* (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)
* (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)
* (PLCHome) npm package version update
* (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)
* (PLCHome) npm package version update

### 0.0.14 (01.12.2020)
* (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.


-*-

## License
The MIT License (MIT)

Copyright (c) 2020 - 2022 PLCHome

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