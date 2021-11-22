![Logo](admin/benchmark.png)
# ioBroker.benchmark

[![NPM version](https://img.shields.io/npm/v/iobroker.benchmark.svg)](https://www.npmjs.com/package/iobroker.benchmark)
[![Downloads](https://img.shields.io/npm/dm/iobroker.benchmark.svg)](https://www.npmjs.com/package/iobroker.benchmark)
![Number of Installations](https://iobroker.live/badges/benchmark-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/benchmark-stable.svg)
[![Dependency Status](https://img.shields.io/david/foxriver76/iobroker.benchmark.svg)](https://david-dm.org/foxriver76/iobroker.benchmark)

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
3. Add your test to src/lib/allTests.ts
4. Add a button and translation for your test to admin/jsonConfig.json

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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