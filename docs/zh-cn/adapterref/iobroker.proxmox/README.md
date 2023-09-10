---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.proxmox/README.md
title: ioBroker.proxmox
hash: yODvJqqWvJaLpKPyo5BMt8Os++iQ2vkq+ruzTRO3pHo=
---
![标识](../../../en/adapterref/iobroker.proxmox/admin/proxmox.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.proxmox?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.proxmox?label=npm%20downloads&style=flat-square)
![npm 包的 Snyk 漏洞](https://img.shields.io/snyk/vulnerabilities/npm/iobroker.proxmox?label=npm%20vulnerabilities&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.proxmox?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.proxmox?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.proxmox?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.proxmox/test-and-release.yml?branch=master&logo=github&style=flat-square)
![GitHub Repo 的 Snyk 漏洞](https://img.shields.io/snyk/vulnerabilities/github/iobroker-community-adapters/iobroker.proxmox?label=repo%20vulnerabilities&logo=github&style=flat-square)
![贝塔](https://img.shields.io/npm/v/iobroker.proxmox.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/proxmox-stable.svg)
![已安装](http://iobroker.live/badges/proxmox-installed.svg)

# IoBroker.proxmox
## 版本
控制和使用 ProxmoxVM 中的数据

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 2.0.2 (2023-09-08)
* (klein0r) Added option for disk information
* (klein0r) Check type of disk wearout
* (klein0r) Catch exception when requesting disk information

### 2.0.1 (2023-09-07)
* (klein0r) Added node disks (heals, wearout)

### 2.0.0 (2023-09-07)

* (klein0r) Updated admin instance configuration
* (klein0r) Refactoring of adapter
* (klein0r) Allow dots in resource names

__Requires js-controller >= 3.3.22__
__Requires admin >= 6.0.0__

### 1.3.5 (2022-08-11)
* (foxriver76) fixed warning if `max_cpu` is not in response

### 1.3.4 (2021-05-07)
* (foxriver76) add dataSource and connectionType
* (foxriver76) add compact mode (closes #12, closes #49)

### 1.3.3 (2021-05-02)
* (foxriver76) we fixed some incorrect types

### 1.3.2 (2021-03-26)
* (foxriver76) status of vms is now a string instead of incorrectly a button

### 1.3.0 (2021-03-26)
* (foxriver76) Detect newly added VMs/storages/nodes during runtime and restart instance to initialize everything correctly
* (foxriver76) clean up deleted VM/storage/node objects
__Requires js-controller >= 2.2.8__

### 1.2.0 (2020-01-24)
* (foxriver76) Created info connection state + channel
* (foxriver76) status is a string and not a boolean, so set obj type correctly
* (foxriver76) fix bug which resulted in not all nodes objects being created during a single execution of the adapter
* (foxriver76) password can now only be read by own instance if controller version is new enough

__js-controller v2  or above required__
__node v10 or above required__

### 1.1.0 (10.08.2020)
* (Apollon77) Bug Update on features and stability and performance
* (ThetaGamma) Fix for failing Node shutdown/reboot commands

### 1.0.1 (05.03.2020)
* (MeisterTR) bump version to stable

### 0.5.2 (27.11.2019)
* (DutchmanNL) Fix issue with special character in password, now you can use $/&/* etc

### 0.5.1 (17.09.2019)
* (MeisterTR) add act. disk size form vm and lxc and disc size_level
* (MeisterTR) add start/stop and shutdown for vm an lxc (nodes must be testet my dev is on the node so i cant test stop node)

### 0.3.1 (03.10.2018)
* (MeisterTR) fixed mem_lev, error at install, catch error no node and vm

### 0.3.0 (28.09.2018)
* (MeisterTR) add storage
* (MeisterTR) add password encryption

### 0.2.0 (27.09.2018)
* (MeisterTR) add container

### 0.0.5 (25.09.2018)
* (MeisterTR) cleaning up

### 0.0.5 (02.05.2018)
* (MeisterTR) fixed wrong ram

### 0.0.5 (29.04.2018)
* (MeisterTR) Testing fixes, now ready for node4

### 0.0.3 (26.04.2018)
* (MeisterTR) first running version

### 0.0.2
* (MeisterTR) first running version

### 0.0.1
* (MeisterTR) initial release

## License

The MIT License (MIT)

Copyright (c) 2023 MeisterTR <meistertr.smarthome@gmail.com>

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