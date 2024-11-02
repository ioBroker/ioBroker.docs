---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rssfeed/README.md
title: Адаптер ioBroker для запроса и отображения RSS-каналов разных стандартов (Atom, RSS, RDF)
hash: cgrRJ6hN8UqN8R8K0u94eIkpdr3Iuapk+WEuW0s4aIM=
---
![Логотип](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Количество установок](https://iobroker.live/badges/rssfeed-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/rssfeed-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

# Адаптер ioBroker для запроса и отображения RSS-каналов разных стандартов (Atom, RSS, RDF)
**Тесты:** ![Тест и выпуск](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер для запроса и отображения RSS-каналов разных стандартов (Atom, RSS, RDF).
Вы можете настроить вывод канала с помощью системы шаблонов. В шаблоны можно включать HTML, CSS и Javascript.

Важно: действителен только перевод на английский язык из-за ошибок в автоматических переводах на другие языки, выполненных iobroker.

## Установка
Установите адаптер как обычно из стабильного репозитория. Если вы хотите протестировать новые функции или исправления ошибок, вы также можете установить адаптер из бета-репозитория. Для функций и новостей, пожалуйста, см. ветку Тестирование и поддержка для этого адаптера на форуме iobroker.

После установки адаптер должен отображаться в разделе адаптеров в iobroker.
Иногда бывает так, что изменения не видны, особенно при веб-изменениях (виджеты/диалог конфигурации), может потребоваться выполнить следующую команду в командной строке:

```bash
iobroker upload rssfeed
```

В правой области в строке адаптера можно добавить экземпляр с помощью кнопки «плюс»

## Конфигурация
Конфигурация проста. Всего несколько полей.

| Настройка | описание |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Обновление по умолчанию (мин) | общая спецификация того, как часто фид должен вызываться снова в минутах. Значение по умолчанию — 60 минут |
| Макс. артикул (стандартный) | Общий объем обрабатываемых данных может быть ограничен здесь. |

Затем для каждого нового фида:

| Настройка | описание |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Имя | Имя для точки данных. Внутри папки имя не должно появляться дважды. |
| Категория | Имя подпапки, в которой должна появиться точка данных. |
| Url | Полный адрес фида (с http:// или https://, см. примеры ниже) |
| Обновление (мин) | Время обновления/загрузки фида. Для этого фида можно указать другое значение. В противном случае берется общая спецификация |
| Макс. количество статей | Количество статей, которые должны быть сохранены в точке данных. Для этого фида можно указать другое значение. В противном случае берется общая спецификация |

Если вы сохранили и закрыли конфигурацию, feed-data можно найти как точку данных JSON в дереве объектов.
Если вы удалите запись, точки данных не удаляются автоматически.

## Вис и виджеты
Следующие виджеты действительно существуют

- [`RSS Feed widget 2`](#rss-feed-widget-2) - для отображения одного канала
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - для отображения нескольких агрегированных каналов в одном виджете.
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - вспомогательный виджет для проверки метаданных ленты
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - вспомогательный виджет для проверки данных статей в ленте
- [`RSS Feed Title marquee 3`](#rss-feed-title-marquee-3) - виджет для отображения заголовков ленты в виде бегущей строки
- [`Шаблон JSON`(#json-template)] - виджет, который не имеет ничего общего с RSS-каналами, но использует ту же технологию, и вы можете определить собственный шаблон для отображения любых JSON-данных в Vis.

### Виджет RSS-канала 2
Этот виджет можно использовать для отображения RSS-каналов, на которые вы подписаны в диалоговом окне конфигурации адаптера.
С помощью системы шаблонов вывод можно настроить по желанию. Простой стандартный шаблон уже предоставлен.
Описания форматирования и синтаксиса можно найти на следующих страницах.

| Настройка | описание |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |
| rss_template | Шаблон определяет внешний вид RSS-канала. В шаблоне можно использовать все допустимые теги HTML (включая атрибуты CSS в тегах стилей). Кроме того, существуют специальные теги, в которых отображаются данные канала и могут выполняться инструкции JavaScript. Для лучшей идентификации данных и используемых имен атрибутов есть два виджета: rssfeed Meta helper и rssfeed Article helper. |
| rss_maxarticles | Максимальное количество отдельных статей, отображаемых из RSS-канала |
| rss_filter | Для функции фильтра в поле можно ввести один или несколько критериев фильтра, разделенных точкой с запятой (;). Для поиска проверяются следующие атрибуты статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

**Наличие переменной:**

- rss.meta: метаинформация канала
- rss.articles: массив всех статей
- widgetid: идентификатор виджета
- стиль: объект стиля, если вы настраиваете дополнительную информацию о стиле

Более подробную информацию об этих переменных см. в главе **Доступные переменные**.

Подробную информацию о системе шаблонов см. в главе Шаблон на основе примеров.

### RSS-канал Мульти-виджет 3
С помощью этого виджета несколько каналов могут быть объединены в один канал.
Из-за нескольких каналов есть несколько различий в доступности данных в шаблоне по сравнению с обычным виджетом RSS-канала.
Метапеременная недоступна в шаблоне. Однако 3 метаатрибута title и description доступны в каждой отдельной статье под именами meta_title и meta_description.
Кроме того, в настройках можно назначить общее имя для каждого канала, которое доступно в шаблоне под именем meta_name в каждой статье, чтобы можно было определить происхождение статьи.
В остальном к шаблону применяются те же правила, что и для виджета RSS-канала.

| Настройка | Группа | описание |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Общая группа | Здесь вы можете задать количество каналов, которые нужно настроить. Для каждого канала в vis создается отдельная группа для настройки. |
| rss_template | | Шаблон определяет внешний вид RSS-канала. В шаблоне можно использовать все допустимые теги HTML (включая атрибуты CSS в тегах стилей). Кроме того, существуют специальные теги, в которых отображаются данные канала и могут выполняться инструкции JavaScript. Для лучшей идентификации данных и используемых имен атрибутов предусмотрены два виджета: помощник по метаданным rssfeed и помощник по статьям rssfeed. Подробнее о системе шаблонов см. в главе Шаблон на основе примеров |
| rss_dpCount | Общая группа | Здесь вы можете указать количество дополнительных точек данных, которые должны быть доступны в шаблоне. |
| rss_dp[number] | Общая группа | Здесь вы можете выбрать соответствующую точку данных. Точка данных доступна в шаблоне под переменной dp. Это означает, что точка данных может быть получена в шаблоне следующим образом. Подробнее об этих переменных см. в главе Доступные переменные |
| rss_oid | Групповые каналы[число] | Выбор точки данных с соответствующим каналом RSS. |
| rss_name | Групповые каналы[номер] | Здесь вы можете ввести имя, которое будет доступно в шаблоне для каждой статьи под именем атрибута meta_name. |
| rss_maxarticles | Group feeds[number] | Максимальное количество отдельных статей, отображаемых из RSS-канала |
| rss_filter | Group feeds[number] | Более подробную информацию об этих переменных см. в главе Доступные переменныеДля функции фильтра в поле можно ввести один или несколько критериев фильтрации, разделенных точкой с запятой (;). Для поиска используются следующие атрибуты статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

**Наличие переменной:**

- rss.articles: массив всех статей.

- Подмножество метаинформации элемента доступно в статье как **meta_name**, **meta_title** и **meta_description**

- dp[] как массив, если вы настраиваете дополнительные точки данных
- widgetid: идентификатор виджета
- стиль: объект стиля, если вы настраиваете дополнительную информацию о стиле

### Помощник метаданных RSS-канала
Этот виджет можно использовать для отображения метаатрибутов определенного фида. Он просто используется как вспомогательный виджет для создания шаблона для быстрого и легкого отображения содержимого данных RSS-канала.
Атрибуты

| Настройка | описание |
| ------- | ------------------------------------------------------------ |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |

### Помощник по статьям RSS-канала
Этот виджет может использоваться для отображения атрибутов статьи определенного фида. Он просто используется как вспомогательный виджет для создания шаблона для быстрого и легкого отображения содержимого данных RSS-канала.

| Настройка | описание |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |
| rss_prefix | Чтобы упростить использование имен атрибутов посредством копирования/вставки, здесь можно указать имя переменной, используемой в шаблоне статьи. |
| rss_article | Этот атрибут можно использовать для переключения между различными существующими статьями в RSS-канале. |

### Заголовок RSS-канала, бегущая строка 3
С этим виджетом все атрибуты заголовка будут отображаться в виде прокручивающегося текста. В рамках изменения виджета marquee 2 на 3 этот виджет теперь является мультивиджетом, в котором вы можете объединять более одного RSS-канала.

| Настройка | группа | описание |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Общая группа | Здесь вы можете задать количество каналов, которые нужно настроить. Для каждого канала, который нужно настроить, в vis создается отдельная группа. |
| rss_speed | Общая группа | Скорость прокрутки прокручиваемого текста Атрибут rss_divider - Общая группа Здесь вы можете ввести символы, используемые для разделения заголовков. Значение по умолчанию - +++. |
| rss_pauseonhover | Общая группа | Если эта опция включена, прокрутка текста останавливается, как только вы наводите указатель мыши на текст. |
| rss_link | Общая группа | Если эта опция включена, заголовки отображаются в виде ссылки. Если щелкнуть или коснуться заголовка, ссылка на статью откроется в новом окне или вкладке. |
| rss_withtime | Общая группа | Если эта опция включена, время отображается перед соответствующим заголовком. Атрибут rss_withdate - Общая группа Если эта опция включена, дата без года и время отображаются перед соответствующим заголовком. |
| rss_withyear | Общая группа | Если эта опция включена, дата с годом и временем отображаются перед соответствующим заголовком. |
| rss_oid | Группа Feeds[number] | Выберите точку данных с соответствующим каналом RSS. |
| rss_maxarticles | Группа Feeds[number] | Максимальное количество отдельных статей, отображаемых из RSS-канала |
| rss_filter | Группа Feeds[number] | Для функции фильтра в поле можно ввести один или несколько критериев фильтрации, разделенных точкой с запятой (;). Для поиска проверяются следующие атрибуты статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

### Шаблон JSON2
Используя этот виджет, можно отобразить любую точку данных с данными JSON по желанию.
Отображение выполняется с использованием формата шаблона, который можно рассматривать как комбинированную форму HTML-кода + JavaScript + специальных тегов, которые управляют отображением атрибутов JSON.

| Настройка | описание |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | Шаблон может использоваться для определения внешнего вида данных JSON. Все допустимые теги HTML (включая атрибуты CSS в тегах стилей) могут использоваться в шаблоне. Существуют также специальные теги, в которых отображаются данные JSON и могут выполняться инструкции JavaScript. |
| json_oid | Выбор точки данных с соответствующими данными JSON. |

Подробную информацию о системе шаблонов см. в главе Шаблон на основе примеров.

Данные JSON передаются в шаблон с префиксом data. Кроме того, текущий widgetID также доступен как переменная, так что его можно указать в отдельных инструкциях CSS.

**Расширенный вариант использования:**

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
  <span class="mycssclassproperty"
    ><%- "data.oneobject." + prop + " = " %></span
  >
  <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(В Markdown цвета не видны)

## Система шаблонов
## Теги
Система шаблонов работает с определенными тегами.
Используемые теги означают следующее

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной неэкранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно является закрывающим тегом для завершения одного из предыдущих |

Все, что находится за пределами этих тегов, отображается точно так, как есть, или, если это HTML, интерпретируется как HTML.
В шаблоне вам доступны 2 предопределенные переменные

### Пример объекта
Во всех следующих примерах используется следующий JSON.

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

Атрибуты могут быть выведены следующим образом

**Шаблон:**

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Результат:**

```text
    123 onetwothree
```

Массивы могут быть доступны через индекс. Индекс всегда начинается с 0. Однако существуют также фейковые массивы, где индекс не начинается с 0 или даже состоит из текста. Здесь применяются правила для объектов. В примере выше это будет

**Шаблон:**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**Результат:**

```text
    one two
```

Если вы попытаетесь вывести массив напрямую без индекса, шаблон выведет все элементы, разделенные запятыми.

**Шаблон:**

```html
<%- data.onearray %>
```

**Результат:**

```text
    one,two
```

Массивы также могут состоять из коллекции объектов. В данном примере представлен только простой массив. Пример массивов с объектами будет приведен позже.

**Шаблон:**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %>
<% } %>
```

**Результат:**

```text
    one two
```

**Объекты** могут содержать отдельные атрибуты, массивы или объекты снова. Это означает, что данные JSON могут быть вложены на любую глубину.

Атрибуты объекта можно адресовать с помощью точечной нотации или скобочной нотации. Точечная нотация работает только в том случае, если атрибут соответствует определенным соглашениям об именовании (первый символ должен быть буквой, остальные цифры или буквы или подчеркивание).
Скобочная нотация также работает для атрибутов, которые не соответствуют соглашению об именовании.

**Точечная нотация:**

**Шаблон:**

```html
<%- data.oneobject.attribute1 %>
```

**Обозначение скобок:**

**Шаблон:**

```html
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров:**

```text
    1
```

Перебрать атрибуты объекта

**Шаблон:**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " +
data.oneobject[prop] %> <% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Доступные переменные в шаблонах
### `rss.meta`
Здесь содержится вся метаинформация о ленте. Доступно следующее содержимое. Я думаю, идентификаторы говорят сами за себя. В справке я опишу их более подробно. или укажите содержимое (некоторые из них являются массивами) Только в виджете RSS Feed 2 доступен полный набор метаинформации

Использование в шаблоне см. в **Шаблоне на основе примера**

- `мета.заголовок`
- `мета.описание`
- `мета.ссылка`
- `meta.xmlurl`
- `мета.дата`
- `meta.pubdate`
- `мета.автор`
- `мета.язык`
- `мета.изображение`
- `meta.favicon`
- `meta.copyright`
- `мета.генератор`
- `мета.категории`

### `rss.articles or articles`
Это массив с отдельными элементами (массив javascript). Каждый элемент имеет следующие свойства.
Чтобы он подходил, например, я сделаю префиксный элемент перед ним. Но если хотите, вы можете выбрать его сами. Он должен быть только назван соответствующим образом в цикле (forEach). Здесь также идентификаторы говорят сами за себя. Не все атрибуты заполняются в каждом фиде. Самые важные из них уже включены в шаблон выше.

Статьи доступны как rss.articles в виджете RSS-канала 2 и как статьи в виджете RSS-канала multi 3.

Использование в шаблоне см. в **Шаблоне на основе примера**

- `название.элемента`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `элемент.автор`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `элемент.источник`
- `item.enclosures`

## Шаблон на основе примеров
### Базовый шаблон виджета RSS-канала 2
Следующий шаблон в настоящее время используется как стандартный в виджете RSS-канала 2. Он был протестирован со следующими каналами

- <http://www.tagesschau.de/xml/rss2> или
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
  #<%- widgetid % > img {
    width: calc(<%- style.width %> - 15px);
    height: auto;
  }
  #<%- widgetid % > img.rssfeed {
    width: auto;
    height: auto;
  }
</style>
<p><%- rss.meta.title %></p>
<% rss.articles.forEach(function(item){ %>
<div class="article">
  <p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
  <h3><%- item.title %></h3>
  <p><%- item.description %></p>
  <div style="clear:both;"></div>
</div>
<% }); %>
```

### Базовый шаблон RSS-канала мультивиджет 3
Следующий шаблон в настоящее время используется в качестве стандартного в виджете RSS-канала multi 3. Обратите внимание на небольшие различия в использовании переменных. Он был протестирован со следующими каналами

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    articles      ->  all articles as array, details see Article Helper widget
                      only subset of meta information of the feed is available as
                      articles[0].meta_name
                      articles[0].meta_title
                      articles[0].meta_description
    style         ->  all style settings for the widget
    dp[]          ->  array of addition configured datapoints

    all variables are read only
    -->
<style>
  #<%- widgetid % > img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid % > img.rssfeed {
    width: auto;
    height: auto;
  }
</style>
<% rss.articles.forEach(function(item){ %>
<p><%- item.meta_name || item.meta_title || '' %></p>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

### Пример шаблона для виджета RSS-Feed multi 3 со статьями в виде слайд-шоу и кнопками «Назад/Далее»
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
  #<%- widgetid % > img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid % > img.rssfeed {
    width: auto;
    height: auto;
  }

  .container {
    overflow: hidden;
    height: 100%;
  }
  .content {
    position: relative;
    border: 1px solid #ccc;
    overflow: scroll;
    height: 90%;
  }

  .slide {
    position: absolute;
    display: none;
  }

  .slide.active {
    display: contents;
  }

  .controls {
    margin-top: 10px;
  }
</style>

<div class="container">
  <div class="content">
    <% rss.articles.forEach(function(item){ %>
    <div class="article slide">
      <p>
        <small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small>
      </p>
      <h3><%- item.title %></h3>
      <p><%- item.description %></p>
      <div style="clear:both;"></div>
    </div>
    <% }); %>
  </div>
  <div class="controls">
    <button onclick="prevSlide()">Zurück</button>
    <button onclick="nextSlide()">Weiter</button>
  </div>
</div>

<script>
  currentSlide = 0;
  slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function prevSlide() {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
  }

  function nextSlide() {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }
  showSlide(currentSlide);
</script>
```

### Пример шаблона и подробное описание
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Краткое описание того, что происходит в отдельных строках Z1: Вывод заголовка фида Z2: Без вывода. Команда Javascript для цикла по всем статьям, с каждым поворотом текущий элемент назначается переменной item.
Z3: Вывод даты и времени. Он заключен в тег p / small для форматирования. Для форматирования используется функция форматирования даты vis-own. Описание можно найти в адаптере vis.
Z4: Вывод заголовка статьи. Для форматирования используется тег Header 3 -.
Z5: Вывод содержимого статьи. Он заключен в тег p-. Здесь, по крайней мере в двух примерах, включен HTML-код, который обычно идет с изображением и описательным текстом Z6: Вывести тег div, который очищает специальное форматирование в feed-html (в обоих примерах для tagesschau и bild он необходим. Другим фидам он, возможно, не нужен. Z7: Без вывода. Эта строка замкнула цикл javascript. Все, что было определено между Z2 и Z7, повторяется для каждой отдельной статьи.

## То, что нужно сделать
- очистите неиспользуемые записи в точке данных info.lastRequest, сохранив их в диалоговом окне администратора.
- кнопка для очистки неиспользуемых точек данных в диалоговом окне администратора
- ~~Мульти-виджеты RSS-каналов~~
- ~~Мульти-виджет-блокнот~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Виджет для Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- update jsonconfig responsive

### 3.1.0 (2024-08-11)

- adjust dependency to js-controller in a minor release

### 3.0.2 (2024-08-09)

- add keyword in package.json

### 3.0.1 (2024-08-09)

- add template example for articles as a Diashow
- adjust dependency to js-controller

### 3.0.0 (2024-07-24)

- update multifeed widget 3 and deprecate multifeed widget 2
- breaking change: in rssfeed widget 2: articles and meta have to be changed to rss.articles and rss.meta

### 2.10.0 (2024-07-11)

- fine tuning on templates and available variables
- fine tuning on format and translation
- move widget documentation form doc.html to readme

### 2.9.10 (2024-07-11)

- update images for dark and light theme

### 2.9.9 (2024-07-11)

- update packages
- update formating and improve error logging
- remove detailed sentry status reporting
- fix subscribing states

### 2.9.8 (2024-07-09)

- ignore widgets in vis-2
- add restart vis/vis2

### 2.9.7 (2024-06-22)

- formating code
- remove common.main from io-package.json

### 2.9.6 (2024-06-06)

- fix branch name in link

### 2.9.4 (2024-06-05)

- test release after rename branch from master to main

### 2.9.3 (2024-06-05)

- switch branchname from master to main
- add node 22 to tests

### 2.9.2 (2024-06-04)

- add some translations
- fix warning from adapter checker

### 2.9.1 (2024-06-03)

- update iobroker files and settings

### 2.8.2 (2024-04-21)

- (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

- (bluefox) Corrected vis widget
- admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

- added more information to sentry

### 2.6.0 (2022-07-26)

- added sentry

### 2.4.0 (2022-07-25)

- added name option to marquee widget

### 2.0.0

- Rework of the admin dialog
- Fix some errors and glitches

### 1.0.0

- Released in stable

### 0.9.0

- fixed/extended json template

### 0.8.0

- adapted configuration pages to react.
- Prepared for stable release

### 0.0.30

- added some template examples to the widget documentation

### 0.0.29

- improved error messages
- removed deprecated widget / change widget beta flag
- changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

- removed customtab

### 0.0.27

- adapter configuration is now editable

### 0.0.26

- corrected changelog size

### 0.0.25

- the error messages for the template are improved

### 0.0.24

- errors in the request of feeds are now real errors in the iobroker log
- loading of rules for ejs in the editor is improved
- marquee3 widget: options to show time and date

### 0.0.23

- republish to npm

### 0.0.22

- improvements in the configuration dialog
- remove unused admintab
- new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
- New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
- the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
- Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

- add link option to marquee widget
- widget help added
- marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

- add ejs syntax to template editor

### 0.0.19

- try to fix marquee widget.

### 0.0.18

- try to fix the wrong NoSave dialog

### 0.0.17

- rework setting objects and states

### 0.0.16

- improve logic adding rssfeed in configuration dialog
- fix wrong icon for marquee widget
- define default template for rssfeed widget
- deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
- widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

- fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

- update package.json and install new tools for stream encoding/decoding detection
- implement encoding detection and stream encoding
- change the ejs lib with a real browserified lib

### 0.0.13

- new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

- now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

- improve admin layout
- implement a forceRefresh button

### 0.0.10

- fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

- apply widget styles also to the inner span element, because they had not any effect on the marquee.
- renew the package-lock.json
- add categories to save feeds in subfolders
- improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

- improve lasrequest logic of the adapter
- fix problem with datapoint naming

### 0.0.7

- test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

- add attribute duration for widget marquee to control animation duration

### 0.0.5

- new widget marquee for article titles
- add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

- some adjustments in readme, io-package

### 0.0.3

- add addveyor build

### 0.0.2

- added widgets meta helper and article helper

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2021-2024 oweitman <oweitman@gmx.de>

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