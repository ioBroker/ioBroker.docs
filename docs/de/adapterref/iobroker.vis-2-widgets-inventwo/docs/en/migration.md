---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md":{"title":{"en":"Migrating inventwo vis-1 widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md":{"title":{"en":"Universal Widget — Interaction Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md":{"title":{"en":"Event Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md":{"title":{"en":"Universal Widget — Content Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md":{"title":{"en":"Universal Widget — Styling and Shapes"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md
title: Migration der inventwo vis-1 Widgets
hash: Dyf9rJFzmg3ij0kZtc62yAF8Xa8aPE1T03cuzfVjdJQ=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/migration.md)

# Migration der inventwo vis-1 Widgets

Wenn Sie ein VIS-1-Projekt in VIS 2 importiert haben, das die alten Widgets des Adapters **VIS-Inventwo** (Vorlagen) verwendet `i-vis-*` Mithilfe der Einstellungen dieses Adapters können sie in die VIS 2-Widgets dieses Sets umgewandelt werden.

Die Migration ist eine Hilfestellung, keine Ein-Klick-Lösung: Häufige Fälle werden vollständig, andere nur teilweise und einige Widgets gar nicht konvertiert. Nach der Migration erhalten Sie eine Liste mit allen Punkten, die Sie manuell überprüfen sollten.

