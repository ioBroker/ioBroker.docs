---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.digitalstrom/README.md
title: ioBroker.digitalstrom
hash: aFdECHYyTSqGhOFERQPZQzN5dcHqGMXSBnXzaaO7H2E=
---
![Логотип](../../../en/adapterref/iobroker.digitalstrom/admin/digitalstrom.png)

![Количество установок](http://iobroker.live/badges/digitalstrom-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.digitalstrom.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.digitalstrom/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/digitalstrom/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.digitalstrom.svg)

# ioBroker.digitalstrom

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер Digitalstrom для ioBroker

Поддержка устройств Digitalstrom через DSS

## Установка

Пожалуйста, установите адаптер через административный интерфейс, как обычно.

Как только адаптер будет официально выпущен, он появится в репозитории и его можно будет просто выбрать.

На этапе тестирования или для проверки более новых версий (см. соответствующие темы на форуме) вы также можете установить адаптер непосредственно из GitHub, используя URL-адрес <https://github.com/ioBroker/ioBroker.digitalstrom> . Для этого воспользуйтесь опцией "Пользовательская установка" в панели администратора.

## Использование

После установки адаптера и создания экземпляра появится диалоговое окно администратора. Прежде всего, вам нужно ввести IP-адрес/имя хоста DSS. Затем вы можете выбрать, создали ли вы уже вручную токен приложения в веб-интерфейсе DSS или нет. Если у вас нет токена приложения, просто введите ваше имя пользователя и пароль, чтобы получить токен приложения автоматически.

Помимо настроек аутентификации (см. выше), вы можете изменить следующие параметры в соответствии со своими потребностями:

- **Интервал опроса данных** : это интервал, с которым данные «счетчика энергии» запрашиваются у ваших устройств DSM. По умолчанию 60 секунд. Вы можете установить 0, если не хотите опрашивать данные счетчика энергии.
- **Использование предустановленных значений сцен** : Система Digitalstrom не предназначена для постоянного доступа к реальным выходным значениям устройств и в основном работает со сценами. Для освещения и жалюзи/штор определены некоторые выходные значения для многих доступных сцен. Адаптер знает их, и когда эта настройка активна, он попытается найти эти значения при запуске сцены и установить их непосредственно в состояния. Реальные значения запрашиваются с задержкой. Этот метод может выдавать неверные значения при установке/использовании локальных приоритетов!
- **Активный запрос значений выходных сигналов устройства** : адаптер инициализирует все значения выходных сигналов устройства при запуске, а также после событий, действующих для данного устройства. При этом возникает задержка, но фактически все эти сообщения будут передаваться по шине Digitalstrom. Если это создает для вас проблемы, вы можете попробовать отключить эту функцию.

После ввода токена приложения и сохранения настроек адаптер автоматически перезапустится.

Когда данные корректны, адаптер считывает структуру квартир и устройств и создает их как объекты ioBroker. Это может занять некоторое время (в зависимости от количества устройств, этажей/зон/групп и производительности вашей системы — несколько секунд). Пожалуйста, будьте терпеливы. И я говорю это совершенно серьезно... Несколько тысяч объектов — это легко! Пожалуйста, дайте адаптеру время!

После этого адаптер подписывается на несколько событий DSS, чтобы получать уведомления о действиях в системе.

Индикатор состояния адаптера загорится зеленым, и в информационном журнале отобразится сообщение "Подписано на состояния...". После этого все готово, и вы можете, например:

- Настройка/отмена сценариев для квартир, зон, групп или устройств.
- Считывание состояния и значений датчиков; для зон также возможно передавать значения датчиков.
- См. значения для бинарных входов, датчиков, кнопок и выходов.

## Структура состояния и объекта

Адаптер предоставляет две структуры данных. Структура «Квартира» включает этажи, зоны (комнаты) и группы, а также структуру «Схемы/dSM» и подключенные устройства с подробными данными о них.

В эти структуры включено несколько «типов» данных:

- Сцены: Сцены реализованы как переключатели. Установка значения "true" отправит команду "callScene" для этой сцены. Значение "false" отправит команду "undoScene" для этой сцены — сервер DSS сам решает, является ли команда "undo" допустимой! Когда сервер DSS запускает событие callScene или undoScene, соответствующая сцена устанавливается в значение "true" или "false" с параметром ack=true.
- Состояния: Отображаются состояния системы и пользовательские состояния, заданные через дополнение, и доступны только для чтения.
- Значения датчиков обновляются при срабатывании события и могут частично изменяться — изменения отправляются на сервер с помощью команды «pushSensorValue», и сервер сам решает, будет ли значение принято! Это особенно актуально для значений температуры или влажности.
-

### Объект «Квартира» и состояния

![Предметы для квартиры](../../../en/adapterref/iobroker.digitalstrom/img/dss-apartment.png)

Для квартиры создается структура с "полом" и "зоной", внутри которой находятся следующие подструктуры:

- Для каждой группы устройств создается подпапка, содержащая доступные сцены для каждой группы.
- сцены для этой зоны
- штаты для этой зоны
- значения датчиков для этой зоны

На уровне квартиры доступны все группы устройств со своими сценариями работы.

На уровне квартиры также отображаются показания датчиков (включая наружные значения), состояния и состояния пользователя.

### Устройства, объекты и состояния

![Устройства Объекты](../../../en/adapterref/iobroker.digitalstrom/img/dss-devices.png)

Устройства имеют структуру "circuit/dSM"."deviceID", а внутренняя подструктура включает в себя:

- Сценарии для устройства будут запускаться только для этого устройства.
- Датчики устройства, когда данные поступают из системы, могут содержать пустые значения.
- Выходные параметры (например, состояние/яркость для освещения и положение/угол для штор/жалюзи) расположены непосредственно под устройством. На данный момент определенная функциональность будет доступна только для освещения и штор/жалюзи.
- Кнопки и двоичные поля ввода также будут представлены состояниями и доступны только для чтения.

## Известные проблемы / Влияние на проектирование системы

- Система DSS работает в основном с использованием сценариев, а не реальных значений устройств, и получение реальных значений происходит очень медленно, поскольку их необходимо получать через шину.
- Значения могут быть пустыми, если они не были указаны системой.
- В настоящее время двоичный ввод реализован "вслепую", поскольку у меня нет таких устройств. Поэтому я буду рад получить логи/отчеты с устройствами двоичного ввода :-)
- Функция чтения и записи осмысленных выходных значений реализована только для устройств светлого (желтого) и теневого/слепого (серого) цветов.
- У меня пока не было возможности проверить, как система работает с виртуальными центрами обработки данных (vDC). Поэтому мне нужны логи и подробности, чтобы добавить их сюда.
- Системы вентиляции и регулирования температуры/устройства также не внедрены в полной мере... что здесь имеет смысл?

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

