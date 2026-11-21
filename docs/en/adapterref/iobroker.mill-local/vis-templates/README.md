---
chapters: {"pages":{"en/adapterref/iobroker.mill-local/README.md":{"title":{"en":"ioBroker.mill-local"},"content":"en/adapterref/iobroker.mill-local/README.md"},"en/adapterref/iobroker.mill-local/README_de.md":{"title":{"en":"ioBroker.mill-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.mill-local/README_de.md"},"en/adapterref/iobroker.mill-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.mill-local"},"content":"en/adapterref/iobroker.mill-local/vis-templates/README.md"}}}
---
# vis templates for ioBroker.mill-local

Ready-made views for **vis 1** (`iobroker.vis` 1.x). They use only data points of `mill-local.0` and the adapter's own
vis widgets (set *mill-local*), so they work on any installation of this adapter: no scripts, no chart adapter. Dark
and light design (each widget follows the browser setting by default, attribute *Colour scheme*), 1280 × 800 px for
tablets and desktops plus a 390 px wide view for phones. Texts come from the widgets and are shown in the vis language
(eleven languages).

| File | Content |
|---|---|
| `view_Mill_Uebersicht.json` | Start page: one card per device (room temperature, running period or operation mode, target with − / +, on/off, current power, energy today), total power and energy, and today's periods of all devices. Tapping a card opens its detail page. |
| `view_Mill_Geraet1.json` … `view_Mill_Geraet4.json` | Detail page per device: room temperature with the running period (e.g. *Comfort (22 °C) until 22:00*), target with − / +, values, operation mode, the weekly program as a grid (display only) and the history chart. |
| `view_Mill_Handy.json` | Phone: one compact card per device with − / +. |

## Import

1. Replace the placeholders in **all** files before importing (any text editor, "replace all"):
   `mill-local.0.DEVICE_1` … `mill-local.0.DEVICE_4` → your devices, e.g. `mill-local.0.94e686001234`
   (the device object is the folder directly under `mill-local.0`, its name is the MAC address). Fewer devices:
   delete the widgets of the missing ones; more: copy a card and set its device attribute.
2. Open the vis editor (`http://<iobroker>:8082/vis/edit.html`). For each view: tab **Views** → **Import view**,
   paste the content of `view_<Name>.json` and enter the name **exactly** as in the file name (`Mill_Uebersicht`,
   `Mill_Geraet1` …, `Mill_Handy`). The cards and the back link navigate to these names.
3. Save. Open `…/vis/index.html#Mill_Uebersicht` (tablet) or `…#Mill_Handy` (phone).

After installing or updating the adapter, vis rebuilds its widget list when it restarts (the adapter asks for that
restart itself; if the widgets are missing, restart the `vis` instance once).

## History chart

The chart shows the room temperature, the target the device regulates to (step line) and the current power (area,
right axis), and the humidity of Wi-Fi sockets in a small panel below – for the last 24 hours (raw values) or 7 days
(mean per hour). It reads the values that a history adapter has recorded:

- **Data source:** attribute *History instance* of the widget – e.g. `history.0`, `influxdb.0` or `sql.0`; empty =
  the default history instance of the system (*System settings → Default history*).
- **Recording is up to you; the adapter switches none on.** Switch it on per data point in the object tree (gear
  icon of the data point → your history adapter → enabled; "only changes" is enough):

  | Data point | Shown as |
  |---|---|
  | `<device>.sensor.temperature` | room temperature |
  | `<device>.status.activeTargetTemperature` | target (the period running now, empty while off) |
  | `<device>.status.power` | current power |
  | `<device>.sensor.humidity` | humidity (Wi-Fi socket only) |
  | `<device>.control.targetTemperature` | optional, the Normal target (useful for evaluations) |

  Without a recording the chart says which data point is missing.

## What writes, what only displays

- Writing: the − / + buttons (`control.targetTemperature`, 0.5 °C steps, 5 … 35 °C), on/off (`control.power`) and the
  operation mode (`control.operationMode`) – the same states as the device card in the admin, with the same checks.
- The weekly program is shown only; it is edited in the admin on the device card (calendar button).

---

## Deutsch

Fertige Ansichten für **vis 1**, nur mit Datenpunkten aus `mill-local.0` und den Widgets des Adapters (Satz
*mill-local*) – keine Skripte, kein Diagramm-Adapter. Dunkel und hell (jedes Widget folgt standardmäßig der
Browsereinstellung, Attribut *Farbschema*), 1280 × 800 px und 390 px breit fürs Handy. Die Texte kommen aus den
Widgets in der vis-Sprache.

- **Ansichten:** `Mill_Uebersicht` (je Gerät eine Karte, Gesamtleistung, heutige Abschnitte aller Geräte),
  `Mill_Geraet1` … `Mill_Geraet4` (Raumtemperatur mit laufendem Abschnitt, Soll − / +, Werte, Betriebsart,
  Wochenprogramm als Raster zum Ansehen, Verlauf), `Mill_Handy`.
- **Import:** In allen Dateien `mill-local.0.DEVICE_1` … `DEVICE_4` durch die eigenen Geräteobjekte ersetzen (Ordner
  direkt unter `mill-local.0`, Name = MAC-Adresse), dann im vis-Editor unter *Ansichten → Ansicht importieren* jede
  Datei mit genau dem Namen aus dem Dateinamen anlegen.
- **Verlauf:** Raumtemperatur, Soll (Stufenlinie), aktuelle Leistung (Fläche, rechte Achse), bei der Steckdose die
  Luftfeuchte; 24 h (Rohwerte) oder 7 Tage (Mittel je Stunde). Datenquelle im Widget-Attribut *Verlaufs-Instanz*
  (`history.0`, `influxdb.0`, `sql.0` …; leer = Standard-History des Systems). **Die Aufzeichnung schaltet der Anwender
  ein, der Adapter tut es nicht:** im Objektbaum am Zahnrad des Datenpunkts, für `sensor.temperature`,
  `status.activeTargetTemperature`, `status.power`, `sensor.humidity` (Steckdose) und optional
  `control.targetTemperature`.
- **Schreiben** nur Soll − / +, Ein/Aus und Betriebsart. Das Wochenprogramm wird nur angezeigt und im Admin über die
  Gerätekarte bearbeitet.