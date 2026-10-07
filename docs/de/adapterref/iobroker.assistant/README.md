---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: g44CUL3WLacTNb790bSUNbCxZlE5dRrWjAtY5HKi1Ik=
---
<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# ioBroker.assistant

Ein LLM-basierter Assistent für ioBroker. Stellen Sie Fragen in natürlicher Sprache und lassen Sie den Assistenten **jeden ioBroker-Status** lesen oder steuern – er verwendet ein LLM mit **Tool-Aufrufen** über die native ioBroker-API, sodass es keine starre Regel-Engine und keinen virtuellen Gerätebaum gibt.

> Status: **Früher Machbarkeitsnachweis.** Texteingabe → Antwortausgabe. Audio (Satelliten, STT/TTS) und geräteinternes Aktivierungswort sind als Nächstes geplant (siehe Roadmap).

## Was heute funktioniert

- Anbieter: **OpenAI** (und OpenAI-kompatible Endpunkte über die Basis-URL) oder **Anthropic (Claude)** .
- Der LLM kann diese Tools aufrufen, die alle von der nativen Adapter-API unterstützt werden:
  - `list_rooms`, `list_functions` - lesen `enum.rooms` /`enum.functions`
  - `find_states({ room?, func?, query? })` — Zustände und aktuelle Werte ermitteln
  - `get_state({ id })` — einen Wert lesen
  - `set_state({ id, value })` — ein Gerät steuern (kann in den Einstellungen deaktiviert werden)
- Textschnittstelle über zwei Zustände:
  - Schreiben Sie Ihre Frage an `assistant.0.text.request`
  - Lesen Sie die Antwort von `assistant.0.text.response`
- Oder aus einem Drehbuch: `sendTo('assistant.0', 'ask', { text: 'Wie warm ist es im Wohnzimmer?' }, cb)`

## Konfiguration

In der Adapterverwaltung (Instanzen → Assistent → ⚙):

| Einstellung                             | Bedeutung                                                    |
| --------------------------------------- | ------------------------------------------------------------ |
| Anbieter                                | `openai` oder `anthropic`                                     |
| Modell                                  | z.B `gpt-4o-mini`, `gpt-4o`, `claude-sonnet-4-6`              |
| API-Schlüssel                           | Ihr Provider-API-Schlüssel                                   |
| Basis-URL                               | optionale Endpunktüberschreibung (z. B. Groq)                |
| Erlauben Sie die Kontrolle über Staaten | Wenn der Assistent deaktiviert ist, ist er schreibgeschützt. |
| Systemaufforderung                      | Persönlichkeit / Verhalten                                   |

## Sprachsatelliten (Hannah)

Der Adapter betreibt einen UDP-Sprachserver, der das **Hannah** -Satellitenprotokoll spricht (`0x01` Kontrolle /`0x02` Mikrofon-Audio /`0x03` TTS), sodass ein vorhandener Hannah Pi/ESP-Satellit direkt mit ihm kommunizieren kann. STT → LLM → TTS läuft im Adapter; der Satellit erfasst lediglich Audio, erkennt das Aktivierungswort und gibt die Antwort wieder.

**Auf der Adapterseite:** Öffnen Sie die Registerkarte **„Sprache“** , aktivieren Sie _„Sprachserver aktivieren“_ , wählen Sie die STT/TTS-Anbieter und deren Zugangsdaten aus und behalten Sie den Port (Standard) bei. `7775` Beim Start der Instanz wird im Protokoll Folgendes angezeigt:

```
Voice server listening on UDP 7775
```

