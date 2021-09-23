---
BADGE-Number of Installations: http://iobroker.live/badges/flot-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.flot.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.flot.svg
BADGE-NPM: https://nodei.co/npm/iobroker.flot.png?downloads=true
---
# flot

<span style="font-size: 16px;">Der Adapter dient der grafischen Darstellung von Messwerten. Mit ihm kann man die mit einem History-Adapter geloggten Daten visualisieren. Zum einen direkt beim Aufruf eines geloggten Datenpunktes über das History Icon im Reiter Objects, er kann jedoch auch als eigenständige Applikation zur gleichzeitigen Darstellung mehrerer Datenpunkte benutzt werden.</span>

[![](img/flot-2_ioBroker_Adapter_Flot_001.jpg)](img/flot-2_ioBroker_Adapter_Flot_001.jpg)Ein so generierter Chart kann in einem iFrame-Widget in .vis dargestellt werden




* * *

# [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#konfiguration)**Konfiguration**

[![](img/flot-2_ioBroker_Adapter_Flot_000.jpg)](img/flot-2_ioBroker_Adapter_Flot_000.jpg) Eine Konfiguration ist nicht nötig. Hier wird deswegen auch das Konfigurationsmenü nicht angeboten.

* * *

# [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#bedienung)**Bedienung**

Der Editor des Flot-Adapters wird über `<IPdesServers>:8082/flot/edit.html/` oder über den Hyperlink im Reiter Instanzen des admin-Adapter aufgerufen.

Die Eingabefelder gliedern sich in 4 Blöcke:

####  [![](img/flot-2_ioBroker_Adapter_Flot_Groups.jpg)](img/flot-2_ioBroker_Adapter_Flot_Groups.jpg)

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#input-data)**Input data (1)**

Die aktuell installierte Version wird oben rechts angezeigt.

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data.jpg)

### Einstellungen löschen (Mülleimer)

Löscht alle Eingaben in diesem Chart. Wenn man /flot/edit.html/ aufruft wird üblicherweise das zuletzt bearbeitete Projekt in dem Editor aufgerufen. Will man jedoch einen ganz anderen Chart erstellen, kann man mit diesem Button alle Einstellungen auf Standardwerte zurücksetzen.

### Linie hinzufügen

Eine weitere Zeile wird in der darunterliegenden Tabelle am Ende eingefügt. Diese bekommt eine weitere Farbe zugewiesen.

### Auto update

Wenn das Vorschaubild in der unteren Hälfte der Seite bei jeder Änderung aktualisiert werden soll, muss diese Checkbox aktiviert werden. Bei sehr komplexen Charts kann dies einige Zeit dauern. Standardmäßig ist diese Checkbox nicht aktiviert.

Wenn die Checkbox aktiviert ist, verschwindet der Button **_Update Preview_** rechts über dem Vorschaufenster, über den ansonsten die Vorschau aktualisiert werden würde.

### Platziere Booleans

Mit diesem Button wird der Graph in mehrere vertikal übereinanderliegende Abschnitte unterteilt, in denen jeweils der Zustand eines Datenpunktes dargestellt wird. Dies dient der besseren Übersicht bei bool'schen Datenpunkten (on/off; true/false)

### Datenpunktparameter

In der folgenden Tabelle werden die Parameter festgelegt mit der die jeweiligen Datenpunkte dargestellt werden sollen

#### Instanz

Hier wird festgelegt aus welcher History-Instanz die geloggten Daten für den Graph entnommen werden sollen.


![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Instanz.jpg)


default bezieht sich auf die in den Systemeinstellungen festgelegte Default-Instanz zur Datensammlung. Die weiteren Punkte entsprechen den installierten Instanzen.

#### ID

Hier wird der darzustellende Datenpunkt ausgewählt. Der Datenpunkt muss im Reiter _**Objekte**_ des Adapter _**Admin**_ mit der unter _**Instanz**_ ausgewählten History-Instanz geloggt werden.

#### Art

Hier findet die Auswahl der Art und Weise der Darstellung der Datenpunkte in der Linie statt

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Art.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Art.jpg)

