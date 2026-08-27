---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blustream-mfp/README.md
title: ioBroker.blustream-mfp
hash: GOE2l5vKMvW0cK2w1FaUos8IlQIlEMoNwepUG5JLe4M=
---
# IoBroker.blustream-mfp

![NPM-Version](https://img.shields.io/npm/v/iobroker.blustream-mfp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blustream-mfp.svg)
![Anzahl der Installationen](https://iobroker.live/badges/blustream-mfp-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/blustream-mfp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blustream-mfp.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/AlanSRU/ioBroker.blustream-mfp/workflows/Test%20and%20Release/badge.svg)

## Blustream AV Switcher-Adapter für ioBroker
Steuern Sie die AV-Präsentationsmischer der Blustream AMF/MFP/WMF-Serie über eine serielle RS232- oder IP/Telnet-Verbindung.

### Unterstützte Geräte
| Modell | Beschreibung | Anschluss |
|-------|-------------|------------|
| **AMF42AU** | Erweiterter 4x2 Multi-Format-Switcher | IP (Telnet) |
| **MFP62** | 6x2 4K Multi-Format Präsentationsumschalter | IP (Telnet) |
| **MFP72** | 4x2 Multi-Format-Präsentationsumschalter | RS232 / IP |
| **MFP112** | 5x2 Multi-Format-Präsentationsumschalter mit HDBaseT | IP (Telnet) |
| **WMF51** | Drahtloser Medienpräsentator | IP (Telnet) |
| **WMF72** | Drahtloser Media-Presenter mit Dual-Display | IP (Telnet) |
| **C66 / C88** | 6x6 / 8x8 Contractor HDBaseT Matrix | RS232 / IP |

**Erweiterter Funktionsumfang (v0.5.3) – Routing, Ausgangsfreigabe, PoC und Voreinstellungen:**

| Familie | Modelle | Typ |
|--------|--------|------|
| Auftragnehmer C (CSC) | C44-KIT, C44CS-KIT, C66CS, C88CS | HDBaseT-Matrix |
| HMXL | HMXL42ARC, HMXL44CS, HMXL44ARC, HMXL66ARC, HMXL88ARC, HMXL88-V2 | HDBaseT-Matrix |
| HMX 18G | HMX44-18G-KIT, HMX88-18G | HDBaseT 3.0 Matrix |
| Platin (PLA) | PLA88CS, PLA88ARC-V2, PLA88L-V2 | HDBaseT-Matrix |
| Pro / Custom-Pro | PRO48HBT70(CS), PRO88HBT70CS, PRO88HDMI-V2, PRO16HBT70CS, CUSTOMPRO-HUB, CUSTOMPRO-HUB16 | HDBaseT-Matrix (bis zu 16x16 / modular) |
| CMX (HDMI) | CMX42CS, CMX44CS-V2, CMX44AB, CMX88CS, CMX88AB | HDMI-Matrix |
| MX (HDMI) | MX22AB-8K, MX44AB-V2 | HDMI-Matrix |
| SW-Umschalter | SW41HDBT, SW41AB-V2, SW41AB-8K, SW42DA, SW21AB-V2, SW21AB-V3 | HDMI / HDBaseT-Umschalter |
| Videowand / Multiview | MX44VW, MX44AVW, MV41 | Modus/Routing/Blende/MV-Audio + HDMI/VGA-Eingangsauswahl |
| USB / KVM | MX44KVM | USB-Host↔Geräte-Routing + Voreinstellungen |

Diese Familien erhalten außerdem **EDID-Management** (alle Matrizen), **CEC-Steuerung** (HMX-18G, SW41HDBT) und **Audio** (HMX-18G-Audiomatrix; Pro-Matrix-Audio-Einbettung/Stummschaltung). CMX/MX-Audio folgt dem Videoausgang (keine separate Steuerung). **Status-Rückmeldung** wird für jede Familie mit fester Breite analysiert – Routing, Ausgabefreigabe, PoC, CEC, EDID, Audiomatrix, Netzwerk, Videowandmodus und SW42DA Dante-Master-Audio – basierend auf realen Geräteaufzeichnungen. Der MX44KVM hat sein eigenes Antwortformat, aus dem Host-Routing, GPIO-Modi und USB-Kaskadierung zurückgelesen werden (seine Netzwerktabelle nicht). Die einzige Ausnahme ist **MV41**, dessen Status-Header keine Spaltentrennzeichen haben. Noch nicht unterstützt: **AMF41W** (separate Linux-CLI-API), **MFP31** und **SW12USB** (Dokumentation nicht verfügbar). Die erweiterten PIP/Rotationsfunktionen MX44AVW und MV41 sind vorläufig. Siehe `MODEL-EXPANSION-PLAN.md`.

Weitere Informationen zu Blustream-Produkten finden Sie unter [Blustream](https://www.blustream.co.uk/).

## Installation
Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche (Adapter → suchen Sie nach "blustream").

## Konfiguration
### Verbindungseinstellungen
Der Adapter unterstützt zwei Verbindungstypen:

#### IP-Verbindung (Telnet)
- **IP-Adresse**: Die IP-Adresse Ihres Blustream-Geräts
- **Port**: TCP-Port (Standard: 23 für Telnet)
- **Telnet IAC-Aushandlung**: Aktivieren Sie diese Option, wenn Ihr Gerät die Telnet-Protokollaushandlung verwendet.

#### Serielle RS232-Verbindung
- **Serielle Schnittstelle**: Pfad zum seriellen Gerät (z. B. `/dev/ttyUSB0` unter Linux, `COM3` unter Windows)
- **Baudrate**: Serielle Übertragungsgeschwindigkeit (typischerweise 57600 für MFP-Serien)

### Gerätemodell
Wählen Sie Ihr spezifisches Blustream-Gerätemodell aus dem Dropdown-Menü aus. Der Adapter konfiguriert die verfügbaren Zustände und Steuerelemente automatisch entsprechend den Funktionen des ausgewählten Modells.

### Umfrage
- **Abfrageintervall**: Wie oft das Gerät auf Statusaktualisierungen abgefragt werden soll (in Millisekunden, Standardwert: 30000)
- **Wiederverbindungsintervall**: Zeit zwischen Wiederverbindungsversuchen bei Verbindungsverlust (in Millisekunden, Standardwert: 10000)

## Staaten und Kontrollen
Der Adapter erzeugt Zustände dynamisch basierend auf dem ausgewählten Gerätemodell. Häufige Zustände sind:

### Information (`info.*`)
- `info.connection` - Geräteverbindungsstatus
- `info.model` - Gerätemodellkennung

### Befehle (`commands.*`)
- `commands.raw` - Sendet Rohbefehle an das Gerät
- `commands.getStatus` - Aktuellen Gerätestatus anfordern

### Ausgabesteuerung (`output.*`)
- `output.X.source` - Eingabequelle für Ausgabe X auswählen
- `output.X.enabled` - Ausgabe X aktivieren/deaktivieren
- `output.X.videoMute` - Deaktiviert das Videosignal auf Ausgang X

### Audio (`audio.*`)
- `audio.volume` - Master-Lautstärkepegel
- `audio.mute` - Master-Stummschaltung

### Systemsteuerung (`system.*`)
- `system.power` - Ein-/Ausschalten
- `system.beep` - Tastenton aktivieren/deaktivieren
Und je nach Gerätemodell noch weitere...

### Netzwerkeinstellungen (`network.*`)
- `network.dhcp` - DHCP aktivieren/deaktivieren
- `network.ip` - Geräte-IP-Adresse
- `network.gateway` - Gateway-Adresse
- `network.subnet` - Subnetzmaske

## Merkmale nach Modell
| Funktion | AMF42AU | MFP62 | MFP72 | MFP112 | WMF51 | WMF72 | C66 | C88 |
|---------|---------|-------|-------|--------|-------|-------|-----|-----|
| Netzwerksteuerung | Ja | Ja | - | Ja | Ja | Ja | Ja | Ja | Ja |
| RS232-Steuerung | - | - | Ja | - | - | - | Ja | Ja |
| Matrix-Routing | - | - | - | - | - | - | Ja | Ja |
| CEC-Steuerung | Ja | - | - | - | - | - | - | - | - |
| Mikrofon | Ja | Ja | - | - | - | - | - | - | - |
| Voreinstellungen | Ja | - | - | - | - | - | Ja | Ja |
| Bildsteuerung | Ja | - | - | - | - | - | - | - | - |
| WLAN-Steuerung | - | - | - | - | Ja | Ja | - | - |
| Multiview | - | - | - | - | Ja | Ja | - | - |
| HDBaseT | - | - | - | Ja | - | - | Ja | Ja |
| PoC (pro Ausgang) | - | - | - | - | - | - | Ja | Ja |

## Fehlerbehebung
### Verbindungsprobleme
1. **IP-Verbindung fehlgeschlagen**: Überprüfen Sie die IP-Adresse und den Port. Stellen Sie sicher, dass keine Firewall die Verbindung blockiert. Deaktivieren Sie die Telnet-IAC-Aushandlung, falls Ihr Gerät diese nicht unterstützt.

2. **RS232-Verbindung schlägt fehl**: Überprüfen Sie den Pfad und die Baudrate der seriellen Schnittstelle. Stellen Sie sicher, dass Sie die Berechtigung für den Zugriff auf die serielle Schnittstelle besitzen (unter Linux fügen Sie Ihren Benutzer der Gruppe `dialout` hinzu).

3. **Befehle funktionieren nicht**: Einige Geräte benötigen eine kurze Verzögerung zwischen den Befehlen. Der Adapter handhabt dies automatisch mithilfe einer Befehlswarteschlange.

### Debug-Modus
Aktivieren Sie die Debug-Protokollierung in der ioBroker-Administration, um die detaillierte Kommunikation mit dem Gerät anzuzeigen:

1. Gehen Sie zu Instanzen
2. Klicken Sie auf die Adapterinstanz.
3. Stellen Sie den Protokollierungsgrad auf "debug" ein.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.5.3 (2026-08-03)
* (Alan Paris) Added support for 39 further Blustream models, taking the total to 47: the HDBaseT matrices (C-series and C-CS, HMXL, HMX-18G, PLA/Platinum, Pro and Custom-Pro, up to 16x16), the HDMI matrices (CMX/MX), the SW-series HDMI and HDBaseT switchers, the video-wall and multi-view processors (MX44VW, MX44AVW, MV41) and the MX44KVM USB/KVM matrix
* (Alan Paris) Routing, output enable, PoC and preset recall now follow each model's own command form, so the differing firmware families (spaced `OUT 01 FR 04` versus `OUT01FR04`, the three PoC verbs, single-output switches without an output index) are each addressed correctly
* (Alan Paris) Added per-input EDID management on all matrices, CEC actions on the HMX-18G and SW41HDBT, the HMX-18G audio matrix, Pro-Matrix audio embedding, video-wall mode and bezel compensation, and USB routing on the MX44KVM
* (Alan Paris) Device status read-back is now parsed per model family from the fixed-width STATUS/INSTA/OUTSTA/CTRLSTA/AUDSTA tables, matching columns by header name so power, routing, output enable, PoC, CEC, EDID, audio, network and video-wall values are reflected in the states. Unrecognised tables are ignored rather than guessed at
* (Alan Paris) Added the device command references and the captured status replies used to build the parser under `protocols/`, plus unit tests that replay every capture
* (Alan Paris) Pre-release review fixes: EDID commands now use each model's own spacing (the CMX/MX matrices document only the unspaced form); command confirmations naming an output the model does not have no longer create a stray state; status replies whose divider is prefixed by the device prompt (MX44VW/MX44AVW) no longer stall the command queue or grow the captured-response buffer without limit; a status column reported as `N/A` now leaves its state untouched instead of writing "off"; and stopping the instance no longer schedules a reconnect after shutdown

### 0.5.2 (2026-08-03)
* (Alan Paris) Fixed the state tree keeping the previous model's controls after the device model was changed: the internal model-change check compared the model against a value the adapter had just overwritten, so the cleanup never ran. An MFP112 configured after the default MFP72, for example, was left without the HDBaseT input on `output.N.source`
* (Alan Paris) Existing instances repair themselves on first start after the update: a new `info.stateSchema` state records the layout version of the state tree, and the tree is rebuilt once when it is out of date. State values are repopulated by the next device poll. Note that the rebuild recreates the objects, so any per-state history/logging settings on the adapter's states have to be reapplied
* (Alan Paris) The WiFi password is no longer stored in clear text in `info.lastSent` or written to the debug log when it is set
* (Alan Paris) Device responses reporting an output number the configured model does not have (including an echo of the route-all command) no longer create a stray output state
* (Alan Paris) Corrected the documented state list and the per-model feature table in the README, and added the missing `system` parent object

### 0.5.1 (2026-07-16)
* (Alan Paris) Every state object now defines a default (`def`) value, so states have a defined initial value before the first device poll
* (Alan Paris) Admin config: all device-model descriptions and option labels are now translatable and provided in all 11 ioBroker languages

### 0.5.0 (2026-07-16)
* (Alan Paris) Added support for the Blustream C66 (6x6) and C88 (8x8) Contractor HDBaseT matrices: crosspoint routing across up to 8 outputs, route-all (`output.allSource`), per-output enable, per-output PoC, and 9 presets
* (Alan Paris) Added a dedicated parser for the C66/C88 fixed-width STATUS/OUTSTA tables and the `[SUCCESS]`/`[FAIL]` command confirmations, so routing, enable, PoC and network states reflect the device
* (Alan Paris) Scaler, resolution and audio states are no longer created for the C66/C88 crosspoint matrices (they have no scaler/audio path), so the object tree only exposes controls the device actually implements
* (Alan Paris) Added `protocols/c66.txt` documenting the C66/C88 RS-232 / Telnet command set (verified against FW V1.0.1d)

### 0.4.2 (2026-07-04)
* (Alan Paris) WiFi password state is now write-only (`read: false`) so the value cannot be read back from the object tree once set
* (Alan Paris) Removed the accidentally committed npm pack artifact (`.tgz`) from the repository

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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