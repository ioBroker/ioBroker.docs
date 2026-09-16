---
title:       "Material Design"
lastChanged: "09.09.2026"
---

# Material-Design-Widgets

**Material Design** ist der umfangreichste Widgetsatz, den ioBroker kennt: rund
fünfzig Bausteine nach Googles gleichnamiger Gestaltungsrichtlinie, dazu ein
durchgängiges Farbschema, ein eigener Symbolvorrat und Diagramme. Viele der
Visualisierungen, die man in der Gemeinschaft zu sehen bekommt, sind damit
gebaut.

![Material Design](media/widgets/vis-materialdesign.jpg)

## Zwei Adapter

Den Satz gibt es zweimal, und die Unterscheidung ist wichtig:

| Adapter | Für | Stand |
| --- | --- | --- |
| [`vis-materialdesign`](/adapters/vis-materialdesign) | vis 1; läuft auch in vis-2, sieht dort aber aus wie in vis 1 | 06/2021, wird nicht mehr weiterentwickelt |
| [`vis2-materialdesign`](/adapters/vis2-materialdesign) | vis-2, dort direkt eingebaut und dem Thema folgend | seit 09/2026 |

Die zweite Fassung stammt von typhosj und beruht auf der Arbeit von Scrounger.
Sie deckt die Bausteine der ersten weitgehend ab und ergänzt sie um
*Advanced View in Widget* und einen Schieberegler als Symbolknopf.

?> **Für neue Projekte in vis-2** ist `vis2-materialdesign` die richtige Wahl.
`vis-materialdesign` bleibt sinnvoll für bestehende vis-1-Projekte und für
Seiten, die schon damit gebaut wurden. Beide gleichzeitig zu installieren,
bringt nichts und verlängert nur die Ladezeit.

## Was drin ist

### Knöpfe

Das Herzstück des Satzes und der Grund für die große Zahl: Es gibt sechs
Knopfarten, und jede davon in drei Bauformen: waagerecht beschriftet,
senkrecht beschriftet und als reines Symbol.

| Knopfart | Was er tut |
| --- | --- |
| **Navigation** | wechselt auf eine andere Ansicht |
| **Link** | öffnet eine Adresse im Browser |
| **State** | schreibt einen festen Wert in einen Datenpunkt |
| **State Multi** | schaltet reihum durch mehrere Werte |
| **Addition** | zählt einen Wert um einen Betrag hoch oder herunter |
| **Toggle** | schaltet zwischen zwei Werten um |

### Eingeben und einstellen

| | Widget | Wofür |
| --- | --- | --- |
| ![Input](media/widgets/vis-materialdesign/input.jpg) | **Input** | Textfeld für Zeichenketten und Zahlen |
| ![Autocomplete](media/widgets/vis-materialdesign/autocomplete.jpg) | **Autocomplete** | Eingabefeld mit Vorschlagsliste |
| ![Select](media/widgets/vis-materialdesign/select-value.jpg) | **Select** | Klappfeld für Werte, auch als Ja/Nein-Fassung |
| | **Switch**, **Checkbox** | Kippschalter und Ankreuzfeld |
| | **Slider**, **Slider Round** | Schieberegler, gerade oder als Ring |

### Anzeigen

| | Widget | Wofür |
| --- | --- | --- |
| | **Value** | ein Wert mit Einheit, Symbol und Farbe |
| | **Progress**, **Progress Circular** | Fortschritt als Balken oder Ring |
| ![List](media/widgets/vis-materialdesign/list.jpg) | **List** | Liste mit Symbol, Text und Bedienelement je Zeile |
| ![Icon List](media/widgets/vis-materialdesign/iconlist.jpg) | **Icon List** | Kachelgitter aus Symbolen |
| ![Table](media/widgets/vis-materialdesign/table.jpg) | **Table** | Tabelle aus einem JSON-Datenpunkt |
| ![Alerts](media/widgets/vis-materialdesign/alerts.jpg) | **Alerts** | farbige Hinweisleiste für Meldungen |
| | **Calendar** | Monats- und Terminübersicht |
| ![Icon](media/widgets/vis-materialdesign/icon.jpg) | **Material Design Icon** | ein einzelnes Symbol aus dem mitgelieferten Vorrat |
| | **HTML Card** | eigener HTML-Inhalt in einer Karte |

### Diagramme

| | Widget | Wofür |
| --- | --- | --- |
| ![Line History Chart](media/widgets/vis-materialdesign/line-history-chart.jpg) | **Line History Chart** | Verlaufskurve aus aufgezeichneten Werten |
| ![JSON Chart](media/widgets/vis-materialdesign/json-chart.jpg) | **JSON Chart** | Diagramm aus frei gelieferten Daten |
| | **Bar Chart**, **Pie Chart** | Balken- und Tortendiagramm |

### Seitenaufbau

| | Widget | Wofür |
| --- | --- | --- |
| ![Top App Bar](media/widgets/vis-materialdesign/top-app-bar-nav-drawer.jpg) | **Top App Bar** | Kopfleiste mit ausfahrbarem Menü; der übliche Rahmen einer Seite |
| ![Dialog](media/widgets/vis-materialdesign/dialog-view.jpg) | **Dialog**, **Dialog iFrame** | öffnet eine Ansicht oder eine fremde Seite als Fenster |
| ![Masonry Views](media/widgets/vis-materialdesign/masonry-views.jpg) | **Masonry Views** | setzt mehrere Ansichten als versetzte Kacheln zusammen |
| ![Grid Views](media/widgets/vis-materialdesign/grid-views.jpg) | **Grid Views** | dasselbe als gleichmäßiges Gitter |

### Hilfsmittel

| | Widget | Wofür |
| --- | --- | --- |
| ![Color Schemes](media/widgets/vis-materialdesign/color-schemes.jpg) | **Preview Color Schemes** | zeigt die eingestellten Farben zur Kontrolle an |
| ![Version](media/widgets/vis-materialdesign/version.jpg) | **Installed Version** | nennt die installierte Fassung des Satzes |

## Farben und Schriften

Der Satz bringt ein eigenes Farbschema für hell und dunkel mit, das für alle
Widgets zugleich eingestellt wird, nicht pro Widget. Die Einstellungen stehen
in der Instanz des Adapters. Das Widget *Preview Color Schemes* zeigt das
Ergebnis auf der Seite an, ohne dass jedes Element einzeln geprüft werden muss.

Die Schriftarten werden ebenfalls dort gewählt. Sollen Google-Schriften zur
Auswahl stehen, muss zusätzlich
[`vis-google-fonts`](/adapters/vis-google-fonts) installiert sein.

## Worauf zu achten ist

**Ladezeit.** Der Satz ist groß. Auf einem Wandtablet oder einem älteren
Telefon macht sich das beim ersten Öffnen einer Seite bemerkbar. Wer nur
wenige Bausteine braucht, fährt mit einem kleineren Satz besser.

**Verlaufsdaten.** *Line History Chart* braucht einen Aufzeichnungsadapter,
siehe [Werte aufzeichnen](/docs/tutorial/history.md).

**Die alte Fassung in vis-2.** `vis-materialdesign` lässt sich in vis-2
verwenden, folgt dort aber weiterhin seinem eigenen Farbschema. Auf einer
Seite, die sonst Material-Widgets benutzt, fällt das auf.
