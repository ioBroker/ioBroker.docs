---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: v83y2upxVHdLiGirS5AzXEJuH+yNp8w8fAA0z/3zk/k=
---
![标识](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![下载](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![安装数量](https://iobroker.live/badges/benchmark-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/benchmark-stable.svg)
![依赖状态](https://img.shields.io/david/foxriver76/iobroker.benchmark.svg)
![新产品管理](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)

# IoBroker.benchmark
**测试：** ![测试和发布](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## IoBroker 基准适配器
对您的系统进行基准测试。

## 重要：用户信息
请注意，在当前状态下，适配器的目的主要是对不同场景进行基准测试，以收集有关 js 控制器级别更改的见解。
基准测试可能需要很长时间，并可能导致系统负载过高。另请注意，默认情况下基准适配器在隔离模式下运行，这将禁用所有适配器并仅保持控制器及其本身处于活动状态。此外，适配器始终需要以实例编号 `0` 运行。

## 如何添加一个新的测试？
1. 在 src/lib/activeTests 新建一个 TypeScript 文件，类继承自 TestUtils
2. 定义测试的三（五）个步骤（执行是自动测量的）
3. 将你的测试添加到 src/lib/allTests.ts
4. 为您的测试添加一个按钮和翻译到 admin/jsonConfig.json

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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