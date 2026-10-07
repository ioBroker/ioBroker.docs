---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# Technical Architecture

Status: initial boundary definition; concrete APIs remain subject to PoC results.

## Core Rule

ioBroker is the platform boundary. Apple protocols and external services are
adapters behind internal interfaces; the ioBroker state tree is a versioned
projection of the normalized domain model, not a direct dump of protocol
objects.

## Layers

```text
ioBroker lifecycle / configuration / objects / messages
                         |
application services: registry, commands, scenes, player facade
                         |
domain contracts: device, capability, source, player, output, group
                /                         \
local device backends                 cloud services
Apple TV / HomePod / AirPlay          Apple Music / future Alexa
                \                         /
        upstream protocol and API clients
```

Dependencies point inward toward domain contracts. Protocol packages must not
write ioBroker states directly, and state handlers must not call low-level
protocol methods directly.

## Planned Modules

- `adapter`: ioBroker lifecycle, configuration, subscriptions, object creation,
  unload, and messages.
- `domain`: stable types, capability vocabulary, normalized metadata, errors,
  and command/result contracts.
- `registry`: device identity, discovered protocol services, configured devices,
  players, outputs, and groups.
- `backends/apple`: facade around Apple SDK/protocol packages, pairing, service
  health, reconnect, and event normalization.
- `sources`: URL, file, radio, TTS artifact, and Apple Music references.
- `providers`: optional external channel and content catalogs, isolated by
  provider and kept separate from playback capability claims.
- `players`: backend-neutral playback contract and routing/resolution.
- `commands`: validation, capability checks, serialization per target, dispatch,
  timeout, and result reporting.
- `scenes`: declarative scene validation and bounded execution.
- `music`: developer/user authorization, Apple Music API client, pagination,
  caching, and normalized results.
- `objects`: definitions and idempotent reconciliation of ioBroker objects and
  states.
- `security`: secret redaction and credential persistence abstraction.
- `platform`: narrow ioBroker-owned services, including the injected timer
  scheduler used by runtime and protocol components.

These are responsibility boundaries, not a mandatory folder tree until the
current ioBroker generator creates the base project.

## Public Namespace Hierarchy

The reserved top-level object layout separates physical endpoints, logical
players, orchestration, and content services:

```text
apple.<instance>
├── info
├── devices
│   ├── appletv.<stableDeviceId>
│   ├── homepod.<stableDeviceId>
│   └── airplayReceiver.<stableDeviceId>
├── players
├── groups
├── commands
├── scenes
└── music
```

All three device-class folders expose an `info.deviceCount` summary from the
latest successful discovery. Apple TV receives its paired control contract.
Generic AirPlay Receivers with a durable 12-character AirPlay or RAOP device ID
can be explicitly adopted into the read-only discovery and advertised-service
contract from ADR 0013; weakly identified receivers remain count/Admin
observations only. HomePods with a validated AirPlay service,
`AudioAccessory` model, and durable 12-character AirPlay device ID can be
explicitly adopted into the transient control contract from ADR 0014. Apple TV
and HomePod take classification precedence over the generic AirPlay receiver
class so one endpoint never appears twice. Stable technical IDs remain object
segments, while `common.name` provides readable labels such as `AppleTV Living
Room` or `HomePod Office`.

The Admin inventory distinguishes the latest transient discovery snapshot from
durable device management. It may show redacted discovery name and model for all
three classes. A paired Apple TV is active by default; only active pairings may
connect and project an individual tree. Passive pairings retain credentials but
are disconnected and have no individual tree. HomePods and AirPlay Receivers
require explicit adoption, move out of the candidate list when adopted, and
receive a tree only while active. Passive records retain their Admin identity;
delete removes local management and lets a still-visible target return as a
candidate. ADRs 0011 and 0015 define these contracts.

The Apple TV Admin inventory is rendered by a source-controlled custom JSON
Config component. It consumes only the adapter's non-secret message API and
keeps a PIN exclusively in browser memory. The component does not access the
credential store, protocol backend, or ioBroker object tree directly. All
custom configuration components use GUI API generation 2 and require Admin 8;
ADRs 0012 and 0017 define the table and compatibility boundaries.

HomePod has no durable pairing credential. Its non-secret adoption and
enablement record is stored separately from Apple TV credentials. Every active,
strongly identified current target owns one automatic transient AirPlay
session. Playback and volume writes are projected only after the session reports
their owning capability. Active learned roots survive absence with safe
unavailable defaults so scripts keep stable bindings; passive and deleted roots
are removed.

