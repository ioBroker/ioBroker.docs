---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rssfeed/README.md
title: Адаптер ioBroker для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF)
hash: 2EJ3w/l3dIfXZJMpjQqU13o7sbmZyqWpAWMgWgAWZZY=
---
![Логотип](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Количество установок](https://iobroker.live/badges/rssfeed-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/rssfeed-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

# Адаптер ioBroker для запроса и отображения RSS-каналов разных стандартов (Atom, RSS, RDF)
**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF).
Вы можете настроить вывод канала с помощью системы шаблонов. В шаблоны вы можете включать HTML, CSS и Javascript.

Важно: действителен только английский перевод из-за ошибок в автоматических переводах на другие языки, сделанных iobroker.

## Добавить экземпляр
После установки адаптер должен отображаться в разделе адаптера в iobroker.
Иногда случается, что изменения не видны, особенно при веб-изменениях (диалог виджетов/конфигурации), возможно, придется выполнить в командной строке следующую команду:

```bash
iobroker upload rssfeed
```

В правой области в строке адаптера экземпляр можно добавить с помощью кнопки плюс

## Конфигурация
Конфигурация проста. Есть всего несколько полей

| Настройка | описание |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Обновление по умолчанию (мин) | — это общая спецификация того, как часто канал должен вызываться снова в минутах. По умолчанию — 60 минут |
| Макс Артикель (Стандарт) | Здесь можно ограничить общий объем данных, подлежащих обработке.                                                      |

Затем для каждого нового канала:

| Настройка | описание |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Имя | Имя точки данных. Внутри папки имя не должно появляться дважды.                        |
| Категория | Имя подпапки, в которой должна появиться точка данных. Категория должна быть уникальной |
| URL | Полный адрес фида (с http:// или https://, см. примеры ниже) |
| Обновить (мин) | Для этого фида можно указать другое значение. В противном случае принимается общая спецификация |
| Макс Статьи | Для этого фида можно указать другое значение. В противном случае принимается общая спецификация |

Если вы сохранили и закрыли конфигурацию, данные канала можно будет найти в виде точки данных JSON в дереве объектов.
Если вы удалите запись, точки данных не будут удалены.

## Визуалы и виджеты
Следующие виджеты действительно существуют

- «Виджет RSS-канала 2» — для отображения одного канала.
- `RSS Feed Multi widget` - для отображения нескольких объединенных каналов в одном виджете.
- `RSS Feed Meta Helper` — вспомогательный виджет для проверки метаданных канала.
- `RSS Feed Article Helper 2` — вспомогательный виджет для проверки данных статьи в канале.
- `RSS Feed Title Marquee 3` — виджет для отображения заголовков канала в виде рамки.
- `JSON Template` — виджет, который не имеет ничего общего с RSS-каналами, но использует ту же технологию, и вы можете определить собственный шаблон для отображения любых JSON-данных в Vis.

Документация по vis-виджетам доступна внутри vis или [Документация по виджетам/немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html).

## Шаблон на основе примеров
Пример, который я тестировал со следующими RSS-каналами:

- <http://www.tagesschau.de/xml/rss2>
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Система шаблонов работает с определенными тегами.
Используемые теги означают следующее

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной не экранируется.    |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно является закрывающим тегом для завершения одного из предыдущих |

Все, что находится за пределами этих тегов, отображается точно так, как есть, или интерпретируется как HTML. (см., например, p-tag, div-tag, small-tag. В шаблоне доступны 2 предопределенные переменные.

### `meta`
Содержит всю метаинформацию о канале. Доступен следующий контент. Я думаю, что идентификаторы говорят сами за себя. В справке я опишу их более подробно. или укажите содержимое (некоторые из них представляют собой массивы)

- `meta.title`
- `мета.описание`
- `мета.ссылка`
- `meta.xmlurl`
- `мета.дата`
- `meta.pubdate`
- `мета.автор`
- `мета.язык`
- `мета.изображение`
- `мета.фавикон`
- `meta.copyright`
- `мета.генератор`
- `мета.категории`

#### `articles`
Представляет собой массив с отдельными элементами (массив JavaScript). Каждый элемент имеет следующие свойства.
Чтобы оно подходило, я, например, сделаю перед ним пункт-приставку. Но если вы хотите, вы можете выбрать это сами. Его нужно только назвать соответствующим образом в цикле (forEach). И здесь идентификаторы говорят сами за себя. Не все атрибуты заполняются в каждом фиде. Наиболее важные из них уже включены в шаблон выше.

- `item.title`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `item.author`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `item.source`
- `item.enclosures`

## Пример шаблона и подробное описание
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Краткое описание того, что происходит в отдельных строках Z1: Вывод заголовка ленты Z2: Без вывода. Команда Javascript для перебора всех статей, при каждом повороте текущий элемент присваивается переменной item.
Z3: Вывод даты и времени есть. Он заключен в небольшой тег p/для форматирования. Для форматирования используется функция формата даты vis-own. Описание можно найти в адаптере.
Z4: вывод заголовка статьи. Тег Header 3 используется для форматирования.
Z5: Вывод содержания статьи. Он заключен в p-тег. Здесь, по крайней мере в двух примерах, включен HTML-код, который обычно включает изображение и описательный текст. Z6: Выведите тег div, который очищает специальное форматирование в Feed-html (в обоих примерах для tagesschau и bild он необходим. Другой корм, возможно, в этом не нуждался.
Z7: Без вывода. Эта строка замыкает цикл JavaScript. Все, что было определено между Z2 и Z7, повторяется для каждой статьи.

## Делать
- очистка неиспользуемых записей в datapoint info.lastRequest путем сохранения в диалоговом окне администратора.
- кнопка очистки неиспользуемых точек данных в диалоге администратора
- ~~Мульти-виджеты RSS-каналов~~
- ~~Выделение мультивиджетов~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Виджет для Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- ignore widgets in vis-2

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