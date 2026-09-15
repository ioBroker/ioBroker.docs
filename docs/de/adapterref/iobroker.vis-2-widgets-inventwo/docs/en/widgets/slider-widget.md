---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md
title: Schieberegler-Widget
hash: IiVIZZ0AljbDnU08K1d9cZN7wP/dEzDj02Lv61m8oCo=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/slider-widget.md)

# Schieberegler-Widget

Mit dem Schieberegler-Widget können Benutzer einen numerischen Wert einstellen, indem sie einen Griff entlang einer Schiene ziehen. Es funktioniert horizontal oder vertikal und eignet sich ideal zur Steuerung von Dimmern, Thermostaten, Jalousien, Lautstärke oder anderen numerischen Datenpunkten.

![Schieberegler-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-slider.png)

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **den Schieberegler** aus der Liste der **Inventwo Design-** Widgets in Ihre Ansicht.
2. Klicken Sie auf **Objekt-ID** und wählen Sie den numerischen Datenpunkt aus, den Sie steuern möchten.
3. Die Minimal-, Maximal- und Schrittwerte werden automatisch aus der Objektdefinition übernommen – passen Sie sie bei Bedarf an.
4. Wählen Sie **die Ausrichtung** (horizontal oder vertikal).
5. Gestalten Sie die Spur und den Daumen in den Gruppen **inventwo - Slider track** und **inventwo - Slider thumb** .

---

## Einstellungen

### Gemeinsam

| Einstellung                | Was es tut                                                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Titel**                  | Optionale Überschrift über dem Schieberegler. Verwenden Sie diese, um zu beschriften, was der Schieberegler steuert, z. B.`Charging current` oder`Charge limit` Die         |
| **Einheit**                | Optional kann eine Einheit an alle angezeigten Werte angehängt werden – die Min-/Max-Beschriftungen, die Schrittmarkierungen und der Wert-Tooltip. Beispiel:`A` oder`%` Die |
| **Objekt-ID**              | Der zu lesende und zu schreibende Datenpunkt. Bei Auswahl werden **Minimalwert** , **Maximalwert** und **Schrittweite** automatisch aus der Objektdefinition übernommen.    |
| **Minimalwert**            | Der niedrigste Wert, den der Schieberegler einstellen kann. Standardwert: 0.                                                                                                |
| **Maximalwert**            | Der höchste Wert, den der Schieberegler einstellen kann. Standardwert: 100.                                                                                                 |
| **Schritt**                | Wie stark sich der Wert pro Schritt ändert. Standardwert: 1.                                                                                                                |
| **Orientierung**           | **Horizontal** (links/rechts, Standard) oder **Vertikal** (oben/unten).                                                                                                     |
| **Min. und Max. anzeigen** | Zeigt die Minimal- und Maximalwerte als Beschriftungen an beiden Enden des Schiebereglers an.                                                                               |
| **Nur lesen**              | Wenn diese Option aktiviert ist, zeigt der Schieberegler den aktuellen Wert an, kann aber nicht verschoben werden. Nützlich für schreibgeschützte Messgeräte.               |

#### Wertlabel

| Einstellung          | Was es tut                                                                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Wertlabelanzeige** | Wenn der aktuelle Wert über dem Schieberegler angezeigt wird: **Beim Ziehen (Standard)** – nur während des Ziehens; **Immer** – dauerhaft sichtbar; **Nie** – wird nie angezeigt. |

#### Stufenmarkierungen

