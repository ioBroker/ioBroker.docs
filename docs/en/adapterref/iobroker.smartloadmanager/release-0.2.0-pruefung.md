---
chapters: {"pages":{"de/adapterref/iobroker.smartloadmanager/README.md":{"title":{"de":"ioBroker.smartloadmanager"},"content":"de/adapterref/iobroker.smartloadmanager/README.md"},"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md":{"title":{"de":"Arbeits- und Prüfplan für 0.2.0"},"content":"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md
title: Work and test plan for 0.2.0
hash: QwPy/T+TM6lFV6nS/gZi1GNRE/f9cBpj05rxFiOPUbc=
---
# Work and test plan for 0.2.0

All local modifications found will be adopted and reviewed according to the specifications. The existing adapter architecture will be retained. Errors will be corrected using reproducible regression tests; actual device testing is not possible due to a lack of test facilities.

1. Check GitHub issues #90, #93, #86 and associated maintenance PRs; determine the current npm versions of the controller, admin, and test tools.
2. Control errors in `main.js` Reproduce with simulated ioBroker states: switching commands, percentage control, battery, operating modes, heating protection and timer.
3. Correct errors and run regression tests; check forecast inputs and minimum runtimes.
4. Check dependencies, node test matrix, translations, and package contents.
5. Add a README changelog and German/English user documentation with examples.
6. Synchronously set versions in package files to 0.2.0. Run unit, package, type, lint, and integration tests against the current js-controller.
7. Review changes, commit them, and push them after successful reviews.

Issue #84 concerns the separate ioBroker stable repository. Pushing the adapter alone does not update its version. It is not incorrectly treated as a locally fixed bug.

## Initial situation

- Node.js local version: 22.19.0.
- Initial tests: 6 unit tests (one of which was a placeholder), 40 package tests passed.
- Type approval and ESLint passed.
- npm latest during testing: js-controller 7.2.5, Admin 8.3.3, adapter-core 3.4.3, testing 6.3.1.
- No real ioBroker test instance and no connected devices are available.

## Fixed bugs and testing

- True regression tests replace the previous placeholder. Boolean/numeric commands, operating modes, percentage control, sign, battery state of charge (SOC), charge power feedback, heating protection, and timer interruptions are tested.
- Delayed activation checks the current surplus and the time window again. Deactivation terminates running switching and display timers.
- Simultaneous counter events do not permanently shift control timers; battery delays are not bypassed by an immediate control path.
- Forecasts discard past values and respect 0 minutes lead time.
- A periodic check takes time windows into account even without new counter values.
- All eleven translation catalogs contain the same keys. Notifications and release metadata are available in all supported languages.
- Official current JSON schemas: 61 package checks successful.
- 29 functional tests successfully completed under nodes 22.19.0, 24.22.1 and 26.12.1.
- Configured integration test against js-controller 7.2.5 successful: Consumer objects created, switching command as `ack: false` received.
- This integration test also passes under Node.js 26.12.1 (2 tests).
- Final type check, ESLint and npm package contents check successful; runtime module, translations and documentation included, test files excluded.
- Clean installation with `npm ci` successful.
- Repository checker 5.23.2 in local mode: no errors. Remaining issues concern the unreleased version 0.2.0, a missing release tag, old CI logs that are no longer accessible, and open GitHub issues.

## Conscious decisions and external dependencies

- TypeScript will remain at version 6.0.3: Version 7 conflicts with the peer requirements of the official ioBroker ESLint setup. Therefore, PR #79 will not be blindly implemented.
- `alwaysOffAtTime` It retains its documented meaning: normal shutdown only at the end of the time window. The heating protection test remains independent of this.
- `npm audit` After compatible updates, it reports six transitive messages: three moderate ones about `@iobroker/testing` →`@alcalzone/esbuild-register` →`esbuild` and three high above `@iobroker/adapter-core` →`@iobroker/js-controller-common-db` →`node-forge` The count includes the affected parent packages. There is no compatible update in the current dependency tree. The adapter does not start an esbuild development server and does not process RSA signatures itself. No claim of security is made, and no forced downgrade of the tools required by the repository checker is performed.
- Issue #84 requires a separate change in the ioBroker stable repository after a successful release and will not be resolved by a Git push alone.
- Automated tests do not replace commissioning with real equipment.