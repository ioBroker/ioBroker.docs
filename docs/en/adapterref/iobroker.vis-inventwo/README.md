![Logo](admin/inventwo.png)
# ioBroker.vis-inventwo

[![NPM version](http://img.shields.io/npm/v/iobroker.vis-inventwo.svg)](https://www.npmjs.com/package/iobroker.vis-inventwo)
![Number of Installations (stable)](http://iobroker.live/badges/vis-inventwo-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)](https://www.npmjs.com/package/iobroker.vis-inventwo)
![Number of Installations (latest)](http://iobroker.live/badges/vis-inventwo-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo/badge.svg)](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo)
[![Build status](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)](https://ci.appveyor.com/project/inventwo/iobroker-vis-inventwo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/inventwo/iobroker.vis-inventwo/LICENSE)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-green.svg)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

[![NPM](https://nodei.co/npm/iobroker.vis-inventwo.png?downloads=true)](https://nodei.co/npm/iobroker.vis-inventwo/)

## Widgets für den ioBroker.vis Adapter

Schalter, Slider, Tabellen, Regler, Checkboxen, Radiobuttons und mehr...<br>
Mit unserem Widgets-Set hast du die freie Wahl individuelle Visualisierungen ganz einfach für dein Smart-Home zu erstellen. 

![Vorschau Universal- & Multi-Widget](https://resources.inventwo.com/github/inventwo/preview_universal_widget.png)

Analog Uhren [Weitere Informationen](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Universal-%26-Multi-Widget-Inhaltstypen)

![Vorschau Analog Uhren](https://resources.inventwo.com/github/inventwo/preview_clocks.png)

Digital Uhren [Weitere Informationen](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Universal-%26-Multi-Widget-Inhaltstypen)

![Vorschau Digital Uhren](https://resources.inventwo.com/github/inventwo/preview_clocks_digital.png)

Colorpicker [Weitere Informationen](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Colorpicker)

![Vorschau Colorpicker](https://resources.inventwo.com/github/inventwo/Preview_Colorpicker.png)

###### .. ab v 2.0.0

<table>
   <tr>
        <td><center><b>Universal<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Universal.gif"></td>
        <td><center><b>Multi<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Multi.gif"></td>
        <td><center><b>Image<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Image.png"></td>
         <td><center><b>Table<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Table.png"></td>
    </tr>
<tr><td colspan=4></td></tr>   
    <tr>
        <td><center><b>List<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/List.png"></td>
        <td><center><b>Marquee<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Marquee.gif"></td>
        <td><center><b>Radio Button<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Radio.gif"></td>
        <td><center><b>Slider<br>vertical</b><br><img src="widgets/vis-inventwo/img/Slider2.gif"></td>
    </tr>
<tr><td colspan=4></td></tr>   
      <tr>
        <td><center><b>Slider<br>horizontal</b><br><img src="widgets/vis-inventwo/img/Slider1.gif"></td>
        <td><center><b>Colorslider<br>horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderHor.png"></td>
        <td><center><b>Colorslider<br>horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderVert.png"></td>
        <td><center><b>Toggle Switch<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Toggle.gif"></td>
    </tr>
<tr><td colspan=4></td></tr>   
      <tr>
        <td><center><b>Basic Switch<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Switch.gif"></td>
        <td><center><b>Checkbox/<br>Radiobutton</b><br><img src="widgets/vis-inventwo/img/Check.gif"></td>
        <td><center><b>Colorpicker<br>&nbsp;</b><br><img src="widgets/vis-inventwo/img/Colorpicker.png"></td>
    </tr>
</table>




Mit Hilfe unserer Widgets lassen sich folgende Projekte verwirklichen. Zur Zeit befinden sich in unserem Adapter NUR die reinen Schaltflächen (siehe oben). Uhr und Wetter stammen aus anderen Adaptern und müssen ggf. zusätzlich installiert werden.

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview.png)

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview2.png)
---

## Unterstützung

Falls Dir unsere Arbeit gefällt und Du uns unterstützen möchtest, wir freuen uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zum ioBroker)

[![Spende](http://resources.inventwo.com/github/inventwo/spende.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

---

## Changelog / Änderungsprotokoll

## 3.3.3 
- Problem mit Umrandungsfarbe beim Multi-Widget View in PopUp behoben

## 3.3.2
- Bugfix

## 3.3.1
- Bugfix

## 3.3.0
- Neues Widget: Konfigurierbarer Colorpicker für HEX, RGB, HSL, HSV und CIE/XY basierend auf [iro.js](https://iro.js.org/)

## 3.2.8
- Radiobutton-List: Mehrzeilige/Mehrspaltige Darstellung möglich  [#393](https://github.com/inventwo/ioBroker.vis-inventwo/issues/393)
- JSON-Tabelle: Textausrichtung für Kopfzeile hinzugefügt [#394](https://github.com/inventwo/ioBroker.vis-inventwo/issues/394)

## 3.2.7
- FIXED: Popup schließt nicht bei Datenpunktwert

## 3.2.6 
- JSON-Tabelle: Hintergrund pro Zeile in Abhängigkeit eines Wertes färben [#280](https://github.com/inventwo/ioBroker.vis-inventwo/issues/280)
- JSON-Tabelle: Standardsortierung einer Spalte [#286](https://github.com/inventwo/ioBroker.vis-inventwo/issues/286)
- Universal- & Multi-Widget ViewInPopUp: Scrollen der View möglich [#344](https://github.com/inventwo/ioBroker.vis-inventwo/issues/344)
- Universal- & Multi-Widget HTTP: Link kann im gleichem oder neuem Tab geöffnet werden [#363](https://github.com/inventwo/ioBroker.vis-inventwo/issues/363)

- FIXED: JSON-Tabelle funktioniert nun auch wenn nur ein einzelnes Objekt statt Array mit Objekten im Datenpunkt steht [#319](https://github.com/inventwo/ioBroker.vis-inventwo/issues/319)
- FIXED: JSON-Tabelle: 10-stelliger Zeitstempel funktionierte nicht [#376](https://github.com/inventwo/ioBroker.vis-inventwo/issues/376)

## 3.2.5
- Bugfix

## 3.2.4
- Bugfix

## 3.2.3
- Bugfix

## 3.2.2
- Bugfix

## 3.2.1
- Problem mit aktiver Textfarbe behoben (#302)
- Problem mit Multi-Widget und unterschiedlichem Prüftyp behoben (#303)
- Problem beim Schließen mit View im PopUp behoben (#254)
- Navigationseffekte aus der Basisnavigation hinzugefügt (#304)
- Neu hinzugefügt Widget-Typ 'HTTP' für Universal- und Multi-Widget (#249)
- Sichtbare Schritte für einfachen Slider hinzugefügt

## 3.2.0
- Textfarbe aktiv/inaktiv für Universal- & Multiwidget
- Colorslider CIE Wert mit eckigen Klammern
- Fehler behoben, dass Schattenfarbe bei Universal- & Multiwidget nicht aktualisiert
- JSON Tabelle: Vorangestellter und angehänget Text

## 3.1.3
- Bugfix

## 3.1.2
- Bugfix

## 3.1.1
- Bugfix

## 3.1.0
- Neues Widget: Basisschalter
- Neues Widget: Checkbox/Radiobutton
- Bugfixes

## 3.0.11
- Bugfix

## 3.0.10
- Bugfix

## 3.0.9
- Bugfix

## 3.0.8
- Bugfix

## 3.0.7
- Bugfix

## 3.0.6
- Bugfix

## 3.0.5
- Bugfix

## 3.0.4
- Bugfix

## 3.0.3
- Bugfix

## 3.0.2
- Bugfix

## 3.0.1
- Bugfix

## 3.0.0
```diff
#### ACHTUNG ####
Nach dem Update sind die Icons vom Universal- und Multiwidget 
nicht zu sehen, sind aber nicht weg! Damit diese wieder zu sehen sind müssen 
die Widgets einmal EINZELN im Editor angeklickt werden.
```
- Beim Universal- und Multiwidget kann der Inhaltstyp geändert werden.
    - Inhaltstypen: Bild (Standard), Analoge Uhr, Digitale Uhr und HTML/Text 
    - Analoge und digitale Uhr: Farbe des Ziffernblatts under Zeiger kann frei gewählt werden, Zeitzone kann geändert werden
    - Statt dem Icon kann ein eigener Text oder ein Datenpunktwert per Binding angezeigt werden
- Vergleichsoperatoren Größer-Gelich und Kleiner-Gleich
- PopUp kann per Datenpunk geöffnet werden
- Bugfix:
    - Colorslider unsichtbar wenn für CIE kein Wert vorhanden ist
    - Links funktionieren nicht im Popup
    - State Rückmeldedauer funktioniert nicht richtig

## 2.9.7
- Bugfix

## 2.9.6
- Bugfix

## 2.9.5
- Bugfix

## 2.9.4
- Bugfix

## 2.9.3
- Fehler mit PopUp behoben: Klick zum schließen wurde direkt nach Öffnen registriert und Klick löste Buttons hinter dem PopUp aus
- Zustände wurden bei View in PopUp nicht richtig angezeigt

## 2.9.2
- Problem mit Datenpunkt zum Schließen des Popups behoben. ACHTUNG! Der Datenpunkt muss erneut ausgewählt werden

## 2.9.1
- Bugfix

## 2.9.0
- Multi-Widget-Status können unabhängig vom Widget-Typ nach Datenpunkten oder Views prüfen
- Optionen zum automatischen Schließen des Popups hinzugefügt
- Bugfixes

## 2.8.3
- Bugfix

## 2.8.2
- Problem mit Colorslider behoben: Wert wird nicht in Datenpunkt gesetzt, wenn "Wert bei Freigabe aktualisieren" aktiviert ist",

## 2.8.1
- Fehler behoben: Color Slider RGB aktualisiert bei Dp Änderung nicht (WICHTIG: Datenpunkte müssen neu ausgewählt werden!) 

## 2.8.0
- View in PopUp Option für Universal- und Multi-Widget hinzugefügt
- Bugfix

## 2.7.11
- Bugfix

## 2.7.10
- Problem mit Bildern im Universal und Multi Widget behoben
- Problem mit Bildwechesl im Universal und Multi Widget behoben

## 2.7.9
- Option für die Bildgröße für das Image-Widget hinzugefügt
- Fehler von vorheriger Version behoben

## 2.7.8
- Problem mit Textausrichtung behoben
- Problem mit Bildgröße im Image-Widget behoben

## 2.7.7

- Problem mit der Bildgröße behoben
- Problem mit dem Farbregler behoben, dass der Wert beim loslassen nicht gespeichert wurde

## 2.7.6
- Problem mit Symbolfarbe für Navi-Widget behoben
- Problem mit Hervorhebung auf Touch-Geräten behoben
- Problem mit Radiobutton-Widget und Datentyp Zahlen behobenn

## 2.7.5
- JSON Tabelle farbliche Schwellenwerte für Zahlen
- Fehler beim Slider behoben wenn ungültiger Wert im Datenpunkt steht
- Fehler behoben: Signalbilder wurden mit eingefärbt
- Option um Bildfarbe zu invertieren eingefügt, um Farbfilter zu umgehen
- Color Slider kann nun zwischen HEX, RGB und CIE unterscheiden


## 2.7.4
- Fehlende Übersetzung für Hover-Farben hinzugefügt

## 2.7.3
- Fehler beim Multi-State und mehreren Zuständen behoben
- Schatten und Rand Hover für Buttons hinzugefügt

## 2.7.2
- Fehler in Radiobutton mit Bildfarbe behoben
- Fehler behoben: Doppeltes klicken bei State mit Verweildauer
- Hovereffekt für Buttons eingefügt
- Problem mit anzeigen des Sliderwertss behoben
- Slider Text anhängen möglich

## 2.7.1
- Bugfix

## 2.7.0
- Neues Widget: Farbslider
- JSON Tabelle Spaltenformat boolean und number
- JSON Tabelle Kopfzeile kann fixiert werden
- JSON Tabelle Fehler beim sortieren behoben
- JSON Tabelle konfigurierbare Dummyzeile wenn JSON leer ist
- Fehler behoben

## 2.6.0
- Universal- & Multi-Widget Vergleichsoperatoren gleich, größer, kleiner und nicht hinzugefügt
- Slider Min/Max invertieren
- Slider Wert erst beim loslassen setzen
- Widget um Wert zu erhöhen oder zu senken
- JSON Tabelle Fehler mit Datum behoben
. JSON Tabelle anzeige von Millisekunden möglich
- JSON Tabelle Platzhalter wenn Eintrag leer ist
- JSON Tabelle Spalten können per Klick sortiert werden

## 2.5.11
- Bugfix

## 2.5.10
- Bugfix

## 2.5.9
- Der Prozess der Bildfarbfilterung wurde geändert
- Die Bildfarbe kann jetzt ein Datenpunkt sein

## 2.5.8
- Bugfix

## 2.5.7
- Bugfix

## 2.5.6
- Bugfix

## 2.5.5
- Bugfix

## 2.5.4
- Bugfix (State: doppeltes senden dese Wertes bei touch)


## 2.5.3
- Grauer Kippschalter hinzugefügt

## 2.5.2
- Bugfix

## 2.5.1
- Bugfix

## 2.5.0
- Kippschalter hinzugefügt
- Bugfix

## 2.4.3
- Bugfix

## 2.4.2
- Bugfix

## 2.4.1
- Bugfix

## 2.4.0
- Randstil zur JSON-Tabelle hinzugefügt
- Farbauswahö für Icons zu allen Widgets hinzugefügt
- Fehlerbehebung

## 2.3.2
- Fehler bei der Navigation mit dem Widget 'View in Widget' behoben

## 2.3.1
- Fehler in JSON Tabelle behoben


## 2.3.0
- Problem behoben, bei dem Schaltflächen zweimal Werte senden
- Datum / Uhrzeit und Bildformat für Tabellenzellen hinzugefügt
- Universal- und Multi-Widget-Attribute werden beim Klicken auf Widget aktualisiert

## 2.2.3
- Fehler in JSON Tabelle behoben

## 2.2.2
- Fehler im Multi Widget behoben: Bilder und Text wechseln nicht bei Typ Navigation

## 2.2.1
- Fehler in JSON Tabelle behoben, wenn kein gültiges JSON-Objekt vorhanden ist
- Fehler in Value-List behoben: Wert wird nicht aktualisiert

## 2.2.0
- Datenpunktwerte werden jetzt bei allen Widgets im Editor angezeigt
- Neues Widget: Marquee (Laufschrift)
- Universal und Multi State Verweildauer hinzugefügt
- List Widget Abstand zwischen den Einträgen kann eingestell werden

## 2.1.0
- Datenpunktwerte werden im VIS Editor angezeigt!

## 2.0.1
- Übersetzungsfehler behoben
- Border Farbe behoben
- Widget-Untertitel behoben

## 2.0.0
- Switch, Button, Nav und Background Widget (sowie die kleinen Ausführungen) zu einem einzigen Widget zussammengeführt -> dem Universal Widget 
- Multi Widget -> wie das Universal, nur dass hier auf mehrere Datenpunkte und Werte geprüft werden kann (Ähnlich der Signalbild Funktion)
- Image Widget kann nun auf Datenpunkt prüfen
- Radiobuttons hinzugefügt
- Werteliste hinzugefügt (Kann Liste aus einem Datenpunkt oder manuell eingetragenem Text erstellen)

## 1.3.8
- Changed slider step to decimal
- Fixed problem with numeric values

### 1.3.7
- Fixed problem with navigation on touchscreens

### 1.3.6
- Added set state option for navigation
- Fixed problem with datapoints without config

### 1.3.5
- Added refresh rate for table

### 1.3.4
- Removed icons and backgrounds, changed config, Fixed navigation

### 1.3.3
- Fixed background widget value option

### 1.3.2
- Bug fix

### 1.3.1
- Changed navigation button color behaviour
- Added new icons

### 1.3.0
- Added JSON table
- Added delay for navigations
- Text in buttons can now be HTML
- Added new icons

### 1.2.3
- Added Navigation active color
- Fixed state color for value switch

## 1.2.2
- Bug Fix: slider value, config

## 1.2.1
- Fixed Slider Widget: seperatet into two widgets (horizontal and vertical)

### 1.2.0
- Added image widget
- Added Slider to change border radius for all 4 corners (If this version is an update for you, you need to click on each button in the vis-editor to get back the default corners)
- Added new icons


### 1.1.1
- Bug fix


### 1.1.0
- Added slider widget
- Added option to mirror image
- Added new icons
- Changed button widgets to use default font and text options

### 1.0.0
- Widget background and content opacity, Switch can be changed from boolean to value, changed icons from white to black, added seamless backgrounds

### 0.1.2
- Bug fixes
...

### 0.1.1
- Bug fixes
...

### 0.1.0 (Erstveröffentlichung)
- inventwo Design Widgets
...

### 0.0.1
- Die Idee ist geboren

---

## License

Copyright (c) 2022 [jkvarel](https://github.com/jkvarel) und [skvarel](https://github.com/skvarel) von [inventwo](https://github.com/inventwo)

MIT License (nur in englisch / englisch only)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Icons from Icons8 https://icons8.com/