**-minmax (default):** Es werden sowohl der höchste, als auch der niedrigste Wert innerhalb des Aggregationsintervalls angezeigt

**-mittel:**  Es wird der Mittelwert innerhalb des Aggregationsintervalls angezeigt

**-min:**  Es wird sowohl der niedrigste Wert innerhalb des Aggregationsintervalls angezeigt

**-max:**  Es wird der höchste Wert innerhalb des Aggregationsintervalls angezeigt

**-total:**  Es wird der ??? Wert innerhalb des Aggregationsintervalls angezeigt

 **-bei Änderung:** Es werden nur Werte angezeigt, wenn sich der Wert ändert

#### Chart Type

Hier wird festgelegt in welcher Form die Daten dargestellt werden sollen.

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Chart_Type.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Chart_Type.jpg)

**Linie:** Die Daten werden als Linien dargestellt. Die einzelnen Punkte werden als Gerade miteinander verbunden.

**Bar:** Jeder einzelne Messpunkt der Daten wird als vertikaler Balken dargestellt. Diese Darstellung empfiehlt sich nur bei wenigen Messpunkten.

**Scatter plot:** Die Daten werden als isolierte Punkte dargestellt. Die einzelnen Punkte werden nicht miteinander verbunden.

**Schritte:** Die Daten werden als Linien dargestellt. Die einzelnen Punkte werden bis zur nächsten Änderung horizontal als Gerade miteinander verbunden. Zum Zeitpunkt der Änderung wird eine Stufe eingelegt.

**Spline:** Die Daten werden als Linien dargestellt. Die einzelnen Punkte werden als gebogene Kurve miteinander verbunden.

#### Füllen (0-1)

Hier kann festgelegt werden, ob zwischen der gezeichneten Linie und der X-Achse (oder der Linie durch 0) eine Fläche gezeichent werden soll. Mit einem Wert zwischen 0 und 1 (z.B. 0.4) wird die Deckung der Farbe angegeben (0=transparent; 1= deckend).

#### Punkte

Sollen zusätzlich zur Linie auch noch die Messpunkte hervorgehoben werden, kann man diese Checkbox anhaken.

#### Farbe

Die Farbe mit der die Daten für diesen Datenpunkt angezeigt werden sollen kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Min

Hier kann der Mindestwert für die Y-Achse eingegeben werden. Wird kein Wert eingegeben wird die Achse dynamisch skaliert.

#### Max

Hier kann der Höchstwert für die Y-Achse eingegeben werden. Wird kein Wert eingegeben wird die Achse dynamisch skaliert.

#### Einheiten

Hier kann eine Einheit für die Skalierung der Y-Achse angegeben werden

#### Y-Achse

Es gibt mehrere Möglichkeiten, wie die Y-Achse jedes Datenpunktes dargestellt werden kann. Standardmäßig wird für jeden Datenpunkt eine eigene Y-Achse gezeichnet. Dies kann jedoch leicht unübersichtlich werden. Daher gibt es die folgenden Optionen.

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Y_Achse.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data_Y_Achse.jpg)

**-nichts:** für diesen Datenpunkt soll keine eigene Y-Achse gezeichnet werden.

**-links:** die Y-Achse für diesen Datenpunkt soll links von dem Chart gezeichnet werden

**-rechts:** die Y-Achse für diesen Datenpunkt soll rechts von dem Chart gezeichnet werden

**-links farblich:** die Y-Achse für diesen Datenpunkt soll links von dem Chart in der Farbe des Datenpunktes gezeichnet werden

**-rechts farblich:** die Y-Achse für diesen Datenpunkt soll rechts von dem Chart in der Farbe des Datenpunktes gezeichnet werden

#### X-Achse

Es gibt mehrere Möglichkeiten, wie die X-Achse jedes Datenpunktes dargestellt werden kann. Standardmäßig wird für jeden Datenpunkt eine eigene X-Achse gezeichnet. Dies kann jedoch leicht unübersichtlich werden. Daher gibt es die folgenden Optionen.

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_X_Achse.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data_X_Achse.jpg)

