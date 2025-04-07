---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2/README.md
title: Визуализация следующего поколения для ioBroker: vis-2
hash: +gQBHhjWr1btYQuxCNfxzV+Ri9IifKMao92H+Op36D8=
---
![Логотип](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/admin/vis-2.png)

![Количество установок](http://iobroker.live/badges/vis-2-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.vis-2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2.png?downloads=true)

# Визуализация следующего поколения для ioBroker: vis-2
WEB-визуализация для платформы ioBroker.

## Обзор
- [Требования к лицензии](#license-requirements)
- [Установка и документация](#installation--documentation)
- [Привязки объектов](#bindings-of-objects)
- [Фильтры](#фильтры)
- [Интерфейс управления](#control-interface)
- [Вид по умолчанию](#default-view)
- [Система разрешений](#permissions-system)
- [Настройки](#настройки)
- [SVG и текущий цвет](#svg-and-currentcolor)

## Установка и документация
![Демонстрационный интерфейс](packages/iobroker.vis-2/img/user0.png) ![Демонстрационный интерфейс](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/img/user7.png)

[Онлайн-демонстрации](https://iobroker.click/)

## Привязки объектов
Обычно большинство виджетов имеют атрибут ObjectID, и этот атрибут может быть связан с некоторым значением идентификатора объекта.
Но есть и другой вариант, как связать *любой* атрибут виджета с некоторым ObjectID.

Просто запишите в атрибут `{object.id}`, например, `{hm-rpc.0.OEQ1880105.4.ACTUAL_TEMPERATURE}`, и он будет привязан к значению этого объекта.
Если вы используете специальный формат, вы даже можете выполнять с ним некоторые простые операции, например, умножение или форматирование.

Например, чтобы вычислить гипотенузу треугольника:

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(h*h + w*w))}` будет интерпретироваться как функция:

```js
value = await (async function () {
    var h = (await getState('javascript.0.myCustom.height')).val;
    var w = (await getState('javascript.0.myCustom.width')).val;
    return Math.max(20, Math.sqrt(h * h + w * w));
})();
```

или

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}` просто умножит высоту на ширину.

Вы можете использовать *любые* функции javascript (браузера). Аргументы должны быть определены с помощью ':', в противном случае они будут интерпретироваться как формула.

Будьте осторожны с типами. Все они определены как строки. Чтобы быть уверенным, что значение будет обработано как число, используйте функцию parseFloat.

Таким образом, наш расчет гипотенузы будет следующим:

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Устаревший формат
Паттен имеет следующий формат:

```
{objectID;operation1;operation2;...}
```

Поддерживаются следующие операции:

- `*` - умножение. Аргумент должен быть в скобках, например "*(4)". В этом примере мы умножаем значение на 4.
- `+` - сложение. Аргумент должен быть в скобках, например "+(4.5)". В этом примере мы прибавляем к значению 4.5.
- `-` - вычитание. Аргумент должен быть в скобках, например "-(-674.5)". В этом примере мы вычитаем из значения -674.5.
- `/` - деление. Аргумент должен быть в скобках, например "/(0.5)". В этом примере мы делим значение на 0.5.
- `%` - по модулю. Аргумент должен быть в скобках, например "%(5)". В этом примере мы берем по модулю 5.
- `round` - округлить значение.
- `round(N)` - округлить значение до N знаков после точки, например, 34,678; round(1) => 34,7
- `hex` - преобразовать значение в шестнадцатеричное значение. Все буквы строчные.
- `hex2` - преобразовать значение в шестнадцатеричное значение. Все буквы строчные. Если значение меньше 16, то будет добавлен начальный ноль.
- `HEX` - то же, что и hex, но в верхнем регистре.
- `HEX2` - то же, что и hex2, но в верхнем регистре.
- `date` - форматировать дату согласно заданному формату. Формат такой же, как в [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate)
- `min(N)` - если значение меньше N, берется N, иначе значение
- `max(M)` - если значение больше M, берется M, иначе значение
- `sqrt` - квадратный корень
- `pow(n)` - степень числа N.
- `pow` - степень двойки.
- `этаж` - Математика.этаж
- `ceil` - Математика.ceil
- `json` - операция для получения json или свойства объекта. Например, `{id;json(common.name.en)}`
- `random(R)` - Math.random() * R, или просто Math.random(), если нет аргумента
- `formatValue(decimals)` - форматировать значение в соответствии с настройками системы и использовать десятичные знаки
- `date(format)` - форматировать значение как дату. Формат такой: "YYYY-MM-DD hh:mm:ss.sss"
- `momentDate(format, useTodayOrYesterday)` - форматировать значение как дату с помощью Moment.js. [Утвержденные форматы должны быть введены в соответствии с библиотекой moment.js](https://momentjs.com/docs/#/displaying/format/). При использовании `useTodayOrYesterday=true` формат `moment.js` `ddd`/`dddd` перезаписывается на сегодня / вчера
- `array(element1,element2[,element3,element4])` - возвращает элемент индекса. Например: `{id.ack;array(ack is false,ack is true)}`

Вы можете использовать этот шаблон в любом тексте, например

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

или расчеты цвета:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Чтобы отобразить временную метку объекта, напишите `.ts` или `.lc` (для последнего изменения) в конце идентификатора объекта, например:

```
Last change: {objectRed.lc;date(hh:mm)}
```

### Специальные крепления
Существует ряд различных внутренних привязок для предоставления дополнительной информации в представлениях:

* `username` - показывает вошедшего в систему пользователя
* `view` - имя актуального вида
* `wname` - имя виджета
* `widget` - это объект со всеми данными виджета. Может использоваться только в части JS, как `{a:a;widget.data.name}`
* `widgetOid` - используйте OID виджета для назначения значения виджета в разделе назначения, например `{t:widgetOid.val;t}`
* `wid` - имя фактического виджета
* `язык` - может быть `de`, `en` или `ru`.
* `instance` - экземпляр браузера
* `login` - требуется ли вход в систему или нет (например, чтобы показать/скрыть кнопку выхода)
* `local_*` - если имя состояния начинается с `local_`, оно не будет передано в ioBroker, но обновит все виджеты, зависящие от этого состояния. (Локальная переменная для текущего сеанса браузера)

Примечание: чтобы использовать «:» в вычислениях (например, в строковой формуле), используйте вместо этого «::».

**Помните**, что определения стилей будут интерпретироваться как привязки, поэтому используйте `{{style: value}}` или просто

```
{
	style: value
}
```

для этого.

## Фильтры
Чтобы визуализировать на одном экране все количество виджетов, вы можете использовать фильтры, чтобы уменьшить количество виджетов, одновременно отображаемых на экране.

Каждый виджет имеет поле `filter`. Если вы установите для него какое-либо значение, например, `light`, то вы сможете использовать другой виджет `(bars - filters, filter - dropdown)`, чтобы контролировать, какой фильтр на самом деле активен.

## Интерфейс управления
Vis создает 3 переменные:

- `control.instance` - Здесь следует указать экземпляр браузера или `FFFFFFFF`, если необходимо контролировать каждый браузер.
- `control.data` - Параметр для команды. Смотрите описание конкретной команды.
- `control.command` - Имя команды. Запись этой переменной запускает команду. Это означает, что перед тем, как команда будет записана, "instance" и "data" должны быть подготовлены с данными.

Команды:

* `alert` - показать окно оповещения в vis-2. "control.data" имеет следующий формат "message;title;jquery-icon". Title и jquery-icon являются необязательными. Имена иконок можно найти [здесь](http://jqueryui.com/themeroller/). Чтобы показать иконку "ui-icon-info", напишите `Message;;info`.
* `changeView` - переключиться на желаемый вид. "control.data" должен иметь имя вида. Вы также можете указать имя проекта как `project/view`. Проект по умолчанию - `main`.
* `refresh` - перезагрузка vis-2, например, после изменения проекта для перезагрузки во всех браузерах.
* `reload` - то же, что и refresh.
* `dialog` - Показать диалоговое окно. Диалог должен существовать в представлении. Один из:

- `статичный - HTML - Диалог`,
- `статичный - Значок - Диалог`,
- `контейнер - HTML - просмотр в диалоге jqui`,
- `контейнер - ext cmd - просмотр в диалоге jqui`,
- `контейнер - значок - просмотр в диалоговом окне jqui`,
- `контейнер - кнопка - просмотр в диалоге jqui`.

`control.data` должен иметь идентификатор диалогового виджета, например, `w00056`.

* `dialogClose`
* `popup` - открывает новое окно браузера. Ссылку необходимо указать в `control.data`, например, http://google.com
* `playSound` - воспроизвести звуковой файл. Ссылка на файл указывается в `control.data`, например, http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

Вы можете загрузить свой собственный файл в vis-2 и воспроизвести его, например, как `/vis-2.0/main/img/myFile.mp3`.
**Важно** браузер не может воспроизводить аудио, пока пользователь не нажмет хотя бы один раз на странице. Это политика безопасности браузера. [Здесь](https://github.com/Hugo22O/chrome-autoplay) вы можете прочитать больше.

Если пользователь изменит вид или в начале, переменные будут заполнены vis-2 с

- `control.instance`: экземпляр браузера и `ack=true`
- `control.data`: имя проекта и представления в форме `project/view`, например `main/view` (и `ack=true`)
- `control.command`: `changedView` и `ack=true`

Вы можете записать строку JSON или объект в `control.command` как `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`. В этом случае экземпляр и данные будут взяты из объекта JSON.

Пример для адаптера JavaScript:

```js
setState('vis-2.0.control.command', { instance: '*', command: 'refresh', data: ''});
```

Если вы записываете JSON в виде строки, убедитесь, что ее можно проанализировать, например, `{"instance": "*", "command": "refresh", "data": ""}`, обратите внимание на `"`.

## Вид по умолчанию
Вы можете определить для каждого вида желаемое разрешение (Меню=>Инструменты=>Разрешение). Это только визуальная граница в режиме редактирования, чтобы показать вам размер экрана на определенном устройстве. В режиме реального времени она не будет видна, и все виджеты за пределами границы будут видны.

Кроме того, вы можете определить, следует ли использовать этот вид по умолчанию для данного разрешения.

Таким образом, каждый раз, когда вызывается `index.html` (без `#viewName`), будет открываться наиболее подходящий для этого разрешения вид.
Если только один вид имеет флаг *"По умолчанию"*, то этот вид будет открываться независимо от разрешения экрана или ориентации.

Например, вы можете создать два вида: «Альбомный-Мобильный» и «Портретный-Мобильный», и эти два вида будут автоматически переключаться при изменении ориентации или размера экрана.

Существует вспомогательный виджет «basic - Screen Resolution», который показывает фактическое разрешение экрана и наиболее подходящий вид по умолчанию для этого разрешения.

## Система разрешений
### Проект
В диалоговом окне управления проектом вы можете настроить разрешения `read` и `write` для каждого пользователя ioBroker.

Флаг `read` означает, что проект доступен для этого пользователя в среде выполнения.
Флаг `write` означает, что проект доступен для этого пользователя в режиме редактирования.

При создании нового пользователя с помощью адаптера ioBroker Admin он по умолчанию будет иметь оба разрешения.

### Вид
Вы также можете указать, к каким представлениям пользователю разрешен доступ для режима выполнения и редактирования.
Если одно из прав доступа не предоставлено на уровне проекта, указание их на уровне представления не имеет никакого эффекта, поскольку проект в целом не будет доступен.

Обратите внимание, что всякий раз, когда вы пытаетесь получить доступ к представлению, на которое у текущего пользователя нет прав, вместо этого пользователь увидит панель выбора проекта.

### Виджет
Если у пользователя нет разрешений `read`, виджет не будет отображаться в среде выполнения. Если у пользователя нет разрешений `write`, виджет не будет отображаться в режиме редактирования.

## Настройки
### Перезагрузить, если сон дольше, чем
Существует правило, что после некоторого периода отключения вся страница VIS будет перезагружена для синхронизации проекта. Вы можете настроить это в меню «Настройки...». Если вы установите интервал на «никогда», то страница никогда не будет перезагружена.

### Интервал повторного подключения
Установите интервал между попытками подключения в случае отключения. Если вы установите 2 секунды, он будет пытаться установить соединение каждые 2 секунды.

### Темный экран повторного подключения
Иногда (ночью) требуется тёмный экран загрузки. С помощью этой опции вы можете это настроить.

Обратите внимание, что эти настройки действительны только для повторного подключения, а не для первого подключения.

![Темный](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/img/dark_screen.png)

## SVG и текущий цвет
Ключевое слово currentColor в CSS позволяет элементам наследовать текущий цвет текста от родительского элемента. Это может быть особенно полезно в SVG (масштабируемая векторная графика), поскольку обеспечивает более динамичную стилизацию и более простую интеграцию с содержимым HTML.

Вы можете использовать ключевое слово currentColor вместо определенного значения цвета для любого свойства внутри SVG, которое принимает значение цвета.
Вот простой пример с кругом в SVG:

```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>
```

В этом случае, если SVG принимает цвет родительского элемента. Например, если он использовался в меню, а меню красное, круг будет красным.

## Разработка и отладка
Для внесения корректировок в сам редактор vis-2, поиска ошибок и отладки необходимо выполнить следующие шаги.

1. создайте форк репозитория iobroker/iobroker.vis-2 в своей учетной записи через пользовательский интерфейс GitHub

2. клонируйте репозиторий в каталог. скопируйте URL-адрес из вашего репозитория GitHub. Команда выглядит так:

```shell
git clone https://github.com/<your profile name>/ioBroker.vis-2.git
```

3. откройте загруженный репозиторий с помощью вашей IDE

4. Чтобы установить и загрузить все необходимые библиотеки, выполните следующую команду в терминале в корневом каталоге репозитория

```shell
npm run install-monorepo
```

5. Чтобы запустить редактор в браузере, выполните следующую команду.

Отдельно запущенный экземпляр сервера iobroker должен быть доступен на порту 8082.

```shell
npm run start
```

- Отладка доступна в браузере, например Chrome F12
- при изменении файла поддерживается автоматическая перезагрузка редактора

## То, что нужно сделать
<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Added new SVG icon as favicon.

### 2.11.2 (2025-01-23)
* (@GermanBluefox) Do not load vis-1 widgets if vis-2 widgets provided

### 2.11.1 (2024-12-02)
* (@GermanBluefox) Corrected navigation menu
* (@GermanBluefox) Migrated widgets to React: basic - frame, basic - note, basic - logout 
* (@GermanBluefox) Added the HTML rebuild button to settings
* (@GermanBluefox) Backend was migrated to TypeScript

### 2.10.8 (2024-11-22)
* (bluefox) Added new option for view: "Limit only for instances"

### 2.10.7 (2024-07-23)
* (bluefox) Optimization of the module federation

### 2.10.6 (2024-07-20)
* (bluefox) Improved the typing in typescript

### 2.10.4 (2024-07-16)
* (bluefox) Corrected the jumping by object selection
* (bluefox) Implemented swipe widget

### 2.10.3 (2024-07-11)
* (bluefox) Converted the CanJSWidget to typescript
* (bluefox) Added "clone" button to the attribute groups

### 2.10.2 (2024-07-10)
* (bluefox) Removed incompatible package for styles
* (bluefox) All widgets must be updated
* (bluefox) The basic input value widget was migrated to ReactJS

### 2.9.64 (2024-05-23)
* (bluefox) Added possibility to clear a text field by button

### 2.9.63 (2024-05-15)
* (bluefox) Migrated some files to typescript

### 2.9.60 (2024-05-07)
* (foxriver76) test automatic release

### 2.9.53 (2024-05-06)
* (bluefox) Allowed applying styles to jQui buttons

### 2.9.52 (2024-04-25)
* (bluefox) Navigation was improved: adjustable menu width and bulk edit were added

### 2.9.50 (2024-04-19)
* (bluefox) Corrected widget in widget behavior

### 2.9.49 (2024-04-11)
* (bluefox) Corrected the scroll buttons in Tabs widget
* (bluefox) Corrected resizers if the border width is set

### 2.9.48 (2024-03-30)
* (bluefox) Showed selected view in the view dialog
* (bluefox) Added customization of loading screen
* (bluefox) Respected the sentry disable flag in GUI

### 2.9.42 (2024-03-09)
* (bluefox) Allowed limiting the view size only on desktop
* (bluefox) Change word "Filter" to "Search"

### 2.9.40 (2024-03-05)
* (bluefox) Migrated the filter widget to react
* (bluefox) Migrated the basic link widget to react

### 2.9.39 (2024-03-01)
* (foxriver76) allow to use `widgetOid` in bindings
* (foxriver76) fixed various problems with Date Picker widget
* (foxriver76) made default option of Date Picker human readable and added option for full parseable date
* (bluefox) Added the possibility to add suffix by navigation widgets
* (bluefox) Improved the license manager

### 2.9.37 (2024-02-28)
* (foxriver76) TimePicker widget now saves the time instead of date by default, if you want old behavior use checkbox `asDate`

### 2.9.36 (2024-02-27)
* (foxriver76) fixed project-specific css not being applied

### 2.9.35 (2024-02-27)
* (foxriver76) user-specified css has now priority over widgets css
* (foxriver76) fixed crash case for broken grouped widgets

### 2.9.34 (2024-02-26)
* (foxriver76) detect admin user correctly in project permissions dialog

### 2.9.33 (2024-02-21)
* (foxriver76) fixed issue that last image is never shown in image8 widget
* (foxriver76) added possibility to define background and title color for jqui dialog
* (foxriver76) make it possible to click through signal image if in front of widget

### 2.9.32 (2024-02-16)
* (foxriver76) implemented buttons to show or hide all views in views manager
* (foxriver76) fixed issue with signals on RxWidgets
* (foxriver76) allow disabling Sentry only for this instance

### 2.9.31 (2024-02-06)
* (foxriver76) apply default overflow correctly
* (foxriver76) navigation style fixes (fix an icon background and allow to customize header text color)

### 2.9.30 (2024-02-06)
* (foxriver76) global css will no longer be deleted on adapter upload/update
* (foxriver76) allowed modifying style of navigation

### 2.9.29 (2024-02-05)
* (foxriver76) fixed multiple problems with nested groups
* (foxriver76) also made group/ungroup commands working in group view
* (foxriver76) allowed selecting widgets in a group via click (previously only dropdown worked)
* (foxriver76) fixed issue, that Basic Image 8 is not configurable for value 0

### 2.9.28 (2024-02-03)
* (foxriver76) correctly determine the vis instance in all cases

### 2.9.26 (2024-02-02)
* (foxriver76) do not show empty icon category if jquery style selected for jquery button widgets
* (foxriver76) added possibility to hide navigation after selection

### 2.9.25 (2024-01-29)
* (foxriver76) fixed resizing issue for relative widgets
* (foxriver76) do not crash when using visibility "only for groups"
* (foxriver76) do not crash if a widget tries to update widget on non-existent view

### 2.9.24 (2024-01-24)
* (foxriver76) Image 8 widget ported to react

### 2.9.23 (2024-01-24)
* (foxriver76) fixed another bug due to previous versions

### 2.9.22 (2024-01-22)
* (foxriver76) try to fix problems introduced with 2.9.21

### 2.9.21 (2024-01-19)
* (foxriver76) fixed crash case when fixing widgets
* (foxriver76) fixed bug, that opacity is applied twice on image edit mode overlay

### 2.9.20 (2024-01-18)
* (foxriver76) increased timeout for project import
* (foxriver76) added permissions on widget level

### 2.9.19 (2024-01-17)
* (foxriver76) fixed issue when resizing widget from the left side
* (foxriver76) added select box to dimension attributes if multiple widgets selected

### 2.9.18 (2024-01-15)
* (foxriver76) fixed issue that old attributes value is shown in some scenarios
* (foxriver76) dedicated permission system extended to view level

### 2.9.17 (2024-01-13)
* (foxriver76) dedicated permission system on project level introduced

### 2.9.16 (2024-01-11)
* (foxriver76) use the correct fallback values for widget signals determination

### 2.9.15 (2024-01-09)
* (foxriver76) fixed issue with BulkEditor

### 2.9.14 (2024-01-09)
* (foxriver76) fixed last change y-offset for some widgets
* (foxriver76) fixed issue where JquiState did not respect data type
* (foxriver76) fixed issues with BulkEdtior (dialog not closing and other dialog showing the wrong button)
* (foxriver76) implemented workaround resize bug for https://github.com/devbookhq/splitter/issues/15

### 2.9.13 (2024-01-08)
* (foxriver76) correctly detect IDs in bindings when they contain hash character
* (foxriver76) fix crash when multiple JquiState widgets selected
* (foxriver76) prevent showing widget in a group after it is already cut out
* (foxriver76) prevent usage of widgets which are not in a group for calculating rulers on group view

### 2.9.12 (2024-01-04)
* (foxriver76) optimized copy/paste/cut in groups

### 2.9.11 (2024-01-02)
* (foxriver76) fixed bug with visibility calculation

### 2.9.10 (2024-01-02)
* (foxriver76) remove accidentally added script file, which leads to crash

### 2.9.9 (2024-01-01)
* (foxriver76) allow importing views without attribute `activeWidgets`
* (foxriver76) make BasicBulb behave more like its old version
* (foxriver76) fixed issue that data of different widget is displayed in edit mode
* (foxriver76) fixed issue that every state update is used for visibility calculation
* (bluefox) migrated jQui select, jQui Radio steps widgets to react
* (bluefox) All jQui widgets were migrated to react

### 2.9.8 (2023-12-21)
* (foxriver76) fixed bug that no labels are shown for a background
* (foxriver76) prevent short flashing of widgets with visibility condition at a page load
* (foxriver76) fixed issue on theme switch

### 2.9.7 (2023-12-19)
* (bluefox) Allowed the read-only flag for Styled/Input

### 2.9.6 (2023-12-14)
* (foxriver76) fixed issues with the BulkEditor
* (foxriver76) scripts in HTML are now added to the DOM, instead of being executed in eval
* (foxriver76) fixed issues with Bulb widget if min/max was once filled
* (foxriver76) migrated "speech2text" widget to react

### 2.9.5 (2023-12-10)
* (foxriver76) open new views at the beginning
* (foxriver76) fixed crash case if signals are used
* (foxriver76) fixed material-design-widgets helper 
* (foxriver76) update references to view in widget when view is renamed
* (bluefox) jQui Toggle icon widget was migrated to react
* (bluefox) jQui Radio widget was migrated to react
* (bluefox) jQui Radio List widget was migrated to react
* (bluefox) Corrected last-change by React widgets

### 2.9.4 (2023-12-04)
* (foxriver76) fixed issues with display width

### 2.9.3 (2023-12-03)
* (bluefox) Added the possibility to limit hard the view size
* (foxriver76) implemented simple sort mechanic for navigation
* (foxriver76) fixed import of views, which were inside a folder
* (foxriver76) fixed theme also applied in iframe
* (foxriver76) do not simply reuse widget ids when importing or copying views
* (foxriver76) implemented basic bulb widget as React widget
* (foxriver76) made script tags work in basic html widget

### 2.9.2 (2023-11-29)
* (foxriver76) fixed reactivity in custom components
* (foxriver76) fixed import for groups
* (foxriver76) after creating a group it is now pre-selected
* (foxriver76) fields are now updated when moved via keyboard

### 2.9.1 (2023-11-28)
* (foxriver76) recalculate fields after moving widgets
* (foxriver76) fixed a pasting group on other view
* (foxriver76) fixed theme also applied in iframe
* (bluefox) implemented Basic Image as React widget

### 2.9.0 (2023-11-27)
* (bluefox) implemented SVG shape and Screen Resolution widgets natively
* (bluefox) implemented Basic iFrame as React widget
* (foxriver76) only allow zip files at project import
* (foxriver76) fix overflow being overwritten
* (foxriver76) sort pages and projects alphabetically
* (foxriver76) fixed problem on saving
* (foxriver76) fixed problem with groups when `always render` is activated
* (foxriver76) allow changing color and write lowercase in a tabs component
* (foxriver76) fixed problem that navigation from a alwaysRender page is shown on different page

### 2.8.0 (2023-11-24)
* (foxriver76) sort folders alphabetically in pages view
* (foxriver76) fixed deselecting widgets with ctrl + click
* (foxriver76) fixed display issue with a switch component
* (bluefox) implemented Basic Red Number widget natively
* (foxriver76) fixed copy/clone of grouped widgets
* (foxriver76) fixed problem with open/close dialog via state

### 2.7.0 (2023-11-22)
* (foxriver76) implemented Basic Bar widget natively

### 2.6.4 (2023-11-21)
* (foxriver76) fixed typescript build

### 2.6.3 (2023-11-20)
* (foxriver76) fixed several crash cases

### 2.6.2 (2023-11-20)
* (foxriver76) fixed crash case when editing group
* (foxriver76) fixed pasting groups
* (foxriver76) fixed problem jumping cursor and removed characters while typing

### 2.6.1 (2023-11-17)
* (bluefox) Showed "file too large" message by icon upload
* (bluefox) Made navigation bar for view as an own group
* (foxriver76) sorted views alphabetically
* (foxriver76) respect uppercase/lowercase in projects toolbar
* (bluefox) Redirect `dialog` and `dialogClose` commands to widgets

### 2.6.0 (2023-11-13)
* (foxriver76) implemented select/unselect all buttons
* (foxriver76) fixed bindings not working

### 2.5.0 (2023-11-11)
* (foxriver76) allowed using real html in prepend-HTML and append-HTML (basic string widget)
* (foxriver76) fixed problem while editing groups
* (foxriver76) do not automatically format button text as uppercase
* (foxriver76) do not automatically show page names as uppercase
* (bluefox) Implemented the signal icons for React widgets
* (bluefox) Implemented the last change indication for React widgets
* (bluefox) Implemented SVG Bool widget as React Component

### 2.4.0 (2023-11-08)
* (foxriver76) fixed issues with icon selector filter when changing category
* (foxriver76) fixed problem, that only the first widget is pasted
* (bluefox) added JSON binding operator
* (bluefox) Allowed using function as filter for Object ID
* (bluefox) Implemented View bar (with no menu)

### 2.3.6 (2023-11-06)
* (foxriver76) fixed issues with binding editor on style attributes
* (foxriver76) improved performance due to optimizations on auto save

### 2.3.5 (2023-11-03)
* (foxriver76) update adapter-react to have enhanced image support in file selector
* (foxriver76) fixed color of file browser in light mode
* (foxriver76) fixed the color inputs jumping to the end of input on modifying

### 2.3.4 (2023-11-02)
* (foxriver76) fix crash when selecting multiple widgets
* (foxriver76) removed duplicate `none` entry in `border-style` dropdown
* (foxriver76) fix crash when reordering widgets

### 2.3.3 (2023-10-30)
* (foxriver76) fixed problem, that vis is not loading if a single widget has a script error
* (bluefox) added the editor for bindings
* (bluefox) background does not used if in iframe

### 2.3.2 (2023-10-14)
* (bluefox) Allowed showing only selected widgets in edit mode
* (bluefox) Corrected the visibility calculation for old (CanJS) widgets

### 2.3.1 (2023-10-13)
* (bluefox) Corrected vertical gap between relative widgets
* (bluefox) Better input of numbers with min/max in attribute dialog

### 2.3.0 (2023-09-28)
* (bluefox) jQui widgets (many of them) were improved

### 2.2.7 (2023-09-18)
* (bluefox) Improved icon selector: you can upload your own icon directly
* (bluefox) Optimized loading: do not load unused widget sets

### 2.2.6 (2023-09-17)
* (bluefox) Date binding corrected
* (bluefox) Optimized loading of widgeteria
* (bluefox) Horizontal navigation is fixed

### 2.2.5 (2023-09-12)
* (bluefox) Implemented horizontal navigation

### 2.2.4 (2023-09-04)
* (bluefox) Corrected license checking

### 2.2.2 (2023-08-16)
* (bluefox) Changed sentry settings

### 2.2.1 (2023-08-15)
* (bluefox) Added possibility to filter widgets in edit mode
* (bluefox) Added possibility to change the order of relative widgets with drag&drop

### 2.2.0 (2023-08-14)
* (bluefox) Release candidate 1

### 2.1.7 (2023-08-10)
* (bluefox) Optimized the rendering of the widgets

### 2.1.6 (2023-07-30)
* (bluefox) First beta release

### 2.1.4 (2023-07-19)
* (bluefox) Allowed to add widgets to widgets

### 2.0.36 (2023-06-21)
* (bluefox) Added widgeteria

### 2.0.29 (2023-05-17)
* (bluefox) Corrected errors

### 2.0.10 (2022-12-01)
* (bluefox) Added the file browser

### 2.0.8 (2022-11-26)
* (bluefox) Improved the error handling

### 2.0.0 (2022-10-21)
* (bluefox) Completely new visualization, but partly compatible with the previous version

## License
To use this adapter in `ioBroker` you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on [https://iobroker.net](https://iobroker.net). The license if checked online against the ioBroker license server when the vis-2 adapter is started, so an online connection at this time point is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2021-2025 Denis Haev, https://github.com/GermanBluefox <dogafox@gmail.com>,
  
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).