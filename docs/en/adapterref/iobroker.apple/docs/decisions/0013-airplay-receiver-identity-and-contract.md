---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0013: AirPlay Receiver Identity And Read-Only Contract

- Status: accepted; projection ownership amended by ADR 0015
- Date: 2026-09-01

## Context

Generic AirPlay Receiver discovery already classifies Macs in receiver mode,
AirPort Express devices, compatible speakers, smart TVs, and AV receivers, but
it exposes only a class count and transient Admin text. Names, addresses, ports,
and DNS-SD instance names can change and therefore cannot own durable ioBroker
object paths. The current SDK evidence also does not justify claiming that the
adapter can stream to or control every advertised receiver.

The adapter needs a stable first device contract that improves inventory and
external bindings without freezing speculative playback, pairing, volume, or
transport semantics.

## Decision

Create one individual read-only object below
`devices.airplayReceiver.<stableDeviceId>` only when discovery provides a
normalized 12-character protocol device ID and the user has explicitly adopted
the device as active per ADR 0015. The ID comes from AirPlay TXT
`deviceid` or the leading device ID of a RAOP service instance. The public path
uses lowercase hexadecimal; `info.deviceId` exposes the normalized uppercase
value.

Never derive a public device path from display name, model, IP address, port,
hostname, FQDN, service-instance suffix, discovery ordering, or public key
alone. A public key may correlate AirPlay and RAOP observations within one scan,
but it does not by itself authorize a durable device object. Weakly identified
receivers remain included in the class discovery count and Admin snapshot.

Classification remains exclusive: Apple TV first, HomePod second, then generic
AirPlay Receiver. A protocol device ID claimed by a recognized Apple TV or
HomePod must not also create a generic receiver object. Correlated AirPlay and
RAOP services produce one generic receiver.

The initial per-device state contract is:

| State suffix          | Type    | Role            | Read | Write | Meaning                                        |
| --------------------- | ------- | --------------- | ---- | ----- | ---------------------------------------------- |
| `info.name`           | string  | `info.name`     | yes  | no    | Latest display name                            |
| `info.type`           | string  | `text`          | yes  | no    | Constant `airplayReceiver`                     |
| `info.model`          | string  | `info.hardware` | yes  | no    | Latest reported model or empty                 |
| `info.deviceId`       | string  | `text`          | yes  | no    | Stable normalized protocol ID                  |
| `info.lastSeen`       | number  | `value.time`    | yes  | no    | Last successful scan containing the receiver   |
| `discovery.available` | boolean | `indicator`     | yes  | no    | Present in the latest successful complete scan |
| `services.airplay`    | boolean | `indicator`     | yes  | no    | AirPlay service advertised in that scan        |
| `services.raop`       | boolean | `indicator`     | yes  | no    | RAOP service advertised in that scan           |

Every projection write uses `ack=true`. The contract exposes no writable state,
credential, network endpoint, TXT record, raw feature bitfield, or upstream SDK
type. Advertised service presence is discovery evidence, not proof of a usable
protocol session or successful audio playback.

Active managed receiver objects remain in the object tree when a later
successful scan no longer contains them. They are marked unavailable, their
advertised-service flags become false, and `lastSeen` remains unchanged.
Startup applies the same safe unavailable defaults before the first scan. A
failed scan does not erase a previous successful observation. Passive and
explicitly deleted devices have no individual object tree; a still-visible
deleted device returns to the unmanaged discovery list.

`devices.airplayReceiver.info.deviceCount` continues to count all exclusively
classified receivers in the latest successful discovery, including observations
without durable identity. It may therefore be greater than the number of
individual receiver objects.

## Consequences

Automations and visualizations can bind to receiver paths that survive display
renames, DHCP changes, port changes, temporary absence, and adapter restarts.
Users can distinguish current discovery evidence from an active connection.
Offline active receivers remain visible until the user makes them passive or
deletes their local management record. Discovery observations without explicit
adoption never create automation bindings.

Streaming, transient pairing, volume, transport, metadata, artwork, grouping,
and receiver enablement remain outside this contract. Each requires narrow SDK
evidence, capability detection, failure semantics, and real-device validation
before writable states or availability claims are added.

This backward-compatible feature addition is classified for a future pre-1.0
minor release.

## Alternatives Considered

- Name-based paths were rejected because renames and duplicates break identity.
- IP- or endpoint-based paths were rejected because DHCP and DNS-SD ports change.
- Full public-key paths were rejected because public-key-only observations do
  not yet have sufficient cross-device and reset evidence for durable identity.
- Deleting absent receiver objects after every scan was rejected because one
  lossy mDNS result would remove stable automation bindings.
- Adding streaming or control states now was rejected because advertisement is
  not capability or successful-session evidence.

## Validation

Contract and correlation tests cover AirPlay device-ID normalization, RAOP-only
identity, AirPlay/RAOP correlation, rename and address independence, class
exclusion, weak-identity suppression, deterministic ordering, read-only object
metadata, `ack=true` projection, `lastSeen`, startup defaults, and absent-device
retention. The full adapter gate is required because the public object contract
and discovery IPC schema change. Real-device discovery still must confirm the
identity and service fields for each receiver model before model-specific
support is claimed.