| Einstellung                                   | Was es tut                                                                                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Schritte anzeigen**                         | Zeigt Markierungen entlang der Schiebeschiene an.                                                                                                                                |
| **Stufen im Schieber**                        | Platziert Markierungen innerhalb der Schiene anstatt darunter/neben ihr.                                                                                                         |
| **Schrittmarkierungen oben / links anzeigen** | _(Nur wenn sich die Stufen nicht im Inneren befinden)_ Positionieren Sie die Markierungen oberhalb der Schiene (horizontal) oder links davon (vertikal) anstatt darunter/rechts. |
| **Schrittmodus**                              | **Automatisch** : Markierungen werden in einem von Ihnen festgelegten regelmäßigen Abstand gesetzt. **Benutzerdefiniert** : Sie geben die genauen Positionen manuell ein.        |
| **Schrittanzeige**                            | _(Nur im Automatikmodus)_ Der Abstand zwischen den Markierungen. Beispiel: Bei Min=0, Max=100 und Schrittanzeige=25 erscheinen Markierungen bei 0, 25, 50, 75 und 100.           |
| **Benutzerdefinierte Schritte**               | _(Nur im benutzerdefinierten Modus)_ Durch Kommas getrennte Werte für Markierungspositionen, z. B.`0,20,50,80,100` Die                                                           |

---

### inventwo — Schieberegler

Diese Gruppe steuert das Erscheinungsbild der Schiene (die Schiene, auf der der Daumen gleitet).

| Einstellung                        | Was es tut                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**                     | Kopiere alle Track-Einstellungen von einem anderen Slider-Widget.                                                                                                                                                                                                   |
| **Farbe der Schiebeschiene**       | Farbe des inaktiven Teils der Schiene (der Teil hinter dem Daumen).                                                                                                                                                                                                 |
| **Aktive Farbe der Schiebeleiste** | Farbe des aktiven Teils der Schiene (der Teil zwischen Min und Daumen).                                                                                                                                                                                             |
| **Spurstangentyp**                 | **Normal** : Die aktive Füllung befindet sich auf der Seite mit den niedrigen Werten (Standard). **Invertiert** : Die aktive Füllung befindet sich auf der Seite mit den hohen Werten (nützlich für Jalousien). **Keine** : Es wird keine aktive Füllung angezeigt. |
| **Spurbreite**                     | Schienenstärke in Pixel (1–50). Standardwert: 10.                                                                                                                                                                                                                   |
| **Radius der Gleisbegrenzung**     | Rundet die Enden der Schiene ab (1–100). Standardwert: 100 (vollständig abgerundet).                                                                                                                                                                                |
| **Schatten verfolgen**             | Schlagschatten für die Schiene. X-Versatz, Y-Versatz, Unschärfe, Größe und Farbe festlegen.                                                                                                                                                                         |

---

### inventwo — Schieber-Daumen

Diese Gruppe steuert den Griff, den der Benutzer zieht.

| Einstellung                  | Was es tut                                                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**               | Kopieren Sie alle Daumeneinstellungen von einem anderen Slider-Widget.                                                                    |
| **Farbe des Schiebereglers** | Füllen Sie die Farbe des Daumens aus.                                                                                                     |
| **Daumengröße**              | Durchmesser des Daumens in Pixeln (0–50). Auf 0 setzen, um den Daumen vollständig auszublenden (z. B. für eine schreibgeschützte Leiste). |
| **Daumenrandradius**         | Wie rund der Daumen ist (1–100 %). Bei 100 % ist er ein perfekter Kreis.                                                                  |
| **Daumenschatten**           | Schlagschatten für den Daumen. Gleiche Einstellungen wie für den Spurschatten.                                                            |

---

## Tipps

- **Schieberegler für Vertikaljalousien:** **Ausrichtung: Vertikal** und **Schienentyp: Invertiert,** sodass der gefüllte Bereich anzeigt, wie weit die Jalousie geschlossen ist (oben = geschlossen, unten = geöffnet).
- **Schreibgeschützte Fortschrittsanzeige:** Aktivieren Sie **„Schreibgeschützt“** und setzen Sie **ThumbSize** auf 0, um eine übersichtliche Fortschrittsanzeige ohne verschiebbaren Griff anzuzeigen.
- **Stilwiederverwendung:** Gestalten Sie einen Schieberegler genau so, wie Sie es möchten, und verwenden Sie dann **das „Von“-Widget** in allen anderen, um diese Einstellungen zu kopieren.

---

## Siehe auch

- [Radialer Schieberegler](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md) – das gleiche Steuerelement, das als kreisförmiger Drehregler angezeigt wird.