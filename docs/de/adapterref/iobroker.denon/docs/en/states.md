---
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.denon/docs/en/states.md
title: Alle Staaten
hash: arOB6nsK/SZYCaKIKImU/ZMeb/GBnsKomLZZG/VUqQ8=
---
# Alle Staaten

[← zurück zur README-Datei](/#/adapters/denon)

Ein Zustand wird erst erstellt, wenn der Empfänger die zugehörige Anfrage beantwortet, daher erhält jedes Modell nur die Zustände, die es unterstützt. Schaltflächen (Rolle) `button`) werden zusammen mit dem Wert geschaffen, zu dem sie gehören.

### Info – Gerät und aktuelles Signal (nur lesbar)

| Zustand                                         | Beschreibung                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `connection`                                    | `true` während der Verbindung zum Empfänger                                                |
| `name`                                          | Gerätename, wie im Empfänger eingestellt                                                   |
| `model`, `brand`, `zones`                       | Modell (z. B. `AVR-X2200W`), Marke (`Denon` /`Marantz`), Anzahl der Zonen inkl. Hauptzone |
| `firmware`, `firmwareDts`                       | Firmware-Version des Receivers und des DTS-Decoders                                        |
| `audioSignal`                                   | Audiosignal als Text, z.B. `Dolby TrueHD / Atmos`                                           |
| `audioSignalCode`, `audioSampleRate`            | Code des Audiosignals (siehe Tabelle unten) und Abtastrate, z. B. `48K`                     |
| `videoInputResolution`, `videoOutputResolution` | Auflösung am HDMI-Ein- und -Ausgang, z. B. `1080p 24Hz`, `2160p 50/60Hz`, `no signal`      |
| `videoResolutionCode`                           | Rohcode der Videoauflösung (Modelle bis ca. 2016)                                          |
| `soundModeGroup`                                | Gruppe mit aktiven Tonmodi: `MOV` Film, `MUS` Musik, `GAM` Spiel, `PUR` rein                   |

Die Signalcodes wurden an einem AVR-X2200W gemessen. Die Codes hängen von der Modellgeneration ab; neuere Modelle verwenden möglicherweise andere Werte.

| `audioSignalCode` | Signal                                                                           |   | Ziffer `videoResolutionCode` | Auflösung      |
| ----------------- | -------------------------------------------------------------------------------- | - | --------------------------- | -------------- |
| `01`              | Standby / Analog                                                                 |   | `0`                         | kein Signal    |
| `02`              | PCM (Stereo und Mehrkanal)                                                       |   | `2`                         | 480p/576p      |
| `03`              | Dolby Digital                                                                    |   | `6`                         | 720p           |
| `04`              | Dolby Digital Plus                                                               |   | `7`                         | 1080p 50/60 Hz |
| `05`              | Dolby TrueHD (auch mit Atmos)                                                    |   | `8`                         | 1080p 24 Hz    |
| `06`              | DTS                                                                              |   | `9`                         | 2160p 24/25 Hz |
| `08`              | DTS-HD-hohe Auflösung                                                            |   | `A`                         | 2160p 50/60 Hz |
| `09`              | DTS-HD Master Audio                                                              |   |                             |                |
| `12`              | Kein Signal (während des Umschaltens, Marantz Cinema ebenfalls im Standby-Modus) |   |                             |                |

Der Videocode besteht aus `0`, die Ziffer der Eingabe und die Ziffer der Ausgabe, z. B. `088` = 1080p 24 Hz Ein- und Ausgang.

### System – gesamtes Gerät

| Zustand         | Beschreibung                                               |
| --------------- | ---------------------------------------------------------- |
| `power`         | Empfänger an (`true`) oder Standby (`false`), alle Zonen |
| `ecoMode`       | ECO-Modus: `ON`, `AUTO`, `OFF`                             |
| `allZoneStereo` | All Zone Stereo: Wiedergabe der Hauptzone in allen Zonen   |
| `speakerPreset` | Lautsprechervoreinstellung 1 oder 2                        |

### Hauptzone – Hauptzone (Zone 2 und Zone 3 sind identisch)

