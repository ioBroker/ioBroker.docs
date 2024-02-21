---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: jm4d86iolNT81uYM7Gr9JRrk+50hyCY7kZPCO9Sw6mc=
---
![Логотип](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Количество установок](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.heatingcontrol?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.heatingcontrol?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.heatingcontrol?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)

# IoBroker.HeatingControl
![Действия GitHub](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

**Если вам это нравится, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## Документация
**Мне нужна поддержка в создании/обновлении пользовательской документации и часто задаваемых вопросов. Если кому-то интересно, свяжитесь со мной...**

## Адаптер для управления системой отопления.
Функции:

* Контролируйте уровни заданной температуры всех термостатов по расписанию.
* Настройка нескольких периодов отопления для каждого дня и ночи
* Поддерживает все виды термостатов (предварительное условие: он должен быть доступен в ioBroker)
* Автоопределение устройства Homematic
* поддерживает несколько профилей
* Если между термостатом и приводом нет прямого соединения, привод можно включить непосредственно из адаптера.
* В настоящее время привод отключается непосредственно при достижении заданной температуры. Как только заданная температура станет ниже фактической температуры, привод включится. (Что нужно сделать: внедрить улучшенный контроль)
* поддерживается неограниченное количество термостатов, приводов и датчиков на комнату
* Термостат, привод и датчик автоматически обнаруживаются для каждой комнаты. Для этого используется функция (например, «отопление»).
* Комнаты можно исключить в интерфейсе администратора, если в комнате есть термостат, но ею нельзя управлять.
* датчик используется для снижения заданной температуры (например, если открыто окно); опционально с SensorDelay
* интерфейс с адаптером Feiertag или любым другим для определения государственных праздников. Государственным праздником может быть обычный день или воскресенье. (настройка администратора)
* ручное регулирование температуры на определенное время
* предопределенный период отопления
* принять изменения от термостата (опционально)
* поддерживается визуализация из [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis). Спасибо!

[Часто задаваемые вопросы](doc/FAQ.md)

## Монтаж
## Настройки
### Основной
* Функция = Функция, которая будет использоваться для обнаружения термостатов, исполнительных механизмов и датчиков в помещении. Это одно из системных перечислений
* часовой пояс = будет использоваться cron для настройки заданий cron
* Путь к Feiertag-Adapter = если вы хотите использовать Feiertag-Adapter для автоматического определения сегодняшних государственных праздников, укажите путь здесь (например, feiertage.0).
* удалить все устройства при открытии администратора = должно быть отключено. Включайте его только в том случае, если вам необходимо удалить все настройки помещения, привода и датчиков. Поиск устройства будет выполнен, когда откроется администрация адаптера.
* используемый датчик = если у вас есть оконные датчики и вы хотите уменьшить целевую температуру при открытом окне, включите эту опцию
* используемые приводы = если вы хотите управлять приводами непосредственно с адаптера. На тот случай, если нет прямой связи между термостатом и приводом.
* используйте исполнительные механизмы, если период нагрева отсутствует = действует только с исполнительными механизмами. Определяет, как активируются исполнительные механизмы, когда период отопления не активен.
* используйте приводы, если термостат отсутствует = действует только с приводами. Если у вас есть помещения без термостата, но с приводом отопления, вы можете постоянно включать или выключать их.

### Профиль
* Тип профиля = поддерживаются три разных типа профиля (с понедельника по воскресенье или с понедельника по пятницу и суббота/воскресенье или каждый день).
* количество профилей = если вам нужно больше, то увеличьте это значение в профиле. Затем вы можете выбрать, какой профиль будет использоваться.
* количество периодов = определите, сколько дневных секций с разной температурой вам нужно. Чем больше вы установите, тем больше точек данных будет создано. Лучше использовать низкое значение (например, 5).
* «праздничный день, например воскресенье» = если вы хотите установить целевые температуры в праздничный день, например в воскресенье, включите эту опцию. В противном случае настройки праздничных дней такие же, как и в обычные дни.
* HeatingPeriod = дата начала и окончания отопительного периода. Используется для установки «HeatingPeriodActive».

### Устройств
* список всех номеров. Здесь вы можете отключить комнату.
* нажмите кнопку редактирования справа, чтобы открыть окно настроек термостатов, приводов и датчиков для этой комнаты.

### Редактировать комнату
* здесь вы можете проверить и установить идентификаторы объектов для термостатов, исполнительных механизмов и датчиков
* вы можете вручную добавлять новые термостаты, приводы или датчики. Просто нажмите кнопку +. Затем вы получаете пустую строку, которую необходимо заполнить. Кнопка «Редактировать» открывает список доступных устройств в системе.
* термостаты:

** необходимо указать имя, OID целевой температуры и OID текущей температуры.

* приводы

** имя и OID для состояния должны быть установлены

* датчики

** имя и OID для текущего состояния должны быть установлены

## Точек данных
| Имя DP | описание |
|---------------------|-----------------------------------------------------------------------------------------------------|
| Период ОтопленияАктивный | если выключено, профили использоваться не будут |
| ТекущийПрофиль | выбрать текущий профиль (на основе 1, означает, что профиль 1 использует точки данных в разделе Heatcontrol.0.Profiles.0 ) |
| Последний запуск программы | показывает время последнего запуска адаптера |

### Понижение/повышение температуры
| Имя DP | описание | целевая температура для относительного снижения | целевая температура для абсолютного снижения |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| ГостиПодарок | повысить температуру, потому что гости хотят потеплее | увеличить текущую температуру профиля на Profiles.0.room.relative.GuestIncrease | установите цель Profiles.0.room.absolute.GuestIncrease |
| Вечеринка сейчас | уменьшите температуру, потому что становится жарко» | уменьшить текущую температуру профиля с помощью Profiles.0.room.relative.PartyDecrease | установите цель Profiles.0.room.absolute.PartyDecrease |
| Настоящее время | мы присутствуем, если нас нет, уменьшите температуру | уменьшить текущую температуру профиля с помощью Profiles.0.room.relative.AbsentDecrease | установите цель Profiles.0.room.absolute.AbsentDecrease |
| ОтпускОтсутствует | нас нет, поэтому и в выходные уменьшится | уменьшить текущую температуру профиля с помощью Profiles.0.room.relative.VacationAbsentDecrease | установите цель Profiles.0.room.absolute.VacationAbsentDecrease |
| Режим КаминаАктивный | снижение температуры, поскольку вы пользуетесь камином, будет | уменьшить текущую температуру профиля с помощью Profiles.0.room.relative.FireplaceModeDecrease | установите цель Profiles.0.room.absolute.FireplaceModeDecrease |

| | автоматически сбрасывается в регулируемое время

* Точки данных доступны только в том случае, если установлены «Общие настройки профиля, снижение температуры».
* в обоих вариантах используется только одно обезжиривание (в предыдущей версии адаптера можно было использовать более одного обезжиривателя)
* в сценарии абсолютного обезжиривания используются только целевые значения, не равные 0°C. Если вам не требуется понижение температуры для определенного помещения, оставьте значения понижения на уровне 0°C.

### Без отопительного периода
есть три варианта

* исправлена температура в комнате

если выбрана эта опция, для каждой комнаты появляется новая точка данных в дереве объектов. Здесь вы можете установить фиксированную целевую температуру, которая устанавливается, когда период отопления не активен.

* исправлена температура для всех комнат

с помощью этой опции вы можете использовать одну целевую температуру для каждой комнаты, когда период отопления не активен.

* ничего

с этой опцией ничего не будет отправляться на термостат, если период отопления не активен. Заданная температура сохраняется с момента последнего достижения, когда период нагрева еще был активен.
В этом случае, если вы используете актуаторы из адаптера, у вас есть возможность определить, как следует настраивать актуаторы (выключить, включить или оставить все как есть).

## Другие
* HolidayPresent / PublicHolidyToday

Если вы включите «Подарок к празднику, например, в воскресенье» или «Праздничный праздник, например, в воскресенье» в администраторе, профиль воскресенья будет использоваться, когда адаптеру сообщают, что сегодня государственный праздник или вы находитесь дома в отпуске.

### Окно открыто
если «использовать датчики» активно и датчики для помещения настроены, то

* уменьшить текущую температуру профиля, когда окно открыто (true) на Profiles.0.room.WindowOpenDecrease, если настроено относительное понижение
* установите цель Profiles.0.room.absolute.WindowOpenDecrease, когда окно открыто (true), если настроено абсолютное уменьшение

опционально можно использовать задержку. Если окно открыто только на короткое время, задержка датчика может избежать уменьшения и возврата к нормальному состоянию за очень короткое время.

## Техническая поддержка
вы можете использовать свой календарь или любую другую точку данных для изменения точек данных в адаптере.
Просто настройте события из ical или других точек данных в администраторе. Поддерживаются

| точка данных | описание |-------------------------------------|---------- -------------------------------------------------- ---------------- |heatingcontrol.0.Присутствует | установите для него значение true (в случае логического значения) или число, превышающее предел (в случае числа) |heatingcontrol.0.HolidayPresent | установите значение true, когда вы находитесь дома во время отпуска |heatingcontrol.0.VacationAbsent | установите значение true, когда вас нет дома во время отпуска |heatingcontrol.0.GuestsPresent | установите для него значение true (в случае логического значения) или число, превышающее предел (в случае числа) |heatingcontrol.0.PartyNow | установите для него значение true (в случае логического значения) или число, превышающее предел (в случае числа)

Подсказка: с помощью числовых точек данных вы можете подсчитать, сколько людей находится в доме, а затем решить, например. нам хватит на вечеринку...

## Использовать изменения из термостата
Многие пользователи просили предоставить возможность перенести изменения с термостата на адаптер. Сейчас реализованы четыре варианта:

| вариант | описание |--------------------------|--------------------- -------------------------------------------------- ---------------- | нет | изменения от термостата игнорируются | как переопределить | изменения термостата принимаются как приоритетные; время переопределения должно быть установлено заранее в файлеheatcontrol.0.Rooms.RoomName.TemperaturOverrideTime | | если время переопределения не установлено, то переопределение не выполняется | как новая настройка профиля | изменения от термостата принимаются в качестве целевой температуры для текущего периода профиля | до следующей точки профиля | изменения от термостата принимаются в качестве целевой температуры до следующей точки профиля. Это ручной режим, поэтому используются только датчики окон. Все остальное | | увеличение/уменьшение игнорируются. В каждой комнате есть точка данных для отключения ручного режима перед достижением следующей точки профиля.

## Расширить переопределение при изменении температуры
Стандартное поведение коррекции: при изменении температуры время коррекции не изменяется. Например, если вы начинаете переопределять температуру 25 °C на 20 минут и через 15 минут переходите на 28 °C, то 28 °C будет использоваться только в течение последних 5 минут. С помощью этой опции вы перезапускаете переопределение всякий раз, когда меняете температуру переопределения.
В примере выше 28°C будет использоваться в течение 20 минут, что приводит к 15 минутам 25°C и 20 минутам 28°C.

## Режим переопределения
В администраторе есть два режима, которые можно настроить для всех комнат.

* управление по таймеру

это хорошо известная функция, которая использует температуру и продолжительность. Заданная температура используется в течение определенного периода времени, а затем целевая температура возвращается к значению в автоматическом режиме.

* до следующего пункта профиля

это новая функция. Здесь мы можем использовать переопределение температуры до следующей точки профиля. Продолжительность будет игнорироваться, но должна быть ненулевой!

## Термостат обрабатывает сообщение «окно открыто»
Некоторые термостаты могут самостоятельно обрабатывать сообщение «окно открыто». В этих случаях устанавливается прямая связь между датчиком окна и термостатом, и термостат сам снижает заданную температуру при открытии окна.
В сочетании с опцией «использование изменений термостата» / «до следующей точки профиля» это приведет к неожиданному ручному состоянию. В этой ситуации пониженная температура будет использоваться до следующей точки профиля.
Но адпатер может справиться с таким поведением. Необходимо включить опцию «Термостат регулирует «Окно открыто»», и вы также можете настроить датчики окна в адаптере.
Когда окно открыто, адаптер ожидает макс. 3 секунды для новой целевой температуры от термостата. Если за это время будет получена новая целевая температура, она будет использоваться как пониженная абсолютная температура. Статус будет «автоматическое открытие окна». Как только окно закрывается, статус возвращается к автоматическому, и термостат возвращает исходную заданную температуру. **Внимание** в этом случае не используйте задержку открытия датчика. Если вы его используете, событие открытия окна появляется после получения целевой температуры от термостата. Это приводит к ручному состоянию.

## Копировать период и копировать профиль
``heatcontrol.0.Profiles.1.CopyProfileheatcontrol.0.Profiles.1.Room.CopyProfile ``

и

``heatcontrol.0.Profiles.1.Küche.Fri.CopyPeriods ``

CopyProfile копирует все содержимое профиля, в котором нажата кнопка, в следующий профиль. В приведенном выше примере кнопка находится в профиле 1. Кнопка копирует все из профиля 1 в профиль 2.
Если вы хотите скопировать только одну комнату, используйте кнопку в определенной комнате.

CopyPeriods доступны в день или с понедельника по пятницу для каждого номера. При этом периоды копируются в следующий раздел. В приведенном выше примере CopyPeriods копирует все периоды с пятницы в кухонной комнате до субботних периодов в кухонной комнате.
Таким образом, вы можете, например. в профиле "каждый день отдельно" скопируйте периоды с понедельника по воскресенье...

## Режим обслуживания
делать

## Режим камина
делать

## Обработка привода
делать

переключение между линейным и линейным с гистерезисом

описать две новые точки данных:heatcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset иheatcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset

## Расширенная обработка привода
проверяет, что значение установлено правильно и установлено подтверждение, в противном случае повторяет попытку...

делать

## EVU Sperrzeit / PowerInterruption
при достижении времени блокировки энергоснабжающей компании все исполнительные механизмы выключаются и снова включаются по истечении времени блокировки.
Статус переходит в «EVU Sperrzeit» / «PowerInterruption». Цель: выключить электрические нагреватели и целенаправленно включить их снова, чтобы минимизировать нагрузку на контакторы и минимизировать пусковые токи. Конфигурация: время начала/окончания блокировки EVU. время, можно настроить несколько периодов

## Проблемы и пожелания
* Если вы столкнулись с какими-либо ошибками или у вас есть запросы на добавление функций для этого адаптера, создайте проблему в разделе проблем GitHub адаптера на странице [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). ). Любые отзывы приветствуются и помогут улучшить этот адаптер.

