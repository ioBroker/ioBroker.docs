---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: inventwo Widgets für ioBroker vis 2.0
hash: vc9zv0BabEWJ+aMkiFqdV38JvhSJ+yB8bWd0YNAzcVI=
---
![Logo](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Inventwo Widgets für ioBroker vis 2.0
---

## Um
Eine Sammlung hochgradig anpassbarer Widgets für **ioBroker vis 2.0** – entwickelt für Anwender, die die volle Kontrolle über das Erscheinungsbild ihrer Dashboards wünschen. Jedes Widget bietet umfangreiche Styling-Optionen und integriert sich nahtlos in die ioBroker-Datenpunkte.

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

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-05-17)
- Universal Widget: Add polygon shape support (triangle, diamond, pentagon, hexagon, heptagon, octagon, star) with configurable rotation and corner radius

### 0.9.0 (2026-05-17)
- Added document with example designs for universal widget
- Marquee widget: new scrolling text widget with configurable speed, direction, loop count, gap and pause-on-hover (#5)
- Dropdown widget: optional conditional background color on title, configurable title padding (top, bottom, left, right) (#246)
- Value List widget: new widget that renders a bullet-point list from a text value (datapoint or manual), with configurable separator, bullet type, colors, spacing and padding (#2)

### 0.8.0 (2026-05-15)
- Slider widget: added read-only mode, gradient support for colors and an option to place steps inside the slider bar (#244)
- Dropdown widget: added conditional background color (#198), read-only mode (#201) and option to show value without text (#201)
- Table widget: added multi-column sort (#234)

### 0.7.2 (2026-04-26)
- Fix button click and hold for mobile devices (#192)

### 0.7.1 (2026-04-24)
- Fixed table widget fixed header not working

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