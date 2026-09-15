---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/value-list-widget.md)

# Value List Widget

The Value List Widget takes a text value — from a datapoint or typed in manually — splits it into individual items, and displays them as a formatted bullet list. This is useful for showing comma-separated or newline-separated values in a readable layout.

**Example:** A datapoint that contains `"Living Room, Kitchen, Bedroom"` is displayed as a three-item bulleted list.

---

## How to Add the Widget

1. Drag **Value List** from the **inventwo design** widget list onto your view.
2. Either select an **Object ID** whose value contains the list items, or type the text directly into **Text (manual)**.
3. Set the **Separator** to match how your items are separated (e.g. `,` for comma-separated values, `\n` for newlines).
4. Choose a bullet style in the **Appearance** group.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Object ID** | When set, the list items come from this datapoint's current value. The manual text field is hidden when an OID is selected. |
| **Text (manual)** | Text to split into list items. Only visible when no Object ID is set. |
| **Separator** | The character or string used to split the text into items. Default: `,`. Use `\n` for newlines, `\t` for tabs. |
| **Trim whitespace** | When enabled, leading and trailing spaces are removed from each item. Recommended when using comma-separated values with spaces after the comma. |
| **Ignore empty entries** | When enabled, items that are empty after splitting (and optional trimming) are not displayed. |

---

### Appearance

| Setting | What it does |
|---------|-------------|
| **Bullet type** | The symbol shown before each item. Options: **Disc** (•), **Circle** (○), **Square** (▪), **Dash** (–), **Arrow** (›), **Numbered** (1. 2. 3.), **None** (no bullet), **Custom** (your own character). |
| **Custom character** | Only shown when **Bullet type** is set to **Custom**. Enter any character or emoji. |
| **Bullet color** | Color of the bullet symbol. Hidden when bullet type is **None**. |
| **Spacing bullet to text (px)** | Horizontal gap between the bullet and the item text. Hidden when bullet type is **None**. |
| **Line spacing (px)** | Vertical gap between list items. |
| **Padding** | Inner padding around the whole list in pixels. |

---

## Tips

- **Newline-separated values:** Set the separator to `\n` to split a multi-line string into individual list items.
- **Font styling:** Font family, size, weight, and color of the list text are set through the standard VIS widget CSS settings, not through the inventwo settings.
- **Dynamic lists:** Connect the widget to a string datapoint that is updated by a script or adapter. Every time the value changes, the list is re-rendered automatically.

---

## See Also

- [Marquee Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md) — displays a single scrolling text instead of a list
- [Table Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) — for structured tabular data from a JSON array