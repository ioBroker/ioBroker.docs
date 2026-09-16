---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
---
# Logging reference

This is a complete reference of every log message this adapter can produce,
grouped by level, with the cause and an example of the actual text. It
exists so that a message you see in the ioBroker log can be looked up
quickly – what triggered it, whether it needs action, and what (if
anything) happens automatically afterwards.

Referenced from the main [README](/#/adapters/waip-web#logging).

## Conventions this adapter follows

- All log text is in **English**, regardless of the ioBroker system
  language (only UI-facing text such as admin labels is translated) – per
  the [official ioBroker logging guidelines](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging).
- For conditions that can **recur** while the adapter keeps running
  (session-cookie renewal, WAIP registration, the Socket.IO connection
  itself, and a wrong-monitor event flood), the adapter follows the same
  guideline's recommended pattern instead of logging every occurrence at
  the same level:
  - **first occurrence** → `warn` (or `error`, for the failure counterpart
    of `handler.exec`/`wrapHandlerWithMonitorCheck`)
  - **every occurrence while it persists** → `debug` (visible with
    `debug`/`silly` log level, so nothing is lost, but it no longer spams
    the default `info` log)
  - **recovery** → `info`, logged exactly once, plus a
    `<key>_recovered` entry in `debug.monitorAudit`
- Duplicate messages (identical text within 5 seconds) are suppressed via
  an internal dedupe cache (`safeLog()`), so a burst of identical errors
  from the same failure only produces one log line.
- No sensitive data (session cookie value, full URLs with credentials) is
  ever logged – only status codes, expiry timestamps and error messages.

## error

Something was lost or could not be processed – always worth looking at.

| Source | Cause | Example |
| --- | --- | --- |
| `handler.exec` | A received event (`io.new_waip`/`io.new_rmld`/`io.routes`/`io.playtts`/`io.standby`) matched the registered monitor but its handler threw while processing it – the event's data was not applied. | `handler.exec: Cannot read properties of undefined (reading 'lat')` |
| `wrapHandlerWithMonitorCheck` | Unexpected failure in the monitor-matching/registration-confirmation logic itself, before the actual event handler ran. | `wrapHandlerWithMonitorCheck: <error message>` |
| `handleAlarm` | An `io.new_waip` (new incident) event could not be processed. | `handleAlarm: <error message>` |
| `handleRueckmeldung` | An `io.new_rmld` (responder feedback) event could not be processed. | `handleRueckmeldung: <error message>` |
| `handleStandby` | An `io.standby` event could not be processed – incident history/live states may now be inconsistent. | `handleStandby: <error message>` |
| `handleRoutes` | An `io.routes` event could not be processed. | `handleRoutes: <error message>` |
| `handleTTS` | An `io.playtts` event could not be processed. | `handleTTS: <error message>` |

## warn

Something is wrong or degraded but the adapter keeps running and usually
recovers on its own; worth a look if it repeats.

| Source | Cause | Example |
| --- | --- | --- |
| `refreshSessionCookie` *(first occurrence, then `debug`; recovers to `info` via `logRecovered`)* | The session-keepalive request failed, or the server's response had no `Set-Cookie` header. | `refreshSessionCookie: keepalive response had no Set-Cookie header (status 200)` |
| `onSocketConnect` *(first occurrence, then `debug`; recovers to `info`)* | No registration confirmation (any event from the server) arrived within the configured registration timeout after connecting. | `onSocketConnect: WAIP registration for monitor 12345 not confirmed within 10000ms` |
| `socket.emit.WAIP` *(first occurrence, then `debug`; recovers to `info`)* | The `socket.emit('WAIP', …)` registration call itself threw (e.g. socket already closing). | `socket.emit.WAIP: <error message>` |
| `connect` *(first occurrence, then `debug`; recovers to `info`)* | Building the Socket.IO connection (`io(...)` / attaching listeners) threw. | `connect: <error message>` |
| `ignoredEvent.wrongMonitor` *(escalated from `info`, only once the rate threshold is hit; recovers to `info` once the rate drops)* | 20+ events for a different monitor ID arrived within 5 minutes – normally just filter noise (see `info` below), but a sustained high rate usually means the configured monitor ID is wrong. | `ignoredEvent.wrongMonitor: Repeatedly receiving events for a different monitor (current=0, 20 in the last 5min) - check the configured monitor ID` |
| *(direct, not deduped/escalated)* `checkMissedStandby` | `einsatz.restzeit` has been stuck at 0 for more than 60s while an incident is still tracked as active – `io.standby` was very likely missed (e.g. a disconnect at the wrong moment); the incident is finalized automatically right after this log line. | `Likely missed io.standby detected (ablaufzeit exceeded by more than 60s) - finalizing incident 3fa2...c19 automatically.` |
| `resetAllStates` / `initStateIfMissing <id>` / `clearCurrentEinsatzStates` / `persistEinsatzSnapshot` / `pushEinsatzToHistory` / `updateRueckmeldungCounts` / `einsatz.*.setState` / `handleAlarm.setFields` / `handleServerVersion` / `<id>.setState` (via `setField`) | A single `setStateAsync()` call rejected (rare – e.g. object not yet created, or an ioBroker DB hiccup). Each site logs with its own context so the failing state is identifiable. | `einsatz.routenGesamt.setState: <error message>` |
| `initObjects channel <id>` / `initObjects state <id>` | A single `setObjectNotExistsAsync()` call during startup object creation rejected – most commonly because the adapter was stopped (e.g. a fast restart during/right after an update) while this was still running, so the DB connection closed mid-loop. The remaining channel/state definitions are skipped for this run (picked up again on the next start) instead of each failing individually. | `initObjects state einsatz.rueckmeldungAnzahl: Cannot check object existence of "waip-web.0.einsatz.rueckmeldungAnzahl": Connection is closed.` |
| `io.error (Server)` *(only for unrecognized error text – see `info` below for the known, self-healing case)* | The server sent an `io.error` event whose text does **not** match the known, self-healing "session renewal" pattern – unclear whether it is consequence-free. | `io.error (Server): Unbekannter interner Fehler` |
| `buildEinsatzMapImage.tile <zoom>/<x>/<y>` | A single OpenStreetMap tile download/decode failed while composing an [incident map image](/#/adapters/waip-web#incident-map-image) (e.g. a 404/timeout) – tolerated, the affected tile area just stays the canvas background color, the rest of the image is unaffected. | `buildEinsatzMapImage.tile 16/35205/21493: tile 16/35205/21493 -> HTTP 503` |
| `generateEinsatzMapImage` | Generating the incident map image failed as a whole (e.g. every tile failed, the maps directory couldn't be created, or writing the PNG failed) – `einsatz.kartenbildPfad` is explicitly cleared (not left at a stale previous value); the incident itself is still processed normally, only the map image is missing for this one. | `generateEinsatzMapImage: no tiles to fetch for lat=52.52 lon=13.405 zoom=16` |
| `generateEinsatzMapImage.timeout` | The [incident map image](/#/adapters/waip-web#incident-map-image) wasn't ready within the configured **OSM timeout** (1-60s, default 10s) – alarm processing continues without it (`einsatz.kartenbildPfad` stays empty for this incident); the download/composition itself keeps running in the background but its result is discarded once it finishes late. | `generateEinsatzMapImage.timeout: image was not ready within the configured OSM timeout of 10s - leaving einsatz.kartenbildPfad empty for this incident` |
| `pruneMapImages` / `pruneMapImages <filename>` | Enforcing the 10-image retention limit for [incident map images](/#/adapters/waip-web#incident-map-image) failed – either listing the maps directory (`pruneMapImages`) or deleting one specific old file (`pruneMapImages <filename>`). Non-critical: at most a few extra old images linger on disk until the next successful run. | `pruneMapImages einsatz_1787571373962_BIGCIRC0.png: EBUSY: resource busy or locked` |

## info

Normal operation – connection/registration lifecycle, expected recoveries,
and expected filter events. Visible at the default ioBroker log level.

| Source | Cause | Example |
| --- | --- | --- |
| *(cleanup, at adapter start)* `cleanupObsoleteObjects` | A leftover state object from a previous adapter version (by object ID) was found and removed during startup migration. | `Removed obsolete state object from a previous version: tts.last` |
| *(cleanup, at adapter start)* `migrateObjectTypes` | An existing state's declared type or role no longer matches the current definition (e.g. after a role correction) – the object was deleted so it gets recreated correctly. | `Recreated state object with a changed definition: debug.lastError (type json -> json, role json -> text)` |
| `refreshSessionCookie` | The server issued a brand-new session cookie because the previous one was no longer valid – part of the normal, self-healing session cycle; triggers an automatic reconnect. | `Session cookie was reissued by the server (old session was invalid) – forcing reconnect` |
| *(via `logRecovered`)* session cookie recovery | A previously logged session-cookie renewal failure (see `warn` above) succeeded again. | `Session cookie refresh recovered` |
| `forceReconnect` | The Socket.IO connection is being rebuilt on purpose (session cookie rotated, or the server reported a new version/instance ID). | `Rebuilding the Socket.IO connection (session cookie rotated)` |
| `handleServerVersion` | The server's reported version/instance ID changed at runtime – usually a server restart; handled automatically (session refresh + reconnect). | `WAIP server reports a new version/instance ID (a1b2 -> c3d4) - likely a server restart` |
| `ignoredEvent.wrongMonitor` *(normal rate; see `warn` above once it spikes)* | An event arrived whose payload explicitly names a different monitor ID than the one this instance is registered to – expected filtering, not an error. | `ignoredEvent.wrongMonitor: Received an event for a different monitor (current=0)` |
| `wrapHandlerWithMonitorCheck` (via `logRecovered`) | The WAIP registration was (re-)confirmed by a received event. | `WAIP registration recovered` |
| *(handleStandby)* | An `io.standby` event was received – incident ended, or the monitor is idle. | `Standby received - incident ended, or monitor idle` |
| `io.error (Server)` *(known case only)* | The server sent the well-known "error renewing the session" text, which is part of the adapter's own self-healing ~10-minute session cycle and resolves on its own. | `io.error (Server): Fehler beim Erneuern der Session` |
| *(onSocketConnect)* | The registration emit was sent to the server. | `socket.emit('WAIP', 12345)` |
| *(onSocketConnect)* | The Socket.IO connection to the `/waip` namespace was established and the registration emit sent. | `Connected monitor 12345 -> namespace /waip (registered via WAIP emit)` |
| *(via `logRecovered`)* connection recovery | A previously logged connection-build failure (see `warn` above) succeeded on a later attempt. | `Socket.IO connection recovered` |
| *(onSocketDisconnect, via `logDisconnect`, deduped)* | The socket disconnected; a manual reconnect is scheduled (`reconnection: false`, no built-in auto-reconnect). | `Socket disconnected: transport close` |
| *(reconnect timer fires)* | The scheduled manual reconnect after a disconnect is now running. | `manual reconnect triggered for monitor '12345'` |
| `onSocketConnectError` *(via `logDisconnect`, deduped)* | The initial connection attempt itself failed (as opposed to a disconnect after being connected). | `connect_error: Error: xhr poll error` |
| *(reconnect timer fires)* | The scheduled manual reconnect after a `connect_error` is now running. | `manual reconnect after connect_error for monitor '12345'` |

## debug

Diagnostic detail – only visible with log level `debug`/`silly`. Includes
every repeated occurrence of the recurring-failure conditions listed under
`warn` above (session cookie, registration, connection) once they've
logged once at `warn`.

| Source | Cause | Example |
| --- | --- | --- |
| `refreshMonitorName` / `getMonitorList` | Fetching/parsing the `/waip/` overview page (for the monitor display name or the admin dropdown) failed – non-critical, both have fallbacks. | `getMonitorList: <error message>` |
| *(refreshSessionCookie, non-rotation case)* | The session cookie was renewed normally (no rotation) – includes the derived next keepalive interval. | `session cookie renewed (status 200, valid until Fri, 22 Aug 2026 10:15:00 GMT, next keepalive in 288s)` |
| `forceReconnect(<reason>)` | A reconnect was requested but skipped, because `connect()` was already running or no connection currently exists (the next `connect()` call will pick up the reason's cause anyway). | `forceReconnect(session cookie rotated): connect() is already running, skipping the forced reconnect` |
| `appendMonitorAudit` | Writing an entry to `debug.monitorAudit` failed – affects only the internal audit trail, not real incident data. | `appendMonitorAudit: <error message>` |
| *(handleRueckmeldung)* | A feedback event for a different (already-finished) incident UUID than the one currently tracked was ignored. | `Ignoring feedback for a different incident 9a1b...e02 (current=3fa2...c19)` |
| `connect()` setup | Logs the Socket.IO engine's negotiated ping interval/timeout once per connection. | `engine pingInterval=25000 pingTimeout=20000` |
| `connect()` engine packets *(capped at 10 per connection)* | Raw Socket.IO engine-level ping/pong/open/close packets – capped since they repeat for the entire connection lifetime with no extra diagnostic value after the first few. | `engine.packet: {"type":"ping"}` |
| `connect()` engine packets | A non-ping/pong engine message packet's raw content (truncated to 200 characters). | `engine.packet.message preview: 42/waip,["io.new_waip",{"stichwort":"B2"...` |
| `connect()` incoming-event preview *(first 6 events per connection only)* | Raw preview of the first few incoming Socket.IO events after connecting, for diagnosing what the server actually sends. | `incoming event 'io.new_waip' preview: {"stichwort":"B2","ort":"Musterstadt"...` |
| *(handleAlarm, before any state is touched)* | An incoming `io.new_waip` event was identified as a rescue-service incident (via `einsatzart`) and completely ignored, because the **Process rescue-service incidents** checkbox on the [Rescue service](/#/adapters/waip-web#rescue-service) tab is unchecked. | `Ignoring rescue-service incident (einsatzart="Rettungseinsatz") - rdAlarmierungEnabled is disabled` |
| `buildEinsatzMapImage` | The [incident map image](/#/adapters/waip-web#incident-map-image)'s configured zoom level wouldn't fit the incident-area polygon fully into the image, so the adapter automatically zoomed out to the level shown here before fetching tiles. | `buildEinsatzMapImage: zooming out from 16 to 10 so the incident area fits in the image` |

## Audit trail (`debug.monitorAudit`)

Independent of the log level above, a rolling JSON array of the last 200
lifecycle events is also kept in the `debug.monitorAudit` state (see the
[README](/#/adapters/waip-web#debug)), including `emit_WAIP`, `registration_timeout`,
`session_cookie_rotated`, `server_version_changed`, `standby`,
`missed_standby_timeout`, `manual_reconnect_triggered`,
`manual_reconnect_after_error`, and a `<key>_recovered` entry for every
recovery reported above (`sessionCookie_recovered`,
`registration_recovered`, `connection_recovered`,
`wrongMonitor_recovered`). Useful for reconstructing a connection's
history without needing debug-level logs enabled.