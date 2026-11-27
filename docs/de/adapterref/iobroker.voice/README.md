---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.voice.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.voice.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.voice/workflows/Test%20and%20Release/badge.svg
---
![Logo](../../admin/voice.svg)

# ioBroker.voice

Lokale Offline-Sprachsteuerung für ioBroker: Spracherkennung mit [NVIDIA Parakeet TDT 0.6B v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) oder [NVIDIA Canary 1B v2](https://huggingface.co/nvidia/canary-1b-v2), Sprachausgabe mit [Piper](https://github.com/rhasspy/piper) und ein Wakeword-Mikrofon für VIS-2. Alles läuft auf der CPU des ioBroker-Hosts. Es braucht weder Cloud noch Grafikkarte noch Docker.

Bis Version 0.1.x hieß dieser Adapter **ai-parakeet**, siehe [Umstieg von ai-parakeet](#umstieg-von-ai-parakeet).

- **25 europäische Sprachen** (Deutsch, Englisch, Französisch, Italienisch, Spanisch, Niederländisch, Polnisch, Russisch, Ukrainisch, Portugiesisch und weitere), mit Satzzeichen und Groß-/Kleinschreibung: Parakeet erkennt die Sprache selbst, Canary bekommt sie vom Aufrufer mitgeteilt, siehe [Modell der Spracherkennung](#modell-der-spracherkennung)
- **OpenAI-kompatible API** `POST /v1/audio/transcriptions`: Alles, was die Whisper-API von OpenAI nutzen kann, kann auch diesen Adapter nutzen, z. B. [ioBroker.assistant](https://github.com/ioBroker/ioBroker.assistant)
- **sendTo** für Skripte, z. B. um Sprachnachrichten zu transkribieren
- **Live-Test** des Mikrofons in den Instanz-Einstellungen und eine **Testseite** mit Live-Erkennung im Browser
- **Korrekturwörterbuch** für Wörter, die das Modell nicht kennt
- **Sprachausgabe** mit Piper und ein **Wakeword-Mikrofon** für VIS-2, das den Text an smart-text2command oder ioBroker.assistant schicken kann (Details in der [englischen Beschreibung](https://github.com/ioBroker/ioBroker.voice/blob/main/README.md))

## Umstieg von ai-parakeet

**voice** installieren und eine Instanz mit derselben Nummer wie die alte anlegen (`voice.0` für `ai-parakeet.0`). Beim ersten Start

- übernimmt sie einmal die Einstellungen von `ai-parakeet.0`, stoppt diese Instanz (beide würden denselben Port nutzen) und startet neu,
- verschiebt sie das heruntergeladene Modell von `iobroker-data/ai-parakeet/models` nach `iobroker-data/voice/models`, die 670 MB werden also nicht noch einmal geladen (ein in den Einstellungen gesetzter Modellordner bleibt, wie er ist),
- verschiebt sie Piper-Runtime, Piper-Stimmen und das heruntergeladene ffmpeg von `iobroker-data/ai-parakeet.0` nach `iobroker-data/voice.0`,
- kopiert sie die hochgeladenen Wakeword-Modelle und Piper-Stimmen.

Selbst umstellen muss man:

- Skripte: aus `sendTo('ai-parakeet.0', …)` wird `sendTo('voice.0', …)`,
- VIS-2: im Wakeword-Widget die Instanz von `voice` wählen,
- ioBroker.assistant: für die Spracherkennung die Instanz von `voice` wählen (braucht eine Assistant-Version, die `voice` kennt).

Danach die Instanz `ai-parakeet.0` und den Adapter ai-parakeet löschen.

## Geschwindigkeit und Speicher

Das Modell ist INT8-quantisiert (etwa 670 MB) und braucht etwa **1,1 GB Arbeitsspeicher**. Gemessene Zeiten für einen Befehl von 3 bis 6 Sekunden:

| Host | CPU-Threads | Rechenzeit | Echtzeitfaktor |
|---|---|---|---|
| Raspberry Pi 5 (8 GB), mit laufendem Frigate | 3 | 0,5 - 1,1 s | etwa 0,2 |
| Intel Core i9-14900HX | 4 | 0,1 - 0,3 s | etwa 0,03 - 0,05 |

Der Echtzeitfaktor ist die Rechenzeit geteilt durch die Länge des Audios: 0,2 bedeutet, 10 Sekunden Sprache werden in 2 Sekunden erkannt. Ein Raspberry Pi 4 sollte auch gehen, wurde aber nicht gemessen und ist deutlich langsamer. 32-Bit-Systeme werden nicht unterstützt.

## Modell der Spracherkennung

Die Einstellung **Modell der Spracherkennung** im Reiter **Modell** wählt das Modell:

- **Parakeet TDT 0.6B v3** (Standard) erkennt die Sprache selbst. Bei kurzen Befehlen mit Akzent wählt es manchmal die falsche Sprache und schreibt englische oder kyrillische Wörter.
- **Canary 1B v2** bekommt die Sprache mitgeteilt, Sprache mit Akzent bleibt so in ihrer Sprache. Es braucht etwa 1 GB Speicherplatz, etwa 1,7 GB Arbeitsspeicher und etwa doppelt so viel Rechenzeit wie Parakeet (Echtzeitfaktor 0,155 statt 0,068 auf einem Intel Core i9-9900K mit 4 Threads).

Canary bekommt die Sprache vom Aufrufer, als ISO-639-1-Code (`de`, `en`, `ru`, …; `de-DE` geht auch): das Feld `language` der [OpenAI-kompatiblen API](#openai-kompatible-api), `language` von [`sendTo('transcribe')`](#sendto), von `start` des [Live-Tests](#live-test-im-admin) und von `hello` am WebSocket der Testseite. ioBroker.assistant schickt die Sprache seines Aktivierungsworts. Eine Anfrage ohne Sprache oder mit einer Sprache, die nicht zu den 25 gehört, wird in der Systemsprache erkannt. Der Live-Test im Admin, die Testseite und das VIS-2-Wakeword-Widget schicken keine Sprache. Canary erkennt die Sprache nicht selbst: Sprache in einer anderen als der angegebenen Sprache wird nicht richtig erkannt. Parakeet ignoriert die Sprache.

Canary wird in das Unterverzeichnis `canary-1b-v2` des Modellverzeichnisses geladen; Parakeet bleibt, wo es ist. Das nicht gewählte Modell wird nicht gelöscht: Seine Dateien von Hand löschen, um den Platz freizugeben. Aufnahmen über 30 s erkennt Canary in Fenstern von 30 s, und es liefert keine Zeiten pro Satz: `segments`, `verbose_json`, `srt` und `vtt` bekommen ein Segment pro Fenster.

Ohne Internetzugang `encoder-model.int8.onnx`, `decoder-model.int8.onnx` und `vocab.txt` von [istupakov/canary-1b-v2-onnx](https://huggingface.co/istupakov/canary-1b-v2-onnx/tree/5ebc1520cef7b6b318b3526ad17adbfe00bc1bfc) herunterladen und in das Unterverzeichnis `canary-1b-v2` des Modellverzeichnisses kopieren.

## Voraussetzungen

- 64-Bit Linux, Windows oder macOS (x64 oder arm64), Node.js 22 oder neuer
- Mindestens 1,5 GB freier Arbeitsspeicher, mit Canary 2 GB (besser insgesamt 4 GB oder mehr)
- Etwa 700 MB Speicherplatz für das Modell, etwa 1 GB für Canary. Auf einem Raspberry Pi ist eine SSD empfehlenswert
- Zugriff auf `huggingface.co` beim ersten Start (oder die Modelldateien von Hand kopieren, siehe unten)
- js-controller 6 oder neuer, admin 7.6.20 oder neuer

**Linux auf x64:** Bei der Installation lädt `onnxruntime-node` zusätzlich etwa 200 MB CUDA-Bibliotheken von nuget.org. Der Adapter nutzt sie nicht. Mit der Umgebungsvariablen `ONNXRUNTIME_NODE_INSTALL=skip` bei der Installation lässt sich das verhindern. Auf ARM (Raspberry Pi) und Windows wird nichts nachgeladen.

## Einrichtung

1. Adapter installieren und eine Instanz auf dem Host anlegen, auf dem die Spracherkennung laufen soll. In einem Multihost-System kann das ein anderer Host sein als der von ioBroker.assistant.
2. Beim ersten Start lädt der Adapter das Modell (etwa 670 MB, Canary etwa 1 GB) und prüft die SHA-256-Prüfsummen. Der Reiter **Server** der Instanz-Einstellungen zeigt den Fortschritt. Ein abgebrochener Download wird an der Abbruchstelle fortgesetzt.
3. Danach wird das Modell geladen (einige Sekunden), der Status wird `ready`.

Hat der Host keinen Internetzugang, die drei Dateien `encoder-model.int8.onnx`, `decoder_joint-model.int8.onnx` und `vocab.txt` von [ysdede/parakeet-tdt-0.6b-v3-onnx](https://huggingface.co/ysdede/parakeet-tdt-0.6b-v3-onnx/tree/e5356bf6e24bdb7a269536b0e9e7869bc034b893) herunterladen und in das Modellverzeichnis kopieren. Der Adapter prüft sie beim nächsten Start.

## Verwendung in ioBroker.assistant

1. In den Einstellungen von ioBroker.assistant die Spracherkennung **OpenAI (Whisper)** wählen.
2. Als **Spracherkennungs-Server** die Adresse dieses Adapters eintragen, z. B. `http://192.168.1.10:9999` (ohne `/v1`, das ergänzt der Assistant). Die richtige Adresse steht im Reiter **Server** der Instanz-Einstellungen.
3. Ist in diesem Adapter ein API-Schlüssel gesetzt, diesen als **Schlüssel des Servers** eintragen.

Der Assistant schickt die Namen von Geräten, Räumen und Szenen im Feld `prompt` mit. Mit der Option **Wörter aus dem Prompt verwenden** werden diese Namen so geschrieben wie im Prompt: aus `io broker` wird `ioBroker`, aus `wohnzimmer` wird `Wohnzimmer`. Dabei ändern sich nur Leerzeichen, Bindestriche und Groß-/Kleinschreibung, nie Buchstaben.

## OpenAI-kompatible API

```
POST http://<host>:9999/v1/audio/transcriptions
Authorization: Bearer <API-Schlüssel>     (nur wenn ein Schlüssel gesetzt ist)
Content-Type: multipart/form-data

file=<Audiodatei>
response_format=json | text | verbose_json | srt | vtt   (optional, Standard json)
prompt=<Namen, durch Kommas getrennt>                     (optional)
language=<de, en, ru, ...>                                (optional, für Canary; Parakeet erkennt die Sprache selbst)
model=<wird ignoriert>
```

Antwort bei `json`: `{"text": "Schalte das Licht im Wohnzimmer ein."}`

Das Audio kann auch direkt als Body mit `Content-Type: audio/wav` geschickt werden, die Felder stehen dann im Query-String (`?response_format=text`).

- **WAV** (PCM 8/16/24/32 Bit oder Float, beliebige Abtastrate, mono oder stereo) wird direkt gelesen.
- **MP3, OGG/Opus, M4A, WebM, FLAC** brauchen [ffmpeg](https://ffmpeg.org/). Entweder auf dem Host installieren (`sudo apt install ffmpeg`) oder im Reiter **Erkennung** auf **ffmpeg herunterladen** klicken: Das lädt das statische ffmpeg von [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) (20–30 MB, entpackt etwa 80 MB, geprüft mit fester SHA-256) nach `iobroker-data/voice.0/ffmpeg`, so wie ioBroker.assistant. Es wird sofort ohne Neustart benutzt, solange kein Pfad eingetragen ist. ioBroker.assistant schickt WAV und braucht hier kein ffmpeg.
- Aufnahmen über der **maximalen Audiolänge** (Standard 300 s) werden abgelehnt. Aufnahmen über 90 s werden in Fenstern von 60 s erkannt (Canary: über 30 s in Fenstern von 30 s).
- `GET /v1/models` listet das Modell, `GET /health` zeigt den Status (ohne Schlüssel).
- `/v1/audio/translations` wird nicht unterstützt: Der Adapter transkribiert nur.

Beispiel mit curl:

```bash
curl http://192.168.1.10:9999/v1/audio/transcriptions -F file=@befehl.wav -F response_format=text
```

## sendTo

```js
// eine Datei auf dem Host der Instanz (WAV, mit ffmpeg jedes Format)
sendTo('voice.0', 'transcribe', { file: '/opt/iobroker/sprachnachricht.ogg' }, result => {
    if (result.error) {
        log(result.error, 'warn');
    } else {
        log(`${result.text} (${result.audioSeconds} s in ${result.inferenceMs} ms)`);
    }
});

// eine Audiodatei als Buffer oder base64-Text
sendTo('voice.0', 'transcribe', { audio: fs.readFileSync('/tmp/a.wav'), prompt: 'ioBroker, Wohnzimmer' }, console.log);

// rohes 16-Bit-Mono-PCM
sendTo('voice.0', 'transcribe', { pcm: buffer, sampleRate: 16000 }, console.log);
```

Die Antwort enthält `text` (mit Korrekturen), `rawText` (wie vom Modell erkannt), `audioSeconds`, `inferenceMs` und `queueMs`. Mit `segments: true` zusätzlich die Sätze mit Start- und Endzeit. `language: 'de'` teilt [Canary](#modell-der-spracherkennung) die Sprache mit; Parakeet ignoriert es.

`sendTo('voice.0', 'getEndpoint', {}, console.log)` liefert die Adresse der API.

## Live-Test im Admin

Der Tab **Live-Test** der Instanz-Einstellungen nimmt das Mikrofon direkt dort auf und zeigt den erkannten Text live an, mit Zwischenergebnissen, dem Text mit und ohne Korrekturwörterbuch und den Rechenzeiten. Das Audio läuft über die Verbindung des Admins (`sendTo`), nicht zum Server des Adapters: Der Server braucht dafür weder HTTPS noch einen API-Schlüssel, und es funktioniert auch, wenn der Port des Servers belegt ist. Das Mikrofon erlaubt der Browser trotzdem nur, wenn der Admin selbst über HTTPS oder auf `localhost` geöffnet ist; sonst sagt der Tab das.

Der Tab ist eine Web-Komponente von [`@iobroker/web-components`](https://github.com/ioBroker/web-components) (`admin/webcomponents/voice-live.json`) und braucht einen Admin, der sie anzeigt. Andere Hosts von Web-Komponenten können sie ebenfalls zeigen; ihre Einstellung **Instanz** wählt die Instanz.

Der Live-Test schickt 16-Bit-Audio in Nachrichten von etwa 0,2 s (etwa 32 KB/s) und bekommt mit jeder Antwort die neuen Ergebnisse:

```js
sendTo('voice.0', 'live', { action: 'start', language: 'de' });   // → { id, sampleRate, corrections }; language nur für Canary, optional
sendTo('voice.0', 'live', { action: 'audio', id, seq: 1, pcm });  // pcm: 16 kHz mono 16 Bit LE als base64 → { events }
sendTo('voice.0', 'live', { action: 'stop', id, seq: 2 });        // → { events }
sendTo('voice.0', 'live', { action: 'poll', id });                // → { events }, bis ein Ereignis "done" oder "error" kommt
```

Eine Sitzung ohne Nachricht für 15 s wird verworfen.

## Testseite

Mit der Option **Testseite aktivieren** zeigt der Server unter `http://<host>:9999/` eine Seite, die das Mikrofon-Audio an den Adapter schickt und den erkannten Text live anzeigt, mit Zwischenergebnissen. Browser erlauben das Mikrofon nur auf HTTPS-Seiten oder auf `localhost`: In den Instanz-Einstellungen **HTTPS** aktivieren und ein Zertifikat wählen, oder die Seite über einen Reverse-Proxy mit HTTPS öffnen.

Der Button **Testseite öffnen** in den Instanz-Einstellungen nimmt den Hostnamen, unter dem der Browser den Admin erreicht, wenn der Admin auf demselben Host läuft und nicht hinter einem Reverse-Proxy steht. Ist der Admin als `http://localhost:8081` geöffnet, öffnet sich die Testseite als `http://localhost:9999/` und das Mikrofon funktioniert ohne HTTPS; ein Hostname passt außerdem besser zum Zertifikat als die IP-Adresse. Der Status in den Instanz-Einstellungen warnt, wenn der Browser das Mikrofon unter der Adresse der Testseite sperren wird, und die Testseite selbst sagt es ebenfalls.

Die Seite erkennt das Satzende über einen einfachen Pegel (**Stille, die einen Satz beendet**). Auf einem Raspberry Pi ist ein Intervall von 2-3 s für Zwischenergebnisse besser, weil jedes Zwischenergebnis den ganzen Satz neu erkennt.

## Korrekturwörterbuch

Wörter, die das Modell regelmäßig falsch erkennt, lassen sich ersetzen. Jede Zeile enthält den richtigen Text und die falschen Varianten, durch Kommas getrennt. Groß-/Kleinschreibung, Leerzeichen und Bindestriche spielen keine Rolle (`io broker` ersetzt auch `IO-Broker`), und es werden nur ganze Wörter ersetzt.

## Einstellungen

| Einstellung | Standard | Bedeutung |
|---|---|---|
| IP-Adresse, Port | 0.0.0.0, 9999 | Adresse des Servers. 0.0.0.0 macht ihn im ganzen Netzwerk erreichbar |
| API-Schlüssel | leer | Clients müssen ihn als `Authorization: Bearer <key>` senden. Empfohlen, wenn das Netzwerk nicht vertrauenswürdig ist |
| HTTPS | aus | Nötig für das Mikrofon der Testseite auf anderen Rechnern |
| Modellverzeichnis | `iobroker-data/voice/models` | Z. B. ein Verzeichnis auf einer SSD. Es ist nicht Teil des ioBroker-Backups |
| CPU-Threads | 0 (automatisch) | Kerne - 1, höchstens 4. Auf einem ausgelasteten Host können weniger Threads schneller sein |
| Entladen nach Leerlauf-Minuten | 0 | Gibt den Speicher frei, wenn das Modell nicht genutzt wird. Erneutes Laden dauert einige Sekunden |
| Freien Speicher prüfen | an | Lädt das Modell nicht bei weniger als 1,1 GB freiem Speicher |
| Maximale Audiolänge | 300 s | |
| Pfad von ffmpeg | leer | Für andere Formate als WAV. Leer: das heruntergeladene ffmpeg, sonst `ffmpeg` aus dem Suchpfad. Knöpfe **ffmpeg prüfen** und **ffmpeg herunterladen** |

## Datenpunkte

| Datenpunkt | Bedeutung |
|---|---|
| `info.connection` | Die Spracherkennung ist nutzbar |
| `info.status` | `starting`, `downloading`, `verifying`, `loading`, `ready`, `idle` (entladen) oder `error` |
| `info.lastError` | Letzter Fehler |
| `info.modelProgress` | Fortschritt des Downloads in % |
| `info.endpoint` | Adresse der API |
| `stats.lastText` | Zuletzt erkannter Text (abschaltbar) |
| `stats.lastAudioSeconds`, `stats.lastInferenceMs`, `stats.lastRtf` | Länge, Rechenzeit und Echtzeitfaktor der letzten Erkennung |
| `stats.requests` | Anzahl der Erkennungen |
| `stats.queue` | Wartende Anfragen |

## Funktionsweise

Der Adapter führt das Modell in einem eigenen Node.js-Prozess aus. Ein Absturz von ONNX Runtime beendet den Adapter nicht, und beim Entladen wird der Speicher vollständig freigegeben. Es läuft immer nur eine Erkennung gleichzeitig; vollständige Aufnahmen (API, sendTo) kommen vor Zwischenergebnissen der Testseite. Gibt ein Client das Warten auf, wird seine Anfrage aus der Warteschlange entfernt.

## Lizenz und Modell

Der Adapter steht unter der MIT-Lizenz. Das Modell [nvidia/parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) veröffentlicht NVIDIA unter [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/); der Adapter nutzt die ONNX-Umwandlung [ysdede/parakeet-tdt-0.6b-v3-onnx](https://huggingface.co/ysdede/parakeet-tdt-0.6b-v3-onnx) und [parakeet.js](https://github.com/ysdede/parakeet.js) (MIT). Das Modell [nvidia/canary-1b-v2](https://huggingface.co/nvidia/canary-1b-v2) veröffentlicht NVIDIA ebenfalls unter [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/); der Adapter nutzt die ONNX-Umwandlung [istupakov/canary-1b-v2-onnx](https://huggingface.co/istupakov/canary-1b-v2-onnx) und führt sie so aus wie [onnx-asr](https://github.com/istupakov/onnx-asr).

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

- (@GermanBluefox) **Renamed from ai-parakeet to voice.** A new instance takes over the settings, the downloaded model, the Piper files and the uploads of `ai-parakeet.<n>` with the same number, see Moving from ai-parakeet

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