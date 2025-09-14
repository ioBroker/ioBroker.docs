---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: B1gdWMXf+l3s2pS2Z1okjTjjkWbRSvvYG9qoNSo6/cw=
---
![Логотип](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Количество установок](https://iobroker.live/badges/mytime-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/mytime-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mytime.png?downloads=true)

# IoBroker.mytime
**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

## ВАЖНЫЙ
Действительна только документация на английском языке, поскольку автоматический перевод переводит области, которые не подлежат переводу.

## Mytime адаптер для ioBroker
Этот адаптер обрабатывает время (например, обратный отсчёт и т. д.).
Функциональность обратного отсчёта предоставляет точки данных, которые можно использовать для управления обратным отсчётом (например, в скрипте). Адаптер также включает несколько виджетов для визуализации этих отсчётов. Временные ряды можно использовать для создания сложных временных рядов, в которых срабатывают точки данных.

### Конфигурация
#### Обратный отсчет
В диалоговом окне конфигурации на вкладке «Обратный отсчёт» вы можете создать новый обратный отсчёт, например, «тест», установить таймер на 10 секунд и импортировать следующие виджеты.
Точки данных предварительно настроены для обратного отсчёта с именем «тест».

##### Остановить таймер поведения
После остановки обратного отсчета по сигналу обратный отсчет сбрасывается на время, установленное таймером.

##### Остановить поведение ноль
После остановки обратного отсчета по сигналу обратный отсчет остается на 0.

#### Временные ряды
В диалоговом окне конфигурации на вкладке «Временные ряды» можно создать новый временной ряд с одним или несколькими временными правилами. Для каждого временного правила можно определить различные параметры. Каждый временной ряд создаёт отдельную точку данных, которая активируется при расчётных временных событиях.
Временные события рассчитываются в режиме реального времени. Однако используемая библиотека правил пока не идеальна во всех сочетаниях параметров.
Это показывает, что при некоторых сочетаниях страница зацикливается.
Демонстрационная страница <http://jakubroztocil.github.io/rrule/> также может быть использована для экспериментов.
Помимо добавления временного правила, вы можете добавить правило для исключения временных событий, для добавления отдельных временных событий, а также для исключения отдельных временных событий.

### Использование
#### Использование временных рядов
##### Доступные точки данных временной серии
После настройки нового таймсерия адаптер создает следующие точки данных:

| точка данных | описание |
| --------- | ------------------------------------------------------------ |
| действие | фактическое состояние временной серии. Возможные значения: остановить, запустить |
| cmd | нет функции atm |

##### Доступные состояния действий
| действие | описание |
| ------ | --------------------------------------------------------------------------------------------- |
| стоп | в данный момент нет активных временных событий |
| запустить | произошло событие времени. по истечении заданного времени точка данных изменяется на останов |

#### Использование обратного отсчета
##### Доступные точки данных обратного отсчета
После настройки нового обратного отсчета адаптер создает следующие точки данных:

| точка данных | описание |
| --------- | ---------------------------------------------------------------------- |
| действие | фактическое состояние обратного отсчета. Возможные значения: стоп, запуск, пауза, конец |
| cmd | datapoint для команд. Возможные команды описаны ниже |
| начало | точка данных для времени начала в миллисекундах |
| конец | точка данных для конечного времени в миллисекундах |
| таймер | точка данных для общего времени, заданного в миллисекундах |

##### Доступные состояния действия обратного отсчета
| действие | описание |
| ------ | ----------------------------------------------------------------------------------------------------- |
| стоп | обратный отсчет остановлен, время начала и окончания установлено на 0 |
| запустить | обратный отсчет запускается. если обратный отсчет достигает времени окончания. действие переключается на окончание |
| пауза | обратный отсчет находится в режиме паузы. время окончания было установлено на время паузы |
| конец | обратный отсчет завершен. Это состояние можно использовать как триггер для дальнейших действий (звук, всплывающие окна и т. д.) |

##### Доступные команды для точки данных cmd
| команда | пример | описание |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| `+value` | `+1:10` | добавляет время к настройке обратного отсчета. настройка будет учтена при следующем запуске |
| `-value` | `-1:2:3` | вычитает время из обратного отсчета. настройка будет учтена при следующем запуске |
| `-!value` | `-!1:2:3` | оператор like - и уменьшить таймер выполнения |
| `=value` | `=5:00` | установить таймер обратного отсчета на это время. |
| `=!value` | `=!5:00` | как оператор = и установить запущенный таймер на заданное время |
| `#ISO-Date` | `#2025-01-01T10:00:00` | установить таймер обратного отсчёта на заданное время. Время должно быть отформатировано как ISO-Datestring |
| `#!ISO-Date` | `#!2025-01-01T10:00:00` | как оператор # и установка работающего таймера на заданное целевое время |
| `$Time` | `$20:15` | установить таймер обратного отсчёта на заданное время. Если время раньше текущего, устанавливается следующий день. |
| `$!Time` | `$!20:15` | как оператор $ и установка работающего таймера на заданное целевое время |
| `start` | `start` | начинает обратный отсчет |
| `stop` | `stop` | останавливает обратный отсчет. время обратного отсчета сбрасывается до настройки |
| `pause` | `pause` | приостанавливает обратный отсчет |
| `end` | `end` | останавливает обратный отсчет. обратный отсчет устанавливается на 0 |
| `reset` | `reset` | сбросить таймер в состояние конфигурации |
| `setstop2timer` | `setstop2timer` | установить конфигурацию поведения остановки на таймер |
| `setstop2zero` | `setstop2zero` | установить конфигурацию поведения остановки на нули |
| `save` | `save` | сохранить конфигурацию, определенную в точках данных, в конфигурацию iobroker, iobroker автоматически перезапускает адаптер после сохранения |
| `save` | `save` | сохранить конфигурацию, определенную в точках данных, в конфигурацию iobroker, iobroker автоматически перезапускает адаптер после сохранения |

##### Формат значения для установки таймера обратного отсчета
Вы можете установить обратный отсчёт на неограниченное время.
Значение записывается в формате [дни:[часы:[минуты:[секунды]]]] дней, часы и минуты необязательны.
Если вы хотите установить таймер на один день, необходимо также установить часы, минуты и секунды. Соблюдать стандартные диапазоны значений (например, часы от 0 до 24) необязательно.

Вы также можете установить 48 часов.
При желании вы можете установить произвольные форматы времени. Время суммируется отдельно.

**Примеры:**

| настройка | описание |
| --------- | ------------------------------------------- |
| 1:0:0:0 | устанавливает/прибавляет/вычитает 1 день к таймеру |
| 2:0:0 | устанавливает/добавляет/вычитает 2 часа к таймеру |
| 3:0 | устанавливает/добавляет/отнимает 3 минуты к таймеру |
| 120 | устанавливает/прибавляет/вычитает 120 секунд к таймеру |
| 48:0:0 | устанавливает/добавляет/вычитает 48 часов к таймеру |
| 48:75:120 | устанавливает/прибавляет/вычитает таймер |

##### Формат шаблона для форматирования вывода обратного отсчета в виджете
Доступны следующие заполнители:

| заполнитель | описание |
| ----------- | --------------------------------------------------------------- |
| d | дни без начальных нулей |
| дд | дни с ведущими нулями |
| H | часы без начальных нулей |
| ЧЧ | часы с ведущими нулями |
| м | минуты без начальных нулей |
| мм | минуты с ведущими нулями |
| с | секунды без начальных нулей |
| сс | секунды с ведущими нулями |
| \ | Символ экранирования используется, если вы хотите использовать заполнитель в выходных данных |

**Примеры:**

Все последующие примеры с таймером обратного отсчета 1:2:3:4

| шаблон | пример | результат |
| ------------------ | --------------- | ------------------------------------------------ |
| d\d Hh m\m s\s | 1d 2h 3m 4s | с экранированными символами и без начальных нулей |
| дд\д ЧЧч мм\м сс\с | 01д 02ч 03м 04с | с экранированными символами и ведущими нулями |
| сс\с | 93784с | всего секунд |
| дд\д ЧЧ\ч | 01д 02ч | только дни и часы |
| ЧЧ\ч мм\м | 26ч 03м | только часы и минуты |

### Виджеты
Начиная с версии 1.2.0 виджеты должны быть совместимы с vis1 и vis2.

#### Виджет Обратный отсчет простой
Виджет обратного отсчета для простого текстового вывода

##### Свойства виджета
###### Оид
Точка данных таймера точки данных обратного отсчета.

###### Формат
Форматирует выходные данные таймера. По умолчанию — мм:сс. Подробнее см. в шаблоне формата главы.

##### Пример кода виджета
Виджеты предварительно настроены для обратного отсчёта под названием «тест».
Существует две отдельные версии для vis1 и vis2.

**ВИС1:**

<details><summary>Подробности</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;g_fixed&quot;:false,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:false,&quot;g_css_background&quot;:false,&quot;g_css_shadow_padding&quot;:false,&quot;g_css_border&quot;:false,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;format&quot;:&quot;d H ms&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;771px&quot;,&quot;top&quot;:&quot;143px&quot;,&quot;width&quot;:&quot;151px&quot;,&quot;height&quot;:&quot;16px&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;+10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;+10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;-10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;-10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;=10&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;=10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;start&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;start&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;pause&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;pause&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;stop&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;stop&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;}]</code></pre></details>

