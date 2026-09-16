---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
---
![Logo](../../admin/Life360ng.svg)
### The Next Generation
[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

(from version 1.4.0 – only the Latest version offers the full scope)
# Tab: Map Display

All settings in this tab control the visual appearance of the tracker maps. Changes take effect automatically on the next GPS update — no restart required.

---

## Map Design

Controls the overall look and feel of all tracker maps.

| Setting | Description |
|---|---|
| Page background | Background color of the map page |
| Header background | Background color of the map header bar |
| Header divider | Color of the dividing line below the header |
| Line width (px) | Width of the route line in pixels (1–10) |
| Route opacity | Transparency of the route line (0.0 = invisible, 1.0 = fully opaque) |
| Marker opacity | Transparency of the position marker / pin (0.0 = invisible, 1.0 = fully opaque) |
| Marker size | Size factor for the position marker (0.5 = half, 1.0 = default, 2.0 = double) |

---

## Places in Map

Flag markers can be shown on the map for Life360 places and your own custom places (My Places). Each source can be configured independently.

### Life360 Places

| Setting | Description |
|---|---|
| Show Life360 places as flags | Enable/disable flag markers for Life360 cloud places |
| Flag color (Life360 places) | Color of the flag markers |
| Flag size (Life360 places) | Size factor for the flag markers (0.5–3.0) |
| Flag opacity (Life360 places) | Transparency of the flag markers (0.0 = invisible, 1.0 = fully visible) |

### Own Places (My Places)

| Setting | Description |
|---|---|
| Show own places as flags | Enable/disable flag markers for custom My Places |
| Flag color (own places) | Color of the flag markers |
| Flag size (own places) | Size factor for the flag markers (0.5–3.0) |
| Flag opacity (own places) | Transparency of the flag markers (0.0 = invisible, 1.0 = fully visible) |

---

## Family map title

| Setting | Description |
|---|---|
| Family map header name | Custom title shown in the header of the family/circle map |