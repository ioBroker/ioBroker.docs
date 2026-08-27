---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.assistant-satellite/README.md
title: ioBroker.assistant-satellite
hash: SMwPC8GqLB2hN4xQpJ0Eh20mFqyjz5cNlmBdTZ/frcE=
---
<img src="admin/assistant-satellite.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant-satellite
Ein ioBroker-Adapter, der den Host, auf dem er läuft, in einen **Sprachsatelliten** für [`ioBroker.assistant`](https://github.com/ioBroker/ioBroker.assistant) verwandelt: Er erkennt das Aktivierungswort, streamt das Mikrofon an den Sprachserver des Assistenten und gibt die gesprochene Antwort wieder.

Es handelt sich um eine schlanke Hülle um das eigenständige Paket [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite). Verwenden Sie diesen Adapter, wenn auf dem Satellitengerät bereits ioBroker läuft (Konfiguration und Status über die Admin-Oberfläche). Auf einem Raspberry Pi ohne ioBroker verwenden Sie das eigenständige Paket direkt (`npx @iobroker/assistant-satellite`).

## Anforderungen
- Ein Mikrofon und ein Lautsprecher am Host
- Audio-Backend (automatisch ausgewählt oder unter **Audio-Backend** erzwingen):
- **Linux** → `alsa-utils`: `arecord` zeichnet auf, `aplay` spielt ab (`sudo apt install alsa-utils`)
- **Windows / macOS** → **ffmpeg**: `ffmpeg` zeichnet auf und `ffplay` spielt ab — Sie benötigen **beide** Binärdateien,

Erreichbar über `PATH` (siehe unten). Minimale Builds, die nur `ffmpeg.exe` ausliefern, reichen nicht aus.

- Eine laufende `ioBroker.assistant`-Instanz (der Satellit kommuniziert standardmäßig über den ioBroker-Nachrichtenbus mit ihr)

### Ffmpeg / ffplay im PATH (Windows, macOS)
Der Adapter beginnt `ffmpeg` und `ffplay` **nach Namen**, daher muss sich der Ordner, der sie enthält, im `PATH` des Kontos befinden, unter dem ioBroker ausgeführt wird – und nicht nur in Ihrem eigenen Terminal:

- **Windows** — Laden Sie eine vollständige Version herunter (z. B. [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) oder

Entpacken Sie die Datei [BtbN](https://github.com/BtbN/FFmpeg-Builds/releases), z. B. nach `C:\FFMPEG`, und fügen Sie den Ordner mit `ffmpeg.exe` **und** `ffplay.exe` zum **Systempfad** `Path` hinzu (*Systemeigenschaften → Erweitert → Umgebungsvariablen → Systemvariablen → Pfad*). Überprüfen Sie anschließend in einer **neuen** Shell: `where ffmpeg` und `where ffplay`.

- **macOS** — `brew install ffmpeg` (installiert beides in das Homebrew-Verzeichnis `bin`); überprüfen Sie mit

`which ffmpeg ffplay`.

Ein Prozess sieht immer nur das `PATH`, das er beim Start geerbt hat. **Starten Sie ioBroker (Dienst oder Host) nach der Änderung neu** – andernfalls wird im Instanzprotokoll weiterhin `ffmpeg failed: spawn ffmpeg ENOENT — is it installed? (install ffmpeg)` angezeigt.

## Aufstellen
Installieren Sie den Adapter, fügen Sie eine Instanz hinzu und konfigurieren Sie ihn anschließend. Die Einstellungen sind gruppiert:

**ioBroker.assistant Server**

- **Assistant-Instanz** — Wählen Sie die laufende `ioBroker.assistant`-Instanz aus, mit der dieser Satellit kommuniziert.
- **Transport** — **ioBroker** (Audio über den Message Bus, kein UDP-Port, zentrale STT/TTS — *empfohlen*)

oder **UDP** (Hannah-Audiostream, ESP-kompatibel). Bei Verwendung von UDP legen Sie den **lokalen Listening-Port** (Standard: `7776`) fest und, falls die falsche Schnittstelle automatisch ausgewählt wird, eine **Host-IP-Überschreibung**.

**Identität**

- **Raum** — Weisen Sie den Satelliten einem Raum zu

**Audio**

- **Audio-Backend** — `Auto` / `ALSA` / `ffmpeg`
- **Mikrofon-/Lautsprechergerät** — z. B. `plughw:2,0` auf einem Raspberry Pi (ALSA) oder ein dshow-Name / avfoundation-Index

(ffmpeg); `default` = Systemstandard. Die Gerätelisten werden von diesem Host gelesen (die Instanz muss ausgeführt werden).

Unter **Windows/macOS** können nur *Aufnahmegeräte* aufgelistet werden, und `ffplay` gibt immer das Standardausgabegerät des Systems wieder – wählen Sie den Lautsprecher in den Soundeinstellungen des Betriebssystems aus, nicht hier.

- **ALSA-Mixersteuerung** – optional; wird nur von den Zuständen `volume`/`mute` verwendet (siehe unten). Leer = automatische Erkennung

Auf der Sprecherkarte wird ein Name vermerkt (z. B. `PCM`, `Master`, `Speaker`), falls die falsche Karte ausgewählt wird. Nur für ALSA.

**Weckwort**

- **Weckwortmodell** — integriertes `hey_jarvis` (Standard), `alexa`, `hey_mycroft`, `hey_rhasspy` oder eine URL /

Lokaler Pfad `.onnx`. Sie können bis zu **drei** Aktivierungswörter konfigurieren – der Satellit reagiert auf jedes davon.

- **Schwellenwert** — 0–1, niedriger = empfindlicher.
- **Laden Sie ein benutzerdefiniertes Aktivierungswortmodell hoch** — Laden Sie eine einzelne, in sich abgeschlossene `.onnx`-Datei hoch (externe Daten `.onnx` +

Wenn `.onnx.data` nicht unterstützt wird, wählen Sie es anschließend im Feld für das Aktivierungswort oben aus. Verwenden Sie den integrierten **Aktivierungsworttest**, um die Erkennung live zu überprüfen (die Zustände `test.*` melden während der Ausführung Punktzahl/Spitzenwert/Mikrofonpegel).

- **Nachfolgegespräch** — Lassen Sie nach einer Antwort das Mikrofon für ein kurzes **Nachfolgegespräch** geöffnet, damit Sie

fortfahren ("…und die Küche auch") oder eine klärende Frage beantworten, ohne das Aktivierungswort erneut zu sagen.

**Aufnahme (erweitert)** — Stilleerkennung und Anpassung der Aufnahmelänge: **RMS-Schwellenwert für Stille**, **Stille (ms)**, **min./max. Aufnahme (ms)** und **Vorpufferungsblöcke**.

Beim ersten Start werden die OpenWakeWord-Modelle in das Instanzdatenverzeichnis heruntergeladen. Anschließend wird das Aktivierungswort gesprochen und die Antwort wiedergegeben. Der Status `status` zeigt `idle` / `listening` / `processing` / `speaking` an, und `info.connection` gibt an, ob der Satellit beim Assistenten registriert ist.

## Lautstärke, Stummschaltung, Nicht stören
Diese beschreibbaren Zustände gelten gleichermaßen für Antworten, Ansagen und den Signalton:

- **`Lautstärke`** — 0–100 %
- **`mute`** — den Sprecher stumm schalten
- **`dnd`** — Nicht stören: **Durchsagen werden unterdrückt** (Antworten auf Ihre eigenen Fragen werden weiterhin abgespielt)

`volume` und `mute` steuern den Mixer des Hosts. Beim Start verhält es sich umgekehrt: Der Adapter liest die aktuelle Einstellung des Hosts in die beiden Zustände ein, sodass das Starten einer Instanz die Lautstärke des Geräts nicht verändert. Jeder nachfolgende Schreibvorgang in die Zustände wird auf den Mixer angewendet.

- **Linux (ALSA)** – der Mixer der Lautsprecherkarte. Die Steuerung wird automatisch erkannt oder kann manuell eingestellt werden.

**ALSA-Mixersteuerung**, falls der falsche ausgewählt wird.

- **Windows** — Master-Lautstärkeregelung / Stummschaltung des **Standard-Wiedergabegeräts** (Core Audio, angesteuert über den

(Integriertes PowerShell – keine zusätzliche Installation erforderlich). Dort wird `ffplay` abgespielt, d. h. derselbe Schieberegler wie in den Windows-Soundeinstellungen, sodass er **systemweit** gilt, nicht nur für den Satelliten.

- **macOS** — nicht kompatibel: `dnd` funktioniert, `volume` / `mute` nicht.

**Prioritätsansagen:** Wenn der Ansagetext (gesendet über die `tts.text` / `satellites.<id>.tts` des Assistenten) mit **`!`** beginnt, wird das `!` entfernt und die Ansage wird **auch dann abgespielt, wenn der Nicht-Stören-Modus aktiviert ist** – z. B. `!Water leak in the basement`.

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