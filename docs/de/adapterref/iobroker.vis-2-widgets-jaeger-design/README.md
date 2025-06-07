---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: Spezielle Jaeger Design-Widgets für ioBroker.vis 2.0
hash: ww2pwFXi5G9qk35KbU8FU+RCGd8leK5XMwH7ajEJbwQ=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)

# Spezielle Jaeger Design-Widgets für ioBroker.vis 2.0
![YouTube](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/youtube.jpg)

Hier finden Sie Videos zur Verwendung der Widgets [Hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) (auf Deutsch).

Videos wie die Widgets benutzt werden können, kann man [hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden.

Für die deutsche Version siehe [hier](docs/README_de.md)

## Kommerzielle Nutzung
Bitte beachten Sie, dass es keine kostenlose Version dieses Adapters gibt. Für die Nutzung dieser Widgets ist eine Lizenz erforderlich (aktueller Preis: 50 € inkl. MwSt.).
Sie können die Widgets jedoch kostenlos installieren und im Editor ausprobieren.

## Übersicht zur Erstellung einer Smart Home Schnittstelle mit dem „VIS-2 JAEGER Design Adapter“
### Anforderungen
- Ein ioBroker-System
- Der JAEGER Design Adapter (ca. 50 €)
- Grundkenntnisse in der Verwendung von ioBroker

### Einführung
Der JAEGER Design Adapter basiert auf dem vis-2 Adapter und ermöglicht die Erstellung einer Oberfläche per Click & Drop. Verschiedene Widgets lassen sich hinzufügen und individuell anpassen, um Smart-Home-Geräte zu steuern.

### Grundstruktur der Schnittstelle
Die Schnittstelle besteht aus mehreren Bereichen:

- **Hauptmenü**: Auf der linken Seite befindet sich eine Spalte mit Hauptmenüpunkten, die einfach erstellt werden können.
- **Statusleiste**: Oben können Sie verschiedene wichtige Statusanzeigen hinzufügen.
- **Mittlerer Bereich**: Hier können Szenen, Aktionen und Benachrichtigungen angezeigt werden. Die rechte Seite ist frei konfigurierbar und kann Informationen wie Sicherheit, Wetter, Haushaltsgeräte und Energieverbrauch anzeigen.

  ![iobroker Schnittstellen1](https://github.com/user-attachments/assets/d0323e58-ba6e-455c-8a06-81f9acda9ef9)

### Beleuchtung
Im Hauptmenü können verschiedene Etagen ausgewählt werden. Der Grundriss des Erdgeschosses zeigt alle Leuchten durch Symbole dargestellt. Einige Symbole lassen sich nur ein- oder ausschalten, andere sind dimmbar. Durch Drücken und Halten eines Symbols öffnet sich ein Popup-Fenster mit einem Schieberegler zur Helligkeitsanpassung.

![iobroker-jaeger-design-beleuchtung](https://github.com/user-attachments/assets/7e4a4ee9-b1b4-4ab1-88cb-eddf0a1fc707) Auf der rechten Seite sind Lichtszenen leicht zugänglich und Lichteinstellungen können gespeichert werden: ![iobroker-jaeger-design-beleuchtung_szenen_speichern](https://github.com/user-attachments/assets/d9099048-0d26-4cfb-9b74-04a36b07131b)

### Jalousien
Im Menü „Jalousie“ können Sie den Beschattungsstatus einsehen. Symbole zeigen die Position der Jalousie an. Ein Klick auf ein Symbol öffnet ein Popup-Fenster zur Anpassung von Höhe und Lamellenwinkel.
![Beschattung-iobroker-smarthome](https://github.com/user-attachments/assets/a808b0c2-0e84-4586-b482-3d63b49e4706)

### Energie
Im Menü „Energie“ können Sie die Raumtemperaturen in jedem Raum einsehen. Symbole zeigen die Ist- und Solltemperaturen sowie den Status von Heizung und Fenstern an. Durch Klicken auf ein Symbol öffnet sich ein Popup-Fenster, in dem Sie die Solltemperaturen ändern und weitere Aktionen wie Klimaanlagen oder Warmluftsysteme steuern können.
![iobroker-jaeger-design-raumtemperatur_ueberblick](https://github.com/user-attachments/assets/b34ab5bb-e05a-438f-b0d6-649a34d1dfde)

![iobroker-jaeger-design-raumtemperatur](https://github.com/user-attachments/assets/282f5f01-827c-4976-8cbc-78084f076ac1)

### Sicherheit
Im Menü „Sicherheit“ kann der Status der Fenster eingesehen werden. Geöffnete Fenster werden rot angezeigt.
![iobroker-jaeger-design-sicherheit](https://github.com/user-attachments/assets/9e0234ac-aa0a-4811-b971-ac33237502f5)

### Zusätzliche Funktionen
Sie können auch frei definierte Schnittstellen erstellen, wie z. B. die Verbrauchsanzeige des Verbrauchsadapters oder die Anzeige von Nightscout für Diabetes. Im Menü „Einstellungen“ können verschiedene Einstellungen vorgenommen werden.
![iobroker-jaeger-design-energieüberwachung](https://github.com/user-attachments/assets/92e09c5f-88d9-48b3-b97f-0401a8839946)

![iobroker-jaeger-design-diabetes](https://github.com/user-attachments/assets/39d0a043-6025-4f9d-96f4-e8c9bd2245bd)

![iobroker-jaeger-design-einstellungen](https://github.com/user-attachments/assets/bff91b52-c04e-4482-9dd8-e17a9a7c762c)

### YouTube-Tutorials
Für eine ausführliche Anleitung und weitere Informationen empfiehlt es sich, die verlinkten YouTube-Tutorials anzuschauen.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 1.4.3 (2025-05-31)
* (bluefox) Implemented the full-screen mode for cameras
* (bluefox) Added the possibility of disabling "swipe to open the menu" in the mobile view
* (bluefox) Corrected issue with confirmation dialog for the state widget
* (bluefox) Added settings for submenu width and gap between submenu items

### 1.4.2 (2025-05-25)
* (bluefox) Allowed setting ON value for dimmer
* (bluefox) Allowed inverting values in the popup dialog for shutter and blinds control
* (bluefox) Added the control dialog for state widget
* (bluefox) Allowed setting up the title padding
* (bluefox) Added possibility to show the last change time for scenes

### 1.4.1 (2025-05-20)
* (bluefox) Migrated to TypeScript and vite
* (bluefox) Corrected error with license check

### 1.3.12 (2025-04-29)
* (bluefox) Corrected min/max by thermostat

### 1.3.9 (2024-12-05)
* (bluefox) Corrected confirmation dialog. Close now works
* (bluefox) Caught the possible error in thermostat

### 1.3.6 (2024-12-04)
* (bluefox) Corrected the icon dialog
* (bluefox) Corrected the ID select dialog
* (bluefox) Corrected the scene buttons

### 1.3.3 (2024-11-25)
* (bluefox) Corrected "close on click" option for shutter and dimmer
* (bluefox) Improved the build pipeline

### 1.3.1 (2024-09-23)
* (bluefox) Removed gulp from a build process
* (bluefox) Added the possibility to select camera from the "cameras" adapter

### 1.2.7 (2024-07-17)
* (bluefox) allowed multi-line buttons for the thermostat

### 1.2.6 (2024-07-16)
* (bluefox) Corrected the power state of the thermostat

### 1.2.5 (2024-07-12)
* (bluefox) Added possibility to control other IDs with memory buttons (Dimmer, Shutter)
* (bluefox) Added the power option for thermostat
* (bluefox) Implemented the writing of specific values for state widget
* (bluefox) Added label to state widget

### 1.2.1 (2024-07-07)
* (bluefox) Removed withStyles usage
* (bluefox) Added confirmation dialog

### 1.1.27 (2024-05-27)
* (bluefox) Added descriptions

### 1.1.26 (2024-05-23)
* (bluefox) Corrected font-size of thermostat

### 1.1.22 (2024-05-14)
* (bluefox) Added possibility to show a simple state without a border
* (bluefox) Added possibility to add a caption for some widgets

### 1.1.21 (2024-05-01)
* (bluefox) Changed layout for mobile view

### 1.1.20 (2024-04-09)
* (bluefox) Allowed changing font size for thermostat

### 1.1.19 (2024-03-12)
* (bluefox) Allowed changing the palette for every widget

### 1.1.15 (2024-03-06)
* (bluefox) Improved dimmer widget

### 1.1.14 (2024-02-21)
* (bluefox) Added top info in the mobile view

### 1.1.12 (2024-02-20)
* (bluefox) Corrected some layout issues

### 1.1.10 (2024-01-19)
* (bluefox) Small changes on layout and added new distance settings

### 1.1.8 (2024-01-18)
* (bluefox) Corrected info button in mobile view

### 1.1.5 (2023-12-05)
* (bluefox) Added an option to start action or scene from new line

### 1.1.0 (2023-11-29)
* (bluefox) Corrected license check
* (bluefox) Added class names to all important layout components

### 1.0.12 (2023-11-22)
* (bluefox) Allowed reordering of the actions and scenes
* (bluefox) Added a new option to show scenes before actions
* (bluefox) Added option to show value in dimmer
* (bluefox) Added option for adjustable width of the right view on the home page
* (bluefox) Added option to provide icons for scenes and actions
* (bluefox) Added option set the distance between menu items
* (bluefox) Added possibility to set control value for scenes
* (bluefox) Added possibility to adjust font size for scenes and actions

### 1.0.11 (2023-11-10)
* (bluefox) Corrected error local variables and controls

### 1.0.10 (2023-11-08)
* (bluefox) Corrected error with scenes
* (bluefox) Improved state widget with custom icons

### 1.0.9 (2023-11-07)
* (bluefox) Allowed setting distance between actions and scenes on the home page

### 1.0.8 (2023-11-06)
* (bluefox) Corrected the cameras widget

### 1.0.7 (2023-10-31)
* (bluefox) Added possibility to reorder info on status bar

### 1.0.5 (2023-10-17)
* (bluefox) Corrected error with fakeView

### 1.0.4 (2023-10-10)
* (bluefox) Corrected layout of thermostat

### 1.0.3 (2023-10-10)
* (bluefox) Corrected error if shutter was inverted

### 1.0.2 (2023-09-28)
* (bluefox) Corrected touch behavior for dimmer and shutter

### 1.0.1 (2023-09-26)
* (bluefox) Corrected small issues

### 1.0.0 (2023-08-11)
* (bluefox) Changed style of shutter and state widgets

### 0.6.5 (2023-08-09)
* (bluefox) Corrected view selector and empty menu item

### 0.6.4 (2023-07-31)
* (bluefox) Set constant width and height of thermostat icons

### 0.6.3 (2023-07-25)
* (bluefox) Added many new features

### 0.6.1 (2023-07-21)
* (bluefox) Added max height/width for floors

### 0.6.0 (2023-07-19)
* (bluefox) Corrected some errors with information

### 0.5.2 (2023-07-02)
* (bluefox) Support of false for scenes

### 0.5.0 (2023-06-28)
* (bluefox) Added support for the new vis
* (bluefox) Added page configurable margins

### 0.4.6 (2023-06-19)
* (bluefox) Corrected sub menu

### 0.4.5 (2023-06-13)
* (bluefox) Corrected visualization of view

### 0.4.0 (2023-05-31)
* (bluefox) Added exclusions
* (bluefox) Added possibility to show information on the very top of layout

### 0.3.2 (2023-04-05)
* (bluefox) Corrected license problem

### 0.3.1 (2023-03-22)
* (bluefox) Corrected build process

### 0.3.0 (2023-03-21)
* (bluefox) Implemented dark mode

### 0.2.3 (2023-03-09)
* (bluefox) update packages

### 0.2.2 (2023-03-06)
* (bluefox) Updated thermostat widget

### 0.2.1 (2023-02-03)
* (bluefox) Mobile views tuned

### 0.2.0 (2023-02-01)
* (bluefox) implemented mobile view

### 0.1.3 (2023-01-30)
* (bluefox) initial commit

## License
Copyright (c) 2022-2025 bluefox <dogafox@gmail.com>
All rights reserved.