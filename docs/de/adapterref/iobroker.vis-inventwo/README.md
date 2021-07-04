---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-inventwo/README.md
title: ioBroker.vis-inventwo
hash: nTe5CmHUbAywNVoDUwj6qFBtYwxIPOcQ4VF08ehlH8Q=
---
![Logo](../../../en/adapterref/iobroker.vis-inventwo/admin/inventwo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-inventwo.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/vis-inventwo-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/vis-inventwo-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/inventwo/iobroker.vis-inventwo.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo/badge.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-green.svg)
![NPM](https://nodei.co/npm/iobroker.vis-inventwo.png?downloads=true)

# IoBroker.vis-inventwo
## Schalter Widgets für den ioBroker.vis Adapter
###### .. ab v 2.0.0
<table><tr><td><center><b>Universal</b><br><img src="widgets/vis-inventwo/img/Universal.gif"></td><td><center> <b>Multi</b><br><img src="widgets/vis-inventwo/img/Multi.gif"></td><td><center> <b>Bild</b><br><img src="widgets/vis-inventwo/img/Image.png"></td><td><center> <b>Tabelle</b> <br><img src="widgets/vis-inventwo/img/Table.png"></td></tr><tr><td colspan=4></td></tr><tr><td><center><b>Aufführen</b><br><img src="widgets/vis-inventwo/img/List.png"></td><td><center> <b>Festzelt</b><br><img src="widgets/vis-inventwo/img/Marquee.gif"></td><td><center> <b>Radio knopf</b><br><img src="widgets/vis-inventwo/img/Radio.gif"></td><td><center> <b>Schieberegler vertikal</b> <br><img src="widgets/vis-inventwo/img/Slider2.gif"></td></tr><tr><td colspan=4></td></tr><tr><td><center> <b>Schieberegler horizontal</b><br><img src="widgets/vis-inventwo/img/Slider1.gif"></td><td><center> <b>Farbschieber horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderHor.png"></td><td><center> <b>Farbschieber horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderVert.png"></td><td><center> <b>Kippschalter</b><br><img src="widgets/vis-inventwo/img/Toggle.gif"></td></tr></table>

###### .. v 1.3.8
![Beispiel](http://resources.inventwo.com/github/inventwo/Set.png)

Mit Hilfe unserer Widgets lassen sich folgende Projekte verwirklichen. Zur Zeit befinden sich in unserem Adapter NUR sterben reinen Schaltflächen (siehe oben) und sterben Icons. Uhr und Wetter stammen aus anderen Adaptern und müssen ggf. zusätzlich installiert werden.

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview.png)

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview2.png)
---

##Unterstützung
Falls Dir unsere Arbeit und Du uns unterstützen möchten, freuen wir uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zum ioBroker)

