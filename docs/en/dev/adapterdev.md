---
lastChanged: 2026.05.18
---
# Adapter Development Guide

This guide covers modern ioBroker adapter development using TypeScript, jsonConfig, and GitHub Actions.

## Getting Started

Use the official scaffolding tool to create a new adapter:

```bash
npx @iobroker/create-adapter@latest
```

Select **TypeScript** and **jsonConfig** when prompted. This generates a complete project with CI, testing, and admin UI.

## Project Structure

```
ioBroker.my-adapter/
  admin/
    jsonConfig.json        # Admin UI configuration
    my-adapter.png         # Adapter icon (256x256, at least 128x128)
  src/
    main.ts                # Adapter entry point
    lib/
      adapter-config.d.ts  # Types for this.config
      ...                  # Your modules
  test/                    # Integration tests
  io-package.json          # ioBroker metadata
  package.json             # npm metadata
  tsconfig.json            # TypeScript config
  .github/workflows/       # CI/CD
```

The `build/` directory is generated from `src/` by the TypeScript compiler. Never edit files in `build/` directly.

## The Adapter Class

Every adapter extends `utils.Adapter` from `@iobroker/adapter-core`:

```typescript
import * as utils from '@iobroker/adapter-core';

class MyAdapter extends utils.Adapter {
    constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({ ...options, name: 'my-adapter' });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    // The handlers themselves are shown under "Lifecycle Events" below
}

if (require.main !== module) {
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new MyAdapter(options);
} else {
    (() => new MyAdapter())();
}
```

> **Critical:** Handle errors inside async handlers with `try`/`catch` at the top level of the handler body. An unhandled rejection can crash or terminate the adapter, leading to missing stack traces and restart loops.

### Typing this.config

`this.config` is typed through the global `ioBroker.AdapterConfig` interface. `create-adapter` generates
`src/lib/adapter-config.d.ts` for it — keep it in sync with `admin/jsonConfig.json` and the `native` section of
`io-package.json`:

```typescript
// src/lib/adapter-config.d.ts
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            host: string;
            port: number;
            password: string;
        }
    }
}

// required so that TypeScript picks up the declaration above
export {};
```

Without this declaration, `this.config` has no usable type and every access goes unchecked.

## Lifecycle Events

### onReady

Called once when the adapter is initialized and configuration is loaded. This is your entry point.

```typescript
private async onReady(): Promise<void> {
    try {
        // Access configuration from admin UI
        const host = this.config.host;
        const port = this.config.port;

        // Set connection status
        await this.setState('info.connection', false, true);

        // Create objects, start polling, connect to devices...
    } catch (e) {
        this.log.error(`Startup failed: ${e instanceof Error ? e.message : e}`);
    }
}
```

### onStateChange

Called when a subscribed state changes. Use the `ack` flag to distinguish commands from status updates.

```typescript
private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
    if (!state || state.ack) return; // Ignore deletions and acknowledged states

    // User sent a command (ack=false)
    const stateName = id.split('.').pop();
    this.log.debug(`Command received: ${stateName} = ${state.val}`);
}
```

Subscribe to states in `onReady`:

```typescript
await this.subscribeStatesAsync('*');                 // All own states
await this.subscribeForeignStatesAsync('hm-rpc.0.*'); // States of another adapter
```

The plain `subscribeStates()` / `subscribeForeignStates()` variants register the subscription and return nothing — there is no promise to await. Use the `*Async()` variants shown above if you want to await the registration.

### onUnload

Called when the adapter shuts down. **Keep it short and always call `callback()`** — on every path, including the
error path. js-controller waits only a brief grace period (`common.stopTimeout` in `io-package.json`, a few hundred
milliseconds unless you raise it) and then kills the process.

```typescript
private onUnload(callback: () => void): void {
    try {
        // Clean up timers, connections, etc.
        // Use this.clearTimeout / this.clearInterval for adapter timers
    } catch { /* ignore */ }
    callback();
}
```

