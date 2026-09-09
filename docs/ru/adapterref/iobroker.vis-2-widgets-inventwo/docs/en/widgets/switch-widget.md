---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md
title: Виджет переключения
hash: t6H41ltUIKj4xB/N8xtIdb0PS74sr2ismG0y9cE3dlg=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/switch-widget.md)

# Виджет переключения

Виджет Switch отображает классический тумблер, который включает или выключает точку данных. Вы определяете, какое значение считается «включено», а какое — «выключено», поэтому он работает с логическими значениями данных.`true` /`false` а также числовые (`0` /`1` ) или любой другой парой значений.

![Виджет переключения](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-switch.png)

---

## Как добавить виджет

1. Откройте редактор VIS 2 и переключитесь на нужный вам вид.
2. В списке виджетов слева найдите **inventwo design** и перетащите **Switch** на холст.
3. В боковой панели справа щелкните **«Идентификатор объекта»** и выберите точку данных, которой хотите управлять.
4. Установите **значения Value равными true** и **Value равными false,** чтобы они соответствовали значениям, используемым в вашей точке данных.
5. Переключитесь в режим выполнения, чтобы протестировать виджет.

---

## Настройки

### Общий

| Параметр                  | Что это делает                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Идентификатор объекта** | Точка данных, из которой этот коммутатор считывает и в которую записывает данные.                                                                       |
| **Истинная ценность**     | Значение, которое записывается при включении переключателя. Оставьте пустым для использования.`true` .                                                  |
| **Значение ложное**       | Значение, которое записывается при выключении выключателя. Оставьте пустым для использования.`false` .                                                  |
| **Текст ложный**          | Надпись отображается рядом с выключателем, когда он выключен. Оставьте поле пустым, если надпись не отображается.                                       |
| **Текст true**            | Надпись отображается рядом с выключателем, когда он включен. Оставьте поле пустым, если надпись отсутствует.                                            |
| **Позиция текста**        | Расположение метки относительно переключателя: **End** (справа), **Start** (слева), **Top (сверху** ) или **Bottom (снизу)** . По умолчанию — **End** . |

---

### inventwo — Трек

Рельсы представляют собой вытянутый фон стрелки.

| Параметр                 | Что это делает                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Из виджета**           | Скопировать все настройки трека из другого виджета переключения. Полезно для обеспечения визуальной согласованности нескольких переключателей.                                             |
| **Цвет трека**           | Отслеживайте цвет, когда выключатель выключен.                                                                                                                                             |
| **Цвет трека настоящий** | Отслеживайте цвет, когда переключатель включен.                                                                                                                                            |
| **Ширина колеи**         | Высота дорожки в пикселях (1–50).                                                                                                                                                          |
| **Радиус границы трека** | Насколько закруглены концы дорожки (1–100 %). При 100 % дорожка полностью закруглена (имеет форму таблетки).                                                                               |
| **Тень следа**           | Добавьте тень под рельсы. Задайте смещение по осям X и Y, размытие, размер и цвет. **Значение параметра Shadow color true** означает цвет тени, используемый при включенном переключателе. |

---

### inventwo — Thumb

Большой палец — это круглая рукоятка, которая скользит вперед и назад.

| Параметр                           | Что это делает                                                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Из виджета**                     | Скопировать все настройки ползунка из другого виджета переключения.                                   |
| **Цвет большого пальца**           | Цвет большого пальца при выключенном переключателе.                                                   |
| **Цвет большого пальца настоящий** | Цвет большого пальца при включении выключателя.                                                       |
| **Размер большого пальца**         | Диаметр ползунка в пикселях. Должен быть немного больше ширины дорожки.                               |
| **Радиус границы большого пальца** | Насколько круглый большой палец (1–100 %). При 100 % большой палец представляет собой идеальный круг. |
| **Тень от большого пальца**        | Тень от ползунка. Те же настройки, что и для тени трека.                                              |

---

## Советы

- **Пользовательские значения:** Если ваше устройство использует`"on"` /`"off"` строки вместо`true` /`false` Просто введите эти значения в **поля "Значение true"** и **"Значение false"** .
- **Повторное использование стилей:** создайте один «шаблон» виджета «Переключатель», оформите его так, как вам нужно, а затем используйте **виджет «От»** во всех остальных виджетах переключателей, чтобы скопировать эти настройки — это значительно экономит время.
- **Оформление шрифта:** цвет, размер и семейство шрифтов метки управляются стандартными настройками стиля виджета VIS (вкладка CSS на боковой панели), а не настройками inventwo.

---

## См. также

- [Виджет «Флажок»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) — аналогичное поведение, отображается в виде флажка вместо переключателя.
- [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — полностью настраиваемая плитка с тем же поведением переключателя, но с иконками и фигурами.