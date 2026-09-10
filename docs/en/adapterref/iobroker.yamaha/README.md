---
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