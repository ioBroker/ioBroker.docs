---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md
title: Универсальный виджет - примеры дизайна
hash: TScvgO41q4FVV0pcGV5nTd0VvQGfbS/QSC+Gx9ZDM38=
---
# Универсальный виджет – примеры дизайна

15 различных вариантов дизайна для **универсального виджета** (тип:`switch` , режим:`singleButton` ).\
&#x20;Фрагменты JSON можно импортировать непосредственно в ioBroker vis-2 через диалоговое окно импорта.

---

## Обзор

![Предварительный просмотр дизайнов](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

| #  | Дизайн                      | Фон                          | Граница                                 | Углы                    | Тень               | Стиль                     |
| -- | --------------------------- | ---------------------------- | --------------------------------------- | ----------------------- | ------------------ | ------------------------- |
| 1  | **Современный минимализм**  | Белый                        | Нижние 3 пикселя, Индиго                | 10 пикселей, однородный | Тонкий             | Плоский, чистый           |
| 2  | **Киберпанк Неон**          | Почти черный                 | 1 пиксель, голубой                      | Чёткий, 0 пикселей      | Неоновое свечение  | Футуристический           |
| 3  | **Ретро Классика**          | Бежевый/бежевый              | 3 пикселя, темно-коричневый             | 2 px                    | Жесткий вылет      | Ностальгия                |
| 4  | **Абстрактный градиент**    | Пурпурный→Фиолетовый→Голубой | Никто                                   | Диагональ               | Цветной мягкий     | Художественный            |
| 5  | **Нейморфизм**              | Светло-серый                 | Никто                                   | 16 пикселей, однородный | Тьма + Свет        | Мягкий, приятный на ощупь |
| 6  | **Тёмное вещество**         | Темно-сине-серый             | Левая сторона 3 пикселя, бирюзовый цвет | 8 пикселей, однородный  | Высота             | Стиль VS Code             |
| 7  | **Стекломорфизм**           | Белый, непрозрачность 15%.   | 1 пиксель, белый 30 %                   | 14 пикселей, однородный | Замороженный       | Прозрачный                |
| 8  | **Военно-тактический**      | Оливково-зеленый             | 2 px, Хаки                              | 0 пикселей, резкость    | Жесткий вылет      | Функциональный            |
| 9  | **Жвачка / Конфета**        | Ярко-розовый                 | Никто                                   | 55 пикселей, таблетка   | Розовое свечение   | Игривый                   |
| 10 | **Терминал / Матрица**      | Черный                       | 1 пиксель, зеленая пунктирная линия     | 0 пикселей              | Зеленое свечение   | Хакер                     |
| 11 | **Корпоративный синий**     | Военно-морской               | Никто                                   | 6 пикселей              | Тонкий             | Профессиональный          |
| 12 | **Закат Тепло**             | Оранжевый→Розовый→Желтый     | Никто                                   | 18 пикселей             | Теплое свечение    | Теплый, яркий             |
| 13 | **Темное роскошное золото** | Почти черный (теплый)        | 1 пиксель, Золотой                      | 4 px                    | Золотистый блеск   | Элегантный, роскошный     |
| 14 | **Лед / Арктика**           | Ледяной синий                | 1 пиксель, светло-голубой               | 12 пикселей             | прохладный, нежный | Свежий, чистый            |
| 15 | **Бруталист**               | Сигнальный жёлтый            | 4 пикселя, черный                       | 0 пикселей              | Твердый, Черный    | Смелый, дерзкий           |

---

## Дизайн 1 – Современный минимализм

**Концепция:** Чистый, лаконичный дизайн с белым фоном и акцентом цвета индиго в нижней границе. Закругленные углы, без лишних деталей.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(238, 242, 255, 1)",
      "outerShadowColorFeedback": "rgba(79, 70, 229, 0.3)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "colorPickerColorModel": "hex",
      "g_attr_content_color_picker": true,
      "colorPickerWidth": 200,
      "colorPickerHandleSize": 8,
      "colorPickerHandleMargin": 6,
      "colorPickerComponentsSpace": 12,
      "colorPickerDirection": "vertical",
      "colorPickerBorderWidth": 0,
      "colorPickerShowWheel": true,
      "colorPickerShowSaturation": true,
      "colorPickerShowValue": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 10,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 10,
      "borderRadiusBottomRight": 10,
      "borderRadiusBottomLeft": 10,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 3,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 2,
      "outerShadowBlur": 8,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(79, 70, 229, 0.15)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "rgba(255, 255, 255, 1)",
      "text": "Hello",
      "textColor": "rgba(30, 30, 30, 1)",
      "contentColor": "rgba(79, 70, 229, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(238, 242, 255, 1)",
      "backgroundTrue1": "rgba(238, 242, 255, 1)",
      "outerShadowColor1": "rgba(79, 70, 229, 0.3)",
      "outerShadowColorTrue1": "rgba(79, 70, 229, 0.3)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 614,
      "top": 184,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 2 – Киберпанк Неон

**Концепция:** Тёмный, почти чёрный фон с сияющим голубым неоном. Острые, угловатые края (без радиуса скругления). Светящаяся внешняя тень имитирует неоновый эффект. Атмосфера: футуристическая, цифровая, антиутопическая.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(0, 40, 30, 1)",
      "outerShadowColorFeedback": "rgba(0, 255, 200, 1)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "colorPickerColorModel": "hex",
      "g_attr_content_color_picker": true,
      "colorPickerWidth": 200,
      "colorPickerHandleSize": 8,
      "colorPickerHandleMargin": 6,
      "colorPickerComponentsSpace": 12,
      "colorPickerDirection": "vertical",
      "colorPickerBorderWidth": 0,
      "colorPickerShowWheel": true,
      "colorPickerShowSaturation": true,
      "colorPickerShowValue": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 0,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 0,
      "borderRadiusBottomRight": 0,
      "borderRadiusBottomLeft": 0,
      "borderSizeTop": 1,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 0,
      "outerShadowBlur": 20,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(0, 255, 200, 0.7)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 15,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0, 255, 200, 0.12)",
      "background": "rgba(8, 8, 20, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0, 255, 200, 1)",
      "textColor": "rgba(0, 255, 200, 1)",
      "contentColor": "rgba(0, 255, 200, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(0, 40, 30, 1)",
      "backgroundTrue1": "rgba(0, 40, 30, 1)",
      "outerShadowColor1": "rgba(0, 255, 200, 1)",
      "outerShadowColorTrue1": "rgba(0, 255, 200, 1)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 614,
      "top": 184,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 3 – Ретро-классика

