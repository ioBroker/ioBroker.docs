---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.agent-dvr/README.md
title: ioBroker.agent-dvr
hash: FndVMZc/c5xH7KZmBMM8n02qGF84wi5MYMsFCtz3xDA=
---
![标识](../../../en/adapterref/iobroker.agent-dvr/admin/agent-dvr.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.agent-dvr.svg)
![下载](https://img.shields.io/npm/dm/iobroker.agent-dvr.svg)
![安装数量](https://iobroker.live/badges/agent-dvr-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/agent-dvr-stable.svg)
![NPM](https://nodei.co/npm/iobroker.agent-dvr.png?downloads=true)

# IoBroker.agent-dvr
**测试：** ![测试与发布](https://github.com/ipod86/ioBroker.agent-dvr/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 agent-dvr 适配器
将 ioBroker 连接到 [AgentDVR](https://www.ispyconnect.com)：自动发现所有摄像头，将每个设备属性镜像为数据点，提供所有常用命令（录制、布防、云台控制等）的按钮，在新录像时提供推送触发的图库更新，为每个摄像头生成响应式 HTML 图库小部件，并包含一个内置的实时仪表板，可选择每个摄像头的流（MJPEG、带音频的 MP4/FLV 或 go2rtc WebRTC）。

＃＃ 要求
- 带有 `iobroker.web` 适配器的 ioBroker
- **AgentDVR ≥ 7.8.0.0** — 早期版本在 `streamFile.cgi` 端点存在回归问题（分块编码格式错误，MIME 类型错误），导致无法在内置控制面板中播放录制内容。开发者已确认 7.8.0.0 版本已修复此问题。

＃＃ 特征
- 启动时自动发现所有 AgentDVR 摄像头（不包括麦克风）
- 所有设备属性均以数据点的形式呈现（从 API 中提取并扁平化）
- 每个设备都有控制按钮：录制、快照、检测、布防/撤防警报、开关机、物体检测、定时开关机、探测器开关机、灵敏度（最小/最大/增益）、清除……
系统级按钮：布防、撤防、全部开/关、重新加载、存储管理、重启……
- **配置文件选择器** — 可编辑的下拉菜单，反映当前的 AgentDVR 配置文件（在家/外出/夜间/自定义）
- **Base64 快照** — 每个摄像头的 `snapshot_b64` 状态，可通过按钮写入或在每个轮询周期自动更新
- 带按住移动开关的 PTZ 控制
- 每个摄像头的流媒体 URL（快照、照片、MJPEG、MP4）
- 用于实时更新的 Webhook 端点 — 从 AgentDVR 操作调用它以触发立即进行完整轮询
- 每个摄像头的 HTML 录像库组件（`widget_recordings`）和单摄像头动态图块（`widget_live`）——纯 HTML/CSS 或全 JS 模式，支持搜索和标签筛选。
- 概览小部件，将所有摄像头整合到一个 HTML 状态中
- **内置实时仪表盘**，地址为 `http://<iobroker>:<webport>/agent-dvr.0/` — 无需其他应用程序：
- 每个摄像头可选择的视频流格式：MJPEG、带音频的 MP4/FLV 或 go2rtc WebRTC/MSE
- 顶部导航栏中的相机筛选按钮（漏斗图标）——打开一个针对每个相机的复选框弹出窗口；徽章显示隐藏的相机数量；状态保存在本地存储中。
- 通过 Socket.io 实现实时运动和警报指示器（黄色/橙色方块边框）。
- 全屏视图，带有云台控制叠加层、录制、静音和浏览器原生全屏按钮；标题栏自动隐藏
- “录制”选项卡包含网格、时间线和事件日志视图、搜索功能、可折叠标签筛选器以及带上一集/下一集导航的视频播放器。
- 直接从视频播放器弹窗中删除录制内容（需要 AgentDVR v7.7.8.0+）
- 录制显示设置 — 选择/删除栏中的齿轮图标 ⚙ 可调整网格列宽、显示的最大录制数量和徽章可见性（保存在 localStorage 中）
- 摄像机颜色从 AgentDVR 读取，并应用于时间线条和录像点。
- PTZ 预设 — 从 PTZ 叠加层导航至已保存的预设（需要 AgentDVR v7.7.8.0+）
- 状态栏在实时视图中显示摄像头数量，在录像视图中显示录像/事件数量。
- 网络中断或切换标签页后，所有流类型均自动重新连接
- 可通过适配器配置完全自定义颜色主题

＃＃ 配置
### 选项卡：连接
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| AgentDVR IP | AgentDVR 服务器的 IP 地址 | — |
| 端口 | AgentDVR HTTP 端口 | `8090` |
| 用户名 | 可选的 HTTP 基本身份验证用户名 | — |
| 轮询间隔（秒）| 从 AgentDVR 获取数据的频率（5–3600）| `30` |
| HTTP 超时（毫秒） | 每次 API 请求超时（1000–30000） | `8000` |
| HTTP 超时（毫秒） | 每次 API 请求超时时间（1000–30000） | `8000` |

### 标签页：功能
**控制**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 系统控制按钮 | 创建布防/撤防/重启/…按钮和配置文件选择器 | `true` |
| 生成流媒体 URL | 为每个摄像头创建 URL 状态（快照、MJPEG、MP4） | `true` |
| 以 Base64 格式快照 | 每次轮询时自动获取并以 Base64 格式存储当前帧 | `false` |
| 以 Base64 格式快照 | 每次轮询时自动获取并以 Base64 格式存储当前帧 | `false` |

**活动**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 事件数据点 | 每台摄像机的镜像录制元数据（最新事件、计数、标签等） | `true` |

**展示**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 概览小部件 | 单个 HTML 状态，包含所有相机动态图块 | `true` |

**代理人**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 媒体代理 | 通过 ioBroker 路由 MJPEG 流、快照、录制缩略图和视频 | `false` |

**调试**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 存储原始 API JSON | 将完整的 getObjects 响应写入 `system.raw_getObjects` | `false` |

### 标签页：仪表盘
**默认视图**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 默认视图 | 仪表盘加载时打开的标签页：实时或录制 | `Live` |
| 最大录像总数 | 仪表盘中所有摄像头显示的最大录像数量（最新录像优先显示）。不受组件数量限制。 | `200` |
| 最大录像总数 | 控制面板中所有摄像头显示的最大录像数量（最新录像优先显示）。不受组件数量限制。 | `200` |

**相机网格**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 列数 | 网格列数（0 = 根据图块宽度自动调整） | `0` |
| 标签徽章位置 | 相机名称徽章在每个图块上显示的角落 | `bottom-right` |
| 标签徽章位置 | 相机名称徽章在每个图块上显示的角落 | `右下角` |

**溪流**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 刷新间隔（秒）| 仪表盘重新获取摄像头数据的频率（10–600）| `60` |
| 自动重连流 | 发生错误或切换标签页后自动重连 MJPEG、MP4/FLV 和 go2rtc 流 | `true` |

**颜色主题** — 7 种颜色选择器，可与您的用户界面完美匹配：

| 设置 | 描述 |
|---------|-------------|
| 背景 | 页面/网格背景颜色 |
| 表面 | 相机瓷砖背景 |
| 强调色 | 高亮/活动元素颜色 |
| 文本 | 主文本颜色 |
| 边框 | 瓷砖边框颜色 |
| 在线指示器 | 在线状态点的颜色 |
| 离线指示器 | 离线状态点的颜色 |

**流分配**

在这里，您可以为每个摄像头单独分配视频流源。下拉菜单显示了 AgentDVR 发现的所有摄像头（不包括麦克风）。

| 选项 | 描述 |
|--------|-------------|
| MJPEG *(AgentDVR)* | AgentDVR 提供的经典 MJPEG 流——延迟最低，无音频 |
| MP4 / FLV 格式，带音频 *(AgentDVR)* | FLV 流通过 ioBroker 使用 flv.js 代理 — 包含音频，宽高比正确 |
| *流名称* *(go2rtc)* | 来自 go2rtc 的 WebRTC/MSE 流 — 流畅、低延迟、支持音频 |

当管理界面打开时，go2rtc 流名称会自动从 go2rtc 服务器获取。如果浏览器无法直接访问 go2rtc（例如，HTTPS 上的混合内容），适配器会从服务器端获取流名称作为备用方案。

**go2rtc URL**（仅当至少一台摄像头使用 go2rtc 流时可见）

| 设置 | 描述 | 示例 |
|---------|-------------|---------|
| go2rtc URL | go2rtc 实例的基本 URL | `http://192.168.1.10:1984` |

> **注意：** go2rtc 必须已经配置好流。该适配器仅读取流列表并代理 WebSocket，它不会配置 go2rtc。

### 标签页：小部件（每个相机的图库小部件）
**一般的**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 启用小部件 | 为每个摄像头生成一个 HTML 图库小部件 | `true` |
| 小部件模式 | `无 JS` — 纯 HTML/CSS，可嵌入任何位置；`JS` — 具备完整的交互功能，支持搜索和标签过滤 | `无 JS` |

**布局**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 最大条目数 | 小部件中显示的最大记录数 | `20` |
| 模态框最大宽度（像素） | 视频播放模态框的最大宽度 | `900` |
| 模态框最大宽度（像素）| 视频播放模态框的最大宽度 | `900` |

标签

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 显示标签 | 在每个缩略图上显示录制标签 | `true` |
| 标签徽章位置 | 标签在缩略图上显示的角落 | `左下角` |

**筛选**

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 最新优先 | 按最新录音排序 | `true` |
| 紧凑模式 | 更紧凑的布局，更小的缩略图 | `false` |
| 紧凑模式 | 更紧凑的布局，更小的缩略图 | `false` |
| 缩略图尺寸 | `Small` / `Medium` / `Large` | `Medium` |
| 缩略图尺寸 | `小` / `中` / `大` | `中` |

玩家

| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 直播画面宽高比 | 直播预览的宽高比，例如 `16/9` | — |
| 播放器 URL | 小部件中使用的视频播放器的自定义 URL | — |

**颜色主题** — 5 种颜色选择器 + 边框圆角：

| 设置 | 描述 |
|---------|-------------|
| 卡片背景 | 小部件卡片背景 |
| 标签背景 | 标签芯片背景 |
| 标签文字 | 标签芯片文字颜色 |
| 强调色 | 高光色 |
| 模态背景 | 视频模态背景 |
| 边框半径（像素） | 卡片圆角半径 | `4` |

### 选项卡：高级
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 最大递归深度 | API JSON 数据被扁平化为数据点的深度（1-10） | `6` |
| 动态标签 | 为每个唯一的录音标签自动创建一个标签数据点 | `false` |
| 动态标签 | 为每个唯一的录音标签自动创建一个标签数据点 | `false` |
| 忽略标签（逗号分隔） | 要从事件数据点中排除的记录标签 | — |
| 标签筛选（逗号分隔） | 仅创建与这些标签匹配的录制事件数据点 | — |

## 实时仪表盘
该适配器在 `http://<iobroker>:<webport>/agent-dvr.0/` 处提供了一个内置的实时仪表板。

第二个实例可通过 `/agent-dvr.1/` 访问，第三个实例可通过 `/agent-dvr.2/` 访问，依此类推。

**特征：**

- 每个摄像头可选择的视频流格式：MJPEG、带音频的 MP4/FLV（通过 flv.js）或 go2rtc WebRTC/MSE
- 摄像头筛选按钮（漏斗图标，右上角标题栏）— 打开一个包含“全部”切换开关的摄像头复选框弹出窗口；徽章显示隐藏摄像头的数量；状态持久化到本地存储中。
- 全屏视图，带有 PTZ 叠加层、录制按钮、静音按钮和原生浏览器全屏模式（标题栏在 3 秒无操作后自动隐藏；鼠标或触摸时重新出现）
- 通过 Socket.io 实现实时运动（黄色边框）和警报（橙色边框）指示器
- 自动重连：MJPEG 和 FLV 在出错后自动重连；go2rtc 在 WebSocket 意外关闭或停滞 10 秒后自动重连
- “录制”选项卡包含网格、时间线和事件日志视图、搜索功能、可折叠标签筛选器以及带上一集/下一集导航的视频播放器。
标签过滤器将 AgentDVR 的逗号分隔标签拆分成单独的数据块，以便进行逐标签过滤。
- 从视频播放器弹窗中删除录制内容，或长按选择多个录制内容进行批量删除（需要 AgentDVR v7.7.8.0+）
- 录制显示设置 — 选择/删除栏中的齿轮按钮；网格列宽、最大录制数量覆盖和徽章切换的滑块 — 所有设置均保存在本地存储中。
- “录制”标签页上的“新录制”徽章——显示自您上次访问该标签页以来新增的录制数量；基线存储在浏览器的本地存储中，并且是按浏览器/设备划分的（不会在不同的浏览器或设备之间共享）。
- 摄像机颜色从 AgentDVR 读取，并应用于时间线条和录像点。
- PTZ 预设 — 从 PTZ 叠加层导航至已保存的预设；每个摄像机一个选择器数据点（需要 AgentDVR v7.7.8.0+）
状态栏显示摄像头数量、CPU/RAM 使用率和磁盘可用空间
- 通过适配器配置实现颜色主题

### Go2rtc WebRTC 流
[go2rtc](https://github.com/AlexxIT/go2rtc) 提供流畅、低延迟的 WebRTC/MSE 流，并带有音频。

**设置：**

1. 安装并运行 go2rtc，在 go2rtc 的配置中配置您的摄像头流。
2. 在适配器配置 → *仪表盘* 选项卡中，从下拉列表中为每个摄像头分配所需的 go2rtc 流名称。
3. 输入表格下方显示的 **go2rtc URL**（例如 `http://192.168.1.10:1984`）。
4. 保存并重启。该适配器通过 ioBroker 代理 WebSocket 流量，以避免浏览器跨域限制。

## 媒体代理
该适配器可以将所有媒体路由到 ioBroker，因此浏览器无需直接连接到 AgentDVR。在“功能”选项卡中启用**媒体代理**。

| 什么是代理 | 关闭代理 | 开启代理 |
|-----------------|-----------|----------|
| MJPEG 实时流 | AgentDVR 直接 URL | `/agent-dvr.0/api/mjpeg?oid=…` |
| 录制缩略图 | AgentDVR 直接 URL | `/agent-dvr.0/api/thumb?oid=…` |
| 录制视频 | AgentDVR 直接 URL | `/agent-dvr.0/api/media?oid=…` |
| 录制视频 | AgentDVR 直接 URL | `/agent-dvr.0/api/media?oid=…` |
| FLV 直播 | **始终通过 ioBroker 传输** | **始终通过 ioBroker 传输** |
| go2rtc WebSocket | **始终通过 ioBroker** | **始终通过 ioBroker** |

无论设置如何，FLV 和 go2rtc 始终通过 ioBroker 运行——浏览器无法直接向这些端点发出跨域请求。

### 何时启用
- 您可以从家庭网络外部访问控制面板，此时 AgentDVR 无法通过浏览器直接访问。
- 只有 ioBroker 对外开放（例如，仅通过反向代理或 VPN 连接到 ioBroker）

### 何时关闭
- 浏览器和 AgentDVR 位于同一网络（本地访问）
- 直接连接速度更快——无需额外跳转，延迟更低
- 减轻 ioBroker 服务器的负载——数据流无需经过 Node.js。

设置保存后立即生效，无需重启。

## 数据点
`<cam>` 代表 `cam_<oid>_<name>`，例如 `cam_8_Reolink`。

＃＃＃ 系统
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `system.online` | 布尔值 | R | 已建立与 AgentDVR 的连接 |
| `system.lastPoll` | 数字 | R | 上次轮询的 Unix 时间戳 |
| `system.cameraCount` | 数字 | R | 已发现的摄像头数量 |
| `system.disk_free_gb` | 数字 | R | 可用磁盘空间（GB） |
| `system.settings.*` | 各种 | R | 扁平化 AgentDVR 服务器设置 |
| `system.stats.*` | 各种 | R | CPU / RAM / 磁盘统计信息 |
| `system.status.*` | 各种 | R | 系统状态（已布防、设备、版本等） |
| `system.raw_getObjects` | 字符串 | R | 原始 getObjects JSON（如果已启用） |
| `system.raw_getObjects` | 字符串 | R | 原始 getObjects JSON（如果已启用） |

### 系统控制（需要“系统控制按钮”）
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `system.control.arm` | 按钮 | W | 启动系统 |
| `system.control.allOn` | 按钮 | W | 打开所有设备 |
| `system.control.allOff` | 按钮 | W | 关闭所有设备 |
| `system.control.reloadConfig` | 按钮 | W | 重新加载 AgentDVR 配置 |
| `system.control.reloadObjects` | 按钮 | W | 重新加载对象 |
| `system.control.runStorageMgmt` | 按钮 | W | 运行存储管理 |
| `system.control.blockExternal` | 按钮 | W | 阻止外部访问 |
| `system.control.unblockExternal` | 按钮 | W | 解除外部访问限制 |
| `system.control.restart` | 按钮 | W | 重启 AgentDVR |
| `system.control.refresh` | 按钮 | W | 强制立即轮询 |
| `system.profile.selector` | 数字 | 读/写 | 活动配置文件索引 — 下拉菜单（0 = 主场，1 = 客场，…） |
| `system.profile.list` | 字符串 | R | 可用配置文件（JSON 数组） |
| `system.profile.list` | 字符串 | R | 可用配置文件列表（JSON 数组） |

### 每台摄像机
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `<cam>.name` | 字符串 | R | 相机名称 |
| `<cam>.data.connected` | 布尔值 | R | 流已连接 |
| `<cam>.data.recording` | 布尔值 | R | 当前正在录制 |
| `<cam>.data.detected` | 布尔值 | R | 检测到运动/物体 |
| `<cam>.data.detectorActive` | 布尔值 | R | 启用运动检测器 |
| `<cam>.data.alertsActive` | 布尔值 | R | 已启用警报 |
| `<cam>.data.alerted` | 布尔值 | R | 当前警报处于激活状态 |
| `<cam>.data.scheduleActive` | 布尔值 | R | 已启用计划 |
| `<cam>.data.width` / `height` | 编号 | R | 流分辨率 |
| `<cam>.data.*` | 各种 | R | AgentDVR 的所有其他设备属性 |
| `<cam>.snapshot_b64` | 字符串 | R | 当前帧为 `data:image/jpeg;base64,…`（角色 `media.picture`） |
| `<cam>.control.record` | 按钮 | W | 开始录制 |
| `<cam>.control.recordStop` | 按钮 | W | 停止录制 |
| `<cam>.control.recordRestart` | 按钮 | W | 重新开始录制 |
| `<cam>.control.triggerRecord` | 按钮 | W | 触发录制（持续录制直至超时） |
| `<cam>.control.snapshot` | 按钮 | W | 指示 AgentDVR 将快照保存到磁盘 |
| `<cam>.control.refreshSnapshotB64` | 按钮 | W | 获取当前帧并写入 `snapshot_b64` |
| `<cam>.control.detect` | 按钮 | W | 触发运动检测 |
| `<cam>.control.alertOn` | 按钮 | W | 布防警报 |
| `<cam>.control.alertOff` | 按钮 | W | 解除警报 |
| `<cam>.control.switchOn` | 按钮 | W | 打开摄像头 |
| `<cam>.control.switchOff` | 按钮 | W | 关闭摄像头 |
| `<cam>.control.objectDetectOn` | 按钮 | W | 启用物体检测（仅限摄像头） |
| `<cam>.control.objectDetectOff` | 按钮 | W | 禁用物体检测（仅限摄像头） |
| `<cam>.control.scheduleOn` | 按钮 | W | 启用设备计划 |
| `<cam>.control.scheduleOff` | 按钮 | W | 关闭设备计划 |
| `<cam>.control.detectorOn` | 按钮 | W | 启用运动检测器 |
| `<cam>.control.detectorOff` | 按钮 | W | 关闭运动检测器 |
| `<cam>.control.sensitivityMin` | 数值 0–100 | 读/写 | 检测器灵敏度 — 最小阈值 *(仅限相机)* |
| `<cam>.control.sensitivityMax` | 数值 0–100 | 读/写 | 检测器灵敏度 — 最大阈值（仅限相机） |
| `<cam>.control.sensitivityGain` | 编号 0–100 | 读/写 | 探测器灵敏度 — 增益 *(仅限相机)* |
| `<cam>.control.recOnAlert` | 按钮 | W | 启用“警报录制” |
| `<cam>.control.recOnDetect` | 按钮 | W | 启用“检测到时录制” |
| `<cam>.control.purge` | 按钮 | W | 删除此摄像头的所有录像 |
| `<cam>.control.purge` | 按钮 | W | 删除此摄像头的所有录像 |

### 云台控制（需要“云台控制按钮”）
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `<cam>.control.ptz.left` | 开关 | 读/写 | 向左平移（按住可保持移动） |
| `<cam>.control.ptz.up` | 开关 | 读/写 | 向上倾斜 |
| `<cam>.control.ptz.down` | 开关 | 读/写 | 向下倾斜 |
| `<cam>.control.ptz.upLeft` | 开关 | 读/写 | 左上斜线 |
| `<cam>.control.ptz.upRight` | 开关 | 读/写 | 对角线向上右 |
| `<cam>.control.ptz.downLeft` | 开关 | 读/写 | 左下角 |
| `<cam>.control.ptz.downRight` | 开关 | 读/写 | 右下角 |
| `<cam>.control.ptz.zoomIn` | 开关 | 读/写 | 放大 |
| `<cam>.control.ptz.zoomOut` | 切换 | 读/写 | 缩小 |
| `<cam>.control.ptz.stop` | 按钮 | W | 停止云台运动 |
| `<cam>.control.ptz.center` | 按钮 | W | 移动到中心/初始位置 |
| `<cam>.control.ptz.preset` | 数字 | 读/写 | 预设选择器 — 写入索引以移动到该预设；状态枚举列表预设名称（需要 AgentDVR v7.7.8.0+） |
| `<cam>.control.ptz.preset` | 数字 | 读/写 | 预设选择器 — 写入索引以移动到该预设；状态枚举列表预设名称（需要 AgentDVR v7.7.8.0+） |

### 流媒体 URL *（需要“生成流媒体 URL”）*
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `<cam>.urls.snapshot` | 字符串 | R | 当前 JPEG 快照的 URL（仅限相机）|
| `<cam>.urls.mjpeg` | 字符串 | R | MJPEG 实时流的 URL（仅限摄像头） |
| `<cam>.urls.mp4` | 字符串 | R | MP4 直播流的 URL（仅限摄像头） |
| `<mic>.urls.audio_mp3` | 字符串 | R | MP3 音频流的 URL（仅限麦克风）* |
| `<mic>.urls.audio_ogg` | 字符串 | R | OGG 音频流的 URL（仅限麦克风）|
| `<mic>.urls.audio_ogg` | 字符串 | R | OGG 音频流的 URL（仅限麦克风） |

### 活动/画廊（仅限相机）
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `<cam>.events.*` | 各种 | R | 最新记录元数据 — 需要“事件数据点” |
| `<cam>.widget_live` | 字符串 | R | HTML 单摄像头动态图块 — 需要“图库小部件”；每次适配器轮询时刷新快照 |
| `<cam>.widget_live` | 字符串 | R | HTML 单摄像头实时图块 — 需要“图库小部件”；每次适配器轮询时刷新快照 |

## Webhook
该适配器公开了一个 webhook 端点，该端点会立即触发对 AgentDVR 的全面轮询：

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

如果运行多个实例，请将 `agent-dvr.0` 替换为实际实例编号（`agent-dvr.1` 等）。

将此 URL 配置为 AgentDVR 中的“操作”（摄像头 → 编辑 → 警报 → 操作 → URL），即可在录制完成或警报触发时获取实时更新。适配器将立即重新获取所有摄像头数据、录像和系统统计信息，无需等待下一次轮询周期。

成功时返回`{"ok":true}`。

### 概览（需要“概览”小部件）
| 数据点 | 类型 | 读/写 | 描述 |
|-----------|------|-----|-------------|
| `widget_live_overview` | 字符串 | R | 所有摄像头的 HTML 瓦片网格 — 每次适配器轮询时刷新快照 |

## Changelog

### 0.5.2 (2026-08-05)
* (ipod86) feat: rename `overview` DP to `widget_live_overview` for consistent naming

### 0.5.1 (2026-08-05)
* (ipod86) feat: per-instance URL routing — each adapter instance uses its own URL namespace (`agent-dvr.0/`, `agent-dvr.1/`, …)
* (ipod86) feat: rename per-camera recording widget DP from `widget` to `widget_recordings`; add new `widget_live` DP with a single-camera live tile

### 0.5.0 (2026-08-03)
* (ipod86) feat: replace live-view camera chip-bar with compact header filter button — funnel icon opens a popover with per-camera checkboxes and drag-to-reorder; order persisted in localStorage
* (ipod86) feat: new-recordings badge on the Recordings tab — shows count of recordings since last visit; persisted per browser/device in localStorage
* (ipod86) feat: recording display settings panel — ⚙ gear button in the select/delete bar; grid column width slider, max-recordings override, badge toggle (all persisted in localStorage)
* (ipod86) feat: first-visit onboarding modals for live view (camera filter & sort) and recordings tab (gestures, gear panel, badge)
* (ipod86) feat: webhook endpoint `/agent-dvr.0/webhook` triggers immediate full poll — configure as AgentDVR action for real-time updates
* (ipod86) feat: PTZ presets — navigate to saved presets from PTZ overlay; single selector DP `<cam>.control.ptz.preset` per camera (requires AgentDVR v7.7.8.0+)
* (ipod86) feat: add event log view to recordings panel (clock icon toggle) alongside grid and timeline
* (ipod86) feat: delete recording from video modal (trash icon, two-click confirm, requires AgentDVR v7.7.8.0+)
* (ipod86) feat: bulk-delete recordings — long-press a tile to enter select mode, checkbox each recording, delete all at once
* (ipod86) feat: new `dashMaxRec` config setting — limits total recordings shown across all cameras in the dashboard (independent of widget limit, default 200)
* (ipod86) feat: tag filter splits AgentDVR's comma-separated tags into individual chips for per-tag filtering
* (ipod86) feat: read camera color from AgentDVR and use it for timeline bars and recording dots
* (ipod86) feat: status bar shows CPU usage, RAM % and free, disk usage % and free alongside camera/recording counts
* (ipod86) feat: reset colors to defaults button in Live Dashboard settings tab
* (ipod86) refactor: remove per-camera pushTrigger data points in favour of the global webhook
* (ipod86) fix: new-recordings badge now correctly visible (display:none CSS fallback fixed)
* (ipod86) fix: record button moved to rightmost position in grid tiles and fullscreen panel
* (ipod86) fix: camera filter button no longer changes appearance when cameras are hidden
* (ipod86) fix: header z-index lifted so the camera filter popover renders above the main content area
* (ipod86) fix: drive object pruning regex corrected; stale drive entries are now properly removed
* (ipod86) fix: deleted recordings no longer reappear after the next adapter poll
* (ipod86) fix: extend video format error message with AgentDVR auto-convert hint in all 11 languages
* (ipod86) fix: FLV stream and grid tile layout scaling corrections
* (ipod86) fix: Italian i18n string with apostrophe broke page JS (changed to escaped variant)
* (ipod86) fix: detect AgentDVR "Command not found" response on delete and show proper error message

### 0.4.3 (2026-07-19)
* (ipod86) fix: switch polling loop from setInterval to setTimeout to prevent concurrent poll runs
* (ipod86) fix: httpTimeoutMs=0 now correctly clamps to 1000ms instead of falling back to default
* (ipod86) fix: go2rtcEnabled config flag is now honored in fetchGo2rtcStreams
* (ipod86) fix: remove unused isSupportedLang export from widget-i18n

### 0.4.2 (2026-07-12)
* (ipod86) fix: FLV stream proxy now sends Authorization header (HTTP 401 with AgentDVR auth)
* (ipod86) fix: dashboard camera online status was read from wrong state path (data.online → status.online)
* (ipod86) fix: MP4/FLV stream label was hardcoded German — now translated in all 11 languages
* (ipod86) fix: admin UI default values now match io-package.json (dashTagPosition, widgetAnzahl, widgetBorderRadius)
* (ipod86) fix: go2rtcEnabled flag now respected when loading streams in admin UI
* (ipod86) fix: enableStreamProxy missing from native defaults in io-package.json

### 0.4.1 (2026-07-12)
* (ipod86) fix: overview tile links to ioBroker host; go2rtc URL shown only when enabled

### 0.4.0 (2026-07-12)
* (ipod86) feat: optional MJPEG and snapshot stream proxy through ioBroker (browser needs only one connection to ioBroker, not directly to AgentDVR)

### 0.3.0 (2026-07-06)
* (ipod86) feat: add scheduleOn/Off and detectorOn/Off control buttons for cameras and microphones
* (ipod86) feat: add sensitivityMin, sensitivityMax, sensitivityGain level states for cameras (0–100)
* (ipod86) feat: add audio_mp3 and audio_ogg URL states for microphones
* (ipod86) fix: restrict objectDetectOn/Off and snapshot buttons to cameras (ot=2) only
* (ipod86) feat: inline flv.js into dashboard HTML — no external file required
* (ipod86) fix: preserve FLV stream aspect ratio after tab visibility change (all three player call sites)
* (ipod86) feat: collapsible tag filter row on recordings and timeline pages
* (ipod86) feat: native browser fullscreen button in live view modal with correct aspect ratio
* (ipod86) feat: live view modal header auto-hides after 3 s of inactivity; reappears on mouse/touch
* (ipod86) fix: add fsEnter, fsExit, filterByLabel, timelineView, closePanel i18n keys in all 10 languages

[Older changelog entries in CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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