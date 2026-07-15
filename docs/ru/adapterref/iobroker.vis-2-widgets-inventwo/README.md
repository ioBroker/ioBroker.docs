---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: Виджеты inventwo для ioBroker vis 2.0
hash: uwt5jMB8uAYM3LrexP18oyBDqY11AhZW2vy3zF+ZR+A=
---
![Логотип](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Inventwo Виджеты для ioBroker vis 2.0
---

## О
Набор настраиваемых виджетов для **ioBroker vis 2.0** — создан для пользователей, желающих полностью контролировать внешний вид своих панелей управления. Каждый виджет имеет обширные возможности стилизации и легко интегрируется с данными ioBroker.

📖 **[Пользовательская документация](docs/README.md)** — подробные руководства по всем виджетам, настройкам и примерам.

---

## Виджеты
| Виджет | Описание |
|---|---|
| [Универсальный](#widget---universal) | Универсальный виджет: переключатель, кнопка, навигация, дисплей только для чтения, палитра цветов, аналоговые часы и многое другое |
| [Радиальный ползунок](#widget---radial-slider) | Круговой ползунок с настраиваемыми углами, стилем направляющей и ползунка |
| [Выключатель](#widget---switch) | Переключатель с настраиваемыми метками и цветами дорожек/ползунков |
| [Флажок](#widget---checkbox) | Флажок с настраиваемыми значениями true/false и расположением метки |
| [Стол](#widget---table) | Динамическая таблица данных JSON с сортировкой, фильтрацией и условным изменением цвета строк |
| [Падать](#widget---dropdown) | Выпадающий список автоматически заполняется из состояний объекта ioBroker |
| [Шатер](#widget---marquee) | Бегущая строка с настраиваемой скоростью, направлением и интервалом |
| [Список ценностей](#widget---value-list) | Маркированный список, сгенерированный на основе текстового значения или точки данных |
| [Список значений](#widget---value-list) | Маркированный список, созданный на основе текстового значения или точки данных |

---

## Виджет - Универсальный
Главный виджет этого адаптера — это единственный виджет, который может выступать в качестве переключателя, кнопки, элемента навигации, дисплея только для чтения и многого другого.

![Предварительный просмотр универсального виджета](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_universal_widget.png)

### Типы взаимодействия
- **Переключатель** – переключает точку данных между двумя значениями.
- **Кнопка** – устанавливает значение при нажатии; при желании удерживает значение в течение всего времени нажатия и сбрасывается при отпускании.
- **Навигация** – при нажатии переходит к визуальному представлению.
- **Только для чтения** – отображает значение без какого-либо взаимодействия.
- **Просмотр в диалоговом окне** – открывает представление в модальном диалоговом окне.
- **Увеличение/уменьшение значения** – увеличивает или уменьшает числовое значение.
- **HTTP-запрос / Открытие URL-адреса** – отправляет HTTP-запрос или открывает URL-адрес (в той же вкладке или в новой).

### Режимы отображения
- **Одна кнопка** – один виджет с одним или несколькими состояниями
- **Разделенные кнопки** – каждое состояние отображается как отдельная кнопка (заменяет классический список переключателей).

### Типы контента
Свободно комбинируйте несколько элементов контента в одном состоянии:

![Предварительный просмотр типов контента](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_types.png)

- **Текст / HTML** – статическая или динамическая метка
- **Иконка** – библиотека иконок ioBroker
- **Изображение** – локальное или удаленное изображение с настраиваемыми масштабом, положением и режимом заливки.
- **Встраивание в виджет** – позволяет встроить другой виджет непосредственно внутрь основного виджета.
- **Палитра цветов** – полнофункциональная палитра цветов (HEX, HEX8, RGB, HSL, HSV, CIE) с настраиваемой видимостью компонентов.

![Предварительный просмотр палитры цветов](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_colorpicker.png)

- **Аналоговые часы** – SVG-изображение аналоговых часов с настраиваемым дизайном циферблата, делениями, цифрами и стрелками.

![Предварительный просмотр аналоговых часов](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_type_clock_analog.png)

### Другие функции
- Несколько штатов с индивидуальным оформлением для каждого штата.
- Анимация обратной связи при нажатии
- Условное сравнение состояний (по значению или другим критериям)
- Настраиваемые параметры диалогового окна (полноэкранный режим, закрытие по щелчку вне окна, таймер автоматического закрытия)

### Дизайн
Все аспекты виджета можно настроить:

![Предварительный просмотр настройки CSS](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_css_customization.png) ![Предварительный просмотр примеров дизайна](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

Подробные примеры проектирования см. в [здесь](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/universal-widget-design-examples.md).

### Многоугольные фигуры
Виджеты не ограничиваются прямоугольниками. Параметр **Форма** позволяет выбирать из встроенных многоугольных форм или определять полностью настраиваемый контур:

| Форма | Описание |
|-------|-------------|
| Прямоугольник | По умолчанию — стандартная прямоугольная карта |
| Треугольник | Равносторонний треугольник |
| Алмаз | Четырехсторонний повернутый квадрат |
| Пятиугольник | Пятиугольник |
| Шестиугольник | 6-сторонний многоугольник — идеально подходит для сотовой компоновки |
| Семиугольник | Семиугольник |
| Восьмиугольник | 8-сторонний многоугольник |
| Звезда | Пятиконечная звезда |
| **Пользовательский** | Любой многоугольник — точки контура обрезки вводятся вручную |

![Предварительный просмотр фигур](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_shapes.png)

**Дополнительные варианты формы:**

- **Вращение** (0–359°) — поверните любой встроенный многоугольник на любой угол.
- **Радиус скругления углов** (0–30) — равномерно скругляет все вершины с помощью кривых Безье; подходит для любых фигур, включая пользовательские.
- **Пользовательские точки полигона** — пары `X% Y%`, разделенные запятыми, по часовой стрелке, например, `40% 0%, 100% 50%, 40% 100%, 0% 50%` · Создавайте пути визуально на [https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)

Все существующие функции — внутренняя/внешняя тень, рамка, градиентный фон, обратная связь при клике — работают со всеми фигурами.

> **Пример:** Шестиугольная панель управления в виде сот → [docs/example-views/hexagonal-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/hexagonal-view.md) > **Пример:** Прямоугольная панель управления → [docs/example-views/rectangle-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/rectangle-view.md)

---

## Виджет - Слайдер
Горизонтальный или вертикальный ползунок для управления числовыми данными.

![Предварительный просмотр слайдера](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_sliders.png)

**Основные характеристики:**

- Горизонтальная и вертикальная ориентация
— Настраиваемые минимальные, максимальные значения и шаг (автоматическое считывание из объекта точки данных)
- Дополнительные метки минимального/максимального значения
- Отображение шага (автоматическое или пользовательское значение шага)
— Ступеньки можно разместить внутри ползунка.
- **Режим только для чтения** – отображает значение без возможности взаимодействия.
- Поддержка градиентных цветов для Rails и активного Rails (любая строка цвета CSS, включая `linear-gradient(...)`)
- Индивидуальный стиль для трека, активного трека и ползунка, включая эффекты теней.

---

## Виджет - Радиальный слайдер
Ползунок в виде круговой дуги — элегантная альтернатива классическому линейному ползунку.

![Предварительный просмотр радиального ползунка](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-radial-slider.png)

**Основные характеристики:**

- Свободно настраиваемые начальный и конечный углы
- Настраиваемая ширина полосы, цвет полосы и цвет активной полосы
- Дополнительное отображение значения в центре с указанием размера и цвета шрифта.
— Дополнительная подпись под значением
- Размер и цвет большого пальца
- Эффекты теней для трека и ползунка

---

## Виджет - Переключатель
Переключатель для логических или двухсостоятельных значений данных.

![Предварительный просмотр переключателей](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_switches.png)

**Основные характеристики:**

- Настраиваемые значения true/false (не ограничиваясь логическими значениями)
- Отдельные текстовые метки для каждого штата
- Положение метки: верх, низ, начало или конец
- Полностью настраиваемые цвета дорожек и ползунка (включая градиенты)
- Стиль "Из виджета" – наследовать стиль от другого виджета-переключателя.

---

## Виджет - Флажок
Флажок для логических значений или данных с двумя состояниями.

![Флажок предварительного просмотра](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_checkbox.png)

**Основные характеристики:**

- Пользовательские значения true/false
- Отдельные текстовые метки для каждого штата
- Положение метки: верх, низ, начало или конец
- Настраиваемые цвета и размеры блоков и активных блоков.

---

## Виджет - Таблица
Динамическая таблица данных, которая отображает JSON-объекты на основе данных из ioBroker.

![Предварительный просмотр таблицы](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_table.png)

**Основные характеристики:**

- Настраиваемые столбцы: ключ, заголовок, префикс, суффикс, заполнитель.
- Форматы значений столбцов: Текст, Число (с десятичными знаками), Дата и время, Изображение
- Сортируемые столбцы с возможностью сортировки по одному или нескольким столбцам.
- **Фильтр по столбцам** – фильтрация строк по значению столбца
- **Фиксированный заголовок** – заголовок остается видимым при прокрутке.
- Конфигурация сортировки по умолчанию (столбец и направление).
- Максимальное количество строк
- **Условные цвета строк** – выделение строк на основе условий значений столбцов.
— Настраиваемый стиль заголовка и строк (фон, высота, граница)

---

## Виджет - Выпадающее меню
Выпадающий список, параметры которого автоматически заполняются из свойства `common.states` объекта ioBroker.

![Выпадающее меню предварительного просмотра](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-dropdown.png)

**Основные характеристики:**

— Параметры загружаются автоматически из состояний, определенных для точки данных.
— Параметры могут отображать значение, текстовую метку или и то, и другое.
- Дополнительный заголовок над выпадающим списком
- **Режим только для чтения**
- **Условный цвет фона** – изменяет фон выпадающего списка в зависимости от условий значения (с возможностью применения к заголовку).
— Настраиваемые шрифт, цвет текста, фон, цвет выделения, граница (ширина, цвет, радиус) и тень.
- Индивидуальное оформление заголовка (размер шрифта, цвет, отступы)

---

## Виджет - Бегущая строка
Бегущая строка с горизонтальной прокруткой — идеально подходит для отображения длинных текстовых значений или уведомлений.

**Основные характеристики:**

- В качестве источника используются данные в виде отдельных точек или статического текста.
- Направление прокрутки: влево или вправо
- Настраиваемая скорость прокрутки (пикселей/с)
- Настраиваемое количество копий текста (предотвращает пробелы в коротких текстах)
- Настраиваемый зазор между копиями
- **Пауза при наведении курсора**
- Поддержка цвета фона
- Наследует стиль шрифта от настроек виджета vis.

---

## Виджет - Список значений
Создает маркированный список на основе одного текстового значения — либо из точки данных, либо введенного вручную.

**Основные характеристики:**

- В качестве источника используются данные в виде отдельных точек или введенный вручную текст.
- Свободно настраиваемый разделитель — любой символ или строка:
- Запятая: `,`
- Точка с запятой: `;`
- Новая строка: `\n`
- Tab: `\t`
- Любая другая пользовательская строка
- Удаление пробелов в начале/конце каждого элемента
- Фильтрация пустых элементов
- Типы маркеров: `•` Диск, `○` Круг, `▪` Квадрат, `–` Тире, `›` Стрелка, `1. 2. 3.` Цифровые, Нет, Пользовательский символ
- Цвет маркера списка, независимый от цвета текста.
- Цвет текста, фон, размер шрифта, выравнивание текста
- Настраиваемое расстояние между маркером списка и текстом
- Настраиваемый межстрочный интервал между элементами
- Внутренняя подкладка

---

## Более старые изменения
Можно найти в [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.7.0 (2026-06-24)
- Dropdown Widget: Added support for manually defined value/label pairs as an alternative to OID-based state enumeration

### 1.6.0 (2026-06-19)
- Universal Widget: Fixed navigation active state not updating correctly when nav buttons are placed inside a "View in Widget"
- Table Widget: Empty JSON array now renders a "No data" row regardless of column configuration, instead of an empty or broken table structure
- Marquee Widget: Added vertical scroll directions "Up" and "Down" in addition to the existing "Left" and "Right"

### 1.5.0 (2026-06-13)
- Table Widget: Added "URL" column format for clickable links with configurable target
- Table Widget: Added "Sum row" option to visually separate the last row with a double border
- Universal Widget: Added "Corner style" – switch between rounded and chamfered (45 degree bevel) corners
- Table Widget: Added "Formula" field per column to compute values from row fields (e.g. price * qty)
- Slider Widget: Added "Title" and "Unit" fields
- Dropdown Widget: Fixed border radius; added "Widget shadow" for the entire widget container

### 1.4.0 (2026-06-04)
- Universal Widget: Added "RGB (Scaled)" color model for the color picker – supports configurable value ranges (e.g. 0–1023 for 10-bit RGB controllers)
- Universal Widget: Added optional password/PIN protection for navigation buttons
- Universal Widget: Added per-state content mirror option (inherit from content style / yes / no)
- Table Widget: Added configurable decimal and thousand separators for number format columns
- Table Widget: Added value color to row conditions (in addition to row background color)
- Table Widget: Added boolean column format displaying a readonly checkbox with optional configurable checked/unchecked colors
- Table Widget: Added comparison operator selection to row conditions (equal, not equal, greater, less, greater/less equal)
- Table Widget: Added value color per row condition – applicable to the whole row or to the condition column only

### 1.3.0 (2026-06-03)
- Slider: Added configurable value label display (always/on drag/never) and step marks position (above/below)
- Universal: Added "Disable click when active" option per state
- Universal: Fixed color picker components not updating when toggled in the editor
- Added links to widget documentation in widget settings

## License
The MIT License (MIT)

Copyright (c) 2025-2026 jkvarel <jk@inventwo.com>

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