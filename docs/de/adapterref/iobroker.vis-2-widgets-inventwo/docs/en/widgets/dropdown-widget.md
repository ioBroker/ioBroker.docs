---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md
title: Dropdown-Widget
hash: P+FQAbmodAF+TnQUa2RvbyZTVRURLvTmeuoupR6cRfI=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/dropdown-widget.md)

# Dropdown-Widget

Das Dropdown-Widget zeigt eine auswählbare Liste von Optionen an und speichert den ausgewählten Wert in einem Datenpunkt. Die Optionen werden automatisch aus der ioBroker-Objektdefinition geladen – eine manuelle Listenpflege ist nicht erforderlich. Dies ist ideal für die Auswahl von Modi, Szenen, Lüfterdrehzahlen oder beliebigen Datenpunkten, deren Objekt eine feste Liste zulässiger Werte definiert hat.

![Dropdown-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-dropdown.png)

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **Dropdown** aus der Liste der **inventwo design** Widgets in Ihre Ansicht.
2. Klicken Sie auf **Objekt-ID** und wählen Sie einen Datenpunkt aus, dessen ioBroker-Objekt eine`states` Liste (im Objekt-Editor ist dies das Feld „States“ unter der Registerkarte „Common“).
3. Die Dropdown-Optionen werden automatisch geladen. Sollte das Dropdown-Menü leer sein, verfügt das ausgewählte Objekt möglicherweise nicht über eine Statusliste.
4. Optional können Sie einen **Titel** für das Dropdown-Menü eingeben.
5. Gestalten Sie das Widget in der **inventwo - Dropdown-** Gruppe.

> **Was ist eine Zustandsliste?** In ioBroker können Objekte eine vordefinierte Liste zulässiger Werte mit Bezeichnungen haben, z. B. „Zustand“.`0: "Off"` ,`1: "Low"` ,`2: "Medium"` ,`3: "High"` Das Dropdown-Widget liest diese Liste und verwendet sie als Menüoptionen.

---

## Einstellungen

### Gemeinsam

| Einstellung                       | Was es tut                                                                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-ID**                     | Der zu lesende und zu schreibende Datenpunkt. Optionen werden aus der Zustandsliste dieses Objekts geladen.                                                                                                    |
| **Wert in Beschriftung anzeigen** | Wenn diese Option aktiviert ist, wird neben dem Text jeweils die numerische Bezeichnung angezeigt, z. B.`1 - Low` Wenn deaktiviert, wird nur die Textbezeichnung angezeigt. Standard: aktiviert.               |
| **Text anzeigen**                 | Wenn diese Option aktiviert ist, wird der Textteil der Statusliste angezeigt. Kombinieren Sie sie mit **„Wert in Beschriftung anzeigen“** , um genau festzulegen, was angezeigt wird. Standardmäßig aktiviert. |
| **Nur lesen**                     | Wenn diese Option aktiviert ist, wird der aktuelle Wert als Klartext in einem formatierten Feld angezeigt – ohne Dropdown-Pfeil, ohne Interaktionsmöglichkeit.                                                 |
| **Titel**                         | Optionale Beschriftung, die über dem Dropdown-Menü angezeigt wird, z. B.`Fan speed` oder`Mode` Die                                                                                                             |

**Kombinationen für die Etikettenanzeige:**

| Wert anzeigen | Text anzeigen | Beispielbezeichnung  |
| ------------- | ------------- | -------------------- |
| ✓             | ✓             | `1 - Low` (Standard) |
| ✗             | ✓             | `Low`                |
| ✓             | ✗             | `1`                  |

---

### Hintergrundbedingungen

Mit dieser Gruppe können Sie die Hintergrundfarbe des Dropdown-Menüs abhängig vom aktuellen Wert ändern. Dies ist nützlich, um wichtige Zustände hervorzuheben (z. B. rot bei „Fehler“, grün bei „OK“).

| Einstellung                | Was es tut                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hintergrund OID**        | Standardmäßig wird die Bedingung anhand der **Hauptobjekt-ID** ausgewertet. Geben Sie hier eine andere OID an, wenn der Hintergrund einem anderen Datenpunkt folgen soll. |
| **Anzahl der Bedingungen** | Wie viele Farbregeln sollen hinzugefügt werden? Jede Bedingung wird der Reihe nach ausgewertet, und die erste Übereinstimmung gewinnt.                                    |

