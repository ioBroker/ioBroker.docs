---
chapters: {"pages":{"en/adapterref/iobroker.nut2/README.md":{"title":{"en":"ioBroker.nut2 — Setting it up"},"content":"en/adapterref/iobroker.nut2/README.md"},"en/adapterref/iobroker.nut2/datapoints.md":{"title":{"en":"Data points"},"content":"en/adapterref/iobroker.nut2/datapoints.md"},"en/adapterref/iobroker.nut2/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.nut2/faq.md"}}}
---
# Frequently asked questions

## The log says my credentials were rejected, but the instance is green and the values are current. Which is it?

Both, and they do not contradict each other.

Reading UPS values through NUT needs no login. A login is a separate step that the adapter performs at every (re)connect,
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

Point that program at the writable state `nut2.0.notify`. Save a small helper script on the NUT server — for example
as `/etc/nut/iobroker-notify.sh` — and make it executable (`chmod +x`); `curl` has to be installed there:

```sh
#!/bin/sh
# Called by upsmon: the event is in $NOTIFYTYPE, the UPS in $UPSNAME.
curl -fsS "http://IOBROKER:8093/v1/state/nut2.0.notify?value=${NOTIFYTYPE}%20${UPSNAME}" > /dev/null
```

And in `upsmon.conf`:

```
NOTIFYCMD /etc/nut/iobroker-notify.sh
NOTIFYFLAG ONLINE   SYSLOG+EXEC
NOTIFYFLAG ONBATT   SYSLOG+EXEC
NOTIFYFLAG LOWBATT  SYSLOG+EXEC
NOTIFYFLAG FSD      SYSLOG+EXEC
NOTIFYFLAG SHUTDOWN SYSLOG+EXEC
NOTIFYFLAG REPLBATT SYSLOG+EXEC
```

The URL is served by the [rest-api](https://github.com/ioBroker/ioBroker.rest-api) adapter (port 8093). A script works
with every NUT version: from the release after NUT 2.8.5 on, `upsmon` starts `NOTIFYCMD` without a shell, so variables
written into `upsmon.conf` itself would no longer be expanded. With the older `simple-api` adapter the URL is
`http://IOBROKER:8087/set/nut2.0.notify?value=…` (8087 when it runs on its own, 8082 inside the web adapter).

Any write to `nut2.0.notify` triggers an immediate poll of all UPS devices; an empty value is simply a manual refresh.
When the UPS name matches a discovered device, the event is also written to that device's `info.notify`, so a script
can react per UPS — for example on `SHUTDOWN`.

The event is recorded **before** the poll runs, on purpose: on a shutdown event the NUT host may die halfway through.

## The `commands` channel does not appear although I enabled commands.

Instant commands need credentials. `upsd` checks command rights (`instcmds`) against a named user, so without a
username and password there is nothing to check them against and no buttons are created. Since version 0.14.0 the
adapter says so in the log instead of staying silent.

If credentials are configured and the channel is still missing, your UPS driver reports no instant commands
(`upscmd -l ups0` on the server lists them) — a UPS without any command gets no `commands` channel at all. Buttons of
commands the driver no longer lists are removed.

## How do I send a command that needs a value?

Write the command and its value into `commands.execute`, exactly as `upscmd` takes them: `load.off.delay 120` or
`beeper.enable`. The same rules apply as for the buttons — **Enable instant commands** on, credentials configured, and the
command has to be one the UPS offers. The value is a single word (no spaces, no `#`, `=`, quotes or backslashes).

## The log says a command was sent but "the driver has not confirmed it (yet)".

When the NUT server tracks commands (NUT 2.8.0 and later), the adapter asks it whether the driver carried a command or a
new setting out. This line means the server accepted it, but the driver did not report back within the command timeout
— check the UPS itself. A driver that reports a failure produces an error line instead.

## Writing a value that contains "#" is refused.

NUT cannot carry it back: the driver reports the new value to the NUT server without escaping the
`#`, and the server discards that report — it would keep showing the old value, and so would every
other NUT client. Measured on NUT 2.8.5; the current NUT development line sends it the same way. The
adapter therefore does not send such a value, says so in the log and shows the server's value again.
Reading values that contain `#` works.

## I renamed a data point in the object tree and the name came back.

That is intended. The adapter owns name and description of its data points the same way it owns their type and role,
and a UPS driver update or an adapter update has to be able to correct them. The place for your own naming is
`0_userdata`, or an alias.

Your recording settings and your room and function assignments are the explicit exception — they are yours, they are
never overwritten, and they even move along when the adapter renames one of its own data points.

## A UPS vanished from the object tree.

The adapter re-reads the list of UPS devices on every poll. If the NUT server no longer reports a UPS, its objects are
removed after three polls without it (right away when the adapter starts); if it comes back, they are rebuilt. That way a UPS added or removed on the server shows up without restarting
the adapter.

## The connection test reports a TLS error although I enabled TLS.

Then the handshake did not happen — the adapter never falls back to an unencrypted connection when TLS is on. The
usual causes: the NUT server was built without TLS support, or it has no `CERTFILE`/`CERTPATH` in `upsd.conf`. In both
cases `upsd` refuses `STARTTLS` and the test says so.

## I set a CA file, then switched the strict check off, and the adapter went yellow.

That was a defect and is fixed in 0.14.0. The CA file is now only read while **Require valid certificate** is actually
on — with the strict check off no certificate is verified, so the file has no job. A path left over from an earlier
attempt is mentioned in the debug log at every connect and otherwise ignored.

## Which values can I write?

Whatever your UPS driver reports as writable (`LIST RW`), once **Enable writable variables** is on. Typical candidates are
`ups.delay.shutdown`, `ups.delay.start` and the beeper status. Where the server also reports the allowed values or a
range, the data point gets a selection list or minimum/maximum, so the admin cannot offer you something the UPS will
reject.

Yes/no variables are stored as booleans and translated back to the `yes`/`no` the protocol expects when written.

## Can one instance handle several UPS devices?

Yes — every UPS the NUT server offers becomes its own device below the instance, discovered automatically. You only
need a second instance for a second NUT **server**.

A UPS name that ioBroker cannot use as an object ID (spaces, dots) is sanitized; the real name keeps being used on the
protocol. If two names collapse to the same ID, the second gets a numeric suffix and the adapter warns about it.