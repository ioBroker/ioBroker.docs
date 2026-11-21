---
chapters: {"pages":{"en/adapterref/iobroker.dl-manager/README.md":{"title":{"en":"ioBroker.dl-manager — user documentation"},"content":"en/adapterref/iobroker.dl-manager/README.md"},"en/adapterref/iobroker.dl-manager/datapoints.md":{"title":{"en":"Datapoints"},"content":"en/adapterref/iobroker.dl-manager/datapoints.md"},"en/adapterref/iobroker.dl-manager/faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.dl-manager/faq.md"}}}
---
# Datapoints

Access: **r** read only, **w** write only (a command), **rw** shows the current value and changes it when you write it.
Speeds are in MB/s, sizes in GB, times are timestamps in milliseconds — for every program, whatever unit it uses
itself. A datapoint is only created where the program delivers the value: below the program and the download level, a
table shows which program has which datapoint — a `–` means the program has no such value, and the datapoint does not
exist for it. JDownloader 2 stands for the local API and My.JDownloader alike.

## `info` — the adapter

| Datapoint                | Type    | Access | Meaning                                                              |
| ------------------------ | ------- | ------ | -------------------------------------------------------------------- |
| `info.connection`        | boolean | r      | At least one download program answered the last query.               |
| `info.programsTotal`     | number  | r      | Number of configured and enabled download programs.                  |
| `info.programsOnline`    | number  | r      | Number of download programs that answered the last query.            |
| `info.programsAllOnline` | boolean | r      | True when every configured download program answered the last query. |

## `summary` — over all programs

| Datapoint                   | Type          | Access | Meaning                                                                                       |
| --------------------------- | ------------- | ------ | --------------------------------------------------------------------------------------------- |
| `summary.downloading`       | boolean       | r      | True while any download of any program is loading or being post-processed.                    |
| `summary.active`            | number        | r      | Downloads loading or being post-processed, over all programs.                                 |
| `summary.queued`            | number        | r      | Downloads waiting in a queue, over all programs.                                              |
| `summary.downloadSpeed`     | number (MB/s) | r      | Download speed of all programs together, each with its last value.                            |
| `summary.uploadSpeed`       | number (MB/s) | r      | Upload speed of all torrent programs together, each with its last value.                      |
| `summary.pauseAll`          | boolean       | rw     | True pauses every reachable program, false resumes them.                                      |
| `summary.last.finished`     | string        | r      | Name of the download that finished last; written on every finish, also when the name repeats. |
| `summary.last.finishedTime` | number        | r      | When that download finished.                                                                  |
| `summary.last.failed`       | string        | r      | Name of the download that failed last.                                                        |
| `summary.last.failedTime`   | number        | r      | When that download failed.                                                                    |

`summary.pauseAll` reads true when every program that can pause was paused at its last query. While a program cannot
be reached, its downloads and the totals keep the values it gave last; only `online` and the `info.*` counts change.

## `<program>-<piece>` — one program

| Datapoint           | Type          | Access | Meaning                                                                                                                                            |
| ------------------- | ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `online`            | boolean       | r      | The program answered the last query.                                                                                                               |
| `error`             | string        | r      | `Unknown` before the first answer and while its card cannot run (the card says why), empty while all is well, otherwise the program's own message. |
| `version`           | string        | r      | Program version.                                                                                                                                   |
| `downloading`       | boolean       | r      | True while a download of this program is loading or being post-processed.                                                                          |
| `paused`            | boolean       | rw     | True pauses the program, false resumes it.                                                                                                         |
| `downloadSpeed`     | number (MB/s) | r      | Download speed.                                                                                                                                    |
| `uploadSpeed`       | number (MB/s) | r      | Upload speed.                                                                                                                                      |
| `speedLimit`        | number (MB/s) | rw     | Maximum download speed of the program; 0 means unlimited.                                                                                          |
| `uploadLimit`       | number (MB/s) | rw     | Maximum upload speed of the program; 0 means unlimited.                                                                                            |
| `altSpeed`          | boolean       | rw     | Switches the program's alternative speed limits on or off.                                                                                         |
| `freeSpace`         | number (GB)   | r      | Free space in the program's download folder.                                                                                                       |
| `active`            | number        | r      | Active downloads.                                                                                                                                  |
| `queued`            | number        | r      | Queued downloads.                                                                                                                                  |
| `total`             | number        | r      | Downloads in the program's list.                                                                                                                   |
| `add`               | string        | w      | Write a link, magnet link or NZB link to add it to this program.                                                                                   |
| `last.finished`     | string        | r      | Name of the download that finished last; written on every finish, also when the name repeats.                                                      |
| `last.finishedTime` | number        | r      | When that download finished.                                                                                                                       |
| `last.failed`       | string        | r      | Name of the download that failed last.                                                                                                             |
| `last.failedTime`   | number        | r      | When that download failed.                                                                                                                         |

