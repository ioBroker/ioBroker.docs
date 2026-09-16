---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md
title: Виджет списка значений
hash: R/DvO8pEaemEoOBSxe3Qhgi84kSeHHhjX+bMvy7zV5o=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/value-list-widget.md)

# Виджет списка значений

Виджет «Список значений» принимает текстовое значение — из точки данных или введенное вручную — разбивает его на отдельные элементы и отображает их в виде отформатированного маркированного списка. Это полезно для отображения значений, разделенных запятыми или переносами строк, в удобочитаемом формате.

**Пример:** Точка данных, содержащая`"Living Room, Kitchen, Bedroom"` отображается в виде маркированного списка из трех пунктов.

---

## Как добавить виджет

1. Перетащите **список значений** из списка виджетов **inventwho Design** на ваше представление.
2. Выберите **идентификатор объекта** , значение которого содержит элементы списка, или введите текст непосредственно в **поле «Текст (вручную)»** .
3. Установите **разделитель** в соответствии с тем, как разделены ваши элементы (например)`,` для значений, разделенных запятыми,`\n` (для переносов строк).
4. Выберите стиль маркера в группе **«Внешний вид»** .

---

## Настройки

### Общий

| Параметр                        | Что это делает                                                                                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта**       | Если задано значение параметра, элементы списка берутся из текущего значения этой точки данных. Поле для ввода текста вручную скрывается при выборе OID.                                      |
| **Текст (руководство)**         | Текст для разделения на элементы списка. Виден только в том случае, если не указан идентификатор объекта.                                                                                     |
| **Сепаратор**                   | Символ или строка, используемая для разделения текста на элементы. По умолчанию:`,` . Использовать`\n` для новых строк,`\t` для вкладок.                                                      |
| **Удалите пустое пространство** | При включении этой функции из каждого элемента удаляются начальные и конечные пробелы. Рекомендуется использовать при работе со значениями, разделенными запятыми, с пробелами после запятой. |
| **Игнорировать пустые записи**  | При включении этой функции элементы, оставшиеся пустыми после разделения (и, при необходимости, обрезки), не отображаются.                                                                    |

---

### Появление

| Параметр                                             | Что это делает                                                                                                                                                                                                                           |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Тип пули**                                         | Символ, отображаемый перед каждым элементом. Варианты: **Диск** (•), **Круг** (○), **Квадрат** (▪), **Тире** (–), **Стрелка** (›), **Пронумерованный** (1, 2, 3), **Нет** (без маркера), **Пользовательский** (свой собственный символ). |
| **Пользовательский персонаж**                        | Отображается только при выборе **типа маркера «** **Пользовательский** ». Введите любой символ или смайлик.                                                                                                                              |
| **цвет пули**                                        | Цвет символа пули. Скрыт, если тип пули — **None** .                                                                                                                                                                                     |
| **Расстояние между маркером и текстом (в пикселях)** | Горизонтальный зазор между маркером списка и текстом элемента. Скрывается, если тип маркера списка — **None** .                                                                                                                          |
| **Межстрочный интервал (пиксели)**                   | Вертикальный промежуток между элементами списка.                                                                                                                                                                                         |
| **Набивка**                                          | Внутренний отступ вокруг всего списка в пикселях.                                                                                                                                                                                        |

---

## Советы

- **Значения, разделённые символом новой строки:** установите разделитель на`\n` Разбить многострочную строку на отдельные элементы списка.
- **Оформление шрифта:** семейство шрифтов, размер, толщина и цвет текста списка задаются с помощью стандартных настроек CSS виджета VIS, а не с помощью настроек inventww.
- **Динамические списки:** Подключите виджет к строковой точке данных, которая обновляется скриптом или адаптером. При каждом изменении значения список автоматически перерисовывается.

---

## См. также

- [Виджет «Беговая строка»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md) — отображает один прокручиваемый текст вместо списка.
- [Виджет таблицы](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) — для структурированных табличных данных из массива JSON.