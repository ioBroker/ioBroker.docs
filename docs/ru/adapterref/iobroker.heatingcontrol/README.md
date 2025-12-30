---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: XJpvhWciveYyyuOXSEWM/bmzKP5SY/p33EBWLcxfo48=
---
![Логотип](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Количество установок](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.heatingcontrol?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.heatingcontrol?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.heatingcontrol?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)

# IoBroker.HeatingControl
![GitHub Actions](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

[![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/heatingcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## Документация
**Мне нужна помощь в создании/обновлении пользовательской документации и раздела часто задаваемых вопросов (FAQ). Если кто-то заинтересован, пожалуйста, свяжитесь со мной...**

## Перевод
Адаптер переводится с помощью Weblate, веб-инструмента, упрощающего перевод как для разработчиков, так и для переводчиков.
[Примите участие в проекте ioBroker Adapters.](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Нажмите здесь, чтобы перейти непосредственно к переводам.](https://weblate.iobroker.net/projects/adapters/heatingcontrol/)

## Адаптер для управления вашей системой отопления.
Функции:

* Регулировка заданных значений температуры всех термостатов в соответствии с расписанием.
* Настройте несколько периодов обогрева для каждого дня и ночи
* Поддерживает все типы термостатов (предварительное условие: он должен быть доступен в ioBroker)
* Автоматическое определение устройства Homematic
* поддерживает несколько профилей
* Если между термостатом и приводом нет прямой связи, привод можно отключить непосредственно через адаптер.
* В настоящее время исполнительный механизм отключается сразу же при достижении заданной температуры. Как только заданная температура опустится ниже фактической, исполнительный механизм включится. (Задача: реализовать улучшенное управление)
* Поддерживается неограниченное количество термостатов, исполнительных механизмов и датчиков в каждой комнате.
* Термостат, исполнительный механизм и датчик могут автоматически определяться для каждой комнаты (только в устройствах Homematic). Для этого используется соответствующая функция (например, «отопление»).
* Комнаты можно исключить из административного интерфейса, если в комнате установлен термостат, но управлять им не следует.
* Датчик используется для снижения целевой температуры (например, если окно открыто); опционально с функцией SensorDelay.
* Интерфейс для адаптера Feiertag или любого другого адаптера для определения государственных праздников. Государственным праздником может быть обычный день или, например, воскресенье. (настройка администратора)
* Ручное регулирование температуры на определенное время
* заданный период нагрева
* Перехват управления изменениями от термостата (опционально)
* Поддерживается визуализация из [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis). Спасибо!
* Поддержка Vis-2 с помощью [vis-2-widgets-weather-and-heating](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating)

[Часто задаваемые вопросы](doc/FAQ.md)

## Установка
## Настройки
### Основной
* Функция = Функция, используемая для определения термостатов, исполнительных механизмов и датчиков в каждой комнате. Это один из перечислений системы.
* Путь к адаптеру Feiertag = если вы хотите использовать адаптер Feiertag для автоматического определения государственного праздника на сегодня, укажите здесь путь (например, feiertage.0)
* Используемый датчик = если у вас установлены оконные датчики и вы хотите понижать целевую температуру при открытом окне, включите эту опцию.
* Используемые актуаторы = если вы хотите управлять актуаторами напрямую с адаптера. На всякий случай, если нет прямого соединения между термостатом и актуатором.
* Использовать исполнительные механизмы, если нет периода обогрева = действительно только с исполнительными механизмами. Определяет, как настраиваются исполнительные механизмы, когда период обогрева неактивен.
* Используйте актуаторы, если термостат недоступен = действительно только с актуаторами. Если у вас есть комнаты без термостата, но с отопительным актуатором, вы можете включать или выключать их постоянно.

### Профиль
* Типы профиля: поддерживаются три различных типа профиля (понедельник - воскресенье, понедельник - пятница и суббота/воскресенье или каждый день).
* Количество профилей = если вам нужно больше, увеличьте это значение для каждого профиля. Затем вы сможете выбрать, какой профиль будет использоваться.
* Количество периодов = укажите, сколько ежедневных интервалов с разной температурой вам нужно. Чем больше вы зададите, тем больше точек данных будет создано. Лучше использовать небольшое значение (например, 5).
* «В праздничные дни, например, в воскресенье, если вы хотите установить целевую температуру в праздничные дни, например, в воскресенье, включите эту опцию. В противном случае настройки для праздничных дней остаются такими же, как и в обычные дни».
* HeatingPeriod = дата начала и окончания отопительного периода. Используется для установки параметра "HeatingPeriodActive".

### Устройства
* Сначала выберите комнату и включите её.
* Ниже вы найдете все настройки комнаты

### Конфигурация помещения
* Здесь вы можете проверить и установить идентификаторы объектов для термостатов, исполнительных механизмов и датчиков.
* Вы можете вручную добавлять новые термостаты, исполнительные механизмы или датчики. Просто нажмите кнопку «+». После этого появится пустая строка, которую необходимо заполнить. Кнопка «Редактировать» открывает список доступных устройств в системе.
* термостаты:

** Необходимо указать имя, OID целевого значения температуры и OID текущей температуры.

* исполнительные механизмы

** Необходимо указать название и OID штата**

* датчики

** Необходимо указать имя и OID для текущего состояния**

## Точки данных
| Имя пользователя | Описание |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | если выключено, профили использоваться не будут |
| Текущий профиль | выберите текущий профиль (начиная с 1, это означает, что для профиля 1 используются точки данных из heatingcontrol.0.Profiles.0) |
| LastProgramRun | показывает время последнего запуска адаптера |

### Понижение/повышение температуры
| Название DP | Описание | Целевая температура для относительного снижения | Целевая температура для абсолютного снижения |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent | повысить температуру, потому что гости хотят потеплее | увеличить текущую температуру профиля на Profiles.0.room.relative.GuestIncrease | установить целевое значение на Profiles.0.room.absolute.GuestIncrease |
| PartyNow | снизить температуру, потому что становится жарко | снизить текущую температуру профиля на Profiles.0.room.relative.PartyDecrease | установить целевое значение на Profiles.0.room.absolute.PartyDecrease |
| Присутствует | если мы присутствуем, уменьшить температуру | уменьшить текущую температуру профиля на Profiles.0.room.relative.AbsentDecrease | установить целевое значение на Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | Мы отсутствуем, поэтому уменьшите температуру также в выходные дни | Уменьшите текущую температуру профиля на Profiles.0.room.relative.VacationAbsentDecrease | Установите целевое значение на Profiles.0.room.absolute.VacationAbsentDecrease |
| FireplaceModeActive | Снижение температуры, поскольку вы используете камин, будет | Снижение текущей температуры профиля на Profiles.0.room.relative.FireplaceModeDecrease | Установить целевое значение на Profiles.0.room.absolute.FireplaceModeDecrease |

| | автоматически сбрасывается в регулируемое время

* Данные доступны только в том случае, если установлен параметр "Общие настройки профиля, понижение температуры".
* В обоих сценариях используется только одно опускание (в предыдущей версии адаптера можно было использовать более одного обезжиривающего средства).
* В сценарии абсолютного обезжиривания используются только целевые значения, не равные 0°C. Если в определенном помещении понижение температуры не требуется, поддерживайте значения понижения на уровне 0°C.

### Без периода отопления
Есть три варианта.

* Фиксированная температура для каждого помещения

Если выбран этот параметр, для каждой комнаты в дереве объектов появится новая точка данных. Здесь можно установить фиксированную целевую температуру, которая будет задана, когда период отопления не активен.

* Установите фиксированную температуру во всех комнатах

При использовании этой опции вы можете установить одну целевую температуру для каждой комнаты, когда режим отопления не активирован.

* ничего

При использовании этой опции на термостат ничего не будет отправляться, если не активен отопительный период. Целевая температура останется такой же, как и при последней установке целевой температуры, когда отопительный период еще был активен.
В этом случае, если вы используете исполнительные механизмы от адаптера, у вас есть возможность определить, как должны быть настроены исполнительные механизмы (выкл., включен. или оставлены как есть).

другие
* HolidayPresent / PublicHolidyToday

Если вы включите в административной панели параметры «Праздничный день, например, воскресенье» или «Государственный праздник, например, воскресенье», то профиль для воскресенья будет использоваться, когда адаптер получит информацию о том, что сегодня государственный праздник или вы находитесь дома в отпуске.

### Окно открыто
Если функция "Использовать датчики" активна и датчик(и) для помещения настроен(ы), то

* Снижение текущей температуры профиля при открытом окне (true) на значение Profiles.0.room.WindowOpenDecrease, если настроено относительное снижение.
* Установите целевое значение Profiles.0.room.absolute.WindowOpenDecrease, когда окно открыто (true), если настроено абсолютное уменьшение.

При желании можно использовать задержку. Если окно открыто лишь на короткое время, задержка срабатывания датчика может предотвратить уменьшение окна и его возвращение в нормальное состояние за очень короткое время.

## Поддержка ical
Вы можете использовать свой календарь или любую другую точку данных для изменения точек данных в адаптере.

Просто настройте события из iCal или других точек данных в административной панели. Поддерживаются следующие типы данных:

| точка данных | описание |-------------------------------------|---------------------------------------------------------------------------- |heatingcontrol.0.Present | установите значение true (в случае логического значения) или число больше значения limit (в случае числового значения) |heatingcontrol.0.HolidayPresent | установите значение true, когда вы дома на отдыхе |heatingcontrol.0.VacationAbsent | установите значение true, когда вас нет дома на отдыхе |heatingcontrol.0.GuestsPresent | установите значение true (в случае логического значения) или число больше значения limit (в случае числового значения) |heatingcontrol.0.PartyNow | установите значение true (в случае логического значения) или число больше значения limit (в случае числового значения)

Подсказка: используя числовые данные, вы можете подсчитать, сколько человек находится в доме, а затем решить, например, хватит ли нам еды для вечеринки...

## Использование изменений от термостата
Многие пользователи просили добавить возможность переноса изменений с термостата на адаптер. Теперь реализованы четыре варианта:

| опция | описание |--------------------------|--------------------------------------------------------------------------------------- | нет | изменения температуры, вносимые термостатом, игнорируются | как переопределение | изменения температуры, вносимые термостатом, принимаются как переопределение; время переопределения необходимо установить заранее в heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime | | если время переопределения не установлено, то переопределение не выполняется | как новая настройка профиля | изменения температуры, вносимые термостатом, принимаются в качестве целевой температуры для текущего периода профиля | до следующей точки профиля | изменения температуры, вносимые термостатом, принимаются в качестве целевой температуры до следующей точки профиля. Это ручной режим, поэтому используются только оконные датчики. Все остальные | | увеличения/уменьшения игнорируются. В каждой комнате есть точка данных для отключения ручного режима перед достижением следующей точки профиля.

## Продление действия переопределения при изменении температуры
Стандартное поведение при использовании режима принудительного изменения температуры заключается в том, что при изменении температуры время принудительного изменения не изменяется. Например, если вы начинаете режим принудительного изменения температуры с 25°C на 20 минут, а через 15 минут меняете температуру на 28°C, то 28°C используется только в течение последних 5 минут. При таком варианте режим принудительного изменения температуры перезапускается каждый раз, когда изменяется температура.
В приведенном выше примере 28°C будет использоваться в течение 20 минут, что приведет к 15 минутам с 25°C и 20 минутам с 28°C.

## Режим переопределения
В административной панели для всех комнат доступны два настраиваемых режима.

* управляется по таймеру

Это хорошо известная функция, которая использует температуру и продолжительность. Заданная температура используется в течение указанного времени, после чего целевая температура возвращается к исходному значению в автоматическом режиме.

* до следующей точки профиля

Это новая функция. Здесь мы можем использовать переопределение температуры до следующей точки профиля. Длительность будет игнорироваться, но должна быть ненулевой!

## Термостат обрабатывает состояние "окно открыто"
Некоторые термостаты могут самостоятельно обрабатывать состояние «окно открыто». В таких случаях настраивается прямая связь между датчиком окна и термостатом, и термостат самостоятельно снижает целевую температуру при открытии окна.
В сочетании с опцией «использование изменений от термостата» / «до следующей точки профиля» это приведет к неожиданному ручному режиму. В этой ситуации пониженная температура будет использоваться до следующей точки профиля.
Но адаптер может обрабатывать такое поведение. Необходимо включить опцию «Термостат обрабатывает состояние «окно открыто»», а также можно настроить датчики окна в адаптере.
При открытии окна адаптер ожидает максимум 3 секунды новой целевой температуры от термостата. Если за это время он получает новую целевую температуру, она будет использоваться в качестве пониженной абсолютной температуры. В этом случае статус будет «автоматическое открытие окна». Как только окно закрывается, статус возвращается к автоматическому, и термостат устанавливает исходную целевую температуру. **Внимание**, в этом случае не используйте задержку открытия датчика. Если вы ее используете, событие открытия окна появится после получения целевой температуры от термостата. В итоге это переходит в ручной режим.

## Период копирования и профиль копирования
`` heatingcontrol.0.Profiles.1.CopyProfile heatingcontrol.0.Profiles.1.Room.CopyProfile ``

и

``heatcontrol.0.Profiles.1.Küche.Fri.CopyPeriods ``

Функция CopyProfile копирует все содержимое профиля, в котором нажата кнопка, в следующий профиль. В приведенном выше примере кнопка находится в профиле 1. Кнопка копирует все содержимое профиля 1 в профиль 2.
Если вы хотите скопировать только одну комнату, используйте кнопку в определенной комнате.

Функция CopyPeriods доступна для каждого дня или для каждого помещения с понедельника по пятницу. Это позволяет скопировать периоды в следующий раздел. В приведенном выше примере функция CopyPeriods копирует все периоды с пятницы в кухонном помещении в периоды субботы в кухонном помещении.
Таким образом, вы можете, например, в профиле «каждый день отдельно» скопировать периоды с понедельника по воскресенье…

## Режим технического обслуживания
сделать

## Режим камина
сделать

## Обработка исполнительных механизмов
сделать

Переключение между линейным и линейным режимами с гистерезисом

Опишите две новые точки данных: heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset и heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset.

## Расширенная обработка исполнительных механизмов
Проверяет, правильно ли установлено значение и подтверждено ли его наличие, в противном случае повторяет попытку...

сделать

## EVU Sperrzeit / PowerInterruption
Когда истекает время блокировки, установленное поставщиком электроэнергии, все исполнительные механизмы отключаются и снова включаются по окончании времени блокировки.
Статус переходит в "EVU Sperrzeit" / "PowerInterruption". Цель: целенаправленное отключение и повторное включение электрических нагревателей для минимизации нагрузки на контакторы и пусковых токов. Конфигурация: время начала/окончания времени блокировки EVU, можно настроить несколько периодов.

## Проблемы и запросы на добавление новых функций
* Если вы обнаружили какие-либо ошибки или у вас есть пожелания по улучшению этого адаптера, пожалуйста, создайте заявку в разделе проблем GitHub по адресу [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Любые отзывы приветствуются и помогут улучшить этот адаптер.

## Известные проблемы
### Адаптер с Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 – 10fach, 230 В
Похоже, что HmIP-FAL230-C10 нельзя использовать напрямую в качестве исполнительного механизма в сочетании с этим адаптером. Если использовать HmIP-FAL230-C10 вместе с термостатами Homematic, всё должно работать.
См. также [Форум](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### Функция открытия окна термостатами HM
Термостаты HM имеют функцию открытия окна в двух вариантах. С одной стороны, это определение падения температуры, а с другой — использование оконного датчика.
Эта функция приводит к переключению адаптера в ручной режим при открытии окна. В идеале эту функцию следует отключить, чтобы она не мешала работе адаптера.
Если термостат использует информацию от оконного датчика, то следует включить опцию «термостат обрабатывает открытие окна».

Когда адаптер выходит из строя или возникает другая ошибка в коде, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.1 (2025-12-30)
**not yet recommended for production use. beta test only**
* (René) bug fix: added missing OID configurations for public holiday and holidays at home
* (René) bug fix: 'function' for device search will be saved now
* (René) preselect 'function' and 'selected room' if nothing was selected / stored before

### 3.0.0 (2025-12-29)
**not yet recommended for production use. beta test only**
* (René) admin overworked completely with react and vite. **ATTENTION**: breaking changes in admin settings !!!
		Rooms can no longer be created manually. Only rooms that are generally configured in ioBrooker are used.
		The adapter attempts to migrate the configuration, but this cannot be guaranteed in any case.
* (René) csv-logging: path changed, one log per room now
* (arteck) always enable CopyProfile buttons
* (arteck) Refactor SetVis function to improve readability and maintainability

### 2.12.19 (2025-11-02)
* (René) csv-logging added (optionally), will be used in later enhancements

### 2.12.18 (2025-10-26)
* (René) bug fix sentry

### 2.12.17 (2025-10-26)
* (René) changes requested by adapter checker

### 2.12.16 (2025-10-04)
* (René) dependencies updated
* (René) bug fix see issue #682: HmIP-eTRV-2 not autodetected
* (René) changes requested by adapter checker

### 2.12.15 (2025-06-29)
* (René) HmIP-eTRV-B-2 R4M added to autodetect
* (René) new testing

### 2.12.14 (2025-02-27)
* (René) see issue #635: initial values (-99) not to write to object 
* (René) changes requested by adapter checker
* (René) dependencies updated

### 2.12.13 (2024-11-20)
* (René) see issue #607: minimum length of telegram user reduced to one char

### 2.12.12 (2024-11-20)
* (René) see issue #422: bug fix window open/close handling
* (René) update dependencies

### 2.12.11 (2024-10-21)
* (René) see issue #611: test with nodejs@22
* (René) see issue #617: bug fix: TemperaturOverrideRemainingTime is not correct after Override interruption

### 2.12.10 (2024-08-18)
* (René) update dependencies
* (René) adaption for new Vis-2 widgets (Weather / Heating)
* (René) bug fixes based on adapter checker recommendation

### 2.12.8 (2024-06-05)
* (René) bug fix heating period: calculation of cron job string fixed

### 2.12.7 (2024-05-28)
* (René) see issue #561: change of dependencies

### 2.12.5 (2024-03-01)
* (René) see issue #492: cron jobs recalculation is necessary after reboot if VacationAtHome and PublicHoliday is active
* (René) create cron job for PowerInterruption only if feature is active
* (René) bug fix: with cron 3.x status log of cron jobs were wrong

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

Copyright (c) 2019-2025 René G. <info@rg-engineering.eu>

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