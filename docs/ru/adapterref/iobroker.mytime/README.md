---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: a7L+rF17jhqztHSapeOLvt/yqEFihmBANmyCnUbc1d4=
---
![Логотип](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.mytime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Количество установок (последние)](http://iobroker.live/badges/mytime-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/mytime-stable.svg)
![Статус зависимости](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![Известные уязвимости](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![Трэвис-CI](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

# IoBroker.mytime
## ВАЖНЫЙ
Действительна только документация на английском языке, так как автоматический перевод переводит области, которые не должны переводиться.

## Адаптер mytime для ioBroker
Этот адаптер обрабатывает время (например, обратный отсчет и т. д.).
Функция обратного отсчета предоставляет точки данных, которые можно использовать для управления обратным отсчетом (например, в сценарии). Адаптер также включает в себя несколько виджетов для визуализации этих обратных отсчетов.
Временные ряды можно использовать для создания сложных временных рядов, в которых запускаются точки данных.

### Конфигурация
#### Обратный отсчет
В диалоговом окне конфигурации на вкладке «Обратный отсчет» вы можете создать новый обратный отсчет, например, «тест», установить таймер на 10 секунд и импортировать следующие виджеты.
Точки данных предварительно настроены для обратного отсчета под названием test.

##### Останов таймера поведения
После того, как обратный отсчет получает сигнал остановки, обратный отсчет сбрасывается до времени, установленного таймером.

##### Нулевой режим остановки После того, как обратный отсчет получает сигнал остановки, обратный отсчет остается равным 0.
#### Временные ряды
В диалоговом окне конфигурации на вкладке «Временные ряды» вы можете создать новый временной ряд с одним или несколькими временными правилами. Для каждого временного правила вы можете определить разные параметры. Каждая временная серия создает отдельную точку данных, которая срабатывает в расчетных временных событиях.
Временные события рассчитываются в режиме реального времени. Однако используемая библиотека правил еще не идеальна для всех комбинаций параметров.
Это показывает, что при некоторых комбинациях страница переходит в бесконечный цикл.
Демонстрационную страницу http://jakubroztocil.github.io/rrule/ также можно использовать для экспериментов.
Кроме того, чтобы добавить правило времени, вы можете добавить правило времени для исключения временных событий, добавления одиночных событий времени, а также для исключения одиночных событий времени.

### Использование
#### Временные ряды
##### Доступные точки данных
После настройки новой временной серии адаптер создает следующие точки данных:

| точка данных | описание |
|-----------|---------------------------------------------------------------------------|
| действие | фактическое состояние таймсерии. возможные значения стоп, запуск |
| команда | нет функции банкомата |

##### Доступные состояния действий
| действие | описание |
|-----------|-------------------------------------------------------------------------------------------------------|
| остановка | в данный момент не активно событие времени |
| бежать | произошло событие времени. по истечении настроенного времени продолжительность точка данных меняется на стоп |

#### Обратный отсчет
##### Доступные точки данных
После настройки нового обратного отсчета адаптер создает следующие точки данных:

| точка данных | описание |
|-----------|---------------------------------------------------------------------------|
| действие | фактическое состояние обратного отсчета. возможные значения: стоп, запуск, пауза, конец |
| команда | точка данных для команд. возможные команды описаны ниже |
| начать | точка данных для времени начала в миллисекундах |
| конец | точка данных для конечного времени в миллисекундах |
| таймер | точка данных для общего времени, установленного в миллисекундах |

##### Доступные состояния действия
| действие | описание |
|-----------|-------------------------------------------------------------------------------------------------------|
| остановка | обратный отсчет остановлен, время начала и окончания установлено на 0 |
| бежать | обратный отсчет идет. если обратный отсчет достигает конечного времени. действие переключается на конец |
| пауза | обратный отсчет находится в режиме паузы. время окончания было установлено на время паузы |
| конец | обратный отсчет окончен. это состояние можно использовать как триггер для дальнейших действий (звук, всплывающие окна и т.д.) | |

##### Доступные команды для точки данных cmd
| команда | пример | описание |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| +значение | +1:10 | добавляет время к настройке обратного отсчета. настройка будет учтена при следующем запуске |
| -значение | -1:2:3 | вычитает время из обратного отсчета. настройка будет учтена при следующем запуске |
| =значение | =5:00 | установите таймер обратного отсчета на это время. |
| #ISO-Дата | #2020-01-01T10:00:00 | установите таймер обратного отсчета на целевое время. Время должно быть отформатировано как ISO-Datestring |
| $Время | $20:15 | установите таймер обратного отсчета на целевое время. Если время предшествует текущему времени. установлен следующий день.|
| начать | начать | начинает обратный отсчет |
| остановка | остановка | останавливает обратный отсчет. время обратного отсчета сбрасывается на настройку |
| пауза | пауза | приостанавливает обратный отсчет |
| конец | конец | останавливает обратный отсчет. обратный отсчет установлен на 0 |
| setstop2timer | setstop2timer | установить конфигурацию поведения остановки на таймер |
| setstop2zero | setstop2zero | установить нулевое значение для конфигурации поведения при остановке |
| сохранить | сохранить | сохранить конфигурацию, определенную в точках данных, в конфигурацию iobroker |
| | | iobroker автоматически перезапускает адаптер после сохранения |

##### Формат значения для установки таймера обратного отсчета
Вы можете установить обратный отсчет на неограниченное время.
обозначение значения: [дни:[часы:[минуты:[секунды]]]] дни, часы и минуты не являются обязательными.
если вы хотите установить таймер на один день, вы должны установить часы, минуты и секунды, а также вам не нужно соблюдать нормальные диапазоны значений (например, часы 0-24). Вы также можете установить 48 часов.
если вы хотите, вы можете установить нерегулярные обозначения времени. время суммируется отдельно

**Примеры**

| установка | описание |
|-----------|---------------------------------------------|
| 1:0:0:0 | установить/добавить/вычесть 1 день к таймеру |
| 2:0:0 | установить/прибавить/вычесть 2 часа к таймеру |
| 3:0 | установить/прибавить/вычесть 3 минуты к таймеру |
| 120 | установить/прибавить/вычесть 120 секунд к таймеру |
| 48:0:0 | установить/прибавить/вычесть 48 часов к таймеру |
| 48:75:120 | установить/добавить/вычесть таймер |

##### Формат шаблона для форматирования вывода обратного отсчета в виджете
Доступны следующие заполнители:

| заполнитель | описание |
|-------------|-----------------------------------------------------------------|
| д | дней без ведущих нулей |
| дд | дней с ведущими нулями |
| Н | часы без ведущих нулей |
| ЧЧ | часы с ведущими нулями |
| м | минут без ведущих нулей |
| мм | минут с ведущими нулями |
| с | секунды без ведущих нулей |
| сс | секунды с ведущими нулями |
| \ | Экранирующий символ, если вы хотите использовать заполнитель в выводе |

**Примеры**

Все следующие примеры с таймером обратного отсчета 1:2:3:4

| шаблон | пример | результат |
|-----------------------|-------------------|--------------------------------------------------|
| д\д Чч м\м с\с | 1д 2ч 3м 4с | с escape-символами и без начальных нулей |
| дд\д ЧЧч мм\м сс\с | 01д 02ч 03м 04с | с escape-символами и ведущими нулями |
| сс\с | 93784с | только секунды |
| дд\д ЧЧ\ч | 01д 02ч | только дни и часы |
| ЧЧ\ч мм\м | 26ч 03м | только часы и минуты |

### Виджеты
#### Простой виджет обратного отсчета
Виджет обратного отсчета для простого текстового вывода

##### Свойства виджета
###### Oid Точка данных таймера точки данных обратного отсчета.
###### Format Форматирует вывод таймера. по умолчанию мм:сс. подробности см. в шаблоне формата главы
##### Пример кода виджета
виджеты предварительно настроены для обратного отсчета под названием test.

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### Фактическое состояние действия (cdstop,cdrun,cdpause,cdend) обратного отсчета доступно как селектор класса CSS.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Виджет обратного обратного отсчета
Виджет, который показывает прошедшее время с заданного момента времени

##### Свойства виджета
###### datetime Строка DateTime времени начала.
Выражение должно интерпретироваться функцией javascript new Date(expression).
См. также https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse.
Пример: 2022-01-10 23:12 2022-01-104T23:12:00.000Z

###### Формат
Форматирует вывод таймера. по умолчанию мм:сс. подробности см. в шаблоне формата главы

#### Круг обратного отсчета виджета
Виджет обратного отсчета в виде кольца/круга.

##### Свойства виджета
###### Oid Точка данных таймера точки данных обратного отсчета.
###### Notimetext Отключает отображение времени над полярными часами.
###### Format Форматирует вывод таймера. по умолчанию мм:сс. подробности см. в шаблоне формата главы
###### Настройка реверса для увеличения или уменьшения кольца/окружности
###### Ширина Ширина кольца или круга.
###### Кольцевой зазор Зазор в пикселях между кольцами
###### Заглушки Установка концов кольца/окружности: круглая или прямая
###### BackgroundЦвет фона кольца/круга
###### Передний план Цвет переднего плана кольца/круга
###### Showsec Показать кольцо секунд
###### Showmin Показать кольцо минут
###### Showhrs Показать кольцо минут
###### Showday Показать кольцо дней
##### Фактическое состояние действия (cdstop,cdrun,cdpause,cdend) обратного отсчета доступно как селектор класса CSS.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Виджет обратного отсчета FlipClock
Виджет обратного отсчета в стиле флип-борда в аэропорту

##### Свойства виджета
###### Oid Точка данных таймера точки данных обратного отсчета.
###### Countdown_showsec Показывает секунды. между двумя блоками не должно быть зазора.
###### Countdown_showmin Показывает минутную часть. между двумя блоками не должно быть зазора.
###### Countdown_showhrs Показывает часовую часть. между двумя блоками не должно быть зазора.
###### Countdown_showday Показывает часть дня. между двумя блоками не должно быть зазора.
###### Countdown_color Цвет таймера обратного отсчета
###### Countdown_background_color Цвет фона таймера обратного отсчета
###### Countdown_dot_color Цвет точек таймера обратного отсчета
##### Советы
Если вы хотите настроить размер обратного отсчета, в настройках css в vis вы можете ввести половинный размер: Group CSS-Common/transform "scale(0.5)"

##### Фактическое состояние действия (cdstop,cdrun,cdpause,cdend) обратного отсчета доступно как селектор класса CSS.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Виджет обратного отсчета NixieClock
Виджет обратного отсчета в стиле Nixie-Tube/LED

##### Свойства виджета
###### Оид
Точка данных таймера точки данных обратного отсчета.

###### Countdown_showsec Показывает секунды. между двумя блоками не должно быть зазора.
###### Countdown_showmin Показывает минутную часть. между двумя блоками не должно быть зазора.
###### Countdown_showhrs Показывает часовую часть. между двумя блоками не должно быть зазора.
###### Countdown_showday Показывает часть дня. между двумя блоками не должно быть зазора.
###### Countdown_color_active Цвет таймера обратного отсчета
###### Countdown_color_inactive Цвет неактивных цифр
###### Countdown_opacity_inactive Непрозрачность цвета неактивных цифр
###### Countdown_glowcolor Цвет свечения вокруг Nixie-цифр
#### Виджет Wordclock
Виджет для отображения часов с множеством опций

##### Свойства виджета
###### Язык
Доступны несколько разных языков для WordClock.

###### LetterActivated Цвет для выделенных слов
###### LetterDeactivated Цвет для обычных букв
###### WordclockMargin Зазор между wordclock и светодиодами
###### WithMinutes Показать индикаторы минут в углу часов
###### MinuteSize Размер индикаторов Minute в пикселях
###### MinuteColor цвет индикатора минут
###### WithSeconds Отображение секундных индикаторов WordClock
###### SecondSize Размер светодиодов секунд в пикселях
###### SecondColor цвет индикатора секунд
###### Timezone Отображается время выбранного часового пояса
##### Советы
Если вы хотите настроить размер nixieclock обратного отсчета, в настройках css в vis вы можете ввести половинный размер: Group CSS-Common/transform "scale(0.5)"

##### Фактическое состояние действия (cdstop,cdrun,cdpause,cdend) обратного отсчета доступно как селектор класса CSS.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

## Сделать
* 7-сегментный дисплей
* скользящие числа
* настраиваемые шрифты
* ts: временные рамки для исключения (временной диапазон, отдельные даты)
* ~~Добавить часовой пояс для wordclock~~
* ~~таймер WordClock~~
* ~~ планировщик по времени: планируйте одну дату/время и повторяющиеся события, такие как Outlook~~
* ~~Никси-стиль~~
* ~~откидной дисплей (дисплей в аэропорту)~~
* ~~новая команда для установки только целевого времени без даты~~
* ~~ виджет круга обратного отсчета с возможностью отключения текста обратного отсчета
* ~~Групповой разделитель '.' в имени~~
* ~~Полярные часы~~
* ~~круг в обратном порядке~~
* ~~круг с круглыми заглавными буквами~~

## Changelog

### 0.7.10
* add widget reverse countdown
### 0.7.9
* add more wordclock tests
* fix wordclock matrix swiss
### 0.7.8
* add timezone for wordclock
### 0.7.7
* add timezone for wordclock
### 0.7.6
* add tests for wordclock * remove admin tab
### 0.7.5
* Remove comments in io-package
### 0.7.4
* fix spanish language pack
### 0.7.3
* * add turkish language for wordclock
### 0.7.2
* * add russian and espaniol language for wordclock
### 0.7.1
* add margin property for wordclock * add italiano and francais for wordclock * wordclock remove border
### 0.7.0
* New widget wordclock
### 0.6.1
* remove beta tag from widgets * m,assive reengeneering of the react classes, add functions für exclusion rules, adding single time events and exclude single time events
### 0.6.0
* Introduction of new functionality timeseries
### 0.5.2
* fix an issue and introduce a new command save to save the configuration defined in datapoints to the iobroker configuration data
### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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