**ВИС2:**

<details><summary>Подробности</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;pause&quot;,&quot;value&quot;:&quot;pause&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000001&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;start&quot;,&quot;value&quot;:&quot;start&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000002&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;stop&quot;,&quot;value&quot;:&quot;stop&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000003&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+10&quot;,&quot;value&quot;:&quot;+10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000004&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=100&quot;,&quot;value&quot;:&quot;=100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000005&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-10&quot;,&quot;value&quot;:&quot;-10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000006&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+!10&quot;,&quot;value&quot;:&quot;+!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000007&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=!100&quot;,&quot;value&quot;:&quot;=!100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000008&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-!10&quot;,&quot;value&quot;:&quot;-!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000009&quot;},{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;countdown_format&quot;:&quot;dd\\d HH\\h mm\\m ss\\s&quot;,&quot;g_common&quot;:true,&quot;g_css_border&quot;:true,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;g_css_font_text&quot;:true},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;375.00001525878906px&quot;,&quot;width&quot;:&quot;182px&quot;,&quot;height&quot;:&quot;24px&quot;,&quot;border-width&quot;:&quot;0&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;rgba(237,235,243,1)&quot;,&quot;text-align&quot;:&quot;center&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;,&quot;_id&quot;:&quot;i000010&quot;}]</code></pre></details>

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Виджет Обратный отсчет простой
Виджет, показывающий время, прошедшее с заданного момента времени.

