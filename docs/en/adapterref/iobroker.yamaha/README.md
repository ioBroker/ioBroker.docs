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
2. Open the instance settings. The **Devices** section lists your receivers as cards.
3. Leave the list empty and the adapter searches the network by itself and runs whatever it
   finds — or press **+** and enter the IP address of a receiver. You can do both: devices you
   entered and devices the search found run side by side.

Every card shows a speaker symbol for the volume: a speaker with a percent sign and the main
zone's current volume under it while **Volume as 0–100 %** is on, the plain speaker otherwise.
Every card can be edited, found ones included — give a found device the fixed address you
assigned the receiver, and it becomes one of your entered devices.

A receiver from before 2010 does not answer a network search and always has to be added by
hand. The same is true for any device your router keeps in a different network segment.

**Give the receiver a fixed address.** The adapter recognises a device by its identity, not
by its address, and follows it when the address changes — but a device that moves while the
adapter is not running is only found again by the next network search.

### Settings

- **Search the network for devices** — _Automatically_ searches while the device list is empty,
  which is what the adapter has always done. _Always_ keeps searching next to the devices you
  entered. _Never_ runs your list alone and opens no listener on UDP port 1900. A device that
  was found earlier and is not searched for
  any more keeps its datapoints — they are simply marked offline. Only the delete button on its
  card removes a device for good. A list holding only the row carried over from the previous
  adapter (its name is an IP address) counts as empty: nobody typed that address, so the search
  stays on and follows that receiver to a new address.
- **Network interface** — leave it empty and the search leaves through every network card of
  your ioBroker machine. Only set it if your server sits in several networks and the search
  should use a particular one. It has no effect on the receivers themselves.
- **MusicCast event port** — shown, not editable: MusicCast devices push their changes to UDP
  port 41100, the protocol fixes it. It is there so the Admin can warn you when a second
  instance on the same host would take the port.
- **Poll interval (older devices)** — how often a receiver from before 2010 is asked for its
  state. Those models cannot report changes by themselves. 60 seconds is a sensible default;
  a shorter interval means more network traffic for little gain.
- **Datapoint groups** — see below.

### On each device card

- **Volume as 0–100 %** — off, that receiver's volume datapoints carry the scale it shows
  itself: decibels, or its own step count. On, they carry 0–100 % instead, the main zone and
  every other zone of that receiver — the range most VIS widgets expect. The adapter converts
  in both directions, so the receiver always gets the value it expects.

  It belongs to the device, not to the instance: one receiver wanting percent says nothing
  about the others. You set it where you set the device's name and address: in the add/edit
  dialog on its card — and while it is on, the card's speaker symbol carries a percent sign, so
  you can see what a receiver's volume carries without opening anything.

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
setState("yamaha.0.rx-v6a-1a2b.power", true);
setState("yamaha.0.rx-v6a-1a2b.input", "HDMI1");
```

**Set the volume** — in the scale the receiver shows (decibels or its own steps), within the
limits of its `volume` datapoint; with **Volume as 0–100 %** on, in percent. On a receiver
that shows decibels:

```javascript
setState("yamaha.0.rx-v6a-1a2b.volume", -35.5);
```

**Recall a scene** — by number or by the name shown on the device:

```javascript
setState("yamaha.0.rx-v6a-1a2b.scene.recall", "Movie Viewing");
```

**Press a key on the on-screen remote** — `up`, `down`, `left`, `right`, `select`, `return`,
`home`:

```javascript
setState("yamaha.0.rx-v6a-1a2b.remote.cursor", "left");
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

**MusicCast updates need UDP port 41100.** MusicCast devices send their updates to port 41100
on your ioBroker machine, and only one program can hold it. If the old `musiccast` adapter is
still installed and running, it holds that port. The updates also stay away when ioBroker runs
in Docker without that UDP port published, or when a second MusicCast program on the same
machine registers for them. The adapter notices a change that came without an update: after
two of them it says so once in the log, reads every write back and asks for everything every
five minutes. YNCA devices are unaffected. Free or publish the port to get instant updates
back — the log says so when they arrive again.

**Zone 2 is a full zone.** It has its own volume, input, player block and scenes under
`multiroom.zone2`. Recalling a favourite switches the zone that is listening to that source,
not always the main zone.

