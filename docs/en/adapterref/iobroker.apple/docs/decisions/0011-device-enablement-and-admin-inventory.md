---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0011: Device Enablement And Admin Inventory

- Status: accepted; receiver/HomePod management amended by ADRs 0013–0015
- Date: 2026-09-01

## Context

The initial Admin configuration combined general discovery settings and Apple TV
pairing on one page. It also treated every persisted Apple TV pairing as active:
when the device was discovered, the adapter connected its backend and projected
its complete public object tree. HomePod and generic AirPlay Receiver discovery
exposed class counts only.

The adapter now needs class-oriented Admin navigation and a durable distinction
between a paired Apple TV that is actively managed and one that is retained but
temporarily disabled. Discovery observations, durable pairing credentials,
device enablement, and public object projection must remain separate concepts.

## Decision

The Admin configuration uses the tabs `General`, `Devices`, and `Apple Music`.
The Devices tab has sections for Apple TV, HomePod, and generic AirPlay
Receiver. Apple TV retains the existing PIN pairing and local forget workflow.
HomePod and AirPlay Receiver show the count, display name, and reported model
from the latest successful discovery. After their device contracts are
accepted, ADR 0015 adds explicit adoption plus active/passive/delete management;
discovery alone still creates no individual runtime object.

Persist Apple TV enablement as durable non-secret instance data in
`device-settings.v1.json`. The version 1 database stores only explicitly
disabled normalized Apple TV device IDs. Absence therefore means enabled. This
makes all pairings created by older versions active after a transparent upgrade
without rewriting the encrypted credential database.

For a paired Apple TV:

- active means discovery may connect its backend and project its individual
  `devices.appletv.<deviceId>` object tree;
- passive means credentials and the Admin inventory entry remain, while the
  backend is disconnected and the individual object tree is removed;
- reactivation recreates the tree and reconnects when a current discovery
  target is available;
- local forget removes credentials, enablement metadata, backend session, and
  the individual object tree.

Discovery counts and discovery candidates do not depend on enablement. A
passive paired Apple TV remains visible in the Admin inventory and in current
discovery results. Startup removes Apple TV trees that are either unpaired or
passive. A newly completed pairing is active by default.

The settings database is validated before use, written through an atomic
same-directory replacement, and restricted to owner-only filesystem
permissions. Device IDs are installation data and never enter repository
fixtures except as neutral locally administered examples.

The General tab contains the discovery interval and informational Apple Account
placeholder only. It does not store an Apple ID, password, token, or other
credential before a dedicated authorization ADR is accepted. The Apple Music
tab is an informational placeholder and creates no public `music` objects.

## Consequences

Users can temporarily disable an Apple TV without losing its pairing. Existing
paired devices remain active across the upgrade. Passive devices intentionally
disappear from the public object tree, so automations see the same effect as a
temporarily unavailable target path rather than a writable disabled control.

The discovery IPC schema becomes additive: it includes redacted per-class
summaries with stable scan identity, display name, and model. ADR 0013 later
promotes strongly identified generic AirPlay Receivers into a read-only runtime
inventory. ADR 0014 later promotes strongly identified HomePods into an
automatically connected transient-control preview without reusing Apple TV
enablement or credential persistence.

Actual Apple Account or Apple Music credentials remain out of scope. Adding
them later requires a security, persistence, migration, and authorization
decision rather than reusing placeholder UI fields.

## Validation

Tests verify default-active migration, atomic persistence, schema rejection,
owner-only permissions, passive startup cleanup, disconnect and tree removal,
reactivation, forget cleanup, class-exclusive discovery summaries, message
validation, and Admin configuration structure. Full package, build, and
integration checks are required because persistence and public runtime
projection behavior change.