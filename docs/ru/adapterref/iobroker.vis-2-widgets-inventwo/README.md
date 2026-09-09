---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: Виджеты inventwo для ioBroker vis 2.0
hash: 2uO69EzDkz0ajQeFPY3V+v3KC3svYOc2z5zbCfQD7Qo=
---
![Логотип](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Виджеты inventwo для ioBroker vis 2.0

---

## О

Набор настраиваемых виджетов для **ioBroker vis 2.0** — создан для пользователей, которые хотят полностью контролировать внешний вид своих панелей управления. Каждый виджет имеет обширные возможности стилизации и легко интегрируется с данными ioBroker.

📖 **[Пользовательская документация](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md)** — подробные руководства по всем виджетам, настройкам и примерам.

---

## Виджеты

| Виджет                                         | Описание                                                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Универсальный](#widget---universal)           | Универсальный виджет: переключатель, кнопка, навигация, дисплей только для чтения, палитра цветов, аналоговые часы и многое другое.             |
| [Ползунок](#widget---slider)                   | Горизонтальный или вертикальный слайдер с пошаговым отображением и градиентными цветами.                                                        |
| [Радиальный ползунок](#widget---radial-slider) | Круговой слайдер с настраиваемыми углами, направляющими и ползунковым дизайном.                                                                 |
| [Выключатель](#widget---switch)                | Переключатель с настраиваемыми метками и цветами дорожек/ползунков                                                                              |
| [Флажок](#widget---checkbox)                   | Флажок с настраиваемыми значениями true/false и расположением метки.                                                                            |
| [Стол](#widget---table)                        | Динамическая таблица данных JSON с возможностью сортировки, фильтрации и условной раскраски строк.                                              |
| [Падать](#widget---dropdown)                   | Выпадающий список автоматически заполняется из состояний объекта ioBroker.                                                                      |
| [Шатер](#widget---marquee)                     | Бегущая строка с настраиваемой скоростью, направлением и интервалом между сообщениями.                                                          |
| [Список ценностей](#widget---value-list)       | Маркированный список, сгенерированный на основе текстового значения или точки данных.                                                           |
| [Календарь](#widget---calendar)                | Календарный вид на месяц, который можно использовать как средство выбора даты, в режиме только для чтения и/или для выделения сегодняшнего дня. |

---

## Виджет - Универсальный

Главный виджет этого адаптера — это единственный виджет, который может выступать в качестве переключателя, кнопки, элемента навигации, дисплея только для чтения и многого другого.

![Предварительный просмотр универсального виджета](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_universal_widget.png)

### Типы взаимодействия

- **Переключатель** — переключает значение точки данных между двумя значениями.
- **Кнопка** – устанавливает значение при нажатии; при желании удерживает значение в течение всего времени нажатия и сбрасывается при отпускании.
- **Навигация** – при щелчке мыши переходит к визуальному представлению.
- **Только для чтения** – отображает значение без какого-либо взаимодействия.
- **«Просмотр в диалоговом окне»** — открывает представление визуализации в модальном диалоговом окне.
- **Увеличение/уменьшение значения** — увеличение или уменьшение числового значения.
- **HTTP-запрос / Открытие URL** — отправляет HTTP-запрос или открывает URL (в той же вкладке или в новой).

### Режимы отображения

- **Одна кнопка** – один виджет с одним или несколькими состояниями
- **Раздельные кнопки** – каждое состояние отображается как отдельная кнопка (заменяет классический список переключателей).

### Типы контента

Свободно комбинируйте несколько элементов контента в одном состоянии:

![Предварительный просмотр типов контента](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_types.png)

- **Текст / HTML** – статическая или динамическая метка
- **Icon** – библиотека иконок ioBroker
- **Изображение** – локальное или удаленное изображение с настраиваемыми масштабом, положением и режимом заливки.
- **Встраивание элемента в виджет** — встраивание другого элемента vis view непосредственно в виджет.
- **Палитра цветов** – полнофункциональная палитра цветов (HEX, HEX8, RGB, HSL, HSV, CIE) с настраиваемой видимостью компонентов.

![Предварительный просмотр палитры цветов](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_colorpicker.png)

- **Аналоговые часы** – SVG-изображение аналоговых часов с настраиваемым дизайном циферблата, делениями, цифрами и стрелками.

![Предварительный просмотр аналоговых часов](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_type_clock_analog.png)

### Другие функции

- Несколько штатов с индивидуальным оформлением для каждого штата.
- Анимация обратной связи при клике
- Условное сравнение состояний (по значению или другим критериям)
- Настраиваемые параметры диалогового окна (полноэкранный режим, закрытие по щелчку вне окна, таймер автоматического закрытия).

### Дизайн

Все аспекты виджета можно настроить:

![Предварительный просмотр настройки CSS](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_css_customization.png)![Предварительный просмотр примеров дизайна](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

Подробные примеры дизайна можно посмотреть [здесь](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md) .

### Многоугольные фигуры

Виджеты не ограничиваются прямоугольниками. Параметр **«Форма»** позволяет выбирать из встроенных многоугольных форм или определять полностью настраиваемый контур:

| Форма         | Описание                                                      |
| ------------- | ------------------------------------------------------------- |
| Прямоугольник | По умолчанию — стандартная прямоугольная карта                |
| Треугольник   | Равносторонний треугольник                                    |
| Бриллиант     | 4-сторонний повернутый квадрат                                |
| Пентагон      | пятиугольник                                                  |
| Шестиугольник | Шестиугольник — идеально подходит для сотовой компоновки.     |
| Семиугольник  | 7-сторонний многоугольник                                     |
| Октагон       | 8-угольник                                                    |
| Звезда        | пятиконечная звезда                                           |
| **Обычай**    | Любой многоугольник — точки контура обрезки вводятся вручную. |

![Предварительный просмотр фигур](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_shapes.png)

**Дополнительные варианты формы:**

- **Вращение** (0–359°) — поверните любой встроенный многоугольник на любой угол.
- **Радиус скругления углов** (0–30) — равномерно скругляет все вершины с помощью кривых Безье; подходит для любых фигур, включая пользовательские.
- **Пользовательские точки полигона** — разделенные запятыми`X% Y%` пары по часовой стрелке, например`40% 0%, 100% 50%, 40% 100%, 0% 50%` • Создавайте пути визуально на [сайте https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)

Все существующие функции — внутренняя/внешняя тень, рамка, градиентный фон, обратная связь при клике — работают со всеми фигурами.

> **Пример:** Панель мониторинга в виде шестиугольных сот → [docs/example-views/hexagonal-view.md](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md)\
> &#x20;**Пример:** Прямоугольная панель управления → [docs/example-views/rectangle-view.md](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md)

---

## Виджет - Слайдер

Горизонтальный или вертикальный ползунок для управления числовыми данными.

![Предварительный просмотр слайдера](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_sliders.png)

**Основные характеристики:**

- Горизонтальная и вертикальная ориентация
- Настраиваемые минимальные, максимальные значения и шаг (автоматическое считывание из объекта точки данных).
- Дополнительные метки минимального/максимального значения
- Отображение шага (автоматическое или пользовательское значение шага)
- Ступеньки можно разместить внутри ползунка.
- **Режим только для чтения** — отображает значение без возможности взаимодействия.
- Поддержка градиентных цветов для боковой панели и активной боковой панели (любая строка цвета CSS, включая`linear-gradient(...)` )
- Индивидуальный стиль для бегущей строки, активной полосы и ползунка, включая эффекты теней.

---

## Виджет - Радиальный слайдер

Ползунок в виде круговой дуги — элегантная альтернатива классическому линейному ползунку.

![Предварительный просмотр радиального ползунка](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-radial-slider.png)

**Основные характеристики:**

- Свободно настраиваемые начальный и конечный углы
- Настраиваемая ширина полосы, цвет полосы и активный цвет полосы
- Дополнительное отображение значения в центре с указанием размера и цвета шрифта.
- Дополнительная метка под значением
- Размер и цвет большого пальца
- Эффекты теней для трека и большого пальца

---

## Виджет - Переключатель

Переключатель для логических или двухсостоятельных значений данных.

![Предварительный просмотр переключателей](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_switches.png)

**Основные характеристики:**

- Настраиваемые значения true/false (не ограничиваясь логическими значениями)
- Отдельные текстовые метки для каждого штата
- Положение метки: верх, низ, начало или конец
- Полностью настраиваемые цвета дорожек и ползунка (включая градиенты).
- Стилизация "из виджета" — наследование стилизации от другого виджета-переключателя.

---

## Виджет - Флажок

Флажок для логических значений или данных с двумя состояниями.

![Флажок предварительного просмотра](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_checkbox.png)

**Основные характеристики:**

- Настраиваемые значения true/false
- Отдельные текстовые метки для каждого штата
- Положение метки: верх, низ, начало или конец
- Настраиваемые цвета и размеры блоков и активных блоков.

---

## Виджет - Таблица

Динамическая таблица данных, которая отображает JSON-объекты на основе данных из ioBroker.

![Предварительный просмотр таблицы](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_table.png)

**Основные характеристики:**

- Настраиваемые столбцы: ключ, заголовок, префикс, суффикс, заполнитель.
- Форматы значений столбцов: Текст, Число (с десятичными знаками), Дата и время, Изображение.
- Сортируемые столбцы с одно- или **многоколоночной сортировкой**
- **Фильтр по столбцу** — фильтрация строк по значению столбца.
- **Фиксированный заголовок** — заголовок остается видимым при прокрутке.
- Настройки сортировки по умолчанию (столбец и направление).
- Максимальное количество строк
- **Условное выделение цветов строк** — подсветка строк в зависимости от значений столбцов.
- Настраиваемый стиль заголовка и строк (фон, высота, граница)

---

## Виджет - Выпадающее меню

Выпадающий список, который автоматически заполняет свои варианты из предложенных вариантов.`common.states` свойство объекта ioBroker.

![Выпадающее меню предварительного просмотра](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-dropdown.png)

**Основные характеристики:**

- Параметры загружаются автоматически из состояний, определенных для точки данных.
- Параметры могут отображать значение, текстовую метку или и то, и другое.
- Дополнительный заголовок над выпадающим списком.
- **Режим только для чтения**
- **Условное изменение цвета фона** — меняет фон выпадающего списка в зависимости от условий значения (с возможностью применения к заголовку).
- Настраиваемые шрифт, цвет текста, фон, цвет выделения, граница (ширина, цвет, радиус) и тень.
- Индивидуальное оформление заголовка (размер шрифта, цвет, отступы)

---

## Виджет - Бегущая строка

Бегущая строка с горизонтальной прокруткой — идеально подходит для отображения длинных текстовых значений или уведомлений.

**Основные характеристики:**

- В качестве источника используются данные в виде отдельных точек или статического текста.
- Направление прокрутки: влево или вправо
- Настраиваемая скорость прокрутки (пикселей/с)
- Настраиваемое количество копий текста (предотвращает пробелы в коротких текстах)
- Настраиваемый промежуток между копиями
- **Пауза при наведении курсора**
- Поддержка цвета фона
- Наследует стиль шрифта от настроек виджета vis.

---

## Виджет - Список значений

Создает маркированный список на основе одного текстового значения — либо из точки данных, либо введенного вручную.

**Основные характеристики:**

- В качестве источника используются данные в виде отдельных точек или введенный вручную текст.
- Свободно настраиваемый разделитель — любой символ или строка:
  - Запятая:`,`
  - Точка с запятой:`;`
  - Новая строка:`\n`
  - Вкладка:`\t`
  - Любая другая пользовательская строка
- Удаление пробелов в начале/конце каждого элемента
- Фильтрация пустых элементов
- Типы пуль:`•` Диск,`○` Круг,`▪` Квадрат,`–` Бросаться,`›` Стрелка,`1. 2. 3.` Пронумерованный, Нет, Пользовательский символ
- Цвет маркера выбирается отдельно, независимо от цвета текста.
- Цвет текста, фон, размер шрифта, выравнивание текста
- Настраиваемое расстояние между маркером списка и текстом.
- Настраиваемый межстрочный интервал между элементами
- Внутренняя подкладка

---

## Виджет - Календарь

Календарный вид по месяцам, простой выбор даты на основе календаря дат MUI (выбор даты, отображение даты только для чтения и/или выделение сегодняшнего дня — свободно комбинируются с помощью «Только для чтения» и «Выделить сегодня»).

**Основные характеристики:**

- Считывает/записывает дату из идентификатора объекта в виде метки времени (мс) или строки даты в формате ISO.`YYYY-MM-DD` )
- Режим «Только для чтения» позволяет отображать только дату, не допуская внесения изменений.
- «Выделить сегодняшний день» для того, чтобы четко обозначить текущий день.
- Отключить прошлые и/или будущие даты
- Дополнительная функция быстрой навигации по месяцам/годам через заголовок.
- Первый день недели: понедельник или воскресенье.
- Дополнительная нумерация календарных недель, в формате ISO-8601 или "простая" (неделя 1 включает 1 января).
- Настраиваемый размер ячейки в дневное время
- Независимая настройка цвета для заголовка, дней недели, обычных дней, выбранного дня (включая тень), маркера сегодняшнего дня и номеров недель.
- Применяет язык браузера для отображения названий месяцев и дней недели.
- Повторное использование стиля "Из виджета" в нескольких виджетах календаря.

---

## Виджет - Календарь событий

Отображение событий/встреч в стиле Google Calendar, основанное на FullCalendar. Можно настроить каждый цвет, размер шрифта и границы.

**Основные характеристики:**

- Укажите точку данных "События (точка данных)", содержащую список событий в формате JSON — либо простую пользовательскую структуру, либо собственный JSON, созданный адаптером ioBroker "ical".
- Все представления из бесплатного/MIT-пакета FullCalendar: Месяц, Неделя, День, Многомесячный (год) и Список (день/неделя/месяц/год)
- Дополнительные номера календарных недель (ISO-8601 или "простые"/зависящие от локали), в основном для отображения данных за месяц/несколько месяцев.
- Панель заголовка (заголовок + навигация "предыдущая/следующая/сегодня") может отображаться/скрываться, а навигацию можно отключать независимо, сохраняя при этом заголовок.
- Корректно обрабатывает многодневные/целодневные события (согласно протоколу iCal с эксклюзивным завершением).
- Требуется только точка данных событий — отдельный идентификатор объекта не нужен.
- Настраиваемые правила раскрашивания событий: раскрашивание событий по заголовку (совпадение подстроки без учета регистра), переопределяя исходный цвет — обходит ограничение адаптера ioBroker "ical", предоставляющего только один цвет для календаря, а не для события.
- Полностью настраиваемый заголовок (цвет/размер заголовка, текст кнопки/фон/граница/радиус, включая наведение курсора), дни недели (цвет/фон/размер), день недели (цвет/размер, цвет за пределами месяца, фон выходных), сегодняшний день (цвет фона/текста/границы + ширина, линия индикатора "Сейчас в режиме реального времени"), плитки событий (фон/текст/граница/радиус/размер, цвет ссылки "+N ещё") и границы сетки (показать/скрыть, ширина, цвет) — каждая цветовая группа с независимым повторным использованием стиля "Из виджета".
- Календарь автоматически изменяет размер при изменении размера виджета в редакторе визуализации (перезагрузка страницы не требуется).
- Применяет язык браузера для отображения названий месяцев и дней недели.

---

## Более ранние изменения

Можно найти в файле [CHANGELOG\_OLD.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/CHANGELOG_OLD.md)

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.10.0 (2026-09-01)
- Event Calendar Widget: Added support for showing multiple calendars at once via a new "Additional calendars" group (datapoint + color + label per calendar, e.g. one iCal calendar per family member), merged into a single view with an optional color/label legend below the calendar and a persistent per-event colored left border showing which calendar an event belongs to (kept even when an Event color rule overrides the tile's fill color). The original single "Events (datapoint)" field keeps working unchanged when no additional calendars are configured; once at least one is added, that field is ignored
- Event Calendar Widget: Added "Max. events per day" setting (Month/Multi-month views) to cap how many event tiles are shown per day cell before the rest collapse behind FullCalendar's "+N more" popover link, instead of day cells always growing with the number of events
- Universal Widget: Fixed the dialog title "Size" setting, which was configurable but had no effect on the rendered dialog title font size

### 1.9.0 (2026-07-29)
- Added new Event Calendar Widget: Google-Calendar-style view for events/appointments based on FullCalendar, fed from a datapoint holding a JSON list of events (either a simple custom shape or the native JSON produced by the ioBroker "ical" adapter). Supports all FullCalendar free/MIT views (Month, Week, Day, Multi-month, List day/week/month/year), optional calendar week numbers, optional header bar/navigation, live resizing in the vis editor, and fully configurable header/weekday/day/today/event-tile/border styling (colors, font sizes, border radius/width, hover states, now-indicator), each with independent "From widget" style reuse

### 1.8.1 (2026-07-23)
- Added preview image for calendar and value list widgets

### 1.8.0 (2026-07-16)
- Radial Slider Widget: Added "Read only" option to prevent value changes, matching the Slider widget's behavior
- Table Widget: Added pagination support ("Pagination" / "Rows per page") to split large tables across pages instead of showing all rows at once
- Table Widget: Added weekday (WD/WDL) and calendar week (KW/K) tokens
- Added new Calendar Widget: month calendar based on MUI's Date Calendar, usable as a datepicker (read/write a date), a read-only date display, and/or a today-highlighter, with configurable first day of week, ISO/simple calendar week numbers, and full color/size customization

### 1.7.0 (2026-06-24)
- Dropdown Widget: Added support for manually defined value/label pairs as an alternative to OID-based state enumeration

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