Every program has every datapoint of this table except these four:

| Program          | `uploadSpeed` | `uploadLimit` | `altSpeed` | `freeSpace` |
| ---------------- | :-----------: | :-----------: | :--------: | :---------: |
| JDownloader 2    |       –       |       –       |     –      |      –      |
| qBittorrent      |       ✓       |       ✓       |     ✓      |      ✓      |
| Transmission     |       ✓       |       ✓       |     ✓      |      ✓      |
| Deluge           |       ✓       |       ✓       |     –      |      ✓      |
| SABnzbd          |       –       |       –       |     –      |      ✓      |
| NZBGet           |       –       |       –       |     –      |      ✓      |
| aria2            |       ✓       |       ✓       |     –      |      –      |
| pyLoad           |       –       |       –       |     –      |      ✓      |
| rqbit            |       ✓       |       ✓       |     –      |      –      |
| rTorrent         |       ✓       |       ✓       |     –      |      –      |
| Tribler          |       ✓       |       ✓       |     –      |      –      |
| Flood            |       ✓       |       ✓       |     –      |      –      |
| Vuze             |       ✓       |       ✓       |     –      |      ✓      |
| µTorrent         |       ✓       |       ✓       |     –      |      –      |
| Hadouken         |       ✓       |       ✓       |     –      |      –      |
| Download Station |       ✓       |       ✓       |     –      |      –      |
| NZBVortex        |       –       |       –       |     –      |      –      |
| Freebox          |       ✓       |       ✓       |     –      |      –      |

JDownloader, Deluge, SABnzbd, NZBGet, pyLoad and qBittorrent from 5.3 on pause the whole program themselves. Every other
program has no pause for the whole program: there the adapter stops the downloads that are running, remembers exactly
those and starts exactly those again on resume — a download you paused yourself stays paused. The memory survives an
adapter restart.

## `<program>-<piece>.downloads.<download>` — one download

A download is what you added: a JDownloader or pyLoad package, a torrent, an NZB job, an aria2 download, a task of
Download Station or the Freebox. The channel
carries the download's name, and every datapoint's name starts with it (`ubuntu.iso: Progress`), so lists that show
only the name still tell two downloads apart.

