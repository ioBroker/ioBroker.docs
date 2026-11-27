---
chapters: {"pages":{"en/adapterref/iobroker.snapmaker-u1/README.md":{"title":{"en":"ioBroker.snapmaker-u1"},"content":"en/adapterref/iobroker.snapmaker-u1/README.md"},"en/adapterref/iobroker.snapmaker-u1/README-German.md":{"title":{"en":"ioBroker.snapmaker-u1"},"content":"en/adapterref/iobroker.snapmaker-u1/README-German.md"},"en/adapterref/iobroker.snapmaker-u1/docs/spoolman.md":{"title":{"en":"Native Spoolman integration"},"content":"en/adapterref/iobroker.snapmaker-u1/docs/spoolman.md"}}}
---
# Native Spoolman integration

Enable the optional integration and configure the Spoolman base URL, e.g. `http://spoolman:7912/` without `/api/v1`. The adapter reads `GET api/v1/spool/{id}` for AFC lanes E0–E3. Assign spools in the existing Klipper/AFC UI; changes are detected on the next printer poll. No printer commands, AFC assignments or consumption writes are issued. AFC/Moonraker continues accounting consumption to avoid double counting.

## Configuration

| Setting | Default | Meaning |
| --- | --- | --- |
| Enable integration | off | Start native service |
| Base URL | empty | HTTP(S) server, no embedded credentials, query or fragment |
| Update interval | 30 seconds | Weight refresh, 5–3600 seconds; changed lane IDs bypass cache. Existing configured intervals are retained. |
| Warning / empty threshold | 300 / 100 g | Strictly below threshold; empty must be less than warning |
| Weekday start / end | 7 / 22 | Monday–Friday warning hours |
| Weekend start / end | 10 / 20 | Saturday/Sunday warning hours |
| Restrict empty alarms to window | off | Critical alarms bypass window, matching supplied script |
| Telegram enabled | off | Send only while print_stats.state is printing |
| Telegram instance | telegram.0 | Installed Telegram adapter instance |
| Telegram recipient | empty | Telegram user, or configured recipients when empty |

Window hours use the ioBroker host timezone (e.g. Europe/Vienna), range 0–24, inclusive start and exclusive end. Overnight windows are supported; equal bounds mean all day. Printer polling determines detection latency; API refresh is evaluated at the next printer poll after the interval expires.

For responsive updates, configure both the printer polling interval and the Spoolman update interval (for example 5 seconds each). A previously saved 300-second Spoolman interval is not changed automatically by updating the adapter. HTTP and state-processing time add to the polling delay.

`apiConnected` is the health of native monitoring, not an independent probe of the Spoolman server while the printer is offline. A failed printer poll invalidates it and clears `druck_laeuft`; spool assignments, weights and notification latches are retained. Reconnection forces a fresh API read. Graceful adapter stop awaits the offline state writes. After an abrupt process kill, persisted states may remain stale; also check `system.adapter.snapmaker-u1.0.alive` when displaying availability.

## Native states

States are acknowledged and read-only under `snapmaker-u1.0.spoolman` (replace instance number).

| Path | Meaning |
| --- | --- |
| apiConnected | Native monitoring has a successful Spoolman snapshot and an available printer; false at startup, on printer/API failure and on graceful adapter stop |
| lastError / lastUpdate | Native integration error / timestamp of last successful API fetch |
| warnzeit_aktiv / druck_laeuft | Warning window / printing flag |
| aktiv.1 … aktiv.4 | Fixed mapping T0/E0 … T3/E3 |
| aktiv.N.active / extruder / lane / spool_id | Assignment identity |
| aktiv.N.name / material / color | Filament name, material, color_hex |
| aktiv.N.initial_weight / used_weight / remaining_weight | Grams; API remaining_weight is authoritative |
| aktiv.N.status | INAKTIV, OK, WARN, LEER |
| aktiv.N.warnung / alarm | Notification submitted for this assignment; retained across restarts |

Warning and critical latches are separate. Spool changes/unload reset them; weight at or above warning threshold rearms both. Print start and window opening are evaluated each printer poll using cached weights. Failed Telegram submissions retry later; delivery depends on Telegram. A process stop between submission and latch persistence can produce a duplicate.

Missing/archived spools, unknown weights, incomplete AFC telemetry and API failures retain the previous slot snapshot, set apiConnected=false and report lastError. Unknown weights never trigger zero-weight alarms. All four lanes are validated before publication. Inspect lastUpdate for data freshness and info.connection for printer availability. No new snapshot is available while the printer is offline. HTTP requests are serialized, bounded by a timeout and cancelled on unload; newer queued snapshots supersede obsolete responses.

## VIS 1 migration and acceptance

The adapter publishes Spoolman data exclusively under `snapmaker-u1.N.spoolman`. Bind the three VIS HTML widgets directly to these native states. The former script paths under `0_userdata.0.3DDrucker.Spoolman` are not created or updated by the adapter. Existing user data is not deleted.

1. Keep the existing script active during comparison; leave native Telegram disabled.
2. Compare all four native slots with Spoolman. Test assignments, weights, material, replacement, unassignment, API failure/recovery and adapter restart.
3. Migrate the VIS widgets to native adapter states and verify all three widgets.
4. Test native Telegram on the active server while old script notifications are disabled: WARN, LEER, idle/printing, time windows, repeated polling and restart.
5. After successful acceptance, disable the old script manually. Rollback: disable native Telegram, restore the previous widget bindings and re-enable the script.

No SSH, SQLite executable or klipper-moonraker adapter is required for native monitoring.

## Development

Run npm ci, npm run check, npm run build, npm test and npm run lint. Tests use mocked HTTP and ioBroker state APIs and never send real notifications. Hardware acceptance remains outstanding until the above checklist is completed.

Reviewed against [ioBroker requirements](https://github.com/ioBroker/ioBroker.repositories) and [best practices](https://www.iobroker.com/docs/dev/bestpractices.md): adapter-core APIs, typed objects, roles and units, acknowledged changed-only writes, structured hierarchy, bounded HTTP, unload cleanup, no direct database access. See [Spoolman API source](https://github.com/Donkie/Spoolman/blob/master/spoolman/api/v1/spool.py) and your server's /docs for API details.