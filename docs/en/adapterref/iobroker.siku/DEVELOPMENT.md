---
chapters: {"pages":{"en/adapterref/iobroker.siku/README.md":{"title":{"en":"ioBroker.siku"},"content":"en/adapterref/iobroker.siku/README.md"},"en/adapterref/iobroker.siku/DEVELOPMENT.md":{"title":{"en":"Development and dependency security"},"content":"en/adapterref/iobroker.siku/DEVELOPMENT.md"},"en/adapterref/iobroker.siku/RELEASING.md":{"title":{"en":"Releasing and official ioBroker inclusion"},"content":"en/adapterref/iobroker.siku/RELEASING.md"}}}
---
# Development and dependency security

## Supported toolchain

Use the Node.js versions covered by CI (22, 24 and 26), `npm ci`, then:

```sh
npm run build
npm run check
npm test
npm run lint
npm run coverage
npm run audit:dependencies
npm run test:integration
```

The integration test uses the official `@iobroker/testing` harness. It installs an
isolated controller, starts the adapter without configured devices, and checks its
lifecycle. It does not use or modify an existing home ioBroker installation.
These tests require npm network access and are also run on Linux, macOS and Windows.

For interactive Admin and hardware tests, use a separate ioBroker test installation,
for example the [official Docker image](https://github.com/buanet/ioBroker.docker).
Build and pack the adapter with `npm run build && npm pack`, install that package in
the test installation, and upload its Admin files using the normal ioBroker tools.
Do not use a production installation as an unrestricted development sandbox. UDP
broadcast detection needs access to the device network; Docker Desktop's NAT network
does not automatically forward local-network broadcast packets.

## Why the old dev-server dependency was removed

`@iobroker/dev-server@0.8.0` still installs `bs-html-injector`, `request`, an old
`jsdom`, and `xmldom`. The obsolete HTML hot-reload stack has no supported update
that removes all its reported security problems. This adapter uses JSON config and
does not need HTML injection for builds, tests or the running adapter.

The dependency and `npm run dev-server` entry point are deliberately removed, rather
than moved to a global install to make an audit appear clean. This does mean the
old development server's interactive hot-reload feature is no longer provided by
this repository. Use integration tests for automated checks and a separate test
installation for interactive checks. Existing `.dev-server` data is not deleted or
migrated; stop any old development-server processes and do not keep using that
outdated environment. The repo audit does not inspect old profiles, global tools,
the separately installed integration controller or Docker images.

`@iobroker/adapter-dev` is retained for build/watch and translation commands. Its
dependencies can be updated within their supported ranges; replacing that entire
tool was not necessary.

## Scoped compatibility-tested overrides

- `@iobroker/testing -> @alcalzone/esbuild-register`: replace the old fork with the
  API-compatible `esbuild-register@3.6.0` via an npm alias. Unlike the old fork's
  hard dependency on vulnerable esbuild 0.11, the original wrapper supports
  `esbuild >=0.12 <1`; the lockfile resolves patched esbuild 0.25.12. Package tests
  load real TypeScript through the exact ioBroker module name in a child process.
  Builds, controller tests and `npm ls --all` verify the complete toolchain.

NYC's `istanbul-lib-processinfo` is updated to the upstream fix (3.0.1), which uses
`node:crypto` instead of the old `uuid` dependency. No uuid override is needed.
Package tests check actual process-ID creation; the coverage command checks the
complete NYC path.

Keep the override scoped to the affected consumer. Recheck and remove it when
upstream dependencies provide supported fixes. `npm audit fix --force`, global
overrides and `--legacy-peer-deps` are not part of the update workflow.

## ESLint and TypeScript upgrades

The lockfile contains the latest compatible ESLint 9 and typescript-eslint 8 versions.
TypeScript 6.0.3 remains intentional: typescript-eslint currently supports
[`>=4.8.4 <6.1.0`](https://typescript-eslint.io/users/dependency-versions/), not
TypeScript 7. ESLint 10 alone does not change that restriction, and the React plugin
used by ioBroker's shared config also still requires ESLint 9 or older.
Re-evaluate the whole stack before merging a TypeScript or ESLint major upgrade.

The test-and-release workflow runs `audit:dependencies` as a blocking gate, including
development dependencies and low-severity findings. A zero-finding audit is a snapshot
of known npm advisories, not a general security guarantee.