##### Свойства виджета обратного отсчета
| Точка данных | Описание |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datetime | Строка DateTime начального времени. Выражение должно интерпретироваться функцией JavaScript new Date(expression). См. также <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse>. Пример: 2022-01-10 23:12 или 2022-01-104T23:12:00.000Z |
| Формат | Форматирует выходные данные таймера. По умолчанию — мм:сс. Подробнее см. Шаблон формата главы |
| HTML-Prepend | Этот текст или HTML-код добавляется в начало вывода виджета |
| HTML-Append | Этот текст или HTML-код добавляется к выводу виджета |

#### Виджет Круг обратного отсчета
Виджет обратного отсчета в виде кольца/круга.

##### Свойства виджета круга обратного отсчета
| Точка данных | Описание |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| oid | Точка данных таймера точки данных обратного отсчета. |
| notimetext | Отключает текст времени поверх полярных часов |
| Формат | Форматирует выходные данные таймера. По умолчанию — мм:сс. Подробнее см. Шаблон формата главы. ReverseVerification для увеличения или уменьшения кольца/круга |
| Ширина | Ширина кольца или круга. |
| Зазор между кольцами | Зазор в пикселях между кольцами |
| Колпачки | Оправа для концов кольца/круга: круглая или прямая |
| фон | Цвет фона кольца/круга |
| передний план | Цвет переднего плана кольца/круга |
| showsec | Показать кольцо секунд |
| showmin | Показать кольцо минут |
| showhrs | Показать кольцо минут |
| showday | Показать кольцо дней |

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Виджет Обратный отсчет FlipClock
Виджет обратного отсчета в стиле табло аэропорта

##### Свойства виджета Countdown FlipClock
| Точка данных | Описание |
| -------------------------- | --------------------------------------------------------------- |
| oid | Точка данных таймера точки данных обратного отсчета. |
| countdown_showsec | Показывает секунды. Между двумя единицами не должно быть промежутка. |
| countdown_showmin | Показывает минуты. Между двумя единицами не должно быть разрыва. |
| countdown_showhrs | Показывает часть времени, выраженную в часах. Между двумя единицами не должно быть разрыва. |
| countdown_showday | Показывает часть суток. Между двумя единицами не должно быть разрыва. |
| countdown_color | Цвет таймера обратного отсчета |
| countdown_background_color | Цвет фона таймера обратного отсчета |
| countdown_dot_color | Цвет точек таймера обратного отсчета |

