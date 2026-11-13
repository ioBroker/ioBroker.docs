<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# ioBroker.assistant

An LLM-based assistant for ioBroker. Ask questions in natural language and let the
assistant read or control **any ioBroker state** — it uses an LLM with **tool-calling**
over the native ioBroker API, so there is no rigid rule engine and no virtual-device tree.

> Status: **early proof-of-concept.** Text in → answer out. Audio (satellites, STT/TTS)
> and on-device wake word are planned next (see Roadmap).

## What works today

- Provider: **OpenAI** (and OpenAI-compatible endpoints via Base URL) or **Anthropic (Claude)**.
- The LLM can call these tools, all backed by the native adapter API:
  - `list_rooms`, `list_functions` — read `enum.rooms` / `enum.functions`
  - `find_states({ room?, func?, query? })` — find states + current values
  - `get_state({ id })` — read one value
  - `set_state({ id, value })` — control a device (can be disabled in settings)
- Text interface via two states:
  - write your question to `assistant.0.text.request`
  - read the answer from `assistant.0.text.response`
- Or from a script: `sendTo('assistant.0', 'ask', { text: 'Wie warm ist es im Wohnzimmer?' }, cb)`

## Configuration

In the adapter admin (Instances → assistant → ⚙):

| Setting                  | Meaning                                           |
|--------------------------|---------------------------------------------------|
| Provider                 | `openai` or `anthropic`                           |
| Model                    | e.g. `gpt-4o-mini`, `gpt-4o`, `claude-sonnet-4-6` |
| API key                  | your provider API key                             |
| Base URL                 | optional endpoint override (e.g. Groq)            |
| Allow controlling states | if off, the assistant is read-only                |
| System prompt            | persona / behaviour                               |

## Voice satellites (Hannah)

The adapter runs a UDP voice server that speaks the **Hannah** satellite protocol
(`0x01` control / `0x02` mic audio / `0x03` TTS), so an existing Hannah Pi/ESP satellite can
talk to it directly. STT → LLM → TTS runs in the adapter; the satellite only captures audio,
detects the wake word and plays the reply.

**On the adapter side:** open the **Voice** tab, tick *Enable voice server*, pick the STT/TTS
providers + credentials, keep the port (default `7775`). When the instance starts the log shows:

```
Voice server listening on UDP 7775
```

Recognised text and the reply also appear in `assistant.0.text.request` / `.text.response`, with
the origin in `assistant.0.text.querySource` (satellite name, `chat`, or empty for a direct state write).

**Announcements / TTS:** write to `assistant.0.tts.text` to speak on **all** satellites, or to
`assistant.0.satellites.<id>.tts` for **one**. The value is spoken as text (via the configured TTS engine),
or — if it is a URL/path to an audio file (`.mp3`/`.wav`/…) — played back.

> **Playing audio files needs [ffmpeg](https://ffmpeg.org/) on the host** (Windows and Linux):
> Linux → `sudo apt install ffmpeg`; Windows → install ffmpeg and add it to the `PATH`, or enter its full path
> under **Path to ffmpeg** on the Voice tab. Without either, **Download ffmpeg** on the Voice tab fetches a static
> build (ffmpeg-static, 20–30 MB) into the data directory of the instance.
> Plain-text TTS does not need it — only audio-file playback (mp3/wav/…) does.

### Start a Hannah satellite pointed at this adapter

Match the audio rates to your device (`--sample-rate` = mic, `--tts-rate` = speaker); list devices
and supported rates with `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"`.

The stock Hannah satellite locates the server via **MQTT discovery**, so it needs a broker reachable
and one retained discovery message. Point `--host` at the ioBroker host explicitly:

```bash
 # 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

 # 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

Success looks like `Registrierung bestätigt (ACK empfangen)` in the satellite log and
`Satellite registered: wohnzimmer` in the adapter log. Then say the wake word → speak → the answer
is spoken back.

### Without an MQTT broker

The stock Hannah satellite always connects to MQTT (even with `--host`) and exits if no broker is
reachable. To run **fully broker-free**, skip that one call — in `satellite.py`,
`_resolve_hannah_address()`:

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

Registration, audio and TTS all run over UDP, so only the (optional) MQTT status reporting is lost.
Then start with just `--host` (no `--broker` needed):

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### Native Node.js satellite

A standalone **Node.js satellite** is available — no ioBroker, no MQTT broker required. On a Pi (or any
Linux/Windows/macOS box) with a mic + speaker:

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

It runs the wake word (OpenWakeWord) on the device and streams to this adapter's voice server. See
[`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) for setup, the
`check` diagnostics and `install` (systemd service).

