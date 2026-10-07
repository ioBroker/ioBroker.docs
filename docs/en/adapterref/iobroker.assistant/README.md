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
> Linux → `sudo apt install ffmpeg`; Windows → install ffmpeg and add it to the `PATH`.
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