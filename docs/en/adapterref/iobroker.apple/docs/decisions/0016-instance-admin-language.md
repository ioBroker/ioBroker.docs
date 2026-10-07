---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0016: Instance-Local Admin Language

- Status: superseded
- Date: 2026-09-02
- Superseded: 2026-09-13 by the current ioBroker adapter checklist requirement
  that Admin UIs follow the system-wide Admin language and do not implement an
  adapter-specific language switch.

## Superseding Decision

Remove the adapter-specific German/English selector and the persisted
`native.interfaceLanguage` setting. The Admin configuration follows the
system-wide ioBroker Admin language selected during Admin setup.

The adapter continues to ship the standard Admin translation catalog for all
supported ioBroker Admin languages. Missing or incomplete translations must be
fixed in the translation files, not bypassed with an instance-local language
override.

This changes only the Admin configuration UI and native configuration surface.
It does not change protocol behavior, public device object IDs, runtime labels,
credentials, or persisted device-management records.

## Historical Context

The following decision was implemented in the 0.4.0 development line and is
kept only as historical context.

## Context

The adapter configuration currently follows the ioBroker Admin language. The
maintainer needs an explicit German/English choice on the General tab without
changing `system.config` or expanding the adapter's maintained translation
scope to languages whose configuration text is incomplete.

## Decision

Add `interfaceLanguage` to native instance configuration. Accepted persisted
values are `de` and `en`; the empty upgrade default derives the initial display
from the current Admin language, using English when it is neither German nor
English.

Render a custom two-button language selector on the General tab. It loads the
selected adapter translation file, changes the JSON Config translation context,
and requests an immediate configuration-page rerender. The selection becomes
durable when the user saves the instance configuration. It does not modify the
global ioBroker system-language object and has no effect on protocol behavior,
public device states, object IDs, or runtime labels.

Only German and English are offered. The existing minimal files for other
ioBroker languages remain package fallbacks but are not selectable through this
adapter-specific control.

## Consequences

Each adapter instance can reopen its configuration in the selected language.
The original implementation used the Admin 7 JSON Config context. ADR 0017
migrates it together with all other custom components to GUI API generation 2.

`interfaceLanguage` is an additive native configuration field. Future removal,
renaming, or semantic changes require migration review as part of the public
configuration contract.

The current checklist supersedes that migration review: keeping the
adapter-specific language override would block repository acceptance.

## Validation

Admin contract tests verify the custom component reference, the two accepted
values, and the absence of a global system-language write. Type checking and a
production Admin bundle build are mandatory. Visual confirmation must verify
both directions on the representative Admin 8 installation.

The superseding implementation is validated by Admin contract tests that assert
the absence of `interfaceLanguage`, by TypeScript checking, and by a regenerated
generation-2 Admin bundle without the selector.