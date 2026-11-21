---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.dl-manager
BADGE-stable: https://iobroker.live/badges/dl-manager-stable.svg
BADGE-Installations: https://iobroker.live/badges/dl-manager-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.dl-manager
BADGE-Test and Release: https://github.com/krobipd/ioBroker.dl-manager/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.dl-manager/README.md":{"title":{"en":"ioBroker.dl-manager — user documentation"},"content":"en/adapterref/iobroker.dl-manager/README.md"},"en/adapterref/iobroker.dl-manager/datapoints.md":{"title":{"en":"Datapoints"},"content":"en/adapterref/iobroker.dl-manager/datapoints.md"},"en/adapterref/iobroker.dl-manager/faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.dl-manager/faq.md"}}}
---
# ioBroker.dl-manager — user documentation

The adapter connects ioBroker to your download programs. Each program you add becomes a device, each of its
downloads a channel with its own datapoints. Everything the adapter shows comes from the program itself; the adapter
never downloads anything on its own and asks a program to delete files only when the switch _Also delete the files when
removing_ says so.

## Supported programs

| Program                        | Access                                                | What you need                                                                                                                                                                               |
| ------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JDownloader 2 (local)          | local API, port 3128                                  | In JDownloader: Settings → Advanced settings → `DeprecatedApiEnabled` on; if ioBroker runs on another computer or container, also `DeprecatedApiLocalhostOnly` off                          |
| JDownloader 2 (My.JDownloader) | the My.JDownloader cloud                              | your My.JDownloader e-mail and password — the JDownloader is picked from your account                                                                                                       |
| qBittorrent                    | Web UI, port 8080                                     | user and password of the Web UI, or an API key (qBittorrent 5.2 and newer)                                                                                                                  |
| Transmission                   | RPC, port 9091                                        | user and password if you set one; the ioBroker host must be allowed in `rpc-whitelist`                                                                                                      |
| Deluge                         | Web UI, port 8112                                     | the Web UI password                                                                                                                                                                         |
| SABnzbd                        | API, port 8080                                        | the API key (Config → General)                                                                                                                                                              |
| NZBGet                         | API, port 6789                                        | control user and password                                                                                                                                                                   |
| aria2                          | JSON-RPC, port 6800                                   | the RPC secret (`--rpc-secret`)                                                                                                                                                             |
| pyLoad                         | API, port 8000                                        | an API key (pyLoad 0.5.0b3.dev97 and newer) or user and password                                                                                                                            |
| rqbit                          | HTTP API, port 3030                                   | user and password only if rqbit runs with `RQBIT_HTTP_BASIC_AUTH_USERPASS`; rqbit answers only on 127.0.0.1 unless started with `--http-api-listen-addr 0.0.0.0:3030` (the Docker image is) |
| rTorrent                       | XML-RPC through a web server, port 8080, path `/RPC2` | the address of the web server in front of rTorrent (nginx, lighttpd, the ruTorrent image) and its HTTP login, if it asks for one                                                            |
| Tribler                        | REST API, port 20100                                  | the API key; a fixed port (`CORE_API_PORT`, or `api.http_port` in Tribler's `configuration.json`), and `api.http_host` 0.0.0.0 when ioBroker runs on another machine                        |
| Flood                          | REST API, port 3000                                   | the user you log in to Flood with — not the login of the torrent program behind it; none when Flood runs with `--auth none`                                                                 |
| Vuze                           | Web Remote plugin, port 9091                          | the plugin's user and password — as installed, the user `vuze` and the pairing access code                                                                                                  |
| µTorrent                       | Web UI, port 8080 (µTorrent Server)                   | user and password of the Web UI (Preferences → Advanced → Web UI); the ioBroker host on its list of allowed IPs, if there is one                                                            |
| Hadouken                       | JSON-RPC, port 7070, path `/api`                      | user and password of `http.auth.basic` in `hadouken.json` — admin and admin when none are set                                                                                               |
| Download Station               | DSM Web API, port 5000 (HTTPS 5001)                   | a DSM account with the right to use Download Station and without 2-step verification; only an account that manages Download Station reads and sets the upload limit                         |
| NZBVortex                      | Network API, HTTPS, port 4321                         | Preferences → Remote → Web interface on, and the API key; ioBroker's address on its IP whitelist, if that is on                                                                             |
| Freebox                        | Freebox OS API, HTTPS, `mafreebox.freebox.fr`         | nothing to type: saving the card asks the Freebox for access, and you confirm it on the Freebox's display — from the Freebox's own network                                                  |

**About the JDownloader local API:** it has no password. Anyone in the network who reaches the port can change
JDownloader's settings or shut it down. Use it only when JDownloader runs on the ioBroker host or in the same Docker
network; otherwise use My.JDownloader.

**About NZBVortex:** it speaks HTTPS with a self-signed certificate of its own, which the adapter accepts without
checking it. With SSL switched off in NZBVortex, switch HTTPS off on its card too.

**About the Freebox:** keep `mafreebox.freebox.fr` as host — the adapter checks the Freebox's certificate against Free's
own root certificates, and it holds for that name, not for the box's IP address. With HTTPS switched off, the Freebox
answers on port 80. The access the Freebox grants is stored encrypted like a password. If the app _ioBroker dl-manager_
lacks the right to the downloads, grant it in Freebox OS (Paramètres de la Freebox › Gestion des accès › Applications)
and switch its card off and on. If you removed the app on the Freebox, tick _Pair with the Freebox again_ in the card's
dialog and confirm on the display once more.

## Setup

1. Install the adapter and open the instance settings. The programs are cards of the device manager; they appear while
   the instance runs.
2. Press **+**, choose the program. Its dialog asks only for what this program needs: a name, the address and port
   (empty = the program's default) and its login. For JDownloader choose _Local network_ or _Through My.JDownloader_;
   with My.JDownloader you log in and pick your JDownloader from a list.
3. Apply. The program appears as a card and as a device under `dl-manager.0` at once — the instance does not restart.
   The name is only the label of the card and the device. The object ID is given by the adapter: the program and the
   machine it runs on (`qbittorrent-nas`, `transmission-192-168-1-20`; for `localhost` the name of the ioBroker host),
   for My.JDownloader the last four characters of the account's id for that JDownloader (`jdownloader-7f11`). A second
   program on the same machine gets its port, then a counter. The ID never changes afterwards — not on a new name, a new
   address or a switch between local and My.JDownloader — so rooms, functions and scripts keep working. The card's
   details show it.
4. The test button on the card asks the program once and shows its version or the reason it cannot be reached.

Every program can be added as often as you like. A second entry for the same program — the same address, or the same
JDownloader of a My.JDownloader account — is refused. The switch on a card turns a program off without deleting its
device; delete removes the device, never a file. The programs are stored in `programs.json` in the instance's data folder
(`iobroker-data/dl-manager.0/`, part of every ioBroker backup), not in the object tree; passwords and API keys are
encrypted with the installation's secret.

## What you find in the object tree

- `info.*` — how many programs are configured and reachable.
- `summary.*` — over all programs: whether any download is active, total speeds, a switch that pauses every program;
  `summary.last.*` the last finished and the last failed download (with time).
- `<program>-<piece>.*` — the program: reachable, reason, version, speeds, limits, free space, pause switch, an input
  to add a link, counts; `last.*` its own last finished / failed download.
- `<program>-<piece>.downloads.<download>.*` — one channel per download with status, progress, size, speed, time left,
  error and the actions the program offers (pause, remove, and for some programs recheck, force start or retry).

The status is the same list for every program: queued, downloading, waiting, paused, checking, post-processing, seeding,
completed, failed.

## Which downloads the object tree shows

Two settings decide which downloads get their own channel. The program keeps every download either way, and the totals
(`summary.*`, the program's own counters and `last.finished`) always count all of them.

- **Downloads in the object tree:** _All_ (the default), _Without completed_, or _Only unfinished (no completed, no
  seeding)_ — the last one also leaves out seeding torrents. Failed downloads always stay, they need you.
- **At most this many downloads per program in the object tree:** 100 by default, 0 = all. When a program has more, the
  running ones keep their channel first, then failed, paused and waiting, queued, seeding and completed ones — the
  newest first within each group. A download that loses its channel gets it back as soon as there is room again.

Every download creates up to 15 objects whose values can change with every poll. With 0 or more than 200 downloads per
program that quickly adds up to thousands, which puts a load on the ioBroker database and slows the object tree in the
admin down. The settings page shows a warning then, and the log warns once per program when more than 200 downloads
actually stand in the tree.

## A new link while a program is paused

**A new link resumes a paused program** (off by default) decides what a link does that you write to a program's `add`
while the program is paused. Off, the pause holds for every program and the link waits until you resume it; JDownloader,
which starts on its own for every new link, is paused again right away. On, adding the link resumes the program first,
so all its downloads continue.

## Removing a download

`remove` on a download takes it off its program's list. Whether the program also deletes what it loaded for the
download — a finished download's files, an aborted or failed one's data so far — the switch **Also delete the files when
removing** decides, off by default. It sits on the settings page for every program; while it is off there, the card of
each program that can delete files has the same switch for that program alone, and while it is on, every card follows
it. The datapoints of the download are not part of it — the settings under _Deleting datapoints_ decide them.

A download its program cannot remove the way the switch says has no `remove` — it gets it back as soon as removing works
again, for example once it has finished or the switch changed:

| Program                 | What it cannot do                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------- |
| aria2, pyLoad, rTorrent | delete files — their cards have no switch                                             |
| SABnzbd                 | delete the files of a finished download; remove a download while it post-processes it |
| NZBGet                  | delete the files of a finished download; keep the files of a failed or deleted one    |
| Download Station        | delete the files of a finished download; keep what an unfinished one loaded           |

## Deleting datapoints

When the adapter no longer provides a datapoint — a download left the program's list or the tree settings leave it out,
a program's card was deleted — it deletes it. Two settings at the end of the settings page decide what happens to a
datapoint you record (history, sql, influxdb):

- **Delete datapoints with recording** (on by default): on, such a datapoint goes like any other. Off, it stays with the
  channel and device above it, and one line in the log names how many datapoints were kept and which recording instances
  record them — check them manually.
- **Delete the recorded data too** (off by default, shown only while the first setting is on): each recording instance
  deletes the recorded data of the datapoint first. A datapoint whose data an instance does not delete stays.

A device that moves to a new ID is no deletion: its datapoints move with their values and recordings.

## Updating from 0.2

The first start of 0.3 moves the programs out of the instance settings into the adapter's program store (the instance
restarts once), encrypts their passwords and gives every program its new object ID. Each device moves with its values,
rooms, functions and aliases; a recording keeps its history under the old ID. A My.JDownloader program moves as soon
as the account has named its JDownloader's id (the first successful connection). The last finished and failed
download move into the `last` channel: `lastFinished` → `last.finished`, `lastFinishedTime` → `last.finishedTime`,
`lastFailed` → `last.failed`, `lastFailedTime` → `last.failedTime` — below every program and below `summary`.

**Update old IDs in scripts and VIS** — for example `dl-manager.0.jdownloader-cloud` → `dl-manager.0.jdownloader-7f11`
and `dl-manager.0.summary.lastFinished` → `dl-manager.0.summary.last.finished`. Do not go back to 0.2: it would not
find its programs any more.

## More

- [Every datapoint, per program](/#/docs/adapterref/iobroker.dl-manager/datapoints.md)
- [Frequently asked questions](/#/docs/adapterref/iobroker.dl-manager/faq.md)

## Error reporting

Error reporting via Sentry is active by default; what it sends and how to switch it off is described in the [Sentry section of the main README](https://github.com/krobipd/ioBroker.dl-manager/blob/main/README.md#sentry--error-reporting).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- New: the switch "Also delete the files when removing" on the settings page and on the card of each program that can delete files, off by default
- Changed: a download has no remove datapoint while its program cannot remove it as the switch says
- Fixed: the debug log no longer shows a password or API key typed into a program's dialog
- Fixed: pausing all no longer stops halfway when a download ended meanwhile (rqbit, rTorrent, Tribler)
- Fixed: when the connection breaks off during pause all or resume all, the downloads already paused are resumed later
- Fixed: a link added during a pause is held on the next poll when its first hold did not reach the program
- Fixed: an rqbit 9 torrent paused during its check no longer ends the pause and shows as paused
- Fixed: with rqbit 8, adding a link whose files are already there during a pause no longer fails; it is paused after its check
- Fixed: Flood shows the infinite ratio of Deluge and qBittorrent instead of none
- Fixed: the log line of pause all names a program that refused apart from one that was not reachable
- Fixed: a script testing a connection gets the error as its answer when the test itself fails

### 0.5.0 (2026-11-19)

- New: rqbit can be added as a program
- New: rTorrent can be added as a program, through the web server in front of it
- New: Tribler can be added as a program
- New: Flood can be added as a program
- New: Vuze can be added as a program, through its Web Remote plugin
- New: µTorrent can be added as a program
- New: Hadouken can be added as a program
- New: Synology Download Station can be added as a program
- New: NZBVortex can be added as a program
- New: the downloads of a Freebox can be added as a program, paired once on the Freebox's display
- New: a setting lets a new link resume a paused program
- New: two settings decide whether a datapoint with a recording is deleted, and whether its recorded data goes too
- New: scripts can test a program's connection
- Fixed: the e-mail address of a My.JDownloader account no longer appears in the device object or an object export
- Fixed: a link added while downloads are paused now resumes together with them
- Fixed: aria2 shows seeding torrents and their ratio correctly
- Fixed: an infinite seed ratio shows ∞ instead of staying empty
- Fixed: size and time left stay empty while the program does not know them
- Fixed: NZBGet and pyLoad show their new version after an update
- Fixed: pyLoad shows a decrypting package as queued
- Fixed: pyLoad's speed limit keeps its value when pyLoad does not tell it, instead of emptying
- Fixed: a small speed, limit or size shows its value instead of 0
- Fixed: a program on an IPv6 address is reachable
- Fixed: the last finished and last failed download are named correctly
- Fixed: a finished SABnzbd job keeps its added time
- Fixed: a pressed button resets once the program took the command
- Fixed: the error shows the program's real problem
- Fixed: a programs.json without a program list stops the start instead of removing every device
- Fixed: the program dialog no longer stores invalid fields
- Fixed: the program dialog no longer overwrites changes made in another tab
- Fixed: an unreachable program keeps its last download values
- Fixed: an unexpected answer from a program no longer deletes its downloads
- Fixed: Deluge no longer stops as if its password were wrong
- Fixed: pause all is confirmed only once a program has paused
- Changed: every datapoint of a download starts with the download's name
- Changed: a busy or unreachable program is asked less often
- Changed: passwords and API keys use the platform's encryption; one that cannot be read stops the start instead of being emptied
- Changed: a start that cannot get going ends the adapter instead of running without function
- Changed: a poll interval that is no number ends the start with a notification in the admin instead of running at 10 s
- Improved: the adapter keeps every program's and My.JDownloader's request limit, also across a restart
- Improved: every datapoint has a short description
- Changed: requires js-controller 7.2.5 and admin 8.3.5

### 0.4.0 (2026-10-02)

- Fixed: saving a card while a second admin tab changed the programs could bring back a deleted card or undo a learned My.JDownloader connection
- Fixed: a switched-off program no longer blocks its address when you add the same program again
- Fixed: an updated JDownloader, qBittorrent or aria2 shows its new version without restarting the adapter
- Fixed: the details of a card open even when the program settings cannot be read
- Fixed: an empty entry in a Transmission or SABnzbd list no longer stops the query
- Fixed: a download added while JDownloader is paused no longer starts all its downloads again
- Changed: a card that cannot run shows what is wrong on the card; its `error` datapoint says `Unknown`
- Changed: a program that is down behind a reverse proxy counts as not reachable
- Changed: a new instance starts switched off until you set it up

### 0.3.2 (2026-09-30)

- Changed: your programs and their access data moved out of the object tree into a file of the instance, which every ioBroker backup includes — an object export no longer shows them

### 0.3.1 (2026-09-30)

- Changed: after adding, editing, switching or deleting a program on its card you now see at once whether it worked — the program answers, is not reachable, or is gone
- Fixed: the warning for a rejected login names what to check on the card and says so when the card holds no login at all, as with Transmission's login switch
- Changed: the query interval now starts at 10 seconds; a smaller value stored before keeps working and simply runs at 10 seconds from now on
- Fixed: when several programs answered at the same moment, the totals could briefly show an older speed or count

### 0.3.0 (2026-09-29)

- Fixed: saving a program card no longer hangs, and the settings page can no longer undo a change made on a card
- Changed: a change on a card applies at once without restarting the adapter; passwords are no longer kept in plain text
- Changed: device IDs follow the program and machine (My.JDownloader: its id) and never change; the name is a label
- Changed: the last finished and failed download moved into a `last` channel below each program and the summary
- Changed: the card shows the object ID in its details and has no pause switch; the `paused` datapoint stays
- Fixed: a JDownloader renamed in its own settings keeps its My.JDownloader connection

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_