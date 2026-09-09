---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md
title: Schalter-Widget
hash: t6H41ltUIKj4xB/N8xtIdb0PS74sr2ismG0y9cE3dlg=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/switch-widget.md)

# Schalter-Widget

Das Switch-Widget zeigt einen klassischen Kippschalter an, der einen Datenpunkt ein- oder ausschaltet. Sie definieren, welcher Wert als „ein“ und welcher als „aus“ gilt – es funktioniert also mit booleschen Datenpunkten (`true` /`false` sowie numerische (`0` /`1` oder ein beliebiges anderes Wertepaar.

![Schalter-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-switch.png)

---

## So fügen Sie das Widget hinzu

1. Öffnen Sie den VIS 2-Editor und wechseln Sie zu Ihrer Ansicht.
2. Suchen Sie in der Widget-Liste auf der linken Seite nach **„inventwo design“** und ziehen Sie **„Switch“** auf die Arbeitsfläche.
3. Klicken Sie in der Seitenleiste rechts auf **Objekt-ID** und wählen Sie den Datenpunkt aus, den Sie steuern möchten.
4. Setzen Sie **die Werte „true“** und **„false“** so, dass sie den Werten Ihres Datenpunkts entsprechen.
5. Wechseln Sie zur Laufzeitansicht, um das Widget zu testen.

---

## Einstellungen

### Gemeinsam

| Einstellung      | Was es tut                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Objekt-ID**    | Der Datenpunkt, von dem dieser Switch liest und in den er schreibt.                                                                              |
| **Wert wahr**    | Der Wert, der beim Einschalten des Schalters geschrieben wird. Leer lassen, um ihn zu verwenden.`true` Die                                       |
| **Wert falsch**  | Der Wert, der beim Ausschalten des Schalters geschrieben wird. Leer lassen, um ihn zu verwenden.`false` Die                                      |
| **Text falsch**  | Beschriftung neben dem Schalter im ausgeschalteten Zustand. Für keine Beschriftung leer lassen.                                                  |
| **Text wahr**    | Die Beschriftung befindet sich neben dem Schalter, wenn dieser eingeschaltet ist. Für eine Beschriftung leer lassen.                             |
| **Textposition** | Die Beschriftung befindet sich relativ zum Schalter: **Ende** (rechts), **Start** (links), **Oben** oder **Unten** . Standardwert ist **Ende** . |

---

### inventwo — Track

Die Schiene bildet den länglichen Hintergrund der Weiche.

| Einstellung                    | Was es tut                                                                                                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**                 | Kopieren Sie alle Spureinstellungen von einem anderen Switch-Widget. Dies ist nützlich, um mehrere Schalter optisch einheitlich zu gestalten.                                                              |
| **Spurfarbe**                  | Die Farbe der Schiene wird angezeigt, wenn der Schalter ausgeschaltet ist.                                                                                                                                 |
| **Spurfarbe wahr**             | Die Farbe der Schiene ist farbig, wenn der Schalter eingeschaltet ist.                                                                                                                                     |
| **Spurbreite**                 | Höhe der Spur in Pixeln (1–50).                                                                                                                                                                            |
| **Radius der Gleisbegrenzung** | Wie rund die Enden der Schiene sind (1–100 %). Bei 100 % ist die Schiene vollständig abgerundet (pillenförmig).                                                                                            |
| **Schatten verfolgen**         | Schlagschatten unterhalb der Schiene. X- und Y-Versatz, Unschärfe, Größe und Farbe einstellen. **Die Schattenfarbe „true“** entspricht der Farbe, die verwendet wird, wenn der Schalter eingeschaltet ist. |

---

### erfinden — Daumen

Der Daumen ist der runde Griff, der hin und her gleitet.

| Einstellung          | Was es tut                                                                       |
| -------------------- | -------------------------------------------------------------------------------- |
| **Vom Widget**       | Kopieren Sie alle Daumeneinstellungen von einem anderen Switch-Widget.           |
| **Daumenfarbe**      | Daumenfarbe im ausgeschalteten Zustand.                                          |
| **Daumenfarbe wahr** | Daumenfarbe, wenn der Schalter eingeschaltet ist.                                |
| **Daumengröße**      | Durchmesser des Daumens in Pixeln. Sollte etwas größer als die Spurbreite sein.  |
| **Daumenrandradius** | Wie rund der Daumen ist (1–100 %). Bei 100 % ist der Daumen ein perfekter Kreis. |
| **Daumenschatten**   | Schlagschatten auf dem Daumen. Gleiche Einstellungen wie für den Spurschatten.   |

---

## Tipps

- **Benutzerdefinierte Werte:** Wenn Ihr Gerät verwendet`"on"` /`"off"` Zeichenketten anstelle von`true` /`false` Geben Sie diese Werte einfach in die Felder **„Wert wahr“** und **„Wert falsch“** ein.
- **Stilwiederverwendung:** Erstellen Sie ein "Vorlagen"-Schalter-Widget, gestalten Sie es genau nach Ihren Wünschen und verwenden Sie dann **das "Von"-Widget** in allen anderen Schalter-Widgets, um diese Einstellungen zu kopieren – das spart eine Menge Zeit.
- **Schriftgestaltung:** Textfarbe, -größe und Schriftart der Beschriftung werden über die Standard-VIS-Widget-Stileinstellungen (CSS-Registerkarte in der Seitenleiste) gesteuert, nicht über die inventwo-Einstellungen.

---

## Siehe auch

- [Kontrollkästchen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) – ähnliches Verhalten, wird jedoch als Kontrollkästchen anstelle eines Schalters angezeigt.
- [Universelles Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) – vollständig anpassbare Kachel mit demselben Umschaltverhalten sowie Symbolen und Formen