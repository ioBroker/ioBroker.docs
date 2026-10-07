---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0017: Admin 8 GUI API Generation 2

- Status: accepted
- Date: 2026-09-03

## Context

The dynamic Apple TV, HomePod, AirPlay Receiver, and, historically, language
controls were originally built for Admin 7 with GUI API generation 1. The local
Linux aarch64 test host now provides Admin 8 and GUI API generation 2. Admin 8
intentionally refuses to start generation-1 components because its shared React,
MUI, and ioBroker component libraries are not binary-compatible with the older
build.

The result was a visible loader warning for every custom component while the
standard JSON Config fields continued to render. Adding only `guiApi: 2` would
misdeclare an incompatible bundle and is therefore not a valid correction.

## Decision

Migrate the complete custom Admin component set to GUI API generation 2 using
the official `ioBroker.admin-component-template` version 3.0.5 as the reviewed
build reference. The generation-2 build uses exact reviewed development
versions of `@iobroker/gui-components` 10.0.5, `@iobroker/json-config` 9.0.8,
React 19.2.8, MUI 9.2.0, Vite 8.1.5, and the associated Module Federation
packages recorded in `THIRD_PARTY_NOTICES.md`.

Every custom item in `admin/jsonConfig.json` declares `guiApi: 2`. Source code
imports `I18n` and the Module Federation sharing configuration from
`@iobroker/gui-components`; asynchronous generation-2 lifecycle methods await
their base implementation. The deprecated `bundlerType` declaration and the
generation-1 `@iobroker/adapter-react-v5` dependency are removed.

The adapter requires ioBroker Admin `>=8.0.0`. Admin 7 is no longer a
supported installation target. This incompatibility must be announced as
`BREAKING` in the next pre-1.0 minor release; the current development version
is not changed outside an explicitly authorized release.

## Consequences

The custom device-management controls share the same React 19/MUI 9 generation
as Admin 8 and can pass its component-loader gate. ADR 0016 has since
superseded and removed the adapter-specific language selector so the Admin UI
follows the system-wide ioBroker language. The backend message API, pairing
security, device persistence, and public object tree remain unchanged.

One generated Admin bundle cannot serve both GUI API generations. Restoring
Admin 7 support would require a separately built and selected generation-1 UI,
not a relaxed version range or false `guiApi` declaration.

The source build requires a Node version accepted by Vite 8 and Module
Federation Vite 1.19.1. The project's current supported Node 22, 24, and 26
validation uses releases above those tools' minimum Node 22.12 requirement.

## Alternatives Considered

- Declaring `guiApi: 2` on the existing bundle was rejected because it still
  contains React 18/MUI 6 generation-1 dependencies.
- Keeping Admin 7 as the only target was rejected because the representative
  installation has moved to Admin 8 and all custom controls are unusable there.
- Removing the custom tables was rejected because standard JSON Config cannot
  express their transient PIN and row-specific device-management workflows.
- Shipping two frontend generations was deferred because JSON Config has no
  simple static compatibility selector and the duplicated build/test surface is
  not justified for the current pre-1.0 adapter.

## Validation

Contract tests verify `guiApi: 2`, the Admin 8 global dependency, absence of
the legacy component package, and absence of an adapter-specific language
selector. Type checking, the production Admin build, package tests, the full
adapter gate, and Node 22/24/26 tests are mandatory. Visual verification on the
local Linux aarch64 test host must confirm the device-management controls and
absence of component-loader or translation warnings before the next release.