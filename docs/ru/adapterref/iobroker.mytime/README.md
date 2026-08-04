---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: 4Mu8KDFuLs2kkZws2uBzckf1zjGQjECngtEa+mYUjWs=
---
![Логотип](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Количество установок](https://iobroker.live/badges/mytime-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mytime-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mytime.png?downloads=true)

# IoBroker.mytime
**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

## ВАЖНЫЙ
Действительна только англоязычная документация, поскольку автоматический перевод затрагивает разделы, которые переводиться не должны.

## Адаптер mytime для ioBroker
Этот адаптер обрабатывает время (например, обратный отсчет и т. д.).
Функциональность обратного отсчета предоставляет точки данных, которые можно использовать для управления обратным отсчетом (например, в скрипте). Адаптер также включает в себя несколько виджетов для визуализации этих обратных отсчетов. Временные ряды можно использовать для создания сложных временных рядов, в которых точки данных срабатывают.

### Конфигурация
#### Обратный отсчет
В диалоговом окне конфигурации на вкладке «Обратный отсчет» вы можете создать новый обратный отсчет, например, «тест», установить таймер на 10 секунд и импортировать следующие виджеты.
Точки данных предварительно настроены для обратного отсчета с именем «тест».

##### Таймер остановки поведения
После того, как таймер подаст сигнал на остановку, отсчет времени сбросится до значения, установленного таймером.

##### Прекратите поведение, равное нулю
После того, как обратный отсчет получит сигнал об остановке, он останется на отметке 0.

##### Остановить повторный запуск
По истечении времени таймер автоматически перезапустится.

#### Временные ряды
В диалоговом окне конфигурации, во вкладке «Временные ряды», можно создать новый временной ряд с одним или несколькими временными правилами. Для каждого временного правила можно определить различные параметры. Каждый временной ряд создает отдельную точку данных, которая срабатывает при вычисленных временных событиях.
Временные события вычисляются в реальном времени. Однако используемая библиотека rrule пока не идеальна во всех комбинациях параметров.
Это показывает, что при некоторых комбинациях страница зацикливается.
Демонстрационная страница <http://jakubroztocil.github.io/rrule/> также может использоваться для экспериментов.
Помимо добавления временного правила, можно добавить правило исключения временных событий, добавить отдельные временные события, а также исключить отдельные временные события.

В дополнение к функциональности rrule, теперь можно также динамически рассчитывать время для различных фаз солнца и луны.
Этот расчет выполняется только в том случае, если временной интервал составляет не менее суток (а не часов или минут).

##### События, связанные со временем, определяемым Солнцем
- Астрономический Рассвет
- amateurDawn
- nauticalDawn
- blueHourDawnStart
- civilDawn
- blueHourDawnEnd
- goldenHourDawnStart
- восход солнцаСтарт
- восход солнцаКонец
- goldenHourDawnEnd
- solarNoon
- goldenHourDuskStart
- закатСтарт
- закатКонец
- goldenHourDuskEnd
- blueHourDuskStart
- civilDusk
- blueHourDuskEnd
- nauticalDusk
- amateurDusk
- астрономическийСумерки
- надир

##### События, связанные со временем, обусловленным Луной
- восход луны
- лунный свет
- закат луны

### Использование
#### Использование временных рядов
##### Доступные точки данных временного ряда
После настройки нового временного ряда адаптер создает следующие точки данных:

| точка данных | описание |
| --------- | ------------------------------------------------------------ |
| действие | фактическое состояние временного ряда. Возможные значения: остановка, запуск |
| команда | нет функции банкомата |

##### Доступные состояния действий
| действие | описание |
| ------ | --------------------------------------------------------------------------------------------- |
| стоп | В данный момент нет активных событий по времени |
| Запуск | Было запущено событие по времени. По истечении заданного времени точка данных изменяется, чтобы остановить |

#### Использование обратного отсчета
##### Доступные точки данных обратного отсчета
После настройки нового таймера обратного отсчета адаптер создает следующие точки данных:

| точка данных | описание |
| --------- | ---------------------------------------------------------------------- |
| действие | текущее состояние обратного отсчета. Возможные значения: stop, run, pause, end |
| cmd | Точка данных для команд. Возможные команды описаны ниже |
| конфигурация | используйте соответствующую конфигурацию для таймера обратного отсчета.              |
| начало | точка данных для времени начала в миллисекундах |
| конец | точка данных для времени окончания в миллисекундах |
| таймер | точка данных для общего заданного времени в миллисекундах |

##### Доступные состояния действий обратного отсчета
| действие | описание |
| ------ | ----------------------------------------------------------------------------------------------------- |
| Стоп | Обратный отсчет остановлен, время начала и окончания установлено на 0 |
| Запуск | Обратный отсчет продолжается. Если обратный отсчет достигнет времени окончания, действие переключается на завершение. |
| Пауза | Обратный отсчет находится в режиме паузы. Время окончания установлено на время паузы |
| конец | Обратный отсчет завершен. Это состояние можно использовать в качестве триггера для дальнейших действий (звук, всплывающие окна и т. д.) |

##### Доступные команды для точки данных cmd
| команда | пример | описание |
| --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `+value` | `+1:10` | добавляет время к настройке обратного отсчета. Эта настройка будет учтена при следующем запуске |
| `-value` | `-1:2:3` | вычитает время из обратного отсчета. Эта настройка будет учтена при следующем запуске |
| `-!value` | `-!1:2:3` | оператор типа - и сократить таймер выполнения |
| `=value` | `=5:00` | установить таймер обратного отсчета на это время. |
| `=!value` | `=!5:00` | оператор = и установить таймер на заданное время |
| `#ISO-Date` | `#2025-01-01T10:00:00` | Установите таймер обратного отсчета на целевое время. Время должно быть отформатировано как ISO-Datestring |
| `#!ISO-Date` | `#!2025-01-01T10:00:00` | подобно оператору # и установке таймера на заданное целевое время |
| `$Time` | `$20:15` | Установите таймер обратного отсчета на целевое время. Если время раньше текущего, устанавливается следующий день. |
| `$!Time` | `$!20:15` | подобно оператору $ и установке таймера на заданное целевое время |
| `start` | `start` | начинает обратный отсчет |
| `stop` | `stop` | останавливает обратный отсчет. Время обратного отсчета сбрасывается до заданного значения |
| `pause` | `pause` | приостанавливает обратный отсчет |
| `end` | `end` | останавливает обратный отсчет. Обратный отсчет установлен на 0 |
| `reset` | `reset` | сбросить таймер в состояние конфигурации |
| `setstop2timer` | `setstop2timer` | установить конфигурацию поведения остановки на таймер |
| `setstop2zero` | `setstop2zero` | установить конфигурацию поведения остановки на ноль |
| `setstop2rerun` | `setstop2rerun` | установить конфигурацию поведения остановки для повторного запуска |
| `save` | `save` | Сохраните конфигурацию, определенную в datapoints, в конфигурацию iobroker; iobroker автоматически перезапустит адаптер после сохранения. |
| `save` | `save` | Сохраните конфигурацию, определенную в datapoints, в конфигурацию iobroker. После сохранения iobroker автоматически перезапустит адаптер. |

##### Формат значения для установки таймера обратного отсчета
Вы можете установить обратный отсчет на неограниченное время.
Значение задается в формате [дни:[часы:[минуты:[секунды]]]]. Дни, часы и минуты являются необязательными.
Если вы хотите установить таймер на один день, вам нужно указать часы, минуты и секунды, при этом не обязательно соблюдать стандартные диапазоны значений (например, часы 0-24).
Вы также можете установить 48 часов.
При желании вы можете установить нерегулярные обозначения времени. Время суммируется отдельно.

**Примеры:**

| настройка | описание |
| --------- | ------------------------------------------- |
| 1:0:0:0 | устанавливает/добавляет/вычитает 1 день из таймера |
| 2:0:0 | устанавливает/добавляет/вычитает 2 часа из таймера |
| 3:0 | устанавливает/добавляет/вычитает 3 минуты к таймеру |
| 120 | устанавливает/добавляет/вычитает 120 секунд из таймера |
| 48:0:0 | устанавливает/добавляет/вычитает 48 часов к таймеру |
| 48:75:120 | устанавливает/добавляет/вычитает таймер |

##### Формат даты и времени для форматирования вывода в виджете
Доступны следующие заполнители:

| заполнитель | описание |
| ----------- | --------------------------------------------------------------- |
| ГГГГ | лет в 4 цифрах |
| ГГ | лет в 2 цифрах |
| w | месяцев без ведущих нулей (не вместе с месяцами) |
| ww | месяцы с ведущими нулями (не вместе с месяцами) |
| M | месяцев без ведущих нулей (не вместе с неделями) |
| MM | месяцы с ведущими нулями (не вместе с неделями) |
| д | дней без ведущих нулей |
| дд | дней с ведущими нулями |
| H | часов без ведущих нулей |
| ЧЧ | часы с ведущими нулями |
| м | минут без ведущих нулей |
| мм | минут с ведущими нулями |
| с | секунд без ведущих нулей |
| сс | секунд с ведущими нулями |
| \ | Символ экранирования, если вы хотите использовать заполнитель в выводе |

При взятии нескольких частей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

**Примеры:**

Все приведенные ниже примеры с таймером обратного отсчета 1:2:3:4

| шаблон | пример | результат |
| ------------------ | --------------- | ------------------------------------------------ |
| d\d Hh m\m s\s | 1d 2h 3m 4s | с экранирующими символами и без ведущих нулей |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s | с экранирующими символами и с ведущими нулями |
| сс\с | 93784с | всего несколько секунд |
| дд\д ЧЧ\ч | 01д 02ч | только дни и часы |
| ЧЧ мм | 26 ч 03м | только часы и минуты |

### Виджеты
Начиная с версии 1.2.0, виджеты должны быть совместимы с vis1 и vis2.

#### Виджет «Обратный отсчет»
![Виджет обратного отсчета простой](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-countdown.png)

Виджет обратного отсчета для вывода в текстовом формате.
Вывод можно детально настроить.

##### Атрибуты виджета
| Атрибут | Описание |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | Точка данных таймера обратного отсчета. Можно использовать любую точку данных |
| `HTML-Prepend` | Этот текст или HTML-код добавляется в начало вывода виджета |
| `HTML-Append` | Этот текст или HTML-код добавляется к выводу виджета |
| `HTML-добавление` | Этот текст или HTML-код добавляется к выводу виджета |

##### Пример кода виджета
Виджеты предварительно настроены для обратного отсчета под названием test.
Существуют 2 отдельные версии для vis1 и vis2.

![Пример](../../../en/adapterref/iobroker.mytime/admin/mytime-example1.png)

**ВИС1:**

<details><summary>Подробности</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;g_fixed&quot;:false,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:false,&quot;g_css_background&quot;:false,&quot;g_css_shadow_padding&quot;:false,&quot;g_css_border&quot;:false,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;format&quot;:&quot;d H ms&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;771px&quot;,&quot;top&quot;:&quot;143px&quot;,&quot;width&quot;:&quot;151px&quot;,&quot;height&quot;:&quot;16px&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;+10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;+10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;-10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;-10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;=10&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;=10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;start&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;start&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;pause&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;pause&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;stop&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;stop&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;}]</code></pre></details>

