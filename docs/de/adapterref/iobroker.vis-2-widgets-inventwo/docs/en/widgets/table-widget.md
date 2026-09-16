---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md
title: Tabellen-Widget
hash: ZVfHXO171gUCy4zzb423Orm3wJ3dTey6DYdhcwiPouw=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/table-widget.md)

# Tabellen-Widget
Das Tabellen-Widget zeigt Daten eines ioBroker-Datenpunkts als formatierte Tabelle an. Der Datenpunkt muss ein **JSON-Array** enthalten - eine Liste von Objekten, wobei jedes Objekt eine Zeile repräsentiert. Dies eignet sich ideal zur Anzeige von Sensorwerten, Gerätelisten, Verlaufsprotokollen oder beliebigen strukturierten Daten, die ein Adapter als JSON schreibt.

![Tabellen-Widget](../../../../../../en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/img/widget-table.png)

---

## So fügen Sie das Widget hinzu
1. Ziehen Sie **Table** aus der **inventwo design**-Widgetliste in Ihre Ansicht.
2. Klicken Sie auf **Objekt-ID** und wählen Sie einen Datenpunkt aus, der ein JSON-Array enthält (siehe Abschnitt Datenformat weiter unten).
3. Die Tabelle wird automatisch gerendert, wobei jede Spalte einem JSON-Schlüssel entspricht.
4. Um Spalten anzupassen (Titel, Breite, Formatierung), erhöhen Sie **Anzahl Spalten** und konfigurieren Sie jede Spalte einzeln.

---

## Erwartetes Datenformat
Der Datenpunkt muss ein JSON-Array von Objekten enthalten. Jedes Objekt entspricht einer Zeile, und jeder Schlüssel wird zu einer Spalte.

```json
[
  { "name": "Living Room", "temp": 21.3, "humidity": 58 },
  { "name": "Kitchen",     "temp": 22.1, "humidity": 62 },
  { "name": "Bedroom",     "temp": 19.8, "humidity": 55 }
]
```

Wenn der Datenpunktwert kein gültiges JSON ist, zeigt die Tabelle eine Fehlermeldung an.

---

## Einstellungen
### Gemeinsam
| Hintergrund | Funktion |
|---------|-------------|
| **Objekt-ID** | Der Datenpunkt, der das JSON-Array enthält. |
| **Spaltenanzahl** | Anzahl der manuell konfigurierten Spalten. Setzen Sie den Wert auf **0** für automatische Spalten (alle Schlüssel werden in der Reihenfolge angezeigt, in der sie im JSON erscheinen). Erhöhen Sie diesen Wert, um jede Spalte einzeln zu konfigurieren. |
| **Maximale Zeilen** | Maximale Anzahl der anzuzeigenden Zeilen. Auf **0** setzen, um alle Zeilen anzuzeigen. |
| **Kopfzeile anzeigen** | Blendet die Kopfzeile mit den Spaltenüberschriften ein oder aus. |
| **Seitennummerierung** | Wenn diese Option aktiviert ist, werden die Zeilen in Seiten mit Navigationssteuerelementen am unteren Rand der Tabelle aufgeteilt, anstatt alle Zeilen gleichzeitig anzuzeigen. |
| **Zeilen pro Seite** | *(Nur Seitenzahlen)* Anzahl der Zeilen pro Seite. |
| **Fixierte Kopfzeile** | Wenn diese Option aktiviert ist, bleibt die Kopfzeile beim Scrollen durch mehrere Zeilen sichtbar. |
| **Summenzeile** | Wenn diese Option aktiviert ist, wird unterhalb der vorletzten Zeile ein doppelter Rahmen gezeichnet, der die letzte Zeile optisch als Summen- oder Zusammenfassungszeile abgrenzt. |

---

