---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: /fAHrUoAIV+m6YdGp/L2QU9PWPyUeAI5pOafYsMDdcA=
---
![标识](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![安装数量（最新）](http://iobroker.live/badges/wolf-smartset-installed.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![安装数量（稳定）](http://iobroker.live/badges/wolf-smartset-stable.svg)
![新平台](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Wolf-smartset 适配器用于 ioBroker
将您的 Wolf Heating 连接到 iobroker。

此适配器连接到 Wolf Smartset 服务器 (https://wolf-smartset.com) 以监控和管理您的 Wolf 加热设备。这不是本地连接。好处是您可以使用 Wolf Smartset 应用程序或 [Wolf Smartset 门户](https://wolf-smartset.com)，同时还可以在 ioBroker 中接收或设置参数值。

＃＃ 要求
您需要一个配备 ISM7i WLAN/LAN 模块（又名 Link Home）的 Wolf 加热/气候设备，该设备连接到 Wolf Smartset 服务器，并且需要一个为您的设备授权的 Wolf Smartset 帐户。

## 适配器实例设置
### 标签：主要设置
#### Wolf Smartset 账户
要连接到 Wolf Smartset 服务器，您需要

- `用户名` 和
-`密码`

您还可以使用它登录 Wolf Smartset 应用程序或[Wolf Smartset 门户](https://wolf-smartset.com)。

#### 狼装置
您的 Wolf 帐户与一个或多个 Wolf 设备相关联。每个设备都需要一个单独的 ioBroker 适配器实例。

首次安装后，你必须选择一个特定的

- 每个实例的“设备”。

一旦您输入有效的`Username`和`Password`

- “狼设备列表”将填充分配给您帐户的设备。

从列表中选择设备后，点击

- `使用此设备` 确认您的选择。

### 标签：高级设置
高级设置允许您根据需要调整适配器的操作。通常，您可以将所有高级设置保留为默认设置。

#### 轮询周期间隔和参数列表
适配器在连接到 Wolf Smartset 服务器后，将定期从服务器轮询参数值。它支持两个具有不同周期间隔的独立轮询周期。

- `短轮询周期间隔`：输入间隔（以秒为单位）。Wolf Smartset 服务器定义了绝对最小轮询间隔（当前为 60 秒），您不应低于该间隔。如果您配置的值低于此最小间隔，服务器将不会以预期的方式响应，甚至可能断开您的会话。适配器会定期向服务器请求当前最小轮询间隔。如果配置的轮询间隔低于服务器指示的最小轮询间隔，您将从适配器收到警告日志，并且您应该相应地调整轮询间隔。
- `长轮询周期间隔`：输入第二个轮询周期的间隔（分钟）。

Wolf Smartset 服务器将各种设备参数分组到不同的包中，并通过数字 BundleId 进行标识。在 __ioBroker Admin__ UI 中，您将在通道级别的 __wolf-smartset__ 实例下方的 __Object__ 视图中找到不同参数组的 BundleId。

- `Bundle 的参数`：在此表中，您可以定义应在哪个轮询周期轮询哪个参数值组。最好这样做：
- `在短轮询周期中包括所有快速变化的参数值（例如操作状态）以及
- `包含在长轮询周期中`很少改变的参数值（例如设备配置参数）。

Wolf Smartset API 要求每个轮询请求除了要轮询的参数列表外，还包含一个 BundleId。目前还不清楚 BundleId 与实际参数列表的关系，但在大多数情况下，“默认”应该是可以的：它映射到给定轮询周期的最大选定 BundleId。此处的任何其他设置仅供实验使用。将 BundleId 配置为：

- `短轮询周期的 BundleId`
- `长轮询周期的 BundleId`

#### 导出登录
Wolf Smartset API 为设备参数定义了两个访问级别：__User__ 和 __Expert__。因此，您将在 __ioBroker Admin__ UI 的 __Object__ 视图中找到相应的两个子树：__Benutzer__ 和 __Fachmann__。初始身份验证后，适配器处于用户模式，并且在初始化期间只会接收一次所有可用的参数值。此后，在定期轮询期间，它将仅接收用户级别参数值的更新（即 __Benutzer__ 树中的值）。

如果你检查

- `进行专家登录`并输入正确的
- `专家密码`,

适配器将在初始化期间执行专家登录，并在与其关联的轮询周期内接收专家级参数值的定期更新（如__Fachmann__树中所示）。

__!!! 专家级别重要提示：开始 !!!__

专家级别似乎就像潘多拉魔盒一样！测试表明，一旦启用专家级别，就很难离开。虽然在禁用`Do Expert Login`设置并重新启动实例时，适配器将完全注销并删除所有本地缓存的身份验证数据（openId 令牌和会话 ID），但对于 Wolf Smartset 服务器来说，这似乎还不够好。

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

虽然乍一看停留在专家模式似乎没有太大问题，但至少有一个副作用可能对您来说是一个真正的问题：

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

这尤其会影响以下 ParameterIds，也可能会影响其他参数：

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

因此，如果您依赖于持续且精确地提供此类期前统计值，则应三思而后行，是否要检查`Do Expert Login`。不要抱怨，如果您无法返回到用户级别，我们已经警告过您了！

__!!! 专家级别重要提示：结束 !!!__

#### 检查公网 IP 变化
Wolf Smartset 服务器可以识别客户端 IP 地址。这意味着，它将一些应用程序状态信息与客户端应用程序的公共 IP 地址相关联。因此，如果您配置了 `Do Expert Login` 并且适配器的公共 IP 发生变化（例如，在路由器重新加载后），则适配器必须重新向 Wolf Smartset 服务器进行身份验证才能再次启用专家模式。由于适配器每小时仅进行一次重新身份验证，因此可能需要最多 __一个小时才能使适配器再次处于专家模式__。

如果你觉得太长，可以查看

- `启用公共 IP 检查`：在这种情况下，适配器将通过 [ipify.org](https://ipify.org) __每 4 个短轮询周期__ 检查您的公共 IP 地址，并在更改时触发重新身份验证。这样，适配器将在 __最迟 4 个短轮询周期后__ 恢复到专家模式。

API 分析
API 分析允许您跟踪适配器的 Wolf Smartset API 使用情况。如果您

- `启用 API 分析`，适配器将针对每个轮询请求更新__适配器实例对象树__中的以下对象：
-信息API
- poll_req_bundle_id: poll 请求中使用的 BundleId
- poll_req_num_params：适配器请求的参数数量
- poll_resp_num_params：从服务器返回的参数数量
- poll_resp_num_params：从服务器返回的参数值的数量（返回的参数可能有或可能没有关联值）

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 2.0.0-internal
- (flingo64) further internal changes omitted from news section due to size limitations
  - Demystified (decoded) API constants (array _021a[])
  - All API strings (URL, paths, params) as constants
  - Fixed various typechecker and eslint/prettier warnings
  - Replaced deprecated ioBroker async functions by sync function equivalents
  - Re-ordered and renamed private functions in main.js and admin/wss.js
  - Reorganized adapter initialization / openIdInit for more robust error handling
  - Added openId logout on instance unload to force a fresh AuthN on next adapter start
  - Added API Profiling option to track requested BundleId / # of requested params and # of returned params / # of returned values
  - Migrated translations from words.js to i18n
  - Added complete translation for all adapter instance setting strings
  - Disabled code for caching of auth data to allow a clean re-auth when required by server or on adapter reload
  - Added optional Check for public IP changes for faster Wolf Smartset expert session recovery
  - README: added descriptions on all instance settings and adpater operation

### 1.2.4 (2024-12-22)
- (flingo64) Bugfix for issues #281, #329, #365, #406: ioBroker object limits min/max use Wolf Smartset Min/MaxValueCondition if available, otherwise use Min/MaxValue now.
- (flingo64) Added some comments on Wolf Smartset ControlTypes
- (flingo64) Modified misspelled variable name to 'SubMenuEntry'
- (flingo64) Add NamePrefix, if exists, to object names (e.g. 'A1: ', 'WP001: ') for better parameter identification
- (mcm1957) Adapter has been adapted to @iobroker/eslint-config and eslint 9.x.
- (mcm1957) Dependencies have been updated

### 1.2.3 (2024-04-29)
- (mcm1957) Dependencies have been updated

### 1.2.2 (2024-04-22)
- (flingo64) A crash during re-authentication has been fixed. OpenIdInit will be called only once to avoid endless loop during re-authentication.

### 1.2.1 (2024-04-19)
- (flingo64) Initialization added to openId. This fixes GET_AUTH_TOKEN_ERROR [#304, #330]

### 1.2.0 (2024-04-19)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.1 (2023-01-26)
* (Apollon77) Adjusted to new Login procedure
* (Apollon77) Tokens are now stored and tried to be refreshed automatically
* (Apollon77) Errors in session updates will try to create new session or authenticate anew
* (Apollon77) Generates folder and channel structures for created states
* (Apollon77) Fix some more crash cases
* (Apollon77) make sure adapter is stopped correctly in all cases

### 1.0.0 (2021-07-31)
* (MeisterTR) fix Sentry: IOBROKER-WOLF-SMARTSET-6,IOBROKER-WOLF-SMARTSET-5, IOBROKER-WOLF-SMARTSET-7,IOBROKER-WOLF-SMARTSET-8,IOBROKER-WOLF-SMARTSET-1,IOBROKER-WOLF-SMARTSET-3,IOBROKER-WOLF-SMARTSET-4
* (MeisterTR) Change api from app data to Web PEASE DELETE ADAPTER AND REINSTALL OR DELETE ALL OBJECTS
* (MEISTERTR) added "FACHMANN" states

### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection

### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change

### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

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