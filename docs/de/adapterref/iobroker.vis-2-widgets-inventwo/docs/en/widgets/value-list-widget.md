---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md
title: Wertelisten-Widget
hash: R/DvO8pEaemEoOBSxe3Qhgi84kSeHHhjX+bMvy7zV5o=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/value-list-widget.md)

# Wertelisten-Widget

Das Wertelisten-Widget nimmt einen Textwert – entweder aus einem Datenpunkt oder manuell eingegeben –, zerlegt ihn in einzelne Elemente und zeigt diese als formatierte Aufzählung an. Dies ist nützlich, um durch Kommas oder Zeilenumbrüche getrennte Werte übersichtlich darzustellen.

**Beispiel:** Ein Datenpunkt, der Folgendes enthält`"Living Room, Kitchen, Bedroom"` wird als dreiteilige Stichpunktliste angezeigt.

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **die Werteliste** aus der Liste der **inventwo design-** Widgets in Ihre Ansicht.
2. Entweder wählen Sie eine **Objekt-ID** aus, deren Wert die Listenelemente enthält, oder Sie geben den Text direkt in **das Feld „Text (manuell)“** ein.
3. Stellen Sie das **Trennzeichen** so ein, dass es der Trennweise Ihrer Elemente entspricht (z. B.`,` für durch Kommas getrennte Werte,`\n` (für Zeilenumbrüche).
4. Wählen Sie im Menüpunkt **„Darstellung** “ einen Aufzählungszeichenstil aus.

---

## Einstellungen

### Gemeinsam

| Einstellung                   | Was es tut                                                                                                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**                 | Wenn diese Einstellung vorgenommen wurde, stammen die Listenelemente aus dem aktuellen Wert dieses Datenpunkts. Das manuelle Textfeld wird ausgeblendet, sobald eine OID ausgewählt ist. |
| **Text (Handbuch)**           | Text, der in Listenelemente aufgeteilt wird. Nur sichtbar, wenn keine Objekt-ID festgelegt ist.                                                                                          |
| **Separator**                 | Das Zeichen oder die Zeichenkette, die zum Aufteilen des Textes in Elemente verwendet wird. Standardwert:`,` . Verwenden`\n` für Zeilenumbrüche`\t` für Tabs.                            |
| **Leerzeichen entfernen**     | Wenn diese Option aktiviert ist, werden führende und nachfolgende Leerzeichen aus jedem Element entfernt. Empfohlen bei kommagetrennten Werten mit Leerzeichen nach dem Komma.           |
| **Leere Einträge ignorieren** | Wenn diese Option aktiviert ist, werden Elemente, die nach dem Aufteilen (und optionalen Kürzen) leer sind, nicht angezeigt.                                                             |

---

### Aussehen

| Einstellung                                           | Was es tut                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Kugeltyp**                                          | Das Symbol, das vor jedem Element angezeigt wird. Optionen: **Scheibe** (•), **Kreis** (○), **Quadrat** (▪), **Strich** (–), **Pfeil** (›), **Nummeriert** (1, 2, 3), **Keine** (kein Aufzählungspunkt), **Benutzerdefiniert** (eigenes Symbol). |
| **Benutzerdefinierter Charakter**                     | Wird nur angezeigt, wenn **der Aufzählungstyp** auf **„Benutzerdefiniert“** eingestellt ist. Geben Sie ein beliebiges Zeichen oder Emoji ein.                                                                                                    |
| **Kugelfarbe**                                        | Farbe des Aufzählungszeichens. Wird ausgeblendet, wenn der Aufzählungszeichentyp **auf „Keine“ eingestellt** ist.                                                                                                                                |
| **Abstand zwischen Aufzählungszeichen und Text (px)** | Horizontaler Abstand zwischen Aufzählungszeichen und Elementtext. Ausgeblendet, wenn der Aufzählungszeichentyp **auf „Keine“** eingestellt ist.                                                                                                  |
| **Zeilenabstand (px)**                                | Vertikaler Abstand zwischen den Listenelementen.                                                                                                                                                                                                 |
| **Polsterung**                                        | Innerer Abstand um die gesamte Liste in Pixeln.                                                                                                                                                                                                  |

---

## Tipps

- **Durch Zeilenumbrüche getrennte Werte:** Trennzeichen festlegen auf`\n` Eine mehrzeilige Zeichenkette in einzelne Listenelemente aufteilen.
- **Schriftgestaltung:** Schriftart, -größe, -stärke und -farbe des Listentextes werden über die Standard-CSS-Einstellungen des VIS-Widgets festgelegt, nicht über die inventwo-Einstellungen.
- **Dynamische Listen:** Verbinden Sie das Widget mit einem String-Datenpunkt, der von einem Skript oder Adapter aktualisiert wird. Jedes Mal, wenn sich der Wert ändert, wird die Liste automatisch neu gerendert.

---

## Siehe auch

- [Laufschrift-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md) – zeigt einen einzelnen scrollenden Text anstelle einer Liste an
- [Tabellen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) – für strukturierte Tabellendaten aus einem JSON-Array