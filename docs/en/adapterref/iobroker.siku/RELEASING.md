---
chapters: {"pages":{"en/adapterref/iobroker.siku/README.md":{"title":{"en":"ioBroker.siku"},"content":"en/adapterref/iobroker.siku/README.md"},"en/adapterref/iobroker.siku/RELEASING.md":{"title":{"en":"Releasing and official ioBroker inclusion"},"content":"en/adapterref/iobroker.siku/RELEASING.md"}}}
---
# Releasing and official ioBroker inclusion

This document summarizes the practical steps required to move `ioBroker.siku` from a repository beta to an officially listed ioBroker adapter.

## What ioBroker requires for inclusion in `latest`

Based on the current `ioBroker.repositories` requirements, the adapter should have at least the following in place:

- repository name `ioBroker.<adaptername>`
- GitHub topics configured
- English README with description, changelog, and a link to the manufacturer or device description
- predefined license
- GitHub Actions based adapter tests
- valid `type`, `connectionType`, and state roles in `io-package.json`
- encrypted/protected password handling where credentials are stored
- package published on npm
- `iobroker` organization added as npm owner (`bluefox` is the documented contact)
- Admin 3 / JSON config configuration dialog

Primary references:

- [ioBroker.repositories README](https://github.com/ioBroker/ioBroker.repositories)
- [ioBroker adapter creator](https://github.com/ioBroker/create-adapter)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers)

## Current project status

- [x] Repository name matches `ioBroker.<adaptername>`
- [x] JSON config admin page is present
- [x] CI test workflow is present
- [x] README is in English and links to manufacturer/device sources
- [x] Device passwords are stored encrypted and protected
- [x] Release workflow is prepared for npm trusted publishing
- [x] GitHub release notes can be generated automatically for each published tag
- [x] Public beta baseline version has been raised to `0.1.0`
- [x] npm package `iobroker.siku` has been published
- [x] npm owner `bluefox` / ioBroker organization has been added
- [ ] Adapter has been added to `latest`
- [ ] Adapter has been field-tested long enough for `stable`

## One-time npm setup for CD

1. Publish rights must exist for `iobroker.siku` on npm.
2. Configure **Trusted Publishing** for this package on npmjs.com:
   - provider: GitHub Actions
   - owner: `ChrMaass`
   - repository: `ioBroker.siku`
   - workflow: `test-and-release.yml`
3. Add the documented emergency owner:
   - `npm owner add bluefox iobroker.siku`
4. Enable the repository variable `ENABLE_NPM_RELEASE=true` in GitHub.

After that, tagged releases can be published from GitHub Actions without storing a long-lived npm token.

## Automatic patch versioning

If every successful push to `main` should automatically receive the next patch version, enable the repository
variable `ENABLE_AUTO_PATCH_RELEASE=true`.

The workflow `.github/workflows/auto-patch-release.yml` then:

1. waits for a successful `Test and Release` run on `main`
2. classifies the tested change using `.github/scripts/auto-release-policy.cjs`
3. runs the existing `release-script` as a patch release
4. pushes the generated release commit and git tag back to `main`
5. manually dispatches the trusted `test-and-release.yml` workflow for the new tag, because a tag push created by `GITHUB_TOKEN` does not start another push workflow on its own

Recommended versioning strategy for this repository:

- use **minor versions** (`0.2.0`, `0.3.0`, …) for visible feature sets or publication milestones
- use **patch versions** (`0.1.1`, `0.1.2`, …) for bug fixes and review follow-ups
- use the first npm / `latest` submission as **`0.1.x` public beta**, not as `0.0.x`

The automatic classifier creates a patch release for runtime source, Admin assets, runtime adapter
metadata or production dependency changes. It deliberately skips release commits, manual version
changes and changes limited to documentation, tests, workflows, lockfiles or development dependencies.

## CI strategy

- regular pull requests: lint + type-check + coverage + one Ubuntu smoke test for fast feedback
- Dependabot pull requests: full supported OS/Node.js matrix before auto-merge
- `main`: release-relevant Linux/macOS/Windows matrix
- Windows: separate scheduled/manual regression workflow because controller bootstrap is much slower on Windows runners
- Tags / release dispatches: standard ioBroker deploy action with trusted npm publishing and automatic GitHub release notes

This keeps day-to-day iteration fast without dropping cross-platform coverage entirely.

## Release flow for this repository

1. Ensure the release pull request is green and reviewed.
2. Run a dry run if needed:
   - `npm run release -- patch --dry --branchPattern '*'`
3. On a release branch, create the real release commit and local tag without pushing either automatically:
   - `npm run release -- patch --noPush --branchPattern '*'`
4. Push the release commit to the pull-request branch, but keep the tag local until the PR is merged.
5. Merge the reviewed PR and wait for the `main` test matrix. The manual version change makes the automatic patch classifier skip this merge.
6. Push the already prepared tag after the tested release commit is part of `main`.
7. GitHub Actions runs the tagged release workflow.
8. If trusted publishing is configured and `ENABLE_NPM_RELEASE=true`, the tag build publishes to npm.
9. The same release job also creates a GitHub Release with automatic notes, categorized via `.github/release.yml`.

## After the first npm release

Add the adapter to the ioBroker `latest` repository using one of these paths:

- via `iobroker.dev` → manage → **ADD TO LATEST**
- or by PR against `ioBroker/ioBroker.repositories`

Important review workflow note for `ioBroker/ioBroker.repositories` PRs:

- post `RE-CHECK!` **as a standalone comment with no extra text**
- add explanatory context in a separate comment if needed
- the bot removes the trigger comment automatically after the checker run has been processed

Once the adapter has real user feedback and enough validation, it can later be proposed for `stable`.