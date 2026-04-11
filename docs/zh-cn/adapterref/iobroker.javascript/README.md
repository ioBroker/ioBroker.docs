---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/README.md
title: ioBroker.javascript
hash: J/NduS3mebPM8x+xOt29aPlclcC4wvljbu1VFGh80B0=
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# IoBroker.javascript
＃＃ 目录
- [Blockly](blockly.md)
- [用法](usage.md)

## AI 代码生成器 - 支持自定义 API 端点
集成的AI代码生成器不仅支持OpenAI API，还支持任何与OpenAI兼容的API端点。这使得可以使用其他API提供商，例如：

- **Google Gemini**（免费提供，推荐）
- **DeepSeek**（非常便宜）
- **OpenRouter**（多运营商网关）
- **Ollama**（本地LLM）
- **LM Studio**（本地LLM）
- **人为因素**（通过与 OpenAI 兼容的代理）
- 任何其他具有与 OpenAI 兼容的 `/v1/chat/completions` 端点的提供商

### 推荐供应商
#### Google Gemini（免费，推荐）
Google 提供慷慨的免费配额，并具有与 OpenAI 兼容的端点——非常适合 ioBroker 脚本生成：

| 型号 | 每分钟请求数 | 每日请求数 | 质量 |
|--------|-------------|-------------|----------|
| Gemini 2.5 闪存 | 10 | 500 | 非常适合编码 |
|双子座2.5 Pro | 5 | 25 | 25优秀|
| Gemini 2.0 闪光灯 | 15 | 1500 | 良好 |

家具：

1. 获取您的免费 API 密钥：https://aistudio.google.com/apikey
2. 将**基本 URL** 设置为 `https://generativelanguage.googleapis.com/v1beta/openai`
3. 选择一款 Gemini 型号（例如 `gemini-2.5-flash`）

#### DeepSeek（价格非常实惠）
DeepSeek 以极低的成本（每次请求约 0.001 欧元）提供出色的代码生成服务：

- 获取 API 密钥：https://platform.deepseek.com/
- 将 **Base-URL** 设置为 `https://api.deepseek.com/v1`
- 推荐模型：`deepseek-chat`

#### 本地模特（Ollama / LM Studio）
本地型号在独立的硬件上运行，无需连接互联网。

**最低要求：14 位数参数模型**（例如，`qwen2.5-coder:14b`）。较小的模型（7 位数/9 位数）会生成不可靠的代码，并导致错误的 API 调用。建议使用至少配备 12GB 显存的 GPU（例如，RTX 3060）来运行 14 位数模型。

经过测试并推荐的型号：

- `qwen2.5-coder:14b` - 代码质量良好，可在 12GB 显存上运行
- `qwen2.5-coder:32b` - 画质更佳，需要 24GB 以上显存

家具：

- **Ollama**：将**基本 URL**设置为 `http://localhost:11434/v1`，API 密钥留空。
- **LM Studio**：将**基本 URL**设置为 `http://localhost:1234/v1`，API 密钥留空。

**注意：** OpenAI API 的免费版本（ChatGPT）不再提供用于代码生成的 API 访问权限。建议使用 Google Gemini（免费）或 DeepSeek（价格非常低廉）作为替代方案。

＃＃＃ 配置
“AI 设置”下的适配器设置包含每个提供商的 API 密钥字段：

| 设置 | 描述 |
|-------------|-------------|
| **ChatGPT API 密钥** | OpenAI 的 API 密钥 (platform.openai.com) |
| **Anthropic API 密钥** | Claude (console.anthropic.com) 的 API 密钥 |
| **Gemini API 密钥** | Google Gemini (aistudio.google.com) API 密钥 |
| **DeepSeek API 密钥** | DeepSeek 的 API 密钥 (platform.deepseek.com) |
| **自定义 API 基本 URL** | 自定义提供商的基本 URL（例如，Ollama 的基本 URL 为 `http://localhost:11434/v1`） |
| **自有 API 密钥** | 您自有提供商的可选 API 密钥（Ollama 不需要） |

