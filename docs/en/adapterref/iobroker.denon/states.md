---
chapters: {"pages":{"de/adapterref/iobroker.denon/README.md":{"title":{"de":"ioBroker.denon – Denon/Marantz AV-Receiver"},"content":"de/adapterref/iobroker.denon/README.md"},"de/adapterref/iobroker.denon/states.md":{"title":{"de":"Alle Datenpunkte"},"content":"de/adapterref/iobroker.denon/states.md"},"de/adapterref/iobroker.denon/upgrade-1x.md":{"title":{"de":"Update von 1.x auf 2.0"},"content":"de/adapterref/iobroker.denon/upgrade-1x.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.denon/states.md
title: All data points
hash: HMgLJ5772FBnzM1JZfzJg81Av5NcbYflQ5t5rB2xP+I=
---
# All data points

[← back to README](/#/adapters/denon)

A data point is only created when the receiver responds to the corresponding query. Each model therefore only receives the data points it is capable of handling. (Keys (Roller)) `button`) arise together with the value to which they belong.

### info – Device and current signal (read only)

| State                                           | Description                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `connection`                                    | `true`, as long as the connection to the receiver is established                           |
| `name`                                          | Device name as set in the receiver                                                          |
| `model`, `brand`, `zones`                       | Model (e.g. `AVR-X2200W`), brand (`Denon` /`Marantz`), Number of zones including main zone |
| `firmware`, `firmwareDts`                       | Firmware version of the receiver and the DTS decoder                                        |
| `audioSignal`                                   | Audio signal in plain text, e.g. `Dolby TrueHD / Atmos`                                      |
| `audioSignalCode`, `audioSampleRate`            | Audio signal code (table below) and sampling rate, e.g. `48K`                                |
| `videoInputResolution`, `videoOutputResolution` | Resolution at HDMI input and output, e.g. `1080p 24Hz`, `2160p 50/60Hz`, `no signal`        |
| `videoResolutionCode`                           | Raw code of the video resolution (models up to approximately 2016)                          |
| `soundModeGroup`                                | active sound group: `MOV` Film, `MUS` Music, `GAM` Game, `PUR` Pure                             |

Measured signal codes of an AVR-X2200W. The codes depend on the model generation; newer models may use different values:

| `audioSignalCode` | signal                                                              |   | Number `videoResolutionCode` | resolution     |
| ----------------- | ------------------------------------------------------------------- | - | --------------------------- | -------------- |
| `01`              | Standby / analog                                                    |   | `0`                         | no signal      |
| `02`              | PCM (Stereo and multi-channel)                                      |   | `2`                         | 480p/576p      |
| `03`              | Dolby Digital                                                       |   | `6`                         | 720p           |
| `04`              | Dolby Digital Plus                                                  |   | `7`                         | 1080p 50/60 Hz |
| `05`              | Dolby TrueHD (also with Atmos)                                      |   | `8`                         | 1080p 24 Hz    |
| `06`              | DTS                                                                 |   | `9`                         | 2160p 24/25 Hz |
| `08`              | DTS-HD High Resolution                                              |   | `A`                         | 2160p 50/60 Hz |
| `09`              | DTS-HD Master Audio                                                 |   |                             |                |
| `12`              | No signal (when switching, also in standby mode for Marantz Cinema) |   |                             |                |

The video code consists of `0`, the digit for the input and the digit for the output, e.g. `088` = 1080p 24 Hz on and off.

### system – entire device

| State           | Description                                             |
| --------------- | ------------------------------------------------------- |
| `power`         | Receiver one (`true`) or standby (`false`), all zones |
| `ecoMode`       | ECO mode: `ON`, `AUTO`, `OFF`                           |
| `allZoneStereo` | All Zone Stereo: Play main zone in all zones            |
| `speakerPreset` | Speaker preset 1 or 2                                   |

### main – main zone (zone2, zone3 the same)

| State                                                                                                                             | Description                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `power`                                                                                                                           | Zone on/off                                                                                                                                                                                                          |
| `volume`                                                                                                                          | Volume 0 ... 98 (main zone in 0.5 increments, zone 2/3 in whole increments)                                                                                                                                          |
| `volumeDb`                                                                                                                        | same volume in dB (-80 ... +18)                                                                                                                                                                                      |
| `volumeUp`, `volumeDown`                                                                                                          | Buttons: louder / quieter                                                                                                                                                                                            |
| `mute`                                                                                                                            | Mute                                                                                                                                                                                                                 |
| `input`                                                                                                                           | Input. The list shows the names from the receiver's menu and only the inputs used there. The code is saved (e.g., `MPLAY`), which remains the same even when renamed. Zone 2/3 additionally `SOURCE` = like main zone |
| `quickSelect`                                                                                                                     | Quick Select (Marantz: Smart Select) 1 ... 5, on newer models 1 ... 6, with the names from the receiver. `0` = no one active                                                                                          |
| `sleepTimer`                                                                                                                      | Power-off timer in minutes, `0` = from                                                                                                                                                                                |
| `autoStandby`                                                                                                                     | automatic standby (main zone 15/30/60 min, zone 2/3 2/4/8 h)                                                                                                                                                         |
| `maxVolume`, `maxVolumeDb`                                                                                                        | Maximum volume setting (main zone only, read only)                                                                                                                                                                   |
| `surroundMode`                                                                                                                    | Surround mode, e.g. `STEREO`, `DOLBY SURROUND` Unknown modes are added automatically.                                                                                                                                 |
| `soundModeMovie`, `soundModeMusic`, `soundModeGame`, `soundModeDirect`, `soundModePureDirect`, `soundModeStereo`, `soundModeAuto` | Buttons: Select sound group; the receiver selects the appropriate mode for the signal.                                                                                                                               |
| `cover`                                                                                                                           | Address of the cover art of the currently running network source (not applicable to HEOS models)                                                                                                                     |
| `zone2.hdmiAudio`                                                                                                                 | Audio via HDMI in Zone 2: `THR` pass through `PCM` convert                                                                                                                                                             |

### main.audio – Sound

| State                                                                        | Description                                                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `bass`, `treble` (+`Up` /`Down`)                                             | Bass and treble in dB (-6 ... +6), only with tone control switched on (`toneControl`). Also in Zone 2/3               |
| `toneControl`                                                                | Tone control on/off                                                                                                    |
| `multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel`                     | Audyssey calibration: MultEQ curve, Dynamic EQ, Dynamic Volume, reference level offset (0/5/10/15 dB)                  |
| `lfc`, `containment` (+`Up` /`Down`)                                        | Audyssey LFC (bass limit for neighbors) and its strength 1 ... 7                                                       |
| `dynamicCompression`                                                         | Dynamic compression (quiet parts louder, loud parts quieter)                                                           |
| `subwoofer`                                                                  | Subwoofer on/off                                                                                                       |
| `subwooferLevelAdjust`, `subwooferLevel`, `subwoofer2Level` (+`Up` /`Down`) | Subwoofer level on/off and in dB                                                                                       |
| `lfe`                                                                        | LFE level (effects channel) 0 ... -10 dB                                                                               |
| `dialogLevelAdjust`, `dialogLevel`, `dialogControl`                          | Dialogue level on/off and in dB, dialogue gain 0 ... 6 (DTS:X)                                                         |
| `dialogEnhancer`                                                             | Dialogue Enhancer (Speech Intelligibility) `OFF`, `LOW`, `MED`, `HIGH` (newer models)                                   |
| `frontSpeaker`                                                               | Speaker A/B: `SPA` (A), `SPB` (B), `A+B`; only if "Front B" is selected under power amplifier assignment in the receiver |
| `mdax`                                                                       | M-DAX (improves compressed music, Marantz): `OFF`, `LOW`, `MED`, `HI`                                                  |
| `bassSync`                                                                   | Bass Sync 0 ... 16 dB                                                                                                  |
| `autoLipSync`                                                                | Auto Lip Sync on/off (Marantz Cinema)                                                                                  |
| `dacFilter`                                                                  | DAC filter `MODE1`, `MODE2` (Marantz)                                                                                   |
| `imax`, `imaxAudio`                                                          | IMAX Enhanced: Mode `AUTO`, `ON`, `OFF` Audio settings `AUTO`, `MANUAL`                                                  |
| `imaxHighPass`, `imaxLowPass`                                                | IMAX cutoff frequencies in Hz (e.g. `080` (= 80 Hz)                                                                     |
| `imaxSubwoofer`, `imaxSubwooferOutput`                                       | IMAX subwoofer mode on/off; output `L+M` (LFE + main channels) or `LFE`                                                  |
| `cinemaEq`, `neuralX`, `graphicEq`, `headphoneEq`, `loudness`                | Cinema EQ, DTS Neural:X, Graphic EQ, Headphone EQ, Loudness Management                                                 |
| `audioDelay`                                                                 | Audio delay (lip synchronization) 0 ... 300 ms                                                                         |
| `audioRestorer`                                                              | Sound improvement for compressed music                                                                                 |
| `centerSpread`                                                               | Center Spread                                                                                                          |
| `inputMode`, `digitalInputMode`                                              | Audio input mode (`AUTO`, `HDMI`, `DIGITAL`, `ANALOG`...) and digital mode (`AUTO`, `PCM`, `DTS`)                    |

### main.video – Image and HDMI

| State                                | Description                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `monitor`                            | HDMI output: `AUTO`, `1`, `2`                                           |
| `hdmiResolution`, `analogResolution` | Output resolution (scaling). Newer models only support `AUTO` and `OFF` |
| `aspectRatio`                        | aspect ratio `NRM` (4:3) or `FUL` (16:9)                                 |
| `processingMode`                     | Video processing `AUTO`, `GAME`, `MOVI`, `BYP`                         |
| `pictureMode`                        | Image mode `OFF`, `STD`, `MOV`, `VVD`, `STM`, `CTM`, `DAY`, `NGT`      |
| `hdmiAudioOutput`                    | HDMI audio via `AMP` (Receiver) or `TV`                                  |

### main.channelVolume – Channel level

Level of each loudspeaker in dB (-12 ... +12), e.g. `frontLeft`, `center`, `subwoofer` Only the channels configured in the receiver will be available. Zone 2/3: `frontLeft` and `frontRight`.

### remote – remote control

| State                                                           | Description                                            |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| `menu`                                                          | TV settings menu on/off                                |
| `up`, `down`, `left`, `right`, `enter`, `back`, `option`, `info` | Menu navigation buttons                                |
| `play`, `pause`, `playPause`, `next`, `previous`                | Playback of network sources (only models without HEOS) |

### Display – Device display and network menu

| State              | Description                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `brightness`       | Brightness: `BRI` bright, `DIM` dimmed, `DAR` dark, `OFF` out of                              |
| `illumination`     | Front lighting (Marantz): `AUTO`, `BRI` bright, `DIM` dimmed, `DAR` dark, `OFF` out of        |
| `line0`... `line8` | Content of the network menu or playback display, line 0 is the title (not on HEOS models) |
| `cursorLine`       | Line 1 ... 7, where the cursor is located                                                 |

### tuner

| State                                 | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| `frequency` (+`frequencyUp` /`Down`) | Frequency, FM in MHz (e.g. `106.9`), MW in kHz     |
| `stationName`                         | RDS station name                                   |
| `band`, `tuningMode`                  | band `FM` /`AM`, Channel search `AUTO` /`MANUAL`    |
| `preset` (+`presetUp` /`Down`)       | Transmitter memory `0` = no storage space (Marantz) |

### netAudio – Network Favorites (models without HEOS)

| State                      | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `presets`                  | saved favorites as JSON (`{"1":"Sender"}`)       |
| `loadPreset`, `savePreset` | Retrieve favorite / save current channel (number) |

### expert – Raw commands

| State            | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `command`        | send any protocol command, e.g. `PSDYNEQ ON`             |
| `readingPattern` | regular expression, e.g. `^PSDYNEQ`                      |
| `readingResult`  | last response from the receiver that matches the pattern |

## Multi-zone amplifier (DENON POA-3012CI)

Multi-zone amplifiers like the DENON POA-3012CI use a different protocol. The States `info.connection`, `system.power`, `expert.*` and `display.brightness` These correspond to those described above. Additionally, the following states are created for each zone 2 ... 12 (even numbers):

| State                                                          | type    | R/W | Description                                                                            |
| -------------------------------------------------------------- | ------- | --- | -------------------------------------------------------------------------------------- |
| `zoneX.speakerOneVolume` /`zoneX.speakerTwoVolume`             | number  | R/W | Speaker volume 0 ... 99. In operating mode `BRIDGED` They are both controlled together. |
| `zoneX.selectInputOne` /`zoneX.selectInputTwo`                 | string  | R/W | Speaker input: `0` BUS L, `1` BUS R, `2` BUS M, `3` AUX                                    |
| `zoneX.operationMode`                                          | string  | R/W | `0` NORMAL, `1` BRIDGED                                                                 |
| `zoneX.lowCutFilterSpeakerOne` /`zoneX.lowCutFilterSpeakerTwo` | boolean | R/W | Low-cut filter of the loudspeaker                                                      |
| `zoneX.zoneTurnOnModeChange`                                   | string  | R/W | `0` permanently, `1` Trigger input, `2` Audio signal `3` out of                           |
| `zoneX.triggerInput`                                           | boolean | R/W | Trigger input                                                                          |
| `zoneX.audioSignalInput`                                       | boolean | R/W | Audio signal input                                                                     |
| `system.powerConfigurationChange`                              | string  | R/W | Power configuration                                                                    |
| `system.masterTriggerInput`                                    | boolean | R/W | Master trigger input                                                                   |

## Technical details

- **Connection:** The adapter uses the official Telnet control protocol on port 23. After a connection loss, it automatically reconnects (1 s, 2 s, 4 s ... up to 60 s). If the receiver doesn't send anything for 30 seconds, a query is sent; if there's no response, it reconnects. A rejected connection is only reported as a warning after 30 seconds because even a receiver that's booting up will reject the connection for a few seconds.
- **Command rate:** Commands are placed in a queue and sent at the configured interval. User commands are sent before any pending queries. After power-on, the next command is delayed by 1 second, as specified in the protocol.
- **Values:** Values read from selection lists are the receiver's codes (e.g. `BRI` The code or the displayed name can be entered. Surround modes reported by the receiver that are missing from the list will be added automatically.
- **Denon and Marantz:** Quick Select means something like this at Denon `QUICK`, at Marantz `SMART` The adapter recognizes the brand and sends only the appropriate command.
- **Settings changed in standby mode:** When the main zone is switched on, the adapter rereads all settings.