Der erkannte Text und die Antwort erscheinen auch in `assistant.0.text.request` /`.text.response`, mit Ursprung in `assistant.0.text.querySource` (Satellitenname, `chat` (oder leer für einen direkten Zustandsschreibvorgang).

**Ankündigungen / TTS:** Schreiben Sie an `assistant.0.tts.text` auf **allen** Satelliten sprechen, oder `assistant.0.satellites.<id>.tts` Zum **Beispiel** wird der Wert als Text (über die konfigurierte TTS-Engine) vorgelesen, oder – falls es sich um eine URL/einen Pfad zu einer Audiodatei handelt (`.mp3` /`.wav` /…) — wiedergegeben.

> **Zum Abspielen von Audiodateien wird [ffmpeg](https://ffmpeg.org/) auf dem Host-System benötigt** (Windows und Linux): Linux →`sudo apt install ffmpeg` Windows → ffmpeg installieren und hinzufügen `PATH` Für die Text-to-Speech-Funktion (TTS) in reinem Text ist dies nicht erforderlich – nur für die Wiedergabe von Audiodateien (mp3/wav/…).

### Starten Sie einen Hannah-Satelliten, der auf diesen Adapter ausgerichtet ist.

Passen Sie die Audioraten an Ihr Gerät an (`--sample-rate` = Mikrofon, `--tts-rate` = Lautsprecher); Geräte und unterstützte Raten auflisten mit `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"` Die

Der Standard-Hannah-Satellit lokalisiert den Server über **MQTT-Discovery** , benötigt also einen erreichbaren Broker und eine gespeicherte Discovery-Nachricht. `--host` explizit auf dem ioBroker-Host:

```bash
 # 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

 # 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

Erfolg sieht so aus `Registrierung bestätigt (ACK empfangen)` im Satellitenlogbuch und `Satellite registered: wohnzimmer` im Adapterprotokoll. Dann das Aktivierungswort sagen → sprechen → die Antwort wird wiedergegeben.

### Ohne einen MQTT-Broker

Der serienmäßige Hannah-Satellit verbindet sich immer mit MQTT (auch mit `--host`) und beendet sich, wenn kein Broker erreichbar ist. Um **vollständig brokerfrei** zu arbeiten, überspringen Sie diesen einen Aufruf — in `satellite.py`, `_resolve_hannah_address()`:

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

Registrierung, Audio und TTS laufen alle über UDP, sodass nur die (optionale) MQTT-Statusmeldung verloren geht. Beginnen Sie dann einfach damit. `--host` (NEIN `--broker` benötigt):

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### Native Node.js-Satellite

Ein eigenständiger **Node.js-Satellit** ist verfügbar – kein ioBroker, kein MQTT-Broker erforderlich. Auf einem Raspberry Pi (oder einem beliebigen Linux-/Windows-/macOS-Rechner) mit Mikrofon und Lautsprecher:

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

Es führt das Aktivierungswort (OpenWakeWord) auf dem Gerät aus und streamt es an den Sprachserver dieses Adapters. Siehe[`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) für die Einrichtung, die `check` Diagnostik und `install` (systemd-Dienst).

### Wyoming-Endpunkt (experimentell)

[Wyoming](https://github.com/rhasspy/wyoming) ist das offene Sprachprotokoll des Home Assistant / Rhasspy-Projekts (JSONL-Ereignisse über **TCP** ), das von folgenden Programmen verwendet wird: `wyoming-satellite` und andere Dienstleistungen im Rhasspy-Stil.

> ESPHome-Sprachgeräte (einschließlich **Home Assistant Voice PE** ) sprechen **nicht** Wyoming, sondern die native ESPHome-API. Verwenden Sie für diese Geräte die unten beschriebene Transportmethode.

Aktivieren Sie im Reiter „Sprache **“ die Option „Wyoming-Clients (TCP) akzeptieren“** (Standardport). `10700` Der Adapter stellt dann einen Wyoming-Server bereit, der die Verbindung zur selben Pipeline herstellt: `audio-start` /`audio-chunk` /`audio-stop` → STT → Antwort → TTS wird zurückgesendet als `audio-*` (plus ein `transcript` Ereignis); `describe` →`info`; `synthesize` → TTS.

> Die Protokollstruktur ist unit-getestet, aber interoperabel mit einem realen `wyoming-satellite` Ist noch **experimentell** – bitte melden Sie, was funktioniert. Nutzt dieselben STT/TTS-Anbieter wie der UDP-Sprachserver.

### ESPHome-Sprachsatelliten

Geräte, auf denen der **Sprachassistent ESPHome** läuft – der [ThirdReality Voice & Music Assistant (Dev Edition)](https://www.thirdreality.com/products/voice-music-assistant-dev-edition) , **Home Assistant Voice PE** oder ein beliebiges Gerät mit [linux-voice-assistant](https://github.com/OHF-Voice/linux-voice-assistant) – verbinden sich nicht mit einem Server, sondern _sind_ selbst einer und warten auf **TCP-Port 6053.** Der Adapter fungiert hier als Client und wählt die Verbindung, genau wie Home Assistant. Aktivierungswort, Echounterdrückung und Wiedergabe erfolgen auf dem Gerät; Spracherkennung, Anrufannahme und Sprachausgabe übernimmt der Adapter.

Aktivieren Sie im Tab „Sprache“ die Option **„ESPHome-Sprachsatelliten ansteuern** “ und fügen Sie pro Gerät eine Zeile hinzu (Adresse, optionaler Port, Raum). Es muss nichts auf dem Gerät installiert oder geflasht werden, und es werden keine ESPHome-Tools benötigt – „ESPHome native API“ ist lediglich der Protokollname.

Zwei Dinge unterscheiden sie von den anderen Transportmitteln:

- **Der Adapter erkennt, wann Sie aufgehört haben zu sprechen.** Diese Geräte streamen, bis der Server die Übertragung stoppt. Daher findet hier eine Endeerkennung statt. Passen Sie diese mit **„Ende der Rede nach (ms Stille)“** an, falls Sie durch Antworten unterbrochen werden oder der Assistent zu lange wartet.
- **Die gesprochene Antwort wird abgerufen, nicht übertragen.** Das Gerät gibt eine URL wieder, daher betreibt der Adapter einen kleinen HTTP-Server ( **Medienserver-Port** , Standardwert). `8099`) das den Clip für ein paar Minuten bereitstellt. Es muss _vom Gerät aus_ erreichbar sein; die Adresse wird von jeder Geräteverbindung abgeleitet und muss nur hinter NAT/Docker/VLAN manuell konfiguriert werden.

Ankündigungen (`tts.text`, `satellites.<id>.tts` (Timer und Alarme) erreichen auch diese Satelliten, und jeder einzelne wird angezeigt unter `assistant.0.satellites.*` wie jeder andere.

> Entwickelt anhand der Firmware-Quellen des ThirdReality-Lautsprechers und abgedeckt durch einen Loopback-Test mit einem simulierten Gerät; Feedback von realer Hardware ist willkommen.

## Roadmap

1. **Textassistent (fertig)** — LLM + Tool-Aufruf über ioBroker-Zustände.
2. **Schneller Pfad** für häufige Befehle (Ein/Aus/Timer) ohne LLM-Roundtrip.
3. **TTS-/STT-Engines** (Polly/Azure/OpenAI/AWS Transcribe) als Adaptermodule + Konfiguration.
4. **Satellitenendpunkt** – UDP-Audio + MQTT-Steuerung, sodass ESP/Pi-Satelliten direkt mit dem Adapter kommunizieren.
5. **Aktivierungswort** – trainiert/verwaltet über ioBroker, das auf dem Gerät ausgeführt wird.
6. **Wyoming-Server-Endpunkt** — akzeptieren `wyoming-satellite` und Kunden im Rhasspy-Stil.
7. **ESPHome-Satelliten (fertiggestellt)** – steuern ThirdReality / HA Voice PE / linux-voice-assistant-Geräte.

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