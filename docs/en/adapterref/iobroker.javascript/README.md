---
BADGE-Number of Installations: https://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.javascript/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/javascript/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# ioBroker.javascript

## Table of contents

- [Blockly](/#/docs/adapterref/iobroker.javascript/blockly.md)
- [JavaScript reference](/#/docs/adapterref/iobroker.javascript/javascript.md)
- [Upgrade guide](/#/docs/adapterref/iobroker.javascript/upgrade-guide.md)

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

All API key fields are rendered as password inputs (masked), and only the keys of providers you actually want to use need to be entered. Each provider has its own **Test** button.

### API Key Security

API keys are handled with two layers of protection provided by the ioBroker platform:

1. **`encryptedNative`** — Keys are automatically encrypted using the system secret before being written to the object database. Database dumps or object backups no longer expose the raw keys.
2. **`protectedNative`** — Keys are never transmitted to admin web UIs or foreign adapters. Only the `javascript` adapter instance itself can read them via `this.config` (where the ioBroker runtime delivers them transparently decrypted).

Because of this, the AI Chat Panel, the inline completion provider, and any other frontend component **no longer access the keys directly**. Instead, they request AI services via a `sendTo` call and let the backend resolve the correct key:

```
Frontend                      Backend (this.config, decrypted)
────────                      ───────────────────────────────
sendTo('chatCompletion', {    →   looks up provider → picks gptKey/claudeKey/…
    provider: 'openai',           → performs HTTP request to provider
    model: 'gpt-4o',              → streams response back
    messages: [...]               
})
```

A dedicated `sendTo` command is available for discovery:

| Command | Payload | Response |
|---------|---------|----------|
| `getAvailableAiProviders` | `{}` | `{ providers: [{ provider: 'openai' }, { provider: 'custom', baseUrl: '…' }, …] }` |

The response lists only which providers have credentials configured — it never includes the keys themselves. This allows the UI to show the correct provider icons and populate the model dropdown without pulling secrets into the browser.

**Upgrade note:** After upgrading from an earlier version, the existing (unencrypted) keys will remain working until the first time you save the adapter settings. When you save, the runtime re-encrypts them. If a key appears blank after the upgrade, re-enter it once in the settings dialog and save.

### Test API Connection

Each provider has a dedicated **Test** button next to its API key field. Two cases are handled:

1. **Form-value test** — Immediately after entering or editing a key in the settings dialog, the `Test` button uses the current form value (which is still in the browser before saving). This lets you verify a new key before persisting it.
2. **Stored-key test** — When the button is invoked from contexts where no form value is available (e.g. the script editor during model discovery), the backend resolves the key from `this.config` based on the selected provider.

The test will:
- Connect to the provider's API endpoint
- Validate the API key
- Return the number of available chat models

The test-button icons are embedded as inline SVG data URIs with `fill="currentColor"`, so their color automatically follows the active theme (light/dark mode).

### Dynamic Model Loading

When opening the AI code generator dialog in the script editor, the available models are automatically fetched from each configured provider. The model dropdown is populated dynamically — no hardcoded model list is used.

#### Non-chat model filter

The provider model lists returned by OpenAI, Anthropic, Gemini, DeepSeek, and custom (Ollama/LM Studio/OpenRouter) endpoints contain many models that cannot be used for chat completion. The adapter filters these automatically so that the dropdown only shows models suitable for ioBroker script generation.

The following categories are excluded:

| Category | Keyword examples |
|----------|------------------|
| Embeddings | `embedding`, `text-embedding`, `embeddinggemma`, `bge-`, `nomic-embed`, `mxbai-embed`, `arctic-embed`, `all-minilm`, `voyage-`, `gecko`, `paraphrase-multilingual` |
| Image generation / editing | `dall-e`, `gpt-image`, `image-edit`, `-image-preview`, `-image-latest`, `flash-image`, `nano-banana`, `stable-diffusion`, `sdxl`, `midjourney`, `flux-`, `imagen` |
| Video generation | `sora`, `veo-`, `cogvideo`, `runway-`, `lumiere` |
| Music generation | `lyria` |
| Audio / speech / transcribe / realtime | `whisper`, `tts-`, `-tts`, `speech-`, `audio-preview`, `-transcribe`, `native-audio`, `flash-live`, `gpt-audio`, `realtime`, `bark-`, `xtts`, `voicebox` |
| Moderation / safety | `moderation`, `omni-moderation`, `llama-guard`, `shieldgemma`, `prompt-guard`, `-guardian`, `safeguard` |
| Rerankers | `rerank`, `reranker` |
| Legacy completion (OpenAI GPT-3 era) | `babbage-`, `davinci-`, `curie-`, `text-davinci`, `instructgpt`, `code-davinci`, `code-cushman`, `-turbo-instruct` |
| Web search / browsing endpoints | `-search-preview`, `-search-api` |
| Legacy search / similarity | `code-search`, `text-search`, `similarity-` |
| Specialty / single-task | `computer-use-preview`, `deep-research`, `robotics`, `aqa`, `reader-lm` (HTML→Markdown), `-nsql` (text-to-SQL), `minicheck` (fact-check), `claude-1`, `claude-instant` |

The filter uses case-insensitive substring matching. If a provider adds a new non-chat model family in the future, the list can be extended in `src-editor/src/AiChat/AiChatService.ts` (see `NON_CHAT_KEYWORDS`).

### Error Handling

If the API endpoint is unreachable or returns an error, user-friendly messages are displayed:
- Connection failures (endpoint not reachable)
- Invalid API key (401)
- Access denied (403)
- Model not found (404)

A **Retry** button is shown when model loading fails, allowing you to retry without closing the dialog.

## Changelog
### 10.5.3 (2026-11-11)
* (@GermanBluefox) Fixed: the cursor of the script editor jumped to the start of the script after the first typed character (when nothing else had updated the editor since the script was opened) and after saving

### 10.5.2 (2026-11-11)
* (@GermanBluefox) Added: function block diagrams - the online view marks a `STATE_OUT` block whose state somebody else changed (VIS, another script, by hand) and shows the value the state holds; the new option "Write the value back" of `STATE_OUT` writes the value of the diagram back then, at most once a second (#2442)
* (@Voodoo2man) Added: Blockly category selection for member IDs and change/ack filters to the enum trigger (#1960)

### 10.5.1 (2026-11-10)
* (@GermanBluefox) Added: function block diagrams - blocks can be pinned (pin button on the block, its menu or the properties): "Arrange automatically" leaves them where they are and arranges the other blocks around them (#2443)
* (@GermanBluefox) Added: function block diagrams - a link can be moved to another input by dragging its connected input; let go where no input is, it is deleted - a mere click on it keeps it (#2438)
* (@GermanBluefox) Added: function block diagrams - the `PID` block has the output `RUN`: `TRUE` while the controller works, i.e. none of `MAN`, `RST` and `HOLD` is active (#2440)
* (@GermanBluefox) Changed: function block diagrams - the online view shows the value of a link that is not BOOL at the input of the target block instead of in the middle of the link (#2444)

### 10.5.0 (2026-11-07)
* (@GermanBluefox) Added: script functions `readDir`, `fileExists`, `chmodFile` and `chownFile` for files in the DB, and `chmodObject` and `chownObject` to change the access rights and the owner of objects and states (only with the option "Enable command setObject"), each with an `...Async` variant
* (@GermanBluefox) Added: function block diagrams - block `CHARCURVE` (characteristic curve, e.g. a heating curve): `OUT` on the straight lines through 2 to 10 points `X1`/`Y1` ... `Xn`/`Yn`, kept at the Y of the outer points beyond them; the points are inputs, so they can be connected too, and the properties show the curve (#2433)

### 10.4.10 (2026-11-04)
* (@GermanBluefox) Fixed: the unsaved changes of the open scripts were lost, when the list of scripts or the log was hidden or shown again (#1739)
* (@GermanBluefox) Added: animated icons in the editor (`@iobroker/gui-components` 10.3.16) - start/stop morphs between play and pause and shows a ring until the instance confirmed it, the restart button turns until the script is restarted, folders open with an animation, animated delete, menu arrow and expert mode symbols, a check mark after saving and copying
* (@GermanBluefox) Added: more animations in the editor - the rows of a folder grow and shrink when it is opened and closed, new scripts light up, the colors of the start/stop buttons fade, the Save/Diff/Cancel buttons and new tabs grow to their width, closed tabs shrink, new log lines slide in, the side menu and the log slide in when they are opened, badges jump when their number grows
* (@GermanBluefox) Added: the log shows the number of new lines, while it does not follow them
* (@GermanBluefox) Added: the history dialog can be maximized (button or double click on its title); the width of the version list and the border between the two sides of the diff can be dragged; buttons jump from change to change; "Take over into the editor" is disabled for a version that is the same as the editor
* (@GermanBluefox) Changed: the diffs (history, unsaved changes, AI suggestions) scroll to the first change and show changed indentation too
* (@GermanBluefox) Updated packages

## License
The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
Copyright (c) 2014 hobbyquaker

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