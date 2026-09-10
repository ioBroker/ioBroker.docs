---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.yamaha
BADGE-stable: https://iobroker.live/badges/yamaha-stable.svg
BADGE-Installations: https://iobroker.live/badges/yamaha-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.yamaha
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
---
# Yamaha AV receivers and MusicCast devices

This adapter controls networked Yamaha audio devices from ioBroker: AV receivers, stereo
receivers, MusicCast speakers and soundbars, and CD receivers — from roughly 2008 onwards.

It replaces the two discontinued adapters `yamaha` and `musiccast` and speaks all three
Yamaha network protocols at once, so one device shows up as one device no matter how many
of them it happens to answer.

## Which devices work

| Device class                        | Examples                         | How it is controlled                             |
| ----------------------------------- | -------------------------------- | ------------------------------------------------ |
| AV receiver                         | RX-V, RX-A, RX-S, TSR, HTR, CX-A | YNCA, on MusicCast models additionally MusicCast |
| Stereo receiver / network amplifier | R-N, WXA, WXC, A-S               | MusicCast, on older models YNCA                  |
| Wireless speaker                    | MusicCast 20/50, WX, ISX         | MusicCast                                        |
| Soundbar                            | YSP, YAS, ATS, SR-B              | MusicCast                                        |
| CD receiver / network player        | CRX, MCR, CD-NT                  | MusicCast                                        |
| Receiver from before 2010           | RX-V from about 2008             | XML                                              |

You do not have to know which protocol your device speaks. The adapter tries all three and
uses everything that answers.

## Setting it up

1. Install the adapter and create an instance.
2. Open the instance settings. The **Devices** tab lists your receivers as cards.
3. Either leave the list empty — then the adapter searches the network by itself and runs
   whatever it finds — or press **+** and enter the IP address of a receiver.

A receiver from before 2010 does not answer a network search and always has to be added by
hand. The same is true for any device your router keeps in a different network segment.

**Give the receiver a fixed address.** The adapter recognises a device by its identity, not
by its address, and follows it when the address changes — but a device that moves while the
adapter is not running is only found again by the next network search.

### Settings

- **Network interface** — leave it empty and the search leaves through every network card of
  your ioBroker machine. Only set it if your server sits in several networks and the search
  should use a particular one. It has no effect on the receivers themselves.
- **Poll interval (older devices)** — how often a receiver from before 2010 is asked for its
  state. Those models cannot report changes by themselves. 60 seconds is a sensible default;
  a shorter interval means more network traffic for little gain.
- **Datapoint groups** — see below.

## What you get in the object tree

Each receiver becomes one device. Under it:

- **info** — whether the device is connected, its model, firmware, address, and which of the
  three protocols is live right now.
- **power, volume, mute, input, soundProgram, sleep** — the amplifier core. Always present,
  cannot be switched off.
- **player** — what is playing right now: source, artist, album, track, cover, elapsed and
  total time, repeat and shuffle, and the transport buttons. One block per zone.
- **tuner** — band, frequency in kilohertz, preset, RDS, and the DAB detail where the device
  has DAB.
- **multiroom** — everything that spans zones or devices: zones 2 to 4 with their own volume
  and input, master power, party mode, and the MusicCast group.
- **scene** — recall a scene by number or by its name, plus the list of scenes the device
  declares.
- **remote** — the on-screen remote: a cursor pad, and the menu keys where the receiver has
  them.
- **sound, hdmi, advanced** — tone controls, equalizer, signal information, HDMI outputs,
  speaker settings, the assignable input names. On MusicCast devices the device-wide settings
  join them: automatic standby and display brightness. Numeric datapoints carry the limits the
  device itself declares, so a slider offers exactly the range the receiver accepts.

Only what your device actually reports is created. A soundbar gets no zone 4, a stereo
receiver no surround decoder.

### Playback times come in two forms

`player.elapsedTime` and `player.totalTime` are a **number in seconds** — that is the form
the ioBroker media-player widget, Alexa and Google need, and the form you can calculate with.
Right next to them, `player.elapsedTimeText` and `player.totalTimeText` carry the same value
as readable text (`1:23`), for a visualization that just wants to show it.

### Switching datapoint groups off

Seven groups can be switched off in the settings: playback, tuner, multiroom, HDMI, scenes,
sound and advanced, plus the clock on devices that have one. The menu and the on-screen remote
belong to the playback group. Switching a group off removes
its datapoints — the adapter does not leave empty leftovers behind. Switching it on again
recreates them at the next connection.

## Using it

**Switch on and choose a source**

```javascript
setState("yamaha.0.living.power", true);
setState("yamaha.0.living.input", "HDMI1");
```

**Set the volume** — in decibels, exactly as the receiver shows it:

```javascript
setState("yamaha.0.living.volume", -35.5);
```

**Recall a scene** — by number or by the name shown on the device:

