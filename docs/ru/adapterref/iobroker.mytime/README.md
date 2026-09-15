---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: 67yDSjHojqhf+/Wu8Xa3JltuQbiLxDUy8uFlL2KrUdw=
---
![Логотип](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Количество установок](https://iobroker.live/badges/mytime-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mytime-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mytime.png?downloads=true)
![Тестирование и выпуск](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

# ioBroker.mytime

## ВАЖНЫЙ

Действительна только англоязычная документация, поскольку автоматический перевод затрагивает разделы, которые переводиться не должны.

## адаптер mytime для ioBroker

Этот адаптер обрабатывает время (например, обратный отсчет и т. д.). Функция обратного отсчета предоставляет точки данных, которые можно использовать для управления обратным отсчетом (например, в скрипте). Адаптер также включает в себя несколько виджетов для визуализации этих обратных отсчетов. Временные ряды можно использовать для создания сложных временных рядов, в которых точки данных срабатывают.

### Конфигурация

#### Обратный отсчет

В диалоговом окне конфигурации на вкладке «Обратный отсчет» вы можете создать новый обратный отсчет, например, «тест», установить таймер на 10 секунд и импортировать следующие виджеты. Точки данных предварительно настроены для обратного отсчета с именем «тест».

##### Остановить таймер поведения

После того, как таймер подаст сигнал на остановку, отсчет времени сбросится до значения, установленного таймером.

##### Прекратите поведение, обеспечивающее нулевой уровень риска.

После того, как обратный отсчет получит сигнал об остановке, он останется на отметке 0.

##### Остановить повторный запуск проверки поведения

По истечении времени таймер автоматически перезапустится.

#### Временные ряды

В диалоговом окне конфигурации, во вкладке «Временные ряды», можно создать новый временной ряд с одним или несколькими временными правилами. Для каждого временного правила можно определить различные параметры. Каждый временной ряд создает отдельную точку данных, которая срабатывает при вычисленных временных событиях. Временные события вычисляются в реальном времени. Однако используемая библиотека rrule пока не идеальна во всех комбинациях параметров. Это показывает, что при некоторых комбинациях страница зацикливается. Для экспериментов также можно использовать демонстрационную страницу <http://jakubroztocil.github.io/rrule/> . Помимо добавления временного правила, можно добавить правило исключения временных событий, добавить отдельные временные события, а также исключить отдельные временные события.

В дополнение к функциональности rrule, теперь можно также динамически рассчитывать время для различных фаз Солнца и Луны. Этот расчет выполняется только в том случае, если временной интервал составляет не менее суток (а не часов или минут).

##### События, связанные со временем, обусловленным Солнцем.

- астрономический рассвет
- amateurDawn
- nauticalDawn
- blueHourDawnStart
- гражданский рассвет
- blueHourDawnEnd
- золотой час рассвет начало
- восход солнцаСтарт
- восход солнцаКонец
- goldenHourDawnEnd
- солнечный полдень
- золотой час закат начало
- закатНачало
- закатКонец
- золотой час закат
- blueHourDuskStart
- гражданский закат
- blueHourDuskEnd
- морские сумерки
- amateurDusk
- астрономическийСумерки
- надир

##### События, связанные со временем, обусловленные Луной.

- восход луны
- лунный свет
- заход луны

### Использование

#### Использование временных рядов

##### Доступные точки данных временного ряда

После настройки нового временного ряда адаптер создает следующие точки данных:

| точка данных | описание                                                              |
| ------------ | --------------------------------------------------------------------- |
| действие     | Фактическое состояние временного ряда. Возможные значения: stop, run. |
| команда      | банкомат не работает                                                  |

##### Доступные состояния действий

| действие        | описание                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| останавливаться | В данный момент нет активных событий по времени.                                                                        |
| бегать          | Было инициировано временное событие. По истечении заданного времени точка данных изменяется, и процесс останавливается. |

#### Использование обратного отсчета

##### Доступные данные обратного отсчета

После настройки нового таймера обратного отсчета адаптер создает следующие точки данных:

| точка данных | описание                                                                        |
| ------------ | ------------------------------------------------------------------------------- |
| действие     | Текущее состояние обратного отсчета. Возможные значения: stop, run, pause, end. |
| команда      | Точка данных для команд. Возможные команды описаны ниже.                        |
| конфигурация | используйте соответствующую конфигурацию для таймера обратного отсчета.         |
| начинать     | точка данных для времени начала в миллисекундах                                 |
| конец        | точка данных, указывающая на время окончания в миллисекундах                    |
| таймер       | точка данных для общего заданного времени в миллисекундах                       |

##### Доступные состояния действий в обратном отсчете

| действие        | описание                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| останавливаться | Обратный отсчет остановлен, время начала и окончания установлено на 0.                                                                   |
| бегать          | Идет обратный отсчет. Если обратный отсчет достигнет времени окончания, действие переключается на «Завершить».                           |
| пауза           | Обратный отсчет находится в режиме паузы. Время окончания установлено на момент паузы.                                                   |
| конец           | Обратный отсчет завершен. Это состояние можно использовать в качестве триггера для дальнейших действий (звук, всплывающие окна и т. д.). |

##### Доступные команды для точки данных cmd

| команда         | пример                  | описание                                                                                                                                  |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `+value`        | `+1:10`                 | Добавляет время к настройке обратного отсчета. Эта настройка будет учтена при следующем запуске.                                          |
| `+!value`       | \`\`+!1:10\`            | как оператор + и продлить таймер выполнения                                                                                               |
| `-value`        | `-1:2:3`                | Вычитает время из обратного отсчета. Эта настройка будет учтена при следующем запуске.                                                    |
| `-!value`       | `-!1:2:3`               | оператор и сократить время выполнения                                                                                                     |
| `=value`        | `=5:00`                 | Установите таймер обратного отсчета на это время.                                                                                         |
| `=!value`       | `=!5:00`                | как оператор = и установить таймер на заданное время                                                                                      |
| `#ISO-Date`     | `#2025-01-01T10:00:00`  | Установите таймер обратного отсчета на целевое время. Время должно быть отформатировано в формате ISO-Datestring.                         |
| `#!ISO-Date`    | `#!2025-01-01T10:00:00` | как оператор # и установка таймера на заданное целевое время                                                                              |
| `$Time`         | `$20:15`                | Установите таймер обратного отсчета на целевое время. Если время раньше текущего, будет установлен следующий день.                        |
| `$!Time`        | `$!20:15`               | как оператор $ и установка таймера на заданное целевое время                                                                              |
| `start`         | `start`                 | начинается обратный отсчет                                                                                                                |
| `stop`          | `stop`                  | Останавливает обратный отсчет. Время обратного отсчета сбрасывается до заданного значения.                                                |
| `pause`         | `pause`                 | приостанавливает обратный отсчет                                                                                                          |
| `end`           | `end`                   | Останавливает обратный отсчет. Обратный отсчет установлен на 0.                                                                           |
| `reset`         | `reset`                 | сбросьте таймер в состояние конфигурации.                                                                                                 |
| `setstop2timer` | `setstop2timer`         | установить в настройках поведения остановки таймер                                                                                        |
| `setstop2zero`  | `setstop2zero`          | установить значение параметра "Поведение остановки" равным нулю                                                                           |
| `setstop2rerun` | `setstop2rerun`         | установить конфигурацию поведения остановки для повторного запуска                                                                        |
| `save`          | `save`                  | Сохраните конфигурацию, определенную в datapoints, в конфигурацию iobroker; после сохранения iobroker автоматически перезапустит адаптер. |

##### Формат значения для установки таймера обратного отсчета

Вы можете установить обратный отсчет на неограниченное время. Обозначение значения: \[дни:\[часы:\[минуты:\[секунды]]]]. Дни, часы и минуты являются необязательными. Если вы хотите установить таймер на один день, вам также необходимо указать часы, минуты и секунды. Вам не обязательно соблюдать стандартные диапазоны значений (например, часы 0-24). Вы также можете установить 48 часов. При желании вы можете установить нерегулярные обозначения времени. Время суммируется отдельно.

**Примеры:**

| параметр  | описание                                                |
| --------- | ------------------------------------------------------- |
| 1:0:0:0   | устанавливает/добавляет/вычитает 1 день из таймера      |
| 2:0:0     | устанавливает/добавляет/вычитает 2 часа из таймера      |
| 3:0       | установить/добавить/вычесть 3 минуты к таймеру          |
| 120       | устанавливает/добавляет/вычитает 120 секунд из таймера. |
| 48:0:0    | устанавливает/добавляет/вычитает 48 часов из таймера    |
| 48:75:120 | устанавливает/добавляет/вычитает таймер                 |

##### Формат даты и времени для форматирования вывода в виджете.

Доступны следующие заполнители:

| заполнитель | описание                                                                        |
| ----------- | ------------------------------------------------------------------------------- |
| ГГГГГ       | годы в 4 цифрах                                                                 |
| YY          | годы в 2 цифрах                                                                 |
| в           | месяцев без ведущих нулей (не вместе с месяцами)                                |
| вв          | месяцы с ведущими нулями (не вместе с месяцами)                                 |
| М           | месяцев без ведущих нулей (не вместе с неделями)                                |
| ММ          | месяцы с ведущими нулями (не вместе с неделями)                                 |
| д           | дни без ведущих нулей                                                           |
| дд          | дни с ведущими нулями                                                           |
| ЧАС         | часы без ведущих нулей                                                          |
| ХХ          | часы с ведущими нулями                                                          |
| м           | минуты без ведущих нулей                                                        |
| мм          | минуты с ведущими нулями                                                        |
| с           | секунд без ведущих нулей                                                        |
| SS          | секунды с ведущими нулями                                                       |
| \\          | Используйте экранирующий символ, если хотите использовать заполнитель в выводе. |

При взятии нескольких частей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

**Примеры:**

Все приведенные ниже примеры с таймером обратного отсчета 1:2:3:4

| шаблон             | пример          | результат                                     |
| ------------------ | --------------- | --------------------------------------------- |
| д\д Хх м\мс\с      | 1д 2ч 3м 4с     | с экранирующими символами и без ведущих нулей |
| dd\d HHh mm\m ss\s | 01д 02ч 03м 04с | с экранирующими символами и ведущими нулями   |
| сс\с               | 93784s          | всего секунды                                 |
| dd\d HH\h          | 01д 02ч         | всего лишь дни и часы                         |
| HH\h мм\m          | 26 ч 03 мин     | всего лишь часы и минуты                      |

### Виджеты

Начиная с версии 1.2.0, виджеты должны быть совместимы с vis1 и vis2.

#### Виджет обратного отсчета (простой)

![Виджет обратного отсчета простой](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-countdown.png)

Виджет обратного отсчета для вывода в текстовом формате. Вывод можно детально настроить.

##### Атрибуты виджета

| Атрибут        | Описание                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Object ID`    | Точка данных таймера обратного отсчета. Можно использовать любую точку данных.                                                 |
| `Format`       | Формат вывода: подробности см. в главе « [Формат даты и времени».](#format-of-the-datetime-to-format-the-output-in-the-widget) |
| `HTML-Prepend` | Этот текст или HTML-код добавляется в начало вывода виджета.                                                                   |
| `HTML-Append`  | Этот текст или HTML-код добавляется к результату работы виджета.                                                               |

##### Пример кода виджета

Виджеты предварительно настроены для обратного отсчета под названием "test". Существуют две отдельные версии: для vis1 и vis2.

![Пример](../../../en/adapterref/iobroker.mytime/admin/mytime-example1.png)

**ВИС1:**

<details>
  <summary>Details</summary>
  <pre><code>[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdowns.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]</code></pre>
</details>

**ВИС2:**

<details>
  <summary>Details</summary>
<pre><code>[{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"pause","value":"pause"},"style":{"bindings":[],"left":"423.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000001"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"start","value":"start"},"style":{"bindings":[],"left":"361.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000002"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"stop","value":"stop"},"style":{"bindings":[],"left":"485.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000003"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"+10","value":"+10"},"style":{"bindings":[],"left":"423.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000004"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"=100","value":"=100"},"style":{"bindings":[],"left":"361.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000005"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"-10","value":"-10"},"style":{"bindings":[],"left":"485.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000006"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"+!10","value":"+!10"},"style":{"bindings":[],"left":"423.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000007"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"=!100","value":"=!100"},"style":{"bindings":[],"left":"361.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000008"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"-!10","value":"-!10"},"style":{"bindings":[],"left":"485.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000009"},{"tpl":"tplMyTimeCountdownPlain","data":{"bindings":[],"countdown_format":"dd\\d HH\\h mm\\m ss\\s","g_common":true,"g_css_border":true,"countdown_oid":"mytime.0.Countdowns.test.timer","g_css_font_text":true},"style":{"bindings":[],"left":"361.0000305175781px","top":"375.00001525878906px","width":"182px","height":"24px","border-width":"0","border-style":"solid","border-color":"rgba(237,235,243,1)","text-align":"center"},"widgetSet":"mytime","_id":"i000010"}]</code></pre>
</details>

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

| Точка данных   | Описание                                                                                                                                                                                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ISO datetime` | Строка типа DateTime, содержащая время начала. Выражение должно быть интерпретируемым функцией JavaScript \`new Date(expression)\`. См. также <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse> . Пример: 2022-01-10 23:12 или 2022-01-104T23:12:00.000Z |
| `Format`       | Форматирует выходные данные таймера. По умолчанию используется формат мм:сс. Подробности см. в главе [«Формат даты и времени».](#format-of-the-datetime-to-format-the-output-in-the-widget)                                                                                                          |
| `HTML-Prepend` | Этот текст или HTML-код добавляется в начало вывода виджета.                                                                                                                                                                                                                                         |
| `HTML-Append`  | Этот текст или HTML-код добавляется к результату работы виджета.                                                                                                                                                                                                                                     |

#### Круг обратного отсчета (виджет)

![Круг обратного отсчета (виджет)](../../../en/adapterref/iobroker.mytime/admin/mytime-circle-countdown.png)

Виджет обратного отсчета в виде кольца/круга.

##### Свойства виджета круга обратного отсчета

| Атрибут                  | Описание                                                                                                                                                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID`              | Точка данных таймера в точке данных обратного отсчета.                                                                                                                                                                                              |
| `notimetext`             | Отключает отображение текстового времени поверх полярных часов.                                                                                                                                                                                     |
| `Format`                 | Форматирует вывод таймера. По умолчанию — мм:сс. Подробности см. в главе « [Формат даты и времени»](#format-of-the-datetime-to-format-the-output-in-the-widget) . Параметр ReversevSetting позволяет увеличивать или уменьшать размер кольца/круга. |
| `reverse`                | Ширина кольца или круга.                                                                                                                                                                                                                            |
| `partring`               | Выбранное кольцо большего размера отображается пропорционально, а не целиком.                                                                                                                                                                       |
| `Width`                  | Ширина кольца или круга.                                                                                                                                                                                                                            |
| `Ring gap`               | Зазор в пикселях между кольцами                                                                                                                                                                                                                     |
| `Ring Caps`              | Крепление концов кольца/круга: круглые или прямые.                                                                                                                                                                                                  |
| `background`             | Цвет фона кольца/круга                                                                                                                                                                                                                              |
| `foreground`             | Цвет переднего плана кольца/круга                                                                                                                                                                                                                   |
| `countdown_color_second` | Цвет переднего плана второго кольца/круга                                                                                                                                                                                                           |
| `countdown_color_hour`   | Цвет переднего плана часового кольца/круга                                                                                                                                                                                                          |
| `countdown_color_day`    | Цвет переднего плана кольца/круга дня                                                                                                                                                                                                               |
| `countdown_color_week`   | Цвет переднего плана недели (кольцо/круг)                                                                                                                                                                                                           |
| `countdown_color_month`  | Цвет переднего плана кольца/круга месяца                                                                                                                                                                                                            |
| `countdown_color_year`   | Цвет переднего плана второго кольца/круга                                                                                                                                                                                                           |
| `showsec`                | Показать секундное кольцо                                                                                                                                                                                                                           |
| `showmin`                | Покажите звонок минут                                                                                                                                                                                                                               |
| `showhrs`                | Покажите звонок минут                                                                                                                                                                                                                               |
| `showday`                | Покажите кольцо дней                                                                                                                                                                                                                                |
| `showmonth`              | Покажите кольцо месяцев (не вместе с неделями).                                                                                                                                                                                                     |
| `showweek`               | Покажите кольцо недель (не вместе с месяцами).                                                                                                                                                                                                      |
| `showyear`               | Покажите кольцо лет                                                                                                                                                                                                                                 |

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

Виджет обратного отсчета в стиле табло аэропорта. Поддерживается только 100 дней - 1 секунда. Индивидуальный перевод в выбранные единицы измерения здесь не выполняется.

##### Свойства виджета обратного отсчета FlipClock

| Атрибут               | Описание                                               |
| --------------------- | ------------------------------------------------------ |
| `Object ID`           | Точка данных таймера в точке данных обратного отсчета. |
| `showsec`             | Показана секундная часть.                              |
| `showmin`             | Отображает минутный интервал.                          |
| `showhrs`             | Отображает часовую часть.                              |
| `showday`             | Отображает время суток.                                |
| `color`               | Цвет таймера обратного отсчета                         |
| `background_color`    | Цвет фона таймера обратного отсчета                    |
| `countdown_dot_color` | Цвет точек таймера обратного отсчета                   |

При выборе нескольких деталей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

Размер отображаемого изображения можно контролировать с помощью CSS.`font-size` параметр.

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

##### Свойства виджета обратного отсчета NixieClock

| Атрибут                        | Описание                                                    |
| ------------------------------ | ----------------------------------------------------------- |
| Идентификатор объекта          | Точка данных таймера в точке данных обратного отсчета.      |
| countdown\_showsec             | Показана секундная часть.                                   |
| countdown\_showmin             | Отображает минутный интервал.                               |
| countdown\_showhrs             | Отображает часовую часть.                                   |
| обратный отсчет\_дня\_выставки | Отображает время суток.                                     |
| countdown\_showmonth           | Показан месячный период (не вместе с неделями).             |
| countdown\_showweek            | Отображает временной отрезок недели (не вместе с месяцами). |
| countdown\_showyear            | Указывается год выпуска.                                    |
| countdown\_color\_active       | Цвет таймера обратного отсчета                              |
| countdown\_color\_inactive     | Цвет неактивных цифр                                        |
| countdown\_opacity\_inactive   | Прозрачность цвета неактивных цифр                          |
| countdown\_glowcolor           | Цвет свечения вокруг этих газоразрядных индикаторов.        |

При выборе нескольких деталей между ними не должно быть зазоров.

Пример:

Действительны: год, месяц, день | час, минута, секунда. Недействительны: год, минута, секунда.

##### Советы

###### Верхняя/нижняя границы

Используемый шрифт Lato слегка наклонен вниз, что создает неравномерные верхние и нижние поля. Это можно отрегулировать с помощью высоты и отрицательного верхнего поля. Виджет использует высоту 1em. Высоту можно задать непосредственно в свойствах виджета.

Для отрицательного поля необходимо создать CSS-класс.

```css
#w00000 .cdclock {
    margin-top: -5px;
}
```

###### Размер виджета

Размер экрана можно регулировать с помощью CSS.`font-size` параметр.

###### Центрирование часов с газоразрядными индикаторами

Для центрирования часов требуется дополнительный CSS-класс, поскольку соответствующие параметры нельзя настроить в параметрах виджета:

```css
#w00000 {
    display: flex;
    justify-content: center;
}
```

#### Виджет Часы простой

![Виджет Часы простой](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-clock.png)

Настраиваемый виджет для отображения текущей даты и времени в виде обычного текста. Время может быть получено либо из браузера, либо из синхронизированного времени сервера ioBroker.

##### Свойства виджета «Часы»

| Атрибут              | Описание                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `clock_time_source`  | Выбирает`client` для времени работы браузера или`server` для синхронизированного времени сервера ioBroker. |
| `clock_format`       | Определяет формат даты и времени. По умолчанию используется следующий формат:`DD.MM.YYYY HH:mm:ss` .       |
| `clock_html_prepend` | Текст или HTML-код, вставленный перед отформатированными датой и временем.                                 |
| `clock_html_append`  | Текст или HTML-код, добавляемый после отформатированных даты и времени.                                    |

В следующих примерах можно использовать заполнители.`clock_format` :

| Заполнитель | Описание                           |
| ----------- | ---------------------------------- |
| `YYYY`      | Четырехзначный год                 |
| `YY`        | Двузначный год                     |
| `MM` /`M`   | Месяц с ведущим нулем / без него   |
| `DD` /`D`   | День с ведущим нулем / без него    |
| `HH` /`H`   | Часы с ведущим нулем / без него    |
| `mm` /`m`   | Минуты с ведущим нулем / без него  |
| `ss` /`s`   | Секунды с ведущим нулем / без него |

Размер экрана можно регулировать с помощью CSS.`font-size` параметр.

#### Widget Clock FlipClock

![Widget Clock FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-clock.png)

Настраиваемый виджет даты и времени в стиле интерактивной доски аэропорта. Каждый компонент даты и времени можно отображать или скрывать по отдельности.

##### Свойства виджета Clock FlipClock

| Атрибут                  | Описание                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `clock_time_source`      | Выбирает`client` для времени работы браузера или`server` для синхронизированного времени сервера ioBroker. |
| `clock_date_order`       | Выбирает`DMY` ,`MDY` , или`YMD` в порядке следования компонентов даты.                                     |
| `clock_showyear`         | Отображает двузначный номер года.                                                                          |
| `clock_showmonth`        | Отображает компонент месяца.                                                                               |
| `clock_showday`          | Отображает компонент дня.                                                                                  |
| `clock_showhours`        | Отображает компонент часов.                                                                                |
| `clock_showminutes`      | Отображает компонент минут.                                                                                |
| `clock_showseconds`      | Отображает компонент секунд.                                                                               |
| `clock_color`            | Задает цвет цифр.                                                                                          |
| `clock_background_color` | Задает цвет фона карточек-перевертышей.                                                                    |
| `clock_dot_color`        | Задает цвет разделителей между компонентами.                                                               |

Компоненты времени всегда отображаются после выбранных компонентов даты в порядке часы, минуты, секунды. Размер отображения можно контролировать с помощью CSS.`font-size` параметр.

#### Widget Clock NixieClock

![Widget Clock NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-clock.png)

Настраиваемый виджет даты и времени в стиле газоразрядных индикаторов/светодиодов. Каждый компонент даты и времени может отображаться или скрываться по отдельности.

##### Свойства виджета часов NixieClock

| Атрибут                  | Описание                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `clock_time_source`      | Выбирает`client` для времени работы браузера или`server` для синхронизированного времени сервера ioBroker. |
| `clock_date_order`       | Выбирает`DMY` ,`MDY` , или`YMD` в порядке следования компонентов даты.                                     |
| `clock_showyear`         | Отображает двузначный компонент года.                                                                      |
| `clock_showmonth`        | Отображает компонент месяца.                                                                               |
| `clock_showday`          | Отображает компонент дня.                                                                                  |
| `clock_showhours`        | Отображает компонент часов.                                                                                |
| `clock_showminutes`      | Отображает компонент минут.                                                                                |
| `clock_showseconds`      | Отображает компонент секунд.                                                                               |
| `clock_color_active`     | Задает цвет активных цифр газоразрядных индикаторов.                                                       |
| `clock_color_inactive`   | Задает цвет неактивных цифр газоразрядных индикаторов.                                                     |
| `clock_opacity_inactive` | Задает прозрачность неактивных цифр.                                                                       |
| `clock_glowcolor`        | Задает цвет подсветки вокруг активных цифр.                                                                |

Компоненты времени всегда отображаются после выбранных компонентов даты в порядке часы, минуты, секунды. Размер отображения можно контролировать с помощью CSS.`font-size` параметр.

#### Виджет Wordclock

![Виджет Wordclock](../../../en/adapterref/iobroker.mytime/admin/mytime-wordclock.png)

Виджет для отображения текстовых часов с множеством опций.

##### Свойства виджета Wordclock

| Точка данных        | Описание                                                          |
| ------------------- | ----------------------------------------------------------------- |
| `language`          | Для отображения текста на часах доступны несколько разных языков. |
| `letterActivated`   | Раскрасьте выделенные слова.                                      |
| `letterDeactivated` | Цвет для обычных букв                                             |
| `wordclockMargin`   | Зазор между текстовыми часами и светодиодами                      |
| `withMinutes`       | Отобразите минутные светодиоды в углу текстовых часов.            |
| `minuteSize`        | Размер светодиодов в пикселях в минуту                            |
| `minuteColor`       | цвет минутного светодиода                                         |
| `withSeconds`       | Отобразить секундные светодиоды на напольных часах.               |
| `secondSize`        | Размер светодиодов в пикселях в секундах                          |
| `secondColor`       | цвет светодиода секунд                                            |
| `timezone`          | Отображается время выбранного часового пояса.                     |

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно в виде селектора CSS-класса:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

## Все

- 7-сегментный дисплей
- скользящие числа
- настраиваемые шрифты
- ts: правила исключения по времени (временной диапазон, отдельные даты)
- ~~добавить часовой пояс для Wordclock~~
- ~~таймер слов~~
- ~~Планировщик по времени: планирование отдельных дат/времени и повторяющихся событий, как в Outlook.~~
- ~~стиль Никси~~
- ~~Информационный табло (табло в аэропорту)~~
- ~~Новая команда для установки только целевого времени без даты.~~
- \~\~виджет кругового обратного отсчета с возможностью отключения текста обратного отсчета
- ~~Разделитель групп '.' в имени~~
- ~~Полярные часы~~
- ~~круг обратный~~
- ~~круг с круглыми колпачками~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.5 (2026-09-01)

- prepare for stable release

### 3.0.1 (2026-08-10)

- improve and fix jsonConfig
- switch from build to dist directory
- extend log output for onMessage error
- improve getServerTime timer in widget
- rename subsubdirectory widgets to widgetTypes
- improve race condition with states

### 3.0.0 (2026-08-09)

- update to react 19
- fix repochecker

### 2.5.1 (2026-07-24)

- seperate flipclock css classes from timeandweather adapter

### 2.5.0 (2026-07-21)

- Flip clock size is now adjustable via font-size.
- Defined better initial sizes and defaults for various widgets.

[Older changelogs can be found there](https://github.com/oweitman/ioBroker.mytime/blob/main/CHANGELOG_OLD.md)

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