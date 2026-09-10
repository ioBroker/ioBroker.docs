---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hueemu
BADGE-stable: https://iobroker.live/badges/hueemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hueemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hueemu
BADGE-Test and Release: https://github.com/krobipd/ioBroker.hueemu/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# hueemu — a Philips Hue bridge for devices that only speak Hue

This adapter makes ioBroker look like a **Philips Hue Bridge** (a v2 bridge, model
BSB002) on your local network. Anything that can control Hue lights — a Logitech
Harmony hub, an older Echo, a wall panel, an abandoned dashboard app — finds the
bridge, sees the lights you published, and switches them. Behind each of those
"lights" sits an ioBroker state of your choosing.

It is the counterpart to a real bridge: instead of Philips hardware answering, your
ioBroker instance does — and the lights it offers can be anything the object tree
knows, from a Zigbee bulb to a KNX dimmer to a relay in a heating controller.

> **If your voice assistant supports Matter, use the [Matter adapter](https://github.com/ioBroker/ioBroker.matter) instead.**
> Current Alexa, Google Home and Apple Home devices all speak Matter, which is the
> better path in every respect. This adapter exists for clients that have no Matter
> option and will never get one.

## Requirements

- Node.js 22 or newer
- js-controller 7.2.2 or newer
- admin 8.0.11 or newer
- The client and the ioBroker host on the **same local network**

## Setting it up

### 1. Create the instance

Install the adapter and create one instance. It comes up on port 8080 and announces
itself on the network straight away — there is nothing to configure before it runs.

### 2. Host / IP address

Leave **Host / IP** on `0.0.0.0` ("listen on all interfaces"). The adapter then works
out the routable address of your ioBroker host and announces that one to clients.

Set a concrete address only if your host sits on **several networks** and the client
can reach it on just one of them.

### 3. HTTP port

`8080` is the default and works with a Harmony hub.

**Some Alexa firmware versions only find a bridge on port 80.** If Alexa does not
discover the bridge, set the port to `80`. On Linux a port below 1024 usually needs
extra privileges for the ioBroker process — if the adapter cannot bind port 80, that
is why.

### 4. Publish your lights

Open the **Devices** tab. Each card is one light the bridge offers.

**Automatically** — click **Search lights**. The adapter looks through your object
tree for things that behave like lights (a switch, a dimmer, a colour-temperature
lamp, a colour lamp) and shows what it found as a checklist. Tick the ones you want;
only those are added. Anything it found but could not map is counted in the message
afterwards, so nothing disappears silently.

**By hand** — click **Add light**, give it a name, pick a light type and point each
field at an ioBroker state with the object browser.

| Light type            | What the client sees                |
| --------------------- | ----------------------------------- |
| **On/Off**            | on and off                          |
| **Dimmable**          | on/off and brightness               |
| **Color Temperature** | on/off, brightness, warm–cool white |
| **Color**             | on/off, brightness, full colour     |

### 5. Pair the client

A client may only connect after you open the pairing window — this is the equivalent
of pressing the button on a real bridge.

1. In ioBroker **Objects**, set `hueemu.0.startPairing` to `true`
2. Within **50 seconds**, start the device search in your client
3. A new entry under `hueemu.0.clients.` confirms the pairing

**Alexa (older Echo):** Alexa app → Devices → `+` → Philips Hue.
**Harmony:** Harmony setup → Add Device → Lighting → Philips Hue → search for bridge.

## Value scales — what to check when a colour looks wrong

ioBroker adapters store the same value in different units. A hue is kept in degrees
(0–360) by one adapter and in the Hue-native 0–65535 by another; a colour temperature
is Kelvin here and mired there; a brightness is a percentage or a raw 0–254.

The adapter reads the unit and the value range from the state it binds and settles the
scale itself at every start — for lights the search found AND for lights you added by
hand, and it applies to reading and writing alike. Where a state says nothing about its
unit or its range — which happens, for instance, with the Zigbee adapter's colour
temperature — the adapter falls back to reading the value itself, and writes it back
the same way it read it.

So if a light responds but shows the wrong colour, the wrong white tone or jumps to
full brightness, open its card and set the scale by hand — "Automatic (from the
datapoint)" is the setting that lets the adapter decide:

- **Brightness / Saturation** — `Percent (0..100)` for a typical `level.dimmer`,
  `Normalized (0..1)`, or `Raw (1..254)` for a source that already uses Hue's own range
- **Hue** — `Degrees (0..360)` for a normal ioBroker colour state, `Native` for 0–65535
- **Colour temperature** — `Kelvin` for a state holding values like 2700–6500,
  `Native` for mired (roughly 153–500)

