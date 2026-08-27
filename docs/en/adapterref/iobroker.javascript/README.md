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
### 10.1.2 (2026-08-24)
* (@GermanBluefox) Added new rule blocks
* (@krobipd) Fixed saving of Blockly scripts under Blockly 13: a script containing a named timeout, interval or schedule could not be saved anymore - the save button did not appear (#2349)
* (@krobipd) Fixed saving of Blockly scripts containing a function with a return value and no statements (#1958)
* (@krobipd) The Blockly regression tests now also cover saving: every block is serialized the way the editor does it and reloaded to the same code
* (@krobipd) When a block fails while the script is regenerated after a change, the editor now shows the error instead of silently never offering the save button; a failing export shows its error too

### 10.1.1 (2026-08-24)
* (@GermanBluefox) The credentials of the central storage (Basic settings -> Credentials) are available in the scripts as `SECRETS`, e.g. `SECRETS.CameraPassword.key`. The values are decrypted, read-only and are updated live when a credential is edited in the admin UI
* (@GermanBluefox) The editor knows the credentials that exist: after `SECRETS.` it offers their names, and after the next dot exactly the fields the selected credential has
* (@GermanBluefox) Added the Blockly block "credential", which reads one field of the central credential storage
* (@GermanBluefox) The instance settings list the available credentials with their fields and the expression a script uses for them

### 10.1.0 (2026-08-16)
* (@GermanBluefox) Turned `strict` off again for the scripts, as TypeScript 6 enables it by default
* (@GermanBluefox) Added the tab "TypeScript" to the settings, where the compiler options for the scripts can be configured
* (@GermanBluefox) Added snapshot tests for the Blockly code generation (`npm run test:blockly`)
* (@GermanBluefox) Removed two leftover `.only` markers that had disabled almost the whole test suite
* (@GermanBluefox) Pinned the line endings of transformed TypeScript sources to LF, so a compiler update cannot rewrite every script
* (@GermanBluefox) Moved the micro benchmarks into `npm run test:performance`, as they measure relative speed against timeouts and cannot block a build
* (@GermanBluefox) Updated Blockly from 11.1.1 to 13.2.1. The generated code is unchanged
* (@GermanBluefox) `updateBlockly.js` now copies from the installed npm package instead of cloning the git master branch, so the shipped Blockly version is reproducible
* (@GermanBluefox) Blockly is now bundled from the npm package instead of being loaded as vendored script tags. Custom blocks of other adapters keep working unchanged
* (@GermanBluefox) Removed 828 kB of vendored Blockly code from the repository
* (@GermanBluefox) Converted all block definitions from JavaScript to TypeScript. The generated code is unchanged
* (@GermanBluefox) Fixed the object blocks under Blockly 13: the attribute rows were no longer right-aligned, and editing the attributes of an "object" block threw
* (@GermanBluefox) Dropped the dead field editor code of the CRON and script fields, which had been written against Blockly 1.x
* (@GermanBluefox) Fixed the multi-and/multi-or blocks under Blockly 13, which threw when their conditions were edited
* (@GermanBluefox) Removed a phantom block type "Convert" that a stray assignment in the conversion blocks had registered
* (@GermanBluefox) Added `BLOCKLY_TS.md` for adapter developers: what Blockly 13 changed for custom blocks and how to write them in TypeScript
* (@GermanBluefox) Moved the Blockly translations into `words.json` and typed the lookup helpers
* (@GermanBluefox) Redesign of Rules
* (@GermanBluefox) Added a wizard to the rule editor that builds a rule step by step - trigger, condition and action are configured in place, and the last step shows the finished rule
* (@GermanBluefox) The wizard opens by itself for a newly created rule - once, and not for a duplicated one. Afterwards it stays available in the block palette
* (@GermanBluefox) Fixed the type declarations of 3rd party libraries: they were placed under the name the library has on disk while their `package.json` went to the name the scripts import, so TypeScript never connected the two and everything imported from such a library was `any` (#2341)
* (@GermanBluefox) Stopped wrapping a library's declarations in `declare module`, which cut a barrel file off from what it re-exports. Declarations that are not a module themselves are still wrapped
* (@GermanBluefox) Fixed following the imports inside a declaration file: only the first import of a file was followed, and only if it was on the first line. For rxjs 6 that loaded 6 of its ~800 declaration files
* (@GermanBluefox) Side effect imports (`import "./x";`) inside a declaration file are now followed as well. `@iobroker/types` consists of nothing else, so the `ioBroker.*` types were missing in scripts and in the editor
* (@GermanBluefox) A definition file that cannot be read no longer discards all type declarations of its package
* (@GermanBluefox) Added regression tests for the type declarations of 3rd party libraries, which compile against them and insist that wrong code is rejected
* (@GermanBluefox) `createState` now stringifies `common.def` of an object, json or array state, as js-controller expects it and as `setState` already does with the value. Creating such a state with an initial value no longer warns "Default value has to be stringified" (#2307)
* (@GermanBluefox) Documented that an object in the second position of `createState` is always the `common`, and how to give a state a non-primitive initial value
* (@GermanBluefox) Restored the check of the mirror path in the instance configuration. It was lost when the admin configuration moved to `jsonConfig.json`, so a forbidden path was accepted without a word and only refused later in the log (#2296)
* (@GermanBluefox) The mirror path field now explains what the directory has to be, and suggests one
* (@GermanBluefox) Scripts are no longer deleted from the database when the mirror directory as a whole becomes unreachable, e.g. because a share is not mounted
* (@GermanBluefox) Libraries that name their declarations through an `exports` map are typed now. Their legacy `types` field is often a stub pointing at a file that does not exist - rxjs 7 is one - which left everything imported from them as `any` (#928)
* (@GermanBluefox) The declarations of a library are laid out around its entry point, so `moduleResolution: node10` finds it even when they live in a subdirectory
* (@GermanBluefox) The manifest handed to TypeScript describes that layout instead of the one on disk. An `exports` map pointing at paths that do not exist there made TypeScript refuse the library altogether
* (@GermanBluefox) The package.json of a library is read from disk instead of through Node, which refuses it when the library does not export it
* (@GermanBluefox) Fixed the mirror tests on macOS. They asserted on the first event a watcher reported, while `fs.watch` there works at directory granularity and sends an event for the watched directory before the one for the file. They now wait for the change they are about, and say what arrived instead if it never comes
* (@GermanBluefox) Made the mirror tests independent of how long a watch takes to arm. The change under test is repeated while waiting, so it cannot be made before the watcher is listening - the same commit produced a green and a red macOS job over that
* (@GermanBluefox) Added a wizard to the rule editor that builds a rule step by step - trigger, condition and action are configured in place, and the last step shows the finished rule

### 10.0.0 (2026-08-04)
* (@GermanBluefox) TypeScript 6 support
* (@GermanBluefox) GUI was migrated to React 19 and MUI 9
* (@GermanBluefox) Showed the host name in the instance selection dialog

### 9.3.1 (2026-06-18)
* (@GermanBluefox) Added the possibility to execute one-way scripts without saving it

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