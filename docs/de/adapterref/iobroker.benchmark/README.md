---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: u3od+d2yrTu88w5rNT2uk1IcUsxDiAdfm3Xg0JOcUZg=
---
![Logo](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Anzahl der Installationen](https://iobroker.live/badges/benchmark-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/benchmark-stable.svg)
![NPM](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)
![Test und Freigabe](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

# ioBroker.benchmark

## Benchmark-Adapter für ioBroker

Testen Sie Ihr System.

## Wichtig: Informationen für Nutzer

Beachten Sie, dass der Adapter in seiner aktuellen Form hauptsächlich dazu dient, verschiedene Szenarien zu testen, um Erkenntnisse über Änderungen auf der Ebene des JS-Controllers zu gewinnen. Die Benchmark-Tests können sehr lange dauern und Ihr System stark belasten. Beachten Sie außerdem, dass der Benchmark-Adapter standardmäßig im isolierten Modus ausgeführt wird. Dadurch werden alle anderen Adapter deaktiviert, und nur der Controller und der Adapter selbst bleiben aktiv. Darüber hinaus muss der Adapter immer mit der Instanznummer ausgeführt werden.`0` Die

## Wie füge ich einen neuen Test hinzu?

1. Erstellen Sie eine neue TypeScript-Datei in src/lib/activeTests mit einer Klasse, die von TestUtils erbt.
2. Definieren Sie die drei (fünf) Schritte Ihres Tests (die Ausführung wird automatisch gemessen).
3. Optional: Falls Ihr Test bestimmte Anforderungen hat, z. B. muss der Controller …`>=3.0.0` Bitte übergeben Sie die Anforderungen an den übergeordneten Konstruktor.
4. Füge deinen Test zu src/lib/allTests.ts hinzu.
5. Fügen Sie in admin/jsonConfig.json eine Schaltfläche und eine Übersetzung für Ihren Test hinzu.

### Testanforderungen

Manche Tests haben Voraussetzungen. Wenn das System diese Voraussetzungen nicht erfüllt, wird der Test übersprungen. Im Konstruktor sollten Sie die Voraussetzungen an die Oberklasse übergeben, zum Beispiel:

```typescript
public constructor(adapter: AdapterInstance) {
    super(adapter, {freeMemory: 2000});
}
```

Aktuell werden folgende Anforderungen unterstützt:

- `controllerVersion` - Wenn Methoden getestet werden, die mit einer bestimmten Controller-Version eingeführt wurden, sollte der Benchmark-Adapter nicht versuchen, diese Tests auf einem nicht unterstützenden Controller auszuführen.
- `freeMemory` - Definieren Sie den benötigten Speicher für den Test; dies ist nur erforderlich, wenn Sie beispielsweise sehr viele Instanzen hinzufügen.

## Testbeschreibung

### getStates

Führt aus`iterations` mal`getState` Die

### getStatesAlias

Führt aus`iterations` mal`getState` unter einem Pseudonym.

### getStatesAliasRead

Führt aus`iterations` mal`getState` auf einem Alias. Der Alias hat eine einfache Lesefunktion.

### getStatesMulti

Erstellt 10.000 Zustände und führt diese anschließend aus.`iterations` mal`getStates` auf sie.

### getStatesMultiAlias

Erstellt 10.000 Alias-Zustände und führt diese anschließend aus.`iterations` mal`getStates` auf sie.

### Leerlauf

Einfach abwarten.`iterations` MS.

### Nachrichten

Erstellt eine sekundäre Benchmark-Instanz. Die Controller-Instanz sendet dann`iterations` Nachrichten an die sekundäre Instanz. Wenn alle Nachrichten empfangen wurden, ist der Test abgeschlossen.

### Objekterstellung

Erstellt`iterations` Objekte über`setObject` Die

### Objektlöschung

Löscht`iterations` Objekte über`delObject` Die

### objectViewEqual

Es werden 10.000 Objekte erstellt, von denen 50 % für die Objektansicht relevant sind. Anschließend wird Folgendes ausgeführt:`iterations` Objektansichten.

### objectViewLarge

Es werden 10.000 Objekte erstellt, von denen 98 % für die Objektansicht relevant sind. Anschließend wird Folgendes ausgeführt:`iterations` Objektansichten.

### objectViewSmall

Es werden 10.000 Objekte erstellt, von denen jedoch nur 2 % für die Objektansicht relevant sind. Anschließend wird Folgendes ausgeführt:`iterations` Objektansichten.

### setStates

Sets`iterations` Staaten über`setState`

### setStatesNonStrict

Sets`iterations` Staaten über`setState` , Aber`strictObjectChecks` sind deaktiviert.

### setStateParallel

Fügt 30 sekundäre Instanzen hinzu, jede Instanz wird festgelegt`iterations` Zustände. Auf Systemebene setzen die Instanzen diese Zustände parallel, aber auf Instanzebene die vorherigen`setState` Dieser Test muss abgeschlossen sein, bevor der nächste gestartet werden kann. Er dient der Bewertung von Mehrkernsystemen.

**Systemvoraussetzungen** : 2 GB freier Speicherplatz

### Staatenlöschung

Löscht`iterations` Staaten über`delState` Die

### StaatenAbonnement

Die Controller-Instanz abonniert einen bestimmten Namensraum. 4 sekundäre Instanzen, jeweils mit einem Satz`iterations / 4` Zustände. Sobald der Controller alle empfangen hat`iterations` Mit der Veröffentlichung ist der Test abgeschlossen.

### StaatenAbonnementAlias

Die Controller-Instanz abonniert einen Alias-Namespace. 4 sekundäre Instanzen, jeweils gesetzt`iterations / 4` Alias-Zustände. Sobald der Controller alle empfangen hat`iterations` Mit der Veröffentlichung ist der Test abgeschlossen.

### statesSubscriptionAliasWrite

Die Controller-Instanz abonniert einen Alias-Namespace. 4 sekundäre Instanzen, jeweils gesetzt`iterations / 4` Alias-Zustände. Sobald der Controller alle empfangen hat`iterations` Nach der Veröffentlichung ist der Test abgeschlossen. Der Alias enthält eine einfache Schreibfunktion.

### StaatenAbonnementEinzeln

Zehn Sekundäranbieter abonnieren jeweils dasselbe`iterations` Staaten. Anstatt einen zu verwenden`subscribe` Rufen Sie jeden an, der ausführt`iterations` Einzelabonnements. Sobald alle`ìterations` werden von jeder weiterführenden Schule empfangen, der Test ist abgeschlossen.

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