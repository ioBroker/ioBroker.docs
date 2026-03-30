---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apsystems-ez1/README.md
title: 无标题
hash: Rp3jir57KqzgaGiuzBt6D9bNJixl+TrBk2HMs67FyqA=
---
![标识](../../../en/adapterref/iobroker.apsystems-ez1/admin/apsystems-ez1.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.apsystems-ez1.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apsystems-ez1.svg)
![安装数量](https://iobroker.live/badges/apsystems-ez1-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/apsystems-ez1-stable.svg)

---

## 📌 描述
此适配器通过设备的**本地HTTP API（端口8050）**与**APsystems EZ1微型逆变器**集成。

它允许读取逆变器的实时数据并控制某些设备参数。

### ✔ 支持的功能
- 读取实时**功率**和**能量**值
- 读取**设备信息**（固件、SSID、IP 等）
- 读取**报警状态**
- 设置 **最大功率**
- 设置**开/关状态**
- 支持在单个适配器实例中连接**多个设备**
- HTTP 超时 + 重试逻辑
- 可选的**重复错误电子邮件提醒**
- 包含一个用于监控和控制的**VIS2 小部件**

### 🔗 制造商信息
APsystems EZ1 产品页面：https://apsystems.com

---

## 🛠 安装
通过 ioBroker 管理后台安装：

**适配器 → 搜索“apsystems-ez1” → 安装**

或通过命令行界面：

```
iobroker install iobroker.apsystems-ez1
```

---

## ⚙️ 配置
该适配器通过 JSON 数组支持**多个设备**：

### **设备**
例子：

```json
[
  { "name": "Roof", "ip": "192.168.1.50" },
  { "name": "Garage", "ip": "192.168.1.51" }
]
```

### PollInterval
- 轮询间隔时间（秒）
- 默认值：30

### Http超时
HTTP 超时时间（毫秒）
- 默认值：5000

### Http重试
- 重试次数
- 默认值：2

### EZ1 API端口
- 设备的 IP 端口号
- 默认值：8050

### 提醒邮件
- 可选的用于接收持续错误警报的电子邮件地址
- 需要本地 sendmail

---

## 📊 创建状态
所有州都是根据以下原则建立的：

```
apsystems-ez1.<instance>.devices.<DeviceName>.*
```

### 设备信息
|状态 |类型 |描述|
| -------- | ------- | ------- |
|deviceId |字符串 |设备 ID|
|devVer |字符串 |固件版本|
|ssid |字符串 |已连接的 WiFi SSID|
|ipAddr |字符串 |设备 IP 地址|

### 电力与能源
|状态 |类型 |描述|
| -------- | ------- | ------- |
|output.p1 |number |功率通道 1 (W)|
|output.p2 |number |功率通道 2 (W)|
|输出.p |数量 |总功率（瓦）|
|output.e1 |number |能源通道 1 (kWh)|
|output.e2 |number |能源通道 2 (kWh)|
|输出.e |数量 |总能量（千瓦时）|
|output.te1 |number |生命周期能量通道 1|
|output.te2 |number |生命周期能量通道 2|

＃＃＃ 控制
|状态 |类型 |写入 |描述|
| -------- | ------- | ------- | ------- |
|control.maxPower |number |yes |设置最大功率（瓦）|
|control.onOff |boolean |yes |打开/关闭逆变器|

### 警报
|状态 |类型 |描述|
| -------- | ------- | ------- |
|alarm.og |boolean |离网警报|
|alarm.isce1 |boolean |DC1 短路|
|alarm.isce2 |boolean |DC2 短路|
|alarm.oe |布尔值 |输出故障|

## 🖼 VIS2 小部件
VIS2 小部件模板包含在以下位置：

```
vis2/ez1-control
```

它显示：

- 功率和能量值
- 报警状态
- 最大功率和开/关控制

您可能需要调整小部件内的实例 ID。

## 🌐 EZ1 本地 API 端点
适配器使用以下端点：

```
GET /getDeviceInfo
GET /getOutputData
GET /getMaxPower
GET /getAlarm
GET /getOnOff

GET /setMaxPower?p=VALUE
GET /setOnOff?status=0|1
```

---

## 🧪 开发与测试
安装依赖项：

```
npm install
```

运行测试：

```
npm test
```

在开发服务器上运行适配器：

```
dev-server watch
```

---

## 📦 发布
发布是通过 GitHub Actions 管理的。

推送一个类似这样的标签：

```
v0.1.7
```

新版本将自动发布。

---

## 🧑‍💻 作者
海宁志GitHub：https://github.com/zhihaining

---

## Changelog
### 0.2.4 (2026-02-06)
- Fix review findings

### 0.2.3 (2026-01-13)
- release 0.2.3 to npm

### 0.1.6

- Fix warning at startup of validator function

### 0.1.5

- First pre‑release version

### 0.1.4

- First hardware‑tested version

### 0.1.3

- Refactor release script, add i18n step, avoid duplicates

### 0.1.2

- Fix JSON parsing and repository checker issues; add dminUI config and icons

### 0.1.1

- Initial release

---

## License

MIT License
Copyright (c) 2026

---