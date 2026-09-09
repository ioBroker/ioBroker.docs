---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md
title: Руководство пользователя виджетов inventwo для ioBroker VIS 2
hash: Rzn3dfRfsEHXWKKpRhV4nHLammLEm19wGhG3txFPA0o=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/index.md)

# Руководство пользователя виджетов inventwo для ioBroker VIS 2

Добро пожаловать в документацию по виджетам inventtwo. В этом руководстве объясняется, как использовать каждый виджет в редакторе VIS 2 для создания собственных панелей управления умным домом.

## Что такое виджеты Inventtwo?

Набор виджетов inventtwo добавляет в VIS 2 настраиваемые плитки, элементы управления и элементы отображения. Все стили задаются непосредственно в боковой панели редактора VIS 2 — знание CSS не требуется.

---

## Обзор виджета

### Универсальный виджет

**Самый мощный виджет в наборе.** Одна плитка, которая может выступать в качестве кнопки, переключателя, навигационной ссылки, средства открытия диалогового окна или дисплея состояния только для чтения — и меняет свой внешний вид в зависимости от значения точки данных.

→ [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md)

![Универсальный виджет](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-universal.png)

---

### Ползунок

**Ползунок для числовых значений, расположенный горизонтально или вертикально.** Перетащите ползунок, чтобы установить значение, например, яркость, температуру или громкость. Полностью настраиваемый стиль — цвет направляющей, активный цвет, форма ползунка и метки шагов.

→ [Виджет слайдера](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md)

![Виджет слайдера](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-slider.png)

---

### Радиальный ползунок

**Круговой ползунок для числовых значений.** Работает так же, как обычный ползунок, но отображается в виде круглого циферблата, что отлично подходит для плиток, используемых в термостатах.

→ [Виджет радиального ползунка](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md)

![Виджет радиального ползунка](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-radial-slider.png)

---

### Выключатель

**Переключатель для включения/выключения или любого двухпозиционного индикатора.** Выглядит как классический переключатель «вкл/выкл». Ползунок и кнопка управления имеют независимое оформление.

→ [Переключить виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md)

![Виджет переключения](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-switch.png)

---

### Флажок

**Флажок для включения/выключения или любой двухпозиционной точки данных.** Проще, чем переключатель — просто флажок с подписью.

→ [Виджет флажка](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md)

![Виджет флажка](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-checkbox.png)

---

### Стол

**Отображает массив данных JSON в виде отформатированной таблицы.** Позволяет сортировать столбцы, фильтровать строки, выделять строки по значению и форматировать ячейки в текст, числа, даты или изображения.

→ [Виджет таблицы](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md)

![Виджет таблицы](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-table.png)

---

### Падать

**Выпадающее меню, параметры которого считываются из списка состояний объекта ioBroker.** Выберите значение, и оно будет записано обратно в точку данных.

→ [Выпадающий виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md)

![Выпадающий виджет](../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-dropdown.png)

---

### Шатер

**Прокрутка текста от точки данных или вручную введенного текста.** Полезно для новостных лент, сообщений о состоянии или длинных заметок, которые не помещаются в фиксированное пространство.

→ [Виджет бегущей строки](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md)

---

### Список ценностей

**Разделяет текстовое значение на отформатированный маркированный список.** Отлично подходит для отображения значений, разделенных запятыми или переносами строк, в виде читаемого списка.

→ [Виджет списка значений](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md)

---

### Календарь

**Календарь на весь месяц.** Работает как средство выбора даты (чтение и ввод даты), как средство отображения даты только для чтения или как инструмент для выделения сегодняшнего дня — свободно комбинируется, с полной настройкой цвета и макета.

→ [Виджет календаря](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md)

---

## С чего начать

- **Создание панели управления с кнопками?** → [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md)
- **Регулировка яркости или температуры?** → [Виджет-слайдер](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md) или [радиальный виджет-слайдер](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md)
- **Простое управление включением/выключением?** → [Виджет переключателя](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) или [виджет флажка](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md)
- **Отображение табличных данных?** → [Виджет таблицы](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md)
- **Выбираете или отображаете дату?** → [Виджет календаря](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md)
- **Выбираете режим или сцену?** → [Выпадающее меню](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md)