| Zustand                                                                                                                           | Beschreibung                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `power`                                                                                                                           | Zone ein/aus                                                                                                                                                                                                                                                |
| `volume`                                                                                                                          | Volumen 0 ... 98 (Hauptzone in Schritten von 0,5, Zone 2/3 in ganzen Schritten)                                                                                                                                                                             |
| `volumeDb`                                                                                                                        | die gleiche Lautstärke in dB (-80 ... +18)                                                                                                                                                                                                                  |
| `volumeUp`, `volumeDown`                                                                                                          | Tasten: Lautstärke erhöhen / verringern                                                                                                                                                                                                                     |
| `mute`                                                                                                                            | stumm                                                                                                                                                                                                                                                       |
| `input`                                                                                                                           | Eingabe. Die Liste zeigt die Namen des Empfängermenüs und nur die dort verwendeten Eingaben. Der gespeicherte Wert ist der Code (z. B. `MPLAY`), was sich nicht ändert, wenn ein Eingang umbenannt wird. Zone 2/3 zusätzlich `SOURCE` = gleich wie Hauptzone |
| `quickSelect`                                                                                                                     | Quick Select (Marantz: Smart Select) 1 ... 5, neuere Modelle 1 ... 6, mit den Namen des Receivers. `0` = keine aktiv                                                                                                                                         |
| `sleepTimer`                                                                                                                      | Sleep-Timer in Minuten `0` = aus                                                                                                                                                                                                                             |
| `autoStandby`                                                                                                                     | automatischer Standby-Modus (Hauptzone 15/30/60 Min., Zone 2/3 2/4/8 Std.)                                                                                                                                                                                  |
| `maxVolume`, `maxVolumeDb`                                                                                                        | Lautstärkebegrenzung (nur Hauptzone, schreibgeschützt)                                                                                                                                                                                                      |
| `surroundMode`                                                                                                                    | Surround-Modus, z.B. `STEREO`, `DOLBY SURROUND` Unbekannte Modi werden automatisch hinzugefügt.                                                                                                                                                              |
| `soundModeMovie`, `soundModeMusic`, `soundModeGame`, `soundModeDirect`, `soundModePureDirect`, `soundModeStereo`, `soundModeAuto` | Tasten: Wählen Sie eine Klangmodusgruppe aus; der Empfänger wählt den passenden Modus für das Signal.                                                                                                                                                       |
| `cover`                                                                                                                           | URL des Covers der aktuellen Netzwerkquelle (nicht bei HEOS-Modellen)                                                                                                                                                                                       |
| `zone2.hdmiAudio`                                                                                                                 | HDMI-Audio in Zone 2: `THR` durchlaufen, `PCM` konvertieren                                                                                                                                                                                                   |

### main.audio – Ton

| Zustand                                                                      | Beschreibung                                                                                                               |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `bass`, `treble` (+`Up` /`Down`)                                            | Bässe und Höhen in dB (-6 ... +6), nur mit Klangregelung (`toneControl`) an. Auch in Zone 2/3                             |
| `toneControl`                                                                | Klangregelung ein/aus                                                                                                      |
| `multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel`                     | Audyssey: MultEQ-Kurve, Dynamischer Equalizer, Dynamische Lautstärkeregelung, Referenzpegel-Offset (0/5/10/15 dB)          |
| `lfc`, `containment` (+`Up` /`Down`)                                        | Audyssey LFC (Bassbegrenzung für Nachbarn) und dessen Wert 1 ... 7                                                         |
| `dynamicCompression`                                                         | Dynamikbereichskompression                                                                                                 |
| `subwoofer`                                                                  | Subwoofer ein/aus                                                                                                          |
| `subwooferLevelAdjust`, `subwooferLevel`, `subwoofer2Level` (+`Up` /`Down`) | Subwoofer-Pegel ein/aus und in dB                                                                                          |
| `lfe`                                                                        | LFE-Pegel (Effektkanal) 0 ... -10 dB                                                                                       |
| `dialogLevelAdjust`, `dialogLevel`, `dialogControl`                          | Dialogpegel ein/aus und in dB, Dialogverbesserung 0 ... 6 (DTS:X)                                                          |
| `dialogEnhancer`                                                             | Dialogverbesserer `OFF`, `LOW`, `MED`, `HIGH` (neuere Modelle)                                                              |
| `frontSpeaker`                                                               | Frontlautsprecher `SPA` (A), `SPB` (B), `A+B` nur wenn in den Verstärkereinstellungen des Receivers „Front B“ zugewiesen ist. |
| `mdax`                                                                       | M-DAX (verbessert komprimierte Musik, Marantz): `OFF`, `LOW`, `MED`, `HI`                                                  |
| `bassSync`                                                                   | Bass Sync 0 ... 16 dB                                                                                                      |
| `autoLipSync`                                                                | automatische Lippensynchronisation ein/aus (Marantz Cinema)                                                                |
| `dacFilter`                                                                  | DAC-Filter `MODE1`, `MODE2` (Marantz)                                                                                       |
| `imax`, `imaxAudio`                                                          | IMAX Enhanced: Modus `AUTO`, `ON`, `OFF`; Audioeinstellungen `AUTO`, `MANUAL`                                               |
| `imaxHighPass`, `imaxLowPass`                                                | IMAX-Übergangsfrequenzen in Hz (z. B. `080` = 80 Hz)                                                                        |
| `imaxSubwoofer`, `imaxSubwooferOutput`                                       | IMAX-Subwoofer-Modus ein/aus; Ausgang `L+M` (LFE + Haupt) oder `LFE`                                                         |
| `cinemaEq`, `neuralX`, `graphicEq`, `headphoneEq`, `loudness`                | Kino-EQ, DTS Neural:X, Grafik-EQ, Kopfhörer-EQ, Lautstärkeregelung                                                         |
| `audioDelay`                                                                 | Audioverzögerung (Lippensynchronisation) 0 ... 300 ms                                                                      |
| `audioRestorer`                                                              | Audio-Restaurierungsprogramm für komprimierte Musik                                                                        |
| `centerSpread`                                                               | Mittelteil                                                                                                                 |
| `inputMode`, `digitalInputMode`                                              | Audioeingangsmodus (`AUTO`, `HDMI`, `DIGITAL`, `ANALOG`...) und Digitalmodus (`AUTO`, `PCM`, `DTS`)                      |

