---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# ioBroker.javascript

## Inhaltsverzeichnis

- [Blockly](blockly.md)
- [Benutzung](usage.md)
- [JavaScript-Referenz](../en/javascript.md) (nur auf Englisch verfügbar)
- [Upgrade-Anleitung](../en/upgrade-guide.md) (nur auf Englisch verfügbar)

## KI-Codegenerator - Unterstützung eigener API-Endpunkte

Der integrierte KI-Codegenerator unterstützt nicht nur die OpenAI-API, sondern auch jeden OpenAI-kompatiblen API-Endpunkt. So können alternative Anbieter genutzt werden, z.B.:

- **Google Gemini** (kostenlos verfügbar, empfohlen)
- **DeepSeek** (sehr günstig)
- **OpenRouter** (Multi-Provider-Gateway)
- **Ollama** (lokale LLMs)
- **LM Studio** (lokale LLMs)
- **Anthropic** (über OpenAI-kompatiblen Proxy)
- Jeder andere Anbieter mit einem OpenAI-kompatiblen `/v1/chat/completions`-Endpunkt

### Empfohlene Anbieter

#### Google Gemini (kostenlos, empfohlen)

Google bietet ein großzügiges kostenloses Kontingent mit einem OpenAI-kompatiblen Endpunkt — ideal für die ioBroker-Skript-Generierung:

| Modell | Anfragen/Min | Anfragen/Tag | Qualität |
|--------|-------------|-------------|----------|
| Gemini 2.5 Flash | 10 | 500 | Sehr gut für Code |
| Gemini 2.5 Pro | 5 | 25 | Ausgezeichnet |
| Gemini 2.0 Flash | 15 | 1500 | Gut |

Einrichtung:
1. Kostenlosen API-Key holen: https://aistudio.google.com/apikey
2. **Base-URL** auf `https://generativelanguage.googleapis.com/v1beta/openai` setzen
3. Ein Gemini-Modell wählen (z.B. `gemini-2.5-flash`)

#### DeepSeek (sehr günstig)

DeepSeek bietet hervorragende Code-Generierung zu sehr niedrigen Kosten (~0,001€ pro Anfrage):
- API-Key holen: https://platform.deepseek.com/
- **Base-URL** auf `https://api.deepseek.com/v1` setzen
- Empfohlenes Modell: `deepseek-chat`

#### Lokale Modelle (Ollama / LM Studio)

Lokale Modelle laufen auf eigener Hardware ohne Internet.

**Mindestanforderung: 14B-Parameter-Modelle** (z.B. `qwen2.5-coder:14b`). Kleinere Modelle (7B/9B) erzeugen unzuverlässigen Code mit falschen API-Aufrufen. Eine GPU mit mindestens 12GB VRAM (z.B. RTX 3060) wird für 14B-Modelle empfohlen.

Getestete und empfohlene Modelle:
- `qwen2.5-coder:14b` - Gute Codequalität, läuft auf 12GB VRAM
- `qwen2.5-coder:32b` - Bessere Qualität, erfordert 24GB+ VRAM

Einrichtung:
- **Ollama**: **Base-URL** auf `http://localhost:11434/v1` setzen, API-Key leer lassen
- **LM Studio**: **Base-URL** auf `http://localhost:1234/v1` setzen, API-Key leer lassen

**Hinweis:** Die kostenlose Version der OpenAI-API (ChatGPT) bietet keinen API-Zugang mehr für Code-Generierung. Google Gemini (kostenlos) oder DeepSeek (sehr günstig) sind empfohlene Alternativen.

### Konfiguration

In den Adapter-Einstellungen unter "KI-Einstellungen" befinden sich API-Key-Felder für jeden Anbieter:

