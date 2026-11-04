---
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
---
![Logo](admin/miboxer-wl433.png)
# ioBroker.miboxer-wl433

[![NPM version](https://img.shields.io/npm/v/iobroker.miboxer-wl433.svg)](https://www.npmjs.com/package/iobroker.miboxer-wl433)
[![Downloads](https://img.shields.io/npm/dm/iobroker.miboxer-wl433.svg)](https://www.npmjs.com/package/iobroker.miboxer-wl433)
![Number of Installations](https://iobroker.live/badges/miboxer-wl433-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/miboxer-wl433-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.miboxer-wl433.png?downloads=true)](https://nodei.co/npm/iobroker.miboxer-wl433/)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.miboxer-wl433/workflows/Test%20and%20Release/badge.svg)

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img alt="Buy me a coffee" src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

## MiBoxer WL-433 pool light adapter for ioBroker

Local control of **MiBoxer PW01 / PW02** LoRa pool lights (433 MHz) via the **MiBoxer WL-433** gateway — without
cloud, without voice assistant, directly in your local network.

Manufacturer: [MiBoxer (Futlight Optoelectronics)](https://miboxer.com/) — product pages:
[WL-433 gateway](https://miboxer.com/product/lora-433mhz-gateway),
[PW01 pool light](https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz),
[FUT086 remote](https://miboxer.com/product/8-zone-lora-433mhz-remote-control)

### Disclaimer

This is an **unofficial community project**. It is **not affiliated with, endorsed by, or supported by** Shenzhen
Futlight Optoelectronics Co., Ltd. (MiBoxer / Mi-Light) or Tuya. "MiBoxer", "Mi-Light" and "Tuya" are trademarks of
their respective owners and are only used to describe device compatibility. Use this adapter at your own risk.

### How it works

The WL-433 gateway contains a Tuya WiFi module. For the local network it is **one** Tuya device — all lamps linked to
it are controlled through this single device, the gateway forwards the commands via LoRa (433 MHz) to the lamps.
The adapter talks the **Tuya LAN protocol 3.3** (TCP port 6668, AES encrypted with the device's local key) directly
with the gateway, based on the proven [tuyapi](https://github.com/codetheweb/tuyapi) library (also used by
ioBroker.tuya). Protocol versions 3.1, 3.4 and 3.5 are supported as well, in case a firmware update changes it.

Lamps, zones and scenes are controlled with the gateway's own commands in the vendor specific **datapoint 101** — the
same commands the MiBoxer app sends. The gateway reports its status the same way; the adapter also asks for it when it
connects and at every status refresh.

```text
ioBroker (this adapter) ──LAN: Tuya protocol 3.3, TCP 6668──► WL-433 ──LoRa 433 MHz──► PW01 / PW02
```

**User manual** with every step explained for beginners (installation, settings, zones, timers, examples,
troubleshooting):
[English](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Manual_miboxer-wl433.pdf)) ·
[Deutsch](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Handbuch_miboxer-wl433.pdf)).

The background research (protocol analysis, sources, test plan, decoded datapoint 101) is available in German:
[doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md)
([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.pdf)). A beginner's guide for linking the lamps to the
gateway: [doc/Guide_connect_PW01_to_WL-433.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md)
([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_connect_PW01_to_WL-433.pdf); German:
[PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf)).

### Supported hardware

| Device | Role | Status |
| --- | --- | --- |
| MiBoxer WL-433 LoRa 433 MHz gateway | Required, the adapter connects to it | Tested with a real gateway (Tuya protocol 3.3, datapoint 101) |
| MiBoxer PW01 (27 W RGB+CCT PAR56) | Pool light, linked to the gateway | Target device |
| MiBoxer PW02 (18 W RGB+CCT PAR56) | Pool light, linked to the gateway | Same product family, expected to work |
| Other MiBoxer LoRa 433 MHz lamps (UW01, UW02, UW03, RD-9L) | Lamps linked to the gateway | Untested |

### Prerequisites

1. The gateway is set up in the MiBoxer app and the lamps are linked to it.
2. **Device ID and local key** of the gateway. The manufacturer does not support the Tuya developer platform for the
   WL-433, but the MiBoxer app writes both values to its debug log: on Android, read the log with a logcat viewer such
   as *LogFox* while the app starts and controls the gateway. **The local key changes whenever the gateway is paired
   again** — then it has to be read and entered again. A beginner's step-by-step guide (for Android, iPhone
   and iPad): [doc/Guide_device-ID_and_local-key.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md)
   ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_device-ID_and_local-key.pdf); German:
   [doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md)).
3. The gateway is reachable from ioBroker (same network). A DHCP reservation for the gateway is recommended; if no IP
   address is configured, the adapter finds the gateway via its UDP broadcasts (ports 6666/6667).
4. **Tuya devices usually accept only one local connection.** In a test the MiBoxer app and the adapter were connected
   at the same time, but if the connection keeps failing, close the app on phones in the same network and do not
   control the gateway with other local integrations (ioBroker.tuya, Home Assistant, tinytuya) at the same time.

### Configuration

The instance settings have two tabs: **Gateway** (connection and zone control) and **Timers** (see [Timers](#timers)).

| Setting (tab Gateway) | Description |
| --- | --- |
| Device ID | Tuya device ID of the WL-433 gateway |
| Local key | 16-character Tuya local key (stored encrypted) |
| IP address of the gateway | Leave empty to find the gateway automatically in the local network |
| Tuya protocol version | 3.3 for the WL-433 (3.1, 3.4 and 3.5 are selectable) |
| Search gateway in the local network | Button: finds the gateway by its device ID and fills in IP address and protocol version. Without device ID it lists all Tuya devices found |
| Reconnect delay | Seconds until a lost or failed connection is retried (default 30) |
| Status refresh interval | Seconds between full status requests (default 60, 0 = only use the updates pushed by the gateway) |
| Zone control | *Zone selector* (default) or *one channel per zone*, see [Zones](#zones) |

### Zones

The gateway controls up to 8 zones (like the FUT086 remote). Every command can go to one zone or to all zones, but the
gateway reports **only one status for all lamps: the last setting, whichever zone it was sent to**. The MiBoxer app
does not show a separate status per zone either. The setting *Zone control* offers two variants:

| Variant | States | Suitable for |
| --- | --- | --- |
| **Zone selector** (default) | `light.*` shows the status of the gateway. `light.zone` (0 = all zones, 1–8) selects the zone the commands of `light.*` go to. | Most users: every state shows what the gateway reports |
| **One channel per zone** | `light.*` shows the status of the gateway and sends to all zones. In addition `zones.zone1` … `zones.zone8` control each zone separately. A zone channel shows the last values sent to this zone and confirmed by the gateway; it stays empty until something was sent to the zone. | Scripts and visualisations that address zones directly |

When the setting is changed, the states of the other variant are deleted.

### Timers

The tab **Timers** of the instance settings holds up to **50 timers**. They run locally in the adapter, also without
internet, and can do more than the timers of the MiBoxer app: sun events with offset, random shift, season, zones,
colours, scenes and switching off after a duration. Add a timer with **+**, open it to change it, copy or delete it with
the buttons of the entry. Changes take effect when the settings are saved (the instance restarts).

| Field | Description |
| --- | --- |
| Active | Switches this timer off without deleting it |
| Name | Shown in the log and in `timers.overview` |
| Trigger | *Time of day* or a sun event: dawn, sunrise, golden hour (evening), sunset, dusk, night |
| Time of day | Only for the trigger *Time of day* |
| Offset | Minutes (−720 to 720), negative = earlier — e.g. sunset −15 |
| Random shift | Up to ± minutes (0–120), drawn anew for every run — for a presence simulation |
| Weekdays | Days on which the timer runs |
| Season from / to | `DD.MM.`, e.g. `01.05.` to `30.09.`; a season across the new year (`01.11.` to `28.02.`) works as well; empty = all year |
| Zone | All zones or zone 1–8 |
| Action | Switch on, switch off, white light (colour temperature 2700–6500 K), colour, scene M1–M9, brightness only |
| Brightness | 1–100 %, empty = unchanged (not for *Switch off*) |
| Switch off after | Minutes (0–1440), 0 = do not switch off (not for *Switch off*) |

- **Sun events** are calculated from the position in the ioBroker system settings (latitude and longitude) with
  [suncalc](https://github.com/mourner/suncalc). Without a position these timers are ignored with a warning. On days
  without the event (polar regions) the timer does not run.
- A timer sends the same commands as the states: in the zone mode *zone selector* to its zone (`light.zone` is not
  changed), in the mode *one channel per zone* through `zones.zone<n>` (all zones: `light.*`). The gateway confirms
  them like every command.
- If the gateway is not connected when a timer is due, this run is skipped (warning in the log) — it is not repeated
  later.
- Timers with incomplete settings are ignored; the log and `timers.overview` name the reason.
- The times are local times of the ioBroker system; daylight saving time is taken into account.
- The **timers of the MiBoxer app** are stored and executed in the Tuya cloud (they only switch all zones on or off via
  datapoint 20 and need internet). The adapter cannot read or change them, but it sees their effect in the status.
  Both kinds of timers can be used at the same time.

### States

| State | Description |
| --- | --- |
| `info.connection` | Connection to the gateway |
| `info.ip` | IP address used for the gateway |
| `light.on` | On / off |
| `light.mode` | `white`, `colour` or `scene` — writing it switches the mode (colour mode with the last hue, scene mode with the last scene) |
| `light.brightness` | Brightness 1–100 % of the current mode. 0 switches off, a value above 0 switches on |
| `light.colorTemperature` | Colour temperature 2700–6500 K in steps of 100 K (switches to white mode) |
| `light.color` | Colour as `#rrggbb` at full brightness (switches to colour mode). Writing sets hue and saturation, the brightness of the RGB value is ignored — use `light.brightness` |
| `light.hue` | Hue 0–360° (switches to colour mode) |
| `light.saturation` | Saturation 0–100 % (switches to colour mode) |
| `light.scene` | Scene 1–9 (M1–M9 in the app), 0 = no scene. Writing 1–9 starts the scene |
| `light.speedUp` / `light.speedDown` | Buttons S+ / S- of the app: scene faster / slower. The gateway does not report the speed |
| `light.countdown` | Seconds until the gateway toggles the lamps (0 = off, standard datapoint 26) |
| `light.zone` | Only with the zone selector: zone of the `light.*` commands, 0 = all zones, 1–8 |
| `zones.zone<n>.*` | Only with one channel per zone: `on`, `mode`, `brightness`, `colorTemperature`, `color`, `hue`, `saturation`, `scene`, `speedUp`, `speedDown` for zone n |
| `settings.dmxAddress` | Start address 1–512 of the gateway's DMX512 input – from there it uses 5 channels: red, green, blue, cold white, warm white (menu *DMX* in the app). Writing sends it to the zone of `light.zone` (zone selector) or to all zones; the gateway confirms it |
| `timers.active` | `false` pauses all timers (e.g. during holidays or from a script), `true` runs them again |
| `timers.nextRun` | Next timer run with the name of the timer (`paused (…)` while `timers.active` is `false`) |
| `timers.lastRun` | Last timer run with name and action |
| `timers.overview` | JSON list of all timers: schedule, action, next run, reason if the timer is ignored |
| `dp101.raw` | Last datapoint 101 frame as Base64 — writing sends the value unchanged |
| `dp101.hex` | Last datapoint 101 frame as hex bytes — writing sends the frame, the checksum is added or corrected automatically |
| `dp101.checksumValid` | Checksum of the last frame is valid |
| `dp101.history` | JSON list of the last 50 frames (`rx` = received, `tx` = sent) with time stamp; repeated identical status answers are not added |
| `raw.dp<n>` | Every further datapoint the gateway reports is created automatically (writable) |

Values that need a mode or the lights switched on are sent like the MiBoxer app does: e.g. a colour temperature in
colour mode first switches to white mode, a brightness while the lights are off first switches them on. Rapid changes
(e.g. from a slider) are combined, only the last value is sent. Commands are only accepted while the gateway is
connected. A command counts as executed when the next status of the gateway shows its values (about 2.5 s later);
until then the state is not acknowledged.

### Datapoint 101 — protocol

The WL-433 transports lamps, zones and scenes in the vendor specific datapoint 101: 12-byte frames, Base64 encoded, the
last byte is the 8-bit sum of bytes 0–10. The format was decoded on 2026-09-22 from the status frames of a real gateway
and the commands the MiBoxer app writes to its Android log:

| Frame | Bytes (hex) | Meaning |
| --- | --- | --- |
| Command (app / adapter → gateway) | `41 00 00 0B cc vv vv vv vv zz 80 ss` | `cc` command: `01` hue 0–255 (value in bytes 5–8, switches to colour mode), `02` brightness 1–100 %, `03` colour temperature 0–38 (2700 K + 100 K per step), `04` saturation 0–100 %, `05` scene 1–9, `06` key (`01` on, `02` off, `03` S-, `04` S+, `06` white mode); `zz` zone: `00` all, `01`–`08` |
| Status query | `43 00 00 80 00 00 00 00 00 80 80 C3` | the gateway answers with a `44` status frame |
| Status (gateway → app) | `42`/`44` `00 00 00 mm hh tt bb ss 0B dd xx` | `42` change report (about 2.5 s after the last change), `44` answer to the query; `mm` mode: `00` off, `01` colour, `02` white, `03`–`0B` scene 1–9; `hh` hue, `tt` colour temperature step, `bb` brightness, `ss` saturation (0 in white mode), `dd` low byte of the DMX start address. The zone is not part of the status |
| DMX start address | `49 00 00 0B 02 aa aa 00 00 zz 80 ss` | `aa aa` address 1–512 (high byte, low byte), `zz` zone; answer `49 00 00 0B 02 01 tt bb ss aa aa xx` |

The key `06 05` switches the lights off as well (a second time it keeps them off, it is no toggle); what it does
differently from `06 02` is still unknown, the adapter does not use it. The standard datapoints 20–23 are derived by the
gateway from these commands; the adapter only uses datapoint 20
(on/off, reported earlier than the status) and follows the datapoint 101 status for everything else. Writing the Tuya
colour datapoint 24 does not change the colour of the lamps — the MiBoxer app does not use it either.

Raw access for your own experiments: `dp101.hex` accepts 11 bytes (the checksum is appended), e.g.
`43 00 00 80 00 00 00 00 00 80 80` requests the status.

### Limitations

- The gateway reports one status for all lamps (the last setting) and not the status of each zone — see [Zones](#zones).
- The speed of a scene (S+ / S-) is not reported by the gateway.
- Whether a lamp actually received a command via LoRa cannot be seen: the status comes from the gateway.
- The gateway still reports its status to the Tuya cloud. Blocking its internet access completely may make it
  unreliable. The timers of the MiBoxer app need the cloud, the timers of the adapter do not.

### Logging and debugging

The adapter logs according to a fixed concept, so a log is meaningful for troubleshooting at any time:

| Level | What is logged |
| --- | --- |
| error | Configuration errors that stop the adapter (device ID missing, local key not 16 characters) |
| warn | Problems you have to act on — reported once and repeated only at debug level until they are resolved: gateway refuses connections, data that cannot be decoded (wrong local key), commands the gateway did not confirm, status queries that are not answered, unexpected datapoint values or status frames, timers with incomplete settings or without position for sun events, timers that could not switch the lights, a DMX start address the gateway did not confirm |
| info | Milestones: configuration summary at start, gateway found, connected, connection lost, connection stable again, objects of the other zone variant removed, number of active timers, timers paused or active again |
| debug | Every step with its inputs, decisions and durations: state change → translation into datapoint 101 frames (with the reason for extra frames such as "switch on first") → command queue → sending → confirmation by the status (or which value is still missing), every received datapoint and status and the states it updates, status queries, discovery, every timer with its schedule, next run (sun event, offset, random shift) and execution. Commands (`#12`) and connection attempts (`Attempt #3`) are numbered, so all lines of one command can be followed |
| silly | Additionally the protocol trace of the tuyapi library (packets, ping/pong) with the tag `[tuyapi]` |

Every message starts with a component tag: `[cfg]` configuration, `[conn]` connection, `[rx]` gateway → states,
`[cmd]` states → commands, `[queue]` command queue, `[poll]` status refresh and status query, `[disc]` discovery,
`[dp101]` raw frames, `[timer]` timers, `[unload]` shutdown, `[tuyapi]` library trace. The local key and the session keys never appear
in the log — the configuration summary only shows the length of the key.

To change the level: Admin → **Instances** → expert mode → log level of `miboxer-wl433.0` → `debug` (or `silly` for
the protocol trace; restart the instance afterwards). Please attach a debug log and the content of `dp101.history`
when you report a problem.

## Development

`npm run build` compiles the TypeScript sources, `npm test` runs the unit and package tests. `npm run test:e2e` runs
the adapter in a temporary ioBroker installation against a simulated WL-433 (Tuya protocol 3.3 on `127.0.0.1:6668`,
UDP broadcasts on port 6667, datapoint 101 commands and status like the real gateway) — these ports must be free.

Local test system with [dev-server](https://github.com/ioBroker/dev-server) (admin on port 8091):

```bash
npx dev-server setup --adminPort 8091 --symlinks   # once, creates .dev-server/
npm run simulator                                   # optional: simulated WL-433 in a second terminal
npm run dev-server watch                            # starts ioBroker + adapter, restarts on code changes
```

Admin: `http://<IP of the development machine>:8091` (the dev-server listens on all interfaces, locally
<http://127.0.0.1:8091>). Without real hardware, configure the instance with the values printed by
`npm run simulator` (device ID, local key, IP `127.0.0.1`). `npm run dev-server debug` starts the adapter with an
inspector for the VS Code debugger.

## Documentation

Translated documentation:

- 🇩🇪 [Deutsche Dokumentation](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/de/README.md)
- 🇷🇺 [Документация на русском](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/ru/README.md)
- 🇳🇱 [Nederlandse documentatie](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/nl/README.md)
- 🇫🇷 [Documentation française](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/fr/README.md)
- 🇮🇹 [Documentazione italiana](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/it/README.md)
- 🇪🇸 [Documentación en español](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pl/README.md)
- 🇵🇹 [Documentação portuguesa](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pt/README.md)
- 🇺🇦 [Документація українською](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/uk/README.md)
- 🇨🇳 [简体中文文档](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/zh-cn/README.md)

Credits: the checksum of datapoint 101 and the first published frames come from the tinytuya discussion
[#623](https://github.com/jasonacox/tinytuya/discussions/623) (users *Silverstar* and *uzlonewolf*). Sun events are
calculated with [suncalc](https://github.com/mourner/suncalc) by Vladimir Agafonkin (BSD-2-Clause license).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2026-11-02)

- (ssbingo) English versions of the beginner guides (device ID and local key, linking PW01 lamps to the gateway); the guide button in the instance settings opens the guide in English or, with German admin language, in German; dependency updates

### 0.2.1 (2026-09-22)

- (ssbingo) Object names in all 11 languages of the admin (object check E6001 of the ioBroker repository); existing objects are updated at the next start

### 0.2.0 (2026-09-22)

- (ssbingo) Local timers in the new tab *Timers* of the instance settings (up to 50): time of day or sun event with offset and random shift, weekdays, season, zone, every light action and switching off after a duration; states `timers.active`, `timers.nextRun`, `timers.lastRun` and `timers.overview`
- (ssbingo) DMX start address of the gateway's DMX512 input readable and writable (`settings.dmxAddress`)
- (ssbingo) Documented: DMX command, key `06 05`, cloud timers of the MiBoxer app; manuals with a new timer chapter

### 0.1.0 (2026-09-22)

- (ssbingo) Datapoint 101 decoded: lamps, zones and scenes are now controlled with the gateway's own commands (the colour could not be set before), the status is read from datapoint 101 and requested actively
- (ssbingo) New states: hue, saturation, scene M1–M9, buttons S+ / S-; zones selectable in the settings as zone selector (`light.zone`) or one channel per zone
- (ssbingo) Commands are confirmed by the status of the gateway, a warning is logged if the gateway does not confirm them; detailed debug output for every step
- (ssbingo) German and English user manual for beginners

### 0.0.1 (2026-09-21)

- (ssbingo) Initial release: local control of the WL-433 gateway via the Tuya LAN protocol (on/off, mode, brightness, colour temperature, colour, countdown), raw access to datapoint 101 with checksum handling and gateway search in the local network, detailed component-tagged debug logging with correlation IDs and durations (secrets are never logged)

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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