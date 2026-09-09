---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md
title: Универсальный виджет
hash: 0F5AOPjyup2zTwyNk3SRgRxII4MKg92xPsKDQlrAhWU=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/universal-widget.md)

# Универсальный виджет

Универсальный виджет — самый многофункциональный виджет в наборе inventtwo. Он объединяет **интерактивное поведение** , **визуальный контент** и **стилизацию на основе состояния** в одном элементе. Используйте его, когда вам нужен единый, единообразный элемент, реагирующий на ваши данные — изменяя свой значок, цвет, текст или форму в зависимости от значения.

![Универсальный виджет](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-universal.png)

**Типичные области применения:**

- Плитка выключателя света, которая меняет значок и цвет при включении.
- Кнопки навигации по комнате, которые выделяют текущий активный вид.
- Кнопка, открывающая подробное представление в диалоговом окне.
- Плитка состояния (только для чтения), отображающая состояние устройства с пользовательскими значками.
- Встроенная в плитку палитра цветов RGB
- Плитка аналоговых часов на приборной панели
- Кнопки увеличения/уменьшения

---

## Быстрый старт

1. Перетащите **универсальные элементы (переключатель, кнопка, навигация, изображение и другие)** из списка виджетов **inventtwo design** на ваше представление.
2. Выберите **тип** — это наиболее важная настройка, определяющая, что происходит при нажатии на плитку. См. [Типы взаимодействий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md) .
3. Щелкните **«Идентификатор объекта»** и выберите точку данных (если ваш тип данных предназначен для чтения или записи значений).
4. Выберите **тип контента** , чтобы определить, что будет отображаться внутри плитки (значок, изображение, текст, встроенное представление и т. д.). См. [Типы контента](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md) .
5. Настройте состояние по умолчанию в группе **«Состояние по умолчанию»** — фон, цвета, текст, значок.
6. Добавьте больше штатов в группы **«Штаты»** , чтобы изменить внешний вид плитки в зависимости от значения точки данных.
7. Настройте внешний вид плитки (форму, рамку, тень и т. д.) в группах стилей inventtwo. См. [раздел «Стиль и формы»](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md) .

---

## Ключевые понятия

### Тип (поведение при взаимодействии)

Что происходит при нажатии на плитку. Варианты: Переключатель, Кнопка, Навигация, Только для чтения, Отображение в диалоговом окне, Увеличение/уменьшение значения, Отправка HTTP-запроса. → [Подробное объяснение](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md)

### Режим

- **Одна кнопка** : один блок, отображающий только одно состояние за раз.
- **Раздельные кнопки** : каждое состояние представляет собой отдельную кликабельную кнопку, расположенную рядом друг с другом. Удобно для селекторов с несколькими вариантами (как старый виджет «список радиокнопок»).

### Штаты

Универсальный виджет поддерживает несколько визуальных состояний. Каждое состояние активируется, когда значение точки данных соответствует заданному вами условию. Например: Состояние 1 = значок горящей лампочки, когда значение равно`true` Состояние 2 = значок темной лампочки, когда значение равно`false` .

**Состояние по умолчанию** (Состояние 1) всегда отображается, когда никакое другое условие состояния не выполняется или когда не привязан OID.

### Тип контента

Что отображается внутри плитки. Варианты: Значок, Изображение, Текст/HTML, Отображение в виджете, Палитра цветов, Аналоговые часы. → [Подробное объяснение](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md)

### Из виджета (повторное использование стиля)

В большинстве групп стилей есть поле « **Из виджета»** . Выберите другой универсальный виджет, и все настройки из этой группы будут скопированы из него. Таким образом, вы можете обеспечить визуальную согласованность множества плиток, не настраивая каждую из них по отдельности.

---

## Подробные страницы

- [Типы взаимодействия](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md) — переключатель, кнопка, навигация, диалоговое окно, HTTP и другие.
- [Типы контента](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md) — Иконка, Изображение, HTML, Отображение в виджете, Палитра цветов, Аналоговые часы
- [Стилизация и формы](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md) — Все группы стилей, формы, обратная связь при нажатии

---

## См. также

- [Виджет «Переключатель»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) — более простой переключатель включения/выключения.
- [Виджет «Флажок»](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) — упрощенное управление с помощью флажков.
- [Выпадающий виджет](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md) — для выбора из списка штатов.