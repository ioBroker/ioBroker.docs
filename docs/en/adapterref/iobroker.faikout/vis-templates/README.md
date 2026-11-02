---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
---
# vis templates for ioBroker.faikout

Ready-made views for **vis 1** (`iobroker.vis` 1.x) for two air conditioners. They use only data points of
`faikout.0` and the adapter's own VIS widgets (set *faikout*), so they work on any installation of this
adapter: no scripts, no other adapters, no chart adapter. Dark design, 1280 × 800 px for tablets and
desktops plus a 412 px wide view for phones. Labels are in German (a German summary follows below).

| File | Content |
|---|---|
| `view_Faikout_Uebersicht.json` | Start page: one card per unit – room and set temperature, mode (colour follows the mode), fan, louvres, preset, outside temperature, humidity, power, compressor, fan speed, refrigerant, energy today (heating/cooling), yesterday, this/last month, meter readings, connection. Tapping a card opens its detail page. |
| `view_Faikout_Geraet1.json` / `view_Faikout_Geraet2.json` | Detail page per unit: set point arc with − / + and on/off, mode, fan speed, extra functions (swing, econo, powerful, comfort, streamer – whatever the unit has), all temperatures, operation now, energy table, connection. |
| `view_Faikout_Energie.json` | Energy: bar chart per unit (last 24 hours / 31 days / 12 months, heating and cooling separately) and a table hour/day/month. |
| `view_Faikout_Handy.json` | Phone: compact card plus controls for both units, one below the other (412 × 2338 px, scrolls). |

## Requirements

- `iobroker.faikout` **0.0.18 or newer** – the widgets of earlier versions did not render in the vis runtime
  (they showed nothing and logged `missing ) after argument list`).
- After installing or updating the adapter, vis must rebuild its widget list: restart the `vis` instance once.

## Import

1. Replace the placeholders in **all** files before importing (any text editor, "replace all"):
   - `faikout.0.DEVICE_1` → your first unit, e.g. `faikout.0.Living_room`
   - `faikout.0.DEVICE_2` → your second unit
   - optional: the display names `Gerät 1` / `Gerät 2`

   The device object is the folder directly under `faikout.0` (the module's host name with `_` instead of
   spaces). Different instance? Use e.g. `faikout.1.` instead.
2. Open the vis editor (`http://<iobroker>:8082/vis/edit.html`). For each view: tab **Views** → **Import view**,
   paste the content of `view_<Name>.json` and enter the name **exactly** as in the file name
   (`Faikout_Uebersicht`, `Faikout_Geraet1`, `Faikout_Geraet2`, `Faikout_Energie`, `Faikout_Handy`).
   The navigation buttons link to these names (`#Faikout_Geraet1` …).
3. Save. Open `…/vis/index.html#Faikout_Uebersicht` (tablet) or `…#Faikout_Handy` (phone).

Only one unit? Import `Faikout_Geraet1` and `Faikout_Energie`, delete the second card in the overview
and the second block in the phone view.

## What writes, what only displays

- Display cards are HTML widgets with vis bindings – they never write.
- Writing is done only by the adapter's widgets (arc − / +, on/off switch, mode, fan speed, extra
  functions). They write to `faikout.0.<unit>.control.*`, i.e. only to data points the adapter creates as
  writable, and only those the unit actually reports. The unit confirms within about a second.
- The views contain no other controls.

## Units and missing values

- Compressor (`status.comp`) and fan (`status.fanfreq`) are shown in **Hz** – the module's default. If your
  module reports rpm (settings `ha.comprpm` / `ha.fanrpm`), replace every `Hz` in the files by `rpm` – the
  text occurs only after these two values (the adapter's own widgets take the unit from the object automatically).
- A value the unit does not report (e.g. humidity on many models) shows `–`.
- Energy values come from the adapter's consumption branch (`consumption.<total|heating|cooling>.*`);
  they appear after the module has sent its energy counters at least once.

## Notes for editing

- vis 1 treats every `{…}` on one line as a binding. The formulas in these templates therefore contain no
  `;`, `{` or `}`. Keep it that way if you edit them.
- The views were generated with `werkzeuge/vis_vorlagen.py` in this repository.

---

## Deutsch

Fertige Ansichten für **vis 1** für zwei Klimaanlagen, nur mit Datenpunkten aus `faikout.0` und den
Widgets des Adapters – keine Skripte, keine weiteren Adapter. Dunkles Design, 1280 × 800 px (Tablet) und
412 px breit (Handy).

- **Ansichten:** `Faikout_Uebersicht` (Start, je Anlage eine Karte), `Faikout_Geraet1`/`Faikout_Geraet2`
  (Bedienung und alle Werte), `Faikout_Energie` (Säulen 24 h / 31 Tage / 12 Monate, Tabelle),
  `Faikout_Handy` (beide Anlagen untereinander).
- **Voraussetzung:** `iobroker.faikout` ab **0.0.18** (vorher zeichnete die vis-Laufzeit die Widgets nicht);
  nach dem Adapter-Update die vis-Instanz einmal neu starten.
- **Import:** In allen Dateien `faikout.0.DEVICE_1` und `faikout.0.DEVICE_2` durch die eigenen
  Geräteobjekte ersetzen (optional die Namen `Gerät 1`/`Gerät 2`), dann im vis-Editor unter
  *Ansichten → Ansicht importieren* jede Datei mit genau dem Namen aus dem Dateinamen anlegen.
- **Schreiben** tun nur die Adapter-Widgets (Bogen − / +, Ein/Aus, Betriebsart, Lüfter, Zusatzfunktionen) –
  ausschließlich auf die beschreibbaren Datenpunkte `control.*`. Die Karten zeigen nur an.
- **Einheiten:** Verdichter und Lüfter stehen in Hz (Werkseinstellung des Moduls). Meldet das Modul rpm,
  in den Dateien jedes `Hz` durch `rpm` ersetzen (kommt nur bei diesen beiden Werten vor). Fehlende Werte zeigen `–`.