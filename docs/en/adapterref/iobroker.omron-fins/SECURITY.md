---
chapters: {"pages":{"en/adapterref/iobroker.omron-fins/README.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/README.md"},"en/adapterref/iobroker.omron-fins/READMEde.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/READMEde.md"},"en/adapterref/iobroker.omron-fins/SECURITY.md":{"title":{"en":"Dependency security status"},"content":"en/adapterref/iobroker.omron-fins/SECURITY.md"}}}
---
# Dependency security status

Checked on 2026-11-03 against GitHub Dependabot and npm audit.

## Remediation

All 23 Dependabot alerts open at the start of this maintenance are addressed by the updated lockfile. Packages include axios, follow-redirects, node-forge, moment, adm-zip, js-yaml, brace-expansion and @grpc/grpc-js. The adm-zip override now requires at least 0.6.1. Additional updates cover zod, diff and serialize-javascript. No alerts were dismissed or audit findings hidden.

`npm audit --omit=dev` reports **zero vulnerabilities** for the adapter's production dependency tree. This does not assess the separate ioBroker host installation.

## Remaining development-tool advisories

The complete development tree still contains two underlying advisories (24 moderate findings including dependent packages):

- [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249): minimatch globparts amplification. The advisory marks versions below 11.0.1 as affected. Existing lint and test packages depend on several older API generations. A global override would replace the callable minimatch 3 API with an incompatible export/API and is therefore not applied.
- [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4): glob AbortSignal cancellation bypass. Existing tools require glob 10; the published fix is in glob 14. These tools and their upstream dependency constraints need a coordinated update.

These packages are development dependencies, not production adapter dependencies. Do not run development tooling against untrusted repositories or attacker-supplied glob patterns. Keep Dependabot enabled and update the tooling once compatible fixes are available. A forced audit fix or dismissal would not establish compatibility or remediate the underlying packages.

## Validation

- Node.js 22 and 24: TypeScript checks and all 60 functional/package tests pass.
- Node.js 24: ESLint and isolated ioBroker integration/startup test pass.
- The lockfile was compared against the affected ranges of all 23 original alerts; none match.
- No live ioBroker installations or PLC configurations were changed.

This maintenance updates the GitHub source; it does not publish a new npm release.