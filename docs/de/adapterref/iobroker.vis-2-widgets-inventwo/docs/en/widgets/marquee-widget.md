---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md
title: Laufschrift-Widget
hash: oPypNIgUiiOuIGOtE1VOwenpVbJWqfexrU7yVtgqbmM=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/marquee-widget.md)

# Laufschrift-Widget

Das Lauftext-Widget zeigt einen Text an, der kontinuierlich über den Widget-Bereich scrollt – ähnlich einem klassischen Ticker oder Nachrichtenbanner. Der Text kann aus einem ioBroker-Datenpunkt stammen (z. B. eine Statusmeldung, ein Sensorwert oder eine Benachrichtigung) oder manuell eingegeben werden.

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **Marquee** aus der Liste der **inventwo design** Widgets in Ihre Ansicht.
2. Passen Sie die Breite des Scrollbereichs des Widgets an die gewünschte Breite an.
3. Entweder wählen Sie eine **Objekt-ID** aus oder geben den Text direkt in das **Feld „Laufender Text (statisch)“** ein.
4. Passen Sie Geschwindigkeit und Richtung Ihren Wünschen an.

---

## Einstellungen

### Gemeinsam

| Einstellung                          | Was es tut                                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**                        | Wenn diese Einstellung vorgenommen wurde, zeigt der Lauftext den aktuellen Wert dieses Datenpunkts an. Das manuelle Textfeld wird ausgeblendet, sobald eine OID ausgewählt ist.                                                 |
| **Lauftext (statisch)**              | Manueller Text zum Scrollen. Nur sichtbar, wenn keine Objekt-ID festgelegt ist.                                                                                                                                                 |
| **Richtung**                         | Scrollrichtung: **Links** (von rechts nach links, Standard) oder **Rechts** (von links nach rechts).                                                                                                                            |
| **Geschwindigkeit (px/s)**           | Die Scrollgeschwindigkeit des Textes in Pixeln pro Sekunde. Bereich: 10–500. Standardwert: 80. Höhere Werte bedeuten höhere Geschwindigkeit. Die Geschwindigkeit ist unabhängig von der Anzahl der angezeigten Kopien konstant. |
| **Textkopien**                       | Wie oft der Text in der Animationsschleife nebeneinander wiederholt wird. Standardwert: 3. Erhöhen Sie diesen Wert, falls bei kurzem Text beim Scrollen sichtbare Lücken entstehen.                                             |
| **Abstand zwischen den Kopien (px)** | Abstand in Pixeln zwischen zwei Textkopien. Standardwert: 50.                                                                                                                                                                   |
| **Pause beim Überfahren**            | Wenn diese Funktion aktiviert ist, wird die Scrollanimation angehalten, sobald sich der Mauszeiger über dem Widget befindet.                                                                                                    |
| **Hintergrund**                      | Optionale Hintergrundfarbe für den Widget-Bereich.                                                                                                                                                                              |

---

## Textdarstellung

Schriftart, Schriftgröße, Textfarbe, Schriftstärke und Buchstabenabstand werden alle über die Standard-CSS-Einstellungen des VIS-Widgets (die Registerkarte **CSS** oder der Abschnitt **Schriftart** in der Seitenleiste) festgelegt – nicht über das inventwo-Einstellungsfeld.

---

## Tipps

- **Vermeiden Sie Lücken:** Wenn Ihr Text kurz ist und Sie eine Lücke zwischen dem Ende eines Durchgangs und dem Beginn des nächsten feststellen, erhöhen Sie **die Anzahl der Textkopien,** bis die Lücke verschwindet.
- **Live-Daten:** Verbinden Sie die **Objekt-ID** mit einem String-Datenpunkt (z. B. einem Adapter, der Nachrichtenüberschriften, Aktienkurse oder Wetterzusammenfassungen schreibt), um einen vollständig in Echtzeit aktualisierten Ticker zu erhalten.
- **Geschwindigkeit vs. Lesbarkeit:** Für Texte, die angenehm gelesen werden sollen, sollte die Geschwindigkeit unter 100 px/s bleiben. Für einen rein visuellen Effekt eignen sich höhere Geschwindigkeiten gut.

---

## Siehe auch

- [Wertelisten-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md) – zeigt eine Liste anstelle von scrollendem Text an
- [Universelles Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) – für statischen Text innerhalb einer gestalteten Kachel