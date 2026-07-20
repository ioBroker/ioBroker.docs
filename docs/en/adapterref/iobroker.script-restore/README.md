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

## Supported backup formats

| Format | Description |
|--------|-------------|
| `.tar.gz` | Standard ioBroker backup (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.tar` | Uncompressed tar archive |
| `.json` | JavaScript adapter script export |
| `.jsonl` | ioBroker objects export (JSON lines) |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-07-01)
* (ipod86) fix: translate common.news 0.1.5 entries into all 10 languages (E1144)
* (ipod86) fix: pin @types/node to ^22, fix dependabot cooldown format (W0066, W8917)

### 0.1.6 (2026-06-27)
* (ipod86) fix: upgrade typescript to ^6.0.3 with explicit mocha types for TypeScript 6 compatibility (W0083)

### 0.1.5 (2026-06-06)
* (ipod86) fix: update @alcalzone/release-script to ^5.2.1 (E0036)
* (ipod86) fix: add missing placeholder i18n keys to all 11 language files (W5612)
* (ipod86) fix: migrate i18n to short format, add npm provenance signing (S5601, S2008)
* (ipod86) fix: upgrade to @tsconfig/node22, pin @types/node to ^22 (W0086, W0090, W0066)
* (ipod86) fix: reorganize dependencies — types/eslint/prettier to devDependencies (W5060, W0078, E3031)
* (ipod86) fix: resolve adapter checker warnings W0069, W8917, S6022
* (ipod86) chore: bump ioBroker/testing-action-check from v1 to v2, keep deploy action at v1 (W3017)
* (ipod86) chore: bump typescript-eslint and @types/node

### 0.1.4 (2026-05-24)
* (ipod86) add syntax highlighting for JS/TS, Blockly (XML) and Rules (JSON) — pure JS, no external deps
* (ipod86) fix language detection: read ioBroker system language via adapter (system.config) instead of browser/DOM
* (ipod86) translate all remaining loader texts (reading file/archive, extracting, loading URL)

### 0.1.3 (2026-05-24)
* (ipod86) fix language flash: skip socket override when language already detected from admin frame
* (ipod86) replace all hardcoded status strings with translated t() calls
* (ipod86) add codeHint translation key in all 11 languages

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