**Советы:**

Если вы хотите изменить размер обратного отсчета флип-часов, в настройках CSS в vis можно ввести половинный размер: Group CSS-Common / transform "scale(0.5)"

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Виджет обратного отсчета NixieClock
Виджет обратного отсчета в стиле Nixie-Tube/LED

##### Свойства виджета обратного отсчета NixieClock
| Точка данных | Описание |
| -------------------------- | --------------------------------------------------------------- |
| oid | Точка данных таймера точки данных обратного отсчета. |
| countdown_showsec | Показывает секунды. Между двумя единицами не должно быть промежутка. |
| countdown_showmin | Показывает минуты. Между двумя единицами не должно быть разрыва. |
| countdown_showhrs | Показывает часть времени, выраженную в часах. Между двумя единицами не должно быть разрыва. |
| countdown_showday | Показывает часть суток. Между двумя единицами не должно быть разрыва. |
| countdown_color_active | Цвет таймера обратного отсчета |
| countdown_color_inactive | Цвет неактивных цифр |
| countdown_opacity_inactive | Непрозрачность цвета неактивных цифр |
| countdown_glowcolor | Цвет свечения вокруг индикаторных цифр |

##### Советы
###### Верхние/нижние поля
Шрифт Lato слегка наклонён вниз, что создаёт неровные верхние и нижние поля. Это можно изменить, установив высоту и отрицательное верхнее поле.
Высота виджета составляет 1 em. Высоту можно задать непосредственно в свойствах виджета.

Для отрицательного поля необходимо создать класс CSS.

```css
#w00000 .cdclock {
margin-top: -5px;
}
```

###### Размер виджета до версии 2
Если вы хотите изменить размер обратного отсчета nixieclock, в настройках css в vis можно ввести половинный размер: Group CSS-Common / transform "scale(0.5)"

###### Центрирование часов Nixie
Для центрирования часов требуется дополнительный CSS-класс, так как соответствующие настройки невозможно настроить в настройках виджета:

```css
#w00000 {
  display: flex;
  justify-content: center;
}
```

#### Виджет Wordclock
Виджет для отображения часов с множеством опций

##### Свойства виджета Wordclock
| Точка данных | Описание |
| ----------------- | -------------------------------------------------------- |
| язык | Доступны несколько языков для Wordclock |
| letterActivated | Цвет выделенных слов |
| letterDeactivated | Цвет для обычных букв |
| wordclockMargin | Зазор между тактовой частотой и светодиодами |
| withMinutes | Отображать светодиоды минут в углу циферблата |
| minuteSize | Размер в пикселях светодиодов минуты |
| minuteColor | цвет светодиода минут |
| withSeconds | Показать светодиоды секунд на часах |
| secondSize | Размер светодиодов секунд в пикселях |
| secondColor | цвет светодиода секунд |
| часовой пояс | Отображается время выбранного часового пояса |

**Фактическое состояние действия (cdstop, cdrun, cdpause, cdend) обратного отсчета доступно как селектор CSS-класса:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

## Задача
- 7-сегментный дисплей
- скользящие числа
- настраиваемые шрифты
- ts: временные правила для исключения (диапазон времени, отдельные даты)
- ~~добавить часовой пояс для Wordclock~~
- ~~таймер Wordclock~~
- ~~планировщик по времени: планируйте отдельные даты/время и повторяющиеся события, как в Outlook~~
- ~~Стиль Никси~~
- ~~дисплей с перекидной доской (дисплей аэропорта)~~
- ~~новая команда для установки только целевого времени без даты~~
- ~~виджет круга обратного отсчета с возможностью отключения текста обратного отсчета
- ~~Разделитель групп '.' в имени~~
- ~~Полярные часы~~
- ~~обратный круг~~
- ~~круг с круглыми колпачками~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.0.1 (2025-09-08)

- major release: make nixie clock responsive. the users have to adjust the 
  font-size of the widget to get the old size.
  if you want the old size try it with 100px font-size.

### 1.4.7 (2025-07-25)

- remove types/request
- improve documentation format

