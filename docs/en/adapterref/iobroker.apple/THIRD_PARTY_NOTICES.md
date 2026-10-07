---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
---
# Third-Party Notices And Source Policy

This project is licensed under the MIT License. Third-party packages and source
materials remain subject to their respective licenses and terms.

This file records reviewed upstream projects. It is not a generated inventory
of installed npm dependencies. The released package must additionally preserve
all notices required by the dependencies actually distributed with it.

## Runtime dependencies

### Apple Protocols

- Project: `basmilius/apple-protocols`
- Source: https://github.com/basmilius/apple-protocols
- npm packages: `@basmilius/apple-sdk`, `@basmilius/apple-common`
- Reviewed npm version: `0.13.4`
- License: MIT
- Current use: exact version 0.13.4 runtime dependencies behind the project's
  discovery, pairing, and Apple backend interfaces

The packages are not vendored into this repository. Their copyright and
licenses remain with their respective authors. The reviewed source repository
and npm manifests declare MIT. The reviewed npm SDK artifact omits a `LICENSE`
file from its tarball, so this notice records the source and declared license
and is included in the adapter artifact. Runtime adoption is accepted by ADR
0007; dependency updates require a fresh source, artifact, and license review.

## Admin component build

### ioBroker Admin component libraries and template

- Projects: `ioBroker/gui-components`, `ioBroker/ioBroker.admin`, and
  `ioBroker/ioBroker.admin-component-template`
- Reviewed packages: `@iobroker/gui-components@10.2.1` and
  `@iobroker/json-config@9.1.2`
- Reviewed template: `ioBroker.admin-component-template` version `3.0.5`, commit
  `116026cef4623ac900cf3c3a992b7dd2049744c5`
- License: MIT
- Current use: Admin 8 GUI API generation 2, build scaffold, and shared UI
  libraries for Apple TV pairing, device-management tables, and the
  instance-local language selector

The component implementation is project-owned. Its build configuration is
derived from the official MIT-licensed ioBroker template. The relevant template
copyright notice is: Copyright (c) 2022-2026 bluefox
<dogafox@gmail.com>. The complete MIT permission and warranty terms are the
same as those reproduced in the root `LICENSE` file.

The generated Admin bundle also uses React 19.2.8, MUI 9.4.0, Vite 8.1.5, and
Module Federation Vite 1.21.2. These tools and libraries are MIT-licensed and
remain copyright of their respective authors. Source repositories:
https://github.com/facebook/react, https://github.com/mui/material-ui,
https://github.com/vitejs/vite, and
https://github.com/module-federation/vite.

## Reference implementations

### ioBroker Apple TV draft

- Project: `h2okopfmt/ioBroker.apple-tv`
- Source: https://github.com/h2okopfmt/ioBroker.apple-tv
- Reviewed commit: `eb7e8a527a313fdbb63f801335f0b22ae214e6c1`
- License: MIT
- Use: prior-art and project-overlap assessment only

No source from this project is included, copied, adapted, translated, or
vendored. The review informs the independent-project decision in ADR 0001 and
the public landscape assessment in `docs/UPSTREAM_RESEARCH.md`.

### pyatv

- Project: `postlund/pyatv`
- Source: https://github.com/postlund/pyatv
- Reviewed release: `0.18.0`
- License: MIT
- Use: protocol behavior and feature reference; not part of the default runtime

No pyatv source is currently included in this repository.

### Homey Apple

- Project: `basmilius/homey-apple`
- Source: https://github.com/basmilius/homey-apple
- Reviewed tag: `v1.8.0`
- License: GPL-3.0
- Use: behavioral and lifecycle reference only

GPL-3.0 source from this project must not be copied, adapted, translated, or
vendored into this MIT-licensed repository. Similar behavior must be implemented
independently from documented requirements, public APIs, and our own tests.

### Homebridge Alexa Player

- Project: `BewhiskeredBard/homebridge-alexa-player`
- Source: https://github.com/BewhiskeredBard/homebridge-alexa-player
- Reviewed version: `0.5.3`
- License: MIT
- Use: historical research reference only

No source from this project is currently included in this repository.

## External APIs And Trademarks

Apple Music API and MusicKit are external Apple services governed by Apple's
applicable developer terms. Their documentation and proprietary SDK content are
not relicensed by this project's MIT License.

Apple, Apple TV, HomePod, AirPlay, Apple Music, MusicKit, and related marks are
trademarks of Apple Inc. This independent project is not affiliated with,
endorsed by, or sponsored by Apple Inc.

Amazon, Alexa, Echo, and related marks belong to their respective owners. Any
future integration would be an independent interoperability feature.

## Contribution Rule

Contributors must identify the origin and license of copied or adapted material
in their pull request. Substantial third-party code may be added only after a
license review and with all required notices. Code with an incompatible license
must not be introduced.