---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md
title: Kalender-Widget
hash: NaiTGr6PZnusisihoRTaOkIDnGt24YCLGyLGmbhezvA=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/calendar-widget.md)

# Kalender-Widget

Das Kalender-Widget zeigt eine vollständige Monatsansicht basierend auf [dem Datumskalender von MUI](https://mui.com/x/react-date-pickers/date-calendar/) . Es kann als Datumsauswahl (Lesen und Schreiben eines Datums von/bis zu einem Datenpunkt), als schreibgeschützte Datumsanzeige oder einfach zur Hervorhebung des heutigen Datums verwendet werden – alle drei gleichzeitig, wenn Sie möchten.

Möchten Sie stattdessen Ereignisse/Termine (z. B. aus einem iCal-Kalender) anzeigen? Verwenden Sie das [Ereigniskalender-Widget](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/event-calendar-widget.md) .

![Kalender-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-calendar.png)

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **den Kalender** aus der Liste der **inventwo design** Widgets in Ihre Ansicht.
2. Klicken Sie auf **Objekt-ID** und wählen Sie den Datenpunkt aus, der das Datum enthält.
3. Legen Sie **das Wertformat des Datenpunkts** so fest, dass es der Art und Weise entspricht, wie der Datenpunkt seinen Wert speichert (Zeitstempel oder ISO-Datumszeichenfolge).
4. Aktivieren Sie **„Schreibgeschützt“,** wenn das Widget nur das Datum anzeigen und keine Änderungen zulassen soll.
5. Gestalten Sie den Kalender in den **inventwo - Kalender ...** Gruppen.

---

## Einstellungen

### Gemeinsam

| Einstellung                        | Was es tut                                                                                                                                                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**                      | Der Datenpunkt, aus dem dieser Kalender das ausgewählte Datum liest. Er wird auch beschrieben, es sei denn **, der Schreibschutz** ist aktiviert.                                                                                                                      |
| **Datenpunktwertformat**           | Wie der Datenpunktwert gelesen/geschrieben wird: **Zeitstempel** (Zahl, Millisekunden seit der Unix-Epoche) oder **ISO-Datum** (Zeichenkette,`YYYY-MM-DD` ).                                                                                                           |
| **Nur lesen**                      | Wenn diese Option aktiviert ist, zeigt der Kalender nur das Datum des Datenpunkts an – durch Klicken auf einen Tag wird nichts geschrieben.                                                                                                                            |
| **Highlight des Tages**            | Markiert das heutige Datum mit einem deutlichen Rahmen/Hintergrund in den Farben von **inventwo - Calendar today** .                                                                                                                                                   |
| **Vergangene Daten deaktivieren**  | Tage vor heute können nicht ausgewählt werden.                                                                                                                                                                                                                         |
| **Zukünftige Daten deaktivieren**  | Tage nach heute können nicht ausgewählt werden.                                                                                                                                                                                                                        |
| **Monat/Jahr-Navigation zulassen** | Wenn diese Option aktiviert ist (Standardeinstellung), kann der Benutzer durch Klicken auf die Kopfzeile zu einem bestimmten Monat oder Jahr springen. Wenn sie deaktiviert ist, wird nur die Tagesübersicht mit Pfeilen für den vorherigen/nächsten Monat angezeigt.  |
| **Erster Tag der Woche**           | Ob die Wochen am **Montag** oder **Sonntag** beginnen, beeinflusst sowohl die Tageseinteilung als auch die Kalenderwochennummern.                                                                                                                                      |
| **Kalenderwochennummern anzeigen** | Fügt links neben jeder Zeile eine Spalte mit der Kalenderwochennummer hinzu.                                                                                                                                                                                           |
| **Kalenderwochentyp**              | Nur sichtbar, wenn die Kalenderwochen angezeigt werden. **ISO-8601** : Die Wochen beginnen am Montag; Woche 1 ist die Woche, die den ersten Donnerstag des Jahres enthält (europäischer Standard). **Vereinfacht** : Woche 1 ist die Woche, die den 1. Januar enthält. |
| **Tageszellengröße**               | Größe der einzelnen Tageszellen in Pixeln (20–80). Steuert auch die Größe der Wochentags- und Kalenderwochen-Beschriftungen.                                                                                                                                           |

---

### inventwo — Kalenderkopf

Die Kopfzeile mit der Monats-/Jahresbezeichnung und den Navigationspfeilen.

| Einstellung                                  | Was es tut                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| **Vom Widget**                               | Kopieren Sie alle Header-Einstellungen von einem anderen Kalender-Widget. |
| **Textfarbe der Überschrift**                | Farbe des Monats-/Jahresetiketts.                                         |
| **Farbe des Header-Symbols**                 | Farbe der Navigationspfeile und des Ansichtswechselsymbols.               |
| **Farbe beim Überfahren des Header-Symbols** | Farbe der Symbole beim Überfahren mit der Maus.                           |

---

### inventwo — Kalender Wochentage

Die Reihe der Wochentagsabkürzungen (Mo, Di, We, …).

| Einstellung                  | Was es tut                                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| **Vom Widget**               | Wochentagseinstellungen aus einem anderen Kalender-Widget kopieren. |
| **Textfarbe an Wochentagen** | Farbe der Wochentagsabkürzungen.                                    |

---

### erfinden — Kalendertag

Die regulären, nicht ausgewählten Tageszellen.

| Einstellung                                | Was es tut                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vom Widget**                             | Tageseinstellungen aus einem anderen Kalender-Widget kopieren.                                                                                                           |
| **Textfarbe für den Tag**                  | Textfarbe an einem normalen Tag.                                                                                                                                         |
| **Tages-Hover-Farbe**                      | Die Hintergrundfarbe wird beim Überfahren eines Tages mit der Maus angezeigt (im Bearbeitungsmodus / schreibgeschützt hat das Überfahren mit der Maus keine Auswirkung). |
| **Tagesgrenzradius**                       | Wie rund die Zelle ist (0–100 %). 50 % ergeben einen Kreis, 0 % ein Quadrat.                                                                                             |
| **Textfarbe für Tag außerhalb des Monats** | Die Textfarbe für die führenden/nachfolgenden Tage des vorherigen/nächsten Monats wird angezeigt, um das Raster auszufüllen.                                             |
| **Textfarbe für Behindertentage**          | Textfarbe für Tage deaktiviert über **„Vergangene/Zukünftige Daten deaktivieren“** .                                                                                     |

---

### inventwo — Kalender ausgewählter Tag

Das aktuell ausgewählte Datum.

| Einstellung                                 | Was es tut                                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Vom Widget**                              | Einstellungen von einem anderen Kalender-Widget kopieren.                                            |
| **Hintergrundfarbe des ausgewählten Tages** | Hintergrund des ausgewählten Tages.                                                                  |
| **Textfarbe des ausgewählten Tages**        | Textfarbe des ausgewählten Tages.                                                                    |
| **Ausgewählter Tagesschatten**              | Schlagschatten für den ausgewählten Tag. X-Versatz, Y-Versatz, Unschärfe, Größe und Farbe festlegen. |

---

### inventwo — Kalender heute

Wird nur angezeigt, wenn **„Heute hervorheben“** aktiviert ist.

| Einstellung                | Was es tut                                                |
| -------------------------- | --------------------------------------------------------- |
| **Vom Widget**             | Einstellungen von einem anderen Kalender-Widget kopieren. |
| **Heute Randfarbe**        | Rahmenfarbe zur Kennzeichnung der heutigen Zelle.         |
| **Hintergrundfarbe heute** | Hintergrundfarbe der heutigen Zelle.                      |
| **Textfarbe heute**        | Textfarbe der heutigen Zelle.                             |

---

### inventwo — Kalenderwochennummer

Wird nur angezeigt, wenn **die Option „Kalenderwochennummern anzeigen“** aktiviert ist.

| Einstellung                    | Was es tut                                                |
| ------------------------------ | --------------------------------------------------------- |
| **Vom Widget**                 | Einstellungen von einem anderen Kalender-Widget kopieren. |
| **Textfarbe der Wochennummer** | Textfarbe der Spalte mit der Kalenderwoche.               |

---

## Tipps

- **Reiner Datumswähler:** Lassen Sie die **Option „Schreibgeschützt“** deaktiviert und wählen Sie **„Zeitstempel“** oder **„ISO-Datum“** , um dem Datentyp Ihres Datenpunkts zu entsprechen.
- **Datumsanzeige im Nur-Lese-Modus mit Markierung „heute“:** Aktivieren Sie **„Nur-Lese-Modus“** und **„Heute hervorheben“** – der Kalender zeigt das gespeicherte Datum als ausgewählt an und markiert „heute“ deutlich, ohne dass Bearbeitungen möglich sind.
- **Sprache:** Monatsnamen, Wochentagsbezeichnungen und Kalenderwochenregeln richten sich automatisch nach der Browsersprache.
- **Monats-/Jahresauswahlfarben:** Wenn Sie auf die Überschrift klicken, um zu einem bestimmten Monat oder Jahr zu springen, verwendet dieses Raster die **inventwo - Kalender-Tagesfarben** (Text, Hover, deaktiviert) und die **inventwo - Kalender-Auswahlfarben** für den markierten Eintrag – es gibt keine separaten Einstellungen dafür.
- **Stilwiederverwendung:** Verwenden Sie das **„Von“-Widget** in jeder Stilgruppe, um mehrere Kalender optisch einheitlich zu halten.

---

## Siehe auch

- [Eventkalender-Widget](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/en/widgets/event-calendar-widget.md) – zur Anzeige von Ereignissen/Terminen in einer Monats-/Wochen-/Tagesansicht
- [Tabellen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) – zur Anzeige von Datumswerten als Teil einer größeren Datentabelle