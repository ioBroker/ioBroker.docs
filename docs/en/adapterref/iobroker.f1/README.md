# ioBroker.f1

[![NPM version](https://img.shields.io/npm/v/iobroker.f1.svg)](https://www.npmjs.com/package/iobroker.f1)
[![Downloads](https://img.shields.io/npm/dm/iobroker.f1.svg)](https://www.npmjs.com/package/iobroker.f1)
[![License](https://img.shields.io/github/license/bloop16/ioBroker.f1.svg)](https://github.com/bloop16/ioBroker.f1/blob/main/LICENSE)

Formula 1 live data integration for ioBroker — provides race calendar, championship standings, session results, and real-time live session data via the [official F1 Live Timing feed](https://www.formula1.com/) and [Jolpica API](https://api.jolpi.ca/).

## Features

- **Race Calendar** — Next race & session info with countdown (days/hours)
- **Full Season Calendar** — All rounds of the current season as JSON
- **Championship Standings** — Driver and constructor standings with points and wins
- **Session Results** — Race, qualifying, sprint, and practice session results
- **Live Session Data** — Real-time data via F1 Live Timing SignalR WebSocket
  - Track status (AllClear / Yellow / SafetyCar / VSC / RedFlag)
  - Session status and name
  - Current & total laps
  - Time remaining / elapsed
  - Track weather (air temp, track temp, rain, wind, humidity)
  - Driver positions with gaps, lap times and tyre info
  - Top 3 live leaderboard
  - Race control messages
  - Pit stops
  - Tyre compounds per driver
  - Team radio

## Data Points

See the **Usage** section below for the complete object hierarchy and update intervals.

## Data Sources

| Channel | Source | Update |
|---|---|---|
| `schedule/` | Jolpica API | Hourly |
| `standings/` | Jolpica API | Hourly + after race |
| `results/` | Jolpica API | Hourly + after session |
| `live/` | F1 Live Timing SignalR WebSocket | Real-time push |

## Requirements

- ioBroker >= 5.0.19
- Node.js >= 22
- Internet connection
- Stable connection to [Jolpica API](https://api.jolpi.ca/)

## Installation & Configuration

1. Install the adapter via the ioBroker Admin panel or command line
2. Open the adapter settings (no user configuration required by default)
3. The adapter automatically:
   - Fetches the current F1 season calendar hourly
   - Updates championship standings after each session
   - Provides real-time live session data when sessions are active
4. Optional: adjust update intervals in adapter settings if needed

### Data Sources & Consistency

The adapter uses multiple data sources with automatic fallback:

| Channel | Primary | Fallback | Behavior |
|---------|---------|----------|----------|
| Schedule & Standings | [Jolpica API](https://api.jolpi.ca/) | Updated hourly + after races |
| Results | Jolpica API | Updated after each session |
| Live Data | [F1 Live Timing SignalR](https://www.formula1.com/) | OpenF1 API | Real-time push during sessions |

**Note:** During race weekends, upstream APIs may temporarily deliver mixed-round data (e.g., standings updated before results). The adapter includes retry logic (6 attempts, 10-minute intervals) to ensure data consistency.

## Usage

Once installed and started, the adapter exposes ioBroker states under the object path `f1.0`:

```
f1.0
├── info.connection           (adapter connection status)
├── schedule/
│   ├── next_race_name / round / circuit / country / date
│   ├── next_session_name / type / date / countdown_*
│   ├── weekend_json          (all sessions of current weekend)
│   └── calendar              (full season as JSON)
├── standings/
│   ├── drivers               (JSON array with positions & points)
│   ├── teams                 (JSON array with constructor standings)
│   └── last_update
├── results/
│   ├── race / qualifying / sprint   (JSON arrays)
│   └── last_update
└── live/                     (only during session ±30 min)
    ├── is_live / session_status / track_status
    ├── laps_current / laps_total / time_remaining / time_elapsed
    ├── weather / race_control / top_three
    ├── drivers / tyres / pit_stops / team_radio
    └── last_update
```

States are updated:
- **Hourly** for schedule, standings, and results
- **Per-session** for result details (race, qualifying, sprint)
- **Real-time** for live session data (during active sessions)

## Troubleshooting

### "Points mismatch" during race-end window

During the first 60 minutes after a race ends, standings and results may briefly show different round numbers. This is expected behavior — the upstream API refreshes asynchronously. The adapter automatically polls for consistency (6 attempts, 10-minute intervals).

### No live data appearing

1. Check that a session is currently active (F1 Live Timing typically streams during practice, qualifying, and race)
2. Verify internet connection
3. Check adapter logs (ioBroker Admin → Instances → F1 → Logs)

### Stale data

Data is cached and updated on a schedule. If data appears outdated:
1. Manual trigger: restart the adapter instance
2. Automatic: next hourly refresh cycle will fetch fresh data
3. After a session: automatic refresh is triggered within 2 minutes of session end



## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.11 (2026-06-10)

- (bloop) Live data quality: fixed truncated outputs for `live.race_control` and `live.team_radio`
- (bloop) Live ranking quality: corrected top-three ordering by position
- (bloop) Live cache consistency: improved tyre and driver merge logic for partial incremental updates
- (bloop) Session-end flow: unified handling path to avoid inconsistent post-session states

### 0.1.10 (2026-06-05)

- (bloop) Fixed live sessions by migrating from legacy SignalR to SignalR Core transport
- (bloop) Reduced repeated 401 reconnect warnings from F1 Live Timing legacy endpoint
- (bloop) Improved live connection stability with handshake-aware subscription flow

For older changelog entries, see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Data Sources & Attribution

This adapter relies on the following data sources:

- **[Jolpica API](https://api.jolpi.ca/)** — Ergast API mirror, primary source for F1 race calendar, standings, and results
- **[Ergast API](https://ergast.com/mwapi/)** — Historical F1 data, used as fallback when Jolpica is unavailable
- **[F1 Live Timing](https://www.formula1.com/)** — Official real-time session data via SignalR WebSocket
- **[OpenF1 API](https://openf1.org/)** — Fallback for live session detection

## Disclaimer

This project is **not affiliated** with, endorsed by, or in any way officially connected with Formula 1, the FIA, or any of their subsidiaries or affiliates.

**F1®**, **FORMULA ONE®**, **FORMULA 1®**, **FIA FORMULA ONE WORLD CHAMPIONSHIP®**, **GRAND PRIX®** and related marks are trademarks of Formula One Licensing B.V.

This adapter is intended for personal, non-commercial use only.

## License

MIT License

Copyright (c) 2026 Martin (bloop) <bloop16@hotmail.com>

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