| Einstellung | Beschreibung |
|-------------|-------------|
| **ChatGPT API-Schlüssel** | API-Key für OpenAI (platform.openai.com) |
| **Anthropic API-Schlüssel** | API-Key für Claude (console.anthropic.com) |
| **Gemini API-Schlüssel** | API-Key für Google Gemini (aistudio.google.com) |
| **DeepSeek API-Schlüssel** | API-Key für DeepSeek (platform.deepseek.com) |
| **Eigene API Base-URL** | Base-URL für eigene Anbieter (z.B. `http://localhost:11434/v1` für Ollama) |
| **Eigener API-Schlüssel** | Optionaler API-Key für eigene Anbieter (Ollama benötigt keinen) |

Alle API-Key-Felder werden als Passwortfelder dargestellt (maskiert). Es müssen nur die Keys der gewünschten Anbieter eingetragen werden. Jeder Anbieter hat einen eigenen **Test**-Button.

### Sicherheit der API-Schlüssel

Die API-Keys werden durch zwei von der ioBroker-Plattform bereitgestellte Schutzebenen abgesichert:

1. **`encryptedNative`** — Die Keys werden vor dem Schreiben in die Object-Datenbank automatisch mit dem System-Secret verschlüsselt. Datenbank-Dumps oder Object-Backups enthalten die Keys nicht mehr im Klartext.
2. **`protectedNative`** — Die Keys werden niemals an Admin-Oberflächen oder fremde Adapter übertragen. Nur die `javascript`-Instanz selbst kann sie über `this.config` lesen (die ioBroker-Runtime liefert sie dort transparent entschlüsselt).

Daraus folgt: Das KI-Chat-Panel, die Inline-Completion und alle anderen Frontend-Komponenten **greifen nicht mehr direkt auf die Keys zu**. Stattdessen wird jede KI-Anfrage per `sendTo` an den Adapter geschickt, und das Backend setzt den passenden Key ein:

```
Frontend                      Backend (this.config, entschlüsselt)
────────                      ─────────────────────────────────────
sendTo('chatCompletion', {    →   wählt Provider → nimmt gptKey/claudeKey/…
    provider: 'openai',           → schickt HTTP-Request an Anbieter
    model: 'gpt-4o',              → liefert Antwort zurück
    messages: [...]
})
```

Für die Anzeige steht ein eigener `sendTo`-Befehl zur Verfügung:

| Befehl | Payload | Antwort |
|--------|---------|---------|
| `getAvailableAiProviders` | `{}` | `{ providers: [{ provider: 'openai' }, { provider: 'custom', baseUrl: '…' }, …] }` |

Die Antwort teilt dem Frontend nur mit, **welche** Provider konfiguriert sind — der eigentliche Schlüssel ist darin nie enthalten. So lassen sich im Editor die richtigen Provider-Icons anzeigen und das Modell-Dropdown korrekt befüllen, ohne Secrets in den Browser zu laden.

**Hinweis zum Upgrade:** Nach dem Upgrade von einer älteren Version bleiben vorhandene (unverschlüsselte) Keys so lange gültig, bis die Adapter-Einstellungen das erste Mal gespeichert werden. Beim Speichern verschlüsselt die Runtime die Werte. Sollte ein Schlüssel nach dem Upgrade leer erscheinen, genügt es, ihn einmal neu einzutragen und zu speichern.

### API-Verbindung testen

Jeder Anbieter hat einen eigenen **Test**-Button neben seinem API-Key-Feld. Es werden zwei Fälle unterschieden:

1. **Test mit Formular-Wert** — Unmittelbar nach dem Eintragen oder Ändern eines Keys im Einstellungsdialog nutzt der `Test`-Button den aktuellen Formularwert (der liegt vor dem Speichern noch lokal im Browser). So kann ein neuer Key vor dem Persistieren geprüft werden.
2. **Test mit gespeichertem Schlüssel** — Wird der Test aus Kontexten ohne Formular-Wert aufgerufen (z.B. beim Modell-Abruf im Skript-Editor), löst das Backend den Key über `this.config` anhand des gewählten Providers auf.

Der Test:
- Verbindet sich mit dem API-Endpunkt des Anbieters
- Validiert den API-Schlüssel
- Gibt die Anzahl der verfügbaren Chat-Modelle zurück

