---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
# Example View - Smart Home Dashboard (3x3 Grid)

A simple 3x3 grid of square cards for a smart home overview.
Each card uses `contentType: "icon"` (SVG icon) and the `text` field.
No HTML required - all layout is done via the built-in alignment settings.

![Preview Design](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_rectangle_view.png)

---

## Layout

```
+----------+----------+----------+
|   Temp   | Humidity | Lighting |   row 1  (top 20)
+----------+----------+----------+
| Heating  | Security |  Energy  |   row 2  (top 190)
+----------+----------+----------+
|   Home   |  Media   |  Camera  |   row 3  (top 360)
+----------+----------+----------+
```

| Widget | Left | Top | Size |
|--------|------|-----|------|
| Temperature | 20 | 20 | 160 x 160 |
| Humidity | 190 | 20 | 160 x 160 |
| Lighting | 360 | 20 | 160 x 160 |
| Heating | 20 | 190 | 160 x 160 |
| Security | 190 | 190 | 160 x 160 |
| Energy | 360 | 190 | 160 x 160 |
| Home | 20 | 360 | 160 x 160 |
| Media | 190 | 360 | 160 x 160 |
| Camera | 360 | 360 | 160 x 160 |

**View size:** 540 x 540 px
**View background:** `#f0f2f8`

---

## Key Settings

| Setting | Value | Effect |
|---------|-------|--------|
| `contentType` | `"icon"` | Renders the SVG icon |
| `icon` | base64 SVG data URI | The icon to display |
| `contentSize` | `52` | Icon size in pixels |
| `contentColor` | color string | Tints the SVG icon |
| `text` | label string | Text shown below the icon |
| `flexDirection` | `"column"` | Icon above, text below |
| `alignItems` | `"center"` | Centers icon+text horizontally |
| `contentAlign` | `"center"` | Icon centred vertically in its zone |
| `textAlign` | `"center"` | Text centred vertically in its zone |

---

## Import

1. Open the target **View** in vis-2.
2. Toolbar -> **Import widget** (`Ctrl + I`).
3. Paste the JSON below -> **Import**.

> All widgets use `type: "readonly"` with static text.
> To bind live data: set `countStates >= 1` and define state conditions, or use an OID.

---

## JSON

<details>
<summary>📋 Show / copy JSON</summary>

