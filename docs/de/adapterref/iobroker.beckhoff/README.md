---
BADGE-GitHub: https://img.shields.io/github/license/dkleber89/ioBroker.beckhoff
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
---
[![Build Status](https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master)](https://travis-ci.org/dkleber89/ioBroker.beckhoff) [![Build status](https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true)](https://ci.appveyor.com/project/dkleber89/iobroker-beckhoff/branch/master) ![npm](https://img.shields.io/npm/dm/iobroker.beckhoff)
[![npm](https://img.shields.io/npm/v/iobroker.beckhoff.svg)](https://www.npmjs.com/package/iobroker.beckhoff) ![Number of Installations](http://iobroker.live/badges/beckhoff-stable.svg)  ![Number of Installations](http://iobroker.live/badges/beckhoff-installed.svg)

![Logo](img/beckhoff.png)

# ioBroker.beckhoff
Dieser ioBroker Adapter realisiert die Kommunikation mit eine Beckhof Steuerung (Twincat 2 oder 3) über das ADS Protokoll.
Das ADS Protocol ist in jeder Beckhoff Steuerung implementiert und kann ohne Lizenz verwendet werden.

Dieses Projekt hat keine Verbindung mit der Firma Beckhoff

## Beschreibung
### Anforderungen
* Beckhoff mit Netzwerkanschluss die in einem vom ioBroker erreichbaren Netzwerk hängt
    * Der Steuerung muss eine fixe IP-Adresse vergeben werden
    * Die Steuerung muss vom ioBroker pingbar sein
    * TwinCat 2 **ausgenommen BC Steuerungen** oder TwinCat 3

### Konfiguration der Steuerung
1. Im Projekt muss ADS aktiviert sein. Dazu im Steuerungsproject in die Taskkonfiguration gehen und die Checkbox `Symbole erzeugen` aktivieren. Dann die Konfiguration auf die Steuerung laden und diese neu starten. Ein Neustart ist nur nötig wenn TwinCat 2 verwendet wird.

    ![createSymbols](img/createSymbols.png)

2. In der Steuerung muss eine Statische Route angelegt werden. Die Route muss mit dem ioBroker zusammenpassen (IP-Adresse und AMS-Net-ID).

    Hier ein Beispiel wie das aussehen kann wenn die Route direkt auf der Steuerung hinzugefügt wird. Die Route kann auch über den Engineerien Rechner hinzugefügt werden.

    ![createSymbols](img/addRoute.png)

    Weitere Informationen über den TwinCat Router und die Steuerung allgemein kann im [Beckhoff Information System](https://infosys.beckhoff.com/ "Beckhoff Information System") nachgelesen werden.

3. Bei TwinCat 2 muss in der Steuerung noch eine Struktur angelegt werden. Die Struktur danach zu einer globalen Variablentabelle hinzufügen. Hier können dann alle benötigten Variablen angelegt werden. Der Datenaustausch wird dann von ADS und dem Adapter selbstständig ausgeführt.

    ##### Derzeit unterstützte Datentypen: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, STRING(80)

    OPTIONAL: Es kann eine Variable direkt in der Variablentabelle ohne Verschachtelung mit einem exakten Namen angelegt werden -> ioBrokerResync (Groß-/Kleinschreibung und Datentyp ist egal) -> Jedes mal wenn sich dieser Wert ändert wird die Variablentabelle im ioBroker neu eingelesen.

3. Bei TwinCat 3 muss in der Steuerung noch eine globale Variablentabelle angelegt werden. Hier können dann alle benötigten Variablen angelegt werden. Der Datenaustausch wird dann von ADS und dem Adapter selbstständig ausgeführt.

    ##### Derzeit unterstützte Datentypen: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, STRING(80)

    OPTIONAL: Es kann eine Variable direkt in der Variablentabelle ohne Verschachtelung mit einem exakten Namen angelegt werden -> ioBrokerResync (Groß-/Kleinschreibung und Datentyp ist egal) -> Jedes mal wenn sich dieser Wert ändert wird die Variablentabelle im ioBroker neu eingelesen.

### Adapter Einstellungen
#### Twincat 3 und Twincat 2
1. Runtimeversion auswählen
2. Ziel IP-Adress und AMS-Net-ID eintragen.
3. Bei TwinCat 2 den Instanznamen der Struktur aus der globale Variablentabelle eintragen.
4. Bei TwinCat 3 den korrekten Variablentabellennamen eintragen.
5. Die restlichen Punkte müssen normalerweise nicht geändert werden.

#### Twincat 2 <= v2.11.2240
Die *.tpy Datei aus dem SPS Projekt muss hochgeladen werden. -> Immer wenn am Struct der für die Kommunikation zum ioBroker zuständig ist etwas geändert wird muss diese Datei nochmals hochgeladen werden.

### Datenaustausch
- Sobald sich eine Variable in der Steuerung ändert wird dieser Wert selbstständig in den jeweiligen State im ioBroker übertragen.
- Wird ein Wert im ioBroker geändert (Wichtig: ACK muss FALSE sein!!) wird dieser selbstständig an die Steuerung übertragen. Wird der Wert von der Steuerung übernommen wird ACK auf TRUE gesetz.

### Wichtiges
1. Der TwinCAT AMS Router lässt keine mehrfachen TCP Verbindungen vom gleichen Host zu. Wenn zwei Instanzen vom selben Host zum selben TwinCat Router aufgebaut werden so wird vom Router automatisch die erste Verbindung geschlossen und nur der neusten geantwortet.
2. Der Adapter syncronisiert automatisch alle Variablen im ioBroker. Es gibt mehrere Möglichkeiten wie ein resync getriggert werden kann:
    - Wenn sich der Wert der Resyc Variable ändert (Siehe [hier](#Konfiguration-der-Steuerung))
    - Wenn die Steuerung länger nicht im RUN Modus ist als der Reconnect Interval -> Dann wird beim übergang der Steuerung in den RUN Modus die Variablentabelle resynchronisiert.
    - Wenn das Project auf die Steuerung geladen wird. Ausnahme -> OnlineChange
    - Wenn der Adapter neu gestartet wird.
3. Bei "Synchronisierung" bzw. "Einlesen" ist nicht der Werteaustausch der Variablen gemeint sondern die Synchronisierung der Variablen selbst und das anlegen bzw. löschen derselben im ioBroker

## Changelog
### 1.4.1 (2021-06-13)

-   (dkleber89) Some little Adapter maintenance

### 1.4.0 (2021-01-25)

-   (dkleber89) Add LREAL Support

### 1.3.0 (2021-01-25)

-   (dkleber89) Set correct type for channels

### 1.2.2 (2020-05-30)

-   (dkleber89) Clear reconnectTimeout on Adapter unload;

### 1.2.1 (2020-04-20)

- (dkleber89) Add CI over Github Actions; Update Dependencies;

### 1.2.0 (2020-01-02)

- (dkleber89) Add Support for Strings with fixed length to 80 Chars

### 1.1.0 (2019-11-12)

- (dkleber89) Add Support for older TwinCat2 Systems with no autosync

### 1.0.7 (2019-10-25)

- (dkleber89) Add Support for Compact Mode -> JS Controller >= 2.0.0

### 1.0.6 (2019-08-11)

-   (dkleber89) Add check change of Datatype on resync

### 1.0.5 (2019-08-10)

-   (dkleber89) Eslint, Prettier with Airbnb Codestyle, CI adopted, little random changes in Project Structure

### 1.0.4 (2019-08-01)

-   (dkleber89) Increase depth of LOG details, Update dependency versions

### 1.0.2 (2019-05-18)

-   (Appollon77) Update testing for Node.js v12 in Appveyor und Travis

## License

The MIT License (MIT)

Copyright (c) 2018-2021 dkleber89 <dkleber89@gmail.com>

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