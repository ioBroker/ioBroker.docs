---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: xaZzmVNw6uvjy6H3TumpfbeTCTSIQHcKssShqS0fPxk=
---
![Logo](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/reolink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/reolink-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**Tests:** ![Test und Freigabe](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## Reolink-Adapter für ioBroker
Adapter für die ioBroker-Plattform zum Abrufen von [Reolink-Kamera](https://reolink.com/)-Informationen.

Generell unterstützen alle neueren Reolink-Kameras API-Befehle. Sie unterscheiden sich lediglich in den unterstützten Befehlen.

Noch ein Hinweis zum Passwort: Testen Sie es mit und ohne URI-Kodierung, wenn Ihr Passwort nur ein Sonderzeichen enthält. Verwenden Sie für dieselbe Sicherheit besser kein Sonderzeichen und stattdessen ein längeres Passwort. Überprüfen Sie unter http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity, ob Ihre Zugangsdaten funktionieren.

Falls Sie einen bestimmten API-Befehl einbeziehen möchten, lassen Sie es mich einfach wissen.

## Implementierte Funktionen
### SATZ
- PTZ-Steuerung / PTZ-Überwachung
- Push-Benachrichtigung
- Autofokus einstellen

Werte: 0,1

- IR-Licht einstellen

Werte: Auto, Aus

- LED-Licht einstellen
- E-Mail-Benachrichtigung einrichten

Werte: 0, 1

- Audio-Alarm abspielen
- Zoomfokus

Funktionen können durch Ändern der Zustände von reolink.<Instanze>.settings ausgelöst werden.

 ### ERHALTEN
- Geräteinformationen
- PTZ-Informationen
- Laufwerksinformationen
- Netzwerkinformationen
- Bewegungserkennung
- Autofokus
- Momentaufnahme
- Infrarotlicht
- LED-Licht
- E-Mail-Benachrichtigung

### Push-Benachrichtigungseinstellungen
Push-Benachrichtigungen auf ein Telefon werden nur dann bereitgestellt, wenn folgende Bedingungen erfüllt sind:

- Der Schalter für Push-Benachrichtigungen im Adapter ist eingeschaltet.
- Bei NVRs sind sowohl der globale Schalter als auch der Kanalschalter eingeschaltet.
- Die Push-Benachrichtigung in der Reolink-App dieses Telefons ist aktiviert.

Die Push-Benachrichtigungen in der Reolink-App funktionieren unabhängig von den Adaptereinstellungen. Sie sind auch unabhängig von den Einstellungen anderer mit derselben Kamera verbundener Smartphones. Reolink ermöglicht Ihnen so, Push-Benachrichtigungen für jedes Smartphone einzeln zu deaktivieren. Das bedeutet, dass die Deaktivierung von Push-Benachrichtigungen über iobroker die entsprechende Option in der App nicht beeinflusst.

### Beispielhafte Verwendung von get image:
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Der Inhalt von **result** ist JSON:

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

Für Telegram funktioniert dies.

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## Batteriebetriebene Kameras
Akkubetriebene Kameras (Argus PT, Argus 3 Pro, ...) verwenden ein proprietäres Protokoll und werden über **[Neolink](https://github.com/QuantumEntangledAndy/neolink)** unterstützt – ein Open-Source-Tool, das bei der ersten Verwendung automatisch heruntergeladen wird.

### Schnellkonfiguration
1. **In den Einstellungen aktivieren:** ✅ „Batteriebetriebene Kamera“
2. **Kamera-UID eingeben:** In der Reolink-App unter „Geräteinformationen“ finden Sie diese Option.
3. **Abhängigkeit installieren (Linux):**

```bash
sudo apt install gstreamer1.0-rtsp
```

4. **Adapter starten** → RTSP-Streams verfügbar unter `rtsp://<Server-IP>:8554/<Kameraname>/mainStream`

Die Server-IP wird automatisch erkannt. `<CameraName>` ist der in der Adapterkonfiguration festgelegte Name.

### Batteriesparen
**Der Akku entlädt sich im Betrieb schnell!** Der Adapter verwendet eine automatische Deaktivierungsstrategie:

- **`streams.enable`** (Boolescher Wert) — RTSP-Streaming aktivieren/deaktivieren
- Standardwert: `false` (aus = Batteriesparmodus)
- Automatische Deaktivierung nach 30 Sekunden (konfigurierbar)
Der Stream wird automatisch pausiert, wenn kein Client verbunden ist.

- **`mqtt.enable`** (Boolescher Wert) — Aktiviert die MQTT-Integration für Bewegungs-/Batterie-/Flutlicht-/PIR-Sensoren
- Erforderlich für Statusaktualisierungen und Flutlicht-/PIR-Steuerung
- Automatische Deaktivierung nach konfigurierbarem Timeout (Batterieschutz)
- Broker in den Adaptereinstellungen konfigurieren

### Akku-Kamera-Zustände
| Zustand | Typ | R/W | Beschreibung |
|---|---|---|---|
| `streams.enable` | Boolescher Wert | Lesen/Schreiben | RTSP-Stream starten/stoppen |
| `streams.subStream` | Zeichenkette | R | RTSP-URL für Unterstream |
| `mqtt.enable` | Boolesch | Lesen/Schreiben | MQTT-Integration starten/stoppen |
| `floodlight` | Boolesch | Lese-/Schreibzugriff | Flutlicht ein/aus — Status über MQTT, Steuerung über MQTT (automatischer MQTT-Start) |
| `pir` | Boolesch | Lese-/Schreibzugriff | PIR-Sensor ein/aus — Status über MQTT, Steuerung über MQTT (automatischer MQTT-Start) |
| `snapshot` | Schaltfläche | W | Schnappschuss via RTSP aufnehmen |
| `query.battery` | Taste | W | Akkustand über Neolink CLI abfragen |
| `query.preview` | Schaltfläche | W | Schnappschuss via RTSP aufnehmen |
| `ptz.preset` | Nummer | R/W | Kamera auf gespeicherte Voreinstellungsposition bewegen (0–9) |
| `ptz.up/down/left/right` | Boolesch | Lesen/Schreiben | Halten zum Bewegen (`true`=Start, `false`=Stopp) |
| `ptz.speed` | Nummer | Lese-/Schreibzugriff | PTZ-Bewegungsgeschwindigkeit (1–100, Standard 32) |
| `status.motion` | Boolesch | R | Bewegung erkannt (via MQTT) |
| `status.battery_level` | Nummer | R | Akkustand in % (über Neolink CLI, periodisch) |
| `status.battery_level` | Zahl | R | Akkustand in % (über Neolink CLI, periodisch) |

| `snapshotImage` | Zeichenkette | R | Letztes Snapshot-Bild (base64, Daten-URI) |
| `info.neolink_status` | Zeichenkette | R | Neolink-Prozessstatus: `stopped` / `running` |
| `info.neolink_status` | Zeichenkette | R | Neolink-Prozessstatus: `stopped` / `running` |

### PTZ-Steuerung
PTZ funktioniert über die Neolink-Befehlszeilenschnittstelle – MQTT ist nicht erforderlich.

**Richtungsbewegung** (`ptz.up/down/left/right`):

- Auf `true` setzen → Die Kamera beginnt sich zu bewegen und stoppt automatisch nach 5 Sekunden.
- Auf `false` setzen → Kamera stoppt sofort
- In VIS: Konfigurieren Sie eine Schaltfläche mit `mousedown=true` / `mouseup=false` für die Halte-zum-Bewegen-Funktion.
- Geschwindigkeit mit `ptz.speed` anpassen (1–100)

**Voreinstellungen** (`ptz.preset`): Stellen Sie eine voreingestellte Zahl (0–9) ein, um zu dieser gespeicherten Position zu springen.

### Merkmale
✅ RTSP-Streams (Haupt- + Nebenstream) ✅ Snapshot-Aufnahme (erfordert ffmpeg) ✅ Flutlichtsteuerung (Status + Steuerung via MQTT) ✅ PIR-Sensorsteuerung (Status + Steuerung via MQTT) ✅ Bewegungserkennung (via MQTT) ✅ Akkustand (periodisch via NeoLink CLI) ✅ Vorschaubild (automatische Aktualisierung via MQTT) ✅ PTZ-Steuerung – Richtungsbewegung + Voreinstellungen (via NeoLink CLI) ✅ Multiplattform – NeoLink-Binärdatei wird automatisch heruntergeladen (Linux x64/ARM/ARM64, macOS)

### MQTT-Einrichtung
In den Adaptereinstellungen konfigurieren:

- **Broker-Host** (Standard: `127.0.0.1`)
- **Broker-Port** (Standard: `1883`)
- **Benutzername / Passwort** (optional)
- **Automatische Deaktivierung des Timeouts** (Standard: 30 s, Batterieschutz)

MQTT wird für Kamerastatusaktualisierungen und -steuerung verwendet. Der Adapter abonniert automatisch, wenn `mqtt.enable` auf `true` gesetzt wird.

Statusthemen (von der Kamera über Neolink veröffentlicht):

- `neolink/<Kamera>/Status/Bewegung`
- `neolink/<Kamera>/status/Batteriestand`
- `neolink/<Kamera>/Status/Flutlicht`
- `neolink/<Kamera>/status/pir`
- `neolink/<Kamera>/status/Vorschau`

Steuerungsthemen (vom Adapter an die Kamera gesendet):

- `neolink/<Kamera>/Steuerung/Flutlicht`
- `neolink/<Kamera>/Steuerung/PIR`

### Fehlerbehebung
| Problem | Lösung |
|---|---|
| "Kamera-UID erforderlich" | UID aus der Reolink-App eingeben → Geräteinformationen |
| "libgstrtspserver nicht gefunden" | `sudo apt install gstreamer1.0-rtsp` |
| Snapshot fehlgeschlagen | ffmpeg installieren: `sudo apt install ffmpeg` |
| Snapshot fehlgeschlagen | ffmpeg installieren: `sudo apt install ffmpeg` |
| MQTT `NotAuthorized` | Broker-Zugangsdaten prüfen; Neolink verwendet das Format `credentials = ["user", "pass"]` |
| MQTT `Nicht autorisiert` | Broker-Zugangsdaten prüfen; Neolink verwendet das Format `credentials = ["user", "pass"]` |
| Akku entlädt sich schnell | Streaming deaktivieren, wenn nicht verwendet; MQTT nur für Bewegungserkennung verwenden |
| PTZ reagiert nicht | Jeder PTZ-Befehl benötigt ca. 2 Sekunden (P2P-Kameraanmeldung) — dies ist normal |

---

## Bekannte funktionierende Kameras
### HTTP-API (Standard)
RLC-420-5MP, E1 Zoom, RLC-522, RLC-810A, RLC-823A, Duo 3 PoE

### Akku-Kameras (über Neolink)
Reolink Argus PT, Reolink Argus 3 Pro

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2026-03-16)
* (oelison) fast fix for issue #230

### 1.4.1 (2026-03-15)
* (oelison) fix issue #187

### 1.4.0 (2026-03-13)
* (bloop16) Battery camera support via neolink
* (oelison) Adapter requires node.js >= 20 now.

### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2026 Andy Grundt <andygrundt@gmail.com>

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