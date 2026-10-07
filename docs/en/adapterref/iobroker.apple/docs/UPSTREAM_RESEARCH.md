---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# Upstream Source Assessment

Research snapshot: 2026-08-31. Revalidate versions and behavior before adopting
or updating a dependency.

ioBroker prior-art revalidation: 2026-09-03. Revalidate the repository,
registry, and request status before submitting this adapter to an official
ioBroker repository.

HomePod API revalidation: 2026-09-02. The accepted npm pin remains `0.13.4`;
no dependency update was made. The installed declarations and upstream project
documentation both expose `HomePod`/`HomePodMini` automatic transient pairing,
push state, playback, and volume. `pyatv` independently documents HomePod remote
control through transient AirPlay pairing. These API observations justify an
unverified implementation preview, not a hardware compatibility claim; see ADR 0014.

## Summary

| Source                                    | Reviewed snapshot                         | License          | Role in this project                                                         |
| ----------------------------------------- | ----------------------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `h2okopfmt/ioBroker.apple-tv`             | commit `eb7e8a5` (2026-02-22)             | MIT              | Paused, unpublished ioBroker draft; prior-art review only                    |
| ioBroker AdapterRequests issue 909        | open as of 2026-09-03                     | n/a              | Records demand for Apple TV media information in visualizations              |
| `basmilius/apple-protocols`               | source commit `5e41636`; npm SDK `0.13.4` | MIT              | Preferred TypeScript protocol basis, behind our facade                       |
| `basmilius/homey-apple`                   | commit `04f51a6`, tag `v1.8.0`            | GPL-3.0          | Behavioral/lifecycle reference only; do not copy code                        |
| `postlund/pyatv`                          | commit `b277a4c`, release `0.18.0`        | MIT              | Mature protocol and feature reference; no default sidecar                    |
| `BewhiskeredBard/homebridge-alexa-player` | commit `33a5248` (2023)                   | MIT              | Historical Alexa reference only; insufficient proof for Apple Music playback |
| Apple Music API / MusicKit                | official current documentation            | Apple terms      | Official catalog and subscriber-data interface                               |
| ioBroker creator/repository docs          | official current documentation            | project-specific | Skeleton, testing, metadata, and publication requirements                    |

## Existing ioBroker Landscape

The 2026-09-03 review covered GitHub repositories, the npm registry, the
official ioBroker latest and stable repository lists, ioBroker
`AdapterRequests`, and a focused ioBroker forum search.

### `h2okopfmt/ioBroker.apple-tv`

The public MIT-licensed repository is the closest known prior ioBroker effort.
Its README currently states that development is unfinished and paused. The
reviewed default-branch snapshot contains a substantial JavaScript draft, but
no test directory or GitHub Actions workflow, and it is not published as
`iobroker.apple-tv` on npm or listed in the official ioBroker latest/stable
repositories.

Its implementation direction also differs materially from this project. It
supports interchangeable `pyatv` and `node-appletv-x` backends, can install
Python/system packages from adapter runtime, includes provider-specific TV
streaming integrations, and permits address-based device identity fallback.
This project instead uses a TypeScript-only default runtime, pins the selected
protocol SDK behind project-owned interfaces, never installs system packages
at runtime, derives durable identity from protocol evidence, stores pairing
credentials in an encrypted instance-scoped store, and treats the ioBroker
object model as a tested public contract.

Contributing the intended unified Apple media design to that draft would
require replacing its adapter identity, public contract, dependency/runtime
model, persistence, and large parts of its architecture rather than completing
an aligned implementation incrementally. Maintaining the independent
`ioBroker.apple` project is therefore justified. No source from
`h2okopfmt/ioBroker.apple-tv` has been copied, adapted, translated, or vendored;
the repository was reviewed only to assess overlap and provenance.

Source: https://github.com/h2okopfmt/ioBroker.apple-tv

### Requests and adjacent adapters

Open AdapterRequests issue 909 asks for Apple TV media information for ioBroker
visualizations. Its requested metadata use case overlaps the planned and
partially implemented Now Playing contract and provides relevant demand
evidence; it does not define an implementation or an existing adapter to
extend. The request should be revisited when this repository is ready for
public testing.

Published packages such as `iobroker.apple-device-finder` and `iobroker.icloud`
cover iCloud/Find My identity and location use cases, not local Apple TV media
discovery, pairing, control, or HomePod/AirPlay orchestration. The separately
published `@sebbo2002/pyatv-mqtt-bridge` exposes pyatv through MQTT and is not an
ioBroker adapter or a replacement for a native tested object contract.

The official ioBroker latest/stable repository lists contained no Apple TV
media adapter during this review. A focused forum API search did not identify a
dedicated current support or testing thread for one. These findings justify
continuing this project independently, but they are time-sensitive rather than
proof that no other effort exists.