### Sortieren
| Hintergrund | Funktion |
|---------|-------------|
| **Standard-Sortierspalte** | Die Spalte, nach der beim ersten Laden der Tabelle sortiert wird. |
| **Standard-Sortierreihenfolge** | **Aufsteigend** oder **Absteigend**. |
| **Mehrspaltensortierung** | Ermöglicht das Sortieren nach mehreren Spalten gleichzeitig. Klicken Sie auf eine Spaltenüberschrift, um sie zur Sortierreihenfolge hinzuzufügen. Klicken Sie erneut, um die Richtung umzukehren. Klicken Sie ein drittes Mal, um die Spalte aus der Sortierung zu entfernen. Die Zahl in der Überschrift zeigt die Sortierpriorität an. |
| **Anzahl der Standardsortierspalten** | *(Nur Mehrfachsortierung)* Wie viele Standardsortierspalten konfiguriert werden sollen. |

Benutzer können zur Laufzeit auf Spaltenüberschriften klicken, um die Sortierreihenfolge zu ändern (sofern **Sortable** für diese Spalte aktiviert ist).

---

### Spalteneinstellungen (pro Spalte)
Wenn **Anzahl Spalten** größer als 0 ist, hat jede Spalte folgende Einstellungen:

| Hintergrund | Funktion |
|---------|-------------|
| **Spalte ausblenden** | Blendet diese Spalte in der Tabelle aus, ohne ihre Konfiguration zu entfernen. |
| **Schlüssel** | Der JSON-Eigenschaftsname, der in dieser Spalte angezeigt werden soll, z. B. `temp`. Wenn das Feld leer bleibt, verwendet die Spalte den Schlüssel an dieser Position im JSON-Objekt. |
| **Formel** | Optionaler arithmetischer Ausdruck, berechnet aus den JSON-Feldern der Zeile. Wenn festgelegt, ersetzt das Ergebnis den Rohwert des Schlüssels. JSON-Schlüssel werden direkt als Variablen verwendet, z. B. `price *qty` oder `value* 100`. Unterstützte Operatoren: `+`, `-`, `*`, `/`, `%`, `**` und Klammern `()`. Das Ergebnis wird anschließend gemäß der Einstellung **Format** verarbeitet (z. B. als Zahl gerundet). |
| **Titel** | Spaltenüberschrift. Ist die Spalte leer, wird der JSON-Schlüsselname verwendet. |
| **Präfix** | Text, der vor dem Zellenwert hinzugefügt wird, z. B. `~`. |
| **Suffix** | Text, der nach dem Zellenwert hinzugefügt wird, z. B. ` °C`. |
| **Suffix** | Text, der nach dem Zellenwert hinzugefügt wird, z. B. ` °C`. |
| **Platzhalter** | Text, der angezeigt wird, wenn der Zellenwert leer oder null ist. |
| **Titelausrichtung** | Ausrichtung der Spaltenüberschrift: Links, Zentriert, Rechts. |
| **Inhaltsausrichtung** | Ausrichtung der Zellenwerte: Links, Zentriert, Rechts. |
| **Linkziel** | *(Nur URL-Format)* Wo der Link geöffnet wird: **Neuer Tab** (`_blank`), **Gleicher Tab** (`_self`), **Übergeordneter Frame** (`_parent`), **Oberster Frame** (`_top`). |
| **Linkziel** | *(Nur URL-Format)* Wo der Link geöffnet wird: **Neuer Tab** (`_blank`), **Gleicher Tab** (`_self`), **Übergeordneter Frame** (`_parent`), **Oberster Frame** (`_top`). |
| **Dezimaltrennzeichen** | *(Nur Zahlenformat)* Zeichen zur Trennung von Dezimalzahlen, z. B. `.` oder `,`. Leer lassen, um das Standardzeichen des Browsers zu verwenden. |
| **Tausendertrennzeichen** | *(Nur Zahlenformat)* Zeichen zur Trennung von Tausendern, z. B. `,` oder `.`. Für kein Trennzeichen leer lassen. |
| **Tausendertrennzeichen** | *(Nur Zahlenformat)* Zeichen zum Trennen von Tausendern, z. B. `,` oder `.`. Für kein Trennzeichen leer lassen. |
| **Farbe (ausgewählt)** | *(Nur Boolesche Werte)* Farbe des Kontrollkästchens, wenn der Wert wahr ist. |
| **Farbe (nicht ausgewählt)** | *(Nur Boolesche Werte)* Farbe des Kontrollkästchens, wenn der Wert „falsch“ ist. |
| **Datums-/Zeitformat** | *(Nur Datums-/Zeitformat)* **Datum/Zeit** (Datum und Uhrzeit), **Datum** (nur Datum), **Uhrzeit** (nur Uhrzeit), **Benutzerdefiniertes Format** (geben Sie Ihr eigenes Muster ein). |
| **Benutzerdefiniertes Format** | *(Nur benutzerdefinierte Datums- und Uhrzeitangaben)* Formatmuster - siehe die unten stehende Token-Tabelle. |
| **Sortierbar** | Fügt der Spaltenüberschrift einen Sortierpfeil hinzu, auf den Benutzer klicken können. |
| **Filter aktivieren** | Fügt der Spaltenüberschrift ein Filtersymbol hinzu. Durch Klicken darauf wird eine Checkliste geöffnet, um Zeilen nach Wert ein- oder auszublenden. |

