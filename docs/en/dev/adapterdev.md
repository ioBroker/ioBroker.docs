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
    my-adapter.png         # Adapter icon (256x256)
  src/
    main.ts                # Adapter entry point
    lib/                   # Your modules
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

        this.on('ready', () => this.onReady().catch(e => this.log.error(e.message)));
        this.on('stateChange', (id, state) => this.onStateChange(id, state));
        this.on('message', (obj) => this.onMessage(obj));
        this.on('unload', (callback) => this.onUnload(callback));
    }
}

if (require.main !== module) {
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new MyAdapter(options);
} else {
    (() => new MyAdapter())();
}
```

> **Critical:** Always wrap async handlers with `.catch()`. An unhandled rejection crashes the adapter with SIGKILL code 6 — no stack trace, restart loop.

## Lifecycle Events

### onReady

Called once when the adapter is initialized and configuration is loaded. This is your entry point.

```typescript
private async onReady(): Promise<void> {
    // Access configuration from admin UI
    const host = this.config.host;
    const port = this.config.port;

    // Set connection status
    await this.setState('info.connection', false, true);

    // Create objects, start polling, connect to devices...
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
await this.subscribeStates('*');           // All own states
await this.subscribeForeignStates('yr.*.forecast.html'); // Other adapters
```

### onUnload

Called when the adapter shuts down. **Must be synchronous** — no `async`/`await`. Call `callback()` immediately or the process gets killed.

```typescript
private onUnload(callback: () => void): void {
    try {
        // Clean up timers, connections, etc.
        // Use this.clearTimeout / this.clearInterval for adapter timers
    } catch { /* ignore */ }
    callback();
}
```

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

### Writing States

```typescript
await this.setState('device1.info.temperature', 21.5, true);  // ack=true: actual value from device
await this.setState('device1.power', false, false);             // ack=false: command to device
```

The `ack` flag is critical:
- `ack: true` — Status update ("the device reports this value")
- `ack: false` — Command ("please set this value")

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

| Role | Type | Description |
|------|------|-------------|
| `value.temperature` | number | Temperature reading |
| `switch` | boolean | On/off switch |
| `level.dimmer` | number | Dimmer 0-100% |
| `button` | boolean | Trigger (set to `true`) |
| `indicator.connected` | boolean | Connection status |
| `text` | string | Generic text |

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
        "extIcon": "https://cdn.jsdelivr.net/npm/iobroker.my-adapter/admin/my-adapter.png"
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

| Field | Purpose |
|-------|---------|
| `mode` | `daemon` (always running), `schedule` (cron-based), `once`, `none` |
| `type` | Adapter category (see [categories](#adapter-categories) below) |
| `connectionType` | `local` (direct) or `cloud` (internet required) |
| `dataSource` | `push`, `poll`, or `assumption` |
| `adminUI` | `{"config": "json"}` for jsonConfig |
| `tier` | Resource tier: 1 (low/polling), 2 (medium), 3 (high/always-on) |
| `compact` | `true` if adapter supports compact mode (shared process) |
| `messagebox` | `true` if adapter handles `sendTo()` messages |
| `encryptedNative` | Array of `native` field names that should be encrypted in the database |
| `protectedNative` | Array of `native` field names that should not be sent to the frontend |
| `instanceObjects` | Objects created automatically for each adapter instance |
| `dependencies` | Required js-controller and adapter versions |

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
- `protectedNative`: Values are never sent to the admin frontend.

When you add a field to `encryptedNative` in a new version, the js-controller handles encryption automatically when the user saves the configuration. No migration code needed.

### Instance Objects

Objects listed in `instanceObjects` are created automatically when an adapter instance is added. Use them for fixed structures like `info.connection`:

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
        "typescript": "~5.8.0"
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

```typescript
private async onReady(): Promise<void> {
    try {
        await this.connectToDevice();
        await this.setState('info.connection', true, true);
    } catch (e) {
        this.log.error(`Connection failed: ${e instanceof Error ? e.message : e}`);
        await this.setState('info.connection', false, true);
        // Retry with adapter timer
        this.setTimeout(() => this.onReady().catch(e =>
            this.log.error(e instanceof Error ? e.message : String(e))),
            30_000,
        );
    }
}
```

> Never let exceptions escape event handlers. Always catch at the top level.

## Versioning

Use [Semantic Versioning](https://semver.org/):

- **Patch** (0.0.x): Bug fixes
- **Minor** (0.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

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

| Category | Description |
|----------|-------------|
| `alarm` | Security systems |
| `climate-control` | Air conditioners, heaters |
| `communication` | Data provision for other adapters |
| `date-and-time` | Calendars, clocks |
| `energy` | Power monitoring, solar, inverters |
| `metering` | Water, gas, oil meters |
| `garden` | Lawn mowers, sprinklers |
| `general` | Admin, Web, Discovery |
| `geoposition` | Geolocation |
| `hardware` | Arduino, ESP, Bluetooth |
| `health` | Blood pressure, heart rate |
| `household` | Kitchen, vacuum cleaners |
| `infrastructure` | Network, NAS, printers |
| `iot-systems` | Other smart home systems |
| `lighting` | Lighting control |
| `logic` | Rules, scripts, parsers |
| `messaging` | Email, Telegram, push |
| `misc-data` | Data export/import |
| `multimedia` | TV, speakers, media |
| `network` | Ping, discovery, UPnP |
| `protocols` | MQTT, Modbus, KNX |
| `storage` | Databases, logging |
| `utility` | Backup, monitoring |
| `vehicle` | Cars, fleet |
| `visualization` | VIS, dashboards |
| `visualization-icons` | Icon packs |
| `visualization-widgets` | VIS widgets |
| `weather` | Weather, air quality |

## Useful Links

- [jsonConfig Documentation](adapterjsonconfig.md)
- [Object Schema Reference](objectsschema.md)
- [State Roles](stateroles.md)
- [Adapter Checker](https://adapter-check.iobroker.in/)
- [Create Adapter CLI](https://github.com/ioBroker/create-adapter)
- [Adapter Template (TypeScript)](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
- [Publishing Guide](adapterpublish.md)
- [Testing Guide](adaptertesting.md)
