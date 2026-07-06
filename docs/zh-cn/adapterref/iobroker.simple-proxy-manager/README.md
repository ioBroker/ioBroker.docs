---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.simple-proxy-manager/README.md
title: ioBroker.simple-proxy-manager
hash: AXJ5+qdVDCaAJSme9gf8iiT473qK0tuzbMm7Q84d4h4=
---
![标识](../../../en/adapterref/iobroker.simple-proxy-manager/admin/simple-proxy-manager.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.simple-proxy-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.simple-proxy-manager.svg)
![安装数量](https://iobroker.live/badges/simple-proxy-manager-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/simple-proxy-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.simple-proxy-manager.png?downloads=true)

# IoBroker.simple-proxy-manager
**测试：** [![测试和发布](https://github.com/lubepi/ioBroker.simple-proxy-manager/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.simple-proxy-manager/actions?query=workflow%3A%22Test+and+Release%22)

适用于 ioBroker 的简单 HTTPS/HTTP 反向代理管理器。

＃＃ 特征
- **HTTPS + HTTP 并行运行** – 两个服务器始终运行
- **基于主机的协议** – 后端有证书则使用 HTTPS，无证书则使用 HTTP
- **每个虚拟主机一个证书** – ACME（Let's Encrypt）、自签名或手动签名证书集合
- **可通过管理界面配置后端**
- **内部服务的 IP 过滤**（基于 CIDR，IPv4 + IPv6，多网络）
- **HTTP → HTTPS 重定向**，采用 ACME 质询转发
- ACME 续订时自动重新加载 SSL 证书
- 日志中出现**证书过期警告**
- **HSTS**（严格运输安全）
- **WebSocket 支持**（例如，用于 ioBroker 管理员）
- **双栈** IPv4 + IPv6
- **更改原点**选项

## 先决条件
- **Node.js** >= 22
- **ioBroker**，js-controller 版本 >= 6.0.11
- **ACME适配器**，用于自动配置SSL证书（可选 - 也可在不使用证书的情况下使用）
- 配置的端口必须可用（默认值：HTTP 为 80，HTTPS 为 443）

＃＃ 配置
### “常规”选项卡
| 设置 | 默认值 | 说明 |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| HTTPS 端口 | 443 | HTTPS 端口 |
| HTTP 端口 | 80 | HTTP 端口 – 没有证书的后端服务使用此端口；有证书的后端服务将重定向到 HTTPS |
| ACME适配器端口 | 0 | ACME适配器的内部端口（0 = 已禁用） |
| 启用 HSTS | ✓ | 严格传输安全标头（仅限 HTTPS） |
| HSTS 最大有效期 | 31536000 | HSTS 有效期（秒）（1 年） |
| 检查间隔 | 1 | 证书检查频率（小时） |
| 过期提醒 | 0 | 过期前 X 天发出提醒（0 = 关闭） |
| 记录安全事件 | ✗ | 将拒绝访问（IP 过滤、WebSocket）记录为警告条目 |
| 记录请求 | ✗ | 将每个传入请求（IP、主机、URL）记录为调试条目 |

### 选项卡“后端”
每个后端都定义了一个虚拟主机：

| 字段 | 描述 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **启用** | 启用/禁用后端 |
| **主机名** | 通过 DNS 指向此服务器的域名 |
| **目标网址** | 后端地址 (`http://IP:Port`) |
| **允许的网络** | 以逗号分隔的 CIDR 网络/IP 地址（例如 `192.168.0.0/24, fd00::/8`）。留空表示允许从任何位置访问。 |
| **允许的网络** | 以逗号分隔的 CIDR 网络/IP 地址（例如 `192.168.0.0/24, fd00::/8`）。留空表示允许从任何位置访问。 |
| **更改源地址** | 将主机头重写为目标 IP 地址 |

### 示例配置
| 主机名 | 目标 URL | 证书 | 允许的网络 | 更改源 |
| ---------------------- | ----------------------- | -------------------------------- | ---------------------------- | ------------- |
| `website.example.com` | `http://127.0.0.1:3000` | `acme` | – | ✗ |
| `host.example.com` | `http://192.168.0.1` | _(无证书)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |
| `host.example.com` | `http://192.168.0.1` | _(无证书)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |

在这个例子中：

- `website.example.com` → 使用 Let's Encrypt 证书的 **HTTPS**，HTTP 重定向到 HTTPS
- `iobroker.example.com` → **HTTPS**，使用 ioBroker 默认证书 (`default`)，仅限本地网络
- `host.example.com` → **HTTP**（无证书），仅限本地网络

## 州
| 状态 | 类型 | 描述 |
| ------------------------------ | ------- | ----------------------------------------------- |
| `info.connection` | 布尔值 | 代理正在运行 |
| `certificates.<name>.daysLeft` | 数字 | 到期天数（每批） |
| `certificates.<name>.daysLeft` | 数字 | 剩余天数（每组） |

证书状态是为每个使用的证书集合动态创建的（例如 `certificates.acme.daysLeft`、`certificates.default.expires`）。

## ACME 适配器配置
如果代理服务器运行在默认端口 80 上，则 ACME 适配器必须运行在 80 以外的端口上。

代理服务器会自动将 ACME 质询转发到配置的 ACME 端口。

1. 将 ACME 适配器端口设置为 **8080**（或任何所需的端口）
2. 在代理管理器中，将其值设置为与 ACME 适配器端口相同的值。
3. 在 ACME 适配器中输入所有所需的域

证书
适配器从`system.certificates`读取证书，并提供三种类型：

### 1. 按命名规则划分的个人证书
这些证书用户可以通过 ioBroker 系统设置手动添加。所有存储在 `system.certificates → native.certificates` 中的密钥/证书对均可使用，前提是它们遵循以下命名约定：

| 关键信息 | 内容 |
| --------------- | ----------------------------------------------------- |
| `{name}Private` | 私钥 (PEM) |
| `{name}Chained` | 完整证书链（PEM 格式，优于 `Public`） |
| `{name}Chained` | 完整证书链（PEM 格式，优于 `Public` 格式） |

基本名称 `{name}` 显示在下拉列表中，并存储在配置中。

> **示例：** 如果 ioBroker 存储了密钥 `myCertPrivate` 和 `myCertChained`，则 `myCert` 会出现在下拉列表中。

#### IoBroker 默认证书
ioBroker 自带的自签名证书存储在 `system.certificates` 中，名称分别为 `defaultPrivate` 和 `defaultPublic`。它遵循与其他证书相同的约定：

- 基本名称：**`default`**
- 在下拉菜单中显示为“默认值”
- 非常适合不需要公开签名证书的内部服务

### 2. ACME 收藏品
Let's Encrypt 证书由 ACME 适配器自动生成。它们存储在 `system.certificates → native.collections` 目录中，名称与 ACME 适配器配置中分配给该集合的名称相同。端口 80 上的 ACME 质询将由代理自动转发到配置的 ACME 端口。

### 每个主机的协议
适配器会根据后端情况决定使用 HTTPS 还是 HTTP：

| 后端证书 | HTTP 请求 | HTTPS 请求 |
| ------------------- | ---------------------- | --------------------------- |
| 设置 | 301 重定向 → HTTPS | 使用 SNI 证书提供服务 |
| 空 | 直接提供服务 (HTTP) | 302 重定向 → HTTP |

两台服务器**并行**运行。每个后端都可以拥有自己的证书源。**SNI**（服务器名称指示）会在TLS握手期间自动为请求的主机名选择正确的证书。

TLS 层会拒绝主机名未知的主机——不会使用备用证书。

证书加载详情可在调试日志中查看。

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.1.10 (2026-04-29)

- Harden error handling: certificate loading, renewal, cleanup and adapter teardown are now individually guarded so a single failure no longer aborts the entire operation
- Fix: register server `error`/`close` handlers before calling `listen()` (correct Node.js pattern)
- Code quality: remove inconsistent `typeof this.terminate` guards, rename misleading `certHashes` to `certPemCache`, fix template literal formatting

### 0.1.9 (2026-04-06)

- Optimize logging behavior: request logs now use debug level, transient backend restart errors are logged as debug with details, and startup logs are less noisy
...
- Harden certificate handling: hosts with configured but unavailable certificates now fail closed for HTTPS/WSS instead of falling back silently
- Improve `info.connection` state handling: state is now true only when both HTTP and HTTPS listeners are active

### 0.1.8 (2026-03-26)
- Update GitHub Actions test matrix (Node.js 20, 22, 24)
- Address reviewer suggestions (use `node:` prefix, specific state roles, interval limiting)
- Fix linting errors

### 0.1.7 (2026-03-20)

- Docs: remove generic installation section per S6014

### 0.1.6 (2026-03-16)

- Add rich README header with badges and logo
- Update release workflow documentation
- Switch to NPM Trusted Publishing

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 lubepi

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