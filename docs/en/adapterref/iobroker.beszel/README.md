---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.beszel
BADGE-stable: https://iobroker.live/badges/beszel-stable.svg
BADGE-Installations: https://iobroker.live/badges/beszel-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.beszel
BADGE-Test and Release: https://github.com/krobipd/ioBroker.beszel/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
---
# ioBroker.beszel — User documentation

This adapter mirrors a [Beszel](https://beszel.dev) Hub into ioBroker. Beszel is a lightweight
server monitor: small agents run on the machines you want to watch and report to a central Hub;
the adapter reads that Hub over its REST API and writes one device per monitored system.

Everything is read-only. The adapter never writes to the Hub and creates no writable datapoints.

- [Datapoints and metric switches](/#/docs/adapterref/iobroker.beszel/datapoints.md)
- [Questions and troubleshooting](/#/docs/adapterref/iobroker.beszel/faq.md)

## Before you start

You need a running Beszel Hub with at least one agent connected, and a login for that Hub.
The adapter authenticates as a normal Beszel user — the same e-mail address and password you use
for the Beszel web interface; Beszel does not accept a username there. An admin account is not
required, but multi-factor authentication must be off for that user: the adapter cannot answer
the one-time code.

The user only sees the systems it is assigned to: the ones it added itself, the ones a Hub admin
added it to (PocketBase admin panel at `/_/`, collection `systems`, field `users`), or every system
when the Hub runs with `SHARE_ALL_SYSTEMS=true`. A user that is assigned to nothing logs in fine
and sees an empty list — the connection test says so.

## Setting it up

1. **Install and create an instance.** In ioBroker, install `beszel` and open the instance settings.
2. **Enter the Hub URL** under _Beszel Hub URL_ — the same address you open the Beszel web
   interface with, for example `http://192.168.1.100:8090`. An IPv6 address goes in brackets:
   `http://[fd00::1]:8090`. Both `http` and `https` work; an https Hub needs a certificate the
   ioBroker host trusts. A Hub behind a reverse proxy keeps its path
   (`https://example.org/beszel`). Spaces and a trailing slash are removed; a URL with `?`, `#` or
   a user name and password in it is refused.
3. **Enter e-mail and password** of your Beszel login.
4. **Press _Test Connection_.** It performs a real login against the Hub and reports how many
   systems your user can see — or the actual error if something is wrong: a refused login, an
   unreachable host, a typo in the URL.
5. **Choose your metrics** on the _Metrics_ tab (see [Datapoints and metric switches](/#/docs/adapterref/iobroker.beszel/datapoints.md)).
   The defaults cover uptime, CPU, load average, memory, disk, disk throughput, network and
   temperature. Everything else is off until you switch it on.
6. **Save.** The instance starts, reads the Hub once, and creates the object tree.

## Poll interval and timeout

_Poll Interval_ accepts 10 to 300 seconds and defaults to 60. Beszel's agents record one
measurement per minute, so a value below 60 seconds produces extra requests without newer data.
A value entered outside that range — for example by a script writing the config directly — is
clamped rather than accepted.

_Request timeout_ (5 to 120 seconds, default 15) is how long a single request may take. Raise it
for a slow link or a Hub with many containers.

## What the adapter creates

```
beszel.0.
├── info.connection      is the Hub reachable
├── info.systemsTotal    systems registered on the Hub
├── info.systemsOnline   of those, how many report "up"
├── info.systemsAllUp    true while all of them do
└── systems.<name>.      one device per monitored system
```

The device name is the system name from the Hub, lower-cased with anything that is not a letter
or digit replaced by `_`. Two systems whose names reduce to the same id get a short hash suffix so
they cannot overwrite each other, and the adapter warns once when that happens. A name without any
Latin letter or digit (Cyrillic, Chinese, …) becomes `sys_` plus a short hash of the Hub's system
id, so it stays the same across restarts.

Renaming a system on the Hub moves it to a new device id: the adapter logs
`System renamed on the Hub: systems.a → systems.b`, and the old tree goes — including history
and other settings you made on its datapoints. Removing a system is logged the same way.

## How the adapter behaves when something is missing

- **A system goes down or is paused.** Its `info.online` turns false and `info.status` shows what
  the Hub says. The measured values stay at their last reading rather than jumping to zero —
  the adapter reports what it knows, and it knows nothing new.
- **The Hub becomes unreachable.** `info.connection` turns false, every system goes to
  `info.online: false` and `info.status: unknown`, and the fleet counters drop to zero. The same
  happens when you stop the instance, so nothing keeps claiming to be online while nobody reads.
- **The Hub answers with an empty list.** Nothing is deleted. PocketBase answers a login it no
  longer accepts (a changed password, a deleted user, a restored Hub database) with an empty list
  instead of an error, so the adapter first logs in again and asks once more. If the list stays
  empty, the tree stays as it is and the log says once that the user sees no systems.
- **The login is refused.** The log says why — wrong e-mail or password, multi-factor
  authentication, or password login switched off on the Hub. After three failures the adapter
  retries at growing intervals, at most every 15 minutes, instead of sending the password every
  poll.
- **A sensor, fan, GPU, filesystem, container or any other group member disappears.** Its
  datapoints are removed once it has been missing in two consecutive polls — a single hiccup does
  not clear anything.
- **A list is longer than the adapter reads.** The adapter reads at most 50 pages per list (1000
  records each for the lists of systems, containers, units and devices). On a Hub large enough to
  exceed that, the cut-off list is reported once and leaves the tree as it is, instead of deleting
  the systems at its end.

## Updating

An update reapplies names and descriptions to the datapoints you already have, so corrected
wording and new translations reach existing installations, not just fresh ones. The consequence
is that a datapoint you renamed yourself in the admin gets the adapter's name back on the next
start.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.19.0 (2026-09-25)

- New: network monitors (Beszel 0.20.0) as an opt-in metric — response time, hourly average/fastest/slowest and loss for every ping, TCP, HTTP and DNS monitor set up on the Hub
- New: containers show whether an image update is available (Beszel 0.20.0)
- New: btrfs filesystems appear next to the ZFS pools (Beszel 0.20.0), with their own name, the pool type and a flag for raw physical sizes
- New: the connection test tells how many systems your user can see, and says so when it is none
- Fixed: after a password change, a deleted user or a restored Hub database the adapter kept every system green without new values for up to a day — it now logs in again right away
- Fixed: a refused login says why — wrong e-mail or password, multi-factor authentication, or password login switched off on the Hub — and the adapter stops retrying every poll
- Fixed: a paused or never-connected system no longer shows uptime 0 or empty system details; its last values stay
- Fixed: on current Hubs, swap, ZFS cache, GPU memory and GPU package power appeared on hosts that do not have them — they are removed
- Fixed: drives without a temperature or capacity reading showed 0; they now get no such datapoint
- Fixed: a storage pool that was removed came back with the next detail refresh and stayed until the next restart
- Fixed: a system whose name has no Latin letters or digits (e.g. Cyrillic or Chinese) got no object tree; it now gets a stable fallback id
- Fixed: two containers or group members whose names turn into the same id could swap their datapoints after a restart, and a container's id suffix changed with every re-create
- Fixed: a member of a group (sensor, container, unit, …) that was missing from a single poll was deleted at once; it now has to be missing twice
- Fixed: spaces and a trailing slash around the Hub URL are removed; a URL with `?`, `#` or a user name and password in it is rejected with a clear message, also in the connection test
- Fixed: on a very large Hub, the systems at the end of a long list lost their datapoints — a cut-off list now leaves the tree as it is and is reported once
- Fixed: a request that trickled in slowly could run far past the configured timeout
- Changed: a Hub URL that does not lead to the Beszel API (e.g. a missing reverse-proxy path) is named as such in the log and in the connection test
- Changed: a renamed or removed system on the Hub is reported in the log
- Changed: the login field is called E-mail — Beszel does not accept a username
- Changed: the SMART verdict also knows WARNING and UNKNOWN, the pool health UNKNOWN and the vdev state MISSING
- Changed: help texts, descriptions and translations corrected; drive model, serial number, firmware and host name carry more specific roles

### 0.18.0 (2026-09-15) — stable

- New: every system carries a pictogram of its operating system in the object tree — the same icons the Beszel web UI uses, readable in the light and the dark theme
- Fixed: network upload/download were always empty against a Beszel Hub 0.19.0 or newer; they carry values again, and older Hubs keep working
- Fixed: disk read/write, network upload/download and swap used show 0 while idle instead of an empty value
- Fixed: containers and systemd units of a system that is down or paused were deleted after a few minutes — they now keep their last values like every other datapoint
- Fixed: the last SMART device, ZFS pool detail or systemd unit of a system was never removed once it disappeared on the Hub
- Fixed: hardware and OS details are refreshed when a system reconnects — a new kernel shows after the reboot, not after the next adapter restart
- Fixed: a system that was still pending gets its hardware and OS details on its first contact
- Fixed: a Hub that is slow at adapter start no longer blanks the hardware/OS datapoints of all systems for one poll
- Fixed: renaming a system on the Hub in a way that keeps its object id (e.g. only the case) now reaches the object tree
- Fixed: a system added later with the same name as an existing one no longer takes over the existing system's object tree; the newcomer gets the suffix
- Fixed: a container, dataset or unit whose name equals a group name (e.g. `gpu`, `network`, `containers`) kept being renamed while its system was down
- Fixed: stopping the adapter in the middle of a poll no longer leaves late value changes behind
- Fixed: after the Hub briefly reported an empty system list, the offline markers written on errors and on shutdown reached no system
- Changed: temperature, battery, swap and ZFS ARC datapoints exist only on hosts that report that hardware; existing empty ones are removed
- Changed: uptime, load average and agent version appear only once a system has connected; existing empty ones are removed
- Changed: the ZFS error counters and the SMART power-cycle counter no longer show an empty unit in the object tree
- Changed: the four "Peak values" options are gone — a Hub never delivers peak values in the minute records the adapter reads, so they never produced a datapoint
- Changed: the messages of the connection test follow the system language, and the test runs with the configured request timeout
- Changed: SMART and dataset text columns the Hub does not carry read as empty (null) instead of an empty string
- Changed: the warning about a plain-http Hub URL is gone — http on the local network is how Beszel is normally deployed
- Changed: `info.uptime_text` is gone — it was `info.uptime` a second time as text; existing installations lose it on the first start

### 0.17.1 (2026-09-07)

- Improved: sixteen datapoints now carry an explanation in the object tree — online state, OS name, load average, container and service CPU, ZFS scrub errors and drive power cycles
- Fixed: the datapoint carrying the distribution name was labelled "OS Version" — it now reads "OS Name" in all eleven languages, matching what it actually shows

### 0.17.0 (2026-09-06)

- New: SMART data per drive as an opt-in metric — the drive's own overall verdict plus temperature, capacity, power-on hours and power cycles
- New: ZFS pool details as an opt-in metric — scrub status, per-vdev error counters and the datasets of each pool
- New: systemd service details as an opt-in metric — state, sub-state, CPU and memory for every unit the agent reports
- Improved: the two slow detail sources are read every 15 minutes instead of every poll, so switching them on costs your Hub almost nothing

### 0.16.0 (2026-09-06)

- Fixed: switching a metric group off now really empties it — a system that was offline at the time kept the empty channel and got it back after every restart
- Fixed: a stumble while starting no longer leaves the adapter alive but silent — it keeps going and updates your values as usual
- Changed: the status words of a system, of a ZFS pool and of a container are shown in your ioBroker language instead of English
- Changed: a container's health is now a proper status datapoint with its list of possible values, like the system status next to it
- Improved: starting up puts far less load on the ioBroker database, which shows most with many systems or many metrics switched off
- Changed: user documentation now covers the ZFS pools, the root disk name and the read/write totals

## License

MIT License

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