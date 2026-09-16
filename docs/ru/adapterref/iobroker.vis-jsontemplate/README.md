---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate - адаптер для визуализации данных JSON и других данных в Vis/Vis2.
hash: 79JU88C6RRqGDVfAdSbiTeA8E554Sr49Aui3WU/88A0=
---
# JSONTemplate — адаптер для визуализации данных JSON и других данных в Vis/Vis2.

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![Количество установок](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)
![Тестирование и выпуск](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

![Логотип](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

## Обзор

Адаптер для визуализации данных JSON и других данных в Vis/Vis2. Вы можете настроить вывод данных с помощью системы шаблонов. В шаблоны можно включать HTML, CSS и JavaScript. Используемая система шаблонов:`ejs` Вы можете опробовать основные функции здесь, в онлайн-тестовой среде: <https://ionicabizau.github.io/ejs-playground>

Виджет jsontemplate ранее был доступен в адаптерах rssfeed (для vis1) и vis-2-widgets-ovarious. В ближайшем будущем эти виджеты будут удалены из этих адаптеров.

## Оглавление

- [Обзор](#overview)
- [Установка](#installation)
- [Конфигурация](#configuration)
- [визуализация и виджеты](#vis-and-widgets)
  - [Шаблон JSON](#json-template)
  - [Расширенный вариант использования](#advanced-use-case)
  - [Дополнительные варианты использования](#more-use-cases)
- [Система шаблонов](#templatesystem)
  - [Очень важное примечание для использования в vis / vis-2](#very-important-note-for-use-in-vis--vis-2)
  - [Фигурные скобки в CSS и JSON](#curly-braces-in-css-and-json)
  - [Использование setInterval](#use-of-setinterval)
  - [Разработка шаблонов с использованием ИИ.](#developing-templates-with-ai)
- [Теги](#tags)
- [Пример объекта](#example-object)
- [Разработка и отладка](#development-and-debugging)
  - [Виджеты Vis1](#vis1-widgets)
  - [Виджеты Vis2](#vis2-widgets)
- [Все](#todo)
- [Список изменений](#changelog)
- [Лицензия](#license)

## Установка

Установите адаптер обычным способом из стабильного репозитория. Если вы хотите протестировать новые функции или исправления ошибок, вы также можете установить адаптер из бета-репозитория. Информацию о новых функциях и новостях можно найти в теме «Тестирование и поддержка» на форуме iobroker.

После установки адаптер должен отобразиться в разделе адаптеров в iobroker. Иногда изменения могут быть не видны, особенно при изменении веб-интерфейса (виджеты / диалоговое окно конфигурации), в этом случае может потребоваться выполнить следующую команду в командной строке:

```bash
iobroker upload jsontemplate
```

В правой части адаптера можно добавить экземпляр, используя кнопку «плюс».

## Конфигурация

В административной панели этого адаптера отсутствует диалоговое окно настройки.

## визуализация и виджеты

Следующие виджеты действительно существуют.

- [`JSON Template`](#json-template) — Вы можете определить пользовательский шаблон для отображения любых данных в формате JSON в Visual.

### Шаблон JSON

С помощью этого виджета можно отображать любые данные в формате JSON по своему усмотрению. Отображение осуществляется с использованием шаблонного формата, который можно рассматривать как комбинацию HTML-кода, JavaScript, CSS и специальных тегов, управляющих отображением атрибутов JSON. JSONTemplate теперь поддерживает асинхронные вызовы с помощью await.

| Параметр           | описание                                                                                                                                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json\_template     | Шаблон можно использовать для определения внешнего вида данных JSON. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах стиля). Также существуют специальные теги, внутри которых отображаются данные JSON и могут выполняться инструкции JavaScript. |
| json\_oid          | Выбор точки данных с соответствующими данными в формате JSON.                                                                                                                                                                                                                          |
| json\_dpCount      | Количество точек данных, которые должны быть доступны в шаблоне.                                                                                                                                                                                                                       |
| json\_dp           | Идентификатор точки данных будет предоставлен.                                                                                                                                                                                                                                         |
| json\_dp\_variable | Имя переменной JavaScript необязательно. Переменная содержит идентификатор точки данных; то же имя, что и у других переменных.`_value` Добавленное значение содержит его текущее значение.                                                                                             |
| json\_scriptCount  | Количество загружаемых JavaScript-ссылок                                                                                                                                                                                                                                               |
| json\_script\[]    | URL-адрес JavaScript-кода для загрузки. См. пример ниже.                                                                                                                                                                                                                               |
| json\_cssCount     | Количество загружаемых CSS-ссылок.                                                                                                                                                                                                                                                     |
| json\_css\[]       | URL-адрес CSS для загрузки.                                                                                                                                                                                                                                                            |

Подробную информацию о системе шаблонов см. в главе «Шаблоны на основе примеров».

Доступные объекты данных в шаблоне:

| объект/переменная | описание                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| widgetid          | widgetid виджета.                                                              |
| widgetID          | widgetid виджета.                                                              |
| данные            | Объект JSON, на который ссылается точка данных в json\_oid.                    |
| dp                | Массив данных точек данных, на которые ссылаются дополнительные точки данных.  |
| виджет            | внутренние данные виджета. Объект со всеми доступными настройками виджета.     |
| стиль             | Внутренние данные стиля. Объект со всей доступной информацией о стиле виджета. |

Доступ к дополнительным точкам данных можно получить по A) названию точки данных.

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) Порядковый номер точки данных (число всегда начинается с 0)

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

C) Необязательное имя переменной, заданное для точки данных. Для точки данных.`0_userdata.0.selectwrite` имя переменной`dpwrite` и значение`abc` :

```javascript
<%- dpwrite %>          <!-- 0_userdata.0.selectwrite -->
<%- dpwrite_value %>    <!-- abc -->
<%- dp[dpwrite] %>      <!-- abc -->
```

Пример вывода данных, виджета и стиля в шаблоне.

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

В случае возникновения ошибки она отображается в виджете и выводится в консоль браузера (F12).

#### Расширенный сценарий использования

В приведенных выше примерах рассматривался только чистый вывод. Теперь шаблон можно дополнить HTML-тегами для достижения определенного макета. Вот пример:

```html
<h3>Output</h3>
<style>
    .mycssclassproperty {
        color: green;
    }
    .mycssclassdata {
        color: red;
    }
</style>
<% for (var prop in data.oneobject) { %>
<div>
    <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
    <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(В Markdown цвета не отображаются)

#### Дополнительные варианты использования

- [Вариант использования: Асинхронные вызовы](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md)
- [Скрипты загрузки сценариев использования](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md)
- [Список задач по вариантам использования](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md)
- [Пример использования: общественный транспорт](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md)
- [Пример использования: простой измерительный прибор](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md)
- [Примеры использования. Проблемы и запросы на слияние в Github.](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md)
- [Пример использования списка вызовов FRITZ!Box](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md)

## Система шаблонов

### Очень важное примечание для использования в vis / vis-2

#### Фигурные скобки в CSS и JSON

Механизм связывания в vis/vis-2 использует следующую схему.`{ ... }` для обнаружения выражений привязки внутри HTML. По этой причине при указании CSS или JSON фигурные скобки всегда должны располагаться на отдельных строках. В противном случае содержимое виджета vis будет перезаписано.`undefined` .

##### Пример

```text
#<%- widgetid %> { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
```

необходимо записать следующим образом:

```text
#<%- widgetid %> {
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
}
```

#### Использование setInterval

Пожалуйста, не используйте`setInterval` Поскольку шаблон вызывается повторно каждый раз при изменении точки данных, любые существующие`setInterval` Вызовы не могут быть должным образом обработаны. Следовательно, увеличивается количество дублирующихся вызовов.`setInterval` Со временем количество вызовов увеличивается, что приводит к потреблению оперативной памяти и непредсказуемым побочным эффектам. Хотя перезагрузка страницы может решить эту проблему, код не следует реализовывать таким образом. В качестве альтернативы подобные сценарии следует реализовывать с использованием`setTimeout` .

#### Разработка шаблонов с использованием ИИ.

Чтобы упростить процесс создания шаблонов для всех, я подготовил подробную документацию, включающую подсказки и описания:

- [Английский](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md)
- [немецкий](/#/docs/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md)

## Теги

Система шаблонов работает с определенными тегами. Используемые теги означают следующее:

| `tag` | описание                                                             |
| ----- | -------------------------------------------------------------------- |
| <%=   | Содержимое содержащегося выражения/переменной будет экранировано.    |
| <%-   | Содержимое содержащегося выражения/переменной не экранировано.       |
| <%    | Нет вывода, используется для вложенных инструкций JavaScript.        |
| %>    | Обычно это завершающий тег, призванный закончить один из предыдущих. |

Всё, что находится за пределами этих тегов, отображается точно так же, как есть, или, если это HTML, интерпретируется как HTML. Внутри шаблона доступны 2 предопределенные переменные.

### Пример объекта

Во всех приведенных ниже примерах используется следующий JSON.

```json
{
    "onearray": ["one", "two"],
    "oneobject": {
        "attribute1": 1,
        "attribute2": 2
    },
    "onenumber": 123,
    "onetext": "onetwothree"
}
```

Атрибуты могут быть выведены следующим образом.

**Шаблон:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Результат:**

```text
    123 onetwothree
```

Доступ к массивам осуществляется по индексу. Индекс всегда начинается с 0. Однако существуют и фиктивные массивы, где индекс не начинается с 0 или даже состоит из текста. В этом случае применяются правила, действующие для объектов. В приведенном выше примере это будет выглядеть так:

**Шаблон:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Результат:**

```text
    one two
```

Если вы попытаетесь вывести массив напрямую, без указания индекса, шаблон выведет все элементы, разделенные запятыми.

**Шаблон:**

```ejs
<%- data.onearray %>
```

**Результат:**

```text
    one,two
```

Массивы также могут состоять из набора объектов. В приведенном здесь примере используется только простой массив. Пример массивов с объектами будет приведен позже.

**Шаблон:**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**Результат:**

```text
    one two
```

**Объекты** могут содержать отдельные атрибуты, массивы или снова объекты. Это означает, что данные JSON могут быть вложены на любую глубину.

Атрибуты объекта можно указывать с помощью точечной или скобочной нотации. Точечная нотация работает только в том случае, если атрибут соответствует определенным правилам именования (первый символ должен быть буквой, остальные – цифрами, буквами или подчеркиванием). Скобочная нотация также работает для атрибутов, не соответствующих правилам именования.

**Точечная запись:**

**Шаблон:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Скобочная запись:**

**Шаблон:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров:**

```text
    1
```

Прохождение цикла по атрибутам объекта

**Шаблон:**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Разработка и отладка

### Виджеты Vis1

- Установите dev-сервер
- Запустите dev-сервер с опцией --noStart
- При первом запуске установите дополнительные веб-адаптеры и vis1.
- Запуск VS Code, настройка запуска "редактор vis-1"
- Если виджеты недоступны, загрузите адаптер в экспертном режиме на странице адаптера.
- Теперь вы можете устанавливать точки останова в VS Code в файле jsontemplate.js.
- Если вы внесете изменения в файл js, исходный код необходимо скомпилировать в папку dist с помощью команды npm run build-vis1widgets.
- dev-сервер загружает измененные файлы в iobroker, но для vis1 необходимо выполнить команду iob visdebug для перезагрузки виджетов.
- Для перевода дополнительных записей в файле en.json используйте команду translate-widgets-vis1.

### Виджеты Vis2

- Установите dev-сервер
- Откройте новое окно VS Code (2. экземпляр).
- клонировать репозиторий vis2
- Следуйте инструкциям в файле README репозитория vis2 в главе «Разработка и отладка». Создавать форк репозитория не обязательно. Нам нужен только работающий экземпляр адаптера vis2.
- запустить vis 2 с помощью npm run start
- вернуться в экземпляр VS Code этого адаптера
- Запустите dev-сервер с опцией --noStart
- Запуск VS Code, настройка запуска "редактор vis-2"
- Теперь вы можете устанавливать точки останова в VS Code в файле jsontemplate.js.
- Если вы что-то измените, вам больше ничего делать не нужно, потому что Vite поддерживает горячую перезагрузку. Иногда бывает полезно перезагрузить vis2 с помощью F5.
- Для перевода дополнительных записей в файле en.json используйте команду translate-widgets-vis2.

## Все

- тбд

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.6.1 (2026-07-31)

- Improved error output.

### 4.6.0 (2026-07-30)

- some changes. see readme/below

#### Changes 2026-07-30

- add optional variable names to extra datapoints

### 4.5.0 (2026-07-29)

- some changes. see readme/below

#### Changes 2026-07-29

- repair widget rendering
- add search and fullscreen to ejs-edit for vis-2 widget
- improve ki documentation for regex expressions
- improve vis-2 ejs edit theme for dark mode

### 4.4.5 (2026-07-22)

- fix packages for vis-2

### 4.4.4 (2026-07-22)

- some changes. see readme/below

#### Changes 2026-07.22

- change documentation that in the template the widgetid is available and not widgetID
- add documentation for the usecase simple gauge
- add documentation for a responsive FRITZ!Box call list
- Due to an inconsistency between the vis1 and vis2 widgets,
  both `widgetid` and `widgetID` are now passed to the template.

[Older changelogs can be found there](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

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