Пожалуйста, используйте для этого раздел "Проблемы" на GitHub.

Лучше всего установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем, пожалуйста, получите лог-файл с диска (подкаталог "log" в каталоге установки ioBroker, а не из административной панели, поскольку административная панель обрезает строки). Если вы не хотите предоставлять его в рамках задачи на GitHub, вы также можете отправить его мне по электронной почте ( <iobroker@fischer-ka.de> ). Пожалуйста, добавьте ссылку на соответствующую задачу на GitHub И опишите, что я вижу в логе и в какое время.

## Changelog

### 2.3.0 (2021-08-01)
* (Apollon77) Add support for use defined properties on apartment level

### 2.2.1 (2021-07-26)
* (Apollon77) Optimize for js-controller 3.3
* (Apollon77) Optimize get/set Value handling for new devices

### 2.2.0 (2021-04-16)
* (Apollon77) Add support for integrated (IC) devices (SW, GE, GR)

### 2.1.0 (2021-04-13)
* (Apollon77) prevent crashes (Sentry IOBROKER-DIGITALSTROM-5)
* (Apollon77) Fix EnergyMeterValue
* (Apollon77) further optimizations and adding new outout channel types

### 2.0.5 (2020-03-14)
* (Apollon77) BREAKING: binaryInput are now numbers intead of booleans because it can have values other then true/false
* (Apollon77) BREAKING: Some states are converted to strings to allow all values to be passed
* (Apollon77) Fixes on some outputValues 
* (Apollon77) add new sunelevation and sunazimuth values 