```javascript
setState("yamaha.0.living.scene.recall", "Movie Viewing");
```

**Press a key on the on-screen remote** — `up`, `down`, `left`, `right`, `select`, `return`,
`home`:

```javascript
setState("yamaha.0.living.remote.cursor", "left");
```

The words are the same on all three protocols, so a script keeps working when you replace the
receiver. A device only offers the keys it really has: older models know no menu keys, and their
cursor works on the menu that is open.

**Browse the menu of a network source.** `player.browse.source` opens a source, the eight
`line1` … `line8` datapoints show the current window, `selectLine` acts like the OK key, and
`pageUp`/`pageDown`/`back`/`home` navigate. For scripts there is `path`: write
`Bookmarks>Radio Paradise` and the adapter walks there by itself.

## Things worth knowing

**The first contact takes a while.** On the very first connection the adapter asks the
receiver which functions it has — up to half a minute on a YNCA device. The answers are
remembered per device and survive a restart, so every later start brings the device up in
seconds and refreshes the values in the background. A firmware update or a different device
at the same address is noticed and asked again.

**The MusicCast port can only belong to one program.** MusicCast devices send their updates
to port 41100 on your ioBroker machine, and only one program can hold it. If the old
`musiccast` adapter is still installed and running, it holds that port, and this adapter
falls back to asking every five minutes instead of being told. YNCA devices are unaffected.
Uninstall or stop the old adapter to get instant updates back.

**Zone 2 is a full zone.** It has its own volume, input, player block and scenes under
`multiroom.zone2`. Recalling a favourite switches the zone that is listening to that source,
not always the main zone.

**A refused command shows up in the log.** If a receiver rejects something — a scene its
generation does not support, a function that is unavailable in standby — you will find it as
a warning in the adapter log instead of nothing happening silently.

## When something does not work

- **The device is not found.** Older devices answer no search — add them by IP. Otherwise
  check that ioBroker and the receiver are in the same network segment, and try setting the
  network interface explicitly.
- **The device stays offline.** Check the address, and whether the receiver is reachable at
  all (its own web page usually answers on `http://<address>`). The adapter retries by
  itself, with growing pauses.
- **A datapoint stays empty.** The device does not report that value — the adapter only
  creates what it was told about, so an empty datapoint usually means the feature exists on
  other models but not on yours.
- **Nothing updates any more.** Look for the MusicCast port message above, and check
  `info.connection` on the device.

For anything else, switch the instance log level to debug for a moment — the adapter says
what it asks, what it gets, and what it refuses to send.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.7.2 (2026-09-09)

- (krobipd) Fixed: The volume readout now follows the scale the receiver is actually showing, so a receiver set to numbers no longer reports them as decibels.
- (krobipd) New: Inputs now appear under the names the receiver carries for them, so a socket named “Apple TV” reads that way instead of HDMI1.
- (krobipd) Changed: After this update every receiver is asked about its abilities once more, so the first start takes a little longer than usual.

### 2.7.1 (2026-09-09)

- (krobipd) Improved: The first connection asks a receiver only what its generation can answer, so zones, trigger sockets and per-input settings follow the device, not a catalogue.
- (krobipd) New: A datapoint the receiver reveals later now appears at once — a function it starts answering, a value it reports for the first time, a status field it begins delivering.
- (krobipd) Changed: A datapoint that never carried a value is removed only after two starts confirm it, so a receiver left in standby no longer loses datapoints it still has.

### 2.6.0 (2026-09-09)

- (krobipd) Fixed: input and sound program lists now offer only what the receiver itself declares or proves it has, instead of every value any Yamaha may have (#619)
- (krobipd) Fixed: the 2008 receiver generation gets volume, mute and sound program back; HDMI output, aspect, resolution and decoder lists carry the values the receiver reports
- (krobipd) New: HD Radio and Sirius on the US models, zone balance, pre-out mode and zone scenes, party volume keys, HDMI video mode, lip sync, a second trigger output and speaker pattern
- (krobipd) New: on older XML receivers the enhancer, CINEMA DSP 3D, speaker A/B, Zone B, a zone-wide cursor pad, transport keys and zone names; MusicCast gains standby-through and speaker pattern
- (krobipd) Improved: a receiver is set up from its own declaration of zones and inputs, so it comes online faster and is learned again by itself after an update that changes how it is read
- (krobipd) Improved: the first connection to a YNCA receiver asks fewer questions, so its datapoints appear sooner

### 2.5.2 (2026-09-07)

- (krobipd) Improved: 174 more datapoints explain themselves — volume and tone now say which scale they use, the stored lists say what is inside them, and the menu rows say what they are for
- (krobipd) Improved: a receiver's "Connected" now says what it means — a device on network standby answers as well, so it is not the same as being switched on

### 2.5.1 (2026-09-07)

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.