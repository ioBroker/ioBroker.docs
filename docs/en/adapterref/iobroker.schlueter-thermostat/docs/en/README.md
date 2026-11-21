---
chapters: {"pages":{"en/adapterref/iobroker.schlueter-thermostat/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/README.md"},"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md"}}}
---
# ioBroker.schlueter-thermostat

Floor heating with **Schlüter DITRA-HEAT / OJ Microline WD5** (OWD5 / MWD5) in ioBroker – via the vendor cloud and
optionally **locally in your own network** (in testing).

---

## 🌍 Overview

- 🌡 Room and floor temperature, heating status
- 🎯 Setpoints and regulation modes (schedule, comfort, manual, boost, eco, vacation, frost protection)
- 📅 Weekly schedule, ⚡ energy consumption
- 🖥️ Device Manager with live view and compact controls
- 🔔 Notifications (Telegram, Pushover, WhatsApp, e-mail, Signal, Matrix, Synology Chat)
- 🏠 **Local control (in testing):** the adapter takes over the role of the vendor gateway – faster, and if wanted
  without any cloud

---

## 🧠 Architecture

```
                         ┌──────────────── Cloud (default) ─────────────────┐
ioBroker ── adapter ─────┤  OWD5 API (read) · OCD5 API (write)              ├── thermostat
            │            └──────────────────────────────────────────────────┘
            │
            └─ Local gateway (port 9513) ◄──── thermostat (redirected by a DNS record)
                  │
                  └─ Relay: forwards to the vendor cloud (the app keeps working)
```

Cloud and local connection fill the **same** states. While a thermostat is connected locally, its values come from
there – immediately instead of by polling.

---

## 🚀 Quick start

1. Install the adapter and open the instance
2. Enter the credentials:

| Setting | Note |
| --- | --- |
| Username / Password | Login of the Schlüter / OJ app |
| API Key | The default value usually works |
| Customer ID | Default: **3** |
| Poll interval | Default: 60 s (at least 10 s) |

3. Save – the thermostats appear under `groups.<group>.thermostats.<thermostat>` and in the Device Manager.

