![Logo](admin/benchmark.png)
# ioBroker.benchmark

[![NPM version](https://img.shields.io/npm/v/iobroker.benchmark.svg)](https://www.npmjs.com/package/iobroker.benchmark)
[![Downloads](https://img.shields.io/npm/dm/iobroker.benchmark.svg)](https://www.npmjs.com/package/iobroker.benchmark)
![Number of Installations](https://iobroker.live/badges/benchmark-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/benchmark-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)](https://nodei.co/npm/iobroker.benchmark/)

**Tests:** ![Test and Release](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## benchmark adapter for ioBroker
Benchmark your system.

## Important: Information for users
Note, that the purpose of the adapter, in its current state, is mainly to benchmark different scenarios to gather 
insights on changes on js-controller level.
The Benchmark Tests can take very long and can cause high loads on your system. Also note, that by default the benchmark adapter
runs in an isolated mode, which will disable all adapters and only keep the controller and itself alive. Furthermore, the adapter
always needs to be run with instance number `0`.

## How to add a new test?
1. Create a new TypeScript file in src/lib/activeTests, with a class which inherits from TestUtils
2. Define the three (five) steps of your test (execute is automatically measured)
3. Ooptional: If your test has some requierments, e.g. controller needs to be `>=3.0.0`, please pass the requirements to
the parent constructor
4. Add your test to src/lib/allTests.ts
5. Add a button and translation for your test to admin/jsonConfig.json

### Test requirements
Some tests may have requirements. If the system does not fulfill the requirements, the test will be skipped.
In the constructor you should pass the requirements to the parent class, like

```typescript
public constructor(adapter: AdapterInstance) {
    super(adapter, {freeMemory: 2000});
}
```

Currently, the following requirements are supported:

- `controllerVersion` - if methods are tested which were introduced with a specific controller version, the benchmark 
adapter should not try to run these tests on a non-supporting controller
- `freeMemory` - define the required memory of the test, this is only necessary if you e.g. add a lot of instances

## Test description
### getStates
Executes `iterations` times `getState`.

### getStatesAlias
Executes `iterations` times `getState` on an alias.

### getStatesAliasRead
Executes `iterations` times `getState` on an alias. The alias has a simple read function.

### getStatesMulti
Creates 10,000 states, then executes `iterations` times `getStates` on them.

### getStatesMultiAlias
Creates 10,000 alias states, then executes `iterations` times `getStates` on them. 

### idle
Just waits `iterations` ms.

### messages
Creates a secondary benchmark instance. The controller instance will then send `iterations` messages to the secondary instance. 
If all messages are recevied, the test is finished.

### objectsCreation
Creates `iterations` objects via `setObject`.

### objectsDeletion
Deletes `iterations` objects via `delObject`.

### objectViewEqual
Creates 10,000 objects while 50 % of them are relevant for the object view. Then it executes `iterations` object views.

### objectViewLarge
Creates 10,000 objects while 98 % of them are relevant for the object view. Then it executes `iterations` object views.

### objectViewSmall
Creates 10,000 objects while only 2 % of them are relevant for the object view. Then it executes `iterations` object views.

### setStates
Sets `iterations` states via `setState`

### setStatesNonStrict
Sets `iterations` states via `setState`, but `strictObjectChecks` are disabled.

### setStateParallel
Adds 30 secondary instances, every instance will set `iterations` states. On system level, the instances are setting these states in parallel, but on instance level, the previous `setState` needs to be finished until the next one is set.
This test aims to benchmark multicore systems.

__Requirements__: 2 GB of free memory

### statesDeletion
Deletes `iterations` states via `delState`.

### statesSubscription
The controller instance subscribes on a specific namespace. 4 secondaries each set `iterations / 4` states. As soon as the controller received all `iterations` publishes, the test is finished.

### statesSubscriptionAlias
The controller instance subscribes on an alias namespace. 4 secondaries each set `iterations / 4` alias states. As soon as the controller received all `iterations` publishes, the test is finished.

### statesSubscriptionAliasWrite
The controller instance subscribes on an alias namespace. 4 secondaries each set `iterations / 4` alias states. As soon as the controller received all `iterations` publishes, the test is finished.
The alias contains a simple write function.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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
