---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: +M9xvebDrMe2+Ds0BqWbBqY1vbMJvQIbDm0E9QFgDDc=
---
<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant
Ein LLM-basierter Assistent für ioBroker. Stellen Sie Fragen in natürlicher Sprache und lassen Sie den Assistenten **beliebigen ioBroker-Status** lesen oder steuern – er verwendet ein LLM mit **Tool-Aufrufen** über die native ioBroker-API, sodass es keine starre Regel-Engine und keinen virtuellen Gerätebaum gibt.

Status: **Früher Machbarkeitsnachweis.** Texteingabe → Antwortausgabe. Audio (Satelliten, STT/TTS) und geräteinternes Aktivierungswort sind als Nächstes geplant (siehe Roadmap).

## Was heute funktioniert
- Anbieter: **OpenAI** (und OpenAI-kompatible Endpunkte über die Basis-URL) oder **Anthropic (Claude)**.
- Der LLM kann diese Tools aufrufen, die alle von der nativen Adapter-API unterstützt werden:
- `list_rooms`, `list_functions` — lies `enum.rooms` / `enum.functions`
- `find_states({ room?, func?, query? })` — Zustände und aktuelle Werte finden
- `get_state({ id })` — einen Wert lesen
- `set_state({ id, value })` — ein Gerät steuern (kann in den Einstellungen deaktiviert werden)
- Textschnittstelle mit zwei Zuständen:
- Schreiben Sie Ihre Frage an `assistant.0.text.request`
- Lies die Antwort von `assistant.0.text.response`
- Oder aus einem Skript: `sendTo('assistant.0', 'ask', { text: 'Wie warm ist es im Wohnzimmer?' }, cb)`

## Konfiguration
Im Adapter-Adminbereich (Instanzen → Assistent → ⚙):

| Schauplatz | Bedeutung |
|--------------------------|---------------------------------------------------|
| Anbieter | `openai` oder `anthropic` |
| Modell | z.B. „gpt-4o-mini“, „gpt-4o“, „claude-sonnet-4-6“ |
| API-Schlüssel | Ihr Anbieter-API-Schlüssel |
| Basis-URL | optionale Endpunktüberschreibung (z. B. Groq) |
| Steuerung von Zuständen zulassen | Wenn deaktiviert, ist der Assistent schreibgeschützt |
| Systemaufforderung | Persona / Verhalten |

## Sprachsatelliten (Hannah)
Der Adapter betreibt einen UDP-Sprachserver, der das **Hannah**-Satellitenprotokoll (`0x01` Steuerung / `0x02` Mikrofon-Audio / `0x03` TTS) unterstützt, sodass ein vorhandener Hannah Pi/ESP-Satellit direkt mit ihm kommunizieren kann. Die Sprachausgabe (STT → LLM → TTS) erfolgt im Adapter; der Satellit erfasst lediglich den Ton, erkennt das Aktivierungswort und gibt die Antwort wieder.

**Auf der Adapterseite:** Öffnen Sie den Tab **Sprache**, aktivieren Sie *Sprachserver aktivieren*, wählen Sie die STT/TTS-Anbieter und deren Zugangsdaten aus und behalten Sie den Port bei (Standard: `7775`). Beim Start der Instanz wird Folgendes im Protokoll angezeigt:

```
Voice server listening on UDP 7775
```

Der erkannte Text und die Antwort erscheinen auch in `assistant.0.text.request` / `.text.response`, wobei der Ursprung in `assistant.0.text.querySource` (Satellitenname, `chat`, oder leer für einen direkten Zustandsschreibvorgang) angegeben ist.

**Ansagen / TTS:** Schreiben Sie `assistant.0.tts.text`, um auf **allen** Satelliten zu sprechen, oder `assistant.0.satellites.<id>.tts` für **einen**. Der Wert wird als Text (über die konfigurierte TTS-Engine) vorgelesen oder – falls es sich um eine URL/einen Pfad zu einer Audiodatei handelt (`.mp3`/`.wav`/…) – wiedergegeben.

