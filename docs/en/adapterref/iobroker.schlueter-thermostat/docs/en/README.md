---
chapters: {"pages":{"en/adapterref/iobroker.schlueter-thermostat/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/README.md"},"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md"}}}
---
# ioBroker.schlueter-thermostat

Cloud‑Adapter for **Schlüter / OJ Microline OWD5 Thermostats**

---

## 🌍 Overview

This adapter integrates **Schlüter / OJ Microline OWD5 thermostats** into ioBroker via the **official cloud APIs**.

It supports:

- 🌡 Temperature monitoring
- 🎯 Setpoints
- 🔄 Mode control
- ⏱ Comfort & Boost timers
- 🏖 Vacation mode
- 📅 Full schedule readout
- ⚡ Energy statistics
- 🔔 Optional adapter notifications (Telegram, Pushover, WhatsApp, Email, Signal, Matrix, Synology Chat)

> **Cloud-only** — no local gateway, Modbus, or LAN API required.

---

## 🧠 Architecture

```
ioBroker
   │
   │ HTTPS (REST)
   ▼
schlueter-thermostat Adapter
   │
   ├──► OWD5 Cloud API  (READ)
   │      - Groups
   │      - Thermostats
   │      - Temperatures
   │      - Modes
   │      - Schedule
   │      - Energy
   │
   └──► OCD5 Cloud API  (WRITE)
          - Setpoints
          - Modes
          - End times
          - Vacation
          - Thermostat name
```

---

## 🖥️ Device Manager (Admin)

The previous custom Admin tab was removed and replaced by the official ioBroker Admin **Device Manager**.

Each adapter instance is now listed in Device Manager and shows all thermostats of the instance there.

### Features

| Area | What you can do |
| ---- | --------------- |
| **Device list** | See all thermostats grouped by adapter group |
| **Card** | Connection icon on the card plus summary values in card details (room/floor temperature, heating, regulation mode, consumption) |
| **Details (three-dot menu)** | Open thermostat details with an **Information** tab (Group ID, Thermostat ID, Model) and a **Controls** tab |
| **Control** | Set manual/comfort setpoints, trigger schedule/eco/manual/comfort apply actions, configure boost duration + apply, manage vacation settings, and rename the thermostat |

### Open Device Manager

1. Open ioBroker Admin
2. Open the **Device Manager** section
3. Expand your `schlueter-thermostat.X` instance
4. Use the three-dot menu on a thermostat card to open details/actions

---

## 🚀 How to Start

1. Install adapter in ioBroker
2. Open instance configuration
3. Enter:

| Setting           | Description                   |
| ----------------- | ----------------------------- |
| Username          | Your Schlüter/OJ cloud login  |
| Password          | Cloud password                |
| API Key           | Default works in most cases   |
| Customer ID       | Found in thermostat info      |
| Client SW Version | Numeric value from thermostat |
| Poll Interval     | Default: 60 seconds           |

4. Save & start adapter

---

## 🔄 Adapter Workflow

### On Startup

- Login to cloud
- Create object tree
- Start polling

### Poll Cycle

- Reads all Groups and Thermostats
- Updates temperatures, modes, setpoints
- Updates end times (comfort/boost)
- Reads schedule
- Reads energy values

### When You Press an Apply Button

- Adapter builds a **full UpdateThermostat payload**
- Sends to cloud
- Cloud forwards to thermostat

---

## 🧩 Object Structure

```
schlueter-thermostat.0
└─ groups
   └─ <GroupId>
      └─ thermostats
         └─ <ThermostatId>
```

---

## 📥 Readable States

| Category     | States                           |
| ------------ | -------------------------------- |
| Temperatures | Room, Floor                      |
| Setpoints    | Manual, Comfort                  |
| Modes        | RegulationMode                   |
| End Times    | Comfort, Boost                   |
| Vacation     | Enabled, Begin, End, Temperature |
| Schedule     | All days + events                |
| Energy       | kWh history values               |

---

## ✍ Writable States (Apply Concept)

Direct writes are **not used anymore**.  
All actions go through **Apply buttons**.

| Apply Mode           | Function                |
| -------------------- | ----------------------- |
| apply.schedule.apply | Activate schedule       |
| apply.comfort.apply  | Comfort mode + duration |
| apply.manual.apply   | Manual temperature      |
| apply.boost.apply    | Boost mode              |
| apply.eco.apply      | Eco mode                |
| apply.vacation.apply | Vacation settings       |
| apply.name.apply     | Rename thermostat       |

---

## 🔥 Regulation Modes

| Mode     | Number | Behavior                     |
| -------- | ------ | ---------------------------- |
| Schedule | 1      | Uses weekly schedule         |
| Comfort  | 2      | Temporary comfort temp       |
| Manual   | 3      | Fixed temperature            |
| Boost    | 8      | Temporary boost max. 60 Min. |
| Eco      | 9      | Energy saving mode           |

---

## ⏱ Time Handling

- End times are sent in **thermostat local time**
- No timezone suffix (no `Z`)
- Boost and Comfort durations supported (Boost max. 60 Min.)
- Thermostat timezone offset is respected

---

## ⚡ Energy

Each thermostat provides:

```
energy.count
energy.value0
energy.value1
...
```

Values start with **today**.

---

## 🛡 Stability & Safety

- Safe DB wrappers
- Poll protection (no overlapping polls)
- Offline detection
- Cloud connection monitoring
- Apply error handling
- Graceful shutdown
- Fallback polling (automatic backoff, see below)

---

## 🔁 Fallback Polling

When the cloud is unreachable or **all** thermostats are offline, the adapter automatically reduces polling frequency to conserve resources:

| Phase | Behavior |
| ----- | -------- |
| Normal | Polls at the configured interval (default: 60 s) |
| Backoff | On each consecutive failure the interval doubles (60 s → 120 s → 240 s → … → 1 h) |
| Fixed schedule | After reaching 1 h, polling switches to a fixed schedule at **12:00** and **00:00** |
| Recovery | As soon as at least one thermostat is online again, the interval resets to the configured value |

---

## Tab „Notification“

Activates Push-Notifications, to inform about device events. All Notifications will send in preconfigured system language.

### Notification Categories

| # | Category |
|---|---|
| 1 | **⚠️ Thermostat Offline** 
| 2 | **✅ Thermostat Online** 
| 3 | **⚠️ Cloud Connection lost**
| 4 | **✅ Cloud Connection restored** 


### Supported Providers

Each enabled provider supports an optional adapter instance selector (`type:instance`) in the instance config.
If left empty, the adapter automatically detects a running instance and prefers the lowest instance number (`.0`, `.1`, ...).

| Provider | Optional Configuration |
|---|---|
| **Telegram** | User or Chat-ID (optional) |
| **Pushover** | Title, Device (optional) |
| **WhatsApp** (`whatsapp-cmb`) | Phone Nr. (optional) |
| **E-Mail** | Receiver, Subject (optional) |
| **Signal** (`signal-cmb`) | Phone Nr. (optional) |
| **Matrix** (`matrix-org`) | No additional configuration |
| **Synology Chat** | Channelname (necessary) |

---

## 🐞 Debugging

Set log level to **debug** to see cloud communication.

---

## 📌 Notes

- Developed and tested with a single thermostat
- Multi-device environments supported, but feedback welcome