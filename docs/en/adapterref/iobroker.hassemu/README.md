---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hassemu
BADGE-stable: https://iobroker.live/badges/hassemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hassemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hassemu
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# hassemu — put any web page on a display that only accepts Home Assistant

Some wall displays will only talk to a Home Assistant server. They run through the HA
onboarding, and after that they show an HA dashboard — and nothing else. hassemu answers
the parts of the HA protocol those displays ask for, so the onboarding completes, and then
sends the display to whatever web page you choose: a VIS view, an Aura dashboard, Grafana,
Node-RED, a page you wrote yourself.

It is not a Home Assistant bridge. Nothing is imported from HA, and no ioBroker states are
exposed as HA entities. The adapter emulates just enough of an HA server for the display to
accept it, and then gets out of the way.

This page is the detailed guide. The [README](../../README.md) is the short version.

## Requirements

- Node.js 22 or newer
- ioBroker js-controller 7.2.2 or newer
- ioBroker Admin 8.0.11 or newer
- The display and ioBroker on the same network

Only one hassemu instance per network. The adapter listens on port 8123 because that is the
port HA clients expect, and it is not configurable — two instances would fight over it.

## Setting it up

### 1. Create the instance

Install the adapter and start instance 0. In the instance settings you normally change
nothing to begin with: mDNS is on, authentication is off, and the adapter binds to all
interfaces.

If your ioBroker host has several network cards, set **Bind to interface** to the one your
displays are on. The adapter announces itself under that address, so announcing an address
the display cannot reach is the most common reason discovery "works" but the display then
fails to connect.

### 2. Add the server on the display

On the display, add a Home Assistant server.

- **With mDNS on** the display finds the server by itself. It appears under the name in
  **Service Name** (default `ioBroker`).
