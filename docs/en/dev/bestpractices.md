---
lastChanged: 2026.05.18
---
# Adapter Best Practices

Proven patterns for building reliable ioBroker adapters.

## Error Handling

### Wrap Async Event Handlers

The adapter class fires events synchronously. If an async handler throws an unhandled rejection, the js-controller kills the process with SIGKILL — no stack trace, no graceful shutdown.

```typescript
// WRONG — unhandled rejection if onReady throws
this.on('ready', this.onReady.bind(this));

// CORRECT — catch and log
this.on('ready', () => this.onReady().catch(e => this.log.error(e.message)));
this.on('message', (obj) => this.onMessage(obj).catch(e => this.log.error(e.message)));
```

### Keep onUnload Synchronous

`onUnload` has a strict timeout. Never use `async`/`await` in it. Fire cleanup calls without waiting and call `callback()` immediately:

```typescript
private onUnload(callback: () => void): void {
    try {
        void this.setState('info.connection', false, true);
    } catch { /* ignore */ }
    callback();
}
```

### Validate External Data

Data from APIs, devices, and protocols can be anything. Always validate before using:

```typescript
// WRONG — crashes if response.temperature is undefined
const temp = response.temperature.toFixed(1);

// CORRECT — type guard first
const raw = response?.temperature;
const temp = typeof raw === 'number' && Number.isFinite(raw) ? raw : null;
```

## Timers

### Use Adapter Timers

Always use `this.setTimeout()` and `this.setInterval()` instead of Node.js globals. The adapter clears them automatically on shutdown — preventing stale callbacks after unload.

```typescript
this.setInterval(() => this.poll(), 30_000);
this.setTimeout(() => this.retry(), 10_000);
```

### Avoid Tight Polling

Cloud APIs have rate limits. Even local devices can be overwhelmed:

- **Cloud APIs**: 5-10 seconds minimum between calls
- **Local LAN devices**: 1-5 seconds depending on device capability
- **Polling results**: Log at `debug` level, not `info`

## Object and State Management

### Create Parent Objects First

Every object path must have a parent. If you create `device1.sensor.temperature`, first create `device1` (device) and `device1.sensor` (channel):

```typescript
await this.setObjectNotExistsAsync('device1', {
    type: 'device', common: { name: 'Device 1' }, native: {},
});
await this.setObjectNotExistsAsync('device1.sensor', {
    type: 'channel', common: { name: 'Sensors' }, native: {},
});
await this.setObjectNotExistsAsync('device1.sensor.temperature', {
    type: 'state',
    common: { name: 'Temperature', type: 'number', role: 'value.temperature', read: true, write: false },
    native: {},
});
```

### Use Static instanceObjects

For objects that every instance needs (like `info.connection`), define them in `instanceObjects` in `io-package.json` instead of creating them in code. The js-controller creates them automatically.

### Respect the ack Flag

- Set `ack: true` when reporting the actual device state
- Set `ack: false` when issuing a command
- In `onStateChange`, ignore states with `ack: true` — they are confirmations, not commands

```typescript
private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
    if (!state || state.ack) return; // Only react to commands
    // Handle the command...
}
```

### Clean Up Deleted Devices

When a device is removed, delete its entire object tree:

```typescript
private async deleteDevice(deviceId: string): Promise<void> {
    const objects = await this.getObjectListAsync({
        startkey: `${this.namespace}.${deviceId}.`,
        endkey: `${this.namespace}.${deviceId}.香`,
    });
    for (const { id } of objects?.rows ?? []) {
        await this.delObjectAsync(id);
    }
    await this.delObjectAsync(deviceId);
}
```

## Configuration

### Encrypt Sensitive Data

Passwords, API keys, and tokens must be listed in both `encryptedNative` and `protectedNative` in `io-package.json`:

```json
{
    "native": { "apiKey": "", "password": "" },
    "encryptedNative": ["apiKey", "password"],
    "protectedNative": ["apiKey", "password"]
}
```

- `encryptedNative`: Encrypted at rest in the database, decrypted automatically in `this.config`
- `protectedNative`: Never sent to the browser (admin frontend)

> `encryptedNative` must be at the root level of io-package.json, not inside `common`.

### No Migration Code for Schema Changes

When adding new fields to `encryptedNative` or changing `instanceObjects`, the js-controller handles migration automatically when the user saves the configuration or restarts. Don't write migration code in the adapter — it adds complexity and is a common source of bugs.

## Logging

### Log Strategy

| Situation | Level |
|-----------|-------|
| Routine polling results | `debug` |
| First occurrence of an error | `warn` or `error` |
| Repeated same error | `debug` |
| Recovery after error | `info` (once) |
| Raw protocol data | `silly` |
| Configuration loaded, connection established | `info` |

### All Logs in English

Log messages are for debugging by developers and support. Keep them in English regardless of the user's system language. User-facing text (state names, descriptions, UI labels) should use translation objects.

### Don't Log Sensitive Data

Never log passwords, API keys, tokens, or personal data — even at debug level.

## Performance

### Batch State Updates

If you update many states at once, avoid creating individual log entries for each:

```typescript
// Update all states, log summary
for (const [key, value] of Object.entries(deviceData)) {
    await this.setState(`${deviceId}.${key}`, value, true);
}
this.log.debug(`Updated ${Object.keys(deviceData).length} states for ${deviceId}`);
```

### Use setObjectNotExists

When creating objects on every adapter start, use `setObjectNotExistsAsync` to avoid unnecessary write operations:

```typescript
// Only writes if the object doesn't exist yet
await this.setObjectNotExistsAsync('myState', { ... });
```

Use `extendObjectAsync` when you need to update specific fields without overwriting the entire object.

## Connection Handling

### Report Connection Status

If your adapter connects to a device or service, maintain `info.connection`:

```typescript
await this.setState('info.connection', true, true);   // Connected
await this.setState('info.connection', false, true);   // Disconnected
```

### Implement Reconnection

Connections fail. Implement automatic retry with backoff:

```typescript
private reconnectTimer: ioBroker.Timeout | null = null;

private scheduleReconnect(delaySec: number): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = this.setTimeout(() => {
        this.reconnectTimer = null;
        this.connect().catch(e => {
            this.log.debug(`Reconnect failed: ${e.message}`);
            this.scheduleReconnect(Math.min(delaySec * 2, 300));
        });
    }, delaySec * 1000);
}
```

## Code Organization

### Keep main.ts Thin

The adapter class in `main.ts` should handle lifecycle events and delegate to modules in `lib/`:

```
src/
  main.ts              # Adapter class, event wiring
  lib/
    api-client.ts      # HTTP/MQTT/WebSocket client
    parser.ts          # Data transformation
    coerce.ts          # Input validation helpers
    i18n-states.ts     # State name translations
```

### Extract Pure Functions

Logic that doesn't need adapter access should be in standalone functions. They are easier to test and reuse:

```typescript
// Pure — easy to test
export function parseApiResponse(raw: unknown): DeviceState | null { ... }

// Adapter-dependent — harder to test
private async updateDeviceState(): Promise<void> {
    const raw = await this.apiClient.fetch();
    const state = parseApiResponse(raw);
    if (state) await this.setState('device.state', state.value, true);
}
```

## Release Checklist

Before every release:

1. `npm run lint` passes with zero warnings
2. `npm test` passes
3. `npm run build` succeeds
4. Version numbers match in `package.json` and `io-package.json`
5. `common.news` in `io-package.json` has max 7 entries
6. Changelog is updated
7. No sensitive data in committed files
