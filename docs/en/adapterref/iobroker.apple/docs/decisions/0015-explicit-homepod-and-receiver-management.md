---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0015: Explicit HomePod And AirPlay Receiver Management

- Status: accepted
- Date: 2026-09-02

## Context

ADRs 0013 and 0014 introduced stable per-device object contracts for strongly
identified AirPlay Receivers and HomePods. Their first implementation projected
every strong discovery target automatically. The Admin design, however,
requires a deliberate distinction between transient discovery, locally managed
inventory, and active public projection for all device classes.

HomePods use automatic transient pairing rather than credentials, while generic
AirPlay Receivers currently expose only read-only discovery evidence. Neither
class can therefore reuse the Apple TV credential inventory as its durable
management boundary.

## Decision

A strongly identified HomePod or generic AirPlay Receiver first appears as an
unmanaged discovery candidate. Discovery alone does not create an individual
public object tree and does not start a HomePod protocol session. Weakly
identified observations remain visible only in the class discovery overview
and count because no stable local-management key exists for them.

An explicit Admin action adopts a current candidate as active. The device then
moves from the detected table to the managed table and cannot appear in both.
The adapter stores its class, normalized 12-character protocol ID, latest name,
latest model, and enablement flag in the owner-only atomic instance file
`managed-devices.v1.json`. This file contains no address, port, hostname, TXT
record, key, token, credential, or PIN.

For an adopted device:

- active means that its class-specific public object tree may exist;
- an active HomePod may establish its automatic transient AirPlay session;
- an active generic receiver receives only the ADR 0013 read-only inventory;
- passive retains the local management record but disconnects any HomePod
  session and removes the complete individual object tree;
- reactivation recreates the tree immediately when the device is currently
  discovered, or after a later successful discovery;
- delete removes the local record, disconnects any HomePod session, and removes
  the object tree. A still-visible device immediately returns as an unmanaged
  discovery candidate and can be adopted again.

Active managed roots survive temporary absence with the unavailable defaults
defined by ADRs 0013 and 0014. Passive, deleted, and never-adopted roots are
removed on startup and after management changes. Discovery counts continue to
include all exclusively classified observations and are independent of local
management.

Admin management operations and discovery reconciliation share one serialized
runtime queue. HomePod deactivation waits for queued commands, an active connect
attempt, backend disconnect, and final event projections before deleting the
tree. The Apple TV pairing, credential, and enablement contracts remain
unchanged.

## Migration

The individual HomePod and AirPlay Receiver contracts were added after the
published `0.2.0` tag and have not yet been released. Development installations
may nevertheless contain automatically learned roots from those previews. On
first startup with this decision, such roots are removed unless the device was
explicitly adopted into the new store. The user then activates the currently
detected device in Admin to recreate its tree.

The next release containing these device contracts is a pre-1.0 feature minor.
No `0.2.x` release may introduce this management and projection change.

## Consequences

Object-tree ownership is now consistent across discovery-managed classes:
network presence is observation, local management is durable intent, and only
active intent permits projection. Offline and passive devices retain readable
fallback metadata in Admin without leaking protocol details into native
configuration or public states.

The additional local data file is a persistence contract. Format changes need
validation, migration, restart tests, an ADR update, and a compatible SemVer
decision. Real HomePod control and receiver-model discovery claims retain their
existing hardware-validation requirements.

## Validation

Tests cover atomic owner-only persistence, schema rejection, class-separated
identity, candidate-to-managed movement, no duplicate listing, active/passive
projection, HomePod disconnect, explicit deletion, candidate reappearance,
startup cleanup, offline retention, and normalized Admin errors. The full
adapter gate and supported Node matrix are required before release; HomePod
hardware validation remains pending.