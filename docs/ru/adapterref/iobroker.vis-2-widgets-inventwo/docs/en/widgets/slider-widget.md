---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md
title: Виджет слайдера
hash: IiVIZZ0AljbDnU08K1d9cZN7wP/dEzDj02Lv61m8oCo=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/slider-widget.md)

# Виджет слайдера

Виджет «Слайдер» позволяет пользователям задавать числовое значение, перетаскивая ползунок вдоль направляющей. Он работает как по горизонтали, так и по вертикали и идеально подходит для управления диммерами, термостатами, жалюзи, громкостью или любыми другими числовыми параметрами.

![Виджет слайдера](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-slider.png)

---

## Как добавить виджет

1. Перетащите **ползунок** из списка виджетов **inventwo design** на свой экран.
2. Щелкните **«Идентификатор объекта»** и выберите числовую точку данных, которой хотите управлять.
3. Минимальное, максимальное значения и шаг автоматически заполняются из определения объекта — при необходимости их следует скорректировать.
4. Выберите **ориентацию** (горизонтальная или вертикальная).
5. Настройте стиль направляющей и ползунка в группах **inventwo - Slider track** и **inventwo - Slider thumb** .

---

## Настройки

### Общий

| Параметр                  | Что это делает                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Заголовок**             | Над ползунком отображается необязательный заголовок. Используйте его для обозначения того, что контролирует ползунок, например:`Charging current` или`Charge limit` .                     |
| **Единица**               | К каждому отображаемому значению — меткам минимума/максимума, шагам изменения и всплывающей подсказке — добавляется необязательная единица измерения. Например:`A` или`%` .               |
| **Идентификатор объекта** | Точка данных для чтения и записи. При выборе значения поля **«Минимальное значение»** , **«Максимальное значение** » и **«Шаг»** автоматически заполняются на основе определения объекта. |
| **Минимальное значение**  | Минимальное значение, которое может установить ползунок. По умолчанию: 0.                                                                                                                 |
| **Максимальное значение** | Максимальное значение, которое может установить ползунок. По умолчанию: 100.                                                                                                              |
| **Шаг**                   | Насколько изменяется значение за каждый шаг приращения. По умолчанию: 1.                                                                                                                  |
| **Ориентация**            | **Горизонтальное** (влево/вправо, по умолчанию) или **вертикальное** (вверх/вниз).                                                                                                        |
| **Показать мин макс**     | Отображает минимальное и максимальное значения в виде меток на обоих концах ползунка.                                                                                                     |
| **Только для чтения**     | При включении ползунок отображает текущее значение, но его нельзя перемещать. Полезно для индикаторов, доступных только для чтения.                                                       |

#### Маркировка значения

| Параметр                             | Что это делает                                                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Отображение значения на этикетке** | Когда текущее значение отображается над ползуном: **При перетаскивании (по умолчанию)** — только во время перетаскивания; **Всегда** — постоянно видно; **Никогда** — никогда не отображается. |

#### Отметки шагов

| Параметр                                   | Что это делает                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Показать шаги**                          | Отображает деления вдоль направляющей ползунка.                                                                                                                    |
| **Шаги внутри слайдера**                   | Размещает деления внутри рельса, а не под/рядом с ним.                                                                                                             |
| **Показать отметки ступеней сверху/слева** | _(Только если ступеньки находятся вне помещения)_ Размещайте деления шкалы над направляющей (горизонтально) или слева (вертикально), а не под/справа.              |
| **Пошаговый режим**                        | **Авто** : метки размещаются через заданные вами регулярные интервалы. **Пользовательский** : вы вручную вводите точные позиции.                                   |
| **Пошаговое отображение**                  | _(Только в автоматическом режиме)_ Интервал между отметками. Например, при Min=0, Max=100 и Step display=25 отметки отображаются на значениях 0, 25, 50, 75 и 100. |
| **Пользовательские шаги**                  | _(Только в пользовательском режиме)_ Значения позиций меток, разделенные запятыми, например:`0,20,50,80,100` .                                                     |

---

### inventwo — Ползунок

Эта группа управляет внешним видом направляющей (дорожки, по которой скользит большой палец).

| Параметр                                | Что это делает                                                                                                                                                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Из виджета**                          | Скопировать все настройки трека из другого виджета слайдера.                                                                                                                                                      |
| **цвет направляющей слайдера**          | Цвет неактивной части рельса (части за большим пальцем).                                                                                                                                                          |
| **активный цвет направляющей ползунка** | Цвет активной части направляющей (часть между кнопкой Min и кнопкой "большой палец").                                                                                                                             |
| **Тип рулевой тяги**                    | **Обычный** : активное заполнение имеет низкую яркость (стандартный). **Инвертированный** : активное заполнение имеет высокую яркость (полезно для жалюзи). **Нет** : активное заполнение вообще не отображается. |
| **Ширина колеи**                        | Толщина направляющей в пикселях (1–50). По умолчанию: 10.                                                                                                                                                         |
| **Радиус границы трека**                | Закругляет концы направляющей (1–100). По умолчанию: 100 (полностью закруглено).                                                                                                                                  |
| **Тень следа**                          | Тень для перил. Задайте смещение по осям X и Y, размытие, размер и цвет.                                                                                                                                          |

---

### inventwo — Ползунок большого пальца

Эта группа управляет маркером, который пользователь перетаскивает.

| Параметр                           | Что это делает                                                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Из виджета**                     | Скопировать все настройки ползунка из другого виджета слайдера.                                                                      |
| **цвет ползунка**                  | Цвет заливки большого пальца.                                                                                                        |
| **Размер большого пальца**         | Диаметр ползунка в пикселях (0–50). Установите значение 0, чтобы полностью скрыть ползунок (например, для панели только для чтения). |
| **Радиус границы большого пальца** | Насколько круглый большой палец (1–100 %). При 100 % он представляет собой идеальный круг.                                           |
| **Тень от большого пальца**        | Тень для большого пальца. Те же настройки, что и для тени трека.                                                                     |

---

## Советы

- **Ползунок для вертикальных жалюзи:** **Ориентация: Вертикальная.** **Тип направляющей: Инвертированная,** поэтому закрашенная часть показывает, насколько закрыты жалюзи (верх = закрыто, низ = открыто).
- **Индикатор только для чтения:** включите режим **только для чтения** и установите **ThumbSize** равным 0, чтобы отображать аккуратную полосу прогресса без перетаскиваемого маркера.
- **Повторное использование стилей:** настройте один слайдер именно так, как вам нужно, а затем используйте **виджет «Из»** во всех остальных, чтобы скопировать эти настройки.

---

## См. также

- [Виджет «Радиальный ползунок»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md) — тот же элемент управления, что и в виде циферблата в виде дуги окружности.