**VIS2:**

<details><summary>Подробности</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;pause&quot;,&quot;value&quot;:&quot;pause&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000001&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;start&quot;,&quot;value&quot;:&quot;start&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000002&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;stop&quot;,&quot;value&quot;:&quot;stop&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000003&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+10&quot;,&quot;value&quot;:&quot;+10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000004&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=100&quot;,&quot;value&quot;:&quot;=100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000005&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-10&quot;,&quot;value&quot;:&quot;-10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000006&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+!10&quot;,&quot;value&quot;:&quot;+!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000007&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=!100&quot;,&quot;value&quot;:&quot;=!100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000008&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-!10&quot;,&quot;value&quot;:&quot;-!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000009&quot;},{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;countdown_format&quot;:&quot;dd\\d HH\\h mm\\m ss\\s&quot;,&quot;g_common&quot;:true,&quot;g_css_border&quot;:true,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;g_css_font_text&quot;:true},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;375.00001525878906px&quot;,&quot;width&quot;:&quot;182px&quot;,&quot;height&quot;:&quot;24px&quot;,&quot;border-width&quot;:&quot;0&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;rgba(237,235,243,1)&quot;,&quot;text-align&quot;:&quot;center&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;,&quot;_id&quot;:&quot;i000010&quot;}]</code></pre></details>

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно в виде селектора CSS-класса:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Виджет Обратный обратный отсчет простой
![Виджет обратного отсчета](../../../en/adapterref/iobroker.mytime/admin/mytime-plainreverse-countdown.png)