- **Without mDNS**, or when the display does not search, enter the address by hand:
  `http://<ip-of-your-ioBroker>:8123`. It has to be `http` — see
  [Authentication and your network](#authentication-and-your-network).

### 3. Complete the onboarding

The display now runs the HA login. With authentication off you click straight through. With
authentication on, enter the user name and password from the instance settings.

Behind that click the display and the adapter exchange a token, and the adapter stores a
cookie on the display. That cookie is the display's identity from then on: it survives
reboots, address changes and renaming, which is why a display keeps its page without being
set up again.

### 4. The display is now waiting

When onboarding finishes, the display shows a small page with a device ID on it. That page
means: connected, but no page picked yet. The ID is what identifies this display in the
object tree.

### 5. Tell the display what to show

Open the ioBroker object browser and find the display under
`hassemu.0.clients.<id>`. Set **mode**:

- pick one of the discovered dashboards from the drop-down, or
- pick `Manual URL` and put the address in **manualUrl** next to it.

The display reloads within about 30 seconds.

To give every display the same page, use `hassemu.0.global.mode` (and `global.manualUrl`)
and switch on `global.enabled` instead of setting each display separately.

## Choosing what a display shows

Every display carries its own **mode**. The adapter resolves it on each request:

| mode              | What the display gets                     |
| ----------------- | ----------------------------------------- |
| a URL             | that page                                 |
| `Manual URL`      | whatever is in this display's `manualUrl` |
| `Global URL`      | whatever `global.mode` resolves to        |
| `---` (no choice) | the waiting page with the device ID       |

`global.mode` is resolved the same way, except it cannot itself be `Global URL` — that
would point at itself, and the adapter rejects the write.

### The master switch

`global.enabled` is not a mode a display can be in; it is a bulk action on all of them:

- switching it **on** sets every display to `Global URL`
- switching it **off** sets every display back to `---`

So switching the master off does not restore what each display had before — it clears them
all. Set the displays you want individually afterwards. New displays always start at `---`,
never on a page you did not choose for them.

## What lives in the object tree

```
hassemu.0.
├── info.
│   ├── connection      the adapter is running
│   ├── serverUuid      the identity the displays remember the server by
│   └── refreshUrls     button: search for dashboards again
├── global.
│   ├── enabled         master switch (see above)
│   ├── mode            the page for every display set to Global URL
│   └── manualUrl       free address, used when global.mode is Manual URL
└── clients.
    └── <id>            one entry per display, named after its host name or address
        ├── mode        what this display shows
        ├── manualUrl   free address, used when mode is Manual URL
        ├── resolvedUrl the address this display was actually sent to
        ├── ip          the address this display was last seen at
        └── remove      button: forget this display
```

**serverUuid** is worth knowing about: the displays recognise the server by it. It is
created once and kept, so restarting the adapter does not look like a different server to
the display. If it changed, every display would want to be set up again.

**remove** deletes the entry, and with it the display's identity. The next time that display
connects it is a new one and starts at `---`. Use it for displays you have got rid of; the
adapter also clears entries by itself once they have not been seen for 30 days.

**resolvedUrl** is the answer to "where did this display actually end up". It is read-only and
follows every change: pick a dashboard and it holds that address, switch the display to Global URL
and it holds whatever the global setting resolves to, take the choice back and it is empty because
the display is on its landing page. Handy when a display is set to Global URL and you would
otherwise have to work through two settings to see the result.

**ip** is informational. Displays are identified by their cookie, not their address, so a
new address from your router does not create a second entry.

## The three pages a display can show

Besides your dashboard, the display may show one of three pages of the adapter's own.

**The waiting page** — a device ID and a hint. Means: connected, no page chosen. It
refreshes itself every 15 seconds, so it disappears on its own once you pick a mode.

**"hassemu offline"** — the adapter has stopped or is unreachable. The display notices
after about 1.5 minutes and offers a reload button, then returns to your dashboard by itself
once the adapter is back. One limitation: a display that starts up _while_ the adapter is
down cannot load this page and shows its own connection error instead.

**"Redirect target not reachable"** — the adapter is running, but the page you sent the
display to is not answering. Without this you would just get a black screen. The card names
the target address and offers a reload; the display returns to the dashboard by itself as
soon as the target answers again.

The adapter judges "not reachable" conservatively: _any_ HTTP answer counts as reachable,
including a login page or an error page — those mean a server is running there. Only a
refused connection or a timeout raises the card. It does not check certificates, because
self-signed certificates are normal on a home dashboard.

## Where the drop-down list comes from

The adapter searches the ioBroker host for pages worth offering:

- **VIS and VIS-2** — one entry per project, and one per view inside it, for every `web`
  instance you have
- **Aura** — one entry per running instance, using the port that instance is actually
  configured with
- **Admin tiles** — anything an adapter advertises for the ioBroker start page (Grafana,
  jarvis, material, your own web UI…)

The search runs at start and whenever an adapter instance is added, removed or
reconfigured. After creating or renaming a VIS-2 project or view, set **info.refreshUrls**
to `true` to search again without restarting the adapter.

If something is not found, it is not lost: choose `Manual URL` and paste the address.
Addresses using `javascript:`, `data:` or `file:` are refused — those are not pages, they
are code.

## Authentication and your network

**Everything on port 8123 is unencrypted HTTP.** That is not a shortcut, it is what the HA
clients require on this flow; they will not do HTTPS here. Two consequences worth being
clear about:

- Treat port 8123 as local to your network. Do not forward it in from the internet.
- With authentication on, the user name, password and tokens travel your network
  unencrypted. Authentication stops other devices on your network from using the HA
  interface — it is not protection against exposure to the internet.

**Trust Proxy** should stay off unless a reverse proxy really is in front of the adapter,
terminating TLS and removing the `X-Forwarded-*` headers a client sent. Switched on without
one, any device can claim a different address on every single request. The adapter then logs
the wrong addresses, and its per-address limit on new display entries no longer limits
anything. Since version 1.40.0 there is a second limit that does not depend on the address —
at most 100 new display entries per hour in total — so a misconfiguration cannot fill the
database any more. Displays keep working while that limit is in effect; they simply do not
get a stored identity until the burst is over. The limit caps the damage, it does not make
the setting safe.

## Ports

| Port       | Direction | What the adapter needs it for                  |
| ---------- | --------- | ---------------------------------------------- |
| 8123 / TCP | inbound   | the HA interface the display talks to          |
| 5353 / UDP | inbound   | mDNS, so displays find the server on their own |

## Questions that come up

**Can I run two instances?** No. Port 8123 is fixed by the HA clients, so one host on the
network runs hassemu.

**Does the display have to stay connected to the adapter?** Yes. It fetches its page through
the adapter, and the offline page and the target check depend on it. If the adapter stops,
the display keeps showing the last page it loaded until it tries again.

**Can I rename a display?** Yes — rename the `clients.<id>` object in the object browser.
The adapter keeps your name and will not overwrite it, even when the display's address or
host name changes.

**Why is there a second entry for the same display?** The display did not send back its
cookie — usually a factory reset, a cleared browser cache, or a privacy mode that discards
cookies. Remove the old entry with its `remove` button. The cause is on the display, not in
the adapter.

**Do I need Home Assistant installed?** No. The adapter answers the HA protocol itself.
There is no Home Assistant anywhere in this setup.

**Can the display control ioBroker?** No. The connection carries the onboarding and the page
address, nothing else. No states are exposed and no commands are accepted.

## Finding out what went wrong

Set the instance log level to `debug`. The adapter then traces every decision: which display
was recognised, how the login went, which dashboards were found, and how it resolved the
mode into an address for each request. Most problems can be read straight out of that log.

If mDNS is on but the log has no `mDNS: Broadcasting` line, the announcement did not get out
— usually because something else holds port 5353. Turn mDNS off and enter the address on the
display by hand; everything else works the same.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.43.1 (2026-09-07)

- Changed: the button that removes a display now carries a description — it deletes the display's folder and all its states, and the display returns as a new entry on its next request

### 1.43.0 (2026-09-06)

- Fixed: taking a display's choice back (mode `---`, or turning the master switch off) now reaches the display — until now it kept the dashboard it had until someone reloaded it by hand
- Fixed: a display that lost power no longer holds up the adapter's shutdown for 30 seconds
- Fixed: VIS projects are found on every VIS instance, not only on `vis.0` / `vis-2.0`
- Fixed: upgrading from a pre-1.1.1 version no longer overwrites the whole instance configuration while removing the old URL setting
- New: every display now shows the address it was actually sent to, so you can see at a glance where a display landed without walking through the global and per-display settings yourself
- Changed: `info.serverUuid` and `global.enabled` carry clearer labels, and the per-display manual URL now has a description

### 1.42.0 (2026-09-04)

- Fixed: a leftover setting from older versions is now removed from the instance completely instead of only being switched off — switched off, it stayed behind for good

### 1.41.0 (2026-09-03)

- Fixed: renamed datapoints now reach installations that already exist — until now a changed name or description only ever showed up on a fresh install
- Fixed: the object tree kept outdated labels ("Known display clients", "Client IP", "Forget this client") and showed a developer note in the global manual URL name
- Changed: datapoint names now appear in your ioBroker language throughout the object tree, including the names the displays report for themselves
- New: full user documentation in English and German covering setup, the object tree and troubleshooting, shown by the ioBroker documentation portal

### 1.40.0 (2026-09-02)

- Fixed: with trustProxy enabled but no sanitising reverse proxy in front, a single device could create unlimited display entries — a global ceiling now caps this

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

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*