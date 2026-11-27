# ioBroker.aura

**Aura** is a modern visualization dashboard for [ioBroker](https://www.iobroker.net/).

📖 **[Documentation](https://hdering.github.io/ioBroker.aura/)** – widgets, settings, screenshots

---

## Installation

### Step 1 – Install adapter

Install Aura via ioBroker Admin:

1. Open ioBroker Admin
2. Go to **Adapters**
3. Search for **Aura** and install it

### Step 2 – Create instance

After installation, create a new **Aura** instance (if not done automatically).

### Step 3 – Choose the web instance

Aura is served by the **web adapter** (`iobroker.web`, 8.0.0 or newer, installed along with Aura) under
`/aura/`. Open the **Aura** instance settings:

| Setting | Default | Meaning |
|---------|---------|---------|
| **Web instance (/aura/)** | picked automatically on a new installation | The `iobroker.web` instance Aura runs in. Its port, HTTPS, certificate and login apply to Aura. For the Visu App and remote access through ioBroker.pro choose the instance set in `cloud.0` (usually `web.0`) |

One web instance serves one Aura instance. A second Aura instance needs a web instance of its own
(e.g. `web.1` on another port).

> **Coming from port 8095?** Existing installations keep their own port until **Own port (deprecated)**
> is switched off; the old port then forwards every device to `/aura/` and takes its settings along.
> Checklist (kiosks, bookmarks, home screen app, reverse proxy, MCP):
> [Moving to the web adapter](https://hdering.github.io/ioBroker.aura/anleitungen/umzug-web-adapter) (German).

**If anything does not work — a blank dashboard, widgets with a load error, images that stay
empty — press *Check backend* in the instance settings first.** It tests the instance, the
socket connection and the file delivery live and says in plain words what is wrong; the report
is meant to be pasted into a forum post or a GitHub issue. Aura runs the same check at every
start and writes the result to the log and to `aura.0.info.backendCheck`.

### Step 4 – Open dashboard

The dashboard is available at (port and protocol of the chosen web instance):

```
http://<iobroker-ip>:8082/aura/
```

The admin interface at:

```
http://<iobroker-ip>:8082/aura/#/admin
```

---

## HTTPS / Reverse Proxy

HTTPS comes from the web instance: enable **Secure (HTTPS)** there and choose the certificates. Aura is
then served as `https://<iobroker-ip>:8082/aura/`.

> The default self-signed certificate triggers a browser warning. For a clean setup use proper
> certificates (e.g. Let's Encrypt) or put the web instance behind a reverse proxy.

### Reverse proxy

Point a reverse proxy (e.g. **nginx**, **Nginx Proxy Manager**, **Caddy**) with a valid TLS
certificate at the **web instance** and forward the **whole host**, not only `/aura/`, with
WebSockets. The frontend under `/aura/` also uses the top level of the domain: the web instance's
socket on `/` (`wss://<host>/?sid=…`), `/socket.io/socket.io.js`, and `/adapter/…` and `/lib/…`
for web components. A plain `location /aura/` on a shared domain gives a page without live values -
use a (sub)domain of its own for the web instance instead.

#### Nginx Proxy Manager – example configuration

| Field | Value |
|-------|-------|
| Forward Scheme | `http` (or `https` if the web instance runs HTTPS) |
| Forward Hostname / IP | `<iobroker-ip>` |
| Forward Port | `8082` (port of the web instance) |
| Websockets Support | enabled |
| Cache Assets | off (recommended) |

Optional redirect from `/` to `/aura/` (tab **Advanced**):

```nginx
if ($request_uri = "/") {
    return 302 /aura/;
}
```

> **Not** `location = / { return 302 /aura/; }` - `location` only looks at the path, so it also
> catches the WebSocket `/?sid=…` (302 instead of 101) and the dashboard gets no values.
> `$request_uri` includes the query string, so `/?sid=…` passes.

Then open `https://your-domain.com/aura/`. Examples for plain nginx and Caddy, checks with `curl`
and a troubleshooting table: [Reverse proxy](https://hdering.github.io/ioBroker.aura/anleitungen/reverse-proxy) (German).

> **Moving from port 8095:** point the proxy at the web instance **before** switching the own port
> off. Behind a proxy the old port cannot forward (it would send devices to `<host>:8082`); it shows
> what to change instead.

---

## Messages for scripts and AI agents

`sendTo('aura.0', 'help', {})` answers with a description of the messages (`notify`, scenes, `staggeredWrite`, …) and the command states of Aura for AI agents (e.g. pi-agent) and script authors; the answer lists all commands with `write` (whether a command changes something).

---

## Bugs & Feature Requests

Please report directly as a GitHub issue:

**[github.com/hdering/ioBroker.aura/issues](https://github.com/hdering/ioBroker.aura/issues)**

---

## Versioning

Aura uses a simple scheme so you can tell stable releases from test builds at a glance:

| Version | Meaning |
|---------|---------|
| `0.10.2-next1`, `0.10.2-next2`, … | **Test builds** for the upcoming `0.10.2` release. Pre-releases, published for testing only. |
| `0.10.1` in the **Latest** repo | A published release in ioBroker's *Latest* repository. Available to everyone, but still on probation — not yet promoted to *Stable*. |
| `0.10.1` in the **Stable** repo | The same version after it has proven itself error-free in the field. This is the truly stable build. |

- A **`-nextN` suffix** marks a pre-release. The number counts the test builds leading up to the next plain version (`next1`, `next2`, …). Pre-releases are **not** offered automatically in ioBroker; you only get them if you explicitly install that version.
- A **plain number** (`0.10.1`, `0.10.2`, …) is first published to ioBroker's **Latest** repository. This makes it generally available, but *Latest* is the proving ground — one step before truly stable.
- Once a *Latest* release has run long enough with no errors reported, the **same version** is promoted to the **Stable** repository. Only then is it considered fully stable.

So the path of any release is: `-nextN` test build → **Latest** (published, on probation) → **Stable** (promoted once confirmed error-free).

---

## Changelog

_Older releases: see CHANGELOG_OLD.md._

### 1.7.0 (2026-11-26)
- ⚠️ **Breaking change:** Aura moves into the web adapter - reachable as <web-port>/aura/, the own port 8095 is deprecated; please follow the upgrade notice ([#997](https://github.com/hdering/ioBroker.aura/issues/997))
- 🌟 **New feature:** Status overview - greatly extended: tabbed configuration dialog, table layout with configurable rows, battery voltage/percent with own thresholds (also for 1.5 V cells), additional battery/alarm/window/light datapoints, own device names, documenting battery changes, counts as header values
- 🌟 **New feature:** Chart - selectable bar interval for consumption series (incl. per quarter), smoother live updates, command datapoint keeps external from/to fields in step ([#1036](https://github.com/hdering/ioBroker.aura/issues/1036))
- 🌟 **New feature:** Device card - further datapoints under short names, usable as {{name}} in the card's widgets ([#1007](https://github.com/hdering/ioBroker.aura/issues/1007))
- 🌟 **New feature:** Grid & Mobile - own column count for phones in landscape ([#1030](https://github.com/hdering/ioBroker.aura/issues/1030))
- 🌟 **New feature:** Web components - bind the edited value to a datapoint; clear message when a component cannot be loaded ([#958](https://github.com/hdering/ioBroker.aura/issues/958))
- 🌟 **New feature:** Click actions accept datapoint placeholders in URLs; the datapoint picker can pin its filters ([#1006](https://github.com/hdering/ioBroker.aura/issues/1006))
- 🌟 **New feature:** History - VictoriaMetrics recognised as history source ([#1020](https://github.com/hdering/ioBroker.aura/issues/1020))
- 🌟 **New feature:** New Aura icon for adapter, browser tab, home screen and loading screen
- 🐛 **Bug fix:** Performance and stability - faster tab switching with groups, no more stalls of large installations after updates or reconnects, dashboards reload reliably after an update
- 🐛 **Bug fix:** MCP server - far fewer false warnings and refusals when AI agents edit dashboards
- All 65 changes: https://github.com/hdering/ioBroker.aura/releases/tag/v1.7.0

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.