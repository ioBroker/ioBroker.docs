---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
---
# Stable application for 0.1.11 — merged

[Repository PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832)
was merged on 11 October 2026. The application text below documents the completed
submission.

Add `skoda-public-api` version **0.1.11** to the stable repository.

The adapter reads and controls Škoda vehicles through the official MyŠkoda Public
API. Version 0.1.11 has been published on npm since 20 September 2026 and is already
available in `latest`.

Public testing is documented in the
[forum thread](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x).
Reports include successful vehicle-status, parking-position, fuel/AdBlue and auxiliary
heating start/stop tests on an Octavia 2.0 TDI, plus positive feedback from owners of a
2025 Superb Hybrid, a 2022 Superb iV and a model-year 2027 Elroq. The Elroq report
also describes successful use of parking-position data in an ioBroker dashboard.
The 2025 Hybrid report leaves its climate-control
test pending. Charging mode and charging-profile controls were also tested on the
maintainer's Enyaq.

The repository has automated unit, package and adapter integration tests. The
[release CI for v0.1.11](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/35531311953)
passed all nine platform/Node combinations and published the package. Its
[main CI run after preparation PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427)
passed on Ubuntu, Windows and macOS with Node 22, 24 and 26. That run includes the
post-0.1.11 API-spec and compact-test updates; the requested stable package remains
the unchanged, published 0.1.11. The downloaded npm package contains `build/main.js`,
the Admin configuration and all supported Admin translations. `bluefox` and
`tmarthy` are npm maintainers.

VINs and an app-generated API key are configured manually because the Public API
has no vehicle-discovery endpoint.

**Checklist**

- [x] All requirements for stable inclusion are fulfilled, including the final
  CI and repository-checker verification after the development-dependency update.
- [x] The public testing thread and feedback are linked above.

This change adds only the `skoda-public-api` entry to `sources-dist-stable.json`,
pinned to version `0.1.11`.