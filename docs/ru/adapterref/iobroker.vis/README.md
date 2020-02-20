---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis/README.md
title: Визуализация
hash: xlDe+wAangAnbtsUYPvfwibsxkyTKWDgAO/nN7jD3tw=
---
![логотип](../../../en/adapterref/iobroker.vis/admin/vis.png)

![Количество установок](http://iobroker.live/badges/vis-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# Визуализация
WEB визуализация для платформы ioBroker.

## Установка и документация
![Демо интерфейс](img/user0.png) ![Демо интерфейс](../../../en/adapterref/iobroker.vis/img/user7.png)

[Демоверсии онлайн](https://iobroker.click/)

## Привязки объектов
Обычно большинство виджетов имеют атрибут ObjectID. И этот атрибут может быть связан с некоторым значением идентификатора объекта.
Но есть и другой вариант, как связать *любой* атрибут виджета с некоторым ObjectID.

Просто запишите в атрибут ```{object.id}```, и он будет привязан (не в режиме редактирования) к значению этого объекта.
Если вы будете использовать специальный формат, вы можете даже сделать несколько простых операций с ним, например, умножение или форматирование.
Паттен имеет следующий формат:

```
{objectID;operation1;operation2;...}
```

Поддерживаются следующие операции:

- `\ *` - умножение. Аргумент должен быть в скобках, например "* (4)". В этом примере мы умножаем значение на 4.
- `\ +` - добавить. Аргумент должен быть в скобках, например "+ (4.5)". В этом примере мы добавляем значение 4.5.
- `\ -` - вычесть. Аргумент должен быть в скобках, например "- (- 674.5)". В этом примере мы вычитаем из значения -674,5.
- `/` - деление. Аргумент должен быть в скобках, например "/(0.5)". В этом примере мы делим значение на 0,5.
- `%` - по модулю. Аргумент должен быть в скобках, например "% (5)". В этом примере мы берем модуль 5.
- 'round' - округлить значение.
- `round (N)` - округлить значение с N местами после точки, например, 34,678; раунд (1) => 34,7
- `hex` - преобразовать значение в шестнадцатеричное значение. Все буквы в нижнем регистре.
- `hex2` - преобразовать значение в шестнадцатеричное значение. Все буквы в нижнем регистре. Если значение меньше 16, то будет добавлен начальный ноль.
- `HEX` - то же, что и гекс, но в верхнем регистре.
- `HEX2` - аналогично hex2, но в верхнем регистре.
- `date` - формат даты в соответствии с заданным форматом. Формат такой же, как в [iobroker.javascript] (https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate)
- `min (N)` - если значение меньше N, взять N, иначе
- `max (M)` - если значение больше M, взять M, в противном случае значение
- `sqrt` - квадратный корень
- `pow (n)` - мощность Н.
- `pow` - сила 2.
- `floor` - Math.floor
- `ceil` - Math.ceil
- `random (R)` - Math.random () * R или просто Math.random (), если нет аргументов
- `formatValue (десятичные дроби)` - форматировать значение в соответствии с настройками системы и использовать десятичные дроби
- `date (format)` - форматировать значение как дату. Формат такой: "ГГГГ-ММ-ДД чч: мм: сс.ссс"
- `array (element1, element2 [, element3, element4])` - возвращает элемент индекса. например: `{id.ack; массив (ack равен false, ack равен true)}`

Вы можете использовать этот шаблон в любом тексте, например

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

или цветовые расчеты:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Чтобы показать метку времени объекта, напишите `.ts` или `.lc` (для последнего изменения) в конце идентификатора объекта, например:

```
Last change: {objectRed.lc;date(hh:mm)}
```

Есть еще одна возможность написать шаблон:

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}` будет интерпретироваться как функция:

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

Вы можете использовать *любые* функции JavaScript. Аргументы должны быть определены с помощью ':', в противном случае это будет интерпретировано как формула.

Позаботьтесь о типах. Все они определены как строки. Чтобы убедиться, что это значение будет считаться числом, используйте функцию parseFloat.

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Специальные привязки
Существует несколько различных внутренних привязок для предоставления дополнительной информации в представлениях:

* `username` - показывает зарегистрированного пользователя
* `view` - название фактического вида
* `wname` - имя виджета
* `widget` - это объект со всеми данными виджета. Может использоваться только в части JS, например `{a: a; widget.data.name}`
* `wid` - название актуального виджета
* `language` - может быть` de`, `en` или` ru`.
* `instance` - экземпляр браузера
* `login` - если требуется вход в систему или нет (например, показать / скрыть кнопку выхода из системы)

Примечание: чтобы использовать «:» в вычислениях (например, в строковой формуле), используйте вместо него «::».

** Помните **, что определения стиля будут интерпретироваться как привязки, поэтому используйте `{{style: value}}` или просто

```
{
	style: value
}
```

для этого.

## Фильтры
Для визуализации одного вида всего количества виджетов вы можете использовать фильтры, чтобы уменьшить количество виджетов, одновременно отображаемых в представлении.

У каждого виджета есть поле `filter`. Если вы установите его на какое-то значение, например, `light`, так что вы можете использовать другой виджет `(bars - filters, filter - dropdown)` для управления тем, какой фильтр действительно активен.

## Интерфейс управления
Vis создает 3 переменные:

- `control.instance` - Здесь должен быть записан экземпляр браузера или FFFFFFFF, если необходимо управлять каждым браузером.
- `control.data` - Параметр для команды. Смотрите описание конкретной команды.
- `control.command` - Имя команды. Запись этой переменной запускает команду. Это означает, что перед записью команды «экземпляр» и «данные» должны быть подготовлены с данными.

Команды:

* `alert` - показывать окно предупреждения в vis. «control.data» имеет следующий формат «message; title; jquery-icon». Заголовок и JQuery-значок не являются обязательными. Имена значков можно найти [здесь] (http://jqueryui.com/themeroller/). Чтобы отобразить иконку «ui-icon-info», напишите `` `Message ;; info```.
* `changeView` - переключиться на нужный вид. «control.data» должен иметь имя view. Вы также можете указать название проекта как «проект / вид». Проект по умолчанию "основной".
* `refresh` - перезагрузить vis, например, после изменения проекта для перезагрузки во всех браузерах.
* `reload` - так же, как обновить.
* `dialog` - Показать диалоговое окно. Диалог должен существовать на виду. Один из:

    - `static - HTML - Dialog`,
    - `Статика - Иконка - Диалог`,
    - `контейнер - HTML - просмотр в jqui Dialog`,
    - `container - ext cmd - просмотреть в jqui Dialog`,
    - `Контейнер - Иконка - просмотр в jqui Dialog`,
    - `Контейнер - Кнопка - просмотр в jqui Dialog`.

    `control.data` должен иметь идентификатор диалогового виджета, например, `w00056`.

* `dialogClose`
* `popup` - открывает новое окно браузера. Ссылка должна быть указана в `control.data`, например http://google.com
* `playSound` - воспроизвести звуковой файл. Ссылка на файл указана в `control.data`, например, http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Вы можете загрузить свой собственный файл в vis и позволить ему воспроизводиться, как, например, `/vis.0/main/img/myFile.mp3`.

Если пользователь изменит представление или при запуске переменные будут заполнены с помощью

- `control.instance`: экземпляр браузера и` ack = true`
- `control.data`: имя проекта и представления в форме` project / view`, например `main / view` (и` ack = true`)
- `control.command`: `ifiedView` и` ack = true`

Вы можете записать JSON-строку или Object в control.command как `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`. В этом случае экземпляр и данные будут взяты из объекта JSON.

Пример для адаптера JavaScript:

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Вид по умолчанию
Вы можете определить для каждого вида желаемое разрешение (Меню => Инструменты => Разрешение). Это только визуальная граница в режиме редактирования, показывающая размер экрана на определенном устройстве. В режиме реального времени он не будет виден и все виджеты за пределами границы будут видны.

Кроме того, вы можете определить, должно ли это представление использоваться по умолчанию для этого разрешения.

Таким образом, каждый раз, когда вызывается `index.html` (без `#viewName`), открывается наиболее подходящий для этого разрешения вид.
Если только один вид имеет флаг *«По умолчанию»* то этот вид будет открыт независимо от разрешения экрана или ориентации.

Например. Вы можете создать два вида «Пейзаж-Мобильный» и «Портрет-Мобильный», и эти два вида будут автоматически переключаться при изменении ориентации или размера экрана.

Существует вспомогательный виджет «basic - Screen Resolution», который показывает фактическое разрешение экрана и наиболее подходящий вид по умолчанию для этого разрешения.

## Настройки
### Перезагрузить, если спать дольше, чем
Существует правило, что после некоторого периода отключения вся страница VIS будет перезагружена для синхронизации проекта.
Вы можете настроить его в меню «Настройки ...». Если вы установите интервал «никогда», то страница никогда не будет перезагружена.

### Восстановить интервал
Установите интервал между попытками подключения, если он отключен. Если вы установите 2 секунды, он будет пытаться установить соединение каждые 2 секунды.

### Темный экран переподключения
Иногда (ночью) требуется темный экран загрузки. С помощью этой опции вы можете установить его.

Обратите внимание, что эти настройки действительны только для повторного подключения, а не для первого подключения.

![Темно](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

## Changelog
### 1.2.3 (2019-12-14)
* (bluefox) Small changes in license handling were made

### 1.2.2 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined adn null.

### 1.2.1 (2019-09-10)
* (bluefox) fixed upload of files

### 1.2.0 (2019-05-07)
* (bluefox) add translations

### 1.1.11 (2019-02-07)
* (bluefox) improve Bool HTML

### 1.1.10 (2019-01-30)
* Add Chinese support

### 1.1.8 (2018-10-29)
* (bluefox) File dialog was corrected

### 1.1.7 (2018-07-24)
* (bluefox) view8 corrected

### 1.1.6 (2018-07-18)
* (bluefox) support of new variables (see [Special bindings](#special-bindings) )
* (bluefox) fix error if fast view changes
* (bluefox) fix "jqui - ctrl - IconState / val - Icon Bool"

### 1.1.5 (2018-06-10)
* (bluefox) show more information if widget cannot be rendered
* (bluefox) fix saving of widgets if they have bindings
* (bluefox) show error stack
* (bluefox) fix binding
* (Apollon77) fix testing
* (bluefox) fix for iobroker.pro and external socket.io settings
* (bluefox) A user variable was added into bindings.
* (bluefox) Fixed widget tabs

### 1.1.4 (2018-04-23)
* (bluefox) fix bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) ignore click by scrolling on touch devices
* (bluefox) remove wrong state vis.0.command
* (bluefox) fix error with jplot
* (bluefox) better widget behaviour in edit Mode (basic, jqui)
* Fix config dialog

### 1.1.2 (2018-02-02)
* (bluefox) Fixing the saving of project
* (bluefox) Fixing the background selector
* (bluefox) Fixing the null pointer problem
* (bluefox) Fixing the selection helper
* Update translations

### 1.1.1 (2018-01-07)
* (bluefox) The problem with view change on the touch devices fixed

### 1.0.5 (2017-11-19)
* (bluefox) show number of datapoints in every project

### 1.0.4 (2017-10-22)
* (bluefox) Add autocomplete for view CSS options
* (bluefox) change edit of view CSS background options

### 1.0.3 (2017-10-20)
* (bluefox) Fix parse of invalid bindings
* (bluefox) add moment.js

### 1.0.0 release candidate (2017-10-13)
* (bluefox) fix iframe and image updates
* (bluefox) fix fonts

### 0.15.7 (2017-10-01)
* (bluefox) allow update of images without additional query (but it works only in spome very specific cases)
* (bluefox) zoom of iframes

### 0.15.5 (2017-07-24)
* (bluefox) Fix widgets upload

### 0.15.4 (2017-07-19)
* (bluefox) Add swipe

### 0.15.3 (2017-07-12)
* (bluefox) Add full screen widget
* (bluefox) Fix timestamp widget

### 0.15.2 (2017-07-07)
* (bluefox) Fix binding if it has "-" in the OID

### 0.15.1 (2017-06-30)
* (bluefox) Fix error with context menu
* (bluefox) Allow add class to view

### 0.15.0 (2017-05-25)
* (bluefox) fix copy of grouped widgets
* (bluefox) fix subscribe if empty states

### 0.14.7 (2017-05-19)
* (bluefox) add templates

### 0.14.6 (2017-05-16)
* (bluefox) Fix error by groups selection
* (apollon77) fix jqui-dialog for auto-open

### 0.14.3 (2017-05-11)
* (bluefox) fix export/import of groupped widgets

### 0.14.2 (2017-04-29)
* (bluefox) Fix install error

### 0.14.1 (2017-04-27)
* (bluefox) move beta to main
* (bluefox) fix choose filter
* (bluefox) fix error if some views do not exist
* (bluefox) fix binding problem, e.g. "a:-45?0" was detected as variable too.
* (bluefox) fix some font sizes
* (bluefox) fix undo
* (bluefox) fix themes change
* (bluefox) optimize load of pages
* (bluefox) check license
* (bluefox) fix basic views 8
* (bluefox) fix time picker if opened in dialog

### 0.14.0 (2017-04-10)
* (bluefox) add mandatory license input

### 0.12.7 (2017-02-09)
* (bluefox) prepare beta

### 0.12.6 (2017-01-29)
* (pmant) fix view copy
* (pmant) Improvements to context menu
* (pmant) usability improvements for both view dropdowns
* (bluefox) small fix of dragging

### 0.12.6 (2017-01-29)
* (pmant) add dropdown menu to views bar
* (pmant) sort widgets widget selector by name
* (bluefox) fix groupAttr in signals and visibility

### 0.12.2 (2016-12-04)
* (bluefox) fix errors with grouping

### 0.12.1 (2016-11-30)
* (bluefox) fix errors with containers

### 0.12.0 (2016-11-24)
* (bluefox) subscribe mode for faster state loading
* (bluefox) add grouping

### 0.10.15 (2016-11-06)
* (bluefox) remove weather-adapter.html
* (bluefox) clean config.js
* (bluefox) remove old widgets
* (bluefox) improve authentication in app
* (bluefox) allow creation of instance from helper widget

### 0.10.14 (2016-10-09)
* (bluefox) fix rendering of widgets
* (bluefox) working on relative positions.
* (bluefox) destroy widgets before views deletion

### 0.10.13 (2016-09-23)
* (bluefox) fixed errors for iPad 1
* (bluefox) start wokring on relative positions

### 0.10.12 (2016-09-16)
* (bluefox) group specific visibility of widgets and views

### 0.10.11 (2016-09-15)
* (bluefox) fix for iOS 10
* (bluefox) allow disabling of groups for performance

### 0.10.10 (2016-09-14)
* (bluefox) add text2speech widget
* (bluefox) try to fix problem with iOS 10

### 0.10.9 (2016-09-04)
* (bluefox) support of web-sockets force
* (bluefox) destory unused views after 30 seconds
* (bluefox) do not show middle leading lines if top and bottom are shown
* (bluefox) let timestamp and lastchange to show time as interval

### 0.10.7 (2016-07-09)
* (bluefox) add settings to reload vis
* (bluefox) add dark reload screen
* (bluefox) fix reload interval
* (bluefox) export/import
* (bluefox) add global script
* (bluefox) add 'not exist'/'not consist'/'exist' to signal and visibility
* (bluefox) fix oids in editor

### 0.10.5 (2016-06-15)
* (bluefox) fix select ID dialog
* (bluefox) add align help lines
* (bluefox) never store data in non-edit mode

### 0.10.4 (2016-06-14)
* (bluefox) fix drag and resize
* (Patrick) fix QuoJS
* (bluefox) support of milliseconds in formatDate
* (bluefox) support of getHistory
* (bluefox) support of show history instances
* (bluefox) grid
* (bluefox) add previews

### 0.10.3 (2016-05-30)
* (bluefox) update canJS
* (pmant) fixes bugs with dialogs on touchscreens
* (bluefox) speedUP show attributes at 300ms
* (bluefox) fix click on widget if signal is active

### 0.10.2 (2016-05-24)
* (bluefox) fix widgets with timestamps

### 0.10.1 (2016-05-23)
* (bluefox) change version

### 0.10.0 (2016-05-23)
* (bluefox) translates
* (bluefox) fix 'no widgets selected'
* (bluefox) change widget icons
* (bluefox) add signals
* (bluefox) add app.css for cordova
* (bluefox) change icons preview
* (bluefox) show properties of widget as icon
* (bluefox) fix error with external commands
* (bluefox) add types icon to preview
* (bluefox) support edit on iPad1
* (bluefox) change security settings

## License
 Copyright (c) 2013-2019 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).