### 1.0.2 (2020-02-10)
* (Apollon77) trigger buttons on scene calls also if scene is normally not allowed but came from the device
* (Apollon77) fix button logic
* (Apollon77) also add sensor type 255, but without name and unit because unknown
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany
* (Apollon77) user states are optional now
* (Apollon77) add button states for devices wth more then 1 button

### 1.0.0 (2020-01-31)
* (Apollon77) bump version to 1.0.0
* (Apollon77) update dependecies
* (Apollon77) change default loglevel to info

### 0.5.5 (2020-01-29)
* (Apollon77) fix smaller errors
* (Apollon77) send Sentry reports to own server

### 0.5.0 (2020-01-19)
* (Apollon77) add buttons for more device types (also vDC) and try to detect button triggers

### 0.4.10 (2020-01-19)
* (Apollon77) state changes added
* (Apollon77) Fixed shade position control

### 0.4.9 (2020-01-18)
* (Apollon77) add unknown weather sensor "windgust"
* (Apollon77) change handling of Input types
* (Apollon77) Fix controlling of shaders 

### 0.4.7 (2020-01-17)
* (Apollon77) fix error when writing vdc output values

### 0.4.6 (2020-01-17)
* (Apollon77) fix missing datatypes for some states (mainly sensors and output values)

### 0.4.5 (2020-01-17)
* (Apollon77) fix error in sentry reporting

### 0.4.4 (2020-01-17)
* (Apollon77) fix error (Sentry IOBROKER-DIGITALSTROM-7)

### 0.4.2 (2020-01-16)
* (Apollon77) fix wrong scene state updates if same scene is triggered twice
* (Apollon77) also trigger scene update for all groups if scene was called on zone or to all zones and groups when done on apartment

### 0.4.1 (2020-01-16)
* (Apollon77) also add basic scenes to room groups

### 0.4.0 (2020-01-15)
* (Apollon77) add userActions as states and allow to trigger the actions

### 0.3.3 (2020-01-15)
* (Apollon77) fixes for scene lists
* (Apollon77) add some special szenes to more groups 

### 0.3.2 (2020-01-14)
* (Apollon77) fixes for adapter start

### 0.3.1 (2020-01-14)
* (Apollon77) fixes
* (Apollon77) make sure to initialize scenes, states and sensors really on startup - values will be overwritten if delivered with ack=true!
* (Apollon77) add all Presets (0-44) to Room/Zone and Group states 
* (Apollon77) also for unknown device types try to initialize output value IF only one is there (assuming it is offset/index 0!) Please check and report back!
* (Apollon77) make some initial processing async to block eventLoop less

### 0.3.0 (2020-01-14)
* (Apollon77) further optimize (lower) delays and timeouts, please give feedback!
* (Apollon77) add "stateId" State for each scenes folder with the scene number. This is updated with the scenes and also controllable.
* (Apollon77) scenes will not be cleared at the beginning and initialized with the "lastSceneId" returned from DSS; initialization may take some seconds longer!
* (Apollon77) update dependencies
* (Apollon77) increase loglevel of some "invalid cases" to warn to better see if they happen
* (Apollon77) fix handling of binaryInput events

### 0.2.2 (2020-01-13)
* (Apollon77) optimize event subscription logic and timeouts (should prevent "error 500 cases", now tries to resubscribe)

### 0.2.1 (2020-01-13)
* (Apollon77) optimize brightness handling
* (Apollon77) optimize error and reconnection handling

### 0.2.0 (2020-01-12)
* (Apollon77) initial official testing release (still GitHub)

### 0.1.x
* (Apollon77) initial release and finalization

## License
MIT License

Copyright (c) 2020-2021 Apollon77 <iobroker@fischer-ka.de>

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