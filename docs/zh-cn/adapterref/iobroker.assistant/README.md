---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: +M9xvebDrMe2+Ds0BqWbBqY1vbMJvQIbDm0E9QFgDDc=
---
<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant
一个基于 LLM 的 ioBroker 助手。用自然语言提问，助手可以读取或控制**任何 ioBroker 状态**——它使用 LLM 通过**工具调用**原生 ioBroker API，因此没有僵化的规则引擎，也没有虚拟设备树。

状态：**早期概念验证阶段。** 文本输入 → 回答输出。音频（卫星语音、语音合成/文本转语音）和设备端唤醒词功能计划下一步推出（参见路线图）。

## 今日有效方法
- 提供商：**OpenAI**（以及通过基本 URL 兼容 OpenAI 的端点）或 **Anthropic（Claude）**。
- LLM 可以调用这些工具，所有这些工具都由原生适配器 API 提供支持：
- `list_rooms`、`list_functions` — 读取 `enum.rooms` / `enum.functions`
- `find_states({ room?, func?, query? })` — 查找状态 + 当前值
- `get_state({ id })` — 读取一个值
- `set_state({ id, value })` — 控制设备（可在设置中禁用）
- 通过两种状态进行文本界面交互：
- 将您的问题写到 `assistant.0.text.request`
- 读取来自 `assistant.0.text.response` 的答案
- 或者从脚本中： `sendTo('assistant.0', 'ask', { text: 'Wie Warm ist es im Wohnzimmer?' }, cb)`

＃＃ 配置
在适配器管理界面（实例 → 助手 → ⚙）：

| 背景 | 含义 |
|--------------------------|---------------------------------------------------|
| 提供商 | `openai` 或 `anthropic` |
|型号|例如`gpt-4o-mini`、`gpt-4o`、`claude-sonnet-4-6` |
| API密钥 | 您的提供商API密钥 |
| 基本 URL | 可选的端点覆盖（例如 Groq） |
| 允许控制状态 | 如果关闭，则助手为只读 |
| 系统提示 | 角色/行为 |

## 语音卫星（汉娜）
该适配器运行一个UDP语音服务器，支持**Hannah**卫星协议（`0x01` 控制 / `0x02` 麦克风音频 / `0x03` 文本转语音），因此现有的Hannah Pi/ESP卫星可以直接与其通信。STT → LLM → TTS的转换在适配器内部运行；卫星仅负责捕获音频、检测唤醒词并播放回复。

**在适配器端：** 打开“语音”选项卡，勾选“启用语音服务器”，选择 STT/TTS 提供商及其凭据，保留端口（默认为 `7775`）。实例启动时，日志显示：

```
Voice server listening on UDP 7775
```

识别的文本和回复也出现在 `assistant.0.text.request` / `.text.response` 中，来源位于 `assistant.0.text.querySource` 中（卫星名称，`chat`，或为空以进行直接状态写入）。

**公告/TTS：** 向 `assistant.0.tts.text` 发送消息可在**所有**卫星上播放，或向 `assistant.0.satellites.<id>.tts` 发送消息可在**单个**卫星上播放。该值将以文本形式朗读（通过配置的 TTS 引擎），或者——如果它是音频文件的 URL/路径（`.mp3`/`.wav`/…）——则播放音频。

> **播放音频文件需要在主机（Windows 和 Linux）上安装 [ffmpeg](https://ffmpeg.org/)： > Linux → `sudo apt install ffmpeg`；Windows → 安装 ffmpeg 并将其添加到 `PATH`。

> 纯文本 TTS 不需要 §§LLLLL_0§§，只有音频文件播放（mp3/wav 等）才需要。

### 启动一个指向此适配器的 Hannah 卫星
将音频速率与您的设备匹配（`--sample-rate` = 麦克风，`--tts-rate` = 扬声器）；使用 `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"` 列出设备和支持的速率。

Hannah 卫星通过 MQTT 发现功能定位服务器，因此需要一个可访问的代理服务器和一个保留的发现消息。请将 `--host` 显式指向 ioBroker 主机：

```bash
# 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

# 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

成功时，卫星日志中会显示 `Registrierung bestätigt (ACK empfangen)`，适配器日志中会显示 `Satellite registered: wohnzimmer`。然后说出唤醒词 → 发出语音 → 听到应答。

### 没有 MQTT 代理
Hannah 卫星客户端默认始终连接到 MQTT（即使使用 `--host`），如果无法连接到代理服务器则退出。要**完全无代理运行**，请跳过 `satellite.py` 和 `_resolve_hannah_address()` 中的该调用：

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

注册、音频和文本转语音 (TTS) 都通过 UDP 协议运行，因此只会丢失（可选的）MQTT 状态报告。

然后只需从 `--host` 开始（无需 `--broker`）：

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### 原生 Node.js 卫星
提供了一个独立的**Node.js 子程序**——无需 ioBroker，也无需 MQTT 代理。在配备麦克风和扬声器的树莓派（或任何 Linux/Windows/macOS 设备）上运行：

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

它在设备上运行唤醒词（OpenWakeWord），并将音频流传输到此适配器的语音服务器。有关设置，请参阅[`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite)，有关诊断信息，请参阅`check`，有关信息，请参阅`install`（systemd 服务）。

### 怀俄明州终点（实验性）
[怀俄明州](https://github.com/rhasspy/wyoming) 是 Home Assistant / Rhasspy 项目的开放语音协议（基于 **TCP** 的 JSONL 事件），由 `wyoming-satellite`、**Home Assistant Voice PE** puck 和 **ESPHome** 语音设备使用。

在“语音”选项卡中启用“同时接受 Wyoming 客户端 (TCP)”（默认端口 `10700`）。然后，适配器会公开一个 Wyoming 服务器，该服务器桥接到同一管道：`audio-start`/`audio-chunk`/`audio-stop` → STT → 应答 → TTS 流式传输回 `audio-*`（加上 `transcript` 事件）；`describe` → `info`；`synthesize` → TTS。

协议帧结构已通过单元测试，但与实际 HA Voice PE / `wyoming-satellite` 的互操作性仍处于**实验阶段**——请报告哪些功能有效。使用与 UDP 语音服务器相同的 STT/TTS 提供商。

## 路线图
1. **文本助手（已完成）** — LLM + 通过 ioBroker 状态调用工具。
2. **快速路径** 用于常见命令（开/关/定时器），无需 LLM 往返。
3. **TTS / STT 引擎**（Polly / Azure / OpenAI / AWS Transcribe）作为适配器模块 + 配置。
4. **卫星端点** — UDP 音频 + MQTT 控制，因此 ESP/Pi 卫星可以直接与适配器通信。
5. **唤醒词** — 通过运行在设备上的 ioBroker 进行训练/管理。
6. **怀俄明服务器端点** — 接受 Home Assistant Voice PE / `wyoming-satellite` / ESPHome 语音设备。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.5 (2026-08-19)
* (@GermanBluefox) Corrected credentials

### 0.1.3 (2026-08-15)
* (@GermanBluefox) Updated packages

### 0.1.2 (2026-08-03)
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