```json
[
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTUsMTMuNVY1QTMsMywwLDAsMCw5LDVWMTMuNUE1LDUsMCwxLDAsMTUsMTMuNU0xMiw0QTEsMSwwLDAsMSwxMyw1VjE0LjE3QzE0LjE3LDE0LjYsMTUsMTUuNywxNSwxN0EzLDMsMCwwLDEsMTIsMjBBMywzLDAsMCwxLDksMTdDOSwxNS43LDkuODMsMTQuNiwxMSwxNC4xN1Y1QTEsMSwwLDAsMSwxMiw0WicvPjwvc3ZnPg==",
      "contentColor": "rgba(67,97,238,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Temperature",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "20px",
      "top": "20px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_temp"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTIsMy4yNUMxMiwzLjI1LDYsMTAsNiwxNEE2LDYsMCwwLDAsMTgsMTRDMTgsMTAsMTIsMy4yNSwxMiwzLjI1TTE0LjQ3LDkuOTdMMTUuNTMsMTEuMDNMOS41MywxNy4wM0w4LjQ3LDE1Ljk3TTkuNzUsMTBBMS4yNSwxLjI1LDAsMCwxLDExLDExLjI1QTEuMjUsMS4yNSwwLDAsMSw5Ljc1LDEyLjVBMS4yNSwxLjI1LDAsMCwxLDguNSwxMS4yNUExLjI1LDEuMjUsMCwwLDEsOS43NSwxME0xNC4yNSwxNC41QTEuMjUsMS4yNSwwLDAsMSwxNS41LDE1Ljc1QTEuMjUsMS4yNSwwLDAsMSwxNC4yNSwxN0ExLjI1LDEuMjUsMCwwLDEsMTMsMTUuNzVBMS4yNSwxLjI1LDAsMCwxLDE0LjI1LDE0LjVaJy8+PC9zdmc+",
      "contentColor": "rgba(38,198,218,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Humidity",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "190px",
      "top": "20px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_humidity"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTIsMkE3LDcsMCwwLDAsNSw5QzUsMTEuMzgsNi4xOSwxMy40Nyw4LDE0Ljc0VjE3QTEsMSwwLDAsMCw5LDE4SDE1QTEsMSwwLDAsMCwxNiwxN1YxNC43NEMxNy44MSwxMy40NywxOSwxMS4zOCwxOSw5QTcsNywwLDAsMCwxMiwyTTksMjFBMSwxLDAsMCwwLDEwLDIySDE0QTEsMSwwLDAsMCwxNSwyMVYyMEg5VjIxWicvPjwvc3ZnPg==",
      "contentColor": "rgba(255,193,7,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Lighting",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "360px",
      "top": "20px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_lighting"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTcuNjYsMTEuMkMxNy40MywxMC45LDE3LjE1LDEwLjY0LDE2Ljg5LDEwLjM4QzE2LjIyLDkuNzgsMTUuNDYsOS4zNSwxNC44Miw4LjcyQzEzLjMzLDcuMjYsMTMsNC44NSwxMy45NSwzQzEzLDMuMjMsMTIuMTcsMy43NSwxMS40Niw0LjMyQzguODcsNi40LDcuODUsMTAuMDcsOS4wNywxMy4yMkM5LjExLDEzLjMyLDkuMTUsMTMuNDIsOS4xNSwxMy41NUM5LjE1LDEzLjc3LDksMTMuOTcsOC44LDE0LjA1QzguNTcsMTQuMTUsOC4zMywxNC4wOSw4LjE0LDEzLjkzQzguMDgsMTMuODgsOC4wNCwxMy44Myw4LDEzLjc2QzYuODcsMTIuMzMsNi42OSwxMC4yOCw3LjQ1LDguNjRDNS43OCwxMCw0Ljg3LDEyLjMsNSwxNC40N0M1LjA2LDE0Ljk3LDUuMTIsMTUuNDcsNS4yOSwxNS45N0M1LjQzLDE2LjU3LDUuNywxNy4xNyw2LDE3LjdDNy4wOCwxOS40Myw4Ljk1LDIwLjY3LDEwLjk2LDIwLjkyQzEzLjEsMjEuMTksMTUuMzksMjAuOCwxNy4wMywxOS4zMkMxOC44NiwxNy42NiwxOS41LDE1LDE4LjU2LDEyLjcyTDE4LjQzLDEyLjQ2QzE4LjIyLDEyLDE3LjY2LDExLjIsMTcuNjYsMTEuMlonLz48L3N2Zz4=",
      "contentColor": "rgba(244,81,30,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Heating",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "20px",
      "top": "190px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_heating"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTIsMUE1LDUsMCwwLDAsNyw2VjhINVYyMkgxOVY4SDE3VjZBNSw1LDAsMCwwLDEyLDFNMTIsM0EzLDMsMCwwLDEsMTUsNlY4SDlWNkEzLDMsMCwwLDEsMTIsM00xMiwxN0EyLDIsMCwwLDEsMTAsMTVBMiwyLDAsMCwxLDEyLDEzQTIsMiwwLDAsMSwxNCwxNUEyLDIsMCwwLDEsMTIsMTdaJy8+PC9zdmc+",
      "contentColor": "rgba(103,58,183,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Security",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "190px",
      "top": "190px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_security"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNNywyVjEzSDEwVjIyTDE3LDEwSDEzTDE3LDJIN1onLz48L3N2Zz4=",
      "contentColor": "rgba(76,175,80,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Energy",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "360px",
      "top": "190px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_energy"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMTAsMjBWMTRIMTRWMjBIMTlWMTJIMjJMMTIsM0wyLDEySDVWMjBIMTBaJy8+PC9zdmc+",
      "contentColor": "rgba(33,150,243,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Home",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "20px",
      "top": "360px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_home"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNMjEsM1YxNS41QTMuNSwzLjUsMCwwLDEsMTcuNSwxOUEzLjUsMy41LDAsMCwxLDE0LDE1LjVBMy41LDMuNSwwLDAsMSwxNy41LDEyQTMuNSwzLjUsMCwwLDEsMTksMTIuMjJWNi40N0w5LDguNlYxNy41QTMuNSwzLjUsMCwwLDEsNS41LDIxQTMuNSwzLjUsMCwwLDEsMiwxNy41QTMuNSwzLjUsMCwwLDEsNS41LDE0QTMuNSwzLjUsMCwwLDEsNywxNC4yMlY2TDIxLDNaJy8+PC9zdmc+",
      "contentColor": "rgba(233,30,99,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Media",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "190px",
      "top": "360px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_media"
  },
  {
    "tpl": "tplInventwoWidgetUniversal",
    "data": {
      "bindings": [],
      "type": "readonly",
      "g_common": true,
      "mode": "singleButton",
      "oid": "nothing_selected",
      "countStates": 0,
      "g_attr_group_state_default": true,
      "contentType": "icon",
      "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nY3VycmVudENvbG9yJyBkPSdNNCw0SDdMOSwySDEzTDE3LDRIM2wyLDZWMThBMiwyLDAsMCwxLDIsMThWNkEyLDIsMCwwLDEsNCw0TTEyLDdBNSw1LDAsMSwwLDE3LDEyQTUsNSwwLDAsMCwxMiw3TTEyLDlBMywzLDAsMSwxLDksMTJBMywzLDAsMCwxLDEyLDlaJy8+PC9zdmc+",
      "contentColor": "rgba(96,125,139,1)",
      "background": "rgba(255,255,255,1)",
      "text": "Camera",
      "textColor": "rgba(30,40,60,1)",
      "g_attr_group_css_content": true,
      "contentSize": 52,
      "contentRotation": 0,
      "contentMirror": false,
      "contentMarginTop": 0,
      "contentMarginBottom": 8,
      "contentMarginLeft": 0,
      "contentMarginRight": 0,
      "g_attr_group_css_alignment": true,
      "flexDirection": "column",
      "alignItems": "center",
      "contentAlign": "center",
      "textAlign": "center",
      "invertOrder": false,
      "textDecoration": "none",
      "g_attr_group_css_text": true,
      "textMarginTop": 0,
      "textMarginBottom": 0,
      "textMarginLeft": 0,
      "textMarginRight": 0,
      "backgroundOpacity": 1,
      "g_attr_group_css_transparency": true,
      "contentOpacity": 1,
      "paddingLeft": 10,
      "g_attr_group_css_spacing": true,
      "paddingRight": 10,
      "paddingTop": 10,
      "paddingBottom": 10,
      "borderRadiusTopLeft": 16,
      "g_attr_group_css_border_radius": true,
      "borderRadiusTopRight": 16,
      "borderRadiusBottomRight": 16,
      "borderRadiusBottomLeft": 16,
      "g_attr_group_css_outer_shadow": true,
      "outerShadowX": 0,
      "outerShadowY": 4,
      "outerShadowBlur": 14,
      "outerShadowSize": 0,
      "outerShadowColor": "rgba(0,0,0,0.08)"
    },
    "style": {
      "bindings": [],
      "left": "360px",
      "top": "360px",
      "width": "160px",
      "height": "160px",
      "position": "absolute",
      "overflow": "visible",
      "font-size": "15px",
      "font-weight": "600"
    },
    "widgetSet": "vis-2-widgets-inventwo",
    "_id": "w_grid_camera"
  }
]
```

</details>

---

## Customisation Tips

### Replace the icon

Open the widget in the vis-2 editor, go to **Default State -> Icon** and pick any icon
from the built-in icon picker. The picker overwrites the `icon` field with the selected path.

### Bind a live value

Change `"type": "readonly"` to `"type": "switch"` and set an `"oid"` to make the
card react to a real ioBroker state.

### Show a value in the text

The `text` field supports HTML, so a second line with a dynamic value is possible:

```
text: "Temperature<br><span style='font-size:22px;font-weight:700'>21.5 C</span>"
```

### Grid formula

| Variable | Formula | Value used here |
|----------|---------|-----------------|
| Card size | chosen square size | 160 px |
| Gap between cards | chosen gap | 10 px |
| Outer margin | chosen margin | 20 px |
| Column 1 left | margin | 20 px |
| Column 2 left | margin + size + gap | 190 px |
| Column 3 left | margin + 2 * (size + gap) | 360 px |
| Row 1 top | margin | 20 px |
| Row 2 top | margin + size + gap | 190 px |
| Row 3 top | margin + 2 * (size + gap) | 360 px |
| View width | margin + 3*size + 2*gap + margin | 540 px |