### main.video – Video und HDMI

| Zustand                              | Beschreibung                                                            |
| ------------------------------------ | ----------------------------------------------------------------------- |
| `monitor`                            | HDMI-Ausgang: `AUTO`, `1`, `2`                                           |
| `hdmiResolution`, `analogResolution` | Ausgabeauflösung (Skalierer). Neuere Modelle kennen nur `AUTO` Und `OFF` |
| `aspectRatio`                        | Seitenverhältnis `NRM` (4:3) oder `FUL` (16:9)                            |
| `processingMode`                     | Videoverarbeitung `AUTO`, `GAME`, `MOVI`, `BYP`                         |
| `pictureMode`                        | Bildmodus `OFF`, `STD`, `MOV`, `VVD`, `STM`, `CTM`, `DAY`, `NGT`        |
| `hdmiAudioOutput`                    | HDMI-Audio über `AMP` (Empfänger) oder `TV`                               |

### main.channelVolume – Kanalpegel

Pegel jedes Lautsprechers in dB (-12 ... +12), z. B. `frontLeft`, `center`, `subwoofer` Es werden nur die im Receiver eingerichteten Kanäle erstellt. Zone 2/3: `frontLeft` Und `frontRight` Die

### Fernbedienung – Fernbedienung

| Zustand                                                          | Beschreibung                                           |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| `menu`                                                           | Einstellungsmenü am Fernseher Ein/Aus                  |
| `up`, `down`, `left`, `right`, `enter`, `back`, `option`, `info` | Tasten zur Bedienung des Menüs                         |
| `play`, `pause`, `playPause`, `next`, `previous`                  | Wiedergabe von Netzwerkquellen (nur Modelle ohne HEOS) |

### Anzeige – Frontdisplay und Netzwerkmenü

| Zustand            | Beschreibung                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `brightness`       | Helligkeit: `BRI` hell, `DIM` gedimmt, `DAR` dunkel, `OFF` aus                                                |
| `illumination`     | Frontblendenbeleuchtung (Marantz): `AUTO`, `BRI`, `DIM`, `DAR`, `OFF`                                      |
| `line0`... `line8` | Inhalt des Netzwerkmenüs oder des Wiedergabebildschirms, Zeile 0 ist der Titel (nicht bei HEOS-Modellen). |
| `cursorLine`       | Zeile 1 ... 7 mit dem Cursor                                                                              |

### Tuner

| Zustand                               | Beschreibung                                              |
| ------------------------------------- | --------------------------------------------------------- |
| `frequency` (+`frequencyUp` /`Down`) | Frequenz, FM in MHz (z. B. `106.9`), AM in kHz            |
| `stationName`                         | Name der RDS-Station                                      |
| `band`, `tuningMode`                  | Band `FM` /`AM`, Abstimmung `AUTO` /`MANUAL`               |
| `preset` (+`presetUp` /`Down`)       | Sendervoreinstellung, `0` = keine Voreinstellung (Marantz) |

### netAudio – Netzwerkfavoriten (Modelle ohne HEOS)

