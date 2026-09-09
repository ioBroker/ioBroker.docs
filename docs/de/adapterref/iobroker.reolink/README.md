---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: 5OorZn0IyfqIMVnxiFVoVf6i58cbkPXb0wIuV3MA7yU=
---
![Logo](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/reolink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/reolink-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)
![Test und Freigabe](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

# ioBroker.reolink

## reolink-Adapter für ioBroker

Adapter für die ioBroker-Plattform zum Abrufen [von Reolink-Kamerainformationen](https://reolink.com/) .

Generell unterstützen alle neueren Reolink-Kameras API-Befehle. Sie unterscheiden sich lediglich in den unterstützten Befehlen.

Noch ein Hinweis zum Passwort: Testen Sie es mit und ohne URI-Kodierung, wenn Ihr Passwort nur ein Sonderzeichen enthält. Verwenden Sie für dieselbe Sicherheit besser kein Sonderzeichen und stattdessen ein längeres Passwort. Überprüfen Sie unter [http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo\&channel=0\&user=username\&password=yoursecurity,](http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo\&channel=0\&user=username\&password=yoursecurity) ob Ihre Zugangsdaten funktionieren.

Falls Sie einen bestimmten API-Befehl einbeziehen möchten, lassen Sie es mich einfach wissen.

## Implementierte Funktionen

### SATZ

- PTZ-Steuerung / PTZ-Überwachung
- Push-Benachrichtigung
- Autofokuswerte einstellen: 0,1
- IR-Lichtwerte einstellen: Auto, Aus
- LED-Lichtset
- Werte für E-Mail-Benachrichtigungen festlegen: 0, 1
- Audio-Alarm abspielen
- Zoom-Fokus

Funktionen können durch Ändern von Reolink ausgelöst werden.<Instanze> .settings-Zustände.

### ERHALTEN

- Geräteinformationen
- PTZ-Informationen
- Laufwerksinformationen
- Netzwerkinformationen
- Bewegungserkennung
- Autofokus
- Schnappschuss
- Infrarotlicht
- LED-Licht
- E-Mail-Benachrichtigung

### Push-Benachrichtigungseinstellungen

Push-Benachrichtigungen auf ein Telefon werden nur dann bereitgestellt, wenn folgende Bedingungen erfüllt sind:

- Der Schalter für Push-Benachrichtigungen im Adapter ist eingeschaltet.
- Bei NVRs sind sowohl der globale Schalter als auch der Kanalschalter eingeschaltet.
- Die Push-Benachrichtigung in der Reolink-App dieses Telefons ist aktiviert.

Die Push-Benachrichtigungen in der Reolink-App funktionieren unabhängig von den Adaptereinstellungen. Sie sind auch unabhängig von den Einstellungen anderer mit derselben Kamera verbundener Smartphones. Reolink ermöglicht Ihnen so, Push-Benachrichtigungen für jedes Smartphone einzeln zu deaktivieren. Das bedeutet, dass die Deaktivierung von Push-Benachrichtigungen über iobroker die entsprechende Option in der App nicht beeinflusst.

### Beispielhafte Verwendung von „Bild abrufen“:

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Der Inhalt des **Ergebnisses** ist JSON:

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
4. **Adapter starten** → RTSP-Streams verfügbar unter`rtsp://<server-ip>:8554/<CameraName>/mainStream`

> Die Server-IP wird automatisch ermittelt.`<CameraName>` ist der Name, der in der Adapterkonfiguration festgelegt ist.

### Batteriesparmodus

**Der Akku entlädt sich im Betrieb schnell!** Der Adapter verwendet eine automatische Deaktivierungsstrategie:

- **`streams.enable`** (Boolescher Wert) — RTSP-Streaming aktivieren/deaktivieren
  - Standard:`false` (Aus = Batteriesparmodus)
  - Automatische Deaktivierung nach 30 Sekunden (konfigurierbar)
  - Der Stream pausiert automatisch, wenn kein Client verbunden ist.

- **`mqtt.enable`** (Boolesch) — MQTT-Integration für Bewegungs-/Batterie-/Flutlicht-/PIR-Sensoren aktivieren
  - Erforderlich für Statusaktualisierungen und Flutlicht-/PIR-Steuerung
  - Automatische Deaktivierung nach konfigurierbarem Timeout (Batterieschutz)
  - Broker in den Adaptereinstellungen konfigurieren

### Akku-Kamera-Status

| Zustand                  | Typ             | R/W | Beschreibung                                                                              |
| ------------------------ | --------------- | --- | ----------------------------------------------------------------------------------------- |
| `streams.enable`         | boolescher Wert | R/W | RTSP-Stream starten/stoppen                                                               |
| `streams.mainStream`     | Zeichenkette    | R   | RTSP-URL für Hauptstream                                                                  |
| `streams.subStream`      | Zeichenkette    | R   | RTSP-URL für Unterstream                                                                  |
| `mqtt.enable`            | boolescher Wert | R/W | MQTT-Integration starten/stoppen                                                          |
| `floodlight`             | boolescher Wert | R/W | Flutlicht ein/aus – Status über MQTT, Steuerung über MQTT (automatischer Start von MQTT)  |
| `pir`                    | boolescher Wert | R/W | PIR-Sensor ein/aus – Status über MQTT, Steuerung über MQTT (automatischer Start von MQTT) |
| `snapshot`               | Taste           | W   | Snapshot über RTSP erfassen                                                               |
| `query.battery`          | Taste           | W   | Akkuladestand über die NeoLink-Befehlszeile abfragen                                      |
| `query.preview`          | Taste           | W   | Snapshot über RTSP erfassen                                                               |
| `ptz.preset`             | Nummer          | R/W | Kamera auf gespeicherte Voreinstellungsposition bewegen (0–9)                             |
| `ptz.up/down/left/right` | boolescher Wert | R/W | Zum Bewegen gedrückt halten (`true` =Start,`false` =Stopp)                                |
| `ptz.speed`              | Nummer          | R/W | PTZ-Bewegungsgeschwindigkeit (1–100, Standardwert 32)                                     |
| `status.motion`          | boolescher Wert | R   | Bewegung erkannt (via MQTT)                                                               |
| `status.battery_level`   | Nummer          | R   | Akkustand in % (über Neolink CLI, periodisch)                                             |

|`snapshotImage` | Zeichenkette | R | Letztes Snapshot-Bild (base64, Daten-URI) | |`snapshotStatus` | Zeichenkette | R | Snapshot-Status:`idle` /`capturing` /`success` /`error` | |`info.neolink_status` | Zeichenkette | R | Neolink-Prozessstatus:`stopped` /`running` |

### PTZ-Steuerung

PTZ funktioniert über die Neolink-Befehlszeilenschnittstelle – MQTT ist nicht erforderlich.

**Richtungsbewegung** (`ptz.up/down/left/right` ):

- Auf einstellen`true` → Die Kamera beginnt sich zu bewegen und stoppt automatisch nach 5 Sekunden.
- Auf einstellen`false` → Die Kamera stoppt sofort
- In VIS: Konfigurieren Sie eine Schaltfläche mit`mousedown=true` /`mouseup=false` zum Halten-zum-Bewegen
- Geschwindigkeit anpassen mit`ptz.speed` (1–100)

**Voreinstellungen** (`ptz.preset` ): Stellen Sie eine voreingestellte Zahl (0–9) ein, um zu dieser gespeicherten Position zu springen.

### Merkmale

✅ RTSP-Streams (Haupt- + Nebenkanal)\
&#x20;✅ Momentaufnahmeaufnahme (erfordert ffmpeg)\
&#x20;✅ Flutlichtsteuerung (Status + Steuerung über MQTT)\
&#x20;✅ PIR-Sensorsteuerung (Status + Steuerung via MQTT)\
&#x20;✅ Bewegungserkennung (via MQTT)\
&#x20;✅ Akkustand (regelmäßig über die Neolink-Befehlszeilenschnittstelle)\
&#x20;✅ Vorschaubild (automatische Aktualisierung via MQTT)\
&#x20;✅ PTZ-Steuerung – Richtungsbewegung + Voreinstellungen (über Neolink CLI)\
&#x20;✅ Multiplattform – Neolink-Binärdatei wird automatisch heruntergeladen (Linux x64/ARM/ARM64, macOS)

### MQTT-Einrichtung

In den Adaptereinstellungen konfigurieren:

- **Broker-Host** (Standard:`127.0.0.1` )
- **Broker-Port** (Standard:`1883` )
- **Benutzername / Passwort** (optional)
- **Automatische Deaktivierung des Timeouts** (Standard:`30` s, Batterieschutz)

MQTT wird für Kamerastatusaktualisierungen und -steuerung verwendet. Der Adapter abonniert automatisch, wenn`mqtt.enable` ist eingestellt auf`true` Die

Statusthemen (von der Kamera über Neolink veröffentlicht):

- `neolink/<camera>/status/motion`
- `neolink/<camera>/status/battery_level`
- `neolink/<camera>/status/floodlight`
- `neolink/<camera>/status/pir`
- `neolink/<camera>/status/preview`

Steuerungsthemen (vom Adapter an die Kamera gesendet):

- `neolink/<camera>/control/floodlight`
- `neolink/<camera>/control/pir`

### Fehlerbehebung

| Problem                                 | Lösung                                                                                  |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| "Kamera-UID erforderlich"               | UID aus der Reolink-App eingeben → Geräteinformationen                                  |
| "libgstrspserver nicht gefunden"        | `sudo apt install gstreamer1.0-rtsp`                                                    |
| Stream kann keine Verbindung herstellen | Aktivieren`streams.enable` Warten Sie ca. 5 Sekunden, bis Neolink startet.              |
| Snapshot schlägt fehl                   | Installieren Sie ffmpeg:`sudo apt install ffmpeg`                                       |
| Flutlicht/PIR reagiert nicht            | MQTT startet automatisch – warten Sie nach dem Umschalten etwa 3 Sekunden.              |
| MQTT`NotAuthorized`                     | Broker-Zugangsdaten prüfen; Neolink verwendet`credentials = ["user", "pass"]` Format    |
| Der Akku entlädt sich schnell           | Streaming deaktivieren, wenn nicht verwendet; MQTT nur für Bewegungserkennung verwenden |
| PTZ reagiert nicht                      | Jeder PTZ-Befehl benötigt ca. 2 Sekunden (P2P-Kameraanmeldung) – das ist normal.        |

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