### 1.4.6 (2025-07-21)

- fix wrong calc of datapoints in some cases

### 1.4.5 (2025-07-21)

- fix widget reverse countdown plain

### 1.4.4 (2025-06-16)

- fix stopbeaviour
- fix state handling
- improve validator vor name and setdp in admin

### 1.4.3 (2025-06-06)

- fix validation rule for the setDP button in admin

### 1.4.2 (2025-06-01)

- revert to node 18
- cleanup files and some details
- fix server time diff calculations

### 1.4.0 (2025-01-02)

- to update the time from the configuration i added a SetDP Button

### 1.3.0 (2025-01-02)

- switch to iobroker eslint
- adjust many code to follow the new rules
- add some jsdoc
- implement servertimediff calculation and correction
- fix datapoint names for the vis1 example controls
- set nogit
- adjust year in readme and license

### 1.2.2 (2024-11-18)

- improve readme
- improve widget js
- remove word test from widgets html, sorry

### 1.2.1 (2024-11-17)

- interprete all commands in lowercase

### 1.2.0 (2024-11-15)

- widgets are now compatible with vis2

### 1.1.1 (2024-11-13)

- fix problem with start of vis2, exclude widgets for vis2

### 1.1.0 (2024-11-12)

- IMPORTANT: Changed Datapoint names and datastructure for the configuration,
  no migration you have to enter all configurations again
- add some new commands to restart the countdown time in place
- repair save command
- removed vis dependency from io-package.json

### 1.0.15 (2024-11-11)

- repair issues from repochecker

### 1.0.14 (2024-11-11)

- improve test and release process
- update github workflow
- remove eslint command from package.json
- switch back to node 18 for testing due to airbnb error
- more repair
- add package-lock.json to git
- remove unused library
- add lint and lint
- remove iobroker eslint
- general revision
- updating the configuration dialogs for countdown and timeseries
  in jsonConfig and custom react

### 0.7.12

- add html_prepend and html_append properties to the widget reverse countdown

### 0.7.10

- add widget reverse countdown

### 0.7.9

- add more wordclock tests
- fix wordclock matrix swiss

### 0.7.8

- add timezone for wordclock

### 0.7.7

- add timezone for wordclock

### 0.7.6

- add tests for wordclock \* remove admin tab

### 0.7.5

- Remove comments in io-package

### 0.7.4

- fix spanish language pack

### 0.7.3

- add turkish language for wordclock

### 0.7.2

- add russian and espaniol language for wordclock

### 0.7.1

- add margin property for wordclock
- add italiano and francais for wordclock
- wordclock remove border

### 0.7.0

- New widget wordclock

### 0.6.1

- remove beta tag from widgets \* m,assive reengeneering of the react classes,
  add functions für exclusion rules, adding single time events
  and exclude single time events

### 0.6.0

- Introduction of new functionality timeseries

### 0.5.2

- fix an issue and introduce a new command save to save the configuration
  defined in datapoints to the iobroker configuration data

### 0.5.1

- Migration of old counters

### 0.5.0

- Change settings dialog to react

### 0.4.2

- performance optimization. mytime now checks the data from internal
  and did not read the data allways from datapoints | update dependencies

### 0.4.1

- widget cd flipclock: remove dot labels

### 0.4.0

- New widget NixieClock

### 0.3.1

- remove mytime tile in iobroker overview
- set initial visual countdown value to 0
- prefix css classes, due css artefacts from other adapters
  (eg kodi and css class stop)

### 0.3.0

- new command to set only target time without date
- countdown circle widget now with option to disable countdown text
- timers are now groupable in subdirectories.
  you can now enter dots (.) as a groupseperater in the name of a timer

### 0.2.1

- fix timer display in configuration dialog
- fix default template of countdown plain
- add icons for countdonw plain and countdown circle widgets
- fix startangle calculation for countdown circle if time values are 0
- remove timer intervals in editmode due to interfer with
  the configuration dialog and didnt save the ne values

### 0.2.0

- extend the countdown circle with more rings for days, hours and minutes

### 0.1.2

- Setting for growing or shrinking the ring/circle
- Setting for the ends of the ring/circle: round or straight
- Extend special char filtering with umlauts
- Fix state request issue in widget countdown circle

### 0.1.1

- Add a countdown name datapoint

### 0.1.0

- Forum release
- initial release

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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