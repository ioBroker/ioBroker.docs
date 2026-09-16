---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md
title: Выпадающий виджет
hash: P+FQAbmodAF+TnQUa2RvbyZTVRURLvTmeuoupR6cRfI=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/dropdown-widget.md)

# Выпадающий виджет

Виджет «Выпадающее меню» отображает список выбираемых параметров и записывает выбранное значение обратно в точку данных. Параметры загружаются автоматически из определения объекта ioBroker — ручное управление списком не требуется. Это идеально подходит для выбора режимов, сцен, скорости вращения вентилятора или любой точки данных, для которой в объекте определен фиксированный список допустимых значений.

![Выпадающий виджет](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-dropdown.png)

---

## Как добавить виджет

1. Перетащите **выпадающее меню** из списка виджетов **inventwo design** на свой экран.
2. Щелкните **«Идентификатор объекта»** и выберите точку данных, объект ioBroker которой имеет`states` список (в редакторе объектов это поле "Состояния" на вкладке "Общие").
3. Параметры выпадающего списка загружаются автоматически. Если вы видите пустой выпадающий список, возможно, у выбранного объекта отсутствует список состояний.
4. При желании введите **заголовок** для выпадающего списка.
5. Настройте внешний вид виджета в группе **inventtwo - Dropdown** .

> **Что такое список состояний?** В ioBroker объекты могут иметь предопределенный список допустимых значений с метками, например:`0: "Off"` ,`1: "Low"` ,`2: "Medium"` ,`3: "High"` Виджет выпадающего списка считывает этот список и использует его в качестве пунктов меню.

---

## Настройки

### Общий

| Параметр                        | Что это делает                                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта**       | Данные для чтения и записи. Параметры загружаются из списка состояний этого объекта.                                                                                                                                |
| **Отобразить значение в метке** | При включении этой опции рядом с текстом отображается цифровая клавиша, например:`1 - Low` Если эта функция отключена, отображается только текстовая метка. По умолчанию: включено.                                 |
| **Показать текст**              | При включении этой опции отображается текстовая часть списка состояний. Используйте в сочетании с **опцией «Показать значение в метке»** , чтобы точно контролировать отображаемый контент. По умолчанию: включено. |
| **Только для чтения**           | При включении этой функции текущее значение отображается в виде обычного текста в стилизованном блоке — без стрелки выпадающего списка и без интерактивного элемента.                                               |
| **Заголовок**                   | Дополнительная метка, отображаемая над выпадающим списком, например:`Fan speed` или`Mode` .                                                                                                                         |

**Комбинации отображения этикеток:**

| Показать значение | Показать текст | Пример метки             |
| ----------------- | -------------- | ------------------------ |
| ✓                 | ✓              | `1 - Low` (по умолчанию) |
| ✗                 | ✓              | `Low`                    |
| ✓                 | ✗              | `1`                      |

---

### Фоновые условия

Эта группа позволяет изменять цвет фона выпадающего списка в зависимости от текущего значения. Полезно для выделения критических состояний (например, красный цвет при «Ошибке», зеленый при «ОК»).

| Параметр               | Что это делает                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Фоновый OID**        | По умолчанию условие оценивается по основному **идентификатору объекта** . Укажите здесь другой идентификатор объекта, если хотите, чтобы фон соответствовал другой точке данных. |
| **Количество условий** | Сколько цветовых правил добавить? Каждое условие оценивается по порядку, и побеждает тот, кто первым найдет совпадение.                                                           |

Каждое условие имеет:

| Параметр               | Что это делает                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Оператор сравнения** | Как сравнивать значения: равно, не равно, больше, меньше, больше равно, меньше равно. |
| **Ценить**             | Значение, с которым следует сравнивать.                                               |
| **Фон**                | Цвет фона, используемый при выполнении этого условия.                                 |

---

### inventtwo — Выпадающее меню

| Параметр                                        | Что это делает                                                                                                                                                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Из виджета**                                  | Скопируйте все визуальные настройки из другого выпадающего виджета.                                                                                                                    |
| **размер шрифта**                               | Размер текста в выпадающем списке и выбранного значения в пикселях.                                                                                                                    |
| **Цвет текста**                                 | Цвет текста в выпадающем списке.                                                                                                                                                       |
| **Фон**                                         | Цвет фона выпадающего списка по умолчанию.                                                                                                                                             |
| **Выделить цвет**                               | Цвет фона при наведении курсора на опцию или для текущей выбранной опции.                                                                                                              |
| **цвет границы**                                | Цвет границы выпадающего списка. Цвет подсветки меняется при наведении курсора/фокусировке.                                                                                            |
| **ширина границы**                              | Толщина границы выпадающего списка в пикселях.                                                                                                                                         |
| **Радиус границы**                              | Насколько закруглены углы выпадающего списка в пикселях.                                                                                                                               |
| **размер шрифта заголовка**                     | Размер шрифта для заголовка над выпадающим списком.                                                                                                                                    |
| **Цвет заголовка**                              | Цвет заголовка.                                                                                                                                                                        |
| **Применить условный фон к заголовку**          | При включении этой функции цвет фона области заголовка также изменяется, чтобы соответствовать цвету активного фонового условия.                                                       |
| **Отступы заголовка сверху/снизу/слева/справа** | Интервал вокруг заголовка.                                                                                                                                                             |
| **Тень выпадающего списка**                     | Тень для выпадающего списка и открытого меню. Задайте смещение по осям X и Y, размытие, распространение и цвет.                                                                        |
| **тень виджета**                                | Тень для всего контейнера виджета (включая область заголовка). Задайте смещение по осям X и Y, размытие, распространение и цвет. Все значения по умолчанию равны 0 (тень отсутствует). |

---

## Советы

- **Выпадающий список пуст:** убедитесь, что у выбранного объекта действительно есть список состояний. Откройте административную панель ioBroker, перейдите в раздел «Объекты», найдите свой объект и проверьте, заполнено ли поле «Состояния» на вкладке «Общие».
- **Отображение только для чтения:** включите режим **«Только для чтения»** , чтобы использовать выпадающий список исключительно как виджет отображения — он будет показывать текущее значение в стилизованном блоке без какого-либо поведения выпадающего списка.
- **Цветовая индикация:** Используйте **условия фона** , чтобы виджет немедленно передавал текущее состояние с помощью цвета, например, зеленый для состояния «Работает», желтый для состояния «Режим ожидания», красный для состояния «Ошибка».

---

## См. также

- [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — для создания пользовательских макетов кнопок/плиток с стилизацией для каждого состояния.
- [Виджет таблицы](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) — для отображения табличных данных.