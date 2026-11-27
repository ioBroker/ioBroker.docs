---
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
---
# All states

[← back to README](/#/adapters/denon)

A state is only created once the receiver answers the related query, so every model only gets the states it supports.
Buttons (role `button`) are created together with the value they belong to.

### info – device and current signal (read only)

| State | Description |
|---|---|
| `connection` | `true` while connected to the receiver |
| `name` | device name as set in the receiver |
| `model`, `brand`, `zones` | model (e.g. `AVR-X2200W`), brand (`Denon`/`Marantz`), number of zones incl. main zone |
| `firmware`, `firmwareDts` | firmware version of the receiver and of the DTS decoder |
| `audioSignal` | audio signal as text, e.g. `Dolby TrueHD / Atmos` |
| `audioSignalCode`, `audioSampleRate` | code of the audio signal (table below) and sample rate, e.g. `48K` |
| `videoInputResolution`, `videoOutputResolution` | resolution at the HDMI input and output, e.g. `1080p 24Hz`, `2160p 50/60Hz`, `no signal` |
| `videoResolutionCode` | raw code of the video resolution (models up to about 2016) |
| `soundModeGroup` | active sound mode group: `MOV` movie, `MUS` music, `GAM` game, `PUR` pure |

Signal codes measured on an AVR-X2200W. The codes depend on the model generation, newer models may use other values:

| `audioSignalCode` | Signal | | Digit `videoResolutionCode` | Resolution |
|---|---|---|---|---|
| `01` | standby / analog | | `0` | no signal |
| `02` | PCM (stereo and multichannel) | | `2` | 480p/576p |
| `03` | Dolby Digital | | `6` | 720p |
| `04` | Dolby Digital Plus | | `7` | 1080p 50/60 Hz |
| `05` | Dolby TrueHD (also with Atmos) | | `8` | 1080p 24 Hz |
| `06` | DTS | | `9` | 2160p 24/25 Hz |
| `08` | DTS-HD High Resolution | | `A` | 2160p 50/60 Hz |
| `09` | DTS-HD Master Audio | | | |
| `12` | no signal (while switching, Marantz Cinema also in standby) | | | |

The video code consists of `0`, the digit of the input and the digit of the output, e.g. `088` = 1080p 24 Hz in and out.

### system – whole device

| State | Description |
|---|---|
| `power` | receiver on (`true`) or standby (`false`), all zones |
| `ecoMode` | ECO mode: `ON`, `AUTO`, `OFF` |
| `allZoneStereo` | All Zone Stereo: play the main zone in all zones |
| `speakerPreset` | speaker preset 1 or 2 |

### main – main zone (zone2, zone3 the same)

| State | Description |
|---|---|
| `power` | zone on/off |
| `volume` | volume 0 ... 98 (main zone in steps of 0.5, zone 2/3 in whole steps) |
| `volumeDb` | the same volume in dB (-80 ... +18) |
| `volumeUp`, `volumeDown` | buttons: volume up / down |
| `mute` | mute |
| `input` | input. The list shows the names of the receiver menu and only the inputs used there. The stored value is the code (e.g. `MPLAY`), which stays the same when an input is renamed. Zone 2/3 additionally `SOURCE` = same as main zone |
| `quickSelect` | quick select (Marantz: smart select) 1 ... 5, newer models 1 ... 6, with the names of the receiver. `0` = none active |
| `sleepTimer` | sleep timer in minutes, `0` = off |
| `autoStandby` | auto standby (main zone 15/30/60 min, zone 2/3 2/4/8 h) |
| `maxVolume`, `maxVolumeDb` | volume limit (main zone only, read only) |
| `surroundMode` | surround mode, e.g. `STEREO`, `DOLBY SURROUND`. Unknown modes are added automatically |
| `soundModeMovie`, `soundModeMusic`, `soundModeGame`, `soundModeDirect`, `soundModePureDirect`, `soundModeStereo`, `soundModeAuto` | buttons: select a sound mode group, the receiver picks the matching mode for the signal |
| `cover` | URL of the cover of the current network source (not on HEOS models) |
| `zone2.hdmiAudio` | HDMI audio in zone 2: `THR` pass through, `PCM` convert |

### main.audio – sound

| State | Description |
|---|---|
| `bass`, `treble` (+ `Up`/`Down`) | bass and treble in dB (-6 ... +6), only with tone control (`toneControl`) on. Also in zone 2/3 |
| `toneControl` | tone control on/off |
| `multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel` | Audyssey: MultEQ curve, Dynamic EQ, Dynamic Volume, reference level offset (0/5/10/15 dB) |
| `lfc`, `containment` (+ `Up`/`Down`) | Audyssey LFC (bass limit for neighbours) and its amount 1 ... 7 |
| `dynamicCompression` | dynamic range compression |
| `subwoofer` | subwoofer on/off |
| `subwooferLevelAdjust`, `subwooferLevel`, `subwoofer2Level` (+ `Up`/`Down`) | subwoofer level on/off and in dB |
| `lfe` | LFE level (effects channel) 0 ... -10 dB |
| `dialogLevelAdjust`, `dialogLevel`, `dialogControl` | dialog level on/off and in dB, dialog enhancement 0 ... 6 (DTS:X) |
| `dialogEnhancer` | dialog enhancer `OFF`, `LOW`, `MED`, `HIGH` (newer models) |
| `frontSpeaker` | front speakers `SPA` (A), `SPB` (B), `A+B`; only if "Front B" is assigned in the receiver's amp assign setup |
| `mdax` | M-DAX (improves compressed music, Marantz): `OFF`, `LOW`, `MED`, `HI` |
| `bassSync` | Bass Sync 0 ... 16 dB |
| `bluetoothTransmitter` | Bluetooth transmitter for headphones on/off (newer models) |
| `bluetoothOutput` | Bluetooth output `SP` (Bluetooth + speakers) or `BT` (Bluetooth only) |
| `bluetoothLevel` | Bluetooth level -50 ... +10 dB |
| `autoLipSync` | auto lip sync on/off (Marantz Cinema) |
| `dacFilter` | DAC filter `MODE1`, `MODE2` (Marantz) |
| `imax`, `imaxAudio` | IMAX Enhanced: mode `AUTO`, `ON`, `OFF`; audio settings `AUTO`, `MANUAL` |
| `imaxHighPass`, `imaxLowPass` | IMAX crossover frequencies in Hz (e.g. `080` = 80 Hz) |
| `imaxSubwoofer`, `imaxSubwooferOutput` | IMAX subwoofer mode on/off; output `L+M` (LFE + main) or `LFE` |
| `cinemaEq`, `neuralX`, `graphicEq`, `headphoneEq`, `loudness` | Cinema EQ, DTS Neural:X, graphic EQ, headphone EQ, loudness management |
| `audioDelay` | audio delay (lip sync) 0 ... 300 ms |
| `audioRestorer` | audio restorer for compressed music |
| `centerSpread` | center spread |
| `inputMode`, `digitalInputMode` | audio input mode (`AUTO`, `HDMI`, `DIGITAL`, `ANALOG` ...) and digital mode (`AUTO`, `PCM`, `DTS`) |

### main.video – video and HDMI

| State | Description |
|---|---|
| `monitor` | HDMI output: `AUTO`, `1`, `2` |
| `hdmiResolution`, `analogResolution` | output resolution (scaler). Newer models only know `AUTO` and `OFF` |
| `aspectRatio` | aspect ratio `NRM` (4:3) or `FUL` (16:9) |
| `processingMode` | video processing `AUTO`, `GAME`, `MOVI`, `BYP` |
| `pictureMode` | picture mode `OFF`, `STD`, `MOV`, `VVD`, `STM`, `CTM`, `DAY`, `NGT` |
| `hdmiAudioOutput` | HDMI audio via `AMP` (receiver) or `TV` |

### main.channelVolume – channel levels

Level of every speaker in dB (-12 ... +12), e.g. `frontLeft`, `center`, `subwoofer`. Only the channels set up in the
receiver are created. Zone 2/3: `frontLeft` and `frontRight`.

### remote – remote control

| State | Description |
|---|---|
| `menu` | setup menu on the TV on/off |
| `up`, `down`, `left`, `right`, `enter`, `back`, `option`, `info` | buttons to operate the menu |
| `play`, `pause`, `playPause`, `next`, `previous` | playback of network sources (models without HEOS only) |

### display – front display and network menu

| State | Description |
|---|---|
| `brightness` | brightness: `BRI` bright, `DIM` dimmed, `DAR` dark, `OFF` off |
| `illumination` | front panel illumination (Marantz): `AUTO`, `BRI`, `DIM`, `DAR`, `OFF` |
| `line0` ... `line8` | content of the network menu or the playback screen, line 0 is the title (not on HEOS models) |
| `cursorLine` | line 1 ... 7 with the cursor |

### tuner

| State | Description |
|---|---|
| `frequency` (+ `frequencyUp`/`Down`) | frequency, FM in MHz (e.g. `106.9`), AM in kHz |
| `stationName` | RDS station name |
| `band`, `tuningMode` | band `FM`/`AM`, tuning `AUTO`/`MANUAL` |
| `preset` (+ `presetUp`/`Down`) | station preset, `0` = no preset (Marantz) |

### netAudio – network favorites (models without HEOS)

| State | Description |
|---|---|
| `presets` | stored favorites as JSON (`{"1":"Station"}`) |
| `loadPreset`, `savePreset` | recall a favorite / store the current station (number) |

### expert – raw commands

| State | Description |
|---|---|
| `command` | send any protocol command, e.g. `PSDYNEQ ON` |
| `readingPattern` | regular expression, e.g. `^PSDYNEQ` |
| `readingResult` | last answer of the receiver matching the pattern |

## Multi zone amplifiers (DENON POA-3012CI)

Multi zone amplifiers like the DENON POA-3012CI use a different protocol. The states `info.connection`, `system.power`,
`expert.*` and `display.brightness` are equal to the ones above. Additionally the following states are created
for each zone 2 ... 12 (even numbers):

| State | Type | R/W | Description |
|---|---|---|---|
| `zoneX.speakerOneVolume` / `zoneX.speakerTwoVolume` | number | R/W | Volume of the speaker 0 ... 99. In operation mode `BRIDGED` both speakers are controlled together |
| `zoneX.selectInputOne` / `zoneX.selectInputTwo` | string | R/W | Input of the speaker: `0` BUS L, `1` BUS R, `2` BUS M, `3` AUX |
| `zoneX.operationMode` | string | R/W | `0` NORMAL, `1` BRIDGED |
| `zoneX.lowCutFilterSpeakerOne` / `zoneX.lowCutFilterSpeakerTwo` | boolean | R/W | Low cut filter of the speaker |
| `zoneX.zoneTurnOnModeChange` | string | R/W | `0` constant, `1` trigger in, `2` audio signal, `3` off |
| `zoneX.triggerInput` | boolean | R/W | Trigger input |
| `zoneX.audioSignalInput` | boolean | R/W | Audio signal input |
| `system.powerConfigurationChange` | string | R/W | Power configuration |
| `system.masterTriggerInput` | boolean | R/W | Master trigger input |

## Technical details

* **Connection:** the adapter uses the official telnet control protocol on port 23. After a connection loss it reconnects by itself (1 s, 2 s, 4 s ... up to 60 s). If the receiver does not send anything for 30 seconds, a query is sent; without an answer it reconnects. A refused connection is only reported as warning after 30 seconds, because a booting receiver also refuses connections for a few seconds.
* **Command pacing:** commands are queued and sent with the configured interval. Commands of the user are sent before pending queries. After switching on, the next command is delayed by 1 second as required by the protocol.
* **Values:** read values of value lists are the codes of the receiver (e.g. `BRI`). Writing accepts the code or the shown name. Surround modes reported by the receiver which are missing in the list are added automatically.
* **Denon and Marantz:** quick select uses `QUICK` on Denon and `SMART` on Marantz receivers. The adapter detects the brand and only sends the matching command.
* **Settings changed in standby:** when the main zone is switched on, all settings are read again.