---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
---
# Compact Mode

## Architecture and shutdown contract

The existing CommonJS factory creates a new adapter when embedded; direct execution
still creates one ordinary adapter process. Scheduler/queue timers already use the
adapter instance, and vehicle data, command entries, quota buckets, connection status
and expiry notification history were already instance fields. Production has no
`process.exit()` or configuration-dependent process environment overrides.

The remaining changes are confined to lifecycle and backend-message handling:

- Backend logs, notifications and connection-test results are always English so they
  remain useful in support requests. Complete multilingual object names and their
  migration logic are unchanged.
- Each HTTP client owns its AbortControllers and timeout handles. `abort()` permanently
  closes admission and cancels requests through response-body consumption. Timeouts
  remain API errors; shutdown is a separate internal cancellation signal. Request
  resources are removed in `finally`, including on failure. Admin connection tests
  have separate clients registered with the owning adapter.
- Scheduler/queue stop permanently, clear their timers, abort their client, ignore
  late responses and drain their active promises. Queue shutdown also drains immediate
  reports and queued submissions. A restart creates fresh components via the factory.
- The adapter sets its lifecycle stopping flag synchronously in `onUnload()`. A guarded
  adapter port checks every StateWriter, quota-store and expiry-watcher method call,
  including calls reached after an `await`. Admitted ready/message/state-change and
  response callbacks are tracked and drained. Cleanup failures are logged and the
  unload callback has a single completion path.
- No new state/object operation starts after that flag is set. An operation already
  submitted to ioBroker's database can still finish; database operations cannot be
  cancelled by this adapter. Quota is persisted during normal request admission and
  response handling. Unload drains existing saves without starting further writes.
  Thus the latest quota persistence is best effort if unload interrupts a multi-state
  save or the database is unavailable; no exception to the write barrier is made.

No fixed compact group is set in adapter metadata. Shared module data consists only
of definition tables; requests, timers and other runtime data belong to individual
instances. No extended stopTimeout is needed
for HTTP cancellation; database operations remain subject to ioBroker's normal limit.

## Automated verification

```sh
npm run build
npm run test:unit
npm run test:package
npm run test:integration
npm run test:compact
npm run check
npm run lint
npm run check:spec
git diff --check
```

`test:compact` selects the `Compact group 1` suite in the existing integration harness.
It enables `system.compact` in the temporary host configuration and starts the real
js-controller compact group controller with group argument `1`. Two instance objects
have `compact`, `runAsCompactMode` and group 1 set explicitly. They use distinct VINs,
API keys and quotas. Test-only HTTP redirection
routes the two keys to separate mock servers. IPC traces prove that both instances'
requests, including after restarting the first, originate from the same group PID.
The `system.adapter.<instance>.compactMode` states are checked as well.

The suite checks object creation, English connection-test results, commands, the
actual 60-second verification poll, stop, absence of subsequent adapter
state changes/requests, continued commands in the second instance and restart of the
first. Restart respects persisted quota, so an explicit connection test proves the
restarted instance's HTTP operation without bypassing the ordinary polling delay.
Unit tests additionally stop pending/in-flight work, response bodies and writer
continuations; exercise timeout/cancellation, cleanup failures, ready/unload races,
and fresh components after shutdown. Unhandled promise rejections fail unit tests.

The harness supplies actual ioBroker objects/states databases but no Admin adapter.
Only the test instances' Admin dependency is removed and their version is synchronized
with the installed package before starting the group. Production dependencies remain
unchanged. The group controller is launched directly; automatic spawning of the group
by a full host controller is not exercised by this harness.

## Local verification record (2026-09-06)

Environment: macOS, Node.js 26.7.0, js-controller
`7.2.3-alpha.18-20260903-2e634e387` (the harness's installed development version).
Release metadata: 0.1.7, prepared after the existing v0.1.6 tag; no commit or release.

| Check | Result |
| --- | --- |
| Unit tests, including 12 new lifecycle/isolation cases | 376 passed |
| Package tests | 59 passed |
| Full integration (ordinary process and compact suite) | 11 passed |
| Final dedicated compact group 1 run, with common.compact=true | 1 passed |
| TypeScript, lint, build | Passed |
| Live OpenAPI spec check | Unchanged |
| git diff --check | Passed |

Both compact instances issued requests in the same group PID, including the restarted
instance. The stopped instance's complete adapter-state snapshot remained unchanged
while the second executed another command. Object definitions, API schemas/values,
roles/types and complete object-name translation definitions were unchanged; the
latter were also compared byte-for-byte with the pre-change definitions.

During simultaneous final group termination, the database client emitted
`get state error: Connection is closed.` Both instances and the group nevertheless
terminated with code 0, with no unhandled rejection or adapter cleanup failure.
The installed controller's adapter implementation calls `finishUnload()` from both
the unload callback and its 500 ms fallback, while `terminate()` also destroys the
DB clients after 500 ms. Its repeated alive-state write can therefore race DB closure.
The warning is produced inside `@iobroker/db-states-redis`'s `setState()` read of the
previous value. This controller teardown race is documented, not patched or hidden
by increasing adapter stopTimeout. Individual-instance stop/isolation checks passed.

## Installation acceptance procedure

On a disposable ioBroker installation with the supported Admin dependency installed:

1. Enable Compact Mode for the host using its ioBroker configuration/CLI.
2. Assign two adapter instances to compact group 1 and enable execution in Compact
   Mode. Configure separate authorized VIN/key pairs. Do not configure a production
   API redirect.
3. Confirm both instance logs show `COMPACT`, both `compactMode` states are true, and
   both run in the same compact-group process (not separate fallback processes).
4. Check vehicle objects, quota and expiry states, ordinary polls, connection-test
   messages and an appropriate command plus its verification poll.
5. Stop the first instance while it has a request or pending command. Confirm clean
   termination, no new adapter writes after stop, no continued requests, no misleading
   API errors/unhandled rejections, and continued operation of the second instance.
6. Start the first again. Confirm the group PID and second instance remain stable,
   the saved quota is respected, and ordinary operation resumes.

Group 0, live vehicle execution, a full host's group-spawning path, other Node/controller
versions and other operating systems require their own acceptance run. They are not
implied by a successful local group-1/mock test.

The real compact-group controller suite runs on Linux. The development js-controller
installed by `@iobroker/testing` can terminate its directly launched compact-group
controller on macOS and Windows before its zero-delay instance-start timers run. Both
platforms continue to run the complete unit suite, including compact lifecycle and
isolation coverage, and the ordinary adapter integration tests.