Jede Bedingung beinhaltet:

| Einstellung            | Was es tut                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Vergleichsoperator** | So vergleicht man Werte: Gleich, Ungleich, Größer, Kleiner, Größer gleich, Kleiner gleich. |
| **Wert**               | Der Vergleichswert.                                                                        |
| **Hintergrund**        | Die Hintergrundfarbe, die verwendet werden soll, wenn diese Bedingung erfüllt ist.         |

---

### inventwo — Dropdown

| Einstellung                                  | Was es tut                                                                                                                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vom Widget**                               | Kopieren Sie alle visuellen Einstellungen aus einem anderen Dropdown-Widget.                                                                                                                                 |
| **Schriftgröße**                             | Textgröße der Dropdown-Optionen und des ausgewählten Werts in Pixeln.                                                                                                                                        |
| **Textfarbe**                                | Farbe des Textes im Dropdown-Menü.                                                                                                                                                                           |
| **Hintergrund**                              | Standard-Hintergrundfarbe des Dropdown-Menüs.                                                                                                                                                                |
| **Hervorhebungsfarbe**                       | Hintergrundfarbe beim Überfahren einer Option oder der aktuell ausgewählten Option.                                                                                                                          |
| **Rahmenfarbe**                              | Farbe des Dropdown-Rahmens. Ändert sich bei Mausberührung/Fokussierung in die Hervorhebungsfarbe.                                                                                                            |
| **Rahmenbreite**                             | Dicke des Dropdown-Rahmens in Pixeln.                                                                                                                                                                        |
| **Randradius**                               | Wie rund die Ecken des Dropdown-Feldes in Pixeln sind.                                                                                                                                                       |
| **Schriftgröße des Titels**                  | Schriftgröße für die Titelbezeichnung über dem Dropdown-Menü.                                                                                                                                                |
| **Titelfarbe**                               | Farbe des Titeletiketts.                                                                                                                                                                                     |
| **Bedingten Hintergrund auf Titel anwenden** | Wenn diese Option aktiviert ist, ändert sich auch die Hintergrundfarbe des Titelbereichs, sodass sie der Farbe der aktiven Hintergrundbedingung entspricht.                                                  |
| **Titelabstand oben/unten/links/rechts**     | Abstand um die Titelbezeichnung herum.                                                                                                                                                                       |
| **Dropdown-Schatten**                        | Schlagschatten für das Dropdown-Auswahlfeld und das Öffnen-Menü. X- und Y-Versatz, Weichzeichnung, Streuung und Farbe festlegen.                                                                             |
| **Widget-Schatten**                          | Schlagschatten für den gesamten Widget-Container (einschließlich des Titelbereichs). X- und Y-Versatz, Unschärfe, Streuung und Farbe festlegen. Alle Werte sind standardmäßig auf 0 gesetzt (kein Schatten). |

---

## Tipps

- **Die Dropdown-Liste ist leer:** Stellen Sie sicher, dass das ausgewählte Objekt tatsächlich eine Statusliste besitzt. Öffnen Sie die ioBroker-Administration, gehen Sie zu „Objekte“, suchen Sie Ihr Objekt und prüfen Sie, ob das Feld „Status“ unter dem Tab „Allgemein“ ausgefüllt ist.
- **Schreibgeschützte Anzeige:** Aktivieren Sie die **Option „Schreibgeschützt“** , um das Dropdown-Menü ausschließlich als Anzeigeelement zu nutzen – es zeigt den aktuellen Wert im formatierten Feld ohne Dropdown-Funktion an.
- **Farbrückmeldung:** Verwenden Sie **Hintergrundbedingungen** , damit das Widget den aktuellen Status sofort durch eine Farbe kommuniziert, z. B. Grün für „Läuft“, Gelb für „Standby“, Rot für „Fehler“.

---

## Siehe auch

- [Universelles Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md) – für benutzerdefinierte Schaltflächen-/Kachel-Layouts mit länderspezifischer Gestaltung
- [Tabellen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) – zur Anzeige tabellarischer Daten