| Zustand                    | Beschreibung                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `presets`                  | gespeicherte Favoriten als JSON (`{"1":"Station"}`)                |
| `loadPreset`, `savePreset` | Einen Favoriten speichern / den aktuellen Sender (Nummer) speichern |

### Experte – Rohbefehle

| Zustand          | Beschreibung                                              |
| ---------------- | --------------------------------------------------------- |
| `command`        | sende einen beliebigen Protokollbefehl, z.B. `PSDYNEQ ON` |
| `readingPattern` | regulärer Ausdruck, z.B. `^PSDYNEQ`                       |
| `readingResult`  | letzte Antwort des Empfängers, die dem Muster entspricht  |

## Mehrzonenverstärker (DENON POA-3012CI)

Mehrzonenverstärker wie der DENON POA-3012CI verwenden ein anderes Protokoll. Die Staaten `info.connection`, `system.power`, `expert.*` Und `display.brightness` entsprechen den oben genannten. Zusätzlich werden für jede Zone 2 ... 12 (gerade Zahlen) die folgenden Zustände erstellt:

| Zustand                                                        | Typ             | R/W | Beschreibung                                                                                                    |
| -------------------------------------------------------------- | --------------- | --- | --------------------------------------------------------------------------------------------------------------- |
| `zoneX.speakerOneVolume` /`zoneX.speakerTwoVolume`             | Nummer          | R/W | Lautstärke des Lautsprechers 0 ... 99. Im Betriebsmodus `BRIDGED` Beide Lautsprecher werden gemeinsam gesteuert. |
| `zoneX.selectInputOne` /`zoneX.selectInputTwo`                 | Zeichenkette    | R/W | Eingabe des Sprechers: `0` BUS L, `1` BUS R, `2` BUS M, `3` AUX                                                     |
| `zoneX.operationMode`                                          | Zeichenkette    | R/W | `0` NORMAL, `1` ÜBERBRÜCKT                                                                                       |
| `zoneX.lowCutFilterSpeakerOne` /`zoneX.lowCutFilterSpeakerTwo` | boolescher Wert | R/W | Tiefpassfilter des Lautsprechers                                                                                |
| `zoneX.zoneTurnOnModeChange`                                   | Zeichenkette    | R/W | `0` Konstante, `1` Auslöser ein, `2` Audiosignal, `3` aus                                                          |
| `zoneX.triggerInput`                                           | boolescher Wert | R/W | Trigger-Eingang                                                                                                 |
| `zoneX.audioSignalInput`                                       | boolescher Wert | R/W | Audiosignaleingang                                                                                              |
| `system.powerConfigurationChange`                              | Zeichenkette    | R/W | Stromversorgungskonfiguration                                                                                   |
| `system.masterTriggerInput`                                    | boolescher Wert | R/W | Master-Trigger-Eingang                                                                                          |

## Technische Details

- **Verbindung:** Der Adapter nutzt das offizielle Telnet-Steuerungsprotokoll auf Port 23. Nach einem Verbindungsverlust stellt er die Verbindung selbstständig wieder her (1 s, 2 s, 4 s ... bis zu 60 s). Sendet der Empfänger 30 Sekunden lang keine Daten, wird eine Anfrage gesendet; erhält er keine Antwort, stellt er die Verbindung wieder her. Eine abgelehnte Verbindung wird erst nach 30 Sekunden als Warnung gemeldet, da ein Empfänger im Startvorgang ebenfalls Verbindungen für einige Sekunden ablehnt.
- **Befehlssteuerung:** Befehle werden in eine Warteschlange gestellt und im konfigurierten Intervall gesendet. Benutzerbefehle werden vor ausstehenden Anfragen gesendet. Nach dem Einschalten wird der nächste Befehl gemäß Protokoll um eine Sekunde verzögert.
- **Werte:** Die gelesenen Werte von Wertelisten sind die Codes des Empfängers (z. B. `BRI` Beim Schreiben wird entweder der Code oder der angezeigte Name akzeptiert. Vom Empfänger gemeldete Surround-Modi, die in der Liste fehlen, werden automatisch hinzugefügt.
- **Denon und Marantz:** Schnellwahlfunktionen `QUICK` auf Denon und `SMART` Bei Marantz-Receivern erkennt der Adapter die Marke und sendet nur den passenden Befehl.
- **Einstellungen im Standby-Modus geändert:** Wenn die Hauptzone eingeschaltet wird, werden alle Einstellungen erneut eingelesen.