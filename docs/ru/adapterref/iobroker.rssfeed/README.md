---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rssfeed/README.md
title: Адаптер ioBroker для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF).
hash: Xa4qBhowhEn6TvFjZozTQPpz0VgyJsHuYFwntgBQ4hQ=
---
# Адаптер ioBroker для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF).

![Версия NPM](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Количество установок](https://iobroker.live/badges/rssfeed-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/rssfeed-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

![Логотип](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

**Тесты:**![Тестирование и выпуск](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Обзор

Этот адаптер запрашивает и сохраняет RSS-каналы различных стандартов, включая Atom, RSS и RDF. Входящие в комплект виджеты VIS 1 и VIS 2 могут отображать сохраненные каналы. Эти виджеты с поддержкой шаблонов позволяют настраивать вывод HTML и CSS через EJS.

Важно: В связи с ошибками в автоматически сгенерированных переводах, действителен только английский перевод.

## Оглавление

- [Обзор](#overview)
- [Конфигурация](#configuration)
- [Документация](#documentation)
  - [Виджеты VIS 1](#vis-1-widgets)
  - [Виджеты VIS 2](#vis-2-widgets)
  - [Обозначение шаблона EJS](#ejs-template-notation)
- [Все](#todo)
- [Список изменений](#changelog)
- [Лицензия](#license)

## Конфигурация

Установите адаптер из стабильного репозитория. Новые функции и исправления также можно протестировать в бета-репозитории. Следите за объявлениями в теме тестирования и поддержки адаптера на форуме ioBroker.

[Ветка обсуждения поддержки iobroker на форуме rssfeed](https://mdcldn.short.gy/GqaIDT)

После установки адаптер появится в списке адаптеров ioBroker. Если изменения на веб-странице, такие как виджеты или диалоговое окно конфигурации, не отображаются, загрузите файлы адаптера повторно:

```bash
iobroker upload rssfeed
```

Создайте экземпляр, используя кнопку «плюс» в списке адаптеров.

### Общие настройки

| Параметр                                      | Описание                                                                                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Минимальное время обновления по умолчанию     | Интервал запроса каналов по умолчанию, в минутах. Начальное значение — 60 минут.                                                                                 |
| Максимальное количество статей (по умолчанию) | Максимальное количество статей, сохраняемых в ленте по умолчанию.                                                                                                |
| Агент пользователя                            | Необязательный, но рекомендуемый HTTP-агент пользователя, отправляемый при запросе ленты. Обновите его, если провайдер отклоняет старые идентификаторы браузера. |

Значение по умолчанию для пользовательского агента в режиме выпуска следующее:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36
```

### Настройки подачи

| Параметр         | Описание                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Имя              | Имя, используемое для созданного состояния. Имя должно быть уникальным в пределах папки.                                       |
| Категория        | Необязательная подпапка, в которой создается состояние.                                                                        |
| URL              | Полный адрес фида, включая`http://` или`https://` .                                                                            |
| Обновление (мин) | Необязательный интервал обновления, специфичный для данного потока данных. Если поле пустое, используется общее значение.      |
| Статьи Макса     | Дополнительное ограничение на количество товаров, специфичное для данного фида. Если поле пустое, используется общее значение. |

После сохранения конфигурации каждый канал становится доступен в виде состояния в формате JSON в дереве объектов. Удаление канала из конфигурации не приводит к автоматическому удалению его существующих состояний.

## Документация

Подробная пользовательская документация разделена по генерациям виджетов и по языкам шаблонов. Руководство по каждому виджету было проверено на соответствие его текущему исходному определению и содержит описание настроек, значений по умолчанию, данных шаблона и соответствующего поведения во время выполнения.

### Виджеты VIS 1

В руководстве по VIS 1 описаны все классические виджеты: одиночная лента, комбинированные ленты, метаданные и вспомогательные элементы для статей, а также бегущая строка заголовка. Для каждого виджета предусмотрена отдельная глава и таблица конфигурации, а также переменные шаблона и особенности поведения, специфичные для VIS 1.

[Откройте документацию по виджету VIS 1.](docs/vis1-widgets.md)

### Виджеты VIS 2

В руководстве по VIS 2 описаны все пять компонентов на основе React, их полные настройки в редакторе свойств, значения по умолчанию, переменные шаблона, поведение агрегации ленты и известные ограничения, видимые пользователю.

[Откройте документацию по виджету VIS 2.](docs/vis2-widgets.md)

### Обозначение шаблона EJS

В руководстве по EJS объясняется общая нотация шаблонов независимо от конкретного виджета. Оно охватывает экранированный и неэкранированный вывод, условия, циклы, резервные значения, CSS, ссылки, скрипты, таймеры и устранение неполадок. Переменные и примеры, специфичные для виджетов, остаются в соответствующем руководстве по VIS.

[Откройте документацию по шаблону EJS.](docs/ejs-templates.md)

## Все

- Удалите неиспользуемые записи в`info.lastRequest` при сохранении конфигурации администратора.
- Добавьте кнопку для удаления неиспользуемых состояний ленты из дерева объектов.

## Changelog

[Older changelogs can be found here](CHANGELOG_OLD.md)

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.1 (2026-09-01)

- update EJS and update preparation mechanism
- integrate the VIS 2 RSS feed widgets into this adapter
- split the VIS 1, VIS 2, and EJS documentation into dedicated user guides
- add automatic overflow handling and scrollbars to widgets
- fix date/publish date usage in templates
- updated and reworked readme

### 4.1.2 (2026-06-10)

- fix package lock

### 4.1.0 (2026-06-10)

- fix repochecker

### 4.0.4-alpha.0 (2026-06-09)

- add user agent to settings and Axios requests

### 4.0.3 (2026-03-26)

- update packages
- fix repochecker

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