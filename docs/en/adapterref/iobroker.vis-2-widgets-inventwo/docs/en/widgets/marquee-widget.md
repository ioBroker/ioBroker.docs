---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/marquee-widget.md)

# Marquee Widget

The Marquee Widget displays text that continuously scrolls across the widget area — like a classic ticker or news banner. The text can come from an ioBroker datapoint (e.g. a status message, sensor value, or notification) or you can type it in manually.

---

## How to Add the Widget

1. Drag **Marquee** from the **inventwo design** widget list onto your view.
2. Resize the widget to the width you want for the scrolling area.
3. Either select an **Object ID** or type the text directly into **Scrolling text (static)**.
4. Adjust speed and direction to your liking.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Object ID** | When set, the scrolling text is the current value of this datapoint. The manual text field is hidden when an OID is selected. |
| **Scrolling text (static)** | Manual text to scroll. Only visible when no Object ID is set. |
| **Direction** | Scroll direction: **Left** (right-to-left, default) or **Right** (left-to-right). |
| **Speed (px/s)** | How fast the text scrolls in pixels per second. Range: 10–500. Default: 80. Higher = faster. The speed is constant regardless of how many copies are shown. |
| **Text copies** | How many times the text is repeated side by side in the animation loop. Default: 3. Increase this if short text leaves visible gaps during scrolling. |
| **Gap between copies (px)** | Space in pixels between two copies of the text. Default: 50. |
| **Pause on hover** | When enabled, the scrolling animation pauses when the mouse cursor is over the widget. |
| **Background** | Optional background fill color for the widget area. |

---

## Text Appearance

Font family, font size, text color, font weight, and letter spacing are all set through the standard VIS widget CSS settings (the **CSS** tab or **Font** section in the sidebar) — not through the inventwo settings panel.

---

## Tips

- **Avoid gaps:** If your text is short and you see a gap between the end of one pass and the start of the next, increase **Text copies** until the gap disappears.
- **Live data:** Connect the **Object ID** to a string datapoint (e.g. an adapter that writes news headlines, stock prices, or weather summaries) for a fully live ticker.
- **Speed vs. readability:** For text that should be read comfortably, stay below 100 px/s. For a pure visual effect, higher speeds work well.

---

## See Also

- [Value List Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md) — displays a list instead of scrolling text
- [Universal Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) — for static text inside a styled tile