只需输入您选择的供应商的密钥即可。每个供应商都有自己的**测试**按钮。

### 测试 API 连接
每个提供商的 API 密钥字段旁边都有一个“测试”按钮。测试内容如下：

- 连接到提供商的 API 端点
- 验证 API 密钥
返回可用模型的数量

### 模型动态加载
在脚本编辑器中打开 AI 代码生成器对话框时，系统会自动从配置的 API 端点检索可用模型。模型下拉列表是动态填充的，没有固定的模型列表。

### 错误处理
如果 API 端点无法访问或返回错误，则会显示用户友好的消息：

- 连接错误（端点无法访问）
- API 密钥无效 (401)
访问被拒绝（403）
未找到模型（404）

如果模型检索失败，则会显示一个**重试**按钮，允许在不关闭对话框的情况下再次尝试。

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->
### WORK IN PROGRESS
* (Eistee82) Added OID display mode toggle for Blockly editor: 4 display modes (Name, Name path, State ID, Full ID) with toolbar dropdown, context menu, optional object icons, and translations in 11 languages
* Per-provider test buttons in adapter config (OpenAI, Anthropic, Gemini, DeepSeek, Custom API)
* Optional API key field for custom base URL providers (e.g. Ollama without auth)
* Provider icons on test buttons and in model dropdown
* Human-readable HTTP error messages with API response details
* Two-step AI code generation: plan first, then generate code
* Collapsible plan view in AI code generator UI
* Status display during generation ("Planning..." / "Generating code...")
* Optimized prompts with code examples for better results with small local models
* Compact API reference (docs-compact.md) for reduced context usage
* Disable reasoning/thinking for local models (reasoning_effort: none)
* TODO_DEVICE_ID placeholder when a required device is not in the device list
* Node 25 compatibility: replaced deprecated rmdirSync with rmSync in build tasks
* Flexible result area height in AI code generator (no extra scrollbar)
* Added translations for all 11 languages
* (@GermanBluefox) Added support for plain import/export
* (@GermanBluefox) Correcting error in configuration
* (@GermanBluefox) disallow writing into node_modules folder by scripts
* (@GermanBluefox) Correcting start of the script more than one time if restart is triggered
* (@GermanBluefox) All delayed writings are stopped by the script stop
* (@GermanBluefox) Added check if a script has been modified by another user/window
* (@GermanBluefox) Make the instance number more prominent

### 9.1.1 (2026-03-19)
* (GermanBluefox) Small GUI optimizations
* Added support for custom OpenAI-compatible API endpoints (e.g. Ollama, LM Studio, Google Gemini, DeepSeek, OpenRouter)
* Added configurable base URL in adapter settings
* Models are now fetched dynamically from the configured API endpoint
* Added the "Test API connection" button in adapter settings
* Added error handling with user-friendly messages for unreachable providers
* Added retry functionality for failed model loading
* All API calls (models + chat) are proxied server-side to avoid CORS issues with local providers
* Strip LLM thinking artifacts from responses (for local models like Ollama)

### 9.0.18 (2026-01-11)
* (@GermanBluefox) Corrected an error message with `lastSync`
* (@klein0r) Corrected JavaScript filter

### 9.0.17 (2025-12-14)
* (@GermanBluefox) Added possibility to encrypt scripts with password (only for vendors)

### 9.0.11 (2025-07-29)
* (@GermanBluefox) Corrected the rule editor if the condition is empty
* (@GermanBluefox) Corrected types for TypeScript

### 9.0.10 (2025-07-27)
* (@klein0r) Added Blockly block to format a numeric value
* (@GermanBluefox) Fixing some blocks in blockly: cron, time
* (@GermanBluefox) Added a new block: "unconditional return"
* (@GermanBluefox) Type definitions for TypeScript were updated
* (@GermanBluefox) Corrected bug with deleting of sub-folders

## License
The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.