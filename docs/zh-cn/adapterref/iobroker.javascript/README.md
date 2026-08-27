---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/README.md
title: ioBroker.javascript
hash: tZYvssdlwleSk0flmi6y6kp1HOZoXjD2MgWlOS3mVBA=
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# IoBroker.javascript
＃＃ 目录
- [Blockly](blockly.md)
- [用法](usage.md)
- [JavaScript 参考](../en/javascript.md)（仅提供英文版本）
- [升级指南](../en/upgrade-guide.md)（仅提供英文版本）

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
本地模型在独立的硬件上运行，无需访问互联网。

**最低要求：14 位数参数模型**（例如，`qwen2.5-coder:14b`）。较小的模型（7 位数/9 位数）会生成不可靠的代码，并导致错误的 API 调用。建议使用至少配备 12GB 显存的 GPU（例如，RTX 3060）来运行 14 位数模型。

经过测试并推荐的型号：

- `qwen2.5-coder:14b` - 代码质量良好，可在 12GB 显存上运行
- `qwen2.5-coder:32b` - 画质更佳，需要 24GB 以上显存

家具：

- **Ollama**：将 **Base-URL** 设置为 `http://localhost:11434/v1`，API 密钥留空。
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

所有 API 密钥字段均以密码字段的形式显示（已屏蔽）。您只需输入所需提供商的密钥。每个提供商都有其专属的“测试”按钮。

### API密钥安全
API 密钥由 ioBroker 平台提供的两层保护措施确保安全：

1. **`encryptedNative`** — 密钥在写入对象数据库之前会自动使用系统密钥进行加密。数据库转储或对象备份不再包含明文密钥。
2. **`protectedNative`** — 密钥永远不会传输到管理界面或外部适配器。只有 `javascript` 实例本身可以通过 `this.config` 读取它们（ioBroker 运行时会透明地解密它们）。

因此，AI聊天面板、在线补全以及所有其他前端组件不再直接访问键值。取而代之的是，每个AI请求都通过`sendTo`发送到适配器，后端会插入相应的键值。

```
Frontend                      Backend (this.config, entschlüsselt)
────────                      ─────────────────────────────────────
sendTo('chatCompletion', {    →   wählt Provider → nimmt gptKey/claudeKey/…
    provider: 'openai',           → schickt HTTP-Request an Anbieter
    model: 'gpt-4o',              → liefert Antwort zurück
    messages: [...]
})
```

还有一个单独的 `sendTo` 命令可用于显示该消息：

| 命令 | 有效载荷 | 响应 |
|--------|---------|---------|
| `getAvailableAiProviders` | `{}` | `{ providers: [{ provider: 'openai' }, { provider: 'custom', baseUrl: '…' }, …] }` |

响应仅告知前端已配置**哪些**提供商，实际密钥永远不会包含在内。这样，编辑器中就能正确显示提供商图标，并且模型下拉菜单也能正确填充，而无需将密钥加载到浏览器中。

**升级注意事项：** 从旧版本升级后，现有（未加密）密钥在首次保存适配器设置之前仍然有效。保存时，运行时会对这些值进行加密。如果升级后某个密钥显示为空，只需重新输入并保存即可。

### 测试 API 连接
每个提供商的 API 密钥字段旁边都有一个“测试”按钮。有两种情况：

1. **使用表单值进行测试** — 在设置对话框中输入或更改键值后，“测试”按钮会立即使用当前表单值（该值在保存前存储在浏览器本地）。这样就可以在保存新键值之前对其进行测试。
2. **使用存储的键进行测试** — 如果测试是从没有表单值的上下文中调用的（例如，在脚本编辑器中检索模型时），后端会根据所选的提供程序通过 `this.config` 解析键。

测试：

- 连接到提供商的 API 端点
- 验证 API 密钥
返回可用聊天模型的数量

测试按钮图标以内联 SVG 数据 URI 的形式嵌入，并带有 `fill="currentColor"`。这意味着它们的颜色会自动跟随当前主题（浅色/深色模式）。

### 模型动态加载
在脚本编辑器中打开 AI 代码生成器对话框时，系统会自动从每个已配置的提供程序中检索可用模型。模型下拉列表是动态填充的，没有固定的模型列表。

#### 筛选非聊天模特
OpenAI、Anthropic、Gemini、DeepSeek 和自定义端点（Ollama/LM Studio/OpenRouter）返回的模型列表中包含许多不适用于聊天自动补全的模型。适配器会自动过滤掉这些模型，以便下拉菜单中仅显示适用于 ioBroker 脚本生成的模型。

以下类别除外：

