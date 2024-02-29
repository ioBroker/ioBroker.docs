---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
---
**Hinweis: Momentan beinhaltet die englische Version viel mehr Information und wir empfehlen die zu lesen**

Der javascript-Adapter dient dazu komfortabel Skripte zu erstellen, editieren und zu verwalten.

## Konfiguration
[Hier ist mehr darüber](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)


![Einstellungsmenü Javascript Adapter](img/javascript_Einstellungen-Javascript.png)
   Die eigentliche Konfiguration besteht aus der Eingabe von zusätzlichen zu ladenden npm-Modulen (durch Komma getrennt), sowie der Geo-Koordinaten, die für diverse Berechnungen benutzt werden sollen. Um die Koordinaten zu erhalten, kann man z.B. _google maps_ ziemlich weit aufzoomen und an der gewünschten Stelle anklicken. Die Koordinaten werden dann angezeigt. Nach dem Speichern muss der Adapter noch über die rote Play-Taste aktiviert werden.

* * *

## Bedienung
Bei der Installation wird ein weiterer Reiter _Scripte_ in der _Admin_-Oberfläche gezeigt. Hier wird ein neuer Ordner angelegt, indem auf das (+) in der Symbolleiste (roter Kreis) geklickt wird.  Ein neues Skript wird über das "leere Blatt"-Icon links davon angelegt. Ein Fenster öffnet sich und fragt den Namen und Speicherort in der Ordnerstruktur ab. 
![Javascript Adapter](img/javascript_Javascript-Adapter.png)


### Ordner- und Dateiliste
Die Ordnerstruktur kann nach eigenem Wunsch angelegt werden. Der Speicherort hat keine Auswirkungen auf die Funktionalität des Skriptes. Neben der Baumstruktur gibt es eine Listenansicht. Ein Suchfeld erleichtert das Wiederfinden von Skripten. Damit ein Skript läuft, muss es links in der Ordnerstruktur durch klick auf den roten _Play_-Knopf aktiviert werden. Zum Stoppen auf den grünen _Pause_-Knopf drücken. Für jedes Skript wird ein neues Objekt angelegt. Es trägt den Skriptnamen mit dem Zusatz `_enabled` und liegt im Ordner `javascript.Instanz.ScriptEnabled`. Das Objekt zeigt mit (`true/false`) an, ob das Skript läuft. Der Zustand kann auch gesetzt werden, um das Skript ein-/auszuschalten. Skripte, die im Ordner _global_ gespeichert wurden, sind globale Skripte. Diese werden intern vor jedes andere Skript kopiert, also vorher abgearbeitet. Somit lassen sich globale Funktionen auf mehrere Skripte anwenden. Variablen in globalen Skripten können in anderen Skripten benutzt werden. Aber Achtung: Jedes Skript hat seinen eigenen Variablen-Raum. Man kann Variablen in globalen Skripten also nicht dazu benutzen um Werte zwischen Skripten auszutauschen. Dazu müssen zwingend Objekte (States) genutzt werden.  

### Editor
Nach dem Anlegen öffnet sich rechts der Editor für _Javascript_. Einige Beispielskripte finden sich [hier](http://www.iobroker.net/docu/?page_id=2786&lang=de).

#### Name
Hat man vorher einen Namen vergeben, wird dieser hier angezeigt und kann geändert werden.

#### Speicherort
In diesem Dropdown werden alle angelegten Ordner angezeigt. Zurzeit sind sie in der chronologischen Folge ihrer Erstellung sortiert.

#### Enginetyp
hier kann ausgewählt werden, ob mit der _javascript_ oder der _coffeescript_ engine gearbeitet werden soll.

#### Log
Rechts unten findet sich das Log-Fenster für die Ausgabe aller das markierte Skript betreffende Logs. Die Logs werden nach dem Abspeichern/Neustart des Skriptes angezeigt.

* * *

## Tipps
### Backup
Um Skripte im Zweifel wiederherstellen zu können, sei die Sicherung per _Copy & Paste_ empfohlen.

### Test-Instanz
Es hat sich bewährt, zum Testen von neuen Skripten, eine weitere Javascript-Instanz anzulegen und das Skript in dieser Instanz zu starten. 
Hinter dem Skriptnamen lässt sich per Dropdown die gewünschte Instanz einstellen. 
Sollte im Skript ein schwerwiegender Fehler sein, beendet sich nur diese zusätzliche Testinstanz, nicht die Produktivinstanz. 

![Instanz Javascript Adapter wählen](img/screen.jpg)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Added block to create new objects
* (klein0r) Added HTTP get and post function
* (klein0r) Droped support of coffeescript (deprecated since version 6.0.0)
* (klein0r) Raise warning if more than 100 triggers have been registered
* (klein0r) Fixed astro state calculation (and display server time in dialog)

### 7.8.0 (2024-01-29)

* (klein0r) Added block for multiple or conditions
* (klein0r) Raised supported ecmaVersion from es2018 to es2021
* (klein0r) Fixed getIdByName (returned the same id as array)

### 7.7.0 (2024-01-14)

* (klein0r) Added block for multiple and conditions

### 7.6.3 (2024-01-11)

* (klein0r) Fixed bug in formatTimeDiff Blockly

### 7.6.2 (2024-01-02)

* (klein0r) Added missing console.info()
* (klein0r) Added missing type hints
* (klein0r) Creation of astro states is now optional
* (klein0r) Fixed logging of objects/sets

### 7.6.0 (2023-12-26)

* (klein0r) Added schedules by state value (scheduleById)

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker

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