#### Benutzerdefinierte Datums- und Zeitformat-Tokens
| Token | Bedeutung | Beispiel |
|-------|---------|---------|
| `YYYY` | 4-stellige Jahreszahl | `2025` |
| `MM` | Monat (mit führender Null) | `07` |
| `M` | Monat (ohne führende Null) | `7` |
| `DD` | Tag (mit führender Null) | `04` |
| `D` | Tag (ohne führende Null) | `4` |
| `hh` | Stunden (mit führender Null) | `09` |
| `h` | Stunden (ohne führende Null) | `9` |
| `mm` | Minuten (mit führender Null) | `05` |
| `ss` | Sekunden (mit führender Null) | `00` |
| `sss` | Millisekunden | `123` |
| `WD` | Kurzname für Wochentage | `Mon` |
| `WDL` | Wochentagsname (vollständig) | `Monday` |
| `KW` | Kalenderwoche (mit führender Null) | `27` |
| `K` | Kalenderwoche (ohne führende Null) | `27` |
| `K` | Kalenderwoche (ohne führende Null) | `27` |

Beispiel: `DD.MM.YYYY hh:mm` → `04.07.2025 09:05` Beispiel: `WDL, YYYY (KW/52)` → `Friday, 2025 (27/52)`

---

### Zeilenfarbbedingungen
Sie können die Hintergrundfarbe einer Zeile automatisch anhand des Werts einer bestimmten Zelle ändern. Dies eignet sich hervorragend, um wichtige oder bemerkenswerte Zeilen hervorzuheben.

| Hintergrund | Funktion |
|---------|-------------|
| **Anzahl der Bedingungen** | Wie viele Farbregeln sollen hinzugefügt werden? |
| **Spaltenschlüssel oder Index** | Der JSON-Schlüsselname oder ein (0-basierter) Spaltenindex zur Auswertung. |
| **Vergleichsoperatoren** | Vergleichsmethoden: **Gleich**, **Ungleich**, **Größer**, **Kleiner**, **Größer gleich**, **Kleiner gleich**. |
| **Wert** | Der Wert, mit dem verglichen werden soll. |
| **Zeilenfarbe** | Hintergrundfarbe, die auf die gesamte übereinstimmende Zeile angewendet wird. |
| **Wertfarbe (gesamte Zeile)** | Textfarbe, die auf alle Zellen in der entsprechenden Zeile angewendet wird. |
| **Wertfarbe (nur Spalte)** | Textfarbe, die nur auf die Zelle in der Bedingungsspalte angewendet wird. |

Die erste übereinstimmende Bedingung gewinnt. Alle anderen Zeilenfarben (abwechselnd gerade/ungerade) werden durch eine übereinstimmende Bedingung überschrieben.

---