Die Icons der Test-Buttons sind als Inline-SVG-Data-URIs mit `fill="currentColor"` eingebettet. Dadurch folgt ihre Farbe automatisch dem aktiven Theme (Light/Dark-Mode).

### Dynamisches Laden der Modelle

Beim Öffnen des KI-Codegenerator-Dialogs im Skript-Editor werden die verfügbaren Modelle automatisch von jedem konfigurierten Provider abgerufen. Das Modell-Dropdown wird dynamisch befüllt — es gibt keine fest hinterlegte Modellliste.

#### Filter für nicht-Chat-Modelle

Die Modelllisten, die OpenAI, Anthropic, Gemini, DeepSeek und Custom-Endpunkte (Ollama/LM Studio/OpenRouter) zurückliefern, enthalten viele Modelle, die nicht für Chat-Completion geeignet sind. Der Adapter filtert diese automatisch heraus, sodass im Dropdown nur Modelle erscheinen, die für die ioBroker-Skript-Generierung taugen.

Folgende Kategorien werden ausgeschlossen:

| Kategorie | Beispiel-Schlüsselwörter |
|-----------|--------------------------|
| Embeddings | `embedding`, `text-embedding`, `embeddinggemma`, `bge-`, `nomic-embed`, `mxbai-embed`, `arctic-embed`, `all-minilm`, `voyage-`, `gecko`, `paraphrase-multilingual` |
| Bild-Generierung / -Bearbeitung | `dall-e`, `gpt-image`, `image-edit`, `-image-preview`, `-image-latest`, `flash-image`, `nano-banana`, `stable-diffusion`, `sdxl`, `midjourney`, `flux-`, `imagen` |
| Video-Generierung | `sora`, `veo-`, `cogvideo`, `runway-`, `lumiere` |
| Musik-Generierung | `lyria` |
| Audio / Sprache / Transkription / Realtime | `whisper`, `tts-`, `-tts`, `speech-`, `audio-preview`, `-transcribe`, `native-audio`, `flash-live`, `gpt-audio`, `realtime`, `bark-`, `xtts`, `voicebox` |
| Moderation / Safety-Klassifikatoren | `moderation`, `omni-moderation`, `llama-guard`, `shieldgemma`, `prompt-guard`, `-guardian`, `safeguard` |
| Reranker | `rerank`, `reranker` |
| Legacy-Completion (OpenAI GPT-3-Ära) | `babbage-`, `davinci-`, `curie-`, `text-davinci`, `instructgpt`, `code-davinci`, `code-cushman`, `-turbo-instruct` |
| Web-Suche / Browsing-Endpoints | `-search-preview`, `-search-api` |
| Legacy-Suche / Similarity | `code-search`, `text-search`, `similarity-` |
| Spezial / Single-Task | `computer-use-preview`, `deep-research`, `robotics`, `aqa`, `reader-lm` (HTML→Markdown), `-nsql` (Text-zu-SQL), `minicheck` (Fact-Check), `claude-1`, `claude-instant` |

Der Filter verwendet eine Substring-Prüfung ohne Beachtung der Groß-/Kleinschreibung. Wenn ein Provider künftig eine weitere Nicht-Chat-Familie einführt, lässt sich die Liste in `src-editor/src/AiChat/AiChatService.ts` (`NON_CHAT_KEYWORDS`) erweitern.

### Fehlerbehandlung

Wenn der API-Endpunkt nicht erreichbar ist oder einen Fehler zurückgibt, werden benutzerfreundliche Meldungen angezeigt:
- Verbindungsfehler (Endpunkt nicht erreichbar)
- Ungültiger API-Schlüssel (401)
- Zugriff verweigert (403)
- Modell nicht gefunden (404)

Bei fehlgeschlagenem Modellabruf wird ein **Erneut versuchen**-Button angezeigt, sodass ein erneuter Versuch ohne Schließen des Dialogs möglich ist.

## Changelog

### **WORK IN PROGRESS**
* (arteck) performance optimization

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