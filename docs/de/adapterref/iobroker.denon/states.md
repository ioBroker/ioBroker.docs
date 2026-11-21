---
chapters: {"pages":{"de/adapterref/iobroker.denon/README.md":{"title":{"de":"ioBroker.denon – Denon/Marantz AV-Receiver"},"content":"de/adapterref/iobroker.denon/README.md"},"de/adapterref/iobroker.denon/states.md":{"title":{"de":"Alle Datenpunkte"},"content":"de/adapterref/iobroker.denon/states.md"},"de/adapterref/iobroker.denon/upgrade-1x.md":{"title":{"de":"Update von 1.x auf 2.0"},"content":"de/adapterref/iobroker.denon/upgrade-1x.md"}}}
---
# Alle Datenpunkte

[← zurück zur README](/#/adapters/denon)

Ein Datenpunkt entsteht erst, wenn der Receiver auf die zugehörige Abfrage antwortet. Jedes Modell bekommt also nur die
Datenpunkte, die es kann. Tasten (Rolle `button`) entstehen zusammen mit dem Wert, zu dem sie gehören.

### info – Gerät und laufendes Signal (nur lesen)

| State | Beschreibung |
|---|---|
| `connection` | `true`, solange die Verbindung zum Receiver steht |
| `name` | Gerätename, wie im Receiver eingestellt |
| `model`, `brand`, `zones` | Modell (z. B. `AVR-X2200W`), Marke (`Denon`/`Marantz`), Anzahl Zonen inkl. Hauptzone |
| `firmware`, `firmwareDts` | Firmware-Version des Receivers und des DTS-Decoders |
| `audioSignal` | Audiosignal im Klartext, z. B. `Dolby TrueHD / Atmos` |
| `audioSignalCode`, `audioSampleRate` | Code des Audiosignals (Tabelle unten) und Abtastrate, z. B. `48K` |
| `videoInputResolution`, `videoOutputResolution` | Auflösung am HDMI-Eingang und -Ausgang, z. B. `1080p 24Hz`, `2160p 50/60Hz`, `no signal` |
| `videoResolutionCode` | Rohcode der Videoauflösung (Modelle bis etwa 2016) |
| `soundModeGroup` | aktive Klanggruppe: `MOV` Film, `MUS` Musik, `GAM` Spiel, `PUR` Pure |

Gemessene Signal-Codes eines AVR-X2200W. Die Codes hängen von der Modellgeneration ab, neuere Modelle können andere Werte nutzen:

| `audioSignalCode` | Signal | | Ziffer `videoResolutionCode` | Auflösung |
|---|---|---|---|---|
| `01` | Standby / analog | | `0` | kein Signal |
| `02` | PCM (Stereo und Mehrkanal) | | `2` | 480p/576p |
| `03` | Dolby Digital | | `6` | 720p |
| `04` | Dolby Digital Plus | | `7` | 1080p 50/60 Hz |
| `05` | Dolby TrueHD (auch mit Atmos) | | `8` | 1080p 24 Hz |
| `06` | DTS | | `9` | 2160p 24/25 Hz |
| `08` | DTS-HD High Resolution | | `A` | 2160p 50/60 Hz |
| `09` | DTS-HD Master Audio | | | |
| `12` | kein Signal (beim Umschalten, bei Marantz Cinema auch im Standby) | | | |

Der Video-Code besteht aus `0`, der Ziffer für den Eingang und der Ziffer für den Ausgang, z. B. `088` = 1080p 24 Hz ein und aus.

### system – ganzes Gerät

| State | Beschreibung |
|---|---|
| `power` | Receiver ein (`true`) oder Standby (`false`), alle Zonen |
| `ecoMode` | ECO-Modus: `ON`, `AUTO`, `OFF` |
| `allZoneStereo` | All Zone Stereo: Hauptzone in allen Zonen abspielen |
| `speakerPreset` | Lautsprecher-Preset 1 oder 2 |

### main – Hauptzone (zone2, zone3 genauso)

| State | Beschreibung |
|---|---|
| `power` | Zone ein/aus |
| `volume` | Lautstärke 0 ... 98 (Hauptzone in 0,5er-Schritten, Zone 2/3 in ganzen Schritten) |
| `volumeDb` | dieselbe Lautstärke in dB (-80 ... +18) |
| `volumeUp`, `volumeDown` | Tasten: lauter / leiser |
| `mute` | Stummschaltung |
| `input` | Eingang. Die Liste zeigt die Namen aus dem Menü des Receivers und nur die dort benutzten Eingänge. Gespeichert wird der Code (z. B. `MPLAY`), der auch beim Umbenennen gleich bleibt. Zone 2/3 zusätzlich `SOURCE` = wie Hauptzone |
| `quickSelect` | Quick Select (Marantz: Smart Select) 1 ... 5, bei neueren Modellen 1 ... 6, mit den Namen aus dem Receiver. `0` = keiner aktiv |
| `sleepTimer` | Ausschalt-Timer in Minuten, `0` = aus |
| `autoStandby` | automatischer Standby (Hauptzone 15/30/60 min, Zone 2/3 2/4/8 h) |
| `maxVolume`, `maxVolumeDb` | eingestellte Höchstlautstärke (nur Hauptzone, nur lesen) |
| `surroundMode` | Surround-Modus, z. B. `STEREO`, `DOLBY SURROUND`. Unbekannte Modi werden automatisch ergänzt |
| `soundModeMovie`, `soundModeMusic`, `soundModeGame`, `soundModeDirect`, `soundModePureDirect`, `soundModeStereo`, `soundModeAuto` | Tasten: Klanggruppe wählen, der Receiver wählt den passenden Modus zum Signal |
| `cover` | Adresse des Covers der laufenden Netzwerkquelle (nicht bei HEOS-Modellen) |
| `zone2.hdmiAudio` | Ton über HDMI in Zone 2: `THR` durchleiten, `PCM` umwandeln |

### main.audio – Klang

| State | Beschreibung |
|---|---|
| `bass`, `treble` (+ `Up`/`Down`) | Bass und Höhen in dB (-6 ... +6), nur bei eingeschalteter Klangregelung (`toneControl`). Auch in Zone 2/3 |
| `toneControl` | Klangregelung ein/aus |
| `multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel` | Audyssey-Einmessung: MultEQ-Kurve, Dynamic EQ, Dynamic Volume, Referenzpegel-Offset (0/5/10/15 dB) |
| `lfc`, `containment` (+ `Up`/`Down`) | Audyssey LFC (Bassbegrenzung für Nachbarn) und dessen Stärke 1 ... 7 |
| `dynamicCompression` | Dynamikkompression (leise Stellen lauter, laute leiser) |
| `subwoofer` | Subwoofer ein/aus |
| `subwooferLevelAdjust`, `subwooferLevel`, `subwoofer2Level` (+ `Up`/`Down`) | Subwoofer-Pegel ein/aus und in dB |
| `lfe` | LFE-Pegel (Effektkanal) 0 ... -10 dB |
| `dialogLevelAdjust`, `dialogLevel`, `dialogControl` | Dialogpegel ein/aus und in dB, Dialog-Verstärkung 0 ... 6 (DTS:X) |
| `dialogEnhancer` | Dialog Enhancer (Sprachverständlichkeit) `OFF`, `LOW`, `MED`, `HIGH` (neuere Modelle) |
| `frontSpeaker` | Lautsprecher A/B: `SPA` (A), `SPB` (B), `A+B`; nur wenn im Receiver unter Endstufenzuweisung „Front B“ eingestellt ist |
| `mdax` | M-DAX (verbessert komprimierte Musik, Marantz): `OFF`, `LOW`, `MED`, `HI` |
| `bassSync` | Bass Sync 0 ... 16 dB |
| `autoLipSync` | Auto Lip Sync ein/aus (Marantz Cinema) |
| `dacFilter` | DAC-Filter `MODE1`, `MODE2` (Marantz) |
| `imax`, `imaxAudio` | IMAX Enhanced: Modus `AUTO`, `ON`, `OFF`; Audio-Einstellungen `AUTO`, `MANUAL` |
| `imaxHighPass`, `imaxLowPass` | IMAX-Trennfrequenzen in Hz (z. B. `080` = 80 Hz) |
| `imaxSubwoofer`, `imaxSubwooferOutput` | IMAX-Subwoofer-Modus ein/aus; Ausgang `L+M` (LFE + Hauptkanäle) oder `LFE` |
| `cinemaEq`, `neuralX`, `graphicEq`, `headphoneEq`, `loudness` | Cinema EQ, DTS Neural:X, Grafik-EQ, Kopfhörer-EQ, Loudness Management |
| `audioDelay` | Audio-Verzögerung (Lippensynchronität) 0 ... 300 ms |
| `audioRestorer` | Klangverbesserung für komprimierte Musik |
| `centerSpread` | Center Spread |
| `inputMode`, `digitalInputMode` | Audio-Eingangsmodus (`AUTO`, `HDMI`, `DIGITAL`, `ANALOG` ...) und Digitalmodus (`AUTO`, `PCM`, `DTS`) |

### main.video – Bild und HDMI

| State | Beschreibung |
|---|---|
| `monitor` | HDMI-Ausgang: `AUTO`, `1`, `2` |
| `hdmiResolution`, `analogResolution` | Ausgabeauflösung (Skalierung). Neuere Modelle kennen nur `AUTO` und `OFF` |
| `aspectRatio` | Seitenverhältnis `NRM` (4:3) oder `FUL` (16:9) |
| `processingMode` | Videoverarbeitung `AUTO`, `GAME`, `MOVI`, `BYP` |
| `pictureMode` | Bildmodus `OFF`, `STD`, `MOV`, `VVD`, `STM`, `CTM`, `DAY`, `NGT` |
| `hdmiAudioOutput` | HDMI-Ton über `AMP` (Receiver) oder `TV` |

### main.channelVolume – Kanalpegel

Pegel jedes Lautsprechers in dB (-12 ... +12), z. B. `frontLeft`, `center`, `subwoofer`. Es entstehen nur die Kanäle,
die im Receiver eingerichtet sind. Zone 2/3: `frontLeft` und `frontRight`.

### remote – Fernbedienung

| State | Beschreibung |
|---|---|
| `menu` | Einstellungsmenü auf dem Fernseher ein/aus |
| `up`, `down`, `left`, `right`, `enter`, `back`, `option`, `info` | Tasten zur Menübedienung |
| `play`, `pause`, `playPause`, `next`, `previous` | Wiedergabe der Netzwerkquellen (nur Modelle ohne HEOS) |

### display – Gerätedisplay und Netzwerkmenü

| State | Beschreibung |
|---|---|
| `brightness` | Helligkeit: `BRI` hell, `DIM` gedimmt, `DAR` dunkel, `OFF` aus |
| `illumination` | Beleuchtung der Front (Marantz): `AUTO`, `BRI` hell, `DIM` gedimmt, `DAR` dunkel, `OFF` aus |
| `line0` ... `line8` | Inhalt des Netzwerkmenüs bzw. der Wiedergabeanzeige, Zeile 0 ist der Titel (nicht bei HEOS-Modellen) |
| `cursorLine` | Zeile 1 ... 7, in der der Cursor steht |

### tuner

| State | Beschreibung |
|---|---|
| `frequency` (+ `frequencyUp`/`Down`) | Frequenz, UKW in MHz (z. B. `106.9`), MW in kHz |
| `stationName` | RDS-Sendername |
| `band`, `tuningMode` | Band `FM`/`AM`, Sendersuche `AUTO`/`MANUAL` |
| `preset` (+ `presetUp`/`Down`) | Senderspeicher, `0` = kein Speicherplatz (Marantz) |

### netAudio – Netzwerk-Favoriten (Modelle ohne HEOS)

| State | Beschreibung |
|---|---|
| `presets` | gespeicherte Favoriten als JSON (`{"1":"Sender"}`) |
| `loadPreset`, `savePreset` | Favorit abrufen / aktuellen Sender speichern (Nummer) |

### expert – Rohbefehle

| State | Beschreibung |
|---|---|
| `command` | beliebigen Protokollbefehl senden, z. B. `PSDYNEQ ON` |
| `readingPattern` | regulärer Ausdruck, z. B. `^PSDYNEQ` |
| `readingResult` | letzte Antwort des Receivers, die zum Muster passt |

## Mehrzonen-Verstärker (DENON POA-3012CI)

Mehrzonen-Verstärker wie der DENON POA-3012CI nutzen ein anderes Protokoll. Die States `info.connection`, `system.power`,
`expert.*` und `display.brightness` entsprechen den oben beschriebenen. Zusätzlich werden für jede Zone
2 ... 12 (gerade Zahlen) folgende States angelegt:

| State | Typ | R/W | Beschreibung |
|---|---|---|---|
| `zoneX.speakerOneVolume` / `zoneX.speakerTwoVolume` | number | R/W | Lautstärke des Lautsprechers 0 ... 99. Im Betriebsmodus `BRIDGED` werden beide gemeinsam gesteuert |
| `zoneX.selectInputOne` / `zoneX.selectInputTwo` | string | R/W | Eingang des Lautsprechers: `0` BUS L, `1` BUS R, `2` BUS M, `3` AUX |
| `zoneX.operationMode` | string | R/W | `0` NORMAL, `1` BRIDGED |
| `zoneX.lowCutFilterSpeakerOne` / `zoneX.lowCutFilterSpeakerTwo` | boolean | R/W | Low-Cut-Filter des Lautsprechers |
| `zoneX.zoneTurnOnModeChange` | string | R/W | `0` dauerhaft, `1` Trigger-Eingang, `2` Audiosignal, `3` aus |
| `zoneX.triggerInput` | boolean | R/W | Trigger-Eingang |
| `zoneX.audioSignalInput` | boolean | R/W | Audiosignal-Eingang |
| `system.powerConfigurationChange` | string | R/W | Power-Konfiguration |
| `system.masterTriggerInput` | boolean | R/W | Master-Trigger-Eingang |

## Technische Details

* **Verbindung:** Der Adapter nutzt das offizielle Telnet-Steuerprotokoll auf Port 23. Nach einem Verbindungsverlust verbindet er sich selbst neu (1 s, 2 s, 4 s ... bis 60 s). Sendet der Receiver 30 Sekunden lang nichts, wird eine Abfrage geschickt; ohne Antwort wird neu verbunden. Eine abgelehnte Verbindung wird erst nach 30 Sekunden als Warnung gemeldet, weil auch ein hochfahrender Receiver einige Sekunden ablehnt.
* **Befehlstakt:** Befehle werden in eine Warteschlange gestellt und im eingestellten Abstand gesendet. Befehle des Nutzers kommen vor ausstehenden Abfragen. Nach dem Einschalten wird der nächste Befehl wie im Protokoll gefordert um 1 Sekunde verzögert.
* **Werte:** Gelesene Werte von Auswahllisten sind die Codes des Receivers (z. B. `BRI`). Geschrieben werden kann der Code oder der angezeigte Name. Vom Receiver gemeldete Surround-Modi, die in der Liste fehlen, werden automatisch ergänzt.
* **Denon und Marantz:** Quick Select heißt bei Denon `QUICK`, bei Marantz `SMART`. Der Adapter erkennt die Marke und sendet nur den passenden Befehl.
* **Einstellungen im Standby geändert:** Beim Einschalten der Hauptzone liest der Adapter alle Einstellungen neu.