<img src="admin/assistant-satellite.svg" alt="ioBroker.assistant" width="200"/>

# ioBroker.assistant-satellite

An ioBroker adapter that turns the host it runs on into a **voice satellite** for
[`ioBroker.assistant`](https://github.com/ioBroker/ioBroker.assistant): it detects the wake word,
streams the microphone to the assistant's voice server and plays the spoken reply.

It is a thin wrapper around the standalone [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite)
package — use this adapter when the satellite device already runs ioBroker (config + status via the
admin UI). On a bare Pi without ioBroker, use the standalone package directly
(`npx @iobroker/assistant-satellite`).

## Requirements

- A mic + speaker on the host
- Audio backend (auto-selected, or force it under **Audio backend**):
  - **Linux** → `alsa-utils`: `arecord` records, `aplay` plays (`sudo apt install alsa-utils`)
  - **Windows / macOS** → **ffmpeg**: `ffmpeg` records and `ffplay` plays — you need **both** binaries,
    reachable via the `PATH` (see below). Minimal builds that ship `ffmpeg.exe` only are not enough.
- A running `ioBroker.assistant` instance (the satellite talks to it over the ioBroker message bus by default)

### ffmpeg / ffplay in the PATH (Windows, macOS)

The adapter starts `ffmpeg` and `ffplay` **by name**, so the folder holding them must be in the `PATH`
of the account ioBroker runs under — not just in your own terminal:

- **Windows** — grab a full build (e.g. [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) or
  [BtbN](https://github.com/BtbN/FFmpeg-Builds/releases)), unpack it to e.g. `C:\FFMPEG`, then add the
  folder that contains `ffmpeg.exe` **and** `ffplay.exe` to the **system** `Path`
  (*System Properties → Advanced → Environment Variables → System variables → Path*).
  Verify in a **new** shell: `where ffmpeg` and `where ffplay`.
- **macOS** — `brew install ffmpeg` (installs both into the Homebrew `bin` dir); verify with
  `which ffmpeg ffplay`.

A process only ever sees the `PATH` it inherited when it started, so **restart ioBroker (service or
host) after changing it** — otherwise the instance log keeps showing
`ffmpeg failed: spawn ffmpeg ENOENT — is it installed? (install ffmpeg)`.

## Setup

Install the adapter, add an instance, then configure it. The settings are grouped:

**ioBroker.assistant server**
- **Assistant instance** — pick the running `ioBroker.assistant` instance this satellite talks to
- **Transport** — **ioBroker** (audio over the message bus, no UDP port, central STT/TTS — *recommended*)
  or **UDP** (Hannah-style audio stream, ESP-compatible). With UDP, set the **Local listen port**
  (default `7776`) and, if the wrong interface is auto-picked, a **Host IP override**.

**Identity**
- **Room** — assign the satellite to a room

**Audio**
- **Audio backend** — `Auto` / `ALSA` / `ffmpeg`
- **Microphone / Speaker device** — e.g. `plughw:2,0` on a Pi (ALSA) or a dshow name / avfoundation index
  (ffmpeg); `default` = system default. The device lists are read from this host (instance must be running).
  On **Windows / macOS** only *capture* devices can be enumerated, and `ffplay` always plays to the
  system's default output device — pick the speaker in the OS sound settings, not here.
- **ALSA mixer control** — optional; only used by the `volume`/`mute` states (see below). Empty = auto-detect
  on the speaker's card; set a name (e.g. `PCM`, `Master`, `Speaker`) if the wrong one is picked. ALSA only.

**Wake word**
- **Wake word model** — built-in `hey_jarvis` (default), `alexa`, `hey_mycroft`, `hey_rhasspy`, or a URL /
  local `.onnx` path. You can configure up to **three** wake words — the satellite triggers on any of them.
- **Threshold** — 0–1, lower = more sensitive.
- **Upload a custom wake-word model** — upload a single self-contained `.onnx` (external-data `.onnx` +
  `.onnx.data` is not supported), then pick it in a wake-word field above. Use the built-in **wake-word test**
  to check detection live (the `test.*` states report score / peak / mic level while it runs).
- **Follow-up conversation** — after an answer, keep the mic open for a short **follow-up window** so you can
  continue ("…and the kitchen too") or answer a clarifying question without saying the wake word again.

**Recording (advanced)** — silence detection and record-length tuning: **silence RMS threshold**,
**silence (ms)**, **min / max record (ms)** and **pre-buffer chunks**.

On first start the OpenWakeWord models download into the instance data dir. Then say the wake word →
speak → the answer is played back. The `status` state shows `idle` / `listening` / `processing` / `speaking`,
and `info.connection` reflects whether the satellite is registered with the assistant.

## Volume, mute, Do-Not-Disturb

These writable states apply to answers, announcements and the beep alike:

- **`volume`** — 0–100 %
- **`mute`** — silence the speaker
- **`dnd`** — Do-Not-Disturb: **announcements are suppressed** (replies to your own questions still play)

`volume` and `mute` drive the host's mixer. On start it works the other way round: the adapter reads the
host's current setting into the two states, so bringing an instance up never changes how loud the machine
is playing. Every write to the states after that is applied to the mixer:

- **Linux (ALSA)** — the mixer of the speaker's card. The control is auto-detected, or set it under
  **ALSA mixer control** if the wrong one is picked.
- **Windows** — master volume / mute of the **default playback device** (Core Audio, driven through the
  built-in PowerShell — nothing extra to install). That is where `ffplay` plays, i.e. the same slider as
  in the Windows sound settings, so it applies **system-wide**, not only to the satellite.
- **macOS** — not wired up: `dnd` works, `volume` / `mute` do not.

**Priority announcements:** if the announcement text (sent via the assistant's `tts.text` /
`satellites.<id>.tts`) starts with **`!`**, the `!` is stripped and it plays **even when DND is on** —
e.g. `!Water leak in the basement`.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-08-19)
* (@GermanBluefox) `volume` / `mute` now work on Windows too (default playback device via Core Audio)
* (@GermanBluefox) On start the current host volume/mute is adopted into the states instead of being overwritten
* (@GermanBluefox) Documented the `ffmpeg` / `ffplay` PATH requirement for Windows and macOS

### 0.1.2 (2026-08-03)
* (@GermanBluefox) Updated packages

### 0.1.0 (2026-07-12)
* (@GermanBluefox) Support of multiple wake-words
* (@GermanBluefox) Added test of wake-words
* (@GermanBluefox) Connect to the assistant by instance selection with a choice of transport (ioBroker message bus or UDP)
* (@GermanBluefox) Added selectable audio backend (auto / ALSA / ffmpeg) and room assignment
* (@GermanBluefox) Added follow-up conversation mode (continue without repeating the wake word)
* Added `volume` / `mute` / `dnd` states (ALSA mixer); announcements starting with `!` bypass Do-Not-Disturb

### 0.0.2 (2026-07-05)
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
