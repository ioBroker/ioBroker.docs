---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# ioBroker.javascript

## Table of contents

- [Blockly](blockly.md)
- [JavaScript reference](javascript.md)
- [Upgrade guide](upgrade-guide.md)

## AI Code Generator - Custom API Support

The built-in AI code generator supports not only the OpenAI API but also any OpenAI-compatible API endpoint. This allows you to use alternative providers such as:

- **Google Gemini** (free tier available, recommended)
- **DeepSeek** (very affordable)
- **OpenRouter** (multi-provider gateway)
- **Ollama** (local LLMs)
- **LM Studio** (local LLMs)
- **Anthropic** (via OpenAI-compatible proxy)
- Any other provider with an OpenAI-compatible `/v1/chat/completions` endpoint

### Recommended Providers

#### Google Gemini (free, recommended)

Google offers a generous free tier with an OpenAI-compatible endpoint — ideal for ioBroker script generation:

| Model | Requests/min | Requests/day | Quality |
|-------|-------------|-------------|---------|
| Gemini 2.5 Flash | 10 | 500 | Very good for code |
| Gemini 2.5 Pro | 5 | 25 | Excellent |
| Gemini 2.0 Flash | 15 | 1500 | Good |

Setup:
1. Get a free API key at https://aistudio.google.com/apikey
2. Set **Base URL** to `https://generativelanguage.googleapis.com/v1beta/openai`
3. Select a Gemini model (e.g. `gemini-2.5-flash`)

#### DeepSeek (very affordable)

DeepSeek offers excellent code generation at very low cost (~$0.001 per request):
- Get an API key at https://platform.deepseek.com/
- Set **Base URL** to `https://api.deepseek.com/v1`
- Recommended model: `deepseek-chat`

#### Local models (Ollama / LM Studio)

Local models run on your own hardware without internet.

**Minimum requirement: 14B parameter models** (e.g. `qwen2.5-coder:14b`). Smaller models (7B/9B) produce unreliable code with incorrect API calls. A GPU with at least 12GB VRAM (e.g. RTX 3060) is recommended for 14B models.

Tested and recommended models:
- `qwen2.5-coder:14b` - Good code quality, runs on 12GB VRAM
- `qwen2.5-coder:32b` - Better quality, requires 24GB+ VRAM

Setup:
- **Ollama**: Set **Base URL** to `http://localhost:11434/v1`, leave API key empty
- **LM Studio**: Set **Base URL** to `http://localhost:1234/v1`, leave API key empty

**Note:** The free tier of the OpenAI API (ChatGPT) no longer provides API access for code generation. Consider using Google Gemini (free) or DeepSeek (very affordable) as alternatives.

### Configuration

In the adapter settings under "AI settings", you will find API key fields for each provider:

| Setting | Description |
|---------|-------------|
| **ChatGPT API key** | API key for OpenAI (platform.openai.com) |
| **Anthropic API key** | API key for Claude (console.anthropic.com) |
| **Gemini API key** | API key for Google Gemini (aistudio.google.com) |
| **DeepSeek API key** | API key for DeepSeek (platform.deepseek.com) |
| **Custom API Base URL** | Base URL for custom providers (e.g. `http://localhost:11434/v1` for Ollama) |
| **Custom API key** | Optional API key for custom providers (Ollama doesn't need one) |

Only enter the keys for providers you want to use. Each provider has its own **Test** button.

### Test API Connection

Each provider has a dedicated **Test** button next to its API key field. The test will:
- Connect to the provider's API endpoint
- Validate the API key
- Return the number of available models

### Dynamic Model Loading

When opening the AI code generator dialog in the script editor, the available models are automatically fetched from the configured API endpoint. The model dropdown is populated dynamically — no hardcoded model list is used.

### Error Handling

If the API endpoint is unreachable or returns an error, user-friendly messages are displayed:
- Connection failures (endpoint not reachable)
- Invalid API key (401)
- Access denied (403)
- Model not found (404)

A **Retry** button is shown when model loading fails, allowing you to retry without closing the dialog.

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->
### WORK IN PROGRESS
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