**-nichts:** für diesen Datenpunkt soll keine eigene Y-Achse gezeichnet werden.

**-oben:** die X-Achse für diesen Datenpunkt soll über dem Chart gezeichnet werden

**-unten:** die X-Achse für diesen Datenpunkt soll unter dem Chart gezeichnet werden

**-oben farblich:** die X-Achse für diesen Datenpunkt soll über dem Chart in der Farbe des Datenpunktes gezeichnet werden

**-unten farblich:** die X-Achse für diesen Datenpunkt soll unter dem Chart in der Farbe des Datenpunktes gezeichnet werden

#### Name

Hier kann eine Bezeichnung für den Datenpunkt festgelegt werden, die auch in der Legende angezeigt wird. Wird hier nichts eingegeben wird die vollständige Datenpunktbezeichnung verwendet.

#### mehr

Hinter diesem Icon verbergen sich weitere Einstellungen

[![](img/flot-2_ioBroker_Adapter_Flot_Input_Data_more.jpg)](img/flot-2_ioBroker_Adapter_Flot_Input_Data_more.jpg)

**X-Offset:** Um die Kurve von der Y-Achse abzusetzen, kann hier ein Wert eingegeben werden um welchen Betrag diese Absetzung durchgeführt werden soll.

**Y-Offset:** Um die Kurve von der X-Achse abzusetzen, kann hier ein Wert eingegeben werden um welchen Betrag diese Absetzung durchgeführt werden soll. Dadurch wird u.a. verhindert, dass die Linienstärke die X-Achse überlagert

**X-Achse Ticks:** Anzahl der Markierungen der X-Achse

**Y-Achse Ticks: **Anzahl der Markierungen der Y-Achse

**ØL:** Dicke der Linie in Pixeln

**ØS:** Dicke des Schattens in Pixeln

**Gemeinsame Y-Achse:** default = jede Linie eine eigene Achse, jede Ziffer steht für die entsprechende Linie

**NULL als:** Hier wird festgelegt wie die Linie gezeichnet werden soll, wenn keine Daten vorliegen.

default: keine Linie;

null-Werte ignorieren: Linie wird horizontal weitergeführt

0 statt null benutzen: die Linie wird auf den Wert 0 gezogen.

**Smoothing:** Glättung der Kurve. Im Prinzip wird ein gleitender Mittelwert über die eingestellte Anzahl Punkte gezogen.

**Nach Komma:** Anzahl der Nachkommastellen.

#### Datenpunkt löschen (Mülleimer)

Mit einem Klick auf dieses Icon wird die gesamte Zeile der Tabelle mit allen Einstellungen gelöscht.

## Markierungen (2)

Mit dieser Option können horizontale Linien in einen Chart eingetragen werden um Schwellwerte darzustellen. Die Markierungen können auch Bereiche (z.B. Wohlfühlbereich bei Temperatur oder Luftfeuchte) anzeigen. Dann muss ein obererer und unterer Trigger angegeben werden. 
![](img/flot-2_ioBroker_Adapter_Flot_Markierungen.jpg)


### Neue Markierung hinzufügen

Mit einem Klick auf diese Schaltfläche wird in der darunterliegenden Tabelle eine weitere Reihe eingefügt, um eine weitere Markierung zu definieren.

### Markierungsparameter

Die Eigenschaften einer ausgewählten Markierung werden in je einer Zeile festgelegt:

#### Linie ID

Hier wird eine Datenreihe aus dem Chart ausgewählt. Dies ist nötig, damit die Markierung sich an den Werten der zugehörigen Y-Achse orientiert.

#### Oberer Wert oder ID

Hier wird wahlweise ein absoluter Wert oder ein Datenpunkt, der als Trigger für die obere Grenze des Bereichs gelten soll, eingegeben. Der Datenpunkt kann über den Objekt-Explorer gesucht werden.

#### Unterer Wert oder ID

Hier wird wahlweise ein absoluter Wert oder ein Datenpunkt, der als Trigger für die untere Grenze des Bereichs gelten soll, eingegeben. Der Datenpunkt kann über den Objekt-Explorer gesucht werden.

