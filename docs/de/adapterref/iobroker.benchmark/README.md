---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: rUUVjscVITKtSuwB4lU6fnF6HH/VHoidSaVqBT9yIds=
---
![Logo](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Anzahl der Installationen](https://iobroker.live/badges/benchmark-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/benchmark-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/foxriver76/iobroker.benchmark.svg)
![NPM](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)

# IoBroker.benchmark
**Tests:** ![Testen und freigeben](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## Benchmark-Adapter für ioBroker
Benchmarken Sie Ihr System.

## Wichtig: Informationen für Nutzer
Beachten Sie, dass der Adapter in seinem aktuellen Zustand hauptsächlich dazu dient, verschiedene Szenarien zu vergleichen, um Erkenntnisse über Änderungen auf js-Controller-Ebene zu gewinnen.
Die Benchmark-Tests können sehr lange dauern und Ihr System stark belasten. Beachten Sie auch, dass der Benchmark-Adapter standardmäßig in einem isolierten Modus ausgeführt wird, der alle Adapter deaktiviert und nur den Controller und sich selbst am Leben hält. Außerdem muss der Adapter immer mit der Instanznummer `0` laufen.

## Wie füge ich einen neuen Test hinzu?
1. Erstellen Sie eine neue TypeScript-Datei in src/lib/activeTests mit einer Klasse, die von TestUtils erbt
2. Definieren Sie die drei (fünf) Schritte Ihres Tests (die Ausführung wird automatisch gemessen)
3. Fügen Sie Ihren Test zu src/lib/allTests.ts hinzu
4. Fügen Sie eine Schaltfläche und eine Übersetzung für Ihren Test zu admin/jsonConfig.json hinzu

## Testbeschreibung
### GetStates
Führt `iterations` mal `getState` aus.

### GetStateAlias
Führt `iterations` mal `getState` auf einem Alias aus.

### GetStateAliasRead
Führt `iterations` mal `getState` auf einem Alias aus. Der Alias hat eine einfache Lesefunktion.

### Leerlauf
Wartet nur `iterations` ms.

### Mitteilungen
Erstellt eine sekundäre Benchmark-Instanz. Die Controller-Instanz sendet dann `iterations` Nachrichten an die sekundäre Instanz.
Wenn alle Nachrichten empfangen wurden, ist der Test beendet.

###ObjekteErstellung
Erstellt `iterations` Objekte über `setObject`.

###ObjekteLöschen
Löscht `iterations` Objekte über `delObject`.

### ObjectViewEqual
Erzeugt 10.000 Objekte, von denen 50 % für die Objektansicht relevant sind. Dann führt es `iterations` Objektansichten aus.

### ObjectViewLarge
Erzeugt 10.000 Objekte, von denen 98% für die Objektansicht relevant sind. Dann führt es `iterations` Objektansichten aus.

### ObjectViewSmall
Erzeugt 10.000 Objekte, von denen nur 2 % für die Objektansicht relevant sind. Dann führt es `iterations` Objektansichten aus.

### SetStates
Setzt `iterations` Zustände über `setState`

### SetStatesNonStrict
Setzt `iterations` Zustände über `setState`, aber `strictObjectChecks` sind deaktiviert.

### SetStatesParallel
Fügt 30 sekundäre Instanzen hinzu, jede Instanz setzt `iterations`-Zustände. Auf Systemebene setzen die Instanzen diese Zustände parallel, aber auf Instanzebene müssen die vorherigen `setState` beendet werden, bis der nächste gesetzt wird.
Dieser Test zielt darauf ab, Multicore-Systeme zu vergleichen.

### StaatenLöschung
Löscht `iterations` Staaten über `delState`.

### StaatenAbonnement
Die Controller-Instanz abonniert einen bestimmten Namespace. 4 Secondaries setzen jeweils `iterations / 4` Zustände. Sobald der Controller alle `iterations` Veröffentlichungen erhalten hat, ist der Test beendet.

### StatesSubscriptionAlias
Die Controller-Instanz abonniert einen Alias-Namespace. 4 Secondaries setzen jeweils `iterations / 4` Alias-Zustände. Sobald der Controller alle `iterations` Veröffentlichungen erhalten hat, ist der Test beendet.

### StaatenSubscriptionAliasWrite
Die Controller-Instanz abonniert einen Alias-Namespace. 4 Secondaries setzen jeweils `iterations / 4` Alias-Zustände. Sobald der Controller alle `iterations` Veröffentlichungen erhalten hat, ist der Test beendet.
Der Alias enthält eine einfache Schreibfunktion.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.0 (2021-11-24)
* (foxriver76) we introduced some categories in the user interface
* (foxriver76) we switched to checkboxes to allow to execute a subset of all tests

### 0.3.2 (2021-11-23)
* (foxriver76) we now also remove secondary instances on clean up

### 0.3.1 (2021-11-23)
* (foxriver76) we now prettify the summary file

### 0.3.0 (2021-11-22)
* (foxriver76) we added three `getObjectView` tests

### 0.2.0 (2021-11-20)
* (foxriver76) we added a parallel `setState` test for multicore performance evaluation (closes #5)

### 0.1.15 (2021-11-19)
* (foxriver76) internal simplification

### 0.1.14 (2021-11-19)
* (foxriver76) make cooldown dependent on test time (closes #4)
* (foxriver76) on last iteration of last test we do not need to cooldown

### 0.1.13 (2021-10-25)
* (foxriver76) fix iob executable to also work on Windows systems (closes #3)

### 0.1.8 (2021-10-20)
* (foxriver76) make `addInstances` wait that instance is actually alive

### 0.1.7 (2021-09-26)
* (foxriver76) added test for alias subscription with write function

### 0.1.6 (2021-09-26)
* (foxriver76) added tests for subscription with alias, getStates with alias read

### 0.1.5 (2021-09-24)
* (foxriver76) added db types to summary

### 0.1.4 (2021-09-23)
* (foxriver76) fixed `actionsPerSecondStd` state
* (foxriver76) added tests `getStatesAlias` and `messages`
* (foxriver76) fixed execution of `getStates` test

### 0.1.3 (2021-09-23)
* (foxriver76) optimize JSON file writing
* (foxriver76) added tests `objectsDeletion` and `getStates`

### 0.1.2 (2021-09-22)
* (foxriver76) fixed statesDeletion test

### 0.1.1 (2021-09-22)
* (foxriver76) implemented `cleanUpBetweenEpoch` and `prepareBetweenEpoch` to save ressources

### 0.1.0 (2021-09-21)
* (foxriver76) write mem stats in MB
* (foxriver76) write summary file
* (foxriver76) also monitor js-controller
* (foxriver76) add overall summary state
* (foxriver76) add epochs and iterations to summary
* (foxriver76) added logging + restructuring code
* (foxriver76) added cleanup button and allow prefixing ids

### 0.0.3 (2021-09-20)
* (foxriver76) we fixed actionsPerSecondStd state if only one epoch

### 0.0.2 (2021-09-20)
* (foxriver76) we fixed actionsPerSecondStd state

### 0.0.1 (2021-09-20)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2021 Moritz Heusinger <moritz.heusinger@gmail.com>

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

The adapter icon has been designed using resources from Flaticon.com