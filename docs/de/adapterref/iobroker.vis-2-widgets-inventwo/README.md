---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: inventwo Widgets für ioBroker vis 2.0
hash: uwt5jMB8uAYM3LrexP18oyBDqY11AhZW2vy3zF+ZR+A=
---
![Logo](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Inventwo Widgets für ioBroker vis 2.0
---

## Um
Eine Sammlung hochgradig anpassbarer Widgets für **ioBroker vis 2.0** – entwickelt für Anwender, die die volle Kontrolle über das Erscheinungsbild ihrer Dashboards wünschen. Jedes Widget bietet umfangreiche Gestaltungsoptionen und integriert sich nahtlos in die ioBroker-Datenpunkte.

📖 **[Benutzerdokumentation](docs/README.md)** — Ausführliche Anleitungen für alle Widgets, Einstellungen und Beispiele.

---

## Widgets
| Widget | Beschreibung |
|---|---|
| [Universal](#widget---universal) | All-in-One-Widget: Schalter, Schaltfläche, Navigation, schreibgeschütztes Display, Farbauswahl, analoge Uhr und mehr |
| [Radialschieber](#widget---radial-slider) | Kreisbogen-Schieberegler mit konfigurierbaren Winkeln, Spur- und Daumen-Design |
| [Schalten](#widget---switch) | Kippschalter mit benutzerdefinierten Beschriftungen und Spur-/Daumenfarben |
| [Kontrollkästchen](#widget---checkbox) | Kontrollkästchen mit benutzerdefinierten Wahr/Falsch-Werten und Beschriftungspositionierung |
| [Tisch](#widget---table) | Dynamische JSON-Datentabelle mit Sortierung, Filterung und bedingten Zeilenfarben |
| [Runterfallen](#widget---dropdown) | Dropdown-Auswahl, automatisch aus ioBroker-Objektzuständen befüllt |
| [Festzelt](#widget---marquee) | Lauftext-Ticker mit einstellbarer Geschwindigkeit, Richtung und Abstand |
| [Werteliste](#widget---value-list) | Aufzählungspunkte, die aus einem Textwert oder Datenpunkt generiert wurden |
| [Werteliste](#widget---value-list) | Stichpunktliste, die aus einem Textwert oder Datenpunkt generiert wird |

---

## Widget - Universell
Das Flaggschiff-Widget dieses Adapters – ein einzelnes Widget, das als Schalter, Schaltfläche, Navigationselement, schreibgeschütztes Display und vieles mehr fungieren kann.

![Vorschau des universellen Widgets](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_universal_widget.png)

### Interaktionstypen
- **Schalter** – schaltet einen Datenpunkt zwischen zwei Werten um
- **Taste** – Setzt beim Drücken einen Wert; optional hält sie den Wert, solange die Taste gedrückt wird, und setzt ihn beim Loslassen zurück.
- **Navigation** – navigiert per Klick zur Vis-Ansicht.
- **Schreibgeschützt** – zeigt einen Wert ohne Interaktion an
- **Ansicht im Dialog** – öffnet eine Vis-Ansicht in einem modalen Dialog
- **Wert erhöhen/verringern** – erhöht oder verringert einen numerischen Datenpunkt
- **HTTP-Anfrage / URL öffnen** – sendet eine HTTP-Anfrage oder öffnet eine URL (im selben Tab oder in einem neuen Tab)

### Anzeigemodi
- **Einzelner Button** – ein Widget mit einem oder mehreren Zuständen
- **Getrennte Schaltflächen** – jeder Zustand wird als eigene Schaltfläche dargestellt (ersetzt die klassische Optionsfeldliste)

### Inhaltstypen
Mehrere Inhaltselemente können pro Bundesland frei kombiniert werden:

![Vorschau der Inhaltstypen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_types.png)

- **Text / HTML** – statische oder dynamische Bezeichnung
- **Symbol** – ioBroker-Symbolbibliothek
- **Bild** – lokales oder entferntes Bild mit konfigurierbarem Maßstab, Position und Füllmodus
- **Ansicht im Widget** – Eine weitere Vis-Ansicht direkt in das Widget einbetten
- **Farbauswahl** – vollumfängliche Farbauswahl (HEX, HEX8, RGB, HSL, HSV, CIE) mit konfigurierbarer Komponentensichtbarkeit

![Farbauswahl-Vorschau](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_colorpicker.png)

- **Analoguhr** – SVG-Analoguhr mit konfigurierbarem Zifferblattdesign, Teilstrichen, Zahlen und Zeigern

![Vorschau der analogen Uhr](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_type_clock_analog.png)

### Weitere Funktionen
- Mehrere Bundesstaaten mit jeweils individuellem Styling
- Klick-Feedback-Animation
- Vergleich bedingter Zustände (nach Wert oder anderen Kriterien)
- Konfigurierbare Dialogoptionen (Vollbildmodus, Schließen bei Klick außerhalb des Bildschirms, automatischer Schließtimer)

### Design
Jeder Aspekt des Widgets ist anpassbar:

![Vorschau der CSS-Anpassung](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_css_customization.png) ![Vorschau der Designbeispiele](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

Ausführliche Konstruktionsbeispiele finden Sie in [Hier](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/universal-widget-design-examples.md).

### Polygonformen
Widgets sind nicht auf Rechtecke beschränkt. Mit der **Form**-Einstellung können Sie aus integrierten Polygonformen auswählen oder eine vollständig benutzerdefinierte Kontur definieren:

| Form | Beschreibung |
|-------|-------------|
| Rechteck | Standard — Standard-Rechteckkarte |
| Dreieck | Gleichseitiges Dreieck |
| Raute | Vierseitiges gedrehtes Quadrat |
| Fünfeck | 5-seitiges Polygon |
| Sechseck | 6-seitiges Polygon – perfekt für Wabenmuster |
| Siebeneck | Polygon mit 7 Seiten |
| Achteck | Polygon mit 8 Seiten |
| Stern | Fünfzackiger Stern |
| **Benutzerdefiniert** | Beliebiges Polygon – Schnittpfadpunkte manuell eingeben |

![Formen in der Vorschau anzeigen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_shapes.png)

**Weitere Formoptionen:**

- **Rotation** (0–359°) — Dreht jedes integrierte Polygon um einen beliebigen Winkel
- **Eckenradius** (0–30) — rundet alle Eckpunkte gleichmäßig mit Bézierkurven ab; funktioniert für jede Form, auch für benutzerdefinierte.
- **Benutzerdefinierte Polygonpunkte** — durch Kommas getrennte `X% Y%`-Paare im Uhrzeigersinn, z. B. `40% 0%, 100% 50%, 40% 100%, 0% 50%` · Pfade visuell erstellen unter [https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)

Alle vorhandenen Funktionen – Innen-/Außenschatten, Rahmen, Farbverläufe im Hintergrund, Klick-Feedback – funktionieren mit jeder Form.

> **Beispiel:** Sechseckiges Waben-Dashboard → [docs/example-views/hexagonal-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/hexagonal-view.md) > **Beispiel:** Rechteckiges Dashboard → [docs/example-views/rectangle-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/rectangle-view.md)

---

## Widget - Schieberegler
Ein horizontaler oder vertikaler Schieberegler zur Steuerung numerischer Datenpunkte.

![Vorschau-Slider](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_sliders.png)

**Hauptmerkmale:**

- Horizontale und vertikale Ausrichtung
- Konfigurierbare Minimal-, Maximal- und Schrittwerte (automatisch aus dem Datenpunktobjekt gelesen)
- Optionale Min-/Max-Wert-Beschriftungen
- Schrittanzeige (automatische oder benutzerdefinierte Schrittwerte)
- Schritte können innerhalb der Schiebeleiste platziert werden.
- **Nur-Lese-Modus** – zeigt einen Wert an, ohne Interaktion zu ermöglichen
- Unterstützung für Farbverläufe für Schienen und aktive Schienen (beliebige CSS-Farbzeichenfolge einschließlich `linear-gradient(...)`)
- Individuelle Gestaltung von Spur, aktiver Spur und Daumen inklusive Schatteneffekten

---

## Widget - Radialer Schieberegler
Ein kreisförmiger Schieber als elegante Alternative zum klassischen linearen Schieber.

![Radialschieberegler in der Vorschau](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-radial-slider.png)

**Hauptmerkmale:**

- Frei konfigurierbarer Start- und Endwinkel
- Konfigurierbare Spurbreite, Spurfarbe und aktive Spurfarbe
- Optionale Wertanzeige in der Mitte mit Schriftgröße und -farbe
- Optionale Beschriftung unterhalb des Wertes
- Daumengröße und -farbe
- Schatteneffekte für Spur und Daumen

---

## Widget - Schalter
Ein Kippschalter für boolesche oder zweistufige Datenpunkte.

![Vorschau-Schalter](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_switches.png)

**Hauptmerkmale:**

- Benutzerdefinierte Wahr/Falsch-Werte (nicht beschränkt auf boolesche Werte)
- Individuelle Textbezeichnungen für jeden Staat
- Position der Beschriftung: oben, unten, Anfang oder Ende
- Vollständig anpassbare Track- und Daumenfarben (einschließlich Farbverläufe)
- „Vom Widget“-Styling – Styling von einem anderen Schalter-Widget übernehmen

---

## Widget - Kontrollkästchen
Eine Checkbox für boolesche oder zweistufige Datenpunkte.

![Vorschau-Kontrollkästchen](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_checkbox.png)

**Hauptmerkmale:**

- Benutzerdefinierte Wahr/Falsch-Werte
- Individuelle Textbezeichnungen für jeden Staat
- Position der Beschriftung: oben, unten, Anfang oder Ende
- Anpassbare Farben und Größe der Box und der aktiven Box

---

## Widget - Tabelle
Eine dynamische Datentabelle, die JSON-Objekte aus einem ioBroker-Datenpunkt rendert.

![Vorschautabelle](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_table.png)

**Hauptmerkmale:**

- Konfigurierbare Spalten: Schlüssel, Titel, Präfix, Suffix, Platzhalter
- Spaltenwertformate: Text, Zahl (mit Dezimalstellen), Datum/Uhrzeit, Bild
- Sortierbare Spalten mit ein- oder **mehrspaltiger Sortierung**
- **Spaltenfilter** – Zeilen nach Spaltenwert filtern
- **Fixierter Header** – Der Header bleibt beim Scrollen sichtbar.
- Standard-Sortierkonfiguration (Spalte und Richtung)
- Maximale Zeilenanzahl
- **Bedingte Zeilenfarben** – Hervorhebung von Zeilen basierend auf Spaltenwertbedingungen
- Anpassbare Kopfzeilen- und Zeilenformatierung (Hintergrund, Höhe, Rahmen)

---

## Widget - Dropdown
Ein Dropdown-Auswahlfeld, dessen Optionen automatisch aus der `common.states`-Eigenschaft eines ioBroker-Objekts befüllt werden.

![Vorschau-Dropdown](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-dropdown.png)

**Hauptmerkmale:**

- Optionen werden automatisch aus den definierten Zuständen des Datenpunkts geladen.
- Die Optionen können einen Wert, eine Textbezeichnung oder beides anzeigen.
- Optionaler Titel über dem Dropdown-Menü
- **Nur-Lese-Modus**
- **Bedingte Hintergrundfarbe** – ändert den Hintergrund des Dropdown-Menüs basierend auf den Wertbedingungen (mit optionaler Anwendung auf den Titel)
- Anpassbare Schriftart, Textfarbe, Hintergrund, Hervorhebungsfarbe, Rahmen (Breite, Farbe, Radius) und Schatten
- Individuelle Titelgestaltung (Schriftgröße, Farbe, Innenabstand)

---

## Widget - Laufschrift
Ein horizontal scrollender Textticker – ideal zur Anzeige langer Textwerte oder Benachrichtigungen.

**Hauptmerkmale:**

- Datenpunkt oder statischer Text als Quelle
- Scrollrichtung: links oder rechts
- Konfigurierbare Scrollgeschwindigkeit (px/s)
- Konfigurierbare Anzahl von Textkopien (verhindert Lücken bei kurzen Texten)
- Konfigurierbarer Abstand zwischen Kopien
- **Pause beim Überfahren mit der Maus**
- Unterstützung für Hintergrundfarben
- Übernimmt die Schriftformatierung von den Einstellungen des Vis-Widgets.

---

## Widget - Werteliste
Erstellt eine Stichpunktliste aus einem einzelnen Textwert – entweder aus einem Datenpunkt oder manuell eingegeben.

**Hauptmerkmale:**

- Datenpunkt oder manuelle Texteingabe als Quelle
- Frei konfigurierbares Trennzeichen — beliebiges Zeichen oder Zeichenkette:
- Komma: `,`
- Semikolon: `;`
- Zeilenumbruch: `\n`
- Tab: `\t`
- Jede andere benutzerdefinierte Zeichenfolge
- Entfernen von führenden/nachfolgenden Leerzeichen pro Eintrag
- Filtern leerer Elemente
- Aufzählungszeichentypen: `•` Kreis, `○` Kreis, `▪` Quadrat, `–` Strich, `›` Pfeil, `1. 2. 3.` Nummeriert, Keine, Benutzerdefiniertes Zeichen
- Individuelle Punktfarbe, unabhängig von der Textfarbe
- Textfarbe, Hintergrund, Schriftgröße, Textausrichtung
- Konfigurierbarer Abstand zwischen Aufzählungszeichen und Text
- Konfigurierbarer Zeilenabstand zwischen Elementen
- Innenpolsterung

---

## Ältere Änderungen
Kann in [CHANGELOG_OLD.md](CHANGELOG_OLD.md) gefunden werden

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.7.0 (2026-06-24)
- Dropdown Widget: Added support for manually defined value/label pairs as an alternative to OID-based state enumeration

### 1.6.0 (2026-06-19)
- Universal Widget: Fixed navigation active state not updating correctly when nav buttons are placed inside a "View in Widget"
- Table Widget: Empty JSON array now renders a "No data" row regardless of column configuration, instead of an empty or broken table structure
- Marquee Widget: Added vertical scroll directions "Up" and "Down" in addition to the existing "Left" and "Right"

### 1.5.0 (2026-06-13)
- Table Widget: Added "URL" column format for clickable links with configurable target
- Table Widget: Added "Sum row" option to visually separate the last row with a double border
- Universal Widget: Added "Corner style" – switch between rounded and chamfered (45 degree bevel) corners
- Table Widget: Added "Formula" field per column to compute values from row fields (e.g. price * qty)
- Slider Widget: Added "Title" and "Unit" fields
- Dropdown Widget: Fixed border radius; added "Widget shadow" for the entire widget container

### 1.4.0 (2026-06-04)
- Universal Widget: Added "RGB (Scaled)" color model for the color picker – supports configurable value ranges (e.g. 0–1023 for 10-bit RGB controllers)
- Universal Widget: Added optional password/PIN protection for navigation buttons
- Universal Widget: Added per-state content mirror option (inherit from content style / yes / no)
- Table Widget: Added configurable decimal and thousand separators for number format columns
- Table Widget: Added value color to row conditions (in addition to row background color)
- Table Widget: Added boolean column format displaying a readonly checkbox with optional configurable checked/unchecked colors
- Table Widget: Added comparison operator selection to row conditions (equal, not equal, greater, less, greater/less equal)
- Table Widget: Added value color per row condition – applicable to the whole row or to the condition column only

### 1.3.0 (2026-06-03)
- Slider: Added configurable value label display (always/on drag/never) and step marks position (above/below)
- Universal: Added "Disable click when active" option per state
- Universal: Fixed color picker components not updating when toggled in the editor
- Added links to widget documentation in widget settings

## License
The MIT License (MIT)

Copyright (c) 2025-2026 jkvarel <jk@inventwo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.