---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.assistant-satellite/README.md
title: ioBroker.assistant-satellite
hash: SMwPC8GqLB2hN4xQpJ0Eh20mFqyjz5cNlmBdTZ/frcE=
---
<img src="admin/assistant-satellite.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant-satellite
ioBroker 适配器，将运行它的主机变成 [`ioBroker.assistant`](https://github.com/ioBroker/ioBroker.assistant) 的**语音卫星**：它检测唤醒词，将麦克风流传输到助手的语音服务器并播放语音回复。

它是对独立软件包 [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) 的一个轻量级封装——当卫星设备已经运行 ioBroker 时（通过管理界面进行配置和状态检查），请使用此适配器。在没有 ioBroker 的裸机树莓派上，请直接使用独立软件包 (`npx @iobroker/assistant-satellite`)。

＃＃ 要求
主机上的麦克风和扬声器
- 音频后端（自动选择，或在**音频后端**下强制选择）：
- **Linux** → `alsa-utils`：`arecord` 用于录制，`aplay` 用于播放（`sudo apt install alsa-utils`）
- **Windows / macOS** → **ffmpeg**：`ffmpeg` 用于录制，`ffplay` 用于播放——您需要**这两个**二进制文件，

可通过 `PATH`（见下文）访问。仅包含 `ffmpeg.exe` 的最小构建版本是不够的。

- 一个正在运行的 `ioBroker.assistant` 实例（默认情况下，卫星通过 ioBroker 消息总线与其通信）

### 将 ffmpeg / ffplay 添加到 PATH 环境变量中（Windows、macOS）
适配器按名称以 `ffmpeg` 和 `ffplay` 开头，因此存放它们的文件夹必须位于 ioBroker 运行所用账户的 `PATH` 目录下，而不仅仅是您自己的终端目录下：

- **Windows** — 获取完整版本（例如 [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) 或

将包含 [巴特比恩](https://github.com/BtbN/FFmpeg-Builds/releases) 的文件解压到例如 `C:\FFMPEG` 目录，然后将包含 `ffmpeg.exe` 和 `ffplay.exe` 的文件夹添加到系统 `Path` 中（*系统属性 → 高级 → 环境变量 → 系统变量 → 路径*）。

在新 shell 中验证：`where ffmpeg` 和 `where ffplay`。

- **macOS** — `brew install ffmpeg`（将两者都安装到 Homebrew 的 `bin` 目录中）；使用以下命令验证

`which ffmpeg ffplay`。

一个进程只能看到它在启动时继承的 `PATH`，因此**更改后请重新启动 ioBroker（服务或主机）**——否则实例日志将一直显示 `ffmpeg failed: spawn ffmpeg ENOENT — is it installed? (install ffmpeg)`。

＃＃ 设置
安装适配器，添加实例，然后进行配置。设置项已分组：

**ioBroker.assistant 服务器**

- **助理实例** — 选择此卫星与之通信的正在运行的 `ioBroker.assistant` 实例
- **传输方式** — **ioBroker**（通过消息总线传输音频，无需UDP端口，集中式STT/TTS — *推荐*）

或**UDP**（Hannah 风格的音频流，兼容 ESP）。使用 UDP 时，请设置**本地监听端口**（默认值为 `7776`），如果自动选择了错误的接口，则需要设置**主机 IP 地址覆盖**。

**身份**

- **房间** — 将卫星分配到某个房间

**声音的**

- **音频后端** — `Auto` / `ALSA` / `ffmpeg`
- **麦克风/扬声器设备** — 例如，树莓派上的 `plughw:2,0`（ALSA）或 dshow 名称/avfoundation 索引

(ffmpeg)；`default` = 系统默认值。设备列表从此主机读取（实例必须正在运行）。

在**Windows / macOS** 系统上，只能枚举*捕获*设备，并且`ffplay`始终播放到系统的默认输出设备——请在操作系统声音设置中选择扬声器，而不是在此处选择。

- **ALSA 混音器控制** — 可选；仅供 `volume`/`mute` 状态使用（见下文）。留空 = 自动检测

在发言者卡片上设置一个名称（例如 `PCM`、`Master`、`Speaker`），以防选错。仅限 ALSA。

唤醒词

- **唤醒词模型** — 内置的 `hey_jarvis`（默认）、`alexa`、`hey_mycroft`、`hey_rhasspy` 或 URL /

本地 `.onnx` 路径。您最多可以配置**三个**唤醒词——卫星设备会根据其中任何一个触发。

- **阈值** — 0–1，数值越低越敏感。
- **上传自定义唤醒词模型** — 上传一个独立的 `.onnx` 文件（外部数据 `.onnx` +

如果不支持 `.onnx.data`，请在上面的唤醒词字段中选择它。使用内置的**唤醒词测试**实时检查检测情况（`test.*` 状态会在运行时报告分数/峰值/麦克风电平）。

- **后续对话** — 回答之后，保持麦克风开启一段时间，以便您可以进行简短的**后续对话**。

继续（“……还有厨房”）或回答澄清问题，而无需再次说出唤醒词。

**录音（高级）** — 静音检测和录音长度调整：**静音 RMS 阈值**、**静音（毫秒）**、**最小/最大录音（毫秒）**和**预缓冲块**。

首次启动时，OpenWakeWord 模型会下载到实例数据目录中。然后说出唤醒词 → 说话 → 播放答案。状态 `status` 显示 `idle` / `listening` / `processing` / `speaking`，而 `info.connection` 则反映卫星是否已向助手注册。

音量、静音、勿扰模式
这些可写状态同样适用于答案、公告和提示音：

- **`音量`** — 0–100 %
- **`静音`** — 使扬声器静音
- **`dnd`** — 请勿打扰：**公告将被屏蔽**（您对自己问题的回复仍会播放）

`volume` 和 `mute` 驱动宿主机的混音器。启动时，情况则相反：适配器会将宿主机的当前设置读取到这两个状态中，因此启动实例不会改变机器的播放音量。之后对状态的每次写入都会应用到混音器：

- **Linux (ALSA)** — 扬声器卡的混音器。控制选项会自动检测，或者也可以手动设置。

**ALSA 混音器控制**，如果选错了。

- **Windows** — **默认播放设备**（Core Audio，通过驱动）的主音量/静音

内置 PowerShell（无需额外安装）。这就是 `ffplay` 发挥作用的地方，即与 Windows 声音设置中的滑块相同，因此它应用于**整个系统**，而不仅仅是卫星。

- **macOS** — 未连接：`dnd` 有效，`volume` / `mute` 无效。

**优先公告：**如果公告文本（通过助理的 `tts.text` / `satellites.<id>.tts` 发送）以 **`!`** 开头，则 `!` 将被移除，并且即使在 DND 开启时也会播放 **例如 `!Water leak in the basement`。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-08-19)
* (@GermanBluefox) `volume` / `mute` now work on Windows too (default playback device via Core Audio)
* (@GermanBluefox) On start the current host volume/mute is adopted into the states instead of being overwritten
* (@GermanBluefox) Documented the `ffmpeg` / `ffplay` PATH requirement for Windows and macOS

### 0.1.2 (2026-08-03)
* (@GermanBluefox) Updated packages

### 0.1.0 (2026-07-12)
* (@GermanBluefox) Support of multiple wake-words
* (@GermanBluefox) Added test of wake-words
* (@GermanBluefox) Connect to the assistant by instance selection with a choice of transport (ioBroker message bus or UDP)
* (@GermanBluefox) Added selectable audio backend (auto / ALSA / ffmpeg) and room assignment
* (@GermanBluefox) Added follow-up conversation mode (continue without repeating the wake word)
* Added `volume` / `mute` / `dnd` states (ALSA mixer); announcements starting with `!` bypass Do-Not-Disturb

### 0.0.2 (2026-07-05)
* (@GermanBluefox) Initial commit

## License

MIT License

Copyright (c) 2026 Denis Haev <dogafox@gmail.com>

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