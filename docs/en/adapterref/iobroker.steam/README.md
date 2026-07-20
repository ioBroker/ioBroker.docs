![Logo](admin/steam.png)

# ioBroker.steam

[![NPM version](https://img.shields.io/npm/v/iobroker.steam.svg)](https://www.npmjs.com/package/iobroker.steam)
[![Downloads](https://img.shields.io/npm/dm/iobroker.steam.svg)](https://www.npmjs.com/package/iobroker.steam)
![Number of Installations](https://iobroker.live/badges/steam-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/steam-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.steam.png?downloads=true)](https://nodei.co/npm/iobroker.steam/)

## ioBroker.steam

This adapter integrates Steam profile and game activity information into ioBroker.

## Requirements

- Node.js >= 22
- ioBroker.js-controller >= 6.0.11
- ioBroker.admin >= 7.6.20

## Features

*   **Steam Profile Information:**
    *   **Player Name:** Displays the current Steam name of the player.
    *   **Profile URL:** Provides the URL to the Steam profile.
    *   **Avatar URL:** Displays the URL to the player's avatar.
    *   **Player State:** Displays the current state of the player (e.g., Online, Ingame, Away).
    *   **Game Extra Info:** Displays information about the currently played game (if available).
    *   **Steam ID64:** The unique 64-bit Steam ID of the user.

*   **Game Monitoring:**
    *   **Games to Monitor:** Configure a list of games to monitor.
    *   **Game App ID:** Stores the Steam App ID for each monitored game.
    *   **Game News:** Fetches and updates the latest news for each monitored game every 6 hours (4 times a day).
    *   **Game Name Suggestions:** If a game cannot be found (e.g., due to a typo), the adapter logs a warning and suggests up to 5 similar game names from the Steam app list.
    *   **Auto-completion:** When adding games, the adapter automatically completes missing information - if you provide a game name, it finds the AppID, and vice versa.
    *   **Owned Games Import:** Imports all your owned games from your Steam library with a single click.
    *   **Enhanced Game Info:** Displays game icons, logos, community stats URLs, playtime statistics, and more.
    *   **Automatic Game Detection:** Automatically detects and creates states for games as they are played.

*   **API Request Management:**
    *   **GetPlayerSummaries:** Requests player summaries at a configurable interval (minimum 15 seconds, default 60 seconds).
    *   **Daily Request Count:** Monitors the number of GetPlayerSummaries API requests to avoid exceeding the limit of 10,000 requests per day.
    *   **Automatic Reset:** Automatically resets the daily request count at 0:00 (midnight).
    *   **Optimized API Usage:** Prevents duplicate API calls and adds proper cooldowns between requests.
    *   **Steam AppList Caching:** Efficiently caches the Steam application list to reduce API calls.

## Configuration

1. **Steam Name / SteamID64**
    Enter your Steam vanity name or the 17-digit SteamID64 from your public profile.
2. **Steam API Key**
    Log in to Steam in your browser, open the [Steam API key page](https://steamcommunity.com/dev/apikey), create a key, and copy it into adapter config.
    Your Steam Community profile must be set to Public.
3. **Player summary interval**
    Set the polling interval for player summaries (minimum 15 seconds).
4. **Enable game suggestions**
    Enables typo-tolerant game name suggestions in logs.
5. **Enable owned games**
    Imports owned games into configuration (adapter restart required).
6. **Games to monitor**
    Add game name or AppID. Missing information is auto-completed by the adapter.

## Usage

After installing and configuring the adapter, the Steam profile information, game news, recently played games, and API request statistics will be available as states in ioBroker.

The adapter creates several state folders:
- **steam.0** - Contains general profile information and connection status
- **steam.0.games** - Contains monitored games with their AppIDs, news, and statistics

When a game is being played, its `isPlaying` state will be set to true, and all data for that game will be automatically updated.

## Changelog

### WORK IN PROGRESS

### 0.5.11 (2026-07-02)
- (bloop16) Fixed repo-checker issues E5600/S5601 by fully migrating admin i18n to short format.
- (bloop16) Fixed W5606 by completing missing translations and correcting placeholder formatting.
- (bloop16) bumped key dependencies (axios, adapter-core).
- (bloop16) #113 follow-up fixes: release-script minimum update, Node 22 tsconfig alignment, and ESLint/dependency cleanup.

### 0.5.10 (2026-05-29)
- (bloop16) Improved Steam onboarding and setup guidance
- (bloop16) Fixed editor and test typing diagnostics for JavaScript adapter workflow
- (bloop16) Updated README to ioBroker release format and moved legacy entries to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.5.9 (2026-03-22)
- (bloop16) Added concurrency configuration to CI workflow
- (bloop16) Removed obsolete dependabot workflow file

Older changelog entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 bloop16 <bloop16@hotmail.com>

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