[![Ausgaben](http://resources.inventwo.com/github/inventwo/spende.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

---

##3.0.11
- Fehlerbehebung

##3.0.10
- Fehlerbehebung

## 3.0.9
- Fehlerbehebung

## 3.0.8
- Fehlerbehebung

## 3.0.7
- Fehlerbehebung

## 3.0.6
- Fehlerbehebung

## 3.0.5
- Fehlerbehebung

## 3.0.4
- Fehlerbehebung

## 3.0.3
- Fehlerbehebung

## 3.0.2
- Fehlerbehebung

## 3.0.1
- Fehlerbehebung

## 3.0.0
```diff
#### ACHTUNG ####
Nach dem Update sind die Icons vom Universal- und Multiwidget
nicht zu sehen, sind aber nicht weg! Damit diese wieder zu sehen sind müssen
die Widgets einmal EINZELN im Editor angeklickt werden.
```

- Beim Universal- und Multiwidget kann der Inhaltstyp geändert werden.
    - Inhaltstypen: Bild (Standard), Analoge Uhr, Digitale Uhr und HTML/Text
    - Analoge und digitale Uhr: Farbe des Ziffernblatts unter Zeiger kann frei gewählt werden, Zeitzone kann geändert werden
    - Statt dem Icon kann ein eigener Text oder ein Datenpunktwert pro Bindung angezeigt werden
- Vergleichsoperatoren Größer-Gelich und Kleiner-Gleich
- PopUp kann per Datenpunk geöffnet werden
- Fehlerbehebung:
    - Colorslider unsichtbar wenn für CIE kein Wert vorhanden ist
    - Links funktionieren nicht im Popup
    - Status Rückmeldedauer funktioniert nicht richtig

## 2.9.7
- Fehlerbehebung

## 2.9.6
- Fehlerbehebung

## 2.9.5
- Fehlerbehebung

## 2.9.4
- Fehlerbehebung

## 2.9.3
- Fehler mit PopUp behoben: Klick zum Schließen wurde direkt nach Öffnen registriert und Klick löste Buttons hinter dem PopUp aus
- Zustände wurden bei View in PopUp nicht richtig angezeigt

## 2.9.2
- Problem mit Datenpunkt zum Schließen des Popups behoben. ACHTUNG! Der Datenpunkt muss erneut ausgewählt werden

## 2.9.1
- Fehlerbehebung

## 2.9.0
- Multi-Widget-Status kann unabhängig vom Widget-Typ nach Datenpunkten oder Views prüfen
- Optionen zum Schließen des Popups hinzugefügt
- Fehlerbehebung

## 2.8.3
- Fehlerbehebung

## 2.8.2
- Problem mit Colorslider behoben: Wert wird nicht in Datenpunkt gesetzt, wenn "Wert bei Freigabe" aktiviert ist",

## 2.8.1
- Fehler behoben: Color Slider RGB aktualisiert bei Dp Änderung nicht (WICHTIG: Datenpunkte & neu ausgewählt werden!)

## 2.8.0
- Ansicht in PopUp Option für Universal- und Multi-Widget hinzugefügt
- Fehlerbehebung

## 2.7.11
- Fehlerbehebung

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
- Problem mit dem Farbregler behoben, dass der Wert beim Loslassen nicht gespeichert wurde

## 2.7.6
- Problem mit Symbolfarbe für Navi-Widget behoben
- Problem mit Hervorhebung auf Touch-Geräten behoben
- Problem mit Radiobutton-Widget und Datentyp Zahlen behobenn

## 2.7.5
- JSON Tabelle farbliche Prüfe für Zahlen
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
- Problem mit anzeigen des Sliderwerts behoben
- Slider Text anhängen möglich

## 2.7.1
- Fehlerbehebung

## 2.7.0
- Neues Widget: Farbslider
- JSON Tabellenspaltenformat boolean und Zahl
- JSON Tabelle Kopfzeile kann fixiert werden
- JSON Tabelle Fehler beim sortieren behoben
- JSON Tabelle konfigurierbare Dummyzeile wenn JSON leer ist
- Fehler behoben

## 2.6.0
- Universal- & Multi-Widget Vergleichsoperatoren gleich, größer, kleiner und nicht hinzugefügt
- Schieberegler Min/Max invertieren
- Slider Wert erst beim loslassen setzen
- Widget um Wert zu erhöhen oder zu senken
- JSON Tabelle Fehler mit Datum behoben

. JSON-Tabellenanzeige von Millisekunden möglich

- JSON Tabelle Platzhalter wenn Eintrag leer ist
- JSON-Tabelle Spalten können pro Klick sortiert werden

##2.5.11
- Fehlerbehebung

##2.5.10
- Fehlerbehebung

## 2.5.9
- Der Prozess der Bildfarbfilterung wurde geändert
- Die Bildfarbe kann jetzt ein Datenpunkt sein

## 2.5.8
- Fehlerbehebung

## 2.5.7
- Fehlerbehebung

## 2.5.6
- Fehlerbehebung

## 2.5.5
- Fehlerbehebung

## 2.5.4
- Bugfix (Zustand: doppeltes senden dese Wertes bei touch)

## 2.5.3
- Grauer Kippschalter hinzugefügt

## 2.5.2
- Fehlerbehebung

## 2.5.1
- Fehlerbehebung

## 2.5.0
- Kippschalter hinzugefügt
- Fehlerbehebung

## 2.4.3
- Fehlerbehebung

## 2.4.2
- Fehlerbehebung

## 2.4.1
- Fehlerbehebung

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

##2.2.2
- Fehler im Multi Widget behoben: Bilder und Text wechseln nicht bei Typ Navigation

## 2.2.1
- Fehler in JSON Tabelle behoben, wenn kein gültiges JSON-Objekt vorhanden ist
- Fehler in Value-List behoben: Wert wird nicht aktualisiert

## 2.2.0
- Datenpunktwerte werden jetzt bei allen Widgets im Editor angezeigt
- Neues Widget: Festzelt (Laufschrift)
- Universal und Multi State Verweildauer hinzugefügt
- Listen-Widget Abstand zwischen den Einträgen kann eingestell werden

## 2.1.0
- Datenpunktwerte werden im VIS Editor angezeigt!

## 2.0.1
- Übersetzungsfehler behoben
- Randfarbe behoben
- Widget-Untertitel behoben

## 2.0.0
- Switch, Button, Nav und Background Widget (sowie die kleinen Ausführungen) zu einem einzigen Widget zussammengeführt -> dem Universal Widget
- Multi Widget -> wie das Universal, nur dass hier auf mehrere Datenpunkte und Werte geprüft werden kann (Ähnlich der Signalbild Funktion)
- Image Widget kann nun auf Datenpunkt prüfen
- Radiobuttons hinzugefügt
- Werteliste hinzugefügt (Kann Liste aus einem Datenpunkt oder manuell eingetragenem Text erstellen)

## 1.3.8
- Schiebereglerschritt auf Dezimal geändert
- Problem mit numerischen Werten behoben

### 1.3.7
- Problem mit der Navigation auf Touchscreens behoben

### 1.3.6
- Option zum Einstellen des Status für die Navigation hinzugefügt Added
- Problem mit Datenpunkten ohne Konfiguration behoben

### 1.3.5
- Aktualisierungsrate für Tabelle hinzugefügt

### 1.3.4
- Entfernte Symbole und Hintergründe, geänderte Konfiguration, feste Navigation

### 1.3.3
- Option für den Wert des Hintergrund-Widgets korrigiert

### 1.3.2
- Fehlerbehebung

### 1.3.1
- Farbverhalten der Navigationstasten geändert
- Neue Symbole hinzugefügt

### 1.3.0
- JSON-Tabelle hinzugefügt
- Verzögerung für Navigationen hinzugefügt
- Text in Schaltflächen kann jetzt HTML sein
- Neue Symbole hinzugefügt

### 1.2.3
- Navigation aktive Farbe hinzugefügt
- Feste Statusfarbe für Wertschalter

## 1.2.2
- Bug Fix: Schiebereglerwert, Konfiguration

## 1.2.1
- Fixed Slider Widget: in zwei Widgets unterteilt (horizontal und vertikal)

### 1.2.0
- Bild-Widget hinzugefügt
- Schieberegler hinzugefügt, um den Randradius für alle 4 Ecken zu ändern (Wenn diese Version ein Update für Sie ist, müssen Sie auf jede Schaltfläche im Vis-Editor klicken, um die Standardecken wiederherzustellen)
- Neue Symbole hinzugefügt

### 1.1.1
- Fehlerbehebung

### 1.1.0
- Slider-Widget hinzugefügt
- Option zum Spiegeln des Bildes hinzugefügt
- Neue Symbole hinzugefügt
- Schaltflächen-Widgets geändert, um Standardschrift- und Textoptionen zu verwenden

### 1.0.0
- Widget-Hintergrund und Inhalts-Deckkraft, Schalter kann von Boolean auf Wert geändert werden, Symbole von weiß auf schwarz geändert, nahtlose Hintergründe hinzugefügt added

### 0.1.2
- Fehlerbehebung

...

### 0.1.1
- Fehlerbehebung

...

### 0.1.0 (Erstveröffentlichung)
- zwei Design-Widgets erfinden

...

### 0.0.1
- Die Idee ist geboren

---

## Changelog

## License

Urheberrechte (c) 2021 [jkvarel](https://github.com/jkvarel) und [skvarel](https://github.com/skvarel) von [inventwo](https://github.com/inventwo)


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