---
chapters: {"pages":{"en/adapterref/iobroker.dwd/README.md":{"title":{"en":"ioBroker.dwd"},"content":"en/adapterref/iobroker.dwd/README.md"},"en/adapterref/iobroker.dwd/docs/en/README.md":{"title":{"en":"DWD widgets"},"content":"en/adapterref/iobroker.dwd/docs/en/README.md"}}}
---
# DWD widgets

The `dwd` adapter ships two front-ends besides the adapter itself:

| Where                | What                                               |
|----------------------|----------------------------------------------------|
| **vis / vis-2**      | the `DWD warnings` widget, in the widget set `dwd` |
| **ioBroker.devices** | the `DWD warning` tile for the dashboard           |

Both show the same data and are configured the same way: pick the adapter instance and the number of
the warning. Everything else is optional.

The instance settings show the warnings that are currently active as well, see
[The instance settings](#the-instance-settings).

---

## The warnings of the adapter

The adapter writes the warnings of the configured region into numbered channels:

```
dwd.0.warning.headline       Amtliche WARNUNG vor WINDBÖEN
dwd.0.warning.text           WINDBÖEN
dwd.0.warning.description    Es treten Windböen mit Geschwindigkeiten ...
dwd.0.warning.instruction    recommendation of the DWD, often empty
dwd.0.warning.severity       0, 1 … 4, 9, 11, 19, 49, 50
dwd.0.warning.begin          start, milliseconds since epoch
dwd.0.warning.end            end, may be empty
dwd.0.numberOfWarnings       how many warnings are currently active
```

**`warning` is always the most severe warning that is currently active.** The list is re-sorted on
every run, so a widget pointed at `warning` always shows the most important one — it does not stay
on one particular event. The other channels are `warning1`, `warning2`, … — the first one has no
number, there is no `warning0`. How many channels exist is set in the adapter configuration
("Number of warnings", 1 … 10).

When there are fewer warnings than channels, the remaining channels are emptied. The widgets then
show "No warning".

### Warnings for one municipality (warncell)

The regions are districts, coastal and lake areas. To get the warnings of a single municipality,
additionally enter its **warncell ID** — 9 digits, starting with `8` (`7` for the districts of Berlin
and Hamburg). The ID is listed in the
[warncell list of the DWD](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/cap_warncellids_csv.csv?__blob=publicationFile&v=3)
(CSV, the rows with `8…`/`7…`; the rows with `1…` are districts and are not accepted).

The warnings of the warncell are read from the geoserver of the DWD (`maps.dwd.de`) and are written
**in addition** to those of the region into a folder of their own, with the same structure and the
same number of channels:

```
dwd.0.warncell.numberOfWarnings
dwd.0.warncell.warning.headline     most severe warning of the municipality
dwd.0.warncell.warning1.headline    second most severe
...
```

As for the region, the first channel has no number. The folder and channel names contain the name of
the municipality, which the adapter looks up once at the DWD. Without a warncell ID the folder does not
exist; when the ID is removed again, the adapter deletes it on the next run. The map (`map`) still
follows the configured federal state.

### The colour

The background colour comes from `severity` and is the same in both widgets and in the old vis-1
widget set:

| severity | meaning | colour |
| --- | --- | --- |
| 0 | none | — |
| 1 | weather warning | `#ffeb3b` |
| 2 | warning of significant weather | `#fb8c00` |
| 3 | severe weather warning | `#e53935` |
| 4 | warning of extreme severe weather | `#880e4f` |
| 9 | heat warning | `#c99afe` |
| 11 | no warning | `#c9f` |
| 19 | UV warning | `#fe68fe` |
| 49 | strong heat | `#e966fe` |
| 50 | extreme heat | `#f933fe` |

![Severity colours](../img/severity-colors.svg)

*Rendered, with the text colour each background gets.*

These colours carry the meaning of the warning, so they do **not** follow the light/dark theme —
`#880e4f` stays `#880e4f` in both. Only the text colour on top of them is chosen automatically
(black or white), so the text stays readable in either theme.

---

## vis-2: the `DWD warnings` widget

Widget set `dwd`, widget `DWD warnings`.

![The widget in both layouts](../img/vis2-widget.svg)

### Settings

| Setting | Meaning |
| --- | --- |
| **Layout** | `Full warning` — headline, description, period and instruction. `Compact` — one line with the short warning text. |
| **Instance** | which `dwd` instance to read |
| **Warning** | number of the warning. `0` is the most severe one (channel `warning`), `1` means `warning1` and so on. |
| **Time format** | how begin and end are printed. Placeholders: `YYYY`, `YY`, `MM`, `DD`, `hh`, `mm`, `ss`. Default `DD.MM hh:mm`. Only in the full layout. |
| **Show instruction** | shows `instruction` — the recommendation of the DWD. It is often empty. Only in the full layout. |
| **Without card** / **Name** | the usual vis-2 card around the widget |

Under **Object IDs** there is one more switch:

| Setting | Meaning |
| --- | --- |
| **Set object IDs manually** | Turns off the derivation from instance and warning number and lets you point the widget at any six states. Only needed if the states do not come from a `dwd` instance. |

### Coming from vis-1

The old widget set had two templates, `tplDwdAdapter` (large) and `tplDwdAdapterSmall` (compact).
The vis-2 widget is **one** widget and the two variants are the `Layout` setting.

- Views that use **`tplDwdAdapter`** are taken over by the vis-2 widget automatically — it registers
  under the same template id. The object ids that are already configured keep being used, so the
  widget shows what it showed before. Nothing has to be changed by hand.
- Views that use **`tplDwdAdapterSmall`** keep running with the old vis-1 template, which is still
  shipped. To move them to the vis-2 widget, place a `DWD warnings` widget and set `Layout` to
  `Compact`.

> **Note on the old default value:** in the vis-1 widget the field for the instruction was
> pre-filled with `dwd.0.warning.hint`. That state does not exist — the adapter writes
> `dwd.0.warning.instruction`. If your instruction stayed empty, that was why. The vis-2 widget uses
> the correct state when it derives the ids itself.

---

## ioBroker.devices: the `DWD warning` tile

In the dashboard of `ioBroker.devices`, add the widget **DWD warning**.

![The tile in its three sizes](../img/devices-tiles.svg)

### Settings

| Setting | Meaning |
| --- | --- |
| **Instance** | which `dwd` instance to read |
| **Warning** | number of the warning. `0` is the most severe one (channel `warning`), `1` means `warning1` and so on. |
| **Time format** | how begin and end are printed, same placeholders as above |
| **Show period** | shows begin and end of the warning |
| **Show instruction** | shows the recommendation of the DWD, off by default |
| **Icon** / **Name** | the usual tile header |

### The three sizes

The tile adapts to the size it gets in the dashboard:

- **1×1** — icon and the short warning text.
- **2×0.5** — one strip: icon, warning text in the severity colour, period.
- **2×1 and 2×2** — the title bar with the period, then headline, description and, if switched on,
  the instruction.

The tile is marked as "active" while a warning is present, and takes the severity colour as its
accent — so an active warning is visible in the dashboard without reading the text.

---

## The instance settings

Below the configuration, the instance settings list the warnings that are currently active for the
configured region:

![The current warnings in the instance settings](../img/config-warnings.svg)

The values are read straight from the states, **not** from the adapter process — the adapter runs in
schedule mode and is only alive for a few seconds every five minutes, so anything that had to ask the
running instance would usually time out.

A warning whose headline is empty is hidden, and so are the `warning<n>` channels that do not exist
because "Number of warnings" is set lower. If there is no warning at all, a single line says so. The
list updates by itself when the adapter writes new values — the dialog does not have to be reopened.

When a warncell ID is set, the warnings of the warncell follow below in a second list of the same
kind.

---

## Building from source

```bash
npm run build            # adapter + both front-ends
npm run build:widgets    # only the vis-2 widget set -> widgets/dwd/
npm run build:devices    # only the devices tile     -> admin/dm-widgets/
```

The sources are in `src-widgets/` (vis-2) and `src-devices/` (devices dashboard). Both are React +
TypeScript, built with vite and module federation. The component names and the URL are repeated in
`io-package.json` under `common.visWidgets` and `common.deviceWidgets` — adding a widget means
touching the `exposes` of the vite config **and** that block.