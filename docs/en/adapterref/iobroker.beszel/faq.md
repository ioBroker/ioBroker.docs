---
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
---
# Questions and troubleshooting

## "Test Connection" fails

The button performs a real login and reports the Hub's own answer, so the message is the clue:

- **Wrong username or password** — the username is the _email address_ of your Beszel login, not a
  display name. PocketBase, which Beszel is built on, authenticates by email.
- **Cannot reach the host** — check the URL by opening it in a browser from the ioBroker machine.
  The address must include the port, for example `http://192.168.1.100:8090`.
- **Nothing happens at all** — the test is restricted to the admin and web config UIs. Calling
  `sendTo` from a script is refused on purpose, so the adapter cannot be used to probe other hosts.

## The instance is green but there are no systems

The adapter only ever shows what the Hub reports. If the Hub's own web interface shows no systems,
there is nothing to mirror. If it does show systems and ioBroker does not, raise the log level to
debug for one poll: the log then names each system it processed.

## A system stays at its last values

That is deliberate. When a system is down or paused, the Hub delivers no new measurement, so the
adapter leaves the last one standing rather than writing zeros — a zero would be a claim nobody
measured. What does change is `info.online` (false) and `info.status`, which is where an
automation should look.

## Datapoints disappeared after an update

Check the log for `Object tree updated: removed N datapoint(s)`. The adapter removes what a
switched-off metric no longer covers, and it removes members of a group that the host stopped
reporting — an unplugged GPU, an unmounted filesystem, a deleted container. If a whole group went
empty at once, the removal only happens after a second consecutive poll confirms it.

## Container datapoints are missing or frozen

The Beszel user needs read access to the `containers` collection. Without it the adapter logs one
warning, keeps everything else running, and leaves the container datapoints it already created
untouched — a permission problem must not delete your tree. Grant the access on the Hub and the
adapter picks it up on the next poll, logging that container data is available again.

## The log warns about plain http

The Hub URL uses `http` to a machine other than this one, so the login and the session token cross
the network unencrypted. On a trusted LAN that is the normal Beszel setup and the adapter does not
block it. Use `https` if the Hub is reachable beyond your own network.

## Hardware info stays empty

_System info_ reads a separate collection that Beszel added in version 0.18.0. On an older Hub it
does not exist and the datapoints are simply not created. The data is static, so it is fetched at
start and when a new system appears — a system that was `pending` at that moment gets its hardware
info after the next adapter restart.

## Fans or per-battery levels do not appear

Both need Beszel 0.18.8 or newer. Fans additionally need Linux, because the agent reads them from
hwmon; on macOS, Windows and FreeBSD the agent reports none.

## How much load does the adapter put on the Hub?

Per poll it makes three requests — systems, latest stats, containers — plus one login every 23
hours. The stats request stops paging as soon as a page contributes no system it has not already
seen, so it reads the newest record per system instead of walking the Hub's eight hours of
history. Container data is only requested when the switch is on.

## Can I write to a datapoint?

No. Every datapoint is read-only and the adapter subscribes to no states. It is a one-way mirror
of the Hub, with no inbound port and nothing to command.