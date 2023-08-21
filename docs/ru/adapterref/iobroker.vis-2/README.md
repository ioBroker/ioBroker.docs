---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2/README.md
title: Визуализация следующего поколения для ioBroker: vis-2
hash: G5MYz5866agFCCdjfoysN0CW8/Z6G74ph/BE4JDq7Yw=
---
![Логотип](../../../en/adapterref/iobroker.vis-2/admin/vis-2.png)

![Количество установок](http://iobroker.live/badges/vis-2-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.vis-2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2.png?downloads=true)

# Визуализация следующего поколения для ioBroker: vis-2
WEB-визуализация для платформы ioBroker.

## Установка и документация
![Демонстрационный интерфейс](img/user0.png) ![Демонстрационный интерфейс](../../../en/adapterref/iobroker.vis-2/img/user7.png)

[Онлайн-демонстрации](https://iobroker.click/)

## Привязки объектов
Обычно большинство виджетов имеют атрибут ObjectID, и этот атрибут может быть связан с некоторым значением идентификатора объекта.
Но есть и другой вариант, как привязать *любой* атрибут виджета к какому-то ObjectID.

Просто напишите в атрибут `{object.id}`, и он будет привязан к значению этого объекта.
Если вы используете специальный формат, то с ним можно даже выполнять некоторые простые операции, например, умножать или форматировать.

Например, чтобы вычислить гипотенузу треугольника:

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(h*h + w*w))}` будет интерпретироваться как функция:

```
value = await (async function () {
    var h = (await getState('javascript.0.myCustom.height')).val;
    var w = (await getState('javascript.0.myCustom.width')).val;
    return Math.max(20, Math.sqrt(h * h + w * w));
})();
```

или

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}` просто умножает высоту на ширину.

Вы можете использовать *любые* функции javascript (браузера). Аргументы должны быть определены с помощью ':', в противном случае это будет интерпретироваться как формула.

Позаботьтесь о типах. Все они определены как строки. Чтобы быть уверенным, что это значение будет рассматриваться как число, используйте функцию parseFloat.

Таким образом, наш расчет гипотенузы будет:

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Устаревший формат
Патен имеет следующий формат:

```
{objectID;operation1;operation2;...}
```

Поддерживаются следующие операции:

