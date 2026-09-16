---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md
title: Radial-Slider-Widget
hash: dIaWOql8Jl2wkycPmgfKXjmRuBh6rTMXelpw7/7jNbY=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/radial-slider-widget.md)

# Radial-Slider-Widget

Das Radial-Slider-Widget ist ein kreisförmiger Drehregler für numerische Datenpunkte. Es funktioniert wie das reguläre Slider-Widget, nur dass der Benutzer ihn auf einer kreisförmigen Schiene anstatt entlang einer geraden Linie bewegt. Es eignet sich perfekt für Thermostat-Kacheln, Lautstärkeregler oder jedes Bedienelement, bei dem ein runder Drehregler zum Design passt.

![Radial-Slider-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-radial-slider.png)

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **den Radial Slider** aus der **inventwo design** Widget-Liste in Ihre Ansicht.
2. Ändern Sie die Größe des Widgets – es wird als Quadrat dargestellt; die Größe des Widgets bestimmt die Größe des Zifferblatts.
3. Klicken Sie auf **Objekt-ID** und wählen Sie Ihren numerischen Datenpunkt aus. Minimum, Maximum und Schrittweite werden automatisch aus der Objektdefinition ausgefüllt.
4. Passen Sie **Start-** und **Endwinkel** an, um die Bogenform zu definieren.
5. Gestalten Sie die Schiene und den Daumen in den Gruppen **inventwo - Radial track** und **inventwo - Radial thumb** .

---

## Einstellungen

### Gemeinsam

| Einstellung        | Was es tut                                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**      | Der zu lesende und zu schreibende Datenpunkt. Minimum, Maximum und Schrittweite werden beim Auswählen einer OID automatisch aus der Objektdefinition übernommen.                 |
| **Minimalwert**    | Der Wert am Anfang des Bogens. Standardwert: 0.                                                                                                                                  |
| **Maximalwert**    | Der Wert am Ende des Bogens. Standardwert: 100.                                                                                                                                  |
| **Schritt**        | Wie stark sich der Wert pro Schritt ändert. Standardwert: 1.                                                                                                                     |
| **Startwinkel**    | Der Winkel (0–360°), an dem der Bogen beginnt. 0° befindet sich oben, die Winkel nehmen im Uhrzeigersinn zu. Standardwert: 225 (unten links).                                    |
| **Endwinkel**      | Der Winkel (0–360°), an dem der Bogen endet. Standardwert: 135° (unten rechts). Zusammen mit dem Standard-Startwinkel ergibt dies die klassische Form eines „270°-Zifferblatts“. |
| **Wert anzeigen**  | Zeigt den aktuellen numerischen Wert in der Mitte des Zifferblatts an.                                                                                                           |
| **Label anzeigen** | Zeigt mittig unterhalb des Wertes eine Textbezeichnung an. Diese ist nur sichtbar, wenn ein Bezeichnungstext eingegeben wurde.                                                   |
| **Etikett**        | Der Text, der als mittlere Beschriftung angezeigt werden soll, z. B.`°C` oder`%` Nur sichtbar, wenn **die Option „Beschriftung anzeigen“** aktiviert ist.                        |
| **Nur lesen**      | Ist diese Option aktiviert, zeigt das Zifferblatt den aktuellen Wert an, lässt sich aber nicht verschieben. Nützlich für schreibgeschützte Messgeräte.                           |

---

### inventwo — Radialspur

| Einstellung                | Was es tut                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vom Widget**             | Kopieren Sie alle Spureinstellungen von einem anderen Radial Slider Widget.                                                                                        |
| **Spurfarbe**              | Farbe des Hintergrundbogens (des noch nicht erreichten vollständigen Bogens). Unterstützt Farbverlaufszeichenketten, z. B.`linear-gradient(90deg, #aaa, #444)` Die |
| **Aktive Farbe verfolgen** | Farbe des gefüllten Bogens (der Abschnitt vom Startpunkt bis zum aktuellen Wert). Unterstützt auch Farbverläufe.                                                   |
| **Spurbreite**             | Dicke des Bogens in Pixeln. Standardwert: 10.                                                                                                                      |
| **Schatten verfolgen**     | Schlagschatten auf den Hintergrundbogen. X-Versatz, Y-Versatz, Unschärfe und Farbe festlegen.                                                                      |

---

### inventwo — Radialer Daumen

| Einstellung        | Was es tut                                                                    |
| ------------------ | ----------------------------------------------------------------------------- |
| **Vom Widget**     | Kopieren Sie alle Reglereinstellungen von einem anderen Radial Slider Widget. |
| **Daumenfarbe**    | Farbe des runden Griffs.                                                      |
| **Daumengröße**    | Durchmesser des Daumenkreises in Pixeln. Standardwert: 16.                    |
| **Daumenschatten** | Schlagschatten auf dem Daumen.                                                |

---

### inventwo — Radialwert

| Einstellung        | Was es tut                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| **Wertgröße**      | Schriftgröße des Mittelwerts in Pixeln (8–100). Standardwert: 32.          |
| **Wertfarbe**      | Farbe des mittleren Werttextes.                                            |
| **Etikettengröße** | Schriftgröße der mittleren Beschriftung in Pixel (8–50). Standardwert: 14. |
| **Etikettenfarbe** | Farbe des mittleren Beschriftungstextes.                                   |

---

## Winkel verstehen

Die Winkel werden im Uhrzeigersinn von oben gemessen (Position 12 Uhr = 0°).

| Winkel | Position auf dem Zifferblatt |
| ------ | ---------------------------- |
| 0°     | Oben (12 Uhr)                |
| 90°    | Rechts (3 Uhr)               |
| 180°   | Unten (6 Uhr)                |
| 270°   | Links (9 Uhr)                |

**Beispiel — Klassischer Thermostatknopf:**

- Startwinkel: 225 (unten links, ungefähr 7 Uhr)
- Endwinkel: 135 (unten rechts, ungefähr 5 Uhr)
- Dadurch entsteht ein großer Bogen, der von der unteren linken Ecke nach oben und über die Oberseite zur unteren rechten Ecke verläuft.

**Beispiel – Rechter Halbkreis:**

- Startwinkel: 270 (links)
- Endwinkel: 90 (rechts)
- Dadurch entsteht auf der rechten Seite ein Halbkreis.

---

## Tipps

- **Thermostat-Kachel:** Startwinkel 225, Endwinkel 135 einstellen, Beschriftung an`°C` und verbinden Sie sich mit Ihrem Heizungsdatenpunkt. Der Bogen beschreibt einen 270°-Winkel – das klassische Thermostat-Design.
- **Akkuanzeige:** Startwinkel 180°, Endwinkel 0°, aktive Farbe Grün und Spurfarbe Dunkelgrau einstellen. Der Bogen füllt sich von links nach rechts, während der Akku geladen wird.
- **Stilwiederverwendung:** Verwenden Sie das **„Von“-Widget** , um Track- und Daumeneinstellungen auf mehrere Drehregler zu kopieren.

---

## Siehe auch

- [Schieberegler-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md) – dieselbe Steuerung wie ein gerader horizontaler oder vertikaler Schieberegler