**Zum Abspielen von Audiodateien wird [ffmpeg](https://ffmpeg.org/) auf dem Host benötigt** (Windows und Linux): > Linux → `sudo apt install ffmpeg`; Windows → ffmpeg installieren und zu `PATH` hinzufügen.

Text-Sperre (TTS) benötigt dies nicht – nur die Wiedergabe von Audiodateien (MP3/WAV/…).

### Starten Sie einen Hannah-Satelliten, der auf diesen Adapter ausgerichtet ist
Passen Sie die Audioraten an Ihr Gerät an (`--sample-rate` = Mikrofon, `--tts-rate` = Lautsprecher); Geräte und unterstützte Raten werden mit `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"` aufgelistet.

Der Standard-Hannah-Satellit findet den Server über **MQTT-Discovery**, benötigt also einen erreichbaren Broker und eine gespeicherte Discovery-Nachricht. Verweisen Sie `--host` explizit auf den ioBroker-Host:

```bash
# 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

# 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

Erfolg wird im Satellitenprotokoll als `Registrierung bestätigt (ACK empfangen)` und im Adapterprotokoll als `Satellite registered: wohnzimmer` angezeigt. Anschließend das Aktivierungswort sagen → sprechen → die Antwort wird wiedergegeben.

### Ohne MQTT-Broker
Der Standard-Hannah-Satellit verbindet sich immer mit MQTT (auch mit `--host`) und beendet die Verbindung, wenn kein Broker erreichbar ist. Um **völlig brokerfrei** zu arbeiten, lassen Sie diesen einen Aufruf in `satellite.py`, `_resolve_hannah_address()` weg.

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

Registrierung, Audio und TTS laufen alle über UDP, daher geht nur die (optionale) MQTT-Statusmeldung verloren.

Beginnen Sie dann mit `--host` (`--broker` wird nicht benötigt):

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### Nativer Node.js-Satellit
Ein eigenständiger **Node.js-Satellit** ist verfügbar – kein ioBroker, kein MQTT-Broker erforderlich. Auf einem Raspberry Pi (oder einem beliebigen Linux-/Windows-/macOS-Rechner) mit Mikrofon und Lautsprecher:

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

Es führt das Aktivierungswort (OpenWakeWord) auf dem Gerät aus und streamt es an den Sprachserver dieses Adapters. Siehe [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) für die Einrichtung, `check` für die Diagnose und `install` (systemd-Dienst).

### Wyoming-Endpunkt (experimentell)
[Wyoming](https://github.com/rhasspy/wyoming) ist das offene Sprachprotokoll des Home Assistant / Rhasspy Projekts (JSONL-Ereignisse über **TCP**), das von `wyoming-satellite`, dem **Home Assistant Voice PE** Puck und **ESPHome** Sprachgeräten verwendet wird.

Aktivieren Sie **Auch Wyoming-Clients akzeptieren (TCP)** im Reiter „Sprache“ (Standardport `10700`). Der Adapter stellt dann einen Wyoming-Server bereit, der mit derselben Pipeline verbunden ist: `audio-start`/`audio-chunk`/`audio-stop` → STT → Antwort → TTS wird als `audio-*` zurückgesendet (plus ein `transcript`-Ereignis); `describe` → `info`; `synthesize` → TTS.

Das Protokoll ist unit-getestet, die Interoperabilität mit realen HA Voice PE / `wyoming-satellite` ist jedoch noch experimentell – bitte melden Sie funktionierende Fälle. Verwendet dieselben STT/TTS-Anbieter wie der UDP-Sprachserver.

## Roadmap
1. **Textassistent (fertig)** — LLM + Tool-Aufruf über ioBroker-Zustände.
2. **Schneller Pfad** für häufige Befehle (Ein/Aus/Timer) ohne LLM-Roundtrip.
3. **TTS / STT-Engines** (Polly / Azure / OpenAI / AWS Transcribe) als Adaptermodule + Konfiguration.
4. **Satelliten-Endpunkt** — UDP-Audio + MQTT-Steuerung, sodass ESP/Pi-Satelliten direkt mit dem Adapter kommunizieren.
5. **Weckwort** — trainiert/verwaltet über ioBroker, das auf dem Gerät ausgeführt wird.
6. **Wyoming Server-Endpunkt** — akzeptiert Home Assistant Voice PE / `wyoming-satellite` / ESPHome Sprachgeräte.

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