---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: 2e1xP5xYhicsKkfkHwjXtLp6KlUoH9dcN+miU29ZTmQ=
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

> **Zum Abspielen von Audiodateien wird [ffmpeg](https://ffmpeg.org/) auf dem Host-System benötigt** (Windows und Linux): Linux →`sudo apt install ffmpeg` Windows → ffmpeg installieren und hinzufügen `PATH` Alternativ können Sie den vollständigen Pfad unter **„Pfad zu ffmpeg“** auf der Registerkarte „Sprache“ eingeben. Andernfalls lädt die Option **„ffmpeg herunterladen“** auf der Registerkarte „Sprache“ eine statische Version (ffmpeg-static, 20–30 MB) in das Datenverzeichnis der Instanz herunter. Für reine Text-Sprachausgabe (TTS) ist dies nicht erforderlich – nur für die Wiedergabe von Audiodateien (MP3/WAV/…).

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

### Native Node.js satellite

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

Geräte, auf denen der **Sprachassistent ESPHome** läuft – der [ThirdReality Voice & Music Assistant (Entwicklerversion)](https://www.thirdreality.com/products/voice-music-assistant-dev-edition) , **Home Assistant Voice PE** oder ein beliebiges Gerät mit [linux-voice-assistant](https://github.com/OHF-Voice/linux-voice-assistant) – verbinden sich nicht mit einem Server, sondern _sind_ selbst ein Server und warten auf **TCP-Port 6053.** Der Adapter fungiert hier als Client und wählt die Verbindung, genau wie Home Assistant. Aktivierungswort, Echounterdrückung und Wiedergabe erfolgen auf dem Gerät; Spracherkennung, Anrufannahme und Sprachausgabe übernimmt der Adapter.

Aktivieren Sie im Tab „Sprache“ die Option **„ESPHome-Sprachsatelliten ansteuern** “ und fügen Sie pro Gerät eine Zeile hinzu (Adresse, optionaler Port, Raum). Es muss nichts auf dem Gerät installiert oder geflasht werden, und es werden keine ESPHome-Tools benötigt – „ESPHome native API“ ist lediglich der Protokollname.

Zwei Dinge unterscheiden sie von den anderen Transportmitteln:

- **Der Adapter erkennt, wann Sie aufgehört haben zu sprechen.** Diese Geräte streamen, bis der Server die Übertragung stoppt. Daher findet hier eine Endeerkennung statt. Passen Sie diese mit **„Ende der Rede nach (ms Stille)“** an, falls Sie durch Antworten unterbrochen werden oder der Assistent zu lange wartet.
- **Die gesprochene Antwort wird abgerufen, nicht übertragen.** Das Gerät gibt eine URL wieder, daher betreibt der Adapter einen kleinen HTTP-Server ( **Medienserver-Port** , Standardwert). `8099`) das den Clip für ein paar Minuten bereitstellt. Es muss _vom Gerät aus_ erreichbar sein; die Adresse wird von jeder Geräteverbindung abgeleitet und muss nur hinter NAT/Docker/VLAN manuell konfiguriert werden.

Ankündigungen (`tts.text`, `satellites.<id>.tts` (Timer und Alarme) erreichen auch diese Satelliten, und jeder einzelne wird angezeigt unter `assistant.0.satellites.*` wie jeder andere.

> Entwickelt anhand der Firmware-Quellen des ThirdReality-Lautsprechers und abgedeckt durch einen Loopback-Test mit einem simulierten Gerät; Feedback von realer Hardware ist willkommen.

### Aktivierungswort: Welches Modell für welchen Satelliten?

Das Aktivierungswort wird immer **vom Satelliten** erkannt, daher hängt das Modellformat vom Satellitentyp ab. Es gibt zwei Modellfamilien, und beide können als `.tflite` Sie sind **nicht austauschbar** : Ein für den einen Satellitentyp trainiertes Modell funktioniert nicht auf dem anderen. Um denselben Ausdruck auf beiden Satellitentypen verwenden zu können, muss er zweimal trainiert werden.

| Satellit                                                                         | Motor                                                      | Kundenspezifisches Modell                                           | Wohin es geht                                                                               |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ESPHome (ThirdReality-Lautsprecher)                                              | [microWakeWord](https://github.com/kahrendt/microWakeWord) | `.tflite` optional mit seinem `.json`                                | Dieser Adapter: Registerkarte **„Satelliten“** → ⚙ → _Eigenes Aktivierungswort hochladen_   |
| Native Satellit (`assistant-satellite` Adapter, `@iobroker/assistant-satellite`) | [openWakeWord](https://github.com/dscripka/openWakeWord)   | ein in sich geschlossenes `.onnx`                                    | Satelliteneinstellungen: Hochladen, dann auswählen. `wakewordModel` (oder eine URL/ein Pfad) |
| Hannah Pi Satellit (UDP)                                                         | openWakeWord                                               | `.onnx` (`.tflite` nur mit `inference_framework: tflite` auf armv7l) | `--wakeword-model <path>`                                                                   |
| Kunden aus Wyoming                                                               | was auch immer der Client ausführt                         | —                                                                   | auf Clientseite; wird nicht von diesem Adapter verwaltet                                    |

**microWakeWord (ESPHome)**

- Das Modell benötigt 40 Spektrogrammmerkmale pro Frame: Eingabe `[1, n, 40]`, **quantisiert** (int8 in, uint8 out) — wie die offiziellen Modelle in [esphome/micro-wake-word-models](https://github.com/esphome/micro-wake-word-models) .

- Bilden Sie Ihre eigenen mit microWakeWords aus. `notebooks/basic_training_notebook.ipynb` (Python 3.10, eine GPU ist sehr hilfreich). Das Ergebnis ist `trained_models/wakeword/tflite_stream_state_internal_quant/stream_state_internal_quant.tflite` — Benennen Sie es nach dem Ausdruck um, z. B. `vita_nova.tflite` wird zu "Vita Nova".

- Der `.json` ist optional. Ohne diese Angabe übernimmt der Adapter den Ausdruck aus dem Dateinamen und die Sprache aus dem Dateinamen. `voiceLanguage`, der Grenzwert `0.97` und ein Schiebefenster `5` Geben Sie eine an, um einen anderen Wert festzulegen. `micro.probability_cutoff`:

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

- Der Upload überprüft das Modell und lehnt alles ab, was das Gerät nicht ausführen kann, mit der Begründung: Ein openWakeWord-Modell ist so benannt.

- Das Gerät lädt beim **Aktivieren** des Chips das Aktivierungswort vom Medienserver herunter; maximal zwei Aktivierungswörter können gleichzeitig aktiv sein. Ein heruntergeladenes Aktivierungswort verbleibt auf dem Gerät (die API kann es nicht löschen). Geräte, deren Firmware keine externen Aktivierungswörter unterstützt, listen das hochgeladene Aktivierungswort nicht auf.

**openWakeWord (native und Hannah-Satelliten)**

- Das Modell verwendet Sprachvektoren mit 96 Werten, z. B. Eingabe `[1, 16, 96]`, float — weshalb es nicht auf ESPHome-Geräten läuft.
- Exporte des Trainingsnotizbuchs von openWakeWord `.onnx` Und `.tflite` Der einheimische Satellit benötigt den `.onnx` als **eine** Datei – ein Modell aufgeteilt in `.onnx` +`.onnx.data` wird nicht unterstützt.
- Im nativen Satelliten integriert: `hey_jarvis`, `alexa`, `hey_mycroft`, `hey_rhasspy`; bis zu drei Aktivierungswörter gleichzeitig.

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
### **WORK IN PROGRESS**
* (@GermanBluefox) 3D plan: "zeig Unterdeck", "show the galley", "покажи кухню", "zeig das ganze Haus" make every open 3D view of home3d fly there (writes `home3d.N.show`); only names the plan knows (`home3d.N.places`) are taken, everything else goes on as before

### 1.13.0 (2026-11-20)
* (@GermanBluefox) Music from Spotify: "play Bohemian Rhapsody by Queen", "spiel das Album … in der Küche", "spiel meine Playlist …" find the song, album, artist or playlist and play it on a Spotify Connect device (table "Spotify players" on the Services tab, needs spotify-premium 3.3.0 or newer); LLM tools `play_music` and `music_player`, message `playMusic`
* (@GermanBluefox) Music clips on the TV: "spiel den Clip Bohemian Rhapsody von Queen", "play the music video … by …", "включи клип …" search the clip on YouTube and play it on the YouTube player; so does a song for a TV

### 1.12.1 (2026-11-19)
* (@GermanBluefox) Voice per answer language: the language is a drop-down now. A language picked from the suggestions was saved as its label (e.g. "de – Deutsch") and the row was never used; such rows get the language code on the first start
* (@GermanBluefox) Spoken requests: the speech recognition no longer waits for the device names it gets as hints (up to 3 s on large installations each time a minute had passed since the last request); the last list is used while a new one is built
* (@GermanBluefox) Request details: the speech recognition step shows the language it really got (that of the wake word) and the ioBroker.voice instance instead of the unrelated Vosk model; the speech synthesis step shows the voice, model and language that really spoke (a row of "voice per answer language" or the reserve) instead of the main voice of the settings

### 1.12.0 (2026-11-19)
* (@GermanBluefox) Device commands can be understood by the adapter smart-text2command instead of the built-in rules (tab Commands, "Device commands understood by"): it runs only the actions approved there and asks back when the room or the device is unclear; the next utterance of the same satellite or chat answers. What it does not understand goes on to the local and the cloud model; timers, alarms, time, weather and volume stay with the built-in rules
* (@GermanBluefox) New first tab "Flow": the way of a request as a diagram (sources → speech recognition → local decision → local LLM → cloud LLM / pi-agent → speech output), each step can be set up with a click

### 1.11.0 (2026-11-18)
* (@sadam6752-tech) ESPHome satellites: a language per wake word (tab Satellites, "Language per wake word", e.g. Alisa → Russian, Hey Bro → German): speech recognition, the reply voice and the follow-ups of that conversation use it, and pi-agent asks its yes/no questions in it
* (@sadam6752-tech) ESPHome satellites on an ESP32: two wake words can be active at once (the firmware reports a limit of one, but runs every wake word it is sent)
* (@sadam6752-tech) ioBroker.voice gets the language of the speech (its model Canary 1B v2 uses it, Parakeet ignores it) and only the hints in the alphabet of the language
* (@sadam6752-tech) Whisper (OpenAI and compatible servers) gets only the device and room names in Latin letters as hints for a language written in them: Russian names pulled German speech towards Cyrillic letters

### 1.10.0 (2026-11-17)
* (@GermanBluefox) ESPHome satellites: the adapter ships microWakeWord models ("ioBroker", "Hey Bro", "Alisa"); one click in the satellite settings puts one on the device and switches it on, replacing an older version of the same word
* (@GermanBluefox) Wake words from a training run get a short name with their date, e.g. `261103_iobroker` instead of "20261103 085427 9b0f Microwakeword Iobroker"
* (@GermanBluefox) A wake word selected right after it was uploaded is no longer dropped as unknown

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