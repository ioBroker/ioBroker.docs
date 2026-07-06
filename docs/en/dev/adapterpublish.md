---
lastChanged: 2026.05.27
---
# Publishing an Adapter

## Before You Publish

1. Test your adapter thoroughly in your own environment
2. Post a test thread in the [ioBroker Tester Forum](https://forum.iobroker.net/category/91/tester) to collect user feedback
3. Run the [Adapter Checker](https://adapter-check.iobroker.in/) against your repository and fix all issues

## Requirements for the Latest Repository

The full and most current requirements are always at:
https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

Key requirements:

1. **Naming**: GitHub repo `ioBroker.adapterName` (capital B), npm package `iobroker.adaptername` (lowercase)

2. **Metadata**: `io-package.json` must have:
   - `title` and `titleLang` (not containing "ioBroker" or "Adapter")
   - `desc` with at least English description
   - `type` — matching the allowed adapter categories defined in the [ioBroker.repositories README](https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md#types)
   - `connectionType` (`local` or `cloud`) and `dataSource` (`push`, `poll`, or `assumption`)
   - `license` field
   - `authors` with at least one entry
   - `adminUI`: `{"config": "json"}` for jsonConfig-based adapters

3. **README**: Must exist in English. Should document configuration, features, and changelog.

4. **License**: Both in `io-package.json` and as a separate `LICENSE` file

5. **State roles**: All created states must have meaningful [roles](stateroles.md). Don't use the generic `state` role.

6. **Testing**: CI must run on GitHub Actions with tests passing across supported Node.js versions

7. **npm**: Adapter must be published on npm, and the ioBroker organization must be added as owner (see below)

8. **Clean repo**: Delete unused `www/` and `widget/` directories

## Publishing to npm

### First-Time Setup

1. Create an account on [npmjs.com](https://www.npmjs.com/signup)
2. Log in locally: `npm login`
3. Make sure `package.json` has the correct name: `iobroker.adaptername` (lowercase)

### Publishing a Release

The recommended workflow uses [@alcalzone/release-script](https://github.com/AlCalzone/release-script):

```bash
npm run release -- patch    # Bug fix: 1.0.0 → 1.0.1
npm run release -- minor    # New feature: 1.0.0 → 1.1.0
npm run release -- major    # Breaking change: 1.0.0 → 2.0.0
```

This command:
1. Bumps the version in both `package.json` and `io-package.json`
2. Replaces `NEXT` in `common.news` with the new version number
3. Updates the changelog
4. Creates a git commit and tag

After pushing the tag, the GitHub Actions deploy workflow publishes to npm automatically.

### Automated Deploy with GitHub Actions

The standard workflow `.github/workflows/test-and-release.yml` includes a deployment job that triggers on version tags:

```yaml
deploy:
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
              node-version: 22
              registry-url: https://registry.npmjs.org
        - run: npm ci
        - run: npm run build
        - run: npm publish
          env:
              NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

For a more secure setup, use **npm OIDC trusted publishers** instead of storing a npm token in GitHub secrets. This eliminates the need for long-lived tokens.

### Add ioBroker as npm Owner

This is required so the ioBroker team can maintain the package if needed — for example if the original author becomes unresponsive. The maintainer account is `bluefox`:

```bash
npm owner add bluefox iobroker.adaptername
```

`bluefox` must accept the invitation, which can take a day or two. If it expires, send the invite again.

## Submitting to the Latest Repository

1. Go to [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)
2. Create a pull request that adds your adapter to `sources-dist.json`:

```json
"my-adapter": {
    "meta": "https://raw.githubusercontent.com/yourname/ioBroker.my-adapter/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/yourname/ioBroker.my-adapter/master/admin/my-adapter.png",
    "published": "2026-01-15T00:00:00.000Z",
    "type": "hardware"
}
```

- Place the entry alphabetically
- `published` is the date of first publication — don't change it later

## Submitting to the Stable Repository

After your adapter has been in the Latest repository and users have given positive feedback:

1. Submit a PR adding your adapter to `sources-dist-stable.json`:

```json
"my-adapter": {
    "meta": "https://raw.githubusercontent.com/yourname/ioBroker.my-adapter/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/yourname/ioBroker.my-adapter/master/admin/my-adapter.png",
    "version": "1.2.0",
    "published": "2026-01-15T00:00:00.000Z",
    "type": "hardware"
}
```

- The `version` field specifies the minimum stable version
- Update this with a new PR when you want to promote a newer version

Requirements:
- Adapter must already be in the Latest repository
- A test thread in the [Tester Forum](https://forum.iobroker.net/category/91/tester) with user feedback
- Recommended: Implement a [Discovery](https://github.com/ioBroker/ioBroker.discovery) function for automatic detection

## Version Management

### Semantic Versioning

Use [SemVer](https://semver.org/):

| Part  | When to bump                       | Example       |
|-------|------------------------------------|---------------|
| Patch | Bug fixes only                     | 1.0.0 → 1.0.1 |
| Minor | New features, backwards compatible | 1.0.0 → 1.1.0 |
| Major | Breaking changes                   | 1.0.0 → 2.0.0 |

### Pre-1.0 Versions

During initial development (0.x.y):
- Bump `y` for patches and minor features
- Bump `x` for breaking changes
- Move to 1.0.0 when the adapter is stable and tested by multiple users

### Release Notes (common.news)

The `news` field in `io-package.json` is shown in the admin UI. Keep a maximum of **7 entries**. Each entry should have translations:

```json
"news": {
    "NEXT": {
        "en": "Added support for new device model",
        "de": "Unterstützung für neues Gerätemodell hinzugefügt"
    },
    "1.0.0": {
        "en": "Initial stable release",
        "de": "Erste stabile Version"
    }
}
```

Use `NEXT` as placeholder — the release-script replaces it with the actual version number.
