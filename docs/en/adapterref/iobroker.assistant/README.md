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
Rhasspy project (JSONL events over **TCP**), used by `wyoming-satellite`, the **Home Assistant Voice PE**
puck and **ESPHome** voice devices.

Enable **Also accept Wyoming clients (TCP)** in the Voice tab (default port `10700`). The adapter then
exposes a Wyoming server that bridges to the same pipeline: `audio-start`/`audio-chunk`/`audio-stop` →
STT → answer → TTS streamed back as `audio-*` (plus a `transcript` event); `describe` → `info`;
`synthesize` → TTS.

> The protocol framing is unit-tested, but interop with real HA Voice PE / `wyoming-satellite` is still
> **experimental** — please report what works. Uses the same STT/TTS providers as the UDP voice server.

## Roadmap

1. **Text assistant (done)** — LLM + tool-calling over ioBroker states.
2. **Fast-path** for common commands (on/off/timer) without an LLM round-trip.
3. **TTS / STT engines** (Polly / Azure / OpenAI / AWS Transcribe) as adapter modules + config.
4. **Satellite endpoint** — UDP audio + MQTT control, so ESP/Pi satellites talk to the adapter directly.
5. **Wake word** — trained/managed via ioBroker, running on the device.
6. **Wyoming server endpoint** — accept Home Assistant Voice PE / `wyoming-satellite` / ESPHome voice devices.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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
