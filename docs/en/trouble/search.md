---
title: Troubleshooting
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/search.md
hash: 9YP+5DPy5neqErLX2tQ8CHOIOQLDAOUqm1gEhw8x1JE=
---
# Troubleshooting

When something isn't working, the temptation is strong to immediately change something: restart the instance, reinstall the adapter, reinstall the system. Most of the time, this just wastes time because the cause remains unknown and the error reappears. This page describes the sequence in which you can find it instead.

## First narrow it down, then change it

Four questions will clarify in just a few minutes where the error lies:

1. **Is ioBroker even working?** `iobroker status` on the command line, or whether the administrator account can be opened. If not, proceed as follows:
   [ioBroker is no longer working](/docs/trouble/RunsNoMore.md)
   further.
2. **Is the affected instance running?** In the rider
   [Instance](/docs/admin/instances.md)
   The colored dot indicates the status. Red means: it's not running.
3. **Are values being received?** In the rider
   [objects](/docs/admin/objects.md) Locate the data point in question and check its timestamp. If it's old, the adapter won't return any data. If it's recent, the problem lies further down the line, perhaps in the script or the visualization.
4. **Since when?** What was the last change: an update, a new adapter, a new script, a power outage? Knowing the timing is often half the answer.

## Read the protocol

The [protocol](/docs/admin/log.md) This is the most important source. Two things are important here:

**Read upwards, not downwards.** The conspicuous red error message is often the consequence, not the cause. The actual cause is usually explained a few lines above.

**Take the file, not the ad.** In the browser view, long lines are truncated, and it only contains the messages for the current day from the moment the page is opened. The complete daily file is located at
`/opt/iobroker/log` and can be downloaded from the Logs tab. It can also be done via the command line:

```bash
iobroker logs --lines 200
iobroker logs --lines 100 --watch
```

With `--watch` The output runs alongside the command. This is the most convenient way to see what actually happens when an instance starts.

## Request more log

If that is not sufficient, the protocol level of the affected instance will be temporarily set to `debug` This can be done in the Instances tab of the instance itself. Afterwards, restart the instance, trigger the error again, and view the file.

Then back to `info` postpone. `debug` It generates a lot of text, costs write accesses, and is not a good idea to use on an SD card.

## Other places where something is written

| Where                                      | What it says there                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [Hosts](/docs/admin/hosts.md)              | System notifications: insufficient memory, crashed instances, pending updates.               |
| [Overview](/docs/admin/overview.md)        | System status, RAM, free disk space. A full file system can cause the strangest errors.      |
| Detail line of an instance                 | Number of restarts. An instance that constantly restarts will always log the same beginning. |
| [Performance](/docs/trouble/monitoring.md) | If nothing is broken, but everything is just slow.                                           |

## The most common causes

- **Insufficient storage space.** `df -h` on the command line. If the disk fills up, databases can no longer be written.
- **Insufficient RAM.** The instances are then terminated by the operating system; this is often not recorded in the log.
- **A dying SD card.** Inconsistent, fluctuating errors without a discernible pattern are a typical sign.
- **Incorrect Node.js version.** Odd-numbered versions are not supported.
  `iobroker version` and
  [Update Node.js](/docs/install/updatenode.md).
- **An adapter from GitHub**, which is newer than the rest of the system.

## If it doesn't go any further

Then it's time to ask the question in the forum, or submit a bug report to the developer. Both rely on the groundwork already being laid by this side. How a question should be structured to be answered is explained below.
[forum](/docs/trouble/forum.md), how an error report should look under
[Report a bug](/docs/trouble/issue.md).