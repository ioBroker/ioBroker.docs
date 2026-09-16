---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md
title: Universelles Widget - Designbeispiele
hash: TScvgO41q4FVV0pcGV5nTd0VvQGfbS/QSC+Gx9ZDM38=
---
# Universelles Widget – Designbeispiele

15 verschiedene Designvoreinstellungen für das **Universal-Widget** (Typ:`switch` , Modus:`singleButton` ).\
&#x20;Die JSON-Snippets können über den Importdialog direkt in ioBroker vis-2 importiert werden.

---

## Überblick

![Vorschau der Designs](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

| #  | Design                     | Hintergrund           | Grenze                 | Ecken              | Schatten          | Stil               |
| -- | -------------------------- | --------------------- | ---------------------- | ------------------ | ----------------- | ------------------ |
| 1  | **Moderner Minimalismus**  | Weiß                  | Untere 3 Pixel, Indigo | 10 px, einheitlich | Subtil            | Flach, sauber      |
| 2  | **Cyberpunk-Neon**         | Nahezu Schwarz        | 1 px, Cyan             | Scharf, 0 px       | Neonleuchten      | Futuristisch       |
| 3  | **Retro-Klassiker**        | Beige/Braun           | 3 px, Dunkelbraun      | 2 px               | Harter Offset     | Nostalgisch        |
| 4  | **Abstrakter Farbverlauf** | Magenta→Violett→Cyan  | Keiner                 | Diagonale          | Buntes weiches    | Künstlerisch       |
| 5  | **Neumorphismus**          | Hellgrau              | Keiner                 | 16 px, einheitlich | Dunkel + Hell     | Weich, taktil      |
| 6  | **Dunkles Material**       | Dunkelblaugrau        | Links 3 px, Türkis     | 8 px, einheitlich  | Elevation         | VS Code-Stil       |
| 7  | **Glasmorphismus**         | Weiß, 15 % Deckkraft  | 1 px, Weiß 30 %        | 14 px, einheitlich | Gefrostet         | Transparent        |
| 8  | **Militärtaktik**          | Olivgrün              | 2 px, Khaki            | 0 px, scharf       | Harter Offset     | Funktionell        |
| 9  | **Kaugummi / Süßigkeiten** | Knallpink             | Keiner                 | 55 px, Pille       | Rosa Schimmer     | Spielerisch        |
| 10 | **Terminal / Matrix**      | Schwarz               | 1 px, Grün gestrichelt | 0 px               | Grünes Leuchten   | Hacker             |
| 11 | **Corporate Blue**         | Marine                | Keiner                 | 6 Pixel            | Subtil            | Professional       |
| 12 | **Warme Sonnenuntergänge** | Orange→Rosa→Gelb      | Keiner                 | 18 Pixel           | Warmes Leuchten   | Warm, lebendig     |
| 13 | **Dunkles Luxusgold**      | Nahezu Schwarz (warm) | 1 px, Gold             | 4 px               | Goldener Schimmer | Elegant, luxuriös  |
| 14 | **Eis / Arktis**           | Eisblau               | 1 px, Hellblau         | 12 Pixel           | Kühl, zart        | Frisch, klar       |
| 15 | **Brutalismus**            | Signal Gelb           | 4 px, Schwarz          | 0 px               | Hart, Schwarz     | Kühn, unverfälscht |

---

## Design 1 – Modern Minimal

**Konzept:** Klares, übersichtliches Design mit weißem Hintergrund und einem indigofarbenen Akzent am unteren Rand. Abgerundete Ecken, unkompliziert.

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

## Design 2 – Cyberpunk-Neon

**Konzept:** Dunkler, fast schwarzer Hintergrund mit leuchtendem cyanfarbenem Neonlicht. Scharfe, kantige Ränder (keine Rundungen). Ein leuchtender Außenschatten simuliert den Neon-Effekt. Atmosphäre: futuristisch, digital, dystopisch.

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

## Design 3 – Retro-Klassiker

**Konzept:** Warme Erdtöne, dicker Rahmen, kaum abgerundete Ecken. Ein harter Schlagschatten ohne Unschärfe (Offset, keine Unschärfe) erinnert an bedruckte Knöpfe aus den 80er-Jahren. Atmosphäre: Klassisch, robust, nostalgisch.

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

## Entwurf 4 – Abstrakter Farbverlauf

**Konzept:** Kräftiger Farbverlauf von Magenta über Violett zu Cyan – diagonal. Organische, asymmetrische Ecken (diagonal gegenüberliegende Seiten sind größer/kleiner). Kein Rahmen, allein der Farbverlauf wirkt. Atmosphäre: künstlerisch, lebendig, modern-abstrakt.

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

## Design 5 – Neumorphismus / Soft UI

**Konzept:** Heller, einfarbiger Hintergrund (hellgrau). Zwei Schatten simulieren eine plastische Erhebung: ein dunkler Schatten unten rechts (äußerer Schatten) und ein heller, nach innen gerichteter Schatten oben links (innerer Schatten). Kein Rahmen. Wirkung: weich, haptisch, zeitgenössisch.

> **Hinweis:** Damit der Effekt funktioniert, muss auch die **Hintergrundfarbe des Dashboards/der Ansicht entsprechend** gewählt werden.`rgba(224, 229, 236, 1)` So verschmelzen Widget und Hintergrund nahtlos miteinander.

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

## Design 6 – Dunkles Material

**Konzept:** Inspiriert vom Dark Mode des Material Designs. Dunkelblaugrauer Hintergrund, türkisfarbene Akzentfarbe als linke Rahmenlinie (ähnlich der Aktivitätsleiste von VS Code). Wirkung: modern, entwicklerorientiert, professionell-dunkel.

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

## Entwurf 7 – Glasmorphismus

**Konzept:** Milchglaseffekt durch einen halbtransparenten weißen Hintergrund (15 % Deckkraft) kombiniert mit einem weißen Rand (30 %). Wirkung: modern, leicht, transparent – am besten auf einem farbigen oder bildbasierten Hintergrund zu präsentieren.

> **Hinweis:** Funktioniert am besten auf einem farbigen oder gemusterten Hintergrund, damit der Transparenzeffekt sichtbar wird.

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

## Design 8 – Militärtaktik

**Konzept:** Olivgrüner Hintergrund, khakifarbener Rand, scharfe Ecken. Harter Schlagschatten, keine Unschärfe. Minimalistisch und funktional wie Feldgeräte. Wirkung: militärisch, robust, zuverlässig.

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

## Design 9 – Kaugummi / Süßigkeiten

**Konzept:** Kräftig pinkfarbene, abgerundete Pillenform (Radius 55 px), ohne Rand, sanftes rosa Leuchten. Wirkung: verspielt, fröhlich, bonbonfarben. Perfekt für Kinderzimmer-Dashboards oder kreative Bastelprojekte.

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

## Design 10 – Terminal / Matrix

**Konzept:** Schwarzer Hintergrund, Matrixgrün (`#00ff41` ), gestrichelter Rand – wie ein alter Computerterminal oder die ikonische Matrix-Szene. Stimmung: Hacker, digital nostalgisch, minimalistisch-unheilvoll.

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

## Design 11 – Corporate Blue

**Konzept:** Seriöses Marineblau, weiße Schrift, dezenter Schatten, leicht abgerundete Ecken. Keine ablenkenden Details. Wirkung: professionell, vertrauenswürdig, wie ein Dashboard für Unternehmen.

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

## Design 12 – Sonnenuntergang Warm

**Konzept:** Warmer Farbverlauf von Korallenrot über Orange zu Gelb. Weiße Schrift und Icons, abgerundete Ecken, sanftes, warmes Leuchten. Wirkung: Einladend, lebendig, fröhlich – ideal für Wohnzimmer oder Terrassen-Armaturenbretter.

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

## Design 13 – Dunkles Luxusgold

**Konzept:** Nahezu schwarzer, warm getönter Hintergrund mit goldenen Akzenten (Rahmen, Text, Symbol). Dezenter Goldschimmer durch den äußeren Schatten. Wirkung: elegant, luxuriös, hochwertig – perfekt für exklusive Armaturenbretter.

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

## Entwurf 14 – Eis / Arktis

**Konzept:** Kühles Eisblau, heller Hintergrund, dezenter blauer Rand, kaum sichtbarer Schatten. Alles strahlt Ruhe und Kühle aus. Wirkung: Frisch, klar, sachlich – ideal für Klima- oder Temperaturanzeigen.

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

## Design 15 – Brutalismus

**Konzept:** Signalgelber Hintergrund, 4 px breiter, durchgezogener schwarzer Rand, keine Rundungen, harter, schwarzer Schlagschatten ohne Unschärfe. Maximaler Kontrast, keine Kompromisse. Wirkung: provokant, auffällig, markant – ideal für Dashboards oder Alarmanzeigen.

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