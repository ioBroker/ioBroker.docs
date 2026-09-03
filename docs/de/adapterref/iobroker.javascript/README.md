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
* (@GermanBluefox) Rules: the text of an action can round the trigger value with `%.1s` - any number of digits after the decimal point, also `%.2old` for the old value - formatted with the decimal separator of the system, so `Kühlschrank zu warm (%.1s°C)` gives `29,4°C` where `%s` gave `29.400000000000002°C`

### 10.1.3 (2026-08-30)
* (@GermanBluefox) The plain text export named its files after the script ID instead of the script name, so every dot of a name came out as an underscore - `HK-Balkontuer_v0.1` was exported as `HK-Balkontuer_v0_1.js`, and importing it back renamed the script to that. The files are now named after the script (#2364)
* (@GermanBluefox) Importing a plain text export treated a dot inside a file name as a folder level, so `PW-TV-Control_v0.6.js` created a folder `PW-TV-Control_v0` containing a script named `6`. Only the directories of the ZIP are folders now (#2364)
* (@GermanBluefox) The folder icons in the script tree were drawn at less than half the size of the script icons next to them: they spaced themselves with a padding, and since `CssBaseline` sets `box-sizing: border-box` that padding was subtracted from their 20px instead of being added to them. They use a margin now, like the script icons always did (#2360)
* (@GermanBluefox) The log below the editor could not be resized while a script was open: the editor area guessed its height from the height the tabs and the toolbar were expected to have, hung over the bottom edge of its pane and covered the 8px splitter with the horizontal scrollbar of the editor, which swallowed the mouse click. The three parts now share the height as a flex column (#2351)
* (@GermanBluefox) The script list cut off long names, although there was still free space next to them: the space for the buttons at the end of a row was a fixed 185px, which is more than the three buttons occupy, and it did not account for the icon column
* (@GermanBluefox) Fixed the Blockly comment block: the text was written in white on the yellow block and could not be read, the editor opened somewhere else on the page instead of over the block, and on a smartphone or tablet it did not open at all and left the whole workspace unusable until the page was reloaded (#2348)
* (@GermanBluefox) Fixed the script mirror for folder names containing regular expression characters: a folder called e.g. `Lampen (Flur` aborted the synchronization with a `SyntaxError`, a folder called e.g. `[ab]` silently synchronized the scripts of another folder (#2239)
* (@GermanBluefox) The Blockly block "http (POST)" got a "content type" selector, so an API that insists on `Content-Type: application/json` no longer needs an `exec` block. "automatic" is the default and behaves exactly as before, "own" allows any other type (#1983)
* (@GermanBluefox) `getSchedules()` returned the schedules of the time wizard of **all** scripts, even without the argument `true`. Now only the schedules of the own script are returned (#2164)
* (@GermanBluefox) `clearSchedule()` did not accept the objects that `getSchedules()` returns for schedules of the time wizard, so such a schedule stayed in the script and in the schedule counter (#2164)
* (@GermanBluefox) `clearSchedule()` can now clear the CRON jobs of other scripts too, as documented for `getSchedules(true)` (#2164)
* (@GermanBluefox) `getSchedules()` no longer lists the already canceled schedules of the own script in an `onStop` callback (#2164)

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