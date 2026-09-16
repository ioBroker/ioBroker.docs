---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/switch-widget.md)

# Switch Widget

The Switch Widget displays a classic toggle switch that turns a datapoint on or off. You define which value counts as "on" and which as "off" — so it works with boolean datapoints (`true`/`false`) as well as numeric ones (`0`/`1`) or any other pair of values.

![Switch Widget](../img/widget-switch.png)

---

## How to Add the Widget

1. Open the VIS 2 editor and switch to your view.
2. In the widget list on the left, find **inventwo design** and drag **Switch** onto the canvas.
3. In the sidebar on the right, click on **Object ID** and select the datapoint you want to control.
4. Set **Value true** and **Value false** to match the values your datapoint uses.
5. Switch to the runtime view to test the widget.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Object ID** | The datapoint this switch reads from and writes to. |
| **Value true** | The value that is written when the switch is turned on. Leave empty to use `true`. |
| **Value false** | The value that is written when the switch is turned off. Leave empty to use `false`. |
| **Text false** | Label shown next to the switch when it is off. Leave empty for no label. |
| **Text true** | Label shown next to the switch when it is on. Leave empty for no label. |
| **Text position** | Where the label appears relative to the switch: **End** (right), **Start** (left), **Top**, or **Bottom**. Default is **End**. |

---

### inventwo — Track

The track is the elongated background of the switch.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy all track settings from another Switch Widget. Useful to keep multiple switches visually consistent. |
| **Track color** | Track color when the switch is off. |
| **Track color true** | Track color when the switch is on. |
| **Track width** | Height of the track in pixels (1–50). |
| **Track border radius** | How round the track ends are (1–100 %). At 100 % the track is fully rounded (pill shape). |
| **Track shadow** | Drop shadow below the track. Set X offset, Y offset, blur, size, and color. **Shadow color true** is the shadow color used when the switch is on. |

---

### inventwo — Thumb

The thumb is the round handle that slides back and forth.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy all thumb settings from another Switch Widget. |
| **Thumb color** | Thumb color when the switch is off. |
| **Thumb color true** | Thumb color when the switch is on. |
| **ThumbSize** | Diameter of the thumb in pixels. Should be slightly larger than the track width. |
| **Thumb border radius** | How round the thumb is (1–100 %). At 100 % the thumb is a perfect circle. |
| **Thumb shadow** | Drop shadow on the thumb. Same settings as the track shadow. |

---

## Tips

- **Custom values:** If your device uses `"on"`/`"off"` strings instead of `true`/`false`, just enter those in **Value true** and **Value false**.
- **Style reuse:** Create one "template" Switch Widget, style it exactly how you want, then use **From widget** in all other switch widgets to copy those settings — saves a lot of time.
- **Font styling:** Text color, size, and font family of the label are controlled by the standard VIS widget style settings (CSS tab in the sidebar), not by the inventwo settings.

---

## See Also

- [Checkbox Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) — similar behavior, displayed as a checkbox instead of a toggle
- [Universal Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — fully custom tile with the same toggle behavior plus icons and shapes