| Datapoint     | Type          | Access | Meaning                                                                                                                                            |
| ------------- | ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`      | string        | r      | One of the status values below.                                                                                                                    |
| `progress`    | number (%)    | r      | Progress.                                                                                                                                          |
| `size`        | number (GB)   | r      | Size; empty while the program does not know it yet (a magnet without metadata).                                                                    |
| `downloaded`  | number (GB)   | r      | Downloaded.                                                                                                                                        |
| `speed`       | number (MB/s) | r      | Speed.                                                                                                                                             |
| `uploadSpeed` | number (MB/s) | r      | Upload speed.                                                                                                                                      |
| `ratio`       | number        | r      | Uploaded amount divided by downloaded amount; `-1` = infinite (∞).                                                                                 |
| `eta`         | number (s)    | r      | Seconds until the download is complete; empty while a torrent seeds or when the program cannot tell.                                               |
| `added`       | number        | r      | When the download was added.                                                                                                                       |
| `finished`    | number        | r      | When the download finished.                                                                                                                        |
| `category`    | string        | r      | The category or label you gave the download in the program.                                                                                        |
| `error`       | string        | r      | Error message of the program; empty while all is well.                                                                                             |
| `paused`      | boolean       | rw     | True pauses this download, false resumes it.                                                                                                       |
| `remove`      | boolean       | w      | Removes the download from the program's list; with the switch "Also delete the files when removing" the program deletes what it loaded for it too. |

Every program has `status`, `progress`, `size`, `downloaded` and `remove` — `remove` only while the program can remove
the download the way the switch says (see the README, _Removing a download_). The others:

| Program          | `speed` | `uploadSpeed`, `ratio` | `eta` | `added` | `finished` | `category` | `error` | `paused` |
| ---------------- | :-----: | :--------------------: | :---: | :-----: | :--------: | :--------: | :-----: | :------: |
| JDownloader 2    |    ✓    |           –            |   ✓   |    ✓    |     ✓      |     –      |    ✓    |    ✓     |
| qBittorrent      |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    –    |    ✓     |
| Transmission     |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| Deluge           |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| SABnzbd          |    –    |           –            |   –   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| NZBGet           |    –    |           –            |   –   |    –    |     ✓      |     ✓      |    ✓    |    ✓     |
| aria2            |    ✓    |           ✓            |   ✓   |    –    |     –      |     –      |    ✓    |    ✓     |
| pyLoad           |    ✓    |           –            |   ✓   |    –    |     –      |     –      |    ✓    |    –     |
| rqbit            |    ✓    |           ✓            |   ✓   |    –    |     –      |     –      |    ✓    |    ✓     |
| rTorrent         |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| Tribler          |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     –      |    ✓    |    ✓     |
| Flood            |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| Vuze             |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     –      |    ✓    |    ✓     |
| µTorrent         |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| Hadouken         |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     ✓      |    ✓    |    ✓     |
| Download Station |    ✓    |           ✓            |   ✓   |    ✓    |     ✓      |     –      |    ✓    |    ✓     |
| NZBVortex        |    ✓    |           –            |   ✓   |    –    |     –      |     ✓      |    ✓    |    ✓     |
| Freebox          |    ✓    |           ✓            |   ✓   |    ✓    |     –      |     –      |    ✓    |    ✓     |

SABnzbd and NZBGet report speed and time left only for the whole program, not per download.

### Extras of single programs

| Datapoint    | Program     | Kind   | Meaning                                             |
| ------------ | ----------- | ------ | --------------------------------------------------- |
| `recheck`    | qBittorrent | button | Checks the downloaded data again.                   |
| `forceStart` | qBittorrent | switch | Starts the download right away, ignoring the queue. |
| `retry`      | SABnzbd     | button | Starts a failed download again.                     |
| `retry`      | NZBGet      | button | Starts a failed download again.                     |

## Status values

The value of `status` is the same list for every program; the object tree shows the label in your language.

| Value            | Meaning                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `queued`         | Waits in the program's queue.                                                                                          |
| `downloading`    | Loads.                                                                                                                 |
| `waiting`        | Should load but does not get ahead — a hoster wait time or captcha, a torrent without peers, an NZB still propagating. |
| `paused`         | Paused, by you or by the program.                                                                                      |
| `checking`       | The program checks or prepares the data — torrent recheck, metadata, disk allocation, hash check.                      |
| `postprocessing` | Loaded; the program repairs, unpacks or moves it.                                                                      |
| `seeding`        | Complete and shared with others (torrents).                                                                            |
| `completed`      | Done.                                                                                                                  |
| `failed`         | The program gave up — the reason is in `error` where the program tells one.                                            |

`summary.downloading`, the program's `downloading` and the `active` counters count `downloading` and `postprocessing`.