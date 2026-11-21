---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md"},"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md
title: Spezielle Jaeger Design-Widgets für ioBroker.vis 2.0
hash: knr3QhlUTpEgCguJ4S4evUL0tHdcZkXZDZ27zo7yi6I=
---
![Logo](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Anzahl der Installationen](https://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)

# Spezielle Jaeger Design-Widgets für ioBroker.vis 2.0

![YouTube](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/youtube.jpg)

[Hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden Sie Videos (auf Deutsch), die Ihnen die Verwendung der Widgets erklären.

Videos wie die Widgets verwendet werden können, kann man [hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden.

## Kommerzielle Nutzung

Bitte beachten Sie, dass dieser Adapter keine kostenlose Version bietet. Für die Nutzung der Widgets ist der Erwerb einer Lizenz erforderlich (aktueller Preis: 50 € inkl. MwSt.). Die Installation und das Testen im Editor sind jedoch kostenlos möglich.

## Übersicht zur Erstellung einer Smart Home Oberfläche mit dem „VIS-2 JAEGER Design Adapter“

### Voraussetzungen

- Ein ioBroker-System
- Der Jäger Design Adapter (ca. 50€)
- Grundkenntnisse im Umgang mit ioBroker

### Einführung

Der Jäger Design Adapter basiert auf dem vis-2 Adapter und ermöglicht es, eine Oberfläche per Click and Drop zu gestalten. Verschiedene Widgets können hinzugefügt und angepasst werden, um Smart Home Geräte zu steuern.

### Grundaufbau der Oberfläche

Die Oberfläche besteht aus mehreren Bereichen:

- **Hauptmenü** : Links befindet sich eine Spalte mit den Hauptmenüpunkten, die einfach angelegt werden können.
- **Statusleiste** : Oben können verschiedene wichtige Statusanzeigen hinzugefügt werden.
- **Mittlerer Bereich** : Hier können Szenen, Aktionen und Hinweise angezeigt werden. Die richtige Seite ist frei gestaltbar und kann Informationen wie Sicherheit, Wetter, Hausgeräte und Energieverbrauch anzeigen.![iobroker Schnittstellen1](https://github.com/user-attachments/assets/d0323e58-ba6e-455c-8a06-81f9acda9ef9)

### Beleuchtung

Im Hauptmenü können verschiedene Stockwerke ausgewählt werden. Der Grundriss des Erdgeschosses zeigt alle Lichter, die durch Icons dargestellt werden. Einige Icons können nur ein- oder ausgeschaltet werden, während andere dimmbar sind. Durch längeres Drücken auf ein Icon öffnet sich ein Pop-up-Fenster mit einem Slider zur Einstellung der Helligkeit.![iobroker-jaeger-design-beleuchtung](https://github.com/user-attachments/assets/7e4a4ee9-b1b4-4ab1-88cb-eddf0a1fc707) Beleuchtungsszenen auf der rechten Seite können einfach abgerufen und auch Lichteinstellungen gespeichert werden:![iobroker-jaeger-design-beleuchtung\_szenen\_speichern](https://github.com/user-attachments/assets/d9099048-0d26-4cfb-9b74-04a36b07131b)

### Rollladen

Im Menü „Rollladen“ kann der Zustand der Beschattung eingesehen werden. Icons zeigen die Höhe des Rollladens an, und durch Klicken auf ein Icon öffnet sich ein Pop-up-Fenster zur Einstellung der Höhe und Lamellenneigung.![Beschattung-iobroker-smarthome](https://github.com/user-attachments/assets/a808b0c2-0e84-4586-b482-3d63b49e4706)

### Energie

Im Menü „Energie“ können die Raumtemperaturen in den einzelnen Räumen gesehen werden. Icons zeigen die Ist- und Solltemperaturen sowie den Zustand der Heizung und Fenster an. Durch Klicken auf ein Icon öffnet sich ein Pop-up-Fenster zur Änderung der Solltemperaturen und zur Steuerung weiterer Aktionen wie Klimaanlage oder Warmluftanlage.![iobroker-jaeger-design-raumtemperatur\_ueberblick](https://github.com/user-attachments/assets/b34ab5bb-e05a-438f-b0d6-649a34d1dfde)

![iobroker-jaeger-design-raumtemperatur](https://github.com/user-attachments/assets/282f5f01-827c-4976-8cbc-78084f076ac1)

### Sicherheit

Im Menü „Sicherheit“ kann der Zustand des Fensters gesehen werden. Geöffnete Fenster werden rot dargestellt.![iobroker-jaeger-design-sicherheit](https://github.com/user-attachments/assets/9e0234ac-aa0a-4811-b971-ac33237502f5)

### Weitere Funktionen

Es können auch frei definierte Oberflächen erstellt werden, wie zB die Verbrauchsdarstellung des Adapters „consumption“ oder die Darstellung von Nightscout für Diabetes. Im Menü „Einstellungen“ können diverse Einstellungen vorgenommen werden.![iobroker-jaeger-design-energieüberwachung](https://github.com/user-attachments/assets/92e09c5f-88d9-48b3-b97f-0401a8839946)

![iobroker-jaeger-design-diabetes](https://github.com/user-attachments/assets/39d0a043-6025-4f9d-96f4-e8c9bd2245bd)

![iobroker-jaeger-design-einstellungen](https://github.com/user-attachments/assets/bff91b52-c04e-4482-9dd8-e17a9a7c762c)

### YouTube-Tutorials

Für detaillierte Anleitungen und weitere Informationen wird empfohlen, die verlinkten YouTube-Tutorials anzuschauen.

## Die Widgets

Der Adapter enthält neun Widgets in der Vis-2-Palette, im Satz **Jaeger-Design** . Wenn man in der Palette über ein Widget fährt, steht unter der Vorschau eine kurze Beschreibung.

Alle Widgets teilen sich ein Farbschema. Nur das Layout-Widget trägt das vollständige Schema; Jedes andere Widget übernimmt die Farben entweder von ihm ( _Palette → Vom Widget_ ) oder legt sein eigenes Fest. Fünf Themes sind eingebaut: `green`, `blue`, `green-dark`, `blue-dark` und `aurora` (Nachtblau mit Mint).

### Layout

![Layout-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_layout.png)

Der Rahmen um alles andere. Es gibt die komplette Oberfläche: das Hauptmenü links, die Statusleiste oben, die Etagenauswahl, die Startseite mit Szenen und Aktionen, die frei gestaltbare rechte Spalte und — auf Handy oder Tablet — eine wischbare Schublade statt der Menüspalte.

Es hat ein einziges Attribut, **Einstellungen** , das den Editor öffnet, in dem die ganze Oberfläche beschrieben wird: Menüpunkte, Etagen und ihre Ansichten, Szenen, Aktionen, Info-Gruppen und die Farben. Pro View genau ein Layout-Widget verwenden; Standardmäßig ist die Ansicht vollständig ausgefüllt.

### Zustand

![Status-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_state.png)

Eine quadratische Symboltaste für ein Objekt – der Baustein der Grundrisse. Ein Klick schaltet den Wert um; Mit _bestimmtem Wert schreiben_ wird stattdessen ein festerer Wert geschrieben, und _Anzeigen, ob Wert gesetzt ist,_ hebt den Geschmack hervor, solange dieser Wert aktiv ist.

- **Anzahl der Werte** – mehrere Werte, jeder mit eigenem Symbol, eigener Farbe, Hintergrundfarbe und Tooltip.
- **Steuerungsdialog anzeigen** — statt umzuschalten öffnet sich ein Dialog mit allen Werten.
- **Keine Kontrolle** – nur Anzeige, der Geschmack lässt sich nicht drücken.
- **Nachfragen** vor dem Schreiben, mit eigenem Text.
- Wahlweise eine Beschriftung über oder unter dem Symbol.

### Dimmer

![Dimmer-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_dimmer.png)

Helligkeitssteuerung für eine dimmbare Leuchte. Das Widget selbst zeigt den aktuellen Stand als senkrechten Balken; Langes Drücken ( _Pressdauer für Popup_ ) öffnet das Popup mit dem Regler, aufgeteilt in die eingestellte Anzahl von **Abschnitten** .

- **Speichertasten** – Tasten für feste Helligkeitswerte unter dem Regler, jeweils mit eigenem Symbol und Text. Der Wert kommt entweder aus einem Objekt oder wird direkt geschrieben.
- **Objekt-ID für EIN/AUS** und **Wert für EIN** für Leuchten, deren Ein-/Ausschalter ein eigenes Objekt ist.
- Wahlweise den Wert im Widget anzeigen, das Symbol drehen und das Popup nach dem Setzen schließen.

### Verschluss

![Shutter-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_shutter.png)

Dasselbe Prinzip für Rollladen und Jalousien. Das Symbol zeigt die aktuelle Position, wahlweise als Rollladen-, Jalousien- oder Beschattungssymbol. Mit **Schattenverschluss-ID** kommt ein zweites Objekt für den Lamellenwinkel dazu, sodass Höhe und Lamellen im selben Popup eingestellt werden.

Da Aktoren sich nicht einig sind, was 0 % bedeutet, lassen sich Wert und Anzeige unabhängig voneinander invertieren – getrennt für die Höhe und für die Lamellen. Speichertasten legen Höhe und Lamellenwinkel gemeinsam ab.

### Thermostat

![Thermostat-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_thermostat.png)

Die Wunschtemperatur als Drehanzeige. Der Dialog stellt Temperatur, Luftfeuchtigkeit und Ventilstellung neben den Sollwert und bietet Minus-/Plus-Tasten und einen Regler. Minimum, Maximum, Schrittweite und Einheit sind einstellbar, und als Dezimaltrennzeichen kann ein Komma verwendet werden.

Darunter ist Platz für zusätzliche **Tasten** – Boost, Abwesenheit, Klimaanlage, was die Heizung eben hergibt. Jeder hat ein eigenes Objekt, einen eigenen Wert, ein Symbol, eine Beschriftung und einen eigenen Stil.

### Szene

![Szenen-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_scene.png)

Eine breite Taste mit Titel und Untertitel, die eine Szene des `scenes` -Adapters gestartet oder einfach einen Wert schreibt. Mit **Speichern** kommt rechts ein zweiter Geschmack dazu (das Zahnrad im Bild): Sie schreibt die aktuellen Zustände aller Mitglieder zurück in die Szene.

Weitere Optionen: kein aktiver Zustand, `false` statt `true` Nachfrage, schreiben mit eigenem Text und die Anzeige der letzten Änderungszeit.

### Kameras

![Kameras-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_cameras.png)

Eine Karte mit einem Raster von Kamerabildern. Jede Kamera kommt entweder aus dem `cameras` -Adapter oder von einer kostenlosen URL, die auch von einem Objekt gelesen werden kann, und hat ihr eigenes Aktualisierungsintervall.

_Vollbild zulassen_ öffnet eine einzelne Kamera groß, mit eigener URL und eigenem Intervall für das Vollbild – so können die Vorschaubilder klein bleiben. „Mehr anzeigen“ verlinkt auf ein anderes Widget oder eine andere Seite.

### Aktuelle Nachrichten

![Nachrichten-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_news.png)

Eine Karte mit einem RSS-Feed: Bild, Überschrift und Anriss pro Eintrag, Scrollbar. Die Feed-URL wird direkt eingetragen oder aus einem Objekt gelesen, lässt sich also zur Laufzeit umschalten. Das Aktualisierungsintervall ist einstellbar und „Mehr“ wird auf ein Widget oder eine Seite verlinkt.

### Spieler

![Player-Widget](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_player.png)

Eine Medienspieler-Karte: Titel, Interpret, Cover, Play/Pause, vorheriger/nächster Titel, Zufallswiedergabe, Stummschaltung, ein Lautstärkeregler und der Balken mit abgelaufener und gesamter Spielzeit. Jedes Element hängt an einem eigenen Objekt, das Widget passt damit zu jedem Player-Adapter – Sonos, Squeezebox, Alexa und so weiter. Elemente, deren Objekt leer bleibt, werden nicht angezeigt.