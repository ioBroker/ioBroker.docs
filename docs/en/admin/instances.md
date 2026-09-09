---
title: Instance
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/instances.md
hash: gAbVuRsm9ionajNzniRdJ4OZL4cxZK9HraPO8MjQQp0=
---
# Instances tab

This section lists all instances created via the [Adapter](/docs/admin/adapter.md) tab. They can be started, stopped, configured, and deleted here.

The name of an instance consists of the adapter name and a sequential number; the first one is assigned the`0` . Out of`javascript.0` This is the namespace under which all objects of this instance reside. Therefore, instance numbers are not changed retroactively.

## The toolbar

<img src="media/admin_instanzen_leiste.png" alt="Die Werkzeugleiste des Reiters Instanzen" width="900" />

| No. | function                                                                                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Show/hide list** : switches between the compact list and a view with descriptions.                                                                   |
| 2   | **Category** : groups the instances according to the adapter's area of application.                                                                    |
| 3   | **Reload.**                                                                                                                                            |
| 4   | **Show running or stopped instances.**                                                                                                                 |
| 5   | **Filter instances** : by host, state, and other characteristics.                                                                                      |
| 6   | **Filter** by name.                                                                                                                                    |
| 7   | The status line shows: free hard disk space, total RAM usage, free memory, and in square brackets the server name and the number of running processes. |

## Read one line

<img src="media/admin_instanzen_zeile.png" alt="Die Bedienelemente einer Instanzzeile" width="900" />

| No. | Meaning                                                                                                                                                              |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Status.** A green square means: running. A gray gear means: stopped. A clock represents a time-controlled device that only runs briefly.                           |
| 2   | The adapter symbol.                                                                                                                                                  |
| 3   | The **name of the instance** .                                                                                                                                       |
| 4   | **Start/Stop.** Two bars mean "running, stop here", the red triangle means "stopped, start here".                                                                    |
| 5   | **Settings** : opens the adapter's configuration. The information displayed there is described in the documentation for the respective adapter.                      |
| 6   | **Start anew.**                                                                                                                                                      |
| 7   | **Instance link** : leads to the web interface of this instance, if it has one.                                                                                      |
| 8   | The **title** . It can be freely changed, which is helpful when using multiple instances of the same adapter, for example.`hm-rpc.0` for RF and`hm-rpc.1` for Wired. |
| 9   | The **log level** of this instance.                                                                                                                                  |
| 10  | The **port** on which the instance is listening.                                                                                                                     |
| 11  | Current **RAM usage** .                                                                                                                                              |
| 12  | Whether the adapter reports crashes to its developer via **Sentry** .                                                                                                |
| 13  | Expands the **details row** .                                                                                                                                        |

## The detail line

<img src="media/admin_instanzen_details.png" alt="Die aufgeklappte Detailzeile einer Instanz" width="900" />

When expanded, the left-hand line shows whether the instance is connected to the host and sending a signal, along with the installed version. The right-hand line displays:

- the **log level** : from`debug` above`info` and`warn` until`error` If something isn't going smoothly, it helps`debug` ; then reset it again, otherwise the log will grow quickly.
- **Input and output events** : how many values the instance has received and sent since startup.
- **Automatically restart** : a schedule according to which the instance will restart.
- The **RAM limit** . It's an upper limit, not a reservation. Don't set it too high on systems with limited memory.
- The **starting order (tier)** . Smaller numbers start first:`1` Logic adapters are followed by data and surface adapters.
- The **trash** can deletes the instance along with its objects. Other instances of the same adapter and the adapter itself remain.

Two green checkmarks on the left don't automatically mean everything is correct: they only indicate that the instance is running and communicating with the host. Whether the connection to the device is established is revealed by the object.`info.connection` the instance.