- `\*` - умножение. Аргумент должен быть заключен в скобки, например "*(4)". В этом примере мы умножаем значение на 4.
- `\+` - доп. Аргумент должен быть в скобках, например "+(4.5)". В этом примере мы добавляем к значению 4,5.
- `\-` - вычесть. Аргумент должен быть заключен в скобки, например "-(-674,5)". В этом примере мы вычитаем из значения -674,5.
- `/` - деление. Аргумент должен быть в скобках, например "/(0,5)". В этом примере мы делим значение на 0,5.
- `%` - по модулю. Аргумент должен быть заключен в скобки, например "%(5)". В этом примере мы берем по модулю 5.
- `round` - округлить значение.
- `round(N)` - округлить значение до N знаков после запятой, например, 34,678;round(1) => 34,7
- `hex` - преобразовать значение в шестнадцатеричное значение. Все буквы строчные.
- `hex2` - преобразовать значение в шестнадцатеричное значение. Все буквы строчные. Если значение меньше 16, то будет добавлен начальный ноль.
- `HEX` - то же, что и шестнадцатеричный, но в верхнем регистре.
- `HEX2` - то же, что и hex2, но в верхнем регистре.
- `date` - форматировать дату в соответствии с заданным форматом. Формат такой же, как в [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate)
- `min(N)` - если значение меньше N, взять N, иначе значение
- `max(M)` - если значение больше M, взять M, иначе значение
- `sqrt` - квадратный корень
- `pow(n)` - степень числа N.
- `pow` - степень числа 2.
- `пол` - Math.floor
- `ceil` - Math.ceil
- `random(R)` - Math.random() * R или просто Math.random(), если нет аргумента
- `formatValue(decimals)` - форматировать значение в соответствии с настройками системы и использовать десятичные дроби
- `date(format)` - форматировать значение как дату. Формат такой: "ГГГГ-ММ-ДД чч:мм:сс.сссс"
- `momentDate(format, useTodayOrYesterday)` - отформатируйте значение как дату, используя Moment.js. [Утвержденные форматы должны быть введены в соответствии с библиотекой moment.js](https://momentjs.com/docs/#/displaying/format/). При `useTodayOrYesterday=true` формат `moment.js` `ddd`/`dddd` перезаписывается сегодня/вчера
- `array(element1,element2[,element3,element4])` - возвращает элемент индекса. например: `{id.ack;array(ack is false,ack is true)}`

Вы можете использовать этот шаблон в любом тексте, например

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

или цветовые расчеты:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Чтобы показать временную метку объекта, напишите `.ts` или `.lc` (для последнего изменения) в конце идентификатора объекта, например:

```
Last change: {objectRed.lc;date(hh:mm)}
```

### Специальные привязки
Существует ряд различных внутренних привязок для предоставления дополнительной информации в представлениях:

* `username` - показывает вошедшего в систему пользователя
* `view` - имя фактического вида
* `wname` - имя виджета
* `виджет` - это объект со всеми данными виджета. Может использоваться только в части JS, например `{a:a;widget.data.name}`
* `wid` - имя актуального виджета
* `язык` - может быть `de`, `en` или `ru`.
* `instance` - экземпляр браузера
* `login` - требуется ли вход в систему или нет (например, чтобы показать/скрыть кнопку выхода)
* `local_*` - если имя состояния начинается с `local_`, оно не будет сообщаться ioBroker, но будет обновлять все виджеты, зависящие от этого состояния. (Локальная переменная для текущего сеанса браузера)

Примечание: чтобы использовать ":" в вычислениях (например, в строковой формуле), используйте вместо этого "::".

**Помните**, что определения стилей будут интерпретироваться как привязки, поэтому используйте `{{style: value}}` или просто

```
{
	style: value
}
```

для этого.

## Фильтры
Чтобы визуализировать в одном представлении все количество виджетов, вы можете использовать фильтры, чтобы уменьшить количество виджетов, одновременно отображаемых в представлении.

В каждом виджете есть поле `filter`. Если вы установите для него какое-то значение, например. `light`, поэтому вы можете использовать другой виджет `(bars - filters, filter - dropdown)`, чтобы контролировать, какой фильтр фактически активен.

## Интерфейс управления
Vis создает 3 переменные:

- `control.instance` – здесь должен быть указан экземпляр браузера или `FFFFFFFF`, если необходимо контролировать каждый браузер.
- `control.data` - Параметр для команды. См. описание конкретной команды.
- `control.command` - Имя команды. Запись этой переменной запускает команду. Это означает, что перед тем, как команда будет записана, «экземпляр» и «данные» должны быть подготовлены с данными.

Команды:

* `alert` - показывать окно предупреждения в vis-2. «control.data» имеет следующий формат: «сообщение; заголовок; значок jquery». Заголовок и значок jquery необязательны. Названия иконок можно найти [здесь](http://jqueryui.com/themeroller/). Чтобы отобразить значок «ui-icon-info», напишите `Message;;info`.
* `changeView` - переключиться на нужный вид. "control.data" должно иметь имя представления. Вы также можете указать имя проекта как `project/view`. Проект по умолчанию — `main`.
* `refresh` - перезагрузить vis-2, например, после изменения проекта для перезагрузки во всех браузерах.
* `reload` - то же, что и обновление.
* `dialog` - Показать диалоговое окно. Диалог должен существовать в поле зрения. Один из:

    - `статический - HTML - Диалог`,
    - `статические - Иконка - Диалог`,
    - `контейнер - HTML - просмотр в диалоговом окне jqui`,
    - `контейнер - ext cmd - просмотр в диалоговом окне jqui`,
    - `контейнер - иконка - просмотр в диалоговом окне jqui`,
    - `Контейнер - Кнопка - просмотр в диалоговом окне jqui`.

    `control.data` должен иметь идентификатор виджета диалога, например. `w00056`.

* `диалогЗакрыть`
* `popup` - открывает новое окно браузера. Ссылка должна быть указана в `control.data`, например, http://google.com
* `playSound` - воспроизвести звуковой файл. Ссылка на файл указывается в `control.data`, например, http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Вы можете загрузить свой собственный файл в vis-2 и позволить ему воспроизводиться, например, как `/vis-2.0/main/img/myFile.mp3`.

Если пользователь изменит представление или на старте, переменные будут заполнены vis-2 с

- `control.instance`: экземпляр браузера и `ack=true`
- `control.data`: имя проекта и представления в форме `проект/представление`, например. `main/view` (и `ack=true`)
- `control.command`: `changedView` и `ack=true`

Вы можете записать строку JSON или объект в `control.command` как `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`. В этом случае экземпляр и данные будут взяты из объекта JSON.

Пример для javascript-адаптера:

```
setState('vis-2.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Вид по умолчанию
Вы можете определить для каждого вида желаемое разрешение (Меню=>Инструменты=>Разрешение).
Это только визуальная граница в режиме редактирования, чтобы показать вам размер экрана на каком-то конкретном устройстве. В режиме реального времени его не будет видно и будут видны все виджеты за пределами границы.

Кроме того, вы можете определить, должно ли это представление использоваться по умолчанию для этого разрешения.

Таким образом, каждый раз, когда вызывается `index.html` (без `#viewName`), будет открываться вид, наиболее подходящий для этого разрешения.
Если только один вид имеет флаг *"По умолчанию"*, этот вид будет открыт независимо от разрешения или ориентации экрана.

Например, вы можете создать два вида «Пейзаж-Мобильный» и «Портрет-Мобильный», и эти два вида будут автоматически переключаться при изменении ориентации или размера экрана.

Существует вспомогательный виджет «Основной - Разрешение экрана», который показывает фактическое разрешение экрана и наиболее подходящий вид по умолчанию для этого разрешения.

## Настройки
### Перезагрузить, если спать дольше, чем
Существует правило, что после некоторого периода отключения вся страница ВИС будет перезагружена для синхронизации проекта.
Настроить его можно в меню «Настройки…». Если вы установите интервал «никогда», страница никогда не будет перезагружена.

### Интервал переподключения
Установите интервал между попытками подключения при отключении. Если вы установите 2 секунды, он будет пытаться установить соединение каждые 2 секунды.

### Темный экран переподключения
Иногда (ночью) требуется темный загрузочный экран. С помощью этой опции вы можете установить его.

Обратите внимание, что эти настройки действительны только для повторного подключения, а не для первого подключения.

![Темный](../../../en/adapterref/iobroker.vis-2/img/dark_screen.png)

## Делать
- Фильтр в режиме редактирования тоже

- <!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
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
 Copyright (c) 2021-2023 Denis Haev, https://github.com/GermanBluefox <dogafox@gmail.com>,
  
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).