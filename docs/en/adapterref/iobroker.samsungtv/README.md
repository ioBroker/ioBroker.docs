<img src="admin/samsung.svg" alt="Samsung TV logo" width="180">

# iobroker.samsungtv

Modern Samsung TV adapter with automatic discovery and multi-device management in one instance (multiple TVs supported in the same instance).

This is an independent community adapter for televisions manufactured by [Samsung Electronics](https://www.samsung.com/).

German documentation is available at `doc/de/README.md`.

## Features
- Automatic discovery via SSDP/UPnP and optional mDNS
- Multiple TVs in one instance: `samsungtv.0.<tvname>.*`
- Tizen WebSocket API (8001/8002) + pairing/token
- H/J series PIN pairing (best effort)
- Wake-on-LAN (optional)
- Absolute volume and mute over UPnP RenderingControl
- Stable device matching via ID/UUID/MAC, also across renames
- No token output in logs or UI (tokens are stored encrypted)

## Configuration
The adapter uses ioBroker's native JSONConfig and Device Manager components. They automatically follow the active admin theme and adapt to desktop and mobile layouts.

The **Configuration** tab contains:
- **Auto scan** and **Auto scan interval** for periodic discovery
- **Poll interval** for power, volume, and mute updates
- **Discovery timeout**
- **Enable SSDP** / **Enable mDNS** discovery sources
- **Enable Wake-on-LAN**
- **mDNS services** in expert mode (comma-separated, best effort)

### Add devices
1. Open the **TV management** tab.
2. Start **Scan** or use **Manual add** as a fallback.
3. Add a discovered TV and choose its readable object-tree name.

Device Manager actions are applied and persisted immediately. The regular ioBroker save button applies settings from the **Configuration** tab.

### Pairing
- **Tizen**: when you click **Pair**, the TV shows a prompt (usually **Allow/Cancel**, no PIN). Confirm it on the TV.
- **H/J series**: click **Pair** → TV shows PIN → enter PIN in the native dialog.

The dynamic device registry is stored in ioBroker's persistent instance data directory so Device Manager actions cannot be overwritten by an already open settings form. Tokens/identities in that registry are encrypted with the ioBroker system secret and the file is written with owner-only permissions. Existing `native.devices` and encrypted `native.tokens` values are imported automatically on the first start.

If **no prompt** appears during pairing:
- TV: **Device Connection Manager** → enable **Access Notification**.
- TV: check **Device List** and remove old entries.
- Make sure ioBroker and the TV are on the **same subnet**.

## Object model
Per TV:
- `samsungtv.0.<tvname>.info.*`
  - `id`, `ip`, `mac`, `model`, `uuid`, `api`, `lastSeen`, `paired`, `online`
  - `tokenAuthSupport`
- `samsungtv.0.<tvname>.state.*`
  - `power`, `volume`, `muted`
- `samsungtv.0.<tvname>.control.*`
  - `power`, `wol`, `key`, `volumeUp`, `volumeDown`, `mute`, `channelUp`, `channelDown`, `launchApp`, `source`
  - `volume`, `muted`

### Control (short)
- `control.key`: any remote key (e.g. `KEY_POWER`, `KEY_VOLUP`)
- `control.launchApp`: app ID (Tizen) from the TV app list
- `control.source`: source as key (`KEY_HDMI`, `KEY_SOURCE`) or short form (`HDMI`)
- `control.volume`: absolute volume from 0 to 100
- `control.muted`: mute on or off, as opposed to `control.mute`, which toggles

### Volume
`control.volume` and `control.muted` use the TV's UPnP RenderingControl service, so they
set an exact level instead of stepping. Three things about that service are worth knowing:

- It only answers while the TV is on, and it starts answering several seconds after the TV
  first reports itself as on. The port can accept a TCP connection without the service
  behind it responding, so reachability is decided by an actual `GetVolume` call.
- UPnP defines `upnp:401` as `Invalid Action` and `upnp:402` as `Invalid Args`. Some Samsung
  TVs also return `upnp:401` when network or hospitality-mode restrictions block control,
  so the adapter reports those restrictions as possible causes rather than a certainty.

### Key codes (control.key)
`control.key` accepts either **Samsung key codes** (`KEY_*`) or **friendly short forms**:
- Navigation: `up`, `down`, `left`, `right`, `enter`, `back`
- System: `home`, `source`, `menu`, `info`, `guide`, `exit`
- Volume/channel: `volup`, `voldown`, `mute`, `chup`, `chdown`
- Media: `play`, `pause`, `stop`, `rewind`, `ff`, `record`
- Colors: `red`, `green`, `yellow`, `blue`
- Numbers: `0` to `9`

Direct key codes also work:
- Examples: `KEY_UP`, `KEY_DOWN`, `KEY_ENTER`, `KEY_RETURN`, `KEY_HOME`, `KEY_SOURCE`

Note: not every TV supports every key. Some keys only work when a menu/focus is active.

## Notes
- Discovery is best effort. SSDP is primary, mDNS is optional.
- Older devices are detected where possible (HJ/Legacy); feature set may vary.
- For H/J/JU devices, HJ is preferred when available. Tizen remote is attempted otherwise and switches to HJ automatically if the TV reports "unrecognized method".
- If legacy objects exist, warnings are logged.
- Adapter is renamed to `samsungtv` to avoid conflicts with the old `samsung` adapter.

## Changelog

### **WORK IN PROGRESS**
- Add absolute volume and mute (`control.volume`, `control.muted`) over UPnP RenderingControl.
- Fall back to the well-known RenderingControl endpoint when SSDP returns nothing.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.28
- Replace the custom React configuration page with native ioBroker JSONConfig and Device Manager components.
- Add responsive discovery, manual-add, details, pairing, rename, and remove workflows.
- Move the dynamic registry to persistent instance data with system-secret encryption and automatic migration.
- Remove obsolete custom admin message handlers and frontend dependencies.

### 0.0.27
- Fix TCP reachability checks and prevent overlapping polling/discovery cycles.
- Add bounded timer settings and cross-platform ping/ARP handling.
- Align generated objects and state roles with the current ioBroker catalogue.
- Complete metadata translations and singleton/compact-mode support.

### 0.0.26
- Replace the legacy configuration page with a responsive React admin UI.
- Add complete ioBroker admin translations and automatic light/dark theme support.
- Add typed configuration foundations and migration tests.
- Store Tizen tokens and H/J pairing identities reliably through ioBroker `encryptedNative` handling.
- Migrate pairing data written by older adapter versions without exposing secrets.

Older changes are documented in CHANGELOG_OLD.md.

## How to test (short)
1. Install the adapter and create an instance.
2. Open **TV management** and start **Scan**.
3. Add a TV and set a name (e.g. `tv-livingroom`).
4. Verify object tree `samsungtv.0.tv-livingroom.*`.
5. Run **Pair** and confirm on the TV.
6. Test `control.*` objects (e.g. `control.mute`).
7. Rename the TV in Device Manager: the object tree should migrate cleanly.

## License
MIT

Copyright (c) 2026 softwarecrash