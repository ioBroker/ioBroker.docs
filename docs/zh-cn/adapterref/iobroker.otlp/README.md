---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.otlp/README.md
title: ioBroker.otlp
hash: WM/o7c2ViljimveNTcymHQn2sgtCGqgGQra+T/HfGBs=
---
![标识](../../../en/adapterref/iobroker.otlp/admin/otlp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.otlp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.otlp.svg)
![安装数量](https://iobroker.live/badges/otlp-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/otlp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.otlp.png?downloads=true)

# IoBroker.otlp
**测试：** ![测试与发布](https://github.com/OlliMartin/ioBroker.otlp/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的开放遥测协议 (OTLP) 适配器
该适配器允许将历史数据推送到兼容 OTLP 的网关。

根据设计，无法检索历史数据。

由于数据点/状态以指标形式发布，因此只能写入数值。

＃＃ 为什么？
将数据点（`number` 和 `boolean`）导出到 OTLP 兼容网关，可以实现对底层数据存储的抽象。

由于有大量的开源遥测导出器可用，本项目充当了存储适配器的角色，例如

- [普罗米修斯](https://prometheus.io/)/[Mimir](https://github.com/grafana/mimir)
- InfluxDB（显然不如[现有适配器](https://github.com/ioBroker/ioBroker.influxdb/tree/master)强大）
卡夫卡

这些存储后端在开放式遥测收集器（即本服务的目标）中配置，并可在此处进行进一步的自定义。如果启用了非数值状态的导出，则该状态将被忽略，不会写入任何数据。

## 非目标
所有数据点/状态必须为布尔值或数值，因为它们被视为指标，更具体地说是计量单位。

将字符串甚至复杂对象作为度量标准毫无意义，而且根本行不通。

除了数字和布尔值之外，永远不会支持任何其他类型。

## 实例配置
可以在适配器的管理界面中设置以下选项：

| 图例 | 说明 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 协议 | 服务器的协议（`http` 或 `https`）。这与 OTLP 无关！ |
| 开放遥测协议 | 用于发送遥测数据/指标的协议（`gRPC` 或 `http (protobuf)`） |
| 端口 | otelcol 网关的端口。通常为 `4317 (gRPC)` 或 `4318 (http)` |
| 端口 | otelcol 网关的端口。通常为 `4317 (gRPC)` 或 `4318 (http)` |
| 计量器名称 | 创建 SDK 计量器的名称。通常这仅供 SDK 内部使用。 |
| 资源属性 | 要全局填充的键值列表 [资源属性](https://opentelemetry.io/docs/concepts/resources/#introduction) |
| 资源属性 | 要全局填充的[资源属性](https://opentelemetry.io/docs/concepts/resources/#introduction)键值列表 |

## 自定义状态配置
该适配器允许按状态导出指标，其配置方式与其他历史记录适配器相同。

如果提供了 `aliasId` 的值，则该值将用作指标名称。

注意：根据时间序列存储后端的不同，指标的部分名称可能会被更改。

例如，Prometheus 会将点号替换为下划线，因此别名 ID `my.metric` 将被存储为 `my_metric`。

除了 `aliasId` 之外，还可以为每个导出的值指定属性列表，即键值对。

### 展示
请参考以下案例展示：

* [Prometheus & Grafana：检测打开的窗口](./docs/showcase.prom-graf.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2025-12-28)

* (OlliMartin) Implement connection test by exporting (empty) dummy metric and shutdown on error
* (OlliMartin) Recreate all meters on custom config change; Fixes alias renames only taking affect after adapter restart
* (OlliMartin) Fix [issue #3](https://github.com/OlliMartin/ioBroker.otlp/issues/3) where configured headers would not be applied correctly to the respective exporter
* (OlliMartin) Translate admin & custom UI (i18n)
* (OlliMartin) Add missing layout column definitions to custom settings UI
* (OlliMartin) Remove unnecessary `noTranslation` flags
* (OlliMartin) Remove `.stop()` call on invalid configuration

### 0.0.3 (2025-12-20)

* (OlliMartin) Include MIT Copyright Notice from [ioBroker.influxdb](https://github.com/ioBroker/ioBroker.influxdb)

### 0.0.2 (2025-12-20)

* (OlliMartin) Fix invalid number-range in MeterName (type: text)

### 0.0.1 (2025-12-20)
* (OlliMartin) Final cleanup & release first stable

### 0.0.1-rc.5 (2025-12-20)

* (OlliMartin) More cleanup

### 0.0.1-rc.4 (2025-12-20)

* (OlliMartin) Update logo (transparent background)

### 0.0.1-rc.3 (2025-12-20)

* (OlliMartin) Still trying to automate release

### 0.0.1-rc.2 (2025-12-20)

* (OlliMartin) preparing automated release

### **0.0.1-rc.1 (20.12.2025)**
* (OlliMartin) initial release
  * Basic OTLP exporter functionality (periodic exporting)
  * gRPC or HTTP otlp transport

## License
MIT License

Copyright (c) 2026 OlliMartin <oss@ollimart.in>

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