---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ai-assistant/README.md
title: ioBroker.ai-助手
hash: eLCRLymT6+1j/OAxF3jn8OqXnUitr9qaI0KB/YSlvXM=
---
![标识](../../../en/adapterref/iobroker.ai-assistant/admin/ai-assistant.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ai-assistant.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ai-assistant.svg)
![安装数量](https://iobroker.live/badges/ai-assistant-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ai-assistant-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.ai-assistant.png?downloads=true)

# IoBroker.ai-assistant
**测试：**![测试和发布](https://github.com/ToGe3688/ioBroker.ai-assistant/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
ioBroker AI 助手适配器在您的 ioBroker 系统中运行智能助手。
该助手可用于与您的 ioBroker 系统交互，设置基于时间的指令、基于触发器的指令以及调用自定义函数。
该助手可以配置来自不同提供商（例如 OpenAI、Anthropic、Perplexity、OpenRouter）的不同语言模型，或自定义/自托管模型。
该助手可用于自动执行任务、控制您的智能家居或提供信息。

＃＃ 特征
- 个性化您的助手的姓名和个性
- 列出、读取和写入 ioBroker 状态
- 设置超时和 cronjobs 来运行基于时间的指令
- 在 ioBroker 状态上设置触发器，当条件满足时运行指令
- 使用您自己的数据和逻辑定义自定义函数
- 使用管理选项卡与您的私人助理聊天

## 支持的提供商
- **Anthropic**: [anthropic.com](https://anthropic.com)
- **OpenAI**：[openai.com](https://openai.com)
-**Perplexity**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)
- **Deepseek**：[deepseek.com](http://deepseek.com/)
- **自定义/自托管模型**（例如 LM Studio、LocalAI）

---

## 快速入门
1.安装适配器。
2. 设置提供商（例如，OpenAI、Anthropic、Perplexity、OpenRouter）并获取 API 令牌。
3. 使用 API 令牌配置适配器。
4.选择您想要用于助手的模型。
5. 在“对象”选项卡下添加一些可供助手使用的 ioBroker 状态。
6.通过向助手的“text_request”状态发送文本请求并从“text_response”状态接收响应，开始与您的助手进行通信，或者使用标有“助手”的自定义管理选项卡。

---

## 测试模型
以下型号已通过该适配器测试，并且运行良好：

- 克劳德 3.5 十四行诗（人择）
- GPT-4O-MINI（OpenAI）
- meta-llama/llama-3.3-70b-instruct（OpenRouter）
- deepseek/deepseek 聊天 (OpenRouter)
- x-ai/grok-beta（OpenRouter）
- perplexity/llama-3.1-sonar-huge-128k-online（困惑）
- perplexity/llama-3.1-sonar-large-128k-online（困惑）

---

＃＃ 配置
＃＃＃ 助手
使用以下设置来设置您的助手：

| **设置** | **描述** |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| **姓名** | 您的助手的姓名。|
| **模型** | 选择您的助手应该使用的 LLM 模型（在提供商下配置）。|
| **个性** | 描述一下你的助手的个性。|
| **语言** | 选择您的助手应该使用的语言（目前仅支持英语/德语）|
| **调试 / CoT 输出** | 当激活时，助手使用的内部想法和过程被写入 text_response 状态。|
| **消息历史记录** | 包含之前的消息（用于类似聊天机器人的行为）。对于一次性工具，请设置为 0，以最大限度地减少令牌使用。|
| **温度** | 控制响应的创造力/一致性。|
| **最大令牌数** | 限制响应令牌数。|
| **重试延迟** | 请求失败时重试之间的延迟 |
| **最大重试次数** | 每个请求的最大重试次数。|

---

### 对象
### 警告：请谨慎授予助手访问权限的状态，因为它可以读取和写入它有权访问的所有状态。
设置 ioBrokers 对象并声明助手应该有权访问。

**注意：导入或添加对象时，请确保仅添加可直接控制或包含要读取的值的类型为“状态”的数据点！**

| **设置** | **描述** |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **从 Enum.Rooms 导入** | 从 ioBroker 中排序的 enum.rooms 导入所有状态。（覆盖所有先前设置的对象！）|
| **排序** | 所有具有相同排序字段的对象将按组（例如一个房间）呈现给助手|
| **名称** | 使用描述性名称，以便助手了解对象的功能 |
| **对象** | ioBroker 状态的 ID |

---

### 函数
设置可供助手使用的自定义函数。
您的自定义函数必须在写入`State (Request)`之后，将响应写入您在`State (Response)`字段中定义的状态。
结果可以是任何您喜欢的格式（例如 JSON、纯文本），只需确保助手能够理解即可。
提示：您可以使用[AI-Toolbox适配器](https://github.com/ToGe3688/ioBroker.ai-toolbox)将您的助手与自定义 AI 工具集成。

**注意：如果您在 60 秒内没有对 `State (Response)` 字段做出回应，函数调用将失败！**

| **设置** | **描述** |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **排序** | 所有具有相同排序字段的对象将按组（例如一个房间）呈现给助手|
| **名称** | 为自定义函数使用描述性名称 |
| **描述** | 描述你的函数的作用，以便助手了解何时调用它 |
| **状态（请求）** | 函数调用时，助手会将这个状态以字符串形式写入 |
| **状态（响应）** | 助手将读取此状态以获取函数的响应 |

---

### 法学硕士课程提供者
单独配置每个 AI 提供程序：

#### 人择
| **设置** | **描述** |
| ------------- | ------------------------------- |
| **API 令牌** | 输入您的 Anthropic API 令牌。|
| **模型** | 指定要使用的模型。|

OpenAI
| **设置** | **描述** |
| ------------- | ---------------------------- |
| **API 令牌** | 输入您的 OpenAI API 令牌。|
| **模型** | 指定要使用的模型。|

困惑
| **设置** | **描述** |
| ------------- | -------------------------------- |
| **API 令牌** | 输入您的 Perplexity API 令牌。|
| **模型** | 指定要使用的模型。|

OpenRouter
| **设置** | **描述** |
| ------------- | -------------------------------- |
| **API 令牌** | 输入您的 OpenRouter API 令牌。|
| **模型** | 指定要使用的模型。|

＃＃＃＃ 风俗
| **设置** | **描述** |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **推理服务器 URL** | 自定义/自托管推理服务器的 URL。|
| **推理服务器的 API 令牌** | 您的推理服务器的 API 令牌。|
| **模型** | 指定要使用的模型。|
| **注意** | 确保符合常见的 AI LLM API 标准（例如，LM Studio API）。|

---

＃＃ 用法
### 简单对话
您可以通过向`text_request`状态发送文本请求并接收来自`text_response`状态的响应来与您的助手进行交互。

函数调用
助手可以调用所有可用的函数。它根据文本请求确定要调用的函数。如果您启用了“调试/CoT 输出”，则可以在`text_response`状态下看到助手的内部进程。

状态交互
助手可以同时列出、读取和写入多个 ioBroker 状态。您可以使用`Objects`选项卡来定义助手可以访问哪些状态。

基于时间的指令
助手可以设置相对时间指令的超时和特定时间的 cronjob。cronjob 将在助手对象树的`Cronjobs`下列出。
超时只是暂时的，在执行超时或重启适配器后将被移除。
触发超时或 cronjob 时，助手将被唤醒并执行指令。

####基于触发器的指令
助手可以在 ioBroker 状态上设置触发器，并设置可选条件，当满足条件时运行指令。触发器将在助手对象树的`Triggers`下列出。
触发后，助手将被唤醒并执行指令。

自定义函数
助手可以调用您在`Functions`选项卡中定义的自定义函数。助手会将请求写入`State (Request)`字段，并期望在`State (Response)`字段中收到响应。

函数链
该助手可用于将多个函数串联起来。例如，您可以设置一个 cronjob，执行时会启动 ioBroker 状态检查，然后根据结果调用自定义函数。

#### 清除聊天记录
有时重置聊天记录会很有用。您可以请求助手清除历史记录。这将从助手的内存中删除所有之前的消息。（例如 `Clear history` 或 `Forget the previous messages`）

＃＃ 附加信息
＃＃＃ 统计数据
统计数据已为您的助手记录，可在`Statistics` 对象树中查看。

| **数据点** | **描述** |
| -------------------------------- | ------------------------------------------------------- |
| **.statistics.lastRequest** | 最后一个请求的时间戳。|
| **.statistics.requestCount** | 向助手发送的请求数量 |
| **.statistics.messages\*** | 消息历史记录的 JSON 数组（如果消息历史记录 > 0）。|
| **.statistics.clear_messages\*** | 清除消息历史记录按钮。|
| **.statistics.tokens_input** | 使用的输入令牌总数。|
| **.statistics.tokens_output** | 使用的总输出令牌数。|

＃＃ 发展
此适配器仍在开发中，可能存在错误。请报告您遇到的任何问题。

### 调试
在 ioBroker 管理界面中将日志级别设置为 `debug` 以获取详细日志。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.4 (2025-06-05)
* (@ToGe3688) Added tab to interact with the assitant in the admin adapter
* (@ToGe3688) Added a custom timeout parameter
* (@GermanBluefox) Corrected using of the states with the multi-language names

### 0.1.3 (2025-29-01)
* (@ToGe3688) Added support for Deepseek as api provider
* (@ToGe3688) Better display of providers in model selection for admin config
* (@ToGe3688) Fixed object hirarchy 
* (@ToGe3688) Fixed state roles
* (@ToGe3688) Fixed onStateChange handler

### 0.1.2 (2025-12-01)
- (@ToGe3688) Better error handling for Provider APIs
- (@ToGe3688) Anthropic API Versioning

### 0.1.1 (2025-12-01)

- (@ToGe3688) Better error handling for Provider APIs

### 0.1.0 (2025-04-01)

- (@ToGe3688) Beta Release

### 0.0.3 (2024-31-12)

- (@ToGe3688) Improved handling of malformed model responses
- (@ToGe3688) Fixed a bug where the names of the states were not provided to the assistant

### 0.0.2 (2024-30-12)

- (@ToGe3688) Fixed Bug in OpenAI Provider

### 0.0.1 (2024-30-12)

- (@ToGe3688) initial release

## License

The MIT License (MIT)

Copyright (c) 2024-2025 ToGe3688 <toge3688@gmail.com>

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