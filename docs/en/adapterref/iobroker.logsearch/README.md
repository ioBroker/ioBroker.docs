![Logo](admin/logsearch.png)

# ioBroker.logsearch

[![Test and Release](https://github.com/disaster123/ioBroker.logsearch/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/disaster123/ioBroker.logsearch/actions/workflows/test-and-release.yml)

Search ioBroker log files directly in the Admin interface by time range, level, and text.

## Features

- Detects the log directory and the log file naming from the js-controller configuration.
- Searches the active ioBroker log and the rotated `<name>.YYYY-MM-DD.log` files.
- Transparently reads gzip-compressed historical logs.
- Filters by a case-insensitive text fragment and the levels `error`, `warn`, `info`, `debug`, or `silly`.
- Limits the result count and clearly indicates truncated results.
- Refreshes the active log every five seconds after a search.
- Resynchronizes after the browser tab, network connection, or Admin socket resumes.
- Keeps duplicate physical log lines as separate results.
- Toggles the **From now** view to show only new matching entries or return to log history.
- Exports the displayed log rows as a UTF-8 `.txt` file.
- Recalls the ten most recent distinct search texts from a persistent dropdown.

The text filter is a plain, case-insensitive substring search across the complete log line. It is not a regular expression.

## Requirements

- Node.js 22 or newer
- js-controller 6.0.11 or newer
- Admin 7.6.20 or newer

## Installation

The adapter is published on [npm](https://www.npmjs.com/package/iobroker.logsearch). Inclusion in the official ioBroker adapter catalog is pending.

Once included, select **Log Search** in ioBroker Admin's adapter catalog and add an instance.

## Admin tab and instances

The adapter is intentionally limited to one instance per ioBroker installation. Its singleton Admin tab provides an interactive log-search workspace with result tables, incremental updates, live filtering, search history, and export. The separate configuration view only manages the log location and search defaults; a standard jsonConfig configuration form is not suitable for this interactive workspace.

On multi-host installations, log files are local to the host running the adapter. The Admin tab searches the logs accessible to that instance; it does not aggregate logs from other hosts.

## Configuration

| Setting          |   Default | Description                                                                       |
| ---------------- | --------: | --------------------------------------------------------------------------------- |
| Log directory    | _(empty)_ | Directory containing the ioBroker log files. Leave empty for automatic detection. |
| Default hours    |      `72` | Initial time range used by the Log Search tab.                                    |
| Default max rows |     `500` | Initial maximum number of rows returned.                                          |

The adapter enforces an absolute maximum of 5,000 rows per request. The configured log directory is used server-side; a client cannot override it in a search request.

### Automatic log directory detection

With an empty **Log directory** the adapter reads `iobroker.json` and evaluates the first enabled `log.transport`
of type `file`, the same way js-controller does:

- `filename` defaults to `log/iobroker`. Relative filenames are resolved using js-controller's `logger.ts` rule:
  against the installation root for npm installations, or against the controller directory for a development
  checkout. This destination is used even if it is empty or does not exist yet; logs in other directories
  must not override the configured path.
- An absolute `filename` (`/var/log/iobroker/iob` as well as `D:\logs\iobroker`) is used unchanged.
- `fileext` determines the extension of the rotated files; the symlink of the active log is always
  `<name>.current.log`.
- The controller-resolved data directory is checked first for `iobroker.json`. This preserves
  `IOBROKER_DATA_DIR` support through adapter-core without accessing the process environment in the adapter.

If no usable file transport can be read, the adapter probes walk-up candidates for `log/`, plus the sibling
of the data directory and `/opt/iobroker/log`. The detected directory is logged on start-up and shown on the
configuration page. The obsolete default `/opt/iobroker/log` that earlier versions wrote into every instance is
ignored when it does not exist, so existing instances also profit from the detection.

## Usage

1. Open the **Log Search** tab in ioBroker Admin.
2. Enter an optional text fragment and choose the time range, level, and row limit.
3. Select **Search**. Changing a filter automatically starts a new search after a short delay.
4. Leave the tab open to receive new matching entries automatically.

Results are ordered newest first and show timestamp, level, source, and message. **Clear filter** clears the text filter.

**From now** immediately empties the table and starts watching for new entries. The button remains highlighted while this mode is active. It keeps the current filters and does not delete any log files. The start point is set using the adapter's clock and remains active when searching again, changing filters, or reconnecting. Click the highlighted **From now** button again to include older entries within the selected time range. Reloading the page also returns to the normal history view.

**Export .txt** downloads exactly the currently displayed rows, newest first, including duplicate lines. The UTF-8 file contains the original log text without terminal color codes. Active filters and the row limit apply; a truncated result exports only the displayed rows.

Click the **Search text** field to open the last ten searches, newest first. Typing filters the dropdown by
the beginning of the search text (case-insensitive); it disappears when nothing matches. An empty field
shows the full history. Select an entry with the mouse or
arrow keys and Enter to search again without changing the other filters or **From now**. A non-empty query
is remembered when you press Enter, click **Search**, or leave the edited field; automatic refreshes and
intermediate keystrokes do not fill the history. Reusing a query moves it to the top (case-insensitive).
When the tab opens, the last search state is restored and used for the initial search. Clearing the filter is
also remembered, while the previous non-empty terms remain available in the dropdown.
The adapter stores the history and last search state as JSON in `logsearch.<instance>.searchHistory`, for example
`logsearch.0.searchHistory`. It survives adapter/browser restarts and is shared by users of that instance.
Search text is kept literally, including spaces; only empty or whitespace-only entries are skipped.

## Development

The adapter itself is TypeScript in `src/` and compiles to `build/`. The Admin GUI is a separate npm project in
`src-admin/`, built with [Vite](https://vite.dev/) and [`@iobroker/gui-components`](https://github.com/ioBroker/adapter-react-v5);
`npm run build` writes it to `admin/`.

```bash
npm ci            # adapter dependencies
npm run 1-npm     # GUI dependencies from src-admin/package-lock.json (npm ci)
npm run lint      # eslint for src/ (npm run lint-frontend for src-admin/)
npm run check     # tsc for src/ and test/
npm test          # unit tests and package validation
npm run build     # build/ (tsc) and admin/ (vite)
```

The full GUI build runs `npm ci` in `src-admin/` even when `node_modules` already exists. It uses the committed
lockfile without `--force` and stops if dependency installation fails. For repeated GUI builds after installing
dependencies once, the individual `2-build`, `3-copy`, and `4-patch` tasks remain available.

For GUI work, start the Vite dev server and point it at a running Admin instance on port 8081:

```bash
cd src-admin
npm start
```

Then open `http://localhost:3000/?instance=0` for the configuration dialog or
`http://localhost:3000/?instance=0&tab=true` for the Log Search tab.

CI lints and type-checks the adapter and the GUI on Node.js 24, builds both from a clean checkout, and then executes
adapter tests on Node.js 22, 24, and 26 on Linux. Release tag pushes also run the adapter tests on Windows and macOS.

### Preparing a release

Use Node.js 24 and `npm ci` for releases. Update the version in `package.json`, `src-admin/package.json`, `io-package.json`, and both root version fields in each `package-lock.json` (root and `src-admin/`), along with the changelog and translated release notes. Feature pull requests do not update the generated files in `build/` and `admin/`.

Push the complete source commit and wait for its **Test and Release** workflow to pass. CI rebuilds the adapter and the Admin interface for every pull request. After all checks for a push to `main` pass, CI commits the generated `build/` and `admin/` files to `main` so installations directly from GitHub include the compiled adapter and the Admin interface. Dependency updates only commit the updated package lock; the subsequent test workflow publishes the matching Admin build.

Wait for the generated build commit, then create an annotated `v<version>` tag on the resulting `main` HEAD and push only that tag. Avoid CI-skip instructions in release commit messages. Tag runs verify that the tag and all package version fields agree. The publishing job builds the adapter and the Admin interface immediately before publishing through npm Trusted Publishing and creating the GitHub release. Never move an existing published release tag.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.3 (2026-11-07)

- (@disaster123) Replace the default adapter icon with the logsearch logo.
- (@disaster123) Update Admin UI and development dependencies.
- (@disaster123) Adapt Dependabot auto-merge to GitHub's pull request security policies.
- (@disaster123) Keep the seven latest multilingual release news entries.

### 1.0.2 (2026-10-08)

- (@disaster123) Limit the adapter to a single instance and translate the Admin tab into all supported languages.
- (@disaster123) Document the standalone log search workspace and local-host scope.
- (@disaster123) Update testing and Node 22 TypeScript development configuration for the ioBroker review.

### 1.0.1 (2026-09-20)

- (@disaster123) Remember a cleared search filter when reopening the Log Search tab.

### 1.0.0 (2026-09-20)

- (@disaster123) Restore the latest saved search when opening the Log Search tab.

### 0.0.5 (2026-09-18)

- (@disaster123) Add a dropdown with the last ten searches, persisted in the adapter instance's object tree and filtered by prefix while typing.
- (@disaster123) Use the test dependencies provided by `@iobroker/testing` instead of declaring them twice.
- (@disaster123) Use the controller-resolved data directory for log detection without direct process-environment access.
- (@disaster123) Complete the Admin UI translations in all supported languages.
- (@disaster123) Align Git ignore rules with the compiled adapter and Admin UI intentionally tracked by CI.
- (@disaster123) Run Windows and macOS adapter tests only on release tag pushes; keep Linux tests on every push and pull request.

### 0.0.4 (2026-09-16)

- (@GermanBluefox) Detect the log directory and the log file naming from the js-controller configuration; an empty **Log directory** now means automatic detection.
- (@GermanBluefox) Migrate the adapter and the Admin GUI to TypeScript.
- (@GermanBluefox) Build the Admin GUI with Vite and `@iobroker/gui-components` (React 19, MUI 9).
- (@GermanBluefox) Include the compiled adapter and Admin UI in the CI-generated commit for installations from GitHub.
- (@disaster123) Resolve log paths using the controller logger's configured destination so stale logs in other directories cannot override it.
- (@disaster123) Fix standalone GUI linting and install locked GUI dependencies with proper error handling.

### 0.0.3 (2026-09-16)

- (@disaster123) Add a toggleable From now button to hide old log entries.
- (@disaster123) Export the displayed log rows as a text file.
- (@disaster123) Keep the CI-generated Admin build on `main` for installations from GitHub.
- (@disaster123) Verify committed Admin assets and release versions before publishing; remove background asset commits.

### 0.0.2 (2026-09-15)

- (@disaster123) Update documentation for the npm publication and prepare automated releases.

### 0.0.1

- (@Disaster123) Initial release.

Older entries will be archived in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Disaster123 <stefan-iobroker@prie.be>

See [LICENSE](https://github.com/disaster123/ioBroker.logsearch/blob/main/LICENSE) for the full license text.