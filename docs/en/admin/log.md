---
title: Protocols
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/log.md
hash: xH/geZboM6o9w3K2ruzyQtOmiVmD4zKGP5i0hJPM18Y=
---
# Tab Protocols

This is where system messages are displayed. The newest one is at the top. If something isn't working, this is the first place to check.

If the **"Logs"** menu item appears red, there is an error. The number next to it indicates the number of logs.

## The toolbar

<img src="media/admin_protokolle_leiste.png" alt="Die Werkzeugleiste des Reiters Protokolle" width="900" />

| No. | function                                                                                                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Update log.**                                                                                                                                           |
| 2   | **Pause output.** Instead of the symbol, the number of new, undisplayed messages will appear. Useful if you want to read a specific line at your leisure. |
| 3   | **Clear log** : only clears the display in the browser.                                                                                                   |
| 4   | **Permanently delete from disk** : deletes the log file on the host.                                                                                      |
| 5   | **Show/hide process ID.**                                                                                                                                 |
| 6   | **Show/hide colors** : highlights errors in red and warnings in yellow.                                                                                   |
| 7   | **Reverse output direction** : newest message at the top or bottom.                                                                                       |
| 8   | **Show only errors.** The number next to it indicates the number of errors present.                                                                       |
| 9   | **Display errors and warnings.**                                                                                                                          |
| 10  | **Download log** : downloads the complete daily file`/opt/iobroker/log` .                                                                                 |
| 11  | The **size** of the current log file.                                                                                                                     |

The host is located to the right of this. In a [multi-host system](/docs/config/multihost.md) , this is where you switch between hosts. Only the messages from the selected host are displayed.

## The list

<img src="media/admin_protokolle_liste.png" alt="Die Protokollliste mit Quelle, Zeit, Stufe und Nachricht" width="900" />

The columns are **source** (the instance or host), **time** , **log level** , and **message** . The fields in the header allow filtering: by source, by minimum log level, and by text within the message.

Log levels from most detailed to most concise:

| Level                                     | For what                                                      |
| ----------------------------------------- | ------------------------------------------------------------- |
| `silly` (in the dialogue **Everything** ) | Absolutely every single report. Only if`debug` is not enough. |
| `debug`                                   | Internal processes too. For troubleshooting, then reset.      |
| `info`                                    | The normal procedure: Start, Stop, Connections.               |
| `warn`                                    | Something is unusual, but it continues.                       |
| `error`                                   | Something went wrong.                                         |

The level is set for each instance in the [Instances](/docs/admin/instances.md) tab, and the default for new instances is set in the [system settings](/docs/admin/settings.md) .

Long lines are truncated in the list. Anyone who wants to get to the bottom of a message should download the log file and look there. Often the actual cause is in the lines preceding it.

## If there is an error in the log

Two things almost always help:

1. **Look for the first error message, not the last.** One error often leads to further errors; the beginning of the chain is what's interesting.
2. **The log level of the affected instance is at`debug` Try** restarting the instance and reviewing the messages again.

If that doesn't help, the [forum](https://forum.iobroker.net/) can help. The relevant post should be an excerpt from the downloaded log file, not a screenshot of the list.