## Известные вопросы
### Адаптер с Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 – 10fach, 230 В
Похоже, что HmIP-FAL230-C10 нельзя использовать непосредственно в качестве привода в сочетании с этим адаптером. Если вы используете HmIP-FAL230-C10 вместе с термостатами Homematic, он должен работать.
см. также [Форум](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### Функция открытия окна термостатов HM
Термостаты HM имеют функцию открытого окна в двух вариантах. С одной стороны, как обнаружение падения температуры, а с другой стороны, в связи с оконным контактом.
Эта функция заставляет адаптер переключаться в ручной режим при открытии окна. В идеале эту функцию следует отключить, чтобы не мешать работе адаптера.
Если термостат использует информацию от датчика окна, тогда необходимо включить опцию «термостат управляет открытием окна».

При сбое адаптера или возникновении другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, передается в Sentry. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.12.4 (2024-02-11)
* (René) dependencies updated
* (Marc-Berg) update readme "temperature decrease / increase"
* (René) in some cases undefined was sent in notification messages instead of actor name
* (René) bug fix related to cron@3.x.x: show next cron job event in log

### 2.12.3 (2024-01-12)
* (René) dependencies updated

### 2.12.2 (2023-12-16)
* (René) see issue #491: bug fix in offset calculation (NaN)

### 2.12.1 (2023-11-25)
* (René) issue #459: Show the number of objects that can be deleted in the log and indicate that they can be deleted in admin
* (René) issue #376: notification messages customizable

### 2.12.0 (2023-11-22)
* (René) dependencies updated
* (René) fix eslint reported issues
* (René) see issue #486: option to use offset calculation immediately
* (René) see issue #489: increase limit of status change list to 100

### 2.11.1 (2023-07-30)
* (René) dependencies updated

### 2.11.0 (2023-06-18)
* (René) see issue #368: units added in datapoints
* (René) see issue #361: EVU Sperrzeit / PowerInterruption (description see above)
* (René) see issue #359: support of discord added to notifications
* (René) see issue #367: wait for set target temperature before checking actor changes

### 2.10.6 (2023-01-31)
* (René) see issue #355: reset override is now also with Button ResetManual possible

### 2.10.5 (2023-01-21)
* (René) see issue #356: create list if room list is empty
* (René) see issue #357: remove change event when loading telegram data
* (René) handling of exceptions reported by sentry in notification modul

### 2.10.4 (2022-12-21)
* (René) UTF8 conversion for some files
* (René) more space for same values in admin

### 2.10.3 (2022-12-19)
* (René) see issue #347: waiting time for target temperature update from thermostat adjustable per room
* (René) see issue #348: bug fix to avoid unnecessary error message

### 2.10.1 (2022-12-10)
* (René) update dependencies
* (René) see issue #337: bug fix in calculate profil position
* (René) see issue #336: translation of notification mesaages
* (René) see issue #347: bug room status if option "thermostat handles windows open" is enabled and window opened and closed
* (René) some minor bug fixes

### 2.9.3 (2022-10-28)
* (René) update dependencies
* (René) see issue #323: add telegram user to select box
* (René) see issue #325: autodetect for HmIP-WTH-2 changed

### 2.9.2 (2022-08-19)
* (René) update dependencies

### 2.9.1 (2022-06-10)
* (René) bug fix timer id's for extended actor handling
* (René) bug fix exception in SetRoomTemperature

### 2.9.0 (2022-06-09)
* (René) see issue #302: adjustable info logging for temperature, aktor and window status change
* (René) see issue #306: extended handling to set actuator state and thermostat target temperature added

### 2.8.7 (2022-04-23)
* (René) see issue #312: bug fix in window is open handling if thermostat reduces temperature

### 2.8.6 (2022-03-31)
* (René) see issue #265 and #305: bg fix window handling for rooms with more then one window and sensors with regular status update

### 2.8.5 (2022-02-12)
* (René) sentry: Cannot read property 'PARENT_TYPE' of undefined
* (René) see issue #291: inter thermostat delay added
* (René) better logging for timediff measurement with external sensors
* (René) minimum temperature check added in offset calculation

### 2.8.4 (2022-01-29)
* (René) see issue #289: round offset to 0.5°C instead 0.25°C
* (René) see issue #292: set actors when room becomes inactive like out of heating period
* (René) see issue #291: inter actuator delay added
* (René) new datapoint to show current profile target temperature

### 2.8.3 (2022-01-07)
* (René) see issue #286: Loading the configuration fixed
* (René) target temperature rounded to 0.5°C instead 0.25°C to avoid rounding on thermostat itself

### 2.8.2 (2022-01-04)
* (René) see issue #285: absent and VacationAbsent exchanged to check reduced mode
* (René) see issue #271: ack flag set only if it's in own namespace, external DP'S acks are not set anymore

### 2.8.1 (2021-12-29)
* (René) see issue #283: show internal and external temperature sensors in room status
* (René) see issue #272: extend override only if different temperature was sent
* (René) see issue #278: reset remaining override time to 0 when override is canceled
* (René) offset not to be used when room is in reduced mode (e.g. window open)
* (René) see issue #271: set ack flag for changed DP after 2 seconds, to give a chance to other adpaters to react on un-acked DP's

### 2.8.0 (2021-12-18)
* (René) see issue #266: differrent regulators for actor handling added (linear and linear with hysteresis)

### 2.7.2 (2021-11-14)
* (René) bug fix load / save profiles: check fireplace mode added
* (René) reset offset if disabled or no sensor (see issue #274)
* (René) bug fix for override in case of "use changes from thermostat as override": reset and window open handling

### 2.7.1 (2021-10-20)
* (René) see issue #268: change of override in manual mode is mssing

### 2.7.0 (2021-10-18)
* (René) see issue #259: limit for temperature offset added
* (René) see issue #227: maximum time difference between standard sensor and external sensor added
* (René) see issue #264: some changes for Pittini-vis

### 2.6.2 (2021-09-29)
* (René) see issue #260: bug fix isActive not ignored

### 2.6.1 (2021-09-25)
* (René) see issue #258: bug fix fireplace mode and vis

### 2.6.0 (2021-09-17)
* (René) maintenance mode added

### 2.5.1 (2021-08-20)
* (René) see issue #255: bug fix fireplace mode

### 2.5.0 (2021-08-20)
* (René) fireplace mode added
* (René) see issue #247: disable temp offset calculation when heating is off
* (René) see issue #223: bug fix to find correct period
* (René) see issue #194: accept float as minimum / maximum in vis settings; add warning if minumum is lower then 4.5°C

### 2.4.3 (2021-06-17)
* (René) see issue #243: bug fix for HeatingPeriod when adpater starts
* (René) see issue #245: problem with manual mode when SensorOpenDelay is used
* (René) see issue #244: bug fix for WindowOpenImg

### 2.4.2 (2021-05-17)
* (René) logging for ActorsOn optimized

### 2.4.1 (2021-05-15)
* (René) see #233: remaining override time set also for choosen room in vis
* (René) bug fix public holiday detection

### 2.4.0 (2021-05-13)
* (René) make it ready for js-controller 3.3

### 2.3.2 (2021-04-18)
* (ericsboro) vis translation to russian
* (René) see issue #231: bug fix detect heating period

### 2.3.1 (2021-04-05)
* (René) some optimisations for vis translation

### 2.3.0 (2021-03-20)
* (René) see issue #187: show remaining override timeConverter
* (René) see issue #225: support different languages for vis
* (René) see issue #223: new overide mode "until next profile point"
* (René) bug fix to calculate average for temperatur offset

### 2.2.0 (2021-02-15)
* (René) see issue #146: different type of window sensor and also adjustable comparative value
* (René) see issue #110: optionally every room can be set to "no heating" with separate datapoint
* (René) see issue #185: maintenance function: Delete all unused datapoints (e.g. profiles) is implemented now for admin
* (René) see issue #185: maintenance function: Delete all devices related to a room, when a room is deleted is implemented now for admin
* (René) see issue #207: copy buttons for vis added
* (René) see issue #219: bug fix: DecreaseValues and ProfilName are copied in CopyProfile now

### 2.1.1 (2021-02-08)
* (René) bug fix Temperatur Offset: invert sign of TemperatureOffset

### 2.1.0 (2021-01-31)
* (René) see issue #198: add name to profile as a datapoint, used to be shown in visualisation
* (René) see issue #194: limit and step width for increase / decrease values adjustable in admin 
* (René) see issue #182: Temperatur Offset
* (René) see issue #212: ActiveTimeSlot inkorrekt for vis

### 2.0.4 (2021-01-28)
* (René) bug fix for issue #213: Warnung "!!! Statechange not handled"

### 2.0.3 (2021-01-24)
* (René) bug fix for issue #211: endless change of temperatures

### 2.0.2 (2021-01-22)
* (René) bug fix for issue #208: exception "undefined is not a valid state value"
* (René) bug fix for issue #209: Not all open windows are recognized

### 2.0.1 (2021-01-19)
* (René) bug fix for issue #204: do not take over reduced temperature in manual mode
* (René) bug fix for issue #203: Warnings "has no existing object, this might lead to an error"
* (René) bug fix for issue #205: override start

### 2.0.0 (2021-01-16)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* (optionally) extend override when temperature is changed; in standard new temperature is set, but timer is not changed
* (optionally) Thermostat handles "window is open"
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden

### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined]

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined]

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start

### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License
MIT License

Copyright (c) 2019-2024 René G. <info@rg-engineering.eu>

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