---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0014: HomePod Transient Connection And Control Contract

- Status: accepted for implementation; management amended by ADR 0015; real-device validation pending
- Date: 2026-09-02

## Context

The adapter already classifies HomePod and HomePod mini AirPlay advertisements,
but exposes only the class discovery count and a transient Admin summary. The
maintainer currently has no HomePod hardware. The first implementation must
therefore be suitable for public volunteer testing without claiming that an
untested model or software version works.

The pinned `@basmilius/apple-sdk@0.13.4` exposes `HomePod` and `HomePodMini`
devices using AirPlay transient pairing. The SDK requires no PIN or durable
HomePod credential and provides push-driven state, playback, and volume
controllers. The mature `pyatv` reference independently describes HomePod
remote control over transient AirPlay pairing without stored credentials.

## Decision

Offer one manageable HomePod candidate only when one discovery scan provides
all of the following:

- an AirPlay service with the expected DNS-SD service type;
- a model matching `AudioAccessory<major>,<minor>`;
- one unambiguous normalized 12-character AirPlay device ID.

Create its individual object below `devices.homepod.<stableDeviceId>` and start
its transient session only after explicit active adoption under ADR 0015.

The public path uses lowercase hexadecimal. Display name, network address,
port, hostname, service ordering, and public key never determine the durable
object path. HomePod mini remains in the `homepod` class and is distinguished
only by its reported model.

HomePod connection uses automatic AirPlay transient pairing on every fresh
protocol session. It has no PIN flow and stores no HomePod credentials. Public
pairing states are read-only diagnostics: `pairing.mode` is `transient` and
`pairing.status` is `idle`, `pairing`, `paired`, or `error`.

The initial per-device read-only state contract is:

| State suffix              | Type    | Role                  | Meaning                                      |
| ------------------------- | ------- | --------------------- | -------------------------------------------- |
| `info.name`               | string  | `info.name`           | Latest display name                          |
| `info.type`               | string  | `text`                | Constant `homepod`                           |
| `info.model`              | string  | `info.hardware`       | Latest reported model                        |
| `info.deviceId`           | string  | `text`                | Stable normalized protocol ID                |
| `info.lastSeen`           | number  | `value.time`          | Last successful scan containing the HomePod  |
| `discovery.available`     | boolean | `indicator`           | Present in the latest successful scan        |
| `services.airplay`        | boolean | `indicator`           | AirPlay service advertised in that scan      |
| `services.raop`           | boolean | `indicator`           | Correlated RAOP service advertised           |
| `connection.state`        | string  | `text`                | Normalized connection lifecycle              |
| `connection.online`       | boolean | `indicator.connected` | Usable transient AirPlay session             |
| `connection.lastError`    | string  | `text`                | Stable project error code                    |
| `pairing.mode`            | string  | `text`                | Constant `transient`                         |
| `pairing.status`          | string  | `text`                | Non-secret transient-pairing phase           |
| `capabilities.playback`   | boolean | `indicator`           | Media-control protocol advertised and usable |
| `capabilities.nowPlaying` | boolean | `indicator`           | Push-state session usable                    |
| `capabilities.volume`     | boolean | `indicator`           | Volume state and control currently available |
| `nowPlaying.title`        | string  | `media.title`         | Current title or empty                       |
| `nowPlaying.artist`       | string  | `media.artist`        | Current artist or empty                      |
| `nowPlaying.album`        | string  | `media.album`         | Current album or empty                       |
| `nowPlaying.duration`     | number  | `value.interval`      | Duration in seconds                          |
| `nowPlaying.position`     | number  | `value.interval`      | Position in seconds                          |
| `nowPlaying.isPlaying`    | boolean | `media.state`         | Current playback flag                        |
| `volume.available`        | boolean | `indicator`           | Current volume availability                  |
| `volume.level`            | number  | `value` / `level.volume` | Volume from 0 through 100; writable only after volume capability |
| `volume.muted`            | boolean | `media.mute`          | Current mute state                           |
| `lastCommand.*`           | scalar  | existing result roles | Last accepted command and stable result      |

After the connected receiver reports unified media control or Hangdog remote
control, create boolean `button` states below `playback` for `play`, `pause`,
`playPause`, `stop`, `next`, and `previous`. After volume becomes available,
make `volume.level` and `volume.muted` writable. Incoming commands use
`ack=false`; confirmed state and command-result writes use `ack=true`.
Commands are serialized per HomePod and re-check current connection and
capability before dispatch. Numeric volume writes are finite values from 0
through 100 and are converted to the SDK range 0 through 1. Boolean mute writes
map explicitly to mute or unmute.

Retain active managed HomePod object roots when a later successful discovery
does not contain them. Mark discovery, connection, pairing, services, and
capabilities unavailable and clear transient Now Playing state. A failed
discovery does not erase the previous successful observation. Reappearance
refreshes the non-durable endpoint and starts a new transient session. Passive
or deleted devices have no individual root or session. Unexpected connection
loss waits for the next bounded discovery/reconnect cycle; unload cancels
discovery, commands no further work, removes listeners, and disconnects every
session.

Debug logging records sanitized lifecycle stages, a shortened device reference,
reported model, service presence, pairing phase, capability booleans, command
name, normalized non-content state, and stable error code/error class. It must
not record names, addresses, ports, hostnames, TXT records, raw discovery
objects, URLs, PINs, credentials, tokens, keys, artwork, titles, artists,
albums, or raw upstream errors.

## Consequences

Public testers can validate discovery, automatic transient pairing, connection,
push state, playback commands, and volume without receiving or handling a
HomePod secret. Stable object paths survive rename, DHCP, port changes, adapter
restart, and temporary absence.

The implementation is deliberately an unverified preview. It must not be
described as hardware-compatible until a result is recorded with HomePod model,
software version, discovery evidence, connection outcome, each command, event
updates, reconnect, restart, and unload cleanup. Artwork, direct audio
streaming, stereo-pair semantics, multi-room grouping, alarms, intercom, Siri,
and Home settings remain outside this contract.

## Alternatives Considered

- Reusing the Apple TV PIN credential flow was rejected because HomePod uses a
  transient session and the SDK ignores durable credentials for it.
- Creating device objects from model or display name alone was rejected because
  neither is a durable identity.
- Exposing every SDK controller method was rejected because the public contract
  must remain small, capability-gated, and testable by volunteers.
- Waiting for locally owned hardware was rejected for this milestone because a
  conservative unverified preview plus public test matrix is the chosen route.

## Validation

Unit and adapter tests must cover strong identity, class exclusion, transient
connection without credential persistence, capability-gated objects, push
projection, command serialization, volume validation, normalized errors,
redacted diagnostics, rediscovery, absence, restart defaults, and unload. The
full quality gate and supported Node.js matrix are required before a release
candidate. Real HomePod validation remains explicitly pending.