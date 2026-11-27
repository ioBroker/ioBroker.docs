---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.voice.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.voice.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.voice/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"en/adapterref/iobroker.voice/README.md":{"title":{"en":"ioBroker.voice"},"content":"en/adapterref/iobroker.voice/README.md"},"en/adapterref/iobroker.voice/admin/webcomponents/models/SOURCES.md":{"title":{"en":"Bundled model provenance"},"content":"en/adapterref/iobroker.voice/admin/webcomponents/models/SOURCES.md"}}}
---
![Logo](admin/voice.svg)

# ioBroker.voice

[![NPM version](https://img.shields.io/npm/v/iobroker.voice.svg)](https://www.npmjs.com/package/iobroker.voice)
[![Downloads](https://img.shields.io/npm/dm/iobroker.voice.svg)](https://www.npmjs.com/package/iobroker.voice)
![Test and Release](https://github.com/ioBroker/ioBroker.voice/workflows/Test%20and%20Release/badge.svg)

[Deutsche Beschreibung](https://github.com/ioBroker/ioBroker.voice/blob/main/docs/de/README.md)

Local, offline voice for ioBroker: speech recognition with [NVIDIA Parakeet TDT 0.6B v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) or [NVIDIA Canary 1B v2](https://huggingface.co/nvidia/canary-1b-v2), speech synthesis with [Piper](https://github.com/rhasspy/piper) and a wake word microphone for VIS-2. Everything runs on the CPU of the ioBroker host. No cloud, no GPU and no Docker are needed.

Up to version 0.1.x this adapter was called **ai-parakeet**, see [Moving from ai-parakeet](#moving-from-ai-parakeet).

- **25 European languages** (German, English, French, Italian, Spanish, Dutch, Polish, Russian, Ukrainian, Portuguese and more), with punctuation and capitalization: Parakeet detects the language itself, Canary is told it by the caller, see [Speech recognition model](#speech-recognition-model)
- **OpenAI-compatible API** `POST /v1/audio/transcriptions`: everything that can use the OpenAI Whisper API can use this adapter, e.g. [ioBroker.assistant](https://github.com/ioBroker/ioBroker.assistant)
- **sendTo** for scripts, e.g. to transcribe voice messages
- **Live test** of the microphone in the instance settings, and a **test page** with live recognition in the browser
- **Correction dictionary** for words the model does not know
- **Speech synthesis** with Piper, see [Local Piper speech server](#local-piper-speech-server)
- **Wake word microphone** for VIS-2, which can send the text to smart-text2command or ioBroker.assistant, see [VIS-2 wake word widget](#vis-2-wake-word-widget)

## Moving from ai-parakeet

Install **voice** and create an instance with the same number as the old one (`voice.0` for `ai-parakeet.0`). On its first start it:

- takes over the settings of `ai-parakeet.0` once, stops that instance (both would use the same port) and restarts,
- moves the downloaded model from `iobroker-data/ai-parakeet/models` to `iobroker-data/voice/models`, so the 670 MB are not downloaded again (a model directory set in the settings stays as it is),
- moves the Piper runtime, the Piper voices and the downloaded ffmpeg from `iobroker-data/ai-parakeet.0` to `iobroker-data/voice.0`,
- copies the uploaded wake word models and Piper voices.

You have to change yourself:

- scripts: `sendTo('ai-parakeet.0', …)` becomes `sendTo('voice.0', …)`,
- VIS-2: select the `voice` instance in the wake word widget,
- ioBroker.assistant: select the `voice` instance for the speech recognition (needs a version of the assistant that knows `voice`).

Then delete the instance `ai-parakeet.0` and the adapter ai-parakeet.

## Speed and memory

The model is INT8 quantized (about 670 MB) and needs about **1.1 GB of memory**. Measured times for a command of 3 to 6 seconds:

| Host                                        | CPU threads | Computing time | Real-time factor  |
| ------------------------------------------- | ----------- | -------------- | ----------------- |
| Raspberry Pi 5 (8 GB), with Frigate running | 3           | 0.5 - 1.1 s    | about 0.2         |
| Intel Core i9-14900HX                       | 4           | 0.1 - 0.3 s    | about 0.03 - 0.05 |

The real-time factor is the computing time divided by the length of the audio: 0.2 means 10 seconds of speech are recognized in 2 seconds. A Raspberry Pi 4 should work too, but was not measured and is clearly slower. 32-bit systems are not supported.

## Speech recognition model

The setting **Speech recognition model** on the tab **Model** selects the model:

- **Parakeet TDT 0.6B v3** (default) detects the language of the speech itself. On short commands spoken with an accent it sometimes picks the wrong language and writes English or Cyrillic words.
- **Canary 1B v2** is told the language of the speech, so accented speech stays in its language. It needs about 1 GB of disk, about 1.7 GB of memory and about twice the computing time of Parakeet (real-time factor 0.155 instead of 0.068 on an Intel Core i9-9900K with 4 threads).

Canary gets the language from the caller, as ISO 639-1 code (`de`, `en`, `ru`, …; `de-DE` works too): the field `language` of the [OpenAI-compatible API](#openai-compatible-api), `language` of [`sendTo('transcribe')`](#sendto), of `start` of the [live test](#live-test-in-admin) and of `hello` of the WebSocket of the test page. ioBroker.assistant sends the language of its wake word. A request without a language, or with a language that is not one of the 25, is recognised in the language of the system. The live test in admin, the test page and the VIS-2 wake word widget send no language. Canary does not detect the language: speech in another language than the given one is not recognised correctly. Parakeet ignores the language.

Canary is downloaded into the subdirectory `canary-1b-v2` of the model directory; Parakeet stays where it is. The model that is not selected is not deleted: delete its files by hand to free the disk space. Recordings longer than 30 s are recognised by Canary in windows of 30 s, and it has no times per sentence: `segments`, `verbose_json`, `srt` and `vtt` get one segment per window.

Without internet access, download `encoder-model.int8.onnx`, `decoder-model.int8.onnx` and `vocab.txt` from [istupakov/canary-1b-v2-onnx](https://huggingface.co/istupakov/canary-1b-v2-onnx/tree/5ebc1520cef7b6b318b3526ad17adbfe00bc1bfc) into the subdirectory `canary-1b-v2` of the model directory.

## Requirements

- 64-bit Linux, Windows or macOS (x64 or arm64), Node.js 22 or newer
- At least 1.5 GB of free memory, 2 GB with Canary (better 4 GB or more in total)
- About 700 MB of disk space for the model, about 1 GB for Canary. An SSD is recommended on a Raspberry Pi
- Access to `huggingface.co` for the first start (or copy the model files manually, see below)
- js-controller 6 or newer, admin 7.6.20 or newer

**Linux on x64:** during the installation, `onnxruntime-node` additionally downloads about 200 MB of CUDA libraries from nuget.org. The adapter does not use them. You can prevent the download by installing with the environment variable `ONNXRUNTIME_NODE_INSTALL=skip`. On ARM (Raspberry Pi) and Windows nothing is downloaded.

## Setup

1. Install the adapter and create an instance, on the host where the speech recognition should run. In a multihost system this can be another host than the one of ioBroker.assistant.
2. On the first start, the adapter downloads the model (about 670 MB, Canary about 1 GB) and checks its SHA-256 checksums. The tab **Server** of the instance settings shows the progress. An interrupted download continues where it stopped.
3. Then the model is loaded (a few seconds) and the status becomes `ready`.

If the host has no internet access, download the three files `encoder-model.int8.onnx`, `decoder_joint-model.int8.onnx` and `vocab.txt` from [ysdede/parakeet-tdt-0.6b-v3-onnx](https://huggingface.co/ysdede/parakeet-tdt-0.6b-v3-onnx/tree/e5356bf6e24bdb7a269536b0e9e7869bc034b893) and copy them into the model directory. The adapter checks them on the next start.

## Use it in ioBroker.assistant

1. In the settings of ioBroker.assistant select the speech recognition **OpenAI (Whisper)**.
2. Enter the address of this adapter as **speech recognition server**, e.g. `http://192.168.1.10:9999` (without `/v1`, the assistant adds it). The tab **Server** of the instance settings shows the right address.
3. If an API key is set in this adapter, enter it as **key of the server**.

The assistant sends the names of devices, rooms and scenes in the `prompt` field. With the option **Use the words of the prompt**, these names are written as in the prompt: `io broker` becomes `ioBroker`, `wohnzimmer` becomes `Wohnzimmer`. Only spaces, hyphens and case are changed, never letters.

## OpenAI-compatible API

```
POST http://<host>:9999/v1/audio/transcriptions
Authorization: Bearer <API key>        (only if a key is set)
Content-Type: multipart/form-data

file=<audio file>
response_format=json | text | verbose_json | srt | vtt   (optional, default json)
prompt=<names, separated by commas>                       (optional)
language=<de, en, ru, ...>                                 (optional, for Canary; Parakeet detects the language)
model=<ignored>
```

Answer for `json`: `{"text": "Schalte das Licht im Wohnzimmer ein."}`

The audio can also be sent directly as body with `Content-Type: audio/wav`, the fields then go into the query string (`?response_format=text`).

- **WAV** (PCM 8/16/24/32 bit or float, any sample rate, mono or stereo) is read directly.
- **MP3, OGG/Opus, M4A, WebM, FLAC** need [ffmpeg](https://ffmpeg.org/). Either install it on the host (`sudo apt install ffmpeg`), or click **Download ffmpeg** on the tab **Recognition**: it downloads the static ffmpeg of [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) (20-30 MB, about 80 MB unpacked, checked against a fixed SHA-256) into `iobroker-data/voice.0/ffmpeg`, the same as ioBroker.assistant does. It is used at once, without a restart, while no path is entered. ioBroker.assistant sends WAV, so it does not need ffmpeg here.
- Recordings longer than **Maximal audio length** (default 300 s) are rejected. Recordings longer than 90 s are recognized in windows of 60 s (Canary: longer than 30 s in windows of 30 s).
- `GET /v1/models` lists the model, `GET /health` shows the status (without key).
- `/v1/audio/translations` is not supported: the adapter only transcribes.

Example with curl:

```bash
curl http://192.168.1.10:9999/v1/audio/transcriptions -F file=@command.wav -F response_format=text
```

## sendTo

```js
// a file on the host of the instance (WAV, or any format with ffmpeg)
sendTo('voice.0', 'transcribe', { file: '/opt/iobroker/voice.ogg' }, result => {
    if (result.error) {
        log(result.error, 'warn');
    } else {
        log(`${result.text} (${result.audioSeconds} s in ${result.inferenceMs} ms)`);
    }
});

// an audio file as Buffer or base64 text
sendTo(
    'voice.0',
    'transcribe',
    { audio: fs.readFileSync('/tmp/a.wav'), prompt: 'ioBroker, Wohnzimmer' },
    console.log,
);

// raw 16-bit mono PCM
sendTo('voice.0', 'transcribe', { pcm: buffer, sampleRate: 16000 }, console.log);
```

The answer contains `text` (with corrections), `rawText` (as recognized by the model), `audioSeconds`, `inferenceMs` and `queueMs`. With `segments: true` it also contains the sentences with their start and end times. `language: 'de'` tells [Canary](#speech-recognition-model) the language of the speech; Parakeet ignores it.

`sendTo('voice.0', 'getEndpoint', {}, console.log)` returns the address of the API.

## Live test in admin

The tab **Live test** of the instance settings records the microphone right there and shows the recognized text live, with intermediate results, the text with and without the correction dictionary and the computing times. The audio goes through the connection of admin (`sendTo`), not to the server of the adapter: the server needs neither HTTPS nor an API key for it, and it works while the port of the server is blocked. The browser still allows the microphone only if admin itself is opened over HTTPS or on `localhost`; otherwise the tab says so.

The tab is a web component of [`@iobroker/web-components`](https://github.com/ioBroker/web-components) (`admin/webcomponents/voice-live.json`) and needs an admin that shows them. Other hosts of web components can show it as well; its setting **Instance** selects the instance.

The live test sends 16-bit audio in messages of about 0.2 s (about 32 KB/s) and gets the new results with every answer:

```js
sendTo('voice.0', 'live', { action: 'start', language: 'de' }); // → { id, sampleRate, corrections }; language only for Canary, optional
sendTo('voice.0', 'live', { action: 'audio', id, seq: 1, pcm }); // pcm: 16 kHz mono 16-bit LE as base64 → { events }
sendTo('voice.0', 'live', { action: 'stop', id, seq: 2 }); // → { events }
sendTo('voice.0', 'live', { action: 'poll', id }); // → { events }, until an event "done" or "error"
```

A session without a message for 15 s is dropped.

## Test page

With the option **Enable test page**, the server shows a page at `http://<host>:9999/` that sends the audio of the microphone to the adapter and shows the recognized text live, with intermediate results. Browsers allow the microphone only on HTTPS pages or on `localhost`: enable **HTTPS** in the instance settings and select a certificate, or open the page through a reverse proxy with HTTPS.

The button **Open test page** in the instance settings uses the host name under which the browser reaches admin, if admin runs on the same host and is not behind a reverse proxy. If admin is opened as `http://localhost:8081`, the test page opens as `http://localhost:9999/` and the microphone works without HTTPS; a host name also matches the certificate better than the IP address. The status in the instance settings warns if the browser will block the microphone at the address of the test page, and the test page itself says so, too.

The page uses a simple level gate to find the end of a sentence (**Silence that ends a sentence**). On a Raspberry Pi an interval of 2-3 s for the intermediate results is better, because every intermediate result recognizes the whole sentence again.

## Correction dictionary

Words that the model regularly recognizes wrongly can be replaced. Each row has the correct text and the wrong variants, separated by commas. Case, spaces and hyphens do not matter (`io broker` also replaces `IO-Broker`), and only whole words are replaced.

## Settings

| Setting                   | Default                            | Meaning                                                                                                                                        |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| IP address, port          | 0.0.0.0, 9999                      | Address of the server. 0.0.0.0 makes it reachable from the whole network                                                                       |
| API key                   | empty                              | Clients must send it as `Authorization: Bearer <key>`. Recommended if the network is not trusted                                               |
| HTTPS                     | off                                | Needed for the microphone of the test page on other computers                                                                                  |
| Model directory           | `iobroker-data/voice/models` | E.g. a directory on an SSD. It is not part of the ioBroker backup                                                                              |
| CPU threads               | 0 (automatic)                      | Cores - 1, at most 4. On a busy host fewer threads can be faster                                                                               |
| Unload after idle minutes | 0                                  | Frees the memory when the model is not used. Loading it again takes a few seconds                                                              |
| Check free memory         | on                                 | Does not load the model with less than 1.1 GB of free memory                                                                                   |
| Maximal audio length      | 300 s                              |                                                                                                                                                |
| Path of ffmpeg            | empty                              | For other formats than WAV. Empty: the downloaded ffmpeg, else `ffmpeg` from the search path. Buttons **Check ffmpeg** and **Download ffmpeg** |

## States

| State                                                              | Meaning                                                                                  |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `info.connection`                                                  | The speech recognition can be used                                                       |
| `info.status`                                                      | `starting`, `downloading`, `verifying`, `loading`, `ready`, `idle` (unloaded) or `error` |
| `info.lastError`                                                   | Last error                                                                               |
| `info.modelProgress`                                               | Progress of the download in %                                                            |
| `info.endpoint`                                                    | Address of the API                                                                       |
| `stats.lastText`                                                   | Last recognized text (can be disabled)                                                   |
| `stats.lastAudioSeconds`, `stats.lastInferenceMs`, `stats.lastRtf` | Length, computing time and real-time factor of the last recognition                      |
| `stats.requests`                                                   | Number of recognitions                                                                   |
| `stats.queue`                                                      | Waiting requests                                                                         |

## How it works

The adapter runs the model in a separate Node.js process. A crash of ONNX Runtime does not stop the adapter, and the memory is freed completely when the model is unloaded. Only one recognition runs at a time; complete recordings (API, sendTo) go before intermediate results of the test page. If a client gives up waiting, its request is removed from the queue.

## License and model

The adapter is licensed under the MIT license. The model [nvidia/parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) is published by NVIDIA under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/); the adapter uses the ONNX conversion [ysdede/parakeet-tdt-0.6b-v3-onnx](https://huggingface.co/ysdede/parakeet-tdt-0.6b-v3-onnx) and [parakeet.js](https://github.com/ysdede/parakeet.js) (MIT). The model [nvidia/canary-1b-v2](https://huggingface.co/nvidia/canary-1b-v2) is published by NVIDIA under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) as well; the adapter uses the ONNX conversion [istupakov/canary-1b-v2-onnx](https://huggingface.co/istupakov/canary-1b-v2-onnx) and runs it the way [onnx-asr](https://github.com/istupakov/onnx-asr) does.

## VIS-2 wake word widget

This adapter also provides the `<iob-wakeword>` Web Component for VIS-2. Build it with `npm ci` and `npm run build`; `build:webcomponents` installs the Web Component dependencies from `src-webcomponents/package-lock.json`, and the component and its local model assets are then available under `admin/webcomponents/`. Add **Wake word microphone** to a VIS-2 view and select the `voice` instance. No second adapter or instance is needed. The microphone button enables or disables listening. The widget setting **Start microphone when loaded** controls automatic activation in runtime; the VIS editor never starts capture.

The VIS-2 editor groups the widget settings into named tabs: **Common**, **Microphone and recognition**, **Display and chat**, **Text processing and output**, and **Speech output**. Editor labels and runtime text share translations for all eleven ioBroker languages. The two feedback sounds are enabled by default; saved `false` values remain off.

The widget supports wake word, push to talk and combined modes. Before activation, microphone audio remains in browser memory. Once activated, 16 kHz mono PCM is sent through the adapter's existing `live` message protocol. It uses a local AudioWorklet, a configurable one-second ring buffer by default, and local energy-based voice activity detection. The widget can show intermediate and final transcripts and optionally send final text to a selected `smart-text2command` instance.

VIS-2 widget CSS controls the outer background, border, shadow and padding. Text styles such as color, font size, font family, weight and alignment inherit into the Web Component. Project CSS can style shadow content through `iob-wakeword::part(content)`, `::part(microphone)`, `::part(status)`, `::part(meter)` and `::part(transcript)`. For example: `#w00001 iob-wakeword::part(microphone) { border: 2px solid red; }`.

For command processing, choose **Text processor** `smart-text2command` or `assistant` and one of the installed instances of that adapter in the widget settings. Each processor has its own ioBroker `instance` field filtered to its adapter.

With `smart-text2command`, each final transcript is sent to `processText` in `execute` mode with a new request ID and a stable session ID. A clarification ID from a reply is sent with the next spoken answer. **Show conversation** displays final transcripts and the adapter's `response`, including clarification and error replies.

With `assistant` (ioBroker.assistant), each final transcript is sent to `ask` with `source: "vis-wakeword"`, and the `answer` is shown and optionally spoken. The assistant keeps the conversation history per source, so follow-up questions work. With **Speak processor replies** on, the request also sets `spoken: true`, and the assistant answers in a short form meant for speech. Because a language model can take longer, the widget waits up to 120 seconds for an answer (30 seconds for smart-text2command).

The number of messages kept in browser memory is configurable; the widget does not save the conversation. The selected adapter receives the text and may log it (ioBroker.assistant keeps it in its journal). The processor integration is isolated in `src-webcomponents/src/processors.ts` so further adapter protocols can be added later.

**Speak processor replies** is off by default. Select **Browser voice** or **Piper on adapter** in the widget settings. For browser speech, a gear icon in the running visualization opens the voice menu. It lists that browser's voices with `(local)` or `(remote)` labels. **Automatic (local)** is the default; choosing another browser voice is stored per widget and browser. The VIS-2 editor does not show the gear or start microphone capture. A remote browser voice may send reply text to its provider for synthesis. For Piper, the adapter's configured default voice or a widget override is used. The Piper choices are loaded from the adapter with `selectSendTo`; VIS-2 with `@iobroker/web-components` 0.8 support shows a dropdown, while older hosts fall back to a text field. Speech pauses wake word detection until playback ends; disabling the microphone stops the widget's speech output. Browser autoplay rules may require an initial click before speech can play.

## Local Piper speech server

The adapter exposes a generic `sendTo` API for local speech synthesis. It does not send audio to another adapter itself. The caller can decode the base64 WAV and play it, store it, or hand it to another service. Synthesis uses a Piper command line runtime on the ioBroker host and does not require Python. The first request downloads a checksum-pinned Piper runtime and the selected voice into the adapter data directory. After that, synthesis works without Internet access. The host needs `tar` for the one-time runtime extraction. Windows x64, Linux x64/arm64/armv7, and macOS x64/arm64 have pinned runtime archives; other platforms currently return an explicit error.

The **Speech synthesis (Piper)** adapter tab is the last tab. It offers three standard voices: German Thorsten, German Kerstin, and English Kristin. French Siwis and Spanish CarlFM are additional catalog voices; select one and click **Download selected voice** to fetch it in advance. The selected default voice is also downloaded automatically on first synthesis. All five catalog models are pinned to a tested repository revision and checked with SHA-256. To use another Piper voice, upload a matching `name.onnx` and `name.onnx.json` through **Upload custom Piper voice files**. Both files must use the same base name (letters, digits, dots, underscores or hyphens, starting with a letter or digit); the JSON must contain an eSpeak voice, phoneme mapping and a sample rate from 8 to 48 kHz. Models are limited to 150 MiB and JSON files to 256 KiB. Uploads appear as `custom:name` in `piperVoices` and can be selected in the adapter or widget. Compatibility with the bundled Piper runtime is checked by synthesis; the user is responsible for the model's license.

```javascript
sendTo(
    'voice.0',
    'synthesize',
    {
        text: 'Hallo ioBroker',
        voice: 'de_DE-thorsten-low', // optional; otherwise the configured default
        lengthScale: 1, // optional, 0.5 to 2
        noiseScale: 0.667, // optional, 0 to 2
        noiseW: 0.8, // optional, 0 to 2
        speaker: 0, // optional, for multi-speaker voices
        format: 'wav',
    },
    response => {
        if (response.error) throw new Error(response.error);
        // response.audio: base64 WAV; response.mimeType: 'audio/wav'
        // Also includes format, filename, sampleRate, channels, durationMs and voice.
        const wav = Buffer.from(response.audio, 'base64');
        // The caller decides what to do with wav.
    },
);
```

`sendTo('voice.0', 'piperVoices', {}, callback)` lists the catalog with `value`, `label`, `description`, `language`, `license`, `standard`, and `installed`. Here `license` names the source dataset license from the model card. `sendTo('voice.0', 'downloadPiperVoice', {voice: 'fr_FR-siwis-low'}, callback)` downloads a catalog voice. A request is limited to 1,000 text characters; at most eight synthesis requests may be queued, and a response is limited to 8 MiB of WAV data. The synthesize command returns `{error: string}` on failure through the usual adapter callback. Piper writes a temporary WAV file in the adapter data directory during synthesis; the adapter removes it after the response or an error.

The Piper runtime is downloaded from the [Piper 2023.11.14-2 release](https://github.com/rhasspy/piper/releases/tag/2023.11.14-2). Voice files come from the pinned [Piper voices repository](https://huggingface.co/rhasspy/piper-voices/tree/e9ab671f2a0e50a701b34361136ba3e6a3a9eb0c). The source dataset licenses in the model cards are [Thorsten: CC0](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/thorsten/low/MODEL_CARD), [Kerstin: CC0](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/kerstin/low/MODEL_CARD), [Kristin: public domain](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/kristin/medium/MODEL_CARD), [Siwis: CC BY 4.0](https://huggingface.co/rhasspy/piper-voices/blob/main/fr/fr_FR/siwis/low/MODEL_CARD), and [CarlFM: public domain](https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_ES/carlfm/x_low/MODEL_CARD). These are dataset statements, not blanket licenses for the model or runtime. The runtime includes third-party components such as eSpeak NG with their own licenses; the adapter's MIT license does not replace those terms. Check the individual model card before redistributing a downloaded voice.

The adapter's **Wake word widget** configuration tab selects up to three local ONNX classifiers and their threshold. `io_broker` is the default; `hey_jarvis`, `alexa`, `hey_mycroft`, and `hey_rhasspy` are bundled. Custom `.onnx` classifiers can be uploaded there. They must accept `[1,16,96]` float32 embeddings and emit a score; changing the model label does not train another wake word. The bundled feature and additional wake word models have separate licenses documented in [model provenance](/#/docs/adapterref/iobroker.voice/admin/webcomponents/models/SOURCES.md). The OpenWakeWord release assets are CC BY-NC-SA 4.0, which limits commercial distribution or use without separate rights.

Additional ONNX wake words can be downloaded from <https://openwakeword.com/library> after registration.

Microphone access requires HTTPS or localhost and browser permission. Automatic start may still require a user click under browser audio policies. Background tabs, screen lock, and mobile power management can pause capture. Configure the widget only on a view that stays mounted if continuous listening across VIS pages is required. Run `npm run check`, `npm run lint`, `npm test`, and `npm run build` for verification. `npm run test:wakeword` includes a local ONNX/WASM inference smoke test. Live accuracy and tablet behavior require testing with the target microphone and VIS-2 installation.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-11-18)

- (@sadam6752-tech) A second speech recognition model, NVIDIA Canary 1B v2 (setting "Speech recognition model"): it is told the language of the speech (`language` of `sendTo`, of the OpenAI API, of `start` of the live test and of `hello` of the WebSocket; ioBroker.assistant sends the language of the wake word), so accented speech stays in its language instead of turning into English or Cyrillic words; about twice the time of Parakeet

### 0.1.8 (2026-11-17)

- (@GermanBluefox) Fixed the findings of the repository checker: responsive sizes in the admin, missing translations, Dependabot auto-merge workflow and old news entries (#7)
- (@GermanBluefox) `common.webComponents` carries the short form of the wake word manifest (tag, name, icon, size), so that VIS-2, Aura and other hosts can list the widget before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 0.1.7 (2026-11-16)

- (@GermanBluefox) **Renamed from ai-parakeet to voice.** A new instance takes over the settings, the downloaded model, the Piper files and the uploads of `ai-parakeet.<n>` with the same number, see [Moving from ai-parakeet](#moving-from-ai-parakeet)

### 0.1.6 (2026-11-16)

- (@GermanBluefox) The wake word widget can send recognized text to ioBroker.assistant (`ask`) as an alternative to smart-text2command
- (@GermanBluefox) Removed the npm workspace, so the release script works again

### 0.1.5 (2026-11-16)

- A "wakeword" widget has been added as a web component capable of communicating with "smart-text2command." It is designed to be extensible for communication with the assistant adapter or other adapters.
- An ioBroker "wakeword" function with improved detection performance has been integrated.
- A chat display has been added.
- Speech synthesis for audio output via the browser has been implemented.
- An option to select the voice used for speech synthesis has been added.
- "Piper TTS" has been integrated on the server side; audio data can be requested using the "sendTo" command.
- Speech synthesis options (browser/server) have been added for clients that do not support native speech synthesis.
- (GermanBluefox) Removed the prepublishOnly script and added CHANGELOG_OLD.md and the dependabot automerge workflow (#5)

## License

MIT License

Copyright (c) 2026 oweitman <oweitman@gmx.de>

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