#### Farbe

Die Farbe mit der die Linien für diese Markierung angezeigt werden sollen kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Füllen

Hier kann festgelegt werden, ob zwischen den gezeichneten Linie, bzw. zwischen der Linie und der X-Achse (oder der Linie durch 0) eine Fläche gezeichnet werden soll.

#### <span style="text-align: justify; line-height: 1.5;">ØL</span>

Dicke der Linie in Pixeln

#### ØS

Dicke des Schattens in Pixeln

#### Text

Hier kann eine Information zu der Markierung eingegeben werden, die im Chart erscheint.

#### Textposition

Man kann festlegen, ob diese Information an der rechten oder linken Y-Achse angezeigt werden soll.

#### Textoffset

Dies ist der Abstand zur Markierungslinie. Der Wert kann positiv oder negativ angegeben werden.

#### Textgröße

Textgröße in px. Auch eine Angabe in pt ist möglich

#### Textfarbe

Die Farbe mit der die Information zu dieser Markierung angezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

## Zeit (3)


![](img/flot-2_ioBroker_Adapter_Flot_Zeit-e1484938214253.jpg)


### Zeitspanne

#### Art

Hier kann man zwischen statisch und relativ auswählen.

[![](img/flot-2_ioBroker_Adapter_Flot_Zeit_statisch.jpg)](img/flot-2_ioBroker_Adapter_Flot_Zeit_statisch.jpg)

Bei statisch werden fixe Zeitpunkte definiert, bei relativ die Zeitbereiche zu einem variablen Zeitpunkt, wie z.B. _**heute**_.

#### Ende

Dieser Punkt kann je nach Einstellung in dem darüber liegenden Punkt _**Art**_ ein fester Zeitpunkt oder im Falle dass relativ ausgewählt wurde ein variabler wiederholender Zeitpunkt sein.


![](img/flot-2_ioBroker_Adapter_Flot_Zeit_relativ_Ende.jpg)


#### Range

Hier wird der Zeitbereich (die Dauer) eingegeben, über die die X-Achse die Daten anzeigen soll.

[![](img/flot-2_ioBroker_Adapter_Flot_Zeit_relativ_Range.jpg)](img/flot-2_ioBroker_Adapter_Flot_Zeit_relativ_Range.jpg)

#### Autoupdate alle:

Mit diesem Wert wird festgelegt, wie oft sich die Darstellung der Datenpunkte in dem Chart automatisch updaten soll:

[![](img/flot-2_ioBroker_Adapter_Flot_Zeit_autoupdate.jpg)](img/flot-2_ioBroker_Adapter_Flot_Zeit_autoupdate.jpg)

Wenn z.B. bei Homematic Funksensoren sich die Daten sowieso nur alle 3 Minuten ändern ist ein häufigerer Refresh nicht nötig.

### Aggregation

Dieser Punkt dient der Verringerung der Datenmenge in dem Chart. Es kann die Anzahl der geloggten Punkte pro Datenpunkt festgelegt werden (Anzahl) oder der zeitliche Abstand der einzelnen Punkte in Sekunden.

## Options (4)

Der vierte Block enthält jede Menge Zusatzoptionen um ein Chart ansehnlich zu gestalten [![](img/flot-2_ioBroker_Adapter_Flot_Options_all.jpg)](img/flot-2_ioBroker_Adapter_Flot_Options_all.jpg)

### Erscheinung

#### Breite

Gibt an wie breit der Chart dargestellt werden soll. Angabe in px.

#### Höhe

Gibt an wie hoch der Chart dargestellt werden soll. Angabe in px.

#### kein Rahmen

Auswahl, ob ein Rahmen um die gesamte Fläche von Chart, Achsen und deren Beschriftung gezeichnet werden soll

#### Fenster-Hintergrund

Die Farbe mit der dieses Fenster gefüllt werden sollen kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann. Dieser Parameter bezieht sich auf die gesamte Fläche inkl. der Achsen mit ihren Beschriftungen.

#### Anwender Chart-Hintergrund

