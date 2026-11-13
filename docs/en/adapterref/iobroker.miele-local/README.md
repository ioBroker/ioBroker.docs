---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
---
![Logo](admin/miele-local.png)

# ioBroker.miele-local

[![NPM version](https://img.shields.io/npm/v/iobroker.miele-local.svg)](https://www.npmjs.com/package/iobroker.miele-local)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

*Read this in another language: [Deutsche Dokumentation](/#/docs/adapterref/iobroker.miele-local/README_de.md).*

This adapter connects modern **Miele@Home** appliances **locally, without the internet**.
It speaks the local Miele protocol (`MieleH256` / DOP2) directly over the LAN — no cloud
account during operation, no detour through the Miele 3rd-party API.

> The one-time **login** with your Miele account only serves to obtain the household-wide
> local key (GroupID/GroupKey). After that the adapter runs offline, and the Miele app
> keeps working unchanged.

**What it does:** reads the live state of every appliance in plain text, records each completed
programme with its consumption, and — if you allow it — starts, stops and pauses them.
**What it needs:** one login, and either mDNS on your network or the appliance IP addresses.

## Quick start

1. Install the adapter and create an instance.
2. On the **Login** tab pick your country and follow the three steps below.
3. Paste the captured `miele://…` address and click **Fetch GroupKey**.
4. Save. The adapter finds your appliances and creates their states.

If the adapter runs in a Docker container with bridge networking, discovery will find nothing —
enter the IP addresses by hand on the **Appliances** tab. See [Network](#network-ports-docker-push).

### The login, step by step

The final address uses the `miele://` scheme of the mobile app. Desktop browsers cannot open it,
so the page stops at a spinning wheel and you read the address out of the browser yourself.

1. **Prepare DevTools.** Click **Open login page** — a new tab opens. Press **F12** there, switch
   to the **Network** tab and keep the log:
   - **Chrome / Edge / Brave:** tick **Preserve log**.
   - **Firefox:** gear icon ⚙️ → **Persist Logs**.
2. **Sign in.** Enter the email and password of your Miele app account. The page will then hang on
   a spinning wheel or report a failed load — that is what success looks like here.
3. **Copy the address.** In the Network tab scroll to the last (usually red) entry, starting with
   `redirect?redirect_uri=miele…` or `miele://oauth2-code/…`. Right-click → **Copy URL**, paste it
   into the **miele:// redirect URL** field and click **Fetch GroupKey**.

GroupID and GroupKey are then stored in the instance configuration, the key encrypted. You never
need this procedure again.

**Login fails with `invalid_request … unknown contextId`?** Miele's login service switches between
two domains during sign-in and loses its session when an ad blocker or strict third-party cookie
protection interferes. Open the login page in a private window without extensions.

**Moving to another system.** GroupID and GroupKey never change. A backup of the ioBroker
configuration (e.g. BackItUp) carries them over; on a fresh system repeating the login takes two
minutes. The admin page shows the key only as a placeholder.

## What you get

Every appliance becomes one device with its serial number as the ID. Below it:

### `state` — what the appliance is doing right now

| State | Meaning |
|---|---|
| `status` | operating state. The number carries the plain text as a value list, so the object browser and VIS show "In use" instead of `5`. |
| `statusText` | the same as text. Kept for setups that already read it. |
| `programId` / `programText` | running programme |
| `programPhase` / `programPhaseText` | phase within the programme |
| `remainingMinutes`, `elapsedMinutes`, `startInMinutes` | times in minutes |
| `remainingSeconds`, `elapsedSeconds` | to the second, if enabled |
| `estimatedEndTime` / `estimatedEndTimeText` | projected finish (timestamp in ms / `HH:MM`) |
| `progress` | programme progress in % (elapsed / (elapsed + remaining)), 0 while nothing runs |
| `temperature`, `targetTemperature` (plus zones 2 and 3) | temperatures |
| `signalDoor`, `signalInfo`, `signalFailure` | door and signal flags |
| `mobileStart` | whether the appliance currently accepts remote control |
| `light`, `spinningSpeed`, `dryingStepText` | appliance-specific |

The raw numbers and their `…Text` counterparts exist side by side on purpose: the raw value is
what you compare and chart, the text is what you display. Since 0.3.37 the raw value itself
carries the plain-text list, so in most places the text state is no longer needed.

**Language of the texts.** The `…Text` states are written in German, or in English when the
option "State names in German" is off - that has not changed, scripts compare against them.
The device manager cards do not use them: since 0.5.1 a card shows the raw value together with a
value table in the **system language** of ioBroker (all eleven admin languages). Status,
programme type, drying step and phase are complete in every language. Programme names come from
the community translations of Home Assistant; where a language has none there (Ukrainian
entirely, Polish almost entirely, Russian and Dutch in part) the card shows the English name -
nothing is guessed. An unknown raw value appears as its number.

With "State names in German" switched off, state names and descriptions stay plain English text
on purpose: a multilingual name would bring the German name back in a German admin and make the
option pointless.

### `control` — commands (only with device control enabled)

`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`: write `true` to send the
command; the adapter acknowledges every command, the reason for a failure is in the state comment.
`canStart`, `canStop`, `canPause`, `canPowerOn`, `canPowerOff` (read only) tell whether the
command makes sense in the current state and is supported by the appliance - the device cards show
their buttons with them, VIS can do the same.

### `info` — what the appliance is

`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`,
`protocolVersion`, `operatingHours`, and the poll counters `pollTotal`, `pollErrors`,
`pollRetries`, `pollErrorRate`. `lastError` holds the reason the last request failed.

### `eco` — energy and water

`eco.energy` (kWh), `eco.energyWh` (Wh), `eco.water` (l) where the appliance provides them, plus
`eco.source` naming which source a value came from. Read over DOP2; so far washing machines
deliver it. **The value the appliance reports is its own expectation, not a measurement.** For a
real figure, enter a metering plug's counter state on the **Polling & values** tab — the adapter
then records what each programme actually drew.

### `history` and `stats` — what has run

Every completed programme is recorded with duration, programme, energy and water. The appliances
themselves keep nothing, so the history starts when you switch the feature on and cannot be
filled retroactively. `history.cyclesJson` holds the last programmes, `stats.week`, `stats.month`,
`stats.year` and `stats.total` the sums beside it.

### `control` — only if you allow it

`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`. Writing `true` triggers
the command; the state resets itself. Commands only work while **MobileStart / remote control**
is enabled on the appliance, and some firmwares reject DOP2 writes outright.

`powerOn` and `powerOff` switch like the Miele app (since 0.4.3): they write the appliance state
into the DOP2 leaf `2/1586` (4 = on, 1 = off). If the appliance is asleep and answers HTTP 500, it is
woken with `{"DeviceAction":2}` and the write is repeated, at most twice. Only then the older
UserRequest `2/1583` is tried. Coffee machines with protocol version 2 are switched via Dop1. Afterwards
the status is read again; the comment `c` of the state says which way worked and whether the status
changed. If it fails, `c` explains the HTTP status: **404** = the communication module offers no DOP2
control (e.g. XKM EK057), **403** = remote control is switched off on the appliance, **500** = the
appliance does not accept the command in its current state. With the instance log level **debug**,
every step is logged with resource, HTTP status and the answer as hex (no keys).

## Settings

| Tab | What it holds |
|---|---|
| **Login** | country, the guided login, the captured address |
| **Appliances** | mDNS discovery, the fallback IP scan, manual IP addresses |
| **Polling & values** | poll intervals, German state names, second-precise times, EcoFeedback, energy meter, device internals |
| **Push & ports** | the optional real-time channel and its inbound port, the optional time server |
| **Control** | the switch that creates the writable states |
| **History** | recording of completed programmes, ring buffer, retention, History adapter |
| **Diagnostics** | everything for fault finding and field mapping — off by default |
| **Advanced** | GroupID and GroupKey by hand |

Every field carries its explanation underneath it in the admin; this page does not repeat them.

## Network: ports, Docker, push

| Direction | Port | Purpose | Required |
|---|---|---|---|
| inbound | TCP *push port* (default 18082) | appliances send updates to ioBroker | only with push |
| in/out | UDP 5353 (mDNS) | discovery and push registration | for discovery |
| outbound | TCP 80 → appliances | read states, send commands | yes |
| outbound | TCP 443 → miele-iot.com | fetch the GroupKey | login only |
| inbound | TCP *time server port* (default 8780) | appliances fetch their clock time | only with the time server |

Without push **no inbound port** is needed. For mDNS, ioBroker and the appliances must sit in the
same broadcast segment. Separate IoT WLANs or VLANs, firewalls (including the Windows firewall on
a test machine) and routers that filter multicast stop discovery just as well. In all these cases
the manual IP list is the reliable way.

**Docker.** In a container with bridge networking multicast is not forwarded, so discovery finds
nothing — enter the IP addresses by hand, polling then works normally. Push does not work there at
all, because the appliances cannot reach the container: the callback address sits behind NAT.
Reliable push needs `network_mode: host`.

**How push works.** The adapter registers itself per appliance as a household peer
(`PUT /Devices/<series>/SuperVision/<own-fab>`) and subscribes with a callback URL. The appliance
then sends changes unsolicited, within a second. Not every module can do this: the older XKM
EK037 and EK057 accept the subscription and send nothing. Polling remains the reliable path.

## Time server for the appliances (optional)

Miele appliances keep their clock with **their own HTTP request, not NTP**. The communication
module resolves `ntp.mcs2.miele.com` and asks, every 30 seconds until it gets an answer:

```
GET http://ntp.mcs2.miele.com/V2/NTP/ HTTP/1.1
Host: ntp.mcs2.miele.com
Accept: application/vnd.miele.v1+json
```

Miele answers `{"time":<Unix seconds>}`. An appliance **without internet access** (IoT network
without an exit) never gets this answer: its clock drifts, and it may stay on summer time after
the change. A DHCP NTP option or an NTP server in your network does not help — the appliance
does not use NTP.

The adapter can give the same answer from your network. Turn on **Push & ports → Answer the
appliances' time request** (off by default) and pick a port (default 8780). **On its own this
does nothing**: the destination is fixed in the module, so you must redirect the appliances —
one of:

1. **Router: destination NAT / port forwarding.** Source = the Miele appliances, destination
   `ntp.mcs2.miele.com` (currently `52.136.223.17`; check with `nslookup`) TCP 80, translated to
   the ioBroker IP and the port set here. On UniFi: *Settings → Routing → NAT → Destination NAT*.
   The service can stay on a high port; the router does the 80 → port translation.
   **If ioBroker is in the same subnet as the appliances**, add a source NAT (masquerade, e.g. to
   the router's own address) for this flow too — otherwise ioBroker answers the appliance
   directly, the answer does not come from the address the appliance asked, and it is dropped.
   Also allow the flow in the router's firewall if it filters traffic inside that network or zone.
2. **DNS rewrite** (AdGuard Home, Pi-hole, dnsmasq): `ntp.mcs2.miele.com` → ioBroker IP. The
   appliance then connects to **port 80** of that IP, so the service must be reachable there:
   in Docker map host port 80 to the configured port (`-p 80:8780`); without Docker either set
   port 80 (needs root or `CAP_NET_BIND_SERVICE`) or forward 80 with the host firewall. Port 80
   must not be taken by another web server on that host.

**Docker:** with bridge networking the port must be in the container's port mapping — adding
one means re-creating the container. If one of the mapped ports is unused, use that one.
**Firewall:** a firewall on the host (e.g. Synology DSM) must allow TCP to that port from the
appliances.

**Check:** `info.timeServer.running` is `true`; `info.timeServer.requests`, `lastRequest`,
`lastClient` and `info.timeServer.clients.<ip>.*` count every answered request. Depending on the
Docker setup and source NAT the sender may appear as the Docker gateway (e.g. `172.17.0.1`) or
the router instead of the appliance. If nothing arrives, the redirect or the firewall is the problem, not the adapter.

**Limits:** the service delivers **UTC only**. The time zone and daylight saving time are
applied by the appliance itself (set on the appliance or in the Miele app). Everything except
`GET /V2/NTP/` gets a 404. Requests are logged at debug level only.

### Keeping the appliance clock on local time (optional)

Some appliances get UTC right but apply daylight saving time on their own schedule - an oven
H2469BP was still on summer time hours after the change on 25.10.2026. **Push & ports → Keep the
appliance clock on local time** (off by default) checks every appliance at start and every hour
via `Settings/TimeSync` and, if its clock differs from the local time of ioBroker (time zone of
the ioBroker host/container) by more than 2 minutes, sets it with a signed request that contains
only `DateTime` (`NTPEnabled`, `UTCOffset` and `TimeMaster` stay untouched). Each correction is
logged at info level; `<appliance>.info.timeSync.lastDeviation` (seconds, positive = appliance
ahead) and `lastSet` show the result. Appliances that do not report `TimeSync` (e.g. G5840,
WCR860 answer 503) are left alone. Works without the time server above and without
"Allow control".

## Privacy

The adapter stores **no personal data**. GroupID, GroupKey and refresh token live only in the
encrypted instance configuration or in ioBroker objects. Nothing is transmitted to third parties;
in normal operation there is no cloud connection at all.

One exception worth knowing: the diagnostic data collection records the **start and end time of
every programme**. That stays in your instance — but if you pass the collection or its CSV export
on to someone, you pass those times along with it.

## Compatibility and limits

- Tested against a washing machine (WCR860/EK037), a dishwasher (G5840/EK037) and an oven
  (H2469BP/EK057).
- Refrigeration appliances are usually read-only locally; the firmware rejects writes.
- Control needs MobileStart on the appliance; some firmwares answer DOP2 writes with 404 or 500.
- EcoFeedback is not available everywhere. The dishwasher tested here provides no energy or water
  counter over any readable leaf — for that appliance the values have to come from the cloud.
- Push is a best-effort addition, polling the default.

## Diagnostics

Everything in this section is **off by default** and is not needed for day-to-day operation. It
exists for one question: which raw field of *your* appliance holds energy and water. The field
numbers differ per series, and the defaults in the adapter come from a WCR860.

**Raw fields.** Writes all fields of the eco leaf to `eco.fieldsJson` instead of only the two
evaluated ones.

**Data collection.** Records one dataset per completed programme — model, programme, all raw
fields, and at the end the final state of every answering leaf. To turn that into a mapping the
adapter needs a reference value: either from a cloud adapter, or entered by hand into
`collection.inputEnergy` and `collection.inputWater` after a programme. `collection.progress`
says what is still missing, `collection.finding` holds the result: which field fits, with which
divisor, and how closely.

**Leaf scan.** DOP2 addresses data as `unit/attribute`, and only a handful of those addresses are
documented anywhere. The scan works through the address space gently enough not to overwhelm the
module; `collection.scanJson` collects what answered. `collection.trendLeaf` records a
single leaf closely while a programme runs — the field whose value grows with consumption is the
one you are looking for.

**CSV export.** The button on the Diagnostics tab writes two tables into the instance's file area
and opens the first:

- `collection-<date>.csv` — one row per programme: times, programme, the reference values, every raw
  field in its own column, and for each leaf field the reading at start, at end and the difference
  between them. For lifetime counters only that difference means anything.
- `finding-<date>.csv` — one row per field: how well it matches the reference, the best divisor,
  the average and the largest deviation. This is the answer the collection exists for.

Semicolon separated, decimal comma, BOM — a double click opens them in a spreadsheet.

**Exploring an unknown appliance.** [docs/geraet-erkunden.md](/#/docs/adapterref/iobroker.miele-local/docs/geraet-erkunden.md) (German)
describes the whole procedure in order: when to scan, how to tell a refusal from a busy signal,
how to read a series of numbers once you have one, and what a newly understood field needs before
it becomes a state. It also records what did *not* work, so nobody repeats it.

## Legal / disclaimer

This is an **unofficial, privately developed** project and is **not affiliated with
[Miele & Cie. KG](https://www.miele.com/)**, nor endorsed or reviewed by them. "Miele",
"Miele@home" and related names are trademarks of
[Miele & Cie. KG](https://www.miele.com/) and are used here only descriptively to indicate
compatibility. Information about the appliances themselves is available from the
manufacturer at <https://www.miele.com/>.

The adapter uses a local protocol that has been publicly documented through **reverse
engineering**. Use is **at your own risk**; depending on device/firmware it may affect
warranty claims. The software is provided under the MIT license **without any warranty**
(see LICENSE). The author is not liable for damage to devices, data or any other
consequences of use.

## Acknowledgements

Special thanks to **[meistermopper](https://github.com/meistermopper)**, an experienced
ioBroker adapter developer, who reviewed this adapter unprompted and contributed substantial
improvements: periodic background discovery for appliances waking from standby, a per-device
connectivity state, corrected state roles and units, explicit defaults for all states, and
German documentation. His work went into release 0.3.0.

The local protocol (`MieleH256`, DOP2, provisioning) is based on the public reverse
engineering work of the projects `MieleRESTServer` (akappner),
`home-assistant-miele-mobile` and `ha-miele-at-lan`.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.2 (2026-11-12)
- (SmarthomeElektroniker) Fix: a card could show "not connected" and still offer the On button (or the light). After a stop or restart of the adapter the `control.can*` states kept their last value, and appliances not found at start kept them as well. Now the adapter clears them on stop and for every appliance not found at start; an appliance that is not reachable or reports status 255 ("not connected") gets no button at all
- (SmarthomeElektroniker) The light button now also follows two read-only states, `control.canLightOn` and `control.canLightOff` (exactly one is true while the appliance is reachable). The card looks as before
- (SmarthomeElektroniker) German texts: `fan_plus` is now „Heißluft plus“ (was „Umluft“, also in the combined modes with moisture plus and microwave), `eco_fan_heat` „Eco-Heißluft“, programme `automatic` „Automatik“ (was „Automatic“), drying steps 4–7 corrected (they had wrong names) to „Handbügelfeucht 1/2“, „Maschinenbügelfeucht“, „Glätten“. **Visible change:** the German `state.programText` and `state.dryingStepText` change accordingly - scripts that compare against the old German text must be adjusted
- (SmarthomeElektroniker) French: the Off button reads „Éteindre“ (was „Arrêt“) and On „Allumer“, so Off and Stop („Arrêter“) are clearly distinguishable

### 0.5.1 (2026-11-12)
- (SmarthomeElektroniker) Device manager cards show status, programme, phase, programme type and drying step in the system language of ioBroker, in all eleven admin languages. Until now the card showed the `…Text` states, which the adapter writes only in German or English. The card now uses the raw values (`state.status`, `programId`, `programPhase`, `programType`, `dryingStep`) with a value table in the system language; the `…Text` states are unchanged, scripts that compare against them keep working
- (SmarthomeElektroniker) Translations: the community translations of the Home Assistant Miele integration, own translations where a language is missing there (Ukrainian, Polish, large parts of Russian and Dutch, status 144/145) and a few corrections. Programme names only from Home Assistant, otherwise English - nothing guessed
- (SmarthomeElektroniker) Descriptions of `control.can*` and `state.progress` in all eleven languages

### 0.5.0 (2026-11-12)
- (SmarthomeElektroniker) Device manager support (`@iobroker/dm-utils`, issue #22, suggested by mcm1957): one card per appliance for the running operation. The header shows name and model, the serial number appears once below it. Status, programme, phase, start time, remaining time and estimated end (large), plus a progress bar; empty values are hidden instead of showing as blank lines. Fault, door open, notices on the appliance display and a locked remote start (MobileStart) are shown as coloured lines while they are active. Expanding the card shows further values (temperatures, elapsed time, spin speed, light, MobileStart, EcoFeedback, operating hours). Deliberately no configuration actions on the cards
- (SmarthomeElektroniker) With device control enabled the card shows only the commands that make sense right now and that the appliance supports: off → On; ready/programmed → Start, Off; running → Pause, Stop; paused → Start, Stop; end/fault → Off. Start only with MobileStart, Pause only on washing machines and dryers, no switching of fridges and hobs. The buttons follow the state live; every command except the light asks for confirmation and writes the existing `control.*` states
- (SmarthomeElektroniker) The light is a single toggle button: symbol, label and tooltip show the current state, a click switches to the opposite, without confirmation. The percentage sits right next to the progress bar
- (SmarthomeElektroniker) Fix: manual inputs, the scan switch and the fine recording of the data collection (`collection.*`) had no effect since the channel was renamed from `sammlung` in 0.3.38
- (SmarthomeElektroniker) New states `control.canPowerOn`, `canPowerOff`, `canStart`, `canPause`, `canStop` (read only, also usable in VIS) and `state.progress` (programme progress in %)

### 0.4.3 (2026-11-10)
- (SmarthomeElektroniker) `control.powerOn`/`powerOff` now switch like the Miele app: DOP2 leaf `2/1586` (appliance state 4 = on, 1 = off), on HTTP 500 wake-up with `{"DeviceAction":2}` and retry (at most two rounds), the previous UserRequest `2/1583` only as fallback; coffee machines with protocol version 2 via Dop1 object 1101. The effect is checked by reading the status again, failures are explained by HTTP status (403/404/500), RemoteEnable is only logged, every step is in the debug log

### 0.4.2
- (SmarthomeElektroniker) Maintenance: trimmed the version news in `io-package.json` (repository checker W1032/W2004), no functional change

### 0.4.1
- (SmarthomeElektroniker) New option **Keep the appliance clock on local time** (Push & ports, off by default): checks `Settings/TimeSync` at start and every hour and sets the appliance clock to the local time of ioBroker if it differs by more than 2 minutes. Only the `DateTime` field is written. States `info.timeSync.lastSet` and `info.timeSync.lastDeviation` per appliance

### 0.4.0
- (SmarthomeElektroniker) New optional **Miele time server** (Push & ports, off by default): answers the appliances' HTTP time request `GET http://ntp.mcs2.miele.com/V2/NTP/` with `{"time":<Unix seconds>}`, so appliances without internet keep the right time. The appliances must be redirected to it (destination NAT on the router or a DNS rewrite) - see "Time server for the appliances". Answered requests are counted under `info.timeServer.*`, per sender under `info.timeServer.clients.*`
- (SmarthomeElektroniker) Leaf table: `DateTimeInfo` is attribute 122 in unit 14 (`14/122`), not `2/122`

### 0.3.47
- (SmarthomeElektroniker) A command under `control.*` that cannot be executed (control disabled, appliance not connected, HTTP error, connection error) is now acknowledged (`val=false`, `ack=true`) with the reason in the state comment `c` and a matching quality `q`. Until now it stayed unacknowledged - one `control.powerOn` stood there for 52 days
- (SmarthomeElektroniker) Unacknowledged commands left over from before a restart are closed on start and are **not** sent to the appliance
- (SmarthomeElektroniker) `remainingMinutes`/`remainingHHMM` are 0 while the appliance is off, finished or not connected (status 1/7/255), and no end time is calculated. A G5840 reported a remaining time of 0:01 while switched off
- (SmarthomeElektroniker) A lost connection to an appliance and its return are logged once at info level (until now only at debug)
- (SmarthomeElektroniker) The IP fallback search ("Search the subnet for the new IP if a device drops out") also runs in the background when mDNS discovery is off - exactly the Docker bridge setup it is meant for. It only probes appliances that currently fail, and searches every /24 network that has a missing appliance, not only the network of the first configured IP

## Credits

The program and phase tables in `lib/enums.js` and the mapping of device types to tables come
from [Home Assistant](https://github.com/home-assistant/core) (Apache License 2.0, © Home Assistant
Authors), taken over via [ha-miele-at-lan](https://github.com/tiehfood/ha-miele-at-lan) (MIT, ©
tiehfood) and cross-checked against
[ioBroker.miele-unbound](https://github.com/meistermopper/ioBroker.miele-unbound) (MIT, ©
meistermopper). Thanks to all three projects.

The translations of status, phase and programme names in `lib/werte_ha.js` (shown on the device
manager cards) are the community translations of the Home Assistant Miele integration (Apache
License 2.0, © Home Assistant Authors), extracted with `tools/werte-uebersetzungen.js`; gaps and
a few corrections are in `lib/werte_eigen.js`.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction. See the [LICENSE](https://github.com/SmarthomeElektroniker/ioBroker.miele-local/blob/main/LICENSE) file for the full text.