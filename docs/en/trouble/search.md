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

1. **Is ioBroker even working?**`iobroker status` Check the command line, or whether the admin interface can be opened. If not, proceed to ["ioBroker is no longer running"](/docs/trouble/RunsNoMore.md) .
2. **Is the affected instance running?** In the [Instances](/docs/admin/instances.md) tab, the colored dot indicates its status. Red means it is not running.
3. **Are values being received?** In the [Objects](/docs/admin/objects.md) tab, locate the data point in question and check the timestamp. If it's old, the adapter isn't returning anything. If it's current, the problem lies further down the line, perhaps in the script or the visualization.
4. **Since when?** What was the last change: an update, a new adapter, a new script, a power outage? The time frame is often half the answer.

## Read the protocol

The [protocol](/docs/admin/log.md) is the most important source. Two things are important here:

**Read upwards, not downwards.** The conspicuous red error message is often the consequence, not the cause. The actual cause is usually a few lines above.

**Download the file, not the display.** In the browser view, long lines are truncated, and it only contains the messages for the current day from the moment the page is opened. The complete daily file is located at`/opt/iobroker/log` and can be downloaded from the Logs tab. It can also be done via the command line:

```bash
iobroker logs --lines 200
iobroker logs --lines 100 --watch
```

With`--watch` The output runs alongside the command. This is the most convenient way to see what actually happens when an instance starts.

## Request more log

If that is not sufficient, the protocol level of the affected instance will be temporarily set to`debug` This can be done in the Instances tab of the instance itself. Afterwards, restart the instance, trigger the error again, and view the file.

Then back to`info` postpone.`debug` It generates a lot of text, costs write accesses, and is not a good idea to use on an SD card.

## Other places where something is written

| Where                                      | What it says there                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [Hosts](/docs/admin/hosts.md)              | System notifications: insufficient memory, crashed instances, pending updates.               |
| [Overview](/docs/admin/overview.md)        | System status, RAM, free disk space. A full file system can cause the strangest errors.      |
| Detail line of an instance                 | Number of restarts. An instance that constantly restarts will always log the same beginning. |
| [Performance](/docs/trouble/monitoring.md) | If nothing is broken, but everything is just slow.                                           |

## The most common causes

- **Insufficient storage space.**`df -h` on the command line. If the disk fills up, databases can no longer be written.
- **Insufficient memory.** The operating system then terminates the instances, but this is often not recorded in the log.
- **A dying SD card.** Intermittent, fluctuating errors without a discernible pattern are a typical sign.
- **Incorrect Node.js version.** Odd-numbered versions are not supported.`iobroker version` and [update Node.js.](/docs/install/updatenode.md)
- **An adapter from GitHub** that is newer than the rest of the system.

## If it doesn't go any further

Then it's time to ask the question in the forum, or to report a bug to the developer. Both rely on the groundwork already being laid by this side. How a question should be formatted to be answered is explained under ["Forum](/docs/trouble/forum.md) ," and how a bug report should be formatted is [explained under "Report a Bug](/docs/trouble/issue.md) ."