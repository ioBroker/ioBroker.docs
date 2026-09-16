---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md
title: Пример отображения - Шестиугольная панель управления умным домом
hash: 3uUYnCd5ejNU0zZiw3sKwVaT8PkqRCkI1VnbCNPIHb0=
---
# Пример отображения - Шестиугольная панель управления умным домом
Готовый к импорту макет в виде сотовой структуры с 7 квадратными шестиугольными виджетами (140 × 140 пикселей).
Один центральный виджет окружен 6 виджетами, отображающими комнаты/функции, все они математически расположены таким образом, чтобы сотовая структура плавно переплеталась.

![Предварительный просмотр дизайна](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_hexagon_view.png)

---

## Концепция
```
        [ 💡 Lights   ]   [ 🛏 Bedroom ]
    [ 🛋 Living Room ]   [ 🏠 Smart Home ]   [ 🍳 Kitchen ]
        [ 🔒 Security ]   [ 🌿 Garden  ]
```

| Виджет | Значок | Акцентный цвет |
|--------|------|---------------|
| Центр - Умный дом | 🏠 | Серебристо-белый |
| СЗ - Огни | 💡 | Золотисто-желтый |
| СВЕ - Спальня | 🛏️ | Лавандовый |
| E - Кухня | 🍳 | Теплый оранжевый |
| Юго-Восток - Сад | 🌿 | Свежая зелень |
| Программное обеспечение - Безопасность | 🔒 | Красный сигнал тревоги |
| W - Гостиная | 🛋️ | Амбер |

---

## Математика в сетке
**Размер виджета:** 140 × 140 пикселей (квадрат - одинаковая ширина и высота) **Форма:** Шестиугольник, с заостренным концом (`shapeRotation: 0`)

| Значение | Формула | Результат |
|-------|---------|--------|
| Окружной радиус r | 140/2 | 70 пикселей |
| Расстояние до соседей (по горизонтали) | √3 × r | 121 px |
| Расстояние до соседа (по вертикали) | 1,5 × r | 105 пикселей |
| Рекомендуемый размер отображения | - | 460 × 420 пикселей |

> **Установите фоновое изображение на `#0a0a18`:** Прозрачные углы квадратных виджетов сливаются с темным фоном, создавая бесшовный эффект сот.

---

## Импорт
1. Откройте нужный **вид** в vis-2.
2. Панель инструментов → **Импорт виджета** (`Ctrl + I`).
3. Вставьте полный JSON-код ниже → **Импорт**.
4. Все 7 виджетов отображаются правильно.

> Все виджеты имеют тип `readonly`, а тип `oid: "nothing_selected"` необходимо обновить после импорта.

---

## JSON
<подробности> <краткое описание>📋 Показать / скопировать JSON</краткое описание>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🏠</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(200,210,255,1)\">Smart Home</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(200,210,255,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(180,190,255,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 20,
      "outerShadowSize": 3,
      "outerShadowColor": "rgba(150,160,255,0.50)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(22, 22, 42, 1)"
    },
    "style": {
      "bindings": [],
      "left": 180,
      "top": 160,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_center"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">💡</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,215,64,1)\">Lights</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(255,215,64,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(255,215,64,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(255,215,64,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(30, 26, 4, 1)"
    },
    "style": {
      "bindings": [],
      "left": 119,
      "top": 55,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_nw"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🛏️</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(179,157,219,1)\">Bedroom</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(179,157,219,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(179,157,219,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(149,117,205,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(18, 10, 30, 1)"
    },
    "style": {
      "bindings": [],
      "left": 241,
      "top": 55,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_ne"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🍳</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,138,101,1)\">Kitchen</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(255,138,101,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(255,112,67,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(255,112,67,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(30, 12, 5, 1)"
    },
    "style": {
      "bindings": [],
      "left": 301,
      "top": 160,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_e"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🌿</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(129,199,132,1)\">Garden</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(129,199,132,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(102,187,106,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(102,187,106,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(6, 20, 7, 1)"
    },
    "style": {
      "bindings": [],
      "left": 241,
      "top": 265,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_se"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🔒</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(239,83,80,1)\">Security</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(239,83,80,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(239,83,80,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(239,83,80,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(30, 5, 5, 1)"
    },
    "style": {
      "bindings": [],
      "left": 119,
      "top": 265,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_sw"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "direction": "row",
      "oid": "nothing_selected",
      "httpType": "send",
      "buttonSize": 140,
      "btnSpacing": 0,
      "countStates": 0,
      "buttonHoldValue": false,
      "contentBlinkInterval": 0,
      "g_attr_group_state_default": true,
      "contentType": "html",
      "g_attr_group_css_content": true,
      "html": "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:5px\"><span style=\"font-size:42px;line-height:1\">🛋️</span><span style=\"font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,183,77,1)\">Living Room</span></div>",
      "contentSize": 40,
      "contentRotation": 0,
      "contentMirror": false,
      "flexDirection": "column",
      "g_attr_group_css_alignment": true,
      "alignItems": "center",
      "textAlign": "center",
      "contentAlign": "center",
      "text": "",
      "textColor": "rgba(255,183,77,1)",
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 6,
      "g_attr_group_css_spacing": true,
      "paddingRight": 6,
      "paddingTop": 6,
      "paddingBottom": 6,
      "g_attr_group_css_border": true,
      "borderSizeTop": 1,
      "borderSizeBottom": 1,
      "borderSizeLeft": 1,
      "borderSizeRight": 1,
      "borderStyle": "solid",
      "borderColor": "rgba(255,183,77,0.30)",
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 0,
      "outerShadowBlur": 16,
      "outerShadowSize": 2,
      "outerShadowColor": "rgba(255,183,77,0.45)",
      "g_attr_group_css_inner_shadow": true,
      "innerShadowX": 0,
      "innerShadowY": 4,
      "innerShadowBlur": 12,
      "innerShadowSize": 0,
      "innerShadowColor": "rgba(0,0,0,0.55)",
      "g_attr_group_css_shape": true,
      "shape": "hexagon",
      "shapeRotation": 0,
      "shapeCornerRadius": 4,
      "background": "rgba(30, 20, 4, 1)"
    },
    "style": {
      "bindings": [],
      "left": 59,
      "top": 160,
      "width": 140,
      "height": 140,
      "position": "absolute",
      "overflow": "visible"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_hex_w"
  }
]
```

</details>

---

## Советы по настройке
### Интерактивность
```json
"type": "nav",    "view": "MyViewName"
"type": "switch", "oid": "hm-rpc.0.device.STATE"
```

### Второе кольцо (ещё 12 шестиугольников)
Одна и та же центральная точка (250 / 230), расстояние = 2 × 121 = 242 пикселя, шаг 60°.

### Иконки vis-2 вместо эмодзи
Установите значение `contentType: "icon"` и выберите значок MDI из палитры значков vis-2.

Вставьте текстовую метку в поле `text`.

### Цветовая схема
Каждый виджет имеет четыре связанных цветовых значения:

| Поле | Цель |
|-------|---------|
| `background` | Очень тёмный оттенок акцентного цвета |
| `outerShadowColor` | Акцентный цвет при 45 % альфа-канала → эффект свечения |
| Цвет в поле `html` | Акцентный цвет @ 100 % → текст метки |
| Цвет в поле `html` | Акцентный цвет @ 100 % → текст метки |

### Цвет фона для просмотра
В настройках просмотра → Цвет фона: **`#0a0a18`**