**Концепция:** Теплые земляные тона, толстая рамка, едва закругленные углы. Резкая тень без размытия (смещение, без размытия) напоминает печатные пуговицы из 80-х. Атмосфера: олдскульная, прочная, ностальгическая.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(160, 120, 60, 1)",
      "outerShadowColorFeedback": "rgba(60, 30, 0, 0.9)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "colorPickerColorModel": "hex",
      "g_attr_content_color_picker": true,
      "colorPickerWidth": 200,
      "colorPickerHandleSize": 8,
      "colorPickerHandleMargin": 6,
      "colorPickerComponentsSpace": 12,
      "colorPickerDirection": "vertical",
      "colorPickerBorderWidth": 0,
      "colorPickerShowWheel": true,
      "colorPickerShowSaturation": true,
      "colorPickerShowValue": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 2,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 2,
      "borderRadiusBottomRight": 2,
      "borderRadiusBottomLeft": 2,
      "borderSizeTop": 3,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 3,
      "borderSizeLeft": 3,
      "borderSizeRight": 3,
      "borderStyle": "solid",
      "outerShadowX": 5,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 5,
      "outerShadowBlur": 0,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(60, 30, 0, 0.85)",
      "innerShadowX": 2,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 2,
      "innerShadowBlur": 4,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(255, 220, 160, 0.4)",
      "background": "rgba(200, 170, 120, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(100, 55, 10, 1)",
      "textColor": "rgba(55, 25, 5, 1)",
      "contentColor": "rgba(100, 55, 10, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(160, 120, 60, 1)",
      "backgroundTrue1": "rgba(160, 120, 60, 1)",
      "outerShadowColor1": "rgba(60, 30, 0, 0.9)",
      "outerShadowColorTrue1": "rgba(60, 30, 0, 0.9)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 614,
      "top": 184,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 4 – Абстрактный градиент

