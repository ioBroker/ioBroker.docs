---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md
title: Виджет календаря
hash: NaiTGr6PZnusisihoRTaOkIDnGt24YCLGyLGmbhezvA=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/calendar-widget.md)

# Виджет календаря

Виджет календаря отображает полный месяц на основе [календаря дат MUI](https://mui.com/x/react-date-pickers/date-calendar/) . Он может работать как средство выбора даты (чтение и запись даты из/в точку данных), как средство отображения даты только для чтения или просто выделять сегодняшнюю дату — все три варианта одновременно, если хотите.

Хотите отображать события/встречи (например, из календаря iCal)? Используйте [виджет «Календарь событий»](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/event-calendar-widget.md) .

![Виджет календаря](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-calendar.png)

---

## Как добавить виджет

1. Перетащите **виджет «Календарь»** из списка виджетов **Inventwo Design** на свой экран.
2. Щелкните **«Идентификатор объекта»** и выберите точку данных, содержащую дату.
3. Задайте **формат значения точки данных** в соответствии с тем, как точка данных хранит свое значение (метка времени или строка даты в формате ISO).
4. Включите параметр **«Только для чтения»,** если виджет должен отображать только дату, не позволяя вносить изменения.
5. Оформите календарь в группах **inventtwo - Calendar ...**

---

## Настройки

### Общий

| Параметр                                 | Что это делает                                                                                                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта**                | Календарь считывает выбранную дату из этой точки данных. Также производится запись, если не включена **опция «Только для чтения»** .                                                                                                          |
| **Формат значения точки данных**         | Способ чтения/записи значения точки данных: **метка времени** (число, миллисекунды с начала эпохи) или **дата ISO** (строка,`YYYY-MM-DD` ).                                                                                                   |
| **Только для чтения**                    | При включении этой функции календарь отображает только дату из точки данных — щелчок по дню ничего не записывает.                                                                                                                             |
| **Сегодняшний главный момент**           | Отмечает сегодняшнюю дату с помощью четкой рамки/фона, используя цвета из **набора inventtwo - Calendar today** .                                                                                                                             |
| **Отключить прошлые даты**               | Выбрать дни, предшествующие сегодняшнему дню, невозможно.                                                                                                                                                                                     |
| **Отключить будущие даты**               | Выбрать дни после сегодняшнего дня невозможно.                                                                                                                                                                                                |
| **Разрешить навигацию по месяцам/годам** | При включении (по умолчанию) щелчок по заголовку позволяет пользователю перейти к определенному месяцу или году. При отключении отображается только сетка дней со стрелками «предыдущий/следующий месяц».                                     |
| **Первый день недели**                   | Начинается ли неделя в **понедельник** или **в воскресенье** . Это влияет как на сетку дней, так и на номера календарных недель.                                                                                                              |
| **Показать номера календарных недель**   | Добавляет слева от каждой строки столбец с номером календарной недели.                                                                                                                                                                        |
| **Тип календарной недели**               | Видно только при отображении номеров недель. **ISO-8601** : недели начинаются с понедельника, неделя 1 — это неделя, содержащая первый четверг года (европейский стандарт). **Простой вариант** : неделя 1 — это неделя, содержащая 1 января. |
| **Размер клетки в день**                 | Размер каждой ячейки дня в пикселях (20–80). Также управляет размером меток дня недели и номера недели.                                                                                                                                       |

---

### inventwo — Заголовок календаря

Заголовочная строка с указанием месяца/года и стрелками навигации.

| Параметр                                        | Что это делает                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| **Из виджета**                                  | Скопируйте все настройки заголовка из другого виджета календаря. |
| **Цвет текста заголовка**                       | Цвет метки месяца/года.                                          |
| **цвет значка заголовка**                       | Цвет стрелок навигации и значка переключения режимов просмотра.  |
| **Цвет значка заголовка при наведении курсора** | Цвет этих значков при наведении курсора.                         |

---

### inventtwo — Календарь будних дней

Ряд сокращений дней недели (Пн, Вт, Ср, …).

| Параметр                   | Что это делает                                                 |
| -------------------------- | -------------------------------------------------------------- |
| **Из виджета**             | Скопируйте настройки дней недели из другого виджета календаря. |
| **Цвет текста дня недели** | Цвет сокращений дней недели.                                   |

---

### inventwo — Календарный день

Обычные, не отобранные клетки дневного цикла.

| Параметр                               | Что это делает                                                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Из виджета**                         | Скопировать настройки дня из другого виджета календаря.                                                                                              |
| **Цвет текста дня**                    | Цвет текста соответствует обычному дню.                                                                                                              |
| **Цвет при наведении курсора на день** | Цвет фона отображается при наведении курсора на день (в режиме редактирования / только для чтения, наведение курсора не оказывает никакого эффекта). |
| **Радиус дневной границы**             | Насколько круглая клетка в дневной фазе (0–100 %). 50 % соответствует кругу, 0 % — квадрату.                                                         |
| **День снаружи месяца цвет текста**    | Цвет текста для предшествующих/следующих дней предыдущего/следующего месяца отображается таким образом, чтобы заполнить сетку.                       |
| **цвет текста дня инвалидности**       | Цвет текста для дней отключен с помощью параметра **«Отключить прошлые/будущие даты»** .                                                             |

---

### inventwo — Календарь выбранного дня

Выбранная в данный момент дата.

| Параметр                       | Что это делает                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **Из виджета**                 | Скопировать настройки из другого виджета календаря.                                      |
| **Цвет фона выбранного дня**   | Фон выбранного дня.                                                                      |
| **Цвет текста выбранного дня** | Цвет текста соответствует выбранному дню.                                                |
| **Выбранная дневная тень**     | Добавьте тень к выбранному дню. Задайте смещение по осям X и Y, размытие, размер и цвет. |

---

### inventwo — Календарь на сегодня

Отображается только при включенной функции **«Выделить сегодня»** .

| Параметр                  | Что это делает                                                     |
| ------------------------- | ------------------------------------------------------------------ |
| **Из виджета**            | Скопировать настройки из другого виджета календаря.                |
| **Сегодня цвет границы**  | Цвет границы используется для обозначения ячейки сегодняшнего дня. |
| **Сегодняшний цвет фона** | Цвет фона сегодняшней ячейки.                                      |
| **Сегодня цвет текста**   | Цвет текста ячейки за сегодняшний день.                            |

---

### inventwo — Номер календарной недели

Отображается только при включенной опции **«Показывать номера календарных недель»** .

| Параметр                      | Что это делает                                      |
| ----------------------------- | --------------------------------------------------- |
| **Из виджета**                | Скопировать настройки из другого виджета календаря. |
| **Цвет текста номера недели** | Цвет текста в столбце с номером недели.             |

---

## Советы

- **Простой выбор даты:** отключите режим **«Только чтение»** , выберите **«Меток времени»** или **«Дата ISO»** в соответствии с типом вашей точки данных.
- **Отображение даты только для чтения с маркером «сегодня»:** включите режим **«Только для чтения** » и **выделите сегодня** — календарь отобразит сохраненную дату как выбранную и четко отмеченную как «сегодня», без возможности редактирования.
- **Язык:** Названия месяцев, обозначения дней недели и правила календарной недели автоматически подстраиваются под язык браузера.
- **Цвета выбора месяца/года:** При щелчке по заголовку для перехода к определенному месяцу или году в сетке повторно используются цвета **дней из Inventwo - Calendar** (текст, при наведении курсора, отключено) и цвета **выбранных дней из Inventwo - Calendar** для выделенной записи — отдельных настроек для этого нет.
- **Повторное использование стилей:** используйте **виджет «От»** в каждой группе стилей, чтобы обеспечить визуальную согласованность нескольких календарей.

---

## См. также

- [Виджет календаря событий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/event-calendar-widget.md) — для отображения событий/встреч в формате месяц/неделя/день.
- [Виджет таблицы](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) — для отображения значений дат в составе более крупной таблицы данных.