---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
---
# Extending discovery

This guide is for adapter developers who want the discovery adapter to find their devices and propose
their adapter. A discovery function is one of the requirements for the stable repository (see the
[ioBroker.repositories rules](https://github.com/ioBroker/ioBroker.repositories#requirements-for-an-adapter-to-get-added-to-the-stable-repository)).

In most cases the whole change is three files:

| File                                   | What                                                        |
|----------------------------------------|-------------------------------------------------------------|
| `src/lib/adapters/<adaptername>.ts`    | the detection module                                        |
| `test/adapters/<adaptername>.test.js`  | its test, fed with data captured from a real device         |
| `README.md`                            | one line in "Automatically Discovered", one changelog entry |

Nothing else needs to be registered: the modules are loaded from `build/lib/adapters/` by file name.

**The file name must be exactly the adapter name** (`myadapter.ts` for `iobroker.myadapter`). Discovery
loads a module only if an adapter of that name is in the repository the installation uses, so that it
never proposes an adapter the user cannot install. A module with another name is never loaded.

## How a scan works

```
discovery methods            devices, grouped by type          detection modules           admin
(src/lib/methods/)                                             (src/lib/adapters/)
 ping   ───────────────►  ip      192.168.1.10, .11, ...  ──►  every module with type 'ip'
 mdns   ───────────────►  mdns    192.168.1.10, ...       ──►  every module with type 'mdns'   ──► proposals in
 upnp   ───────────────►  upnp    192.168.1.11, ...       ──►  every module with type 'upnp'       system.discovery
 serial ───────────────►  serial  /dev/ttyUSB0, ...       ──►  every module with type 'serial' ──► discovery dialog
 ...                                                                                               creates instances
```

1. The methods scan the network and collect devices. The same address can show up several times, once per
   type: `192.168.1.10` as an `ip` device (it answered ping) and as an `mdns` device (it announced a
   service).
2. Every device is handed to every module whose `type` matches.
3. A module that recognises the device adds a **proposal** to `options.newInstances`.
4. The proposals are stored in `system.discovery`. The discovery dialog in admin shows them, and creates the
   instances the user selects.

## Before you start

**The adapter must be in the ioBroker repository.** Discovery proposes an instance, and admin installs the
adapter from the repository to create it. Two checks see to that:

- **The build** reads every adapter name a module can propose and fails when one is not in the latest
  repository (`node scripts/proposedAdapters.js`, also run once a week, which opens an issue). It reads the
  first argument of `tools.getNextInstanceID()` and `tools.proposeSharedInstance()` - pass a string literal
  or a `const`, and build every proposal with one of the two, or the module drops out of the check.
- **At run time** a module runs only when its adapter is in the repository the installation is set to:
  while it is in latest only, users on stable do not get the proposal. It goes by the **file name** - name
  the module after the adapter it detects (`src/lib/adapters/<adaptername>.ts`), or it never runs.

**Find out how the device can be recognised.** Pick the first option that works, in this order:

| Option                                                                  | `type`   | Cost                                             | How to find out                                                                                                                         |
|-------------------------------------------------------------------------|----------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| mDNS service announcement, e.g. `_wled._tcp`                            | `mdns`   | none - the scan already collected it             | look at what the adapter's own discovery browses for; `avahi-browse -art` (Linux) or `dns-sd -B _services._dns-sd._udp` (macOS/Windows) |
| UPnP/SSDP answer (`USN`, `SERVER`, `ST`, the description at `LOCATION`) | `upnp`   | none - the scan already collected it             | an SSDP tool or `gssdp-discover`                                                                                                        |
| An answer on a fixed port or HTTP path                                  | `ip`     | one request to **every** host that answered ping | `curl http://<device>/<path>`                                                                                                           |
| A USB/serial stick that answers a probe                                 | `serial` | opens every serial port of the host              | the adapter's own code                                                                                                                  |

An `ip` module runs against every address on the network - printers, NAS, the router, other people's
devices. Use it only when the device does not announce itself.

**Know what the adapter needs in `native`.** Look at `native` in the adapter's `io-package.json`. A
proposal only carries the values the detection found out (`host`, `port`, `model`, ...). Admin puts them
over the adapter's defaults when it creates the instance (`Object.assign`, one level deep), so leave
everything else out.

## The detection module

### Contract

```ts
export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void;
export const type: string | string[];   // which devices the module wants to see
export const timeout: number;            // ms, default 2000
export const dependencies?: unknown;     // truthy => run after all other modules (hm-rega waits for hm-rpc)
```

- **Call `callback(null, found, ip)` exactly once, on every path** - also when nothing was found and when
  something failed. A second call is logged as an error. A missing call blocks the device until the
  watchdog fires.
- **`found` is `true` only if the module added or extended a proposal.** A device that already has an
  instance is recognised, but `found` is `false`.
- **`timeout` must be larger than everything the module waits for.** The core starts its watchdog with this
  value *before* it calls `detect()`. If both are equal, the watchdog wins.
- Errors are not thrown. A failed request means "not found": `callback(null, false, ip)`.
- The contract is callback based - keep it that way. Inside the module, promises are fine.

### Device types

| `type`   | `detect()` is called                                 | What the device carries                                                       |
|----------|------------------------------------------------------|-------------------------------------------------------------------------------|
| `ip`     | for every address that answered ping                 | `_addr`, `_name`                                                              |
| `mdns`   | for every address that announced an mDNS service     | `_mdns` - use `tools.hasMdnsService()`, `tools.mdnsName()`, `tools.mdnsTxt()` |
| `upnp`   | for every address that answered SSDP                 | `_upnp`: an array of header maps; `_location` holds the body of `LOCATION`    |
| `serial` | for every serial port                                | `_addr` is the port name; probe with `tools.testSerialPort()`                 |
| `udp`    | once, `_addr` is `255.255.255.255`                   | send your own broadcast with `tools.udpScan()`                                |
| `once`   | once per scan, `_addr` is `0.0.0.0`                  | for listeners, e.g. multicast                                                 |
| `advice` | once at the end, `detect(null, null, ...)`           | proposals without a device (javascript, history, web, ...)                    |

### Proposals

There are two kinds of adapters, and therefore two kinds of proposals.

**One instance per device** - the adapter keeps the address of its device in `native`:

```ts
if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
    return callback(null, false, ip); // already configured
}
options.newInstances.push({
    _id: tools.getNextInstanceID(adapterName, options),
    common: { name: adapterName },
    native: { host: ip },
    comment: { add: [name, ip] }, // what the dialog shows as "found"
});
callback(null, true, ip);
```

**One instance for all devices** - the adapter finds its devices itself and keeps no address in `native`
(shelly, wled, homewizard, ...). The first find creates the proposal, every further find is added to its
list, and an existing instance is offered as "extended":

```ts
callback(null, tools.proposeSharedInstance(adapterName, `${name} (${ip})`, options), ip);
```

**Values the detection cannot know** (an access code, a user name) are asked in the dialog with
`comment.inputs`. The value goes to the attribute named in `name`:

```ts
comment: {
    add: [name, ip],
    inputs: [
        { name: 'native.user', def: '', type: 'text', title: 'User name' },
        { name: 'native.password', def: '', type: 'password', title: 'Password' },
    ],
},
```

Input types the dialog understands: `text`, `password`, `checkbox`, `select` (with `options`), `link`
(a button, the URL in `def`) and `comment` (a line of text, in `def`).

### Example: mDNS

```ts
import * as tools from '../tools';
import type { DetectCallback, DetectOptions, DiscoveryDevice } from '../types';

const adapterName = 'myadapter';

// What the device announces - seen with `avahi-browse -r` on a Foo Bar 3000, firmware 2.1
const SERVICE = '_foobar._tcp';

export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (!tools.hasMdnsService(device, SERVICE)) {
        return callback(null, false, ip);
    }

    // One instance per device, addressed by `native.host`
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip);
    }

    const name = tools.mdnsName(device) || 'Foo Bar';
    options.log.debug(`Foo Bar detected at ${ip}`);
    options.newInstances.push({
        _id: tools.getNextInstanceID(adapterName, options),
        common: { name: adapterName },
        native: { host: ip },
        comment: { add: [name, ip] },
    });
    callback(null, true, ip);
}

export const type = ['mdns'];
export const timeout = 1500;
```

Real modules to read: `wled.ts` and `shelly.ts` (mDNS, shared instance), `blackmagic-atem.ts` (mDNS, one
instance per device), `bosesoundtouch.ts` (UPnP), `awtrix-light.ts` (HTTP probe), `alpha2.ts` (HTTP probe of
a device that allows only one connection at a time).

### Example: HTTP probe

Only if the device does not announce itself. Ask for something that identifies the device beyond doubt,
not just "port 80 answers":

```ts
const PORT = 80;
const PROBE_TIMEOUT = 1000;

export function detect(ip: string, _device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip); // the adapter talks to it already, leave it alone
    }

    // without a callback, httpGet returns a promise: rejected on errors and non-200 answers
    tools
        .httpGet(`http://${ip}:${PORT}/api/info`, PROBE_TIMEOUT)
        .then(body => {
            let info: { vendor?: string; model?: string } | null = null;
            try {
                info = body ? JSON.parse(body) : null;
            } catch {
                // not JSON - not our device
            }
            if (info?.vendor !== 'FooBar Inc.') {
                return callback(null, false, ip);
            }
            options.newInstances.push({
                _id: tools.getNextInstanceID(adapterName, options),
                common: { name: adapterName },
                native: { host: ip },
                comment: { add: [info.model || 'Foo Bar', ip] },
            });
            callback(null, true, ip);
        })
        .catch(() => callback(null, false, ip));
}

export const type = ['ip'];
export const timeout = PROBE_TIMEOUT + 500;
```

### Rules

- **Read only.** Identify the device, nothing else: no writes, no login attempts, no default passwords,
  nothing that changes a setting or a state of the device.
- **Probe as little as possible.** One request with a short timeout. Check the cheap thing first. Leave
  devices alone that already have an instance - the adapter is talking to them.
- **Be specific.** Match something that only this device sends: the service type plus a TXT entry, a model
  string, a vendor field. A false positive proposes a wrong adapter to every user who has such a device.
- **No secrets in a proposal.** Proposals are stored in `system.discovery` and shown in the dialog. Do not
  copy tokens or passwords from the device answer into `native` or `comment` - ask the user with an
  `inputs` field of type `password` instead.
- **Dependencies.** HTTP goes through `tools.httpGet()`, `axios` or `node:http`. Do not add a package for a
  single request; an optional package is `require()`d lazily with a fallback.
- **Comment why.** Write down where a service name, a port or a magic string comes from (adapter source,
  vendor documentation, a capture from a real device). The next person will need to know.

## Test

Every module gets a test in `test/adapters/<adaptername>.test.js` (mocha, `node:assert`, no other assertion
library). Feed it the data a real device delivered - the output of `avahi-browse -r`, the SSDP headers, the
HTTP answer - and cover at least:

- the device is found and the proposal looks as expected (`_id`, `native`, `comment`),
- a device that already has an instance is skipped,
- a similar device of another kind is **not** found.

```js
const assert = require('node:assert');
const path = require('node:path');

const mod = require(path.join('..', '..', 'build', 'lib', 'adapters', 'myadapter.js'));

function freshOptions(existingInstances = []) {
    return {
        newInstances: [],
        existingInstances,
        enums: null,
        language: 'en',
        log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    };
}

// as announced by a Foo Bar 3000 (avahi-browse -r)
const device = {
    _addr: '192.168.1.50',
    _type: 'mdns',
    _mdns: {
        PTR: { name: '_foobar._tcp.local', data: 'Living room._foobar._tcp.local' },
        SRV: { name: 'Living room._foobar._tcp.local', data: 'foobar-3000.local' },
    },
};

function detect(dev, options, ip = '192.168.1.50') {
    return new Promise(resolve => mod.detect(ip, dev, options, (err, found) => resolve({ err, found })));
}

describe('myadapter detection', () => {
    it('proposes one instance per device', async () => {
        const options = freshOptions();
        const { found } = await detect(device, options);
        assert.strictEqual(found, true);
        assert.deepStrictEqual(options.newInstances[0].native, { host: '192.168.1.50' });
    });

    it('skips a device that already has an instance', async () => {
        const options = freshOptions([
            { _id: 'system.adapter.myadapter.0', common: { name: 'myadapter' }, native: { host: '192.168.1.50' } },
        ]);
        const { found } = await detect(device, options);
        assert.strictEqual(found, false);
        assert.strictEqual(options.newInstances.length, 0);
    });
});
```

The tests load the **compiled** module from `build/`, so build first:

```bash
npm install
npm run build:tsc          # TypeScript -> build/
npm run test:integration   # all tests in test/**/*.test.js
npm run lint
npm run check              # type check
node scripts/proposedAdapters.js   # is every proposed adapter in the latest repository? (network)
```

### On a real installation

Run the adapter with [dev-server](https://github.com/ioBroker/dev-server) or in a test installation, set
the log level of `discovery.0` to `debug` and start a scan from the discovery dialog. A find shows up as

```
Test 192.168.1.50 myadapter DETECTED!
```

and the proposal appears in the dialog. While working on a module, `export const reloadModule = true;`
loads it again on every scan - remove it before the pull request.

## Pull request

1. In `README.md`, add the device to "Automatically Discovered" (alphabetical) and a changelog entry under
   `### **WORK IN PROGRESS**` at the top of the changelog (add the heading if it is not there yet):

   ```
   * (your-github-name) Detect Foo Bar devices from their `_foobar._tcp` mDNS announcement and propose the myadapter adapter
   ```

2. Do not change the version in `package.json` or `io-package.json` - the maintainers release.
3. One adapter per pull request. In the description: which device and firmware it was tested with, how
   the device announces itself, and the capture the test is built on.