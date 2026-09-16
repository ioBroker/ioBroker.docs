---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/universal-widget.md)

# Universal Widget

The Universal Widget is the most versatile widget in the inventwo set. It combines **interaction behavior**, **visual content**, and **state-based styling** in one tile. Use it when you want a single, consistent-looking tile that reacts to your datapoint — changing its icon, color, text, or shape depending on the value.

![Universal Widget](../img/widget-universal.png)

**Typical uses:**
- Light switch tile that changes icon and color when turned on
- Room navigation buttons that highlight the currently active view
- Button that opens a detail view in a dialog overlay
- Read-only status tile showing a device state with custom icons
- RGB color picker embedded in a tile
- Analog clock tile on your dashboard
- Plus/minus increment buttons

---

## Quick Start

1. Drag **Universal (Switch, Button, Nav, Image & more)** from the **inventwo design** widget list onto your view.
2. Choose a **Type** — this is the most important setting and defines what happens when you click the tile. See [Interaction Types](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md).
3. Click **Object ID** and select the datapoint (if your type reads or writes a value).
4. Choose a **Content type** to decide what is shown inside the tile (icon, image, text, embedded view, etc.). See [Content Types](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md).
5. Configure the default state in the **Default state** group — background, colors, text, icon.
6. Add more states in the **State** groups to change the tile's look depending on the datapoint value.
7. Style the tile (shape, border, shadow, etc.) in the inventwo style groups. See [Styling and Shapes](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md).

---

## Key Concepts

### Type (interaction behavior)
What happens when you click the tile. Options: Switch, Button, Nav, Read only, View in dialog, Increase/decrease value, Send HTTP request. → [Detailed explanation](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md)

### Mode
- **Single button**: one tile that shows a single state at a time.
- **Separated buttons**: each state is its own clickable button, arranged side by side. Useful for multi-option selectors (like the old radio-button-list widget).

### States
The Universal Widget supports multiple visual states. Each state is triggered when the datapoint value matches a condition you define. For example: State 1 = icon of a lit bulb when value is `true`, State 2 = icon of a dark bulb when value is `false`.

The **Default state** (State 1) is always shown when no other state condition matches, or when no OID is bound.

### Content Type
What is rendered inside the tile. Options: Icon, Image, Text/HTML, View in widget, Color picker, Analog clock. → [Detailed explanation](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md)

### From Widget (style reuse)
Most style groups have a **From widget** field. Select another Universal Widget and all settings from that group are copied from it. This is how you keep many tiles visually consistent without configuring each one individually.

---

## Detail Pages

- [Interaction Types](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md) — Switch, Button, Nav, Dialog, HTTP, and more
- [Content Types](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md) — Icon, Image, HTML, View in widget, Color picker, Analog clock
- [Styling and Shapes](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md) — All style groups, shapes, click feedback

---

## See Also

- [Switch Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) — simpler on/off toggle
- [Checkbox Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) — simpler checkbox control
- [Dropdown Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md) — for selecting from a states list