## Lights that have no on/off state

Some dimmers offer only a brightness state and no separate switch — a HomeMatic dimmer
channel is the common example. Those work: the brightness carries on/off. A source
value of 0 reads as off, anything above it as on. Switching off writes 0; switching on
writes full brightness, because a source sitting at 0 no longer knows what it used to be.

## What ends up in the object tree

```
hueemu.0.
├── info/
│   ├── connection — whether the bridge is answering Hue clients
│   └── error      — why it is not (empty while everything works)
├── startPairing   — opens the pairing window for 50 seconds (button)
├── disableAuth    — accept every request without pairing (switch)
└── clients/       — one entry per paired client
    └── <name>     — the key that client uses
```

`info.connection` is the quick answer to "is it running at all?". A start can fail for
reasons the instance list does not show — the HTTP port already taken, or no usable
network address — and then `info.error` carries the cause in plain words.

`disableAuth` is a maintenance aid, not a setting to leave on: with it every device on
your network can control your lights without pairing. New clients are limited to 100
per hour in any case; a single log warning tells you when that limit was reached.

## Ports the adapter uses

| Port | Protocol | What for                       | Configurable                    |
| ---- | -------- | ------------------------------ | ------------------------------- |
| 8080 | TCP      | the Hue API itself             | yes — clients learn it via SSDP |
| 1900 | UDP      | discovery, so clients find you | no — fixed by the UPnP standard |
| —    | TCP      | optional HTTPS                 | yes, off unless you set a port  |

## Troubleshooting

**The client does not find the bridge.** Check that UDP port 1900 is not blocked
between client and ioBroker host, and that both are on the same network segment — a
guest network or a separate VLAN will not work without extra routing. On a host with
several network cards, set **Host / IP** to the concrete LAN address instead of
`0.0.0.0`. With Alexa, try port 80.

**Pairing fails.** `startPairing` must be `true` **before** you start the search in the
client, and the window is only 50 seconds. It closes again after a successful pairing —
that is what a real bridge does too.

**A light appears but does not react.** Check that the state you bound is actually
writable. A status state (a sensor mirroring what a device reports) can be read but not
written, so the light will show a value and ignore every command.

**A light shows the wrong colour or brightness.** See "Value scales" above.

**You come from the old `createLight` setup.** Your lights are converted automatically
on the first start and the adapter restarts once. Nothing to do by hand. Worth doing
afterwards: the old approach used adapter-internal states as go-betweens, which needed
a script to drive the real device. You can now point each light straight at the device
state and drop that script.

## Privacy

The adapter speaks only to devices on your own network; it has no cloud connection and
sends nothing to the internet on its own.

The one exception is error reporting via Sentry, and only if you have switched on
diagnostics in **ioBroker system settings → Diagnostics and error reporting**. What is
then transmitted on a crash is an anonymous installation ID and the technical error —
no name, no e-mail address, no IP address, none of your states.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.17.1 (2026-09-07)

- Improved: The switch that turns off authentication now warns what it really does — every client on the network is then served without a key and can pair itself.

### 1.17.0 (2026-09-06)

- Fixed: Brightness and saturation left on "Auto" are now written in the unit the datapoint really uses — a percent dimmer no longer receives Hue values like 127 or 254.
- Fixed: The scale of a light added by hand is now determined from the datapoint as well, exactly like a light found by the search.
- Fixed: A pairing that could not be stored is no longer reported as successful — the client retries instead of losing access at the next restart.
- Fixed: A client key is now checked exactly as it was issued; a key that merely resembles a paired one is rejected.
- New: The instance now shows in the object tree whether the bridge is answering, and why not when it is not.
- Fixed: On a host with Docker or a VPN, the automatically announced address is now the real network address instead of a virtual one.
- Fixed: A light whose configured datapoint does not exist is reported as unreachable instead of pretending to work.
- Fixed: Edit and delete in the devices tab always act on the light you clicked, even when the list changed in the meantime.
- Improved: The first start after this update completes the scales of lights added earlier — if it finds anything to complete, the instance restarts once.

### 1.16.0 (2026-09-03)

- Fixed: If an action in the devices tab fails, you now get a message saying what went wrong instead of a dialog that never finishes.

### 1.15.2 (2026-09-03)

- Fixed: When a very old setup is upgraded, its already paired clients now get their proper name and explanation right away instead of after the next restart.

### 1.15.1 (2026-09-03)

- Fixed: Every datapoint of the adapter now carries a name and a short explanation in your admin language, paired clients included.

## License

MIT License

Copyright (c) 2020-2021 Christopher Holomek <holomekc.github@gmail.com>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_