Wird diese Checkbox aktiviert, verschwindet die darunter liegende Pulldownmenü und statt dessen erscheint ein Eingabefeld.

#### Chart-Hintergrund

Dieser Parameter bezieht sich nur auf den Hintergrund des eigentlichen Charts. Ist die Checkbox darüber aktiviert kann hiereine eigene Beschreibung oder rgb(a) Farbe eingegeben werden. Wenn nicht, kann in dem Pulldownmenü unter verschiedenen vorgefertigten Hintergründen gewählt werden.

#### Y-Beschriftungsfarbe

Die Farbe mit der die Beschriftung der Y-Achse gezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

Diese Farbe gilt nicht, wenn in der Datenpunktbeschreibung _**Y-Achse rechts/links farblich**_ gewählt wurde.

#### X-Beschriftungsfarbe

Die Farbe mit der die Beschriftung der X-Achse gezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

Diese Farbe gilt nicht, wenn in der Datenpunktbeschreibung **_X-Achse rechts/links farblich_** gewählt wurde.

#### Rahmenfarbe

Die Farbe mit der der Rahmen um den eigentlichen Chart gezeichnet werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Gitterfarbe

Die Farbe mit der das Gitter auf dem Chart-Hintergrund gezeichnet werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Rahmenbreite

Angabe der Rahmenbreite, die um den Chart-Hintergrund gezeichnet werden soll. Angabe in px.

### Bar-Einstellungen

Die hier eingegeben Werte gelten nur, wenn der Chart Typ auf Bar gestellt ist.

#### Füllfarbe

Die Farbe mit der eine Füllung der Balken gezeichnet werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Zeige Labels

Soll die Bezeichnung der Datenpunkte an den Balken angezeigt werden kann man hier die Position dieser Bezeichnung bestimmen.

**nichts:** keine Bezeichnung

**oben über:** oberhalb des Balkens

**oben unten:** oben innerhalb des Balkens unter der Oberkante

**unten:** unten im Balken

**mittig:** auf halber Höhe im Balken

#### Barbreite

Angabe der Balkenbreite in px

#### Labelschriftgröße

Angabe der Schriftgröße in px

#### Labelfarbe

Die Farbe mit der die Bezeichnung der Balken gezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

### Beschriftung

In dieser Kategorie geht es um die mögliche Beschriftung des Charts

#### Beschriftung

Hier wird eine Beschriftung festgelegt, die im oder am Chart erscheinen soll eingegeben. In den meisten Fällen wird dies der Titel des Charts sein.

#### Beschriftungsposition

Der Titel kann an verschiedenen Stellen des Charts platziert werden. Diese sind über das Pulldownmenü verfügbar.

#### Titelfarbe

Die Farbe mit der Titel des Charts gezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Titelgröße

Die Schriftgröße der Beschriftung kann in % einer Standardgröße, in px oder in pt angegeben werden. Soll der Chart später in einem skalierbaren Fenster dargestellt werden empfiehlt sich die Größenangabe in %.

### Options

In dieser Kategorie werden zusätzliche Items und Features konfiguriert um dem Chart den letzten Schliff zu geben.

#### Zeige Legende

Hier wird ausgewählt ob eine Legende angezeigt werden soll und wenn ja, wo diese platziert wird. Damit die Legende nicht die Kurven verdeckt, ist die Position sinnvollerweise davon abhängig wie der Chart aufgebaut ist.

#### Spalten in Legende

Bei sehr vielen Datenpunkten bietet es sich an, die Datenpunkte in der Legende in mehreren Spalten anzuzeigen.

#### Legende Opacity (0-1)

Die Farbdichte der Legende wirde mit Werten von 0 bis 1 angegeben (0=transparent; 1= dicht)

#### Legende Hintergrund

