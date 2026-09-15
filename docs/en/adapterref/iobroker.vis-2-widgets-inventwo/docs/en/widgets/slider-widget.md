---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/slider-widget.md)

# Slider Widget

The Slider Widget lets users set a numeric value by dragging a handle along a track. It works horizontally or vertically and is ideal for controlling dimmers, thermostats, blinds, volume, or any other numeric datapoint.

![Slider Widget](../img/widget-slider.png)

---

## How to Add the Widget

1. Drag **Slider** from the **inventwo design** widget list onto your view.
2. Click **Object ID** and select the numeric datapoint you want to control.
3. The minimum, maximum, and step values are automatically filled in from the object definition — adjust them if needed.
4. Choose **Orientation** (Horizontal or Vertical).
5. Style the track and thumb in the **inventwo - Slider track** and **inventwo - Slider thumb** groups.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Title** | Optional heading shown above the slider. Use this to label what the slider controls, e.g. `Charging current` or `Charge limit`. |
| **Unit** | Optional unit appended to all displayed values — the min/max labels, step marks, and the value tooltip. E.g. `A` or `%`. |
| **Object ID** | The datapoint to read and write. When selected, **Min value**, **Max value**, and **Step** are automatically populated from the object definition. |
| **Min value** | The lowest value the slider can set. Default: 0. |
| **Max value** | The highest value the slider can set. Default: 100. |
| **Step** | How much the value changes per increment. Default: 1. |
| **Orientation** | **Horizontal** (left/right, default) or **Vertical** (up/down). |
| **Show min max** | Shows the minimum and maximum values as labels at both ends of the slider. |
| **Read only** | When enabled, the slider displays the current value but cannot be dragged. Useful for read-only gauges. |

#### Value Label

| Setting | What it does |
|---------|-------------|
| **Value label display** | When the current value is shown above the thumb: **On drag (default)** — only while dragging; **Always** — permanently visible; **Never** — never shown. |

#### Step Marks

| Setting | What it does |
|---------|-------------|
| **Show steps** | Displays tick marks along the slider rail. |
| **Steps inside slider** | Places tick marks inside the rail instead of below/beside it. |
| **Show step marks above / left** | *(Only when steps are not inside)* Positions tick marks above the track (horizontal) or to the left (vertical) instead of below/right. |
| **Step mode** | **Auto**: marks are placed at a regular interval you specify. **Custom**: you enter the exact positions manually. |
| **Step display** | *(Auto mode only)* The interval between marks. For example, with Min=0, Max=100, and Step display=25, marks appear at 0, 25, 50, 75, and 100. |
| **Custom steps** | *(Custom mode only)* Comma-separated values for mark positions, e.g. `0,20,50,80,100`. |

---

### inventwo — Slider track

This group controls the appearance of the rail (the track the thumb slides along).

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy all track settings from another Slider Widget. |
| **Slider rail color** | Color of the inactive part of the rail (the part behind the thumb). |
| **Slider rail active color** | Color of the active part of the rail (the part between Min and the thumb). |
| **Track bar type** | **Normal**: the active fill is on the low-value side (standard). **Inverted**: the active fill is on the high-value side (useful for blinds). **None**: no active fill shown at all. |
| **Track width** | Thickness of the rail in pixels (1–50). Default: 10. |
| **Track border radius** | Rounds the ends of the rail (1–100). Default: 100 (fully rounded). |
| **Track shadow** | Drop shadow for the rail. Set X offset, Y offset, blur, size, and color. |

---

### inventwo — Slider thumb

This group controls the handle that the user drags.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy all thumb settings from another Slider Widget. |
| **Slider thumb color** | Fill color of the thumb. |
| **ThumbSize** | Diameter of the thumb in pixels (0–50). Set to 0 to hide the thumb completely (e.g. for a read-only bar). |
| **Thumb border radius** | How round the thumb is (1–100 %). At 100 % it is a perfect circle. |
| **Thumb shadow** | Drop shadow for the thumb. Same settings as the track shadow. |

---

## Tips

- **Vertical blinds slider:** Use **Orientation: Vertical** and **Track bar type: Inverted** so the filled part shows how far the blind is closed (top = closed, bottom = open).
- **Read-only gauge:** Enable **Read only** and set **ThumbSize** to 0 to display a clean progress bar without a draggable handle.
- **Style reuse:** Style one slider exactly how you want it, then use **From widget** in all others to copy those settings.

---

## See Also

- [Radial Slider Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md) — the same control displayed as a circular arc dial