**Концепция:** Смелый градиент от пурпурного через фиолетовый к бирюзовому — по диагонали. Органичные, асимметричные углы (диагонально противоположные стороны большие/маленькие). Без рамки, только сам градиент. Атмосфера: художественная, яркая, современная абстракция.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "linear-gradient(135deg, rgba(200,0,100,1) 0%, rgba(80,0,200,1) 50%, rgba(0,160,200,1) 100%)",
      "outerShadowColorFeedback": "rgba(100, 0, 255, 0.7)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "colorPickerColorModel": "hex",
      "g_attr_content_color_picker": true,
      "colorPickerWidth": 200,
      "colorPickerHandleSize": 8,
      "colorPickerHandleMargin": 6,
      "colorPickerComponentsSpace": 12,
      "colorPickerDirection": "vertical",
      "colorPickerBorderWidth": 0,
      "colorPickerShowWheel": true,
      "colorPickerShowSaturation": true,
      "colorPickerShowValue": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 50,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 8,
      "borderRadiusBottomRight": 50,
      "borderRadiusBottomLeft": 8,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 4,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 10,
      "outerShadowBlur": 20,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(100, 0, 255, 0.45)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "linear-gradient(135deg, rgba(255,0,128,1) 0%, rgba(100,0,255,1) 50%, rgba(0,200,255,1) 100%)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0,0,0,0)",
      "textColor": "rgba(255, 255, 255, 1)",
      "contentColor": "rgba(255, 255, 255, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "linear-gradient(135deg, rgba(200,0,100,1) 0%, rgba(80,0,200,1) 50%, rgba(0,160,200,1) 100%)",
      "backgroundTrue1": "linear-gradient(135deg, rgba(200,0,100,1) 0%, rgba(80,0,200,1) 50%, rgba(0,160,200,1) 100%)",
      "outerShadowColor1": "rgba(100, 0, 255, 0.7)",
      "outerShadowColorTrue1": "rgba(100, 0, 255, 0.7)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 614,
      "top": 184,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 5 – Неоморфизм / Мягкий пользовательский интерфейс

**Концепция:** Светлый, однотонный фон (светло-серый). Две тени имитируют пластическое возвышение: темная тень внизу справа (внешняя тень) и светлая вставка вверху слева (внутренняя тень). Без рамки. Атмосфера: мягкая, осязаемая, современная.

> **Примечание:** Для корректной работы эффекта **цвет фона панели управления/представления** также должен быть таким же.`rgba(224, 229, 236, 1)` Таким образом, виджет и фон плавно сливаются воедино.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(210, 215, 222, 1)",
      "outerShadowColorFeedback": "rgba(163, 177, 198, 0.9)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "colorPickerColorModel": "hex",
      "g_attr_content_color_picker": true,
      "colorPickerWidth": 200,
      "colorPickerHandleSize": 8,
      "colorPickerHandleMargin": 6,
      "colorPickerComponentsSpace": 12,
      "colorPickerDirection": "vertical",
      "colorPickerBorderWidth": 0,
      "colorPickerShowWheel": true,
      "colorPickerShowSaturation": true,
      "colorPickerShowValue": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 6,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 6,
      "outerShadowBlur": 12,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(163, 177, 198, 0.8)",
      "innerShadowX": -6,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": -6,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(255, 255, 255, 1)",
      "background": "rgba(224, 229, 236, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0,0,0,0)",
      "textColor": "rgba(90, 110, 130, 1)",
      "contentColor": "rgba(90, 110, 130, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(210, 215, 222, 1)",
      "backgroundTrue1": "rgba(210, 215, 222, 1)",
      "outerShadowColor1": "rgba(163, 177, 198, 0.9)",
      "outerShadowColorTrue1": "rgba(163, 177, 198, 0.9)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 614,
      "top": 184,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 6 – Темный материал

**Концепция:** Вдохновлено темным режимом Material Design. Темно-сине-серый фон, бирюзовый акцентный цвет в качестве левой границы (как на панели активности VS Code). Атмосфера: современная, ориентированная на разработчиков, профессиональная темная.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(30, 40, 55, 1)",
      "outerShadowColorFeedback": "rgba(0, 188, 212, 0.5)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 8,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 8,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 8,
      "borderRadiusBottomRight": 8,
      "borderRadiusBottomLeft": 8,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 3,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 4,
      "outerShadowBlur": 16,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0, 0, 0, 0.5)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "rgba(18, 26, 38, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0, 188, 212, 1)",
      "textColor": "rgba(207, 216, 220, 1)",
      "contentColor": "rgba(0, 188, 212, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(30, 40, 55, 1)",
      "backgroundTrue1": "rgba(30, 40, 55, 1)",
      "outerShadowColor1": "rgba(0, 188, 212, 0.4)",
      "outerShadowColorTrue1": "rgba(0, 188, 212, 0.4)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 7 – Стекломорфизм

