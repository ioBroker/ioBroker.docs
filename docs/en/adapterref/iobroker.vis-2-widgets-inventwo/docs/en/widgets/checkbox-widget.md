---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/checkbox-widget.md)

# Checkbox Widget

The Checkbox Widget displays a standard checkbox that toggles a datapoint between two values. Like the Switch Widget, you define what "checked" and "unchecked" mean — so it works with booleans, numbers, or any other value pair.

![Checkbox Widget](../img/widget-checkbox.png)

---

## How to Add the Widget

1. Drag **Checkbox** from the **inventwo design** widget list onto your view.
2. Click **Object ID** in the sidebar and select your datapoint.
3. Set **Value true** (checked state) and **Value false** (unchecked state).
4. Optionally enter a label in **Text false** / **Text true** and choose its position.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Object ID** | The datapoint this checkbox reads from and writes to. |
| **Value true** | Written to the datapoint when the checkbox is checked. Leave empty to use `true`. |
| **Value false** | Written to the datapoint when the checkbox is unchecked. Leave empty to use `false`. |
| **Text false** | Label shown when the checkbox is unchecked. Leave empty for no label. |
| **Text true** | Label shown when the checkbox is checked. Leave empty for no label. |
| **Text position** | Where the label appears: **End** (right, default), **Start** (left), **Top**, or **Bottom**. |

---

### inventwo — Style

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy all style settings from another Checkbox Widget. |
| **Box color** | Color of the checkbox border and icon when unchecked. |
| **Box color active** | Color of the checkbox when checked (fill and icon). |
| **Box size** | Size of the checkbox in pixels (0–50). Default is 24 px. |

---

## Tips

- **Consistent styling:** Use **From widget** to copy the color and size settings from a master checkbox widget so all checkboxes on your dashboard look the same.
- **Font and text color:** The label's font, size, and color come from the standard VIS widget CSS settings, not from the inventwo settings.

---

## See Also

- [Switch Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) — similar behavior with a toggle-switch appearance
- [Universal Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — fully custom tile with the same toggle behavior plus icons and shapes