---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-ovarious/README.md
title: Vis 2 (o)различные виджеты
hash: 9kE+Av1tIRAcEsL/crz1sRamAiY2YQUNh6SxcJx9+/k=
---
![Количество установок](http://iobroker.live/badges/vis-2-widgets-ovarious-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.vis-2-widgets-ovarious.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-ovarious.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-ovarious.png?downloads=true)

<!-- markdownlint-disable MD036 -->

# Вид 2 (о)различных виджетов
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-ovarious/admin/vis-2-widgets-ovarious.png)

Этот адаптер содержит различные виджеты vis-2.

Хорошо, на самом деле есть только один виджет vis-2, но в моих планах еще несколько.

## Виджет шаблона JSON
Используя этот виджет, можно отобразить любую точку данных с данными JSON по желанию.
Отображение выполняется с использованием формата шаблона, который можно рассматривать как комбинированную форму HTML-кода + JavaScript + специальных тегов, которые управляют отображением атрибутов JSON.

### Атрибут точки данных JSON
Выбор точки данных с соответствующими данными JSON.

#### Шаблон атрибута
Шаблон можно использовать для определения внешнего вида данных JSON. Все допустимые теги HTML (включая атрибуты CSS в тегах стилей) можно использовать в шаблоне.
Также существуют специальные теги, в которых отображаются данные JSON и могут выполняться инструкции JavaScript.

Система шаблонов работает с определенными тегами.
Используемые теги имеют следующее значение

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной неэкранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | — это обычно закрывающий тег, который завершает один из предыдущих |

Все, что находится за пределами этих тегов, отображается точно так, как есть, или, если это HTML, интерпретируется как HTML. (см., например, p-tag, div-tag, small-tag). В шаблоне вам доступны 2 предопределенные переменные

Данные JSON передаются в шаблон с префиксом data. Кроме того, текущий widgetID также доступен как переменная, так что его можно указать в отдельных инструкциях CSS.

##### Пример объекта
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

В приведенном выше примере атрибуты могут быть выведены следующим образом:

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Результат**

```html
123 onetwothree
```

Массивы могут быть доступны через индекс. Индекс всегда начинается с 0. Однако существуют также фейковые массивы, где индекс не начинается с 0 или даже состоит из текста. Здесь применяются правила для объектов. В примере выше это будет

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

##### Результат
```html
one two
```

Если вы попытаетесь вывести массив напрямую без индекса, шаблон выведет все элементы, разделенные запятыми.

```html
<%- data.onearray %>
```

**Результат**

```html
one,two
```

Массивы также могут состоять из коллекции объектов. В данном примере представлен только простой массив. Пример массивов с объектами будет приведен позже.

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**Результат**

```html
one two
```

**Объекты** могут содержать отдельные атрибуты, массивы или объекты снова. Это означает, что данные JSON могут быть вложены на любую глубину.

Атрибуты объекта могут быть адресованы с помощью точечной нотации или скобочной нотации. Точечная нотация работает только в том случае, если атрибут соответствует определенным соглашениям об именовании (первый символ должен быть буквой, остальные цифры или буквы или подчеркивание).
Скобочная нотация также работает для атрибутов, которые не соответствуют соглашению об именовании.

**Точечная нотация**

```html
<%- data.oneobject.attribute1 %>
```

**Обозначение скобок**

```html
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров**

```html
1
```

Перебрать атрибуты объекта

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**Результат**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

**Расширенный вариант использования**

В приведенных выше примерах был охвачен только чистый вывод. Шаблон теперь также может быть обогащен тегами HTML для достижения определенного макета. Вот пример:

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

**Результат**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

## Changelog

<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 0.1.8 (2024-07-28)

- improve icon
- remove versions from io-package.json

### 0.1.7 (2024-07-28)

- fix widget addressing

### 0.1.6 (2024-07-28)

- fix widget addressing

### 0.1.5 (2024-07-28)

- fix adapter checker issues

### 0.1.4 (2024-07-28)

- fix things from adapter checker

### 0.1.3 (2024-07-27)

- add icon
- add documentation

### 0.1.2 (2024-07-27)

- prepare release

### 0.1.1 (2024-07-27)

- fix widget addressing

### 0.1.0 (2024-07-27)

- initial Release

## License

The MIT License (MIT)

Copyright (c) 2024 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.