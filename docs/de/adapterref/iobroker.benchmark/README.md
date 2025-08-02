---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: brxDyt/UU9UqJNVafQVjgXMie7jujWu3vCENfPN/0xI=
---
![Logo](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Anzahl der Installationen](https://iobroker.live/badges/benchmark-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/benchmark-stable.svg)
![NPM](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)

# IoBroker.benchmark
**Tests:** ![Testen und Freigeben](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## Benchmark-Adapter für ioBroker
Benchmarken Sie Ihr System.

## Wichtig: Informationen für Benutzer
Beachten Sie, dass der Adapter in seinem aktuellen Zustand hauptsächlich dazu dient, verschiedene Szenarien zu vergleichen, um Erkenntnisse über Änderungen auf JS-Controller-Ebene zu gewinnen.
Die Benchmark-Tests können sehr lange dauern und Ihr System stark belasten. Beachten Sie auch, dass der Benchmark-Adapter standardmäßig in einem isolierten Modus ausgeführt wird, der alle Adapter deaktiviert und nur den Controller und sich selbst am Leben hält. Darüber hinaus muss der Adapter immer mit der Instanznummer `0` ausgeführt werden.

## Wie füge ich einen neuen Test hinzu?
1. Erstellen Sie eine neue TypeScript-Datei in src/lib/activeTests mit einer Klasse, die von TestUtils erbt
2. Definieren Sie die drei (fünf) Schritte Ihres Tests (die Ausführung wird automatisch gemessen)
3. Optional: Wenn Ihr Test bestimmte Anforderungen hat, z. B. muss der Controller `>=3.0.0` sein, geben Sie die Anforderungen bitte weiter an

der übergeordnete Konstruktor

4. Fügen Sie Ihren Test zu src/lib/allTests.ts hinzu
5. Fügen Sie eine Schaltfläche und eine Übersetzung für Ihren Test zu admin/jsonConfig.json hinzu

### Testanforderungen
Einige Tests können Anforderungen haben. Wenn das System die Anforderungen nicht erfüllt, wird der Test übersprungen.
Im Konstruktor sollten Sie die Anforderungen an die übergeordnete Klasse übergeben, wie

```typescript
public constructor(adapter: AdapterInstance) {
    super(adapter, {freeMemory: 2000});
}
```

Derzeit werden folgende Anforderungen unterstützt:

- `controllerVersion` - wenn Methoden getestet werden, die mit einer bestimmten Controller-Version eingeführt wurden, der Benchmark

Adapter sollte nicht versuchen, diese Tests auf einem nicht unterstützenden Controller auszuführen

- `freeMemory` - definiert den benötigten Speicher des Tests, dies ist nur notwendig, wenn Sie z.B. viele Instanzen hinzufügen

## Testbeschreibung
### GetStates
Führt `iterations` mal `getState` aus.

### GetStatesAlias
Führt `iterations` mal `getState` auf einem Alias aus.

### GetStatesAliasRead
Führt `iterations` mal `getState` auf einem Alias aus. Der Alias hat eine einfache Lesefunktion.

### GetStatesMulti
Erstellt 10.000 Zustände und führt dann `iterations` mal `getStates` auf ihnen aus.

### GetStatesMultiAlias
Erstellt 10.000 Aliaszustände und führt dann `iterations` mal `getStates` auf ihnen aus.

### Leerlauf
Wartet einfach `iterations` ms.

### Mitteilungen
Erstellt eine sekundäre Benchmark-Instanz. Die Controller-Instanz sendet dann `iterations`-Nachrichten an die sekundäre Instanz.
Wenn alle Nachrichten empfangen wurden, ist der Test beendet.

### ObjekteErstellung
Erstellt `iterations`-Objekte über `setObject`.

### ObjekteLöschen
Löscht `iterations`-Objekte über `delObject`.

### ObjektViewEqual
Erstellt 10.000 Objekte, wobei 50 % davon für die Objektansicht relevant sind. Anschließend führt es `iterations` Objektansichten aus.

### ObjektAnsichtGroß
Erstellt 10.000 Objekte, von denen 98 % für die Objektansicht relevant sind. Anschließend führt es `iterations` Objektansichten aus.

### ObjektAnsichtKlein
Erstellt 10.000 Objekte, von denen nur 2 % für die Objektansicht relevant sind. Anschließend führt es `iterations` Objektansichten aus.

### Zustände festlegen
Setzt `iterations` Zustände über `setState`

### SetStatesNonStrict
Legt `iterations`-Zustände über `setState` fest, aber `strictObjectChecks` sind deaktiviert.

### SetStateParallel
Fügt 30 sekundäre Instanzen hinzu, jede Instanz setzt `iterations`-Zustände. Auf Systemebene setzen die Instanzen diese Zustände parallel, aber auf Instanzebene muss der vorherige `setState` abgeschlossen sein, bis der nächste gesetzt ist.
Dieser Test zielt darauf ab, Multicore-Systeme zu vergleichen.

__Anforderungen__: 2 GB freier Speicher

### StaatenLöschung
Löscht `iterations`-Zustände über `delState`.

### StaatenAbonnement
Die Controllerinstanz abonniert einen bestimmten Namespace. 4 Secondaries setzen jeweils `iterations / 4`-Zustände. Sobald der Controller alle `iterations`-Veröffentlichungen erhalten hat, ist der Test beendet.

### StatesSubscriptionAlias
Die Controllerinstanz abonniert einen Alias-Namespace. 4 Secondaries setzen jeweils `iterations / 4` Alias-Zustände. Sobald der Controller alle `iterations`-Veröffentlichungen erhalten hat, ist der Test beendet.

### StaatenAbonnementAliasSchreiben
Die Controllerinstanz abonniert einen Alias-Namespace. 4 Secondaries setzen jeweils `iterations / 4` Alias-Zustände. Sobald der Controller alle `iterations`-Veröffentlichungen erhalten hat, ist der Test beendet.
Der Alias enthält eine einfache Schreibfunktion.

### StaatenAbonnementEinzel
Zehn Sekundärknoten abonnieren jeweils die gleichen `iterations`-Zustände. Anstatt jeweils einen `subscribe`-Aufruf zu verwenden, führen Sie jeweils `iterations`-Einzelaufrufe durch. Sobald alle `ìterations` von jedem Sekundärknoten empfangen wurden, ist der Test beendet.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.3.0 (2024-06-03)
* (foxriver76) added test `statesSubscriptionSingle`

### 1.2.0 (2024-04-16)
* (foxriver76) added `controllerVersion` to results

### 1.1.4 (2022-12-30)
* (foxriver76) fixed cleanup after `getStatesMulti`

### 1.1.3 (2022-12-30)
* (foxriver76) fixed a bug, where `getStatesMultiAlias` did not remove alias objects

### 1.1.1 (2022-12-30)
* (foxriver76) fixed a bug, where `getStatesMultiAlias` created wrong amount of objects

### 1.1.0 (2022-11-17)
* (foxriver76) added `getStatesMulti` and `getStatesMultiAlias`

### 1.0.0 (2022-06-10)
* (foxriver76) the config is now applied directly from frontend without requiring to save first

### 0.5.1 (2022-02-26)
* (foxriver76) changed type in io-package to `utility`
* (foxriver76) updated deps
* (foxriver76) added `dataSource` to io-package

### 0.5.0 (2022-01-01)
* (foxriver76) we introduced `TestRequirements` which can define required memory, controller and node version

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

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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