The handler may be `async` — the signature is `(callback) => void | Promise<void>` — but only for teardown that
finishes quickly, such as closing a socket. Never wait for a device to answer here.

> **Important:** Always use `this.setTimeout()` and `this.setInterval()` instead of the native Node.js versions. The adapter automatically clears them on shutdown.

### onMessage

Handles `sendTo()` calls from admin UI, scripts, or other adapters.

```typescript
private async onMessage(obj: ioBroker.Message): Promise<void> {
    if (!obj?.callback) return;

    switch (obj.command) {
        case 'testConnection': {
            const result = await this.testConnection(obj.message);
            this.sendTo(obj.from, obj.command, { success: result }, obj.callback);
            break;
        }
        default:
            this.sendTo(obj.from, obj.command, { error: 'Unknown command' }, obj.callback);
    }
}
```

## Objects and States

ioBroker has two types of data:

- **Objects**: Static metadata (configuration, structure, descriptions). Stored permanently.
- **States**: Dynamic values (sensor readings, switch states). Change frequently.

### Object Hierarchy

```
my-adapter.0                       # Adapter instance
  my-adapter.0.device1             # Device
    my-adapter.0.device1.info      # Channel
      my-adapter.0.device1.info.temperature  # State
      my-adapter.0.device1.info.humidity     # State
```

Objects have types: `device`, `channel`, `state`, `folder`, `meta`.

### Creating Objects