Sources:

- https://github.com/ioBroker/AdapterRequests/issues/909
- https://www.npmjs.com/package/iobroker.apple-device-finder
- https://www.npmjs.com/package/iobroker.icloud
- https://www.npmjs.com/package/@sebbo2002/pyatv-mqtt-bridge
- https://github.com/ioBroker/ioBroker.repositories
- https://forum.iobroker.net/

## `basmilius/apple-protocols`

The monorepo contains separate packages for encoding, encryption, common
discovery/pairing/storage, RTSP, AirPlay, Companion Link, RAOP, audio sources,
and a high-level SDK. The SDK exposes Apple TV and HomePod device classes plus
controllers for remote input, playback, volume, media, state, artwork,
multi-room, apps, accounts, power, keyboard, and system functions.

Confirmed strengths:

- TypeScript/Node implementation with ESM npm packages;
- AirPlay and Companion discovery and HAP-based pairing;
- Apple TV and transient HomePod connection flows;
- typed push events for Now Playing, playback, volume, artwork, active app,
  supported commands, and cluster changes;
- controllers for the main planned feature set;
- local audio-source abstractions and RAOP/AirPlay streaming;
- MIT license and published npm packages.

Findings that affect our design:

- npm `@basmilius/apple-sdk@0.13.4` is ESM-only and declares no Node.js engine
  range. Dynamic import from compiled CommonJS and isolated local discovery
  passed on Node 22.23.2 and 24.20.0 on macOS and on Node 22.23.2 on Linux
  `aarch64`. ADR 0007 adopts it and `@basmilius/apple-common@0.13.4` as exact
  version 0.1 runtime dependencies; full ioBroker runtime behavior remains a
  release validation gate.
- The published SDK tarball declares MIT but omits its `LICENSE` file. The
  pulled `apple-rtsp` artifact does as well. `THIRD_PARTY_NOTICES.md` records
  this artifact caveat and is included in the package; dependency updates
  require a new license review.
- The reviewed source branch uses release-time placeholder version `0.0.0` in
  workspace packages; npm version is the adoption reference.
- SDK discovery queries AirPlay and Companion Link and correlates results by IP
  address. IP is not stable enough for our persistent device identity.
- `DiscoveredDevice.services` includes RAOP, but the reviewed SDK `discover()`
  implementation does not populate RAOP results.
- The SDK discovery API has no timeout or `AbortSignal`. It performs sequential
  AirPlay and Companion Link scans of about four seconds each. The disposable
  PoC worker can be terminated safely, but that does not prove direct adapter
  unload cleanup.
- The low-level `Discovery.discoverAll()` performs one parallel four-second
  query for AirPlay, Companion Link, and RAOP. Its collector can also return
  unrelated mDNS services, and the upstream merge uses each service instance
  name as its ID. Our PoC therefore validates the actual DNS-SD type, drops
  empty/unrelated results, and performs its own correlation.
- On the reviewed Apple TV result, protocol metadata provided matching identity
  evidence across the AirPlay device ID, Companion pairing identity, RAOP
  instance prefix, and AirPlay/RAOP public key. The project-owned correlation
  uses those values internally and never uses IP address or display name as
  durable identity.
- `createDevice()` falls back to `HomePod` for unknown device types. Our adapter
  must classify explicitly and reject/represent unknown devices safely.
- The SDK exposes a global `storage` configuration and storage classes, but the
  reviewed high-level pairing/connect flow does not automatically load/save
  credentials through it. The adapter owns explicit persistence.
- Recovery option types and a generic `ConnectionRecovery` utility exist, but
  the high-level device connect flow does not make recovery an end-to-end
  guarantee. The adapter owns re-discovery and reconnect orchestration.
- Apple TV AirPlay and optional Companion Link have distinct health. Companion
  failure is caught as optional during connect, so our public online/degraded
  model must not collapse both protocols into one boolean.
- Multi-room methods exist, but group discovery, output UID stability, timing,
  synchronization, failure recovery, and mixed receivers still require a
  real-device PoC.

Adoption rule: wrap the SDK in our own narrow backend interface. Do not expose
SDK types in the ioBroker object contract or throughout application services.

The recorded discovery checkpoint found local candidates on macOS but varied
between 9 and 12 candidates across five runs, classified most as `unknown`, and
returned no RAOP service. See `docs/poc/apple-sdk-discovery-0.13.4.md`. These
results were reproduced on a Linux aarch64 test host, where candidate and
service counts also varied and Apple TV classification was intermittent. This
is a partial pass only and does not justify runtime adoption.

