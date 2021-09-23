---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.node-red/README.md
title: ioBroker 节点-红色适配器
hash: Hepdf/NZ/L9whqqNKIiOn4KWFfh63yiXgLpbfS1rFzg=
---
![标识](../../../en/adapterref/iobroker.node-red/admin/node-red.png)

![安装数量](http://iobroker.live/badges/node-red-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.node-red.svg)
![下载](https://img.shields.io/npm/dm/iobroker.node-red.svg)

# IoBroker 节点红色适配器
![测试和发布](https://github.com/ioBroker/ioBroker.node-red/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/node-red/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

启动节点红色实例并与之通信。

此适配器使用来自 https://github.com/node-red/node-red 的 node-red 服务器

**注意：** 如果在 ioBroker 节点的选择 ID 对话框中找不到某些变量，请重新启动节点红色实例。通过重新启动，将创建新的对象列表。

**升级到1.17.2：** 如果您已经使用过Node-Red 认证：请在升级后再次在ioBroker 的Node-Red 实例设置中设置您的密码！否则升级后您将无法再登录 Node-Red。

##设置
- 安全模式 - 不会启动流程，您可以编辑流程以修复一些过载问题。

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.4.1 (2021-08-31)
* (mickym2) Correct min7max for the object creation 
* (bluefox) Node-red updated to 1.3.6

### 2.4.0 (2021-07-16)
* (Apollon77) update to node-red 1.3.5
* (Apollon77) Optimize for js-controller 3.3
* (Apollon77) Add option to override the default ack flag in the message for OutNode

### 2.3.0 (2021-04-17)
* (Apollon77) BREAKING update from node-red-contrib-aggregator: topic is NOT converted to lowercase anymore!
* (Apollon77) update to node-red 1.3.2
* (Apollon77) Add done calls to OutNode

### 2.2.0 (2021-03-07)
* (Apollon77/mickym2) Correct readonly flags. IMPORTANT: Now Readonly works as it should be. If you worked around the issue before please adjust your nodes!
* (Apollon77) Fix using wildcards inside the id
* (Apollon77) Update value on out node trigger 
* (Apollon77) Update to node-red 1.2.9
* (Apollon77) Add triggering in Nodes when delayed initialization on start
* (Apollon77) Fix list node to support all object types

### 2.1.0 (2021-02-04)
* (Apollon77) Try to fix the MaxSubscribes error when having many nodes
* (Apollon77) Update to node-red 1.2.8

### 2.0.4 (2021-01-20)
* (withstu) Fixed node-red modules installation

### 2.0.3 (2020-12-27)
* (Apollon77) make sure empty state values do not crash list node

### 2.0.2 (2020-12-07)
* (jwiesel) Updated settings.js, node-red and dependencies to the latest version.

### 2.0.1 (2020-08-08)
* (jwiesel) Updated settings.js, node-red and dependencies to the latest version.

### 2.0.0 (2020-06-20)
* (Apollon77) check object and not state to detect if an object exists
* (jwiesel) Updated settings.js to incorporate latest changes up to Node-RED 1.0.6
* (jwiesel) Replaced HTTP basic authentication by Node-RED login form (adminAuth)
* (jwiesel) Replaced MD5 password hashing by bcrypt.js as recommended in the Node-RED security guide.
* (bluefox) Hide the palette manager so all the packets must be installed via ioBroker configuration dialog 

**Caution: For those who already used Node-Red authentication: Please set your password in the Node-Red instance settings in ioBroker again! Otherwise you cannot login to Node-Red any longer after the upgrade.**

### 1.17.2 (2020-04-29)
* (Apollon77) check object and not state to detect if an object exists
* (Apollon77) update node-red to 1.0.6 and deps
* (Apollon77) make sure adapter namespace is prepended in all situations and so correct objects are created
* (Apollon77) fix crash cases
* (Apollon77) make sure msg topic is not overwritten by null 

### 1.16.5 (2020-03-17)
* (bluefox) Caught errors if state deleted
* (bluefox) "Fire on start" for the input node was implemented

### 1.16.4 (2020-03-16)
* (Apollon77) fix State ID verification regex to allow all characters

### 1.16.3 (2020-03-14)
* (Apollon77) fix potential crash case in inout node

### 1.16.2 (2020-03-12)
* (Apollon77) update deps, node-red to 1.0.4
* (Apollon77) update number of listeners to max 1000 before warning is displayed

### 1.15.0 (2020-01-06)
* (mobilutz/bluefox) allow creation of foreign states
* (SchumyHao) add state unit, min and max for ioBroker out node

### 1.14.0 (2019-11-29)
* (SchumyHao) hide some parameters if not enable create object

### 1.13.2 (2019-11-24)
* (SchumyHao) Set state name, role, type and readonly state in node and msg

### 1.13.1 (2019-10-23)
* (RustyThePropellerHead) Logging elevated from debug to info for debug-nodes with console output 

### 1.13.0 (2019-10-20)
* (WolfspiritM) Get Object node added

### 1.12.0 (2019-10-06)
* (Apollon77) Allow to enable/disable the projects feature via Admin
* (Apollon77) Upgrade to node.red 1.0.1 and also add all now extra npm packages to stay compatible

### 1.10.1 (2019-09-20)
* (Apollon77) Make sure also checkState calls are executed after ioBroker databases are initialized

### 1.10.0 (2019-09-15)
* (Apollon77) Used newer version of node-red 0.20.8 and updated other dependencies

### 1.9.0 (2019-07-08)
* (Apollon77) Used newer version of node-red 0.20.7 and updated other dependencies

### 1.8.0 (2019-05-02)
* (nobodyMO) Used newer version of node-red 0.20.5

### 1.7.2 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.7.1 (2017-09-24)
* (bluefox) use newer version of node-red 0.19.4
* (bluefox) Basic authentication was added

### 1.7.0 (2017-08-23)
* (bluefox) use newer version of node-red 0.19.1

### 1.6.0 (2017-08-06)
* (bluefox) use newer version of node-red 0.18.7
* (bluefox) Admin3 dialog implemented
* (bluefox) RAM settings were added
* (bluefox) add credentialSecret option

### 1.5.1 (2017-02-16)
* (Apollon77) queue set state requests till ioBroker connection has been initialized

### 1.5.0 (2018-02-14)
* (Apollon77) use newer version of node-red 0.18.2

### 1.4.1 (2017-10-03)
* (twonky4) fix blank topic support

### 1.4.0 (2017-08-06)
* (bluefox) use newer version of node-red 0.17.5

### 1.3.0 (2017-04-13)
* (bluefox) Update the select ID dialog
* (bluefox) Add node-red-contrib-polymer

### 1.2.0 (2017-02-14)
* (bluefox) use newer version of node-red 0.16.2

### 1.1.6 (2017-01-24)
* (bluefox) use newer version of node-red 0.16.2

### 1.1.5 (2017-01-03)
* (Erhard Weinell) support concurrent access to GetNode

### 1.1.4 (2016-11-04)
* (bluefox) use newer version of node-red 0.15.2

### 1.1.2 (2016-07-23)
* (nobodyMO) use newer version of node-red 0.14.6
* (nobodyMO) change topic name processing

### 1.1.1 (2016-07-08)
* (nobodyMO) use newer version of node-red 0.14.4

### 1.1.0 (2016-05-22)
* (ploebb) configurable: convert values to string
* (nobodyMO) use newer version of node-red 0.14.3

### 1.0.1 (2016-05-22)
* (bluefox) on some systems node-red was available under wrong URL http://ip:1881/undefined. Fixed

### 1.0.0 (2016-04-29)
* (bluefox) support of npm 2/3

### 0.4.4 (2016-04-29)
* (bluefox) install with flag unsafePerm

### 0.4.3 (2016-04-23)
* (bluefox) use node-red 0.13.4

### 0.4.2 (2016-01-21)
* (nobodyMO) Add httpRoot setting
* (nobodyMO) add filter settings to nodes

### 0.4.1 (2016-01-14)
* (nobodyMO) Add --max-old-space-size=128 to support systems with low memory.
* (nobodyMO) Add version 0.12.5 for node-red because it works.
* (nobodyMO) Add ioBroker get node.
* (nobodyMO) Set _maxListeners = 100 to suppress warnings in the log.

### 0.3.5 (2015-08-23)
* (bluefox) fix error if many additional npm packets

### 0.3.4 (2015-08-10)
* (bluefox) do not include node-red packages into global context

### 0.3.3 (2015-07-24)
* (bluefox) enable node-red 0.11.x

### 0.3.2 (2015-06-29)
* (bluefox) fix error with ioBroker nodes

### 0.3.1 (2015-06-28)
* (bluefox) change link in admin to node-red web server

### 0.3.0 (2015-05-18)
* (bluefox) add flag "stopBeforeUpdate"
* (bluefox) store data in iobroker-data directory

### 0.2.2 (2015-05-17)
* (bluefox) fix error with invalid additional npm package

### 0.2.1 (2015-05-17)
* (bluefox) fix readme link

### 0.2.0 (2015-05-16)
* (bluefox) allow the installation of additional npm and node-red packets

### 0.1.9 (2015-03-26)
* (bluefox) fix first start

### 0.1.7 (2015-03-25)
* (bluefox) remove warnings

### 0.1.6 (2015-03-18)
* (bluefox) make node-red compatible with ioBroker again

### 0.1.5 (2015-02-12)
* (bluefox) update node-red to 0.10.1
* (bluefox) update select ID dialog

### 0.1.4 (2015-01-07)
* (bluefox) create variables without need to be extra called with "__create__"

### 0.1.3 (2015-01-06)
* (bluefox) make possible creation of variables

### 0.1.2 (2015-01-04)
* (bluefox) print debug message by saving

### 0.1.1 (2015-01-03)
* (bluefox) fix errors with utils.js

### 0.1.0 (2015-01-02)
* (bluefox) enable npm install

### 0.0.8 (2014-12-20)
* (bluefox) support signal stopInstance

### 0.0.7 (2014-12-14)
* (bluefox) support of select ID dialogs

### 0.0.6 (2014-11-26)
* (bluefox) use names like in mqtt: "adapter/instance/device/channel/state"
* (bluefox) support of "value" or "object" for input node

### 0.0.5 (2014-11-22)
* (bluefox) support of new naming concept

### 0.0.4 (2014-11-05)
* (bluefox) fix some errors

### 0.0.2 (2014-11-04)
* (bluefox) use adapter.js to communicate with ioBroker

### 0.0.1 (2014-11-03)
* (bluefox) initial commit

## License

Copyright 2014-2021 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.