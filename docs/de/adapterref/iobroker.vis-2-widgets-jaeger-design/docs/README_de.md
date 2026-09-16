---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md"},"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md
title: Spezielle Jaeger Design-Widgets für ioBroker.vis 2.0
hash: ubglOi+4ilw7XP8I0dZPmzF6vYBD+F5cU60ShwNrVFY=
---
![Logo](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
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