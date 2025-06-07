---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2/README.md
title: Визуализация следующего поколения для ioBroker: vis-2
hash: /LJ7Z0+VbWYKA6WbedYPK1ecLHnLys58wJKAQrnjkug=
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

Вы можете использовать *любые* функции JavaScript (браузера). Аргументы должны быть определены с помощью ':', в противном случае они будут интерпретироваться как формула.

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
Существует правило, что после некоторого периода отключения вся страница VIS будет перезагружена для синхронизации проекта. Вы можете настроить это в меню «Настройки...». Если вы установите интервал «никогда», то страница никогда не будет перезагружена.

### Интервал повторного подключения
Установите интервал между попытками подключения в случае отключения. Если установить 2 секунды, то попытки установить соединение будут каждые 2 секунды.

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
* (@GermanBluefox) Corrected selection of the view for resolution

### 2.12.10 (2025-05-25)
* (@GermanBluefox) Added possibility to define favicon and browser tab title

### 2.12.9 (2025-05-19)
* (@GermanBluefox) Added possibility to use value in signal text

### 2.12.8 (2025-05-03)
* (@GermanBluefox) Added new SVG icon as favicon.
* (@GermanBluefox) Added support for the TypeScript widgets
* (@GermanBluefox) Used `vite` for faster loading

### 2.11.2 (2025-01-23)
* (@GermanBluefox) Do not load vis-1 widgets if vis-2 widgets are provided

### 2.11.1 (2024-12-02)
* (@GermanBluefox) Corrected navigation menu
* (@GermanBluefox) Migrated widgets to React: basic - frame, basic - note, basic - logout 
* (@GermanBluefox) Added the HTML rebuild button to settings
* (@GermanBluefox) Backend was migrated to TypeScript

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