**Концепция:** Эффект матового стекла на полупрозрачном белом фоне (15 % непрозрачности) в сочетании с белой рамкой (30 %). Атмосфера: современная, легкая, прозрачная — лучше всего подходит для яркого или насыщенного изображениями фона.

> **Примечание:** Лучше всего работает на ярком или узорчатом фоне, чтобы эффект прозрачности был виден.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(255, 255, 255, 0.25)",
      "outerShadowColorFeedback": "rgba(31, 38, 135, 0.5)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 14,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 14,
      "borderRadiusBottomRight": 14,
      "borderRadiusBottomLeft": 14,
      "borderSizeTop": 1,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 8,
      "outerShadowBlur": 32,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(31, 38, 135, 0.37)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 8,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(255, 255, 255, 0.2)",
      "background": "rgba(255, 255, 255, 0.15)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(255, 255, 255, 0.3)",
      "textColor": "rgba(255, 255, 255, 1)",
      "contentColor": "rgba(255, 255, 255, 0.9)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(255, 255, 255, 0.25)",
      "backgroundTrue1": "rgba(255, 255, 255, 0.25)",
      "outerShadowColor1": "rgba(31, 38, 135, 0.5)",
      "outerShadowColorTrue1": "rgba(31, 38, 135, 0.5)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Конструкция 8 – Военно-тактическая

**Концепция:** фон оливково-зеленого цвета, окантовка цвета хаки, острые углы. Жесткая тень, без размытия. Минималистичный и функциональный дизайн, как у полевого снаряжения. Атмосфера: военная, прочная, надежная.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(40, 50, 20, 1)",
      "outerShadowColorFeedback": "rgba(0, 0, 0, 0.7)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 0,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 0,
      "borderRadiusBottomRight": 0,
      "borderRadiusBottomLeft": 0,
      "borderSizeTop": 2,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 2,
      "borderSizeLeft": 2,
      "borderSizeRight": 2,
      "borderStyle": "solid",
      "outerShadowX": 4,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 4,
      "outerShadowBlur": 0,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0, 0, 0, 0.6)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "rgba(55, 65, 35, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(100, 120, 60, 1)",
      "textColor": "rgba(180, 195, 140, 1)",
      "contentColor": "rgba(200, 210, 160, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(40, 50, 20, 1)",
      "backgroundTrue1": "rgba(40, 50, 20, 1)",
      "outerShadowColor1": "rgba(0, 0, 0, 0.7)",
      "outerShadowColorTrue1": "rgba(0, 0, 0, 0.7)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 9 – Жвачка / Конфета

**Концепция:** Яркий ярко-розовый цвет, полностью закругленная форма таблетки (радиус 55 пикселей), без рамки, мягкое розовое свечение. Атмосфера: игривая, жизнерадостная, конфетного цвета. Идеально подходит для оформления детских комнат или для интересных проектов.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(220, 40, 160, 1)",
      "outerShadowColorFeedback": "rgba(255, 82, 196, 0.7)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 55,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 55,
      "borderRadiusBottomRight": 55,
      "borderRadiusBottomLeft": 55,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 6,
      "outerShadowBlur": 20,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(255, 82, 196, 0.45)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "rgba(255, 82, 196, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0,0,0,0)",
      "textColor": "rgba(255, 255, 255, 1)",
      "contentColor": "rgba(255, 255, 255, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(220, 40, 160, 1)",
      "backgroundTrue1": "rgba(220, 40, 160, 1)",
      "outerShadowColor1": "rgba(255, 82, 196, 0.7)",
      "outerShadowColorTrue1": "rgba(255, 82, 196, 0.7)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Конструкция 10 – Терминал / Матрица