Виджет, отображающий прошедшее время с заданного момента времени.

##### Свойства виджета обратного отсчета plain
| Точка данных | Описание |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ISO datetime` | Строка типа DateTime, содержащая время начала. Выражение должно быть интерпретируемым функцией JavaScript `new Date(expression)`. См. также <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse>. Пример: 2022-01-10 23:12 или 2022-01-104T23:12:00.000Z |
| `HTML-Prepend` | Этот текст или HTML-код добавляется в начало вывода виджета |
| `HTML-Append` | Этот текст или HTML-код добавляется к выводу виджета |
| `HTML-добавление` | Этот текст или HTML-код добавляется к выводу виджета |

#### Круг обратного отсчета виджета
![Круг обратного отсчета (виджет)](../../../en/adapterref/iobroker.mytime/admin/mytime-circle-countdown.png)

Виджет обратного отсчета в виде кольца/круга.

##### Свойства виджета «Круг обратного отсчета»
| Атрибут | Описание |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | Точка данных таймера обратного отсчета. |
| `Format` | Форматирует выходные данные таймера. По умолчанию — мм:сс. Подробности см. в главе [Формат даты и времени](#format-of-the-datetime-to-format-the-output-in-the-widget). ReversevSetting — параметр для увеличения или уменьшения кольца/круга |
| `reverse` | Ширина кольца или круга. |
| `partring` | Выбранное кольцо самого большого размера отображается пропорционально, а не целиком. |
| `Width` | Ширина кольца или круга. |
| `Ring gap` | Зазор в пикселях между кольцами |
| `Ring Caps` | Варианты крепления концов кольца/круга: круглые или прямые |
| `background` | Цвет фона кольца/круга |
| `foreground` | Цвет переднего плана кольца/круга |
| `countdown_color_second` | Цвет переднего плана второго кольца/круга |
| `countdown_color_hour` | Цвет переднего плана часового кольца/круга |
| `countdown_color_day` | Цвет переднего плана кольца/круга дня |
| `countdown_color_week` | Цвет переднего плана кольца/круга недели |
| `countdown_color_month` | Цвет переднего плана кольца/круга месяца |
| `countdown_color_year` | Цвет переднего плана второго кольца/круга |
| `showsec` | Показать секундную ленту |
| `showmin` | Показать звонок минут |
| `showhrs` | Показать звонок минут |
| `showday` | Показать кольцо дней |
| `showmonth` | Показать кольцо месяцев (не вместе с неделями) |
| `showweek` | Показать кольцо недель (не вместе с месяцами) |
| `showyear` | Показать кольцо лет |
| `showyear` | Показать кольцо лет |

При выборе нескольких деталей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно в виде селектора CSS-класса:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Виджет обратного отсчета FlipClock
![Виджет обратного отсчета FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-countdown.png)

Виджет обратного отсчета в стиле табло аэропорта.
Поддерживается только 100 дней - 1 секунда.
Индивидуальный перевод в выбранные единицы измерения здесь не выполняется.

##### Свойства виджета Countdown FlipClock
| Атрибут | Описание |
| --------------------- | --------------------------------------------- |
| `Object ID` | Точка данных таймера обратного отсчета. |
| `showmin` | Отображает минутный интервал. |
| `showhrs` | Отображает часовую часть. |
| `showday` | Отображает время суток. |
| `color` | Цвет таймера обратного отсчета |
| `background_color` | Цвет фона таймера обратного отсчета |
| `countdown_dot_color` | Цвет точек таймера обратного отсчета |
| `countdown_dot_color` | Цвет точек таймера обратного отсчета |

При выборе нескольких деталей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

Размер отображаемого изображения можно контролировать с помощью параметра CSS `font-size`.

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно в виде селектора CSS-класса:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Виджет обратного отсчета NixieClock
![Виджет обратного отсчета NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-countdown.png)

Виджет обратного отсчета в стиле газоразрядных индикаторов/светодиодов.

##### Свойства виджета Countdown NixieClock
| Атрибут | Описание |
| -------------------------- | ---------------------------------------------------- |
| Идентификатор объекта | Точка данных таймера обратного отсчета. |
| countdown_showsec | Отображает секундную часть. |
| countdown_showmin | Отображает минутный интервал. |
| countdown_showhrs | Отображает часы. |
| countdown_showday | Отображает время суток. |
| countdown_showmonth | Отображает месячную часть (не вместе с неделями) |
| countdown_showweek | Отображает временной отрезок недели (не вместе с месяцами) |
| countdown_showyear | Отображает часть года. |
| countdown_color_active | Цвет таймера обратного отсчета |
| countdown_color_inactive | Цвет неактивных цифр |
| countdown_opacity_inactive | Прозрачность цвета неактивных цифр |
| countdown_glowcolor | Цвет свечения вокруг этих цифр газоразрядных индикаторов |

При выборе нескольких деталей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

##### Советы
###### Верхние/нижние поля
Используемый шрифт Lato слегка наклонен вниз, что создает неравномерные верхние и нижние поля. Это можно отрегулировать с помощью высоты и отрицательного верхнего поля.
Виджет использует высоту 1em. Высоту можно задать непосредственно в свойствах виджета.

Для отрицательного поля необходимо создать CSS-класс.

```css
#w00000 .cdclock {
    margin-top: -5px;
}
```

###### Размер виджета
Размер отображаемого изображения можно контролировать с помощью параметра CSS `font-size`.

###### Центрирование часов с газоразрядными индикаторами
Для центрирования часов требуется дополнительный CSS-класс, поскольку соответствующие параметры нельзя настроить в параметрах виджета:

```css
#w00000 {
    display: flex;
    justify-content: center;
}
```

#### Виджет «Часы» простой
![Виджет Часы простой](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-clock.png)

Настраиваемый виджет для отображения текущей даты и времени в виде обычного текста.
Время может быть получено либо из клиентского браузера, либо из синхронизированного времени сервера ioBroker.

##### Свойства виджета «Часы»
| Атрибут | Описание |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Выбирает `client` для времени браузера или `server` для синхронизированного времени сервера ioBroker. |
| `clock_html_prepend` | Текст или HTML, вставленный перед отформатированными датой и временем. |
| `clock_html_append` | Текст или HTML, добавляемый после отформатированных даты и времени. |
| `clock_html_append` | Текст или HTML, добавляемый после отформатированных даты и времени. |

В `clock_format` можно использовать следующие заполнители:

| Заполнитель | Описание |
| ----------- | ----------------------------------- |
| `YYYY` | Четырехзначный год |
| `MM` / `M` | Месяц с ведущим нулем / без него |
| `DD` / `D` | День с ведущим нулем / без него |
| `HH` / `H` | Часы с ведущим нулем / без него |
| `mm` / `m` | Минуты с ведущим нулем / без него |
| `ss` / `s` | Секунды с ведущим нулем / без него |
| `ss` / `s` | Секунды с ведущим нулем / без него |

Размер отображаемого изображения можно контролировать с помощью параметра CSS `font-size`.

#### Виджет часов FlipClock
![Widget Clock FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-clock.png)

Настраиваемый виджет даты и времени в стиле интерактивной доски аэропорта.
Каждый компонент даты и времени можно отображать или скрывать по отдельности.

##### Свойства виджета Clock FlipClock
| Атрибут | Описание |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Выбирает `client` для времени браузера или `server` для синхронизированного времени сервера ioBroker. |
| `clock_showyear` | Отображает двузначную составляющую года. |
| `clock_showmonth` | Отображает компонент месяца. |
| `clock_showday` | Отображает компонент дня. |
| `clock_showhours` | Отображает компонент часов. |
| `clock_showminutes` | Отображает компонент минут. |
| `clock_showseconds` | Отображает компонент секунд. |
| `clock_color` | Задает цвет цифр. |
| `clock_background_color` | Задает цвет фона карточек-перевертышей. |
| `clock_dot_color` | Задает цвет разделителей между компонентами. |
| `clock_dot_color` | Задает цвет разделителей между компонентами. |

Компоненты времени всегда отображаются после выбранных компонентов даты в порядке часы, минуты, секунды.
Размер отображения можно контролировать с помощью параметра CSS `font-size`.

#### Виджет часов NixieClock
![Widget Clock NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-clock.png)

Настраиваемый виджет даты и времени в стиле газоразрядных индикаторов/светодиодов.
Каждый компонент даты и времени может отображаться или скрываться по отдельности.

##### Свойства виджета часов NixieClock
| Атрибут | Описание |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Выбирает `client` для времени браузера или `server` для синхронизированного времени сервера ioBroker. |
| `clock_showyear` | Отображает двузначную составляющую года. |
| `clock_showmonth` | Отображает компонент месяца. |
| `clock_showday` | Отображает компонент дня. |
| `clock_showhours` | Отображает компонент часов. |
| `clock_showminutes` | Отображает компонент минут. |
| `clock_showseconds` | Отображает компонент секунд. |
| `clock_color_active` | Задает цвет активных цифр газоразрядных индикаторов. |
| `clock_color_inactive` | Задает цвет неактивных цифр газоразрядных индикаторов. |
| `clock_opacity_inactive` | Задает прозрачность неактивных цифр. |
| `clock_glowcolor` | Задает цвет подсветки вокруг активных цифр. |
| `clock_glowcolor` | Задает цвет свечения вокруг активных цифр. |

Компоненты времени всегда отображаются после выбранных компонентов даты в порядке часы, минуты, секунды.
Размер отображения можно контролировать с помощью параметра CSS `font-size`.

#### Виджет Wordclock
![Виджет Wordclock](../../../en/adapterref/iobroker.mytime/admin/mytime-wordclock.png)

Виджет для отображения текстовых часов с множеством опций.

##### Свойства виджета Wordclock
| Точка данных | Описание |
| ------------------- | -------------------------------------------------------- |
| `language` | Доступны различные языки для отображения текста на часах |
| `letterDeactivated` | Цвет обычных букв |
| `wordclockMargin` | Зазор между тактовым сигналом и светодиодами |
| `withMinutes` | Отобразить минутные светодиоды в углу словесных часов |
| `minuteSize` | Размер светодиодов в пикселях в минуту |
| `minuteColor` | цвет минутного светодиода |
| `withSeconds` | Отображение секундных светодиодов на часах |
| `secondSize` | Размер светодиодов в пикселях в секундах |
| `secondColor` | цвет светодиода секунд |
| `timezone` | Отображается время выбранного часового пояса |
| `часовой пояс` | Отображается время выбранного часового пояса |

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно в виде селектора CSS-класса:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

## Todo
- 7-сегментный дисплей
- скользящие числа
- настраиваемые шрифты
- ts: правила исключения по времени (временной диапазон, отдельные даты)
- ~~добавить часовой пояс для Wordclock~~
- ~~таймер Wordclock~~
- ~~планировщик по времени: планирование отдельных дат/времени и повторяющихся событий, как в Outlook~~
- ~~В стиле Никси~~
- ~~табло с информацией (табло в аэропорту)~~
- ~~новая команда для установки только целевого времени без даты~~
- ~~виджет кругового обратного отсчета с возможностью отключения текста обратного отсчета
- ~~Разделитель групп '.' в имени~~
- ~~Полярные часы~~
- ~~круг в обратном порядке~~
- ~~круг с круглыми колпачками~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.5.1 (2026-07-24)

- seperate flipclock css classes from timeandweather adapter

### 2.5.0 (2026-07-21)

- Flip clock size is now adjustable via font-size.
- Defined better initial sizes and defaults for various widgets.

### 2.4.1 (2026-07-20)

- add new clock widgets
- fix prod and dev build
- reengineered widgets

### 2.3.5 (2026-07-14)

- fix repochecker
- update react to 18 and many more packages

### 2.3.4 (2026-03-30)

- update packages
- fix repochecker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 oweitman <oweitman@gmx.de>

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