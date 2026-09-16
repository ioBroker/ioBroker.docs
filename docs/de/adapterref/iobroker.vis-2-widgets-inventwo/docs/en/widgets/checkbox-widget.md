---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md
title: Kontrollkästchen-Widget
hash: OWZVwhhZMj/R43bDEBjQSS3yaZoqWlsV8UqoM7shErU=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/checkbox-widget.md)

# Kontrollkästchen-Widget

Das Kontrollkästchen-Widget zeigt ein Standard-Kontrollkästchen an, das einen Datenpunkt zwischen zwei Werten umschaltet. Wie beim Schalter-Widget definieren Sie, was „aktiviert“ und „deaktiviert“ bedeuten – es funktioniert also mit booleschen Werten, Zahlen oder jedem anderen Wertepaar.

![Kontrollkästchen-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-checkbox.png)

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **Checkbox** aus der Liste der **Inventwo Design-** Widgets in Ihre Ansicht.
2. Klicken Sie in der Seitenleiste **auf Objekt-ID** und wählen Sie Ihren Datenpunkt aus.
3. Setze **den Wert auf „true“** (aktivierter Zustand) und **auf „false“** (deaktivierter Zustand).
4. Optional können Sie im **Feld „Text false** / **Text true“** eine Bezeichnung eingeben und deren Position auswählen.

---

## Einstellungen

### Gemeinsam

| Einstellung      | Was es tut                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**    | Der Datenpunkt, aus dem diese Checkbox liest und in den sie schreibt.                                                                     |
| **Wert wahr**    | Wird in den Datenpunkt geschrieben, wenn das Kontrollkästchen aktiviert ist. Leer lassen, um es zu verwenden`true` Die                    |
| **Wert falsch**  | Wird in den Datenpunkt geschrieben, wenn das Kontrollkästchen deaktiviert ist. Leer lassen, um es zu verwenden.`false` Die                |
| **Text falsch**  | Diese Beschriftung wird angezeigt, wenn das Kontrollkästchen deaktiviert ist. Lassen Sie das Feld leer, um keine Beschriftung anzuzeigen. |
| **Text wahr**    | Die Beschriftung wird angezeigt, wenn das Kontrollkästchen aktiviert ist. Lassen Sie das Feld leer, um keine Beschriftung anzuzeigen.     |
| **Textposition** | Wo die Bezeichnung erscheint: **Ende** (rechts, Standard), **Start** (links), **Oben** oder **Unten** .                                   |

---

### inventwo — Stil

| Einstellung             | Was es tut                                                                        |
| ----------------------- | --------------------------------------------------------------------------------- |
| **Vom Widget**          | Kopieren Sie alle Stileinstellungen von einem anderen Kontrollkästchen-Widget.    |
| **Farbe der Schachtel** | Farbe des Rahmens und des Symbols des Kontrollkästchens im deaktivierten Zustand. |
| **Boxfarbe aktiv**      | Farbe des Kontrollkästchens im aktivierten Zustand (Füllung und Symbol).          |
| **Kartongröße**         | Größe des Kontrollkästchens in Pixeln (0–50). Standardwert: 24 px.                |

---

## Tipps

- **Einheitliches Design:** Verwenden Sie **das „Von“-Widget** , um die Farb- und Größeneinstellungen eines Master-Checkbox-Widgets zu kopieren, damit alle Checkboxen auf Ihrem Dashboard gleich aussehen.
- **Schriftart und Textfarbe:** Schriftart, Größe und Farbe der Beschriftung stammen aus den Standard-CSS-Einstellungen des VIS-Widgets, nicht aus den inventwo-Einstellungen.

---

## Siehe auch

- [Schalter-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) – ähnliches Verhalten mit einem Kippschalter-Erscheinungsbild
- [Universelles Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) – vollständig anpassbare Kachel mit demselben Umschaltverhalten sowie Symbolen und Formen