Objects whose structure is already known do not belong into the code. Declare them in
[`instanceObjects`](#instance-objects) and let js-controller create them. Use `setObjectNotExistsAsync()` only for
objects that depend on what the adapter finds at runtime — discovered devices, channels reported by an API:

```typescript
// Device
await this.setObjectNotExistsAsync('device1', {
    type: 'device',
    common: { name: 'My Device' },
    native: {},
});

// Channel
await this.setObjectNotExistsAsync('device1.info', {
    type: 'channel',
    common: { name: 'Device Info' },
    native: {},
});

// State
await this.setObjectNotExistsAsync('device1.info.temperature', {
    type: 'state',
    common: {
        name: 'Temperature',
        type: 'number',
        role: 'value.temperature',
        unit: '°C',
        read: true,
        write: false,
    },
    native: {},
});
```

> **Every parent path needs an object.** If you create `device1.info.temperature`, both `device1` and `device1.info` must exist as objects first.

`setObjectNotExistsAsync()` leaves an existing object untouched. If a later version changes `role`, `unit` or `name`,
use `extendObject()` so that existing installations pick the change up:

```typescript
await this.extendObject('device1.info.temperature', {
    common: { unit: '°F' },
});
```

### Writing States

```typescript
await this.setState('device1.info.temperature', 21.5, true);  // ack=true: actual value from device
await this.setState('device1.power', false, false);           // ack=false: command to device
```

### Commands and Statuses

The `ack` flag is critical:
- `ack: true` — Status update, the value comes **from** the device ("the device reports this value")
- `ack: false` — Command, the value goes **to** the device ("please set this value")

A subscribed state written with `ack: false` arrives in [`onStateChange`](#onstatechange). The adapter forwards it to
the device and writes the result back with `ack: true` once the device confirms it.

### Reading States

```typescript
const state = await this.getStateAsync('device1.info.temperature');
if (state) {
    this.log.info(`Temperature: ${state.val}${state.ack ? '' : ' (pending)'}`);
}
```

### State Roles

Every state needs a `role` in its common definition. Roles tell the UI how to render the state. Full list: [State Roles](stateroles.md).

Common examples:

| Role                  | Type    | Description             |
|-----------------------|---------|-------------------------|
| `value.temperature`   | number  | Temperature reading     |
| `switch`              | boolean | On/off switch           |
| `level.dimmer`        | number  | Dimmer 0-100%           |
| `button`              | boolean | Trigger (set to `true`) |
| `indicator.connected` | boolean | Connection status       |
| `text`                | string  | Generic text            |

## Configuration (jsonConfig)

Modern adapters use **jsonConfig** for the admin UI. The configuration is defined in `admin/jsonConfig.json` — no HTML required.

```json
{
    "type": "panel",
    "items": {
        "host": {
            "type": "text",
            "label": "Host",
            "sm": 6
        },
        "port": {
            "type": "number",
            "label": "Port",
            "min": 1,
            "max": 65535,
            "sm": 6
        },
        "password": {
            "type": "password",
            "label": "Password",
            "sm": 12
        }
    }
}
```

Values are stored in `native` of the adapter instance object and accessible via `this.config` in the adapter.

Two things the example above does not do by itself:

- **Translations** — with `"i18n": true` at the top level of `jsonConfig.json`, all `label` and `help` texts become
  translation keys that are resolved from `admin/i18n/<lang>.json`. `@iobroker/adapter-dev` manages those files for you.
- **Encryption** — `"type": "password"` only masks the input field. The value is stored in cleartext unless the field is
  also listed in [`encryptedNative`](#encrypted-configuration).

Full jsonConfig reference: [jsonConfig Documentation](adapterjsonconfig.md)

## io-package.json

Central metadata file. Key fields in `common`:

```json
{
    "common": {
        "name": "my-adapter",
        "version": "1.0.0",
        "title": "My Adapter",
        "titleLang": {
            "en": "My Adapter",
            "de": "Mein Adapter"
        },
        "desc": {
            "en": "Connects to my device",
            "de": "Verbindet mit meinem Gerät"
        },
        "authors": ["Your Name <email@example.com>"],
        "license": "MIT",
        "platform": "Javascript/Node.js",
        "mode": "daemon",
        "type": "hardware",
        "connectionType": "local",
        "dataSource": "push",
        "adminUI": { "config": "json" },
        "tier": 3,
        "enabled": true,
        "compact": true,
        "messagebox": true,
        "dependencies": [
            { "js-controller": ">=5.0.0" },
            { "admin": ">=6.0.0" }
        ],
        "keywords": ["iot", "smarthome"],
        "icon": "my-adapter.png",
        "extIcon": "https://raw.githubusercontent.com/yourname/ioBroker.my-adapter/master/admin/my-adapter.png"
    },
    "native": {
        "host": "",
        "port": 80,
        "password": ""
    },
    "encryptedNative": ["password"],
    "protectedNative": ["password"],
    "instanceObjects": [
        {
            "_id": "info",
            "type": "channel",
            "common": { "name": "Adapter information" },
            "native": {}
        },
        {
            "_id": "info.connection",
            "type": "state",
            "common": {
                "name": "Connection status",
                "type": "boolean",
                "role": "indicator.connected",
                "read": true,
                "write": false,
                "def": false
            },
            "native": {}
        }
    ],
    "objects": [],
    "news": {
        "NEXT": {
            "en": "initial release"
        }
    }
}
```

### Key Fields

| Field             | Purpose                                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`            | `daemon` (always running), `schedule` (cron-based), `subscribe`, `once`, `extension` or `none` — details in the [object schema](objectsschema.md)                                              |
| `type`            | Adapter category (see [categories](#adapter-categories) below)                                                                                                                                |
| `connectionType`  | `local` (direct) or `cloud` (internet required). Information for the user only — it does not change any behaviour                                                                              |
| `dataSource`      | `push`, `poll`, or `assumption`. Information for the user only — it does not change any behaviour                                                                                             |
| `adminUI`         | `{"config": "json"}` for jsonConfig                                                                                                                                                          |
| `tier`            | Start order of the instance: `1` starts first (drivers, hardware), `3` starts last (logic, visualization)                                                                                     |
| `enabled`         | Whether a newly added instance starts immediately. `true` is fine when the defaults fit most users, or when the backend has to run for the config dialog (e.g. browsing devices); else `false` |
| `compact`         | `true` if adapter supports compact mode (shared process)                                                                                                                                     |
| `messagebox`      | `true` if adapter handles `sendTo()` messages                                                                                                                                                |
| `encryptedNative` | Array of `native` field names that should be encrypted in the database                                                                                                                       |
| `protectedNative` | Array of `native` field names that are not passed to other adapters (except `admin`, `cloud` and `iot`)                                                                                        |
| `instanceObjects` | Objects created automatically for each adapter instance                                                                                                                                      |
| `dependencies`    | Required js-controller and adapter versions. The minimum versions expected from new adapters are listed in [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md) |

### Encrypted Configuration

Sensitive values like passwords and API keys should be encrypted:

```json
{
    "native": {
        "apiKey": "",
        "password": ""
    },
    "encryptedNative": ["apiKey", "password"],
    "protectedNative": ["apiKey", "password"]
}
```

> **`encryptedNative` must be at the root level of io-package.json**, not inside `common`.

- `encryptedNative`: Values are stored encrypted in the database. The adapter receives them decrypted at runtime via `this.config`.
- `protectedNative`: Values are not handed out to other adapters. The only exceptions are `admin`, `cloud` and `iot` — `admin` needs them so that the user can read and edit the fields in the configuration dialog.

When you add a field to `encryptedNative` in a new version, js-controller encrypts the value the next time the user
saves the configuration — no migration code needed. Until that save happens, the value in the database is still the
old cleartext one, so don't rely on the new field already being encrypted.

More on this: [Security related features for adapter developers](adaptersecurity.md).

### Instance Objects

Objects listed in `instanceObjects` are created automatically when an adapter instance is added — no code and no
`setObjectNotExistsAsync()` call required. **Prefer them over creating objects in code** whenever the structure is
static and not discovered at runtime, for example `info.connection`:

```json
"instanceObjects": [
    {
        "_id": "info",
        "type": "channel",
        "common": { "name": "Adapter information" },
        "native": {}
    },
    {
        "_id": "info.connection",
        "type": "state",
        "common": {
            "name": "Connection status",
            "type": "boolean",
            "role": "indicator.connected",
            "read": true,
            "write": false,
            "def": false
        },
        "native": {}
    }
]
```

## package.json

Standard npm package file. Key points:

```json
{
    "name": "iobroker.my-adapter",
    "version": "1.0.0",
    "main": "build/main.js",
    "engines": { "node": ">=22" },
    "dependencies": {
        "@iobroker/adapter-core": "^3.3.0"
    },
    "devDependencies": {
        "@alcalzone/release-script": "^5.2.0",
        "@alcalzone/release-script-plugin-iobroker": "^5.1.0",
        "@alcalzone/release-script-plugin-license": "^5.1.0",
        "@iobroker/adapter-dev": "^1.5.0",
        "@iobroker/eslint-config": "^2.3.0",
        "@iobroker/testing": "^5.2.0",
        "typescript": "~5.8.0",
        "vitest": "^3.2.0"
    },
    "scripts": {
        "build": "tsc -p tsconfig.build.json",
        "lint": "eslint",
        "test": "vitest run",
        "release": "release-script"
    }
}
```

> The `name` must be lowercase on npm: `iobroker.my-adapter`. The GitHub repo uses uppercase B: `ioBroker.my-adapter`.

## Logging

Use the built-in logger — never `console.log`:

```typescript
this.log.silly('Raw data dump');    // Verbose debugging
this.log.debug('Processing item');   // Development debugging
this.log.info('Connected to device'); // Noteworthy events
this.log.warn('Retry in 30s');       // Recoverable issues
this.log.error('Connection failed'); // Errors requiring attention
```

Guidelines:
- **Polling results** at `debug` level, not `info`
- **First occurrence** of an error at `warn` or `error`, **repetitions** at `debug`
- **Recovery** after errors at `info` (once)
- **All log messages in English** — user-facing text (state names, UI) uses the system language via translation objects
- Never log sensitive data (passwords, tokens)

## Connection Status

If your adapter connects to a device or service, maintain the `info.connection` state:

```typescript
await this.setState('info.connection', true, true);  // Connected
await this.setState('info.connection', false, true);  // Disconnected
```

This is shown as a green/red indicator in the admin instance list.

## Error Handling

Put the retry into its own method — never call `onReady()` again. `onReady()` creates objects and subscriptions;
re-running it repeats all of that and stacks up timers.

```typescript
private retryDelay = 30_000;

private async onReady(): Promise<void> {
    try {
        await this.connect();
    } catch (e) {
        this.log.error(`Startup failed: ${e instanceof Error ? e.message : e}`);
    }
}

private async connect(): Promise<void> {
    try {
        await this.connectToDevice();
        await this.setState('info.connection', true, true);
        this.retryDelay = 30_000;
    } catch (e) {
        this.log.warn(`Connection failed: ${e instanceof Error ? e.message : e}`);
        await this.setState('info.connection', false, true);
        // Retry with an adapter timer — it is cleared automatically on unload.
        // connect() catches its own errors, so the promise cannot reject here —
        // `void` marks that deliberately.
        this.setTimeout(() => void this.connect(), this.retryDelay);
        this.retryDelay = Math.min(this.retryDelay * 2, 300_000);  // back off
    }
}
```

> Never let exceptions escape event handlers. Always catch at the top level.

## Versioning

Use [Semantic Versioning](https://semver.org/). A version is `MAJOR.MINOR.PATCH`:

- **Patch** — increments the third number, `1.2.3` → `1.2.4`: bug fixes
- **Minor** — increments the second number and resets patch, `1.2.3` → `1.3.0`: new features, backwards compatible
- **Major** — increments the first number and resets the rest, `1.2.3` → `2.0.0`: breaking changes

While the major version is still `0`, the adapter counts as initial development and breaking changes may ship in a minor bump.

The `common.news` field in io-package.json shows version history in the admin UI. Keep it to a maximum of 7 entries. Use `NEXT` as placeholder for the upcoming release — the release-script replaces it with the actual version number.

## Release Workflow

Use [@alcalzone/release-script](https://github.com/AlCalzone/release-script) for releases:

```bash
npm run release -- minor   # Bump minor version
npm run release -- patch   # Bump patch version
```

This updates version numbers in both `package.json` and `io-package.json`, replaces the `NEXT` entry in `common.news`, creates a commit and git tag.

After the tag is pushed, GitHub Actions builds and publishes to npm automatically via the `deploy` job in the CI workflow.

## CI/CD with GitHub Actions

The standard workflow in `.github/workflows/test-and-release.yml` handles:

- **Testing**: Runs on every push and PR (lint + unit tests + integration tests across Node versions)
- **Deploy**: Triggered by version tags (`v*.*.*`), publishes to npm

The deploy job uses npm OIDC (trusted publishers) — no npm token needed in secrets if configured.

## Adapter Categories

The `common.type` field in `io-package.json` puts the adapter into a category.
The authoritative list of valid values, with descriptions, is maintained in
[ioBroker.repositories/README.md](https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md#types)
— use that list rather than a copy, so it cannot drift.

To see which category comparable adapters use, sort the
[adapter list](https://download.iobroker.net/list.html#sortCol=type&sortDir=0) by type.

## Useful Links

- [jsonConfig Documentation](adapterjsonconfig.md)
- [Object Schema Reference](objectsschema.md)
- [State Roles](stateroles.md)
- [Security Features for Adapter Developers](adaptersecurity.md)
- [Adapter Checker](https://adapter-check.iobroker.in/)
- [@iobroker/testing](https://github.com/ioBroker/testing) — unit and integration test harness
- [Create Adapter CLI](https://github.com/ioBroker/create-adapter)
- [Adapter Template (TypeScript)](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
- [Publishing Guide](adapterpublish.md)
- [Testing Guide](adaptertesting.md)
