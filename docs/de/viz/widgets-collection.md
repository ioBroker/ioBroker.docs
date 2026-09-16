---
title:       "Collection-Widgets"
lastChanged: "09.09.2026"
---

# Collection-Widgets für vis-2

Wo [Material](/docs/viz/widgets-material.md) fertige Geräte abbildet, also
Thermostat, Jalousie und Staubsauger, liefert **Collection** die
Bedienelemente selbst: Knöpfe, Auswahlfelder, Schieberegler, Tabellen. Der Satz
ist die naheliegende Ergänzung, sobald eine Seite etwas braucht, das kein
fertiges Gerätewidget abdeckt.

Ein Grundzug zieht sich durch alle Bausteine: sie fragen nicht nach einem
festen Datentyp, sondern nehmen, was der Datenpunkt liefert. Dieselbe
Knopfgruppe bedient einen Schalter mit `true`/`false`, eine Betriebsart mit
den Zahlen 0 bis 3 und eine Szene mit Textwerten.

Installiert wird der Adapter
[`vis-2-widgets-collection`](/adapters/vis-2-widgets-collection), danach den
Editor neu laden. Die Bausteine erscheinen in der Palette unter **Collection**.

## Die Widgets

| | Widget | Wofür |
| --- | --- | --- |
| ![Schalter](media/widgets/vis-2-widgets-collection/switch.jpg) | **Schalter** | Ein Kippschalter für einen Ja/Nein-Wert, mit Beschriftung links oder rechts. |
| ![Checkbox](media/widgets/vis-2-widgets-collection/checkbox.jpg) | **Checkbox** | Dasselbe als Ankreuzfeld, wenn es unauffälliger sein soll. |
| ![Button-Gruppe](media/widgets/vis-2-widgets-collection/button-group.jpg) | **Button-Gruppe** | Mehrere Knöpfe nebeneinander, von denen einer gedrückt bleibt, für Betriebsarten, Fensterzustände, Szenen. |
| ![Radio-Gruppe](media/widgets/vis-2-widgets-collection/radio-group.jpg) | **Radio-Gruppe** | Dieselbe Auswahl als Liste mit runden Knöpfen. |
| ![Auswahl](media/widgets/vis-2-widgets-collection/select.jpg) | **Auswahl** | Ein Klappfeld, wenn die Liste für Knöpfe zu lang wird. |
| ![Schieberegler](media/widgets/vis-2-widgets-collection/slider.jpg) | **Schieberegler** | Ein Zahlenwert zwischen zwei Grenzen, wahlweise waagerecht oder senkrecht, mit Schrittweite und Skala. |
| ![Eingabe](media/widgets/vis-2-widgets-collection/input.jpg) | **Eingabe** | Ein Textfeld für Zeichenketten und Zahlen, etwa für Sollwerte oder Namen. |
| ![Gauge](media/widgets/vis-2-widgets-collection/gauge.jpg) | **Gauge** | Ein Zeigerinstrument oder eine Skala für einen Messwert, in mehreren Bauformen. |
| ![Zustand](media/widgets/vis-2-widgets-collection/state.jpg) | **Zustand** | Zeigt einen Wert mit Symbol, Einheit und Farbe an, ohne ihn zu verändern. |
| ![Licht](media/widgets/vis-2-widgets-collection/light.jpg) | **Licht** | Farbrad und Helligkeitsregler für eine Lampe, deutlich schlichter gehalten als das Material-Gegenstück. |
| ![JSON-Tabelle](media/widgets/vis-2-widgets-collection/json-table.jpg) | **JSON-Tabelle** | Macht aus einem Datenpunkt, der eine JSON-Liste enthält, eine sortierbare Tabelle mit Seitenblättern. |
| ![Dialog](media/widgets/vis-2-widgets-collection/dialog.jpg) | **Dialog** | Öffnet eine andere Ansicht als Fenster über der Seite. |

Der dreizehnte Baustein, **Theme-Konfiguration**, zeigt nichts an. Er stellt das
Erscheinungsbild des ganzen Projekts ein: Farben, Schriftart, Schriftgrößen,
Zeilenhöhe, Eckradien und Abstände. Wer eine Seite durchgängig gestalten will,
ohne jedes Widget einzeln anzufassen, setzt dieses Widget einmal auf eine
Ansicht und stellt dort alles ein.

## Worauf zu achten ist

**Werteliste.** Bei Knopf-, Radio- und Auswahlgruppen wird von Hand
eingetragen, welcher Wert zu welcher Beschriftung gehört. Es lohnt sich, vorher
im Objektbaum nachzusehen, welche Werte der Datenpunkt tatsächlich annimmt.

**Schreibrichtung.** Alle bedienenden Widgets schreiben ohne Bestätigung. Für
Dinge, bei denen ein Fehlgriff weh tut, etwa Tore und Heizungssperren, ist der
Dialog aus Material mit PIN-Abfrage die bessere Wahl.

**Der Satz wächst.** Collection wird laufend erweitert; die Liste oben gibt
den Stand von Version 2.6 wieder. Nach einem Update lohnt ein Blick in die
Palette.