Die Farbe mit derder Hintergrund der Legende gezeigt werden soll kann als Hex (#FF0000), rgb (rgb(21, 120, 210)) oder als rgba (rgba(0, 0, 255, 0.6)) eingegeben werden. Klickt man auf das Feld, öffnet sich ein rgba Colorpicker in dem der Wert graphisch ermittelt werden kann.

#### Hover Details

Ist diese Checkbox angehakt, werden die Daten zu der Kurve angezeigt, wenn man mit der Maus die Linie abfährt.

#### Time Format

Standardmäßig wird das Zeitformat verwendet wie es in den Systemeinstellungen vorgegeben wurde. Alternativ können viele andere Frormate für den Chart verwendet werden.

#### Benutze Komma

Ist diese Checkbox angehakt wird als Dezimaltrennzeichen ein Komma benutz. Ansonsten wird der Dezimalpunkt verwendet

#### Aktiviere Zoom und Schieben

Die Aktivierung dieser Checkbox ermöglicht die Charts in der Live-Darstellung durch Mausbewegungen in der Zeitachse zu zoomen und zu verschieben.

#### Kein 'Edit'-Knopf

Ist diese Checkbox aktiviert wird das "Bleistift-Icon" in der rechten oberen Ecke des Chart-Fensters nicht angezeigt. Dieses Icon öffnet ansonsten diesen Chart im edit-Modus

#### Animation

Hier kann angegeben werden ob bei dem Öffnen des Charts dieser sofort zur Verfügung stehen soll, oder durch eine Animation aufgebaut wird. Hier wird die Dauer dieser Animation festgelegt.

## Link

In diesem Feld werden sämtliche Daten, die in den vorausgegangenen Menüs konfiguriert wurden in Textform zusammengefasst. Wenn man diesen Link bei vis in ein iFrame-Widget kopiert wird dort der Chart komplett angezeigt. Der Button _**zeige im Fenster**_ öffnet einen weiteren Tab im Browser und zeigt dort den Chart an. Diese Seite kann man zum Speichern des Charts bookmarken. Die Schaltfläche _**Update preview**_ zeigt in dem Vorschaufenster die letzten Änderungen. Wenn unter _**input data**_ die Checkbox autoupdate angehakt ist, steht diese Schaltfläche nicht zur Verfügung. Das Vorschaufenster aktualisiert dann bei jeder Änderung automatisch

## Changelog
### 1.10.7 (2021-08-31)
* (sbormann) Enhanced the preset list (now shows the full link and the edit link)
 
### 1.10.6 (2020-12-21)
* (nobodyMO) added the X value mover and Y value multiplication

### 1.10.4 (2020-11-13)
* (Apollon77/harvey637) use browser timezone

### 1.10.2 (2020-08-09)
* (Apollon77/jlegen) color picker in flot edit page fixed

### 1.10.1 (2020-08-02)
* (sbormann) preset.html updated to allow german umlaute
* (Apollon77) add www directory to GitHub to allow GitHub installs

### 1.10.0 (2020-05-14)
* (sbormann) preset.html added to display a list of stored flot presets with direct links

### 1.9.2 (2018-08-18)
* (Seqway) Translations

### 1.9.1 (2018-06-04)
* (bluefox) Added dashed lines
* (bluefox) All JS files together are concatenated
* (bluefox) Show days of week (dow) in time axis.

### 1.8.0 (2018-05-04)
* (bluefox) Optimize communication

### 1.7.9 (2018-05-01)
* (bluefox) Added support of multi-languages in names

### 1.7.7 (2018-03-04)
* (Apollon77) fix month range

### 1.7.6 (2018-02-16)
* (Apollon77) remove alert windows from errors, log instead

### 1.7.5 (2018-01-13)
* (bluefox) try to fix small error

### 1.7.4 (2018-01-05)
* (bluefox) The loading via cloud is fixed

### 1.7.1 (2017-12-14)
* (bluefox) Fixed the loading of presets
* (bluefox) Added new date formats for X axis

### 1.7.0 (2017-10-17)
* (bluefox) Add presets

### 1.6.2 (2017-08-12)
* (bluefox) Show chart at start

### 1.6.1 (2017-03-25)
* (bluefox) Change edit layout

### 1.5.9 (2017-02-27)
* (bluefox) New color picker
* (bluefox) If 'none' for title selected => do not show any title
* (bluefox) add date format 'dd.mm.'

### 1.5.8 (2017-02-01)
* (bluefox) Add series as X ticks

### 1.5.7 (2017-01-26)
* (bluefox) Small fix in smoothing algorithm

### 1.5.6 (2016-11-04)
* (bluefox) fix marking line

### 1.5.4 (2016-10-13)
* (bluefox) remove area, line plot
* (bluefox) add fill value, points option

### 1.5.3 (2016-10-08)
* (bluefox) Allow using of IDs in the marking
* (bluefox) Support of filled markings

### 1.5.2 (2016-09-30)
* (bluefox) fix range and offset if month or year
* (bluefox) fix after comma settings

### 1.5.1 (2016-09-15)
* (bluefox) Filter IDs depends on storage instance

### 1.5.0 (2016-09-10)
* (bluefox) Support of marking lines

### 1.4.0 (2016-08-30)
* (bluefox) support bar chart (only one bar chart possible)

### 1.3.5 (2016-08-14)
* (bluefox) support of web-sockets force

### 1.3.4 (2016-07-23)
* (nobodyMO) Add app support
* (nobodyMO) Fix for jquery to the current version in vis

### 1.3.3 (2016-06-16)
* (bluefox) remove RTL direction in id field

### 1.3.2 (2016-06-13)
* (bluefox) add settings for border color and border width
* (bluefox) make splines work

### 1.3.1 (2016-06-07)
* (bluefox) add spline file

### 1.3.0 (2016-05-29)
* (bluefox) add animation
* (bluefox) remove smoothing, because does not work
* (bluefox) try to add splines, but it does not work always

### 1.2.5 (2016-05-28)
* (bluefox) do not include nulls by smoothing

### 1.2.4 (2016-05-27)
* (bluefox) show edit button

### 1.2.3 (2016-05-25)
* (bluefox) fix digits after comma
* (bluefox) fix start and finish points

### 1.2.2 (2016-05-22)
* (bluefox) change default aggregation name
* (bluefox) add units in tooltip

### 1.2.1 (2016-05-13)
* (bluefox) implement loading indicator

### 1.2.0 (2016-05-05)
* (bluefox) implement zoom and pan
* (bluefox) support ms
* (bluefox) support m4
* (bluefox) support of pan and zoom on touchable devices
* (bluefox) support of 3 types of "null" handling: use nulls, use last value instead of null, use 0 instead of 0
* (bluefox) update interval in seconds
* (bluefox) smoothing and "after comma" per variable

### 1.1.0 (2016-04-09)
* (bluefox) change splash screen
* (bluefox) ignoreNull per variable
* (bluefox) fix x axis

### 1.0.0 (2016-04-09)
* (bluefox) enable editing of created charts
* (bluefox) enable set of label colors
* (bluefox) enable set of window background

### 0.2.6 (2016-02-24)
* (Pmant) remove ignore null per state

### 0.2.5 (2016-02-14)
* (Pmant) add ignore null per state
* (Pmant) change commonYAxis per state

### 0.2.4 (2016-01-31)
* (ldsign) Title/help attribute for lineWidth and ShadowSize table head
* (ldsign) option for shadowSize
* (nobodyMO) Add option commonYAxis
* (bluefox) add favicon and title

### 0.2.3 (2016-01-26)
* (ldsign) user selectable time (hours/minutes) for static timeArt

### 0.2.2 (2015-12-17)
* (bluefox) fix SelectID for safary

### 0.2.1 (2015-12-14)
* (Smiling_Jack) support of new History concept
* (Smiling_Jack) new editor & working on axis
* (bluefox) add onchange aggregation
* (Smiling_Jack) add ignoreNull
* (Smiling_Jack) working on flot nav
* (bluefox) import old settings

### 0.1.1 (2015-07-13)
* (bluefox) fix time format

### 0.1.0 (2015-07-10)
* (bluefox) lines are implemented

### 0.0.2 (2015-07-09)
* (bluefox) implement title and sort points

### 0.0.1 (2015-03-27)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2021 bluefox<dogafox@gmail.com>