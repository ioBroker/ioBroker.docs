---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md
title: Виджет флажка
hash: OWZVwhhZMj/R43bDEBjQSS3yaZoqWlsV8UqoM7shErU=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/checkbox-widget.md)

# Виджет флажка

Виджет Checkbox отображает стандартный флажок, который переключает значение параметра между двумя значениями. Как и в виджете Switch, вы определяете, что означает «отмечено» и «не отмечено» — поэтому он работает с логическими значениями, числами или любыми другими парами значений.

![Виджет флажка](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-checkbox.png)

---

## Как добавить виджет

1. Перетащите **флажок** из списка виджетов **inventwo design** на свой экран.
2. В боковой панели щелкните **«Идентификатор объекта»** и выберите нужную точку данных.
3. Установите **значение true** (состояние "отмечено") и **значение false** (состояние "не отмечено").
4. При желании введите текст в поле **«Текст false** / **Текст true»** и выберите его положение.

---

## Настройки

### Общий

| Параметр                  | Что это делает                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта** | Точка данных, из которой считывается и в которую записывается этот флажок.                            |
| **Истинная ценность**     | Записывается в точку данных, когда установлен флажок. Оставьте поле пустым для использования.`true` . |
| **Значение ложное**       | Записывается в точку данных, когда флажок снят. Оставьте пустым для использования.`false` .           |
| **Текст ложный**          | Метка отображается, если флажок снят. Оставьте поле пустым, если метка не отображается.               |
| **Текст true**            | Метка отображается, когда установлен флажок. Оставьте поле пустым, если метка не отображается.        |
| **Позиция текста**        | Где отображается метка: **Конец** (справа, по умолчанию), **Начало** (слева), **Верх** или **Низ** .  |

---

### inventwo — Стиль

| Параметр                  | Что это делает                                              |
| ------------------------- | ----------------------------------------------------------- |
| **Из виджета**            | Скопируйте все настройки стиля из другого виджета "Флажок". |
| **Цвет коробки**          | Цвет границы и значка флажка, когда он не отмечен.          |
| **Активный цвет коробки** | Цвет флажка при установке флажка (цвет заливки и значок).   |
| **Размер коробки**        | Размер флажка в пикселях (0–50). По умолчанию — 24 пикселя. |

---

## Советы

- **Единый стиль:** используйте **виджет «Из»** , чтобы скопировать настройки цвета и размера из основного виджета флажков, чтобы все флажки на вашей панели управления выглядели одинаково.
- **Шрифт и цвет текста:** шрифт, размер и цвет метки задаются стандартными настройками CSS виджета VIS, а не настройками inventww.

---

## См. также

- [Виджет Switch](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) — аналогичное поведение с внешним видом переключателя.
- [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — полностью настраиваемая плитка с тем же поведением переключателя, но с иконками и фигурами.