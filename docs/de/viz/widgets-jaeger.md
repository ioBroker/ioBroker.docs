---
title:       "JägerDesign-Widgets"
lastChanged: "09.09.2026"
---

# JägerDesign-Widgets für vis-2

Die meisten Widgetsätze liefern einzelne Bausteine, aus denen man sich eine
Seite zusammensetzt. **JägerDesign** liefert einen fertigen Entwurf: ein
Layout-Widget baut die ganze Seite mit Seitenleiste, Kopfbereich und
Kachelbereich, und die übrigen Bausteine fügen sich darin von selbst richtig
ein. Wer nicht gestalten, sondern nur seine Geräte eintragen möchte, kommt
damit am schnellsten zu einer Seite, die nach etwas aussieht.

![Layout](media/widgets/vis-2-widgets-jaeger-design.jpg)

Entstanden ist der Entwurf zusammen mit einem Designstudio für eine Villa in
Baden-Württemberg. Inzwischen steht er allen offen.

## Was er kostet und warum

**JägerDesign ist der einzige kostenpflichtige Widgetsatz im
Adapterverzeichnis.** Alle anderen sind frei. Der Unterschied ist der Aufwand
dahinter: Der Satz ist keine Sammlung gewachsener Bausteine, sondern ein von
Grund auf gestalteter Entwurf, der von einem Designstudio gezeichnet und
seither gepflegt wird. Die Lizenz bezahlt diese Arbeit.

Was die Lizenz umfasst:

- **Lebenslang.** Eine einmalige Zahlung, keine laufenden Kosten.
- **An die UUID der Installation gebunden**, bis zu **dreimal übertragbar**,
  ein Rechnerwechsel ist also kein Problem. Für eine Übertragung genügt eine
  Nachricht an <info@iobroker.net>.
- Verwaltet wird sie auf **iobroker.net**, wie die Lizenzen für vis-2 und KNX
  auch. Einzelheiten und Preis stehen in der
  [Produktübersicht](/productoverview) und unter
  [Adapterlizenzen](/docs/licenses/adapter.md).

?> **Vorher ausprobieren geht ohne Lizenz.** Im Editor von vis-2 lassen sich
die Widgets einbauen und ansehen. Erst in der laufenden Visualisierung, der
Runtime, werden sie ohne Lizenz nicht dargestellt. Man kann also in Ruhe eine
ganze Seite bauen und sich anschauen, bevor man sich entscheidet.

## Die Widgets

| | Widget | Wofür |
| --- | --- | --- |
| ![Layout](media/widgets/vis-2-widgets-jaeger-design/layout.jpg) | **Layout** | Der Rahmen: Seitenleiste mit den Bereichen (Licht, Klima, Rollläden, Szenen, Kameras), Kopfzeile und Kachelfläche. Alles andere liegt darin. |
| ![Zustand](media/widgets/vis-2-widgets-jaeger-design/state.jpg) | **Zustand** | Die Grundkachel: ein Datenpunkt mit Symbol, Text und Schaltfunktion. |
| ![Dimmer](media/widgets/vis-2-widgets-jaeger-design/dimmer.jpg) | **Dimmer** | Licht ein- und ausschalten und die Helligkeit stellen. |
| ![Jalousie](media/widgets/vis-2-widgets-jaeger-design/shutter.jpg) | **Jalousie** | Rollladen mit Position und Fahrtasten. |
| ![Thermostat](media/widgets/vis-2-widgets-jaeger-design/thermostat.jpg) | **Thermostat** | Soll- und Isttemperatur mit Betriebsart. |
| ![Szene](media/widgets/vis-2-widgets-jaeger-design/scene.jpg) | **Szene** | Ruft eine Szene auf, etwa „Abend" oder „Alles aus". |
| ![Kameras](media/widgets/vis-2-widgets-jaeger-design/cameras.jpg) | **Kameras** | Mehrere Kamerabilder nebeneinander, mit Großansicht auf Klick. |
| ![Player](media/widgets/vis-2-widgets-jaeger-design/player.jpg) | **Player** | Titel, Bild und Bedienung eines Abspielers. |
| ![Nachrichten](media/widgets/vis-2-widgets-jaeger-design/news.jpg) | **Nachrichten** | Meldungen und Hinweise im Kopfbereich der Seite. |

## Worauf zu achten ist

**Es ist ein Gesamtentwurf.** Die Bausteine sind aufeinander abgestimmt und
sehen zusammen am besten aus. Einzelne JägerDesign-Kacheln in eine sonst
anders gestaltete Seite zu setzen, funktioniert zwar, wirkt aber selten.

**Der Adapter heißt** [`vis-2-widgets-jaeger-design`](/adapters/vis-2-widgets-jaeger-design)
**und läuft nur unter vis-2**, nicht unter vis 1.

**Bei der Installation** ist die Lizenzbedingung zu bestätigen. Danach den
Editor neu laden.