The subsequent project-owned low-level path passed ten consecutive Linux
aarch64 scans across one- and two-Apple-TV configurations. One tested Apple TV also passed
PIN pairing, owner-only PoC credential persistence, new-process reload, five
fresh AirPlay-plus-Companion reconnects, minimized status reads, one remote HID
command, pushed power/Now Playing/active-app events, and process cleanup. The
17-test suite plus real credential reload also passed on Linux `aarch64` under
Node.js 24. A third available Apple TV, additional media-event types,
unexpected-loss recovery, real address/port changes, and direct adapter-unload
cleanup remain unverified. These results accept the narrow Apple TV vertical
slice but do not justify exposing SDK behavior directly as the public adapter
contract.

Source: https://github.com/basmilius/apple-protocols

## `basmilius/homey-apple`

This is the most relevant example of embedding the TypeScript SDK in a smart
home runtime. Its source demonstrates patterns we need to reproduce in our own
implementation:

- platform discovery plus unicast re-discovery;
- correlation by stored MAC when mDNS identifiers or caches change;
- step-based PIN pairing and explicit credential serialization;
- independent AirPlay and Companion Link recovery;
- bounded fast recovery followed by slower retries;
- event forwarding into platform capabilities;
- cleanup of recovery timers, protocol sessions, and event logic on unload.

The repository is GPL-3.0. We may study observable behavior and architecture,
but must not copy its implementation into a differently licensed adapter
without an explicit compatible licensing decision.

Source: https://github.com/basmilius/homey-apple

## `postlund/pyatv`

`pyatv` is the mature comparison baseline. It models multiple services per
device, relies on Zeroconf because addresses and ports can change, persists
per-protocol credentials, selects an appropriate protocol per feature, and
exposes listener/push-updater interfaces.

Its supported protocol model and tests are valuable when validating discovery,
pairing, feature availability, output devices, AirPlay/RAOP streaming, and
metadata semantics. Python is not selected for our runtime: a sidecar adds
installation, lifecycle, IPC, update, security, and compact-mode costs. It
remains a fallback only if a documented TypeScript gap blocks a required
milestone.

Source: https://github.com/postlund/pyatv

## Alexa References

The reviewed `homebridge-alexa-player` source is old, explicitly pre-1.0, and
uses `alexa-remote2` with cookie/proxy authentication. It supports basic player
operations and declares a `playMusicProvider` API, but its own implementation
does not prove reliable targeted Apple Music search/playback on Echo Show.

Consequences:

- Alexa remains a future backend behind the generic player interface.
- Authentication/cookie security, Amazon changes, provider IDs, request
  semantics, account region, and Echo Show behavior need a new isolated spike.
- No Alexa dependency enters the Apple-device core.
- A separate adapter integration may be preferable to embedding unofficial
  Amazon web APIs; decide by ADR after the spike.

Source: https://github.com/BewhiskeredBard/homebridge-alexa-player

## Apple Music API And MusicKit

Official documentation confirms that subscriber-specific requests require a
Music User Token in addition to a developer token. Recently played and
recommendation endpoints are available subject to authorization and resource
type rules. MusicKit manages Music User Tokens for supported Apple/web app
flows.

The APIs return catalog, library, history, recommendation, and artwork metadata;
they do not create a general DRM-free audio stream for forwarding over AirPlay.
Authorization, catalog browsing, and playback routing therefore remain separate
modules.

Sources:

- https://developer.apple.com/documentation/applemusicapi
- https://developer.apple.com/documentation/applemusicapi/user-authentication-for-musickit
- https://developer.apple.com/documentation/musickit

## ioBroker Baseline

Official ioBroker guidance requires using the current adapter creator rather
than copying an old adapter. Public repository inclusion requires correct
repository/npm naming, Admin configuration, an English README, a license, valid
state roles, package and integration testing in GitHub Actions, npm publication,
and Adapter Checker compliance.

The current js-controller compatibility documentation supports Node 22 and 24
in the relevant modern controller lines. Our exact minimum is frozen only after
the SDK PoC and generated-template review.

Sources:

- https://github.com/ioBroker/create-adapter
- https://github.com/ioBroker/ioBroker.repositories
- https://github.com/ioBroker/ioBroker.js-controller

## Required Proofs Before Dependency Adoption

1. Install published SDK packages in a generated ioBroker adapter.
2. Build and start under Node.js 22 and 24 on Linux.
3. Verify ESM import/bundling and npm package contents.
4. Discover one Apple TV repeatedly across restart and address/port changes.
5. Pair, serialize, encrypt/persist, reload, and reconnect credentials.
6. Verify explicit AirPlay and Companion Link health and cleanup.
7. Exercise representative commands and push events.
8. Verify no listeners, sockets, timers, timing servers, or streams survive
   unload.
9. Record upstream versions and real-device/OS details in the compatibility
   matrix.