### Inventwo - Tabelle
| Hintergrund | Funktion |
|---------|-------------|
| **Hintergrund der Kopfzeile** | Hintergrundfarbe der Kopfzeile. |
| **Hintergrundfarbe ungerader Zeilen** | Hintergrundfarbe der ungeraden Zeilen (1., 3., ...). |
| **Hintergrund gerader Zeilen** | Hintergrundfarbe der geraden Zeilen (2., 4., ...). |
| **Kopfzeilenhöhe** | Höhe der Kopfzeile in Pixeln. |
| **Spaltenhöhe** | Höhe jeder Datenzeile in Pixeln. |
| **Seitennummerierungshöhe** | *(Nur Seitennummerierung)* Höhe der Seitennummerierungsleiste in Pixeln. |
| **Dicke der Kopfzeile** | Dicke des unteren Randes der Kopfzeile. |
| **Farbige Kopfzeile** | Untere Rahmenfarbe der Kopfzeile. |
| **Dicke** | Dicke des unteren Randes jeder Datenzeile. |
| **Farbe** | Untere Rahmenfarbe der Datenzeilen. |

---

### Inventwo - Radius der Begrenzungslinie
Rundet die Ecken des Tabellencontainers ab. Individuell einstellbar für oben links, oben rechts, unten rechts und unten links. Verwenden Sie **Von Widget**, um die Ecken eines anderen Tabellen-Widgets zu kopieren.

---

### Inventwo - Border
Fügt dem Tabellencontainer einen äußeren Rahmen hinzu. Rahmenstil (durchgezogen, gestrichelt, gepunktet usw.), Seitenlänge und Farbe festlegen. Verwenden Sie **Von Widget**, um einen Rahmen aus einem anderen Tabellen-Widget zu kopieren.

---

### Inventwo - Äußerer Schatten
Fügt dem Tabellencontainer einen Schlagschatten hinzu. X- und Y-Versatz, Unschärfe, Größe und Farbe festlegen. Verwenden Sie **Von Widget**, um einen Schatten aus einem anderen Tabellen-Widget zu kopieren.

---

## Tipps
- **Beginnen Sie mit automatischen Spalten:** Lassen Sie **Spaltenanzahl** zunächst auf 0, um die Rohdaten anzuzeigen. Erhöhen Sie den Wert anschließend, um Titel, Reihenfolge und Formatierung zu steuern.
- **Temperatur mit Einheit:** Stellen Sie das Spaltenformat auf **Zahl**, die Dezimalstellen auf 1 und das Suffix auf ` °C` ein - die Zelle zeigt dann `21,3 °C` an.
- **Bildspalte:** Wenn eine JSON-Eigenschaft eine URL zu einem Bild enthält, setzen Sie das Spalten-**Format** auf **Bild**, und die Zelle rendert das Bild direkt.
- **Linkspalte:** Enthält eine JSON-Eigenschaft eine URL, setzen Sie das Spalten-**Format** auf **URL**, um einen anklickbaren Link zu erzeugen. Mit **Linkziel** steuern Sie, ob der Link in einem neuen oder im selben Tab geöffnet wird.
- **Summenzeile:** Fügen Sie Ihre Summen als letzte Zeile in das JSON-Array ein und aktivieren Sie **Summenzeile**, um sie durch eine doppelte Linie zu trennen.
- **Große Datensätze:** Aktivieren Sie die **Paginierung** und legen Sie die **Zeilen pro Seite** fest, um große Tabellen lesbar zu halten, anstatt Hunderte von Zeilen scrollen zu müssen. Die **Maximale Zeilenanzahl** gilt weiterhin als Obergrenze vor der Paginierung.
- **Standardmäßige Sortierung:** Geben Sie den JSON-Schlüssel in der **Spalte "Standardmäßig sortieren"** ein (z. B. `temp`), um die Tabelle beim Laden der Ansicht vorzusortieren.

---

## Siehe auch
- [Dropdown-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md) - zur Auswahl aus einer Liste vordefinierter Werte
- [Wertlisten-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md) - für einfache Stichpunktlisten aus Textwerten