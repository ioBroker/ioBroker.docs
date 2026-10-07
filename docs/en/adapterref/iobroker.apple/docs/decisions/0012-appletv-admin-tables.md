---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0012: Apple TV Admin Tables

- Status: superseded by ADR 0017 for the Admin compatibility and build boundary;
  table behavior remains accepted
- Date: 2026-09-01

## Context

The standard JSON Config controls can list runtime-provided devices or invoke
one adapter message, but they cannot compose transient discovery data, a
non-persisted PIN field, and several row-specific actions into one dynamic
table. The previous Apple TV selectors therefore consumed substantial vertical
space and showed invalid placeholder icons for action names not supported by
the standard `sendTo` component.

The current test and deployment baseline uses ioBroker Admin 7.8.23. Admin 8
uses a different shared React and GUI-component generation and intentionally
refuses legacy-generation custom components.

## Decision

Render Apple TV pairing and paired-device management with one custom JSON
Config component built from source in `src-admin/`. The component uses the
official Admin 7 Module Federation interface and imports its controls and icons
from the Admin 7 React/MUI libraries. Generated production assets live below
`admin/custom/` and are included in the adapter package.

ADRs 0015 and 0016 later reused this source/build boundary for HomePod and
AirPlay Receiver management tables and, historically, the two-language instance
selector. ADR 0016 has since been superseded because current ioBroker checklist
rules require the Admin UI to follow the system-wide Admin language.

The component consumes the existing adapter message boundary. The candidate
and paired-device list responses add non-secret structured fields alongside
their existing `label` and `value` fields. `getPairingStatus` adds the stable
device ID only while a pairing session is active, allowing the browser to bind
the global one-session pairing coordinator to the correct table row.

The PIN is held only in component state, filtered to four digits, sent once to
`finishPairing`, and removed after completion or cancellation. It is never
written through the JSON Config `onChange` path and never becomes native adapter
configuration.

The component keeps the existing one-pairing-session-per-instance rule. It
serializes visible actions while a request is in progress, refreshes inventory
after every action, and performs a quiet ten-second refresh for connection and
discovery status. Passive and forget operations retain their explicit browser
confirmation.

This generation targets Admin 7.8.23 through the remaining Admin 7 line. The
declared global Admin dependency is narrowed to `>=7.8.23 <8.0.0`. Supporting
Admin 8 requires rebuilding or adding a GUI API generation 2 component and
testing both generations before widening that range. This compatibility change
belongs to a future pre-1.0 minor release.

## Consequences

Each discovered Apple TV has one compact row with name/model, pairing status,
start, transient PIN, finish, and cancel controls. Each paired Apple TV has one
row with connection/enablement status and active, passive, and forget actions.
All actions use bundled MUI icons, avoiding the limited string-icon vocabulary
of the standard `sendTo` control.

The source build adds pinned Admin-only development dependencies and generated
frontend assets. Protocol behavior, credentials, persistence format, and public
object IDs remain unchanged. The additive message fields remain non-secret and
backward compatible with the earlier selectors.

## Alternatives Considered

- Persisting runtime rows in a standard JSON Config `table` was rejected
  because discovery results and PINs are not durable adapter configuration.
- Rendering HTML through `textSendTo` was rejected because it has no supported
  row-action or transient-input message boundary.
- Keeping compact selectors was rejected because it would not provide the
  requested per-device workflow.
- Building only for Admin 8 was rejected because the tested ioBroker host runs
  Admin 7.8.23.

## Validation

Type checking and the production component build must pass in addition to the
full adapter gate. Contract tests verify the custom-component reference,
generated entry point, PIN-row actions, and active pairing device ID. The
Devices tab must load on a representative Linux aarch64 ioBroker host under
Admin 7.8.23 without console or component-loader errors.