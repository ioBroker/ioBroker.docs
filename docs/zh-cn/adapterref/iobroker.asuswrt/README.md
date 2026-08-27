---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: Xv8JPVLXL+BoBQ3TFyJN817HOEilIdlAw/RAXyj+5ao=
---
![标识](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![安装数量](http://iobroker.live/badges/asuswrt-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![NPM](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt
=================

## 适用于 ioBroker 的 ASUSWRT 适配器
查找运行 ASUSWRT 固件的华硕路由器中的活动设备。

例如，您可以利用此功能检测手机是否存在，从而追踪家中是否有人。

已使用运行 ASUSWRT 3.0.0.4.384_32799 的华硕 GT-AC5300 进行测试。

您可以在华硕官网找到一份不支持 ASUSWRT 的路由器列表：https://event.asus.com/2013/nw/ASUSWRT/

＃＃ 要求
您必须在路由器设置中启用并允许 SSH 连接。

您至少需要：

* js-controller >= 6.0.11
* 管理员版本 >= 7.6.20
* Node.js 版本 >= 22

对于较旧的 ioBroker 版本，请安装 0.3.1 版本。

＃＃ 设置
* 华硕路由器 IP 地址（必填）
* 华硕路由器的IP地址
* 用户登录（必填）
* 用于登录华硕路由器的用户名
登录密码（如果使用私钥文件，则为可选）
* 用户登录密码
* 使用私钥文件时，请将此字段留空。
* 私钥文件（如果使用密码，则为可选）
* 如果您不想使用密码登录，您可以设置 SSH 登录的私钥文件路径。
* 如果不需要，请留空
* 私钥文件密码（如果私钥文件已加密，则为可选）
* 如果您的密钥文件已使用密码短语加密，请在此处输入密码短语。
* 如无必要，请留空
* SSH端口（必填）
* 用于与华硕路由器建立 SSH 连接的端口
* 投票时间
* 检查活动设备所需时间（毫秒）（最短时间为 5000 毫秒 = 5 秒）
* 当前非活跃时间
* 设备不再处于活动状态的时间（以毫秒为单位）。
就我而言，180000毫秒 = 180秒 = 3分钟，完全够用。最小值为60000毫秒。
* 监控地址
* 添加要监视的设备，无论其是否处于活动状态，并使用设备的 MAC 地址进行监视。
* 别忘了勾选复选框以启用监控功能

## Changelog

### 1.0.7 (2026-07-07)
* (mcdhrts) Resolve all remaining repository checker issues (#106)
* (mcdhrts) Update dependencies: @iobroker/adapter-core ^3.4.1, @alcalzone/release-script ^5.2.1, @types/node ~22
* (mcdhrts) Add explicit "i18n": true to admin/jsonConfig.json5
* (mcdhrts) Translate remaining untranslated ru i18n keys
* (mcdhrts) Add 1.0.6 changelog entry to README
* (mcdhrts) Add dependency overrides to reduce transitive dev-dependency security vulnerabilities
* (mcdhrts) Merge form-data security update

### 1.0.6 (2026-05-30)
* (mcdhrts) Resolve repository checker issues, deprecated methods and improve CI (#95, #97)
* (mcdhrts) Translate i18n files into native languages and restore missing language files (#95)
* (mcdhrts) Resolve all remaining repository checker issues (#99)
* (mcdhrts) Update tsconfig node target from template (#98)

### 1.0.5 (2026-05-28)
* (mcdhrts) Fix deprecated method usage: use delObject with recursive flag (Issue #97)
* (mcdhrts) Fix eslint.config.mjs to properly use @iobroker/eslint-config (E0077)
* (mcdhrts) Add missing xs/xl size attributes to admin jsonConfig fields (E5507)
* (mcdhrts) Update workflow node.js version to 24 for deploy and lint jobs (E3022, S3021)
* (mcdhrts) Add needs dependency between adapter-tests and check-and-lint jobs (S3014)
* (mcdhrts) Add prettier.config.mjs for @iobroker/eslint-config compatibility (W0076)
* (mcdhrts) Remove obsolete eslint devDependency (W0078)
* (mcdhrts) Fix @types/node version constraint to ~22 (W0066)
* (mcdhrts) Trim common.news to 7 entries (W1032)
* (mcdhrts) Fix dependabot: add cooldown, ignore @types/node major, increase PR limit (W8915, W8917, S8908)
* (mcdhrts) Improve ip neigh parsing to handle multiple spaces
* (mcdhrts) Modernize code style, fix line endings, add CHANGELOG_OLD.md

### 1.0.4 (2026-04-01)
* (mcdhrts) Improve parsing of ip neigh output to handle multiple spaces, update dependencies

### 1.0.3 (2025-10-11)
* (mcdhrts) Migrated to modern i18n format with separate translation files in admin/i18n/ directory
* (mcdhrts) Migrated from HTML-based admin interface to JSON Config system (Admin 5+) for better user experience
* (mcdhrts) Fixed critical issue where admin folder was not included in npm package (404 error on jsonConfig.json)
* (mcdhrts) Fixed + button not responding in device monitoring table
* (mcdhrts) Improved parsing of ip neigh command output for better device detection
* (mcdhrts) Fixed all ioBroker repository checker issues (E5507, W4042, W4044)
* (mcdhrts) Added comprehensive configuration validation with min/max values
* (mcdhrts) Added VS Code settings with JSON schema definitions for better development experience
* (mcdhrts) Removed invalid i18n property from io-package.json
* (mcdhrts) Updated release configuration format to dictionary

### 1.0.2 (2025-10-05)
* (mcdhrts) Fixed admin UI 404 error - renamed index_m.html to index.html
* (mcdhrts) Updated requirements documentation to reflect current dependencies (js-controller >= 6.0.11, admin >= 7.6.17, Node.js >= 18.x)
* (mcdhrts) Improved integration tests with proper test harness and configuration validation
* (mcdhrts) Removed deprecated unit tests in favor of modern integration tests
* (mcdhrts) Updated dependencies: ssh2 ^1.4.0 -> ^1.17.0, @iobroker/adapter-core ^3.3.1 -> ^3.3.2, @iobroker/testing ^5.0.4 -> ^5.1.1
* (mcdhrts) Removed deprecated devDependencies: gulp, mocha, chai (now handled by @iobroker/testing)

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

[Older changes](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2025-2026 mcdhrts <mcdhrts@outlook.com>

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