| 类别 | 示例关键词 |
|-----------|--------------------------|
| 嵌入 | `embedding`, `text-embedding`, `embeddinggemma`, `bge-`, `nomic-embed`, `mxbai-embed`, `arctic-embed`, `all-minilm`, `voyage-`, `gecko`, `paraphrase-multilingual` |
| 视频生成 | `sora`, `veo-`, `cogvideo`, `runway-`, `lumiere` |
| 音乐生成 | `lyria` |
| 音频/语音/转录/实时 | `whisper`, `tts-`, `-tts`, `speech-`, `audio-preview`, `-transcribe`, `native-audio`, `flash-live`, `gpt-audio`, `realtime`, `bark-`, `xtts`, `voicebox` |
| 适度/安全等级 | `moderation`, `omni-moderation`, `llama-guard`, `shieldgemma`, `prompt-guard`, `-guardian`, `safeguard` |
| Reachor | `rerank`, `reranker` |
| 传承完成（OpenAI GPT-3 时代） | `babbage-`, `davinci-`, `curie-`, `text-davinci`, `instructgpt`, `code-davinci`, `code-cushman`, `-turbo-instruct` |
| 网络搜索/浏览端点 | `-search-preview`, `-search-api` |
| 旧版搜索/相似度 | `code-search`, `text-search`, `similarity-` |
| 特殊/单任务 | `computer-use-preview`, `deep-research`, `robotics`, `aqa`, `reader-lm` (HTML→Markdown), `-nsql` (文本转SQL), `minicheck` (事实核查), `claude-1`, `claude-instant` |
| 特殊/单任务 | `computer-use-preview`、`deep-research`、`robotics`、`aqa`、`reader-lm`（HTML→Markdown）、`-nsql`（文本转SQL）、`minicheck`（事实核查）、`claude-1`、`claude-instant` |

该过滤器使用子字符串检查，不区分大小写。如果提供商将来引入另一个非聊天系列，则列表可以扩展到`src-editor/src/AiChat/AiChatService.ts`（`NON_CHAT_KEYWORDS`）。

### 错误处理
如果 API 端点无法访问或返回错误，则会显示用户友好的消息：

- 连接错误（端点无法访问）
- API 密钥无效 (401)
访问被拒绝（403）
未找到模型（404）

如果模型检索失败，则会显示一个**重试**按钮，允许在不关闭对话框的情况下再次尝试。

## Changelog
### 9.2.2 (2026-05-07)
* (Eistee82) Fix: AI chat mode tooltip no longer covers the dropdown options (issue #2201) — moved tooltip to the left of the selector
* (Eistee82) Clarified the AI chat mode descriptions in the tooltip: Agent is for larger models with tool support and handles both analysis and script creation, Code is for smaller models without tool support (uses two-step plan-then-code) — translations updated in all 11 languages
* (@GermanBluefox) Added the "is state exists" block to blockly

### 9.2.1 (2026-04-30)
* (@GermanBluefox) See previous changelog entries

### 9.2.0 (2026-04-30)
* (@GermanBluefox) Agent keys are encrypted now. You must enter your keys anew!
* (Eistee82) AI API keys are now stored encrypted and only used server-side (`encryptedNative` + `protectedNative`); the frontend never sees them
* (Eistee82) Code Lens above every top-level function/class/arrow with `💡 Explain | 🔧 Refactor | ✅ Tests` actions
* (Eistee82) Inline Chat Widget (Ctrl+Alt+I) directly in the editor with response preview and Apply button
* (Eistee82) Inline diff for AI "Show diff": only the targeted lines change as red/green, the rest of the script stays untouched; Accept replaces just those lines
* (Eistee82) Six VS-Code-like AI actions in the Monaco editor (right-click menu, Ctrl+Alt+I/E/R/C/F shortcuts, and `/explain`, `/refactor`, `/comment`, `/fix`, `/tests`, `/ask` slash commands with German aliases)
* (Eistee82) Hover over an ioBroker object ID in any string literal to see a rich tooltip with object metadata and the current live state — works without AI
* (Eistee82) Anthropic agent mode (native `tool_use`/`tool_result` blocks) and 10 new Monaco editor tools so the AI agent can read/navigate/edit the live editor
* (Eistee82) `search_datapoints` covers every object type (channels, devices, folders, enums, …) and matches on role; `get_object_info` lists children for containers — fixes finding aliases/motion-sensors modeled as channels
* (Eistee82) Non-chat model filter expanded (embeddings, image/audio/video/TTS, transcription, moderation, web-search, Ollama single-task models, …)

### 9.2.0 (2026-04-11)
* (Eistee82) AI Chat panel with multi-provider support, tool calling, inline completions, and smart-apply
* (Eistee82) Fix: prevent duplicate 'Stopping script' log when script is not running
* (Eistee82) Fix: only restart scripts on the instance that owns them
* (Eistee82) Added OID display mode toggle for Blockly editor: 4 display modes (Name, Name path, State ID, Full ID) with toolbar dropdown, context menu, optional object icons, and translations in 11 languages
* (Eistee82) Node 25 compatibility: replaced deprecated rmdirSync with rmSync in build tasks
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