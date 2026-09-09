---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/index.md)

# inventwo Widgets for ioBroker VIS 2 — User Guide

Welcome to the inventwo widget documentation. This guide explains how to use each widget in the VIS 2 editor to build your own smart home dashboards.

## What are inventwo widgets?

The inventwo widget set adds highly customizable tiles, controls, and display elements to VIS 2. All styling is done directly in the VIS 2 editor sidebar — no CSS knowledge required.

---

## Widget Overview

### Universal Widget
**The most powerful widget in the set.** One tile that can act as a button, switch, navigation link, dialog opener, or read-only status display — and changes its appearance depending on the datapoint value.

→ [Universal Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md)

![Universal Widget](img/widget-universal.png)

---

### Slider
**A horizontal or vertical slider for numeric values.** Drag the thumb to set a value, e.g. brightness, temperature, or volume. Fully styled — rail color, active color, thumb shape, and step marks.

→ [Slider Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md)

![Slider Widget](img/widget-slider.png)

---

### Radial Slider
**A circular arc slider for numeric values.** Works the same as the regular slider but is displayed as a round dial, great for thermostat-style tiles.

→ [Radial Slider Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md)

![Radial Slider Widget](img/widget-radial-slider.png)

---

### Switch
**A toggle switch for on/off or any two-state datapoint.** Looks like a classic on/off switch. Track and thumb are independently styled.

→ [Switch Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md)

![Switch Widget](img/widget-switch.png)

---

### Checkbox
**A checkbox for on/off or any two-state datapoint.** Simpler than the switch — just a checkbox with a label.

→ [Checkbox Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md)

![Checkbox Widget](img/widget-checkbox.png)

---

### Table
**Displays a JSON array datapoint as a formatted table.** Sort columns, filter rows, highlight rows by value, and format cells as text, numbers, dates, or images.

→ [Table Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md)

![Table Widget](img/widget-table.png)

---

### Dropdown
**A dropdown menu that reads its options from an ioBroker object's state list.** Select a value and it is written back to the datapoint.

→ [Dropdown Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md)

![Dropdown Widget](img/widget-dropdown.png)

---

### Marquee
**Scrolling text from a datapoint or manually entered text.** Useful for news tickers, status messages, or long labels that don't fit in a fixed space.

→ [Marquee Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md)

---

### Value List
**Splits a text value into a formatted bullet list.** Great for displaying comma-separated or newline-separated values as a readable list.

→ [Value List Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md)

---

### Calendar
**A full month calendar view.** Works as a datepicker (read and write a date), a read-only date display, or a today-highlighter — freely combinable, with full color and layout customization.

→ [Calendar Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md)

---

## Where to Start

- **Building a control panel with buttons?** → [Universal Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md)
- **Controlling a dimmer or temperature?** → [Slider Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md) or [Radial Slider Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md)
- **Simple on/off controls?** → [Switch Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) or [Checkbox Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md)
- **Displaying tabular data?** → [Table Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md)
- **Picking or displaying a date?** → [Calendar Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md)
- **Selecting a mode or scene?** → [Dropdown Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md)