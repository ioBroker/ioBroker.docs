---
chapters: {"pages":{"en/adapterref/iobroker.nut2/README.md":{"title":{"en":"ioBroker.nut2 — Setting it up"},"content":"en/adapterref/iobroker.nut2/README.md"},"en/adapterref/iobroker.nut2/datapoints.md":{"title":{"en":"Data points"},"content":"en/adapterref/iobroker.nut2/datapoints.md"},"en/adapterref/iobroker.nut2/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.nut2/faq.md"}}}
---
# Frequently asked questions

## The log says my credentials were rejected, but the instance is green and the values are current. Which is it?

Both, and they do not contradict each other.

Reading UPS values through NUT needs no login. A login is a separate step that the adapter performs once at startup,
on a short extra connection, purely to tell you whether the credentials work. If the server refuses it, monitoring
continues unaffected — only switching a UPS and writing a variable will be refused.

The instance stays green because `info.connection` reports the **connection to the NUT server**, and that connection is
up and delivering. An orange instance next to fresh values would be the confusing answer, not the honest one.

The usual cause is a missing line in the server's `upsd.users`: a login requires `upsmon secondary` (or
`upsmon primary`) for that user. Adding it fixes the message. `upsd` answers a wrong password and a missing `upsmon`
line with exactly the same refusal, so the adapter names both possibilities.

## Why does the adapter not simply stay logged in?

Because `upsd` counts logins, and a primary `upsmon` uses that count during a power failure: before it shuts its
machine down, it waits until no login but its own is left. A monitoring client sitting permanently in that count would
delay a shutdown running on battery. NUT's own read-only tools (`upsc`, `upscmd`, `upsrw`) never log in either.

## I want to know about a power failure immediately, not at the next poll.

Do not lower the poll interval — NUT has no server push, so a faster poll only asks more often. The component that
knows about events the moment they happen is `upsmon`, NUT's own monitoring client. It runs a program of your choice
via `NOTIFYCMD` and passes the event type and UPS name to it.

Point that program at the writable state `nut2.0.notify`:

```bash
#!/bin/sh
# /etc/nut/notify.sh — called by upsmon
curl -s -X PATCH "http://IOBROKER:8087/v1/state/nut2.0.notify" \
     -H "Content-Type: application/json" \
     -d "{\"val\": \"$NOTIFYTYPE $UPSNAME\", \"ack\": false}"
```

And in `upsmon.conf`:

```
NOTIFYCMD /etc/nut/notify.sh
NOTIFYFLAG ONBATT   SYSLOG+EXEC
NOTIFYFLAG ONLINE   SYSLOG+EXEC
NOTIFYFLAG LOWBATT  SYSLOG+EXEC
NOTIFYFLAG SHUTDOWN SYSLOG+EXEC
```

Any write to `nut2.0.notify` triggers an immediate poll of all UPS devices; an empty value is simply a manual refresh.
When the UPS name matches a discovered device, the event is also written to that device's `info.notify`, so a script
can react per UPS — for example on `SHUTDOWN`.

The event is recorded **before** the poll runs, on purpose: on a shutdown event the NUT host may die halfway through.

## The `commands` channel does not appear although I enabled commands.

Instant commands need credentials. `upsd` checks command rights (`instcmds`) against a named user, so without a
username and password there is nothing to check them against and no buttons are created. Since version 0.14.0 the
adapter says so in the log instead of staying silent.

If credentials are configured and the channel is still missing, your UPS driver reports no instant commands
(`upscmd -l ups0` on the server lists them).

## I renamed a data point in the object tree and the name came back.

That is intended. The adapter owns name and description of its data points the same way it owns their type and role,
and a UPS driver update or an adapter update has to be able to correct them. The place for your own naming is
`0_userdata`, or an alias.

Your recording settings are the explicit exception — they are yours, they are never overwritten, and they even move
along when the adapter renames one of its own data points.

## A UPS vanished from the object tree.

The adapter re-reads the list of UPS devices on every poll. If the NUT server no longer reports a UPS, its objects are
removed; if it comes back, they are rebuilt. That way a UPS added or removed on the server shows up without restarting
the adapter.

## The connection test says "unencrypted" although I enabled TLS.

Then the handshake did not happen, and the test reports what actually took place rather than what was configured. The
usual causes: the NUT server was built without TLS support, or it has no `CERTFILE`/`CERTPATH` in `upsd.conf`. In both
cases `upsd` refuses `STARTTLS` and the test says so.

## I set a CA file, then switched the strict check off, and the adapter went yellow.

That was a defect and is fixed in 0.14.0. The CA file is now only read while **Require valid certificate** is actually
on — with the strict check off no certificate is verified, so the file has no job. A path left over from an earlier
attempt is mentioned once in the debug log and otherwise ignored.

## Which values can I write?

Whatever your UPS driver reports as writable (`LIST RW`), once **Enable SET VAR** is on. Typical candidates are
`ups.delay.shutdown`, `ups.delay.start` and the beeper status. Where the server also reports the allowed values or a
range, the data point gets a selection list or minimum/maximum, so the admin cannot offer you something the UPS will
reject.

Yes/no variables are stored as booleans and translated back to the `yes`/`no` the protocol expects when written.

## Can one instance handle several UPS devices?

Yes — every UPS the NUT server offers becomes its own device below the instance, discovered automatically. You only
need a second instance for a second NUT **server**.

A UPS name that ioBroker cannot use as an object ID (spaces, dots) is sanitized; the real name keeps being used on the
protocol. If two names collapse to the same ID, the second gets a numeric suffix and the adapter warns about it.