![Logo](admin/script-restore.svg)
# ioBroker.script-restore

[![NPM version](https://img.shields.io/npm/v/iobroker.script-restore.svg)](https://www.npmjs.com/package/iobroker.script-restore)
[![Downloads](https://img.shields.io/npm/dm/iobroker.script-restore.svg)](https://www.npmjs.com/package/iobroker.script-restore)
![Number of Installations](https://iobroker.live/badges/script-restore-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/script-restore-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.script-restore.png?downloads=true)](https://nodei.co/npm/iobroker.script-restore/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.script-restore/workflows/Test%20and%20Release/badge.svg)

## script-restore adapter for ioBroker

Browse and recover individual scripts from ioBroker backup archives — without restoring the entire backup.

## Description

The script-restore adapter adds a tab to the ioBroker admin interface that lets you open backup archives and browse all contained JavaScript, TypeScript, Blockly and Rules scripts. You can view the source code of each script and download or copy it individually.

The archive is parsed entirely in the browser — no files are written to disk during browsing.

## Features

- Browse backup archives directly from the ioBroker admin tab
- Load local backup files from the backup directory (default: `/opt/iobroker/backups`)
- Upload archive files directly from your computer
- Supported formats: `.tar.gz`, `.tar`, `.json`, `.jsonl`
- Tree view of all scripts organized by folder
- Filter scripts by type: JS, TypeScript, Blockly, Rules
- Full-text search across script names, paths and source code
- View source code (JS/TS/Blockly/Rules)
- Copy source code to clipboard or download as file
- **Select multiple scripts** with the ☐ checkbox and download them as a ZIP archive
- **Import ZIP archives** from the script-restore export or from the JS adapter's own backup (`2026-07-17-scripts.zip`)
- Fully browser-based parsing — no server roundtrip for uploads
- **Restore scripts directly into ioBroker** with a configurable suffix (default: `_rcvr`) — existing scripts are never overwritten

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| Backup path | Directory where ioBroker backup files are stored | `/opt/iobroker/backups` |

## Usage

### Loading a local backup file

1. Open the **Script Restore** tab in ioBroker admin
2. Click the **Local files** dropdown
3. Select a backup file from the list — scripts are loaded automatically

### Uploading a backup file

1. Open the **Script Restore** tab in ioBroker admin
2. Click **Upload archive** and select a file from your computer
3. The archive is parsed in the browser and all scripts are displayed

### Viewing and downloading scripts

- Click a script in the tree to view its source code
- Use the **Copy** button to copy the source to the clipboard
- Use the **Download** button to save the script as a file
- Click ☐ on the left of a script to select it — select multiple scripts and click **ZIP** to download them all in one archive

## Supported backup formats

| Format | Description |
|--------|-------------|
| `.tar.gz` | Standard ioBroker backup (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.tar` | Uncompressed tar archive |
| `.json` | JavaScript adapter script export |
| `.jsonl` | ioBroker objects export (JSON lines) |
| `.zip` (scripts.zip) | Script-restore ZIP export (contains `.js`/`.ts` files) |
| `.zip` (JS adapter backup) | JS adapter internal backup (`YYYY-MM-DD-scripts.zip`, contains `.json` files with script metadata) |

## Changelog
### 0.1.13 (2026-07-22)
* (winnyschuster) fix: correct folder indentation in script tree for deeply nested folders
* (ipod86) chore: update dev dependencies (@types/tar, @iobroker/testing, @types/node)

### 0.1.12 (2026-07-18)
* (ipod86) fix: add 30s timeout to all WebDAV operations
* (ipod86) fix: remove redundant variable alias in handleListLocalFiles

### 0.1.11 (2026-07-18)
* (ipod86) fix: move @types/tar to devDependencies (W0050, W5060)

### 0.1.10 (2026-07-18)
* (ipod86) fix: replace shell tar command with pure Node.js tar library for Windows compatibility
* (ipod86) feat: test local backup path button with result feedback
* (ipod86) feat: suggest backup path button
* (ipod86) fix: jsonConfig sendTo result format validation

### 0.1.9 (2026-07-17)
* (ipod86) feat: checkbox multi-select for ZIP export — click ☐ to select, main click still views only
* (ipod86) feat: import scripts.zip (our adapter export) and JS adapter backup ZIP (2026-07-17-scripts.zip)
* (ipod86) fix: align script list item columns (checkbox, icon, name) with flex layout

### 0.1.8 (2026-07-15)
* (ipod86) fix: sanitize object IDs from backup paths to prevent invalid ioBroker state IDs
* (ipod86) fix: add 30s timeout to HTTP URL download
* (ipod86) fix: bundle jszip locally in admin tab — no CDN dependency
* (ipod86) fix: zip export now works in all browsers (script tag loading, DOM-append before click)
* (ipod86) fix: remove postinstall lifecycle script from package.json (E0093)

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