**A device's object ID is its model and the end of its serial number** — for example
`yamaha.0.rx-v6a-1a2b`. Two devices of the same model therefore get two object trees, and a
device keeps its ID whatever you or the app call it: the name next to the ID comes from the
device and can be changed on its card. Should two devices of one model share the last four
characters, the second one gets the whole serial number. A device that reports no serial number
— a YNCA receiver whose XML control does not answer — is known by its model: `rx-v473`,
`rx-v473-2`. A device you add by hand while it is switched off starts under the name you typed;
once it has answered, its objects move to its model ID at the next start.

**A receiver is known by its serial number, not by its address.** The adapter learns the
serial (and the MAC) from the receiver itself — from its network announcement, from MusicCast,
from the XML control. A device that gets a new IP address or a new name keeps its objects:
found devices and the row carried over from the previous adapter are moved to the new address,
usually within seconds, because a receiver announces itself when it comes up — and at the
latest by the search a lost connection triggers. A device you entered by hand stays at the
address you typed; when the search sees it answering elsewhere, the log says so once — edit
the card to move it. The listener shares port 1900 with other UPnP services on your machine;
if it cannot use the port, one warning says so and the adapter falls back to searching
periodically.

**Deleting is final.** The delete button on a card asks first and tells you what goes with
the device: all of its datapoints, their history and every visualisation binding. A device the
network search found is not added again — it is on the exclusion list until you either add it
by hand or tick it in **Excluded devices…** above the device list, which lets the next search
take it back.

**A refused command shows up in the log.** If a receiver rejects something — a scene its
generation does not support, a function that is unavailable in standby — you will find it as
a warning in the adapter log instead of nothing happening silently. A MusicCast device's answer
comes with its meaning, e.g. `Guarded` for "not possible in the current state". The datapoint
then shows the device's value again.

## When something does not work

- **The device is not found.** Older devices answer no search — add them by IP. Otherwise
  check that ioBroker and the receiver are in the same network segment, and try setting the
  network interface explicitly.
- **The device stays offline.** Check the address, and whether the receiver is reachable at
  all (its own web page usually answers on `http://<address>`). The adapter retries by
  itself, with growing pauses. If the receiver got a new address, a found device follows it
  on its own; a device you entered by hand has to be edited — the log names the new address.
- **I deleted a device and it came back / I want it back.** A deleted device stays out of the
  search until you let it back in: add it by hand, or open **Excluded devices…** above the
  list and tick it.
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

### 3.0.0 (2026-09-26)

- (krobipd) Changed: Every device gets a new object ID once — its model and the end of its serial number, e.g. `wx-030-2b3c`; scripts and VIS need the new IDs
- (krobipd) Changed: The move carries values, recording settings, rooms, functions and aliases along, and recorded history continues in its old series
- (krobipd) Fixed: A second device of the same model and name is no longer skipped — every device gets its own object tree
- (krobipd) Fixed: After a restart, the input list of a YNCA receiver offers only the sources the receiver has again, not the whole catalog
- (krobipd) New: A device added by hand is asked for its model and serial number, and the name you type is its display name from the start
- (krobipd) New: The device card shows the object ID, the MAC address and the serial number under its details

### 2.13.0 (2026-09-25)

- (krobipd) Fixed: A value a receiver refuses no longer stays on the datapoint — every write is read back, and the log names the device's reason
- (krobipd) Fixed: MusicCast values stay current in Docker or next to a second MusicCast app — missing events are noticed, then the adapter polls and reads writes back
- (krobipd) New: MusicCast devices write every setting the specification gives a setter for: dialogue level, 3D surround, tone mode, speaker A/B, dimmer, group name and more
- (krobipd) Fixed: MusicCast Link groups are built and left as Yamaha specifies — the joining zone switches to MusicCast Link, multiroom.group.status shows the progress
- (krobipd) Fixed: Names you give inputs, sound programs and zones in the app or on the receiver show up at the next connection instead of staying frozen
- (krobipd) Fixed: Umlauts in names and titles arrive intact on all three protocols, and YNCA zone names are written in the character set the receiver expects
- (krobipd) Fixed: When one protocol of a receiver drops, a live one takes over every datapoint it serves the same way, so power and volume keep working
- (krobipd) Fixed: true, a hex string or "1e2" written to a level, preset or scene no longer reaches the receiver; in percent mode "50" counts like 50
- (krobipd) Fixed: Back and Home work on 2012-and-later YNCA receivers, and a refused key no longer switches the remote pad to another command set for good
- (krobipd) Fixed: YNCA reads every word the official lists declare — an attenuated mute reads as muted, and repeat-one is written in the receiver's own word
- (krobipd) Fixed: A deleted device carried over from yamaha 0.5.x stays deleted, and a hostname in the device list works like an IP address
- (krobipd) New: Menus on the 2008 XML receivers (RX-V3900 generation); XML zones write tone and dialogue level the way the receiver declares them
- (krobipd) Changed: The first start after this update asks every receiver again what it can do — up to half a minute on a YNCA receiver, as on a first contact
- (krobipd) Improved: The README lists the ports the adapter uses; with the network search set to Never it opens no listener on UDP port 1900
- (krobipd) Changed: Settings left over from older versions are removed from the instance once after the update; the instance restarts once for it

