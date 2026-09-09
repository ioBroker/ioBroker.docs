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
The adapter authenticates as a normal Beszel user — the same email and password you use for the
Beszel web interface. An admin account is not required.

If you want container data, that user also needs read access to the Hub's `containers` collection.
Without it every other metric still works; the adapter warns once and keeps the container
datapoints it already created.

## Setting it up

1. **Install and create an instance.** In ioBroker, install `beszel` and open the instance settings.
2. **Enter the Hub URL** under _Beszel Hub URL_ — the same address you open the Beszel web
   interface with, for example `http://192.168.1.100:8090`. An IPv6 address goes in brackets:
   `http://[fd00::1]:8090`. Both `http` and `https` work; over `http` to a machine other than the
   ioBroker host, login and token travel the network unencrypted and the adapter says so once in
   the log.
3. **Enter username and password.** The username is the email address of your Beszel login.
4. **Press _Test Connection_.** It performs a real login against the Hub and reports the actual
   error if something is wrong — a wrong password, an unreachable host, a typo in the URL.
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
they cannot overwrite each other, and the adapter warns once when that happens.

## How the adapter behaves when something is missing

- **A system goes down or is paused.** Its `info.online` turns false and `info.status` shows what
  the Hub says. The measured values stay at their last reading rather than jumping to zero —
  the adapter reports what it knows, and it knows nothing new.
- **The Hub becomes unreachable.** `info.connection` turns false, every system goes to
  `info.online: false` and `info.status: unknown`, and the fleet counters drop to zero. The same
  happens when you stop the instance, so nothing keeps claiming to be online while nobody reads.
- **The Hub answers with an empty list.** Nothing is deleted. An outage must not wipe your object
  tree, so devices only disappear when the Hub genuinely reports a shorter list.
- **A sensor, fan, GPU, filesystem or container disappears.** Its datapoints are removed. If a
  whole group empties at once, the adapter waits for a second consecutive poll before deleting —
  a single hiccup does not clear the tree.

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

### 0.15.0 (2026-09-05)

- New: ZFS pools with usage, throughput and health as an opt-in metric, the root disk's custom name and cumulative read/write totals for disks and filesystems on Beszel 0.19.0.

### 0.14.2 (2026-09-05)

- Changed: Internal cleanup. No user-facing changes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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