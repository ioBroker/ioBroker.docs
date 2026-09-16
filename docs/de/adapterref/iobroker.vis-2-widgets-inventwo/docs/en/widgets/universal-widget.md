---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md
title: Universelles Widget
hash: 0F5AOPjyup2zTwyNk3SRgRxII4MKg92xPsKDQlrAhWU=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/universal-widget.md)

# Universelles Widget

Das Universal-Widget ist das vielseitigste Widget im inventwo-Set. Es vereint **Interaktionsverhalten** , **visuelle Inhalte** und **zustandsbasiertes Styling** in einer einzigen Kachel. Verwenden Sie es, wenn Sie eine einheitliche Kachel benötigen, die auf Ihre Datenpunkte reagiert – indem sie je nach Wert Symbol, Farbe, Text oder Form ändert.

![Universelles Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-universal.png)

**Typische Anwendungsgebiete:**

- Lichtschalter-Kachel, die Symbol und Farbe ändert, wenn sie eingeschaltet wird
- Raumnavigationsschaltflächen, die die aktuell aktive Ansicht hervorheben
- Schaltfläche, die eine Detailansicht in einem Dialog-Overlay öffnet
- Schreibgeschützte Statuskachel, die den Gerätestatus mit benutzerdefinierten Symbolen anzeigt.
- RGB-Farbauswahl in eine Kachel eingebettet
- Analoge Uhrkachel auf Ihrem Armaturenbrett
- Plus-/Minus-Schritttasten

---

## Schnellstart

1. Ziehen Sie **Universal (Switch, Button, Nav, Image & more)** aus der **inventwo design** widget list in Ihre Ansicht.
2. Wählen Sie einen **Typ** – dies ist die wichtigste Einstellung und definiert, was passiert, wenn Sie auf die Kachel klicken. Siehe [Interaktionstypen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md) .
3. Klicken Sie auf **Objekt-ID** und wählen Sie den Datenpunkt aus (falls Ihr Typ einen Wert liest oder schreibt).
4. Wählen Sie einen **Inhaltstyp** , um festzulegen, was in der Kachel angezeigt wird (Symbol, Bild, Text, eingebettete Ansicht usw.). Siehe [Inhaltstypen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md) .
5. Konfigurieren Sie den Standardzustand in der Gruppe **„Standardzustand“** – Hintergrund, Farben, Text, Symbol.
6. Fügen Sie weitere Zustände in den **Zustandsgruppen** hinzu, um das Aussehen der Kachel abhängig vom Datenpunktwert zu ändern.
7. Gestalten Sie die Kachel (Form, Rahmen, Schatten usw.) in den inventwo Stilgruppen. Siehe [Gestaltung und Formen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md) .

---

## Schlüsselkonzepte

### Typ (Interaktionsverhalten)

Was passiert beim Klicken auf die Kachel? Optionen: Schalter, Schaltfläche, Navigation, Schreibgeschützt, Im Dialogfeld anzeigen, Wert erhöhen/verringern, HTTP-Anfrage senden. → [Ausführliche Erklärung](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md)

### Modus

- **Einzelschaltfläche** : Eine Kachel, die jeweils einen einzelnen Zustand anzeigt.
- **Getrennte Schaltflächen** : Jeder Zustand hat eine eigene, anklickbare Schaltfläche, die nebeneinander angeordnet sind. Nützlich für Mehrfachauswahlfelder (wie das alte Optionsfeld-Widget).

### Staaten

Das Universal-Widget unterstützt mehrere visuelle Zustände. Jeder Zustand wird ausgelöst, wenn der Datenpunktwert einer von Ihnen definierten Bedingung entspricht. Beispiel: Zustand 1 = Symbol einer leuchtenden Glühbirne, wenn der Wert …`true` Zustand 2 = Symbol einer dunklen Glühbirne, wenn der Wert`false` Die

Der **Standardzustand** (Zustand 1) wird immer angezeigt, wenn keine andere Zustandsbedingung zutrifft oder wenn keine OID gebunden ist.

### Inhaltstyp

Was wird in der Kachel dargestellt? Optionen: Symbol, Bild, Text/HTML, Widget-Ansicht, Farbauswahl, Analoguhr. → [Ausführliche Erklärung](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md)

### Vom Widget (Stilwiederverwendung)

Die meisten Stilgruppen verfügen über ein Feld **„Von Widget“** . Wählen Sie ein anderes universelles Widget aus, und alle Einstellungen dieser Gruppe werden übernommen. So sorgen Sie für ein einheitliches Erscheinungsbild vieler Kacheln, ohne jede einzeln konfigurieren zu müssen.

---

## Detailseiten

- [Interaktionstypen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/interaction-types.md) – Schalter, Schaltfläche, Navigation, Dialog, HTTP und mehr
- [Inhaltstypen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/content-types.md) – Symbol, Bild, HTML, Widget-Ansicht, Farbauswahl, Analoguhr
- [Styling und Formen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/universal/styling-and-shapes.md) – Alle Stilgruppen, Formen, Klick-Feedback

---

## Siehe auch

- [Schalter-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md) – einfacherer Ein-/Ausschalter
- [Kontrollkästchen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md) – einfachere Kontrollkästchensteuerung
- [Dropdown-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md) – zur Auswahl aus einer Liste von Bundesstaaten