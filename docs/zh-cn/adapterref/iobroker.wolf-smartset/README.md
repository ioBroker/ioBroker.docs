---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: HnhXfR/SVlPFwpg3YJePcFIBYPTlFqqhrmuu9LtafCQ=
---
![标识](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![安装数量（最新）](http://iobroker.live/badges/wolf-smartset-installed.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![安装数量（稳定）](http://iobroker.live/badges/wolf-smartset-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 wolf-smartset 适配器
将您的 Wolf Heating 连接到 iobroker。

此适配器连接到 Wolf Smartset 服务器 (https://wolf-smartset.com)，以监控和管理您的 Wolf 加热设备。这不是本地连接。其优势在于，您可以使用 Wolf Smartset 应用程序或[Wolf Smartset 门户](https://wolf-smartset.com)，同时在 ioBroker 中接收或设置参数值。

＃＃ 要求
您需要一个配备 ISM7i WLAN/LAN 模块（又名 Link Home）的 Wolf 加热/气候设备，该设备连接到 Wolf Smartset 服务器，并且需要一个为您的设备授权的 Wolf Smartset 帐户。

## 适配器实例设置
### 标签：主要设置
#### Wolf Smartset 账户
要连接到 Wolf Smartset 服务器，您需要

- `用户名` 和
- `密码`

您也可以使用它登录 Wolf Smartset 应用程序或[Wolf Smartset 门户](https://wolf-smartset.com)。

#### 狼装置
您的 Wolf 帐户已与一台或多台 Wolf 设备关联。每台设备都需要一个单独的 ioBroker 适配器实例。

首次安装后，您必须选择一个特定的

- 每个实例的“设备”。

一旦您输入有效的`Username`和`Password`

- “狼设备列表”将填充分配给您帐户的设备。

从列表中选择设备后，点击

- `使用此设备`确认您的选择。

### 标签：高级设置
高级设置允许您根据自身需求调整适配器的操作。通常，您可以将所有高级设置保留为默认设置。

#### 轮询周期间隔和参数列表
连接到 Wolf Smartset 服务器后，适配器将定期从服务器轮询参数值。

- `轮询所有参数`：适配器将始终轮询服务器上找到的所有参数。此轮询策略向后兼容适配器版本 1.x

该适配器还支持基于两个具有不同周期间隔的独立轮询周期的更复杂的轮询策略。

- `短轮询周期间隔`：输入以秒为单位的间隔。Wolf Smartset 服务器定义了绝对最小轮询间隔（当前为 60 秒），您不应低于此值。如果您配置的值低于此最小间隔，服务器将无法按预期响应，甚至可能断开您的会话。适配器会定期向服务器请求当前的最小轮询间隔。如果配置的轮询间隔低于服务器指示的最小轮询间隔，您将收到适配器发出的警告日志，您应该相应地调整轮询间隔。
- `长轮询周期间隔`：输入第二个轮询周期的间隔（以分钟为单位）。

Wolf Smartset 服务器将各种设备参数分组到不同的 bundles 中，并通过数字 BundleId 进行标识。在 __ioBroker Admin__ 界面中，您可以在通道级别的 __wolf-smartset__ 实例下方的 __Object__ 视图中找到不同参数组的 BundleId。

- `Bundle 参数`：在此表中，您可以定义在哪个轮询周期内轮询哪个参数值组。建议：
- `在短轮询周期中包括所有快速变化的参数值（例如操作状态）以及
- `包含在长轮询周期中`很少改变的参数值（例如设备配置参数）。

Wolf Smartset API 要求每个轮询请求除了包含要轮询的参数列表外，还必须包含一个 BundleId。目前尚不清楚 BundleId 与实际参数列表之间的关系，但大多数情况下，“默认”应该可以接受：它会映射到给定轮询周期内选定的最大 BundleId。此处的任何其他设置仅供实验使用。请将 BundleId 配置为：

- `短轮询周期的 BundleId`
- `长轮询周期的 BundleId`

如果您配置了`Poll all Parameters`，则轮询请求中使用的 BundleId 将被设置为 1000。这可能会导致结果中排除一些 Expert 参数（见下文）。因此，如果您打算轮询 Expert 参数，则最好不要使用`Poll all Parameters`。

#### 专家登录
Wolf Smartset API 为设备参数定义了两种访问级别：__User__ 和 __Expert__。因此，您可以在 __ioBroker Admin__ UI 的 __Object__ 视图中找到相应的两个子树：__Benutzer__ 和 __Fachmann__。初始身份验证后，适配器处于用户模式，并且在初始化期间仅接收一次所有可用参数值。此后，在定期轮询期间，它将仅接收用户级别参数值的更新（即 __Benutzer__ 树中的值）。

如果你检查

- `进行专家登录`并输入正确的
- `专家密码`,

适配器将在初始化期间执行专家登录，并在与其关联的轮询周期内定期接收专家级参数值的更新（如__Fachmann__树中所示）。

__!!! 专家级别重要提示：开始 !!!__

专家级别似乎就像潘多拉魔盒一样！测试表明，一旦启用专家级别，就很难退出。虽然禁用`Do Expert Login`设置并重启实例后，适配器会完全注销并删除所有本地缓存的身份验证数据（openId 令牌和会话 ID），但这似乎对 Wolf Smartset 服务器来说不够好。

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

虽然乍一看停留在专家模式似乎没有什么问题，但至少有一个副作用可能会对您造成真正的问题：

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

这尤其会影响以下 ParameterIds，也可能会影响其他 ParameterIds：

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

因此，如果您依赖于持续且精确地提供此类周期前统计值，则应三思而后行，是否需要检查`Do Expert Login`。别抱怨，如果您无法返回用户级别，我们已经警告过您了！

__!!! 专家级别重要提示：结束 !!!__

#### 检查公共 IP 变化
Wolf Smartset 服务器能够感知客户端 IP 地址。这意味着，它会将一些应用程序状态信息与客户端应用程序的公网 IP 地址关联起来。因此，如果您配置了 `Do Expert Login`，并且适配器的公网 IP 发生变化（例如，路由器重新加载后），则适配器必须重新向 Wolf Smartset 服务器进行身份验证才能再次启用专家模式。由于适配器每小时仅进行一次重新身份验证，因此可能需要最多__一小时才能使其再次处于专家模式__。

如果这对你来说太长，你可以检查

- `启用公共 IP 检查`：在这种情况下，适配器将__每 4 个短轮询周期__通过 [ipify.org](https://ipify.org) 检查您的公共 IP 地址，并在 IP 地址更改时触发重新身份验证。这样，适配器将在__最迟 4 个短轮询周期后__恢复到专家模式。

API 分析
API 分析允许您跟踪适配器的 Wolf Smartset API 使用情况。如果您

- `启用 API 分析`，适配器将针对每个轮询请求更新 __适配器实例对象树__ 中的以下对象：
- 信息API
- poll_req_bundle_id：轮询请求中使用的 BundleId
- poll_req_num_params：适配器请求的参数数量
- poll_resp_num_params：从服务器返回的参数数量
- poll_resp_num_params：从服务器返回的参数值的数量（返回的参数可能有也可能没有关联值）

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mcm1957) Dependencies have been updated.

### 2.1.2 (2025-08-14)
- (mcm1957) Adapter requires admin 7.6.17 now.
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2025-08-05)
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2025-08-05)
- (flingo64) Change: Log periodic message '_refreshAuthToken(): ERROR ...' with level info
- (flingo64) Bugfix (#458): set instance state to connected only if initialization went fine
- (flingo64) Bugfix: if configured BundleId for poll requests is not available on server, use default BundleId
- (flingo64) Enhancement: option 'Poll all Parameters' implements backward compatible poll strategy
- (flingo64) Enhancement(#459, #465): added more BundleIds (4300, 10000, 10700, 14000, 14700, 15600, 15700, 15800) for AdminUI as found on different Wolf device configurations

### 2.0.1 (2025-04-18)
- (flingo64) Bugfix: fixed various typos in Readme and translations
- (flingo64) Bugfix: Fixed an AdminUI issue (#450 - 'No device selected') when the device information contained line break (e.g. in ContactInformation, Description or Comment )
- (flingo64) Enhancement for AdminUI: support for more than one device in list of devices returned from Wolf Smartset server

### 2.0.0 (2025-04-02)
- (flingo64) BREAKING CHANGE: Please reenter your login credentials.
- (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
- (flingo64) A general code cleanup and partial rewrite has been done.
- (flingo64) Trigger re-initalization has been added, if api returns an error (server might be down temporarily).
- (flingo64) Expert login and periodic re-login have been added (#242).
- (flingo64) Support for level 3 objects `time programs` / `party mode` / `vacation mode` has been added.
- (flingo64) Request UserInfo from Wolf server, check whether adapter instance's poll interval meets requirements (60 sec) added.
- (flingo64) ParameterId lists for each Wolf BundleId created and show `BundleIds` for each channel added
- (flingo64) Support for two sepearate poll cycles to avoid server abuse reactions has been added. 
- (flingo64) Switched AdminUI to `jsconConfig`.

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 MeisterTR <meistertr.smarthome@gmail.com>

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