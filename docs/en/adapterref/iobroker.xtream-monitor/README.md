# ioBroker.xtream-monitor

Monitors availability and account metadata of user-configured Xtream-compatible API endpoints.

The adapter is a monitoring tool only. It does **not** provide, discover, proxy, play, or distribute media streams. Users are responsible for the endpoints and services they configure.

## Features

- Monitor multiple endpoints in one adapter instance
- Online/offline and account status
- Response time
- Active and maximum connection counts
- Expiration date and days remaining
- Last check, last online and offline-since timestamps
- Error classification for timeout, DNS, HTTP, invalid response and inactive accounts
- Optional logging only when the online/offline state actually changes
- Summary states for VIS, Grafana and other ioBroker visualizations

## Requirements

- Node.js 22 or newer
- js-controller 7.0.7 or newer
- Admin 7.6.20 or newer

## Configuration

Add one or more endpoints in the adapter settings. Each row contains:

- **Enabled** - include the endpoint in monitoring
- **Name** - a user-friendly label
- **Host / Server URL** - base URL of the Xtream-compatible endpoint
- **Username** - account name
- **Password** - account password; the table configuration requests encrypted storage for this column

You can also configure the polling interval, request timeout and optional status-change logging.

Technical server IDs (`server1`, `server2`, ...) are managed internally and are not shown in the Admin UI.

## Object structure

```text
xtream-monitor.0
├── info
│   ├── connection
│   ├── allOnline
│   ├── enabledCount
│   ├── onlineCount
│   ├── offlineCount
│   └── lastCheck
└── servers
    ├── server1
    │   ├── online
    │   ├── status
    │   ├── responseMs
    │   ├── activeConnections
    │   ├── maxConnections
    │   ├── expiration
    │   ├── expirationText
    │   ├── daysRemaining
    │   ├── lastCheck
    │   ├── lastOnline
    │   ├── offlineSince
    │   └── errorType
    └── ...
```

## Privacy and security

- The adapter contacts only endpoints explicitly configured by the user.
- Credentials are never intentionally written to the ioBroker log.
- Password columns are configured for encrypted storage in the Admin table.
- The complete server configuration is protected from access by other adapters via `protectedNative`.
- No media content is fetched for monitoring; the adapter queries account/status metadata via the compatible API endpoint.

## Development

```bash
npm install
npm run build
npm run check
npm run lint
npm run test:package
npm run test:integration
```

Repository checks can be run with:

```bash
npx @iobroker/repochecker https://github.com/chrvidal/ioBroker.xtream-monitor main
```

## Changelog

### 0.2.11 (2026-09-11)

- Prevented request error states from exposing credentials.
- Added regression coverage for credential-safe request errors.
- Added Node.js 26 to the GitHub Actions test matrix.
### 0.2.10 (2026-09-02)

- Added a compatibility fallback for passwords affected by the ioBroker JSON Config table-encryption regression.
- Automatically remove stale server objects after the corresponding server is deleted from the configuration.
- Added regression tests for password compatibility and deleted-server cleanup.

### 0.2.9 (2026-09-01)

- Fixed startup handling during persistent server ID migration.
- Added regression coverage for password preservation and scheduled multi-server polling.
- Corrected protected configuration metadata for multi-server credentials.

### 0.2.8 (2026-08-31)

- Changed polling to schedule the next check only after the current cycle has finished, preventing overlapping API requests.
- Abort active HTTP requests during adapter unload for clean Compact Mode shutdown.
- Preserve `offlineSince` across adapter restarts while an endpoint remains offline.
- Added the explicit `info` channel and corrected per-server ioBroker state roles.
- Changed `expirationText` to a language-neutral ISO timestamp.
- Protected the configured server table from access by other adapters.
- Added integration tests with local mock API endpoints, including clean-shutdown behavior.

### 0.2.7 (2026-08-30)

- Fixed repository metadata reported by the ioBroker repository checker.
- Added valid `common.news` metadata for the current release.
- Relaxed the `@iobroker/testing` devDependency to a compatible semver range.
- Added Dependabot cooldown configuration.
- Added the required license copyright line.

### 0.2.6 (2026-08-30)

- Prepared repository metadata for ioBroker public repository review.
- Added all required metadata translations and Admin translations.
- Added a responsive Admin layout and table-level password encryption configuration.
- Added package and integration test scaffolding plus GitHub Actions CI.
- Replaced unmanaged JavaScript timers with ioBroker adapter-managed timers.
- Added adapter icon, Dependabot configuration and editor JSON schemas.

### 0.2.5 (2026-08-30)

- Removed the technical server ID column from the Admin UI while keeping persistent internal IDs.

### 0.2.4 (2026-08-30)

- Improved persistent internal server-ID assignment and Admin compatibility.

### 0.2.3 (2026-08-30)

- Fixed GitHub installation by including the compiled adapter entry point.

### 0.2.2 (2026-08-30)

- Simplified server-ID handling in the Admin UI.

### 0.2.1 (2026-08-30)

- Added automatic technical server IDs.

### 0.2.0 (2026-08-30)

- Added monitoring of multiple endpoints in one adapter instance.

## License

MIT License. See [LICENSE](https://github.com/chrvidal/ioBroker.xtream-monitor/blob/main/LICENSE).

Copyright (c) 2026 chrvidal