**Концепция:** черный фон, зеленый цвет "Матрицы" (`#00ff41` ), пунктирная рамка — как старый компьютерный терминал или культовая сцена из «Матрицы». Атмосфера: хакерская, цифровая ностальгия, минималистично-зловещая.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(0, 20, 5, 1)",
      "outerShadowColorFeedback": "rgba(0, 255, 65, 0.6)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 0,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 0,
      "borderRadiusBottomRight": 0,
      "borderRadiusBottomLeft": 0,
      "borderSizeTop": 1,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "dashed",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 0,
      "outerShadowBlur": 12,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0, 255, 65, 0.3)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 6,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0, 255, 65, 0.08)",
      "background": "rgba(0, 0, 0, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0, 255, 65, 0.5)",
      "textColor": "rgba(0, 255, 65, 1)",
      "contentColor": "rgba(0, 255, 65, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(0, 20, 5, 1)",
      "backgroundTrue1": "rgba(0, 20, 5, 1)",
      "outerShadowColor1": "rgba(0, 255, 65, 0.5)",
      "outerShadowColorTrue1": "rgba(0, 255, 65, 0.5)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 11 – Корпоративный синий

**Концепция:** Серьезный темно-синий цвет, белый текст, легкая тень, слегка закругленные углы. Отсутствие отвлекающих деталей. Атмосфера: профессиональный, внушающий доверие, корпоративная панель управления.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(12, 50, 90, 1)",
      "outerShadowColorFeedback": "rgba(0, 0, 0, 0.4)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 6,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 6,
      "borderRadiusBottomRight": 6,
      "borderRadiusBottomLeft": 6,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 4,
      "outerShadowBlur": 12,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0, 0, 0, 0.3)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 1,
      "innerShadowBlur": 3,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(255, 255, 255, 0.08)",
      "background": "rgba(21, 76, 121, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0,0,0,0)",
      "textColor": "rgba(255, 255, 255, 1)",
      "contentColor": "rgba(255, 255, 255, 0.9)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(12, 50, 90, 1)",
      "backgroundTrue1": "rgba(12, 50, 90, 1)",
      "outerShadowColor1": "rgba(0, 0, 0, 0.4)",
      "outerShadowColorTrue1": "rgba(0, 0, 0, 0.4)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 12 – Теплый закат

**Концепция:** Теплый градиент от кораллово-красного через оранжевый к желтому. Белый текст и значки, закругленные углы, мягкое теплое свечение. Атмосфера: располагающая, яркая, жизнерадостная — идеально подходит для приборных панелей в гостиной или на террасе.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "linear-gradient(135deg, rgba(220,60,60,1) 0%, rgba(220,110,30,1) 50%, rgba(220,170,50,1) 100%)",
      "outerShadowColorFeedback": "rgba(255, 94, 98, 0.6)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 18,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 18,
      "borderRadiusBottomRight": 18,
      "borderRadiusBottomLeft": 18,
      "borderSizeTop": 0,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 0,
      "borderSizeLeft": 0,
      "borderSizeRight": 0,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 6,
      "outerShadowBlur": 20,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(255, 94, 98, 0.4)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "linear-gradient(135deg, rgba(255,94,98,1) 0%, rgba(255,145,65,1) 50%, rgba(255,206,84,1) 100%)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0,0,0,0)",
      "textColor": "rgba(255, 255, 255, 1)",
      "contentColor": "rgba(255, 255, 255, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "linear-gradient(135deg, rgba(220,60,60,1) 0%, rgba(220,110,30,1) 50%, rgba(220,170,50,1) 100%)",
      "backgroundTrue1": "linear-gradient(135deg, rgba(220,60,60,1) 0%, rgba(220,110,30,1) 50%, rgba(220,170,50,1) 100%)",
      "outerShadowColor1": "rgba(255, 94, 98, 0.6)",
      "outerShadowColorTrue1": "rgba(255, 94, 98, 0.6)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 13 – Темное роскошное золото

**Концепция:** Почти чёрный, тёплый фон с золотыми акцентами (рамка, текст, иконка). Едва заметный золотистый блеск за счёт внешней тени. Атмосфера: элегантная, роскошная, премиальная — идеально подходит для высококлассных панелей управления.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(35, 25, 10, 1)",
      "outerShadowColorFeedback": "rgba(212, 175, 55, 0.4)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 4,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 4,
      "borderRadiusBottomRight": 4,
      "borderRadiusBottomLeft": 4,
      "borderSizeTop": 1,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 4,
      "outerShadowBlur": 20,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(212, 175, 55, 0.2)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 1,
      "innerShadowBlur": 4,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(212, 175, 55, 0.08)",
      "background": "rgba(20, 14, 8, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(212, 175, 55, 0.6)",
      "textColor": "rgba(212, 175, 55, 1)",
      "contentColor": "rgba(212, 175, 55, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(35, 25, 10, 1)",
      "backgroundTrue1": "rgba(35, 25, 10, 1)",
      "outerShadowColor1": "rgba(212, 175, 55, 0.4)",
      "outerShadowColorTrue1": "rgba(212, 175, 55, 0.4)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Проект 14 – Лед / Арктика

