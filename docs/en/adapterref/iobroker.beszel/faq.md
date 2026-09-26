---
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
---
# Questions and troubleshooting

## "Test Connection" fails

The button performs a real login and reports the Hub's own answer, so the message is the clue:

- **Login refused** — wrong e-mail or password: Beszel logs in with the _e-mail address_ only, a
  username is refused. The same message appears when the user has multi-factor authentication
  (the adapter cannot answer the one-time code) or when the Hub runs with
  `DISABLE_PASSWORD_AUTH=true`; the log names which of the three it is.
- **Cannot reach the host** — check the URL by opening it in a browser from the ioBroker machine.
  The address must include the port, for example `http://192.168.1.100:8090`.
- **API not found (404)** — the address answers, but not with the Beszel API: a Hub behind a
  reverse proxy needs its path in the URL (`https://example.org/beszel`), and the port must be the
  Hub's, not another service's.
- **Certificate not trusted** — an https Hub with a self-signed certificate is refused. Use the
  Hub's http address on the local network, or a certificate the ioBroker host trusts.
- **Connected, but no systems visible** — the login works, but the user is assigned to no system.
  See the next question.
- **Called from a script** — the test answers only the admin and web config UIs. A script gets an
  error back and the log shows one warning, so the adapter cannot be used to probe other hosts.

## The instance is green but there are no systems

The adapter only ever shows what the Hub reports to its user. A Beszel user sees the systems it
added itself, the ones a Hub admin added it to (PocketBase admin panel at `/_/`, collection
`systems`, field `users`), or all of them when the Hub runs with `SHARE_ALL_SYSTEMS=true`. Log in
to the Beszel web interface with the adapter's e-mail address: what you see there is what the
adapter sees. If it shows systems and ioBroker does not, raise the log level to debug for one
poll: the log then names each system it processed.

## "The Hub returns no systems for this account"

PocketBase answers a login it no longer accepts — after a password change, a deleted user, a
reset of the Hub's secrets or a restored database — with an empty list instead of an error. The
adapter therefore logs in again and asks once more before it believes an empty list. When this
line appears, the fresh login worked and the list is still empty: the user is assigned to no
system any more. The existing datapoints keep their last values until the list has entries again.

## A system stays at its last values

That is deliberate. When a system is down or paused, the Hub delivers no new measurement, so the
adapter leaves the last one standing rather than writing zeros — a zero would be a claim nobody
measured. A paused system is sent by the Hub with all its system values zeroed; the adapter does
not take those over either. What does change is `info.online` (false) and `info.status`, which is
where an automation should look.

## Datapoints disappeared after an update

Check the log for `Object tree updated: removed N datapoint(s)`. The adapter removes what a
switched-off metric no longer covers, and it removes members of a group that the host stopped
reporting — an unplugged GPU, an unmounted filesystem, a deleted container. A member is only
removed once it has been missing in two consecutive polls, so a single hiccup removes nothing.
A system that was renamed or removed on the Hub is named in the log.

## Container datapoints are missing or frozen

A user that sees a system also sees its containers — there is no separate permission. If the
container request fails, the adapter logs `Container fetch failed (…)` with the reason, keeps
everything else running and leaves the container datapoints it already created untouched. It
picks the containers up again on the next successful poll and logs that container data is
available again. While a system is down or paused its containers keep their last values; the Hub
removes a container's row about ten minutes after its agent stopped reporting it.

## Hardware info stays empty

_System info_ reads a separate collection that Beszel added in version 0.18.0. On an older Hub it
does not exist and the datapoints are simply not created. The data is static, so it is fetched at
start, when a new system appears and whenever a system comes back up — a system that was
`pending` gets its hardware info with its first contact.

## Network monitors do not appear

They need Beszel 0.20.0 or newer on the Hub and on the agent, and a monitor set up for the system
on the Hub (ping, TCP, HTTP or DNS). On an older Hub the adapter logs once that the collection is
missing. A monitor that has not been probed yet shows its settings with empty response times; one
switched off on the Hub keeps its last values with `enabled` false.

## Fans or per-battery levels do not appear

Both need Beszel 0.18.8 or newer. Fans additionally need Linux, because the agent reads them from
hwmon; on macOS, Windows and FreeBSD the agent reports none.

## How much load does the adapter put on the Hub?

Every poll reads the systems and their latest stats. The stats request stops paging as soon as a
page contributes no system it has not already seen, so it reads the newest record per system
instead of walking the hour of minute records the Hub keeps. Everything else only runs when its
switch is on: containers, systemd units and network monitors (plus their newest probe record)
with every poll; the storage pool details and the SMART devices at most every 15 minutes. The
hardware/OS details are read at start and again whenever a system comes back up. A collection this
Hub does not serve is asked for once, not again until the next restart.

The login is renewed shortly before the Hub's token expires (at the latest after 23 hours), and
once more when an empty list makes the adapter doubt its token.

## Can I write to a datapoint?

No. Every datapoint is read-only and the adapter subscribes to no states. It is a one-way mirror
of the Hub, with no inbound port and nothing to command.