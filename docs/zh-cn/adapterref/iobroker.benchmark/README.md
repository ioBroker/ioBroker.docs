---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: rUUVjscVITKtSuwB4lU6fnF6HH/VHoidSaVqBT9yIds=
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
2. 定义测试的三（五）步（执行是自动测量的）
3. 将你的测试添加到 src/lib/allTests.ts
4. 为您的测试添加一个按钮和翻译到 admin/jsonConfig.json

## 测试说明
### 获取状态
执行 `iterations` 次 `getState`。

### GetStateAlias
对别名执行 `iterations` 次 `getState`。

### GetStateAliasRead
对别名执行 `iterations` 次 `getState`。别名有一个简单的读取功能。

＃＃＃ 闲置的
只需等待 `iterations` 毫秒。

###消息
创建辅助基准测试实例。然后控制器实例将 `iterations` 消息发送到辅助实例。
如果收到所有消息，则测试完成。

###对象创建
通过 `setObject` 创建 `iterations` 对象。

###对象删除
通过 `delObject` 删除 `iterations` 对象。

### ObjectViewEqual
创建 10,000 个对象，其中 50% 与对象视图相关。然后它执行 `iterations` 对象视图。

### 对象视图大
创建 10,000 个对象，其中 98% 与对象视图相关。然后它执行 `iterations` 对象视图。

### ObjectViewSmall
创建 10,000 个对象，而其中只有 2% 与对象视图相关。然后它执行 `iterations` 对象视图。

### 设置状态
通过 `setState` 设置 `iterations` 状态

### SetStatesNonStrict
通过 `setState` 设置 `iterations` 状态，但禁用 `strictObjectChecks`。

### SetStatesParallel
添加 30 个辅助实例，每个实例将设置 `iterations` 状态。在系统级别，实例并行设置这些状态，但在实例级别，前一个 `setState` 需要完成，直到设置下一个。
该测试旨在对多核系统进行基准测试。

###状态删除
通过 `delState` 删除 `iterations` 状态。

### StatesSubscription
控制器实例订阅特定的命名空间。 4 个次级，每组 `iterations / 4` 状态。一旦控制器收到所有 `iterations` 发布，测试就完成了。

### StatesSubscriptionAlias
控制器实例订阅别名命名空间。 4 个辅助节点，每个设置 `iterations / 4` 别名状态。一旦控制器收到所有 `iterations` 发布，测试就完成了。

### StatesSubscriptionAliasWrite
控制器实例订阅别名命名空间。 4 个辅助节点，每个设置 `iterations / 4` 别名状态。一旦控制器收到所有 `iterations` 发布，测试就完成了。
别名包含一个简单的写入函数。

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