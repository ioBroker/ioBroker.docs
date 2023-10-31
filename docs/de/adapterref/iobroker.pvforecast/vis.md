---
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
---
![Logo](../../admin/pvforecast.png)

# ioBroker.pvforecast - VIS

Es gibt zwei Möglichkeiten, um die Prognosedaten in VIS darzustellen

- JSON Table (funktioniert direkt)
- JSON Graph / Chart (enthalten in ``vis-materialdesign``)

## JSON Table

Wähle eine ``JSONTable`` Object-ID als Datenquelle. Beispielsweise ``pvforecast.0.summary.JSONTable``.

## JSON Graph / Chart

Der Adapter [ioBroker.vis-materialdesign](https://github.com/Scrounger/ioBroker.vis-materialdesign) ist erforderlich, um das Widget nutzen zu können.

```
iobroker add vis-materialdesign
```

Wähle eine ``JSONGraph`` Object-ID als Datenquelle. Beispielsweise ``pvforecast.0.summary.JSONGraph``.

In den Adapter-Einstellungen können einige Eigenschaften des Graphen festgelegt werden (z.B. Rotation und Schriftgrößte der Beschriftungen).

## Beispiel

![VIS-Beispiel](./img/vis-example.png)

```json
{
    "settings": {
        "style": {
            "background-color": "#fff"
        },
        "theme": "redmond",
        "sizex": "",
        "sizey": "",
        "gridSize": "",
        "snapType": null,
        "useBackground": false
    },
    "widgets": {
        "e00001": {
            "tpl": "tplVis-materialdesign-Chart-JSON",
            "data": {
                "oid": "pvforecast.0.summary.JSONGraph",
                "g_fixed": false,
                "g_visibility": false,
                "g_css_font_text": false,
                "g_css_background": false,
                "g_css_shadow_padding": false,
                "g_css_border": false,
                "g_gestures": false,
                "g_signals": false,
                "g_last_change": false,
                "visibility-cond": "==",
                "visibility-val": 1,
                "visibility-groups-action": "hide",
                "chartType": "bar",
                "backgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.background",
                "chartAreaBackgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.background_chart",
                "globalColor": "#mdwTheme:vis-materialdesign.0.colors.charts.global",
                "titleLayout": "#mdwTheme:vis-materialdesign.0.fontSizes.card.title",
                "titleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.card.title",
                "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
                "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
                "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
                "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
                "showLegend": "true",
                "legendPosition": "right",
                "legendFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.legend",
                "legendFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.legend",
                "legendFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.legend",
                "legendPointStyle": "true",
                "showTooltip": "true",
                "tooltipMode": "nearest",
                "tooltipPosition": "nearest",
                "tooltipTimeFormats": "{\"millisecond\":\"lll:ss\",\"second\":\"lll:ss\",\"minute\":\"lll\",\"hour\":\"lll\",\"day\":\"lll\",\"week\":\"lll\",\"month\":\"lll\",\"quarter\":\"lll\",\"year\":\"lll\"}",
                "tooltipBackgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_background",
                "tooltipShowColorBox": "true",
                "tooltipTitleFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_title",
                "tooltipTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.tooltip_title",
                "tooltipTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.tooltip_title",
                "tooltipBodyFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_text",
                "tooltipBodyFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.tooltip_text",
                "tooltipBodyFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.tooltip_text",
                "tooltipBodyAlignment": "left",
                "xAxisPosition": "bottom",
                "xAxisTicksSource": "auto",
                "xAxisTitleColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_title",
                "xAxisTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.x_axis_title",
                "xAxisTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.x_axis_title",
                "xAxisValueLabelColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_values",
                "xAxisValueFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.x_axis_values",
                "xAxisValueFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.x_axis_values",
                "xAxisDistanceBetweenTicks": "10",
                "xAxisValueDistanceToAxis": "0",
                "xAxisShowAxis": "true",
                "xAxisShowAxisLabels": "true",
                "xAxisShowGridLines": "true",
                "xAxisGridLinesColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_gridlines",
                "xAxisShowTicks": "true",
                "xAxisZeroLineColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_zeroline",
                "xAxisMinRotation": "0",
                "xAxisMaxRotation": "0",
                "yAxisTitleColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_values",
                "yAxisTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.y_axis_title",
                "yAxisTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.y_axis_title",
                "yAxisValueLabelColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_values",
                "yAxisValueFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.y_axis_values",
                "yAxisValueFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.y_axis_values",
                "yAxisValueDistanceToAxis": "10",
                "signals-cond-0": "==",
                "signals-val-0": true,
                "signals-icon-0": "/vis/signals/lowbattery.png",
                "signals-icon-size-0": 0,
                "signals-blink-0": false,
                "signals-horz-0": 0,
                "signals-vert-0": 0,
                "signals-hide-edit-0": false,
                "signals-cond-1": "==",
                "signals-val-1": true,
                "signals-icon-1": "/vis/signals/lowbattery.png",
                "signals-icon-size-1": 0,
                "signals-blink-1": false,
                "signals-horz-1": 0,
                "signals-vert-1": 0,
                "signals-hide-edit-1": false,
                "signals-cond-2": "==",
                "signals-val-2": true,
                "signals-icon-2": "/vis/signals/lowbattery.png",
                "signals-icon-size-2": 0,
                "signals-blink-2": false,
                "signals-horz-2": 0,
                "signals-vert-2": 0,
                "signals-hide-edit-2": false,
                "lc-type": "last-change",
                "lc-is-interval": true,
                "lc-is-moment": false,
                "lc-format": "",
                "lc-position-vert": "top",
                "lc-position-horz": "right",
                "lc-offset-vert": 0,
                "lc-offset-horz": 0,
                "lc-font-size": "12px",
                "lc-font-family": "",
                "lc-font-style": "",
                "lc-bkg-color": "",
                "lc-color": "",
                "lc-border-width": "0",
                "lc-border-style": "",
                "lc-border-color": "",
                "lc-border-radius": 10,
                "lc-zindex": 0
            },
            "style": {
                "left": "29px",
                "top": "13px",
                "width": "916px",
                "height": "563px"
            },
            "widgetSet": "materialdesign"
        },
        "e00002": {
            "tpl": "tplTableBody",
            "data": {
                "g_fixed": false,
                "g_visibility": false,
                "g_css_font_text": false,
                "g_css_background": false,
                "g_css_shadow_padding": false,
                "g_css_border": false,
                "g_gestures": false,
                "g_signals": false,
                "g_last_change": false,
                "visibility-cond": "==",
                "visibility-val": 1,
                "visibility-groups-action": "hide",
                "static_value": "[{\"Title\": \"first\", \"Value\": 1, \"_Description\": \"Value1\"}, {\"Title\": \"second\", \"Value\": 2, \"_Description\": \"Value2\"}]",
                "signals-cond-0": "==",
                "signals-val-0": true,
                "signals-icon-0": "/vis/signals/lowbattery.png",
                "signals-icon-size-0": 0,
                "signals-blink-0": false,
                "signals-horz-0": 0,
                "signals-vert-0": 0,
                "signals-hide-edit-0": false,
                "signals-cond-1": "==",
                "signals-val-1": true,
                "signals-icon-1": "/vis/signals/lowbattery.png",
                "signals-icon-size-1": 0,
                "signals-blink-1": false,
                "signals-horz-1": 0,
                "signals-vert-1": 0,
                "signals-hide-edit-1": false,
                "signals-cond-2": "==",
                "signals-val-2": true,
                "signals-icon-2": "/vis/signals/lowbattery.png",
                "signals-icon-size-2": 0,
                "signals-blink-2": false,
                "signals-horz-2": 0,
                "signals-vert-2": 0,
                "signals-hide-edit-2": false,
                "lc-type": "last-change",
                "lc-is-interval": true,
                "lc-is-moment": false,
                "lc-format": "",
                "lc-position-vert": "top",
                "lc-position-horz": "right",
                "lc-offset-vert": 0,
                "lc-offset-horz": 0,
                "lc-font-size": "12px",
                "lc-font-family": "",
                "lc-font-style": "",
                "lc-bkg-color": "",
                "lc-color": "",
                "lc-border-width": "0",
                "lc-border-style": "",
                "lc-border-color": "",
                "lc-border-radius": 10,
                "lc-zindex": 0,
                "table_oid": "pvforecast.0.summary.JSONTable",
                "colCount": "4",
                "colWidth1": "25%",
                "colWidth2": "25%",
                "colWidth3": "25%",
                "colWidth4": "25%",
                "colAttr1": "Time",
                "colName1": "Uhrzeit",
                "colName2": "Gesamt",
                "colAttr2": "Total",
                "colName3": ""
            },
            "style": {
                "left": "31px",
                "top": "576px",
                "width": "923px",
                "height": "372px"
            },
            "widgetSet": "basic"
        }
    },
    "name": "pvforecast",
    "filterList": []
}
```