### 2.12.0 (2026-09-22)

- (krobipd) Fixed: Deleting a device is final: the card asks first and names the datapoints, the device stays out of the search until you admit it again, and the log says how many datapoints went
- (krobipd) New: A device is known by its serial number: a receiver with a new IP address or a new name keeps its objects and is reconnected at the new address within seconds
- (krobipd) New: "Excluded devices…" above the device list shows the deleted devices and lets the network search admit a ticked one again — it says what it looks for and what it found
- (krobipd) Improved: A receiver that lost power is offline in about 90 seconds instead of up to 15 minutes: the first protocol that notices asks the others at once
- (krobipd) Improved: The adapter hears devices announcing themselves on the network, and while no device runs it keeps searching every five minutes
- (krobipd) Changed: A row carried over from the old adapter (name = IP) follows the receiver to a new address; a device entered by hand stays where it was typed, the log says if it answers elsewhere
- (krobipd) Improved: Switching a receiver off no longer fills the log with warnings, and every search the log announces also tells you what it found — or that nothing answered
- (krobipd) Improved: Less network noise while a receiver stays unreachable: the retries knock only on the protocols that device actually speaks, not on all three

### 2.11.0 (2026-09-17) — stable

- (krobipd) Fixed: The adapter no longer stops when the object database is briefly unavailable while a receiver reports a change
- (krobipd) Fixed: A datapoint whose value range a receiver no longer reports keeps its value, its history and its room and function assignments
- (krobipd) Fixed: A receiver that is switched off keeps its name after a restart
- (krobipd) Fixed: A name you type on a device card now wins over every name the receiver reports for itself
- (krobipd) Improved: When something goes wrong, the log names the cause instead of a placeholder

### 2.10.0 (2026-09-15)

- (krobipd) Fixed: A receiver the search found is searched for again after it moved to another address — until now that only worked for receivers found at start-up
- (krobipd) Fixed: A receiver that is unplugged or switched off at the mains now shows as disconnected within about 90 seconds instead of staying green for many minutes
- (krobipd) Fixed: A MusicCast device that stops answering a command is checked right away and shown as disconnected — until now that took up to 15 minutes
- (krobipd) Fixed: On receivers without live updates, a value you write is confirmed as soon as the receiver took it, instead of up to five minutes later
- (krobipd) Fixed: A zone name you changed on an older receiver stays after a reconnect — until now the previous name came back
- (krobipd) Fixed: Deleting a device from its card while it is still connecting no longer leaves parts of its object tree behind
- (krobipd) Fixed: Writing false, off or 0 to a switch datapoint now switches it off — until now any text, even the word false, switched it on
- (krobipd) Improved: The history of a datapoint only records values the receiver actually changed — a restart or a lost connection no longer adds identical entries
- (krobipd) Improved: MusicCast live updates now start on their own once a port another program held at start-up becomes free — before, only a restart helped
- (krobipd) New: Device pictograms in the object tree and on the device cards — receiver, stereo receiver, speaker, soundbar or CD system, readable in every theme, also for a device that is off
- (krobipd) Changed: The device card shows a speaker symbol; with the percent switch on it also shows the current volume as a percentage. The pencil and magnifier markers are gone
- (krobipd) Fixed: The adapter logo is readable in the Admin's dark themes as well — until now its dark strokes vanished on a dark background
- (krobipd) Changed: The instance settings show the fixed MusicCast event port, so the Admin warns when a second instance on the same host would take it

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