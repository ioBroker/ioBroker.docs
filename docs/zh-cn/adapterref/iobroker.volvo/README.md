---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: ogikgBRX+HhwKNH0ZUMAQu4yHaTSBYC5/ieF9/u8AkU=
---
![标识](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.volvo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.volvo.svg)
![安装数量（最新）](http://iobroker.live/badges/volvo-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/volvo-stable.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.volvo/badge.svg)
![新平台](https://nodei.co/npm/iobroker.volvo.png?downloads=true)

# IoBroker.volvo
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.volvo/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 volvo 适配器
Volvo On Call 和适用于 Android 汽车适配器的新型电动 API

## 非电动汽车登录
非电动汽车可以通过用户名和密码登录。

## 电动 Android 汽车需要 VCC API 密钥
注册/登录<https://developer.volvocars.com/account/>

你需要一个 Google 或 Github 账户，这和你的 APP 凭证无关

创建应用程序

复制 VCC API 密钥主密钥

![VCC API密钥](../../../en/adapterref/iobroker.volvo/vccapikey.png)

将 API 密钥粘贴到实例设置中

输入沃尔沃应用程序的用户名和密码。

## 控制电动机器人
目前无法使用 volvo.0.id.remote 控制 Eletric Android。命令已成功发送到 API 并被接受，但 API 似乎还不完整，无法控制汽车。

＃＃ 入门
使用遥控器下的物体来控制车辆

## Changelog
### 0.1.2 (2024-05-02)

- added support for v2 api

### 0.1.1

- added location api information

### 0.1.0

- (TA2k) add new api for electric cars

### 0.0.6

- (TA2k) fix trip object naming

### 0.0.5

- (TA2k) fix receiving data

### 0.0.4

- (TA2k) fix jscontroller

### 0.0.3

- (TA2k) fix preclimate

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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