**Концепция:** Холодный ледяной синий, светлый фон, едва заметная синяя рамка, едва уловимая тень. Всё излучает спокойствие и холод. Атмосфера: свежая, ясная, информативная — отлично подходит для информационных панелей по климату или температуре.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(210, 235, 250, 1)",
      "outerShadowColorFeedback": "rgba(100, 160, 220, 0.4)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 12,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 12,
      "borderRadiusBottomRight": 12,
      "borderRadiusBottomLeft": 12,
      "borderSizeTop": 1,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "outerShadowX": 0,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 2,
      "outerShadowBlur": 10,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(100, 160, 220, 0.2)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 1,
      "innerShadowBlur": 3,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(255, 255, 255, 0.8)",
      "background": "rgba(232, 244, 253, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(144, 195, 235, 1)",
      "textColor": "rgba(44, 110, 160, 1)",
      "contentColor": "rgba(44, 110, 160, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(210, 235, 250, 1)",
      "backgroundTrue1": "rgba(210, 235, 250, 1)",
      "outerShadowColor1": "rgba(100, 160, 220, 0.35)",
      "outerShadowColorTrue1": "rgba(100, 160, 220, 0.35)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>

---

## Дизайн 15 – Брутализм

**Концепция:** Яркий желтый фон, сплошная черная рамка 4 пикселя, отсутствие скруглений, жесткая черная тень без размытия. Максимальный контраст, никаких компромиссов. Атмосфера: провокационная, яркая, смелая — художественная панель управления или дисплей будильника.

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "switch",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 110,
      "btnSpacing": 10,
      "countStates": 1,
      "buttonHoldValue": false,
      "feedbackDuration": 600,
      "g_attr_group_click_feedback": true,
      "backgroundFeedback": "rgba(220, 200, 0, 1)",
      "outerShadowColorFeedback": "rgba(0, 0, 0, 1)",
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 5,
      "textMarginRight": 0,
      "contentType": "icon",
      "g_attr_group_css_content": true,
      "contentMarginTop": 20,
      "contentMarginBottom": 0,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "contentSize": 29,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "space-between",
      "textAlign": "start",
      "contentAlign": "center",
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 5,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 9,
      "paddingBottom": 11,
      "borderRadiusTopLeft": 0,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 0,
      "borderRadiusBottomRight": 0,
      "borderRadiusBottomLeft": 0,
      "borderSizeTop": 4,
      "g_attr_group_css_border": true,
      "borderSizeBottom": 4,
      "borderSizeLeft": 4,
      "borderSizeRight": 4,
      "borderStyle": "solid",
      "outerShadowX": 8,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowY": 8,
      "outerShadowBlur": 0,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0, 0, 0, 1)",
      "innerShadowX": 0,
      "g_attr_group_css_inner_shadow": true,
      "innerShadowY": 0,
      "innerShadowBlur": 0,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0)",
      "background": "rgba(255, 230, 0, 1)",
      "text": "Hallo",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiA2YzAtMS4xLS45LTItMi0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNnptLTIgMGwtOCA1bC04LTVoMTZ6bTAgMTJINFY4bDggNWw4LTV2MTB6Ii8+PC9zdmc+",
      "invertOrder": false,
      "borderColor": "rgba(0, 0, 0, 1)",
      "textColor": "rgba(0, 0, 0, 1)",
      "contentColor": "rgba(0, 0, 0, 1)",
      "compareBy1": "default",
      "oid1": null,
      "comparisonOperator1": "===",
      "value1": null,
      "background1": "rgba(220, 200, 0, 1)",
      "backgroundTrue1": "rgba(220, 200, 0, 1)",
      "outerShadowColor1": "rgba(0, 0, 0, 1)",
      "outerShadowColorTrue1": "rgba(0, 0, 0, 1)",
      "g_countStates-1": true
    },
    "style": {
      "bindings": [],
      "left": 10,
      "top": 10,
      "width": 110,
      "height": 110,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "i000001"
  }
]
```

</details>