> Die Idee und Teile der Kartierung basieren auf dem Community-Tool [inventwo-vis1-to-vis2](https://github.com/crunchip77/inventwo-vis1-to-vis2) von crunchip77.

> **Keine Garantie:** Die Migration wurde sorgfältig erstellt, wir können jedoch keine fehlerfreie Funktion für jedes Projekt garantieren – vis-1-Projekte sind dafür zu vielfältig. Bewahren Sie daher immer das Original auf (neues Projekt oder Backup, siehe unten) und überprüfen Sie das Ergebnis. Sollte die Konvertierung nicht wie erwartet verlaufen, [erstellen Sie bitte ein Ticket](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/issues) und beschreiben Sie das Widget und seine Einstellungen. Ihr Feedback hilft uns, das Tool zu verbessern.

---

## Wie man es benutzt

1. Importieren Sie Ihr VIS-1-Projekt in VIS 2 (falls noch nicht geschehen).
2. **Schließen Sie den VIS 2-Editor** dieses Projekts. Ein geöffneter Editor könnte das Ergebnis überschreiben.
3. Öffnen Sie in ioBroker Admin **die Instanzen** und die Einstellungen von `vis-2-widgets-inventwo` Die
4. Unter **1. Projekt** wählen Sie das **Projekt VIS 2** aus.
   - **Name des neuen Projekts** (optional): Mit einem Namen wird das Projekt mit allen zugehörigen Dateien in ein neues Projekt kopiert und dort konvertiert – das Original bleibt unverändert. Ohne Namen wird das Projekt überschrieben (vorher wird eine Sicherungskopie erstellt, siehe unten).
   - **Originales vis-1-Projekt** (optional): Wählen Sie es aus, wenn nach dem Import Widgets fehlen (siehe [Fehlende Widgets nach dem Import](#widgets-missing-after-the-import) ).
5. Klicken Sie auf **„Analysieren“** . Es hat sich noch nichts geändert – Sie sehen nur eine Vorschau:
   - Wie viele Widgets können ohne Nachbearbeitung konvertiert werden?
   - Wie viele können umgewandelt werden, müssen aber überprüft werden?
   - Wie viele können nicht umgewandelt werden und bleiben unverändert?
6. Klicken Sie auf **„Projekt konvertieren“ …** oder **„Projekt erstellen“ …** und bestätigen Sie.
7. Laden Sie VIS 2 neu und arbeiten Sie die Liste **der zu überprüfenden konvertierten Widgets** durch.

Im Abschnitt **„Was kann konvertiert werden?“** oben auf der Seite werden alle unterstützten Widgets aufgelistet.

Mit der **Funktion „Bericht herunterladen“** können Sie das Ergebnis als JSON-Datei speichern.

---

## Sichern und rückgängig machen

Wenn Sie ein Projekt direkt konvertieren (ohne neuen Namen), wird das ursprüngliche Projekt `vis-views.json` wird im Projektordner gespeichert als `vis-views-backup-inventwo-<date>-<time>.json` Das Projekt wird erst überschrieben, nachdem diese Sicherung erfolgreich erstellt und wieder eingelesen wurde.

Wenn Sie das Ergebnis in ein neues Projekt geschrieben haben, gibt es nichts rückgängig zu machen: Das ursprüngliche Projekt bleibt unverändert, und Sie können das neue Projekt einfach löschen.

Um eine In-Place-Migration rückgängig zu machen, öffnen Sie im Adminbereich die Registerkarte „ **Dateien“** und gehen Sie zu `vis-2.0/<project>/` und ersetzen `vis-views.json` mit der Sicherungsdatei.

---

## Nach dem Import fehlen Widgets.

vis-1 speichert ein Widget, das in mehreren Ansichten einmal pro Ansicht angezeigt wird, wobei der Ansichtsname an seine ID angehängt wird (z. B. `w00220_02_EG` VIS 2 entfernt beim Laden eines Projekts alle Widgets, deren ID einen Unterstrich enthält. Nach dem Import sind diese Widgets daher nicht mehr vorhanden – die Kacheln fehlen im Editor und die Widget-Liste ist kürzer als zuvor.

Um sie wiederherzustellen, wählen Sie das Originalprojekt unter **„Originales vis-1-Projekt (optional)“** aus. Es dient lediglich als Referenz und wird nicht verändert. Es muss weiterhin in vis-1 (Dateispeicher) vorhanden sein. `vis.0` Der Assistent fügt dann jedes dieser Widgets einmal hinzu und trägt die anderen Ansichten in dessen Attribut **„In Ansichten anzeigen“** ein – so speichert VIS 2 solche Widgets. Die wiederhergestellten Widgets werden in der Vorschau aufgelistet und im selben Durchlauf konvertiert.

---

## Was wird umgewandelt?

| vis-1 Widget                             | VIS 2-Widget                                                 | Ergebnis                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Universal — Schalter                     | Universelles Widget, Typ _Schalter_                          | vollständig                                                                                  |
| Universal — Hintergrund                  | Universelles Widget, Typ: _Nur lesen_                        | vollständig                                                                                  |
| Universal — Navigation                   | Universelles Widget, Typ _Navigation_                        | vollständig                                                                                  |
| Universal – In Popup anzeigen            | Universelles Widget, Typ _"Ansicht" im Dialog_               | vollständig                                                                                  |
| Universal — State                        | Universelles Widget, Typ _Schaltfläche_                      | Prüfwert und Klickverhalten; eine Rücksetzzeit wird als _Rücksetzwert nach (ms)_ übernommen. |
| Universal — Wertsteigerung/Wertminderung | Universelles Widget, Typ: _Wert erhöhen/verringern_          | Prüfschrittwert                                                                              |
| Universal — HTTP                         | Universelles Widget, Typ: _HTTP-Anfrage senden / URL öffnen_ | URL prüfen                                                                                   |
| Universaluhr mit analoger Uhr            | Universelles Widget, Inhalt: _Analoge Uhr_                   | Überprüfen Sie das Zifferblatt; die Zeitzone wird nicht übernommen.                          |
| Multi                                    | Universelles Widget mit mehreren Zuständen                   | Prüfen Sie die Bedingungen und sehen Sie sich die Staaten an                                 |
| Schalter, kleiner Schalter               | Universelles Widget, Typ _Schalter_                          | vollständig                                                                                  |
| Hintergrund, kleiner Hintergrund         | Universelles Widget, Typ: _Nur lesen_                        | vollständig                                                                                  |
| Knopf, kleiner Knopf                     | Universelles Widget, Typ _Schaltfläche_                      | vollständig                                                                                  |
| Navigation, Navigation klein             | Universelles Widget, Typ _Navigation_                        | vollständig                                                                                  |
| Bild, Bild (neu)                         | Universelles Widget, _Inhaltsbild_                           | Skalierung, Farben und Schatten prüfen                                                       |
| Optionsfeldliste                         | Universelles Widget mit _separaten Schaltflächen_            | Größe und Abstände prüfen                                                                    |
| Farbauswahl                              | Universelles Widget, _Inhaltsfarbauswahl_                    | Datenpunkte und angezeigte Elemente prüfen                                                   |
| Kontrollkästchen                         | Kontrollkästchen-Widget                                      | nur das erste Kontrollkästchen des Widgets; die Darstellung wird nicht übernommen            |
| Switch Basic                             | Schalter-Widget                                              | nur der erste Schalter des Widgets                                                           |
| Schalter (Wippschalter)                  | Schalter-Widget                                              | Bitte Größe und Farben prüfen                                                                |
| Werteliste                               | Wertelisten-Widget                                           | vollständig (einige Listenstile existieren nicht)                                            |
| Festzelt                                 | Laufschrift-Widget                                           | Stellen Sie die Geschwindigkeit erneut ein                                                   |
| JSON-Tabelle                             | Tabellen-Widget                                              | Spalten, Formate und Farben wurden übernommen; überprüfen Sie das Aussehen.                  |
| Schieberegler (einfach)                  | Schieberegler-Widget                                         | Prüfen Sie die Etiketten und die Wertanzeige.                                                |

Farben, Texte, Bilder, Eckenradius, Schatten, Rahmen, Ausrichtung, Abstände und Deckkraft der Universal- und Multi-Widgets werden übernommen. Die Textgröße und der Textschatten werden in die CSS-Einstellungen des Widgets verschoben (`font-size`, `text-shadow`).

### Nicht konvertiert

Die Farbregler (`i-vis-slider-color-hor`, `i-vis-slider-color-vert`) haben kein Gegenstück. Sie bleiben unverändert und werden unter **Widgets ohne Konvertierung** aufgeführt.

Nicht verfügbar in VIS 2 und daher weggelassen: Hover-Farben, die Digitaluhr, der separate Datenpunkt zum Schließen eines Dialogs, die Matrixanordnung von Optionsfeldern, Schwellenwerte pro Tabellenzelle, die Drehung von Schiebereglern.

In VIS 2 kann ein Dialog weiterhin über einen Datenpunkt geschlossen werden: Er folgt der **Objekt-ID** des Widgets und ist nur so lange geöffnet, wie dieser Datenpunkt **den Wert „true“** enthält (siehe [Interaktionstypen](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md#view-in-dialog) ). Lediglich der zusätzliche Schließdatenpunkt von VIS-1 hat kein Gegenstück.