`music` is reserved for Apple Music authorization status, catalog, library,
playlists, recommendations, and search projections. It is a content-service
namespace, never a device class. Tokens and other secrets are not public
objects. ADR 0010 defines the hierarchy and the initial path migration.

## Device And Protocol Lifecycle

One logical device may expose AirPlay, Companion Link, and RAOP services with
different identifiers, hostnames, ports, and health. The registry correlates
them using evidence such as stable protocol ID, MAC/device ID, service
properties, and explicit user confirmation. IP address alone is never durable
identity.

The generic-receiver slice accepts only a normalized 12-character AirPlay or
RAOP device identifier for durable public identity. A public key may correlate
services within a scan but does not by itself create a durable object. Receiver
availability means presence in a successful discovery scan, not a connected or
tested audio session.

Each protocol session has an explicit lifecycle:

```text
unknown -> discovered -> pairingRequired -> connecting -> online
                    \                     /           |
                     -> unavailable <----             |
                          |                            |
                          +------ recovering <---------+
```

User-initiated unload/removal is distinct from an unexpected disconnect and
must never schedule a reconnect.

## Event And State Flow

```text
protocol event
  -> backend normalization
  -> domain snapshot/event
  -> capability-aware state projection
  -> ioBroker state with ack=true
  -> automation/visualization
```

Writable state flow:

```text
ioBroker state with ack=false
  -> parse and validate
  -> typed command
  -> capability and target check
  -> serialized backend execution
  -> structured result
  -> confirmed states/result with ack=true
```

Protocol events are authoritative. Optimistic state changes are used only when
the protocol cannot confirm an operation and are marked as assumptions.

## Generic Command Contract

The internal command envelope is conceptually:

```json
{
	"version": 1,
	"requestId": "caller-generated-id",
	"target": "player-or-device-id",
	"command": "launchApp",
	"parameters": {
		"bundleId": "com.apple.Music"
	}
}
```

The result contains request ID, target, command, start/end time, status, and a
stable error code. Secrets and raw upstream exceptions are not returned.
Duplicate request IDs may be rejected or treated idempotently; the final policy
requires an ADR before the endpoint is frozen.

## Scene Execution

Scenes are declarative configuration. A scene executor validates the complete
scene before running it, resolves targets at execution time, and records one
result per step. Required controls include total duration, maximum delay,
maximum steps, cancellation, target locking, and a defined stop/continue policy
on failure.

Arbitrary JavaScript, shell commands, dynamic imports, or direct ioBroker object
writes are not valid scene steps.

## Apple Music Separation

Apple Music API resources become normalized source references. A playback
resolver asks a player backend whether it can handle that reference. Possible
strategies may include launching/searching an app on Apple TV or asking a future
Alexa backend to play the item. AirPlay streaming is used only when a lawful,
technically available audio source already exists; it is not manufactured from
Apple Music API metadata.

The public `music` namespace is reserved now, but no empty objects or speculative
state schemas are created before the Apple Music authorization and data
contracts are accepted by a dedicated ADR.

## Persistence

Three classes of data are separate:

- public runtime state: connection, metadata, progress, capabilities, results;
- durable non-secret configuration: device enablement, names, groups, scenes,
  preferences;
- secrets: pairing credentials and service tokens.

Apple TV enablement is stored separately from credentials as a versioned,
owner-only, atomic instance-data file containing only explicitly disabled device
IDs. Absence means active, so pairings created by older versions migrate without
rewriting the credential database. Pairing secrets remain in their separately
encrypted credential store. Explicitly adopted HomePods and AirPlay Receivers
use the separate owner-only atomic `managed-devices.v1.json` inventory containing
class, stable ID, fallback name/model, and enablement only. ADRs 0006, 0011, and
0015 define these formats and cleanup behavior.

## Testing Boundaries

- Domain, commands, scenes, normalization, and object projection are unit tested
  without network devices.
- Backend tests use recorded/synthetic protocol objects only when licenses and
  privacy permit.
- Adapter integration tests verify startup, object creation, state changes,
  messages, unload, and compact mode.
- Real-device tests verify reverse-engineered protocols and are recorded in a
  compatibility matrix; they are not expected to run in public CI.
- Contract fixtures contain neutral generated data only.

## Open Architecture Decisions

- exact credential encryption and storage mechanism;
- CommonJS versus ESM adapter output after generator and SDK compatibility PoC;
- frozen object tree and generic command schema;
- streaming process/resource limits and FFmpeg policy;
- external-provider API, authorization, deep-link, and lifecycle policy;
- multi-room group ownership and synchronization semantics;
- Apple Music authorization flow suitable for ioBroker Admin;
- direct future Alexa backend versus a separate adapter integration.