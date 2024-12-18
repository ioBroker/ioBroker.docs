---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: FmXLZhYoeZJF9Hzf1mENOYBQDeUW9LAHIcg1cFlwv/M=
---
![标识](../../../en/adapterref/iobroker.acme/admin/acme.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.acme.svg)
![下载](https://img.shields.io/npm/dm/iobroker.acme.svg)
![安装数量](https://iobroker.live/badges/acme-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/acme-stable.svg)
![新平台](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**测试：**![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ACME 适配器
该适配器使用 ACME 挑战生成证书。

＃＃ 用法
适配器定期启动（默认在午夜），并在配置更新后生成任何所需的证书（新的或即将过期的）。

目前，订单由 Let's Encrypt 证书颁发机构处理，因此是免费的。

证书详细信息存储在“证书集合”对象中，其中包括其他相关详细信息，例如到期日期、要保护的域和私钥。
这些对象由其集合 ID 引用。

需要证书来保护其通信的适配器（例如[网络适配器](https://www.npmjs.com/package/iobroker.web)）能够加载和使用证书集合。

存储和使用由[核心 ioBroker 控制器](https://www.npmjs.com/package/iobroker.js-controller) 包含的接口处理。

### ACME 挑战
实现了两种质询验证方法，至少应在配置页面中启用其中一种。

请注意，通配符证书订单只能使用 DNS-01 质询进行验证。

HTTP-01
适配器在配置的端口和地址上启动自己的 HTTP-01 质询服务器。

为了使 HTTP-01 挑战成功，挑战服务器的端口/地址**必须**可公开访问，作为开放互联网集合中的通用/备用名称中给出的 FQDN 的端口 80。

相应地配置您的防火墙、反向代理等。

示例场景：

1. 运行 ACME 的 IoB 主机位于路由器后面，并且该路由器具有可公开访问的 IP 地址：

    解决方案：

- 配置 ACME 在任何空闲端口上运行：例如：8092。
- 配置路由器，将其公共地址的端口 80 的连接转发到 IoB 主机的端口 8092。
- 配置所需证书通用名称的 DNS 名称以解析为路由器的公共地址。

2. 运行 ACME 的 IoB 主机具有直接的互联网连接以及可公开访问的 IP 地址：

    解决方案：

- 配置 ACME 适配器以在端口 80 上监听。
- 配置所需证书通用名称的 DNS 名称以解析为 IoB 主机的公共地址。

3. 场景 1 和 2 不可能发生，因为另一个服务正在可公开访问的 IP 地址的 80 端口上运行。

可能的解决方案：

1. 如果另一个服务是遵循端口配置命名标准的 IoB 适配器，则 ACME 将在尝试订购证书之前停止它，将端口 80 用于 HTTP-01 质询服务器，并在完成后重新启动任何已停止的适配器。

显然，这会导致另一个适配器短暂中断，这可能是我们所不希望的。

2. 使用 DNS-01 质询。
3. 在路由器或可公开访问的 IoB 主机的端口 80 上设置命名虚拟主机 HTTP 代理。

- 为现有服务提供与证书所需主机名不同的主机名，并将该主机名配置为解析为相同的地址。
- 配置代理以根据使用的名称将请求转发到现有服务或 ACME 适配器。

4. 仅当所需端口访问可用时才手动运行 ACME。**不推荐**，但应该可行：

- 安装后禁用（停止）ACME 适配器。
- 在需要订购证书或续订之前（续订将在到期前 7 天内进行）手动执行以下步骤：
- 设置任何防火墙/端口转发/其他维护，以允许 ACME 在配置的端口上运行，并允许从公共互联网访问该端口。
- 从 IoB 管理实例页面手动启动 ACME。
- 等待 ACME 完成所有证书订单。
- 从 IoB 管理实例页面手动停止 ACME。
- 每次订购/续订证书时都需要执行这些步骤，因此不推荐使用此方法。ACME 旨在促进完全自动化的流程。

DNS-01
为流行的域名托管平台实现了各种 DNS-01 挑战插件。

＃＃＃＃ 参考
请参阅[AMCS.js](https://www.npmjs.com/package/acme)了解更多详情。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.5 (2024-12-08)

- (@GermanBluefox) Corrected error with admin 7.4.3

### 1.0.3 (2024-11-27)

- (@GermanBluefox) Migrated GUI for admin 7 (one more time)

### 1.0.1 (2024-07-06)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated
- (bluefox) Prepared for admin v7

### 0.1.2 (2023-11-15)

- (mcm1957) Issues reported by adapter checker have been fixed.
- (mcm1957) Release 0.1.1 has been released again due to error during deploy.

### 0.1.1 (2023-11-15)

- (raintonr) Various improvements in start/stop of other adapters using HTTP challenge server port fixing restart loop (#43).
- (raintonr) Fixed ACME notify messages (#64).

## License

MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Robin Rainton <robin@rainton.com>

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