### Wyoming endpoint (experimental)

[Wyoming](https://github.com/rhasspy/wyoming) is the open voice protocol from the Home Assistant /
Rhasspy project (JSONL events over **TCP**), used by `wyoming-satellite` and other Rhasspy-style
services.

> ESPHome voice devices (including the **Home Assistant Voice PE**) do **not** speak Wyoming — they
> speak the ESPHome native API. Use the transport below for those.

Enable **Also accept Wyoming clients (TCP)** in the Voice tab (default port `10700`). The adapter then
exposes a Wyoming server that bridges to the same pipeline: `audio-start`/`audio-chunk`/`audio-stop` →
STT → answer → TTS streamed back as `audio-*` (plus a `transcript` event); `describe` → `info`;
`synthesize` → TTS.

> The protocol framing is unit-tested, but interop with a real `wyoming-satellite` is still
> **experimental** — please report what works. Uses the same STT/TTS providers as the UDP voice server.

### ESPHome voice satellites

Devices that run the **ESPHome voice assistant** — the [ThirdReality Voice & Music Assistant
(Dev Edition)](https://www.thirdreality.com/products/voice-music-assistant-dev-edition), the
**Home Assistant Voice PE**, or any box running
[linux-voice-assistant](https://github.com/OHF-Voice/linux-voice-assistant) — do not connect to a
server: they *are* one, waiting on **TCP 6053**. So here the adapter is the client and dials them,
the way Home Assistant would. Wake word, echo cancellation and playback stay on the device; the
adapter does speech recognition, the answer and speech synthesis.

Enable **Also drive ESPHome voice satellites** in the Voice tab and add one row per device
(address, optional port, room). Nothing needs to be installed or flashed on the device, and no
ESPHome tooling is involved — "ESPHome native API" is just the protocol name.

Two things are different from the other transports:

- **The adapter decides when you stopped talking.** These devices stream until the server stops them,
  so end-of-speech detection runs here — tune it with **End of speech after (ms of silence)** if
  replies cut you off or the assistant waits too long.
- **The spoken reply is fetched, not pushed.** The device plays a URL, so the adapter runs a small
  HTTP server (**Media server port**, default `8099`) that serves the clip for a couple of minutes.
  It must be reachable *from the device*; the address is derived from each device connection, and
  only needs setting by hand behind NAT/Docker/VLAN.

Announcements (`tts.text`, `satellites.<id>.tts`, timers and alarms) reach these satellites too, and
each one shows up under `assistant.0.satellites.*` like any other.

> Developed against the ThirdReality speaker's firmware sources and covered by a loopback test
> against a fake device; feedback from real hardware is welcome.

### Wake words: which model for which satellite

The wake word is always detected **on the satellite**, so the model format depends on the satellite
type. There are two model families, and both can come as `.tflite` — they are **not interchangeable**:
a model trained for one does not run on the other. To use the same phrase on both kinds of satellites,
train it twice.

| Satellite                                                                         | Engine                                                     | Custom model                                                          | Where it goes                                                                     |
|-----------------------------------------------------------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| ESPHome (ThirdReality speaker)                                                    | [microWakeWord](https://github.com/kahrendt/microWakeWord) | `.tflite`, optionally with its `.json`                                | this adapter: **Satellites** tab → ⚙ → *Upload own wake word*                     |
| Native satellite (`assistant-satellite` adapter, `@iobroker/assistant-satellite`) | [openWakeWord](https://github.com/dscripka/openWakeWord)   | one self-contained `.onnx`                                            | the satellite's settings: upload, then pick it in `wakewordModel` (or a URL/path) |
| Hannah Pi satellite (UDP)                                                         | openWakeWord                                               | `.onnx` (`.tflite` only with `inference_framework: tflite` on armv7l) | `--wakeword-model <path>`                                                         |
| Wyoming clients                                                                   | whatever the client runs                                   | —                                                                     | on the client; not managed by this adapter                                        |

**microWakeWord (ESPHome)**

- The model takes 40 spectrogram features per frame: input `[1, n, 40]`, **quantized** (int8 in, uint8
  out) — like the official models in
  [esphome/micro-wake-word-models](https://github.com/esphome/micro-wake-word-models).
- Train your own with microWakeWord's `notebooks/basic_training_notebook.ipynb` (Python 3.10, a GPU
  helps a lot). The result is
  `trained_models/wakeword/tflite_stream_state_internal_quant/stream_state_internal_quant.tflite` —
  rename it after the phrase, e.g. `vita_nova.tflite` becomes "Vita Nova".
- The `.json` is optional. Without it the adapter takes the phrase from the file name, the language from
  `voiceLanguage`, the cutoff `0.97` and a sliding window of `5`. Provide one to set a different
  `micro.probability_cutoff`:

  ```json
  {
    "type": "micro",
    "wake_word": "Vita Nova",
    "model": "vita_nova.tflite",
    "trained_languages": ["de"],
    "version": 2,
    "micro": { "probability_cutoff": 0.97, "sliding_window_size": 5 }
  }
  ```

- The upload checks the model and rejects anything the device cannot run, with the reason — an
  openWakeWord model is named as such.
- The device downloads the model from the media server when you **activate** the chip; at most two wake
  words are active at a time. A downloaded model stays on the device (the API cannot delete it).
  A device whose firmware does not take external wake words does not list the uploaded one.

**openWakeWord (native and Hannah satellites)**

- The model takes speech embeddings of 96 values, e.g. input `[1, 16, 96]`, float — which is why it
  does not run on ESPHome devices.
- openWakeWord's training notebook exports `.onnx` and `.tflite`. The native satellite needs the
  `.onnx` as **one** file — a model split into `.onnx` + `.onnx.data` is not supported.
- Built into the native satellite: `hey_jarvis`, `alexa`, `hey_mycroft`, `hey_rhasspy`; up to three
  wake words at once.

## Roadmap

1. **Text assistant (done)** — LLM + tool-calling over ioBroker states.
2. **Fast-path** for common commands (on/off/timer) without an LLM round-trip.
3. **TTS / STT engines** (Polly / Azure / OpenAI / AWS Transcribe) as adapter modules + config.
4. **Satellite endpoint** — UDP audio + MQTT control, so ESP/Pi satellites talk to the adapter directly.
5. **Wake word** — trained/managed via ioBroker, running on the device.
6. **Wyoming server endpoint** — accept `wyoming-satellite` and Rhasspy-style clients.
7. **ESPHome satellites (done)** — drive ThirdReality / HA Voice PE / linux-voice-assistant devices.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.8.0 (2026-11-13)
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`
* (@GermanBluefox) The built-in answers (time, devices, timers, weather …) come in the language the question was asked in, not always in the voice language: "скажи, сколько сейчас времени" on a German satellite is answered in Russian, "what time is it" in English and with an English voice

### 1.7.0 (2026-11-12)
* (@sadam6752-tech) A Piper voice set for one language is only used for it, a Russian answer on a German satellite gets a Russian voice instead of being spelled letter by letter; the language pi-agent 0.10.1 reports for an answer is used for its voice (#27)
* (@GermanBluefox) The language of an answer is taken for every voice: UDP and Wyoming satellites, announcements and the voice test too, and Azure, AWS and OpenRouter voices set for one language are only used for it. New table "Voice per answer language" in the Voice tab (e.g. ru → ru_RU-dmitri-medium); Piper loads its voices at the start. The language pi-agent reports is also found for its questions to confirm, and a mark that the letters contradict is not believed

### 1.6.0 (2026-11-10)
* (@GermanBluefox) Local LLM: new tab "Local models" to keep several models, pick the active one (saving restarts the instance), choose the folder, see sizes and free space, download presets (with description, size and languages) or own GGUF links, delete models, and see statistics per model (questions, answers, hand-overs, failures, tokens/s, time to the first token, load time). A benchmark on the host checks that the loaded model hands home questions over and answers general ones correctly. The model folder can be picked on the disk of the host (Admin 8.3.11+)
* (@GermanBluefox) Settings split into topic tabs: AI, Commands, Local models, Devices (with the permissions), Services, Triggers, Voice, Satellites (with the connections of the satellites) and Chat as the last one; rarely needed options (max tokens and system prompt, ffmpeg, end of speech and diagnosis) are in sections that open on a click
* (@GermanBluefox) Local LLM: refusals like "as an AI language model, I don't have the ability…" are handed over to the next tier instead of being said to the user (found with the new benchmark)
* (@GermanBluefox) OpenAI reasoning models: reasoning effort from the system AI settings; when function tools are rejected, a chosen effort is kept over the Responses API, otherwise the request is retried with effort 'none' (#25)
* (@GermanBluefox) A cloud model that runs out of tokens without a word (e.g. in its reasoning) is reported as an error instead of an empty answer that read as "done"

### 1.5.0 (2026-11-09)
* (@GermanBluefox) Added an assistant chat and a live view of the voice satellites for Aura and other dashboards

### 1.4.15 (2026-11-08)
* (@GermanBluefox) OpenAI: use `max_completion_tokens` so newer (reasoning) models like gpt-5-mini work (#21)

### 1.4.14 (2026-11-07)
* (@GermanBluefox) ESPHome satellites, dialog mode: a satellite that does not listen again after an answer (it stopped the answer itself — stop word, tap) ends the mode instead of leaving it on while nobody listens; the log says how much of the answer was played

### 1.4.13 (2026-11-07)
* (@GermanBluefox) If fullcalendar is installed, it must be 3.1.0 or later (the version with the event API that commands for later use)
* (@GermanBluefox) Devices renamed in the device list keep their room, type and all their states again (`@iobroker/mcp-server` 1.9.2): before, such a device lost its room, so "the light in the kitchen" was not understood, and a light lost the switch next to its level
* (@GermanBluefox) Devices in a room hidden from the smart home (iot, `smartName: false`) are no longer listed without a room
* (@GermanBluefox) The AI sees what each state of a device is (switch, level, read-only) and that the level alone does not switch a device on
* (@GermanBluefox) The AI (cloud model and pi-agent) is told to answer in the language of the question
* (@GermanBluefox) Videos: `ask` also takes `video: { url }` with an `iobdisk://` URL - the video stays on the disk of the sender's host (js-controller 8.0+) and can be read from any host. `{ adapter, path }` of the file storage still works. Telegram sends the URL

### 1.4.12 (2026-11-05)
* (@GermanBluefox) ESPHome satellites: dialog mode — "ioBroker, Dialogmodus an" and the satellite listens again after every answer without the wake word (pauses are fine, nothing understood just listens on), "Dialogmodus aus" or a stop ends it, after 5 minutes without a request it ends by itself; state `satellites.<id>.dialog` shows and switches it

### 1.4.11 (2026-11-05)
* (@GermanBluefox) Speech recognition with the adapter ai-parakeet (NVIDIA Parakeet on the CPU, offline, 25 European languages) as provider or fallback — the audio goes to its instance over the message bus, so it may run on another host
* (@GermanBluefox) Settings: buttons "Install pi-agent" and "Install ai-parakeet" install the adapter on the host of this instance if needed (from the repository, else from npm), create an instance and select it
* (@GermanBluefox) Chat: dialog mode — the browser microphone stays open, everything said becomes a question (recognized by the assistant's speech recognition), the answer is read aloud, then it listens again

### 1.4.10 (2026-11-05)
* (@GermanBluefox) ESPHome satellites: internet radio and music from a URL — `controls.<media player>.url` plays it as media (replies and announcements only duck it, play/pause/stop/volume act on it), empty or `stop` stops. Playlists (.pls/.m3u) are resolved; a stream the device cannot decode (AAC, HLS, …) runs through ffmpeg and is served to it as FLAC; `transcode` forces that

### 1.4.9 (2026-11-05)
* (@GermanBluefox) ESPHome satellites with a screen: the yes/no button did not answer pi-agent's question — the follow-up microphone carries the last wake word (ESPHome never clears it) and was taken for a new request. A follow-up is now recognised by the open question (until the next answered request, at most 30 s after the reply), and a stop the firmware sends right after the press no longer drops the answer
* (@GermanBluefox) pi-agent: a request from a satellite also carries `satellite` (its id under `satellites.*`) and `tts` (its `tts` state), so pi-agent can speak there later (reminders, background tasks)
* (@GermanBluefox) Timers of a satellite: `setTimer` takes `satellite`, `seconds`, `name` and `announce` (said word for word when it fires); `listTimers`/`cancelTimer` take `satellite`. An ESPHome satellite shows and rings such a timer like one set there by voice

### 1.4.8 (2026-11-05)
* (@GermanBluefox) ESPHome satellites: a firmware update entity gets a "check" button (`controls.<update>.check`) that makes the device look for a new version now, instead of at its next boot or its 6-hour check
* (@GermanBluefox) ESPHome satellites: `text` entities are mirrored as writable states (labels and units of a satellite with a screen can be set from ioBroker). Values outside the device's length or pattern are refused with a warning; a password text is not mirrored
* (@GermanBluefox) Docs: the optional entities of a satellite with a screen (`confirm_answer`, `display_language`, `text`)

### 1.4.7 (2026-11-04)
* (@GermanBluefox) Voice messages: `ask` also takes a recording (`audio` as base64 plus `format`, e.g. `ogg`) instead of text. It is recognised with the speech recognition of the Voice tab and answered like a text question; the reply carries the recognised text as `heard`. Telegram uses it for voice messages
* (@GermanBluefox) Path to ffmpeg can be set on the Voice tab (empty = from the search path), with a button that checks it
* (@GermanBluefox) Hosts without ffmpeg: "Download ffmpeg" on the Voice tab fetches a static build of ffmpeg-static (20-30 MB, checked against a fixed SHA-256) into the data directory of the instance; it is used while no path is entered
* (@GermanBluefox) Pictures: `ask` takes `images` (base64 JPEG/PNG/GIF/WebP, at most 4) and passes them to the cloud model (OpenAI-compatible, Anthropic, pi-agent); without a text the question is "What is in this picture?". Rules and the local model are skipped for them. Telegram uses it for photos
* (@GermanBluefox) Videos: `ask` takes a reference `video: { adapter, path }` into the file storage (never the content). Videos are not looked at yet: without a question the answer says so, with one the model is told
* (@GermanBluefox) ESPHome: after a reply that asked something, every later reply re-opened the microphone. The firmware keeps `continue_conversation` until it is told "0", so every reply now says it, like Home Assistant does
* (@GermanBluefox) Satellites only listen again after a reply that asks something: a [[LISTEN]] marker (pi-agent's confirmations) or a question mark at the end. A question mark in the middle of a reply no longer opens the microphone
* (@GermanBluefox) ESPHome satellites with a screen: yes/no buttons (event `confirm_answer`) answer the open question like a spoken "yes"/"no" - the microphone closes, the reply is announced on that satellite. A select `display_language` is set to the voice language when the satellite connects

### 1.4.6 (2026-11-03)
* (@GermanBluefox) Speech recognition: own OpenAI-compatible server (Voice tab, provider OpenAI, "Speech recognition server"), e.g. a local whisper-large-v3-turbo in speaches, faster-whisper-server or LocalAI. It needs no OpenAI key and never gets it; an own key for the server is optional

### 1.4.5 (2026-11-03)
* (@GermanBluefox) ESPHome satellites: spoken replies go out in the format the device's media player announces (FLAC at its sample rate, as Home Assistant does; MP3/Opus via ffmpeg). Since ESPHome 2026.10 the player is built with only the codecs its pipelines use, and a WAV reply did not play at all. Devices that announce no formats keep getting WAV
* (@GermanBluefox) ESPHome satellites: when the device ends the conversation itself (button, or the wake word said again), it now gets its RUN_END. It stayed in the conversation, and every further wake word only sent another stop
* (@GermanBluefox) ESPHome satellites: an utterance that is dropped (silence, or no text recognised) ends with the error `stt-no-text-recognized` before RUN_END, like Home Assistant. A RUN_END right after the end of speech was lost while the device was still stopping its microphone, and the device waited for an answer forever
* (@GermanBluefox) ESPHome satellites: device controls get their state names from the entity names again. ESPHome 2026 (API 1.19) no longer sends `object_id`, so every control ended up as `satellites.<id>.controls.` and the log filled with errors. Latin names give the same ids as before
* (@GermanBluefox) Satellites whose row was deleted from the ESPHome table are removed at the next start, and an offline satellite can be removed in the Satellites tab

### 1.4.4 (2026-11-03)
* (@GermanBluefox) ESPHome satellites: a sound only counts as speech once it has lasted about 200 ms. After a false wake a single click opened the gate, and Whisper made "и все просят." of the amplified silence around it
* (@GermanBluefox) ESPHome satellites: when a device stops sending audio without ending the stream, the recording is closed after 2 seconds instead of the 30-second pipeline timeout, during which the satellite showed "listening"

### 1.4.3 (2026-11-03)
* (@GermanBluefox) An empty question sent with `sendTo('ask')` is rejected (`{error: 'empty question'}`) instead of going to the model with nothing but the time context, and the log names the sender once a minute. A script that asked on every answer looped about once a second and used pi-agent tokens. The log line of every `ask` now names the sender

### 1.4.2 (2026-11-03)
* (@GermanBluefox) ESPHome satellites: after 2.5 seconds of speech a pause may be half as long again before the request ends, so a pause for thought no longer cuts off a longer request. Short commands close as fast as before
* (@GermanBluefox) ESPHome satellites: speech recognition gets the recording without the device's chirp or beep and without the silence around the speech, and quiet speech is amplified (up to ×10). Whisper made "Продолжение следует..." of the beep and the silence
* (@GermanBluefox) The speech-to-text fallback also steps in when the first engine returns no text for speech
* (@GermanBluefox) Request details: the speech recognition step shows the level profile of the recording (RMS per 100 ms), where speech started, why the recording ended and what went to the recognition

### 1.4.1 (2026-11-03)
* (@GermanBluefox) Satellite settings: compound controls show their name ("Firmware Update") instead of the object id ("thirdreality_firmware_update"), and values of ESPHome devices no longer carry float noise (0.5 instead of 0.5000000237487257, step 0.001 instead of 0.0010000000474974513). Existing number controls get the cleaned range on the next connect
* (@GermanBluefox) Satellite settings, firmware update: the install button only appears when another version is available, and a running update shows its progress as a bar

### 1.4.0 (2026-11-03)
* (@GermanBluefox) ESPHome satellites: new column "Speech threshold" per device (empty = 250, as before). A device with a quiet microphone, for example a phone running a satellite app, reacted to the wake word but dropped the command as silence unless one spoke loudly right next to it. When an utterance is dropped although it came close to the threshold, the log now says so and suggests a value
* (@GermanBluefox) Voice: the length limit for spoken answers is now a setting ("Longest spoken answer", Voice tab, default 400 characters ≈ 25–30 seconds, 0 = no limit). Longer answers stopped after about half a minute without notice; the log warning now names the setting. For a spoken request the AI model (cloud LLM and pi-agent) is told the limit and asked not to read out state ids or long numbers, so the answer fits instead of being cut
* (@GermanBluefox) ESPHome satellites: the microphone closes again when nobody starts speaking within 5 s of the wake word (8 s after a follow-up question). A false wake kept it open for 12.6 s before
* (@GermanBluefox) ESPHome satellites: new option "Keep dropped recordings for diagnosis". Recordings dropped as silence or returned empty by the speech recognition are stored as WAV plus a JSON with the detector levels under Files → assistant.N/captures (the newest 50), to find out what set a satellite off. Off by default: they contain audio from the room

### 1.3.1 (2026-11-02)
* (@GermanBluefox) pi-agent: the language of the satellites goes along with every request, so pi-agent asks its confirmation questions ("… Say yes or no.") in it instead of the system language. Before, a Russian satellite was asked "Sag ja oder nein", and the German "Ja" came back empty from the speech recognition: nothing happened. Needs a pi-agent version that knows the field
* (@GermanBluefox) Requests about a script ("Skript", "script", "скрипт", also JavaScript/Blockly) always go to the cloud model: routines, rule engine and local LLM read their details as commands of their own ("write a script that switches the kitchen light every hour" was answered with the time). A reply to a question of the cloud model about the script goes there too
* (@GermanBluefox) Voice: speech that the recognition returns as empty text is now logged ("Voice Q (…): (empty)") for ESPHome and native satellites too, instead of ending without a trace
* (@GermanBluefox) Chat: opens at the newest entry, and a new request scrolls into view again. Before, the tab often opened at the oldest entries

### 1.3.0 (2026-10-28)
* (@GermanBluefox) Commands for later: "turn off the light in 2 hours" or "blinds to 50 % at 10 pm" becomes an event in the calendar (fullcalendar adapter) instead of running now; the AI can plan, list and cancel events. Before, the rule engine switched such commands at once. Needs a fullcalendar version with the new event API (>= 3.1.0)
* (@GermanBluefox) Settings: the state of a presence row is picked with the object browser, the kind of a presence row or announcement target is a dropdown
* (@GermanBluefox) New provider "System-wide AI settings (admin)", the default for new instances: provider, model and key come from the AI settings of the admin system settings, a change there restarts the instance. An instance without a key of its own takes them too
* (@GermanBluefox) New provider OpenRouter
* (@GermanBluefox) OpenRouter for speech recognition and voice: one key for the speech models of many vendors (Whisper, Deepgram, ElevenLabs, Gemini TTS, …), models and voices are listed in the settings (default voice model: ElevenLabs Flash v2.5)
* (@GermanBluefox) Voice test on the Voice tab: speak a test sentence, and test speech recognition with the browser microphone, an audio file or a round trip, all with the unsaved settings
* (@GermanBluefox) "Confirm switch commands with a tone" now also covers commands the AI (or pi-agent) carried out
* (@GermanBluefox) Spelled-out numbers up to 100 in commands ("Lautstärke auf fünfzig Prozent", "twenty five percent", "двадцать пять процентов"), and the AI sees the volume of each voice satellite, so it no longer turns up a media device of the room instead
* (@GermanBluefox) New provider "Adapter pi-agent": the durable agent of the pi-agent adapter answers what the local tiers cannot, with one conversation per satellite/chat

### 1.2.0 (2026-10-26)
* (@GermanBluefox) Own wake words for ESPHome satellites: upload a microWakeWord model in the satellite settings, the device downloads it when it is activated. Models the device cannot run (e.g. openWakeWord) are rejected on upload with the reason
* (@GermanBluefox) Voice answers come faster: the device list for the offline rule engine is built once and shared for a minute instead of up to three times per spoken command
* (@GermanBluefox) The local LLM is now the fallback for when the cloud LLM fails; "Ask the local model first" restores the old order. It is stopped after a configurable timeout, answers shorter and leaves one CPU core free
* (@GermanBluefox) When an answer asks back, UDP satellites now keep the microphone open for the reply too (needs `@iobroker/assistant-satellite` 0.2.0)
* (@GermanBluefox) "Louder", "quieter", "volume 5" change the volume of the satellite that heard it - ESPHome, ioBroker-native and UDP satellites
* (@GermanBluefox) "How's the weather tomorrow?" is answered from the weather adapter without an LLM
* (@GermanBluefox) Fixed: Russian questions with "будет" ("will it be …") were taken for alarm queries

### 1.1.0 (2026-10-25)
* (@GermanBluefox) YouTube on the TV: "play the channel XY" finds the channel, video or playlist on YouTube (no API key needed)

### 1.0.3 (2026-10-23)
* (@GermanBluefox) The Chat tab now shows every request of the last hours live - from satellites, Telegram, scripts and the chat itself - with the satellite, the detected wake word, which stage answered (rule-based NLU, routine, local LLM, cloud LLM), the tool calls and the state ids that were read and written. How many hours are kept is set in the settings (0 = record nothing)

### 1.0.2 (2026-10-14)
* (@GermanBluefox) Added the missing translations and the sizes for all screens to the settings. The tests run on Windows and macOS too
* (@GermanBluefox) The ports the adapter really opens (UDP satellites, Wyoming, ESPHome media server) are reported to js-controller 8 as used resources; the satellite port in the settings is no longer listed as an occupied TCP port

### 1.0.1 (2026-10-13)
* (@GermanBluefox) Use first model if not set
* (@GermanBluefox) Allowed to run only with local LLM

### 0.2.0 (2026-10-04)
* (@GermanBluefox) Added routines: a phrase ("good night") runs a list of actions and answers once. Matched before the offline rule engine and before the LLM, so a macro you wrote down is never reinterpreted
* (@GermanBluefox) The offline rule engine now answers questions about a kind of measurement without a device being named: "how is the air in here", "how warm is it everywhere", "how bright is it" are answered from every sensor of that kind, with a word for the air-quality number
* (@GermanBluefox) Spoken text is cached on disk, so repeated replies ("Okay.", "Timer finished") cost no cloud call and no latency. An answer over 400 characters is cut at the last sentence that fits, and `<speak>…</speak>` is now spoken as real SSML by Azure and Polly
* (@GermanBluefox) Added an optional second speech engine per direction: if the configured provider fails (outage, expired key, empty quota), speech-to-text and text-to-speech fall back to another one — with Vosk/Piper behind a cloud provider the house keeps working without the internet
* (@GermanBluefox) Added two optional settings for switch commands: confirm with a short beep instead of a spoken sentence, and verify the device's acknowledgement before reporting success
* (@GermanBluefox) An ESPHome satellite's own measurements (temperature, presence, status texts) now appear as read-only states under `satellites.<id>.controls.*`
* (@GermanBluefox) Announcements can address a group of rooms or a person: name a set of satellites in the new "Announcement targets" table and use it anywhere a target is accepted (`notify`, `askUser`, a trigger's room, the per-satellite `tts` state). The LLM also got an `announce` tool, so "tell Denis that dinner is ready" reaches his speakers — the configured names are part of the tool description. A question asked to a group counts the first answer, and the text is synthesised once for the whole group
* (@GermanBluefox) The assistant can now know who is at home: point the new "Presence" table at the states you already have (the residents adapter, a phone ping, your own flag) and name the person. It tells the LLM who is around, holds back announcements to an empty house on request (`notify` with `onlyWhenHome`), and exposes `presence.anyoneHome` / `presence.list` / `presence.lastArrival` — so greeting somebody on arrival is just a trigger on that state
* (@GermanBluefox) System notifications can now be spoken: write to `notify.text` / `notify.alert`, call `sendTo('assistant.0', 'notify', { text, severity })`, or pick the assistant in the ioBroker notification manager. The LLM turns the raw text into one natural sentence whose tone follows the severity (`info`/`notify`/`alert`, plus `direct` to speak it verbatim)
* (@GermanBluefox) Added Do-Not-Disturb, enforced by the adapter for every transport: `dnd` globally and `satellites.<id>.dnd` per satellite. Announcements are suppressed while it is on; alerts and texts starting with `!` are still played, and answers to your own questions are never affected
* (@GermanBluefox) Added proactive triggers (new "Triggers" tab): a trigger watches states or the clock and then announces something, writes a state, or asks you a question and acts on your answer ("The fryer has been on for 5 hours. Shall I switch it off?" — the LLM classifies the spoken reply against the configured response rules). Supports alternative conditions, `also`/`unless` refinements, a delay with `cancelWhen`, and a cooldown; each trigger has `triggers.items.<id>.{enabled,fire,lastFired,nextFireAt}` states plus a `triggers.enabled` master switch
* (@GermanBluefox) The assistant can now ask a question and wait for the answer: `sendTo('assistant.0', 'askUser', { question, room })` speaks it on a satellite, re-opens the microphone without a wake word and returns what was said. While a question is open that answer is routed to the caller instead of being read as a new command
* (@GermanBluefox) Added a fourth voice transport: ESPHome voice satellites (ThirdReality Voice & Music Assistant, Home Assistant Voice PE, linux-voice-assistant). The adapter dials the devices on TCP 6053, detects the end of speech itself and serves the spoken reply over a small HTTP media server

### 0.1.6 (2026-08-26)
* (@GermanBluefox) The offline rule engine now understands combined commands: "switch the light on and set the blind to 30 %", and one verb for several devices ("switch the light and the lamp on")
* (@GermanBluefox) Fixed: "50 percent" was not recognised as a level in English
* (@GermanBluefox) The selected weather adapter is now fed to the LLM as context (current conditions plus today/tomorrow), so weather questions are answered without an extra tool round-trip
* (@GermanBluefox) The local LLM receives the weather context too, so it no longer invents a forecast
* (@GermanBluefox) Documented the weather source selection in the user documentation

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