---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md
title: Виджет бегущей строки
hash: oPypNIgUiiOuIGOtE1VOwenpVbJWqfexrU7yVtgqbmM=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/marquee-widget.md)

# Виджет бегущей строки

Виджет Marquee отображает текст, который непрерывно прокручивается по области виджета — подобно классической бегущей строке или новостному баннеру. Текст может поступать из точки данных ioBroker (например, сообщение о состоянии, значение датчика или уведомление) или вы можете ввести его вручную.

---

## Как добавить виджет

1. Перетащите **элемент «Выделка»** из списка виджетов **inventwo design** на свой экран.
2. Измените размер виджета до желаемой ширины области прокрутки.
3. Выберите **идентификатор объекта** или введите текст непосредственно в поле **«Прокручиваемый текст (статический)»** .
4. Отрегулируйте скорость и направление по своему усмотрению.

---

## Настройки

### Общий

| Параметр                               | Что это делает                                                                                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Идентификатор объекта**              | Если этот параметр задан, прокручиваемый текст будет отображать текущее значение данной точки данных. Поле для ввода текста вручную скрывается при выборе OID.                                         |
| **Прокручиваемый текст (статический)** | Текст для прокрутки вручную. Виден только при отсутствии идентификатора объекта.                                                                                                                       |
| **Направление**                        | Направление прокрутки: **влево** (справа налево, по умолчанию) или **вправо** (слева направо).                                                                                                         |
| **Скорость (пикселей/с)**              | Скорость прокрутки текста в пикселях в секунду. Диапазон: 10–500. Значение по умолчанию: 80. Чем выше значение, тем быстрее. Скорость остается постоянной независимо от количества отображаемых копий. |
| **Текстовые копии**                    | Сколько раз текст повторяется рядом друг с другом в цикле анимации. По умолчанию: 3. Увеличьте это значение, если короткий текст оставляет видимые промежутки при прокрутке.                           |
| **Расстояние между копиями (пиксели)** | Расстояние между двумя копиями текста в пикселях. По умолчанию: 50.                                                                                                                                    |
| **Пауза при наведении курсора**        | При включении этой функции анимация прокрутки приостанавливается, когда курсор мыши находится над виджетом.                                                                                            |
| **Фон**                                | Необязательный цвет заливки фона для области виджета.                                                                                                                                                  |

---

## Внешний вид текста

Семейство шрифтов, размер шрифта, цвет текста, толщина шрифта и межбуквенный интервал задаются через стандартные настройки CSS виджета VIS (вкладка **CSS** или раздел **«Шрифт»** на боковой панели), а не через панель настроек inventww.

---

## Советы

- **Избегайте пробелов:** если ваш текст короткий и вы видите пробел между концом одного прохода и началом следующего, увеличивайте **количество копий текста** до тех пор, пока пробел не исчезнет.
- **Данные в реальном времени:** Подключите **идентификатор объекта** к строковой точке данных (например, адаптеру, который записывает заголовки новостей, котировки акций или сводки погоды) для получения полностью актуального тикера.
- **Скорость против читаемости:** для текста, который должен читаться комфортно, скорость не должна превышать 100 пикселей в секунду. Для чисто визуального эффекта лучше подходят более высокие скорости.

---

## См. также

- [Виджет «Список значений»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md) — отображает список вместо прокручиваемого текста.
- [Универсальный виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — для статического текста внутри стилизованного блока.