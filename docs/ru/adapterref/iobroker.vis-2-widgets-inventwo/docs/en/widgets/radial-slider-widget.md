---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md
title: Виджет радиального ползунка
hash: dIaWOql8Jl2wkycPmgfKXjmRuBh6rTMXelpw7/7jNbY=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/radial-slider-widget.md)

# Виджет радиального ползунка

Виджет «Радиальный ползунок» представляет собой циферблат в виде дуги для отображения числовых данных. Он работает аналогично обычному ползунку, но пользователь перемещает ползунок по круговой дорожке, а не по прямой линии. Он идеально подходит для термостатов, регуляторов громкости или любых элементов управления, где круглый циферблат уместен в дизайне.

![Виджет радиального ползунка](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-radial-slider.png)

---

## Как добавить виджет

1. Перетащите **элемент Radial Slider** из списка виджетов **inventwo design** на свой экран.
2. Измените размер виджета — он отображается как квадрат; размер виджета определяет размер циферблата.
3. Щелкните **«Идентификатор объекта»** и выберите числовую точку данных. Значения «Минимальное», «Максимальное» и «Шаг» заполняются автоматически на основе определения объекта.
4. Отрегулируйте **начальный** и **конечный углы** , чтобы определить форму дуги.
5. Настройте стиль направляющей и большого пальца в группах **inventwo - Radial track** и **inventwo - Radial thumb** .

---

## Настройки

### Общий

| Параметр                  | Что это делает                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта** | Точка данных для чтения и записи. Минимальное, максимальное и шаговое значения заполняются автоматически из определения объекта при выборе OID.                           |
| **Минимальное значение**  | Значение в начале дуги. По умолчанию: 0.                                                                                                                                  |
| **Максимальное значение** | Значение в конце дуги. По умолчанию: 100.                                                                                                                                 |
| **Шаг**                   | Насколько изменяется значение за каждый шаг приращения. По умолчанию: 1.                                                                                                  |
| **Начальный угол**        | Угол (0–360°), с которого начинается дуга. 0° — это верхняя точка, углы увеличиваются по часовой стрелке. По умолчанию: 225 (нижний левый угол).                          |
| **Конечный угол**         | Угол (0–360°), при котором заканчивается дуга. По умолчанию: 135° (внизу справа). Вместе с начальным углом по умолчанию это создает классическую форму циферблата "270°". |
| **Показать значение**     | Отображает текущее числовое значение в центре циферблата.                                                                                                                 |
| **Показать метку**        | Отображает текстовую метку под значением в центре. Видна только после ввода текста метки.                                                                                 |
| **Этикетка**              | Текст, который будет отображаться в качестве центральной метки, например:`°C` или`%` Отображается только при включенной **опции «Показать метку»** .                      |
| **Только для чтения**     | При включении циферблат отображает текущее значение, но его нельзя перемещать. Полезно для индикаторов только для чтения.                                                 |

---

### inventwo — Радиальная дорожка

| Параметр                         | Что это делает                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Из виджета**                   | Скопируйте все настройки трека из другого виджета Radial Slider.                                                                             |
| **Цвет трека**                   | Цвет фоновой дуги (полной дуги, которая еще не достигнута). Поддерживает градиентные строки, например.`linear-gradient(90deg, #aaa, #444)` . |
| **Отслеживание активного цвета** | Цвет закрашенной дуги (участок от начала до текущего значения). Также поддерживаются градиентные строки.                                     |
| **Ширина колеи**                 | Толщина дуги в пикселях. По умолчанию: 10.                                                                                                   |
| **Тень следа**                   | Добавьте тень к фоновой дуге. Задайте смещение по осям X и Y, размытие и цвет.                                                               |

---

### inventwo — Радиальный большой палец

| Параметр                    | Что это делает                                                       |
| --------------------------- | -------------------------------------------------------------------- |
| **Из виджета**              | Скопировать все настройки ползунка из другого виджета Radial Slider. |
| **Цвет большого пальца**    | Цвет круглой ручки.                                                  |
| **Размер большого пальца**  | Диаметр круга для большого пальца в пикселях. По умолчанию: 16.      |
| **Тень от большого пальца** | Тень от большого пальца.                                             |

---

### inventwo — Радиальное значение

| Параметр            | Что это делает                                                            |
| ------------------- | ------------------------------------------------------------------------- |
| **Размер значения** | Размер шрифта центрального значения в пикселях (8–100). По умолчанию: 32. |
| **Цвет значения**   | Цвет центрального значения текста.                                        |
| **Размер этикетки** | Размер шрифта центральной подписи в пикселях (8–50). По умолчанию: 14.    |
| **Цвет этикетки**   | Цвет текста центральной метки.                                            |

---

## Понимание углов

Углы измеряются по часовой стрелке от верхней точки (положение «12 часов» = 0°).

| Угол | Положение на циферблате  |
| ---- | ------------------------ |
| 0°   | Верхняя часть (12 часов) |
| 90°  | Справа (на 3 часа)       |
| 180° | Внизу (на 6 часов)       |
| 270° | Слева (на 9 часов)       |

**Пример — Классический регулятор термостата:**

- Начальный угол: 225° (внизу слева, примерно на 7 часов)
- Конечный угол: 135° (внизу справа, примерно на 5 часов)
- Это создает большую дугу, которая идет от нижнего левого угла, вверх и через верхнюю часть, к нижнему правому углу.

**Пример — Половина дуги с правой стороны:**

- Начальный угол: 270 (влево)
- Угол на конце: 90° (справа)
- Это образует полукруг с правой стороны.

---

## Советы

- **Плитка термостата:** установите начальный угол 225°, конечный угол 135°, метку на`°C` и подключитесь к точке подключения системы отопления. Дуга охватывает 270° — классический вид термостата.
- **Индикатор заряда батареи:** установите начальный угол 180°, конечный угол 0°, активный цвет — зеленый, а цвет дорожки — темно-серый. Дуга заполняется слева направо по мере зарядки батареи.
- **Повторное использование стиля:** используйте **виджет «Из»** , чтобы скопировать настройки трека и ползунка на несколько циферблатов.

---

## См. также

- [Виджет «Слайдер»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md) — тот же элемент управления, что и у прямого горизонтального или вертикального слайдера.