To set up local control see [Local control](#-local-control).

---

## 🖥️ Device Manager

Admin → **Device Manager** → instance `schlueter-thermostat.X`. Each thermostat is a card; the three-dot menu opens
the controls.

### Card

| Icon | Meaning |
| --- | --- |
| <img src="../images/cloud.svg" width="20"> Cloud · <img src="../images/relay.svg" width="20"> Relay · <img src="../images/home.svg" width="20"> Local | How the thermostat is connected right now |
| <img src="../images/fire.svg" width="20"> Heating · <img src="../images/fire-off.svg" width="20"> Off | Heating active |
| <img src="../images/thermometer.svg" width="20"> | Room temperature |
| <img src="../images/floor.svg" width="20"> | Floor temperature |
| <img src="../images/target.svg" width="20"> | Setpoint of the active mode (eco 20 °C, boost 35 °C, vacation/frost protection 5 °C, schedule: current event) |
| <img src="../images/mode.svg" width="20"> | Regulation mode |
| <img src="../images/flight.svg" width="20"> | Vacation planned or active |
| <img src="../images/bolt.svg" width="20"> | Energy (cloud; estimated in local-only mode) |

Each indicator can be shown or hidden in the toolbar.

### Instance toolbar

| Icon | Meaning |
| --- | --- |
| <img src="../images/cloud-ok.svg" width="20"> / <img src="../images/cloud-error.svg" width="20"> | Adapter connected / not connected to the cloud |
| <img src="../images/home.svg" width="20"> **1** | Local gateway: number of locally connected thermostats |
| <img src="../images/home-warning.svg" width="20"> No thermostat | Gateway running, but no thermostat connected → check the DNS record |
| <img src="../images/home-error.svg" width="20"> Off | Gateway not running (e.g. port in use) |
| <img src="../images/relay.svg" width="20"> / <img src="../images/relay-warning.svg" width="20"> / <img src="../images/relay-error.svg" width="20"> | Relay only: vendor gateway connected / unreachable / certificate not trusted |

### Controls

One page with thermostat and serial number and one row per function: **manual**, **comfort** (with duration),
**boost** (duration), **schedule / eco**, **vacation** (active, begin, end), **name**.

---

## 🧩 Web component

The adapter brings the web component **Thermostat** (`<iob-schlueter-thermostat-card>`, [ioBroker web-components](https://github.com/ioBroker/web-components)).
Hosts such as vis-2, devices or admin offer it in their palette; it looks like the Device Manager card.

| Part | Content |
|---|---|
| Header | name (thermostat no.), group (group no.), serial number, online / offline (red when offline) |
| Indicators | same icons as the Device Manager card: connection, heating, room, floor, setpoint, mode, vacation, energy |
| − / + | changes the setpoint in 0.5 °C steps; sent as **manual** mode 1.5 s after the last click |
| Mode buttons | **Schedule**, **Eco** at once; **Comfort**, **Manual**, **Boost**, **Vacation** ask for their values in a dialog |

| Setting | Meaning |
|---|---|
| Instance | adapter instance (empty: `schlueter-thermostat.0`) |
| Thermostat | thermostat of the instance (empty: the first one) |

Commands go through the same `apply.<mode>.*` states as all other UIs. While a thermostat is offline in the cloud
(and not connected locally) the controls are disabled; in the editor of a host the card writes nothing.

| Host | Note |
|---|---|
| Aura | set **Click on the component** to **Component** in the widget settings; by default Aura keeps clicks for the widget and the controls do not react |
| devices | the card appears in "Add widget" once the instance object carries the new `common.webComponents`: after an update, upload the adapter files again (`iobroker upload schlueter-thermostat`) and reload the page |

---

## 🧩 States

Per thermostat: `groups.<group>.thermostats.<thermostat>`

| Area | States |
| --- | --- |
| Status | `online`, `heating`, `connection` (cloud / relay / local), `regulationMode`, `thermostatName`, `softwareVersion` |
| Temperatures | `temperature.room`, `temperature.floor` |
| Setpoints | `setpoint.active`, `setpoint.manual`, `setpoint.comfort`, `setpoint.frostProtection` |
| End times | `endTime.comfort`, `endTime.boost` (thermostat-local time) |
| Vacation | `vacation.enabled`, `.begin`, `.end`, `.temperature` |
| Schedule | `schedule.day1` (Monday) … `day7`, each `event0…5` |
| Energy | `energy.value0…` (cloud); with local control also `energy.estimatedToday` / `estimatedTotal` (heating time × load) and `energy.loadWatts` |

**Control** only through the apply folders: set the values under `apply.<mode>.*`, then set
`apply.<mode>.apply` to `true`.

| Mode | No. | Apply | Setpoint |
| --- | --- | --- | --- |
| Schedule | 1 | `apply.schedule` | current event |
| Comfort | 2 | `apply.comfort` | adjustable, with duration |
| Manual | 3 | `apply.manual` | adjustable |
| Vacation | 4 | `apply.vacation` | 5 °C (fixed in the device) |
| Frost protection | 6 | – (on the device) | 5 °C |
| Boost | 8 | `apply.boost` | 35 °C, with duration |
| Eco | 9 | `apply.eco` | 20 °C |
| Name | – | `apply.name` | – |

---

## 🔁 Polling and fallback

| Situation | Cloud poll |
| --- | --- |
| Normal | at the configured interval (default 60 s) |
| All thermostats connected **locally** | less often, default every 300 s – the values come locally |
| Cloud unreachable or **all** thermostats offline | interval doubles up to 1 h, then only at 12:00 and 00:00 |
| A thermostat is reachable again | back to the normal interval at once |

A locally connected thermostat counts as online – so local-only mode does not fall back just because the cloud
does not see the device.

---

## 🔔 Notifications

Tab **Notifications**: enable the channels (Telegram, Pushover, WhatsApp, e-mail, Signal, Matrix, Synology Chat).
Without a selected instance a running one is used automatically.

| Message | When |
| --- | --- |
| ⚠️ / ✅ Thermostat offline / online | Reachability of the thermostat changes |
| ⚠️ / ✅ Cloud connection lost / restored | The adapter cannot reach the cloud any more / again |
| ⚠️ / ✅ Local connection lost / restored | **Relay and local only:** thermostat without local connection for 2 min, or none connected 10 min after the start |

---

## 🏠 Local control

> **In testing** – for users who know DNS and hostnames.
> Confirmed on an **OWD5** (firmware 1013W220) in all modes. The WG4 series (North America) is supported but not
> tested on real hardware. Feedback welcome.

The thermostat keeps its own connection to the vendor's **device gateway**. A DNS record redirects it to the ioBroker
host – nothing on the thermostat is changed. Delete the DNS record = everything as before.

### Modes

| Mode | App | Control from ioBroker | Without internet |
| --- | --- | --- | --- |
| **Off** | ✔ | via the cloud | ✘ |
| **Relay** ⭐ | ✔ (in sync) | local, immediate | ✔ the adapter takes over automatically, back to relay ≤ 1 min after the internet returns |
| **Local only** | ✘ (offline) | local, immediate | ✔ |

### Setup

1. Give the ioBroker host a **fixed IP**.
2. Redirect `owd5-sl003-thermostat.ojelectronics.com` to the ioBroker host in your DNS (Pi-hole, AdGuard, router)
   (check the hostname in the DNS log of the thermostat if needed):
   - **Recommended – CNAME** to the name of the ioBroker host (e.g. `iobroker.lan`). The host keeps its name; a
     plain record (A record) makes Pi-hole show the ioBroker host under the thermostat name.
     Pi-hole: *Local DNS → CNAME Records*; Pi-hole must know the target itself (own DNS record or DHCP).
   - Alternatively: record `owd5-sl003-thermostat.ojelectronics.com` → **IP of the ioBroker host**.
3. Tab **Local**: mode **Relay**, "Send commands locally" on, save.
4. **Power-cycle** the thermostat.
5. Check the toolbar: <img src="../images/home.svg" width="20"> **1** = connected.
   <img src="../images/home-warning.svg" width="20"> "No thermostat" = the DNS record does not work.

The **"Check DNS"** button shows where the name points from ioBroker's point of view. If ioBroker runs in Docker with
its own DNS, it may say "cloud" although the redirect works for the thermostat.

### Good to know

- **Runs locally:** schedule, manual, comfort, boost, eco, vacation. The name always goes via the cloud (refused in
  local-only mode).
- **A local command fails** → it is sent via the cloud automatically.
- **Energy in local-only mode** does not come from the cloud; it is estimated from heating time × load.
- **Port 9513** must be free and reachable by the thermostat (Docker: publish the port, VLAN: firewall).
- **Several thermostats:** one DNS record for all (not yet tested with several real devices).
- **Back to the cloud:** mode "Off", delete the DNS record, power-cycle the thermostat. If the record stays active,
  the adapter warns.
- **Security:** any device on the network can reach port 9513 – only use it on a trusted network.

---

## 🐞 Troubleshooting

| Problem | Solution |
| --- | --- |
| Toolbar <img src="../images/home-warning.svg" width="20"> "No thermostat" | DNS record active? Thermostat power-cycled? Port 9513 reachable? |
| Thermostat offline in mode "Off" | DNS record still active – delete it and power-cycle the thermostat |
| Card shows <img src="../images/cloud.svg" width="20"> Cloud although relay is set | The thermostat is not connected to the adapter (see above) |
| Need details | Log level **debug**: all cloud requests and – with local control – every message (`Thermostat (…)` / `Vendor gateway (…)`) |