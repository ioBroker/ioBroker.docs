---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# ADR 0008: Semantic Versioning And Release Classification

- Status: accepted
- Date: 2026-08-31

## Context

ioBroker development guidance requires Semantic Versioning. This adapter
exposes more than a JavaScript API: ioBroker objects and states, Admin
configuration, messages, commands, persisted data, runtime requirements, and
documented integration behavior are all consumed externally. A release number must
communicate whether those consumers can upgrade without migration.

The project is currently below version `1.0.0`. SemVer permits instability in
`0.y.z`, but silent breaking patch releases would make early automation and
visualization integrations unreliable.

References:

- https://semver.org/
- https://forum.iobroker.net/topic/26204/versionierung-von-iobroker-und-adaptern

## Decision

Use Semantic Versioning 2.0.0 in the form `MAJOR.MINOR.PATCH`.

For stable versions beginning with `1.0.0`:

- increment `MAJOR` for any backward-incompatible public-contract change;
- increment `MINOR` for backward-compatible functionality or when public
  functionality is deprecated;
- increment `PATCH` only for backward-compatible fixes.

The public adapter contract includes:

- object and state IDs, hierarchy, types, roles, units, ranges, read/write
  flags, values, and acknowledgement semantics;
- Admin configuration fields and validation;
- message-box, command, scene, and JSON payload schemas;
- normalized player and integration behavior;
- persisted configuration and credential formats when an upgrade cannot
  migrate them transparently;
- documented minimum Node.js, js-controller, and Admin requirements;
- documented supported behavior whose removal would break an existing
  installation.

Examples of major changes after `1.0.0` include renaming/removing a state,
changing a state type or command meaning, requiring manual re-pairing without a
migration path, dropping a documented runtime version, or removing supported
behavior. Additive optional states and capabilities are normally minor when
existing consumers continue to work unchanged.

During initial development (`0.y.z`), apply a stricter project policy than the
minimum SemVer requirement:

- `0.MINOR.0` represents a feature milestone and may contain an explicitly
  approved compatibility break;
- `0.y.PATCH` is always backward compatible;
- every compatibility break must be labeled `BREAKING` in release notes and
  commit/review summaries, requires an accepted ADR, and includes migration and
  rollback impact;
- prefer deprecation and transparent migration over a break;
- `1.0.0` declares the first stable public adapter contract.

Pre-release versions may use `-alpha.N`, `-beta.N`, or `-rc.N`. They have lower
precedence than the corresponding normal version and do not carry the stable
compatibility promise of that normal version.

Published versions and Git tags are immutable. Never replace a published npm
artifact or move/reuse a release tag for different contents. A correction is a
new version.

A release must keep these locations consistent:

- `package.json` version;
- root package version in `package-lock.json`;
- `io-package.json` `common.version` and `common.news`;
- user-facing release notes/changelog;
- Git tag `vMAJOR.MINOR.PATCH` or its valid pre-release form.

Do not bump versions speculatively during ordinary feature work. Version
selection, tagging, npm publication, and GitHub release creation occur together
after the release quality gate passes.

## Consequences

Users can infer upgrade risk from the version number. Public ioBroker and
integration contracts must be reviewed during release classification, not only
TypeScript exports. Early releases remain free to evolve, but patch releases
cannot conceal compatibility breaks and every deliberate break has a migration
record.

Feature, fix, and dependency changes must be assessed by their observable
effect. A small code diff can require a major release, while a large internal
refactor can remain a patch if behavior is unchanged and verified.

## Alternatives Considered

- Informal version numbers: rejected because they do not communicate upgrade
  compatibility and conflict with ioBroker guidance.
- Treat every `0.y.z` release as fully unstable without migration discipline:
  rejected because automation and visualization consumers need predictable
  upgrades before `1.0.0`.
- Calendar versioning: rejected because compatibility, not release date, is the
  primary information users need.

## Validation

- The project definition, contribution guide, and README point to this ADR.
- Package, lockfile, ioBroker news, changelog, and Git tag agree for each
  released version; `0.2.0` is the first feature milestone using this policy.
- The release workflow accepts SemVer tags and pre-release tags.